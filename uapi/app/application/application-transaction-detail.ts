import type {
  ApplicationClosureHistoryEntry,
  ApplicationClosurePanel,
  ApplicationClosureProofFamily,
  ApplicationClosureState,
} from './application-closure-state';
import type { ShippablesDoc } from '@/components/base/bitcode/execution/ShippablesDocPanel';
import type { ApplicationRunDetailSnapshot } from './application-transaction-detail-snapshot';
import type { WorkspaceRun } from './application-run-data';

export type ApplicationTransactionDetailRow = {
  label: string;
  value: string;
};

export type ApplicationTransactionClosureFollowThrough = {
  settlementMetrics: Array<{ label: string; value: string }>;
  branchArtifacts: string[];
  proofFamilies: ApplicationClosureProofFamily[];
  recentHistory: ApplicationClosureHistoryEntry[];
};

export type ApplicationTransactionClosurePayload = {
  transaction: {
    id: string;
    createdAt: string;
    proofStatus: string | null;
    closureFocus: string | null;
  };
  closure: {
    canonLabel: string | null;
    processingStats: ApplicationRunDetailSnapshot['processingStats'] | null;
    rows: ApplicationTransactionDetailRow[];
    settlementMetrics: ApplicationTransactionClosureFollowThrough['settlementMetrics'];
    branchArtifacts: ApplicationTransactionClosureFollowThrough['branchArtifacts'];
    proofFamilies: ApplicationTransactionClosureFollowThrough['proofFamilies'];
    recentHistory: ApplicationTransactionClosureFollowThrough['recentHistory'];
    needReview: ApplicationClosurePanel | null;
    verification: ApplicationClosurePanel | null;
    branch: ApplicationClosurePanel | null;
    settlement: ApplicationClosurePanel | null;
    ledger: ApplicationClosurePanel | null;
  };
};

export type ApplicationTransactionPersistedActivitySnapshot = {
  metrics: Array<{ label: string; value: string }>;
  rows: ApplicationTransactionDetailRow[];
  chips: string[];
  payload: unknown;
};

export function getApplicationTransactionWrittenAssets(
  detail: ApplicationRunDetailSnapshot | null,
): ShippablesDoc | null {
  return detail?.writtenAssets || detail?.deliverables || null;
}

export function getApplicationTransactionDeliveryMechanism(
  detail: ApplicationRunDetailSnapshot | null,
): ShippablesDoc | null {
  return detail?.shippables || detail?.deliveryMechanism || detail?.deliverables || getApplicationTransactionWrittenAssets(detail);
}

export function countApplicationTransactionShippableSurfaces(detail: ApplicationRunDetailSnapshot | null) {
  const shippables = getApplicationTransactionDeliveryMechanism(detail);
  if (!shippables) return 0;

  let count = 0;
  if (shippables.pullRequest) count += 1;
  count += shippables.pullRequestReviews?.length || 0;
  count += shippables.issues?.length || 0;
  count += shippables.comments?.length || 0;
  return count;
}

function formatNumber(value?: number | null, options?: Intl.NumberFormatOptions) {
  if (value === null || value === undefined || Number.isNaN(value)) return 'n/a';
  return new Intl.NumberFormat('en-US', options).format(value);
}

function formatUsd(value?: number | null) {
  if (value === null || value === undefined || Number.isNaN(value)) return 'n/a';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(value);
}

export function buildApplicationTransactionOverviewMetrics(
  selectedRun: WorkspaceRun,
  detail: ApplicationRunDetailSnapshot | null,
) {
  const shippableSurfaceCount = countApplicationTransactionShippableSurfaces(detail) || selectedRun.itemCount || 0;

  return [
    { label: 'Shippables', value: formatNumber(shippableSurfaceCount) },
    { label: 'History items', value: formatNumber(detail?.historyItemCount) },
    { label: 'Event count', value: formatNumber(detail?.eventCount) },
    { label: 'Proof posture', value: detail?.proofStatus || 'closure state in flight' },
  ];
}

