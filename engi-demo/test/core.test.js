import test from 'node:test';
import assert from 'node:assert/strict';
import {
  canonicalJson,
  buildInitialState,
  buildNeedDescriptor,
  measureNeedFromScenario,
  recallCandidates,
  evaluateCandidates,
  assembleAssetPack,
  publicState,
  runMakeEngiBranch,
  makeCandidateAsset,
  METERED_MICRO_UNITS
} from '../src/spec-v6-demo.js';

test('canonicalJson is stable across key order', () => {
  const a = { b: 2, a: 1, c: { y: 2, x: 1 } };
  const b = { c: { x: 1, y: 2 }, a: 1, b: 2 };
  assert.equal(canonicalJson(a), canonicalJson(b));
});

test('buildInitialState seeds buyers, scenarios, assets, and ledger accounts', () => {
  const state = buildInitialState();
  assert.equal(state.assets.length, 3);
  assert.equal(state.buyers.length, 1);
  assert.equal(state.needScenarios.length, 1);
  assert.ok(state.ledger.accounts['buyer:frontier-code-systems:license_pool']);
});

test('buildNeedDescriptor carries canonical run evidence and parser failure contract', () => {
  const state = buildInitialState();
  const need = buildNeedDescriptor(state.needScenarios[0]);

  assert.equal(need.canonicalRunEvidence.runId, 'gha_run_auth_001');
  assert.equal(need.benchmarkParserContract.parserKind, 'github-actions.auth-remediation.v2');
  assert.equal(need.benchmarkParserContract.parserFailureContract.failClosed, true);
  assert.ok(need.measurementProvenance.length >= 2);
});

test('measureNeedFromScenario fails closed when canonical benchmark outputs are malformed', () => {
  const state = buildInitialState();
  const brokenScenario = {
    ...state.needScenarios[0],
    canonicalRunEvidence: {
      ...state.needScenarios[0].canonicalRunEvidence,
      extractedOutputs: {
        failingCases: [],
        weakDimensions: [],
        baselineMetrics: {}
      }
    }
  };

  assert.throws(() => measureNeedFromScenario(brokenScenario), /parser validation failed/i);
});

test('makeCandidateAsset creates spec-shaped candidate asset with content units', () => {
  const asset = makeCandidateAsset({
    title: 'Asset',
    author: 'Tester',
    artifactKind: 'runbook',
    content: 'validate issuer compatibility\n\nrerun benchmark workflow'
  });

  assert.match(asset.assetId, /^asset_/);
  assert.equal(asset.artifactKind, 'runbook');
  assert.equal(asset.contentUnits.length, 2);
  assert.ok(asset.contentRoot.startsWith('sha256:'));
  assert.equal(asset.sourceMaterialBinding.confidentiality, 'private-required');
  assert.equal(asset.attestations.length, 1);
});

test('makeCandidateAsset extracts symbols, paths, config keys, and stacks', () => {
  const asset = makeCandidateAsset({
    title: 'Signal-rich asset',
    author: 'Tester',
    artifactKind: 'patch',
    content: 'Update SessionValidator in services/auth/session_validator.rs using auth.issuer.compatibility.window on node and jwt stacks.'
  });

  const unit = asset.contentUnits[0];
  assert.ok(unit.extracted.symbols.includes('SessionValidator'));
  assert.ok(unit.extracted.paths.includes('services/auth/session_validator.rs'));
  assert.ok(unit.extracted.configKeys.includes('auth.issuer.compatibility.window'));
  assert.ok(unit.extracted.stackTags.includes('node'));
  assert.ok(unit.extracted.stackTags.includes('jwt'));
});

test('recallCandidates emits weighted channel hits and fusion summary', () => {
  const state = buildInitialState();
  const need = buildNeedDescriptor(state.needScenarios[0]);
  const recalled = recallCandidates(need, state.assets);

  assert.ok(recalled.length >= 3);
  assert.ok(recalled[0].recallProvenance.some((entry) => entry.channelId === 'pathSearch'));
  assert.ok(recalled[0].fusion.contributingChannels.length >= 2);
  assert.ok(recalled[0].recallScore > 0);
});

test('evaluateCandidates separates ranking from verification and produces use tiers', () => {
  const state = buildInitialState();
  const need = buildNeedDescriptor(state.needScenarios[0]);
  const evaluated = evaluateCandidates(need, state.assets);

  assert.ok(evaluated.length >= 3);
  assert.ok(evaluated[0].ranking.needMatch.finalScore > 0);
  assert.ok(evaluated[0].ranking.benchmarkImpact.finalScore > 0);
  assert.ok(evaluated[0].ranking.actionability.finalScore > 0);
  assert.ok(evaluated[0].ranking.wholeAssetNeedScore > 0);
  assert.ok(evaluated[0].ranking.explainability.strongestSignals.length >= 3);
  assert.ok(evaluated.some((candidate) => candidate.useTier === 'settlement-eligible'));
  assert.ok(evaluated.some((candidate) => candidate.useTier === 'context-only' || candidate.useTier === 'patch-eligible'));
});

