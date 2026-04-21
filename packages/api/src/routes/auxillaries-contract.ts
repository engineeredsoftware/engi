export const AUXILLARY_FLOW_STEPS = ['profile', 'connects', 'interfaces', 'btd'] as const;

export type ConcreteAuxillaryPane = (typeof AUXILLARY_FLOW_STEPS)[number];

const AUXILLARY_COMPATIBILITY_MAP: Record<string, ConcreteAuxillaryPane> = {
  users: 'profile',
  profile: 'profile',
  connects: 'connects',
  models: 'interfaces',
  interfaces: 'interfaces',
  credits: 'btd',
  btd: 'btd',
};

export interface AuxillaryOnboardingPayload {
  completedPanes: ConcreteAuxillaryPane[];
  currentPane: ConcreteAuxillaryPane | null;
  completedSteps: ConcreteAuxillaryPane[];
  currentStep: ConcreteAuxillaryPane | null;
  isOnboardingComplete: boolean;
}

export interface AuxillaryOnboardingUpdatePayload {
  completedPane?: string;
  completedStep?: string;
}

export interface AuxillaryDataPayload {
  profile: unknown | null;
  githubConnection: unknown | null;
  btdBalance: number;
  credits: number;
  modelPreferences: unknown | null;
  onboardedPanes: ConcreteAuxillaryPane[];
  onboarded_steps: ConcreteAuxillaryPane[];
  isOnboardingComplete: boolean;
}

export interface AuxillaryBtdUpdatePayload {
  btdBalance?: number;
  totalBtd?: number;
  credits?: number;
  totalCredits?: number;
}

export function normalizeAuxillaryPane(value: string | null | undefined): ConcreteAuxillaryPane | null {
  if (!value) return null;
  return AUXILLARY_COMPATIBILITY_MAP[value.trim().toLowerCase()] || null;
}

export function normalizeAuxillarySteps(value: unknown): ConcreteAuxillaryPane[] {
  if (!Array.isArray(value)) return [];

  const normalized = value
    .map((entry) => normalizeAuxillaryPane(String(entry || '')))
    .filter((entry): entry is ConcreteAuxillaryPane => Boolean(entry));

  return Array.from(new Set(normalized));
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

export function isAuxillaryOnboardingComplete(steps: readonly ConcreteAuxillaryPane[]) {
  return normalizeAuxillarySteps([...steps]).length === AUXILLARY_FLOW_STEPS.length;
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
    isOnboardingComplete: isAuxillaryOnboardingComplete(completedPanes),
  };
}

export function buildAnonymousAuxillaryData(): AuxillaryDataPayload {
  const onboardedPanes: ConcreteAuxillaryPane[] = [];

  return {
    profile: null,
    githubConnection: null,
    btdBalance: 0,
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
  btdBalance,
  credits,
  modelPreferences,
  onboardedSteps,
}: {
  profile: unknown | null;
  githubConnection: unknown | null;
  btdBalance?: number;
  credits: number;
  modelPreferences: unknown | null;
  onboardedSteps: unknown;
}): AuxillaryDataPayload {
  const onboardedPanes = parseStoredAuxillarySteps(onboardedSteps);
  const resolvedBtdBalance =
    typeof btdBalance === 'number'
      ? btdBalance
      : typeof credits === 'number'
        ? credits
        : 0;

  return {
    profile,
    githubConnection,
    btdBalance: resolvedBtdBalance,
    // Keep the old key during fifth-gate so older consumers keep working
    // while the canonical contract moves to BTC/BTD-owned naming.
    credits: resolvedBtdBalance,
    modelPreferences,
    onboardedPanes,
    onboarded_steps: onboardedPanes,
    isOnboardingComplete: isAuxillaryOnboardingComplete(onboardedPanes),
  };
}

export function normalizeCompletedAuxillaryPane(value: string | null | undefined) {
  return normalizeAuxillaryPane(value);
}
