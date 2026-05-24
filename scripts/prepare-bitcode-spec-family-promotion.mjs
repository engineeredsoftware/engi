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
      'Usage: node scripts/prepare-bitcode-spec-family-promotion.mjs --version V31 --commit <sha> [--repo-root <path>]',
      '',
      'Rewrites the hand-authored spec family status truth for canonical promotion.',
      'Currently implemented for V21, V22, V23, V24, V25, V28, V29, V30, V31, V32, V33, V34, and V35.'
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
 * @param {string} content
 * @param {string} heading
 * @returns {string}
 */
function rewritePromotedParityTableJudgments(content, heading) {
  const headingPattern = new RegExp(`^## ${heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*$`, 'm');
  const headingMatch = content.match(headingPattern);
  if (!headingMatch || typeof headingMatch.index !== 'number') return content;

  const sectionStart = headingMatch.index;
  const nextHeadingMatch = content.slice(sectionStart + headingMatch[0].length).match(/^##\s/m);
  const sectionEnd = nextHeadingMatch
    ? sectionStart + headingMatch[0].length + nextHeadingMatch.index
    : content.length;
  const section = content.slice(sectionStart, sectionEnd);
  const lines = section.split('\n');
  const headerIndex = lines.findIndex((line) => line.trim().startsWith('|'));
  if (headerIndex < 0) return content;

  const headers = lines[headerIndex].split('|').slice(1, -1).map((cell) => cell.trim());
  const judgmentIndex = headers.findIndex((header) => header === 'Judgment');
  if (judgmentIndex < 0) return content;

  const rewrittenLines = lines.map((line, index) => {
    if (index <= headerIndex + 1 || !line.trim().startsWith('|')) return line;
    const cells = line.split('|');
    const cellIndex = judgmentIndex + 1;
    if (!cells[cellIndex] || cells[cellIndex].trim() !== 'drafted') return line;
    cells[cellIndex] = ' closed ';
    return cells.join('|');
  });

  return `${content.slice(0, sectionStart)}${rewrittenLines.join('\n')}${content.slice(sectionEnd)}`;
}

/**
 * @param {string} content
 * @param {string} version
 * @returns {string}
 */
function rewritePromotedParityJudgments(content, version) {
  return [
    `${version} implementation matrix`,
    `${version} implementation checklist`
  ].reduce((rewritten, heading) => rewritePromotedParityTableJudgments(rewritten, heading), content);
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
    const rewritten = rewriteStatusValues(content, {
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
    return kind === 'parity' ? rewritePromotedParityJudgments(rewritten, version) : rewritten;
  }

  if (version === 'V30') {
    const sharedInventory = 'active canonical `.bitcode/v30-spec-family-report.json`, `.bitcode/v30-canonical-input-report.json`, `.bitcode/v30-canon-posture-drift-report.json`, `.bitcode/v30-protocol-telemetry-proof-hooks.json`, V30 gate-quality and promotion workflow evidence, and `BITCODE_SPEC_V30_PROVEN.md` as the generated proof appendix for V30 promotion';
    const scopeByKind = {
      spec: 'V30 canonical system specification for Protocol/BTD package API boundaries, Bitcoin/Taproot/PSBT rigor, BTD AssetPack mint/read receipts, testnet ledger projection, source-to-shares proof cleanup, bridge-readiness research boundaries, Protocol telemetry/proof hooks, interface regression, and promotion-ready workflow proof over V29',
      delta: 'V30 canonical delta for Protocol/BTD package API boundaries, Bitcoin/Taproot/PSBT rigor, BTD AssetPack mint/read receipts, testnet ledger projection, source-to-shares proof cleanup, bridge-readiness research boundaries, Protocol telemetry/proof hooks, interface regression, and promotion-ready workflow proof over V29',
      notes: 'V30 canonical notes for Protocol/BTD hardening, local/staging readiness, and promotion automation over V29',
      parity: 'V30 canonical parity ledger for Protocol/BTD hardening, local/staging readiness, and promotion automation over V29'
    };
    const stateByKind = {
      spec: 'canonical promotion complete; V30 is the active Protocol/BTD hardening canon and the V30 hand-authored plus generated canon are aligned',
      delta: 'canonical promotion complete; this delta records the promoted V29-to-V30 Protocol/BTD hardening and promotion-readiness closure set',
      notes: 'canonical promotion complete; V30 notes record the accepted Protocol/BTD hardening, local/staging, and promotion-readiness evidence',
      parity: 'canonical promotion complete; V30 parity truth, Protocol/BTD gate closure, generated proof, and promotion automation are aligned'
    };
    const rewritten = rewriteStatusValues(content, {
      Scope: scopeByKind[kind],
      ...(kind !== 'delta'
        ? { 'Last fully realized canonical target preserved in source': '`V30`' }
        : {}),
      'Current canonical/latest target': '`V30`',
      'Canonical proof-source commit': `\`${commit}\``,
      'Generated structured artifact inventory': sharedInventory,
      'Source parity state':
        'V30 source-side Protocol/BTD package APIs, Bitcoin/PSBT, receipts, ledger projection, source-to-shares, bridge-readiness, telemetry/proof hooks, interface regression, workflow, and promotion surfaces are canonicalized in the promoted V30 file family',
      'V30 state': stateByKind[kind]
    });
    return kind === 'parity' ? rewritePromotedParityJudgments(rewritten, version) : rewritten;
  }

  if (version === 'V31') {
    const sharedInventory = 'active canonical `.bitcode/v31-spec-family-report.json`, `.bitcode/v31-canonical-input-report.json`, `.bitcode/v31-canon-posture-drift-report.json`, `.bitcode/v31-auxillaries-telemetry-proof-hooks.json`, V31 gate-quality and promotion workflow evidence, and `BITCODE_SPEC_V31_PROVEN.md` as the generated proof appendix for V31 promotion';
    const scopeByKind = {
      spec: 'V31 canonical system specification for Auxillaries support/control surfaces: Profile, account, provider connection, interface admission, Wallet, BTD pane, organization authority, policy decision, readiness diagnostics, recovery runs, accessibility/responsive UX, source-safe telemetry proof hooks, and promotion-ready workflow proof over V30',
      delta: 'V31 canonical delta for Auxillaries support/control surfaces, source-safe recovery and telemetry proof hooks, accessibility/responsive proof, and promotion-ready workflow proof over V30',
      notes: 'V31 canonical notes for Auxillaries support/control surfaces, source-safe recovery, telemetry proof hooks, UX proof, local/staging readiness, and promotion automation over V30',
      parity: 'V31 canonical parity ledger for Auxillaries support/control surfaces, source-safe recovery and telemetry proof hooks, UX proof, local/staging readiness, and promotion automation over V30'
    };
    const stateByKind = {
      spec: 'canonical promotion complete; V31 is the active Auxillaries support/control canon and the V31 hand-authored plus generated canon are aligned',
      delta: 'canonical promotion complete; this delta records the promoted V30-to-V31 Auxillaries support/control and promotion-readiness closure set',
      notes: 'canonical promotion complete; V31 notes record the accepted Auxillaries support/control, local/staging, and promotion-readiness evidence',
      parity: 'canonical promotion complete; V31 parity truth, Auxillaries gate closure, generated proof, and promotion automation are aligned'
    };
    const rewritten = rewriteStatusValues(content, {
      Scope: scopeByKind[kind],
      ...(kind !== 'delta'
        ? { 'Last fully realized canonical target preserved in source': '`V31`' }
        : {}),
      'Current canonical/latest target': '`V31`',
      'Canonical proof-source commit': `\`${commit}\``,
      'Generated structured artifact inventory': sharedInventory,
      'Source parity state':
        'V31 source-side Auxillaries package contracts, route data, client hooks, panes, organization authority, recovery runs, telemetry/proof hooks, UX/accessibility, workflow, and promotion surfaces are canonicalized in the promoted V31 file family',
      'V31 state': stateByKind[kind]
    });
    return kind === 'parity' ? rewritePromotedParityJudgments(rewritten, version) : rewritten;
  }

  if (version === 'V32') {
    const sharedInventory = 'active canonical `.bitcode/v32-spec-family-report.json`, `.bitcode/v32-canonical-input-report.json`, `.bitcode/v32-canon-posture-drift-report.json`, `.bitcode/v32-proof-coverage-matrix.json`, `.bitcode/v32-artifact-volatility-inventory.json`, `.bitcode/v32-deterministic-replay-report.json`, `.bitcode/v32-reading-pipeline-proof-coverage.json`, `.bitcode/v32-ledger-btd-settlement-failure-state-coverage.json`, `.bitcode/v32-interface-contract-regression-suite.json`, `.bitcode/v32-browser-accessibility-responsive-visual-proof.json`, `.bitcode/v32-testnet-mainnet-readiness-rehearsal.json`, `.bitcode/v32-promotion-proof-generation-hardening.json`, `.bitcode/v32-promotion-readiness-report.json`, V32 gate-quality and promotion workflow evidence, and `BITCODE_SPEC_V32_PROVEN.md` as the generated proof appendix for V32 promotion';
    const scopeByKind = {
      spec: 'V32 canonical system specification for provation/testing over promoted Terminal, Reading, Protocol/BTD, Auxillaries, MCP, ChatGPT App, API, ledger/database/object-storage, and protocol-demonstration rails',
      delta: 'V32 canonical delta for provation/testing over promoted Terminal, Reading, Protocol/BTD, Auxillaries, MCP, ChatGPT App, API, ledger/database/object-storage, and protocol-demonstration rails',
      notes: 'V32 canonical notes for provation/testing over promoted Terminal, Reading, Protocol/BTD, Auxillaries, MCP, ChatGPT App, API, ledger/database/object-storage, and protocol-demonstration rails',
      parity: 'V32 canonical parity ledger for provation/testing over promoted Terminal, Reading, Protocol/BTD, Auxillaries, MCP, ChatGPT App, API, ledger/database/object-storage, and protocol-demonstration rails'
    };
    const stateByKind = {
      spec: 'canonical promotion complete; V32 is the active provation/testing canon and the V32 hand-authored plus generated canon are aligned',
      delta: 'canonical promotion complete; this delta records the promoted V31-to-V32 provation/testing closure set',
      notes: 'canonical promotion complete; V32 notes record the accepted proof/test, readiness rehearsal, and promotion-readiness evidence',
      parity: 'canonical promotion complete; V32 parity truth, generated proof artifacts, gate closure, and promotion automation are aligned'
    };
    const rewritten = rewriteStatusValues(content, {
      Scope: scopeByKind[kind],
      ...(kind !== 'delta'
        ? { 'Last fully realized canonical target preserved in source': '`V32`' }
        : {}),
      'Current canonical/latest target': '`V32`',
      'Canonical proof-source commit': `\`${commit}\``,
      'Generated structured artifact inventory': sharedInventory,
      'Source parity state':
        'V32 source-side proof/test replay, generated artifacts, Reading pipeline proof coverage, ledger/BTD failure-state proof, interface regression, browser/accessibility/responsive/visual proof, readiness rehearsal, workflow, and promotion surfaces are canonicalized in the promoted V32 file family',
      'V32 state': stateByKind[kind]
    });
    return kind === 'parity' ? rewritePromotedParityJudgments(rewritten, version) : rewritten;
  }

  if (version === 'V33') {
    const sharedInventory = 'active canonical `.bitcode/v33-spec-family-report.json`, `.bitcode/v33-canonical-input-report.json`, `.bitcode/v33-canon-posture-drift-report.json`, `.bitcode/v33-interface-contract-catalog.json`, `.bitcode/v33-mcp-api-tool-contracts.json`, `.bitcode/v33-chatgpt-app-action-contracts.json`, `.bitcode/v33-interface-authorization-policy.json`, `.bitcode/v33-read-license-assetpack-rights-contracts.json`, `.bitcode/v33-api-schema-compatibility-matrix.json`, `.bitcode/v33-interface-telemetry-proof-hooks.json`, `.bitcode/v33-interface-consumer-ux-regression-proof.json`, `.bitcode/v33-promotion-readiness-report.json`, V33 gate-quality and promotion workflow evidence, and `BITCODE_SPEC_V33_PROVEN.md` as the generated proof appendix for V33 promotion';
    const scopeByKind = {
      spec: 'V33 canonical system specification for commercial interface depth over promoted MCP API, ChatGPT App, public API, package consumers, authorization, schemas, license/rights, telemetry, and source-safe consumer UX contracts',
      delta: 'V33 canonical delta for commercial interface depth over promoted V32 proof/testing canon',
      notes: 'V33 canonical notes for commercial interface depth over promoted V32 proof/testing canon',
      parity: 'V33 canonical parity ledger for commercial interface depth over promoted V32 proof/testing canon'
    };
    const stateByKind = {
      spec: 'canonical promotion complete; V33 is the active commercial interface-depth canon and the V33 hand-authored plus generated canon are aligned',
      delta: 'canonical promotion complete; this delta records the promoted V32-to-V33 interface-depth closure set',
      notes: 'canonical promotion complete; V33 notes record the accepted interface contract, policy, schema, telemetry, consumer UX, and promotion-readiness evidence',
      parity: 'canonical promotion complete; V33 parity truth, generated interface artifacts, gate closure, and promotion automation are aligned'
    };
    const rewritten = rewriteStatusValues(content, {
      Scope: scopeByKind[kind],
      ...(kind !== 'delta'
        ? { 'Last fully realized canonical target preserved in source': '`V33`' }
        : {}),
      'Current canonical/latest target': '`V33`',
      'Canonical proof-source commit': `\`${commit}\``,
      'Generated structured artifact inventory': sharedInventory,
      'Source parity state':
        'V33 source-side interface contract catalog, MCP tool contracts, ChatGPT App action contracts, authorization policy, Read license and AssetPack rights contracts, API schema compatibility matrix, interface telemetry proof hooks, consumer UX regression proof, workflow, and promotion surfaces are canonicalized in the promoted V33 file family',
      'V33 state': stateByKind[kind]
    });
    return kind === 'parity' ? rewritePromotedParityJudgments(rewritten, version) : rewritten;
  }

  if (version === 'V34') {
    const sharedInventory = 'active canonical `.bitcode/v34-spec-family-report.json`, `.bitcode/v34-canonical-input-report.json`, `.bitcode/v34-canon-posture-drift-report.json`, `.bitcode/v34-deployment-host-capability-catalog.json`, `.bitcode/v34-environment-lane-contracts.json`, `.bitcode/v34-distributed-execution-runtime-receipts.json`, `.bitcode/v34-deployment-storage-posture.json`, `.bitcode/v34-secret-rotation-boundary-operations.json`, `.bitcode/v34-migration-cicd-approval-gates.json`, `.bitcode/v34-runtime-observers-broadcasters-repair-jobs.json`, `.bitcode/v34-rollback-upgrade-data-repair-playbooks.json`, `.bitcode/v34-local-staging-testnet-deployment-rehearsal.json`, `.bitcode/v34-promotion-readiness-report.json`, V34 gate-quality and promotion workflow evidence, and `BITCODE_SPEC_V34_PROVEN.md` as the generated proof appendix for V34 promotion';
    const scopeByKind = {
      spec: 'V34 canonical system specification for deployment depth over promoted host capabilities, environment lanes, distributed executions, storage posture, credential operations, migration approvals, observers, repair jobs, rehearsal, and promotion readiness',
      delta: 'V34 canonical delta for deployment depth over promoted V33 commercial interface canon',
      notes: 'V34 canonical notes for deployment depth over promoted V33 commercial interface canon',
      parity: 'V34 canonical parity ledger for deployment depth over promoted V33 commercial interface canon'
    };
    const stateByKind = {
      spec: 'canonical promotion complete; V34 is the active deployment-depth canon and the V34 hand-authored plus generated canon are aligned',
      delta: 'canonical promotion complete; this delta records the promoted V33-to-V34 deployment-depth closure set',
      notes: 'canonical promotion complete; V34 notes record the accepted deployment host, lane, runtime, storage, credential, migration, repair, rehearsal, and promotion-readiness evidence',
      parity: 'canonical promotion complete; V34 parity truth, generated deployment artifacts, gate closure, and promotion automation are aligned'
    };
    const rewritten = rewriteStatusValues(content, {
      Scope: scopeByKind[kind],
      ...(kind !== 'delta'
        ? { 'Last fully realized canonical target preserved in source': '`V34`' }
        : {}),
      'Current canonical/latest target': '`V34`',
      'Canonical proof-source commit': `\`${commit}\``,
      'Generated structured artifact inventory': sharedInventory,
      'Source parity state':
        'V34 source-side deployment host capability catalog, environment lane contracts, distributed execution runtime receipts, storage posture, secret rotation, migration CI/CD approval gates, runtime observer and repair jobs, rollback/upgrade/data repair playbooks, local/staging-testnet deployment rehearsal, workflow, and promotion surfaces are canonicalized in the promoted V34 file family',
      'V34 state': stateByKind[kind]
    });
    return kind === 'parity' ? rewritePromotedParityJudgments(rewritten, version) : rewritten;
  }

  if (version === 'V35') {
    const sharedInventory = 'active canonical `.bitcode/v35-spec-family-report.json`, `.bitcode/v35-canonical-input-report.json`, `.bitcode/v35-canon-posture-drift-report.json`, `.bitcode/v35-documentation-surface-catalog.json`, `.bitcode/v35-telemetry-taxonomy-catalog.json`, `.bitcode/v35-public-docs-usage-guides.json`, `.bitcode/v35-operator-runbook-catalog.json`, `.bitcode/v35-docs-qa-alignment-report.json`, `.bitcode/v35-testnet-rollout-readiness-guide.json`, `.bitcode/v35-telemetry-documentation-interface-integration.json`, `.bitcode/v35-local-staging-telemetry-documentation-rehearsal.json`, `.bitcode/v35-documentation-telemetry-promotion-readiness-report.json`, V35 gate-quality and promotion workflow evidence, and `BITCODE_SPEC_V35_PROVEN.md` as the generated proof appendix for V35 promotion';
    const scopeByKind = {
      spec: 'V35 canonical system specification for telemetry and documentation depth over promoted documentation surfaces, telemetry taxonomy, public docs, runbooks, docs QA, rollout guides, interface integration, local/staging rehearsal, and promotion readiness',
      delta: 'V35 canonical delta for telemetry and documentation depth over promoted V34 deployment-depth canon',
      notes: 'V35 canonical notes for telemetry and documentation depth over promoted V34 deployment-depth canon',
      parity: 'V35 canonical parity ledger for telemetry and documentation depth over promoted V34 deployment-depth canon'
    };
    const stateByKind = {
      spec: 'canonical promotion complete; V35 is the active telemetry and documentation depth canon and the V35 hand-authored plus generated canon are aligned',
      delta: 'canonical promotion complete; this delta records the promoted V34-to-V35 telemetry and documentation depth closure set',
      notes: 'canonical promotion complete; V35 notes record the accepted documentation, telemetry, docs QA, rollout, rehearsal, and promotion-readiness evidence',
      parity: 'canonical promotion complete; V35 parity truth, generated telemetry/documentation artifacts, gate closure, and promotion automation are aligned'
    };
    const rewritten = rewriteStatusValues(content, {
      Scope: scopeByKind[kind],
      ...(kind !== 'delta'
        ? { 'Last fully realized canonical target preserved in source': '`V35`' }
        : {}),
      'Current canonical/latest target': '`V35`',
      'Canonical proof-source commit': `\`${commit}\``,
      'Generated structured artifact inventory': sharedInventory,
      'Source parity state':
        'V35 source-side documentation surface catalog, telemetry taxonomy catalog, public docs usage guides, operator runbook catalog, docs QA report, testnet rollout guide, telemetry documentation interface integration, local staging rehearsal, workflow, and promotion surfaces are canonicalized in the promoted V35 file family',
      'V35 state': stateByKind[kind]
    });
    return kind === 'parity' ? rewritePromotedParityJudgments(rewritten, version) : rewritten;
  }

  if (!['V21', 'V22', 'V23', 'V24', 'V25'].includes(version)) {
    throw new Error(`Promotion hand-authored family rewriting is currently implemented for V21, V22, V23, V24, V25, V28, V29, V30, V31, V32, V33, V34, and V35. Received ${version}.`);
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
