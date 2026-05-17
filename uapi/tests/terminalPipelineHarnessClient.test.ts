import {
  buildTerminalFitPipelineHarnessRequest,
  drainTerminalFitPipelineHarnessSseBuffer,
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
});
