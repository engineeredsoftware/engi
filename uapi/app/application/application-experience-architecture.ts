'use client';

export const APPLICATION_EXPERIENCES = [
  {
    id: 'master-detail',
    label: 'Master detail',
    badge: 'primary',
    description:
      'The central Bitcode operator workspace inside `/application`, carrying the give/need chain, runs, deliverables, proofs, and history.',
    targetId: 'bitcodeApplicationRoot',
  },
  {
    id: 'conversations',
    label: 'Conversations',
    badge: 'fullscreen',
    description:
      'The fullscreen chat workspace entered from `/application`, retaining tool usage, agentic continuity, and run attachment as first-class Bitcode behavior.',
    targetId: 'conversations',
  },
  {
    id: 'orbitals',
    label: 'Orbitals',
    badge: 'fullscreen',
    description:
      'The fullscreen settings workspace entered from `/application`, retaining the ringed overlay while owning account, connects, models, and credits.',
    targetId: 'orbitals',
  },
] as const;

export const APPLICATION_ACTIONS = [
  {
    id: 'give',
    label: 'Give',
    badge: 'repo supply',
    description:
      'Supply authenticated repo material, candidate assets, and deposit decisions into the Bitcode operating chain.',
    targetId: 'panelDepositing',
  },
  {
    id: 'need',
    label: 'Need',
    badge: 'measured demand',
    description:
      'Frame scenario demand, measured need, and fit pressure before verification, settlement, and proof closure.',
    targetId: 'panelNeeding',
  },
] as const;

export const CORE_PANEL_EXPERIENCE: Record<string, (typeof APPLICATION_EXPERIENCES)[number]['id']> = {
  panelOperatingPicture: 'master-detail',
  panelDepositing: 'master-detail',
  panelNeeding: 'master-detail',
  panelFit: 'master-detail',
};

export const CORE_PANEL_ACTION: Record<string, (typeof APPLICATION_ACTIONS)[number]['id'] | null> = {
  panelOperatingPicture: null,
  panelDepositing: 'give',
  panelNeeding: 'need',
  panelFit: 'need',
};

export function getApplicationExperience(id: (typeof APPLICATION_EXPERIENCES)[number]['id']) {
  return APPLICATION_EXPERIENCES.find((experience) => experience.id === id) || null;
}

export function getApplicationAction(id: (typeof APPLICATION_ACTIONS)[number]['id']) {
  return APPLICATION_ACTIONS.find((action) => action.id === id) || null;
}
