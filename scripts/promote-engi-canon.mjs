#!/usr/bin/env node

import { execFileSync } from 'node:child_process';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

/**
 * @param {string[]} argv
 */
function parseArgs(argv) {
  /** @type {{ version?: string, commit?: string, dryRun?: boolean, allowDirtyStart?: boolean, help?: boolean }} */
  const args = {};
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--version') args.version = argv[++index];
    else if (arg === '--commit') args.commit = argv[++index];
    else if (arg === '--dry-run') args.dryRun = true;
    else if (arg === '--allow-dirty-start') args.allowDirtyStart = true;
    else if (arg === '--help' || arg === '-h') args.help = true;
    else throw new Error(`Unknown argument ${arg}`);
  }
  return args;
}

function printHelp() {
  process.stdout.write(
    [
      'Usage: npm run promote:canon -- --version V20 --commit <proof-source-commit> [--dry-run]',
      '',
      'Options:',
      '  --version <VN>           Canonical version to promote. Accepted targets: V19, V20.',
      '  --commit <sha>           Proof-source commit to render into the generated appendix.',
      '  --dry-run                Print the promotion plan without executing commands or writing files.',
      '  --allow-dirty-start      Permit a dirty worktree before promotion. Not for canonical use.',
      '  --help                   Show this help.'
    ].join('\n')
  );
}

/**
 * @param {string[]} args
 * @returns {string}
 */
function git(args) {
  return execFileSync('git', args, {
    cwd: repoRoot,
    encoding: 'utf8'
  }).trim();
}

/**
 * @param {string} file
 * @param {string[]} args
 * @returns {string}
 */
function renderCommand(file, args) {
  return [file, ...args].join(' ');
}

/**
 * @param {string} version
 * @param {string} commit
 */
function buildCommandPlan(version, commit) {
  const inheritedProofCommands = [
    ['npm', ['--prefix', 'engi-demo', 'run', 'typecheck']],
    ['npm', ['--prefix', 'engi-demo', 'run', 'test:unit']],
    ['npm', ['--prefix', 'engi-demo', 'run', 'test:integration']],
    ['npm', ['--prefix', 'engi-demo', 'run', 'test:e2e']],
    ['npm', ['--prefix', 'engi-demo', 'run', 'test:proof-member-matrix']],
    ['npm', ['--prefix', 'engi-demo', 'run', 'test:theorem-evidence-matrix']],
    ['npm', ['--prefix', 'engi-demo', 'run', 'test:state-machine']],
    ['npm', ['--prefix', 'engi-demo', 'run', 'test:deterministic-replay']],
    ['npm', ['--prefix', 'engi-demo', 'run', 'test:volatility']],
    ['npm', ['--prefix', 'engi-demo', 'run', 'test:negative-mutation-matrix']],
    ['npm', ['--prefix', 'engi-demo', 'run', 'test:contract-ledger']]
  ];
  const v20QualityCommands = [
    ['npm', ['--prefix', 'engi-demo', 'run', 'test:v20-operator-transcript']],
    ['npm', ['--prefix', 'engi-demo', 'run', 'test:v20-accessibility']],
    ['npm', ['--prefix', 'engi-demo', 'run', 'test:v20-visual']],
    ['npm', ['--prefix', 'engi-demo', 'run', 'test:v20-performance']],
    ['npm', ['--prefix', 'engi-demo', 'run', 'test:v20-projection-quality']],
    ['npm', ['--prefix', 'engi-demo', 'run', 'test:v20-quality-summary']]
  ];
  const generatedCommands = [
    ['node', ['scripts/generate-engi-proven.mjs', '--version', version, '--commit', commit, '--worktree-state', 'clean', '--output', `ENGI_SPEC_${version}_PROVEN.md`, '--allow-dirty']],
    ['node', ['scripts/generate-engi-proven.mjs', '--version', version, '--commit', commit, '--worktree-state', 'clean', '--output', `ENGI_SPEC_${version}_PROVEN.md`, '--check', '--allow-dirty']],
    ['git', ['diff', '--check']]
  ];
  if (version === 'V19') {
    return [
      ...inheritedProofCommands,
      ['npm', ['--prefix', 'engi-demo', 'test']],
      ...generatedCommands
    ];
  }
  if (version === 'V20') {
    return [
      ...inheritedProofCommands,
      ...v20QualityCommands,
      ['npm', ['--prefix', 'engi-demo', 'test']],
      ...generatedCommands
    ];
  }
  throw new Error(`Unsupported promotion target ${version}. Expected V19 or V20.`);
}

