import {
  assertDepositAssetPackOptionSynthesisSourceSafe,
  buildDepositAssetPackOptionSynthesis,
  type DepositAssetPackOptionSynthesis,
  type DepositOptionSynthesisRequest,
} from '@bitcode/pipeline-asset-pack/deposit-asset-pack-options';

export type DepositRouteStepId =
  | 'connect-source'
  | 'synthesize-options'
  | 'review-options'
  | 'submit-deposit'
  | 'read-depository-state';

export type DepositRouteStepState = 'complete' | 'current' | 'blocked' | 'ready';

export interface DepositRouteSessionInput extends DepositOptionSynthesisRequest {
  depositStage?: DepositRouteStepId | null;
  transactionId?: string | null;
  hasRepositorySource?: boolean;
  optionsRequested?: boolean;
  hasReviewedOption?: boolean;
  hasSubmittedDeposit?: boolean;
  hasDepositoryReadback?: boolean;
}

export interface DepositRouteStep {
  id: DepositRouteStepId;
  label: string;
  state: DepositRouteStepState;
  lowDetailGuidance: string;
  blockers: string[];
}

export interface DepositRouteSession {
  schema: 'bitcode.deposit.route-session';
  route: '/deposit';
  stageCount: 5;
  activeStepId: DepositRouteStepId;
  steps: DepositRouteStep[];
  routeState: {
    transactionId: string | null;
    depositStage: DepositRouteStepId | null;
    repositoryFullName: string | null;
    sourceBranch: string | null;
    sourceCommit: string | null;
  };
  pipelineOwnership: {
    depositOptionPipeline: 'DepositAssetPackOptionSynthesis';
    reviewRequiredBeforeDepositAdmission: true;
    sourceCriticalityDemandRoiPolicyDeferredToGate6: true;
    admissionAndIndexingDeferredToGate7: true;
    retainedTerminalDebugCompatible: true;
  };
  synthesis: DepositAssetPackOptionSynthesis;
  disclosure: {
    sourceSafetyClass: 'source_safe_deposit_option_route_metadata';
    lowDetailDefault: true;
    expandableSourceSafeDetail: true;
    protectedSourceVisible: false;
    rawSourceTextVisible: false;
    unpaidAssetPackSourceVisible: false;
    rawPromptVisible: false;
    interpolatedPromptVisible: false;
    rawProviderResponseVisible: false;
    walletPrivateMaterialVisible: false;
  };
  proofRoot: string;
}

export const DEPOSIT_ROUTE_STEPS: Array<{
  id: DepositRouteStepId;
  label: string;
  lowDetailGuidance: string;
}> = [
  {
    id: 'connect-source',
    label: 'Connect source',
    lowDetailGuidance: 'Select repository, branch, commit, and source scope for candidate AssetPack option synthesis.',
  },
  {
    id: 'synthesize-options',
    label: 'Synthesize AssetPack options',
    lowDetailGuidance: 'Use source-safe repository context plus demand signals to propose multiple options.',
  },
  {
    id: 'review-options',
    label: 'Review source-safe options',
    lowDetailGuidance: 'Inspect measurements, demand posture, and policy boundaries without exposing protected source.',
  },
  {
    id: 'submit-deposit',
    label: 'Submit deposit',
    lowDetailGuidance: 'Record approved source supply with wallet and repository readiness through the existing deposit composer.',
  },
  {
    id: 'read-depository-state',
    label: 'Read depository state',
    lowDetailGuidance: 'Reread proof roots, searchability, compensation preview, and indexing posture from activity state.',
  },
];

const DEPOSIT_ROUTE_STAGE_IDS = DEPOSIT_ROUTE_STEPS.map((step) => step.id);

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

function resolveActiveStep(input: DepositRouteSessionInput): DepositRouteStepId {
  if (input.depositStage && DEPOSIT_ROUTE_STAGE_IDS.includes(input.depositStage)) return input.depositStage;
  if (input.hasDepositoryReadback) return 'read-depository-state';
  if (input.hasSubmittedDeposit) return 'submit-deposit';
  if (input.hasReviewedOption) return 'review-options';
  if (input.optionsRequested || input.hasRepositorySource) return 'synthesize-options';
  return 'connect-source';
}

function stepState(input: DepositRouteSessionInput, stepId: DepositRouteStepId, activeStepId: DepositRouteStepId): DepositRouteStepState {
  if (stepId === activeStepId) return 'current';
  if (stepId === 'connect-source') return input.hasRepositorySource ? 'complete' : 'ready';
  if (stepId === 'synthesize-options') return input.optionsRequested ? 'complete' : input.hasRepositorySource ? 'ready' : 'blocked';
  if (stepId === 'review-options') return input.hasReviewedOption ? 'complete' : input.optionsRequested ? 'ready' : 'blocked';
  if (stepId === 'submit-deposit') return input.hasSubmittedDeposit ? 'complete' : input.hasReviewedOption ? 'ready' : 'blocked';
  return input.hasDepositoryReadback ? 'complete' : input.hasSubmittedDeposit ? 'ready' : 'blocked';
}

