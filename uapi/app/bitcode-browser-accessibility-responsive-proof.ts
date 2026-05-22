export const BITCODE_BROWSER_ACCESSIBILITY_RESPONSIVE_PROOF_VIEWPORTS = [
  { id: 'phone', width: 390, height: 844 },
  { id: 'tablet', width: 768, height: 1024 },
  { id: 'laptop', width: 1280, height: 900 },
  { id: 'widescreen', width: 1920, height: 1080 },
] as const;

export const BITCODE_BROWSER_ACCESSIBILITY_RESPONSIVE_PROOF_ASSERTIONS = [
  'keyboard-path',
  'landmark-labels',
  'focus-state',
  'status-announcements',
  'contrast-sensitive-tokens',
  'reduced-motion',
  'overflow-wrapping',
  'deterministic-visual-semantics',
] as const;

export const BITCODE_BROWSER_ACCESSIBILITY_RESPONSIVE_PROOF_SURFACES = [
  {
    id: 'terminal',
    label: 'Bitcode Terminal',
    routes: [
      { id: 'default', path: '/terminal', state: 'default' },
      {
        id: 'guided',
        path: '/terminal',
        state: 'guided',
        selector: '[data-testid="terminal-transaction-workspace"]',
      },
      {
        id: 'detail',
        path: '/terminal?transactionId=mock-run-branch-remediation&transactionDetail=activity',
        state: 'detail',
        selector: '[data-testid="terminal-selected-activity-detail"]',
      },
    ],
    landmarks: ['main', 'region', 'group'],
    evidenceFiles: [
      'uapi/tests/terminalUxBrowserProof.test.tsx',
      'uapi/tests/e2e/commercial-mvp.terminal-ux.spec.ts',
      'uapi/tests/e2e/bitcode-browser-accessibility-responsive-proof.spec.ts',
    ],
  },
  {
    id: 'auxillaries',
    label: 'Bitcode Auxillaries',
    routes: [
      { id: 'default', path: '/terminal?auxillary-open-to=wallet', state: 'default' },
      {
        id: 'guided',
        path: '/terminal?auxillary-open-to=profile',
        state: 'guided',
        selector: '[data-testid="auxillaries-pane-navigation"]',
      },
      {
        id: 'detail',
        path: '/terminal?auxillary-open-to=interfaces',
        state: 'detail',
        selector: '[data-testid="auxillaries-active-pane-region"]',
      },
    ],
    landmarks: ['main', 'navigation', 'region'],
    evidenceFiles: [
      'uapi/tests/auxillariesContent.access.test.tsx',
      'uapi/tests/e2e/commercial-mvp.auxillaries.spec.ts',
      'uapi/tests/e2e/bitcode-browser-accessibility-responsive-proof.spec.ts',
    ],
  },
] as const;

export const BITCODE_BROWSER_ACCESSIBILITY_RESPONSIVE_PROOF_VISUAL_STRATEGY = [
  'semantic-layout-metrics',
  'stable-route-state-contracts',
  'stateful-accessibility-roles',
  'no-screenshot-only-approval',
] as const;

export const BITCODE_BROWSER_ACCESSIBILITY_RESPONSIVE_PROOF_CONTRACT = {
  surfaces: BITCODE_BROWSER_ACCESSIBILITY_RESPONSIVE_PROOF_SURFACES,
  viewports: BITCODE_BROWSER_ACCESSIBILITY_RESPONSIVE_PROOF_VIEWPORTS,
  assertions: BITCODE_BROWSER_ACCESSIBILITY_RESPONSIVE_PROOF_ASSERTIONS,
  visualStrategy: BITCODE_BROWSER_ACCESSIBILITY_RESPONSIVE_PROOF_VISUAL_STRATEGY,
  sourceSafety: {
    sourceSafe: true,
    protectedSourceVisible: false,
    containsSecret: false,
    containsProtectedSource: false,
  },
} as const;

export function summarizeBitcodeBrowserAccessibilityResponsiveProofContract() {
  const routeCount = BITCODE_BROWSER_ACCESSIBILITY_RESPONSIVE_PROOF_SURFACES.reduce(
    (total, surface) => total + surface.routes.length,
    0,
  );
  const evidenceFileCount = new Set(
    BITCODE_BROWSER_ACCESSIBILITY_RESPONSIVE_PROOF_SURFACES.flatMap(
      (surface) => surface.evidenceFiles,
    ),
  ).size;

  return {
    surfaceCount: BITCODE_BROWSER_ACCESSIBILITY_RESPONSIVE_PROOF_SURFACES.length,
    routeCount,
    viewportCount: BITCODE_BROWSER_ACCESSIBILITY_RESPONSIVE_PROOF_VIEWPORTS.length,
    assertionCount: BITCODE_BROWSER_ACCESSIBILITY_RESPONSIVE_PROOF_ASSERTIONS.length,
    visualStrategyCount: BITCODE_BROWSER_ACCESSIBILITY_RESPONSIVE_PROOF_VISUAL_STRATEGY.length,
    evidenceFileCount,
    sourceSafe: BITCODE_BROWSER_ACCESSIBILITY_RESPONSIVE_PROOF_CONTRACT.sourceSafety.sourceSafe,
  };
}
