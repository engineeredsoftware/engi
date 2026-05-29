import {
  TERMINAL_ENTERPRISE_READING_FORBIDDEN_FIELDS,
  TERMINAL_ENTERPRISE_READING_STEPS,
  assertTerminalEnterpriseReadingUxStateSourceSafe,
  buildTerminalEnterpriseReadingUxState,
  type TerminalEnterpriseReadingStepId,
  type TerminalEnterpriseReadingUxStateInput,
} from '@/app/terminal/terminal-enterprise-reading-ux-state';

export type ReadRouteStepId = TerminalEnterpriseReadingStepId;

export type ReadRouteSessionInput = TerminalEnterpriseReadingUxStateInput & {
  repositoryFullName?: string | null;
  sourceBranch?: string | null;
  sourceCommit?: string | null;
  readNeedId?: string | null;
  assetPackPreviewId?: string | null;
  settlementQuoteId?: string | null;
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

  const sourceSafe =
    enterpriseSafety.admitted &&
    session.schema === 'bitcode.read.route-session' &&
    session.route === '/read' &&
    session.stageCount === 5 &&
    session.pipelineOwnership.acceptedNeedRequiredBeforeFindingFits === true &&
    session.pipelineOwnership.previewSourceSafeBeforeSettlement === true &&
    session.pipelineOwnership.deliveryRequiresPaidReadRights === true &&
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
