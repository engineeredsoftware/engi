import type { TerminalRunDetailSnapshot, TerminalJsonRecord } from './terminal-transaction-detail-snapshot';
import type { WorkspaceRun } from './terminal-run-data';

export type TerminalWalletBtcOperationState =
  | 'not_prepared'
  | 'quote_pending'
  | 'psbt_ready'
  | 'signed'
  | 'broadcast'
  | 'confirmed'
  | 'replaced'
  | 'reorged'
  | 'failed'
  | 'blocked';

export interface TerminalWalletBtcOperationProjection {
  state: TerminalWalletBtcOperationState;
  summary: string;
  metrics: Array<{ label: string; value: string }>;
  rows: Array<{ label: string; value: string }>;
  blockers: string[];
  nextAction: string;
  canSettle: boolean;
  payload: TerminalJsonRecord;
}

function asRecord(value: unknown): TerminalJsonRecord | null {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as TerminalJsonRecord)
    : null;
}

function readString(value: unknown): string | null {
  return typeof value === 'string' && value.trim() ? value.trim() : null;
}

function readBoolean(value: unknown): boolean | null {
  return typeof value === 'boolean' ? value : null;
}

function readNumberLike(value: unknown): string | null {
  if (typeof value === 'number' && Number.isFinite(value)) return new Intl.NumberFormat('en-US').format(value);
  if (typeof value === 'bigint') return value.toString();
  if (typeof value === 'string' && value.trim()) return value.trim();
  return null;
}

function readNestedRecord(record: TerminalJsonRecord | null, ...keys: string[]) {
  let current: TerminalJsonRecord | null = record;
  for (const key of keys) {
    current = asRecord(current?.[key]);
  }
  return current;
}

function readFinalityState(value: unknown): TerminalWalletBtcOperationState | null {
  const normalized = readString(value);
  if (
    normalized === 'prepared' ||
    normalized === 'psbt_ready' ||
    normalized === 'signed' ||
    normalized === 'broadcast' ||
    normalized === 'confirmed' ||
    normalized === 'replaced' ||
    normalized === 'reorged' ||
    normalized === 'failed' ||
    normalized === 'blocked' ||
    normalized === 'not_prepared' ||
    normalized === 'quote_pending'
  ) {
    return normalized === 'prepared' ? 'psbt_ready' : normalized;
  }
  return null;
}

function stateSummary(state: TerminalWalletBtcOperationState) {
  switch (state) {
    case 'not_prepared':
      return 'BTC fee settlement is not prepared for this activity yet.';
    case 'quote_pending':
      return 'A BTC fee quote or accepted quote is still needed before PSBT handoff.';
    case 'psbt_ready':
      return 'BTC fee PSBT is prepared and waiting for reader wallet signature.';
    case 'signed':
      return 'BTC fee PSBT is signed and waiting for broadcast.';
    case 'broadcast':
      return 'BTC fee transaction is broadcast and waiting for finality observation.';
    case 'confirmed':
      return 'BTC fee transaction is confirmed and can unlock rights transfer and delivery checks.';
    case 'replaced':
      return 'BTC fee transaction was replaced; settlement must reconcile before unlock.';
    case 'reorged':
      return 'BTC fee transaction was reorged; settlement must pause and repair before unlock.';
    case 'failed':
      return 'BTC fee transaction failed; restart or repair settlement before unlock.';
    case 'blocked':
      return 'BTC fee settlement is blocked by signer, quote, custody, or finality readiness.';
  }
}

