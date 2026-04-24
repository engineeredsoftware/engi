import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';

const finishSpec = readFileSync(new URL('../V26_PIPELINE_FINISH_REFORM.md', import.meta.url), 'utf8');
const deliverableSpec = readFileSync(new URL('../V26_DELIVERABLE_REFORM.md', import.meta.url), 'utf8');
const canonicalSpec = readFileSync(new URL('../../BITCODE_SPEC_V26.md', import.meta.url), 'utf8');
const sdivFactorySource = readFileSync(
  new URL('../../packages/pipelines-generics/src/phases/sdivf-factory.ts', import.meta.url),
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
  new URL('../../packages/pipelines/asset-pack/src/index.ts', import.meta.url),
  'utf8'
);
const assetPackPackageSource = readFileSync(
  new URL('../../packages/pipelines/asset-pack/package.json', import.meta.url),
  'utf8'
);
const assetPackReadmeSource = readFileSync(
  new URL('../../packages/pipelines/asset-pack/README.md', import.meta.url),
  'utf8'
);
const rootTsconfigSource = readFileSync(new URL('../../tsconfig.json', import.meta.url), 'utf8');
const uapiNextConfigSource = readFileSync(new URL('../../uapi/next.config.mjs', import.meta.url), 'utf8');
const pnpmLockSource = readFileSync(new URL('../../pnpm-lock.yaml', import.meta.url), 'utf8');
const deliverablePhasesSource = readFileSync(
  new URL('../../packages/pipelines/asset-pack/src/phases/index.ts', import.meta.url),
  'utf8'
);
const finishPhaseSource = readFileSync(
  new URL('../../packages/pipelines/asset-pack/src/phases/finish.ts', import.meta.url),
  'utf8'
);
const shippingPhaseCompatibilitySource = readFileSync(
  new URL('../../packages/pipelines/asset-pack/src/phases/shipping.ts', import.meta.url),
  'utf8'
);
const deliverAgentSource = readFileSync(
  new URL('../../packages/pipelines/asset-pack/src/agents/finish/deliver-asset-pack-to-destination-agent.ts', import.meta.url),
  'utf8'
);
const deliverAgentCompatibilitySource = readFileSync(
  new URL('../../packages/pipelines/asset-pack/src/agents/shipping/deliverable-pipeline-ship-agent.ts', import.meta.url),
  'utf8'
);
const finalSummarySource = readFileSync(
  new URL('../../packages/pipelines/asset-pack/src/agents/finish/final-work-summary-agent.ts', import.meta.url),
  'utf8'
);
const finalSummaryCompatibilitySource = readFileSync(
  new URL('../../packages/pipelines/asset-pack/src/agents/shipping/deliverable-pipeline-final-work-summary-agent.ts', import.meta.url),
  'utf8'
);
const postprocessSource = readFileSync(
  new URL('../../packages/pipelines/asset-pack/src/postprocess.ts', import.meta.url),
  'utf8'
);
const promptBuilderDir = new URL('../../packages/pipelines/asset-pack/src/agents/prompts/', import.meta.url);
const readyToShipPromptSource = readFileSync(new URL('../../packages/pipelines/asset-pack/src/agents/prompts/ready-to-ship-prompt.ts', import.meta.url), 'utf8');
const finalizeShipmentPromptSource = readFileSync(new URL('../../packages/pipelines/asset-pack/src/agents/prompts/finalize-shipment-prompt.ts', import.meta.url), 'utf8');
const validationReadyAgentSource = readFileSync(
  new URL('../../packages/pipelines/asset-pack/src/agents/validation/deliverable-pipeline-ready-to-ship-agent.ts', import.meta.url),
  'utf8'
);
const compatibilityShippingAgentsSource = readFileSync(
  new URL('../../packages/pipelines/asset-pack/src/agents/shipping-agents.ts', import.meta.url),
  'utf8'
);

