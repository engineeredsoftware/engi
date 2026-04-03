import crypto from 'node:crypto';

export const SPEC_VERSION = 'ENGI Spec V8 deterministic local prototype';
export const DEFAULT_BRANCH_MODE = 'patch';
export const METERED_MICRO_UNITS = '100000000';
export const PROFILE_A = 'Profile A — local deterministic V8 prototype';
export const PROFILE_B = 'Profile B — GitHub/App and external production boundary';
const MAX_BPS = 10000;
const VECTOR_DIMENSIONS = 16;
const DEFAULT_MODEL_ID = 'deterministic-local-evaluator.v4';
const DEFAULT_POLICY_REF = 'policy://engi/spec-v8-demo/2026-04-03';
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

const RECALL_CHANNEL_SPECS = {
  semanticTaskSearch: { signalFamily: 'semantic/vector', determinesFrom: ['need.task', 'unit.text'], recordedOn: ['need.queryRepresentations.task', 'asset.contentUnits[].embeddings.taskVector'], vectorizedIn: 'task-semantic-space.v8', searchedBy: 'cosineSimilarity', scoredBy: 'similarity score', rankedUsage: 'needMatch.taskSemanticFit + recall fusion', downstreamUses: ['candidate recall ordering', 'need-match scoring', 'asset-pack selection'] },
  failureModeSearch: { signalFamily: 'semantic/vector', determinesFrom: ['need.failureModes', 'need.failingCases', 'unit.text', 'unit.extracted.constraints', 'unit.extracted.symbols'], recordedOn: ['need.queryRepresentations.failureModes', 'asset.contentUnits[].embeddings.failureModeVector'], vectorizedIn: 'failure-mode-space.v8', searchedBy: 'cosineSimilarity', scoredBy: 'similarity score', rankedUsage: 'needMatch.failureModeFit + benchmarkImpact.likelyImprovesFailingCases', downstreamUses: ['candidate recall ordering', 'benchmark-impact scoring', 'asset-pack coverage'] },
  technicalContextSearch: { signalFamily: 'semantic/vector', determinesFrom: ['need.touchedPaths', 'need.extractedSymbols', 'need.configKeys', 'need.stackHints', 'unit.extracted.*'], recordedOn: ['need.queryRepresentations.technicalContext', 'asset.contentUnits[].embeddings.technicalContextVector'], vectorizedIn: 'technical-context-space.v8', searchedBy: 'cosineSimilarity', scoredBy: 'similarity score', rankedUsage: 'pathFit/stackFit/context generalization', downstreamUses: ['repo-context ranking', 'benchmark generalization scoring', 'branch selection guardrails'] },
  lexicalSearch: { signalFamily: 'lexical', determinesFrom: ['tokenize(need.task/failureModes/constraints/weakDimensions)', 'tokenize(unit.text)'], recordedOn: ['need.lexicalTerms', 'unit text tokens'], vectorizedIn: null, searchedBy: 'exact token overlap', scoredBy: 'hit ratio', rankedUsage: 'support-only lexical evidence', downstreamUses: ['recall provenance', 'needMatch.lexicalSupport', 'visual explainability'] },
  symbolSearch: { signalFamily: 'symbolic', determinesFrom: ['need.extractedSymbols', 'unit.extracted.symbols'], recordedOn: ['need.extractedSymbols', 'asset.contentUnits[].extracted.symbols'], vectorizedIn: null, searchedBy: 'exact symbol intersection', scoredBy: 'binary presence', rankedUsage: 'needMatch.symbolFit + recall fusion', downstreamUses: ['subsystem alignment', 'implementation specificity', 'visual explainability'] },
  pathSearch: { signalFamily: 'path', determinesFrom: ['need.touchedPaths', 'asset.metadata.sourcePaths', 'unit.extracted.paths'], recordedOn: ['need.touchedPaths', 'asset provenance/source paths'], vectorizedIn: null, searchedBy: 'exact path intersection', scoredBy: 'binary presence', rankedUsage: 'needMatch.pathFit + repo-context linkage', downstreamUses: ['asset-pack coverage', 'benchmark impact generalization', 'penalty avoidance'] },
  configKeySearch: { signalFamily: 'config', determinesFrom: ['need.configKeys', 'unit.extracted.configKeys'], recordedOn: ['need.configKeys', 'asset.contentUnits[].extracted.configKeys'], vectorizedIn: null, searchedBy: 'exact config-key intersection', scoredBy: 'binary presence', rankedUsage: 'subsystem alignment + context linkage', downstreamUses: ['need-match scoring', 'artifact precision', 'visual explainability'] },
  artifactKindFilteredSearch: { signalFamily: 'artifact-kind/type', determinesFrom: ['need.targetArtifactKinds', 'asset.artifactKind', 'asset.artifactType'], recordedOn: ['need.targetArtifactKinds', 'asset metadata'], vectorizedIn: null, searchedBy: 'kind/type eligibility filter', scoredBy: 'binary match', rankedUsage: 'artifact kind fit + candidate filtering', downstreamUses: ['need-match scoring', 'penalty mass', 'asset-pack assembly'] }
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
    signalCounts: {
      symbols: unit.extracted.symbols.length,
      paths: unit.extracted.paths.length,
      configKeys: unit.extracted.configKeys.length,
      stackTags: unit.extracted.stackTags.length,
      constraints: unit.extracted.constraints.length
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
    throw new Error(`Spec V8 debug failure: ${name} out of range (${value}).`);
  }
  return numeric;
}

function summarizeScore(score) {
  return Number(enforceRange('score', score).toFixed(4));
}

function enforceTelemetryTrace(name, trace) {
  if (!trace || typeof trace !== 'object') {
    throw new Error(`Spec V8 debug failure: missing telemetry trace for ${name}.`);
  }
  return trace;
}

