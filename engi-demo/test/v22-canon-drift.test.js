import test from 'node:test';
import assert from 'node:assert/strict';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { promises as fs } from 'node:fs';
import { fileURLToPath } from 'node:url';

const repoRoot = fileURLToPath(new URL('../..', import.meta.url));
const driftScriptPath = fileURLToPath(new URL('../../scripts/check-engi-canon-posture-drift.mjs', import.meta.url));
const prepareSpecFamilyScriptPath = fileURLToPath(new URL('../../scripts/prepare-engi-spec-family-promotion.mjs', import.meta.url));
const prepareRuntimeScriptPath = fileURLToPath(new URL('../../scripts/prepare-engi-runtime-canon-promotion.mjs', import.meta.url));
const promoteScriptPath = fileURLToPath(new URL('../../scripts/promote-engi-canon.mjs', import.meta.url));

test('real repo canon posture drift check passes for active V22 and draft V23', () => {
  const output = execFileSync(process.execPath, [
    driftScriptPath,
    '--active-canon',
    'V22',
    '--draft-target',
    'V23'
  ], {
    cwd: repoRoot,
    encoding: 'utf8'
  });

  assert.match(output, /ENGI canon posture drift ok/);
  assert.match(output, /active=V22/);
  assert.match(output, /draft=V23/);
});

test('runtime promotion preparation rewrites canon posture source and README', async () => {
  const fixtureRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'engi-runtime-promotion-'));
  await fs.mkdir(path.join(fixtureRoot, 'engi-demo', 'src'), { recursive: true });
  await fs.mkdir(path.join(fixtureRoot, 'engi-demo'), { recursive: true });

  await fs.writeFile(
    path.join(fixtureRoot, 'engi-demo', 'src', 'canon-posture.js'),
    [
      "// @ts-check",
      "export const ACTIVE_CANON_VERSION = 'V21';",
      "export const DRAFT_TARGET_VERSION = 'V22';",
      "export const CURRENT_POLICY_REF = `policy://engi/spec-${ACTIVE_CANON_VERSION.toLowerCase()}-active-${DRAFT_TARGET_VERSION.toLowerCase()}-system-draft/current`;"
    ].join('\n'),
    'utf8'
  );
  await fs.writeFile(
    path.join(fixtureRoot, 'engi-demo', 'README.md'),
    [
      '# ENGI Demo - V21 canonical deterministic local prototype',
      '',
      'This demo is governed by the active V21 canonical spec and serves as the current deterministic local realization of the full ENGI operating chain while V22 drafts the next system-facing implementation pass.',
      '',
      'Current spec/doc truth for this repo:',
      '- Canonical pointer is `/tmp/example/ENGI_SPEC.txt -> V21`',
      '- V21 is the current canonical/latest target and governing full-system spec',
      '- `ENGI_SPEC_V21_PROVEN.md` is the active generated proof appendix'
    ].join('\n'),
    'utf8'
  );

  const output = execFileSync(process.execPath, [
    prepareRuntimeScriptPath,
    '--version',
    'V22',
    '--next-draft',
    'V23',
    '--repo-root',
    fixtureRoot
  ], {
    cwd: fixtureRoot,
    encoding: 'utf8'
  });

  assert.match(output, /Prepared runtime canon posture for V22 active canon and V23 draft target/);

  const rewrittenCanonPosture = await fs.readFile(path.join(fixtureRoot, 'engi-demo', 'src', 'canon-posture.js'), 'utf8');
  const rewrittenReadme = await fs.readFile(path.join(fixtureRoot, 'engi-demo', 'README.md'), 'utf8');

  assert.match(rewrittenCanonPosture, /ACTIVE_CANON_VERSION = 'V22'/);
  assert.match(rewrittenCanonPosture, /DRAFT_TARGET_VERSION = 'V23'/);
  assert.match(rewrittenReadme, /# ENGI Demo - V22 canonical deterministic local prototype/);
  assert.match(rewrittenReadme, /active V22 canonical spec/);
  assert.match(rewrittenReadme, /while V23 drafts the next system-facing implementation pass/);
  assert.match(rewrittenReadme, /ENGI_SPEC\.txt -> V22/);
  assert.match(rewrittenReadme, /ENGI_SPEC_V22_PROVEN\.md/);
});

