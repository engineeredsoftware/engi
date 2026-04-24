import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import path from 'node:path';
import {
  V26_INFERENCE_IMPLEMENTATION_RECORD_REQUIRED_FIELDS,
  V26_INFERENCE_IMPLEMENTATION_SECTION_REQUIREMENTS,
  V26_INFERENCE_IMPLEMENTATION_RECORDS,
  V26_INFERENCE_VERIFICATION_EVIDENCE_TYPES,
  validateV26InferenceImplementationRecords
} from '../src/canonical/inference-implementation-records.js';

const repoRoot = path.resolve(new URL('..', import.meta.url).pathname, '..');

function repoFileExists(filePath) {
  return existsSync(path.join(repoRoot, filePath));
}

test('V26 inference implementation records cover required prompt/tool/agent/execution fields', () => {
  const validation = validateV26InferenceImplementationRecords({ fileExists: repoFileExists });

  assert.equal(validation.passed, true);
  assert.equal(validation.recordCount, V26_INFERENCE_IMPLEMENTATION_RECORDS.length);
  assert.deepEqual(validation.requiredFields, V26_INFERENCE_IMPLEMENTATION_RECORD_REQUIRED_FIELDS);
  assert.deepEqual(validation.requiredSectionFields, V26_INFERENCE_IMPLEMENTATION_SECTION_REQUIREMENTS);
  assert.deepEqual(validation.verificationEvidenceTypes, V26_INFERENCE_VERIFICATION_EVIDENCE_TYPES);
  assert.deepEqual(
    validation.recordChecks.filter((check) => check.passed !== true),
    []
  );
  assert.deepEqual(
    validation.recordChecks.flatMap((check) => check.missingSectionFields),
    []
  );
  assert.deepEqual(
    V26_INFERENCE_IMPLEMENTATION_RECORDS.flatMap((record) =>
      record.promptImplementation.registryLayering ? [] : [record.recordId]
    ),
    []
  );
  assert.deepEqual(
    validation.recordChecks.flatMap((check) => check.missingImplementationOwnerRefs),
    []
  );
  assert.deepEqual(
    validation.recordChecks.flatMap((check) => check.missingVerificationEvidenceRefs),
    []
  );
  assert.deepEqual(
    validation.recordChecks.flatMap((check) => check.declaredVerificationGaps),
    []
  );
  assert.deepEqual(
    validation.recordChecks.filter((check) => check.hasExecutableOrGeneratedVerificationEvidence !== true),
    []
  );
});

test('V26 inference implementation registry names every current fifth-gate inference family', () => {
  const recordIds = V26_INFERENCE_IMPLEMENTATION_RECORDS.map((record) => record.recordId).sort();

  assert.deepEqual(recordIds, [
    'agent-infrastructure',
    'asset-pack-synthesis-compatibility',
    'conversation-inference',
    'execution-infrastructure',
    'external-evidence-research-support',
    'mcp-external-ingress',
    'need-comprehension-compatibility',
    'need-review-before-fit-search',
    'need-risk-admission-support',
    'pipeline-infrastructure',
    'prompt-primitives',
    'tool-prompt-infrastructure'
  ]);
});

