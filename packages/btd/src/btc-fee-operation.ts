import {
  BITCODE_FEE_ASSET,
  BitcoinNetwork,
  assertBitcoinNetwork,
  assertNonEmptyString,
  toBigIntAmount,
} from './constants';
import type {
  BtcFeeFinalityState,
  BtcFeePurpose,
  BtcFeeTransactionReceipt,
} from './bitcoin-fees';
import type { WalletCapability, WalletSignerSession } from './wallet';

export type BtcFeeQuoteState = 'quoted' | 'accepted' | 'expired' | 'superseded' | 'failed';

export interface BtcFeeQuote {
  kind: 'btc.fee_quote';
  quoteId: string;
  feePurpose: BtcFeePurpose;
  network: BitcoinNetwork;
  sats: bigint;
  satsPerVbyte?: number;
  measurementRoot: string;
  quoteRoot: string;
  pricingVersion: 'measurement-weight-volume';
  state: BtcFeeQuoteState;
  feeAsset: typeof BITCODE_FEE_ASSET;
  relatedAssetPackId?: string;
  relatedOrderId?: string;
  issuedAt: string;
  expiresAt: string;
  failureReason?: string;
}

export type WalletSignerSessionRecoveryState =
  | 'live_authorized'
  | 'missing'
  | 'prepared_authorization_required'
  | 'stored_authorized_reconnect_required'
  | 'expired'
  | 'revoked'
  | 'failed'
  | 'network_mismatch'
  | 'capability_missing'
  | 'server_custody_rejected';

export interface WalletSignerSessionRecovery {
  state: WalletSignerSessionRecoveryState;
  canSign: boolean;
  walletSessionId: string | null;
  walletId: string | null;
  address: string | null;
  network: BitcoinNetwork | null;
  requiredCapability: WalletCapability;
  serverCustody: false | null;
  blocker: string | null;
  nextAction: string;
}

export type BtcFeeOperationPhase =
  | 'blocked'
  | 'quoted'
  | 'psbt_ready'
  | 'signed'
  | 'broadcast'
  | 'confirmed'
  | 'replaced'
  | 'reorged'
  | 'failed';

export type BtcFeeBlockedReadinessBlockerId =
  | 'wallet-signer-session'
  | 'wallet-network'
  | 'wallet-capability'
  | 'wallet-server-custody'
  | 'fee-quote'
  | 'fee-quote-expired'
  | 'fee-quote-not-accepted'
  | 'psbt-handoff'
  | 'broadcast'
  | 'finality';

export interface BtcFeeBlockedReadinessReceipt {
  kind: 'btc.fee_blocked_readiness';
  blockerId: BtcFeeBlockedReadinessBlockerId;
  summary: string;
  requiredAction: string;
  quoteId: string | null;
  walletSessionId: string | null;
  receiptId: string | null;
  noServerCustody: true;
  issuedAt: string;
}

export interface BtcFeeOperationPosture {
  kind: 'btc.fee_operation_posture';
  phase: BtcFeeOperationPhase;
  feeAsset: typeof BITCODE_FEE_ASSET;
  network: BitcoinNetwork | null;
  quote: BtcFeeQuote | null;
  receipt: BtcFeeTransactionReceipt | null;
  signerRecovery: WalletSignerSessionRecovery;
  blockedReadiness: BtcFeeBlockedReadinessReceipt | null;
  canPreparePsbt: boolean;
  canSignPsbt: boolean;
  canBroadcast: boolean;
  canObserveFinality: boolean;
  canSettle: boolean;
  noServerCustody: true;
  nextAction: string;
}

const QUOTE_TRANSITIONS: Record<BtcFeeQuoteState, BtcFeeQuoteState[]> = {
  quoted: ['accepted', 'expired', 'superseded', 'failed'],
  accepted: ['expired', 'superseded', 'failed'],
  expired: [],
  superseded: [],
  failed: [],
};

export function buildBtcFeeQuote(input: {
  quoteId: string;
  feePurpose: BtcFeePurpose;
  network: BitcoinNetwork;
  sats: bigint | number | string;
  measurementRoot: string;
  issuedAt?: string;
  expiresAt: string;
  satsPerVbyte?: number;
  relatedAssetPackId?: string;
  relatedOrderId?: string;
}): BtcFeeQuote {
  const sats = toBigIntAmount(input.sats, 'sats');
  if (sats <= 0n) {
    throw new Error('BTC fee quote sats must be positive.');
  }

  const issuedAt = input.issuedAt ?? new Date().toISOString();
  const quoteRoot = stableBtcOperationRoot('btc-fee-quote', [
    input.quoteId,
    input.feePurpose,
    input.network,
    sats.toString(),
    input.measurementRoot,
    issuedAt,
    input.expiresAt,
  ]);

  return {
    kind: 'btc.fee_quote',
    quoteId: assertNonEmptyString(input.quoteId, 'quoteId'),
    feePurpose: input.feePurpose,
    network: assertBitcoinNetwork(input.network),
    sats,
    satsPerVbyte: input.satsPerVbyte,
    measurementRoot: assertNonEmptyString(input.measurementRoot, 'measurementRoot'),
    quoteRoot,
    pricingVersion: 'measurement-weight-volume',
    state: 'quoted',
    feeAsset: BITCODE_FEE_ASSET,
    relatedAssetPackId: input.relatedAssetPackId,
    relatedOrderId: input.relatedOrderId,
    issuedAt,
    expiresAt: assertNonEmptyString(input.expiresAt, 'expiresAt'),
  };
}

