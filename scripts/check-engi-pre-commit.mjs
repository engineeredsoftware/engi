#!/usr/bin/env node

import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const SPEC_RELEVANT_PATHS = [
  /^ENGI_SPEC(?:IFYING)?(?:_.*)?\.md$/u,
  /^ENGI_SPEC\.txt$/u,
  /^engi-demo\/src\/canonical\/v21-specifying\.js$/u,
  /^scripts\/(?:check-engi-|prepare-engi-spec-family-promotion|promote-engi-canon|run-engi-spec-quality|setup-engi-git-hooks)/u,
  /^\.github\/workflows\/engi-canon-quality\.yml$/u
];

function main() {
  const staged = execFileSync('git', ['diff', '--cached', '--name-only', '--diff-filter=ACMR'], {
    cwd: repoRoot,
    encoding: 'utf8'
  })
    .split('\n')
    .map((entry) => entry.trim())
    .filter(Boolean);

  const relevant = staged.filter((entry) => SPEC_RELEVANT_PATHS.some((pattern) => pattern.test(entry)));
  if (relevant.length === 0) {
    process.stdout.write('ENGI pre-commit: no spec-quality-sensitive files staged; skipping.\n');
    return;
  }

  process.stdout.write(`ENGI pre-commit: running host-agnostic spec basics for ${relevant.length} staged path(s).\n`);
  execFileSync(process.execPath, [path.join(repoRoot, 'scripts/run-engi-spec-quality.mjs'), '--mode', 'basic'], {
    cwd: repoRoot,
    stdio: 'inherit'
  });
}

try {
  main();
} catch (error) {
  const detail = error instanceof Error ? error.message : String(error);
  process.stderr.write(`${detail}\n`);
  process.exitCode = 1;
}
