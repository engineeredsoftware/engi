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
const preparePromotionScriptPath = fileURLToPath(new URL('../../scripts/prepare-engi-spec-family-promotion.mjs', import.meta.url));

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
 * @param {string[]} args
 * @param {string} cwd
 */
function runPreparePromotion(args, cwd) {
  return execFileSync(process.execPath, [preparePromotionScriptPath, ...args], {
    cwd,
    encoding: 'utf8'
  });
}

/**
 * @param {{
 *   version?: string,
 *   pointerVersion?: string,
 *   currentTarget?: string,
 *   state?: string,
 *   includeDomainModel?: boolean,
 *   includeTotalityMatrix?: boolean,
 *   includePromptCompletenessFamily?: boolean,
 *   includeV21ArtifactPaths?: boolean,
 *   includeGeneratedArtifactInventory?: boolean,
 *   includeCanonicalProofSourceCommit?: boolean,
 *   includeCrossProductAppendix?: boolean,
 *   includeFailClosedAppendix?: boolean,
 *   includeDeliverableAppendix?: boolean,
 *   includeCrossProductDetails?: boolean,
 *   includeFailClosedDetails?: boolean,
 *   includeDeliverableDetails?: boolean,
 *   parityJudgment?: string
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
  const includeV21ArtifactPaths = options.includeV21ArtifactPaths !== false;
  const includeGeneratedArtifactInventory = options.includeGeneratedArtifactInventory !== false;
  const includeCanonicalProofSourceCommit = options.includeCanonicalProofSourceCommit === true;
  const includeCrossProductAppendix = options.includeCrossProductAppendix !== false;
  const includeFailClosedAppendix = options.includeFailClosedAppendix !== false;
  const includeDeliverableAppendix = options.includeDeliverableAppendix !== false;
  const includeCrossProductDetails = options.includeCrossProductDetails !== false;
  const includeFailClosedDetails = options.includeFailClosedDetails !== false;
  const includeDeliverableDetails = options.includeDeliverableDetails !== false;
  const parityJudgment = options.parityJudgment || (state.includes('canonical promotion complete') ? 'closed' : 'drafted');

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
    '- Prior canonical anchor: /tmp/ENGI_SPEC_V20.md',
    '- Prior generated proof appendix: /tmp/ENGI_SPEC_V20_PROVEN.md'
  ];
  if (includeGeneratedArtifactInventory) {
    spec.push('- Generated structured artifact inventory: active .engi/v19-* and .engi/v20-* generated canon plus draft-time .engi/v21-* specifying artifacts');
  }
  spec.push(
    `- Current canonical/latest target: \`${currentTarget}\``,
  );
  if (includeCanonicalProofSourceCommit) {
    spec.push('- Canonical proof-source commit: `deadbeef`');
  }
  spec.push(
    '- Source parity state: first source-side specifying implementation now exists',
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
  );
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
    '#### B.0 Exact proof-family inventory matrix',
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
    '#### C.0 Exact generated-artifact inventory matrix',
    'x',
    '',
    '#### C.1 Inherited V19 reproducible-canon artifacts',
    'x',
    '',
    '#### C.2 Inherited V20 operator-quality artifacts',
    'x',
    '',
    '#### C.3 V21 specifying generated artifacts',
    'x',
    ''
  );
  if (includeV21ArtifactPaths) {
    spec.push(
      '.engi/v21-spec-family-report.json',
      '.engi/v21-canonical-input-report.json',
      ''
    );
  }
  spec.push(
    '#### C.4 Shared generated-artifact fields',
    'x',
    '',
    '#### C.5 Artifact-specific generated payload fields',
    'x',
    '',
    '#### C.6 Artifact confidentiality and disclosability taxonomy',
    'x',
    '',
    '#### C.7 V21 generated appendix posture',
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
    '### Appendix G. Canonical file-family and promotion contract catalog',
    'x',
    '',
    '### Appendix H. Operator surface and quality contract catalog',
    'x',
    ''
  );
  if (includeCrossProductAppendix) {
    spec.push(
      '### Appendix I. Scenario, workflow, and cross-product contract catalog',
      ...(includeCrossProductDetails
        ? [
            '| Coverage slice | Current members | Current contract meaning |',
            '| --- | --- | --- |',
            '| realization profiles | Targeted deposit, Normalization deposit | active profile meanings stay explicit |',
            '| scenario ids | auth-issuer-rollback, privacy-boundary-proof-export, polyglot-gateway-benchmark-remediation, auth-many-asset-normalization | current scenario inventory stays explicit |',
            '| branch modes | patch, context | branch-mode-dependent proof and operator closure stays explicit |',
            '| projection principals | public, buyer, reviewer, internal | disclosure boundaries stay principal-bounded |',
            '| operator workflow stages | Openly writable, Measurably readable, Provable, Valuable | gold-path operator truth stays staged and auditable |'
          ]
        : ['x']),
      ''
    );
  }
  if (includeFailClosedAppendix) {
    spec.push(
      '### Appendix J. Fail-closed contract and error posture matrix',
      ...(includeFailClosedDetails
        ? [
            '| Posture | Trigger | Fail-closed meaning |',
            '| --- | --- | --- |',
            '| invalid deposit | no raw or repo-authenticated input survives intake | invalid deposit blocks branch creation |',
            '| prompt contract incompleteness | placeholder binding or declared field drift | prompt surface is not admissible into proof closure |',
            '| parsed-envelope inadmissibility | parse or schema drift | parsed completion is rejected rather than silently normalized |',
            '| no-survivor asset pack | verification or selection removes every candidate | no branch or settlement surfaces may claim success |',
            '| authorization denial | principal/action pair lacks policy closure | private material stays closed and action is refused |',
            '| public projection overexposure | non-disclosable artifacts appear in public projection | disclosure proof fails and public surface must stay bounded |',
            '| settlement conservation drift | journal or allocation no longer conserves exactly | settlement proof is blocking-failed |',
            '| stale promoted status truth | promoted file family still claims draft or pending posture | canonical promotion is blocked |'
          ]
        : ['x']),
      ''
    );
  }
  if (includeDeliverableAppendix) {
    spec.push(
      '### Appendix K. Source-bearing deliverable and artifact contract catalog',
      ...(includeDeliverableDetails
        ? [
            '| Artifact path | Current role |',
            '| --- | --- |',
            '| `.engi/asset-pack.lock.json` | selected asset-pack lock witness |',
            '| `.engi/selected-source-material.json` | selected source-material manifest |',
            '| `.engi/verification-report.json` | verification-decision carrier |',
            '| `.engi/source-to-shares.json` | settlement contribution/allocation carrier |',
            '| `.engi/projection-policy.json` | projection/disclosure policy contract |',
            '| `.engi/system-proof-bundle.json` | whole-system proof bundle |',
            '| `ENGI_SPEC_V21_PROVEN.md` | generated proof appendix |'
          ]
        : ['x']),
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
    '- Prior canonical anchor: /tmp/ENGI_SPEC_V20.md',
    '- Prior generated proof appendix: /tmp/ENGI_SPEC_V20_PROVEN.md'
  ];
  if (includeGeneratedArtifactInventory) {
    delta.push('- Generated structured artifact inventory: active .engi/v19-* and .engi/v20-* generated canon plus draft-time .engi/v21-* specifying artifacts');
  }
  delta.push(
    `- Current canonical/latest target: \`${currentTarget}\``,
  );
  if (includeCanonicalProofSourceCommit) {
    delta.push('- Canonical proof-source commit: `deadbeef`');
  }
  delta.push(
    '- Source parity state: first source-side specifying implementation now exists',
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
  );
  await fs.writeFile(path.join(root, `ENGI_SPEC_${version}_DELTA.md`), delta.join('\n'), 'utf8');

  const parity = [
    `# ENGI Spec ${version} Parity Matrix`,
    '',
    '## Status',
    '',
    '- Prior canonical anchor: /tmp/ENGI_SPEC_V20.md',
    '- Prior generated proof appendix: /tmp/ENGI_SPEC_V20_PROVEN.md'
  ];
  if (includeGeneratedArtifactInventory) {
    parity.push('- Generated structured artifact inventory: active .engi/v19-* and .engi/v20-* generated canon plus draft-time .engi/v21-* specifying artifacts');
  }
  parity.push(
    `- Current canonical/latest target: \`${currentTarget}\``,
  );
  if (includeCanonicalProofSourceCommit) {
    parity.push('- Canonical proof-source commit: `deadbeef`');
  }
  parity.push(
    '- Source parity state: first source-side specifying implementation now exists',
    `- ${version} state: ${state}`,
    '',
    '## Purpose',
    'x',
    '',
    '## Audit basis',
    'x',
    '',
    `## ${version} implementation matrix`,
    '| Area | Current source truth | V21 implementation expectation | Closure signal | Judgment |',
    '| --- | --- | --- | --- | --- |',
    `| Required hand-authored canonical file family | x | x | x | ${parityJudgment} |`,
    `| Canonical-input validator | x | x | x | ${parityJudgment} |`,
    '',
    `## ${version} implementation checklist`,
    '| Area | Required V21 result | Current judgment |',
    '| --- | --- | --- |',
    `| Specifying standard | x | ${parityJudgment} |`,
    `| V21 promotion support | x | ${parityJudgment} |`,
    '',
    `## ${version} accepted boundaries`,
    'x',
    '',
    `## ${version} completion condition for the current pass`,
    'x',
    ''
  );
  await fs.writeFile(path.join(root, `ENGI_SPEC_${version}_PARITY_MATRIX.md`), parity.join('\n'), 'utf8');

  return root;
}

/**
 * @param {{ version?: 'V20' | 'V21', missing?: 'proven' | 'parity' | 'artifact' }} [options]
 */
