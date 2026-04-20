import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildCanonicalProvenData,
  collectCanonicalProvenRuns
} from '../src/canonical/proven-generator.js';
import {
  buildV19NegativeProofMutationMatrix,
  buildV19PositiveMatrices,
  buildV19VolatilityInventory
} from '../src/canonical/v19-canon.js';

test('V19 negative proof mutation matrix rejects every accepted representative mutation', { timeout: 120_000 }, () => {
  const collected = collectCanonicalProvenRuns();
  const data = buildCanonicalProvenData(collected, {
    version: 'V19',
    canonicalCommit: 'draft-v19',
    canonicalCommitRecordedAt: '2026-04-09T00:00:00.000Z',
    generatedAt: '2026-04-09T00:00:00.000Z'
  });
  const positiveMatrices = buildV19PositiveMatrices(data, {
    version: 'V19',
    generatedAt: '2026-04-09T00:00:00.000Z'
  });
  const volatilityInventory = buildV19VolatilityInventory({
    data,
    positiveMatrices,
    version: 'V19',
    generatedAt: '2026-04-09T00:00:00.000Z'
  });
  const matrix = buildV19NegativeProofMutationMatrix(data, {
    positiveMatrices,
    volatilityInventory,
    version: 'V19',
    generatedAt: '2026-04-09T00:00:00.000Z'
  });

  assert.equal(matrix.matrixId, 'v19-negative-proof-mutation-matrix');
  assert.equal(matrix.coverageMode, 'representative-first-gate');
  assert.equal(matrix.mutationClassCount, 10);
  assert.equal(matrix.cellCount, 10);
  assert.equal(matrix.rejectedCellCount, 10);
  assert.deepEqual(matrix.unexpectedPassCells, []);
  assert.deepEqual(matrix.unexpectedErrorCells, []);
  assert.ok(matrix.omittedCrossProducts.length >= 1);
  assert.equal(new Set(matrix.cells.map((/** @type {any} */ cell) => cell.mutationClass)).size, 10);
});
