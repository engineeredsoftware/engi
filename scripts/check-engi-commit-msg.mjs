#!/usr/bin/env node

import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

function main() {
  const commitMessagePath = process.argv[2];
  if (!commitMessagePath) {
    throw new Error('A commit message file path is required.');
  }

  const commitTitle = readFileSync(commitMessagePath, 'utf8').split('\n')[0].trim();
  execFileSync(
    process.execPath,
    [
      path.join(repoRoot, 'scripts/run-engi-spec-quality.mjs'),
      '--mode',
      'strict-from-title',
      '--commit-title',
      commitTitle
    ],
    {
      cwd: repoRoot,
      stdio: 'inherit'
    }
  );
}

try {
  main();
} catch (error) {
  const detail = error instanceof Error ? error.message : String(error);
  process.stderr.write(`${detail}\n`);
  process.exitCode = 1;
}
