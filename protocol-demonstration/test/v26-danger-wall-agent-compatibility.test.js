import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';

function readRepoFile(relativePath) {
  return readFileSync(new URL(`../../${relativePath}`, import.meta.url), 'utf8');
}

const packageReadme = readRepoFile('packages/generic-agents/danger-wall/README.md');
const packageManifest = JSON.parse(readRepoFile('packages/generic-agents/danger-wall/package.json'));
const indexSource = readRepoFile('packages/generic-agents/danger-wall/src/index.ts');

const packageSourceFilePaths = [
  'packages/generic-agents/danger-wall/src/index.ts'
];

const promptFilePaths = [
  'packages/generic-agents/danger-wall/src/prompts/agent-prompt-danger-wall.ts',
  'packages/generic-agents/danger-wall/src/prompts/system-prompt-dangerwall.ts',
  'packages/generic-agents/danger-wall/src/prompts/plan-prompt-dangerwall.ts',
  'packages/generic-agents/danger-wall/src/prompts/try-prompt-dangerwall.ts',
  'packages/generic-agents/danger-wall/src/prompts/refine-prompt-dangerwall.ts',
  'packages/generic-agents/danger-wall/src/prompts/retry-prompt-dangerwall.ts'
];

const rawPromptPartPaths = [
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_dangerwall_purpose_corestatement.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_dangerwall_capabilities_list.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_dangerwall_executionpattern_detailcontent.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_dangerwall_ptrrsteps_list.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_dangerwall_tools_list.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_dangerwall_integration_detailcontent.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_dangerwall_plan_analysis_approach.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_dangerwall_plan_analysis.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_dangerwall_plan_instructions.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_dangerwall_plan_strategy.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_dangerwall_try_directives.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_dangerwall_refine_assessment.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_dangerwall_refine_optimization.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_dangerwall_retry_errorhandling.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_dangerwall_retry_strategy.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_dangerwall_system_context.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_dangerwall_system_identity.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_dangerwall_system_instructions.ts',
  'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_dangerwall_system_role.ts'
];

const oldWorldDangerWallResiduePattern =
  /G[A]1|Anti-Western|antiWestern|NSFW|nsfw|jailbreak|Jailbreaking|Nmap|Masscan|OpenVAS|WAF|SIEM|SOAR|Suricata|Snort|STIX|TAXII|MISP|CVSS|CWE|OWASP|SOC 2|ISO 27001|PCI DSS|zero-trust|threat intelligence|intrusion|malware|comprehensive security|security validation|taskContext|task context|content safety|Content Safety|value alignment/u;

const exportNamePattern = /export const ([A-Za-z0-9_]+)(?:: PromptPart)?\s*=/m;

function listFilesRecursively(relativePath) {
  const directory = new URL(`../../${relativePath}`, import.meta.url);
  const entries = readdirSync(directory);
  return entries.flatMap((entry) => {
    const childRelativePath = `${relativePath}/${entry}`;
    const childUrl = new URL(`../../${childRelativePath}`, import.meta.url);
    const stat = statSync(childUrl);

    if (stat.isDirectory()) return listFilesRecursively(childRelativePath);
    return [childRelativePath];
  });
}

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

test('V26 danger-wall package has canonical Bitcode need risk-admission exports', () => {
  assert.equal(packageManifest.dependencies['@bitcode/agent-generics'], 'workspace:*');
  assert.equal(packageManifest.dependencies['@bitcode/prompts'], 'workspace:*');
  assert.equal(packageManifest.dependencies.zod, '^3.22.4');
  assert.match(indexSource, /bitcodeNeedRiskAdmissionAgent/u);
  assert.match(indexSource, /quickBitcodeNeedRiskAdmissionAgent/u);
  assert.match(indexSource, /dangerWallAgent = bitcodeNeedRiskAdmissionAgent/u);
  assert.match(indexSource, /DANGER_WALL_AGENT/u);
  assert.match(indexSource, /BITCODE_NEED_RISK_ADMISSION_AGENT/u);
  assert.match(indexSource, /checkLikelyExecutionFailure/u);
  assert.match(indexSource, /likelyExecutionFailure/u);
  assert.match(indexSource, /likelyExecutionFailureChecked/u);
  assert.doesNotMatch(indexSource, oldWorldDangerWallResiduePattern);
});

test('V26 danger-wall source and runtime mirrors are Bitcode risk-admission carriers', () => {
  for (const filePath of packageSourceFilePaths) {
    const source = readRepoFile(filePath);

    assert.match(source, /Bitcode|risk-admission|AssetPack|proof|delivery/u, filePath);
    assert.doesNotMatch(source, oldWorldDangerWallResiduePattern, filePath);
  }
});

test('V26 danger-wall package source is TypeScript-only under src', () => {
  assert.deepEqual(
    listFilesRecursively('packages/generic-agents/danger-wall/src').filter((filePath) => filePath.endsWith('.js')),
    []
  );
});

test('V26 danger-wall README states admitted support and compatibility semantics', () => {
  assert.match(packageReadme, /Bitcode Need Risk Admission Agent/u);
  assert.match(packageReadme, /bitcodeNeedRiskAdmissionAgent/u);
  assert.match(packageReadme, /not an autonomous security product/u);
  assert.match(packageReadme, /AssetPack/u);
  assert.match(packageReadme, /likely execution failure/u);
  assert.match(packageReadme, /delivery-mechanism mismatch/u);
  assert.match(packageReadme, /compatibility aliases/u);
  assert.doesNotMatch(packageReadme, oldWorldDangerWallResiduePattern);
});

test('V26 danger-wall prompt files carry V26 risk-admission metadata', () => {
  for (const filePath of promptFilePaths) {
    const source = readRepoFile(filePath);

    assert.match(source, /current_version: "V26"/u, filePath);
    assert.match(source, /Bitcode|risk-admission|AssetPack|proof|delivery/u, filePath);
    assert.doesNotMatch(source, oldWorldDangerWallResiduePattern, filePath);
  }
});

test('V26 danger-wall raw PromptParts are Bitcode-native compatibility carriers', () => {
  for (const filePath of rawPromptPartPaths) {
    const source = readRepoFile(filePath);

    assert.match(source, /current_version: "V26"/u, filePath);
    assert.match(source, /Bitcode|risk admission|risk-admission|need|AssetPack|proof|delivery|admission/u, filePath);
    assert.doesNotMatch(source, oldWorldDangerWallResiduePattern, filePath);
  }
});

test('V26 danger-wall runtime PromptPart JavaScript mirrors TypeScript content', () => {
  for (const filePath of rawPromptPartPaths) {
    const tsSource = readRepoFile(filePath);
    const jsSource = readRepoFile(filePath.replace(/\.ts$/u, '.js'));
    const tsPromptPart = extractTsPromptPart(tsSource);

    assert.ok(tsPromptPart, filePath);
    assert.equal(extractJsPromptPart(jsSource, tsPromptPart.name), tsPromptPart.content, filePath);
  }
});
