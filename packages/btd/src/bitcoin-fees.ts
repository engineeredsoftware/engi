import {
  BITCODE_FEE_ASSET,
  BitcoinNetwork,
  assertBitcoinNetwork,
  assertNonEmptyString,
  toBigIntAmount,
} from './constants';
import {
  WalletAddressAuthorizationProof,
  WalletSignerSession,
  assertWalletCanSign,
} from './wallet';

export type BtcFeePurpose =
  | 'asset_pack_mint'
  | 'asset_pack_anchor'
  | 'licensed_read'
  | 'rights_transfer'
  | 'exchange_order'
  | 'terminal_operation';

export type BtcFeeFinalityState =
  | 'prepared'
  | 'signed'
  | 'broadcast'
  | 'confirmed'
  | 'replaced'
  | 'reorged'
  | 'failed';

export interface BtcFeeTransactionReceipt {
  kind: 'btc.fee_transaction';
  receiptId: string;
  feePurpose: BtcFeePurpose;
  payerWalletId: string;
  walletSessionId: string;
  network: BitcoinNetwork;
  walletAuthorizationProof: WalletAddressAuthorizationProof;
  txid: string | null;
  vout?: number;
  psbt: string | null;
  satsPaid: bigint;
  satsPerVbyte?: number;
  exchangeSequence: bigint;
  terminalJournalRoot: string;
  relatedAssetPackId?: string;
  relatedOrderId?: string;
  finalityState: BtcFeeFinalityState;
  confirmations: number;
  feeAsset: typeof BITCODE_FEE_ASSET;
  serverCustody: false;
  issuedAt: string;
}

const ALLOWED_FEE_TRANSITIONS: Record<BtcFeeFinalityState, BtcFeeFinalityState[]> = {
  prepared: ['signed', 'failed'],
  signed: ['broadcast', 'failed'],
  broadcast: ['confirmed', 'replaced', 'reorged', 'failed'],
  confirmed: [],
  replaced: [],
  reorged: [],
  failed: [],
};

export function buildPreparedBtcFeeTransactionReceipt(input: {
  receiptId: string;
  feePurpose: BtcFeePurpose;
  payerSession: WalletSignerSession;
  psbt: string;
  satsPaid: bigint | number | string;
  satsPerVbyte?: number;
  exchangeSequence: bigint;
  terminalJournalRoot: string;
  relatedAssetPackId?: string;
  relatedOrderId?: string;
  issuedAt?: string;
}): BtcFeeTransactionReceipt {
  const payerSession = assertWalletCanSign(input.payerSession, 'psbt_sign');
  const satsPaid = toBigIntAmount(input.satsPaid, 'satsPaid');
  if (satsPaid <= 0n) {
    throw new Error('satsPaid must be positive.');
  }

  return {
    kind: 'btc.fee_transaction',
    receiptId: assertNonEmptyString(input.receiptId, 'receiptId'),
    feePurpose: input.feePurpose,
    payerWalletId: payerSession.walletId,
    walletSessionId: payerSession.walletSessionId,
    network: assertBitcoinNetwork(payerSession.network),
    walletAuthorizationProof: payerSession.authorizationProof as WalletAddressAuthorizationProof,
    txid: null,
    psbt: assertNonEmptyString(input.psbt, 'psbt'),
    satsPaid,
    satsPerVbyte: input.satsPerVbyte,
    exchangeSequence: input.exchangeSequence,
    terminalJournalRoot: assertNonEmptyString(input.terminalJournalRoot, 'terminalJournalRoot'),
    relatedAssetPackId: input.relatedAssetPackId,
    relatedOrderId: input.relatedOrderId,
    finalityState: 'prepared',
    confirmations: 0,
    feeAsset: BITCODE_FEE_ASSET,
    serverCustody: false,
    issuedAt: input.issuedAt ?? new Date().toISOString(),
  };
}

export function advanceBtcFeeTransactionReceipt(
  receipt: BtcFeeTransactionReceipt,
  next: {
    finalityState: Exclude<BtcFeeFinalityState, 'prepared'>;
    txid?: string;
    psbt?: string | null;
    confirmations?: number;
    vout?: number;
  },
): BtcFeeTransactionReceipt {
  assertBtcFeeTransactionReceipt(receipt);
  const allowed = ALLOWED_FEE_TRANSITIONS[receipt.finalityState];
  if (!allowed.includes(next.finalityState)) {
    throw new Error(`Invalid BTC fee transition: ${receipt.finalityState} -> ${next.finalityState}.`);
  }

  const txid = next.txid ?? receipt.txid;
  const confirmations = next.confirmations ?? receipt.confirmations;

  if (next.finalityState === 'signed') {
    assertNonEmptyString(next.psbt, 'signedPsbt');
  }

  if (['broadcast', 'confirmed', 'replaced', 'reorged'].includes(next.finalityState)) {
    assertNonEmptyString(txid, 'txid');
  }

  if (next.finalityState === 'confirmed' && confirmations <= 0) {
    throw new Error('Confirmed BTC fee receipt requires at least one confirmation.');
  }

  return {
    ...receipt,
    txid: txid ?? null,
    psbt: next.psbt === undefined ? receipt.psbt : next.psbt,
    finalityState: next.finalityState,
    confirmations,
    vout: next.vout ?? receipt.vout,
  };
}

export function assertBtcFeeTransactionReceipt(
  receipt: BtcFeeTransactionReceipt,
): BtcFeeTransactionReceipt {
  if (receipt.kind !== 'btc.fee_transaction') {
    throw new Error('Invalid BTC fee transaction receipt kind.');
  }

  if (receipt.feeAsset !== BITCODE_FEE_ASSET) {
    throw new Error('BTC fee receipt must use BTC as the fee asset.');
  }

  if (receipt.serverCustody !== false) {
    throw new Error('BTC fee receipt must not imply server custody of user private keys.');
  }

  assertNonEmptyString(receipt.receiptId, 'receiptId');
  assertNonEmptyString(receipt.payerWalletId, 'payerWalletId');
  assertNonEmptyString(receipt.walletSessionId, 'walletSessionId');
  assertBitcoinNetwork(receipt.network);
  assertNonEmptyString(receipt.walletAuthorizationProof?.message, 'walletAuthorizationProof.message');
  assertNonEmptyString(receipt.walletAuthorizationProof?.verifiedAt, 'walletAuthorizationProof.verifiedAt');
  assertNonEmptyString(receipt.terminalJournalRoot, 'terminalJournalRoot');

  if (receipt.satsPaid <= 0n) {
    throw new Error('BTC fee receipt satsPaid must be positive.');
  }

  if (receipt.confirmations < 0) {
    throw new Error('BTC fee confirmations cannot be negative.');
  }

  if (receipt.finalityState === 'prepared') {
    assertNonEmptyString(receipt.psbt, 'psbt');
  }

  if (['broadcast', 'confirmed', 'replaced', 'reorged'].includes(receipt.finalityState)) {
    assertNonEmptyString(receipt.txid, 'txid');
  }

  return receipt;
}
