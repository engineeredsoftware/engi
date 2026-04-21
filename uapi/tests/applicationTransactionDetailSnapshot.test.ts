import type { DeliverablesDoc } from '@/components/base/bitcode/execution/DeliverablesDocPanel';
import {
  buildApplicationRunDetailFromSelectedRun,
  normalizeApplicationRunDetailPayload,
} from '@/app/application/application-transaction-detail-snapshot';
import type { WorkspaceRun } from '@/app/application/application-run-data';

const baseRun: WorkspaceRun = {
  id: 'run-1',
  created_at: '2026-04-16T12:00:00.000Z',
  type: 'agentic-execution:branch-artifact',
  status: 'completed',
  summary: 'Fallback selected-run summary.',
  repository: 'bitcode/bitcode',
  branch: 'application/refit',
  itemCount: 4,
  tokenTotal: 1200,
  btdUsed: 12.5,
  usdTotal: 0.84,
  averageLatencyMs: 850,
  proofStatus: 'bounded proof ready',
  closureFocus: 'deliverable bundle',
};

describe('application-transaction-detail-snapshot helpers', () => {
  it('builds a selected-run fallback snapshot', () => {
    const fallbackDeliverables: DeliverablesDoc = {
      summary: 'Fallback deliverable summary.',
      pullRequest: { title: 'Fallback PR', url: 'https://example.com/pr/1', number: 1 },
    };

    const snapshot = buildApplicationRunDetailFromSelectedRun(baseRun, fallbackDeliverables);

    expect(snapshot.summary).toBe('Fallback selected-run summary.');
    expect(snapshot.deliverables?.pullRequest?.title).toBe('Fallback PR');
    expect(snapshot.repoSnapshot).toMatchObject({
      org: 'bitcode',
      repo: 'bitcode',
      branch: 'application/refit',
    });
    expect(snapshot.processingStats.tokenTotal).toBe(1200);
    expect(snapshot.historyItemCount).toBe(4);
  });

  it('normalizes live history payload with final work summary deliverables', () => {
    const snapshot = normalizeApplicationRunDetailPayload(
      {
        run: {
          id: 'run-1',
          summary: 'Live execution summary.',
          repo_snapshot: { org: 'bitcode', repo: 'bitcode', branch: 'main', commit: 'abc1234' },
          processing_stats: {
            time: '4m 12s',
            tokens: { total: 2200 },
            btdUsed: 24.5,
            usdTotal: 1.62,
            averageLatencyMs: 930,
          },
          items: [{ id: '1' }, { id: '2' }],
          output: {
            final_work_summary: {
              summary: 'Final work summary.',
              closurePanels: {
                canonLabel: 'Bitcode active posture',
                verification: {
                  id: 'verification',
                  label: 'Verification + ranked candidates',
                  summary: 'Verification summary.',
                  metrics: [{ label: 'Candidates', value: '5' }],
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
                  metrics: [{ label: 'Credited assets', value: '2' }],
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
                  recentRuns: [{ label: 'run-001', summary: 'bitcode/bitcode · completed · credited 2' }],
                },
              },
              closureFollowThrough: {
                canonLabel: 'Bitcode active posture',
                settlementMetrics: [{ label: 'Credited assets', value: '2' }],
                branchArtifacts: ['BITCODE_NEED.md'],
                proofFamilies: [
                  {
                    label: 'selection-materialization',
                    artifactPath: '.bitcode/selection-and-materialization-proof.json',
                    theoremStatus: 'passed',
                    replayArtifacts: '3',
                  },
                ],
                recentHistory: [{ label: 'run-001', summary: 'bitcode/bitcode · completed · credited 2' }],
              },
              deliverables: {
                summary: 'Deliverable bundle summary.',
                pullRequest: { title: 'Live PR', url: 'https://example.com/pr/2', number: 2 },
                issues: [{ title: 'Issue 1', url: 'https://example.com/issues/1', number: 1 }],
              },
            },
          },
        },
        events: [{ id: 'evt-1' }, { id: 'evt-2' }, { id: 'evt-3' }],
      },
      baseRun,
    );

    expect(snapshot.summary).toBe('Live execution summary.');
    expect(snapshot.deliverables?.summary).toBe('Deliverable bundle summary.');
    expect(snapshot.deliverables?.pullRequest?.title).toBe('Live PR');
    expect(snapshot.repoSnapshot?.branch).toBe('main');
    expect(snapshot.processingStats.time).toBe('4m 12s');
    expect(snapshot.processingStats.tokenTotal).toBe(2200);
    expect(snapshot.closureState).toMatchObject({
      canonLabel: 'Bitcode active posture',
      verification: {
        id: 'verification',
        label: 'Verification + ranked candidates',
      },
      settlement: {
        id: 'settlement',
        proofFamilies: [
          {
            label: 'selection-materialization',
            theoremStatus: 'passed',
          },
        ],
      },
      ledger: {
        id: 'ledger',
        recentRuns: [{ label: 'run-001', summary: 'bitcode/bitcode · completed · credited 2' }],
      },
    });
    expect(snapshot.closureFollowThrough).toEqual({
      canonLabel: 'Bitcode active posture',
      settlementMetrics: [{ label: 'Credited assets', value: '2' }],
      branchArtifacts: ['BITCODE_NEED.md'],
      proofFamilies: [
        {
          label: 'selection-materialization',
          artifactPath: '.bitcode/selection-and-materialization-proof.json',
          theoremStatus: 'passed',
          replayArtifacts: '3',
        },
      ],
      recentHistory: [{ label: 'run-001', summary: 'bitcode/bitcode · completed · credited 2' }],
    });
    expect(snapshot.historyItemCount).toBe(2);
    expect(snapshot.eventCount).toBe(3);
  });

  it('falls back cleanly when live payload omits deliverable detail', () => {
    const fallbackDeliverables: DeliverablesDoc = {
      summary: 'Fallback deliverable summary.',
      comments: [{ title: 'Operator comment', url: 'https://example.com/comments/1', number: 1 }],
    };

    const snapshot = normalizeApplicationRunDetailPayload(
      {
        run: {
          id: 'run-1',
          items: [],
          final_work_summary: {
            processingStats: {
              time: '2m 08s',
            },
          },
        },
        events: [],
      },
      baseRun,
      fallbackDeliverables,
    );

    expect(snapshot.summary).toBe('Fallback selected-run summary.');
    expect(snapshot.deliverables?.summary).toBe('Fallback deliverable summary.');
    expect(snapshot.deliverables?.comments?.[0]?.title).toBe('Operator comment');
    expect(snapshot.processingStats.time).toBe('2m 08s');
    expect(snapshot.proofStatus).toBe('bounded proof ready');
  });

  it('rejects invalid payloads', () => {
    expect(() => normalizeApplicationRunDetailPayload(null, baseRun)).toThrow('Invalid run history payload');
  });
});