function listFiles(dirUrl) {
  return readdirSync(dirUrl, { withFileTypes: true }).flatMap((entry) => {
    const child = new URL(entry.name + (entry.isDirectory() ? '/' : ''), dirUrl);
    return entry.isDirectory() ? listFiles(child) : [child.pathname];
  });
}

test('V26 specifies Finish as the broad final phase and Delivering as destination handoff', () => {
  assert.match(finishSpec, /The broad final phase of a phased Bitcode agentic pipeline is `Finish`/);
  assert.match(finishSpec, /`Delivering` owns connected-interface output/);
  assert.match(finishSpec, /`SDIVF` is the canonical retained phased pipeline implementation/);
  assert.match(deliverableSpec, /`SDIVS` \/ `shipping` compatibility APIs must forward to `SDIVF` \/ `finish` behavior/);
  assert.match(canonicalSpec, /`SDIVF` is the canonical compatibility-mounted phased implementation/);
});

test('pipeline generics expose canonical SDIVF APIs without active SDIVS wrappers', () => {
  assert.match(phaseFactorySource, /export enum SDIVFPhase/);
  assert.match(phaseFactorySource, /FINISH = 'finish'/);
  assert.match(phaseFactorySource, /export function factorySDIVFPhaseDelegators/);
  assert.doesNotMatch(phaseFactorySource, /factorySDIVSPhaseDelegators/);
  assert.match(sdivFactorySource, /export interface SDIVFConfig/);
  assert.match(sdivFactorySource, /export function factorySDIVFPipeline/);
  assert.match(sdivFactorySource, /pipelineExec\.store\('pipeline', 'pattern', 'SDIVF'\)/);
  assert.match(sdivFactorySource, /pipelineExec\.store\('phase', 'current', 'finish'\)/);
  assert.doesNotMatch(sdivFactorySource, /factorySDIVSPipeline|factorySDIVSExecutorPipeline|SDIVSConfig|SDIVSExecutorConfig/);
  assert.doesNotMatch(sdivFactorySource, /\bshipping\b/);
  assert.match(pipelineFactorySource, /factoryPipelineWithDIVFinishLoop/);
  assert.doesNotMatch(pipelineFactorySource, /factoryPipelineWithDIVLoop|config\.shipping/);
  assert.doesNotMatch(primitivesSource, /\bshipping\b|Shipping/);
});

