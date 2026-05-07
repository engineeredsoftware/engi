type ShellSnapshot = {
  authSessions?: Array<{
    authSessionId?: string | null;
    repo?: string | null;
    installationId?: string | number | null;
    installationAccountLogin?: string | null;
    selected?: boolean | null;
  }> | null;
  inventory?: {
    selectedCount?: number | null;
    filteredCount?: number | null;
    totalFilteredEntries?: number | null;
    searchTerm?: string | null;
    kind?: string | null;
    kindOptions?: string[] | null;
    filteredEntries?: Array<{
      inventoryEntryId?: string | null;
      title?: string | null;
      artifactKind?: string | null;
      originKind?: string | null;
      sourcePath?: string | null;
      summary?: string | null;
      tags?: string[] | null;
      selected?: boolean | null;
    }> | null;
  } | null;
} | null;

export type TerminalSupplySelectionState = {
  authSessions: { value: string; label: string; selected: boolean }[];
  selectedAuthSessionId: string;
  kindOptions: { value: string; label: string; selected: boolean }[];
  selectedKind: string;
  searchTerm: string;
  selectedCount: number;
  filteredCount: number;
  totalFilteredEntries: number;
  filteredEntries: Array<{
    id: string;
    title: string;
    subtitle: string;
    kind: string;
    selected: boolean;
    tags: string[];
  }>;
};

function labelize(value: string) {
  return value
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ');
}

export function normalizeTerminalSupplySelection(snapshot: ShellSnapshot): TerminalSupplySelectionState | null {
  if (!snapshot) return null;

  const authSessions = (snapshot.authSessions || [])
    .map((session) => {
      const value = String(session.authSessionId || '').trim();
      if (!value) return null;
      return {
        value,
        label: `${String(session.repo || 'repo')} · ${String(session.installationId || 'installation')}`,
        selected: Boolean(session.selected),
      };
    })
    .filter((entry): entry is { value: string; label: string; selected: boolean } => Boolean(entry));

  const kindOptions = (snapshot.inventory?.kindOptions || [])
    .map((value) => String(value || '').trim())
    .filter(Boolean)
    .map((value) => ({
      value,
      label: value === 'all' ? 'All artifact kinds' : labelize(value),
      selected: value === String(snapshot.inventory?.kind || 'all'),
    }));

  return {
    authSessions,
    selectedAuthSessionId: authSessions.find((entry) => entry.selected)?.value || authSessions[0]?.value || '',
    kindOptions,
    selectedKind: String(snapshot.inventory?.kind || 'all'),
    searchTerm: String(snapshot.inventory?.searchTerm || ''),
    selectedCount: typeof snapshot.inventory?.selectedCount === 'number' ? snapshot.inventory.selectedCount : 0,
    filteredCount: typeof snapshot.inventory?.filteredCount === 'number' ? snapshot.inventory.filteredCount : 0,
    totalFilteredEntries:
      typeof snapshot.inventory?.totalFilteredEntries === 'number'
        ? snapshot.inventory.totalFilteredEntries
        : typeof snapshot.inventory?.filteredCount === 'number'
          ? snapshot.inventory.filteredCount
          : 0,
    filteredEntries: (snapshot.inventory?.filteredEntries || [])
      .map((entry) => {
        const id = String(entry.inventoryEntryId || '').trim();
        if (!id) return null;
        const title =
          String(entry.title || '').trim() ||
          String(entry.sourcePath || '').trim() ||
          id;
        return {
          id,
          title,
          subtitle: String(entry.summary || entry.sourcePath || '').trim(),
          kind: String(entry.artifactKind || entry.originKind || 'artifact'),
          selected: Boolean(entry.selected),
          tags: (entry.tags || []).map((tag) => String(tag || '').trim()).filter(Boolean),
        };
      })
      .filter(
        (
          entry,
        ): entry is {
          id: string;
          title: string;
          subtitle: string;
          kind: string;
          selected: boolean;
          tags: string[];
        } => Boolean(entry),
      ),
  };
}
