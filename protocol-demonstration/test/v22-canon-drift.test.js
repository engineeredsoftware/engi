import test from 'node:test';
import assert from 'node:assert/strict';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { promises as fs } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { ACTIVE_CANON_VERSION, DRAFT_TARGET_VERSION } from '../src/canon-posture.js';

const repoRoot = fileURLToPath(new URL('../..', import.meta.url));
const driftScriptPath = fileURLToPath(new URL('../../scripts/check-bitcode-canon-posture-drift.mjs', import.meta.url));
const prepareSpecFamilyScriptPath = fileURLToPath(new URL('../../scripts/prepare-bitcode-spec-family-promotion.mjs', import.meta.url));
const prepareRuntimeScriptPath = fileURLToPath(new URL('../../scripts/prepare-bitcode-runtime-canon-promotion.mjs', import.meta.url));
const promoteScriptPath = fileURLToPath(new URL('../../scripts/promote-bitcode-canon.mjs', import.meta.url));

function projectLabel(version) {
  const numeric = Number.parseInt(String(version || '').replace(/^V/u, ''), 10);
  return Number.isInteger(numeric) && numeric >= 25 ? 'Bitcode' : 'ENGI';
}

test(`real repo canon posture drift check passes for active ${ACTIVE_CANON_VERSION} and draft ${DRAFT_TARGET_VERSION}`, () => {
  const output = execFileSync(process.execPath, [
    driftScriptPath,
    '--active-canon',
    ACTIVE_CANON_VERSION,
    '--draft-target',
    DRAFT_TARGET_VERSION
  ], {
    cwd: repoRoot,
    encoding: 'utf8'
  });

  assert.match(output, new RegExp(`${projectLabel(ACTIVE_CANON_VERSION)} canon posture drift ok`));
  assert.match(output, new RegExp(`active=${ACTIVE_CANON_VERSION}`));
  assert.match(output, new RegExp(`draft=${DRAFT_TARGET_VERSION}`));
});

