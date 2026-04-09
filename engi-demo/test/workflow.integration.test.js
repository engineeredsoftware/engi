import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { EventEmitter } from 'node:events';
import { createAppContext } from '../server.js';

/**
 * @typedef {{ app: any, dataPath: string }} AppHarness
 */

/** @type {((name: string, fn: (t: any) => any) => any) & ((name: string, options: any, fn: (t: any) => any) => any)} */
const testAny = test;
const createAppContextAny = /** @type {any} */ (createAppContext);

const EXPECTED_PROOF_FAMILY_CATALOG = {
  'inference-synthesis': {
    proofArtifactPath: '.engi/inference-synthesis-proof.json',
    memberIds: ['task', 'failureModes', 'constraints', 'targetArtifactKinds', 'closureCriteria'],
    theoremIds: [
      'inference_synthesis.coverage_totality',
      'inference_synthesis.evaluator_status_truth',
      'inference_synthesis.evidence_basis_closure',
      'inference_synthesis.ownership_traceability_closure',
      'inference_synthesis.witness_materialization_closure',
      'inference_synthesis.replay_closure'
    ]
  },
  'prompt-completeness': {
    proofArtifactPath: '.engi/prompt-completeness-proof.json',
    memberIds: ['task', 'failureModes', 'constraints', 'targetArtifactKinds', 'closureCriteria'],
    theoremIds: [
      'prompt_completeness.coverage_totality',
      'prompt_completeness.no_ghost_coverage',
      'prompt_completeness.explicit_exclusion_closure',
      'prompt_completeness.contract_closure',
      'prompt_completeness.parsed_envelope_admissibility',
      'prompt_completeness.downstream_consumer_closure',
      'prompt_completeness.provenance_truth',
      'prompt_completeness.witness_replay_closure'
    ]
  },
  'static-code-analysis': {
    proofArtifactPath: '.engi/static-measurement-proof.json',
    memberIds: ['deterministic-parser', 'repo-context', 'content-unit', 'measurement-stages'],
    theoremIds: [
      'static_code_analysis.stage_domain_purity',
      'static_code_analysis.abstract_to_concrete_stage_mapping',
      'static_code_analysis.registry_role_closure',
      'static_code_analysis.receipt_report_proof_agreement',
      'static_code_analysis.witness_replay_closure'
    ]
  },
  'verification-decisions': {
    proofArtifactPath: '.engi/verification-decisions-proof.json',
    memberIds: ['issuance', 'provenance', 'sufficiency', 'issuer-policy', 'use-tier-consequence'],
    theoremIds: [
      'verification_decisions.issuance_closure',
      'verification_decisions.provenance_closure',
      'verification_decisions.sufficiency_closure',
      'verification_decisions.issuer_policy_closure',
      'verification_decisions.use_tier_consequence_closure',
      'verification_decisions.receipt_report_role_closure',
      'verification_decisions.witness_replay_closure'
    ]
  },
  'selection-and-materialization': {
    proofArtifactPath: '.engi/selection-and-materialization-proof.json',
    memberIds: ['selected-assets', 'locked-units', 'materialized-source', 'exclusions', 'visibility-rules'],
    theoremIds: [
      'selection_and_materialization.selected_asset_closure',
      'selection_and_materialization.lock_closure',
      'selection_and_materialization.materialized_source_closure',
      'selection_and_materialization.exclusion_closure',
      'selection_and_materialization.visibility_closure',
      'selection_and_materialization.selection_consistency_closure',
      'selection_and_materialization.materialization_proof_closure'
    ]
  },
  'authorization-and-sensitive-flow': {
    proofArtifactPath: '.engi/authorization-and-sensitive-flow-proof.json',
    memberIds: ['principals', 'authorization-decisions', 'confidentiality-classes', 'retention-disclosure-rules', 'sensitive-data-flows'],
    theoremIds: [
      'authorization_and_sensitive_flow.principal_authority_totality',
      'authorization_and_sensitive_flow.authorization_decision_closure',
      'authorization_and_sensitive_flow.classification_closure',
      'authorization_and_sensitive_flow.policy_assignment_closure',
      'authorization_and_sensitive_flow.no_unauthorized_public_flow',
      'authorization_and_sensitive_flow.witness_replay_closure'
    ]
  },
  'settlement-source-to-shares': {
    proofArtifactPath: '.engi/settlement-source-to-shares-proof.json',
    memberIds: ['contribution', 'clipping', 'normalization', 'participation', 'allocation', 'journal', 'settlement-proof'],
    theoremIds: [
      'settlement_source_to_shares.contribution_totality',
      'settlement_source_to_shares.clipping_determinism',
      'settlement_source_to_shares.normalization_exactness',
      'settlement_source_to_shares.participation_totality',
      'settlement_source_to_shares.allocation_conservation',
      'settlement_source_to_shares.journal_completeness',
      'settlement_source_to_shares.settlement_theorem_integrity'
    ]
  },
  'disclosure-boundary': {
    proofArtifactPath: '.engi/disclosure-boundary-proof.json',
    memberIds: ['projection-policy', 'bounded-public-proof', 'redaction-proof', 'disclosure-proof'],
    theoremIds: [
      'disclosure_boundary.projection_policy_closure',
      'disclosure_boundary.bounded_public_metadata_only',
      'disclosure_boundary.redaction_alignment',
      'disclosure_boundary.disclosure_verdict_alignment',
      'disclosure_boundary.witness_replay_closure'
    ]
  },
  'proof-contract': {
    proofArtifactPath: '.engi/proof-contract.json',
    memberIds: ['proof-contract', 'evidence-chain', 'theorem-checks', 'system-proof-bundle', 'witness-manifest-closure'],
    theoremIds: [
      'proof_contract.contract_materialization',
      'proof_contract.evidence_chain_closure',
      'proof_contract.theorem_check_binding',
      'proof_contract.bundle_coherence',
      'proof_contract.witness_manifest_coherence',
      'proof_contract.replay_closure'
    ]
  }
};

