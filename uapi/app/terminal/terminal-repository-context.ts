import type { VCSProviderType, VCSRepository } from '@bitcode/vcs-core';

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

export function getProviderLabel(provider: VCSProviderType) {
  if (provider === 'gitlab') return 'GitLab';
  if (provider === 'bitbucket') return 'Bitbucket';
  return 'GitHub';
}

export function getRepositoryInventorySourceLabel(
  source: TerminalRepositoryInventorySource | null | undefined,
) {
  if (source === 'stored_repository_inventory') return 'stored Exchange inventory';
  if (source === 'live_provider_inventory') return 'live provider inventory';
  if (source === 'mock_repository_inventory') return 'mock review inventory';
  return 'inventory pending';
}
