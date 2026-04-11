// @ts-check

import { accessSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const DEFAULT_V21_SPECIFYING_REPO_ROOT = path.resolve(__dirname, '../../..');

export const V21_REQUIRED_SPEC_SECTIONS = [
  'Status',
  'Version executive summary',
  'Canonical ENGI executive summary',
  'source-of-truth hierarchy',
  'full-system, re-implementation, and audit rule',
  'totality and precision enforcement rule',
  'system goals, non-goals, and design principles',
  'system architecture and layer boundaries',
  'canonical domain model',
  'whole ENGI operator chain',
  'canonical subsystem surfaces',
  'proof-family canon',
  'generated canon',
  'validation canon',
  'promotion canon',
  'appendices and canonical supporting material',
  'accepted boundaries and reopen conditions',
  'completion condition'
];

export const V21_REQUIRED_STATUS_LABELS = [
  'Prior canonical anchor',
  'Prior generated proof appendix',
  'Generated structured artifact inventory',
  'Source parity state'
];

export const V21_REQUIRED_PROMOTED_STATUS_LABELS = [
  'Canonical proof-source commit'
];

export const V21_REQUIRED_SPEC_APPENDIX_SECTIONS = [
  'Appendix A. Canonical type and surface catalog',
  'Appendix B. Proof family closure catalog',
  'Exact proof-family inventory matrix',
  'Appendix C. Generated artifact contract catalog',
  'Appendix D. Validation and checking gate catalog',
  'Appendix E. Current canonical source map',
  'Appendix F. Subsystem totality and derivability matrix',
  'Appendix G. Canonical file-family and promotion contract catalog',
  'Appendix H. Operator surface and quality contract catalog',
  'Appendix I. Scenario, workflow, and cross-product contract catalog',
  'Appendix J. Fail-closed contract and error posture matrix',
  'Appendix K. Source-bearing deliverable and artifact contract catalog'
];

export const V21_REQUIRED_PROOF_FAMILY_SECTIONS = [
  'Inference-synthesis',
  'Prompt-completeness',
  'Static-code-analysis',
  'Verification-decisions',
  'Selection-and-materialization',
  'Authorization-and-sensitive-flow',
  'Settlement-source-to-shares',
  'Disclosure-boundary',
  'Proof-contract'
];

export const V21_REQUIRED_GENERATED_ARTIFACT_CATALOG_SECTIONS = [
  'Inherited V19 reproducible-canon artifacts',
  'Inherited V20 operator-quality artifacts',
  'Exact generated-artifact inventory matrix',
  'V21 specifying generated artifacts',
  'Shared generated-artifact fields',
  'Artifact-specific generated payload fields',
  'Artifact confidentiality and disclosability taxonomy'
];

export const V21_REQUIRED_GENERATED_ARTIFACT_PATHS = [
  '.engi/v21-spec-family-report.json',
  '.engi/v21-canonical-input-report.json'
];

export const V21_REQUIRED_SUBSYSTEM_COVERAGE_PHRASES = [
  'repo supply and depositing',
  'needing and measured demand',
  'prompt/inference/evaluator ownership',
  'depositing-to-needing fit',
  'recall and ranking',
  'verification decisions',
  'selection and materialization',
  'branch artifacts and deliverables',
  'identity, authority, signing, and policy',
  'sensitive data and confidentiality flows',
  'projection, disclosure, and redaction',
  'proof families, members, theorems, witnesses, and replay',
  'settlement, source-to-shares, journals, and exact accounting',
  'telemetry, persistence, state, and failure semantics',
  'host/runtime capability truth',
  'operator experience and pedagogy',
  'validation and test stack',
  'generated artifacts and canonical promotion'
];

export const V21_REQUIRED_CROSS_PRODUCT_APPENDIX_PHRASES = [
  'auth-issuer-rollback',
  'privacy-boundary-proof-export',
  'polyglot-gateway-benchmark-remediation',
  'auth-many-asset-normalization',
  'Targeted deposit',
  'Normalization deposit',
  'patch',
  'context',
  'public',
  'buyer',
  'reviewer',
  'internal',
  'Openly writable',
  'Measurably readable',
  'Provable',
  'Valuable'
];

export const V21_REQUIRED_FAIL_CLOSED_APPENDIX_PHRASES = [
  'invalid deposit',
  'prompt contract incompleteness',
  'parsed-envelope inadmissibility',
  'no-survivor asset pack',
  'authorization denial',
  'public projection overexposure',
  'settlement conservation drift',
  'stale promoted status truth'
];

export const V21_REQUIRED_DELIVERABLE_APPENDIX_PHRASES = [
  '.engi/asset-pack.lock.json',
  '.engi/selected-source-material.json',
  '.engi/verification-report.json',
  '.engi/source-to-shares.json',
  '.engi/projection-policy.json',
  '.engi/system-proof-bundle.json',
  'ENGI_SPEC_V21_PROVEN.md'
];

const V21_ALLOWED_PARITY_JUDGMENTS = new Set([
  'drafted',
  'implemented',
  'substantially advanced',
  'closed',
  'implemented; promotion pending',
  'spec closed; source gap',
  'generated artifact pending',
  'accepted boundary',
  'reopened',
  'blocked',
  'deprecated',
  'historical only'
]);

/**
 * @param {string} value
 */
function assertVersion(value) {
  if (!/^V\d+$/.test(value)) {
    throw new Error(`Version must look like VN. Received ${value || 'none'}.`);
  }
  const numeric = Number(value.slice(1));
  if (!Number.isInteger(numeric) || numeric < 21) {
    throw new Error(`V21 specifying checks are implemented for V21+. Received ${value}.`);
  }
}

/**
 * @param {string} content
 * @param {string} label
 */
function extractStatusValue(content, label) {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = content.match(new RegExp(`^- ${escaped}: (.+)$`, 'm'));
  return match ? match[1].trim() : null;
}

/**
 * @param {string} content
 * @param {string} version
 */
function extractVersionState(content, version) {
  return extractStatusValue(content, `${version} state`);
}

/**
 * @param {string} value
 */
function normalize(value) {
  return value.toLowerCase().replace(/[`*]/g, '').replace(/\s+/g, ' ').trim();
}

/**
 * @param {string} content
 * @param {string} phrase
 */
function hasSection(content, phrase) {
  const normalizedPhrase = normalize(phrase);
  return content
    .split('\n')
    .filter((line) => /^#{2,6}\s+/.test(line))
    .some((line) => normalize(line).includes(normalizedPhrase));
}

/**
 * @param {string} content
 * @param {string} phrase
 */
function containsPhrase(content, phrase) {
  return normalize(content).includes(normalize(phrase));
}

/**
 * @param {string} content
 * @param {string} phrase
 */
function extractSection(content, phrase) {
  const normalizedPhrase = normalize(phrase);
  const lines = content.split('\n');
  let start = -1;
  let level = 0;
  for (let index = 0; index < lines.length; index += 1) {
    const match = lines[index].match(/^(#{2,6})\s+(.+)$/);
    if (!match) continue;
    if (normalize(match[2]).includes(normalizedPhrase)) {
      start = index + 1;
      level = match[1].length;
      break;
    }
  }
  if (start < 0) return '';
  let end = lines.length;
  for (let index = start; index < lines.length; index += 1) {
    const match = lines[index].match(/^(#{2,6})\s+(.+)$/);
    if (!match) continue;
    if (match[1].length <= level) {
      end = index;
      break;
    }
  }
  return lines.slice(start, end).join('\n').trim();
}

/**
 * @param {string} section
 */
function parseMarkdownTable(section) {
  const lines = section
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('|'));
  if (lines.length < 3) return [];
  const headers = lines[0]
    .split('|')
    .slice(1, -1)
    .map((cell) => cell.trim());
  return lines.slice(2).map((line) => {
    const cells = line
      .split('|')
      .slice(1, -1)
      .map((cell) => cell.trim());
    return Object.fromEntries(headers.map((header, index) => [header, cells[index] || '']));
  });
}

/**
 * @param {string} filePath
 */
function fileExists(filePath) {
  try {
    accessSync(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * @param {string[]} failures
 * @param {boolean} condition
 * @param {string} message
 */
function recordFailure(failures, condition, message) {
  if (!condition) failures.push(message);
}

/**
 * @param {{
 *   repoRoot?: string,
 *   version?: string,
 *   mode?: 'draft' | 'promoted',
 *   currentTarget?: string,
 *   skipPointerCheck?: boolean
 * }} [input={}]
 */
export function buildV21SpecFamilyReport({
  repoRoot = DEFAULT_V21_SPECIFYING_REPO_ROOT,
  version = 'V21',
  mode = 'draft',
  currentTarget,
  skipPointerCheck = false
} = {}) {
  assertVersion(version);
  const resolvedRepoRoot = path.resolve(repoRoot);
  const pointerPath = path.join(resolvedRepoRoot, 'ENGI_SPEC.txt');
  const pointerVersion = readFileSync(pointerPath, 'utf8').trim();
  const expectedTarget = currentTarget || (mode === 'promoted' ? version : pointerVersion);

  /** @type {string[]} */
  const failures = [];

  const requiredFiles = {
    spec: path.join(resolvedRepoRoot, `ENGI_SPEC_${version}.md`),
    delta: path.join(resolvedRepoRoot, `ENGI_SPEC_${version}_DELTA.md`),
    parity: path.join(resolvedRepoRoot, `ENGI_SPEC_${version}_PARITY_MATRIX.md`)
  };
  const supportFiles = {
    specifying: path.join(resolvedRepoRoot, 'ENGI_SPECIFYING.md'),
    templateguide: path.join(resolvedRepoRoot, 'ENGI_SPEC_TEMPLATEGUIDE.md')
  };

  for (const [label, filePath] of Object.entries(requiredFiles)) {
    if (!fileExists(filePath)) failures.push(`Missing required ${label} file: ${path.relative(resolvedRepoRoot, filePath)}`);
  }
  for (const [label, filePath] of Object.entries(supportFiles)) {
    if (!fileExists(filePath)) failures.push(`Missing required support file for V21+: ${label} at ${path.relative(resolvedRepoRoot, filePath)}`);
  }

  if (!skipPointerCheck && pointerVersion !== expectedTarget) {
    failures.push(`ENGI_SPEC.txt points to ${pointerVersion || 'none'} but expected ${expectedTarget}.`);
  }

  /** @type {Record<string, string>} */
  const contents = {};
  for (const [label, filePath] of Object.entries(requiredFiles)) {
    if (fileExists(filePath)) contents[label] = readFileSync(filePath, 'utf8');
  }

  if (fileExists(supportFiles.specifying)) {
    const specifyingContent = readFileSync(supportFiles.specifying, 'utf8');
    recordFailure(
      failures,
      normalize(specifyingContent).includes('one complete specifying standard'),
      'ENGI_SPECIFYING.md does not state its singular specifying authority clearly enough.'
    );
  }

  if (fileExists(supportFiles.templateguide)) {
    const templateguideContent = readFileSync(supportFiles.templateguide, 'utf8');
    recordFailure(
      failures,
      templateguideContent.includes('ENGI_SPECIFYING.md'),
      'ENGI_SPEC_TEMPLATEGUIDE.md does not point to ENGI_SPECIFYING.md.'
    );
  }

  for (const [label, content] of Object.entries(contents)) {
    const declaredTarget = extractStatusValue(content, 'Current canonical/latest target');
    recordFailure(
      failures,
      declaredTarget === `\`${expectedTarget}\`` || declaredTarget === expectedTarget,
      `${label} status block must declare Current canonical/latest target as ${expectedTarget}.`
    );
    for (const statusLabel of V21_REQUIRED_STATUS_LABELS) {
      recordFailure(
        failures,
        typeof extractStatusValue(content, statusLabel) === 'string',
        `${label} status block is missing a ${statusLabel} line.`
      );
    }
    if (mode === 'promoted') {
      for (const statusLabel of V21_REQUIRED_PROMOTED_STATUS_LABELS) {
        recordFailure(
          failures,
          typeof extractStatusValue(content, statusLabel) === 'string',
          `${label} status block is missing a ${statusLabel} line.`
        );
      }
    }
    const stateValue = extractVersionState(content, version);
    recordFailure(
      failures,
      typeof stateValue === 'string' && stateValue.length > 0,
      `${label} status block is missing a ${version} state line.`
    );
    if (mode === 'promoted' && stateValue) {
      const staleTokenPattern = /\bdraft\b|\bpending\b|pre-implementation|in progress|being drafted|not yet|remains unfinished/i;
      recordFailure(
        failures,
        !staleTokenPattern.test(stateValue),
        `${label} ${version} state line still contains draft/pending language: ${stateValue}`
      );
    }
  }

  const specContent = contents.spec || '';
  for (const phrase of V21_REQUIRED_SPEC_SECTIONS) {
    recordFailure(failures, hasSection(specContent, phrase), `spec is missing required section containing "${phrase}".`);
  }
  for (const phrase of V21_REQUIRED_SPEC_APPENDIX_SECTIONS) {
    recordFailure(failures, hasSection(specContent, phrase), `spec is missing required appendix-grade section containing "${phrase}".`);
  }
  for (const phrase of V21_REQUIRED_PROOF_FAMILY_SECTIONS) {
    recordFailure(failures, hasSection(specContent, phrase), `spec proof-family catalog is missing "${phrase}".`);
  }
  for (const phrase of V21_REQUIRED_GENERATED_ARTIFACT_CATALOG_SECTIONS) {
    recordFailure(failures, hasSection(specContent, phrase), `spec generated-artifact catalog is missing "${phrase}".`);
  }
  for (const phrase of V21_REQUIRED_GENERATED_ARTIFACT_PATHS) {
    recordFailure(failures, containsPhrase(specContent, phrase), `spec generated-artifact catalog is missing "${phrase}".`);
  }
  for (const phrase of V21_REQUIRED_SUBSYSTEM_COVERAGE_PHRASES) {
    recordFailure(failures, containsPhrase(specContent, phrase), `spec subsystem totality coverage is missing "${phrase}".`);
  }
  const crossProductAppendix = extractSection(specContent, 'Appendix I. Scenario, workflow, and cross-product contract catalog');
  for (const phrase of V21_REQUIRED_CROSS_PRODUCT_APPENDIX_PHRASES) {
    recordFailure(
      failures,
      containsPhrase(crossProductAppendix, phrase),
      `spec scenario/workflow cross-product appendix is missing "${phrase}".`
    );
  }
  const failClosedAppendix = extractSection(specContent, 'Appendix J. Fail-closed contract and error posture matrix');
  for (const phrase of V21_REQUIRED_FAIL_CLOSED_APPENDIX_PHRASES) {
    recordFailure(
      failures,
      containsPhrase(failClosedAppendix, phrase),
      `spec fail-closed appendix is missing "${phrase}".`
    );
  }
  const deliverableAppendix = extractSection(specContent, 'Appendix K. Source-bearing deliverable and artifact contract catalog');
  for (const phrase of V21_REQUIRED_DELIVERABLE_APPENDIX_PHRASES) {
    recordFailure(
      failures,
      containsPhrase(deliverableAppendix, phrase),
      `spec deliverable/artifact appendix is missing "${phrase}".`
    );
  }

  const deltaContent = contents.delta || '';
  for (const phrase of ['Status', 'Why V21 exists', 'Accepted V21 decisions', 'Explicitly deferred', 'Pre-Implementation Sequence', 'Commit-Body Direction']) {
    recordFailure(failures, hasSection(deltaContent, phrase), `delta is missing required section containing "${phrase}".`);
  }

  const parityContent = contents.parity || '';
  for (const phrase of ['Status', 'Purpose', 'Audit basis', 'implementation matrix', 'accepted boundaries', 'completion condition']) {
    recordFailure(failures, hasSection(parityContent, phrase), `parity is missing required section containing "${phrase}".`);
  }
  const implementationMatrixRows = parseMarkdownTable(extractSection(parityContent, `${version} implementation matrix`));
  const implementationChecklistRows = parseMarkdownTable(extractSection(parityContent, `${version} implementation checklist`));
  for (const row of [...implementationMatrixRows, ...implementationChecklistRows]) {
    const rowLabel = row.Area || row.area || row['Required V21 result'] || row['required v21 result'] || 'unknown row';
    const judgment = row.Judgment || row.judgment || row['Current judgment'] || row['current judgment'] || '';
    recordFailure(
      failures,
      V21_ALLOWED_PARITY_JUDGMENTS.has(judgment),
      `parity row "${rowLabel}" uses unsupported judgment vocabulary: ${judgment || 'none'}`
    );
  }
  if (mode === 'promoted') {
    recordFailure(
      failures,
      implementationMatrixRows.length > 0,
      'parity promoted-mode validation requires a populated implementation matrix table.'
    );
    recordFailure(
      failures,
      implementationChecklistRows.length > 0,
      'parity promoted-mode validation requires a populated implementation checklist table.'
    );
    const forbiddenPromotedJudgment = /\bdrafted\b|\bpromotion pending\b|substantially advanced|source gap|generated artifact pending|blocked|reopened/i;
    for (const row of [...implementationMatrixRows, ...implementationChecklistRows]) {
      const rowLabel = row.Area || row.area || row['Required V21 result'] || row['required v21 result'] || 'unknown row';
      const judgment = row.Judgment || row.judgment || row['Current judgment'] || row['current judgment'] || '';
      recordFailure(
        failures,
        !forbiddenPromotedJudgment.test(judgment),
        `parity row "${rowLabel}" still carries non-closed promoted judgment: ${judgment || 'none'}`
      );
    }
  }

  return {
    reportId: 'v21-spec-family-report',
    checkedVersion: version,
    mode,
    currentTarget: expectedTarget,
    pointerVersion,
    repoRoot: resolvedRepoRoot,
    passed: failures.length === 0,
    failureCount: failures.length,
    failures,
    requiredFiles: Object.values(requiredFiles).map((filePath) => path.relative(resolvedRepoRoot, filePath)),
    supportFiles: Object.values(supportFiles).map((filePath) => path.relative(resolvedRepoRoot, filePath)),
    requiredStatusLabelCount: V21_REQUIRED_STATUS_LABELS.length,
    requiredPromotedStatusLabelCount: V21_REQUIRED_PROMOTED_STATUS_LABELS.length,
    requiredSpecSectionCount: V21_REQUIRED_SPEC_SECTIONS.length,
    requiredAppendixSectionCount: V21_REQUIRED_SPEC_APPENDIX_SECTIONS.length,
    requiredProofFamilyCount: V21_REQUIRED_PROOF_FAMILY_SECTIONS.length,
    requiredGeneratedArtifactCatalogSectionCount: V21_REQUIRED_GENERATED_ARTIFACT_CATALOG_SECTIONS.length,
    requiredGeneratedArtifactPathCount: V21_REQUIRED_GENERATED_ARTIFACT_PATHS.length,
    requiredSubsystemCoverageCount: V21_REQUIRED_SUBSYSTEM_COVERAGE_PHRASES.length,
    requiredCrossProductAppendixPhraseCount: V21_REQUIRED_CROSS_PRODUCT_APPENDIX_PHRASES.length,
    requiredFailClosedAppendixPhraseCount: V21_REQUIRED_FAIL_CLOSED_APPENDIX_PHRASES.length,
    requiredDeliverableAppendixPhraseCount: V21_REQUIRED_DELIVERABLE_APPENDIX_PHRASES.length
  };
}

/**
 * @param {string} repoRoot
 * @param {string} currentTarget
 */
function buildRequiredCanonicalArtifacts(repoRoot, currentTarget) {
  /** @type {string[]} */
  const artifacts = [];
  if (currentTarget === 'V19') {
    artifacts.push(
      '.engi/v19-contract-change-ledger.json',
      '.engi/v19-deterministic-replay-report.json',
      '.engi/v19-negative-proof-mutation-matrix.json',
      '.engi/v19-proof-member-semantic-matrix.json',
      '.engi/v19-state-machine-matrix.json',
      '.engi/v19-theorem-evidence-matrix.json',
      '.engi/v19-volatility-inventory.json'
    );
  }
  if (currentTarget === 'V20') {
    artifacts.push(
      '.engi/v20-operator-acceptance-transcript.json',
      '.engi/v20-visual-regression-report.json',
      '.engi/v20-accessibility-report.json',
      '.engi/v20-performance-budget-report.json',
      '.engi/v20-projection-quality-smoke-matrix.json',
      '.engi/v20-quality-summary.json'
    );
  }
  if (currentTarget === 'V21') {
    artifacts.push(...V21_REQUIRED_GENERATED_ARTIFACT_PATHS);
  }
  return artifacts.map((relativePath) => path.join(repoRoot, relativePath));
}

/**
 * @param {{
 *   repoRoot?: string,
 *   currentTarget?: string,
 *   skipPointerCheck?: boolean
 * }} [input={}]
 */
export function buildV21CanonicalInputReport({
  repoRoot = DEFAULT_V21_SPECIFYING_REPO_ROOT,
  currentTarget,
  skipPointerCheck = false
} = {}) {
  const resolvedRepoRoot = path.resolve(repoRoot);
  const pointerPath = path.join(resolvedRepoRoot, 'ENGI_SPEC.txt');
  const pointerVersion = readFileSync(pointerPath, 'utf8').trim();
  const checkedTarget = currentTarget || pointerVersion;

  /** @type {string[]} */
  const failures = [];
  if (!skipPointerCheck && pointerVersion !== checkedTarget) {
    failures.push(`ENGI_SPEC.txt points to ${pointerVersion || 'none'} but expected ${checkedTarget}.`);
  }

  const specPath = path.join(resolvedRepoRoot, `ENGI_SPEC_${checkedTarget}.md`);
  const provenPath = path.join(resolvedRepoRoot, `ENGI_SPEC_${checkedTarget}_PROVEN.md`);
  const parityCandidates = [
    path.join(resolvedRepoRoot, `ENGI_SPEC_${checkedTarget}_PARITY_MATRIX.md`),
    ...(Number(checkedTarget.slice(1)) < 21
      ? [path.join(resolvedRepoRoot, `ENGI_SPEC_${checkedTarget}_SYSTEM_PARITY_MATRIX.md`)]
      : [])
  ];
  const parityPath = parityCandidates.find((candidate) => fileExists(candidate)) || null;

  for (const filePath of [specPath, provenPath]) {
    if (!fileExists(filePath)) failures.push(`Missing canonical input file: ${path.relative(resolvedRepoRoot, filePath)}`);
  }
  if (!parityPath) {
    failures.push(`Missing canonical parity input for ${checkedTarget}; expected one of ${parityCandidates.map((candidate) => path.relative(resolvedRepoRoot, candidate)).join(', ')}`);
  }

  const artifactPaths = buildRequiredCanonicalArtifacts(resolvedRepoRoot, checkedTarget);
  for (const artifactPath of artifactPaths) {
    if (!fileExists(artifactPath)) failures.push(`Missing canonical generated artifact: ${path.relative(resolvedRepoRoot, artifactPath)}`);
  }

  return {
    reportId: 'v21-canonical-input-report',
    checkedTargetVersion: checkedTarget,
    pointerVersion,
    repoRoot: resolvedRepoRoot,
    passed: failures.length === 0,
    failureCount: failures.length,
    failures,
    specPath: path.relative(resolvedRepoRoot, specPath),
    provenPath: path.relative(resolvedRepoRoot, provenPath),
    parityPath: parityPath ? path.relative(resolvedRepoRoot, parityPath) : null,
    requiredGeneratedArtifactPaths: artifactPaths.map((artifactPath) => path.relative(resolvedRepoRoot, artifactPath)),
    requiredGeneratedArtifactCount: artifactPaths.length
  };
}

/**
 * @param {{
 *   version: string,
 *   proofSourceCommit: string,
 *   generatedAt: string,
 *   generatorId: string,
 *   worktreeState: string,
 *   specFamilyReport: ReturnType<typeof buildV21SpecFamilyReport>,
 *   canonicalInputReport: ReturnType<typeof buildV21CanonicalInputReport>
 * }} input
 */
export function buildV21GeneratedArtifactContents({
  version,
  proofSourceCommit,
  generatedAt,
  generatorId,
  worktreeState,
  specFamilyReport,
  canonicalInputReport
}) {
  const baseMetadata = {
    version,
    proofSourceCommit,
    generatedAt,
    generatorId,
    worktreeState
  };

  const specFamilyArtifact = {
    reportId: specFamilyReport.reportId,
    ...baseMetadata,
    checkedVersion: specFamilyReport.checkedVersion,
    mode: specFamilyReport.mode,
    currentTarget: specFamilyReport.currentTarget,
    pointerVersion: specFamilyReport.pointerVersion,
    passed: specFamilyReport.passed,
    failureCount: specFamilyReport.failureCount,
    failures: specFamilyReport.failures,
    requiredFiles: specFamilyReport.requiredFiles,
    supportFiles: specFamilyReport.supportFiles,
    requiredStatusLabelCount: specFamilyReport.requiredStatusLabelCount,
    requiredPromotedStatusLabelCount: specFamilyReport.requiredPromotedStatusLabelCount,
    requiredSpecSectionCount: specFamilyReport.requiredSpecSectionCount,
    requiredAppendixSectionCount: specFamilyReport.requiredAppendixSectionCount,
    requiredProofFamilyCount: specFamilyReport.requiredProofFamilyCount,
    requiredGeneratedArtifactCatalogSectionCount: specFamilyReport.requiredGeneratedArtifactCatalogSectionCount,
    requiredGeneratedArtifactPathCount: specFamilyReport.requiredGeneratedArtifactPathCount,
    requiredSubsystemCoverageCount: specFamilyReport.requiredSubsystemCoverageCount
  };

  const canonicalInputArtifact = {
    reportId: canonicalInputReport.reportId,
    ...baseMetadata,
    checkedTargetVersion: canonicalInputReport.checkedTargetVersion,
    pointerVersion: canonicalInputReport.pointerVersion,
    passed: canonicalInputReport.passed,
    failureCount: canonicalInputReport.failureCount,
    failures: canonicalInputReport.failures,
    specPath: canonicalInputReport.specPath,
    provenPath: canonicalInputReport.provenPath,
    parityPath: canonicalInputReport.parityPath,
    requiredGeneratedArtifactPaths: canonicalInputReport.requiredGeneratedArtifactPaths,
    requiredGeneratedArtifactCount: canonicalInputReport.requiredGeneratedArtifactCount
  };

  return {
    '.engi/v21-spec-family-report.json': `${JSON.stringify(specFamilyArtifact, null, 2)}\n`,
    '.engi/v21-canonical-input-report.json': `${JSON.stringify(canonicalInputArtifact, null, 2)}\n`
  };
}
