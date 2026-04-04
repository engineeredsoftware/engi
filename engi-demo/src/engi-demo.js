import { ExecutionReality, NormalizationPressure } from './canonical/enums.js';
import './canonical/types.js';
import { buildRepoSupplySurface, buildDepositingSurface, buildNeedingSurface, buildDepositingToNeedingSurface, buildRepoToSettlementSurface, buildIdentityAuthSpineSurface, buildBoundaryRealitySurface, buildGithubBoundarySurface } from './canonical/surfaces.js';
import { buildPipelineTelemetry, buildPromptImplementationSurface, buildSystemProofBundle, buildArtifactUploadManifest, buildDeliverablesManifest, buildScenarioFixtureManifest, buildTestCoverageReport } from './canonical/run-artifacts.js';
import { createNeedMeasurementRuntime } from './canonical/need-measurement.js';
import { createEvaluationMaterializationRuntime } from './canonical/evaluation-materialization.js';
import { createSettlementRuntime } from './canonical/settlement.js';
import { buildProfileCompositions, buildPublicState as buildDemoPublicState } from './demo-shell-state.js';
import {
  extractPromptPlaceholders,
  buildPromptContract,
  assertPromptContractComplete,
  buildEvaluatorSurface as evaluatorSurface
} from './canonical/prompting.js';
import {
  buildProjectionPolicy,
  buildBoundedPublicProofArtifact,
  buildRedactionProof,
  buildDisclosureProof
} from './canonical/projections.js';
import {
  buildSelectionConsistencyProof,
  buildMaterializationVisibilityProof,
  buildMaterializationExclusions,
  buildMaterializationProof,
  buildProofWitnessManifest
} from './canonical/proof-materialization.js';

import crypto from 'node:crypto';
import { PROFILE_A, PROFILE_B, buildRealizationProfile } from './realization-profile.js';

export const SPEC_VERSION = 'ENGI Spec V15 canonical local prototype';
export const DEFAULT_BRANCH_MODE = 'patch';
export const METERED_MICRO_UNITS = '100000000';
export const DEFAULT_PROJECTION_PRINCIPAL = 'public';
export { extractPromptPlaceholders, buildPromptContract, assertPromptContractComplete };
export { PROFILE_A, PROFILE_B, buildRealizationProfile } from './realization-profile.js';
const MAX_BPS = 10000;
const MAX_BPS_BIGINT = 10000n;
const SOURCE_TO_SHARES_SCALE = 1000000n;
const VECTOR_DIMENSIONS = 16;
const DEFAULT_MODEL_ID = 'deterministic-local-evaluator.v15';
const DEFAULT_POLICY_REF = 'policy://engi/spec-v15-canonical/2026-04-04';
const PROJECTION_PRINCIPALS = new Set(['public', 'buyer', 'reviewer', 'internal']);
const RECALL_CHANNEL_BUDGETS = {
  semanticTaskSearch: 50,
  failureModeSearch: 50,
  technicalContextSearch: 50,
  lexicalSearch: 100,
  symbolSearch: 100,
  pathSearch: 100,
  configKeySearch: 100,
  artifactKindFilteredSearch: 100
};
const PRIVATE_DATA_CLASSES = new Set([
  'repo-private-source',
  'licensed-source-material',
  'private-branch-derived-artifact',
  'verification-evidence',
  'settlement-preview',
  'private-proof-artifact'
]);
const REQUIRED_SENSITIVE_DATA_CLASSES = [
  'repo-private-source',
  'licensed-source-material',
  'private-branch-derived-artifact',
  'verification-evidence',
  'settlement-preview',
  'private-proof-artifact',
  'bounded-public-proof-metadata'
];

function buildBoundaryDescriptions(localBoundary, externalBoundary) {
  return {
    localBoundary,
    externalBoundary,
    profileABoundary: localBoundary,
    profileBBoundary: externalBoundary
  };
}

function buildBoundaryRealityStage({ stageId, label, localStatus, localDescription, externalRequirement }) {
  return {
    stageId,
    label,
    localStatus,
    localDescription,
    externalRequirement,
    profileAStatus: localStatus,
    profileADescription: localDescription,
    profileBRequirement: externalRequirement
  };
}

function buildExternalBoundaryInterface({ interfaceId, label, status, localPrototype, externalBoundary }) {
  return {
    interfaceId,
    label,
    status,
    localPrototype,
    externalBoundary,
    profileA: localPrototype,
    profileB: externalBoundary
  };
}

const RECALL_CHANNEL_SPECS = {
  semanticTaskSearch: { signalFamily: 'semantic/vector', determinesFrom: ['need.task', 'unit.text'], recordedOn: ['need.queryRepresentations.task', 'asset.contentUnits[].embeddings.taskVector'], vectorizedIn: 'task-semantic-space.v8', searchedBy: 'cosineSimilarity', scoredBy: 'similarity score', rankedUsage: 'needMatch.taskSemanticFit + recall fusion', downstreamUses: ['candidate recall ordering', 'need-match scoring', 'asset-pack selection'] },
  failureModeSearch: { signalFamily: 'semantic/vector', determinesFrom: ['need.failureModes', 'need.failingCases', 'unit.text', 'unit.codeAnalysisFacts.constraints', 'unit.codeAnalysisFacts.symbols'], recordedOn: ['need.queryRepresentations.failureModes', 'asset.contentUnits[].embeddings.failureModeVector'], vectorizedIn: 'failure-mode-space.v8', searchedBy: 'cosineSimilarity', scoredBy: 'similarity score', rankedUsage: 'needMatch.failureModeFit + benchmarkImpact.likelyImprovesFailingCases', downstreamUses: ['candidate recall ordering', 'benchmark-impact scoring', 'asset-pack coverage'] },
  technicalContextSearch: { signalFamily: 'semantic/vector', determinesFrom: ['need.touchedPaths', 'need.extractedSymbols', 'need.configKeys', 'need.stackHints', 'unit.codeAnalysisFacts.*'], recordedOn: ['need.queryRepresentations.technicalContext', 'asset.contentUnits[].embeddings.technicalContextVector'], vectorizedIn: 'technical-context-space.v8', searchedBy: 'cosineSimilarity', scoredBy: 'similarity score', rankedUsage: 'pathFit/stackFit/context generalization', downstreamUses: ['repo-context ranking', 'benchmark generalization scoring', 'branch selection guardrails'] },
  lexicalSearch: { signalFamily: 'lexical', determinesFrom: ['tokenize(need.task/failureModes/constraints/weakDimensions)', 'tokenize(unit.text)'], recordedOn: ['need.lexicalTerms', 'unit text tokens'], vectorizedIn: null, searchedBy: 'exact token overlap', scoredBy: 'hit ratio', rankedUsage: 'support-only lexical evidence', downstreamUses: ['recall provenance', 'needMatch.lexicalSupport', 'visual explainability'] },
  symbolSearch: { signalFamily: 'symbolic', determinesFrom: ['need.extractedSymbols', 'unit.codeAnalysisFacts.symbols'], recordedOn: ['need.extractedSymbols', 'asset.contentUnits[].codeAnalysisFacts.symbols'], vectorizedIn: null, searchedBy: 'exact symbol intersection', scoredBy: 'binary presence', rankedUsage: 'needMatch.symbolFit + recall fusion', downstreamUses: ['subsystem alignment', 'implementation specificity', 'visual explainability'] },
  pathSearch: { signalFamily: 'path', determinesFrom: ['need.touchedPaths', 'asset.metadata.sourcePaths', 'unit.codeAnalysisFacts.paths'], recordedOn: ['need.touchedPaths', 'asset provenance/source paths'], vectorizedIn: null, searchedBy: 'exact path intersection', scoredBy: 'binary presence', rankedUsage: 'needMatch.pathFit + repo-context linkage', downstreamUses: ['asset-pack coverage', 'benchmark impact generalization', 'penalty avoidance'] },
  configKeySearch: { signalFamily: 'config', determinesFrom: ['need.configKeys', 'unit.codeAnalysisFacts.configKeys'], recordedOn: ['need.configKeys', 'asset.contentUnits[].codeAnalysisFacts.configKeys'], vectorizedIn: null, searchedBy: 'exact config-key intersection', scoredBy: 'binary presence', rankedUsage: 'subsystem alignment + context linkage', downstreamUses: ['need-match scoring', 'artifact precision', 'visual explainability'] },
  artifactKindFilteredSearch: { signalFamily: 'artifact-kind/type', determinesFrom: ['need.targetArtifactKinds', 'asset.artifactKind', 'asset.artifactType'], recordedOn: ['need.targetArtifactKinds', 'asset metadata'], vectorizedIn: null, searchedBy: 'kind/type eligibility filter', scoredBy: 'binary match', rankedUsage: 'artifact kind fit + candidate filtering', downstreamUses: ['need-match scoring', 'penalty mass', 'asset-pack assembly'] }
};

const CODE_ANALYSIS_CONSUMERS = {
  'ranking.need-match.task-semantic-fit.v2': ['need.task', 'asset.contentUnits[].embeddings.taskVector'],
  'ranking.need-match.failure-mode-fit.v2': ['need.failureModes', 'asset.contentUnits[].embeddings.failureModeVector'],
  'ranking.need-match.symbol-fit.v2': ['need.extractedSymbols', 'asset.contentUnits[].codeAnalysisFacts.symbols'],
  'ranking.need-match.path-fit.v2': ['need.touchedPaths', 'asset.metadata.sourcePaths', 'asset.contentUnits[].codeAnalysisFacts.paths', 'need.extractedSymbols', 'need.configKeys', 'need.stackHints', 'asset.metadata.declaredStacks'],
  'ranking.need-match.stack-fit.v2': ['need.stackHints', 'asset.metadata.declaredStacks'],
  'ranking.need-match.constraint-fit.v2': ['need.constraints', 'asset.metadata.declaredConstraints', 'asset.contentUnits[].codeAnalysisFacts.constraints'],
  'ranking.need-match.artifact-kind-fit.v2': ['need.targetArtifactKinds', 'asset.artifactKind'],
  'ranking.need-match.lexical-support.v2': ['need.lexicalNeedTerms', 'asset.contentUnits[].textTokens'],
  'ranking.benchmark-impact.failing-cases.v2': ['need.failingCases', 'asset.contentUnits[].embeddings.failureModeVector'],
  'ranking.benchmark-impact.weak-dimensions.v2': ['need.weakDimensions', 'need.task', 'need.constraints', 'asset.contentUnits[].embeddings.taskVector', 'asset.metadata.declaredConstraints'],
  'ranking.benchmark-impact.repo-context.v2': ['need.touchedPaths', 'need.stackHints', 'need.constraints', 'asset.metadata.sourcePaths', 'asset.metadata.declaredStacks'],
  'ranking.actionability.remediation-specificity.v2': ['need.failureModes', 'asset.contentUnits[].embeddings.failureModeVector'],
  'ranking.actionability.implementation-specificity.v2': ['asset.metadata.sourcePaths', 'asset.contentUnits[].codeAnalysisFacts.symbols', 'asset.contentUnits[].codeAnalysisFacts.configKeys'],
  'ranking.actionability.operational-usability.v2': ['asset.verificationEvidence'],
  'verification.issuance-checks.v15': ['asset.attestations[0]'],
  'verification.provenance-checks.v15': ['asset.provenanceBinding', 'need.repo', 'need.benchmarkRunId'],
  'verification.sufficiency-checks.v15': ['asset.verificationEvidence', 'need.benchmarkRunId'],
  'verification.issuer-policy-checks.v15': ['asset.metadata.issuerPolicyStatus', 'asset.attestations[0].signerAddress', 'policyState.issuers']
};

const CODE_ANALYSIS_FACT_REGISTRY_SPECS = {
  'need.task': { measurementClass: 'inferred-derived', gatheredFrom: ['need-measurement.task.v2'], storedOn: ['need.task'], factClass: 'need-analysis' },
  'need.failureModes': { measurementClass: 'inferred-derived', gatheredFrom: ['need-measurement.failure-modes.v2'], storedOn: ['need.failureModes'], factClass: 'need-analysis' },
  'need.constraints': { measurementClass: 'inferred-derived', gatheredFrom: ['need-measurement.constraints.v2'], storedOn: ['need.constraints'], factClass: 'need-analysis' },
  'need.targetArtifactKinds': { measurementClass: 'inferred-derived', gatheredFrom: ['need-measurement.target-artifact-kinds.v2'], storedOn: ['need.targetArtifactKinds'], factClass: 'need-analysis' },
  'need.touchedPaths': { measurementClass: 'static-executed', gatheredFrom: ['github-actions.benchmark-parser.v15', 'github.repo-context.extract.v15'], storedOn: ['need.touchedPaths'], factClass: 'repo-code-analysis' },
  'need.extractedSymbols': { measurementClass: 'static-executed', gatheredFrom: ['github-actions.benchmark-parser.v15', 'github.repo-context.extract.v15'], storedOn: ['need.extractedSymbols'], factClass: 'repo-code-analysis' },
  'need.configKeys': { measurementClass: 'static-executed', gatheredFrom: ['github-actions.benchmark-parser.v15', 'github.repo-context.extract.v15'], storedOn: ['need.configKeys'], factClass: 'repo-code-analysis' },
  'need.stackHints': { measurementClass: 'hybrid-composed', gatheredFrom: ['github.repo-context.extract.v15', 'inferStackHints()'], storedOn: ['need.stackHints'], factClass: 'repo-code-analysis' },
  'need.failingCases': { measurementClass: 'static-executed', gatheredFrom: ['github-actions.benchmark-parser.v15'], storedOn: ['need.failingCases'], factClass: 'benchmark-analysis' },
  'need.weakDimensions': { measurementClass: 'static-executed', gatheredFrom: ['github-actions.benchmark-parser.v15'], storedOn: ['need.weakDimensions'], factClass: 'benchmark-analysis' },
  'need.lexicalNeedTerms': { measurementClass: 'hybrid-composed', gatheredFrom: ['tokenize(need.task/failureModes/constraints/weakDimensions)'], storedOn: ['recall.lexicalTerms'], factClass: 'derived-tokenization' },
  'asset.contentUnits[].textTokens': { measurementClass: 'static-executed', gatheredFrom: ['tokenize(unit.text)'], storedOn: ['recall unit tokenization'], factClass: 'derived-tokenization' },
  'asset.contentUnits[].codeAnalysisFacts.symbols': { measurementClass: 'static-executed', gatheredFrom: ['content-unit.extract-static-code-analysis.v15'], storedOn: ['asset.contentUnits[].codeAnalysisFacts.symbols'], factClass: 'content-unit-code-analysis' },
  'asset.contentUnits[].codeAnalysisFacts.paths': { measurementClass: 'static-executed', gatheredFrom: ['content-unit.extract-static-code-analysis.v15'], storedOn: ['asset.contentUnits[].codeAnalysisFacts.paths'], factClass: 'content-unit-code-analysis' },
  'asset.contentUnits[].codeAnalysisFacts.configKeys': { measurementClass: 'static-executed', gatheredFrom: ['content-unit.extract-static-code-analysis.v15'], storedOn: ['asset.contentUnits[].codeAnalysisFacts.configKeys'], factClass: 'content-unit-code-analysis' },
  'asset.contentUnits[].codeAnalysisFacts.stackTags': { measurementClass: 'static-executed', gatheredFrom: ['content-unit.extract-static-code-analysis.v15'], storedOn: ['asset.contentUnits[].codeAnalysisFacts.stackTags'], factClass: 'content-unit-code-analysis' },
  'asset.contentUnits[].codeAnalysisFacts.constraints': { measurementClass: 'static-executed', gatheredFrom: ['content-unit.extract-static-code-analysis.v15'], storedOn: ['asset.contentUnits[].codeAnalysisFacts.constraints'], factClass: 'content-unit-code-analysis' },
  'asset.contentUnits[].embeddings.taskVector': { measurementClass: 'hybrid-composed', gatheredFrom: ['content-unit.embedding-standin.v8'], storedOn: ['asset.contentUnits[].embeddings.taskVector'], factClass: 'stand-in-embedding' },
  'asset.contentUnits[].embeddings.failureModeVector': { measurementClass: 'hybrid-composed', gatheredFrom: ['content-unit.embedding-standin.v8'], storedOn: ['asset.contentUnits[].embeddings.failureModeVector'], factClass: 'stand-in-embedding' },
  'asset.metadata.sourcePaths': { measurementClass: 'static-executed', gatheredFrom: ['asset.measurement.extract.v15'], storedOn: ['asset.metadata.sourcePaths'], factClass: 'asset-code-analysis' },
  'asset.metadata.declaredStacks': { measurementClass: 'static-executed', gatheredFrom: ['asset.measurement.extract.v15'], storedOn: ['asset.metadata.declaredStacks'], factClass: 'asset-code-analysis' },
  'asset.metadata.declaredConstraints': { measurementClass: 'static-executed', gatheredFrom: ['asset.measurement.extract.v15'], storedOn: ['asset.metadata.declaredConstraints'], factClass: 'asset-code-analysis' },
  'asset.artifactKind': { measurementClass: 'copied', gatheredFrom: ['asset upload metadata'], storedOn: ['asset.artifactKind'], factClass: 'asset-shape' },
  'asset.verificationEvidence': { measurementClass: 'static-executed', gatheredFrom: ['asset.verificationEvidence'], storedOn: ['asset.verificationEvidence'], factClass: 'verification-evidence' },
  'asset.attestations[0]': { measurementClass: 'static-executed', gatheredFrom: ['asset.attestations[0]'], storedOn: ['asset.attestations[0]'], factClass: 'verification-evidence' },
  'asset.provenanceBinding': { measurementClass: 'static-executed', gatheredFrom: ['asset.provenanceBinding'], storedOn: ['asset.provenanceBinding'], factClass: 'verification-evidence' },
  'asset.metadata.issuerPolicyStatus': { measurementClass: 'policy-derived', gatheredFrom: ['asset.metadata.issuerPolicyStatus'], storedOn: ['asset.metadata.issuerPolicyStatus'], factClass: 'policy-input' },
  'asset.attestations[0].signerAddress': { measurementClass: 'static-executed', gatheredFrom: ['asset.attestations[0].signerAddress'], storedOn: ['asset.attestations[0].signerAddress'], factClass: 'policy-input' },
  'policyState.issuers': { measurementClass: 'policy-derived', gatheredFrom: ['policyState.issuers'], storedOn: ['policyState.issuers'], factClass: 'policy-input' },
  'need.repo': { measurementClass: 'copied', gatheredFrom: ['scenario.repo'], storedOn: ['need.repo'], factClass: 'verification-context' },
  'need.benchmarkRunId': { measurementClass: 'copied', gatheredFrom: ['scenario.benchmarkRunId'], storedOn: ['need.benchmarkRunId'], factClass: 'verification-context' }
};

export function sha256(value) {
  return crypto.createHash('sha256').update(String(value)).digest('hex');
}

export function nowIso() {
  return new Date().toISOString();
}

export function canonicalJson(value) {
  if (value === null || typeof value !== 'object') return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(',')}]`;
  return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(',')}}`;
}

export function toSlug(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || 'item';
}

export function tokenize(text) {
  return String(text || '')
    .toLowerCase()
    .split(/[^a-z0-9_.\-/]+/g)
    .map((part) => part.trim())
    .filter(Boolean);
}

export function uniqueTokens(text) {
  return [...new Set(tokenize(text))];
}

function hashInt(value) {
  return parseInt(sha256(value).slice(0, 8), 16);
}

function clamp01(value) {
  return Math.max(0, Math.min(1, Number(value) || 0));
}

function ratio(intersection, total) {
  if (!total) return 0;
  return clamp01(intersection / total);
}

function overlapScore(left, right) {
  const a = new Set(Array.isArray(left) ? left : uniqueTokens(left));
  const b = new Set(Array.isArray(right) ? right : uniqueTokens(right));
  if (!a.size || !b.size) return 0;
  let hits = 0;
  for (const item of a) {
    if (b.has(item)) hits += 1;
  }
  return ratio(hits, Math.max(a.size, b.size / 2));
}

function intersection(left, right) {
  const a = new Set(left || []);
  return [...new Set((right || []).filter((item) => a.has(item)))];
}

function union(left, right) {
  return [...new Set([...(left || []), ...(right || [])])];
}

function countOverlap(left, right) {
  return intersection(left, right).length;
}

function stableHashObject(value) {
  return `sha256:${sha256(canonicalJson(value))}`;
}

function aggregateRootRef(surfaceId, values = []) {
  const roots = summarizeStrings(values);
  if (!roots.length) return null;
  if (roots.length === 1) return roots[0];
  return `${surfaceId}_aggregate_${sha256(`${surfaceId}:${roots.join('|')}`).slice(0, 12)}`;
}

function ensureProjectionPrincipal(principal = DEFAULT_PROJECTION_PRINCIPAL) {
  const normalized = String(principal || DEFAULT_PROJECTION_PRINCIPAL).trim().toLowerCase();
  if (!PROJECTION_PRINCIPALS.has(normalized)) {
    throw new Error(`Unsupported projection principal: ${principal}`);
  }
  return normalized;
}

function buildStaticExecutionReceipt({
  receiptKind,
  stageId,
  toolId,
  inputs,
  normalizedOutputEnvelope,
  evidenceRefs = [],
  replayInputClosure = [],
  standIn = false
}) {
  const inputsHash = stableHashObject(inputs);
  const outputHash = stableHashObject(normalizedOutputEnvelope);
  const receiptId = `static_receipt_${sha256(`${stageId}:${receiptKind}:${inputsHash}:${outputHash}`).slice(0, 12)}`;
  return {
    receiptId,
    receiptKind,
    stageId,
    toolId,
    conformanceProfile: PROFILE_A,
    productionIntentProfile: PROFILE_B,
    executedLocally: true,
    standIn,
    inputsHash,
    outputHash,
    evidenceRefs: summarizeStrings(evidenceRefs),
    replayInputClosure: summarizeStrings(replayInputClosure),
    normalizedOutputEnvelope,
    receiptHash: stableHashObject({
      receiptId,
      receiptKind,
      stageId,
      toolId,
      inputsHash,
      outputHash
    })
  };
}

function collectStaticExecutionReceipts(values = []) {
  const receipts = [];
  const visit = (value) => {
    if (!value) return;
    if (Array.isArray(value)) {
      value.forEach(visit);
      return;
    }
    if (typeof value !== 'object') return;
    if (typeof value.receiptId === 'string' && typeof value.stageId === 'string' && typeof value.outputHash === 'string') {
      receipts.push(value);
      return;
    }
    Object.values(value).forEach(visit);
  };
  const queue = Array.isArray(values) ? values : [values];
  queue.forEach(visit);
  return receipts;
}

function buildStaticMeasurementReport(receipts = [], needMeasurement = null, evaluatedCandidates = []) {
  const byStage = receipts.map((receipt) => ({
    receiptId: receipt.receiptId,
    stageId: receipt.stageId,
    receiptKind: receipt.receiptKind,
    toolId: receipt.toolId,
    outputHash: receipt.outputHash
  }));
  return {
    conformanceProfile: PROFILE_A,
    productionIntentProfile: PROFILE_B,
    receiptCount: receipts.length,
    needMeasurementReceiptIds: summarizeStrings((needMeasurement?.measurementProvenance || []).flatMap((entry) => entry.receiptRefs || [])),
    verificationReceiptIds: summarizeStrings(evaluatedCandidates.flatMap((candidate) => candidate.measurementProvenance || []).flatMap((entry) => entry.receiptRefs || [])),
    byStage,
    allReceiptRefsResolve: summarizeStrings([
      ...(needMeasurement?.measurementProvenance || []).flatMap((entry) => entry.receiptRefs || []),
      ...evaluatedCandidates.flatMap((candidate) => candidate.measurementProvenance || []).flatMap((entry) => entry.receiptRefs || [])
    ]).every((receiptId) => receipts.some((receipt) => receipt.receiptId === receiptId)),
    reportHash: stableHashObject(byStage)
  };
}

function buildStaticMeasurementProof(receipts = [], needMeasurement = null, evaluatedCandidates = []) {
  const expectedReceiptRefs = summarizeStrings([
    ...(needMeasurement?.measurementProvenance || []).flatMap((entry) => entry.receiptRefs || []),
    ...evaluatedCandidates.flatMap((candidate) => candidate.measurementProvenance || []).flatMap((entry) => entry.receiptRefs || [])
  ]);
  const receiptIds = new Set(receipts.map((receipt) => receipt.receiptId));
  return {
    conformanceProfile: PROFILE_A,
    productionIntentProfile: PROFILE_B,
    expectedReceiptRefCount: expectedReceiptRefs.length,
    receiptCount: receipts.length,
    allReceiptRefsResolve: expectedReceiptRefs.every((receiptId) => receiptIds.has(receiptId)),
    coveredStageIds: summarizeStrings(receipts.map((receipt) => receipt.stageId)),
    witnessReceiptRefs: expectedReceiptRefs,
    proofHash: stableHashObject({
      expectedReceiptRefs,
      coveredStageIds: summarizeStrings(receipts.map((receipt) => receipt.stageId))
    })
  };
}

function codeAnalysisFactSample(factId, need, assetSample = null) {
  switch (factId) {
    case 'need.task': return need?.task;
    case 'need.failureModes': return need?.failureModes?.slice(0, 3);
    case 'need.constraints': return need?.constraints?.slice(0, 3);
    case 'need.targetArtifactKinds': return need?.targetArtifactKinds?.slice(0, 3);
    case 'need.touchedPaths': return need?.touchedPaths?.slice(0, 4);
    case 'need.extractedSymbols': return need?.extractedSymbols?.slice(0, 4);
    case 'need.configKeys': return need?.configKeys?.slice(0, 4);
    case 'need.stackHints': return need?.stackHints?.slice(0, 4);
    case 'need.failingCases': return need?.failingCases?.slice(0, 3);
    case 'need.weakDimensions': return need?.weakDimensions?.slice(0, 3);
    case 'need.lexicalNeedTerms': return uniqueTokens([need?.task, ...(need?.failureModes || []), ...(need?.constraints || []), ...(need?.weakDimensions || [])].join(' ')).slice(0, 8);
    case 'asset.contentUnits[].textTokens': return uniqueTokens(assetSample?.contentUnits?.[0]?.text || '').slice(0, 8);
    case 'asset.contentUnits[].codeAnalysisFacts.symbols': return assetSample?.contentUnits?.flatMap((unit) => unit.codeAnalysisFacts.symbols).slice(0, 4);
    case 'asset.contentUnits[].codeAnalysisFacts.paths': return assetSample?.contentUnits?.flatMap((unit) => unit.codeAnalysisFacts.paths).slice(0, 4);
    case 'asset.contentUnits[].codeAnalysisFacts.configKeys': return assetSample?.contentUnits?.flatMap((unit) => unit.codeAnalysisFacts.configKeys).slice(0, 4);
    case 'asset.contentUnits[].codeAnalysisFacts.stackTags': return assetSample?.contentUnits?.flatMap((unit) => unit.codeAnalysisFacts.stackTags).slice(0, 4);
    case 'asset.contentUnits[].codeAnalysisFacts.constraints': return assetSample?.contentUnits?.flatMap((unit) => unit.codeAnalysisFacts.constraints).slice(0, 4);
    case 'asset.contentUnits[].embeddings.taskVector': return assetSample?.contentUnits?.[0]?.embeddings?.taskVector?.spec?.vectorSpace;
    case 'asset.contentUnits[].embeddings.failureModeVector': return assetSample?.contentUnits?.[0]?.embeddings?.failureModeVector?.spec?.vectorSpace;
    case 'asset.metadata.sourcePaths': return assetSample?.metadata?.sourcePaths?.slice(0, 4);
    case 'asset.metadata.declaredStacks': return assetSample?.metadata?.declaredStacks?.slice(0, 4);
    case 'asset.metadata.declaredConstraints': return assetSample?.metadata?.declaredConstraints?.slice(0, 4);
    case 'asset.artifactKind': return assetSample?.artifactKind;
    case 'asset.verificationEvidence': return Object.keys(assetSample?.verificationEvidence || {});
    case 'asset.attestations[0]': return Object.keys(assetSample?.attestations?.[0] || {});
    case 'asset.provenanceBinding': return Object.keys(assetSample?.provenanceBinding || {});
    case 'asset.metadata.issuerPolicyStatus': return assetSample?.metadata?.issuerPolicyStatus;
    case 'asset.attestations[0].signerAddress': return assetSample?.attestations?.[0]?.signerAddress;
    case 'policyState.issuers': return ['allowed', 'restricted', 'revoked'];
    case 'need.repo': return need?.repo;
    case 'need.benchmarkRunId': return need?.benchmarkRunId;
    default: return null;
  }
}

