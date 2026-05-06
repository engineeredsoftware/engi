import { BitcoinNetwork, assertBitcoinNetwork, assertNonEmptyString } from './constants';
import {
  BtcFeePurpose,
  BtcFeeTransactionReceipt,
  advanceBtcFeeTransactionReceipt,
  buildPreparedBtcFeeTransactionReceipt,
} from './bitcoin-fees';
import { WalletSignerSession } from './wallet';

export interface BitcoinFeePsbtRequest {
  feePurpose: BtcFeePurpose;
  payerSession: WalletSignerSession;
  satsPaid: bigint;
  terminalJournalRoot: string;
  relatedAssetPackId?: string;
  relatedOrderId?: string;
}

export interface PreparedBitcoinFeePsbt {
  psbt: string;
  satsPerVbyte?: number;
}

export interface BroadcastBitcoinTransactionResult {
  txid: string;
  vout?: number;
}

export interface ObservedBitcoinTransaction {
  txid: string;
  network: BitcoinNetwork;
  confirmations: number;
  finalityState: 'broadcast' | 'confirmed' | 'replaced' | 'reorged' | 'failed';
}

export interface BitcoinFeeTransactionProvider {
  readonly network: BitcoinNetwork;
  prepareFeePsbt(request: BitcoinFeePsbtRequest): Promise<PreparedBitcoinFeePsbt>;
  broadcastSignedPsbt(signedPsbt: string): Promise<BroadcastBitcoinTransactionResult>;
  observeTransaction(txid: string): Promise<ObservedBitcoinTransaction>;
}

export async function prepareBtcFeeWithProvider(input: {
  provider: BitcoinFeeTransactionProvider;
  receiptId: string;
  payerSession: WalletSignerSession;
  feePurpose: BtcFeePurpose;
  satsPaid: bigint;
  exchangeSequence: bigint;
  terminalJournalRoot: string;
  relatedAssetPackId?: string;
  relatedOrderId?: string;
  issuedAt?: string;
}): Promise<BtcFeeTransactionReceipt> {
  assertProviderNetworkMatchesSession(input.provider, input.payerSession.network);
  const prepared = await input.provider.prepareFeePsbt({
    feePurpose: input.feePurpose,
    payerSession: input.payerSession,
    satsPaid: input.satsPaid,
    terminalJournalRoot: input.terminalJournalRoot,
    relatedAssetPackId: input.relatedAssetPackId,
    relatedOrderId: input.relatedOrderId,
  });

  return buildPreparedBtcFeeTransactionReceipt({
    receiptId: input.receiptId,
    feePurpose: input.feePurpose,
    payerSession: input.payerSession,
    psbt: prepared.psbt,
    satsPaid: input.satsPaid,
    satsPerVbyte: prepared.satsPerVbyte,
    exchangeSequence: input.exchangeSequence,
    terminalJournalRoot: input.terminalJournalRoot,
    relatedAssetPackId: input.relatedAssetPackId,
    relatedOrderId: input.relatedOrderId,
    issuedAt: input.issuedAt,
  });
}

export async function broadcastBtcFeeWithProvider(input: {
  provider: BitcoinFeeTransactionProvider;
  signedReceipt: BtcFeeTransactionReceipt;
  signedPsbt: string;
}): Promise<BtcFeeTransactionReceipt> {
  assertProviderNetworkMatchesSession(input.provider, input.signedReceipt.network);
  const signed = advanceBtcFeeTransactionReceipt(input.signedReceipt, {
    finalityState: 'signed',
    psbt: assertNonEmptyString(input.signedPsbt, 'signedPsbt'),
  });
  const broadcast = await input.provider.broadcastSignedPsbt(input.signedPsbt);

  return advanceBtcFeeTransactionReceipt(signed, {
    finalityState: 'broadcast',
    txid: broadcast.txid,
    vout: broadcast.vout,
  });
}

export async function observeBtcFeeWithProvider(input: {
  provider: BitcoinFeeTransactionProvider;
  broadcastReceipt: BtcFeeTransactionReceipt;
}): Promise<BtcFeeTransactionReceipt> {
  if (!input.broadcastReceipt.txid) {
    throw new Error('BTC fee observation requires a broadcast txid.');
  }

  assertProviderNetworkMatchesSession(input.provider, input.broadcastReceipt.network);
  const observation = await input.provider.observeTransaction(input.broadcastReceipt.txid);
  assertProviderNetworkMatchesSession(input.provider, observation.network);

  if (observation.txid !== input.broadcastReceipt.txid) {
    throw new Error('BTC provider observation txid does not match receipt.');
  }

  if (observation.finalityState === input.broadcastReceipt.finalityState) {
    return {
      ...input.broadcastReceipt,
      confirmations: observation.confirmations,
    };
  }

  return advanceBtcFeeTransactionReceipt(input.broadcastReceipt, {
    finalityState: observation.finalityState,
    confirmations: observation.confirmations,
    txid: observation.txid,
  });
}

function assertProviderNetworkMatchesSession(
  provider: BitcoinFeeTransactionProvider,
  network: string,
): void {
  const providerNetwork = assertBitcoinNetwork(provider.network);
  const expectedNetwork = assertBitcoinNetwork(network);

  if (providerNetwork !== expectedNetwork) {
    throw new Error(`Bitcoin provider network mismatch: ${providerNetwork} !== ${expectedNetwork}.`);
  }
}
