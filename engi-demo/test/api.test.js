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
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'engi-demo-test-'));
  const dataPath = path.join(tempDir, 'state.json');
  const app = createAppContextAny({ dataPath, publicDir: path.join(process.cwd(), 'public') });
  app.ensureState();
  t.after(() => fs.rmSync(tempDir, { recursive: true, force: true }));
  return fn({ app, dataPath });
}

/**
 * @param {string} dataPath
 * @returns {any}
 */
function readPersistedState(dataPath) {
  return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
}

/**
 * @param {string} dataPath
 * @param {() => Promise<any>} fn
 * @returns {Promise<any>}
 */
async function withCorruptingWriteFailure(dataPath, fn) {
  const originalWriteFileSync = fs.writeFileSync;
  let shouldFail = true;

  fs.writeFileSync = function patchedWriteFileSync(targetPath, data, ...rest) {
    if (shouldFail && (targetPath === dataPath || String(targetPath).startsWith(`${dataPath}.tmp-`))) {
      shouldFail = false;
      originalWriteFileSync.call(fs, targetPath, '{"broken":', ...rest);
      throw new Error('Simulated disk write failure.');
    }
    return originalWriteFileSync.call(fs, targetPath, data, ...rest);
  };

  try {
    return await fn();
  } finally {
    fs.writeFileSync = originalWriteFileSync;
  }
}

testAny('GET /api/state returns seeded Spec V15 public state', async (t) => {
  await withApp(t, async ({ app }) => {
    const response = await invoke(app, { method: 'GET', url: '/api/state' });
    assert.equal(response.statusCode, 200);
    assert.equal(response.json.specVersion, 'ENGI Spec V15 canonical local prototype');
    assert.equal(response.json.assets.length, 11);
    assert.equal(response.json.needScenarios.length, 8);
    assert.equal(response.json.needScenarios[0].scenarioId, 'auth-issuer-rollback');
    assert.equal(response.json.needScenarios[1].scenarioFamily, 'proof-heavy-rust-validator');
    assert.equal(response.json.needScenarios[0].parserKind, 'github-actions.auth-remediation.v3');
    assert.ok(response.json.needScenarios[0].needingSurface.needId);
    assert.ok(response.json.needScenarios[0].needingSurface.closureCriteria.length >= 1);
    assert.equal(response.json.conformanceProfiles.active, 'Profile A — targeted deposit / bounded need');
    assert.equal(response.json.projectionPrincipal, 'public');
    assert.ok(response.json.githubAppSessions.length >= 1);
    assert.ok(response.json.repoArtifactInventory.length >= 1);
    assert.ok(response.json.repoSupplySurface.repoCount >= 1);
    assert.equal(response.json.boundaryRealitySurface.posture, 'honest-local-prototype');
    assert.ok(response.json.githubAppSessions.every((/** @type {any} */ session) => session.authPayloadHash));
    assert.ok(response.json.repoArtifactInventory.every((/** @type {any} */ entry) => entry.provenance?.provenanceHash));
    assert.ok(response.json.profileCompositions.profiles.length === 2);
    assert.equal(response.json.latestRun, null);
  });
});

testAny('GET / returns the app shell', async (t) => {
  await withApp(t, async ({ app }) => {
    const response = await invoke(app, { method: 'GET', url: '/' });
    assert.equal(response.statusCode, 200);
    assert.match(response.text, /Operate ENGI from repo supply to settlement/);
    assert.match(response.text, /Spec V15/);
    assert.match(response.text, /depositing, needing, and their fit/i);
    assert.match(response.text, /Depositing \+ candidate assets/);
    assert.match(response.text, /Needing \+ measured demand/);
    assert.match(response.text, /Depositing-to-needing fit/);
    assert.ok(response.text.indexOf('1. Depositing + candidate assets') < response.text.indexOf('2. Needing + measured demand'));
    assert.ok(response.text.indexOf('2. Needing + measured demand') < response.text.indexOf('3. Depositing-to-needing fit'));
  });
});

