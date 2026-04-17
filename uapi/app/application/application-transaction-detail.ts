import type { ApplicationRunDetailSnapshot } from './application-run-detail';
import type { WorkspaceRun } from './application-run-data';

export type ApplicationTransactionDetailRow = {
  label: string;
  value: string;
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
      label: 'Credits',
      value: formatNumber(detail?.processingStats.credits, { maximumFractionDigits: 1 }),
    },
    { label: 'Spend', value: formatUsd(detail?.processingStats.usdTotal) },
    {
      label: 'Latency',
      value: detail?.processingStats.averageLatencyMs ? `${formatNumber(detail.processingStats.averageLatencyMs)} ms` : 'n/a',
    },
  ];
}
