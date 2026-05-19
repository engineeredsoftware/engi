import {
  buildV27CryptoDeploymentLane,
  buildV27CryptoDeploymentReadinessReceipt,
  V27_CRYPTO_DEPLOYMENT_ENVIRONMENT_KEYS,
  type V27CryptoDeploymentLaneKind,
  type V27CryptoDeploymentReadinessReceipt,
} from './deployment-lanes';
import {
  buildV27CryptoTelemetryRecord,
  type V27CryptoTelemetryRecord,
  type V27CryptoTelemetrySeverity,
} from './telemetry';
import {
  buildPlannedBtdProtocolUpgradeReceipt,
  type BtdProtocolUpgradeReceipt,
} from './upgrade';
import {
  applyBtdMeasureMint,
  createBtdMeasureMintState,
  type BtdMeasureMintReceipt,
} from './measuremint';
import { allocateAssetPackRange, type AssetPackRange } from './range';
import { buildBtdMintReceipt, type BtdMintReceipt } from './receipts';
import {
  buildPreparedAssetPackLedgerAnchor,
  type AssetPackLedgerAnchor,
} from './ledger-anchor';
import {
  buildTerminalJournalEntry,
  diffTerminalJournalProjection,
  type TerminalJournalDiff,
  type TerminalJournalEntry,
} from './terminal-journal';
import {
  reconcileLedgerDatabaseProjection,
  type DatabaseProjectedFact,
  type LedgerDatabaseReconciliationReport,
  type LedgerObservedFact,
} from './reconciliation';
import { createBtdSupplyState } from './supply';
import type { BitcoinNetwork, LedgerNetwork } from './constants';

export type TerminalOperationalReadinessState =
  | 'ready'
  | 'review'
  | 'blocked'
  | 'disabled'
  | 'future';

export type TerminalOperationalHealthSeverity = V27CryptoTelemetrySeverity | 'none';

export interface TerminalOperationalLaneRead {
  lane: V27CryptoDeploymentLaneKind;
  label: string;
  bitcoinNetwork: BitcoinNetwork;
  ledgerNetwork: LedgerNetwork;
  valueBearing: boolean;
  state: TerminalOperationalReadinessState;
  approvalPosture: string;
  signetProofRequired: boolean;
  telemetryRequired: boolean;
  rollbackPlanRoot: string;
  operationalApprovalRoot: string | null;
  missingEnvironmentKeys: string[];
  readinessReceipt: V27CryptoDeploymentReadinessReceipt | null;
}

export interface TerminalOperationalSubsystemRead {
  id: 'btc-broadcaster' | 'ledger-observer';
  label: string;
  state: Extract<TerminalOperationalReadinessState, 'ready' | 'review' | 'blocked'>;
  severity: TerminalOperationalHealthSeverity;
  summary: string;
  telemetryEventKinds: string[];
}

export interface TerminalOperationalUpgradeRead {
  state: BtdProtocolUpgradeReceipt['upgradeState'];
  migrationRoot: string;
  rollbackPlanRoot: string;
  approvalReceiptRoot: string;
  generatedTypeRefresh: {
    state: 'current' | 'pending' | 'blocked';
    source: string;
  };
  receipt: BtdProtocolUpgradeReceipt;
}

export interface TerminalOperationalProviderRead {
  provider: 'github' | 'gitlab' | 'bitbucket' | 'generic-git';
  state: TerminalOperationalReadinessState;
  summary: string;
}

export interface TerminalOperationalSettlementNetworkRead {
  id: 'bitcoin-taproot-psbt' | 'bsc' | 'opbnb' | 'binance-web3-wallet';
  state: TerminalOperationalReadinessState;
  summary: string;
}

export interface TerminalOperationalMintingRead {
  assetPackId: string;
  measurementReceipt: BtdMeasureMintReceipt;
  assetPackRange: AssetPackRange;
  mintReceipt: BtdMintReceipt;
  terminalJournalRows: TerminalJournalEntry[];
  terminalJournalDiff: TerminalJournalDiff;
  ledgerAnchor: AssetPackLedgerAnchor;
  ledgerObservedFacts: LedgerObservedFact[];
  databaseProjectedFacts: DatabaseProjectedFact[];
  ledgerDatabaseReconciliation: LedgerDatabaseReconciliationReport;
}

