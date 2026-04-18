import type {
  ApplicationClosureHistoryEntry,
  ApplicationClosurePanel,
  ApplicationClosureProofFamily,
  ApplicationClosureState,
} from './application-closure-state';
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
    verification: ApplicationClosurePanel | null;
    branch: ApplicationClosurePanel | null;
    settlement: ApplicationClosurePanel | null;
    ledger: ApplicationClosurePanel | null;
  };
};

export function countApplicationTransactionDeliverableSurfaces(detail: ApplicationRunDetailSnapshot | null) {
  const deliverables = detail?.deliverables;
  if (!deliverables) return 0;

  let count = 0;
  if (deliverables.pullRequest) count += 1;
  count += deliverables.pullRequestReviews?.length || 0;
  count += deliverables.issues?.length || 0;
  count += deliverables.comments?.length || 0;
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
  const deliverableSurfaceCount = countApplicationTransactionDeliverableSurfaces(detail) || selectedRun.itemCount || 0;

  return [
    { label: 'Deliverable surfaces', value: formatNumber(deliverableSurfaceCount) },
    { label: 'History items', value: formatNumber(detail?.historyItemCount) },
    { label: 'Event count', value: formatNumber(detail?.eventCount) },
    { label: 'Proof posture', value: detail?.proofStatus || 'closure state in flight' },
  ];
}

export function buildApplicationTransactionIdentityRows(
  selectedRun: WorkspaceRun,
  detail: ApplicationRunDetailSnapshot | null,
): ApplicationTransactionDetailRow[] {
  const rows: ApplicationTransactionDetailRow[] = [
    { label: 'Transaction id', value: selectedRun.id },
  ];

  if (detail?.repoSnapshot) {
    rows.push(
      { label: 'Repository', value: `${detail.repoSnapshot.org}/${detail.repoSnapshot.repo}` },
      { label: 'Branch', value: detail.repoSnapshot.branch || 'n/a' },
      { label: 'Commit', value: detail.repoSnapshot.commit || 'n/a' },
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
      value: formatNumber(detail?.processingStats.credits, { maximumFractionDigits: 1 }),
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
      canonLabel: closureState?.canonLabel || null,
      processingStats: detail?.processingStats || null,
      rows: buildApplicationTransactionClosureRows(detail),
      settlementMetrics: closureFollowThrough.settlementMetrics,
      branchArtifacts: closureFollowThrough.branchArtifacts,
      proofFamilies: closureFollowThrough.proofFamilies,
      recentHistory: closureFollowThrough.recentHistory,
      verification: closureState?.verification || null,
      branch: closureState?.branch || null,
      settlement: closureState?.settlement || null,
      ledger: closureState?.ledger || null,
    },
  };
}
