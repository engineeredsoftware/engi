#!/usr/bin/env node

import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const defaultRepoRoot = path.resolve(__dirname, '..');
const defaultQualityScript = path.join(defaultRepoRoot, 'scripts/run-engi-spec-quality.mjs');

/**
 * @param {string[]} argv
 * @returns {{ commitMessagePath: string | null, repoRoot: string, qualityScript: string }}
 */
export function parseArgs(argv) {
  let commitMessagePath = null;
  let repoRoot = defaultRepoRoot;
  let qualityScript = defaultQualityScript;
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (!commitMessagePath && !arg.startsWith('--')) commitMessagePath = arg;
    else if (arg === '--repo-root') repoRoot = path.resolve(argv[++index]);
    else if (arg === '--quality-script') qualityScript = path.resolve(argv[++index]);
    else throw new Error(`Unknown argument ${arg}`);
  }
  return { commitMessagePath, repoRoot, qualityScript };
}

/**
 * @param {string} commitMessagePath
 * @returns {string}
 */
export function readCommitTitle(commitMessagePath) {
  return readFileSync(commitMessagePath, 'utf8').split('\n')[0].trim();
}

/**
 * @param {{ commitMessagePath: string | null, repoRoot: string, qualityScript: string }} options
 */
export function runCommitMessageCheck({ commitMessagePath, repoRoot, qualityScript }) {
  if (!commitMessagePath) {
    throw new Error('A commit message file path is required.');
  }

  const commitTitle = readCommitTitle(commitMessagePath);
  execFileSync(
    process.execPath,
    [
      qualityScript,
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

function main() {
  runCommitMessageCheck(parseArgs(process.argv.slice(2)));
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
