import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const repoRoot = fileURLToPath(new URL('../..', import.meta.url));
const scriptPath = fileURLToPath(new URL('../../scripts/run-engi-spec-quality.mjs', import.meta.url));

/**
 * @param {string[]} args
 */
function runScript(args) {
  return execFileSync(process.execPath, [scriptPath, ...args], {
    cwd: repoRoot,
    encoding: 'utf8'
  });
}

/**
 * @param {string[]} args
 */
function runScriptFailure(args) {
  try {
    runScript(args);
    throw new Error('Expected spec-quality script to fail.');
  } catch (error) {
    if (!(error instanceof Error) || !('stderr' in error)) throw error;
    return String(error.stderr || error.message);
  }
}

test('basic spec-quality runner passes on the active canon stack', () => {
  const output = runScript(['--mode', 'basic']);
  assert.match(output, /ENGI spec quality ok \(basic\)/);
});

test('strict-from-title skips when the commit title is not a spec version change', () => {
  const output = runScript(['--mode', 'strict-from-title', '--commit-title', 'feat: refine demo copy']);
  assert.match(output, /skipped strict commit-title checks/i);
});

test('strict V24 spec-quality fails while the V24 draft remains short of full-canon rewrite closure', () => {
  const stderr = runScriptFailure(['--mode', 'strict-version', '--version', 'V24']);
  assert.match(stderr, /ENGI spec family check failed for V24 \(draft\)/);
  assert.match(stderr, /missing required section containing "full-system, re-implementation, and audit rule"/i);
});
