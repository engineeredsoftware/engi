'use client';

export const APPLICATION_EXPERIENCES = [
  {
    id: 'terminal-activity',
    label: 'Bitcode Terminal',
    badge: 'operator surface',
    description:
      'The Give and Need operator surface: recent Terminal activity rows open into AssetPack results, proofs, and history without replacing the Exchange master-detail view.',
    targetId: 'applicationTransactionWorkspace',
  },
  {
    id: 'conversations',
    label: 'Conversations',
    badge: 'dedicated mode',
    description:
      'The dedicated natural-language mode for writing, coordination, and tool-assisted follow-through without losing the current Bitcode activity context.',
    targetId: 'conversations',
  },
  {
    id: 'auxillaries',
    label: 'Auxillaries',
    badge: 'dedicated mode',
    description:
      'The dedicated Bitcode auxillary space for Connects, Interfaces, Profile, $BTD, and the rest of the connection, wallet, and interface-default surface.',
    targetId: 'auxillaries',
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

export const ACTIVITY_DETAIL_SECTIONS = [
  {
    id: 'transactions',
    label: 'Bitcode activity results',
    badge: 'activity',
    description:
      'Search, filter, and inspect recent Terminal activity without breaking the selected result read.',
    targetId: 'applicationTransactionWorkspace',
  },
  {
    id: 'shippables',
    label: 'Shippables',
    badge: 'materialized output',
    description:
      'Read Finish-delivered pull-request Shippables, AssetPack evidence, and artifact bundles inside the selected activity context.',
    targetId: 'applicationTransactionShippables',
  },
  {
    id: 'proofs',
    label: 'Proofs',
    badge: 'closure',
    description:
      'Keep verification, settlement proof, and bounded disclosure inside the same consequence chain as the selected activity.',
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

export const SIXTH_GATE_MVP_APPLICATION_MAP = [
  {
    id: 'activity',
    label: 'Activity',
    role: 'terminal-operator-activity-surface',
    routeSurface: '/application',
    targetId: 'applicationTransactionWorkspace',
    requiredPosture:
      'Focused searchable, filterable, live-updating Terminal activity table for recent Give, Need, proof, closure, and selected result reading.',
    implementedBy: [
      'uapi/app/application/ApplicationTransactionWorkspace.tsx',
      'uapi/app/application/ApplicationTransactionsTable.tsx',
      'uapi/app/application/application-transactions.ts',
      'uapi/app/application/application-transaction-query.ts',
      'uapi/app/application/application-activity-history.ts',
    ],
  },
  {
    id: 'transactions',
    label: 'Transactions',
    role: 'bitcode-write-space',
    routeSurface: '/application',
    targetId: 'applicationCommandDeck',
    requiredPosture:
      'Write-space for give, need, need measurement, transaction creation, deposit, branch, and closure operations.',
    implementedBy: [
      'uapi/app/application/ApplicationCommandDeck.tsx',
      'uapi/app/application/ApplicationGiveNeedWorkbench.tsx',
      'uapi/app/application/ApplicationDepositComposer.tsx',
      'uapi/app/application/ApplicationClosureControlDeck.tsx',
      'uapi/app/api/need-review/route.ts',
      'uapi/app/api/make-bitcode-branch/route.ts',
    ],
  },
  {
    id: 'conversations',
    label: 'Conversations',
    role: 'chatgpt-style-read-write-interface',
    routeSurface: '/conversations',
    targetId: 'conversations',
    requiredPosture:
      'Rich ChatGPT-style Bitcode read/write surface that is popup-capable, fullscreen-capable, and aligned to connected-interface tool registration.',
    implementedBy: [
      'uapi/app/conversations/ConversationsRouteClient.tsx',
      'uapi/app/conversations/components/ConversationsOverlay.tsx',
      'uapi/app/conversations/components/ConversationsFullscreenControls.tsx',
      'packages/chatgptapp/src/server.ts',
      'packages/chatgptapp/src/tools.ts',
    ],
  },
  {
    id: 'auxillaries',
    label: 'Auxillaries',
    role: 'network-adjacent-readiness-controls',
    routeSurface: '/auxillaries',
    targetId: 'auxillaries',
    requiredPosture:
      'Non-duplicative settings, preferences, connections, identity, BTC fee liquidity, and non-fungible $BTD read-right surfaces around the network core.',
    implementedBy: [
      'uapi/app/auxillaries/components/AuxillariesConnectsPane.tsx',
      'uapi/app/auxillaries/components/AuxillariesInterfacesPane.tsx',
      'uapi/app/auxillaries/components/AuxillariesProfilePane.tsx',
      'uapi/app/auxillaries/components/AuxillariesBTDPane.tsx',
      'uapi/app/api/auxillaries/data/route.ts',
    ],
  },
] as const;

export const CORE_PANEL_EXPERIENCE: Record<string, (typeof APPLICATION_EXPERIENCES)[number]['id']> = {
  panelOperatingPicture: 'terminal-activity',
  panelDepositing: 'terminal-activity',
  panelNeeding: 'terminal-activity',
  panelFit: 'terminal-activity',
};

export const CORE_PANEL_ACTION: Record<string, (typeof APPLICATION_ACTIONS)[number]['id'] | null> = {
  panelOperatingPicture: null,
  panelDepositing: 'give',
  panelNeeding: 'need',
  panelFit: 'need',
};

export const CLOSURE_PANEL_SUBSTRUCTURE: Record<
  string,
  (typeof ACTIVITY_DETAIL_SECTIONS)[number]['id'] | null
> = {
  panelEvaluations: 'proofs',
  panelBranchArtifacts: 'shippables',
  panelSettlement: 'proofs',
  panelLedger: 'history',
};

export function getApplicationExperience(id: (typeof APPLICATION_EXPERIENCES)[number]['id']) {
  return APPLICATION_EXPERIENCES.find((experience) => experience.id === id) || null;
}

export function getApplicationAction(id: (typeof APPLICATION_ACTIONS)[number]['id']) {
  return APPLICATION_ACTIONS.find((action) => action.id === id) || null;
}

export function getActivityDetailSection(id: (typeof ACTIVITY_DETAIL_SECTIONS)[number]['id']) {
  return ACTIVITY_DETAIL_SECTIONS.find((substructure) => substructure.id === id) || null;
}

export function getSixthGateMvpApplicationSurface(
  id: (typeof SIXTH_GATE_MVP_APPLICATION_MAP)[number]['id'],
) {
  return SIXTH_GATE_MVP_APPLICATION_MAP.find((surface) => surface.id === id) || null;
}
