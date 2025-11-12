#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const root = process.cwd();

function walk(dir, filter) {
  const out = [];
  (function _w(d){
    for (const ent of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, ent.name);
      if (ent.isDirectory()) {
        if (['node_modules', 'dist', '.next'].includes(ent.name)) continue;
        _w(p);
      } else if (ent.isFile() && filter(p)) {
        out.push(p);
      }
    }
  })(dir);
  return out;
}

function read(p){return fs.readFileSync(p,'utf8');}

// Validate PromptParts
const ppFiles = walk(path.join('packages','prompts','src','raw_promptparts'), p => p.endsWith('.ts') && path.basename(p) !== 'index.ts');
let ppMissing=0, ppBadPBV=0, ppBadBench=0, ppBadIntent=0;
for (const f of ppFiles) {
  const s = read(f);
  if (!s.includes('@doc-comment-developing-promptpartdevelopment')) { console.log('[PART/DOC]', f); ppMissing++; continue; }
  if (!s.includes('current_version: "0.50.0"')) { console.log('[PART/PBV]', f); ppBadPBV++; }
  if (!/benchmarks:\s*\[/.test(s)) { console.log('[PART/BENCH]', f); ppBadBench++; }
  if (/intent:\s*"Auto-(generated|updated)/.test(s)) { console.log('[PART/INTENT]', f); ppBadIntent++; }
}

// Validate Prompts (deliverables + generic agents/tools)
const promptGlobs = [
  path.join('packages','pipelines','deliverable','src','agents','prompts'),
  path.join('packages','generic-agents'),
  path.join('packages','generic-tools')
];
let prMissing=0, prBadPBV=0, prBadBench=0, scanned=0;
for (const base of promptGlobs) {
  if (!fs.existsSync(base)) continue;
  const files = walk(base, p => p.endsWith('.ts'));
  for (const f of files) {
    const s = read(f);
    if (!(/new\s+Prompt\(/.test(s) || /export function create.*Prompt\(\)\s*:\s*Prompt/.test(s))) continue;
    scanned++;
    if (!s.includes('@doc-comment-developing-promptdevelopment')) { console.log('[PROMPT/DOC]', f); prMissing++; continue; }
    if (!s.includes('current_version: "0.50.0"')) { console.log('[PROMPT/PBV]', f); prBadPBV++; }
    if (!/benchmarks:\s*\[/.test(s)) { console.log('[PROMPT/BENCH]', f); prBadBench++; }
  }
}

console.log('PromptPart: missing', ppMissing, 'pbv', ppBadPBV, 'bench', ppBadBench, 'intent', ppBadIntent);
console.log('Prompt: scanned', scanned, 'missing', prMissing, 'pbv', prBadPBV, 'bench', prBadBench);
if (ppMissing||ppBadPBV||ppBadBench||ppBadIntent||prMissing||prBadPBV||prBadBench) process.exit(1);
console.log('Doc-comment validation OK');
