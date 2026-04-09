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
