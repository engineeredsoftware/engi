import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

function readRepoFile(relativePath) {
  return readFileSync(new URL(`../../${relativePath}`, import.meta.url), 'utf8');
}

const packageReadme = readRepoFile('packages/generic-agents/web-researcher/README.md');
const packageManifest = JSON.parse(readRepoFile('packages/generic-agents/web-researcher/package.json'));
const indexSource = readRepoFile('packages/generic-agents/web-researcher/src/index.ts');

const packageSourceFilePaths = [
  'packages/generic-agents/web-researcher/src/index.ts',
  'packages/generic-agents/web-researcher/src/index.js',
  'packages/generic-agents/web-researcher/src/schemas.ts',
  'packages/generic-agents/web-researcher/src/schemas.js',
  'packages/generic-agents/web-researcher/src/__tests__/enhanced-web-researcher.test.ts',
  'packages/generic-agents/web-researcher/src/__tests__/enhanced-web-researcher.test.js',
  'packages/generic-agents/web-researcher/src/__tests__/research.test.ts',
  'packages/generic-agents/web-researcher/src/__tests__/research.test.js'
];

const promptFilePaths = [
  'packages/generic-agents/web-researcher/src/prompts/agent-prompt-web-researcher.ts',
  'packages/generic-agents/web-researcher/src/prompts/agent-prompt-web-researcher.js',
  'packages/generic-agents/web-researcher/src/prompts/system-prompt-web-researcher.ts',
  'packages/generic-agents/web-researcher/src/prompts/system-prompt-web-researcher.js',
  'packages/generic-agents/web-researcher/src/prompts/plan-prompt-web-researcher.ts',
  'packages/generic-agents/web-researcher/src/prompts/plan-prompt-web-researcher.js',
  'packages/generic-agents/web-researcher/src/prompts/try-prompt-web-researcher.ts',
  'packages/generic-agents/web-researcher/src/prompts/try-prompt-web-researcher.js',
  'packages/generic-agents/web-researcher/src/prompts/refine-prompt-web-researcher.ts',
  'packages/generic-agents/web-researcher/src/prompts/refine-prompt-web-researcher.js',
  'packages/generic-agents/web-researcher/src/prompts/retry-prompt-web-researcher.ts',
  'packages/generic-agents/web-researcher/src/prompts/retry-prompt-web-researcher.js'
];

const rawPromptPartPaths = [
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_webresearcher_purpose_corestatement.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_webresearcher_capabilities_list.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_webresearcher_executionpattern_detailcontent.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_webresearcher_ptrrsteps_list.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_webresearcher_tools_list.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_webresearcher_integration_detailcontent.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_webresearcher_plan_research_analysis.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_webresearcher_plan_investigation_strategy.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_webresearcher_try_directives_instructions.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_webresearcher_try_research_techniques.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_webresearcher_refine_quality_criteria.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_webresearcher_refine_information_enhancement.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_webresearcher_retry_failure_analysis.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_webresearcher_retry_recovery_strategy.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_webresearcher_system_context.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_webresearcher_system_identity.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_webresearcher_system_instructions.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_webresearcher_system_role.ts'
];

const oldWorldWebResearchResiduePattern =
  /G[A]1|Enterprise Web Data Extraction|Selenium|Puppeteer|Scrapy|BeautifulSoup|CAPTCHA|proxy rotation|Apache Airflow|Prometheus|Grafana|Revolutionary|task requirements|task context|taskType|automated web scraping|data extraction workflows|Production-grade web search framework/u;

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

test('V26 web-researcher package has canonical need-synthesis web research exports and dependencies', () => {
  assert.equal(packageManifest.dependencies['@bitcode/agent-generics'], 'workspace:*');
  assert.equal(packageManifest.dependencies['@bitcode/prompts'], 'workspace:*');
  assert.equal(packageManifest.dependencies['@bitcode/generic-tools-web-search'], 'workspace:*');
  assert.equal(packageManifest.dependencies.zod, '^3.22.4');
  assert.equal(packageManifest.dependencies['@bitcode/generic-tools-firecrawl'], undefined);
  assert.match(indexSource, /bitcodeNeedSynthesisWebResearcher/u);
  assert.match(indexSource, /bitcodeExternalEvidenceResearcher/u);
  assert.match(indexSource, /bitcodeExternalEvidenceResearcher = bitcodeNeedSynthesisWebResearcher/u);
  assert.match(indexSource, /webResearcherAgent = bitcodeNeedSynthesisWebResearcher/u);
  assert.match(indexSource, /WEB_RESEARCH_AGENT/u);
  assert.doesNotMatch(indexSource, oldWorldWebResearchResiduePattern);
});

test('V26 web-researcher package source and runtime mirrors are residue-free', () => {
  for (const filePath of packageSourceFilePaths) {
    const source = readRepoFile(filePath);

    assert.match(source, /need-synthesis|Need-Synthesis|BitcodeExternalEvidence|discovery-phase/u, filePath);
    assert.doesNotMatch(source, oldWorldWebResearchResiduePattern, filePath);
  }
});

test('V26 web-researcher README states discovery-phase need-synthesis support semantics', () => {
  assert.match(packageReadme, /Bitcode need-synthesis web research agent/u);
  assert.match(packageReadme, /discovery phase/u);
  assert.match(packageReadme, /bitcodeNeedSynthesisWebResearcher/u);
  assert.match(packageReadme, /not an autonomous web-scraping product/u);
  assert.match(packageReadme, /AssetPack/u);
  assert.match(packageReadme, /compatibility carriers/u);
  assert.doesNotMatch(packageReadme, oldWorldWebResearchResiduePattern);
});

test('V26 web-researcher prompt files carry V26 need-synthesis web research metadata', () => {
  for (const filePath of promptFilePaths) {
    const source = readRepoFile(filePath);

    assert.match(source, /current_version: "V26"/u, filePath);
    assert.match(source, /Bitcode need-synthesis|need-synthesis|discovery-phase/u, filePath);
    assert.doesNotMatch(source, oldWorldWebResearchResiduePattern, filePath);
  }
});

test('V26 web-researcher raw PromptParts are Bitcode-native compatibility carriers', () => {
  for (const filePath of rawPromptPartPaths) {
    const source = readRepoFile(filePath);

    assert.match(source, /current_version: "V26"/u, filePath);
    assert.match(source, /Bitcode|need synthesis|need-synthesis|discovery-phase|external evidence|source-attributed|AssetPack|proof|need/u, filePath);
    assert.doesNotMatch(source, oldWorldWebResearchResiduePattern, filePath);
  }
});

test('V26 web-researcher runtime PromptPart JavaScript mirrors TypeScript content', () => {
  for (const filePath of rawPromptPartPaths) {
    const tsSource = readRepoFile(filePath);
    const jsSource = readRepoFile(filePath.replace(/\.ts$/u, '.js'));
    const tsPromptPart = extractTsPromptPart(tsSource);

    assert.ok(tsPromptPart, filePath);
    assert.equal(extractJsPromptPart(jsSource, tsPromptPart.name), tsPromptPart.content, filePath);
  }
});