test('runtime promotion preparation rewrites canon posture source and README', async () => {
  const fixtureRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'bitcode-runtime-promotion-'));
  await fs.mkdir(path.join(fixtureRoot, 'protocol-demonstration', 'src'), { recursive: true });
  await fs.mkdir(path.join(fixtureRoot, 'protocol-demonstration'), { recursive: true });

  await fs.writeFile(
    path.join(fixtureRoot, 'protocol-demonstration', 'src', 'canon-posture.js'),
    [
      "// @ts-check",
      "export const ACTIVE_CANON_VERSION = 'V22';",
      "export const DRAFT_TARGET_VERSION = 'V23';",
      "export const CURRENT_POLICY_REF = `policy://engi/spec-${ACTIVE_CANON_VERSION.toLowerCase()}-active-${DRAFT_TARGET_VERSION.toLowerCase()}-system-draft/current`;"
    ].join('\n'),
    'utf8'
  );
  await fs.writeFile(
    path.join(fixtureRoot, 'protocol-demonstration', 'README.md'),
    [
      '# Bitcode Protocol Demonstration - V22 canonical deterministic local prototype',
      '',
      'This demo is governed by the active V22 canonical spec.',
      '',
      '- `BITCODE_SPEC.txt -> V22`',
      '- current generated appendix: `_legacy/ENGI_SPEC_V22_PROVEN.md`',
      '',
      'Active canon remains `V22`.',
      'V23 is the next draft target after this promotion.'
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

  const rewrittenCanonPosture = await fs.readFile(path.join(fixtureRoot, 'protocol-demonstration', 'src', 'canon-posture.js'), 'utf8');
  const rewrittenReadme = await fs.readFile(path.join(fixtureRoot, 'protocol-demonstration', 'README.md'), 'utf8');

  assert.match(rewrittenCanonPosture, /ACTIVE_CANON_VERSION = 'V23'/);
  assert.match(rewrittenCanonPosture, /DRAFT_TARGET_VERSION = 'V24'/);
  assert.match(rewrittenReadme, /# Bitcode Protocol Demonstration - V23 canonical deterministic local prototype/);
  assert.match(rewrittenReadme, /active V23 canonical spec/);
  assert.match(rewrittenReadme, /BITCODE_SPEC\.txt -> V23/);
  assert.match(rewrittenReadme, /_legacy\/ENGI_SPEC_V23_PROVEN\.md/);
  assert.match(rewrittenReadme, /Active canon remains `V23`\./);
  assert.match(rewrittenReadme, /V24 is the next draft target after this promotion\./);
});

test('runtime promotion preparation rewrites current inline demonstration README posture', async () => {
  const fixtureRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'bitcode-runtime-promotion-inline-'));
  await fs.mkdir(path.join(fixtureRoot, 'protocol-demonstration', 'src'), { recursive: true });

  await fs.writeFile(
    path.join(fixtureRoot, 'protocol-demonstration', 'src', 'canon-posture.js'),
    [
      "// @ts-check",
      "export const ACTIVE_CANON_VERSION = 'V29';",
      "export const DRAFT_TARGET_VERSION = 'V30';"
    ].join('\n'),
    'utf8'
  );
  await fs.writeFile(
    path.join(fixtureRoot, 'protocol-demonstration', 'README.md'),
    [
      '# Bitcode Protocol Demonstration - V29 canonical deterministic local prototype',
      '',
      '`BITCODE_SPEC.txt` is the canonical pointer for active-system work. It currently',
      'resolves to `V29`; V30 is the active draft target for Protocol/BTD hardening.',
      '`BITCODE_SPEC.txt -> V29`.',
      'This demo is governed by the active V29 canonical spec and',
      '`BITCODE_SPEC_V29_PROVEN.md` as the current generated appendix while V30 draft',
      'work proceeds outside the demonstration runtime boundary.'
    ].join('\n'),
    'utf8'
  );

  execFileSync(process.execPath, [
    prepareRuntimeScriptPath,
    '--version',
    'V30',
    '--next-draft',
    'V31',
    '--repo-root',
    fixtureRoot
  ], {
    cwd: fixtureRoot,
    encoding: 'utf8'
  });

  const rewrittenReadme = await fs.readFile(path.join(fixtureRoot, 'protocol-demonstration', 'README.md'), 'utf8');

  assert.match(rewrittenReadme, /# Bitcode Protocol Demonstration - V30 canonical deterministic local prototype/);
  assert.match(rewrittenReadme, /resolves to `V30`; V31 is the next draft target after this promotion\./);
  assert.match(rewrittenReadme, /BITCODE_SPEC\.txt -> V30/);
  assert.match(rewrittenReadme, /active V30 canonical\s+spec/);
  assert.match(rewrittenReadme, /BITCODE_SPEC_V30_PROVEN\.md/);
  assert.doesNotMatch(rewrittenReadme, /active draft target/);
  assert.doesNotMatch(rewrittenReadme, /draft work proceeds outside/);
});