test('AssetPack pipeline owns the live package filesystem after deliverable package removal', () => {
  assert.equal(existsSync(new URL('../../packages/pipelines/asset-pack/package.json', import.meta.url)), true);
  assert.equal(existsSync(new URL('../../packages/pipelines/deliverable/package.json', import.meta.url)), false);
  assert.match(assetPackPackageSource, /"name": "@bitcode\/pipeline-asset-pack"/);
  assert.match(assetPackPackageSource, /"description": "Bitcode AssetPack pipeline/u);
  assert.match(assetPackReadmeSource, /^# AssetPack Pipeline/m);
  assert.match(assetPackReadmeSource, /`SDIVF`/u);
  assert.match(rootTsconfigSource, /"@bitcode\/pipeline-asset-pack": \["packages\/pipelines\/asset-pack\/src\/index\.ts"\]/u);
  assert.match(uapiNextConfigSource, /'asset-pack'/u);
  assert.match(pnpmLockSource, /packages\/pipelines\/asset-pack:/u);
  assert.doesNotMatch(rootTsconfigSource, /packages\/pipelines\/deliverable/u);
  assert.doesNotMatch(uapiNextConfigSource, /'packages'[\s\S]{0,120}'pipelines'[\s\S]{0,120}'deliverable'/u);
  assert.doesNotMatch(pnpmLockSource, /pipeline-deliverable|pipelines\/deliverable|packages\/pipelines\/deliverable/u);
  assert.deepEqual(
    listFiles(new URL('../../packages/pipelines/asset-pack/src/', import.meta.url)).filter((path) => path.endsWith('.js')),
    []
  );
});

test('retained AssetPack corridor executes Finish while preserving shipping compatibility aliases', () => {
  assert.match(deliverableIndexSource, /factorySDIVFExecutorPipeline/);
  assert.match(deliverableIndexSource, /finish: finishPhase/);
  assert.match(deliverableIndexSource, /export const assetPackPipeline/);
  assert.match(deliverableIndexSource, /export const deliverablePipeline = assetPackPipeline/);
  assert.match(deliverableIndexSource, /export const runSDIVFPipeline = assetPackPipeline/);
  assert.match(deliverableIndexSource, /export const runSDIVSPipeline = assetPackPipeline/);
  assert.match(deliverablePhasesSource, /export const finishPhase/);
  assert.match(deliverablePhasesSource, /createAgentExecutor\('finish:deliver-asset-pack-to-destination-agent'\)/);
  assert.match(deliverablePhasesSource, /shipping: finishPhase/);
  assert.match(finishPhaseSource, /registerFinishAgentsForType/);
  assert.match(finishPhaseSource, /finish:deliver-asset-pack-to-destination-agent/);
  assert.match(finishPhaseSource, /shipping:deliverable-pipeline-ship-agent/);
  assert.match(finishPhaseSource, /agents\/finish\/deliver-asset-pack-to-destination-agent/);
  assert.match(shippingPhaseCompatibilitySource, /Canonical V26 implementation lives in `\.\/finish`/);
});

test('Finish agents and postprocess prefer finish stores before shipping fallback', () => {
  assert.match(deliverAgentSource, /Finish Deliver agent/);
  assert.match(deliverAgentSource, /execution\.store\('finish','pullRequestUrl'/);
  assert.match(finalSummarySource, /name: 'finish:final-work-summary'/);
  assert.match(finalSummarySource, /finish\/final_work_summary/);
  assert.match(finalSummarySource, /get\?\.\('finish', 'pullRequestUrl'\).*get\?\.\('shipping', 'pullRequestUrl'\)/s);
  assert.match(deliverAgentCompatibilitySource, /Canonical V26 Finish\/Delivering implementation lives/u);
  assert.match(finalSummaryCompatibilitySource, /Canonical V26 Finish implementation lives/u);
  assert.match(postprocessSource, /execution\.get\('finish', 'pullRequestUrl'\)/);
  assert.match(postprocessSource, /get\?\.\('finish\/final_work_summary', 'writtenAssets'\)/);
});

test('compatibility prompt and agent names point at precise canonical Finish replacements', () => {
  assert.match(readyToShipPromptSource, /createDeliverablesPipelineValidationPhaseReadyToFinishAgentPrompt/);
  assert.match(readyToShipPromptSource, /@deprecated V26 compatibility alias for old ReadyToShip callers/);
  assert.match(finalizeShipmentPromptSource, /createDeliverablesPipelineFinishPhaseFinalizeAssetPackDeliveryEvidenceAgentPrompt/);
  assert.match(finalizeShipmentPromptSource, /@deprecated V26 compatibility alias for old Shipping\/FinalizeShipment callers/);
  assert.match(validationReadyAgentSource, /ReadyToFinish Agent - Final Validation Phase Decision/);
  assert.match(validationReadyAgentSource, /createDeliverablesPipelineValidationPhaseReadyToFinishAgentPrompt/);
  assert.match(compatibilityShippingAgentsSource, /DeliverablesPipelineFinishPhaseFinalizeAssetPackDeliveryEvidenceAgent/);
  assert.match(compatibilityShippingAgentsSource, /@deprecated V26 compatibility alias/);
  assert.match(finishSpec, /Deprecated names, compatibility wrappers, and any remaining old filesystem labels are tactical fifth-gate aids, not V26 closure evidence/);
  assert.match(finishSpec, /Full V26 closure requires no deprecated, backwards-compatible, legacy, or unspecified broad-pipeline names/);
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
    assert.doesNotMatch(source, /current_version: "G[A]1/u, `${name} keeps a G[A]1 current_version`);
    assert.doesNotMatch(source, /"PROMPTPART_[^"]+": "G[A]1/u, `${name} keeps a G[A]1 dependency version`);

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
