import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';

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
const comprehendTaskOverlayCompatibilitySource = readFileSync(
  new URL('../../packages/pipelines/deliverable/src/agents/prompts/deliverable-pipeline-comprehend-task-agent-prompts.ts', import.meta.url),
  'utf8'
);
const comprehendNeedBasePromptSource = readFileSync(
  new URL('../../packages/pipelines/deliverable/src/agents/prompts/comprehend-need-prompt.ts', import.meta.url),
  'utf8'
);
const comprehendTaskBaseCompatibilitySource = readFileSync(
  new URL('../../packages/pipelines/deliverable/src/agents/prompts/comprehend-task-prompt.ts', import.meta.url),
  'utf8'
);
const comprehendNeedRawIdentityPromptSource = readFileSync(
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_comprehendneed_system_identity.ts', import.meta.url),
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
const semanticPayloadSource = readFileSync(
  new URL('../../packages/api/src/routes/deliverables-semantic-payload.ts', import.meta.url),
  'utf8'
);
const executionsPageHeaderSource = readFileSync(
  new URL('../../uapi/app/executions/components/ExecutionsPageHeader.tsx', import.meta.url),
  'utf8'
);
const deliverablesRouteSource = readFileSync(
  new URL('../../packages/api/src/routes/deliverables.ts', import.meta.url),
  'utf8'
);
const streamParserSource = readFileSync(
  new URL('../../uapi/streaming/stream-parser.ts', import.meta.url),
  'utf8'
);
const deliverableStartedTemplateSource = readFileSync(
  new URL('../../supabase/templates/deliverable_started.html', import.meta.url),
  'utf8'
);
const deliverableCompleteTemplateSource = readFileSync(
  new URL('../../supabase/templates/deliverable_complete.html', import.meta.url),
  'utf8'
);
const deliverableFailedTemplateSource = readFileSync(
  new URL('../../supabase/templates/deliverable_failed.html', import.meta.url),
  'utf8'
);
const deliverableShortCircuitTemplateSource = readFileSync(
  new URL('../../supabase/templates/deliverable_short_circuit.html', import.meta.url),
  'utf8'
);
const pipelinePurposePromptSource = readFileSync(
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_pipeline_deliverable_purpose_corestatement.ts', import.meta.url),
  'utf8'
);
const pipelineTypeListPromptSource = readFileSync(
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_pipeline_deliverable_deliverabletype_list.ts', import.meta.url),
  'utf8'
);
const pipelineDivLoopPromptSource = readFileSync(
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_pipeline_deliverable_divloop_detailcontent.ts', import.meta.url),
  'utf8'
);
const pipelineExecutionPatternPromptSource = readFileSync(
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_pipeline_deliverable_executionpattern_detailcontent.ts', import.meta.url),
  'utf8'
);
const repositorySetupPurposePromptSource = readFileSync(
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_tool_repositorysetup_deliverables_purpose_addendum.ts', import.meta.url),
  'utf8'
);
const repositorySetupMetadataPromptSource = readFileSync(
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_tool_repositorysetup_deliverables_metadata_pipeline.ts', import.meta.url),
  'utf8'
);
const repositorySetupCapabilitiesPromptSource = readFileSync(
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_tool_repositorysetup_deliverables_capabilities_addendum.ts', import.meta.url),
  'utf8'
);
const generateMassivePromptPartsSource = readFileSync(
  new URL('../../scripts/generate-massive-prompt-parts.ts', import.meta.url),
  'utf8'
);
const promptAuditScriptSource = readFileSync(
  new URL('../../scripts/prompt-audit.sh', import.meta.url),
  'utf8'
);
const updateDeliverableTableNamesScriptSource = readFileSync(
  new URL('../../scripts/update-deliverable-table-names.sh', import.meta.url),
  'utf8'
);
const updateDeliverableAgentsScriptSource = readFileSync(
  new URL('../../scripts/update-deliverable-agents.sh', import.meta.url),
  'utf8'
);
const generateDeliverablePromptPartsTsSource = readFileSync(
  new URL('../../scripts/generate-deliverable-promptparts.ts', import.meta.url),
  'utf8'
);
const fixExecutionToDirectivesScriptSource = readFileSync(
  new URL('../../scripts/fix-execution-to-directives.sh', import.meta.url),
  'utf8'
);
const verifyPromptExportsScriptSource = readFileSync(
  new URL('../../scripts/verify-prompt-exports.py', import.meta.url),
  'utf8'
);
const phaseSetupPurposePromptSource = readFileSync(
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_phase_deliverablesetup_purpose_corestatement.ts', import.meta.url),
  'utf8'
);
const phaseDiscoveryPurposePromptSource = readFileSync(
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_phase_deliverablediscovery_purpose_corestatement.ts', import.meta.url),
  'utf8'
);
const phaseImplementationPurposePromptSource = readFileSync(
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_phase_deliverableimplementation_purpose_corestatement.ts', import.meta.url),
  'utf8'
);
const phaseValidationPurposePromptSource = readFileSync(
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_phase_deliverablevalidation_purpose_corestatement.ts', import.meta.url),
  'utf8'
);
const phaseShippingPurposePromptSource = readFileSync(
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_phase_deliverableshipping_purpose_corestatement.ts', import.meta.url),
  'utf8'
);
const setupComprehendTaskPurposePromptSource = readFileSync(
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_deliverablesetupcomprehendtask_purpose_corestatement.ts', import.meta.url),
  'utf8'
);
const setupComprehendTaskIdentityPromptSource = readFileSync(
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_deliverablesetupcomprehendtask_identity_definition.ts', import.meta.url),
  'utf8'
);
const setupComprehendNeedPurposePromptSource = readFileSync(
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_deliverablesetupcomprehendneed_purpose_corestatement.ts', import.meta.url),
  'utf8'
);
const setupComprehendNeedIdentityPromptSource = readFileSync(
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_deliverablesetupcomprehendneed_identity_definition.ts', import.meta.url),
  'utf8'
);
const finalizeShipmentPurposePromptSource = readFileSync(
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_deliverableshippingfinalizeshipment_purpose_corestatement.ts', import.meta.url),
  'utf8'
);
const finalizeShipmentIdentityPromptSource = readFileSync(
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_deliverableshippingfinalizeshipment_identity_definition.ts', import.meta.url),
  'utf8'
);
const deliverablesSystemBasePromptSource = readFileSync(
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_deliverables_system_base.ts', import.meta.url),
  'utf8'
);
const deliverablesSystemExcellencePromptSource = readFileSync(
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_deliverables_system_excellence_standards.ts', import.meta.url),
  'utf8'
);
const deliverablesSystemCognitivePromptSource = readFileSync(
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_deliverables_system_cognitive_framework.ts', import.meta.url),
  'utf8'
);
const deliverablesSystemUltraCriticalPromptSource = readFileSync(
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_deliverables_system_ultra_critical_reflection.ts', import.meta.url),
  'utf8'
);
const implementationDividePullRequestPurposePromptSource = readFileSync(
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_deliverableimplementationdividepullrequest_purpose_corestatement.ts', import.meta.url),
  'utf8'
);
const implementationDividePullRequestIdentityPromptSource = readFileSync(
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_deliverableimplementationdividepullrequest_identity_definition.ts', import.meta.url),
  'utf8'
);
const implementationDividePullRequestPlanPromptSource = readFileSync(
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_deliverableimplementationdividepullrequest_ptrrplan_purpose.ts', import.meta.url),
  'utf8'
);
const packagePrPurposePromptSource = readFileSync(
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_deliverableshippingpackagepr_purpose_corestatement.ts', import.meta.url),
  'utf8'
);
const packagePrCapabilitiesPromptSource = readFileSync(
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_deliverableshippingpackagepr_capabilities_list.ts', import.meta.url),
  'utf8'
);
const createPullRequestPurposePromptSource = readFileSync(
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_createpullrequest_purpose_corestatement.ts', import.meta.url),
  'utf8'
);
const shippingCreatePullRequestPurposePromptSource = readFileSync(
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_deliverableshippingcreatepullrequest_purpose_corestatement.ts', import.meta.url),
  'utf8'
);
const shippingCreatePullRequestIdentityPromptSource = readFileSync(
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_deliverableshippingcreatepullrequest_identity_definition.ts', import.meta.url),
  'utf8'
);
const createCodeChangeIdentityPromptSource = readFileSync(
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_createcodechange_system_identity.ts', import.meta.url),
  'utf8'
);
const createCodeChangeRolePromptSource = readFileSync(
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_createcodechange_system_role.ts', import.meta.url),
  'utf8'
);
const createCodeChangeInstructionsPromptSource = readFileSync(
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_createcodechange_system_instructions.ts', import.meta.url),
  'utf8'
);
const readyToShipIdentityPromptSource = readFileSync(
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_readytoship_system_identity.ts', import.meta.url),
  'utf8'
);
const readyToShipRolePromptSource = readFileSync(
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_readytoship_system_role.ts', import.meta.url),
  'utf8'
);
const readyToShipInstructionsPromptSource = readFileSync(
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_readytoship_system_instructions.ts', import.meta.url),
  'utf8'
);
const readyToShipPurposePromptSource = readFileSync(
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_readytoship_purpose_corestatement.ts', import.meta.url),
  'utf8'
);
const readyToShipCodeChangeIdentityPromptSource = readFileSync(
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_readytoshipcodechange_system_identity.ts', import.meta.url),
  'utf8'
);
const readyToShipCodeChangeInstructionsPromptSource = readFileSync(
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_readytoshipcodechange_system_instructions.ts', import.meta.url),
  'utf8'
);
const readyToShipCodeChangePlanPromptSource = readFileSync(
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_readytoshipcodechange_plan_strategy.ts', import.meta.url),
  'utf8'
);
const readyToShipCodeChangeReviewIdentityPromptSource = readFileSync(
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_readytoshipcodechangereview_system_identity.ts', import.meta.url),
  'utf8'
);
const readyToShipCodeChangeReviewInstructionsPromptSource = readFileSync(
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_readytoshipcodechangereview_system_instructions.ts', import.meta.url),
  'utf8'
);
const readyToShipCodeChangeReviewPlanPromptSource = readFileSync(
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_readytoshipcodechangereview_plan_strategy.ts', import.meta.url),
  'utf8'
);
const promptPackageIndexSource = readFileSync(
  new URL('../../packages/prompts/src/index.ts', import.meta.url),
  'utf8'
);
const promptPackageTypesSource = readFileSync(
  new URL('../../packages/prompts/src/index.d.ts', import.meta.url),
  'utf8'
);
const promptPackageRuntimeSource = readFileSync(
  new URL('../../packages/prompts/src/index.js', import.meta.url),
  'utf8'
);
const reformedRuntimePromptJsSources = [
  '../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_deliverables_system_base.js',
  '../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_createcodechange_system_instructions.js',
  '../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_readytoship_system_identity.js',
  '../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_readytoshipcodechange_system_instructions.js',
  '../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_readytoshipcodechangereview_system_instructions.js',
].map((relativePath) => readFileSync(new URL(relativePath, import.meta.url), 'utf8'));

const rawPromptPartDirs = [
  '../../packages/prompts/src/raw_promptparts/specific/',
  '../../packages/prompts/src/raw_promptparts/generic/',
].map((relativePath) => new URL(relativePath, import.meta.url));

const exportNamePattern = /export const ([A-Za-z0-9_]+)(?:: PromptPart)?\s*=/m;

function unescapePromptLiteral(value, quote) {
  if (quote === '`') return value;

  return value
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, '\r')
    .replace(/\\t/g, '\t')
    .replace(/\\'/g, "'")
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, '\\');
}

