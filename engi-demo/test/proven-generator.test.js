import test from 'node:test';
import assert from 'node:assert/strict';
import { buildInitialState } from '../src/engi-demo.js';
import { ACTIVE_CANON_VERSION, DRAFT_TARGET_VERSION } from '../src/canon-posture.js';
import {
  buildCanonicalProvenData,
  collectCanonicalProvenRuns,
  generateCanonicalProvenMarkdown,
  renderCanonicalProvenMarkdown
} from '../src/canonical/proven-generator.js';

/**
 * @param {number} scenarioCount
 * @returns {{ scenarioIds: string[] }}
 */
function selectScenarioIds(scenarioCount) {
  const scenarioIds = buildInitialState().needScenarios.slice(0, scenarioCount).map((/** @type {any} */ scenario) => scenario.scenarioId);
  return { scenarioIds };
}

/**
 * @param {any} collected
 */
function buildTestProvenData(collected) {
  return buildCanonicalProvenData(collected, {
    version: 'V15',
    canonicalCommit: '8b1ccbc2481f80bc63d31a33901a463f3ea7028a',
    canonicalCommitRecordedAt: '2026-04-06T00:00:00.000Z',
    generatedAt: '2026-04-06T00:00:00.000Z'
  });
}

test('canonical proven generator renders a stable appendix from seeded proof runs', () => {
  const collected = collectCanonicalProvenRuns({
    ...selectScenarioIds(2),
    branchModes: ['patch']
  });
  const data = buildTestProvenData(collected);
  const markdown = renderCanonicalProvenMarkdown(data);

  assert.equal(data.aggregate.fullyProven, true);
  assert.equal(data.aggregate.runCount, 2);
  assert.equal(data.familySummaries.length, 9);
  assert.equal(data.runMatrix.every((entry) => entry.fullyProven), true);
  assert.ok(markdown.includes('# ENGI Spec V15 Proven'));
  assert.ok(markdown.includes('## Proof Family Inventory'));
  assert.ok(markdown.includes('## Scenario and Run Matrix'));
  assert.ok(markdown.includes('## Run Details'));
  assert.ok(markdown.includes('`prompt-completeness`'));
  assert.ok(markdown.includes('ENGI_SPEC_V15_PROVEN.md'));
});

test('canonical proven generator fails closed on proof-family catalog drift across runs', () => {
  const collected = collectCanonicalProvenRuns({
    ...selectScenarioIds(2),
    branchModes: ['patch']
  });
  const mutated = JSON.parse(JSON.stringify(collected));
  const driftedRun = mutated.runs[1];
  const driftedCatalogEntry = driftedRun.systemProofBundle.proofFamilies.find((/** @type {any} */ entry) => entry.proofFamily === 'inference-synthesis');
  driftedCatalogEntry.memberIds = [...driftedCatalogEntry.memberIds, 'drifted-member'];
  driftedRun.familyProofsByName['inference-synthesis'].memberVerdicts.push({
    memberId: 'drifted-member',
    passed: true
  });

  assert.throws(
    () => buildTestProvenData(mutated),
    /changed the structural catalog for inference-synthesis/
  );
});

test('canonical proven generator fails closed when a keyed witness digest is missing', () => {
  const collected = collectCanonicalProvenRuns({
    ...selectScenarioIds(1),
    branchModes: ['patch']
  });
  const mutated = JSON.parse(JSON.stringify(collected));
  delete mutated.runs[0].proofWitnessManifest.artifactDigestByPath['.engi/prompt-family-registry.json'];

  assert.throws(
    () => buildTestProvenData(mutated),
    /missing witness digest for \.engi\/prompt-family-registry\.json/
  );
});

