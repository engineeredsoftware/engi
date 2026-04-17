type ShellSnapshot = {
  selection?: {
    scenarioId?: string | null;
  } | null;
  scenarios?: Array<{
    scenarioId?: string | null;
    scenarioFamily?: string | null;
    repo?: string | null;
    profileShortLabel?: string | null;
    selected?: boolean | null;
  }> | null;
  needingSurface?: {
    parserKind?: string | null;
    closureCriteria?: string[] | null;
    targetArtifactKinds?: string[] | null;
  } | null;
} | null;

export type ApplicationNeedScenariosState = {
  selectedScenarioId: string;
  parserKind: string;
  closureCriteriaCount: number;
  targetKindCount: number;
  scenarios: Array<{
    id: string;
    label: string;
    repo: string;
    profile: string;
    selected: boolean;
  }>;
};

export function normalizeApplicationNeedScenarios(snapshot: ShellSnapshot): ApplicationNeedScenariosState | null {
  if (!snapshot) return null;

  const scenarios = (snapshot.scenarios || [])
    .map((scenario) => {
      const id = String(scenario.scenarioId || '').trim();
      if (!id) return null;
      return {
        id,
        label: String(scenario.scenarioFamily || id).trim() || id,
        repo: String(scenario.repo || '—').trim() || '—',
        profile: String(scenario.profileShortLabel || 'profile pending').trim() || 'profile pending',
        selected: Boolean(scenario.selected) || id === String(snapshot.selection?.scenarioId || '').trim(),
      };
    })
    .filter(
      (
        scenario,
      ): scenario is {
        id: string;
        label: string;
        repo: string;
        profile: string;
        selected: boolean;
      } => Boolean(scenario),
    );

  return {
    selectedScenarioId: scenarios.find((scenario) => scenario.selected)?.id || scenarios[0]?.id || '',
    parserKind: String(snapshot.needingSurface?.parserKind || '—').trim() || '—',
    closureCriteriaCount: Array.isArray(snapshot.needingSurface?.closureCriteria)
      ? snapshot.needingSurface?.closureCriteria.length
      : 0,
    targetKindCount: Array.isArray(snapshot.needingSurface?.targetArtifactKinds)
      ? snapshot.needingSurface?.targetArtifactKinds.length
      : 0,
    scenarios,
  };
}