test('restricted issuer remains non-settlement even if ranking is strong', () => {
  const state = buildInitialState();
  const need = buildNeedDescriptor(state.needScenarios[0]);
  const restricted = evaluateCandidates(need, state.assets).find((candidate) => candidate.asset.metadata.issuerPolicyStatus === 'restricted');

  assert.ok(restricted);
  assert.notEqual(restricted.useTier, 'settlement-eligible');
});

test('revoked issuer becomes rejected', () => {
  const state = buildInitialState();
  const revokedAsset = makeCandidateAsset({
    title: 'Revoked issuer patch',
    author: 'Bad Actor',
    artifactKind: 'patch',
    issuerPolicyStatus: 'revoked',
    content: 'restoreLegacyVerifier for services/auth/rollback.ts'
  });
  const need = buildNeedDescriptor(state.needScenarios[0]);
  const evaluated = evaluateCandidates(need, [revokedAsset, ...state.assets]);
  const revoked = evaluated.find((candidate) => candidate.assetId === revokedAsset.assetId);

  assert.equal(revoked.verification.issuerPolicyStatus.status, 'revoked');
  assert.equal(revoked.useTier, 'reject');
});

test('assembleAssetPack selects allowed tiers and locks roots', () => {
  const state = buildInitialState();
  const need = buildNeedDescriptor(state.needScenarios[0]);
  const evaluated = evaluateCandidates(need, state.assets);
  const assetPack = assembleAssetPack(need, evaluated, 'patch');

  assert.ok(assetPack.assetPackId.startsWith('asset_pack_'));
  assert.ok(assetPack.selectedAssets.length > 0);
  assert.equal(assetPack.selectedAssets.length, assetPack.lockedContentRoots.length);
  assert.equal(assetPack.branchMode, 'patch');
});

test('context-mode asset pack can admit context-only candidates', () => {
  const state = buildInitialState();
  const lowEvidence = makeCandidateAsset({
    title: 'Context incident notes',
    author: 'Tester',
    artifactKind: 'incident-note',
    testsPassed: false,
    typecheckPassed: false,
    staticAnalysisPassed: false,
    benchmarkRan: false,
    content: 'issuer mismatch breaks older services and audit receipts'
  });
  const need = buildNeedDescriptor(state.needScenarios[0]);
  const evaluated = evaluateCandidates(need, [lowEvidence, ...state.assets]);
  const assetPack = assembleAssetPack(need, evaluated, 'context');

  assert.equal(assetPack.branchMode, 'context');
  assert.ok(assetPack.selectedAssets.length >= 1);
});

test('runMakeEngiBranch produces branch artifacts and exact journal settlement', () => {
  const state = buildInitialState();
  const { nextState, latestRun } = runMakeEngiBranch(state, {});

  assert.equal(latestRun.needLifecycle, 'settled');
  assert.ok(latestRun.branchArtifacts.files['.engi/need.json']);
  assert.ok(latestRun.branchArtifacts.files['.engi/system-proof-bundle.json']);
  assert.ok(latestRun.branchArtifacts.files['.engi/policy-release.json']);
  assert.ok(latestRun.branchArtifacts.files['ENGI_NEED.md']);
  assert.equal(latestRun.settlementPreview.meteredMicroUnits, METERED_MICRO_UNITS);
  assert.equal(latestRun.journalDiff.invariants.debitsEqualCredits, true);
  assert.equal(latestRun.journalDiff.invariants.rawSharesNormalized, true);
  assert.equal(latestRun.journalDiff.invariants.settledSharesNormalized, true);
  assert.equal(latestRun.journalDiff.totals.difference, '0');
  assert.notDeepEqual(nextState.ledger.accounts, state.ledger.accounts);
});

test('journal diff raw and settled shares sum to 10000 basis points', () => {
  const state = buildInitialState();
  const { latestRun } = runMakeEngiBranch(state, {});

  const rawTotal = latestRun.journalDiff.rawShares.reduce((sum, item) => sum + item.shareBp, 0);
  const settledTotal = latestRun.journalDiff.settledShares.reduce((sum, item) => sum + item.settledShareBp, 0);
  assert.equal(rawTotal, 10000);
  assert.equal(settledTotal, 10000);
});

test('buyer debit equals total supplier credits exactly', () => {
  const state = buildInitialState();
  const { latestRun } = runMakeEngiBranch(state, {});

  const debit = BigInt(latestRun.journalDiff.debits[0].delta);
  const credits = latestRun.journalDiff.credits.reduce((sum, entry) => sum + BigInt(entry.delta), 0n);
  assert.equal(-debit, credits);
  assert.equal(String(credits), latestRun.journalDiff.totals.credited);
});

