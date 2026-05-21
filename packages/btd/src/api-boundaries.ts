import { createHash } from 'crypto';
import type {
  BtdAccessPolicy,
  BtdOwnershipClaim,
  BtdReadLicense,
} from './access';
import { evaluateBtdReadAccess } from './access';
import type { BtdContributorMeasure } from './allocation';
import { allocateBtdContributorCells } from './allocation';
import type {
  BtdAncestorEdgeInput,
  BtdAncestorGraphEdge,
} from './ancestry';
import { reviewBtdAncestorEdges } from './ancestry';
import type {
  BtdInterfaceAuthoritySurface,
  BtdOrganizationPermissionAction,
  BtdOrganizationRole,
  BtdRepairApprovalState,
  BtdSettlementAuthorityState,
} from './authority';
import { evaluateBtdOrganizationInterfaceAuthority } from './authority';
import type {
  BtcFeeFinalityState,
  BtcFeePurpose,
  BtcFeeTransactionReceipt,
} from './bitcoin-fees';
import {
  advanceBtcFeeTransactionReceipt,
  assertBtcFeeTransactionReceipt,
  buildPreparedBtcFeeTransactionReceipt,
} from './bitcoin-fees';
import type {
  BtcFeeOperationPosture,
  BtcFeeQuote,
} from './btc-fee-operation';
import {
  assertBtcFeeQuote,
  assertBtcFeeQuoteActive,
  buildBtcFeeOperationPosture,
} from './btc-fee-operation';
import type {
  BitcoinNetwork,
  LedgerNetwork,
} from './constants';
import {
  BTD_MAX_MINTABLE_SUPPLY,
  assertNonEmptyString,
} from './constants';
import type { V27CryptoDeploymentLaneKind } from './deployment-lanes';
import {
  buildV27CryptoDeploymentLane,
  buildV27CryptoDeploymentReadinessReceipt,
} from './deployment-lanes';
import type {
  AssetPackExchangeOrder,
  AssetPackExchangeOrderKind,
  AssetPackRightsTransferReceipt,
} from './exchange';
import {
  acceptAssetPackExchangeOrder,
  buildAssetPackRightsTransferReceipt,
  cancelAssetPackExchangeOrder,
  createAssetPackExchangeOrder,
  settleAssetPackExchangeOrder,
} from './exchange';
import type {
  AssetPackLedgerAnchor,
  LedgerFinalityState,
} from './ledger-anchor';
import {
  advanceAssetPackLedgerAnchor,
  assertAssetPackLedgerAnchor,
  buildPreparedAssetPackLedgerAnchor,
} from './ledger-anchor';
import type { BtdMeasureMintState } from './measuremint';
import {
  applyBtdMeasureMint,
  createBtdMeasureMintState,
} from './measuremint';
import { allocateAssetPackRange } from './range';
import { buildBtdMintReceipt } from './receipts';
import type {
  DatabaseProjectedFact,
  LedgerObservedFact,
  MetaphysicalCanonicalFact,
  ProjectionRepairReceipt,
} from './reconciliation';
import { reconcileLedgerDatabaseProjection } from './reconciliation';
import type {
  BtdRevenueRecipientInput,
  BtdRevenueRouteException,
} from './revenue';
import {
  assertLicensedReadRevenueRouteConserved,
  buildLicensedReadRevenueRoute,
} from './revenue';
import type { SemanticVolumeUnitInput } from './semantic-volume';
import { measureProofAddressableSemanticVolume } from './semantic-volume';
import { createBtdSupplyState } from './supply';
import type {
  V27CryptoTelemetryEvent,
  V27CryptoTelemetryRecord,
} from './telemetry';
import { buildV27CryptoTelemetryRecord } from './telemetry';
import type {
  TerminalJournalEntry,
  TerminalJournalProjection,
  TerminalTransactionKind,
} from './terminal-journal';
import {
  buildTerminalJournalCoverageReceipt,
  buildTerminalJournalEntry,
  diffTerminalJournalProjection,
} from './terminal-journal';
import type {
  BtdProtocolUpgradeReceipt,
  BtdProtocolUpgradeState,
} from './upgrade';
import {
  advanceBtdProtocolUpgradeReceipt,
  buildPlannedBtdProtocolUpgradeReceipt,
} from './upgrade';
import type { WalletSignerSession } from './wallet';
import { createWalletSignerSession } from './wallet';

export interface BtdRegistrySnapshotReader {
  getSupplyState(): Promise<unknown>;
  listAssetPackRanges(assetPackId?: string): Promise<unknown[]>;
}

export interface BtdMintDraftInput {
  assetPackId: string;
  readId: string;
  acceptedNeed: true;
  acceptedFit: true;
  sourceManifestRoot: string;
  fitReceiptRoot: string;
  proofRoot: string;
  dedupeReceiptRoot: string;
  settlementJournalRoot: string;
  exchangeReceiptRoot: string;
  accessPolicyId: string;
  accessPolicyHash: string;
  semanticUnits: SemanticVolumeUnitInput[];
  contributors?: BtdContributorMeasure[];
  measureMintState?: BtdMeasureMintState;
  exchangeSequence: bigint;
  actorId?: string;
  issuedAt?: string;
}

export interface BtdMintDraft {
  kind: 'btd_mint_draft';
  assetPackId: string;
  measurement: ReturnType<typeof measureProofAddressableSemanticVolume>;
  measureMint: ReturnType<typeof applyBtdMeasureMint>['receipt'];
  rangeAllocation?: ReturnType<typeof allocateAssetPackRange>;
  mintReceipt?: ReturnType<typeof buildBtdMintReceipt>;
  contributorAllocation?: ReturnType<typeof allocateBtdContributorCells>;
  terminalJournalEntry: ReturnType<typeof buildTerminalJournalEntry>;
  blocking: boolean;
  zeroCell: boolean;
}

export interface BtdReadAccessInput {
  walletId: string;
  assetPackId: string;
  accessPolicy: BtdAccessPolicy;
  ownershipClaims?: BtdOwnershipClaim[];
  licenses?: BtdReadLicense[];
  at?: string;
}

export interface BtdReadAccessDecision {
  kind: 'btd_read_access_decision';
  actorId: string;
  assetPackId: string;
  decision: ReturnType<typeof evaluateBtdReadAccess>;
  policyDisclosure: {
    accessPolicyId: string;
    accessPolicyHash: string;
    ownerRead: boolean;
    licensedRead: boolean;
    derivativeUse: boolean;
    redistributionAllowed: boolean;
    confidentiality: BtdAccessPolicy['confidentiality'];
  };
}

export interface BtdOrganizationInterfaceAuthorityRouteInput {
  organizationId: string;
  organizationRole?: BtdOrganizationRole | null;
  organizationPermissionGrants?: string[];
  interfaceSurface: BtdInterfaceAuthoritySurface;
  action: BtdOrganizationPermissionAction;
  walletId?: string | null;
  readAccessDecision?: ReturnType<typeof evaluateBtdReadAccess> | null;
  settlementState?: BtdSettlementAuthorityState;
  confirmed?: boolean;
  repairApprovalState?: BtdRepairApprovalState;
  targetAnchor?: string | null;
  at?: string;
}

export type BtdOrganizationInterfaceAuthorityRouteDecision = ReturnType<
  typeof evaluateBtdOrganizationInterfaceAuthority
> & {
  routeKind: 'btd_organization_interface_authority_route_decision';
};

