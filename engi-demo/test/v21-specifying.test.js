import test from 'node:test';
import assert from 'node:assert/strict';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { promises as fs } from 'node:fs';
import { fileURLToPath } from 'node:url';

const repoRoot = fileURLToPath(new URL('../..', import.meta.url));
const scriptPath = fileURLToPath(new URL('../../scripts/check-engi-spec-family.mjs', import.meta.url));
const canonicalInputsScriptPath = fileURLToPath(new URL('../../scripts/check-engi-canonical-inputs.mjs', import.meta.url));

/**
 * @param {string[]} args
 * @param {string} cwd
 */
function runCheck(args, cwd) {
  return execFileSync(process.execPath, [scriptPath, ...args], {
    cwd,
    encoding: 'utf8'
  });
}

/**
 * @param {string[]} args
 * @param {string} cwd
 */
function runCheckFailure(args, cwd) {
  try {
    runCheck(args, cwd);
    throw new Error('Expected spec-family check to fail.');
  } catch (error) {
    if (!(error instanceof Error) || !('stderr' in error)) throw error;
    return String(error.stderr || error.message);
  }
}

/**
 * @param {string[]} args
 * @param {string} cwd
 */
function runCanonicalInputCheck(args, cwd) {
  return execFileSync(process.execPath, [canonicalInputsScriptPath, ...args], {
    cwd,
    encoding: 'utf8'
  });
}

/**
 * @param {string[]} args
 * @param {string} cwd
 */
function runCanonicalInputCheckFailure(args, cwd) {
  try {
    runCanonicalInputCheck(args, cwd);
    throw new Error('Expected canonical input check to fail.');
  } catch (error) {
    if (!(error instanceof Error) || !('stderr' in error)) throw error;
    return String(error.stderr || error.message);
  }
}

/**
 * @param {{
 *   version?: string,
 *   pointerVersion?: string,
 *   currentTarget?: string,
 *   state?: string,
 *   includeDomainModel?: boolean,
 *   includeTotalityMatrix?: boolean,
 *   includePromptCompletenessFamily?: boolean
 * }} [options]
 */
