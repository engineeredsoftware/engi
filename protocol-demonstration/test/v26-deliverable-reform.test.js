import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const reformSource = readFileSync(new URL('../V26_DELIVERABLE_REFORM.md', import.meta.url), 'utf8');
const pipelineSchemasSource = readFileSync(
  new URL('../../packages/pipelines/deliverable/src/types/PipelineSchemas.ts', import.meta.url),
  'utf8'
);
const deliverablePipelineSource = readFileSync(
  new URL('../../packages/pipelines/deliverable/src/index.ts', import.meta.url),
  'utf8'
);
const postprocessSource = readFileSync(
  new URL('../../packages/pipelines/deliverable/src/postprocess.ts', import.meta.url),
  'utf8'
);
const comprehendNeedSource = readFileSync(
  new URL('../../packages/pipelines/deliverable/src/agents/setup/deliverable-pipeline-comprehend-task-agent.ts', import.meta.url),
  'utf8'
);
const finalSummarySource = readFileSync(
  new URL('../../packages/pipelines/deliverable/src/agents/shipping/deliverable-pipeline-final-work-summary-agent.ts', import.meta.url),
  'utf8'
);

test('V26 deliverable reform supplement requires semantic mirrors beyond retained compatibility naming', () => {
  assert.match(reformSource, /`deliverable` survives only as a retained compatibility path\/name/u);
  assert.match(reformSource, /`asset pack`/u);
  assert.match(reformSource, /`written asset`/u);
  assert.match(reformSource, /execution stores and postprocessed artifacts should mirror compatibility keys with semantic `need`, `writtenAssetType`, and asset-pack-shaped snapshots/u);
});

test('retained deliverable schemas expose asset-pack written-asset semantic aliases', () => {
  assert.match(pipelineSchemasSource, /export type WrittenAssetResultMeta = DeliverableResultMeta;/u);
  assert.match(pipelineSchemasSource, /writtenAssetType\?: DeliverableType;/u);
  assert.match(pipelineSchemasSource, /semanticKind\?: 'asset-pack-written-asset';/u);
  assert.match(pipelineSchemasSource, /export type AssetPackSynthesisInput = DeliverableInput;/u);
  assert.match(pipelineSchemasSource, /export type AssetPackWrittenAssetOutput = DeliverableOutput;/u);
});

test('deliverable preprocess stores need and written-asset semantic mirrors alongside compatibility keys', () => {
  assert.match(deliverablePipelineSource, /input\?\.writtenAssetType/u);
  assert.match(deliverablePipelineSource, /function extractExpressedNeed/u);
  assert.match(deliverablePipelineSource, /execution\.store\('pipeline', 'writtenAssetType', deliverableType\);/u);
  assert.match(deliverablePipelineSource, /execution\.store\('pipeline', 'expressedNeed', expressedNeed\);/u);
  assert.match(deliverablePipelineSource, /execution\.store\('need', 'description', expressedNeed\);/u);
  assert.match(deliverablePipelineSource, /execution\.store\('route\/preprocessed', 'assetPackWrittenAsset', snapshot\);/u);
});

test('deliverable postprocess and shipping summary carry asset-pack written-asset meaning', () => {
  assert.match(postprocessSource, /enhanced\.semanticKind = 'asset-pack-written-asset';/u);
  assert.match(postprocessSource, /enhanced\.writtenAssetType/u);
  assert.match(postprocessSource, /kind: 'deliverable'/u);
  assert.match(postprocessSource, /semanticKind: 'asset-pack-written-asset'/u);
  assert.match(finalSummarySource, /writtenAssets: WrittenAssetsSchema\.optional\(\)/u);
  assert.match(finalSummarySource, /lines\.push\('', `## Need`, need\.trim\(\)\);/u);
  assert.match(finalSummarySource, /store\?\.\('shipping\/final_work_summary', 'writtenAssets', writtenAssets as any\);/u);
  assert.match(finalSummarySource, /store\?\.\('shipping\/final_work_summary', 'writtenAssetType', dtype \|\| undefined\);/u);
});

test('setup comprehension path mirrors semantic need and written-asset keys for downstream phases', () => {
  assert.match(comprehendNeedSource, /execution\.store\('setup', 'writtenAssetType', types\);/u);
  assert.match(comprehendNeedSource, /execution\.store\('setup\/written-asset-type', 'type', types\);/u);
  assert.match(comprehendNeedSource, /execution\.store\('setup\/need', 'comprehension', out\.comprehension\);/u);
  assert.match(comprehendNeedSource, /execution\.store\('setup\/need', 'entities', out\.entities\);/u);
});
