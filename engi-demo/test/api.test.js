import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { EventEmitter } from 'node:events';
import { createAppContext } from '../server.js';

function createMockReq({ method = 'GET', url = '/', headers = {}, body } = {}) {
  const req = new EventEmitter();
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

function createMockRes() {
  const chunks = [];
  let resolved;
  const done = new Promise((resolve) => {
    resolved = resolve;
  });

  return {
    statusCode: 200,
    headers: {},
    writeHead(status, headers = {}) {
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

async function invoke(app, request) {
  const req = createMockReq(request);
  const res = createMockRes();
  await app.handle(req, res);
  const response = await res.done;
  const contentType = String(response.headers['Content-Type'] || response.headers['content-type'] || '');
  const json = contentType.includes('application/json') && response.text ? JSON.parse(response.text) : null;
  return { ...response, json };
}

async function withApp(t, fn) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'engi-demo-test-'));
  const dataPath = path.join(tempDir, 'state.json');
  const app = createAppContext({ dataPath, publicDir: path.join(process.cwd(), 'public') });
  app.ensureState();
  t.after(() => fs.rmSync(tempDir, { recursive: true, force: true }));
  return fn({ app, dataPath });
}

function readPersistedState(dataPath) {
  return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
}

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

test('GET /api/state returns seeded Spec V7 public state', async (t) => {
  await withApp(t, async ({ app }) => {
    const response = await invoke(app, { method: 'GET', url: '/api/state' });
    assert.equal(response.statusCode, 200);
    assert.equal(response.json.assets.length, 3);
    assert.equal(response.json.needScenarios.length, 1);
    assert.equal(response.json.needScenarios[0].scenarioId, 'auth-issuer-rollback');
    assert.equal(response.json.needScenarios[0].parserKind, 'github-actions.auth-remediation.v2');
    assert.equal(response.json.conformanceProfiles.active, 'Profile A — local deterministic prototype');
    assert.equal(response.json.latestRun, null);
  });
});

test('GET / returns the app shell', async (t) => {
  await withApp(t, async ({ app }) => {
    const response = await invoke(app, { method: 'GET', url: '/' });
    assert.equal(response.statusCode, 200);
    assert.match(response.text, /Make ENGI branch from GitHub benchmark evidence/);
    assert.match(response.text, /Spec V7/);
  });
});

test('GET /api/state exposes V7 profile labels and task seed before any run', async (t) => {
  await withApp(t, async ({ app }) => {
    const response = await invoke(app, { method: 'GET', url: '/api/state' });
    assert.equal(response.statusCode, 200);
    assert.equal(response.json.needScenarios[0].taskSeed, 'Recover a production auth migration with issuer mismatch while preserving session validity and rollback safety.');
    assert.equal(response.json.needScenarios[0].profileAStatus, 'Profile A — local deterministic prototype');
    assert.equal(response.json.needScenarios[0].profileBStatus, 'Profile B — production-boundary intent');
  });
});

test('GET /styles.css serves static css', async (t) => {
  await withApp(t, async ({ app }) => {
    const response = await invoke(app, { method: 'GET', url: '/styles.css' });
    assert.equal(response.statusCode, 200);
    assert.match(String(response.headers['Content-Type']), /text\/css/);
    assert.match(response.text, /--accent/);
  });
});

test('POST /api/deposits validates required fields', async (t) => {
  await withApp(t, async ({ app }) => {
    const response = await invoke(app, {
      method: 'POST',
      url: '/api/deposits',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: '', author: '', content: '' })
    });
    assert.equal(response.statusCode, 400);
    assert.match(response.json.error, /Title is required/);
  });
});

test('POST /api/deposits adds a candidate asset and ledger account', async (t) => {
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

    const state = await invoke(app, { method: 'GET', url: '/api/state' });
    assert.equal(state.json.assets.length, 4);
    assert.equal(state.json.assets[0].title, 'Operator playbook');
    assert.equal(state.json.ledger.accounts[`supplier:${response.json.asset.assetId}:pending_claims`], '0');
  });
});