async function writeFixture(options = {}) {
  const version = options.version || 'V21';
  const pointerVersion = options.pointerVersion || 'V20';
  const currentTarget = options.currentTarget || pointerVersion;
  const state = options.state || 'full-spec drafting and first source-side specifying implementation are in progress';
  const includeDomainModel = options.includeDomainModel !== false;
  const includeTotalityMatrix = options.includeTotalityMatrix !== false;
  const includePromptCompletenessFamily = options.includePromptCompletenessFamily !== false;

  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'engi-spec-family-'));
  await fs.writeFile(path.join(root, 'ENGI_SPEC.txt'), `${pointerVersion}\n`, 'utf8');
  await fs.writeFile(
    path.join(root, 'ENGI_SPECIFYING.md'),
    '# ENGI Specifying\n\nThis file is the one complete specifying standard.\n',
    'utf8'
  );
  await fs.writeFile(
    path.join(root, 'ENGI_SPEC_TEMPLATEGUIDE.md'),
    'Superseded by: `/tmp/ENGI_SPECIFYING.md`\n',
    'utf8'
  );

  const spec = [
    '# ENGI Spec V21',
    '',
    '## Status',
    '',
    `- Current canonical/latest target: \`${currentTarget}\``,
    `- ${version} state: ${state}`,
    '',
    '## Version executive summary',
    'x',
    '',
    '## Canonical ENGI executive summary',
    'x',
    '',
    '## V21 source-of-truth hierarchy',
    'x',
    '',
    '## V21 full-system, re-implementation, and audit rule',
    'x',
    '',
    '## V21 totality and precision enforcement rule',
    'x',
    '',
    '## V21 system goals, non-goals, and design principles',
    'x',
    '',
    '## V21 system architecture and layer boundaries',
    'x',
    ''
  ];
  if (includeDomainModel) {
    spec.push('## V21 canonical domain model', 'x', '');
  }
  spec.push(
    '## V21 whole ENGI operator chain',
    'x',
    '',
    '## V21 canonical subsystem surfaces',
    'x',
    '',
    '## V21 proof-family canon',
    'x',
    '',
    '## V21 generated canon',
    'x',
    '',
    '## V21 validation canon',
    'x',
    '',
    '## V21 promotion canon',
    'x',
    '',
    '## V21 appendices and canonical supporting material',
    'x',
    '',
    '## V21 accepted boundaries and reopen conditions',
    'x',
    '',
    '### Appendix A. Canonical type and surface catalog',
    'x',
    '',
    '### Appendix B. Proof family closure catalog',
    'x',
    '',
    '#### B.1 Inference-synthesis',
    'x',
    ''
  );
  if (includePromptCompletenessFamily) {
    spec.push('#### B.2 Prompt-completeness', 'x', '');
  }
  spec.push(
    '#### B.3 Static-code-analysis',
    'x',
    '',
    '#### B.4 Verification-decisions',
    'x',
    '',
    '#### B.5 Selection-and-materialization',
    'x',
    '',
    '#### B.6 Authorization-and-sensitive-flow',
    'x',
    '',
    '#### B.7 Settlement-source-to-shares',
    'x',
    '',
    '#### B.8 Disclosure-boundary',
    'x',
    '',
    '#### B.9 Proof-contract',
    'x',
    '',
    '### Appendix C. Generated artifact contract catalog',
    'x',
    '',
    '#### C.1 Inherited V19 reproducible-canon artifacts',
    'x',
    '',
    '#### C.2 Inherited V20 operator-quality artifacts',
    'x',
    '',
    '#### C.3 Shared generated-artifact fields',
    'x',
    '',
    '#### C.4 Artifact-specific generated payload fields',
    'x',
    '',
    '#### C.5 Artifact confidentiality and disclosability taxonomy',
    'x',
    '',
    '### Appendix D. Validation and checking gate catalog',
    'x',
    '',
    '### Appendix E. Current canonical source map',
    'x',
    ''
  );
  if (includeTotalityMatrix) {
    spec.push(
      '### Appendix F. Subsystem totality and derivability matrix',
      '| Subsystem or concern | Current canonical contracts or artifacts | Current closure basis | Generated/runtime evidence | Validating commands | Current source basis |',
      '| --- | --- | --- | --- | --- | --- |',
      '| repo supply and depositing | x | x | x | x | x |',
      '| needing and measured demand | x | x | x | x | x |',
      '| prompt/inference/evaluator ownership | x | x | x | x | x |',
      '| depositing-to-needing fit | x | x | x | x | x |',
      '| recall and ranking | x | x | x | x | x |',
      '| verification decisions | x | x | x | x | x |',
      '| selection and materialization | x | x | x | x | x |',
      '| branch artifacts and deliverables | x | x | x | x | x |',
      '| identity, authority, signing, and policy | x | x | x | x | x |',
      '| sensitive data and confidentiality flows | x | x | x | x | x |',
      '| projection, disclosure, and redaction | x | x | x | x | x |',
      '| proof families, members, theorems, witnesses, and replay | x | x | x | x | x |',
      '| settlement, source-to-shares, journals, and exact accounting | x | x | x | x | x |',
      '| telemetry, persistence, state, and failure semantics | x | x | x | x | x |',
      '| host/runtime capability truth | x | x | x | x | x |',
      '| operator experience and pedagogy | x | x | x | x | x |',
      '| validation and test stack | x | x | x | x | x |',
      '| generated artifacts and canonical promotion | x | x | x | x | x |',
      ''
    );
  }
  spec.push(
    '## V21 completion condition',
    'x',
    ''
  );
  await fs.writeFile(path.join(root, `ENGI_SPEC_${version}.md`), spec.join('\n'), 'utf8');

  const delta = [
    `# ENGI Spec ${version} Delta`,
    '',
    '## Status',
    '',
    `- Current canonical/latest target: \`${currentTarget}\``,
    `- ${version} state: ${state}`,
    '',
    `## Why ${version} exists`,
    'x',
    '',
    `## Accepted ${version} decisions`,
    'x',
    '',
    '## Explicitly deferred items',
    'x',
    '',
    '## Pre-Implementation Sequence',
    'x',
    '',
    '## Commit-Body Direction',
    'x',
    ''
  ].join('\n');
  await fs.writeFile(path.join(root, `ENGI_SPEC_${version}_DELTA.md`), delta, 'utf8');

  const parity = [
    `# ENGI Spec ${version} Parity Matrix`,
    '',
    '## Status',
    '',
    `- Current canonical/latest target: \`${currentTarget}\``,
    `- ${version} state: ${state}`,
    '',
    '## Purpose',
    'x',
    '',
    '## Audit basis',
    'x',
    '',
    `## ${version} implementation matrix`,
    'x',
    '',
    `## ${version} accepted boundaries`,
    'x',
    '',
    `## ${version} completion condition for the current pass`,
    'x',
    ''
  ].join('\n');
  await fs.writeFile(path.join(root, `ENGI_SPEC_${version}_PARITY_MATRIX.md`), parity, 'utf8');

  return root;
}

