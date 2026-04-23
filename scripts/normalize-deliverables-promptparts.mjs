#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const repoRoot = process.cwd();
const deliverableDirs = [
  'packages/pipelines/deliverable/src/agents/prompts',
  'packages/pipelines/deliverable/src/tools'
].map((relativePath) => path.join(repoRoot, relativePath));
const deliverablePromptpartsDir = path.join(repoRoot, 'packages/prompts/src/raw_promptparts/specific');
const rawPromptpartsRoot = path.join(repoRoot, 'packages/prompts/src/raw_promptparts');

const substepSemantics = new Map([
  [
    'reason',
    'ground the step in the expressed Bitcode need, current execution state, written-asset target, proof obligations, and delivery-wrapper limits before selecting the next action'
  ],
  [
    'prepare_concise_context',
    'extract only need-relevant repository, attachment, execution, and proof context required to synthesize or validate the written asset; exclude noise that does not affect asset-pack acceptance'
  ],
  [
    'chunk_then_sum',
    'chunk large inputs by need, file, proof, and delivery-wrapper concern; summarize each chunk as written-asset constraints, risks, and acceptance evidence for asset-pack synthesis'
  ],
  [
    'tools_execution',
    'invoke only tools required to inspect, change, validate, or package the written asset; preserve parameters and results for Bitcode execution records and proof reread'
  ],
  [
    'structured_output',
    'return structured output with need satisfaction, writtenAssetType, writtenAssets, assetPack evidence, validation status, and deliveryMechanism wrapper fields when shipping is needed'
  ],
  [
    'stitch_until_complete',
    'combine partial findings, diffs, validations, and shipping-wrapper details into one coherent asset-pack result that can be reread from execution history'
  ],
  [
    'judge',
    'evaluate whether the output satisfies the Bitcode need, preserves written-asset integrity, separates delivery wrappers, and records enough proof evidence for acceptance'
  ]
]);

const substepIntentSemantics = new Map([
  [
    'reason',
    'Bitcode need-grounding substep for written-asset / asset-pack execution'
  ],
  [
    'prepare_concise_context',
    'Bitcode context-selection substep for need-relevant written-asset evidence'
  ],
  [
    'chunk_then_sum',
    'Bitcode chunking substep for asset-pack constraints, risks, and proof evidence'
  ],
  [
    'tools_execution',
    'Bitcode tool-execution substep for written-asset inspection, change, validation, and proof capture'
  ],
  [
    'structured_output',
    'Bitcode structured-output substep for need satisfaction, writtenAssets, assetPack, and deliveryMechanism fields'
  ],
  [
    'stitch_until_complete',
    'Bitcode stitching substep for coherent asset-pack result and execution-history reread'
  ],
  [
    'judge',
    'Bitcode judgment substep for need satisfaction, written-asset integrity, delivery-wrapper separation, and proof evidence'
  ]
]);

function collectReferencedPromptParts() {
  const refs = new Set();
  for (const d of deliverableDirs) {
    if (!fs.existsSync(d)) continue;
    for (const ent of fs.readdirSync(d)) {
      if (!ent.endsWith('.ts')) continue;
      const fp = path.join(d, ent);
      const s = fs.readFileSync(fp, 'utf8');
      const re = /from\s+'@bitcode\/prompts\/raw_promptparts\/(generic|specific)\/([a-zA-Z0-9_\-/]+)'/g;
      let m;
      while ((m = re.exec(s)) !== null) {
        const scope = m[1];
        const file = m[2] + '.ts';
        const abs = path.join(repoRoot, 'packages/prompts/src/raw_promptparts', scope, file);
        refs.add(abs);
      }
    }
  }
  return [...refs];
}

function ensureDocAndBenchmarks(fp) {
  if (!fs.existsSync(fp)) return { fp, status: 'missing' };
  let src = fs.readFileSync(fp, 'utf8');
  const original = src;
  // Ensure doc-comment exists
  if (!src.includes('@doc-comment-developing-promptpartdevelopment')) {
    // Insert a minimal doc-comment at the top
    const header = `/**\n * @doc-comment-developing-promptpartdevelopment\n * domain: auto\n * intent: "Auto-updated for 0.50.0"\n * current_version: "0.50.0"\n * versions: []\n * benchmarks: [\n *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },\n *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }\n * ]\n */\n`;
    src = header + src;
  }
  // Normalize missing current_version metadata without corrupting existing semantic versions.
  if (!src.includes('current_version:')) {
    // Try to inject inside the doc block
    src = src.replace(/@doc-comment-developing-promptpartdevelopment[\s\S]*?\*\//, (block) => {
      if (block.includes('current_version:')) return block;
      const tail = block.replace(/\*\//, '');
      return tail + ` * current_version: "0.50.0"\n */`;
    });
  }
  src = repairMalformedBenchmarkScores(src);
  if (src === original) return { fp, status: 'unchanged' };
  fs.writeFileSync(fp, src, 'utf8');
  return { fp, status: 'updated' };
}

