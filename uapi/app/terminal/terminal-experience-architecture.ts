'use client';

export const TERMINAL_EXPERIENCES = [
  {
    id: 'terminal-activity',
    label: 'Bitcode Terminal',
    badge: 'operator surface',
    description:
      'The Give and Need operator surface: recent Terminal activity rows open into AssetPack results, proofs, and history without replacing the Exchange market-wide activity view.',
    targetId: 'terminalTransactionWorkspace',
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
      'The dedicated Bitcode auxillary space for Wallet, Externals, Profile, Interfaces, and the rest of the connection, wallet, and interface-default surface.',
    targetId: 'auxillaries',
  },
] as const;

export const TERMINAL_ACTIONS = [
  {
    id: 'give',
    label: 'Give',
    badge: 'repo supply',
    description:
      'Contribute searchable supply into Bitcode so a future Need can satisfy against it, even where the immediate return is deferred, thin, or absent.',
    targetId: 'terminalSupplySelection',
  },
  {
    id: 'need',
    label: 'Need',
    badge: 'measured demand',
    description:
      'Frame scenario demand, measured need, and fit pressure so Bitcode can verify, satisfy, settle, and prove against it.',
    targetId: 'terminalNeedScenarios',
  },
] as const;

export const ACTIVITY_DETAIL_SECTIONS = [
  {
    id: 'transactions',
    label: 'Bitcode activity results',
    badge: 'activity',
    description:
      'Search, filter, and inspect recent Terminal activity without breaking the selected result read.',
    targetId: 'terminalTransactionWorkspace',
  },
  {
    id: 'shippables',
    label: 'Shippables',
    badge: 'materialized output',
    description:
      'Read Finish-delivered pull-request Shippables, AssetPack evidence, and artifact bundles inside the selected activity context.',
    targetId: 'terminalTransactionShippables',
  },
  {
    id: 'proofs',
    label: 'Proofs',
    badge: 'closure',
    description:
      'Keep verification, settlement proof, and bounded disclosure inside the same consequence chain as the selected activity.',
    targetId: 'terminalTransactionProofs',
  },
  {
    id: 'history',
    label: 'History',
    badge: 'ledger',
    description:
      'Retain run history, ledger state, policy metadata, and execution accounting as first-class read surfaces in the same window.',
    targetId: 'terminalTransactionHistory',
  },
] as const;

export const TERMINAL_MVP_SURFACE_MAP = [
  {
    id: 'activity',
    label: 'Activity',
    role: 'terminal-operator-activity-surface',
    routeSurface: '/terminal',
    targetId: 'terminalTransactionWorkspace',
    requiredPosture:
      'Focused searchable, filterable, live-updating Terminal activity table for recent Give, Need, proof, closure, and selected result reading.',
    implementedBy: [
      'uapi/app/terminal/TerminalTransactionWorkspace.tsx',
      'uapi/app/terminal/TerminalTransactionsTable.tsx',
      'uapi/app/terminal/terminal-transactions.ts',
      'uapi/app/terminal/terminal-transaction-query.ts',
      'uapi/app/terminal/terminal-activity-history.ts',
    ],
  },
  {
    id: 'transactions',
    label: 'Transactions',
    role: 'bitcode-write-space',
    routeSurface: '/terminal',
    targetId: 'terminalCommandDeck',
    requiredPosture:
      'Write-space for give, need, need measurement, transaction creation, deposit, branch, and closure operations.',
    implementedBy: [
      'uapi/app/terminal/TerminalCommandDeck.tsx',
      'uapi/app/terminal/TerminalGiveNeedWorkbench.tsx',
      'uapi/app/terminal/TerminalDepositComposer.tsx',
      'uapi/app/terminal/TerminalClosureControlDeck.tsx',
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
    routeSurface: '/terminal?auxillary-open-to=wallet',
    targetId: 'auxillaries',
    requiredPosture:
      'Non-duplicative settings, preferences, connections, identity, BTC fee liquidity, and non-fungible $BTD read-right surfaces around the network core.',
    implementedBy: [
      'uapi/app/auxillaries/components/AuxillariesExternalsPane.tsx',
      'uapi/app/auxillaries/components/AuxillariesInterfacesPane.tsx',
      'uapi/app/auxillaries/components/AuxillariesProfilePane.tsx',
      'uapi/app/auxillaries/components/AuxillariesWalletPane.tsx',
      'uapi/app/api/auxillaries/data/route.ts',
    ],
  },
] as const;

export const CORE_PANEL_EXPERIENCE: Record<string, (typeof TERMINAL_EXPERIENCES)[number]['id']> = {
  panelOperatingPicture: 'terminal-activity',
  panelDepositing: 'terminal-activity',
  panelNeeding: 'terminal-activity',
  panelFit: 'terminal-activity',
};

export const CORE_PANEL_ACTION: Record<string, (typeof TERMINAL_ACTIONS)[number]['id'] | null> = {
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

export function getTerminalExperience(id: (typeof TERMINAL_EXPERIENCES)[number]['id']) {
  return TERMINAL_EXPERIENCES.find((experience) => experience.id === id) || null;
}

export function getTerminalAction(id: (typeof TERMINAL_ACTIONS)[number]['id']) {
  return TERMINAL_ACTIONS.find((action) => action.id === id) || null;
}

export function getActivityDetailSection(id: (typeof ACTIVITY_DETAIL_SECTIONS)[number]['id']) {
  return ACTIVITY_DETAIL_SECTIONS.find((substructure) => substructure.id === id) || null;
}

export function getTerminalMvpSurface(
  id: (typeof TERMINAL_MVP_SURFACE_MAP)[number]['id'],
) {
  return TERMINAL_MVP_SURFACE_MAP.find((surface) => surface.id === id) || null;
}
