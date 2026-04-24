import type { DeliverablesDoc } from '@/components/base/bitcode/execution/DeliverablesDocPanel';
import {
  buildApplicationRunDetailFromSelectedRun,
  normalizeApplicationRunDetailPayload,
} from '@/app/application/application-transaction-detail-snapshot';
import type { WorkspaceRun } from '@/app/application/application-run-data';

const baseRun: WorkspaceRun = {
  id: 'run-1',
  created_at: '2026-04-16T12:00:00.000Z',
  type: 'agentic-execution:asset-pack',
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
    expect(snapshot.writtenAssets?.pullRequest?.title).toBe('Fallback PR');
    expect(snapshot.deliveryMechanism?.pullRequest?.title).toBe('Fallback PR');
    expect(snapshot.repoSnapshot).toMatchObject({
      org: 'bitcode',
      repo: 'bitcode',
      branch: 'application/refit',
    });
    expect(snapshot.processingStats.tokenTotal).toBe(1200);
    expect(snapshot.historyItemCount).toBe(4);
  });

  it('uses embedded protocol projection detail for projected live rows', () => {
    const snapshot = buildApplicationRunDetailFromSelectedRun({
      ...baseRun,
      sourceModel: 'protocol-projection',
      protocolProjectionDetail: {
        summary: 'Live projected Bitcode posture.',
        deliverables: null,
        repoSnapshot: {
          org: 'bitcode',
          repo: 'terminal',
          branch: 'main',
          commit: '',
        },
        processingStats: {
          time: null,
          tokenTotal: null,
          btdUsed: null,
          usdTotal: null,
          averageLatencyMs: null,
        },
        proofStatus: 'verification witness refreshed',
        closureFocus: 'need measurement + ledger refresh',
        closureFollowThrough: null,
        closureState: null,
        bitcodeActivityState: {
          repositoryAnchor: {
            provider: 'github',
            providerAccount: 'bitcode',
            repository: {
              id: 'repo-1',
              fullName: 'bitcode/terminal',
              defaultBranch: 'main',
              private: true,
              language: 'TypeScript',
              topics: ['bitcode'],
            },
            connection: {
              connected: true,
              valid: true,
              mode: 'live connection',
            },
          },
        },
        historyItemCount: 3,
        eventCount: 0,
      },
    });

    expect(snapshot).toMatchObject({
      summary: 'Live projected Bitcode posture.',
      repoSnapshot: {
        org: 'bitcode',
        repo: 'terminal',
        branch: 'main',
      },
      proofStatus: 'verification witness refreshed',
      bitcodeActivityState: {
        repositoryAnchor: {
          providerAccount: 'bitcode',
        },
      },
      historyItemCount: 3,
    });
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
              bitcodeActivityState: {
                repositoryAnchor: {
                  provider: 'github',
                  providerAccount: 'bitcode',
                  repository: {
                    id: 'repo-1',
                    fullName: 'bitcode/bitcode',
                    defaultBranch: 'main',
                    private: true,
                    language: 'TypeScript',
                    topics: ['bitcode', 'terminal'],
                  },
                  connection: {
                    connected: true,
                    valid: true,
                    mode: 'live connection',
                  },
                },
                giveWorkbench: {
                  canonLabel: 'Bitcode active posture',
                  projectionPrincipal: 'giver',
                  branchMode: 'patch',
                  scenarioLabel: 'auth-remediation',
                  profileLabel: 'Targeted deposit',
                  give: {
                    summary: 'Give summary.',
                    metrics: [{ label: 'Selected refs', value: '2' }],
                    rows: [{ label: 'Repository', value: 'bitcode/bitcode' }],
                    selectedEntries: [{ id: 'entry-1', label: 'rollback runbook' }],
                    artifactKinds: ['runbook (1)'],
                  },
                  need: {
                    summary: 'Need summary.',
                    metrics: [{ label: 'Target kinds', value: '2' }],
                    rows: [{ label: 'Scenario', value: 'auth-remediation' }],
                    closureCriteria: ['bound issuer auth'],
                    targetKinds: ['runbook'],
                  },
                  fit: {
                    summary: 'Fit summary.',
                    metrics: [{ label: 'Pressure', value: 'low' }],
                    rows: [{ label: 'Projection', value: 'giver' }],
                  },
                },
                needMeasurement: {
                  scenario: {
                    id: 'scenario-1',
                    label: 'auth-remediation',
                    repo: 'bitcode/bitcode',
                    profile: 'Targeted deposit',
                    selected: true,
                  },
                  parserKind: 'benchmark-parser',
                  closureCriteriaCount: 2,
                  targetKindCount: 3,
                },
                supplySelection: {
                  authSessionLabel: 'bitcode/bitcode · 42',
                  selectedAuthSessionId: 'session-1',
                  selectedKind: 'all',
                  searchTerm: 'auth',
                  selectedCount: 2,
                  filteredCount: 4,
                  totalFilteredEntries: 12,
                  selectedEntries: [
                    { id: 'entry-1', title: 'rollback runbook', kind: 'runbook', tags: ['auth'] },
                  ],
                },
              },
              closurePanels: {
                canonLabel: 'Bitcode active posture',
                needReview: {
                  id: 'need-review',
                  label: 'Need review before fit search',
                  summary: 'Measured Need accepted for source-to-shares fit search.',
                  metrics: [{ label: 'Fit search admitted', value: 'yes' }],
                  rows: [
                    { label: 'Review stage', value: 'post-measurement-pre-fit' },
                    { label: 'Protocol focus', value: 'source-to-shares' },
                  ],
                  chips: ['post-measurement-pre-fit', 'source-to-shares'],
                },
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
                  rows: [
                    { label: 'Bundle', value: 'bundle-001' },
                    { label: 'Present-fit review', value: 'present-fit-for-settlement-review' },
                    {
                      label: 'Objective contract',
                      value: 'bitcode.source-to-shares.quantized-fit-quality-oc.v26',
                    },
                    { label: 'Source-to-shares ref', value: 'sha256:source-to-shares' },
                    { label: 'Fit-quality hash', value: 'sha256:fit-quality' },
                  ],
                  chips: ['selection-materialization'],
                  proofFamilies: [
                    {
                      label: 'selection-materialization',
                      artifactPath: '.bitcode/selection-and-materialization-proof.json',
                      theoremStatus: 'passed',
                      replayArtifacts: '3',
                    },
                  ],
                  fitQualities: [
                    {
                      label: 'Weighted source-to-shares bundle fit',
                      value: '0.328991',
                      detail: '10000 bp · source-to-shares-weighted-objective',
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
    expect(snapshot.writtenAssets?.summary).toBe('Deliverable bundle summary.');
    expect(snapshot.deliveryMechanism?.pullRequest?.title).toBe('Live PR');
    expect(snapshot.repoSnapshot?.branch).toBe('main');
    expect(snapshot.processingStats.time).toBe('4m 12s');
    expect(snapshot.processingStats.tokenTotal).toBe(2200);
    expect(snapshot.bitcodeActivityState).toMatchObject({
      repositoryAnchor: {
        provider: 'github',
        providerAccount: 'bitcode',
        repository: {
          fullName: 'bitcode/bitcode',
          defaultBranch: 'main',
        },
      },
      giveWorkbench: {
        projectionPrincipal: 'giver',
        scenarioLabel: 'auth-remediation',
      },
      needMeasurement: {
        parserKind: 'benchmark-parser',
        targetKindCount: 3,
      },
      supplySelection: {
        authSessionLabel: 'bitcode/bitcode · 42',
        selectedCount: 2,
      },
    });
    expect(snapshot.closureState).toMatchObject({
      canonLabel: 'Bitcode active posture',
      needReview: {
        id: 'need-review',
        label: 'Need review before fit search',
        summary: 'Measured Need accepted for source-to-shares fit search.',
        metrics: [{ label: 'Fit search admitted', value: 'yes' }],
        rows: [
          { label: 'Review stage', value: 'post-measurement-pre-fit' },
          { label: 'Protocol focus', value: 'source-to-shares' },
        ],
      },
      verification: {
        id: 'verification',
        label: 'Verification + ranked candidates',
      },
      settlement: {
        id: 'settlement',
        rows: [
          { label: 'Bundle', value: 'bundle-001' },
          { label: 'Present-fit review', value: 'present-fit-for-settlement-review' },
          { label: 'Objective contract', value: 'bitcode.source-to-shares.quantized-fit-quality-oc.v26' },
          { label: 'Source-to-shares ref', value: 'sha256:source-to-shares' },
          { label: 'Fit-quality hash', value: 'sha256:fit-quality' },
        ],
        proofFamilies: [
          {
            label: 'selection-materialization',
            theoremStatus: 'passed',
          },
        ],
        fitQualities: [
          {
            label: 'Weighted source-to-shares bundle fit',
            value: '0.328991',
            detail: '10000 bp · source-to-shares-weighted-objective',
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
    expect(snapshot.writtenAssets?.summary).toBe('Fallback deliverable summary.');
    expect(snapshot.deliveryMechanism?.comments?.[0]?.title).toBe('Operator comment');
    expect(snapshot.processingStats.time).toBe('2m 08s');
    expect(snapshot.proofStatus).toBe('bounded proof ready');
  });

  it('separates written assets from delivery mechanisms when both are present', () => {
    const snapshot = normalizeApplicationRunDetailPayload(
      {
        run: {
          id: 'run-1',
          items: [],
          final_work_summary: {
            summary: 'Semantic shipping summary.',
            writtenAssets: {
              summary: 'Stable written asset summary.',
              fileChanges: {
                edited: 2,
                created: 1,
                deleted: 0,
                paths: ['src/index.ts'],
              },
            },
            deliveryMechanism: {
              pullRequest: { title: 'Delivery PR', url: 'https://example.com/pr/3', number: 3 },
            },
          },
        },
        events: [],
      },
      baseRun,
    );

    expect(snapshot.summary).toBe('Semantic shipping summary.');
    expect(snapshot.writtenAssets?.summary).toBe('Stable written asset summary.');
    expect(snapshot.writtenAssets?.fileChanges?.edited).toBe(2);
    expect(snapshot.deliveryMechanism?.pullRequest?.title).toBe('Delivery PR');
    expect(snapshot.deliverables?.pullRequest?.title).toBe('Delivery PR');
  });

  it('rejects invalid payloads', () => {
    expect(() => normalizeApplicationRunDetailPayload(null, baseRun)).toThrow('Invalid run history payload');
  });
});