test('V22 spec-family promotion preparation rewrites hand-authored status truth', async () => {
  const fixtureRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'engi-spec-family-v22-'));
  /** @type {Array<[string, string]>} */
  const files = [
    ['ENGI_SPEC_V22.md', '# ENGI Spec V22\n\n## Status\n\n- Current canonical/latest target: `V21`\n- Source parity state: draft\n- V22 state: draft implementation underway\n\n## Body\nx\n'],
    ['ENGI_SPEC_V22_DELTA.md', '# ENGI Spec V22 Delta\n\n## Status\n\n- Current canonical/latest target: `V21`\n- Source parity state: draft\n- V22 state: draft implementation underway\n\n## Body\nx\n'],
    ['ENGI_SPEC_V22_PARITY_MATRIX.md', '# ENGI Spec V22 Parity Matrix\n\n## Status\n\n- Current canonical/latest target: `V21`\n- Source parity state: draft\n- V22 state: draft implementation underway\n\n## Body\nx\n']
  ];
  await Promise.all(files.map(([relativePath, content]) => fs.writeFile(path.join(fixtureRoot, relativePath), content, 'utf8')));

  const output = execFileSync(process.execPath, [
    prepareSpecFamilyScriptPath,
    '--version',
    'V22',
    '--commit',
    'deadbeef',
    '--repo-root',
    fixtureRoot
  ], {
    cwd: fixtureRoot,
    encoding: 'utf8'
  });

  assert.match(output, /Prepared V22 hand-authored spec family for promotion with proof-source commit deadbeef/);

  for (const relativePath of files.map(([relativePath]) => relativePath)) {
    const rewritten = await fs.readFile(path.join(fixtureRoot, relativePath), 'utf8');
    assert.match(rewritten, /Current canonical\/latest target: `V22`/);
    assert.match(rewritten, /Canonical proof-source commit: `deadbeef`/);
    const versionStateLine = rewritten.match(/^- V22 state: (.+)$/m);
    const stateValue = versionStateLine?.[1];
    if (typeof stateValue !== 'string') {
      throw new Error(`Missing V22 state line in ${relativePath}`);
    }
    assert.doesNotMatch(stateValue, /draft|pending|in progress/i);
  }
});

test('V22 promotion dry-run includes drift detection and runtime posture preparation', () => {
  const output = execFileSync(process.execPath, [
    promoteScriptPath,
    '--version',
    'V22',
    '--commit',
    'HEAD',
    '--dry-run'
  ], {
    cwd: repoRoot,
    encoding: 'utf8'
  });

  assert.match(output, /V22 canonical promotion plan/);
  assert.match(output, /check-engi-spec-family\.mjs --version V22 --mode draft --current-target V21/);
  assert.match(output, /check-engi-canonical-inputs\.mjs --current-target V21/);
  assert.match(output, /check-engi-canon-posture-drift\.mjs --active-canon V21 --draft-target V22/);
  assert.match(output, /prepare-engi-spec-family-promotion\.mjs --version V22 --commit/);
  assert.match(output, /prepare-engi-runtime-canon-promotion\.mjs --version V22 --next-draft V23/);
  assert.match(output, /generate-engi-proven\.mjs --version V22/);
  assert.match(output, /check-engi-canonical-inputs\.mjs --current-target V22/);
  assert.match(output, /check-engi-spec-family\.mjs --version V22 --mode promoted/);
  assert.match(output, /check-engi-canon-posture-drift\.mjs --active-canon V22 --draft-target V23/);
  assert.match(output, /Promotes V22 as/);
});
