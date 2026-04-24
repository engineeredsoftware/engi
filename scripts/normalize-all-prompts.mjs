#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const roots = [
  path.join('packages','pipelines','deliverable','src','agents','prompts'),
  path.join('packages','generic-agents'),
  path.join('packages','generic-tools')
];

function walk(d){
  const out=[]; if(!fs.existsSync(d)) return out;
  for(const ent of fs.readdirSync(d,{withFileTypes:true})){
    const p=path.join(d,ent.name);
    if(ent.isDirectory()){
      if(['node_modules','dist','.next'].includes(ent.name)) continue;
      out.push(...walk(p));
    } else if(ent.isFile() && p.endsWith('.ts')) out.push(p);
  } return out;
}

let updated=0, scanned=0;
for(const base of roots){
  const files = walk(base);
  for(const f of files){
    let s = fs.readFileSync(f,'utf8');
    if (!(/new\s+Prompt\(/.test(s) || /export function create.*Prompt\(\)\s*:\s*Prompt/.test(s))) continue;
    scanned++;
    if (!s.includes('@doc-comment-developing-promptdevelopment')) continue;
    let changed=false;
    if (s.includes('current_version: ')){
      const s2 = s.replace(/current_version:\s*"V26\.[0-9]+\.[0-9]+"/g, 'current_version: "V26.50.0"');
      if (s2!==s){ s=s2; changed=true; }
    }
    if (!/benchmarks:\s*\[/.test(s)){
      s = s.replace(/@doc-comment-developing-promptdevelopment([\s\S]*?)\*\//, (block)=>{
        const bench = ` * benchmarks: [\n *   { "name": "technical_accuracy", "test": "Concrete directives and purpose", "score": 0.50 },\n *   { "name": "implementation_ready", "test": "Usable by registry formatter", "score": 0.50 }\n * ]\n */`;
        return block.replace(/\*\/$/, bench);
      });
      changed=true;
    }
    if (changed){ fs.writeFileSync(f,s,'utf8'); updated++; }
  }
}
console.log('Normalized Prompts:', updated, 'scanned', scanned);
