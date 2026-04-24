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
 *   needReviewAction?: string | undefined,
 *   needReviewFeedback?: string[] | string | undefined,
 *   needReviewActorId?: string | undefined,
 *   needReviewDecisionMode?: string | undefined,
 *   reviewAction?: string | undefined,
 *   reviewFeedback?: string[] | string | undefined,
 *   actorId?: string | undefined,
 *   decisionMode?: string | undefined,
 *   principal?: string | undefined
 * }} RequestBodyShape
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  buildInitialState,
  makeCandidateAsset,
  measureNeedFromScenario,
  publicState as buildPublicState,
  reviewNeedForFitSearch,
  runMakeBitcodeBranch,
  SPEC_VERSION
} from './src/bitcode-runtime.js';
import { CURRENT_CANON_POSTURE } from './src/canon-posture.js';
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
export const DEFAULT_BITCODE_DATA_PATH = DEFAULT_DATA_PATH;
export const DEFAULT_BITCODE_PUBLIC_DIR = DEFAULT_PUBLIC_DIR;
const ALLOWED_PROJECTION_PRINCIPALS = new Set(['public', 'buyer', 'reviewer', 'internal']);
const SOURCE_TO_SHARES_FIT_QUALITY_OC_ID = 'bitcode.source-to-shares.quantized-fit-quality-oc.v26';
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

/**
 * @param {AppState} state
 * @returns {{ nextState: AppState, changed: boolean }}
 */
function normalizeStateForCurrentCanon(state) {
  const nextState = {
    ...state,
    specVersion: SPEC_VERSION,
    canonPosture: CURRENT_CANON_POSTURE
  };
  const changed = state.specVersion !== SPEC_VERSION
    || JSON.stringify(state.canonPosture || null) !== JSON.stringify(CURRENT_CANON_POSTURE);
  return { nextState, changed };
}

