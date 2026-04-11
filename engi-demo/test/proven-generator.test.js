import test from 'node:test';
import assert from 'node:assert/strict';
import { buildInitialState } from '../src/engi-demo.js';
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

test('V21 proven generator renders a V21 appendix while inheriting V20 and V19 generated closure', () => {
  const generated = generateCanonicalProvenMarkdown({
    version: 'V21',
    canonicalCommit: 'draft-v21',
    canonicalCommitRecordedAt: '2026-04-11T00:00:00.000Z',
    generatedAt: '2026-04-11T00:00:00.000Z'
  });

  assert.equal(generated.data.version, 'V21');
  assert.equal(generated.data.aggregate.fullyProven, true);
  assert.equal(generated.data.v19.deterministicReplayReport.passed, true);
  assert.equal(generated.data.v20.qualitySummary.passed, true);
  assert.equal(generated.data.v21.specFamilyReport.passed, true);
  assert.equal(generated.data.v21.canonicalInputReport.passed, true);
  assert.deepEqual(Object.keys(generated.artifacts).sort(), [
    '.engi/v21-canonical-input-report.json',
    '.engi/v21-spec-family-report.json'
  ]);
  assert.ok(generated.markdown.includes('# ENGI Spec V21 Proven'));
  assert.ok(generated.markdown.includes('## V19 Reproducible Canon Reports'));
  assert.ok(generated.markdown.includes('## V20 Operator Quality Reports'));
  assert.ok(generated.markdown.includes('## V21 Specifying Reports'));
  assert.ok(generated.markdown.includes('.engi/v21-spec-family-report.json'));
  assert.ok(generated.markdown.includes('.engi/v21-canonical-input-report.json'));
  assert.ok(generated.markdown.includes('ENGI_SPEC_V21_PROVEN.md'));
});
