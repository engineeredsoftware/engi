import test from 'node:test';
import assert from 'node:assert/strict';
import {
  V20_PROJECTION_PRINCIPALS,
  V20_PROJECTION_QUALITY_SMOKE_MATRIX_ID
} from '../src/canonical/v20-quality.js';
import { buildV20QualityFixture } from './v20-quality-fixture.js';

test('V20 projection-quality smoke matrix covers every representative principal without forbidden artifact dependence', () => {
  const { reports } = buildV20QualityFixture();
  const matrix = reports.projectionQualitySmokeMatrix;

  assert.equal(matrix.reportId, V20_PROJECTION_QUALITY_SMOKE_MATRIX_ID);
  assert.equal(matrix.matrixMode, 'representative-principal-quality-smoke');
  assert.equal(matrix.passed, true);
  assert.deepEqual(matrix.blockingFailures, []);
  assert.deepEqual(matrix.acceptedExclusions, []);
  assert.deepEqual(matrix.requiredPrincipals, V20_PROJECTION_PRINCIPALS);
  assert.deepEqual(matrix.missingPrincipals, []);
  assert.equal(matrix.cellCount, 4);
  assert.equal(matrix.inheritedBrowserMatrix.cellCount, 64);

  const cells = Object.fromEntries(matrix.cells.map((/** @type {any} */ cell) => [cell.principal, cell]));
  const publicCell = cells['public'];
  const reviewerCell = cells['reviewer'];
  const buyerCell = cells['buyer'];
  const internalCell = cells['internal'];
  assert.ok(publicCell);
  assert.ok(reviewerCell);
  assert.ok(buyerCell);
  assert.ok(internalCell);
  assert.equal(publicCell.visibleProofFamilyCount, 0);
  assert.equal(publicCell.rawBranchFilesAvailable, false);
  assert.equal(publicCell.authorizationDecisionsVisible, false);
  assert.equal(publicCell.forbiddenSurfaces.includes('proof witness manifest'), true);

  assert.equal(reviewerCell.visibleProofFamilyCount, 9);
  assert.equal(reviewerCell.rawBranchFilesAvailable, false);
  assert.equal(reviewerCell.authorizationDecisionsVisible, false);

  assert.equal(buyerCell.visibleProofFamilyCount, 9);
  assert.equal(buyerCell.rawBranchFilesAvailable, false);
  assert.equal(buyerCell.authorizationDecisionsVisible, true);

  assert.equal(internalCell.rawBranchFilesAvailable, true);
  assert.equal(internalCell.sourceMaterialVisible, true);
  assert.equal(internalCell.authorizationDecisionsVisible, true);

  for (const principal of V20_PROJECTION_PRINCIPALS) {
    const cell = cells[principal];
    assert.ok(cell);
    assert.equal(cell.qualityChecksDependOnForbiddenSurface, false, `${principal} quality check requires forbidden artifact`);
    assert.equal(cell.passed, true, `${principal} cell failed`);
  }
});
