// @ts-check

import { accessSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const DEFAULT_V21_SPECIFYING_REPO_ROOT = path.resolve(__dirname, '../../..');

export const COMMON_REQUIRED_SPEC_SECTIONS = [
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

export const COMMON_REQUIRED_STATUS_LABELS = [
  'Prior canonical anchor',
  'Prior generated proof appendix',
  'Generated structured artifact inventory',
  'Source parity state'
];

export const COMMON_REQUIRED_SPEC_APPENDIX_SECTIONS = [
  'Appendix A. Canonical type and surface catalog',
  'Appendix B. Proof family closure catalog',
  'Exact proof-family inventory matrix',
  'Appendix C. Generated artifact contract catalog',
  'Minimum generated appendix rendered contents',
  'Canonical regeneration and fail-closed posture',
  'Appendix D. Validation and checking gate catalog',
  'Appendix E. Current canonical source map',
  'Appendix F. Subsystem totality and derivability matrix',
  'Appendix G. Canonical file-family and promotion contract catalog',
  'Appendix H. Operator surface and quality contract catalog',
  'Appendix I. Scenario, workflow, and cross-product contract catalog',
  'Appendix J. Fail-closed contract and error posture matrix',
  'Appendix K. Source-bearing deliverable and artifact contract catalog'
];

export const COMMON_REQUIRED_PROOF_FAMILY_SECTIONS = [
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

export const COMMON_REQUIRED_PROOF_FAMILY_DETAIL_LABELS = [
  'proofArtifactPath:',
  'members:',
  'theoremIds:',
  'replayStepIds:',
  'witnessArtifactPaths:',
  'current member closure criteria:',
  'current member verdict shape:',
  'current theorem-by-theorem closure reading:',
  'current theorem-to-replay grouping:',
  'minimum artifact/replay binding set:',
  'current proof-object fields:',
  'generated-artifact and test bindings:',
  'fail-closed conditions:'
];

export const COMMON_REQUIRED_PROOF_FAMILY_MATRIX_HEADERS = [
  'proofFamily',
  'proofArtifactPath',
  'memberIds',
  'theoremIds',
  'replayStepIds',
  'witnessArtifactPaths',
  'Current source basis'
];

export const COMMON_REQUIRED_SUBSYSTEM_COVERAGE_PHRASES = [
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

export const COMMON_REQUIRED_SUBSYSTEM_SECTION_HEADINGS = [
  'Depositing and asset supply',
  'Needing and prompt/inference ownership',
  'Fit, recall, ranking, and verification',
  'Selection and materialization',
  'Identity, authorization, and sensitive flow',
  'Disclosure and projection',
  'Settlement and exact accounting',
  'Proof contract, witnesses, and replay'
];

export const COMMON_REQUIRED_SUBSYSTEM_DETAIL_LABELS = [
  'Current canonical objects and emitted artifacts',
  'Current algorithms and derivation rules',
  'Current invariants and fail-closed conditions',
  'Current proof obligations',
  'Current source-bearing implementation basis',
  'Current validating commands and parity basis',
  'Current accepted boundaries'
];

export const COMMON_REQUIRED_CROSS_PRODUCT_APPENDIX_PHRASES = [
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

export const COMMON_REQUIRED_FAIL_CLOSED_APPENDIX_PHRASES = [
  'invalid deposit',
  'prompt contract incompleteness',
  'parsed-envelope inadmissibility',
  'no-survivor asset pack',
  'authorization denial',
  'public projection overexposure',
  'settlement conservation drift',
  'stale promoted status truth'
];

export const COMMON_REQUIRED_GENERATED_APPENDIX_CONTRACT_PHRASES = [
  'aggregate proof verdict',
  'exact proof-family inventory',
  'exact per-family member inventory',
  'exact per-family theorem inventory',
  'exact replay-step inventories and theorem bindings',
  'witness artifact inventories',
  'generated artifact inventories',
  'scenario and run coverage matrices',
  'proof-source commit',
  'fail closed when'
];

const COMMON_ALLOWED_PARITY_JUDGMENTS = new Set([
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
 * @param {string} version
 */
function buildV21LikeProfile(version) {
  const versionLower = version.toLowerCase();
  return {
    reportId: `${versionLower}-spec-family-report`,
    defaultTarget: version,
    requiredStatusLabels: COMMON_REQUIRED_STATUS_LABELS,
    requiredPromotedStatusLabels: ['Canonical proof-source commit'],
    requiredSpecSections: COMMON_REQUIRED_SPEC_SECTIONS,
    requiredSpecAppendixSections: COMMON_REQUIRED_SPEC_APPENDIX_SECTIONS,
    requiredProofFamilySections: COMMON_REQUIRED_PROOF_FAMILY_SECTIONS,
    requiredProofFamilyDetailLabels: COMMON_REQUIRED_PROOF_FAMILY_DETAIL_LABELS,
    requiredProofFamilyMatrixHeaders: COMMON_REQUIRED_PROOF_FAMILY_MATRIX_HEADERS,
    requiredGeneratedArtifactCatalogSections: [
      'Inherited V19 reproducible-canon artifacts',
      'Inherited V20 operator-quality artifacts',
      'Exact generated-artifact inventory matrix',
      `${version} specifying generated artifacts`,
      'Shared generated-artifact fields',
      'Artifact-specific generated payload fields',
      'Artifact confidentiality and disclosability taxonomy',
      'Minimum generated appendix rendered contents',
      'Canonical regeneration and fail-closed posture'
    ],
    requiredGeneratedAppendixContractPhrases: COMMON_REQUIRED_GENERATED_APPENDIX_CONTRACT_PHRASES,
    requiredGeneratedArtifactPaths: [
      `.engi/${versionLower}-spec-family-report.json`,
      `.engi/${versionLower}-canonical-input-report.json`
    ],
    requiredSubsystemCoveragePhrases: COMMON_REQUIRED_SUBSYSTEM_COVERAGE_PHRASES,
    requiredSubsystemSectionHeadings: COMMON_REQUIRED_SUBSYSTEM_SECTION_HEADINGS,
    requiredSubsystemDetailLabels: COMMON_REQUIRED_SUBSYSTEM_DETAIL_LABELS,
    crossProductAppendixHeading: 'Appendix I. Scenario, workflow, and cross-product contract catalog',
    requiredCrossProductAppendixPhrases: COMMON_REQUIRED_CROSS_PRODUCT_APPENDIX_PHRASES,
    failClosedAppendixHeading: 'Appendix J. Fail-closed contract and error posture matrix',
    requiredFailClosedAppendixPhrases: COMMON_REQUIRED_FAIL_CLOSED_APPENDIX_PHRASES,
    deliverableAppendixHeading: 'Appendix K. Source-bearing deliverable and artifact contract catalog',
    requiredDeliverableAppendixPhrases: [
      '.engi/asset-pack.lock.json',
      '.engi/selected-source-material.json',
      '.engi/verification-report.json',
      '.engi/source-to-shares.json',
      '.engi/projection-policy.json',
      '.engi/system-proof-bundle.json',
      `ENGI_SPEC_${version}_PROVEN.md`
    ],
    requiredDeltaSections: [
      'Status',
      `Why ${version} exists`,
      `Accepted ${version} decisions`,
      'Explicitly deferred',
      'Pre-Implementation Sequence',
      'Commit-Body Direction'
    ],
    requiredParitySections: [
      'Status',
      'Purpose',
      'Audit basis',
      'implementation matrix',
      'accepted boundaries',
      'completion condition'
    ],
    forbiddenPhrases: []
  };
}

function buildV22Profile() {
  const base = buildV21LikeProfile('V22');
  return {
    ...base,
    requiredGeneratedArtifactCatalogSections: [
      'Inherited V19 reproducible-canon artifacts',
      'Inherited V20 operator-quality artifacts',
      'Exact generated-artifact inventory matrix',
      'V22 specifying generated artifacts',
      'V22 canon-posture drift detection artifact',
      'Shared generated-artifact fields',
      'Artifact-specific generated payload fields',
      'Artifact confidentiality and disclosability taxonomy',
      'Minimum generated appendix rendered contents',
      'Canonical regeneration and fail-closed posture'
    ],
    requiredGeneratedAppendixContractPhrases: [
      ...COMMON_REQUIRED_GENERATED_APPENDIX_CONTRACT_PHRASES,
      'canon posture drift report',
      'runtime/api/browser/readme/test alignment',
      'promotion-time runtime posture rewrite'
    ],
    requiredGeneratedArtifactPaths: [
      ...base.requiredGeneratedArtifactPaths,
      '.engi/v22-canon-posture-drift-report.json'
    ],
    requiredDeliverableAppendixPhrases: [
      ...base.requiredDeliverableAppendixPhrases,
      '.engi/v22-canon-posture-drift-report.json'
    ]
  };
}

function buildV20ProperProfile() {
  return {
    reportId: 'v20-proper-spec-family-report',
    defaultTarget: 'V20',
    requiredStatusLabels: COMMON_REQUIRED_STATUS_LABELS,
    requiredPromotedStatusLabels: [],
    requiredSpecSections: COMMON_REQUIRED_SPEC_SECTIONS,
    requiredSpecAppendixSections: COMMON_REQUIRED_SPEC_APPENDIX_SECTIONS,
    requiredProofFamilySections: COMMON_REQUIRED_PROOF_FAMILY_SECTIONS,
    requiredProofFamilyDetailLabels: COMMON_REQUIRED_PROOF_FAMILY_DETAIL_LABELS,
    requiredProofFamilyMatrixHeaders: COMMON_REQUIRED_PROOF_FAMILY_MATRIX_HEADERS,
    requiredGeneratedArtifactCatalogSections: [
      'Inherited V19 reproducible-canon artifacts',
      'V20 operator-quality artifacts',
      'Exact generated-artifact inventory matrix',
      'Shared generated-artifact fields',
      'Artifact-specific generated payload fields',
      'Artifact confidentiality and disclosability taxonomy',
      'V20 generated appendix posture',
      'Minimum generated appendix rendered contents',
      'Canonical regeneration and fail-closed posture'
    ],
    requiredGeneratedAppendixContractPhrases: COMMON_REQUIRED_GENERATED_APPENDIX_CONTRACT_PHRASES,
    requiredGeneratedArtifactPaths: [
      '.engi/v19-contract-change-ledger.json',
      '.engi/v19-negative-proof-mutation-matrix.json',
      '.engi/v19-proof-member-semantic-matrix.json',
      '.engi/v19-theorem-evidence-matrix.json',
      '.engi/v19-state-machine-matrix.json',
      '.engi/v19-deterministic-replay-report.json',
      '.engi/v19-volatility-inventory.json',
      '.engi/v20-operator-acceptance-transcript.json',
      '.engi/v20-visual-regression-report.json',
      '.engi/v20-accessibility-report.json',
      '.engi/v20-performance-budget-report.json',
      '.engi/v20-projection-quality-smoke-matrix.json',
      '.engi/v20-quality-summary.json',
      'ENGI_SPEC_V20_PROVEN.md'
    ],
    requiredSubsystemCoveragePhrases: COMMON_REQUIRED_SUBSYSTEM_COVERAGE_PHRASES,
    requiredSubsystemSectionHeadings: COMMON_REQUIRED_SUBSYSTEM_SECTION_HEADINGS,
    requiredSubsystemDetailLabels: COMMON_REQUIRED_SUBSYSTEM_DETAIL_LABELS,
    crossProductAppendixHeading: 'Appendix I. Scenario, workflow, and cross-product contract catalog',
    requiredCrossProductAppendixPhrases: [
      'auth-issuer-rollback',
      'privacy-boundary-proof-export',
      'polyglot-gateway-benchmark-remediation',
      'auth-many-asset-normalization',
      'targeted-branch-run',
      'normalization-branch-run',
      'patch',
      'context',
      'public',
      'buyer',
      'reviewer',
      'internal',
      'seeded-shell-posture',
      'generated-appendix-report-discovery'
    ],
    failClosedAppendixHeading: 'Appendix J. Fail-closed contract and error posture matrix',
    requiredFailClosedAppendixPhrases: [
      'invalid deposit',
      'prompt contract incompleteness',
      'parsed-envelope inadmissibility',
      'no-survivor asset pack',
      'authorization denial',
      'public projection overexposure',
      'settlement conservation drift'
    ],
    deliverableAppendixHeading: 'Appendix K. Source-bearing deliverable and artifact contract catalog',
    requiredDeliverableAppendixPhrases: [
      '.engi/asset-pack.lock.json',
      '.engi/selected-source-material.json',
      '.engi/verification-report.json',
      '.engi/source-to-shares.json',
      '.engi/projection-policy.json',
      '.engi/system-proof-bundle.json',
      'ENGI_SPEC_V20_PROVEN.md'
    ],
    requiredDeltaSections: [
      'Status',
      'Why V20_PROPER exists',
      'Accepted V20_PROPER decisions',
      'Explicitly excluded future truth',
      'Reconstruction sequence',
      'Validation direction'
    ],
    requiredParitySections: [
      'Status',
      'Purpose',
      'Audit basis',
      'implementation matrix',
      'accepted boundaries',
      'completion condition'
    ],
    forbiddenPhrases: [
      '.engi/v21-spec-family-report.json',
      '.engi/v21-canonical-input-report.json',
      'ENGI_SPEC_V21_PROVEN.md'
    ]
  };
}

/**
 * @param {string} version
 */
function resolveSpecFamilyProfile(version) {
  if (version === 'V20_PROPER') {
    return buildV20ProperProfile();
  }
  if (version === 'V22') {
    return buildV22Profile();
  }
  if (!/^V\d+$/.test(version)) {
    throw new Error(`Version must look like VN or match a supported reconstruction family. Received ${version || 'none'}.`);
  }
  const numeric = Number(version.slice(1));
  if (!Number.isInteger(numeric) || numeric < 21) {
    throw new Error(`Spec-family checks are implemented for V21+ and V20_PROPER. Received ${version}.`);
  }
  return buildV21LikeProfile(version);
}

/**
 * @param {string} content
 * @param {string} label
 */
function extractStatusValue(content, label) {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = content.match(new RegExp(`^- ${escaped}: (.+)$`, 'm'));
  const value = match?.[1];
  return typeof value === 'string' ? value.trim() : null;
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
    const line = lines[index];
    if (typeof line !== 'string') continue;
    const match = line.match(/^(#{2,6})\s+(.+)$/);
    if (!match) continue;
    const heading = match[2];
    const markers = match[1];
    if (typeof heading !== 'string' || typeof markers !== 'string') continue;
    if (normalize(heading).includes(normalizedPhrase)) {
      start = index + 1;
      level = markers.length;
      break;
    }
  }
  if (start < 0) return '';
  let end = lines.length;
  for (let index = start; index < lines.length; index += 1) {
    const line = lines[index];
    if (typeof line !== 'string') continue;
    const match = line.match(/^(#{2,6})\s+(.+)$/);
    if (!match) continue;
    const markers = match[1];
    if (typeof markers !== 'string') continue;
    if (markers.length <= level) {
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
  const headerLine = lines[0];
  if (typeof headerLine !== 'string') return [];
  const headers = headerLine
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
 * @param {string} section
 */
function parseMarkdownTableHeaders(section) {
  const lines = section
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('|'));
  if (lines.length < 2) return [];
  const headerLine = lines[0];
  if (typeof headerLine !== 'string') return [];
  return headerLine
    .split('|')
    .slice(1, -1)
    .map((cell) => cell.trim());
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
  const profile = resolveSpecFamilyProfile(version);
  const resolvedRepoRoot = path.resolve(repoRoot);
  const pointerPath = path.join(resolvedRepoRoot, 'ENGI_SPEC.txt');
  const pointerVersion = readFileSync(pointerPath, 'utf8').trim();
  const expectedTarget = currentTarget || (mode === 'promoted' ? profile.defaultTarget : pointerVersion);

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
    if (!fileExists(filePath)) failures.push(`Missing required support file for full-canon spec families: ${label} at ${path.relative(resolvedRepoRoot, filePath)}`);
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
    for (const statusLabel of profile.requiredStatusLabels) {
      recordFailure(
        failures,
        typeof extractStatusValue(content, statusLabel) === 'string',
        `${label} status block is missing a ${statusLabel} line.`
      );
    }
    if (mode === 'promoted') {
      for (const statusLabel of profile.requiredPromotedStatusLabels) {
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

  const specContent = contents['spec'] || '';
  for (const phrase of profile.requiredSpecSections) {
    recordFailure(failures, hasSection(specContent, phrase), `spec is missing required section containing "${phrase}".`);
  }
  for (const phrase of profile.requiredSpecAppendixSections) {
    recordFailure(failures, hasSection(specContent, phrase), `spec is missing required appendix-grade section containing "${phrase}".`);
  }
  for (const phrase of profile.requiredProofFamilySections) {
    recordFailure(failures, hasSection(specContent, phrase), `spec proof-family catalog is missing "${phrase}".`);
  }
  const proofFamilyInventorySection = extractSection(specContent, 'Exact proof-family inventory matrix');
  const proofFamilyInventoryHeaders = parseMarkdownTableHeaders(proofFamilyInventorySection);
  for (const header of profile.requiredProofFamilyMatrixHeaders || []) {
    recordFailure(
      failures,
      proofFamilyInventoryHeaders.includes(header),
      `spec proof-family inventory matrix is missing required header "${header}".`
    );
  }
  for (const familyHeading of profile.requiredProofFamilySections) {
    const familySection = extractSection(specContent, familyHeading);
    for (const detailLabel of profile.requiredProofFamilyDetailLabels || []) {
      recordFailure(
        failures,
        containsPhrase(familySection, detailLabel),
        `spec proof-family section "${familyHeading}" is missing "${detailLabel}".`
      );
    }
  }
  for (const phrase of profile.requiredGeneratedArtifactCatalogSections) {
    recordFailure(failures, hasSection(specContent, phrase), `spec generated-artifact catalog is missing "${phrase}".`);
  }
  for (const phrase of profile.requiredGeneratedAppendixContractPhrases || []) {
    recordFailure(
      failures,
      containsPhrase(specContent, phrase),
      `spec generated-appendix contract is missing "${phrase}".`
    );
  }
  for (const phrase of profile.requiredGeneratedArtifactPaths) {
    recordFailure(failures, containsPhrase(specContent, phrase), `spec generated-artifact catalog is missing "${phrase}".`);
  }
  for (const phrase of profile.requiredSubsystemCoveragePhrases) {
    recordFailure(failures, containsPhrase(specContent, phrase), `spec subsystem totality coverage is missing "${phrase}".`);
  }
  for (const heading of profile.requiredSubsystemSectionHeadings) {
    const section = extractSection(specContent, heading);
    recordFailure(failures, section.length > 0, `spec canonical subsystem surfaces is missing subsystem section "${heading}".`);
    for (const label of profile.requiredSubsystemDetailLabels) {
      recordFailure(
        failures,
        containsPhrase(section, label),
        `spec subsystem section "${heading}" is missing "${label}".`
      );
    }
  }
  const crossProductAppendix = extractSection(specContent, profile.crossProductAppendixHeading);
  for (const phrase of profile.requiredCrossProductAppendixPhrases) {
    recordFailure(
      failures,
      containsPhrase(crossProductAppendix, phrase),
      `spec scenario/workflow cross-product appendix is missing "${phrase}".`
    );
  }
  const failClosedAppendix = extractSection(specContent, profile.failClosedAppendixHeading);
  for (const phrase of profile.requiredFailClosedAppendixPhrases) {
    recordFailure(
      failures,
      containsPhrase(failClosedAppendix, phrase),
      `spec fail-closed appendix is missing "${phrase}".`
    );
  }
  const deliverableAppendix = extractSection(specContent, profile.deliverableAppendixHeading);
  for (const phrase of profile.requiredDeliverableAppendixPhrases) {
    recordFailure(
      failures,
      containsPhrase(deliverableAppendix, phrase),
      `spec deliverable/artifact appendix is missing "${phrase}".`
    );
  }
  for (const phrase of profile.forbiddenPhrases) {
    for (const [label, content] of Object.entries(contents)) {
      recordFailure(
        failures,
        !containsPhrase(content, phrase),
        `${label} must not import future/non-canonical phrase "${phrase}".`
      );
    }
  }

  const deltaContent = contents['delta'] || '';
  for (const phrase of profile.requiredDeltaSections) {
    recordFailure(failures, hasSection(deltaContent, phrase), `delta is missing required section containing "${phrase}".`);
  }

  const parityContent = contents['parity'] || '';
  for (const phrase of profile.requiredParitySections) {
    recordFailure(failures, hasSection(parityContent, phrase), `parity is missing required section containing "${phrase}".`);
  }
  const implementationMatrixRows = parseMarkdownTable(extractSection(parityContent, `${version} implementation matrix`));
  const implementationChecklistRows = parseMarkdownTable(extractSection(parityContent, `${version} implementation checklist`));
  for (const row of [...implementationMatrixRows, ...implementationChecklistRows]) {
    const rowLabel = row['Area'] || row['area'] || row['Required V21 result'] || row['required v21 result'] || 'unknown row';
    const judgment = row['Judgment'] || row['judgment'] || row['Current judgment'] || row['current judgment'] || '';
    recordFailure(
      failures,
      COMMON_ALLOWED_PARITY_JUDGMENTS.has(judgment),
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
      const rowLabel = row['Area'] || row['area'] || row['Required V21 result'] || row['required v21 result'] || 'unknown row';
      const judgment = row['Judgment'] || row['judgment'] || row['Current judgment'] || row['current judgment'] || '';
      recordFailure(
        failures,
        !forbiddenPromotedJudgment.test(judgment),
        `parity row "${rowLabel}" still carries non-closed promoted judgment: ${judgment || 'none'}`
      );
    }
  }

  return {
    reportId: profile.reportId,
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
    requiredStatusLabelCount: profile.requiredStatusLabels.length,
    requiredPromotedStatusLabelCount: profile.requiredPromotedStatusLabels.length,
    requiredSpecSectionCount: profile.requiredSpecSections.length,
    requiredAppendixSectionCount: profile.requiredSpecAppendixSections.length,
    requiredProofFamilyCount: profile.requiredProofFamilySections.length,
    requiredProofFamilyDetailLabelCount: (profile.requiredProofFamilyDetailLabels || []).length,
    requiredProofFamilyMatrixHeaderCount: (profile.requiredProofFamilyMatrixHeaders || []).length,
    requiredGeneratedArtifactCatalogSectionCount: profile.requiredGeneratedArtifactCatalogSections.length,
    requiredGeneratedAppendixContractPhraseCount: (profile.requiredGeneratedAppendixContractPhrases || []).length,
    requiredGeneratedArtifactPathCount: profile.requiredGeneratedArtifactPaths.length,
    requiredSubsystemCoverageCount: profile.requiredSubsystemCoveragePhrases.length,
    requiredSubsystemSectionCount: profile.requiredSubsystemSectionHeadings.length,
    requiredSubsystemDetailLabelCount: profile.requiredSubsystemDetailLabels.length,
    requiredCrossProductAppendixPhraseCount: profile.requiredCrossProductAppendixPhrases.length,
    requiredFailClosedAppendixPhraseCount: profile.requiredFailClosedAppendixPhrases.length,
    requiredDeliverableAppendixPhraseCount: profile.requiredDeliverableAppendixPhrases.length
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
    artifacts.push(...buildV21LikeProfile('V21').requiredGeneratedArtifactPaths);
  }
  if (currentTarget === 'V22') {
    artifacts.push(...buildV22Profile().requiredGeneratedArtifactPaths);
  }
  return artifacts.map((relativePath) => path.join(repoRoot, relativePath));
}

/**
 * @param {{
 *   repoRoot?: string,
 *   currentTarget?: string,
 *   reportVersion?: string,
 *   assumeExistingRelativePaths?: string[],
 *   skipPointerCheck?: boolean
 * }} [input={}]
 */
export function buildV21CanonicalInputReport({
  repoRoot = DEFAULT_V21_SPECIFYING_REPO_ROOT,
  currentTarget,
  reportVersion,
  assumeExistingRelativePaths = [],
  skipPointerCheck = false
} = {}) {
  const resolvedRepoRoot = path.resolve(repoRoot);
  const pointerPath = path.join(resolvedRepoRoot, 'ENGI_SPEC.txt');
  const pointerVersion = readFileSync(pointerPath, 'utf8').trim();
  const checkedTarget = currentTarget || pointerVersion;
  const resolvedReportVersion = reportVersion || (checkedTarget === 'V22' ? 'V22' : 'V21');
  const assumedExistingPaths = new Set(
    assumeExistingRelativePaths.map((relativePath) => path.resolve(resolvedRepoRoot, relativePath))
  );

  /**
   * @param {string} filePath
   */
  function existsOrAssumed(filePath) {
    return assumedExistingPaths.has(path.resolve(filePath)) || fileExists(filePath);
  }

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
  const parityPath = parityCandidates.find((candidate) => existsOrAssumed(candidate)) || null;

  for (const filePath of [specPath, provenPath]) {
    if (!existsOrAssumed(filePath)) failures.push(`Missing canonical input file: ${path.relative(resolvedRepoRoot, filePath)}`);
  }
  if (!parityPath) {
    failures.push(`Missing canonical parity input for ${checkedTarget}; expected one of ${parityCandidates.map((candidate) => path.relative(resolvedRepoRoot, candidate)).join(', ')}`);
  }

  const artifactPaths = buildRequiredCanonicalArtifacts(resolvedRepoRoot, checkedTarget);
  for (const artifactPath of artifactPaths) {
    if (!existsOrAssumed(artifactPath)) failures.push(`Missing canonical generated artifact: ${path.relative(resolvedRepoRoot, artifactPath)}`);
  }

  return {
    reportId: `${resolvedReportVersion.toLowerCase()}-canonical-input-report`,
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
  const versionLower = version.toLowerCase();
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
    [`.engi/${versionLower}-spec-family-report.json`]: `${JSON.stringify(specFamilyArtifact, null, 2)}\n`,
    [`.engi/${versionLower}-canonical-input-report.json`]: `${JSON.stringify(canonicalInputArtifact, null, 2)}\n`
  };
}
