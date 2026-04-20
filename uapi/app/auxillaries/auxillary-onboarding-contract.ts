import {
  AUXILLARY_FLOW_STEPS,
  type ConcreteAuxillaryPane,
  normalizeAuxillaryPane,
  normalizeAuxillarySteps,
} from '@/app/auxillaries/components/auxillary-pane-meta';

export interface AuxillaryOnboardingPayload {
  completedPanes: ConcreteAuxillaryPane[];
  currentPane: ConcreteAuxillaryPane | null;
  completedSteps: ConcreteAuxillaryPane[];
  currentStep: ConcreteAuxillaryPane | null;
  isOnboardingComplete: boolean;
}

export interface AuxillaryDataPayload {
  profile: unknown | null;
  githubConnection: unknown | null;
  credits: number;
  modelPreferences: unknown | null;
  onboardedPanes: ConcreteAuxillaryPane[];
  onboarded_steps: ConcreteAuxillaryPane[];
  isOnboardingComplete: boolean;
}

export function parseStoredAuxillarySteps(value: unknown): ConcreteAuxillaryPane[] {
  if (Array.isArray(value)) {
    return normalizeAuxillarySteps(value);
  }

  if (typeof value === 'string' && value.trim()) {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return normalizeAuxillarySteps(parsed);
      }
    } catch {
      const normalized = normalizeAuxillarySteps([value]);
      if (normalized.length) {
        return normalized;
      }
    }
  }

  return [];
}

export function serializeAuxillarySteps(steps: readonly ConcreteAuxillaryPane[]) {
  return JSON.stringify(normalizeAuxillarySteps([...steps]));
}

export function buildAuxillaryOnboardingPayload(
  completedSteps: readonly ConcreteAuxillaryPane[],
): AuxillaryOnboardingPayload {
  const completedPanes = normalizeAuxillarySteps([...completedSteps]);
  const currentPane = AUXILLARY_FLOW_STEPS.find((step) => !completedPanes.includes(step)) || null;

  return {
    completedPanes,
    currentPane,
    completedSteps: completedPanes,
    currentStep: currentPane,
    isOnboardingComplete: completedPanes.length === AUXILLARY_FLOW_STEPS.length,
  };
}

export function buildAnonymousAuxillaryData(): AuxillaryDataPayload {
  const onboardedPanes: ConcreteAuxillaryPane[] = [];

  return {
    profile: null,
    githubConnection: null,
    credits: 0,
    modelPreferences: null,
    onboardedPanes,
    onboarded_steps: onboardedPanes,
    isOnboardingComplete: false,
  };
}

export function buildAuxillaryDataPayload({
  profile,
  githubConnection,
  credits,
  modelPreferences,
  onboardedSteps,
}: {
  profile: unknown | null;
  githubConnection: unknown | null;
  credits: number;
  modelPreferences: unknown | null;
  onboardedSteps: unknown;
}): AuxillaryDataPayload {
  const onboardedPanes = parseStoredAuxillarySteps(onboardedSteps);

  return {
    profile,
    githubConnection,
    credits,
    modelPreferences,
    onboardedPanes,
    onboarded_steps: onboardedPanes,
    isOnboardingComplete: onboardedPanes.length === AUXILLARY_FLOW_STEPS.length,
  };
}

export function normalizeCompletedAuxillaryPane(value: string | null | undefined) {
  return normalizeAuxillaryPane(value);
}
