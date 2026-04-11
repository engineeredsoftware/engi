#!/usr/bin/env node

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const defaultRepoRoot = path.resolve(__dirname, '..');

/**
 * @param {string[]} argv
 */
function parseArgs(argv) {
  /** @type {{
   *   version?: string,
   *   mode?: string,
   *   currentTarget?: string,
   *   repoRoot?: string,
   *   skipPointerCheck?: boolean,
   *   help?: boolean
   * }} */
  const args = {};
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--version') args.version = argv[++index];
    else if (arg === '--mode') args.mode = argv[++index];
    else if (arg === '--current-target') args.currentTarget = argv[++index];
    else if (arg === '--repo-root') args.repoRoot = argv[++index];
    else if (arg === '--skip-pointer-check') args.skipPointerCheck = true;
    else if (arg === '--help' || arg === '-h') args.help = true;
    else throw new Error(`Unknown argument ${arg}`);
  }
  return args;
}

function printHelp() {
  process.stdout.write(
    [
      'Usage: node scripts/check-engi-spec-family.mjs --version V21 [options]',
      '',
      'Options:',
      '  --version <VN>          Version to validate. V21+ currently supported.',
      '  --mode <draft|promoted> Validation mode. Defaults to draft.',
      '  --current-target <VN>   Expected `Current canonical/latest target` line. Defaults to ENGI_SPEC.txt in draft mode and the version in promoted mode.',
      '  --repo-root <path>      Override repo root for fixture testing.',
      '  --skip-pointer-check    Skip ENGI_SPEC.txt equality checking.',
      '  --help                  Show this help.'
    ].join('\n')
  );
}

/**
 * @param {string} value
 */
