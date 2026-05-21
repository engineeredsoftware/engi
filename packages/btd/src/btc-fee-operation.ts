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

export type BtcFeeNetworkEnvironment =
  | 'local'
  | 'staging-testnet'
  | 'production-mainnet';

export type BtcFeePsbtHandoffState =
  | 'not_prepared'
  | 'prepared_unsigned'
  | 'signed_ready_to_broadcast'
  | 'broadcast_submitted'
  | 'finality_observed'
  | 'replacement_or_reorg_repair_required'
  | 'failed';

export type BtcFeeBroadcastObservationState =
  | 'not_broadcast'
  | 'broadcast'
  | 'confirmed'
  | 'replaced'
  | 'reorged'
  | 'failed';

export type BtcFeeBitcoinCommitmentMethod =
  | 'taproot'
  | 'op_return'
  | 'standard_output_commitment'
  | 'unknown';

export type BtcFeeTaprootScriptPath = 'key_path' | 'script_path' | 'unknown';

export interface BtcFeeNetworkPolicy {
  kind: 'btc.fee_network_policy';
  network: BitcoinNetwork | null;
  environment: BtcFeeNetworkEnvironment;
  valueBearing: boolean;
  admitted: boolean;
  operationalApprovalRequired: boolean;
  mainnet: boolean;
  proofRoot: string;
  blocker: string | null;
}