/**
 * @param {string} version
 * @param {string} commit
 */
function buildCommitMessageBody(version, commit) {
  if (version === 'V19') {
    return [
      `Promotes ${version} as reproducible canonical proof output for ENGI.`,
      '',
      `Proof-source commit: ${commit}`,
      '',
      'The promotion closes the V19 first gate:',
      '- deterministic replay report generation and byte equality checking',
      '- volatility inventory for canonical proof artifacts',
      '- committed generated positive matrix artifacts under V19 names',
      '- representative negative proof mutation matrix with omitted cross-products',
      '- generated V18-to-V19 contract-change ledger',
      '- generated-only V19 _PROVEN_ appendix with immediate check mode',
      '- canonical promotion command sequencing for future version bumps'
    ].join('\n');
  }
  if (version === 'V20') {
    return [
      `Promotes ${version} as operator-quality canon for ENGI.`,
      '',
      `Proof-source commit: ${commit}`,
      '',
      'The promotion closes the V20 first gate:',
      '- truthful browser posture for V19 active canon, V20 draft target, and inherited V16/V17/V18/V19 surfaces',
      '- generated operator acceptance transcript over required proof-bearing workflows',
      '- deterministic DOM/geometry visual regression signatures for required operator states',
      '- deterministic accessibility budget covering labels, focus, keyboard operation, live status, landmarks, toggles, contrast, reduced motion, and projection safety',
      '- normalized local performance budget report without raw wall-clock samples in canonical bytes',
      '- projection-quality smoke matrix for public, reviewer, buyer, and internal principals',
      '- generated V20 quality summary and generated-only V20 _PROVEN_ appendix',
      '- inherited V19 reproducible proof closure and promotion gates preserved before pointer advancement'
    ].join('\n');
  }
  throw new Error(`Unsupported promotion target ${version}. Expected V19 or V20.`);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }

  const version = args.version || '';
  if (!['V19', 'V20'].includes(version)) {
    throw new Error(`Canonical promotion accepts --version V19 or V20. Received ${version || 'none'}.`);
  }
  const commit = args.commit || '';
  if (!commit) {
    throw new Error('A proof-source --commit is required.');
  }

  const resolvedCommit = git(['rev-parse', commit]);
  const dirty = git(['status', '--porcelain']);
  if (dirty && !args.dryRun && !args.allowDirtyStart) {
    throw new Error('Refusing canonical promotion from a dirty worktree. Commit or stash changes first, or use --allow-dirty-start for preview use.');
  }

  const commands = buildCommandPlan(version, resolvedCommit);
  process.stdout.write(`${version} canonical promotion plan for ${resolvedCommit}\n`);
  for (const [file, commandArgs] of commands) {
    process.stdout.write(`- ${renderCommand(file, commandArgs)}\n`);
  }
  process.stdout.write('\nCanonical commit message body:\n');
  process.stdout.write(buildCommitMessageBody(version, resolvedCommit));
  process.stdout.write('\n');

  if (args.dryRun) return;

  const generatedCommandIndex = commands.findIndex(([file, commandArgs]) => file === 'node' && commandArgs[0] === 'scripts/generate-engi-proven.mjs');
  if (generatedCommandIndex < 0) {
    throw new Error('Promotion command plan does not contain a generated appendix command.');
  }

  for (const [file, commandArgs] of commands.slice(0, generatedCommandIndex)) {
    execFileSync(file, commandArgs, { cwd: repoRoot, stdio: 'inherit' });
  }
  await fs.writeFile(path.join(repoRoot, 'ENGI_SPEC.txt'), `${version}\n`, 'utf8');
  for (const [file, commandArgs] of commands.slice(generatedCommandIndex)) {
    execFileSync(file, commandArgs, { cwd: repoRoot, stdio: 'inherit' });
  }
}

main().catch((error) => {
  const detail = error instanceof Error ? error.message : String(error);
  process.stderr.write(`${detail}\n`);
  process.exitCode = 1;
});
