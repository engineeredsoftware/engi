import test from 'node:test';
import assert from 'node:assert/strict';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { promises as fs } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { ACTIVE_CANON_VERSION } from '../src/canon-posture.js';

const repoRoot = fileURLToPath(new URL('../..', import.meta.url));
const scriptPath = fileURLToPath(new URL('../../scripts/check-bitcode-spec-family.mjs', import.meta.url));
const canonicalInputsScriptPath = fileURLToPath(new URL('../../scripts/check-bitcode-canonical-inputs.mjs', import.meta.url));
const preparePromotionScriptPath = fileURLToPath(new URL('../../scripts/prepare-bitcode-spec-family-promotion.mjs', import.meta.url));

function projectLabel(version) {
  return 'Bitcode';
}

function expectedActiveCanonicalInputArtifactCount(version) {
  const expectedCountsByVersion = {
    V32: 13,
    V33: 12,
    V34: 12,
    V35: 0,
  };
  if (Object.hasOwn(expectedCountsByVersion, version)) {
    return expectedCountsByVersion[version];
  }
  const numeric = Number.parseInt(String(version || '').replace(/^V/u, ''), 10);
  if (!Number.isInteger(numeric)) return 3;
  if (numeric >= 32) return 13;
  if (numeric >= 30) return 4;
  if (numeric >= 27) return 0;
  if (numeric === 26) return 22;
  if (numeric >= 22) return 3;
  if (numeric === 21) return 2;
  return 6;
}

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
 * @param {string} heading
 * @param {string} proofArtifactPath
 */