export interface TerminalOperationalHealthRead {
  kind: 'bitcode.terminal.operational_health_read';
  lanes: TerminalOperationalLaneRead[];
  telemetry: {
    severity: TerminalOperationalHealthSeverity;
    records: V27CryptoTelemetryRecord[];
  };
  broadcaster: TerminalOperationalSubsystemRead;
  observer: TerminalOperationalSubsystemRead;
  upgrade: TerminalOperationalUpgradeRead;
  providers: TerminalOperationalProviderRead[];
  settlementNetworks: TerminalOperationalSettlementNetworkRead[];
  testnetMinting: TerminalOperationalMintingRead;
  sourceBasis: string[];
}

export interface BuildTerminalOperationalHealthReadInput {
  issuedAt?: string;
  rollbackPlanRoot?: string;
  operationalApprovalRoots?: Partial<Record<V27CryptoDeploymentLaneKind, string>>;
  presentEnvironmentKeysByLane?: Partial<Record<V27CryptoDeploymentLaneKind, string[]>>;
  telemetryRecords?: V27CryptoTelemetryRecord[];
  upgradeReceipt?: BtdProtocolUpgradeReceipt;
  generatedTypeRefreshState?: TerminalOperationalUpgradeRead['generatedTypeRefresh']['state'];
}

const DEFAULT_ISSUED_AT = 'terminal-operational-health-read';
const DEFAULT_ROLLBACK_PLAN_ROOT = 'terminal-rollback-plan-root';

const LANE_CONFIG: Record<
  V27CryptoDeploymentLaneKind,
  {
    label: string;
    bitcoinNetwork: BitcoinNetwork;
    ledgerNetwork: LedgerNetwork;
    requiredEnvironmentKeys: string[];
  }
> = {
  local: {
    label: 'Local',
    bitcoinNetwork: 'regtest',
    ledgerNetwork: 'local',
    requiredEnvironmentKeys: ['BITCODE_CRYPTO_LANE', 'BITCODE_ROLLBACK_PLAN_ROOT'],
  },
  regtest: {
    label: 'Regtest',
    bitcoinNetwork: 'regtest',
    ledgerNetwork: 'regtest',
    requiredEnvironmentKeys: [...V27_CRYPTO_DEPLOYMENT_ENVIRONMENT_KEYS],
  },
  signet: {
    label: 'Signet',
    bitcoinNetwork: 'signet',
    ledgerNetwork: 'signet',
    requiredEnvironmentKeys: [...V27_CRYPTO_DEPLOYMENT_ENVIRONMENT_KEYS],
  },
  testnet: {
    label: 'Public testnet',
    bitcoinNetwork: 'testnet',
    ledgerNetwork: 'testnet',
    requiredEnvironmentKeys: [...V27_CRYPTO_DEPLOYMENT_ENVIRONMENT_KEYS],
  },
  'mainnet-ready': {
    label: 'Mainnet ready',
    bitcoinNetwork: 'mainnet',
    ledgerNetwork: 'mainnet',
    requiredEnvironmentKeys: [...V27_CRYPTO_DEPLOYMENT_ENVIRONMENT_KEYS],
  },
  'mainnet-value-bearing': {
    label: 'Mainnet value bearing',
    bitcoinNetwork: 'mainnet',
    ledgerNetwork: 'mainnet',
    requiredEnvironmentKeys: [
      ...V27_CRYPTO_DEPLOYMENT_ENVIRONMENT_KEYS,
      'BITCODE_OPERATIONAL_APPROVAL_ROOT',
    ],
  },
};

const LANE_ORDER = Object.keys(LANE_CONFIG) as V27CryptoDeploymentLaneKind[];

const SEVERITY_RANK: Record<TerminalOperationalHealthSeverity, number> = {
  none: 0,
  info: 1,
  warning: 2,
  critical: 3,
};

