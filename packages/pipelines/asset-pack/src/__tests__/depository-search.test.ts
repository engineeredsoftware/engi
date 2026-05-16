// @ts-nocheck
import assetPack, {
  normalizePipelineDepositoryAssets,
  searchDepositoryAssetSpace,
  type DepositoryAsset,
  type DepositorySearchRead,
} from '../index';
import { Execution } from '@bitcode/execution-generics';

const read: DepositorySearchRead = {
  id: 'read-terminal-fit',
  prompt:
    'Read the deposited repository revision and determine whether it contains a complete non-mock Terminal path through Deposit, Read/Fit, AssetPack evidence, proof finality readback, and Supabase ledger reconciliation.',
  repositoryFullName: 'engineeredsoftware/ENGI',
  sourceBranch: 'main',
  sourceCommit: '31bbc0c5227b6b3aed5d107fd8507d35ec22970a',
  targetArtifactKinds: [
    'repository-revision',
    'fit-quality-receipt',
    'asset-pack-evidence',
    'proof-root',
    'reconciliation-readback',
  ],
  closureCriteria: [
    'Deposit evidence is bound to repository, branch, commit, and signer.',
    'Fit evidence references the deposited repository revision and candidate AssetPack.',
  ],
  failureModes: ['mock repository leakage', 'missing proof finality posture'],
};

function asset(overrides: Partial<DepositoryAsset> = {}): DepositoryAsset {
  return {
    assetId: 'asset_repository-revision-deposit-engineeredsoftware-engi',
    title: 'Deposited ENGI repository revision',
    summary:
      'Repository revision evidence for Terminal Deposit, Read/Fit, AssetPack evidence, proof-root, finality readback, and Supabase ledger reconciliation.',
    artifactKind: 'repository-revision',
    artifactType: 'repository/revision',
    repositoryFullName: 'engineeredsoftware/ENGI',
    sourceBranch: 'main',
    sourceCommit: '31bbc0c5227b6b3aed5d107fd8507d35ec22970a',
    contentRoot: 'sha256:test-content-root',
    contentUnits: [
      {
        unitId: 'asset_repository-revision-deposit-engineeredsoftware-engi:unit-1',
        unitKind: 'repository-revision',
        text:
          'Terminal commercial path records repository revision Deposit evidence, measured Read, Fit quality receipt, AssetPack evidence, proof-root, finality readback, wallet authorization, and reconciliation readback.',
        codeAnalysisFacts: {
          symbols: ['TerminalDepositReadWorkbench', 'AssetPackPipelineHarness'],
          paths: ['uapi/app/terminal/terminal-deposit-read-workbench.ts'],
          configKeys: ['BITCODE_PIPELINE_STREAM_TO_DATABASE'],
          stackTags: ['terminal', 'assetpack', 'supabase'],
          constraints: ['no mock repository leakage', 'source revision proof'],
        },
      },
    ],
    signingSurface: { payloadHash: 'sha256:signed' },
    githubBoundary: { sourceProvider: 'github', sourceRepo: 'engineeredsoftware/ENGI' },
    assetMeasurement: { targetKindCount: 5 },
    measurementProvenance: [{ stage: 'deposit-measurement' }],
    ...overrides,
  };
}

function findStored(execution: any, namespace: string, key: string): any {
  const value = execution?.get?.(namespace, key);
  if (value !== undefined) return value;
  for (const child of execution?.children?.values?.() || []) {
    const childValue = findStored(child, namespace, key);
    if (childValue !== undefined) return childValue;
  }
  return undefined;
}

