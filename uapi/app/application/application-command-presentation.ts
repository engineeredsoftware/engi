import type { ApplicationCommandState } from './application-command-state';

export type ApplicationCommandPresentation = {
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

export function deriveApplicationCommandPresentation(
  commandState: ApplicationCommandState | null,
): ApplicationCommandPresentation {
  if (!commandState || !commandState.shellReady) {
    return {
      draftSummary: 'Loading the current Bitcode working posture.',
      continuationStatus: 'Controls are syncing to the current workspace state.',
      continuationTip:
        'Stay in the transaction terminal while scenario, projection, and branch mode become available.',
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
    commandState.tutorialStepCount > 0
      ? `step ${Math.min(commandState.tutorialStepIndex + 1, commandState.tutorialStepCount)} of ${commandState.tutorialStepCount}`
      : null;

  return {
    draftSummary: `Work from ${scenarioLabel} with ${projectionLabel} projection and ${branchLabel} branch handling while the selected transaction stays in view.`,
    continuationStatus: guideStep
      ? `${commandState.tutorialOpen ? 'Flow guide is open' : 'Flow guide is paused'} at ${guideStep}.`
      : 'Controls are ready. Continue into give, need, or closure from this workspace.',
    continuationTip:
      'Use the guide when you want stepwise follow-through, or jump directly into give, need, and closure when the current transaction already has enough context.',
  };
}