/**
 * @param {any} [input={}]
 * @returns {any}
 */
function createMockReq({ method = 'GET', url = '/', headers = {}, body } = {}) {
  const req = /** @type {any} */ (new EventEmitter());
  req.method = method;
  req.url = url;
  req.headers = headers;
  req.destroy = () => {};
  process.nextTick(() => {
    if (body !== undefined) req.emit('data', Buffer.from(body));
    req.emit('end');
  });
  return req;
}

/**
 * @returns {any}
 */
function createMockRes() {
  /** @type {Buffer[]} */
  const chunks = [];
  /** @type {(value: any) => void} */
  let resolved = () => {};
  const done = new Promise((resolve) => {
    resolved = /** @type {(value: any) => void} */ (resolve);
  });

  return {
    statusCode: 200,
    headers: {},
    writeHead(/** @type {number} */ status, /** @type {Record<string, string>} */ headers = {}) {
      this.statusCode = status;
      this.headers = { ...this.headers, ...headers };
      return this;
    },
    end(chunk = '') {
      if (chunk) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(String(chunk)));
      resolved({
        statusCode: this.statusCode,
        headers: this.headers,
        text: Buffer.concat(chunks).toString('utf8')
      });
    },
    done
  };
}

/**
 * @param {any} app
 * @param {any} request
 * @returns {Promise<any>}
 */
async function invoke(app, request) {
  const req = createMockReq(request);
  const res = createMockRes();
  await app.handle(req, res);
  const response = await res.done;
  const contentType = String(response.headers['Content-Type'] || response.headers['content-type'] || '');
  const json = contentType.includes('application/json') && response.text ? JSON.parse(response.text) : null;
  return { ...response, json };
}

/**
 * @param {any} t
 * @param {(ctx: AppHarness) => Promise<any>} fn
 * @returns {Promise<any>}
 */
async function withApp(t, fn) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'engi-demo-workflow-test-'));
  const dataPath = path.join(tempDir, 'state.json');
  const app = createAppContextAny({ dataPath, publicDir: path.join(process.cwd(), 'public') });
  app.ensureState();
  t.after(() => fs.rmSync(tempDir, { recursive: true, force: true }));
  return fn({ app, dataPath });
}