export function advanceBtcFeeQuote(
  quote: BtcFeeQuote,
  next: { state: Exclude<BtcFeeQuoteState, 'quoted'>; failureReason?: string },
): BtcFeeQuote {
  assertBtcFeeQuote(quote);
  if (!QUOTE_TRANSITIONS[quote.state].includes(next.state)) {
    throw new Error(`Invalid BTC fee quote transition: ${quote.state} -> ${next.state}.`);
  }

  return {
    ...quote,
    state: next.state,
    failureReason: next.failureReason,
  };
}

export function assertBtcFeeQuote(quote: BtcFeeQuote): BtcFeeQuote {
  if (quote.kind !== 'btc.fee_quote') {
    throw new Error('Invalid BTC fee quote kind.');
  }
  if (quote.feeAsset !== BITCODE_FEE_ASSET) {
    throw new Error('BTC fee quote must use BTC as the fee asset.');
  }
  if (quote.sats <= 0n) {
    throw new Error('BTC fee quote sats must be positive.');
  }
  assertNonEmptyString(quote.quoteId, 'quoteId');
  assertBitcoinNetwork(quote.network);
  assertNonEmptyString(quote.measurementRoot, 'measurementRoot');
  assertNonEmptyString(quote.quoteRoot, 'quoteRoot');
  assertNonEmptyString(quote.issuedAt, 'issuedAt');
  assertNonEmptyString(quote.expiresAt, 'expiresAt');
  return quote;
}

export function assertBtcFeeQuoteActive(
  quote: BtcFeeQuote,
  at = new Date().toISOString(),
): BtcFeeQuote {
  assertBtcFeeQuote(quote);
  if (quote.state !== 'quoted' && quote.state !== 'accepted') {
    throw new Error(`BTC fee quote is not active: ${quote.state}.`);
  }
  if (Date.parse(quote.expiresAt) <= Date.parse(at)) {
    throw new Error('BTC fee quote is expired.');
  }
  return quote;
}

export function buildWalletSignerSessionRecovery(input: {
  session?: WalletSignerSession | null;
  requiredCapability?: WalletCapability;
  network?: BitcoinNetwork | null;
  at?: string;
  allowStoredAuthorizedSession?: boolean;
}): WalletSignerSessionRecovery {
  const session = input.session || null;
  const requiredCapability = input.requiredCapability || 'psbt_sign';
  if (!session) {
    return walletRecovery({
      state: 'missing',
      requiredCapability,
      blocker: 'No wallet signer session is attached.',
      nextAction: 'Reconnect Wallet before preparing a BTC fee PSBT.',
    });
  }

  const walletSessionId = session.walletSessionId || null;
  const walletId = session.walletId || null;
  const address = session.address || null;
  const network = assertBitcoinNetwork(session.network);
  const base = {
    walletSessionId,
    walletId,
    address,
    network,
    requiredCapability,
  };

  if (session.serverCustody !== false) {
    return walletRecovery({
      ...base,
      state: 'server_custody_rejected',
      blocker: 'Wallet signer session implies server custody.',
      nextAction: 'Use a wallet provider session where Bitcode never receives private keys.',
    });
  }

  if (input.network && network !== input.network) {
    return walletRecovery({
      ...base,
      state: 'network_mismatch',
      blocker: `Wallet signer session is on ${network}, expected ${input.network}.`,
      nextAction: 'Reconnect Wallet on the BTC fee quote network.',
    });
  }

  if (!session.capabilities.includes(requiredCapability)) {
    return walletRecovery({
      ...base,
      state: 'capability_missing',
      blocker: `Wallet signer session is missing ${requiredCapability}.`,
      nextAction: 'Reconnect Wallet with PSBT signing capability.',
    });
  }

  const at = Date.parse(input.at || new Date().toISOString());
  if (session.expiresAt && Date.parse(session.expiresAt) <= at) {
    return walletRecovery({
      ...base,
      state: 'expired',
      blocker: 'Wallet signer session is expired.',
      nextAction: 'Reconnect Wallet to restore live signing.',
    });
  }

  if (session.state === 'authorized' && session.authorizationProof) {
    if (input.allowStoredAuthorizedSession === true) {
      return walletRecovery({
        ...base,
        state: 'stored_authorized_reconnect_required',
        blocker: 'Stored authorization proof exists, but live provider signing is not confirmed.',
        nextAction: 'Reconnect the wallet provider before signing the BTC fee PSBT.',
      });
    }

    return walletRecovery({
      ...base,
      state: 'live_authorized',
      blocker: null,
      nextAction: 'Prepare or sign the BTC fee PSBT.',
      canSign: true,
      serverCustody: false,
    });
  }

  if (session.state === 'prepared') {
    return walletRecovery({
      ...base,
      state: 'prepared_authorization_required',
      blocker: 'Wallet signer session still needs address authorization.',
      nextAction: 'Authorize the Wallet address before preparing a BTC fee PSBT.',
    });
  }

  if (session.state === 'authorized') {
    return walletRecovery({
      ...base,
      state: 'prepared_authorization_required',
      blocker: 'Wallet signer session is authorized but missing address authorization proof.',
      nextAction: 'Reauthorize the Wallet address before preparing a BTC fee PSBT.',
    });
  }

  return walletRecovery({
    ...base,
    state: session.state,
    blocker: `Wallet signer session is ${session.state}.`,
    nextAction: 'Reconnect Wallet to restore live signing.',
  });
}

