import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

function readRepoFile(relativePath) {
  return readFileSync(new URL(`../../${relativePath}`, import.meta.url), 'utf8');
}

const webSearchAgentReadme = readRepoFile('packages/generic-agents/web-search/README.md');
const webSearchToolReadme = readRepoFile('packages/generic-tools/web-search/README.md');
const webSearchAgentManifest = JSON.parse(readRepoFile('packages/generic-agents/web-search/package.json'));
const webSearchAgentIndex = readRepoFile('packages/generic-agents/web-search/src/index.ts');
const webSearchToolIndex = readRepoFile('packages/generic-tools/web-search/src/index.ts');

const packageSourceFilePaths = [
  'packages/generic-agents/web-search/README.md',
  'packages/generic-agents/web-search/package.json',
  'packages/generic-agents/web-search/src/index.ts',
  'packages/generic-agents/web-search/src/index.js',
  'packages/generic-tools/web-search/README.md',
  'packages/generic-tools/web-search/src/index.ts',
  'packages/generic-tools/web-search/src/index.js'
];

const promptFilePaths = [
  'packages/generic-agents/web-search/src/prompts/agent-prompt-web-search.ts',
  'packages/generic-agents/web-search/src/prompts/agent-prompt-web-search.js',
  'packages/generic-agents/web-search/src/prompts/system-prompt-web-search.ts',
  'packages/generic-agents/web-search/src/prompts/system-prompt-web-search.js',
  'packages/generic-agents/web-search/src/prompts/plan-prompt-web-search.ts',
  'packages/generic-agents/web-search/src/prompts/plan-prompt-web-search.js',
  'packages/generic-agents/web-search/src/prompts/try-prompt-web-search.ts',
  'packages/generic-agents/web-search/src/prompts/try-prompt-web-search.js',
  'packages/generic-agents/web-search/src/prompts/refine-prompt-web-search.ts',
  'packages/generic-agents/web-search/src/prompts/refine-prompt-web-search.js',
  'packages/generic-agents/web-search/src/prompts/retry-prompt-web-search.ts',
  'packages/generic-agents/web-search/src/prompts/retry-prompt-web-search.js',
  'packages/generic-tools/web-search/src/prompts/WebSearchDocCodeToolPrompt.ts',
  'packages/generic-tools/web-search/src/prompts/WebSearchDocCodeToolPrompt.js',
  'packages/generic-tools/web-search/src/prompts/GetContentsDocCodeToolPrompt.ts',
  'packages/generic-tools/web-search/src/prompts/GetContentsDocCodeToolPrompt.js',
  'packages/generic-tools/web-search/src/prompts/MultiProviderSearchDocCodeToolPrompt.ts',
  'packages/generic-tools/web-search/src/prompts/MultiProviderSearchDocCodeToolPrompt.js'
];

const rawPromptPartPaths = [
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_websearch_capabilities_list.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_websearch_executionpattern_detailcontent.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_websearch_identity.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_websearch_integration_detailcontent.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_websearch_plan_query_analysis.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_websearch_plan_search_strategy.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_websearch_ptrrsteps_list.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_websearch_purpose_corestatement.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_websearch_refine_relevance_criteria.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_websearch_refine_result_enhancement.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_websearch_retry_failure_analysis.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_websearch_retry_recovery_strategy.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_websearch_system_context.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_websearch_system_identity.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_websearch_system_instructions.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_websearch_system_role.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_websearch_tools_list.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_websearch_try_directives_instructions.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_websearch_try_search_techniques.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_web_search_system_identity.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_web_search_system_instructions.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_web_search_system_role.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_tool_websearch_doccodetoolcapabilities.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_tool_websearch_doccodetoolexample1.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_tool_websearch_doccodetoolexample2.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_tool_websearch_doccodetoolexample3.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_tool_websearch_doccodetoolname.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_tool_websearch_doccodetooloutput.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_tool_websearch_doccodetoolparameters.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_tool_websearch_doccodetoolpurpose.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_tool_getcontents_doccodetoolcapabilities.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_tool_getcontents_doccodetoolexample1.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_tool_getcontents_doccodetoolexample2.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_tool_getcontents_doccodetoolexample3.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_tool_getcontents_doccodetoolname.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_tool_getcontents_doccodetooloutput.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_tool_getcontents_doccodetoolparameters.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_tool_getcontents_doccodetoolpurpose.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_tool_multiprovidersearch_doccodetoolcapabilities.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_tool_multiprovidersearch_doccodetoolexample1.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_tool_multiprovidersearch_doccodetoolname.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_tool_multiprovidersearch_doccodetooloutput.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_tool_multiprovidersearch_doccodetoolparameters.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_tool_multiprovidersearch_doccodetoolpurpose.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_tool_websearchtool_capabilities_list.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_tool_websearchtool_identity_corestatement.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_tool_websearchtool_purpose_corestatement.ts'
];

