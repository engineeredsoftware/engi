import { normalizeApplicationDepositComposer } from '@/app/application/application-deposit-composer';

describe('normalizeApplicationDepositComposer', () => {
  it('normalizes selected inventory and auth-session defaults from the shell snapshot', () => {
    const state = normalizeApplicationDepositComposer({
      selection: {
        authSessionId: 'session-1',
        selectedInventoryEntryIds: ['entry-1', 'entry-2'],
      },
      authSession: {
        authSessionId: 'session-1',
        repo: 'bitcode/bitcode',
        defaultSignerAddress: 'bc1qbitcode',
      },
      inventory: {
        selectedEntries: [
          {
            inventoryEntryId: 'entry-1',
            title: 'rollback runbook',
            artifactKind: 'runbook',
            sourcePath: '.engi/runbooks/rollback.md',
          },
          {
            inventoryEntryId: 'entry-2',
            title: 'issuer patch',
            artifactKind: 'patch',
            sourcePath: 'src/auth/issuer.ts',
          },
        ],
      },
    });

    expect(state?.authSessionId).toBe('session-1');
    expect(state?.sourceRepo).toBe('bitcode/bitcode');
    expect(state?.signerAddress).toBe('bc1qbitcode');
    expect(state?.selectedCount).toBe(2);
    expect(state?.selectedEntries[0]?.title).toBe('rollback runbook');
  });

  it('returns null for empty snapshots', () => {
    expect(normalizeApplicationDepositComposer(null)).toBeNull();
  });
});
