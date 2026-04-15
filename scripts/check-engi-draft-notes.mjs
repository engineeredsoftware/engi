#!/usr/bin/env node

import path from 'node:path';
import { readFileSync } from 'node:fs';

function parseArgs(argv) {
  /** @type {{ version?: string, currentTarget?: string, repoRoot?: string, help?: boolean }} */
  const args = {};
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--version') args.version = argv[++index];
    else if (arg === '--current-target') args.currentTarget = argv[++index];
    else if (arg === '--repo-root') args.repoRoot = argv[++index];
    else if (arg === '--help' || arg === '-h') args.help = true;
    else throw new Error(`Unknown argument ${arg}`);
  }
  return args;
}

function printHelp() {
  process.stdout.write(
    [
      'Usage: node scripts/check-engi-draft-notes.mjs --version V26 --current-target V25 [options]',
      '',
      'Options:',
      '  --version <VN>          Draft target version to validate.',
      '  --current-target <VN>   Active canon version the notes must point at.',
      '  --repo-root <path>      Override repo root.',
      '  --help                  Show this help.'
    ].join('\n')
  );
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }

  const version = String(args.version || '').trim().toUpperCase();
  const currentTarget = String(args.currentTarget || '').trim().toUpperCase();
  if (!version) throw new Error('Missing --version <VN>.');
  if (!currentTarget) throw new Error('Missing --current-target <VN>.');

  const repoRoot = path.resolve(args.repoRoot || path.resolve(import.meta.dirname, '..'));
  const notesPath = path.join(repoRoot, `ENGI_SPEC_${version}_NOTES.md`);
  const text = readFileSync(notesPath, 'utf8');

  /** @type {string[]} */
  const failures = [];

  const requiredPhrases = [
    `Spec ${version} Notes`,
    '## Status',
    `Canonical pointer: \`${path.join(repoRoot, 'ENGI_SPEC.txt')}\` -> \`${currentTarget}\``,
    `Active canonical anchor: \`${path.join(repoRoot, `ENGI_SPEC_${currentTarget}.md`)}\``,
    `Active generated proof appendix: \`${path.join(repoRoot, `ENGI_SPEC_${currentTarget}_PROVEN.md`)}\``,
    `${version} state: notes-only draft opening`,
    '## Notes-only draft rule',
    `## Deferred from ${currentTarget}`,
    'not first-gate',
    'Bitcoin',
    'GitHub',
    'compute',
    'storage',
    'build/process',
    '## Candidate V26 workstreams',
    '## Non-goals during V25 closure'
  ];

  for (const phrase of requiredPhrases) {
    if (!text.includes(phrase)) failures.push(`notes file is missing required phrase "${phrase}".`);
  }

  if (failures.length > 0) {
    process.stderr.write(`Bitcode draft notes check failed for ${version}\n`);
    for (const failure of failures) {
      process.stderr.write(`- ${failure}\n`);
    }
    process.exitCode = 1;
    return;
  }

  process.stdout.write(`Bitcode draft notes ok for ${version} currentTarget=${currentTarget}\n`);
}

try {
  main();
} catch (error) {
  const detail = error instanceof Error ? error.message : String(error);
  process.stderr.write(`${detail}\n`);
  process.exitCode = 1;
}
