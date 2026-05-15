import { normalizeTerminalSupplySelection } from '@/app/terminal/terminal-supply-selection';

describe('normalizeTerminalSupplySelection', () => {
  it('normalizes auth sessions, filters, and filtered entries from the shell snapshot', () => {
    const selection = normalizeTerminalSupplySelection({
      authSessions: [
        {
          authSessionId: 'session-1',
          repo: 'bitcode/bitcode',
          installationId: 42,
          selected: true,
        },
      ],
      inventory: {
        selectedCount: 2,
        filteredCount: 4,
        totalFilteredEntries: 4,
        searchTerm: 'auth',
        kind: 'patch',
        kindOptions: ['all', 'patch', 'runbook'],
        filteredEntries: [
          {
            inventoryEntryId: 'entry-1',
            title: 'issuer compatibility patch',
            artifactKind: 'patch',
            summary: 'Fixes issuer mismatch in auth rollback.',
            tags: ['auth', 'rollback'],
            selected: true,
          },
        ],
      },
    });

    expect(selection?.selectedAuthSessionId).toBe('session-1');
    expect(selection?.selectedKind).toBe('patch');
    expect(selection?.searchTerm).toBe('auth');
    expect(selection?.filteredEntries[0]?.selected).toBe(true);
    expect(selection?.filteredEntries[0]?.kind).toBe('patch');
  });

  it('returns null for empty snapshots', () => {
    expect(normalizeTerminalSupplySelection(null)).toBeNull();
  });

  it('prefers live repository context over protocol demonstration inventory', () => {
    const selection = normalizeTerminalSupplySelection(
      {
        authSessions: [
          {
            authSessionId: 'gh_inst_bitcode_001',
            repo: 'frontier/demo-auth',
            installationId: 42,
            selected: true,
          },
        ],
        inventory: {
          selectedCount: 1,
          filteredCount: 1,
          totalFilteredEntries: 1,
          kind: 'patch',
          kindOptions: ['all', 'patch'],
          filteredEntries: [
            {
              inventoryEntryId: 'frontier-entry',
              title: 'frontier auth patch',
              artifactKind: 'patch',
              selected: true,
            },
          ],
        },
      },
      {
        provider: 'github',
        connectionStatus: {
          connected: true,
          valid: true,
          provider: 'github',
          username: 'engineeredsoftware',
          metadata: { mock_mode: false, repositories: 1 },
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
            topics: ['ai', 'crypto'],
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
          topics: ['ai', 'crypto'],
        },
      },
    );

    expect(selection?.selectedAuthSessionId).toBe('github:engineeredsoftware:engineeredsoftware/ENGI');
    expect(selection?.filteredEntries).toEqual([
      expect.objectContaining({
        title: 'engineeredsoftware/ENGI',
        selected: true,
        kind: 'repository',
      }),
    ]);
  });
});