testAny('GET /api/state exposes V15 profile labels, task seed, and needing surface before any run', async (t) => {
  await withApp(t, async ({ app }) => {
    const response = await invoke(app, { method: 'GET', url: '/api/state' });
    assert.equal(response.statusCode, 200);
    assert.equal(response.json.needScenarios[0].taskSeed, 'Recover a production auth migration with issuer mismatch while preserving session validity and rollback safety.');
    assert.equal(response.json.needScenarios[0].profileAStatus, 'Profile A — targeted deposit / bounded need');
    assert.equal(response.json.needScenarios[0].profileBStatus, 'Profile B — normalization deposit / composite need');
    assert.equal(response.json.needScenarios[0].realizationProfile.shortLabel, 'Targeted deposit');
    assert.equal(response.json.needScenarios[0].realizationProfile.profileKind, 'realization-profile');
    assert.equal('canonicalNames' in response.json.needScenarios[0].realizationProfile, false);
    assert.equal(response.json.needScenarios[0].needingSurface.targetArtifactKinds.includes('patch'), true);
    assert.equal(response.json.needScenarios.at(-1).realizationProfile.shortLabel, 'Normalization deposit');
  });
});

testAny('HOST capability docs are present in repo', async () => {
  const root = path.join(process.cwd(), 'HOST_CAPABILITIES.md');
  const json = path.join(process.cwd(), 'HOST_CAPABILITIES.json');
  const dockerfile = path.join(process.cwd(), 'Dockerfile');
  const dockerignore = path.join(process.cwd(), '.dockerignore');
  assert.equal(fs.existsSync(root), true);
  assert.equal(fs.existsSync(json), true);
  assert.equal(fs.existsSync(dockerfile), true);
  assert.equal(fs.existsSync(dockerignore), true);
});

testAny('GET /styles.css serves static css', async (t) => {
  await withApp(t, async ({ app }) => {
    const response = await invoke(app, { method: 'GET', url: '/styles.css' });
    assert.equal(response.statusCode, 200);
    assert.match(String(response.headers['Content-Type']), /text\/css/);
    assert.match(response.text, /--accent/);
  });
});

testAny('POST /api/deposits validates required fields', async (t) => {
  await withApp(t, async ({ app }) => {
    const response = await invoke(app, {
      method: 'POST',
      url: '/api/deposits',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: '', author: '', content: '' })
    });
    assert.equal(response.statusCode, 400);
    assert.match(response.json.error, /Raw content or repo artifact selection is required/);
  });
});

testAny('POST /api/deposits adds a candidate asset and ledger account', async (t) => {
  await withApp(t, async ({ app }) => {
    const response = await invoke(app, {
      method: 'POST',
      url: '/api/deposits',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Operator playbook',
        author: 'Tester',
        artifactKind: 'runbook',
        tags: ['auth', 'rollback'],
        content: 'validate issuer compatibility\n\nrerun benchmark workflow'
      })
    });

    assert.equal(response.statusCode, 200);
    assert.equal(response.json.ok, true);
    assert.equal(response.json.asset.metadata.author, 'Tester');
    assert.equal(response.json.asset.artifactKind, 'runbook');
    assert.equal(response.json.asset.uploadSurface.artifactType, 'runbook/operator-playbook');

    const state = await invoke(app, { method: 'GET', url: '/api/state' });
    assert.equal(state.json.assets.length, 12);
    assert.equal(state.json.assets[0].title, 'Operator playbook');
    assert.equal(state.json.ledger.accounts[`supplier:${response.json.asset.assetId}:pending_claims`], '0');
  });
});

testAny('POST /api/deposits accepts authenticated repo artifact selection without raw-only content', async (t) => {
  await withApp(t, async ({ app }) => {
    const state = await invoke(app, { method: 'GET', url: '/api/state' });
    const authSession = state.json.githubAppSessions.find((/** @type {any} */ session) => session.repo === 'frontier/demo-auth');
    const inventoryEntryIds = state.json.repoArtifactInventory
      .filter((/** @type {any} */ entry) => entry.repo === 'frontier/demo-auth')
      .slice(0, 2)
      .map((/** @type {any} */ entry) => entry.inventoryEntryId);

    const response = await invoke(app, {
      method: 'POST',
      url: '/api/deposits',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        authSessionId: authSession.authSessionId,
        inventoryEntryIds,
        operatorNote: 'Bundle these repo artifacts for auth rollback repair.'
      })
    });

    assert.equal(response.statusCode, 200);
    assert.equal(response.json.asset.artifactSelectionSurface.authSessionId, authSession.authSessionId);
    assert.deepEqual(response.json.asset.artifactSelectionSurface.selectedInventoryEntryIds, inventoryEntryIds);
    assert.equal(response.json.asset.artifactSelectionSurface.rawFallbackUsed, false);
    assert.equal(response.json.asset.artifactSelectionSurface.selectedInventoryEntries.length, inventoryEntryIds.length);
    assert.equal(response.json.asset.githubAppAuthSurface.installationId, authSession.installationId);
    assert.equal(response.json.asset.githubAppAuthSurface.authSessionId, authSession.authSessionId);
    assert.equal(response.json.asset.addressingSurface.repo, 'frontier/demo-auth');
    assert.equal(response.json.asset.signingSurface.signedSelectionRoot, response.json.asset.artifactSelectionSurface.selectedInventoryRoot);
    assert.equal(response.json.asset.signingSurface.signedGitHubAppAuthRoot, response.json.asset.githubAppAuthSurface.authPayloadHash);
  });
});