export interface BtdLicensedReadRevenueInput {
  paymentId: string;
  assetPackId: string;
  grossSats: bigint | number | string;
  directRecipients: BtdRevenueRecipientInput[];
  ancestorRecipients?: BtdRevenueRecipientInput[];
  treasuryWalletId: string;
  disputeHoldbackWalletId?: string;
  exchangeSequence: bigint;
  directSplitBps?: number;
  ancestorSplitBps?: number;
  treasurySplitBps?: number;
  disputeHoldbackBps?: number;
  pendingRoutes?: BtdRevenueRouteException[];
  failedRoutes?: BtdRevenueRouteException[];
  commitToRegistry?: boolean;
  actorId?: string;
  issuedAt?: string;
}

export interface BtdAncestryReviewInput {
  reviewId?: string;
  childAssetPackId: string;
  edges: BtdAncestorEdgeInput[];
  existingEdges?: BtdAncestorGraphEdge[];
  duplicateSourceRoots?: string[];
  minConfidenceBps?: number;
  citationOnlyPayable?: boolean;
  exchangeSequence: bigint;
  commitToRegistry?: boolean;
  actorId?: string;
  issuedAt?: string;
}

export type BtdBtcFeeTransactionAction =
  | 'prepare'
  | 'mark_signed'
  | 'mark_broadcast'
  | 'observe';

export type BtdWalletSignerSessionInput = Parameters<typeof createWalletSignerSession>[0];

export interface BtdBtcFeeTransactionInput {
  action: BtdBtcFeeTransactionAction;
  receiptId?: string;
  feePurpose?: BtcFeePurpose;
  payerSession?: WalletSignerSession | BtdWalletSignerSessionInput;
  psbt?: string;
  signedPsbt?: string;
  satsPaid?: bigint | number | string;
  satsPerVbyte?: number;
  exchangeSequence?: bigint;
  terminalJournalRoot?: string;
  relatedAssetPackId?: string;
  relatedOrderId?: string;
  previousReceipt?: BtcFeeTransactionReceipt;
  feeQuote?: BtcFeeQuote;
  txid?: string;
  vout?: number;
  observedFinalityState?: Exclude<BtcFeeFinalityState, 'prepared' | 'signed'>;
  confirmations?: number;
  commitToRegistry?: boolean;
  actorId?: string;
  issuedAt?: string;
}

export type BtdAssetPackLedgerAnchorAction = 'prepare' | 'mark_broadcast' | 'observe';

export interface BtdAssetPackLedgerAnchorInput {
  action: BtdAssetPackLedgerAnchorAction;
  anchorId?: string;
  assetPackId?: string;
  chain?: AssetPackLedgerAnchor['chain'];
  network?: AssetPackLedgerAnchor['network'];
  commitmentMethod?: AssetPackLedgerAnchor['commitmentMethod'];
  commitmentRoot?: string;
  sourceManifestRoot?: string;
  proofRoot?: string;
  accessPolicyHash?: string;
  btdRangeStart?: number;
  btdRangeEndExclusive?: number;
  contractAddress?: string;
  tokenId?: string;
  previousAnchor?: AssetPackLedgerAnchor;
  txidOrHash?: string;
  outputIndex?: number;
  observedFinalityState?: Exclude<LedgerFinalityState, 'prepared'>;
  confirmations?: number;
  exchangeSequence: bigint;
  commitToRegistry?: boolean;
  actorId?: string;
  issuedAt?: string;
}

export type BtdAssetPackExchangeAction =
  | 'create_order'
  | 'cancel_order'
  | 'accept_order'
  | 'settle_order'
  | 'transfer_rights';

export type BtdTerminalJournalAction = 'commit_entry' | 'diff_projection' | 'coverage';

export interface BtdAssetPackExchangeInput {
  action: BtdAssetPackExchangeAction;
  orderId?: string;
  orderKind?: AssetPackExchangeOrderKind;
  assetPackId?: string;
  rangeStart?: number;
  rangeEndExclusive?: number;
  makerWalletId?: string;
  takerWalletId?: string;
  priceSats?: bigint | number | string;
  accessPolicyHash?: string;
  createdAtExchangeSequence?: bigint;
  previousOrder?: AssetPackExchangeOrder;
  settledAtExchangeSequence?: bigint;
  ledgerAnchorId?: string;
  receiptId?: string;
  fromWalletId?: string;
  toWalletId?: string;
  btcFeeReceiptId?: string;
  commitToRegistry?: boolean;
  actorId?: string;
  issuedAt?: string;
}

export interface BtdTerminalJournalInput {
  action: BtdTerminalJournalAction;
  journalEntryId?: string;
  transactionKind?: TerminalTransactionKind;
  preStateRoot?: string;
  postStateRoot?: string;
  receiptRoots?: string[];
  ledgerAnchorIds?: string[];
  exchangeSequence?: bigint;
  entry?: TerminalJournalEntry;
  projection?: TerminalJournalProjection;
  coverageId?: string;
  entries?: TerminalJournalEntry[];
  commitToRegistry?: boolean;
  actorId?: string;
  issuedAt?: string;
}

export interface BtdLedgerDatabaseReconciliationInput {
  reconciliationId: string;
  ledgerFacts: LedgerObservedFact[];
  databaseFacts: DatabaseProjectedFact[];
  metaphysicalFacts?: MetaphysicalCanonicalFact[];
  settlementConservationChecks?: Parameters<typeof reconcileLedgerDatabaseProjection>[0]['settlementConservationChecks'];
  commitToRegistry?: boolean;
  actorId?: string;
  issuedAt?: string;
}

export type BtdDeploymentReadinessAction =
  | 'deployment_lane'
  | 'telemetry_event'
  | 'upgrade_plan'
  | 'upgrade_transition';

export interface BtdDeploymentReadinessInput {
  action: BtdDeploymentReadinessAction;
  readinessId?: string;
  lane?: V27CryptoDeploymentLaneKind;
  bitcoinNetwork?: BitcoinNetwork;
  ledgerNetwork?: LedgerNetwork;
  rollbackPlanRoot?: string;
  operationalApprovalRoot?: string;
  presentEnvironmentKeys?: string[];
  telemetryEvent?: V27CryptoTelemetryEvent;
  telemetrySubjectId?: string;
  telemetryReceiptRoot?: string;
  telemetryLedgerAnchorId?: string;
  upgradeId?: string;
  fromVersion?: string;
  toVersion?: string;
  migrationRoot?: string;
  preStateRoot?: string;
  postStateRoot?: string;
  approvalReceiptRoot?: string;
  previousUpgradeReceipt?: BtdProtocolUpgradeReceipt;
  nextUpgradeState?: Exclude<BtdProtocolUpgradeState, 'planned'>;
  ledgerAnchorId?: string;
  commitToRegistry?: boolean;
  actorId?: string;
  issuedAt?: string;
}

export interface BtdLicensedReadRevenueSettlement {
  kind: 'btd_licensed_read_revenue_settlement';
  actorId: string;
  receipt: ReturnType<typeof buildLicensedReadRevenueRoute>;
  terminalJournalEntry: ReturnType<typeof buildTerminalJournalEntry>;
  registryWrite?: unknown;
  committed: boolean;
}

export interface BtdAncestryReviewSettlement {
  kind: 'btd_ancestry_review_settlement';
  actorId: string;
  receipt: ReturnType<typeof reviewBtdAncestorEdges>;
  terminalJournalEntry: ReturnType<typeof buildTerminalJournalEntry>;
  registryWrites?: unknown[];
  committed: boolean;
}