function stepBlockers(input: DepositRouteSessionInput, stepId: DepositRouteStepId): string[] {
  const blockers: string[] = [];
  if (stepId !== 'connect-source' && !input.hasRepositorySource) blockers.push('repository source required');
  if (['review-options', 'submit-deposit', 'read-depository-state'].includes(stepId) && !input.optionsRequested) {
    blockers.push('deposit AssetPack options required');
  }
  if (['submit-deposit', 'read-depository-state'].includes(stepId) && !input.hasReviewedOption) {
    blockers.push('depositor option review required');
  }
  if (stepId === 'read-depository-state' && !input.hasSubmittedDeposit) blockers.push('submitted deposit required');
  return blockers;
}

export function readDepositRouteStage(params: URLSearchParams): DepositRouteStepId | null {
  const stage = params.get('depositStage')?.trim();
  return DEPOSIT_ROUTE_STAGE_IDS.includes(stage as DepositRouteStepId) ? (stage as DepositRouteStepId) : null;
}

export function writeDepositRouteStage(params: URLSearchParams, stage: DepositRouteStepId | null) {
  const next = new URLSearchParams(params.toString());
  if (stage) next.set('depositStage', stage);
  else next.delete('depositStage');
  return next;
}

export function buildDepositRouteSession(input: DepositRouteSessionInput = {}): DepositRouteSession {
  const activeStepId = resolveActiveStep(input);
  const repositoryFullName = normalizedText(input.repositoryFullName);
  const sourceBranch = normalizedText(input.sourceBranch);
  const sourceCommit = normalizedText(input.sourceCommit);
  const synthesis = buildDepositAssetPackOptionSynthesis({
    repositoryFullName,
    sourceBranch,
    sourceCommit,
    depositorInstructions: input.depositorInstructions,
    sourcePathHints: input.sourcePathHints,
    depositoryDemandSignals: input.depositoryDemandSignals,
    readingDemandSignals: input.readingDemandSignals,
    existingDepositorySignals: input.existingDepositorySignals,
    createdAt: input.createdAt,
  });
  const steps = DEPOSIT_ROUTE_STEPS.map((step) => ({
    ...step,
    state: stepState(input, step.id, activeStepId),
    blockers: stepBlockers(input, step.id),
  }));
  const seed = JSON.stringify({
    transactionId: normalizedText(input.transactionId),
    activeStepId,
    repositoryFullName,
    sourceBranch,
    sourceCommit,
    synthesisRoot: synthesis.roots.synthesisRoot,
    steps: steps.map((step) => ({ id: step.id, state: step.state, blockers: step.blockers })),
  });

  return {
    schema: 'bitcode.deposit.route-session',
    route: '/deposit',
    stageCount: 5,
    activeStepId,
    steps,
    routeState: {
      transactionId: normalizedText(input.transactionId),
      depositStage: input.depositStage || null,
      repositoryFullName,
      sourceBranch,
      sourceCommit,
    },
    pipelineOwnership: {
      depositOptionPipeline: 'DepositAssetPackOptionSynthesis',
      reviewRequiredBeforeDepositAdmission: true,
      sourceCriticalityDemandRoiPolicyDeferredToGate6: true,
      admissionAndIndexingDeferredToGate7: true,
      retainedTerminalDebugCompatible: true,
    },
    synthesis,
    disclosure: {
      sourceSafetyClass: 'source_safe_deposit_option_route_metadata',
      lowDetailDefault: true,
      expandableSourceSafeDetail: true,
      protectedSourceVisible: false,
      rawSourceTextVisible: false,
      unpaidAssetPackSourceVisible: false,
      rawPromptVisible: false,
      interpolatedPromptVisible: false,
      rawProviderResponseVisible: false,
      walletPrivateMaterialVisible: false,
    },
    proofRoot: `deposit-route-session:${stableHash(seed)}`,
  };
}

export function assertDepositRouteSessionSourceSafe(session: DepositRouteSession) {
  const synthesisSafety = assertDepositAssetPackOptionSynthesisSourceSafe(session.synthesis);
  const sourceSafe =
    synthesisSafety.admitted &&
    session.schema === 'bitcode.deposit.route-session' &&
    session.route === '/deposit' &&
    session.stageCount === 5 &&
    session.pipelineOwnership.depositOptionPipeline === 'DepositAssetPackOptionSynthesis' &&
    session.pipelineOwnership.reviewRequiredBeforeDepositAdmission === true &&
    session.pipelineOwnership.sourceCriticalityDemandRoiPolicyDeferredToGate6 === true &&
    session.pipelineOwnership.admissionAndIndexingDeferredToGate7 === true &&
    session.disclosure.sourceSafetyClass === 'source_safe_deposit_option_route_metadata' &&
    session.disclosure.protectedSourceVisible === false &&
    session.disclosure.rawSourceTextVisible === false &&
    session.disclosure.unpaidAssetPackSourceVisible === false &&
    session.disclosure.rawPromptVisible === false &&
    session.disclosure.interpolatedPromptVisible === false &&
    session.disclosure.rawProviderResponseVisible === false &&
    session.disclosure.walletPrivateMaterialVisible === false;

  return {
    admitted: sourceSafe,
    reason: sourceSafe ? 'source_safe_deposit_option_route_metadata' : 'deposit_route_source_safety_boundary_violation',
  };
}