export function createAppContext({
  dataPath = process.env['BITCODE_DATA_PATH'] || DEFAULT_DATA_PATH,
  publicDir = process.env['BITCODE_PUBLIC_DIR'] || DEFAULT_PUBLIC_DIR
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
   * @param {unknown} feedback
   * @returns {string[]}
   */
  function normalizeReviewFeedback(feedback) {
    if (Array.isArray(feedback)) return uniqueStrings(feedback);
    const normalized = String(feedback || '').trim();
    return normalized ? [normalized] : [];
  }

  /**
   * @param {AppState} state
   * @param {unknown} scenarioId
   * @returns {any}
   */
  function resolveNeedReviewScenario(state, scenarioId) {
    const normalizedScenarioId = String(scenarioId || '').trim();
    const scenario = state.needScenarios?.find((entry) => String(/** @type {any} */ (entry)?.scenarioId || '') === normalizedScenarioId)
      || (!normalizedScenarioId ? state.needScenarios?.[0] : null);
    if (!scenario) throw badRequest('Need scenario not found.');
    return scenario;
  }

  /**
   * @param {AppState} state
   * @param {RequestBodyShape} body
   * @returns {Record<string, unknown>}
   */
  function buildNeedReviewPayload(state, body = {}) {
    const scenario = resolveNeedReviewScenario(state, body.scenarioId);
    const measurement = measureNeedFromScenario(scenario);
    const reviewableNeed = measurement.reviewableNeed;
    const fitSearchAdmission = reviewableNeed.fitSearchAdmission;
    return {
      ok: true,
      specVersion: SPEC_VERSION,
      protocolFocus: 'source-to-shares',
      reviewStage: reviewableNeed.reviewStage,
      scenario: {
        scenarioId: scenario.scenarioId,
        scenarioFamily: scenario.scenarioFamily,
        repo: scenario.repo,
        baseRef: scenario.baseRef
      },
      measurement: {
        needId: measurement.needDescriptor.needId,
        task: measurement.needDescriptor.task,
        failureModes: measurement.needDescriptor.failureModes,
        constraints: measurement.needDescriptor.constraints,
        targetArtifactKinds: measurement.needDescriptor.targetArtifactKinds,
        closureCriteria: measurement.needDescriptor.closureCriteria,
        measurementHash: reviewableNeed.measurementRefs?.measurementHash || null,
        reviewableNeedRef: reviewableNeed.reviewableNeedHash || null
      },
      reviewableNeed,
      allowedActions: reviewableNeed.allowedActions,
      fitSearchAdmission,
      needFittingReview: buildNeedFittingReviewPayload({
        scenario,
        measurement,
        reviewableNeed,
        fitSearchAdmission
      }),
      nextProtocolAction: 'POST /api/need-review with action=accept|reject|remeasure-with-feedback'
    };
  }

  /**
   * @param {{
   *   scenario: unknown,
   *   measurement: Record<string, any>,
   *   reviewableNeed: Record<string, any>,
   *   fitSearchAdmission?: Record<string, any> | undefined,
   *   reviewDecision?: Record<string, any> | null | undefined
   * }} input
   * @returns {Record<string, unknown>}
   */
  function buildNeedFittingReviewPayload({
    scenario,
    measurement,
    reviewableNeed,
    fitSearchAdmission = reviewableNeed.fitSearchAdmission,
    reviewDecision = null
  }) {
    const scenarioRecord = /** @type {any} */ (scenario || {});
    const needDescriptor = /** @type {any} */ (measurement.needDescriptor || {});
    const measuredNeedSnapshot = /** @type {any} */ (reviewableNeed.measuredNeedSnapshot || {});
    const blockedStages = fitSearchAdmission?.blockedStages || reviewableNeed.fitSearchAdmission?.blockedStages || [];
    const admittedStages = fitSearchAdmission?.admittedStages || [];
    return {
      artifactKind: 'bitcode-need-fitting-review',
      protocolFocus: 'source-to-shares',
      scenarioId: scenarioRecord.scenarioId || null,
      scenarioFamily: scenarioRecord.scenarioFamily || null,
      needId: reviewableNeed.needId || needDescriptor.needId || null,
      task: measuredNeedSnapshot.task || needDescriptor.task || null,
      reviewStage: reviewableNeed.reviewStage || 'post-measurement-pre-fit',
      status: reviewDecision?.status || reviewableNeed.status || null,
      action: reviewDecision?.action || null,
      requiredAfter: reviewableNeed.requiredAfter || 'need-measurement-synthesized',
      requiredBefore: reviewableNeed.requiredBefore || 'find-fitting-settlement',
      allowedActions: reviewableNeed.allowedActions || [],
      actionContracts: reviewableNeed.actionContracts || {},
      reviewQuestions: reviewableNeed.reviewQuestions || [],
      measurementHash: reviewableNeed.measurementRefs?.measurementHash || null,
      reviewableNeedRef: reviewableNeed.reviewableNeedHash || null,
      fitSearchAdmission: {
        admitted: fitSearchAdmission?.admitted === true,
        admissionReason: fitSearchAdmission?.admissionReason || null,
        untilAction: fitSearchAdmission?.untilAction || (fitSearchAdmission?.admitted ? null : 'accept'),
        admittedStages,
        blockedStages
      },
      settlementReview: {
        reviewStage: 'present-fit-for-settlement-review',
        quantizedObjectiveContractId: SOURCE_TO_SHARES_FIT_QUALITY_OC_ID,
        requiredAfter: 'find-fitting-settlement-admitted',
        receiptCarryThrough: [
          'objectiveContractId',
          'sourceToSharesRef',
          'fitQualityHash',
          'receiptRefs',
          'qualityRows'
        ]
      },
      candidateFitRequirements: {
        requiredStages: [
          'candidate-recall',
          'find-fitting-settlement',
          'asset-pack-assembly',
          'present-fit-for-settlement-review'
        ],
        blockedStages,
        admittedStages,
        blockedUntil: fitSearchAdmission?.admitted === true ? null : 'Need review action=accept'
      },
      measuredNeedSnapshot: {
        failureModes: measuredNeedSnapshot.failureModes || needDescriptor.failureModes || [],
        constraints: measuredNeedSnapshot.constraints || needDescriptor.constraints || [],
        targetArtifactKinds: measuredNeedSnapshot.targetArtifactKinds || needDescriptor.targetArtifactKinds || [],
        closureCriteria: measuredNeedSnapshot.closureCriteria || needDescriptor.closureCriteria || []
      }
    };
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
    const { nextState, changed } = normalizeStateForCurrentCanon(raw);
    if (changed) {
      writeJsonAtomically(dataPath, nextState);
      return {
        bootstrapped: false,
        reason: 'canon-posture-sync',
        assetCount: nextState.assets.length,
        buyerCount: nextState.buyers.length
      };
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
   * @param {string | undefined} principal
   * @returns {AppState}
   */
  function getState(principal) {
    return buildPublicState(readState(), normalizePrincipal(principal));
  }

  /**
   * @param {RequestBodyShape} body
   * @returns {Record<string, unknown>}
   */
  function getNeedReview(body = {}) {
    return buildNeedReviewPayload(readState(), body);
  }

  /**
   * @param {RequestBodyShape} body
   * @returns {Record<string, unknown>}
   */
  function reviewNeed(body = {}) {
    const state = readState();
    const payload = buildNeedReviewPayload(state, body);
    const action = String(body.needReviewAction || body.reviewAction || 'accept').trim() || 'accept';
    const feedback = normalizeReviewFeedback(body.needReviewFeedback || body.reviewFeedback || []);
    const needReview = reviewNeedForFitSearch(/** @type {any} */ (payload.reviewableNeed), {
      action,
      feedback,
      actorId: body.needReviewActorId || body.actorId || 'bitcode-terminal:need-review',
      decisionMode: body.needReviewDecisionMode || body.decisionMode || 'operator-review-api'
    });
    const reviewDecision = /** @type {any} */ (needReview).reviewDecision || {};
    const historyEntry = {
      reviewId: `need_review_${Date.now().toString(36)}`,
      protocolFocus: 'source-to-shares',
      scenario: payload.scenario,
      measurement: payload.measurement,
      action: reviewDecision.action,
      status: needReview.status,
      fitSearchAdmission: needReview.fitSearchAdmission,
      actorId: reviewDecision.actorId,
      decisionMode: reviewDecision.decisionMode,
      feedback,
      needReview,
      createdAt: new Date().toISOString()
    };
    const stateRecord = /** @type {any} */ (state);
    writeState({
      ...state,
      latestNeedReview: historyEntry,
      needReviewHistory: [...(Array.isArray(stateRecord.needReviewHistory) ? stateRecord.needReviewHistory : []), historyEntry].slice(-20)
    });

    return {
      ...payload,
      ok: true,
      needReview,
      reviewDecision,
      fitSearchAdmission: needReview.fitSearchAdmission,
      needFittingReview: buildNeedFittingReviewPayload({
        scenario: payload.scenario,
        measurement: { needDescriptor: payload.measurement },
        reviewableNeed: /** @type {any} */ (payload.reviewableNeed),
        fitSearchAdmission: needReview.fitSearchAdmission,
        reviewDecision
      }),
      stateWrite: {
        latestNeedReviewRef: historyEntry.reviewId,
        fitSearchAdmitted: needReview.fitSearchAdmission?.admitted === true
      },
      nextProtocolAction: needReview.fitSearchAdmission?.admitted
        ? 'POST /api/make-bitcode-branch'
        : action === 'remeasure-with-feedback'
          ? 'GET /api/need-review after revising the Need measurement input'
          : 'Select a different Need or reject this source-to-shares fit search'
    };
  }

  /**
   * @param {RequestBodyShape} body
   * @returns {{ ok: true, asset: unknown }}
   */
  function createDeposit(body) {
    const state = readState();
    const asset = makeCandidateAsset(buildDepositInput(state, body));

    state.assets.unshift(asset);
    state.ledger.accounts[`supplier:${asset.assetId}:pending_claims`] = '0';
    writeState(state);
    return { ok: true, asset };
  }

  /**
   * @param {RequestBodyShape} body
   * @returns {Promise<{ ok: true, specVersion: string, latestRun: unknown, ledger: AppState['ledger'], runHistory: unknown[] | undefined }>}
   */
  async function makeBitcodeBranch(body) {
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
      paymentMode,
      needReviewAction: body.needReviewAction || body.reviewAction,
      needReviewFeedback: body.needReviewFeedback || body.reviewFeedback,
      needReviewActorId: body.needReviewActorId || body.actorId,
      needReviewDecisionMode: body.needReviewDecisionMode || body.decisionMode
    };
    const { nextState, latestRun } = runMakeBitcodeBranch(state, branchRequest);
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
    return {
      ok: true,
      specVersion: SPEC_VERSION,
      latestRun: projectedState['latestRun'],
      ledger: persistedState.ledger,
      runHistory: persistedState.runHistory
    };
  }

  /**
   * @returns {{ ok: true, state: AppState }}
   */
  function resetState() {
    const state = buildInitialState();
    writeState(state);
    return { ok: true, state: buildPublicState(state) };
  }

  /**
   * @param {ServerResponse} res
   * @returns {void}
   */
  function sendDefaultState(res) {
    const state = readState();
    return sendJson(res, 200, { ok: true, state: buildPublicState(state) });
  }

  /**
   * @returns {{ ok: true, specVersion: string, service: unknown }}
   */
  function getBitcoinDemonstrationService() {
    return {
      ok: true,
      specVersion: SPEC_VERSION,
      service: buildBitcoinDemonstrationServiceDescriptor()
    };
  }

  /**
   * @param {{ environmentMode?: string | null | undefined }} [input]
   * @returns {{ ok: true, specVersion: string, externalRealization: unknown, activeRuntime: unknown }}
   */
  function getExternalRealization(input = {}) {
    const state = readState();
    const externalRealization = buildV24ExternalRealizationDescriptor({
      githubAppSessions: state.githubAppSessions
    });
    return {
      ok: true,
      specVersion: SPEC_VERSION,
      externalRealization,
      activeRuntime: resolveV24ActiveExternalRuntime(externalRealization, input)
    };
  }

  /**
   * @param {string} interfaceId
   * @param {RequestBodyShape} body
   * @returns {Promise<{ ok: true, interfaceId: string } & Record<string, unknown>>}
   */
  async function executeLocalExecutorById(interfaceId, body) {
    if (typeof v24LocalExecutorHandlers[interfaceId] !== 'function') {
      /** @type {StatusError} */
      const error = new Error('Unknown V24 executor interface.');
      error.statusCode = 404;
      throw error;
    }
    const execution = await executeV24LocalExecutor(interfaceId, body);
    return {
      ok: true,
      interfaceId,
      ...execution
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
        if (!principal) return sendDefaultState(res);
        return sendJson(res, 200, getState(principal));
      }

      if (req.method === 'POST' && req.url === '/api/deposits') {
        const body = await readBody(req);
        return sendJson(res, 200, createDeposit(body));
      }

      if (req.method === 'POST' && req.url === '/api/make-bitcode-branch') {
        const body = await readBody(req);
        return sendJson(res, 200, await makeBitcodeBranch(body));
      }

      if (req.method === 'GET' && req.url?.startsWith('/api/need-review')) {
        const url = new URL(req.url, 'http://127.0.0.1');
        return sendJson(res, 200, getNeedReview({
          scenarioId: url.searchParams.get('scenarioId') || undefined
        }));
      }

      if (req.method === 'POST' && req.url === '/api/need-review') {
        const body = await readBody(req);
        return sendJson(res, 200, reviewNeed(body));
      }

      if (req.method === 'POST' && req.url === '/api/reset') {
        return sendJson(res, 200, resetState());
      }

      if (req.method === 'GET' && req.url === '/api/bitcoin-demonstration-service') {
        return sendJson(res, 200, getBitcoinDemonstrationService());
      }

      if (req.method === 'GET' && req.url?.startsWith('/api/v24/external-realization')) {
        const url = new URL(req.url, 'http://127.0.0.1');
        return sendJson(
          res,
          200,
          getExternalRealization({
            environmentMode: url.searchParams.get('environmentMode'),
          }),
        );
      }

      if (req.method === 'POST' && req.url?.startsWith('/api/v24/executors/')) {
        const url = new URL(req.url, 'http://127.0.0.1');
        const interfaceId = getV24LocalExecutorInterfaceIdFromPath(url.pathname);
        if (!interfaceId) {
          return sendJson(res, 404, { error: 'Unknown V24 executor interface.' });
        }
        const body = await readBody(req);
        return sendJson(res, 200, await executeLocalExecutorById(interfaceId, body));
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
      if (!resolvedError.statusCode && /fit search cannot proceed/i.test(resolvedError.message || '')) {
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
    getState,
    getNeedReview,
    reviewNeed,
    createDeposit,
    makeBitcodeBranch,
    resetState,
    getBitcoinDemonstrationService,
    getExternalRealization,
    executeLocalExecutorById,
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