function buildCodeAnalysisFactRegistry({ need, evaluatedCandidates = [] }) {
  const assetSample = evaluatedCandidates[0]?.asset || null;
  const consumedFactIds = summarizeStrings(Object.values(CODE_ANALYSIS_CONSUMERS).flat());
  const registeredFactIds = Object.keys(CODE_ANALYSIS_FACT_REGISTRY_SPECS);
  const registeredFacts = registeredFactIds.map((factId) => {
    const spec = CODE_ANALYSIS_FACT_REGISTRY_SPECS[factId];
    const consumedBy = Object.entries(CODE_ANALYSIS_CONSUMERS)
      .filter(([, factIds]) => factIds.includes(factId))
      .map(([consumerId]) => consumerId);
    return {
      factId,
      factClass: spec.factClass,
      measurementClass: spec.measurementClass,
      gatheredFrom: spec.gatheredFrom,
      storedOn: spec.storedOn,
      exampleValue: codeAnalysisFactSample(factId, need, assetSample),
      consumedBy,
      intentionallyUnused: consumedBy.length === 0
    };
  });
  const unusedRegisteredFactIds = registeredFacts
    .filter((entry) => entry.intentionallyUnused)
    .map((entry) => entry.factId);
  const unregisteredConsumedFactIds = consumedFactIds.filter((factId) => !registeredFactIds.includes(factId));
  if (unregisteredConsumedFactIds.length) {
    throw new Error(`Spec V15 code-analysis registry failed: unregistered consumed facts [${unregisteredConsumedFactIds.join(', ')}].`);
  }
  return {
    conformanceProfile: PROFILE_A,
    productionIntentProfile: PROFILE_B,
    registrySemantics: 'code-analysis-fact-registry',
    specArtifactAliases: ['.engi/static-heuristics-registry.json'],
    registeredFactCount: registeredFacts.length,
    consumedFactCount: consumedFactIds.length,
    registeredFacts,
    consumerMatrix: Object.entries(CODE_ANALYSIS_CONSUMERS).map(([consumerId, factIds]) => ({
      consumerId,
      consumedFactIds: factIds
    })),
    audit: {
      allConsumedFactsRegistered: unregisteredConsumedFactIds.length === 0,
      unregisteredConsumedFactIds,
      unusedRegisteredFactIds,
      registryHash: stableHashObject({
        registeredFacts: registeredFacts.map((entry) => ({ factId: entry.factId, consumedBy: entry.consumedBy })),
        consumerMatrix: Object.entries(CODE_ANALYSIS_CONSUMERS)
      })
    }
  };
}

function buildStaticHeuristicsRegistryArtifact(codeAnalysisFactRegistry) {
  return {
    ...codeAnalysisFactRegistry,
    artifactId: 'static-heuristics-registry.v15',
    artifactSemantics: 'specific code-analysis fact registry emitted as the local static heuristics registry surface'
  };
}

function buildDeterministicVector(input) {
  const tokens = Array.isArray(input) ? input : uniqueTokens(input);
  const buckets = new Array(VECTOR_DIMENSIONS).fill(0);
  for (const token of tokens) {
    if (!token) continue;
    const index = hashInt(token) % VECTOR_DIMENSIONS;
    buckets[index] += 1;
  }

  const magnitude = Math.sqrt(buckets.reduce((sum, value) => sum + (value * value), 0));
  if (!magnitude) return buckets;
  return buckets.map((value) => Number((value / magnitude).toFixed(6)));
}

function buildEmbeddingSpec(vectorSpace, inputText, { profile = PROFILE_A, standIn = true, provider = 'engi-demo', modelId = DEFAULT_MODEL_ID, generationMethod = 'deterministic-stand-in', dimensions = VECTOR_DIMENSIONS } = {}) {
  return {
    vectorSpace,
    dimensions,
    profile,
    standIn,
    provider,
    modelId,
    generationMethod,
    inputHash: stableHashObject({ vectorSpace, inputText })
  };
}

function buildEmbeddingArtifact(vectorSpace, inputText, options = {}) {
  return {
    spec: buildEmbeddingSpec(vectorSpace, inputText, options),
    values: buildDeterministicVector(inputText)
  };
}

function telemetryEvent(stage, payload = {}) {
  return {
    eventId: `evt_${sha256(`${stage}:${canonicalJson(payload)}`).slice(0, 12)}`,
    stage,
    createdAt: nowIso(),
    profile: PROFILE_A,
    payload
  };
}

function unitSemanticSummary(unit) {
  return {
    unitId: unit.unitId,
    unitKind: unit.unitKind,
    unitHash: unit.unitHash,
    codeAnalysisFactCounts: {
      symbols: unit.codeAnalysisFacts.symbols.length,
      paths: unit.codeAnalysisFacts.paths.length,
      configKeys: unit.codeAnalysisFacts.configKeys.length,
      stackTags: unit.codeAnalysisFacts.stackTags.length,
      constraints: unit.codeAnalysisFacts.constraints.length
    },
    embeddingSpecs: Object.fromEntries(Object.entries(unit.embeddings || {}).map(([key, artifact]) => [key, artifact.spec]))
  };
}

function vectorValues(vectorOrArtifact) {
  return Array.isArray(vectorOrArtifact) ? vectorOrArtifact : vectorOrArtifact?.values;
}

function cosineSimilarity(left, right) {
  left = vectorValues(left);
  right = vectorValues(right);
  if (!Array.isArray(left) || !Array.isArray(right) || !left.length || !right.length) return 0;
  const length = Math.min(left.length, right.length);
  let total = 0;
  for (let index = 0; index < length; index += 1) {
    total += (Number(left[index]) || 0) * (Number(right[index]) || 0);
  }
  return clamp01(total);
}

function enforceRange(name, value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric < 0 || numeric > 1) {
    throw new Error(`Spec V15 debug failure: ${name} out of range (${value}).`);
  }
  return numeric;
}

function summarizeScore(score) {
  return Number(enforceRange('score', score).toFixed(4));
}

function enforceTelemetryTrace(name, trace) {
  if (!trace || typeof trace !== 'object') {
    throw new Error(`Spec V15 debug failure: missing telemetry trace for ${name}.`);
  }
  return trace;
}

function measurementDetail({ value, mode, toolOrPromptId, evidenceRefs, explanation, unitRefs = [], measurementClass = mode === 'inferred' ? 'inferred-evaluation' : 'static-analysis', evaluatorKind = mode === 'inferred' ? 'inferred-evaluator' : 'deterministic-static-command', consumedCodeAnalysisFacts = [] }) {
  return {
    value: summarizeScore(value),
    mode,
    measurementClass,
    evaluatorKind,
    toolOrPromptId,
    version: 'demo-v15.0',
    evidenceRefs: evidenceRefs.filter(Boolean),
    unitRefs,
    explanation,
    consumedCodeAnalysisFacts,
    evaluatorSurface: evaluatorSurface({
      evaluatorId: toolOrPromptId,
      evaluatorKind,
      measurementClass,
      mode,
      promptId: mode === 'inferred' ? toolOrPromptId : null,
      toolId: mode !== 'inferred' ? toolOrPromptId : null,
      evidenceRefs
    })
  };
}

function rankingEvidenceRefs(need, asset, extraRefs = []) {
  return union(
    [
      need.needId,
      need.benchmarkRunId,
      asset.contentRoot,
      asset.provenanceBinding?.commit,
      asset.provenanceBinding?.workflowRunId
    ].filter(Boolean),
    extraRefs.filter(Boolean)
  );
}

