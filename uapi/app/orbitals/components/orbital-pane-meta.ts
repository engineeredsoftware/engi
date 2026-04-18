export const ORBITAL_FLOW_STEPS = ['profile', 'connects', 'interfaces', 'btd'] as const;

export type ConcreteOrbitalPane = (typeof ORBITAL_FLOW_STEPS)[number];
export type OrbitalPane = ConcreteOrbitalPane | null;

export interface OrbitalPaneDescriptor {
  label: string;
  routeSegment: string;
  ringIndex: number;
  routeTitle: string;
  routeDescription: string;
}

export const ORBITAL_DESCRIPTORS: Record<ConcreteOrbitalPane, OrbitalPaneDescriptor> = {
  profile: {
    label: 'Profile',
    routeSegment: 'users',
    ringIndex: 1,
    routeTitle: 'Profile Orbital',
    routeDescription:
      'Keep account identity, wallet posture, team roles, and access state in one focused orbital.',
  },
  connects: {
    label: 'Connects',
    routeSegment: 'connects',
    ringIndex: 3,
    routeTitle: 'Connects Orbital',
    routeDescription:
      'Attach GitHub and the live repository interfaces Bitcode reuses across transactions, deliverables, and follow-through.',
  },
  interfaces: {
    label: 'Interfaces',
    routeSegment: 'interfaces',
    ringIndex: 2,
    routeTitle: 'Interfaces Orbital',
    routeDescription:
      'Shape how the transactions window, conversations, proofs, and default model behavior read and operate.',
  },
  btd: {
    label: '$BTD',
    routeSegment: 'btd',
    ringIndex: 0,
    routeTitle: '$BTD Orbital',
    routeDescription:
      'Review balance, share posture, and advanced $BTD defaults in the innermost orbital.',
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

export function getOrbitalDescriptor(step: ConcreteOrbitalPane) {
  return ORBITAL_DESCRIPTORS[step];
}