testAny('repo-authenticated deposit composes into a targeted branch workflow with proof and artifact closure', async (t) => {
  await withApp(t, async ({ app }) => {
    const initialState = await invoke(app, { method: 'GET', url: '/api/state' });
    const authSession = initialState.json.githubAppSessions.find((/** @type {any} */ session) => session.repo === 'frontier/demo-auth');
    const inventoryEntryIds = initialState.json.repoArtifactInventory
      .filter((/** @type {any} */ entry) => entry.repo === 'frontier/demo-auth')
      .slice(0, 2)
      .map((/** @type {any} */ entry) => entry.inventoryEntryId);

    const deposit = await invoke(app, {
      method: 'POST',
      url: '/api/deposits',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        authSessionId: authSession.authSessionId,
        inventoryEntryIds,
        artifactKind: 'patch',
        artifactType: 'code/patch',
        title: 'Workflow auth remediation bundle',
        author: 'V17 Integration',
        operatorNote: 'Drive a closer-to-real repo-authenticated remediation workflow.',
        content: [
          'restore legacy issuer verification',
          'rerun session replay against rollback benchmark',
          'patch services/auth/session_validator.rs and rollback.ts'
        ].join('\n')
      })
    });

    assert.equal(deposit.statusCode, 200);
    assert.equal(deposit.json.asset.artifactSelectionSurface.authSessionId, authSession.authSessionId);
    assert.deepEqual(deposit.json.asset.artifactSelectionSurface.selectedInventoryEntryIds, inventoryEntryIds);

    const run = await invoke(app, {
      method: 'POST',
      url: '/api/make-engi-branch',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scenarioId: 'auth-issuer-rollback', principal: 'buyer' })
    });

    assert.equal(run.statusCode, 200);
    assert.equal(run.json.latestRun.scenarioId, 'auth-issuer-rollback');
    assert.equal(run.json.latestRun.projectionPrincipal, 'buyer');
    assert.ok(run.json.latestRun.githubBoundarySurface.selectedAuthSessions.length >= 1);
    assert.ok(run.json.latestRun.depositingSurface.selectedInventoryRefs.length >= 1);
    assert.ok(run.json.latestRun.artifactUploadManifest.uploads.length >= 1);
    assert.equal(run.json.latestRun.systemProofBundle.proofFamilies.length, 9);
    assert.ok(run.json.latestRun.systemProofBundle.verifierEntrypoint.requiredArtifactPaths.includes('.engi/system-proof-bundle.json'));
    assert.ok(run.json.latestRun.systemProofBundle.verifierEntrypoint.requiredArtifactPaths.includes('.engi/proof-contract.json'));
    assert.ok(run.json.latestRun.systemProofBundle.verifierEntrypoint.requiredArtifactPaths.includes('.engi/proof-witness-manifest.json'));

    const projected = await invoke(app, { method: 'GET', url: '/api/state?principal=buyer' });
    assert.equal(projected.statusCode, 200);
    assert.equal(projected.json.assets.length, 12);
    assert.equal(projected.json.runHistory.length, 1);
    assert.equal(projected.json.latestRun.assetPack.assetPackId, run.json.latestRun.assetPack.assetPackId);
    assert.ok(projected.json.latestRun.artifactUploadManifest.inventoryBackedUploadCount >= 1);
    assert.ok(projected.json.latestRun.testCoverageReport.suiteCoverage.integration.entrypoints.includes('test/workflow.integration.test.js'));
    assert.ok(projected.json.latestRun.publicArtifacts['.engi/test-coverage-report.json']);
    assert.ok(projected.json.latestRun.publicArtifacts['.engi/bounded-public-proof.json']);
  });
});

