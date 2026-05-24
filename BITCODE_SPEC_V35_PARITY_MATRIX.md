# Bitcode Spec V35 Parity Matrix

## Status

- Version: `V35`
- V35 state: active draft target opened; parity tracks telemetry and documentation depth over promoted V34 canon
- Current canonical/latest target: `V34`
- Prior canonical anchor: `BITCODE_SPEC_V34.md`
- Prior generated proof appendix: `BITCODE_SPEC_V34_PROVEN.md`
- Generated structured artifact inventory: draft `.bitcode/v35-spec-family-report.json`, draft `.bitcode/v35-canonical-input-report.json`, source-safe `.bitcode/v35-documentation-surface-catalog.json`, source-safe `.bitcode/v35-telemetry-taxonomy-catalog.json`, future source-safe V35 telemetry/documentation artifacts, and `BITCODE_SPEC_V35_PROVEN.md` only after V35 promotion
- Source parity state: V35 opens source parity for telemetry taxonomy, documentation surfaces, dashboard/runbook, documentation QA, onboarding, integration, rehearsal, and promotion-readiness gates
- Spec companion: `BITCODE_SPEC_V35.md`
- Notes companion: `BITCODE_SPEC_V35_NOTES.md`
- Delta companion: `BITCODE_SPEC_V35_DELTA.md`
- Generated proof appendix: `BITCODE_SPEC_V35_PROVEN.md` only after V35 promotion
- Scope: V35 draft parity ledger for telemetry and documentation depth over promoted V34 deployment canon
- Last fully realized canonical target preserved in source: `V34`

## Purpose

The V35 parity matrix prevents telemetry and documentation from becoming dashboard-only assumptions, stale docs, or operator folklore.
Every V35 gate must name the package-owned telemetry or documentation object, docs surface, event family, source-safety class, proof root, generated artifact, validation command, dashboard/runbook linkage, and fail-closed docs QA required for closure.

## Audit basis

Gate 1 audit basis:

- `BITCODE_SPEC.txt`
- `BITCODE_SPEC_V34.md`
- `BITCODE_SPEC_V34_PROVEN.md`
- `BITCODE_SPEC_V35.md`
- `BITCODE_SPEC_V35_DELTA.md`
- `BITCODE_SPEC_V35_NOTES.md`
- `BITCODE_SPEC_V35_PARITY_MATRIX.md`
- `SPECIFICATIONS_ROADMAP.md`
- `README.md`
- `AGENTS.md`
- `.github/pull_request_template.md`
- `.github/workflows/bitcode-gate-quality.yml`
- `.github/workflows/bitcode-canon-quality.yml`
- `package.json`
- `packages/protocol/README.md`
- `protocol-demonstration/README.md`
- `packages/protocol/src/canon-posture.js`
- `protocol-demonstration/src/canon-posture.js`
- `packages/protocol/data/state.json`
- `scripts/check-v35-gate1-telemetry-docs-roadmap-opening.mjs`

No `_legacy/` source is active source truth.

## V35 implementation matrix

