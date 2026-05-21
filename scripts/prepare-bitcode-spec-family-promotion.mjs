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
  /** @type {{ version?: string, commit?: string, repoRoot?: string, help?: boolean }} */
  const args = {};
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--version') args.version = argv[++index];
    else if (arg === '--commit') args.commit = argv[++index];
    else if (arg === '--repo-root') args.repoRoot = argv[++index];
    else if (arg === '--help' || arg === '-h') args.help = true;
    else throw new Error(`Unknown argument ${arg}`);
  }
  return args;
}

function printHelp() {
  process.stdout.write(
    [
      'Usage: node scripts/prepare-bitcode-spec-family-promotion.mjs --version V29 --commit <sha> [--repo-root <path>]',
      '',
      'Rewrites the hand-authored spec family status truth for canonical promotion.',
      'Currently implemented for V21, V22, V23, V24, V25, V28, and V29.'
    ].join('\n')
  );
}

/**
 * @param {string} content
 */
function extractStatusSection(content) {
  const match = content.match(/(^## Status\s*\n)([\s\S]*?)(?=^##\s)/m);
  if (!match) {
    throw new Error('File is missing a top-level "## Status" section.');
  }
  return {
    prefix: match[1],
    body: match[2],
    start: match.index,
    end: match.index + match[0].length
  };
}

/**
 * @param {string} body
 * @param {string} label
 * @param {string} value
 * @param {{ afterLabel?: string }} [options]
 */
function upsertStatusValue(body, label, value, options = {}) {
  const line = `- ${label}: ${value}`;
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const matcher = new RegExp(`^- ${escaped}: .*$`, 'm');
  if (matcher.test(body)) {
    return body.replace(matcher, line);
  }
  const lines = body.split('\n');
  if (options.afterLabel) {
    const afterPrefix = `- ${options.afterLabel}:`;
    const index = lines.findIndex((entry) => entry.startsWith(afterPrefix));
    if (index >= 0) {
      lines.splice(index + 1, 0, line);
      return lines.join('\n');
    }
  }
  const insertIndex = lines.findLastIndex((entry) => entry.startsWith('- '));
  if (insertIndex >= 0) {
    lines.splice(insertIndex + 1, 0, line);
    return lines.join('\n');
  }
  lines.push(line);
  return lines.join('\n');
}

/**
 * @param {string} content
 * @param {Record<string, string>} values
 */
function rewriteStatusValues(content, values) {
  const section = extractStatusSection(content);
  let body = section.body;
  for (const [label, value] of Object.entries(values)) {
    const afterLabel = label === 'Canonical proof-source commit' ? 'Current canonical/latest target' : undefined;
    body = upsertStatusValue(body, label, value, afterLabel ? { afterLabel } : {});
  }
  return `${content.slice(0, section.start)}${section.prefix}${body}${content.slice(section.end)}`;
}

/**
 * @param {string} version
 * @param {string} commit
 * @param {string} content
 * @param {'spec' | 'delta' | 'notes' | 'parity'} kind
 */
function rewritePromotionStatus(version, commit, content, kind) {
  if (version === 'V28') {
    const sharedInventory = 'active canonical `.bitcode/v28-spec-family-report.json`, `.bitcode/v28-canonical-input-report.json`, `.bitcode/v28-canon-posture-drift-report.json`, V28 gate-quality and promotion workflow evidence, and `BITCODE_SPEC_V28_PROVEN.md` as the generated proof appendix for V28 promotion';
    const scopeByKind = {
      spec: 'V28 canonical system specification for commercial Protocol implementation, Terminal MVP QA, MCP API and ChatGPT App MVP readiness, Reading pipeline product gates, and promotion-proof metadevelopment after V27 tokenomics and crypto-commercial rails',
      delta: 'V28 canonical delta for commercial Protocol implementation, Terminal MVP QA, MCP API and ChatGPT App MVP readiness, Reading pipeline product gates, and promotion-proof metadevelopment after V27 tokenomics and crypto-commercial rails',
      notes: 'V28 canonical notes for commercial Protocol implementation, Terminal MVP QA, MCP API and ChatGPT App MVP readiness, Reading pipeline product gates, and promotion-proof metadevelopment',
      parity: 'V28 canonical parity ledger for commercial Protocol implementation, Terminal MVP QA, MCP API and ChatGPT App MVP readiness, Reading pipeline product gates, and promotion-proof metadevelopment'
    };
    const stateByKind = {
      spec: 'canonical promotion complete; V28 is the active commercial Protocol and Terminal MVP canon and the V28 hand-authored plus generated canon are aligned',
      delta: 'canonical promotion complete; this delta records the promoted V27-to-V28 commercial Protocol, Terminal MVP, Reading pipeline, and promotion-proof closure set',
      notes: 'canonical promotion complete; V28 notes record the accepted commercial-product and metadevelopment closure evidence',
      parity: 'canonical promotion complete; V28 parity truth, product-gate audit, generated proof, and promotion automation are aligned'
    };
    return rewriteStatusValues(content, {
      Scope: scopeByKind[kind],
      ...(kind !== 'delta'
        ? { 'Last fully realized canonical target preserved in source': '`V28`' }
        : {}),
      'Current canonical/latest target': '`V28`',
      'Canonical proof-source commit': `\`${commit}\``,
      'Generated structured artifact inventory': sharedInventory,
      'Source parity state':
        'V28 source-side Protocol, Terminal, Reading pipeline, MCP/ChatGPT App, proof, workflow, and promotion surfaces are canonicalized in the promoted V28 file family',
      'V28 state': stateByKind[kind]
    });
  }

  if (version === 'V29') {
    const sharedInventory = 'active canonical `.bitcode/v29-spec-family-report.json`, `.bitcode/v29-canonical-input-report.json`, `.bitcode/v29-canon-posture-drift-report.json`, V29 gate-quality and promotion workflow evidence, and `BITCODE_SPEC_V29_PROVEN.md` as the generated proof appendix for V29 promotion';
    const scopeByKind = {
      spec: 'V29 canonical system specification for Terminal transaction depth, operator recovery, wallet/BTC settlement operation, AssetPack disclosure and rights review, ledger/database reconciliation, organization permission decisions, and promotion-ready workflow proof over V28',
      delta: 'V29 canonical delta for Terminal transaction depth, operator recovery, wallet/BTC settlement operation, AssetPack disclosure and rights review, ledger/database reconciliation, organization permission decisions, and promotion-ready workflow proof over V28',
      notes: 'V29 canonical notes for Terminal transaction depth, local/staging readiness, and promotion automation over V28',
      parity: 'V29 canonical parity ledger for Terminal transaction depth, local/staging readiness, and promotion automation over V28'
    };
    const stateByKind = {
      spec: 'canonical promotion complete; V29 is the active Terminal transaction-depth canon and the V29 hand-authored plus generated canon are aligned',
      delta: 'canonical promotion complete; this delta records the promoted V28-to-V29 Terminal transaction-depth and promotion-readiness closure set',
      notes: 'canonical promotion complete; V29 notes record the accepted Terminal-depth, local/staging, and promotion-readiness evidence',
      parity: 'canonical promotion complete; V29 parity truth, product-gate audit, generated proof, and promotion automation are aligned'
    };
    return rewriteStatusValues(content, {
      Scope: scopeByKind[kind],
      ...(kind !== 'delta'
        ? { 'Last fully realized canonical target preserved in source': '`V29`' }
        : {}),
      'Current canonical/latest target': '`V29`',
      'Canonical proof-source commit': `\`${commit}\``,
      'Generated structured artifact inventory': sharedInventory,
      'Source parity state':
        'V29 source-side Terminal transaction, wallet/BTC, Reading observability, AssetPack disclosure, settlement repair, organization authority, UX proof, workflow, and promotion surfaces are canonicalized in the promoted V29 file family',
      'V29 state': stateByKind[kind]
    });
  }

  if (!['V21', 'V22', 'V23', 'V24', 'V25'].includes(version)) {
    throw new Error(`Promotion hand-authored family rewriting is currently implemented for V21, V22, V23, V24, V25, V28, and V29. Received ${version}.`);
  }
  const sharedInventory = version === 'V21'
    ? 'active canonical `.bitcode/v19-*` reproducible reports, `.bitcode/v20-*` operator-quality reports, `.bitcode/v21-spec-family-report.json`, and `.bitcode/v21-canonical-input-report.json`; `ENGI_SPEC_V21_PROVEN.md` is the active generated proof appendix for V21'
    : version === 'V22'
      ? 'active canonical `.bitcode/v19-*` reproducible reports, `.bitcode/v20-*` operator-quality reports, `.bitcode/v22-spec-family-report.json`, `.bitcode/v22-canonical-input-report.json`, and `.bitcode/v22-canon-posture-drift-report.json`; `ENGI_SPEC_V22_PROVEN.md` is the active generated proof appendix for V22'
      : version === 'V23'
        ? 'active canonical `.bitcode/v19-*` reproducible reports, `.bitcode/v20-*` operator-quality reports, `.bitcode/v23-spec-family-report.json`, `.bitcode/v23-canonical-input-report.json`, and `.bitcode/v23-canon-posture-drift-report.json`; `ENGI_SPEC_V23_PROVEN.md` is the active generated proof appendix for V23'
        : version === 'V24'
          ? 'active canonical `.bitcode/v19-*` reproducible reports, `.bitcode/v20-*` operator-quality reports, `.bitcode/v24-spec-family-report.json`, `.bitcode/v24-canonical-input-report.json`, and `.bitcode/v24-canon-posture-drift-report.json`; `ENGI_SPEC_V24_PROVEN.md` is the active generated proof appendix for V24'
          : 'active canonical `.bitcode/v19-*` reproducible reports, `.bitcode/v20-*` operator-quality reports, `.bitcode/v25-spec-family-report.json`, `.bitcode/v25-canonical-input-report.json`, and `.bitcode/v25-canon-posture-drift-report.json`; `_legacy/ENGI_SPEC_V25_PROVEN.md` is the active generated proof appendix for V25';
  const sharedValues = {
    Scope:
      version === 'V21'
        ? kind === 'spec'
          ? 'V21 canonical specification for specifying-canon hardening after V20 operator-quality canon'
          : kind === 'delta'
            ? 'V21 canonical delta for specifying-canon hardening after V20 operator-quality canon'
            : 'V21 canonical parity ledger for specifying-canon hardening'
        : version === 'V22'
          ? kind === 'spec'
            ? 'V22 canonical system specification for runtime/operator drift-detection hardening after V21 specifying canon'
            : kind === 'delta'
              ? 'V22 canonical delta for runtime/operator drift-detection hardening after V21 specifying canon'
              : 'V22 canonical parity ledger for runtime/operator drift-detection hardening'
          : version === 'V23'
            ? kind === 'spec'
              ? 'V23 canonical system specification for bitcoin-backed audit, sidechain-connected settlement interfaces, and deployed compute/storage reality after V22 truth-aligned canon'
              : kind === 'delta'
                ? 'V23 canonical delta for bitcoin-backed audit, sidechain-connected settlement interfaces, and deployed compute/storage reality after V22 truth-aligned canon'
                : 'V23 canonical parity ledger for bitcoin-backed audit, sidechain-connected settlement interfaces, and deployed compute/storage reality'
            : version === 'V24'
              ? kind === 'spec'
              ? 'V24 canonical system specification for realizing external interfacing, exhaustive telemetry, and full-canon conformance after V23 deployed-infrastructure canon'
              : kind === 'delta'
                ? 'V24 canonical delta for realizing external interfacing, exhaustive telemetry, and full-canon conformance after V23 deployed-infrastructure canon'
                : 'V24 canonical parity ledger for realizing external interfacing, exhaustive telemetry, and full-canon conformance'
              : kind === 'spec'
                ? 'V25 canonical system specification for a simple but full project rename from ENGI to Bitcode, including denomination rename from NGI to BTD, after V24 external-realization canon'
                : kind === 'delta'
                  ? 'V25 canonical delta for a simple but full project rename from ENGI to Bitcode and denomination rename from NGI to BTD after V24 external-realization canon'
                  : 'V25 canonical parity ledger for a simple but full project rename from ENGI to Bitcode and denomination rename from NGI to BTD',
    'Current canonical/latest target': `\`${version}\``,
    'Canonical proof-source commit': `\`${commit}\``,
    'Generated structured artifact inventory': sharedInventory
  };

  /** @type {Record<string, string>} */
  const kindSpecificValues = version === 'V21'
    ? {
        ...(kind !== 'delta'
          ? { 'Last fully realized canonical target preserved in source': '`V21`' }
          : {}),
        ...(kind === 'spec'
          ? {
              'Source parity state':
                'V21 source-side specifying implementation, appendix generation, specifying artifacts, and promotion sequencing are canonicalized in the promoted V21 file family',
              'V21 state':
                'canonical promotion complete; V21 is the active specifying-canon baseline and the V21 hand-authored plus generated canon are aligned'
            }
          : kind === 'delta'
            ? {
                'Source parity state':
                  'V21 source-side specifying implementation, appendix generation, specifying artifacts, and promotion sequencing are canonicalized; this delta records the V20-to-V21 closure',
                'V21 state':
                  'canonical promotion complete; V21 specifying canon is active and this delta records the promoted closure set'
              }
            : {
                'Source parity state':
                  'V21 source-side specifying implementation, appendix generation, specifying artifacts, and promotion sequencing are canonicalized; parity truth is aligned with the promoted V21 file family',
                'V21 state':
                  'canonical promotion complete; parity truth, generated canon, and hand-authored V21 status are aligned'
              })
      }
    : version === 'V22'
      ? {
        ...(kind !== 'delta'
          ? { 'Last fully realized canonical target preserved in source': '`V22`' }
          : {}),
        ...(kind === 'spec'
          ? {
              'Source parity state':
                'V22 source-side runtime/demo canon-posture drift detection, generated drift artifacts, promotion-time runtime preparation, and inherited proof/operator closure are canonicalized in the promoted V22 file family',
              'V22 state':
                'canonical promotion complete; V22 is the active system-facing canon and runtime, API, browser shell, tests, demo-local docs, and generated canon are aligned'
            }
          : kind === 'delta'
            ? {
                'Source parity state':
                  'V22 source-side runtime/demo canon-posture drift detection, generated drift artifacts, promotion-time runtime preparation, and inherited proof/operator closure are canonicalized; this delta records the V21-to-V22 closure',
                'V22 state':
                  'canonical promotion complete; V22 system-facing canon is active and this delta records the promoted drift-detection closure set'
              }
            : {
                'Source parity state':
                  'V22 source-side runtime/demo canon-posture drift detection, generated drift artifacts, promotion-time runtime preparation, and inherited proof/operator closure are canonicalized; parity truth is aligned with the promoted V22 file family',
                'V22 state':
                  'canonical promotion complete; parity truth, runtime posture truth, and generated canon are aligned for V22'
              })
      }
      : version === 'V23'
      ? {
        ...(kind !== 'delta'
          ? { 'Last fully realized canonical target preserved in source': '`V23`' }
          : {}),
        ...(kind === 'spec'
          ? {
              'Source parity state':
                'V23 source-side bitcoin-facing artifacts, sidechain-connected settlement interfaces, prototype compute/storage reality manifests, canon-posture drift detection, and generated evidence are canonicalized in the promoted V23 file family',
              'V23 state':
                'canonical promotion complete; V23 is the active deployed-infrastructure canon and runtime, API, browser shell, tests, demo-local docs, and generated canon are aligned'
            }
          : kind === 'delta'
            ? {
                'Source parity state':
                  'V23 source-side bitcoin-facing artifacts, sidechain-connected settlement interfaces, prototype compute/storage reality manifests, canon-posture drift detection, and generated evidence are canonicalized; this delta records the V22-to-V23 closure',
                'V23 state':
                  'canonical promotion complete; V23 deployed-infrastructure canon is active and this delta records the promoted bitcoin-interface and compute/storage closure set'
              }
            : {
                'Source parity state':
                  'V23 source-side bitcoin-facing artifacts, sidechain-connected settlement interfaces, prototype compute/storage reality manifests, canon-posture drift detection, and generated evidence are canonicalized; parity truth is aligned with the promoted V23 file family',
                'V23 state':
                  'canonical promotion complete; parity truth, runtime posture truth, bitcoin-facing closure, and generated canon are aligned for V23'
              })
      }
      : version === 'V24'
      ? {
        ...(kind !== 'delta'
          ? { 'Last fully realized canonical target preserved in source': '`V24`' }
          : {}),
        ...(kind === 'spec'
          ? {
              'Source parity state':
                'V24 source-side mode-isolated external realization, live adapter contracts, continuity and reconciliation ledgers, exhaustive telemetry, build-process enforcement, and generated evidence are canonicalized in the promoted V24 file family',
              'V24 state':
                'canonical promotion complete; V24 is the active external-realization canon and runtime, API, browser shell, tests, demo-local docs, and generated canon are aligned'
            }
          : kind === 'delta'
            ? {
                'Source parity state':
                  'V24 source-side mode-isolated external realization, live adapter contracts, continuity and reconciliation ledgers, exhaustive telemetry, build-process enforcement, and generated evidence are canonicalized; this delta records the V23-to-V24 closure',
                'V24 state':
                  'canonical promotion complete; V24 external-realization canon is active and this delta records the promoted external-interface, telemetry, and conformance closure set'
              }
            : {
                'Source parity state':
                  'V24 source-side mode-isolated external realization, live adapter contracts, continuity and reconciliation ledgers, exhaustive telemetry, build-process enforcement, and generated evidence are canonicalized; parity truth is aligned with the promoted V24 file family',
                'V24 state':
                  'canonical promotion complete; parity truth, runtime posture truth, external-realization closure, and generated canon are aligned for V24'
              })
      }
      : {
        ...(kind !== 'delta'
          ? { 'Last fully realized canonical target preserved in source': '`V25`' }
          : {}),
        ...(kind === 'spec'
          ? {
              'Source parity state':
                'V25 source-side Bitcode/BTD rename closure, brand-aware generated evidence, runtime/demo/site rename alignment, and promotion-time rename preparation are canonicalized in the promoted V25 file family',
              'V25 state':
                'canonical promotion complete; V25 is the active Bitcode rename canon and runtime, API, browser shell, tests, demo-local docs, and generated canon are aligned'
            }
          : kind === 'delta'
            ? {
                'Source parity state':
                  'V25 source-side Bitcode/BTD rename closure, brand-aware generated evidence, runtime/demo/site rename alignment, and promotion-time rename preparation are canonicalized; this delta records the V24-to-V25 closure',
                'V25 state':
                  'canonical promotion complete; V25 rename canon is active and this delta records the promoted Bitcode/BTD closure set'
              }
            : {
                'Source parity state':
                  'V25 source-side Bitcode/BTD rename closure, brand-aware generated evidence, runtime/demo/site rename alignment, and promotion-time rename preparation are canonicalized; parity truth is aligned with the promoted V25 file family',
                'V25 state':
                  'canonical promotion complete; parity truth, runtime posture truth, rename closure, and generated canon are aligned for V25'
              })
      };

  return rewriteStatusValues(content, {
    ...sharedValues,
    ...kindSpecificValues
  });
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }

  const version = args.version || '';
  const commit = args.commit || '';
  if (!version) throw new Error('A --version is required.');
  if (!commit) throw new Error('A --commit is required.');

  const resolvedRepoRoot = path.resolve(args.repoRoot || repoRoot);
  const isRootBitcodeSpecFamily = /^V\d+$/.test(version) && Number(version.slice(1)) >= 26;
  const files = isRootBitcodeSpecFamily
    ? [
        ['spec', path.join(resolvedRepoRoot, `BITCODE_SPEC_${version}.md`)],
        ['delta', path.join(resolvedRepoRoot, `BITCODE_SPEC_${version}_DELTA.md`)],
        ['notes', path.join(resolvedRepoRoot, `BITCODE_SPEC_${version}_NOTES.md`)],
        ['parity', path.join(resolvedRepoRoot, `BITCODE_SPEC_${version}_PARITY_MATRIX.md`)]
      ]
    : [
        ['spec', path.join(resolvedRepoRoot, `_legacy/ENGI_SPEC_${version}.md`)],
        ['delta', path.join(resolvedRepoRoot, `_legacy/ENGI_SPEC_${version}_DELTA.md`)],
        ['parity', path.join(resolvedRepoRoot, `_legacy/ENGI_SPEC_${version}_PARITY_MATRIX.md`)]
      ];

  for (const [kind, filePath] of files) {
    const original = await fs.readFile(filePath, 'utf8');
    const rewritten = rewritePromotionStatus(
      version,
      commit,
      original,
      /** @type {'spec' | 'delta' | 'notes' | 'parity'} */ (kind)
    );
    await fs.writeFile(filePath, rewritten, 'utf8');
  }

  process.stdout.write(`Prepared ${version} hand-authored spec family for promotion with proof-source commit ${commit}\n`);
}

main().catch((error) => {
  const detail = error instanceof Error ? error.message : String(error);
  process.stderr.write(`${detail}\n`);
  process.exitCode = 1;
});
