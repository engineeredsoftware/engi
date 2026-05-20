import { createHash } from 'crypto';
import { traceRoute } from '@bitcode/observability';
import { createAdminClient, type BtdRegistryModel } from '@bitcode/orm';
import { createClient } from '@bitcode/supabase/ssr/server';
import { createJsonResponse } from '@bitcode/responses';
import {
  BTD_MAX_MINTABLE_SUPPLY,
  type BitcoinNetwork,
  type BtdAncestorEdgeInput,
  type BtdAncestorGraphEdge,
  type BtdAccessPolicy,
  type BtdContributorMeasure,
  type BtdMeasureMintState,
  type BtdOwnershipClaim,
  type BtdReadLicense,
  type BtdRevenueRecipientInput,
  type BtdRevenueRouteException,
  type BtdProtocolUpgradeReceipt,
  type BtdProtocolUpgradeState,
  type AssetPackLedgerAnchor,
  type AssetPackExchangeOrder,
  type AssetPackExchangeOrderKind,
  type AssetPackRightsTransferReceipt,
  type BtcFeeFinalityState,
  type BtcFeeOperationPosture,
  type DatabaseProjectedFact,
  type BtcFeePurpose,
  type BtcFeeQuote,
  type BtcFeeTransactionReceipt,
  type LedgerObservedFact,
  type LedgerFinalityState,
  type LedgerNetwork,
  type MetaphysicalCanonicalFact,
  type ProjectionRepairReceipt,
  type SemanticVolumeUnitInput,
  type TerminalJournalEntry,
  type TerminalJournalProjection,
  type TerminalTransactionKind,
  type V27CryptoDeploymentLaneKind,
  type V27CryptoTelemetryEvent,
  type V27CryptoTelemetryRecord,
  type WalletSignerSession,
  allocateAssetPackRange,
  allocateBtdContributorCells,
  advanceBtcFeeTransactionReceipt,
  advanceAssetPackLedgerAnchor,
  acceptAssetPackExchangeOrder,
  assertAssetPackLedgerAnchor,
  assertBtcFeeTransactionReceipt,
  assertLicensedReadRevenueRouteConserved,
  assertNonEmptyString,
  applyBtdMeasureMint,
  buildBtdMintReceipt,
  buildAssetPackRightsTransferReceipt,
  buildV27CryptoDeploymentLane,
  buildV27CryptoDeploymentReadinessReceipt,
  buildV27CryptoTelemetryRecord,
  buildPreparedAssetPackLedgerAnchor,
  buildPreparedBtcFeeTransactionReceipt,
  buildBtcFeeOperationPosture,
  assertBtcFeeQuote,
  assertBtcFeeQuoteActive,
  buildLicensedReadRevenueRoute,
  buildPlannedBtdProtocolUpgradeReceipt,
  buildTerminalJournalEntry,
  buildTerminalJournalCoverageReceipt,
  createWalletSignerSession,
  cancelAssetPackExchangeOrder,
  createAssetPackExchangeOrder,
  createBtdMeasureMintState,
  createBtdSupplyState,
  evaluateBtdReadAccess,
  measureProofAddressableSemanticVolume,
  reviewBtdAncestorEdges,
  settleAssetPackExchangeOrder,
  diffTerminalJournalProjection,
  reconcileLedgerDatabaseProjection,
  advanceBtdProtocolUpgradeReceipt,
} from '@bitcode/btd';

type AuthenticatedUser = {
  userId: string;
};

type BtdRouteAuthResolver = (request: Request) => Promise<AuthenticatedUser | null>;

type BtdRouteOptions = {
  registry?: BtdRegistryModel;
  resolveAuthenticatedUser?: BtdRouteAuthResolver;
};

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

type BtdReadAccessRouteInput = Omit<BtdReadAccessInput, 'accessPolicy'> & {
  accessPolicy?: BtdAccessPolicy;
};

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
  registryWrite?: Awaited<ReturnType<BtdRegistryModel['insertLicensedReadRevenueRoute']>>;
  committed: boolean;
}

export interface BtdAncestryReviewSettlement {
  kind: 'btd_ancestry_review_settlement';
  actorId: string;
  receipt: ReturnType<typeof reviewBtdAncestorEdges>;
  terminalJournalEntry: ReturnType<typeof buildTerminalJournalEntry>;
  registryWrites?: Awaited<ReturnType<BtdRegistryModel['insertAncestorEdge']>>[];
  committed: boolean;
}

export interface BtdBtcFeeTransactionSettlement {
  kind: 'btd_btc_fee_transaction_settlement';
  actorId: string;
  action: BtdBtcFeeTransactionAction;
  receipt: BtcFeeTransactionReceipt;
  operationPosture: BtcFeeOperationPosture;
  terminalJournalEntry: ReturnType<typeof buildTerminalJournalEntry>;
  registryWrite?: Awaited<ReturnType<BtdRegistryModel['insertBtcFeeTransaction']>>;
  committed: boolean;
}

export interface BtdAssetPackLedgerAnchorSettlement {
  kind: 'btd_asset_pack_ledger_anchor_settlement';
  actorId: string;
  action: BtdAssetPackLedgerAnchorAction;
  anchor: AssetPackLedgerAnchor;
  terminalJournalEntry: ReturnType<typeof buildTerminalJournalEntry>;
  registryWrite?: Awaited<ReturnType<BtdRegistryModel['insertLedgerAnchor']>>;
  committed: boolean;
}

export interface BtdAssetPackExchangeSettlement {
  kind: 'btd_asset_pack_exchange_settlement';
  actorId: string;
  action: BtdAssetPackExchangeAction;
  order?: AssetPackExchangeOrder;
  rightsTransfer?: AssetPackRightsTransferReceipt;
  terminalJournalEntry: ReturnType<typeof buildTerminalJournalEntry>;
  registryWrite?: Awaited<
    | ReturnType<BtdRegistryModel['insertExchangeOrder']>
    | ReturnType<BtdRegistryModel['updateExchangeOrder']>
    | ReturnType<BtdRegistryModel['insertRightsTransferReceipt']>
  >;
  committed: boolean;
}

