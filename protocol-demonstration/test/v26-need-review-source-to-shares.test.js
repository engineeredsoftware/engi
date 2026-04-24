import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';

import {
  buildInitialState,
  measureNeedFromScenario,
  reviewNeedForFitSearch,
  runMakeBitcodeBranch
} from '../src/bitcode-demo.js';
import { createAppContext } from '../server.js';

function parseBranchArtifact(latestRun, path) {
  return JSON.parse(latestRun.branchArtifacts.files[path]);
}

test('V26 need measurement emits a reviewable Need before fit search admission', () => {
  const state = buildInitialState();
  const measurement = measureNeedFromScenario(state.needScenarios[0]);
  const reviewableNeed = measurement.reviewableNeed;

  assert.equal(reviewableNeed.protocolFocus, 'source-to-shares');
  assert.equal(reviewableNeed.reviewStage, 'post-measurement-pre-fit');
  assert.equal(reviewableNeed.status, 'ready-for-review');
  assert.deepEqual(reviewableNeed.allowedActions, ['accept', 'reject', 'remeasure-with-feedback']);
  assert.equal(reviewableNeed.fitSearchAdmission.admitted, false);
  assert.ok(reviewableNeed.measurementRefs.measurementHash.startsWith('sha256:'));

  const rejected = reviewNeedForFitSearch(reviewableNeed, {
    action: 'reject',
    feedback: ['Measured Need is too broad for source-to-shares fit search.']
  });
  assert.equal(rejected.status, 'rejected');
  assert.equal(rejected.fitSearchAdmission.admitted, false);
  assert.match(rejected.reviewDecision.feedback[0], /too broad/u);

  const remeasure = reviewNeedForFitSearch(reviewableNeed, {
    action: 'remeasure-with-feedback',
    feedback: ['Narrow touched paths and closure criteria before fitting.']
  });
  assert.equal(remeasure.status, 'remeasure-requested');
  assert.equal(remeasure.fitSearchAdmission.admitted, false);

  const accepted = reviewNeedForFitSearch(reviewableNeed, { action: 'accept' });
  assert.equal(accepted.status, 'accepted');
  assert.equal(accepted.fitSearchAdmission.admitted, true);
  assert.equal(accepted.reviewDecision.transition.to, 'find-fitting-settlement-admitted');
});

test('V26 branch runs materialize accepted need review before ranking and AssetPack fitting', () => {
  const { latestRun } = runMakeBitcodeBranch(buildInitialState());
  const needReview = parseBranchArtifact(latestRun, '.bitcode/need-review.json');
  const telemetry = parseBranchArtifact(latestRun, '.bitcode/pipeline-telemetry.json');
  const eventStages = telemetry.events.map((event) => event.stage);

  assert.equal(latestRun.needReview.status, 'accepted');
  assert.equal(needReview.status, 'accepted');
  assert.equal(needReview.protocolFocus, 'source-to-shares');
  assert.equal(needReview.reviewStage, 'post-measurement-pre-fit');
  assert.equal(needReview.fitSearchAdmission.admitted, true);
  assert.ok(latestRun.branchArtifacts.files['.bitcode/need-review.json']);
  assert.ok(latestRun.needMeasurement.reviewableNeed.reviewableNeedHash);
  assert.ok(latestRun.needMeasurement.needReview.proofHash);
  assert.ok(eventStages.indexOf('need-measurement') < eventStages.indexOf('need-review'));
  assert.ok(eventStages.indexOf('need-review') < eventStages.indexOf('recall-and-ranking'));
});

