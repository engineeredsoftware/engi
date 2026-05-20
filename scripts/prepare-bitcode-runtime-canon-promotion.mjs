#!/usr/bin/env node

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
  /** @type {{ version?: string, nextDraft?: string, repoRoot?: string, help?: boolean }} */
  const args = {};
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--version') args.version = argv[++index];
    else if (arg === '--next-draft') args.nextDraft = argv[++index];
    else if (arg === '--repo-root') args.repoRoot = argv[++index];
    else if (arg === '--help' || arg === '-h') args.help = true;
    else throw new Error(`Unknown argument ${arg}`);
  }
  return args;
}

function printHelp() {
  process.stdout.write(
    [
      'Usage: node scripts/prepare-bitcode-runtime-canon-promotion.mjs --version V26 [--next-draft V27] [--repo-root <path>]',
      '',
      'Rewrites the preserved protocol/runtime canon-posture surfaces for canonical promotion.'
    ].join('\n')
  );
}

/**
 * @param {string} version
 * @returns {string}
 */
function deriveNextDraft(version) {
  const numeric = Number(version.slice(1));
  if (!Number.isInteger(numeric) || numeric < 1) {
    throw new Error(`Version must look like VN. Received ${version || 'none'}.`);
  }
  return `V${numeric + 1}`;
}

function projectLabel(version) {
  return 'Bitcode';
}

function promotedProvenPath(version) {
  const numeric = Number(String(version || '').replace(/^V/u, ''));
  return Number.isInteger(numeric) && numeric >= 26
    ? `BITCODE_SPEC_${version}_PROVEN.md`
    : `_legacy/ENGI_SPEC_${version}_PROVEN.md`;
}

/**
 * @param {string} content
 * @param {string} version
 * @param {string} nextDraft
 */
function rewriteCanonPostureSource(content, version, nextDraft) {
  return content
    .replace(/export const ACTIVE_CANON_VERSION = 'V\d+';/, `export const ACTIVE_CANON_VERSION = '${version}';`)
    .replace(/export const DRAFT_TARGET_VERSION = 'V\d+';/, `export const DRAFT_TARGET_VERSION = '${nextDraft}';`);
}

/**
 * @param {string} content
 * @param {string} version
 * @param {string} nextDraft
 */
function rewriteReadme(content, version, nextDraft) {
  let rewritten = content;
  rewritten = rewritten.replace(
    /^# .+$/m,
    `# Bitcode Protocol Demonstration - ${version} canonical deterministic local prototype`
  );
  rewritten = rewritten.replace(
    /^This demo is governed by the active V\d+ canonical spec\.$/m,
    `This demo is governed by the active ${version} canonical spec.`
  );
  rewritten = rewritten.replace(
    /^- `BITCODE_SPEC\.txt -> V\d+`$/m,
    `- \`BITCODE_SPEC.txt -> ${version}\``
  );
  rewritten = rewritten.replace(
    /^- current generated appendix: `(?:BITCODE_SPEC_V\d+_PROVEN\.md|_legacy\/ENGI_SPEC_V\d+_PROVEN\.md)`$/m,
    `- current generated appendix: \`${promotedProvenPath(version)}\``
  );
  rewritten = rewritten.replace(
    /resolves to `V\d+`; V\d+ is the active draft target for MVP QA\./m,
    `resolves to \`${version}\`; ${nextDraft} is the next draft target after this promotion.`
  );
  rewritten = rewritten.replace(
    /`BITCODE_SPEC\.txt -> V\d+`\.\s+This demo is governed by the active V\d+ canonical\s+spec and `(?:BITCODE_SPEC_V\d+_PROVEN\.md|_legacy\/ENGI_SPEC_V\d+_PROVEN\.md)` as the current generated appendix\./m,
    `\`BITCODE_SPEC.txt -> ${version}\`. This demo is governed by the active ${version} canonical\nspec and \`${promotedProvenPath(version)}\` as the current generated appendix.`
  );
  rewritten = rewritten.replace(
    /^Active canon remains `V\d+`\.$/m,
    `Active canon remains \`${version}\`.`
  );
  rewritten = rewritten.replace(
    /^V\d+ is the next draft target after this promotion\.$/m,
    `${nextDraft} is the next draft target after this promotion.`
  );
  return rewritten;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }

  const version = args.version || '';
  if (!version) throw new Error('A --version is required.');
  if (!/^V\d+$/.test(version)) {
    throw new Error(`Version must look like VN. Received ${version}.`);
  }
  const nextDraft = args.nextDraft || deriveNextDraft(version);
  const resolvedRepoRoot = path.resolve(args.repoRoot || repoRoot);

  const canonPosturePath = path.join(resolvedRepoRoot, 'protocol-demonstration', 'src', 'canon-posture.js');
  const readmePath = path.join(resolvedRepoRoot, 'protocol-demonstration', 'README.md');

  const [canonPostureContent, readmeContent] = await Promise.all([
    fs.readFile(canonPosturePath, 'utf8'),
    fs.readFile(readmePath, 'utf8')
  ]);

  await Promise.all([
    fs.writeFile(canonPosturePath, rewriteCanonPostureSource(canonPostureContent, version, nextDraft), 'utf8'),
    fs.writeFile(readmePath, rewriteReadme(readmeContent, version, nextDraft), 'utf8')
  ]);

  process.stdout.write(
    `Prepared runtime canon posture for ${version} active canon and ${nextDraft} draft target\n`
  );
}

main().catch((error) => {
  const detail = error instanceof Error ? error.message : String(error);
  process.stderr.write(`${detail}\n`);
  process.exitCode = 1;
});
