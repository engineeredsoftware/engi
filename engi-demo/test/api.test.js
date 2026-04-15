import test from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { EventEmitter } from 'node:events';
import { createAppContext } from '../server.js';
import { CURRENT_CANON_POSTURE } from '../src/canon-posture.js';

/**
 * @typedef {{ app: any, dataPath: string }} AppHarness
 */

/** @type {((name: string, fn: (t: any) => any) => any) & ((name: string, options: any, fn: (t: any) => any) => any)} */
const testAny = test;
const createAppContextAny = /** @type {any} */ (createAppContext);
const TEST_DIR = path.dirname(fileURLToPath(import.meta.url));
const APP_ROOT = path.resolve(TEST_DIR, '..');

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
  const app = createAppContextAny({ dataPath, publicDir: path.join(APP_ROOT, 'public') });
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
 * @param {Record<string, string | undefined>} envPatch
 * @param {() => Promise<any>} fn
 * @returns {Promise<any>}
 */
async function withEnv(envPatch, fn) {
  const previous = Object.fromEntries(Object.keys(envPatch).map((key) => [key, process.env[key]]));
  try {
    for (const [key, value] of Object.entries(envPatch)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
    return await fn();
  } finally {
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
}

/**
 * @param {(request: { url: string, method: string, headers: Record<string, string>, json: any }) => Promise<{ status?: number, json?: any } | any>} handler
 * @returns {Promise<{ baseUrl: string, requests: Array<{ url: string, method: string, headers: Record<string, string>, json: any }>, close: () => Promise<void> }>}
 */
async function startJsonExecutorServer(handler) {
  /** @type {Array<{ url: string, method: string, headers: Record<string, string>, json: any }>} */
  const requests = [];
  const server = http.createServer(async (req, res) => {
    let body = '';
    for await (const chunk of req) body += Buffer.from(chunk).toString('utf8');
    const json = body ? JSON.parse(body) : null;
    const headers = Object.fromEntries(
      Object.entries(req.headers || {}).map(([key, value]) => [key, Array.isArray(value) ? value.join(', ') : String(value || '')])
    );
    const request = {
      url: String(req.url || '/'),
      method: String(req.method || 'GET'),
      headers,
      json
    };
    requests.push(request);
    try {
      const result = await handler(request);
      const status = Number(result?.status || 200);
      const payload = result && typeof result === 'object' && 'json' in result ? result.json : result;
      res.writeHead(status, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(payload));
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: error instanceof Error ? error.message : 'executor failure' }));
    }
  });

  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const address = /** @type {import('node:net').AddressInfo} */ (server.address());
  return {
    baseUrl: `http://127.0.0.1:${address.port}`,
    requests,
    close: () => new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()))
  };
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

testAny('GET /api/state returns seeded active-canon public state', async (t) => {
  await withApp(t, async ({ app }) => {
    const response = await invoke(app, { method: 'GET', url: '/api/state' });
    assert.equal(response.statusCode, 200);
    assert.equal(response.json.specVersion, CURRENT_CANON_POSTURE.specVersionLabel);
    assert.equal(response.json.canonPosture.activeCanonVersion, CURRENT_CANON_POSTURE.activeCanonVersion);
    assert.equal(response.json.canonPosture.draftTargetVersion, CURRENT_CANON_POSTURE.draftTargetVersion);
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
    assert.match(response.text, /<title>Bitcode Demo<\/title>/);
    assert.match(response.text, /Operate Bitcode from repo supply to settlement/);
    assert.match(response.text, /id="heroLede"/);
    assert.match(response.text, /id="heroTip"/);
    assert.match(response.text, /Bitcode deterministic local prototype/);
    assert.match(response.text, /Loading current canon posture/i);
    assert.match(response.text, /Loading current generated appendix and report posture/i);
    assert.match(response.text, /Depositing \+ candidate assets/);
    assert.match(response.text, /Needing \+ measured demand/);
    assert.match(response.text, /Depositing-to-needing fit/);
    assert.ok(response.text.indexOf('1. Depositing + candidate assets') < response.text.indexOf('2. Needing + measured demand'));
    assert.ok(response.text.indexOf('2. Needing + measured demand') < response.text.indexOf('3. Depositing-to-needing fit'));
  });
});

