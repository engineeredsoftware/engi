import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';

const finishSpec = readFileSync(new URL('../V26_PIPELINE_FINISH_REFORM.md', import.meta.url), 'utf8');
const deliverableSpec = readFileSync(new URL('../V26_DELIVERABLE_REFORM.md', import.meta.url), 'utf8');
const canonicalSpec = readFileSync(new URL('../../BITCODE_SPEC_V26.md', import.meta.url), 'utf8');
const sdivFactorySource = readFileSync(
  new URL('../../packages/pipelines-generics/src/phases/sdivs-factory.ts', import.meta.url),
  'utf8'
);
const phaseFactorySource = readFileSync(
  new URL('../../packages/pipelines-generics/src/phases/phase-factory.ts', import.meta.url),
  'utf8'
);
const pipelineFactorySource = readFileSync(
  new URL('../../packages/pipelines-generics/src/pipeline-factory.ts', import.meta.url),
  'utf8'
);
const primitivesSource = readFileSync(
  new URL('../../packages/pipelines-generics/src/types/primitives.ts', import.meta.url),
  'utf8'
);
const deliverableIndexSource = readFileSync(
  new URL('../../packages/pipelines/deliverable/src/index.ts', import.meta.url),
  'utf8'
);
const deliverablePhasesSource = readFileSync(
  new URL('../../packages/pipelines/deliverable/src/phases/index.ts', import.meta.url),
  'utf8'
);
const finishPhaseSource = readFileSync(
  new URL('../../packages/pipelines/deliverable/src/phases/shipping.ts', import.meta.url),
  'utf8'
);
const deliverAgentSource = readFileSync(
  new URL('../../packages/pipelines/deliverable/src/agents/shipping/deliverable-pipeline-ship-agent.ts', import.meta.url),
  'utf8'
);
const finalSummarySource = readFileSync(
  new URL('../../packages/pipelines/deliverable/src/agents/shipping/deliverable-pipeline-final-work-summary-agent.ts', import.meta.url),
  'utf8'
);
const postprocessSource = readFileSync(
  new URL('../../packages/pipelines/deliverable/src/postprocess.ts', import.meta.url),
  'utf8'
);
const promptBuilderDir = new URL('../../packages/pipelines/deliverable/src/agents/prompts/', import.meta.url);

test('V26 specifies Finish as the broad final phase and Delivering as destination handoff', () => {
  assert.match(finishSpec, /The broad final phase of a phased Bitcode agentic pipeline is `Finish`/);
  assert.match(finishSpec, /`Delivering` owns connected-interface output/);
  assert.match(finishSpec, /`SDIVF` is the canonical retained phased pipeline implementation/);
  assert.match(deliverableSpec, /`SDIVS` \/ `shipping` compatibility APIs must forward to `SDIVF` \/ `finish` behavior/);
  assert.match(canonicalSpec, /`SDIVF` is the canonical retained phased implementation/);
});

test('pipeline generics expose canonical SDIVF APIs with deprecated SDIVS wrappers', () => {
  assert.match(phaseFactorySource, /export enum SDIVFPhase/);
  assert.match(phaseFactorySource, /FINISH = 'finish'/);
  assert.match(phaseFactorySource, /export function factorySDIVFPhaseDelegators/);
  assert.match(phaseFactorySource, /export function factorySDIVSPhaseDelegators/);
  assert.match(sdivFactorySource, /export interface SDIVFConfig/);
  assert.match(sdivFactorySource, /export function factorySDIVFPipeline/);
  assert.match(sdivFactorySource, /pipelineExec\.store\('pipeline', 'pattern', 'SDIVF'\)/);
  assert.match(sdivFactorySource, /pipelineExec\.store\('phase', 'current', 'finish'\)/);
  assert.match(sdivFactorySource, /export function factorySDIVSPipeline/);
  assert.match(sdivFactorySource, /finish: config\.shipping/);
  assert.match(pipelineFactorySource, /factoryPipelineWithDIVFinishLoop/);
  assert.match(pipelineFactorySource, /finish: config\.shipping/);
  assert.match(primitivesSource, /s === 'shipping'\) return 'finish'/);
});

test('retained deliverable corridor executes Finish while preserving shipping compatibility aliases', () => {
  assert.match(deliverableIndexSource, /factorySDIVFExecutorPipeline/);
  assert.match(deliverableIndexSource, /finish: finishPhase/);
  assert.match(deliverableIndexSource, /export const runSDIVFPipeline = deliverablePipeline/);
  assert.match(deliverablePhasesSource, /export const finishPhase/);
  assert.match(deliverablePhasesSource, /createAgentExecutor\('finish:deliver-asset-pack-to-destination-agent'\)/);
  assert.match(deliverablePhasesSource, /shipping: finishPhase/);
  assert.match(finishPhaseSource, /registerFinishAgentsForType/);
  assert.match(finishPhaseSource, /finish:deliver-asset-pack-to-destination-agent/);
  assert.match(finishPhaseSource, /shipping:deliverable-pipeline-ship-agent/);
});

test('Finish agents and postprocess prefer finish stores before shipping fallback', () => {
  assert.match(deliverAgentSource, /Finish Deliver agent/);
  assert.match(deliverAgentSource, /execution\.store\('finish','pullRequestUrl'/);
  assert.match(finalSummarySource, /name: 'finish:final-work-summary'/);
  assert.match(finalSummarySource, /finish\/final_work_summary/);
  assert.match(finalSummarySource, /get\?\.\('finish', 'pullRequestUrl'\).*get\?\.\('shipping', 'pullRequestUrl'\)/s);
  assert.match(postprocessSource, /execution\.get\('finish', 'pullRequestUrl'\)/);
  assert.match(postprocessSource, /get\?\.\('finish\/final_work_summary', 'writtenAssets'\)/);
});

test('retained deliverable prompt-builder doc-comments use Bitcode-specific labels', () => {
  const promptFiles = readdirSync(promptBuilderDir)
    .filter((name) => name.endsWith('.ts'))
    .map((name) => ({
      name,
      source: readFileSync(new URL(name, promptBuilderDir), 'utf8'),
    }));

  assert.ok(promptFiles.length > 20);

  for (const { name, source } of promptFiles) {
    assert.doesNotMatch(source, /current_version: "GA1/u, `${name} keeps a GA1 current_version`);
    assert.doesNotMatch(source, /"PROMPTPART_[^"]+": "GA1/u, `${name} keeps a GA1 dependency version`);

    for (const match of source.matchAll(/intent: "([^"]+)"/gu)) {
      const intent = match[1];
      assert.match(intent, /\bBitcode\b/u, `${name} intent lacks Bitcode ownership: ${intent}`);
      assert.doesNotMatch(intent, /^Deliverables\b/u, `${name} intent starts from old-world deliverables: ${intent}`);
      assert.match(
        intent,
        /\b(Need|AssetPack|Finish|Delivering|written-asset|proof|repository|LSP|review|document|delivery)\b/u,
        `${name} intent lacks object/evidence specificity: ${intent}`
      );
    }
  }
});