| Area | Gate | Source evidence | Judgment | Closure requirement |
| --- | --- | --- | --- | --- |
| Draft family and branch posture | Gate 1 | `BITCODE_SPEC_V35.md`, DELTA, NOTES, PARITY, `BITCODE_SPEC.txt`, branch `v35/gate-1-telemetry-docs-roadmap-opening` | drafted | V35 family validates in draft mode over active V34 and `check:v35-gate1` passes. |
| Roadmap truth | Gate 1 | `SPECIFICATIONS_ROADMAP.md`, README, PR template, workflow posture | drafted | Roadmap states V34 active, V35 draft, and coherent V36-V37 responsibilities. |
| Documentation surface catalog | Gate 2 | `DocumentationSurfaceCatalog`, `.bitcode/v35-documentation-surface-catalog.json`, `packages/protocol/src/canonical/documentation-surface-catalog.js`, `packages/protocol/test/v35-documentation-surface-catalog.test.js`, and `check:v35-gate2` | closed | Internal codebase docs, public `/docs`, package docs, route docs, generated artifact docs, API/interface docs, owners, freshness checks, and disclosure classes have package-owned rows. |
| Telemetry taxonomy event schema | Gate 3 | `TelemetryTaxonomyCatalog`, `.bitcode/v35-telemetry-taxonomy-catalog.json`, `packages/protocol/src/canonical/telemetry-taxonomy-catalog.js`, `packages/protocol/test/v35-telemetry-taxonomy-catalog.test.js`, and `check:v35-gate3` | closed | Pipeline, execution, PTRR agent, ThricifiedGeneration, tool, ledger, wallet, storage, interface, deployment, observer, repair, docs QA, and promotion events are source-safe and proof-rooted. |
| Public docs usage guides | Gate 4 | public `/docs`, internal docs roots, package docs, source-safe examples, and `check:v35-gate4` | drafted | Terminal, Protocol, Auxillaries, MCP API, ChatGPT App, BTD, AssetPack ranges, Reads, fees, and proof posture docs derive from package/SPEC truth. |
| Dashboards alerts runbooks incident escalation | Gate 5 | `OperatorRunbookCatalog`, dashboard/runbook bindings, incident fixtures, and `check:v35-gate5` | drafted | Telemetry events bind to dashboard panels, alert thresholds, incident classes, escalation paths, safe commands, forbidden data, and post-incident docs updates. |
| Documentation QA alignment proofs | Gate 6 | `DocsQaAlignmentReport`, generated alignment artifact, tests, workflows, and `check:v35-gate6` | drafted | Code, SPEC, DELTA, NOTES, PARITY, generated proofs, generated artifacts, public docs, internal docs, route docs, and interface docs fail closed on drift. |
| Developer operator testnet rollout guides | Gate 7 | `TestnetRolloutReadinessGuide`, onboarding/operations docs, rehearsal evidence, and `check:v35-gate7` | drafted | Contributors, operators, enterprise readers, depositors, and interface consumers can follow source-safe local/staging-testnet guides. |
| Telemetry documentation interface integration | Gate 8 | Terminal, Auxillaries, API, MCP API, ChatGPT App, route payloads, and `check:v35-gate8` | drafted | Interfaces expose event ids, docs links, runbook links, proof roots, and redaction posture without protected source leakage. |
| Local staging telemetry documentation rehearsal | Gate 9 | local/staging rehearsal logs, docs QA output, dashboard/runbook proof roots, and `check:v35-gate9` | drafted | Operators can follow docs and telemetry through local and staging-testnet drills while value-bearing mainnet remains blocked. |
| Promotion readiness | Gate 10 | `DocumentationTelemetryPromotionReadinessReport`, generated proof support, promotion workflow support, and `check:v35-gate10` | drafted | V35 can promote only after all telemetry/documentation gates pass and generated canon remains source-safe. |

## V35 implementation checklist

| Area | Required V35 result | Judgment |
| --- | --- | --- |
| Active canon pointer | `BITCODE_SPEC.txt` remains `V34` during V35 gate work | drafted |
| Gate branch pattern | V35 work happens on `version/v35` or `v35/gate-N-*` branches | drafted |
| Spec-family shape | V35 SPEC, DELTA, NOTES, and PARITY satisfy the full spec-family checker | drafted |
| Gate 1 script | `pnpm run check:v35-gate1` fails closed on stale posture, missing roadmap truth, or missing telemetry/documentation scope | drafted |
| Gate 2 script | `pnpm run check:v35-gate2` fails closed on stale documentation surface catalog, missing source roots, source-unsafe disclosure, missing package export, missing package test, missing workflow wiring, or missing generated artifact profile binding | closed |
| Gate 3 script | `pnpm run check:v35-gate3` fails closed on stale telemetry taxonomy catalog, missing event families, missing redaction posture, missing proof roots, missing source roots, source-unsafe telemetry payloads, missing package export, missing package test, missing workflow wiring, or missing generated artifact profile binding | closed |
| Gate-quality workflow | Gate workflow validates V34 active / V35 draft posture and the V35 Gate 1 checker | drafted |
| Canon-quality workflow | Canon workflow validates promoted V34 canon, V35 draft family when present, and V34/V35 posture | drafted |
| Package docs | README, protocol package README, demonstration README, and PR template state V34 active / V35 draft workflow | drafted |
| Telemetry/documentation vocabulary | V35 spec family names `TelemetryTaxonomyCatalog`, `DocumentationSurfaceCatalog`, `DocsQaAlignmentReport`, `OperatorRunbookCatalog`, and `TestnetRolloutReadinessGuide` | drafted |
| Public docs disclosure boundary | Public docs disclose guidance, measurements, proof posture, fee/right boundaries, and source-safe previews, not protected source or secrets | drafted |
| Telemetry source-safety boundary | Telemetry events carry redaction posture, source-safety class, proof roots, and correlation ids without raw protected prompts or unpaid source | drafted |
| Dashboard/runbook derivation | Dashboard panels, alert thresholds, runbooks, incident classes, and escalation paths derive from telemetry taxonomy rows | drafted |
| Documentation QA failure posture | Docs QA fails closed on stale tokens, missing source roots, unsupported disclosure claims, and missing generated artifacts | drafted |
| Testnet rollout guide posture | Rollout guides distinguish local, staging-testnet, public testnet, mainnet-ready dry run, and blocked value-bearing mainnet | drafted |
| Promotion readiness report | `DocumentationTelemetryPromotionReadinessReport` covers all V35 telemetry/documentation artifacts, proofs, workflows, and active V35 / draft V36 post-promotion posture | drafted |