test('V26 inference implementation registry binds records to canonical Bitcode semantics', () => {
  const recordsById = Object.fromEntries(
    V26_INFERENCE_IMPLEMENTATION_RECORDS.map((record) => [record.recordId, record])
  );

  assert.match(recordsById['prompt-primitives'].canonicalNeed, /prompt substrate/u);
  assert.match(recordsById['tool-prompt-infrastructure'].canonicalNeed, /tool descriptions/u);
  assert.match(recordsById['agent-infrastructure'].canonicalNeed, /agent roles/u);
  assert.match(recordsById['execution-infrastructure'].canonicalNeed, /execution tree/u);
  assert.match(recordsById['pipeline-infrastructure'].canonicalNeed, /Bitcode runs/u);
  assert.match(recordsById['conversation-inference'].canonicalNeed, /rich-input Bitcode write surface/u);
  assert.match(recordsById['asset-pack-synthesis-compatibility'].canonicalNeed, /asset-pack written-asset synthesis/u);
  assert.match(recordsById['asset-pack-synthesis-compatibility'].canonicalNeed, /delivery-mechanism compatibility/u);
  assert.match(recordsById['need-comprehension-compatibility'].canonicalNeed, /setup-phase Bitcode Need comprehension/u);
  assert.match(recordsById['need-comprehension-compatibility'].canonicalNeed, /written-asset expectations/u);
  assert.match(recordsById['need-comprehension-compatibility'].canonicalNeed, /AssetPack context/u);
  assert.match(recordsById['need-review-before-fit-search'].canonicalNeed, /before any candidate recall/u);
  assert.match(recordsById['need-review-before-fit-search'].canonicalNeed, /source-to-shares settlement review/u);
  assert.match(recordsById['external-evidence-research-support'].canonicalNeed, /discovery phase/u);
  assert.match(recordsById['external-evidence-research-support'].canonicalNeed, /need synthesis/u);
  assert.match(recordsById['need-risk-admission-support'].canonicalNeed, /pipeline phase/u);
  assert.match(recordsById['need-risk-admission-support'].canonicalNeed, /AssetPack/u);
  assert.match(recordsById['need-risk-admission-support'].canonicalNeed, /risk/u);
  assert.match(recordsById['mcp-external-ingress'].canonicalNeed, /fail-closed ingress/u);
  assert.match(recordsById['prompt-primitives'].promptImplementation.registryLayering, /Prompt extends RegistryImpl<PromptPart>/u);
  assert.match(recordsById['prompt-primitives'].promptImplementation.registryLayering, /raw_promptparts\/generic holds reusable base PromptPart layers/u);
  assert.match(recordsById['prompt-primitives'].promptImplementation.registryLayering, /raw_promptparts\/specific holds concrete Bitcode implementation PromptParts/u);
  assert.match(recordsById['asset-pack-synthesis-compatibility'].promptImplementation.registryLayering, /Generic PTRR and formatting PromptParts form base layers/u);
  assert.match(recordsById['asset-pack-synthesis-compatibility'].promptImplementation.registryLayering, /specific deliverable\/setup\/validation\/finish PromptParts implement Bitcode need/u);
  assert.match(recordsById['asset-pack-synthesis-compatibility'].promptImplementation.rawPromptPartBoundary, /SYSTEMTEXTSEARCH PromptParts/u);
  assert.match(recordsById['asset-pack-synthesis-compatibility'].promptImplementation.rawPromptPartBoundary, /TEXTSEARCHER/u);
  assert.match(recordsById['asset-pack-synthesis-compatibility'].toolImplementation.contract, /repository-evidence search tools are bounded grep-backed support/u);
  assert.ok(
    recordsById['asset-pack-synthesis-compatibility'].promptImplementation.owners.includes(
      'packages/generic-agents/text-searcher/src/prompts/agent-prompt-text-searcher.ts'
    )
  );
  assert.ok(
    recordsById['asset-pack-synthesis-compatibility'].agentImplementation.owners.includes(
      'packages/generic-agents/text-searcher/src/index.ts'
    )
  );
  assert.ok(
    recordsById['asset-pack-synthesis-compatibility'].promptImplementation.owners.includes(
      'packages/generic-tools/simple-system-text-search/src/prompts/BitcodeRepositoryEvidenceSearchDocCodeToolPrompt.ts'
    )
  );
  assert.ok(
    recordsById['asset-pack-synthesis-compatibility'].toolImplementation.owners.includes(
      'packages/generic-tools/simple-system-text-search/src/index.ts'
    )
  );
  assert.deepEqual(recordsById['need-comprehension-compatibility'].toolImplementation.owners, [
    'packages/generic-tools/need-comprehension/src/AnalyzeNeedSemanticsTool.ts',
    'packages/generic-tools/need-comprehension/src/ExtractNeedRequirementsTool.ts',
    'packages/generic-tools/need-comprehension/src/IdentifyNeedConstraintsTool.ts',
    'packages/generic-tools/need-comprehension/src/GenerateNeedSatisfactionCriteriaTool.ts',
    'packages/generic-tools/need-comprehension/src/ValidateNeedComprehensionTool.ts',
    'packages/generic-tools/need-comprehension/src/AnalyzeNeedSatisfactionImplementationComplexityTool.ts',
    'packages/generic-tools/need-comprehension/src/NeedComprehensionToolset.ts',
    'packages/generic-tools/need-comprehension/src/need-comprehension-primitives.ts',
    'packages/generic-tools/need-comprehension/src/need-comprehension-schemas.ts'
  ]);
  assert.match(recordsById['need-comprehension-compatibility'].toolImplementation.contract, /Canonical need-first tools are individually defined/u);
  assert.match(recordsById['need-comprehension-compatibility'].toolImplementation.contract, /collected by NeedComprehensionToolset/u);
  assert.match(recordsById['need-comprehension-compatibility'].toolImplementation.contract, /callable capabilities, not agents/u);
  assert.match(recordsById['need-comprehension-compatibility'].toolImplementation.contract, /retained task-named APIs remain compatibility carriers/u);
  assert.ok(
    recordsById['need-comprehension-compatibility'].agentImplementation.owners.includes(
      'packages/generic-agents/need-comprehension/src/index.ts'
    )
  );
  assert.ok(
    recordsById['need-comprehension-compatibility'].agentImplementation.owners.includes(
      'packages/pipelines/deliverable/src/agents/setup/deliverable-pipeline-comprehend-need-agent.ts'
    )
  );
  assert.match(recordsById['need-comprehension-compatibility'].agentImplementation.contract, /bitcodeSetupNeedComprehensionAgent/u);
  assert.match(recordsById['need-comprehension-compatibility'].agentImplementation.contract, /setup\/pre-danger-wall PTRR agent/u);
  assert.match(recordsById['need-comprehension-compatibility'].agentImplementation.contract, /generic-tools Need-comprehension toolset/u);
  assert.match(recordsById['need-review-before-fit-search'].executionImplementation.carriers.join(' '), /\.bitcode\/need-review\.json/u);
  assert.match(recordsById['need-review-before-fit-search'].toolImplementation.contract, /blocked unless the measured Need review admits it/u);
  assert.equal(recordsById['need-review-before-fit-search'].boundaryPosture, 'active');
  assert.match(recordsById['external-evidence-research-support'].promptImplementation.rawPromptPartBoundary, /WEBRESEARCHER.*PromptParts/u);
  assert.match(recordsById['external-evidence-research-support'].promptImplementation.rawPromptPartBoundary, /WEBSEARCH/u);
  assert.match(recordsById['external-evidence-research-support'].promptImplementation.rawPromptPartBoundary, /GETCONTENTS_DOCCODE/u);
  assert.match(recordsById['external-evidence-research-support'].promptImplementation.rawPromptPartBoundary, /need-synthesis web research/u);
  assert.match(recordsById['external-evidence-research-support'].agentImplementation.contract, /bitcodeNeedSynthesisWebResearcher/u);
  assert.match(recordsById['external-evidence-research-support'].agentImplementation.contract, /bitcodeNeedSynthesisWebSearch/u);
  assert.match(recordsById['external-evidence-research-support'].toolImplementation.contract, /discovery-phase need synthesis/u);
  assert.ok(
    recordsById['external-evidence-research-support'].promptImplementation.owners.includes(
      'packages/generic-agents/web-search/src/prompts/agent-prompt-web-search.ts'
    )
  );
  assert.ok(
    recordsById['external-evidence-research-support'].promptImplementation.owners.includes(
      'packages/generic-tools/web-search/src/prompts/WebSearchDocCodeToolPrompt.ts'
    )
  );
  assert.ok(
    recordsById['external-evidence-research-support'].agentImplementation.owners.includes(
      'packages/generic-agents/web-search/src/index.ts'
    )
  );
  assert.match(recordsById['need-risk-admission-support'].promptImplementation.rawPromptPartBoundary, /DANGERWALL PromptParts/u);
  assert.match(recordsById['need-risk-admission-support'].promptImplementation.rawPromptPartBoundary, /risk-admission/u);
  assert.match(recordsById['need-risk-admission-support'].promptImplementation.registryLayering, /delivery-mechanism/u);
  assert.match(recordsById['need-risk-admission-support'].promptImplementation.registryLayering, /likely-execution-failure/u);
  assert.match(recordsById['need-risk-admission-support'].agentImplementation.contract, /bitcodeNeedRiskAdmissionAgent/u);
  assert.match(recordsById['need-risk-admission-support'].toolImplementation.contract, /admission ambiguity/u);

  assert.equal(recordsById['asset-pack-synthesis-compatibility'].boundaryPosture, 'compatibility');
  assert.equal(recordsById['need-comprehension-compatibility'].boundaryPosture, 'compatibility');
  assert.equal(recordsById['external-evidence-research-support'].boundaryPosture, 'admitted support');
  assert.equal(recordsById['need-risk-admission-support'].boundaryPosture, 'admitted support');
  assert.equal(recordsById['mcp-external-ingress'].boundaryPosture, 'ingress');
});