export interface BtdBtcFeeTransactionSettlement {
  kind: 'btd_btc_fee_transaction_settlement';
  actorId: string;
  action: BtdBtcFeeTransactionAction;
  receipt: BtcFeeTransactionReceipt;
  operationPosture: BtcFeeOperationPosture;
  terminalJournalEntry: ReturnType<typeof buildTerminalJournalEntry>;
  registryWrite?: unknown;
  committed: boolean;
}

export interface BtdAssetPackLedgerAnchorSettlement {
  kind: 'btd_asset_pack_ledger_anchor_settlement';
  actorId: string;
  action: BtdAssetPackLedgerAnchorAction;
  anchor: AssetPackLedgerAnchor;
  terminalJournalEntry: ReturnType<typeof buildTerminalJournalEntry>;
  registryWrite?: unknown;
  committed: boolean;
}

export interface BtdAssetPackExchangeSettlement {
  kind: 'btd_asset_pack_exchange_settlement';
  actorId: string;
  action: BtdAssetPackExchangeAction;
  order?: AssetPackExchangeOrder;
  rightsTransfer?: AssetPackRightsTransferReceipt;
  terminalJournalEntry: ReturnType<typeof buildTerminalJournalEntry>;
  registryWrite?: unknown;
  committed: boolean;
}

export interface BtdTerminalJournalSettlement {
  kind: 'btd_terminal_journal_settlement';
  actorId: string;
  action: BtdTerminalJournalAction;
  entry?: TerminalJournalEntry;
  diff?: ReturnType<typeof diffTerminalJournalProjection>;
  coverage?: ReturnType<typeof buildTerminalJournalCoverageReceipt>;
  registryWrite?: unknown;
  committed: boolean;
}

export interface BtdLedgerDatabaseReconciliationSettlement {
  kind: 'btd_ledger_database_reconciliation_settlement';
  actorId: string;
  report: ReturnType<typeof reconcileLedgerDatabaseProjection>;
  terminalJournalEntry: ReturnType<typeof buildTerminalJournalEntry>;
  registryWrites?: unknown[];
  committed: boolean;
}

export interface BtdDeploymentReadinessSettlement {
  kind: 'btd_deployment_readiness_settlement';
  actorId: string;
  action: BtdDeploymentReadinessAction;
  readiness?: ReturnType<typeof buildV27CryptoDeploymentReadinessReceipt>;
  telemetry?: V27CryptoTelemetryRecord;
  upgradeReceipt?: BtdProtocolUpgradeReceipt;
  registryWrite?: unknown;
  committed: boolean;
}

export function buildBtdStableId(prefix: string, parts: string[]): string {
  const hash = createHash('sha256').update(parts.join('\u001f')).digest('hex').slice(0, 16);
  return `${prefix}_${hash}`;
}

export function parseBtdRequiredBigInt(value: unknown, label: string): bigint {
  if (typeof value === 'bigint') return value;
  if (typeof value === 'number') {
    if (!Number.isSafeInteger(value)) {
      throw new Error(`${label} must be a safe integer when supplied as a number.`);
    }
    return BigInt(value);
  }
  if (typeof value === 'string' && /^-?\d+$/.test(value)) return BigInt(value);
  throw new Error(`${label} must be an integer string, safe integer number, or bigint.`);
}

export function parseBtdOptionalBigInt(value: unknown, label: string): bigint | undefined {
  return value === undefined || value === null ? undefined : parseBtdRequiredBigInt(value, label);
}

export async function buildBtdRegistrySnapshot(input: {
  registry: BtdRegistrySnapshotReader;
  assetPackId?: string | null;
  activeCanonicalPointer?: string;
  draftTargetVersion?: string;
}) {
  const [supplyState, ranges] = await Promise.all([
    input.registry.getSupplyState(),
    input.registry.listAssetPackRanges(input.assetPackId || undefined),
  ]);

  return {
    kind: 'btd_registry_snapshot',
    activeCanonicalPointer: input.activeCanonicalPointer ?? 'V29',
    draftTargetVersion: input.draftTargetVersion ?? 'V30',
    maxSupply: BTD_MAX_MINTABLE_SUPPLY,
    supplyState,
    ranges,
    routePosture: {
      canonicalUnit: 'asset_pack_range',
      feeAsset: 'BTC',
      btdSpendableAsFee: false,
      valueBearingMainnetRequiresOperationalApproval: true,
    },
  };
}

export function buildBtdMintDraft(input: BtdMintDraftInput): BtdMintDraft {
  assertMintDraftAdmission(input);
  const issuedAt = input.issuedAt ?? new Date().toISOString();
  const measurementId = buildBtdStableId('btd-semantic-volume', [
    input.assetPackId,
    input.readId,
    input.semanticUnits.map((unit) => `${unit.unitId}:${unit.proofReceiptRoot}`).join('|'),
  ]);
  const measurement = measureProofAddressableSemanticVolume({
    measurementId,
    assetPackId: input.assetPackId,
    units: input.semanticUnits,
    issuedAt,
  });
  const measureMint = applyBtdMeasureMint({
    state: normalizeMeasureMintState(input.measureMintState),
    assetPackId: input.assetPackId,
    semanticVolume: measurement,
    proofRoot: input.proofRoot,
    settlementJournalRoot: input.settlementJournalRoot,
    accessPolicyHash: input.accessPolicyHash,
    exchangeSequence: input.exchangeSequence,
    issuedAt,
  });

  const rangeAllocation =
    measureMint.receipt.tokenCount > 0
      ? allocateAssetPackRange(
          createBtdSupplyState({
            totalMinted: measureMint.receipt.totalMintedBefore,
            nextTokenId: measureMint.receipt.totalMintedBefore,
            cumulativeAdmittedMeasurement: measureMint.receipt.cumulativeMeasurementBefore,
            residualMintCredit: measureMint.previousState.residualMintCredit,
            curveParameter: measureMint.previousState.curveParameter,
          }),
          {
            assetPackId: input.assetPackId,
            readId: input.readId,
            acceptedNeed: input.acceptedNeed,
            acceptedFit: input.acceptedFit,
            sourceManifestRoot: input.sourceManifestRoot,
            measurementReceiptRoot: measurement.measurementId,
            fitReceiptRoot: input.fitReceiptRoot,
            proofRoot: input.proofRoot,
            dedupeReceiptRoot: input.dedupeReceiptRoot,
            settlementJournalRoot: input.settlementJournalRoot,
            exchangeReceiptRoot: input.exchangeReceiptRoot,
            accessPolicyId: input.accessPolicyId,
            accessPolicyHash: input.accessPolicyHash,
            normalizedBitcodeVolume: measurement.normalizedBitcodeVolume,
            tokenCount: measureMint.receipt.tokenCount,
            mintedAtExchangeSequence: input.exchangeSequence,
          },
        )
      : undefined;
  const mintReceipt = rangeAllocation ? buildBtdMintReceipt(rangeAllocation, issuedAt) : undefined;
  const contributorAllocation =
    rangeAllocation && input.contributors?.length
      ? allocateBtdContributorCells({
          assetPackId: input.assetPackId,
          rangeStart: rangeAllocation.range.rangeStart,
          rangeEndExclusive: rangeAllocation.range.rangeEndExclusive,
          contributors: input.contributors,
          issuedAt,
        })
      : undefined;
  const receiptRoots = [
    measurement.measurementId,
    buildBtdStableId('btd-measure-mint', [input.assetPackId, input.exchangeSequence.toString()]),
    mintReceipt ? buildBtdStableId('btd-asset-pack-mint', [input.assetPackId, mintReceipt.issuedAt]) : null,
    contributorAllocation
      ? buildBtdStableId('btd-contributor-allocation', [input.assetPackId, contributorAllocation.issuedAt])
      : null,
  ].filter((value): value is string => Boolean(value));
  const terminalJournalEntry = buildTerminalJournalEntry({
    journalEntryId: buildBtdStableId('terminal-btd-mint-draft', [
      input.assetPackId,
      input.exchangeSequence.toString(),
    ]),
    transactionKind: measureMint.receipt.tokenCount > 0 ? 'asset_pack_mint' : 'measure_mint_tail',
    actorId: input.actorId ?? 'system:btd-mint-draft',
    preStateRoot: buildBtdStableId('btd-pre-state', [measureMint.receipt.totalMintedBefore.toString()]),
    postStateRoot: buildBtdStableId('btd-post-state', [
      measureMint.receipt.totalMintedAfter.toString(),
      measureMint.receipt.cumulativeMeasurementAfter.toString(),
    ]),
    receiptRoots,
    ledgerAnchorIds: [],
    exchangeSequence: input.exchangeSequence,
    issuedAt,
  });

  return {
    kind: 'btd_mint_draft',
    assetPackId: input.assetPackId,
    measurement,
    measureMint: measureMint.receipt,
    rangeAllocation,
    mintReceipt,
    contributorAllocation,
    terminalJournalEntry,
    blocking: false,
    zeroCell: measureMint.receipt.tokenCount === 0,
  };
}

