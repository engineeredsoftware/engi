import type { VCSBranch, VCSCommit, VCSProviderType, VCSRepository } from '@bitcode/vcs-core';

export type TerminalRepositoryInventorySource =
  | 'stored_repository_inventory'
  | 'live_provider_inventory'
  | 'mock_repository_inventory';

export type TerminalRepositoryConnectionStatus = {
  connected: boolean;
  provider: VCSProviderType;
  valid: boolean;
  username?: string;
  instanceUrl?: string;
  metadata?: {
    repositories?: number;
    account?: string;
    status?: string;
    mock_mode?: boolean;
    supported?: boolean;
  };
};

export type TerminalRepositoryContextState = {
  provider: VCSProviderType;
  connectionStatus: TerminalRepositoryConnectionStatus | null;
  inventorySource: TerminalRepositoryInventorySource | null;
  repositories: VCSRepository[];
  selectedRepository: VCSRepository | null;
  branches?: VCSBranch[];
  commits?: VCSCommit[];
  defaultBranch?: string | null;
  selectedBranch?: string | null;
  selectedCommit?: string | null;
  isLoadingBranches?: boolean;
  isLoadingCommits?: boolean;
  sourceSelectionError?: string | null;
};

export const TERMINAL_REPOSITORY_PROVIDERS: VCSProviderType[] = ['github', 'gitlab', 'bitbucket'];

export function normalizeRepositoryProvider(value?: string | null): VCSProviderType {
  return TERMINAL_REPOSITORY_PROVIDERS.includes(value as VCSProviderType)
    ? (value as VCSProviderType)
    : 'github';
}

export function deriveSelectedRepository(
  repositories: VCSRepository[],
  requestedRepository?: string | null,
  preferredRepository?: string | null,
) {
  if (!repositories.length) return null;

  const byRequested =
    requestedRepository &&
    repositories.find(
      (repository) =>
        repository.fullName === requestedRepository ||
        repository.id === requestedRepository ||
        repository.name === requestedRepository,
    );
  if (byRequested) return byRequested;

  const byPreferred =
    preferredRepository &&
    repositories.find(
      (repository) =>
        repository.fullName === preferredRepository ||
        repository.id === preferredRepository ||
        repository.name === preferredRepository,
    );
  if (byPreferred) return byPreferred;

  return repositories[0];
}

export function deriveSelectedBranch(
  branches: VCSBranch[],
  requestedBranch?: string | null,
  preferredBranch?: string | null,
) {
  if (!branches.length) return null;

  const normalizedRequestedBranch = requestedBranch?.trim();
  const byRequested =
    normalizedRequestedBranch &&
    branches.find((branch) => branch.name === normalizedRequestedBranch);
  if (byRequested) return byRequested.name;

  const normalizedPreferredBranch = preferredBranch?.trim();
  const byPreferred =
    normalizedPreferredBranch &&
    branches.find((branch) => branch.name === normalizedPreferredBranch);
  if (byPreferred) return byPreferred.name;

  return branches[0]?.name || null;
}

export function deriveSelectedCommit(
  commits: VCSCommit[],
  requestedCommit?: string | null,
) {
  if (!commits.length) return null;

  const normalizedRequestedCommit = requestedCommit?.trim();
  const byRequested =
    normalizedRequestedCommit &&
    commits.find((commit) => commit.sha === normalizedRequestedCommit);
  if (byRequested) return byRequested.sha;

  return commits[0]?.sha || null;
}

export function getProviderLabel(provider: VCSProviderType) {
  if (provider === 'gitlab') return 'GitLab';
  if (provider === 'bitbucket') return 'Bitbucket';
  return 'GitHub';
}

export function getRepositoryInventorySourceLabel(
  source: TerminalRepositoryInventorySource | null | undefined,
) {
  if (source === 'stored_repository_inventory') return 'stored protocol inventory';
  if (source === 'live_provider_inventory') return 'live provider inventory';
  if (source === 'mock_repository_inventory') return 'mock review inventory';
  return 'inventory pending';
}
