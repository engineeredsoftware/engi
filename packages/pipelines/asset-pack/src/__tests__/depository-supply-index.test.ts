import {
  assertDepositorySupplyIndexSourceSafe,
  buildDepositorySupplyIndex,
  depositorySupplyAssetsFromIndex,
  searchDepositoryAssetSpace,
  type DepositorySearchRead,
} from '../index';

const read: DepositorySearchRead = {
  id: 'read-supply-index',
  prompt:
    'Find source-bound evidence for Terminal Deposit Read Fit AssetPack proof-root reconciliation readback and Supabase ledger synchronization.',
  repositoryFullName: 'engineeredsoftware/ENGI',
  sourceBranch: 'main',
  sourceCommit: '31bbc0c5227b6b3aed5d107fd8507d35ec22970a',
  targetArtifactKinds: ['repository-revision', 'asset-pack-evidence', 'proof-root'],
  closureCriteria: [
    'Deposit evidence is bound to repository, branch, commit, and signer.',
    'Finding Fits can rank the supply without leaking protected source before settlement.',
  ],
  failureModes: ['protected source leakage', 'missing measurement proof'],
};

function embeddingVector() {
  return Array.from({ length: 1536 }, (_, index) => (index % 7) / 7);
}

function deposit(overrides: Record<string, unknown> = {}) {
  return {
    id: 'deposit-terminal-engi',
    assetId: 'asset-terminal-engi',
    title: 'Terminal Deposit Read Fit supply',
    summary:
      'Source-safe evidence for Terminal Deposit, Read, Finding Fits, AssetPack proof-root, reconciliation readback, and Supabase ledger synchronization.',
    artifactKind: 'repository-revision',
    artifactType: 'repository/revision',
    repositoryFullName: 'engineeredsoftware/ENGI',
    sourceBranch: 'main',
    sourceCommit: '31bbc0c5227b6b3aed5d107fd8507d35ec22970a',
    contentRoot: 'sha256:source-material-root',
    depositorWalletId: 'wallet-depositor-1',
    btdRange: 'btd:100:140',
    proofRoot: 'sha256:proof-root',
    measurementRoot: 'sha256:measurement-root',
    reconciliationReadbackRoot: 'sha256:readback-root',
    hasWalletOrAttestationProof: true,
    hasAssetMeasurementEvidence: true,
    contentUnits: [
      {
        unitId: 'terminal-unit-1',
        unitKind: 'source-file',
        text: 'PRIVATE_SOURCE_DO_NOT_SERIALIZE function terminalSecret() {}',
        path: 'uapi/app/terminal/TerminalDepositReadWorkbench.tsx',
        codeAnalysisFacts: {
          symbols: ['TerminalDepositReadWorkbench', 'streamTerminalReadFitsFindingSynthesisHarness'],
          paths: ['uapi/app/terminal/terminal-pipeline-harness-client.ts'],
          stackTags: ['terminal', 'supabase', 'assetpack'],
          constraints: ['protected source remains hidden until settlement'],
        },
      },
    ],
    embeddings: {
      lexical: embeddingVector(),
      metadata: embeddingVector(),
      measurement: embeddingVector(),
      vector: embeddingVector(),
    },
    ...overrides,
  };
}

