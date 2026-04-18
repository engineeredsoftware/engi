'use client';

export const APPLICATION_EXPERIENCES = [
  {
    id: 'master-detail',
    label: 'Master detail',
    badge: 'primary',
    description:
      'The central Bitcode ledger window: a searchable transactions table with the selected transaction opened into deliverables, proofs, and history.',
    targetId: 'applicationTransactionWorkspace',
  },
  {
    id: 'conversations',
    label: 'Conversations',
    badge: 'fullscreen',
    description:
      'The fullscreen natural-language workspace for writing, coordination, and tool-assisted follow-through without losing the current transaction context.',
    targetId: 'conversations',
  },
  {
    id: 'orbitals',
    label: 'Orbitals',
    badge: 'fullscreen',
    description:
      'The fullscreen Bitcode orbital space for account, connects, models, credits, and the rest of the configuration surface.',
    targetId: 'orbitals',
  },
] as const;

export const APPLICATION_ACTIONS = [
  {
    id: 'give',
    label: 'Give',
    badge: 'repo supply',
    description:
      'Contribute searchable supply into Bitcode so a future Need can satisfy against it, even where the immediate return is deferred, thin, or absent.',
    targetId: 'applicationSupplySelection',
  },
  {
    id: 'need',
    label: 'Need',
    badge: 'measured demand',
    description:
      'Frame scenario demand, measured need, and fit pressure so Bitcode can verify, satisfy, settle, and prove against it.',
    targetId: 'applicationNeedScenarios',
  },
] as const;

export const MASTER_DETAIL_SUBSTRUCTURES = [
  {
    id: 'transactions',
    label: 'Transactions',
    badge: 'master',
    description:
      'Search, filter, and inspect Bitcode transactions from one ledger window without breaking the selected detail read.',
    targetId: 'applicationTransactionWorkspace',
  },
  {
    id: 'deliverables',
    label: 'Deliverables',
    badge: 'materialized output',
    description:
      'Read pull requests, reviews, issues, comments, and artifact bundles inside the selected transaction context.',
    targetId: 'applicationTransactionDeliverables',
  },
  {
    id: 'proofs',
    label: 'Proofs',
    badge: 'closure',
    description:
      'Keep verification, settlement proof, and bounded disclosure inside the same consequence chain as the selected transaction.',
    targetId: 'applicationTransactionProofs',
  },
  {
    id: 'history',
    label: 'History',
    badge: 'ledger',
    description:
      'Retain run history, ledger state, policy metadata, and execution accounting as first-class read surfaces in the same window.',
    targetId: 'applicationTransactionHistory',
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

export const CLOSURE_PANEL_SUBSTRUCTURE: Record<
  string,
  (typeof MASTER_DETAIL_SUBSTRUCTURES)[number]['id'] | null
> = {
  panelEvaluations: 'proofs',
  panelBranchArtifacts: 'deliverables',
  panelSettlement: 'proofs',
  panelLedger: 'history',
};

export function getApplicationExperience(id: (typeof APPLICATION_EXPERIENCES)[number]['id']) {
  return APPLICATION_EXPERIENCES.find((experience) => experience.id === id) || null;
}

export function getApplicationAction(id: (typeof APPLICATION_ACTIONS)[number]['id']) {
  return APPLICATION_ACTIONS.find((action) => action.id === id) || null;
}

export function getMasterDetailSubstructure(id: (typeof MASTER_DETAIL_SUBSTRUCTURES)[number]['id']) {
  return MASTER_DETAIL_SUBSTRUCTURES.find((substructure) => substructure.id === id) || null;
}
