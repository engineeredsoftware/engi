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
      'Usage: npm run promote:canon -- --version V19 --commit <proof-source-commit> [--dry-run]',
      '',
      'Options:',
      '  --version <VN>           Canonical version to promote. V19 is the current accepted target.',
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
  return [
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
    ['npm', ['--prefix', 'engi-demo', 'run', 'test:contract-ledger']],
    ['npm', ['--prefix', 'engi-demo', 'test']],
    ['node', ['scripts/generate-engi-proven.mjs', '--version', version, '--commit', commit, '--output', `ENGI_SPEC_${version}_PROVEN.md`, '--allow-dirty']],
    ['node', ['scripts/generate-engi-proven.mjs', '--version', version, '--commit', commit, '--output', `ENGI_SPEC_${version}_PROVEN.md`, '--check', '--allow-dirty']],
    ['git', ['diff', '--check']]
  ];
}

/**
 * @param {string} version
 * @param {string} commit
 */
function buildCommitMessageBody(version, commit) {
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

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }

  const version = args.version || '';
  if (version !== 'V19') {
    throw new Error(`V19 promotion command currently accepts --version V19. Received ${version || 'none'}.`);
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
  process.stdout.write(`V19 canonical promotion plan for ${resolvedCommit}\n`);
  for (const [file, commandArgs] of commands) {
    process.stdout.write(`- ${renderCommand(file, commandArgs)}\n`);
  }
  process.stdout.write('\nCanonical commit message body:\n');
  process.stdout.write(buildCommitMessageBody(version, resolvedCommit));
  process.stdout.write('\n');

  if (args.dryRun) return;

  for (const [file, commandArgs] of commands.slice(0, 12)) {
    execFileSync(file, commandArgs, { cwd: repoRoot, stdio: 'inherit' });
  }
  await fs.writeFile(path.join(repoRoot, 'ENGI_SPEC.txt'), `${version}\n`, 'utf8');
  for (const [file, commandArgs] of commands.slice(12)) {
    execFileSync(file, commandArgs, { cwd: repoRoot, stdio: 'inherit' });
  }
}

main().catch((error) => {
  const detail = error instanceof Error ? error.message : String(error);
  process.stderr.write(`${detail}\n`);
  process.exitCode = 1;
});
