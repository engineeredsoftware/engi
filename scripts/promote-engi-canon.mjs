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
      '  --version <VN>           Canonical version to promote. Accepted targets: V19, V20, V21, V22, V23.',
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
 * @param {string} content
 * @param {string} label
 */
function extractStatusValue(content, label) {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = content.match(new RegExp(`^- ${escaped}: (.+)$`, 'm'));
  return match ? match[1].trim() : null;
}

/**
 * @param {string} value
 */
function normalize(value) {
  return value.toLowerCase().replace(/[`*]/g, '').replace(/\s+/g, ' ').trim();
}

/**
 * @param {string} content
 * @param {string} headingPhrase
 * @returns {string}
 */
function extractSection(content, headingPhrase) {
  const lines = content.split('\n');
  const normalizedHeadingPhrase = normalize(headingPhrase);
  let start = -1;
  let level = 0;
  for (let index = 0; index < lines.length; index += 1) {
    const match = lines[index].match(/^(#{2,6})\s+(.+)$/);
    if (!match) continue;
    if (normalize(match[2]).includes(normalizedHeadingPhrase)) {
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
 * @param {string} content
 * @returns {string[]}
 */
function extractBulletedItems(content) {
  return content
    .split('\n')
    .map((line) => line.match(/^\s*-\s+(.+)$/))
    .filter(Boolean)
    .map((match) => match[1].trim());
}

/**
 * @param {string} content
 * @returns {string[]}
 */
function extractOrderedItems(content) {
  return content
    .split('\n')
    .map((line) => line.match(/^\s*\d+\.\s+(.+)$/))
    .filter(Boolean)
    .map((match) => match[1].trim());
}

/**
 * @param {string} value
 */
function stripMarkdown(value) {
  return value.replace(/[`*]/g, '').replace(/\s+/g, ' ').trim();
}

/**
 * @param {string} value
 */
function trimTrailingPeriod(value) {
  return value.replace(/[.]+$/u, '').trim();
}

/**
 * @param {string[]} items
 */
