import type { ApplicationRepositoryContextState } from './application-repository-context';
import {
  deriveBitcodeTransactionReadiness,
  type BitcodeTransactionReadiness,
} from './bitcode-transaction-readiness';

type ApplicationRepositoryConnectionSnapshot = {
  connected?: boolean;
  valid?: boolean;
} | null;

export type ApplicationTransactionReadinessSource =
  | 'route_repository_context'
  | 'auxillaries_reread'
  | 'connection_presence_fallback';

export type ApplicationTransactionReadinessDerivation = {
  readiness: BitcodeTransactionReadiness;
  repositoryReadinessSource: ApplicationTransactionReadinessSource;
};

type ApplicationTransactionReadinessSourceInput = {
  signedIn: boolean;
  repositoryContext?: Pick<ApplicationRepositoryContextState, 'connectionStatus' | 'selectedRepository'> | null;
  repositoryConnectionStatus?: ApplicationRepositoryConnectionSnapshot;
  hasRepositoryProviderAttachment: boolean;
  hasValidRepositoryProviderAttachment: boolean;
  hasWalletBinding: boolean;
  hasVerifiedWalletBinding: boolean;
  hasStoredVerifiedWalletBinding: boolean;
};

function resolveRepositoryProviderState(
  input: ApplicationTransactionReadinessSourceInput,
): Pick<
  ApplicationTransactionReadinessDerivation,
  'repositoryReadinessSource'
> & {
  hasRepositoryProvider: boolean;
  hasValidRepositoryProvider: boolean;
} {
  if (input.repositoryContext?.connectionStatus) {
    const connected = Boolean(input.repositoryContext.connectionStatus.connected);
    return {
      repositoryReadinessSource: 'route_repository_context',
      hasRepositoryProvider: connected,
      hasValidRepositoryProvider: connected && Boolean(input.repositoryContext.connectionStatus.valid),
    };
  }

  if (input.repositoryConnectionStatus) {
    const connected = Boolean(input.repositoryConnectionStatus.connected);
    return {
      repositoryReadinessSource: 'auxillaries_reread',
      hasRepositoryProvider: connected,
      hasValidRepositoryProvider: connected && Boolean(input.repositoryConnectionStatus.valid),
    };
  }

  return {
    repositoryReadinessSource: 'connection_presence_fallback',
    hasRepositoryProvider: Boolean(input.hasRepositoryProviderAttachment),
    hasValidRepositoryProvider: Boolean(input.hasValidRepositoryProviderAttachment),
  };
}

export function deriveApplicationTransactionReadiness(
  input: ApplicationTransactionReadinessSourceInput,
): ApplicationTransactionReadinessDerivation {
  const repositoryProviderState = resolveRepositoryProviderState(input);

  return {
    repositoryReadinessSource: repositoryProviderState.repositoryReadinessSource,
    readiness: deriveBitcodeTransactionReadiness({
      signedIn: input.signedIn,
      hasRepositoryProvider: repositoryProviderState.hasRepositoryProvider,
      hasValidRepositoryProvider: repositoryProviderState.hasValidRepositoryProvider,
      hasWalletBinding: input.hasWalletBinding,
      hasVerifiedWalletBinding: input.hasVerifiedWalletBinding,
      hasStoredVerifiedWalletBinding: input.hasStoredVerifiedWalletBinding,
      requiresRepositoryAnchor: true,
      hasRepositoryAnchor: Boolean(input.repositoryContext?.selectedRepository),
    }),
  };
}
