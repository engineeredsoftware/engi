import test from 'node:test';
import assert from 'node:assert/strict';
import {
  V20_ARTIFACT_PATHS,
  V20_OPERATOR_TRANSCRIPT_REPORT_ID
} from '../src/canonical/v20-quality.js';
import { buildV20QualityFixture } from './v20-quality-fixture.js';

test('V20 operator transcript covers every required first-gate flow', () => {
  const { reports } = buildV20QualityFixture();
  const transcript = reports.operatorAcceptanceTranscript;

  assert.equal(transcript.reportId, V20_OPERATOR_TRANSCRIPT_REPORT_ID);
  assert.equal(transcript.passed, true);
  assert.equal(transcript.missingFlowIds.length, 0);
  assert.equal(transcript.requiredFlowIds.length, 10);
  assert.equal(transcript.flowCount, 10);
  assert.equal(transcript.stepCount, 10);
  assert.deepEqual(transcript.blockingFailures, []);

  const flowIds = new Set(transcript.steps.map((/** @type {any} */ step) => step.flowId));
  for (const flowId of transcript.requiredFlowIds) {
    assert.equal(flowIds.has(flowId), true, `${flowId} was not recorded`);
  }

  const discoveryStep = transcript.steps.find((/** @type {any} */ step) => step.stepId === 'generated-proof-and-quality-report-reference-visible');
  assert.ok(discoveryStep);
  assert.ok(discoveryStep.visibleTruths.some((/** @type {string} */ truth) => truth.includes('_legacy/ENGI_SPEC_V20_PROVEN.md')));
  assert.deepEqual(discoveryStep.generatedEvidenceRefs.sort(), Object.values(V20_ARTIFACT_PATHS).sort());
});
