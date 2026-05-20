// @ts-nocheck
import runReadFitsFindingSynthesisAssetPackSynthesisAgent from '../agents/implementation/read-fits-finding-synthesis-asset-pack-synthesis-agent';
import { Execution } from '@bitcode/execution-generics';

describe('runReadFitsFindingSynthesisAssetPackSynthesisAgent', () => {
  it('recovers Read, source revision, and fit evidence from execution context', async () => {
    const root = new Execution('pipeline:asset-pack');
    root.store('read', 'request', {
      prompt: 'Read the deposited source revision for terminal closure.',
    });
    root.store('harness', 'sourceRevision', {
      repositoryFullName: 'engineeredsoftware/ENGI',
      branch: 'main',
      commit: 'abc123',
    });
    root.store('fit', 'result', {
      resultState: 'worthy_fit',
      selectedCandidateAssetIds: ['deposit-1'],
      queryRoot: 'sha256:query',
      rankingRoot: 'sha256:ranking',
      embeddingPolicy: { provider: 'openai', model: 'text-embedding-3-small' },
    });

    const phase = root.child('phase:implementation');
    const result = await runReadFitsFindingSynthesisAssetPackSynthesisAgent({ overallComplexity: 'moderate' }, phase);

    expect(result.assetPack.read).toBe('Read the deposited source revision for terminal closure.');
    expect(result.assetPackSynthesisArtifacts.summary).toContain('engineeredsoftware/ENGI@main@abc123');
    expect(result.assetPackSynthesisArtifacts.summary).toContain('worthy_fit with 1 qualifying fit deposit');
    expect(result.assetPackSynthesisArtifacts.proofEvidence).toEqual(
      expect.arrayContaining([
        'Fit deposit assets: deposit-1',
        'Query root: sha256:query',
        'Ranking root: sha256:ranking',
        'Embedding policy: openai text-embedding-3-small',
      ])
    );
  });
});
