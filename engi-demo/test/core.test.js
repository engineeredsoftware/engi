import test from 'node:test';
import assert from 'node:assert/strict';
import {
  canonicalJson,
  buildInitialState,
  buildNeedDescriptor,
  buildPromptContract,
  assertPromptContractComplete,
  measureNeedFromScenario,
  recallCandidates,
  evaluateCandidates,
  assembleAssetPack,
  publicState,
  runMakeEngiBranch,
  makeCandidateAsset,
  METERED_MICRO_UNITS
} from '../src/engi-demo.js';

test('canonicalJson is stable across key order', () => {
  const a = { b: 2, a: 1, c: { y: 2, x: 1 } };
  const b = { c: { x: 1, y: 2 }, a: 1, b: 2 };
  assert.equal(canonicalJson(a), canonicalJson(b));
});

test('buildInitialState seeds buyers, scenarios, assets, and ledger accounts', () => {
  const state = buildInitialState();
  assert.equal(state.assets.length, 11);
  assert.equal(state.buyers.length, 1);
  assert.equal(state.needScenarios.length, 8);
  assert.equal(state.githubAppSessions.length, 7);
  assert.ok(state.repoArtifactInventory.length >= 10);
  assert.deepEqual(
    [...new Set(state.needScenarios.map((scenario) => scenario.repo))].sort(),
    [...new Set(state.githubAppSessions.map((session) => session.repo))].sort()
  );
  assert.deepEqual(
    [...new Set(state.githubAppSessions.map((session) => session.repo))].sort(),
    [...new Set(state.repoArtifactInventory.map((entry) => entry.repo))].sort()
  );
  assert.ok(state.needScenarios.some((scenario) => scenario.scenarioFamily === 'proof-heavy-rust-validator'));
  assert.ok(state.needScenarios.some((scenario) => scenario.scenarioFamily === 'privacy-boundary-stress'));
  assert.ok(state.needScenarios.some((scenario) => scenario.scenarioFamily === 'polyglot-repo-benchmark-remediation'));
  assert.ok(state.needScenarios.some((scenario) => scenario.scenarioFamily === 'many-asset-settlement-normalization'));
  assert.ok(state.ledger.accounts['buyer:frontier-code-systems:license_pool']);
  assert.equal(Object.keys(state.ledger.accounts).length, state.assets.length + 1);
});

test('publicState exposes repo supply and boundary reality before any run', () => {
  const state = buildInitialState();
  const projected = publicState(state);

  assert.equal(projected.specVersion, 'ENGI Spec V12 deterministic local prototype');
  assert.equal(projected.repoSupplySurface.repoCount, state.githubAppSessions.length);
  assert.equal(projected.repoSupplySurface.inventoryEntryCount, state.repoArtifactInventory.length);
  assert.ok(projected.repoSupplySurface.repos.every((repo) => repo.artifactKindCounts));
  assert.ok(projected.repoSupplySurface.repos.every((repo) => repo.demonstrationProfileCounts));
  assert.equal(projected.boundaryRealitySurface.posture, 'honest-local-prototype');
  assert.ok(projected.boundaryRealitySurface.stages.some((stage) => stage.localStatus === 'modeled-local'));
  assert.ok(projected.boundaryRealitySurface.stages.some((stage) => stage.localStatus === 'executed-local'));
  assert.ok(projected.needScenarios.every((scenario) => scenario.needingSurface?.needId));
  assert.ok(projected.needScenarios.every((scenario) => scenario.needingSurface?.closureCriteria?.length >= 1));
});

test('publicState exposes V12 profile comparison guidance for the demo shell', () => {
  const projected = publicState(buildInitialState());

  assert.equal(projected.profileCompositions.distinctionBasis, 'deposit-and-need');
  assert.deepEqual(projected.profileCompositions.comparisonAxes, [
    'deposit mode',
    'need mode',
    'asset-pack shape',
    'settlement shape',
    'boundary hand-off'
  ]);
  assert.equal(projected.profileCompositions.demoOperatorGuidance.recommendedWalkthrough.length, 5);
  assert.match(projected.profileCompositions.demoOperatorGuidance.recommendedWalkthrough[0], /repo supply/i);
  assert.match(projected.profileCompositions.demoOperatorGuidance.boundaryTruthPlacement, /Boundary reality/i);
});

test('buildNeedDescriptor carries canonical run evidence, parser failure contract, and derivation closure', () => {
  const state = buildInitialState();
  const need = buildNeedDescriptor(state.needScenarios[0]);

  assert.equal(need.canonicalRunEvidence.runId, 'gha_run_auth_001');
  assert.equal(need.benchmarkParserContract.parserKind, 'github-actions.auth-remediation.v3');
  assert.equal(need.benchmarkParserContract.parserFailureContract.failClosed, true);
  assert.equal(need.conformanceProfile, 'Profile A — targeted deposit / bounded need');
  assert.equal(need.productionIntentProfile, 'Profile B — normalization deposit / composite need');
  assert.equal(need.demonstrationProfile.profileId, 'A');
  assert.equal(need.demonstrationProfile.shortLabel, 'Targeted deposit');
  assert.equal(need.fieldDerivations.task.source, 'seed.expectedTask');
  assert.equal(need.fieldDerivations.failingCases.source, 'canonicalBenchmarkOutputs.failingCases');
  assert.equal(need.fieldDerivations.closureCriteria.source, 'deterministic-synthesis');
  assert.ok(need.closureCriteria.length >= 3);
  assert.ok(need.measurementProvenance.length >= 2);
  assert.ok(Array.isArray(need.recallChannelContracts));
  assert.ok(need.recallChannelContracts.some((entry) => entry.channelId === 'lexicalSearch' && entry.signalFamily === 'lexical'));
});

