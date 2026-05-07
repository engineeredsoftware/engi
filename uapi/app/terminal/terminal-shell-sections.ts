export const TERMINAL_SHELL_SECTIONS = [
  { id: 'panelOperatingPicture', label: 'Operating picture' },
  { id: 'panelDepositing', label: 'Depositing' },
  { id: 'panelNeeding', label: 'Needing' },
  { id: 'panelFit', label: 'Fit' },
  { id: 'panelEvaluations', label: 'Verification' },
  { id: 'panelBranchArtifacts', label: 'Artifacts' },
  { id: 'panelSettlement', label: 'Settlement' },
  { id: 'panelLedger', label: 'Ledger' },
] as const;

export type TerminalShellSectionId = (typeof TERMINAL_SHELL_SECTIONS)[number]['id'];