function detectUnitKind(text) {
  const source = String(text || '');
  if (/```|fn |function |const |let |class |pub /i.test(source)) return 'code-block';
  if (/=|:/.test(source) && /config|issuer|jwks|audience|env|yaml|toml|json/i.test(source)) return 'config-block';
  if (/prove|proof|invariant|creusot|theorem/i.test(source)) return 'proof-block';
  if (/test|assert|rerun|benchmark/i.test(source)) return 'test-block';
  return 'text';
}

function extractStaticCodeAnalysisFacts(text, hints = {}) {
  const source = String(text || '');
  const symbols = new Set(hints.symbols || []);
  const paths = new Set(hints.paths || []);
  const configKeys = new Set(hints.configKeys || []);
  const stackTags = new Set(hints.stackTags || []);
  const constraints = new Set(hints.constraints || []);

  for (const match of source.matchAll(/\b[A-Z][A-Za-z0-9]+\b|\b[a-z]+(?:[A-Z][A-Za-z0-9]+)+\b/g)) {
    if (match[0].length > 2) symbols.add(match[0]);
  }

  for (const match of source.matchAll(/[A-Za-z0-9_./-]+\.(?:ts|tsx|js|jsx|rs|py|go|json|ya?ml|toml|md)/g)) {
    paths.add(match[0]);
  }

  for (const match of source.matchAll(/\b[a-z][a-z0-9_.-]+(?:\.[a-z0-9_.-]+)+\b/g)) {
    if (match[0].includes('.')) configKeys.add(match[0]);
  }

  for (const word of ['typescript', 'node', 'rust', 'auth', 'github-actions', 'jwt', 'jwks', 'monorepo', 'redis']) {
    if (source.toLowerCase().includes(word)) stackTags.add(word);
  }

  for (const phrase of ['preserve session validity', 'replay only idempotent schema steps', 'emit audit receipt', 'compatibility window', 'kill switch', 'no panic', 'no overflow']) {
    if (source.toLowerCase().includes(phrase.toLowerCase())) constraints.add(phrase);
  }

  return {
    symbols: [...symbols],
    paths: [...paths],
    configKeys: [...configKeys],
    stackTags: [...stackTags],
    constraints: [...constraints]
  };
}

function splitContentUnits(assetId, content, hints = {}) {
  const blocks = String(content || '')
    .split(/\n\s*\n/g)
    .map((block) => block.trim())
    .filter(Boolean);

  return (blocks.length ? blocks : [String(content || '').trim()].filter(Boolean)).map((text, index) => {
    const codeAnalysisFacts = extractStaticCodeAnalysisFacts(text, hints);
    const technicalContextText = [
      text,
      ...(codeAnalysisFacts.paths || []),
      ...(codeAnalysisFacts.configKeys || []),
      ...(codeAnalysisFacts.stackTags || []),
      ...(codeAnalysisFacts.constraints || [])
    ].join(' ');
    const unitKind = detectUnitKind(text);
    const embeddings = {
      taskVector: buildEmbeddingArtifact('task-semantic-space.v8', text),
      failureModeVector: buildEmbeddingArtifact('failure-mode-space.v8', [text, ...(codeAnalysisFacts.constraints || []), ...(codeAnalysisFacts.symbols || [])].join(' ')),
      technicalContextVector: buildEmbeddingArtifact('technical-context-space.v8', technicalContextText)
    };
    const unitHash = stableHashObject({ text });
    const codeAnalysisReceipt = buildStaticExecutionReceipt({
      receiptKind: 'content-unit-static-code-analysis',
      stageId: 'content-unit.extract-static-code-analysis.v15',
      toolId: 'content-unit.extract-static-code-analysis.v15',
      inputs: { assetId, unitIndex: index + 1, text, hints },
      normalizedOutputEnvelope: codeAnalysisFacts,
      evidenceRefs: [unitHash, ...codeAnalysisFacts.paths, ...codeAnalysisFacts.configKeys],
      replayInputClosure: [unitHash]
    });

    return {
      unitId: `${assetId}:unit-${index + 1}`,
      assetId,
      unitKind,
      text,
      codeAnalysisFacts,
      embeddings,
      semanticInterfaces: {
        contentUnitContractVersion: 'v7',
        embeddingHandOffReady: true,
        profileAStandInEmbeddings: true,
        profileBFutureReplacementBoundary: 'replace embedding artifact values/providers without changing unit metadata contract'
      },
      measurementProvenance: [
        measurementTrace('static', 'content-unit.extract-static-code-analysis.v15', [unitHash, ...codeAnalysisFacts.paths, ...codeAnalysisFacts.configKeys], { measurementClass: 'static-analysis', evaluatorKind: 'deterministic-static-command', standIn: false, receiptRefs: [codeAnalysisReceipt.receiptId] }),
        measurementTrace('hybrid', 'content-unit.embedding-standin.v8', [unitHash], { measurementClass: 'embedding-derivation', evaluatorKind: 'embedding-generator', standIn: true })
      ],
      staticExecutionReceipts: [codeAnalysisReceipt],
      semanticSummary: {
        tokenCount: uniqueTokens(text).length,
        embeddingSpaces: Object.values(embeddings).map((artifact) => artifact.spec.vectorSpace),
        codeAnalysisFactCounts: {
          symbols: codeAnalysisFacts.symbols.length,
          paths: codeAnalysisFacts.paths.length,
          configKeys: codeAnalysisFacts.configKeys.length,
          stackTags: codeAnalysisFacts.stackTags.length,
          constraints: codeAnalysisFacts.constraints.length
        }
      },
      unitHash
    };
  });
}

function measurementTrace(mode, toolOrPromptId, evidenceRefs, options = {}) {
  return needMeasurementRuntime.measurementTrace(mode, toolOrPromptId, evidenceRefs, options);
}

function summarizeStrings(values) {
  return [...new Set((values || []).map((value) => String(value || '').trim()).filter(Boolean))];
}

function artifactTypeForKind(kind) {
  const table = {
    runbook: 'runbook/operator-playbook',
    patch: 'code/patch',
    config: 'config/policy-change',
    proof: 'proof/verification-log',
    'incident-note': 'notes/incident-retrospective',
    mixed: 'bundle/mixed'
  };
  return table[kind] || `${kind || 'unknown'}/unspecified`;
}

function countValues(values = []) {
  const counts = {};
  for (const value of values) {
    const key = String(value || '').trim();
    if (!key) continue;
    counts[key] = (counts[key] || 0) + 1;
  }
  return counts;
}

function topCountKeys(counts = {}, limit = 4) {
  return Object.entries(counts)
    .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))
    .slice(0, limit)
    .map(([key]) => key);
}

function buildRepoIdentity(repo) {
  const [owner = 'unknown', name = 'repo'] = String(repo || '').split('/');
  return {
    owner,
    name,
    repositoryId: `gh_repo_${sha256(repo || 'unknown').slice(0, 10)}`,
    repositoryNodeId: `R_${sha256(`node:${repo || 'unknown'}`).slice(0, 16)}`
  };
}

function buildAccountIdentity(login) {
  const normalized = String(login || 'unknown-account').trim() || 'unknown-account';
  return {
    installationAccountId: `gh_acct_${sha256(`acct:${normalized}`).slice(0, 10)}`,
    installationAccountNodeId: `A_${sha256(`acct-node:${normalized}`).slice(0, 16)}`
  };
}

function inventoryAddressRef(entry = {}) {
  return entry.sourcePath
    || entry.sourcePaths?.[0]
    || entry.artifactName
    || entry.workflowRunId
    || entry.checkSuiteId
    || entry.sourceCommit
    || entry.title
    || 'repo-artifact';
}

function buildInventoryAddressingSurface({
  repo,
  ref = null,
  sourceCommit = null,
  sourcePath = null,
  sourcePaths = [],
  workflowRunId = null,
  workflowPath = null,
  workflowJobName = null,
  checkSuiteId = null,
  artifactName = null,
  originKind = null,
  title = ''
} = {}) {
  const repoIdentity = buildRepoIdentity(repo);
  const normalizedSourcePaths = summarizeStrings([sourcePath, ...(sourcePaths || [])]);
  let addressingScope = 'repo';
  if (workflowRunId && (originKind === 'workflow-artifact' || artifactName)) addressingScope = 'workflow-artifact';
  else if (workflowRunId) addressingScope = 'workflow-run';
  else if (normalizedSourcePaths.length > 1) addressingScope = 'multi-artifact-selection';
  else if (normalizedSourcePaths.length === 1) addressingScope = 'repo-file';
  else if (sourceCommit) addressingScope = 'repo-commit';

  const surface = {
    addressingScope,
    repo,
    owner: repoIdentity.owner,
    repoName: repoIdentity.name,
    repositoryId: repoIdentity.repositoryId,
    repositoryNodeId: repoIdentity.repositoryNodeId,
    ref: ref || null,
    commit: sourceCommit || null,
    workflowRunId: workflowRunId || null,
    workflowPath: workflowPath || null,
    workflowJobName: workflowJobName || null,
    checkSuiteId: checkSuiteId || null,
    artifactName: artifactName || null,
    sourcePaths: normalizedSourcePaths,
    primaryAddressRef: normalizedSourcePaths[0] || artifactName || workflowRunId || checkSuiteId || sourceCommit || title || repo
  };
  return {
    ...surface,
    addressingRoot: stableHashObject(surface)
  };
}

function inventorySelectionSnapshot(entry = {}) {
  const addressing = entry.addressing || buildInventoryAddressingSurface(entry);
  return {
    inventoryEntryId: entry.inventoryEntryId,
    repo: entry.repo,
    repositoryId: entry.repositoryId || addressing.repositoryId,
    repositoryNodeId: entry.repositoryNodeId || addressing.repositoryNodeId,
    artifactKind: entry.artifactKind,
    artifactType: entry.artifactType,
    originKind: entry.originKind,
    title: entry.title,
    authSessionId: entry.authSessionId || null,
    installationId: entry.installationId || null,
    contentRoot: entry.contentRoot || null,
    addressingScope: addressing.addressingScope,
    primaryAddressRef: addressing.primaryAddressRef,
    addressingRoot: addressing.addressingRoot
  };
}

function buildGitHubAppSession({
  repo,
  installationId,
  defaultRef,
  appId = 'app_engi_demo',
  appSlug = 'engi-demo-app',
  installationAccountLogin = 'frontier-code-systems',
  installationAccountType = 'Organization',
  repositorySelection = 'selected',
  permissions = {},
  defaultSignerAddress = 'did:key:frontier-ci-signer',
  signingAlgorithm = 'ed25519',
  keySource = 'kms://engi-demo/github-app',
  operatorLogin = 'engi-demo-app[bot]'
}) {
  const repoIdentity = buildRepoIdentity(repo);
  const accountIdentity = buildAccountIdentity(installationAccountLogin);
  const resolvedPermissions = {
    actions: 'read',
    attestations: 'read',
    checks: 'read',
    contents: 'read',
    issues: 'write',
    metadata: 'read',
    pull_requests: 'write',
    ...permissions
  };
  const tokenBoundary = {
    mintingState: 'not-minted-in-profile-a',
    tokenMaterialPresent: false,
    modeledOnly: true,
    liveExchangeImplemented: false,
    repo,
    installationId,
    readableScopes: Object.keys(resolvedPermissions).filter((key) => resolvedPermissions[key] === 'read'),
    writableScopes: Object.keys(resolvedPermissions).filter((key) => resolvedPermissions[key] === 'write')
  };
  const sessionCore = {
    authSessionId: `ghapp_${toSlug(repo)}_${toSlug(installationId)}`,
    authMechanism: 'github-app-installation',
    appId,
    appSlug,
    installationId,
    installationAccountLogin,
    installationAccountId: accountIdentity.installationAccountId,
    installationAccountNodeId: accountIdentity.installationAccountNodeId,
    installationAccountType,
    operatorLogin,
    repo,
    owner: repoIdentity.owner,
    repoName: repoIdentity.name,
    repositoryId: repoIdentity.repositoryId,
    repositoryNodeId: repoIdentity.repositoryNodeId,
    repositoryVisibility: 'private',
    repositorySelection,
    permissions: resolvedPermissions,
    permissionsRoot: stableHashObject(resolvedPermissions),
    defaultRef,
    defaultSignerAddress,
    signingAlgorithm,
    keySource,
    sessionIssuedAt: '2026-04-03T00:00:00.000Z',
    sessionExpiresAt: null,
    tokenBoundary,
    ...buildBoundaryDescriptions(
      'Local modeled GitHub App installation session only. No live installation token is minted in this repo.',
      'Would exchange a real GitHub App JWT for an installation access token and use live repository APIs.'
    )
  };
  return {
    ...sessionCore,
    authPayloadHash: stableHashObject(sessionCore)
  };
}

function buildRepoArtifactInventoryEntry({
  repo,
  artifactKind,
  artifactType = artifactTypeForKind(artifactKind),
  originKind,
  title,
  summary,
  sourceCommit,
  ref,
  sourcePath = null,
  sourcePaths = [],
  workflowRunId = null,
  workflowPath = null,
  workflowJobName = null,
  checkSuiteId = null,
  artifactName = null,
  tags = [],
  declaredStacks = [],
  declaredConstraints = [],
  previewSurface,
  content,
  signerAddress = 'did:key:frontier-ci-signer',
  authSession = null
}) {
  const repoIdentity = buildRepoIdentity(repo);
  const normalizedSourcePaths = summarizeStrings([sourcePath, ...(sourcePaths || [])]);
  const contentRoot = stableHashObject(content);
  const addressing = buildInventoryAddressingSurface({
    repo,
    ref,
    sourceCommit,
    sourcePath,
    sourcePaths: normalizedSourcePaths,
    workflowRunId,
    workflowPath,
    workflowJobName,
    checkSuiteId,
    artifactName,
    originKind,
    title
  });
  const inventoryEntryId = `inv_${toSlug(repo)}_${toSlug(originKind)}_${sha256(`${repo}:${title}:${sourceCommit || ''}:${workflowRunId || ''}`).slice(0, 10)}`;
  const authBinding = authSession ? {
    authSessionId: authSession.authSessionId,
    authMechanism: authSession.authMechanism,
    appId: authSession.appId,
    appSlug: authSession.appSlug,
    installationId: authSession.installationId,
    installationAccountLogin: authSession.installationAccountLogin,
    installationAccountId: authSession.installationAccountId,
    installationAccountNodeId: authSession.installationAccountNodeId,
    installationAccountType: authSession.installationAccountType,
    repositoryId: authSession.repositoryId,
    repositoryNodeId: authSession.repositoryNodeId,
    permissions: authSession.permissions,
    permissionsRoot: authSession.permissionsRoot,
    authPayloadHash: authSession.authPayloadHash,
    tokenBoundary: authSession.tokenBoundary
  } : null;
  const provenance = {
    selectionLabel: `${artifactKind} · ${originKind} · ${addressing.primaryAddressRef}`,
    previewHash: stableHashObject(previewSurface || summary),
    contentRoot,
    addressingRoot: addressing.addressingRoot,
    authPayloadHash: authBinding?.authPayloadHash || null,
    provenanceHash: stableHashObject({
      inventoryEntryId,
      repo,
      artifactKind,
      artifactType,
      originKind,
      contentRoot,
      addressingRoot: addressing.addressingRoot,
      authPayloadHash: authBinding?.authPayloadHash || null
    })
  };
  return {
    inventoryEntryId,
    repo,
    owner: repoIdentity.owner,
    repoName: repoIdentity.name,
    repositoryId: repoIdentity.repositoryId,
    repositoryNodeId: repoIdentity.repositoryNodeId,
    artifactKind,
    artifactType,
    originKind,
    title,
    summary,
    ref: ref || null,
    sourceCommit: sourceCommit || null,
    sourcePath,
    sourcePaths: normalizedSourcePaths,
    workflowRunId,
    workflowPath,
    workflowJobName,
    checkSuiteId,
    artifactName,
    tags,
    declaredStacks,
    declaredConstraints,
    previewSurface: previewSurface || summary,
    content,
    signerAddress,
    authSessionId: authSession?.authSessionId || null,
    installationId: authSession?.installationId || null,
    installationAccountLogin: authSession?.installationAccountLogin || null,
    installationAccountId: authSession?.installationAccountId || null,
    installationAccountNodeId: authSession?.installationAccountNodeId || null,
    contentRoot,
    addressing,
    authBinding,
    provenance
  };
}

function buildSeedGitHubAppSessions() {
  return [
    buildGitHubAppSession({ repo: 'frontier/demo-auth', installationId: 'gh_inst_engi_demo_001', defaultRef: 'ENGI-auth-issuer-rollback' }),
    buildGitHubAppSession({ repo: 'frontier/payments-ledger', installationId: 'gh_inst_engi_demo_001', defaultRef: 'ENGI-proof-validator-gap' }),
    buildGitHubAppSession({ repo: 'frontier/policy-control-plane', installationId: 'gh_inst_engi_demo_001', defaultRef: 'ENGI-config-policy-precedence' }),
    buildGitHubAppSession({ repo: 'frontier/review-gateway', installationId: 'gh_inst_engi_demo_001', defaultRef: 'ENGI-unsafe-patch-review' }),
    buildGitHubAppSession({ repo: 'frontier/deploy-orchestrator', installationId: 'gh_inst_engi_demo_001', defaultRef: 'ENGI-deployment-drift-rollback' }),
    buildGitHubAppSession({ repo: 'frontier/private-proof-service', installationId: 'gh_inst_engi_demo_001', defaultRef: 'ENGI-bounded-proof-export' }),
    buildGitHubAppSession({ repo: 'frontier/polyglot-gateway', installationId: 'gh_inst_engi_demo_001', defaultRef: 'ENGI-polyglot-gateway-remediation' })
  ];
}

function buildSeedRepoArtifactInventoryEntries(sessions = buildSeedGitHubAppSessions()) {
  const sessionByRepo = Object.fromEntries(sessions.map((session) => [session.repo, session]));
  const withSession = (repo, input) => buildRepoArtifactInventoryEntry({
    repo,
    authSession: sessionByRepo[repo] || null,
    ...input
  });

  return [
    withSession('frontier/demo-auth', {
      artifactKind: 'runbook',
      originKind: 'workflow-artifact',
      title: 'Auth rollback benchmark summary',
      summary: 'Workflow-generated benchmark summary describing issuer mismatch rollback failure slices.',
      sourceCommit: 'auth001abc',
      ref: 'ENGI-auth-issuer-rollback',
      workflowRunId: 'gha_run_auth_001',
      workflowPath: '.github/workflows/benchmark-auth.yml',
      workflowJobName: 'benchmark-auth-remediation',
      artifactName: 'auth-remediation-report.json',
      tags: ['auth', 'rollback', 'benchmark', 'workflow-artifact'],
      declaredStacks: ['typescript', 'node', 'github-actions', 'auth'],
      declaredConstraints: ['preserve session validity', 'emit audit receipt'],
      previewSurface: 'Workflow artifact: auth-remediation-report.json',
      content: 'Workflow artifact report\n- failing: issuer mismatch legacy services\n- weak dimensions: rollback safety, session validity, auditability\n- action: restore verifier compatibility before schema replay'
    }),
    withSession('frontier/demo-auth', {
      artifactKind: 'patch',
      originKind: 'commit-file',
      title: 'Rollback verifier compatibility patch',
      summary: 'Commit file candidate touching rollback handler and verifier restore path.',
      sourceCommit: 'auth001abc',
      ref: 'ENGI-auth-issuer-rollback',
      sourcePath: 'services/auth/rollback.ts',
      tags: ['patch', 'auth', 'rollback'],
      declaredStacks: ['typescript', 'node', 'auth'],
      declaredConstraints: ['restore verifier before schema replay'],
      previewSurface: 'services/auth/rollback.ts',
      content: 'Patch intent\n- restoreLegacyVerifier before schema replay\n- block traffic reopen until issuer compatibility audit passes'
    }),
    withSession('frontier/demo-auth', {
      artifactKind: 'config',
      originKind: 'config-snapshot',
      title: 'Issuer compatibility config snapshot',
      summary: 'Repo config snapshot for issuer compatibility window and rollback kill switch.',
      sourceCommit: 'auth001abc',
      ref: 'ENGI-auth-issuer-rollback',
      sourcePath: 'config/auth/issuer-compat.yml',
      tags: ['config', 'auth', 'compatibility-window'],
      declaredStacks: ['yaml', 'auth'],
      declaredConstraints: ['keep rollback reversible', 'compatibility window required'],
      previewSurface: 'config/auth/issuer-compat.yml',
      content: 'auth:\n  issuer:\n    compatibilityWindow: 30m\n  rollback:\n    killSwitch: true'
    }),
    withSession('frontier/demo-auth', {
      artifactKind: 'proof',
      originKind: 'proof-log',
      title: 'Session validator proof log',
      summary: 'Proof log showing validator invariants and replay safety obligations.',
      sourceCommit: 'auth001abc',
      ref: 'ENGI-auth-issuer-rollback',
      sourcePath: 'proofs/session_validator.creusot.log',
      workflowRunId: 'gha_run_auth_001',
      workflowPath: '.github/workflows/benchmark-auth.yml',
      workflowJobName: 'prove-session-validator',
      tags: ['proof', 'validator', 'creusot'],
      declaredStacks: ['rust', 'formal-methods', 'auth'],
      declaredConstraints: ['no panic', 'preserve session validity'],
      previewSurface: 'proofs/session_validator.creusot.log',
      content: 'Proof log\n- SessionValidator replay window preserved\n- issuer compatibility precondition required before reopen'
    }),
    withSession('frontier/demo-auth', {
      artifactKind: 'incident-note',
      originKind: 'incident-document',
      title: 'Issuer mismatch incident notes',
      summary: 'Incident note capturing operator ordering mistakes and recovery guidance.',
      sourceCommit: 'auth001abc',
      ref: 'ENGI-auth-issuer-rollback',
      sourcePath: 'docs/incidents/auth-issuer-mismatch.md',
      tags: ['incident-response', 'auth', 'runbook'],
      declaredStacks: ['markdown', 'auth'],
      declaredConstraints: ['record operator ordering'],
      previewSurface: 'docs/incidents/auth-issuer-mismatch.md',
      content: 'Incident note\n- failures came from replaying schema before restoring verifier compatibility\n- public proof should omit private verifier details'
    }),
    withSession('frontier/demo-auth', {
      artifactKind: 'patch',
      originKind: 'commit-file',
      title: 'Auth audit receipt patchset',
      summary: 'Receipt-binding patch that records workflow run, commit, and compatibility window together.',
      sourceCommit: 'auth019audit',
      ref: 'ENGI-auth-many-asset-normalization',
      sourcePath: 'services/auth/audit_receipt.ts',
      tags: ['auth', 'auditability', 'patch', 'workflow-binding'],
      declaredStacks: ['typescript', 'node', 'auth', 'github-actions'],
      declaredConstraints: ['emit audit receipt', 'bind workflow run to receipt'],
      previewSurface: 'services/auth/audit_receipt.ts',
      content: 'Patch intent\n- write workflow run and commit into emitAuditReceipt\n- fail closed when rollback receipt linkage is missing'
    }),
    withSession('frontier/payments-ledger', {
      artifactKind: 'proof',
      originKind: 'attestation-bundle',
      title: 'Replay window attestation bundle',
      summary: 'Attestation bundle for validator proof and benchmark rerun.',
      sourceCommit: 'validator014proof',
      ref: 'ENGI-proof-validator-gap',
      workflowRunId: 'gha_run_validator_014',
      workflowPath: '.github/workflows/validator-proof.yml',
      workflowJobName: 'prove-validator',
      artifactName: 'validator-proof-bundle.json',
      tags: ['proof', 'validator', 'attestation'],
      declaredStacks: ['rust', 'cargo', 'formal-methods'],
      declaredConstraints: ['no unchecked arithmetic', 'replay benchmark after proof'],
      previewSurface: 'validator-proof-bundle.json',
      content: 'Attestation bundle\n- proof hash bound to validator replay window\n- benchmark rerun required before settlement eligibility'
    }),
    withSession('frontier/payments-ledger', {
      artifactKind: 'patch',
      originKind: 'commit-file',
      title: 'Replay guard patch',
      summary: 'Patch that hardens nonce-window bounds and overflow checks in the validator path.',
      sourceCommit: 'validator014proof',
      ref: 'ENGI-proof-validator-gap',
      sourcePaths: ['crates/validator/src/session_guard.rs', 'crates/validator/src/replay_window.rs'],
      tags: ['validator', 'patch', 'overflow-safety'],
      declaredStacks: ['rust', 'cargo', 'formal-methods'],
      declaredConstraints: ['no unchecked arithmetic', 'preserve replay protections'],
      previewSurface: 'crates/validator/src/session_guard.rs + crates/validator/src/replay_window.rs',
      content: 'Patch intent\n- guard replay-window math\n- preserve SessionGuard invariants over the full nonce range'
    }),
    withSession('frontier/payments-ledger', {
      artifactKind: 'runbook',
      originKind: 'incident-document',
      title: 'Validator proof recovery runbook',
      summary: 'Operator playbook for rerunning proof plus benchmark after replay-window repair.',
      sourceCommit: 'validator014proof',
      ref: 'ENGI-proof-validator-gap',
      sourcePath: 'docs/runbooks/validator-proof-recovery.md',
      tags: ['validator', 'runbook', 'formal-methods'],
      declaredStacks: ['markdown', 'rust', 'formal-methods'],
      declaredConstraints: ['rerun proof plus benchmark'],
      previewSurface: 'docs/runbooks/validator-proof-recovery.md',
      content: 'Runbook\n- rerun cargo creusot after the patch\n- compare proof hash to benchmark rerun before delivery'
    }),
    withSession('frontier/policy-control-plane', {
      artifactKind: 'config',
      originKind: 'workflow-artifact',
      title: 'Policy precedence benchmark output',
      summary: 'Benchmark output for precedence regression across config policy layers.',
      sourceCommit: 'policy031fix',
      ref: 'ENGI-config-policy-precedence',
      workflowRunId: 'gha_run_policy_031',
      workflowPath: '.github/workflows/policy-benchmark.yml',
      workflowJobName: 'policy-benchmark',
      artifactName: 'policy-precedence-report.json',
      tags: ['policy', 'config', 'workflow-artifact'],
      declaredStacks: ['typescript', 'policy', 'github-actions'],
      declaredConstraints: ['no precedence inversion'],
      previewSurface: 'policy-precedence-report.json',
      content: 'Policy benchmark output\n- precedence inversion detected in layered config merge\n- rollback requires explicit winner ordering receipts'
    }),
    withSession('frontier/policy-control-plane', {
      artifactKind: 'patch',
      originKind: 'commit-file',
      title: 'Policy precedence governor patch',
      summary: 'Patch that rejects undeclared fallback winners and records the chosen policy source.',
      sourceCommit: 'policy031fix',
      ref: 'ENGI-config-policy-precedence',
      sourcePath: 'services/policy/evaluate_rollout.ts',
      tags: ['policy', 'patch', 'governance'],
      declaredStacks: ['typescript', 'node', 'policy'],
      declaredConstraints: ['block silent precedence fallback', 'emit policy audit receipt'],
      previewSurface: 'services/policy/evaluate_rollout.ts',
      content: 'Patch intent\n- make precedence winners explicit\n- attach chosen source to the rollout receipt'
    }),
    withSession('frontier/policy-control-plane', {
      artifactKind: 'runbook',
      originKind: 'incident-document',
      title: 'Policy incident operator runbook',
      summary: 'Runbook for recovering precedence drift without reopening the governance incident.',
      sourceCommit: 'policy031fix',
      ref: 'ENGI-config-policy-precedence',
      sourcePath: 'docs/runbooks/policy-incident.md',
      tags: ['policy', 'runbook', 'incident-response'],
      declaredStacks: ['markdown', 'policy'],
      declaredConstraints: ['preserve approval ordering'],
      previewSurface: 'docs/runbooks/policy-incident.md',
      content: 'Runbook\n- inspect precedence matrix first\n- reject undeclared defaults before rollout resume'
    }),
    withSession('frontier/review-gateway', {
      artifactKind: 'patch',
      originKind: 'pull-request-comment',
      title: 'Unsafe review recovery diff note',
      summary: 'Pull request comment summarizing unsafe patch review recovery steps.',
      sourceCommit: 'review022safe',
      ref: 'ENGI-unsafe-patch-review',
      sourcePath: 'services/review/recovery.ts',
      checkSuiteId: 'checksuite_review_022',
      tags: ['review', 'patch', 'safety'],
      declaredStacks: ['typescript', 'review'],
      declaredConstraints: ['revert unsafe grant path'],
      previewSurface: 'PR comment: unsafe patch review recovery',
      content: 'Review recovery note\n- revert unsafe bypass grant\n- require second reviewer before branch materialization'
    }),
    withSession('frontier/review-gateway', {
      artifactKind: 'runbook',
      originKind: 'incident-document',
      title: 'Unsafe review containment checklist',
      summary: 'Checklist for applying touched-file budgets and reviewer rationale requirements.',
      sourceCommit: 'review022safe',
      ref: 'ENGI-unsafe-patch-review',
      sourcePath: 'docs/reviews/unsafe_patch_containment.md',
      tags: ['review', 'runbook', 'security'],
      declaredStacks: ['markdown', 'security', 'review'],
      declaredConstraints: ['require review rationale', 'preserve rollback path'],
      previewSurface: 'docs/reviews/unsafe_patch_containment.md',
      content: 'Checklist\n- confirm touched-file scope\n- require reviewer rationale\n- reopen the guard benchmark when the patch expands'
    }),
    withSession('frontier/review-gateway', {
      artifactKind: 'proof',
      originKind: 'proof-log',
      title: 'Review gate proof log',
      summary: 'Proof log binding touched-file budgets to rationale enforcement checks.',
      sourceCommit: 'review022safe',
      ref: 'ENGI-unsafe-patch-review',
      sourcePath: 'proofs/review_gate.log',
      workflowRunId: 'gha_run_review_009',
      workflowPath: '.github/workflows/review-guard.yml',
      workflowJobName: 'prove-review-gate',
      tags: ['review', 'proof', 'auditability'],
      declaredStacks: ['typescript', 'security', 'review'],
      declaredConstraints: ['block unsafe patch bypass'],
      previewSurface: 'proofs/review_gate.log',
      content: 'Proof log\n- reviewer rationale must exist before apply\n- touched-file budgets stay bound to the review receipt'
    }),
    withSession('frontier/deploy-orchestrator', {
      artifactKind: 'runbook',
      originKind: 'workflow-artifact',
      title: 'Deployment drift incident runbook',
      summary: 'Workflow artifact describing deployment drift rollback and validation ordering.',
      sourceCommit: 'deploy404rollback',
      ref: 'ENGI-deployment-drift-rollback',
      workflowRunId: 'gha_run_deploy_404',
      workflowPath: '.github/workflows/deploy-drift.yml',
      workflowJobName: 'rollback-drift',
      artifactName: 'deploy-drift-report.json',
      tags: ['deployment', 'drift', 'rollback'],
      declaredStacks: ['kubernetes', 'typescript', 'github-actions'],
      declaredConstraints: ['restore config before traffic reopen'],
      previewSurface: 'deploy-drift-report.json',
      content: 'Deployment drift report\n- config drift and rollout drift diverged\n- rollback requires environment receipt closure before reopen'
    }),
    withSession('frontier/deploy-orchestrator', {
      artifactKind: 'config',
      originKind: 'config-snapshot',
      title: 'Deployment drift config snapshot',
      summary: 'Combined Helm and Terraform config snapshot for the rollback window.',
      sourceCommit: 'deploy404rollback',
      ref: 'ENGI-deployment-drift-rollback',
      sourcePaths: ['deploy/helm/auth/values.yaml', 'infra/terraform/services/auth/main.tf'],
      tags: ['deployment', 'config', 'rollback'],
      declaredStacks: ['terraform', 'helm', 'kubernetes'],
      declaredConstraints: ['restore config before traffic reopen'],
      previewSurface: 'deploy/helm/auth/values.yaml + infra/terraform/services/auth/main.tf',
      content: 'Config snapshot\n- expected chart version and Terraform state must agree before reopen'
    }),
    withSession('frontier/deploy-orchestrator', {
      artifactKind: 'patch',
      originKind: 'commit-file',
      title: 'Deployment release parity patch',
      summary: 'Patch that rebinds release receipts to the reconciled chart and infra revisions.',
      sourceCommit: 'deploy404rollback',
      ref: 'ENGI-deployment-drift-rollback',
      sourcePath: 'services/deploy/reconcile_release.ts',
      tags: ['deployment', 'patch', 'receipt-binding'],
      declaredStacks: ['typescript', 'kubernetes', 'infra'],
      declaredConstraints: ['emit deployment receipt', 'keep rollout reversible'],
      previewSurface: 'services/deploy/reconcile_release.ts',
      content: 'Patch intent\n- attach chart and infra revisions to the rollback receipt\n- stop traffic reopen until parity is proven'
    }),
    withSession('frontier/private-proof-service', {
      artifactKind: 'proof',
      originKind: 'workflow-artifact',
      title: 'Bounded proof export witness bundle',
      summary: 'Witness bundle for public proof export and redaction closure.',
      sourceCommit: 'privacy065proof',
      ref: 'ENGI-bounded-proof-export',
      workflowRunId: 'gha_run_privacy_065',
      workflowPath: '.github/workflows/privacy-proof.yml',
      workflowJobName: 'bounded-proof-export',
      artifactName: 'bounded-proof-export.json',
      tags: ['privacy', 'proof', 'redaction'],
      declaredStacks: ['typescript', 'privacy', 'proof'],
      declaredConstraints: ['bounded public metadata only'],
      previewSurface: 'bounded-proof-export.json',
      content: 'Bounded proof export witness\n- public projection excludes private branch artifacts\n- redaction proof hash matches disclosure proof hash'
    }),
    withSession('frontier/private-proof-service', {
      artifactKind: 'patch',
      originKind: 'commit-file',
      title: 'Bounded proof redaction patch',
      summary: 'Patch that tightens redaction defaults before public proof export.',
      sourceCommit: 'projection006bound',
      ref: 'ENGI-bounded-proof-export',
      sourcePath: 'services/redaction/project_public_proof.ts',
      tags: ['privacy', 'patch', 'redaction'],
      declaredStacks: ['typescript', 'privacy', 'policy'],
      declaredConstraints: ['no private artifact leak'],
      previewSurface: 'services/redaction/project_public_proof.ts',
      content: 'Patch intent\n- derive public proof strictly from bounded metadata\n- reject any private artifact that survives projection'
    }),
    withSession('frontier/private-proof-service', {
      artifactKind: 'runbook',
      originKind: 'incident-document',
      title: 'Public proof disclosure runbook',
      summary: 'Runbook for replaying disclosure decisions before publishing bounded proof output.',
      sourceCommit: 'projection006bound',
      ref: 'ENGI-bounded-proof-export',
      sourcePath: 'docs/runbooks/public-proof-disclosure.md',
      tags: ['privacy', 'runbook', 'disclosure'],
      declaredStacks: ['markdown', 'privacy', 'policy'],
      declaredConstraints: ['replay disclosure decisions'],
      previewSurface: 'docs/runbooks/public-proof-disclosure.md',
      content: 'Runbook\n- compare projection policy to public artifact inventory\n- publish only after disclosure proof hashes replay cleanly'
    }),
    withSession('frontier/polyglot-gateway', {
      artifactKind: 'patch',
      originKind: 'commit-file',
      title: 'Polyglot gateway rollback patchset',
      summary: 'Patchset coordinating TypeScript, Python, and Rust rollback surfaces.',
      sourceCommit: 'gateway117poly',
      ref: 'ENGI-polyglot-gateway-remediation',
      sourcePaths: ['api/server.ts', 'workers/session_replay.py', 'crates/token_bridge/src/lib.rs'],
      tags: ['polyglot', 'gateway', 'rollback'],
      declaredStacks: ['typescript', 'python', 'rust', 'gateway'],
      declaredConstraints: ['preserve cross-language parity', 'emit audit receipt'],
      previewSurface: 'api/server.ts + workers/session_replay.py + crates/token_bridge/src/lib.rs',
      content: 'Polyglot rollback patchset\n- coordinate issuer rollback across API, replay worker, and token bridge\n- reopen traffic only after parity benchmark rerun'
    }),
    withSession('frontier/polyglot-gateway', {
      artifactKind: 'runbook',
      originKind: 'incident-document',
      title: 'Polyglot rollback runbook',
      summary: 'Runbook for coordinating TypeScript, Python, and Rust rollback sequencing.',
      sourceCommit: 'gateway117poly',
      ref: 'ENGI-polyglot-gateway-remediation',
      sourcePath: 'docs/runbooks/polyglot_gateway_rollback.md',
      tags: ['polyglot', 'runbook', 'gateway'],
      declaredStacks: ['markdown', 'typescript', 'python', 'rust'],
      declaredConstraints: ['preserve cross-language parity', 'keep rollback reversible'],
      previewSurface: 'docs/runbooks/polyglot_gateway_rollback.md',
      content: 'Runbook\n- freeze session replay\n- coordinate rollback across API, worker, and bridge\n- reopen only after parity rerun'
    }),
    withSession('frontier/polyglot-gateway', {
      artifactKind: 'config',
      originKind: 'config-snapshot',
      title: 'Cross-language receipt config snapshot',
      summary: 'Config snapshot for rollback window and cross-language receipt requirements.',
      sourceCommit: 'gateway117poly',
      ref: 'ENGI-polyglot-gateway-remediation',
      sourcePath: 'config/gateway/issuer_policy.yml',
      tags: ['polyglot', 'config', 'gateway'],
      declaredStacks: ['yaml', 'gateway', 'policy'],
      declaredConstraints: ['emit audit receipt', 'preserve cross-language parity'],
      previewSurface: 'config/gateway/issuer_policy.yml',
      content: 'gateway:\n  issuer:\n    rollbackWindowSeconds: 300\n  audit:\n    requireCrossLanguageReceipt: true'
    }),
    withSession('frontier/polyglot-gateway', {
      artifactKind: 'proof',
      originKind: 'proof-log',
      title: 'Gateway parity proof log',
      summary: 'Proof log showing TypeScript, Python, and Rust rollback paths stay aligned.',
      sourceCommit: 'gateway117poly',
      ref: 'ENGI-polyglot-gateway-remediation',
      sourcePath: 'proofs/gateway_parity.log',
      workflowRunId: 'gha_run_gateway_021',
      workflowPath: '.github/workflows/gateway-benchmark.yml',
      workflowJobName: 'prove-gateway-parity',
      tags: ['polyglot', 'proof', 'gateway'],
      declaredStacks: ['typescript', 'python', 'rust', 'gateway'],
      declaredConstraints: ['preserve cross-language parity'],
      previewSurface: 'proofs/gateway_parity.log',
      content: 'Proof log\n- server.ts, session_replay.py, and token bridge preserve the same rollback window\n- cross-language receipts share the same parity root'
    })
  ];
}

function inventorySourcePaths(selectedInventoryEntries = [], fallbackPaths = []) {
  return summarizeStrings([
    ...selectedInventoryEntries.flatMap((entry) => entry.sourcePaths || []),
    ...fallbackPaths
  ]);
}

function hasExplicitRawFallbackContent(input, selectedInventoryEntries = []) {
  if (typeof input.rawFallbackUsed === 'boolean') return input.rawFallbackUsed;
  if (input.rawFallbackContent !== undefined) return !!String(input.rawFallbackContent || '').trim();
  if (selectedInventoryEntries.length && input.contentDerivedFromSelection !== false) return false;
  return !!String(input.content || '').trim();
}

function resolveArtifactIntakeMode(input, selectedInventoryEntries) {
  const hasInventorySelection = selectedInventoryEntries.length > 0;
  const hasRawFallback = hasExplicitRawFallbackContent(input, selectedInventoryEntries);
  const hasOperatorNote = !!String(input.operatorNote || '').trim();
  if (hasInventorySelection && (hasOperatorNote || hasRawFallback)) return 'repo-artifact-selection-plus-note';
  if (hasInventorySelection) return 'repo-artifact-selection';
  return 'raw-fallback';
}

function buildArtifactSelectionSurface(input, selectedInventoryEntries = [], artifactKind) {
  const intakeMode = resolveArtifactIntakeMode(input, selectedInventoryEntries);
  const selectedInventoryEntriesSnapshot = selectedInventoryEntries.map(inventorySelectionSnapshot);
  const selectedRepos = summarizeStrings(selectedInventoryEntriesSnapshot.map((entry) => entry.repo));
  const selectedArtifactKinds = summarizeStrings(selectedInventoryEntries.map((entry) => entry.artifactKind).concat(artifactKind ? [artifactKind] : []));
  const selectedOriginKinds = summarizeStrings(selectedInventoryEntries.map((entry) => entry.originKind));
  const selectedArtifactKindCounts = countValues(selectedInventoryEntries.map((entry) => entry.artifactKind));
  if (artifactKind && !selectedArtifactKindCounts[artifactKind]) selectedArtifactKindCounts[artifactKind] = 1;
  const selectedOriginKindCounts = countValues(selectedInventoryEntries.map((entry) => entry.originKind));
  const rawFallbackUsed = hasExplicitRawFallbackContent(input, selectedInventoryEntries);
  return {
    intakeMode,
    authSessionId: input.authSession?.authSessionId || input.authSessionId || null,
    selectedRepo: selectedRepos[0] || input.sourceRepo || input.authSession?.repo || null,
    selectedRepositoryId: input.authSession?.repositoryId || selectedInventoryEntriesSnapshot[0]?.repositoryId || null,
    selectedInventoryEntryIds: selectedInventoryEntriesSnapshot.map((entry) => entry.inventoryEntryId),
    selectedInventoryEntries: selectedInventoryEntriesSnapshot,
    selectedInventoryRoot: stableHashObject(selectedInventoryEntriesSnapshot),
    selectedArtifactKinds,
    selectedArtifactKindCounts,
    selectedOriginKinds,
    selectedOriginKindCounts,
    rawFallbackUsed,
    appendedOperatorNote: !!String(input.operatorNote || '').trim(),
    selectionLabel: selectedInventoryEntriesSnapshot.length
      ? `${selectedInventoryEntriesSnapshot.length} repo artifacts from ${selectedRepos[0]}`
      : 'raw fallback content only'
  };
}

function buildAddressingSurface(input, selectedInventoryEntries = [], extracted) {
  const repo = input.sourceRepo || input.authSession?.repo || selectedInventoryEntries[0]?.repo || 'frontier/demo-auth';
  const repoIdentity = buildRepoIdentity(repo);
  const normalizedSourcePaths = inventorySourcePaths(selectedInventoryEntries, input.sourcePaths || extracted.paths);
  const commit =
    input.sourceCommit
    || selectedInventoryEntries.find((entry) => entry.sourceCommit)?.sourceCommit
    || null;
  const workflowRunId =
    input.workflowRunId
    || selectedInventoryEntries.find((entry) => entry.workflowRunId)?.workflowRunId
    || null;
  const workflowPath =
    input.workflowPath
    || selectedInventoryEntries.find((entry) => entry.workflowPath)?.workflowPath
    || null;
  const workflowJobName =
    input.workflowJobName
    || selectedInventoryEntries.find((entry) => entry.workflowJobName)?.workflowJobName
    || null;

  let addressingScope = 'repo';
  if (selectedInventoryEntries.length > 1) addressingScope = 'multi-artifact-selection';
  else if (workflowRunId) addressingScope = selectedInventoryEntries[0]?.originKind === 'workflow-artifact' ? 'workflow-artifact' : 'workflow-run';
  else if (normalizedSourcePaths.length) addressingScope = normalizedSourcePaths.length > 1 ? 'multi-artifact-selection' : 'repo-file';
  else if (commit) addressingScope = 'repo-commit';
  const addressedInventoryEntries = selectedInventoryEntries.map((entry) => {
    const addressing = entry.addressing || buildInventoryAddressingSurface(entry);
    return {
      inventoryEntryId: entry.inventoryEntryId,
      artifactKind: entry.artifactKind,
      artifactType: entry.artifactType,
      originKind: entry.originKind,
      primaryAddressRef: addressing.primaryAddressRef,
      contentRoot: entry.contentRoot || null,
      addressingRoot: addressing.addressingRoot
    };
  });
  const surface = {
    addressingScope,
    repo,
    owner: repoIdentity.owner,
    repoName: repoIdentity.name,
    repositoryId: repoIdentity.repositoryId,
    repositoryNodeId: repoIdentity.repositoryNodeId,
    ref: input.sourceRef || input.authSession?.defaultRef || selectedInventoryEntries.find((entry) => entry.ref)?.ref || null,
    commit,
    workflowRunId,
    workflowPath,
    workflowJobName,
    sourcePaths: normalizedSourcePaths,
    selectedInventoryEntryIds: selectedInventoryEntries.map((entry) => entry.inventoryEntryId),
    selectedInventoryAddressRefs: addressedInventoryEntries.map((entry) => entry.primaryAddressRef),
    addressedInventoryEntries,
    primaryAddressRef: normalizedSourcePaths[0] || addressedInventoryEntries[0]?.primaryAddressRef || workflowRunId || commit || repo
  };
  return {
    ...surface,
    addressingRoot: stableHashObject(surface)
  };
}

function buildSigningSurface(input, assetId, contentRoot, addressingSurface, artifactSelectionSurface, githubAppAuthSurface) {
  const signerAddress = input.signerAddress || input.authSession?.defaultSignerAddress || `did:key:${toSlug(input.author)}`;
  const signingAlgorithm = input.signingAlgorithm || input.authSession?.signingAlgorithm || 'ed25519';
  const keySource = input.keySource || input.authSession?.keySource || 'manual-upload-key';
  const signedStatement = {
    statementKind: 'engi-asset-intake-attestation.v11',
    assetId,
    contentRoot,
    repo: addressingSurface.repo,
    addressingRoot: addressingSurface.addressingRoot,
    selectionRoot: artifactSelectionSurface.selectedInventoryRoot,
    githubAppAuthRoot: githubAppAuthSurface.authPayloadHash,
    signerAddress,
    signingAlgorithm
  };
  return {
    signerAddress,
    signerClass: 'issuer-principal',
    signingAlgorithm,
    keySource,
    statementKind: signedStatement.statementKind,
    payloadHash: stableHashObject(signedStatement),
    signatureChecksPass: input.signatureChecksPass !== false,
    signedPayloadHashMatchesContentRoot: input.signedPayloadHashMatchesContentRoot !== false,
    attestationHash: stableHashObject({ signerAddress, signingAlgorithm, payloadHash: stableHashObject(signedStatement) }),
    signedAddressingRoot: addressingSurface.addressingRoot,
    signedSelectionRoot: artifactSelectionSurface.selectedInventoryRoot,
    signedGitHubAppAuthRoot: githubAppAuthSurface.authPayloadHash
  };
}

function buildGitHubAppAuthSurface(input, selectedInventoryEntries = []) {
  const authSession = input.authSession || null;
  const repo = input.sourceRepo || authSession?.repo || selectedInventoryEntries[0]?.repo || 'frontier/demo-auth';
  const repoIdentity = buildRepoIdentity(repo);
  const manualPermissions = {};
  if (!authSession) {
    const surfaceCore = {
      authMechanism: 'manual-unbound',
      authSessionId: null,
      appId: null,
      appSlug: null,
      installationId: input.installationId || null,
      installationAccountLogin: null,
      installationAccountId: null,
      installationAccountNodeId: null,
      installationAccountType: null,
      operatorLogin: null,
      owner: repoIdentity.owner,
      repoName: repoIdentity.name,
      repositoryId: repoIdentity.repositoryId,
      repositoryNodeId: repoIdentity.repositoryNodeId,
      repositoryVisibility: 'private',
      repositorySelection: 'selected',
      permissions: manualPermissions,
      permissionsRoot: stableHashObject(manualPermissions),
      tokenBoundary: {
        mintingState: 'manual-unbound',
        tokenMaterialPresent: false,
        modeledOnly: false,
        liveExchangeImplemented: false,
        repo,
        installationId: input.installationId || null,
        readableScopes: [],
        writableScopes: []
      },
      ...buildBoundaryDescriptions(
        'No authenticated GitHub App session is bound to this raw/manual candidate asset.',
        'A production flow would require a real installation-scoped GitHub App token for repository inventory selection.'
      )
    };
    return {
      ...surfaceCore,
      authPayloadHash: stableHashObject(surfaceCore)
    };
  }
  const surfaceCore = {
    authMechanism: authSession.authMechanism,
    authSessionId: authSession.authSessionId,
    appId: authSession.appId,
    appSlug: authSession.appSlug,
    installationId: authSession.installationId,
    installationAccountLogin: authSession.installationAccountLogin,
    installationAccountId: authSession.installationAccountId,
    installationAccountNodeId: authSession.installationAccountNodeId,
    installationAccountType: authSession.installationAccountType,
    operatorLogin: authSession.operatorLogin,
    owner: authSession.owner,
    repoName: authSession.repoName,
    repositoryId: authSession.repositoryId,
    repositoryNodeId: authSession.repositoryNodeId,
    repositoryVisibility: authSession.repositoryVisibility,
    repositorySelection: authSession.repositorySelection,
    permissions: authSession.permissions,
    permissionsRoot: authSession.permissionsRoot,
    sessionIssuedAt: authSession.sessionIssuedAt,
    sessionExpiresAt: authSession.sessionExpiresAt,
    tokenBoundary: authSession.tokenBoundary,
    ...buildBoundaryDescriptions(
      authSession.localBoundary || authSession.profileABoundary,
      authSession.externalBoundary || authSession.profileBBoundary
    )
  };
  return {
    ...surfaceCore,
    authPayloadHash: authSession.authPayloadHash || stableHashObject(surfaceCore)
  };
}

function buildArtifactUploadSurface(input, content, extracted, artifactKind, artifactType, selectedInventoryEntries = []) {
  const visualPreview = String(input.visualPreview || input.summary || content.split(/\n\s*\n/g)[0] || content).slice(0, 320);
  const artifactSelectionSurface = buildArtifactSelectionSurface(input, selectedInventoryEntries, artifactKind);
  return {
    uploadId: `upload_${sha256(`${input.title}:${content}`).slice(0, 12)}`,
    artifactKind,
    artifactType,
    artifactSelectionSurface,
    precision: {
      kindDeterminedBy: input.artifactKind ? 'user-specified' : 'defaulted',
      typeDeterminedBy: input.artifactType ? 'user-specified' : 'kind-mapped',
      sourceSignalCounts: {
        symbols: extracted.symbols.length,
        paths: extracted.paths.length,
        configKeys: extracted.configKeys.length
      },
      inventorySelectionCount: selectedInventoryEntries.length,
      inventorySelectionRoot: artifactSelectionSurface.selectedInventoryRoot
    },
    surfaces: [
      { surfaceId: 'visual-preview', mediaType: 'text/markdown', role: 'visual', available: !!visualPreview, valuePreview: visualPreview },
      { surfaceId: 'raw-content', mediaType: 'text/plain', role: 'raw', available: !!content, valuePreview: content.slice(0, 220) },
      { surfaceId: 'code-analysis-summary', mediaType: 'application/json', role: 'derived', available: true, valuePreview: JSON.stringify({ symbols: extracted.symbols.length, paths: extracted.paths.length, configKeys: extracted.configKeys.length }) },
      { surfaceId: 'repo-artifact-selection', mediaType: 'application/json', role: 'selection', available: selectedInventoryEntries.length > 0, valuePreview: JSON.stringify({ selectedInventoryEntryIds: selectedInventoryEntries.map((entry) => entry.inventoryEntryId), selectedInventoryRoot: artifactSelectionSurface.selectedInventoryRoot, originKinds: summarizeStrings(selectedInventoryEntries.map((entry) => entry.originKind)) }) }
    ],
    githubBinding: {
      sourceProvider: input.sourceProvider || 'github',
      sourceRepo: input.sourceRepo || input.authSession?.repo || selectedInventoryEntries[0]?.repo || 'frontier/demo-auth',
      sourceCommit: input.sourceCommit || selectedInventoryEntries.find((entry) => entry.sourceCommit)?.sourceCommit || null,
      workflowRunId: input.workflowRunId || selectedInventoryEntries.find((entry) => entry.workflowRunId)?.workflowRunId || null,
      workflowPath: input.workflowPath || selectedInventoryEntries.find((entry) => entry.workflowPath)?.workflowPath || null,
      authSessionId: input.authSession?.authSessionId || null,
      repositoryId: input.authSession?.repositoryId || null,
      repositoryNodeId: input.authSession?.repositoryNodeId || null,
      selectedInventoryEntryIds: selectedInventoryEntries.map((entry) => entry.inventoryEntryId),
      selectedInventoryRoot: artifactSelectionSurface.selectedInventoryRoot,
      authPayloadHash: input.authSession?.authPayloadHash || null,
      ...buildBoundaryDescriptions(
        'Stored locally as modeled metadata only.',
        'Would bind to real GitHub/App installation objects and remote fetches.'
      )
    }
  };
}

function buildExternalBoundaryManifest({ buyer, need, selectedCandidates, assetPack, settlementPreview }) {
  const selectedGithubBindings = selectedCandidates.map((candidate) => ({
    assetId: candidate.assetId,
    sourceRepo: candidate.asset.githubBoundary?.sourceRepo,
    workflowRunId: candidate.asset.githubBoundary?.workflowRunId,
    sourceCommit: candidate.asset.githubBoundary?.sourceCommit
  }));

  return {
    conformanceProfile: PROFILE_A,
    productionIntentProfile: PROFILE_B,
    repo: buyer.repo,
    assetPackId: assetPack.assetPackId,
    bundleId: settlementPreview.bundleId,
    interfaces: [
      buildExternalBoundaryInterface({
        interfaceId: 'github-app-auth',
        label: 'GitHub App auth + installation context',
        status: 'modeled-local-boundary',
        localPrototype: { implemented: true, surface: 'modeled installation ID + repo binding only', artifactRefs: ['.engi/github-boundary.json', '.engi/external-boundary-manifest.json'] },
        externalBoundary: { implemented: false, requiredForLive: true, contract: ['exchange app JWT for installation token', 'bind installation to buyer repo + branch permissions', 'record token expiry + scope envelope'], boundaryArtifacts: ['github.installation-binding', 'github.installation-token-envelope'] }
      }),
      buildExternalBoundaryInterface({
        interfaceId: 'workflow-artifact-fetch',
        label: 'Workflow artifact fetch + benchmark evidence',
        status: 'partially-localized',
        localPrototype: { implemented: true, surface: 'canonical run evidence is seeded locally and bound to need measurement', artifactRefs: ['.engi/need-measurement.json', '.engi/benchmark-target.json'] },
        externalBoundary: { implemented: false, requiredForLive: true, contract: ['fetch workflow artifacts by run ID', 'verify artifact media type + digest', 'normalize benchmark outputs fail-closed'], boundaryArtifacts: ['github.workflow-fetch-request', 'github.workflow-fetch-response', 'benchmark.canonical-output-manifest'] }
      }),
      buildExternalBoundaryInterface({
        interfaceId: 'branch-pr-actions',
        label: 'Branch / PR / comment / review actions',
        status: 'modeled-local-boundary',
        localPrototype: { implemented: true, surface: 'artifacts specify intended branch outputs without live writes', artifactRefs: ['.engi/deliverables.json', '.engi/profile-composition.json'] },
        externalBoundary: { implemented: false, requiredForLive: true, contract: ['create/update branch', 'push materialized artifacts', 'open or update PR', 'publish comments / review annotations'], boundaryArtifacts: ['github.branch-action-request', 'github.pr-action-request', 'github.review-action-request'] }
      }),
      buildExternalBoundaryInterface({
        interfaceId: 'model-execution',
        label: 'Prompt execution + evaluator routing',
        status: 'implemented-as-stand-in',
        localPrototype: { implemented: true, surface: 'deterministic stand-in evaluator and prompt replay metadata', artifactRefs: ['.engi/eval-manifest.json', '.engi/prompt-surfaces.json', '.engi/system-proof-bundle.json'] },
        externalBoundary: { implemented: false, requiredForLive: true, contract: ['select model/provider', 'execute prompt with trace capture', 'bind output to evaluator receipt + prompt hash'], boundaryArtifacts: ['model.execution-request', 'model.execution-receipt', 'model.trace-manifest'] }
      }),
      buildExternalBoundaryInterface({
        interfaceId: 'vector-store',
        label: 'Embedding + vector retrieval substrate',
        status: 'implemented-as-local-stand-in',
        localPrototype: { implemented: true, surface: 'local deterministic vectors and recall contracts', artifactRefs: ['.engi/unit-catalog.json', '.engi/eval-manifest.json'] },
        externalBoundary: { implemented: false, requiredForLive: true, contract: ['upsert embedding documents', 'execute filtered similarity search', 'bind vector space/version metadata'], boundaryArtifacts: ['vector.upsert-manifest', 'vector.search-request', 'vector.search-response'] }
      }),
      buildExternalBoundaryInterface({
        interfaceId: 'signer-verification',
        label: 'Signer / identity verification',
        status: 'modeled-local-boundary',
        localPrototype: { implemented: true, surface: 'modeled signer bindings, attestation checks, and policy gates', artifactRefs: ['.engi/identity-bindings.json', '.engi/verification-report.json'] },
        externalBoundary: { implemented: false, requiredForLive: true, contract: ['resolve signer identity', 'verify attestation chain', 'bind signer to org / repo authority'], boundaryArtifacts: ['identity.resolve-request', 'identity.verification-receipt', 'signer.authority-binding'] }
      }),
      buildExternalBoundaryInterface({
        interfaceId: 'settlement-network-effects',
        label: 'Settlement execution + network effects',
        status: 'implemented-as-local-accounting-only',
        localPrototype: { implemented: true, surface: 'deterministic journal diff + exact accounting invariants', artifactRefs: ['.engi/settlement-preview.json', '.engi/settlement-proof.json', '.engi/journal-diff.json'] },
        externalBoundary: { implemented: false, requiredForLive: true, contract: ['submit settlement transaction', 'wait for network confirmation', 'publish claim / redemption events'], boundaryArtifacts: ['settlement.execution-request', 'settlement.execution-receipt', 'settlement.network-observation'] }
      })
    ],
    selectedGithubBindings
  };
}

function buildRecallChannelContracts() {
  return needMeasurementRuntime.buildRecallChannelContracts();
}

function allowedUseTiersForBranchMode(branchMode) {
  return evaluationMaterializationRuntime.allowedUseTiersForBranchMode(branchMode);
}

function useTierRights(useTier, branchMode) {
  return evaluationMaterializationRuntime.useTierRights(useTier, branchMode);
}

function derivationRecord({ field, source, policy = 'required', confidence = NormalizationPressure.HIGH, evidenceRefs = [], notes }) {
  return {
    field,
    source,
    policy,
    confidence,
    evidenceRefs: summarizeStrings(evidenceRefs),
    ...(notes ? { notes } : {})
  };
}

function normalizeCaseId(value) {
  return toSlug(value).replace(/-/g, '-');
}

function normalizeWeakDimension(value) {
  return toSlug(value).replace(/-/g, '-');
}

function makeAuthorizationDecision(binding, action, resourceRef, policyState) {
  if (!binding) {
    return {
      principalId: 'unknown',
      action,
      resourceRef,
      decision: 'deny',
      policyRef: DEFAULT_POLICY_REF,
      reasons: ['No identity binding found for requested action.']
    };
  }
  const classRules = policyState.authorizationMatrix[binding.principalClass] || {};
  const rule = classRules[action] || { allow: false, policyRef: DEFAULT_POLICY_REF, reasons: ['No explicit authorization rule.'] };
  return {
    principalId: binding.principalId,
    action,
    resourceRef,
    decision: rule.allow ? 'allow' : 'deny',
    policyRef: rule.policyRef || DEFAULT_POLICY_REF,
    reasons: rule.reasons || []
  };
}

function buildPolicyState() {
  return {
    policyRef: DEFAULT_POLICY_REF,
    releaseId: 'policy-release-engi-v11-demo-2026-04-03',
    retentionPolicies: {
      'retention/private-remediation-30d': {
        retentionPolicyId: 'retention/private-remediation-30d',
        appliesTo: ['repo-private-source', 'licensed-source-material', 'private-branch-derived-artifact', 'verification-evidence', 'settlement-preview', 'private-proof-artifact'],
        retentionWindowDays: 30,
        cleanupAction: 'disable-branch-and-expire-private-artifacts'
      },
      'retention/bounded-public-365d': {
        retentionPolicyId: 'retention/bounded-public-365d',
        appliesTo: ['bounded-public-proof-metadata'],
        retentionWindowDays: 365,
        cleanupAction: 'preserve-bounded-proof-metadata'
      }
    },
    disclosurePolicies: {
      'disclosure/private-only': {
        disclosurePolicyId: 'disclosure/private-only',
        allowedPublic: false,
        revocationBehavior: 'revoke-read-access-and-hide-private-branch'
      },
      'disclosure/bounded-public': {
        disclosurePolicyId: 'disclosure/bounded-public',
        allowedPublic: true,
        revocationBehavior: 'retain-hashes-only'
      }
    },
    issuers: {
      allowed: ['did:key:garrett', 'did:key:eve'],
      restricted: ['did:key:avery'],
      revoked: []
    },
    issuerHistory: {
      'did:key:garrett': { accepted: 7, revoked: 0 },
      'did:key:eve': { accepted: 5, revoked: 0 },
      'did:key:avery': { accepted: 1, revoked: 0 }
    },
    authorizationMatrix: {
      'buyer-principal': {
        'read:private-branch': { allow: true, policyRef: DEFAULT_POLICY_REF, reasons: ['Buyer principal may inspect private remediation delivery.'] },
        'materialize:selected-source-material': { allow: true, policyRef: DEFAULT_POLICY_REF, reasons: ['Buyer event authorizes licensed source material to be staged into the private branch.'] },
        'settle:journal-event': { allow: true, policyRef: DEFAULT_POLICY_REF, reasons: ['Buyer principal may authorize the fixed local settlement event.'] },
        'derive:bounded-public-proof-metadata': { allow: false, policyRef: DEFAULT_POLICY_REF, reasons: ['Buyer principals do not publish bounded public proof metadata directly.'] },
        'read:bounded-public-proof': { allow: true, policyRef: DEFAULT_POLICY_REF, reasons: ['Buyer may inspect bounded public proof metadata.'] },
        'open:delivery': { allow: false, policyRef: DEFAULT_POLICY_REF, reasons: ['Delivery-open is blocked in the deterministic local prototype.'] }
      },
      'engi-system-principal': {
        'read:private-branch': { allow: true, policyRef: DEFAULT_POLICY_REF, reasons: ['ENGI system principal materializes private artifacts.'] },
        'materialize:selected-source-material': { allow: true, policyRef: DEFAULT_POLICY_REF, reasons: ['ENGI branch materializer may stage selected source material under .engi/source-material/.'] },
        'settle:journal-event': { allow: true, policyRef: DEFAULT_POLICY_REF, reasons: ['ENGI settlement engine executes deterministic journal settlement.'] },
        'write:private-branch': { allow: true, policyRef: DEFAULT_POLICY_REF, reasons: ['ENGI system principal stages remediation artifacts.'] },
        'derive:bounded-public-proof-metadata': { allow: true, policyRef: DEFAULT_POLICY_REF, reasons: ['ENGI proof publisher may derive bounded proof metadata from the private proof surface.'] },
        'read:bounded-public-proof': { allow: true, policyRef: DEFAULT_POLICY_REF, reasons: ['ENGI system principal may inspect bounded proof metadata.'] }
      },
      'github-app-installation-principal': {
        'read:repo-artifact-inventory': { allow: true, policyRef: DEFAULT_POLICY_REF, reasons: ['Installation-scoped GitHub App session may enumerate repository artifact inventory.'] },
        'read:private-branch': { allow: false, policyRef: DEFAULT_POLICY_REF, reasons: ['GitHub App installation sessions do not gain private branch read by default in the local demo.'] },
        'write:private-branch': { allow: false, policyRef: DEFAULT_POLICY_REF, reasons: ['GitHub App installation sessions are modeled as intake auth, not branch writers.'] },
        'settle:journal-event': { allow: false, policyRef: DEFAULT_POLICY_REF, reasons: ['GitHub App installation sessions cannot trigger settlement.'] }
      },
      'authorized-reviewer': {
        'read:private-branch': { allow: true, policyRef: DEFAULT_POLICY_REF, reasons: ['Authorized reviewer access is allowed under private review policy.'] },
        'settle:journal-event': { allow: false, policyRef: DEFAULT_POLICY_REF, reasons: ['Authorized reviewers may not trigger settlement.'] }
      },
      'issuer-principal': {
        'read:private-branch': { allow: false, policyRef: DEFAULT_POLICY_REF, reasons: ['Issuers do not gain read access by default.'] },
        'settle:journal-event': { allow: false, policyRef: DEFAULT_POLICY_REF, reasons: ['Issuers cannot self-settle the buyer event.'] }
      },
      'public-reader': {
        'read:bounded-public-proof': { allow: true, policyRef: DEFAULT_POLICY_REF, reasons: ['Only bounded public proof metadata may be public.'] },
        'read:private-branch': { allow: false, policyRef: DEFAULT_POLICY_REF, reasons: ['Private remediation material is never public by default.'] }
      }
    },
    revokedResourceRefs: [],
    revocationPolicy: {
      settlementOpenBlockedWhenRevoked: true,
      deliveryOpenBlockedWhenRevoked: true
    }
  };
}

function buildPolicyRelease(policyState) {
  return {
    releaseId: policyState.releaseId,
    policyRef: policyState.policyRef,
    conformanceProfile: PROFILE_A,
    productionIntentProfile: PROFILE_B,
    prototypeOnlyModeledControls: true,
    issuerClasses: {
      allowed: policyState.issuers.allowed.length,
      restricted: policyState.issuers.restricted.length,
      revoked: policyState.issuers.revoked.length
    },
    retentionPolicyIds: Object.keys(policyState.retentionPolicies),
    disclosurePolicyIds: Object.keys(policyState.disclosurePolicies),
    revocationRules: policyState.revocationPolicy
  };
}

function buildGithubActionsBenchmarkParser() {
  return {
    parserKind: 'github-actions.auth-remediation.v3',
    parserVersion: '3.0.0',
    parse(runEvidence) {
      const extracted = runEvidence?.extractedOutputs || {};
      return {
        failingCases: summarizeStrings((extracted.failingCases || []).map(normalizeCaseId)),
        weakDimensions: summarizeStrings((extracted.weakDimensions || []).map(normalizeWeakDimension)),
        baselineMetrics: extracted.baselineMetrics || {},
        touchedPaths: summarizeStrings(extracted.touchedPaths || []),
        symbols: summarizeStrings(extracted.symbols || []),
        configKeys: summarizeStrings(extracted.configKeys || []),
        parserKind: this.parserKind,
        parserVersion: this.parserVersion,
        consumedInputs: {
          artifactNames: summarizeStrings((runEvidence?.artifacts || []).map((artifact) => artifact.name)),
          checkNames: summarizeStrings((runEvidence?.checks || []).map((check) => check.name)),
          workflowPath: runEvidence?.workflowPath || '',
          runId: runEvidence?.runId || ''
        }
      };
    },
    validate(outputs) {
      const reasons = [];
      if (!outputs?.parserKind) reasons.push('parserKind missing');
      if (!outputs?.parserVersion) reasons.push('parserVersion missing');
      if (!Array.isArray(outputs?.failingCases) || !outputs.failingCases.length) reasons.push('failingCases missing');
      if (!Array.isArray(outputs?.weakDimensions) || !outputs.weakDimensions.length) reasons.push('weakDimensions missing');
      if (!outputs?.baselineMetrics || typeof outputs.baselineMetrics !== 'object' || !Object.keys(outputs.baselineMetrics).length) reasons.push('baselineMetrics missing');
      if (!outputs?.consumedInputs?.workflowPath) reasons.push('workflowPath not consumed');
      if (!outputs?.consumedInputs?.runId) reasons.push('runId not consumed');
      return { ok: reasons.length === 0, reasons };
    }
  };
}

export function makeCandidateAsset(input) {
  const content = String(input.content || '').trim();
  const selectedInventoryEntries = Array.isArray(input.inventoryEntries) ? input.inventoryEntries : [];
  const artifactKind = input.artifactKind || 'mixed';
  const artifactType = input.artifactType || artifactTypeForKind(artifactKind);
  const assetId = input.assetId || `asset_${toSlug(input.title)}_${sha256(`${input.author}:${input.title}:${content}`).slice(0, 10)}`;
  const codeAnalysisFacts = extractStaticCodeAnalysisFacts(content, {
    symbols: input.symbols,
    paths: inventorySourcePaths(selectedInventoryEntries, input.sourcePaths),
    configKeys: input.configKeys,
    stackTags: [...(input.declaredStacks || []), ...(input.tags || [])],
    constraints: input.declaredConstraints
  });
  const contentUnits = splitContentUnits(assetId, content, codeAnalysisFacts);
  const contentRoot = stableHashObject(contentUnits.map((unit) => unit.unitHash));
  const attestationPayload = { assetId, title: input.title, contentRoot };
  const artifactSelectionSurface = buildArtifactSelectionSurface(input, selectedInventoryEntries, artifactKind);
  const addressingSurface = buildAddressingSurface(input, selectedInventoryEntries, codeAnalysisFacts);
  const githubAppAuthSurface = buildGitHubAppAuthSurface(input, selectedInventoryEntries);
  const signingSurface = buildSigningSurface(input, assetId, contentRoot, addressingSurface, artifactSelectionSurface, githubAppAuthSurface);
  const uploadSurface = buildArtifactUploadSurface(input, content, codeAnalysisFacts, artifactKind, artifactType, selectedInventoryEntries);
  const signerAddress = signingSurface.signerAddress;
  const assetCodeAnalysisReceipt = buildStaticExecutionReceipt({
    receiptKind: 'asset-static-code-analysis',
    stageId: 'asset.measurement.extract.v15',
    toolId: 'asset.measurement.extract.v15',
    inputs: {
      assetId,
      contentRoot,
      sourcePaths: addressingSurface.sourcePaths,
      declaredStacks: input.declaredStacks || codeAnalysisFacts.stackTags,
      declaredConstraints: input.declaredConstraints || codeAnalysisFacts.constraints
    },
    normalizedOutputEnvelope: {
      symbols: codeAnalysisFacts.symbols,
      paths: addressingSurface.sourcePaths,
      configKeys: input.configKeys || codeAnalysisFacts.configKeys,
      stackTags: input.declaredStacks || codeAnalysisFacts.stackTags,
      constraints: input.declaredConstraints || codeAnalysisFacts.constraints
    },
    evidenceRefs: [contentRoot, ...addressingSurface.sourcePaths],
    replayInputClosure: [contentRoot, ...contentUnits.map((unit) => unit.unitHash)]
  });
  const assetMeasurement = {
    assetId,
    codeAnalysisFacts: {
      symbols: codeAnalysisFacts.symbols,
      paths: addressingSurface.sourcePaths,
      configKeys: input.configKeys || codeAnalysisFacts.configKeys,
      stackTags: input.declaredStacks || codeAnalysisFacts.stackTags,
      constraints: input.declaredConstraints || codeAnalysisFacts.constraints
    },
    contentUnitSemantics: contentUnits.map(unitSemanticSummary),
    vectorInterfaces: {
      taskVectorSpace: 'task-semantic-space.v8',
      failureModeVectorSpace: 'failure-mode-space.v8',
      technicalContextVectorSpace: 'technical-context-space.v8',
      profileAStandInEmbeddings: true,
      profileBFutureBoundary: 'swap embedding providers/models while preserving vector-space contracts and unit ids'
    },
    provenance: [
      measurementTrace('static', 'asset.measurement.extract.v15', [contentRoot, ...(input.sourcePaths || codeAnalysisFacts.paths)], { measurementClass: 'static-analysis', evaluatorKind: 'deterministic-static-command', standIn: false, receiptRefs: [assetCodeAnalysisReceipt.receiptId] }),
      measurementTrace('hybrid', 'asset.measurement.semantic-hand-off.v8', [contentRoot, ...contentUnits.map((unit) => unit.unitHash)], { measurementClass: 'embedding-derivation', evaluatorKind: 'embedding-generator', standIn: true })
    ],
    staticExecutionReceipts: [assetCodeAnalysisReceipt, ...collectStaticExecutionReceipts(contentUnits)]
  };

  return {
    assetId,
    depositedAt: input.depositedAt || nowIso(),
    title: input.title,
    artifactKind,
    artifactType,
    sourceMaterialBinding: {
      mode: input.bindingMode || 'read-only-mounted-copy',
      confidentiality: 'private-required',
      mutableInBranch: !!input.mutableInBranch,
      materializationRoot: `.engi/source-material/${assetId}`
    },
    contentRoot,
    contentUnits,
    attestations: [
      {
        attestationId: `att_${sha256(assetId).slice(0, 12)}`,
        signerAddress,
        signatureChecksPass: signingSurface.signatureChecksPass,
        payloadHash: signingSurface.payloadHash || stableHashObject(attestationPayload),
        signedPayloadHashMatchesContentRoot: signingSurface.signedPayloadHashMatchesContentRoot,
        cosignSatisfied: input.cosignSatisfied !== false,
        attestationHash: signingSurface.attestationHash || stableHashObject({ signerAddress, contentRoot })
      }
    ],
    uploadSurface,
    artifactSelectionSurface,
    addressingSurface,
    signingSurface,
    githubAppAuthSurface,
    githubBoundary: {
      ...uploadSurface.githubBinding,
      installationId: githubAppAuthSurface.installationId,
      authSessionId: githubAppAuthSurface.authSessionId,
      repositoryId: githubAppAuthSurface.repositoryId,
      repositoryNodeId: githubAppAuthSurface.repositoryNodeId,
      permissions: githubAppAuthSurface.permissions,
      permissionsRoot: githubAppAuthSurface.permissionsRoot,
      authPayloadHash: githubAppAuthSurface.authPayloadHash,
      selectedInventoryRoot: artifactSelectionSurface.selectedInventoryRoot,
      addressingScope: addressingSurface.addressingScope,
      addressingRoot: addressingSurface.addressingRoot
    },
    identitySurface: {
      signerAddress: signingSurface.signerAddress,
      signerClass: 'issuer-principal',
      signerSource: 'signing-surface',
      authSessionId: githubAppAuthSurface.authSessionId,
      installationId: githubAppAuthSurface.installationId,
      authMechanism: githubAppAuthSurface.authMechanism,
      selectedInventoryRoot: artifactSelectionSurface.selectedInventoryRoot,
      addressingRoot: addressingSurface.addressingRoot,
      authPayloadHash: githubAppAuthSurface.authPayloadHash,
      signedPayloadHash: signingSurface.payloadHash,
      ...buildBoundaryDescriptions(
        'Local modeled signer binding only.',
        'Would verify real signer identity / GitHub App / org-bound authorization externally.'
      )
    },
    provenanceBinding: {
      sourceProvider: input.sourceProvider || 'github',
      repo: addressingSurface.repo,
      commit: addressingSurface.commit || `demo-${sha256(assetId).slice(0, 7)}`,
      paths: addressingSurface.sourcePaths,
      workflowPath: addressingSurface.workflowPath || '.github/workflows/benchmark.yml',
      workflowRunId: addressingSurface.workflowRunId || 'gha_run_auth_001'
    },
    verificationEvidence: {
      testsPassed: input.testsPassed !== false,
      typecheckPassed: input.typecheckPassed !== false,
      staticAnalysisPassed: input.staticAnalysisPassed !== false,
      benchmarkRan: input.benchmarkRan !== false,
      benchmarkRunId: input.benchmarkRunId || 'gha_run_auth_001',
      reproSteps: input.reproSteps || ['rerun benchmark workflow', 'inspect issuer compatibility logs'],
      pinnedEnvironment: input.pinnedEnvironment || 'ubuntu-24.04 + node 22 + rust stable',
      proofLogs: input.proofLogs || []
    },
    metadata: {
      author: input.author,
      organization: input.organization || '$ENGI',
      sourceRepo: addressingSurface.repo,
      sourceCommit: addressingSurface.commit || `demo-${sha256(assetId).slice(0, 7)}`,
      sourcePaths: addressingSurface.sourcePaths,
      tags: summarizeStrings([...(input.tags || []), ...selectedInventoryEntries.flatMap((entry) => entry.tags || [])]),
      declaredStacks: summarizeStrings([...(input.declaredStacks || codeAnalysisFacts.stackTags), ...selectedInventoryEntries.flatMap((entry) => entry.declaredStacks || [])]),
      declaredConstraints: summarizeStrings([...(input.declaredConstraints || codeAnalysisFacts.constraints), ...selectedInventoryEntries.flatMap((entry) => entry.declaredConstraints || [])]),
      summary: input.summary || content.slice(0, 220),
      privateContent: content,
      issuerPolicyStatus: input.issuerPolicyStatus || 'allowed'
    },
    assetMeasurement: {
      ...assetMeasurement,
      analysisFactLifecycle: {
        determined: ['extractStaticCodeAnalysisFacts', 'repo provenance normalization', 'artifact upload precision mapping'],
        recorded: ['assetMeasurement.codeAnalysisFacts', 'contentUnits[].codeAnalysisFacts', 'uploadSurface'],
        vectorized: ['contentUnits[].embeddings.taskVector', 'contentUnits[].embeddings.failureModeVector', 'contentUnits[].embeddings.technicalContextVector'],
        searched: buildRecallChannelContracts(),
        downstreamUses: ['recallCandidates', 'evaluateCandidates', 'assembleAssetPack', 'visual explainability']
      }
    },
    measurementProvenance: assetMeasurement.provenance
  };
}

export function buildInitialState() {
  const githubAppSessions = buildSeedGitHubAppSessions();
  const repoArtifactInventory = buildSeedRepoArtifactInventoryEntries(githubAppSessions);
  const inventoryEntryByRepoTitle = new Map(
    repoArtifactInventory.map((entry) => [`${entry.repo}:${entry.title}`, entry])
  );
  const bindSeedRepoSelection = (input, inventoryTitles = []) => {
    const repo = input.sourceRepo || 'frontier/demo-auth';
    return {
      ...input,
      sourceRepo: repo,
      authSession: githubAppSessions.find((session) => session.repo === repo) || null,
      inventoryEntries: inventoryTitles
        .map((title) => inventoryEntryByRepoTitle.get(`${repo}:${title}`))
        .filter(Boolean),
      contentDerivedFromSelection: inventoryTitles.length > 0
    };
  };
  const assets = [
    makeCandidateAsset(bindSeedRepoSelection({
      title: 'Enterprise auth migration rollback playbook',
      author: 'Garrett',
      organization: '$ENGI',
      artifactKind: 'runbook',
      sourcePaths: ['services/auth/rollback.ts', 'config/auth/issuer-compat.yml'],
      symbols: ['restoreLegacyVerifier', 'emitAuditReceipt', 'validateIssuerCompatibility'],
      configKeys: ['auth.issuer.compatibilityWindow', 'auth.rollback.killSwitch'],
      tags: ['auth', 'migration', 'rollback', 'monorepo', 'enterprise'],
      declaredStacks: ['typescript', 'node', 'auth', 'github-actions', 'jwt', 'monorepo'],
      declaredConstraints: ['preserve session validity', 'replay only idempotent schema steps', 'emit audit receipt'],
      content: `Objective: recover an enterprise monorepo auth migration without leaving half-migrated services or invalid sessions in production.\n\nProcedure: freeze writes, capture a signed migration snapshot, validate token issuer compatibility, restore old verifier configuration, replay only idempotent schema steps, and re-enable traffic behind a kill switch.\n\nValidation: rerun auth benchmark cases, verify session validator invariants, and confirm rollback audit receipts include repo, commit, workflow run, and migration batch.\n\nExpected touched areas: services/auth/rollback.ts, config/auth/issuer-compat.yml, and the ENGI remediation branch validation notes.`,
      proofLogs: ['creusot-session-validator-proof.log'],
      pinnedEnvironment: 'ubuntu-24.04 + node 22'
    }, ['Auth rollback benchmark summary', 'Issuer compatibility config snapshot', 'Issuer mismatch incident notes'])),
    makeCandidateAsset(bindSeedRepoSelection({
      title: 'Proof-carrying session validator patch kit',
      author: 'Eve',
      organization: '$ENGI',
      artifactKind: 'patch',
      sourcePaths: ['services/auth/session_validator.rs', 'services/auth/cache.rs'],
      symbols: ['SessionValidator', 'validateIssuerAudience', 'evictExpiredEntry'],
      configKeys: ['auth.session.cache.maxAgeSeconds'],
      tags: ['rust', 'proof', 'validator', 'safety', 'patch'],
      declaredStacks: ['rust', 'auth', 'jwt'],
      declaredConstraints: ['no panic', 'preserve session validity', 'no overflow'],
      content: `Contract: session validation lookups must not panic, must preserve index bounds, and must never accept expired or issuer-mismatched entries.\n\nImplementation note: replace unchecked indexing with guarded access, propagate Result and Option values, and prove that cache eviction preserves validator invariants.\n\nValidation steps: cargo test -p auth-validator, cargo creusot prove services/auth/session_validator.rs, and rerun the GitHub Actions auth remediation benchmark.\n\nExpected touched areas: services/auth/session_validator.rs and services/auth/cache.rs.`,
      proofLogs: ['cargo-creusot-success.log'],
      pinnedEnvironment: 'ubuntu-24.04 + rust stable'
    }, ['Rollback verifier compatibility patch', 'Session validator proof log'])),
    makeCandidateAsset(bindSeedRepoSelection({
      title: 'Formal replay-window validator proof bundle',
      author: 'Sora',
      organization: '$ENGI',
      artifactKind: 'proof',
      sourceRepo: 'frontier/payments-ledger',
      sourceCommit: 'validator014proof',
      workflowRunId: 'gha_run_validator_014',
      benchmarkRunId: 'gha_run_validator_014',
      sourcePaths: ['crates/validator/src/session_guard.rs', 'crates/validator/src/replay_window.rs', 'proofs/session_guard.creusot'],
      symbols: ['SessionGuard', 'proveReplayWindow', 'applyOverflowBound'],
      configKeys: ['validator.replayWindow.maxNonces', 'validator.proof.requireNoUncheckedMath'],
      tags: ['rust', 'proof', 'validator', 'formal-methods', 'replay-window'],
      declaredStacks: ['rust', 'creusot', 'cargo', 'formal-methods'],
      declaredConstraints: ['preserve proof obligations', 'no unchecked arithmetic', 'replay benchmark after proof'],
      content: `Proof bundle objective: repair replay-window and overflow proof regressions in the validator crate without weakening nonce or arithmetic guarantees.\n\nImplementation note: keep the replay window bounded, prove the overflow guard over the full input range, and bind the proof outputs back to the benchmark harness.\n\nValidation steps: cargo test -p payments-validator, cargo creusot prove proofs/session_guard.creusot, and rerun the validator regression benchmark.`,
      proofLogs: ['validator-replay-window-proof.log'],
      pinnedEnvironment: 'ubuntu-24.04 + rust stable'
    }, ['Replay window attestation bundle', 'Replay guard patch', 'Validator proof recovery runbook'])),
    makeCandidateAsset(bindSeedRepoSelection({
      title: 'Token issuer incident escalation notes',
      author: 'Avery',
      organization: '$ENGI',
      artifactKind: 'incident-note',
      sourcePaths: ['docs/incidents/auth-issuer-mismatch.md'],
      symbols: ['issuerCompatibilityWindow'],
      configKeys: ['auth.issuer.previousJwksUrl'],
      tags: ['issuer', 'incident-response', 'runbook', 'escalation'],
      declaredStacks: ['auth', 'jwt'],
      declaredConstraints: ['compatibility window'],
      content: `Incident pattern: auth migration changed issuer and audience validation together, which broke older services still pinned to the previous JWKS endpoint.\n\nRecovery pattern: split issuer migration from audience migration, ship an explicit compatibility window, and add a runtime audit that rejects mixed config before rollout.\n\nOperator note: most failed recoveries came from restoring schema before restoring validator config.`,
      typecheckPassed: false,
      staticAnalysisPassed: false,
      benchmarkRan: false,
      signedPayloadHashMatchesContentRoot: true,
      issuerPolicyStatus: 'restricted',
      pinnedEnvironment: ''
    }, ['Issuer mismatch incident notes'])),
    makeCandidateAsset(bindSeedRepoSelection({
      title: 'Policy precedence incident governor fixpack',
      author: 'Noah',
      organization: '$ENGI',
      artifactKind: 'config',
      sourceRepo: 'frontier/policy-control-plane',
      sourceCommit: 'policy031fix',
      workflowRunId: 'gha_run_policy_031',
      benchmarkRunId: 'gha_run_policy_031',
      sourcePaths: ['config/policy/issuer-precedence.yml', 'services/policy/evaluate_rollout.ts'],
      symbols: ['evaluateRolloutPolicy', 'PolicyPrecedenceMatrix', 'emitPolicyAuditReceipt'],
      configKeys: ['policy.rollout.precedence', 'policy.rollout.approvalWindowHours'],
      tags: ['policy', 'config', 'incident-response', 'governance', 'yaml'],
      declaredStacks: ['typescript', 'node', 'policy', 'yaml'],
      declaredConstraints: ['preserve approval ordering', 'emit policy audit receipt', 'no silent precedence fallback'],
      content: `Policy incident closure: restore explicit precedence ordering between staged policy bundles and emergency overrides before rollout resumes.\n\nImplementation note: make precedence resolution explicit, record the chosen policy source in audit receipts, and reject rollouts that fall back to undeclared defaults.\n\nValidation steps: rerun the policy precedence benchmark, inspect approval-window traces, and confirm that policy audit receipts include workflow run and commit linkage.`,
      pinnedEnvironment: 'ubuntu-24.04 + node 22'
    }, ['Policy precedence benchmark output', 'Policy precedence governor patch', 'Policy incident operator runbook'])),
    makeCandidateAsset(bindSeedRepoSelection({
      title: 'Unsafe patch review containment checklist',
      author: 'Mina',
      organization: '$ENGI',
      artifactKind: 'runbook',
      sourceRepo: 'frontier/review-gateway',
      sourceCommit: 'review009contain',
      workflowRunId: 'gha_run_review_009',
      benchmarkRunId: 'gha_run_review_009',
      sourcePaths: ['docs/reviews/unsafe_patch_containment.md', 'services/review/review_gate.ts'],
      symbols: ['ReviewGate', 'emitReviewRationale', 'enforceTouchedFileBudget'],
      configKeys: ['review.patch.maxTouchedFiles', 'review.patch.requireRationale'],
      tags: ['code-review', 'security', 'containment', 'patch'],
      declaredStacks: ['typescript', 'security', 'code-review'],
      declaredConstraints: ['require review rationale', 'preserve rollback path', 'block unsafe patch bypass'],
      content: `Unsafe patch containment: reject broad patch drops that bypass review gates, force an explicit rationale, and attach the touched-file budget to the review receipt.\n\nOperator steps: diff the candidate patch against allowed file boundaries, require reviewer rationale before apply, and reopen the benchmark workflow if the patch exceeds policy scope.\n\nExpected touched areas: services/review/review_gate.ts, docs/reviews/unsafe_patch_containment.md.`,
      benchmarkRan: false,
      pinnedEnvironment: 'ubuntu-24.04 + node 22'
    }, ['Unsafe review recovery diff note', 'Unsafe review containment checklist', 'Review gate proof log'])),
    makeCandidateAsset(bindSeedRepoSelection({
      title: 'Deployment drift rollback release playbook',
      author: 'Iris',
      organization: '$ENGI',
      artifactKind: 'runbook',
      sourceRepo: 'frontier/deploy-orchestrator',
      sourceCommit: 'deploy018drift',
      workflowRunId: 'gha_run_deploy_018',
      benchmarkRunId: 'gha_run_deploy_018',
      sourcePaths: ['infra/terraform/services/auth/main.tf', 'deploy/helm/auth/values.yaml', 'ops/runbooks/deployment-drift.md'],
      symbols: ['reconcileReleasePlan', 'detectVersionDrift', 'emitDeploymentReceipt'],
      configKeys: ['deploy.rollback.maxParallel', 'deploy.release.expectedChartVersion'],
      tags: ['infra', 'deployment', 'rollback', 'terraform', 'helm', 'kubernetes'],
      declaredStacks: ['terraform', 'helm', 'kubernetes', 'infra'],
      declaredConstraints: ['preserve release ordering', 'emit deployment receipt', 'keep rollout reversible'],
      content: `Deployment drift recovery: compare Terraform state, Helm chart expectations, and runtime release receipts before rollback.\n\nExecution plan: stop progressive rollout, reconcile expected chart version with applied infrastructure revisions, and only then replay the rollback plan in bounded batches.\n\nValidation: rerun the deployment benchmark, confirm drift detection receipts, and verify release ordering stayed reversible throughout the rollback.`,
      pinnedEnvironment: 'ubuntu-24.04 + terraform 1.9 + helm 3'
    }, ['Deployment drift incident runbook', 'Deployment drift config snapshot', 'Deployment release parity patch'])),
    makeCandidateAsset(bindSeedRepoSelection({
      title: 'Projection-safe bounded proof export notes',
      author: 'Jules',
      organization: '$ENGI',
      artifactKind: 'proof',
      sourceRepo: 'frontier/private-proof-service',
      sourceCommit: 'projection006bound',
      workflowRunId: 'gha_run_projection_006',
      benchmarkRunId: 'gha_run_projection_006',
      sourcePaths: ['services/redaction/project_public_proof.ts', 'policies/disclosure/bounded_public.yml'],
      symbols: ['projectBoundedPublicProof', 'redactPrivateArtifacts', 'allowBoundedDisclosure'],
      configKeys: ['projection.public.allowedArtifacts', 'projection.redaction.defaultMode'],
      tags: ['privacy', 'projection', 'proof', 'disclosure'],
      declaredStacks: ['typescript', 'policy', 'privacy'],
      declaredConstraints: ['bounded metadata only', 'no private artifact leak', 'replay disclosure decisions'],
      content: `Bounded proof export: derive the public proof surface strictly from bounded metadata, redact private branch artifacts by policy class, and record every disclosure decision with replayable artifact hashes.\n\nVerification: compare public artifact inventory against projection policy, assert that private source material never appears in public outputs, and preserve a replayable disclosure chain.`,
      pinnedEnvironment: 'ubuntu-24.04 + node 22'
    }, ['Bounded proof export witness bundle', 'Bounded proof redaction patch', 'Public proof disclosure runbook'])),
    makeCandidateAsset(bindSeedRepoSelection({
      title: 'Session validator compatibility witness dossier',
      author: 'Lane',
      organization: '$ENGI',
      artifactKind: 'proof',
      sourceRepo: 'frontier/demo-auth',
      sourceCommit: 'auth019validator',
      workflowPath: '.github/workflows/benchmark-auth-normalization.yml',
      workflowRunId: 'gha_run_auth_019',
      benchmarkRunId: 'gha_run_auth_019',
      sourcePaths: ['services/auth/session_validator.rs', 'services/auth/audit_receipt.ts', 'services/auth/rollback.ts', 'config/auth/issuer-compat.yml'],
      symbols: ['SessionValidator', 'emitAuditReceipt', 'restoreLegacyVerifier', 'validateIssuerAudience'],
      configKeys: ['auth.session.cache.maxAgeSeconds', 'auth.audit.requireWorkflowRun', 'auth.issuer.compatibilityWindow'],
      tags: ['auth', 'session-validity', 'proof', 'rollback', 'auditability'],
      declaredStacks: ['rust', 'typescript', 'node', 'auth', 'github-actions', 'jwt'],
      declaredConstraints: ['preserve session validity', 'bind workflow run to receipt', 'keep issuer compatibility explicit', 'no unchecked validator panic'],
      content: `Witness objective: prove that session validation, issuer compatibility rollback, and audit receipt emission remain aligned for the normalization-heavy auth remediation branch.\n\nImplementation note: keep SessionValidator and restoreLegacyVerifier on the same rollback boundary, bind emitAuditReceipt to the exact workflow run and commit, and reject any compatibility-window repair that is not reflected in both session and receipt evidence.\n\nVerification steps: rerun the auth normalization benchmark, replay the validator proof log against services/auth/session_validator.rs, and confirm that services/auth/audit_receipt.ts and config/auth/issuer-compat.yml preserve the same workflow-bound compatibility window.`,
      proofLogs: ['auth019-session-validator-proof.log'],
      pinnedEnvironment: 'ubuntu-24.04 + rust stable + node 22'
    }, ['Session validator proof log', 'Auth rollback benchmark summary', 'Issuer compatibility config snapshot'])),
    makeCandidateAsset(bindSeedRepoSelection({
      title: 'Auth audit receipt reconciliation patchset',
      author: 'Kai',
      organization: '$ENGI',
      artifactKind: 'patch',
      sourceRepo: 'frontier/demo-auth',
      sourceCommit: 'auth019audit',
      workflowRunId: 'gha_run_auth_019',
      benchmarkRunId: 'gha_run_auth_019',
      sourcePaths: ['services/auth/audit_receipt.ts', 'services/auth/rollback.ts', 'config/auth/issuer-compat.yml'],
      symbols: ['emitAuditReceipt', 'reconcileRollbackReceipt', 'restoreLegacyVerifier'],
      configKeys: ['auth.audit.requireWorkflowRun', 'auth.issuer.compatibilityWindow'],
      tags: ['auth', 'auditability', 'patch', 'rollback'],
      declaredStacks: ['typescript', 'node', 'auth', 'github-actions'],
      declaredConstraints: ['emit audit receipt', 'preserve session validity', 'bind workflow run to receipt'],
      content: `Patch objective: reconcile auth rollback receipts with the workflow run, commit, and issuer compatibility window so rollback evidence stays settlement-grade.\n\nImplementation note: write the workflow run and commit into emitAuditReceipt, keep restoreLegacyVerifier and issuer compatibility updates in the same remediation patch, and fail closed if receipt linkage is missing.\n\nValidation steps: rerun the auth benchmark, inspect receipt reconciliation logs, and confirm that rollback receipts stay hash-bound to services/auth/audit_receipt.ts.`,
      pinnedEnvironment: 'ubuntu-24.04 + node 22'
    }, ['Auth audit receipt patchset', 'Auth rollback benchmark summary', 'Issuer compatibility config snapshot'])),
    makeCandidateAsset(bindSeedRepoSelection({
      title: 'Polyglot gateway rollback coordination playbook',
      author: 'Rin',
      organization: '$ENGI',
      artifactKind: 'runbook',
      sourceRepo: 'frontier/polyglot-gateway',
      sourceCommit: 'gateway021rollback',
      workflowRunId: 'gha_run_gateway_021',
      benchmarkRunId: 'gha_run_gateway_021',
      sourcePaths: ['gateway/api/server.ts', 'workers/session_replay.py', 'crates/token_bridge/src/lib.rs', 'config/gateway/issuer_policy.yml'],
      symbols: ['applyIssuerRollback', 'replayQueuedSession', 'BridgeGuard'],
      configKeys: ['gateway.issuer.rollbackWindowSeconds', 'gateway.audit.requireCrossLanguageReceipt'],
      tags: ['polyglot', 'rollback', 'typescript', 'python', 'rust', 'gateway'],
      declaredStacks: ['typescript', 'python', 'rust', 'gateway', 'github-actions'],
      declaredConstraints: ['preserve cross-language parity', 'emit audit receipt', 'keep rollback reversible'],
      content: `Polyglot rollback objective: recover gateway issuer drift without letting the TypeScript API, Python replay worker, or Rust token bridge diverge.\n\nExecution plan: freeze queued session replay, coordinate the server.ts issuer rollback with workers/session_replay.py, validate BridgeGuard assumptions in crates/token_bridge/src/lib.rs, and only then reopen traffic.\n\nValidation: rerun the gateway parity benchmark, verify the cross-language receipt chain, and confirm that config/gateway/issuer_policy.yml stays aligned with the rollback window.`,
      pinnedEnvironment: 'ubuntu-24.04 + node 22 + python 3.13 + rust stable'
    }, ['Polyglot gateway rollback patchset', 'Polyglot rollback runbook', 'Cross-language receipt config snapshot', 'Gateway parity proof log']))
  ];

  const buyers = [
    {
      buyerId: 'frontier-code-systems',
      orgName: 'Frontier Code Systems',
      installationId: 'gh_inst_engi_demo_001',
      repo: 'frontier/demo-auth',
      buyerBranch: 'ENGI-auth-issuer-rollback',
      branchMode: 'patch',
      licensePoolMicroUnits: '900000000'
    }
  ];

  const needScenarios = [
    {
      scenarioId: 'auth-issuer-rollback',
      scenarioFamily: 'monorepo-auth-rollback',
      coverageTags: ['monorepo', 'auth', 'rollback', 'privacy-boundary', 'polyglot'],
      repo: 'frontier/demo-auth',
      installationId: 'gh_inst_engi_demo_001',
      baseRef: 'ENGI-auth-issuer-rollback',
      targetRef: 'main',
      prNumber: 481,
      benchmarkHarnessPath: 'benchmarks/auth_remediation.yaml',
      benchmarkWorkflowPath: '.github/workflows/benchmark-auth.yml',
      benchmarkRunId: 'gha_run_auth_001',
      benchmarkRunUrl: 'https://github.com/frontier/demo-auth/actions/runs/gha_run_auth_001',
      repoContext: {
        repoTree: [
          'services/auth/rollback.ts',
          'services/auth/session_validator.rs',
          'services/auth/cache.rs',
          'config/auth/issuer-compat.yml',
          'benchmarks/auth_remediation.yaml'
        ],
        stackHints: ['typescript', 'node', 'auth', 'github-actions', 'jwt', 'monorepo'],
        symbols: ['restoreLegacyVerifier', 'validateIssuerAudience', 'emitAuditReceipt'],
        configKeys: ['auth.issuer.compatibilityWindow', 'auth.rollback.killSwitch'],
        benchmarkTarget: {
          harnessPath: 'benchmarks/auth_remediation.yaml',
          targetSlice: 'auth-remediation'
        }
      },
      expectedTask: 'Recover a production auth migration with issuer mismatch while preserving session validity and rollback safety.',
      expectedFailureModes: [
        'issuer mismatch breaks older services',
        'rollback restores schema before verifier compatibility',
        'audit receipts missing repo and commit linkage'
      ],
      expectedConstraints: [
        'preserve session validity',
        'replay only idempotent schema steps',
        'emit audit receipt',
        'keep remediation branch private until settlement completes'
      ],
      expectedTargetArtifactKinds: ['runbook', 'patch', 'config', 'proof'],
      humanPrompt: 'Need a private ENGI remediation branch for auth rollback failures observed in the buyer PR.',
      canonicalRunEvidence: {
        workflowPath: '.github/workflows/benchmark-auth.yml',
        runId: 'gha_run_auth_001',
        runUrl: 'https://github.com/frontier/demo-auth/actions/runs/gha_run_auth_001',
        commitSha: 'demoauth481abc',
        branch: 'ENGI-auth-issuer-rollback',
        conclusion: 'failure',
        artifacts: [
          { name: 'auth-remediation-report.json', path: 'artifacts/auth-remediation-report.json', mediaType: 'application/json' }
        ],
        checks: [
          { name: 'auth benchmark', conclusion: 'failure' },
          { name: 'session validation', conclusion: 'failure' }
        ],
        extractedOutputs: {
          failingCases: ['issuer-mismatch-legacy-service', 'rollback-ordering-audit-receipt'],
          weakDimensions: ['rollback-safety', 'session-validity', 'auditability'],
          baselineMetrics: {
            rollbackSafety: 0.41,
            sessionValidity: 0.46,
            auditability: 0.32
          },
          touchedPaths: ['services/auth/rollback.ts', 'services/auth/session_validator.rs', 'config/auth/issuer-compat.yml'],
          symbols: ['restoreLegacyVerifier', 'validateIssuerAudience', 'emitAuditReceipt'],
          configKeys: ['auth.issuer.compatibilityWindow', 'auth.rollback.killSwitch'],
          parserKind: 'github-actions.auth-remediation.v3',
          parserVersion: '3.0.0'
        }
      }
    },
    {
      scenarioId: 'rust-validator-proof-gap',
      scenarioFamily: 'proof-heavy-rust-validator',
      coverageTags: ['rust', 'proof', 'validator', 'formal-methods'],
      repo: 'frontier/payments-ledger',
      installationId: 'gh_inst_engi_demo_001',
      baseRef: 'ENGI-proof-validator-gap',
      targetRef: 'main',
      prNumber: 722,
      benchmarkHarnessPath: 'benchmarks/validator_regressions.yaml',
      benchmarkWorkflowPath: '.github/workflows/prove-validator.yml',
      benchmarkRunId: 'gha_run_validator_014',
      benchmarkRunUrl: 'https://github.com/frontier/payments-ledger/actions/runs/gha_run_validator_014',
      repoContext: {
        repoTree: [
          'crates/validator/src/session_guard.rs',
          'crates/validator/src/replay_window.rs',
          'proofs/session_guard.creusot',
          'benchmarks/validator_regressions.yaml'
        ],
        stackHints: ['rust', 'creusot', 'cargo', 'formal-methods', 'github-actions'],
        symbols: ['SessionGuard', 'proveReplayWindow', 'applyOverflowBound'],
        configKeys: ['validator.replayWindow.maxNonces', 'validator.proof.requireNoUncheckedMath'],
        benchmarkTarget: {
          harnessPath: 'benchmarks/validator_regressions.yaml',
          targetSlice: 'proof-validator'
        }
      },
      expectedTask: 'Repair the Rust validator proof failure without weakening overflow or replay protections.',
      expectedFailureModes: [
        'overflow boundary proof fails under replay-window stress',
        'nonce replay guard accepts out-of-window sequence',
        'validator patch diverges from proof harness expectations'
      ],
      expectedConstraints: [
        'preserve proof obligations',
        'no unchecked arithmetic',
        'rerun proof plus benchmark',
        'keep remediation branch private until settlement completes'
      ],
      expectedTargetArtifactKinds: ['patch', 'proof', 'runbook'],
      humanPrompt: 'Need a proof-heavy ENGI branch for a Rust validator regression coming from the benchmark harness.',
      canonicalRunEvidence: {
        workflowPath: '.github/workflows/prove-validator.yml',
        runId: 'gha_run_validator_014',
        runUrl: 'https://github.com/frontier/payments-ledger/actions/runs/gha_run_validator_014',
        commitSha: 'validator722abc',
        branch: 'ENGI-proof-validator-gap',
        conclusion: 'failure',
        artifacts: [
          { name: 'validator-proof-report.json', path: 'artifacts/validator-proof-report.json', mediaType: 'application/json' },
          { name: 'creusot-session_guard.log', path: 'artifacts/creusot-session_guard.log', mediaType: 'text/plain' }
        ],
        checks: [
          { name: 'proof validator benchmark', conclusion: 'failure' },
          { name: 'cargo creusot', conclusion: 'failure' }
        ],
        extractedOutputs: {
          failingCases: ['overflow-boundary-proof-gap', 'replay-window-regression'],
          weakDimensions: ['proof-soundness', 'overflow-safety', 'replay-resilience'],
          baselineMetrics: {
            proofSoundness: 0.38,
            overflowSafety: 0.49,
            replayResilience: 0.44
          },
          touchedPaths: ['crates/validator/src/session_guard.rs', 'crates/validator/src/replay_window.rs', 'proofs/session_guard.creusot'],
          symbols: ['SessionGuard', 'proveReplayWindow', 'applyOverflowBound'],
          configKeys: ['validator.replayWindow.maxNonces', 'validator.proof.requireNoUncheckedMath'],
          parserKind: 'github-actions.auth-remediation.v3',
          parserVersion: '3.0.0'
        }
      }
    },
    {
      scenarioId: 'config-policy-precedence-incident',
      scenarioFamily: 'config-policy-incident',
      coverageTags: ['config', 'policy', 'incident', 'auditability'],
      repo: 'frontier/policy-control-plane',
      installationId: 'gh_inst_engi_demo_001',
      baseRef: 'ENGI-config-policy-precedence',
      targetRef: 'main',
      prNumber: 903,
      benchmarkHarnessPath: 'benchmarks/policy_precedence.yaml',
      benchmarkWorkflowPath: '.github/workflows/benchmark-policy.yml',
      benchmarkRunId: 'gha_run_policy_031',
      benchmarkRunUrl: 'https://github.com/frontier/policy-control-plane/actions/runs/gha_run_policy_031',
      repoContext: {
        repoTree: [
          'config/policy/issuer-precedence.yml',
          'services/policy/evaluate_rollout.ts',
          'docs/runbooks/policy-incident.md',
          'benchmarks/policy_precedence.yaml'
        ],
        stackHints: ['typescript', 'node', 'policy', 'yaml', 'github-actions'],
        symbols: ['evaluateRolloutPolicy', 'PolicyPrecedenceMatrix', 'emitPolicyAuditReceipt'],
        configKeys: ['policy.rollout.precedence', 'policy.rollout.approvalWindowHours'],
        benchmarkTarget: {
          harnessPath: 'benchmarks/policy_precedence.yaml',
          targetSlice: 'policy-precedence'
        }
      },
      expectedTask: 'Restore config-policy precedence ordering and auditability without reopening the rollout incident.',
      expectedFailureModes: [
        'policy precedence regression bypasses staged bundle ordering',
        'approval window override lacks audit receipt linkage',
        'fallback defaults silently win over declared rollout policy'
      ],
      expectedConstraints: [
        'preserve approval ordering',
        'emit policy audit receipt',
        'block silent precedence fallback',
        'keep remediation branch private until settlement completes'
      ],
      expectedTargetArtifactKinds: ['config', 'runbook', 'patch'],
      humanPrompt: 'Need a branch that resolves a config-policy precedence incident without losing audit receipts.',
      canonicalRunEvidence: {
        workflowPath: '.github/workflows/benchmark-policy.yml',
        runId: 'gha_run_policy_031',
        runUrl: 'https://github.com/frontier/policy-control-plane/actions/runs/gha_run_policy_031',
        commitSha: 'policy903abc',
        branch: 'ENGI-config-policy-precedence',
        conclusion: 'failure',
        artifacts: [
          { name: 'policy-precedence-report.json', path: 'artifacts/policy-precedence-report.json', mediaType: 'application/json' }
        ],
        checks: [
          { name: 'policy precedence benchmark', conclusion: 'failure' },
          { name: 'policy receipt audit', conclusion: 'failure' }
        ],
        extractedOutputs: {
          failingCases: ['policy-precedence-regression', 'approval-window-bypass'],
          weakDimensions: ['policy-auditability', 'precedence-safety', 'rollout-governance'],
          baselineMetrics: {
            policyAuditability: 0.34,
            precedenceSafety: 0.42,
            rolloutGovernance: 0.47
          },
          touchedPaths: ['config/policy/issuer-precedence.yml', 'services/policy/evaluate_rollout.ts', 'docs/runbooks/policy-incident.md'],
          symbols: ['evaluateRolloutPolicy', 'PolicyPrecedenceMatrix', 'emitPolicyAuditReceipt'],
          configKeys: ['policy.rollout.precedence', 'policy.rollout.approvalWindowHours'],
          parserKind: 'github-actions.auth-remediation.v3',
          parserVersion: '3.0.0'
        }
      }
    },
    {
      scenarioId: 'unsafe-patch-review-recovery',
      scenarioFamily: 'unsafe-patch-review',
      coverageTags: ['code-review', 'security', 'patch', 'auditability'],
      repo: 'frontier/review-gateway',
      installationId: 'gh_inst_engi_demo_001',
      baseRef: 'ENGI-unsafe-patch-review',
      targetRef: 'main',
      prNumber: 611,
      benchmarkHarnessPath: 'benchmarks/review_guard.yaml',
      benchmarkWorkflowPath: '.github/workflows/review-guard.yml',
      benchmarkRunId: 'gha_run_review_009',
      benchmarkRunUrl: 'https://github.com/frontier/review-gateway/actions/runs/gha_run_review_009',
      repoContext: {
        repoTree: [
          'services/review/apply_patch.ts',
          'services/review/review_gate.ts',
          'docs/reviews/unsafe_patch_containment.md',
          'benchmarks/review_guard.yaml'
        ],
        stackHints: ['typescript', 'security', 'code-review', 'github-actions'],
        symbols: ['applyPatchSafely', 'ReviewGate', 'emitReviewRationale'],
        configKeys: ['review.patch.maxTouchedFiles', 'review.patch.requireRationale'],
        benchmarkTarget: {
          harnessPath: 'benchmarks/review_guard.yaml',
          targetSlice: 'review-guard'
        }
      },
      expectedTask: 'Contain an unsafe patch review bypass while preserving review rationale and rollback discipline.',
      expectedFailureModes: [
        'unsafe patch bypass skips reviewer rationale',
        'patch scope exceeds touched-file budget',
        'rollback path disappears after apply'
      ],
      expectedConstraints: [
        'require review rationale',
        'preserve rollback path',
        'block unsafe patch bypass',
        'keep remediation branch private until settlement completes'
      ],
      expectedTargetArtifactKinds: ['runbook', 'patch', 'proof'],
      humanPrompt: 'Need a remediation branch for an unsafe patch review bypass observed by the benchmark guard.',
      canonicalRunEvidence: {
        workflowPath: '.github/workflows/review-guard.yml',
        runId: 'gha_run_review_009',
        runUrl: 'https://github.com/frontier/review-gateway/actions/runs/gha_run_review_009',
        commitSha: 'review611abc',
        branch: 'ENGI-unsafe-patch-review',
        conclusion: 'failure',
        artifacts: [
          { name: 'review-guard-report.json', path: 'artifacts/review-guard-report.json', mediaType: 'application/json' }
        ],
        checks: [
          { name: 'review guard benchmark', conclusion: 'failure' },
          { name: 'review rationale audit', conclusion: 'failure' }
        ],
        extractedOutputs: {
          failingCases: ['unsafe-patch-bypass', 'missing-review-rationale'],
          weakDimensions: ['patch-safety', 'review-auditability', 'rollback-discipline'],
          baselineMetrics: {
            patchSafety: 0.31,
            reviewAuditability: 0.36,
            rollbackDiscipline: 0.43
          },
          touchedPaths: ['services/review/apply_patch.ts', 'services/review/review_gate.ts', 'docs/reviews/unsafe_patch_containment.md'],
          symbols: ['applyPatchSafely', 'ReviewGate', 'emitReviewRationale'],
          configKeys: ['review.patch.maxTouchedFiles', 'review.patch.requireRationale'],
          parserKind: 'github-actions.auth-remediation.v3',
          parserVersion: '3.0.0'
        }
      }
    },
    {
      scenarioId: 'infra-deployment-mismatch',
      scenarioFamily: 'infra-deployment-mismatch',
      coverageTags: ['infra', 'deployment', 'rollback', 'helm', 'terraform'],
      repo: 'frontier/deploy-orchestrator',
      installationId: 'gh_inst_engi_demo_001',
      baseRef: 'ENGI-deployment-drift-rollback',
      targetRef: 'main',
      prNumber: 1044,
      benchmarkHarnessPath: 'benchmarks/deployment_drift.yaml',
      benchmarkWorkflowPath: '.github/workflows/benchmark-deploy.yml',
      benchmarkRunId: 'gha_run_deploy_018',
      benchmarkRunUrl: 'https://github.com/frontier/deploy-orchestrator/actions/runs/gha_run_deploy_018',
      repoContext: {
        repoTree: [
          'infra/terraform/services/auth/main.tf',
          'deploy/helm/auth/values.yaml',
          'ops/runbooks/deployment-drift.md',
          'benchmarks/deployment_drift.yaml'
        ],
        stackHints: ['terraform', 'helm', 'kubernetes', 'infra', 'github-actions'],
        symbols: ['reconcileReleasePlan', 'detectVersionDrift', 'emitDeploymentReceipt'],
        configKeys: ['deploy.rollback.maxParallel', 'deploy.release.expectedChartVersion'],
        benchmarkTarget: {
          harnessPath: 'benchmarks/deployment_drift.yaml',
          targetSlice: 'deployment-drift'
        }
      },
      expectedTask: 'Resolve Terraform versus Helm deployment drift while preserving rollback ordering and environment receipts.',
      expectedFailureModes: [
        'terraform and helm expected versions drift apart',
        'rollback ordering mismatches the active release plan',
        'deployment receipts omit environment linkage'
      ],
      expectedConstraints: [
        'preserve release ordering',
        'emit deployment receipt',
        'keep rollout reversible',
        'keep remediation branch private until settlement completes'
      ],
      expectedTargetArtifactKinds: ['runbook', 'config', 'patch'],
      humanPrompt: 'Need a deployment drift rollback branch that reconciles Terraform and Helm state safely.',
      canonicalRunEvidence: {
        workflowPath: '.github/workflows/benchmark-deploy.yml',
        runId: 'gha_run_deploy_018',
        runUrl: 'https://github.com/frontier/deploy-orchestrator/actions/runs/gha_run_deploy_018',
        commitSha: 'deploy1044abc',
        branch: 'ENGI-deployment-drift-rollback',
        conclusion: 'failure',
        artifacts: [
          { name: 'deployment-drift-report.json', path: 'artifacts/deployment-drift-report.json', mediaType: 'application/json' }
        ],
        checks: [
          { name: 'deployment drift benchmark', conclusion: 'failure' },
          { name: 'release receipt audit', conclusion: 'failure' }
        ],
        extractedOutputs: {
          failingCases: ['terraform-helm-version-drift', 'rollback-order-mismatch'],
          weakDimensions: ['deployment-consistency', 'rollback-safety', 'env-auditability'],
          baselineMetrics: {
            deploymentConsistency: 0.37,
            rollbackSafety: 0.45,
            envAuditability: 0.4
          },
          touchedPaths: ['infra/terraform/services/auth/main.tf', 'deploy/helm/auth/values.yaml', 'ops/runbooks/deployment-drift.md'],
          symbols: ['reconcileReleasePlan', 'detectVersionDrift', 'emitDeploymentReceipt'],
          configKeys: ['deploy.rollback.maxParallel', 'deploy.release.expectedChartVersion'],
          parserKind: 'github-actions.auth-remediation.v3',
          parserVersion: '3.0.0'
        }
      }
    },
    {
      scenarioId: 'privacy-boundary-proof-export',
      scenarioFamily: 'privacy-boundary-stress',
      coverageTags: ['privacy', 'projection', 'redaction', 'bounded-proof'],
      repo: 'frontier/private-proof-service',
      installationId: 'gh_inst_engi_demo_001',
      baseRef: 'ENGI-bounded-proof-export',
      targetRef: 'main',
      prNumber: 1188,
      benchmarkHarnessPath: 'benchmarks/projection_privacy.yaml',
      benchmarkWorkflowPath: '.github/workflows/benchmark-projection.yml',
      benchmarkRunId: 'gha_run_projection_006',
      benchmarkRunUrl: 'https://github.com/frontier/private-proof-service/actions/runs/gha_run_projection_006',
      repoContext: {
        repoTree: [
          'services/redaction/project_public_proof.ts',
          'policies/disclosure/bounded_public.yml',
          'docs/privacy/remediation.md',
          'benchmarks/projection_privacy.yaml'
        ],
        stackHints: ['typescript', 'policy', 'privacy', 'github-actions'],
        symbols: ['projectBoundedPublicProof', 'redactPrivateArtifacts', 'allowBoundedDisclosure'],
        configKeys: ['projection.public.allowedArtifacts', 'projection.redaction.defaultMode'],
        benchmarkTarget: {
          harnessPath: 'benchmarks/projection_privacy.yaml',
          targetSlice: 'projection-privacy'
        }
      },
      expectedTask: 'Repair bounded public proof export so public projection never leaks private branch artifacts.',
      expectedFailureModes: [
        'public proof export includes private artifact path',
        'redaction policy skips source material class',
        'disclosure chain cannot replay allowed public metadata'
      ],
      expectedConstraints: [
        'bounded metadata only',
        'no private artifact leak',
        'replay disclosure decisions',
        'keep remediation branch private until settlement completes'
      ],
      expectedTargetArtifactKinds: ['proof', 'patch', 'runbook'],
      humanPrompt: 'Need a privacy-safe proof export branch that keeps public projection bounded and replayable.',
      canonicalRunEvidence: {
        workflowPath: '.github/workflows/benchmark-projection.yml',
        runId: 'gha_run_projection_006',
        runUrl: 'https://github.com/frontier/private-proof-service/actions/runs/gha_run_projection_006',
        commitSha: 'projection1188abc',
        branch: 'ENGI-bounded-proof-export',
        conclusion: 'failure',
        artifacts: [
          { name: 'projection-privacy-report.json', path: 'artifacts/projection-privacy-report.json', mediaType: 'application/json' }
        ],
        checks: [
          { name: 'projection privacy benchmark', conclusion: 'failure' },
          { name: 'bounded proof disclosure audit', conclusion: 'failure' }
        ],
        extractedOutputs: {
          failingCases: ['public-proof-overexposure', 'redaction-policy-skip'],
          weakDimensions: ['projection-safety', 'redaction-correctness', 'auditability'],
          baselineMetrics: {
            projectionSafety: 0.29,
            redactionCorrectness: 0.35,
            auditability: 0.48
          },
          touchedPaths: ['services/redaction/project_public_proof.ts', 'policies/disclosure/bounded_public.yml', 'docs/privacy/remediation.md'],
          symbols: ['projectBoundedPublicProof', 'redactPrivateArtifacts', 'allowBoundedDisclosure'],
          configKeys: ['projection.public.allowedArtifacts', 'projection.redaction.defaultMode'],
          parserKind: 'github-actions.auth-remediation.v3',
          parserVersion: '3.0.0'
        }
      }
    },
    {
      scenarioId: 'polyglot-gateway-benchmark-remediation',
      scenarioFamily: 'polyglot-repo-benchmark-remediation',
      coverageTags: ['polyglot', 'typescript', 'python', 'rust', 'cross-language', 'rollback'],
      repo: 'frontier/polyglot-gateway',
      installationId: 'gh_inst_engi_demo_001',
      baseRef: 'ENGI-polyglot-gateway-remediation',
      targetRef: 'main',
      prNumber: 1021,
      benchmarkHarnessPath: 'benchmarks/gateway_parity.yaml',
      benchmarkWorkflowPath: '.github/workflows/benchmark-gateway.yml',
      benchmarkRunId: 'gha_run_gateway_021',
      benchmarkRunUrl: 'https://github.com/frontier/polyglot-gateway/actions/runs/gha_run_gateway_021',
      repoContext: {
        repoTree: [
          'gateway/api/server.ts',
          'workers/session_replay.py',
          'crates/token_bridge/src/lib.rs',
          'config/gateway/issuer_policy.yml',
          'benchmarks/gateway_parity.yaml'
        ],
        stackHints: ['typescript', 'python', 'rust', 'gateway', 'github-actions'],
        symbols: ['applyIssuerRollback', 'replayQueuedSession', 'BridgeGuard'],
        configKeys: ['gateway.issuer.rollbackWindowSeconds', 'gateway.audit.requireCrossLanguageReceipt'],
        benchmarkTarget: {
          harnessPath: 'benchmarks/gateway_parity.yaml',
          targetSlice: 'gateway-parity'
        }
      },
      expectedTask: 'Repair a polyglot gateway issuer rollback without letting TypeScript, Python, and Rust session paths diverge.',
      expectedFailureModes: [
        'cross-language issuer rollback drifts between API, worker, and bridge runtimes',
        'queued session replay keeps stale issuer data after rollback',
        'cross-language audit receipt chain cannot be replayed end to end'
      ],
      expectedConstraints: [
        'preserve cross-language parity',
        'emit audit receipt',
        'keep rollback reversible',
        'keep remediation branch private until settlement completes'
      ],
      expectedTargetArtifactKinds: ['runbook', 'patch', 'config', 'proof'],
      humanPrompt: 'Need a polyglot remediation branch that keeps gateway rollback logic consistent across TypeScript, Python, and Rust.',
      canonicalRunEvidence: {
        workflowPath: '.github/workflows/benchmark-gateway.yml',
        runId: 'gha_run_gateway_021',
        runUrl: 'https://github.com/frontier/polyglot-gateway/actions/runs/gha_run_gateway_021',
        commitSha: 'gateway1021abc',
        branch: 'ENGI-polyglot-gateway-remediation',
        conclusion: 'failure',
        artifacts: [
          { name: 'gateway-parity-report.json', path: 'artifacts/gateway-parity-report.json', mediaType: 'application/json' },
          { name: 'cross-language-receipts.log', path: 'artifacts/cross-language-receipts.log', mediaType: 'text/plain' }
        ],
        checks: [
          { name: 'gateway parity benchmark', conclusion: 'failure' },
          { name: 'session replay worker', conclusion: 'failure' },
          { name: 'bridge receipt audit', conclusion: 'failure' }
        ],
        extractedOutputs: {
          failingCases: ['gateway-issuer-parity-drift', 'queued-session-replay-divergence', 'cross-language-receipt-gap'],
          weakDimensions: ['cross-language-parity', 'rollback-safety', 'auditability'],
          baselineMetrics: {
            crossLanguageParity: 0.31,
            rollbackSafety: 0.43,
            auditability: 0.39
          },
          touchedPaths: ['gateway/api/server.ts', 'workers/session_replay.py', 'crates/token_bridge/src/lib.rs', 'config/gateway/issuer_policy.yml'],
          symbols: ['applyIssuerRollback', 'replayQueuedSession', 'BridgeGuard'],
          configKeys: ['gateway.issuer.rollbackWindowSeconds', 'gateway.audit.requireCrossLanguageReceipt'],
          parserKind: 'github-actions.auth-remediation.v3',
          parserVersion: '3.0.0'
        }
      }
    },
    {
      scenarioId: 'auth-many-asset-normalization',
      scenarioFamily: 'many-asset-settlement-normalization',
      coverageTags: ['auth', 'many-asset', 'source-to-shares', 'normalization', 'auditability'],
      repo: 'frontier/demo-auth',
      installationId: 'gh_inst_engi_demo_001',
      baseRef: 'ENGI-auth-many-asset-normalization',
      targetRef: 'main',
      prNumber: 519,
      benchmarkHarnessPath: 'benchmarks/auth_settlement_normalization.yaml',
      benchmarkWorkflowPath: '.github/workflows/benchmark-auth-normalization.yml',
      benchmarkRunId: 'gha_run_auth_019',
      benchmarkRunUrl: 'https://github.com/frontier/demo-auth/actions/runs/gha_run_auth_019',
      repoContext: {
        repoTree: [
          'services/auth/rollback.ts',
          'services/auth/session_validator.rs',
          'services/auth/audit_receipt.ts',
          'config/auth/issuer-compat.yml',
          'benchmarks/auth_settlement_normalization.yaml'
        ],
        stackHints: ['typescript', 'node', 'rust', 'auth', 'github-actions', 'jwt'],
        symbols: ['restoreLegacyVerifier', 'SessionValidator', 'emitAuditReceipt'],
        configKeys: ['auth.audit.requireWorkflowRun', 'auth.issuer.compatibilityWindow'],
        benchmarkTarget: {
          harnessPath: 'benchmarks/auth_settlement_normalization.yaml',
          targetSlice: 'auth-normalization'
        }
      },
      expectedTask: 'Recover auth rollback while keeping session validity, issuer compatibility, and audit receipts aligned across multiple remediation assets.',
      expectedFailureModes: [
        'issuer rollback repair is split across several strong assets with partial overlap',
        'audit receipt linkage drops the workflow run during rollback',
        'session validator and rollback notes disagree on the compatibility window'
      ],
      expectedConstraints: [
        'preserve session validity',
        'emit audit receipt',
        'bind workflow run to receipt',
        'keep remediation branch private until settlement completes'
      ],
      expectedTargetArtifactKinds: ['runbook', 'patch', 'config', 'proof'],
      humanPrompt: 'Need a normalization-heavy auth remediation branch that can justify source-to-shares replay across multiple strong assets.',
      canonicalRunEvidence: {
        workflowPath: '.github/workflows/benchmark-auth-normalization.yml',
        runId: 'gha_run_auth_019',
        runUrl: 'https://github.com/frontier/demo-auth/actions/runs/gha_run_auth_019',
        commitSha: 'auth519abc',
        branch: 'ENGI-auth-many-asset-normalization',
        conclusion: 'failure',
        artifacts: [
          { name: 'auth-normalization-report.json', path: 'artifacts/auth-normalization-report.json', mediaType: 'application/json' },
          { name: 'audit-receipt-diff.log', path: 'artifacts/audit-receipt-diff.log', mediaType: 'text/plain' }
        ],
        checks: [
          { name: 'auth normalization benchmark', conclusion: 'failure' },
          { name: 'audit receipt reconciliation', conclusion: 'failure' },
          { name: 'session validator compatibility', conclusion: 'failure' }
        ],
        extractedOutputs: {
          failingCases: ['rollback-ordering-audit-receipt', 'issuer-mismatch-legacy-service', 'workflow-run-receipt-gap'],
          weakDimensions: ['rollback-safety', 'session-validity', 'auditability'],
          baselineMetrics: {
            rollbackSafety: 0.44,
            sessionValidity: 0.45,
            auditability: 0.36
          },
          touchedPaths: ['services/auth/rollback.ts', 'services/auth/session_validator.rs', 'services/auth/audit_receipt.ts', 'config/auth/issuer-compat.yml'],
          symbols: ['restoreLegacyVerifier', 'SessionValidator', 'emitAuditReceipt'],
          configKeys: ['auth.audit.requireWorkflowRun', 'auth.issuer.compatibilityWindow'],
          parserKind: 'github-actions.auth-remediation.v3',
          parserVersion: '3.0.0'
        }
      }
    }
  ];
  const policyState = buildPolicyState();

  const ledger = {
    accounts: {
      'buyer:frontier-code-systems:license_pool': buyers[0].licensePoolMicroUnits,
      ...Object.fromEntries(assets.map((asset) => [`supplier:${asset.assetId}:pending_claims`, '0']))
    },
    journalEvents: []
  };

  return {
    version: 3,
    specVersion: SPEC_VERSION,
    conformanceProfiles: {
      active: PROFILE_A,
      productionIntent: PROFILE_B,
      prototypeOnlyModeledControls: true,
      profileCompositions: buildProfileCompositions()
    },
    assets,
    buyers,
    needScenarios,
    githubAppSessions,
    repoArtifactInventory,
    policyState,
    ledger,
    latestRun: null,
    runHistory: []
  };
}

function assetEvidenceRefs(asset) {
  return [asset.contentRoot, asset.provenanceBinding.commit, asset.verificationEvidence.benchmarkRunId].filter(Boolean);
}

function inferNeedTask(scenario, benchmarkOutputs) {
  if (scenario.expectedTask) return scenario.expectedTask;
  const priorityFailure = benchmarkOutputs.failingCases[0] || 'measured benchmark failure';
  const primaryDimension = benchmarkOutputs.weakDimensions[0] || 'engineering reliability';
  return `Resolve ${priorityFailure} while improving ${primaryDimension} in ${scenario.repo}.`;
}

function inferFailureModes(scenario, benchmarkOutputs) {
  if (scenario.expectedFailureModes?.length) return scenario.expectedFailureModes;
  return benchmarkOutputs.failingCases.map((caseId) => caseId.replace(/-/g, ' '));
}

function inferConstraints(scenario, benchmarkOutputs) {
  const constraints = union(
    scenario.expectedConstraints || [],
    benchmarkOutputs.weakDimensions.map((dimension) => {
      if (dimension === 'session-validity') return 'preserve session validity';
      if (dimension === 'auditability') return 'emit audit receipt';
      return `improve ${dimension}`;
    })
  );
  return summarizeStrings(union(constraints, ['keep remediation branch private until settlement completes']));
}

function inferTargetArtifactKinds(scenario, benchmarkOutputs) {
  if (scenario.expectedTargetArtifactKinds?.length) return scenario.expectedTargetArtifactKinds;
  const inferred = ['runbook', 'patch'];
  if (benchmarkOutputs.configKeys.length) inferred.push('config');
  if (benchmarkOutputs.symbols.some((symbol) => /validator|prove|invariant/i.test(symbol))) inferred.push('proof');
  return summarizeStrings(inferred);
}

function inferClosureCriteria(scenario, benchmarkOutputs, targetArtifactKinds = []) {
  if (scenario.expectedClosureCriteria?.length) return summarizeStrings(scenario.expectedClosureCriteria);
  if (scenario.closureCriteria?.length) return summarizeStrings(scenario.closureCriteria);
  const criteria = benchmarkOutputs.failingCases.slice(0, 2).map((caseId) => `clear ${caseId.replace(/-/g, ' ')}`);
  for (const dimension of benchmarkOutputs.weakDimensions || []) {
    if (dimension === 'session-validity') criteria.push('preserve session validity during rollback');
    else if (dimension === 'auditability') criteria.push('restore audit receipt linkage to repo and commit');
    else if (dimension === 'rollback-safety') criteria.push('keep rollback sequencing replay-safe');
    else criteria.push(`improve ${dimension}`);
  }
  if (targetArtifactKinds.includes('proof')) {
    criteria.push('carry proof-bearing evidence for the decisive invariant checks');
  }
  return summarizeStrings(criteria).slice(0, 5);
}

function inferStackHints(scenario, benchmarkOutputs) {
  return summarizeStrings(union(scenario.repoContext?.stackHints || [], [
    ...benchmarkOutputs.symbols.filter((symbol) => /validator/i.test(symbol)).map(() => 'rust'),
    ...benchmarkOutputs.touchedPaths.filter((item) => item.endsWith('.ts')).map(() => 'typescript'),
    ...benchmarkOutputs.configKeys.filter((item) => item.startsWith('auth.')).map(() => 'auth')
  ]));
}

function buildRepoStaticCodeAnalysis(scenario, benchmarkOutputs) {
  const normalizedOutputEnvelope = {
    touchedPaths: summarizeStrings(union(benchmarkOutputs.touchedPaths, scenario.repoContext?.repoTree?.filter((item) => benchmarkOutputs.touchedPaths.includes(item)) || [])),
    extractedSymbols: summarizeStrings(union(benchmarkOutputs.symbols, scenario.repoContext?.symbols || [])),
    configKeys: summarizeStrings(union(benchmarkOutputs.configKeys, scenario.repoContext?.configKeys || [])),
    stackHints: inferStackHints(scenario, benchmarkOutputs)
  };
  const receipt = buildStaticExecutionReceipt({
    receiptKind: 'repo-context-static-measurement',
    stageId: 'github.repo-context.extract.v15',
    toolId: 'github.repo-context.extract.v15',
    inputs: {
      repo: scenario.repo,
      benchmarkOutputs,
      repoContext: scenario.repoContext || null
    },
    normalizedOutputEnvelope,
    evidenceRefs: [scenario.repo, ...normalizedOutputEnvelope.touchedPaths],
    replayInputClosure: [scenario.repo, scenario.canonicalRunEvidence?.runId]
  });
  return {
    ...normalizedOutputEnvelope,
    staticExecutionReceipts: [receipt]
  };
}

const needMeasurementRuntime = createNeedMeasurementRuntime({
  RECALL_CHANNEL_SPECS,
  buildGithubActionsBenchmarkParser,
  buildStaticExecutionReceipt,
  buildRepoStaticCodeAnalysis,
  inferNeedTask,
  inferFailureModes,
  inferConstraints,
  inferTargetArtifactKinds,
  inferClosureCriteria,
  derivationRecord,
  collectStaticExecutionReceipts,
  summarizeStrings,
  toSlug,
  sha256
});

export function measureNeedFromScenario(scenario) {
  return needMeasurementRuntime.measureNeedFromScenario(scenario);
}

export function buildNeedDescriptor(scenario) {
  return needMeasurementRuntime.buildNeedDescriptor(scenario);
}

const evaluationMaterializationRuntime = createEvaluationMaterializationRuntime({
  DEFAULT_BRANCH_MODE,
  DEFAULT_MODEL_ID,
  RECALL_CHANNEL_BUDGETS,
  RECALL_CHANNEL_SPECS,
  measurementTrace,
  buildRecallChannelContracts,
  summarizeStrings,
  uniqueTokens,
  union,
  intersection,
  buildEmbeddingArtifact,
  cosineSimilarity,
  overlapScore,
  clamp01,
  summarizeScore,
  measurementDetail,
  rankingEvidenceRefs,
  CODE_ANALYSIS_CONSUMERS,
  buildStaticExecutionReceipt,
  countValues,
  sha256,
  stableHashObject
});

export function recallCandidates(need, assets) {
  return evaluationMaterializationRuntime.recallCandidates(need, assets);
}

export function evaluateCandidates(need, assets, policyState = buildPolicyState()) {
  return evaluationMaterializationRuntime.evaluateCandidates(need, assets, policyState);
}

export function assembleAssetPack(need, evaluatedCandidates, branchMode = DEFAULT_BRANCH_MODE) {
  return evaluationMaterializationRuntime.assembleAssetPack(need, evaluatedCandidates, branchMode);
}

function buildMatchReport(need, evaluatedCandidates, assetPack) {
  return evaluationMaterializationRuntime.buildMatchReport(need, evaluatedCandidates, assetPack);
}

function buildVerificationReport(need, evaluatedCandidates, branchMode = DEFAULT_BRANCH_MODE) {
  return evaluationMaterializationRuntime.buildVerificationReport(need, evaluatedCandidates, branchMode);
}

function buildVerificationReceiptsArtifact(need, evaluatedCandidates = []) {
  return evaluationMaterializationRuntime.buildVerificationReceiptsArtifact(need, evaluatedCandidates);
}

function buildEvalManifest(need, evaluatedCandidates, promptSurfaces = [], parsedCompletionEnvelopes = []) {
  return evaluationMaterializationRuntime.buildEvalManifest(need, evaluatedCandidates, promptSurfaces, parsedCompletionEnvelopes);
}

function buildAssetPackLock(assetPack, selectedCandidates) {
  return evaluationMaterializationRuntime.buildAssetPackLock(assetPack, selectedCandidates);
}

function buildSelectedSourceMaterialManifest(assetPack, selectedCandidates) {
  return evaluationMaterializationRuntime.buildSelectedSourceMaterialManifest(assetPack, selectedCandidates);
}

const settlementRuntime = createSettlementRuntime({
  METERED_MICRO_UNITS,
  MAX_BPS,
  MAX_BPS_BIGINT,
  SOURCE_TO_SHARES_SCALE,
  countValues,
  stableHashObject,
  sha256
});

function buildSourceToSharesArtifact(need, settlementCandidates) {
  return settlementRuntime.buildSourceToSharesArtifact(need, settlementCandidates);
}

function buildIdentityBindings(buyer, selectedCandidates) {
  const sessionBindings = [...new Map(
    selectedCandidates
      .filter((candidate) => candidate.asset.githubAppAuthSurface?.authSessionId)
      .map((candidate) => [candidate.asset.githubAppAuthSurface.authSessionId, {
        principalId: `github-app-session:${candidate.asset.githubAppAuthSurface.authSessionId}`,
        principalClass: 'github-app-session-principal',
        authSource: 'github-app-installation',
        boundRefs: [
          candidate.asset.githubAppAuthSurface.authSessionId,
          candidate.asset.addressingSurface?.repo,
          candidate.asset.githubAppAuthSurface.installationId,
          candidate.asset.githubAppAuthSurface.repositoryId
        ].filter(Boolean),
        surfaceRoots: {
          authPayloadHash: candidate.asset.githubAppAuthSurface?.authPayloadHash,
          permissionsRoot: candidate.asset.githubAppAuthSurface?.permissionsRoot
        }
      }])
  ).values()];

  const bindings = [
    {
      principalId: `buyer:${buyer.buyerId}`,
      principalClass: 'buyer-principal',
      authSource: 'github',
      boundRefs: [buyer.repo, buyer.buyerBranch, buildRepoIdentity(buyer.repo).repositoryId]
    },
    {
      principalId: `github-app-installation:${buyer.installationId}`,
      principalClass: 'github-app-installation-principal',
      authSource: 'github-app-installation',
      boundRefs: [buyer.installationId, buyer.repo, buyer.buyerBranch, buildRepoIdentity(buyer.repo).repositoryId]
    },
    {
      principalId: 'engi-system:need-measurement',
      principalClass: 'engi-system-principal',
      authSource: 'policy',
      boundRefs: ['need-measurement']
    },
    {
      principalId: 'engi-system:branch-materializer',
      principalClass: 'engi-system-principal',
      authSource: 'policy',
      boundRefs: ['private-remediation-branch']
    },
    {
      principalId: 'engi-system:settlement-engine',
      principalClass: 'engi-system-principal',
      authSource: 'policy',
      boundRefs: ['settlement-engine']
    },
    {
      principalId: 'engi-system:proof-publisher',
      principalClass: 'engi-system-principal',
      authSource: 'policy',
      boundRefs: ['bounded-public-proof']
    },
    {
      principalId: 'reviewer:security',
      principalClass: 'authorized-reviewer',
      authSource: 'policy',
      boundRefs: [buyer.repo]
    },
    {
      principalId: 'public:reader',
      principalClass: 'public-reader',
      authSource: 'policy',
      boundRefs: ['bounded-public-proof']
    },
    ...sessionBindings,
    ...selectedCandidates.map((candidate) => ({
      principalId: candidate.asset.attestations[0]?.signerAddress || `issuer:${candidate.assetId}`,
      principalClass: 'issuer-principal',
      authSource: 'attestation',
      boundRefs: [
        candidate.assetId,
        candidate.asset.contentRoot,
        candidate.asset.addressingSurface?.repo,
        candidate.asset.githubAppAuthSurface?.installationId,
        candidate.asset.artifactSelectionSurface?.selectedInventoryRoot,
        candidate.asset.addressingSurface?.addressingRoot,
        candidate.asset.githubAppAuthSurface?.authPayloadHash,
        candidate.asset.signingSurface?.payloadHash
      ].filter(Boolean),
      surfaceRoots: {
        selectionRoot: candidate.asset.artifactSelectionSurface?.selectedInventoryRoot,
        addressingRoot: candidate.asset.addressingSurface?.addressingRoot,
        authPayloadHash: candidate.asset.githubAppAuthSurface?.authPayloadHash,
        payloadHash: candidate.asset.signingSurface?.payloadHash
      },
      selectedInventoryEntryIds: candidate.asset.artifactSelectionSurface?.selectedInventoryEntryIds || []
    }))
  ];

  return bindings.map((binding) => ({
    ...binding,
    bindingRoot: stableHashObject({
      principalId: binding.principalId,
      principalClass: binding.principalClass,
      authSource: binding.authSource,
      boundRefs: binding.boundRefs,
      surfaceRoots: binding.surfaceRoots || {},
      selectedInventoryEntryIds: binding.selectedInventoryEntryIds || []
    })
  }));
}

function buildAuthorizationDecisions(policyState, bindings, buyer, branchName, assetPack) {
  return [
    makeAuthorizationDecision(bindings.find((binding) => binding.principalId === `github-app-installation:${buyer.installationId}`), 'read:repo-artifact-inventory', buyer.repo, policyState),
    makeAuthorizationDecision(bindings.find((binding) => binding.principalId === `buyer:${buyer.buyerId}`), 'read:private-branch', branchName, policyState),
    makeAuthorizationDecision(bindings.find((binding) => binding.principalId === `buyer:${buyer.buyerId}`), 'materialize:selected-source-material', `${branchName}/.engi/source-material`, policyState),
    makeAuthorizationDecision(bindings.find((binding) => binding.principalId === `buyer:${buyer.buyerId}`), 'settle:journal-event', assetPack.assetPackId, policyState),
    makeAuthorizationDecision(bindings.find((binding) => binding.principalId === 'engi-system:branch-materializer'), 'write:private-branch', branchName, policyState),
    makeAuthorizationDecision(bindings.find((binding) => binding.principalId === 'engi-system:branch-materializer'), 'materialize:selected-source-material', `${branchName}/.engi/source-material`, policyState),
    makeAuthorizationDecision(bindings.find((binding) => binding.principalId === 'engi-system:settlement-engine'), 'settle:journal-event', assetPack.assetPackId, policyState),
    makeAuthorizationDecision(bindings.find((binding) => binding.principalId === 'engi-system:proof-publisher'), 'derive:bounded-public-proof-metadata', `${branchName}#bounded-proof`, policyState),
    makeAuthorizationDecision(bindings.find((binding) => binding.principalId === 'reviewer:security'), 'read:private-branch', branchName, policyState),
    makeAuthorizationDecision(bindings.find((binding) => binding.principalId === 'public:reader'), 'read:bounded-public-proof', `${branchName}#bounded-proof`, policyState),
    makeAuthorizationDecision(bindings.find((binding) => binding.principalId === `buyer:${buyer.buyerId}`), 'open:delivery', branchName, policyState)
  ];
}

