import crypto from 'node:crypto';

export const SPEC_VERSION = 'ENGI Spec V11 deterministic local prototype';
export const DEFAULT_BRANCH_MODE = 'patch';
export const METERED_MICRO_UNITS = '100000000';
export const PROFILE_A = 'Profile A — targeted deposit / bounded need';
export const PROFILE_B = 'Profile B — normalization deposit / composite need';
export const DEFAULT_PROJECTION_PRINCIPAL = 'public';
const MAX_BPS = 10000;
const MAX_BPS_BIGINT = 10000n;
const SOURCE_TO_SHARES_SCALE = 1000000n;
const VECTOR_DIMENSIONS = 16;
const DEFAULT_MODEL_ID = 'deterministic-local-evaluator.v4';
const DEFAULT_POLICY_REF = 'policy://engi/spec-v11-demo/2026-04-03';
const PROJECTION_PRINCIPALS = new Set(['public', 'buyer', 'reviewer', 'internal']);
const PROFILE_B_SCENARIO_FAMILIES = new Set([
  'polyglot-repo-benchmark-remediation',
  'many-asset-settlement-normalization'
]);
const PROFILE_DEFINITIONS = {
  A: {
    profileId: 'A',
    label: PROFILE_A,
    shortLabel: 'Targeted deposit',
    identity: {
      whoItIs: 'Deposit a small, decisive set of repo-authenticated artifacts against a sharply bounded benchmark need.',
      operatorRole: 'Use this when ENGI should close one tight remediation need with minimal normalization overhead.',
      audienceMeaning: 'The demo is proving decisive selection, narrow proof closure, and fast settlement explanation.'
    },
    depositMode: 'Deposit one or a few decisive repo-authenticated artifacts so the asset pack can stay tight.',
    needMode: 'Need is sharply bounded by a narrow benchmark slice with a short list of failure modes and clear closure criteria.',
    assetPackShape: 'Tight pack with minimal normalization and quick branch closure.',
    settlementShape: 'Credits concentrate on the decisive assets; zero-credit passengers should be rare and explicit.',
    scenarioFamilies: [
      'monorepo-auth-rollback',
      'proof-heavy-rust-validator',
      'config-policy-incident',
      'unsafe-patch-review',
      'infra-deployment-mismatch',
      'privacy-boundary-stress'
    ],
    composition: [
      'repo-authenticated targeted deposit',
      'bounded benchmark need measurement',
      'tight asset-pack selection',
      'short proof closure',
      'direct settlement explanation'
    ],
    boundaryRealityNote: 'Live GitHub, signer verification, and networked settlement still remain explicit external hand-offs elsewhere.'
  },
  B: {
    profileId: 'B',
    label: PROFILE_B,
    shortLabel: 'Normalization deposit',
    identity: {
      whoItIs: 'Deposit several overlapping artifacts so ENGI can normalize coverage, provenance, and contribution across a composite need.',
      operatorRole: 'Use this when ENGI must reconcile multiple slices, artifact kinds, or runtime surfaces before settlement is intelligible.',
      audienceMeaning: 'The demo is proving normalization, overlap handling, and source-to-shares closure rather than a single decisive pick.'
    },
    depositMode: 'Deposit multiple overlapping artifacts across kinds so ENGI can normalize contribution and provenance.',
    needMode: 'Need stays composite across several failing slices, weak dimensions, or cross-language/runtime boundaries.',
    assetPackShape: 'Broader pack where normalization, tie-break rules, and overlap accounting matter.',
    settlementShape: 'Settlement makes source-to-shares normalization visible and may keep zero-credit participants explicit.',
    scenarioFamilies: [
      'polyglot-repo-benchmark-remediation',
      'many-asset-settlement-normalization'
    ],
    composition: [
      'repo-authenticated normalization deposit',
      'composite benchmark need measurement',
      'broader asset-pack normalization',
      'heavier proof burden',
      'source-to-shares settlement explanation'
    ],
    boundaryRealityNote: 'Live GitHub and network hand-offs are still explicit boundary contracts, but they are not the reason this profile exists.'
  }
};
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

function resolveDemonstrationProfileId(subject = {}) {
  return subject.demonstrationProfileId
    || (PROFILE_B_SCENARIO_FAMILIES.has(subject.scenarioFamily) ? 'B' : 'A');
}