function measurementDetail({ value, mode, toolOrPromptId, evidenceRefs, explanation, unitRefs = [], measurementClass = mode === 'inferred' ? 'inferred-evaluation' : 'static-analysis', evaluatorKind = mode === 'inferred' ? 'inferred-evaluator' : 'deterministic-static-command' }) {
  return {
    value: summarizeScore(value),
    mode,
    measurementClass,
    evaluatorKind,
    toolOrPromptId,
    version: 'demo-v8.0',
    evidenceRefs: evidenceRefs.filter(Boolean),
    unitRefs,
    explanation,
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

function extractSignals(text, hints = {}) {
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
    const extracted = extractSignals(text, hints);
    const technicalContextText = [
      text,
      ...(extracted.paths || []),
      ...(extracted.configKeys || []),
      ...(extracted.stackTags || []),
      ...(extracted.constraints || [])
    ].join(' ');
    const unitKind = detectUnitKind(text);
    const embeddings = {
      taskVector: buildEmbeddingArtifact('task-semantic-space.v8', text),
      failureModeVector: buildEmbeddingArtifact('failure-mode-space.v8', [text, ...(extracted.constraints || []), ...(extracted.symbols || [])].join(' ')),
      technicalContextVector: buildEmbeddingArtifact('technical-context-space.v8', technicalContextText)
    };
    const unitHash = stableHashObject({ text });

    return {
      unitId: `${assetId}:unit-${index + 1}`,
      assetId,
      unitKind,
      text,
      extracted,
      embeddings,
      semanticInterfaces: {
        contentUnitContractVersion: 'v7',
        embeddingHandOffReady: true,
        profileAStandInEmbeddings: true,
        profileBFutureReplacementBoundary: 'replace embedding artifact values/providers without changing unit metadata contract'
      },
      measurementProvenance: [
        measurementTrace('static', 'content-unit.extract-signals.v8', [unitHash, ...extracted.paths, ...extracted.configKeys], { measurementClass: 'static-analysis', evaluatorKind: 'deterministic-static-command', standIn: false }),
        measurementTrace('hybrid', 'content-unit.embedding-standin.v8', [unitHash], { measurementClass: 'embedding-derivation', evaluatorKind: 'embedding-generator', standIn: true })
      ],
      semanticSummary: {
        tokenCount: uniqueTokens(text).length,
        embeddingSpaces: Object.values(embeddings).map((artifact) => artifact.spec.vectorSpace),
        extractedSignalCounts: {
          symbols: extracted.symbols.length,
          paths: extracted.paths.length,
          configKeys: extracted.configKeys.length,
          stackTags: extracted.stackTags.length,
          constraints: extracted.constraints.length
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
    version: 'demo-v8.0',
    evidenceRefs,
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

function buildArtifactUploadSurface(input, content, extracted, artifactKind, artifactType) {
  const visualPreview = String(input.visualPreview || input.summary || content.split(/\n\s*\n/g)[0] || content).slice(0, 320);
  return {
    uploadId: `upload_${sha256(`${input.title}:${content}`).slice(0, 12)}`,
    artifactKind,
    artifactType,
    precision: {
      kindDeterminedBy: input.artifactKind ? 'user-specified' : 'defaulted',
      typeDeterminedBy: input.artifactType ? 'user-specified' : 'kind-mapped',
      sourceSignalCounts: {
        symbols: extracted.symbols.length,
        paths: extracted.paths.length,
        configKeys: extracted.configKeys.length
      }
    },
    surfaces: [
      { surfaceId: 'visual-preview', mediaType: 'text/markdown', role: 'visual', available: !!visualPreview, valuePreview: visualPreview },
      { surfaceId: 'raw-content', mediaType: 'text/plain', role: 'raw', available: !!content, valuePreview: content.slice(0, 220) },
      { surfaceId: 'signal-summary', mediaType: 'application/json', role: 'derived', available: true, valuePreview: JSON.stringify({ symbols: extracted.symbols.length, paths: extracted.paths.length, configKeys: extracted.configKeys.length }) }
    ],
    githubBinding: {
      sourceProvider: input.sourceProvider || 'github',
      sourceRepo: input.sourceRepo || 'frontier/demo-auth',
      sourceCommit: input.sourceCommit || null,
      workflowRunId: input.workflowRunId || null,
      workflowPath: input.workflowPath || null,
      profileABoundary: 'Stored locally as modeled metadata only.',
      profileBBoundary: 'Would bind to real GitHub/App installation objects and remote fetches.'
    }
  };
}

function buildProfileCompositions() {
  return {
    activeProfile: 'A',
    demoOperatorGuidance: {
      audienceMeaning: 'Profile A means the local deterministic demo is real and inspectable today; Profile B means the production boundary contracts are explicit but intentionally not live-switched in this repo.',
      whyOnlyAIsLive: 'Switching to Profile B would imply real GitHub/App auth, remote model execution, external vector infra, signer verification, and settlement/network effects. The repo keeps those contracts explicit without faking them.',
      recommendedWalkthrough: ['Start with Profile A identity + need measurement', 'Show prompt lineage and score-group explainability', 'Open boundary manifests to explain what Profile B would hand off externally', 'Close on proof bundle + settlement invariants']
    },
    profiles: [
      {
        profileId: 'A',
        label: PROFILE_A,
        switchableInDemo: true,
        identity: { whoItIs: 'A local deterministic operator-grade demo profile running entirely inside this repository.', operatorRole: 'Use this live in demos to show measured need, prompt lineage, ranking, proof closure, and exact-accounting settlement.', audienceMeaning: 'What you are seeing is implemented here, reproducible here, and inspectable here.' },
        composition: ['local deterministic ranking', 'local stand-in embeddings', 'local policy model', 'local branch artifact materialization', 'local proof bundle + exact accounting'],
        metadata: { externalWrites: false, githubLiveCalls: false, settlementMode: 'local exact accounting demo', modelExecution: 'deterministic stand-in', vectorExecution: 'deterministic local stand-in' }
      },
      {
        profileId: 'B',
        label: PROFILE_B,
        switchableInDemo: false,
        identity: { whoItIs: 'The production-intent boundary profile that would run against live GitHub/App, model, identity, vector, and settlement systems.', operatorRole: 'Use this as the explanation surface for external hand-offs, contracts, and what the live system would do beyond the local repo.', audienceMeaning: 'This is not missing design; it is a concrete boundary contract whose implementation lives outside the local prototype.' },
        composition: ['real GitHub App auth', 'remote benchmark fetch', 'external evaluator/model routing', 'production privacy/authz enforcement', 'networked settlement + signer verification'],
        metadata: { externalWrites: true, githubLiveCalls: true, settlementMode: 'external / production boundary', modelExecution: 'remote routed execution', vectorExecution: 'external vector substrate' },
        whyNotSwitchable: 'This repo only demos Profile A deterministically; Profile B depends on external GitHub/App/runtime integrations not faked here.'
      }
    ],
    comparisonAxes: ['identity/auth', 'github binding', 'vector/evaluator execution', 'artifact materialization', 'settlement authority']
  };
}

function interpolateTemplate(template, values = {}) {
  return String(template || '').replace(/\{\{\s*([a-zA-Z0-9_.-]+)\s*\}\}/g, (_, key) => {
    const value = values[key];
    return Array.isArray(value) ? value.join(', ') : String(value ?? '');
  });
}

function buildPromptSurface({ promptId, purpose, template, values, contextInputs = [], outputFields = [], downstreamArtifacts = [], evaluatorKind = 'inferred-evaluator', modelId = DEFAULT_MODEL_ID, standIn = true }) {
  const evidenceRefs = summarizeStrings(contextInputs.flatMap((input) => input.evidenceRefs || []));
  return {
    promptId,
    purpose,
    templateVersion: 'spec-v8-demo-prompt.v1',
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
      {
        interfaceId: 'github-app-auth',
        label: 'GitHub App auth + installation context',
        status: 'modeled-local-boundary',
        profileA: { implemented: true, surface: 'modeled installation ID + repo binding only', artifactRefs: ['.engi/github-boundary.json', '.engi/external-boundary-manifest.json'] },
        profileB: { implemented: false, requiredForLive: true, contract: ['exchange app JWT for installation token', 'bind installation to buyer repo + branch permissions', 'record token expiry + scope envelope'], boundaryArtifacts: ['github.installation-binding', 'github.installation-token-envelope'] }
      },
      {
        interfaceId: 'workflow-artifact-fetch',
        label: 'Workflow artifact fetch + benchmark evidence',
        status: 'partially-localized',
        profileA: { implemented: true, surface: 'canonical run evidence is seeded locally and bound to need measurement', artifactRefs: ['.engi/need-measurement.json', '.engi/benchmark-target.json'] },
        profileB: { implemented: false, requiredForLive: true, contract: ['fetch workflow artifacts by run ID', 'verify artifact media type + digest', 'normalize benchmark outputs fail-closed'], boundaryArtifacts: ['github.workflow-fetch-request', 'github.workflow-fetch-response', 'benchmark.canonical-output-manifest'] }
      },
      {
        interfaceId: 'branch-pr-actions',
        label: 'Branch / PR / comment / review actions',
        status: 'modeled-local-boundary',
        profileA: { implemented: true, surface: 'artifacts specify intended branch outputs without live writes', artifactRefs: ['.engi/deliverables.json', '.engi/profile-composition.json'] },
        profileB: { implemented: false, requiredForLive: true, contract: ['create/update branch', 'push materialized artifacts', 'open or update PR', 'publish comments / review annotations'], boundaryArtifacts: ['github.branch-action-request', 'github.pr-action-request', 'github.review-action-request'] }
      },
      {
        interfaceId: 'model-execution',
        label: 'Prompt execution + evaluator routing',
        status: 'implemented-as-stand-in',
        profileA: { implemented: true, surface: 'deterministic stand-in evaluator and prompt replay metadata', artifactRefs: ['.engi/eval-manifest.json', '.engi/prompt-surfaces.json', '.engi/system-proof-bundle.json'] },
        profileB: { implemented: false, requiredForLive: true, contract: ['select model/provider', 'execute prompt with trace capture', 'bind output to evaluator receipt + prompt hash'], boundaryArtifacts: ['model.execution-request', 'model.execution-receipt', 'model.trace-manifest'] }
      },
      {
        interfaceId: 'vector-store',
        label: 'Embedding + vector retrieval substrate',
        status: 'implemented-as-local-stand-in',
        profileA: { implemented: true, surface: 'local deterministic vectors and recall contracts', artifactRefs: ['.engi/unit-catalog.json', '.engi/eval-manifest.json'] },
        profileB: { implemented: false, requiredForLive: true, contract: ['upsert embedding documents', 'execute filtered similarity search', 'bind vector space/version metadata'], boundaryArtifacts: ['vector.upsert-manifest', 'vector.search-request', 'vector.search-response'] }
      },
      {
        interfaceId: 'signer-verification',
        label: 'Signer / identity verification',
        status: 'modeled-local-boundary',
        profileA: { implemented: true, surface: 'modeled signer bindings, attestation checks, and policy gates', artifactRefs: ['.engi/identity-bindings.json', '.engi/verification-report.json'] },
        profileB: { implemented: false, requiredForLive: true, contract: ['resolve signer identity', 'verify attestation chain', 'bind signer to org / repo authority'], boundaryArtifacts: ['identity.resolve-request', 'identity.verification-receipt', 'signer.authority-binding'] }
      },
      {
        interfaceId: 'settlement-network-effects',
        label: 'Settlement execution + network effects',
        status: 'implemented-as-local-accounting-only',
        profileA: { implemented: true, surface: 'deterministic journal diff + exact accounting invariants', artifactRefs: ['.engi/settlement-preview.json', '.engi/settlement-proof.json', '.engi/journal-diff.json'] },
        profileB: { implemented: false, requiredForLive: true, contract: ['submit settlement transaction', 'wait for network confirmation', 'publish claim / redemption events'], boundaryArtifacts: ['settlement.execution-request', 'settlement.execution-receipt', 'settlement.network-observation'] }
      }
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
    releaseId: 'policy-release-engi-v8-demo-2026-04-03',
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
  const artifactKind = input.artifactKind || 'mixed';
  const artifactType = input.artifactType || artifactTypeForKind(artifactKind);
  const assetId = input.assetId || `asset_${toSlug(input.title)}_${sha256(`${input.author}:${input.title}:${content}`).slice(0, 10)}`;
  const extracted = extractSignals(content, {
    symbols: input.symbols,
    paths: input.sourcePaths,
    configKeys: input.configKeys,
    stackTags: [...(input.declaredStacks || []), ...(input.tags || [])],
    constraints: input.declaredConstraints
  });
  const contentUnits = splitContentUnits(assetId, content, extracted);
  const uploadSurface = buildArtifactUploadSurface(input, content, extracted, artifactKind, artifactType);
  const contentRoot = stableHashObject(contentUnits.map((unit) => unit.unitHash));
  const attestationPayload = { assetId, title: input.title, contentRoot };
  const signerAddress = input.signerAddress || `did:key:${toSlug(input.author)}`;
  const assetMeasurement = {
    assetId,
    measuredFields: {
      symbols: extracted.symbols,
      paths: input.sourcePaths || extracted.paths,
      configKeys: input.configKeys || extracted.configKeys,
      stackTags: input.declaredStacks || extracted.stackTags,
      constraints: input.declaredConstraints || extracted.constraints
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
      measurementTrace('static', 'asset.measurement.extract.v2', [contentRoot, ...(input.sourcePaths || extracted.paths)], { measurementClass: 'static-analysis', evaluatorKind: 'deterministic-static-command', standIn: false }),
      measurementTrace('hybrid', 'asset.measurement.semantic-hand-off.v8', [contentRoot, ...contentUnits.map((unit) => unit.unitHash)], { measurementClass: 'embedding-derivation', evaluatorKind: 'embedding-generator', standIn: true })
    ]
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
        signatureChecksPass: input.signatureChecksPass !== false,
        payloadHash: stableHashObject(attestationPayload),
        signedPayloadHashMatchesContentRoot: input.signedPayloadHashMatchesContentRoot !== false,
        cosignSatisfied: input.cosignSatisfied !== false,
        attestationHash: stableHashObject({ signerAddress, contentRoot })
      }
    ],
    uploadSurface,
    githubBoundary: uploadSurface.githubBinding,
    identitySurface: {
      signerAddress,
      signerClass: 'issuer-principal',
      signerSource: 'attestation',
      profileABoundary: 'Local modeled signer binding only.',
      profileBBoundary: 'Would verify real signer identity / GitHub App / org-bound authorization externally.'
    },
    provenanceBinding: {
      sourceProvider: input.sourceProvider || 'github',
      repo: input.sourceRepo || 'frontier/demo-auth',
      commit: input.sourceCommit || `demo-${sha256(assetId).slice(0, 7)}`,
      paths: input.sourcePaths || extracted.paths,
      workflowPath: input.workflowPath || '.github/workflows/benchmark.yml',
      workflowRunId: input.workflowRunId || 'gha_run_auth_001'
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
      sourceRepo: input.sourceRepo || 'frontier/demo-auth',
      sourceCommit: input.sourceCommit || `demo-${sha256(assetId).slice(0, 7)}`,
      sourcePaths: input.sourcePaths || extracted.paths,
      tags: input.tags || [],
      declaredStacks: input.declaredStacks || extracted.stackTags,
      declaredConstraints: input.declaredConstraints || extracted.constraints,
      summary: input.summary || content.slice(0, 220),
      privateContent: content,
      issuerPolicyStatus: input.issuerPolicyStatus || 'allowed'
    },
    assetMeasurement: {
      ...assetMeasurement,
      signalLifecycle: {
        determined: ['extractSignals', 'repo provenance normalization', 'artifact upload precision mapping'],
        recorded: ['assetMeasurement.measuredFields', 'contentUnits[].extracted', 'uploadSurface'],
        vectorized: ['contentUnits[].embeddings.taskVector', 'contentUnits[].embeddings.failureModeVector', 'contentUnits[].embeddings.technicalContextVector'],
        searched: buildRecallChannelContracts(),
        downstreamUses: ['recallCandidates', 'evaluateCandidates', 'assembleAssetPack', 'visual explainability']
      }
    },
    measurementProvenance: assetMeasurement.provenance
  };
}

export function buildInitialState() {
  const assets = [
    makeCandidateAsset({
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
    }),
    makeCandidateAsset({
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
    }),
    makeCandidateAsset({
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
    })
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
    version: 2,
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
    policyState,
    ledger,
    latestRun: null,
    runHistory: []
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

function repoContextStaticMeasurements(scenario, benchmarkOutputs) {
  return {
    touchedPaths: summarizeStrings(union(benchmarkOutputs.touchedPaths, scenario.repoContext?.repoTree?.filter((item) => benchmarkOutputs.touchedPaths.includes(item)) || [])),
    extractedSymbols: summarizeStrings(union(benchmarkOutputs.symbols, scenario.repoContext?.symbols || [])),
    configKeys: summarizeStrings(union(benchmarkOutputs.configKeys, scenario.repoContext?.configKeys || [])),
    stackHints: inferStackHints(scenario, benchmarkOutputs)
  };
}

export function measureNeedFromScenario(scenario) {
  const parser = buildGithubActionsBenchmarkParser();
  const canonicalBenchmarkOutputs = parser.parse(scenario.canonicalRunEvidence);
  const parserValidation = parser.validate(canonicalBenchmarkOutputs);
  if (!parserValidation.ok) {
    throw new Error(`Spec V8 parser validation failed: ${parserValidation.reasons.join('; ')}`);
  }

  const repoMeasurements = repoContextStaticMeasurements(scenario, canonicalBenchmarkOutputs);
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
      evidenceRefs: [scenario.repo, ...repoMeasurements.touchedPaths]
    }),
    stackHints: derivationRecord({
      field: 'stackHints',
      source: 'repo-context-extraction',
      evidenceRefs: [scenario.repo, ...repoMeasurements.stackHints]
    }),
    touchedPaths: derivationRecord({
      field: 'touchedPaths',
      source: canonicalBenchmarkOutputs.touchedPaths.length ? 'canonicalBenchmarkOutputs.touchedPaths + repo-context-extraction' : 'repo-context-extraction',
      evidenceRefs: [scenario.canonicalRunEvidence?.runId, ...repoMeasurements.touchedPaths]
    }),
    extractedSymbols: derivationRecord({
      field: 'extractedSymbols',
      source: canonicalBenchmarkOutputs.symbols.length ? 'canonicalBenchmarkOutputs.symbols + repo-context-extraction' : 'repo-context-extraction',
      evidenceRefs: [scenario.canonicalRunEvidence?.runId, ...repoMeasurements.extractedSymbols]
    }),
    configKeys: derivationRecord({
      field: 'configKeys',
      source: canonicalBenchmarkOutputs.configKeys.length ? 'canonicalBenchmarkOutputs.configKeys + repo-context-extraction' : 'repo-context-extraction',
      evidenceRefs: [scenario.canonicalRunEvidence?.runId, ...repoMeasurements.configKeys]
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
    inferenceProof('targetArtifactKinds', [...evidenceRefs, ...repoMeasurements.touchedPaths], 'need-measurement.target-artifact-kinds.v2')
  ];
  const promptSurfaces = [
    buildPromptSurface({
      promptId: 'need-measurement.task.v2',
      purpose: 'Synthesize the canonical engineering need statement from benchmark evidence.',
      template: 'You are measuring an ENGI remediation need for repo {{repo}} on branch {{baseRef}} after GitHub run {{benchmarkRunId}}. Failing cases: {{failingCases}}. Weak dimensions: {{weakDimensions}}. Touched paths: {{touchedPaths}}. Constraints: {{constraints}}. Produce a concise task statement that preserves rollback safety and session validity.',
      values: { repo: scenario.repo, baseRef: scenario.baseRef, benchmarkRunId: scenario.benchmarkRunId, failingCases: canonicalBenchmarkOutputs.failingCases, weakDimensions: canonicalBenchmarkOutputs.weakDimensions, touchedPaths: repoMeasurements.touchedPaths, constraints },
      contextInputs: [
        { field: 'repo', value: scenario.repo, source: 'scenario.repo', evidenceRefs: [scenario.repo], artifactBindings: ['.engi/need.json'] },
        { field: 'benchmarkRunId', value: scenario.benchmarkRunId, source: 'scenario.benchmarkRunId', evidenceRefs: [scenario.canonicalRunEvidence?.runId], artifactBindings: ['.engi/benchmark-target.json'] },
        { field: 'failingCases', value: canonicalBenchmarkOutputs.failingCases, source: 'canonicalBenchmarkOutputs.failingCases', evidenceRefs: canonicalBenchmarkOutputs.failingCases, artifactBindings: ['.engi/need-measurement.json'] },
        { field: 'weakDimensions', value: canonicalBenchmarkOutputs.weakDimensions, source: 'canonicalBenchmarkOutputs.weakDimensions', evidenceRefs: canonicalBenchmarkOutputs.weakDimensions, artifactBindings: ['.engi/need-measurement.json'] },
        { field: 'touchedPaths', value: repoMeasurements.touchedPaths, source: 'repoContextStaticMeasurements.touchedPaths', evidenceRefs: repoMeasurements.touchedPaths, artifactBindings: ['.engi/need.json', '.engi/match-report.json'] },
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
      outputFields: ['constraints'],
      downstreamArtifacts: ['.engi/need.json', '.engi/policy-release.json', '.engi/system-proof-bundle.json']
    }),
    buildPromptSurface({
      promptId: 'need-measurement.target-artifact-kinds.v2',
      purpose: 'Infer the required artifact shapes for the measured need.',
      template: 'From touched paths {{touchedPaths}}, symbols {{symbols}}, and repo context {{stackHints}}, determine which artifact kinds are needed to remediate the benchmark failures without widening scope.',
      values: { touchedPaths: repoMeasurements.touchedPaths, symbols: repoMeasurements.extractedSymbols, stackHints: repoMeasurements.stackHints },
      contextInputs: [
        { field: 'touchedPaths', value: repoMeasurements.touchedPaths, source: 'repoContextStaticMeasurements.touchedPaths', evidenceRefs: repoMeasurements.touchedPaths, artifactBindings: ['.engi/need.json'] },
        { field: 'symbols', value: repoMeasurements.extractedSymbols, source: 'repoContextStaticMeasurements.extractedSymbols', evidenceRefs: repoMeasurements.extractedSymbols, artifactBindings: ['.engi/unit-catalog.json'] },
        { field: 'stackHints', value: repoMeasurements.stackHints, source: 'inferStackHints()', evidenceRefs: repoMeasurements.stackHints, artifactBindings: ['.engi/eval-manifest.json'] }
      ],
      outputFields: ['targetArtifactKinds'],
      downstreamArtifacts: ['.engi/need.json', '.engi/artifact-upload-manifest.json']
    })
  ];
  const measurementProvenance = [
    measurementTrace('static', 'github-actions.benchmark-parser.v2', [
      scenario.canonicalRunEvidence?.runId,
      scenario.canonicalRunEvidence?.workflowPath,
      ...canonicalBenchmarkOutputs.consumedInputs.artifactNames
    ].filter(Boolean)),
    measurementTrace('static', 'github.repo-context.extract.v2', [scenario.repo, ...repoMeasurements.touchedPaths]),
    measurementTrace('inferred', 'need-measurement.task.v2', evidenceRefs),
    measurementTrace('inferred', 'need-measurement.failure-modes.v2', [...evidenceRefs, ...canonicalBenchmarkOutputs.failingCases]),
    measurementTrace('inferred', 'need-measurement.constraints.v2', [...evidenceRefs, ...canonicalBenchmarkOutputs.weakDimensions]),
    measurementTrace('inferred', 'need-measurement.target-artifact-kinds.v2', [...evidenceRefs, ...repoMeasurements.touchedPaths]),
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
    stackHints: repoMeasurements.stackHints,
    touchedPaths: repoMeasurements.touchedPaths,
    extractedSymbols: repoMeasurements.extractedSymbols,
    configKeys: repoMeasurements.configKeys,
    failingCases: canonicalBenchmarkOutputs.failingCases,
    weakDimensions: canonicalBenchmarkOutputs.weakDimensions,
    baselineMetrics: canonicalBenchmarkOutputs.baselineMetrics,
    humanPrompt: scenario.humanPrompt,
    conformanceProfile: PROFILE_A,
    productionIntentProfile: PROFILE_B,
    fieldDerivations,
    measurementProvenance,
    staticMeasurements: {
      touchedPaths: repoMeasurements.touchedPaths,
      extractedSymbols: repoMeasurements.extractedSymbols,
      configKeys: repoMeasurements.configKeys,
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
    signalLifecycle: {
      determined: {
        lexical: 'tokenize over need.task/failureModes/constraints/weakDimensions',
        symbolic: 'benchmark parser + repo-context extraction + asset unit signal extraction',
        path: 'canonical benchmark touchedPaths plus repo-context extraction',
        config: 'canonical benchmark configKeys plus repo-context extraction',
        semanticVector: 'deterministic stand-in embeddings over task/failure-mode/context texts'
      },
      recorded: {
        lexical: 'need.lexicalTerms during recall build',
        symbolic: 'need.extractedSymbols + contentUnits[].extracted.symbols',
        path: 'need.touchedPaths + asset.metadata.sourcePaths + unit.extracted.paths',
        config: 'need.configKeys + unit.extracted.configKeys',
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
    promptSurfaces
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
      const symbolHits = intersection(need.extractedSymbols, unit.extracted.symbols);
      const pathHits = intersection(need.touchedPaths, union(asset.metadata.sourcePaths || [], unit.extracted.paths));
      const configHits = intersection(need.configKeys, unit.extracted.configKeys);
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
    ...unit.extracted.symbols,
    ...unit.extracted.paths,
    ...unit.extracted.configKeys,
    ...unit.extracted.stackTags,
    ...unit.extracted.constraints
  ]);
  const matchedPaths = intersection(need.touchedPaths, asset.metadata.sourcePaths);
  const matchedMentionedPaths = intersection(need.touchedPaths, asset.contentUnits.flatMap((unit) => unit.extracted.paths));
  const sourcePathPrecision = overlapScore(need.touchedPaths, asset.metadata.sourcePaths);
  const mentionedPathSupport = overlapScore(need.touchedPaths, asset.contentUnits.flatMap((unit) => unit.extracted.paths));
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
      explanation: 'Deterministic semantic overlap over task text with recall-conditioned unit support.'
    }),
    failureModeFit: measurementDetail({
      value: failureModeFit,
      mode: 'hybrid',
      toolOrPromptId: 'ranking.need-match.failure-mode-fit.v2',
      evidenceRefs: rankingEvidenceRefs(need, asset, need.failureModes),
      unitRefs: recall?.unitIds || [],
      explanation: 'Failure-mode fit uses benchmark failing cases, weak dimensions, and recalled unit text.'
    }),
    symbolFit: measurementDetail({
      value: symbolFit,
      mode: 'static',
      toolOrPromptId: 'ranking.need-match.symbol-fit.v2',
      evidenceRefs: rankingEvidenceRefs(need, asset, need.extractedSymbols),
      unitRefs: recall?.unitIds || [],
      explanation: 'Exact or aliased symbol overlap from extracted repo symbols against asset units.'
    }),
    pathFit: measurementDetail({
      value: pathFit,
      mode: 'hybrid',
      toolOrPromptId: 'ranking.need-match.path-fit.v2',
      evidenceRefs: rankingEvidenceRefs(need, asset, need.touchedPaths),
      unitRefs: recall?.unitIds || [],
      explanation: 'Path fit blends provenance-bound source paths, mentioned paths, and subsystem alignment.'
    }),
    stackFit: measurementDetail({
      value: stackFit,
      mode: 'hybrid',
      toolOrPromptId: 'ranking.need-match.stack-fit.v2',
      evidenceRefs: rankingEvidenceRefs(need, asset, need.stackHints),
      unitRefs: recall?.unitIds || [],
      explanation: 'Stack fit normalizes declared stack hints, tags, and inferred technical context.'
    }),
    constraintFit: measurementDetail({
      value: constraintFit,
      mode: 'hybrid',
      toolOrPromptId: 'ranking.need-match.constraint-fit.v2',
      evidenceRefs: rankingEvidenceRefs(need, asset, need.constraints),
      unitRefs: recall?.unitIds || [],
      explanation: 'Constraint fit checks whether the asset preserves buyer safety and remediation constraints.'
    }),
    artifactKindFit: measurementDetail({
      value: artifactKindFit,
      mode: 'static',
      toolOrPromptId: 'ranking.need-match.artifact-kind-fit.v2',
      evidenceRefs: rankingEvidenceRefs(need, asset, need.targetArtifactKinds),
      unitRefs: recall?.unitIds || [],
      explanation: 'Artifact-kind fit keeps need match grounded in the required remediation format.'
    }),
    lexicalSupport: measurementDetail({
      value: lexicalSupport,
      mode: 'static',
      toolOrPromptId: 'ranking.need-match.lexical-support.v2',
      evidenceRefs: rankingEvidenceRefs(need, asset, uniqueTokens(need.task).slice(0, 12)),
      unitRefs: recall?.unitIds || [],
      explanation: 'Lexical support is retained as a support-only signal, never the primary rank driver.'
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
        explanation: 'Measures exact failing-case remediation likelihood against benchmark-linked cases.'
      }),
      likelyImprovesWeakDimensions: measurementDetail({
        value: likelyImprovesWeakDimensions,
        mode: 'hybrid',
        toolOrPromptId: 'ranking.benchmark-impact.weak-dimensions.v2',
        evidenceRefs: rankingEvidenceRefs(need, asset, need.weakDimensions),
        unitRefs: recall?.unitIds || [],
        explanation: 'Measures likely improvement across weak benchmark dimensions, not just single cases.'
      }),
      likelyGeneralizesToRepoContext: measurementDetail({
        value: likelyGeneralizesToRepoContext,
        mode: 'hybrid',
        toolOrPromptId: 'ranking.benchmark-impact.repo-context.v2',
        evidenceRefs: rankingEvidenceRefs(need, asset, need.touchedPaths),
        unitRefs: recall?.unitIds || [],
        explanation: 'Measures whether the candidate generalizes safely to the buyer repo context.'
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
  const implementationSpecificity = clamp01(((asset.metadata.sourcePaths?.length || 0) / 3) * 0.45 + ((asset.contentUnits.flatMap((unit) => unit.extracted.symbols).length) / 10) * 0.25 + ((asset.contentUnits.flatMap((unit) => unit.extracted.configKeys).length) / 5) * 0.30);
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
        explanation: 'Measures whether the asset presents concrete corrective steps for the measured need.'
      }),
      implementationSpecificity: measurementDetail({
        value: implementationSpecificity,
        mode: 'static',
        toolOrPromptId: 'ranking.actionability.implementation-specificity.v2',
        evidenceRefs: rankingEvidenceRefs(need, asset, asset.metadata.sourcePaths || []),
        unitRefs: recall?.unitIds || [],
        explanation: 'Measures concrete code/config surface area: paths, symbols, config keys, and test targets.'
      }),
      operationalUsability: measurementDetail({
        value: operationalUsability,
        mode: 'hybrid',
        toolOrPromptId: 'ranking.actionability.operational-usability.v2',
        evidenceRefs: rankingEvidenceRefs(need, asset, asset.verificationEvidence.reproSteps || []),
        unitRefs: recall?.unitIds || [],
        explanation: 'Measures bounded-scope usability inside a remediation branch and rerun workflow.'
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
            strongestSignals: [
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
          measurementTrace('static', 'verification.determinisms.v2', rankingEvidenceRefs(need, asset, recall.unitIds))
        ]
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
  return {
    needId: need.needId,
    conformanceProfile: PROFILE_A,
    productionIntentProfile: PROFILE_B,
    branchMode,
    assetVerification: evaluatedCandidates.map((candidate) => ({
      assetId: candidate.assetId,
      issuanceVerification: candidate.verification.issuanceVerification,
      provenanceVerification: candidate.verification.provenanceVerification,
      verificationSufficiency: candidate.verification.verificationSufficiency,
      issuerPolicyStatus: candidate.verification.issuerPolicyStatus,
      useTier: candidate.useTier,
      rights: useTierRights(candidate.useTier, branchMode)
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
    promptsVersion: 'spec-v8-demo-deterministic.v4',
    modelsUsed: [DEFAULT_MODEL_ID],
    deterministicFeatureVersion: 'spec-v8-demo-static.v4',
    evaluatorInterfaces,
    evaluatorBoundaryNotes: {
      profileA: 'Deterministic/local stand-ins satisfy the evaluator and embedding contracts for demo use.',
      profileB: 'Real embedding providers, prompt execution, and external evaluator services can replace the stand-ins without changing artifact schema.'
    },
    vectorSpaces: ['task-semantic-space.v8', 'failure-mode-space.v8', 'technical-context-space.v8'],
    promptSurfaces,
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
      sourceMaterialBinding: candidate.asset.sourceMaterialBinding
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
      confidentiality: candidate.asset.sourceMaterialBinding.confidentiality
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
      selectedUnits: candidate.asset.contentUnits.slice(0, 2).map((unit) => ({
        unitId: unit.unitId,
        unitKind: unit.unitKind,
        unitHash: unit.unitHash
      }))
    }))
  };
}

function evaluateBundleForNeed(need, candidates) {
  if (!candidates.length) return 0;
  const avgRanking = candidates.reduce((sum, candidate) => sum + candidate.ranking.finalRankingScore, 0) / candidates.length;
  const failureCoverage = ratio(new Set(candidates.flatMap((candidate) => intersection(need.failureModes, uniqueTokens(candidate.asset.metadata.privateContent)))).size, need.failureModes.length || 1);
  const constraintCoverage = ratio(new Set(candidates.flatMap((candidate) => intersection(need.constraints, candidate.asset.metadata.declaredConstraints || []))).size, need.constraints.length || 1);
  const pathCoverage = ratio(new Set(candidates.flatMap((candidate) => intersection(need.touchedPaths, candidate.asset.metadata.sourcePaths || []))).size, need.touchedPaths.length || 1);
  return clamp01((avgRanking * 0.60) + (failureCoverage * 0.20) + (constraintCoverage * 0.10) + (pathCoverage * 0.10));
}

function normalizeMassTo10000(contributions) {
  const totalMass = contributions.reduce((sum, item) => sum + item.mass, 0);
  if (!contributions.length) return [];
  if (totalMass <= 0) {
    const even = Math.floor(MAX_BPS / contributions.length);
    let used = even * contributions.length;
    const ordered = contributions.slice().sort((a, b) => a.assetId.localeCompare(b.assetId));
    return ordered.map((item, index) => ({
      assetId: item.assetId,
      shareBp: even + (index < (MAX_BPS - used) ? 1 : 0),
      reasons: ['fallback-even-distribution']
    }));
  }

  const raw = contributions.map((item) => {
    const exact = (item.mass * MAX_BPS) / totalMass;
    const floorShare = Math.floor(exact);
    return {
      assetId: item.assetId,
      floorShare,
      remainder: exact - floorShare,
      reasons: item.reasons
    };
  });

  let used = raw.reduce((sum, item) => sum + item.floorShare, 0);
  const remainderUnits = MAX_BPS - used;
  raw.sort((a, b) => b.remainder - a.remainder || b.floorShare - a.floorShare || a.assetId.localeCompare(b.assetId));
  for (let index = 0; index < remainderUnits; index += 1) {
    raw[index].floorShare += 1;
  }

  return raw
    .sort((a, b) => b.floorShare - a.floorShare || a.assetId.localeCompare(b.assetId))
    .map((item) => ({ assetId: item.assetId, shareBp: item.floorShare, reasons: item.reasons }));
}

function computeAssetSharesRaw(need, settlementCandidates) {
  const fullScore = evaluateBundleForNeed(need, settlementCandidates);
  const contributions = settlementCandidates.map((candidate) => {
    const reduced = settlementCandidates.filter((entry) => entry.assetId !== candidate.assetId);
    const reducedScore = evaluateBundleForNeed(need, reduced);
    return {
      assetId: candidate.assetId,
      mass: Math.max(0, fullScore - reducedScore),
      reasons: [
        `marginal bundle contribution from ${candidate.assetId}`,
        `fullScore=${fullScore.toFixed(4)}`,
        `reducedScore=${reducedScore.toFixed(4)}`
      ]
    };
  });

  return normalizeMassTo10000(contributions);
}

function allocateExactMicroUnits(totalMicroUnits, settledShares) {
  const total = BigInt(totalMicroUnits);
  const provisional = settledShares.map((item) => {
    const bp = BigInt(item.settledShareBp);
    const numerator = total * bp;
    return {
      assetId: item.assetId,
      settledShareBp: item.settledShareBp,
      microUnits: numerator / 10000n,
      remainder: numerator % 10000n
    };
  });

  let allocated = provisional.reduce((sum, item) => sum + item.microUnits, 0n);
  let remainder = total - allocated;

  provisional.sort((a, b) => {
    if (a.remainder !== b.remainder) return a.remainder > b.remainder ? -1 : 1;
    if (a.settledShareBp !== b.settledShareBp) return b.settledShareBp - a.settledShareBp;
    return a.assetId.localeCompare(b.assetId);
  });

  let index = 0;
  while (remainder > 0n && provisional.length) {
    provisional[index % provisional.length].microUnits += 1n;
    remainder -= 1n;
    index += 1;
  }

  return provisional
    .sort((a, b) => b.settledShareBp - a.settledShareBp || a.assetId.localeCompare(b.assetId))
    .map((item) => ({ assetId: item.assetId, microUnits: item.microUnits.toString() }));
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
  return [
    {
      principalId: `buyer:${buyer.buyerId}`,
      principalClass: 'buyer-principal',
      authSource: 'github',
      boundRefs: [buyer.repo, buyer.buyerBranch]
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
    ...selectedCandidates.map((candidate) => ({
      principalId: candidate.asset.attestations[0]?.signerAddress || `issuer:${candidate.assetId}`,
      principalClass: 'issuer-principal',
      authSource: 'attestation',
      boundRefs: [candidate.assetId, candidate.asset.contentRoot]
    }))
  ];
}

function buildAuthorizationDecisions(policyState, bindings, buyer, branchName, assetPack) {
  return [
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

function buildSelectionConsistencyProof(assetPack, selectedCandidates, settlementCandidates, branchMode) {
  const allowedTiers = branchMode === 'context'
    ? new Set(['context-only', 'patch-eligible', 'settlement-eligible'])
    : new Set(['patch-eligible', 'settlement-eligible']);

  return {
    assetPackId: assetPack.assetPackId,
    branchMode,
    allSelectedAssetsRespectUseTier: selectedCandidates.every((candidate) => allowedTiers.has(candidate.useTier)),
    allMaterializedAssetsRespectVisibilityRules: true,
    settlementConsumesOnlySettlementEligibleAssets: settlementCandidates.every((candidate) => candidate.useTier === 'settlement-eligible')
  };
}

function buildJournalCompletenessProof(eventId, journalDiff) {
  const entries = [...journalDiff.debits, ...journalDiff.credits];
  return {
    eventId,
    allRequiredReasonsCovered: entries.every((entry) => !!entry.reason && !!entry.explanation),
    noUnclassifiedTransfers: entries.every((entry) => ['licensed_bundle_debit', 'contribution_credit'].includes(entry.reason)),
    eventRefsConsistent: entries.every((entry) => entry.eventId === eventId),
    replayableJournal: stableHashObject(entries) === stableHashObject([...entries])
  };
}

function buildIdentityAuthorizationProof(branchName, authorizationDecisions, bindings) {
  return {
    resourceRef: branchName,
    allAccessBoundToKnownPrincipals: authorizationDecisions.every((decision) => bindings.some((binding) => binding.principalId === decision.principalId)),
    allStateChangingActionsAuthorized: authorizationDecisions.filter((decision) => decision.action === 'settle:journal-event' || decision.action === 'write:private-branch' || decision.action === 'materialize:selected-source-material').every((decision) => decision.decision === 'allow'),
    issuerIdentityBound: bindings.some((binding) => binding.principalClass === 'issuer-principal'),
    buyerDeliveryPrincipalsBound: bindings.some((binding) => binding.principalClass === 'buyer-principal')
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
    revocationBehaviorDefined: records.every((record) => !!record.disclosurePolicyId)
  };
}

function buildAssetMeasurementProofs(selectedCandidates) {
  return selectedCandidates.map((candidate) => ({
    assetId: candidate.assetId,
    contentRoot: candidate.asset.contentRoot,
    unitRefs: candidate.asset.contentUnits.map((unit) => unit.unitId),
    measurementsTraceableToUnits: candidate.asset.contentUnits.length > 0,
    measurementReplayable: (candidate.asset.assetMeasurement?.provenance || []).length > 0,
    measurementPolicySatisfied: !!candidate.asset.assetMeasurement && (candidate.asset.assetMeasurement.provenance || []).length > 0
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
      { stage: 'materialization', artifactRefs: ['.engi/asset-pack.lock.json', '.engi/selected-source-material.json', 'ENGI_NEED.md'], claim: 'Only allowed assets and units are materialized into the private remediation branch.' },
      { stage: 'settlement-and-proof', artifactRefs: ['.engi/settlement-preview.json', '.engi/settlement-proof.json', '.engi/journal-diff.json', '.engi/system-proof-bundle.json'], claim: 'Settlement and proof closure are exact-accounting, theorem-checked, and replayable.' }
    ],
    theoremChecks: [
      'selected assets respect branch-mode use tiers',
      'all state-changing actions are authorized',
      'no unauthorized public disclosure occurs',
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
    assetPackLockHash: stableHashObject(assetPackLock)
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
          strongestSignals: candidate.ranking.explainability.strongestSignals,
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
      contextInputCount: surface.contextInputs.length,
      downstreamArtifacts: surface.lineage.downstreamArtifacts
    })),
    promptLineage: promptSurfaces.map((surface) => ({
      promptId: surface.promptId,
      derivedFrom: surface.lineage.derivedFrom,
      evidenceRefs: surface.lineage.evidenceRefs,
      outputFields: surface.lineage.outputFields,
      downstreamArtifacts: surface.lineage.downstreamArtifacts
    })),
    inferredOutputs: inferenceProofs.map((proof) => ({
      outputField: proof.outputField,
      evaluatorSurface: proof.evaluatorSurface
    })),
    profileABoundary: 'Deterministic/local stand-ins emulate prompt/evaluator contracts and replayability metadata.',
    profileBBoundary: 'Production prompt execution, model routing, and remote trace capture remain external.'
  };
}

function buildSystemProofBundle(needId, assetPackId, inferenceProofs, assetMeasurementProofs, selectionConsistencyProof, journalCompletenessProof, identityAuthorizationProof, sensitiveDataFlowProof, settlementProof, promptImplementationSurface, proofContract) {
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
    selectionConsistencyProof,
    journalCompletenessProof,
    identityAuthorizationProof,
    sensitiveDataFlowProof,
    settlementProof
  };
}

function buildArtifactUploadManifest(selectedCandidates) {
  return {
    conformanceProfile: PROFILE_A,
    productionIntentProfile: PROFILE_B,
    uploads: selectedCandidates.map((candidate) => ({
      assetId: candidate.assetId,
      title: candidate.asset.title,
      artifactKind: candidate.asset.artifactKind,
      artifactType: candidate.asset.artifactType,
      uploadSurface: candidate.asset.uploadSurface,
      githubBoundary: candidate.asset.githubBoundary,
      identitySurface: candidate.asset.identitySurface
    }))
  };
}

function buildGithubBoundarySurface(buyer, need, selectedCandidates) {
  return {
    conformanceProfile: PROFILE_A,
    productionIntentProfile: PROFILE_B,
    modeledBindings: {
      buyerInstallationId: buyer.installationId,
      repo: buyer.repo,
      benchmarkRunId: need.benchmarkRunId,
      benchmarkWorkflowPath: need.benchmarkWorkflowPath,
      selectedAssetGithubBindings: selectedCandidates.map((candidate) => candidate.asset.githubBoundary)
    },
    profileABoundary: 'Demo stores GitHub/App references only and never fakes live API effects.',
    profileBBoundary: 'Live GitHub App installation auth, workflow fetches, PR writes, and branch operations remain external.'
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
        path: '.engi/external-boundary-manifest.json',
        useTiersContributed: assetPack.acceptedUseTiers,
        confidentialityClass: 'private-proof-artifact',
        potentiallyDisclosable: false,
        dependsOn: ['github-binding', 'profile-semantics', 'external-boundaries']
      },
      {
        path: '.engi/settlement-preview.json',
        useTiersContributed: ['settlement-eligible'],
        confidentialityClass: 'settlement-preview',
        potentiallyDisclosable: false,
        dependsOn: ['asset-shares', 'settlement']
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

export function settleNeedEvent(state, { buyer, need, assetPack, assetPackLock, selectedCandidates, branchName, branchMode }) {
  const settlementCandidates = selectedCandidates.filter((candidate) => candidate.useTier === 'settlement-eligible');
  if (!settlementCandidates.length) {
    throw new Error('No settlement-eligible assets available for Spec V8 settlement.');
  }

  const rawShares = computeAssetSharesRaw(need, settlementCandidates);
  const settledShares = rawShares.map((item) => ({
    assetId: item.assetId,
    rawShareBp: item.shareBp,
    settledShareBp: item.shareBp,
    settlementAdjustmentReasons: []
  }));

  const allocations = allocateExactMicroUnits(METERED_MICRO_UNITS, settledShares);
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
    receipts
  };

  return {
    eventId,
    bundleId,
    branchName,
    branchMode,
    issuanceReceiptId,
    allocationReceiptId,
    journalDiff,
    settlementPreview,
    nextLedgerAccounts: stringifyBigIntMap(afterBalances)
  };
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
    '.engi/external-boundary-manifest.json',
    '.engi/unit-catalog.json',
    '.engi/pipeline-telemetry.json',
    'ENGI_NEED.md'
  ];
  for (const requiredPath of requiredPaths) {
    if (!branchArtifacts.files[requiredPath]) {
      throw new Error(`Spec V8 branch artifact contract failed: missing ${requiredPath}.`);
    }
  }
}

function buildBranchArtifacts({ need, needMeasurement, benchmarkTarget, branchMode, branchName, matchReport, verificationReport, evalManifest, assetPack, assetPackLock, selectedSourceMaterialManifest, settlementPreview, settlementProof, systemProofBundle, authorizationDecisions, sensitiveDataFlowRecords, policyRelease, deliverablesManifest, unitCatalog, pipelineTelemetry, selectedCandidates, journalDiff, identityBindings, githubBoundarySurface, artifactUploadManifest, profileCompositionSurface, promptSurfaces, externalBoundaryManifest }) {
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
    '.engi/external-boundary-manifest.json': JSON.stringify(externalBoundaryManifest, null, 2),
    '.engi/unit-catalog.json': JSON.stringify(unitCatalog, null, 2),
    '.engi/pipeline-telemetry.json': JSON.stringify(pipelineTelemetry, null, 2),
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

  const policyState = state.policyState || buildPolicyState();
  const needMeasurement = measureNeedFromScenario(scenario);
  const { needDescriptor: need, benchmarkTarget, benchmarkParserContract, canonicalBenchmarkOutputs, parserValidation, inferenceProofs, promptSurfaces } = needMeasurement;
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
  const settlement = settleNeedEvent(state, { buyer, need, assetPack, assetPackLock, selectedCandidates, branchName, branchMode });
  const selectionConsistencyProof = buildSelectionConsistencyProof(assetPack, selectedCandidates, selectedCandidates.filter((candidate) => candidate.useTier === 'settlement-eligible'), branchMode);
  const journalCompletenessProof = buildJournalCompletenessProof(settlement.eventId, settlement.journalDiff);
  const identityBindings = buildIdentityBindings(buyer, selectedCandidates);
  const githubBoundarySurface = buildGithubBoundarySurface(buyer, need, selectedCandidates);
  const artifactUploadManifest = buildArtifactUploadManifest(selectedCandidates);
  const profileCompositionSurface = buildProfileCompositions();
  const externalBoundaryManifest = buildExternalBoundaryManifest({ buyer, need, selectedCandidates, assetPack, settlementPreview: settlement.settlementPreview });
  const authorizationDecisions = buildAuthorizationDecisions(policyState, identityBindings, buyer, branchName, assetPack);
  const sensitiveDataFlowRecords = buildSensitiveDataFlowRecords(policyState, buyer, branchName, assetPack, selectedCandidates);
  const identityAuthorizationProof = buildIdentityAuthorizationProof(branchName, authorizationDecisions, identityBindings);
  const sensitiveDataFlowProof = buildSensitiveDataFlowProof(sensitiveDataFlowRecords);
  const assetMeasurementProofs = buildAssetMeasurementProofs(selectedCandidates);
  const settlementProof = buildSettlementProof(settlement.journalDiff, assetPackLock);
  const promptImplementationSurface = buildPromptImplementationSurface(inferenceProofs, promptSurfaces);
  const proofContract = buildProofContract({ needId: need.needId, assetPackId: assetPack.assetPackId, branchName, selectedCandidates, authorizationDecisions, sensitiveDataFlowRecords });
  const systemProofBundle = buildSystemProofBundle(
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
    proofContract
  );
  const policyRelease = buildBranchPolicyRelease(policyState, branchName, assetPack, selectedCandidates);
  const unitCatalog = buildUnitCatalog(selectedCandidates);
  const pipelineTelemetry = buildPipelineTelemetry({
    need,
    evaluatedCandidates,
    assetPack,
    selectedCandidates,
    verificationReport,
    settlementPreview: settlement.settlementPreview,
    journalDiff: settlement.journalDiff
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
  const branchArtifacts = buildBranchArtifacts({
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
    externalBoundaryManifest
  });
  assertRequiredBranchArtifacts(branchArtifacts);

  const latestRun = {
    createdAt: nowIso(),
    buyer,
    scenarioId: scenario.scenarioId,
    branchMode,
    conformanceProfile: PROFILE_A,
    productionIntentProfile: PROFILE_B,
    needLifecycle: 'settled',
    need,
    needMeasurement,
    benchmarkTarget,
    benchmarkParserContract,
    canonicalBenchmarkOutputs,
    parserValidation,
    inferenceProofs,
    promptSurfaces,
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
      measurementProvenance: candidate.measurementProvenance
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
    externalBoundaryManifest,
    deliverablesManifest,
    unitCatalog,
    pipelineTelemetry,
    settlementPreview: settlement.settlementPreview,
    journalDiff: settlement.journalDiff,
    systemProofBundle,
    proofContract,
    branchArtifacts,
    boundedPublicProof: {
      needId: need.needId,
      bundleId: settlement.bundleId,
      branchName,
      conformanceProfile: PROFILE_A,
      productionIntentProfile: PROFILE_B,
      selectedAssetIds: assetPack.selectedAssets,
      invariantSummary: settlement.journalDiff.invariants,
      proofContractRef: proofContract.contractId,
      evidenceChain: proofContract.evidenceChain.map((entry) => ({ stage: entry.stage, artifactRefs: entry.artifactRefs })),
      redactionStatus: 'bounded-public-proof-metadata-only'
    }
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
      needId: need.needId,
      branchName,
      branchMode,
      selectedAssets: assetPack.selectedAssets,
      bundleId: settlement.bundleId
    }]
  };

  return { nextState, latestRun };
}

export function publicState(state) {
  return {
    specVersion: state.specVersion,
    conformanceProfiles: state.conformanceProfiles || {
      active: PROFILE_A,
      productionIntent: PROFILE_B,
      prototypeOnlyModeledControls: true,
      profileCompositions: buildProfileCompositions()
    },
    profileCompositions: buildProfileCompositions(),
    updatedAt: nowIso(),
    buyers: state.buyers,
    policyRelease: buildPolicyRelease(state.policyState || buildPolicyState()),
    needScenarios: state.needScenarios.map((scenario) => ({
      scenarioId: scenario.scenarioId,
      repo: scenario.repo,
      buyerBranch: scenario.baseRef,
      taskSeed: scenario.expectedTask,
      profileAStatus: PROFILE_A,
      profileBStatus: PROFILE_B,
      failingCases: scenario.canonicalRunEvidence?.extractedOutputs?.failingCases || [],
      weakDimensions: scenario.canonicalRunEvidence?.extractedOutputs?.weakDimensions || [],
      benchmarkRunId: scenario.benchmarkRunId,
      benchmarkWorkflowPath: scenario.benchmarkWorkflowPath,
      parserKind: 'github-actions.auth-remediation.v3',
      parserVersion: '3.0.0'
    })),
    assets: state.assets.map(publicAsset),
    ledger: state.ledger,
    latestRun: state.latestRun,
    runHistory: state.runHistory
  };
}