testAny('GET /api/state exposes canonical profile labels, task seed, and needing surface before any run', async (t) => {
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
  const root = path.join(APP_ROOT, 'HOST_CAPABILITIES.md');
  const json = path.join(APP_ROOT, 'HOST_CAPABILITIES.json');
  const dockerfile = path.join(APP_ROOT, 'Dockerfile');
  const dockerignore = path.join(APP_ROOT, '.dockerignore');
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

testAny('GET /favicon.svg serves the demo icon', async (t) => {
  await withApp(t, async ({ app }) => {
    const response = await invoke(app, { method: 'GET', url: '/favicon.svg' });
    assert.equal(response.statusCode, 200);
    assert.match(String(response.headers['Content-Type']), /image\/svg\+xml/);
    assert.match(response.text, /Bitcode/);
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


testAny('POST /api/deposits accepts artifact precision and boundary fields', async (t) => {
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

testAny('POST /api/make-engi-branch accepts V23 payment mode and projects bitcoin surfaces by principal', async (t) => {
  await withApp(t, async ({ app }) => {
    const buyerRun = await invoke(app, {
      method: 'POST',
      url: '/api/make-engi-branch',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        paymentMode: 'checkpointed-sidechain-bridge',
        principal: 'buyer'
      })
    });
    const publicState = await invoke(app, { method: 'GET', url: '/api/state?principal=public' });
    const reviewerState = await invoke(app, { method: 'GET', url: '/api/state?principal=reviewer' });

    assert.equal(buyerRun.statusCode, 200);
    assert.equal(buyerRun.json.latestRun.paymentMode, 'checkpointed-sidechain-bridge');
    assert.equal(buyerRun.json.latestRun.projectionPrincipal, 'buyer');
    assert.equal(buyerRun.json.latestRun.systemProofBundle.proofFamilies.length, 11);
    assert.equal(buyerRun.json.latestRun.proofWitnessManifest.proofFamilies.length, 11);
    assert.equal(buyerRun.json.latestRun.bitcoinSettlementIntent.serviceMode, 'stubbed-testnet-demonstration-service');
    assert.equal(buyerRun.json.latestRun.bitcoinSettlementIntent.carrierType, 'sidechain-transfer-intent');
    assert.equal(buyerRun.json.latestRun.bitcoinSettlementObservation.networkState, 'checkpointed-sidechain');
    assert.equal(buyerRun.json.latestRun.bitcoinSettlementObservation.observationReality, 'stubbed-testnet-demonstration-service');
    assert.equal(buyerRun.json.latestRun.bitcoinSettlementIntent.unitDenomination, 'BTD');
    assert.equal(buyerRun.json.latestRun.bitcoinAnchor.publicationReality, 'stubbed-testnet-demonstration-service');
    assert.equal(buyerRun.json.latestRun.externalEnvironmentProfile, undefined);
    assert.equal(buyerRun.json.latestRun.externalTelemetrySummary, undefined);
    assert.equal(buyerRun.json.latestRun.githubAppBinding, undefined);
    assert.equal(buyerRun.json.latestRun.externalRealizationSummary.configuredEnvironmentMode, 'development');
    assert.equal(buyerRun.json.latestRun.externalRealizationSummary.interfaceSummaries.length, 6);
    assert.ok(buyerRun.json.latestRun.externalRealizationSummary.interfaceSummaries.every((entry) => entry.localPrototypeImplemented === true));
    assert.ok(buyerRun.json.latestRun.externalRealizationSummary.interfaceSummaries.every((entry) => entry.externalBoundaryRequiredForLive === true));
    assert.ok(buyerRun.json.latestRun.externalRealizationSummary.interfaceSummaries.every((entry) => entry.runtimeState === 'stubbed-demonstration'));
    assert.ok(buyerRun.json.latestRun.externalBoundaryManifest.interfaces.some((/** @type {any} */ entry) => entry.interfaceId === 'bitcoin-sidechain-bridge'));
    assert.ok(buyerRun.json.latestRun.externalBoundaryManifest.interfaces.some((/** @type {any} */ entry) => entry.status === 'implemented-as-stubbed-testnet-service'));
    assert.equal(buyerRun.json.latestRun.externalBoundaryManifest.configuredEnvironmentMode, 'development');
    assert.equal(buyerRun.json.latestRun.externalBoundaryManifest.actualityDisposition, 'stubbed-external-demonstration');

    assert.equal(publicState.statusCode, 200);
    assert.ok(publicState.json.latestRun.publicArtifacts['.engi/bitcoin-bounded-public-anchor.json']);
    assert.equal('.engi/bitcoin-anchor.json' in publicState.json.latestRun.publicArtifacts, false);
    assert.equal(publicState.json.latestRun.externalRealizationSummary.configuredEnvironmentMode, 'development');
    assert.equal(publicState.json.latestRun.externalRealizationSummary.interfaceIds.length, 6);
    assert.equal(publicState.json.latestRun.externalRealizationSummary.interfaceStates.length, 6);
    assert.ok(publicState.json.latestRun.externalRealizationSummary.interfaceStates.every((entry) => entry.status === 'implemented-as-draft-target-realization-surface'));
    assert.ok(publicState.json.latestRun.externalRealizationSummary.interfaceStates.every((entry) => entry.runtimeState === 'stubbed-demonstration'));
    assert.equal(publicState.json.latestRun.externalEnvironmentProfile, undefined);

    assert.equal(reviewerState.statusCode, 200);
    assert.equal(reviewerState.json.latestRun.bitcoinSettlementIntent, undefined);
    assert.ok(reviewerState.json.latestRun.bitcoinBoundedPublicAnchor.anchorId);
    assert.ok(reviewerState.json.latestRun.bitcoinCommitmentManifest.publicRoot);
    assert.equal(reviewerState.json.latestRun.externalRealizationSummary.interfaceSummaries.length, 6);
    assert.ok(reviewerState.json.latestRun.externalRealizationSummary.interfaceSummaries.every((entry) => entry.localPrototypeImplemented === true));
    assert.ok(reviewerState.json.latestRun.externalRealizationSummary.interfaceSummaries.every((entry) => entry.externalBoundaryRequiredForLive === true));
    assert.ok(reviewerState.json.latestRun.externalRealizationSummary.interfaceSummaries.every((entry) => entry.runtimeState === 'stubbed-demonstration'));
    assert.ok(reviewerState.json.latestRun.externalRealizationSummary.interfaceSummaries.every((entry) => entry.missingBindingKeys.includes('executorUrl')));
    assert.equal(reviewerState.json.latestRun.externalEnvironmentProfile, undefined);
  });
});

testAny('GET /api/bitcoin-demonstration-service returns the V23 stubbed-testnet service descriptor', async (t) => {
  await withApp(t, async ({ app }) => {
    const response = await invoke(app, { method: 'GET', url: '/api/bitcoin-demonstration-service' });

    assert.equal(response.statusCode, 200);
    assert.equal(response.json.service.serviceMode, 'stubbed-testnet-demonstration-service');
    assert.equal(response.json.service.liveMainnetExecution, false);
    assert.ok(response.json.service.supportedPaymentModes.includes('audited-base-layer-purchase'));
    assert.ok(response.json.service.supportedPaymentModes.includes('repeated-read-payment'));
    assert.ok(response.json.service.supportedPaymentModes.includes('checkpointed-sidechain-bridge'));
  });
});

testAny('GET /api/v24/external-realization returns the draft-target environment and telemetry descriptor', async (t) => {
  await withApp(t, async ({ app }) => {
    const response = await invoke(app, { method: 'GET', url: '/api/v24/external-realization' });
    const descriptor = response.json.externalRealization;
    const activeRuntime = response.json.activeRuntime;
    const stagingProfile = descriptor.environmentProfiles.find((profile) => profile.environmentMode === 'staging');
    const developmentProfile = descriptor.environmentProfiles.find((profile) => profile.environmentMode === 'development');
    const stagingGithub = descriptor.githubAppBindings.find((binding) => binding.environmentMode === 'staging');
    const developmentGithub = descriptor.githubAppBindings.find((binding) => binding.environmentMode === 'development');

    assert.equal(response.statusCode, 200);
    assert.equal(descriptor.draftTargetVersion, 'V24');
    assert.deepEqual(descriptor.environmentModes, ['production', 'staging', 'development', 'mock']);
    assert.equal(stagingProfile.externalBindings.bitcoinMainchain.network, 'bitcoin-testnet4');
    assert.equal(developmentProfile.externalBindings.bitcoinMainchain.network, 'bitcoin-testnet4');
    assert.notEqual(stagingProfile.externalBindings.bitcoinMainchain.addressRef, developmentProfile.externalBindings.bitcoinMainchain.addressRef);
    assert.notEqual(stagingProfile.externalBindings.sidechain.addressRef, developmentProfile.externalBindings.sidechain.addressRef);
    assert.notEqual(stagingGithub.appId, developmentGithub.appId);
    assert.equal(descriptor.externalTelemetryPolicy.coverageExpectation.missingTelemetryDisposition, 'blocking');
    assert.ok(descriptor.networkCapabilityManifest.interfaces.some((entry) => entry.interfaceId === 'github-live-interface'));
    assert.equal(activeRuntime.configuredEnvironmentMode, 'mock');
    assert.equal(activeRuntime.interfaceRuntimeStates.length, 6);
    assert.ok(activeRuntime.interfaceRuntimeStates.every((entry) => entry.runtimeState === 'mock'));
  });
});

testAny('GET /api/v24/external-realization promotes enabled local executors to live-configured runtime state', async (t) => {
  await withApp(t, async ({ app }) => {
    await withEnv({
      ENGI_V24_ENVIRONMENT_MODE: 'development',
      ENGI_V24_ENABLE_LOCAL_EXECUTORS: '1',
      ENGI_V24_ENABLE_BITCOIN_MAINCHAIN: '1',
      ENGI_V24_ENABLE_REPEATED_READ_PAYMENT: '1',
      ENGI_V24_ENABLE_SIDECHAIN: '1',
      ENGI_V24_ENABLE_COMPUTE: '1',
      ENGI_V24_ENABLE_STORAGE: '1',
      ENGI_V24_ENABLE_GITHUB: '1'
    }, async () => {
      const response = await invoke(app, { method: 'GET', url: '/api/v24/external-realization' });
      const activeRuntime = response.json.activeRuntime;

      assert.equal(response.statusCode, 200);
      assert.equal(activeRuntime.actualityDisposition, 'live-configured-external-realization');
      assert.ok(activeRuntime.interfaceRuntimeStates.every((entry) => entry.runtimeState === 'live-configured'));
      assert.equal(activeRuntime.activeBindings.bitcoinMainchain.executorUrl, 'engi-local://bitcoin-mainchain-execution');
      assert.equal(activeRuntime.activeBindings.repeatedReadPayment.executorUrl, 'engi-local://repeated-read-payment-execution');
      assert.equal(activeRuntime.activeBindings.sidechain.executorUrl, 'engi-local://sidechain-execution');
      assert.equal(activeRuntime.activeBindings.compute.executorUrl, 'engi-local://compute-container-execution');
      assert.equal(activeRuntime.activeBindings.storage.executorUrl, 'engi-local://storage-container-execution');
      assert.equal(activeRuntime.activeBindings.github.executorUrl, 'engi-local://github-live-interface');
    });
  });
});

testAny('GET /api/v24/external-realization marks secret-dependent GitHub App execution as live-misconfigured when key material is absent', async (t) => {
  await withApp(t, async ({ app }) => {
    await withEnv({
      ENGI_V24_ENVIRONMENT_MODE: 'development',
      ENGI_V24_ENABLE_GITHUB: '1',
      ENGI_V24_GITHUB_EXECUTOR_URL: 'https://github.example.test/api',
      ENGI_V24_GITHUB_EXECUTOR_KIND: 'github-app-rest-v3',
      ENGI_V24_GITHUB_APP_PRIVATE_KEY_PEM: undefined
    }, async () => {
      const response = await invoke(app, { method: 'GET', url: '/api/v24/external-realization' });
      const githubRuntime = response.json.activeRuntime.interfaceRuntimeStateById['github-live-interface'];

      assert.equal(response.statusCode, 200);
      assert.equal(githubRuntime.runtimeState, 'live-misconfigured');
      assert.deepEqual(githubRuntime.missingBindingKeys, []);
      assert.deepEqual(githubRuntime.missingSecretEnvKeys, ['ENGI_V24_GITHUB_APP_PRIVATE_KEY_PEM']);
    });
  });
});

testAny('POST /api/v24/executors/:interfaceId serves built-in demonstration executor patches', async (t) => {
  await withApp(t, async ({ app }) => {
    const response = await invoke(app, {
      method: 'POST',
      url: '/api/v24/executors/github-live-interface',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        interfaceId: 'github-live-interface',
        configuredEnvironmentMode: 'development',
        actualityDisposition: 'live-configured-external-realization',
        branchName: 'engi-review/demo-route',
        binding: {
          appRef: 'github-app://engi/development',
          appId: 'engi-development-github-app',
          installationTargetRef: 'github-installation://engi/development'
        },
        telemetry: {
          requestId: 'req_demo_github_route',
          executionId: 'exec_demo_github_route',
          observationId: 'obs_demo_github_route'
        },
        artifacts: {
          githubLiveSession: {
            repo: 'frontier/demo-auth',
            branchName: 'engi-review/demo-route'
          },
          githubInventoryFetchReceipt: {},
          githubArtifactFetchReceipt: {},
          githubBranchPublicationReceipt: {
            branchName: 'engi-review/demo-route'
          },
          githubPrUpdateReceipt: {
            branchName: 'engi-review/demo-route'
          }
        },
        supportArtifacts: {
          githubAppBinding: {
            activeBinding: {
              appRef: 'github-app://engi/development',
              appId: 'engi-development-github-app',
              installationTargetRef: 'github-installation://engi/development'
            }
          },
          githubBoundarySurface: {
            selectedAuthSessions: [{
              authSessionId: 'auth_demo_github_route',
              authPayloadHash: 'sha256:demo-github-route',
              permissionsRoot: 'perm_demo_github_route'
            }],
            selectedInventoryProofs: []
          }
        }
      })
    });

    assert.equal(response.statusCode, 200);
    assert.equal(response.json.ok, true);
    assert.equal(response.json.interfaceId, 'github-live-interface');
    assert.equal(response.json.artifacts.githubLiveSession.authSessionId, 'auth_demo_github_route');
    assert.equal(response.json.artifacts.githubBranchPublicationReceipt.mutationState, 'live-github-branch-published');
    assert.equal(response.json.artifacts.githubPrUpdateReceipt.prNumber, 24);
    assert.equal(response.json.telemetry.runtimeState, 'live-observed');
  });
});

testAny('POST /api/make-engi-branch realizes enabled V24 local executors across all external interfaces before persisting state', async (t) => {
  await withApp(t, async ({ app, dataPath }) => {
    await withEnv({
      ENGI_V24_ENVIRONMENT_MODE: 'development',
      ENGI_V24_ENABLE_LOCAL_EXECUTORS: '1',
      ENGI_V24_ENABLE_BITCOIN_MAINCHAIN: '1',
      ENGI_V24_ENABLE_SIDECHAIN: '1',
      ENGI_V24_ENABLE_COMPUTE: '1',
      ENGI_V24_ENABLE_STORAGE: '1',
      ENGI_V24_ENABLE_GITHUB: '1'
    }, async () => {
      const response = await invoke(app, {
        method: 'POST',
        url: '/api/make-engi-branch',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentMode: 'checkpointed-sidechain-bridge',
          principal: 'reviewer'
        })
      });

      assert.equal(response.statusCode, 200);

      const persisted = readPersistedState(dataPath);
      assert.equal(persisted.latestRun.externalEnvironmentProfile.demonstrationToggleState.localExecutorsEnabled, true);
      assert.equal(persisted.latestRun.externalEnvironmentProfile.activeBindings.github.executorUrl, 'engi-local://github-live-interface');
      assert.equal(persisted.latestRun.bitcoinNetworkExecution.executionState, 'live-network-broadcast-and-observed');
      assert.equal(persisted.latestRun.bitcoinNetworkObservation.confirmationState, 'confirmed');
      assert.equal(persisted.latestRun.sidechainExecutionReceipt.executionState, 'live-sidechain-checkpoint-observed');
      assert.equal(persisted.latestRun.computeContainerExecution.executionState, 'live-container-executed');
      assert.equal(persisted.latestRun.storagePublicationReceipt.publicationState, 'live-storage-published');
      assert.equal(persisted.latestRun.storageRetrievalReceipt.retrievalState, 'live-storage-retrieved');
      assert.equal(persisted.latestRun.githubInventoryFetchReceipt.fetchState, 'live-github-inventory-fetched');
      assert.equal(persisted.latestRun.githubArtifactFetchReceipt.fetchState, 'live-github-artifact-fetched');
      assert.equal(persisted.latestRun.githubBranchPublicationReceipt.mutationState, 'live-github-branch-published');
      assert.equal(persisted.latestRun.githubPrUpdateReceipt.mutationState, 'live-github-pr-updated');
      assert.equal(persisted.latestRun.githubPrUpdateReceipt.prNumber, 24);
      assert.equal(
        persisted.latestRun.externalBoundaryManifest.interfaces.find((entry) => entry.interfaceId === 'github-live-interface').localPrototype.runtimeState,
        'live-observed'
      );
      assert.equal(
        persisted.latestRun.externalBoundaryManifest.interfaces.find((entry) => entry.interfaceId === 'bitcoin-mainchain-execution').status,
        'implemented-as-live-observed-surface'
      );
      const observedInterfaceIds = [
        'bitcoin-mainchain-execution',
        'sidechain-execution',
        'compute-container-execution',
        'storage-container-execution',
        'github-live-interface'
      ];
      assert.ok(
        observedInterfaceIds.every((interfaceId) =>
          persisted.latestRun.externalEnvironmentProfile.interfaceRuntimeStateById[interfaceId].runtimeState === 'live-observed'
        )
      );
      assert.ok(
        observedInterfaceIds.every((interfaceId) => {
          const summary = persisted.latestRun.externalTelemetrySummary.interfaceSummaries.find((entry) => entry.interfaceId === interfaceId);
          return summary?.runtimeState === 'live-observed' && summary?.telemetryCoverageState === 'shape-complete-live-observed';
        })
      );
      assert.equal(persisted.latestRun.externalRealizationProof.allTheoremsPassed, true);
      assert.equal(persisted.latestRun.containerRealityProof.allTheoremsPassed, true);
      assert.equal(persisted.latestRun.githubLiveInterfaceProof.allTheoremsPassed, true);

      const reviewer = await invoke(app, { method: 'GET', url: '/api/state?principal=reviewer' });
      assert.equal(reviewer.statusCode, 200);
      assert.ok(
        observedInterfaceIds.every((interfaceId) =>
          reviewer.json.latestRun.externalRealizationSummary.interfaceSummaries
            .find((entry) => entry.interfaceId === interfaceId)?.runtimeState === 'live-observed'
        )
      );
    });
  });
});

testAny('POST /api/make-engi-branch realizes the V24 repeated-read payment executor for repeated-read payment mode', async (t) => {
  await withApp(t, async ({ app, dataPath }) => {
    await withEnv({
      ENGI_V24_ENVIRONMENT_MODE: 'development',
      ENGI_V24_ENABLE_LOCAL_EXECUTORS: '1',
      ENGI_V24_ENABLE_REPEATED_READ_PAYMENT: '1'
    }, async () => {
      const response = await invoke(app, {
        method: 'POST',
        url: '/api/make-engi-branch',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentMode: 'repeated-read-payment',
          principal: 'buyer'
        })
      });

      assert.equal(response.statusCode, 200);

      const persisted = readPersistedState(dataPath);
      assert.equal(persisted.latestRun.repeatedReadPaymentIntent.modeApplicability, 'active');
      assert.equal(persisted.latestRun.repeatedReadPaymentExecution.executionState, 'live-lightning-invoice-issued');
      assert.equal(persisted.latestRun.repeatedReadPaymentObservation.observationState, 'live-lightning-payment-observed');
      assert.equal(persisted.latestRun.repeatedReadPaymentObservation.confirmationState, 'accepted-offchain');
      assert.equal(persisted.latestRun.repeatedReadPaymentObservation.journalBindingState, 'anchor-required');
      assert.equal(
        persisted.latestRun.externalEnvironmentProfile.interfaceRuntimeStateById['repeated-read-payment-execution'].runtimeState,
        'live-observed'
      );
      assert.equal(
        persisted.latestRun.externalTelemetrySummary.interfaceSummaries.find((entry) => entry.interfaceId === 'repeated-read-payment-execution').reconciliationState,
        'live-repeated-read-reconciled'
      );
      assert.ok(
        JSON.parse(persisted.latestRun.branchArtifacts.files['.engi/repeated-read-payment-observation.json']).invoiceRef
      );
      assert.equal(persisted.latestRun.externalRealizationProof.allTheoremsPassed, true);
    });
  });
});