testAny('normalization workflow composes context mode with buyer and public projections', async (t) => {
  await withApp(t, async ({ app }) => {
    const buyerRun = await invoke(app, {
      method: 'POST',
      url: '/api/make-engi-branch',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        scenarioId: 'auth-many-asset-normalization',
        branchMode: 'context',
        principal: 'buyer'
      })
    });

    assert.equal(buyerRun.statusCode, 200);
    assert.equal(buyerRun.json.latestRun.projectionPrincipal, 'buyer');
    assert.equal(buyerRun.json.latestRun.branchMode, 'context');
    assert.equal(buyerRun.json.latestRun.assetPack.branchMode, 'context');
    assert.equal(buyerRun.json.latestRun.scenarioId, 'auth-many-asset-normalization');
    assert.equal(buyerRun.json.latestRun.settlementParticipationArtifact.zeroCreditParticipatingCount, buyerRun.json.latestRun.settlementPreview.zeroCreditAssetIds.length);
    assert.ok(buyerRun.json.latestRun.settlementParticipationArtifact.zeroCreditParticipatingCount >= 1);
    assert.equal(buyerRun.json.latestRun.systemProofBundle.proofFamilies.length, 9);
    assert.ok(buyerRun.json.latestRun.sourceToSharesArtifact.sourceContributionEntries.length >= 1);
    assert.ok(buyerRun.json.latestRun.testCoverageReport.suiteCoverage.e2e.entrypoint === 'test/e2e.test.js');

    const publicState = await invoke(app, { method: 'GET', url: '/api/state?principal=public' });
    const buyerState = await invoke(app, { method: 'GET', url: '/api/state?principal=buyer' });

    assert.equal(publicState.statusCode, 200);
    assert.equal(buyerState.statusCode, 200);
    assert.equal(publicState.json.latestRun.projectionPrincipal, 'public');
    assert.equal(buyerState.json.latestRun.projectionPrincipal, 'buyer');
    assert.equal(publicState.json.latestRun.branchArtifacts.files, undefined);
    assert.equal(buyerState.json.latestRun.branchArtifacts.files, undefined);
    assert.equal(publicState.json.latestRun.authorizationDecisions, undefined);
    assert.ok(buyerState.json.latestRun.authorizationDecisions.length >= 1);
    assert.ok(publicState.json.latestRun.publicArtifacts['.engi/bounded-public-proof.json']);
    assert.ok(publicState.json.latestRun.publicArtifacts['.engi/test-coverage-report.json']);
  });
});

testAny('privacy-boundary workflow keeps public disclosure bounded while reviewer replay surfaces stay visible', async (t) => {
  await withApp(t, async ({ app }) => {
    const reviewerRun = await invoke(app, {
      method: 'POST',
      url: '/api/make-engi-branch',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        scenarioId: 'privacy-boundary-proof-export',
        principal: 'reviewer'
      })
    });

    assert.equal(reviewerRun.statusCode, 200);
    assert.equal(reviewerRun.json.latestRun.projectionPrincipal, 'reviewer');
    assert.ok(reviewerRun.json.latestRun.proofWitnessManifest.proofFamilies.length === 9);
    assert.ok(reviewerRun.json.latestRun.systemProofBundle.verifierEntrypoint.requiredArtifactPaths.includes('.engi/proof-contract.json'));
    assert.ok(reviewerRun.json.latestRun.systemProofBundle.verifierEntrypoint.requiredArtifactPaths.includes('.engi/system-proof-bundle.json'));
    assert.ok(reviewerRun.json.latestRun.systemProofBundle.verifierEntrypoint.requiredArtifactPaths.includes('.engi/proof-witness-manifest.json'));
    assert.ok(reviewerRun.json.latestRun.systemProofBundle.verifierEntrypoint.requiredArtifactPaths.includes('.engi/projection-policy.json'));
    assert.ok(reviewerRun.json.latestRun.systemProofBundle.verifierEntrypoint.requiredArtifactPaths.includes('.engi/bounded-public-proof.json'));
    assert.ok(reviewerRun.json.latestRun.systemProofBundle.verifierEntrypoint.requiredArtifactPaths.includes('.engi/redaction-proof.json'));
    assert.ok(reviewerRun.json.latestRun.systemProofBundle.verifierEntrypoint.requiredArtifactPaths.includes('.engi/disclosure-proof.json'));
    assert.ok(reviewerRun.json.latestRun.branchArtifacts.visibleFileInventory.includes('.engi/proof-contract.json'));
    assert.ok(reviewerRun.json.latestRun.branchArtifacts.visibleFileInventory.includes('.engi/system-proof-bundle.json'));
    assert.ok(reviewerRun.json.latestRun.branchArtifacts.visibleFileInventory.includes('.engi/proof-witness-manifest.json'));

    const publicState = await invoke(app, { method: 'GET', url: '/api/state?principal=public' });

    assert.equal(publicState.statusCode, 200);
    assert.equal(publicState.json.latestRun.projectionPrincipal, 'public');
    assert.equal(publicState.json.latestRun.disclosureProof.publicDisclosureOnlyUsesBoundedMetadata, true);
    assert.ok(publicState.json.latestRun.publicArtifacts['.engi/projection-policy.json']);
    assert.ok(publicState.json.latestRun.publicArtifacts['.engi/bounded-public-proof.json']);
    assert.ok(publicState.json.latestRun.publicArtifacts['.engi/redaction-proof.json']);
    assert.ok(publicState.json.latestRun.publicArtifacts['.engi/disclosure-proof.json']);
    assert.ok(publicState.json.latestRun.publicArtifacts['.engi/match-report.json']);
    assert.equal('.engi/proof-contract.json' in publicState.json.latestRun.publicArtifacts, false);
    assert.equal('.engi/system-proof-bundle.json' in publicState.json.latestRun.publicArtifacts, false);
    assert.equal('.engi/proof-witness-manifest.json' in publicState.json.latestRun.publicArtifacts, false);
    assert.ok(publicState.json.latestRun.branchArtifacts.publicFiles['.engi/bounded-public-proof.json']);
    assert.equal('.engi/proof-contract.json' in publicState.json.latestRun.branchArtifacts.publicFiles, false);
    assert.ok(publicState.json.latestRun.projectionPolicy.privateArtifactPaths.includes('.engi/proof-contract.json'));
    assert.ok(publicState.json.latestRun.projectionPolicy.privateArtifactPaths.includes('.engi/system-proof-bundle.json'));
    assert.deepEqual(
      Object.keys(publicState.json.latestRun.publicArtifacts).sort(),
      publicState.json.latestRun.projectionPolicy.publicArtifactPaths.slice().sort()
    );
    assert.deepEqual(
      Object.keys(publicState.json.latestRun.branchArtifacts.publicFiles).sort(),
      publicState.json.latestRun.projectionPolicy.publicArtifactPaths.slice().sort()
    );
  });
});

