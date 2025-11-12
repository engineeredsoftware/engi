#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const root = path.resolve('packages/prompts/src/raw_promptparts');
for (const scope of ['generic','specific']) {
  const dir = path.join(root, scope);
  const files = fs.readdirSync(dir)
    .filter(f => f.endsWith('.ts') && f !== 'index.ts')
    .sort();
  const lines = files.map(f => `export * from "./${f.replace(/\.ts$/, '')}";`).join('\n') + '\n';
  fs.writeFileSync(path.join(dir, 'index.ts'), lines, 'utf8');
  console.log(`Wrote ${scope}/index.ts with ${files.length} exports`);
}
