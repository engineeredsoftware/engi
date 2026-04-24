#!/usr/bin/env bash
set -euo pipefail

# 1) Scaffolding
bash scripts/verify-prompt-scaffolding.sh

# 2) Ensure referenced PromptParts in deliverables have 0.50.0 and no fallback text
node - << 'NODE'
const fs=require('fs');const path=require('path');
const dirs=['packages/pipelines/asset-pack/src/agents/prompts','packages/pipelines/asset-pack/src/tools'];
const refs=new Set();
for(const d of dirs){if(!fs.existsSync(d)) continue;for(const f of fs.readdirSync(d)){if(!f.endsWith('.ts')) continue;const p=path.join(d,f);const s=fs.readFileSync(p,'utf8');const re=/from\s+'@bitcode\/prompts\/raw_promptparts\/(generic|specific)\/([a-zA-Z0-9_\-/]+)'/g;let m;while((m=re.exec(s))!==null){refs.add(path.join('packages/prompts/src/raw_promptparts',m[1],m[2]+'.ts'));}}}
let bad=0,not50=0;for(const fp of refs){const s=fs.readFileSync(fp,'utf8');if(s.includes('Provide concrete, domain‑appropriate content for this specific prompt segment')){console.error('[FALLBACK]',fp);bad++;}if(!s.includes('current_version: "0.50.0"')){console.error('[VERSION]',fp);not50++;}}
if(bad>0||not50>0){console.error(`Deliverables quality check failed: fallback=${bad} non-50.0=${not50}`);process.exit(1);} else {console.log('Deliverables quality OK');}
NODE

# 3) Reports
bash scripts/generate-prompts-report.sh >/dev/null 2>&1 || true
bash scripts/analyze-prompts-gaps.sh >/dev/null 2>&1 || true

# 4) Ensure deliverables prompts have @doc-comment-developing-promptdevelopment
node - << 'NODE'
const fs=require('fs');const path=require('path');
const d='packages/pipelines/asset-pack/src/agents/prompts';
let missing=0; if (fs.existsSync(d)){
  for(const f of fs.readdirSync(d)){if(!f.endsWith('.ts')) continue;const p=path.join(d,f);const s=fs.readFileSync(p,'utf8');if(!s.includes('@doc-comment-developing-promptdevelopment')){console.error('[PROMPT_DOC]',p);missing++;}}
}
if(missing>0){console.error(`Deliverables prompt doc coverage failed: missing=${missing}`);process.exit(1);} else {console.log('Deliverables prompt doc coverage OK');}
NODE

echo "All deliverables prompt quality checks passed."