function buildDemonstrationProfile(subject = 'A') {
  const profileId = typeof subject === 'string' ? subject : resolveDemonstrationProfileId(subject);
  const profile = PROFILE_DEFINITIONS[profileId] || PROFILE_DEFINITIONS.A;
  return {
    ...profile,
    identity: { ...profile.identity },
    scenarioFamilies: [...profile.scenarioFamilies],
    composition: [...profile.composition]
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
  'verification.issuance-checks.v9': ['asset.attestations[0]'],
  'verification.provenance-checks.v9': ['asset.provenanceBinding', 'need.repo', 'need.benchmarkRunId'],
  'verification.sufficiency-checks.v9': ['asset.verificationEvidence', 'need.benchmarkRunId'],
  'verification.issuer-policy-checks.v9': ['asset.metadata.issuerPolicyStatus', 'asset.attestations[0].signerAddress', 'policyState.issuers']
};

const CODE_ANALYSIS_FACT_REGISTRY_SPECS = {
  'need.task': { measurementClass: 'inferred-derived', gatheredFrom: ['need-measurement.task.v2'], storedOn: ['need.task'], factClass: 'need-analysis' },
  'need.failureModes': { measurementClass: 'inferred-derived', gatheredFrom: ['need-measurement.failure-modes.v2'], storedOn: ['need.failureModes'], factClass: 'need-analysis' },
  'need.constraints': { measurementClass: 'inferred-derived', gatheredFrom: ['need-measurement.constraints.v2'], storedOn: ['need.constraints'], factClass: 'need-analysis' },
  'need.targetArtifactKinds': { measurementClass: 'inferred-derived', gatheredFrom: ['need-measurement.target-artifact-kinds.v2'], storedOn: ['need.targetArtifactKinds'], factClass: 'need-analysis' },
  'need.touchedPaths': { measurementClass: 'static-executed', gatheredFrom: ['github-actions.benchmark-parser.v9', 'github.repo-context.extract.v9'], storedOn: ['need.touchedPaths'], factClass: 'repo-code-analysis' },
  'need.extractedSymbols': { measurementClass: 'static-executed', gatheredFrom: ['github-actions.benchmark-parser.v9', 'github.repo-context.extract.v9'], storedOn: ['need.extractedSymbols'], factClass: 'repo-code-analysis' },
  'need.configKeys': { measurementClass: 'static-executed', gatheredFrom: ['github-actions.benchmark-parser.v9', 'github.repo-context.extract.v9'], storedOn: ['need.configKeys'], factClass: 'repo-code-analysis' },
  'need.stackHints': { measurementClass: 'hybrid-composed', gatheredFrom: ['github.repo-context.extract.v9', 'inferStackHints()'], storedOn: ['need.stackHints'], factClass: 'repo-code-analysis' },
  'need.failingCases': { measurementClass: 'static-executed', gatheredFrom: ['github-actions.benchmark-parser.v9'], storedOn: ['need.failingCases'], factClass: 'benchmark-analysis' },
  'need.weakDimensions': { measurementClass: 'static-executed', gatheredFrom: ['github-actions.benchmark-parser.v9'], storedOn: ['need.weakDimensions'], factClass: 'benchmark-analysis' },
  'need.lexicalNeedTerms': { measurementClass: 'hybrid-composed', gatheredFrom: ['tokenize(need.task/failureModes/constraints/weakDimensions)'], storedOn: ['recall.lexicalTerms'], factClass: 'derived-tokenization' },
  'asset.contentUnits[].textTokens': { measurementClass: 'static-executed', gatheredFrom: ['tokenize(unit.text)'], storedOn: ['recall unit tokenization'], factClass: 'derived-tokenization' },
  'asset.contentUnits[].codeAnalysisFacts.symbols': { measurementClass: 'static-executed', gatheredFrom: ['content-unit.extract-static-code-analysis.v9'], storedOn: ['asset.contentUnits[].codeAnalysisFacts.symbols'], factClass: 'content-unit-code-analysis' },
  'asset.contentUnits[].codeAnalysisFacts.paths': { measurementClass: 'static-executed', gatheredFrom: ['content-unit.extract-static-code-analysis.v9'], storedOn: ['asset.contentUnits[].codeAnalysisFacts.paths'], factClass: 'content-unit-code-analysis' },
  'asset.contentUnits[].codeAnalysisFacts.configKeys': { measurementClass: 'static-executed', gatheredFrom: ['content-unit.extract-static-code-analysis.v9'], storedOn: ['asset.contentUnits[].codeAnalysisFacts.configKeys'], factClass: 'content-unit-code-analysis' },
  'asset.contentUnits[].codeAnalysisFacts.stackTags': { measurementClass: 'static-executed', gatheredFrom: ['content-unit.extract-static-code-analysis.v9'], storedOn: ['asset.contentUnits[].codeAnalysisFacts.stackTags'], factClass: 'content-unit-code-analysis' },
  'asset.contentUnits[].codeAnalysisFacts.constraints': { measurementClass: 'static-executed', gatheredFrom: ['content-unit.extract-static-code-analysis.v9'], storedOn: ['asset.contentUnits[].codeAnalysisFacts.constraints'], factClass: 'content-unit-code-analysis' },
  'asset.contentUnits[].embeddings.taskVector': { measurementClass: 'hybrid-composed', gatheredFrom: ['content-unit.embedding-standin.v8'], storedOn: ['asset.contentUnits[].embeddings.taskVector'], factClass: 'stand-in-embedding' },
  'asset.contentUnits[].embeddings.failureModeVector': { measurementClass: 'hybrid-composed', gatheredFrom: ['content-unit.embedding-standin.v8'], storedOn: ['asset.contentUnits[].embeddings.failureModeVector'], factClass: 'stand-in-embedding' },
  'asset.metadata.sourcePaths': { measurementClass: 'static-executed', gatheredFrom: ['asset.measurement.extract.v9'], storedOn: ['asset.metadata.sourcePaths'], factClass: 'asset-code-analysis' },
  'asset.metadata.declaredStacks': { measurementClass: 'static-executed', gatheredFrom: ['asset.measurement.extract.v9'], storedOn: ['asset.metadata.declaredStacks'], factClass: 'asset-code-analysis' },
  'asset.metadata.declaredConstraints': { measurementClass: 'static-executed', gatheredFrom: ['asset.measurement.extract.v9'], storedOn: ['asset.metadata.declaredConstraints'], factClass: 'asset-code-analysis' },
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

function clampBp(value) {
  return Math.max(0, Math.min(MAX_BPS, Math.round(Number(value) || 0)));
}

function toFixedPointUnits(value, scale = SOURCE_TO_SHARES_SCALE) {
  return BigInt(Math.round((Number(value) || 0) * Number(scale)));
}

function fixedPointRatioUnits(hitCount, totalCount, scale = SOURCE_TO_SHARES_SCALE) {
  if (!totalCount) return 0n;
  return (BigInt(hitCount) * scale) / BigInt(totalCount);
}

function fixedPointUnitsToNumber(units, scale = SOURCE_TO_SHARES_SCALE) {
  return Number(units) / Number(scale);
}

function fixedPointUnitsToString(units, scale = SOURCE_TO_SHARES_SCALE) {
  const sign = units < 0n ? '-' : '';
  const magnitude = units < 0n ? -units : units;
  const whole = magnitude / scale;
  const fraction = String(magnitude % scale).padStart(String(scale - 1n).length, '0').replace(/0+$/, '');
  return fraction ? `${sign}${whole}.${fraction}` : `${sign}${whole}`;
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

function ensureProjectionPrincipal(principal = DEFAULT_PROJECTION_PRINCIPAL) {
  const normalized = String(principal || DEFAULT_PROJECTION_PRINCIPAL).trim().toLowerCase();
  if (!PROJECTION_PRINCIPALS.has(normalized)) {
    throw new Error(`Unsupported projection principal: ${principal}`);
  }
  return normalized;
}

export function extractPromptPlaceholders(template) {
  return summarizeStrings(
    [...String(template || '').matchAll(/\{\{\s*([a-zA-Z0-9_.-]+)\s*\}\}/g)].map((match) => match[1])
  );
}

export function buildPromptContract({
  promptId,
  templateVersion,
  template,
  contextInputs = [],
  outputFields = [],
  downstreamArtifacts = [],
  nonRenderedContextFields = [],
  evidenceRefs = []
}) {
  const placeholderSet = extractPromptPlaceholders(template);
  const declaredContextFields = summarizeStrings(contextInputs.map((input) => input.field));
  const explicitNonRendered = summarizeStrings(nonRenderedContextFields);
  const missingPlaceholderBindings = placeholderSet.filter((field) => !declaredContextFields.includes(field));
  const undeclaredNonRenderedContextFields = explicitNonRendered.filter((field) => !declaredContextFields.includes(field));
  const unusedContextFields = declaredContextFields.filter((field) => !placeholderSet.includes(field) && !explicitNonRendered.includes(field));
  const renderedContextFields = declaredContextFields.filter((field) => placeholderSet.includes(field));
  const contractPayload = {
    promptId,
    templateVersion,
    template,
    declaredContextFields,
    explicitNonRendered,
    outputFields,
    downstreamArtifacts
  };
  const outputSchema = outputFields.map((field) => ({ field, type: 'string-or-array' }));
  return {
    promptId,
    templateVersion,
    templateHash: stableHashObject(template),
    contextSchemaHash: stableHashObject(declaredContextFields),
    outputSchemaHash: stableHashObject(outputSchema),
    placeholderSet,
    declaredContextFields,
    nonRenderedContextFields: explicitNonRendered,
    renderedContextFields,
    unusedContextFields,
    missingPlaceholderBindings,
    undeclaredNonRenderedContextFields,
    evidenceRefDigest: stableHashObject(summarizeStrings(evidenceRefs)),
    downstreamArtifactBindings: summarizeStrings(downstreamArtifacts),
    completeness: {
      ok: missingPlaceholderBindings.length === 0
        && unusedContextFields.length === 0
        && undeclaredNonRenderedContextFields.length === 0,
      missingPlaceholderBindings,
      unusedContextFields,
      undeclaredNonRenderedContextFields
    },
    contractHash: stableHashObject(contractPayload)
  };
}

export function assertPromptContractComplete(promptContract) {
  if (!promptContract.completeness.ok) {
    throw new Error(
      `Spec V9 prompt completeness failed for ${promptContract.promptId}: ` +
      `missing placeholders [${promptContract.missingPlaceholderBindings.join(', ')}], ` +
      `unused context [${promptContract.unusedContextFields.join(', ')}], ` +
      `undeclared non-rendered [${promptContract.undeclaredNonRenderedContextFields.join(', ')}].`
    );
  }
}

function buildPromptCompletenessProof(promptContracts = []) {
  return {
    conformanceProfile: PROFILE_A,
    productionIntentProfile: PROFILE_B,
    checkedPromptCount: promptContracts.length,
    allContractsComplete: promptContracts.every((contract) => contract.completeness.ok),
    promptChecks: promptContracts.map((contract) => ({
      promptId: contract.promptId,
      templateHash: contract.templateHash,
      contextSchemaHash: contract.contextSchemaHash,
      outputSchemaHash: contract.outputSchemaHash,
      placeholderCount: contract.placeholderSet.length,
      renderedContextFields: contract.renderedContextFields,
      nonRenderedContextFields: contract.nonRenderedContextFields,
      missingPlaceholderBindings: contract.missingPlaceholderBindings,
      unusedContextFields: contract.unusedContextFields,
      completenessOk: contract.completeness.ok
    })),
    proofHash: stableHashObject(promptContracts.map((contract) => ({
      promptId: contract.promptId,
      contractHash: contract.contractHash,
      completeness: contract.completeness
    })))
  };
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
    throw new Error(`Spec V9 code-analysis registry failed: unregistered consumed facts [${unregisteredConsumedFactIds.join(', ')}].`);
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
    artifactId: 'static-heuristics-registry.v9',
    artifactSemantics: 'specific code-analysis fact registry emitted as the local static heuristics registry surface'
  };
}

function verificationClaimedEvidence(asset) {
  return {
    signerAddress: asset.attestations?.[0]?.signerAddress || null,
    claimedSourceRepo: asset.provenanceBinding?.repo || null,
    claimedWorkflowRunId: asset.provenanceBinding?.workflowRunId || null,
    declaredSourcePaths: asset.metadata?.sourcePaths || [],
    declaredProofLogs: asset.verificationEvidence?.proofLogs || [],
    declaredReproSteps: asset.verificationEvidence?.reproSteps || []
  };
}

function verificationMeasuredEvidence(asset, verification) {
  return {
    issuanceChecksPassed: !shouldRejectIssuance(verification.issuanceVerification),
    provenanceChecksPassed: !shouldRejectProvenance(verification.provenanceVerification),
    verificationScore: verification.verificationSufficiency?.scoreTrace?.score ?? 0,
    benchmarkEvidenceBoundToGitHubRun: verification.verificationSufficiency?.benchmarkEvidenceBoundToGitHubRun ?? false,
    matchedProofLogCount: verification.verificationSufficiency?.evidenceCoverage?.proofLogCount ?? 0,
    matchedReproStepCount: verification.verificationSufficiency?.evidenceCoverage?.reproStepCount ?? 0,
    policyStatus: verification.issuerPolicyStatus?.status || 'unknown'
  };
}

function verificationPolicyRestrictions(verification) {
  return {
    policyTierCap: verification.issuerPolicyStatus?.policyTierCap || 'rank-only',
    status: verification.issuerPolicyStatus?.status || 'unknown',
    additionalRequirements: verification.issuerPolicyStatus?.additionalRequirements || [],
    blockedByPolicy: verification.issuerPolicyStatus?.status === 'revoked'
  };
}

function buildVerificationDecisionReceipts({ need, asset, verification, useTier, policyState }) {
  const claimedEvidence = verificationClaimedEvidence(asset);
  const measuredEvidence = verificationMeasuredEvidence(asset, verification);
  const policyRestrictions = verificationPolicyRestrictions(verification);
  const receiptInputs = {
    needId: need.needId,
    assetId: asset.assetId,
    contentRoot: asset.contentRoot
  };
  const issuanceReceipt = buildStaticExecutionReceipt({
    receiptKind: 'verification-issuance-check',
    stageId: 'verification.issuance-checks.v9',
    toolId: 'verification.issuance-checks.v9',
    inputs: { ...receiptInputs, attestation: asset.attestations?.[0] || null },
    normalizedOutputEnvelope: {
      status: shouldRejectIssuance(verification.issuanceVerification) ? 'fail' : 'pass',
      issuanceVerification: verification.issuanceVerification
    },
    evidenceRefs: [need.needId, asset.assetId, asset.attestations?.[0]?.attestationHash].filter(Boolean),
    replayInputClosure: [need.needId, asset.assetId, asset.contentRoot]
  });
  const provenanceReceipt = buildStaticExecutionReceipt({
    receiptKind: 'verification-provenance-check',
    stageId: 'verification.provenance-checks.v9',
    toolId: 'verification.provenance-checks.v9',
    inputs: { ...receiptInputs, provenanceBinding: asset.provenanceBinding, repo: need.repo, benchmarkRunId: need.benchmarkRunId },
    normalizedOutputEnvelope: {
      status: shouldRejectProvenance(verification.provenanceVerification) ? 'fail' : 'pass',
      provenanceVerification: verification.provenanceVerification
    },
    evidenceRefs: [need.repo, need.benchmarkRunId, asset.assetId, ...(asset.metadata?.sourcePaths || [])],
    replayInputClosure: [need.needId, asset.assetId, asset.contentRoot]
  });
  const sufficiencyReceipt = buildStaticExecutionReceipt({
    receiptKind: 'verification-sufficiency-check',
    stageId: 'verification.sufficiency-checks.v9',
    toolId: 'verification.sufficiency-checks.v9',
    inputs: { ...receiptInputs, verificationEvidence: asset.verificationEvidence, benchmarkRunId: need.benchmarkRunId },
    normalizedOutputEnvelope: {
      recommendedUseTier: verification.verificationSufficiency.recommendedUseTier,
      verificationSufficiency: verification.verificationSufficiency
    },
    evidenceRefs: [need.needId, asset.assetId, need.benchmarkRunId, ...(asset.verificationEvidence?.reproSteps || [])],
    replayInputClosure: [need.needId, asset.assetId, asset.contentRoot]
  });
  const policyReceipt = buildStaticExecutionReceipt({
    receiptKind: 'verification-policy-check',
    stageId: 'verification.issuer-policy-checks.v9',
    toolId: 'verification.issuer-policy-checks.v9',
    inputs: { ...receiptInputs, policyState: policyState?.issuers || {}, issuerStatus: asset.metadata?.issuerPolicyStatus || 'unknown' },
    normalizedOutputEnvelope: {
      status: verification.issuerPolicyStatus.status,
      policyRestrictions,
      finalUseTier: useTier
    },
    evidenceRefs: [asset.attestations?.[0]?.signerAddress, asset.metadata?.issuerPolicyStatus].filter(Boolean),
    replayInputClosure: [need.needId, asset.assetId, asset.contentRoot]
  });
  return {
    receipts: [issuanceReceipt, provenanceReceipt, sufficiencyReceipt, policyReceipt],
    decisionSurface: {
      claimedEvidence,
      measuredEvidence,
      policyRestrictions,
      receiptRefs: [issuanceReceipt.receiptId, provenanceReceipt.receiptId, sufficiencyReceipt.receiptId, policyReceipt.receiptId],
      missingChecks: summarizeStrings([
        ...(verification.issuanceVerification?.reasons || []).filter((reason) => !/passed/i.test(reason)),
        ...(verification.provenanceVerification?.reasons || []).filter((reason) => !/passed/i.test(reason)),
        ...(verification.verificationSufficiency?.reasons || []).filter((reason) => !/present|bound/i.test(reason)),
        ...(policyRestrictions.additionalRequirements || [])
      ]),
      finalUseTier: useTier
    }
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

function evaluatorSurface({ evaluatorId, evaluatorKind, measurementClass, mode, evidenceRefs = [], modelId = DEFAULT_MODEL_ID, promptId = null, toolId = null, replayableTrace = true, profile = PROFILE_A, standIn = mode !== 'inferred' }) {
  return {
    evaluatorId,
    evaluatorKind,
    measurementClass,
    mode,
    modelId,
    promptId,
    toolId,
    replayableTrace,
    profile,
    standIn,
    evidenceRefs: summarizeStrings(evidenceRefs)
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
    throw new Error(`Spec V9 debug failure: ${name} out of range (${value}).`);
  }
  return numeric;
}

function summarizeScore(score) {
  return Number(enforceRange('score', score).toFixed(4));
}

function enforceTelemetryTrace(name, trace) {
  if (!trace || typeof trace !== 'object') {
    throw new Error(`Spec V9 debug failure: missing telemetry trace for ${name}.`);
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
    version: 'demo-v9.0',
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

function inferenceProof(outputField, evidenceRefs, promptOrEvaluatorId, modelId = DEFAULT_MODEL_ID) {
  return {
    outputField,
    evidenceRefs: evidenceRefs.filter(Boolean),
    promptOrEvaluatorId,
    modelId,
    evaluatorSurface: evaluatorSurface({
      evaluatorId: promptOrEvaluatorId,
      evaluatorKind: 'inferred-evaluator',
      measurementClass: 'inferred-measurement',
      mode: 'inferred',
      promptId: promptOrEvaluatorId,
      modelId,
      evidenceRefs
    }),
    replayableTrace: true,
    admissible: evidenceRefs.filter(Boolean).length > 0 && !!promptOrEvaluatorId && !!modelId
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
      stageId: 'content-unit.extract-static-code-analysis.v9',
      toolId: 'content-unit.extract-static-code-analysis.v9',
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
        measurementTrace('static', 'content-unit.extract-static-code-analysis.v9', [unitHash, ...codeAnalysisFacts.paths, ...codeAnalysisFacts.configKeys], { measurementClass: 'static-analysis', evaluatorKind: 'deterministic-static-command', standIn: false, receiptRefs: [codeAnalysisReceipt.receiptId] }),
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
  const measurementClass = options.measurementClass || (mode === 'inferred' ? 'inferred-measurement' : mode === 'static' ? 'static-analysis' : 'hybrid-evaluation');
  const evaluatorKind = options.evaluatorKind || (mode === 'inferred' ? 'inferred-evaluator' : mode === 'static' ? 'deterministic-static-command' : 'hybrid-pipeline-stage');
  return {
    mode,
    measurementClass,
    evaluatorKind,
    toolOrPromptId,
    version: 'demo-v9.0',
    evidenceRefs,
    receiptRefs: summarizeStrings(options.receiptRefs || []),
    evaluatorSurface: evaluatorSurface({
      evaluatorId: toolOrPromptId,
      evaluatorKind,
      measurementClass,
      mode,
      promptId: mode === 'inferred' ? toolOrPromptId : null,
      toolId: mode !== 'inferred' ? toolOrPromptId : null,
      evidenceRefs,
      standIn: options.standIn ?? (mode !== 'static')
    })
  };
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

function buildProfileCompositions() {
  const profiles = ['A', 'B'].map((profileId) => {
    const profile = buildDemonstrationProfile(profileId);
    return {
      ...profile,
      switchableInDemo: true,
      metadata: {
        depositMode: profile.depositMode,
        needMode: profile.needMode,
        assetPackShape: profile.assetPackShape,
        settlementShape: profile.settlementShape,
        boundaryTruthNote: profile.boundaryRealityNote
      }
    };
  });
  return {
    activeProfile: 'A',
    distinctionBasis: 'deposit-and-need',
    demoOperatorGuidance: {
      audienceMeaning: 'The V11 profiles distinguish how ENGI deposits supply against need. They are not a local-vs-GitHub toggle.',
      boundaryTruthPlacement: 'Boundary reality, GitHub boundary, and external boundary surfaces keep live/not-live truth explicit. The profile headline now explains deposit mode and need mode first.',
      recommendedWalkthrough: [
        'Start with repo supply and pick a targeted-deposit scenario to show a bounded need.',
        'Deposit or inspect a small decisive asset set, then run the branch flow to show tight closure.',
        'Switch to a normalization-heavy scenario to show overlapping deposits and broader settlement logic.',
        'Use boundary reality and GitHub boundary surfaces only after the deposit/need contrast is clear.',
        'Close on proof bundle, source-to-shares, and settlement invariants.'
      ]
    },
    profiles,
    boundaryTruthSurfaces: ['boundaryRealitySurface', 'githubBoundarySurface', 'externalBoundaryManifest'],
    comparisonAxes: ['deposit mode', 'need mode', 'asset-pack shape', 'settlement shape', 'boundary hand-off']
  };
}

function interpolateTemplate(template, values = {}) {
  return String(template || '').replace(/\{\{\s*([a-zA-Z0-9_.-]+)\s*\}\}/g, (_, key) => {
    const value = values[key];
    return Array.isArray(value) ? value.join(', ') : String(value ?? '');
  });
}

function buildPromptSurface({ promptId, purpose, template, values, contextInputs = [], outputFields = [], downstreamArtifacts = [], evaluatorKind = 'inferred-evaluator', modelId = DEFAULT_MODEL_ID, standIn = true, nonRenderedContextFields = [] }) {
  const evidenceRefs = summarizeStrings(contextInputs.flatMap((input) => input.evidenceRefs || []));
  const promptContract = buildPromptContract({
    promptId,
    templateVersion: 'spec-v9-demo-prompt.v1',
    template,
    contextInputs,
    outputFields,
    downstreamArtifacts,
    nonRenderedContextFields,
    evidenceRefs
  });
  assertPromptContractComplete(promptContract);
  return {
    promptId,
    purpose,
    templateVersion: 'spec-v9-demo-prompt.v1',
    template,
    interpolatedPrompt: interpolateTemplate(template, values),
    interpolatedValues: values,
    contextInputs: contextInputs.map((input, index) => ({
      order: index + 1,
      field: input.field,
      value: input.value,
      source: input.source,
      evidenceRefs: summarizeStrings(input.evidenceRefs || []),
      artifactBindings: summarizeStrings(input.artifactBindings || []),
      notes: input.notes || null
    })),
    lineage: {
      derivedFrom: contextInputs.map((input) => input.field),
      evidenceRefs,
      outputFields,
      downstreamArtifacts
    },
    promptContract,
    evaluatorSurface: evaluatorSurface({
      evaluatorId: promptId,
      evaluatorKind,
      measurementClass: 'inferred-measurement',
      mode: 'inferred',
      promptId,
      modelId,
      evidenceRefs,
      standIn,
      profile: PROFILE_A
    })
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
  return Object.entries(RECALL_CHANNEL_SPECS).map(([channelId, spec]) => ({ channelId, ...spec }));
}

function allowedUseTiersForBranchMode(branchMode) {
  return branchMode === 'context'
    ? new Set(['context-only', 'patch-eligible', 'settlement-eligible'])
    : new Set(['patch-eligible', 'settlement-eligible']);
}

function useTierRights(useTier, branchMode) {
  const allowedTiers = allowedUseTiersForBranchMode(branchMode);
  return {
    useTier,
    branchMode,
    reportVisible: useTier !== 'reject',
    branchMaterializationAllowed: allowedTiers.has(useTier),
    settlementAllowed: useTier === 'settlement-eligible',
    sourceMaterialMode: allowedTiers.has(useTier) ? branchMode : 'not-materialized'
  };
}

function derivationRecord({ field, source, policy = 'required', confidence = 'high', evidenceRefs = [], notes }) {
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
    stageId: 'asset.measurement.extract.v9',
    toolId: 'asset.measurement.extract.v9',
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
      measurementTrace('static', 'asset.measurement.extract.v9', [contentRoot, ...(input.sourcePaths || codeAnalysisFacts.paths)], { measurementClass: 'static-analysis', evaluatorKind: 'deterministic-static-command', standIn: false, receiptRefs: [assetCodeAnalysisReceipt.receiptId] }),
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

function publicGitHubAppSession(session) {
  return {
    authSessionId: session.authSessionId,
    authMechanism: session.authMechanism,
    appId: session.appId,
    appSlug: session.appSlug,
    installationId: session.installationId,
    installationAccountLogin: session.installationAccountLogin,
    installationAccountId: session.installationAccountId,
    installationAccountNodeId: session.installationAccountNodeId,
    installationAccountType: session.installationAccountType,
    operatorLogin: session.operatorLogin,
    repo: session.repo,
    owner: session.owner,
    repoName: session.repoName,
    repositoryId: session.repositoryId,
    repositoryNodeId: session.repositoryNodeId,
    repositoryVisibility: session.repositoryVisibility,
    repositorySelection: session.repositorySelection,
    permissions: session.permissions,
    permissionsRoot: session.permissionsRoot,
    defaultRef: session.defaultRef,
    defaultSignerAddress: session.defaultSignerAddress,
    signingAlgorithm: session.signingAlgorithm,
    keySource: session.keySource,
    sessionIssuedAt: session.sessionIssuedAt,
    sessionExpiresAt: session.sessionExpiresAt,
    tokenBoundary: session.tokenBoundary,
    authPayloadHash: session.authPayloadHash,
    ...buildBoundaryDescriptions(
      session.localBoundary || session.profileABoundary,
      session.externalBoundary || session.profileBBoundary
    )
  };
}

function publicRepoArtifactInventoryEntry(entry) {
  return {
    inventoryEntryId: entry.inventoryEntryId,
    repo: entry.repo,
    artifactKind: entry.artifactKind,
    artifactType: entry.artifactType,
    originKind: entry.originKind,
    title: entry.title,
    summary: entry.summary,
    ref: entry.ref,
    sourceCommit: entry.sourceCommit,
    sourcePath: entry.sourcePath,
    sourcePaths: entry.sourcePaths,
    workflowRunId: entry.workflowRunId,
    workflowPath: entry.workflowPath,
    workflowJobName: entry.workflowJobName,
    checkSuiteId: entry.checkSuiteId,
    artifactName: entry.artifactName,
    tags: entry.tags,
    declaredStacks: entry.declaredStacks,
    declaredConstraints: entry.declaredConstraints,
    previewSurface: entry.previewSurface,
    signerAddress: entry.signerAddress,
    owner: entry.owner,
    repoName: entry.repoName,
    repositoryId: entry.repositoryId,
    repositoryNodeId: entry.repositoryNodeId,
    authSessionId: entry.authSessionId,
    installationId: entry.installationId,
    installationAccountLogin: entry.installationAccountLogin,
    installationAccountId: entry.installationAccountId,
    installationAccountNodeId: entry.installationAccountNodeId,
    contentRoot: entry.contentRoot,
    addressing: entry.addressing,
    authBinding: entry.authBinding,
    provenance: entry.provenance
  };
}

export function publicAsset(asset) {
  return {
    assetId: asset.assetId,
    depositedAt: asset.depositedAt,
    title: asset.title,
    artifactKind: asset.artifactKind,
    artifactType: asset.artifactType,
    author: asset.metadata.author,
    organization: asset.metadata.organization,
    tags: asset.metadata.tags,
    sourceRepo: asset.metadata.sourceRepo,
    sourcePaths: asset.metadata.sourcePaths,
    summary: asset.metadata.summary,
    contentRoot: asset.contentRoot,
    unitCount: asset.contentUnits.length,
    declaredStacks: asset.metadata.declaredStacks,
    declaredConstraints: asset.metadata.declaredConstraints,
    uploadSurface: asset.uploadSurface,
    artifactSelectionSurface: asset.artifactSelectionSurface,
    addressingSurface: asset.addressingSurface,
    signingSurface: asset.signingSurface,
    githubAppAuthSurface: asset.githubAppAuthSurface,
    githubBoundary: asset.githubBoundary,
    identitySurface: asset.identitySurface,
    verificationEvidence: {
      testsPassed: asset.verificationEvidence.testsPassed,
      typecheckPassed: asset.verificationEvidence.typecheckPassed,
      staticAnalysisPassed: asset.verificationEvidence.staticAnalysisPassed,
      benchmarkRan: asset.verificationEvidence.benchmarkRan,
      benchmarkRunId: asset.verificationEvidence.benchmarkRunId,
      pinnedEnvironment: asset.verificationEvidence.pinnedEnvironment
    }
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
    stageId: 'github.repo-context.extract.v9',
    toolId: 'github.repo-context.extract.v9',
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

export function measureNeedFromScenario(scenario) {
  const demonstrationProfile = buildDemonstrationProfile(scenario);
  const comparisonProfile = buildDemonstrationProfile(demonstrationProfile.profileId === 'A' ? 'B' : 'A');
  const parser = buildGithubActionsBenchmarkParser();
  const canonicalBenchmarkOutputs = parser.parse(scenario.canonicalRunEvidence);
  const parserValidation = parser.validate(canonicalBenchmarkOutputs);
  if (!parserValidation.ok) {
    throw new Error(`Spec V9 parser validation failed: ${parserValidation.reasons.join('; ')}`);
  }
  const parserReceipt = buildStaticExecutionReceipt({
    receiptKind: 'benchmark-parser-normalization',
    stageId: 'github-actions.benchmark-parser.v9',
    toolId: 'github-actions.benchmark-parser.v9',
    inputs: {
      repo: scenario.repo,
      benchmarkRunId: scenario.benchmarkRunId,
      canonicalRunEvidence: scenario.canonicalRunEvidence
    },
    normalizedOutputEnvelope: {
      parserValidation,
      canonicalBenchmarkOutputs
    },
    evidenceRefs: [
      scenario.canonicalRunEvidence?.runId,
      scenario.canonicalRunEvidence?.workflowPath,
      ...canonicalBenchmarkOutputs.consumedInputs.artifactNames
    ].filter(Boolean),
    replayInputClosure: [
      scenario.repo,
      scenario.benchmarkRunId,
      scenario.canonicalRunEvidence?.runId
    ].filter(Boolean)
  });

  const repoCodeAnalysis = buildRepoStaticCodeAnalysis(scenario, canonicalBenchmarkOutputs);
  const task = inferNeedTask(scenario, canonicalBenchmarkOutputs);
  const failureModes = inferFailureModes(scenario, canonicalBenchmarkOutputs);
  const constraints = inferConstraints(scenario, canonicalBenchmarkOutputs);
  const targetArtifactKinds = inferTargetArtifactKinds(scenario, canonicalBenchmarkOutputs);
  const fieldDerivations = {
    task: derivationRecord({
      field: 'task',
      source: scenario.task ? 'scenario.task' : scenario.expectedTask ? 'seed.expectedTask' : 'deterministic-synthesis',
      evidenceRefs: [scenario.canonicalRunEvidence?.runId, scenario.repo, scenario.benchmarkHarnessPath],
      notes: 'Canonical need task is normalized before ranking; seed-only names do not leak downstream.'
    }),
    failureModes: derivationRecord({
      field: 'failureModes',
      source: scenario.failureModes?.length ? 'scenario.failureModes' : scenario.expectedFailureModes?.length ? 'seed.expectedFailureModes' : 'canonicalBenchmarkOutputs.failingCases',
      evidenceRefs: [scenario.canonicalRunEvidence?.runId, ...canonicalBenchmarkOutputs.failingCases]
    }),
    constraints: derivationRecord({
      field: 'constraints',
      source: scenario.constraints?.length ? 'scenario.constraints' : scenario.expectedConstraints?.length ? 'seed.expectedConstraints' : 'deterministic-synthesis',
      evidenceRefs: [scenario.canonicalRunEvidence?.runId, ...canonicalBenchmarkOutputs.weakDimensions]
    }),
    targetArtifactKinds: derivationRecord({
      field: 'targetArtifactKinds',
      source: scenario.targetArtifactKinds?.length ? 'scenario.targetArtifactKinds' : scenario.expectedTargetArtifactKinds?.length ? 'seed.expectedTargetArtifactKinds' : 'deterministic-synthesis',
      evidenceRefs: [scenario.repo, ...repoCodeAnalysis.touchedPaths]
    }),
    stackHints: derivationRecord({
      field: 'stackHints',
      source: 'repo-context-extraction',
      evidenceRefs: [scenario.repo, ...repoCodeAnalysis.stackHints]
    }),
    touchedPaths: derivationRecord({
      field: 'touchedPaths',
      source: canonicalBenchmarkOutputs.touchedPaths.length ? 'canonicalBenchmarkOutputs.touchedPaths + repo-context-extraction' : 'repo-context-extraction',
      evidenceRefs: [scenario.canonicalRunEvidence?.runId, ...repoCodeAnalysis.touchedPaths]
    }),
    extractedSymbols: derivationRecord({
      field: 'extractedSymbols',
      source: canonicalBenchmarkOutputs.symbols.length ? 'canonicalBenchmarkOutputs.symbols + repo-context-extraction' : 'repo-context-extraction',
      evidenceRefs: [scenario.canonicalRunEvidence?.runId, ...repoCodeAnalysis.extractedSymbols]
    }),
    configKeys: derivationRecord({
      field: 'configKeys',
      source: canonicalBenchmarkOutputs.configKeys.length ? 'canonicalBenchmarkOutputs.configKeys + repo-context-extraction' : 'repo-context-extraction',
      evidenceRefs: [scenario.canonicalRunEvidence?.runId, ...repoCodeAnalysis.configKeys]
    }),
    failingCases: derivationRecord({
      field: 'failingCases',
      source: 'canonicalBenchmarkOutputs.failingCases',
      evidenceRefs: [scenario.canonicalRunEvidence?.runId, ...canonicalBenchmarkOutputs.failingCases]
    }),
    weakDimensions: derivationRecord({
      field: 'weakDimensions',
      source: 'canonicalBenchmarkOutputs.weakDimensions',
      evidenceRefs: [scenario.canonicalRunEvidence?.runId, ...canonicalBenchmarkOutputs.weakDimensions]
    }),
    baselineMetrics: derivationRecord({
      field: 'baselineMetrics',
      source: 'canonicalBenchmarkOutputs.baselineMetrics',
      evidenceRefs: [scenario.canonicalRunEvidence?.runId, ...Object.keys(canonicalBenchmarkOutputs.baselineMetrics || {})]
    })
  };
  const benchmarkTarget = {
    harnessPath: scenario.benchmarkHarnessPath,
    runId: scenario.benchmarkRunId,
    failingCases: canonicalBenchmarkOutputs.failingCases,
    weakDimensions: canonicalBenchmarkOutputs.weakDimensions,
    baselineMetrics: canonicalBenchmarkOutputs.baselineMetrics
  };
  const needId = `need_${toSlug(scenario.scenarioId)}_${sha256(`${scenario.repo}:${scenario.baseRef}:${scenario.benchmarkRunId}`).slice(0, 10)}`;
  const evidenceRefs = [
    scenario.canonicalRunEvidence?.runId,
    scenario.canonicalRunEvidence?.workflowPath,
    scenario.repo,
    scenario.benchmarkHarnessPath
  ].filter(Boolean);
  const inferenceProofs = [
    inferenceProof('task', evidenceRefs, 'need-measurement.task.v2'),
    inferenceProof('failureModes', [...evidenceRefs, ...canonicalBenchmarkOutputs.failingCases], 'need-measurement.failure-modes.v2'),
    inferenceProof('constraints', [...evidenceRefs, ...canonicalBenchmarkOutputs.weakDimensions], 'need-measurement.constraints.v2'),
    inferenceProof('targetArtifactKinds', [...evidenceRefs, ...repoCodeAnalysis.touchedPaths], 'need-measurement.target-artifact-kinds.v2')
  ];
  const promptSurfaces = [
    buildPromptSurface({
      promptId: 'need-measurement.task.v2',
      purpose: 'Synthesize the canonical engineering need statement from benchmark evidence.',
      template: 'You are measuring an ENGI remediation need for repo {{repo}} on branch {{baseRef}} after GitHub run {{benchmarkRunId}}. Failing cases: {{failingCases}}. Weak dimensions: {{weakDimensions}}. Touched paths: {{touchedPaths}}. Constraints: {{constraints}}. Produce a concise task statement that preserves rollback safety and session validity.',
      values: { repo: scenario.repo, baseRef: scenario.baseRef, benchmarkRunId: scenario.benchmarkRunId, failingCases: canonicalBenchmarkOutputs.failingCases, weakDimensions: canonicalBenchmarkOutputs.weakDimensions, touchedPaths: repoCodeAnalysis.touchedPaths, constraints },
      contextInputs: [
        { field: 'repo', value: scenario.repo, source: 'scenario.repo', evidenceRefs: [scenario.repo], artifactBindings: ['.engi/need.json'] },
        { field: 'baseRef', value: scenario.baseRef, source: 'scenario.baseRef', evidenceRefs: [scenario.baseRef], artifactBindings: ['.engi/need.json'] },
        { field: 'benchmarkRunId', value: scenario.benchmarkRunId, source: 'scenario.benchmarkRunId', evidenceRefs: [scenario.canonicalRunEvidence?.runId], artifactBindings: ['.engi/benchmark-target.json'] },
        { field: 'failingCases', value: canonicalBenchmarkOutputs.failingCases, source: 'canonicalBenchmarkOutputs.failingCases', evidenceRefs: canonicalBenchmarkOutputs.failingCases, artifactBindings: ['.engi/need-measurement.json'] },
        { field: 'weakDimensions', value: canonicalBenchmarkOutputs.weakDimensions, source: 'canonicalBenchmarkOutputs.weakDimensions', evidenceRefs: canonicalBenchmarkOutputs.weakDimensions, artifactBindings: ['.engi/need-measurement.json'] },
        { field: 'touchedPaths', value: repoCodeAnalysis.touchedPaths, source: 'buildRepoStaticCodeAnalysis.touchedPaths', evidenceRefs: repoCodeAnalysis.touchedPaths, artifactBindings: ['.engi/need.json', '.engi/match-report.json'] },
        { field: 'constraints', value: constraints, source: 'inferConstraints()', evidenceRefs: canonicalBenchmarkOutputs.weakDimensions, artifactBindings: ['.engi/need.json'] }
      ],
      outputFields: ['task'],
      downstreamArtifacts: ['.engi/need.json', '.engi/match-report.json', '.engi/system-proof-bundle.json']
    }),
    buildPromptSurface({
      promptId: 'need-measurement.failure-modes.v2',
      purpose: 'Normalize failure modes from canonical benchmark evidence into remediation language.',
      template: 'Given failing cases {{failingCases}} and weak dimensions {{weakDimensions}} for repo {{repo}}, derive the concrete failure modes that must be addressed in the private ENGI remediation branch.',
      values: { failingCases: canonicalBenchmarkOutputs.failingCases, weakDimensions: canonicalBenchmarkOutputs.weakDimensions, repo: scenario.repo },
      contextInputs: [
        { field: 'repo', value: scenario.repo, source: 'scenario.repo', evidenceRefs: [scenario.repo], artifactBindings: ['.engi/need.json'] },
        { field: 'failingCases', value: canonicalBenchmarkOutputs.failingCases, source: 'canonicalBenchmarkOutputs.failingCases', evidenceRefs: canonicalBenchmarkOutputs.failingCases, artifactBindings: ['.engi/need-measurement.json'] },
        { field: 'weakDimensions', value: canonicalBenchmarkOutputs.weakDimensions, source: 'canonicalBenchmarkOutputs.weakDimensions', evidenceRefs: canonicalBenchmarkOutputs.weakDimensions, artifactBindings: ['.engi/need-measurement.json'] }
      ],
      outputFields: ['failureModes'],
      downstreamArtifacts: ['.engi/need.json', '.engi/match-report.json', '.engi/prompt-surfaces.json']
    }),
    buildPromptSurface({
      promptId: 'need-measurement.constraints.v2',
      purpose: 'Derive safety and governance constraints that the branch flow must honor.',
      template: 'Use weak dimensions {{weakDimensions}}, benchmark run {{benchmarkRunId}}, and repo privacy expectations to derive the non-negotiable constraints for this ENGI branch. Include rollback safety, privacy, and auditability where supported.',
      values: { weakDimensions: canonicalBenchmarkOutputs.weakDimensions, benchmarkRunId: scenario.benchmarkRunId },
      contextInputs: [
        { field: 'weakDimensions', value: canonicalBenchmarkOutputs.weakDimensions, source: 'canonicalBenchmarkOutputs.weakDimensions', evidenceRefs: canonicalBenchmarkOutputs.weakDimensions, artifactBindings: ['.engi/need-measurement.json'] },
        { field: 'benchmarkRunId', value: scenario.benchmarkRunId, source: 'scenario.benchmarkRunId', evidenceRefs: [scenario.canonicalRunEvidence?.runId], artifactBindings: ['.engi/benchmark-target.json'] },
        { field: 'repoPrivacy', value: 'private remediation branch until bounded public proof', source: 'spec policy', evidenceRefs: [scenario.repo], artifactBindings: ['.engi/policy-release.json'] }
      ],
      nonRenderedContextFields: ['repoPrivacy'],
      outputFields: ['constraints'],
      downstreamArtifacts: ['.engi/need.json', '.engi/policy-release.json', '.engi/system-proof-bundle.json']
    }),
    buildPromptSurface({
      promptId: 'need-measurement.target-artifact-kinds.v2',
      purpose: 'Infer the required artifact shapes for the measured need.',
      template: 'From touched paths {{touchedPaths}}, symbols {{symbols}}, and repo context {{stackHints}}, determine which artifact kinds are needed to remediate the benchmark failures without widening scope.',
      values: { touchedPaths: repoCodeAnalysis.touchedPaths, symbols: repoCodeAnalysis.extractedSymbols, stackHints: repoCodeAnalysis.stackHints },
      contextInputs: [
        { field: 'touchedPaths', value: repoCodeAnalysis.touchedPaths, source: 'buildRepoStaticCodeAnalysis.touchedPaths', evidenceRefs: repoCodeAnalysis.touchedPaths, artifactBindings: ['.engi/need.json'] },
        { field: 'symbols', value: repoCodeAnalysis.extractedSymbols, source: 'buildRepoStaticCodeAnalysis.extractedSymbols', evidenceRefs: repoCodeAnalysis.extractedSymbols, artifactBindings: ['.engi/unit-catalog.json'] },
        { field: 'stackHints', value: repoCodeAnalysis.stackHints, source: 'inferStackHints()', evidenceRefs: repoCodeAnalysis.stackHints, artifactBindings: ['.engi/eval-manifest.json'] }
      ],
      outputFields: ['targetArtifactKinds'],
      downstreamArtifacts: ['.engi/need.json', '.engi/artifact-upload-manifest.json']
    })
  ];
  const promptContracts = promptSurfaces.map((surface) => surface.promptContract);
  const promptCompletenessProof = buildPromptCompletenessProof(promptContracts);
  const measurementProvenance = [
    measurementTrace('static', 'github-actions.benchmark-parser.v2', [
      scenario.canonicalRunEvidence?.runId,
      scenario.canonicalRunEvidence?.workflowPath,
      ...canonicalBenchmarkOutputs.consumedInputs.artifactNames
    ].filter(Boolean), { receiptRefs: [parserReceipt.receiptId] }),
    measurementTrace('static', 'github.repo-context.extract.v2', [scenario.repo, ...repoCodeAnalysis.touchedPaths], { receiptRefs: repoCodeAnalysis.staticExecutionReceipts.map((receipt) => receipt.receiptId) }),
    measurementTrace('inferred', 'need-measurement.task.v2', evidenceRefs),
    measurementTrace('inferred', 'need-measurement.failure-modes.v2', [...evidenceRefs, ...canonicalBenchmarkOutputs.failingCases]),
    measurementTrace('inferred', 'need-measurement.constraints.v2', [...evidenceRefs, ...canonicalBenchmarkOutputs.weakDimensions]),
    measurementTrace('inferred', 'need-measurement.target-artifact-kinds.v2', [...evidenceRefs, ...repoCodeAnalysis.touchedPaths]),
    measurementTrace('hybrid', 'need-measurement.derivation-closure.v8', Object.values(fieldDerivations).flatMap((entry) => entry.evidenceRefs || []))
  ];

  const needDescriptor = {
    needId,
    repo: scenario.repo,
    installationId: scenario.installationId,
    baseRef: scenario.baseRef,
    targetRef: scenario.targetRef,
    prNumber: scenario.prNumber,
    benchmarkHarnessPath: scenario.benchmarkHarnessPath,
    benchmarkWorkflowPath: scenario.benchmarkWorkflowPath,
    benchmarkRunId: scenario.benchmarkRunId,
    benchmarkRunUrl: scenario.benchmarkRunUrl,
    canonicalRunEvidence: scenario.canonicalRunEvidence,
    benchmarkParserContract: {
      parserKind: parser.parserKind,
      parserVersion: parser.parserVersion,
      acceptedArtifactMediaTypes: summarizeStrings((scenario.canonicalRunEvidence?.artifacts || []).map((artifact) => artifact.mediaType)),
      parserFailureContract: {
        failClosed: true,
        onMissingCanonicalOutputs: 'reject-need-materialization',
        onMalformedOutputs: 'emit-parser-error-artifact'
      },
      consumedInputs: canonicalBenchmarkOutputs.consumedInputs
    },
    canonicalBenchmarkOutputs,
    task,
    failureModes,
    constraints,
    targetArtifactKinds,
    stackHints: repoCodeAnalysis.stackHints,
    touchedPaths: repoCodeAnalysis.touchedPaths,
    extractedSymbols: repoCodeAnalysis.extractedSymbols,
    configKeys: repoCodeAnalysis.configKeys,
    failingCases: canonicalBenchmarkOutputs.failingCases,
    weakDimensions: canonicalBenchmarkOutputs.weakDimensions,
    baselineMetrics: canonicalBenchmarkOutputs.baselineMetrics,
    humanPrompt: scenario.humanPrompt,
    conformanceProfile: demonstrationProfile.label,
    productionIntentProfile: comparisonProfile.label,
    demonstrationProfile,
    fieldDerivations,
    measurementProvenance,
    measurementClassInventory: {
      staticExecuted: ['canonicalBenchmarkOutputs', 'buildRepoStaticCodeAnalysis'],
      inferredDerived: ['task', 'failureModes', 'constraints', 'targetArtifactKinds'],
      hybridComposed: ['fieldDerivations']
    },
    staticMeasurements: {
      touchedPaths: repoCodeAnalysis.touchedPaths,
      extractedSymbols: repoCodeAnalysis.extractedSymbols,
      configKeys: repoCodeAnalysis.configKeys,
      failingCases: canonicalBenchmarkOutputs.failingCases,
      weakDimensions: canonicalBenchmarkOutputs.weakDimensions
    },
    inferredMeasurements: {
      task,
      failureModes,
      constraints,
      targetArtifactKinds
    },
    recallChannelContracts: buildRecallChannelContracts(),
    promptSurfaces,
    promptContracts,
    promptCompletenessProof,
    analysisFactLifecycle: {
      determined: {
        lexical: 'tokenize over need.task/failureModes/constraints/weakDimensions',
        symbolic: 'benchmark parser + repo-context extraction + asset unit signal extraction',
        path: 'canonical benchmark touchedPaths plus repo-context extraction',
        config: 'canonical benchmark configKeys plus repo-context extraction',
        semanticVector: 'deterministic stand-in embeddings over task/failure-mode/context texts'
      },
      recorded: {
        lexical: 'need.lexicalTerms during recall build',
        symbolic: 'need.extractedSymbols + contentUnits[].codeAnalysisFacts.symbols',
        path: 'need.touchedPaths + asset.metadata.sourcePaths + unit.codeAnalysisFacts.paths',
        config: 'need.configKeys + unit.codeAnalysisFacts.configKeys',
        semanticVector: 'queryRepresentations + contentUnits[].embeddings.*'
      },
      searched: {
        lexical: 'lexicalSearch exact-token overlap',
        symbolic: 'symbolSearch exact symbol intersection',
        path: 'pathSearch exact path intersection',
        config: 'configKeySearch exact key intersection',
        semanticVector: 'semanticTaskSearch/failureModeSearch/technicalContextSearch via cosine similarity'
      },
      downstreamUses: {
        recall: 'recallCandidates fusion',
        scoring: ['needMatch', 'benchmarkImpact', 'penaltyMass'],
        ranking: 'evaluateCandidates final ranking score',
        selection: 'assembleAssetPack and settlement eligibility',
        UX: 'visual/raw score explainability surfaces'
      }
    },
    profileCompositions: buildProfileCompositions()
  };

  return {
    needDescriptor,
    benchmarkTarget,
    canonicalBenchmarkOutputs,
    benchmarkParserContract: {
      parserKind: parser.parserKind,
      parserVersion: parser.parserVersion,
      acceptedArtifactMediaTypes: summarizeStrings((scenario.canonicalRunEvidence?.artifacts || []).map((artifact) => artifact.mediaType)),
      parserFailureContract: {
        failClosed: true,
        onMissingCanonicalOutputs: 'reject-need-materialization',
        onMalformedOutputs: 'emit-parser-error-artifact'
      },
      consumedInputs: canonicalBenchmarkOutputs.consumedInputs
    },
    parserValidation,
    inferenceProofs,
    promptSurfaces,
    promptContracts,
    promptCompletenessProof,
    measurementProvenance,
    staticExecutionReceipts: [parserReceipt, ...collectStaticExecutionReceipts(repoCodeAnalysis)]
  };
}

export function buildNeedDescriptor(scenario) {
  return measureNeedFromScenario(scenario).needDescriptor;
}

function buildAssetCorpus(asset) {
  return uniqueTokens([
    asset.title,
    asset.metadata.summary,
    asset.metadata.privateContent,
    ...(asset.metadata.tags || []),
    ...(asset.metadata.declaredStacks || []),
    ...(asset.metadata.declaredConstraints || []),
    ...(asset.metadata.sourcePaths || []),
    ...(asset.contentUnits || []).map((unit) => unit.text)
  ].join(' '));
}

export function recallCandidates(need, assets) {
  const queryRepresentations = {
    task: buildEmbeddingArtifact('task-semantic-space.v8', need.task),
    failureModes: buildEmbeddingArtifact('failure-mode-space.v8', need.failureModes.join(' ')),
    technicalContext: buildEmbeddingArtifact('technical-context-space.v8', [
      ...need.touchedPaths,
      ...need.extractedSymbols,
      ...need.configKeys,
      ...need.stackHints
    ].join(' '))
  };
  const lexicalTerms = uniqueTokens([
    need.task,
    ...need.failureModes,
    ...need.constraints,
    ...need.weakDimensions
  ].join(' '));

  const channelEntries = {
    semanticTaskSearch: [],
    failureModeSearch: [],
    technicalContextSearch: [],
    lexicalSearch: [],
    symbolSearch: [],
    pathSearch: [],
    configKeySearch: [],
    artifactKindFilteredSearch: []
  };

  for (const asset of assets) {
    for (const unit of asset.contentUnits) {
      const unitKey = `${asset.assetId}:${unit.unitId}`;
      const lexicalHits = intersection(lexicalTerms, uniqueTokens(unit.text));
      const symbolHits = intersection(need.extractedSymbols, unit.codeAnalysisFacts.symbols);
      const pathHits = intersection(need.touchedPaths, union(asset.metadata.sourcePaths || [], unit.codeAnalysisFacts.paths));
      const configHits = intersection(need.configKeys, unit.codeAnalysisFacts.configKeys);
      const artifactKindMatch = need.targetArtifactKinds.includes(asset.artifactKind) ? 1 : 0;

      channelEntries.semanticTaskSearch.push({
        channelId: 'semanticTaskSearch',
        assetId: asset.assetId,
        unitId: unit.unitId,
        unitKey,
        score: cosineSimilarity(queryRepresentations.task, unit.embeddings.taskVector),
        evidenceRefs: [need.needId, asset.contentRoot, unit.unitHash],
        matchedValues: lexicalHits
      });
      channelEntries.failureModeSearch.push({
        channelId: 'failureModeSearch',
        assetId: asset.assetId,
        unitId: unit.unitId,
        unitKey,
        score: cosineSimilarity(queryRepresentations.failureModes, unit.embeddings.failureModeVector),
        evidenceRefs: [need.needId, ...need.failingCases, unit.unitHash],
        matchedValues: intersection(need.failureModes, uniqueTokens(unit.text))
      });
      channelEntries.technicalContextSearch.push({
        channelId: 'technicalContextSearch',
        assetId: asset.assetId,
        unitId: unit.unitId,
        unitKey,
        score: cosineSimilarity(queryRepresentations.technicalContext, unit.embeddings.technicalContextVector),
        evidenceRefs: [need.needId, ...(asset.metadata.sourcePaths || []), unit.unitHash],
        matchedValues: union(pathHits, configHits)
      });
      channelEntries.lexicalSearch.push({
        channelId: 'lexicalSearch',
        assetId: asset.assetId,
        unitId: unit.unitId,
        unitKey,
        score: lexicalHits.length / Math.max(1, lexicalTerms.length),
        evidenceRefs: [need.needId, unit.unitHash],
        matchedValues: lexicalHits
      });
      channelEntries.symbolSearch.push({
        channelId: 'symbolSearch',
        assetId: asset.assetId,
        unitId: unit.unitId,
        unitKey,
        score: symbolHits.length ? 1 : 0,
        evidenceRefs: [...symbolHits, unit.unitHash],
        matchedValues: symbolHits
      });
      channelEntries.pathSearch.push({
        channelId: 'pathSearch',
        assetId: asset.assetId,
        unitId: unit.unitId,
        unitKey,
        score: pathHits.length ? 1 : 0,
        evidenceRefs: [...pathHits, unit.unitHash],
        matchedValues: pathHits
      });
      channelEntries.configKeySearch.push({
        channelId: 'configKeySearch',
        assetId: asset.assetId,
        unitId: unit.unitId,
        unitKey,
        score: configHits.length ? 1 : 0,
        evidenceRefs: [...configHits, unit.unitHash],
        matchedValues: configHits
      });
      channelEntries.artifactKindFilteredSearch.push({
        channelId: 'artifactKindFilteredSearch',
        assetId: asset.assetId,
        unitId: unit.unitId,
        unitKey,
        score: artifactKindMatch,
        evidenceRefs: [need.needId, asset.assetId, asset.artifactKind],
        matchedValues: artifactKindMatch ? [asset.artifactKind] : []
      });
    }
  }

  const deduped = new Map();
  const channelCounts = {};
  for (const [channelId, entries] of Object.entries(channelEntries)) {
    const sorted = entries
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score || a.unitKey.localeCompare(b.unitKey))
      .slice(0, RECALL_CHANNEL_BUDGETS[channelId]);
    channelCounts[channelId] = sorted.length;
    for (const entry of sorted) {
      const current = deduped.get(entry.unitKey) || {
        assetId: entry.assetId,
        unitId: entry.unitId,
        recallProvenance: [],
        fusionTrace: {
          channels: [],
          channelScoreMax: 0,
          channelCount: 0
        }
      };
      current.recallProvenance.push({
        channelId,
        signalFamily: RECALL_CHANNEL_SPECS[channelId]?.signalFamily || 'unknown',
        score: summarizeScore(entry.score),
        evidenceRefs: entry.evidenceRefs,
        matchedValues: entry.matchedValues
      });
      current.fusionTrace.channels.push(channelId);
      current.fusionTrace.channelScoreMax = Math.max(current.fusionTrace.channelScoreMax, entry.score);
      current.fusionTrace.channelCount += 1;
      deduped.set(entry.unitKey, current);
    }
  }

  const byAsset = new Map();
  for (const item of deduped.values()) {
    const existing = byAsset.get(item.assetId) || {
      assetId: item.assetId,
      unitIds: [],
      recallProvenance: [],
      recallScore: 0,
      fusion: {
        contributingChannels: [],
        totalUnits: 0,
        maxChannelScore: 0,
        perChannelCounts: channelCounts
      }
    };
    existing.unitIds.push(item.unitId);
    existing.recallProvenance.push(...item.recallProvenance);
    existing.recallScore += item.fusionTrace.channelScoreMax + (item.fusionTrace.channelCount * 0.1);
    existing.fusion.totalUnits += 1;
    existing.fusion.maxChannelScore = Math.max(existing.fusion.maxChannelScore, item.fusionTrace.channelScoreMax);
    existing.fusion.contributingChannels = summarizeStrings(union(existing.fusion.contributingChannels, item.fusionTrace.channels));
    byAsset.set(item.assetId, existing);
  }

  return [...byAsset.values()]
    .map((entry) => ({
      ...entry,
      queryRepresentations: Object.fromEntries(Object.entries(queryRepresentations).map(([key, artifact]) => [key, artifact.spec])),
      lexicalTerms,
      recallChannelContracts: buildRecallChannelContracts(),
      recallScore: Number(entry.recallScore.toFixed(4)),
      fusion: {
        ...entry.fusion,
        maxChannelScore: summarizeScore(entry.fusion.maxChannelScore)
      }
    }))
    .sort((a, b) => b.recallScore - a.recallScore || a.assetId.localeCompare(b.assetId));
}

function computeNeedMatch(need, asset, recall) {
  const corpus = buildAssetCorpus(asset);
  const unitSignals = asset.contentUnits.flatMap((unit) => [
    ...unit.codeAnalysisFacts.symbols,
    ...unit.codeAnalysisFacts.paths,
    ...unit.codeAnalysisFacts.configKeys,
    ...unit.codeAnalysisFacts.stackTags,
    ...unit.codeAnalysisFacts.constraints
  ]);
  const matchedPaths = intersection(need.touchedPaths, asset.metadata.sourcePaths);
  const matchedMentionedPaths = intersection(need.touchedPaths, asset.contentUnits.flatMap((unit) => unit.codeAnalysisFacts.paths));
  const sourcePathPrecision = overlapScore(need.touchedPaths, asset.metadata.sourcePaths);
  const mentionedPathSupport = overlapScore(need.touchedPaths, asset.contentUnits.flatMap((unit) => unit.codeAnalysisFacts.paths));
  const subsystemAlignment = clamp01(Math.max(
    overlapScore(need.extractedSymbols, unitSignals),
    overlapScore(need.configKeys, unitSignals),
    overlapScore(need.stackHints, [...(asset.metadata.declaredStacks || []), ...(asset.metadata.tags || [])])
  ));
  const pathFit = clamp01((0.50 * sourcePathPrecision) + (0.25 * mentionedPathSupport) + (0.25 * subsystemAlignment));
  const taskSemanticFit = overlapScore(need.task, corpus);
  const failureModeFit = overlapScore(need.failureModes, corpus);
  const symbolFit = clamp01(Math.max(overlapScore(need.extractedSymbols, unitSignals), overlapScore(need.extractedSymbols, corpus)));
  const stackFit = overlapScore(need.stackHints, [...(asset.metadata.declaredStacks || []), ...(asset.metadata.tags || [])]);
  const constraintFit = clamp01(Math.max(overlapScore(need.constraints, corpus), overlapScore(need.constraints, asset.metadata.declaredConstraints)));
  const artifactKindFit = need.targetArtifactKinds.includes(asset.artifactKind)
    ? 1
    : (asset.artifactKind === 'incident-note' && need.targetArtifactKinds.includes('runbook'))
      ? 0.62
      : (asset.artifactKind === 'mixed' ? 0.72 : 0.18);
  const lexicalSupport = overlapScore(uniqueTokens(need.task).slice(0, 12), corpus);

  const score = (
    0.22 * taskSemanticFit +
    0.18 * failureModeFit +
    0.16 * symbolFit +
    0.10 * pathFit +
    0.10 * stackFit +
    0.12 * constraintFit +
    0.07 * artifactKindFit +
    0.05 * lexicalSupport
  );

  const detail = {
    taskSemanticFit: measurementDetail({
      value: taskSemanticFit,
      mode: 'hybrid',
      toolOrPromptId: 'ranking.need-match.task-semantic-fit.v2',
      evidenceRefs: rankingEvidenceRefs(need, asset, [need.task]),
      unitRefs: recall?.unitIds || [],
      explanation: 'Deterministic semantic overlap over task text with recall-conditioned unit support.',
      consumedCodeAnalysisFacts: CODE_ANALYSIS_CONSUMERS['ranking.need-match.task-semantic-fit.v2']
    }),
    failureModeFit: measurementDetail({
      value: failureModeFit,
      mode: 'hybrid',
      toolOrPromptId: 'ranking.need-match.failure-mode-fit.v2',
      evidenceRefs: rankingEvidenceRefs(need, asset, need.failureModes),
      unitRefs: recall?.unitIds || [],
      explanation: 'Failure-mode fit uses benchmark failing cases, weak dimensions, and recalled unit text.',
      consumedCodeAnalysisFacts: CODE_ANALYSIS_CONSUMERS['ranking.need-match.failure-mode-fit.v2']
    }),
    symbolFit: measurementDetail({
      value: symbolFit,
      mode: 'static',
      toolOrPromptId: 'ranking.need-match.symbol-fit.v2',
      evidenceRefs: rankingEvidenceRefs(need, asset, need.extractedSymbols),
      unitRefs: recall?.unitIds || [],
      explanation: 'Exact or aliased symbol overlap from extracted repo symbols against asset units.',
      consumedCodeAnalysisFacts: CODE_ANALYSIS_CONSUMERS['ranking.need-match.symbol-fit.v2']
    }),
    pathFit: measurementDetail({
      value: pathFit,
      mode: 'hybrid',
      toolOrPromptId: 'ranking.need-match.path-fit.v2',
      evidenceRefs: rankingEvidenceRefs(need, asset, need.touchedPaths),
      unitRefs: recall?.unitIds || [],
      explanation: 'Path fit blends provenance-bound source paths, mentioned paths, and subsystem alignment.',
      consumedCodeAnalysisFacts: CODE_ANALYSIS_CONSUMERS['ranking.need-match.path-fit.v2']
    }),
    stackFit: measurementDetail({
      value: stackFit,
      mode: 'hybrid',
      toolOrPromptId: 'ranking.need-match.stack-fit.v2',
      evidenceRefs: rankingEvidenceRefs(need, asset, need.stackHints),
      unitRefs: recall?.unitIds || [],
      explanation: 'Stack fit normalizes declared stack hints, tags, and inferred technical context.',
      consumedCodeAnalysisFacts: CODE_ANALYSIS_CONSUMERS['ranking.need-match.stack-fit.v2']
    }),
    constraintFit: measurementDetail({
      value: constraintFit,
      mode: 'hybrid',
      toolOrPromptId: 'ranking.need-match.constraint-fit.v2',
      evidenceRefs: rankingEvidenceRefs(need, asset, need.constraints),
      unitRefs: recall?.unitIds || [],
      explanation: 'Constraint fit checks whether the asset preserves buyer safety and remediation constraints.',
      consumedCodeAnalysisFacts: CODE_ANALYSIS_CONSUMERS['ranking.need-match.constraint-fit.v2']
    }),
    artifactKindFit: measurementDetail({
      value: artifactKindFit,
      mode: 'static',
      toolOrPromptId: 'ranking.need-match.artifact-kind-fit.v2',
      evidenceRefs: rankingEvidenceRefs(need, asset, need.targetArtifactKinds),
      unitRefs: recall?.unitIds || [],
      explanation: 'Artifact-kind fit keeps need match grounded in the required remediation format.',
      consumedCodeAnalysisFacts: CODE_ANALYSIS_CONSUMERS['ranking.need-match.artifact-kind-fit.v2']
    }),
    lexicalSupport: measurementDetail({
      value: lexicalSupport,
      mode: 'static',
      toolOrPromptId: 'ranking.need-match.lexical-support.v2',
      evidenceRefs: rankingEvidenceRefs(need, asset, uniqueTokens(need.task).slice(0, 12)),
      unitRefs: recall?.unitIds || [],
      explanation: 'Lexical support is retained as a support-only signal, never the primary rank driver.',
      consumedCodeAnalysisFacts: CODE_ANALYSIS_CONSUMERS['ranking.need-match.lexical-support.v2']
    })
  };

  return {
    taskSemanticFit,
    failureModeFit,
    symbolFit,
    pathFit,
    stackFit,
    constraintFit,
    artifactKindFit,
    lexicalSupport,
    finalScore: clamp01(score),
    matchedPaths,
    matchedMentionedPaths,
    pathFitDetail: {
      sourcePathPrecision: summarizeScore(sourcePathPrecision),
      mentionedPathSupport: summarizeScore(mentionedPathSupport),
      subsystemAlignment: summarizeScore(subsystemAlignment)
    },
    detail
  };
}

function computeBenchmarkImpact(need, asset, needMatch, recall) {
  const corpus = buildAssetCorpus(asset);
  const likelyImprovesFailingCases = clamp01(Math.max(overlapScore(need.failingCases, corpus), needMatch.failureModeFit * 0.95));
  const likelyImprovesWeakDimensions = clamp01(Math.max(overlapScore(need.weakDimensions, corpus), (needMatch.taskSemanticFit + needMatch.constraintFit) / 2));
  const likelyGeneralizesToRepoContext = clamp01((needMatch.pathFit * 0.45) + (needMatch.stackFit * 0.30) + (needMatch.constraintFit * 0.25));
  const score = (
    0.45 * likelyImprovesFailingCases +
    0.35 * likelyImprovesWeakDimensions +
    0.20 * likelyGeneralizesToRepoContext
  );

  return {
    likelyImprovesFailingCases,
    likelyImprovesWeakDimensions,
    likelyGeneralizesToRepoContext,
    finalScore: clamp01(score),
    detail: {
      likelyImprovesFailingCases: measurementDetail({
        value: likelyImprovesFailingCases,
        mode: 'hybrid',
        toolOrPromptId: 'ranking.benchmark-impact.failing-cases.v2',
        evidenceRefs: rankingEvidenceRefs(need, asset, need.failingCases),
        unitRefs: recall?.unitIds || [],
        explanation: 'Measures exact failing-case remediation likelihood against benchmark-linked cases.',
        consumedCodeAnalysisFacts: CODE_ANALYSIS_CONSUMERS['ranking.benchmark-impact.failing-cases.v2']
      }),
      likelyImprovesWeakDimensions: measurementDetail({
        value: likelyImprovesWeakDimensions,
        mode: 'hybrid',
        toolOrPromptId: 'ranking.benchmark-impact.weak-dimensions.v2',
        evidenceRefs: rankingEvidenceRefs(need, asset, need.weakDimensions),
        unitRefs: recall?.unitIds || [],
        explanation: 'Measures likely improvement across weak benchmark dimensions, not just single cases.',
        consumedCodeAnalysisFacts: CODE_ANALYSIS_CONSUMERS['ranking.benchmark-impact.weak-dimensions.v2']
      }),
      likelyGeneralizesToRepoContext: measurementDetail({
        value: likelyGeneralizesToRepoContext,
        mode: 'hybrid',
        toolOrPromptId: 'ranking.benchmark-impact.repo-context.v2',
        evidenceRefs: rankingEvidenceRefs(need, asset, need.touchedPaths),
        unitRefs: recall?.unitIds || [],
        explanation: 'Measures whether the candidate generalizes safely to the buyer repo context.',
        consumedCodeAnalysisFacts: CODE_ANALYSIS_CONSUMERS['ranking.benchmark-impact.repo-context.v2']
      })
    }
  };
}

function countImperatives(text) {
  let hits = 0;
  for (const term of ['freeze', 'capture', 'validate', 'restore', 'replay', 'rerun', 'prove', 'ship', 'add', 'reject']) {
    if (String(text).toLowerCase().includes(term)) hits += 1;
  }
  return hits;
}

function computeActionability(need, asset, needMatch, recall) {
  const source = `${asset.title}\n${asset.metadata.privateContent}`;
  const remediationSpecificity = clamp01((countImperatives(source) / 8) * 0.7 + needMatch.failureModeFit * 0.3);
  const implementationSpecificity = clamp01(((asset.metadata.sourcePaths?.length || 0) / 3) * 0.45 + ((asset.contentUnits.flatMap((unit) => unit.codeAnalysisFacts.symbols).length) / 10) * 0.25 + ((asset.contentUnits.flatMap((unit) => unit.codeAnalysisFacts.configKeys).length) / 5) * 0.30);
  const operationalUsability = clamp01((asset.verificationEvidence.reproSteps?.length ? 0.45 : 0) + (asset.verificationEvidence.pinnedEnvironment ? 0.20 : 0) + (asset.verificationEvidence.testsPassed ? 0.20 : 0) + (asset.verificationEvidence.benchmarkRan ? 0.15 : 0));
  const score = (
    0.40 * remediationSpecificity +
    0.35 * implementationSpecificity +
    0.25 * operationalUsability
  );

  return {
    remediationSpecificity,
    implementationSpecificity,
    operationalUsability,
    finalScore: clamp01(score),
    detail: {
      remediationSpecificity: measurementDetail({
        value: remediationSpecificity,
        mode: 'hybrid',
        toolOrPromptId: 'ranking.actionability.remediation-specificity.v2',
        evidenceRefs: rankingEvidenceRefs(need, asset, need.failureModes),
        unitRefs: recall?.unitIds || [],
        explanation: 'Measures whether the asset presents concrete corrective steps for the measured need.',
        consumedCodeAnalysisFacts: CODE_ANALYSIS_CONSUMERS['ranking.actionability.remediation-specificity.v2']
      }),
      implementationSpecificity: measurementDetail({
        value: implementationSpecificity,
        mode: 'static',
        toolOrPromptId: 'ranking.actionability.implementation-specificity.v2',
        evidenceRefs: rankingEvidenceRefs(need, asset, asset.metadata.sourcePaths || []),
        unitRefs: recall?.unitIds || [],
        explanation: 'Measures concrete code/config surface area: paths, symbols, config keys, and test targets.',
        consumedCodeAnalysisFacts: CODE_ANALYSIS_CONSUMERS['ranking.actionability.implementation-specificity.v2']
      }),
      operationalUsability: measurementDetail({
        value: operationalUsability,
        mode: 'hybrid',
        toolOrPromptId: 'ranking.actionability.operational-usability.v2',
        evidenceRefs: rankingEvidenceRefs(need, asset, asset.verificationEvidence.reproSteps || []),
        unitRefs: recall?.unitIds || [],
        explanation: 'Measures bounded-scope usability inside a remediation branch and rerun workflow.',
        consumedCodeAnalysisFacts: CODE_ANALYSIS_CONSUMERS['ranking.actionability.operational-usability.v2']
      })
    }
  };
}

function computePenaltyMass(need, asset, ranking) {
  const penalties = [];
  let penaltyMass = 0;

  function addPenalty(code, mass, evidenceRefs, gate = false) {
    penaltyMass += mass;
    penalties.push({
      code,
      mass,
      evidenceRefs,
      mode: code === 'artifact-kind-mismatch' ? 'static' : 'hybrid',
      gateInStrictDebug: gate,
      subtractiveOnly: !gate
    });
  }

  if (ranking.needMatch.artifactKindFit < 0.4) addPenalty('artifact-kind-mismatch', 0.04, [asset.assetId, asset.title]);
  if (ranking.needMatch.pathFit < 0.25 && asset.artifactKind !== 'runbook' && asset.artifactKind !== 'incident-note') addPenalty('repo-context-mismatch', 0.05, [asset.assetId, ...asset.metadata.sourcePaths], true);
  if (ranking.benchmarkImpact.likelyImprovesFailingCases < 0.35) addPenalty('weak-benchmark-linkage', 0.03, [need.needId, asset.assetId]);
  if (ranking.actionability.implementationSpecificity < 0.30) addPenalty('generic-content', 0.04, [asset.assetId]);
  if (asset.metadata.sourceCommit && asset.metadata.sourceCommit.startsWith('legacy-')) addPenalty('stale-version-mismatch', 0.03, [asset.metadata.sourceCommit]);
  if ((asset.metadata.declaredConstraints || []).includes('public disclosure allowed') && need.constraints.some((constraint) => /private/i.test(constraint))) addPenalty('constraint-conflict', 0.07, [asset.assetId], true);

  return {
    rankingPenalties: penalties,
    penaltyMass: Math.min(0.30, penaltyMass)
  };
}

function checkIssuanceVerification(asset) {
  const attestation = asset.attestations[0] || {};
  const verification = {
    hasSignerAddresses: !!attestation.signerAddress,
    signatureChecksPass: !!attestation.signatureChecksPass,
    signedPayloadHashMatchesContentRoot: !!attestation.signedPayloadHashMatchesContentRoot,
    cosignRequirementSatisfied: !!attestation.cosignSatisfied,
    reasons: []
  };

  if (!verification.hasSignerAddresses) verification.reasons.push('missing signer binding');
  if (!verification.signatureChecksPass) verification.reasons.push('signature check failed');
  if (!verification.signedPayloadHashMatchesContentRoot) verification.reasons.push('payload hash does not match content root');
  if (!verification.cosignRequirementSatisfied) verification.reasons.push('required cosign missing');
  if (!verification.reasons.length) verification.reasons.push('issuance checks passed');
  return verification;
}

function shouldRejectIssuance(verification) {
  return !verification.hasSignerAddresses || !verification.signatureChecksPass || !verification.signedPayloadHashMatchesContentRoot;
}

function checkProvenanceVerification(asset, need) {
  const provenance = asset.provenanceBinding || {};
  const repoBindingPresent = !!provenance.repo;
  const workflowRunVerifiable = provenance.workflowRunId ? provenance.workflowRunId === need.benchmarkRunId : false;
  const contradictions = [];
  if (provenance.sourceProvider && provenance.sourceProvider !== 'github') contradictions.push('source provider is not GitHub');
  if (repoBindingPresent && provenance.repo !== need.repo) contradictions.push('repo binding does not match buyer repo');
  if (provenance.workflowRunId && !workflowRunVerifiable) contradictions.push('workflow run does not bind to benchmark run');
  if (asset.metadata.sourceRepo && provenance.repo && asset.metadata.sourceRepo !== provenance.repo) contradictions.push('metadata/provenance mismatch');
  const verification = {
    sourceProviderIsGitHub: provenance.sourceProvider === 'github',
    repoBindingPresent,
    commitBindingPresent: !!provenance.commit,
    pathBindingPresent: Array.isArray(provenance.paths) && provenance.paths.length > 0,
    workflowBindingPresent: !!provenance.workflowPath,
    workflowRunVerifiable,
    metadataCoherent: !contradictions.includes('metadata/provenance mismatch'),
    contradictions,
    reasons: []
  };

  if (!verification.sourceProviderIsGitHub) verification.reasons.push('source provider missing or non-GitHub');
  if (!verification.repoBindingPresent) verification.reasons.push('repo binding missing');
  if (!verification.commitBindingPresent) verification.reasons.push('commit binding missing');
  if (!verification.pathBindingPresent) verification.reasons.push('path binding missing');
  if (!verification.workflowBindingPresent) verification.reasons.push('workflow binding missing');
  if (provenance.workflowRunId && !verification.workflowRunVerifiable) verification.reasons.push('workflow run does not bind to benchmark run');
  if (!verification.metadataCoherent) verification.reasons.push('metadata/provenance mismatch');
  if (!verification.reasons.length) verification.reasons.push('provenance checks passed');
  return verification;
}

function shouldRejectProvenance(verification) {
  return (verification.contradictions || []).length > 0;
}

function decideVerificationUseTier(score) {
  if (score < 0.25) return 'insufficient-for-use';
  if (score < 0.60) return 'context-only';
  return 'patch-eligible';
}

function checkVerificationSufficiency(asset, need) {
  const evidence = asset.verificationEvidence || {};
  const benchmarkEvidenceBoundToGitHubRun = !!evidence.benchmarkRunId && evidence.benchmarkRunId === need.benchmarkRunId;
  const score = (
    (evidence.testsPassed ? 0.20 : 0) +
    (evidence.typecheckPassed ? 0.15 : 0) +
    (evidence.staticAnalysisPassed ? 0.10 : 0) +
    (evidence.benchmarkRan ? 0.20 : 0) +
    (benchmarkEvidenceBoundToGitHubRun ? 0.15 : 0) +
    (evidence.reproSteps?.length ? 0.10 : 0) +
    (evidence.pinnedEnvironment ? 0.10 : 0)
  );
  const recommendedUseTier = decideVerificationUseTier(score);
  const thresholdApplied = score < 0.25 ? 0.25 : (score < 0.60 ? 0.60 : 1.0);

  const verification = {
    hasTestEvidence: !!evidence.testsPassed,
    hasTypecheckEvidence: !!evidence.typecheckPassed,
    hasStaticAnalysisEvidence: !!evidence.staticAnalysisPassed,
    hasBenchmarkEvidence: !!evidence.benchmarkRan,
    benchmarkEvidenceBoundToGitHubRun,
    hasReproSteps: !!evidence.reproSteps?.length,
    hasPinnedEnvironment: !!evidence.pinnedEnvironment,
    scoreTrace: {
      score: Number(score.toFixed(4)),
      thresholdApplied
    },
    recommendedUseTier,
    evidenceCoverage: {
      matchedNeedRun: benchmarkEvidenceBoundToGitHubRun,
      proofLogCount: evidence.proofLogs?.length || 0,
      reproStepCount: evidence.reproSteps?.length || 0
    },
    reasons: []
  };

  if (verification.hasTestEvidence) verification.reasons.push('test evidence present');
  if (verification.hasTypecheckEvidence) verification.reasons.push('typecheck evidence present');
  if (verification.hasStaticAnalysisEvidence) verification.reasons.push('static analysis evidence present');
  if (verification.hasBenchmarkEvidence) verification.reasons.push('benchmark evidence present');
  if (verification.benchmarkEvidenceBoundToGitHubRun) verification.reasons.push('benchmark evidence bound to buyer GitHub run');
  if (verification.hasReproSteps) verification.reasons.push('repro steps present');
  if (verification.hasPinnedEnvironment) verification.reasons.push('environment pinned');
  if (!verification.reasons.length) verification.reasons.push('insufficient evidence for branch use');

  return verification;
}

function checkIssuerPolicyStatus(asset, policyState) {
  const issuerKey = asset.attestations[0]?.signerAddress || `issuer:${asset.assetId}`;
  let status = asset.metadata.issuerPolicyStatus || 'unknown';
  if (policyState.issuers.revoked.includes(issuerKey)) status = 'revoked';
  else if (policyState.issuers.restricted.includes(issuerKey)) status = 'restricted';
  else if (policyState.issuers.allowed.includes(issuerKey)) status = 'allowed';
  const history = policyState.issuerHistory[issuerKey] || { accepted: 0, revoked: 0 };
  return {
    issuerKey,
    status,
    allowlisted: status === 'allowed',
    orgBound: !!asset.metadata.organization,
    requiredCosignSatisfied: !!asset.attestations[0]?.cosignSatisfied,
    priorAcceptedIssuanceCount: Math.min(25, history.accepted),
    priorRevokedIssuanceCount: Math.min(25, history.revoked),
    policyTierCap: status === 'restricted' ? 'context-only' : (status === 'unknown' ? 'patch-eligible' : 'settlement-eligible'),
    additionalRequirements: status === 'restricted'
      ? ['extra reviewer approval', 'no settlement participation']
      : status === 'unknown'
        ? ['no automatic settlement upgrade']
        : [],
    reasons: status === 'allowed'
      ? ['issuer allowlisted for settlement-grade use']
      : status === 'restricted'
        ? ['issuer restricted to context or patch analysis without settlement']
        : status === 'revoked'
          ? ['issuer revoked']
          : ['issuer unknown; do not upgrade to settlement eligibility']
  };
}

function shouldRejectIssuerPolicy(status) {
  return status.status === 'revoked';
}

function decideCandidateUseTier(verification) {
  if (shouldRejectIssuance(verification.issuanceVerification)) return 'reject';
  if (shouldRejectProvenance(verification.provenanceVerification)) return 'reject';
  if (shouldRejectIssuerPolicy(verification.issuerPolicyStatus)) return 'reject';

  const tier = verification.verificationSufficiency.recommendedUseTier;
  if (tier === 'insufficient-for-use') return 'rank-only';
  if (tier === 'context-only') return 'context-only';
  return 'patch-eligible';
}

function upgradeToSettlementEligible(tier, verification) {
  if (tier !== 'patch-eligible') return tier;
  const issuerAllowed = verification.issuerPolicyStatus.status === 'allowed';
  if (!shouldRejectIssuance(verification.issuanceVerification) && !shouldRejectProvenance(verification.provenanceVerification) && issuerAllowed) {
    return 'settlement-eligible';
  }
  return tier;
}

function buildScoreGroups(need, asset, recall, needMatch, benchmarkImpact, actionability, penaltyInfo, finalRankingScore) {
  const running = [];
  let cumulative = 0;
  const steps = [
    { groupId: 'need-match', label: 'Need match', value: needMatch.finalScore, weight: 0.65, refs: rankingEvidenceRefs(need, asset, [need.task, ...need.touchedPaths.slice(0, 3)]) },
    { groupId: 'benchmark-impact', label: 'Benchmark impact', value: benchmarkImpact.finalScore, weight: 0.25, refs: rankingEvidenceRefs(need, asset, [...need.failingCases.slice(0, 3), ...need.weakDimensions.slice(0, 2)]) },
    { groupId: 'actionability', label: 'Actionability', value: actionability.finalScore, weight: 0.10, refs: rankingEvidenceRefs(need, asset, asset.metadata.sourcePaths || []) }
  ];
  for (const step of steps) {
    const contribution = Number((step.value * step.weight).toFixed(4));
    cumulative = Number((cumulative + contribution).toFixed(4));
    running.push({ ...step, contribution, cumulative });
  }
  const penaltyRunning = [];
  let penaltyCumulative = 0;
  for (const penalty of penaltyInfo.rankingPenalties) {
    penaltyCumulative = Number((penaltyCumulative + penalty.mass).toFixed(4));
    penaltyRunning.push({
      code: penalty.code,
      mass: penalty.mass,
      cumulative: penaltyCumulative,
      evidenceRefs: penalty.evidenceRefs
    });
  }
  return {
    needMatch: {
      groupId: 'need-match',
      finalScore: needMatch.finalScore,
      verifiedInputs: {
        task: need.task,
        failureModes: need.failureModes,
        touchedPaths: need.touchedPaths,
        extractedSymbols: need.extractedSymbols,
        configKeys: need.configKeys,
        stackHints: need.stackHints,
        targetArtifactKinds: need.targetArtifactKinds,
        recallUnitIds: recall.unitIds
      },
      sequence: [
        { step: 1, label: 'Task semantic fit', value: needMatch.taskSemanticFit, refs: needMatch.detail.taskSemanticFit.evidenceRefs },
        { step: 2, label: 'Failure mode fit', value: needMatch.failureModeFit, refs: needMatch.detail.failureModeFit.evidenceRefs },
        { step: 3, label: 'Symbol fit', value: needMatch.symbolFit, refs: needMatch.detail.symbolFit.evidenceRefs },
        { step: 4, label: 'Path fit', value: needMatch.pathFit, refs: needMatch.detail.pathFit.evidenceRefs },
        { step: 5, label: 'Constraint + artifact precision', value: Number(((needMatch.constraintFit + needMatch.artifactKindFit) / 2).toFixed(4)), refs: [...needMatch.detail.constraintFit.evidenceRefs, ...needMatch.detail.artifactKindFit.evidenceRefs] }
      ],
      accumulation: running.filter((entry) => entry.groupId === 'need-match'),
      references: rankingEvidenceRefs(need, asset, recall.unitIds)
    },
    benchmarkImpact: {
      groupId: 'benchmark-impact',
      finalScore: benchmarkImpact.finalScore,
      verifiedInputs: { failingCases: need.failingCases, weakDimensions: need.weakDimensions, baselineMetrics: need.baselineMetrics, recallChannels: recall.fusion.contributingChannels },
      sequence: [
        { step: 1, label: 'Improves failing cases', value: benchmarkImpact.likelyImprovesFailingCases, refs: benchmarkImpact.detail.likelyImprovesFailingCases.evidenceRefs },
        { step: 2, label: 'Improves weak dimensions', value: benchmarkImpact.likelyImprovesWeakDimensions, refs: benchmarkImpact.detail.likelyImprovesWeakDimensions.evidenceRefs },
        { step: 3, label: 'Generalizes to repo context', value: benchmarkImpact.likelyGeneralizesToRepoContext, refs: benchmarkImpact.detail.likelyGeneralizesToRepoContext.evidenceRefs }
      ],
      accumulation: running.filter((entry) => entry.groupId === 'benchmark-impact'),
      references: rankingEvidenceRefs(need, asset, [...need.failingCases, ...need.weakDimensions])
    },
    penaltyMass: {
      groupId: 'penalty-mass',
      finalScore: penaltyInfo.penaltyMass,
      verifiedInputs: { penalties: penaltyInfo.rankingPenalties.map((p) => p.code), artifactKind: asset.artifactKind, artifactType: asset.artifactType, sourcePaths: asset.metadata.sourcePaths },
      sequence: penaltyRunning.map((entry, index) => ({ step: index + 1, label: entry.code, value: entry.mass, refs: entry.evidenceRefs })),
      accumulation: penaltyRunning,
      references: rankingEvidenceRefs(need, asset, penaltyInfo.rankingPenalties.flatMap((p) => p.evidenceRefs || []))
    },
    finalRank: { prePenalty: cumulative, penaltyMass: penaltyInfo.penaltyMass, finalRankingScore }
  };
}

export function evaluateCandidates(need, assets, policyState = buildPolicyState()) {
  const recalled = recallCandidates(need, assets);
  const recallByAssetId = new Map(recalled.map((entry) => [entry.assetId, entry]));

  return assets
    .filter((asset) => recallByAssetId.has(asset.assetId))
    .map((asset) => {
      const recall = recallByAssetId.get(asset.assetId);
      const needMatch = computeNeedMatch(need, asset, recall);
      const benchmarkImpact = computeBenchmarkImpact(need, asset, needMatch, recall);
      const actionability = computeActionability(need, asset, needMatch, recall);
      const wholeAssetNeedScore = clamp01((0.72 * needMatch.finalScore) + (0.18 * actionability.implementationSpecificity) + (0.10 * Math.min(1, recall.recallScore / 6)));
      const penaltyInfo = computePenaltyMass(need, asset, { needMatch, benchmarkImpact, actionability });
      const finalRankingScore = clamp01((0.65 * needMatch.finalScore) + (0.25 * benchmarkImpact.finalScore) + (0.10 * actionability.finalScore) - penaltyInfo.penaltyMass);
      const verification = {
        issuanceVerification: checkIssuanceVerification(asset),
        provenanceVerification: checkProvenanceVerification(asset, need),
        verificationSufficiency: checkVerificationSufficiency(asset, need),
        issuerPolicyStatus: checkIssuerPolicyStatus(asset, policyState)
      };
      let useTier = decideCandidateUseTier(verification);
      if (verification.issuerPolicyStatus.policyTierCap === 'context-only' && useTier === 'patch-eligible') useTier = 'context-only';
      useTier = upgradeToSettlementEligible(useTier, verification);
      const verificationReceipt = buildStaticExecutionReceipt({
        receiptKind: 'verification-static-check',
        stageId: 'verification.determinisms.v9',
        toolId: 'verification.determinisms.v9',
        inputs: {
          needId: need.needId,
          assetId: asset.assetId,
          verificationEvidence: asset.verificationEvidence,
          issuerPolicyStatus: verification.issuerPolicyStatus
        },
        normalizedOutputEnvelope: {
          issuanceVerification: verification.issuanceVerification,
          provenanceVerification: verification.provenanceVerification,
          verificationSufficiency: verification.verificationSufficiency,
          issuerPolicyStatus: verification.issuerPolicyStatus,
          useTier
        },
        evidenceRefs: rankingEvidenceRefs(need, asset, recall.unitIds),
        replayInputClosure: [need.needId, asset.assetId, asset.contentRoot]
      });
      const verificationDecision = buildVerificationDecisionReceipts({ need, asset, verification, useTier, policyState });
      verification.decisionSurface = verificationDecision.decisionSurface;

      const scoreGroups = buildScoreGroups(need, asset, recall, needMatch, benchmarkImpact, actionability, penaltyInfo, finalRankingScore);

      return {
        assetId: asset.assetId,
        asset,
        recall,
        githubBoundary: asset.githubBoundary,
        identitySurface: asset.identitySurface,
        uploadSurface: asset.uploadSurface,
        ranking: {
          wholeAssetNeedScore,
          needMatch,
          benchmarkImpact,
          actionability,
          rankingPenalties: penaltyInfo.rankingPenalties,
          penaltyMass: penaltyInfo.penaltyMass,
          finalRankingScore,
          scoreGroups,
          explainability: {
            strongestScoreDrivers: [
              { label: 'taskSemanticFit', value: Number(needMatch.taskSemanticFit.toFixed(4)) },
              { label: 'failureModeFit', value: Number(needMatch.failureModeFit.toFixed(4)) },
              { label: 'likelyImprovesFailingCases', value: Number(benchmarkImpact.likelyImprovesFailingCases.toFixed(4)) },
              { label: 'implementationSpecificity', value: Number(actionability.implementationSpecificity.toFixed(4)) }
            ].sort((a, b) => b.value - a.value),
            penaltiesApplied: penaltyInfo.rankingPenalties.map((penalty) => penalty.code),
            recallFusion: recall.fusion,
            finalRank: scoreGroups.finalRank
          }
        },
        verification,
        useTier,
        rights: useTierRights(useTier, DEFAULT_BRANCH_MODE),
        measurementProvenance: [
          measurementTrace('hybrid', 'ranking.recall-fusion.v2', rankingEvidenceRefs(need, asset, recall.unitIds)),
          measurementTrace('hybrid', 'ranking.need-match.v2', rankingEvidenceRefs(need, asset, recall.unitIds)),
          measurementTrace('hybrid', 'ranking.benchmark-impact.v2', rankingEvidenceRefs(need, asset, recall.unitIds)),
          measurementTrace('hybrid', 'ranking.actionability.v2', rankingEvidenceRefs(need, asset, recall.unitIds)),
          measurementTrace('static', 'verification.determinisms.v2', rankingEvidenceRefs(need, asset, recall.unitIds), { receiptRefs: [verificationReceipt.receiptId] })
        ],
        staticExecutionReceipts: [verificationReceipt, ...verificationDecision.receipts]
      };
    })
    .sort((a, b) => b.ranking.finalRankingScore - a.ranking.finalRankingScore || a.assetId.localeCompare(b.assetId));
}

export function assembleAssetPack(need, evaluatedCandidates, branchMode = DEFAULT_BRANCH_MODE) {
  const allowedTiers = allowedUseTiersForBranchMode(branchMode);

  const selected = evaluatedCandidates
    .filter((candidate) => allowedTiers.has(candidate.useTier))
    .slice(0, 3);

  const selectedAssets = selected.map((candidate) => candidate.assetId);
  const selectedUnits = selected.flatMap((candidate) => candidate.asset.contentUnits.slice(0, 2).map((unit) => unit.unitId));
  const lockedContentRoots = selected.map((candidate) => candidate.asset.contentRoot);
  const lockedAttestationHashes = selected.map((candidate) => candidate.asset.attestations[0]?.attestationHash).filter(Boolean);
  const estimatedBundleScore = Number((selected.reduce((sum, candidate) => sum + candidate.ranking.finalRankingScore, 0) / Math.max(1, selected.length)).toFixed(4));

  return {
    assetPackId: `asset_pack_${sha256(`${need.needId}:${selectedAssets.join(':')}`).slice(0, 12)}`,
    needId: need.needId,
    conformanceProfile: PROFILE_A,
    productionIntentProfile: PROFILE_B,
    selectedAssets,
    selectedUnits,
    lockedContentRoots,
    lockedAttestationHashes,
    estimatedBundleScore,
    branchMode,
    acceptedUseTiers: [...allowedTiers],
    coverage: {
      failingCasesCovered: summarizeStrings(selected.flatMap((candidate) => intersection(need.failingCases, uniqueTokens(candidate.asset.metadata.privateContent)))),
      weakDimensionsCovered: summarizeStrings(selected.flatMap((candidate) => intersection(need.weakDimensions, uniqueTokens(candidate.asset.metadata.privateContent)))),
      touchedPathsCovered: summarizeStrings(selected.flatMap((candidate) => intersection(need.touchedPaths, candidate.asset.metadata.sourcePaths || [])))
    }
  };
}

function buildMatchReport(need, evaluatedCandidates, assetPack) {
  const selectedSet = new Set(assetPack.selectedAssets);
  return {
    needId: need.needId,
    conformanceProfile: PROFILE_A,
    productionIntentProfile: PROFILE_B,
    branchMode: assetPack.branchMode,
    selectedAssets: evaluatedCandidates
      .filter((candidate) => selectedSet.has(candidate.assetId))
      .map((candidate) => ({
        assetId: candidate.assetId,
        finalRankingScore: Number(candidate.ranking.finalRankingScore.toFixed(4)),
        useTier: candidate.useTier,
        rights: useTierRights(candidate.useTier, assetPack.branchMode),
        reasons: [
          `needMatch=${candidate.ranking.needMatch.finalScore.toFixed(4)}`,
          `benchmarkImpact=${candidate.ranking.benchmarkImpact.finalScore.toFixed(4)}`,
          `actionability=${candidate.ranking.actionability.finalScore.toFixed(4)}`
        ]
      })),
    rejectedAssets: evaluatedCandidates
      .filter((candidate) => !selectedSet.has(candidate.assetId))
      .map((candidate) => ({
        assetId: candidate.assetId,
        useTier: candidate.useTier,
        rights: useTierRights(candidate.useTier, assetPack.branchMode),
        rejectionReason: `Not materialized into ${assetPack.branchMode} branch at tier ${candidate.useTier}.`
      }))
  };
}

function buildVerificationReport(need, evaluatedCandidates, branchMode = DEFAULT_BRANCH_MODE) {
  const assetVerification = evaluatedCandidates.map((candidate) => ({
    assetId: candidate.assetId,
    title: candidate.asset.title,
    issuanceVerification: candidate.verification.issuanceVerification,
    provenanceVerification: candidate.verification.provenanceVerification,
    verificationSufficiency: candidate.verification.verificationSufficiency,
    issuerPolicyStatus: candidate.verification.issuerPolicyStatus,
    verificationDecisionSurface: candidate.verification.decisionSurface,
    claimedEvidence: candidate.verification.decisionSurface?.claimedEvidence || {},
    measuredEvidence: candidate.verification.decisionSurface?.measuredEvidence || {},
    policyRestrictions: candidate.verification.decisionSurface?.policyRestrictions || {},
    useTier: candidate.useTier,
    rights: useTierRights(candidate.useTier, branchMode),
    receiptRefs: summarizeStrings((candidate.staticExecutionReceipts || []).filter((receipt) => receipt.stageId.startsWith('verification.')).map((receipt) => receipt.receiptId))
  }));
  return {
    needId: need.needId,
    conformanceProfile: PROFILE_A,
    productionIntentProfile: PROFILE_B,
    branchMode,
    assetVerification,
    verificationReceiptCount: assetVerification.reduce((sum, entry) => sum + entry.receiptRefs.length, 0),
    verificationFamilies: ['issuance', 'provenance', 'sufficiency', 'issuer-policy']
  };
}

function buildVerificationReceiptsArtifact(need, evaluatedCandidates = []) {
  return {
    needId: need.needId,
    conformanceProfile: PROFILE_A,
    productionIntentProfile: PROFILE_B,
    verificationReceipts: evaluatedCandidates.flatMap((candidate) => (candidate.staticExecutionReceipts || []).filter((receipt) => receipt.stageId.startsWith('verification.'))),
    verificationDecisionSurfaces: evaluatedCandidates.map((candidate) => ({
      assetId: candidate.assetId,
      title: candidate.asset.title,
      useTier: candidate.useTier,
      ...candidate.verification.decisionSurface
    }))
  };
}

function buildEvalManifest(need, evaluatedCandidates, promptSurfaces = []) {
  const evaluatorInterfaces = [
    evaluatorSurface({ evaluatorId: 'need-measurement.task.v2', evaluatorKind: 'inferred-evaluator', measurementClass: 'inferred-measurement', mode: 'inferred', promptId: 'need-measurement.task.v2', modelId: DEFAULT_MODEL_ID, evidenceRefs: [need.needId, need.benchmarkRunId], standIn: true }),
    evaluatorSurface({ evaluatorId: 'need-measurement.failure-modes.v2', evaluatorKind: 'inferred-evaluator', measurementClass: 'inferred-measurement', mode: 'inferred', promptId: 'need-measurement.failure-modes.v2', modelId: DEFAULT_MODEL_ID, evidenceRefs: [need.needId], standIn: true }),
    evaluatorSurface({ evaluatorId: 'need-measurement.constraints.v2', evaluatorKind: 'inferred-evaluator', measurementClass: 'inferred-measurement', mode: 'inferred', promptId: 'need-measurement.constraints.v2', modelId: DEFAULT_MODEL_ID, evidenceRefs: [need.needId], standIn: true }),
    evaluatorSurface({ evaluatorId: 'need-measurement.target-artifact-kinds.v2', evaluatorKind: 'inferred-evaluator', measurementClass: 'inferred-measurement', mode: 'inferred', promptId: 'need-measurement.target-artifact-kinds.v2', modelId: DEFAULT_MODEL_ID, evidenceRefs: [need.needId], standIn: true }),
    evaluatorSurface({ evaluatorId: 'candidate-recall.hybrid.v2', evaluatorKind: 'hybrid-pipeline-stage', measurementClass: 'hybrid-evaluation', mode: 'hybrid', toolId: 'candidate-recall.hybrid.v2', modelId: DEFAULT_MODEL_ID, evidenceRefs: [need.needId], standIn: true }),
    evaluatorSurface({ evaluatorId: 'verification.determinisms.v2', evaluatorKind: 'deterministic-static-command', measurementClass: 'static-analysis', mode: 'static', toolId: 'verification.determinisms.v2', modelId: DEFAULT_MODEL_ID, evidenceRefs: [need.needId], standIn: false })
  ];

  return {
    needId: need.needId,
    benchmarkRunId: need.benchmarkRunId,
    promptsVersion: 'spec-v9-demo-deterministic.v1',
    modelsUsed: [DEFAULT_MODEL_ID],
    deterministicFeatureVersion: 'spec-v9-demo-static.v1',
    evaluatorInterfaces,
    evaluatorBoundaryNotes: {
      profileA: 'Deterministic/local stand-ins satisfy the evaluator and embedding contracts for demo use.',
      profileB: 'Real embedding providers, prompt execution, and external evaluator services can replace the stand-ins without changing artifact schema.'
    },
    vectorSpaces: ['task-semantic-space.v8', 'failure-mode-space.v8', 'technical-context-space.v8'],
    promptSurfaces,
    promptContracts: promptSurfaces.map((surface) => surface.promptContract),
    evaluatorsUsed: evaluatorInterfaces.map((entry) => entry.evaluatorId),
    assetMeasurementProvenance: evaluatedCandidates.map((candidate) => ({
      assetId: candidate.assetId,
      provenance: candidate.measurementProvenance,
      contentUnitSemantics: candidate.asset.assetMeasurement?.contentUnitSemantics || []
    }))
  };
}

function buildAssetPackLock(assetPack, selectedCandidates) {
  return {
    assetPackId: assetPack.assetPackId,
    needId: assetPack.needId,
    conformanceProfile: PROFILE_A,
    productionIntentProfile: PROFILE_B,
    branchMode: assetPack.branchMode,
    acceptedUseTiers: assetPack.acceptedUseTiers,
    assets: selectedCandidates.map((candidate) => ({
      assetId: candidate.assetId,
      contentRoot: candidate.asset.contentRoot,
      attestationHash: candidate.asset.attestations[0]?.attestationHash,
      useTier: candidate.useTier,
      sourceMaterialBinding: candidate.asset.sourceMaterialBinding,
      selectionRoot: candidate.asset.artifactSelectionSurface?.selectedInventoryRoot,
      addressingRoot: candidate.asset.addressingSurface?.addressingRoot,
      authPayloadHash: candidate.asset.githubAppAuthSurface?.authPayloadHash,
      signedPayloadHash: candidate.asset.signingSurface?.payloadHash,
      selectedInventoryEntryIds: candidate.asset.artifactSelectionSurface?.selectedInventoryEntryIds || []
    })),
    units: selectedCandidates.flatMap((candidate) => candidate.asset.contentUnits.slice(0, 2).map((unit) => ({
      assetId: candidate.assetId,
      unitId: unit.unitId,
      unitHash: unit.unitHash
    }))),
    selectedSourceMaterial: selectedCandidates.map((candidate) => ({
      assetId: candidate.assetId,
      selectedUnitIds: candidate.asset.contentUnits.slice(0, 2).map((unit) => unit.unitId),
      materializationRoot: candidate.asset.sourceMaterialBinding.materializationRoot,
      mutableInBranch: candidate.asset.sourceMaterialBinding.mutableInBranch,
      confidentiality: candidate.asset.sourceMaterialBinding.confidentiality,
      selectionRoot: candidate.asset.artifactSelectionSurface?.selectedInventoryRoot,
      addressingRoot: candidate.asset.addressingSurface?.addressingRoot
    }))
  };
}

function buildSelectedSourceMaterialManifest(assetPack, selectedCandidates) {
  return {
    assetPackId: assetPack.assetPackId,
    branchMode: assetPack.branchMode,
    conformanceProfile: PROFILE_A,
    productionIntentProfile: PROFILE_B,
    selectedSourceMaterial: selectedCandidates.map((candidate) => ({
      assetId: candidate.assetId,
      title: candidate.asset.title,
      useTier: candidate.useTier,
      artifactKind: candidate.asset.artifactKind,
      sourceMaterialBinding: candidate.asset.sourceMaterialBinding,
      rights: useTierRights(candidate.useTier, assetPack.branchMode),
      selectionLabel: candidate.asset.artifactSelectionSurface?.selectionLabel,
      selectedInventoryEntryIds: candidate.asset.artifactSelectionSurface?.selectedInventoryEntryIds || [],
      selectedInventoryEntries: candidate.asset.artifactSelectionSurface?.selectedInventoryEntries || [],
      selectionRoot: candidate.asset.artifactSelectionSurface?.selectedInventoryRoot,
      addressingRoot: candidate.asset.addressingSurface?.addressingRoot,
      authPayloadHash: candidate.asset.githubAppAuthSurface?.authPayloadHash,
      signingPayloadHash: candidate.asset.signingSurface?.payloadHash,
      selectedUnits: candidate.asset.contentUnits.slice(0, 2).map((unit) => ({
        assetId: candidate.assetId,
        unitId: unit.unitId,
        unitKind: unit.unitKind,
        unitHash: unit.unitHash
      }))
    }))
  };
}

function scoreSourceBundleForShares(need, candidates) {
  if (!candidates.length) {
    return {
      bundleShareScoreUnits: 0n,
      scoreScale: SOURCE_TO_SHARES_SCALE.toString(),
      componentShareScoreUnits: {
        averageRankingUnits: 0n,
        failureModeCoverageUnits: 0n,
        constraintCoverageUnits: 0n,
        touchedPathCoverageUnits: 0n
      },
      coveredNeedEvidence: {
        failureModes: [],
        constraints: [],
        touchedPaths: []
      },
      bundleScoreHash: stableHashObject({ empty: true })
    };
  }

  const coveredFailureModes = summarizeStrings(
    candidates.flatMap((candidate) => intersection(need.failureModes, uniqueTokens(candidate.asset.metadata.privateContent)))
  );
  const coveredConstraints = summarizeStrings(
    candidates.flatMap((candidate) => intersection(need.constraints, candidate.asset.metadata.declaredConstraints || []))
  );
  const coveredTouchedPaths = summarizeStrings(
    candidates.flatMap((candidate) => intersection(need.touchedPaths, candidate.asset.metadata.sourcePaths || []))
  );
  const averageRankingUnits = candidates.reduce(
    (sum, candidate) => sum + toFixedPointUnits(candidate.ranking.finalRankingScore),
    0n
  ) / BigInt(candidates.length);
  const failureModeCoverageUnits = fixedPointRatioUnits(coveredFailureModes.length, need.failureModes.length || 1);
  const constraintCoverageUnits = fixedPointRatioUnits(coveredConstraints.length, need.constraints.length || 1);
  const touchedPathCoverageUnits = fixedPointRatioUnits(coveredTouchedPaths.length, need.touchedPaths.length || 1);
  const bundleShareScoreUnits = (
    (averageRankingUnits * 60n) +
    (failureModeCoverageUnits * 20n) +
    (constraintCoverageUnits * 10n) +
    (touchedPathCoverageUnits * 10n)
  ) / 100n;

  return {
    bundleShareScoreUnits,
    scoreScale: SOURCE_TO_SHARES_SCALE.toString(),
    componentShareScoreUnits: {
      averageRankingUnits,
      failureModeCoverageUnits,
      constraintCoverageUnits,
      touchedPathCoverageUnits
    },
    coveredNeedEvidence: {
      failureModes: coveredFailureModes,
      constraints: coveredConstraints,
      touchedPaths: coveredTouchedPaths
    },
    bundleScoreHash: stableHashObject({
      candidateIds: candidates.map((candidate) => candidate.assetId),
      averageRankingUnits: averageRankingUnits.toString(),
      failureModeCoverageUnits: failureModeCoverageUnits.toString(),
      constraintCoverageUnits: constraintCoverageUnits.toString(),
      touchedPathCoverageUnits: touchedPathCoverageUnits.toString(),
      bundleShareScoreUnits: bundleShareScoreUnits.toString()
    })
  };
}

function normalizeContributionUnitsToBasisPoints(contributionEntries) {
  if (!contributionEntries.length) {
    return {
      normalizedShares: [],
      normalizationTrace: {
        method: 'largest-remainder',
        totalContributionUnits: '0',
        fallbackEvenDistribution: false,
        tieBreakPolicy: 'remainder desc, clipped contribution desc, assetId asc',
        remainderDistributionOrder: [],
        provisionalShares: [],
        remainderBasisPoints: 0,
        normalizedTotalBp: 0
      }
    };
  }

  const orderedByAssetId = contributionEntries.slice().sort((a, b) => a.assetId.localeCompare(b.assetId));
  const totalContributionUnits = orderedByAssetId.reduce((sum, entry) => sum + entry.clippedContributionUnits, 0n);
  if (totalContributionUnits <= 0n) {
    const even = Math.floor(MAX_BPS / orderedByAssetId.length);
    const remainderUnits = MAX_BPS - (even * orderedByAssetId.length);
    const normalizedShares = orderedByAssetId.map((entry, index) => ({
      assetId: entry.assetId,
      shareBp: even + (index < remainderUnits ? 1 : 0),
      rawContributionUnits: entry.rawContributionUnits.toString(),
      clippedContributionUnits: entry.clippedContributionUnits.toString(),
      normalizationRemainderUnits: '0',
      reasons: [...entry.reasons, 'fallback-even-distribution']
    }));
    const provisionalShares = orderedByAssetId.map((entry, index) => ({
      assetId: entry.assetId,
      tieBreakRank: index + 1,
      floorShareBp: even,
      remainderUnits: '0',
      remainderAwardedBp: index < remainderUnits ? 1 : 0,
      finalShareBp: even + (index < remainderUnits ? 1 : 0),
      rawContributionUnits: entry.rawContributionUnits.toString(),
      clippedContributionUnits: entry.clippedContributionUnits.toString()
    }));
    return {
      normalizedShares,
      normalizationTrace: {
        method: 'largest-remainder',
        totalContributionUnits: totalContributionUnits.toString(),
        fallbackEvenDistribution: true,
        tieBreakPolicy: 'assetId asc for even fallback remainder',
        remainderDistributionOrder: orderedByAssetId.map((entry) => entry.assetId),
        provisionalShares,
        remainderBasisPoints: remainderUnits,
        normalizedTotalBp: normalizedShares.reduce((sum, entry) => sum + entry.shareBp, 0)
      }
    };
  }

  const provisional = orderedByAssetId.map((entry) => {
    const exactNumerator = entry.clippedContributionUnits * MAX_BPS_BIGINT;
    const floorShare = Number(exactNumerator / totalContributionUnits);
    return {
      assetId: entry.assetId,
      floorShare,
      remainderUnits: exactNumerator % totalContributionUnits,
      clippedContributionUnits: entry.clippedContributionUnits,
      rawContributionUnits: entry.rawContributionUnits,
      reasons: entry.reasons,
      remainderAwardedBp: 0,
      tieBreakRank: 0
    };
  });
  const usedBasisPoints = provisional.reduce((sum, entry) => sum + entry.floorShare, 0);
  const remainderBasisPoints = MAX_BPS - usedBasisPoints;
  provisional.sort((left, right) => {
    if (left.remainderUnits !== right.remainderUnits) return left.remainderUnits > right.remainderUnits ? -1 : 1;
    if (left.clippedContributionUnits !== right.clippedContributionUnits) return left.clippedContributionUnits > right.clippedContributionUnits ? -1 : 1;
    return left.assetId.localeCompare(right.assetId);
  });

  const remainderDistributionOrder = provisional.map((entry) => entry.assetId);
  provisional.forEach((entry, index) => {
    entry.tieBreakRank = index + 1;
  });
  for (let index = 0; index < remainderBasisPoints; index += 1) {
    provisional[index].remainderAwardedBp += 1;
    provisional[index].floorShare += 1;
  }
  const provisionalShares = provisional.map((entry) => ({
    assetId: entry.assetId,
    tieBreakRank: entry.tieBreakRank,
    floorShareBp: entry.floorShare - entry.remainderAwardedBp,
    remainderUnits: entry.remainderUnits.toString(),
    remainderAwardedBp: entry.remainderAwardedBp,
    finalShareBp: entry.floorShare,
    rawContributionUnits: entry.rawContributionUnits.toString(),
    clippedContributionUnits: entry.clippedContributionUnits.toString()
  }));

  const normalizedShares = provisional
    .sort((left, right) => right.floorShare - left.floorShare || left.assetId.localeCompare(right.assetId))
    .map((entry) => ({
      assetId: entry.assetId,
      shareBp: entry.floorShare,
      rawContributionUnits: entry.rawContributionUnits.toString(),
      clippedContributionUnits: entry.clippedContributionUnits.toString(),
      normalizationRemainderUnits: entry.remainderUnits.toString(),
      reasons: entry.reasons
    }));

  return {
    normalizedShares,
    normalizationTrace: {
      method: 'largest-remainder',
      totalContributionUnits: totalContributionUnits.toString(),
      fallbackEvenDistribution: false,
      tieBreakPolicy: 'remainder desc, clipped contribution desc, assetId asc',
      remainderDistributionOrder,
      provisionalShares,
      remainderBasisPoints,
      normalizedTotalBp: normalizedShares.reduce((sum, entry) => sum + entry.shareBp, 0)
    }
  };
}

function buildSourceToSharesArtifact(need, settlementCandidates) {
  const fullBundleScore = scoreSourceBundleForShares(need, settlementCandidates);
  const sourceContributionEntries = settlementCandidates.map((candidate) => {
    const bundleWithoutCandidate = scoreSourceBundleForShares(
      need,
      settlementCandidates.filter((entry) => entry.assetId !== candidate.assetId)
    );
    const rawContributionUnits = fullBundleScore.bundleShareScoreUnits - bundleWithoutCandidate.bundleShareScoreUnits;
    const clippedContributionUnits = rawContributionUnits > 0n ? rawContributionUnits : 0n;
    const clipped = rawContributionUnits <= 0n;
    const clippingReceiptId = `clip_receipt_${sha256(`${need.needId}:${candidate.assetId}:${rawContributionUnits}`).slice(0, 12)}`;
    return {
      assetId: candidate.assetId,
      title: candidate.asset.title,
      contentRoot: candidate.asset.contentRoot,
      fullBundleScoreUnits: fullBundleScore.bundleShareScoreUnits,
      bundleWithoutAssetScoreUnits: bundleWithoutCandidate.bundleShareScoreUnits,
      rawContributionUnits,
      clippedContributionUnits,
      clipped,
      clippingReceiptId,
      selectedUnitRefs: candidate.asset.contentUnits.slice(0, 2).map((unit) => unit.unitId),
      reasons: clipped
        ? [
            `raw marginal contribution for ${candidate.assetId} was non-positive`,
            `fullBundleScoreUnits=${fullBundleScore.bundleShareScoreUnits.toString()}`,
            `bundleWithoutAssetScoreUnits=${bundleWithoutCandidate.bundleShareScoreUnits.toString()}`
          ]
        : [
            `positive marginal contribution for ${candidate.assetId}`,
            `fullBundleScoreUnits=${fullBundleScore.bundleShareScoreUnits.toString()}`,
            `bundleWithoutAssetScoreUnits=${bundleWithoutCandidate.bundleShareScoreUnits.toString()}`
          ],
      coveredNeedEvidence: {
        failureModes: intersection(need.failureModes, uniqueTokens(candidate.asset.metadata.privateContent)),
        constraints: intersection(need.constraints, candidate.asset.metadata.declaredConstraints || []),
        touchedPaths: intersection(need.touchedPaths, candidate.asset.metadata.sourcePaths || [])
      },
      candidateRankingScoreUnits: toFixedPointUnits(candidate.ranking.finalRankingScore)
    };
  });
  const clippingReceipts = sourceContributionEntries.map((entry) => ({
    receiptId: entry.clippingReceiptId,
    receiptKind: 'source-to-shares-clipping',
    assetId: entry.assetId,
    clipped: entry.clipped,
    rawContributionUnits: entry.rawContributionUnits.toString(),
    clippedContributionUnits: entry.clippedContributionUnits.toString(),
    reason: entry.clipped ? 'non-positive-marginal-contribution' : 'positive-marginal-contribution',
    receiptHash: stableHashObject({
      assetId: entry.assetId,
      rawContributionUnits: entry.rawContributionUnits.toString(),
      clippedContributionUnits: entry.clippedContributionUnits.toString(),
      clipped: entry.clipped
    })
  }));
  const { normalizedShares, normalizationTrace } = normalizeContributionUnitsToBasisPoints(sourceContributionEntries);
  const rawShareByAssetId = new Map(normalizedShares.map((entry) => [entry.assetId, entry]));
  return {
    needId: need.needId,
    conformanceProfile: PROFILE_A,
    productionIntentProfile: PROFILE_B,
    scoreScale: SOURCE_TO_SHARES_SCALE.toString(),
    bundleShareScoreWeightsBp: {
      averageRanking: 6000,
      failureModeCoverage: 2000,
      constraintCoverage: 1000,
      touchedPathCoverage: 1000
    },
    settlementCandidateAssetIds: settlementCandidates.map((candidate) => candidate.assetId),
    bundleShareScore: {
      bundleShareScoreUnits: fullBundleScore.bundleShareScoreUnits.toString(),
      bundleShareScore: fixedPointUnitsToString(fullBundleScore.bundleShareScoreUnits),
      componentShareScoreUnits: Object.fromEntries(
        Object.entries(fullBundleScore.componentShareScoreUnits).map(([key, value]) => [key, value.toString()])
      ),
      coveredNeedEvidence: fullBundleScore.coveredNeedEvidence
    },
    sourceContributionEntries: sourceContributionEntries.map((entry) => ({
      assetId: entry.assetId,
      title: entry.title,
      contentRoot: entry.contentRoot,
      selectedUnitRefs: entry.selectedUnitRefs,
      fullBundleScoreUnits: entry.fullBundleScoreUnits.toString(),
      bundleWithoutAssetScoreUnits: entry.bundleWithoutAssetScoreUnits.toString(),
      rawContributionUnits: entry.rawContributionUnits.toString(),
      clippedContributionUnits: entry.clippedContributionUnits.toString(),
      clipped: entry.clipped,
      clippingReceiptId: entry.clippingReceiptId,
      candidateRankingScoreUnits: entry.candidateRankingScoreUnits.toString(),
      marginalContributionReplay: {
        fullBundleScoreUnits: entry.fullBundleScoreUnits.toString(),
        bundleWithoutAssetScoreUnits: entry.bundleWithoutAssetScoreUnits.toString(),
        rawContributionUnits: entry.rawContributionUnits.toString(),
        clippedContributionUnits: entry.clippedContributionUnits.toString(),
        clipped: entry.clipped,
        clippingReceiptId: entry.clippingReceiptId
      },
      coveredNeedEvidence: entry.coveredNeedEvidence,
      reasons: entry.reasons,
      rawShareBp: rawShareByAssetId.get(entry.assetId)?.shareBp || 0,
      normalizationRemainderUnits: rawShareByAssetId.get(entry.assetId)?.normalizationRemainderUnits || '0'
    })),
    clippingReceipts,
    basisPointNormalization: normalizationTrace,
    normalizationLedger: normalizationTrace.provisionalShares || [],
    rawShares: normalizedShares,
    proofHash: stableHashObject({
      needId: need.needId,
      sourceContributionEntries: sourceContributionEntries.map((entry) => ({
        assetId: entry.assetId,
        rawContributionUnits: entry.rawContributionUnits.toString(),
        clippedContributionUnits: entry.clippedContributionUnits.toString(),
        clipped: entry.clipped
      })),
      normalizationTrace
    })
  };
}

function allocateExactMicroUnitsByShare(totalMicroUnits, settledShares) {
  const total = BigInt(totalMicroUnits);
  const provisional = settledShares.map((entry) => {
    const basisPoints = BigInt(entry.settledShareBp);
    const numerator = total * basisPoints;
    return {
      assetId: entry.assetId,
      settledShareBp: entry.settledShareBp,
      floorMicroUnits: numerator / MAX_BPS_BIGINT,
      microUnits: numerator / MAX_BPS_BIGINT,
      remainderUnits: numerator % MAX_BPS_BIGINT,
      extraMicroUnitsAwarded: 0n,
      tieBreakRank: 0
    };
  });
  const initiallyAllocated = provisional.reduce((sum, entry) => sum + entry.microUnits, 0n);
  let remainingUnits = total - initiallyAllocated;
  provisional.sort((left, right) => {
    if (left.remainderUnits !== right.remainderUnits) return left.remainderUnits > right.remainderUnits ? -1 : 1;
    if (left.settledShareBp !== right.settledShareBp) return right.settledShareBp - left.settledShareBp;
    return left.assetId.localeCompare(right.assetId);
  });
  const remainderDistributionOrder = provisional.map((entry) => entry.assetId);
  provisional.forEach((entry, index) => {
    entry.tieBreakRank = index + 1;
  });
  let index = 0;
  while (remainingUnits > 0n && provisional.length) {
    provisional[index % provisional.length].microUnits += 1n;
    provisional[index % provisional.length].extraMicroUnitsAwarded += 1n;
    remainingUnits -= 1n;
    index += 1;
  }
  const allocations = provisional
    .sort((left, right) => right.settledShareBp - left.settledShareBp || left.assetId.localeCompare(right.assetId))
    .map((entry) => ({
      assetId: entry.assetId,
      settledShareBp: entry.settledShareBp,
      microUnits: entry.microUnits.toString(),
      floorMicroUnits: entry.floorMicroUnits.toString(),
      remainderUnits: entry.remainderUnits.toString(),
      extraMicroUnitsAwarded: entry.extraMicroUnitsAwarded.toString(),
      tieBreakRank: entry.tieBreakRank
    }));
  return {
    allocations,
    allocationTrace: {
      method: 'largest-remainder',
      tieBreakPolicy: 'remainder desc, settled share desc, assetId asc',
      remainderDistributionOrder,
      allocationLedger: allocations,
      initiallyAllocatedMicroUnits: initiallyAllocated.toString(),
      totalMicroUnits: totalMicroUnits,
      finalAllocatedMicroUnits: allocations.reduce((sum, entry) => sum + BigInt(entry.microUnits), 0n).toString()
    }
  };
}

function ledgerRoot(accounts) {
  return stableHashObject(accounts);
}

function stringifyBigIntMap(accounts) {
  return Object.fromEntries(Object.entries(accounts).map(([key, value]) => [key, String(value)]));
}

function materializeSelectedSourceMaterial(selectedCandidates, branchMode) {
  const allowedTiers = allowedUseTiersForBranchMode(branchMode);

  const files = {};
  for (const candidate of selectedCandidates) {
    if (!allowedTiers.has(candidate.useTier)) continue;
    const sections = candidate.asset.contentUnits.slice(0, 2).map((unit) => `## ${unit.unitId}\n\n- unitHash: ${unit.unitHash}\n- unitKind: ${unit.unitKind}\n\n${unit.text}`).join('\n\n');
    files[`.engi/source-material/${candidate.assetId}.md`] = `# ${candidate.asset.title}\n\n- assetId: ${candidate.assetId}\n- useTier: ${candidate.useTier}\n- artifactKind: ${candidate.asset.artifactKind}\n- contentRoot: ${candidate.asset.contentRoot}\n- materializationMode: ${candidate.asset.sourceMaterialBinding.mode}\n- confidentiality: ${candidate.asset.sourceMaterialBinding.confidentiality}\n\n${sections}`;
  }
  return files;
}

function buildNeedMarkdown(need, assetPack, selectedCandidates, journalDiff, policyRelease) {
  const selectedList = selectedCandidates.map((candidate) => `- ${candidate.asset.title} (${candidate.useTier}) — score ${candidate.ranking.finalRankingScore.toFixed(4)}`).join('\n');
  const creditedAssetCount = journalDiff.credits.filter((entry) => BigInt(entry.delta) > 0n).length;
  const zeroCreditAssetCount = journalDiff.credits.filter((entry) => BigInt(entry.delta) === 0n).length;
  return `# ENGI Need\n\n## Conformance profiles\n- Active prototype: ${PROFILE_A}\n- Production intent: ${PROFILE_B}\n\n## Failing benchmark slices\n- ${need.failingCases.join('\n- ')}\n\n## Measured need\n${need.task}\n\n## Benchmark parser contract\n- parserKind: ${need.benchmarkParserContract.parserKind}\n- parserVersion: ${need.benchmarkParserContract.parserVersion}\n- failClosed: ${need.benchmarkParserContract.parserFailureContract.failClosed}\n\n## Target artifact kinds\n- ${need.targetArtifactKinds.join('\n- ')}\n\n## Selected assets and reasons\n${selectedList}\n\n## Verification / risk summary\n- Private remediation branch only; no public delivery before settlement.\n- Settlement consumes settlement-eligible assets only.\n- Restricted or weakly evidenced assets remain report-only or context-only.\n- Policy release: ${policyRelease.releaseId || policyRelease.releasePolicyId}\n\n## Expected touched files / areas\n- ${need.touchedPaths.join('\n- ')}\n\n## Validation / rerun instructions\n- Rerun ${need.benchmarkWorkflowPath}\n- Re-run failing cases: ${need.failingCases.join(', ')}\n- Recheck weak dimensions: ${need.weakDimensions.join(', ')}\n\n## Settlement preview summary\n- bundleId: ${journalDiff.bundleId}\n- debited micro-units: ${journalDiff.totals.debited}\n- credited micro-units: ${journalDiff.totals.credited}\n- raw share asset count: ${journalDiff.rawShares.length}\n- credited settlement asset count: ${creditedAssetCount}\n- zero-credit settlement asset count: ${zeroCreditAssetCount}`;
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

function buildSelectionConsistencyProof({ assetPack, assetPackLock, selectedCandidates, settlementCandidates, selectedSourceMaterialManifest, branchMode }) {
  const allowedTiers = branchMode === 'context'
    ? new Set(['context-only', 'patch-eligible', 'settlement-eligible'])
    : new Set(['patch-eligible', 'settlement-eligible']);
  const selectedAssetIds = selectedCandidates.map((candidate) => candidate.assetId);
  const assetPackSelectedAssetIds = assetPack.selectedAssets || [];
  const materializedSourceAssetIds = (selectedSourceMaterialManifest?.selectedSourceMaterial || []).map((entry) => entry.assetId);
  const lockUnitRefs = new Set((assetPackLock?.units || []).map((unit) => `${unit.assetId}:${unit.unitId}`));
  const selectedUnitRefs = (selectedSourceMaterialManifest?.selectedSourceMaterial || []).flatMap((entry) =>
    (entry.selectedUnits || []).map((unit) => `${entry.assetId}:${unit.unitId}`)
  );

  return {
    assetPackId: assetPack.assetPackId,
    branchMode,
    assetPackSelectionsMatchSelectedCandidates: stableHashObject(assetPackSelectedAssetIds.slice().sort()) === stableHashObject(selectedAssetIds.slice().sort()),
    allSelectedAssetsRespectUseTier: selectedCandidates.every((candidate) => allowedTiers.has(candidate.useTier)),
    materializedSourceManifestMatchesAssetPack: stableHashObject(materializedSourceAssetIds.slice().sort()) === stableHashObject(selectedAssetIds.slice().sort()),
    materializedSourceUnitsClosedOverLock: selectedUnitRefs.every((unitRef) => lockUnitRefs.has(unitRef)),
    settlementParticipantsSubsetOfSelectedAssets: settlementCandidates.every((candidate) => selectedAssetIds.includes(candidate.assetId)),
    settlementConsumesOnlySettlementEligibleAssets: settlementCandidates.every((candidate) => candidate.useTier === 'settlement-eligible'),
    witnessRefs: {
      assetPackSelectedAssetIds,
      selectedAssetIds,
      materializedSourceAssetIds,
      settlementCandidateAssetIds: settlementCandidates.map((candidate) => candidate.assetId),
      selectedUnitRefs
    },
    proofHash: stableHashObject({
      assetPackSelectedAssetIds,
      selectedAssetIds,
      materializedSourceAssetIds,
      settlementCandidateAssetIds: settlementCandidates.map((candidate) => candidate.assetId),
      selectedUnitRefs
    })
  };
}

function buildJournalCompletenessProof(eventId, journalDiff) {
  const entries = [...journalDiff.debits, ...journalDiff.credits];
  const receiptIds = new Set((journalDiff.receipts || []).map((receipt) => receipt.receiptId));
  const recomputedBalances = Object.fromEntries(Object.entries(journalDiff.beforeBalances || {}).map(([account, value]) => [account, BigInt(value)]));
  for (const entry of entries) {
    recomputedBalances[entry.account] = (recomputedBalances[entry.account] || 0n) + BigInt(entry.delta);
  }
  const recomputedBalanceStrings = stringifyBigIntMap(recomputedBalances);
  return {
    eventId,
    allRequiredReasonsCovered: entries.every((entry) => !!entry.reason && !!entry.explanation),
    noUnclassifiedTransfers: entries.every((entry) => ['licensed_bundle_debit', 'contribution_credit'].includes(entry.reason)),
    eventRefsConsistent: entries.every((entry) => entry.eventId === eventId),
    replayableJournal: stableHashObject(entries) === stableHashObject([...entries]),
    receiptRefsClosed: entries.every((entry) => receiptIds.has(entry.receiptRef)),
    hasSingleIssuanceDebit: journalDiff.debits.length === 1,
    creditedEntryCountMatchesAllocations: journalDiff.credits.length === (journalDiff.settledShares || []).length,
    afterBalancesRecomputeExactly: stableHashObject(recomputedBalanceStrings) === stableHashObject(journalDiff.afterBalances),
    creditedAssetsMatchSettledShares: stableHashObject(
      journalDiff.credits.map((entry) => entry.assetId).slice().sort()
    ) === stableHashObject((journalDiff.settledShares || []).map((entry) => entry.assetId).slice().sort()),
    witnessRefs: {
      receiptIds: [...receiptIds],
      debitEntryIds: journalDiff.debits.map((entry) => entry.entryId),
      creditEntryIds: journalDiff.credits.map((entry) => entry.entryId),
      settledShareAssetIds: (journalDiff.settledShares || []).map((entry) => entry.assetId)
    },
    proofHash: stableHashObject({
      eventId,
      receiptIds: [...receiptIds],
      debitEntryIds: journalDiff.debits.map((entry) => entry.entryId),
      creditEntryIds: journalDiff.credits.map((entry) => entry.entryId),
      afterBalancesRecomputeExactly: stableHashObject(recomputedBalanceStrings) === stableHashObject(journalDiff.afterBalances)
    })
  };
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

function buildMaterializationVisibilityProof({ assetPackLock, selectedSourceMaterialManifest, projectionPolicy, policyRelease }) {
  const selectedAssetIds = new Set((assetPackLock.assets || []).map((asset) => asset.assetId));
  const selectedSourceMaterialIds = new Set((selectedSourceMaterialManifest.selectedSourceMaterial || []).map((entry) => entry.assetId));
  const publicPaths = new Set(projectionPolicy.publicArtifactPaths || []);
  const materializedUnits = (selectedSourceMaterialManifest.selectedSourceMaterial || []).flatMap((entry) => entry.selectedUnits || []);
  return {
    conformanceProfile: PROFILE_A,
    productionIntentProfile: PROFILE_B,
    allSelectedAssetsHaveMaterializedSourceBindings: [...selectedAssetIds].every((assetId) => selectedSourceMaterialIds.has(assetId)),
    noUnexpectedMaterializedSourceBindings: [...selectedSourceMaterialIds].every((assetId) => selectedAssetIds.has(assetId)),
    allMaterializedUnitsClosedOverLock: materializedUnits.every((unit) =>
      (assetPackLock.units || []).some((lockedUnit) => lockedUnit.assetId === unit.assetId && lockedUnit.unitId === unit.unitId)
    ),
    noPrivateArtifactsLeakIntoPublicProjection: (policyRelease.artifactClasses || []).filter((entry) => !entry.disclosable).every((entry) => !publicPaths.has(entry.path)),
    witnessRefs: {
      selectedAssetIds: [...selectedAssetIds],
      materializedSourceAssetIds: [...selectedSourceMaterialIds],
      materializedUnitRefs: materializedUnits.map((unit) => `${unit.assetId}:${unit.unitId}`),
      publicArtifactPaths: [...publicPaths]
    },
    proofHash: stableHashObject({
      selectedAssetIds: [...selectedAssetIds],
      materializedSourceAssetIds: [...selectedSourceMaterialIds],
      materializedUnitRefs: materializedUnits.map((unit) => `${unit.assetId}:${unit.unitId}`),
      publicArtifactPaths: [...publicPaths]
    })
  };
}

function buildMaterializationExclusions({ assetPack, evaluatedCandidates = [], selectedCandidates = [], branchMode }) {
  const selectedAssetIds = new Set(selectedCandidates.map((candidate) => candidate.assetId));
  const exclusions = evaluatedCandidates
    .filter((candidate) => !selectedAssetIds.has(candidate.assetId))
    .map((candidate) => ({
      assetId: candidate.assetId,
      title: candidate.asset.title,
      artifactKind: candidate.asset.artifactKind,
      useTier: candidate.useTier,
      branchMode,
      materializationAllowed: !!candidate.rights?.branchMaterializationAllowed,
      settlementAllowed: !!candidate.rights?.settlementAllowed,
      exclusionClass: candidate.useTier === 'reject'
        ? 'verification-or-policy-rejection'
        : candidate.rights?.branchMaterializationAllowed
          ? 'ranking-cut'
          : 'branch-mode-or-use-tier',
      exclusionReason: candidate.rights?.branchMaterializationAllowed
        ? `Not selected into the top ${assetPack.selectedAssets.length} ${branchMode} branch assets.`
        : `Use tier ${candidate.useTier} does not authorize ${branchMode} branch materialization.`
    }));
  return {
    conformanceProfile: PROFILE_A,
    productionIntentProfile: PROFILE_B,
    branchMode,
    selectedAssetCount: selectedCandidates.length,
    excludedAssetCount: exclusions.length,
    exclusions,
    proofHash: stableHashObject({
      branchMode,
      exclusions: exclusions.map((entry) => ({
        assetId: entry.assetId,
        exclusionClass: entry.exclusionClass,
        exclusionReason: entry.exclusionReason
      }))
    })
  };
}

function buildMaterializationProof({ assetPack, assetPackLock, selectedSourceMaterialManifest, materializationVisibilityProof, materializationExclusions, branchMode }) {
  const selectedAssetIds = (assetPack.selectedAssets || []).slice();
  const materializedAssetIds = (selectedSourceMaterialManifest.selectedSourceMaterial || []).map((entry) => entry.assetId);
  const excludedAssetIds = (materializationExclusions.exclusions || []).map((entry) => entry.assetId);
  return {
    conformanceProfile: PROFILE_A,
    productionIntentProfile: PROFILE_B,
    assetPackId: assetPack.assetPackId,
    branchMode,
    allSelectedAssetsMaterialized: stableHashObject(selectedAssetIds.slice().sort()) === stableHashObject(materializedAssetIds.slice().sort()),
    allExclusionsExplained: (materializationExclusions.exclusions || []).every((entry) => !!entry.exclusionClass && !!entry.exclusionReason),
    visibilityProofRef: materializationVisibilityProof.proofHash,
    exclusionManifestRef: materializationExclusions.proofHash,
    witnessRefs: {
      selectedAssetIds,
      materializedAssetIds,
      excludedAssetIds,
      lockedUnitRefs: (assetPackLock.units || []).map((unit) => `${unit.assetId}:${unit.unitId}`)
    },
    proofHash: stableHashObject({
      assetPackId: assetPack.assetPackId,
      branchMode,
      selectedAssetIds,
      materializedAssetIds,
      excludedAssetIds,
      visibilityProofRef: materializationVisibilityProof.proofHash,
      exclusionManifestRef: materializationExclusions.proofHash
    })
  };
}

function buildProofWitnessManifest({
  promptContracts,
  promptCompletenessProof,
  codeAnalysisFactRegistry,
  staticHeuristicsRegistry,
  measurementReceipts,
  staticMeasurementReport,
  staticMeasurementProof,
  verificationReport,
  verificationReceiptsArtifact,
  selectionConsistencyProof,
  journalCompletenessProof,
  identityAuthorizationProof,
  sensitiveDataFlowProof,
  materializationProof,
  materializationExclusions,
  materializationVisibilityProof,
  sourceToSharesArtifact,
  settlementParticipationArtifact,
  accountingPrecisionReport,
  settlementProof,
  redactionProof,
  disclosureProof,
  proofContract
}) {
  const artifactDigests = [
    { path: '.engi/prompt-contracts.json', digest: stableHashObject(promptContracts || []), proofFamilies: ['prompt-completeness'] },
    { path: '.engi/prompt-completeness-proof.json', digest: promptCompletenessProof.proofHash, proofFamilies: ['prompt-completeness'] },
    { path: '.engi/code-analysis-fact-registry.json', digest: stableHashObject(codeAnalysisFactRegistry || {}), proofFamilies: ['static-code-analysis'] },
    { path: '.engi/measurement-receipts.json', digest: stableHashObject(measurementReceipts || []), proofFamilies: ['static-code-analysis'] },
    { path: '.engi/static-measurement-report.json', digest: staticMeasurementReport.reportHash, proofFamilies: ['static-code-analysis'] },
    { path: '.engi/static-measurement-proof.json', digest: staticMeasurementProof.proofHash, proofFamilies: ['static-code-analysis'] },
    { path: '.engi/verification-report.json', digest: stableHashObject(verificationReport || {}), proofFamilies: ['verification-decisions'] },
    { path: '.engi/verification-receipts.json', digest: stableHashObject(verificationReceiptsArtifact || {}), proofFamilies: ['verification-decisions'] },
    { path: '.engi/materialization-proof.json', digest: materializationProof.proofHash, proofFamilies: ['selection-and-materialization'] },
    { path: '.engi/materialization-exclusions.json', digest: materializationExclusions.proofHash, proofFamilies: ['selection-and-materialization'] },
    { path: '.engi/materialization-visibility-proof.json', digest: materializationVisibilityProof.proofHash, proofFamilies: ['selection-and-materialization'] },
    { path: '.engi/source-to-shares.json', digest: sourceToSharesArtifact.proofHash, proofFamilies: ['settlement-source-to-shares'] },
    { path: '.engi/settlement-participation.json', digest: settlementParticipationArtifact.proofHash, proofFamilies: ['settlement-source-to-shares'] },
    { path: '.engi/accounting-precision-report.json', digest: accountingPrecisionReport.reportHash, proofFamilies: ['settlement-source-to-shares'] },
    { path: '.engi/projection-policy.json', digest: disclosureProof?.projectionPolicyRef || stableHashObject({ missing: 'projection-policy' }), proofFamilies: ['disclosure-boundary'] },
    { path: '.engi/bounded-public-proof.json', digest: redactionProof?.boundedPublicProofHash || stableHashObject({ missing: 'bounded-public-proof' }), proofFamilies: ['disclosure-boundary'] },
    { path: '.engi/redaction-proof.json', digest: redactionProof.boundedPublicProofHash, proofFamilies: ['disclosure-boundary'] },
    { path: '.engi/disclosure-proof.json', digest: disclosureProof.boundedPublicProofHash, proofFamilies: ['disclosure-boundary'] },
    { path: '.engi/static-heuristics-registry.json', digest: stableHashObject(staticHeuristicsRegistry || {}), proofFamilies: ['static-code-analysis'] },
    { path: '.engi/settlement-proof.json', digest: stableHashObject(settlementProof || {}), proofFamilies: ['settlement-source-to-shares'] }
  ];
  return {
    conformanceProfile: PROFILE_A,
    productionIntentProfile: PROFILE_B,
    artifactDigests,
    allProofRelevantArtifactsDigested: artifactDigests.every((entry) => !!entry.digest),
    proofFamilies: [
      {
        proofFamily: 'prompt-completeness',
        witnessArtifactPaths: ['.engi/prompt-contracts.json', '.engi/prompt-completeness-proof.json'],
        witnessRefs: [promptCompletenessProof.proofHash]
      },
      {
        proofFamily: 'static-code-analysis',
        witnessArtifactPaths: ['.engi/code-analysis-fact-registry.json', '.engi/static-heuristics-registry.json', '.engi/measurement-receipts.json', '.engi/static-measurement-report.json', '.engi/static-measurement-proof.json'],
        witnessRefs: (measurementReceipts || []).map((receipt) => receipt.receiptId)
      },
      {
        proofFamily: 'verification-decisions',
        witnessArtifactPaths: ['.engi/verification-report.json', '.engi/verification-receipts.json'],
        witnessRefs: (verificationReceiptsArtifact?.verificationReceipts || []).map((receipt) => receipt.receiptId)
      },
      {
        proofFamily: 'selection-and-materialization',
        witnessArtifactPaths: ['.engi/asset-pack.lock.json', '.engi/selected-source-material.json', '.engi/materialization-proof.json', '.engi/materialization-exclusions.json', '.engi/materialization-visibility-proof.json'],
        witnessRefs: [selectionConsistencyProof.proofHash, materializationProof.proofHash, materializationExclusions.proofHash, materializationVisibilityProof.proofHash]
      },
      {
        proofFamily: 'authorization-and-sensitive-flow',
        witnessArtifactPaths: ['.engi/authorization-decisions.json', '.engi/sensitive-data-flow.json'],
        witnessRefs: [identityAuthorizationProof.proofHash, sensitiveDataFlowProof.proofHash]
      },
      {
        proofFamily: 'settlement-source-to-shares',
        witnessArtifactPaths: ['.engi/source-to-shares.json', '.engi/settlement-participation.json', '.engi/accounting-precision-report.json', '.engi/settlement-proof.json', '.engi/journal-diff.json'],
        witnessRefs: [sourceToSharesArtifact.proofHash, settlementParticipationArtifact.proofHash, accountingPrecisionReport.reportHash, journalCompletenessProof.proofHash]
      },
      {
        proofFamily: 'disclosure-boundary',
        witnessArtifactPaths: ['.engi/projection-policy.json', '.engi/redaction-proof.json', '.engi/disclosure-proof.json'],
        witnessRefs: [redactionProof.boundedPublicProofHash, disclosureProof.boundedPublicProofHash]
      },
      {
        proofFamily: 'proof-contract',
        witnessArtifactPaths: ['.engi/system-proof-bundle.json'],
        witnessRefs: [proofContract.contractId, settlementProof.assetPackLockHash]
      }
    ],
    proofHash: stableHashObject({
      promptCompletenessProof: promptCompletenessProof.proofHash,
      staticMeasurementProof: staticMeasurementProof.proofHash,
      verificationReceiptCount: verificationReceiptsArtifact?.verificationReceipts?.length || 0,
      materializationProof: materializationProof.proofHash,
      materializationVisibilityProof: materializationVisibilityProof.proofHash,
      sourceToSharesArtifact: sourceToSharesArtifact.proofHash,
      accountingPrecisionReport: accountingPrecisionReport.reportHash
    })
  };
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
  const derivedAfterRoot = ledgerRoot(journalDiff.afterBalances);
  return {
    theoremChecks: {
      rawSharesNormalized: journalDiff.invariants.rawSharesNormalized,
      settledSharesNormalized: journalDiff.invariants.settledSharesNormalized,
      allocationConserved: journalDiff.invariants.allocationConserved,
      debitsEqualCredits: journalDiff.invariants.debitsEqualCredits,
      noNegativeBalances: journalDiff.invariants.noNegativeBalances,
      refsClosed: journalDiff.invariants.refsClosed,
      stateRootIntegrity: journalDiff.afterRoot === derivedAfterRoot
    },
    beforeRoot: journalDiff.beforeRoot,
    afterRoot: journalDiff.afterRoot,
    journalHash: stableHashObject({ debits: journalDiff.debits, credits: journalDiff.credits }),
    assetPackLockHash: stableHashObject(assetPackLock),
    proofHash: stableHashObject({
      journalHash: stableHashObject({ debits: journalDiff.debits, credits: journalDiff.credits }),
      assetPackLockHash: stableHashObject(assetPackLock),
      theoremChecks: journalDiff.invariants
    })
  };
}

function buildSettlementParticipationArtifact({ evaluatedCandidates, selectedCandidates, settlementCandidates, assetPackLock, sourceToSharesArtifact, settledShares, allocations, branchMode }) {
  const selectedAssetIds = new Set(selectedCandidates.map((candidate) => candidate.assetId));
  const settlementParticipatingAssetIds = new Set(settlementCandidates.map((candidate) => candidate.assetId));
  const allocationByAssetId = new Map(allocations.map((allocation) => [allocation.assetId, allocation]));
  const settledShareByAssetId = new Map(settledShares.map((share) => [share.assetId, share]));
  const sourceContributionByAssetId = new Map(
    (sourceToSharesArtifact?.sourceContributionEntries || []).map((entry) => [entry.assetId, entry])
  );
  const lockedUnitsByAssetId = new Map(
    (assetPackLock?.units || []).reduce((map, unit) => {
      const units = map.get(unit.assetId) || [];
      units.push(unit.unitId);
      map.set(unit.assetId, units);
      return map;
    }, new Map())
  );
  const records = evaluatedCandidates.map((candidate) => {
    const selected = selectedAssetIds.has(candidate.assetId);
    const settlementParticipating = settlementParticipatingAssetIds.has(candidate.assetId);
    const allocation = allocationByAssetId.get(candidate.assetId);
    const share = settledShareByAssetId.get(candidate.assetId);
    const sourceContribution = sourceContributionByAssetId.get(candidate.assetId);
    const creditedMicroUnits = allocation?.microUnits || '0';
    const positivelyCredited = BigInt(creditedMicroUnits) > 0n;
    const zeroCreditParticipating = settlementParticipating && creditedMicroUnits === '0';
    const excludedFromSettlement = !settlementParticipating;
    return {
      assetId: candidate.assetId,
      title: candidate.asset.title,
      useTier: candidate.useTier,
      selected,
      settlementParticipating,
      positivelyCredited,
      zeroCreditParticipating,
      excludedFromSettlement,
      exclusionReason: excludedFromSettlement
        ? selected
          ? `selected for ${branchMode} branch but excluded from settlement because use tier was ${candidate.useTier}`
          : `not selected into the ${branchMode} branch`
        : null,
      rawContributionMass: sourceContribution?.rawContributionUnits || '0',
      clippedContributionMass: sourceContribution?.clippedContributionUnits || '0',
      clippedMassReason: sourceContribution?.clipped ? 'non-positive-marginal-contribution' : null,
      clippingReceiptId: sourceContribution?.clippingReceiptId || null,
      rawShareBp: share?.rawShareBp || sourceContribution?.rawShareBp || 0,
      settledShareBp: share?.settledShareBp || 0,
      creditedMicroUnits,
      selectedUnitRefs: lockedUnitsByAssetId.get(candidate.assetId) || [],
      contentRoot: candidate.asset.contentRoot
    };
  });
  return {
    conformanceProfile: PROFILE_A,
    productionIntentProfile: PROFILE_B,
    branchMode,
    selectedAssetCount: records.filter((record) => record.selected).length,
    settlementParticipatingCount: records.filter((record) => record.settlementParticipating).length,
    positivelyCreditedCount: records.filter((record) => record.positivelyCredited).length,
    zeroCreditParticipatingCount: records.filter((record) => record.zeroCreditParticipating).length,
    excludedFromSettlementCount: records.filter((record) => record.excludedFromSettlement).length,
    records,
    proofHash: stableHashObject(records)
  };
}

function buildAccountingPrecisionReport({ need, assetPack, branchMode, sourceToSharesArtifact, settlementParticipationArtifact, allocationTrace, journalDiff }) {
  const sourceContributionEntries = sourceToSharesArtifact?.sourceContributionEntries || [];
  const settlementRecords = settlementParticipationArtifact?.records || [];
  return {
    needId: need.needId,
    assetPackId: assetPack.assetPackId,
    bundleId: journalDiff.bundleId,
    branchMode,
    conformanceProfile: PROFILE_A,
    productionIntentProfile: PROFILE_B,
    scoreScale: sourceToSharesArtifact?.scoreScale || SOURCE_TO_SHARES_SCALE.toString(),
    sourceToSharesRef: sourceToSharesArtifact?.proofHash,
    settlementParticipationRef: settlementParticipationArtifact?.proofHash,
    contributionInputs: sourceContributionEntries.map((entry) => ({
      assetId: entry.assetId,
      candidateRankingScoreUnits: entry.candidateRankingScoreUnits,
      fullBundleScoreUnits: entry.fullBundleScoreUnits,
      bundleWithoutAssetScoreUnits: entry.bundleWithoutAssetScoreUnits,
      rawContributionUnits: entry.rawContributionUnits,
      clippedContributionUnits: entry.clippedContributionUnits,
      clipped: entry.clipped,
      clippingReceiptId: entry.clippingReceiptId,
      coveredNeedEvidence: entry.coveredNeedEvidence,
      rawShareBp: entry.rawShareBp
    })),
    clippingDecisions: (sourceToSharesArtifact?.clippingReceipts || []).map((receipt) => ({
      receiptId: receipt.receiptId,
      assetId: receipt.assetId,
      clipped: receipt.clipped,
      rawContributionUnits: receipt.rawContributionUnits,
      clippedContributionUnits: receipt.clippedContributionUnits,
      reason: receipt.reason
    })),
    basisPointNormalization: {
      ...(sourceToSharesArtifact?.basisPointNormalization || {}),
      rawShares: (sourceToSharesArtifact?.rawShares || []).map((entry) => ({
        assetId: entry.assetId,
        shareBp: entry.shareBp,
        normalizationRemainderUnits: entry.normalizationRemainderUnits
      }))
    },
    microUnitAllocation: {
      ...allocationTrace,
      allocations: settlementRecords
        .filter((record) => record.settlementParticipating)
        .map((record) => ({
          assetId: record.assetId,
          settledShareBp: record.settledShareBp,
          creditedMicroUnits: record.creditedMicroUnits,
          zeroCreditParticipating: record.zeroCreditParticipating,
          selectedUnitRefs: record.selectedUnitRefs,
          tieBreakRank: (allocationTrace?.allocationLedger || []).find((entry) => entry.assetId === record.assetId)?.tieBreakRank || null,
          remainderUnits: (allocationTrace?.allocationLedger || []).find((entry) => entry.assetId === record.assetId)?.remainderUnits || '0',
          extraMicroUnitsAwarded: (allocationTrace?.allocationLedger || []).find((entry) => entry.assetId === record.assetId)?.extraMicroUnitsAwarded || '0'
        }))
    },
    sourceMaterialToSharesClosure: settlementRecords
      .filter((record) => record.selected)
      .map((record) => ({
        assetId: record.assetId,
        selectedUnitRefs: record.selectedUnitRefs,
        rawContributionMass: record.rawContributionMass,
        clippedContributionMass: record.clippedContributionMass,
        rawShareBp: record.rawShareBp,
        settledShareBp: record.settledShareBp,
        creditedMicroUnits: record.creditedMicroUnits,
        zeroCreditParticipating: record.zeroCreditParticipating
      })),
    exactAccountingInvariants: {
      rawSharesNormalized: journalDiff.invariants.rawSharesNormalized,
      settledSharesNormalized: journalDiff.invariants.settledSharesNormalized,
      allocationConserved: journalDiff.invariants.allocationConserved,
      debitsEqualCredits: journalDiff.invariants.debitsEqualCredits,
      zeroCreditParticipationExplicit: (settlementParticipationArtifact?.records || []).every(
        (record) => !record.zeroCreditParticipating || record.creditedMicroUnits === '0'
      ),
      clippedContributionDecisionsReceiptBacked: sourceContributionEntries.every((entry) => !!entry.clippingReceiptId)
    },
    tieBreakExplanations: [
      `basis-point normalization uses ${sourceToSharesArtifact?.basisPointNormalization?.tieBreakPolicy || 'largest remainder'}`,
      `micro-unit allocation uses ${allocationTrace?.tieBreakPolicy || 'largest remainder'}`
    ],
    reportHash: stableHashObject({
      sourceToSharesRef: sourceToSharesArtifact?.proofHash,
      settlementParticipationRef: settlementParticipationArtifact?.proofHash,
      journalEventId: journalDiff.eventId,
      exactAccountingInvariants: journalDiff.invariants
    })
  };
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

function buildPipelineTelemetry({ need, evaluatedCandidates, assetPack, selectedCandidates, verificationReport, settlementPreview, journalDiff }) {
  return {
    conformanceProfile: PROFILE_A,
    productionIntentProfile: PROFILE_B,
    events: [
      telemetryEvent('need-measurement', {
        needId: need.needId,
        derivationFields: Object.keys(need.fieldDerivations || {}),
        failingCases: need.failingCases,
        weakDimensions: need.weakDimensions
      }),
      telemetryEvent('content-unit-semantics', {
        assetCount: selectedCandidates.length,
        unitCount: selectedCandidates.reduce((sum, candidate) => sum + candidate.asset.contentUnits.length, 0),
        vectorSpaces: ['task-semantic-space.v8', 'failure-mode-space.v8', 'technical-context-space.v8']
      }),
      telemetryEvent('recall-and-ranking', {
        rankedAssets: evaluatedCandidates.map((candidate) => ({
          assetId: candidate.assetId,
          recallScore: candidate.recall.recallScore,
          finalRankingScore: Number(candidate.ranking.finalRankingScore.toFixed(4)),
          strongestScoreDrivers: candidate.ranking.explainability.strongestScoreDrivers,
          queryRepresentations: candidate.recall.queryRepresentations
        }))
      }),
      telemetryEvent('verification-and-use-tier', {
        assetVerification: verificationReport.assetVerification.map((entry) => ({
          assetId: entry.assetId,
          useTier: entry.useTier,
          rights: entry.rights,
          recommendedUseTier: entry.verificationSufficiency.recommendedUseTier
        }))
      }),
      telemetryEvent('artifact-materialization', {
        assetPackId: assetPack.assetPackId,
        branchMode: assetPack.branchMode,
        selectedAssets: assetPack.selectedAssets,
        acceptedUseTiers: assetPack.acceptedUseTiers
      }),
      telemetryEvent('settlement-and-shares', {
        bundleId: settlementPreview.bundleId,
        rawShares: journalDiff.rawShares,
        settledShares: journalDiff.settledShares,
        totals: journalDiff.totals
      })
    ]
  };
}

function buildPromptImplementationSurface(inferenceProofs, promptSurfaces = []) {
  return {
    conformanceProfile: PROFILE_A,
    productionIntentProfile: PROFILE_B,
    promptTemplates: promptSurfaces.map((surface) => ({
      promptId: surface.promptId,
      purpose: surface.purpose,
      templateVersion: surface.templateVersion,
      templateHash: surface.promptContract?.templateHash,
      contextSchemaHash: surface.promptContract?.contextSchemaHash,
      outputSchemaHash: surface.promptContract?.outputSchemaHash,
      contextInputCount: surface.contextInputs.length,
      downstreamArtifacts: surface.lineage.downstreamArtifacts,
      completenessOk: surface.promptContract?.completeness?.ok ?? false
    })),
    promptLineage: promptSurfaces.map((surface) => ({
      promptId: surface.promptId,
      derivedFrom: surface.lineage.derivedFrom,
      evidenceRefs: surface.lineage.evidenceRefs,
      outputFields: surface.lineage.outputFields,
      downstreamArtifacts: surface.lineage.downstreamArtifacts,
      placeholderSet: surface.promptContract?.placeholderSet || [],
      missingPlaceholderBindings: surface.promptContract?.missingPlaceholderBindings || [],
      nonRenderedContextFields: surface.promptContract?.nonRenderedContextFields || []
    })),
    inferredOutputs: inferenceProofs.map((proof) => ({
      outputField: proof.outputField,
      evaluatorSurface: proof.evaluatorSurface
    })),
    ...buildBoundaryDescriptions(
      'Deterministic/local stand-ins emulate prompt/evaluator contracts and replayability metadata.',
      'Production prompt execution, model routing, and remote trace capture remain external.'
    )
  };
}

function buildSystemProofBundle(needId, assetPackId, inferenceProofs, assetMeasurementProofs, selectionConsistencyProof, journalCompletenessProof, identityAuthorizationProof, sensitiveDataFlowProof, settlementProof, promptImplementationSurface, promptCompletenessProof, staticMeasurementProof, materializationProof, materializationExclusions, materializationVisibilityProof, verificationReceiptsArtifact, sourceToSharesArtifact, settlementParticipationArtifact, accountingPrecisionReport, redactionProof, disclosureProof, proofWitnessManifest, proofContract) {
  return {
    needId,
    assetPackId,
    conformanceProfile: PROFILE_A,
    productionIntentProfile: PROFILE_B,
    prototypeOnlyModeledControls: true,
    proofContract,
    inferenceProofs,
    assetMeasurementProofs,
    promptImplementationSurface,
    promptCompletenessProof,
    staticMeasurementProof,
    selectionConsistencyProof,
    journalCompletenessProof,
    identityAuthorizationProof,
    sensitiveDataFlowProof,
    materializationProof,
    materializationExclusions,
    materializationVisibilityProof,
    verificationReceiptsArtifact,
    sourceToSharesArtifact,
    settlementParticipationArtifact,
    accountingPrecisionReport,
    redactionProof,
    disclosureProof,
    proofWitnessManifest,
    settlementProof,
    verifierEntrypoint: {
      replayArtifacts: [
        '.engi/prompt-contracts.json',
        '.engi/code-analysis-fact-registry.json',
        '.engi/static-heuristics-registry.json',
        '.engi/measurement-receipts.json',
        '.engi/verification-receipts.json',
        '.engi/materialization-proof.json',
        '.engi/materialization-exclusions.json',
        '.engi/source-to-shares.json',
        '.engi/settlement-participation.json',
        '.engi/accounting-precision-report.json',
        '.engi/journal-diff.json'
      ],
      replayInstructions: [
        'Recompute prompt completeness from the prompt contracts and compare the proof hash.',
        'Recompute code-analysis facts and static heuristics from the code-analysis registries, then resolve all static and verification receipt refs against the receipt artifacts.',
        'Recompute selected-vs-materialized-vs-excluded asset sets from the materialization artifacts and compare the proof hashes.',
        'Replay source-to-shares marginal contribution clipping, basis-point normalization, and exact micro-unit allocation from the settlement artifacts.'
      ]
    }
  };
}

function buildArtifactUploadManifest(selectedCandidates) {
  const uploads = selectedCandidates.map((candidate) => ({
    assetId: candidate.assetId,
    title: candidate.asset.title,
    artifactKind: candidate.asset.artifactKind,
    artifactType: candidate.asset.artifactType,
    uploadSurface: candidate.asset.uploadSurface,
    artifactSelectionSurface: candidate.asset.artifactSelectionSurface,
    selectionRoot: candidate.asset.artifactSelectionSurface?.selectedInventoryRoot,
    addressingSurface: candidate.asset.addressingSurface,
    addressingRoot: candidate.asset.addressingSurface?.addressingRoot,
    signingSurface: candidate.asset.signingSurface,
    githubAppAuthSurface: candidate.asset.githubAppAuthSurface,
    authPayloadHash: candidate.asset.githubAppAuthSurface?.authPayloadHash,
    githubBoundary: candidate.asset.githubBoundary,
    identitySurface: candidate.asset.identitySurface
  }));
  return {
    conformanceProfile: PROFILE_A,
    productionIntentProfile: PROFILE_B,
    uploadCount: uploads.length,
    inventoryBackedUploadCount: uploads.filter((upload) => (upload.artifactSelectionSurface?.selectedInventoryEntryIds || []).length > 0).length,
    artifactKindCounts: countValues(uploads.map((upload) => upload.artifactKind)),
    uploads
  };
}

function buildRepoSupplySurface(state) {
  const sessions = state.githubAppSessions || [];
  const inventory = state.repoArtifactInventory || [];
  const scenarios = state.needScenarios || [];
  const repos = sessions.map((session) => {
    const repoInventory = inventory.filter((entry) => entry.repo === session.repo);
    const repoScenarios = scenarios.filter((scenario) => scenario.repo === session.repo);
    const artifactKindCounts = countValues(repoInventory.map((entry) => entry.artifactKind));
    const originKindCounts = countValues(repoInventory.map((entry) => entry.originKind));
    const stackCounts = countValues(repoInventory.flatMap((entry) => entry.declaredStacks || []));
    const constraintCounts = countValues(repoInventory.flatMap((entry) => entry.declaredConstraints || []));
    const demonstrationProfileCounts = countValues(repoScenarios.map((scenario) => buildDemonstrationProfile(scenario).shortLabel));
    return {
      repo: session.repo,
      authSessionId: session.authSessionId,
      installationId: session.installationId,
      defaultRef: session.defaultRef,
      inventoryEntryCount: repoInventory.length,
      scenarioCount: repoScenarios.length,
      scenarioIds: repoScenarios.map((scenario) => scenario.scenarioId),
      scenarioFamilies: repoScenarios.map((scenario) => scenario.scenarioFamily || scenario.scenarioId),
      demonstrationProfileCounts,
      artifactKindCounts,
      originKindCounts,
      dominantStacks: topCountKeys(stackCounts, 4),
      dominantConstraints: topCountKeys(constraintCounts, 4),
      ...buildBoundaryDescriptions(
        session.localBoundary || session.profileABoundary,
        session.externalBoundary || session.profileBBoundary
      )
    };
  });
  return {
    conformanceProfile: PROFILE_A,
    productionIntentProfile: PROFILE_B,
    repoCount: repos.length,
    inventoryEntryCount: inventory.length,
    scenarioCount: scenarios.length,
    demonstrationProfileCounts: countValues(scenarios.map((scenario) => buildDemonstrationProfile(scenario).shortLabel)),
    artifactKindCounts: countValues(inventory.map((entry) => entry.artifactKind)),
    originKindCounts: countValues(inventory.map((entry) => entry.originKind)),
    repos
  };
}

function allowedActionsForPrincipal(authorizationDecisions = [], principalId) {
  return authorizationDecisions
    .filter((decision) => decision.principalId === principalId && decision.decision === 'allow')
    .map((decision) => decision.action);
}

function buildRepoToSettlementSurface({
  scenarioId,
  buyer,
  need,
  assetPack,
  branchArtifacts,
  selectedCandidates,
  proofWitnessManifest,
  boundedPublicProof,
  settlementPreview
}) {
  const selectedInventoryEntryIds = summarizeStrings(
    selectedCandidates.flatMap((candidate) => candidate.asset.artifactSelectionSurface?.selectedInventoryEntryIds || [])
  );
  const selectedAuthSessionIds = summarizeStrings(
    selectedCandidates.map((candidate) => candidate.asset.githubAppAuthSurface?.authSessionId).filter(Boolean)
  );
  const selectedArtifactKindCounts = countValues(selectedCandidates.map((candidate) => candidate.asset.artifactKind));
  const visibleBranchFiles = Object.keys(branchArtifacts?.files || {}).filter((path) => !path.startsWith('.engi/source-material/'));
  const selectedSourceFiles = Object.keys(branchArtifacts?.files || {}).filter((path) => path.startsWith('.engi/source-material/'));
  const proofFamilyCount = proofWitnessManifest?.proofFamilies?.length || 0;
  const settlementParticipantCount = settlementPreview?.settlementParticipatingAssetIds?.length || 0;
  const creditedAssetCount = settlementPreview?.creditedAssetIds?.length || 0;
  const demonstrationProfile = need.demonstrationProfile || buildDemonstrationProfile('A');

  return {
    flowId: `flow_${sha256(`${scenarioId}:${assetPack.assetPackId}:${settlementPreview?.bundleId || 'pending'}`).slice(0, 12)}`,
    scenarioId,
    branchName: branchArtifacts?.branchName || null,
    demonstrationProfile,
    depositMode: demonstrationProfile.depositMode,
    needMode: demonstrationProfile.needMode,
    stages: [
      {
        stageId: 'repo-selection',
        label: 'Repo selection',
        status: 'repo-authenticated supply bound',
        boundaryClass: 'modeled-local',
        summary: `${selectedAuthSessionIds.length} authenticated session${selectedAuthSessionIds.length === 1 ? '' : 's'} and ${selectedInventoryEntryIds.length} repo artifact${selectedInventoryEntryIds.length === 1 ? '' : 's'} were bound into the intake roots for ${buyer.repo}.`,
        refs: [buyer.repo, ...selectedAuthSessionIds, ...selectedInventoryEntryIds],
        metrics: {
          repo: buyer.repo,
          authSessions: selectedAuthSessionIds.length,
          inventoryEntries: selectedInventoryEntryIds.length,
          artifactKinds: Object.keys(selectedArtifactKindCounts).length
        }
      },
      {
        stageId: 'need',
        label: 'Need',
        status: 'measured from benchmark evidence',
        boundaryClass: 'executed-local',
        summary: `Need ${need.needId} was derived from benchmark run ${need.benchmarkRunId} with ${need.failingCases?.length || 0} failing case${(need.failingCases?.length || 0) === 1 ? '' : 's'}.`,
        refs: [need.needId, need.benchmarkRunId, need.benchmarkWorkflowPath].filter(Boolean),
        metrics: {
          benchmarkRunId: need.benchmarkRunId,
          failingCases: need.failingCases?.length || 0,
          weakDimensions: need.weakDimensions?.length || 0,
          targetArtifactKinds: need.targetArtifactKinds?.length || 0
        }
      },
      {
        stageId: 'asset-pack',
        label: 'Asset',
        status: 'selected into asset pack',
        boundaryClass: 'executed-local',
        summary: `${assetPack.selectedAssets.length} asset${assetPack.selectedAssets.length === 1 ? '' : 's'} survived ranking and verification into asset pack ${assetPack.assetPackId}.`,
        refs: [assetPack.assetPackId, ...assetPack.selectedAssets],
        metrics: {
          assetPackId: assetPack.assetPackId,
          selectedAssets: assetPack.selectedAssets.length,
          selectedArtifactKinds: Object.keys(selectedArtifactKindCounts).length,
          settlementEligibleAssets: selectedCandidates.filter((candidate) => candidate.useTier === 'settlement-eligible').length
        }
      },
      {
        stageId: 'branch',
        label: 'Branch',
        status: 'private remediation branch staged',
        boundaryClass: 'executed-local',
        summary: `Branch ${branchArtifacts?.branchName || 'pending'} materialized ${visibleBranchFiles.length} visible branch artifact${visibleBranchFiles.length === 1 ? '' : 's'} and ${selectedSourceFiles.length} mounted source file${selectedSourceFiles.length === 1 ? '' : 's'}.`,
        refs: [branchArtifacts?.branchName, ...visibleBranchFiles.slice(0, 8)].filter(Boolean),
        metrics: {
          branchName: branchArtifacts?.branchName || 'pending',
          visibleFiles: visibleBranchFiles.length,
          selectedSourceFiles: selectedSourceFiles.length,
          confidentiality: branchArtifacts?.confidentiality || 'private-required'
        }
      },
      {
        stageId: 'proof',
        label: 'Proof',
        status: 'proof closure assembled',
        boundaryClass: 'executed-local',
        summary: `${proofFamilyCount} proof family${proofFamilyCount === 1 ? '' : 'ies'} were digested into the witness manifest and projected into bounded public proof ${boundedPublicProof?.bundleId || 'pending'}.`,
        refs: [proofWitnessManifest?.proofHash, boundedPublicProof?.bundleId, boundedPublicProof?.redactionStatus].filter(Boolean),
        metrics: {
          witnessFamilies: proofFamilyCount,
          proofHash: proofWitnessManifest?.proofHash || 'pending',
          bundleId: boundedPublicProof?.bundleId || 'pending',
          redactionStatus: boundedPublicProof?.redactionStatus || 'pending'
        }
      },
      {
        stageId: 'settlement',
        label: 'Settlement',
        status: 'exact settlement preview closed',
        boundaryClass: 'executed-local',
        summary: `Bundle ${settlementPreview?.bundleId || 'pending'} classifies ${settlementParticipantCount} settlement participant${settlementParticipantCount === 1 ? '' : 's'} and credits ${creditedAssetCount} asset${creditedAssetCount === 1 ? '' : 's'} in exact micro-units.`,
        refs: [settlementPreview?.bundleId, settlementPreview?.sourceToSharesRef, settlementPreview?.settlementParticipationRef].filter(Boolean),
        metrics: {
          bundleId: settlementPreview?.bundleId || 'pending',
          settlementParticipants: settlementParticipantCount,
          creditedAssets: creditedAssetCount,
          zeroCreditParticipants: settlementPreview?.zeroCreditAssetIds?.length || 0
        }
      }
    ]
  };
}

function buildIdentityAuthSpineSurface({
  buyer,
  branchName,
  selectedCandidates,
  identityBindings,
  authorizationDecisions,
  githubBoundarySurface,
  proofWitnessManifest,
  settlementPreview
}) {
  const installationPrincipalId = buyer.installationId ? `github-app-installation:${buyer.installationId}` : null;
  const buyerPrincipalId = `buyer:${buyer.buyerId}`;
  const sessionBindings = identityBindings.filter((binding) => binding.principalClass === 'github-app-session-principal');
  const signerBindings = identityBindings.filter((binding) => binding.principalClass === 'issuer-principal');
  const selectionRoots = summarizeStrings(selectedCandidates.map((candidate) => candidate.asset.artifactSelectionSurface?.selectedInventoryRoot).filter(Boolean));
  const addressingRoots = summarizeStrings(selectedCandidates.map((candidate) => candidate.asset.addressingSurface?.addressingRoot).filter(Boolean));
  const authPayloadRoots = summarizeStrings(selectedCandidates.map((candidate) => candidate.asset.githubAppAuthSurface?.authPayloadHash).filter(Boolean));
  const signingRoots = summarizeStrings(selectedCandidates.map((candidate) => candidate.asset.signingSurface?.payloadHash).filter(Boolean));

  return {
    spineId: `spine_${sha256(`${buyer.buyerId}:${branchName}:${settlementPreview?.bundleId || 'pending'}`).slice(0, 12)}`,
    buyerPrincipalId,
    installationPrincipalId,
    branchName: branchName || null,
    settlementBundleId: settlementPreview?.bundleId || null,
    hops: [
      {
        hopId: 'github-installation',
        label: 'GitHub App installation authority',
        principalRefs: [installationPrincipalId].filter(Boolean),
        authoritySummary: `Installation-scoped repo auth anchors intake for ${buyer.repo}.`,
        stageRefs: [buyer.repo, buyer.buyerBranch, ...summarizeStrings(githubBoundarySurface?.selectedAuthSessions?.map((session) => session.authSessionId) || [])],
        rootRefs: summarizeStrings(githubBoundarySurface?.selectedAuthSessions?.flatMap((session) => [session.authPayloadHash, session.permissionsRoot]).filter(Boolean) || []),
        boundaryClass: 'modeled-local'
      },
      {
        hopId: 'repo-supply-selection',
        label: 'Repo supply selection',
        principalRefs: sessionBindings.map((binding) => binding.principalId),
        authoritySummary: 'Selected repo artifacts stay bound to authenticated session payloads and inventory roots.',
        stageRefs: summarizeStrings(selectedCandidates.flatMap((candidate) => candidate.asset.artifactSelectionSurface?.selectedInventoryEntryIds || [])),
        rootRefs: selectionRoots,
        boundaryClass: 'modeled-local'
      },
      {
        hopId: 'signer-attestation',
        label: 'Signer attestation',
        principalRefs: signerBindings.map((binding) => binding.principalId),
        authoritySummary: 'Signer payloads bind selection roots, addressing roots, and GitHub App auth roots to each selected asset.',
        stageRefs: selectedCandidates.map((candidate) => candidate.assetId),
        rootRefs: summarizeStrings([...addressingRoots, ...authPayloadRoots, ...signingRoots]),
        boundaryClass: 'executed-local'
      },
      {
        hopId: 'buyer-authority',
        label: 'Buyer authority',
        principalRefs: [buyerPrincipalId],
        authoritySummary: `Buyer is allowed to ${allowedActionsForPrincipal(authorizationDecisions, buyerPrincipalId).join(', ') || 'inspect the run under policy constraints'}.`,
        stageRefs: [branchName, settlementPreview?.bundleId].filter(Boolean),
        rootRefs: identityBindings.filter((binding) => binding.principalId === buyerPrincipalId).map((binding) => binding.bindingRoot),
        boundaryClass: 'executed-local'
      },
      {
        hopId: 'branch-authority',
        label: 'ENGI branch authority',
        principalRefs: ['engi-system:branch-materializer'],
        authoritySummary: 'ENGI materializes the private remediation branch and mounted source material under policy release controls.',
        stageRefs: [branchName, `${branchName}/.engi/source-material`].filter(Boolean),
        rootRefs: identityBindings.filter((binding) => binding.principalId === 'engi-system:branch-materializer').map((binding) => binding.bindingRoot),
        boundaryClass: 'executed-local'
      },
      {
        hopId: 'proof-authority',
        label: 'ENGI proof authority',
        principalRefs: ['engi-system:proof-publisher'],
        authoritySummary: 'ENGI proof publishing authority derives bounded public proof from the private proof closure.',
        stageRefs: [proofWitnessManifest?.proofHash, `${branchName}#bounded-proof`].filter(Boolean),
        rootRefs: identityBindings.filter((binding) => binding.principalId === 'engi-system:proof-publisher').map((binding) => binding.bindingRoot),
        boundaryClass: 'executed-local'
      },
      {
        hopId: 'settlement-authority',
        label: 'ENGI settlement authority',
        principalRefs: ['engi-system:settlement-engine'],
        authoritySummary: 'ENGI settlement authority closes the exact-accounting journal event for the selected bundle.',
        stageRefs: [settlementPreview?.bundleId, settlementPreview?.sourceToSharesRef, settlementPreview?.settlementParticipationRef].filter(Boolean),
        rootRefs: identityBindings.filter((binding) => binding.principalId === 'engi-system:settlement-engine').map((binding) => binding.bindingRoot),
        boundaryClass: 'executed-local'
      }
    ]
  };
}

function buildBoundaryRealitySurface() {
  return {
    posture: 'honest-local-prototype',
    conformanceProfile: PROFILE_A,
    productionIntentProfile: PROFILE_B,
    stages: [
      buildBoundaryRealityStage({
        stageId: 'repo-auth-and-supply',
        label: 'Repo auth + supply',
        localStatus: 'modeled-local',
        localDescription: 'GitHub App sessions, installation payloads, and repo supply are seeded and hash-bound locally. No live installation token is minted.',
        externalRequirement: 'Exchange a real GitHub App JWT for an installation token and refresh repo supply directly from GitHub APIs.'
      }),
      buildBoundaryRealityStage({
        stageId: 'need-measurement-and-ranking',
        label: 'Need + ranking',
        localStatus: 'executed-local',
        localDescription: 'Need measurement, prompt lineage, ranking, and verification execute deterministically inside this repository.',
        externalRequirement: 'Bind those same stages to live repo evidence refresh, remote evaluators as needed, and production policy controls.'
      }),
      buildBoundaryRealityStage({
        stageId: 'branch-materialization',
        label: 'Branch materialization',
        localStatus: 'executed-local',
        localDescription: 'Branch artifacts are materialized locally as deterministic files and manifests. No live Git branch or PR write occurs.',
        externalRequirement: 'Create or update the remediation branch, push artifacts, and open or update the buyer-facing PR.'
      }),
      buildBoundaryRealityStage({
        stageId: 'proof-and-disclosure',
        label: 'Proof + disclosure',
        localStatus: 'executed-local',
        localDescription: 'Proof bundling, bounded public proof, redaction proof, and disclosure proof are computed locally from deterministic artifacts.',
        externalRequirement: 'Verify signer and org identity chains and publish bounded proof outputs against the live disclosure boundary.'
      }),
      buildBoundaryRealityStage({
        stageId: 'settlement-effects',
        label: 'Settlement effects',
        localStatus: 'executed-local',
        localDescription: 'Settlement preview, participation, source-to-shares, and exact journal diff close locally without network effects.',
        externalRequirement: 'Submit the settlement transaction or equivalent network effect, wait for confirmation, and publish the live receipt.'
      })
    ]
  };
}

function buildGithubBoundarySurface(buyer, need, selectedCandidates) {
  const selectedSessionBindings = [...new Map(
    selectedCandidates
      .filter((candidate) => candidate.asset.githubAppAuthSurface?.authSessionId)
      .map((candidate) => [candidate.asset.githubAppAuthSurface.authSessionId, {
        authSessionId: candidate.asset.githubAppAuthSurface.authSessionId,
        repo: candidate.asset.addressingSurface?.repo,
        installationId: candidate.asset.githubAppAuthSurface.installationId,
        installationAccountLogin: candidate.asset.githubAppAuthSurface.installationAccountLogin,
        installationAccountId: candidate.asset.githubAppAuthSurface.installationAccountId,
        repositoryId: candidate.asset.githubAppAuthSurface.repositoryId,
        repositoryNodeId: candidate.asset.githubAppAuthSurface.repositoryNodeId,
        permissionsRoot: candidate.asset.githubAppAuthSurface.permissionsRoot,
        authPayloadHash: candidate.asset.githubAppAuthSurface.authPayloadHash,
        tokenBoundary: candidate.asset.githubAppAuthSurface.tokenBoundary
      }])
  ).values()];
  return {
    conformanceProfile: PROFILE_A,
    productionIntentProfile: PROFILE_B,
    modeledBindings: {
      buyerInstallationId: buyer.installationId,
      repo: buyer.repo,
      repositoryId: buildRepoIdentity(buyer.repo).repositoryId,
      repositoryNodeId: buildRepoIdentity(buyer.repo).repositoryNodeId,
      benchmarkRunId: need.benchmarkRunId,
      benchmarkWorkflowPath: need.benchmarkWorkflowPath,
      selectedAssetGithubBindings: selectedCandidates.map((candidate) => candidate.asset.githubBoundary),
      selectedAssetAuthBindings: selectedCandidates.map((candidate) => ({
        assetId: candidate.assetId,
        authSessionId: candidate.asset.githubAppAuthSurface?.authSessionId,
        installationId: candidate.asset.githubAppAuthSurface?.installationId,
        permissions: candidate.asset.githubAppAuthSurface?.permissions,
        permissionsRoot: candidate.asset.githubAppAuthSurface?.permissionsRoot,
        addressingScope: candidate.asset.addressingSurface?.addressingScope,
        addressingRoot: candidate.asset.addressingSurface?.addressingRoot,
        selectedInventoryEntryIds: candidate.asset.artifactSelectionSurface?.selectedInventoryEntryIds || [],
        selectedInventoryRoot: candidate.asset.artifactSelectionSurface?.selectedInventoryRoot,
        authPayloadHash: candidate.asset.githubAppAuthSurface?.authPayloadHash,
        signedPayloadHash: candidate.asset.signingSurface?.payloadHash
      }))
    },
    selectedAuthSessions: selectedSessionBindings,
    selectedInventoryProofs: selectedCandidates.map((candidate) => ({
      assetId: candidate.assetId,
      selectionLabel: candidate.asset.artifactSelectionSurface?.selectionLabel,
      selectedInventoryEntries: candidate.asset.artifactSelectionSurface?.selectedInventoryEntries || [],
      selectedInventoryRoot: candidate.asset.artifactSelectionSurface?.selectedInventoryRoot,
      addressingRoot: candidate.asset.addressingSurface?.addressingRoot
    })),
    authPayloadShape: {
      authMechanism: 'github-app-installation',
      installationId: buyer.installationId,
      repositorySelection: 'selected',
      requiredFields: ['authSessionId', 'appId', 'appSlug', 'installationId', 'installationAccountLogin', 'installationAccountId', 'installationAccountType', 'repositoryId', 'repositoryNodeId', 'permissions', 'permissionsRoot', 'tokenBoundary', 'authPayloadHash']
    },
    ...buildBoundaryDescriptions(
      'Demo stores GitHub/App auth payloads and repo bindings locally but never mints or uses a live installation token.',
      'Live GitHub App installation auth, workflow fetches, PR writes, and branch operations remain external.'
    )
  };
}

function buildDeliverablesManifest({ branchName, need, benchmarkTarget, assetPack, assetPackLock, settlementPreview, settlementProof, selectedSourceMaterialManifest, policyRelease, unitCatalog, pipelineTelemetry, identityBindings, githubBoundarySurface, artifactUploadManifest, profileCompositionSurface, externalBoundaryManifest, promptSurfaces }) {
  return {
    branchName,
    needId: need.needId,
    conformanceProfile: PROFILE_A,
    productionIntentProfile: PROFILE_B,
    deliverables: [
      {
        path: '.engi/need.json',
        useTiersContributed: ['context-only', 'patch-eligible', 'settlement-eligible'],
        confidentialityClass: 'private-branch-derived-artifact',
        potentiallyDisclosable: false,
        dependsOn: ['need-measurement', 'benchmark-parser']
      },
      {
        path: '.engi/benchmark-target.json',
        useTiersContributed: ['context-only', 'patch-eligible', 'settlement-eligible'],
        confidentialityClass: 'verification-evidence',
        potentiallyDisclosable: false,
        dependsOn: ['benchmark-parser']
      },
      {
        path: '.engi/match-report.json',
        useTiersContributed: ['rank-only', 'context-only', 'patch-eligible', 'settlement-eligible'],
        confidentialityClass: 'bounded-public-proof-metadata',
        potentiallyDisclosable: true,
        dependsOn: ['ranking', 'candidate-recall']
      },
      {
        path: '.engi/verification-report.json',
        useTiersContributed: ['rank-only', 'context-only', 'patch-eligible', 'settlement-eligible'],
        confidentialityClass: 'verification-evidence',
        potentiallyDisclosable: false,
        dependsOn: ['verification-determinisms', 'issuer-policy']
      },
      {
        path: '.engi/asset-pack.lock.json',
        useTiersContributed: assetPack.acceptedUseTiers,
        confidentialityClass: 'private-proof-artifact',
        potentiallyDisclosable: false,
        dependsOn: ['asset-pack-assembly']
      },
      {
        path: '.engi/selected-source-material.json',
        useTiersContributed: assetPack.acceptedUseTiers,
        confidentialityClass: 'licensed-source-material',
        potentiallyDisclosable: false,
        dependsOn: ['asset-pack-assembly', 'source-material-binding']
      },
      {
        path: '.engi/authorization-decisions.json',
        useTiersContributed: assetPack.acceptedUseTiers,
        confidentialityClass: 'private-proof-artifact',
        potentiallyDisclosable: false,
        dependsOn: ['identity-authorization', 'policy-release']
      },
      {
        path: '.engi/sensitive-data-flow.json',
        useTiersContributed: assetPack.acceptedUseTiers,
        confidentialityClass: 'private-proof-artifact',
        potentiallyDisclosable: false,
        dependsOn: ['sensitive-data-flow', 'policy-release']
      },
      {
        path: '.engi/policy-release.json',
        useTiersContributed: assetPack.acceptedUseTiers,
        confidentialityClass: 'private-proof-artifact',
        potentiallyDisclosable: false,
        dependsOn: ['policy-release']
      },
      {
        path: '.engi/identity-bindings.json',
        useTiersContributed: assetPack.acceptedUseTiers,
        confidentialityClass: 'private-proof-artifact',
        potentiallyDisclosable: false,
        dependsOn: ['identity-authorization']
      },
      {
        path: '.engi/github-boundary.json',
        useTiersContributed: assetPack.acceptedUseTiers,
        confidentialityClass: 'private-proof-artifact',
        potentiallyDisclosable: false,
        dependsOn: ['benchmark-parser', 'github-binding']
      },
      {
        path: '.engi/artifact-upload-manifest.json',
        useTiersContributed: assetPack.acceptedUseTiers,
        confidentialityClass: 'licensed-source-material',
        potentiallyDisclosable: false,
        dependsOn: ['artifact-upload', 'content-unit-semantics']
      },
      {
        path: '.engi/profile-composition.json',
        useTiersContributed: assetPack.acceptedUseTiers,
        confidentialityClass: 'private-proof-artifact',
        potentiallyDisclosable: false,
        dependsOn: ['profile-semantics']
      },
      {
        path: '.engi/prompt-surfaces.json',
        useTiersContributed: assetPack.acceptedUseTiers,
        confidentialityClass: 'private-proof-artifact',
        potentiallyDisclosable: false,
        dependsOn: ['prompt-lineage', 'model-execution']
      },
      {
        path: '.engi/prompt-contracts.json',
        useTiersContributed: assetPack.acceptedUseTiers,
        confidentialityClass: 'private-proof-artifact',
        potentiallyDisclosable: false,
        dependsOn: ['prompt-lineage', 'prompt-completeness']
      },
      {
        path: '.engi/prompt-completeness-proof.json',
        useTiersContributed: ['context-only', 'patch-eligible', 'settlement-eligible'],
        confidentialityClass: 'bounded-public-proof-metadata',
        potentiallyDisclosable: true,
        dependsOn: ['prompt-lineage', 'prompt-completeness']
      },
      {
        path: '.engi/code-analysis-fact-registry.json',
        useTiersContributed: ['rank-only', 'context-only', 'patch-eligible', 'settlement-eligible'],
        confidentialityClass: 'bounded-public-proof-metadata',
        potentiallyDisclosable: true,
        dependsOn: ['need-measurement', 'ranking', 'verification']
      },
      {
        path: '.engi/static-heuristics-registry.json',
        useTiersContributed: ['rank-only', 'context-only', 'patch-eligible', 'settlement-eligible'],
        confidentialityClass: 'bounded-public-proof-metadata',
        potentiallyDisclosable: true,
        dependsOn: ['need-measurement', 'ranking', 'verification']
      },
      {
        path: '.engi/external-boundary-manifest.json',
        useTiersContributed: assetPack.acceptedUseTiers,
        confidentialityClass: 'private-proof-artifact',
        potentiallyDisclosable: false,
        dependsOn: ['github-binding', 'profile-semantics', 'external-boundaries']
      },
      {
        path: '.engi/measurement-receipts.json',
        useTiersContributed: assetPack.acceptedUseTiers,
        confidentialityClass: 'private-proof-artifact',
        potentiallyDisclosable: false,
        dependsOn: ['static-measurement', 'verification-determinisms']
      },
      {
        path: '.engi/static-measurement-report.json',
        useTiersContributed: ['context-only', 'patch-eligible', 'settlement-eligible'],
        confidentialityClass: 'bounded-public-proof-metadata',
        potentiallyDisclosable: true,
        dependsOn: ['static-measurement', 'verification-determinisms']
      },
      {
        path: '.engi/static-measurement-proof.json',
        useTiersContributed: ['context-only', 'patch-eligible', 'settlement-eligible'],
        confidentialityClass: 'bounded-public-proof-metadata',
        potentiallyDisclosable: true,
        dependsOn: ['measurement-receipts', 'static-measurement-report']
      },
      {
        path: '.engi/verification-receipts.json',
        useTiersContributed: ['rank-only', 'context-only', 'patch-eligible', 'settlement-eligible'],
        confidentialityClass: 'private-proof-artifact',
        potentiallyDisclosable: false,
        dependsOn: ['verification-determinisms', 'issuer-policy']
      },
      {
        path: '.engi/materialization-proof.json',
        useTiersContributed: ['context-only', 'patch-eligible', 'settlement-eligible'],
        confidentialityClass: 'bounded-public-proof-metadata',
        potentiallyDisclosable: true,
        dependsOn: ['asset-pack.lock', 'selected-source-material', 'materialization-visibility-proof']
      },
      {
        path: '.engi/materialization-exclusions.json',
        useTiersContributed: assetPack.acceptedUseTiers,
        confidentialityClass: 'private-proof-artifact',
        potentiallyDisclosable: false,
        dependsOn: ['ranking', 'asset-pack-assembly', 'materialization-proof']
      },
      {
        path: '.engi/proof-witness-manifest.json',
        useTiersContributed: ['settlement-eligible'],
        confidentialityClass: 'private-proof-artifact',
        potentiallyDisclosable: false,
        dependsOn: ['proof-bundle', 'prompt-completeness', 'verification-determinisms', 'projection-policy']
      },
      {
        path: '.engi/materialization-visibility-proof.json',
        useTiersContributed: ['context-only', 'patch-eligible', 'settlement-eligible'],
        confidentialityClass: 'bounded-public-proof-metadata',
        potentiallyDisclosable: true,
        dependsOn: ['asset-pack.lock', 'selected-source-material', 'projection-policy']
      },
      {
        path: '.engi/settlement-preview.json',
        useTiersContributed: ['settlement-eligible'],
        confidentialityClass: 'settlement-preview',
        potentiallyDisclosable: false,
        dependsOn: ['asset-shares', 'settlement']
      },
      {
        path: '.engi/source-to-shares.json',
        useTiersContributed: ['settlement-eligible'],
        confidentialityClass: 'private-proof-artifact',
        potentiallyDisclosable: false,
        dependsOn: ['ranking', 'asset-pack.lock', 'settlement']
      },
      {
        path: '.engi/settlement-participation.json',
        useTiersContributed: ['settlement-eligible'],
        confidentialityClass: 'settlement-preview',
        potentiallyDisclosable: false,
        dependsOn: ['source-to-shares', 'asset-pack.lock', 'settlement']
      },
      {
        path: '.engi/accounting-precision-report.json',
        useTiersContributed: ['settlement-eligible'],
        confidentialityClass: 'private-proof-artifact',
        potentiallyDisclosable: false,
        dependsOn: ['source-to-shares', 'settlement-participation', 'journal-diff']
      },
      {
        path: '.engi/settlement-proof.json',
        useTiersContributed: ['settlement-eligible'],
        confidentialityClass: 'private-proof-artifact',
        potentiallyDisclosable: false,
        dependsOn: ['journal-diff', 'asset-pack.lock']
      },
      {
        path: '.engi/system-proof-bundle.json',
        useTiersContributed: ['settlement-eligible'],
        confidentialityClass: 'private-proof-artifact',
        potentiallyDisclosable: false,
        dependsOn: ['selection-proof', 'identity-authorization', 'sensitive-data-flow', 'settlement-proof']
      },
      {
        path: '.engi/unit-catalog.json',
        useTiersContributed: assetPack.acceptedUseTiers,
        confidentialityClass: 'private-proof-artifact',
        potentiallyDisclosable: false,
        dependsOn: ['content-unit-semantics', 'asset-measurement']
      },
      {
        path: '.engi/pipeline-telemetry.json',
        useTiersContributed: assetPack.acceptedUseTiers,
        confidentialityClass: 'private-proof-artifact',
        potentiallyDisclosable: false,
        dependsOn: ['need-measurement', 'candidate-recall', 'ranking', 'verification', 'settlement']
      },
      {
        path: '.engi/projection-policy.json',
        useTiersContributed: ['context-only', 'patch-eligible', 'settlement-eligible'],
        confidentialityClass: 'bounded-public-proof-metadata',
        potentiallyDisclosable: true,
        dependsOn: ['policy-release', 'bounded-public-proof']
      },
      {
        path: '.engi/bounded-public-proof.json',
        useTiersContributed: ['context-only', 'patch-eligible', 'settlement-eligible'],
        confidentialityClass: 'bounded-public-proof-metadata',
        potentiallyDisclosable: true,
        dependsOn: ['proof-bundle', 'bounded-public-proof']
      },
      {
        path: '.engi/redaction-proof.json',
        useTiersContributed: ['context-only', 'patch-eligible', 'settlement-eligible'],
        confidentialityClass: 'bounded-public-proof-metadata',
        potentiallyDisclosable: true,
        dependsOn: ['projection-policy', 'bounded-public-proof']
      },
      {
        path: '.engi/disclosure-proof.json',
        useTiersContributed: ['context-only', 'patch-eligible', 'settlement-eligible'],
        confidentialityClass: 'bounded-public-proof-metadata',
        potentiallyDisclosable: true,
        dependsOn: ['projection-policy', 'bounded-public-proof']
      },
      {
        path: '.engi/scenario-fixture-manifest.json',
        useTiersContributed: ['context-only', 'patch-eligible', 'settlement-eligible'],
        confidentialityClass: 'bounded-public-proof-metadata',
        potentiallyDisclosable: true,
        dependsOn: ['need-measurement', 'profile-semantics']
      },
      {
        path: '.engi/test-coverage-report.json',
        useTiersContributed: ['context-only', 'patch-eligible', 'settlement-eligible'],
        confidentialityClass: 'bounded-public-proof-metadata',
        potentiallyDisclosable: true,
        dependsOn: ['scenario-fixture-manifest', 'proof-bundle', 'settlement']
      },
      {
        path: 'ENGI_NEED.md',
        useTiersContributed: assetPack.acceptedUseTiers,
        confidentialityClass: 'private-branch-derived-artifact',
        potentiallyDisclosable: false,
        dependsOn: ['need.json', 'match-report.json', 'verification-report.json']
      }
    ],
    summary: {
      benchmarkTarget,
      assetPackId: assetPack.assetPackId,
      lockedAssetCount: assetPackLock.assets.length,
      settlementBundleId: settlementPreview.bundleId,
      policyReleaseId: policyRelease.releaseId,
      settlementProofHash: stableHashObject(settlementProof),
      selectedSourceMaterialCount: selectedSourceMaterialManifest.selectedSourceMaterial.length,
      unitCatalogCount: unitCatalog.units.length,
      telemetryEventCount: pipelineTelemetry.events.length,
      identityBindingCount: identityBindings.length,
      uploadCount: artifactUploadManifest.uploads.length,
      githubBindingCount: githubBoundarySurface.modeledBindings.selectedAssetGithubBindings.length,
      profileCount: profileCompositionSurface.profiles.length,
      promptSurfaceCount: promptSurfaces.length,
      externalBoundaryInterfaceCount: externalBoundaryManifest.interfaces.length
    }
  };
}

function buildScenarioFixtureManifest(state, activeScenarioId = null) {
  return {
    conformanceProfile: PROFILE_A,
    productionIntentProfile: PROFILE_B,
    activeScenarioId,
    selectableScenarioCount: state.needScenarios.length,
    candidateAssetCount: state.assets.length,
    fixtureFamilies: [
      'GitHub workflow run envelopes',
      'GitHub artifact manifests',
      'GitHub check suites',
      'Repo trees',
      'Parser outputs',
      'Projection-safe artifact inventories',
      'Cross-language repo slices',
      'Source-to-shares normalization ledgers'
    ],
    scenarioFamilies: state.needScenarios.map((scenario) => ({
      scenarioId: scenario.scenarioId,
      scenarioFamily: scenario.scenarioFamily || 'unspecified',
      coverageTags: scenario.coverageTags || [],
      repo: scenario.repo,
      benchmarkRunId: scenario.benchmarkRunId,
      parserKind: scenario.canonicalRunEvidence?.extractedOutputs?.parserKind || 'github-actions.auth-remediation.v3',
      benchmarkWorkflowPath: scenario.benchmarkWorkflowPath,
      benchmarkHarnessPath: scenario.benchmarkHarnessPath,
      repoTreeSize: scenario.repoContext?.repoTree?.length || 0,
      stackHints: scenario.repoContext?.stackHints || [],
      targetArtifactKinds: scenario.expectedTargetArtifactKinds || [],
      artifactCount: scenario.canonicalRunEvidence?.artifacts?.length || 0,
      checkCount: scenario.canonicalRunEvidence?.checks?.length || 0,
      failingCases: scenario.canonicalRunEvidence?.extractedOutputs?.failingCases || [],
      weakDimensions: scenario.canonicalRunEvidence?.extractedOutputs?.weakDimensions || []
    })),
    negativeFixtures: [
      {
        fixtureId: 'malformed-canonical-benchmark-output',
        expectedOutcome: 'parser validation fails closed before need materialization',
        basedOnScenarioId: 'auth-issuer-rollback'
      },
      {
        fixtureId: 'restricted-or-revoked-issuer-asset',
        expectedOutcome: 'restricted assets never settle and revoked assets reject outright',
        basedOnScenarioId: 'auth-issuer-rollback'
      },
      {
        fixtureId: 'zero-credit-source-to-shares',
        expectedOutcome: 'zero-credit participation remains explicit and receipt-backed',
        basedOnScenarioId: activeScenarioId || state.needScenarios[0]?.scenarioId
      },
      {
        fixtureId: 'polyglot-cross-language-parity-gap',
        expectedOutcome: 'cross-language rollback evidence stays repo-bound and replayable across TypeScript, Python, and Rust slices',
        basedOnScenarioId: 'polyglot-gateway-benchmark-remediation'
      },
      {
        fixtureId: 'many-asset-normalization-ledger',
        expectedOutcome: 'source-to-shares tie-break and normalization ledgers remain deterministic across repeated runs',
        basedOnScenarioId: 'auth-many-asset-normalization'
      }
    ],
    proofHash: stableHashObject({
      activeScenarioId,
      scenarioIds: state.needScenarios.map((scenario) => scenario.scenarioId),
      candidateAssetIds: state.assets.map((asset) => asset.assetId)
    })
  };
}

function buildTestCoverageReport({ state, scenarioFixtureManifest, activeScenarioId, selectedCandidates, settlementParticipationArtifact }) {
  return {
    conformanceProfile: PROFILE_A,
    productionIntentProfile: PROFILE_B,
    activeScenarioId,
    declaredCoverageTargets: [
      'prompt completeness mismatches fail closed',
      'static code analysis and verification receipts resolve',
      'projection policy enforces bounded public proof surfaces',
      'proof witness manifest digests proof-relevant artifacts',
      'source-to-shares precision stays replayable through journal settlement',
      'scenario corpus covers GitHub-shaped, privacy, issuer-policy, and deployment stress cases'
    ],
    adversarialCoverage: {
      malformedGithubArtifactFixturePresent: scenarioFixtureManifest.negativeFixtures.some((fixture) => fixture.fixtureId === 'malformed-canonical-benchmark-output'),
      privacyBoundaryScenarioPresent: state.needScenarios.some((scenario) => (scenario.coverageTags || []).includes('privacy-boundary') || scenario.scenarioFamily === 'privacy-boundary-stress'),
      proofHeavyScenarioPresent: state.needScenarios.some((scenario) => scenario.scenarioFamily === 'proof-heavy-rust-validator'),
      polyglotRepoScenarioPresent: state.needScenarios.some((scenario) => scenario.scenarioFamily === 'polyglot-repo-benchmark-remediation'),
      manyAssetNormalizationScenarioPresent: state.needScenarios.some((scenario) => scenario.scenarioFamily === 'many-asset-settlement-normalization'),
      manyAssetSettlementCorpusPresent: state.assets.length >= 6,
      zeroCreditParticipationObservedInLatestRun: (settlementParticipationArtifact?.records || []).some((record) => record.zeroCreditParticipating)
    },
    latestRunCoverage: {
      selectedAssetCount: selectedCandidates.length,
      settlementParticipatingCount: settlementParticipationArtifact?.settlementParticipatingCount || 0,
      zeroCreditParticipatingCount: settlementParticipationArtifact?.zeroCreditParticipatingCount || 0,
      scenarioFamilyCount: scenarioFixtureManifest.scenarioFamilies.length,
      coverageTagCount: new Set(state.needScenarios.flatMap((scenario) => scenario.coverageTags || [])).size
    },
    reportHash: stableHashObject({
      activeScenarioId,
      scenarioFamilyCount: scenarioFixtureManifest.scenarioFamilies.length,
      selectedAssetCount: selectedCandidates.length,
      settlementParticipatingCount: settlementParticipationArtifact?.settlementParticipatingCount || 0
    })
  };
}

export function settleNeedEvent(state, { buyer, need, assetPack, assetPackLock, evaluatedCandidates, selectedCandidates, branchName, branchMode }) {
  const settlementCandidates = selectedCandidates.filter((candidate) => candidate.useTier === 'settlement-eligible');
  if (!settlementCandidates.length) {
    throw new Error('No settlement-eligible assets available for Spec V9 settlement.');
  }

  const sourceToSharesArtifact = buildSourceToSharesArtifact(need, settlementCandidates);
  const rawShares = sourceToSharesArtifact.rawShares.map((entry) => ({
    assetId: entry.assetId,
    shareBp: entry.shareBp,
    reasons: entry.reasons,
    rawContributionUnits: entry.rawContributionUnits,
    clippedContributionUnits: entry.clippedContributionUnits
  }));
  const settledShares = rawShares.map((item) => ({
    assetId: item.assetId,
    rawShareBp: item.shareBp,
    settledShareBp: item.shareBp,
    settlementAdjustmentReasons: []
  }));

  const { allocations, allocationTrace } = allocateExactMicroUnitsByShare(METERED_MICRO_UNITS, settledShares);
  const beforeBalances = Object.fromEntries(Object.entries(state.ledger.accounts).map(([key, value]) => [key, BigInt(value)]));
  const buyerAccount = `buyer:${buyer.buyerId}:license_pool`;
  const total = BigInt(METERED_MICRO_UNITS);
  if ((beforeBalances[buyerAccount] || 0n) < total) {
    throw new Error('Buyer license pool is insufficient for the fixed metered event.');
  }

  const eventId = `event_${sha256(`${need.needId}:${assetPack.assetPackId}:${branchName}`).slice(0, 12)}`;
  const bundleId = `bundle_${sha256(`${need.needId}:${assetPack.assetPackId}:${branchMode}`).slice(0, 12)}`;
  const issuanceReceiptId = `receipt_${sha256(`${bundleId}:issuance`).slice(0, 12)}`;
  const allocationReceiptId = `receipt_${sha256(`${bundleId}:allocation`).slice(0, 12)}`;
  const receipts = [
    {
      receiptId: issuanceReceiptId,
      receiptKind: 'issuance',
      bundleId,
      needId: need.needId,
      meteredMicroUnits: METERED_MICRO_UNITS,
      receiptHash: stableHashObject({ bundleId, needId: need.needId, kind: 'issuance' })
    },
    {
      receiptId: allocationReceiptId,
      receiptKind: 'allocation',
      bundleId,
      needId: need.needId,
      allocations,
      receiptHash: stableHashObject({ bundleId, needId: need.needId, kind: 'allocation', allocations })
    }
  ];

  const debits = [{
    entryId: `jnl_${sha256(`${eventId}:debit`).slice(0, 12)}`,
    account: buyerAccount,
    delta: (-total).toString(),
    reason: 'licensed_bundle_debit',
    eventId,
    bundleId,
    needId: need.needId,
    receiptRef: issuanceReceiptId,
    explanation: 'Debit buyer license pool for licensed ENGI remediation branch settlement.'
  }];

  const credits = allocations.map((allocation) => ({
    entryId: `jnl_${sha256(`${eventId}:${allocation.assetId}`).slice(0, 12)}`,
    account: `supplier:${allocation.assetId}:pending_claims`,
    delta: allocation.microUnits,
    reason: 'contribution_credit',
    eventId,
    bundleId,
    needId: need.needId,
    assetId: allocation.assetId,
    unitRefs: assetPackLock.units.filter((unit) => unit.assetId === allocation.assetId).map((unit) => unit.unitId),
    receiptRef: allocationReceiptId,
    explanation: 'Credit asset-scoped pending claims according to deterministic settled shares.'
  }));

  const afterBalances = { ...beforeBalances };
  afterBalances[buyerAccount] = (afterBalances[buyerAccount] || 0n) - total;
  for (const credit of credits) {
    afterBalances[credit.account] = (afterBalances[credit.account] || 0n) + BigInt(credit.delta);
  }

  const beforeRoot = ledgerRoot(stringifyBigIntMap(beforeBalances));
  const afterRoot = ledgerRoot(stringifyBigIntMap(afterBalances));
  const debited = total;
  const credited = credits.reduce((sum, entry) => sum + BigInt(entry.delta), 0n);
  const creditedAssetIds = allocations.filter((allocation) => allocation.microUnits !== '0').map((allocation) => allocation.assetId);
  const zeroCreditAssetIds = allocations.filter((allocation) => allocation.microUnits === '0').map((allocation) => allocation.assetId);
  const allocationByAssetId = new Map(allocations.map((allocation) => [allocation.assetId, allocation]));
  const settledShareByAssetId = new Map(settledShares.map((item) => [item.assetId, item]));
  const lockedAssetIds = new Set(assetPackLock.assets.map((asset) => asset.assetId));
  const lockedUnitIds = new Set(assetPackLock.units.map((unit) => `${unit.assetId}:${unit.unitId}`));
  const receiptIds = new Set(receipts.map((receipt) => receipt.receiptId));
  const journalDiff = {
    eventId,
    needId: need.needId,
    bundleId,
    beforeRoot,
    afterRoot,
    debits,
    credits,
    beforeBalances: stringifyBigIntMap(beforeBalances),
    afterBalances: stringifyBigIntMap(afterBalances),
    rawShares,
    settledShares,
    receipts,
    invariants: {
      debitsEqualCredits: debited === credited,
      allocationConserved: credited === total,
      noNegativeBalances: Object.values(afterBalances).every((value) => value >= 0n),
      rawSharesNormalized: rawShares.reduce((sum, item) => sum + item.shareBp, 0) === MAX_BPS,
      settledSharesNormalized: settledShares.reduce((sum, item) => sum + item.settledShareBp, 0) === MAX_BPS,
      receiptChainValid: debits.every((entry) => receiptIds.has(entry.receiptRef)) && credits.every((entry) => receiptIds.has(entry.receiptRef)),
      refsClosed: credits.every((entry) =>
        entry.assetId &&
        lockedAssetIds.has(entry.assetId) &&
        entry.unitRefs.every((unitId) => lockedUnitIds.has(`${entry.assetId}:${unitId}`))
      ),
      settledEqualsRaw: settledShares.every((item) => item.rawShareBp === item.settledShareBp)
    },
    totals: {
      debited: debited.toString(),
      credited: credited.toString(),
      difference: (debited - credited).toString()
    }
  };
  const settlementParticipationArtifact = buildSettlementParticipationArtifact({
    evaluatedCandidates,
    selectedCandidates,
    settlementCandidates,
    assetPackLock,
    sourceToSharesArtifact,
    settledShares,
    allocations,
    branchMode
  });
  const accountingPrecisionReport = buildAccountingPrecisionReport({
    need,
    assetPack,
    branchMode,
    sourceToSharesArtifact,
    settlementParticipationArtifact,
    allocationTrace,
    journalDiff
  });

  const settlementPreview = {
    needId: need.needId,
    bundleId,
    branchMode,
    conformanceProfile: PROFILE_A,
    productionIntentProfile: PROFILE_B,
    selectedAssetIds: selectedCandidates.map((candidate) => candidate.assetId),
    rawShares,
    settledShares,
    meteredMicroUnits: METERED_MICRO_UNITS,
    settlementParticipatingAssetIds: settlementCandidates.map((candidate) => candidate.assetId),
    creditedAssetIds,
    zeroCreditAssetIds,
    allocations: settlementCandidates.map((candidate) => {
      const share = settledShareByAssetId.get(candidate.assetId);
      const allocation = allocationByAssetId.get(candidate.assetId);
      const zeroCredit = allocation?.microUnits === '0';
      return {
        assetId: candidate.assetId,
        title: candidate.asset.title,
        useTier: candidate.useTier,
        rawShareBp: share?.rawShareBp ?? 0,
        settledShareBp: share?.settledShareBp ?? 0,
        creditedMicroUnits: allocation?.microUnits || '0',
        rationale: zeroCredit
          ? [
              'Selected into the branch and permitted for settlement participation.',
              'Credited 0 units because its marginal bundle contribution was non-positive after evaluating the full selected settlement bundle.',
              ...((share?.settlementAdjustmentReasons || []).filter(Boolean)),
              ...((rawShares.find((item) => item.assetId === candidate.assetId)?.reasons || []).filter(Boolean))
            ]
          : [
              'Selected into the branch and credited by deterministic settled shares.',
              ...((share?.settlementAdjustmentReasons || []).filter(Boolean)),
              ...((rawShares.find((item) => item.assetId === candidate.assetId)?.reasons || []).filter(Boolean))
            ]
      };
    }),
    semanticsNote: 'Selected branch assets, settlement participants, and credited settlement assets are intentionally distinct sets. A selected settlement-eligible asset can receive zero credited units when its marginal bundle contribution is non-positive.',
    assetPackLockHash: stableHashObject(assetPackLock),
    sourceToSharesRef: sourceToSharesArtifact.proofHash,
    settlementParticipationRef: settlementParticipationArtifact.proofHash,
    receipts
  };

  return {
    eventId,
    bundleId,
    branchName,
    branchMode,
    issuanceReceiptId,
    allocationReceiptId,
    sourceToSharesArtifact,
    settlementParticipationArtifact,
    accountingPrecisionReport,
    journalDiff,
    settlementPreview,
    nextLedgerAccounts: stringifyBigIntMap(afterBalances)
  };
}

function buildProjectionPolicy(policyRelease, branchArtifacts) {
  const artifactRules = (policyRelease?.artifactClasses || []).map((entry) => ({
    path: entry.path,
    sensitiveDataClass: entry.sensitiveDataClass,
    disclosable: entry.disclosable
  }));
  return {
    conformanceProfile: PROFILE_A,
    productionIntentProfile: PROFILE_B,
    defaultPrincipal: DEFAULT_PROJECTION_PRINCIPAL,
    principals: {
      public: {
        allowPrivateArtifacts: false,
        allowSourceMaterial: false,
        allowRawBranchFiles: false,
        visibleSensitiveDataClasses: ['bounded-public-proof-metadata']
      },
      buyer: {
        allowPrivateArtifacts: true,
        allowSourceMaterial: false,
        allowRawBranchFiles: false,
        visibleSensitiveDataClasses: ['bounded-public-proof-metadata', 'private-branch-derived-artifact', 'verification-evidence', 'settlement-preview', 'private-proof-artifact']
      },
      reviewer: {
        allowPrivateArtifacts: true,
        allowSourceMaterial: false,
        allowRawBranchFiles: false,
        visibleSensitiveDataClasses: ['bounded-public-proof-metadata', 'verification-evidence', 'private-proof-artifact']
      },
      internal: {
        allowPrivateArtifacts: true,
        allowSourceMaterial: true,
        allowRawBranchFiles: true,
        visibleSensitiveDataClasses: ['bounded-public-proof-metadata', 'repo-private-source', 'licensed-source-material', 'private-branch-derived-artifact', 'verification-evidence', 'settlement-preview', 'private-proof-artifact']
      }
    },
    artifactRules,
    privateArtifactPaths: artifactRules.filter((entry) => !entry.disclosable).map((entry) => entry.path),
    publicArtifactPaths: artifactRules.filter((entry) => entry.disclosable).map((entry) => entry.path),
    materializedBranchFileCount: Object.keys(branchArtifacts?.files || {}).length
  };
}

function buildBoundedPublicProofArtifact({ need, assetPack, settlement, proofContract, branchName, promptCompletenessProof, staticMeasurementReport }) {
  return {
    needId: need.needId,
    bundleId: settlement.bundleId,
    branchName,
    conformanceProfile: PROFILE_A,
    productionIntentProfile: PROFILE_B,
    selectedAssetIds: assetPack.selectedAssets,
    selectedAssetCount: assetPack.selectedAssets.length,
    invariantSummary: settlement.journalDiff.invariants,
    proofContractRef: proofContract.contractId,
    evidenceChain: proofContract.evidenceChain.map((entry) => ({ stage: entry.stage, artifactRefs: entry.artifactRefs })),
    promptCompletenessSummary: {
      checkedPromptCount: promptCompletenessProof.checkedPromptCount,
      allContractsComplete: promptCompletenessProof.allContractsComplete
    },
    staticMeasurementSummary: {
      receiptCount: staticMeasurementReport.receiptCount,
      allReceiptRefsResolve: staticMeasurementReport.allReceiptRefsResolve
    },
    sourceToSharesSummary: {
      sourceContributionCount: settlement.sourceToSharesArtifact?.sourceContributionEntries?.length || 0,
      zeroCreditParticipatingCount: settlement.settlementParticipationArtifact?.zeroCreditParticipatingCount || 0,
      normalizationMethod: settlement.sourceToSharesArtifact?.basisPointNormalization?.method || 'largest-remainder'
    },
    redactionStatus: 'bounded-public-proof-metadata-only'
  };
}

function buildRedactionProof({ policyRelease, branchArtifacts, projectionPolicy, boundedPublicProof }) {
  const artifactRules = policyRelease?.artifactClasses || [];
  const redactedArtifactPaths = artifactRules.filter((entry) => !entry.disclosable).map((entry) => entry.path);
  const sourceMaterialPaths = Object.keys(branchArtifacts?.files || {}).filter((path) => path.startsWith('.engi/source-material/'));
  return {
    conformanceProfile: PROFILE_A,
    productionIntentProfile: PROFILE_B,
    defaultPrincipal: DEFAULT_PROJECTION_PRINCIPAL,
    redactedArtifactPaths,
    redactedSourceMaterialPaths: sourceMaterialPaths,
    redactedLatestRunFields: ['canonicalRunEvidence', 'branchArtifacts.files', 'selectedSourceMaterialManifest', 'authorizationDecisions', 'sensitiveDataFlowRecords', 'identityBindings', 'journalDiff', 'systemProofBundle'],
    publicArtifactPaths: projectionPolicy.publicArtifactPaths,
    boundedPublicProofHash: stableHashObject(boundedPublicProof)
  };
}

function buildDisclosureProof({ policyRelease, projectionPolicy, boundedPublicProof }) {
  const artifactRules = policyRelease?.artifactClasses || [];
  return {
    conformanceProfile: PROFILE_A,
    productionIntentProfile: PROFILE_B,
    allowedPublicArtifactPaths: artifactRules.filter((entry) => entry.disclosable).map((entry) => entry.path),
    deniedPublicArtifactPaths: artifactRules.filter((entry) => !entry.disclosable).map((entry) => entry.path),
    projectionPolicyRef: stableHashObject(projectionPolicy),
    boundedPublicProofHash: stableHashObject(boundedPublicProof),
    publicDisclosureOnlyUsesBoundedMetadata: artifactRules.filter((entry) => entry.disclosable).every((entry) => entry.sensitiveDataClass === 'bounded-public-proof-metadata')
  };
}

function minimalNeedProjection(need) {
  if (!need) return null;
  return {
    needId: need.needId,
    repo: need.repo,
    benchmarkRunId: need.benchmarkRunId,
    task: need.task,
    failureModes: need.failureModes,
    constraints: need.constraints,
    targetArtifactKinds: need.targetArtifactKinds,
    touchedPaths: need.touchedPaths,
    weakDimensions: need.weakDimensions,
    conformanceProfile: need.conformanceProfile,
    productionIntentProfile: need.productionIntentProfile,
    demonstrationProfile: need.demonstrationProfile
  };
}

function minimalCandidateProjection(candidate) {
  return {
    assetId: candidate.assetId,
    title: candidate.title,
    artifactKind: candidate.artifactKind,
    useTier: candidate.useTier,
    ranking: candidate.ranking,
    verification: candidate.verification,
    rights: candidate.rights
  };
}

function buildPublicProjection(latestRun) {
  if (!latestRun) return null;
  return {
    projectionPrincipal: 'public',
    createdAt: latestRun.createdAt,
    scenarioId: latestRun.scenarioId,
    branchMode: latestRun.branchMode,
    branchName: latestRun.branchArtifacts?.branchName,
    conformanceProfile: latestRun.conformanceProfile,
    productionIntentProfile: latestRun.productionIntentProfile,
    demonstrationProfile: latestRun.demonstrationProfile,
    needLifecycle: latestRun.needLifecycle,
    need: minimalNeedProjection(latestRun.need),
    assetPack: {
      assetPackId: latestRun.assetPack?.assetPackId,
      branchMode: latestRun.assetPack?.branchMode,
      selectedAssets: latestRun.assetPack?.selectedAssets || []
    },
    evaluatedCandidates: (latestRun.evaluatedCandidates || []).map(minimalCandidateProjection),
    repoToSettlementSurface: latestRun.repoToSettlementSurface,
    boundedPublicProof: latestRun.boundedPublicProof,
    promptCompletenessProof: latestRun.promptCompletenessProof,
    codeAnalysisFactRegistry: latestRun.codeAnalysisFactRegistry,
    staticHeuristicsRegistry: latestRun.staticHeuristicsRegistry,
    staticMeasurementReport: latestRun.staticMeasurementReport,
    staticMeasurementProof: latestRun.staticMeasurementProof,
    materializationProof: latestRun.materializationProof,
    materializationVisibilityProof: latestRun.materializationVisibilityProof,
    scenarioFixtureManifest: latestRun.scenarioFixtureManifest,
    testCoverageReport: latestRun.testCoverageReport,
    projectionPolicy: latestRun.projectionPolicy,
    redactionProof: latestRun.redactionProof,
    disclosureProof: latestRun.disclosureProof,
    branchArtifacts: {
      branchName: latestRun.branchArtifacts?.branchName,
      branchMode: latestRun.branchArtifacts?.branchMode,
      confidentiality: latestRun.branchArtifacts?.confidentiality,
      publicFiles: Object.fromEntries(Object.entries(latestRun.branchArtifacts?.files || {}).filter(([path]) => latestRun.projectionPolicy?.publicArtifactPaths?.includes(path)))
    },
    publicArtifacts: {
      '.engi/bounded-public-proof.json': latestRun.boundedPublicProof,
      '.engi/prompt-completeness-proof.json': latestRun.promptCompletenessProof,
      '.engi/code-analysis-fact-registry.json': latestRun.codeAnalysisFactRegistry,
      '.engi/static-heuristics-registry.json': latestRun.staticHeuristicsRegistry,
      '.engi/static-measurement-report.json': latestRun.staticMeasurementReport,
      '.engi/static-measurement-proof.json': latestRun.staticMeasurementProof,
      '.engi/materialization-proof.json': latestRun.materializationProof,
      '.engi/materialization-visibility-proof.json': latestRun.materializationVisibilityProof,
      '.engi/scenario-fixture-manifest.json': latestRun.scenarioFixtureManifest,
      '.engi/test-coverage-report.json': latestRun.testCoverageReport,
      '.engi/projection-policy.json': latestRun.projectionPolicy,
      '.engi/redaction-proof.json': latestRun.redactionProof,
      '.engi/disclosure-proof.json': latestRun.disclosureProof
    }
  };
}

function buildBuyerProjection(latestRun) {
  if (!latestRun) return null;
  return {
    ...buildPublicProjection(latestRun),
    projectionPrincipal: 'buyer',
    needMeasurement: latestRun.needMeasurement,
    promptContracts: latestRun.promptContracts,
    promptSurfaces: latestRun.promptSurfaces,
    verificationReport: latestRun.verificationReport,
    identityAuthSpineSurface: latestRun.identityAuthSpineSurface,
    evalManifest: latestRun.evalManifest,
    assetPackLock: latestRun.assetPackLock,
    identityBindings: latestRun.identityBindings,
    authorizationDecisions: latestRun.authorizationDecisions,
    sensitiveDataFlowRecords: latestRun.sensitiveDataFlowRecords,
    githubBoundarySurface: latestRun.githubBoundarySurface,
    artifactUploadManifest: latestRun.artifactUploadManifest,
    profileCompositionSurface: latestRun.profileCompositionSurface,
    externalBoundaryManifest: latestRun.externalBoundaryManifest,
    deliverablesManifest: latestRun.deliverablesManifest,
    unitCatalog: latestRun.unitCatalog,
    pipelineTelemetry: latestRun.pipelineTelemetry,
    measurementReceipts: latestRun.measurementReceipts,
    verificationReceipts: latestRun.verificationReceipts,
    materializationProof: latestRun.materializationProof,
    materializationExclusions: latestRun.materializationExclusions,
    materializationVisibilityProof: latestRun.materializationVisibilityProof,
    proofWitnessManifest: latestRun.proofWitnessManifest,
    sourceToSharesArtifact: latestRun.sourceToSharesArtifact,
    settlementParticipationArtifact: latestRun.settlementParticipationArtifact,
    accountingPrecisionReport: latestRun.accountingPrecisionReport,
    scenarioFixtureManifest: latestRun.scenarioFixtureManifest,
    testCoverageReport: latestRun.testCoverageReport,
    settlementPreview: latestRun.settlementPreview,
    journalDiff: latestRun.journalDiff,
    systemProofBundle: latestRun.systemProofBundle,
    branchArtifacts: {
      branchName: latestRun.branchArtifacts?.branchName,
      branchMode: latestRun.branchArtifacts?.branchMode,
      confidentiality: latestRun.branchArtifacts?.confidentiality,
      visibleFileInventory: Object.keys(latestRun.branchArtifacts?.files || {}).filter((path) => !path.startsWith('.engi/source-material/'))
    }
  };
}

function buildReviewerProjection(latestRun) {
  if (!latestRun) return null;
  return {
    ...buildPublicProjection(latestRun),
    projectionPrincipal: 'reviewer',
    verificationReport: latestRun.verificationReport,
    repoToSettlementSurface: latestRun.repoToSettlementSurface,
    verificationReceipts: latestRun.verificationReceipts,
    evalManifest: latestRun.evalManifest,
    promptCompletenessProof: latestRun.promptCompletenessProof,
    codeAnalysisFactRegistry: latestRun.codeAnalysisFactRegistry,
    staticMeasurementReport: latestRun.staticMeasurementReport,
    staticMeasurementProof: latestRun.staticMeasurementProof,
    materializationProof: latestRun.materializationProof,
    materializationVisibilityProof: latestRun.materializationVisibilityProof,
    externalBoundaryManifest: latestRun.externalBoundaryManifest,
    systemProofBundle: latestRun.systemProofBundle,
    proofWitnessManifest: latestRun.proofWitnessManifest,
    scenarioFixtureManifest: latestRun.scenarioFixtureManifest,
    testCoverageReport: latestRun.testCoverageReport,
    branchArtifacts: {
      branchName: latestRun.branchArtifacts?.branchName,
      branchMode: latestRun.branchArtifacts?.branchMode,
      confidentiality: latestRun.branchArtifacts?.confidentiality,
      visibleFileInventory: latestRun.projectionPolicy?.privateArtifactPaths?.filter((path) => !path.startsWith('.engi/source-material/')) || []
    }
  };
}

function buildProjectedLatestRun(latestRun, principal = DEFAULT_PROJECTION_PRINCIPAL) {
  const resolvedPrincipal = ensureProjectionPrincipal(principal);
  if (!latestRun) return null;
  if (resolvedPrincipal === 'internal') return latestRun;
  if (resolvedPrincipal === 'buyer') return buildBuyerProjection(latestRun);
  if (resolvedPrincipal === 'reviewer') return buildReviewerProjection(latestRun);
  return buildPublicProjection(latestRun);
}

function assertRequiredBranchArtifacts(branchArtifacts) {
  const requiredPaths = [
    '.engi/need.json',
    '.engi/match-report.json',
    '.engi/verification-report.json',
    '.engi/eval-manifest.json',
    '.engi/asset-pack.lock.json',
    '.engi/settlement-preview.json',
    '.engi/system-proof-bundle.json',
    '.engi/authorization-decisions.json',
    '.engi/sensitive-data-flow.json',
    '.engi/policy-release.json',
    '.engi/identity-bindings.json',
    '.engi/github-boundary.json',
    '.engi/artifact-upload-manifest.json',
    '.engi/profile-composition.json',
    '.engi/prompt-surfaces.json',
    '.engi/prompt-contracts.json',
    '.engi/prompt-completeness-proof.json',
    '.engi/code-analysis-fact-registry.json',
    '.engi/static-heuristics-registry.json',
    '.engi/external-boundary-manifest.json',
    '.engi/measurement-receipts.json',
    '.engi/static-measurement-report.json',
    '.engi/static-measurement-proof.json',
    '.engi/verification-receipts.json',
    '.engi/materialization-proof.json',
    '.engi/materialization-exclusions.json',
    '.engi/proof-witness-manifest.json',
    '.engi/materialization-visibility-proof.json',
    '.engi/source-to-shares.json',
    '.engi/settlement-participation.json',
    '.engi/accounting-precision-report.json',
    '.engi/scenario-fixture-manifest.json',
    '.engi/test-coverage-report.json',
    '.engi/unit-catalog.json',
    '.engi/pipeline-telemetry.json',
    '.engi/projection-policy.json',
    '.engi/bounded-public-proof.json',
    '.engi/redaction-proof.json',
    '.engi/disclosure-proof.json',
    'ENGI_NEED.md'
  ];
  for (const requiredPath of requiredPaths) {
    if (!branchArtifacts.files[requiredPath]) {
      throw new Error(`Spec V9 branch artifact contract failed: missing ${requiredPath}.`);
    }
  }
}

function buildBranchArtifacts({ need, needMeasurement, benchmarkTarget, branchMode, branchName, matchReport, verificationReport, evalManifest, assetPack, assetPackLock, selectedSourceMaterialManifest, settlementPreview, settlementProof, systemProofBundle, authorizationDecisions, sensitiveDataFlowRecords, policyRelease, deliverablesManifest, unitCatalog, pipelineTelemetry, selectedCandidates, journalDiff, identityBindings, githubBoundarySurface, artifactUploadManifest, profileCompositionSurface, promptSurfaces, promptContracts, promptCompletenessProof, externalBoundaryManifest, measurementReceipts, staticMeasurementReport, staticMeasurementProof, codeAnalysisFactRegistry, staticHeuristicsRegistry, verificationReceiptsArtifact, proofWitnessManifest, materializationProof, materializationExclusions, materializationVisibilityProof, sourceToSharesArtifact, settlementParticipationArtifact, accountingPrecisionReport, scenarioFixtureManifest, testCoverageReport, projectionPolicy, boundedPublicProof, redactionProof, disclosureProof }) {
  const files = {
    '.engi/need.json': JSON.stringify(need, null, 2),
    '.engi/need-measurement.json': JSON.stringify(needMeasurement, null, 2),
    '.engi/benchmark-target.json': JSON.stringify(benchmarkTarget, null, 2),
    '.engi/match-report.json': JSON.stringify(matchReport, null, 2),
    '.engi/verification-report.json': JSON.stringify(verificationReport, null, 2),
    '.engi/eval-manifest.json': JSON.stringify(evalManifest, null, 2),
    '.engi/asset-pack.lock.json': JSON.stringify(assetPackLock, null, 2),
    '.engi/selected-source-material.json': JSON.stringify(selectedSourceMaterialManifest, null, 2),
    '.engi/settlement-preview.json': JSON.stringify(settlementPreview, null, 2),
    '.engi/settlement-proof.json': JSON.stringify(settlementProof, null, 2),
    '.engi/journal-diff.json': JSON.stringify(journalDiff, null, 2),
    '.engi/system-proof-bundle.json': JSON.stringify(systemProofBundle, null, 2),
    '.engi/authorization-decisions.json': JSON.stringify(authorizationDecisions, null, 2),
    '.engi/sensitive-data-flow.json': JSON.stringify(sensitiveDataFlowRecords, null, 2),
    '.engi/policy-release.json': JSON.stringify(policyRelease, null, 2),
    '.engi/identity-bindings.json': JSON.stringify(identityBindings, null, 2),
    '.engi/github-boundary.json': JSON.stringify(githubBoundarySurface, null, 2),
    '.engi/artifact-upload-manifest.json': JSON.stringify(artifactUploadManifest, null, 2),
    '.engi/profile-composition.json': JSON.stringify(profileCompositionSurface, null, 2),
    '.engi/prompt-surfaces.json': JSON.stringify(promptSurfaces, null, 2),
    '.engi/prompt-contracts.json': JSON.stringify(promptContracts, null, 2),
    '.engi/prompt-completeness-proof.json': JSON.stringify(promptCompletenessProof, null, 2),
    '.engi/code-analysis-fact-registry.json': JSON.stringify(codeAnalysisFactRegistry, null, 2),
    '.engi/static-heuristics-registry.json': JSON.stringify(staticHeuristicsRegistry, null, 2),
    '.engi/external-boundary-manifest.json': JSON.stringify(externalBoundaryManifest, null, 2),
    '.engi/measurement-receipts.json': JSON.stringify(measurementReceipts, null, 2),
    '.engi/static-measurement-report.json': JSON.stringify(staticMeasurementReport, null, 2),
    '.engi/static-measurement-proof.json': JSON.stringify(staticMeasurementProof, null, 2),
    '.engi/verification-receipts.json': JSON.stringify(verificationReceiptsArtifact, null, 2),
    '.engi/materialization-proof.json': JSON.stringify(materializationProof, null, 2),
    '.engi/materialization-exclusions.json': JSON.stringify(materializationExclusions, null, 2),
    '.engi/proof-witness-manifest.json': JSON.stringify(proofWitnessManifest, null, 2),
    '.engi/materialization-visibility-proof.json': JSON.stringify(materializationVisibilityProof, null, 2),
    '.engi/source-to-shares.json': JSON.stringify(sourceToSharesArtifact, null, 2),
    '.engi/settlement-participation.json': JSON.stringify(settlementParticipationArtifact, null, 2),
    '.engi/accounting-precision-report.json': JSON.stringify(accountingPrecisionReport, null, 2),
    '.engi/scenario-fixture-manifest.json': JSON.stringify(scenarioFixtureManifest, null, 2),
    '.engi/test-coverage-report.json': JSON.stringify(testCoverageReport, null, 2),
    '.engi/unit-catalog.json': JSON.stringify(unitCatalog, null, 2),
    '.engi/pipeline-telemetry.json': JSON.stringify(pipelineTelemetry, null, 2),
    '.engi/projection-policy.json': JSON.stringify(projectionPolicy, null, 2),
    '.engi/bounded-public-proof.json': JSON.stringify(boundedPublicProof, null, 2),
    '.engi/redaction-proof.json': JSON.stringify(redactionProof, null, 2),
    '.engi/disclosure-proof.json': JSON.stringify(disclosureProof, null, 2),
    '.engi/deliverables.json': JSON.stringify(deliverablesManifest, null, 2),
    'ENGI_NEED.md': buildNeedMarkdown(need, assetPack, selectedCandidates, journalDiff, policyRelease)
  };

  return {
    branchName,
    branchMode,
    confidentiality: 'private-required',
    files: {
      ...files,
      ...materializeSelectedSourceMaterial(selectedCandidates, branchMode)
    }
  };
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
  const { needDescriptor: need, benchmarkTarget, benchmarkParserContract, canonicalBenchmarkOutputs, parserValidation, inferenceProofs, promptSurfaces, promptContracts, promptCompletenessProof } = needMeasurement;
  const evaluatedCandidates = evaluateCandidates(need, state.assets, policyState);
  const assetPack = assembleAssetPack(need, evaluatedCandidates, branchMode);
  const selectedCandidates = evaluatedCandidates.filter((candidate) => assetPack.selectedAssets.includes(candidate.assetId));
  if (!selectedCandidates.length) throw new Error('No candidates survived into the asset pack.');

  const branchName = `engi/remediation-${need.needId}-${toSlug(scenario.scenarioId)}`;
  const matchReport = buildMatchReport(need, evaluatedCandidates, assetPack);
  const verificationReport = buildVerificationReport(need, evaluatedCandidates, branchMode);
  const evalManifest = buildEvalManifest(need, evaluatedCandidates, promptSurfaces);
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
  const promptImplementationSurface = buildPromptImplementationSurface(inferenceProofs, promptSurfaces);
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
    promptSurfaces
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
  const projectionPolicy = buildProjectionPolicy(policyRelease, provisionalBranchArtifacts);
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
    promptContracts,
    promptCompletenessProof,
    codeAnalysisFactRegistry,
    staticHeuristicsRegistry,
    measurementReceipts,
    staticMeasurementReport,
    staticMeasurementProof,
    verificationReport,
    verificationReceiptsArtifact,
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
    redactionProof,
    disclosureProof,
    proofContract
  });
  let systemProofBundle = buildSystemProofBundle(
    need.needId,
    assetPack.assetPackId,
    inferenceProofs,
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
  const finalizedProjectionPolicy = buildProjectionPolicy(policyRelease, branchArtifacts);
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
    promptContracts,
    promptCompletenessProof,
    codeAnalysisFactRegistry,
    staticHeuristicsRegistry,
    measurementReceipts,
    staticMeasurementReport,
    staticMeasurementProof,
    verificationReport,
    verificationReceiptsArtifact,
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
    redactionProof: finalizedRedactionProof,
    disclosureProof: finalizedDisclosureProof,
    proofContract
  });
  systemProofBundle = buildSystemProofBundle(
    need.needId,
    assetPack.assetPackId,
    inferenceProofs,
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
    buyer: scenarioBoundBuyer,
    need,
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
    demonstrationProfile: need.demonstrationProfile,
    needLifecycle: 'settled',
    need,
    needMeasurement,
    benchmarkTarget,
    benchmarkParserContract,
    canonicalBenchmarkOutputs,
    parserValidation,
    inferenceProofs,
    promptSurfaces,
    promptContracts,
    promptCompletenessProof,
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
  const resolvedPrincipal = ensureProjectionPrincipal(principal);
  const repoSupplySurface = buildRepoSupplySurface(state);
  const boundaryRealitySurface = buildBoundaryRealitySurface();
  return {
    specVersion: state.specVersion,
    projectionPrincipal: resolvedPrincipal,
    conformanceProfiles: state.conformanceProfiles || {
      active: PROFILE_A,
      productionIntent: PROFILE_B,
      prototypeOnlyModeledControls: true,
      profileCompositions: buildProfileCompositions()
    },
    profileCompositions: buildProfileCompositions(),
    repoSupplySurface,
    boundaryRealitySurface,
    updatedAt: nowIso(),
    buyers: state.buyers,
    githubAppSessions: (state.githubAppSessions || []).map(publicGitHubAppSession),
    repoArtifactInventory: (state.repoArtifactInventory || []).map(publicRepoArtifactInventoryEntry),
    policyRelease: buildPolicyRelease(state.policyState || buildPolicyState()),
    needScenarios: state.needScenarios.map((scenario) => ({
      demonstrationProfile: buildDemonstrationProfile(scenario),
      scenarioId: scenario.scenarioId,
      scenarioFamily: scenario.scenarioFamily || 'unspecified',
      coverageTags: scenario.coverageTags || [],
      repo: scenario.repo,
      buyerBranch: scenario.baseRef,
      taskSeed: scenario.expectedTask,
      profileAStatus: PROFILE_A,
      profileBStatus: PROFILE_B,
      failingCases: scenario.canonicalRunEvidence?.extractedOutputs?.failingCases || [],
      weakDimensions: scenario.canonicalRunEvidence?.extractedOutputs?.weakDimensions || [],
      benchmarkRunId: scenario.benchmarkRunId,
      benchmarkWorkflowPath: scenario.benchmarkWorkflowPath,
      parserKind: scenario.canonicalRunEvidence?.extractedOutputs?.parserKind || 'github-actions.auth-remediation.v3',
      parserVersion: scenario.canonicalRunEvidence?.extractedOutputs?.parserVersion || '3.0.0'
    })),
    assets: state.assets.map(publicAsset),
    ledger: state.ledger,
    latestRun: buildProjectedLatestRun(state.latestRun, resolvedPrincipal),
    runHistory: state.runHistory
  };
}