export function assertBtdMintDraft(draft: BtdMintDraft): BtdMintDraft {
  if (draft.kind !== 'btd_mint_draft') {
    throw new Error('Invalid BTD mint draft kind.');
  }
  assertNonEmptyString(draft.assetPackId, 'assetPackId');
  if (!draft.measurement || draft.measurement.kind !== 'btd.semantic_volume_measurement') {
    throw new Error('BTD mint draft requires a semantic-volume measurement receipt.');
  }
  if (!draft.measureMint || draft.measureMint.kind !== 'btd.measure_mint') {
    throw new Error('BTD mint draft requires a measuremint receipt.');
  }
  if (!draft.terminalJournalEntry?.journalEntryId) {
    throw new Error('BTD mint draft requires a terminal journal entry.');
  }
  return draft;
}

export function buildBtdReadAccessDecision(
  input: BtdReadAccessInput & { actorId: string },
): BtdReadAccessDecision {
  assertNonEmptyString(input.actorId, 'actorId');
  assertNonEmptyString(input.walletId, 'walletId');
  assertNonEmptyString(input.assetPackId, 'assetPackId');
  const decision = evaluateBtdReadAccess(input);

  return {
    kind: 'btd_read_access_decision',
    actorId: input.actorId,
    assetPackId: input.assetPackId,
    decision,
    policyDisclosure: {
      accessPolicyId: input.accessPolicy.accessPolicyId,
      accessPolicyHash: input.accessPolicy.accessPolicyHash,
      ownerRead: input.accessPolicy.ownerRead,
      licensedRead: input.accessPolicy.licensedRead,
      derivativeUse: input.accessPolicy.derivativeUse,
      redistributionAllowed: input.accessPolicy.redistributionAllowed,
      confidentiality: input.accessPolicy.confidentiality,
    },
  };
}

export function buildBtdOrganizationInterfaceAuthorityDecision(
  input: BtdOrganizationInterfaceAuthorityRouteInput & { actorId: string },
): BtdOrganizationInterfaceAuthorityRouteDecision {
  const decision = evaluateBtdOrganizationInterfaceAuthority({
    ...input,
    actorId: assertNonEmptyString(input.actorId, 'actorId'),
  });

  return {
    ...decision,
    routeKind: 'btd_organization_interface_authority_route_decision',
  };
}

export function buildBtdLicensedReadRevenueSettlement(
  input: BtdLicensedReadRevenueInput & { actorId: string },
): Omit<BtdLicensedReadRevenueSettlement, 'committed'> {
  const actorId = assertNonEmptyString(input.actorId, 'actorId');
  const receipt = assertLicensedReadRevenueRouteConserved(
    buildLicensedReadRevenueRoute({
      paymentId: input.paymentId,
      assetPackId: input.assetPackId,
      grossSats: input.grossSats,
      directRecipients: input.directRecipients,
      ancestorRecipients: input.ancestorRecipients,
      treasuryWalletId: input.treasuryWalletId,
      disputeHoldbackWalletId: input.disputeHoldbackWalletId,
      exchangeSequence: input.exchangeSequence,
      directSplitBps: input.directSplitBps,
      ancestorSplitBps: input.ancestorSplitBps,
      treasurySplitBps: input.treasurySplitBps,
      disputeHoldbackBps: input.disputeHoldbackBps,
      pendingRoutes: input.pendingRoutes,
      failedRoutes: input.failedRoutes,
      issuedAt: input.issuedAt,
    }),
  );
  const terminalJournalEntry = buildTerminalJournalEntry({
    journalEntryId: buildBtdStableId('terminal-btd-licensed-read-revenue', [
      receipt.assetPackId,
      receipt.paymentId,
      receipt.exchangeSequence.toString(),
    ]),
    transactionKind: 'settlement_finalization',
    actorId,
    preStateRoot: buildBtdStableId('btd-revenue-pre-state', [receipt.paymentId]),
    postStateRoot: buildBtdStableId('btd-revenue-post-state', [
      receipt.paymentId,
      receipt.grossSats.toString(),
      receipt.routeState,
    ]),
    receiptRoots: [
      buildBtdStableId('btd-licensed-read-revenue-route', [
        receipt.assetPackId,
        receipt.paymentId,
        receipt.issuedAt,
      ]),
    ],
    ledgerAnchorIds: [],
    exchangeSequence: receipt.exchangeSequence,
    issuedAt: receipt.issuedAt,
  });

  return {
    kind: 'btd_licensed_read_revenue_settlement',
    actorId,
    receipt,
    terminalJournalEntry,
  };
}

export function buildBtdAncestryReviewSettlement(
  input: BtdAncestryReviewInput & { actorId: string },
): Omit<BtdAncestryReviewSettlement, 'committed'> {
  const actorId = assertNonEmptyString(input.actorId, 'actorId');
  assertNonEmptyString(input.childAssetPackId, 'childAssetPackId');
  if (typeof input.exchangeSequence !== 'bigint' || input.exchangeSequence <= 0n) {
    throw new Error('BTD ancestry review requires a positive Exchange sequence.');
  }

  const issuedAt = input.issuedAt ?? new Date().toISOString();
  const reviewId =
    input.reviewId ??
    buildBtdStableId('btd-ancestry-review', [input.childAssetPackId, input.exchangeSequence.toString()]);
  const receipt = reviewBtdAncestorEdges({
    reviewId,
    childAssetPackId: input.childAssetPackId,
    edges: input.edges,
    existingEdges: input.existingEdges,
    duplicateSourceRoots: input.duplicateSourceRoots,
    minConfidenceBps: input.minConfidenceBps,
    citationOnlyPayable: input.citationOnlyPayable,
    issuedAt,
  });
  const terminalJournalEntry = buildTerminalJournalEntry({
    journalEntryId: buildBtdStableId('terminal-btd-ancestry-review', [
      receipt.childAssetPackId,
      receipt.reviewId,
    ]),
    transactionKind: 'settlement_finalization',
    actorId,
    preStateRoot: buildBtdStableId('btd-ancestry-pre-state', [receipt.childAssetPackId]),
    postStateRoot: buildBtdStableId('btd-ancestry-post-state', [
      receipt.childAssetPackId,
      String(receipt.payableEdgeCount),
      String(receipt.recordedUnpaidEdgeCount),
      String(receipt.rejectedEdgeCount),
    ]),
    receiptRoots: [receipt.reviewId],
    ledgerAnchorIds: [],
    exchangeSequence: input.exchangeSequence,
    issuedAt,
  });

  return {
    kind: 'btd_ancestry_review_settlement',
    actorId,
    receipt,
    terminalJournalEntry,
  };
}

