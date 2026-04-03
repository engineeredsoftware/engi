import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  makeAssetCommitment,
  buildBundleIssuance,
  utilityReceipt,
  nowIso,
  receiptHash
} from './src/engi-core.js';
import { initialState } from './src/seed.js';
import { RECEIPT_SCHEMAS, schemaForReceipt } from './src/receipt-schemas.js';
import { buildAttestationSnapshot } from './src/attestation-model.js';
import { buildDemoScenario } from './src/demo-scenario.js';
import { buildBenchmarkComparison } from './src/benchmark-model.js';
import { currentPolicyRelease } from './src/policy-release.js';
import { explainRankChunksForQuery } from './src/server-ranking.js';
import { buildProofLog } from './src/proof-log.js';
import { buildConservationCheck } from './src/conservation-check.js';
import { telemetry, telemetryError, telemetrySpan } from './src/telemetry.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_DATA_PATH = path.join(__dirname, 'data', 'state.json');
const DEFAULT_PUBLIC_DIR = path.join(__dirname, 'public');
const DEFAULT_PORT = Number(process.env.PORT || 4318);

function writeJsonAtomically(targetPath, value) {
  const directory = path.dirname(targetPath);
  const tempPath = `${targetPath}.tmp-${process.pid}-${Date.now()}`;
  const payload = JSON.stringify(value, null, 2);

  fs.mkdirSync(directory, { recursive: true });
  try {
    fs.writeFileSync(tempPath, payload);
    fs.renameSync(tempPath, targetPath);
  } catch (error) {
    try {
      if (fs.existsSync(tempPath)) {
        fs.unlinkSync(tempPath);
      }
    } catch {
      // Cleanup is best-effort; surface the original write failure.
    }
    throw error;
  }
}