export function buildTerminalOperationalHealthRead(
  input: BuildTerminalOperationalHealthReadInput = {},
): TerminalOperationalHealthRead {
  const issuedAt = input.issuedAt ?? DEFAULT_ISSUED_AT;
  const rollbackPlanRoot = input.rollbackPlanRoot ?? DEFAULT_ROLLBACK_PLAN_ROOT;
  const telemetryRecords =
    input.telemetryRecords ??
    [
      buildV27CryptoTelemetryRecord({
        event: 'database_projection.repaired',
        subjectId: 'terminal-operational-health',
        receiptRoot: 'terminal-operational-health-receipt-root',
        issuedAt,
      }),
    ];

  const lanes = LANE_ORDER.map((lane) =>
    buildTerminalOperationalLaneRead({
      lane,
      issuedAt,
      rollbackPlanRoot,
      operationalApprovalRoot: input.operationalApprovalRoots?.[lane],
      presentEnvironmentKeys: input.presentEnvironmentKeysByLane?.[lane],
    }),
  );

  return {
    kind: 'bitcode.terminal.operational_health_read',
    lanes,
    telemetry: {
      severity: aggregateTerminalOperationalTelemetrySeverity(telemetryRecords),
      records: telemetryRecords,
    },
    broadcaster: buildTerminalOperationalSubsystemRead({
      id: 'btc-broadcaster',
      records: telemetryRecords,
    }),
    observer: buildTerminalOperationalSubsystemRead({
      id: 'ledger-observer',
      records: telemetryRecords,
    }),
    upgrade: buildTerminalOperationalUpgradeRead({
      issuedAt,
      rollbackPlanRoot,
      upgradeReceipt: input.upgradeReceipt,
      generatedTypeRefreshState: input.generatedTypeRefreshState,
    }),
    providers: buildTerminalOperationalProviderReads(),
    settlementNetworks: buildTerminalOperationalSettlementNetworkReads(),
    testnetMinting: buildTerminalOperationalMintingRead({ issuedAt }),
    sourceBasis: [
      'packages/btd/src/deployment-lanes.ts',
      'packages/btd/src/telemetry.ts',
      'packages/btd/src/upgrade.ts',
      'packages/btd/src/measuremint.ts',
      'packages/btd/src/range.ts',
      'packages/btd/src/receipts.ts',
      'packages/btd/src/terminal-journal.ts',
      'packages/btd/src/ledger-anchor.ts',
      'packages/btd/src/reconciliation.ts',
    ],
  };
}

export function aggregateTerminalOperationalTelemetrySeverity(
  records: V27CryptoTelemetryRecord[],
): TerminalOperationalHealthSeverity {
  return records.reduce<TerminalOperationalHealthSeverity>(
    (current, record) =>
      SEVERITY_RANK[record.severity] > SEVERITY_RANK[current] ? record.severity : current,
    'none',
  );
}

