import {
  buildTerminalFitPipelineHarnessStreamSnapshot,
  buildTerminalFitPipelineHarnessRequest,
  drainTerminalFitPipelineHarnessSseBuffer,
  summarizeTerminalFitPipelineHarnessEvent,
} from '@/app/terminal/terminal-pipeline-harness-client';
import type { TerminalDepositReadWorkbench } from '@/app/terminal/terminal-deposit-read-workbench';
import type { TerminalRepositoryContextState } from '@/app/terminal/terminal-repository-context';

const workbench: TerminalDepositReadWorkbench = {
  canonLabel: 'V27',
  projectionPrincipal: 'buyer',
  branchMode: 'patch',
  scenarioLabel: 'Terminal commercial Read/Fit QA for engineeredsoftware/ENGI',
  profileLabel: 'Commercial Read/Fit QA',
  sourceRevision: {
    repositoryFullName: 'engineeredsoftware/ENGI',
    branch: 'main',
    commit: '31bbc0c5227b6b3aed5d107fd8507d35ec22970a',
  },
  deposit: {
    summary: 'Repository revision deposit.',
    metrics: [],
    rows: [],
    selectedEntries: [],
    artifactKinds: [],
  },
  read: {
    summary: 'Read the deposited repository revision for fit.',
    metrics: [],
    rows: [{ label: 'Repository', value: 'engineeredsoftware/ENGI' }],
    closureCriteria: [],
    targetKinds: [],
  },
  fit: {
    summary: 'Fit posture.',
    metrics: [],
    rows: [],
  },
};

const repositoryContext: TerminalRepositoryContextState = {
  provider: 'github',
  connectionStatus: {
    connected: true,
    valid: true,
    provider: 'github',
    username: 'engineeredsoftware',
  },
  inventorySource: 'stored_repository_inventory',
  repositories: [],
  selectedRepository: {
    id: '1094184056',
    name: 'ENGI',
    fullName: 'engineeredsoftware/ENGI',
    private: false,
    defaultBranch: 'main',
    url: 'https://github.com/engineeredsoftware/ENGI',
    cloneUrl: 'https://github.com/engineeredsoftware/ENGI.git',
    owner: { id: '84343342', username: 'engineeredsoftware', type: 'organization' },
  },
};

