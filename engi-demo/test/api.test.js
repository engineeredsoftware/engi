import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { startServer } from '../server.js';

async function withServer(t, fn) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'engi-demo-test-'));
  const dataPath = path.join(tempDir, 'state.json');
  const { server, port } = await startServer({ port: 0, dataPath });
  const base = `http://127.0.0.1:${port}`;

  t.after(async () => {
    await new Promise((resolve, reject) => server.close((err) => err ? reject(err) : resolve()));
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  return fn({ base, dataPath });
}

async function getJson(url, options) {
  const response = await fetch(url, options);
  const body = await response.json();
  return { response, body };
}

async function postJson(base, route, payload) {
  return getJson(`${base}${route}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
}

async function withCorruptingWriteFailure(dataPath, fn) {
  const originalWriteFileSync = fs.writeFileSync;
  let shouldFail = true;

  fs.writeFileSync = function patchedWriteFileSync(targetPath, data, ...rest) {
    if (shouldFail && (targetPath === dataPath || targetPath.startsWith(`${dataPath}.tmp-`))) {
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

function readPersistedState(dataPath) {
  return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
}

async function expectFailedWriteLeavesStateUntouched({ base, dataPath, action, assertResponse, assertPublicState }) {
  const before = readPersistedState(dataPath);

  await withCorruptingWriteFailure(dataPath, async () => {
    const failed = await action();
    assert.equal(failed.response.status, 500);
    assert.match(failed.body.error, /Simulated disk write failure/);
    if (assertResponse) assertResponse(failed);
  });

  const afterRaw = fs.readFileSync(dataPath, 'utf8');
  assert.doesNotThrow(() => JSON.parse(afterRaw));

  const after = JSON.parse(afterRaw);
  assert.deepEqual(after, before);

  const state = await getJson(`${base}/api/state`);
  assert.equal(state.response.status, 200);
  if (assertPublicState) {
    assertPublicState(state.body, before);
  }
}

test('GET /api/state returns seeded public state', async (t) => {
  await withServer(t, async ({ base }) => {
    const { response, body } = await getJson(`${base}/api/state`);
    assert.equal(response.status, 200);
    assert.equal(body.assets.length, 3);
    assert.equal(body.receipts.length, 0);
    assert.equal(body.demoScenario.query, 'enterprise auth migration rollback for monorepo services with issuer mismatch');
    assert.equal(body.policyRelease.version, 'engi-policy-v0.2');
  });
});

test('GET / returns the app shell', async (t) => {
  await withServer(t, async ({ base }) => {
    const response = await fetch(`${base}/`);
    const html = await response.text();
    assert.equal(response.status, 200);
    assert.match(html, /Public commitments in\. Private licensed bundles out\./);
    assert.match(html, /Mode: heavy/);
  });
});

test('POST /api/deposits validates required fields', async (t) => {
  await withServer(t, async ({ base }) => {
    const { response, body } = await postJson(base, '/api/deposits', { title: '', author: '', content: '' });

    assert.equal(response.status, 400);
    assert.match(body.error, /Title is required/);
  });
});

test('POST /api/deposits adds a public asset and deposit receipt', async (t) => {
  await withServer(t, async ({ base }) => {
    const { response, body } = await postJson(base, '/api/deposits', {
      title: 'Operator playbook',
      author: 'Tester',
      content: 'roll back safely\n\nverify issuer',
      compileOk: true,
      testsOk: true,
      proofOk: false
    });

    assert.equal(response.status, 200);
    assert.equal(body.ok, true);
    assert.equal(body.asset.author, 'Tester');
    assert.equal(body.receipt.type, 'deposit');

    const state = await getJson(`${base}/api/state`);
    assert.equal(state.body.assets.length, 4);
    assert.equal(state.body.receipts.length, 1);
  });
});

test('POST /api/license-query validates inputs and missing license', async (t) => {
  await withServer(t, async ({ base }) => {
    const missingOrg = await postJson(base, '/api/license-query', { query: 'auth rollback' });
    assert.equal(missingOrg.response.status, 400);

    const missingLicense = await postJson(base, '/api/license-query', { orgId: 'missing', query: 'auth rollback' });
    assert.equal(missingLicense.response.status, 404);
  });
});

test('POST /api/license-query rejects unmatched queries', async (t) => {
  await withServer(t, async ({ base }) => {
    const { response, body } = await postJson(base, '/api/license-query', { orgId: 'demo-ai-lab', query: 'zebra quantum banana vacuum' });

    assert.equal(response.status, 500);
    assert.match(body.error, /No matching chunks found/);
  });
});

test('POST /api/license-query runs the gold-path licensed read', async (t) => {
  await withServer(t, async ({ base }) => {
    const { response, body } = await postJson(base, '/api/license-query', {
      orgId: 'demo-ai-lab',
      query: 'enterprise auth migration rollback for monorepo services with issuer mismatch'
    });

    assert.equal(response.status, 200);
    assert.equal(body.ok, true);
    assert.ok(body.privateBundle.bundleId);
    assert.ok(body.ranking.length > 0);
    assert.equal(body.conservation.conserved, true);
    assert.equal(body.publicReceipt.type, 'bundle_issuance');
    assert.equal(body.allocationReceipt.type, 'allocation');
    assert.equal(body.license.unitsRemaining, 800);

    const state = await getJson(`${base}/api/state`);
    assert.equal(state.body.receipts.length, 2);
    assert.deepEqual(state.body.proofLog.map((item) => item.type), ['allocation', 'bundle_issuance']);
  });
});

test('POST /api/utility validates required fields', async (t) => {
  await withServer(t, async ({ base }) => {
    const { response, body } = await postJson(base, '/api/utility', { bundleId: '', benchmark: '' });

    assert.equal(response.status, 400);
    assert.match(body.error, /bundleId is required/);
  });
});

test('POST /api/utility records value proof and utility ledger', async (t) => {
  await withServer(t, async ({ base }) => {
    const read = await postJson(base, '/api/license-query', {
      orgId: 'demo-ai-lab',
      query: 'enterprise auth migration rollback for monorepo services with issuer mismatch'
    });

    const { response, body } = await postJson(base, '/api/utility', {
      bundleId: read.body.privateBundle.bundleId,
      benchmark: 'production-auth-remediation',
      baselineBp: 4200,
      treatmentBp: 6700
    });

    assert.equal(response.status, 200);
    assert.equal(body.comparison.upliftBp, 2500);
    assert.match(body.comparison.businessImpact, /Higher confidence incident recovery/);

    const state = await getJson(`${base}/api/state`);
    assert.equal(state.body.receipts.length, 3);
    assert.equal(state.body.utilityLedger[read.body.privateBundle.bundleId].upliftBp, 2500);
    assert.deepEqual(state.body.proofLog.map((item) => item.type), ['allocation', 'bundle_issuance', 'utility']);
  });
});

test('POST /api/reset restores seeded state and clears receipts', async (t) => {
  await withServer(t, async ({ base, dataPath }) => {
    await postJson(base, '/api/license-query', {
      orgId: 'demo-ai-lab',
      query: 'enterprise auth migration rollback for monorepo services with issuer mismatch'
    });

    const reset = await postJson(base, '/api/reset', {});

    assert.equal(reset.response.status, 200);
    assert.equal(reset.body.state.receipts.length, 0);

    const persisted = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    assert.equal(persisted.receipts.length, 0);
    assert.deepEqual(persisted.utilityLedger, {});
  });
});

test('malformed JSON body returns 400 instead of 500', async (t) => {
  await withServer(t, async ({ base }) => {
    const response = await fetch(`${base}/api/deposits`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{bad json'
    });
    const body = await response.json();

    assert.equal(response.status, 400);
    assert.match(body.error, /Invalid JSON body/);
  });
});

test('static path traversal is blocked', async (t) => {
  await withServer(t, async ({ base }) => {
    const response = await fetch(`${base}/../server.js`);
    const body = await response.text();

    assert.equal(response.status, 404);
    assert.match(body, /Not found/);
  });
});

test('unknown api route returns JSON 404', async (t) => {
  await withServer(t, async ({ base }) => {
    const { response, body } = await getJson(`${base}/api/nope`);
    assert.equal(response.status, 404);
    assert.equal(body.error, 'Not found.');
  });
});

test('exhausted license fails cleanly after repeated reads', async (t) => {
  await withServer(t, async ({ base }) => {
    for (let i = 0; i < 9; i += 1) {
      const read = await postJson(base, '/api/license-query', {
        orgId: 'demo-ai-lab',
        query: 'enterprise auth migration rollback for monorepo services with issuer mismatch'
      });
      assert.equal(read.response.status, 200);
    }

    const finalAttempt = await postJson(base, '/api/license-query', {
      orgId: 'demo-ai-lab',
      query: 'enterprise auth migration rollback for monorepo services with issuer mismatch'
    });

    assert.equal(finalAttempt.response.status, 500);
    assert.match(finalAttempt.body.error, /does not have enough units remaining/);
  });
});

test('repeated utility writes overwrite ledger entry but keep receipt trail', async (t) => {
  await withServer(t, async ({ base }) => {
    const read = await postJson(base, '/api/license-query', {
      orgId: 'demo-ai-lab',
      query: 'enterprise auth migration rollback for monorepo services with issuer mismatch'
    });
    const bundleId = read.body.privateBundle.bundleId;

    const first = await postJson(base, '/api/utility', {
      bundleId,
      benchmark: 'production-auth-remediation',
      baselineBp: 4200,
      treatmentBp: 6700
    });
    assert.equal(first.response.status, 200);

    const second = await postJson(base, '/api/utility', {
      bundleId,
      benchmark: 'production-auth-remediation',
      baselineBp: 5000,
      treatmentBp: 7000
    });
    assert.equal(second.response.status, 200);
    assert.equal(second.body.comparison.upliftBp, 2000);

    const state = await getJson(`${base}/api/state`);
    assert.equal(state.body.utilityLedger[bundleId].upliftBp, 2000);
    assert.equal(state.body.receipts.filter((item) => item.type === 'utility').length, 2);
  });
});

test('failed deposit write does not corrupt persisted demo state', async (t) => {
  await withServer(t, async ({ base, dataPath }) => {
    await expectFailedWriteLeavesStateUntouched({
      base,
      dataPath,
      action: () => postJson(base, '/api/deposits', {
        title: 'Operator playbook',
        author: 'Tester',
        content: 'roll back safely\n\nverify issuer',
        compileOk: true,
        testsOk: true,
        proofOk: false
      }),
      assertPublicState: (publicState, before) => {
        assert.equal(publicState.assets.length, before.assets.length);
        assert.equal(publicState.receipts.length, before.receipts.length);
      }
    });
  });
});

test('failed license write does not burn units or persist receipts', async (t) => {
  await withServer(t, async ({ base, dataPath }) => {
    await expectFailedWriteLeavesStateUntouched({
      base,
      dataPath,
      action: () => postJson(base, '/api/license-query', {
        orgId: 'demo-ai-lab',
        query: 'enterprise auth migration rollback for monorepo services with issuer mismatch'
      }),
      assertPublicState: (publicState, before) => {
        assert.equal(publicState.receipts.length, before.receipts.length);
        assert.deepEqual(publicState.utilityLedger, before.utilityLedger);
        assert.deepEqual(publicState.balances, before.balances);
        assert.equal(
          publicState.licenses.find((item) => item.orgId === 'demo-ai-lab').unitsRemaining,
          before.licenses.find((item) => item.orgId === 'demo-ai-lab').unitsRemaining
        );
      }
    });
  });
});

test('failed utility write does not persist utility ledger or proof receipt', async (t) => {
  await withServer(t, async ({ base, dataPath }) => {
    const read = await postJson(base, '/api/license-query', {
      orgId: 'demo-ai-lab',
      query: 'enterprise auth migration rollback for monorepo services with issuer mismatch'
    });
    assert.equal(read.response.status, 200);

    await expectFailedWriteLeavesStateUntouched({
      base,
      dataPath,
      action: () => postJson(base, '/api/utility', {
        bundleId: read.body.privateBundle.bundleId,
        benchmark: 'production-auth-remediation',
        baselineBp: 4200,
        treatmentBp: 6700
      }),
      assertPublicState: (publicState, before) => {
        assert.equal(publicState.receipts.length, before.receipts.length);
        assert.deepEqual(publicState.utilityLedger, before.utilityLedger);
      }
    });
  });
});
