import {
  DEPLOYMENT_STORAGE_CARRIER_IDS,
  DEPLOYMENT_STORAGE_REQUIRED_CARRIER_FIELDS,
  buildDeploymentStorageCarrier,
  buildDeploymentStorageCarrierRows,
  buildDeploymentStorageDriftRepairFixtures,
  buildDeploymentStoragePosture,
} from '../src/deployment-storage-posture';

describe('deployment storage posture', () => {
  it('catalogs ledger-derived state, database projections, object storage, proofs, audit logs, rollback material, and backups', () => {
    const posture = buildDeploymentStoragePosture();

    expect(posture.kind).toBe('bitcode.deployment_storage_posture');
    expect(posture.schemaId).toBe('bitcode.deploymentStoragePosture.v1');
    expect(posture.carrierCount).toBe(8);
    expect(posture.missingCarrierIds).toEqual([]);
    expect(posture.requiredCarrierIds).toEqual([...DEPLOYMENT_STORAGE_CARRIER_IDS].sort());
    expect(posture.observedCarrierIds).toEqual([...DEPLOYMENT_STORAGE_CARRIER_IDS]);
    expect(posture.postureRoot).toMatch(/^deployment-storage-posture:[a-f0-9]{24}$/);
    expect(posture.sourceSafety.sourceSafe).toBe(true);
    expect(posture.sourceSafety.containsSecret).toBe(false);
    expect(posture.sourceSafety.protectedSourceVisible).toBe(false);
  });

  it('requires durability, disclosure, retention, encryption, backup, rollback, root, repair, validation, and proof fields for each storage carrier', () => {
    const posture = buildDeploymentStoragePosture();

    for (const carrier of posture.carriers) {
      for (const field of DEPLOYMENT_STORAGE_REQUIRED_CARRIER_FIELDS) {
        expect(carrier[field]).toBeTruthy();
      }
      expect(carrier.supportedLaneIds).not.toContain('value-bearing-mainnet');
      expect(carrier.requiredRoots.length).toBeGreaterThan(0);
      expect(carrier.proofRootBasis.length).toBeGreaterThan(0);
      expect(carrier.carrierRoot).toMatch(/^deployment-storage-carrier:[a-f0-9]{24}$/);
      expect(carrier.sourceSafety.sourceSafe).toBe(true);
    }
  });

  it('keeps source-bearing AssetPack storage locked before settlement', () => {
    const posture = buildDeploymentStoragePosture();
    const protectedCarriers = posture.carriers.filter(
      (carrier) => carrier.storesProtectedSourcePayload,
    );

    expect(protectedCarriers.map((carrier) => carrier.carrierId)).toEqual([
      'protected_assetpack_object_storage',
      'rollback_material',
      'encrypted_backups',
    ]);
    expect(posture.sourceBearingAssetPackLockedBeforeSettlement).toBe(true);
    expect(
      protectedCarriers.every(
        (carrier) => carrier.preSettlementVisibility === 'blocked_before_settlement',
      ),
    ).toBe(true);
    expect(
      protectedCarriers.every((carrier) => carrier.sourceSafety.protectedSourceVisible === false),
    ).toBe(true);
  });

  it('proves ledger/database and object-storage projection drift repair fixtures', () => {
    const posture = buildDeploymentStoragePosture();

    expect(posture.ledgerDatabaseProjectionDriftRepairable).toBe(true);
    expect(posture.objectStorageProjectionDriftRepairable).toBe(true);
    expect(posture.driftRepairFixtures.map((fixture) => fixture.fixtureId)).toEqual([
      'ledger-database-projection-drift',
      'database-object-storage-projection-drift',
      'unpaid-protected-assetpack-access-attempt',
    ]);

    for (const fixture of posture.driftRepairFixtures) {
      expect(fixture.blocksUnlock).toBe(true);
      expect(fixture.blocksSourceVisibility).toBe(true);
      expect(fixture.detectionRoot).toMatch(/^sha256:/);
      expect(fixture.fixtureRoot).toMatch(/^deployment-storage-drift-repair-fixture:[a-f0-9]{24}$/);
      expect(fixture.proofRootBasis.length).toBeGreaterThan(0);
    }
  });

  it('fails closed when a required deployment storage carrier is missing', () => {
    const carriers = buildDeploymentStorageCarrierRows().filter(
      (carrier) => carrier.carrierId !== 'canonical_database_projection',
    );

    expect(() => buildDeploymentStoragePosture({ carriers })).toThrow(
      /missing carrier ids: canonical_database_projection/,
    );
  });

  it('fails closed on duplicate deployment storage carrier ids', () => {
    const carriers = buildDeploymentStorageCarrierRows();

    expect(() => buildDeploymentStoragePosture({ carriers: [...carriers, carriers[0]] })).toThrow(
      /duplicate carrier ids: ledger_derived_state/,
    );
  });

  it('fails closed when source-bearing AssetPack storage becomes visible before settlement', () => {
    const [protectedCarrier] = buildDeploymentStorageCarrierRows().filter(
      (carrier) => carrier.carrierId === 'protected_assetpack_object_storage',
    );

    expect(() =>
      buildDeploymentStorageCarrier({
        ...protectedCarrier,
        preSettlementVisibility: 'source_safe_roots_only',
      }),
    ).toThrow(/must block source-bearing payload visibility before settlement/);
  });

  it('fails closed when ledger/database drift repair does not block unlock and source visibility', () => {
    const fixtures = buildDeploymentStorageDriftRepairFixtures().map((fixture) =>
      fixture.fixtureId === 'ledger-database-projection-drift'
        ? {
            ...fixture,
            blocksUnlock: false,
          }
        : fixture,
    );

    expect(() => buildDeploymentStoragePosture({ driftRepairFixtures: fixtures })).toThrow(
      /must block unlock and source visibility/,
    );
  });

  it('fails closed when storage posture admits value-bearing mainnet before future canon', () => {
    const [previewCarrier] = buildDeploymentStorageCarrierRows().filter(
      (carrier) => carrier.carrierId === 'source_safe_assetpack_preview_storage',
    );

    expect(() =>
      buildDeploymentStorageCarrier({
        ...previewCarrier,
        supportedLaneIds: [...previewCarrier.supportedLaneIds, 'value-bearing-mainnet'],
      }),
    ).toThrow(/must not admit value-bearing-mainnet/);
  });

  it('fails closed on secret-shaped or non-disclosable source storage text', () => {
    const [firstCarrier] = buildDeploymentStorageCarrierRows();
    const secretShapedText = `${['sk', 'proj'].join('-')}-${'abcdefghijklmnop1234567890'}`;

    expect(() =>
      buildDeploymentStorageCarrier({
        ...firstCarrier,
        retentionClass: secretShapedText,
      }),
    ).toThrow(/must not contain secrets or non-disclosable source/);
  });
});
