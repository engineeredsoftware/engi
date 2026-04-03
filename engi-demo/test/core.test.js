import test from 'node:test';
import assert from 'node:assert/strict';
import {
  canonicalJson,
  receiptHash,
  makeAssetCommitment,
  rankChunksForQuery,
  buildBundleIssuance,
  allocateUnits,
  BUNDLE_PRICE_UNITS
} from '../src/engi-core.js';
import { initialState } from '../src/seed.js';
import { buildBenchmarkComparison } from '../src/benchmark-model.js';
import { buildConservationCheck } from '../src/conservation-check.js';
import { buildProofLog } from '../src/proof-log.js';
import { explainRankChunksForQuery } from '../src/server-ranking.js';

test('canonicalJson is stable across key order and receiptHash matches', () => {
  const a = { b: 2, a: 1, c: { y: 2, x: 1 } };
  const b = { c: { x: 1, y: 2 }, a: 1, b: 2 };
  assert.equal(canonicalJson(a), canonicalJson(b));
  assert.equal(receiptHash(a), receiptHash(b));
});

test('makeAssetCommitment creates public + private structure with measurement', () => {
  const asset = makeAssetCommitment({
    title: 'Asset',
    author: 'Tester',
    content: 'alpha beta\n\ncharlie delta',
    compileOk: true,
    testsOk: true,
    proofOk: false
  });

  assert.match(asset.assetId, /^asset_/);
  assert.equal(asset.privateBlob.chunks.length, 2);
  assert.equal(asset.chunkIndex.length, 2);
  assert.ok(asset.measurement.totalBp > 0);
  assert.equal(asset.verification.compileOk, true);
});

test('rankChunksForQuery returns relevant chunks and explanation count matches', () => {
  const state = initialState();
  const { rankedChunks, explanations } = explainRankChunksForQuery(
    'enterprise auth migration rollback for monorepo services with issuer mismatch',
    state.assets
  );

  assert.ok(rankedChunks.length > 0);
  assert.equal(rankedChunks.length, explanations.length);
  assert.match(rankedChunks[0].title, /auth migration rollback/i);
  assert.ok(explanations[0].finalScoreBp > 0);
});

test('buildBundleIssuance conserves units and returns bundle payload', () => {
  const state = initialState();
  const license = state.licenses.find((item) => item.orgId === 'demo-ai-lab');
  const ranked = rankChunksForQuery('enterprise auth migration rollback issuer mismatch', state.assets);
  const result = buildBundleIssuance({
    orgId: license.orgId,
    orgName: license.orgName,
    query: 'enterprise auth migration rollback issuer mismatch',
    license,
    rankedChunks: ranked
  });

  assert.equal(result.publicReceipt.meteredUnits, BUNDLE_PRICE_UNITS);
  assert.ok(result.privateBundle.chunks.length > 0);
  assert.equal(
    result.allocationReceipt.allocations.reduce((sum, item) => sum + item.units, 0),
    BUNDLE_PRICE_UNITS
  );
});

test('allocateUnits rounds but still conserves total units', () => {
  const allocations = allocateUnits(100, [
    { assetId: 'a', author: 'A', contributionBp: 3333 },
    { assetId: 'b', author: 'B', contributionBp: 3333 },
    { assetId: 'c', author: 'C', contributionBp: 3334 }
  ]);

  assert.equal(allocations.reduce((sum, item) => sum + item.units, 0), 100);
});

test('benchmark comparison carries task, outcomes, and buyer impact', () => {
  const comparison = buildBenchmarkComparison({
    bundleId: 'bundle_x',
    benchmark: 'production-auth-remediation',
    baselineBp: 4200,
    treatmentBp: 6700
  });

  assert.equal(comparison.upliftBp, 2500);
  assert.match(comparison.task, /issuer mismatch/i);
  assert.match(comparison.businessImpact, /faster safe rollback/i);
});

test('conservation check reports verified state', () => {
  const report = buildConservationCheck('bundle_x', 100, [
    { units: 70 },
    { units: 30 }
  ]);

  assert.equal(report.conserved, true);
  assert.equal(report.difference, 0);
});

test('proof log summarizes receipts in chronological order', () => {
  const log = buildProofLog({
    receipts: [
      { type: 'utility', receiptId: 'u1', upliftBp: 10, bundleId: 'bundle', issuedAt: '2026-01-02T00:00:00.000Z' },
      { type: 'allocation', receiptId: 'a1', totalUnits: 100, issuedAt: '2026-01-01T00:00:00.000Z' }
    ]
  });

  assert.equal(log[0].type, 'allocation');
  assert.equal(log[1].type, 'utility');
});
