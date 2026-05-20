import { assertNonEmptyString } from './constants';

export type AssetPackSettlementUnlockState =
  | 'pending_settlement'
  | 'licensed_read'
  | 'denied';

export interface AssetPackSettlementLedgerEvidence {
  status?: string | null;
  settlementAdmissible?: boolean | null;
  reason?: string | null;
  assetPackId?: string | null;
  ledgerAnchorId?: string | null;
  btcFeeReceiptId?: string | null;
  ownershipEventId?: string | null;
  readLicenseId?: string | null;
  depositorWalletId?: string | null;
  readerWalletId?: string | null;
  readback?: Record<string, unknown> | null;
}

export interface AssetPackSettlementUnlock {
  schema: 'bitcode.asset-pack.settlement-unlock';
  state: AssetPackSettlementUnlockState;
  sourceAvailable: boolean;
  settlementAdmissible: boolean;
  deliveryAvailable: boolean;
  reason: string;
  assetPackId: string | null;
  readLicenseId: string | null;
  ownershipEventId: string | null;
  ledgerAnchorId: string | null;
  btcFeeReceiptId: string | null;
  depositorWalletId: string | null;
  readerWalletId: string | null;
  pullRequestTarget: string | null;
  missingReadbackKeys: string[];
}

export const REQUIRED_ASSET_PACK_SETTLEMENT_READBACK_KEYS = [
  'semanticMeasurement',
  'measureMintReceipt',
  'assetPackRange',
  'btdCell',
  'ownershipEvent',
  'readLicense',
  'mintReceipt',
  'btcFeeTransaction',
  'ledgerAnchor',
  'terminalJournal',
  'cryptoTelemetry',
] as const;

export function buildAssetPackSettlementUnlock(input: {
  ledgerSettlement?: AssetPackSettlementLedgerEvidence | null;
  pullRequestTarget?: string | null;
  requirePullRequestDelivery?: boolean;
  requiredReadbackKeys?: readonly string[];
}): AssetPackSettlementUnlock {
  const ledgerSettlement = input.ledgerSettlement || null;
  const pullRequestTarget = optionalString(input.pullRequestTarget);
  const requiredReadbackKeys =
    input.requiredReadbackKeys || REQUIRED_ASSET_PACK_SETTLEMENT_READBACK_KEYS;
  const readback = recordValue(ledgerSettlement?.readback) || {};
  const missingReadbackKeys = requiredReadbackKeys.filter((key) => readback[key] !== true);
  const settlementAdmissible =
    ledgerSettlement?.status === 'settled' &&
    ledgerSettlement?.settlementAdmissible === true &&
    missingReadbackKeys.length === 0;
  const deliveryAvailable = input.requirePullRequestDelivery === false || Boolean(pullRequestTarget);
  const sourceAvailable = settlementAdmissible && deliveryAvailable;

  return {
    schema: 'bitcode.asset-pack.settlement-unlock',
    state: sourceAvailable
      ? 'licensed_read'
      : ledgerSettlement?.status === 'blocked'
        ? 'denied'
        : 'pending_settlement',
    sourceAvailable,
    settlementAdmissible,
    deliveryAvailable,
    reason: settlementUnlockReason({
      ledgerSettlement,
      missingReadbackKeys,
      deliveryAvailable,
      sourceAvailable,
    }),
    assetPackId: optionalString(ledgerSettlement?.assetPackId),
    readLicenseId: optionalString(ledgerSettlement?.readLicenseId),
    ownershipEventId: optionalString(ledgerSettlement?.ownershipEventId),
    ledgerAnchorId: optionalString(ledgerSettlement?.ledgerAnchorId),
    btcFeeReceiptId: optionalString(ledgerSettlement?.btcFeeReceiptId),
    depositorWalletId: optionalString(ledgerSettlement?.depositorWalletId),
    readerWalletId: optionalString(ledgerSettlement?.readerWalletId),
    pullRequestTarget,
    missingReadbackKeys,
  };
}

export function applyAssetPackSettlementUnlockToPreview<T extends Record<string, unknown>>(
  preview: T,
  unlock: AssetPackSettlementUnlock,
): T {
  const existingAccessPolicy = recordValue(preview.accessPolicy) || {};
  const existingUnlock = recordValue(preview.unlock) || {};
  const existingDelivery = recordValue(preview.delivery) || {};

  return {
    ...preview,
    accessPolicy: {
      ...existingAccessPolicy,
      readRightState: unlock.state,
    },
    unlock: {
      ...existingUnlock,
      state: unlock.state,
      sourceAvailable: unlock.sourceAvailable,
      reason: unlock.reason,
    },
    delivery: {
      ...existingDelivery,
      pullRequestTarget: unlock.pullRequestTarget || existingDelivery.pullRequestTarget || null,
      availableAfterSettlement: true,
    },
    settlementUnlock: unlock,
  } as T;
}

function settlementUnlockReason(input: {
  ledgerSettlement: AssetPackSettlementLedgerEvidence | null;
  missingReadbackKeys: string[];
  deliveryAvailable: boolean;
  sourceAvailable: boolean;
}): string {
  if (input.sourceAvailable) {
    return 'Settlement readback is complete: BTC fee, BTD range, ownership/license rows, journal, ledger anchor, database readback, and pull-request delivery agree.';
  }
  if (!input.ledgerSettlement) {
    return 'Protected source remains withheld because settlement readback has not run.';
  }
  if (input.ledgerSettlement.status === 'blocked') {
    return input.ledgerSettlement.reason || 'Protected source remains withheld because settlement is blocked.';
  }
  if (input.missingReadbackKeys.length) {
    return `Protected source remains withheld because settlement readback is missing: ${input.missingReadbackKeys.join(', ')}.`;
  }
  if (!input.deliveryAvailable) {
    return 'Protected source remains withheld because pull-request delivery readback is missing.';
  }
  return 'Protected source remains withheld until settlement and delivery readback agree.';
}

function optionalString(value: unknown): string | null {
  return typeof value === 'string' && value.trim()
    ? assertNonEmptyString(value, 'settlementUnlock.string')
    : null;
}

function recordValue(value: unknown): Record<string, unknown> | null {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? value as Record<string, unknown>
    : null;
}
