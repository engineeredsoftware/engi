import assert from 'node:assert/strict';
import test from 'node:test';

import {
  buildAiReadingDemonstrationInput,
  runAiReadingDominantDemonstration,
} from '../src/ai-reading-demonstration.js';

test('V42 AI-reading demonstration proves AssetPack lift over public data baseline', () => {
  const result = runAiReadingDominantDemonstration();

  assert.equal(result.demonstrationId, 'v42-ai-reading-assetpack-improvement');
  assert.equal(result.deterministicLocalOnly, true);
  assert.equal(result.outsideSourceImportsAllowed, false);
  assert.equal(result.fitResultState, 'worthy_fit');
  assert.deepEqual(result.selectedDepositIds, ['deposit-auth-migration-runbook']);
  assert.equal(result.assetPackPreview.status, 'preview_only');
  assert.equal(result.assetPackPreview.protectedSource, 'withheld_until_settlement');
  assert.equal(result.sourceSafety.protectedSourceBeforeSettlement, 'withheld_until_settlement');
  assert.equal(result.sourceSafety.sourceBearingDeliveryRequiresSettlement, true);
  assert.equal(result.publicDataOnlyBaseline.score.scoreBp, 0);
  assert.equal(result.assetPackEnhancedReading.score.scoreBp, 10000);
  assert.ok(result.improvement.upliftBp >= result.improvement.minimumUpliftBp);
  assert.equal(result.improvement.improved, true);
  assert.match(result.proof.evidenceRoot, /^sha256:/u);
  assert.match(result.proof.queryRoot, /^sha256:/u);
  assert.match(result.proof.rankingRoot, /^sha256:/u);
  assert.match(result.proof.assetPackProofRoot, /^sha256:/u);
});

test('V42 AI-reading demonstration input is self-contained and deterministic', () => {
  const input = buildAiReadingDemonstrationInput();
  const first = runAiReadingDominantDemonstration(input);
  const second = runAiReadingDominantDemonstration(input);

  assert.equal(input.deposits.length, 1);
  assert.equal(input.deposits[0].depositId, 'deposit-auth-migration-runbook');
  assert.equal(input.deposits[0].hasWalletOrAttestationProof, true);
  assert.equal(input.deposits[0].hasAssetMeasurementEvidence, true);
  assert.deepEqual(first.selectedDepositIds, second.selectedDepositIds);
  assert.deepEqual(first.improvement, second.improvement);
  assert.deepEqual(first.proof, second.proof);
});