testAny('POST /api/deposits can create a revoked issuer candidate without crashing public state', async (t) => {
  await withApp(t, async ({ app }) => {
    const response = await invoke(app, {
      method: 'POST',
      url: '/api/deposits',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Revoked note',
        author: 'Restricted Tester',
        issuerPolicyStatus: 'revoked',
        content: 'legacy issuer note with private remediation content'
      })
    });

    assert.equal(response.statusCode, 200);
    const state = await invoke(app, { method: 'GET', url: '/api/state' });
    assert.equal(state.json.assets.length, 12);
  });
});


testAny('POST /api/deposits accepts V15 artifact precision and boundary fields', async (t) => {
  await withApp(t, async ({ app }) => {
    const response = await invoke(app, {
      method: 'POST',
      url: '/api/deposits',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Typed patch',
        author: 'Tester',
        artifactKind: 'patch',
        artifactType: 'code/patch',
        sourceRepo: 'frontier/demo-auth',
        sourceCommit: 'abc123',
        workflowRunId: 'gha_run_custom',
        signerAddress: 'did:key:tester',
        visualPreview: 'Short visual preview',
        content: 'restoreLegacyVerifier in services/auth/rollback.ts'
      })
    });

    assert.equal(response.statusCode, 200);
    assert.equal(response.json.asset.artifactType, 'code/patch');
    assert.equal(response.json.asset.githubBoundary.sourceCommit, 'abc123');
    assert.equal(response.json.asset.identitySurface.signerAddress, 'did:key:tester');
    assert.equal(response.json.asset.signingSurface.signerAddress, 'did:key:tester');
    assert.equal(response.json.asset.signingSurface.signedGitHubAppAuthRoot, response.json.asset.githubAppAuthSurface.authPayloadHash);
  });
});