export interface BtcFeeTaprootPsbtPosture {
  kind: 'btc.fee_taproot_psbt_posture';
  chain: 'bitcoin';
  network: BitcoinNetwork | null;
  commitmentMethod: BtcFeeBitcoinCommitmentMethod;
  scriptPath: BtcFeeTaprootScriptPath;
  taprootRequired: boolean;
  taprootAdmitted: boolean;
  psbtHandoffState: BtcFeePsbtHandoffState;
  broadcastState: BtcFeeBroadcastObservationState;
  proofRoot: string;
}

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
  | 'network-policy'
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
  networkPolicy: BtcFeeNetworkPolicy;
  taprootScriptPosture: BtcFeeTaprootPsbtPosture;
  psbtHandoffState: BtcFeePsbtHandoffState;
  broadcastState: BtcFeeBroadcastObservationState;
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
  const quoteId = assertNonEmptyString(input.quoteId, 'quoteId');
  const network = assertBitcoinNetwork(input.network);
  const measurementRoot = assertNonEmptyString(input.measurementRoot, 'measurementRoot');
  const expiresAt = assertNonEmptyString(input.expiresAt, 'expiresAt');
  const sats = toBigIntAmount(input.sats, 'sats');
  if (sats <= 0n) {
    throw new Error('BTC fee quote sats must be positive.');
  }

  const issuedAt = input.issuedAt ?? new Date().toISOString();
  assertBtcFeeQuoteTimestamps(issuedAt, expiresAt);
  const quoteRoot = stableBtcOperationRoot('btc-fee-quote', [
    quoteId,
    input.feePurpose,
    network,
    sats.toString(),
    measurementRoot,
    issuedAt,
    expiresAt,
  ]);

  return {
    kind: 'btc.fee_quote',
    quoteId,
    feePurpose: input.feePurpose,
    network,
    sats,
    satsPerVbyte: input.satsPerVbyte,
    measurementRoot,
    quoteRoot,
    pricingVersion: 'measurement-weight-volume',
    state: 'quoted',
    feeAsset: BITCODE_FEE_ASSET,
    relatedAssetPackId: input.relatedAssetPackId,
    relatedOrderId: input.relatedOrderId,
    issuedAt,
    expiresAt,
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
  assertBtcFeeQuoteTimestamps(quote.issuedAt, quote.expiresAt);
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

export function buildBtcFeeNetworkPolicy(input: {
  network?: BitcoinNetwork | null;
  environment?: BtcFeeNetworkEnvironment;
  valueBearing?: boolean;
  valueBearingMainnetApproved?: boolean;
}): BtcFeeNetworkPolicy {
  const network = input.network ? assertBitcoinNetwork(input.network) : null;
  const environment = input.environment ?? 'staging-testnet';
  const valueBearing = input.valueBearing !== false;
  const mainnet = network === 'mainnet';
  const operationalApprovalRequired = mainnet && valueBearing;
  const admitted = !operationalApprovalRequired || input.valueBearingMainnetApproved === true;
  const blocker = admitted
    ? null
    : 'Value-bearing BTC fee settlement on mainnet requires explicit operational approval.';

  return {
    kind: 'btc.fee_network_policy',
    network,
    environment,
    valueBearing,
    admitted,
    operationalApprovalRequired,
    mainnet,
    proofRoot: stableBtcOperationRoot('btc-fee-network-policy', [
      network ?? 'no-network',
      environment,
      valueBearing ? 'value-bearing' : 'non-value-bearing',
      input.valueBearingMainnetApproved === true ? 'approved' : 'not-approved',
    ]),
    blocker,
  };
}

export function deriveBtcFeePsbtHandoffState(
  receipt?: BtcFeeTransactionReceipt | null,
): BtcFeePsbtHandoffState {
  if (!receipt) return 'not_prepared';
  switch (receipt.finalityState) {
    case 'prepared':
      return 'prepared_unsigned';
    case 'signed':
      return 'signed_ready_to_broadcast';
    case 'broadcast':
      return 'broadcast_submitted';
    case 'confirmed':
      return 'finality_observed';
    case 'replaced':
    case 'reorged':
      return 'replacement_or_reorg_repair_required';
    case 'failed':
      return 'failed';
  }
}

export function deriveBtcFeeBroadcastState(
  receipt?: BtcFeeTransactionReceipt | null,
): BtcFeeBroadcastObservationState {
  if (!receipt) return 'not_broadcast';
  if (receipt.finalityState === 'prepared' || receipt.finalityState === 'signed') {
    return 'not_broadcast';
  }
  return receipt.finalityState;
}

export function buildBtcFeeTaprootPsbtPosture(input: {
  network?: BitcoinNetwork | null;
  receipt?: BtcFeeTransactionReceipt | null;
  commitmentMethod?: BtcFeeBitcoinCommitmentMethod;
  scriptPath?: BtcFeeTaprootScriptPath;
}): BtcFeeTaprootPsbtPosture {
  const network = input.network ? assertBitcoinNetwork(input.network) : null;
  const commitmentMethod = input.commitmentMethod ?? 'taproot';
  const scriptPath = input.scriptPath ?? (commitmentMethod === 'taproot' ? 'key_path' : 'unknown');
  const psbtHandoffState = deriveBtcFeePsbtHandoffState(input.receipt);
  const broadcastState = deriveBtcFeeBroadcastState(input.receipt);
  const taprootRequired = true;
  const taprootAdmitted = commitmentMethod === 'taproot';

  return {
    kind: 'btc.fee_taproot_psbt_posture',
    chain: 'bitcoin',
    network,
    commitmentMethod,
    scriptPath,
    taprootRequired,
    taprootAdmitted,
    psbtHandoffState,
    broadcastState,
    proofRoot: stableBtcOperationRoot('btc-fee-taproot-psbt-posture', [
      network ?? 'no-network',
      commitmentMethod,
      scriptPath,
      psbtHandoffState,
      broadcastState,
    ]),
  };
}

export function buildBtcFeeOperationPosture(input: {
  quote?: BtcFeeQuote | null;
  receipt?: BtcFeeTransactionReceipt | null;
  payerSession?: WalletSignerSession | null;
  at?: string;
  allowStoredAuthorizedSession?: boolean;
  environment?: BtcFeeNetworkEnvironment;
  valueBearingMainnetApproved?: boolean;
  commitmentMethod?: BtcFeeBitcoinCommitmentMethod;
  scriptPath?: BtcFeeTaprootScriptPath;
}): BtcFeeOperationPosture {
  const quote = input.quote ? assertBtcFeeQuote(input.quote) : null;
  const receipt = input.receipt || null;
  const network = quote?.network || receipt?.network || input.payerSession?.network || null;
  const networkPolicy = buildBtcFeeNetworkPolicy({
    network,
    environment: input.environment,
    valueBearing: Boolean(quote || receipt),
    valueBearingMainnetApproved: input.valueBearingMainnetApproved,
  });
  const taprootScriptPosture = buildBtcFeeTaprootPsbtPosture({
    network,
    receipt,
    commitmentMethod: input.commitmentMethod,
    scriptPath: input.scriptPath,
  });
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
      networkPolicy,
      taprootScriptPosture,
      blockerId: signerBlockerId(signerRecovery.state),
      summary: signerRecovery.blocker || 'Wallet signer session is not ready.',
      requiredAction: signerRecovery.nextAction,
    });
  }

  if (!networkPolicy.admitted) {
    return blockedPosture({
      quote,
      receipt,
      signerRecovery,
      networkPolicy,
      taprootScriptPosture,
      blockerId: 'network-policy',
      summary: networkPolicy.blocker || 'BTC fee network policy is blocked.',
      requiredAction: 'Use testnet/signet or obtain value-bearing mainnet operational approval.',
    });
  }

  if (!quote) {
    return blockedPosture({
      quote,
      receipt,
      signerRecovery,
      networkPolicy,
      taprootScriptPosture,
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
      networkPolicy,
      taprootScriptPosture,
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
      networkPolicy,
      taprootScriptPosture,
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
      networkPolicy,
      taprootScriptPosture,
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
    networkPolicy,
    taprootScriptPosture,
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
  networkPolicy: BtcFeeNetworkPolicy;
  taprootScriptPosture: BtcFeeTaprootPsbtPosture;
  blockerId: BtcFeeBlockedReadinessBlockerId;
  summary: string;
  requiredAction: string;
}): BtcFeeOperationPosture {
  return operationPosture({
    phase: 'blocked',
    quote: input.quote,
    receipt: input.receipt,
    signerRecovery: input.signerRecovery,
    networkPolicy: input.networkPolicy,
    taprootScriptPosture: input.taprootScriptPosture,
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
  Omit<
    BtcFeeOperationPosture,
    | 'kind'
    | 'feeAsset'
    | 'network'
    | 'noServerCustody'
    | 'blockedReadiness'
    | 'psbtHandoffState'
    | 'broadcastState'
  > & {
    blockedReadiness?: BtcFeeBlockedReadinessReceipt | null;
  };

function operationPosture(input: BtcFeeOperationPostureDraft): BtcFeeOperationPosture {
  return {
    kind: 'btc.fee_operation_posture',
    feeAsset: BITCODE_FEE_ASSET,
    network: input.quote?.network || input.receipt?.network || input.signerRecovery.network,
    noServerCustody: true,
    ...input,
    psbtHandoffState: input.taprootScriptPosture.psbtHandoffState,
    broadcastState: input.taprootScriptPosture.broadcastState,
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

function assertBtcFeeQuoteTimestamps(issuedAt: string, expiresAt: string): void {
  if (!Number.isFinite(Date.parse(issuedAt))) {
    throw new Error('BTC fee quote issuedAt must be a valid timestamp.');
  }
  if (!Number.isFinite(Date.parse(expiresAt))) {
    throw new Error('BTC fee quote expiresAt must be a valid timestamp.');
  }
  if (Date.parse(expiresAt) <= Date.parse(issuedAt)) {
    throw new Error('BTC fee quote expiresAt must be after issuedAt.');
  }
}
