import test from 'node:test';
import assert from 'node:assert/strict';
import {
  assertV18MatrixClosed,
  buildV18StateMachineMatrix,
  V18_STATE_MACHINE_MATRIX_ID
} from '../src/canonical/v18-matrices.js';

test('V18 state-machine matrix executes all required workflow cells', { timeout: 120_000 }, () => {
  const matrix = buildV18StateMachineMatrix({
    version: 'V18',
    generatedAt: '2026-04-09T00:00:00.000Z'
  });

  assert.equal(matrix.matrixId, V18_STATE_MACHINE_MATRIX_ID);
  assert.equal(matrix.sourceRunCount, 16);
  assert.equal(matrix.cellCount, 200);
  assert.equal(matrix.passedCellCount, 200);
  assert.deepEqual(matrix.failedCells, []);
  assert.deepEqual(matrix.acceptedExclusions, []);
  assertV18MatrixClosed(matrix);

  const groupCounts = new Map();
  for (const cell of matrix.cells) {
    assert.ok(cell.matrixGroup);
    assert.ok(cell.scenarioId);
    assert.ok(cell.predicateId);
    assert.ok(cell.actionSequence.length >= 1);
    assert.ok(cell.expectedTerminalState);
    assert.equal(cell.passed, true);
    groupCounts.set(cell.matrixGroup, (groupCounts.get(cell.matrixGroup) || 0) + 1);
  }

  assert.equal(groupCounts.get('repeated-run'), 64);
  assert.equal(groupCounts.get('reset-after-run'), 8);
  assert.equal(groupCounts.get('mixed-deposit'), 64);
  assert.equal(groupCounts.get('no-survivor'), 64);
});