testAny('POST /api/make-engi-branch persists V24 external continuity artifacts across consecutive realized runs', async (t) => {
  await withApp(t, async ({ app, dataPath }) => {
    const env = {
      ENGI_V24_ENVIRONMENT_MODE: 'development',
      ENGI_V24_ENABLE_LOCAL_EXECUTORS: '1',
      ENGI_V24_ENABLE_BITCOIN_MAINCHAIN: '1',
      ENGI_V24_ENABLE_SIDECHAIN: '1',
      ENGI_V24_ENABLE_COMPUTE: '1',
      ENGI_V24_ENABLE_STORAGE: '1',
      ENGI_V24_ENABLE_GITHUB: '1'
    };

    await withEnv(env, async () => {
      const response = await invoke(app, {
        method: 'POST',
        url: '/api/make-engi-branch',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentMode: 'checkpointed-sidechain-bridge',
          principal: 'reviewer'
        })
      });
      assert.equal(response.statusCode, 200);
    });

    let persisted = readPersistedState(dataPath);
    assert.ok(persisted.latestRun.branchArtifacts.files['.engi/external-execution-ledger.json']);
    assert.ok(persisted.latestRun.branchArtifacts.files['.engi/external-reconciliation-log.json']);
    assert.equal(
      persisted.latestRun.externalExecutionLedger.interfaceLedgerById['github-live-interface'].continuityState,
      'first-observation'
    );
    assert.equal(
      persisted.latestRun.externalExecutionLedger.interfaceLedgerById['bitcoin-mainchain-execution'].observationSequence,
      1
    );

    await withEnv(env, async () => {
      const response = await invoke(app, {
        method: 'POST',
        url: '/api/make-engi-branch',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentMode: 'checkpointed-sidechain-bridge',
          principal: 'reviewer'
        })
      });
      assert.equal(response.statusCode, 200);
    });

    persisted = readPersistedState(dataPath);
    assert.equal(Array.isArray(persisted.externalReconciliationLog), true);
    assert.equal(persisted.externalReconciliationLog.length, 2);
    assert.equal(
      persisted.latestRun.externalExecutionLedger.interfaceLedgerById['github-live-interface'].continuityState,
      'binding-stable'
    );
    assert.equal(
      persisted.latestRun.externalExecutionLedger.interfaceLedgerById['github-live-interface'].observationSequence,
      2
    );
    assert.equal(
      persisted.latestRun.externalTelemetrySummary.interfaceSummaries.find((entry) => entry.interfaceId === 'github-live-interface').continuityState,
      'binding-stable'
    );
    assert.ok(persisted.latestRun.proofWitnessManifest.artifactDigestByPath['.engi/external-execution-ledger.json']);
    assert.ok(persisted.latestRun.proofWitnessManifest.artifactDigestByPath['.engi/external-reconciliation-log.json']);
    assert.ok(
      persisted.latestRun.proofWitnessManifest.proofFamiliesByName['proof-contract'].witnessArtifactPaths.includes('.engi/external-execution-ledger.json')
    );
    assert.ok(
      persisted.latestRun.proofContract.evidenceChain
        .find((entry) => entry.stage === 'external-execution-continuity')
        .artifactRefs.includes('.engi/external-reconciliation-log.json')
    );
    assert.ok(
      persisted.latestRun.systemProofBundle.verifierEntrypoint.requiredArtifactPaths.includes('.engi/external-execution-ledger.json')
    );
    assert.ok(
      persisted.latestRun.systemProofBundle.proofContract.evidenceChain
        .find((entry) => entry.stage === 'external-execution-continuity')
        .artifactRefs.includes('.engi/external-reconciliation-log.json')
    );
    assert.ok(
      persisted.latestRun.deliverablesManifest.deliverables.some((entry) => entry.path === '.engi/external-execution-ledger.json')
    );
    assert.ok(
      persisted.latestRun.deliverablesManifest.deliverables.some((entry) => entry.path === '.engi/external-reconciliation-log.json')
    );

    const reviewer = await invoke(app, { method: 'GET', url: '/api/state?principal=reviewer' });
    assert.equal(reviewer.statusCode, 200);
    assert.equal(
      reviewer.json.latestRun.externalRealizationSummary.interfaceSummaries.find((entry) => entry.interfaceId === 'github-live-interface').continuityState,
      'binding-stable'
    );
  });
});