testAny('POST /api/make-engi-branch defaults to bounded public projection', async (t) => {
  await withApp(t, async ({ app }) => {
    const response = await invoke(app, {
      method: 'POST',
      url: '/api/make-engi-branch',
      headers: { 'Content-Type': 'application/json' },
      body: '{}'
    });

    assert.equal(response.statusCode, 200);
    assert.equal(response.json.ok, true);
    assert.equal(response.json.latestRun.needLifecycle, 'settled');
    assert.equal(response.json.latestRun.conformanceProfile, 'Profile A — targeted deposit / bounded need');
    assert.equal(response.json.latestRun.realizationProfile.shortLabel, 'Targeted deposit');
    assert.equal(response.json.latestRun.projectionPrincipal, 'public');
    assert.ok(response.json.latestRun.need.needId);
    assert.ok(response.json.latestRun.depositingSurface.depositSessionId);
    assert.ok(response.json.latestRun.needingSurface.needId);
    assert.equal(response.json.latestRun.depositingToNeedingSurface.depositSessionId, response.json.latestRun.depositingSurface.depositSessionId);
    assert.ok(response.json.latestRun.assetPack.assetPackId);
    assert.deepEqual(
      response.json.latestRun.repoToSettlementSurface.stages.slice(0, 3).map((/** @type {any} */ stage) => stage.stageId),
      ['depositing', 'needing', 'deposit-to-need-fit']
    );
    assert.ok(response.json.latestRun.repoToSettlementSurface.stages.length === 7);
    assert.ok(response.json.latestRun.boundedPublicProof.bundleId);
    assert.ok(response.json.latestRun.publicArtifacts['.engi/bounded-public-proof.json']);
    assert.ok(response.json.latestRun.publicArtifacts['.engi/needing-surface.json']);
    assert.ok(response.json.latestRun.publicArtifacts['.engi/depositing-to-needing-surface.json']);
    assert.ok(response.json.latestRun.publicArtifacts['.engi/match-report.json']);
    assert.ok(response.json.latestRun.publicArtifacts['.engi/code-analysis-fact-registry.json']);
    assert.ok(response.json.latestRun.publicArtifacts['.engi/static-heuristics-registry.json']);
    assert.ok(response.json.latestRun.publicArtifacts['.engi/static-measurement-report.json']);
    assert.ok(response.json.latestRun.publicArtifacts['.engi/static-measurement-proof.json']);
    assert.ok(response.json.latestRun.publicArtifacts['.engi/materialization-proof.json']);
    assert.ok(response.json.latestRun.publicArtifacts['.engi/materialization-visibility-proof.json']);
    assert.ok(response.json.latestRun.publicArtifacts['.engi/scenario-fixture-manifest.json']);
    assert.ok(response.json.latestRun.publicArtifacts['.engi/test-coverage-report.json']);
    assert.ok(response.json.latestRun.testCoverageReport.suiteCoverage.unit.entrypoints.includes('test/core.test.js'));
    assert.ok(response.json.latestRun.testCoverageReport.suiteCoverage.unit.entrypoints.includes('test/proven-generator.test.js'));
    assert.ok(response.json.latestRun.testCoverageReport.suiteCoverage.integration.entrypoints.includes('test/api.test.js'));
    assert.ok(response.json.latestRun.testCoverageReport.suiteCoverage.integration.entrypoints.includes('test/workflow.integration.test.js'));
    assert.equal(response.json.latestRun.testCoverageReport.suiteCoverage.e2e.entrypoint, 'test/e2e.test.js');
    assert.equal(response.json.latestRun.testCoverageReport.suiteCoverage.e2e.requiredForDemoCanon, true);
    assert.equal(response.json.latestRun.authorizationDecisions, undefined);
    assert.deepEqual(
      Object.keys(response.json.latestRun.publicArtifacts).sort(),
      response.json.latestRun.projectionPolicy.publicArtifactPaths.slice().sort()
    );
    assert.deepEqual(
      Object.keys(response.json.latestRun.branchArtifacts.publicFiles).sort(),
      response.json.latestRun.projectionPolicy.publicArtifactPaths.slice().sort()
    );
    assert.match(response.json.latestRun.branchArtifacts.publicFiles['.engi/bounded-public-proof.json'], new RegExp(response.json.latestRun.boundedPublicProof.bundleId));
  });
});

testAny('POST /api/make-engi-branch can run a non-default seeded scenario', async (t) => {
  await withApp(t, async ({ app }) => {
    const response = await invoke(app, {
      method: 'POST',
      url: '/api/make-engi-branch',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scenarioId: 'infra-deployment-mismatch', principal: 'buyer' })
    });

    assert.equal(response.statusCode, 200);
    assert.equal(response.json.latestRun.scenarioId, 'infra-deployment-mismatch');
    assert.equal(response.json.latestRun.need.repo, 'frontier/deploy-orchestrator');
    assert.ok(response.json.latestRun.settlementParticipationArtifact.records.some((/** @type {any} */ entry) => entry.assetId === response.json.latestRun.assetPack.selectedAssets[0]));
    assert.equal(response.json.latestRun.accountingPrecisionReport.exactAccountingInvariants.debitsEqualCredits, true);
  });
});

testAny('POST /api/make-engi-branch supports buyer projection and context branch mode', async (t) => {
  await withApp(t, async ({ app }) => {
    const response = await invoke(app, {
      method: 'POST',
      url: '/api/make-engi-branch',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ branchMode: 'context', principal: 'buyer' })
    });

    assert.equal(response.statusCode, 200);
    assert.equal(response.json.latestRun.projectionPrincipal, 'buyer');
    assert.equal(response.json.latestRun.branchMode, 'context');
    assert.equal(response.json.latestRun.assetPack.branchMode, 'context');
    assert.ok(response.json.latestRun.verificationReport.assetVerification.some((/** @type {any} */ entry) => entry.rights.branchMode === 'context'));
    assert.ok(response.json.latestRun.promptContracts.length >= 4);
    assert.ok(response.json.latestRun.measurementReceipts.length >= 3);
    assert.ok(response.json.latestRun.verificationReceipts.verificationReceipts.length >= 4);
    assert.ok(response.json.latestRun.sourceToSharesArtifact.sourceContributionEntries.length >= 1);
    assert.ok(response.json.latestRun.materializationProof.allExclusionsExplained);
    assert.ok(response.json.latestRun.scenarioFixtureManifest.scenarioFamilies.length >= 8);
  });
});