describe('AssetPack depository search', () => {
  it('returns a worthy fit only for source-bound proof-bearing deposited assets', async () => {
    const result = await searchDepositoryAssetSpace({
      read,
      assets: [asset()],
    });

    expect(result.resultState).toBe('worthy_fit');
    expect(result.selectedCandidateAssetIds).toEqual([
      'asset_repository-revision-deposit-engineeredsoftware-engi',
    ]);
    expect(result.selectedCandidates[0].verification.repositoryBound).toBe(true);
    expect(result.selectedCandidates[0].verification.sourceRevisionBound).toBe(true);
    expect(result.selectedCandidates[0].ranking.finalScore).toBeGreaterThanOrEqual(
      result.thresholds.worthyScore
    );
    expect(result.embeddingPolicy).toMatchObject({
      provider: 'openai',
      model: 'text-embedding-3-small',
      dimensions: 1536,
      vectorStore: {
        table: 'deliverable_vectors',
        rpc: 'match_deliverable_vectors',
        distanceMetric: 'cosine',
      },
    });
    expect(result.queryRoot).toMatch(/^sha256:/);
    expect(result.rankingRoot).toMatch(/^sha256:/);
  });

  it('blocks readiness when candidate search finds source evidence without proof', async () => {
    const result = await searchDepositoryAssetSpace({
      read,
      assets: [
        asset({
          signingSurface: null,
          githubBoundary: null,
          attestations: [],
          hasWalletOrAttestationProof: false,
        }),
      ],
    });

    expect(result.resultState).toBe('blocked_readiness');
    expect(result.selectedCandidates[0].verification.warnings).toContain(
      'wallet_or_attestation_proof_missing'
    );
  });

  it('blocks readiness when a proof-bearing candidate lacks explicit measurement evidence', async () => {
    const result = await searchDepositoryAssetSpace({
      read,
      assets: [
        asset({
          assetMeasurement: null,
          measurementProvenance: [],
          hasAssetMeasurementEvidence: false,
        }),
      ],
    });

    expect(result.resultState).toBe('blocked_readiness');
    expect(result.selectedCandidates[0].verification.warnings).toContain(
      'asset_measurement_evidence_missing'
    );
  });

  it('returns no-worthy-fit for unrelated reads instead of relying on repository match alone', async () => {
    const result = await searchDepositoryAssetSpace({
      read: {
        ...read,
        prompt: 'Plan a bakery loyalty marketing landing page with seasonal menu photography.',
        targetArtifactKinds: ['marketing-copy'],
        closureCriteria: ['Landing page copy is ready for a cafe promotion.'],
        failureModes: [],
      },
      assets: [asset()],
    });

    expect(result.resultState).toBe('no_worthy_fit');
    expect(result.selectedCandidates).toHaveLength(0);
  });

  it('fails closed on frontier or mock repository leakage even when text matches', async () => {
    const result = await searchDepositoryAssetSpace({
      read,
      assets: [
        asset({
          assetId: 'asset_frontier_demo',
          repositoryFullName: 'frontier/ENGI',
          githubBoundary: { sourceProvider: 'demo', sourceRepo: 'frontier/ENGI' },
        }),
      ],
    });

    expect(result.resultState).toBe('blocked_readiness');
    expect(result.blockedCandidates[0].verification.blockers).toEqual(
      expect.arrayContaining(['frontier_repository_reference', 'mock_source_provider'])
    );
  });

  it('normalizes manifest-only deposits into searchable source-bound assets', () => {
    const normalized = normalizePipelineDepositoryAssets({
      sourceRevision: {
        repositoryFullName: 'engineeredsoftware/ENGI',
        branch: 'main',
        commit: '31bbc0c5227b6b3aed5d107fd8507d35ec22970a',
      },
      deposit: {
        id: 'deposit-1',
        assetId: 'asset-1',
        hasWalletOrAttestationProof: true,
        hasAssetMeasurementEvidence: true,
      },
    });

    expect(normalized).toHaveLength(1);
    expect(normalized[0].assetId).toBe('asset-1');
    expect(normalized[0].repositoryFullName).toBe('engineeredsoftware/ENGI');
    expect(normalized[0].hasWalletOrAttestationProof).toBe(true);
  });

  it('stores depository search and fit result evidence during pipeline preprocess', async () => {
    const exec = new Execution('asset-pack:depository-search-test');

    const output = await assetPack(
      {
        read: read.prompt,
        definitionOfRead: read.prompt,
        repository: {
          fullName: read.repositoryFullName,
          branch: read.sourceBranch,
          commit: read.sourceCommit,
        },
        sourceRevision: {
          repositoryFullName: read.repositoryFullName,
          branch: read.sourceBranch,
          commit: read.sourceCommit,
        },
        depositoryAssets: [asset()],
        deliveryMechanismTemplate: 'pull-request',
      },
      exec as any
    );

    expect(findStored(exec, 'fit', 'resultState')).toBe('worthy_fit');
    expect(findStored(exec, 'depository/search', 'result')?.resultState).toBe('worthy_fit');
    expect(findStored(exec, 'depository/search', 'embeddingPolicy')?.dimensions).toBe(1536);
    expect(output.fitResult.resultState).toBe('worthy_fit');
    expect(output.fitResult.embeddingPolicy.model).toBe('text-embedding-3-small');
    expect(output.depositorySearch.selectedCandidateAssetIds).toEqual([
      'asset_repository-revision-deposit-engineeredsoftware-engi',
    ]);
  });
});
