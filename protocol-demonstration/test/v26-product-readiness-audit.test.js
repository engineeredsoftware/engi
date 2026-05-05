import test from 'node:test';
import assert from 'node:assert/strict';

import { buildV26ProductReadinessAudit } from '../src/canonical/v26-product-readiness-audit.js';

test('V26 product readiness audit is source-parity grounded for fifth-gate closure without claiming later gates', () => {
  const audit = buildV26ProductReadinessAudit({
    generatedAt: '2026-04-24T00:00:00.000Z',
    baseData: {
      canonicalCommit: 'test',
      generatorId: 'test',
      worktreeState: 'dirty-preview'
    }
  });

  assert.equal(audit.reportId, 'v26-product-readiness-audit');
  assert.equal(audit.baselinePassed, true);
  assert.equal(audit.closureClaim, true);
  assert.equal(audit.closureReadyProductCount, 9);
  assert.equal(audit.openProductCount, 0);
  assert.deepEqual(audit.notReadyFor, [
    'sixth-gate-mvp',
    'seventh-gate-commercial-testnet-launch',
    'eighth-gate-v26-definition-of-need'
  ]);

  const productIds = audit.products.map((product) => product.productId);
  assert.deepEqual(productIds, [
    'bitcode-protocol',
    'bitcode-exchange',
    'bitcode-terminal',
    'source-to-shares-need-fitting',
    'assetpack-execution',
    'conversations-rich-input',
    'auxillaries-readiness',
    'connected-interfaces',
    'proof-and-promotion'
  ]);

  for (const product of audit.products) {
    assert.equal(product.baselineEvidencePassed, true, `${product.productId} baseline evidence must pass`);
    assert.equal(product.readyForFifthGateBaseline, true, `${product.productId} must be baseline-audited`);
    assert.equal(product.readyForFifthGateClosure, true, `${product.productId} must be fifth-gate closure-ready`);
    assert.equal(product.readyForSixthGateMvp, false, `${product.productId} must not claim sixth-gate MVP readiness`);
    assert.equal(product.closureClaim, true, `${product.productId} must claim only fifth-gate closure readiness`);
    assert.ok(product.evidenceChecks.some((entry) => entry.file === 'BITCODE_SPEC_V26_PARITY_MATRIX.md'));
    assert.ok(product.openReadiness.length > 0, `${product.productId} must carry remaining readiness blockers`);
  }
});
