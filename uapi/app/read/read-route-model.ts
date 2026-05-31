import {
  TERMINAL_ENTERPRISE_READING_FORBIDDEN_FIELDS,
  TERMINAL_ENTERPRISE_READING_STEPS,
  assertTerminalEnterpriseReadingUxStateSourceSafe,
  buildTerminalEnterpriseReadingUxState,
  type TerminalEnterpriseReadingStepId,
  type TerminalEnterpriseReadingUxStateInput,
} from '@/app/terminal/terminal-enterprise-reading-ux-state';
import {
  assertOrganizationPolicyWalletAuthoritySourceSafe,
  buildOrganizationPolicyWalletAuthority,
  type OrganizationPolicyWalletAuthority,
  type OrganizationPolicyWalletAuthorityInput,
} from '@bitcode/pipeline-asset-pack/organization-policy-wallet-authority';

export type ReadRouteStepId = TerminalEnterpriseReadingStepId;

export type ReadRouteSessionInput = TerminalEnterpriseReadingUxStateInput & {
  repositoryFullName?: string | null;
  sourceBranch?: string | null;
  sourceCommit?: string | null;
  readNeedId?: string | null;
  assetPackPreviewId?: string | null;
  settlementQuoteId?: string | null;
  budgetEnvelopeSats?: number | null;
  approvalThresholdSats?: number | null;
  quoteSats?: number | null;
  quoteIssuedAt?: string | null;
  quoteExpiresAt?: string | null;
  quoteObservedAt?: string | null;
  procurementApproved?: boolean;
  buyerAuthorized?: boolean;
  walletAuthorityPresent?: boolean;
  walletId?: string | null;
  actorId?: string | null;
  organizationId?: string | null;
  teamId?: string | null;
  memberId?: string | null;
  organizationRole?: OrganizationPolicyWalletAuthorityInput['organizationRole'];
  organizationPermissionGrants?: string[] | null;
  organizationPolicyId?: string | null;
  organizationPolicyHash?: string | null;
  spendLimitSats?: number | null;
  measuredBtd?: number | null;
};

export type ReadProcurementBudgetState =
  | 'awaiting-quote'
  | 'within-budget'
  | 'approval-required'
  | 'exceeded';

export type ReadProcurementQuoteState =
  | 'awaiting-preview'
  | 'quoted'
  | 'expired'
  | 'approved'
  | 'blocked';

export type ReadProcurementSettlementReadiness =
  | 'awaiting-preview'
  | 'awaiting-approval'
  | 'awaiting-buyer-authority'
  | 'awaiting-wallet-authority'
  | 'ready-for-testnet-settlement'
  | 'blocked-budget'
  | 'blocked-expired-quote';

export type ReadProcurementGovernance = {
  schema: 'bitcode.read.procurement-governance';
  budgetPolicy: {
    policyId: string;
    budgetEnvelopeSats: number;
    approvalThresholdSats: number;
    quoteSats: number;
    state: ReadProcurementBudgetState;
    approvalRequired: boolean;
    policyRoot: string;
  };
  quotePolicy: {
    quoteId: string | null;
    state: ReadProcurementQuoteState;
    feeAsset: 'BTC';
    pricingVersion: 'measurement-weight-volume';
    issuedAt: string | null;
    expiresAt: string | null;
    quoteRoot: string;
    shareToFee: {
      measurementWeight: number;
      measurementVolume: number;
      pricePerWeightedUnitSats: number;
      grossSats: number;
      deterministic: true;
      calculationRoot: string;
    };
  };
  approval: {
    buyerAuthorized: boolean;
    walletAuthorityPresent: boolean;
    procurementApproved: boolean;
    approvalRoot: string;
  };
  settlement: {
    readiness: ReadProcurementSettlementReadiness;
    btcBtdSettlementReady: boolean;
    blockers: string[];
    readinessRoot: string;
  };
  prePurchaseReview: {
    sourceSafePreviewVisible: boolean;
    protectedSourceVisible: false;
    unpaidAssetPackSourceVisible: false;
    walletPrivateMaterialVisible: false;
    settlementPrivatePayloadVisible: false;
    reviewRoot: string;
  };
};