function assertVersion(value) {
  if (!/^V\d+$/.test(value)) {
    throw new Error(`Version must look like VN. Received ${value || 'none'}.`);
  }
  const numeric = Number(value.slice(1));
  if (!Number.isInteger(numeric) || numeric < 21) {
    throw new Error(`Spec-family checking is currently implemented for V21+. Received ${value}.`);
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
  return value.toLowerCase().replace(/[`*_]/g, '').replace(/\s+/g, ' ').trim();
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
 * @param {string[]} failures
 * @param {boolean} condition
 * @param {string} message
 */
function recordFailure(failures, condition, message) {
  if (!condition) failures.push(message);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }

  const version = args.version || '';
  assertVersion(version);
  const mode = args.mode || 'draft';
  if (!['draft', 'promoted'].includes(mode)) {
    throw new Error(`Unsupported mode ${mode}. Expected draft or promoted.`);
  }

  const repoRoot = path.resolve(args.repoRoot || defaultRepoRoot);
  const pointerPath = path.join(repoRoot, 'ENGI_SPEC.txt');
  const pointerVersion = (await fs.readFile(pointerPath, 'utf8')).trim();
  const expectedTarget = args.currentTarget || (mode === 'promoted' ? version : pointerVersion);

  const requiredFiles = {
    spec: path.join(repoRoot, `ENGI_SPEC_${version}.md`),
    delta: path.join(repoRoot, `ENGI_SPEC_${version}_DELTA.md`),
    parity: path.join(repoRoot, `ENGI_SPEC_${version}_PARITY_MATRIX.md`)
  };

  const supportFiles = {
    specifying: path.join(repoRoot, 'ENGI_SPECIFYING.md'),
    templateguide: path.join(repoRoot, 'ENGI_SPEC_TEMPLATEGUIDE.md')
  };

  /** @type {string[]} */
  const failures = [];

  for (const [label, filePath] of Object.entries(requiredFiles)) {
    try {
      await fs.access(filePath);
    } catch {
      failures.push(`Missing required ${label} file: ${path.relative(repoRoot, filePath)}`);
    }
  }

  for (const [label, filePath] of Object.entries(supportFiles)) {
    try {
      await fs.access(filePath);
    } catch {
      failures.push(`Missing required support file for V21+: ${label} at ${path.relative(repoRoot, filePath)}`);
    }
  }

  if (!args.skipPointerCheck) {
    recordFailure(
      failures,
      pointerVersion === expectedTarget,
      `ENGI_SPEC.txt points to ${pointerVersion || 'none'} but expected ${expectedTarget}.`
    );
  }

  /** @type {Record<string, string>} */
  const contents = {};
  for (const [label, filePath] of Object.entries(requiredFiles)) {
    if (failures.some((failure) => failure.includes(path.relative(repoRoot, filePath)))) continue;
    contents[label] = await fs.readFile(filePath, 'utf8');
  }

  if (await fs.stat(supportFiles.specifying).then(() => true).catch(() => false)) {
    const specifyingContent = await fs.readFile(supportFiles.specifying, 'utf8');
    recordFailure(
      failures,
      normalize(specifyingContent).includes('one complete specifying standard'),
      'ENGI_SPECIFYING.md does not state its singular specifying authority clearly enough.'
    );
  }

  if (await fs.stat(supportFiles.templateguide).then(() => true).catch(() => false)) {
    const templateguideContent = await fs.readFile(supportFiles.templateguide, 'utf8');
    recordFailure(
      failures,
      templateguideContent.includes('ENGI_SPECIFYING.md'),
      'ENGI_SPEC_TEMPLATEGUIDE.md does not point to ENGI_SPECIFYING.md.'
    );
  }

  for (const [label, content] of Object.entries(contents)) {
    const currentTarget = extractStatusValue(content, 'Current canonical/latest target');
    recordFailure(
      failures,
      currentTarget === `\`${expectedTarget}\`` || currentTarget === expectedTarget,
      `${label} status block must declare Current canonical/latest target as ${expectedTarget}.`
    );
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
  const requiredSpecSections = [
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
  for (const phrase of requiredSpecSections) {
    recordFailure(
      failures,
      hasSection(specContent, phrase),
      `spec is missing required section containing "${phrase}".`
    );
  }

  const requiredSpecAppendixSections = [
    'Appendix A. Canonical type and surface catalog',
    'Appendix B. Proof family closure catalog',
    'Appendix C. Generated artifact contract catalog',
    'Appendix D. Validation and checking gate catalog',
    'Appendix E. Current canonical source map',
    'Appendix F. Subsystem totality and derivability matrix'
  ];
  for (const phrase of requiredSpecAppendixSections) {
    recordFailure(
      failures,
      hasSection(specContent, phrase),
      `spec is missing required appendix-grade section containing "${phrase}".`
    );
  }

  const requiredProofFamilySections = [
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
  for (const phrase of requiredProofFamilySections) {
    recordFailure(
      failures,
      hasSection(specContent, phrase),
      `spec proof-family catalog is missing "${phrase}".`
    );
  }

  const requiredGeneratedArtifactCatalogSections = [
    'Inherited V19 reproducible-canon artifacts',
    'Inherited V20 operator-quality artifacts',
    'Shared generated-artifact fields',
    'Artifact-specific generated payload fields',
    'Artifact confidentiality and disclosability taxonomy'
  ];
  for (const phrase of requiredGeneratedArtifactCatalogSections) {
    recordFailure(
      failures,
      hasSection(specContent, phrase),
      `spec generated-artifact catalog is missing "${phrase}".`
    );
  }

  const requiredSubsystemCoveragePhrases = [
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
  for (const phrase of requiredSubsystemCoveragePhrases) {
    recordFailure(
      failures,
      containsPhrase(specContent, phrase),
      `spec subsystem totality coverage is missing "${phrase}".`
    );
  }

  const deltaContent = contents.delta || '';
  const requiredDeltaSections = [
    'Status',
    'Why V21 exists',
    'Accepted V21 decisions',
    'Explicitly deferred',
    'Pre-Implementation Sequence',
    'Commit-Body Direction'
  ];
  for (const phrase of requiredDeltaSections) {
    recordFailure(
      failures,
      hasSection(deltaContent, phrase),
      `delta is missing required section containing "${phrase}".`
    );
  }

  const parityContent = contents.parity || '';
  const requiredParitySections = [
    'Status',
    'Purpose',
    'Audit basis',
    'implementation matrix',
    'accepted boundaries',
    'completion condition'
  ];
  for (const phrase of requiredParitySections) {
    recordFailure(
      failures,
      hasSection(parityContent, phrase),
      `parity is missing required section containing "${phrase}".`
    );
  }

  if (failures.length) {
    process.stderr.write(`ENGI spec family check failed for ${version} (${mode})\n`);
    for (const failure of failures) {
      process.stderr.write(`- ${failure}\n`);
    }
    process.exitCode = 1;
    return;
  }

  process.stdout.write(
    [
      `ENGI spec family ok for ${version}`,
      `mode=${mode}`,
      `currentTarget=${expectedTarget}`,
      `pointer=${pointerVersion}`,
      `files=${Object.keys(requiredFiles).length}`
    ].join(' ')
  );
  process.stdout.write('\n');
}

main().catch((error) => {
  const detail = error instanceof Error ? error.message : String(error);
  process.stderr.write(`${detail}\n`);
  process.exitCode = 1;
});
