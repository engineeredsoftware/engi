# Bitcode Spec V33 Parity Matrix

## Status

- Version: `V33`
- V33 state: draft target parity matrix opened; interface-depth parity begins at Gate 1
- Current canonical/latest target: `V32`
- Prior canonical anchor: `BITCODE_SPEC_V32.md`
- Prior generated proof appendix: `BITCODE_SPEC_V32_PROVEN.md`
- Generated structured artifact inventory: draft V33 specifying artifacts `.bitcode/v33-spec-family-report.json` and `.bitcode/v33-canonical-input-report.json`; later V33 gates may add source-safe interface proof artifacts
- Source parity state: Gate 1 defines V33 parity rows and checker coverage; source implementation remains gate-scoped
- Spec companion: `BITCODE_SPEC_V33.md`
- Notes companion: `BITCODE_SPEC_V33_NOTES.md`
- Delta companion: `BITCODE_SPEC_V33_DELTA.md`
- Generated proof appendix: `BITCODE_SPEC_V33_PROVEN.md` only after V33 promotion

## Purpose

The V33 parity matrix prevents interface work from becoming a set of local adapters.
Every V33 gate must name the package-owned contract, interface surface, schema, auth policy, source-safety class, example fixture, compatibility row, telemetry/proof hook, validation command, and failure or repair posture required for closure.

## Audit basis

Gate 1 audit basis:

- `BITCODE_SPEC.txt`
- `BITCODE_SPEC_V32.md`
- `BITCODE_SPEC_V32_PROVEN.md`
- `BITCODE_SPEC_V33.md`
- `BITCODE_SPEC_V33_DELTA.md`
- `BITCODE_SPEC_V33_NOTES.md`
- `BITCODE_SPEC_V33_PARITY_MATRIX.md`
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
- `scripts/check-v33-gate1-interface-roadmap-opening.mjs`

No `_legacy/` source is active source truth.

## V33 implementation matrix

| Area | Gate | Source evidence | Judgment | Closure requirement |
| --- | --- | --- | --- | --- |
| Draft family and branch posture | Gate 1 | `BITCODE_SPEC_V33.md`, DELTA, NOTES, PARITY, `BITCODE_SPEC.txt`, branch `v33/gate-1-interface-roadmap-opening` | drafted | V33 family validates in draft mode over active V32 and `check:v33-gate1` passes. |
| Roadmap truth | Gate 1 | `SPECIFICATIONS_ROADMAP.md`, README, PR template, workflow posture | drafted | Roadmap states V32 active, V33 draft, and coherent V34-V37 responsibilities. |
| Interface contract catalog | Gate 2 | planned `InterfaceContractCatalog` source and generated proof artifact | pending | Active and deferred interface surfaces have package-owned rows. |
| MCP API contracts | Gate 3 | planned MCP tool contract tests and examples | pending | MCP tool discovery, schemas, auth, denied states, and proof roots are package-derived. |
| ChatGPT App contracts | Gate 4 | planned ChatGPT App action contract tests and examples | pending | ChatGPT App actions match package-owned Read, Need, Finding Fits, preview, fee, settlement, and delivery contracts. |
| Interface authorization policy | Gate 5 | planned `InterfaceAuthorizationPolicy` fixtures and tests | pending | Interface auth and license denials fail closed with repair posture. |
| Read license and AssetPack rights contracts | Gate 6 | planned `ReadLicenseInterfaceContract` and `AssetPackRightsInterfaceContract` tests | pending | Source-safe preview, paid settlement, BTD rights, and delivery contracts are consistent across interfaces. |
| API schema compatibility | Gate 7 | planned `APISchemaCompatibilityMatrix` artifact and tests | pending | Schemas, examples, compatibility status, and validation commands are source-safe and versionless. |
| Interface telemetry proof hooks | Gate 8 | planned `InterfaceTelemetryProofHook` artifact and tests | pending | Interface actions replay to executions, ledger, database, object storage, and generated proof roots. |
| Interface consumer UX regression proof | Gate 9 | planned MCP, ChatGPT App, public API, and Terminal handoff consumer proof | pending | Consumers see source-safe summaries, proof roots, fee/rights previews, and readable denials. |
| Promotion readiness | Gate 10 | planned V33 promotion checker and generated proof support | pending | `version/v33` can promote only after all V33 gates pass and generated canon is source-safe. |