export function buildBtdBtcFeeTransactionSettlement(
  input: BtdBtcFeeTransactionInput & { actorId: string },
): Omit<BtdBtcFeeTransactionSettlement, 'committed'> {
  const actorId = assertNonEmptyString(input.actorId, 'actorId');
  const issuedAt = input.issuedAt ?? new Date().toISOString();
  const feeQuote = normalizeBtcFeeQuote(input.feeQuote);
  const receipt = buildBtcFeeReceiptForAction({ ...input, feeQuote, issuedAt });
  const payerSession = input.payerSession ? normalizeWalletSignerSession(input.payerSession) : undefined;
  const operationPosture = buildBtcFeeOperationPosture({
    quote: feeQuote,
    receipt,
    payerSession,
    at: issuedAt,
  });
  const terminalJournalEntry = buildTerminalJournalEntry({
    journalEntryId: buildBtdStableId('terminal-btd-btc-fee', [
      receipt.receiptId,
      receipt.finalityState,
      receipt.exchangeSequence.toString(),
    ]),
    transactionKind: 'btc_fee_payment',
    actorId,
    preStateRoot: buildBtdStableId('btc-fee-pre-state', [
      input.previousReceipt?.receiptId ?? receipt.receiptId,
      input.previousReceipt?.finalityState ?? 'none',
    ]),
    postStateRoot: buildBtdStableId('btc-fee-post-state', [
      receipt.receiptId,
      receipt.finalityState,
      receipt.txid ?? 'no-txid',
      String(receipt.confirmations),
    ]),
    receiptRoots: [receipt.receiptId],
    ledgerAnchorIds: receipt.txid ? [receipt.txid] : [],
    exchangeSequence: receipt.exchangeSequence,
    issuedAt,
  });

  return {
    kind: 'btd_btc_fee_transaction_settlement',
    actorId,
    action: input.action,
    receipt,
    operationPosture,
    terminalJournalEntry,
  };
}

export function buildBtdAssetPackLedgerAnchorSettlement(
  input: BtdAssetPackLedgerAnchorInput & { actorId: string },
): Omit<BtdAssetPackLedgerAnchorSettlement, 'committed'> {
  const actorId = assertNonEmptyString(input.actorId, 'actorId');
  if (typeof input.exchangeSequence !== 'bigint' || input.exchangeSequence <= 0n) {
    throw new Error('AssetPack ledger anchor settlement requires a positive Exchange sequence.');
  }
  const issuedAt = input.issuedAt ?? new Date().toISOString();
  const anchor = buildAssetPackLedgerAnchorForAction(input);
  const terminalJournalEntry = buildTerminalJournalEntry({
    journalEntryId: buildBtdStableId('terminal-btd-asset-pack-anchor', [
      anchor.anchorId,
      anchor.finalityState,
      input.exchangeSequence.toString(),
    ]),
    transactionKind: 'asset_pack_anchor',
    actorId,
    preStateRoot: buildBtdStableId('asset-pack-anchor-pre-state', [
      input.previousAnchor?.anchorId ?? anchor.anchorId,
      input.previousAnchor?.finalityState ?? 'none',
    ]),
    postStateRoot: buildBtdStableId('asset-pack-anchor-post-state', [
      anchor.anchorId,
      anchor.finalityState,
      anchor.txidOrHash ?? 'no-ledger-id',
      String(anchor.confirmations),
    ]),
    receiptRoots: [anchor.anchorId],
    ledgerAnchorIds: anchor.txidOrHash ? [anchor.txidOrHash] : [],
    exchangeSequence: input.exchangeSequence,
    issuedAt,
  });

  return {
    kind: 'btd_asset_pack_ledger_anchor_settlement',
    actorId,
    action: input.action,
    anchor,
    terminalJournalEntry,
  };
}

export function buildBtdAssetPackExchangeSettlement(
  input: BtdAssetPackExchangeInput & { actorId: string },
): Omit<BtdAssetPackExchangeSettlement, 'committed'> {
  const actorId = assertNonEmptyString(input.actorId, 'actorId');
  const { order, rightsTransfer, exchangeSequence } = buildAssetPackExchangeForAction(input);
  const receiptRoot = rightsTransfer?.receiptId ?? order?.orderId;
  if (!receiptRoot) {
    throw new Error('AssetPack Exchange settlement requires an order or rights-transfer receipt.');
  }
  const terminalJournalEntry = buildTerminalJournalEntry({
    journalEntryId: buildBtdStableId('terminal-btd-asset-pack-exchange', [
      input.action,
      receiptRoot,
      exchangeSequence.toString(),
    ]),
    transactionKind: rightsTransfer ? 'rights_transfer' : 'exchange_order',
    actorId,
    preStateRoot: buildBtdStableId('asset-pack-exchange-pre-state', [
      input.previousOrder?.orderId ?? input.orderId ?? receiptRoot,
      input.previousOrder?.orderState ?? 'none',
    ]),
    postStateRoot: buildBtdStableId('asset-pack-exchange-post-state', [
      order?.orderId ?? rightsTransfer?.orderId ?? receiptRoot,
      order?.orderState ?? 'rights_transfer',
      rightsTransfer?.btcFeeReceiptId ?? 'no-fee',
    ]),
    receiptRoots: [receiptRoot],
    ledgerAnchorIds: [order?.ledgerAnchorId, rightsTransfer?.ledgerAnchorId].filter(
      (value): value is string => Boolean(value),
    ),
    exchangeSequence,
    issuedAt: input.issuedAt,
  });

  return {
    kind: 'btd_asset_pack_exchange_settlement',
    actorId,
    action: input.action,
    order,
    rightsTransfer,
    terminalJournalEntry,
  };
}

export function buildBtdTerminalJournalSettlement(
  input: BtdTerminalJournalInput & { actorId: string },
): Omit<BtdTerminalJournalSettlement, 'committed'> {
  const actorId = assertNonEmptyString(input.actorId, 'actorId');

  switch (input.action) {
    case 'commit_entry': {
      const entry =
        input.entry ??
        buildTerminalJournalEntry({
          journalEntryId: assertNonEmptyString(input.journalEntryId, 'journalEntryId'),
          transactionKind: requireTerminalTransactionKind(input.transactionKind),
          actorId,
          preStateRoot: assertNonEmptyString(input.preStateRoot, 'preStateRoot'),
          postStateRoot: assertNonEmptyString(input.postStateRoot, 'postStateRoot'),
          receiptRoots: input.receiptRoots ?? [],
          ledgerAnchorIds: input.ledgerAnchorIds,
          exchangeSequence: requireBigInt(input.exchangeSequence, 'exchangeSequence'),
          issuedAt: input.issuedAt,
        });

      return {
        kind: 'btd_terminal_journal_settlement',
        actorId,
        action: input.action,
        entry: normalizeTerminalJournalEntry(entry),
      };
    }
    case 'diff_projection': {
      const entry = normalizeTerminalJournalEntry(input.entry);
      if (!input.projection) {
        throw new Error('Terminal journal diff requires projection.');
      }

      return {
        kind: 'btd_terminal_journal_settlement',
        actorId,
        action: input.action,
        entry,
        diff: diffTerminalJournalProjection(entry, input.projection),
      };
    }
    case 'coverage': {
      if (!input.coverageId) throw new Error('Terminal journal coverage requires coverageId.');
      if (!input.entries?.length) {
        throw new Error('Terminal journal coverage requires entries.');
      }

      return {
        kind: 'btd_terminal_journal_settlement',
        actorId,
        action: input.action,
        coverage: buildTerminalJournalCoverageReceipt({
          coverageId: input.coverageId,
          entries: input.entries.map((entry) => normalizeTerminalJournalEntry(entry)),
          issuedAt: input.issuedAt,
        }),
      };
    }
    default:
      throw new Error(
        `Unsupported Terminal journal action: ${(input as { action: string }).action}.`,
      );
  }
}