const oldWorldSearchResiduePattern =
  /G[A]1|Enterprise WebSearch|enterprise-grade|Production-grade|production-grade|business intelligence|Prometheus|Grafana|Redis Cluster|Google Custom Search|Bing Web Search|DuckDuckGo API|machine learning result optimization|TF-IDF|PageRank|BERT|RoBERTa|TypeScript performance optimization|production outage kubernetes|web search specialist|Provide concrete|domain.appropriate|web-scraping|automated scraping/u;

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
    content: extractFirstPromptLiteral(source, match.index + match[0].length)
  };
}

function extractJsPromptPart(source, name) {
  const assignment = new RegExp(`exports\\.${name}\\s*=(?!\\s*void\\s+0)`, 'm').exec(source);
  if (!assignment || assignment.index === undefined) return null;

  return extractFirstPromptLiteral(source, assignment.index + assignment[0].length);
}

test('V26 web-search package exposes Bitcode read-synthesis support exports and dependencies', () => {
  assert.equal(webSearchAgentManifest.dependencies['@bitcode/agent-generics'], 'workspace:*');
  assert.equal(webSearchAgentManifest.dependencies['@bitcode/prompts'], 'workspace:*');
  assert.equal(webSearchAgentManifest.dependencies['@bitcode/generic-tools-web-search'], 'workspace:*');
  assert.equal(webSearchAgentManifest.dependencies.zod, '^3.22.4');
  assert.match(webSearchAgentIndex, /bitcodeReadSynthesisWebSearch/u);
  assert.match(webSearchAgentIndex, /webSearch = bitcodeReadSynthesisWebSearchAgent/u);
  assert.match(webSearchAgentIndex, /quickWebSearch = quickBitcodeReadSynthesisWebSearchAgent/u);
  assert.match(webSearchAgentIndex, /does not own canonical read interpretation/u);
  assert.doesNotMatch(webSearchAgentIndex, oldWorldSearchResiduePattern);
});

test('V26 web-search package and tool docs state admitted discovery-phase evidence semantics', () => {
  assert.match(webSearchAgentReadme, /Bitcode Read-Synthesis Web Search Agent/u);
  assert.match(webSearchAgentReadme, /discovery-phase support agent/u);
  assert.match(webSearchAgentReadme, /source-attributed external evidence/u);
  assert.match(webSearchToolReadme, /Bitcode Read-Synthesis Web Search Tools/u);
  assert.match(webSearchToolReadme, /discovery-phase external evidence support/u);
  assert.match(webSearchToolReadme, /not proof closure/u);
  assert.match(webSearchToolIndex, /External web evidence supports Bitcode read synthesis/u);
  assert.match(webSearchToolIndex, /not an independent production search product/u);

  for (const filePath of packageSourceFilePaths) {
    assert.doesNotMatch(readRepoFile(filePath), oldWorldSearchResiduePattern, filePath);
  }
});

test('V26 web-search prompt wrappers carry V26 Bitcode read-synthesis metadata', () => {
  for (const filePath of promptFilePaths) {
    const source = readRepoFile(filePath);

    assert.match(source, /V26|Bitcode|read-synthesis|source evidence|source-attributed|discovery-phase/u, filePath);
    assert.doesNotMatch(source, oldWorldSearchResiduePattern, filePath);
  }
});

test('V26 web-search raw PromptParts are Bitcode-native evidence support carriers', () => {
  for (const filePath of rawPromptPartPaths) {
    const source = readRepoFile(filePath);

    assert.match(source, /current_version: "V26"/u, filePath);
    assert.match(source, /Bitcode|read synthesis|read-synthesis|discovery-phase|source-attributed|source evidence|proof|AssetPack|external evidence|downstream/u, filePath);
    assert.doesNotMatch(source, oldWorldSearchResiduePattern, filePath);
  }
});

test('V26 web-search runtime PromptPart JavaScript mirrors TypeScript content', () => {
  for (const filePath of rawPromptPartPaths) {
    const tsSource = readRepoFile(filePath);
    const jsSource = readRepoFile(filePath.replace(/\.ts$/u, '.js'));
    const tsPromptPart = extractTsPromptPart(tsSource);

    assert.ok(tsPromptPart, filePath);
    assert.equal(extractJsPromptPart(jsSource, tsPromptPart.name), tsPromptPart.content, filePath);
  }
});