## V33 implementation checklist

| Area | Required V33 result | Judgment |
| --- | --- | --- |
| Active canon pointer | `BITCODE_SPEC.txt` remains `V32` during V33 gate work | drafted |
| Gate branch pattern | V33 work happens on `version/v33` or `v33/gate-N-*` branches | drafted |
| Spec-family shape | V33 SPEC, DELTA, NOTES, and PARITY satisfy the full spec-family checker | drafted |
| Gate 1 script | `pnpm run check:v33-gate1` fails closed on stale posture, missing roadmap truth, or missing interface-depth scope | drafted |
| Gate-quality workflow | Gate workflow validates V32 active / V33 draft posture and the V33 Gate 1 checker | drafted |
| Canon-quality workflow | Canon workflow validates promoted V32 canon, V33 draft family when present, and V32/V33 posture | drafted |
| Package docs | README, protocol package README, demonstration README, and PR template state V32 active / V33 draft workflow | drafted |
| Interface vocabulary | V33 spec family names MCP API, ChatGPT App, `InterfaceContractCatalog`, `InterfaceAuthorizationPolicy`, `ReadLicenseInterfaceContract`, `AssetPackRightsInterfaceContract`, `APISchemaCompatibilityMatrix`, and `InterfaceTelemetryProofHook` | drafted |

## Gate 1 Parity

| Requirement | Source evidence | Current V33 judgment |
| --- | --- | --- |
| Active canon remains V32 during V33 draft opening | `BITCODE_SPEC.txt` contains `V32` | drafted |
| Runtime draft target is V33 | `packages/protocol/src/canon-posture.js` and `protocol-demonstration/src/canon-posture.js` declare V32 active and V33 draft | drafted |
| V33 SPEC family exists as draft | `BITCODE_SPEC_V33.md`, DELTA, NOTES, and PARITY | drafted |
| Roadmap is current | `SPECIFICATIONS_ROADMAP.md` states V32 active canon, V33 active draft target, and V34-V37 scopes | drafted |
| Gate-quality workflow is V33-aware | `.github/workflows/bitcode-gate-quality.yml` | drafted |
| Canon-quality workflow is V33-aware | `.github/workflows/bitcode-canon-quality.yml` | drafted |
| README reflects V32/V33 posture | `README.md` | drafted |
| PR template reflects V33 gate titles | `.github/pull_request_template.md` | drafted |
| V33 Gate 1 checker exists | `scripts/check-v33-gate1-interface-roadmap-opening.mjs` and package script | drafted |

## V33 accepted boundaries

- V33 owns interface-depth and interface-owned proof hooks.
- V34 owns deployment, host capability, distributed execution, environment lanes, rollback, upgrades, and secret rotation.
- V35 owns broad telemetry/documentation programs, dashboards, docs, incidents, operator guides, and rollout material.
- V36 owns deeper Exchange.
- V37 owns website Conversations.
- V33 does not authorize value-bearing production-mainnet launch.
- V33 does not expose protected AssetPack source before settlement through any interface.

## V33 completion condition

V33 is complete when all ten V33 gates are closed, source-safe interface contracts are package-owned and tested, MCP API and ChatGPT App behavior matches public API and Terminal handoff contracts, interface authorization and rights denials fail closed, schema compatibility evidence is generated, interface telemetry proof hooks replay to ledger/database/object-storage truth, and V33 promotion can generate `BITCODE_SPEC_V33_PROVEN.md` plus source-safe `.bitcode/v33-*` artifacts.