export type ReadRouteSession = {
  schema: 'bitcode.read.route-session';
  route: '/read';
  stageCount: 5;
  activeStepId: ReadRouteStepId;
  steps: ReturnType<typeof buildTerminalEnterpriseReadingUxState>['steps'];
  readObjects: {
    readRequestRecorded: boolean;
    synthesizedNeedReviewed: boolean;
    acceptedNeedPresent: boolean;
    findingFitsRequested: boolean;
    sourceSafeAssetPackPreviewPresent: boolean;
    settlementQuotePresent: boolean;
    deliveryUnlocked: boolean;
  };
  routeState: {
    transactionId: string | null;
    readingStage: ReadRouteStepId | null;
    repositoryFullName: string | null;
    sourceBranch: string | null;
    sourceCommit: string | null;
    readNeedId: string | null;
    assetPackPreviewId: string | null;
    settlementQuoteId: string | null;
  };
  pipelineOwnership: {
    readNeedPipeline: 'ReadNeedComprehensionSynthesis';
    findingFitsPipeline: 'ReadFitsFindingSynthesis';
    acceptedNeedRequiredBeforeFindingFits: true;
    previewSourceSafeBeforeSettlement: true;
    deliveryRequiresPaidReadRights: true;
    retainedTerminalDebugCompatible: true;
  };
  procurementGovernance: ReadProcurementGovernance;
  organizationPolicyWalletAuthority: OrganizationPolicyWalletAuthority;
  disclosure: {
    sourceSafetyClass: 'source_safe_read_route_metadata';
    lowDetailDefault: true;
    expandableSourceSafeDetail: true;
    protectedSourceVisible: false;
    unpaidAssetPackSourceVisible: false;
    rawPromptVisible: false;
    interpolatedPromptVisible: false;
    rawProviderResponseVisible: false;
    walletPrivateMaterialVisible: false;
    settlementPrivatePayloadVisible: false;
    hiddenBeforeSettlement: typeof TERMINAL_ENTERPRISE_READING_FORBIDDEN_FIELDS;
  };
  proofRoot: string;
};

const READ_ROUTE_STAGE_IDS = TERMINAL_ENTERPRISE_READING_STEPS.map((step) => step.id);

function stableHash(value: string) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16).padStart(8, '0');
}

function normalizedText(value: string | null | undefined) {
  const normalized = value?.trim();
  return normalized ? normalized : null;
}

function normalizeSafeNumber(value: number | null | undefined, fallback: number) {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0
    ? Math.round(value)
    : fallback;
}

function isExpired(now: string | null | undefined, expiresAt: string | null | undefined) {
  if (!now || !expiresAt) return false;
  const nowMs = new Date(now).getTime();
  const expiresMs = new Date(expiresAt).getTime();
  return Number.isFinite(nowMs) && Number.isFinite(expiresMs) && nowMs > expiresMs;
}

