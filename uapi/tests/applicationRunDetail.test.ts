import type { DeliverablesDoc } from '@/components/base/engi/execution/DeliverablesDocPanel';
import {
  buildApplicationRunDetailFromSelectedRun,
  normalizeApplicationRunDetailPayload,
} from '@/app/application/application-run-detail';
import type { WorkspaceRun } from '@/app/application/application-run-data';

const baseRun: WorkspaceRun = {
  id: 'run-1',
  created_at: '2026-04-16T12:00:00.000Z',
  type: 'pipeline:deliverables',
  status: 'completed',
  summary: 'Fallback selected-run summary.',
  repository: 'bitcode/bitcode',
  branch: 'application/refit',
  itemCount: 4,
  tokenTotal: 1200,
  creditsTotal: 12.5,
  usdTotal: 0.84,
  averageLatencyMs: 850,
  proofStatus: 'bounded proof ready',
  closureFocus: 'deliverable bundle',
};

describe('application-run-detail helpers', () => {
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
            credits: 24.5,
            usdTotal: 1.62,
            averageLatencyMs: 930,
          },
          items: [{ id: '1' }, { id: '2' }],
          output: {
            final_work_summary: {
              summary: 'Final work summary.',
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
