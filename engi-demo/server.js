import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  buildInitialState,
  makeCandidateAsset,
  publicState as buildPublicState,
  runMakeEngiBranch,
  SPEC_VERSION
} from './src/engi-demo.js';

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
      if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    } catch {
      // Cleanup is best-effort; surface original write error.
    }
    throw error;
  }
}

export function createAppContext({
  dataPath = process.env.ENGI_DEMO_DATA_PATH || DEFAULT_DATA_PATH,
  publicDir = process.env.ENGI_DEMO_PUBLIC_DIR || DEFAULT_PUBLIC_DIR
} = {}) {
  function ensureState() {
    if (!fs.existsSync(dataPath)) {
      writeJsonAtomically(dataPath, buildInitialState());
      return { bootstrapped: true, reason: 'missing-file' };
    }
    const raw = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    if (!Array.isArray(raw.assets) || !Array.isArray(raw.buyers) || !raw.ledger?.accounts) {
      writeJsonAtomically(dataPath, buildInitialState());
      return { bootstrapped: true, reason: 'incomplete-state' };
    }
    return { bootstrapped: false, assetCount: raw.assets.length, buyerCount: raw.buyers.length };
  }

  function readState() {
    ensureState();
    return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  }

  function writeState(state) {
    writeJsonAtomically(dataPath, state);
    return { ok: true };
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
    try {
      if (req.method === 'GET' && req.url === '/api/state') {
        return sendJson(res, 200, buildPublicState(readState()));
      }

      if (req.method === 'POST' && req.url === '/api/deposits') {
        const body = await readBody(req);
        if (!String(body.title || '').trim()) return sendJson(res, 400, { error: 'Title is required.' });
        if (!String(body.author || '').trim()) return sendJson(res, 400, { error: 'Author is required.' });
        if (!String(body.content || '').trim()) return sendJson(res, 400, { error: 'Content is required.' });

        const state = readState();
        const asset = makeCandidateAsset({
          title: body.title,
          author: body.author,
          organization: body.organization || '$ENGI',
          artifactKind: body.artifactKind || 'mixed',
          artifactType: body.artifactType,
          visualPreview: body.visualPreview,
          signerAddress: body.signerAddress,
          sourceRepo: body.sourceRepo,
          sourceCommit: body.sourceCommit,
          workflowRunId: body.workflowRunId,
          tags: body.tags || [],
          sourcePaths: body.sourcePaths || [],
          declaredStacks: body.declaredStacks || [],
          declaredConstraints: body.declaredConstraints || [],
          content: body.content,
          testsPassed: body.testsPassed !== false,
          typecheckPassed: body.typecheckPassed !== false,
          staticAnalysisPassed: body.staticAnalysisPassed !== false,
          benchmarkRan: body.benchmarkRan !== false,
          issuerPolicyStatus: body.issuerPolicyStatus || 'allowed'
        });

        state.assets.unshift(asset);
        state.ledger.accounts[`supplier:${asset.assetId}:pending_claims`] = '0';
        writeState(state);
        return sendJson(res, 200, { ok: true, asset });
      }

      if (req.method === 'POST' && req.url === '/api/make-engi-branch') {
        const body = await readBody(req);
        const state = readState();
        const { nextState, latestRun } = runMakeEngiBranch(state, {
          buyerId: body.buyerId,
          scenarioId: body.scenarioId,
          branchMode: body.branchMode
        });
        writeState(nextState);
        return sendJson(res, 200, {
          ok: true,
          specVersion: SPEC_VERSION,
          latestRun,
          ledger: nextState.ledger,
          runHistory: nextState.runHistory
        });
      }

      if (req.method === 'POST' && req.url === '/api/reset') {
        const state = buildInitialState();
        writeState(state);
        return sendJson(res, 200, { ok: true, state: buildPublicState(state) });
      }

      if (req.method === 'GET' && req.url?.startsWith('/api/')) {
        return sendJson(res, 404, { error: 'Not found.' });
      }

      if (req.method === 'GET') {
        return serveStatic(req, res);
      }

      return sendJson(res, 404, { error: 'Not found.' });
    } catch (error) {
      return sendJson(res, error.statusCode || 500, { error: error.message || 'Unknown error.' });
    }
  }

  return {
    dataPath,
    publicDir,
    ensureState,
    readState,
    writeState,
    publicState: buildPublicState,
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
