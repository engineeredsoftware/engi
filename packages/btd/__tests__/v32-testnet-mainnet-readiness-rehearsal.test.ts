import { buildV32TestnetMainnetReadinessRehearsal } from '../src/testnet-mainnet-readiness-rehearsal';

describe('V32 Gate 8 testnet and mainnet readiness rehearsal', () => {
  it('represents every readiness lane with typed source-safe records', () => {
    const rehearsal = buildV32TestnetMainnetReadinessRehearsal();

    expect(rehearsal.kind).toBe('btd.v32_testnet_mainnet_readiness_rehearsal');
    expect(rehearsal.lanes.map((lane) => lane.laneId)).toEqual([
      'local',
      'staging-testnet',
      'production-mainnet',
      'offline-disabled',
    ]);
    expect(rehearsal.summary).toMatchObject({
      laneCount: 4,
      readyLaneCount: 2,
      blockedLaneCount: 1,
      disabledLaneCount: 1,
      productionMainnetValueBearingAdmitted: false,
    });
  });

  it('classifies secret presence without serializing credential values', () => {
    const rehearsal = buildV32TestnetMainnetReadinessRehearsal();
    const staging = rehearsal.lanes.find((lane) => lane.laneId === 'staging-testnet');

    expect(rehearsal.sourceSafety).toEqual({
      secretValuesSerialized: false,
      protectedSourceSerialized: false,
      rawProviderPayloadsSerialized: false,
      readinessClass: 'secret-presence-only',
    });
    expect(staging?.databasePosture).toContain('tkpyosihuouusyaxtbau');
    expect(staging?.requirements).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          requirementId: 'staging-supabase-project',
          secretClass: 'supabase-admin-credential',
          present: true,
          valueSerialized: false,
        }),
        expect.objectContaining({
          requirementId: 'staging-model-provider',
          secretClass: 'model-provider-key',
          present: true,
          valueSerialized: false,
        }),
      ]),
    );
    expect(JSON.stringify(rehearsal)).not.toContain('"secretValue":');
  });

  it('keeps production-mainnet value-bearing settlement blocked in V32', () => {
    const rehearsal = buildV32TestnetMainnetReadinessRehearsal();
    const production = rehearsal.lanes.find((lane) => lane.laneId === 'production-mainnet');

    expect(production).toMatchObject({
      network: 'mainnet',
      state: 'blocked',
      valueBearingSettlementRequested: true,
      valueBearingSettlementAdmitted: false,
      requiredApprovalState: 'blocked-until-future-launch-gate',
      protectedSourceBoundary: 'protected-source-locked',
    });
    expect(production?.databasePosture).toContain('rinalyjfecxnmyczrpzo');
    expect(production?.blockers).toContain('production-mainnet-value-bearing-not-admitted-in-v32');
    expect(production?.providers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ providerId: 'bitcoin-mainnet-observer', state: 'review' }),
        expect.objectContaining({ providerId: 'github-delivery', state: 'blocked' }),
      ]),
    );
  });

  it('keeps disabled/offline rehearsal fixture-only', () => {
    const rehearsal = buildV32TestnetMainnetReadinessRehearsal();
    const offline = rehearsal.lanes.find((lane) => lane.laneId === 'offline-disabled');

    expect(offline).toMatchObject({
      state: 'disabled',
      network: 'offline',
      ledgerNetwork: 'offline',
      protectedSourceBoundary: 'offline-no-source',
      requiredApprovalState: 'disabled',
    });
    expect(offline?.providers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ providerId: 'external-network', state: 'disabled' }),
        expect.objectContaining({ providerId: 'wallet-broadcast', state: 'disabled' }),
      ]),
    );
  });
});
