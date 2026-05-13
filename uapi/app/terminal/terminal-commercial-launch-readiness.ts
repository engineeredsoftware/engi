export const TERMINAL_COMMERCIAL_TESTNET_LAUNCH_MAP = [
  {
    id: 'testnet-first-launch-boundary',
    label: 'Testnet-first launch boundary',
    launchAxis: 'testnet-boundary',
    requiredPosture:
      'Commercial launch posture is credible for initial operators while settlement, wallet signing, and Exchange expansion remain explicitly testnet-first.',
    sourceBasis: [
      'BITCODE_SPEC_V26.md',
      'BITCODE_SPEC_V26_PARITY_MATRIX.md',
      'uapi/app/terminal/TerminalLiveSummaryStrip.tsx',
      'uapi/app/terminal/bitcode-transaction-readiness.ts',
    ],
  },
  {
    id: 'commercial-product-story',
    label: 'Commercial product story',
    launchAxis: 'product-legibility',
    requiredPosture:
      'Exchange, Terminal, Protocol, Proofs, API, MCP, and admitted app surfaces read as one commercial Bitcode product rather than adjacent demonstrations.',
    sourceBasis: [
      'uapi/app/terminal/terminal-experience-architecture.ts',
      'uapi/app/terminal/TerminalTransactionWorkspace.tsx',
      'protocol-demonstration/src/bitcode-demo.js',
      'packages/chatgptapp/src/server.ts',
      'packages/executions-mcp/src/mcp-server/src/tools/pipeline-tools.ts',
    ],
  },
  {
    id: 'wallet-btc-btd-readiness',
    label: 'Wallet, BTC, and BTD readiness',
    launchAxis: 'wallet-settlement',
    requiredPosture:
      'Wallet posture exposes BTC fee liquidity and non-fungible $BTD share/read-right holdings while refusing saved-signer-only settlement as launch-ready.',
    sourceBasis: [
      'uapi/app/auxillaries/components/AuxillariesWalletPane.tsx',
      'uapi/app/api/auxillaries/data/route.ts',
      'uapi/app/terminal/bitcode-transaction-route-readiness.ts',
      'uapi/tests/auxillariesWalletPane.test.tsx',
      'uapi/tests/api/transactionWriteReadinessRoutes.test.ts',
    ],
  },
  {
    id: 'repository-scope-and-github-integration',
    label: 'Repository scope and GitHub integration',
    launchAxis: 'repository-scope',
    requiredPosture:
      'Repository inventory, GitHub reconnect truth, and provider-scoped write admission are shared by Terminal, Exchange APIs, and connected interfaces.',
    sourceBasis: [
      'uapi/app/terminal/TerminalRepositoryContextPanel.tsx',
      'uapi/app/api/vcs/[provider]/repositories/route.ts',
      'uapi/app/api/auxillaries/data/route.ts',
      'packages/executions-mcp/src/mcp-server/src/__tests__/unit/pipeline-ingress-contract.test.ts',
      'packages/chatgptapp/src/__tests__/tools.test.ts',
    ],
  },
  {
    id: 'proof-state-reread-and-operator-flow',
    label: 'Proof and state reread operator flow',
    launchAxis: 'proof-state-reread',
    requiredPosture:
      'Activity, transaction detail, proof state, history, settlement follow-through, and route reread stay in one repeated operator loop after writes.',
    sourceBasis: [
      'uapi/app/terminal/terminal-activity-history.ts',
      'uapi/app/terminal/terminal-transaction-detail-snapshot.ts',
      'uapi/app/api/state/route.ts',
      'uapi/tests/api/executionsHistoryWriteReadParity.test.ts',
      'uapi/tests/api/activityRoute.test.ts',
    ],
  },
  {
    id: 'exchange-terminal-protocol-interface-alignment',
    label: 'Exchange, Terminal, Protocol alignment',
    launchAxis: 'interface-alignment',
    requiredPosture:
      'Need review, source-to-shares fit, AssetPack execution, settlement evidence, and Terminal presentation align from deterministic Protocol into commercial Exchange and Terminal surfaces.',
    sourceBasis: [
      'protocol-demonstration/test/v26-need-review-source-to-shares.test.js',
      'uapi/tests/api/needReviewProtocolParity.test.ts',
      'packages/pipelines/asset-pack/src/postprocess.ts',
      'packages/pipelines/asset-pack/src/agents/finish-delivery-agents.ts',
      'uapi/tests/e2e/terminal.flow.spec.ts',
    ],
  },
  {
    id: 'mcp-and-chatgpt-app-connected-interfaces',
    label: 'MCP and ChatGPT App connected interfaces',
    launchAxis: 'connected-interfaces',
    requiredPosture:
      'MCP and ChatGPT App surfaces operate as connected-interface ingress and confirmed write carriers for Bitcode, not as parallel Exchange owners.',
    sourceBasis: [
      'packages/executions-mcp/src/mcp-server/src/tools/pipeline-tools.ts',
      'packages/executions-mcp/src/mcp-server/src/types/index.ts',
      'packages/chatgptapp/src/server.ts',
      'packages/chatgptapp/src/tools.ts',
      'packages/chatgptapp/src/__tests__/tools.test.ts',
    ],
  },
  {
    id: 'non-bitcode-fallback-explanations-retired',
    label: 'Non-Bitcode fallback explanations retired',
    launchAxis: 'reform-completion',
    requiredPosture:
      'Core user journeys explain Bitcode Need, source-to-shares, AssetPack, Shippable, BTC fee, and $BTD read-right behavior directly without non-Bitcode compatibility fallback semantics.',
    sourceBasis: [
      'BITCODE_SPEC_V26_DELTA.md',
      'BITCODE_SPEC_V26_PARITY_MATRIX.md',
      'uapi/app/terminal/terminal-experience-architecture.ts',
      'protocol-demonstration/V26_PROOF_SURFACES.md',
      'protocol-demonstration/test/v26-active-product-naming.test.js',
    ],
  },
] as const;

export function getTerminalCommercialTestnetLaunchSurface(
  id: (typeof TERMINAL_COMMERCIAL_TESTNET_LAUNCH_MAP)[number]['id'],
) {
  return TERMINAL_COMMERCIAL_TESTNET_LAUNCH_MAP.find((surface) => surface.id === id) || null;
}
