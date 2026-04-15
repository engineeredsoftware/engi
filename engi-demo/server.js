// @ts-check

/**
 * @typedef {import('node:http').IncomingMessage} IncomingMessage
 * @typedef {import('node:http').ServerResponse<IncomingMessage>} ServerResponse
 * @typedef {import('node:http').Server} HttpServer
 * @typedef {import('node:net').AddressInfo} AddressInfo
 *
 * @typedef {Error & { statusCode?: number | undefined }} StatusError
 *
 * @typedef {{
 *   authSessionId: string,
 *   repo?: string | undefined,
 *   operatorLogin?: string | undefined,
 *   installationAccountLogin?: string | undefined,
 *   defaultRef?: string | undefined,
 *   defaultSignerAddress?: string | undefined,
 *   signingAlgorithm?: string | undefined,
 *   keySource?: string | undefined,
 *   installationId?: string | number | undefined
 * }} SessionShape
 *
 * @typedef {{
 *   inventoryEntryId: string,
 *   title: string | null,
 *   repo: string | null,
  *   content: string,
 *   originKind: string | null,
  *   sourcePath?: string | null | undefined,
 *   artifactName?: string | null | undefined,
  *   workflowRunId?: string | null | undefined,
  *   sourceCommit?: string | null | undefined,
  *   ref?: string | null | undefined,
  *   artifactKind?: string | null | undefined,
  *   artifactType?: string | null | undefined,
 *   tags?: string[] | null | undefined,
 *   sourcePaths?: string[] | null | undefined,
 *   declaredStacks?: string[] | null | undefined,
 *   declaredConstraints?: string[] | null | undefined,
  *   previewSurface?: string | null | undefined,
  *   workflowPath?: string | null | undefined,
  *   workflowJobName?: string | null | undefined,
 *   signerAddress?: string | null | undefined,
 *   summary?: string | null | undefined,
 *   owner?: string | null | undefined,
 *   repoName?: string | null | undefined,
 *   repositoryId?: string | number | null | undefined,
 *   repositoryNodeId?: string | null | undefined,
 *   authSessionId?: string | null | undefined,
 *   installationId?: string | number | null | undefined,
 *   installationAccountLogin?: string | null | undefined,
 *   installationAccountId?: string | number | null | undefined,
 *   installationAccountNodeId?: string | null | undefined,
 *   contentRoot?: string | null | undefined
 * }} RepoArtifactInventoryEntryShape
 *
 * @typedef {{
 *   assets: unknown[],
 *   buyers: unknown[],
 *   githubAppSessions: SessionShape[],
 *   repoArtifactInventory: RepoArtifactInventoryEntryShape[],
 *   ledger: { accounts: Record<string, string> },
 *   latestRun?: unknown,
 *   runHistory?: unknown[],
 *   specVersion?: string,
 *   needScenarios?: unknown[],
 *   policyState?: unknown,
 *   conformanceProfiles?: unknown
 * }} AppState
 *
 * @typedef {{
 *   inventoryEntryIds?: string[] | undefined,
 *   selectedInventoryEntryIds?: string[] | undefined,
 *   authSessionId?: string | undefined,
 *   content?: string | undefined,
 *   operatorNote?: string | undefined,
 *   title?: string | undefined,
 *   author?: string | undefined,
 *   visualPreview?: string | undefined,
 *   artifactKind?: string | undefined,
 *   artifactType?: string | undefined,
 *   organization?: string | undefined,
 *   sourceProvider?: string | undefined,
 *   sourceRepo?: string | undefined,
 *   sourceCommit?: string | undefined,
 *   sourceRef?: string | undefined,
 *   workflowRunId?: string | undefined,
 *   workflowPath?: string | undefined,
 *   workflowJobName?: string | undefined,
 *   signerAddress?: string | undefined,
 *   signingAlgorithm?: string | undefined,
 *   keySource?: string | undefined,
 *   installationId?: string | number | undefined,
 *   tags?: string[] | undefined,
 *   sourcePaths?: string[] | undefined,
 *   declaredStacks?: string[] | undefined,
 *   declaredConstraints?: string[] | undefined,
 *   testsPassed?: boolean | undefined,
 *   typecheckPassed?: boolean | undefined,
 *   staticAnalysisPassed?: boolean | undefined,
 *   benchmarkRan?: boolean | undefined,
 *   issuerPolicyStatus?: string | undefined,
 *   buyerId?: string | undefined,
 *   scenarioId?: string | undefined,
 *   branchMode?: string | undefined,
 *   paymentMode?: string | undefined,
 *   principal?: string | undefined
 * }} RequestBodyShape
 */

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
import { buildBitcoinDemonstrationServiceDescriptor } from './src/canonical/v23-bitcoin-demonstration-service.js';
import {
  buildV24ExternalRealizationDescriptor,
  resolveV24ActiveExternalRuntime
} from './src/canonical/v24-external-realization.js';
import { realizeV24LiveExternalExecution } from './src/canonical/v24-live-execution.js';
import {
  buildV24LocalExecutorHandlers,
  executeV24LocalExecutor,
  getV24LocalExecutorInterfaceIdFromPath
} from './src/canonical/v24-local-executors.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_DATA_PATH = path.join(__dirname, 'data', 'state.json');
const DEFAULT_PUBLIC_DIR = path.join(__dirname, 'public');
const DEFAULT_PORT = Number(process.env['PORT'] || 4318);
const ALLOWED_PROJECTION_PRINCIPALS = new Set(['public', 'buyer', 'reviewer', 'internal']);
const ALLOWED_BRANCH_MODES = new Set(['patch', 'context']);
const ALLOWED_PAYMENT_MODES = new Set([
  'audited-base-layer-purchase',
  'repeated-read-payment',
  'checkpointed-sidechain-bridge'
]);