function buildSensitiveDataFlowRecords(policyState, buyer, branchName, assetPack, selectedCandidates) {
  return [
    {
      recordId: `flow_${sha256(`${branchName}:repo-source`).slice(0, 10)}`,
      dataClass: 'repo-private-source',
      fromSurface: `${buyer.repo}@${buyer.buyerBranch}`,
      toSurface: 'engi.need-measurement.workspace',
      transformation: 'benchmark-need-measurement',
      authorizedPrincipals: [`buyer:${buyer.buyerId}`, 'engi-system:need-measurement'],
      retentionPolicyId: 'retention/private-remediation-30d',
      disclosurePolicyId: 'disclosure/private-only',
      proofRefs: [assetPack.assetPackId]
    },
    {
      recordId: `flow_${sha256(`${branchName}:verification`).slice(0, 10)}`,
      dataClass: 'verification-evidence',
      fromSurface: `${buyer.repo}@${buyer.buyerBranch}`,
      toSurface: `${branchName}/.engi/verification-report.json`,
      transformation: 'verification-report-materialization',
      authorizedPrincipals: ['engi-system:need-measurement', 'engi-system:branch-materializer'],
      retentionPolicyId: 'retention/private-remediation-30d',
      disclosurePolicyId: 'disclosure/private-only',
      proofRefs: selectedCandidates.map((candidate) => candidate.assetId)
    },
    {
      recordId: `flow_${sha256(`${branchName}:licensed-source`).slice(0, 10)}`,
      dataClass: 'licensed-source-material',
      fromSurface: assetPack.assetPackId,
      toSurface: `${branchName}/.engi/source-material/`,
      transformation: 'source-material-mount',
      authorizedPrincipals: [`buyer:${buyer.buyerId}`, 'engi-system:branch-materializer'],
      retentionPolicyId: 'retention/private-remediation-30d',
      disclosurePolicyId: 'disclosure/private-only',
      proofRefs: selectedCandidates.map((candidate) => candidate.assetId)
    },
    {
      recordId: `flow_${sha256(`${branchName}:branch-artifacts`).slice(0, 10)}`,
      dataClass: 'private-branch-derived-artifact',
      fromSurface: branchName,
      toSurface: `${branchName}/ENGI_NEED.md`,
      transformation: 'human-readable-branch-briefing',
      authorizedPrincipals: ['engi-system:branch-materializer', `buyer:${buyer.buyerId}`],
      retentionPolicyId: 'retention/private-remediation-30d',
      disclosurePolicyId: 'disclosure/private-only',
      proofRefs: [assetPack.assetPackId, 'ENGI_NEED.md']
    },
    {
      recordId: `flow_${sha256(`${branchName}:settlement-preview`).slice(0, 10)}`,
      dataClass: 'settlement-preview',
      fromSurface: `${branchName}/.engi/asset-pack.lock.json`,
      toSurface: `${branchName}/.engi/settlement-preview.json`,
      transformation: 'settlement-preview-derivation',
      authorizedPrincipals: ['engi-system:settlement-engine'],
      retentionPolicyId: 'retention/private-remediation-30d',
      disclosurePolicyId: 'disclosure/private-only',
      proofRefs: ['settlement-preview', assetPack.assetPackId]
    },
    {
      recordId: `flow_${sha256(`${branchName}:private-proof`).slice(0, 10)}`,
      dataClass: 'private-proof-artifact',
      fromSurface: `${branchName}/.engi/journal-diff.json`,
      toSurface: `${branchName}/.engi/system-proof-bundle.json`,
      transformation: 'cross-proof-bundle-assembly',
      authorizedPrincipals: ['engi-system:settlement-engine', 'engi-system:proof-publisher'],
      retentionPolicyId: 'retention/private-remediation-30d',
      disclosurePolicyId: 'disclosure/private-only',
      proofRefs: ['system-proof-bundle', 'journal-diff']
    },
    {
      recordId: `flow_${sha256(`${branchName}:bounded-proof`).slice(0, 10)}`,
      dataClass: 'bounded-public-proof-metadata',
      fromSurface: `${branchName}/.engi/system-proof-bundle.json`,
      toSurface: 'bounded-public-proof-surface',
      transformation: 'bounded-proof-summary-projection',
      authorizedPrincipals: ['engi-system:proof-publisher'],
      retentionPolicyId: 'retention/bounded-public-365d',
      disclosurePolicyId: 'disclosure/bounded-public',
      proofRefs: ['system-proof-bundle']
    }
  ].map((record) => ({
    ...record,
    policyRef: policyState.policyRef
  }));
}

