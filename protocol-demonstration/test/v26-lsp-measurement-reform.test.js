import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';

const reformSpec = readFileSync(new URL('../V26_LSP_MEASUREMENT_REFORM.md', import.meta.url), 'utf8');
const canonicalSpec = readFileSync(new URL('../../BITCODE_SPEC_V26.md', import.meta.url), 'utf8');
const bitcodeDemoSource = readFileSync(new URL('../src/bitcode-demo.js', import.meta.url), 'utf8');
const needMeasurementSource = readFileSync(new URL('../src/canonical/need-measurement.js', import.meta.url), 'utf8');
const provenGeneratorSource = readFileSync(new URL('../src/canonical/proven-generator.js', import.meta.url), 'utf8');
const lspIndexSource = readFileSync(new URL('../../packages/lsp/src/index.ts', import.meta.url), 'utf8');
const lspQueryIndexSource = readFileSync(new URL('../../packages/generic-tools/lsp-query/src/index.ts', import.meta.url), 'utf8');
const lspPurposeSource = readFileSync(new URL('../../packages/generic-tools/lsp-query/src/prompts/lsp-purpose-composition.ts', import.meta.url), 'utf8');
const lspContextSource = readFileSync(new URL('../../packages/generic-tools/lsp-query/src/prompts/lsp-context-awareness-composition.ts', import.meta.url), 'utf8');
const lspNavigationSource = readFileSync(new URL('../../packages/generic-tools/lsp-query/src/prompts/lsp-navigation-capabilities-composition.ts', import.meta.url), 'utf8');
const lspLocationSource = readFileSync(new URL('../../packages/generic-tools/lsp-query/src/prompts/lsp-location-output-composition.ts', import.meta.url), 'utf8');
const lspPositionSource = readFileSync(new URL('../../packages/generic-tools/lsp-query/src/prompts/lsp-position-parameters-composition.ts', import.meta.url), 'utf8');
const lspDocCodePromptSource = readFileSync(new URL('../../packages/generic-tools/lsp-query/src/prompts/LspQueryDocCodeToolPrompt.ts', import.meta.url), 'utf8');
const lspPurposePromptPartSource = readFileSync(new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_lsp_purpose_sentence.ts', import.meta.url), 'utf8');
const lspContextHeaderPromptPartSource = readFileSync(new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_tool_context_awareness_lsp_header.ts', import.meta.url), 'utf8');
const lspContextFooterPromptPartSource = readFileSync(new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_tool_context_awareness_lsp_footer.ts', import.meta.url), 'utf8');
const lspCapabilityHeaderPromptPartSource = readFileSync(new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_tool_capabilities_lsp_header.ts', import.meta.url), 'utf8');
const lspCapabilityFooterPromptPartSource = readFileSync(new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_tool_capabilities_lsp_footer.ts', import.meta.url), 'utf8');
const lspLocationPromptPartSource = readFileSync(new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_lsp_location_output_sentence.ts', import.meta.url), 'utf8');
const lspPositionPromptPartSource = readFileSync(new URL('../../packages/prompts/src/raw_promptparts/specific/promptpart_specific_lsp_position_parameters_list.ts', import.meta.url), 'utf8');
const rawPromptpartsDirectory = new URL('../../packages/prompts/src/raw_promptparts/specific/', import.meta.url);
const lspRawPromptpartSources = readdirSync(rawPromptpartsDirectory)
  .filter((fileName) =>
    fileName.endsWith('.ts') &&
    /initializelsp|_lsp_|lspquery|tool_lsp|capabilities_lsp|context_awareness_lsp/u.test(fileName)
  )
  .map((fileName) => ({
    fileName,
    source: readFileSync(new URL(fileName, rawPromptpartsDirectory), 'utf8')
  }));

test('V26 specifies LSP as static Need and AssetPack measurement infrastructure', () => {
  assert.match(reformSpec, /bitcode\.lsp\.measure-need-static\.v26/);
  assert.match(reformSpec, /NeedDescriptor\.staticMeasurements/);
  assert.match(reformSpec, /AssetPack fit/);
  assert.match(reformSpec, /Deprecation flags are acceptable in fifth-gate/);
  assert.match(canonicalSpec, /retained LSP infrastructure is admitted as static Need\/AssetPack measurement evidence/);
  assert.match(canonicalSpec, /bitcode\.lsp\.measure-need-static\.v26/);
});

test('Need measurement runtime records LSP evidence and receipt provenance', () => {
  assert.match(bitcodeDemoSource, /receiptKind: 'lsp-need-static-measurement'/);
  assert.match(bitcodeDemoSource, /stageId: 'lsp\.semantic-measurement\.v26'/);
  assert.match(bitcodeDemoSource, /toolId: 'bitcode\.lsp\.measure-need-static\.v26'/);
  assert.match(bitcodeDemoSource, /measuredFields: \['need\.touchedPaths', 'need\.extractedSymbols', 'need\.configKeys', 'need\.stackHints'\]/);
  assert.match(needMeasurementSource, /measurementTrace\(\s*'static',\s*'bitcode\.lsp\.measure-need-static\.v26'/s);
  assert.match(needMeasurementSource, /lspMeasurement: repoCodeAnalysis\.lspMeasurement/);
  assert.match(needMeasurementSource, /staticExecuted: \['canonicalBenchmarkOutputs', 'buildRepoStaticCodeAnalysis', 'bitcode\.lsp\.measure-need-static\.v26'\]/);
});

test('LSP package and tool prompt surfaces teach measurement, not generic navigation product semantics', () => {
  const activeSources = [
    lspIndexSource,
    lspQueryIndexSource,
    lspPurposeSource,
    lspContextSource,
    lspNavigationSource,
    lspLocationSource,
    lspPositionSource,
    lspDocCodePromptSource,
    lspPurposePromptPartSource,
    lspContextHeaderPromptPartSource,
    lspContextFooterPromptPartSource,
    lspCapabilityHeaderPromptPartSource,
    lspCapabilityFooterPromptPartSource,
    lspLocationPromptPartSource,
    lspPositionPromptPartSource
  ];

  for (const source of activeSources) {
    assert.doesNotMatch(source, /intent: "\(fill intent\)"/);
    assert.doesNotMatch(source, /current_version: "G[A]1/u);
  }

  assert.match(lspIndexSource, /Bitcode static measurement/);
  assert.match(lspIndexSource, /Need\/AssetPack evidence/);
  assert.match(lspQueryIndexSource, /Need measurement/);
  assert.match(lspPurposePromptPartSource, /Language Server Protocol static measurement for Bitcode Need and AssetPack evidence/);
  assert.match(lspLocationPromptPartSource, /Need measurement, AssetPack fit, and proof replay/);
  assert.doesNotMatch(lspQueryIndexSource, /Intelligence Suite/);
  assert.doesNotMatch(lspContextFooterPromptPartSource, /intelligent code operations/);
  assert.doesNotMatch(lspCapabilityFooterPromptPartSource, /accelerate development workflows/);
});

test('all LSP raw PromptParts are Bitcode measurement promptparts instead of generic old-world intelligence promptparts', () => {
  assert.ok(lspRawPromptpartSources.length > 40);

  for (const { fileName, source } of lspRawPromptpartSources) {
    assert.match(source, /Bitcode/, fileName);
    assert.doesNotMatch(source, /current_version: "G[A]1/u, fileName);
    assert.doesNotMatch(source, /intent: "\(fill intent\)"/u, fileName);
    assert.doesNotMatch(
      source,
      /code intelligence|code navigation|development workflows|Intelligence Suite|guaranteed success|navigation and analysis operations/u,
      fileName
    );
    assert.doesNotMatch(
      source,
      /intent: "(Define|LSP|Tool|Parameter|Guidance|Integration|Complete|Concise|Header|Footer|Purpose sentence)/u,
      fileName
    );
  }
});

test('generated proof sources include LSP measurement reform witnesses', () => {
  assert.match(provenGeneratorSource, /lsp-measurement-prompt-and-proof-boundary/);
  assert.match(provenGeneratorSource, /lsp-measure-need-boundary/);
  assert.match(provenGeneratorSource, /protocol-demonstration\/V26_LSP_MEASUREMENT_REFORM\.md/);
});
