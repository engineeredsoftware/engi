import crypto from 'node:crypto';

export const SPEC_VERSION = 'ENGI Spec V6 deterministic local prototype';
export const DEFAULT_BRANCH_MODE = 'patch';
export const METERED_MICRO_UNITS = '100000000';
const MAX_BPS = 10000;
const VECTOR_DIMENSIONS = 16;
const DEFAULT_MODEL_ID = 'deterministic-local-evaluator.v2';
const DEFAULT_POLICY_REF = 'policy://engi/spec-v6-demo/2026-04-02';
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

function cosineSimilarity(left, right) {
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
    throw new Error(`Spec V6 debug failure: ${name} out of range (${value}).`);
  }
  return numeric;
}

function summarizeScore(score) {
  return Number(enforceRange('score', score).toFixed(4));
}

function enforceTelemetryTrace(name, trace) {
  if (!trace || typeof trace !== 'object') {
    throw new Error(`Spec V6 debug failure: missing telemetry trace for ${name}.`);
  }
  return trace;
}

function measurementDetail({ value, mode, toolOrPromptId, evidenceRefs, explanation, unitRefs = [] }) {
  return {
    value: summarizeScore(value),
    mode,
    toolOrPromptId,
    version: 'demo-v6.2',
    evidenceRefs: evidenceRefs.filter(Boolean),
    unitRefs,
    explanation
  };
}

function inferenceProof(outputField, evidenceRefs, promptOrEvaluatorId, modelId = DEFAULT_MODEL_ID) {
  return {
    outputField,
    evidenceRefs: evidenceRefs.filter(Boolean),
    promptOrEvaluatorId,
    modelId,
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

    return {
      unitId: `${assetId}:unit-${index + 1}`,
      assetId,
      unitKind: detectUnitKind(text),
      text,
      extracted,
      embeddings: {
        taskVector: buildDeterministicVector(text),
        failureModeVector: buildDeterministicVector([text, ...(extracted.constraints || []), ...(extracted.symbols || [])].join(' ')),
        technicalContextVector: buildDeterministicVector(technicalContextText)
      },
      unitHash: stableHashObject({ text })
    };
  });
}

function measurementTrace(mode, toolOrPromptId, evidenceRefs) {
  return {
    mode,
    toolOrPromptId,
    version: 'demo-v6.1',
    evidenceRefs
  };
}

