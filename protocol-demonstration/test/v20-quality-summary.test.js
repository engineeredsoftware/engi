import test from 'node:test';
import assert from 'node:assert/strict';
import {
  V20_ARTIFACT_PATHS,
  V20_QUALITY_SUMMARY_REPORT_ID
} from '../src/canonical/v20-quality.js';
import {
  buildV20GeneratedFixture,
  buildV20QualityFixture,
  collectObjectPaths
} from './v20-quality-fixture.js';

test('V20 quality summary aggregates every blocking quality gate', () => {
  const { reports, artifacts } = buildV20QualityFixture();
  const summary = reports.qualitySummary;

  assert.equal(summary.reportId, V20_QUALITY_SUMMARY_REPORT_ID);
  assert.equal(summary.passed, true);
  assert.deepEqual(summary.blockingFailures, []);
  assert.deepEqual(summary.acceptedExclusions, []);
  assert.equal(summary.qualityReportCount, 5);
  assert.equal(summary.generatedArtifactCount, 6);
  assert.equal(summary.inheritedProofClosure.positiveMatrixCellCount, 1832);
  assert.equal(summary.inheritedProofClosure.negativeMutationCellCount, 10);
  assert.equal(summary.inheritedProofClosure.deterministicReplayPassed, true);
  assert.equal(summary.inheritedProofClosure.contractLedgerPassed, true);
  assert.deepEqual(Object.keys(artifacts).sort(), Object.values(V20_ARTIFACT_PATHS).sort());

  const serialized = JSON.stringify(reports);
  assert.equal(serialized.includes('dirty-preview'), false);
  assert.equal(serialized.includes('/Users/'), false);
  assert.equal(serialized.includes('/tmp/'), false);
  assert.deepEqual(collectObjectPaths(reports).filter((path) => /elapsedMs|durationMs|wallClock|rawElapsed/i.test(path)), []);
});

test('V20 generator renders quality reports and emits only V20 generated artifacts', { timeout: 240_000 }, () => {
  const generated = buildV20GeneratedFixture();

  assert.equal(generated.data.version, 'V20');
  assert.equal(generated.data.aggregate.fullyProven, true);
  assert.equal(generated.data.v20.qualitySummary.passed, true);
  assert.equal(generated.data.v19.deterministicReplayReport.passed, true);
  assert.deepEqual(Object.keys(generated.artifacts).sort(), Object.values(V20_ARTIFACT_PATHS).sort());
  assert.ok(generated.markdown.includes('## V20 Operator Quality Reports'));
  assert.ok(generated.markdown.includes('### V20 Projection Quality Smoke Matrix'));
  assert.ok(generated.markdown.includes('_legacy/ENGI_SPEC_V20_PROVEN.md'));
  assert.ok(generated.markdown.includes('.bitcode/v20-quality-summary.json'));
  assert.equal(Object.keys(generated.artifacts).some((artifactPath) => artifactPath.includes('/v19-')), false);
});