export function buildTerminalWalletBtcOperationProjection({
  selectedRun,
  detail,
}: {
  selectedRun: WorkspaceRun;
  detail: TerminalRunDetailSnapshot | null;
}): TerminalWalletBtcOperationProjection {
  const ledgerSettlement = detail?.ledgerSettlement || null;
  const btcFee = ledgerSettlement?.btcFee || null;
  const ownershipBoundary = ledgerSettlement?.ownershipBoundary || null;
  const boundaryBtcFee = readNestedRecord(ownershipBoundary, 'btcFee');
  const operationPosture = readNestedRecord(btcFee, 'operationPosture');
  const quote = readNestedRecord(operationPosture, 'quote') || readNestedRecord(btcFee, 'quote');
  const signerRecovery = readNestedRecord(operationPosture, 'signerRecovery');
  const finalityState =
    readFinalityState(operationPosture?.phase) ||
    readFinalityState(btcFee?.finalityState) ||
    readFinalityState(btcFee?.finality_state) ||
    readFinalityState(boundaryBtcFee?.finalityState) ||
    (quote ? 'quote_pending' : null);
  const state = finalityState || (ledgerSettlement?.btcFeeReceiptId ? 'quote_pending' : 'not_prepared');
  const serverCustody =
    readBoolean(btcFee?.serverCustody) ??
    readBoolean(btcFee?.server_custody) ??
    readBoolean(operationPosture?.noServerCustody === false ? true : null);
  const txid = readString(btcFee?.txid) || readString(operationPosture?.receipt && asRecord(operationPosture.receipt)?.txid);
  const psbt = readString(btcFee?.psbt);
  const walletSessionId =
    readString(btcFee?.walletSessionId) ||
    readString(btcFee?.wallet_session_id) ||
    readString(signerRecovery?.walletSessionId);
  const payerWalletId =
    readString(btcFee?.payerWalletId) ||
    readString(btcFee?.payer_wallet_id) ||
    readString(ledgerSettlement?.readerWalletId) ||
    readString(signerRecovery?.walletId);
  const network =
    readString(btcFee?.network) ||
    readString(boundaryBtcFee?.network) ||
    readString(operationPosture?.network) ||
    'n/a';
  const satsPaid =
    readNumberLike(btcFee?.satsPaid) ||
    readNumberLike(btcFee?.sats_paid) ||
    readNumberLike(boundaryBtcFee?.satsPaid) ||
    readNumberLike(quote?.sats) ||
    'n/a';
  const confirmations =
    readNumberLike(btcFee?.confirmations) ||
    readNumberLike(operationPosture?.receipt && asRecord(operationPosture.receipt)?.confirmations) ||
    '0';
  const blockers = [
    readString(operationPosture?.blockedReadiness && asRecord(operationPosture.blockedReadiness)?.summary),
    serverCustody === true ? 'Server-custody posture is rejected for BTC fee settlement.' : null,
    state === 'replaced' ? 'Replacement transaction must be reconciled before unlock.' : null,
    state === 'reorged' ? 'Reorged transaction must be repaired before unlock.' : null,
    state === 'failed' ? 'Failed BTC fee transaction must be repaired before unlock.' : null,
    state === 'quote_pending' && !quote ? 'Accepted BTC fee quote is missing.' : null,
    state === 'not_prepared' ? 'Wallet signer session and accepted BTC fee quote have not prepared a PSBT.' : null,
  ].filter((entry): entry is string => Boolean(entry));
  const canSettle = state === 'confirmed' && serverCustody !== true;
  const nextAction =
    readString(operationPosture?.nextAction) ||
    (canSettle
      ? 'Continue to BTD rights transfer and delivery unlock.'
      : blockers[0] || 'Continue the BTC fee operation to confirmation.');

  return {
    state,
    summary: stateSummary(state),
    metrics: [
      { label: 'BTC state', value: state },
      { label: 'Network', value: network },
      { label: 'Sats', value: satsPaid },
      { label: 'Confirmations', value: confirmations },
    ],
    rows: [
      { label: 'Selected activity', value: selectedRun.id },
      { label: 'Receipt', value: readString(ledgerSettlement?.btcFeeReceiptId) || readString(btcFee?.receiptId) || 'n/a' },
      { label: 'Quote root', value: readString(quote?.quoteRoot) || 'n/a' },
      { label: 'Wallet session', value: walletSessionId || 'n/a' },
      { label: 'Payer wallet', value: payerWalletId || 'n/a' },
      { label: 'PSBT handoff', value: psbt ? 'prepared' : 'not attached' },
      { label: 'Transaction id', value: txid || 'n/a' },
      { label: 'Server custody', value: serverCustody === true ? 'rejected' : 'none' },
      { label: 'Next action', value: nextAction },
    ],
    blockers,
    nextAction,
    canSettle,
    payload: {
      state,
      canSettle,
      ledgerSettlement,
      btcFee,
      ownershipBoundary,
      operationPosture,
      blockers,
    },
  };
}
