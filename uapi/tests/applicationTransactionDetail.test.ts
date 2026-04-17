import {
  buildApplicationTransactionClosureRows,
  buildApplicationTransactionIdentityRows,
  buildApplicationTransactionOverviewMetrics,
  countApplicationTransactionDeliverableSurfaces,
} from '@/app/application/application-transaction-detail';
import type { ApplicationRunDetailSnapshot } from '@/app/application/application-transaction-detail-snapshot';
import type { WorkspaceRun } from '@/app/application/application-run-data';

const selectedTransaction: WorkspaceRun = {
  id: 'tx-001',
  created_at: '2026-04-16T12:00:00.000Z',
  type: 'pipeline:deliverables',
  status: 'completed',
  summary: 'Selected transaction summary.',
  repository: 'bitcode/bitcode',
  branch: 'application/refit',
  itemCount: 4,
  tokenTotal: 1200,
  creditsTotal: 18.5,
  usdTotal: 0.84,
  averageLatencyMs: 850,
  proofStatus: 'bounded proof ready',
  closureFocus: 'deliverable bundle',
};

const detail: ApplicationRunDetailSnapshot = {
  summary: 'Normalized detail summary.',
  deliverables: {
    summary: 'Deliverable summary.',
    pullRequest: { title: 'PR', url: 'https://example.com/pr/1', number: 1 },
    comments: [{ title: 'Comment', url: 'https://example.com/comment/1', number: 1 }],
  },
  repoSnapshot: {
    org: 'bitcode',
    repo: 'bitcode',
    branch: 'main',
    commit: 'abc123',
  },
  processingStats: {
    time: '4m 12s',
    tokenTotal: 2200,
    credits: 24.5,
    usdTotal: 1.62,
    averageLatencyMs: 930,
  },
  proofStatus: 'proof witness ready',
  closureFocus: 'bounded disclosure',
  historyItemCount: 5,
  eventCount: 3,
};

describe('application-transaction-detail helpers', () => {
  it('counts transaction deliverable surfaces', () => {
    expect(countApplicationTransactionDeliverableSurfaces(detail)).toBe(2);
  });

  it('builds overview metrics from selected transaction and detail', () => {
    expect(buildApplicationTransactionOverviewMetrics(selectedTransaction, detail)).toEqual([
      { label: 'Deliverable surfaces', value: '2' },
      { label: 'History items', value: '5' },
      { label: 'Event count', value: '3' },
      { label: 'Proof posture', value: 'proof witness ready' },
    ]);
  });

  it('builds identity rows for the selected transaction', () => {
    expect(buildApplicationTransactionIdentityRows(selectedTransaction, detail)).toEqual([
      { label: 'Transaction id', value: 'tx-001' },
      { label: 'Repository', value: 'bitcode/bitcode' },
      { label: 'Branch', value: 'main' },
      { label: 'Commit', value: 'abc123' },
    ]);
  });

  it('builds closure rows for the selected transaction', () => {
    expect(buildApplicationTransactionClosureRows(detail)).toEqual([
      { label: 'Proof posture', value: 'proof witness ready' },
      { label: 'Closure focus', value: 'bounded disclosure' },
      { label: 'Processing time', value: '4m 12s' },
      { label: 'Token total', value: '2,200' },
      { label: 'Credits', value: '24.5' },
      { label: 'Spend', value: '$1.62' },
      { label: 'Latency', value: '930 ms' },
    ]);
  });
});
