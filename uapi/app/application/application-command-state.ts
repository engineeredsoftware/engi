type ShellSnapshot = {
  selection?: {
    scenarioId?: string | null;
    projectionPrincipal?: string | null;
    branchMode?: string | null;
  } | null;
  scenarios?: Array<{
    scenarioId?: string | null;
    scenarioFamily?: string | null;
    repo?: string | null;
    profileShortLabel?: string | null;
    selected?: boolean | null;
  }> | null;
  commandSurface?: {
    heroLede?: string | null;
    heroTip?: string | null;
    status?: string | null;
    flowGuideLabel?: string | null;
    flowGuideOpen?: boolean | null;
    flowGuideStepIndex?: number | null;
    flowGuideStepCount?: number | null;
    tutorialLabel?: string | null;
    tutorialOpen?: boolean | null;
    tutorialStepIndex?: number | null;
    tutorialStepCount?: number | null;
    projectionOptions?: Array<{
      value?: string | null;
      label?: string | null;
    }> | null;
    branchModeOptions?: Array<{
      value?: string | null;
      label?: string | null;
    }> | null;
  } | null;
} | null;

type CommandOption = {
  value: string;
  label: string;
};

export type ApplicationCommandState = {
  scenario: string;
  projection: string;
  branchMode: string;
  scenarioOptions: CommandOption[];
  projectionOptions: CommandOption[];
  branchOptions: CommandOption[];
  heroLede: string;
  heroTip: string;
  status: string;
  flowGuideLabel: string;
  flowGuideOpen: boolean;
  flowGuideStepIndex: number;
  flowGuideStepCount: number;
  shellReady: boolean;
};

function normalizeOptions(
  options: Array<{ value?: string | null; label?: string | null }> | null | undefined,
  fallback: CommandOption[] = [],
) {
  const normalized = (options || [])
    .map((option) => {
      const value = String(option.value || '').trim();
      if (!value) return null;
      return {
        value,
        label: String(option.label || value).trim() || value,
      };
    })
    .filter((option): option is CommandOption => Boolean(option));
  return normalized.length ? normalized : fallback;
}

export function normalizeApplicationCommandState(snapshot: ShellSnapshot): ApplicationCommandState | null {
  if (!snapshot) return null;

  const scenarioOptions = (snapshot.scenarios || [])
    .map((scenario) => {
      const value = String(scenario.scenarioId || '').trim();
      if (!value) return null;
      const family = String(scenario.scenarioFamily || value).trim() || value;
      const profile = String(scenario.profileShortLabel || '').trim();
      return {
        value,
        label: profile ? `${family} · ${profile}` : family,
      };
    })
    .filter((option): option is CommandOption => Boolean(option));

  const projectionOptions = normalizeOptions(snapshot.commandSurface?.projectionOptions, [
    { value: 'buyer', label: 'buyer' },
    { value: 'reviewer', label: 'reviewer' },
    { value: 'public', label: 'public' },
    { value: 'internal', label: 'internal' },
  ]);

  const branchOptions = normalizeOptions(snapshot.commandSurface?.branchModeOptions, [
    { value: 'patch', label: 'patch' },
    { value: 'context', label: 'context' },
  ]);

  const scenario =
    String(snapshot.selection?.scenarioId || '').trim() ||
    scenarioOptions[0]?.value ||
    '';
  const projection =
    String(snapshot.selection?.projectionPrincipal || '').trim() ||
    projectionOptions[0]?.value ||
    'buyer';
  const branchMode =
    String(snapshot.selection?.branchMode || '').trim() ||
    branchOptions[0]?.value ||
    'patch';

  return {
    scenario,
    projection,
    branchMode,
    scenarioOptions,
    projectionOptions,
    branchOptions,
    heroLede:
      String(snapshot.commandSurface?.heroLede || '').trim() ||
      'Awaiting current Bitcode posture…',
    heroTip:
      String(snapshot.commandSurface?.heroTip || '').trim() ||
      'The current flow guidance and runtime signals are loading.',
    status:
      String(snapshot.commandSurface?.status || '').trim() ||
      'Flow controls are syncing.',
    flowGuideLabel:
      String(snapshot.commandSurface?.flowGuideLabel || snapshot.commandSurface?.tutorialLabel || '').trim() ||
      'Flow guide',
    flowGuideOpen: Boolean(
      typeof snapshot.commandSurface?.flowGuideOpen === 'boolean'
        ? snapshot.commandSurface.flowGuideOpen
        : snapshot.commandSurface?.tutorialOpen,
    ),
    flowGuideStepIndex:
      typeof snapshot.commandSurface?.flowGuideStepIndex === 'number'
        ? snapshot.commandSurface.flowGuideStepIndex
        : typeof snapshot.commandSurface?.tutorialStepIndex === 'number'
          ? snapshot.commandSurface.tutorialStepIndex
        : 0,
    flowGuideStepCount:
      typeof snapshot.commandSurface?.flowGuideStepCount === 'number'
        ? snapshot.commandSurface.flowGuideStepCount
        : typeof snapshot.commandSurface?.tutorialStepCount === 'number'
          ? snapshot.commandSurface.tutorialStepCount
        : 0,
    shellReady: Boolean(scenarioOptions.length && projectionOptions.length && branchOptions.length),
  };
}
