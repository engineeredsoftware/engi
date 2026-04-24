#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const dir = path.join('packages','prompts','src','raw_promptparts');

function walk(d){
  const out=[]; for(const ent of fs.readdirSync(d,{withFileTypes:true})){
    const p=path.join(d,ent.name);
    if(ent.isDirectory()) out.push(...walk(p));
    else if(ent.isFile() && p.endsWith('.ts') && path.basename(p)!=='index.ts') out.push(p);
  } return out;
}

const files = walk(dir);
let updated=0;
for(const f of files){
  let s = fs.readFileSync(f,'utf8');
  if (!s.includes('@doc-comment-developing-promptpartdevelopment')) continue;
  // Normalize PBV
  if (s.includes('current_version: ')) {
    s = s.replace(/current_version:\s*"V26\.[0-9]+\.[0-9]+"/g, 'current_version: "V26.50.0"');
  } else {
    s = s.replace(/@doc-comment-developing-promptpartdevelopment([\s\S]*?)\*\//, (block)=>{
      const withoutEnd = block.replace(/\*\/$/,'');
      return withoutEnd + `\n * current_version: "V26.50.0"\n */`;
    });
  }
  // Ensure benchmarks
  if (!/benchmarks:\s*\[/.test(s)){
    s = s.replace(/@doc-comment-developing-promptpartdevelopment([\s\S]*?)\*\//, (block)=>{
      const bench = ` * benchmarks: [\n *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },\n *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }\n * ]\n */`;
      return block.replace(/\*\/$/, bench);
    });
  }
  fs.writeFileSync(f,s,'utf8');
  updated++;
}
console.log('Normalized PromptParts:', updated);
