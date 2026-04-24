import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const repoRoot = path.resolve(new URL('..', import.meta.url).pathname, '..');

function readRepoFile(relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), 'utf8');
}

test('V26 need-comprehension compatibility keeps canonical owners separate from task-named wrappers', () => {
  const canonicalToolTs = readRepoFile('packages/generic-tools/need-comprehension/src/AnalyzeNeedSemanticsTool.ts');
  const compatibilityToolTs = readRepoFile('packages/generic-tools/need-comprehension/src/AnalyzeTaskSemanticsTool.ts');
  const toolsetTs = readRepoFile('packages/generic-tools/need-comprehension/src/NeedComprehensionToolset.ts');
  const canonicalToolJs = readRepoFile('packages/generic-tools/need-comprehension/src/AnalyzeNeedSemanticsTool.js');
  const compatibilityToolJs = readRepoFile('packages/generic-tools/need-comprehension/src/AnalyzeTaskSemanticsTool.js');
  const toolsetJs = readRepoFile('packages/generic-tools/need-comprehension/src/NeedComprehensionToolset.js');
  const canonicalPrimitivesTs = readRepoFile('packages/generic-tools/need-comprehension/src/need-comprehension-primitives.ts');
  const compatibilityPrimitivesTs = readRepoFile('packages/generic-tools/need-comprehension/src/primitives.ts');
  const canonicalPrimitivesJs = readRepoFile('packages/generic-tools/need-comprehension/src/need-comprehension-primitives.js');
  const compatibilityPrimitivesJs = readRepoFile('packages/generic-tools/need-comprehension/src/primitives.js');
  const canonicalSchemasTs = readRepoFile('packages/generic-tools/need-comprehension/src/need-comprehension-schemas.ts');
  const compatibilitySchemasTs = readRepoFile('packages/generic-tools/need-comprehension/src/schemas.ts');
  const canonicalSchemasJs = readRepoFile('packages/generic-tools/need-comprehension/src/need-comprehension-schemas.js');
  const compatibilitySchemasJs = readRepoFile('packages/generic-tools/need-comprehension/src/schemas.js');
  const indexTs = readRepoFile('packages/generic-tools/need-comprehension/src/index.ts');
  const indexJs = readRepoFile('packages/generic-tools/need-comprehension/src/index.js');
  const agentPackageJson = JSON.parse(readRepoFile('packages/generic-agents/need-comprehension/package.json'));
  const agentReadme = readRepoFile('packages/generic-agents/need-comprehension/README.md');
  const agentSource = readRepoFile('packages/generic-agents/need-comprehension/src/index.ts');
  const pipelineAdapter = readRepoFile('packages/pipelines/deliverable/src/agents/setup/deliverable-pipeline-comprehend-need-agent.ts');
  const dangerWallAdapter = readRepoFile('packages/pipelines/deliverable/src/agents/setup/deliverable-pipeline-danger-wall-agent.ts');
  const setupPhase = readRepoFile('packages/pipelines/deliverable/src/phases/setup.ts');

  assert.match(canonicalToolTs, /Canonical Bitcode need-semantics tool owner/u);
  assert.match(canonicalToolTs, /export class AnalyzeNeedSemanticsTool/u);
  assert.match(canonicalToolTs, /use = analyzeNeedSemantics/u);
  assert.match(compatibilityToolTs, /Compatibility wrapper for task-named tool calls/u);
  assert.match(compatibilityToolTs, /extends AnalyzeNeedSemanticsTool/u);
  assert.match(canonicalToolJs, /Canonical Bitcode need-semantics tool owner/u);
  assert.match(compatibilityToolJs, /Compatibility wrapper for task-named tool calls/u);
  assert.match(toolsetTs, /Canonical Bitcode need-comprehension toolset/u);
  assert.match(toolsetTs, /These tools are intentionally not agents/u);
  assert.match(toolsetTs, /analyzeNeedSemanticsTool/u);
  assert.match(toolsetTs, /extractNeedRequirementsTool/u);
  assert.match(toolsetTs, /identifyNeedConstraintsTool/u);
  assert.match(toolsetTs, /generateNeedSatisfactionCriteriaTool/u);
  assert.match(toolsetTs, /validateNeedComprehensionTool/u);
  assert.match(toolsetTs, /analyzeNeedSatisfactionImplementationComplexityTool/u);
  assert.match(toolsetTs, /BITCODE_NEED_COMPREHENSION_TOOLSET/u);
  assert.match(toolsetJs, /Canonical Bitcode need-comprehension toolset/u);
  assert.match(toolsetJs, /These tools are intentionally not agents/u);
  assert.match(toolsetJs, /analyzeNeedSemanticsTool/u);

  assert.match(canonicalPrimitivesTs, /export async function analyzeNeedSemantics/u);
  assert.match(canonicalPrimitivesTs, /export async function extractNeedRequirements/u);
  assert.match(canonicalPrimitivesTs, /export async function identifyNeedConstraints/u);
  assert.match(canonicalPrimitivesTs, /export async function generateNeedSatisfactionCriteria/u);
  assert.match(canonicalPrimitivesTs, /export async function validateNeedComprehension/u);
  assert.match(canonicalPrimitivesTs, /export async function analyzeNeedSatisfactionImplementationComplexity/u);
  assert.match(compatibilityPrimitivesTs, /Compatibility wrapper around canonical need-first primitive owners/u);
  assert.match(compatibilityPrimitivesTs, /analyzeNeedSemantics as analyzeTaskSemantics/u);
  assert.match(canonicalPrimitivesJs, /exports\.analyzeNeedSemantics = analyzeNeedSemantics/u);
  assert.match(compatibilityPrimitivesJs, /Compatibility wrapper around canonical need-first primitive owners/u);
  assert.match(compatibilityPrimitivesJs, /analyzeNeedSemantics/u);

  assert.match(canonicalSchemasTs, /NeedComprehensionCompatibilityPrimaryTypeSchema/u);
  assert.match(canonicalSchemasTs, /NeedRequirementSchema/u);
  assert.match(canonicalSchemasTs, /NeedConstraintSchema/u);
  assert.match(canonicalSchemasTs, /NeedSatisfactionCriterionSchema/u);
  assert.match(compatibilitySchemasTs, /Compatibility wrapper around the canonical need-first schema owners/u);
  assert.match(compatibilitySchemasTs, /NeedComprehensionCompatibilityPrimaryTypeSchema as TaskTypeSchema/u);
  assert.match(canonicalSchemasJs, /exports\.NeedComprehensionCompatibilityPrimaryTypeSchema/u);
  assert.match(compatibilitySchemasJs, /Compatibility wrapper around the canonical need-first schema owners/u);

  assert.match(indexTs, /AnalyzeNeedSemanticsTool/u);
  assert.match(indexTs, /NeedComprehensionToolset/u);
  assert.match(indexTs, /need-comprehension-primitives/u);
  assert.match(indexTs, /need-comprehension-schemas/u);
  assert.match(indexJs, /AnalyzeNeedSemanticsTool/u);
  assert.match(indexJs, /NeedComprehensionToolset/u);
  assert.match(indexJs, /need-comprehension-primitives/u);
  assert.match(indexJs, /need-comprehension-schemas/u);

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
  assert.match(pipelineAdapter, /bitcodeSetupNeedComprehensionAgent/u);
  assert.match(pipelineAdapter, /phase: 'setup'/u);
  assert.match(pipelineAdapter, /beforeAgent: 'danger-wall'/u);
  assert.match(pipelineAdapter, /setup\/need-comprehension/u);
  assert.match(dangerWallAdapter, /setup\/need-comprehension/u);
  assert.match(dangerWallAdapter, /riskAdmissionInput/u);
  assert.match(setupPhase, /setup:deliverable-pipeline-comprehend-need-agent/u);
  assert.match(setupPhase, /setup:deliverable-pipeline-danger-wall-agent/u);
});