testAny('POST /api/make-engi-branch fails closed when consecutive same-mode V24 bindings drift', async (t) => {
  await withApp(t, async ({ app, dataPath }) => {
    const stableEnv = {
      ENGI_V24_ENVIRONMENT_MODE: 'development',
      ENGI_V24_ENABLE_LOCAL_EXECUTORS: '1',
      ENGI_V24_ENABLE_GITHUB: '1'
    };

    await withEnv(stableEnv, async () => {
      const response = await invoke(app, {
        method: 'POST',
        url: '/api/make-engi-branch',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentMode: 'audited-base-layer-purchase',
          principal: 'reviewer'
        })
      });
      assert.equal(response.statusCode, 200);
    });

    let persisted = readPersistedState(dataPath);
    assert.equal(
      persisted.latestRun.externalExecutionLedger.interfaceLedgerById['github-live-interface'].observationSequence,
      1
    );

    await withEnv({
      ...stableEnv,
      ENGI_V24_GITHUB_INSTALLATION_TARGET_REF: 'github-installation://engi/development-drifted'
    }, async () => {
      const response = await invoke(app, {
        method: 'POST',
        url: '/api/make-engi-branch',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentMode: 'audited-base-layer-purchase',
          principal: 'reviewer'
        })
      });
      assert.equal(response.statusCode, 500);
      assert.match(String(response.json.error || ''), /binding drift detected/i);
    });

    persisted = readPersistedState(dataPath);
    assert.equal(
      persisted.latestRun.externalExecutionLedger.interfaceLedgerById['github-live-interface'].observationSequence,
      1
    );
    assert.equal(Array.isArray(persisted.externalReconciliationLog), true);
    assert.equal(persisted.externalReconciliationLog.length, 1);
  });
});

