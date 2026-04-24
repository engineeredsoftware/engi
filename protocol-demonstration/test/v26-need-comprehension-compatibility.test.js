import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

const repoRoot = path.resolve(new URL('..', import.meta.url).pathname, '..');

function readRepoFile(relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), 'utf8');
}

function listFilesRecursively(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  return readdirSync(absolutePath).flatMap((entry) => {
    const absoluteEntry = path.join(absolutePath, entry);
    const relativeEntry = path.join(relativePath, entry);
    if (entry === 'node_modules') return [];
    return statSync(absoluteEntry).isDirectory()
      ? listFilesRecursively(relativeEntry)
      : [relativeEntry];
  });
}

test('V26 need-comprehension compatibility keeps canonical owners separate from task-named wrappers', () => {
  const canonicalToolTs = readRepoFile('packages/generic-tools/need-comprehension/src/AnalyzeNeedSemanticsTool.ts');
  const compatibilityToolTs = readRepoFile('packages/generic-tools/need-comprehension/src/AnalyzeTaskSemanticsTool.ts');
  const toolsetTs = readRepoFile('packages/generic-tools/need-comprehension/src/NeedComprehensionToolset.ts');
  const extractToolTs = readRepoFile('packages/generic-tools/need-comprehension/src/ExtractNeedRequirementsTool.ts');
  const identifyToolTs = readRepoFile('packages/generic-tools/need-comprehension/src/IdentifyNeedConstraintsTool.ts');
  const satisfactionToolTs = readRepoFile('packages/generic-tools/need-comprehension/src/GenerateNeedSatisfactionCriteriaTool.ts');
  const validateToolTs = readRepoFile('packages/generic-tools/need-comprehension/src/ValidateNeedComprehensionTool.ts');
  const complexityToolTs = readRepoFile('packages/generic-tools/need-comprehension/src/AnalyzeNeedSatisfactionImplementationComplexityTool.ts');
  const canonicalPrimitivesTs = readRepoFile('packages/generic-tools/need-comprehension/src/need-comprehension-primitives.ts');
  const compatibilityPrimitivesTs = readRepoFile('packages/generic-tools/need-comprehension/src/primitives.ts');
  const canonicalSchemasTs = readRepoFile('packages/generic-tools/need-comprehension/src/need-comprehension-schemas.ts');
  const compatibilitySchemasTs = readRepoFile('packages/generic-tools/need-comprehension/src/schemas.ts');
  const indexTs = readRepoFile('packages/generic-tools/need-comprehension/src/index.ts');
  const agentPackageJson = JSON.parse(readRepoFile('packages/generic-agents/need-comprehension/package.json'));
  const agentReadme = readRepoFile('packages/generic-agents/need-comprehension/README.md');
  const agentSource = readRepoFile('packages/generic-agents/need-comprehension/src/index.ts');
  const pipelineAdapter = readRepoFile('packages/pipelines/asset-pack/src/agents/setup/asset-pack-comprehend-need-agent.ts');
  const dangerWallAdapter = readRepoFile('packages/pipelines/asset-pack/src/agents/setup/asset-pack-danger-wall-agent.ts');
  const setupPhase = readRepoFile('packages/pipelines/asset-pack/src/phases/setup.ts');

  assert.match(canonicalToolTs, /Canonical Bitcode need-semantics tool owner/u);
  assert.match(canonicalToolTs, /export class AnalyzeNeedSemanticsTool/u);
  assert.match(canonicalToolTs, /use = analyzeNeedSemantics/u);
  assert.match(compatibilityToolTs, /Compatibility wrapper for task-named tool calls/u);
  assert.match(compatibilityToolTs, /extends Tool<typeof analyzeTaskSemantics>/u);
  assert.match(extractToolTs, /export class ExtractNeedRequirementsTool/u);
  assert.match(extractToolTs, /use = extractNeedRequirements/u);
  assert.match(identifyToolTs, /export class IdentifyNeedConstraintsTool/u);
  assert.match(identifyToolTs, /use = identifyNeedConstraints/u);
  assert.match(satisfactionToolTs, /export class GenerateNeedSatisfactionCriteriaTool/u);
  assert.match(satisfactionToolTs, /use = generateNeedSatisfactionCriteria/u);
  assert.match(validateToolTs, /export class ValidateNeedComprehensionTool/u);
  assert.match(validateToolTs, /use = validateNeedComprehension/u);
  assert.match(complexityToolTs, /export class AnalyzeNeedSatisfactionImplementationComplexityTool/u);
  assert.match(complexityToolTs, /use = analyzeNeedSatisfactionImplementationComplexity/u);
  assert.match(toolsetTs, /Canonical Bitcode need-comprehension tool collection/u);
  assert.match(toolsetTs, /individually defined tools are intentionally not agents/u);
  assert.match(toolsetTs, /analyzeNeedSemanticsTool/u);
  assert.match(toolsetTs, /extractNeedRequirementsTool/u);
  assert.match(toolsetTs, /identifyNeedConstraintsTool/u);
  assert.match(toolsetTs, /generateNeedSatisfactionCriteriaTool/u);
  assert.match(toolsetTs, /validateNeedComprehensionTool/u);
  assert.match(toolsetTs, /analyzeNeedSatisfactionImplementationComplexityTool/u);
  assert.match(toolsetTs, /BITCODE_NEED_COMPREHENSION_TOOLSET/u);

  assert.match(canonicalPrimitivesTs, /export async function analyzeNeedSemantics/u);
  assert.match(canonicalPrimitivesTs, /export async function extractNeedRequirements/u);
  assert.match(canonicalPrimitivesTs, /export async function identifyNeedConstraints/u);
  assert.match(canonicalPrimitivesTs, /export async function generateNeedSatisfactionCriteria/u);
  assert.match(canonicalPrimitivesTs, /export async function validateNeedComprehension/u);
  assert.match(canonicalPrimitivesTs, /export async function analyzeNeedSatisfactionImplementationComplexity/u);
  assert.match(canonicalPrimitivesTs, /source_to_shares_service_questions/u);
  assert.match(canonicalPrimitivesTs, /commercial_accountability/u);
  assert.match(compatibilityPrimitivesTs, /Compatibility wrapper around canonical need-first primitive owners/u);
  assert.match(compatibilityPrimitivesTs, /export async function analyzeTaskSemantics/u);
  assert.match(compatibilityPrimitivesTs, /expressed_need: task_description/u);

  assert.match(canonicalSchemasTs, /NeedComprehensionCompatibilityPrimaryTypeSchema/u);
  assert.match(canonicalSchemasTs, /NeedRequirementSchema/u);
  assert.match(canonicalSchemasTs, /NeedConstraintSchema/u);
  assert.match(canonicalSchemasTs, /NeedSatisfactionCriterionSchema/u);
  assert.match(compatibilitySchemasTs, /Compatibility wrapper around the canonical need-first schema owners/u);
  assert.match(compatibilitySchemasTs, /NeedComprehensionCompatibilityPrimaryTypeSchema as TaskTypeSchema/u);

  assert.match(indexTs, /AnalyzeNeedSemanticsTool/u);
  assert.match(indexTs, /NeedComprehensionToolset/u);
  assert.match(indexTs, /need-comprehension-primitives/u);
  assert.match(indexTs, /need-comprehension-schemas/u);
  assert.deepEqual(
    listFilesRecursively('packages/generic-tools/need-comprehension/src')
      .filter((filePath) => filePath.endsWith('.js')),
    [],
    'need-comprehension source must stay TypeScript-only; generated JavaScript belongs outside src'
  );

  assert.equal(agentPackageJson.name, '@bitcode/generic-agents-need-comprehension');
  assert.equal(agentPackageJson.dependencies['@bitcode/generic-tools-need-comprehension'], 'workspace:*');
  assert.match(agentReadme, /PTRR agent owner for Bitcode setup-phase Need comprehension/u);
  assert.match(agentReadme, /setup` \/ `pre-danger-wall/u);
  assert.match(agentSource, /factoryAgentWithPTRR/u);
  assert.match(agentSource, /bitcodeSetupNeedComprehensionAgent/u);
  assert.match(agentSource, /phase: z\.literal\('setup'\)/u);
  assert.match(agentSource, /beforeAgent: z\.literal\('danger-wall'\)/u);
  assert.match(agentSource, /PROMPTPART_SPECIFIC_AGENT_COMPREHENDNEED_SYSTEM_IDENTITY/u);
  assert.match(agentSource, /PROMPTPART_SPECIFIC_AGENT_COMPREHENDNEED_TRY_DIRECTIVES/u);
  assert.match(agentSource, /analyzeNeedSemanticsTool/u);
  assert.match(agentSource, /extractNeedRequirementsTool/u);
  assert.match(agentSource, /validateNeedComprehensionTool/u);
  assert.match(agentSource, /analyzeNeedSatisfactionImplementationComplexityTool/u);
  assert.match(agentSource, /source_to_shares_service_questions/u);
  assert.match(agentReadme, /source-to-shares service questions/u);
  assert.match(pipelineAdapter, /bitcodeSetupNeedComprehensionAgent/u);
  assert.match(pipelineAdapter, /phase: 'setup'/u);
  assert.match(pipelineAdapter, /beforeAgent: 'danger-wall'/u);
  assert.match(pipelineAdapter, /setup\/need-comprehension/u);
  assert.match(dangerWallAdapter, /setup\/need-comprehension/u);
  assert.match(dangerWallAdapter, /riskAdmissionInput/u);
  assert.match(setupPhase, /setup:asset-pack-comprehend-need-agent/u);
  assert.match(setupPhase, /setup:asset-pack-danger-wall-agent/u);
});