export function createAppContext({
  dataPath = process.env.ENGI_DEMO_DATA_PATH || DEFAULT_DATA_PATH,
  publicDir = process.env.ENGI_DEMO_PUBLIC_DIR || DEFAULT_PUBLIC_DIR
} = {}) {
  function ensureState() {
    return telemetrySpan('server.ensureState', { dataPath }, () => {
      if (!fs.existsSync(dataPath)) {
        telemetry('server.ensureState.bootstrap', { reason: 'missing-file', dataPath });
        writeJsonAtomically(dataPath, initialState());
        return { bootstrapped: true, reason: 'missing-file' };
      }
      const raw = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
      if (!raw.assets?.length || !raw.licenses?.length) {
        telemetry('server.ensureState.bootstrap', {
          reason: 'incomplete-state',
          assetCount: raw.assets?.length || 0,
          licenseCount: raw.licenses?.length || 0
        });
        writeJsonAtomically(dataPath, initialState());
        return { bootstrapped: true, reason: 'incomplete-state' };
      }
      return { bootstrapped: false, assetCount: raw.assets.length, licenseCount: raw.licenses.length };
    });
  }

  function readState() {
    return telemetrySpan('server.readState', { dataPath }, () => {
      ensureState();
      const state = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
      telemetry('server.readState.snapshot', {
        version: state.version,
        assetCount: state.assets?.length || 0,
        licenseCount: state.licenses?.length || 0,
        receiptCount: state.receipts?.length || 0,
        utilityKeys: Object.keys(state.utilityLedger || {})
      });
      return state;
    });
  }

  function writeState(state) {
    return telemetrySpan('server.writeState', {
      dataPath,
      assetCount: state.assets?.length || 0,
      licenseCount: state.licenses?.length || 0,
      receiptCount: state.receipts?.length || 0,
      utilityKeys: Object.keys(state.utilityLedger || {})
    }, () => {
      writeJsonAtomically(dataPath, state);
      return { ok: true };
    });
  }

  function publicAsset(asset) {
    return {
      assetId: asset.assetId,
      title: asset.title,
      author: asset.author,
      organization: asset.organization,
      tags: asset.tags,
      createdAt: asset.createdAt,
      sourceType: asset.sourceType,
      preview: asset.preview,
      assetRoot: asset.assetRoot,
      verification: asset.verification,
      measurement: asset.measurement,
      metadata: asset.metadata,
      chunkCount: asset.privateBlob?.chunks?.length || 0
    };
  }

  function enrichReceipt(receipt) {
    return {
      ...receipt,
      schema: schemaForReceipt(receipt.type)
    };
  }

  function publicState(state) {
    return {
      updatedAt: nowIso(),
      assets: state.assets.map(publicAsset),
      licenses: state.licenses,
      balances: state.balances,
      receipts: state.receipts.map(enrichReceipt),
      utilityLedger: state.utilityLedger,
      receiptSchemas: RECEIPT_SCHEMAS,
      attestation: buildAttestationSnapshot(),
      demoScenario: buildDemoScenario(state),
      policyRelease: currentPolicyRelease(),
      proofLog: buildProofLog(state)
    };
  }

  function sendJson(res, status, payload) {
    res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(payload, null, 2));
  }

  function readBody(req) {
    return new Promise((resolve, reject) => {
      let data = '';
      req.on('data', (chunk) => {
        data += chunk;
        if (data.length > 1_000_000) {
          const error = new Error('Body too large.');
          error.statusCode = 413;
          reject(error);
          req.destroy();
        }
      });
      req.on('end', () => {
        try {
          resolve(data ? JSON.parse(data) : {});
        } catch {
          const error = new Error('Invalid JSON body.');
          error.statusCode = 400;
          reject(error);
        }
      });
      req.on('error', reject);
    });
  }

  function serveStatic(req, res) {
    const pathname = req.url === '/' ? '/index.html' : req.url;
    const safePath = path.normalize(path.join(publicDir, pathname));
    if (!safePath.startsWith(publicDir) || !fs.existsSync(safePath) || fs.statSync(safePath).isDirectory()) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    const ext = path.extname(safePath);
    const contentType = ext === '.html' ? 'text/html' : ext === '.css' ? 'text/css' : 'application/javascript';
    res.writeHead(200, { 'Content-Type': `${contentType}; charset=utf-8` });
    res.end(fs.readFileSync(safePath));
  }

  async function handle(req, res) {
    const requestStart = Date.now();
    telemetry('server.handle.request', { method: req.method, url: req.url });
    try {
      if (req.method === 'GET' && req.url === '/api/state') {
        const response = publicState(readState());
        telemetry('server.handle.response', { method: req.method, url: req.url, status: 200, durationMs: Date.now() - requestStart });
        return sendJson(res, 200, response);
      }

      if (req.method === 'POST' && req.url === '/api/deposits') {
        const body = await readBody(req);
        telemetry('server.api.deposits.body', {
          title: body.title,
          author: body.author,
          tags: body.tags,
          contentLength: String(body.content || '').length,
          compileOk: body.compileOk,
          testsOk: body.testsOk,
          proofOk: body.proofOk
        });
        if (!String(body.title || '').trim()) return sendJson(res, 400, { error: 'Title is required.' });
        if (!String(body.author || '').trim()) return sendJson(res, 400, { error: 'Author is required.' });
        if (!String(body.content || '').trim()) return sendJson(res, 400, { error: 'Content is required.' });

        const state = readState();
        const asset = makeAssetCommitment({
          title: body.title,
          author: body.author,
          organization: body.organization || 'ENGI',
          tags: body.tags || [],
          sourceType: body.sourceType || 'note',
          compileOk: !!body.compileOk,
          testsOk: !!body.testsOk,
          proofOk: !!body.proofOk,
          noveltyBp: body.noveltyBp,
          demandBp: body.demandBp,
          antiNoiseBp: body.antiNoiseBp,
          reproducibilityBp: body.reproducibilityBp,
          trustBp: body.trustBp,
          content: body.content,
          citations: body.citations || []
        });
        state.assets.unshift(asset);
        if (state.balances[asset.author] == null) state.balances[asset.author] = 0;
        const receipt = {
          type: 'deposit',
          receiptId: `dep_${asset.assetId}`,
          assetId: asset.assetId,
          title: asset.title,
          author: asset.author,
          assetRoot: asset.assetRoot,
          issuedAt: nowIso()
        };
        receipt.receiptHash = receiptHash(receipt);
        state.receipts.unshift(receipt);
        writeState(state);
        telemetry('server.api.deposits.result', {
          assetId: asset.assetId,
          receiptId: receipt.receiptId,
          assetCount: state.assets.length,
          receiptCount: state.receipts.length,
          durationMs: Date.now() - requestStart
        });
        return sendJson(res, 200, { ok: true, asset: publicAsset(asset), receipt });
      }

      if (req.method === 'POST' && req.url === '/api/license-query') {
        const body = await readBody(req);
        telemetry('server.api.licenseQuery.body', { orgId: body.orgId, query: body.query });
        if (!String(body.orgId || '').trim()) return sendJson(res, 400, { error: 'orgId is required.' });
        if (!String(body.query || '').trim()) return sendJson(res, 400, { error: 'query is required.' });

        const state = readState();
        const license = state.licenses.find((item) => item.orgId === body.orgId);
        if (!license) return sendJson(res, 404, { error: 'License not found.' });

        const { rankedChunks, explanations } = explainRankChunksForQuery(body.query, state.assets);
        const result = buildBundleIssuance({
          orgId: license.orgId,
          orgName: license.orgName,
          query: body.query,
          license,
          rankedChunks
        });

        license.unitsRemaining -= result.publicReceipt.meteredUnits;
        state.receipts.unshift(result.allocationReceipt);
        state.receipts.unshift(result.publicReceipt);
        for (const allocation of result.allocations) {
          state.balances[allocation.author] = (state.balances[allocation.author] || 0) + allocation.units;
        }
        const conservation = buildConservationCheck(
          result.privateBundle.bundleId,
          result.publicReceipt.meteredUnits,
          result.allocationReceipt.allocations
        );
        writeState(state);
        telemetry('server.api.licenseQuery.result', {
          bundleId: result.privateBundle.bundleId,
          publicReceiptId: result.publicReceipt.receiptId,
          allocationReceiptId: result.allocationReceipt.receiptId,
          rankedChunkCount: result.privateBundle.chunks.length,
          balanceAuthors: Object.keys(state.balances),
          durationMs: Date.now() - requestStart
        });
        return sendJson(res, 200, {
          ok: true,
          publicReceipt: result.publicReceipt,
          allocationReceipt: result.allocationReceipt,
          privateBundle: result.privateBundle,
          ranking: explanations,
          conservation,
          balances: state.balances,
          license
        });
      }

      if (req.method === 'POST' && req.url === '/api/utility') {
        const body = await readBody(req);
        telemetry('server.api.utility.body', {
          bundleId: body.bundleId,
          benchmark: body.benchmark,
          baselineBp: body.baselineBp,
          treatmentBp: body.treatmentBp
        });
        if (!String(body.bundleId || '').trim()) return sendJson(res, 400, { error: 'bundleId is required.' });
        if (!String(body.benchmark || '').trim()) return sendJson(res, 400, { error: 'benchmark is required.' });

        const state = readState();
        const benchmarkComparison = buildBenchmarkComparison({
          bundleId: body.bundleId,
          benchmark: body.benchmark,
          baselineBp: body.baselineBp,
          treatmentBp: body.treatmentBp
        });
        const receipt = utilityReceipt({
          bundleId: body.bundleId,
          benchmark: body.benchmark,
          baselineBp: body.baselineBp,
          treatmentBp: body.treatmentBp
        });
        state.receipts.unshift(receipt);
        state.utilityLedger[body.bundleId] = {
          benchmark: body.benchmark,
          upliftBp: receipt.upliftBp,
          comparison: benchmarkComparison,
          updatedAt: nowIso()
        };
        writeState(state);
        telemetry('server.api.utility.result', {
          receiptId: receipt.receiptId,
          upliftBp: receipt.upliftBp,
          utilityLedgerKeys: Object.keys(state.utilityLedger),
          durationMs: Date.now() - requestStart
        });
        return sendJson(res, 200, { ok: true, receipt, utilityLedger: state.utilityLedger, comparison: benchmarkComparison });
      }

      if (req.method === 'POST' && req.url === '/api/reset') {
        const state = initialState();
        writeState(state);
        telemetry('server.api.reset.result', {
          assetCount: state.assets.length,
          licenseCount: state.licenses.length,
          durationMs: Date.now() - requestStart
        });
        return sendJson(res, 200, { ok: true, state: publicState(state) });
      }

      if (req.method === 'GET' && req.url?.startsWith('/api/')) {
        telemetry('server.handle.response', { method: req.method, url: req.url, status: 404, durationMs: Date.now() - requestStart });
        return sendJson(res, 404, { error: 'Not found.' });
      }

      if (req.method === 'GET') {
        telemetry('server.handle.static', { method: req.method, url: req.url, durationMs: Date.now() - requestStart });
        return serveStatic(req, res);
      }

      telemetry('server.handle.response', { method: req.method, url: req.url, status: 404, durationMs: Date.now() - requestStart });
      return sendJson(res, 404, { error: 'Not found.' });
    } catch (error) {
      telemetryError('server.handle.error', error, { method: req.method, url: req.url, durationMs: Date.now() - requestStart });
      return sendJson(res, error.statusCode || 500, { error: error.message || 'Unknown error.' });
    }
  }

  return {
    dataPath,
    publicDir,
    ensureState,
    readState,
    writeState,
    publicState,
    handle
  };
}

export function createServer(options = {}) {
  const app = createAppContext(options);
  const server = http.createServer((req, res) => app.handle(req, res));
  return { app, server };
}

export function startServer({ port = DEFAULT_PORT, host = '127.0.0.1', ...options } = {}) {
  const { app, server } = createServer(options);
  app.ensureState();
  return new Promise((resolve) => {
    server.listen(port, host, () => resolve({ app, server, port: server.address().port }));
  });
}

if (import.meta.url === new URL(process.argv[1], 'file://').href) {
  const host = process.env.HOST || '127.0.0.1';
  startServer({ port: DEFAULT_PORT, host }).then(({ port }) => {
    console.log(`ENGI demo listening on http://${host}:${port}`);
  });
}