testAny('POST /api/make-engi-branch realizes protocol-specific V24 remote adapters across all external interfaces before persisting state', async (t) => {
  await withApp(t, async ({ app, dataPath }) => {
    const executor = await startJsonExecutorServer(async ({ url, method, headers, json }) => {
      if (method === 'GET' && url.startsWith('/github/repos/frontier/demo-auth/actions/runs?')) {
        assert.equal(headers.authorization, 'Bearer gh_demo_token');
        return { total_count: 1, workflow_runs: [{ id: 'gha_run_protocol_demo' }] };
      }
      if (method === 'GET' && url.startsWith('/github/repos/frontier/demo-auth/actions/runs/')) {
        assert.equal(headers.authorization, 'Bearer gh_demo_token');
        return { artifacts: [{ id: 1, name: 'proof-bundle' }] };
      }
      if (method === 'POST' && url === '/github/repos/frontier/demo-auth/git/refs') {
        assert.equal(headers.authorization, 'Bearer gh_demo_token');
        assert.match(String(json.ref || ''), /^refs\/heads\//);
        return {
          ref: json.ref,
          object: { sha: json.sha || 'protocol-demo-sha' }
        };
      }
      if (method === 'POST' && url === '/github/repos/frontier/demo-auth/pulls') {
        assert.equal(headers.authorization, 'Bearer gh_demo_token');
        return { number: 731, state: 'open' };
      }
      if (method === 'POST' && url === '/bitcoin-rpc') {
        assert.match(String(headers.authorization || ''), /^Basic /);
        if (json.method === 'sendtoaddress') {
          return { result: 'btc_protocol_txid_1' };
        }
        if (json.method === 'gettransaction') {
          return { result: { txid: 'btc_protocol_txid_1', confirmations: 2 } };
        }
      }
      if (method === 'POST' && url === '/sidechain-rpc') {
        assert.match(String(headers.authorization || ''), /^Basic /);
        if (json.method === 'sendtoaddress') {
          return { result: 'side_protocol_txid_1' };
        }
        if (json.method === 'gettransaction') {
          return { result: { txid: 'side_protocol_txid_1', confirmations: 3 } };
        }
      }
      if (method === 'POST' && url === '/compute/runs') {
        assert.equal(headers.authorization, 'Bearer compute_demo_token');
        return { runId: 'compute_protocol_run_1' };
      }
      if (method === 'GET' && url === '/compute/runs/compute_protocol_run_1') {
        assert.equal(headers.authorization, 'Bearer compute_demo_token');
        return {
          executionId: 'exec_protocol_compute',
          attestationRef: 'attest_protocol_compute',
          imageDigest: 'sha256:protocol-compute-image',
          outputArtifactRefs: ['.engi/system-proof-bundle.json', '.engi/proof-witness-manifest.json']
        };
      }
      if (method === 'POST' && url === '/storage/publications') {
        assert.equal(headers.authorization, 'Bearer storage_demo_token');
        return { publicationId: 'storage_publication_1' };
      }
      if (method === 'GET' && url === '/storage/publications/storage_publication_1') {
        assert.equal(headers.authorization, 'Bearer storage_demo_token');
        return {
          publishedArtifactCount: 2,
          publishedScopeIds: ['proof-closure', 'settlement-closure']
        };
      }
      return { status: 404, json: { error: 'not found' } };
    });
    t.after(async () => {
      await executor.close();
    });

    await withEnv({
      ENGI_V24_ENVIRONMENT_MODE: 'staging',
      ENGI_V24_ENABLE_BITCOIN_MAINCHAIN: '1',
      ENGI_V24_BITCOIN_MAINCHAIN_EXECUTOR_URL: `${executor.baseUrl}/bitcoin-rpc`,
      ENGI_V24_BITCOIN_MAINCHAIN_EXECUTOR_KIND: 'bitcoin-json-rpc-v1',
      ENGI_V24_BITCOIN_MAINCHAIN_RPC_USER: 'btc_user',
      ENGI_V24_BITCOIN_MAINCHAIN_RPC_PASSWORD: 'btc_pass',
      ENGI_V24_ENABLE_SIDECHAIN: '1',
      ENGI_V24_SIDECHAIN_EXECUTOR_URL: `${executor.baseUrl}/sidechain-rpc`,
      ENGI_V24_SIDECHAIN_EXECUTOR_KIND: 'sidechain-json-rpc-v1',
      ENGI_V24_SIDECHAIN_RPC_USER: 'side_user',
      ENGI_V24_SIDECHAIN_RPC_PASSWORD: 'side_pass',
      ENGI_V24_ENABLE_COMPUTE: '1',
      ENGI_V24_COMPUTE_EXECUTOR_URL: `${executor.baseUrl}/compute`,
      ENGI_V24_COMPUTE_EXECUTOR_KIND: 'compute-http-v1',
      ENGI_V24_COMPUTE_BEARER_TOKEN: 'compute_demo_token',
      ENGI_V24_ENABLE_STORAGE: '1',
      ENGI_V24_STORAGE_EXECUTOR_URL: `${executor.baseUrl}/storage`,
      ENGI_V24_STORAGE_EXECUTOR_KIND: 'storage-http-v1',
      ENGI_V24_STORAGE_BEARER_TOKEN: 'storage_demo_token',
      ENGI_V24_ENABLE_GITHUB: '1',
      ENGI_V24_GITHUB_EXECUTOR_URL: `${executor.baseUrl}/github`,
      ENGI_V24_GITHUB_EXECUTOR_KIND: 'github-rest-v3',
      ENGI_V24_GITHUB_BEARER_TOKEN: 'gh_demo_token'
    }, async () => {
      const response = await invoke(app, {
        method: 'POST',
        url: '/api/make-engi-branch',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentMode: 'checkpointed-sidechain-bridge',
          principal: 'reviewer'
        })
      });

      assert.equal(response.statusCode, 200);
      assert.equal(
        response.json.latestRun.externalRealizationSummary.interfaceSummaries.find((entry) => entry.interfaceId === 'github-live-interface').executorKind,
        'github-rest-v3'
      );
      assert.equal(
        response.json.latestRun.externalRealizationSummary.interfaceSummaries.find((entry) => entry.interfaceId === 'github-live-interface').transportProtocol,
        'github-rest-v3'
      );

      const persisted = readPersistedState(dataPath);
      assert.equal(persisted.latestRun.externalEnvironmentProfile.activeBindings.github.executorKind, 'github-rest-v3');
      assert.equal(persisted.latestRun.externalEnvironmentProfile.activeBindings.bitcoinMainchain.executorKind, 'bitcoin-json-rpc-v1');
      assert.equal(persisted.latestRun.externalEnvironmentProfile.activeBindings.sidechain.executorKind, 'sidechain-json-rpc-v1');
      assert.equal(persisted.latestRun.externalEnvironmentProfile.activeBindings.compute.executorKind, 'compute-http-v1');
      assert.equal(persisted.latestRun.externalEnvironmentProfile.activeBindings.storage.executorKind, 'storage-http-v1');
      assert.equal(persisted.latestRun.githubPrUpdateReceipt.prNumber, 731);
      assert.equal(persisted.latestRun.githubBranchPublicationReceipt.mutationState, 'live-github-branch-published');
      assert.equal(persisted.latestRun.bitcoinNetworkExecution.executionState, 'live-network-broadcast-and-observed');
      assert.equal(persisted.latestRun.bitcoinNetworkObservation.confirmationState, 'confirmed');
      assert.equal(persisted.latestRun.sidechainExecutionReceipt.executionState, 'live-sidechain-checkpoint-observed');
      assert.equal(persisted.latestRun.computeContainerExecution.executionState, 'live-container-executed');
      assert.equal(persisted.latestRun.storagePublicationReceipt.publicationState, 'live-storage-published');
      assert.equal(persisted.latestRun.storageRetrievalReceipt.retrievalState, 'live-storage-retrieved');
      assert.equal(
        persisted.latestRun.externalTelemetrySummary.interfaceSummaries.find((entry) => entry.interfaceId === 'github-live-interface').transportProtocol,
        'github-rest-v3'
      );
      assert.equal(
        persisted.latestRun.externalTelemetrySummary.interfaceSummaries.find((entry) => entry.interfaceId === 'bitcoin-mainchain-execution').transportProtocol,
        'json-rpc-v1'
      );
      assert.equal(
        persisted.latestRun.externalTelemetrySummary.interfaceSummaries.find((entry) => entry.interfaceId === 'compute-container-execution').transportProtocol,
        'compute-http-v1'
      );
      assert.equal(
        persisted.latestRun.externalTelemetrySummary.interfaceSummaries.find((entry) => entry.interfaceId === 'storage-container-execution').transportProtocol,
        'storage-http-v1'
      );
      assert.equal(persisted.latestRun.externalRealizationProof.allTheoremsPassed, true);
      assert.equal(persisted.latestRun.containerRealityProof.allTheoremsPassed, true);
      assert.equal(persisted.latestRun.githubLiveInterfaceProof.allTheoremsPassed, true);
      assert.ok(executor.requests.some((entry) => entry.url.startsWith('/github/repos/frontier/demo-auth/actions/runs?')));
      assert.ok(executor.requests.some((entry) => entry.url === '/bitcoin-rpc'));
      assert.ok(executor.requests.some((entry) => entry.url === '/sidechain-rpc'));
      assert.ok(executor.requests.some((entry) => entry.url === '/compute/runs'));
      assert.ok(executor.requests.some((entry) => entry.url === '/storage/publications'));
    });
  });
});

