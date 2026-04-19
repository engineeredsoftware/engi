export const ONBOARDING_FLOW_STEPS = ['profile', 'connects', 'interfaces', 'btd'] as const;
export const ORBITAL_FLOW_STEPS = ONBOARDING_FLOW_STEPS;
export const ORBITAL_RING_STEPS = ['connects', 'interfaces', 'profile', 'btd'] as const;
export const ORBITAL_ROUTE_SEQUENCE = ORBITAL_RING_STEPS;
export const ORBITALS_ACCESS_LABEL = 'Orbitals access';
export const ORBITALS_LABEL = 'Orbitals';
export const ORBITALS_LIST_LABEL = 'Connects, Interfaces, Profile, and $BTD';
export const ORBITALS_LIST_COMPACT_LABEL = 'Connects, Interfaces, Profile, $BTD';
export const OPEN_ORBITALS_FULLSCREEN_LABEL = 'Open Orbitals fullscreen';
export const OPEN_TRANSACTIONS_LABEL = 'Open transactions';

export type ConcreteOrbitalPane = (typeof ONBOARDING_FLOW_STEPS)[number];
export type OrbitalPane = ConcreteOrbitalPane | null;

export interface OrbitalPaneDescriptor {
  label: string;
  routeSegment: string;
  ringIndex: number;
  labelPosition: 'top' | 'right' | 'bottom' | 'left';
  routeTitle: string;
  routeDescription: string;
}

export const ORBITAL_DESCRIPTORS: Record<ConcreteOrbitalPane, OrbitalPaneDescriptor> = {
  profile: {
    label: 'Profile',
    routeSegment: 'profile',
    ringIndex: 1,
    labelPosition: 'left',
    routeTitle: 'Profile Auxiliary',
    routeDescription:
      'Keep wallet identity, balances, team roles, multi-sig posture, and access state in one focused auxiliary.',
  },
  connects: {
    label: 'Connects',
    routeSegment: 'connects',
    ringIndex: 3,
    labelPosition: 'top',
    routeTitle: 'Connects Auxiliary',
    routeDescription:
      'Attach GitHub and the live repository connections Bitcode reuses across transactions, deliverables, and closure follow-through in one focused auxiliary.',
  },
  interfaces: {
    label: 'Interfaces',
    routeSegment: 'interfaces',
    ringIndex: 2,
    labelPosition: 'right',
    routeTitle: 'Interfaces Auxiliary',
    routeDescription:
      'Shape how the transactions surface, conversations, proofs, and default application behavior read and operate through one focused auxiliary.',
  },
  btd: {
    label: '$BTD',
    routeSegment: 'btd',
    ringIndex: 0,
    labelPosition: 'bottom',
    routeTitle: '$BTD Auxiliary',
    routeDescription:
      'Review balances, share posture, and advanced $BTD defaults in the innermost auxiliary.',
  },
};

const ORBITAL_COMPATIBILITY_MAP: Record<string, ConcreteOrbitalPane> = {
  users: 'profile',
  profile: 'profile',
  connects: 'connects',
  models: 'interfaces',
  interfaces: 'interfaces',
  credits: 'btd',
  btd: 'btd',
};

export function normalizeOrbitalPane(value: string | null | undefined): ConcreteOrbitalPane | null {
  if (!value) return null;
  return ORBITAL_COMPATIBILITY_MAP[value.trim().toLowerCase()] || null;
}

export function normalizeOrbitalSteps(value: unknown): ConcreteOrbitalPane[] {
  if (!Array.isArray(value)) return [];

  const normalized = value
    .map((entry) => normalizeOrbitalPane(String(entry || '')))
    .filter((entry): entry is ConcreteOrbitalPane => Boolean(entry));

  return Array.from(new Set(normalized));
}

export function labelForOrbitalPane(step: OrbitalPane) {
  if (!step) return '';
  return ORBITAL_DESCRIPTORS[step].label;
}

export function getOrbitalRouteSegment(step: ConcreteOrbitalPane) {
  return ORBITAL_DESCRIPTORS[step].routeSegment;
}

export function getOrbitalRingIndex(step: ConcreteOrbitalPane) {
  return ORBITAL_DESCRIPTORS[step].ringIndex;
}

export function getOrbitalLabelPosition(step: ConcreteOrbitalPane) {
  return ORBITAL_DESCRIPTORS[step].labelPosition;
}

export function getOrbitalDescriptor(step: ConcreteOrbitalPane) {
  return ORBITAL_DESCRIPTORS[step];
}

export function getOrbitalLayerLabel(step: ConcreteOrbitalPane) {
  switch (step) {
    case 'connects':
      return 'outer ring';
    case 'interfaces':
      return 'mid ring';
    case 'profile':
      return 'inner ring';
    case 'btd':
      return 'core ring';
    default:
      return 'orbital';
  }
}

export function getOrbitalOpenActionLabel(step?: ConcreteOrbitalPane | null) {
  if (!step) return OPEN_ORBITALS_FULLSCREEN_LABEL;
  return `Open ${labelForOrbitalPane(step)} fullscreen`;
}

export function getOrbitalsWorkspaceHeading(mode: 'onboarding' | 'orbitals') {
  return mode === 'orbitals'
    ? `Keep ${ORBITALS_LIST_LABEL} in one contained auxiliary read.`
    : `Sign in once, then keep ${ORBITALS_LIST_LABEL} in one contained auxiliary read.`;
}

export function getOrbitalsWorkspaceDescription(mode: 'onboarding' | 'orbitals') {
  return mode === 'orbitals'
    ? 'The four-ring model stays visible while the active auxiliary opens in a stable reading surface tuned for Bitcode transactions, conversations, wallet posture, and auxiliary follow-through.'
    : 'Open Bitcode access in a stable auxiliary read, then move between Profile, Connects, Interfaces, and $BTD without losing the active pane or route context.';
}

export function getOrbitalsTabsDescription(mode: 'onboarding' | 'orbitals') {
  return mode === 'orbitals'
    ? `Move between ${ORBITALS_LIST_COMPACT_LABEL} without losing your place in the auxiliary read.`
    : `Sign in to unlock the four orbitals, then keep ${ORBITALS_LIST_LABEL} in one contained auxiliary read.`;
}