/**
 * @param {string} targetPath
 * @param {unknown} value
 * @returns {void}
 */
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
  dataPath = process.env['ENGI_DEMO_DATA_PATH'] || DEFAULT_DATA_PATH,
  publicDir = process.env['ENGI_DEMO_PUBLIC_DIR'] || DEFAULT_PUBLIC_DIR
} = {}) {
  const v24LocalExecutorHandlers = buildV24LocalExecutorHandlers();

  /**
   * @param {string} message
   * @returns {StatusError}
   */
  function badRequest(message) {
    /** @type {StatusError} */
    const error = new Error(message);
    error.statusCode = 400;
    return error;
  }

  /**
   * @param {readonly unknown[]} [values=[]]
   * @returns {string[]}
   */
  function uniqueStrings(values = []) {
    return [...new Set((values || []).map((value) => String(value || '').trim()).filter(Boolean))];
  }

  /**
   * @param {unknown} principal
   * @returns {string | undefined}
   */
  function normalizePrincipal(principal) {
    const normalized = String(principal || '').trim().toLowerCase();
    if (!normalized) return undefined;
    if (!ALLOWED_PROJECTION_PRINCIPALS.has(normalized)) {
      throw badRequest(`Unsupported projection principal: ${principal}`);
    }
    return normalized;
  }

  /**
   * @param {unknown} branchMode
   * @returns {string | undefined}
   */
  function normalizeBranchMode(branchMode) {
    const normalized = String(branchMode || '').trim().toLowerCase();
    if (!normalized) return undefined;
    if (!ALLOWED_BRANCH_MODES.has(normalized)) {
      throw badRequest(`Unsupported branch mode: ${branchMode}`);
    }
    return normalized;
  }

  /**
   * @param {unknown} paymentMode
   * @returns {string | undefined}
   */
  function normalizePaymentMode(paymentMode) {
    const normalized = String(paymentMode || '').trim().toLowerCase();
    if (!normalized) return undefined;
    if (!ALLOWED_PAYMENT_MODES.has(normalized)) {
      throw badRequest(`Unsupported payment mode: ${paymentMode}`);
    }
    return normalized;
  }

  /**
   * @returns {{ bootstrapped: boolean, reason?: string, assetCount?: number, buyerCount?: number }}
   */
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

  /**
   * @returns {AppState}
   */
  function readState() {
    ensureState();
    return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  }

  /**
   * @param {AppState} state
   * @returns {{ ok: true }}
   */
  function writeState(state) {
    writeJsonAtomically(dataPath, state);
    return { ok: true };
  }

  /**
   * @param {ServerResponse} res
   * @param {number} status
   * @param {unknown} payload
   * @returns {void}
   */
  function sendJson(res, status, payload) {
    res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(payload, null, 2));
  }

  /**
   * @param {IncomingMessage} req
   * @returns {Promise<RequestBodyShape>}
   */
  function readBody(req) {
    return new Promise((resolve, reject) => {
      let data = '';
      req.on('data', (chunk) => {
        data += chunk;
        if (data.length > 1_000_000) {
          /** @type {StatusError} */
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
          /** @type {StatusError} */
          const error = new Error('Invalid JSON body.');
          error.statusCode = 400;
          reject(error);
        }
      });
      req.on('error', reject);
    });
  }

  /**
   * @param {IncomingMessage} req
   * @param {ServerResponse} res
   * @returns {void}
   */
  function serveStatic(req, res) {
    const pathname = req.url === '/' ? '/index.html' : (req.url || '/index.html');
    const safePath = path.normalize(path.join(publicDir, pathname));
    if (!safePath.startsWith(publicDir) || !fs.existsSync(safePath) || fs.statSync(safePath).isDirectory()) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    const ext = path.extname(safePath);
    const contentType = ext === '.html'
      ? 'text/html'
      : ext === '.css'
        ? 'text/css'
        : ext === '.svg'
          ? 'image/svg+xml'
          : 'application/javascript';
    const shouldAppendCharset = contentType.startsWith('text/') || contentType === 'application/javascript';
    res.writeHead(200, { 'Content-Type': shouldAppendCharset ? `${contentType}; charset=utf-8` : contentType });
    res.end(fs.readFileSync(safePath));
  }

  /**
   * @param {AppState} state
   * @param {RequestBodyShape} body
   * @returns {Record<string, unknown>}
   */
  function buildDepositInput(state, body) {
    const inventoryEntryIds = uniqueStrings(body.inventoryEntryIds || body.selectedInventoryEntryIds || []);
    /** @type {RepoArtifactInventoryEntryShape[]} */
    const selectedInventoryEntries = inventoryEntryIds
      .map((entryId) => state.repoArtifactInventory.find((entry) => entry.inventoryEntryId === entryId))
      .filter((entry) => !!entry);
    if (inventoryEntryIds.length && selectedInventoryEntries.length !== inventoryEntryIds.length) {
      /** @type {StatusError} */
      const error = new Error('One or more selected repo artifacts could not be resolved.');
      error.statusCode = 400;
      throw error;
    }

    const authSessionId = String(body.authSessionId || '').trim();
    const authSession = authSessionId
      ? state.githubAppSessions.find((session) => session.authSessionId === authSessionId)
      : null;
    if (inventoryEntryIds.length && !authSession) {
      /** @type {StatusError} */
      const error = new Error('Authenticated repo session is required for repo artifact selection.');
      error.statusCode = 400;
      throw error;
    }

    const selectedRepos = uniqueStrings(selectedInventoryEntries.map((entry) => entry.repo));
    if (selectedRepos.length > 1) {
      /** @type {StatusError} */
      const error = new Error('The initial V11 intake flow only supports selecting repo artifacts from one repository at a time.');
      error.statusCode = 400;
      throw error;
    }
    if (authSession && selectedRepos.length === 1 && authSession.repo !== selectedRepos[0]) {
      /** @type {StatusError} */
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
      /** @type {StatusError} */
      const error = new Error('Raw content or repo artifact selection is required.');
      error.statusCode = 400;
      throw error;
    }

    const inferredKinds = uniqueStrings(selectedInventoryEntries.map((entry) => entry.artifactKind));
    const inferredTypes = uniqueStrings(selectedInventoryEntries.map((entry) => entry.artifactType));
    const sourceRepo = String(body.sourceRepo || '').trim() || authSession?.repo || selectedInventoryEntries[0]?.repo || 'frontier/demo-auth';
    const title = String(body.title || '').trim()
      || (selectedInventoryEntries.length === 1
        ? (selectedInventoryEntries[0]?.title || '')
        : selectedInventoryEntries.length
          ? `Repo artifact bundle · ${sourceRepo}`
          : '');
    if (!title) {
      /** @type {StatusError} */
      const error = new Error('Title is required.');
      error.statusCode = 400;
      throw error;
    }
    const author = String(body.author || '').trim()
      || authSession?.operatorLogin
      || authSession?.installationAccountLogin
      || '';
    if (!author) {
      /** @type {StatusError} */
      const error = new Error('Author is required.');
      error.statusCode = 400;
      throw error;
    }

    const visualPreview = String(body.visualPreview || '').trim()
      || selectedInventoryEntries.map((entry) => entry.previewSurface).filter(Boolean).join('\n');

    return {
      title,
      author,
      organization: body.organization || '$BTD',
      artifactKind: String(body.artifactKind || '').trim() || (inferredKinds.length === 1 ? inferredKinds[0] : inferredKinds.length ? 'mixed' : 'mixed'),
      artifactType: String(body.artifactType || '').trim() || (inferredTypes.length === 1 ? inferredTypes[0] : undefined),
      visualPreview,
      operatorNote,
      sourceProvider: body.sourceProvider || 'github',
      sourceRepo,
      sourceCommit: String(body.sourceCommit || '').trim() || selectedInventoryEntries.find((entry) => entry.sourceCommit)?.sourceCommit || undefined,
      sourceRef: String(body.sourceRef || '').trim() || authSession?.defaultRef || selectedInventoryEntries.find((entry) => entry.ref)?.ref || undefined,
      workflowRunId: String(body.workflowRunId || '').trim() || selectedInventoryEntries.find((entry) => entry.workflowRunId)?.workflowRunId || undefined,
      workflowPath: String(body.workflowPath || '').trim() || selectedInventoryEntries.find((entry) => entry.workflowPath)?.workflowPath || undefined,
      workflowJobName: String(body.workflowJobName || '').trim() || selectedInventoryEntries.find((entry) => entry.workflowJobName)?.workflowJobName || undefined,
      signerAddress: String(body.signerAddress || '').trim() || authSession?.defaultSignerAddress || selectedInventoryEntries.find((entry) => entry.signerAddress)?.signerAddress || undefined,
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

  /**
   * @param {IncomingMessage} req
   * @param {ServerResponse} res
   * @returns {Promise<void>}
   */
  async function handle(req, res) {
    try {
      if (req.method === 'GET' && req.url?.startsWith('/api/state')) {
        const url = new URL(req.url, 'http://127.0.0.1');
        const principal = normalizePrincipal(url.searchParams.get('principal') || undefined);
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
        const principal = normalizePrincipal(body.principal || undefined);
        const branchMode = normalizeBranchMode(body.branchMode);
        const paymentMode = normalizePaymentMode(body.paymentMode);
        const scenarioId = String(body.scenarioId || '').trim() || undefined;
        const buyerId = String(body.buyerId || '').trim() || undefined;
        if (buyerId && !state.buyers.some((buyer) => String(/** @type {any} */ (buyer)?.buyerId || '') === buyerId)) {
          throw badRequest('Buyer not found.');
        }
        if (scenarioId && !state.needScenarios?.some((scenario) => String(/** @type {any} */ (scenario)?.scenarioId || '') === scenarioId)) {
          throw badRequest('Need scenario not found.');
        }
        const branchRequest = {
          buyerId,
          scenarioId,
          branchMode,
          paymentMode
        };
        const { nextState, latestRun } = runMakeEngiBranch(state, branchRequest);
        const stateRecord = /** @type {any} */ (state);
        const realizedLatestRun = await realizeV24LiveExternalExecution(latestRun, {
          executorHandlers: v24LocalExecutorHandlers,
          priorLatestRun: stateRecord.latestRun || null,
          priorExternalExecutionLedger: stateRecord.externalExecutionLedger || null
        });
        const realizedRunRecord = /** @type {any} */ (realizedLatestRun);
        const priorReconciliationLog = Array.isArray(stateRecord.externalReconciliationLog) ? stateRecord.externalReconciliationLog : [];
        const persistedState = {
          ...nextState,
          latestRun: realizedLatestRun,
          externalExecutionLedger: realizedRunRecord.externalExecutionLedger || stateRecord.externalExecutionLedger || null,
          externalReconciliationLog: realizedRunRecord.externalReconciliationLog
            ? [...priorReconciliationLog.slice(-31), realizedRunRecord.externalReconciliationLog]
            : priorReconciliationLog
        };
        writeState(persistedState);
        const projectedState = buildPublicState(persistedState, principal);
        return sendJson(res, 200, {
          ok: true,
          specVersion: SPEC_VERSION,
          latestRun: projectedState['latestRun'],
          ledger: persistedState.ledger,
          runHistory: persistedState.runHistory
        });
      }

      if (req.method === 'POST' && req.url === '/api/reset') {
        const state = buildInitialState();
        writeState(state);
        return sendJson(res, 200, { ok: true, state: buildPublicState(state) });
      }

      if (req.method === 'GET' && req.url === '/api/bitcoin-demonstration-service') {
        return sendJson(res, 200, {
          ok: true,
          specVersion: SPEC_VERSION,
          service: buildBitcoinDemonstrationServiceDescriptor()
        });
      }

      if (req.method === 'GET' && req.url === '/api/v24/external-realization') {
        const state = readState();
        const externalRealization = buildV24ExternalRealizationDescriptor({
          githubAppSessions: state.githubAppSessions
        });
        return sendJson(res, 200, {
          ok: true,
          specVersion: SPEC_VERSION,
          externalRealization,
          activeRuntime: resolveV24ActiveExternalRuntime(externalRealization)
        });
      }

      if (req.method === 'POST' && req.url?.startsWith('/api/v24/executors/')) {
        const url = new URL(req.url, 'http://127.0.0.1');
        const interfaceId = getV24LocalExecutorInterfaceIdFromPath(url.pathname);
        if (!interfaceId || typeof v24LocalExecutorHandlers[interfaceId] !== 'function') {
          return sendJson(res, 404, { error: 'Unknown V24 executor interface.' });
        }
        const body = await readBody(req);
        const execution = await executeV24LocalExecutor(interfaceId, body);
        return sendJson(res, 200, {
          ok: true,
          interfaceId,
          ...execution
        });
      }

      if (req.method === 'GET' && req.url?.startsWith('/api/')) {
        return sendJson(res, 404, { error: 'Not found.' });
      }

      if (req.method === 'GET') {
        return serveStatic(req, res);
      }

      return sendJson(res, 404, { error: 'Not found.' });
    } catch (error) {
      const resolvedError = /** @type {StatusError} */ (error instanceof Error ? error : new Error('Unknown error.'));
      if (!resolvedError.statusCode && /No candidates survived into the asset pack/i.test(resolvedError.message || '')) {
        resolvedError.statusCode = 409;
      }
      return sendJson(res, resolvedError.statusCode || 500, { error: resolvedError.message || 'Unknown error.' });
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
    server.listen(port, host, () => {
      const address = server.address();
      const resolvedPort = typeof address === 'object' && address ? /** @type {AddressInfo} */ (address).port : port;
      resolve({ app, server, port: resolvedPort });
    });
  });
}

if (process.argv[1] && import.meta.url === new URL(process.argv[1], 'file://').href) {
  const host = process.env['HOST'] || '127.0.0.1';
  startServer({ port: DEFAULT_PORT, host }).then(({ port }) => {
    console.log(`Bitcode demo listening on http://${host}:${port}`);
  });
}
