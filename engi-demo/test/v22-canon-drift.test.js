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

test('real repo canon posture drift check passes for active V24 and draft V25', () => {
  const output = execFileSync(process.execPath, [
    driftScriptPath,
    '--active-canon',
    'V24',
    '--draft-target',
    'V25'
  ], {
    cwd: repoRoot,
    encoding: 'utf8'
  });

  assert.match(output, /ENGI canon posture drift ok/);
  assert.match(output, /active=V24/);
  assert.match(output, /draft=V25/);
});

test('runtime promotion preparation rewrites canon posture source and README', async () => {
  const fixtureRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'engi-runtime-promotion-'));
  await fs.mkdir(path.join(fixtureRoot, 'engi-demo', 'src'), { recursive: true });
  await fs.mkdir(path.join(fixtureRoot, 'engi-demo'), { recursive: true });

  await fs.writeFile(
    path.join(fixtureRoot, 'engi-demo', 'src', 'canon-posture.js'),
    [
      "// @ts-check",
      "export const ACTIVE_CANON_VERSION = 'V22';",
      "export const DRAFT_TARGET_VERSION = 'V23';",
      "export const CURRENT_POLICY_REF = `policy://engi/spec-${ACTIVE_CANON_VERSION.toLowerCase()}-active-${DRAFT_TARGET_VERSION.toLowerCase()}-system-draft/current`;"
    ].join('\n'),
    'utf8'
  );
  await fs.writeFile(
    path.join(fixtureRoot, 'engi-demo', 'README.md'),
    [
      '# ENGI Demo - V22 canonical deterministic local prototype',
      '',
      'This demo is governed by the active V22 canonical spec and serves as the current deterministic local realization of the full ENGI operating chain while V23 drafts the next system-facing implementation pass.',
      '',
      'Current spec/doc truth for this repo:',
      '- Canonical pointer is `/tmp/example/ENGI_SPEC.txt -> V22`',
      '- V22 is the current canonical/latest target and governing full-system spec',
      '- `ENGI_SPEC_V22_PROVEN.md` is the active generated proof appendix'
    ].join('\n'),
    'utf8'
  );

  const output = execFileSync(process.execPath, [
    prepareRuntimeScriptPath,
    '--version',
    'V23',
    '--next-draft',
    'V24',
    '--repo-root',
    fixtureRoot
  ], {
    cwd: fixtureRoot,
    encoding: 'utf8'
  });

  assert.match(output, /Prepared runtime canon posture for V23 active canon and V24 draft target/);

  const rewrittenCanonPosture = await fs.readFile(path.join(fixtureRoot, 'engi-demo', 'src', 'canon-posture.js'), 'utf8');
  const rewrittenReadme = await fs.readFile(path.join(fixtureRoot, 'engi-demo', 'README.md'), 'utf8');

  assert.match(rewrittenCanonPosture, /ACTIVE_CANON_VERSION = 'V23'/);
  assert.match(rewrittenCanonPosture, /DRAFT_TARGET_VERSION = 'V24'/);
  assert.match(rewrittenReadme, /# ENGI Demo - V23 canonical deterministic local prototype/);
  assert.match(rewrittenReadme, /active V23 canonical spec/);
  assert.match(rewrittenReadme, /while V24 drafts the next system-facing implementation pass/);
  assert.match(rewrittenReadme, /ENGI_SPEC\.txt -> V23/);
  assert.match(rewrittenReadme, /ENGI_SPEC_V23_PROVEN\.md/);
});

test('V23 spec-family promotion preparation rewrites hand-authored status truth', async () => {
  const fixtureRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'engi-spec-family-v23-'));
  /** @type {Array<[string, string]>} */
  const files = [
    ['ENGI_SPEC_V23.md', '# ENGI Spec V23\n\n## Status\n\n- Current canonical/latest target: `V22`\n- Source parity state: draft\n- V23 state: draft implementation underway\n\n## Body\nx\n'],
    ['ENGI_SPEC_V23_DELTA.md', '# ENGI Spec V23 Delta\n\n## Status\n\n- Current canonical/latest target: `V22`\n- Source parity state: draft\n- V23 state: draft implementation underway\n\n## Body\nx\n'],
    ['ENGI_SPEC_V23_PARITY_MATRIX.md', '# ENGI Spec V23 Parity Matrix\n\n## Status\n\n- Current canonical/latest target: `V22`\n- Source parity state: draft\n- V23 state: draft implementation underway\n\n## Body\nx\n']
  ];
  await Promise.all(files.map(([relativePath, content]) => fs.writeFile(path.join(fixtureRoot, relativePath), content, 'utf8')));

  const output = execFileSync(process.execPath, [
    prepareSpecFamilyScriptPath,
    '--version',
    'V23',
    '--commit',
    'deadbeef',
    '--repo-root',
    fixtureRoot
  ], {
    cwd: fixtureRoot,
    encoding: 'utf8'
  });

  assert.match(output, /Prepared V23 hand-authored spec family for promotion with proof-source commit deadbeef/);

  for (const relativePath of files.map(([relativePath]) => relativePath)) {
    const rewritten = await fs.readFile(path.join(fixtureRoot, relativePath), 'utf8');
    assert.match(rewritten, /Current canonical\/latest target: `V23`/);
    assert.match(rewritten, /Canonical proof-source commit: `deadbeef`/);
    const versionStateLine = rewritten.match(/^- V23 state: (.+)$/m);
    const stateValue = versionStateLine?.[1];
    if (typeof stateValue !== 'string') {
      throw new Error(`Missing V23 state line in ${relativePath}`);
    }
    assert.doesNotMatch(stateValue, /draft|pending|in progress/i);
  }
});