## Gate 1 Parity

| Requirement | Source evidence | Current V35 judgment |
| --- | --- | --- |
| Active canon remains V34 during V35 draft opening | `BITCODE_SPEC.txt` contains `V34` | drafted |
| Runtime draft target is V35 | `packages/protocol/src/canon-posture.js` and `protocol-demonstration/src/canon-posture.js` declare V34 active and V35 draft | drafted |
| V35 SPEC family exists as draft | `BITCODE_SPEC_V35.md`, DELTA, NOTES, and PARITY | drafted |
| Roadmap is current | `SPECIFICATIONS_ROADMAP.md` states V34 active canon, V35 active draft target, and V36-V37 scopes | drafted |
| Gate-quality workflow is V35-aware | `.github/workflows/bitcode-gate-quality.yml` | drafted |
| Canon-quality workflow is V35-aware | `.github/workflows/bitcode-canon-quality.yml` | drafted |
| README reflects V34/V35 posture | `README.md` | drafted |
| PR template reflects V35 gate titles | `.github/pull_request_template.md` | drafted |
| V35 Gate 1 checker exists | `scripts/check-v35-gate1-telemetry-docs-roadmap-opening.mjs` and package script | drafted |

## Gate 2 Parity

| Requirement | Source evidence | Current V35 judgment |
| --- | --- | --- |
| Documentation surface catalog implemented | `packages/protocol/src/canonical/documentation-surface-catalog.js` exports `buildDocumentationSurfaceCatalog` and required surface ids | closed |
| Generated artifact exists | `.bitcode/v35-documentation-surface-catalog.json` with `source-safe-documentation-surface-metadata` | closed |
| Public/internal docs scope named | Catalog rows include `public_docs_surface`, `internal_codebase_docs`, `package_readmes`, `route_api_docs`, `api_interface_docs`, and `generated_artifact_docs` | closed |
| Disclosure classes enforced | Catalog rows include disclosure classes, forbidden content, freshness checks, source roots, generated artifacts, and row roots | closed |
| Gate 2 package and workflow proof | `packages/protocol/test/v35-documentation-surface-catalog.test.js`, `scripts/check-v35-gate2-documentation-surface-catalog.mjs`, `package.json`, and `.github/workflows/bitcode-gate-quality.yml` | closed |

## Gate 3 Parity

| Requirement | Source evidence | Current V35 judgment |
| --- | --- | --- |
| Telemetry taxonomy implemented | `packages/protocol/src/canonical/telemetry-taxonomy-catalog.js` exports `buildTelemetryTaxonomyCatalog`, `TELEMETRY_EVENT_FAMILIES`, and telemetry rows | closed |
| Generated artifact exists | `.bitcode/v35-telemetry-taxonomy-catalog.json` with `source-safe-telemetry-taxonomy-metadata` | closed |
| Pipeline and inference event families named | Catalog rows include `pipeline`, `execution`, `ptrr_agent`, `thricified_generation`, and `tool` with formal abstraction names preserved | closed |
| Runtime, value, storage, and interface event families named | Catalog rows include `ledger`, `wallet`, `storage`, `interface`, `deployment`, `observer`, and `repair` | closed |
| Docs QA and promotion event families named | Catalog rows include `docs_qa` and `promotion` with dashboard, runbook, proof root, and replay expectations | closed |
| Redaction posture enforced | Every row names redaction posture, forbidden payload classes, correlation ids, proof root fields, source roots, dashboard panel, alert threshold, runbook link, and deterministic row root | closed |
| Gate 3 package and workflow proof | `packages/protocol/test/v35-telemetry-taxonomy-catalog.test.js`, `scripts/check-v35-gate3-telemetry-taxonomy-event-schema-redaction.mjs`, `package.json`, and `.github/workflows/bitcode-gate-quality.yml` | closed |