test('POST /api/deposits can create a revoked issuer candidate without crashing public state', async (t) => {
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
    assert.equal(state.json.assets.length, 4);
  });
});

test('POST /api/make-engi-branch runs the V7 gold path', async (t) => {
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
    assert.equal(response.json.latestRun.conformanceProfile, 'Profile A — local deterministic prototype');
    assert.ok(response.json.latestRun.need.needId);
    assert.equal(response.json.latestRun.need.benchmarkParserContract.parserFailureContract.failClosed, true);
    assert.equal(response.json.latestRun.need.fieldDerivations.task.source, 'seed.expectedTask');
    assert.ok(response.json.latestRun.assetPack.assetPackId);
    assert.ok(response.json.latestRun.branchArtifacts.files['.engi/need.json']);
    assert.ok(response.json.latestRun.branchArtifacts.files['.engi/policy-release.json']);
    assert.ok(response.json.latestRun.branchArtifacts.files['.engi/authorization-decisions.json']);
    assert.ok(response.json.latestRun.branchArtifacts.files['.engi/sensitive-data-flow.json']);
    assert.ok(response.json.latestRun.branchArtifacts.files['.engi/unit-catalog.json']);
    assert.ok(response.json.latestRun.branchArtifacts.files['.engi/pipeline-telemetry.json']);
    assert.equal(response.json.latestRun.journalDiff.invariants.debitsEqualCredits, true);
    assert.equal(response.json.latestRun.journalDiff.totals.difference, '0');
    assert.ok(response.json.latestRun.evaluatedCandidates.some((candidate) => candidate.useTier === 'settlement-eligible'));
    assert.ok(response.json.latestRun.evaluatedCandidates.every((candidate) => candidate.recall.recallProvenance.length >= 1));
  });
});

test('POST /api/make-engi-branch supports context branch mode', async (t) => {
  await withApp(t, async ({ app }) => {
    const response = await invoke(app, {
      method: 'POST',
      url: '/api/make-engi-branch',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ branchMode: 'context' })
    });

    assert.equal(response.statusCode, 200);
    assert.equal(response.json.latestRun.branchMode, 'context');
    assert.equal(response.json.latestRun.assetPack.branchMode, 'context');
    assert.ok(response.json.latestRun.verificationReport.assetVerification.some((entry) => entry.rights.branchMode === 'context'));
  });
});

test('POST /api/reset restores seeded state and clears latest run', async (t) => {
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

test('malformed JSON body returns 400 instead of 500', async (t) => {
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

test('static path traversal is blocked', async (t) => {
  await withApp(t, async ({ app }) => {
    const response = await invoke(app, { method: 'GET', url: '/../server.js' });
    assert.equal(response.statusCode, 404);
    assert.match(response.text, /Not found/);
  });
});

test('unknown api route returns JSON 404', async (t) => {
  await withApp(t, async ({ app }) => {
    const response = await invoke(app, { method: 'GET', url: '/api/nope' });
    assert.equal(response.statusCode, 404);
    assert.equal(response.json.error, 'Not found.');
  });
});

test('unsupported non-GET route returns JSON 404', async (t) => {
  await withApp(t, async ({ app }) => {
    const response = await invoke(app, { method: 'DELETE', url: '/api/state' });
    assert.equal(response.statusCode, 404);
    assert.equal(response.json.error, 'Not found.');
  });
});

test('failed deposit write does not corrupt persisted demo state', async (t) => {
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

test('failed make-engi-branch write does not persist settlement state', async (t) => {
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

test('bootstrap repairs incomplete on-disk state', async (t) => {
  await withApp(t, async ({ dataPath }) => {
    fs.writeFileSync(dataPath, JSON.stringify({ assets: [] }, null, 2));
    const repaired = createAppContext({ dataPath, publicDir: path.join(process.cwd(), 'public') });
    const result = repaired.ensureState();
    assert.equal(result.bootstrapped, true);
    const state = repaired.readState();
    assert.equal(state.assets.length, 3);
    assert.equal(state.buyers.length, 1);
  });
});
