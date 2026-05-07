import { normalizeTerminalGiveNeedWorkbench } from '@/app/terminal/terminal-give-need-workbench';

describe('normalizeTerminalGiveNeedWorkbench', () => {
  it('builds give, need, and fit sections from the shell snapshot', () => {
    const workbench = normalizeTerminalGiveNeedWorkbench(
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
        needingSurface: {
          parserKind: 'benchmark-parser',
          needSummary: 'Recover enterprise auth rollback safely.',
          closureCriteria: ['session validity restored', 'audit receipt emitted'],
          failureModes: ['issuer mismatch', 'session invalidation'],
          targetArtifactKinds: ['runbook', 'patch'],
        },
        fitSurface: {
          fitSummary: 'Preview overlap in runbook, patch against the active need.',
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
    expect(workbench?.give.rows.find((row) => row.label === 'Repository')?.value).toBe('bitcode/bitcode');
    expect(workbench?.need.rows.find((row) => row.label === 'Parser')?.value).toBe('benchmark-parser');
    expect(workbench?.fit.metrics.find((metric) => metric.label === 'Pressure')?.value).toBe('low');
    expect(workbench?.give.selectedEntries).toHaveLength(2);
  });

  it('falls back safely when the shell snapshot is sparse', () => {
    const workbench = normalizeTerminalGiveNeedWorkbench({
      selection: { projectionPrincipal: 'public', branchMode: 'context' },
      repoSupplySummary: { repoCount: 0, inventoryEntryCount: 0, scenarioCount: 0, candidateAssetCount: 0 },
      inventory: { activeCount: 0, filteredCount: 0, selectedCount: 0, selectedEntries: [] },
    });

    expect(workbench?.scenarioLabel).toBe('No active scenario');
    expect(workbench?.give.metrics.find((metric) => metric.label === 'Selected refs')?.value).toBe('0');
    expect(workbench?.fit.rows.find((row) => row.label === 'Projection')?.value).toBe('public');
  });
});