export function buildReadProcurementGovernance(
  input: ReadRouteSessionInput = {},
): ReadProcurementGovernance {
  const sourceSafePreviewVisible = Boolean(input.hasSourceSafePreview);
  const budgetEnvelopeSats = normalizeSafeNumber(input.budgetEnvelopeSats, 250_000);
  const approvalThresholdSats = normalizeSafeNumber(input.approvalThresholdSats, 100_000);
  const measurementWeight = sourceSafePreviewVisible ? 1_000 : 0;
  const measurementVolume = sourceSafePreviewVisible
    ? Math.max(1, normalizeSafeNumber(input.measuredBtd, 0))
    : 0;
  const pricePerWeightedUnitSats = 25;
  const grossSats =
    input.quoteSats !== null && input.quoteSats !== undefined
      ? normalizeSafeNumber(input.quoteSats, 0)
      : Math.round((measurementWeight * measurementVolume * pricePerWeightedUnitSats) / 1_000);
  const approvalRequired = grossSats >= approvalThresholdSats;
  const quoteExpired = isExpired(input.quoteObservedAt || input.quoteIssuedAt, input.quoteExpiresAt);
  const budgetState: ReadProcurementBudgetState =
    grossSats <= 0
      ? 'awaiting-quote'
      : grossSats > budgetEnvelopeSats
        ? 'exceeded'
        : approvalRequired && !input.procurementApproved
          ? 'approval-required'
          : 'within-budget';
  const quoteState: ReadProcurementQuoteState = !sourceSafePreviewVisible
    ? 'awaiting-preview'
    : budgetState === 'exceeded'
      ? 'blocked'
      : quoteExpired
        ? 'expired'
        : input.procurementApproved
          ? 'approved'
          : 'quoted';
  const buyerAuthorized = input.buyerAuthorized !== false;
  const walletAuthorityPresent = Boolean(input.walletAuthorityPresent);
  const procurementApproved = Boolean(input.procurementApproved) || !approvalRequired;
  const blockers = [
    !sourceSafePreviewVisible ? 'source-safe AssetPack preview required' : '',
    budgetState === 'exceeded' ? 'quote exceeds Reading budget envelope' : '',
    quoteState === 'expired' ? 'quote expired' : '',
    approvalRequired && !procurementApproved ? 'procurement approval required' : '',
    !buyerAuthorized ? 'buyer authorization required' : '',
    !walletAuthorityPresent ? 'wallet authority required' : '',
  ].filter(Boolean);
  const readiness: ReadProcurementSettlementReadiness = !sourceSafePreviewVisible
    ? 'awaiting-preview'
    : budgetState === 'exceeded'
      ? 'blocked-budget'
      : quoteState === 'expired'
        ? 'blocked-expired-quote'
        : approvalRequired && !procurementApproved
          ? 'awaiting-approval'
          : !buyerAuthorized
            ? 'awaiting-buyer-authority'
            : !walletAuthorityPresent
              ? 'awaiting-wallet-authority'
              : 'ready-for-testnet-settlement';
  const calculationSeed = JSON.stringify({
    measurementWeight,
    measurementVolume,
    pricePerWeightedUnitSats,
    grossSats,
  });
  const policySeed = JSON.stringify({
    budgetEnvelopeSats,
    approvalThresholdSats,
    grossSats,
    budgetState,
  });
  const approvalSeed = JSON.stringify({
    buyerAuthorized,
    walletAuthorityPresent,
    procurementApproved,
    approvalRequired,
  });
  const readinessSeed = JSON.stringify({ readiness, blockers, quoteState });
  const reviewSeed = JSON.stringify({
    sourceSafePreviewVisible,
    protectedSourceVisible: false,
    unpaidAssetPackSourceVisible: false,
  });

  return {
    schema: 'bitcode.read.procurement-governance',
    budgetPolicy: {
      policyId: 'reading-budget-policy:default-source-safe',
      budgetEnvelopeSats,
      approvalThresholdSats,
      quoteSats: grossSats,
      state: budgetState,
      approvalRequired,
      policyRoot: `reading-budget-policy:${stableHash(policySeed)}`,
    },
    quotePolicy: {
      quoteId: normalizedText(input.settlementQuoteId),
      state: quoteState,
      feeAsset: 'BTC',
      pricingVersion: 'measurement-weight-volume',
      issuedAt: normalizedText(input.quoteIssuedAt),
      expiresAt: normalizedText(input.quoteExpiresAt),
      quoteRoot: `reading-quote-policy:${stableHash(`${calculationSeed}:${quoteState}`)}`,
      shareToFee: {
        measurementWeight,
        measurementVolume,
        pricePerWeightedUnitSats,
        grossSats,
        deterministic: true,
        calculationRoot: `reading-share-to-fee:${stableHash(calculationSeed)}`,
      },
    },
    approval: {
      buyerAuthorized,
      walletAuthorityPresent,
      procurementApproved,
      approvalRoot: `reading-procurement-approval:${stableHash(approvalSeed)}`,
    },
    settlement: {
      readiness,
      btcBtdSettlementReady: readiness === 'ready-for-testnet-settlement',
      blockers,
      readinessRoot: `reading-settlement-readiness:${stableHash(readinessSeed)}`,
    },
    prePurchaseReview: {
      sourceSafePreviewVisible,
      protectedSourceVisible: false,
      unpaidAssetPackSourceVisible: false,
      walletPrivateMaterialVisible: false,
      settlementPrivatePayloadVisible: false,
      reviewRoot: `reading-pre-purchase-review:${stableHash(reviewSeed)}`,
    },
  };
}

export function readReadRouteStage(params: URLSearchParams): ReadRouteStepId | null {
  const stage = params.get('readingStage')?.trim();
  return READ_ROUTE_STAGE_IDS.includes(stage as ReadRouteStepId) ? (stage as ReadRouteStepId) : null;
}

export function writeReadRouteStage(params: URLSearchParams, stage: ReadRouteStepId | null) {
  const next = new URLSearchParams(params.toString());
  if (stage) next.set('readingStage', stage);
  else next.delete('readingStage');
  return next;
}