export function buildBtcFeeBlockedReadinessReceipt(input: {
  blockerId: BtcFeeBlockedReadinessBlockerId;
  summary: string;
  requiredAction: string;
  quoteId?: string | null;
  walletSessionId?: string | null;
  receiptId?: string | null;
  issuedAt?: string;
}): BtcFeeBlockedReadinessReceipt {
  return {
    kind: 'btc.fee_blocked_readiness',
    blockerId: input.blockerId,
    summary: assertNonEmptyString(input.summary, 'summary'),
    requiredAction: assertNonEmptyString(input.requiredAction, 'requiredAction'),
    quoteId: input.quoteId || null,
    walletSessionId: input.walletSessionId || null,
    receiptId: input.receiptId || null,
    noServerCustody: true,
    issuedAt: input.issuedAt || new Date().toISOString(),
  };
}

export function buildBtcFeeOperationPosture(input: {
  quote?: BtcFeeQuote | null;
  receipt?: BtcFeeTransactionReceipt | null;
  payerSession?: WalletSignerSession | null;
  at?: string;
  allowStoredAuthorizedSession?: boolean;
}): BtcFeeOperationPosture {
  const quote = input.quote ? assertBtcFeeQuote(input.quote) : null;
  const receipt = input.receipt || null;
  const network = quote?.network || receipt?.network || input.payerSession?.network || null;
  const signerRecovery = buildWalletSignerSessionRecovery({
    session: input.payerSession,
    network,
    at: input.at,
    allowStoredAuthorizedSession: input.allowStoredAuthorizedSession,
  });

  if (!signerRecovery.canSign) {
    return blockedPosture({
      quote,
      receipt,
      signerRecovery,
      blockerId: signerBlockerId(signerRecovery.state),
      summary: signerRecovery.blocker || 'Wallet signer session is not ready.',
      requiredAction: signerRecovery.nextAction,
    });
  }

  if (!quote) {
    return blockedPosture({
      quote,
      receipt,
      signerRecovery,
      blockerId: 'fee-quote',
      summary: 'No BTC fee quote is attached.',
      requiredAction: 'Create a BTC fee quote before preparing a PSBT.',
    });
  }

  try {
    assertBtcFeeQuoteActive(quote, input.at);
  } catch (error) {
    return blockedPosture({
      quote,
      receipt,
      signerRecovery,
      blockerId: error instanceof Error && /expired/i.test(error.message) ? 'fee-quote-expired' : 'fee-quote',
      summary: error instanceof Error ? error.message : 'BTC fee quote is not active.',
      requiredAction: 'Refresh the BTC fee quote before preparing settlement.',
    });
  }

  if (quote.state !== 'accepted' && !receipt) {
    return blockedPosture({
      quote,
      receipt,
      signerRecovery,
      blockerId: 'fee-quote-not-accepted',
      summary: 'BTC fee quote has not been accepted for PSBT handoff.',
      requiredAction: 'Accept the BTC fee quote before preparing a PSBT.',
    });
  }

  if (!receipt) {
    return operationPosture({
      phase: 'quoted',
      quote,
      receipt,
      signerRecovery,
      canPreparePsbt: true,
      canSignPsbt: false,
      canBroadcast: false,
      canObserveFinality: false,
      canSettle: false,
      nextAction: 'Prepare the BTC fee PSBT from the accepted quote.',
    });
  }

  const receiptPhase = phaseForFinality(receipt.finalityState);
  return operationPosture({
    phase: receiptPhase,
    quote,
    receipt,
    signerRecovery,
    canPreparePsbt: false,
    canSignPsbt: receipt.finalityState === 'prepared',
    canBroadcast: receipt.finalityState === 'signed',
    canObserveFinality: receipt.finalityState === 'broadcast',
    canSettle: receipt.finalityState === 'confirmed',
    nextAction: nextActionForReceipt(receipt.finalityState),
  });
}