testAny('POST /api/make-engi-branch realizes the V24 GitHub App adapter with installation-token exchange and receipt telemetry', async (t) => {
  await withApp(t, async ({ app, dataPath }) => {
    const { privateKey } = crypto.generateKeyPairSync('rsa', { modulusLength: 2048 });
    const githubAppPrivateKeyPem = privateKey.export({ type: 'pkcs1', format: 'pem' }).toString();
    const executor = await startJsonExecutorServer(async ({ url, method, headers, json }) => {
      if (method === 'POST' && url === '/github-app/app/installations/inst_development_3f95f81d6d/access_tokens') {
        const bearer = String(headers.authorization || '');
        assert.match(bearer, /^Bearer [A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/);
        assert.deepEqual(json.repositories, ['frontier/demo-auth']);
        return {
          token: 'ghs_installation_demo_token',
          token_id: 'token_installation_demo_1',
          permissions: { contents: 'write', pull_requests: 'write', actions: 'read' }
        };
      }
      if (method === 'GET' && url.startsWith('/github-app/repos/frontier/demo-auth/actions/runs?')) {
        assert.equal(headers.authorization, 'Bearer ghs_installation_demo_token');
        return { total_count: 1, workflow_runs: [{ id: 'gha_run_app_demo' }] };
      }
      if (method === 'GET' && url.startsWith('/github-app/repos/frontier/demo-auth/actions/runs/')) {
        assert.equal(headers.authorization, 'Bearer ghs_installation_demo_token');
        return { artifacts: [{ id: 11, name: 'proof-bundle' }] };
      }
      if (method === 'POST' && url === '/github-app/repos/frontier/demo-auth/git/refs') {
        assert.equal(headers.authorization, 'Bearer ghs_installation_demo_token');
        assert.match(String(json.ref || ''), /^refs\/heads\//);
        return {
          ref: json.ref,
          object: { sha: json.sha || 'github-app-demo-sha' }
        };
      }
      if (method === 'POST' && url === '/github-app/repos/frontier/demo-auth/pulls') {
        assert.equal(headers.authorization, 'Bearer ghs_installation_demo_token');
        return { number: 944, state: 'open' };
      }
      return { status: 404, json: { error: 'not found' } };
    });
    t.after(async () => {
      await executor.close();
    });

    await withEnv({
      ENGI_V24_ENVIRONMENT_MODE: 'development',
      ENGI_V24_ENABLE_GITHUB: '1',
      ENGI_V24_GITHUB_EXECUTOR_URL: `${executor.baseUrl}/github-app`,
      ENGI_V24_GITHUB_EXECUTOR_KIND: 'github-app-rest-v3',
      ENGI_V24_GITHUB_APP_PRIVATE_KEY_PEM: githubAppPrivateKeyPem
    }, async () => {
      const response = await invoke(app, {
        method: 'POST',
        url: '/api/make-engi-branch',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentMode: 'audited-base-layer-purchase',
          principal: 'reviewer'
        })
      });

      assert.equal(response.statusCode, 200);
      const githubSummary = response.json.latestRun.externalRealizationSummary.interfaceSummaries.find((entry) => entry.interfaceId === 'github-live-interface');
      assert.equal(githubSummary.executorKind, 'github-app-rest-v3');
      assert.equal(githubSummary.transportProtocol, 'github-app-rest-v3');
      assert.equal(githubSummary.runtimeState, 'live-observed');

      const persisted = readPersistedState(dataPath);
      const persistedGithubSummary = persisted.latestRun.externalTelemetrySummary.interfaceSummaries.find((entry) => entry.interfaceId === 'github-live-interface');
      assert.equal(persisted.latestRun.externalEnvironmentProfile.activeBindings.github.authMode, 'github-app-installation-token');
      assert.equal(persisted.latestRun.externalEnvironmentProfile.activeBindings.github.executorKind, 'github-app-rest-v3');
      assert.equal(persistedGithubSummary.authMode, 'github-app-installation-token');
      assert.equal(persistedGithubSummary.remoteAuthExchangeCount, 1);
      assert.equal(persistedGithubSummary.transportProtocol, 'github-app-rest-v3');
      assert.equal(persisted.latestRun.githubLiveSession.authSessionKind, 'github-app-installation-token');
      assert.equal(persisted.latestRun.githubLiveSession.installationId, 'inst_development_3f95f81d6d');
      assert.match(String(persisted.latestRun.githubLiveSession.authExchangeRef || ''), /^github-app-installation-token:\/\//);
      assert.equal(persisted.latestRun.githubBranchPublicationReceipt.mutationState, 'live-github-branch-published');
      assert.equal(persisted.latestRun.githubPrUpdateReceipt.prNumber, 944);
      assert.ok(executor.requests.some((entry) => entry.url === '/github-app/app/installations/inst_development_3f95f81d6d/access_tokens'));
      assert.ok(executor.requests.some((entry) => entry.url === '/github-app/repos/frontier/demo-auth/pulls'));
    });
  });
});

testAny('POST /api/make-engi-branch realizes live-configured V24 GitHub and storage executors before persisting state', async (t) => {
  await withApp(t, async ({ app, dataPath }) => {
    const executor = await startJsonExecutorServer(async ({ url, json }) => {
      if (url === '/github') {
        return {
          interfaceId: 'github-live-interface',
          telemetry: {
            runtimeState: 'live-observed',
            resultClass: 'live-executed',
            reconciliationState: 'live-remote-reconciled',
            telemetryCoverageState: 'shape-complete-live-observed',
            requestId: 'req_live_github',
            executionId: 'exec_live_github',
            observationId: 'obs_live_github',
            executionClass: 'github-app-execution',
            affectedArtifactRefs: [
              '.engi/github-live-session.json',
              '.engi/github-inventory-fetch-receipt.json',
              '.engi/github-artifact-fetch-receipt.json',
              '.engi/github-branch-publication-receipt.json',
              '.engi/github-pr-update-receipt.json'
            ]
          },
          artifacts: {
            githubLiveSession: {
              ...json.artifacts.githubLiveSession,
              authSessionId: 'auth_live_github_session',
              authPayloadHash: 'sha256:live-github-auth',
              observationId: 'obs_live_github'
            },
            githubInventoryFetchReceipt: {
              ...json.artifacts.githubInventoryFetchReceipt,
              fetchState: 'live-github-inventory-fetched'
            },
            githubArtifactFetchReceipt: {
              ...json.artifacts.githubArtifactFetchReceipt,
              fetchState: 'live-github-artifacts-fetched'
            },
            githubBranchPublicationReceipt: {
              ...json.artifacts.githubBranchPublicationReceipt,
              mutationState: 'live-github-branch-published'
            },
            githubPrUpdateReceipt: {
              ...json.artifacts.githubPrUpdateReceipt,
              mutationState: 'live-github-pr-updated',
              prNumber: 417,
              reviewUpdateState: 'draft-opened'
            }
          }
        };
      }
      if (url === '/storage') {
        const publishedArtifactCount = Number(json.artifacts.storagePublicationReceipt.publishedArtifactCount || 0);
        return {
          interfaceId: 'storage-container-execution',
          telemetry: {
            runtimeState: 'live-observed',
            resultClass: 'live-executed',
            reconciliationState: 'live-storage-reconciled',
            telemetryCoverageState: 'shape-complete-live-observed',
            requestId: 'req_live_storage',
            executionId: 'exec_live_storage',
            observationId: 'obs_live_storage',
            executionClass: 'durable-storage-execution',
            affectedArtifactRefs: [
              '.engi/storage-publication-receipt.json',
              '.engi/storage-retrieval-receipt.json'
            ]
          },
          artifacts: {
            storagePublicationReceipt: {
              ...json.artifacts.storagePublicationReceipt,
              publicationState: 'live-storage-publication-observed',
              publishedArtifactCount
            },
            storageRetrievalReceipt: {
              ...json.artifacts.storageRetrievalReceipt,
              retrievalState: 'live-storage-retrieval-observed',
              retrievableArtifactCount: publishedArtifactCount
            }
          }
        };
      }
      return { status: 404, json: { error: 'not found' } };
    });
    t.after(async () => {
      await executor.close();
    });

    await withEnv({
      ENGI_V24_ENVIRONMENT_MODE: 'staging',
      ENGI_V24_ENABLE_GITHUB: '1',
      ENGI_V24_GITHUB_EXECUTOR_URL: `${executor.baseUrl}/github`,
      ENGI_V24_ENABLE_STORAGE: '1',
      ENGI_V24_STORAGE_EXECUTOR_URL: `${executor.baseUrl}/storage`
    }, async () => {
      const response = await invoke(app, {
        method: 'POST',
        url: '/api/make-engi-branch',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentMode: 'audited-base-layer-purchase',
          principal: 'reviewer'
        })
      });

      assert.equal(response.statusCode, 200);
      assert.equal(executor.requests.length, 2);
      assert.deepEqual(
        executor.requests.map((entry) => entry.json.interfaceId).sort(),
        ['github-live-interface', 'storage-container-execution']
      );
      assert.equal(
        response.json.latestRun.externalRealizationSummary.interfaceSummaries.find((entry) => entry.interfaceId === 'github-live-interface').runtimeState,
        'live-observed'
      );
      assert.equal(
        response.json.latestRun.externalRealizationSummary.interfaceSummaries.find((entry) => entry.interfaceId === 'storage-container-execution').runtimeState,
        'live-observed'
      );

      const persisted = readPersistedState(dataPath);
      assert.equal(persisted.latestRun.githubInventoryFetchReceipt.fetchState, 'live-github-inventory-fetched');
      assert.equal(persisted.latestRun.githubBranchPublicationReceipt.mutationState, 'live-github-branch-published');
      assert.equal(persisted.latestRun.githubPrUpdateReceipt.prNumber, 417);
      assert.equal(persisted.latestRun.storagePublicationReceipt.publicationState, 'live-storage-publication-observed');
      assert.equal(persisted.latestRun.storageRetrievalReceipt.retrievalState, 'live-storage-retrieval-observed');
      assert.equal(
        persisted.latestRun.externalTelemetrySummary.interfaceSummaries.find((entry) => entry.interfaceId === 'github-live-interface').runtimeState,
        'live-observed'
      );
      assert.equal(
        persisted.latestRun.externalTelemetrySummary.interfaceSummaries.find((entry) => entry.interfaceId === 'storage-container-execution').reconciliationState,
        'live-storage-reconciled'
      );
      assert.equal(persisted.latestRun.githubLiveInterfaceProof.allTheoremsPassed, true);
      assert.equal(persisted.latestRun.containerRealityProof.allTheoremsPassed, true);
      assert.equal(
        JSON.parse(persisted.latestRun.branchArtifacts.files['.engi/github-pr-update-receipt.json']).prNumber,
        417
      );
      assert.equal(
        JSON.parse(persisted.latestRun.branchArtifacts.files['.engi/storage-publication-receipt.json']).publicationState,
        'live-storage-publication-observed'
      );
      assert.equal(
        JSON.parse(persisted.latestRun.branchArtifacts.files['.engi/external-telemetry-summary.json']).interfaceSummaries
          .find((entry) => entry.interfaceId === 'github-live-interface').runtimeState,
        'live-observed'
      );
    });
  });
});

