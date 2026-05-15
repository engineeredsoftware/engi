import test from 'node:test';
import assert from 'node:assert/strict';
import { V20_VISUAL_REGRESSION_REPORT_ID } from '../src/canonical/v20-quality.js';
import { buildV20QualityFixture } from './v20-quality-fixture.js';

test('V20 visual regression report covers required operator states with stable signatures', () => {
  const { reports } = buildV20QualityFixture();
  const report = reports.visualRegressionReport;

  assert.equal(report.reportId, V20_VISUAL_REGRESSION_REPORT_ID);
  assert.equal(report.signatureMode, 'deterministic-dom-geometry-signature');
  assert.equal(report.screenshotMode, 'deferred-until-local-ci-screenshot-stability');
  assert.equal(report.passed, true);
  assert.deepEqual(report.blockingFailures, []);
  assert.deepEqual(report.acceptedExclusions, []);
  assert.equal(report.missingStateIds.length, 0);
  assert.equal(report.stateCount, report.requiredStateIds.length);

  const stateIds = new Set(report.states.map((/** @type {any} */ state) => state.stateId));
  for (const stateId of [
    'initial-seeded-shell',
    'targeted-branch-run',
    'normalization-branch-run',
    'public-privacy-boundary-projection',
    'reviewer-privacy-boundary-projection',
    'buyer-targeted-projection',
    'internal-privacy-boundary-projection',
    'invalid-deposit-error',
    'no-survivor-conflict',
    'generated-appendix-report-reference'
  ]) {
    assert.equal(stateIds.has(stateId), true, `${stateId} was not covered`);
  }

  const seededShell = report.states.find((/** @type {any} */ state) => state.stateId === 'initial-seeded-shell');
  assert.deepEqual(seededShell.signature.requiredPanelOrder, [
    '0. Operating picture',
    '1. Depositing + candidate assets',
    '2. Reading + measured demand',
    '3. Depositing-to-reading fit',
    '4. Ranked candidates + verification determinisms',
    '5. Asset pack + branch artifacts',
    '6. Settlement + journal diff',
    '7. Ledger + policy surfaces'
  ]);
  assert.ok(/^sha256:[0-9a-f]{64}$/.test(seededShell.signatureDigest));
});