function dedupeChips(chips: Array<string | null | undefined>) {
  return Array.from(new Set(chips.map((chip) => chip?.trim()).filter((chip): chip is string => Boolean(chip))));
}

export function buildApplicationTransactionPersistedActivitySnapshot(
  detail: ApplicationRunDetailSnapshot | null,
): ApplicationTransactionPersistedActivitySnapshot | null {
  const activityState = detail?.bitcodeActivityState;
  if (!activityState) return null;

  const workbench = activityState.giveWorkbench || activityState.fitWorkbench || null;
  const needMeasurement = activityState.needMeasurement || null;
  const supplySelection = activityState.supplySelection || null;
  const repositoryAnchor = activityState.repositoryAnchor || null;

  const metrics = [
    workbench ? { label: 'Projection', value: workbench.projectionPrincipal } : null,
    supplySelection ? { label: 'Selected refs', value: formatNumber(supplySelection.selectedCount) } : null,
    needMeasurement ? { label: 'Target kinds', value: formatNumber(needMeasurement.targetKindCount) } : null,
    needMeasurement ? { label: 'Closure criteria', value: formatNumber(needMeasurement.closureCriteriaCount) } : null,
    supplySelection ? { label: 'Filtered refs', value: formatNumber(supplySelection.filteredCount) } : null,
  ].filter((metric): metric is { label: string; value: string } => Boolean(metric));

  const rows = [
    repositoryAnchor?.repository
      ? { label: 'Repository anchor', value: repositoryAnchor.repository.fullName }
      : null,
    repositoryAnchor?.connection ? { label: 'Connection mode', value: repositoryAnchor.connection.mode } : null,
    workbench?.give?.summary ? { label: 'Give posture', value: workbench.give.summary } : null,
    workbench?.need?.summary ? { label: 'Need posture', value: workbench.need.summary } : null,
    workbench?.fit?.summary ? { label: 'Fit posture', value: workbench.fit.summary } : null,
    needMeasurement ? { label: 'Need scenario', value: needMeasurement.scenario.label } : null,
    needMeasurement ? { label: 'Need parser', value: needMeasurement.parserKind } : null,
    supplySelection ? { label: 'Auth session', value: supplySelection.authSessionLabel } : null,
    supplySelection?.searchTerm ? { label: 'Search filter', value: supplySelection.searchTerm } : null,
  ].filter((row): row is ApplicationTransactionDetailRow => Boolean(row));

  const chips = dedupeChips([
    ...(workbench?.give?.artifactKinds || []),
    ...(workbench?.need?.targetKinds || []),
    ...(workbench?.need?.closureCriteria || []),
    ...(supplySelection?.selectedEntries.map((entry) => entry.title) || []),
  ]);

  if (!metrics.length && !rows.length && !chips.length) return null;

  return {
    metrics,
    rows,
    chips,
    payload: {
      summary: detail?.summary || null,
      processingStats: detail?.processingStats || null,
      bitcodeActivityState: activityState,
    },
  };
}

