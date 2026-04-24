import { parseStreamChunk } from '@/streaming/stream-parser';

describe('parseStreamChunk completion mapping', () => {
  it('maps completion summary, processingStats (tokens/credits), repoSnapshot', () => {
    const payload = {
      type: 'completion',
      result: {
        summary: 'All done.',
        assetPackSynthesisArtifacts: {
          summary: 'Canonical synthesis artifacts.',
          fileChanges: { edited: 4, created: 1, deleted: 0 },
          proofEvidence: ['proof-a'],
          reviewNotes: ['review-a'],
        },
        writtenAssets: {
          summary: 'Stable asset-pack summary.',
          fileChanges: { edited: 2, created: 1, deleted: 0 },
        },
        shippables: {
          pullRequest: { url: 'https://github.com/acme/web/pull/1', title: 'feat: add' },
          comments: [{ url: 'https://github.com/acme/web/issues/2#comment-1', title: 'note' }],
          issues: [{ url: 'https://github.com/acme/web/issues/3', title: 'bug' }],
        },
        deliveryMechanism: {
          pullRequest: { url: 'https://github.com/acme/web/pull/1', title: 'feat: add' },
          comments: [{ url: 'https://github.com/acme/web/issues/2#comment-1', title: 'note' }],
          issues: [{ url: 'https://github.com/acme/web/issues/3', title: 'bug' }],
        },
        need: 'Deliver the audited auth refactor.',
        writtenAssetType: 'code-change',
        assetPack: { need: 'Deliver the audited auth refactor.', writtenAssetType: 'code-change', deliveryTarget: 'pr' },
        processingStats: { time: '2m 05s', tokens: { input: 100, output: 50, total: 150 }, credits: 2 },
        repoSnapshot: { org: 'acme', repo: 'web', branch: 'main', commit: 'deadbeef' },
        actions: {
          pullRequest: { url: 'https://github.com/acme/web/pull/1', title: 'feat: add' },
          comments: [{ url: 'https://github.com/acme/web/issues/2#comment-1', title: 'note' }],
          issues: [{ url: 'https://github.com/acme/web/issues/3', title: 'bug' }],
          files: { edited: 3, created: 1, deleted: 0 },
        },
      },
    } as any;

    const chunk = `data: ${JSON.stringify(payload)}\n\n`;
    const parsed = parseStreamChunk(chunk);
    expect(parsed.completion).toBeTruthy();
    expect(parsed.completion?.summary).toBe('All done.');
    expect(parsed.completion?.processingStats?.time).toBe('2m 05s');
    expect(parsed.completion?.processingStats?.tokens?.total).toBe(150);
    expect(parsed.completion?.processingStats?.credits).toBe(2);
    expect(parsed.completion?.repoSnapshot?.org).toBe('acme');
    // shippables are primary delivered artifacts; deliverables remain compatibility mirrors.
    expect(parsed.completion?.shippables?.pullRequest?.url).toContain('/pull/1');
    expect(parsed.completion?.shippables?.comments?.length).toBe(1);
    expect(parsed.completion?.shippables?.issues?.length).toBe(1);
    expect(parsed.completion?.deliverables?.pullRequest?.url).toContain('/pull/1');
    expect(parsed.completion?.deliverables?.comments?.length).toBe(1);
    expect(parsed.completion?.deliverables?.issues?.length).toBe(1);
    expect(parsed.completion?.deliverables?.fileChanges?.edited).toBe(3);
    expect(parsed.completion?.assetPackSynthesisArtifacts?.summary).toBe('Canonical synthesis artifacts.');
    expect(parsed.completion?.assetPackSynthesisArtifacts?.fileChanges?.edited).toBe(4);
    expect(parsed.completion?.assetPackSynthesisArtifacts?.proofEvidence).toEqual(['proof-a']);
    expect(parsed.completion?.assetPackSynthesisArtifacts?.reviewNotes).toEqual(['review-a']);
    expect(parsed.completion?.writtenAssets?.summary).toBe('Stable asset-pack summary.');
    expect(parsed.completion?.writtenAssets?.fileChanges?.edited).toBe(2);
    expect(parsed.completion?.deliveryMechanism?.pullRequest?.url).toContain('/pull/1');
    expect(parsed.completion?.need).toBe('Deliver the audited auth refactor.');
    expect(parsed.completion?.writtenAssetType).toBe('code-change');
    expect(parsed.completion?.assetPack?.deliveryTarget).toBe('pr');
    expect(parsed.completion?.semanticKind).toBe('asset-pack-written-asset');
  });

  it('mirrors AssetPack synthesis artifacts into compatibility written assets when no written-assets payload exists', () => {
    const payload = {
      type: 'completion',
      result: {
        assetPackSynthesisArtifacts: {
          summary: 'Only canonical artifacts were emitted.',
          fileChanges: { edited: 6, created: 0, deleted: 1 },
          proofEvidence: ['asset-pack-proof'],
        },
      },
    } as any;

    const parsed = parseStreamChunk(`data: ${JSON.stringify(payload)}\n\n`);
    expect(parsed.completion?.assetPackSynthesisArtifacts?.summary).toBe('Only canonical artifacts were emitted.');
    expect(parsed.completion?.writtenAssets?.summary).toBe('Only canonical artifacts were emitted.');
    expect(parsed.completion?.deliverables?.fileChanges?.edited).toBe(6);
    expect(parsed.completion?.semanticKind).toBe('asset-pack-written-asset');
  });
});