testAny('internal workflow retains raw branch files while reviewer stays replay-capable without raw source material', async (t) => {
  await withApp(t, async ({ app }) => {
    const run = await invoke(app, {
      method: 'POST',
      url: '/api/make-engi-branch',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        scenarioId: 'privacy-boundary-proof-export',
        principal: 'internal'
      })
    });

    assert.equal(run.statusCode, 200);
    assert.ok(run.json.latestRun.branchArtifacts.files['.engi/proof-contract.json']);
    assert.ok(run.json.latestRun.branchArtifacts.files['.engi/proof-witness-manifest.json']);
    assert.ok(Object.keys(run.json.latestRun.branchArtifacts.files).some((path) => path.startsWith('.engi/source-material/')));
    assert.ok(run.json.latestRun.authorizationDecisions.length >= 1);
    assert.ok(run.json.latestRun.selectedSourceMaterialManifest.selectedSourceMaterial.length >= 1);

    const reviewer = await invoke(app, { method: 'GET', url: '/api/state?principal=reviewer' });
    const buyer = await invoke(app, { method: 'GET', url: '/api/state?principal=buyer' });
    const projectedPublic = await invoke(app, { method: 'GET', url: '/api/state?principal=public' });

    assert.equal(reviewer.statusCode, 200);
    assert.equal(buyer.statusCode, 200);
    assert.equal(projectedPublic.statusCode, 200);
    assert.equal(reviewer.json.latestRun.branchArtifacts.files, undefined);
    assert.equal(reviewer.json.latestRun.branchArtifacts.visibleFileInventory.some((/** @type {string} */ path) => path.startsWith('.engi/source-material/')), false);
    assert.ok(reviewer.json.latestRun.branchArtifacts.visibleFileInventory.includes('.engi/proof-contract.json'));
    assert.ok(reviewer.json.latestRun.systemProofBundle.verifierEntrypoint.requiredArtifactPaths.includes('.engi/proof-witness-manifest.json'));
    assert.equal(reviewer.json.latestRun.authorizationDecisions, undefined);
    assert.equal(buyer.json.latestRun.branchArtifacts.files, undefined);
    assert.equal(buyer.json.latestRun.branchArtifacts.visibleFileInventory.some((/** @type {string} */ path) => path.startsWith('.engi/source-material/')), false);
    assert.ok(buyer.json.latestRun.authorizationDecisions.length >= 1);
    assert.equal(projectedPublic.json.latestRun.branchArtifacts.files, undefined);
    assert.equal(projectedPublic.json.latestRun.proofWitnessManifest, undefined);
    assert.equal(projectedPublic.json.latestRun.systemProofBundle, undefined);
    assert.equal('.engi/proof-contract.json' in projectedPublic.json.latestRun.publicArtifacts, false);
  });
});

