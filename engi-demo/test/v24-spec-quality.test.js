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

test('basic spec-quality runner passes on the active canon stack', () => {
  const output = runScript(['--mode', 'basic']);
  assert.match(output, /ENGI spec quality ok \(basic\)/);
});

test('strict-from-title skips when the commit title is not a spec version change', () => {
  const output = runScript(['--mode', 'strict-from-title', '--commit-title', 'feat: refine demo copy']);
  assert.match(output, /skipped strict commit-title checks/i);
});

test('strict V24 spec-quality passes for the current full-canon V24 draft family', () => {
  const output = runScript(['--mode', 'strict-version', '--version', 'V24']);
  assert.match(output, /ENGI spec quality ok \(strict-version V24\)/);
});

test('strict-from-title runs V24 checks for canonical spec commit titles', () => {
  const output = runScript(['--mode', 'strict-from-title', '--commit-title', 'spec: V24, realize external interfacing']);
  assert.match(output, /ENGI spec quality ok \(strict-from-title V24\)/);
});
