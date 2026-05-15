import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

function readRepoFile(relativePath) {
  return readFileSync(new URL(`../../${relativePath}`, import.meta.url), 'utf8');
}

const packageReadme = readRepoFile('packages/generic-agents/text-searcher/README.md');
const packageManifest = JSON.parse(readRepoFile('packages/generic-agents/text-searcher/package.json'));
const indexSource = readRepoFile('packages/generic-agents/text-searcher/src/index.ts');

const promptFilePaths = [
  'packages/generic-agents/text-searcher/src/prompts/agent-prompt-text-searcher.ts',
  'packages/generic-agents/text-searcher/src/prompts/system-prompt-text-searcher.ts',
  'packages/generic-agents/text-searcher/src/prompts/plan-prompt-text-searcher.ts',
  'packages/generic-agents/text-searcher/src/prompts/try-prompt-text-searcher.ts',
  'packages/generic-agents/text-searcher/src/prompts/refine-prompt-text-searcher.ts',
  'packages/generic-agents/text-searcher/src/prompts/retry-prompt-text-searcher.ts'
];

const rawPromptPartPaths = [
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_textsearcher_purpose_corestatement.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_textsearcher_capabilities_list.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_textsearcher_executionpattern_detailcontent.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_textsearcher_ptrrsteps_list.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_textsearcher_tools_list.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_textsearcher_integration_detailcontent.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_text_searcher_system_identity.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_text_searcher_system_role.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_text_searcher_system_instructions.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_textsearcher_plan_content_analysis.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_textsearcher_plan_search_strategy.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_textsearcher_try_directives_instructions.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_textsearcher_try_search_techniques.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_textsearcher_refine_relevance_criteria.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_textsearcher_refine_accuracy_enhancement.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_textsearcher_retry_failure_analysis.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_textsearcher_retry_recovery_strategy.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_textsearcher_identity.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_textsearcher_system_context.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_textsearcher_system_identity.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_textsearcher_system_instructions.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_textsearcher_system_role.ts'
];

const oldWorldSearchResiduePattern =
  /G[A]1|TF-IDF|BM25|FAISS|Elasticsearch|OpenSearch|Lucene|WordNet|Naive Bayes|semantic search|content discovery|distributed search|Text Searcher Agent|task description|@bitcode\/generic-tools\/(?:grep|glob|file-system)|grepTool|globTool|fileSystemTool|THE MAGIC|CORRECT declarative|comprehensive text search|Quick search/u;

test('V26 text-searcher package has canonical repository-evidence exports and dependencies', () => {
  assert.equal(packageManifest.dependencies['@bitcode/agent-generics'], 'workspace:*');
  assert.equal(packageManifest.dependencies['@bitcode/prompts'], 'workspace:*');
  assert.equal(packageManifest.dependencies['@bitcode/generic-tools-simple-system-text-search'], 'workspace:*');
  assert.match(indexSource, /bitcodeRepositoryEvidenceSearcher/u);
  assert.match(indexSource, /SIMPLE_TEXT_SEARCH_AGENT = bitcodeRepositoryEvidenceSearcher/u);
  assert.match(indexSource, /simpleSystemTextSearch/u);
  assert.doesNotMatch(indexSource, oldWorldSearchResiduePattern);
});

test('V26 text-searcher README states admitted evidence-only support semantics', () => {
  assert.match(packageReadme, /Bitcode repository-evidence search agent/u);
  assert.match(packageReadme, /not an autonomous search product/u);
  assert.match(packageReadme, /AssetPack/u);
  assert.match(packageReadme, /compatibility aliases/u);
  assert.doesNotMatch(packageReadme, oldWorldSearchResiduePattern);
});

test('V26 text-searcher prompt files carry V26 repository-evidence metadata', () => {
  for (const filePath of promptFilePaths) {
    const source = readRepoFile(filePath);

    assert.match(source, /current_version: "V26"/u, filePath);
    assert.match(source, /Bitcode repository-evidence|repository evidence/u, filePath);
    assert.doesNotMatch(source, oldWorldSearchResiduePattern, filePath);
  }
});

test('V26 text-searcher raw PromptParts are Bitcode-native compatibility carriers', () => {
  for (const filePath of rawPromptPartPaths) {
    const source = readRepoFile(filePath);

    assert.match(source, /current_version: "V26"/u, filePath);
    assert.match(source, /Bitcode|repository evidence|source-grounding|AssetPack|proof|read/u, filePath);
    assert.doesNotMatch(source, oldWorldSearchResiduePattern, filePath);
  }
});
