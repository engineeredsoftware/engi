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
        email: 'operator@bitcode.exchange',
        is_verified: true,
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
          network: 'testnet',
          private_key: 'wallet-secret',
          connectedAt: '2026-05-21T00:00:00.000Z',
        },
      },
      repositoryConnectionStatus: {
        connected: true,
        valid: true,
        provider: 'github',
        username: 'bitcode',
        scopes: ['repo', 'contents:write'],
        tokenPresenceClass: 'present_source_safe',
        lastReadbackStatus: 'succeeded',
        lastReadbackAt: '2026-05-21T02:00:00.000Z',
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
          readRightState: 'owner_read',
          sourceSafePreviewRoot: 'source-safe-preview-root',
        },
      ],
      modelPreferences: {
        preferred_model: 'gpt-4.1',
        preferred_provider: 'openai',
      },
      templatePreferences: {
        shippable_templates: {
          asset_pack_pr: { label: 'AssetPack PR' },
        },
        evidence_document_templates: {
          witness_summary: { label: 'Witness summary' },
        },
        auto_save_templates: true,
      },
      notificationRows: [
        {
          id: 'notification-1',
          is_read: false,
          created_at: '2026-05-21T01:00:00.000Z',
        },
      ],
      onboardedSteps: ['btd', 'connects', 'profile', 'interfaces'],
    });

    expect(payload.isOnboardingComplete).toBe(true);
    expect(payload.onboardedPanes).toEqual(['wallet', 'externals', 'profile', 'interfaces']);
    expect(payload.organizations).toEqual(['bitcode']);
    expect(payload.profileState.kind).toBe('AuxillariesProfileState');
    expect(payload.profileState.accountIdentity).toMatchObject({
      userId: 'user-1',
      emailVerified: true,
    });
    expect(payload.profileState.preferences.model).toMatchObject({
      configured: true,
      provider: 'openai',
      model: 'gpt-4.1',
    });
    expect(payload.profileState.preferences.templates).toMatchObject({
      configured: true,
      shippableTemplateCount: 1,
      evidenceDocumentTemplateCount: 1,
      autoSaveTemplates: true,
    });
    expect(payload.profileState.notificationPosture).toMatchObject({
      state: 'attention_needed',
      unreadCount: 1,
    });
    expect(payload.profileState.dataSharingPosture).toMatchObject({
      state: 'configured',
      repositoryCount: 1,
      enabledRepositoryCount: 1,
    });
    expect(payload.connectionReadiness[0]).toMatchObject({
      providerId: 'github',
      providerName: 'GitHub',
      provider: 'github',
      connected: true,
      valid: true,
      credentialPosture: 'present_source_safe',
      tokenPresenceClass: 'present_source_safe',
      scopesClass: 'repo_read_write',
      lastReadbackStatus: 'succeeded',
      blocker: null,
      repairAction: 'none',
    });
    expect(payload.walletBtdPaneState.signerPosture).toMatchObject({
      ready: true,
      state: 'verified',
      canSignPsbt: true,
      serverCustody: false,
    });
    expect(payload.walletBtdPaneState.walletCapability).toMatchObject({
      network: 'testnet',
      noCustody: true,
      serverCustody: false,
      capabilities: expect.arrayContaining(['message_sign', 'psbt_sign', 'rights_transfer']),
    });
    expect(payload.walletBtdPaneState.networkReadiness).toMatchObject({
      state: 'ready',
      network: 'testnet',
      blocker: null,
    });
    expect(payload.walletBtdPaneState.btdReadRightSummary).toMatchObject({
      aggregateBtd: 128,
      assetPackCount: 1,
      rangeCount: 1,
      totalRangeCells: 2,
      ownerReadCount: 1,
      protectedSourceVisible: false,
      sourceSafePreviewRoots: ['source-safe-preview-root'],
    });
    expect(payload.walletBtdPaneState.treasurySummary).toMatchObject({
      feeAsset: 'BTC',
      noCustody: true,
      treasuryScope: 'account',
      organizationTreasurySeparated: true,
      exchangeMarketState: 'not_exchange_market_state',
    });
    expect(payload.walletBtdPaneState).toMatchObject({
      settlementReadiness: 'ready',
      settlementBlockers: [],
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
    expect(JSON.stringify(payload.walletBtdPaneState)).not.toContain('asset pack source');
    expect(JSON.stringify(payload.connectionReadiness[0].metadata)).not.toContain('provider-token');
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
      templatePreferences: null,
      notificationRows: [],
      onboardedSteps: [],
    });

    const blockerIds = payload.readinessDiagnostics.map((diagnostic) => diagnostic.blockerId);
    expect(payload.profileState.accountReadiness).toBe('blocked');
    expect(payload.connectionReadiness[0].requiredRepairAction).toBe('connect_provider');
    expect(payload.connectionReadiness[0]).toMatchObject({
      tokenPresenceClass: 'missing',
      scopesClass: 'missing',
      lastReadbackStatus: 'not_attempted',
      blocker: 'connects.github.connect_provider',
    });
    expect(payload.walletBtdPaneState.signerPosture.requiredAction).toBe('connect_wallet');
    expect(blockerIds).toEqual(expect.arrayContaining([
      'profile.missing',
      'profile.identity_missing',
      'preferences.model_missing',
      'preferences.templates_missing',
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
    expect(JSON.stringify(snapshot.recoveryRuns)).not.toContain('access_token');
    expect(JSON.stringify(snapshot.recoveryRuns)).not.toContain('oauth_token');
    expect(validateAuxillariesContractSnapshot({ kind: 'wrong' })).toMatchObject({
      valid: false,
    });
    expect(() => parseAuxillariesContractSnapshot({ kind: 'wrong' })).toThrow(
      /Invalid Auxillaries contract snapshot/,
    );
  });
});
