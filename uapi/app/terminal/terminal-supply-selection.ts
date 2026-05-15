import type { TerminalRepositoryContextState } from './terminal-repository-context';
import { getProviderLabel } from './terminal-repository-context';

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

function shouldUseRepositoryContext(repositoryContext?: TerminalRepositoryContextState | null) {
  return Boolean(
    repositoryContext?.selectedRepository &&
      repositoryContext.repositories.length > 0 &&
      !repositoryContext.connectionStatus?.metadata?.mock_mode,
  );
}

function repositoryMatchesSearch(
  repository: TerminalRepositoryContextState['repositories'][number],
  normalizedSearchTerm: string,
) {
  if (!normalizedSearchTerm) return true;

  return [
    repository.fullName,
    repository.name,
    repository.language,
    repository.owner.username,
    repository.defaultBranch,
    ...(repository.topics || []),
  ]
    .map((value) => String(value || '').toLowerCase())
    .some((value) => value.includes(normalizedSearchTerm));
}

export function normalizeTerminalRepositorySupplySelection(
  repositoryContext?: TerminalRepositoryContextState | null,
  searchTerm = '',
): TerminalSupplySelectionState | null {
  if (!shouldUseRepositoryContext(repositoryContext)) return null;

  const selectedRepository = repositoryContext?.selectedRepository || null;
  const providerLabel = getProviderLabel(repositoryContext?.provider || 'github');
  const providerAccount =
    repositoryContext?.connectionStatus?.username ||
    repositoryContext?.connectionStatus?.metadata?.account ||
    selectedRepository?.owner.username ||
    'connected account';
  const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  const filteredRepositories = (repositoryContext?.repositories || []).filter((repository) =>
    repositoryMatchesSearch(repository, normalizedSearchTerm),
  );
  const selectedCount = selectedRepository ? 1 : 0;

  return {
    authSessions: [
      {
        value: `${repositoryContext?.provider || 'github'}:${providerAccount}:${selectedRepository?.fullName || 'repository'}`,
        label: `${selectedRepository?.fullName || providerAccount} · ${providerLabel}`,
        selected: true,
      },
    ],
    selectedAuthSessionId: `${repositoryContext?.provider || 'github'}:${providerAccount}:${selectedRepository?.fullName || 'repository'}`,
    kindOptions: [
      { value: 'all', label: 'All supply', selected: false },
      { value: 'repository', label: 'Repository', selected: true },
    ],
    selectedKind: 'repository',
    searchTerm,
    selectedCount,
    filteredCount: filteredRepositories.length,
    totalFilteredEntries: repositoryContext?.repositories.length || filteredRepositories.length,
    filteredEntries: filteredRepositories.map((repository) => {
      const isSelected = repository.fullName === selectedRepository?.fullName;
      const visibility = repository.private ? 'private' : 'public';
      const language = repository.language || 'source';
      const defaultBranch = repository.defaultBranch || 'main';

      return {
        id: `repository:${repository.id}`,
        title: repository.fullName,
        subtitle: `${language} repository · ${defaultBranch} · ${visibility}`,
        kind: 'repository',
        selected: isSelected,
        tags: [
          providerLabel,
          visibility,
          defaultBranch,
          language,
          ...(repository.topics || []),
        ]
          .map((tag) => String(tag || '').trim())
          .filter(Boolean)
          .slice(0, 6),
      };
    }),
  };
}

export function normalizeTerminalSupplySelection(
  snapshot: ShellSnapshot,
  repositoryContext?: TerminalRepositoryContextState | null,
  searchTerm = '',
): TerminalSupplySelectionState | null {
  const repositorySelection = normalizeTerminalRepositorySupplySelection(repositoryContext, searchTerm);
  if (repositorySelection) return repositorySelection;
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