test('V23 promotion dry-run includes drift detection and runtime posture preparation', () => {
  const output = execFileSync(process.execPath, [
    promoteScriptPath,
    '--version',
    'V23',
    '--commit',
    'HEAD',
    '--dry-run'
  ], {
    cwd: repoRoot,
    encoding: 'utf8'
  });

  assert.match(output, /V23 canonical promotion plan/);
  assert.match(output, /check-engi-spec-family\.mjs --version V23 --mode draft --current-target V22/);
  assert.match(output, /check-engi-canonical-inputs\.mjs --current-target V22/);
  assert.match(output, /check-engi-canon-posture-drift\.mjs --active-canon V22 --draft-target V23/);
  assert.match(output, /prepare-engi-spec-family-promotion\.mjs --version V23 --commit/);
  assert.match(output, /prepare-engi-runtime-canon-promotion\.mjs --version V23 --next-draft V24/);
  assert.match(output, /generate-engi-proven\.mjs --version V23/);
  assert.match(output, /check-engi-canonical-inputs\.mjs --current-target V23/);
  assert.match(output, /check-engi-spec-family\.mjs --version V23 --mode promoted/);
  assert.match(output, /check-engi-canon-posture-drift\.mjs --active-canon V23 --draft-target V24/);
  assert.match(output, /Promotes V23 as/);
});

test('V24 spec-family promotion preparation rewrites hand-authored status truth', async () => {
  const fixtureRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'engi-spec-family-v24-'));
  /** @type {Array<[string, string]>} */
  const files = [
    ['ENGI_SPEC_V24.md', '# ENGI Spec V24\n\n## Status\n\n- Current canonical/latest target: `V23`\n- Source parity state: draft\n- V24 state: draft implementation underway\n\n## Body\nx\n'],
    ['ENGI_SPEC_V24_DELTA.md', '# ENGI Spec V24 Delta\n\n## Status\n\n- Current canonical/latest target: `V23`\n- Source parity state: draft\n- V24 state: draft implementation underway\n\n## Body\nx\n'],
    ['ENGI_SPEC_V24_PARITY_MATRIX.md', '# ENGI Spec V24 Parity Matrix\n\n## Status\n\n- Current canonical/latest target: `V23`\n- Source parity state: draft\n- V24 state: draft implementation underway\n\n## Body\nx\n']
  ];
  await Promise.all(files.map(([relativePath, content]) => fs.writeFile(path.join(fixtureRoot, relativePath), content, 'utf8')));

  const output = execFileSync(process.execPath, [
    prepareSpecFamilyScriptPath,
    '--version',
    'V24',
    '--commit',
    'deadbeef',
    '--repo-root',
    fixtureRoot
  ], {
    cwd: fixtureRoot,
    encoding: 'utf8'
  });

  assert.match(output, /Prepared V24 hand-authored spec family for promotion with proof-source commit deadbeef/);

  for (const relativePath of files.map(([relativePath]) => relativePath)) {
    const rewritten = await fs.readFile(path.join(fixtureRoot, relativePath), 'utf8');
    assert.match(rewritten, /Current canonical\/latest target: `V24`/);
    assert.match(rewritten, /Canonical proof-source commit: `deadbeef`/);
    const versionStateLine = rewritten.match(/^- V24 state: (.+)$/m);
    const stateValue = versionStateLine?.[1];
    if (typeof stateValue !== 'string') {
      throw new Error(`Missing V24 state line in ${relativePath}`);
    }
    assert.doesNotMatch(stateValue, /draft|pending|in progress/i);
  }
});

test('V24 promotion dry-run includes drift detection and runtime posture preparation', () => {
  const output = execFileSync(process.execPath, [
    promoteScriptPath,
    '--version',
    'V24',
    '--commit',
    'HEAD',
    '--dry-run'
  ], {
    cwd: repoRoot,
    encoding: 'utf8'
  });

  assert.match(output, /V24 canonical promotion plan/);
  assert.match(output, /check-engi-spec-family\.mjs --version V24 --mode draft --current-target V23/);
  assert.match(output, /check-engi-canonical-inputs\.mjs --current-target V23/);
  assert.match(output, /check-engi-canon-posture-drift\.mjs --active-canon V23 --draft-target V24/);
  assert.match(output, /prepare-engi-spec-family-promotion\.mjs --version V24 --commit/);
  assert.match(output, /prepare-engi-runtime-canon-promotion\.mjs --version V24 --next-draft V25/);
  assert.match(output, /generate-engi-proven\.mjs --version V24/);
  assert.match(output, /check-engi-canonical-inputs\.mjs --current-target V24/);
  assert.match(output, /check-engi-spec-family\.mjs --version V24 --mode promoted/);
  assert.match(output, /check-engi-canon-posture-drift\.mjs --active-canon V24 --draft-target V25/);
  assert.match(output, /Promotes V24 as/);
});