## Gate 4 Parity

| Requirement | Source evidence | Current V35 judgment |
| --- | --- | --- |
| Public docs guide scope planned | V35 SPEC gate plan and DELTA | drafted |
| Protected source boundary named | V35 accepted decisions and Gate 4 acceptance criteria | drafted |
| Deferred product boundaries named | V35 SPEC, DELTA, and roadmap | drafted |

## Gate 5 Parity

| Requirement | Source evidence | Current V35 judgment |
| --- | --- | --- |
| Operator runbook catalog planned | `OperatorRunbookCatalog` in SPEC/DELTA/NOTES/PARITY | drafted |
| Dashboard and alert derivation planned | Gate 5 acceptance criteria | drafted |
| Incident escalation boundaries named | V35 SPEC and notes | drafted |

## Gate 6 Parity

| Requirement | Source evidence | Current V35 judgment |
| --- | --- | --- |
| Docs QA report planned | `DocsQaAlignmentReport` in SPEC/DELTA/NOTES/PARITY | drafted |
| Alignment sources named | V35 Gate 6 acceptance criteria | drafted |
| Fail-closed stale docs posture named | V35 SPEC and notes | drafted |

## Gate 7 Parity

| Requirement | Source evidence | Current V35 judgment |
| --- | --- | --- |
| Rollout readiness guide planned | `TestnetRolloutReadinessGuide` in SPEC/DELTA/NOTES/PARITY | drafted |
| Enterprise reader and depositor guide scope named | V35 Gate 7 acceptance criteria | drafted |
| Lane caveat boundaries named | V35 SPEC and DELTA | drafted |

## Gate 8 Parity

| Requirement | Source evidence | Current V35 judgment |
| --- | --- | --- |
| Interface integration planned | Terminal, Auxillaries, API, MCP API, ChatGPT App named in V35 SPEC | drafted |
| Source-safe payload shape planned | V35 Gate 8 acceptance criteria | drafted |
| Proof root and docs link posture named | V35 SPEC and DELTA | drafted |

## Gate 9 Parity

| Requirement | Source evidence | Current V35 judgment |
| --- | --- | --- |
| Local/staging rehearsal planned | V35 SPEC gate plan and DELTA | drafted |
| Docs QA and dashboard/runbook drill named | V35 Gate 9 acceptance criteria | drafted |
| Value-bearing mainnet remains blocked | V35 DELTA and accepted boundaries | drafted |

## Gate 10 Parity

| Requirement | Source evidence | Current V35 judgment |
| --- | --- | --- |
| Promotion readiness report planned | `DocumentationTelemetryPromotionReadinessReport` in V35 SPEC | drafted |
| All telemetry/documentation artifacts covered | V35 Gate 10 acceptance criteria | drafted |
| Runtime posture advances to V35 active / draft V36 | V35 SPEC, DELTA, and README promotion posture | drafted |

## V35 accepted boundaries

- V35 owns telemetry and documentation depth, source-safe observability, documentation QA, dashboards, runbooks, incidents, onboarding, and rollout guides.
- V35 owns broad telemetry/documentation programs, dashboards, docs, incidents, operator guides, and rollout material.
- V36 owns deeper Exchange.
- V37 owns website Conversations.
- V35 does not authorize value-bearing production-mainnet launch.
- V35 does not expose protected AssetPack source before settlement through any runtime carrier, generated proof, log, or interface.

## V35 completion condition

V35 parity is complete when each telemetry/documentation gate row has source evidence, tests, generated artifacts where required, workflow/checker support, and closed parity judgment, and when V35 promotion can rewrite `BITCODE_SPEC.txt` from `V34` to `V35` only after promotion-grade validations pass.
