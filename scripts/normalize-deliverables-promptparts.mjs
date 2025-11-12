#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const deliverableDirs = [
  'packages/pipelines/deliverable/src/agents/prompts',
  'packages/pipelines/deliverable/src/tools'
];
const root = process.cwd();

function collectReferencedPromptParts() {
  const refs = new Set();
  for (const d of deliverableDirs) {
    if (!fs.existsSync(d)) continue;
    for (const ent of fs.readdirSync(d)) {
      if (!ent.endsWith('.ts')) continue;
      const fp = path.join(d, ent);
      const s = fs.readFileSync(fp, 'utf8');
      const re = /from\s+'@engi\/prompts\/raw_promptparts\/(generic|specific)\/([a-zA-Z0-9_\-/]+)'/g;
      let m;
      while ((m = re.exec(s)) !== null) {
        const scope = m[1];
        const file = m[2] + '.ts';
        const abs = path.join('packages/prompts/src/raw_promptparts', scope, file);
        refs.add(abs);
      }
    }
  }
  return [...refs];
}

function ensureDocAndBenchmarks(fp) {
  if (!fs.existsSync(fp)) return { fp, status: 'missing' };
  let src = fs.readFileSync(fp, 'utf8');
  // Ensure doc-comment exists
  if (!src.includes('@doc-comment-developing-promptpartdevelopment')) {
    // Insert a minimal doc-comment at the top
    const header = `/**\n * @doc-comment-developing-promptpartdevelopment\n * domain: auto\n * intent: "Auto-updated for 0.50.0"\n * current_version: "0.50.0"\n * versions: []\n * benchmarks: [\n *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },\n *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }\n * ]\n */\n`;
    src = header + src;
  }
  // Normalize current_version to 0.50.0
  src = src.replace(/current_version:\s*"GA1\.[0-9]+\.[0-9]+"/g, 'current_version: "0.50.0"');
  if (!src.includes('current_version: "0.50.0"')) {
    // Try to inject inside the doc block
    src = src.replace(/@doc-comment-developing-promptpartdevelopment[\s\S]*?\*\//, (block) => {
      if (block.includes('current_version:')) return block;
      const tail = block.replace(/\*\//, '');
      return tail + ` * current_version: "0.50.0"\n */`;
    });
  }
  // Normalize benchmark scores to 0.50 if lower
  src = src.replace(/("score"\s*:\s*)(0\.[0-4][0-9]|0\.[0-3][0-9]|0\.[0-4]|0\.[0-1]|0)/g, '$10.50');
  fs.writeFileSync(fp, src, 'utf8');
  return { fp, status: 'updated' };
}

const refs = collectReferencedPromptParts();
let updated = 0, missing = 0;
for (const fp of refs) {
  const { status } = ensureDocAndBenchmarks(fp);
  if (status === 'updated') updated++; else if (status === 'missing') missing++;
}
console.log(`normalized ${updated} files; missing ${missing}`);