function buildBranchPolicyRelease(policyState, branchName, assetPack, selectedCandidates) {
  return {
    branchName,
    assetPackId: assetPack.assetPackId,
    releaseId: policyState.releaseId,
    releasePolicyId: policyState.releaseId,
    policyRef: policyState.policyRef,
    conformanceProfile: PROFILE_A,
    productionIntentProfile: PROFILE_B,
    confidentialityDefault: 'private-required',
    artifactClasses: [
      { path: '.engi/need.json', sensitiveDataClass: 'private-branch-derived-artifact', disclosable: false },
      { path: '.engi/depositing-surface.json', sensitiveDataClass: 'private-proof-artifact', disclosable: false },
      { path: '.engi/needing-surface.json', sensitiveDataClass: 'bounded-public-proof-metadata', disclosable: true },
      { path: '.engi/depositing-to-needing-surface.json', sensitiveDataClass: 'bounded-public-proof-metadata', disclosable: true },
      { path: '.engi/match-report.json', sensitiveDataClass: 'bounded-public-proof-metadata', disclosable: true },
      { path: '.engi/verification-report.json', sensitiveDataClass: 'verification-evidence', disclosable: false },
      { path: '.engi/authorization-decisions.json', sensitiveDataClass: 'private-proof-artifact', disclosable: false },
      { path: '.engi/sensitive-data-flow.json', sensitiveDataClass: 'private-proof-artifact', disclosable: false },
      { path: '.engi/policy-release.json', sensitiveDataClass: 'private-proof-artifact', disclosable: false },
      { path: '.engi/prompt-contracts.json', sensitiveDataClass: 'private-proof-artifact', disclosable: false },
      { path: '.engi/prompt-completeness-proof.json', sensitiveDataClass: 'bounded-public-proof-metadata', disclosable: true },
      { path: '.engi/code-analysis-fact-registry.json', sensitiveDataClass: 'bounded-public-proof-metadata', disclosable: true },
      { path: '.engi/static-heuristics-registry.json', sensitiveDataClass: 'bounded-public-proof-metadata', disclosable: true },
      { path: '.engi/measurement-receipts.json', sensitiveDataClass: 'private-proof-artifact', disclosable: false },
      { path: '.engi/static-measurement-report.json', sensitiveDataClass: 'bounded-public-proof-metadata', disclosable: true },
      { path: '.engi/static-measurement-proof.json', sensitiveDataClass: 'bounded-public-proof-metadata', disclosable: true },
      { path: '.engi/verification-receipts.json', sensitiveDataClass: 'private-proof-artifact', disclosable: false },
      { path: '.engi/materialization-proof.json', sensitiveDataClass: 'bounded-public-proof-metadata', disclosable: true },
      { path: '.engi/materialization-exclusions.json', sensitiveDataClass: 'private-proof-artifact', disclosable: false },
      { path: '.engi/proof-witness-manifest.json', sensitiveDataClass: 'private-proof-artifact', disclosable: false },
      { path: '.engi/materialization-visibility-proof.json', sensitiveDataClass: 'bounded-public-proof-metadata', disclosable: true },
      { path: '.engi/projection-policy.json', sensitiveDataClass: 'bounded-public-proof-metadata', disclosable: true },
      { path: '.engi/bounded-public-proof.json', sensitiveDataClass: 'bounded-public-proof-metadata', disclosable: true },
      { path: '.engi/redaction-proof.json', sensitiveDataClass: 'bounded-public-proof-metadata', disclosable: true },
      { path: '.engi/disclosure-proof.json', sensitiveDataClass: 'bounded-public-proof-metadata', disclosable: true },
      { path: '.engi/source-to-shares.json', sensitiveDataClass: 'private-proof-artifact', disclosable: false },
      { path: '.engi/settlement-participation.json', sensitiveDataClass: 'settlement-preview', disclosable: false },
      { path: '.engi/accounting-precision-report.json', sensitiveDataClass: 'private-proof-artifact', disclosable: false },
      { path: '.engi/scenario-fixture-manifest.json', sensitiveDataClass: 'bounded-public-proof-metadata', disclosable: true },
      { path: '.engi/test-coverage-report.json', sensitiveDataClass: 'bounded-public-proof-metadata', disclosable: true },
      { path: '.engi/source-material/', sensitiveDataClass: 'licensed-source-material', disclosable: false },
      { path: '.engi/settlement-preview.json', sensitiveDataClass: 'settlement-preview', disclosable: false },
      { path: '.engi/settlement-proof.json', sensitiveDataClass: 'private-proof-artifact', disclosable: false },
      { path: '.engi/system-proof-bundle.json', sensitiveDataClass: 'private-proof-artifact', disclosable: false },
      { path: 'ENGI_NEED.md', sensitiveDataClass: 'private-branch-derived-artifact', disclosable: false }
    ],
    retentionRules: [
      { retentionPolicyId: 'retention/private-remediation-30d', appliesTo: ['.engi/source-material/', '.engi/settlement-preview.json', '.engi/settlement-proof.json', 'ENGI_NEED.md'], ttlDays: 30 },
      { retentionPolicyId: 'retention/bounded-public-365d', appliesTo: ['bounded-public-proof-surface'], ttlDays: 365 }
    ],
    revocationRules: {
      revokedIssuerBlocksNewSettlement: true,
      revokedIssuerBlocksNewDelivery: true,
      'previouslyIssuedArtifactsRemainHash-addressableOnly': true
    },
    selectedAssets: selectedCandidates.map((candidate) => candidate.assetId),
    selectedAssetBindings: selectedCandidates.map((candidate) => ({
      assetId: candidate.assetId,
      useTier: candidate.useTier,
      sourceMaterialBinding: candidate.asset.sourceMaterialBinding
    }))
  };
}