test('V23 spec-family promotion preparation rewrites hand-authored status truth', async () => {
  const fixtureRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'bitcode-spec-family-v23-'));
  await fs.mkdir(path.join(fixtureRoot, '_legacy'), { recursive: true });
  /** @type {Array<[string, string]>} */
  const files = [
    ['_legacy/ENGI_SPEC_V23.md', '# ENGI Spec V23\n\n## Status\n\n- Current canonical/latest target: `V22`\n- Source parity state: draft\n- V23 state: draft implementation underway\n\n## Body\nx\n'],
    ['_legacy/ENGI_SPEC_V23_DELTA.md', '# ENGI Spec V23 Delta\n\n## Status\n\n- Current canonical/latest target: `V22`\n- Source parity state: draft\n- V23 state: draft implementation underway\n\n## Body\nx\n'],
    ['_legacy/ENGI_SPEC_V23_PARITY_MATRIX.md', '# ENGI Spec V23 Parity Matrix\n\n## Status\n\n- Current canonical/latest target: `V22`\n- Source parity state: draft\n- V23 state: draft implementation underway\n\n## Body\nx\n']
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
  assert.match(output, /check-bitcode-spec-family\.mjs --version V23 --mode draft --current-target V22/);
  assert.match(output, /check-bitcode-canonical-inputs\.mjs --current-target V22/);
  assert.match(output, /check-bitcode-canon-posture-drift\.mjs --active-canon V22 --draft-target V23/);
  assert.match(output, /prepare-bitcode-spec-family-promotion\.mjs --version V23 --commit/);
  assert.match(output, /prepare-bitcode-runtime-canon-promotion\.mjs --version V23 --next-draft V24/);
  assert.match(output, /generate-bitcode-proven\.mjs --version V23 .*_legacy\/ENGI_SPEC_V23_PROVEN\.md/);
  assert.match(output, /check-bitcode-canonical-inputs\.mjs --current-target V23/);
  assert.match(output, /check-bitcode-spec-family\.mjs --version V23 --mode promoted/);
  assert.match(output, /check-bitcode-canon-posture-drift\.mjs --active-canon V23 --draft-target V24/);
  assert.match(output, /Promotes V23 as/);
});

test('V24 spec-family promotion preparation rewrites hand-authored status truth', async () => {
  const fixtureRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'bitcode-spec-family-v24-'));
  await fs.mkdir(path.join(fixtureRoot, '_legacy'), { recursive: true });
  /** @type {Array<[string, string]>} */
  const files = [
    ['_legacy/ENGI_SPEC_V24.md', '# ENGI Spec V24\n\n## Status\n\n- Current canonical/latest target: `V23`\n- Source parity state: draft\n- V24 state: draft implementation underway\n\n## Body\nx\n'],
    ['_legacy/ENGI_SPEC_V24_DELTA.md', '# ENGI Spec V24 Delta\n\n## Status\n\n- Current canonical/latest target: `V23`\n- Source parity state: draft\n- V24 state: draft implementation underway\n\n## Body\nx\n'],
    ['_legacy/ENGI_SPEC_V24_PARITY_MATRIX.md', '# ENGI Spec V24 Parity Matrix\n\n## Status\n\n- Current canonical/latest target: `V23`\n- Source parity state: draft\n- V24 state: draft implementation underway\n\n## Body\nx\n']
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
  assert.match(output, /check-bitcode-spec-family\.mjs --version V24 --mode draft --current-target V23/);
  assert.match(output, /check-bitcode-canonical-inputs\.mjs --current-target V23/);
  assert.match(output, /check-bitcode-canon-posture-drift\.mjs --active-canon V23 --draft-target V24/);
  assert.match(output, /prepare-bitcode-spec-family-promotion\.mjs --version V24 --commit/);
  assert.match(output, /prepare-bitcode-runtime-canon-promotion\.mjs --version V24 --next-draft V25/);
  assert.match(output, /generate-bitcode-proven\.mjs --version V24 .*_legacy\/ENGI_SPEC_V24_PROVEN\.md/);
  assert.match(output, /check-bitcode-canonical-inputs\.mjs --current-target V24/);
  assert.match(output, /check-bitcode-spec-family\.mjs --version V24 --mode promoted/);
  assert.match(output, /check-bitcode-canon-posture-drift\.mjs --active-canon V24 --draft-target V25/);
  assert.match(output, /Promotes V24 as/);
});

