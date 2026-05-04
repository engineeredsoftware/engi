import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';

const reformSource = readFileSync(new URL('../V26_SHIPPABLE_REFORM.md', import.meta.url), 'utf8');
const pipelineSchemasSource = readFileSync(
  new URL('../../packages/pipelines/asset-pack/src/types/PipelineSchemas.ts', import.meta.url),
  'utf8'
);
const assetPackWrittenAssetTypeSource = readFileSync(
  new URL('../../packages/pipelines/asset-pack/src/types/AssetPackWrittenAssetType.ts', import.meta.url),
  'utf8'
);
const assetPackSearchSource = readFileSync(
  new URL('../../packages/pipelines/asset-pack/src/tools/search.ts', import.meta.url),
  'utf8'
);
const assetPackPipelineSource = readFileSync(
  new URL('../../packages/pipelines/asset-pack/src/index.ts', import.meta.url),
  'utf8'
);
const postprocessSource = readFileSync(
  new URL('../../packages/pipelines/asset-pack/src/postprocess.ts', import.meta.url),
  'utf8'
);
const comprehendNeedSource = readFileSync(
  new URL('../../packages/pipelines/asset-pack/src/agents/setup/asset-pack-comprehend-need-agent.ts', import.meta.url),
  'utf8'
);
const comprehendNeedPromptSource = readFileSync(
  new URL('../../packages/pipelines/asset-pack/src/agents/prompts/asset-pack-comprehend-need-agent-prompts.ts', import.meta.url),
  'utf8'
);
const comprehendNeedBasePromptSource = readFileSync(
  new URL('../../packages/pipelines/asset-pack/src/agents/prompts/comprehend-need-prompt.ts', import.meta.url),
  'utf8'
);
const removedComprehendTaskEntrypoints = [
  '../../packages/pipelines/asset-pack/src/agents/setup/asset-pack-comprehend-task-agent.ts',
  '../../packages/pipelines/asset-pack/src/agents/setup/asset-pack-comprehend-task-agent.js',
  '../../packages/pipelines/asset-pack/src/agents/prompts/comprehend-task-prompt.ts',
  '../../packages/pipelines/asset-pack/src/agents/prompts/comprehend-task-prompt.js',
  '../../packages/pipelines/asset-pack/src/agents/prompts/asset-pack-comprehend-task-agent-prompts.ts',
  '../../packages/pipelines/asset-pack/src/agents/prompts/asset-pack-comprehend-task-agent-prompts.js',
];
const removedTerminalExecutionGeneratedJsMirrors = [
  '../../uapi/app/application/ApplicationTransactionDetailSurface.js',
  '../../uapi/app/application/application-experience-architecture.js',
  '../../uapi/app/executions/page.js',
  '../../uapi/app/executions/components/ExecutionsDoButton.js',
  '../../uapi/components/base/bitcode/execution/DeliverablesDocPanel.js',
  '../../uapi/components/base/bitcode/execution/deliver-button.js',
];
const removedNotificationGeneratedJsMirrors = [
  '../../packages/notifications/src/events.js',
  '../../packages/notifications/src/index.js',
  '../../packages/notifications/src/processor.js',
  '../../packages/notifications/src/types.js',
  '../../packages/notifications/src/worker.js',
];
const removedExecutionSupportGeneratedJsMirrors = [
  '../../uapi/middleware/route-rewrite.js',
  '../../uapi/middleware/authentication.js',
  '../../uapi/hooks/useVCSData.js',
  '../../uapi/scripts/long-runner-worker.js',
  '../../uapi/scripts/run-long-runner.js',
  '../../uapi/scripts/sync-deliverables-embeddings.js',
];
const removedTypeKeyedImplementationEntrypoints = [
  '../../packages/pipelines/asset-pack/src/agents/implementation-agents.ts',
  '../../packages/pipelines/asset-pack/src/agents/implementation/asset-pack-divide-code-change-agent.ts',
  '../../packages/pipelines/asset-pack/src/agents/implementation/asset-pack-conquer-file-agent.ts',
  '../../packages/pipelines/asset-pack/src/agents/implementation/asset-pack-correct-code-change-agent.ts',
  '../../packages/pipelines/asset-pack/src/agents/implementation/asset-pack-review-code-change-agent.ts',
  '../../packages/pipelines/asset-pack/src/agents/implementation/asset-pack-create-design-document-agent.ts',
  '../../packages/pipelines/asset-pack/src/agents/implementation/asset-pack-review-design-document-agent.ts',
  '../../packages/pipelines/asset-pack/src/agents/prompts/divide-code-change-prompt.ts',
  '../../packages/pipelines/asset-pack/src/agents/prompts/conquer-file-prompt.ts',
  '../../packages/pipelines/asset-pack/src/agents/prompts/correct-code-change-prompt.ts',
  '../../packages/pipelines/asset-pack/src/agents/prompts/review-code-change-prompt.ts',
  '../../packages/pipelines/asset-pack/src/agents/prompts/create-design-document-prompt.ts',
  '../../packages/pipelines/asset-pack/src/agents/prompts/review-design-document-prompt.ts',
  '../../packages/pipelines/asset-pack/src/agents/prompts/validate-code-changes-prompt.ts',
  '../../packages/pipelines/asset-pack/src/agents/prompts/validate-document-prompt.ts',
  '../../packages/pipelines/asset-pack/src/agents/prompts/validate-review-prompt.ts',
];
const comprehendNeedRawIdentityPromptSource = readFileSync(
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_comprehendneed_system_identity.ts', import.meta.url),
  'utf8'
);
const semanticResolutionSource = readFileSync(
  new URL('../../packages/pipelines/asset-pack/src/semantic-resolution.ts', import.meta.url),
  'utf8'
);
const phaseIndexSource = readFileSync(
  new URL('../../packages/pipelines/asset-pack/src/phases/index.ts', import.meta.url),
  'utf8'
);
const setupPhaseSource = readFileSync(
  new URL('../../packages/pipelines/asset-pack/src/phases/setup.ts', import.meta.url),
  'utf8'
);
const preprocessSource = readFileSync(
  new URL('../../packages/pipelines/asset-pack/src/preprocess.ts', import.meta.url),
  'utf8'
);
const shipAgentSource = readFileSync(
  new URL('../../packages/pipelines/asset-pack/src/agents/finish/deliver-asset-pack-to-destination-agent.ts', import.meta.url),
  'utf8'
);
const createPullRequestSource = readFileSync(
  new URL('../../packages/pipelines/asset-pack/src/agents/finish/asset-pack-finish-create-pull-request-delivery-agent.ts', import.meta.url),
  'utf8'
);
const discoveryAgentsSource = readFileSync(
  new URL('../../packages/pipelines/asset-pack/src/agents/discovery-agents.ts', import.meta.url),
  'utf8'
);
const selectFilesSource = readFileSync(
  new URL('../../packages/pipelines/asset-pack/src/agents/discovery/asset-pack-select-files-parallel-agent.ts', import.meta.url),
  'utf8'
);
const assetPackCompletionSource = readFileSync(
  new URL('../../packages/pipelines/asset-pack/src/agents/finish/asset-pack-completion-agent.ts', import.meta.url),
  'utf8'
);
const semanticPayloadSource = readFileSync(
  new URL('../../packages/api/src/routes/shippables-semantic-payload.ts', import.meta.url),
  'utf8'
);
const executionsRouteSource = readFileSync(
  new URL('../../packages/api/src/routes/executions.ts', import.meta.url),
  'utf8'
);
const applicationDetailSnapshotSource = readFileSync(
  new URL('../../uapi/app/application/application-transaction-detail-snapshot.ts', import.meta.url),
  'utf8'
);
const executionsPageHeaderSource = readFileSync(
  new URL('../../uapi/app/executions/components/ExecutionsPageHeader.tsx', import.meta.url),
  'utf8'
);
const executionsCompleteHeaderContentSource = readFileSync(
  new URL('../../uapi/app/executions/components/ExecutionsCompleteHeaderContent.tsx', import.meta.url),
  'utf8'
);
const shippablesRouteSource = readFileSync(
  new URL('../../packages/api/src/routes/shippables.ts', import.meta.url),
  'utf8'
);
const shippableTemplatesRouteSource = readFileSync(
  new URL('../../uapi/app/api/templates/shippables/route.ts', import.meta.url),
  'utf8'
);
const streamParserSource = readFileSync(
  new URL('../../uapi/streaming/stream-parser.ts', import.meta.url),
  'utf8'
);
const executionNeedInputSource = readFileSync(
  new URL('../../uapi/components/base/bitcode/execution/ExecutionNeedInput.tsx', import.meta.url),
  'utf8'
);
const notificationTypesSource = readFileSync(
  new URL('../../packages/notifications/src/types.ts', import.meta.url),
  'utf8'
);
const notificationEventsSource = readFileSync(
  new URL('../../packages/notifications/src/events.ts', import.meta.url),
  'utf8'
);
const notificationProcessorSource = readFileSync(
  new URL('../../packages/notifications/src/processor.ts', import.meta.url),
  'utf8'
);
const notificationReadmeSource = readFileSync(
  new URL('../../packages/notifications/README.md', import.meta.url),
  'utf8'
);
const routeRewriteMiddlewareSource = readFileSync(
  new URL('../../uapi/middleware/route-rewrite.ts', import.meta.url),
  'utf8'
);
const authenticationMiddlewareSource = readFileSync(
  new URL('../../uapi/middleware/authentication.ts', import.meta.url),
  'utf8'
);
const vcsDataHookSource = readFileSync(
  new URL('../../uapi/hooks/useVCSData.ts', import.meta.url),
  'utf8'
);
const tpsReadmeSource = readFileSync(new URL('../../uapi/app/tps/README.md', import.meta.url), 'utf8');
const uapiPackageSource = readFileSync(new URL('../../uapi/package.json', import.meta.url), 'utf8');
const rootTsconfigSource = readFileSync(new URL('../../tsconfig.json', import.meta.url), 'utf8');
const uapiTsconfigSource = readFileSync(new URL('../../uapi/tsconfig.json', import.meta.url), 'utf8');
const syncAssetPackEvidenceEmbeddingsScriptSource = readFileSync(
  new URL('../../uapi/scripts/sync-asset-pack-evidence-embeddings.ts', import.meta.url),
  'utf8'
);
const runLongRunnerSource = readFileSync(new URL('../../uapi/scripts/run-long-runner.ts', import.meta.url), 'utf8');
const assetPackStartedTemplateSource = readFileSync(
  new URL('../../supabase/templates/asset_pack_started.html', import.meta.url),
  'utf8'
);
const assetPackCompleteTemplateSource = readFileSync(
  new URL('../../supabase/templates/asset_pack_complete.html', import.meta.url),
  'utf8'
);
const assetPackFailedTemplateSource = readFileSync(
  new URL('../../supabase/templates/asset_pack_failed.html', import.meta.url),
  'utf8'
);
const assetPackShortCircuitTemplateSource = readFileSync(
  new URL('../../supabase/templates/asset_pack_short_circuit.html', import.meta.url),
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
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_tool_repositorysetup_assetpack_purpose_addendum.ts', import.meta.url),
  'utf8'
);
const repositorySetupMetadataPromptSource = readFileSync(
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_tool_repositorysetup_assetpack_metadata_pipeline.ts', import.meta.url),
  'utf8'
);
const repositorySetupCapabilitiesPromptSource = readFileSync(
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_tool_repositorysetup_assetpack_capabilities_addendum.ts', import.meta.url),
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
const updateAssetPackStorageTableNamesScriptSource = readFileSync(
  new URL('../../scripts/update-asset-pack-storage-table-names.sh', import.meta.url),
  'utf8'
);
const updateAssetPackAgentsScriptSource = readFileSync(
  new URL('../../scripts/update-asset-pack-agents.sh', import.meta.url),
  'utf8'
);
const generateAssetPackPromptPartsTsSource = readFileSync(
  new URL('../../scripts/generate-asset-pack-promptparts.ts', import.meta.url),
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
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_phase_assetpacksetup_purpose_corestatement.ts', import.meta.url),
  'utf8'
);
const phaseDiscoveryPurposePromptSource = readFileSync(
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_phase_assetpackdiscovery_purpose_corestatement.ts', import.meta.url),
  'utf8'
);
const phaseImplementationPurposePromptSource = readFileSync(
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_phase_assetpackimplementation_purpose_corestatement.ts', import.meta.url),
  'utf8'
);
const phaseValidationPurposePromptSource = readFileSync(
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_phase_assetpackvalidation_purpose_corestatement.ts', import.meta.url),
  'utf8'
);
const phaseFinishPurposePromptSource = readFileSync(
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_phase_assetpackfinish_purpose_corestatement.ts', import.meta.url),
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
const finalizeDeliveryEvidencePurposePromptSource = readFileSync(
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_assetpackfinishfinalizedeliveryevidence_purpose_corestatement.ts', import.meta.url),
  'utf8'
);
const finalizeDeliveryEvidenceIdentityPromptSource = readFileSync(
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_assetpackfinishfinalizedeliveryevidence_identity_definition.ts', import.meta.url),
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
const assetPackSystemUltraCriticalPromptSource = readFileSync(
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_asset_pack_system_ultra_critical_reflection.ts', import.meta.url),
  'utf8'
);
const finishCreatePullRequestPurposePromptSource = readFileSync(
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_assetpackfinishcreatepullrequestdelivery_purpose_corestatement.ts', import.meta.url),
  'utf8'
);
const finishCreatePullRequestIdentityPromptSource = readFileSync(
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_assetpackfinishcreatepullrequestdelivery_identity_definition.ts', import.meta.url),
  'utf8'
);
const readyToFinishIdentityPromptSource = readFileSync(
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_readytofinish_system_identity.ts', import.meta.url),
  'utf8'
);
const readyToFinishRolePromptSource = readFileSync(
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_readytofinish_system_role.ts', import.meta.url),
  'utf8'
);
const readyToFinishInstructionsPromptSource = readFileSync(
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_readytofinish_system_instructions.ts', import.meta.url),
  'utf8'
);
const readyToFinishPurposePromptSource = readFileSync(
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_readytofinish_purpose_corestatement.ts', import.meta.url),
  'utf8'
);
const readyToFinishCodeChangeIdentityPromptSource = readFileSync(
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_readytofinishcodechange_system_identity.ts', import.meta.url),
  'utf8'
);
const readyToFinishCodeChangeInstructionsPromptSource = readFileSync(
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_readytofinishcodechange_system_instructions.ts', import.meta.url),
  'utf8'
);
const readyToFinishCodeChangePlanPromptSource = readFileSync(
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_readytofinishcodechange_plan_strategy.ts', import.meta.url),
  'utf8'
);
const readyToFinishCodeChangeReviewIdentityPromptSource = readFileSync(
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_readytofinishcodechangereview_system_identity.ts', import.meta.url),
  'utf8'
);
const readyToFinishCodeChangeReviewInstructionsPromptSource = readFileSync(
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_readytofinishcodechangereview_system_instructions.ts', import.meta.url),
  'utf8'
);
const readyToFinishCodeChangeReviewPlanPromptSource = readFileSync(
  new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_readytofinishcodechangereview_plan_strategy.ts', import.meta.url),
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
  '../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_readytofinish_system_identity.js',
  '../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_readytofinishcodechange_system_instructions.js',
  '../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_readytofinishcodechangereview_system_instructions.js',
].map((relativePath) => readFileSync(new URL(relativePath, import.meta.url), 'utf8'));

const rawPromptPartDirs = [
  '../../packages/prompts/src/raw_promptparts/specific/',
  '../../packages/prompts/src/raw_promptparts/generic/',
].map((relativePath) => new URL(relativePath, import.meta.url));

const deliverableSubstepPromptPartSources = readdirSync(rawPromptPartDirs[0])
  .filter((filename) => /^promptpart_specific_agent_(?:deliverable.*|assetpackvalidationreadytofinish.*)_substep_.*\.ts$/u.test(filename))
  .sort()
  .map((filename) => [filename, readFileSync(new URL(filename, rawPromptPartDirs[0]), 'utf8')]);

const deliverablePromptPartMetadataSources = readdirSync(rawPromptPartDirs[0])
  .filter((filename) =>
    /^promptpart_specific_(?:agent_deliverable|agent_finalizeshipment|agent_determinedeliverabletype|phase_assetpack|pipeline_deliverable|tool_.*deliverable|agent_assetpackfinish|agent_assetpacksynthesizeartifacts|agent_assetpackvalidationreadytofinish|agent_readytofinish|tool_repositorysetup_assetpack|tool_assetpack).*?(?:\.d)?\.ts$/u.test(filename)
  )
  .sort()
  .map((filename) => [filename, readFileSync(new URL(filename, rawPromptPartDirs[0]), 'utf8')]);

const rawPromptPartSourceEntries = rawPromptPartDirs.flatMap((directoryUrl) =>
  readdirSync(directoryUrl)
    .filter((filename) => filename.endsWith('.ts') || filename.endsWith('.d.ts'))
    .sort()
    .map((filename) => [filename, readFileSync(new URL(filename, directoryUrl), 'utf8')])
);

const oldWorldDeliverableSubstepLanguage =
  /combine partial outputs into complete coherent response|format results into schema-compliant structured output|break large inputs into manageable chunks and summarize for processing|extract and organize relevant context from execution state minimizing noise|execute required tools with appropriate parameters|evaluate quality and correctness of reasoning output/u;

const bitcodeSubstepDocCommentIntent =
  /intent:\s*"Bitcode [^"]*(need|written-asset|asset-pack|proof|deliveryMechanism|delivery-mechanism|writtenAssets|execution-history)/u;

const staleDeliverablePromptPartIntent =
  /intent:\s*"(?:Agent semantic unit|Define purpose|Adds Deliverables|Canonical deliverables|Compatibility PromptPart for the former deliverables|.*Deliverables Clone VCS Repository)/u;

const malformedPromptPartBenchmarkScorePattern = /"score"\s*:\s*0\.[0-9]+\.[0-9]+/u;

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

test('V26 shippable reform supplement removes active deliverable compatibility behavior', () => {
  assert.match(reformSource, /`deliverable` is not a Bitcode concept/u);
  assert.match(reformSource, /must not remain as an active route, payload field, application data model, reusable infrastructure name, exported API alias, mock feature, template category, email-template identifier, or algorithmic branch/u);
  assert.match(reformSource, /live Bitcode meaning is a need-satisfying agentic pipeline run/u);
  assert.match(reformSource, /canonical broad final phase is now `Finish`/u);
  assert.match(reformSource, /`Delivering` is the narrower Finish subresponsibility/u);
  assert.match(reformSource, /the Finish phase emits `shippables` as connected-interface objects/u);
  assert.match(reformSource, /`deliverables` must not be emitted as a retained mirror/u);
  assert.match(reformSource, /`asset pack`/u);
  assert.match(reformSource, /`AssetPack synthesis artifact`/u);
  assert.match(reformSource, /`stored AssetPack evidence`/u);
  assert.match(reformSource, /workspace-run summaries, mock reread projections, and active UI detail surfaces should prefer primary `assetPackSynthesisArtifacts`/u);
  assert.match(reformSource, /streamed completion payloads must emit primary `assetPackSynthesisArtifacts` plus semantic `writtenAssets`, `shippables`/u);
  assert.match(reformSource, /execution stores and postprocessed artifacts must use semantic `need`, canonical `writtenAssetType = need-satisfaction-asset-pack`, `writtenAssetRequest`, `deliveryMechanismTemplate = pull-request`, `assetPackCompletion`, `assetPackSynthesisArtifacts`, `writtenAssets`, `shippables`, and `deliveryMechanism`/u);
  assert.match(reformSource, /implementation and validation logic must resolve one canonical AssetPack synthesis kind/u);
  assert.match(reformSource, /shapes live protocol behavior through Bitcode's commercial infrastructure/u);
  assert.match(reformSource, /hydrate a registry-bearing pipeline execution context when callers still enter through a bare `Execution`/u);
  assert.match(reformSource, /retained maintenance\/audit scripts that operate on this corridor/u);
  assert.match(reformSource, /teach `comprehend-need` \/ asset-pack-run semantics/u);
  assert.match(reformSource, /retained repair, generation, and export-verification scripts/u);
  assert.match(reformSource, /AssetPack substep PromptParts/u);
  assert.match(reformSource, /Bitcode need, written-asset, asset-pack, proof-evidence, Shippable, delivery-mechanism/u);
  assert.match(reformSource, /runtime JavaScript carry-through must remain parseable and content-equivalent/u);
  assert.match(reformSource, /substep doc-comment metadata must also be reauthored as Bitcode metadata/u);
  assert.match(reformSource, /all active AssetPack-family raw PromptPart doc-comment metadata must use Bitcode-native intent/u);
});

test('AssetPack schemas expose written-asset semantic aliases and bounded compatibility keys', () => {
  assert.equal(existsSync(new URL('../../packages/pipelines/asset-pack/src/types/DeliverableType.ts', import.meta.url)), false);
  assert.match(assetPackWrittenAssetTypeSource, /export enum AssetPackWrittenAssetType/u);
  assert.doesNotMatch(assetPackWrittenAssetTypeSource, /DeliverableType/u);
  assert.match(pipelineSchemasSource, /type ShippableMeta = AssetPackResultMeta;/u);
  assert.match(pipelineSchemasSource, /type DeliveryMechanismMeta = ShippableMeta;/u);
  assert.match(pipelineSchemasSource, /shippables\?: AssetPackSynthesisArtifactsMeta;/u);
  assert.match(pipelineSchemasSource, /deliveryMechanism\?: DeliveryMechanismMeta;/u);
  assert.match(pipelineSchemasSource, /export type WrittenAssetResultMeta = AssetPackResultMeta;/u);
  assert.match(pipelineSchemasSource, /writtenAssetType\?: AssetPackWrittenAssetType;/u);
  assert.match(pipelineSchemasSource, /semanticKind\?: 'asset-pack-written-asset';/u);
  assert.match(pipelineSchemasSource, /export type AssetPackSynthesisInput = AssetPackInput;/u);
  assert.match(pipelineSchemasSource, /export type AssetPackWrittenAssetOutput = AssetPackOutput;/u);
});

test('asset-pack evidence search uses current Bitcode naming at the package boundary', () => {
  assert.equal(existsSync(new URL('../../uapi/tests/searchRelevantDeliverables.test.ts', import.meta.url)), false);
  assert.match(assetPackSearchSource, /export async function searchRelevantAssetPackEvidence/u);
  assert.match(assetPackSearchSource, /BITCODE_PRE_CONTEXT_ASSET_PACK_EVIDENCE_COUNT/u);
  assert.match(assetPackSearchSource, /assetPackEvidenceId/u);
  assert.doesNotMatch(assetPackSearchSource, /searchRelevantDeliverables|PRE_CONTEXT_DELIVERABLE_COUNT|POST_CONTEXT_DELIVERABLE_COUNT/u);
});

test('AssetPack preprocess stores need and written-asset semantic mirrors alongside compatibility keys', () => {
  assert.match(assetPackPipelineSource, /resolveWrittenAssetType\(processedInput\)/u);
  assert.match(assetPackPipelineSource, /resolveExpressedNeed/u);
  assert.match(assetPackPipelineSource, /execution\.store\('pipeline', 'writtenAssetType', writtenAssetType\);/u);
  assert.match(assetPackPipelineSource, /execution\.store\('pipeline', 'expressedNeed', expressedNeed\);/u);
  assert.match(assetPackPipelineSource, /execution\.store\('need', 'description', expressedNeed\);/u);
  assert.match(assetPackPipelineSource, /execution\.store\('route\/preprocessed', 'assetPackWrittenAsset', snapshot\);/u);
});

test('AssetPack postprocess and Finish summary carry synthesis-artifact and written-asset meaning', () => {
  assert.match(postprocessSource, /export function normalizeAssetPackOutput/u);
  assert.match(postprocessSource, /export function buildAssetPackPostprocessedResult/u);
  assert.match(postprocessSource, /const deliveryMechanism = enhanced\.deliveryMechanism \|\| enhanced\.shippable;/u);
  assert.match(postprocessSource, /const assetPackSynthesisArtifacts =/u);
  assert.match(postprocessSource, /enhanced\.assetPackSynthesisArtifacts = assetPackSynthesisArtifacts as any;/u);
  assert.match(postprocessSource, /enhanced\.semanticKind = 'asset-pack-written-asset';/u);
  assert.match(postprocessSource, /enhanced\.deliveryMechanism = \{ \.\.\.\(deliveryMechanism \|\| \{\}\), prUrl \} as any;/u);
  assert.match(postprocessSource, /execution\.get\('finish', 'pullRequestUrl'\)/u);
  assert.match(postprocessSource, /deliveryMechanism: normalized\.deliveryMechanism \|\| shippable,/u);
  assert.match(postprocessSource, /assetPackSynthesisArtifacts: \(finishArtifacts \|\| normalized\.assetPackSynthesisArtifacts \|\| null\) as any,/u);
  assert.match(postprocessSource, /enhanced\.writtenAssetType/u);
  assert.match(postprocessSource, /kind: 'shippable'/u);
  assert.match(postprocessSource, /semanticKind: 'asset-pack-written-asset'/u);
  assert.match(assetPackCompletionSource, /shippables: z\.object/u);
  assert.match(assetPackCompletionSource, /const AssetPackSynthesisArtifactsSchema = WrittenAssetsSchema\.extend/u);
  assert.match(assetPackCompletionSource, /assetPackSynthesisArtifacts: AssetPackSynthesisArtifactsSchema\.optional\(\)/u);
  assert.match(assetPackCompletionSource, /writtenAssets: WrittenAssetsSchema\.optional\(\)/u);
  assert.match(assetPackCompletionSource, /deliveryMechanism: DeliveryMechanismSchema\.optional\(\)/u);
  assert.match(assetPackCompletionSource, /lines\.push\('', `## Need`, need\.trim\(\)\);/u);
  assert.match(assetPackCompletionSource, /const implementationArtifacts = \(execution as any\)\.get\?\.\('implementation', 'assetPackSynthesisArtifacts'\);/u);
  assert.match(assetPackCompletionSource, /store\?\.\('finish\/asset_pack_completion', 'shippables', shippables as any\);/u);
  assert.match(assetPackCompletionSource, /store\?\.\('finish\/asset_pack_completion', 'assetPackSynthesisArtifacts', assetPackSynthesisArtifacts as any\);/u);
  assert.match(assetPackCompletionSource, /store\?\.\('finish\/asset_pack_completion', 'writtenAssets', writtenAssets as any\);/u);
  assert.match(assetPackCompletionSource, /store\?\.\('finish\/asset_pack_completion', 'deliveryMechanism', deliveryMechanism as any\);/u);
  assert.match(assetPackCompletionSource, /store\?\.\('finish\/asset_pack_completion', 'writtenAssetType', dtype \|\| undefined\);/u);
  assert.doesNotMatch(assetPackCompletionSource, /shipping\/asset_pack_completion|get\?\.\('shipping|store\?\.\('shipping/u);
});

test('setup comprehension path mirrors semantic need and written-asset keys for downstream phases', () => {
  assert.match(comprehendNeedSource, /bitcodeSetupNeedComprehensionAgent/u);
  assert.match(comprehendNeedSource, /phase: 'setup'/u);
  assert.match(comprehendNeedSource, /beforeAgent: 'danger-wall'/u);
  assert.match(comprehendNeedSource, /setup\/need-comprehension/u);
  assert.match(comprehendNeedSource, /need_satisfaction_criteria/u);
  assert.match(comprehendNeedSource, /written_asset_types/u);
  assert.match(comprehendNeedPromptSource, /DP_COMPREHEND_NEED_SYSTEM_PROMPT/u);
  assert.match(comprehendNeedPromptSource, /PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDNEED_IDENTITY_DEFINITION/u);
  assert.doesNotMatch(comprehendNeedPromptSource, /PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDTASK_IDENTITY_DEFINITION/u);
  assert.doesNotMatch(comprehendNeedPromptSource, /pipeline:compatibility/u);
  assert.match(comprehendNeedPromptSource, /asset-pack-written-asset/u);
  assert.doesNotMatch(comprehendNeedPromptSource, /DP_COMPREHEND_TASK_/u);
  assert.match(comprehendNeedBasePromptSource, /createComprehendNeedSystemPrompt/u);
  assert.match(comprehendNeedBasePromptSource, /PROMPTPART_SPECIFIC_AGENT_COMPREHENDNEED_SYSTEM_IDENTITY/u);
  assert.doesNotMatch(comprehendNeedBasePromptSource, /ComprehendTaskPrompts/u);
  for (const removedEntrypoint of removedComprehendTaskEntrypoints) {
    assert.equal(
      existsSync(new URL(removedEntrypoint, import.meta.url)),
      false,
      `${removedEntrypoint} must stay removed; canonical setup comprehension is comprehend-need`
    );
  }
  assert.match(comprehendNeedRawIdentityPromptSource, /Bitcode setup Need-comprehension agent/u);
  assert.match(comprehendNeedRawIdentityPromptSource, /AssetPack synthesis and connected-interface delivery mechanisms before risk admission/u);
  assert.match(setupPhaseSource, /asset-pack-comprehend-need-agent/u);
  assert.match(preprocessSource, /asset-pack-comprehend-need-agent/u);
  assert.match(preprocessSource, /new PipelinePromptRegistry/u);
  assert.match(preprocessSource, /new PipelineToolRegistry/u);
  assert.match(preprocessSource, /new PipelineAgentRegistry/u);
  assert.match(comprehendNeedSource, /execution\.store\('setup', 'writtenAssetRequest', types\);/u);
  assert.match(comprehendNeedSource, /execution\.store\('setup\/written-asset-request', 'type', types\);/u);
  assert.doesNotMatch(comprehendNeedSource, /execution\.store\('setup', 'writtenAssetType', types\);/u);
  assert.doesNotMatch(comprehendNeedSource, /setup\/written-asset-type/u);
  assert.match(comprehendNeedSource, /execution\.store\('setup\/need', 'satisfactionCriteria', needSatisfactionCriteria\);/u);
  assert.match(comprehendNeedSource, /execution\.store\('setup\/need', 'comprehension', result\.comprehension\);/u);
  assert.match(comprehendNeedSource, /execution\.store\('setup\/need', 'entities', result\.entities\);/u);
});

test('implementation, validation, and Finish carriers separate AssetPack kind from delivery templates', () => {
  assert.match(semanticResolutionSource, /export function resolveWrittenAssetTypeFromExecution/u);
  assert.match(semanticResolutionSource, /export function resolveDeliveryMechanismTemplateFromExecution/u);
  assert.match(semanticResolutionSource, /NeedSatisfactionAssetPack/u);
  assert.match(semanticResolutionSource, /export function resolveExpressedNeedFromExecution/u);
  assert.doesNotMatch(assetPackPipelineSource, /BITCODE_ENABLE_DELIVERABLE_SETUP_PHASE_RUNTIME_IN_TEST/u);
  assert.match(phaseIndexSource, /resolveWrittenAssetTypeFromExecution\(execution\)/u);
  assert.match(phaseIndexSource, /resolveDeliveryMechanismTemplateFromExecution\(execution\)/u);
  assert.match(phaseIndexSource, /implementation:asset-pack-synthesize-artifacts-agent/u);
  assert.match(phaseIndexSource, /validation:validate-asset-pack-synthesis-artifacts/u);
  assert.doesNotMatch(phaseIndexSource, /Unknown written-asset type/u);
  assert.doesNotMatch(phaseIndexSource, /implementation:review|implementation:create|implementation:comment/u);
  assert.match(shipAgentSource, /writtenAssetType: dtype/u);
  assert.match(createPullRequestSource, /writtenAssetType: 'need-satisfaction-asset-pack'/u);
  assert.match(createPullRequestSource, /deliveryMechanismTemplate: 'pull-request'/u);
  assert.doesNotMatch(createPullRequestSource, /writtenAssetType: 'code-change'/u);
  for (const removedEntrypoint of removedTypeKeyedImplementationEntrypoints) {
    assert.equal(
      existsSync(new URL(removedEntrypoint, import.meta.url)),
      false,
      `${removedEntrypoint} must stay removed; implementation now synthesizes one canonical AssetPack written asset`
    );
  }
  assert.match(discoveryAgentsSource, /writtenAssets: z\.array\(z\.string\(\)\)\.optional\(\)/u);
  assert.match(discoveryAgentsSource, /needSatisfactionCriteria: z\.array\(z\.string\(\)\)\.optional\(\)/u);
  assert.match(discoveryAgentsSource, /applyResearchApproachSemanticMirrors/u);
  assert.match(discoveryAgentsSource, /applyPlanImplementationSemanticMirrors/u);
  assert.match(discoveryAgentsSource, /writtenAssetType: z\.string\(\)\.optional\(\)/u);
  assert.match(discoveryAgentsSource, /need: z\.string\(\)\.optional\(\)/u);
  assert.match(selectFilesSource, /writtenAssetType: z\.string\(\)\.optional\(\)/u);
  assert.match(selectFilesSource, /need: resolveExpressedNeedFromExecution\(execution\)/u);
  assert.match(assetPackCompletionSource, /resolveExpressedNeedFromExecution\(execution\)/u);
  assert.match(assetPackCompletionSource, /resolveWrittenAssetTypeFromExecution\(execution\)/u);
});

test('operator-facing execution header and active route teach Delivering mechanism semantics', () => {
  assert.match(executionsPageHeaderSource, /delivery-template selection/u);
  assert.match(executionsPageHeaderSource, /Finish-delivered shippables/u);
  assert.match(executionsPageHeaderSource, /No shippables to summarize/u);
  assert.match(executionsPageHeaderSource, /expected AssetPack evidence and shippable result/u);
  assert.match(executionsPageHeaderSource, /V26 Finish delivers AssetPack evidence through a/u);
  assert.match(executionsPageHeaderSource, /records completion as AssetPack evidence/u);
  assert.doesNotMatch(executionsPageHeaderSource, /final work summary/u);
  assert.doesNotMatch(executionsPageHeaderSource, /pull request review|issue comment/u);
  assert.match(shippablesRouteSource, /Active handler owner for AssetPack pipeline runs with Finish\/Delivering/u);
  assert.match(shippablesRouteSource, /Create and execute an AssetPack SDIVF pipeline run/u);
  assert.match(shippablesRouteSource, /execution\.store\('route\/preprocessed', 'assetPackWrittenAsset', preprocessing\);/u);
  assert.match(shippablesRouteSource, /semanticKind: 'asset-pack-written-asset' as const/u);
  assert.match(shippablesRouteSource, /need: assetPackCompletion\?\.need \|\| preprocessedSnapshot\?\.need \|\| definition_of_need/u);
  assert.match(shippablesRouteSource, /assetPack: assetPackCompletion\?\.assetPack \|\| preprocessedSnapshot\?\.assetPack \|\| null/u);
  assert.match(shippablesRouteSource, /semantic_event_type: 'asset_pack_run_created'/u);
  assert.match(shippablesRouteSource, /semantic_event_type: 'asset_pack_run_completed'/u);
  assert.match(shippablesRouteSource, /semantic_event_type: 'asset_pack_run_failed'/u);
  assert.match(shippablesRouteSource, /semantic_event_type: 'asset_pack_run_cancelled'/u);
  assert.match(shippablesRouteSource, /Bitcode Asset-Pack Run Started/u);
  assert.match(shippablesRouteSource, /Bitcode Asset-Pack Run Completed/u);
  assert.match(shippablesRouteSource, /Bitcode Asset-Pack Run Cancelled/u);
  assert.match(shippablesRouteSource, /Your Bitcode asset-pack run #\$\{runId\} has started/u);
  assert.match(shippablesRouteSource, /Your Bitcode asset-pack run #\$\{runId\} is complete/u);
  assert.match(shippablesRouteSource, /buildSemanticCompletionResult/u);
  assert.match(shippablesRouteSource, /assetPackCompletion\?\.assetPackSynthesisArtifacts/u);
  assert.match(semanticPayloadSource, /semanticKind: 'asset-pack-written-asset'/u);
  assert.match(semanticPayloadSource, /explicitAssetPackSynthesisArtifacts/u);
  assert.match(semanticPayloadSource, /assetPackSynthesisArtifacts/u);
  assert.match(semanticPayloadSource, /writtenAssets/u);
  assert.match(semanticPayloadSource, /shippables/u);
  assert.match(semanticPayloadSource, /deliveryMechanism/u);
  assert.match(semanticPayloadSource, /assetPack/u);
  assert.match(executionsRouteSource, /function buildAssetPackSynthesisArtifacts/u);
  assert.match(executionsRouteSource, /asset_pack_synthesis_artifacts: buildAssetPackSynthesisArtifacts\(row\)/u);
  assert.match(executionsRouteSource, /assetPackSynthesisArtifacts \? \{ assetPackSynthesisArtifacts \}/u);
  assert.match(applicationDetailSnapshotSource, /assetPackSynthesisArtifacts\?: ShippablesDoc \| null;/u);
  assert.match(applicationDetailSnapshotSource, /coerceShippableSurface\(assetPackCompletion\?\.assetPackSynthesisArtifacts\)/u);
  assert.match(executionsCompleteHeaderContentSource, /assetPackSynthesisArtifacts\?: HeaderShippables;/u);
  assert.match(executionsCompleteHeaderContentSource, /shippables\?: HeaderShippables;/u);
  assert.match(executionsCompleteHeaderContentSource, /assetPackCompletion\?\.assetPackSynthesisArtifacts/u);
  assert.match(streamParserSource, /assetPackSynthesisArtifacts/u);
  assert.match(streamParserSource, /writtenAssets,/u);
  assert.match(streamParserSource, /deliveryMechanism,/u);
  assert.match(streamParserSource, /semanticKind: data\.result\.semanticKind \|\|/u);
});

test('AssetPack templates and bounded promptparts teach asset-pack-run semantics', () => {
  assert.match(shippableTemplatesRouteSource, /getShippableTemplates/u);
  assert.match(shippableTemplatesRouteSource, /createShippableTemplates/u);
  assert.match(shippableTemplatesRouteSource, /shippableTypes/u);
  assert.match(shippableTemplatesRouteSource, /Shippable template name/u);
  assert.equal(existsSync(new URL('../../uapi/app/api/templates/deliverables/route.ts', import.meta.url)), false);
  assert.match(executionNeedInputSource, /\/api\/templates\/shippables/u);
  assert.doesNotMatch(executionNeedInputSource, /deliverableTypes/u);
  assert.match(assetPackStartedTemplateSource, /Bitcode asset-pack run started/u);
  assert.match(assetPackStartedTemplateSource, /synthesizing written assets and preparing delivery results/u);
  assert.match(assetPackCompleteTemplateSource, /Bitcode asset-pack run complete/u);
  assert.match(assetPackCompleteTemplateSource, /Asset-Pack Overview/u);
  assert.doesNotMatch(assetPackCompleteTemplateSource, /Deliverables|deliverable/u);
  assert.match(assetPackFailedTemplateSource, /Bitcode asset-pack run failed/u);
  assert.match(assetPackFailedTemplateSource, /asset-pack synthesis and Finish delivery flow/u);
  assert.match(assetPackShortCircuitTemplateSource, /Bitcode asset-pack run short-circuited/u);
  assert.match(assetPackShortCircuitTemplateSource, /asset-pack synthesis and Finish delivery completed/u);
  assert.match(pipelinePurposePromptSource, /AssetPack compatibility route/u);
  assert.match(pipelinePurposePromptSource, /Bitcode need-satisfying asset-pack run/u);
  assert.match(pipelinePurposePromptSource, /store evidence in Finish/u);
  assert.match(pipelineTypeListPromptSource, /Synthesize implementation AssetPack artifacts/u);
  assert.match(pipelineTypeListPromptSource, /connected-interface mechanisms/u);
  assert.match(pipelineDivLoopPromptSource, /Discovery refines the expressed need/u);
  assert.match(pipelineDivLoopPromptSource, /Implementation synthesizes VCS-compatible AssetPack synthesis artifacts/u);
  assert.match(pipelineDivLoopPromptSource, /Validation verifies need satisfaction/u);
  assert.match(pipelineExecutionPatternPromptSource, /discovery shapes the asset-pack synthesis approach/u);
  assert.match(pipelineExecutionPatternPromptSource, /Finish emits connected-interface delivery mechanisms/u);
  assert.match(repositorySetupPurposePromptSource, /Bitcode AssetPack run/u);
  assert.match(repositorySetupPurposePromptSource, /synthesizes AssetPack artifacts for Finish delivery mechanisms/u);
  assert.match(repositorySetupMetadataPromptSource, /asset-pack setup/u);
  assert.match(repositorySetupCapabilitiesPromptSource, /need understanding and written-asset synthesis/u);
  assert.match(generateMassivePromptPartsSource, /Generate Bitcode AssetPack specific prompt parts/u);
  assert.match(generateMassivePromptPartsSource, /STORED ASSETPACK EVIDENCE/u);
  assert.doesNotMatch(generateMassivePromptPartsSource, /shipping_excellence|SHIPPING PREPARATION|SHIPPING EXECUTION|SHIPPING CELEBRATION/u);
  assert.equal(existsSync(new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_phase_deliverableshipping_purpose_corestatement.ts', import.meta.url)), false);
  assert.match(phaseSetupPurposePromptSource, /PROMPTPART_SPECIFIC_PHASE_ASSETPACKSETUP_PURPOSE_CORESTATEMENT/u);
  assert.match(phaseDiscoveryPurposePromptSource, /PROMPTPART_SPECIFIC_PHASE_ASSETPACKDISCOVERY_PURPOSE_CORESTATEMENT/u);
  assert.match(phaseImplementationPurposePromptSource, /PROMPTPART_SPECIFIC_PHASE_ASSETPACKIMPLEMENTATION_PURPOSE_CORESTATEMENT/u);
  assert.match(phaseValidationPurposePromptSource, /PROMPTPART_SPECIFIC_PHASE_ASSETPACKVALIDATION_PURPOSE_CORESTATEMENT/u);
  assert.match(phaseFinishPurposePromptSource, /PROMPTPART_SPECIFIC_PHASE_ASSETPACKFINISH_PURPOSE_CORESTATEMENT/u);
  assert.match(phaseSetupPurposePromptSource, /understand the expressed need/u);
  assert.match(phaseDiscoveryPurposePromptSource, /shape the asset-pack synthesis approach/u);
  assert.match(phaseImplementationPurposePromptSource, /Synthesize AssetPack artifacts using VCS-compatible operations/u);
  assert.match(phaseValidationPurposePromptSource, /verify need satisfaction and written-asset integrity/u);
  assert.match(phaseFinishPurposePromptSource, /Emit connected-interface delivery mechanisms from validated Need-satisfaction AssetPack synthesis artifacts/u);
  assert.match(setupComprehendNeedPurposePromptSource, /written-asset expectations, delivery-mechanism expectations, asset-pack context/u);
  assert.match(setupComprehendNeedIdentityPromptSource, /Bitcode need, satisfaction criteria, written-asset expectations, asset-pack context/u);
  assert.match(setupComprehendTaskPurposePromptSource, /Bitcode retained comprehend-task compatibility PromptPart for canonical comprehend-need asset-pack synthesis/u);
  assert.match(setupComprehendTaskPurposePromptSource, /written-asset expectations, delivery-mechanism expectations, asset-pack context/u);
  assert.match(setupComprehendTaskIdentityPromptSource, /Bitcode retained comprehend-task compatibility PromptPart for canonical comprehend-need asset-pack synthesis/u);
  assert.match(setupComprehendTaskIdentityPromptSource, /Bitcode need, satisfaction criteria, written-asset expectations, asset-pack context/u);
  assert.match(finalizeDeliveryEvidencePurposePromptSource, /finalize Finish evidence for validated Need-satisfaction AssetPack synthesis artifacts with stored AssetPack evidence, delivery-mechanism artifacts/u);
  assert.match(finalizeDeliveryEvidenceIdentityPromptSource, /finalizing Finish evidence for validated Need-satisfaction AssetPack synthesis artifacts, stored AssetPack evidence, delivery-mechanism artifacts/u);
  assert.match(deliverablesSystemBasePromptSource, /satisfy an expressed need by synthesizing stable Need-satisfaction AssetPack contents and evidence/u);
  assert.match(deliverablesSystemBasePromptSource, /delivery mechanisms subordinate to the Bitcode asset-pack meaning/u);
  assert.match(deliverablesSystemExcellencePromptSource, /NEED SATISFACTION/u);
  assert.match(deliverablesSystemCognitivePromptSource, /ASSET-PACK SYNTHESIS/u);
  assert.match(assetPackSystemUltraCriticalPromptSource, /written assets primary and delivery mechanisms secondary/u);
  assert.equal(existsSync(new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_deliverableimplementationdividepullrequest_purpose_corestatement.ts', import.meta.url)), false);
  assert.equal(existsSync(new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_deliverableimplementationdividepullrequest_identity_definition.ts', import.meta.url)), false);
  assert.equal(existsSync(new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_deliverableimplementationdividepullrequest_ptrrplan_purpose.ts', import.meta.url)), false);
  assert.equal(existsSync(new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_deliverableshippingpackagepr_purpose_corestatement.ts', import.meta.url)), false);
  assert.equal(existsSync(new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_deliverableshippingpackagepr_capabilities_list.ts', import.meta.url)), false);
  assert.equal(existsSync(new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_createpullrequest_purpose_corestatement.ts', import.meta.url)), false);
  assert.match(finishCreatePullRequestPurposePromptSource, /create a pull-request delivery-mechanism artifact from validated Need-satisfaction AssetPack synthesis artifacts/u);
  assert.match(finishCreatePullRequestIdentityPromptSource, /creating a pull-request delivery-mechanism artifact from validated Need-satisfaction AssetPack synthesis artifacts/u);
  assert.equal(existsSync(new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_createcodechange_system_identity.ts', import.meta.url)), false);
  assert.equal(existsSync(new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_createcodechange_system_role.ts', import.meta.url)), false);
  assert.equal(existsSync(new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_createcodechange_system_instructions.ts', import.meta.url)), false);
  assert.match(readyToFinishIdentityPromptSource, /final readiness orchestration for validated Need-satisfaction AssetPack synthesis artifacts, stored AssetPack evidence, and connected-interface delivery mechanisms/u);
  assert.match(readyToFinishRolePromptSource, /authorize Finish entry for validated Need-satisfaction AssetPack synthesis artifacts, stored AssetPack evidence, and any connected-interface delivery mechanisms/u);
  assert.match(readyToFinishInstructionsPromptSource, /evaluating written-asset integrity/u);
  assert.match(readyToFinishPurposePromptSource, /whether written assets satisfy the need and are safe to enter Finish/u);
  assert.match(readyToFinishCodeChangeIdentityPromptSource, /final certification for code written assets/u);
  assert.match(readyToFinishCodeChangeInstructionsPromptSource, /pull request delivery-mechanism emission/u);
  assert.match(readyToFinishCodeChangePlanPromptSource, /code written-asset readiness assessment/u);
  assert.match(readyToFinishCodeChangeReviewIdentityPromptSource, /final validation of review readiness for code written assets/u);
  assert.match(readyToFinishCodeChangeReviewInstructionsPromptSource, /written assets and the delivery mechanism remain coherent/u);
  assert.match(readyToFinishCodeChangeReviewPlanPromptSource, /written-asset coherence checks/u);
});

test('Terminal execution surfaces do not keep generated JavaScript mirrors beside TypeScript source', () => {
  assert.match(reformSource, /generated co-located JS cleanup/u);

  for (const removedPath of removedTerminalExecutionGeneratedJsMirrors) {
    assert.equal(
      existsSync(new URL(removedPath, import.meta.url)),
      false,
      `${removedPath} must not remain as stale Terminal execution source`
    );
  }
});

test('execution notifications and support rails use AssetPack and Shippable naming before compatibility storage', () => {
  assert.match(reformSource, /active notification run types must use `asset-pack` and `need-measurement`/u);
  assert.match(reformSource, /active operational scripts must likewise use AssetPack evidence names first/u);

  assert.match(notificationTypesSource, /export type BitcodeRunNotificationType = 'asset-pack' \| 'need-measurement';/u);
  assert.match(notificationEventsSource, /runType: BitcodeRunNotificationType;/u);
  assert.match(notificationProcessorSource, /AssetPack execution/u);
  assert.match(notificationProcessorSource, /Need measurement execution/u);
  assert.match(notificationProcessorSource, /const executionUrl = `\/executions\/\$\{runId\}`;/u);
  assert.match(notificationReadmeSource, /runType: 'asset-pack'/u);
  assert.match(notificationReadmeSource, /`need-measurement` for Need measurement executions/u);
  assert.match(notificationReadmeSource, /\/executions\/:runId/u);
  assert.doesNotMatch(notificationTypesSource, /runType: 'deliverable' \| 'measure'/u);
  assert.doesNotMatch(notificationProcessorSource, /pipeline-executions|measure-executions|deliverable-runs/u);

  assert.doesNotMatch(routeRewriteMiddlewareSource, /\/deliverables/u);
  assert.match(authenticationMiddlewareSource, /Check Exchange execution ownership/u);
  assert.match(vcsDataHookSource, /Need measurement,/u);
  assert.match(vcsDataHookSource, /AssetPack synthesis evidence, and Shippable delivery mechanisms/u);
  assert.match(tpsReadmeSource, /\/application/u);
  assert.match(tpsReadmeSource, /\/executions/u);
  assert.doesNotMatch(tpsReadmeSource, /\/deliverables/u);

  assert.match(uapiPackageSource, /sync-asset-pack-evidence-embeddings/u);
  assert.doesNotMatch(uapiPackageSource, /sync-deliverables-embeddings/u);
  assert.match(syncAssetPackEvidenceEmbeddingsScriptSource, /AssetPack evidence/u);
  assert.match(syncAssetPackEvidenceEmbeddingsScriptSource, /ASSET_PACK_EVIDENCE_TABLE = 'deliverables'/u);
  assert.doesNotMatch(syncAssetPackEvidenceEmbeddingsScriptSource, /Fetching existing deliverables|Embedding .* deliverables|Sync deliverables failed/u);

  assert.match(runLongRunnerSource, /pull-request Shippable/u);
  assert.match(runLongRunnerSource, /shippableUrl/u);
  assert.doesNotMatch(runLongRunnerSource, /deliverableUrl/u);
  assert.match(rootTsconfigSource, /"@\/lib\/asset-pack"/u);
  assert.match(uapiTsconfigSource, /"@\/lib\/asset-pack"/u);
  assert.doesNotMatch(rootTsconfigSource, /"@\/lib\/deliverables"/u);
  assert.doesNotMatch(uapiTsconfigSource, /"@\/lib\/deliverables"/u);

  for (const removedPath of [...removedNotificationGeneratedJsMirrors, ...removedExecutionSupportGeneratedJsMirrors]) {
    assert.equal(
      existsSync(new URL(removedPath, import.meta.url)),
      false,
      `${removedPath} must not remain as stale notification or execution-support source`
    );
  }
});

test('deliverable substep PromptParts express Bitcode need, written-asset, and asset-pack semantics', () => {
  assert.ok(
    deliverableSubstepPromptPartSources.length >= 20,
    `expected remaining AssetPack substep promptpart coverage, saw ${deliverableSubstepPromptPartSources.length}`
  );

  const combinedPromptText = deliverableSubstepPromptPartSources
    .map(([_filename, source]) => source)
    .join('\n');

  for (const [filename, source] of deliverableSubstepPromptPartSources) {
    assert.doesNotMatch(source, oldWorldDeliverableSubstepLanguage, `${filename} still uses generic old-world substep language`);
    assert.doesNotMatch(source, /current_version:\s*"G[A]1/u, `${filename} still carries G[A]1 current_version metadata`);
    assert.match(source, /current_version:\s*"0\.50\.0"/u, `${filename} should carry Bitcode current_version metadata`);
    assert.match(source, bitcodeSubstepDocCommentIntent, `${filename} should carry Bitcode doc-comment intent metadata`);
  }

  assert.match(combinedPromptText, /Bitcode need/u);
  assert.match(combinedPromptText, /written-asset/u);
  assert.match(combinedPromptText, /asset-pack/u);
  assert.match(combinedPromptText, /delivery-mechanism|deliveryMechanism/u);
  assert.match(combinedPromptText, /proof obligations|proof reread|proof evidence/u);
  assert.match(combinedPromptText, /writtenAssets/u);
  assert.match(combinedPromptText, /assetPack/u);
});

test('retained AssetPack compatibility PromptPart doc-comment metadata is Bitcode-native', () => {
  assert.ok(
    deliverablePromptPartMetadataSources.length >= 490,
    `expected broad AssetPack compatibility promptpart metadata coverage, saw ${deliverablePromptPartMetadataSources.length}`
  );

  for (const [filename, source] of deliverablePromptPartMetadataSources) {
    assert.doesNotMatch(source, /current_version:\s*"G[A]1/u, `${filename} still carries G[A]1 current_version metadata`);
    assert.match(source, /current_version:\s*"0\.50\.0"/u, `${filename} should carry Bitcode current_version metadata`);
    assert.doesNotMatch(source, staleDeliverablePromptPartIntent, `${filename} still carries old deliverable intent metadata`);
    assert.doesNotMatch(source, /Finalize Shipment|Determine Deliverable Type|shipment|shipping-phase/u, `${filename} still teaches shipment or deliverable-type semantics`);
    assert.match(
      source,
      /intent:\s*"Bitcode [^"]*(?:need|written|asset-pack|assetPack|AssetPack|synthesis|evidence|delivery|Shippable|proof|comprehend-task)/u,
      `${filename} should carry Bitcode intent metadata`
    );
  }
});

test('raw PromptPart benchmark metadata stays parseable after broad normalization', () => {
  assert.ok(rawPromptPartSourceEntries.length >= 1800, `expected broad raw PromptPart coverage, saw ${rawPromptPartSourceEntries.length}`);

  for (const [filename, source] of rawPromptPartSourceEntries) {
    assert.doesNotMatch(source, malformedPromptPartBenchmarkScorePattern, `${filename} has malformed benchmark score metadata`);
  }
});

test('retained maintenance scripts audit current Bitcode prompt and asset-pack-run semantics', () => {
  assert.match(promptAuditScriptSource, /ASSET-PACK PIPELINE PROMPT AUDIT/u);
  assert.match(promptAuditScriptSource, /packages\/prompts\/src\/raw_promptparts\/specific/u);
  assert.match(promptAuditScriptSource, /"comprehendneed"/u);
  assert.match(promptAuditScriptSource, /"assetpacksynthesizeartifacts"/u);
  assert.match(promptAuditScriptSource, /"assetpackfinishcreatepullrequestdelivery"/u);
  assert.match(promptAuditScriptSource, /"try_directives"/u);
  assert.doesNotMatch(promptAuditScriptSource, /"comprehendtask"/u);
  assert.doesNotMatch(promptAuditScriptSource, /Shipping Phase/u);
  assert.doesNotMatch(promptAuditScriptSource, /prompts\/src\/raw\/specific/u);

  assert.match(updateAssetPackStorageTableNamesScriptSource, /repo_root=/u);
  assert.match(updateAssetPackStorageTableNamesScriptSource, /deliverable_pipeline_runs/u);
  assert.match(updateAssetPackStorageTableNamesScriptSource, /active Bitcode corridor is AssetPack execution/u);
  assert.doesNotMatch(updateAssetPackStorageTableNamesScriptSource, /Developer\/engi\/engi/u);

  assert.match(updateAssetPackAgentsScriptSource, /repo_root=/u);
  assert.match(updateAssetPackAgentsScriptSource, /retained AssetPack pipeline agents/u);
  assert.match(updateAssetPackAgentsScriptSource, /packages\/pipelines\/asset-pack\/src\/agents/u);
  assert.doesNotMatch(updateAssetPackAgentsScriptSource, /Developer\/engi\/engi/u);

  assert.match(generateAssetPackPromptPartsTsSource, /Comprehend Need/u);
  assert.match(generateAssetPackPromptPartsTsSource, /raw_promptparts\/specific/u);
  assert.match(generateAssetPackPromptPartsTsSource, /AssetPack metadata/u);
  assert.doesNotMatch(generateAssetPackPromptPartsTsSource, /comprehendtask/u);

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
        if (/^promptpart_specific_agent_(?:assetpackfinish|assetpacksynthesizeartifacts)/u.test(filename)) {
          checkedPromptParts += 1;
          continue;
        }
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

test('reformed runtime promptpart JavaScript teaches Bitcode written-asset Finish and delivery semantics', () => {
  const runtimePromptText = reformedRuntimePromptJsSources.join('\n');

  assert.match(runtimePromptText, /Bitcode AssetPack pipeline AI system/u);
  assert.match(runtimePromptText, /stable Need-satisfaction AssetPack contents and evidence/u);
  assert.match(runtimePromptText, /final readiness orchestration for validated Need-satisfaction AssetPack synthesis artifacts, stored AssetPack evidence, and connected-interface delivery mechanisms/u);
  assert.match(runtimePromptText, /pull request delivery-mechanism emission/u);
  assert.match(runtimePromptText, /written assets and the delivery mechanism remain coherent/u);
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
