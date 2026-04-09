import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildCanonicalProvenData,
  collectCanonicalProvenRuns
} from '../src/canonical/proven-generator.js';
import {
  assertV18MatrixClosed,
  buildV18TheoremEvidenceMatrix,
  V18_THEOREM_EVIDENCE_MATRIX_ID
} from '../src/canonical/v18-matrices.js';

test('V18 theorem evidence matrix executes all canonical theorem cells', () => {
  const collected = collectCanonicalProvenRuns();
  const data = buildCanonicalProvenData(collected, {
    version: 'V18',
    canonicalCommit: 'draft',
    generatedAt: '2026-04-09T00:00:00.000Z'
  });
  const matrix = buildV18TheoremEvidenceMatrix(data, {
    version: 'V18',
    generatedAt: '2026-04-09T00:00:00.000Z'
  });

  assert.equal(matrix.matrixId, V18_THEOREM_EVIDENCE_MATRIX_ID);
  assert.equal(matrix.sourceRunCount, 16);
  assert.equal(matrix.cellCount, 912);
  assert.equal(matrix.passedCellCount, 912);
  assert.deepEqual(matrix.failedCells, []);
  assert.deepEqual(matrix.acceptedExclusions, []);
  assertV18MatrixClosed(matrix);

  const familyCounts = new Map();
  for (const cell of matrix.cells) {
    assert.ok(cell.scenarioId);
    assert.ok(cell.branchMode);
    assert.ok(cell.proofFamily);
    assert.ok(cell.theoremId);
    assert.ok(cell.evidencePredicateId);
    assert.ok(cell.replayStepIds.length >= 1);
    assert.ok(cell.requiredArtifactPaths.length >= 1);
    assert.ok(cell.evidencePaths.length >= 1);
    assert.ok(cell.evidenceDigestRefs.length >= 1);
    assert.equal(cell.passed, true);
    familyCounts.set(cell.proofFamily, (familyCounts.get(cell.proofFamily) || 0) + 1);
  }

  assert.equal(familyCounts.get('prompt-completeness'), 128);
  assert.equal(familyCounts.get('settlement-source-to-shares'), 112);
  assert.equal(familyCounts.get('proof-contract'), 96);
});