export interface BtdTerminalJournalSettlement {
  kind: 'btd_terminal_journal_settlement';
  actorId: string;
  action: BtdTerminalJournalAction;
  entry?: TerminalJournalEntry;
  diff?: ReturnType<typeof diffTerminalJournalProjection>;
  coverage?: ReturnType<typeof buildTerminalJournalCoverageReceipt>;
  registryWrite?: Awaited<ReturnType<BtdRegistryModel['insertTerminalJournalEntry']>>;
  committed: boolean;
}

export interface BtdLedgerDatabaseReconciliationSettlement {
  kind: 'btd_ledger_database_reconciliation_settlement';
  actorId: string;
  report: ReturnType<typeof reconcileLedgerDatabaseProjection>;
  terminalJournalEntry: ReturnType<typeof buildTerminalJournalEntry>;
  registryWrites?: Awaited<ReturnType<BtdRegistryModel['insertReconciliationRepair']>>[];
  committed: boolean;
}

export interface BtdDeploymentReadinessSettlement {
  kind: 'btd_deployment_readiness_settlement';
  actorId: string;
  action: BtdDeploymentReadinessAction;
  readiness?: ReturnType<typeof buildV27CryptoDeploymentReadinessReceipt>;
  telemetry?: V27CryptoTelemetryRecord;
  upgradeReceipt?: BtdProtocolUpgradeReceipt;
  registryWrite?: Awaited<
    | ReturnType<BtdRegistryModel['insertCryptoTelemetryEvent']>
    | ReturnType<BtdRegistryModel['insertProtocolUpgradeReceipt']>
  >;
  committed: boolean;
}

let defaultRegistry: BtdRegistryModel | null = null;

function getDefaultRegistry() {
  if (!defaultRegistry) {
    defaultRegistry = createAdminClient().btdRegistry;
  }

  return defaultRegistry;
}

async function defaultResolveAuthenticatedUser(): Promise<AuthenticatedUser | null> {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user || error) {
    return null;
  }

  return { userId: user.id };
}

export async function buildBtdRegistrySnapshot(input: {
  registry: BtdRegistryModel;
  assetPackId?: string | null;
}) {
  const [supplyState, ranges] = await Promise.all([
    input.registry.getSupplyState(),
    input.registry.listAssetPackRanges(input.assetPackId || undefined),
  ]);

  return {
    kind: 'btd_registry_snapshot',
    activeCanonicalPointer: 'V27',
    draftTargetVersion: 'V28',
    maxSupply: BTD_MAX_MINTABLE_SUPPLY,
    supplyState,
    ranges,
    routePosture: {
      canonicalCommercialUnit: 'asset_pack_range',
      feeAsset: 'BTC',
      btdSpendableAsFee: false,
      valueBearingMainnetRequiresOperationalApproval: true,
    },
  };
}

