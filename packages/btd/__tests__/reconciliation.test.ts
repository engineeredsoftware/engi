import {
  buildSupabaseStagingTestnetProjectionReadback,
  reconcileLedgerDatabaseProjection,
} from '../src';

const issuedAt = '2026-05-21T00:00:00.000Z';

describe('BTD ledger projection reconciliation', () => {
  it('keeps ledger, database, object-storage, and private facts distinct when aligned', () => {
    const readback = buildSupabaseStagingTestnetProjectionReadback({
      readbackId: 'readback-aligned-1',
      lane: 'staging-testnet',
      supabaseProjectRef: 'tkpyosihuouusyaxtbau',
      restHost: 'tkpyosihuouusyaxtbau.supabase.co',
      databaseHost: 'db.tkpyosihuouusyaxtbau.supabase.co',
      adminCredentialState: 'provided_out_of_band',
      tableReadbacks: [
        {
          table: 'btd_asset_pack_ranges',
          expectedCount: 1,
          observedCount: 1,
          synchronized: true,
        },
      ],
      issuedAt,
    });
    const report = reconcileLedgerDatabaseProjection({
      reconciliationId: 'reconciliation-aligned-1',
      ledgerFacts: [
        {
          factId: 'asset-pack-aligned-1',
          ledgerRoot: 'sha256:ledger-root',
          finalityState: 'confirmed',
        },
      ],
      databaseFacts: [
        {
          factId: 'asset-pack-aligned-1',
          projectedLedgerRoot: 'sha256:ledger-root',
          projectedFinalityState: 'confirmed',
          projectedObjectStorageRoot: 'sha256:storage-root',
        },
      ],
      objectStorageArtifacts: [
        {
          factId: 'asset-pack-aligned-1',
          artifactId: 'artifact-aligned-1',
          artifactKind: 'asset_pack_source_safe_preview',
          storageRoot: 'sha256:storage-root',
          manifestRoot: 'sha256:manifest-root',
          sourceVisibility: 'source_safe',
          durable: true,
          containsProtectedSource: false,
          encrypted: false,
        },
      ],
      metaphysicalFacts: [
        {
          factId: 'private-source-aligned-1',
          factKind: 'private_source_metadata',
          canonicalRoot: 'sha256:private-root',
          private: true,
        },
      ],
      stagingTestnetReadback: readback,
      issuedAt,
    });

    expect(report.state).toBe('aligned');
    expect(report.objectStorageArtifacts).toHaveLength(1);
    expect(report.metaphysicalFacts[0].private).toBe(true);
    expect(report.stagingTestnetReadback).toMatchObject({
      state: 'synchronized',
      secretValuesStored: false,
      supabaseProjectRef: 'tkpyosihuouusyaxtbau',
    });
    expect(report.proofRoots.objectStorageRoot).toMatch(/^btd-proof-root:object-storage-artifacts:/);
    expect(report.proofRoots.stagingTestnetReadbackRoot).toBe(readback.proofRoot);
  });

  it('classifies missing object-storage artifacts as retryable repair actions that block unlock', () => {
    const report = reconcileLedgerDatabaseProjection({
      reconciliationId: 'reconciliation-storage-missing-1',
      ledgerFacts: [],
      databaseFacts: [],
      objectStorageArtifacts: [
        {
          factId: 'artifact-missing-1',
          artifactId: 'artifact-missing-1',
          artifactKind: 'pipeline_evidence',
          storageRoot: 'sha256:artifact-root',
          sourceVisibility: 'proof_public',
          durable: false,
          containsProtectedSource: false,
          encrypted: false,
        },
      ],
      issuedAt,
    });

    expect(report.state).toBe('repairable');
    expect(report.blocking).toBe(true);
    expect(report.repairs[0]).toMatchObject({
      repairKind: 'object_storage_artifact',
      driftKind: 'missing_object_storage_artifact',
      repairActionKind: 'retry_object_storage_write',
      blocking: true,
      requiresOperatorApproval: false,
    });
    expect(report.repairActions[0].summary).toContain('Retry object-storage artifact write');
  });

  it('quarantines database projections whose object-storage artifact root disagrees', () => {
    const report = reconcileLedgerDatabaseProjection({
      reconciliationId: 'reconciliation-storage-root-mismatch-1',
      ledgerFacts: [],
      databaseFacts: [
        {
          factId: 'artifact-root-mismatch-1',
          projectedLedgerRoot: 'sha256:ledger-root',
          projectedFinalityState: 'prepared',
          projectedObjectStorageRoot: 'sha256:database-storage-root',
        },
      ],
      objectStorageArtifacts: [
        {
          factId: 'artifact-root-mismatch-1',
          artifactId: 'artifact-root-mismatch-1',
          artifactKind: 'delivery_manifest',
          storageRoot: 'sha256:artifact-storage-root',
          sourceVisibility: 'proof_public',
          durable: true,
          containsProtectedSource: false,
          encrypted: false,
        },
      ],
      issuedAt,
    });

    expect(report.state).toBe('approval_required');
    expect(report.repairs[0]).toMatchObject({
      driftKind: 'object_storage_root_mismatch',
      repairActionKind: 'quarantine_object_storage_artifact',
      requiresOperatorApproval: true,
    });
  });

  it('blocks staging-testnet readback without storing Supabase secrets', () => {
    const readback = buildSupabaseStagingTestnetProjectionReadback({
      readbackId: 'readback-blocked-1',
      lane: 'staging-testnet',
      supabaseProjectRef: 'tkpyosihuouusyaxtbau',
      restHost: 'tkpyosihuouusyaxtbau.supabase.co',
      adminCredentialState: 'missing',
      tableReadbacks: [
        {
          table: 'btd_terminal_journal_entries',
          expectedCount: 4,
          observedCount: 3,
          synchronized: false,
        },
      ],
      issuedAt,
    });
    const report = reconcileLedgerDatabaseProjection({
      reconciliationId: 'reconciliation-readback-blocked-1',
      ledgerFacts: [],
      databaseFacts: [],
      stagingTestnetReadback: readback,
      issuedAt,
    });

    expect(readback.state).toBe('blocked');
    expect(readback.secretValuesStored).toBe(false);
    expect(readback.blockingReasons).toEqual(
      expect.arrayContaining([
        'btd_terminal_journal_entries expected 4 row(s) and observed 3.',
        'Supabase admin credential is missing from the untracked environment.',
      ]),
    );
    expect(report.repairs[0]).toMatchObject({
      repairKind: 'staging_testnet_readback',
      driftKind: 'staging_testnet_readback_blocked',
      repairActionKind: 'retry_staging_testnet_readback',
    });
  });

  it('rejects protected source object-storage artifacts unless encrypted', () => {
    expect(() =>
      reconcileLedgerDatabaseProjection({
        reconciliationId: 'reconciliation-protected-source-1',
        ledgerFacts: [],
        databaseFacts: [],
        objectStorageArtifacts: [
          {
            factId: 'protected-source-artifact-1',
            artifactId: 'protected-source-artifact-1',
            artifactKind: 'asset_pack_protected_source_encrypted',
            storageRoot: 'sha256:protected-source-root',
            sourceVisibility: 'source_safe',
            durable: true,
            containsProtectedSource: true,
            encrypted: false,
          },
        ],
        issuedAt,
      }),
    ).toThrow('Object storage artifacts containing protected source must be encrypted.');
  });

  it('rejects accidental Supabase or OpenAI secret values in readback receipts', () => {
    expect(() =>
      buildSupabaseStagingTestnetProjectionReadback({
        readbackId: 'readback-secret-1',
        lane: 'staging-testnet',
        supabaseProjectRef: 'tkpyosihuouusyaxtbau',
        restHost: 'sb_secret__should-not-be-here',
        adminCredentialState: 'provided_out_of_band',
        tableReadbacks: [],
        issuedAt,
      }),
    ).toThrow('restHost must not contain a secret value.');
  });
});