export function buildReadRouteSession(input: ReadRouteSessionInput = {}): ReadRouteSession {
  const enterpriseState = buildTerminalEnterpriseReadingUxState(input);
  const procurementGovernance = buildReadProcurementGovernance(input);
  const organizationPolicyWalletAuthority = buildOrganizationPolicyWalletAuthority({
    route: '/read',
    actorId: normalizedText(input.actorId),
    organizationId: normalizedText(input.organizationId),
    teamId: normalizedText(input.teamId),
    memberId: normalizedText(input.memberId),
    organizationRole: input.organizationRole || null,
    organizationPermissionGrants: input.organizationPermissionGrants || null,
    policyId: normalizedText(input.organizationPolicyId),
    policyHash: normalizedText(input.organizationPolicyHash),
    walletId: normalizedText(input.walletId) || (input.walletAuthorityPresent ? 'connected-reader-wallet' : null),
    walletAuthorityPresent: input.walletAuthorityPresent,
    quoteSats: procurementGovernance.quotePolicy.shareToFee.grossSats,
    budgetEnvelopeSats: procurementGovernance.budgetPolicy.budgetEnvelopeSats,
    approvalThresholdSats: procurementGovernance.budgetPolicy.approvalThresholdSats,
    spendLimitSats: input.spendLimitSats || procurementGovernance.budgetPolicy.budgetEnvelopeSats,
    procurementApproved: procurementGovernance.approval.procurementApproved,
    buyerAuthorized: procurementGovernance.approval.buyerAuthorized,
    settlementState: input.hasDeliveryReadback ? 'settled' : 'pending',
    accountAdmitted: Boolean(input.actorId || input.repositoryFullName),
    interfaceAdmitted: true,
    targetAnchor: normalizedText(input.settlementQuoteId) || normalizedText(input.transactionId) || '/read',
  });
  const seed = JSON.stringify({
    activeStepId: enterpriseState.activeStepId,
    transactionId: enterpriseState.routeState.transactionId,
    repositoryFullName: normalizedText(input.repositoryFullName),
    sourceBranch: normalizedText(input.sourceBranch),
    sourceCommit: normalizedText(input.sourceCommit),
    readNeedId: normalizedText(input.readNeedId),
    assetPackPreviewId: normalizedText(input.assetPackPreviewId),
    settlementQuoteId: normalizedText(input.settlementQuoteId),
    steps: enterpriseState.steps.map((step) => ({ id: step.id, state: step.state, blockers: step.blockers })),
    procurementGovernance,
    organizationPolicyWalletAuthorityRoot: organizationPolicyWalletAuthority.roots.authorityRoot,
  });

  return {
    schema: 'bitcode.read.route-session',
    route: '/read',
    stageCount: 5,
    activeStepId: enterpriseState.activeStepId,
    steps: enterpriseState.steps,
    readObjects: {
      readRequestRecorded: Boolean(input.hasReadMeasurement),
      synthesizedNeedReviewed: Boolean(input.hasSynthesizedNeed),
      acceptedNeedPresent: Boolean(input.hasAcceptedNeed),
      findingFitsRequested: Boolean(input.findingFitsRunning || input.hasSourceSafePreview),
      sourceSafeAssetPackPreviewPresent: Boolean(input.hasSourceSafePreview),
      settlementQuotePresent: Boolean(input.hasSourceSafePreview || input.hasSettlementReadback),
      deliveryUnlocked: Boolean(input.hasDeliveryReadback),
    },
    routeState: {
      transactionId: enterpriseState.routeState.transactionId,
      readingStage: enterpriseState.routeState.routeReadingStage,
      repositoryFullName: normalizedText(input.repositoryFullName),
      sourceBranch: normalizedText(input.sourceBranch),
      sourceCommit: normalizedText(input.sourceCommit),
      readNeedId: normalizedText(input.readNeedId),
      assetPackPreviewId: normalizedText(input.assetPackPreviewId),
      settlementQuoteId: normalizedText(input.settlementQuoteId),
    },
    pipelineOwnership: {
      readNeedPipeline: 'ReadNeedComprehensionSynthesis',
      findingFitsPipeline: 'ReadFitsFindingSynthesis',
      acceptedNeedRequiredBeforeFindingFits: true,
      previewSourceSafeBeforeSettlement: true,
      deliveryRequiresPaidReadRights: true,
      retainedTerminalDebugCompatible: true,
    },
    procurementGovernance,
    organizationPolicyWalletAuthority,
    disclosure: {
      sourceSafetyClass: 'source_safe_read_route_metadata',
      lowDetailDefault: true,
      expandableSourceSafeDetail: true,
      protectedSourceVisible: false,
      unpaidAssetPackSourceVisible: false,
      rawPromptVisible: false,
      interpolatedPromptVisible: false,
      rawProviderResponseVisible: false,
      walletPrivateMaterialVisible: false,
      settlementPrivatePayloadVisible: false,
      hiddenBeforeSettlement: TERMINAL_ENTERPRISE_READING_FORBIDDEN_FIELDS,
    },
    proofRoot: `read-route-session:${stableHash(seed)}`,
  };
}