test('V22 proven generator renders a V22 appendix while inheriting V20 and V19 generated closure', () => {
  const generated = generateCanonicalProvenMarkdown({
    version: 'V22',
    canonicalCommit: 'draft-v22',
    canonicalCommitRecordedAt: '2026-04-12T00:00:00.000Z',
    generatedAt: '2026-04-12T00:00:00.000Z'
  });

  assert.equal(generated.data.version, 'V22');
  assert.equal(generated.data.aggregate.fullyProven, false);
  assert.equal(generated.data.v19.deterministicReplayReport.passed, true);
  assert.equal(generated.data.v20.qualitySummary.passed, true);
  assert.equal(generated.data.v22.specFamilyReport.checkedVersion, 'V22');
  assert.equal(generated.data.v22.specFamilyReport.currentTarget, 'V22');
  assert.equal(generated.data.v22.specFamilyReport.pointerVersion, ACTIVE_CANON_VERSION);
  assert.equal(generated.data.v22.specFamilyReport.passed, ACTIVE_CANON_VERSION === 'V22');
  assert.equal(generated.data.v22.canonicalInputReport.checkedTargetVersion, 'V22');
  assert.equal(generated.data.v22.canonicalInputReport.pointerVersion, ACTIVE_CANON_VERSION);
  assert.equal(generated.data.v22.canonicalInputReport.passed, ACTIVE_CANON_VERSION === 'V22');
  assert.equal(generated.data.v22.canonPostureDriftReport.checkedActiveCanonVersion, 'V22');
  assert.equal(generated.data.v22.canonPostureDriftReport.checkedDraftTargetVersion, 'V23');
  assert.equal(generated.data.v22.canonPostureDriftReport.pointerVersion, ACTIVE_CANON_VERSION);
  assert.equal(generated.data.v22.canonPostureDriftReport.passed, ACTIVE_CANON_VERSION === 'V22');
  assert.deepEqual(Object.keys(generated.artifacts).sort(), [
    '.engi/v22-canon-posture-drift-report.json',
    '.engi/v22-canonical-input-report.json',
    '.engi/v22-spec-family-report.json'
  ]);
  assert.ok(generated.markdown.includes('# ENGI Spec V22 Proven'));
  assert.ok(generated.markdown.includes('## V19 Reproducible Canon Reports'));
  assert.ok(generated.markdown.includes('## V20 Operator Quality Reports'));
  assert.ok(generated.markdown.includes('## V22 Drift-Detection and Specifying Reports'));
  assert.ok(generated.markdown.includes('.engi/v22-spec-family-report.json'));
  assert.ok(generated.markdown.includes('.engi/v22-canonical-input-report.json'));
  assert.ok(generated.markdown.includes('.engi/v22-canon-posture-drift-report.json'));
  assert.ok(generated.markdown.includes('ENGI_SPEC_V22_PROVEN.md'));
});

test('V23 proven generator renders a V23 appendix with bitcoin payment-mode coverage', () => {
  const generated = generateCanonicalProvenMarkdown({
    version: 'V23',
    canonicalCommit: 'draft-v23',
    canonicalCommitRecordedAt: '2026-04-14T00:00:00.000Z',
    generatedAt: '2026-04-14T00:00:00.000Z'
  });

  assert.equal(generated.data.version, 'V23');
  assert.deepEqual(generated.data.paymentModes, [
    'audited-base-layer-purchase',
    'repeated-read-payment',
    'checkpointed-sidechain-bridge'
  ]);
  assert.equal(generated.data.familySummaries.length, 11);
  assert.equal(generated.data.v23.specFamilyReport.passed, ACTIVE_CANON_VERSION === 'V23');
  assert.equal(generated.data.v23.canonicalInputReport.passed, ACTIVE_CANON_VERSION === 'V23');
  assert.equal(
    generated.data.v23.canonPostureDriftReport.passed,
    ACTIVE_CANON_VERSION === 'V23' && DRAFT_TARGET_VERSION === 'V24'
  );
  assert.equal(
    generated.data.aggregate.fullyProven,
    generated.data.v23.specFamilyReport.passed
      && generated.data.v23.canonicalInputReport.passed
      && generated.data.v23.canonPostureDriftReport.passed
  );
  assert.deepEqual(Object.keys(generated.artifacts).sort(), [
    '.engi/v23-canon-posture-drift-report.json',
    '.engi/v23-canonical-input-report.json',
    '.engi/v23-spec-family-report.json'
  ]);
  assert.ok(generated.markdown.includes('# ENGI Spec V23 Proven'));
  assert.ok(generated.markdown.includes('## V23 Deployment and Canon Reports'));
  assert.ok(generated.markdown.includes('`bitcoin-audit-anchor`'));
  assert.ok(generated.markdown.includes('`bitcoin-settlement-interface`'));
  assert.ok(generated.markdown.includes('`checkpointed-sidechain-bridge`'));
  assert.ok(generated.markdown.includes('.engi/v23-spec-family-report.json'));
  assert.ok(generated.markdown.includes('.engi/v23-canonical-input-report.json'));
  assert.ok(generated.markdown.includes('.engi/v23-canon-posture-drift-report.json'));
  assert.ok(generated.markdown.includes('ENGI_SPEC_V23_PROVEN.md'));
});