/**
 * @param {{ missing?: 'proven' | 'parity' | 'artifact' }} [options]
 */
async function writeCanonicalInputFixture(options = {}) {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'engi-canonical-inputs-'));
  await fs.mkdir(path.join(root, '.engi'), { recursive: true });
  await fs.writeFile(path.join(root, 'ENGI_SPEC.txt'), 'V20\n', 'utf8');
  await fs.writeFile(path.join(root, 'ENGI_SPEC_V20.md'), '# ENGI Spec V20\n', 'utf8');
  if (options.missing !== 'proven') {
    await fs.writeFile(path.join(root, 'ENGI_SPEC_V20_PROVEN.md'), '# ENGI Spec V20 Proven\n', 'utf8');
  }
  if (options.missing !== 'parity') {
    await fs.writeFile(path.join(root, 'ENGI_SPEC_V20_SYSTEM_PARITY_MATRIX.md'), '# ENGI Spec V20 System Parity Matrix\n', 'utf8');
  }

  const artifactPaths = [
    '.engi/v20-operator-acceptance-transcript.json',
    '.engi/v20-visual-regression-report.json',
    '.engi/v20-accessibility-report.json',
    '.engi/v20-performance-budget-report.json',
    '.engi/v20-projection-quality-smoke-matrix.json',
    '.engi/v20-quality-summary.json'
  ];
  for (const relativePath of artifactPaths) {
    if (options.missing === 'artifact' && relativePath.endsWith('v20-quality-summary.json')) continue;
    await fs.writeFile(path.join(root, relativePath), '{}\n', 'utf8');
  }

  return root;
}

test('real V21 draft spec family passes structural draft-mode checking', () => {
  const output = runCheck(['--version', 'V21', '--mode', 'draft', '--current-target', 'V20'], repoRoot);
  assert.match(output, /ENGI spec family ok for V21/);
  assert.match(output, /mode=draft/);
});

test('real canonical input set for current V20 canon passes input checking', () => {
  const output = runCanonicalInputCheck(['--current-target', 'V20'], repoRoot);
  assert.match(output, /ENGI canonical inputs ok for V20/);
  assert.match(output, /artifacts=6/);
});

test('promoted-mode checking fails on stale draft language', async () => {
  const fixtureRoot = await writeFixture({
    pointerVersion: 'V21',
    currentTarget: 'V21',
    state: 'draft implementation pass in progress; canonical promotion remains pending'
  });
  const stderr = runCheckFailure(['--version', 'V21', '--mode', 'promoted', '--repo-root', fixtureRoot], fixtureRoot);
  assert.match(stderr, /still contains draft\/pending language/i);
});