function buildJournalCompletenessProof(eventId, journalDiff) {
  return settlementRuntime.buildJournalCompletenessProof(eventId, journalDiff);
}

function buildIdentityAuthorizationProof(branchName, authorizationDecisions, bindings, selectedCandidates = []) {
  const inventoryBackedCandidates = selectedCandidates.filter((candidate) => (candidate.asset.artifactSelectionSurface?.selectedInventoryEntryIds || []).length > 0);
  return {
    resourceRef: branchName,
    allAccessBoundToKnownPrincipals: authorizationDecisions.every((decision) => bindings.some((binding) => binding.principalId === decision.principalId)),
    allStateChangingActionsAuthorized: authorizationDecisions.filter((decision) => decision.action === 'settle:journal-event' || decision.action === 'write:private-branch' || decision.action === 'materialize:selected-source-material').every((decision) => decision.decision === 'allow'),
    issuerIdentityBound: bindings.some((binding) => binding.principalClass === 'issuer-principal'),
    buyerDeliveryPrincipalsBound: bindings.some((binding) => binding.principalClass === 'buyer-principal'),
    githubAppInstallationBound: bindings.some((binding) => binding.principalClass === 'github-app-installation-principal'),
    repoArtifactInventoryReadAuthorized: authorizationDecisions.some((decision) => decision.action === 'read:repo-artifact-inventory' && decision.decision === 'allow'),
    selectedAssetsAddressed: selectedCandidates.every((candidate) => !!candidate.asset.addressingSurface?.repo),
    selectedAssetsSigned: selectedCandidates.every((candidate) => !!candidate.asset.signingSurface?.signerAddress && !!candidate.asset.signingSurface?.attestationHash),
    selectedAssetsSignedAgainstAddressing: selectedCandidates.every((candidate) => candidate.asset.signingSurface?.signedAddressingRoot === candidate.asset.addressingSurface?.addressingRoot),
    selectedAssetsSignedAgainstInventorySelection: selectedCandidates.every((candidate) => candidate.asset.signingSurface?.signedSelectionRoot === candidate.asset.artifactSelectionSurface?.selectedInventoryRoot),
    selectedAssetsSignedAgainstGitHubAppAuth: selectedCandidates.every((candidate) => candidate.asset.signingSurface?.signedGitHubAppAuthRoot === candidate.asset.githubAppAuthSurface?.authPayloadHash),
    selectedAssetsHaveInstallationScopedAuthWhenInventoryBacked: selectedCandidates.every((candidate) => {
      const inventoryBacked = (candidate.asset.artifactSelectionSurface?.selectedInventoryEntryIds || []).length > 0;
      return !inventoryBacked || !!candidate.asset.githubAppAuthSurface?.installationId;
    }),
    inventoryBackedAssetsPreserveSelectionSnapshots: inventoryBackedCandidates.every((candidate) => {
      const selectedIds = candidate.asset.artifactSelectionSurface?.selectedInventoryEntryIds || [];
      const selectedEntries = candidate.asset.artifactSelectionSurface?.selectedInventoryEntries || [];
      return selectedIds.length === selectedEntries.length;
    }),
    installationScopedBindingsMatchRepo: inventoryBackedCandidates.every((candidate) =>
      candidate.asset.githubAppAuthSurface?.repositoryId === candidate.asset.addressingSurface?.repositoryId
    ),
    witnessRefs: {
      principalIds: bindings.map((binding) => binding.principalId),
      decisionIds: authorizationDecisions.map((decision) => `${decision.principalId}:${decision.action}`),
      selectedAssetAddressRefs: selectedCandidates.map((candidate) => ({
        assetId: candidate.assetId,
        repo: candidate.asset.addressingSurface?.repo,
        selectedInventoryEntryIds: candidate.asset.addressingSurface?.selectedInventoryEntryIds || [],
        installationId: candidate.asset.githubAppAuthSurface?.installationId,
        selectionRoot: candidate.asset.artifactSelectionSurface?.selectedInventoryRoot,
        addressingRoot: candidate.asset.addressingSurface?.addressingRoot,
        authPayloadHash: candidate.asset.githubAppAuthSurface?.authPayloadHash,
        signedPayloadHash: candidate.asset.signingSurface?.payloadHash
      }))
    },
    proofHash: stableHashObject({
      branchName,
      principalIds: bindings.map((binding) => binding.principalId),
      decisionIds: authorizationDecisions.map((decision) => `${decision.principalId}:${decision.action}`),
      selectedAssetAddressRefs: selectedCandidates.map((candidate) => ({
        assetId: candidate.assetId,
        repo: candidate.asset.addressingSurface?.repo,
        selectedInventoryEntryIds: candidate.asset.addressingSurface?.selectedInventoryEntryIds || [],
        installationId: candidate.asset.githubAppAuthSurface?.installationId,
        selectionRoot: candidate.asset.artifactSelectionSurface?.selectedInventoryRoot,
        addressingRoot: candidate.asset.addressingSurface?.addressingRoot,
        authPayloadHash: candidate.asset.githubAppAuthSurface?.authPayloadHash,
        signedPayloadHash: candidate.asset.signingSurface?.payloadHash
      }))
    })
  };
}