test('V26 app context exposes reviewable Need API and blocks explicit non-accept fit search', () => {
  const app = createAppContext({
    dataPath: `/tmp/bitcode-need-review-${Date.now()}.json`
  });
  app.ensureState();

  const preview = app.getNeedReview({});
  assert.equal(preview.protocolFocus, 'source-to-shares');
  assert.equal(preview.reviewableNeed.status, 'ready-for-review');
  assert.equal(preview.fitSearchAdmission.admitted, false);
  assert.equal(preview.needFittingReview.artifactKind, 'bitcode-need-fitting-review');
  assert.equal(preview.needFittingReview.requiredBefore, 'find-fitting-settlement');
  assert.equal(preview.needFittingReview.settlementReview.reviewStage, 'present-fit-for-settlement-review');
  assert.equal(
    preview.needFittingReview.settlementReview.quantizedObjectiveContractId,
    'bitcode.source-to-shares.quantized-fit-quality-oc.v26'
  );

  const remeasure = app.reviewNeed({
    needReviewAction: 'remeasure-with-feedback',
    needReviewFeedback: ['Narrow the source-to-shares Need before fitting.']
  });
  assert.equal(remeasure.needReview.status, 'remeasure-requested');
  assert.equal(remeasure.fitSearchAdmission.admitted, false);
  assert.equal(remeasure.needFittingReview.status, 'remeasure-requested');
  assert.equal(remeasure.needFittingReview.action, 'remeasure-with-feedback');
  assert.equal(app.readState().latestNeedReview.status, 'remeasure-requested');

  assert.throws(
    () => runMakeBitcodeBranch(buildInitialState(), { needReviewAction: 'reject' }),
    /fit search cannot proceed/u
  );
});

test('V26 settlement review and receipts show quantized source-to-shares fit qualities', () => {
  const { latestRun } = runMakeBitcodeBranch(buildInitialState());
  const sourceToShares = latestRun.sourceToSharesArtifact;
  const settlementPreview = latestRun.settlementPreview;
  const settlementProof = parseBranchArtifact(latestRun, '.bitcode/settlement-source-to-shares-proof.json');
  const proofWitnessManifest = parseBranchArtifact(latestRun, '.bitcode/proof-witness-manifest.json');
  const objectiveId = 'bitcode.source-to-shares.quantized-fit-quality-oc.v26';

  assert.equal(sourceToShares.protocolFocus, 'source-to-shares');
  assert.equal(sourceToShares.quantizedObjectiveContractId, objectiveId);
  assert.equal(sourceToShares.quantizedFitQualities.objectiveContractId, objectiveId);
  assert.ok(sourceToShares.quantizedFitQualities.qualities.length >= 5);
  assert.ok(sourceToShares.quantizedFitQualities.fitQualityHash.startsWith('sha256:'));

  assert.equal(settlementPreview.reviewStage, 'present-fit-for-settlement-review');
  assert.equal(settlementPreview.presentFitForSettlementReview.objectiveContractId, objectiveId);
  assert.equal(settlementPreview.presentFitForSettlementReview.fitQualities.fitQualityHash, sourceToShares.quantizedFitQualities.fitQualityHash);
  assert.ok(settlementPreview.presentFitForSettlementReview.receiptRefs.length >= 3);

  assert.ok(settlementPreview.receipts.every((receipt) => receipt.quantizedObjectiveContractId === objectiveId));
  assert.ok(settlementPreview.receipts.every((receipt) => receipt.quantizedFitQualities?.fitQualityHash === sourceToShares.quantizedFitQualities.fitQualityHash));
  assert.ok(settlementPreview.receipts.some((receipt) => receipt.receiptKind === 'settlement-asset-pack-fit-quality'));

  const qualityTheorem = settlementProof.theoremVerdicts.find((entry) => entry.theoremId === 'settlement_source_to_shares.quantized_fit_quality_receipting');
  assert.equal(qualityTheorem?.passed, true);
  assert.ok(settlementProof.witnessArtifactPaths.includes('.bitcode/settlement-preview.json'));
  assert.ok(proofWitnessManifest.artifactDigestByPath['.bitcode/settlement-preview.json'].proofFamilies.includes('settlement-source-to-shares'));
});

test('V26 Need-fitting Exchange and Terminal source stays TypeScript-owned without generated JS mirrors', () => {
  [
    'uapi/app/api/need-review/route.js',
    'uapi/app/api/make-bitcode-branch/route.js',
    'uapi/app/api/state/route.js',
    'uapi/lib/bitcode-app-context.js',
    'uapi/tests/api/needReviewRoute.test.js',
    'uapi/tests/api/needReviewProtocolParity.test.js',
    'uapi/tests/applicationNeedScenarios.test.js',
    'uapi/tests/applicationClosureState.test.js'
  ].forEach((sourcePath) => {
    assert.equal(existsSync(sourcePath), false, `${sourcePath} must not be emitted beside TypeScript source`);
  });
});
