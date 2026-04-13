// @ts-check

import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  ACTIVE_CANON_VERSION,
  ACTIVE_PROVEN_APPENDIX_PATH,
  CURRENT_CANON_OPERATOR_LABEL,
  CURRENT_CANON_POSTURE,
  CURRENT_POLICY_REF,
  CURRENT_SPEC_VERSION_LABEL,
  DRAFT_TARGET_VERSION
} from '../canon-posture.js';
import { buildInitialState, publicState } from '../engi-demo.js';
import { buildV21GeneratedArtifactContents } from './v21-specifying.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const DEFAULT_V22_CANON_POSTURE_REPO_ROOT = path.resolve(__dirname, '../../..');
export const V22_CANON_POSTURE_REPORT_ID = 'v22-canon-posture-drift-report';
export const V22_CANON_POSTURE_GENERATOR_ID = 'engi-demo.v22-canon-posture.v1';

/**
 * @param {Array<{ checkId: string, passed: boolean, detail: string }>} checks
 * @param {string} checkId
 * @param {boolean} passed
 * @param {string} detail
 */
function pushCheck(checks, checkId, passed, detail) {
  checks.push({ checkId, passed, detail });
}

/**
 * @param {string} value
 * @returns {string}
 */
function normalizeWhitespace(value) {
  return value.replace(/\s+/g, ' ').trim();
}

/**
 * @param {{
 *   repoRoot?: string,
 *   version?: string,
 *   activeCanonVersion?: string,
 *   draftTargetVersion?: string,
 *   proofSourceCommit?: string,
 *   generatedAt?: string,
 *   generatorId?: string,
 *   worktreeState?: string
 * }} [input={}]
 */