function extractFirstPromptLiteral(source, offset) {
  for (let index = offset; index < source.length; index += 1) {
    const quote = source[index];
    if (quote !== '`' && quote !== "'" && quote !== '"') continue;

    let content = '';
    for (let cursor = index + 1; cursor < source.length; cursor += 1) {
      const character = source[cursor];
      if (character === '\\') {
        content += character;
        cursor += 1;
        if (cursor < source.length) content += source[cursor];
        continue;
      }
      if (character === quote) {
        return unescapePromptLiteral(content, quote);
      }
      content += character;
    }
  }

  return null;
}

function extractTsPromptPart(source) {
  const match = source.match(exportNamePattern);
  if (!match || match.index === undefined) return null;

  return {
    name: match[1],
    content: extractFirstPromptLiteral(source, match.index + match[0].length),
  };
}

function extractJsPromptPart(source, name) {
  const assignment = new RegExp(`exports\\.${name}\\s*=(?!\\s*void\\s+0)`, 'm').exec(source);
  if (!assignment || assignment.index === undefined) return null;

  return extractFirstPromptLiteral(source, assignment.index + assignment[0].length);
}

test('V26 deliverable reform supplement requires semantic mirrors beyond retained compatibility naming', () => {
  assert.match(reformSource, /`deliverable` survives only as a retained compatibility path\/name/u);
  assert.match(reformSource, /live Bitcode meaning is a need-satisfying agentic pipeline run/u);
  assert.match(reformSource, /shipping phase may then emit `deliverables` only as connected-interface delivery mechanisms/u);
  assert.match(reformSource, /`asset pack`/u);
  assert.match(reformSource, /`written asset`/u);
  assert.match(reformSource, /workspace-run summaries, mock reread projections, and active UI detail surfaces should prefer semantic `writtenAssets`/u);
  assert.match(reformSource, /execution stores and postprocessed artifacts should mirror compatibility keys with semantic `need`, `writtenAssetType`, and asset-pack-shaped snapshots/u);
  assert.match(reformSource, /shapes live protocol behavior through Bitcode's commercial infrastructure/u);
  assert.match(reformSource, /hydrate a registry-bearing pipeline execution context when callers still enter through a bare `Execution`/u);
  assert.match(reformSource, /retained maintenance\/audit scripts that operate on this corridor/u);
  assert.match(reformSource, /teach `comprehend-need` \/ asset-pack-run semantics/u);
  assert.match(reformSource, /retained repair, generation, and export-verification scripts/u);
});

test('retained deliverable schemas expose asset-pack written-asset semantic aliases', () => {
  assert.match(pipelineSchemasSource, /type DeliveryMechanismMeta = DeliverableResultMeta;/u);
  assert.match(pipelineSchemasSource, /deliveryMechanism\?: DeliveryMechanismMeta;/u);
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
  assert.match(postprocessSource, /const shippingMechanism = enhanced\.deliveryMechanism \|\| enhanced\.deliverable;/u);
  assert.match(postprocessSource, /enhanced\.semanticKind = 'asset-pack-written-asset';/u);
  assert.match(postprocessSource, /enhanced\.deliveryMechanism = \{ \.\.\.\(shippingMechanism \|\| \{\}\), prUrl \} as any;/u);
  assert.match(postprocessSource, /deliveryMechanism: normalized\.deliveryMechanism \|\| normalized\.deliverable,/u);
  assert.match(postprocessSource, /enhanced\.writtenAssetType/u);
  assert.match(postprocessSource, /kind: 'deliverable'/u);
  assert.match(postprocessSource, /semanticKind: 'asset-pack-written-asset'/u);
  assert.match(finalSummarySource, /writtenAssets: WrittenAssetsSchema\.optional\(\)/u);
  assert.match(finalSummarySource, /deliveryMechanism: DeliveryMechanismSchema\.optional\(\)/u);
  assert.match(finalSummarySource, /lines\.push\('', `## Need`, need\.trim\(\)\);/u);
  assert.match(finalSummarySource, /store\?\.\('shipping\/final_work_summary', 'writtenAssets', writtenAssets as any\);/u);
  assert.match(finalSummarySource, /store\?\.\('shipping\/final_work_summary', 'deliveryMechanism', deliveryMechanism as any\);/u);
  assert.match(finalSummarySource, /store\?\.\('shipping\/final_work_summary', 'writtenAssetType', dtype \|\| undefined\);/u);
});

test('setup comprehension path mirrors semantic need and written-asset keys for downstream phases', () => {
  assert.match(comprehendNeedSource, /name: 'deliverable-pipeline-comprehend-need-agent'/u);
  assert.match(comprehendNeedSource, /deliverable-pipeline-comprehend-need-agent-prompts/u);
  assert.match(comprehendNeedSource, /need_satisfaction_criteria/u);
  assert.match(comprehendNeedSource, /written_asset_types/u);
  assert.match(comprehendNeedAliasSource, /deliverable-pipeline-comprehend-need-agent/u);
  assert.match(comprehendNeedPromptSource, /DP_COMPREHEND_NEED_SYSTEM_PROMPT/u);
  assert.match(comprehendNeedPromptSource, /PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDNEED_IDENTITY_DEFINITION/u);
  assert.doesNotMatch(comprehendNeedPromptSource, /PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDTASK_IDENTITY_DEFINITION/u);
  assert.match(comprehendNeedPromptSource, /pipeline:compatibility/u);
  assert.match(comprehendNeedPromptSource, /asset-pack-written-asset/u);
  assert.match(comprehendNeedPromptSource, /DP_COMPREHEND_TASK_SYSTEM_PROMPT = DP_COMPREHEND_NEED_SYSTEM_PROMPT/u);
  assert.match(comprehendTaskOverlayCompatibilitySource, /Compatibility entry point for the former task-named deliverable setup overlay/u);
  assert.match(comprehendTaskOverlayCompatibilitySource, /export \* from '\.\/deliverable-pipeline-comprehend-need-agent-prompts';/u);
  assert.match(comprehendNeedBasePromptSource, /createComprehendNeedSystemPrompt/u);
  assert.match(comprehendNeedBasePromptSource, /PROMPTPART_SPECIFIC_AGENT_COMPREHENDNEED_SYSTEM_IDENTITY/u);
  assert.match(comprehendNeedBasePromptSource, /ComprehendTaskPrompts = ComprehendNeedPrompts/u);
  assert.match(comprehendTaskBaseCompatibilitySource, /Compatibility entry point for the former task-named prompt module/u);
  assert.match(comprehendTaskBaseCompatibilitySource, /export \* from '\.\/comprehend-need-prompt';/u);
  assert.match(comprehendNeedRawIdentityPromptSource, /Bitcode Comprehend Need Agent/u);
  assert.match(comprehendNeedRawIdentityPromptSource, /asset-pack synthesis and connected-interface shipping/u);
  assert.match(setupPhaseSource, /deliverable-pipeline-comprehend-need-agent/u);
  assert.match(preprocessSource, /deliverable-pipeline-comprehend-need-agent/u);
  assert.match(preprocessSource, /new PipelinePromptRegistry/u);
  assert.match(preprocessSource, /new PipelineToolRegistry/u);
  assert.match(preprocessSource, /new PipelineAgentRegistry/u);
  assert.match(comprehendNeedSource, /execution\.store\('setup', 'writtenAssetType', types\);/u);
  assert.match(comprehendNeedSource, /execution\.store\('setup\/written-asset-type', 'type', types\);/u);
  assert.match(comprehendNeedSource, /execution\.store\('setup\/need', 'satisfactionCriteria', needSatisfactionCriteria\);/u);
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

test('operator-facing execution header and retained route teach shipping-mechanism compatibility semantics', () => {
  assert.match(executionsPageHeaderSource, /shipping-template selection/u);
  assert.match(executionsPageHeaderSource, /Compatibility shipping wrapper\. Bitcode-owned meaning lives in written assets \/ asset packs\./u);
  assert.match(executionsPageHeaderSource, /No shipping surfaces to summarize/u);
  assert.match(executionsPageHeaderSource, /expected written asset pack and shipping result/u);
  assert.match(executionsPageHeaderSource, /A shipping delivery mechanism can be a/u);
  assert.match(executionsPageHeaderSource, /each shipping a stable asset pack and always supplemented by a final work summary/u);
  assert.match(executionsPageHeaderSource, /single high-quality asset pack and its shipping result/u);
  assert.match(deliverablesRouteSource, /Retained compatibility route handlers for asset-pack shipping pipeline runs\./u);
  assert.match(deliverablesRouteSource, /Create and execute the retained compatibility route for an asset-pack/u);
  assert.match(deliverablesRouteSource, /execution\.store\('route\/preprocessed', 'assetPackWrittenAsset', preprocessing\);/u);
  assert.match(deliverablesRouteSource, /semanticKind: 'asset-pack-written-asset' as const/u);
  assert.match(deliverablesRouteSource, /need: finalWorkSummary\?\.need \|\| preprocessedSnapshot\?\.need \|\| definition_of_done/u);
  assert.match(deliverablesRouteSource, /assetPack: finalWorkSummary\?\.assetPack \|\| preprocessedSnapshot\?\.assetPack \|\| null/u);
  assert.match(deliverablesRouteSource, /semantic_event_type: 'asset_pack_run_created'/u);
  assert.match(deliverablesRouteSource, /semantic_event_type: 'asset_pack_run_completed'/u);
  assert.match(deliverablesRouteSource, /semantic_event_type: 'asset_pack_run_failed'/u);
  assert.match(deliverablesRouteSource, /semantic_event_type: 'asset_pack_run_cancelled'/u);
  assert.match(deliverablesRouteSource, /Bitcode Asset-Pack Run Started/u);
  assert.match(deliverablesRouteSource, /Bitcode Asset-Pack Run Completed/u);
  assert.match(deliverablesRouteSource, /Bitcode Asset-Pack Run Cancelled/u);
  assert.match(deliverablesRouteSource, /Your Bitcode asset-pack run #\$\{runId\} has started/u);
  assert.match(deliverablesRouteSource, /Your Bitcode asset-pack run #\$\{runId\} is complete/u);
  assert.match(deliverablesRouteSource, /buildSemanticCompletionResult/u);
  assert.match(semanticPayloadSource, /semanticKind: 'asset-pack-written-asset'/u);
  assert.match(semanticPayloadSource, /writtenAssets/u);
  assert.match(semanticPayloadSource, /deliveryMechanism/u);
  assert.match(semanticPayloadSource, /assetPack/u);
  assert.match(streamParserSource, /writtenAssets,/u);
  assert.match(streamParserSource, /deliveryMechanism,/u);
  assert.match(streamParserSource, /semanticKind: data\.result\.semanticKind \|\|/u);
});

test('retained templates and promptparts keep compatibility names but teach asset-pack-run semantics', () => {
  assert.match(deliverableStartedTemplateSource, /Bitcode asset-pack run started/u);
  assert.match(deliverableStartedTemplateSource, /synthesizing written assets and shipping results/u);
  assert.match(deliverableCompleteTemplateSource, /Bitcode asset-pack run complete/u);
  assert.match(deliverableCompleteTemplateSource, /Asset-Pack Overview/u);
  assert.match(deliverableCompleteTemplateSource, /Shipping delivery mechanism:/u);
  assert.match(deliverableCompleteTemplateSource, /shipping delivery mechanisms inside Bitcode/u);
  assert.match(deliverableFailedTemplateSource, /Bitcode asset-pack run failed/u);
  assert.match(deliverableFailedTemplateSource, /asset-pack synthesis and shipping flow/u);
  assert.match(deliverableShortCircuitTemplateSource, /Bitcode asset-pack run short-circuited/u);
  assert.match(deliverableShortCircuitTemplateSource, /asset-pack synthesis and shipping completed/u);
  assert.match(pipelinePurposePromptSource, /retained deliverable compatibility pipeline/u);
  assert.match(pipelinePurposePromptSource, /Bitcode need-satisfying asset-pack run/u);
  assert.match(pipelinePurposePromptSource, /shipping delivery mechanisms/u);
  assert.match(pipelineTypeListPromptSource, /Synthesize implementation written assets/u);
  assert.match(pipelineTypeListPromptSource, /connected-interface mechanisms/u);
  assert.match(pipelineDivLoopPromptSource, /Discovery refines the expressed need/u);
  assert.match(pipelineDivLoopPromptSource, /Implementation synthesizes VCS-compatible written assets/u);
  assert.match(pipelineDivLoopPromptSource, /Validation verifies need satisfaction/u);
  assert.match(pipelineExecutionPatternPromptSource, /discovery shapes the asset-pack synthesis approach/u);
  assert.match(pipelineExecutionPatternPromptSource, /shipping emits connected-interface delivery mechanisms/u);
  assert.match(repositorySetupPurposePromptSource, /retained deliverable-compatibility asset-pack run/u);
  assert.match(repositorySetupPurposePromptSource, /synthesizes written assets for shipping delivery mechanisms/u);
  assert.match(repositorySetupMetadataPromptSource, /retained compatibility wrapper for Bitcode asset-pack run setup/u);
  assert.match(repositorySetupCapabilitiesPromptSource, /need understanding and written-asset synthesis/u);
  assert.match(generateMassivePromptPartsSource, /Retained deliverable-compatibility pipeline .* for Bitcode asset-pack runs/u);
  assert.match(phaseSetupPurposePromptSource, /understand the expressed need/u);
  assert.match(phaseDiscoveryPurposePromptSource, /shape the asset-pack synthesis approach/u);
  assert.match(phaseImplementationPurposePromptSource, /Synthesize written assets using VCS-compatible operations/u);
  assert.match(phaseValidationPurposePromptSource, /verify need satisfaction and written-asset integrity/u);
  assert.match(phaseShippingPurposePromptSource, /Emit connected-interface delivery mechanisms for validated written assets/u);
  assert.match(setupComprehendNeedPurposePromptSource, /written-asset expectations, shipping-wrapper expectations, asset-pack context/u);
  assert.match(setupComprehendNeedIdentityPromptSource, /Bitcode need, satisfaction criteria, written-asset expectations, asset-pack context/u);
  assert.match(setupComprehendTaskPurposePromptSource, /Compatibility PromptPart for the former deliverables setup comprehend-task/u);
  assert.match(setupComprehendTaskPurposePromptSource, /written-asset expectations, shipping-wrapper expectations, asset-pack context/u);
  assert.match(setupComprehendTaskIdentityPromptSource, /Compatibility PromptPart for the former deliverables setup comprehend-task/u);
  assert.match(setupComprehendTaskIdentityPromptSource, /Bitcode need, satisfaction criteria, written-asset expectations, asset-pack context/u);
  assert.match(finalizeShipmentPurposePromptSource, /finalize shipping delivery mechanisms for validated written assets/u);
  assert.match(finalizeShipmentIdentityPromptSource, /finalizing shipping delivery mechanisms for validated written assets/u);
  assert.match(deliverablesSystemBasePromptSource, /satisfy an expressed need by synthesizing stable written assets \/ asset-packs/u);
  assert.match(deliverablesSystemBasePromptSource, /shipping wrappers subordinate to the Bitcode asset-pack meaning/u);
  assert.match(deliverablesSystemExcellencePromptSource, /NEED SATISFACTION/u);
  assert.match(deliverablesSystemCognitivePromptSource, /ASSET-PACK SYNTHESIS/u);
  assert.match(deliverablesSystemUltraCriticalPromptSource, /written assets primary and shipping wrappers secondary/u);
  assert.match(implementationDividePullRequestPurposePromptSource, /written-asset synthesis that will later ship through a pull request wrapper/u);
  assert.match(implementationDividePullRequestIdentityPromptSource, /validated written assets destined for a pull request shipping wrapper/u);
  assert.match(implementationDividePullRequestPlanPromptSource, /synthesize validated written assets for a pull request shipping wrapper/u);
  assert.match(packagePrPurposePromptSource, /pull request shipping wrapper/u);
  assert.match(packagePrCapabilitiesPromptSource, /pull request shipping summaries with written-asset context/u);
  assert.match(createPullRequestPurposePromptSource, /pull request shipping wrapper for validated written assets/u);
  assert.match(shippingCreatePullRequestPurposePromptSource, /create a pull request shipping wrapper for validated written assets/u);
  assert.match(shippingCreatePullRequestIdentityPromptSource, /emitting a pull request shipping wrapper for validated written assets/u);
  assert.match(createCodeChangeIdentityPromptSource, /validated written assets into production-ready pull request shipping wrappers/u);
  assert.match(createCodeChangeRolePromptSource, /cohesive pull request shipping wrapper/u);
  assert.match(createCodeChangeInstructionsPromptSource, /Create a pull request shipping wrapper by leveraging full execution context/u);
  assert.match(readyToShipIdentityPromptSource, /final readiness orchestration for validated written assets/u);
  assert.match(readyToShipRolePromptSource, /authorize connected-interface delivery mechanisms for validated written assets/u);
  assert.match(readyToShipInstructionsPromptSource, /evaluating written-asset integrity/u);
  assert.match(readyToShipPurposePromptSource, /whether written assets satisfy the need and are safe to ship/u);
  assert.match(readyToShipCodeChangeIdentityPromptSource, /final certification for code written assets/u);
  assert.match(readyToShipCodeChangeInstructionsPromptSource, /pull request shipping-wrapper emission/u);
  assert.match(readyToShipCodeChangePlanPromptSource, /code written-asset readiness assessment/u);
  assert.match(readyToShipCodeChangeReviewIdentityPromptSource, /final validation of review readiness for code written assets/u);
  assert.match(readyToShipCodeChangeReviewInstructionsPromptSource, /written assets and the shipping wrapper remain coherent/u);
  assert.match(readyToShipCodeChangeReviewPlanPromptSource, /written-asset coherence checks/u);
});

test('retained maintenance scripts audit current Bitcode prompt and asset-pack-run semantics', () => {
  assert.match(promptAuditScriptSource, /RETAINED ASSET-PACK PIPELINE PROMPT AUDIT/u);
  assert.match(promptAuditScriptSource, /packages\/prompts\/src\/raw_promptparts\/specific/u);
  assert.match(promptAuditScriptSource, /"comprehendneed"/u);
  assert.match(promptAuditScriptSource, /"try_directives"/u);
  assert.doesNotMatch(promptAuditScriptSource, /"comprehendtask"/u);
  assert.doesNotMatch(promptAuditScriptSource, /prompts\/src\/raw\/specific/u);

  assert.match(updateDeliverableTableNamesScriptSource, /repo_root=/u);
  assert.match(updateDeliverableTableNamesScriptSource, /deliverable_pipeline_runs/u);
  assert.match(updateDeliverableTableNamesScriptSource, /Bitcode asset-pack pipeline corridor/u);
  assert.doesNotMatch(updateDeliverableTableNamesScriptSource, /Developer\/engi\/engi/u);

  assert.match(updateDeliverableAgentsScriptSource, /repo_root=/u);
  assert.match(updateDeliverableAgentsScriptSource, /retained asset-pack pipeline agents/u);
  assert.match(updateDeliverableAgentsScriptSource, /packages\/pipelines\/deliverable\/src\/agents/u);
  assert.doesNotMatch(updateDeliverableAgentsScriptSource, /Developer\/engi\/engi/u);

  assert.match(generateDeliverablePromptPartsTsSource, /Comprehend Need/u);
  assert.match(generateDeliverablePromptPartsTsSource, /raw_promptparts\/specific/u);
  assert.match(generateDeliverablePromptPartsTsSource, /asset-pack run semantics/u);
  assert.doesNotMatch(generateDeliverablePromptPartsTsSource, /comprehendtask/u);

  assert.match(fixExecutionToDirectivesScriptSource, /try_execution PromptParts to try_directives/u);
  assert.match(fixExecutionToDirectivesScriptSource, /packages\/prompts\/src\/raw_promptparts\/specific/u);
  assert.doesNotMatch(fixExecutionToDirectivesScriptSource, /packages\/prompts\/src\/raw\/specific/u);

  assert.match(verifyPromptExportsScriptSource, /raw PromptPart exports/u);
  assert.match(verifyPromptExportsScriptSource, /packages\/prompts\/src\/raw_promptparts/u);
  assert.doesNotMatch(verifyPromptExportsScriptSource, /Developer\/engi\/engi/u);
});

test('raw promptpart runtime JavaScript carries canonical TypeScript PromptPart content', () => {
  const mismatches = [];
  const missingRuntimeFiles = [];
  const skippedNonPromptPartFiles = [];
  let checkedPromptParts = 0;

  for (const directoryUrl of rawPromptPartDirs) {
    for (const filename of readdirSync(directoryUrl).sort()) {
      if (!filename.endsWith('.ts') || filename.endsWith('.d.ts')) continue;

      const sourceUrl = new URL(filename, directoryUrl);
      const sourceText = readFileSync(sourceUrl, 'utf8');
      const promptPart = extractTsPromptPart(sourceText);
      if (!promptPart) {
        skippedNonPromptPartFiles.push(filename);
        continue;
      }
      assert.ok(promptPart.content, `${filename} should expose literal PromptPart content`);

      const runtimeUrl = new URL(filename.replace(/\.ts$/u, '.js'), directoryUrl);
      let runtimeText = '';
      try {
        runtimeText = readFileSync(runtimeUrl, 'utf8');
      } catch {
        missingRuntimeFiles.push(runtimeUrl.pathname);
        continue;
      }

      const runtimeContent = extractJsPromptPart(runtimeText, promptPart.name);
      if (runtimeContent !== promptPart.content) {
        mismatches.push(runtimeUrl.pathname);
      } else {
        checkedPromptParts += 1;
      }
    }
  }

  assert.deepEqual(missingRuntimeFiles, []);
  assert.deepEqual(mismatches, []);
  assert.deepEqual(skippedNonPromptPartFiles, ['index.ts', 'index.ts']);
  assert.ok(checkedPromptParts >= 1700, `expected broad promptpart carry-through coverage, checked ${checkedPromptParts}`);
});

test('reformed runtime promptpart JavaScript teaches Bitcode written-asset shipping semantics', () => {
  const runtimePromptText = reformedRuntimePromptJsSources.join('\n');

  assert.match(runtimePromptText, /retained Bitcode deliverable-compatibility pipeline AI system/u);
  assert.match(runtimePromptText, /written assets \/ asset-packs/u);
  assert.match(runtimePromptText, /Create a pull request shipping wrapper by leveraging full execution context/u);
  assert.match(runtimePromptText, /final readiness orchestration for validated written assets/u);
  assert.match(runtimePromptText, /pull request shipping-wrapper emission/u);
  assert.match(runtimePromptText, /written assets and the shipping wrapper remain coherent/u);
});

test('prompt package public boundary documentation reflects canonical Bitcode prompt infrastructure', () => {
  const promptPackageSurface = [
    promptPackageIndexSource,
    promptPackageTypesSource,
    promptPackageRuntimeSource,
  ].join('\n');

  assert.match(promptPackageSurface, /CANONICAL INFERENCE PROMPT INFRASTRUCTURE/u);
  assert.match(promptPackageSurface, /PromptExecution: Execution-bound prompt registry carrier/u);
  assert.match(promptPackageSurface, /Canonical root exports for public primitives only/u);
  assert.match(promptPackageSurface, /Narrow promptpart imports for raw prompt assets/u);
  assert.match(promptPackageSurface, /curated compatibility surface, not the default import style/u);
  assert.doesNotMatch(promptPackageSurface, /Barrel Exports for PromptParts - Import PromptParts from package root/u);
  assert.doesNotMatch(promptPackageSurface, /There are 500\+ raw prompts/u);
});
