import type { TerminalCommandState } from './terminal-command-state';

export type TerminalCommandPresentation = {
  draftSummary: string;
  continuationStatus: string;
  continuationTip: string;
};

function findLabel(
  options: Array<{ value: string; label: string }>,
  value: string,
  fallback: string,
) {
  return options.find((option) => option.value === value)?.label || fallback;
}

export function deriveTerminalCommandPresentation(
  commandState: TerminalCommandState | null,
): TerminalCommandPresentation {
  if (!commandState || !commandState.shellReady) {
    return {
      draftSummary: 'Loading the current Bitcode working flow.',
      continuationStatus: 'Controls are syncing to the current Bitcode activity.',
      continuationTip:
        'Stay in the Bitcode Terminal while scenario, projection, and branch mode become available.',
    };
  }

  const scenarioLabel = findLabel(commandState.scenarioOptions, commandState.scenario, commandState.scenario);
  const projectionLabel = findLabel(
    commandState.projectionOptions,
    commandState.projection,
    commandState.projection,
  );
  const branchLabel = findLabel(commandState.branchOptions, commandState.branchMode, commandState.branchMode);
  const guideStep =
    commandState.flowGuideStepCount > 0
      ? `step ${Math.min(commandState.flowGuideStepIndex + 1, commandState.flowGuideStepCount)} of ${commandState.flowGuideStepCount}`
      : null;

  return {
    draftSummary: `Work from ${scenarioLabel} with ${projectionLabel} projection and ${branchLabel} branch handling while the selected Bitcode activity stays in view.`,
    continuationStatus: guideStep
      ? `${commandState.flowGuideOpen ? 'Flow guide is open' : 'Flow guide is saved'} at ${guideStep}.`
      : 'Controls are ready. Continue into Deposit, Read, or closure from the Bitcode Terminal.',
    continuationTip:
      'Use the flow guide when you want stepwise deposit-to-closure follow-through, or jump directly into Deposit, Read, and closure when the current Bitcode activity already has enough context.',
  };
}