function buildTerminalOperationalLaneRead(input: {
  lane: V27CryptoDeploymentLaneKind;
  issuedAt: string;
  rollbackPlanRoot: string;
  operationalApprovalRoot?: string;
  presentEnvironmentKeys?: string[];
}): TerminalOperationalLaneRead {
  const config = LANE_CONFIG[input.lane];
  const presentEnvironmentKeys = input.presentEnvironmentKeys ?? config.requiredEnvironmentKeys;
  const operationalApprovalRoot = input.operationalApprovalRoot ?? null;

  if (input.lane === 'mainnet-value-bearing' && !operationalApprovalRoot) {
    return {
      lane: input.lane,
      label: config.label,
      bitcoinNetwork: config.bitcoinNetwork,
      ledgerNetwork: config.ledgerNetwork,
      valueBearing: true,
      state: 'blocked',
      approvalPosture: 'Blocked until an operational approval root is present.',
      signetProofRequired: true,
      telemetryRequired: true,
      rollbackPlanRoot: input.rollbackPlanRoot,
      operationalApprovalRoot,
      missingEnvironmentKeys: ['BITCODE_OPERATIONAL_APPROVAL_ROOT'],
      readinessReceipt: null,
    };
  }

  const deploymentLane = buildV27CryptoDeploymentLane({
    lane: input.lane,
    bitcoinNetwork: config.bitcoinNetwork,
    ledgerNetwork: config.ledgerNetwork,
    rollbackPlanRoot: input.rollbackPlanRoot,
    operationalApprovalRoot: operationalApprovalRoot ?? undefined,
  });
  const readinessReceipt = buildV27CryptoDeploymentReadinessReceipt({
    readinessId: `terminal:${input.lane}:readiness`,
    lane: deploymentLane,
    presentEnvironmentKeys,
    requiredEnvironmentKeys: config.requiredEnvironmentKeys,
    issuedAt: input.issuedAt,
  });

  return {
    lane: input.lane,
    label: config.label,
    bitcoinNetwork: config.bitcoinNetwork,
    ledgerNetwork: config.ledgerNetwork,
    valueBearing: deploymentLane.valueBearing,
    state: readinessReceipt.blocking ? 'blocked' : 'ready',
    approvalPosture: describeLaneApprovalPosture(input.lane, operationalApprovalRoot),
    signetProofRequired: deploymentLane.signetProofRequired,
    telemetryRequired: deploymentLane.telemetryRequired,
    rollbackPlanRoot: deploymentLane.rollbackPlanRoot,
    operationalApprovalRoot,
    missingEnvironmentKeys: readinessReceipt.missingEnvironmentKeys,
    readinessReceipt,
  };
}

function describeLaneApprovalPosture(
  lane: V27CryptoDeploymentLaneKind,
  operationalApprovalRoot: string | null,
): string {
  if (lane === 'mainnet-value-bearing') {
    return operationalApprovalRoot
      ? 'Operational approval root present for value-bearing mainnet.'
      : 'Blocked until an operational approval root is present.';
  }

  if (lane === 'mainnet-ready') {
    return 'Non-value mainnet readiness lane; signet proof and rollback roots remain required.';
  }

  if (lane === 'signet') {
    return 'Signet proof lane; no value-bearing mainnet settlement.';
  }

  return 'Non-value lane; no operational approval root required.';
}

function buildTerminalOperationalSubsystemRead(input: {
  id: TerminalOperationalSubsystemRead['id'];
  records: V27CryptoTelemetryRecord[];
}): TerminalOperationalSubsystemRead {
  const eventKinds =
    input.id === 'btc-broadcaster'
      ? [
          'btc_fee.transaction_construction_failed',
          'btc_fee.broadcast_rejected',
          'btc_fee.confirmation_lag',
          'btc_fee.replaced',
        ]
      : ['ledger_anchor.reorged', 'ledger_anchor.failed', 'ledger_provider.disagreement'];
  const matchingRecords = input.records.filter((record) => eventKinds.includes(record.event));
  const severity = aggregateTerminalOperationalTelemetrySeverity(matchingRecords);
  const state =
    severity === 'critical' ? 'blocked' : severity === 'warning' ? 'review' : 'ready';

  return {
    id: input.id,
    label: input.id === 'btc-broadcaster' ? 'BTC broadcaster' : 'Ledger observer',
    state,
    severity,
    summary:
      input.id === 'btc-broadcaster'
        ? describeBroadcasterSummary(state)
        : describeObserverSummary(state),
    telemetryEventKinds: eventKinds,
  };
}

function describeBroadcasterSummary(state: TerminalOperationalSubsystemRead['state']): string {
  if (state === 'blocked') {
    return 'Broadcast telemetry is critical; signing and fee transaction broadcast cannot be treated as ready.';
  }
  if (state === 'review') {
    return 'Broadcast telemetry requires operator review before value-bearing settlement.';
  }
  return 'Broadcast path is ready for PSBT construction, signing handoff, and transaction submission.';
}

function describeObserverSummary(state: TerminalOperationalSubsystemRead['state']): string {
  if (state === 'blocked') {
    return 'Ledger observation is critical; anchors or provider agreement must be repaired before promotion.';
  }
  if (state === 'review') {
    return 'Ledger observation requires review before promotion.';
  }
  return 'Ledger observation is ready for anchor finality and projection comparison.';
}

