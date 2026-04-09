import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildCanonicalProvenData,
  collectCanonicalProvenRuns
} from '../src/canonical/proven-generator.js';
import {
  buildV19PositiveMatrices,
  buildV19VolatilityInventory
} from '../src/canonical/v19-canon.js';

function buildV19Fixture() {
  const collected = collectCanonicalProvenRuns({
    scenarioIds: ['auth-issuer-rollback'],
    branchModes: ['patch']
  });
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
  return { data, positiveMatrices };
}

test('V19 volatility inventory classifies canonical proof artifacts without blocking findings', () => {
  const { data, positiveMatrices } = buildV19Fixture();
  const inventory = buildV19VolatilityInventory({
    data,
    positiveMatrices,
    version: 'V19',
    generatedAt: '2026-04-09T00:00:00.000Z'
  });

  assert.equal(inventory.inventoryId, 'v19-volatility-inventory');
  assert.equal(inventory.passed, true);
  assert.deepEqual(inventory.blockingFindings, []);
  assert.ok(inventory.classificationCounts['canonical-stable'] >= 1);
  assert.ok(inventory.classificationCounts['context-bound'] >= 1);
});

test('V19 volatility inventory fails closed on unfixed timestamps and random fields', () => {
  const { data, positiveMatrices } = buildV19Fixture();
  const inventory = buildV19VolatilityInventory({
    data,
    positiveMatrices,
    version: 'V19',
    generatedAt: '2026-04-09T00:00:00.000Z',
    extraArtifacts: {
      volatileFixture: {
        generatedAt: '2026-04-09T12:34:56.789Z',
        randomNonce: 'nonce-123'
      }
    }
  });

  assert.equal(inventory.passed, false);
  assert.ok(inventory.blockingFindings.some((/** @type {any} */ finding) => finding.artifactPath === 'volatileFixture' && finding.fieldPath === 'generatedAt'));
  assert.ok(inventory.blockingFindings.some((/** @type {any} */ finding) => finding.artifactPath === 'volatileFixture' && finding.fieldPath === 'randomNonce'));
});