export function buildBtdMintDraft(input: BtdMintDraftInput): BtdMintDraft {
  assertMintDraftAdmission(input);
  const issuedAt = input.issuedAt ?? new Date().toISOString();
  const measurementId = stableId('btd-semantic-volume', [
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
            residualMintCredit: measureMint.receipt.residualMintCreditBefore,
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
    stableId('btd-measure-mint', [input.assetPackId, input.exchangeSequence.toString()]),
    mintReceipt ? stableId('btd-asset-pack-mint', [input.assetPackId, mintReceipt.issuedAt]) : null,
    contributorAllocation
      ? stableId('btd-contributor-allocation', [input.assetPackId, contributorAllocation.issuedAt])
      : null,
  ].filter((value): value is string => Boolean(value));
  const terminalJournalEntry = buildTerminalJournalEntry({
    journalEntryId: stableId('terminal-v27-btd-mint-draft', [
      input.assetPackId,
      input.exchangeSequence.toString(),
    ]),
    transactionKind: measureMint.receipt.tokenCount > 0 ? 'asset_pack_mint' : 'measure_mint_tail',
    actorId: input.actorId ?? 'system:v27-btd-mint-draft',
    preStateRoot: stableId('btd-pre-state', [measureMint.receipt.totalMintedBefore.toString()]),
    postStateRoot: stableId('btd-post-state', [
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

export function buildBtdLicensedReadRevenueSettlement(
  input: BtdLicensedReadRevenueInput & { actorId: string },
): Omit<BtdLicensedReadRevenueSettlement, 'registryWrite' | 'committed'> {
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
    journalEntryId: stableId('terminal-v27-licensed-read-revenue', [
      receipt.assetPackId,
      receipt.paymentId,
      receipt.exchangeSequence.toString(),
    ]),
    transactionKind: 'settlement_finalization',
    actorId,
    preStateRoot: stableId('btd-revenue-pre-state', [receipt.paymentId]),
    postStateRoot: stableId('btd-revenue-post-state', [
      receipt.paymentId,
      receipt.grossSats.toString(),
      receipt.routeState,
    ]),
    receiptRoots: [
      stableId('btd-licensed-read-revenue-route', [
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
): Omit<BtdAncestryReviewSettlement, 'registryWrites' | 'committed'> {
  const actorId = assertNonEmptyString(input.actorId, 'actorId');
  assertNonEmptyString(input.childAssetPackId, 'childAssetPackId');
  if (typeof input.exchangeSequence !== 'bigint' || input.exchangeSequence <= 0n) {
    throw new Error('BTD ancestry review requires a positive Exchange sequence.');
  }

  const issuedAt = input.issuedAt ?? new Date().toISOString();
  const reviewId =
    input.reviewId ??
    stableId('btd-ancestry-review', [input.childAssetPackId, input.exchangeSequence.toString()]);
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
    journalEntryId: stableId('terminal-btd-ancestry-review', [
      receipt.childAssetPackId,
      receipt.reviewId,
    ]),
    transactionKind: 'settlement_finalization',
    actorId,
    preStateRoot: stableId('btd-ancestry-pre-state', [receipt.childAssetPackId]),
    postStateRoot: stableId('btd-ancestry-post-state', [
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
): Omit<BtdBtcFeeTransactionSettlement, 'registryWrite' | 'committed'> {
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
    journalEntryId: stableId('terminal-btd-btc-fee', [
      receipt.receiptId,
      receipt.finalityState,
      receipt.exchangeSequence.toString(),
    ]),
    transactionKind: 'btc_fee_payment',
    actorId,
    preStateRoot: stableId('btc-fee-pre-state', [
      input.previousReceipt?.receiptId ?? receipt.receiptId,
      input.previousReceipt?.finalityState ?? 'none',
    ]),
    postStateRoot: stableId('btc-fee-post-state', [
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
): Omit<BtdAssetPackLedgerAnchorSettlement, 'registryWrite' | 'committed'> {
  const actorId = assertNonEmptyString(input.actorId, 'actorId');
  if (typeof input.exchangeSequence !== 'bigint' || input.exchangeSequence <= 0n) {
    throw new Error('AssetPack ledger anchor settlement requires a positive Exchange sequence.');
  }
  const issuedAt = input.issuedAt ?? new Date().toISOString();
  const anchor = buildAssetPackLedgerAnchorForAction(input);
  const terminalJournalEntry = buildTerminalJournalEntry({
    journalEntryId: stableId('terminal-btd-asset-pack-anchor', [
      anchor.anchorId,
      anchor.finalityState,
      input.exchangeSequence.toString(),
    ]),
    transactionKind: 'asset_pack_anchor',
    actorId,
    preStateRoot: stableId('asset-pack-anchor-pre-state', [
      input.previousAnchor?.anchorId ?? anchor.anchorId,
      input.previousAnchor?.finalityState ?? 'none',
    ]),
    postStateRoot: stableId('asset-pack-anchor-post-state', [
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
): Omit<BtdAssetPackExchangeSettlement, 'registryWrite' | 'committed'> {
  const actorId = assertNonEmptyString(input.actorId, 'actorId');
  const { order, rightsTransfer, exchangeSequence } = buildAssetPackExchangeForAction(input);
  const receiptRoot = rightsTransfer?.receiptId ?? order?.orderId;
  if (!receiptRoot) {
    throw new Error('AssetPack Exchange settlement requires an order or rights-transfer receipt.');
  }
  const terminalJournalEntry = buildTerminalJournalEntry({
    journalEntryId: stableId('terminal-btd-asset-pack-exchange', [
      input.action,
      receiptRoot,
      exchangeSequence.toString(),
    ]),
    transactionKind: rightsTransfer ? 'rights_transfer' : 'exchange_order',
    actorId,
    preStateRoot: stableId('asset-pack-exchange-pre-state', [
      input.previousOrder?.orderId ?? input.orderId ?? receiptRoot,
      input.previousOrder?.orderState ?? 'none',
    ]),
    postStateRoot: stableId('asset-pack-exchange-post-state', [
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
): Omit<BtdTerminalJournalSettlement, 'registryWrite' | 'committed'> {
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
): Omit<BtdLedgerDatabaseReconciliationSettlement, 'registryWrites' | 'committed'> {
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
    journalEntryId: stableId('terminal-btd-reconciliation', [
      report.reconciliationId,
      String(report.repairs.length),
      String(report.blocking),
    ]),
    transactionKind: 'ledger_database_reconciliation',
    actorId,
    preStateRoot: stableId('reconciliation-pre-state', [
      report.reconciliationId,
      String(input.databaseFacts.length),
    ]),
    postStateRoot: stableId('reconciliation-post-state', [
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
): Omit<BtdDeploymentReadinessSettlement, 'registryWrite' | 'committed'> {
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

export function buildGetBtdRegistrySnapshotRoute(options: BtdRouteOptions = {}) {
  return traceRoute('/btd/registry', async (request: Request) => {
    const user = await (options.resolveAuthenticatedUser ?? defaultResolveAuthenticatedUser)(
      request,
    );
    if (!user) {
      return createJsonResponse({ error: 'Unauthorized' }, 401);
    }

    const url = new URL(request.url);
    const snapshot = await buildBtdRegistrySnapshot({
      registry: options.registry ?? getDefaultRegistry(),
      assetPackId: url.searchParams.get('assetPackId'),
    });

    return createJsonResponse(toJsonSafe(snapshot));
  });
}

export function buildPostBtdMintDraftRoute(options: BtdRouteOptions = {}) {
  return traceRoute('/btd/mint-draft', async (request: Request) => {
    const user = await (options.resolveAuthenticatedUser ?? defaultResolveAuthenticatedUser)(
      request,
    );
    if (!user) {
      return createJsonResponse({ error: 'Unauthorized' }, 401);
    }

    let body: Omit<BtdMintDraftInput, 'actorId' | 'exchangeSequence'> & {
      exchangeSequence: string | number;
    };
    try {
      body = await request.json();
    } catch {
      return createJsonResponse({ error: 'Invalid JSON body' }, 400);
    }

    let draft: BtdMintDraft;
    try {
      draft = buildBtdMintDraft({
        ...body,
        actorId: user.userId,
        exchangeSequence: BigInt(body.exchangeSequence),
      });
    } catch (error) {
      return createJsonResponse({ error: toBadRequestMessage(error) }, 400);
    }

    return createJsonResponse(toJsonSafe(draft));
  });
}

export function buildPostBtdReadAccessRoute(options: BtdRouteOptions = {}) {
  return traceRoute('/btd/read-access', async (request: Request) => {
    const user = await (options.resolveAuthenticatedUser ?? defaultResolveAuthenticatedUser)(
      request,
    );
    if (!user) {
      return createJsonResponse({ error: 'Unauthorized' }, 401);
    }

    let body: BtdReadAccessRouteInput;
    try {
      body = await request.json();
    } catch {
      return createJsonResponse({ error: 'Invalid JSON body' }, 400);
    }

    let decision: BtdReadAccessDecision;
    try {
      const registry = options.registry;
      const accessPolicy =
        body.accessPolicy ?? (await resolveRegistryAccessPolicy(registry, body.assetPackId));
      const ownershipClaims =
        body.ownershipClaims ??
        (registry
          ? mapRegistryOwnershipClaims(
              await registry.listOwnershipClaims({
                walletId: body.walletId,
                assetPackId: body.assetPackId,
              }),
            )
          : undefined);
      const licenses =
        body.licenses ??
        (registry
          ? mapRegistryReadLicenses(
              await registry.listReadLicenses({
                walletId: body.walletId,
                assetPackId: body.assetPackId,
              }),
            )
          : undefined);

      decision = buildBtdReadAccessDecision({
        ...body,
        accessPolicy,
        ownershipClaims,
        licenses,
        actorId: user.userId,
      });
    } catch (error) {
      return createJsonResponse({ error: toBadRequestMessage(error) }, 400);
    }

    return createJsonResponse(toJsonSafe(decision));
  });
}

export function buildPostBtdLicensedReadRevenueRoute(options: BtdRouteOptions = {}) {
  return traceRoute('/btd/licensed-read-revenue', async (request: Request) => {
    const user = await (options.resolveAuthenticatedUser ?? defaultResolveAuthenticatedUser)(
      request,
    );
    if (!user) {
      return createJsonResponse({ error: 'Unauthorized' }, 401);
    }

    let body: Omit<BtdLicensedReadRevenueInput, 'actorId' | 'exchangeSequence'> & {
      exchangeSequence: string | number;
    };
    try {
      body = await request.json();
    } catch {
      return createJsonResponse({ error: 'Invalid JSON body' }, 400);
    }

    let settlement: BtdLicensedReadRevenueSettlement;
    try {
      const draft = buildBtdLicensedReadRevenueSettlement({
        ...body,
        actorId: user.userId,
        exchangeSequence: BigInt(body.exchangeSequence),
      });
      const registry =
        body.commitToRegistry === true ? options.registry ?? getDefaultRegistry() : undefined;
      const registryWrite = registry
        ? await registry.insertLicensedReadRevenueRoute(toRevenueRegistryRow(draft.receipt))
        : undefined;

      settlement = {
        ...draft,
        registryWrite,
        committed: Boolean(registryWrite),
      };
    } catch (error) {
      return createJsonResponse({ error: toBadRequestMessage(error) }, 400);
    }

    return createJsonResponse(toJsonSafe(settlement));
  });
}

export function buildPostBtdAncestryReviewRoute(options: BtdRouteOptions = {}) {
  return traceRoute('/btd/ancestry-review', async (request: Request) => {
    const user = await (options.resolveAuthenticatedUser ?? defaultResolveAuthenticatedUser)(
      request,
    );
    if (!user) {
      return createJsonResponse({ error: 'Unauthorized' }, 401);
    }

    let body: Omit<BtdAncestryReviewInput, 'actorId' | 'exchangeSequence'> & {
      exchangeSequence: string | number;
    };
    try {
      body = await request.json();
    } catch {
      return createJsonResponse({ error: 'Invalid JSON body' }, 400);
    }

    let settlement: BtdAncestryReviewSettlement;
    try {
      const draft = buildBtdAncestryReviewSettlement({
        ...body,
        actorId: user.userId,
        exchangeSequence: BigInt(body.exchangeSequence),
      });
      const registry =
        body.commitToRegistry === true ? options.registry ?? getDefaultRegistry() : undefined;
      const registryWrites = registry
        ? await Promise.all(
            draft.receipt.edges.map((edge, index) =>
              registry.insertAncestorEdge(toAncestorEdgeRegistryRow(draft.receipt, edge, index)),
            ),
          )
        : undefined;

      settlement = {
        ...draft,
        registryWrites,
        committed: Boolean(registryWrites),
      };
    } catch (error) {
      return createJsonResponse({ error: toBadRequestMessage(error) }, 400);
    }

    return createJsonResponse(toJsonSafe(settlement));
  });
}

export function buildPostBtdBtcFeeTransactionRoute(options: BtdRouteOptions = {}) {
  return traceRoute('/btd/btc-fee-transaction', async (request: Request) => {
    const user = await (options.resolveAuthenticatedUser ?? defaultResolveAuthenticatedUser)(
      request,
    );
    if (!user) {
      return createJsonResponse({ error: 'Unauthorized' }, 401);
    }

    let body: BtdBtcFeeTransactionInput;
    try {
      body = await request.json();
    } catch {
      return createJsonResponse({ error: 'Invalid JSON body' }, 400);
    }

    let settlement: BtdBtcFeeTransactionSettlement;
    try {
      const draft = buildBtdBtcFeeTransactionSettlement({
        ...body,
        actorId: user.userId,
        exchangeSequence:
          body.exchangeSequence === undefined ? undefined : BigInt(body.exchangeSequence),
      });
      const registry =
        body.commitToRegistry === true ? options.registry ?? getDefaultRegistry() : undefined;
      const registryWrite = registry
        ? await registry.insertBtcFeeTransaction(toBtcFeeTransactionRegistryRow(draft.receipt))
        : undefined;

      settlement = {
        ...draft,
        registryWrite,
        committed: Boolean(registryWrite),
      };
    } catch (error) {
      return createJsonResponse({ error: toBadRequestMessage(error) }, 400);
    }

    return createJsonResponse(toJsonSafe(settlement));
  });
}

export function buildPostBtdAssetPackLedgerAnchorRoute(options: BtdRouteOptions = {}) {
  return traceRoute('/btd/asset-pack-ledger-anchor', async (request: Request) => {
    const user = await (options.resolveAuthenticatedUser ?? defaultResolveAuthenticatedUser)(
      request,
    );
    if (!user) {
      return createJsonResponse({ error: 'Unauthorized' }, 401);
    }

    let body: BtdAssetPackLedgerAnchorInput;
    try {
      body = await request.json();
    } catch {
      return createJsonResponse({ error: 'Invalid JSON body' }, 400);
    }

    let settlement: BtdAssetPackLedgerAnchorSettlement;
    try {
      const draft = buildBtdAssetPackLedgerAnchorSettlement({
        ...body,
        actorId: user.userId,
        exchangeSequence: BigInt(body.exchangeSequence),
      });
      const registry =
        body.commitToRegistry === true ? options.registry ?? getDefaultRegistry() : undefined;
      const registryWrite = registry
        ? await registry.insertLedgerAnchor(toAssetPackLedgerAnchorRegistryRow(draft.anchor))
        : undefined;

      settlement = {
        ...draft,
        registryWrite,
        committed: Boolean(registryWrite),
      };
    } catch (error) {
      return createJsonResponse({ error: toBadRequestMessage(error) }, 400);
    }

    return createJsonResponse(toJsonSafe(settlement));
  });
}

export function buildPostBtdAssetPackExchangeRoute(options: BtdRouteOptions = {}) {
  return traceRoute('/btd/asset-pack-exchange', async (request: Request) => {
    const user = await (options.resolveAuthenticatedUser ?? defaultResolveAuthenticatedUser)(
      request,
    );
    if (!user) {
      return createJsonResponse({ error: 'Unauthorized' }, 401);
    }

    let body: BtdAssetPackExchangeInput;
    try {
      body = await request.json();
    } catch {
      return createJsonResponse({ error: 'Invalid JSON body' }, 400);
    }

    let settlement: BtdAssetPackExchangeSettlement;
    try {
      const draft = buildBtdAssetPackExchangeSettlement({
        ...body,
        actorId: user.userId,
        createdAtExchangeSequence:
          body.createdAtExchangeSequence === undefined
            ? undefined
            : BigInt(body.createdAtExchangeSequence),
        settledAtExchangeSequence:
          body.settledAtExchangeSequence === undefined
            ? undefined
            : BigInt(body.settledAtExchangeSequence),
      });
      const registry =
        body.commitToRegistry === true ? options.registry ?? getDefaultRegistry() : undefined;
      const registryWrite = registry
        ? await commitAssetPackExchangeSettlement(registry, draft)
        : undefined;

      settlement = {
        ...draft,
        registryWrite,
        committed: Boolean(registryWrite),
      };
    } catch (error) {
      return createJsonResponse({ error: toBadRequestMessage(error) }, 400);
    }

    return createJsonResponse(toJsonSafe(settlement));
  });
}

export function buildPostBtdTerminalJournalRoute(options: BtdRouteOptions = {}) {
  return traceRoute('/btd/terminal-journal', async (request: Request) => {
    const user = await (options.resolveAuthenticatedUser ?? defaultResolveAuthenticatedUser)(
      request,
    );
    if (!user) {
      return createJsonResponse({ error: 'Unauthorized' }, 401);
    }

    let body: BtdTerminalJournalInput;
    try {
      body = await request.json();
    } catch {
      return createJsonResponse({ error: 'Invalid JSON body' }, 400);
    }

    let settlement: BtdTerminalJournalSettlement;
    try {
      const draft = buildBtdTerminalJournalSettlement({
        ...body,
        actorId: user.userId,
        exchangeSequence:
          body.exchangeSequence === undefined ? undefined : BigInt(body.exchangeSequence),
      });
      const registry =
        body.commitToRegistry === true && draft.entry
          ? options.registry ?? getDefaultRegistry()
          : undefined;
      const registryWrite = registry
        ? await registry.insertTerminalJournalEntry(toTerminalJournalRegistryRow(draft.entry!))
        : undefined;

      settlement = {
        ...draft,
        registryWrite,
        committed: Boolean(registryWrite),
      };
    } catch (error) {
      return createJsonResponse({ error: toBadRequestMessage(error) }, 400);
    }

    return createJsonResponse(toJsonSafe(settlement));
  });
}

export function buildPostBtdLedgerDatabaseReconciliationRoute(options: BtdRouteOptions = {}) {
  return traceRoute('/btd/ledger-database-reconciliation', async (request: Request) => {
    const user = await (options.resolveAuthenticatedUser ?? defaultResolveAuthenticatedUser)(
      request,
    );
    if (!user) {
      return createJsonResponse({ error: 'Unauthorized' }, 401);
    }

    let body: BtdLedgerDatabaseReconciliationInput;
    try {
      body = await request.json();
    } catch {
      return createJsonResponse({ error: 'Invalid JSON body' }, 400);
    }

    let settlement: BtdLedgerDatabaseReconciliationSettlement;
    try {
      const draft = buildBtdLedgerDatabaseReconciliationSettlement({
        ...body,
        actorId: user.userId,
      });
      const registry =
        body.commitToRegistry === true ? options.registry ?? getDefaultRegistry() : undefined;
      const registryWrites = registry
        ? await Promise.all(
            draft.report.repairs.map((repair) =>
              registry.insertReconciliationRepair(
                toLedgerDatabaseReconciliationRepairRegistryRow(
                  draft.report.reconciliationId,
                  repair,
                ),
              ),
            ),
          )
        : undefined;

      settlement = {
        ...draft,
        registryWrites,
        committed: Boolean(registryWrites),
      };
    } catch (error) {
      return createJsonResponse({ error: toBadRequestMessage(error) }, 400);
    }

    return createJsonResponse(toJsonSafe(settlement));
  });
}

export function buildPostBtdDeploymentReadinessRoute(options: BtdRouteOptions = {}) {
  return traceRoute('/btd/deployment-readiness', async (request: Request) => {
    const user = await (options.resolveAuthenticatedUser ?? defaultResolveAuthenticatedUser)(
      request,
    );
    if (!user) {
      return createJsonResponse({ error: 'Unauthorized' }, 401);
    }

    let body: BtdDeploymentReadinessInput;
    try {
      body = await request.json();
    } catch {
      return createJsonResponse({ error: 'Invalid JSON body' }, 400);
    }

    let settlement: BtdDeploymentReadinessSettlement;
    try {
      const draft = buildBtdDeploymentReadinessSettlement({
        ...body,
        actorId: user.userId,
      });
      const registry =
        body.commitToRegistry === true ? options.registry ?? getDefaultRegistry() : undefined;
      const registryWrite =
        registry && draft.telemetry
          ? await registry.insertCryptoTelemetryEvent(toCryptoTelemetryRegistryRow(draft.telemetry))
          : registry && draft.upgradeReceipt
            ? await registry.insertProtocolUpgradeReceipt(
                toProtocolUpgradeRegistryRow(draft.upgradeReceipt),
              )
            : undefined;

      settlement = {
        ...draft,
        registryWrite,
        committed: Boolean(registryWrite),
      };
    } catch (error) {
      return createJsonResponse({ error: toBadRequestMessage(error) }, 400);
    }

    return createJsonResponse(toJsonSafe(settlement));
  });
}

export const getBtdRegistrySnapshot = buildGetBtdRegistrySnapshotRoute();
export const postBtdMintDraft = buildPostBtdMintDraftRoute();
export const postBtdReadAccess = buildPostBtdReadAccessRoute();
export const postBtdLicensedReadRevenue = buildPostBtdLicensedReadRevenueRoute();
export const postBtdAncestryReview = buildPostBtdAncestryReviewRoute();
export const postBtdBtcFeeTransaction = buildPostBtdBtcFeeTransactionRoute();
export const postBtdAssetPackLedgerAnchor = buildPostBtdAssetPackLedgerAnchorRoute();
export const postBtdAssetPackExchange = buildPostBtdAssetPackExchangeRoute();
export const postBtdTerminalJournal = buildPostBtdTerminalJournalRoute();
export const postBtdLedgerDatabaseReconciliation =
  buildPostBtdLedgerDatabaseReconciliationRoute();
export const postBtdDeploymentReadiness = buildPostBtdDeploymentReadinessRoute();

function assertMintDraftAdmission(input: BtdMintDraftInput): void {
  if (input.acceptedNeed !== true) {
    throw new Error('V27 BTD mint draft requires accepted Read.');
  }

  if (input.acceptedFit !== true) {
    throw new Error('V27 BTD mint draft requires accepted Fit.');
  }

  if (!input.semanticUnits.length) {
    throw new Error('V27 BTD mint draft requires at least one semantic unit.');
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
    throw new Error('V27 BTD mint draft requires a positive Exchange sequence.');
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

function stableId(prefix: string, parts: string[]): string {
  const hash = createHash('sha256').update(parts.join('\u001f')).digest('hex').slice(0, 16);
  return `${prefix}_${hash}`;
}

function toBadRequestMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Invalid V27 BTD mint draft input';
}

function toRevenueRegistryRow(
  receipt: ReturnType<typeof buildLicensedReadRevenueRoute>,
): Record<string, unknown> {
  return {
    payment_id: receipt.paymentId,
    asset_pack_id: receipt.assetPackId,
    price_asset: receipt.priceAsset,
    gross_sats: receipt.grossSats.toString(),
    direct_sats: receipt.directSats.toString(),
    ancestor_sats: receipt.ancestorSats.toString(),
    treasury_sats: receipt.treasurySats.toString(),
    dispute_holdback_sats: receipt.disputeHoldbackSats.toString(),
    direct_routes: toJsonSafe(receipt.directRoutes),
    ancestor_routes: toJsonSafe(receipt.ancestorRoutes),
    treasury_routes: toJsonSafe(receipt.treasuryRoutes),
    treasury_wallet_id: receipt.treasuryWalletId,
    dispute_holdback_wallet_id: receipt.disputeHoldbackWalletId ?? null,
    pending_routes: toJsonSafe(receipt.pendingRoutes),
    failed_routes: toJsonSafe(receipt.failedRoutes),
    route_state: receipt.routeState,
    exchange_sequence: receipt.exchangeSequence.toString(),
    receipt: toJsonSafe(receipt),
    issued_at: receipt.issuedAt,
  };
}

function toAncestorEdgeRegistryRow(
  receipt: ReturnType<typeof reviewBtdAncestorEdges>,
  edge: ReturnType<typeof reviewBtdAncestorEdges>['edges'][number],
  index: number,
): Record<string, unknown> {
  return {
    edge_id: stableId('btd-ancestor-edge', [
      receipt.reviewId,
      String(index),
      edge.parentAssetPackId,
      edge.childAssetPackId,
      edge.edgeKind,
    ]),
    review_id: receipt.reviewId,
    parent_asset_pack_id: edge.parentAssetPackId,
    child_asset_pack_id: edge.childAssetPackId,
    edge_kind: edge.edgeKind,
    evidence_root: edge.evidenceRoot,
    source_fingerprint_root: edge.sourceFingerprintRoot ?? null,
    reviewer_receipt_root: edge.reviewerReceiptRoot ?? null,
    claimant_id: edge.claimantId ?? null,
    reviewer_id: edge.reviewerId ?? null,
    confidence_bps: edge.confidenceBps,
    timelessness_bps: edge.timelessnessBps,
    depth: edge.depth,
    status: edge.status,
    rejection_reason: edge.rejectionReason ?? null,
    risk_flags: toJsonSafe(edge.riskFlags),
    route_weight: edge.routeWeight,
    created_after_child_fit: edge.createdAfterChildFit,
    conflict_disclosure: toJsonSafe(edge.conflictDisclosure),
    supply_effect: edge.supplyEffect,
    mint_count_delta: edge.mintCountDelta,
    receipt: toJsonSafe(receipt),
    issued_at: receipt.issuedAt,
  };
}

function toBtcFeeTransactionRegistryRow(
  receipt: BtcFeeTransactionReceipt,
): Record<string, unknown> {
  return {
    receipt_id: receipt.receiptId,
    fee_purpose: receipt.feePurpose,
    payer_wallet_id: receipt.payerWalletId,
    wallet_session_id: receipt.walletSessionId,
    network: receipt.network,
    wallet_authorization_proof: toJsonSafe(receipt.walletAuthorizationProof),
    txid: receipt.txid,
    vout: receipt.vout ?? null,
    psbt: receipt.psbt,
    sats_paid: receipt.satsPaid.toString(),
    sats_per_vbyte: receipt.satsPerVbyte ?? null,
    exchange_sequence: receipt.exchangeSequence.toString(),
    terminal_journal_root: receipt.terminalJournalRoot,
    related_asset_pack_id: receipt.relatedAssetPackId ?? null,
    related_order_id: receipt.relatedOrderId ?? null,
    finality_state: receipt.finalityState,
    confirmations: receipt.confirmations,
    fee_asset: receipt.feeAsset,
    server_custody: receipt.serverCustody,
    receipt: toJsonSafe(receipt),
    issued_at: receipt.issuedAt,
  };
}

function toAssetPackLedgerAnchorRegistryRow(
  anchor: AssetPackLedgerAnchor,
): Record<string, unknown> {
  return {
    anchor_id: anchor.anchorId,
    asset_pack_id: anchor.assetPackId,
    chain: anchor.chain,
    network: anchor.network,
    txid_or_hash: anchor.txidOrHash,
    output_index: anchor.outputIndex ?? null,
    contract_address: anchor.contractAddress ?? null,
    token_id: anchor.tokenId ?? null,
    commitment_method: anchor.commitmentMethod ?? null,
    commitment_root: anchor.commitmentRoot,
    source_manifest_root: anchor.sourceManifestRoot,
    proof_root: anchor.proofRoot,
    access_policy_hash: anchor.accessPolicyHash,
    btd_range_start: anchor.btdRangeStart,
    btd_range_end_exclusive: anchor.btdRangeEndExclusive,
    finality_state: anchor.finalityState,
    confirmations: anchor.confirmations,
    receipt: toJsonSafe(anchor),
    issued_at: anchor.anchoredAt ?? new Date().toISOString(),
  };
}

async function commitAssetPackExchangeSettlement(
  registry: BtdRegistryModel,
  settlement: Omit<BtdAssetPackExchangeSettlement, 'registryWrite' | 'committed'>,
) {
  if (settlement.rightsTransfer) {
    return registry.insertRightsTransferReceipt(
      toAssetPackRightsTransferRegistryRow(settlement.rightsTransfer),
    );
  }

  if (!settlement.order) {
    throw new Error('AssetPack Exchange commit requires order or rightsTransfer.');
  }

  const row = toAssetPackExchangeOrderRegistryRow(settlement.order);
  if (settlement.action === 'create_order') {
    return registry.insertExchangeOrder(row);
  }

  return registry.updateExchangeOrder(settlement.order.orderId, row);
}

function toAssetPackExchangeOrderRegistryRow(
  order: AssetPackExchangeOrder,
): Record<string, unknown> {
  return {
    order_id: order.orderId,
    order_kind: order.orderKind,
    asset_pack_id: order.assetPackId,
    range_start: order.rangeStart,
    range_end_exclusive: order.rangeEndExclusive,
    maker_wallet_id: order.makerWalletId,
    taker_wallet_id: order.takerWalletId ?? null,
    price_asset: order.priceAsset,
    price_sats: order.priceSats.toString(),
    access_policy_hash: order.accessPolicyHash,
    order_state: order.orderState,
    created_at_exchange_sequence: order.createdAtExchangeSequence.toString(),
    settled_at_exchange_sequence: order.settledAtExchangeSequence?.toString() ?? null,
    ledger_anchor_id: order.ledgerAnchorId ?? null,
    receipt: toJsonSafe(order),
  };
}

function toAssetPackRightsTransferRegistryRow(
  receipt: AssetPackRightsTransferReceipt,
): Record<string, unknown> {
  return {
    receipt_id: receipt.receiptId,
    order_id: receipt.orderId,
    asset_pack_id: receipt.assetPackId,
    range_start: receipt.rangeStart,
    range_end_exclusive: receipt.rangeEndExclusive,
    from_wallet_id: receipt.fromWalletId,
    to_wallet_id: receipt.toWalletId,
    price_asset: receipt.priceAsset,
    price_sats: receipt.priceSats.toString(),
    access_policy_hash: receipt.accessPolicyHash,
    btc_fee_receipt_id: receipt.btcFeeReceiptId,
    ledger_anchor_id: receipt.ledgerAnchorId ?? null,
    exchange_sequence: receipt.exchangeSequence.toString(),
    receipt: toJsonSafe(receipt),
    issued_at: receipt.issuedAt,
  };
}

function toTerminalJournalRegistryRow(entry: TerminalJournalEntry): Record<string, unknown> {
  return {
    journal_entry_id: entry.journalEntryId,
    transaction_kind: entry.transactionKind,
    actor_id: entry.actorId,
    pre_state_root: entry.preStateRoot,
    post_state_root: entry.postStateRoot,
    receipt_roots: toJsonSafe(entry.receiptRoots),
    ledger_anchor_ids: toJsonSafe(entry.ledgerAnchorIds),
    exchange_sequence: entry.exchangeSequence.toString(),
    issued_at: entry.issuedAt,
  };
}

function toLedgerDatabaseReconciliationRepairRegistryRow(
  reconciliationId: string,
  repair: ProjectionRepairReceipt,
): Record<string, unknown> {
  return {
    repair_id: repair.repairId,
    reconciliation_id: reconciliationId,
    fact_id: repair.factId,
    repair_kind: repair.repairKind,
    before_value: repair.before,
    after_value: repair.after,
    blocking: repair.blocking,
    issued_at: repair.issuedAt,
  };
}

function toCryptoTelemetryRegistryRow(record: V27CryptoTelemetryRecord): Record<string, unknown> {
  return {
    event: record.event,
    severity: record.severity,
    subject_id: record.subjectId,
    receipt_root: record.receiptRoot ?? null,
    ledger_anchor_id: record.ledgerAnchorId ?? null,
    issued_at: record.issuedAt,
  };
}

function toProtocolUpgradeRegistryRow(receipt: BtdProtocolUpgradeReceipt): Record<string, unknown> {
  return {
    upgrade_id: receipt.upgradeId,
    from_version: receipt.fromVersion,
    to_version: receipt.toVersion,
    network: receipt.network,
    migration_root: receipt.migrationRoot,
    pre_state_root: receipt.preStateRoot,
    post_state_root: receipt.postStateRoot,
    approval_receipt_root: receipt.approvalReceiptRoot,
    rollback_plan_root: receipt.rollbackPlanRoot,
    ledger_anchor_id: receipt.ledgerAnchorId ?? null,
    upgrade_state: receipt.upgradeState,
    receipt: toJsonSafe(receipt),
    issued_at: receipt.issuedAt,
  };
}

async function resolveRegistryAccessPolicy(
  registry: BtdRegistryModel | undefined,
  assetPackId: string,
): Promise<BtdAccessPolicy> {
  if (!registry) {
    throw new Error('accessPolicy is required when no registry projection is supplied.');
  }

  const [range] = await registry.listAssetPackRanges(assetPackId);
  if (!range) {
    throw new Error('No registry range found for AssetPack access policy.');
  }

  return {
    accessPolicyId: readStringField(range, 'access_policy_id', 'accessPolicyId'),
    accessPolicyHash: readStringField(range, 'access_policy_hash', 'accessPolicyHash'),
    ownerRead: readBooleanField(range, true, 'owner_read', 'ownerRead'),
    licensedRead: readBooleanField(range, true, 'licensed_read', 'licensedRead'),
    derivativeUse: readBooleanField(range, false, 'derivative_use', 'derivativeUse'),
    redistributionAllowed: readBooleanField(
      range,
      false,
      'redistribution_allowed',
      'redistributionAllowed',
    ),
    confidentiality: readConfidentiality(range),
  };
}

function mapRegistryOwnershipClaims(rows: Record<string, unknown>[]): BtdOwnershipClaim[] {
  return rows.map((row) => ({
    walletId: readStringField(row, 'to_wallet_id', 'walletId'),
    assetPackId: readStringField(row, 'asset_pack_id', 'assetPackId'),
    rangeStart: readNumberField(row, 'range_start', 'rangeStart'),
    rangeEndExclusive: readNumberField(row, 'range_end_exclusive', 'rangeEndExclusive'),
    accessPolicyHash: readStringField(row, 'access_policy_hash', 'accessPolicyHash'),
  }));
}

function mapRegistryReadLicenses(rows: Record<string, unknown>[]): BtdReadLicense[] {
  return rows.map((row) => ({
    licenseId: readStringField(row, 'license_id', 'licenseId'),
    walletId: readStringField(row, 'wallet_id', 'walletId'),
    assetPackId: readStringField(row, 'asset_pack_id', 'assetPackId'),
    accessPolicyHash: readStringField(row, 'access_policy_hash', 'accessPolicyHash'),
    validFrom: readStringField(row, 'valid_from', 'validFrom'),
    expiresAt: readOptionalStringField(row, 'expires_at', 'expiresAt'),
    revokedAt: readOptionalStringField(row, 'revoked_at', 'revokedAt'),
  }));
}

function readStringField(row: Record<string, unknown>, ...keys: string[]): string {
  for (const key of keys) {
    const value = row[key];
    if (typeof value === 'string' && value.trim()) {
      return value;
    }
  }

  throw new Error(`${keys[0]} must be a non-empty string.`);
}

function readOptionalStringField(
  row: Record<string, unknown>,
  ...keys: string[]
): string | undefined {
  for (const key of keys) {
    const value = row[key];
    if (typeof value === 'string' && value.trim()) {
      return value;
    }
  }

  return undefined;
}

function readNumberField(row: Record<string, unknown>, ...keys: string[]): number {
  for (const key of keys) {
    const value = row[key];
    if (typeof value === 'number' && Number.isSafeInteger(value)) {
      return value;
    }
    if (typeof value === 'string' && /^-?\d+$/.test(value)) {
      return Number(value);
    }
  }

  throw new Error(`${keys[0]} must be a safe integer.`);
}

function readBooleanField(
  row: Record<string, unknown>,
  fallback: boolean,
  ...keys: string[]
): boolean {
  for (const key of keys) {
    const value = row[key];
    if (typeof value === 'boolean') {
      return value;
    }
  }

  return fallback;
}

function readConfidentiality(row: Record<string, unknown>): BtdAccessPolicy['confidentiality'] {
  const value = readOptionalStringField(row, 'confidentiality');
  if (value === 'public' || value === 'private' || value === 'public_proof_private_source') {
    return value;
  }

  return 'public_proof_private_source';
}

function toJsonSafe(value: unknown): unknown {
  if (typeof value === 'bigint') {
    return value.toString();
  }

  if (Array.isArray(value)) {
    return value.map((entry) => toJsonSafe(entry));
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, entry]) => [
        key,
        toJsonSafe(entry),
      ]),
    );
  }

  return value;
}