test('V24 proven generator renders a V24 appendix with external-realization payment-mode coverage', () => {
  const generated = generateCanonicalProvenMarkdown({
    version: 'V24',
    canonicalCommit: 'draft-v24',
    canonicalCommitRecordedAt: '2026-04-15T00:00:00.000Z',
    generatedAt: '2026-04-15T00:00:00.000Z'
  });

  assert.equal(generated.data.version, 'V24');
  assert.deepEqual(generated.data.paymentModes, [
    'audited-base-layer-purchase',
    'repeated-read-payment',
    'checkpointed-sidechain-bridge'
  ]);
  assert.equal(generated.data.v24.specFamilyReport.passed, ACTIVE_CANON_VERSION === 'V24');
  assert.equal(generated.data.v24.canonicalInputReport.passed, ACTIVE_CANON_VERSION === 'V24');
  assert.equal(generated.data.v24.canonPostureDriftReport.checkedActiveCanonVersion, 'V24');
  assert.equal(generated.data.v24.canonPostureDriftReport.checkedDraftTargetVersion, 'V25');
  assert.equal(
    generated.data.v24.canonPostureDriftReport.passed,
    ACTIVE_CANON_VERSION === 'V24' && DRAFT_TARGET_VERSION === 'V25'
  );
  assert.equal(
    generated.data.aggregate.fullyProven,
    generated.data.v24.specFamilyReport.passed
      && generated.data.v24.canonicalInputReport.passed
      && generated.data.v24.canonPostureDriftReport.passed
  );
  assert.deepEqual(Object.keys(generated.artifacts).sort(), [
    '.engi/v24-canon-posture-drift-report.json',
    '.engi/v24-canonical-input-report.json',
    '.engi/v24-spec-family-report.json'
  ]);
  assert.ok(generated.markdown.includes('# ENGI Spec V24 Proven'));
  assert.ok(generated.markdown.includes('## V24 External-Realization and Canon Reports'));
  assert.ok(generated.markdown.includes('external-realization-execution'));
  assert.ok(generated.markdown.includes('containerized-reality'));
  assert.ok(generated.markdown.includes('github-live-interface'));
  assert.ok(generated.markdown.includes('repeated-read-payment'));
  assert.ok(generated.markdown.includes('.engi/v24-spec-family-report.json'));
  assert.ok(generated.markdown.includes('.engi/v24-canonical-input-report.json'));
  assert.ok(generated.markdown.includes('.engi/v24-canon-posture-drift-report.json'));
  assert.ok(generated.markdown.includes('ENGI_SPEC_V24_PROVEN.md'));
});

