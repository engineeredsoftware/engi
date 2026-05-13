import {
  buildTerminalLiveSummary,
  buildTerminalReadinessSummary,
  normalizeTerminalLiveSummary,
} from '@/app/terminal/terminal-live-summary';

describe('normalizeTerminalLiveSummary', () => {
  it('normalizes summary items from the shell summary bridge', () => {
    const items = normalizeTerminalLiveSummary({
      summarySurface: [
        { label: 'Active scenario', value: 'monorepo-auth-rollback' },
        { label: 'Branch mode', value: 'patch' },
        { label: 'Projection', value: 'buyer' },
        { label: 'Visible proof families', value: '4' },
      ],
    });

    expect(items).toEqual([
      { label: 'Active scenario', value: 'monorepo-auth-rollback' },
      { label: 'Branch mode', value: 'patch' },
      { label: 'Projection', value: 'buyer' },
      { label: 'Visible proof families', value: '4' },
    ]);
  });

  it('ignores empty labels and fills empty values', () => {
    const items = normalizeTerminalLiveSummary({
      summarySurface: [
        { label: '', value: 'ignored' },
        { label: 'Blocking external interfaces', value: '' },
      ],
    });

    expect(items).toEqual([{ label: 'Blocking external interfaces', value: '—' }]);
  });

  it('builds explicit Terminal readiness items for reconnect-required repository and settlement posture', () => {
    const items = buildTerminalReadinessSummary({
      transactionReadiness: {
        label: 'wallet reconnect required',
        canTransact: true,
        canSettle: false,
      },
      repositoryContext: {
        provider: 'github',
        connectionStatus: {
          connected: true,
          provider: 'github',
          valid: false,
        },
        inventorySource: 'stored_repository_inventory',
        selectedRepository: {
          id: 'repo-1',
          name: 'bitcode',
          fullName: 'bitcode/bitcode',
          owner: {
            id: 'org-1',
            username: 'bitcode',
          },
        } as any,
      },
    });

    expect(items).toEqual([
      { label: 'Settlement posture', value: 'wallet reconnect required' },
      { label: 'Repository posture', value: 'GitHub reconnect required · stored protocol inventory' },
      { label: 'Repository anchor', value: 'bitcode/bitcode' },
    ]);
  });

  it('merges readiness items ahead of the shell summary bridge without duplicating labels', () => {
    const items = buildTerminalLiveSummary(
      {
        summarySurface: [
          { label: 'Settlement posture', value: 'stale shell value' },
          { label: 'Active scenario', value: 'monorepo-auth-rollback' },
        ],
      },
      {
        transactionReadiness: {
          label: 'repository reconnect required',
          canTransact: false,
          canSettle: false,
        },
        repositoryContext: {
          provider: 'github',
          connectionStatus: {
            connected: false,
            provider: 'github',
            valid: false,
          },
          inventorySource: null,
          selectedRepository: null,
        },
      },
    );

    expect(items).toEqual([
      { label: 'Settlement posture', value: 'repository reconnect required' },
      { label: 'Repository posture', value: 'GitHub pending' },
      { label: 'Repository anchor', value: 'anchor pending' },
      { label: 'Active scenario', value: 'monorepo-auth-rollback' },
    ]);
  });
});