function buildSensitiveDataFlowProof(records) {
  const coveredClasses = new Set(records.map((record) => record.dataClass));
  return {
    allPrivateArtifactsClassified: records.every((record) => !!record.dataClass),
    allFlowsRecorded: records.length > 0,
    requiredSensitiveClassesCovered: REQUIRED_SENSITIVE_DATA_CLASSES.every((dataClass) => coveredClasses.has(dataClass)),
    noUnauthorizedPublicDisclosure: records.every((record) => !(PRIVATE_DATA_CLASSES.has(record.dataClass) && record.toSurface === 'public')),
    retentionPoliciesAssigned: records.every((record) => !!record.retentionPolicyId),
    revocationBehaviorDefined: records.every((record) => !!record.disclosurePolicyId),
    witnessRefs: {
      flowRecordIds: records.map((record) => record.recordId),
      coveredDataClasses: [...coveredClasses]
    },
    proofHash: stableHashObject({
      flowRecordIds: records.map((record) => record.recordId),
      coveredDataClasses: [...coveredClasses]
    })
  };
}

function buildAssetMeasurementProofs(selectedCandidates) {
  return selectedCandidates.map((candidate) => ({
    assetId: candidate.assetId,
    contentRoot: candidate.asset.contentRoot,
    unitRefs: candidate.asset.contentUnits.map((unit) => unit.unitId),
    measurementsTraceableToUnits: candidate.asset.contentUnits.length > 0,
    measurementReplayable: (candidate.asset.assetMeasurement?.provenance || []).length > 0,
    measurementPolicySatisfied: !!candidate.asset.assetMeasurement && (candidate.asset.assetMeasurement.provenance || []).length > 0,
    witnessRefs: {
      receiptRefs: (candidate.asset.assetMeasurement?.staticExecutionReceipts || []).map((receipt) => receipt.receiptId),
      unitHashes: candidate.asset.contentUnits.map((unit) => unit.unitHash)
    }
  }));
}

function buildProofContract({ needId, assetPackId, branchName, selectedCandidates, authorizationDecisions, sensitiveDataFlowRecords }) {
  return {
    contractId: `proof_contract_${sha256(`${needId}:${assetPackId}:${branchName}`).slice(0, 12)}` ,
    needId,
    assetPackId,
    branchName,
    evidenceChain: [
      { stage: 'need-measurement', artifactRefs: ['.engi/need.json', '.engi/need-measurement.json', '.engi/benchmark-target.json'], claim: 'The engineering need is derived fail-closed from canonical benchmark evidence.' },
      { stage: 'ranking-and-verification', artifactRefs: ['.engi/match-report.json', '.engi/verification-report.json', '.engi/prompt-surfaces.json'], claim: 'Candidate ranking, prompt lineage, and verification tiers are all inspectable.' },
      { stage: 'identity-and-boundaries', artifactRefs: ['.engi/identity-bindings.json', '.engi/authorization-decisions.json', '.engi/github-boundary.json', '.engi/external-boundary-manifest.json'], claim: 'Identity, signer, auth, and external boundaries are distinct and bound.' },
      { stage: 'materialization', artifactRefs: ['.engi/asset-pack.lock.json', '.engi/selected-source-material.json', '.engi/materialization-visibility-proof.json', 'ENGI_NEED.md'], claim: 'Only allowed assets and units are materialized into the private remediation branch.' },
      { stage: 'settlement-and-proof', artifactRefs: ['.engi/settlement-preview.json', '.engi/source-to-shares.json', '.engi/settlement-participation.json', '.engi/accounting-precision-report.json', '.engi/settlement-proof.json', '.engi/journal-diff.json', '.engi/system-proof-bundle.json'], claim: 'Settlement and proof closure are exact-accounting, theorem-checked, and replayable from source contribution to journal entry.' }
    ],
    theoremChecks: [
      'selected assets respect branch-mode use tiers',
      'all state-changing actions are authorized',
      'no unauthorized public disclosure occurs',
      'source-to-shares clipping and tie-breaks are replayable',
      'debits equal credits exactly',
      'asset-pack lock binds settlement refs closed'
    ],
    artifactBindings: {
      selectedAssets: selectedCandidates.map((candidate) => ({ assetId: candidate.assetId, contentRoot: candidate.asset.contentRoot, attestationHash: candidate.asset.attestations[0]?.attestationHash })),
      authorizationDecisionCount: authorizationDecisions.length,
      sensitiveFlowCount: sensitiveDataFlowRecords.length
    }
  };
}

