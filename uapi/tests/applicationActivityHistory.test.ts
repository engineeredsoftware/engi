import {
  buildApplicationFitWorkbenchDraft,
  buildApplicationGiveWorkbenchDraft,
  buildApplicationNeedMeasurementDraft,
  buildApplicationSupplySelectionDraft,
  buildApplicationExecutionHistoryRequest,
  mapExecutionHistoryRunToWorkspaceRun,
  upsertWorkspaceRun,
} from '@/app/application/application-activity-history';
import type { ApplicationRepositoryContextState } from '@/app/application/application-repository-context';
import type { WorkspaceRun } from '@/app/application/application-run-data';
import type { PipelineExecution } from '@/types/api';

describe('application-activity-history', () => {
  const repositoryContext: ApplicationRepositoryContextState = {
    provider: 'github',
    connectionStatus: null,
    repositories: [],
    selectedRepository: {
      id: 'repo-1',
      name: 'terminal',
      fullName: 'bitcode/terminal',
      private: true,
      defaultBranch: 'main',
      url: 'https://github.com/bitcode/terminal',
      cloneUrl: 'https://github.com/bitcode/terminal.git',
      owner: {
        id: 'owner-1',
        username: 'bitcode',
        type: 'organization',
      },
    },
  };

  it('builds execution history writes from the selected repository context', () => {
    const request = buildApplicationExecutionHistoryRequest(
      {
        type: 'agentic-execution:branch-artifact',
        summary: 'Deposited a Bitcode asset pack.',
        context: {
          source: 'application-deposit-composer',
        },
      },
      { repositoryContext },
    );

    expect(request.pipeline_type).toBe('agentic-execution:branch-artifact');
    expect(request.output).toMatchObject({
      summary: 'Deposited a Bitcode asset pack.',
      repo_snapshot: {
        org: 'bitcode',
        repo: 'terminal',
        branch: 'main',
        commit: '',
      },
    });
    expect(request.context).toMatchObject({
      source: 'application-deposit-composer',
      surface: 'Bitcode Terminal',
      repoSnapshot: {
        org: 'bitcode',
        repo: 'terminal',
        branch: 'main',
        commit: '',
      },
    });
  });

  it('maps execution history rows into workspace runs', () => {
    const run = mapExecutionHistoryRunToWorkspaceRun({
      id: 'run-1',
      created_at: '2026-04-21T12:00:00.000Z',
      type: 'pipeline:measure',
      agentic_execution: null,
      status: 'completed',
      output: null,
      metadata: null,
      items: [],
      summary: 'Measured a need and refreshed proof posture.',
      repo_snapshot: {
        org: 'bitcode',
        repo: 'terminal',
        branch: 'fit',
        commit: 'abc123',
      },
      processing_stats: {
        time: '12s',
        tokens: { input: 100, output: 200, total: 300 },
        btdUsed: 21,
        usdTotal: 1.2,
        averageLatencyMs: 800,
      },
      final_work_summary: null,
    } as PipelineExecution);

    expect(run).toMatchObject({
      id: 'run-1',
      type: 'agentic-execution:need-measurement',
      repository: 'bitcode/terminal',
      branch: 'fit',
      transactionLens: 'need',
      proofStatus: 'need-measurement witness ready',
      closureFocus: 'need measurement + verification posture',
      tokenTotal: 300,
      btdUsed: 21,
      usdTotal: 1.2,
    });
  });

  it('upserts workspace runs and keeps newest first', () => {
    const currentRuns: WorkspaceRun[] = [
      {
        id: 'older',
        created_at: '2026-04-21T10:00:00.000Z',
        type: 'agentic-execution:branch-artifact',
        status: 'completed',
      },
      {
        id: 'current',
        created_at: '2026-04-21T11:00:00.000Z',
        type: 'agentic-execution:proof-refresh',
        status: 'running',
      },
    ];

    const nextRuns = upsertWorkspaceRun(currentRuns, {
      id: 'current',
      created_at: '2026-04-21T12:30:00.000Z',
      type: 'agentic-execution:proof-refresh',
      status: 'completed',
    });

    expect(nextRuns.map((run) => run.id)).toEqual(['current', 'older']);
    expect(nextRuns[0].created_at).toBe('2026-04-21T12:30:00.000Z');
  });

  it('builds give-side workbench drafts as canonical branch-artifact activity', () => {
    const draft = buildApplicationGiveWorkbenchDraft({
      canonLabel: 'Bitcode active posture',
      projectionPrincipal: 'giver',
      branchMode: 'patch',
      scenarioLabel: 'auth-remediation',
      profileLabel: 'Targeted deposit',
      give: {
        summary: 'Record supply-bearing share posture.',
        metrics: [{ label: 'Selected refs', value: '2' }],
        rows: [{ label: 'Repository', value: 'bitcode/terminal' }],
        selectedEntries: [
          { id: 'entry-1', label: 'rollback runbook' },
          { id: 'entry-2', label: 'issuer patch' },
        ],
        artifactKinds: ['runbook (1)', 'patch (1)'],
      },
      need: {
        summary: 'Need summary',
        metrics: [],
        rows: [],
        closureCriteria: [],
        targetKinds: [],
      },
      fit: {
        summary: 'Fit summary',
        metrics: [],
        rows: [],
      },
    });

    expect(draft).toMatchObject({
      type: 'agentic-execution:branch-artifact',
      detailSection: 'transaction',
      summary: 'Recorded give-side share posture for bitcode/terminal.',
    });
    expect(draft.input).toMatchObject({
      selectedEntryLabels: ['rollback runbook', 'issuer patch'],
      artifactKinds: ['runbook (1)', 'patch (1)'],
    });
  });

  it('builds need-measurement drafts from the active scenario state', () => {
    const draft = buildApplicationNeedMeasurementDraft({
      selectedScenarioId: 'scenario-1',
      parserKind: 'benchmark-parser',
      closureCriteriaCount: 2,
      targetKindCount: 3,
      scenarios: [
        {
          id: 'scenario-1',
          label: 'auth-remediation',
          repo: 'bitcode/terminal',
          profile: 'Targeted deposit',
          selected: true,
        },
      ],
    });

    expect(draft).toMatchObject({
      type: 'agentic-execution:need-measurement',
      detailSection: 'activity',
      summary: 'Recorded need measurement for auth-remediation.',
    });
    expect(draft.output).toMatchObject({
      needMeasurement: {
        parserKind: 'benchmark-parser',
        closureCriteriaCount: 2,
        targetKindCount: 3,
      },
    });
  });

  it('builds supply-selection and fit drafts for the Bitcode ledger', () => {
    const selectionDraft = buildApplicationSupplySelectionDraft({
      authSessions: [{ value: 'session-1', label: 'bitcode/terminal · 42', selected: true }],
      selectedAuthSessionId: 'session-1',
      kindOptions: [{ value: 'all', label: 'All artifact kinds', selected: true }],
      selectedKind: 'all',
      searchTerm: 'auth',
      selectedCount: 2,
      filteredCount: 4,
      totalFilteredEntries: 12,
      filteredEntries: [
        {
          id: 'entry-1',
          title: 'rollback runbook',
          subtitle: 'Restores issuer auth',
          kind: 'runbook',
          selected: true,
          tags: ['auth'],
        },
        {
          id: 'entry-2',
          title: 'issuer patch',
          subtitle: 'Tight config patch',
          kind: 'patch',
          selected: true,
          tags: ['config'],
        },
      ],
    });
    const fitDraft = buildApplicationFitWorkbenchDraft({
      canonLabel: 'Bitcode active posture',
      projectionPrincipal: 'needer',
      branchMode: 'patch',
      scenarioLabel: 'auth-remediation',
      profileLabel: 'Targeted deposit',
      give: {
        summary: '',
        metrics: [],
        rows: [],
        selectedEntries: [],
        artifactKinds: [],
      },
      need: {
        summary: '',
        metrics: [],
        rows: [],
        closureCriteria: [],
        targetKinds: [],
      },
      fit: {
        summary: 'Settlement remains justified by decisive fit.',
        metrics: [{ label: 'Pressure', value: 'low' }],
        rows: [{ label: 'Settlement intent', value: 'Direct decisive closure' }],
      },
    });

    expect(selectionDraft).toMatchObject({
      type: 'agentic-execution:branch-artifact',
      detailSection: 'transaction',
    });
    expect(selectionDraft.input).toMatchObject({
      selectedCount: 2,
      selectedKind: 'all',
      searchTerm: 'auth',
    });
    expect(fitDraft).toMatchObject({
      type: 'agentic-execution:proof-refresh',
      detailSection: 'closure',
      summary: 'Recorded asset-pack fit and settlement posture for auth-remediation.',
    });
  });
});
