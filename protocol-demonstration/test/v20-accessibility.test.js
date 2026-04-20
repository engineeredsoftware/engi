import test from 'node:test';
import assert from 'node:assert/strict';
import { V20_ACCESSIBILITY_REPORT_ID } from '../src/canonical/v20-quality.js';
import { buildV20QualityFixture } from './v20-quality-fixture.js';

test('V20 accessibility report closes required deterministic accessibility concerns', () => {
  const { reports } = buildV20QualityFixture();
  const report = reports.accessibilityReport;

  assert.equal(report.reportId, V20_ACCESSIBILITY_REPORT_ID);
  assert.equal(report.engine, 'deterministic-dom-accessibility-contract');
  assert.equal(report.passed, true);
  assert.deepEqual(report.blockingFailures, []);
  assert.deepEqual(report.acceptedExclusions, []);
  assert.equal(report.missingCheckIds.length, 0);
  assert.equal(report.checkCount, report.requiredCheckIds.length);

  assert.equal(report.contrastThresholds.normalTextRatio, 4.5);
  assert.equal(report.contrastThresholds.largeTextRatio, 3);
  assert.equal(report.contrastThresholds.nonTextUiRatio, 3);
  assert.equal(report.contrastThresholds.focusIndicatorRatio, 3);

  const checkIds = new Set(report.checks.map((/** @type {any} */ check) => check.checkId));
  for (const checkId of [
    'control-names',
    'form-labeling',
    'keyboard-operation',
    'focus-order',
    'focus-visibility',
    'status-announcements',
    'landmarks-and-sections',
    'toggle-state',
    'contrast',
    'reduced-motion',
    'projection-safety'
  ]) {
    assert.equal(checkIds.has(checkId), true, `${checkId} was not checked`);
  }

  const statusCheck = report.checks.find((/** @type {any} */ check) => check.checkId === 'status-announcements');
  assert.ok(statusCheck.assertions.includes('#status[role=status]'));
  assert.ok(statusCheck.assertions.includes('aria-live=polite'));
});
