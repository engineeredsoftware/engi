export const ORBITAL_FLOW_STEPS = ['profile', 'connects', 'interfaces', 'btd'] as const;

export type ConcreteOrbitalPane = (typeof ORBITAL_FLOW_STEPS)[number];
export type OrbitalPane = ConcreteOrbitalPane | null;

const ORBITAL_LABELS: Record<ConcreteOrbitalPane, string> = {
  profile: 'Profile',
  connects: 'Connects',
  interfaces: 'Interfaces',
  btd: '$BTD',
};

const ORBITAL_ROUTE_SEGMENTS: Record<ConcreteOrbitalPane, string> = {
  profile: 'users',
  connects: 'connects',
  interfaces: 'interfaces',
  btd: 'btd',
};

const ORBITAL_RING_INDEX: Record<ConcreteOrbitalPane, number> = {
  btd: 0,
  profile: 1,
  interfaces: 2,
  connects: 3,
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
  return ORBITAL_LABELS[step];
}

export function getOrbitalRouteSegment(step: ConcreteOrbitalPane) {
  return ORBITAL_ROUTE_SEGMENTS[step];
}

export function getOrbitalRingIndex(step: ConcreteOrbitalPane) {
  return ORBITAL_RING_INDEX[step];
}
