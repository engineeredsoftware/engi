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
      'Usage: node scripts/prepare-engi-runtime-canon-promotion.mjs --version V23 [--next-draft V24] [--repo-root <path>]',
      '',
      'Rewrites the runtime/demo canon-posture surfaces for canonical promotion.'
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
  const numeric = Number(String(version || '').replace(/^V/u, ''));
  return Number.isInteger(numeric) && numeric >= 25 ? 'Bitcode' : 'ENGI';
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
 * @param {string} resolvedRepoRoot
 * @param {string} version
 * @param {string} nextDraft
 */
function rewriteReadme(content, resolvedRepoRoot, version, nextDraft) {
  let rewritten = content;
  const projectName = projectLabel(version);
  rewritten = rewritten.replace(
    /^# (?:ENGI|Bitcode) Package - V\d+ canonical first-gate deterministic shell and runtime$/m,
    `# ${projectName} Package - ${version} canonical first-gate deterministic shell and runtime`
  );
  rewritten = rewritten.replace(
    /^This package is governed by the active V\d+ canonical spec and serves as the current deterministic first-gate realization of the (?:full )?(?:ENGI|Bitcode) operating chain while V\d+ drafts and lands the productionizing hardening pass\.$/m,
    `This package is governed by the active ${version} canonical spec and serves as the current deterministic first-gate realization of the ${projectName} operating chain while ${nextDraft} drafts and lands the productionizing hardening pass.`
  );
  rewritten = rewritten.replace(
    /^- Canonical pointer is `.+ENGI_SPEC\.txt -> V\d+`$/m,
    `- Canonical pointer is \`${resolvedRepoRoot}/BITCODE_SPEC.txt -> ${version}\``
  );
  rewritten = rewritten.replace(
    /^- V\d+ is the current canonical\/latest target and governing full-system spec$/m,
    `- ${version} is the current canonical/latest target and governing full-system spec`
  );
  rewritten = rewritten.replace(
    /^- `ENGI_SPEC_V\d+_PROVEN\.md` is the active generated proof appendix$/m,
    `- \`ENGI_SPEC_${version}_PROVEN.md\` is the active generated proof appendix`
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

  const canonPosturePath = path.join(resolvedRepoRoot, 'packages', 'bitcode', 'src', 'canon-posture.js');
  const readmePath = path.join(resolvedRepoRoot, 'packages', 'bitcode', 'README.md');

  const [canonPostureContent, readmeContent] = await Promise.all([
    fs.readFile(canonPosturePath, 'utf8'),
    fs.readFile(readmePath, 'utf8')
  ]);

  await Promise.all([
    fs.writeFile(canonPosturePath, rewriteCanonPostureSource(canonPostureContent, version, nextDraft), 'utf8'),
    fs.writeFile(readmePath, rewriteReadme(readmeContent, resolvedRepoRoot, version, nextDraft), 'utf8')
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