testAny('restrictive unsafe-patch workflow keeps rejected assets visible in verification while excluding them from materialization and settlement', async (t) => {
  await withApp(t, async ({ app }) => {
    const run = await invoke(app, {
      method: 'POST',
      url: '/api/make-engi-branch',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        scenarioId: 'unsafe-patch-review-recovery',
        principal: 'buyer'
      })
    });

    assert.equal(run.statusCode, 200);

    const verificationEntries = run.json.latestRun.verificationReport.assetVerification;
    const rejectedEntries = verificationEntries.filter((/** @type {any} */ entry) => entry.useTier === 'reject');
    const settledEntries = verificationEntries.filter((/** @type {any} */ entry) => entry.useTier === 'settlement-eligible');
    const excludedById = new Map((run.json.latestRun.materializationExclusions.exclusions || []).map((/** @type {any} */ entry) => [entry.assetId, entry]));
    const selectedAssetIds = new Set(run.json.latestRun.assetPack.selectedAssets || []);
    const creditedAssetIds = new Set(run.json.latestRun.settlementPreview.creditedAssetIds || []);

    assert.ok(rejectedEntries.length >= 1);
    assert.ok(settledEntries.length >= 1);
    assert.equal(run.json.latestRun.verificationDecisionsProof.allTheoremsPassed, true);
    assert.equal(run.json.latestRun.selectionAndMaterializationProof.allTheoremsPassed, true);
    assert.equal(run.json.latestRun.selectionAndMaterializationProof.theoremVerdicts.some((/** @type {any} */ verdict) => verdict.theoremId === 'selection_and_materialization.exclusion_closure' && verdict.passed), true);
    assert.equal(run.json.latestRun.verificationDecisionsProof.theoremVerdicts.some((/** @type {any} */ verdict) => verdict.theoremId === 'verification_decisions.use_tier_consequence_closure' && verdict.passed), true);

    for (const entry of rejectedEntries) {
      assert.equal(entry.rights.branchMaterializationAllowed, false);
      assert.equal(entry.rights.settlementAllowed, false);
      assert.equal(entry.verificationDecisionSurface.finalUseTier, 'reject');
      assert.ok(excludedById.has(entry.assetId));
      assert.equal(selectedAssetIds.has(entry.assetId), false);
      assert.equal(creditedAssetIds.has(entry.assetId), false);
      assert.match(String(excludedById.get(entry.assetId)?.exclusionReason || ''), /does not authorize patch branch materialization/i);
    }

    for (const entry of settledEntries) {
      assert.equal(entry.rights.branchMaterializationAllowed, true);
      assert.equal(entry.rights.settlementAllowed, true);
      assert.equal(selectedAssetIds.has(entry.assetId), true);
      assert.equal(creditedAssetIds.has(entry.assetId), true);
    }
  });
});

testAny('reviewer projection retains proof-family artifacts and replay-required artifacts while public stays bounded', async (t) => {
  await withApp(t, async ({ app }) => {
    const reviewerRun = await invoke(app, {
      method: 'POST',
      url: '/api/make-engi-branch',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        scenarioId: 'privacy-boundary-proof-export',
        principal: 'reviewer'
      })
    });

    assert.equal(reviewerRun.statusCode, 200);

    const reviewerVisibleArtifacts = new Set(reviewerRun.json.latestRun.branchArtifacts.visibleFileInventory || []);
    const proofArtifactPaths = reviewerRun.json.latestRun.systemProofBundle.proofFamilies.map((/** @type {any} */ entry) => entry.proofArtifactPath);
    const replayRequiredArtifacts = reviewerRun.json.latestRun.systemProofBundle.verifierEntrypoint.requiredArtifactPaths;
    const privateArtifactPaths = new Set(reviewerRun.json.latestRun.projectionPolicy.privateArtifactPaths || []);
    const publicArtifactPolicyPaths = new Set(reviewerRun.json.latestRun.projectionPolicy.publicArtifactPaths || []);

    assert.equal(reviewerRun.json.latestRun.systemProofBundle.proofFamilies.length, 9);
    for (const artifactPath of proofArtifactPaths) {
      assert.ok(reviewerVisibleArtifacts.has(artifactPath), `missing reviewer proof artifact ${artifactPath}`);
    }
    for (const artifactPath of replayRequiredArtifacts) {
      assert.ok(reviewerVisibleArtifacts.has(artifactPath), `missing reviewer replay artifact ${artifactPath}`);
    }

    const projectedPublic = await invoke(app, { method: 'GET', url: '/api/state?principal=public' });
    const publicArtifactPaths = new Set(Object.keys(projectedPublic.json.latestRun.branchArtifacts.publicFiles || {}));

    assert.equal(projectedPublic.statusCode, 200);
    assert.equal(projectedPublic.json.latestRun.systemProofBundle, undefined);
    assert.ok(reviewerVisibleArtifacts.size > publicArtifactPaths.size);
    for (const artifactPath of proofArtifactPaths) {
      if (privateArtifactPaths.has(artifactPath)) {
        assert.equal(publicArtifactPaths.has(artifactPath), false, `public projection leaked private proof artifact ${artifactPath}`);
      }
      if (publicArtifactPolicyPaths.has(artifactPath)) {
        assert.equal(publicArtifactPaths.has(artifactPath), true, `public projection omitted bounded-public proof artifact ${artifactPath}`);
      }
    }
    assert.equal(projectedPublic.json.latestRun.proofWitnessManifest, undefined);
    assert.equal(projectedPublic.json.latestRun.publicArtifacts['.engi/bounded-public-proof.json'] !== undefined, true);
  });
});