export function buildV22CanonPostureDriftReport({
  repoRoot = DEFAULT_V22_CANON_POSTURE_REPO_ROOT,
  version = 'V22',
  activeCanonVersion = ACTIVE_CANON_VERSION,
  draftTargetVersion = DRAFT_TARGET_VERSION,
  proofSourceCommit = 'unbound-preview',
  generatedAt = new Date().toISOString(),
  generatorId = V22_CANON_POSTURE_GENERATOR_ID,
  worktreeState = 'clean'
} = {}) {
  const resolvedRepoRoot = path.resolve(repoRoot);
  const pointerVersion = readFileSync(path.join(resolvedRepoRoot, 'ENGI_SPEC.txt'), 'utf8').trim();
  const readmePath = path.join(resolvedRepoRoot, 'engi-demo', 'README.md');
  const indexPath = path.join(resolvedRepoRoot, 'engi-demo', 'public', 'index.html');
  const appPath = path.join(resolvedRepoRoot, 'engi-demo', 'public', 'app.js');
  const serverPath = path.join(resolvedRepoRoot, 'engi-demo', 'server.js');
  const readmeContent = readFileSync(readmePath, 'utf8');
  const indexContent = readFileSync(indexPath, 'utf8');
  const appContent = readFileSync(appPath, 'utf8');
  const serverContent = readFileSync(serverPath, 'utf8');

  const initialState = buildInitialState();
  const projectedState = publicState(initialState, 'public');

  /** @type {Array<{ checkId: string, passed: boolean, detail: string }>} */
  const checks = [];

  pushCheck(
    checks,
    'pointer-active-canon-alignment',
    pointerVersion === activeCanonVersion,
    `ENGI_SPEC.txt points to ${pointerVersion || 'none'} while runtime expects ${activeCanonVersion}.`
  );
  pushCheck(
    checks,
    'canon-posture-constant-alignment',
    CURRENT_CANON_POSTURE.activeCanonVersion === activeCanonVersion
      && CURRENT_CANON_POSTURE.draftTargetVersion === draftTargetVersion
      && CURRENT_CANON_POSTURE.operatorLabel === CURRENT_CANON_OPERATOR_LABEL
      && CURRENT_CANON_POSTURE.specVersionLabel === CURRENT_SPEC_VERSION_LABEL,
    `canon-posture constants resolve ${CURRENT_CANON_POSTURE.activeCanonVersion}/${CURRENT_CANON_POSTURE.draftTargetVersion} with operator label ${CURRENT_CANON_OPERATOR_LABEL}.`
  );
  pushCheck(
    checks,
    'proven-appendix-alignment',
    ACTIVE_PROVEN_APPENDIX_PATH === `ENGI_SPEC_${activeCanonVersion}_PROVEN.md`
      && CURRENT_CANON_POSTURE.activeProvenAppendixPath === ACTIVE_PROVEN_APPENDIX_PATH,
    `active generated appendix path is ${ACTIVE_PROVEN_APPENDIX_PATH}.`
  );
  pushCheck(
    checks,
    'policy-ref-alignment',
    CURRENT_POLICY_REF === `policy://engi/spec-${activeCanonVersion.toLowerCase()}-active-${draftTargetVersion.toLowerCase()}-system-draft/current`
      && CURRENT_CANON_POSTURE.policyRef === CURRENT_POLICY_REF,
    `policy reference is ${CURRENT_POLICY_REF}.`
  );
  pushCheck(
    checks,
    'runtime-state-alignment',
    initialState.specVersion === CURRENT_SPEC_VERSION_LABEL
      && initialState.canonPosture?.activeCanonVersion === activeCanonVersion
      && initialState.canonPosture?.draftTargetVersion === draftTargetVersion,
    `buildInitialState() reports ${initialState.specVersion} with canon posture ${initialState.canonPosture?.activeCanonVersion || 'missing'}/${initialState.canonPosture?.draftTargetVersion || 'missing'}.`
  );
  pushCheck(
    checks,
    'public-state-alignment',
    projectedState.specVersion === CURRENT_SPEC_VERSION_LABEL
      && projectedState.canonPosture?.activeCanonVersion === activeCanonVersion
      && projectedState.canonPosture?.draftTargetVersion === draftTargetVersion
      && projectedState.canonPosture?.activeProvenAppendixPath === ACTIVE_PROVEN_APPENDIX_PATH,
    `publicState() reports ${projectedState.specVersion} with canon posture ${projectedState.canonPosture?.activeCanonVersion || 'missing'}/${projectedState.canonPosture?.draftTargetVersion || 'missing'}.`
  );
  pushCheck(
    checks,
    'server-api-alignment',
    serverContent.includes("SPEC_VERSION")
      && serverContent.includes('specVersion: SPEC_VERSION')
      && serverContent.includes('const projectedState = buildPublicState')
      && serverContent.includes("return sendJson(res, 200, { ok: true, state: buildPublicState(state) });"),
    'server.js keeps API posture sourced from SPEC_VERSION and buildPublicState(...).'
  );
  pushCheck(
    checks,
    'browser-shell-placeholder-alignment',
    indexContent.includes('id="heroEyebrow"')
      && indexContent.includes('id="heroLede"')
      && indexContent.includes('id="heroTip"')
      && !indexContent.includes('V19 canonical deterministic local prototype')
      && !indexContent.includes('V20 draft target'),
    'public/index.html exposes canon-posture placeholders and no stale hardcoded hero posture.'
  );
  pushCheck(
    checks,
    'browser-shell-render-alignment',
    appContent.includes('function renderCanonPosture(state)')
      && appContent.includes('return canonPosture(state)')
      && !appContent.includes('V15 §')
      && !appContent.includes('v15-scenario-preview')
      && !appContent.includes('v15-detailed-need-surface'),
    'public/app.js renders canon posture from runtime state and omits stale V15 explainer keys.'
  );
  pushCheck(
    checks,
    'readme-alignment',
    readmeContent.includes(`# ENGI Demo - ${activeCanonVersion} canonical deterministic local prototype`)
      && readmeContent.includes(`ENGI_SPEC.txt -> ${activeCanonVersion}`)
      && readmeContent.includes(`ENGI_SPEC_${activeCanonVersion}_PROVEN.md`)
      && normalizeWhitespace(readmeContent).includes(normalizeWhitespace(`This demo is governed by the active ${activeCanonVersion} canonical spec`))
      && !readmeContent.includes('V15 canonical deterministic local prototype'),
    `README states ${activeCanonVersion} active canon and ${ACTIVE_PROVEN_APPENDIX_PATH} as the current generated appendix.`
  );

  const blockingFailures = checks.filter((check) => !check.passed);
  return {
    reportId: V22_CANON_POSTURE_REPORT_ID,
    version,
    checkedActiveCanonVersion: activeCanonVersion,
    checkedDraftTargetVersion: draftTargetVersion,
    pointerVersion,
    proofSourceCommit,
    generatedAt,
    generatorId,
    worktreeState,
    passed: blockingFailures.length === 0,
    checkCount: checks.length,
    blockingFailureCount: blockingFailures.length,
    blockingFailures: blockingFailures.map((check) => `${check.checkId}: ${check.detail}`),
    runtimeSpecVersion: initialState.specVersion,
    publicSpecVersion: projectedState.specVersion,
    activeProvenAppendixPath: ACTIVE_PROVEN_APPENDIX_PATH,
    policyRef: CURRENT_POLICY_REF,
    checkedFiles: [
      path.relative(resolvedRepoRoot, readmePath),
      path.relative(resolvedRepoRoot, indexPath),
      path.relative(resolvedRepoRoot, appPath),
      path.relative(resolvedRepoRoot, serverPath)
    ],
    checks
  };
}

/**
 * @param {{
 *   version: string,
 *   proofSourceCommit: string,
 *   generatedAt: string,
 *   generatorId: string,
 *   worktreeState: string,
 *   specFamilyReport: ReturnType<typeof import('./v21-specifying.js').buildV21SpecFamilyReport>,
 *   canonicalInputReport: ReturnType<typeof import('./v21-specifying.js').buildV21CanonicalInputReport>,
 *   canonPostureDriftReport: ReturnType<typeof buildV22CanonPostureDriftReport>
 * }} input
 */
export function buildV22GeneratedArtifactContents({
  version,
  proofSourceCommit,
  generatedAt,
  generatorId,
  worktreeState,
  specFamilyReport,
  canonicalInputReport,
  canonPostureDriftReport
}) {
  return {
    ...buildV21GeneratedArtifactContents({
      version,
      proofSourceCommit,
      generatedAt,
      generatorId,
      worktreeState,
      specFamilyReport,
      canonicalInputReport
    }),
    '.engi/v22-canon-posture-drift-report.json': `${JSON.stringify(canonPostureDriftReport, null, 2)}\n`
  };
}
