import type { TerminalRepositoryContextState } from './terminal-repository-context';
import {
  deriveBitcodeTransactionReadiness,
  type BitcodeTransactionReadiness,
} from './bitcode-transaction-readiness';

type TerminalRepositoryConnectionSnapshot = {
  connected?: boolean;
  valid?: boolean;
} | null;

export type TerminalTransactionReadinessSource =
  | 'route_repository_context'
  | 'auxillaries_reread'
  | 'connection_presence_fallback';

export type TerminalTransactionReadinessDerivation = {
  readiness: BitcodeTransactionReadiness;
  repositoryReadinessSource: TerminalTransactionReadinessSource;
};

type TerminalTransactionReadinessSourceInput = {
  signedIn: boolean;
  repositoryContext?: Pick<TerminalRepositoryContextState, 'connectionStatus' | 'selectedRepository'> | null;
  repositoryConnectionStatus?: TerminalRepositoryConnectionSnapshot;
  hasRepositoryProviderAttachment: boolean;
  hasValidRepositoryProviderAttachment: boolean;
  hasWalletBinding: boolean;
  hasVerifiedWalletBinding: boolean;
  hasStoredVerifiedWalletBinding: boolean;
};

function resolveRepositoryProviderState(
  input: TerminalTransactionReadinessSourceInput,
): Pick<
  TerminalTransactionReadinessDerivation,
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

export function deriveTerminalTransactionReadiness(
  input: TerminalTransactionReadinessSourceInput,
): TerminalTransactionReadinessDerivation {
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
