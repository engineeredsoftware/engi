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
  new URL('../../packages/pipelines/deliverable/src/agents/setup/deliverable-pipeline-comprehend-need-agent.ts', import.meta.url),
  'utf8'
);
const comprehendNeedAliasSource = readFileSync(
  new URL('../../packages/pipelines/deliverable/src/agents/setup/deliverable-pipeline-comprehend-task-agent.ts', import.meta.url),
  'utf8'
);
const comprehendNeedPromptSource = readFileSync(
  new URL('../../packages/pipelines/deliverable/src/agents/prompts/deliverable-pipeline-comprehend-need-agent-prompts.ts', import.meta.url),
  'utf8'
);
const semanticResolutionSource = readFileSync(
  new URL('../../packages/pipelines/deliverable/src/semantic-resolution.ts', import.meta.url),
  'utf8'
);
const phaseIndexSource = readFileSync(
  new URL('../../packages/pipelines/deliverable/src/phases/index.ts', import.meta.url),
  'utf8'
);
const setupPhaseSource = readFileSync(
  new URL('../../packages/pipelines/deliverable/src/phases/setup.ts', import.meta.url),
  'utf8'
);
const preprocessSource = readFileSync(
  new URL('../../packages/pipelines/deliverable/src/preprocess.ts', import.meta.url),
  'utf8'
);
const shipAgentSource = readFileSync(
  new URL('../../packages/pipelines/deliverable/src/agents/shipping/deliverable-pipeline-ship-agent.ts', import.meta.url),
  'utf8'
);
const createPullRequestSource = readFileSync(
  new URL('../../packages/pipelines/deliverable/src/agents/shipping/deliverable-pipeline-create-pull-request-agent.ts', import.meta.url),
  'utf8'
);
const discoveryAgentsSource = readFileSync(
  new URL('../../packages/pipelines/deliverable/src/agents/discovery-agents.ts', import.meta.url),
  'utf8'
);
const selectFilesSource = readFileSync(
  new URL('../../packages/pipelines/deliverable/src/agents/discovery/deliverable-pipeline-select-files-parallel-agent.ts', import.meta.url),
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
  assert.match(reformSource, /shapes live protocol behavior through Bitcode's commercial infrastructure/u);
  assert.match(reformSource, /hydrate a registry-bearing pipeline execution context when callers still enter through a bare `Execution`/u);
});

test('retained deliverable schemas expose asset-pack written-asset semantic aliases', () => {
  assert.match(pipelineSchemasSource, /export type WrittenAssetResultMeta = DeliverableResultMeta;/u);
  assert.match(pipelineSchemasSource, /writtenAssetType\?: DeliverableType;/u);
  assert.match(pipelineSchemasSource, /semanticKind\?: 'asset-pack-written-asset';/u);
  assert.match(pipelineSchemasSource, /export type AssetPackSynthesisInput = DeliverableInput;/u);
  assert.match(pipelineSchemasSource, /export type AssetPackWrittenAssetOutput = DeliverableOutput;/u);
});

test('deliverable preprocess stores need and written-asset semantic mirrors alongside compatibility keys', () => {
  assert.match(deliverablePipelineSource, /resolveWrittenAssetType\(processedInput\)/u);
  assert.match(deliverablePipelineSource, /resolveExpressedNeed/u);
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
  assert.match(comprehendNeedSource, /name: 'deliverable-pipeline-comprehend-need-agent'/u);
  assert.match(comprehendNeedSource, /deliverable-pipeline-comprehend-need-agent-prompts/u);
  assert.match(comprehendNeedAliasSource, /deliverable-pipeline-comprehend-need-agent/u);
  assert.match(comprehendNeedPromptSource, /export \* from '\.\/deliverable-pipeline-comprehend-task-agent-prompts';/u);
  assert.match(setupPhaseSource, /deliverable-pipeline-comprehend-need-agent/u);
  assert.match(preprocessSource, /deliverable-pipeline-comprehend-need-agent/u);
  assert.match(preprocessSource, /new PipelinePromptRegistry/u);
  assert.match(preprocessSource, /new PipelineToolRegistry/u);
  assert.match(preprocessSource, /new PipelineAgentRegistry/u);
  assert.match(comprehendNeedSource, /execution\.store\('setup', 'writtenAssetType', types\);/u);
  assert.match(comprehendNeedSource, /execution\.store\('setup\/written-asset-type', 'type', types\);/u);
  assert.match(comprehendNeedSource, /execution\.store\('setup\/need', 'comprehension', out\.comprehension\);/u);
  assert.match(comprehendNeedSource, /execution\.store\('setup\/need', 'entities', out\.entities\);/u);
});

test('phase and shipping carriers resolve semantic written-asset type and need before compatibility fields', () => {
  assert.match(semanticResolutionSource, /export function resolveWrittenAssetTypeFromExecution/u);
  assert.match(semanticResolutionSource, /export function resolveExpressedNeedFromExecution/u);
  assert.match(deliverablePipelineSource, /BITCODE_ENABLE_DELIVERABLE_SETUP_PHASE_RUNTIME_IN_TEST/u);
  assert.match(phaseIndexSource, /resolveWrittenAssetTypeFromExecution\(execution\)/u);
  assert.match(phaseIndexSource, /Unknown written-asset type/u);
  assert.match(shipAgentSource, /writtenAssetType: dtype/u);
  assert.match(createPullRequestSource, /writtenAssetType: 'code-change'/u);
  assert.match(discoveryAgentsSource, /writtenAssets: z\.array\(z\.string\(\)\)\.optional\(\)/u);
  assert.match(discoveryAgentsSource, /needSatisfactionCriteria: z\.array\(z\.string\(\)\)\.optional\(\)/u);
  assert.match(discoveryAgentsSource, /applyResearchApproachSemanticMirrors/u);
  assert.match(discoveryAgentsSource, /applyPlanImplementationSemanticMirrors/u);
  assert.match(discoveryAgentsSource, /writtenAssetType: z\.string\(\)\.optional\(\)/u);
  assert.match(discoveryAgentsSource, /need: z\.string\(\)\.optional\(\)/u);
  assert.match(selectFilesSource, /writtenAssetType: z\.string\(\)\.optional\(\)/u);
  assert.match(selectFilesSource, /need: resolveExpressedNeedFromExecution\(execution\)/u);
  assert.match(finalSummarySource, /resolveExpressedNeedFromExecution\(execution\)/u);
  assert.match(finalSummarySource, /resolveWrittenAssetTypeFromExecution\(execution\)/u);
});