testAny('POST /api/make-engi-branch realizes live-configured V24 bitcoin, sidechain, and compute executors before persisting state', async (t) => {
  await withApp(t, async ({ app, dataPath }) => {
    const executor = await startJsonExecutorServer(async ({ url, json }) => {
      if (url === '/bitcoin') {
        return {
          interfaceId: 'bitcoin-mainchain-execution',
          telemetry: {
            runtimeState: 'live-observed',
            resultClass: 'live-executed',
            reconciliationState: 'live-mainchain-reconciled',
            telemetryCoverageState: 'shape-complete-live-observed',
            requestId: 'req_live_bitcoin',
            executionId: 'exec_live_bitcoin',
            observationId: 'obs_live_bitcoin',
            executionClass: 'pre-production-network-execution',
            affectedArtifactRefs: [
              '.engi/bitcoin-network-execution.json',
              '.engi/bitcoin-network-observation.json'
            ]
          },
          artifacts: {
            bitcoinNetworkExecution: {
              ...json.artifacts.bitcoinNetworkExecution,
              executionState: 'live-network-broadcast-and-observed',
              executionId: 'exec_live_bitcoin',
              observationId: 'obs_live_bitcoin',
              networkRef: 'tx:testnet4:engi:001',
              anchorRef: 'anchor:testnet4:engi:001'
            },
            bitcoinNetworkObservation: {
              ...json.artifacts.bitcoinNetworkObservation,
              observationState: 'live-network-observed',
              observationId: 'obs_live_bitcoin',
              executionId: 'exec_live_bitcoin',
              networkState: 'confirmed-on-testnet',
              confirmationState: 'confirmed',
              confirmations: 2,
              networkRef: 'tx:testnet4:engi:001',
              anchorRef: 'anchor:testnet4:engi:001',
              journalBindingState: 'network-observed-before-final-journal-close',
              serviceReceipt: {
                source: 'local-loopback-bitcoin-executor',
                supportIntentRef: json.supportArtifacts.bitcoinSettlementIntent.intentId
              }
            }
          }
        };
      }
      if (url === '/sidechain') {
        return {
          interfaceId: 'sidechain-execution',
          telemetry: {
            runtimeState: 'live-observed',
            resultClass: 'live-executed',
            reconciliationState: 'live-sidechain-reconciled',
            telemetryCoverageState: 'shape-complete-live-observed',
            requestId: 'req_live_sidechain',
            executionId: 'exec_live_sidechain',
            observationId: 'obs_live_sidechain',
            executionClass: 'pre-production-sidechain-execution',
            affectedArtifactRefs: [
              '.engi/sidechain-execution-receipt.json'
            ]
          },
          artifacts: {
            sidechainExecutionReceipt: {
              ...json.artifacts.sidechainExecutionReceipt,
              executionState: 'live-sidechain-checkpoint-observed',
              executionId: 'exec_live_sidechain',
              requestId: 'req_live_sidechain',
              observationId: 'obs_live_sidechain',
              checkpointRef: 'sidechain-checkpoint:testnet:engi:001'
            }
          }
        };
      }
      if (url === '/compute') {
        return {
          interfaceId: 'compute-container-execution',
          telemetry: {
            runtimeState: 'live-observed',
            resultClass: 'live-executed',
            reconciliationState: 'live-container-reconciled',
            telemetryCoverageState: 'shape-complete-live-observed',
            requestId: 'req_live_compute',
            executionId: 'exec_live_compute',
            observationId: 'obs_live_compute',
            executionClass: 'containerized-execution',
            affectedArtifactRefs: [
              '.engi/compute-container-execution.json'
            ]
          },
          artifacts: {
            computeContainerExecution: {
              ...json.artifacts.computeContainerExecution,
              executionState: 'live-container-executed',
              executionId: 'exec_live_compute',
              observationId: 'obs_live_compute',
              attestationRef: 'attest_live_compute',
              imageDigest: 'sha256:live-compute-image',
              outputArtifactRefs: json.artifacts.computeContainerExecution.outputArtifactRefs
            }
          }
        };
      }
      return { status: 404, json: { error: 'not found' } };
    });
    t.after(async () => {
      await executor.close();
    });

    await withEnv({
      ENGI_V24_ENVIRONMENT_MODE: 'staging',
      ENGI_V24_ENABLE_BITCOIN_MAINCHAIN: '1',
      ENGI_V24_BITCOIN_MAINCHAIN_EXECUTOR_URL: `${executor.baseUrl}/bitcoin`,
      ENGI_V24_ENABLE_SIDECHAIN: '1',
      ENGI_V24_SIDECHAIN_EXECUTOR_URL: `${executor.baseUrl}/sidechain`,
      ENGI_V24_ENABLE_COMPUTE: '1',
      ENGI_V24_COMPUTE_EXECUTOR_URL: `${executor.baseUrl}/compute`
    }, async () => {
      const response = await invoke(app, {
        method: 'POST',
        url: '/api/make-engi-branch',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentMode: 'checkpointed-sidechain-bridge',
          principal: 'buyer'
        })
      });

      assert.equal(response.statusCode, 200);
      assert.deepEqual(
        executor.requests.map((entry) => entry.url).sort(),
        ['/bitcoin', '/compute', '/sidechain']
      );
      assert.ok(executor.requests.find((entry) => entry.url === '/bitcoin').json.supportArtifacts.bitcoinSettlementIntent.intentId);
      assert.ok(executor.requests.find((entry) => entry.url === '/compute').json.supportArtifacts.computeContainerManifest.manifestId);
      assert.ok(executor.requests.find((entry) => entry.url === '/sidechain').json.supportArtifacts.bitcoinSettlementObservation.observationId);

      const persisted = readPersistedState(dataPath);
      assert.equal(persisted.latestRun.bitcoinNetworkExecution.executionState, 'live-network-broadcast-and-observed');
      assert.equal(persisted.latestRun.bitcoinNetworkObservation.confirmationState, 'confirmed');
      assert.equal(persisted.latestRun.bitcoinNetworkObservation.confirmations, 2);
      assert.equal(persisted.latestRun.sidechainExecutionReceipt.executionState, 'live-sidechain-checkpoint-observed');
      assert.equal(persisted.latestRun.computeContainerExecution.executionState, 'live-container-executed');
      assert.equal(
        persisted.latestRun.externalEnvironmentProfile.interfaceRuntimeStateById['bitcoin-mainchain-execution'].runtimeState,
        'live-observed'
      );
      assert.equal(
        persisted.latestRun.externalEnvironmentProfile.interfaceRuntimeStateById['sidechain-execution'].runtimeState,
        'live-observed'
      );
      assert.equal(
        persisted.latestRun.externalEnvironmentProfile.interfaceRuntimeStateById['compute-container-execution'].runtimeState,
        'live-observed'
      );
      assert.equal(
        persisted.latestRun.externalTelemetrySummary.interfaceSummaries.find((entry) => entry.interfaceId === 'bitcoin-mainchain-execution').reconciliationState,
        'live-mainchain-reconciled'
      );
      assert.equal(persisted.latestRun.externalRealizationProof.allTheoremsPassed, true);
      assert.equal(persisted.latestRun.containerRealityProof.allTheoremsPassed, true);
      assert.equal(
        JSON.parse(persisted.latestRun.branchArtifacts.files['.engi/external-environment-profile.json']).interfaceRuntimeStateById['compute-container-execution'].runtimeState,
        'live-observed'
      );
    });
  });
});