test('V25 spec-family promotion preparation rewrites hand-authored status truth', async () => {
  const fixtureRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'bitcode-spec-family-v25-'));
  await fs.mkdir(path.join(fixtureRoot, '_legacy'), { recursive: true });
  /** @type {Array<[string, string]>} */
  const files = [
    ['_legacy/ENGI_SPEC_V25.md', '# ENGI Spec V25\n\n## Status\n\n- Current canonical/latest target: `V24`\n- Source parity state: draft\n- V25 state: draft implementation underway\n\n## Body\nx\n'],
    ['_legacy/ENGI_SPEC_V25_DELTA.md', '# ENGI Spec V25 Delta\n\n## Status\n\n- Current canonical/latest target: `V24`\n- Source parity state: draft\n- V25 state: draft implementation underway\n\n## Body\nx\n'],
    ['_legacy/ENGI_SPEC_V25_PARITY_MATRIX.md', '# ENGI Spec V25 Parity Matrix\n\n## Status\n\n- Current canonical/latest target: `V24`\n- Source parity state: draft\n- V25 state: draft implementation underway\n\n## Body\nx\n']
  ];
  await Promise.all(files.map(([relativePath, content]) => fs.writeFile(path.join(fixtureRoot, relativePath), content, 'utf8')));

  const output = execFileSync(process.execPath, [
    prepareSpecFamilyScriptPath,
    '--version',
    'V25',
    '--commit',
    'deadbeef',
    '--repo-root',
    fixtureRoot
  ], {
    cwd: fixtureRoot,
    encoding: 'utf8'
  });

  assert.match(output, /Prepared V25 hand-authored spec family for promotion with proof-source commit deadbeef/);

  for (const relativePath of files.map(([relativePath]) => relativePath)) {
    const rewritten = await fs.readFile(path.join(fixtureRoot, relativePath), 'utf8');
    assert.match(rewritten, /Current canonical\/latest target: `V25`/);
    assert.match(rewritten, /Canonical proof-source commit: `deadbeef`/);
    const versionStateLine = rewritten.match(/^- V25 state: (.+)$/m);
    const stateValue = versionStateLine?.[1];
    if (typeof stateValue !== 'string') {
      throw new Error(`Missing V25 state line in ${relativePath}`);
    }
    assert.doesNotMatch(stateValue, /draft|pending|in progress/i);
  }
});

test('V25 runtime promotion preparation rewrites canon posture source and README to Bitcode', async () => {
  const fixtureRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'bitcode-runtime-promotion-'));
  await fs.mkdir(path.join(fixtureRoot, 'protocol-demonstration', 'src'), { recursive: true });
  await fs.mkdir(path.join(fixtureRoot, 'protocol-demonstration'), { recursive: true });

  await fs.writeFile(
    path.join(fixtureRoot, 'protocol-demonstration', 'src', 'canon-posture.js'),
    [
      "// @ts-check",
      "export const ACTIVE_CANON_VERSION = 'V24';",
      "export const DRAFT_TARGET_VERSION = 'V25';",
      "export const CURRENT_POLICY_REF = `policy://engi/spec-${ACTIVE_CANON_VERSION.toLowerCase()}-active-${DRAFT_TARGET_VERSION.toLowerCase()}-system-draft/current`;"
    ].join('\n'),
    'utf8'
  );
  await fs.writeFile(
    path.join(fixtureRoot, 'protocol-demonstration', 'README.md'),
    [
      '# Bitcode Protocol Demonstration - V24 canonical deterministic local prototype',
      '',
      'This demo is governed by the active V24 canonical spec.',
      '',
      '- `BITCODE_SPEC.txt -> V24`',
      '- current generated appendix: `_legacy/ENGI_SPEC_V24_PROVEN.md`',
      '',
      'Active canon remains `V24`.',
      'V25 is the next draft target after this promotion.'
    ].join('\n'),
    'utf8'
  );

  const output = execFileSync(process.execPath, [
    prepareRuntimeScriptPath,
    '--version',
    'V25',
    '--next-draft',
    'V26',
    '--repo-root',
    fixtureRoot
  ], {
    cwd: fixtureRoot,
    encoding: 'utf8'
  });

  assert.match(output, /Prepared runtime canon posture for V25 active canon and V26 draft target/);

  const rewrittenCanonPosture = await fs.readFile(path.join(fixtureRoot, 'protocol-demonstration', 'src', 'canon-posture.js'), 'utf8');
  const rewrittenReadme = await fs.readFile(path.join(fixtureRoot, 'protocol-demonstration', 'README.md'), 'utf8');

  assert.match(rewrittenCanonPosture, /ACTIVE_CANON_VERSION = 'V25'/);
  assert.match(rewrittenCanonPosture, /DRAFT_TARGET_VERSION = 'V26'/);
  assert.match(rewrittenReadme, /# Bitcode Protocol Demonstration - V25 canonical deterministic local prototype/);
  assert.match(rewrittenReadme, /active V25 canonical spec/);
  assert.match(rewrittenReadme, /BITCODE_SPEC\.txt -> V25/);
  assert.match(rewrittenReadme, /_legacy\/ENGI_SPEC_V25_PROVEN\.md/);
  assert.match(rewrittenReadme, /Active canon remains `V25`\./);
  assert.match(rewrittenReadme, /V26 is the next draft target after this promotion\./);
});

