import {
  buildLiveTerminalDepositReadWorkbenchSnapshot,
  normalizeTerminalDepositReadWorkbench,
  TERMINAL_ENTERPRISE_READING_STEPS,
} from '@/app/terminal/terminal-deposit-read-workbench';
import type { TerminalRepositoryContextState } from '@/app/terminal/terminal-repository-context';

describe('normalizeTerminalDepositReadWorkbench', () => {
  it('locks the enterprise Reading UX to five reviewable steps', () => {
    expect(TERMINAL_ENTERPRISE_READING_STEPS.map((step) => step.id)).toEqual([
      'request-read',
      'review-synthesized-need',
      'request-fit',
      'review-synthesized-asset-pack',
      'buy-asset-pack-settle',
    ]);
    expect(TERMINAL_ENTERPRISE_READING_STEPS.map((step) => step.label)).toEqual([
      '1. Request Read',
      '2. Review synthesized Need',
      '3. Request Fit',
      '4. Review synthesized AssetPack',
      '5. Buy AssetPack, settle',
    ]);
    expect(TERMINAL_ENTERPRISE_READING_STEPS).toHaveLength(5);
  });

  it('builds deposit, read, and fit sections from the shell snapshot', () => {
    const workbench = normalizeTerminalDepositReadWorkbench(
      {
        canonLabel: 'production workspace posture',
        selection: {
          projectionPrincipal: 'buyer',
          branchMode: 'patch',
          scenarioId: 'scenario-auth',
          authSessionId: 'session-1',
          selectedInventoryEntryIds: ['entry-1', 'entry-2'],
        },
        repoSupplySummary: {
          repoCount: 7,
          inventoryEntryCount: 25,
          scenarioCount: 8,
          candidateAssetCount: 14,
        },
        scenario: {
          scenarioId: 'scenario-auth',
          scenarioFamily: 'monorepo-auth-rollback',
          repo: 'bitcode/bitcode',
          profileShortLabel: 'Targeted deposit',
        },
        authSession: {
          authSessionId: 'session-1',
          repo: 'bitcode/bitcode',
          installationAccountLogin: 'bitcode',
        },
        inventory: {
          activeCount: 25,
          filteredCount: 10,
          selectedCount: 2,
          selectedEntries: [
            { inventoryEntryId: 'entry-1', title: 'rollback runbook' },
            { inventoryEntryId: 'entry-2', title: 'issuer config patch' },
          ],
        },
        depositingSurface: {
          depositIntentSummary: 'Previewing a targeted deposit from bitcode/bitcode using 2 repo artifacts.',
          depositProfile: 'Targeted deposit',
          repoSupplyRef: 'bitcode/bitcode · session-1',
          selectedArtifactKindCounts: { runbook: 1, patch: 1 },
          selectedOriginKindCounts: { repo: 2 },
          addressingRoot: 'sha256:addressing',
          authRoot: 'sha256:auth',
        },
        readingSurface: {
          parserKind: 'benchmark-parser',
          readSummary: 'Recover enterprise auth rollback safely.',
          closureCriteria: ['session validity restored', 'audit receipt emitted'],
          failureModes: ['issuer mismatch', 'session invalidation'],
          targetArtifactKinds: ['runbook', 'patch'],
        },
        fitSurface: {
          fitSummary: 'Preview overlap in runbook, patch against the active read.',
          resultState: 'no_worthy_fit',
          resultReasons: ['No source-bound fit crossed the acceptance threshold.'],
          normalizationPressure: 'low',
          decisiveKinds: ['runbook', 'patch'],
          overlapKinds: ['runbook', 'patch'],
          branchIntentSummary: 'The next branch run will materialize a tight closure path.',
          proofIntentSummary: 'Proof should explain why the selected deposit is decisive.',
          settlementIntentSummary: 'Settlement should read as the direct closure of the decisive fit.',
        },
      },
      {
        provider: 'github',
        connectionStatus: {
          connected: true,
          valid: true,
          provider: 'github',
          username: 'bitcode',
          metadata: { mock_mode: true },
        },
        repositories: [],
        selectedRepository: {
          id: 'repo-1',
          fullName: 'bitcode/bitcode',
          url: 'https://github.com/bitcode/bitcode',
          private: false,
          defaultBranch: 'main',
          language: 'TypeScript',
          topics: [],
          owner: { id: 'owner-1', username: 'bitcode', avatarUrl: '' },
          visibility: 'public',
        },
      },
    );

    expect(workbench?.projectionPrincipal).toBe('buyer');
    expect(workbench?.deposit.rows.find((row) => row.label === 'Repository')?.value).toBe('bitcode/bitcode');
    expect(workbench?.read.rows.find((row) => row.label === 'Parser')?.value).toBe('benchmark-parser');
    expect(workbench?.fit.metrics.find((metric) => metric.label === 'Pressure')?.value).toBe('low');
    expect(workbench?.fit.rows.find((row) => row.label === 'Fit result')?.value).toBe('no_worthy_fit');
    expect(workbench?.fit.rows.find((row) => row.label === 'Result reason')?.value).toBe(
      'No source-bound fit crossed the acceptance threshold.',
    );
    expect(workbench?.deposit.selectedEntries).toHaveLength(2);
  });

  it('falls back safely when the shell snapshot is sparse', () => {
    const workbench = normalizeTerminalDepositReadWorkbench({
      selection: { projectionPrincipal: 'public', branchMode: 'context' },
      repoSupplySummary: { repoCount: 0, inventoryEntryCount: 0, scenarioCount: 0, candidateAssetCount: 0 },
      inventory: { activeCount: 0, filteredCount: 0, selectedCount: 0, selectedEntries: [] },
    });

    expect(workbench?.scenarioLabel).toBe('No active scenario');
    expect(workbench?.deposit.metrics.find((metric) => metric.label === 'Selected refs')?.value).toBe('0');
    expect(workbench?.fit.rows.find((row) => row.label === 'Projection')?.value).toBe('public');
  });

  it('uses live connected repository context for deposit posture instead of demo snapshot entries', () => {
    const workbench = normalizeTerminalDepositReadWorkbench(
      {
        authSession: {
          authSessionId: 'gh_inst_bitcode_001',
          repo: 'frontier/demo-auth',
          installationAccountLogin: 'frontier',
        },
        scenario: {
          repo: 'frontier/demo-auth',
        },
        repoSupplySummary: {
          repoCount: 6,
          inventoryEntryCount: 24,
          scenarioCount: 3,
          candidateAssetCount: 8,
        },
        inventory: {
          activeCount: 24,
          filteredCount: 6,
          selectedCount: 2,
          selectedEntries: [
            { inventoryEntryId: 'frontier-entry-1', title: 'frontier patch' },
          ],
        },
        depositingSurface: {
          selectedArtifactKindCounts: { patch: 1 },
          selectedOriginKindCounts: { demo: 1 },
          addressingRoot: 'sha256:frontier',
          authRoot: 'sha256:frontier-auth',
        },
      },
      {
        provider: 'github',
        connectionStatus: {
          connected: true,
          valid: true,
          provider: 'github',
          username: 'engineeredsoftware',
          metadata: { mock_mode: false, repositories: 46 },
        },
        inventorySource: 'stored_repository_inventory',
        repositories: [
          {
            id: '1094184056',
            name: 'ENGI',
            fullName: 'engineeredsoftware/ENGI',
            private: false,
            defaultBranch: 'main',
            url: 'https://github.com/engineeredsoftware/ENGI',
            cloneUrl: 'https://github.com/engineeredsoftware/ENGI.git',
            owner: { id: '84343342', username: 'engineeredsoftware', type: 'organization' },
            language: 'TypeScript',
            topics: [],
          },
        ],
        selectedRepository: {
          id: '1094184056',
          name: 'ENGI',
          fullName: 'engineeredsoftware/ENGI',
          private: false,
          defaultBranch: 'main',
          url: 'https://github.com/engineeredsoftware/ENGI',
          cloneUrl: 'https://github.com/engineeredsoftware/ENGI.git',
          owner: { id: '84343342', username: 'engineeredsoftware', type: 'organization' },
          language: 'TypeScript',
          topics: [],
        },
      },
    );

    expect(workbench?.deposit.rows.find((row) => row.label === 'Repository')?.value).toBe('engineeredsoftware/ENGI');
    expect(workbench?.deposit.rows.find((row) => row.label === 'Auth session')?.value).toBe(
      'github:engineeredsoftware:engineeredsoftware/ENGI',
    );
    expect(workbench?.deposit.selectedEntries).toEqual([
      { id: '1094184056', label: 'engineeredsoftware/ENGI' },
    ]);
    expect(workbench?.deposit.metrics.find((metric) => metric.label === 'Authenticated repos')?.value).toBe('46');
  });

  it('builds a substantive live repository Read/Fit QA scenario instead of a pending placeholder', () => {
    const snapshot = buildLiveTerminalDepositReadWorkbenchSnapshot({
      provider: 'github',
      connectionStatus: {
        connected: true,
        valid: true,
        provider: 'github',
        username: 'engineeredsoftware',
        metadata: { mock_mode: false, repositories: 46 },
      },
      inventorySource: 'stored_repository_inventory',
      repositories: [],
      selectedBranch: 'main',
      selectedCommit: '31bbc0c5227b6b3aed5d107fd8507d35ec22970a',
      selectedRepository: {
        id: '1094184056',
        name: 'ENGI',
        fullName: 'engineeredsoftware/ENGI',
        private: false,
        defaultBranch: 'main',
        url: 'https://github.com/engineeredsoftware/ENGI',
        cloneUrl: 'https://github.com/engineeredsoftware/ENGI.git',
        owner: { id: '84343342', username: 'engineeredsoftware', type: 'organization' },
        language: 'TypeScript',
        topics: [],
      },
    });
    const workbench = normalizeTerminalDepositReadWorkbench(snapshot);

    expect(workbench?.scenarioLabel).toBe('Terminal Read/Fit QA for engineeredsoftware/ENGI');
    expect(workbench?.profileLabel).toBe('Read/Fit QA');
    expect(workbench?.read.rows.find((row) => row.label === 'Repository')?.value).toBe('engineeredsoftware/ENGI');
    expect(workbench?.read.rows.find((row) => row.label === 'Parser')?.value).toBe(
      'terminal-read-fit-parser',
    );
    expect(workbench?.read.closureCriteria).toHaveLength(5);
    expect(workbench?.read.targetKinds).toEqual(
      expect.arrayContaining(['repository-revision', 'asset-pack-evidence', 'proof-root']),
    );
    expect(workbench?.fit.metrics.find((metric) => metric.label === 'Pressure')?.value).toBe('critical');
    expect(workbench?.fit.rows.find((row) => row.label === 'Fit result')?.value).toBe('blocked_readiness');
    expect(workbench?.fit.rows.find((row) => row.label === 'Result reason')?.value).toContain(
      'not recorded in this staging-testnet result',
    );
  });

  it('pins live Read/Fit posture to the latest deposited source revision when branch head advances', () => {
    const depositedCommit = '31bbc0c5227b6b3aed5d107fd8507d35ec22970a';
    const branchHeadCommit = 'd2b843eddfc84b9719630a4295db6f1c5dead52c';
    const repositoryContext: TerminalRepositoryContextState = {
      provider: 'github',
      connectionStatus: {
        connected: true,
        valid: true,
        provider: 'github',
        username: 'source-org',
        metadata: { mock_mode: false, repositories: 1 },
      },
      inventorySource: 'stored_repository_inventory',
      repositories: [
        {
          id: 'repo-source-001',
          name: 'source-repo',
          fullName: 'source-org/source-repo',
          private: false,
          defaultBranch: 'main',
          url: 'https://github.com/source-org/source-repo',
          cloneUrl: 'https://github.com/source-org/source-repo.git',
          owner: { id: 'source-owner-001', username: 'source-org', type: 'organization' },
          language: 'TypeScript',
          topics: [],
        },
      ],
      selectedBranch: 'main',
      selectedCommit: branchHeadCommit,
      selectedRepository: {
        id: 'repo-source-001',
        name: 'source-repo',
        fullName: 'source-org/source-repo',
        private: false,
        defaultBranch: 'main',
        url: 'https://github.com/source-org/source-repo',
        cloneUrl: 'https://github.com/source-org/source-repo.git',
        owner: { id: 'source-owner-001', username: 'source-org', type: 'organization' },
        language: 'TypeScript',
        topics: [],
      },
    };
    const snapshot = buildLiveTerminalDepositReadWorkbenchSnapshot(repositoryContext, {
      repositoryFullName: 'source-org/source-repo',
      branch: 'main',
      commit: depositedCommit,
      activityId: 'deposit-run-001',
      createdAt: '2026-05-15T13:43:15.359Z',
    });
    const workbench = normalizeTerminalDepositReadWorkbench(snapshot, repositoryContext);

    expect(workbench?.sourceRevision).toMatchObject({
      repositoryFullName: 'source-org/source-repo',
      branch: 'main',
      commit: depositedCommit,
    });
    expect(workbench?.read.rows.find((row) => row.label === 'Source commit')?.value).toBe(depositedCommit);
    expect(workbench?.fit.rows.find((row) => row.label === 'Source revision')?.value).toBe(
      `source-org/source-repo@main:${depositedCommit.slice(0, 12)}`,
    );
    expect(workbench?.fit.rows.find((row) => row.label === 'Fit result')?.value).toBe('blocked_readiness');
    expect(workbench?.read.summary).toContain(depositedCommit.slice(0, 12));
    expect(workbench?.read.summary).not.toContain(branchHeadCommit.slice(0, 12));
  });
});