function walletRecovery(input: Partial<WalletSignerSessionRecovery> & {
  state: WalletSignerSessionRecoveryState;
  requiredCapability: WalletCapability;
  blocker: string | null;
  nextAction: string;
}): WalletSignerSessionRecovery {
  return {
    state: input.state,
    canSign: Boolean(input.canSign),
    walletSessionId: input.walletSessionId || null,
    walletId: input.walletId || null,
    address: input.address || null,
    network: input.network || null,
    requiredCapability: input.requiredCapability,
    serverCustody: input.serverCustody ?? null,
    blocker: input.blocker,
    nextAction: input.nextAction,
  };
}

function signerBlockerId(
  state: WalletSignerSessionRecoveryState,
): BtcFeeBlockedReadinessBlockerId {
  if (state === 'network_mismatch') return 'wallet-network';
  if (state === 'capability_missing') return 'wallet-capability';
  if (state === 'server_custody_rejected') return 'wallet-server-custody';
  return 'wallet-signer-session';
}

function blockedPosture(input: {
  quote: BtcFeeQuote | null;
  receipt: BtcFeeTransactionReceipt | null;
  signerRecovery: WalletSignerSessionRecovery;
  blockerId: BtcFeeBlockedReadinessBlockerId;
  summary: string;
  requiredAction: string;
}): BtcFeeOperationPosture {
  return operationPosture({
    phase: 'blocked',
    quote: input.quote,
    receipt: input.receipt,
    signerRecovery: input.signerRecovery,
    blockedReadiness: buildBtcFeeBlockedReadinessReceipt({
      blockerId: input.blockerId,
      summary: input.summary,
      requiredAction: input.requiredAction,
      quoteId: input.quote?.quoteId,
      walletSessionId: input.signerRecovery.walletSessionId,
      receiptId: input.receipt?.receiptId,
    }),
    canPreparePsbt: false,
    canSignPsbt: false,
    canBroadcast: false,
    canObserveFinality: false,
    canSettle: false,
    nextAction: input.requiredAction,
  });
}

type BtcFeeOperationPostureDraft =
  Omit<BtcFeeOperationPosture, 'kind' | 'feeAsset' | 'network' | 'noServerCustody' | 'blockedReadiness'> & {
    blockedReadiness?: BtcFeeBlockedReadinessReceipt | null;
  };

function operationPosture(input: BtcFeeOperationPostureDraft): BtcFeeOperationPosture {
  return {
    kind: 'btc.fee_operation_posture',
    feeAsset: BITCODE_FEE_ASSET,
    network: input.quote?.network || input.receipt?.network || input.signerRecovery.network,
    noServerCustody: true,
    ...input,
    blockedReadiness: input.blockedReadiness || null,
  };
}

function phaseForFinality(finalityState: BtcFeeFinalityState): BtcFeeOperationPhase {
  if (finalityState === 'prepared') return 'psbt_ready';
  return finalityState;
}

function nextActionForReceipt(finalityState: BtcFeeFinalityState): string {
  switch (finalityState) {
    case 'prepared':
      return 'Ask the wallet provider to sign the BTC fee PSBT.';
    case 'signed':
      return 'Broadcast the signed BTC transaction through the admitted provider.';
    case 'broadcast':
      return 'Observe Bitcoin finality until confirmation, replacement, reorg, or failure is known.';
    case 'confirmed':
      return 'Settlement can continue into BTD right transfer and delivery unlock.';
    case 'replaced':
      return 'Repair settlement with the replacement transaction or prepare a new quote.';
    case 'reorged':
      return 'Pause unlock and reconcile against the reorged transaction observation.';
    case 'failed':
      return 'Repair or restart BTC fee settlement from a fresh quote.';
  }
}

function stableBtcOperationRoot(prefix: string, parts: string[]): string {
  const source = parts.join('\u001f');
  let hash = 0x811c9dc5;
  for (let index = 0; index < source.length; index += 1) {
    hash ^= source.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  return `${prefix}-${(hash >>> 0).toString(16).padStart(8, '0')}`;
}