testAny('POST /api/make-engi-branch realizes the V24 repeated-read remote adapter before persisting state', async (t) => {
  await withApp(t, async ({ app, dataPath }) => {
    const executor = await startJsonExecutorServer(async ({ url, method, headers, json }) => {
      if (url === '/lightning/v1/invoices' && method === 'POST') {
        assert.equal(headers.authorization, 'Bearer repeated-read-secret');
        return {
          invoiceId: 'inv_live_read_001',
          invoice: 'lnbcrt1engi-live-read-001',
          paymentHash: 'hash_live_read_001',
          descriptionHash: String(json.descriptionHash || 'desc_live_read_001')
        };
      }
      if (url === '/lightning/v1/invoices/inv_live_read_001' && method === 'GET') {
        assert.equal(headers.authorization, 'Bearer repeated-read-secret');
        return {
          paymentStatus: 'accepted',
          confirmationState: 'accepted-offchain',
          confirmations: 0,
          networkState: 'accepted-offchain',
          observedValue: String(json?.amountNgiMicroUnits || '0'),
          journalBindingState: 'anchor-required',
          referenceId: 'lightning://lightning-testnet/inv_live_read_001'
        };
      }
      return { status: 404, json: { error: 'not found' } };
    });
    t.after(async () => {
      await executor.close();
    });

    await withEnv({
      ENGI_V24_ENVIRONMENT_MODE: 'staging',
      ENGI_V24_ENABLE_REPEATED_READ_PAYMENT: '1',
      ENGI_V24_REPEATED_READ_EXECUTOR_URL: `${executor.baseUrl}/lightning`,
      ENGI_V24_REPEATED_READ_EXECUTOR_KIND: 'lightning-http-v1',
      ENGI_V24_REPEATED_READ_BEARER_TOKEN: 'repeated-read-secret'
    }, async () => {
      const response = await invoke(app, {
        method: 'POST',
        url: '/api/make-engi-branch',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentMode: 'repeated-read-payment',
          principal: 'buyer'
        })
      });

      assert.equal(response.statusCode, 200);
      assert.deepEqual(
        executor.requests.map((entry) => `${entry.method} ${entry.url}`),
        ['POST /lightning/v1/invoices', 'GET /lightning/v1/invoices/inv_live_read_001']
      );
      assert.equal(executor.requests[0].json.bundleId, response.json.latestRun.settlementPreview.bundleId);

      const persisted = readPersistedState(dataPath);
      assert.equal(persisted.latestRun.repeatedReadPaymentExecution.executionState, 'live-lightning-invoice-issued');
      assert.equal(persisted.latestRun.repeatedReadPaymentExecution.remoteInvoiceId, 'inv_live_read_001');
      assert.equal(persisted.latestRun.repeatedReadPaymentObservation.observationState, 'live-lightning-payment-observed');
      assert.equal(persisted.latestRun.repeatedReadPaymentObservation.serviceReceipt.referenceId, 'lightning://lightning-testnet/inv_live_read_001');
      assert.equal(
        persisted.latestRun.externalEnvironmentProfile.interfaceRuntimeStateById['repeated-read-payment-execution'].runtimeState,
        'live-observed'
      );
      assert.equal(
        persisted.latestRun.externalTelemetrySummary.interfaceSummaries.find((entry) => entry.interfaceId === 'repeated-read-payment-execution').transportProtocol,
        'lightning-http-v1'
      );
      assert.equal(persisted.latestRun.externalRealizationProof.allTheoremsPassed, true);
    });
  });
});

testAny('POST /api/make-engi-branch fails closed when a live-configured V24 executor errors', async (t) => {
  await withApp(t, async ({ app, dataPath }) => {
    const executor = await startJsonExecutorServer(async ({ url }) => {
      if (url === '/github') {
        throw new Error('simulated github executor failure');
      }
      return { status: 404, json: { error: 'not found' } };
    });
    t.after(async () => {
      await executor.close();
    });

    await withEnv({
      ENGI_V24_ENVIRONMENT_MODE: 'staging',
      ENGI_V24_ENABLE_GITHUB: '1',
      ENGI_V24_GITHUB_EXECUTOR_URL: `${executor.baseUrl}/github`
    }, async () => {
      const response = await invoke(app, {
        method: 'POST',
        url: '/api/make-engi-branch',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentMode: 'audited-base-layer-purchase',
          principal: 'reviewer'
        })
      });

      assert.equal(response.statusCode, 500);
      assert.match(response.json.error, /V24 external executor github-live-interface failed/i);
      const persisted = readPersistedState(dataPath);
      assert.equal(persisted.latestRun, null);
      assert.deepEqual(persisted.runHistory, []);
    });
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
    assert.equal(internal.json.latestRun.projectionPrincipal, 'internal');
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

testAny('POST /api/make-engi-branch rejects unsupported principal, branch mode, payment mode, and scenario as client errors', async (t) => {
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

    const badPaymentMode = await invoke(app, {
      method: 'POST',
      url: '/api/make-engi-branch',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentMode: 'lightning-mainline' })
    });
    assert.equal(badPaymentMode.statusCode, 400);
    assert.match(badPaymentMode.json.error, /Unsupported payment mode/i);

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

testAny('POST /api/make-engi-branch classifies no-survivor branch creation as a workflow conflict', async (t) => {
  await withApp(t, async ({ app }) => {
    const state = app.readState();
    app.writeState({ ...state, assets: [] });

    const response = await invoke(app, {
      method: 'POST',
      url: '/api/make-engi-branch',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scenarioId: 'auth-issuer-rollback' })
    });

    assert.equal(response.statusCode, 409);
    assert.match(response.json.error, /No candidates survived into the asset pack/i);

    const projectedState = await invoke(app, { method: 'GET', url: '/api/state' });
    assert.equal(projectedState.statusCode, 200);
    assert.equal(projectedState.json.latestRun, null);
    assert.equal(projectedState.json.runHistory.length, 0);
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