testAny('GET /api/state supports buyer projection without raw branch files', async (t) => {
  await withApp(t, async ({ app }) => {
    await invoke(app, {
      method: 'POST',
      url: '/api/make-engi-branch',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ principal: 'buyer' })
    });
    const response = await invoke(app, { method: 'GET', url: '/api/state?principal=buyer' });

    assert.equal(response.statusCode, 200);
    assert.equal(response.json.projectionPrincipal, 'buyer');
    assert.equal(response.json.latestRun.projectionPrincipal, 'buyer');
    assert.ok(response.json.latestRun.verificationReport.assetVerification.length >= 1);
    assert.ok(response.json.latestRun.codeAnalysisFactRegistry.registeredFactCount >= 10);
    assert.ok(response.json.latestRun.staticHeuristicsRegistry.registeredFactCount >= 10);
    assert.ok(response.json.latestRun.accountingPrecisionReport.microUnitAllocation.allocations.length >= 1);
    assert.equal(response.json.latestRun.branchArtifacts.files, undefined);
  });
});

testAny('GET /api/state supports reviewer and internal projection differences', async (t) => {
  await withApp(t, async ({ app }) => {
    await invoke(app, {
      method: 'POST',
      url: '/api/make-engi-branch',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scenarioId: 'privacy-boundary-proof-export', principal: 'reviewer' })
    });

    const reviewer = await invoke(app, { method: 'GET', url: '/api/state?principal=reviewer' });
    const internal = await invoke(app, { method: 'GET', url: '/api/state?principal=internal' });

    assert.equal(reviewer.statusCode, 200);
    assert.equal(internal.statusCode, 200);
    assert.equal(reviewer.json.latestRun.projectionPrincipal, 'reviewer');
    assert.equal(internal.json.latestRun.projectionPrincipal, undefined);
    assert.ok(reviewer.json.latestRun.proofWitnessManifest.proofFamilies.length === 9);
    assert.ok(reviewer.json.latestRun.branchArtifacts.visibleFileInventory.includes('.engi/proof-contract.json'));
    assert.equal(reviewer.json.latestRun.branchArtifacts.visibleFileInventory.some((/** @type {string} */ path) => path.startsWith('.engi/source-material/')), false);
    assert.equal(reviewer.json.latestRun.authorizationDecisions, undefined);
    assert.equal(reviewer.json.latestRun.branchArtifacts.files, undefined);
    assert.ok(internal.json.latestRun.branchArtifacts.files['.engi/proof-contract.json']);
    assert.ok(Object.keys(internal.json.latestRun.branchArtifacts.files).some((path) => path.startsWith('.engi/source-material/')));
    assert.ok(internal.json.latestRun.authorizationDecisions.length >= 1);
    assert.ok(internal.json.latestRun.systemProofBundle.verifierEntrypoint.requiredArtifactPaths.includes('.engi/proof-witness-manifest.json'));
  });
});

testAny('GET /api/state rejects unsupported projection principal as a client error', async (t) => {
  await withApp(t, async ({ app }) => {
    const response = await invoke(app, { method: 'GET', url: '/api/state?principal=operator' });
    assert.equal(response.statusCode, 400);
    assert.match(response.json.error, /Unsupported projection principal/i);
  });
});

testAny('POST /api/make-engi-branch rejects unsupported principal, branch mode, and scenario as client errors', async (t) => {
  await withApp(t, async ({ app }) => {
    const badPrincipal = await invoke(app, {
      method: 'POST',
      url: '/api/make-engi-branch',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ principal: 'operator' })
    });
    assert.equal(badPrincipal.statusCode, 400);
    assert.match(badPrincipal.json.error, /Unsupported projection principal/i);

    const badBranchMode = await invoke(app, {
      method: 'POST',
      url: '/api/make-engi-branch',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ branchMode: 'full' })
    });
    assert.equal(badBranchMode.statusCode, 400);
    assert.match(badBranchMode.json.error, /Unsupported branch mode/i);

    const badScenario = await invoke(app, {
      method: 'POST',
      url: '/api/make-engi-branch',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scenarioId: 'missing-scenario' })
    });
    assert.equal(badScenario.statusCode, 400);
    assert.match(badScenario.json.error, /Need scenario not found/i);
  });
});