test('V25 proven generator renders a Bitcode-branded appendix with BTD rename closure', () => {
  const generated = generateCanonicalProvenMarkdown({
    version: 'V25',
    canonicalCommit: 'draft-v25',
    canonicalCommitRecordedAt: '2026-04-15T18:00:00.000Z',
    generatedAt: '2026-04-15T18:00:00.000Z'
  });

  assert.equal(generated.data.version, 'V25');
  assert.deepEqual(generated.data.paymentModes, [
    'audited-base-layer-purchase',
    'repeated-read-payment',
    'checkpointed-sidechain-bridge'
  ]);
  assert.equal(generated.data.v25.specFamilyReport.passed, ACTIVE_CANON_VERSION === 'V25');
  assert.equal(generated.data.v25.canonicalInputReport.passed, ACTIVE_CANON_VERSION === 'V25');
  assert.equal(
    generated.data.v25.canonPostureDriftReport.passed,
    ACTIVE_CANON_VERSION === 'V25' && DRAFT_TARGET_VERSION === 'V26'
  );
  assert.equal(
    generated.data.aggregate.fullyProven,
    generated.data.v25.specFamilyReport.passed
      && generated.data.v25.canonicalInputReport.passed
      && generated.data.v25.canonPostureDriftReport.passed
  );
  assert.equal(generated.data.v25.canonPostureDriftReport.checkedActiveCanonVersion, 'V25');
  assert.equal(generated.data.v25.canonPostureDriftReport.checkedDraftTargetVersion, 'V26');
  assert.deepEqual(Object.keys(generated.artifacts).sort(), [
    '.engi/v25-canon-posture-drift-report.json',
    '.engi/v25-canonical-input-report.json',
    '.engi/v25-spec-family-report.json'
  ]);
  assert.ok(generated.markdown.includes('# Bitcode Spec V25 Proven'));
  assert.ok(generated.markdown.includes('## V25 Bitcode Rename and Canon Reports'));
  assert.ok(generated.markdown.includes('`repeated-read-payment`'));
  assert.ok(generated.markdown.includes('.engi/v25-spec-family-report.json'));
  assert.ok(generated.markdown.includes('.engi/v25-canonical-input-report.json'));
  assert.ok(generated.markdown.includes('.engi/v25-canon-posture-drift-report.json'));
  assert.ok(generated.markdown.includes('ENGI_SPEC_V25_PROVEN.md'));
  assert.ok(generated.markdown.includes('BTD'));
});

test('V26 proven generator renders a draft-preview appendix while V25 remains active', () => {
  const generated = generateCanonicalProvenMarkdown({
    version: 'V26',
    canonicalCommit: 'draft-v26',
    canonicalCommitRecordedAt: '2026-04-16T00:00:00.000Z',
    generatedAt: '2026-04-16T00:00:00.000Z'
  });

  assert.equal(generated.data.version, 'V26');
  assert.deepEqual(generated.data.paymentModes, [
    'audited-base-layer-purchase',
    'repeated-read-payment',
    'checkpointed-sidechain-bridge'
  ]);
  assert.equal(generated.data.v26.activeCanonicalTarget, ACTIVE_CANON_VERSION);
  assert.equal(generated.data.v26.draftPreview, ACTIVE_CANON_VERSION !== 'V26');
  assert.equal(generated.data.v26.promotionReady, ACTIVE_CANON_VERSION === 'V26');
  assert.equal(generated.data.v26.specFamilyReport.passed, true);
  assert.equal(generated.data.v26.canonicalInputReport.passed, true);
  assert.equal(generated.data.aggregate.fullyProven, ACTIVE_CANON_VERSION === 'V26');
  assert.deepEqual(Object.keys(generated.artifacts).sort(), [
    '.engi/v26-canonical-input-report.json',
    '.engi/v26-spec-family-report.json'
  ]);
  assert.ok(generated.markdown.includes('# Bitcode Spec V26 Proven'));
  assert.ok(generated.markdown.includes('## V26 Productionizing Draft and Canon Reports'));
  assert.ok(generated.markdown.includes('application-native-full-page'));
  assert.ok(generated.markdown.includes('.engi/v26-spec-family-report.json'));
  assert.ok(generated.markdown.includes('.engi/v26-canonical-input-report.json'));
  assert.ok(generated.markdown.includes('ENGI_SPEC_V26_PROVEN.md'));
});
