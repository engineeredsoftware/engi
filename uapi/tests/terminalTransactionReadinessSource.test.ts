import { deriveTerminalTransactionReadiness } from '@/app/terminal/terminal-transaction-readiness-source';

describe('deriveTerminalTransactionReadiness', () => {
  it('prefers route-local repository truth over stale auxillary connection fallback', () => {
    const result = deriveTerminalTransactionReadiness({
      signedIn: true,
      repositoryContext: {
        connectionStatus: {
          connected: true,
          provider: 'github',
          valid: false,
        },
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
      repositoryConnectionStatus: {
        connected: true,
        valid: true,
      },
      hasRepositoryProviderAttachment: true,
      hasValidRepositoryProviderAttachment: true,
      hasWalletBinding: true,
      hasVerifiedWalletBinding: true,
      hasStoredVerifiedWalletBinding: true,
    });

    expect(result.repositoryReadinessSource).toBe('route_repository_context');
    expect(result.readiness.label).toBe('repository reconnect required');
    expect(result.readiness.canTransact).toBe(false);
    expect(result.readiness.canSettle).toBe(false);
  });

  it('uses auxillary reread truth before weak connection-presence fallback', () => {
    const result = deriveTerminalTransactionReadiness({
      signedIn: true,
      repositoryContext: null,
      repositoryConnectionStatus: {
        connected: true,
        valid: false,
      },
      hasRepositoryProviderAttachment: true,
      hasValidRepositoryProviderAttachment: true,
      hasWalletBinding: true,
      hasVerifiedWalletBinding: true,
      hasStoredVerifiedWalletBinding: true,
    });

    expect(result.repositoryReadinessSource).toBe('auxillaries_reread');
    expect(result.readiness.label).toBe('repository reconnect required');
    expect(result.readiness.canTransact).toBe(false);
  });

  it('falls back to connection-presence booleans only when richer repository carriers are absent', () => {
    const result = deriveTerminalTransactionReadiness({
      signedIn: true,
      repositoryContext: {
        connectionStatus: null,
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
      repositoryConnectionStatus: null,
      hasRepositoryProviderAttachment: true,
      hasValidRepositoryProviderAttachment: true,
      hasWalletBinding: true,
      hasVerifiedWalletBinding: false,
      hasStoredVerifiedWalletBinding: false,
    });

    expect(result.repositoryReadinessSource).toBe('connection_presence_fallback');
    expect(result.readiness.label).toBe('wallet verification pending');
    expect(result.readiness.canTransact).toBe(true);
    expect(result.readiness.canSettle).toBe(false);
  });
});
