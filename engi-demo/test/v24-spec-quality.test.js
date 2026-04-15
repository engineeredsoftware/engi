import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ACTIVE_CANON_VERSION, DRAFT_TARGET_VERSION } from '../src/canon-posture.js';

const repoRoot = fileURLToPath(new URL('../..', import.meta.url));
const scriptPath = fileURLToPath(new URL('../../scripts/run-engi-spec-quality.mjs', import.meta.url));
const preCommitScriptPath = fileURLToPath(new URL('../../scripts/check-engi-pre-commit.mjs', import.meta.url));
const commitMsgScriptPath = fileURLToPath(new URL('../../scripts/check-engi-commit-msg.mjs', import.meta.url));
const setupHooksScriptPath = fileURLToPath(new URL('../../scripts/setup-engi-git-hooks.mjs', import.meta.url));

function projectLabel(version) {
  const numeric = Number.parseInt(String(version || '').replace(/^V/u, ''), 10);
  return Number.isInteger(numeric) && numeric >= 25 ? 'Bitcode' : 'ENGI';
}

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
 * @returns {string}
 */
function createTempGitRepo() {
  const repoPath = mkdtempSync(path.join(os.tmpdir(), 'engi-v24-build-'));
  execFileSync('git', ['init'], { cwd: repoPath, stdio: 'ignore' });
  execFileSync('git', ['config', 'user.name', `${projectLabel(ACTIVE_CANON_VERSION)} Test`], { cwd: repoPath, stdio: 'ignore' });
  execFileSync('git', ['config', 'user.email', 'spec-quality-test@example.com'], { cwd: repoPath, stdio: 'ignore' });
  return repoPath;
}

/**
 * @param {string} repoPath
 * @returns {string}
 */
function writeQualityProbe(repoPath) {
  const probePath = path.join(repoPath, 'quality-probe.mjs');
  writeFileSync(
    probePath,
    [
      "import { appendFileSync } from 'node:fs';",
      "const [modeArg, modeValue] = process.argv.slice(2);",
      "appendFileSync('quality-probe.log', JSON.stringify({ modeArg, modeValue }) + '\\n');"
    ].join('\n'),
    'utf8'
  );
  return probePath;
}

test('basic spec-quality runner passes on the active canon stack', () => {
  const output = runScript(['--mode', 'basic']);
  assert.match(output, new RegExp(`${projectLabel(ACTIVE_CANON_VERSION)} spec quality ok \\(basic\\)`));
});

test('strict-from-title skips when the commit title is not a spec version change', () => {
  const output = runScript(['--mode', 'strict-from-title', '--commit-title', 'feat: refine demo copy']);
  assert.match(output, /skipped strict commit-title checks/i);
});

test('strict active-canon spec-quality passes for the current full-canon active family', () => {
  const output = runScript(['--mode', 'strict-version', '--version', ACTIVE_CANON_VERSION]);
  assert.match(output, new RegExp(`${projectLabel(ACTIVE_CANON_VERSION)} spec quality ok \\(strict-version ${ACTIVE_CANON_VERSION}\\)`));
});

test('strict-from-title runs active-canon checks for canonical spec commit titles', () => {
  const commitTitle = `spec: ${ACTIVE_CANON_VERSION}, close active canonical work`;
  const output = runScript(['--mode', 'strict-from-title', '--commit-title', commitTitle]);
  assert.match(output, new RegExp(`${projectLabel(ACTIVE_CANON_VERSION)} spec quality ok \\(strict-from-title ${ACTIVE_CANON_VERSION}\\)`));
});

test('strict draft-target spec-quality passes for the current draft family', () => {
  const output = runScript(['--mode', 'strict-version', '--version', DRAFT_TARGET_VERSION]);
  assert.match(output, new RegExp(`${projectLabel(DRAFT_TARGET_VERSION)} spec quality ok \\(strict-version ${DRAFT_TARGET_VERSION}\\)`));
});

test('pre-commit hook skips when staged files are not spec-quality sensitive', () => {
  const repoPath = createTempGitRepo();
  writeFileSync(path.join(repoPath, 'notes.txt'), 'hello\n', 'utf8');
  execFileSync('git', ['add', 'notes.txt'], { cwd: repoPath, stdio: 'ignore' });
  const output = execFileSync(process.execPath, [preCommitScriptPath, '--repo-root', repoPath], {
    cwd: repoRoot,
    encoding: 'utf8'
  });
  assert.match(output, /no spec-quality-sensitive files staged; skipping/i);
});

test('pre-commit hook runs injected quality basics when hook files are staged', () => {
  const repoPath = createTempGitRepo();
  mkdirSync(path.join(repoPath, '.githooks'), { recursive: true });
  writeFileSync(path.join(repoPath, '.githooks', 'pre-commit'), '#!/usr/bin/env sh\n', 'utf8');
  execFileSync('git', ['add', '.githooks/pre-commit'], { cwd: repoPath, stdio: 'ignore' });
  const probePath = writeQualityProbe(repoPath);
  const output = execFileSync(
    process.execPath,
    [preCommitScriptPath, '--repo-root', repoPath, '--quality-script', probePath],
    { cwd: repoRoot, encoding: 'utf8' }
  );
  const log = readFileSync(path.join(repoPath, 'quality-probe.log'), 'utf8');
  assert.match(output, /running host-agnostic spec basics/i);
  assert.match(log, /"modeArg":"--mode"/);
  assert.match(log, /"modeValue":"basic"/);
});

test('commit-msg hook forwards the first-line title into strict-from-title quality checks', () => {
  const repoPath = createTempGitRepo();
  const probePath = path.join(repoPath, 'quality-probe.mjs');
  writeFileSync(
    probePath,
    [
      "import { appendFileSync } from 'node:fs';",
      "const args = process.argv.slice(2);",
      "appendFileSync('quality-probe.log', JSON.stringify(args) + '\\n');"
    ].join('\n'),
    'utf8'
  );
  const msgPath = path.join(repoPath, 'COMMIT_EDITMSG');
  const commitTitle = `spec: ${ACTIVE_CANON_VERSION}, close active canonical work`;
  writeFileSync(msgPath, `${commitTitle}\n\nbody\n`, 'utf8');
  execFileSync(
    process.execPath,
    [commitMsgScriptPath, msgPath, '--repo-root', repoPath, '--quality-script', probePath],
    { cwd: repoRoot, stdio: 'ignore' }
  );
  const log = readFileSync(path.join(repoPath, 'quality-probe.log'), 'utf8');
  assert.match(log, /--mode/);
  assert.match(log, /strict-from-title/);
  assert.match(log, /--commit-title/);
  assert.match(log, new RegExp(commitTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
});

test('git hook setup configures core.hooksPath for a target repo', () => {
  const repoPath = createTempGitRepo();
  mkdirSync(path.join(repoPath, '.githooks'), { recursive: true });
  execFileSync(
    process.execPath,
    [setupHooksScriptPath, '--repo-root', repoPath, '--hooks-path', '.githooks'],
    { cwd: repoRoot, stdio: 'ignore' }
  );
  const hooksPath = execFileSync('git', ['config', '--get', 'core.hooksPath'], {
    cwd: repoPath,
    encoding: 'utf8'
  }).trim();
  assert.equal(hooksPath, '.githooks');
});
