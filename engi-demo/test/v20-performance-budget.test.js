import test from 'node:test';
import assert from 'node:assert/strict';
import { V20_PERFORMANCE_BUDGET_REPORT_ID } from '../src/canonical/v20-quality.js';
import {
  buildV20QualityFixture,
  collectObjectPaths
} from './v20-quality-fixture.js';

test('V20 performance report records budgets and normalized classes without raw timings', () => {
  const { reports } = buildV20QualityFixture();
  const report = reports.performanceBudgetReport;

  assert.equal(report.reportId, V20_PERFORMANCE_BUDGET_REPORT_ID);
  assert.equal(report.measurementMode, 'live-test-hard-gate-with-canonical-normalized-class');
  assert.equal(report.passed, true);
  assert.deepEqual(report.blockingFailures, []);
  assert.equal(report.operationCount, 9);
  assert.deepEqual(report.normalizedElapsedClasses, ['within-budget', 'over-budget', 'telemetry-only']);

  const budgets = Object.fromEntries(report.operations.map((/** @type {any} */ operation) => [operation.operationId, operation.budgetMs]));
  assert.equal(budgets['initial-seeded-shell-ready'], 1500);
  assert.equal(budgets['scenario-switch-summary-update'], 500);
  assert.equal(budgets['projection-switch-summary-update'], 500);
  assert.equal(budgets['targeted-branch-creation'], 5000);
  assert.equal(budgets['normalization-branch-creation'], 7000);
  assert.equal(budgets['proof-family-catalog-render-after-branch'], 1000);
  assert.equal(budgets['raw-visual-surface-mode-toggle'], 250);
  assert.equal(budgets['reset-to-ready-state'], 1500);
  assert.equal(budgets['full-quality-suite-duration'], null);

  for (const operation of report.operations) {
    assert.ok(['within-budget', 'over-budget', 'telemetry-only'].includes(operation.normalizedElapsedClass));
    assert.equal('elapsedMs' in operation, false);
    assert.equal('durationMs' in operation, false);
    assert.equal(operation.rawTimingPolicy, 'not-recorded-in-canonical-artifact');
  }

  const rawTimingPaths = collectObjectPaths(report).filter((path) => /elapsedMs|durationMs|wallClock|rawElapsed/i.test(path));
  assert.deepEqual(rawTimingPaths, []);
});
