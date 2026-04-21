import {
  AUXILLARY_FLOW_STEPS,
  type ConcreteAuxillaryPane,
  normalizeAuxillaryPane,
  normalizeAuxillarySteps,
} from '@bitcode/api/src/routes/auxillaries-contract';

export const AUXILLARY_RING_STEPS = ['connects', 'interfaces', 'profile', 'btd'] as const;
export const AUXILLARY_ROUTE_SEQUENCE = AUXILLARY_RING_STEPS;
export const AUXILLARIES_ACCESS_LABEL = 'Auxillaries access';
export const AUXILLARIES_LABEL = 'Auxillaries';
export const AUXILLARIES_LIST_LABEL = 'Connects, Interfaces, Profile, and $BTD';
export const AUXILLARIES_LIST_COMPACT_LABEL = 'Connects, Interfaces, Profile, $BTD';
export const OPEN_AUXILLARIES_FULLSCREEN_LABEL = 'Open Auxillaries fullscreen';
export const OPEN_TRANSACTIONS_LABEL = 'Open Bitcode Terminal';
export const AUXILLARIES_ROUTE_ROOT = '/auxillaries';
export const ORBITALS_COMPATIBILITY_ROUTE_ROOT = '/orbitals';

export type AuxillaryPane = ConcreteAuxillaryPane | null;

export interface AuxillaryPaneDescriptor {
  label: string;
  routeSegment: string;
  ringIndex: number;
  labelPosition: 'top' | 'right' | 'bottom' | 'left';
  routeTitle: string;
  routeDescription: string;
}

export const AUXILLARY_DESCRIPTORS: Record<ConcreteAuxillaryPane, AuxillaryPaneDescriptor> = {
  profile: {
    label: 'Profile',
    routeSegment: 'profile',
    ringIndex: 1,
    labelPosition: 'left',
    routeTitle: 'Profile Auxillary',
    routeDescription:
      'Keep wallet identity, balances, team roles, multi-sig posture, and access state in one focused auxillary.',
  },
  connects: {
    label: 'Connects',
    routeSegment: 'connects',
    ringIndex: 3,
    labelPosition: 'top',
    routeTitle: 'Connects Auxillary',
    routeDescription:
      'Attach GitHub and the live repository connections Bitcode reuses across transactions, executions, deliverables, and closure follow-through in one focused auxillary.',
  },
  interfaces: {
    label: 'Interfaces',
    routeSegment: 'interfaces',
    ringIndex: 2,
    labelPosition: 'right',
    routeTitle: 'Interfaces Auxillary',
    routeDescription:
      'Shape how the transactions surface, conversations, proofs, and default application behavior read and operate through one focused auxillary.',
  },
  btd: {
    label: '$BTD',
    routeSegment: 'btd',
    ringIndex: 0,
    labelPosition: 'bottom',
    routeTitle: '$BTD Auxillary',
    routeDescription:
      'Review balances, share posture, and advanced $BTD defaults in the innermost auxillary.',
  },
};

export { AUXILLARY_FLOW_STEPS, normalizeAuxillaryPane, normalizeAuxillarySteps };

export function labelForAuxillaryPane(step: AuxillaryPane) {
  if (!step) return '';
  return AUXILLARY_DESCRIPTORS[step].label;
}

export function getAuxillaryRouteSegment(step: ConcreteAuxillaryPane) {
  return AUXILLARY_DESCRIPTORS[step].routeSegment;
}

export function buildAuxillariesRoutePath(stepOrSegment: ConcreteAuxillaryPane | string) {
  const normalizedStep = normalizeAuxillaryPane(stepOrSegment);
  const routeSegment = normalizedStep
    ? getAuxillaryRouteSegment(normalizedStep)
    : stepOrSegment.trim().toLowerCase();
  return `${AUXILLARIES_ROUTE_ROOT}/${routeSegment}`;
}

export function isAuxillariesPath(pathname: string | null | undefined) {
  return Boolean(pathname?.startsWith(AUXILLARIES_ROUTE_ROOT));
}

export function isOrbitalsCompatibilityPath(pathname: string | null | undefined) {
  return Boolean(pathname?.startsWith(ORBITALS_COMPATIBILITY_ROUTE_ROOT));
}

export function getAuxillaryRingIndex(step: ConcreteAuxillaryPane) {
  return AUXILLARY_DESCRIPTORS[step].ringIndex;
}

export function getAuxillaryLabelPosition(step: ConcreteAuxillaryPane) {
  return AUXILLARY_DESCRIPTORS[step].labelPosition;
}

export function getAuxillaryDescriptor(step: ConcreteAuxillaryPane) {
  return AUXILLARY_DESCRIPTORS[step];
}

export function getAuxillaryLayerLabel(step: ConcreteAuxillaryPane) {
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
      return 'auxillary';
  }
}

export function getAuxillaryOpenActionLabel(step?: ConcreteAuxillaryPane | null) {
  if (!step) return OPEN_AUXILLARIES_FULLSCREEN_LABEL;
  return `Open ${labelForAuxillaryPane(step)} fullscreen`;
}

export function getAuxillariesWorkspaceHeading(mode: 'onboarding' | 'auxillaries') {
  return mode === 'auxillaries'
    ? `Keep ${AUXILLARIES_LIST_LABEL} in one contained auxillary read.`
    : `Sign in once, then keep ${AUXILLARIES_LIST_LABEL} in one contained auxillary read.`;
}

export function getAuxillariesWorkspaceDescription(mode: 'onboarding' | 'auxillaries') {
  return mode === 'auxillaries'
    ? 'The four-ring model stays visible while the active auxillary opens in a stable reading surface tuned for Bitcode transactions, executions, conversations, wallet posture, and auxillary follow-through.'
    : 'Open Bitcode access in a stable auxillary read, then move between Profile, Connects, Interfaces, and $BTD without losing the active pane or route context.';
}

export function getAuxillariesTabsDescription(mode: 'onboarding' | 'auxillaries') {
  return mode === 'auxillaries'
    ? `Move between ${AUXILLARIES_LIST_COMPACT_LABEL} without losing your place in the auxillary read.`
    : `Sign in to unlock the four auxillaries, then keep ${AUXILLARIES_LIST_LABEL} in one contained auxillary read.`;
}
