export const TERMINAL_UX_BROWSER_PROOF_LANDMARKS = [
  {
    id: 'terminalMain',
    label: 'Terminal cockpit main landmark',
    selector: '#terminalMain',
    semantic: 'main',
  },
  {
    id: 'terminalTransactionWorkspace',
    label: 'Selected transaction workspace region',
    selector: '#terminalTransactionWorkspace',
    semantic: 'region',
  },
  {
    id: 'terminalSelectedActivityDetail',
    label: 'Selected activity detail region',
    selector: '[data-testid="terminal-selected-activity-detail"]',
    semantic: 'region',
  },
] as const;

export const TERMINAL_UX_BROWSER_PROOF_VIEWPORTS = [
  { id: 'phone', width: 390, height: 844 },
  { id: 'tablet', width: 768, height: 1024 },
  { id: 'laptop', width: 1280, height: 900 },
  { id: 'widescreen', width: 1440, height: 900 },
] as const;

export const TERMINAL_UX_BROWSER_PROOF_STATES = [
  {
    id: 'loading',
    testId: 'terminal-workspace-loading-state',
    semantic: 'status',
  },
  {
    id: 'empty',
    testId: 'terminal-workspace-empty-state',
    semantic: 'status',
  },
  {
    id: 'failed',
    testId: 'terminal-workspace-error-state',
    semantic: 'alert',
  },
  {
    id: 'blocked',
    testId: 'terminal-detail-section-controls',
    semantic: 'disabled-action',
  },
  {
    id: 'source-safe-preview',
    testId: 'terminal-selected-activity-hero',
    semantic: 'source-safe-low-detail',
  },
] as const;

export const TERMINAL_UX_BROWSER_PROOF_ROUTE_CHECKS = [
  {
    id: 'default-terminal',
    path: '/terminal',
    expectation: 'named cockpit, selected transaction workspace, selected result digest',
  },
  {
    id: 'activity-detail',
    path: '/terminal?transactionId=mock-run-branch-remediation&transactionDetail=activity',
    expectation: 'source-safe selected detail and execution stream',
  },
  {
    id: 'blocked-console',
    path: '/terminal?transactionId=mock-run-branch-remediation&transactionDetail=console',
    expectation: 'Console detail stays blocked in mock review posture',
  },
] as const;

export const TERMINAL_UX_BROWSER_PROOF_EVIDENCE_FILES = [
  'uapi/tests/terminalUxBrowserProof.test.tsx',
  'uapi/tests/e2e/commercial-mvp.terminal-ux.spec.ts',
  'scripts/check-v29-gate9-terminal-ux-browser-proof.mjs',
  '.github/workflows/bitcode-gate-quality.yml',
] as const;

export const TERMINAL_UX_BROWSER_PROOF_CONTRACT = {
  gate: 'V29 Gate 9: Terminal UX Quality And Browser Proof',
  landmarks: TERMINAL_UX_BROWSER_PROOF_LANDMARKS,
  viewports: TERMINAL_UX_BROWSER_PROOF_VIEWPORTS,
  states: TERMINAL_UX_BROWSER_PROOF_STATES,
  routeChecks: TERMINAL_UX_BROWSER_PROOF_ROUTE_CHECKS,
  evidenceFiles: TERMINAL_UX_BROWSER_PROOF_EVIDENCE_FILES,
} as const;

export function summarizeTerminalUxBrowserProofContract() {
  return {
    gate: TERMINAL_UX_BROWSER_PROOF_CONTRACT.gate,
    landmarkCount: TERMINAL_UX_BROWSER_PROOF_LANDMARKS.length,
    viewportCount: TERMINAL_UX_BROWSER_PROOF_VIEWPORTS.length,
    stateCount: TERMINAL_UX_BROWSER_PROOF_STATES.length,
    routeCheckCount: TERMINAL_UX_BROWSER_PROOF_ROUTE_CHECKS.length,
    evidenceFileCount: TERMINAL_UX_BROWSER_PROOF_EVIDENCE_FILES.length,
  };
}