testAny('seeded scenario corpus remains family/member/projection coherent through HTTP workflows', async (t) => {
  await withApp(t, async ({ app }) => {
    const initialState = await invoke(app, { method: 'GET', url: '/api/state' });
    const scenarioIds = initialState.json.needScenarios.map((/** @type {any} */ scenario) => scenario.scenarioId);

    for (const scenarioId of scenarioIds) {
      for (const branchMode of ['patch', 'context']) {
        const reset = await invoke(app, { method: 'POST', url: '/api/reset' });
        assert.equal(reset.statusCode, 200, `${scenarioId}/${branchMode} reset failed`);

        const internalRun = await invoke(app, {
          method: 'POST',
          url: '/api/make-engi-branch',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            scenarioId,
            branchMode,
            principal: 'internal'
          })
        });

        assert.equal(internalRun.statusCode, 200, `${scenarioId}/${branchMode} internal run failed`);

        const latestRun = internalRun.json.latestRun;
        const branchFiles = latestRun.branchArtifacts.files || {};
        const proofFamilies = latestRun.systemProofBundle.proofFamilies || [];
        const proofFamilyCatalog = Object.fromEntries(proofFamilies.map((/** @type {any} */ family) => [family.proofFamily, family]));

        assert.equal(latestRun.systemProofBundle.proofFamilies.length, 9, `${scenarioId}/${branchMode} proof family count drift`);
        assert.equal(latestRun.proofWitnessManifest.proofFamilies.length, 9, `${scenarioId}/${branchMode} witness family count drift`);
        assert.ok(Object.keys(branchFiles).some((path) => path.startsWith('.engi/source-material/')), `${scenarioId}/${branchMode} lost internal source material`);
        assert.deepEqual(Object.keys(proofFamilyCatalog).sort(), Object.keys(EXPECTED_PROOF_FAMILY_CATALOG).sort(), `${scenarioId}/${branchMode} proof family names drift`);

        for (const [proofFamily, expected] of Object.entries(EXPECTED_PROOF_FAMILY_CATALOG)) {
          const realized = proofFamilyCatalog[proofFamily];
          assert.ok(realized, `${scenarioId}/${branchMode} missing proof family ${proofFamily}`);
          assert.equal(realized.proofArtifactPath, expected.proofArtifactPath, `${scenarioId}/${branchMode} ${proofFamily} proof artifact drift`);
          assert.deepEqual(realized.memberIds, expected.memberIds, `${scenarioId}/${branchMode} ${proofFamily} member drift`);
          assert.deepEqual(realized.theoremIds, expected.theoremIds, `${scenarioId}/${branchMode} ${proofFamily} theorem drift`);
        }

        for (const family of proofFamilies) {
          assert.equal(family.allTheoremsPassed, true, `${scenarioId}/${branchMode} ${family.proofFamily} theorem drift`);
          assert.ok(Array.isArray(family.memberIds) && family.memberIds.length >= 1, `${scenarioId}/${branchMode} ${family.proofFamily} lost members`);
          assert.ok(Array.isArray(family.theoremIds) && family.theoremIds.length >= 1, `${scenarioId}/${branchMode} ${family.proofFamily} lost theorems`);
          assert.ok(branchFiles[family.proofArtifactPath], `${scenarioId}/${branchMode} missing proof artifact ${family.proofArtifactPath}`);

          for (const artifactPath of family.witnessArtifactPaths || []) {
            assert.ok(branchFiles[artifactPath], `${scenarioId}/${branchMode} missing witness artifact ${artifactPath}`);
          }

          for (const artifactPath of family.replayArtifacts || []) {
            assert.ok(branchFiles[artifactPath], `${scenarioId}/${branchMode} missing replay artifact ${artifactPath}`);
          }

          for (const replayStep of family.replaySteps || []) {
            assert.ok(replayStep.requiredArtifactPaths.length >= 1, `${scenarioId}/${branchMode} ${family.proofFamily} replay step lost artifacts`);
            for (const artifactPath of replayStep.requiredArtifactPaths || []) {
              assert.ok(branchFiles[artifactPath], `${scenarioId}/${branchMode} replay step missing artifact ${artifactPath}`);
            }
          }
        }

        const reviewerState = await invoke(app, { method: 'GET', url: '/api/state?principal=reviewer' });
        const buyerState = await invoke(app, { method: 'GET', url: '/api/state?principal=buyer' });
        const publicState = await invoke(app, { method: 'GET', url: '/api/state?principal=public' });

        assert.equal(reviewerState.statusCode, 200, `${scenarioId}/${branchMode} reviewer state failed`);
        assert.equal(buyerState.statusCode, 200, `${scenarioId}/${branchMode} buyer state failed`);
        assert.equal(publicState.statusCode, 200, `${scenarioId}/${branchMode} public state failed`);

        const reviewerVisibleArtifacts = new Set(reviewerState.json.latestRun.branchArtifacts.visibleFileInventory || []);

        assert.equal(reviewerState.json.latestRun.projectionPrincipal, 'reviewer');
        assert.equal(buyerState.json.latestRun.projectionPrincipal, 'buyer');
        assert.equal(publicState.json.latestRun.projectionPrincipal, 'public');
        assert.equal(reviewerState.json.latestRun.branchArtifacts.files, undefined);
        assert.equal(buyerState.json.latestRun.branchArtifacts.files, undefined);
        assert.equal(publicState.json.latestRun.branchArtifacts.files, undefined);
        assert.equal(reviewerState.json.latestRun.branchArtifacts.visibleFileInventory.some((/** @type {string} */ path) => path.startsWith('.engi/source-material/')), false, `${scenarioId}/${branchMode} reviewer leaked source material`);
        assert.equal(buyerState.json.latestRun.branchArtifacts.visibleFileInventory.some((/** @type {string} */ path) => path.startsWith('.engi/source-material/')), false, `${scenarioId}/${branchMode} buyer leaked source material`);
        assert.equal(publicState.json.latestRun.systemProofBundle, undefined, `${scenarioId}/${branchMode} public leaked system proof bundle`);
        assert.equal(publicState.json.latestRun.proofWitnessManifest, undefined, `${scenarioId}/${branchMode} public leaked proof witness manifest`);

        for (const artifactPath of latestRun.systemProofBundle.verifierEntrypoint.requiredArtifactPaths || []) {
          assert.ok(reviewerVisibleArtifacts.has(artifactPath), `${scenarioId}/${branchMode} reviewer lost replay artifact ${artifactPath}`);
        }

        assert.ok(buyerState.json.latestRun.promptFamilyRegistry.promptMembers.length >= 5, `${scenarioId}/${branchMode} buyer lost prompt family registry`);
        assert.ok(Array.isArray(buyerState.json.latestRun.inferenceProofs) && buyerState.json.latestRun.inferenceProofs.length >= 5, `${scenarioId}/${branchMode} buyer lost inference proofs`);
        assert.deepEqual(
          Object.keys(publicState.json.latestRun.publicArtifacts).sort(),
          publicState.json.latestRun.projectionPolicy.publicArtifactPaths.slice().sort(),
          `${scenarioId}/${branchMode} public artifact projection drift`
        );
        assert.deepEqual(
          Object.keys(publicState.json.latestRun.branchArtifacts.publicFiles).sort(),
          publicState.json.latestRun.projectionPolicy.publicArtifactPaths.slice().sort(),
          `${scenarioId}/${branchMode} public file projection drift`
        );
      }
    }
  });
});