describe('Depository supply index', () => {
  it('builds a source-safe, rights-aware, vector-searchable supply index', () => {
    const index = buildDepositorySupplyIndex({
      deposits: [deposit()],
      createdAt: '2026-05-25T00:00:00.000Z',
    });

    expect(index.schema).toBe('bitcode.depository.supply-index');
    expect(index.recordCount).toBe(1);
    expect(index.searchableRecordCount).toBe(1);
    expect(index.repairRequiredRecordCount).toBe(0);
    expect(index.embeddingPolicy).toMatchObject({
      provider: 'openai',
      model: 'text-embedding-3-small',
      dimensions: 1536,
      vectorStore: {
        table: 'deliverable_vectors',
        rpc: 'match_deliverable_vectors',
        distanceMetric: 'cosine',
      },
    });

    const record = index.records[0];
    expect(record.lifecycle).toMatchObject({
      state: 'indexed-searchable',
      sourceReceived: true,
      measurementReady: true,
      proofReady: true,
      lexicalIndexed: true,
      metadataIndexed: true,
      vectorProjectionReady: true,
      searchable: true,
      repairRequired: false,
    });
    expect(record.rightsBoundary).toMatchObject({
      depositorWalletId: 'wallet-depositor-1',
      btdRange: 'btd:100:140',
      readerVisibilityBeforeSettlement: 'source-safe-metadata-only',
      protectedSourceBeforeSettlementVisible: false,
      settlementRequiredForSourceBearingAssetPack: true,
      btdOwnershipBoundary: 'depositor-retains-btd-until-settlement-transfer',
    });
    expect(record.vectorProjection.rows).toHaveLength(4);
    expect(record.vectorProjection.rows.every((row) => row.embeddingState === 'ready')).toBe(true);
    expect(record.storageProjection).toMatchObject({
      assetPackEvidenceTable: 'deliverables',
      vectorTable: 'deliverable_vectors',
      vectorMatchRpc: 'match_deliverable_vectors',
    });
    expect(record.roots.supplyRoot).toMatch(/^sha256:/);
    expect(index.roots.indexRoot).toMatch(/^sha256:/);
    expect(() => assertDepositorySupplyIndexSourceSafe(index)).not.toThrow();
    expect(JSON.stringify(index)).not.toContain('PRIVATE_SOURCE_DO_NOT_SERIALIZE');
  });

  it('marks supply repair-required when embedding rows are pending or invalid', () => {
    const index = buildDepositorySupplyIndex({
      deposits: [
        deposit({
          embeddings: {
            lexical: [1, 2, 3],
          },
        }),
      ],
      createdAt: '2026-05-25T00:00:00.000Z',
    });

    const record = index.records[0];
    expect(record.lifecycle.state).toBe('indexed-repair-required');
    expect(record.lifecycle.vectorProjectionReady).toBe(false);
    expect(record.vectorProjection.rows.some((row) => row.embeddingState === 'invalid-dimensions')).toBe(true);
    expect(record.lifecycle.warnings).toEqual(
      expect.arrayContaining(['embedding_rows_pending', 'embedding_row_invalid_dimensions']),
    );
    expect(record.repairActions).toContain('sync-active-embedding-vector-rows');
  });

  it('blocks source supply without repository or source revision binding', () => {
    const index = buildDepositorySupplyIndex({
      deposits: [
        deposit({
          repositoryFullName: null,
          sourceBranch: null,
          sourceCommit: null,
        }),
      ],
      createdAt: '2026-05-25T00:00:00.000Z',
    });

    expect(index.blockedRecordCount).toBe(1);
    expect(index.records[0].lifecycle.state).toBe('blocked-readiness');
    expect(index.records[0].lifecycle.blockers).toEqual(
      expect.arrayContaining(['repository_binding_missing', 'source_revision_binding_missing']),
    );
    expect(depositorySupplyAssetsFromIndex(index)).toHaveLength(0);
  });

  it('hands source-safe supply records to Finding Fits search as candidate deposits', async () => {
    const index = buildDepositorySupplyIndex({
      deposits: [deposit()],
      createdAt: '2026-05-25T00:00:00.000Z',
    });
    const assets = depositorySupplyAssetsFromIndex(index);
    const result = await searchDepositoryAssetSpace({
      read,
      assets,
      depositorySupplyIndex: index,
    });

    expect(assets).toHaveLength(1);
    expect(assets[0].contentUnits[0].text).not.toContain('PRIVATE_SOURCE_DO_NOT_SERIALIZE');
    expect(result.resultState).toBe('worthy_fit');
    expect(result.fitDepositAssetIds).toEqual(['asset-terminal-engi']);
    expect(result.depositorySupplyIndex?.roots.indexRoot).toBe(index.roots.indexRoot);
    expect(result.searchReceipt.sourceSafety).toMatchObject({
      sourceSafeMetadataOnly: true,
      protectedSourceVisible: false,
      unpaidAssetPackSourceVisible: false,
    });
  });
});