export function assertReadRouteSessionSourceSafe(session: ReadRouteSession) {
  const enterpriseSafety = assertTerminalEnterpriseReadingUxStateSourceSafe(
    buildTerminalEnterpriseReadingUxState({
      transactionId: session.routeState.transactionId,
      routeReadingStage: session.routeState.readingStage,
      hasRepositorySource: Boolean(session.routeState.repositoryFullName),
      hasReadMeasurement: session.readObjects.readRequestRecorded,
      hasSynthesizedNeed: session.readObjects.synthesizedNeedReviewed,
      hasAcceptedNeed: session.readObjects.acceptedNeedPresent,
      hasSourceSafePreview: session.readObjects.sourceSafeAssetPackPreviewPresent,
      hasSettlementReadback: session.readObjects.settlementQuotePresent,
      hasDeliveryReadback: session.readObjects.deliveryUnlocked,
    }),
  );
  const organizationSafety = assertOrganizationPolicyWalletAuthoritySourceSafe(
    session.organizationPolicyWalletAuthority,
  );

  const sourceSafe =
    enterpriseSafety.admitted &&
    organizationSafety.admitted &&
    session.schema === 'bitcode.read.route-session' &&
    session.route === '/read' &&
    session.stageCount === 5 &&
    session.pipelineOwnership.acceptedNeedRequiredBeforeFindingFits === true &&
    session.pipelineOwnership.previewSourceSafeBeforeSettlement === true &&
    session.pipelineOwnership.deliveryRequiresPaidReadRights === true &&
    session.procurementGovernance.schema === 'bitcode.read.procurement-governance' &&
    session.procurementGovernance.quotePolicy.pricingVersion === 'measurement-weight-volume' &&
    session.procurementGovernance.quotePolicy.shareToFee.deterministic === true &&
    (session.procurementGovernance.budgetPolicy.budgetEnvelopeSats >=
      session.procurementGovernance.budgetPolicy.quoteSats ||
      session.procurementGovernance.settlement.readiness === 'blocked-budget') &&
    session.procurementGovernance.prePurchaseReview.protectedSourceVisible === false &&
    session.procurementGovernance.prePurchaseReview.unpaidAssetPackSourceVisible === false &&
    session.procurementGovernance.prePurchaseReview.walletPrivateMaterialVisible === false &&
    session.procurementGovernance.prePurchaseReview.settlementPrivatePayloadVisible === false &&
    session.organizationPolicyWalletAuthority.schema === 'bitcode.organization.policy-wallet-authority' &&
    session.organizationPolicyWalletAuthority.route === '/read' &&
    session.organizationPolicyWalletAuthority.disclosure.sourceSafeMetadataOnly === true &&
    session.organizationPolicyWalletAuthority.disclosure.protectedSourceVisible === false &&
    session.organizationPolicyWalletAuthority.disclosure.walletPrivateMaterialVisible === false &&
    session.disclosure.sourceSafetyClass === 'source_safe_read_route_metadata' &&
    session.disclosure.protectedSourceVisible === false &&
    session.disclosure.unpaidAssetPackSourceVisible === false &&
    session.disclosure.rawPromptVisible === false &&
    session.disclosure.interpolatedPromptVisible === false &&
    session.disclosure.rawProviderResponseVisible === false &&
    session.disclosure.walletPrivateMaterialVisible === false &&
    session.disclosure.settlementPrivatePayloadVisible === false &&
    TERMINAL_ENTERPRISE_READING_FORBIDDEN_FIELDS.every((field) =>
      session.disclosure.hiddenBeforeSettlement.includes(field),
    );

  return {
    admitted: sourceSafe,
    reason: sourceSafe ? 'source_safe_read_route_metadata' : 'read_route_source_safety_boundary_violation',
  };
}