function buildTerminalOperationalUpgradeRead(input: {
  issuedAt: string;
  rollbackPlanRoot: string;
  upgradeReceipt?: BtdProtocolUpgradeReceipt;
  generatedTypeRefreshState?: TerminalOperationalUpgradeRead['generatedTypeRefresh']['state'];
}): TerminalOperationalUpgradeRead {
  const receipt =
    input.upgradeReceipt ??
    buildPlannedBtdProtocolUpgradeReceipt({
      upgradeId: 'terminal-upgrade-readiness',
      fromVersion: 'active-canon',
      toVersion: 'draft-target',
      network: 'signet',
      migrationRoot: 'terminal-migration-root',
      preStateRoot: 'terminal-pre-state-root',
      approvalReceiptRoot: 'terminal-approval-root',
      rollbackPlanRoot: input.rollbackPlanRoot,
      issuedAt: input.issuedAt,
    });

  return {
    state: receipt.upgradeState,
    migrationRoot: receipt.migrationRoot,
    rollbackPlanRoot: receipt.rollbackPlanRoot,
    approvalReceiptRoot: receipt.approvalReceiptRoot,
    generatedTypeRefresh: {
      state: input.generatedTypeRefreshState ?? 'pending',
      source: 'packages/orm/src/types/database.generated.ts',
    },
    receipt,
  };
}

function buildTerminalOperationalProviderReads(): TerminalOperationalProviderRead[] {
  return [
    {
      provider: 'github',
      state: 'ready',
      summary: 'GitHub repository selection, branch, commit, and PR delivery are the active VCS path.',
    },
    {
      provider: 'gitlab',
      state: 'future',
      summary: 'GitLab is not a launch VCS path for Terminal Reading.',
    },
    {
      provider: 'bitbucket',
      state: 'future',
      summary: 'Bitbucket is not a launch VCS path for Terminal Reading.',
    },
    {
      provider: 'generic-git',
      state: 'future',
      summary: 'Generic Git providers remain outside the current Terminal Reading admission path.',
    },
  ];
}

function buildTerminalOperationalSettlementNetworkReads(): TerminalOperationalSettlementNetworkRead[] {
  return [
    {
      id: 'bitcoin-taproot-psbt',
      state: 'ready',
      summary: 'Bitcoin Taproot commitments and PSBT signing are the first-class settlement path.',
    },
    {
      id: 'bsc',
      state: 'disabled',
      summary: 'BSC settlement pilots are disabled until a later Protocol gate explicitly admits them.',
    },
    {
      id: 'opbnb',
      state: 'disabled',
      summary: 'opBNB settlement pilots are disabled until a later Protocol gate explicitly admits them.',
    },
    {
      id: 'binance-web3-wallet',
      state: 'disabled',
      summary: 'Binance Web3 wallet pilots are disabled until a later Protocol gate explicitly admits them.',
    },
  ];
}

