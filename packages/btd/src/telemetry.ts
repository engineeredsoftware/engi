export const V27_CRYPTO_TELEMETRY_EVENTS = [
  'wallet.connection_failed',
  'wallet.signing_failed',
  'btc_fee.transaction_construction_failed',
  'btc_fee.broadcast_rejected',
  'btc_fee.confirmation_lag',
  'btc_fee.replaced',
  'ledger_anchor.reorged',
  'ledger_anchor.failed',
  'ledger_provider.disagreement',
  'exchange_journal.drift',
  'database_projection.lag',
  'database_projection.repaired',
  'access_check.failed',
  'settlement_route.failed',
  'upgrade_migration.failed',
] as const;

export type V27CryptoTelemetryEvent = (typeof V27_CRYPTO_TELEMETRY_EVENTS)[number];

export type V27CryptoTelemetrySeverity = 'info' | 'warning' | 'critical';

export interface V27CryptoTelemetryRecord {
  event: V27CryptoTelemetryEvent;
  severity: V27CryptoTelemetrySeverity;
  subjectId: string;
  receiptRoot?: string;
  ledgerAnchorId?: string;
  issuedAt: string;
}

export function classifyV27CryptoTelemetryEvent(
  event: V27CryptoTelemetryEvent,
): V27CryptoTelemetrySeverity {
  if (
    event === 'ledger_anchor.reorged' ||
    event === 'ledger_provider.disagreement' ||
    event === 'exchange_journal.drift' ||
    event === 'upgrade_migration.failed'
  ) {
    return 'critical';
  }

  if (
    event === 'wallet.signing_failed' ||
    event === 'btc_fee.broadcast_rejected' ||
    event === 'btc_fee.confirmation_lag' ||
    event === 'database_projection.lag' ||
    event === 'access_check.failed' ||
    event === 'settlement_route.failed'
  ) {
    return 'warning';
  }

  return 'info';
}