async function writeCanonicalInputFixture(options = {}) {
  const version = options.version || 'V20';
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'engi-canonical-inputs-'));
  await fs.mkdir(path.join(root, '.engi'), { recursive: true });
  await fs.writeFile(path.join(root, 'ENGI_SPEC.txt'), `${version}\n`, 'utf8');
  await fs.writeFile(path.join(root, `ENGI_SPEC_${version}.md`), `# ENGI Spec ${version}\n`, 'utf8');
  if (options.missing !== 'proven') {
    await fs.writeFile(path.join(root, `ENGI_SPEC_${version}_PROVEN.md`), `# ENGI Spec ${version} Proven\n`, 'utf8');
  }
  if (options.missing !== 'parity') {
    const parityPath = version === 'V21'
      ? `ENGI_SPEC_${version}_PARITY_MATRIX.md`
      : `ENGI_SPEC_${version}_SYSTEM_PARITY_MATRIX.md`;
    await fs.writeFile(path.join(root, parityPath), `# ENGI Spec ${version} Parity Matrix\n`, 'utf8');
  }

  const artifactPaths = version === 'V21'
    ? [
        '.engi/v21-spec-family-report.json',
        '.engi/v21-canonical-input-report.json'
      ]
    : [
        '.engi/v20-operator-acceptance-transcript.json',
        '.engi/v20-visual-regression-report.json',
        '.engi/v20-accessibility-report.json',
        '.engi/v20-performance-budget-report.json',
        '.engi/v20-projection-quality-smoke-matrix.json',
        '.engi/v20-quality-summary.json'
      ];
  for (const relativePath of artifactPaths) {
    if (options.missing === 'artifact' && relativePath === artifactPaths[artifactPaths.length - 1]) continue;
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

test('structural checking fails when the scenario and cross-product appendix is omitted', async () => {
  const fixtureRoot = await writeFixture({
    includeCrossProductAppendix: false
  });
  const stderr = runCheckFailure(['--version', 'V21', '--mode', 'draft', '--repo-root', fixtureRoot], fixtureRoot);
  assert.match(stderr, /missing required appendix-grade section containing "Appendix I\. Scenario, workflow, and cross-product contract catalog"/i);
});

test('structural checking fails when the fail-closed appendix is omitted', async () => {
  const fixtureRoot = await writeFixture({
    includeFailClosedAppendix: false
  });
  const stderr = runCheckFailure(['--version', 'V21', '--mode', 'draft', '--repo-root', fixtureRoot], fixtureRoot);
  assert.match(stderr, /missing required appendix-grade section containing "Appendix J\. Fail-closed contract and error posture matrix"/i);
});

test('structural checking fails when the deliverable/artifact appendix is omitted', async () => {
  const fixtureRoot = await writeFixture({
    includeDeliverableAppendix: false
  });
  const stderr = runCheckFailure(['--version', 'V21', '--mode', 'draft', '--repo-root', fixtureRoot], fixtureRoot);
  assert.match(stderr, /missing required appendix-grade section containing "Appendix K\. Source-bearing deliverable and artifact contract catalog"/i);
});

test('structural checking fails when the scenario/workflow appendix lacks required current coverage truth', async () => {
  const fixtureRoot = await writeFixture({
    includeCrossProductDetails: false
  });
  const stderr = runCheckFailure(['--version', 'V21', '--mode', 'draft', '--repo-root', fixtureRoot], fixtureRoot);
  assert.match(stderr, /scenario\/workflow cross-product appendix is missing "auth-issuer-rollback"/i);
});

test('structural checking fails when the fail-closed appendix lacks required current posture truth', async () => {
  const fixtureRoot = await writeFixture({
    includeFailClosedDetails: false
  });
  const stderr = runCheckFailure(['--version', 'V21', '--mode', 'draft', '--repo-root', fixtureRoot], fixtureRoot);
  assert.match(stderr, /fail-closed appendix is missing "invalid deposit"/i);
});

test('structural checking fails when the deliverable appendix lacks required artifact truth', async () => {
  const fixtureRoot = await writeFixture({
    includeDeliverableDetails: false
  });
  const stderr = runCheckFailure(['--version', 'V21', '--mode', 'draft', '--repo-root', fixtureRoot], fixtureRoot);
  assert.match(stderr, /deliverable\/artifact appendix is missing "\.engi\/asset-pack\.lock\.json"/i);
});

test('structural checking fails when the V21 generated-artifact catalog omits the version-local artifact paths', async () => {
  const fixtureRoot = await writeFixture({
    includeV21ArtifactPaths: false
  });
  const stderr = runCheckFailure(['--version', 'V21', '--mode', 'draft', '--repo-root', fixtureRoot], fixtureRoot);
  assert.match(stderr, /generated-artifact catalog is missing "\.engi\/v21-spec-family-report\.json"/i);
});

test('structural checking fails when the status block omits generated artifact inventory truth', async () => {
  const fixtureRoot = await writeFixture({
    includeGeneratedArtifactInventory: false
  });
  const stderr = runCheckFailure(['--version', 'V21', '--mode', 'draft', '--repo-root', fixtureRoot], fixtureRoot);
  assert.match(stderr, /status block is missing a Generated structured artifact inventory line/i);
});

test('structural checking fails when parity tables use unsupported judgment vocabulary', async () => {
  const fixtureRoot = await writeFixture({
    parityJudgment: 'done enough'
  });
  const stderr = runCheckFailure(['--version', 'V21', '--mode', 'draft', '--repo-root', fixtureRoot], fixtureRoot);
  assert.match(stderr, /uses unsupported judgment vocabulary/i);
});

test('canonical input checking fails when the active proven appendix is missing', async () => {
  const fixtureRoot = await writeCanonicalInputFixture({
    missing: 'proven'
  });
  const stderr = runCanonicalInputCheckFailure(['--repo-root', fixtureRoot], fixtureRoot);
  assert.match(stderr, /Missing canonical input file: ENGI_SPEC_V20_PROVEN\.md/i);
});

test('canonical input checking passes for a pointed V21 canon with the V21 specifying artifact pair', async () => {
  const fixtureRoot = await writeCanonicalInputFixture({
    version: 'V21'
  });
  const output = runCanonicalInputCheck(['--repo-root', fixtureRoot], fixtureRoot);
  assert.match(output, /ENGI canonical inputs ok for V21/);
  assert.match(output, /artifacts=2/);
});

test('canonical input checking fails when pointed V21 canon is missing one specifying artifact', async () => {
  const fixtureRoot = await writeCanonicalInputFixture({
    version: 'V21',
    missing: 'artifact'
  });
  const stderr = runCanonicalInputCheckFailure(['--repo-root', fixtureRoot], fixtureRoot);
  assert.match(stderr, /Missing canonical generated artifact: \.engi\/v21-canonical-input-report\.json/i);
});

test('promoted-mode checking passes for a clean V21+ fixture', async () => {
  const fixtureRoot = await writeFixture({
    pointerVersion: 'V21',
    currentTarget: 'V21',
    state: 'canonical promotion complete; spec family and generated canon aligned',
    includeCanonicalProofSourceCommit: true,
    parityJudgment: 'closed'
  });
  const output = runCheck(['--version', 'V21', '--mode', 'promoted', '--repo-root', fixtureRoot], fixtureRoot);
  assert.match(output, /ENGI spec family ok for V21/);
  assert.match(output, /mode=promoted/);
});

test('promoted-mode checking fails when parity tables still carry promotion-pending judgments', async () => {
  const fixtureRoot = await writeFixture({
    pointerVersion: 'V21',
    currentTarget: 'V21',
    state: 'canonical promotion complete; spec family and generated canon aligned',
    includeCanonicalProofSourceCommit: true,
    parityJudgment: 'implemented; promotion pending'
  });
  const stderr = runCheckFailure(['--version', 'V21', '--mode', 'promoted', '--repo-root', fixtureRoot], fixtureRoot);
  assert.match(stderr, /still carries non-closed promoted judgment/i);
});

test('V21 promotion preparation rewrites hand-authored status truth for promoted-mode closure', async () => {
  const fixtureRoot = await writeFixture({
    pointerVersion: 'V20',
    currentTarget: 'V20',
    state: 'full-spec drafting and source-side specifying implementation are in progress',
    parityJudgment: 'closed'
  });
  const output = runPreparePromotion(['--version', 'V21', '--commit', 'deadbeef', '--repo-root', fixtureRoot], fixtureRoot);
  assert.match(output, /Prepared V21 hand-authored spec family for promotion with proof-source commit deadbeef/);

  for (const relativePath of ['ENGI_SPEC_V21.md', 'ENGI_SPEC_V21_DELTA.md', 'ENGI_SPEC_V21_PARITY_MATRIX.md']) {
    const content = await fs.readFile(path.join(fixtureRoot, relativePath), 'utf8');
    assert.match(content, /Current canonical\/latest target: `V21`/);
    assert.match(content, /Canonical proof-source commit: `deadbeef`/);
    const versionStateLine = content.match(/^- V21 state: (.+)$/m);
    assert.ok(versionStateLine);
    assert.doesNotMatch(versionStateLine[1], /draft|pending|in progress/i);
  }

  const promotedOutput = runCheck(
    ['--version', 'V21', '--mode', 'promoted', '--repo-root', fixtureRoot, '--skip-pointer-check'],
    fixtureRoot
  );
  assert.match(promotedOutput, /ENGI spec family ok for V21/);
  assert.match(promotedOutput, /mode=promoted/);
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
  assert.match(output, /prepare-engi-spec-family-promotion\.mjs --version V21 --commit/);
  assert.match(output, /generate-engi-proven\.mjs --version V21/);
  assert.match(output, /check-engi-canonical-inputs\.mjs --current-target V21/);
  assert.match(output, /check-engi-spec-family\.mjs --version V21 --mode promoted/);
  assert.match(output, /Promotes V21 as specifying-canon hardening for ENGI/);
  assert.match(output, /SPEC, SPEC_DELTA, and SPEC_PARITY_MATRIX are the required hand-authored canonical system-spec files for V21\+/);
  assert.match(output, /appendix-grade totality carriers in SPEC for canonical type and surface catalog/);
  assert.match(output, /Complete specifying authority: ENGI_SPECIFYING\.md is the only complete guide; ENGI_SPEC_TEMPLATEGUIDE\.md is compatibility-only/);
  assert.match(output, /Canonical-input validator: scripts\/check-engi-canonical-inputs\.mjs now validates the active pointed canon input family and V21 promotion plan includes it pre-mutation/);
  assert.match(output, /Post-generation active-canon validation: scripts\/promote-engi-canon\.mjs now runs scripts\/check-engi-canonical-inputs\.mjs --current-target V21 after generation/);
  assert.doesNotMatch(output, /actual canonical promotion remains pending/);
});