export function buildBtdLedgerDatabaseReconciliationSettlement(
  input: BtdLedgerDatabaseReconciliationInput & { actorId: string },
): Omit<BtdLedgerDatabaseReconciliationSettlement, 'committed'> {
  const actorId = assertNonEmptyString(input.actorId, 'actorId');
  const report = reconcileLedgerDatabaseProjection({
    reconciliationId: input.reconciliationId,
    ledgerFacts: input.ledgerFacts,
    databaseFacts: input.databaseFacts,
    metaphysicalFacts: input.metaphysicalFacts,
    settlementConservationChecks: input.settlementConservationChecks,
    issuedAt: input.issuedAt,
  });
  const terminalJournalEntry = buildTerminalJournalEntry({
    journalEntryId: buildBtdStableId('terminal-btd-reconciliation', [
      report.reconciliationId,
      String(report.repairs.length),
      String(report.blocking),
    ]),
    transactionKind: 'ledger_database_reconciliation',
    actorId,
    preStateRoot: buildBtdStableId('reconciliation-pre-state', [
      report.reconciliationId,
      String(input.databaseFacts.length),
    ]),
    postStateRoot: buildBtdStableId('reconciliation-post-state', [
      report.reconciliationId,
      String(report.repairs.length),
      String(report.blocking),
      String(report.metaphysicalFacts.length),
    ]),
    receiptRoots: [
      report.reconciliationId,
      ...report.repairs.map((repair) => repair.repairId),
      ...report.metaphysicalFacts.map((fact) => fact.receiptRoot ?? fact.canonicalRoot),
      report.proofRoots.ledgerObservedRoot,
      report.proofRoots.databaseProjectionRoot,
      report.proofRoots.repairPlanRoot,
      report.proofRoots.settlementConservationRoot,
    ],
    ledgerAnchorIds: input.ledgerFacts.map((fact) => fact.factId),
    exchangeSequence: BigInt(Math.max(1, input.ledgerFacts.length + input.databaseFacts.length)),
    issuedAt: input.issuedAt,
  });

  return {
    kind: 'btd_ledger_database_reconciliation_settlement',
    actorId,
    report,
    terminalJournalEntry,
  };
}

export function buildBtdDeploymentReadinessSettlement(
  input: BtdDeploymentReadinessInput & { actorId: string },
): Omit<BtdDeploymentReadinessSettlement, 'committed'> {
  const actorId = assertNonEmptyString(input.actorId, 'actorId');

  switch (input.action) {
    case 'deployment_lane': {
      if (!input.readinessId) throw new Error('Deployment readiness requires readinessId.');
      if (!input.lane) throw new Error('Deployment readiness requires lane.');
      if (!input.bitcoinNetwork) throw new Error('Deployment readiness requires bitcoinNetwork.');
      if (!input.ledgerNetwork) throw new Error('Deployment readiness requires ledgerNetwork.');
      if (!input.rollbackPlanRoot) {
        throw new Error('Deployment readiness requires rollbackPlanRoot.');
      }

      const lane = buildV27CryptoDeploymentLane({
        lane: input.lane,
        bitcoinNetwork: input.bitcoinNetwork,
        ledgerNetwork: input.ledgerNetwork,
        rollbackPlanRoot: input.rollbackPlanRoot,
        operationalApprovalRoot: input.operationalApprovalRoot,
      });

      return {
        kind: 'btd_deployment_readiness_settlement',
        actorId,
        action: input.action,
        readiness: buildV27CryptoDeploymentReadinessReceipt({
          readinessId: input.readinessId,
          lane,
          presentEnvironmentKeys: input.presentEnvironmentKeys ?? [],
          issuedAt: input.issuedAt,
        }),
      };
    }
    case 'telemetry_event': {
      if (!input.telemetryEvent) throw new Error('Telemetry settlement requires event.');
      if (!input.telemetrySubjectId) {
        throw new Error('Telemetry settlement requires subjectId.');
      }

      return {
        kind: 'btd_deployment_readiness_settlement',
        actorId,
        action: input.action,
        telemetry: buildV27CryptoTelemetryRecord({
          event: input.telemetryEvent,
          subjectId: input.telemetrySubjectId,
          receiptRoot: input.telemetryReceiptRoot,
          ledgerAnchorId: input.telemetryLedgerAnchorId,
          issuedAt: input.issuedAt,
        }),
      };
    }
    case 'upgrade_plan': {
      if (!input.upgradeId) throw new Error('Upgrade plan requires upgradeId.');
      if (!input.fromVersion) throw new Error('Upgrade plan requires fromVersion.');
      if (!input.toVersion) throw new Error('Upgrade plan requires toVersion.');
      if (!input.ledgerNetwork) throw new Error('Upgrade plan requires ledgerNetwork.');
      if (!input.migrationRoot) throw new Error('Upgrade plan requires migrationRoot.');
      if (!input.preStateRoot) throw new Error('Upgrade plan requires preStateRoot.');
      if (!input.approvalReceiptRoot) {
        throw new Error('Upgrade plan requires approvalReceiptRoot.');
      }
      if (!input.rollbackPlanRoot) throw new Error('Upgrade plan requires rollbackPlanRoot.');

      return {
        kind: 'btd_deployment_readiness_settlement',
        actorId,
        action: input.action,
        upgradeReceipt: buildPlannedBtdProtocolUpgradeReceipt({
          upgradeId: input.upgradeId,
          fromVersion: input.fromVersion,
          toVersion: input.toVersion,
          network: input.ledgerNetwork,
          migrationRoot: input.migrationRoot,
          preStateRoot: input.preStateRoot,
          approvalReceiptRoot: input.approvalReceiptRoot,
          rollbackPlanRoot: input.rollbackPlanRoot,
          issuedAt: input.issuedAt,
        }),
      };
    }
    case 'upgrade_transition': {
      if (!input.previousUpgradeReceipt) {
        throw new Error('Upgrade transition requires previousUpgradeReceipt.');
      }
      if (!input.nextUpgradeState) {
        throw new Error('Upgrade transition requires nextUpgradeState.');
      }

      return {
        kind: 'btd_deployment_readiness_settlement',
        actorId,
        action: input.action,
        upgradeReceipt: advanceBtdProtocolUpgradeReceipt(input.previousUpgradeReceipt, {
          upgradeState: input.nextUpgradeState,
          postStateRoot: input.postStateRoot,
          ledgerAnchorId: input.ledgerAnchorId,
        }),
      };
    }
    default:
      throw new Error(
        `Unsupported deployment readiness action: ${(input as { action: string }).action}.`,
      );
  }
}

export function toBtdJsonSafe(value: unknown): unknown {
  if (typeof value === 'bigint') {
    return value.toString();
  }

  if (Array.isArray(value)) {
    return value.map((entry) => toBtdJsonSafe(entry));
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, entry]) => [
        key,
        toBtdJsonSafe(entry),
      ]),
    );
  }

  return value;
}

