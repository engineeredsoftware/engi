#!/usr/bin/env node

import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const defaultRepoRoot = path.resolve(__dirname, '..');
const defaultHooksPath = '.githooks';

/**
 * @param {string[]} argv
 * @returns {{ repoRoot: string, hooksPath: string }}
 */
export function parseArgs(argv) {
  let repoRoot = defaultRepoRoot;
  let hooksPath = defaultHooksPath;
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--repo-root') repoRoot = path.resolve(argv[++index]);
    else if (arg === '--hooks-path') hooksPath = argv[++index];
    else throw new Error(`Unknown argument ${arg}`);
  }
  return { repoRoot, hooksPath };
}

/**
 * @param {{ repoRoot: string, hooksPath: string }} options
 */
export function configureGitHooks({ repoRoot, hooksPath }) {
  execFileSync('git', ['config', 'core.hooksPath', hooksPath], {
    cwd: repoRoot,
    stdio: 'inherit'
  });
  process.stdout.write(`Configured git core.hooksPath -> ${hooksPath}\n`);
}

function main() {
  configureGitHooks(parseArgs(process.argv.slice(2)));
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
