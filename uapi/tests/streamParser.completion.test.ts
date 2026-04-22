import { parseStreamChunk } from '@/streaming/stream-parser';

describe('parseStreamChunk completion mapping', () => {
  it('maps completion summary, processingStats (tokens/credits), repoSnapshot', () => {
    const payload = {
      type: 'completion',
      result: {
        summary: 'All done.',
        writtenAssets: {
          summary: 'Stable asset-pack summary.',
          fileChanges: { edited: 2, created: 1, deleted: 0 },
        },
        deliveryMechanism: {
          pullRequest: { url: 'https://github.com/acme/web/pull/1', title: 'feat: add' },
          comments: [{ url: 'https://github.com/acme/web/issues/2#comment-1', title: 'note' }],
          issues: [{ url: 'https://github.com/acme/web/issues/3', title: 'bug' }],
        },
        need: 'Ship the audited auth refactor.',
        writtenAssetType: 'code-change',
        assetPack: { need: 'Ship the audited auth refactor.', writtenAssetType: 'code-change', deliveryTarget: 'pr' },
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
    // deliverables mapping
    expect(parsed.completion?.deliverables?.pullRequest?.url).toContain('/pull/1');
    expect(parsed.completion?.deliverables?.comments?.length).toBe(1);
    expect(parsed.completion?.deliverables?.issues?.length).toBe(1);
    expect(parsed.completion?.deliverables?.fileChanges?.edited).toBe(3);
    expect(parsed.completion?.writtenAssets?.summary).toBe('Stable asset-pack summary.');
    expect(parsed.completion?.writtenAssets?.fileChanges?.edited).toBe(2);
    expect(parsed.completion?.deliveryMechanism?.pullRequest?.url).toContain('/pull/1');
    expect(parsed.completion?.need).toBe('Ship the audited auth refactor.');
    expect(parsed.completion?.writtenAssetType).toBe('code-change');
    expect(parsed.completion?.assetPack?.deliveryTarget).toBe('pr');
    expect(parsed.completion?.semanticKind).toBe('asset-pack-written-asset');
  });
});
