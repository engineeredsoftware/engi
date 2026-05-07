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
});
