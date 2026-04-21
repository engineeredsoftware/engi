import {
  buildApplicationTransactionClosurePayload,
  buildApplicationTransactionClosureFollowThrough,
  buildApplicationTransactionClosureRows,
  buildApplicationTransactionIdentityRows,
  buildApplicationTransactionOverviewMetrics,
  countApplicationTransactionDeliverableSurfaces,
} from '@/app/application/application-transaction-detail';
import type { ApplicationClosureState } from '@/app/application/application-closure-state';
import type { ApplicationRunDetailSnapshot } from '@/app/application/application-transaction-detail-snapshot';
import type { WorkspaceRun } from '@/app/application/application-run-data';

const selectedTransaction: WorkspaceRun = {
  id: 'tx-001',
  created_at: '2026-04-16T12:00:00.000Z',
  type: 'agentic-execution:branch-artifact',
  status: 'completed',
  summary: 'Selected transaction summary.',
  repository: 'bitcode/bitcode',
  branch: 'application/refit',
  itemCount: 4,
  tokenTotal: 1200,
  btdUsed: 18.5,
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
    btdUsed: 24.5,
    usdTotal: 1.62,
    averageLatencyMs: 930,
  },
  proofStatus: 'proof witness ready',
  closureFocus: 'bounded disclosure',
  historyItemCount: 5,
  eventCount: 3,
};

const closureState: ApplicationClosureState = {
  canonLabel: 'production workspace posture',
  verification: {
    id: 'verification',
    label: 'Verification + ranked candidates',
    summary: 'Verification summary.',
    metrics: [
      { label: 'Candidates', value: '5' },
      { label: 'Selected assets', value: '2' },
    ],
    rows: [{ label: 'Verification state', value: 'allowed-with-policy' }],
    chips: ['rollback runbook'],
  },
  branch: {
    id: 'branch',
    label: 'Branch artifacts',
    summary: 'Branch summary.',
    metrics: [{ label: 'Visible artifacts', value: '7' }],
    rows: [{ label: 'Branch', value: 'bitcode/auth-rollback' }],
    chips: ['BITCODE_NEED.md', '.bitcode/settlement-preview.json'],
  },
  settlement: {
    id: 'settlement',
    label: 'Settlement + proof',
    summary: 'Settlement summary.',
    metrics: [
      { label: 'Credited assets', value: '2' },
      { label: 'Participating assets', value: '3' },
    ],
    rows: [{ label: 'Bundle', value: 'bundle-001' }],
    chips: ['selection-materialization'],
    proofFamilies: [
      {
        label: 'selection-materialization',
        artifactPath: '.bitcode/selection-and-materialization-proof.json',
        theoremStatus: 'passed',
        replayArtifacts: '3',
      },
    ],
  },
  ledger: {
    id: 'ledger',
    label: 'Ledger + run history',
    summary: 'Ledger summary.',
    metrics: [{ label: 'History count', value: '1' }],
    rows: [{ label: 'buyer pools', value: '120 BTD' }],
    chips: [],
    recentRuns: [
      {
        label: 'run-001',
        summary: 'bitcode/bitcode · bitcode/auth-rollback · completed · credited 2',
      },
    ],
  },
};

describe('application-transaction-detail helpers', () => {
  it('counts transaction deliverable surfaces', () => {
    expect(countApplicationTransactionDeliverableSurfaces(detail)).toBe(2);
  });

  it('builds overview metrics from selected activity and detail', () => {
    expect(buildApplicationTransactionOverviewMetrics(selectedTransaction, detail)).toEqual([
      { label: 'Asset-pack surfaces', value: '2' },
      { label: 'History items', value: '5' },
      { label: 'Event count', value: '3' },
      { label: 'Proof posture', value: 'proof witness ready' },
    ]);
  });

  it('builds identity rows for the selected activity', () => {
    expect(buildApplicationTransactionIdentityRows(selectedTransaction, detail)).toEqual([
      { label: 'Activity id', value: 'tx-001' },
      { label: 'Repository', value: 'bitcode/bitcode' },
      { label: 'Branch', value: 'main' },
      { label: 'Commit', value: 'abc123' },
    ]);
  });

  it('builds closure rows for the selected activity', () => {
    expect(buildApplicationTransactionClosureRows(detail)).toEqual([
      { label: 'Proof posture', value: 'proof witness ready' },
      { label: 'Closure focus', value: 'bounded disclosure' },
      { label: 'Processing time', value: '4m 12s' },
      { label: 'Token total', value: '2,200' },
      { label: 'BTD throughput', value: '24.5' },
      { label: 'Spend', value: '$1.62' },
      { label: 'Latency', value: '930 ms' },
    ]);
  });

  it('builds closure follow-through from application closure state', () => {
    expect(buildApplicationTransactionClosureFollowThrough(closureState)).toEqual({
      settlementMetrics: [
        { label: 'Credited assets', value: '2' },
        { label: 'Participating assets', value: '3' },
      ],
      branchArtifacts: ['BITCODE_NEED.md', '.bitcode/settlement-preview.json'],
      proofFamilies: [
        {
          label: 'selection-materialization',
          artifactPath: '.bitcode/selection-and-materialization-proof.json',
          theoremStatus: 'passed',
          replayArtifacts: '3',
        },
      ],
      recentHistory: [
        {
          label: 'run-001',
          summary: 'bitcode/bitcode · bitcode/auth-rollback · completed · credited 2',
        },
      ],
    });
  });

  it('builds a reusable closure payload for inline inspection', () => {
    const closureFollowThrough = buildApplicationTransactionClosureFollowThrough(closureState);

    expect(buildApplicationTransactionClosurePayload(selectedTransaction, detail, closureState, closureFollowThrough)).toEqual({
      transaction: {
        id: 'tx-001',
        createdAt: '2026-04-16T12:00:00.000Z',
        proofStatus: 'proof witness ready',
        closureFocus: 'bounded disclosure',
      },
      closure: {
        canonLabel: 'production workspace posture',
        processingStats: {
          time: '4m 12s',
          tokenTotal: 2200,
          btdUsed: 24.5,
          usdTotal: 1.62,
          averageLatencyMs: 930,
        },
        rows: [
          { label: 'Proof posture', value: 'proof witness ready' },
          { label: 'Closure focus', value: 'bounded disclosure' },
          { label: 'Processing time', value: '4m 12s' },
          { label: 'Token total', value: '2,200' },
          { label: 'BTD throughput', value: '24.5' },
          { label: 'Spend', value: '$1.62' },
          { label: 'Latency', value: '930 ms' },
        ],
        settlementMetrics: [
          { label: 'Credited assets', value: '2' },
          { label: 'Participating assets', value: '3' },
        ],
        branchArtifacts: ['BITCODE_NEED.md', '.bitcode/settlement-preview.json'],
        proofFamilies: [
          {
            label: 'selection-materialization',
            artifactPath: '.bitcode/selection-and-materialization-proof.json',
            theoremStatus: 'passed',
            replayArtifacts: '3',
          },
        ],
        recentHistory: [
          {
            label: 'run-001',
            summary: 'bitcode/bitcode · bitcode/auth-rollback · completed · credited 2',
          },
        ],
        verification: closureState.verification,
        branch: closureState.branch,
        settlement: closureState.settlement,
        ledger: closureState.ledger,
      },
    });
  });
});