test('runtime promotion preparation rewrites optional protocol package posture carriers', async () => {
  const fixtureRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'bitcode-package-runtime-promotion-'));
  await fs.mkdir(path.join(fixtureRoot, 'protocol-demonstration', 'src'), { recursive: true });
  await fs.mkdir(path.join(fixtureRoot, 'packages', 'protocol', 'src'), { recursive: true });
  await fs.mkdir(path.join(fixtureRoot, 'packages', 'protocol', 'data'), { recursive: true });

  const canonPostureSource = [
    "// @ts-check",
    "export const ACTIVE_CANON_VERSION = 'V28';",
    "export const DRAFT_TARGET_VERSION = 'V29';",
    'export function buildCanonPosture() {',
    "  return { inheritedCanonSurfaceLabel: 'V16/V17/V18/V19/V20/V21/V22/V23/V24/V25/V26/V27' };",
    '}'
  ].join('\n');
  const demonstrationReadme = [
    '# Bitcode Protocol Demonstration - V28 canonical deterministic local prototype',
    '',
    'This demo is governed by the active V28 canonical spec.',
    '',
    '- `BITCODE_SPEC.txt -> V28`',
    '- current generated appendix: `BITCODE_SPEC_V28_PROVEN.md`',
    '',
    'Active canon remains `V28`.',
    'V29 is the next draft target after this promotion.'
  ].join('\n');
  const packageReadme = [
    '# Bitcode Protocol Package',
    '',
    'It carries active/draft canon posture (`V28` active, `V29` draft during V29 work);',
    'must remain aligned to `V28` active, `V29` draft during gate work, then be',
    'rewritten by promotion automation to `V29` active, `V30` draft.'
  ].join('\n');
  const packageState = JSON.stringify(
    {
      specVersion: 'Bitcode Spec V28 active canon / V29 system draft',
      canonPosture: {
        activeCanonVersion: 'V28',
        draftTargetVersion: 'V29',
        operatorLabel: 'V28 active canon / V29 system draft',
        specVersionLabel: 'Bitcode Spec V28 active canon / V29 system draft',
        policyRef: 'policy://bitcode/spec-v28-active-v29-system-draft/current',
        activeProvenAppendixPath: 'BITCODE_SPEC_V28_PROVEN.md',
        draftSpecPath: 'BITCODE_SPEC_V29.md',
        draftDeltaPath: 'BITCODE_SPEC_V29_DELTA.md',
        draftParityPath: 'BITCODE_SPEC_V29_PARITY_MATRIX.md',
        inheritedCanonSurfaceLabel: 'V16/V17/V18/V19/V20/V21/V22/V23/V24/V25/V26/V27'
      }
    },
    null,
    2
  );

  await Promise.all([
    fs.writeFile(path.join(fixtureRoot, 'protocol-demonstration', 'src', 'canon-posture.js'), canonPostureSource, 'utf8'),
    fs.writeFile(path.join(fixtureRoot, 'protocol-demonstration', 'README.md'), demonstrationReadme, 'utf8'),
    fs.writeFile(path.join(fixtureRoot, 'packages', 'protocol', 'src', 'canon-posture.js'), canonPostureSource, 'utf8'),
    fs.writeFile(path.join(fixtureRoot, 'packages', 'protocol', 'README.md'), packageReadme, 'utf8'),
    fs.writeFile(path.join(fixtureRoot, 'packages', 'protocol', 'data', 'state.json'), packageState, 'utf8')
  ]);

  execFileSync(process.execPath, [
    prepareRuntimeScriptPath,
    '--version',
    'V29',
    '--next-draft',
    'V30',
    '--repo-root',
    fixtureRoot
  ], {
    cwd: fixtureRoot,
    encoding: 'utf8'
  });

  const rewrittenPackagePosture = await fs.readFile(path.join(fixtureRoot, 'packages', 'protocol', 'src', 'canon-posture.js'), 'utf8');
  const rewrittenPackageReadme = await fs.readFile(path.join(fixtureRoot, 'packages', 'protocol', 'README.md'), 'utf8');
  const rewrittenPackageState = await fs.readFile(path.join(fixtureRoot, 'packages', 'protocol', 'data', 'state.json'), 'utf8');

  assert.match(rewrittenPackagePosture, /ACTIVE_CANON_VERSION = 'V29'/);
  assert.match(rewrittenPackagePosture, /DRAFT_TARGET_VERSION = 'V30'/);
  assert.match(rewrittenPackagePosture, /inheritedCanonSurfaceLabel: 'V16\/V17\/V18\/V19\/V20\/V21\/V22\/V23\/V24\/V25\/V26\/V27\/V28'/);
  assert.match(rewrittenPackageReadme, /`V29` active, `V30` draft after V29 promotion/);
  assert.match(rewrittenPackageReadme, /must remain aligned to `V29` active, `V30` draft after promotion\./);
  assert.match(rewrittenPackageState, /"activeCanonVersion": "V29"/);
  assert.match(rewrittenPackageState, /"draftTargetVersion": "V30"/);
  assert.match(rewrittenPackageState, /"activeProvenAppendixPath": "BITCODE_SPEC_V29_PROVEN.md"/);
  assert.match(rewrittenPackageState, /"draftSpecPath": "BITCODE_SPEC_V30.md"/);
  assert.match(rewrittenPackageState, /"inheritedCanonSurfaceLabel": "V16\/V17\/V18\/V19\/V20\/V21\/V22\/V23\/V24\/V25\/V26\/V27\/V28"/);
});

