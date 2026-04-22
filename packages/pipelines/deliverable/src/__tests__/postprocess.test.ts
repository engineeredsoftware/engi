// @ts-nocheck
import { buildDeliverablePostprocessedResult, normalizeDeliverableOutput } from '../postprocess';
import { Execution } from '@bitcode/execution-generics';

describe('normalizeDeliverableOutput', () => {
  it('backfills prUrl, filesModified, and summary from execution', () => {
    const exec = new Execution('pipeline:deliverable');
    exec.store('shipping', 'pullRequestUrl', 'https://github.com/acme/repo/pull/123');
    exec.store('implementation', 'filesChanged', ['a.ts', 'b.ts']);
    exec.store('pipeline', 'expressedNeed', 'Need a repository-backed pull request');
    exec.store('pipeline', 'writtenAssetType', 'code-change');

    const output: any = {
      success: true,
      deliverable: {},
      artifacts: {},
      summary: ''
    };

    const normalized = normalizeDeliverableOutput(output, exec);
    expect(normalized.deliverable.prUrl).toContain('/pull/123');
    expect(normalized.writtenAsset.prUrl).toContain('/pull/123');
    expect(normalized.artifacts.filesModified).toEqual(['a.ts', 'b.ts']);
    expect(normalized.need).toBe('Need a repository-backed pull request');
    expect(normalized.writtenAssetType).toBe('code-change');
    expect(normalized.semanticKind).toBe('asset-pack-written-asset');
    expect(typeof normalized.summary).toBe('string');
    expect(normalized.summary.length).toBeGreaterThan(0);
  });

  it('builds asset-pack semantic mirrors into the postprocessed result', () => {
    const exec = new Execution('pipeline:deliverable');
    exec.store('execution', 'id', 'exec-1');
    exec.store('source', 'owner', 'acme');
    exec.store('source', 'name', 'repo');
    exec.store('pipeline', 'expressedNeed', 'Need a review-ready written asset');
    exec.store('pipeline', 'writtenAssetType', 'design-document-review');
    exec.store('route/preprocessed', 'assetPackWrittenAsset', {
      need: 'Need a review-ready written asset',
      writtenAssetType: 'design-document-review',
    });

    const result = buildDeliverablePostprocessedResult(exec, {
      success: true,
      summary: 'Written asset ready.',
      writtenAssetType: 'design-document-review',
      semanticKind: 'asset-pack-written-asset',
    } as any);

    expect(result.semanticKind).toBe('asset-pack-written-asset');
    expect(result.need).toBe('Need a review-ready written asset');
    expect(result.writtenAssetType).toBe('design-document-review');
    expect(result.assetPack).toEqual({
      need: 'Need a review-ready written asset',
      writtenAssetType: 'design-document-review',
    });
  });
});