test('measureNeedFromScenario materializes prompt surfaces with interpolated lineage and downstream bindings', () => {
  const state = buildInitialState();
  const measurement = measureNeedFromScenario(state.needScenarios[0]);

  assert.ok(measurement.promptSurfaces.length >= 4);
  assert.equal(measurement.needDescriptor.promptSurfaces.length, measurement.promptSurfaces.length);
  assert.match(measurement.promptSurfaces[0].interpolatedPrompt, /frontier\/demo-auth/);
  assert.ok(measurement.promptSurfaces[0].contextInputs.length >= 3);
  assert.ok(measurement.promptSurfaces[0].lineage.downstreamArtifacts.includes('.engi/need.json'));
  assert.equal(measurement.promptCompletenessProof.allContractsComplete, true);
  assert.ok(measurement.promptContracts.every((contract) => contract.completeness.ok));
  assert.ok(measurement.staticExecutionReceipts.length >= 2);
  assert.ok(measurement.measurementProvenance.filter((entry) => entry.mode === 'static').every((entry) => entry.receiptRefs.length >= 1));
});

test('normalization-heavy scenarios resolve to Profile B', () => {
  const state = buildInitialState();
  const scenario = state.needScenarios.find((entry) => entry.scenarioId === 'auth-many-asset-normalization');
  const need = buildNeedDescriptor(scenario);

  assert.equal(need.demonstrationProfile.profileId, 'B');
  assert.equal(need.demonstrationProfile.shortLabel, 'Normalization deposit');
  assert.match(need.demonstrationProfile.needMode, /Need stays composite/i);
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

test('prompt contracts fail deterministically on missing placeholder bindings', () => {
  const promptContract = buildPromptContract({
    promptId: 'test.prompt.mismatch',
    templateVersion: 'spec-v9-demo-prompt.v1',
    template: 'Repo {{repo}} branch {{baseRef}}',
    contextInputs: [
      { field: 'repo', value: 'frontier/demo-auth', source: 'test' }
    ],
    outputFields: ['task'],
    downstreamArtifacts: ['.engi/need.json']
  });

  assert.equal(promptContract.completeness.ok, false);
  assert.deepEqual(promptContract.missingPlaceholderBindings, ['baseRef']);
  assert.throws(() => assertPromptContractComplete(promptContract), /prompt completeness failed/i);
});

test('prompt contracts require non-rendered context to be declared explicitly', () => {
  const promptContract = buildPromptContract({
    promptId: 'test.prompt.nonrendered',
    templateVersion: 'spec-v9-demo-prompt.v1',
    template: 'Repo {{repo}}',
    contextInputs: [
      { field: 'repo', value: 'frontier/demo-auth', source: 'test' },
      { field: 'repoPrivacy', value: 'private', source: 'test' }
    ],
    outputFields: ['task'],
    downstreamArtifacts: ['.engi/need.json']
  });

  assert.equal(promptContract.completeness.ok, false);
  assert.deepEqual(promptContract.unusedContextFields, ['repoPrivacy']);
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
  assert.equal(asset.assetMeasurement.vectorInterfaces.taskVectorSpace, 'task-semantic-space.v8');
  assert.equal(asset.uploadSurface.artifactType, 'runbook/operator-playbook');
  assert.equal(asset.identitySurface.signerClass, 'issuer-principal');
  assert.equal(asset.artifactSelectionSurface.intakeMode, 'raw-fallback');
  assert.equal(asset.addressingSurface.repo, 'frontier/demo-auth');
  assert.equal(asset.signingSurface.signingAlgorithm, 'ed25519');
  assert.equal(asset.githubAppAuthSurface.authMechanism, 'manual-unbound');
  assert.equal(asset.contentUnits[0].semanticInterfaces.embeddingHandOffReady, true);
});

test('inventory-backed candidate asset carries selection, addressing, signing, and GitHub App auth surfaces', () => {
  const state = buildInitialState();
  const authSession = state.githubAppSessions.find((session) => session.repo === 'frontier/demo-auth');
  const inventoryEntries = state.repoArtifactInventory.filter((entry) => entry.repo === 'frontier/demo-auth').slice(0, 2);
  const asset = makeCandidateAsset({
    title: 'Inventory-backed auth bundle',
    author: authSession.operatorLogin,
    artifactKind: 'mixed',
    sourceRepo: authSession.repo,
    authSession,
    inventoryEntries,
    operatorNote: 'Bundle these repo artifacts for auth rollback repair.',
    content: inventoryEntries.map((entry) => entry.content).join('\n\n---\n\n')
  });

  assert.equal(asset.artifactSelectionSurface.intakeMode, 'repo-artifact-selection-plus-note');
  assert.equal(asset.artifactSelectionSurface.authSessionId, authSession.authSessionId);
  assert.deepEqual(asset.addressingSurface.selectedInventoryEntryIds, inventoryEntries.map((entry) => entry.inventoryEntryId));
  assert.equal(asset.artifactSelectionSurface.rawFallbackUsed, false);
  assert.equal(asset.artifactSelectionSurface.selectedInventoryEntries.length, inventoryEntries.length);
  assert.equal(asset.signingSurface.signedAddressingRoot, asset.addressingSurface.addressingRoot);
  assert.equal(asset.signingSurface.signedSelectionRoot, asset.artifactSelectionSurface.selectedInventoryRoot);
  assert.equal(asset.signingSurface.signedGitHubAppAuthRoot, asset.githubAppAuthSurface.authPayloadHash);
  assert.equal(asset.signingSurface.signerAddress, authSession.defaultSignerAddress);
  assert.equal(asset.githubAppAuthSurface.authSessionId, authSession.authSessionId);
  assert.equal(asset.githubAppAuthSurface.installationId, authSession.installationId);
  assert.equal(asset.githubBoundary.installationId, authSession.installationId);
});

test('makeCandidateAsset extracts symbols, paths, config keys, stacks, and embedding specs', () => {
  const asset = makeCandidateAsset({
    title: 'Signal-rich asset',
    author: 'Tester',
    artifactKind: 'patch',
    content: 'Update SessionValidator in services/auth/session_validator.rs using auth.issuer.compatibility.window on node and jwt stacks.'
  });

  const unit = asset.contentUnits[0];
  assert.ok(unit.codeAnalysisFacts.symbols.includes('SessionValidator'));
  assert.ok(unit.codeAnalysisFacts.paths.includes('services/auth/session_validator.rs'));
  assert.ok(unit.codeAnalysisFacts.configKeys.includes('auth.issuer.compatibility.window'));
  assert.ok(unit.codeAnalysisFacts.stackTags.includes('node'));
  assert.ok(unit.codeAnalysisFacts.stackTags.includes('jwt'));
  assert.equal(unit.embeddings.taskVector.spec.vectorSpace, 'task-semantic-space.v8');
  assert.equal(unit.embeddings.taskVector.spec.standIn, true);
  assert.ok(asset.uploadSurface.surfaces.some((surface) => surface.role === 'raw'));
});

test('recallCandidates emits weighted channel hits, fusion summary, and query vector contracts', () => {
  const state = buildInitialState();
  const need = buildNeedDescriptor(state.needScenarios[0]);
  const recalled = recallCandidates(need, state.assets);

  assert.ok(recalled.length >= 3);
  assert.ok(recalled[0].recallProvenance.some((entry) => entry.channelId === 'pathSearch'));
  assert.ok(recalled[0].fusion.contributingChannels.length >= 2);
  assert.ok(recalled[0].recallScore > 0);
  assert.equal(recalled[0].queryRepresentations.task.vectorSpace, 'task-semantic-space.v8');
  assert.ok(recalled[0].recallChannelContracts.some((entry) => entry.channelId === 'semanticTaskSearch'));
  assert.ok(recalled[0].recallProvenance.every((entry) => entry.signalFamily));
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
  assert.ok(evaluated[0].ranking.explainability.strongestScoreDrivers.length >= 3);
  assert.ok(evaluated[0].ranking.scoreGroups.needMatch.sequence.length >= 4);
  assert.ok(evaluated[0].ranking.scoreGroups.benchmarkImpact.sequence.length >= 3);
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

test('seeded scenario corpus yields coherent repo-bound branches across families', () => {
  const state = buildInitialState();

  for (const scenario of state.needScenarios) {
    const { latestRun } = runMakeEngiBranch(state, { scenarioId: scenario.scenarioId });
    assert.equal(latestRun.scenarioId, scenario.scenarioId);
    assert.equal(latestRun.need.repo, scenario.repo);
    assert.equal(latestRun.buyer.repo, scenario.repo);
    assert.equal(latestRun.buyer.buyerBranch, scenario.baseRef);
    assert.ok(latestRun.assetPack.selectedAssets.length >= 1);
    assert.ok(latestRun.scenarioFixtureManifest.scenarioFamilies.some((entry) => entry.scenarioId === scenario.scenarioId));
  }
});

test('context-mode asset pack can admit context-only candidates while patch mode excludes them', () => {
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
  const evaluated = evaluateCandidates(need, [lowEvidence]);
  const contextCandidate = evaluated.find((candidate) => candidate.assetId === lowEvidence.assetId);
  const contextPack = assembleAssetPack(need, evaluated, 'context');
  const patchPack = assembleAssetPack(need, evaluated, 'patch');

  assert.equal(contextCandidate.useTier, 'context-only');
  assert.equal(contextPack.branchMode, 'context');
  assert.ok(contextPack.selectedAssets.includes(lowEvidence.assetId));
  assert.equal(patchPack.selectedAssets.includes(lowEvidence.assetId), false);
});


test('branch artifacts separate identity, GitHub boundary, uploads, and profile surfaces', () => {
  const state = buildInitialState();
  const { latestRun } = runMakeEngiBranch(state, {});

  assert.ok(latestRun.evaluatedCandidates[0].ranking.scoreGroups.penaltyMass);
  assert.ok(latestRun.branchArtifacts.files['.engi/depositing-surface.json']);
  assert.ok(latestRun.branchArtifacts.files['.engi/needing-surface.json']);
  assert.ok(latestRun.branchArtifacts.files['.engi/depositing-to-needing-surface.json']);
  assert.ok(latestRun.branchArtifacts.files['.engi/identity-bindings.json']);
  assert.ok(latestRun.branchArtifacts.files['.engi/github-boundary.json']);
  assert.ok(latestRun.branchArtifacts.files['.engi/artifact-upload-manifest.json']);
  assert.ok(latestRun.branchArtifacts.files['.engi/profile-composition.json']);
});

test('latest run exposes V12 depositing, needing, fit, and identity spine surfaces', () => {
  const state = buildInitialState();
  const { latestRun } = runMakeEngiBranch(state, {});

  assert.equal(latestRun.depositingSurface.depositProfile, latestRun.demonstrationProfile.label);
  assert.equal(latestRun.needingSurface.needId, latestRun.need.needId);
  assert.equal(latestRun.depositingToNeedingSurface.depositSessionId, latestRun.depositingSurface.depositSessionId);
  assert.equal(latestRun.repoToSettlementSurface.stages.length, 7);
  assert.equal(latestRun.repoToSettlementSurface.stages[0].stageId, 'depositing');
  assert.equal(latestRun.repoToSettlementSurface.stages[1].stageId, 'needing');
  assert.equal(latestRun.repoToSettlementSurface.stages[2].stageId, 'deposit-to-need-fit');
  assert.equal(latestRun.repoToSettlementSurface.stages.at(-1).stageId, 'settlement');
  assert.ok(latestRun.identityAuthSpineSurface.hops.some((hop) => hop.hopId === 'github-installation'));
  assert.ok(latestRun.identityAuthSpineSurface.hops.some((hop) => hop.hopId === 'settlement-authority'));
  assert.equal(latestRun.identityAuthSpineSurface.buyerPrincipalId, `buyer:${state.buyers[0].buyerId}`);
});

test('runMakeEngiBranch produces branch artifacts and exact journal settlement', () => {
  const state = buildInitialState();
  const { nextState, latestRun } = runMakeEngiBranch(state, {});

  assert.equal(latestRun.needLifecycle, 'settled');
  assert.ok(latestRun.branchArtifacts.files['.engi/need.json']);
  assert.ok(latestRun.branchArtifacts.files['.engi/depositing-surface.json']);
  assert.ok(latestRun.branchArtifacts.files['.engi/needing-surface.json']);
  assert.ok(latestRun.branchArtifacts.files['.engi/depositing-to-needing-surface.json']);
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

test('runMakeEngiBranch materializes prompt surfaces, external boundary manifest, and proof contract', () => {
  const state = buildInitialState();
  const { latestRun } = runMakeEngiBranch(state, {});

  assert.ok(latestRun.promptSurfaces.length >= 4);
  assert.ok(latestRun.externalBoundaryManifest.interfaces.length >= 6);
  assert.ok(latestRun.proofContract.evidenceChain.length >= 4);
  assert.ok(latestRun.branchArtifacts.files['.engi/prompt-surfaces.json']);
  assert.ok(latestRun.branchArtifacts.files['.engi/external-boundary-manifest.json']);
});

test('system proof bundle includes prompt, measurement, verification, materialization, and settlement witnesses', () => {
  const state = buildInitialState();
  const { latestRun } = runMakeEngiBranch(state, {});
  const proof = latestRun.systemProofBundle;

  assert.ok(proof.assetMeasurementProofs.length >= 1);
  assert.equal(proof.promptCompletenessProof.allContractsComplete, true);
  assert.equal(proof.staticMeasurementProof.allReceiptRefsResolve, true);
  assert.equal(proof.selectionConsistencyProof.allSelectedAssetsRespectUseTier, true);
  assert.equal(proof.materializationProof.allSelectedAssetsMaterialized, true);
  assert.equal(proof.materializationVisibilityProof.allSelectedAssetsHaveMaterializedSourceBindings, true);
  assert.equal(proof.materializationVisibilityProof.noUnexpectedMaterializedSourceBindings, true);
  assert.equal(proof.identityAuthorizationProof.allStateChangingActionsAuthorized, true);
  assert.equal(proof.sensitiveDataFlowProof.requiredSensitiveClassesCovered, true);
  assert.equal(proof.sensitiveDataFlowProof.noUnauthorizedPublicDisclosure, true);
  assert.ok(proof.verificationReceiptsArtifact.verificationReceipts.length >= 4);
  assert.ok(proof.proofWitnessManifest.proofFamilies.length >= 7);
  assert.ok(proof.proofWitnessManifest.artifactDigests.some((entry) => entry.path === '.engi/code-analysis-fact-registry.json'));
  assert.ok(proof.proofWitnessManifest.artifactDigests.some((entry) => entry.path === '.engi/source-to-shares.json'));
  assert.ok(proof.proofWitnessManifest.artifactDigests.some((entry) => entry.path === '.engi/materialization-proof.json'));
  assert.ok(proof.proofWitnessManifest.artifactDigests.some((entry) => entry.path === '.engi/static-heuristics-registry.json'));
  assert.ok(proof.sourceToSharesArtifact.sourceContributionEntries.length >= 1);
  assert.equal(proof.settlementProof.theoremChecks.debitsEqualCredits, true);
  assert.ok(proof.proofContract.contractId.startsWith('proof_contract_'));
  assert.ok(proof.promptImplementationSurface.promptLineage.length >= 1);
});

test('authorization decisions and policy release are persisted on latest run', () => {
  const state = buildInitialState();
  const { latestRun } = runMakeEngiBranch(state, {});

  assert.ok(latestRun.authorizationDecisions.length >= 7);
  assert.ok(latestRun.identityBindings.some((binding) => binding.principalId === 'engi-system:proof-publisher'));
  assert.ok(latestRun.identityBindings.some((binding) => binding.principalClass === 'github-app-installation-principal'));
  assert.ok(latestRun.sensitiveDataFlowRecords.length >= 7);
  assert.ok(latestRun.authorizationDecisions.some((decision) => decision.action === 'read:repo-artifact-inventory' && decision.decision === 'allow'));
  assert.ok(latestRun.authorizationDecisions.some((decision) => decision.action === 'materialize:selected-source-material' && decision.decision === 'allow'));
  assert.ok(latestRun.authorizationDecisions.some((decision) => decision.action === 'settle:journal-event' && decision.decision === 'allow'));
  assert.ok(latestRun.authorizationDecisions.some((decision) => decision.action === 'derive:bounded-public-proof-metadata' && decision.decision === 'allow'));
  assert.equal(latestRun.policyRelease.confidentialityDefault, 'private-required');
  assert.equal(latestRun.policyRelease.conformanceProfile, 'Profile A — targeted deposit / bounded need');
  assert.equal(latestRun.policyRelease.revocationRules.revokedIssuerBlocksNewSettlement, true);
  assert.ok(latestRun.githubBoundarySurface.externalBoundary.includes('GitHub App'));
  assert.ok(latestRun.artifactUploadManifest.uploads.length >= 1);
  assert.equal(latestRun.systemProofBundle.identityAuthorizationProof.githubAppInstallationBound, true);
  assert.equal(latestRun.systemProofBundle.identityAuthorizationProof.selectedAssetsSignedAgainstAddressing, true);
  assert.equal(latestRun.systemProofBundle.identityAuthorizationProof.selectedAssetsSignedAgainstInventorySelection, true);
  assert.equal(latestRun.systemProofBundle.identityAuthorizationProof.selectedAssetsSignedAgainstGitHubAppAuth, true);
});

test('selected source material manifest and upload manifest preserve inventory and auth roots', () => {
  const state = buildInitialState();
  const { latestRun } = runMakeEngiBranch(state, {});

  assert.ok(latestRun.selectedSourceMaterialManifest.selectedSourceMaterial.every((entry) => entry.selectionRoot));
  assert.ok(latestRun.selectedSourceMaterialManifest.selectedSourceMaterial.every((entry) => entry.addressingRoot));
  assert.ok(latestRun.selectedSourceMaterialManifest.selectedSourceMaterial.every((entry) => entry.authPayloadHash));
  assert.ok(latestRun.artifactUploadManifest.uploads.every((upload) => upload.selectionRoot));
  assert.ok(latestRun.artifactUploadManifest.uploads.every((upload) => upload.authPayloadHash));
  assert.ok(latestRun.githubBoundarySurface.selectedAuthSessions.length >= 1);
  assert.ok(latestRun.githubBoundarySurface.selectedInventoryProofs.every((entry) => entry.selectedInventoryRoot));
});

test('policy release artifact classes cover verification, authz, and sensitive-data artifacts', () => {
  const state = buildInitialState();
  const { latestRun } = runMakeEngiBranch(state, {});
  const artifactPaths = latestRun.policyRelease.artifactClasses.map((entry) => entry.path);

  assert.ok(artifactPaths.includes('.engi/verification-report.json'));
  assert.ok(artifactPaths.includes('.engi/verification-receipts.json'));
  assert.ok(artifactPaths.includes('.engi/authorization-decisions.json'));
  assert.ok(artifactPaths.includes('.engi/sensitive-data-flow.json'));
  assert.ok(artifactPaths.includes('.engi/code-analysis-fact-registry.json'));
  assert.ok(artifactPaths.includes('.engi/static-heuristics-registry.json'));
  assert.ok(artifactPaths.includes('.engi/materialization-proof.json'));
  assert.ok(artifactPaths.includes('.engi/materialization-exclusions.json'));
  assert.ok(artifactPaths.includes('.engi/static-measurement-proof.json'));
});

test('eval manifest codifies evaluator interfaces and stand-in boundaries', () => {
  const state = buildInitialState();
  const { latestRun } = runMakeEngiBranch(state, {});

  assert.ok(latestRun.evalManifest.evaluatorInterfaces.length >= 3);
  assert.ok(latestRun.evalManifest.evaluatorInterfaces.some((entry) => entry.measurementClass === 'inferred-measurement'));
  assert.equal(latestRun.evalManifest.vectorSpaces.includes('task-semantic-space.v8'), true);
  assert.equal(latestRun.evalManifest.evaluatorBoundaryNotes.profileA.includes('stand-ins'), true);
});

test('sensitive data flow records cover all required V8 data classes', () => {
  const state = buildInitialState();
  const { latestRun } = runMakeEngiBranch(state, {});
  const classes = new Set(latestRun.sensitiveDataFlowRecords.map((record) => record.dataClass));

  assert.ok(classes.has('repo-private-source'));
  assert.ok(classes.has('verification-evidence'));
  assert.ok(classes.has('licensed-source-material'));
  assert.ok(classes.has('private-branch-derived-artifact'));
  assert.ok(classes.has('settlement-preview'));
  assert.ok(classes.has('private-proof-artifact'));
  assert.ok(classes.has('bounded-public-proof-metadata'));
});

test('branch artifacts materialize selected source material only with unit hashes bound', () => {
  const state = buildInitialState();
  const { latestRun } = runMakeEngiBranch(state, {});
  const materializedPaths = Object.keys(latestRun.branchArtifacts.files).filter((file) => file.startsWith('.engi/source-material/'));

  assert.equal(materializedPaths.length, latestRun.assetPack.selectedAssets.length);
  for (const assetId of latestRun.assetPack.selectedAssets) {
    const path = materializedPaths.find((file) => file.includes(assetId));
    assert.ok(path);
    assert.match(latestRun.branchArtifacts.files[path], /unitHash:/);
  }
});

test('settlement preview records participating assets and asset-pack-lock binding', () => {
  const state = buildInitialState();
  const { latestRun } = runMakeEngiBranch(state, {});

  assert.deepEqual(
    latestRun.settlementPreview.settlementParticipatingAssetIds.slice().sort(),
    latestRun.journalDiff.settledShares.map((entry) => entry.assetId).slice().sort()
  );
  assert.equal(latestRun.settlementPreview.assetPackLockHash, latestRun.systemProofBundle.settlementProof.assetPackLockHash);
});

test('seeded settlement explicitly distinguishes selected, participating, and credited assets', () => {
  const state = buildInitialState();
  const { latestRun } = runMakeEngiBranch(state, {});

  assert.deepEqual(
    latestRun.settlementPreview.selectedAssetIds.slice().sort(),
    latestRun.assetPack.selectedAssets.slice().sort()
  );
  assert.equal(
    latestRun.settlementPreview.settlementParticipatingAssetIds.length,
    latestRun.settlementParticipationArtifact.records.filter((entry) => entry.settlementParticipating).length
  );
  assert.deepEqual(
    latestRun.settlementPreview.creditedAssetIds,
    latestRun.journalDiff.credits.filter((entry) => BigInt(entry.delta) > 0n).map((entry) => entry.assetId)
  );
  assert.deepEqual(
    latestRun.settlementPreview.zeroCreditAssetIds,
    latestRun.journalDiff.credits.filter((entry) => BigInt(entry.delta) === 0n).map((entry) => entry.assetId)
  );
  for (const assetId of latestRun.settlementPreview.zeroCreditAssetIds) {
    const zeroAllocation = latestRun.settlementPreview.allocations.find((entry) => entry.assetId === assetId);
    assert.equal(zeroAllocation.creditedMicroUnits, '0');
    assert.match(zeroAllocation.rationale.join(' '), /marginal bundle contribution was non-positive/i);
  }
});

test('source-to-shares artifact, settlement participation, and accounting precision report stay aligned', () => {
  const state = buildInitialState();
  const { latestRun } = runMakeEngiBranch(state, {});
  const sourceToShares = latestRun.sourceToSharesArtifact;
  const participation = latestRun.settlementParticipationArtifact;
  const precision = latestRun.accountingPrecisionReport;
  const zeroCreditParticipatingCount = participation.records.filter((record) => record.zeroCreditParticipating).length;

  assert.equal(sourceToShares.rawShares.reduce((sum, entry) => sum + entry.shareBp, 0), 10000);
  assert.ok(sourceToShares.clippingReceipts.every((receipt) => receipt.receiptId));
  assert.equal(participation.zeroCreditParticipatingCount, zeroCreditParticipatingCount);
  assert.equal(participation.zeroCreditParticipatingCount, latestRun.settlementPreview.zeroCreditAssetIds.length);
  assert.equal(precision.exactAccountingInvariants.clippedContributionDecisionsReceiptBacked, true);
  assert.equal(precision.exactAccountingInvariants.zeroCreditParticipationExplicit, true);
  assert.equal(precision.microUnitAllocation.finalAllocatedMicroUnits, latestRun.journalDiff.totals.credited);
  assert.equal(precision.sourceToSharesRef, sourceToShares.proofHash);
});

test('telemetry artifacts explain the pipeline and prompt implementation surface', () => {
  const state = buildInitialState();
  const { latestRun } = runMakeEngiBranch(state, {});

  assert.ok(latestRun.pipelineTelemetry.events.some((event) => event.stage === 'content-unit-semantics'));
  assert.ok(latestRun.pipelineTelemetry.events.some((event) => event.stage === 'settlement-and-shares'));
  assert.ok(latestRun.unitCatalog.units.length >= latestRun.assetPack.selectedAssets.length);
  assert.ok(latestRun.systemProofBundle.promptImplementationSurface.inferredOutputs.length >= 1);
  assert.ok(latestRun.branchArtifacts.files['.engi/pipeline-telemetry.json']);
  assert.ok(latestRun.branchArtifacts.files['.engi/unit-catalog.json']);
});

test('ENGI_NEED markdown includes parser contract, conformance profiles, and settlement preview summary', () => {
  const state = buildInitialState();
  const { latestRun } = runMakeEngiBranch(state, {});
  const markdown = latestRun.branchArtifacts.files['ENGI_NEED.md'];

  assert.match(markdown, /Benchmark parser contract/);
  assert.match(markdown, /Conformance profiles/);
  assert.match(markdown, /raw share asset count/);
  assert.match(markdown, /zero-credit settlement asset count/);
  assert.match(markdown, /github-actions.auth-remediation.v3/);
  assert.match(markdown, /Profile A — targeted deposit \/ bounded need/);
});

test('publicState returns public projection including bounded public proof and profile labels', () => {
  const state = buildInitialState();
  const { nextState } = runMakeEngiBranch(state, {});
  const projected = publicState(nextState);

  assert.equal(projected.assets.length, 11);
  assert.ok(projected.latestRun.need.needId);
  assert.ok(projected.latestRun.assetPack.assetPackId);
  assert.equal(projected.latestRun.projectionPrincipal, 'public');
  assert.ok(projected.latestRun.boundedPublicProof.bundleId);
  assert.ok(projected.latestRun.publicArtifacts['.engi/code-analysis-fact-registry.json']);
  assert.ok(projected.latestRun.publicArtifacts['.engi/static-heuristics-registry.json']);
  assert.ok(projected.latestRun.publicArtifacts['.engi/materialization-proof.json']);
  assert.ok(projected.latestRun.publicArtifacts['.engi/materialization-visibility-proof.json']);
  assert.ok(projected.latestRun.publicArtifacts['.engi/scenario-fixture-manifest.json']);
  assert.ok(projected.latestRun.publicArtifacts['.engi/test-coverage-report.json']);
  assert.ok(projected.latestRun.publicArtifacts['.engi/needing-surface.json']);
  assert.ok(projected.latestRun.publicArtifacts['.engi/depositing-to-needing-surface.json']);
  assert.ok(projected.latestRun.publicArtifacts['.engi/redaction-proof.json']);
  assert.ok(projected.latestRun.repoToSettlementSurface.stages.length === 7);
  assert.deepEqual(
    projected.latestRun.repoToSettlementSurface.stages.slice(0, 3).map((stage) => stage.stageId),
    ['depositing', 'needing', 'deposit-to-need-fit']
  );
  assert.equal(projected.latestRun.demonstrationProfile.shortLabel, 'Targeted deposit');
  assert.equal(projected.latestRun.authorizationDecisions, undefined);
  assert.equal(projected.latestRun.journalDiff, undefined);
  assert.equal(projected.needScenarios[0].parserKind, 'github-actions.auth-remediation.v3');
  assert.equal(projected.needScenarios[0].demonstrationProfile.shortLabel, 'Targeted deposit');
  assert.equal(projected.needScenarios.at(-1).demonstrationProfile.shortLabel, 'Normalization deposit');
  assert.equal(projected.conformanceProfiles.active, 'Profile A — targeted deposit / bounded need');
  assert.equal(projected.policyRelease.releaseId, 'policy-release-engi-v11-demo-2026-04-03');
  assert.ok(projected.githubAppSessions.length >= 1);
  assert.ok(projected.repoArtifactInventory.length >= 1);
  assert.ok(projected.profileCompositions.profiles.length === 2);
  assert.ok(projected.runHistory.length, 1);
});

test('buyer projection exposes richer artifacts without raw branch files or source material', () => {
  const state = buildInitialState();
  const { nextState } = runMakeEngiBranch(state, {});
  const projected = publicState(nextState, 'buyer');

  assert.equal(projected.latestRun.projectionPrincipal, 'buyer');
  assert.ok(projected.latestRun.verificationReport.assetVerification.length >= 1);
  assert.ok(projected.latestRun.verificationReceipts.verificationReceipts.length >= 4);
  assert.ok(projected.latestRun.codeAnalysisFactRegistry.registeredFactCount >= 10);
  assert.ok(projected.latestRun.staticHeuristicsRegistry.registeredFactCount >= 10);
  assert.ok(projected.latestRun.promptContracts.length >= 4);
  assert.ok(projected.latestRun.measurementReceipts.length >= 3);
  assert.equal(projected.latestRun.materializationProof.allExclusionsExplained, true);
  assert.ok(projected.latestRun.sourceToSharesArtifact.sourceContributionEntries.length >= 1);
  assert.ok(projected.latestRun.settlementParticipationArtifact.records.length >= projected.latestRun.evaluatedCandidates.length);
  assert.equal(projected.latestRun.accountingPrecisionReport.exactAccountingInvariants.allocationConserved, true);
  assert.ok(projected.latestRun.scenarioFixtureManifest.scenarioFamilies.length >= 8);
  assert.equal(projected.latestRun.testCoverageReport.adversarialCoverage.privacyBoundaryScenarioPresent, true);
  assert.equal(projected.latestRun.testCoverageReport.adversarialCoverage.polyglotRepoScenarioPresent, true);
  assert.equal(projected.latestRun.testCoverageReport.adversarialCoverage.manyAssetNormalizationScenarioPresent, true);
  assert.ok(projected.latestRun.identityAuthSpineSurface.hops.length >= 6);
  assert.equal(projected.latestRun.branchArtifacts.files, undefined);
});

test('measurement receipts and static report stay linked to provenance ids', () => {
  const state = buildInitialState();
  const { latestRun } = runMakeEngiBranch(state, {});
  const receiptIds = new Set(latestRun.measurementReceipts.map((receipt) => receipt.receiptId));

  assert.ok(latestRun.measurementReceipts.length >= 3);
  assert.equal(latestRun.staticMeasurementReport.allReceiptRefsResolve, true);
  assert.equal(latestRun.staticMeasurementProof.allReceiptRefsResolve, true);
  assert.equal(latestRun.codeAnalysisFactRegistry.audit.allConsumedFactsRegistered, true);
  assert.ok(latestRun.needMeasurement.measurementProvenance.filter((entry) => entry.mode === 'static').every((entry) => entry.receiptRefs.every((receiptId) => receiptIds.has(receiptId))));
  assert.ok(latestRun.evaluatedCandidates.some((candidate) => candidate.measurementProvenance.some((entry) => entry.receiptRefs.some((receiptId) => receiptIds.has(receiptId)))));
});

test('deliverables manifest and journal receipts remain internally consistent', () => {
  const state = buildInitialState();
  const { latestRun } = runMakeEngiBranch(state, {});

  assert.ok(latestRun.deliverablesManifest.deliverables.some((entry) => entry.path === '.engi/settlement-proof.json'));
  assert.ok(latestRun.deliverablesManifest.deliverables.some((entry) => entry.path === '.engi/authorization-decisions.json'));
  assert.ok(latestRun.deliverablesManifest.deliverables.some((entry) => entry.path === '.engi/sensitive-data-flow.json'));
  assert.ok(latestRun.deliverablesManifest.deliverables.some((entry) => entry.path === '.engi/proof-witness-manifest.json'));
  assert.ok(latestRun.deliverablesManifest.deliverables.some((entry) => entry.path === '.engi/static-heuristics-registry.json'));
  assert.ok(latestRun.deliverablesManifest.deliverables.some((entry) => entry.path === '.engi/materialization-proof.json'));
  assert.ok(latestRun.deliverablesManifest.deliverables.some((entry) => entry.path === '.engi/materialization-exclusions.json'));
  assert.equal(latestRun.journalDiff.receipts.length, 2);
  assert.ok(latestRun.journalDiff.credits.every((entry) => entry.unitRefs.length > 0));
  assert.equal(latestRun.systemProofBundle.settlementProof.theoremChecks.stateRootIntegrity, true);
  assert.equal(latestRun.settlementPreview.assetPackLockHash, latestRun.systemProofBundle.settlementProof.assetPackLockHash);
});

test('verification report records branch-mode rights per use tier', () => {
  const state = buildInitialState();
  const { latestRun } = runMakeEngiBranch(state, { branchMode: 'patch' });
  const contextOnly = latestRun.verificationReport.assetVerification.find((entry) => entry.useTier === 'context-only');

  assert.ok(contextOnly);
  assert.equal(contextOnly.rights.branchMaterializationAllowed, false);
  assert.equal(contextOnly.rights.settlementAllowed, false);
  assert.ok(contextOnly.receiptRefs.length >= 4);
  assert.ok(Array.isArray(contextOnly.policyRestrictions.additionalRequirements));
});

test('many-asset normalization scenario keeps source-to-shares replay traces deterministic', () => {
  const state = buildInitialState();
  const { latestRun: firstRun } = runMakeEngiBranch(state, { scenarioId: 'auth-many-asset-normalization' });
  const { latestRun: secondRun } = runMakeEngiBranch(state, { scenarioId: 'auth-many-asset-normalization' });

  assert.equal(firstRun.scenarioId, 'auth-many-asset-normalization');
  assert.ok(firstRun.sourceToSharesArtifact.sourceContributionEntries.length >= 2);
  assert.ok(firstRun.sourceToSharesArtifact.normalizationLedger.length >= 2);
  assert.ok(firstRun.accountingPrecisionReport.sourceMaterialToSharesClosure.length >= 2);
  assert.deepEqual(
    firstRun.sourceToSharesArtifact.basisPointNormalization.remainderDistributionOrder,
    secondRun.sourceToSharesArtifact.basisPointNormalization.remainderDistributionOrder
  );
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