testAny('POST /api/reset restores seeded state and clears latest run', async (t) => {
  await withApp(t, async ({ app, dataPath }) => {
    await invoke(app, { method: 'POST', url: '/api/make-engi-branch', headers: { 'Content-Type': 'application/json' }, body: '{}' });
    const reset = await invoke(app, { method: 'POST', url: '/api/reset', headers: { 'Content-Type': 'application/json' }, body: '{}' });

    assert.equal(reset.statusCode, 200);
    assert.equal(reset.json.state.latestRun, null);

    const persisted = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    assert.equal(persisted.latestRun, null);
    assert.equal(persisted.runHistory.length, 0);
  });
});

testAny('malformed JSON body returns 400 instead of 500', async (t) => {
  await withApp(t, async ({ app }) => {
    const response = await invoke(app, {
      method: 'POST',
      url: '/api/deposits',
      headers: { 'Content-Type': 'application/json' },
      body: '{bad json'
    });

    assert.equal(response.statusCode, 400);
    assert.match(response.json.error, /Invalid JSON body/);
  });
});

testAny('static path traversal is blocked', async (t) => {
  await withApp(t, async ({ app }) => {
    const response = await invoke(app, { method: 'GET', url: '/../server.js' });
    assert.equal(response.statusCode, 404);
    assert.match(response.text, /Not found/);
  });
});

testAny('unknown api route returns JSON 404', async (t) => {
  await withApp(t, async ({ app }) => {
    const response = await invoke(app, { method: 'GET', url: '/api/nope' });
    assert.equal(response.statusCode, 404);
    assert.equal(response.json.error, 'Not found.');
  });
});

testAny('unsupported non-GET route returns JSON 404', async (t) => {
  await withApp(t, async ({ app }) => {
    const response = await invoke(app, { method: 'DELETE', url: '/api/state' });
    assert.equal(response.statusCode, 404);
    assert.equal(response.json.error, 'Not found.');
  });
});

testAny('failed deposit write does not corrupt persisted demo state', async (t) => {
  await withApp(t, async ({ app, dataPath }) => {
    const before = readPersistedState(dataPath);

    await withCorruptingWriteFailure(dataPath, async () => {
      const failed = await invoke(app, {
        method: 'POST',
        url: '/api/deposits',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Operator playbook', author: 'Tester', content: 'validate issuer compatibility' })
      });
      assert.equal(failed.statusCode, 500);
      assert.match(failed.json.error, /Simulated disk write failure/);
    });

    assert.deepEqual(readPersistedState(dataPath), before);
    const state = await invoke(app, { method: 'GET', url: '/api/state' });
    assert.equal(state.json.assets.length, before.assets.length);
    assert.equal(state.json.runHistory.length, before.runHistory.length);
  });
});

testAny('failed make-engi-branch write does not persist settlement state', async (t) => {
  await withApp(t, async ({ app, dataPath }) => {
    const before = readPersistedState(dataPath);

    await withCorruptingWriteFailure(dataPath, async () => {
      const failed = await invoke(app, {
        method: 'POST',
        url: '/api/make-engi-branch',
        headers: { 'Content-Type': 'application/json' },
        body: '{}'
      });
      assert.equal(failed.statusCode, 500);
      assert.match(failed.json.error, /Simulated disk write failure/);
    });

    assert.deepEqual(readPersistedState(dataPath), before);
    const state = await invoke(app, { method: 'GET', url: '/api/state' });
    assert.equal(state.json.runHistory.length, before.runHistory.length);
    assert.deepEqual(state.json.ledger.accounts, before.ledger.accounts);
  });
});

testAny('bootstrap repairs incomplete on-disk state', async (t) => {
  await withApp(t, async ({ dataPath }) => {
    fs.writeFileSync(dataPath, JSON.stringify({ assets: [] }, null, 2));
    const repaired = createAppContextAny({ dataPath, publicDir: path.join(process.cwd(), 'public') });
    const result = repaired.ensureState();
    assert.equal(result.bootstrapped, true);
    const state = repaired.readState();
    assert.equal(state.assets.length, 11);
    assert.equal(state.buyers.length, 1);
  });
});
