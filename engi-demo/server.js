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
  function uniqueStrings(values = []) {
    return [...new Set((values || []).map((value) => String(value || '').trim()).filter(Boolean))];
  }

  function ensureState() {
    if (!fs.existsSync(dataPath)) {
      writeJsonAtomically(dataPath, buildInitialState());
      return { bootstrapped: true, reason: 'missing-file' };
    }
    const raw = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    if (!Array.isArray(raw.assets) || !Array.isArray(raw.buyers) || !Array.isArray(raw.githubAppSessions) || !Array.isArray(raw.repoArtifactInventory) || !raw.ledger?.accounts) {
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

  function buildDepositInput(state, body) {
    const inventoryEntryIds = uniqueStrings(body.inventoryEntryIds || body.selectedInventoryEntryIds || []);
    const selectedInventoryEntries = inventoryEntryIds.map((entryId) => state.repoArtifactInventory.find((entry) => entry.inventoryEntryId === entryId)).filter(Boolean);
    if (inventoryEntryIds.length && selectedInventoryEntries.length !== inventoryEntryIds.length) {
      const error = new Error('One or more selected repo artifacts could not be resolved.');
      error.statusCode = 400;
      throw error;
    }

    const authSessionId = String(body.authSessionId || '').trim();
    const authSession = authSessionId
      ? state.githubAppSessions.find((session) => session.authSessionId === authSessionId)
      : null;
    if (inventoryEntryIds.length && !authSession) {
      const error = new Error('Authenticated repo session is required for repo artifact selection.');
      error.statusCode = 400;
      throw error;
    }

    const selectedRepos = uniqueStrings(selectedInventoryEntries.map((entry) => entry.repo));
    if (selectedRepos.length > 1) {
      const error = new Error('The initial V11 intake flow only supports selecting repo artifacts from one repository at a time.');
      error.statusCode = 400;
      throw error;
    }
    if (authSession && selectedRepos.length === 1 && authSession.repo !== selectedRepos[0]) {
      const error = new Error('Selected repo artifacts must match the authenticated repo session.');
      error.statusCode = 400;
      throw error;
    }

    const rawContent = String(body.content || '').trim();
    const operatorNote = String(body.operatorNote || '').trim();
    let content = rawContent;
    if (selectedInventoryEntries.length) {
      const sections = selectedInventoryEntries.map((entry) => {
        const addressRef = entry.sourcePath || entry.artifactName || entry.workflowRunId || entry.sourceCommit || 'repo artifact';
        return `[${entry.originKind}] ${entry.title}\nRepo: ${entry.repo}\nAddress: ${addressRef}\n${entry.content}`;
      });
      if (operatorNote) sections.push(`Operator note\n${operatorNote}`);
      else if (rawContent) sections.push(`Raw fallback supplement\n${rawContent}`);
      content = sections.join('\n\n---\n\n');
    }
    if (!String(content || '').trim()) {
      const error = new Error('Raw content or repo artifact selection is required.');
      error.statusCode = 400;
      throw error;
    }

    const inferredKinds = uniqueStrings(selectedInventoryEntries.map((entry) => entry.artifactKind));
    const inferredTypes = uniqueStrings(selectedInventoryEntries.map((entry) => entry.artifactType));
    const sourceRepo = String(body.sourceRepo || '').trim() || authSession?.repo || selectedInventoryEntries[0]?.repo || 'frontier/demo-auth';
    const title = String(body.title || '').trim()
      || (selectedInventoryEntries.length === 1
        ? selectedInventoryEntries[0].title
        : selectedInventoryEntries.length
          ? `Repo artifact bundle · ${sourceRepo}`
          : '');
    if (!title) {
      const error = new Error('Title is required.');
      error.statusCode = 400;
      throw error;
    }
    const author = String(body.author || '').trim()
      || authSession?.operatorLogin
      || authSession?.installationAccountLogin
      || '';
    if (!author) {
      const error = new Error('Author is required.');
      error.statusCode = 400;
      throw error;
    }

    const visualPreview = String(body.visualPreview || '').trim()
      || selectedInventoryEntries.map((entry) => entry.previewSurface).filter(Boolean).join('\n');

    return {
      title,
      author,
      organization: body.organization || '$ENGI',
      artifactKind: String(body.artifactKind || '').trim() || (inferredKinds.length === 1 ? inferredKinds[0] : inferredKinds.length ? 'mixed' : 'mixed'),
      artifactType: String(body.artifactType || '').trim() || (inferredTypes.length === 1 ? inferredTypes[0] : undefined),
      visualPreview,
      operatorNote,
      sourceProvider: body.sourceProvider || 'github',
      sourceRepo,
      sourceCommit: String(body.sourceCommit || '').trim() || selectedInventoryEntries.find((entry) => entry.sourceCommit)?.sourceCommit,
      sourceRef: String(body.sourceRef || '').trim() || authSession?.defaultRef || selectedInventoryEntries.find((entry) => entry.ref)?.ref,
      workflowRunId: String(body.workflowRunId || '').trim() || selectedInventoryEntries.find((entry) => entry.workflowRunId)?.workflowRunId,
      workflowPath: String(body.workflowPath || '').trim() || selectedInventoryEntries.find((entry) => entry.workflowPath)?.workflowPath,
      workflowJobName: String(body.workflowJobName || '').trim() || selectedInventoryEntries.find((entry) => entry.workflowJobName)?.workflowJobName,
      signerAddress: String(body.signerAddress || '').trim() || authSession?.defaultSignerAddress || selectedInventoryEntries.find((entry) => entry.signerAddress)?.signerAddress,
      signingAlgorithm: body.signingAlgorithm || authSession?.signingAlgorithm,
      keySource: body.keySource || authSession?.keySource,
      installationId: body.installationId || authSession?.installationId,
      tags: uniqueStrings([...(body.tags || []), ...selectedInventoryEntries.flatMap((entry) => entry.tags || [])]),
      sourcePaths: uniqueStrings([...(body.sourcePaths || []), ...selectedInventoryEntries.flatMap((entry) => entry.sourcePaths || [])]),
      declaredStacks: uniqueStrings([...(body.declaredStacks || []), ...selectedInventoryEntries.flatMap((entry) => entry.declaredStacks || [])]),
      declaredConstraints: uniqueStrings([...(body.declaredConstraints || []), ...selectedInventoryEntries.flatMap((entry) => entry.declaredConstraints || [])]),
      inventoryEntries: selectedInventoryEntries,
      authSession,
      rawFallbackContent: rawContent,
      contentDerivedFromSelection: selectedInventoryEntries.length > 0,
      content,
      testsPassed: body.testsPassed !== false,
      typecheckPassed: body.typecheckPassed !== false,
      staticAnalysisPassed: body.staticAnalysisPassed !== false,
      benchmarkRan: body.benchmarkRan !== false,
      issuerPolicyStatus: body.issuerPolicyStatus || 'allowed'
    };
  }

  async function handle(req, res) {
    try {
      if (req.method === 'GET' && req.url?.startsWith('/api/state')) {
        const url = new URL(req.url, 'http://127.0.0.1');
        const principal = url.searchParams.get('principal') || undefined;
        return sendJson(res, 200, buildPublicState(readState(), principal));
      }

      if (req.method === 'POST' && req.url === '/api/deposits') {
        const body = await readBody(req);
        const state = readState();
        const asset = makeCandidateAsset(buildDepositInput(state, body));

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
        const principal = body.principal || undefined;
        return sendJson(res, 200, {
          ok: true,
          specVersion: SPEC_VERSION,
          latestRun: buildPublicState({ ...nextState, latestRun }, principal).latestRun,
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

export async function createServer(options = {}) {
  const http = await import('node:http');
  const app = createAppContext(options);
  const server = http.createServer((req, res) => app.handle(req, res));
  return { app, server };
}

export async function startServer({ port = DEFAULT_PORT, host = '127.0.0.1', ...options } = {}) {
  const { app, server } = await createServer(options);
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
