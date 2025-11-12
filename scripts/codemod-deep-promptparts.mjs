#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const repoRoot = path.resolve(__dirname, '..');
const promptsSrc = path.resolve(repoRoot, 'packages', 'prompts', 'src');
const rawDir = path.join(promptsSrc, 'raw_promptparts');

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(p));
    else if (entry.isFile() && entry.name.endsWith('.ts')) out.push(p);
  }
  return out;
}

// Build mapping of export const NAME -> deep import path
const mapping = new Map();
for (const scope of ['generic', 'specific']) {
  const scopeDir = path.join(rawDir, scope);
  if (!fs.existsSync(scopeDir)) continue;
  for (const file of fs.readdirSync(scopeDir)) {
    const fp = path.join(scopeDir, file);
    if (!fp.endsWith('.ts')) continue;
    const content = fs.readFileSync(fp, 'utf8');
    // Match export const NAME
    const re = /export\s+const\s+([A-Za-z0-9_]+)\s*:/g;
    let m;
    while ((m = re.exec(content)) !== null) {
      const name = m[1];
      const pkgPath = `@engi/prompts/raw_promptparts/${scope}/${path.basename(file, '.ts')}`;
      mapping.set(name, pkgPath);
    }
  }
}

// Whitelist of root exports to keep importing from '@engi/prompts'
const keepAtRoot = new Set([
  'Prompt', 'createPrompt', 'PromptFormatter', 'createPromptPart', 'PromptPart',
  'hierarchicalFormatter',
  'DocPromptPlugin', 'docPromptPlugin', 'DocPromptPartPlugin', 'docPromptPartPlugin',
  'PromptDevelopingIntelligence','PromptDevelopingType','PromptDevelopingOptimizations',
  'DevelopingPromptPartDocComment','PromptPartDevelopingCategory','DevelopingPriorityLevel',
  'DevelopingUsageFrequency','PromptPartDevelopingPerformance',
  'DevelopingVersionEntry','DevelopingBenchmarkResults','DevelopingBenchmarkScore',
  'DevelopingBenchmarkDefinition','DevelopingPromptDocComment'
]);

// Find all TS/TSX files importing from '@engi/prompts'
function listFilesWithImports(rootDir) {
  const all = [];
  const stack = [rootDir];
  while (stack.length) {
    const d = stack.pop();
    for (const ent of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, ent.name);
      if (ent.isDirectory()) {
        // skip build/node_modules
        if (ent.name === 'node_modules' || ent.name === 'dist' || ent.name === '.next') continue;
        stack.push(p);
      } else if (ent.isFile() && (p.endsWith('.ts') || p.endsWith('.tsx'))) {
        const txt = fs.readFileSync(p, 'utf8');
        if (txt.includes("from '@engi/prompts'")) all.push(p);
      }
    }
  }
  return all;
}

const workspaceRoot = path.resolve(__dirname, '..');
const files = listFilesWithImports(workspaceRoot);

let changed = 0;
for (const file of files) {
  let src = fs.readFileSync(file, 'utf8');
  let updated = src;

  // Find all import lines from '@engi/prompts'
  const importRe = /import\s+\{([^}]+)\}\s+from\s+'@engi\/prompts';/g;
  const imports = [];
  let mi;
  while ((mi = importRe.exec(src)) !== null) {
    imports.push({ start: mi.index, end: importRe.lastIndex, namesStr: mi[1] });
  }
  if (imports.length === 0) continue;

  // For each import, split names
  const additions = []; // {path, names[]}
  function addAddition(pkgPath, name) {
    const existing = additions.find(a => a.path === pkgPath);
    if (existing) existing.names.push(name);
    else additions.push({ path: pkgPath, names: [name] });
  }

  const rootKeepsPerImport = []; // array parallel to imports: names[] to keep at root

  for (const imp of imports) {
    const names = imp.namesStr.split(',').map(s => s.trim()).filter(Boolean);
    const keepNames = [];
    for (const name of names) {
      if (keepAtRoot.has(name)) {
        keepNames.push(name);
      } else if (mapping.has(name)) {
        addAddition(mapping.get(name), name);
      } else {
        // name not in mapping and not a known root keep; keep at root to avoid breakage
        keepNames.push(name);
      }
    }
    rootKeepsPerImport.push(keepNames);
  }

  // Build new source by replacing each import with kept subset
  let offset = 0;
  for (let i = 0; i < imports.length; i++) {
    const imp = imports[i];
    const keepNames = rootKeepsPerImport[i];
    const before = updated.slice(0, imp.start + offset);
    const after = updated.slice(imp.end + offset);
    let replacement = '';
    if (keepNames.length > 0) {
      replacement = `import { ${keepNames.join(', ')} } from '@engi/prompts';`;
    } // else: drop the line entirely
    updated = before + replacement + after;
    offset += replacement.length - (imp.end - imp.start);
  }

  // Append deep imports at the top (after any shebang/comment block)
  if (additions.length > 0) {
    const deepLines = additions
      .map(a => `import { ${a.names.join(', ')} } from '${a.path}';`) // one file may export multiple? Usually one
      .join('\n');

    // Insert after first import block
    const firstImportIdx = updated.indexOf('import ');
    if (firstImportIdx >= 0) {
      // find end of run of imports
      const lines = updated.split('\n');
      let insertLine = 0;
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('import ')) insertLine = i + 1; else if (lines[i].trim() !== '' && !lines[i].startsWith('import ')) break;
      }
      lines.splice(insertLine, 0, deepLines);
      updated = lines.join('\n');
    } else {
      updated = deepLines + '\n' + updated;
    }
  }

  if (updated !== src) {
    fs.writeFileSync(file, updated, 'utf8');
    changed++;
  }
}

console.log(`codemod complete: updated ${changed} files`);