function joinHumanList(items) {
  if (items.length === 0) return '';
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`;
}

/**
 * @param {string} section
 * @returns {Array<Record<string, string>>}
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
 * @param {string} scope
 */
function deriveScopeFocus(scope) {
  const stripped = stripMarkdown(scope || '');
  const match = stripped.match(/^V\d+\s+draft\s+specification\s+for\s+(.+?)(?:\s+after\s+.+)?$/i);
  if (match) return trimTrailingPeriod(match[1]);
  const canonicalDraftMatch = stripped.match(/^V\d+\s+canonical\s+(?:system\s+)?(?:specification|delta|parity ledger)\s+draft\s+for\s+(.+?)(?:\s+after\s+.+)?$/i);
  if (canonicalDraftMatch) return trimTrailingPeriod(canonicalDraftMatch[1]);
  const canonicalMatch = stripped.match(/^V\d+\s+canonical\s+(?:system\s+)?(?:specification|delta|parity ledger)\s+for\s+(.+?)(?:\s+after\s+.+)?$/i);
  if (canonicalMatch) return trimTrailingPeriod(canonicalMatch[1]);
  return 'specifying-canon hardening';
}

/**
 * @param {string} section
 */
function deriveCarrierBullet(section) {
  const carriers = extractBulletedItems(section)
    .filter((item) => /catalog|matrix|ledger|map/i.test(item))
    .map((item) =>
      trimTrailingPeriod(
        stripMarkdown(item)
          .replace(/^(a|an)\s+/i, '')
          .replace(/^and\s+/i, '')
          .replace(/,+$/u, '')
          .replace(/\s+or equivalent section$/i, '')
      )
    );
  if (carriers.length === 0) return '';
  return `appendix-grade totality carriers in SPEC for ${joinHumanList(carriers)}`;
}

/**
 * @param {Array<Record<string, string>>} rows
 * @param {string} area
 */
function findParityRow(rows, area) {
  return rows.find((row) => normalize(row.Area || '') === normalize(area));
}

/**
 * @param {string} version
 * @returns {Promise<{ spec: string, delta: string, parity: string }>}
 */
async function readSpecFamily(version) {
  const [spec, delta, parity] = await Promise.all([
    fs.readFile(path.join(repoRoot, `ENGI_SPEC_${version}.md`), 'utf8'),
    fs.readFile(path.join(repoRoot, `ENGI_SPEC_${version}_DELTA.md`), 'utf8'),
    fs.readFile(path.join(repoRoot, `ENGI_SPEC_${version}_PARITY_MATRIX.md`), 'utf8')
  ]);
  return { spec, delta, parity };
}

/**
 * @param {string} version
 * @param {string} commit
 */
function buildCommandPlan(version, commit) {
  const v21DraftSpecCheckCommand = ['node', ['scripts/check-engi-spec-family.mjs', '--version', 'V21', '--mode', 'draft', '--current-target', 'V20']];
  const v21CanonicalInputCheckCommand = ['node', ['scripts/check-engi-canonical-inputs.mjs', '--current-target', 'V20']];
  const v21PreparePromotionSpecFamilyCommand = ['node', ['scripts/prepare-engi-spec-family-promotion.mjs', '--version', 'V21', '--commit', commit]];
  const v21PromotedCanonicalInputCheckCommand = ['node', ['scripts/check-engi-canonical-inputs.mjs', '--current-target', 'V21']];
  const v21PromotedSpecCheckCommand = ['node', ['scripts/check-engi-spec-family.mjs', '--version', 'V21', '--mode', 'promoted']];
  const v22DraftSpecCheckCommand = ['node', ['scripts/check-engi-spec-family.mjs', '--version', 'V22', '--mode', 'draft', '--current-target', 'V21']];
  const v22CanonicalInputCheckCommand = ['node', ['scripts/check-engi-canonical-inputs.mjs', '--current-target', 'V21']];
  const v22DraftCanonPostureDriftCommand = ['node', ['scripts/check-engi-canon-posture-drift.mjs', '--active-canon', 'V21', '--draft-target', 'V22']];
  const v22PreparePromotionSpecFamilyCommand = ['node', ['scripts/prepare-engi-spec-family-promotion.mjs', '--version', 'V22', '--commit', commit]];
  const v22PrepareRuntimePromotionCommand = ['node', ['scripts/prepare-engi-runtime-canon-promotion.mjs', '--version', 'V22', '--next-draft', 'V23']];
  const v22PromotedCanonicalInputCheckCommand = ['node', ['scripts/check-engi-canonical-inputs.mjs', '--current-target', 'V22']];
  const v22PromotedSpecCheckCommand = ['node', ['scripts/check-engi-spec-family.mjs', '--version', 'V22', '--mode', 'promoted']];
  const v22PromotedCanonPostureDriftCommand = ['node', ['scripts/check-engi-canon-posture-drift.mjs', '--active-canon', 'V22', '--draft-target', 'V23']];
  const v23DraftSpecCheckCommand = ['node', ['scripts/check-engi-spec-family.mjs', '--version', 'V23', '--mode', 'draft', '--current-target', 'V22']];
  const v23CanonicalInputCheckCommand = ['node', ['scripts/check-engi-canonical-inputs.mjs', '--current-target', 'V22']];
  const v23DraftCanonPostureDriftCommand = ['node', ['scripts/check-engi-canon-posture-drift.mjs', '--active-canon', 'V22', '--draft-target', 'V23']];
  const v23PreparePromotionSpecFamilyCommand = ['node', ['scripts/prepare-engi-spec-family-promotion.mjs', '--version', 'V23', '--commit', commit]];
  const v23PrepareRuntimePromotionCommand = ['node', ['scripts/prepare-engi-runtime-canon-promotion.mjs', '--version', 'V23', '--next-draft', 'V24']];
  const v23PromotedCanonicalInputCheckCommand = ['node', ['scripts/check-engi-canonical-inputs.mjs', '--current-target', 'V23']];
  const v23PromotedSpecCheckCommand = ['node', ['scripts/check-engi-spec-family.mjs', '--version', 'V23', '--mode', 'promoted']];
  const v23PromotedCanonPostureDriftCommand = ['node', ['scripts/check-engi-canon-posture-drift.mjs', '--active-canon', 'V23', '--draft-target', 'V24']];
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
  if (version === 'V21') {
    return [
      v21DraftSpecCheckCommand,
      v21CanonicalInputCheckCommand,
      ...inheritedProofCommands,
      ...v20QualityCommands,
      ['npm', ['--prefix', 'engi-demo', 'test']],
      v21PreparePromotionSpecFamilyCommand,
      ['node', ['scripts/generate-engi-proven.mjs', '--version', version, '--commit', commit, '--worktree-state', 'clean', '--output', `ENGI_SPEC_${version}_PROVEN.md`, '--allow-dirty']],
      ['node', ['scripts/generate-engi-proven.mjs', '--version', version, '--commit', commit, '--worktree-state', 'clean', '--output', `ENGI_SPEC_${version}_PROVEN.md`, '--check', '--allow-dirty']],
      v21PromotedCanonicalInputCheckCommand,
      v21PromotedSpecCheckCommand,
      ['git', ['diff', '--check']]
    ];
  }
  if (version === 'V22') {
    return [
      v22DraftSpecCheckCommand,
      v22CanonicalInputCheckCommand,
      v22DraftCanonPostureDriftCommand,
      ...inheritedProofCommands,
      ...v20QualityCommands,
      ['npm', ['--prefix', 'engi-demo', 'test']],
      v22PreparePromotionSpecFamilyCommand,
      v22PrepareRuntimePromotionCommand,
      ['node', ['scripts/generate-engi-proven.mjs', '--version', version, '--commit', commit, '--worktree-state', 'clean', '--output', `ENGI_SPEC_${version}_PROVEN.md`, '--allow-dirty']],
      ['node', ['scripts/generate-engi-proven.mjs', '--version', version, '--commit', commit, '--worktree-state', 'clean', '--output', `ENGI_SPEC_${version}_PROVEN.md`, '--check', '--allow-dirty']],
      v22PromotedCanonicalInputCheckCommand,
      v22PromotedSpecCheckCommand,
      v22PromotedCanonPostureDriftCommand,
      ['git', ['diff', '--check']]
    ];
  }
  if (version === 'V23') {
    return [
      v23DraftSpecCheckCommand,
      v23CanonicalInputCheckCommand,
      v23DraftCanonPostureDriftCommand,
      ...inheritedProofCommands,
      ...v20QualityCommands,
      ['npm', ['--prefix', 'engi-demo', 'test']],
      v23PreparePromotionSpecFamilyCommand,
      v23PrepareRuntimePromotionCommand,
      ['node', ['scripts/generate-engi-proven.mjs', '--version', version, '--commit', commit, '--worktree-state', 'clean', '--output', `ENGI_SPEC_${version}_PROVEN.md`, '--allow-dirty']],
      ['node', ['scripts/generate-engi-proven.mjs', '--version', version, '--commit', commit, '--worktree-state', 'clean', '--output', `ENGI_SPEC_${version}_PROVEN.md`, '--check', '--allow-dirty']],
      v23PromotedCanonicalInputCheckCommand,
      v23PromotedSpecCheckCommand,
      v23PromotedCanonPostureDriftCommand,
      ['git', ['diff', '--check']]
    ];
  }
  throw new Error(`Unsupported promotion target ${version}. Expected V19, V20, V21, V22, or V23.`);
}

/**
 * @param {string} commit
 * @returns {Promise<string>}
 */
async function buildDerivedV21CommitMessageBody(commit) {
  const { spec, delta, parity } = await readSpecFamily('V21');
  const scope = extractStatusValue(spec, 'Scope') || 'V21 draft specification for specifying-canon hardening';
  const focus = deriveScopeFocus(scope);
  const totalitySection = extractSection(spec, 'V21 totality and precision enforcement rule');
  const carrierBullet = deriveCarrierBullet(totalitySection);
  const deltaDecisionSection = extractSection(delta, 'Accepted V21 decisions');
  const acceptedDecisions = extractOrderedItems(deltaDecisionSection).map(stripMarkdown);
  const parityRows = parseMarkdownTable(extractSection(parity, 'V21 implementation matrix'));

  /** @type {string[]} */
  const bullets = [];

  const fileFamilyDecision = acceptedDecisions.find((item) =>
    normalize(item).includes('required hand-authored canonical system-spec files for v21+')
  );
  if (fileFamilyDecision) bullets.push(trimTrailingPeriod(fileFamilyDecision));

  const specAloneDecision = acceptedDecisions.find((item) => item.includes('A promoted SPEC must itself be full-system, re-implementable, and auditable'));
  if (specAloneDecision) bullets.push(trimTrailingPeriod(specAloneDecision));

  if (carrierBullet) bullets.push(carrierBullet);

  const prioritizedAreas = [
    'Complete specifying authority',
    'Canonical-input validator',
    'Structural spec-family checker',
    'V21 appendix generation support',
    'Post-generation active-canon validation',
    'File-family promotion gate',
    'Commit-message derivation rule',
    'V21 promotion support'
  ];
  for (const area of prioritizedAreas) {
    const row = findParityRow(parityRows, area);
    if (!row) continue;
    const judgment = normalize(row.Judgment || '');
    if (judgment.includes('source gap') || judgment.includes('blocked')) continue;
    const closureSignal = trimTrailingPeriod(stripMarkdown(row['Closure signal'] || ''));
    if (!closureSignal) continue;
    if (/\bpending\b|blocked until|remains pending/i.test(closureSignal)) continue;
    bullets.push(`${stripMarkdown(area)}: ${closureSignal}`);
  }

  return [
    `Promotes V21 as ${focus} for ENGI.`,
    '',
    `Proof-source commit: ${commit}`,
    '',
    'The promotion carries:',
    ...bullets.slice(0, 8).map((bullet) => `- ${bullet}`)
  ].join('\n');
}

/**
 * @param {string} commit
 * @returns {Promise<string>}
 */
async function buildDerivedV22CommitMessageBody(commit) {
  const { spec, delta, parity } = await readSpecFamily('V22');
  const scope = extractStatusValue(spec, 'Scope') || 'V22 canonical system specification for runtime/operator drift-detection hardening after V21 specifying canon';
  const focus = deriveScopeFocus(scope);
  const decisionSection = extractSection(delta, 'Accepted V22 decisions');
  const acceptedDecisions = extractOrderedItems(decisionSection).map(stripMarkdown);
  const parityRows = parseMarkdownTable(extractSection(parity, 'V22 implementation matrix'));

  /** @type {string[]} */
  const bullets = [];

  const driftDecision = acceptedDecisions.find((item) => normalize(item).includes('single runtime-owned canon posture surface'));
  if (driftDecision) bullets.push(trimTrailingPeriod(driftDecision));

  const alignmentDecision = acceptedDecisions.find((item) => normalize(item).includes('api specversion, browser title/copy, operator status text, readme/demo docs, and test expectations should derive from the same canon posture source'));
  if (alignmentDecision) bullets.push(trimTrailingPeriod(alignmentDecision));

  const prioritizedAreas = [
    'Active canon posture in runtime',
    'Browser title and hero posture',
    'API posture',
    'Test posture',
    'Demo README posture',
    'Canon-truth coupling to promotion',
    'Second-pass proof/operator decision'
  ];
  for (const area of prioritizedAreas) {
    const row = findParityRow(parityRows, area);
    if (!row) continue;
    const closureSignal = trimTrailingPeriod(stripMarkdown(row['Closure signal'] || row['V23 implementation expectation'] || row['Current source truth'] || ''));
    if (!closureSignal) continue;
    bullets.push(`${stripMarkdown(area)}: ${closureSignal}`);
  }

  return [
    `Promotes V22 as ${focus} for ENGI.`,
    '',
    `Proof-source commit: ${commit}`,
    '',
    'The promotion carries:',
    ...bullets.slice(0, 8).map((bullet) => `- ${bullet}`)
  ].join('\n');
}

/**
 * @param {string} commit
 * @returns {Promise<string>}
 */
async function buildDerivedV23CommitMessageBody(commit) {
  const { spec, delta, parity } = await readSpecFamily('V23');
  const scope = extractStatusValue(spec, 'Scope') || 'V23 canonical system specification for bitcoin-backed audit, sidechain-connected settlement interfaces, and deployed compute/storage reality after V22 truth-aligned canon';
  const focus = deriveScopeFocus(scope);
  const decisionSection = extractSection(delta, 'Accepted V23 decisions');
  const acceptedDecisions = extractOrderedItems(decisionSection).map(stripMarkdown);
  const parityRows = parseMarkdownTable(extractSection(parity, 'V23 implementation matrix'));

  /** @type {string[]} */
  const bullets = [];

  const auditDecision = acceptedDecisions.find((item) => normalize(item).includes('bitcoin enters engi first as a commitment and spend substrate'));
  if (auditDecision) bullets.push(trimTrailingPeriod(auditDecision));

  const sidechainDecision = acceptedDecisions.find((item) => normalize(item).includes('sidechain connection point'));
  if (sidechainDecision) bullets.push(trimTrailingPeriod(sidechainDecision));

  const prioritizedAreas = [
    'Compute-reality surface',
    'Storage-reality surface',
    'Treasury-policy surface',
    'Bitcoin-facing artifact family',
    'Bitcoin proof-family validation',
    'Sidechain bridge mode and finalization policy',
    'Source emission',
    'Generated evidence'
  ];
  for (const area of prioritizedAreas) {
    const row = findParityRow(parityRows, area);
    if (!row) continue;
    const closureSignal = trimTrailingPeriod(stripMarkdown(row['Closure signal'] || ''));
    if (!closureSignal) continue;
    bullets.push(`${stripMarkdown(area)}: ${closureSignal}`);
  }

  return [
    `Promotes V23 as ${focus} for ENGI.`,
    '',
    `Proof-source commit: ${commit}`,
    '',
    'The promotion carries:',
    ...bullets.slice(0, 8).map((bullet) => `- ${bullet}`)
  ].join('\n');
}

/**
 * @param {string} version
 * @param {string} commit
 * @returns {Promise<string>}
 */
async function buildCommitMessageBody(version, commit) {
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
  if (version === 'V21') {
    return buildDerivedV21CommitMessageBody(commit);
  }
  if (version === 'V22') {
    return buildDerivedV22CommitMessageBody(commit);
  }
  if (version === 'V23') {
    return buildDerivedV23CommitMessageBody(commit);
  }
  throw new Error(`Unsupported promotion target ${version}. Expected V19, V20, V21, V22, or V23.`);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }

  const version = args.version || '';
  if (!['V19', 'V20', 'V21', 'V22', 'V23'].includes(version)) {
    throw new Error(`Canonical promotion accepts --version V19, V20, V21, V22, or V23. Received ${version || 'none'}.`);
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
  process.stdout.write(await buildCommitMessageBody(version, resolvedCommit));
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
