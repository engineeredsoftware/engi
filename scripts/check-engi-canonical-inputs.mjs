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
  /** @type {{ currentTarget?: string, repoRoot?: string, skipPointerCheck?: boolean, help?: boolean }} */
  const args = {};
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--current-target') args.currentTarget = argv[++index];
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
      'Usage: node scripts/check-engi-canonical-inputs.mjs [options]',
      '',
      'Options:',
      '  --current-target <VN>   Active canonical target to validate. Defaults to ENGI_SPEC.txt.',
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
}

/**
 * @param {string} repoRoot
 * @param {string} currentTarget
 */
function buildRequiredArtifacts(repoRoot, currentTarget) {
  /** @type {string[]} */
  const paths = [];
  if (currentTarget === 'V19') {
    paths.push(
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
    paths.push(
      '.engi/v20-operator-acceptance-transcript.json',
      '.engi/v20-visual-regression-report.json',
      '.engi/v20-accessibility-report.json',
      '.engi/v20-performance-budget-report.json',
      '.engi/v20-projection-quality-smoke-matrix.json',
      '.engi/v20-quality-summary.json'
    );
  }
  return paths.map((relativePath) => path.join(repoRoot, relativePath));
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }

  const repoRoot = path.resolve(args.repoRoot || defaultRepoRoot);
  const pointerPath = path.join(repoRoot, 'ENGI_SPEC.txt');
  const pointerVersion = (await fs.readFile(pointerPath, 'utf8')).trim();
  const currentTarget = args.currentTarget || pointerVersion;
  assertVersion(currentTarget);

  /** @type {string[]} */
  const failures = [];
  if (!args.skipPointerCheck && pointerVersion !== currentTarget) {
    failures.push(`ENGI_SPEC.txt points to ${pointerVersion || 'none'} but expected ${currentTarget}.`);
  }

  const requiredFiles = [
    path.join(repoRoot, `ENGI_SPEC_${currentTarget}.md`),
    path.join(repoRoot, `ENGI_SPEC_${currentTarget}_PROVEN.md`)
  ];

  const parityCandidates = [
    path.join(repoRoot, `ENGI_SPEC_${currentTarget}_PARITY_MATRIX.md`)
  ];
  if (Number(currentTarget.slice(1)) < 21) {
    parityCandidates.push(path.join(repoRoot, `ENGI_SPEC_${currentTarget}_SYSTEM_PARITY_MATRIX.md`));
  }

  for (const filePath of requiredFiles) {
    try {
      await fs.access(filePath);
    } catch {
      failures.push(`Missing canonical input file: ${path.relative(repoRoot, filePath)}`);
    }
  }

  let resolvedParityPath = '';
  for (const candidate of parityCandidates) {
    try {
      await fs.access(candidate);
      resolvedParityPath = candidate;
      break;
    } catch {
      // continue
    }
  }
  if (!resolvedParityPath) {
    failures.push(
      `Missing canonical parity input for ${currentTarget}; expected one of ${parityCandidates.map((candidate) => path.relative(repoRoot, candidate)).join(', ')}`
    );
  }

  const requiredArtifacts = buildRequiredArtifacts(repoRoot, currentTarget);
  for (const artifactPath of requiredArtifacts) {
    try {
      await fs.access(artifactPath);
    } catch {
      failures.push(`Missing canonical generated artifact: ${path.relative(repoRoot, artifactPath)}`);
    }
  }

  if (failures.length) {
    process.stderr.write(`ENGI canonical input check failed for ${currentTarget}\n`);
    for (const failure of failures) {
      process.stderr.write(`- ${failure}\n`);
    }
    process.exitCode = 1;
    return;
  }

  process.stdout.write(
    [
      `ENGI canonical inputs ok for ${currentTarget}`,
      `pointer=${pointerVersion}`,
      `parity=${path.relative(repoRoot, resolvedParityPath)}`,
      `artifacts=${requiredArtifacts.length}`
    ].join(' ')
  );
  process.stdout.write('\n');
}

main().catch((error) => {
  const detail = error instanceof Error ? error.message : String(error);
  process.stderr.write(`${detail}\n`);
  process.exitCode = 1;
});