function assertMintDraftAdmission(input: BtdMintDraftInput): void {
  if (input.acceptedNeed !== true) {
    throw new Error('BTD mint draft requires accepted Read.');
  }

  if (input.acceptedFit !== true) {
    throw new Error('BTD mint draft requires accepted Finding Fits result.');
  }

  if (!input.semanticUnits.length) {
    throw new Error('BTD mint draft requires at least one semantic unit.');
  }

  assertNonEmptyString(input.assetPackId, 'assetPackId');
  assertNonEmptyString(input.readId, 'readId');
  assertNonEmptyString(input.sourceManifestRoot, 'sourceManifestRoot');
  assertNonEmptyString(input.fitReceiptRoot, 'fitReceiptRoot');
  assertNonEmptyString(input.proofRoot, 'proofRoot');
  assertNonEmptyString(input.dedupeReceiptRoot, 'dedupeReceiptRoot');
  assertNonEmptyString(input.settlementJournalRoot, 'settlementJournalRoot');
  assertNonEmptyString(input.exchangeReceiptRoot, 'exchangeReceiptRoot');
  assertNonEmptyString(input.accessPolicyId, 'accessPolicyId');
  assertNonEmptyString(input.accessPolicyHash, 'accessPolicyHash');

  if (typeof input.exchangeSequence !== 'bigint' || input.exchangeSequence <= 0n) {
    throw new Error('BTD mint draft requires a positive Exchange sequence.');
  }
}

function normalizeMeasureMintState(state?: BtdMeasureMintState): BtdMeasureMintState {
  if (!state) {
    return createBtdMeasureMintState();
  }

  return createBtdMeasureMintState({
    totalMinted: state.totalMinted,
    nextTokenId: state.nextTokenId,
    cumulativeAdmittedMeasurement: state.cumulativeAdmittedMeasurement,
    curveParameter: state.curveParameter,
  });
}

function buildBtcFeeReceiptForAction(
  input: BtdBtcFeeTransactionInput,
): BtcFeeTransactionReceipt {
  switch (input.action) {
    case 'prepare': {
      if (!input.receiptId) throw new Error('BTC fee prepare requires receiptId.');
      if (!input.feePurpose) throw new Error('BTC fee prepare requires feePurpose.');
      if (!input.payerSession) throw new Error('BTC fee prepare requires payerSession.');
      if (!input.psbt) throw new Error('BTC fee prepare requires psbt.');
      if (input.satsPaid === undefined) throw new Error('BTC fee prepare requires satsPaid.');
      if (typeof input.exchangeSequence !== 'bigint') {
        throw new Error('BTC fee prepare requires bigint exchangeSequence.');
      }
      if (!input.terminalJournalRoot) {
        throw new Error('BTC fee prepare requires terminalJournalRoot.');
      }

      if (input.feeQuote) {
        const feeQuote = assertBtcFeeQuoteActive(input.feeQuote, input.issuedAt);
        if (feeQuote.state !== 'accepted') {
          throw new Error('BTC fee prepare requires an accepted feeQuote.');
        }
        if (feeQuote.feePurpose !== input.feePurpose) {
          throw new Error('BTC fee quote purpose does not match prepare input.');
        }
        if (feeQuote.sats !== BigInt(input.satsPaid)) {
          throw new Error('BTC fee quote sats do not match prepare input.');
        }
      }

      return buildPreparedBtcFeeTransactionReceipt({
        receiptId: input.receiptId,
        feePurpose: input.feePurpose,
        payerSession: normalizeWalletSignerSession(input.payerSession),
        psbt: input.psbt,
        satsPaid: input.satsPaid,
        satsPerVbyte: input.satsPerVbyte,
        exchangeSequence: input.exchangeSequence,
        terminalJournalRoot: input.terminalJournalRoot,
        relatedAssetPackId: input.relatedAssetPackId,
        relatedOrderId: input.relatedOrderId,
        issuedAt: input.issuedAt,
      });
    }
    case 'mark_signed': {
      const previous = normalizeBtcFeeTransactionReceipt(input.previousReceipt);
      return advanceBtcFeeTransactionReceipt(previous, {
        finalityState: 'signed',
        psbt: assertNonEmptyString(input.signedPsbt, 'signedPsbt'),
      });
    }
    case 'mark_broadcast': {
      const previous = normalizeBtcFeeTransactionReceipt(input.previousReceipt);
      return advanceBtcFeeTransactionReceipt(previous, {
        finalityState: 'broadcast',
        txid: assertNonEmptyString(input.txid, 'txid'),
        vout: input.vout,
      });
    }
    case 'observe': {
      const previous = normalizeBtcFeeTransactionReceipt(input.previousReceipt);
      const observedFinalityState = input.observedFinalityState;
      if (
        observedFinalityState !== 'confirmed' &&
        observedFinalityState !== 'replaced' &&
        observedFinalityState !== 'reorged' &&
        observedFinalityState !== 'failed' &&
        observedFinalityState !== 'broadcast'
      ) {
        throw new Error('BTC fee observe requires an observed finality state.');
      }

      return advanceBtcFeeTransactionReceipt(previous, {
        finalityState: observedFinalityState,
        txid: input.txid ?? previous.txid ?? undefined,
        confirmations: input.confirmations,
      });
    }
    default:
      throw new Error(`Unsupported BTC fee transaction action: ${(input as { action: string }).action}.`);
  }
}

function buildAssetPackLedgerAnchorForAction(
  input: BtdAssetPackLedgerAnchorInput,
): AssetPackLedgerAnchor {
  switch (input.action) {
    case 'prepare': {
      if (!input.anchorId) throw new Error('AssetPack ledger anchor prepare requires anchorId.');
      if (!input.assetPackId) {
        throw new Error('AssetPack ledger anchor prepare requires assetPackId.');
      }
      if (!input.network) throw new Error('AssetPack ledger anchor prepare requires network.');
      if (!input.commitmentRoot) {
        throw new Error('AssetPack ledger anchor prepare requires commitmentRoot.');
      }
      if (!input.sourceManifestRoot) {
        throw new Error('AssetPack ledger anchor prepare requires sourceManifestRoot.');
      }
      if (!input.proofRoot) throw new Error('AssetPack ledger anchor prepare requires proofRoot.');
      if (!input.accessPolicyHash) {
        throw new Error('AssetPack ledger anchor prepare requires accessPolicyHash.');
      }
      if (input.btdRangeStart === undefined || input.btdRangeEndExclusive === undefined) {
        throw new Error('AssetPack ledger anchor prepare requires BTD range bounds.');
      }

      return buildPreparedAssetPackLedgerAnchor({
        anchorId: input.anchorId,
        assetPackId: input.assetPackId,
        chain: input.chain,
        network: input.network,
        commitmentMethod: input.commitmentMethod,
        commitmentRoot: input.commitmentRoot,
        sourceManifestRoot: input.sourceManifestRoot,
        proofRoot: input.proofRoot,
        accessPolicyHash: input.accessPolicyHash,
        btdRangeStart: input.btdRangeStart,
        btdRangeEndExclusive: input.btdRangeEndExclusive,
        contractAddress: input.contractAddress,
        tokenId: input.tokenId,
      });
    }
    case 'mark_broadcast': {
      const previous = normalizeAssetPackLedgerAnchor(input.previousAnchor);
      return advanceAssetPackLedgerAnchor(previous, {
        finalityState: 'broadcast',
        txidOrHash: assertNonEmptyString(input.txidOrHash, 'txidOrHash'),
        outputIndex: input.outputIndex,
        anchoredAt: input.issuedAt,
      });
    }
    case 'observe': {
      const previous = normalizeAssetPackLedgerAnchor(input.previousAnchor);
      const observedFinalityState = input.observedFinalityState;
      if (
        observedFinalityState !== 'confirmed' &&
        observedFinalityState !== 'reorged' &&
        observedFinalityState !== 'failed' &&
        observedFinalityState !== 'broadcast'
      ) {
        throw new Error('AssetPack ledger anchor observe requires an observed finality state.');
      }

      return advanceAssetPackLedgerAnchor(previous, {
        finalityState: observedFinalityState,
        txidOrHash: input.txidOrHash ?? previous.txidOrHash ?? undefined,
        confirmations: input.confirmations,
        outputIndex: input.outputIndex,
        anchoredAt: input.issuedAt,
      });
    }
    default:
      throw new Error(
        `Unsupported AssetPack ledger anchor action: ${(input as { action: string }).action}.`,
      );
  }
}

