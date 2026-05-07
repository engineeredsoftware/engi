import type { TerminalCommandState } from './terminal-command-state';
import type { BitcodeTransactionReadiness } from './bitcode-transaction-readiness';

export type TerminalFlowGuideStageStatus = 'done' | 'current' | 'next';

export type TerminalFlowGuideStage = {
  id: 'context' | 'give' | 'need' | 'fit-proof' | 'closure';
  label: string;
  summary: string;
  status: TerminalFlowGuideStageStatus;
};

export type TerminalFlowGuide = {
  readinessLabel:
    | 'syncing'
    | 'review-only'
    | 'draft-only'
    | 'repository-reconnect-required'
    | 'wallet-reconnect-required'
    | 'drafting'
    | 'saved'
    | 'ready';
  statusSummary: string;
  stages: TerminalFlowGuideStage[];
};

const FLOW_STAGE_BLUEPRINT: Array<Pick<TerminalFlowGuideStage, 'id' | 'label' | 'summary'>> = [
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

function resolveCurrentStageIndex(commandState: TerminalCommandState | null) {
  if (!commandState?.shellReady) return 0;
  if (commandState.flowGuideStepCount <= 1) return 0;

  const progress = commandState.flowGuideStepIndex / Math.max(commandState.flowGuideStepCount - 1, 1);
  return Math.min(FLOW_STAGE_BLUEPRINT.length - 1, Math.floor(progress * FLOW_STAGE_BLUEPRINT.length));
}

export function deriveTerminalFlowGuide(
  commandState: TerminalCommandState | null,
  transactionReadiness?: Pick<BitcodeTransactionReadiness, 'canTransact' | 'canSettle' | 'summary' | 'label'> | null,
): TerminalFlowGuide {
  const currentStageIndex = resolveCurrentStageIndex(commandState);
  const guideStep =
    commandState && commandState.flowGuideStepCount > 0
      ? `step ${Math.min(commandState.flowGuideStepIndex + 1, commandState.flowGuideStepCount)} of ${commandState.flowGuideStepCount}`
      : null;
  const reviewOnly = Boolean(commandState?.shellReady && transactionReadiness && !transactionReadiness.canTransact);
  const draftOnly = Boolean(
    commandState?.shellReady &&
      transactionReadiness &&
      transactionReadiness.canTransact &&
      !transactionReadiness.canSettle,
  );
  const repositoryReconnectRequired =
    Boolean(commandState?.shellReady) && transactionReadiness?.label === 'repository reconnect required';
  const walletReconnectRequired =
    Boolean(commandState?.shellReady) && transactionReadiness?.label === 'wallet reconnect required';

  const readinessLabel = !commandState?.shellReady
    ? 'syncing'
    : repositoryReconnectRequired
      ? 'repository-reconnect-required'
    : walletReconnectRequired
      ? 'wallet-reconnect-required'
    : reviewOnly
      ? 'review-only'
    : draftOnly
      ? 'draft-only'
    : commandState.flowGuideOpen
      ? 'drafting'
      : guideStep
        ? 'saved'
        : 'ready';

  const statusSummary = !commandState?.shellReady
    ? 'The flow guide is syncing to the current Bitcode Terminal.'
    : repositoryReconnectRequired || walletReconnectRequired
      ? guideStep
        ? `The flow guide is ${commandState.flowGuideOpen ? 'open' : 'saved'} at ${guideStep}. ${transactionReadiness?.summary || 'Reconnect-required transactional readiness is blocking signed settlement.'}`
        : transactionReadiness?.summary || 'Reconnect-required transactional readiness is blocking signed settlement.'
    : reviewOnly
      ? transactionReadiness?.summary || 'The Bitcode Terminal is in review-only mode until transactional readiness is complete.'
    : draftOnly
      ? guideStep
        ? `The flow guide is ${commandState.flowGuideOpen ? 'open' : 'saved'} at ${guideStep}. ${transactionReadiness?.summary || 'Bitcode can keep drafting, but branch, deposit, and closure remain fail-closed until signed settlement readiness is complete.'}`
        : transactionReadiness?.summary ||
          'Bitcode can keep drafting, but branch, deposit, and closure remain fail-closed until signed settlement readiness is complete.'
    : guideStep
      ? `The flow guide is ${commandState.flowGuideOpen ? 'open' : 'saved'} at ${guideStep}.`
      : 'The Bitcode Terminal is ready for a fresh give-to-closure flow.';

  const stages = FLOW_STAGE_BLUEPRINT.map<TerminalFlowGuideStage>((stage, index) => ({
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