test('V29 spec-family promotion preparation rewrites status truth and promoted parity judgments', async () => {
  const fixtureRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'bitcode-spec-family-v29-'));
  const status = [
    '## Status',
    '',
    '- Current canonical/latest target: `V28`',
    '- Source parity state: draft',
    '- V29 state: draft implementation underway'
  ].join('\n');
  const parity = [
    '# Bitcode Spec V29 Parity Matrix',
    '',
    status,
    '',
    '## V29 implementation matrix',
    '',
    '| Area | Gate | Source evidence | Judgment | Closure requirement |',
    '| --- | --- | --- | --- | --- |',
    '| Promotion readiness | Gate 10 | promotion workflow | drafted | Generated canon can be committed. |',
    '',
    '## V29 implementation checklist',
    '',
    '| Area | Required V29 result | Judgment |',
    '| --- | --- | --- |',
    '| Gate 10 promotion readiness | promotion dry-run and generated-canon automation | drafted |',
    '',
    '## Other table',
    '',
    '| Area | Judgment |',
    '| --- | --- |',
    '| Draft-only audit | drafted |'
  ].join('\n');
  /** @type {Array<[string, string]>} */
  const files = [
    ['BITCODE_SPEC_V29.md', `# Bitcode Spec V29\n\n${status}\n\n## Body\nx\n`],
    ['BITCODE_SPEC_V29_DELTA.md', `# Bitcode Spec V29 Delta\n\n${status}\n\n## Body\nx\n`],
    ['BITCODE_SPEC_V29_NOTES.md', `# Bitcode Spec V29 Notes\n\n${status}\n\n## Body\nx\n`],
    ['BITCODE_SPEC_V29_PARITY_MATRIX.md', parity]
  ];
  await Promise.all(files.map(([relativePath, content]) => fs.writeFile(path.join(fixtureRoot, relativePath), content, 'utf8')));

  const output = execFileSync(process.execPath, [
    prepareSpecFamilyScriptPath,
    '--version',
    'V29',
    '--commit',
    'deadbeef',
    '--repo-root',
    fixtureRoot
  ], {
    cwd: fixtureRoot,
    encoding: 'utf8'
  });

  assert.match(output, /Prepared V29 hand-authored spec family for promotion with proof-source commit deadbeef/);

  for (const relativePath of files.map(([relativePath]) => relativePath)) {
    const rewritten = await fs.readFile(path.join(fixtureRoot, relativePath), 'utf8');
    assert.match(rewritten, /Current canonical\/latest target: `V29`/);
    assert.match(rewritten, /Canonical proof-source commit: `deadbeef`/);
    const versionStateLine = rewritten.match(/^- V29 state: (.+)$/m);
    const stateValue = versionStateLine?.[1];
    if (typeof stateValue !== 'string') {
      throw new Error(`Missing V29 state line in ${relativePath}`);
    }
    assert.doesNotMatch(stateValue, /draft|pending|in progress/i);
  }

  const rewrittenParity = await fs.readFile(path.join(fixtureRoot, 'BITCODE_SPEC_V29_PARITY_MATRIX.md'), 'utf8');
  assert.match(rewrittenParity, /\| Promotion readiness \| Gate 10 \| promotion workflow \| closed \|/);
  assert.match(rewrittenParity, /\| Gate 10 promotion readiness \| promotion dry-run and generated-canon automation \| closed \|/);
  assert.match(rewrittenParity, /\| Draft-only audit \| drafted \|/);
});