test('asset pack lock covers selected assets and unit hashes', () => {
  const state = buildInitialState();
  const { latestRun } = runMakeEngiBranch(state, {});

  assert.deepEqual(
    latestRun.assetPackLock.assets.map((entry) => entry.assetId).sort(),
    latestRun.assetPack.selectedAssets.slice().sort()
  );
  assert.ok(latestRun.assetPackLock.units.every((unit) => unit.unitHash.startsWith('sha256:')));
});

test('system proof bundle includes measurement, selection, identity, data-flow, and settlement proofs', () => {
  const state = buildInitialState();
  const { latestRun } = runMakeEngiBranch(state, {});
  const proof = latestRun.systemProofBundle;

  assert.ok(proof.assetMeasurementProofs.length >= 1);
  assert.equal(proof.selectionConsistencyProof.allSelectedAssetsRespectUseTier, true);
  assert.equal(proof.identityAuthorizationProof.allStateChangingActionsAuthorized, true);
  assert.equal(proof.sensitiveDataFlowProof.noUnauthorizedPublicDisclosure, true);
  assert.equal(proof.settlementProof.theoremChecks.debitsEqualCredits, true);
});

test('authorization decisions and policy release are persisted on latest run', () => {
  const state = buildInitialState();
  const { latestRun } = runMakeEngiBranch(state, {});

  assert.ok(latestRun.authorizationDecisions.length >= 3);
  assert.ok(latestRun.identityBindings.some((binding) => binding.principalClass === 'buyer-principal'));
  assert.ok(latestRun.sensitiveDataFlowRecords.length >= 3);
  assert.equal(latestRun.policyRelease.confidentialityDefault, 'private-required');
  assert.equal(latestRun.policyRelease.revocationRules.revokedIssuerBlocksNewSettlement, true);
});

test('branch artifacts materialize selected source material only', () => {
  const state = buildInitialState();
  const { latestRun } = runMakeEngiBranch(state, {});
  const materializedPaths = Object.keys(latestRun.branchArtifacts.files).filter((file) => file.startsWith('.engi/source-material/'));

  assert.equal(materializedPaths.length, latestRun.assetPack.selectedAssets.length);
  for (const assetId of latestRun.assetPack.selectedAssets) {
    assert.ok(materializedPaths.some((file) => file.includes(assetId)));
  }
});

test('ENGI_NEED markdown includes parser contract and settlement preview summary', () => {
  const state = buildInitialState();
  const { latestRun } = runMakeEngiBranch(state, {});
  const markdown = latestRun.branchArtifacts.files['ENGI_NEED.md'];

  assert.match(markdown, /Benchmark parser contract/);
  assert.match(markdown, /raw share asset count/);
  assert.match(markdown, /github-actions.auth-remediation.v2/);
});

test('publicState returns public projection including latest run and parser metadata', () => {
  const state = buildInitialState();
  const { nextState } = runMakeEngiBranch(state, {});
  const projected = publicState(nextState);

  assert.equal(projected.assets.length, 3);
  assert.ok(projected.latestRun.need.needId);
  assert.ok(projected.latestRun.assetPack.assetPackId);
  assert.equal(projected.needScenarios[0].parserKind, 'github-actions.auth-remediation.v2');
  assert.equal(projected.policyRelease.releaseId, 'policy-release-engi-v6-demo-2026-04-02');
  assert.ok(projected.runHistory.length, 1);
});

test('deliverables manifest and journal receipts remain internally consistent', () => {
  const state = buildInitialState();
  const { latestRun } = runMakeEngiBranch(state, {});

  assert.ok(latestRun.deliverablesManifest.deliverables.some((entry) => entry.path === '.engi/settlement-proof.json'));
  assert.equal(latestRun.journalDiff.receipts.length, 2);
  assert.ok(latestRun.journalDiff.credits.every((entry) => entry.unitRefs.length > 0));
  assert.equal(latestRun.systemProofBundle.settlementProof.theoremChecks.stateRootIntegrity, true);
});

test('runMakeEngiBranch fails if no settlement-eligible assets exist', () => {
  const state = buildInitialState();
  const downgradedState = {
    ...state,
    assets: state.assets.map((asset) => makeCandidateAsset({
      ...asset.metadata,
      title: asset.title,
      author: asset.metadata.author,
      artifactKind: asset.artifactKind,
      content: asset.metadata.privateContent,
      sourcePaths: asset.metadata.sourcePaths,
      declaredStacks: asset.metadata.declaredStacks,
      declaredConstraints: asset.metadata.declaredConstraints,
      testsPassed: false,
      typecheckPassed: false,
      staticAnalysisPassed: false,
      benchmarkRan: false,
      issuerPolicyStatus: 'restricted'
    }))
  };

  assert.throws(() => runMakeEngiBranch(downgradedState, {}), /No candidates survived into the asset pack/);
});
