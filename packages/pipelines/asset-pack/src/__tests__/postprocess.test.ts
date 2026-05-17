// @ts-nocheck
import { buildAssetPackPostprocessedResult, normalizeAssetPackOutput } from '../postprocess';
import { Execution } from '@bitcode/execution-generics';

describe('normalizeAssetPackOutput', () => {
  it('backfills prUrl, filesModified, and summary from execution', () => {
    const exec = new Execution('pipeline:asset-pack');
    exec.store('finish', 'pullRequestUrl', 'https://github.com/acme/repo/pull/123');
    exec.store('implementation', 'filesChanged', ['a.ts', 'b.ts']);
    exec.store('pipeline', 'expressedRead', 'Read a repository-backed pull request');
    exec.store('pipeline', 'writtenAssetType', 'read-satisfaction-asset-pack');
    exec.store('pipeline', 'deliveryMechanismTemplate', 'pull-request');
    exec.store('implementation', 'assetPackSynthesisArtifacts', {
      summary: 'Implementation-phase AssetPack synthesis artifacts ready.',
      fileChanges: { edited: 2, created: 0, deleted: 0 },
      proofEvidence: ['implementation-store-read'],
      reviewNotes: ['finish must preserve this artifact surface'],
    });

    const output: any = {
      success: true,
      shippable: {},
      artifacts: {},
      summary: ''
    };

    const normalized = normalizeAssetPackOutput(output, exec);
    expect(normalized.shippable.prUrl).toContain('/pull/123');
    expect(normalized.deliveryMechanism?.prUrl).toContain('/pull/123');
    expect(normalized.writtenAsset?.prUrl).toBeUndefined();
    expect(normalized.artifacts.filesModified).toEqual(['a.ts', 'b.ts']);
    expect(normalized.read).toBe('Read a repository-backed pull request');
    expect(normalized.writtenAssetType).toBe('read-satisfaction-asset-pack');
    expect(normalized.deliveryMechanismTemplate).toBe('pull-request');
    expect(normalized.assetPackSynthesisArtifacts?.summary).toBe(
      'Implementation-phase AssetPack synthesis artifacts ready.'
    );
    expect(normalized.writtenAssets?.summary).toBe('Implementation-phase AssetPack synthesis artifacts ready.');
    expect(normalized.assetPackSynthesisArtifacts?.proofEvidence).toEqual(['implementation-store-read']);
    expect(normalized.semanticKind).toBe('asset-pack-written-asset');
    expect(typeof normalized.summary).toBe('string');
    expect(normalized.summary.length).toBeGreaterThan(0);
  });

  it('builds asset-pack semantic mirrors into the postprocessed result', () => {
    const exec = new Execution('pipeline:asset-pack');
    exec.store('execution', 'id', 'exec-1');
    exec.store('source', 'owner', 'acme');
    exec.store('source', 'name', 'repo');
    exec.store('pipeline', 'expressedRead', 'Read a review-ready written asset');
    exec.store('pipeline', 'writtenAssetType', 'read-satisfaction-asset-pack');
    exec.store('pipeline', 'deliveryMechanismTemplate', 'pull-request');
    exec.store('route/preprocessed', 'assetPackWrittenAsset', {
      read: 'Read a review-ready written asset',
      writtenAssetType: 'read-satisfaction-asset-pack',
      deliveryMechanismTemplate: 'pull-request',
    });
    exec.store('finish/asset_pack_completion', 'assetPackSynthesisArtifacts', {
      summary: 'Finish-preserved AssetPack synthesis artifacts.',
      fileChanges: { edited: 1, created: 1, deleted: 0 },
      proofEvidence: ['finish-summary-read'],
    });

    const result = buildAssetPackPostprocessedResult(exec, {
      success: true,
      summary: 'Written asset ready.',
      writtenAssetType: 'read-satisfaction-asset-pack',
      semanticKind: 'asset-pack-written-asset',
    } as any);

    expect(result.semanticKind).toBe('asset-pack-written-asset');
    expect(result.kind).toBe('shippable');
    expect(result.read).toBe('Read a review-ready written asset');
    expect(result.writtenAssetType).toBe('read-satisfaction-asset-pack');
    expect(result.deliveryMechanismTemplate).toBe('pull-request');
    expect(result.deliveryMechanism).toBeUndefined();
    expect(result.summary).toBe('Finish-preserved AssetPack synthesis artifacts.');
    expect(result.assetPackSynthesisArtifacts?.summary).toBe('Finish-preserved AssetPack synthesis artifacts.');
    expect(result.writtenAssets?.summary).toBe('Finish-preserved AssetPack synthesis artifacts.');
    expect(result.assetPackSynthesisArtifacts?.proofEvidence).toEqual(['finish-summary-read']);
    expect(result.assetPack).toEqual({
      read: 'Read a review-ready written asset',
      writtenAssetType: 'read-satisfaction-asset-pack',
      deliveryMechanismTemplate: 'pull-request',
    });
  });

  it('preserves implementation artifacts when postprocess runs from a sibling execution node', () => {
    const root = new Execution('pipeline:asset-pack');
    const implementation = root.child('phase:implementation');
    const finish = root.child('phase:finish');
    implementation.store('implementation', 'assetPackSynthesisArtifacts', {
      summary: 'Sibling implementation AssetPack artifacts are authoritative.',
      fileChanges: { edited: 0, created: 1, deleted: 0 },
      proofEvidence: ['sibling-implementation-read'],
    });
    finish.store('finish/asset_pack_completion', 'assetPackSynthesisArtifacts', {
      summary: 'Finish wrapper should not override implementation artifacts.',
      fileChanges: { edited: 0, created: 0, deleted: 0 },
      proofEvidence: ['finish-wrapper'],
    });

    const normalized = normalizeAssetPackOutput({ success: true, summary: '' } as any, finish);
    const result = buildAssetPackPostprocessedResult(finish, normalized);

    expect(normalized.assetPackSynthesisArtifacts?.summary).toBe(
      'Sibling implementation AssetPack artifacts are authoritative.'
    );
    expect(result.summary).toBe('Sibling implementation AssetPack artifacts are authoritative.');
    expect(result.title).toBe('Sibling implementation AssetPack artifacts are authoritative.');
    expect(result.assetPackSynthesisArtifacts?.proofEvidence).toEqual(['sibling-implementation-read']);
  });

  it('uses pull-request delivery mechanisms as canonical shippable evidence for the written asset', () => {
    const exec = new Execution('pipeline:asset-pack');
    exec.store('execution', 'id', 'exec-2');

    const result = buildAssetPackPostprocessedResult(exec, {
      success: true,
      summary: 'Written asset delivered through PR.',
      writtenAsset: {
        title: 'Read satisfaction summary',
      },
      deliveryMechanism: {
        title: 'AssetPack PR',
        prUrl: 'https://github.com/acme/repo/pull/26',
      },
      semanticKind: 'asset-pack-written-asset',
    } as any);

    expect(result.title).toBe('Read satisfaction summary');
    expect(result.deliveryMechanism).toEqual({
      title: 'AssetPack PR',
      prUrl: 'https://github.com/acme/repo/pull/26',
    });
    expect(result.shippable).toEqual({
      title: 'AssetPack PR',
      prUrl: 'https://github.com/acme/repo/pull/26',
    });
  });
});