test('structural checking fails when the main spec omits a required whole-system section', async () => {
  const fixtureRoot = await writeFixture({
    includeDomainModel: false
  });
  const stderr = runCheckFailure(['--version', 'V21', '--mode', 'draft', '--repo-root', fixtureRoot], fixtureRoot);
  assert.match(stderr, /missing required section containing "canonical domain model"/i);
});

test('structural checking fails when the main spec omits the subsystem totality matrix appendix', async () => {
  const fixtureRoot = await writeFixture({
    includeTotalityMatrix: false
  });
  const stderr = runCheckFailure(['--version', 'V21', '--mode', 'draft', '--repo-root', fixtureRoot], fixtureRoot);
  assert.match(stderr, /missing required appendix-grade section containing "Appendix F\. Subsystem totality and derivability matrix"/i);
});

test('structural checking fails when the proof-family catalog omits a required family', async () => {
  const fixtureRoot = await writeFixture({
    includePromptCompletenessFamily: false
  });
  const stderr = runCheckFailure(['--version', 'V21', '--mode', 'draft', '--repo-root', fixtureRoot], fixtureRoot);
  assert.match(stderr, /proof-family catalog is missing "Prompt-completeness"/i);
});

test('canonical input checking fails when the active proven appendix is missing', async () => {
  const fixtureRoot = await writeCanonicalInputFixture({
    missing: 'proven'
  });
  const stderr = runCanonicalInputCheckFailure(['--repo-root', fixtureRoot], fixtureRoot);
  assert.match(stderr, /Missing canonical input file: ENGI_SPEC_V20_PROVEN\.md/i);
});

test('promoted-mode checking passes for a clean V21+ fixture', async () => {
  const fixtureRoot = await writeFixture({
    pointerVersion: 'V21',
    currentTarget: 'V21',
    state: 'canonical promotion complete; spec family and generated canon aligned'
  });
  const output = runCheck(['--version', 'V21', '--mode', 'promoted', '--repo-root', fixtureRoot], fixtureRoot);
  assert.match(output, /ENGI spec family ok for V21/);
  assert.match(output, /mode=promoted/);
});

test('V21 promotion dry-run includes structural spec-family checks and V21 appendix generation', () => {
  const promoteScriptPath = fileURLToPath(new URL('../../scripts/promote-engi-canon.mjs', import.meta.url));
  const output = execFileSync(process.execPath, [
    promoteScriptPath,
    '--version',
    'V21',
    '--commit',
    'HEAD',
    '--dry-run'
  ], {
    cwd: repoRoot,
    encoding: 'utf8'
  });

  assert.match(output, /V21 canonical promotion plan/);
  assert.match(output, /check-engi-spec-family\.mjs --version V21 --mode draft --current-target V20/);
  assert.match(output, /check-engi-canonical-inputs\.mjs --current-target V20/);
  assert.match(output, /generate-engi-proven\.mjs --version V21/);
  assert.match(output, /check-engi-spec-family\.mjs --version V21 --mode promoted/);
  assert.match(output, /Promotes V21 as specifying-canon hardening for ENGI/);
  assert.match(output, /SPEC, SPEC_DELTA, and SPEC_PARITY_MATRIX are the required hand-authored canonical system-spec files for V21\+/);
  assert.match(output, /appendix-grade totality carriers in SPEC for canonical type and surface catalog/);
  assert.match(output, /Complete specifying authority: ENGI_SPECIFYING\.md is the only complete guide; ENGI_SPEC_TEMPLATEGUIDE\.md is compatibility-only/);
  assert.match(output, /Canonical-input validator: scripts\/check-engi-canonical-inputs\.mjs now validates the active pointed canon input family and V21 promotion plan includes it pre-mutation/);
  assert.doesNotMatch(output, /actual canonical promotion remains pending/);
});