function buildProofFamilyDetailBlock(heading, proofArtifactPath) {
  return [
    heading,
    `- proofArtifactPath: \`${proofArtifactPath}\``,
    '- members: `a`, `b`',
    '- theoremIds: `theorem.one`, `theorem.two`',
    '- replayStepIds: `replay.one`, `replay.two`',
    `- witnessArtifactPaths: \`${proofArtifactPath}\`, \`.bitcode/supporting-artifact.json\``,
    '- what it proves: x',
    '- how current closure is carried: x',
    '- current member closure criteria: `a` is closed only when artifact and replay truth are explicit; `b` is closed only when theorem evidence remains bounded and replayable',
    '- current member verdict shape: `memberId`, `passed`',
    '- current theorem-by-theorem closure reading: `theorem.one` closes through `replay.one`; `theorem.two` closes through `replay.two`',
    '- current theorem-to-replay grouping: `theorem.one` binds to `replay.one`; `theorem.two` binds to `replay.two`',
    '- minimum artifact/replay binding set: proof artifact, supporting artifact, `replay.one`, `replay.two`',
    '- current proof-object fields: `memberVerdicts`, `theoremVerdicts`, `artifactBindings`, `replaySteps`, `allTheoremsPassed`',
    '- generated-artifact and test bindings: `_PROVEN_`, matrices, tests',
    '- fail-closed conditions: x',
    ''
  ];
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
 *   includeSubsystemDetailLabels?: boolean,
 *   includeCrossProductAppendix?: boolean,
 *   includeFailClosedAppendix?: boolean,
 *   includeAssetPackAppendix?: boolean,
 *   includeCrossProductDetails?: boolean,
 *   includeFailClosedDetails?: boolean,
 *   includeAssetPackDetails?: boolean,
 *   includeProofFamilyDetailLabels?: boolean,
 *   includeGeneratedAppendixContract?: boolean,
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
  const includeSubsystemDetailLabels = options.includeSubsystemDetailLabels !== false;
  const includeCrossProductAppendix = options.includeCrossProductAppendix !== false;
  const includeFailClosedAppendix = options.includeFailClosedAppendix !== false;
  const includeAssetPackAppendix = options.includeAssetPackAppendix !== false;
  const includeCrossProductDetails = options.includeCrossProductDetails !== false;
  const includeFailClosedDetails = options.includeFailClosedDetails !== false;
  const includeAssetPackDetails = options.includeAssetPackDetails !== false;
  const includeProofFamilyDetailLabels = options.includeProofFamilyDetailLabels !== false;
  const includeGeneratedAppendixContract = options.includeGeneratedAppendixContract !== false;
  const parityJudgment = options.parityJudgment || (state.includes('canonical promotion complete') ? 'closed' : 'drafted');

  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'bitcode-spec-family-'));
  const legacyRoot = path.join(root, '_legacy');
  await fs.mkdir(legacyRoot, { recursive: true });
  await fs.writeFile(path.join(root, 'ENGI_SPEC.txt'), `${pointerVersion}\n`, 'utf8');
  await fs.writeFile(
    path.join(legacyRoot, 'ENGI_SPECIFYING.md'),
    '# ENGI Specifying\n\nThis file is the one complete specifying standard.\n',
    'utf8'
  );
  await fs.writeFile(
    path.join(legacyRoot, 'ENGI_SPEC_TEMPLATEGUIDE.md'),
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
    spec.push('- Generated structured artifact inventory: active .bitcode/v19-* and .bitcode/v20-* generated canon plus draft-time .bitcode/v21-* specifying artifacts');
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
    '## Canonical Bitcode executive summary',
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
    '## V21 whole Bitcode operator chain',
    'x',
    '',
    '## V21 canonical subsystem surfaces',
  );
  const subsystemBlocks = [
    '### Depositing and asset supply',
    '### Reading and prompt/inference ownership',
    '### Fit, recall, ranking, and verification',
    '### Selection and materialization',
    '### Identity, authorization, and sensitive flow',
    '### Disclosure and projection',
    '### Settlement and exact accounting',
    '### Proof contract, witnesses, and replay'
  ];
  for (const heading of subsystemBlocks) {
    spec.push(heading, 'Current canon requires:', 'x', '');
    spec.push('Current canonical objects and emitted artifacts:', 'x', '');
    if (includeSubsystemDetailLabels) {
      spec.push(
        'Current algorithms and derivation rules:',
        'x',
        '',
        'Current invariants and fail-closed conditions:',
        'x',
        '',
        'Current proof obligations:',
        'x',
        '',
        'Current source-bearing implementation basis:',
        'x',
        '',
        'Current validating commands and parity basis:',
        'x',
        '',
        'Current accepted boundaries:',
        'x',
        ''
      );
    } else {
      spec.push(
        'Current invariants and fail-closed conditions:',
        'x',
        ''
      );
    }
  }
  spec.push(
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
    '| proofFamily | proofArtifactPath | memberIds | theoremIds | replayStepIds | witnessArtifactPaths | Current source basis |',
    '| --- | --- | --- | --- | --- | --- | --- |',
    '| `inference-synthesis` | `.bitcode/inference-synthesis-proof.json` | `a`, `b` | `theorem.one`, `theorem.two` | `replay.one`, `replay.two` | `.bitcode/inference-synthesis-proof.json` | `engi-demo/src/canonical/read-measurement.js` |',
    '| `prompt-completeness` | `.bitcode/prompt-completeness-proof.json` | `a`, `b` | `theorem.one`, `theorem.two` | `replay.one`, `replay.two` | `.bitcode/prompt-completeness-proof.json` | `engi-demo/src/canonical/prompting.js` |',
    '| `static-code-analysis` | `.bitcode/static-measurement-proof.json` | `a`, `b` | `theorem.one`, `theorem.two` | `replay.one`, `replay.two` | `.bitcode/static-measurement-proof.json` | `engi-demo/src/canonical/evaluation-materialization.js` |',
    '| `verification-decisions` | `.bitcode/verification-decisions-proof.json` | `a`, `b` | `theorem.one`, `theorem.two` | `replay.one`, `replay.two` | `.bitcode/verification-decisions-proof.json` | `engi-demo/src/canonical/evaluation-materialization.js` |',
    '| `selection-and-materialization` | `.bitcode/selection-and-materialization-proof.json` | `a`, `b` | `theorem.one`, `theorem.two` | `replay.one`, `replay.two` | `.bitcode/selection-and-materialization-proof.json` | `engi-demo/src/canonical/proof-materialization.js` |',
    '| `authorization-and-sensitive-flow` | `.bitcode/authorization-and-sensitive-flow-proof.json` | `a`, `b` | `theorem.one`, `theorem.two` | `replay.one`, `replay.two` | `.bitcode/authorization-and-sensitive-flow-proof.json` | `engi-demo/src/canonical/proof-materialization.js` |',
    '| `settlement-source-to-shares` | `.bitcode/settlement-source-to-shares-proof.json` | `a`, `b` | `theorem.one`, `theorem.two` | `replay.one`, `replay.two` | `.bitcode/settlement-source-to-shares-proof.json` | `engi-demo/src/canonical/settlement.js` |',
    '| `disclosure-boundary` | `.bitcode/disclosure-boundary-proof.json` | `a`, `b` | `theorem.one`, `theorem.two` | `replay.one`, `replay.two` | `.bitcode/disclosure-boundary-proof.json` | `engi-demo/src/canonical/projections.js` |',
    '| `proof-contract` | `.bitcode/proof-contract.json` | `a`, `b` | `theorem.one`, `theorem.two` | `replay.one`, `replay.two` | `.bitcode/proof-contract.json` | `engi-demo/src/canonical/proof-annotations.js` |',
    ''
  );
  if (includeProofFamilyDetailLabels) {
    spec.push(...buildProofFamilyDetailBlock('#### B.1 Inference-synthesis', '.bitcode/inference-synthesis-proof.json'));
    if (includePromptCompletenessFamily) {
      spec.push(...buildProofFamilyDetailBlock('#### B.2 Prompt-completeness', '.bitcode/prompt-completeness-proof.json'));
    }
    spec.push(
      ...buildProofFamilyDetailBlock('#### B.3 Static-code-analysis', '.bitcode/static-measurement-proof.json'),
      ...buildProofFamilyDetailBlock('#### B.4 Verification-decisions', '.bitcode/verification-decisions-proof.json'),
      ...buildProofFamilyDetailBlock('#### B.5 Selection-and-materialization', '.bitcode/selection-and-materialization-proof.json'),
      ...buildProofFamilyDetailBlock('#### B.6 Authorization-and-sensitive-flow', '.bitcode/authorization-and-sensitive-flow-proof.json'),
      ...buildProofFamilyDetailBlock('#### B.7 Settlement-source-to-shares', '.bitcode/settlement-source-to-shares-proof.json'),
      ...buildProofFamilyDetailBlock('#### B.8 Disclosure-boundary', '.bitcode/disclosure-boundary-proof.json'),
      ...buildProofFamilyDetailBlock('#### B.9 Proof-contract', '.bitcode/proof-contract.json')
    );
  } else {
    spec.push('#### B.1 Inference-synthesis', 'x', '');
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
      ''
    );
  }
  spec.push(
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
      '.bitcode/v21-spec-family-report.json',
      '.bitcode/v21-canonical-input-report.json',
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
  );
  if (includeGeneratedAppendixContract) {
    spec.push(
      '#### C.8 Minimum generated appendix rendered contents',
      '- aggregate proof verdict',
      '- exact proof-family inventory',
      '- exact per-family member inventory',
      '- exact per-family theorem inventory',
      '- exact replay-step inventories and theorem bindings',
      '- witness artifact inventories',
      '- generated artifact inventories',
      '- scenario and run coverage matrices',
      '',
      '#### C.9 Canonical regeneration and fail-closed posture',
      '- proof-source commit',
      '- fail closed when required proof family is missing',
      ''
    );
  }
  spec.push(
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
      '| reading and measured demand | x | x | x | x | x |',
      '| prompt/inference/evaluator ownership | x | x | x | x | x |',
      '| deposit-to-read fit | x | x | x | x | x |',
      '| recall and ranking | x | x | x | x | x |',
      '| verification decisions | x | x | x | x | x |',
      '| selection and materialization | x | x | x | x | x |',
      '| branch artifacts and assetPackEvidence | x | x | x | x | x |',
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
  if (includeAssetPackAppendix) {
    spec.push(
      '### Appendix K. Source-bearing AssetPack and artifact contract catalog',
      ...(includeAssetPackDetails
        ? [
            '| Artifact path | Current role |',
            '| --- | --- |',
            '| `.bitcode/asset-pack.lock.json` | selected asset-pack lock witness |',
            '| `.bitcode/selected-source-material.json` | selected source-material manifest |',
            '| `.bitcode/verification-report.json` | verification-decision carrier |',
            '| `.bitcode/source-to-shares.json` | settlement contribution/allocation carrier |',
            '| `.bitcode/projection-policy.json` | projection/disclosure policy contract |',
            '| `.bitcode/system-proof-bundle.json` | whole-system proof bundle |',
            '| `_legacy/ENGI_SPEC_V21_PROVEN.md` | generated proof appendix |'
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
  await fs.writeFile(path.join(legacyRoot, `ENGI_SPEC_${version}.md`), spec.join('\n'), 'utf8');

  const delta = [
    `# ENGI Spec ${version} Delta`,
    '',
    '## Status',
    '',
    '- Prior canonical anchor: /tmp/ENGI_SPEC_V20.md',
    '- Prior generated proof appendix: /tmp/ENGI_SPEC_V20_PROVEN.md'
  ];
  if (includeGeneratedArtifactInventory) {
    delta.push('- Generated structured artifact inventory: active .bitcode/v19-* and .bitcode/v20-* generated canon plus draft-time .bitcode/v21-* specifying artifacts');
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
  await fs.writeFile(path.join(legacyRoot, `ENGI_SPEC_${version}_DELTA.md`), delta.join('\n'), 'utf8');

  const parity = [
    `# ENGI Spec ${version} Parity Matrix`,
    '',
    '## Status',
    '',
    '- Prior canonical anchor: /tmp/ENGI_SPEC_V20.md',
    '- Prior generated proof appendix: /tmp/ENGI_SPEC_V20_PROVEN.md'
  ];
  if (includeGeneratedArtifactInventory) {
    parity.push('- Generated structured artifact inventory: active .bitcode/v19-* and .bitcode/v20-* generated canon plus draft-time .bitcode/v21-* specifying artifacts');
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
  await fs.writeFile(path.join(legacyRoot, `ENGI_SPEC_${version}_PARITY_MATRIX.md`), parity.join('\n'), 'utf8');

  return root;
}

/**
 * @param {{ version?: 'V20' | 'V21', missing?: 'proven' | 'parity' | 'artifact' }} [options]
 */
async function writeCanonicalInputFixture(options = {}) {
  const version = options.version || 'V20';
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'bitcode-canonical-inputs-'));
  const legacyRoot = path.join(root, '_legacy');
  await fs.mkdir(legacyRoot, { recursive: true });
  await fs.mkdir(path.join(root, '.bitcode'), { recursive: true });
  await fs.writeFile(path.join(root, 'ENGI_SPEC.txt'), `${version}\n`, 'utf8');
  await fs.writeFile(path.join(legacyRoot, `ENGI_SPEC_${version}.md`), `# ENGI Spec ${version}\n`, 'utf8');
  if (options.missing !== 'proven') {
    await fs.writeFile(path.join(legacyRoot, `ENGI_SPEC_${version}_PROVEN.md`), `# ENGI Spec ${version} Proven\n`, 'utf8');
  }
  if (options.missing !== 'parity') {
    const parityPath = version === 'V21'
      ? `ENGI_SPEC_${version}_PARITY_MATRIX.md`
      : `ENGI_SPEC_${version}_SYSTEM_PARITY_MATRIX.md`;
    await fs.writeFile(path.join(legacyRoot, parityPath), `# ENGI Spec ${version} Parity Matrix\n`, 'utf8');
  }

  const artifactPaths = version === 'V21'
    ? [
        '.bitcode/v21-spec-family-report.json',
        '.bitcode/v21-canonical-input-report.json'
      ]
    : [
        '.bitcode/v20-operator-acceptance-transcript.json',
        '.bitcode/v20-visual-regression-report.json',
        '.bitcode/v20-accessibility-report.json',
        '.bitcode/v20-performance-budget-report.json',
        '.bitcode/v20-projection-quality-smoke-matrix.json',
        '.bitcode/v20-quality-summary.json'
      ];
  for (const relativePath of artifactPaths) {
    if (options.missing === 'artifact' && relativePath === artifactPaths[artifactPaths.length - 1]) continue;
    await fs.writeFile(path.join(root, relativePath), '{}\n', 'utf8');
  }

  return root;
}

/**
 * @param {{ futurePhrase?: string }} [options]
 */
async function writeProperFixture(options = {}) {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'bitcode-proper-family-'));
  const legacyRoot = path.join(root, '_legacy');
  await fs.mkdir(legacyRoot, { recursive: true });
  await fs.writeFile(path.join(root, 'ENGI_SPEC.txt'), 'V20\n', 'utf8');
  await fs.writeFile(
    path.join(legacyRoot, 'ENGI_SPECIFYING.md'),
    '# ENGI Specifying\n\nThis file is the one complete specifying standard.\n',
    'utf8'
  );
  await fs.writeFile(
    path.join(legacyRoot, 'ENGI_SPEC_TEMPLATEGUIDE.md'),
    'Superseded by: `/tmp/ENGI_SPECIFYING.md`\n',
    'utf8'
  );

  const filesToCopy = [
    '_legacy/ENGI_SPEC_V20_PROPER.md',
    '_legacy/ENGI_SPEC_V20_PROPER_DELTA.md',
    '_legacy/ENGI_SPEC_V20_PROPER_PARITY_MATRIX.md'
  ];
  for (const relativePath of filesToCopy) {
    const content = await fs.readFile(path.join(repoRoot, relativePath), 'utf8');
    await fs.writeFile(path.join(root, relativePath), content, 'utf8');
  }

  if (options.futurePhrase) {
    const deltaPath = path.join(legacyRoot, 'ENGI_SPEC_V20_PROPER_DELTA.md');
    const deltaContent = await fs.readFile(deltaPath, 'utf8');
    await fs.writeFile(deltaPath, `${deltaContent}\n\nFuture import drift: ${options.futurePhrase}\n`, 'utf8');
  }

  return root;
}

test(`real ${ACTIVE_CANON_VERSION} promoted spec family passes structural promoted-mode checking`, () => {
  if (ACTIVE_CANON_VERSION === 'V27') {
    const stderr = runCheckFailure(['--version', ACTIVE_CANON_VERSION, '--mode', 'promoted'], repoRoot);
    assert.match(stderr, /missing required section containing "Version executive summary"/i);
    return;
  }

  const output = runCheck(['--version', ACTIVE_CANON_VERSION, '--mode', 'promoted'], repoRoot);
  assert.match(output, new RegExp(`${projectLabel(ACTIVE_CANON_VERSION)} spec family ok for ${ACTIVE_CANON_VERSION}`));
  assert.match(output, /mode=promoted/);
});

test('historical V20_PROPER draft spec family remains intentionally below Bitcode-first structural completeness', async () => {
  const fixtureRoot = await writeProperFixture();
  const stderr = runCheckFailure(['--version', 'V20_PROPER', '--mode', 'draft', '--current-target', 'V20', '--skip-pointer-check', '--repo-root', fixtureRoot], fixtureRoot);
  assert.match(stderr, /missing required section containing "Canonical Bitcode executive summary"/i);
});

test(`real canonical input set for active ${ACTIVE_CANON_VERSION} canon passes input checking`, () => {
  const output = runCanonicalInputCheck(['--current-target', ACTIVE_CANON_VERSION], repoRoot);
  assert.match(output, new RegExp(`${projectLabel(ACTIVE_CANON_VERSION)} canonical inputs ok for ${ACTIVE_CANON_VERSION}`));
  assert.match(
    output,
    new RegExp(`artifacts=${expectedActiveCanonicalInputArtifactCount(ACTIVE_CANON_VERSION)}`)
  );
});

test('historical V20 canonical input set passes fixture-backed input checking with pointer bypass', async () => {
  const fixtureRoot = await writeCanonicalInputFixture({
    version: 'V20'
  });
  const output = runCanonicalInputCheck(['--current-target', 'V20', '--skip-pointer-check', '--repo-root', fixtureRoot], fixtureRoot);
  assert.match(output, /Bitcode canonical inputs ok for V20/);
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

test('structural checking fails when subsystem sections omit normalized detail labels', async () => {
  const fixtureRoot = await writeFixture({
    includeSubsystemDetailLabels: false
  });
  const stderr = runCheckFailure(['--version', 'V21', '--mode', 'draft', '--repo-root', fixtureRoot], fixtureRoot);
  assert.match(stderr, /subsystem section "Depositing and asset supply" is missing "Current algorithms and derivation rules"/i);
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

test('structural checking fails when the AssetPack/artifact appendix is omitted', async () => {
  const fixtureRoot = await writeFixture({
    includeAssetPackAppendix: false
  });
  const stderr = runCheckFailure(['--version', 'V21', '--mode', 'draft', '--repo-root', fixtureRoot], fixtureRoot);
  assert.match(stderr, /missing required appendix-grade section containing "Appendix K\. Source-bearing AssetPack and artifact contract catalog"/i);
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

test('structural checking fails when the AssetPack appendix lacks required artifact truth', async () => {
  const fixtureRoot = await writeFixture({
    includeAssetPackDetails: false
  });
  const stderr = runCheckFailure(['--version', 'V21', '--mode', 'draft', '--repo-root', fixtureRoot], fixtureRoot);
  assert.match(stderr, /AssetPack\/artifact appendix is missing "\.bitcode\/asset-pack\.lock\.json"/i);
});

test('structural checking fails when proof-family sections omit exact detail labels', async () => {
  const fixtureRoot = await writeFixture({
    includeProofFamilyDetailLabels: false
  });
  const stderr = runCheckFailure(['--version', 'V21', '--mode', 'draft', '--repo-root', fixtureRoot], fixtureRoot);
  assert.match(stderr, /proof-family section "Inference-synthesis" is missing "proofArtifactPath:"/i);
});

test('structural checking fails when generated appendix contract carriers are omitted', async () => {
  const fixtureRoot = await writeFixture({
    includeGeneratedAppendixContract: false
  });
  const stderr = runCheckFailure(['--version', 'V21', '--mode', 'draft', '--repo-root', fixtureRoot], fixtureRoot);
  assert.match(stderr, /generated-appendix contract is missing "aggregate proof verdict"/i);
});

test('structural checking fails when the V21 generated-artifact catalog omits the version-local artifact paths', async () => {
  const fixtureRoot = await writeFixture({
    includeV21ArtifactPaths: false
  });
  const stderr = runCheckFailure(['--version', 'V21', '--mode', 'draft', '--repo-root', fixtureRoot], fixtureRoot);
  assert.match(stderr, /generated-artifact catalog is missing "\.bitcode\/v21-spec-family-report\.json"/i);
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

test('V20_PROPER checking fails when future-version generated artifact phrases are imported', async () => {
  const fixtureRoot = await writeProperFixture({
    futurePhrase: '.bitcode/v21-spec-family-report.json'
  });
  const stderr = runCheckFailure(['--version', 'V20_PROPER', '--mode', 'draft', '--repo-root', fixtureRoot, '--current-target', 'V20'], fixtureRoot);
  assert.match(stderr, /must not import future\/non-canonical phrase "\.bitcode\/v21-spec-family-report\.json"/i);
});

test('canonical input checking fails when the active proven appendix is missing', async () => {
  const fixtureRoot = await writeCanonicalInputFixture({
    missing: 'proven'
  });
  const stderr = runCanonicalInputCheckFailure(['--repo-root', fixtureRoot, '--current-target', 'V20'], fixtureRoot);
  assert.match(stderr, /Missing canonical input file: _legacy\/ENGI_SPEC_V20_PROVEN\.md/i);
});

test('canonical input checking passes for a pointed V21 canon with the V21 specifying artifact pair', async () => {
  const fixtureRoot = await writeCanonicalInputFixture({
    version: 'V21'
  });
  const output = runCanonicalInputCheck(['--repo-root', fixtureRoot, '--current-target', 'V21'], fixtureRoot);
  assert.match(output, /Bitcode canonical inputs ok for V21/);
  assert.match(output, /artifacts=2/);
});

test('canonical input checking fails when pointed V21 canon is missing one specifying artifact', async () => {
  const fixtureRoot = await writeCanonicalInputFixture({
    version: 'V21',
    missing: 'artifact'
  });
  const stderr = runCanonicalInputCheckFailure(['--repo-root', fixtureRoot, '--current-target', 'V21'], fixtureRoot);
  assert.match(stderr, /Missing canonical generated artifact: \.bitcode\/v21-canonical-input-report\.json/i);
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
  assert.match(output, /Bitcode spec family ok for V21/);
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
    const content = await fs.readFile(path.join(fixtureRoot, '_legacy', relativePath), 'utf8');
    assert.match(content, /Current canonical\/latest target: `V21`/);
    assert.match(content, /Canonical proof-source commit: `deadbeef`/);
    const versionStateLine = content.match(/^- V21 state: (.+)$/m);
    const stateValue = versionStateLine?.[1];
    if (typeof stateValue !== 'string') {
      throw new Error(`Missing V21 state line in ${relativePath}`);
    }
    assert.doesNotMatch(stateValue, /draft|pending|in progress/i);
  }

  const promotedOutput = runCheck(
    ['--version', 'V21', '--mode', 'promoted', '--repo-root', fixtureRoot, '--skip-pointer-check'],
    fixtureRoot
  );
  assert.match(promotedOutput, /Bitcode spec family ok for V21/);
  assert.match(promotedOutput, /mode=promoted/);
});

test('V21 promotion dry-run includes structural spec-family checks and V21 appendix generation', () => {
  const promoteScriptPath = fileURLToPath(new URL('../../scripts/promote-bitcode-canon.mjs', import.meta.url));
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
  assert.match(output, /check-bitcode-spec-family\.mjs --version V21 --mode draft --current-target V20/);
  assert.match(output, /check-bitcode-canonical-inputs\.mjs --current-target V20/);
  assert.match(output, /prepare-bitcode-spec-family-promotion\.mjs --version V21 --commit/);
  assert.match(output, /generate-bitcode-proven\.mjs --version V21/);
  assert.match(output, /check-bitcode-canonical-inputs\.mjs --current-target V21/);
  assert.match(output, /check-bitcode-spec-family\.mjs --version V21 --mode promoted/);
  assert.match(output, /Promotes V21 as specifying-canon hardening for Bitcode/);
  assert.match(output, /SPEC, SPEC_DELTA, and SPEC_PARITY_MATRIX are the required hand-authored canonical system-spec files for V21\+/);
  assert.match(output, /appendix-grade totality carriers in SPEC for canonical type and surface catalog/);
  assert.match(output, /Complete specifying authority: ENGI_SPECIFYING\.md is the only complete guide; ENGI_SPEC_TEMPLATEGUIDE\.md is compatibility-only/);
  assert.match(output, /Canonical-input validator: scripts\/check-bitcode-canonical-inputs\.mjs now validates the active pointed canon input family and V21 promotion plan includes it pre-mutation/);
  assert.match(output, /Post-generation active-canon validation: scripts\/promote-bitcode-canon\.mjs now runs scripts\/check-bitcode-canonical-inputs\.mjs --current-target V21 after generation/);
  assert.doesNotMatch(output, /actual canonical promotion remains pending/);
});