export function buildApplicationTransactionIdentityRows(
  selectedRun: WorkspaceRun,
  detail: ApplicationRunDetailSnapshot | null,
): ApplicationTransactionDetailRow[] {
  const rows: ApplicationTransactionDetailRow[] = [
    { label: 'Activity id', value: selectedRun.id },
  ];
  const activityState = detail?.bitcodeActivityState;

  if (detail?.repoSnapshot) {
    rows.push(
      { label: 'Repository', value: `${detail.repoSnapshot.org}/${detail.repoSnapshot.repo}` },
      { label: 'Branch', value: detail.repoSnapshot.branch || 'n/a' },
      { label: 'Commit', value: detail.repoSnapshot.commit || 'n/a' },
    );
  } else if (activityState?.repositoryAnchor?.repository) {
    rows.push(
      { label: 'Repository', value: activityState.repositoryAnchor.repository.fullName },
      { label: 'Branch', value: activityState.repositoryAnchor.repository.defaultBranch || 'main' },
    );
  }

  if (activityState?.repositoryAnchor?.providerAccount) {
    rows.push({ label: 'Provider account', value: activityState.repositoryAnchor.providerAccount });
  }

  const workbench = activityState?.giveWorkbench || activityState?.fitWorkbench;
  if (workbench) {
    rows.push(
      { label: 'Projection', value: workbench.projectionPrincipal },
      { label: 'Scenario', value: workbench.scenarioLabel },
      { label: 'Profile', value: workbench.profileLabel },
    );
  }

  if (activityState?.needMeasurement) {
    rows.push(
      { label: 'Need parser', value: activityState.needMeasurement.parserKind },
      { label: 'Need scenario', value: activityState.needMeasurement.scenario.label },
    );
  }

  if (activityState?.supplySelection) {
    rows.push(
      { label: 'Auth session', value: activityState.supplySelection.authSessionLabel },
      {
        label: 'Selected refs',
        value: String(activityState.supplySelection.selectedCount),
      },
    );
  }

  return rows;
}

export function buildApplicationTransactionClosureRows(detail: ApplicationRunDetailSnapshot | null) {
  return [
    { label: 'Proof posture', value: detail?.proofStatus || 'closure state in flight' },
    { label: 'Closure focus', value: detail?.closureFocus || 'application consequence reading' },
    { label: 'Processing time', value: detail?.processingStats.time || 'n/a' },
    { label: 'Token total', value: formatNumber(detail?.processingStats.tokenTotal) },
    {
      label: 'BTD throughput',
      value: formatNumber(detail?.processingStats.btdUsed, { maximumFractionDigits: 1 }),
    },
    { label: 'Spend', value: formatUsd(detail?.processingStats.usdTotal) },
    {
      label: 'Latency',
      value: detail?.processingStats.averageLatencyMs ? `${formatNumber(detail.processingStats.averageLatencyMs)} ms` : 'n/a',
    },
  ];
}

export function buildApplicationTransactionClosureFollowThrough(
  closureState: ApplicationClosureState | null,
): ApplicationTransactionClosureFollowThrough {
  return {
    settlementMetrics: closureState?.settlement.metrics.slice(0, 4) || [],
    branchArtifacts: closureState?.branch.chips.slice(0, 6) || [],
    proofFamilies: closureState?.settlement.proofFamilies?.slice(0, 4) || [],
    recentHistory: closureState?.ledger.recentRuns?.slice(0, 4) || [],
  };
}

export function buildApplicationTransactionClosurePayload(
  selectedRun: WorkspaceRun,
  detail: ApplicationRunDetailSnapshot | null,
  closureState: ApplicationClosureState | null,
  closureFollowThrough: ApplicationTransactionClosureFollowThrough,
): ApplicationTransactionClosurePayload {
  return {
    transaction: {
      id: selectedRun.id,
      createdAt: selectedRun.created_at,
      proofStatus: detail?.proofStatus || selectedRun.proofStatus || null,
      closureFocus: detail?.closureFocus || selectedRun.closureFocus || null,
    },
    closure: {
      canonLabel: closureState?.canonLabel || detail?.closureFollowThrough?.canonLabel || null,
      processingStats: detail?.processingStats || null,
      rows: buildApplicationTransactionClosureRows(detail),
      settlementMetrics: closureFollowThrough.settlementMetrics,
      branchArtifacts: closureFollowThrough.branchArtifacts,
      proofFamilies: closureFollowThrough.proofFamilies,
      recentHistory: closureFollowThrough.recentHistory,
      needReview: closureState?.needReview || null,
      verification: closureState?.verification || null,
      branch: closureState?.branch || null,
      settlement: closureState?.settlement || null,
      ledger: closureState?.ledger || null,
    },
  };
}