function repairMalformedBenchmarkScores(src) {
  // Earlier non-idempotent passes produced invalid decimal fragments such as 0.50.95.
  return src
    .replace(/("score"\s*:\s*)0\.50\.(\d+)/g, (_match, prefix, scoreDigits) => `${prefix}0.${scoreDigits}`)
    .replace(/("score"\s*:\s*)0\.(\d+)\.\d+(?=\s*[},])/g, (_match, prefix, scoreDigits) => `${prefix}0.${scoreDigits}`);
}

function collectRawPromptpartGeneratedFiles(dir = rawPromptpartsRoot) {
  if (!fs.existsSync(dir)) return [];
  const files = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const fp = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      files.push(...collectRawPromptpartGeneratedFiles(fp));
      continue;
    }
    if (ent.isFile() && /\.(?:d\.)?ts$/u.test(ent.name)) files.push(fp);
  }
  return files;
}

function repairRawPromptpartGeneratedFiles() {
  let updated = 0;
  for (const fp of collectRawPromptpartGeneratedFiles()) {
    const src = fs.readFileSync(fp, 'utf8');
    const next = repairMalformedBenchmarkScores(src);
    if (next === src) continue;
    fs.writeFileSync(fp, next, 'utf8');
    updated++;
  }
  return updated;
}

function isDeliverableCompatibilityPromptpartFile(filename) {
  return /^promptpart_specific_(?:agent_deliverable|phase_deliverable|pipeline_deliverable|tool_.*deliverable).*?(?:\.d)?\.ts$/u.test(filename);
}

function compatibilityLabelForPromptpartFile(filename) {
  return filename
    .replace(/^promptpart_specific_/u, '')
    .replace(/(?:\.d)?\.ts$/u, '')
    .replace(/_/gu, ' ');
}

function deliverableMetadataIntent(filename) {
  const label = compatibilityLabelForPromptpartFile(filename);
  const lower = filename.toLowerCase();

  if (lower.includes('comprehendtask')) {
    return `Bitcode retained comprehend-task compatibility PromptPart for canonical comprehend-need asset-pack synthesis: ${label}`;
  }
  if (lower.includes('comprehendneed')) {
    return `Bitcode canonical comprehend-need PromptPart for need-first written-asset / asset-pack synthesis: ${label}`;
  }
  if (lower.startsWith('promptpart_specific_tool_')) {
    return `Bitcode retained deliverable-compatibility tool PromptPart for need-first asset-pack setup and written-asset evidence: ${label}`;
  }
  if (lower.startsWith('promptpart_specific_phase_')) {
    return `Bitcode retained deliverable-compatibility phase PromptPart for need-first asset-pack execution: ${label}`;
  }
  if (lower.startsWith('promptpart_specific_pipeline_')) {
    return `Bitcode retained deliverable-compatibility pipeline PromptPart for need-first asset-pack execution and delivery-wrapper separation: ${label}`;
  }
  if (lower.includes('shipping')) {
    return `Bitcode retained deliverable-compatibility PromptPart for delivery-wrapper separation over validated written assets: ${label}`;
  }
  if (lower.includes('validation')) {
    return `Bitcode retained deliverable-compatibility PromptPart for need satisfaction, written-asset validation, and proof evidence: ${label}`;
  }
  if (lower.includes('implementation') || lower.includes('implexecute') || lower.includes('impl')) {
    return `Bitcode retained deliverable-compatibility PromptPart for written-asset synthesis from asset-pack execution: ${label}`;
  }
  if (lower.includes('discovery') || lower.includes('disc')) {
    return `Bitcode retained deliverable-compatibility PromptPart for need discovery and asset-pack planning: ${label}`;
  }
  if (lower.includes('setup')) {
    return `Bitcode retained deliverable-compatibility PromptPart for need-first asset-pack setup: ${label}`;
  }

  return `Bitcode retained deliverable-compatibility PromptPart for need-first written-asset / asset-pack execution: ${label}`;
}

