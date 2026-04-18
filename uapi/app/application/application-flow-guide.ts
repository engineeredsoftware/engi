import type { ApplicationCommandState } from './application-command-state';

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
    label: 'Context',
    summary: 'Set repository supply, operator posture, and the working scenario before drafting.',
  },
  {
    id: 'give',
    label: 'Give',
    summary: 'Select supply, shape the deposit draft, and keep provenance explicit.',
  },
  {
    id: 'need',
    label: 'Need',
    summary: 'Choose the active demand frame and keep the measured scenario readable.',
  },
  {
    id: 'fit-proof',
    label: 'Fit + proof',
    summary: 'Read fit pressure, ranked candidates, and bounded proof posture before closure.',
  },
  {
    id: 'closure',
    label: 'Closure',
    summary: 'Run branch, settlement, and ledger follow-through without losing the selected transaction.',
  },
];

function resolveCurrentStageIndex(commandState: ApplicationCommandState | null) {
  if (!commandState?.shellReady) return 0;
  if (commandState.tutorialStepCount <= 1) return 0;

  const progress = commandState.tutorialStepIndex / Math.max(commandState.tutorialStepCount - 1, 1);
  return Math.min(FLOW_STAGE_BLUEPRINT.length - 1, Math.floor(progress * FLOW_STAGE_BLUEPRINT.length));
}

export function deriveApplicationFlowGuide(commandState: ApplicationCommandState | null): ApplicationFlowGuide {
  const currentStageIndex = resolveCurrentStageIndex(commandState);
  const guideStep =
    commandState && commandState.tutorialStepCount > 0
      ? `step ${Math.min(commandState.tutorialStepIndex + 1, commandState.tutorialStepCount)} of ${commandState.tutorialStepCount}`
      : null;

  const readinessLabel = !commandState?.shellReady
    ? 'syncing'
    : commandState.tutorialOpen
      ? 'active'
      : guideStep
        ? 'paused'
        : 'ready';

  const statusSummary = !commandState?.shellReady
    ? 'The resumable guide is syncing to the current transaction workspace.'
    : guideStep
      ? `Guide posture is ${readinessLabel} at ${guideStep}.`
      : 'The workspace is ready for a fresh give-to-closure pass.';

  const stages = FLOW_STAGE_BLUEPRINT.map((stage, index) => ({
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