function buildSettlementProof(journalDiff, assetPackLock) {
  return settlementRuntime.buildSettlementProof(journalDiff, assetPackLock);
}

function buildSettlementParticipationArtifact({ evaluatedCandidates, selectedCandidates, settlementCandidates, assetPackLock, sourceToSharesArtifact, settledShares, allocations, branchMode }) {
  return settlementRuntime.buildSettlementParticipationArtifact({
    evaluatedCandidates,
    selectedCandidates,
    settlementCandidates,
    assetPackLock,
    sourceToSharesArtifact,
    settledShares,
    allocations,
    branchMode
  });
}

function buildUnitCatalog(selectedCandidates) {
  return {
    conformanceProfile: PROFILE_A,
    productionIntentProfile: PROFILE_B,
    units: selectedCandidates.flatMap((candidate) => candidate.asset.contentUnits.map((unit) => ({
      assetId: candidate.assetId,
      title: candidate.asset.title,
      useTier: candidate.useTier,
      selectionRoot: candidate.asset.artifactSelectionSurface?.selectedInventoryRoot,
      selectedInventoryEntryIds: candidate.asset.artifactSelectionSurface?.selectedInventoryEntryIds || [],
      addressingRoot: candidate.asset.addressingSurface?.addressingRoot,
      ...unitSemanticSummary(unit)
    })))
  };
}

export function settleNeedEvent(state, { buyer, need, assetPack, assetPackLock, evaluatedCandidates, selectedCandidates, branchName, branchMode }) {
  return settlementRuntime.settleNeedEvent(state, {
    buyer,
    need,
    assetPack,
    assetPackLock,
    evaluatedCandidates,
    selectedCandidates,
    branchName,
    branchMode
  });
}

function assertRequiredBranchArtifacts(branchArtifacts) {
  return evaluationMaterializationRuntime.assertRequiredBranchArtifacts(branchArtifacts);
}

function buildBranchArtifacts({ need, needMeasurement, benchmarkTarget, branchMode, branchName, depositingSurface, needingSurface, depositingToNeedingSurface, matchReport, verificationReport, evalManifest, assetPack, assetPackLock, selectedSourceMaterialManifest, settlementPreview, settlementProof, systemProofBundle, authorizationDecisions, sensitiveDataFlowRecords, policyRelease, deliverablesManifest, unitCatalog, pipelineTelemetry, selectedCandidates, journalDiff, identityBindings, githubBoundarySurface, artifactUploadManifest, profileCompositionSurface, promptSurfaces, promptContracts, promptCompletenessProof, parsedCompletionEnvelopes, parsedCompletionEnvelopeArtifact, externalBoundaryManifest, measurementReceipts, staticMeasurementReport, staticMeasurementProof, codeAnalysisFactRegistry, staticHeuristicsRegistry, verificationReceiptsArtifact, proofWitnessManifest, materializationProof, materializationExclusions, materializationVisibilityProof, sourceToSharesArtifact, settlementParticipationArtifact, accountingPrecisionReport, scenarioFixtureManifest, testCoverageReport, projectionPolicy, boundedPublicProof, redactionProof, disclosureProof }) {
  return evaluationMaterializationRuntime.buildBranchArtifacts({
    need,
    needMeasurement,
    benchmarkTarget,
    branchMode,
    branchName,
    depositingSurface,
    needingSurface,
    depositingToNeedingSurface,
    matchReport,
    verificationReport,
    evalManifest,
    assetPack,
    assetPackLock,
    selectedSourceMaterialManifest,
    settlementPreview,
    settlementProof,
    systemProofBundle,
    authorizationDecisions,
    sensitiveDataFlowRecords,
    policyRelease,
    deliverablesManifest,
    unitCatalog,
    pipelineTelemetry,
    selectedCandidates,
    journalDiff,
    identityBindings,
    githubBoundarySurface,
    artifactUploadManifest,
    profileCompositionSurface,
    promptSurfaces,
    promptContracts,
    promptCompletenessProof,
    parsedCompletionEnvelopes,
    parsedCompletionEnvelopeArtifact,
    externalBoundaryManifest,
    measurementReceipts,
    staticMeasurementReport,
    staticMeasurementProof,
    codeAnalysisFactRegistry,
    staticHeuristicsRegistry,
    verificationReceiptsArtifact,
    proofWitnessManifest,
    materializationProof,
    materializationExclusions,
    materializationVisibilityProof,
    sourceToSharesArtifact,
    settlementParticipationArtifact,
    accountingPrecisionReport,
    scenarioFixtureManifest,
    testCoverageReport,
    projectionPolicy,
    boundedPublicProof,
    redactionProof,
    disclosureProof
  });
}

export function runMakeEngiBranch(state, { buyerId, scenarioId, branchMode = DEFAULT_BRANCH_MODE } = {}) {
  const buyer = state.buyers.find((entry) => entry.buyerId === (buyerId || state.buyers[0]?.buyerId));
  const scenario = state.needScenarios.find((entry) => entry.scenarioId === (scenarioId || state.needScenarios[0]?.scenarioId));
  if (!buyer) throw new Error('Buyer not found.');
  if (!scenario) throw new Error('Need scenario not found.');
  const scenarioBoundBuyer = {
    ...buyer,
    repo: scenario.repo,
    buyerBranch: scenario.baseRef,
    installationId: scenario.installationId
  };

  const policyState = state.policyState || buildPolicyState();
  const needMeasurement = measureNeedFromScenario(scenario);
  const {
    needDescriptor: need,
    benchmarkTarget,
    benchmarkParserContract,
    canonicalBenchmarkOutputs,
    parserValidation,
    inferenceProofs,
    promptSurfaces,
    promptContracts,
    promptCompletenessProof,
    parsedCompletionEnvelopes,
    parsedCompletionEnvelopeArtifact
  } = needMeasurement;
  const evaluatedCandidates = evaluateCandidates(need, state.assets, policyState);
  const assetPack = assembleAssetPack(need, evaluatedCandidates, branchMode);
  const selectedCandidates = evaluatedCandidates.filter((candidate) => assetPack.selectedAssets.includes(candidate.assetId));
  if (!selectedCandidates.length) throw new Error('No candidates survived into the asset pack.');
  const depositingSurface = buildDepositingSurface({
    buyer: scenarioBoundBuyer,
    need,
    assetPack,
    selectedCandidates
  });
  const needingSurface = buildNeedingSurface(need);

  const branchName = `engi/remediation-${need.needId}-${toSlug(scenario.scenarioId)}`;
  const matchReport = buildMatchReport(need, evaluatedCandidates, assetPack);
  const verificationReport = buildVerificationReport(need, evaluatedCandidates, branchMode);
  const evalManifest = buildEvalManifest(need, evaluatedCandidates, promptSurfaces, parsedCompletionEnvelopes);
  const assetPackLock = buildAssetPackLock(assetPack, selectedCandidates);
  const selectedSourceMaterialManifest = buildSelectedSourceMaterialManifest(assetPack, selectedCandidates);
  const settlement = settleNeedEvent(state, {
    buyer: scenarioBoundBuyer,
    need,
    assetPack,
    assetPackLock,
    evaluatedCandidates,
    selectedCandidates,
    branchName,
    branchMode
  });
  const selectionConsistencyProof = buildSelectionConsistencyProof({
    assetPack,
    assetPackLock,
    selectedCandidates,
    settlementCandidates: selectedCandidates.filter((candidate) => candidate.useTier === 'settlement-eligible'),
    selectedSourceMaterialManifest,
    branchMode
  });
  const journalCompletenessProof = buildJournalCompletenessProof(settlement.eventId, settlement.journalDiff);
  const identityBindings = buildIdentityBindings(scenarioBoundBuyer, selectedCandidates);
  const githubBoundarySurface = buildGithubBoundarySurface(scenarioBoundBuyer, need, selectedCandidates);
  const artifactUploadManifest = buildArtifactUploadManifest(selectedCandidates);
  const profileCompositionSurface = buildProfileCompositions();
  const externalBoundaryManifest = buildExternalBoundaryManifest({ buyer: scenarioBoundBuyer, need, selectedCandidates, assetPack, settlementPreview: settlement.settlementPreview });
  const authorizationDecisions = buildAuthorizationDecisions(policyState, identityBindings, scenarioBoundBuyer, branchName, assetPack);
  const sensitiveDataFlowRecords = buildSensitiveDataFlowRecords(policyState, scenarioBoundBuyer, branchName, assetPack, selectedCandidates);
  const identityAuthorizationProof = buildIdentityAuthorizationProof(branchName, authorizationDecisions, identityBindings, selectedCandidates);
  const sensitiveDataFlowProof = buildSensitiveDataFlowProof(sensitiveDataFlowRecords);
  const assetMeasurementProofs = buildAssetMeasurementProofs(selectedCandidates);
  const settlementProof = buildSettlementProof(settlement.journalDiff, assetPackLock);
  const depositingToNeedingSurface = buildDepositingToNeedingSurface({
    depositingSurface,
    needingSurface,
    selectedCandidates,
    assetPack,
    settlementPreview: settlement.settlementPreview
  });
  const promptImplementationSurface = buildPromptImplementationSurface(inferenceProofs, promptSurfaces, parsedCompletionEnvelopes, parsedCompletionEnvelopeArtifact);
  const proofContract = buildProofContract({ needId: need.needId, assetPackId: assetPack.assetPackId, branchName, selectedCandidates, authorizationDecisions, sensitiveDataFlowRecords });
  const policyRelease = buildBranchPolicyRelease(policyState, branchName, assetPack, selectedCandidates);
  const unitCatalog = buildUnitCatalog(selectedCandidates);
  const scenarioFixtureManifest = buildScenarioFixtureManifest(state, scenario.scenarioId);
  const measurementReceipts = collectStaticExecutionReceipts([
    needMeasurement.staticExecutionReceipts,
    evaluatedCandidates.map((candidate) => candidate.staticExecutionReceipts),
    state.assets.map((asset) => asset.assetMeasurement?.staticExecutionReceipts)
  ]);
  const codeAnalysisFactRegistry = buildCodeAnalysisFactRegistry({ need, evaluatedCandidates });
  const staticHeuristicsRegistry = buildStaticHeuristicsRegistryArtifact(codeAnalysisFactRegistry);
  const staticMeasurementReport = buildStaticMeasurementReport(measurementReceipts, needMeasurement, evaluatedCandidates);
  const staticMeasurementProof = buildStaticMeasurementProof(measurementReceipts, needMeasurement, evaluatedCandidates);
  const verificationReceiptsArtifact = buildVerificationReceiptsArtifact(need, evaluatedCandidates);
  const pipelineTelemetry = buildPipelineTelemetry({
    need,
    evaluatedCandidates,
    assetPack,
    selectedCandidates,
    verificationReport,
    settlementPreview: settlement.settlementPreview,
    journalDiff: settlement.journalDiff
  });
  const testCoverageReport = buildTestCoverageReport({
    state,
    scenarioFixtureManifest,
    activeScenarioId: scenario.scenarioId,
    selectedCandidates,
    settlementParticipationArtifact: settlement.settlementParticipationArtifact
  });
  const deliverablesManifest = buildDeliverablesManifest({
    branchName,
    need,
    benchmarkTarget,
    depositingSurface,
    needingSurface,
    depositingToNeedingSurface,
    assetPack,
    assetPackLock,
    settlementPreview: settlement.settlementPreview,
    settlementProof,
    selectedSourceMaterialManifest,
    policyRelease,
    unitCatalog,
    pipelineTelemetry,
    identityBindings,
    githubBoundarySurface,
    artifactUploadManifest,
    profileCompositionSurface,
    externalBoundaryManifest,
    promptSurfaces,
    parsedCompletionEnvelopeArtifact
  });
  const provisionalBoundedPublicProof = buildBoundedPublicProofArtifact({
    need,
    assetPack,
    settlement,
    proofContract,
    branchName,
    promptCompletenessProof,
    staticMeasurementReport
  });
  const provisionalBranchArtifacts = {
    branchName,
    branchMode,
    confidentiality: 'private-required',
    files: {}
  };
  const projectionPolicy = buildProjectionPolicy(policyRelease, provisionalBranchArtifacts, DEFAULT_PROJECTION_PRINCIPAL);
  const redactionProof = buildRedactionProof({
    policyRelease,
    branchArtifacts: provisionalBranchArtifacts,
    projectionPolicy,
    boundedPublicProof: provisionalBoundedPublicProof
  });
  const disclosureProof = buildDisclosureProof({
    policyRelease,
    projectionPolicy,
    boundedPublicProof: provisionalBoundedPublicProof
  });
  const materializationVisibilityProof = buildMaterializationVisibilityProof({
    assetPackLock,
    selectedSourceMaterialManifest,
    projectionPolicy,
    policyRelease
  });
  let materializationExclusions = buildMaterializationExclusions({
    assetPack,
    evaluatedCandidates,
    selectedCandidates,
    branchMode
  });
  let materializationProof = buildMaterializationProof({
    assetPack,
    assetPackLock,
    selectedSourceMaterialManifest,
    materializationVisibilityProof,
    materializationExclusions,
    branchMode
  });
  let proofWitnessManifest = buildProofWitnessManifest({
    inferenceProofs,
    promptSurfaces,
    promptContracts,
    promptImplementationSurface,
    promptCompletenessProof,
    parsedCompletionEnvelopes,
    parsedCompletionEnvelopeArtifact,
    assetPackLock,
    selectedSourceMaterialManifest,
    codeAnalysisFactRegistry,
    staticHeuristicsRegistry,
    measurementReceipts,
    staticMeasurementReport,
    staticMeasurementProof,
    verificationReport,
    verificationReceiptsArtifact,
    identityBindings,
    authorizationDecisions,
    sensitiveDataFlowRecords,
    selectionConsistencyProof,
    journalCompletenessProof,
    identityAuthorizationProof,
    sensitiveDataFlowProof,
    materializationProof,
    materializationExclusions,
    materializationVisibilityProof,
    sourceToSharesArtifact: settlement.sourceToSharesArtifact,
    settlementParticipationArtifact: settlement.settlementParticipationArtifact,
    accountingPrecisionReport: settlement.accountingPrecisionReport,
    settlementProof,
    journalDiff: settlement.journalDiff,
    redactionProof,
    disclosureProof,
    proofContract
  });
  let systemProofBundle = buildSystemProofBundle(
    need.needId,
    assetPack.assetPackId,
    inferenceProofs,
    parsedCompletionEnvelopes,
    parsedCompletionEnvelopeArtifact,
    assetMeasurementProofs,
    selectionConsistencyProof,
    journalCompletenessProof,
    identityAuthorizationProof,
    sensitiveDataFlowProof,
    settlementProof,
    promptImplementationSurface,
    promptCompletenessProof,
    staticMeasurementProof,
    materializationProof,
    materializationExclusions,
    materializationVisibilityProof,
    verificationReceiptsArtifact,
    settlement.sourceToSharesArtifact,
    settlement.settlementParticipationArtifact,
    settlement.accountingPrecisionReport,
    redactionProof,
    disclosureProof,
    proofWitnessManifest,
    proofContract
  );
  let branchArtifacts = buildBranchArtifacts({
    need,
    needMeasurement,
    benchmarkTarget,
    branchMode,
    branchName,
    depositingSurface,
    needingSurface,
    depositingToNeedingSurface,
    matchReport,
    verificationReport,
    evalManifest,
    assetPack,
    assetPackLock,
    selectedSourceMaterialManifest,
    settlementPreview: settlement.settlementPreview,
    settlementProof,
    systemProofBundle,
    authorizationDecisions,
    sensitiveDataFlowRecords,
    policyRelease,
    deliverablesManifest,
    unitCatalog,
    pipelineTelemetry,
    selectedCandidates,
    journalDiff: settlement.journalDiff,
    identityBindings,
    githubBoundarySurface,
    artifactUploadManifest,
    profileCompositionSurface,
    promptSurfaces,
    promptContracts,
    promptCompletenessProof,
    parsedCompletionEnvelopes,
    parsedCompletionEnvelopeArtifact,
    codeAnalysisFactRegistry,
    staticHeuristicsRegistry,
    externalBoundaryManifest,
    measurementReceipts,
    staticMeasurementReport,
    staticMeasurementProof,
    verificationReceiptsArtifact,
    proofWitnessManifest,
    materializationProof,
    materializationExclusions,
    materializationVisibilityProof,
    sourceToSharesArtifact: settlement.sourceToSharesArtifact,
    settlementParticipationArtifact: settlement.settlementParticipationArtifact,
    accountingPrecisionReport: settlement.accountingPrecisionReport,
    scenarioFixtureManifest,
    testCoverageReport,
    projectionPolicy,
    boundedPublicProof: provisionalBoundedPublicProof,
    redactionProof,
    disclosureProof
  });
  const boundedPublicProof = buildBoundedPublicProofArtifact({
    need,
    assetPack,
    settlement,
    proofContract,
    branchName,
    promptCompletenessProof,
    staticMeasurementReport
  });
  const finalizedProjectionPolicy = buildProjectionPolicy(policyRelease, branchArtifacts, DEFAULT_PROJECTION_PRINCIPAL);
  const finalizedRedactionProof = buildRedactionProof({
    policyRelease,
    branchArtifacts,
    projectionPolicy: finalizedProjectionPolicy,
    boundedPublicProof
  });
  const finalizedDisclosureProof = buildDisclosureProof({
    policyRelease,
    projectionPolicy: finalizedProjectionPolicy,
    boundedPublicProof
  });
  const finalizedMaterializationVisibilityProof = buildMaterializationVisibilityProof({
    assetPackLock,
    selectedSourceMaterialManifest,
    projectionPolicy: finalizedProjectionPolicy,
    policyRelease
  });
  materializationExclusions = buildMaterializationExclusions({
    assetPack,
    evaluatedCandidates,
    selectedCandidates,
    branchMode
  });
  materializationProof = buildMaterializationProof({
    assetPack,
    assetPackLock,
    selectedSourceMaterialManifest,
    materializationVisibilityProof: finalizedMaterializationVisibilityProof,
    materializationExclusions,
    branchMode
  });
  proofWitnessManifest = buildProofWitnessManifest({
    inferenceProofs,
    promptSurfaces,
    promptContracts,
    promptImplementationSurface,
    promptCompletenessProof,
    parsedCompletionEnvelopes,
    parsedCompletionEnvelopeArtifact,
    assetPackLock,
    selectedSourceMaterialManifest,
    codeAnalysisFactRegistry,
    staticHeuristicsRegistry,
    measurementReceipts,
    staticMeasurementReport,
    staticMeasurementProof,
    verificationReport,
    verificationReceiptsArtifact,
    identityBindings,
    authorizationDecisions,
    sensitiveDataFlowRecords,
    selectionConsistencyProof,
    journalCompletenessProof,
    identityAuthorizationProof,
    sensitiveDataFlowProof,
    materializationProof,
    materializationExclusions,
    materializationVisibilityProof: finalizedMaterializationVisibilityProof,
    sourceToSharesArtifact: settlement.sourceToSharesArtifact,
    settlementParticipationArtifact: settlement.settlementParticipationArtifact,
    accountingPrecisionReport: settlement.accountingPrecisionReport,
    settlementProof,
    journalDiff: settlement.journalDiff,
    redactionProof: finalizedRedactionProof,
    disclosureProof: finalizedDisclosureProof,
    proofContract
  });
  systemProofBundle = buildSystemProofBundle(
    need.needId,
    assetPack.assetPackId,
    inferenceProofs,
    parsedCompletionEnvelopes,
    parsedCompletionEnvelopeArtifact,
    assetMeasurementProofs,
    selectionConsistencyProof,
    journalCompletenessProof,
    identityAuthorizationProof,
    sensitiveDataFlowProof,
    settlementProof,
    promptImplementationSurface,
    promptCompletenessProof,
    staticMeasurementProof,
    materializationProof,
    materializationExclusions,
    finalizedMaterializationVisibilityProof,
    verificationReceiptsArtifact,
    settlement.sourceToSharesArtifact,
    settlement.settlementParticipationArtifact,
    settlement.accountingPrecisionReport,
    finalizedRedactionProof,
    finalizedDisclosureProof,
    proofWitnessManifest,
    proofContract
  );
  branchArtifacts = buildBranchArtifacts({
    need,
    needMeasurement,
    benchmarkTarget,
    branchMode,
    branchName,
    depositingSurface,
    needingSurface,
    depositingToNeedingSurface,
    matchReport,
    verificationReport,
    evalManifest,
    assetPack,
    assetPackLock,
    selectedSourceMaterialManifest,
    settlementPreview: settlement.settlementPreview,
    settlementProof,
    systemProofBundle,
    authorizationDecisions,
    sensitiveDataFlowRecords,
    policyRelease,
    deliverablesManifest,
    unitCatalog,
    pipelineTelemetry,
    selectedCandidates,
    journalDiff: settlement.journalDiff,
    identityBindings,
    githubBoundarySurface,
    artifactUploadManifest,
    profileCompositionSurface,
    promptSurfaces,
    promptContracts,
    promptCompletenessProof,
    parsedCompletionEnvelopes,
    parsedCompletionEnvelopeArtifact,
    codeAnalysisFactRegistry,
    staticHeuristicsRegistry,
    externalBoundaryManifest,
    measurementReceipts,
    staticMeasurementReport,
    staticMeasurementProof,
    verificationReceiptsArtifact,
    proofWitnessManifest,
    materializationProof,
    materializationExclusions,
    materializationVisibilityProof: finalizedMaterializationVisibilityProof,
    sourceToSharesArtifact: settlement.sourceToSharesArtifact,
    settlementParticipationArtifact: settlement.settlementParticipationArtifact,
    accountingPrecisionReport: settlement.accountingPrecisionReport,
    scenarioFixtureManifest,
    testCoverageReport,
    projectionPolicy: finalizedProjectionPolicy,
    boundedPublicProof,
    redactionProof: finalizedRedactionProof,
    disclosureProof: finalizedDisclosureProof
  });
  assertRequiredBranchArtifacts(branchArtifacts);
  const repoToSettlementSurface = buildRepoToSettlementSurface({
    scenarioId: scenario.scenarioId,
    depositingSurface,
    needingSurface,
    depositingToNeedingSurface,
    assetPack,
    branchArtifacts,
    selectedCandidates,
    proofWitnessManifest,
    boundedPublicProof,
    settlementPreview: settlement.settlementPreview
  });
  const identityAuthSpineSurface = buildIdentityAuthSpineSurface({
    buyer: scenarioBoundBuyer,
    branchName,
    selectedCandidates,
    identityBindings,
    authorizationDecisions,
    githubBoundarySurface,
    proofWitnessManifest,
    settlementPreview: settlement.settlementPreview
  });

  const latestRun = {
    createdAt: nowIso(),
    buyer: scenarioBoundBuyer,
    scenarioId: scenario.scenarioId,
    branchMode,
    conformanceProfile: need.conformanceProfile,
    productionIntentProfile: need.productionIntentProfile,
    realizationProfile: need.realizationProfile,
    needLifecycle: 'settled',
    need,
    depositingSurface,
    needingSurface,
    depositingToNeedingSurface,
    needMeasurement,
    benchmarkTarget,
    benchmarkParserContract,
    canonicalBenchmarkOutputs,
    parserValidation,
    inferenceProofs,
    promptSurfaces,
    promptContracts,
    promptCompletenessProof,
    parsedCompletionEnvelopes,
    parsedCompletionEnvelopeArtifact,
    canonicalRunEvidence: scenario.canonicalRunEvidence,
    evaluatedCandidates: evaluatedCandidates.map((candidate) => ({
      assetId: candidate.assetId,
      title: candidate.asset.title,
      artifactKind: candidate.asset.artifactKind,
      useTier: candidate.useTier,
      recall: candidate.recall,
      ranking: {
        ...candidate.ranking,
        wholeAssetNeedScore: Number(candidate.ranking.wholeAssetNeedScore.toFixed(4)),
        finalRankingScore: Number(candidate.ranking.finalRankingScore.toFixed(4)),
        needMatch: {
          ...candidate.ranking.needMatch,
          finalScore: Number(candidate.ranking.needMatch.finalScore.toFixed(4))
        },
        benchmarkImpact: {
          ...candidate.ranking.benchmarkImpact,
          finalScore: Number(candidate.ranking.benchmarkImpact.finalScore.toFixed(4))
        },
        actionability: {
          ...candidate.ranking.actionability,
          finalScore: Number(candidate.ranking.actionability.finalScore.toFixed(4))
        }
      },
      verification: candidate.verification,
      rights: useTierRights(candidate.useTier, branchMode),
      measurementProvenance: candidate.measurementProvenance,
      staticExecutionReceipts: candidate.staticExecutionReceipts
    })),
    assetPack,
    matchReport,
    verificationReport,
    evalManifest,
    assetPackLock,
    selectedSourceMaterialManifest,
    identityBindings,
    authorizationDecisions,
    sensitiveDataFlowRecords,
    policyRelease,
    githubBoundarySurface,
    artifactUploadManifest,
    profileCompositionSurface,
    promptSurfaces,
    promptContracts,
    promptCompletenessProof,
    parsedCompletionEnvelopes,
    parsedCompletionEnvelopeArtifact,
    externalBoundaryManifest,
    deliverablesManifest,
    unitCatalog,
    codeAnalysisFactRegistry,
    staticHeuristicsRegistry,
    measurementReceipts,
    verificationReceipts: verificationReceiptsArtifact,
    staticMeasurementReport,
    staticMeasurementProof,
    materializationProof,
    materializationExclusions,
    materializationVisibilityProof: finalizedMaterializationVisibilityProof,
    pipelineTelemetry,
    repoToSettlementSurface,
    identityAuthSpineSurface,
    sourceToSharesArtifact: settlement.sourceToSharesArtifact,
    settlementParticipationArtifact: settlement.settlementParticipationArtifact,
    accountingPrecisionReport: settlement.accountingPrecisionReport,
    scenarioFixtureManifest,
    testCoverageReport,
    settlementPreview: settlement.settlementPreview,
    journalDiff: settlement.journalDiff,
    systemProofBundle,
    proofWitnessManifest,
    proofContract,
    branchArtifacts,
    projectionPolicy: finalizedProjectionPolicy,
    boundedPublicProof,
    redactionProof: finalizedRedactionProof,
    disclosureProof: finalizedDisclosureProof
  };

  const nextState = {
    ...state,
    ledger: {
      accounts: settlement.nextLedgerAccounts,
      journalEvents: [...state.ledger.journalEvents, latestRun.journalDiff]
    },
    latestRun,
    runHistory: [...state.runHistory, {
      createdAt: latestRun.createdAt,
      scenarioId: scenario.scenarioId,
      needId: need.needId,
      needLifecycle: latestRun.needLifecycle,
      branchName,
      branchMode,
      selectedAssets: assetPack.selectedAssets,
      bundleId: settlement.bundleId,
      redactionStatus: boundedPublicProof.redactionStatus
    }]
  };

  return { nextState, latestRun };
}

export function publicState(state, principal = DEFAULT_PROJECTION_PRINCIPAL) {
  return buildDemoPublicState(state, principal, {
    ensureProjectionPrincipal,
    buildRepoSupplySurface,
    buildBoundaryRealitySurface,
    buildPolicyState,
    buildPolicyRelease,
    buildNeedDescriptor,
    buildNeedingSurface,
    nowIso
  });
}
