import {
  buildApplicationClosureFinalWorkSummary,
  buildApplicationExternalInterfacingDraft,
  buildApplicationFitWorkbenchDraft,
  buildApplicationGiveWorkbenchDraft,
  buildApplicationNeedMeasurementDraft,
  buildApplicationRepositoryAnchorDraft,
  buildApplicationSupplySelectionDraft,
  buildApplicationExecutionHistoryRequest,
  mapExecutionHistoryRunToWorkspaceRun,
  upsertWorkspaceRun,
} from '@/app/application/application-activity-history';
import type { ApplicationExternalRuntimeSnapshot } from '@/app/application/application-external-runtime';
import type { ApplicationRepositoryContextState } from '@/app/application/application-repository-context';
import type { WorkspaceRun } from '@/app/application/application-run-data';
import type { ApplicationClosureState } from '@/app/application/application-closure-state';
import type { PipelineExecution } from '@/types/api';

describe('application-activity-history', () => {
  const repositoryContext: ApplicationRepositoryContextState = {
    provider: 'github',
    connectionStatus: null,
    inventorySource: 'stored_repository_inventory',
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

  const closureState: ApplicationClosureState = {
    canonLabel: 'Bitcode active posture',
    needReview: {
      id: 'need-review',
      label: 'Need review before fit search',
      summary: 'Measured Need accepted for source-to-shares fit search.',
      metrics: [{ label: 'Fit search admitted', value: 'yes' }],
      rows: [{ label: 'Review stage', value: 'post-measurement-pre-fit' }],
      chips: ['source-to-shares'],
    },
    verification: {
      id: 'verification',
      label: 'Verification',
      summary: 'Verification summary.',
      metrics: [{ label: 'Candidates', value: '3' }],
      rows: [{ label: 'Verification state', value: 'allowed-with-policy' }],
      chips: ['rollback runbook'],
    },
    branch: {
      id: 'branch',
      label: 'Branch artifacts',
      summary: 'Branch summary.',
      metrics: [{ label: 'Visible artifacts', value: '4' }],
      rows: [{ label: 'Branch', value: 'bitcode/auth-rollback' }],
      chips: ['BITCODE_NEED.md'],
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
      rows: [{ label: 'Buyer pool', value: '120 BTD' }],
      chips: [],
      recentRuns: [{ label: 'run-001', summary: 'bitcode/terminal · completed · credited 2' }],
    },
  };

  it('builds execution history writes from the selected repository context', () => {
    const request = buildApplicationExecutionHistoryRequest(
      {
        type: 'agentic-execution:asset-pack',
        summary: 'Deposited a Bitcode asset pack.',
        context: {
          source: 'application-deposit-composer',
        },
      },
      { repositoryContext },
    );

    expect(request.pipeline_type).toBe('agentic-execution:asset-pack');
    expect(request.status).toBe('completed');
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

  it('merges closure follow-through into final_work_summary for persisted reread', () => {
    const request = buildApplicationExecutionHistoryRequest(
      {
        type: 'agentic-execution:proof-refresh',
        summary: 'Recorded closure posture.',
        output: {
          protocol: { ok: true },
          finalWorkSummary: buildApplicationClosureFinalWorkSummary(closureState, {
            summary: 'Recorded closure posture.',
            processingStats: {
              time: '4m 12s',
              tokenTotal: 2200,
              btdUsed: 24.5,
              usdTotal: 1.62,
              averageLatencyMs: 930,
            },
          }),
        },
      },
      { repositoryContext },
    );

    expect(request.output).toMatchObject({
      protocol: { ok: true },
      final_work_summary: {
        summary: 'Recorded closure posture.',
        closurePanels: {
          canonLabel: 'Bitcode active posture',
          needReview: {
            id: 'need-review',
            label: 'Need review before fit search',
          },
          verification: {
            id: 'verification',
            label: 'Verification',
          },
          settlement: {
            id: 'settlement',
            label: 'Settlement + proof',
          },
        },
        closureFollowThrough: {
          canonLabel: 'Bitcode active posture',
          branchArtifacts: ['BITCODE_NEED.md'],
          settlementMetrics: [{ label: 'Credited assets', value: '2' }],
          recentHistory: [{ label: 'run-001', summary: 'bitcode/terminal · completed · credited 2' }],
        },
        processingStats: {
          time: '4m 12s',
          tokens: { total: 2200 },
          btdUsed: 24.5,
          usdTotal: 1.62,
          averageLatencyMs: 930,
        },
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

  it('prefers delivery mechanism summary when written assets are absent during workspace reread', () => {
    const run = mapExecutionHistoryRunToWorkspaceRun({
      id: 'run-2',
      created_at: '2026-04-21T13:00:00.000Z',
      type: 'pipeline:ship',
      agentic_execution: null,
      status: 'completed',
      output: null,
      metadata: null,
      items: [],
      summary: null,
      repo_snapshot: {
        org: 'bitcode',
        repo: 'terminal',
        branch: 'ship',
        commit: 'def456',
      },
      processing_stats: null,
      final_work_summary: {
        summary: null,
        writtenAssets: null,
        deliveryMechanism: {
          summary: 'Opened the connected-interface delivery mechanism for the asset pack.',
        },
      },
    } as PipelineExecution);

    expect(run.summary).toBe('Opened the connected-interface delivery mechanism for the asset pack.');
  });

  it('upserts workspace runs and keeps newest first', () => {
    const currentRuns: WorkspaceRun[] = [
      {
        id: 'older',
        created_at: '2026-04-21T10:00:00.000Z',
        type: 'agentic-execution:asset-pack',
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

  it('builds give-side workbench drafts as canonical AssetPack activity', () => {
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
      type: 'agentic-execution:asset-pack',
      detailSection: 'transaction',
      summary: 'Recorded give-side share posture for bitcode/terminal.',
    });
    expect(draft.input).toMatchObject({
      selectedEntryLabels: ['rollback runbook', 'issuer patch'],
      artifactKinds: ['runbook (1)', 'patch (1)'],
    });
    expect(draft.output).toMatchObject({
      finalWorkSummary: {
        bitcodeActivityState: {
          giveWorkbench: {
            canonLabel: 'Bitcode active posture',
            projectionPrincipal: 'giver',
            scenarioLabel: 'auth-remediation',
            profileLabel: 'Targeted deposit',
          },
        },
      },
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
      finalWorkSummary: {
        bitcodeActivityState: {
          needMeasurement: {
            parserKind: 'benchmark-parser',
            closureCriteriaCount: 2,
            targetKindCount: 3,
            scenario: {
              label: 'auth-remediation',
            },
          },
        },
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
      type: 'agentic-execution:asset-pack',
      detailSection: 'transaction',
    });
    expect(selectionDraft.input).toMatchObject({
      selectedCount: 2,
      selectedKind: 'all',
      searchTerm: 'auth',
    });
    expect(selectionDraft.output).toMatchObject({
      finalWorkSummary: {
        bitcodeActivityState: {
          supplySelection: {
            authSessionLabel: 'bitcode/terminal · 42',
            selectedCount: 2,
            selectedEntries: [
              { id: 'entry-1', title: 'rollback runbook', kind: 'runbook' },
              { id: 'entry-2', title: 'issuer patch', kind: 'patch' },
            ],
          },
        },
      },
    });
    expect(fitDraft).toMatchObject({
      type: 'agentic-execution:proof-refresh',
      detailSection: 'closure',
      summary: 'Recorded asset-pack fit and settlement posture for auth-remediation.',
    });
    expect(fitDraft.output).toMatchObject({
      finalWorkSummary: {
        bitcodeActivityState: {
          fitWorkbench: {
            projectionPrincipal: 'needer',
            scenarioLabel: 'auth-remediation',
          },
        },
      },
    });
  });

  it('builds repository anchor and boundary-readiness drafts for the ledger', () => {
    const repositoryDraft = buildApplicationRepositoryAnchorDraft(repositoryContext);
    const externalSnapshot: ApplicationExternalRuntimeSnapshot = {
      configuredEnvironmentMode: 'review',
      actualityDisposition: 'boundary-honest',
      counts: {
        total: 2,
        liveConfigured: 1,
        liveMisconfigured: 0,
        boundaryOnly: 1,
        mock: 0,
        blocking: 0,
      },
      interfaces: [
        {
          interfaceId: 'github-live-interface',
          label: 'GitHub',
          runtimeState: 'live-configured',
          resultClass: 'live',
          reconciliationState: 'in-sync',
          telemetryCoverageState: 'covered',
          liveEnabled: true,
          missingBindingKeys: [],
          missingSecretEnvKeys: [],
          environmentIdentityRef: 'github://bitcode',
          environmentResourceRef: 'repo://bitcode/terminal',
          blocking: false,
        },
      ],
    };
    const externalDraft = buildApplicationExternalInterfacingDraft(externalSnapshot);

    expect(repositoryDraft).toMatchObject({
      type: 'agentic-execution:asset-pack',
      detailSection: 'transaction',
      summary: 'Recorded repository anchor for bitcode/terminal.',
    });
    expect(repositoryDraft.output).toMatchObject({
      repositoryAnchor: {
        provider: 'github',
        repository: {
          fullName: 'bitcode/terminal',
          defaultBranch: 'main',
        },
        connection: {
          inventorySource: 'stored_repository_inventory',
        },
      },
      finalWorkSummary: {
        bitcodeActivityState: {
          repositoryAnchor: {
            provider: 'github',
            providerAccount: 'bitcode',
            repository: {
              fullName: 'bitcode/terminal',
              defaultBranch: 'main',
            },
            connection: {
              inventorySource: 'stored_repository_inventory',
            },
          },
        },
      },
    });
    expect(repositoryDraft.context).toMatchObject({
      inventorySource: 'stored_repository_inventory',
    });
    expect(externalDraft).toMatchObject({
      type: 'agentic-execution:proof-refresh',
      detailSection: 'closure',
      summary: 'Recorded external interface readiness for review Bitcode posture.',
    });
    expect(externalDraft.output).toMatchObject({
      externalInterfacing: {
        configuredEnvironmentMode: 'review',
        actualityDisposition: 'boundary-honest',
        counts: {
          total: 2,
          liveConfigured: 1,
        },
      },
    });
  });
});
