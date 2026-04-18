import type { ApplicationClosureState } from './application-closure-state';
import type { ApplicationCommandState } from './application-command-state';

export type ApplicationClosureControlState = {
  shellReady: boolean;
  status: string;
  statusTone: 'ready' | 'running' | 'settled' | 'attention';
  branchMode: string;
  scenario: string;
  flowGuideDetail: string;
  primaryActionLabel: string;
  primaryActionSummary: string;
  hasClosureArtifacts: boolean;
  hasSettlementBundle: boolean;
  proofFamilyCount: string;
  creditedAssetCount: string;
  visibleArtifactCount: string;
  bundleId: string;
};

function stringValue(value: string | null | undefined, fallback = '—') {
  const resolved = String(value || '').trim();
  return resolved || fallback;
}

function metricValue(panel: ApplicationClosureState['branch'] | ApplicationClosureState['settlement'], label: string) {
  return panel.metrics.find((entry) => entry.label === label)?.value || '0';
}

function rowValue(panel: ApplicationClosureState['settlement'] | ApplicationClosureState['branch'], label: string) {
  return panel.rows.find((entry) => entry.label === label)?.value || '—';
}

export function normalizeApplicationClosureControlState(
  commandState: ApplicationCommandState | null,
  closureState: ApplicationClosureState | null,
): ApplicationClosureControlState {
  const status = commandState?.status || 'Workspace controls are syncing.';
  const statusLower = status.toLowerCase();
  const flowGuideDetail =
    commandState && commandState.flowGuideStepCount > 0
      ? `${commandState.flowGuideOpen ? 'drafting' : 'saved'} · step ${Math.min(commandState.flowGuideStepIndex + 1, commandState.flowGuideStepCount)} of ${commandState.flowGuideStepCount}`
      : 'ready';

  const hasClosureArtifacts = Boolean(closureState?.branch.chips.length);
  const bundleId = closureState ? rowValue(closureState.settlement, 'Bundle') : '—';
  const hasSettlementBundle = bundleId !== '—';
  const proofFamilyCount = closureState ? rowValue(closureState.settlement, 'Proof families') : '0';
  const creditedAssetCount = closureState ? metricValue(closureState.settlement, 'Credited assets') : '0';
  const visibleArtifactCount = closureState ? metricValue(closureState.branch, 'Visible artifacts') : '0';

  let statusTone: ApplicationClosureControlState['statusTone'] = 'ready';
  if (!commandState?.shellReady) {
    statusTone = 'attention';
  } else if (
    statusLower.includes('measuring')
    || statusLower.includes('staging')
    || statusLower.includes('settling')
    || statusLower.includes('loading')
    || statusLower.includes('syncing')
  ) {
    statusTone = 'running';
  } else if (hasSettlementBundle || Number(creditedAssetCount) > 0) {
    statusTone = 'settled';
  }

  const primaryActionLabel = hasClosureArtifacts ? 'Re-run closure' : 'Make Bitcode branch';
  const primaryActionSummary = hasSettlementBundle
    ? 'Re-run the closure path if the give/need state changed, or continue into proof and ledger review from the current bundle.'
    : 'Run the Bitcode closure path from verification through branch materialization, settlement, and proof.';

  return {
    shellReady: Boolean(commandState?.shellReady),
    status,
    statusTone,
    branchMode: commandState?.branchMode || 'patch',
    scenario: commandState?.scenario || '—',
    flowGuideDetail,
    primaryActionLabel,
    primaryActionSummary,
    hasClosureArtifacts,
    hasSettlementBundle,
    proofFamilyCount: stringValue(proofFamilyCount, '0'),
    creditedAssetCount: stringValue(creditedAssetCount, '0'),
    visibleArtifactCount: stringValue(visibleArtifactCount, '0'),
    bundleId: stringValue(bundleId),
  };
}
