import type { ApplicationCommandState } from './application-command-state';
import type { BitcodeTransactionReadiness } from './bitcode-transaction-readiness';

export type ApplicationFlowGuideStageStatus = 'done' | 'current' | 'next';

export type ApplicationFlowGuideStage = {
  id: 'context' | 'give' | 'need' | 'fit-proof' | 'closure';
  label: string;
  summary: string;
  status: ApplicationFlowGuideStageStatus;
};

export type ApplicationFlowGuide = {
  readinessLabel: string;
  statusSummary: string;
  stages: ApplicationFlowGuideStage[];
};

const FLOW_STAGE_BLUEPRINT: Array<Pick<ApplicationFlowGuideStage, 'id' | 'label' | 'summary'>> = [
  {
    id: 'context',
    label: 'Source',
    summary: 'Confirm repository source, selected Bitcode activity context, and the working posture before you continue the flow.',
  },
  {
    id: 'give',
    label: 'Give draft',
    summary: 'Select supply, shape the give draft, and keep provenance explicit.',
  },
  {
    id: 'need',
    label: 'Need draft',
    summary: 'Choose the active need and keep the measured demand readable.',
  },
  {
    id: 'fit-proof',
    label: 'Fit + proof',
    summary: 'Read fit pressure, candidate posture, and proof readiness before closure.',
  },
  {
    id: 'closure',
    label: 'Closure',
    summary: 'Run branch, settlement, asset-pack, and history follow-through without losing the selected Bitcode activity.',
  },
];

function resolveCurrentStageIndex(commandState: ApplicationCommandState | null) {
  if (!commandState?.shellReady) return 0;
  if (commandState.flowGuideStepCount <= 1) return 0;

  const progress = commandState.flowGuideStepIndex / Math.max(commandState.flowGuideStepCount - 1, 1);
  return Math.min(FLOW_STAGE_BLUEPRINT.length - 1, Math.floor(progress * FLOW_STAGE_BLUEPRINT.length));
}

export function deriveApplicationFlowGuide(
  commandState: ApplicationCommandState | null,
  transactionReadiness?: Pick<BitcodeTransactionReadiness, 'canTransact' | 'summary'> | null,
): ApplicationFlowGuide {
  const currentStageIndex = resolveCurrentStageIndex(commandState);
  const guideStep =
    commandState && commandState.flowGuideStepCount > 0
      ? `step ${Math.min(commandState.flowGuideStepIndex + 1, commandState.flowGuideStepCount)} of ${commandState.flowGuideStepCount}`
      : null;
  const reviewOnly = Boolean(commandState?.shellReady && transactionReadiness && !transactionReadiness.canTransact);

  const readinessLabel = !commandState?.shellReady
    ? 'syncing'
    : reviewOnly
      ? 'review-only'
    : commandState.flowGuideOpen
      ? 'drafting'
      : guideStep
        ? 'saved'
        : 'ready';

  const statusSummary = !commandState?.shellReady
    ? 'The flow guide is syncing to the current Bitcode Terminal.'
    : reviewOnly
      ? transactionReadiness?.summary || 'The Bitcode Terminal is in review-only mode until transactional readiness is complete.'
    : guideStep
      ? `The flow guide is ${commandState.flowGuideOpen ? 'open' : 'saved'} at ${guideStep}.`
      : 'The Bitcode Terminal is ready for a fresh give-to-closure flow.';

  const stages = FLOW_STAGE_BLUEPRINT.map<ApplicationFlowGuideStage>((stage, index) => ({
    ...stage,
    status:
      index < currentStageIndex
        ? 'done'
        : index === currentStageIndex
          ? 'current'
          : 'next',
  }));

  return {
    readinessLabel,
    statusSummary,
    stages,
  };
}
