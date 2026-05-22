import {
  AUXILLARIES_CONTRACT_VERSION,
  assertAuxillariesJsonSafe,
  buildAuxillaryDataPayload,
  buildAuxillariesRecoveryRun,
  normalizeAuxillaryPane,
  parseAuxillariesContractSnapshot,
  toAuxillariesJsonSafe,
  validateAuxillariesContractSnapshot,
} from '../auxillaries-contract';

describe('Auxillaries package route contracts', () => {
  it('builds package-owned Auxillaries state with source-safe route payload compatibility', () => {
    const payload = buildAuxillaryDataPayload({
      profile: {
        id: 'user-1',
        username: 'operator',
        display_name: 'Operator',
        company_name: 'Bitcode',
        role: 'admin',
        wallet_binding: {
          address: 'tb1pauxcontract',
          provider: 'leather',
          status: 'verified',
          boundAt: '2026-05-21T00:00:00.000Z',
        },
        protectedSource: 'never visible to support UI',
        settings: {
          service_role_key: 'service-role-secret',
        },
      },
      githubConnection: {
        provider: 'github',
        login: 'bitcode',
        installationId: 123,
        access_token: 'ghp_secret',
        rawPrompt: 'private prompt body',
      },
      walletConnectionStatus: {
        connected: true,
        valid: true,
        provider: 'leather',
        address: 'tb1pauxcontract',
        verificationState: 'verified',
        metadata: {
          private_key: 'wallet-secret',
          connectedAt: '2026-05-21T00:00:00.000Z',
        },
      },
      repositoryConnectionStatus: {
        connected: true,
        valid: true,
        provider: 'github',
        username: 'bitcode',
        metadata: {
          token: 'provider-token',
        },
      },
      repositories: [
        {
          fullName: 'bitcode/core',
          owner: {
            username: 'bitcode',
            type: 'organization',
          },
          protected_source: 'repository source',
        },
      ],
      repositoryInventorySource: 'stored_repository_inventory',
      btdBalance: 128,
      btcFeeBalance: 0.04,
      recentBtdAssetPacks: [
        {
          assetPackId: 'asset-pack-1',
          rangeStart: 1,
          rangeEndExclusive: 3,
        },
      ],
      modelPreferences: {
        preferred_model: 'gpt-4.1',
      },
      onboardedSteps: ['btd', 'connects', 'profile', 'interfaces'],
    });

    expect(payload.isOnboardingComplete).toBe(true);
    expect(payload.onboardedPanes).toEqual(['wallet', 'externals', 'profile', 'interfaces']);
    expect(payload.organizations).toEqual(['bitcode']);
    expect(payload.profileState.kind).toBe('AuxillariesProfileState');
    expect(payload.connectionReadiness[0]).toMatchObject({
      provider: 'github',
      connected: true,
      valid: true,
      credentialPosture: 'present_source_safe',
    });
    expect(payload.walletBtdPaneState.signerPosture).toMatchObject({
      ready: true,
      state: 'verified',
    });
    expect(payload.organizationAuthority.policyDecision).toBe('allowed');
    expect(payload.auxillariesContract.contractVersion).toBe(AUXILLARIES_CONTRACT_VERSION);
    expect(validateAuxillariesContractSnapshot(payload.auxillariesContract)).toEqual({
      valid: true,
      errors: [],
    });
    expect(parseAuxillariesContractSnapshot(payload.auxillariesContract).contractRoot)
      .toBe(payload.auxillariesContract.contractRoot);
    expect(JSON.stringify(payload)).not.toContain('ghp_secret');
    expect(JSON.stringify(payload)).not.toContain('service-role-secret');
    expect(JSON.stringify(payload)).not.toContain('wallet-secret');
    expect(JSON.stringify(payload)).not.toContain('repository source');
    expect(JSON.stringify(payload)).not.toContain('private prompt body');
    expect(assertAuxillariesJsonSafe(payload)).toBeUndefined();
  });

  it('emits pane diagnostics for incomplete profile, missing provider, and missing wallet state', () => {
    const payload = buildAuxillaryDataPayload({
      profile: null,
      githubConnection: null,
      walletConnectionStatus: null,
      repositoryConnectionStatus: null,
      repositories: [],
      repositoryInventorySource: null,
      btdBalance: 0,
      btcFeeBalance: null,
      recentBtdAssetPacks: [],
      modelPreferences: null,
      onboardedSteps: [],
    });

    const blockerIds = payload.readinessDiagnostics.map((diagnostic) => diagnostic.blockerId);
    expect(payload.profileState.accountReadiness).toBe('blocked');
    expect(payload.connectionReadiness[0].requiredRepairAction).toBe('connect_provider');
    expect(payload.walletBtdPaneState.signerPosture.requiredAction).toBe('connect_wallet');
    expect(blockerIds).toEqual(expect.arrayContaining([
      'profile.missing',
      'profile.identity_missing',
      'connects.github.connect_provider',
      'wallet.binding_missing',
    ]));
    expect(payload.auxillariesContract.contractRoot).toMatch(/^[0-9a-f]{64}$/);
  });

  it('normalizes pane aliases and redacts known secret or protected-source keys', () => {
    const safe = toAuxillariesJsonSafe({
      access_token: 'secret-token',
      privatePrompt: 'reasoning prompt',
      protectedSource: 'asset pack source',
      repositoryInventorySource: 'stored_repository_inventory',
    }) as Record<string, unknown>;

    expect(normalizeAuxillaryPane('connects')).toBe('externals');
    expect(normalizeAuxillaryPane('btd')).toBe('wallet');
    expect(safe.access_token).toBe('[redacted]');
    expect(safe.privatePrompt).toBe('[protected-source-redacted]');
    expect(safe.protectedSource).toBe('[protected-source-redacted]');
    expect(safe.repositoryInventorySource).toBe('stored_repository_inventory');
    expect(() => assertAuxillariesJsonSafe(safe)).not.toThrow();
  });

  it('parses contract snapshots and rejects malformed route contract objects', () => {
    const recoveryRun = buildAuxillariesRecoveryRun({
      targetPane: 'externals',
      repairAction: 'reauthorize_provider',
      beforeReadinessRoot: 'before-root',
      afterReadinessRoot: 'after-root',
      executionId: 'execution-1',
      outcome: 'succeeded',
    });
    const payload = buildAuxillaryDataPayload({
      profile: { id: 'user-2', username: 'reviewer' },
      githubConnection: { provider: 'github' },
      walletConnectionStatus: null,
      repositoryConnectionStatus: { connected: false, valid: false, provider: 'github' },
      repositories: [],
      repositoryInventorySource: null,
      btdBalance: 0,
      btcFeeBalance: null,
      recentBtdAssetPacks: [],
      modelPreferences: null,
      onboardedSteps: ['profile'],
    });
    const snapshot = {
      ...payload.auxillariesContract,
      recoveryRuns: [recoveryRun],
    };

    expect(parseAuxillariesContractSnapshot(snapshot).recoveryRuns[0].recoveryRoot)
      .toMatch(/^[0-9a-f]{64}$/);
    expect(validateAuxillariesContractSnapshot({ kind: 'wrong' })).toMatchObject({
      valid: false,
    });
    expect(() => parseAuxillariesContractSnapshot({ kind: 'wrong' })).toThrow(
      /Invalid Auxillaries contract snapshot/,
    );
  });
});