function buildTerminalOperationalMintingRead(input: {
  issuedAt: string;
}): TerminalOperationalMintingRead {
  const assetPackId = 'terminal-testnet-asset-pack';
  const measurement = applyBtdMeasureMint({
    state: createBtdMeasureMintState(),
    assetPackId,
    semanticVolume: { normalizedBitcodeVolume: 2n },
    proofRoot: 'terminal-measurement-proof-root',
    settlementJournalRoot: 'terminal-settlement-journal-root',
    accessPolicyHash: 'terminal-access-policy-hash',
    exchangeSequence: 1n,
    issuedAt: input.issuedAt,
  });
  const allocation = allocateAssetPackRange(
    createBtdSupplyState(),
    {
      assetPackId,
      readId: 'terminal-read',
      acceptedNeed: true,
      acceptedFit: true,
      sourceManifestRoot: 'terminal-source-manifest-root',
      measurementReceiptRoot: measurement.receipt.proofRoot,
      fitReceiptRoot: 'terminal-fit-receipt-root',
      proofRoot: 'terminal-mint-proof-root',
      dedupeReceiptRoot: 'terminal-dedupe-receipt-root',
      settlementJournalRoot: 'terminal-settlement-journal-root',
      exchangeReceiptRoot: 'terminal-exchange-receipt-root',
      accessPolicyId: 'terminal-access-policy',
      accessPolicyHash: 'terminal-access-policy-hash',
      normalizedBitcodeVolume: measurement.receipt.normalizedBitcodeVolume,
      tokenCount: Math.max(1, measurement.receipt.tokenCount),
      mintedAtExchangeSequence: 2n,
    },
  );
  const mintReceipt = buildBtdMintReceipt(allocation, input.issuedAt);
  const ledgerAnchor = buildPreparedAssetPackLedgerAnchor({
    anchorId: 'terminal-testnet-anchor',
    assetPackId,
    network: 'signet',
    commitmentMethod: 'taproot',
    commitmentRoot: 'terminal-anchor-commitment-root',
    sourceManifestRoot: mintReceipt.sourceManifestRoot,
    proofRoot: mintReceipt.proofRoot,
    accessPolicyHash: mintReceipt.accessPolicyHash,
    btdRangeStart: mintReceipt.rangeStart,
    btdRangeEndExclusive: mintReceipt.rangeEndExclusive,
  });
  const terminalJournalRows = [
    buildTerminalJournalEntry({
      journalEntryId: 'terminal-testnet-journal-mint',
      transactionKind: 'asset_pack_mint',
      actorId: 'terminal-operator',
      preStateRoot: 'terminal-pre-mint-state-root',
      postStateRoot: 'terminal-post-mint-state-root',
      receiptRoots: [mintReceipt.proofRoot, mintReceipt.measurementReceiptRoot],
      ledgerAnchorIds: [ledgerAnchor.anchorId],
      exchangeSequence: 3n,
      issuedAt: input.issuedAt,
    }),
    buildTerminalJournalEntry({
      journalEntryId: 'terminal-testnet-journal-anchor',
      transactionKind: 'asset_pack_anchor',
      actorId: 'terminal-operator',
      preStateRoot: 'terminal-post-mint-state-root',
      postStateRoot: 'terminal-post-anchor-state-root',
      receiptRoots: [ledgerAnchor.commitmentRoot],
      ledgerAnchorIds: [ledgerAnchor.anchorId],
      exchangeSequence: 4n,
      issuedAt: input.issuedAt,
    }),
  ];
  const terminalJournalDiff = diffTerminalJournalProjection(terminalJournalRows[0], {
    journalEntryId: terminalJournalRows[0].journalEntryId,
    postStateRoot: terminalJournalRows[0].postStateRoot,
    receiptRoots: terminalJournalRows[0].receiptRoots,
    ledgerAnchorIds: terminalJournalRows[0].ledgerAnchorIds,
  });
  const ledgerObservedFacts: LedgerObservedFact[] = [
    {
      factId: ledgerAnchor.anchorId,
      ledgerRoot: ledgerAnchor.commitmentRoot,
      finalityState: ledgerAnchor.finalityState,
    },
  ];
  const databaseProjectedFacts: DatabaseProjectedFact[] = [
    {
      factId: ledgerAnchor.anchorId,
      projectedLedgerRoot: ledgerAnchor.commitmentRoot,
      projectedFinalityState: ledgerAnchor.finalityState,
    },
  ];

  return {
    assetPackId,
    measurementReceipt: measurement.receipt,
    assetPackRange: allocation.range,
    mintReceipt,
    terminalJournalRows,
    terminalJournalDiff,
    ledgerAnchor,
    ledgerObservedFacts,
    databaseProjectedFacts,
    ledgerDatabaseReconciliation: reconcileLedgerDatabaseProjection({
      reconciliationId: 'terminal-testnet-reconciliation',
      ledgerFacts: ledgerObservedFacts,
      databaseFacts: databaseProjectedFacts,
      metaphysicalFacts: [
        {
          factId: 'terminal-need-fit-context',
          factKind: 'need_fit_context',
          canonicalRoot: 'terminal-private-need-fit-root',
          receiptRoot: mintReceipt.fitReceiptRoot,
          private: true,
        },
      ],
      issuedAt: input.issuedAt,
    }),
  };
}