function normalizeDeliverablePromptpartDocComments() {
  if (!fs.existsSync(deliverablePromptpartsDir)) return 0;
  let updated = 0;
  for (const ent of fs.readdirSync(deliverablePromptpartsDir)) {
    if (!isDeliverableCompatibilityPromptpartFile(ent)) continue;
    if (ent.includes('_substep_')) continue;

    const fp = path.join(deliverablePromptpartsDir, ent);
    const src = fs.readFileSync(fp, 'utf8');
    const nextIntent = `intent: "${deliverableMetadataIntent(ent)}"`;
    const next = src
      .replace(/intent:\s*"[^"]*"/gu, nextIntent)
      .replace(/current_version:\s*"[^"]*"/gu, 'current_version: "0.50.0"');

    if (next === src) continue;
    fs.writeFileSync(fp, next, 'utf8');
    updated++;
  }
  return updated;
}

function normalizeSubstepPromptparts() {
  if (!fs.existsSync(deliverablePromptpartsDir)) return 0;
  let updated = 0;
  for (const ent of fs.readdirSync(deliverablePromptpartsDir)) {
    if (!/^promptpart_specific_agent_deliverable.*_substep_.*\.ts$/u.test(ent)) continue;
    const fp = path.join(deliverablePromptpartsDir, ent);
    const src = fs.readFileSync(fp, 'utf8');
    const substep = [...substepSemantics.keys()].find((key) => ent.includes(`_substep_${key}.ts`));
    if (!substep) continue;
    const match = src.match(/export const ([A-Z0-9_]+): PromptPart\s*=\s*\n\s*(['"])([\s\S]*?)\2 as PromptPart;/u);
    if (!match) continue;
    const [, exportName, quote] = match;
    const compatibilityLabel = ent
      .replace(/^promptpart_specific_agent_/u, '')
      .replace(/\.ts$/u, '')
      .replace(/_/gu, ' ');
    const nextPrompt = `${compatibilityLabel}: ${substepSemantics.get(substep)}.`;
    const nextAssignment = `export const ${exportName}: PromptPart = \n  ${quote}${nextPrompt}${quote} as PromptPart;`;
    const nextIntent = `intent: "${substepIntentSemantics.get(substep)}: ${compatibilityLabel}"`;
    const next = src
      .replace(/intent:\s*"[^"]*"/gu, nextIntent)
      .replace(/current_version:\s*"[^"]*"/gu, 'current_version: "0.50.0"')
      .replace(match[0], nextAssignment);
    if (next === src) continue;
    fs.writeFileSync(fp, next, 'utf8');
    updated++;
  }
  return updated;
}

function syncSubstepRuntimePromptparts() {
  if (!fs.existsSync(deliverablePromptpartsDir)) return 0;
  let updated = 0;

  for (const ent of fs.readdirSync(deliverablePromptpartsDir)) {
    if (!/^promptpart_specific_agent_deliverable.*_substep_.*\.ts$/u.test(ent)) continue;
    const fp = path.join(deliverablePromptpartsDir, ent);
    const src = fs.readFileSync(fp, 'utf8');
    const match = src.match(/export const ([A-Z0-9_]+): PromptPart\s*=\s*\n\s*(['"])([\s\S]*?)\2 as PromptPart;/u);
    if (!match) continue;

    const [, exportName, _quote, promptText] = match;
    const runtimePath = fp.replace(/\.ts$/u, '.js');
    const runtimeSource = [
      '"use strict";',
      'Object.defineProperty(exports, "__esModule", { value: true });',
      `exports.${exportName} = void 0;`,
      `exports.${exportName} = ${JSON.stringify(promptText)};`,
      '',
    ].join('\n');

    const current = fs.existsSync(runtimePath) ? fs.readFileSync(runtimePath, 'utf8') : '';
    if (current === runtimeSource) continue;
    fs.writeFileSync(runtimePath, runtimeSource, 'utf8');
    updated++;
  }

  return updated;
}

const refs = collectReferencedPromptParts();
let updated = 0, missing = 0;
for (const fp of refs) {
  const { status } = ensureDocAndBenchmarks(fp);
  if (status === 'updated') updated++; else if (status === 'missing') missing++;
}
const repairedGeneratedFiles = repairRawPromptpartGeneratedFiles();
const deliverableMetadataUpdated = normalizeDeliverablePromptpartDocComments();
const substepUpdated = normalizeSubstepPromptparts();
const substepRuntimeUpdated = syncSubstepRuntimePromptparts();
console.log(`normalized ${updated} files; missing ${missing}; repaired ${repairedGeneratedFiles} generated raw PromptPart files; normalized ${deliverableMetadataUpdated} deliverable metadata PromptParts; normalized ${substepUpdated} deliverable substep PromptParts; synced ${substepRuntimeUpdated} deliverable runtime PromptParts`);