function summarizeStrings(values) {
  return [...new Set((values || []).map((value) => String(value || '').trim()).filter(Boolean))];
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
    releaseId: 'policy-release-engi-v6-demo-2026-04-02',
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
        'trigger:settlement': { allow: true, policyRef: DEFAULT_POLICY_REF, reasons: ['Buyer principal may trigger the fixed local settlement preview.'] },
        'read:bounded-public-proof': { allow: true, policyRef: DEFAULT_POLICY_REF, reasons: ['Buyer may inspect bounded public proof metadata.'] },
        'open:delivery': { allow: false, policyRef: DEFAULT_POLICY_REF, reasons: ['Delivery-open is blocked in the deterministic local prototype.'] }
      },
      'engi-system-principal': {
        'read:private-branch': { allow: true, policyRef: DEFAULT_POLICY_REF, reasons: ['ENGI system principal materializes private artifacts.'] },
        'trigger:settlement': { allow: true, policyRef: DEFAULT_POLICY_REF, reasons: ['ENGI system principal executes deterministic settlement.'] },
        'write:private-branch': { allow: true, policyRef: DEFAULT_POLICY_REF, reasons: ['ENGI system principal stages remediation artifacts.'] },
        'read:bounded-public-proof': { allow: true, policyRef: DEFAULT_POLICY_REF, reasons: ['ENGI system principal may derive bounded proof metadata.'] }
      },
      'authorized-reviewer': {
        'read:private-branch': { allow: true, policyRef: DEFAULT_POLICY_REF, reasons: ['Authorized reviewer access is allowed under private review policy.'] },
        'trigger:settlement': { allow: false, policyRef: DEFAULT_POLICY_REF, reasons: ['Authorized reviewers may not trigger settlement.'] }
      },
      'issuer-principal': {
        'read:private-branch': { allow: false, policyRef: DEFAULT_POLICY_REF, reasons: ['Issuers do not gain read access by default.'] },
        'trigger:settlement': { allow: false, policyRef: DEFAULT_POLICY_REF, reasons: ['Issuers cannot self-settle the buyer event.'] }
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
    parserKind: 'github-actions.auth-remediation.v2',
    parserVersion: '2.0.0',
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
  const assetId = input.assetId || `asset_${toSlug(input.title)}_${sha256(`${input.author}:${input.title}:${content}`).slice(0, 10)}`;
  const extracted = extractSignals(content, {
    symbols: input.symbols,
    paths: input.sourcePaths,
    configKeys: input.configKeys,
    stackTags: [...(input.declaredStacks || []), ...(input.tags || [])],
    constraints: input.declaredConstraints
  });
  const contentUnits = splitContentUnits(assetId, content, extracted);
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
    provenance: [
      measurementTrace('static', 'asset.measurement.extract.v2', [contentRoot, ...(input.sourcePaths || extracted.paths)])
    ]
  };

  return {
    assetId,
    depositedAt: input.depositedAt || nowIso(),
    title: input.title,
    artifactKind: input.artifactKind || 'mixed',
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
    assetMeasurement,
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
          parserKind: 'github-actions.auth-remediation.v1',
          parserVersion: '1.0.0'
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
    throw new Error(`Spec V6 parser validation failed: ${parserValidation.reasons.join('; ')}`);
  }

  const repoMeasurements = repoContextStaticMeasurements(scenario, canonicalBenchmarkOutputs);
  const task = inferNeedTask(scenario, canonicalBenchmarkOutputs);
  const failureModes = inferFailureModes(scenario, canonicalBenchmarkOutputs);
  const constraints = inferConstraints(scenario, canonicalBenchmarkOutputs);
  const targetArtifactKinds = inferTargetArtifactKinds(scenario, canonicalBenchmarkOutputs);
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
    measurementTrace('inferred', 'need-measurement.target-artifact-kinds.v2', [...evidenceRefs, ...repoMeasurements.touchedPaths])
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
    }
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
    inferenceProofs
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
  const taskVector = buildDeterministicVector(need.task);
  const failureModeVector = buildDeterministicVector(need.failureModes.join(' '));
  const technicalContextVector = buildDeterministicVector([
    ...need.touchedPaths,
    ...need.extractedSymbols,
    ...need.configKeys,
    ...need.stackHints
  ].join(' '));
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
        score: cosineSimilarity(taskVector, unit.embeddings.taskVector),
        evidenceRefs: [need.needId, asset.contentRoot, unit.unitHash],
        matchedValues: lexicalHits
      });
      channelEntries.failureModeSearch.push({
        channelId: 'failureModeSearch',
        assetId: asset.assetId,
        unitId: unit.unitId,
        unitKey,
        score: cosineSimilarity(failureModeVector, unit.embeddings.failureModeVector),
        evidenceRefs: [need.needId, ...need.failingCases, unit.unitHash],
        matchedValues: intersection(need.failureModes, uniqueTokens(unit.text))
      });
      channelEntries.technicalContextSearch.push({
        channelId: 'technicalContextSearch',
        assetId: asset.assetId,
        unitId: unit.unitId,
        unitKey,
        score: cosineSimilarity(technicalContextVector, unit.embeddings.technicalContextVector),
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

      return {
        assetId: asset.assetId,
        asset,
        recall,
        ranking: {
          wholeAssetNeedScore,
          needMatch,
          benchmarkImpact,
          actionability,
          rankingPenalties: penaltyInfo.rankingPenalties,
          penaltyMass: penaltyInfo.penaltyMass,
          finalRankingScore,
          explainability: {
            strongestSignals: [
              { label: 'taskSemanticFit', value: Number(needMatch.taskSemanticFit.toFixed(4)) },
              { label: 'failureModeFit', value: Number(needMatch.failureModeFit.toFixed(4)) },
              { label: 'likelyImprovesFailingCases', value: Number(benchmarkImpact.likelyImprovesFailingCases.toFixed(4)) },
              { label: 'implementationSpecificity', value: Number(actionability.implementationSpecificity.toFixed(4)) }
            ].sort((a, b) => b.value - a.value),
            penaltiesApplied: penaltyInfo.rankingPenalties.map((penalty) => penalty.code),
            recallFusion: recall.fusion
          }
        },
        verification,
        useTier,
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
  const allowedTiers = branchMode === 'context'
    ? new Set(['context-only', 'patch-eligible', 'settlement-eligible'])
    : new Set(['patch-eligible', 'settlement-eligible']);

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
    selectedAssets: evaluatedCandidates
      .filter((candidate) => selectedSet.has(candidate.assetId))
      .map((candidate) => ({
        assetId: candidate.assetId,
        finalRankingScore: Number(candidate.ranking.finalRankingScore.toFixed(4)),
        useTier: candidate.useTier,
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
        rejectionReason: `Not materialized into ${assetPack.branchMode} branch at tier ${candidate.useTier}.`
      }))
  };
}

function buildVerificationReport(need, evaluatedCandidates) {
  return {
    needId: need.needId,
    assetVerification: evaluatedCandidates.map((candidate) => ({
      assetId: candidate.assetId,
      issuanceVerification: candidate.verification.issuanceVerification,
      provenanceVerification: candidate.verification.provenanceVerification,
      verificationSufficiency: candidate.verification.verificationSufficiency,
      issuerPolicyStatus: candidate.verification.issuerPolicyStatus,
      useTier: candidate.useTier
    }))
  };
}

function buildEvalManifest(need, evaluatedCandidates) {
  return {
    needId: need.needId,
    benchmarkRunId: need.benchmarkRunId,
    promptsVersion: 'spec-v6-demo-deterministic.v2',
    modelsUsed: [DEFAULT_MODEL_ID],
    deterministicFeatureVersion: 'spec-v6-demo-static.v2',
    evaluatorsUsed: [
      'need-measurement.task.v2',
      'need-measurement.failure-modes.v2',
      'need-measurement.constraints.v2',
      'need-measurement.target-artifact-kinds.v2',
      'candidate-recall.hybrid.v2',
      'need-match',
      'benchmark-impact',
      'actionability',
      'issuance',
      'provenance',
      'verification-sufficiency',
      'issuer-policy'
    ],
    assetMeasurementProvenance: evaluatedCandidates.map((candidate) => ({
      assetId: candidate.assetId,
      provenance: candidate.measurementProvenance
    }))
  };
}

function buildAssetPackLock(assetPack, selectedCandidates) {
  return {
    assetPackId: assetPack.assetPackId,
    needId: assetPack.needId,
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
    selectedSourceMaterial: selectedCandidates.map((candidate) => ({
      assetId: candidate.assetId,
      title: candidate.asset.title,
      useTier: candidate.useTier,
      artifactKind: candidate.asset.artifactKind,
      sourceMaterialBinding: candidate.asset.sourceMaterialBinding,
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
  const allowedTiers = branchMode === 'context'
    ? new Set(['context-only', 'patch-eligible', 'settlement-eligible'])
    : new Set(['patch-eligible', 'settlement-eligible']);

  const files = {};
  for (const candidate of selectedCandidates) {
    if (!allowedTiers.has(candidate.useTier)) continue;
    const sections = candidate.asset.contentUnits.slice(0, 2).map((unit) => `## ${unit.unitId}\n\n${unit.text}`).join('\n\n');
    files[`.engi/source-material/${candidate.assetId}.md`] = `# ${candidate.asset.title}\n\n- assetId: ${candidate.assetId}\n- useTier: ${candidate.useTier}\n- artifactKind: ${candidate.asset.artifactKind}\n- contentRoot: ${candidate.asset.contentRoot}\n- materializationMode: ${candidate.asset.sourceMaterialBinding.mode}\n- confidentiality: ${candidate.asset.sourceMaterialBinding.confidentiality}\n\n${sections}`;
  }
  return files;
}

function buildNeedMarkdown(need, assetPack, selectedCandidates, journalDiff, policyRelease) {
  const selectedList = selectedCandidates.map((candidate) => `- ${candidate.asset.title} (${candidate.useTier}) — score ${candidate.ranking.finalRankingScore.toFixed(4)}`).join('\n');
  return `# ENGI Need\n\n## Failing benchmark slices\n- ${need.failingCases.join('\n- ')}\n\n## Measured need\n${need.task}\n\n## Benchmark parser contract\n- parserKind: ${need.benchmarkParserContract.parserKind}\n- parserVersion: ${need.benchmarkParserContract.parserVersion}\n- failClosed: ${need.benchmarkParserContract.parserFailureContract.failClosed}\n\n## Target artifact kinds\n- ${need.targetArtifactKinds.join('\n- ')}\n\n## Selected assets and reasons\n${selectedList}\n\n## Verification / risk summary\n- Private remediation branch only; no public delivery before settlement.\n- Settlement consumes settlement-eligible assets only.\n- Restricted or weakly evidenced assets remain report-only or context-only.\n- Policy release: ${policyRelease.releaseId || policyRelease.releasePolicyId}\n\n## Expected touched files / areas\n- ${need.touchedPaths.join('\n- ')}\n\n## Validation / rerun instructions\n- Rerun ${need.benchmarkWorkflowPath}\n- Re-run failing cases: ${need.failingCases.join(', ')}\n- Recheck weak dimensions: ${need.weakDimensions.join(', ')}\n\n## Settlement preview summary\n- bundleId: ${journalDiff.bundleId}\n- debited micro-units: ${journalDiff.totals.debited}\n- credited micro-units: ${journalDiff.totals.credited}\n- raw share asset count: ${journalDiff.rawShares.length}`;
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
    makeAuthorizationDecision(bindings.find((binding) => binding.principalId === `buyer:${buyer.buyerId}`), 'trigger:settlement', assetPack.assetPackId, policyState),
    makeAuthorizationDecision(bindings.find((binding) => binding.principalId === 'engi-system:branch-materializer'), 'write:private-branch', branchName, policyState),
    makeAuthorizationDecision(bindings.find((binding) => binding.principalId === 'engi-system:settlement-engine'), 'trigger:settlement', assetPack.assetPackId, policyState),
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
      recordId: `flow_${sha256(`${branchName}:licensed-source`).slice(0, 10)}`,
      dataClass: 'licensed-source-material',
      fromSurface: assetPack.assetPackId,
      toSurface: branchName,
      transformation: 'source-material-mount',
      authorizedPrincipals: [`buyer:${buyer.buyerId}`, 'engi-system:branch-materializer'],
      retentionPolicyId: 'retention/private-remediation-30d',
      disclosurePolicyId: 'disclosure/private-only',
      proofRefs: selectedCandidates.map((candidate) => candidate.assetId)
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
    },
    {
      recordId: `flow_${sha256(`${branchName}:settlement-proof`).slice(0, 10)}`,
      dataClass: 'settlement-preview',
      fromSurface: `${branchName}/.engi/settlement-preview.json`,
      toSurface: `${branchName}/.engi/settlement-proof.json`,
      transformation: 'settlement-proof-derivation',
      authorizedPrincipals: ['engi-system:settlement-engine'],
      retentionPolicyId: 'retention/private-remediation-30d',
      disclosurePolicyId: 'disclosure/private-only',
      proofRefs: ['settlement-proof']
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
    confidentialityDefault: 'private-required',
    artifactClasses: [
      { path: '.engi/source-material/', sensitiveDataClass: 'licensed-source-material', disclosable: false },
      { path: '.engi/settlement-preview.json', sensitiveDataClass: 'settlement-preview', disclosable: false },
      { path: '.engi/settlement-proof.json', sensitiveDataClass: 'private-proof-artifact', disclosable: false },
      { path: '.engi/system-proof-bundle.json', sensitiveDataClass: 'private-proof-artifact', disclosable: false },
      { path: '.engi/match-report.json', sensitiveDataClass: 'bounded-public-proof-metadata', disclosable: true },
      { path: 'ENGI_NEED.md', sensitiveDataClass: 'private-branch-derived-artifact', disclosable: false }
    ],
    retentionPolicies: [
      { retentionPolicyId: 'retention/private-remediation-30d', appliesTo: ['.engi/source-material/', '.engi/settlement-preview.json', '.engi/settlement-proof.json', 'ENGI_NEED.md'], ttlDays: 30 },
      { retentionPolicyId: 'retention/bounded-public-365d', appliesTo: ['bounded-public-proof-surface'], ttlDays: 365 }
    ],
    revocationRules: {
      revokedIssuerBlocksNewSettlement: true,
      revokedIssuerBlocksNewDelivery: true,
      'previouslyIssuedArtifactsRemainHash-addressableOnly': true
    },
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
    allStateChangingActionsAuthorized: authorizationDecisions.filter((decision) => decision.action === 'trigger:settlement' || decision.action === 'write:private-branch').every((decision) => decision.decision === 'allow'),
    issuerIdentityBound: bindings.some((binding) => binding.principalClass === 'issuer-principal'),
    buyerDeliveryPrincipalsBound: bindings.some((binding) => binding.principalClass === 'buyer-principal')
  };
}

function buildSensitiveDataFlowProof(records) {
  return {
    allPrivateArtifactsClassified: records.every((record) => !!record.dataClass),
    allFlowsRecorded: records.length > 0,
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

function buildSystemProofBundle(needId, assetPackId, inferenceProofs, assetMeasurementProofs, selectionConsistencyProof, journalCompletenessProof, identityAuthorizationProof, sensitiveDataFlowProof, settlementProof) {
  return {
    needId,
    assetPackId,
    inferenceProofs,
    assetMeasurementProofs,
    selectionConsistencyProof,
    journalCompletenessProof,
    identityAuthorizationProof,
    sensitiveDataFlowProof,
    settlementProof
  };
}

function buildDeliverablesManifest({ branchName, need, benchmarkTarget, assetPack, assetPackLock, settlementPreview, settlementProof, selectedSourceMaterialManifest, policyRelease }) {
  return {
    branchName,
    needId: need.needId,
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
      selectedSourceMaterialCount: selectedSourceMaterialManifest.selectedSourceMaterial.length
    }
  };
}

export function settleNeedEvent(state, { buyer, need, assetPack, assetPackLock, selectedCandidates, branchName, branchMode }) {
  const settlementCandidates = selectedCandidates.filter((candidate) => candidate.useTier === 'settlement-eligible');
  if (!settlementCandidates.length) {
    throw new Error('No settlement-eligible assets available for Spec V6 settlement.');
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
    rawShares,
    settledShares,
    meteredMicroUnits: METERED_MICRO_UNITS,
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

function buildBranchArtifacts({ need, needMeasurement, benchmarkTarget, branchMode, branchName, matchReport, verificationReport, evalManifest, assetPack, assetPackLock, selectedSourceMaterialManifest, settlementPreview, settlementProof, systemProofBundle, authorizationDecisions, sensitiveDataFlowRecords, policyRelease, deliverablesManifest, selectedCandidates, journalDiff }) {
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
  const { needDescriptor: need, benchmarkTarget, benchmarkParserContract, canonicalBenchmarkOutputs, parserValidation, inferenceProofs } = needMeasurement;
  const evaluatedCandidates = evaluateCandidates(need, state.assets, policyState);
  const assetPack = assembleAssetPack(need, evaluatedCandidates, branchMode);
  const selectedCandidates = evaluatedCandidates.filter((candidate) => assetPack.selectedAssets.includes(candidate.assetId));
  if (!selectedCandidates.length) throw new Error('No candidates survived into the asset pack.');

  const branchName = `engi/remediation-${need.needId}-${toSlug(scenario.scenarioId)}`;
  const matchReport = buildMatchReport(need, evaluatedCandidates, assetPack);
  const verificationReport = buildVerificationReport(need, evaluatedCandidates);
  const evalManifest = buildEvalManifest(need, evaluatedCandidates);
  const assetPackLock = buildAssetPackLock(assetPack, selectedCandidates);
  const selectedSourceMaterialManifest = buildSelectedSourceMaterialManifest(assetPack, selectedCandidates);
  const settlement = settleNeedEvent(state, { buyer, need, assetPack, assetPackLock, selectedCandidates, branchName, branchMode });
  const selectionConsistencyProof = buildSelectionConsistencyProof(assetPack, selectedCandidates, selectedCandidates.filter((candidate) => candidate.useTier === 'settlement-eligible'), branchMode);
  const journalCompletenessProof = buildJournalCompletenessProof(settlement.eventId, settlement.journalDiff);
  const identityBindings = buildIdentityBindings(buyer, selectedCandidates);
  const authorizationDecisions = buildAuthorizationDecisions(policyState, identityBindings, buyer, branchName, assetPack);
  const sensitiveDataFlowRecords = buildSensitiveDataFlowRecords(policyState, buyer, branchName, assetPack, selectedCandidates);
  const identityAuthorizationProof = buildIdentityAuthorizationProof(branchName, authorizationDecisions, identityBindings);
  const sensitiveDataFlowProof = buildSensitiveDataFlowProof(sensitiveDataFlowRecords);
  const assetMeasurementProofs = buildAssetMeasurementProofs(selectedCandidates);
  const settlementProof = buildSettlementProof(settlement.journalDiff, assetPackLock);
  const systemProofBundle = buildSystemProofBundle(
    need.needId,
    assetPack.assetPackId,
    inferenceProofs,
    assetMeasurementProofs,
    selectionConsistencyProof,
    journalCompletenessProof,
    identityAuthorizationProof,
    sensitiveDataFlowProof,
    settlementProof
  );
  const policyRelease = buildBranchPolicyRelease(policyState, branchName, assetPack, selectedCandidates);
  const deliverablesManifest = buildDeliverablesManifest({
    branchName,
    need,
    benchmarkTarget,
    assetPack,
    assetPackLock,
    settlementPreview: settlement.settlementPreview,
    settlementProof,
    selectedSourceMaterialManifest,
    policyRelease
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
    selectedCandidates,
    journalDiff: settlement.journalDiff
  });

  const latestRun = {
    createdAt: nowIso(),
    buyer,
    scenarioId: scenario.scenarioId,
    branchMode,
    needLifecycle: 'settled',
    need,
    needMeasurement,
    benchmarkTarget,
    benchmarkParserContract,
    canonicalBenchmarkOutputs,
    parserValidation,
    inferenceProofs,
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
    deliverablesManifest,
    settlementPreview: settlement.settlementPreview,
    journalDiff: settlement.journalDiff,
    systemProofBundle,
    branchArtifacts,
    boundedPublicProof: {
      needId: need.needId,
      bundleId: settlement.bundleId,
      branchName,
      selectedAssetIds: assetPack.selectedAssets,
      invariantSummary: settlement.journalDiff.invariants
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
    updatedAt: nowIso(),
    buyers: state.buyers,
    policyRelease: buildPolicyRelease(state.policyState || buildPolicyState()),
    needScenarios: state.needScenarios.map((scenario) => ({
      scenarioId: scenario.scenarioId,
      repo: scenario.repo,
      buyerBranch: scenario.baseRef,
      task: scenario.expectedTask,
      failingCases: scenario.canonicalRunEvidence?.extractedOutputs?.failingCases || [],
      weakDimensions: scenario.canonicalRunEvidence?.extractedOutputs?.weakDimensions || [],
      benchmarkRunId: scenario.benchmarkRunId,
      benchmarkWorkflowPath: scenario.benchmarkWorkflowPath,
      parserKind: 'github-actions.auth-remediation.v2',
      parserVersion: '2.0.0'
    })),
    assets: state.assets.map(publicAsset),
    ledger: state.ledger,
    latestRun: state.latestRun,
    runHistory: state.runHistory
  };
}
