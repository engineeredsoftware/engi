#!/usr/bin/env node

import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { ACTIVE_CANON_VERSION } from '../engi-demo/src/canon-posture.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const defaultRepoRoot = path.resolve(__dirname, '..');
const defaultQualityScript = path.join(defaultRepoRoot, 'scripts/run-engi-spec-quality.mjs');

const SPEC_RELEVANT_PATHS = [
  /^ENGI_SPEC(?:IFYING)?(?:_.*)?\.md$/u,
  /^ENGI_SPEC\.txt$/u,
  /^engi-demo\/src\/canonical\/v21-specifying\.js$/u,
  /^package\.json$/u,
  /^scripts\/(?:check-engi-|prepare-engi-spec-family-promotion|promote-engi-canon|run-engi-spec-quality|setup-engi-git-hooks)/u,
  /^\.githooks\/(?:pre-commit|commit-msg)$/u,
  /^\.github\/workflows\/engi-canon-quality\.yml$/u
];

function projectLabel(version) {
  const numeric = Number.parseInt(String(version).replace(/^V/u, ''), 10);
  return Number.isInteger(numeric) && numeric >= 25 ? 'Bitcode' : 'ENGI';
}

/**
 * @param {string[]} argv
 * @returns {{ repoRoot: string, qualityScript: string }}
 */
export function parseArgs(argv) {
  let repoRoot = defaultRepoRoot;
  let qualityScript = defaultQualityScript;
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--repo-root') repoRoot = path.resolve(argv[++index]);
    else if (arg === '--quality-script') qualityScript = path.resolve(argv[++index]);
    else throw new Error(`Unknown argument ${arg}`);
  }
  return { repoRoot, qualityScript };
}

/**
 * @param {string} stagedPath
 * @returns {boolean}
 */
export function isSpecRelevantPath(stagedPath) {
  return SPEC_RELEVANT_PATHS.some((pattern) => pattern.test(stagedPath));
}

/**
 * @param {{ repoRoot: string, qualityScript: string }} options
 */
export function runPreCommitCheck({ repoRoot, qualityScript }) {
  let activeVersion = ACTIVE_CANON_VERSION;
  try {
    activeVersion = readFileSync(path.join(repoRoot, 'ENGI_SPEC.txt'), 'utf8').trim() || ACTIVE_CANON_VERSION;
  } catch {
    activeVersion = ACTIVE_CANON_VERSION;
  }
  const label = projectLabel(activeVersion);
  const staged = execFileSync('git', ['diff', '--cached', '--name-only', '--diff-filter=ACMR'], {
    cwd: repoRoot,
    encoding: 'utf8'
  })
    .split('\n')
    .map((entry) => entry.trim())
    .filter(Boolean);

  const relevant = staged.filter((entry) => isSpecRelevantPath(entry));
  if (relevant.length === 0) {
    process.stdout.write(`${label} pre-commit: no spec-quality-sensitive files staged; skipping.\n`);
    return;
  }

  process.stdout.write(`${label} pre-commit: running host-agnostic spec basics for ${relevant.length} staged path(s).\n`);
  execFileSync(process.execPath, [qualityScript, '--mode', 'basic'], {
    cwd: repoRoot,
    stdio: 'inherit'
  });
}

function main() {
  runPreCommitCheck(parseArgs(process.argv.slice(2)));
}

try {
  if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    main();
  }
} catch (error) {
  const detail = error instanceof Error ? error.message : String(error);
  process.stderr.write(`${detail}\n`);
  process.exitCode = 1;
}
