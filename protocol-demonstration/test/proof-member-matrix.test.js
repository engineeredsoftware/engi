import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildCanonicalProvenData,
  collectCanonicalProvenRuns
} from '../src/canonical/proven-generator.js';
import {
  assertV18MatrixClosed,
  buildV18ProofMemberSemanticMatrix,
  V18_PROOF_MEMBER_MATRIX_ID
} from '../src/canonical/v18-matrices.js';

test('V18 proof-member semantic matrix executes all canonical member cells', () => {
  const collected = collectCanonicalProvenRuns();
  const data = buildCanonicalProvenData(collected, {
    version: 'V18',
    canonicalCommit: 'draft',
    generatedAt: '2026-04-09T00:00:00.000Z'
  });
  const matrix = buildV18ProofMemberSemanticMatrix(data, {
    version: 'V18',
    generatedAt: '2026-04-09T00:00:00.000Z'
  });

  assert.equal(matrix.matrixId, V18_PROOF_MEMBER_MATRIX_ID);
  assert.equal(matrix.sourceRunCount, 16);
  assert.equal(matrix.cellCount, 736);
  assert.equal(matrix.passedCellCount, 736);
  assert.deepEqual(matrix.failedCells, []);
  assert.deepEqual(matrix.acceptedExclusions, []);
  assertV18MatrixClosed(matrix);

  const familyCounts = new Map();
  for (const cell of matrix.cells) {
    assert.ok(cell.scenarioId);
    assert.ok(cell.branchMode);
    assert.ok(cell.proofFamily);
    assert.ok(cell.memberId);
    assert.ok(cell.predicateId);
    assert.ok(cell.evidencePaths.length >= 1);
    assert.ok(cell.evidenceDigestRefs.length >= 1);
    assert.equal(cell.passed, true);
    familyCounts.set(cell.proofFamily, (familyCounts.get(cell.proofFamily) || 0) + 1);
  }

  assert.equal(familyCounts.get('settlement-source-to-shares'), 128);
  assert.equal(familyCounts.get('static-code-analysis'), 64);
  assert.equal(familyCounts.get('prompt-completeness'), 80);
});
