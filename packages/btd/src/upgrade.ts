import { LedgerNetwork, assertLedgerNetwork, assertNonEmptyString } from './constants';

export type BtdProtocolUpgradeState =
  | 'planned'
  | 'applied'
  | 'verified'
  | 'rolled_back'
  | 'failed';

export interface BtdProtocolUpgradeReceipt {
  kind: 'btd.protocol_upgrade';
  upgradeId: string;
  fromVersion: string;
  toVersion: string;
  network: LedgerNetwork;
  migrationRoot: string;
  preStateRoot: string;
  postStateRoot: string | null;
  approvalReceiptRoot: string;
  rollbackPlanRoot: string;
  ledgerAnchorId?: string;
  upgradeState: BtdProtocolUpgradeState;
  issuedAt: string;
}

const ALLOWED_UPGRADE_TRANSITIONS: Record<BtdProtocolUpgradeState, BtdProtocolUpgradeState[]> = {
  planned: ['applied', 'failed'],
  applied: ['verified', 'rolled_back', 'failed'],
  verified: [],
  rolled_back: [],
  failed: [],
};

export function buildPlannedBtdProtocolUpgradeReceipt(input: {
  upgradeId: string;
  fromVersion: string;
  toVersion: string;
  network: LedgerNetwork;
  migrationRoot: string;
  preStateRoot: string;
  approvalReceiptRoot: string;
  rollbackPlanRoot: string;
  issuedAt?: string;
}): BtdProtocolUpgradeReceipt {
  return {
    kind: 'btd.protocol_upgrade',
    upgradeId: assertNonEmptyString(input.upgradeId, 'upgradeId'),
    fromVersion: assertNonEmptyString(input.fromVersion, 'fromVersion'),
    toVersion: assertNonEmptyString(input.toVersion, 'toVersion'),
    network: assertLedgerNetwork(input.network),
    migrationRoot: assertNonEmptyString(input.migrationRoot, 'migrationRoot'),
    preStateRoot: assertNonEmptyString(input.preStateRoot, 'preStateRoot'),
    postStateRoot: null,
    approvalReceiptRoot: assertNonEmptyString(input.approvalReceiptRoot, 'approvalReceiptRoot'),
    rollbackPlanRoot: assertNonEmptyString(input.rollbackPlanRoot, 'rollbackPlanRoot'),
    upgradeState: 'planned',
    issuedAt: input.issuedAt ?? new Date().toISOString(),
  };
}

export function advanceBtdProtocolUpgradeReceipt(
  receipt: BtdProtocolUpgradeReceipt,
  next: {
    upgradeState: Exclude<BtdProtocolUpgradeState, 'planned'>;
    postStateRoot?: string;
    ledgerAnchorId?: string;
  },
): BtdProtocolUpgradeReceipt {
  assertBtdProtocolUpgradeReceipt(receipt);
  const allowed = ALLOWED_UPGRADE_TRANSITIONS[receipt.upgradeState];
  if (!allowed.includes(next.upgradeState)) {
    throw new Error(`Invalid upgrade transition: ${receipt.upgradeState} -> ${next.upgradeState}.`);
  }

  if (next.upgradeState === 'applied' || next.upgradeState === 'verified') {
    assertNonEmptyString(next.postStateRoot ?? receipt.postStateRoot, 'postStateRoot');
  }

  return {
    ...receipt,
    postStateRoot: next.postStateRoot ?? receipt.postStateRoot,
    ledgerAnchorId: next.ledgerAnchorId ?? receipt.ledgerAnchorId,
    upgradeState: next.upgradeState,
  };
}

export function assertBtdProtocolUpgradeReceipt(
  receipt: BtdProtocolUpgradeReceipt,
): BtdProtocolUpgradeReceipt {
  if (receipt.kind !== 'btd.protocol_upgrade') {
    throw new Error('Invalid protocol upgrade receipt kind.');
  }

  assertNonEmptyString(receipt.upgradeId, 'upgradeId');
  assertNonEmptyString(receipt.fromVersion, 'fromVersion');
  assertNonEmptyString(receipt.toVersion, 'toVersion');
  assertLedgerNetwork(receipt.network);
  assertNonEmptyString(receipt.migrationRoot, 'migrationRoot');
  assertNonEmptyString(receipt.preStateRoot, 'preStateRoot');
  assertNonEmptyString(receipt.approvalReceiptRoot, 'approvalReceiptRoot');
  assertNonEmptyString(receipt.rollbackPlanRoot, 'rollbackPlanRoot');

  if (
    (receipt.upgradeState === 'applied' || receipt.upgradeState === 'verified') &&
    !receipt.postStateRoot
  ) {
    throw new Error('Applied or verified upgrade receipts require a postStateRoot.');
  }

  return receipt;
}