describe('terminal pipeline harness client', () => {
  it('builds an authenticated live fit harness request from deposited revision and admitted Read evidence', () => {
    const state = buildTerminalFitPipelineHarnessRequest({
      workbench,
      repositoryContext,
      depositedSourceRevision: {
        repositoryFullName: 'engineeredsoftware/ENGI',
        branch: 'main',
        commit: '31bbc0c5227b6b3aed5d107fd8507d35ec22970a',
        activityId: 'deposit-activity',
        depositAssetId: 'asset-repository-revision',
        hasWalletOrAttestationProof: true,
        hasAssetMeasurementEvidence: true,
      },
      readActivityId: 'read-admission-activity',
    });

    expect(state.ready).toBe(true);
    if (!state.ready) throw new Error('expected ready harness request');
    expect(state.request).toMatchObject({
      mode: 'asset_pack_pipeline',
      repositoryFullName: 'engineeredsoftware/ENGI',
      sourceBranch: 'main',
      sourceCommit: '31bbc0c5227b6b3aed5d107fd8507d35ec22970a',
      sourceGitUrl: 'https://github.com/engineeredsoftware/ENGI.git',
      readId: 'read-admission-activity',
      depositId: 'deposit-activity',
      depositAssetId: 'asset-repository-revision',
      depositHasWalletOrAttestationProof: true,
      depositHasAssetMeasurementEvidence: true,
    });
  });

  it('reports missing source-bound evidence before running the live harness', () => {
    const state = buildTerminalFitPipelineHarnessRequest({
      workbench,
      repositoryContext,
      depositedSourceRevision: null,
      readActivityId: null,
    });

    expect(state.ready).toBe(false);
    expect(state.missing).toContain('deposit activity');
    expect(state.missing).toContain('admitted Read activity');
  });

  it('drains server-sent harness events while preserving partial buffers', () => {
    const events: Array<{ event: string; data: unknown }> = [];
    const tail = drainTerminalFitPipelineHarnessSseBuffer(
      'event: harness-started\ndata: {"repositoryFullName":"engineeredsoftware/ENGI"}\n\nevent: harness-event\ndata: {',
      (event) => events.push(event),
    );

    expect(events).toEqual([
      {
        event: 'harness-started',
        data: { repositoryFullName: 'engineeredsoftware/ENGI' },
      },
    ]);
    expect(tail).toBe('event: harness-event\ndata: {');
  });

  it('summarizes completed harness evidence with fit, candidate, telemetry, and ledger posture', () => {
    const summary = summarizeTerminalFitPipelineHarnessEvent({
      event: 'harness-completed',
      data: {
        outcome: 'completed',
        telemetryLineCount: 72,
        evidence: {
          resultState: 'blocked_readiness',
          fitResult: {
            resultState: 'worthy_fit',
            selectedCandidateAssetIds: ['asset-repository-revision'],
          },
          depositorySearch: {
            searchedAssetCount: 1,
          },
          ledgerSettlement: {
            status: 'blocked',
          },
        },
      },
    });

    expect(summary).toContain('outcome completed');
    expect(summary).toContain('fit worthy_fit');
    expect(summary).toContain('searched 1 assets');
    expect(summary).toContain('candidate asset-repository-revision');
    expect(summary).toContain('ledger blocked');
    expect(summary).toContain('telemetry 72 lines');
  });

  it('summarizes command lifecycle harness events for operator debugging', () => {
    expect(
      summarizeTerminalFitPipelineHarnessEvent({
        event: 'harness-event',
        data: { type: 'command-completed', label: 'asset-pack-pipeline-run', exitCode: 0 },
      }),
    ).toBe('Harness command completed: asset-pack-pipeline-run exit 0.');
  });

  it('summarizes route preflight blockers before sandbox creation', () => {
    expect(
      summarizeTerminalFitPipelineHarnessEvent({
        event: 'harness-preflight',
        data: {
          realInferenceEnabled: false,
          fullProfileRequiresAsyncCompletion: true,
          openaiCredentialProvided: true,
          supabaseUrlProvided: true,
          supabaseServiceRoleProvided: false,
        },
      }),
    ).toBe('Harness preflight blocked: real inference flag missing, full profile requires async completion gate, Supabase service role missing.');
  });

  it('summarizes route preflight profile, budget, and database host when unblocked', () => {
    expect(
      summarizeTerminalFitPipelineHarnessEvent({
        event: 'harness-preflight',
        data: {
          realInferenceEnabled: true,
          openaiCredentialProvided: true,
          supabaseUrlProvided: true,
          supabaseServiceRoleProvided: true,
          realInferenceProfile: 'bounded',
          runtimeBudgetMs: 600000,
          supabaseHost: 'staging.supabase.co',
        },
      }),
    ).toBe('Harness preflight passed with real inference and database streaming credentials present; profile bounded; budget 600000ms; db staging.supabase.co.');
  });

  it('summarizes live telemetry artifact events with phase, path, and inspected payload shape', () => {
    const summary = summarizeTerminalFitPipelineHarnessEvent({
      event: 'harness-event',
      data: {
        type: 'telemetry-artifact-event',
        lineNumber: 8,
        telemetryEvent: {
          type: 'pipeline-stream-event',
          streamEventType: 'store',
          stage: 'asset-pack-synthesis',
          namespace: 'llm',
          key: 'parsedOutput',
          executionPath: ['asset_pack', 'synthesis', 'thriceified-generation'],
          runId: '2bdcd936-a686-4a10-92e2-9c64cbef4f0e',
          dataKeys: ['parsed'],
          parsedOutputPresent: true,
          inspectable: {
            keys: ['resultState', 'assetPack'],
          },
        },
      },
    });

    expect(summary).toContain('Telemetry line 8');
    expect(summary).toContain('asset-pack-synthesis store');
    expect(summary).toContain('llm.parsedOutput');
    expect(summary).toContain('path asset_pack > synthesis > thriceified-generation');
    expect(summary).toContain('run 2bdcd936-a68...');
    expect(summary).toContain('inspectable resultState, assetPack');
    expect(summary).toContain('parsed output present');
  });

  it('adapts live harness events into the canonical execution stream panel payload', () => {
    const snapshot = buildTerminalFitPipelineHarnessStreamSnapshot(
      [
        {
          event: 'harness-started',
          data: {
            repositoryFullName: 'engineeredsoftware/ENGI',
            runId: '2bdcd936-a686-4a10-92e2-9c64cbef4f0e',
          },
        },
        {
          event: 'harness-event',
          data: {
            type: 'telemetry-artifact-event',
            lineNumber: 9,
            telemetryEvent: {
              type: 'pipeline-stream-event',
              streamEventType: 'store',
              stage: 'asset-pack-synthesis',
              namespace: 'llm',
              key: 'parsedOutput',
              executionState: {
                phase: 'implementation',
                agent: 'asset-pack-synthesis-agent',
                step: 'structured_output',
              },
              inputMessageCount: 2,
              outputContentLength: 1200,
              parsedOutputPresent: true,
            },
          },
        },
        {
          event: 'harness-completed',
          data: { outcome: 'completed', telemetryLineCount: 11 },
        },
      ],
      'completed',
    );

    expect(snapshot.output).toContain('Harness started');
    expect(snapshot.output).toContain('run 2bdcd936-a68...');
    expect(snapshot.output).toContain('Telemetry line 9');
    expect(snapshot.runId).toBe('2bdcd936-a686-4a10-92e2-9c64cbef4f0e');
    expect(snapshot.executionState.phase).toBe('Finish');
    expect(snapshot.isStreamingComplete).toBe(true);
    expect(snapshot.generationCount).toBe(1);

    const telemetryLine = snapshot.output
      .split('\n')
      .find((line) => line.includes('Telemetry line 9'));
    expect(telemetryLine).toBeTruthy();
    expect(snapshot.outputDetails[telemetryLine as string]).toMatchObject({
      type: 'generation',
      status: {
        progress: 'in-progress',
        executionState: {
          phase: 'Implementation',
          agent: 'asset-pack-synthesis-agent',
          step: 'structured_output',
        },
      },
    });
  });
});
