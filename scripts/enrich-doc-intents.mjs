#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

function walk(dir, filter) {
  const out = [];
  (function _w(d){
    for (const ent of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, ent.name);
      if (ent.isDirectory()) {
        if (['node_modules','dist','.next'].includes(ent.name)) continue;
        _w(p);
      } else if (ent.isFile() && filter(p)) out.push(p);
    }
  })(dir);
  return out;
}

function titleize(s){
  return s.replace(/_/g,' ').replace(/\b([a-z])/g, m=>m.toUpperCase());
}

function inferIntentFromFilename(f){
  const base = path.basename(f, '.ts');
  const parts = base.split('promptpart_').pop()?.split('_') || [];
  // example: specific_agent_assetpackvalidationreadytofinish_ptrrplan_purpose
  // heuristic build
  const scope = parts[0]; // generic|specific
  const domain = parts[1]; // agent|tool|formatting|...
  const rest = parts.slice(2).join(' ');
  return `${titleize(domain||'unit')} semantic unit: ${titleize(rest)}`.trim();
}

const dir = path.join('packages','prompts','src','raw_promptparts');
const files = walk(dir, p=>p.endsWith('.ts'));
let updated=0;
for(const f of files){
  let s = fs.readFileSync(f,'utf8');
  if (!s.includes('@doc-comment-developing-promptpartdevelopment')) continue;
  if (/intent:\s*"Auto-(generated|updated)/.test(s)){
    const intent = inferIntentFromFilename(f).replace(/"/g,'\"');
    s = s.replace(/intent:\s*"[^"]+"/, `intent: "${intent}"`);
    if (!s.includes('current_version: "0.50.0"')){
      s = s.replace(/current_version:\s*"[^"]+"/, 'current_version: "0.50.0"');
    }
    fs.writeFileSync(f,s,'utf8');
    updated++;
  }
}
console.log('Enriched intents for', updated, 'PromptParts');
