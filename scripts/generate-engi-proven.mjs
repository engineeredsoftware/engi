#!/usr/bin/env node

import { execFileSync } from 'node:child_process';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  PROVEN_GENERATOR_ID,
  defaultProvenOutputPath,
  generateCanonicalProvenMarkdown
} from '../packages/bitcode/src/canonical/proven-generator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

/**
 * @param {string[]} argv
 */
function parseArgs(argv) {
  /** @type {{
   *   version?: string,
   *   commit?: string,
   *   generatedAt?: string,
   *   worktreeState?: string,
   *   output?: string,
   *   check?: boolean,
   *   allowDirty?: boolean,
   *   stdout?: boolean,
   *   help?: boolean
   * }} */
  const args = {};

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--version') args.version = argv[++index];
    else if (arg === '--commit') args.commit = argv[++index];
    else if (arg === '--generated-at') args.generatedAt = argv[++index];
    else if (arg === '--worktree-state') args.worktreeState = argv[++index];
    else if (arg === '--output') args.output = argv[++index];
    else if (arg === '--check') args.check = true;
    else if (arg === '--allow-dirty') args.allowDirty = true;
    else if (arg === '--stdout') args.stdout = true;
    else if (arg === '--help' || arg === '-h') args.help = true;
    else throw new Error(`Unknown argument ${arg}`);
  }

  return args;
}

function printHelp() {
  process.stdout.write(
    [
      'Usage: node scripts/generate-engi-proven.mjs [options]',
      '',
      'Options:',
      '  --version <VN>         Override canonical version. Defaults to BITCODE_SPEC.txt.',
      '  --commit <sha>         Canonical commit to render. Defaults to HEAD.',
      '  --generated-at <iso>   Override generation timestamp. Defaults to commit recorded-at time.',
      '  --worktree-state <s>   Override recorded replay worktree state. Defaults to live git state.',
      '  --output <path>        Output markdown path. Defaults to ENGI_SPEC_VN_PROVEN.md.',
      '  --check                Fail if the target file differs from generator output.',
      '  --allow-dirty          Allow generation from a dirty worktree for preview use.',
      '  --stdout               Print markdown to stdout instead of writing a file.',
      '  --help                 Show this help.'
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

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }

  const dirty = git(['status', '--porcelain']);
  if (dirty && !args.allowDirty) {
    throw new Error('Refusing to generate _PROVEN_ from a dirty worktree. Use --allow-dirty for preview generation, or regenerate from a clean canonical commit.');
  }
  const liveWorktreeState = dirty ? 'dirty-preview' : 'clean';
  const worktreeState = args.worktreeState || liveWorktreeState;
  if (!['clean', 'dirty-preview'].includes(worktreeState)) {
    throw new Error(`Unsupported worktree state ${worktreeState}. Expected clean or dirty-preview.`);
  }

  const version = (args.version || (await fs.readFile(path.join(repoRoot, 'BITCODE_SPEC.txt'), 'utf8')).trim());
  if (!/^V\d+$/.test(version)) {
    throw new Error(`Resolved canonical version must look like VN. Received ${version}.`);
  }

  const canonicalCommit = args.commit || git(['rev-parse', 'HEAD']);
  const canonicalCommitRecordedAt = git(['show', '-s', '--format=%cI', canonicalCommit]);
  const generatedAt = args.generatedAt || canonicalCommitRecordedAt;
  const outputPath = path.resolve(repoRoot, args.output || defaultProvenOutputPath(version));

  const { data, markdown, artifacts = {} } = generateCanonicalProvenMarkdown({
    version,
    canonicalCommit,
    canonicalCommitRecordedAt,
    generatedAt,
    worktreeState,
    generatorId: PROVEN_GENERATOR_ID
  });

  if (args.stdout) {
    process.stdout.write(markdown);
    return;
  }

  if (args.check) {
    const existing = await fs.readFile(outputPath, 'utf8');
    if (existing !== markdown) {
      throw new Error(`_PROVEN_ is stale at ${outputPath}. Regenerate it for ${version} @ ${canonicalCommit}.`);
    }
    for (const [artifactPath, content] of Object.entries(artifacts)) {
      const resolvedArtifactPath = path.resolve(repoRoot, artifactPath);
      const existingArtifact = await fs.readFile(resolvedArtifactPath, 'utf8');
      if (existingArtifact !== content) {
        throw new Error(`Generated artifact is stale at ${resolvedArtifactPath}. Regenerate it for ${version} @ ${canonicalCommit}.`);
      }
    }
    process.stdout.write(`_PROVEN_ is current: ${path.relative(repoRoot, outputPath)}\n`);
    process.stdout.write(`generator=${data.generatorId} commit=${data.canonicalCommit} runs=${data.aggregate.runCount} artifacts=${Object.keys(artifacts).length}\n`);
    return;
  }

  await fs.writeFile(outputPath, markdown, 'utf8');
  for (const [artifactPath, content] of Object.entries(artifacts)) {
    const resolvedArtifactPath = path.resolve(repoRoot, artifactPath);
    await fs.mkdir(path.dirname(resolvedArtifactPath), { recursive: true });
    await fs.writeFile(resolvedArtifactPath, content, 'utf8');
  }
  process.stdout.write(`Wrote ${path.relative(repoRoot, outputPath)}\n`);
  if (Object.keys(artifacts).length) {
    process.stdout.write(`Wrote ${Object.keys(artifacts).length} generated artifacts\n`);
  }
  process.stdout.write(`generator=${data.generatorId} commit=${data.canonicalCommit} runs=${data.aggregate.runCount} fullyProven=${data.aggregate.fullyProven}\n`);
}

main().catch((error) => {
  const detail = error instanceof Error ? error.message : String(error);
  process.stderr.write(`${detail}\n`);
  process.exitCode = 1;
});