test('V25 promotion dry-run includes drift detection and runtime posture preparation', () => {
  const output = execFileSync(process.execPath, [
    promoteScriptPath,
    '--version',
    'V25',
    '--commit',
    'HEAD',
    '--dry-run'
  ], {
    cwd: repoRoot,
    encoding: 'utf8'
  });

  assert.match(output, /V25 canonical promotion plan/);
  assert.match(output, /check-bitcode-spec-family\.mjs --version V25 --mode draft --current-target V24/);
  assert.match(output, /check-bitcode-canonical-inputs\.mjs --current-target V24/);
  assert.match(output, /check-bitcode-canon-posture-drift\.mjs --active-canon V24 --draft-target V25/);
  assert.match(output, /prepare-bitcode-spec-family-promotion\.mjs --version V25 --commit/);
  assert.match(output, /prepare-bitcode-runtime-canon-promotion\.mjs --version V25 --next-draft V26/);
  assert.match(output, /generate-bitcode-proven\.mjs --version V25 .*_legacy\/ENGI_SPEC_V25_PROVEN\.md/);
  assert.match(output, /check-bitcode-canonical-inputs\.mjs --current-target V25/);
  assert.match(output, /check-bitcode-spec-family\.mjs --version V25 --mode promoted/);
  assert.match(output, /check-bitcode-canon-posture-drift\.mjs --active-canon V25 --draft-target V26/);
  assert.match(output, /Promotes V25 as/);
});