function buildAssetPackExchangeForAction(input: BtdAssetPackExchangeInput): {
  order?: AssetPackExchangeOrder;
  rightsTransfer?: AssetPackRightsTransferReceipt;
  exchangeSequence: bigint;
} {
  switch (input.action) {
    case 'create_order': {
      if (!input.orderId) throw new Error('AssetPack Exchange order creation requires orderId.');
      if (!input.orderKind) {
        throw new Error('AssetPack Exchange order creation requires orderKind.');
      }
      if (!input.assetPackId) {
        throw new Error('AssetPack Exchange order creation requires assetPackId.');
      }
      if (input.rangeStart === undefined || input.rangeEndExclusive === undefined) {
        throw new Error('AssetPack Exchange order creation requires range bounds.');
      }
      if (!input.makerWalletId) {
        throw new Error('AssetPack Exchange order creation requires makerWalletId.');
      }
      if (input.priceSats === undefined) {
        throw new Error('AssetPack Exchange order creation requires priceSats.');
      }
      if (!input.accessPolicyHash) {
        throw new Error('AssetPack Exchange order creation requires accessPolicyHash.');
      }
      if (typeof input.createdAtExchangeSequence !== 'bigint') {
        throw new Error('AssetPack Exchange order creation requires createdAtExchangeSequence.');
      }

      const order = createAssetPackExchangeOrder({
        orderId: input.orderId,
        orderKind: input.orderKind,
        assetPackId: input.assetPackId,
        rangeStart: input.rangeStart,
        rangeEndExclusive: input.rangeEndExclusive,
        makerWalletId: input.makerWalletId,
        priceSats: input.priceSats,
        accessPolicyHash: input.accessPolicyHash,
        createdAtExchangeSequence: input.createdAtExchangeSequence,
      });
      return { order, exchangeSequence: order.createdAtExchangeSequence };
    }
    case 'cancel_order': {
      const order = cancelAssetPackExchangeOrder(
        normalizeAssetPackExchangeOrder(input.previousOrder),
      );
      return { order, exchangeSequence: order.createdAtExchangeSequence };
    }
    case 'accept_order': {
      if (!input.takerWalletId) {
        throw new Error('AssetPack Exchange order acceptance requires takerWalletId.');
      }
      const order = acceptAssetPackExchangeOrder(
        normalizeAssetPackExchangeOrder(input.previousOrder),
        input.takerWalletId,
      );
      return { order, exchangeSequence: order.createdAtExchangeSequence };
    }
    case 'settle_order': {
      if (typeof input.settledAtExchangeSequence !== 'bigint') {
        throw new Error('AssetPack Exchange order settlement requires settledAtExchangeSequence.');
      }
      const order = settleAssetPackExchangeOrder(
        normalizeAssetPackExchangeOrder(input.previousOrder),
        {
          settledAtExchangeSequence: input.settledAtExchangeSequence,
          ledgerAnchorId: input.ledgerAnchorId,
        },
      );
      return { order, exchangeSequence: input.settledAtExchangeSequence };
    }
    case 'transfer_rights': {
      if (!input.receiptId) {
        throw new Error('AssetPack rights transfer requires receiptId.');
      }
      if (!input.fromWalletId || !input.toWalletId) {
        throw new Error('AssetPack rights transfer requires fromWalletId and toWalletId.');
      }
      if (!input.btcFeeReceiptId) {
        throw new Error('AssetPack rights transfer requires btcFeeReceiptId.');
      }

      const rightsTransfer = buildAssetPackRightsTransferReceipt({
        receiptId: input.receiptId,
        settledOrder: normalizeAssetPackExchangeOrder(input.previousOrder),
        fromWalletId: input.fromWalletId,
        toWalletId: input.toWalletId,
        btcFeeReceiptId: input.btcFeeReceiptId,
        issuedAt: input.issuedAt,
      });
      return { rightsTransfer, exchangeSequence: rightsTransfer.exchangeSequence };
    }
    default:
      throw new Error(
        `Unsupported AssetPack Exchange action: ${(input as { action: string }).action}.`,
      );
  }
}

function normalizeWalletSignerSession(
  session: WalletSignerSession | BtdWalletSignerSessionInput,
): WalletSignerSession {
  if ('serverCustody' in session && 'state' in session) {
    return session;
  }

  return createWalletSignerSession(session);
}

function normalizeBtcFeeTransactionReceipt(
  receipt: BtcFeeTransactionReceipt | undefined,
): BtcFeeTransactionReceipt {
  if (!receipt) {
    throw new Error('BTC fee transition requires previousReceipt.');
  }

  return assertBtcFeeTransactionReceipt({
    ...receipt,
    satsPaid: BigInt(receipt.satsPaid),
    exchangeSequence: BigInt(receipt.exchangeSequence),
    serverCustody: false,
  });
}

function normalizeBtcFeeQuote(quote: BtcFeeQuote | undefined): BtcFeeQuote | undefined {
  if (!quote) {
    return undefined;
  }

  return assertBtcFeeQuote({
    ...quote,
    sats: BigInt(quote.sats),
  });
}

function normalizeAssetPackLedgerAnchor(
  anchor: AssetPackLedgerAnchor | undefined,
): AssetPackLedgerAnchor {
  if (!anchor) {
    throw new Error('AssetPack ledger anchor transition requires previousAnchor.');
  }

  return assertAssetPackLedgerAnchor(anchor);
}

function normalizeAssetPackExchangeOrder(
  order: AssetPackExchangeOrder | undefined,
): AssetPackExchangeOrder {
  if (!order) {
    throw new Error('AssetPack Exchange transition requires previousOrder.');
  }

  return {
    ...order,
    priceSats: BigInt(order.priceSats),
    createdAtExchangeSequence: BigInt(order.createdAtExchangeSequence),
    settledAtExchangeSequence:
      order.settledAtExchangeSequence === undefined
        ? undefined
        : BigInt(order.settledAtExchangeSequence),
  };
}

function normalizeTerminalJournalEntry(entry: TerminalJournalEntry | undefined): TerminalJournalEntry {
  if (!entry) {
    throw new Error('Terminal journal action requires entry.');
  }

  return buildTerminalJournalEntry({
    ...entry,
    exchangeSequence: BigInt(entry.exchangeSequence),
  });
}

function requireTerminalTransactionKind(
  kind: TerminalTransactionKind | undefined,
): TerminalTransactionKind {
  if (!kind) {
    throw new Error('Terminal journal entry requires transactionKind.');
  }

  return kind;
}

function requireBigInt(value: bigint | undefined, label: string): bigint {
  if (typeof value !== 'bigint') {
    throw new Error(`${label} must be a bigint.`);
  }

  return value;
}
