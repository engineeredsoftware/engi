# Bitcode Spec V32 Parity Matrix

## Status

- Version: `V32`
- V32 state: draft target parity matrix opened; V32 proof/test parity is not promoted
- Current canonical/latest target: `V31`
- Canonical proof-source commit: none until V32 promotion
- Prior canonical anchor: `BITCODE_SPEC_V31.md`
- Prior generated proof appendix: `BITCODE_SPEC_V31_PROVEN.md`
- Generated structured artifact inventory: planned `.bitcode/v32-spec-family-report.json`, `.bitcode/v32-canonical-input-report.json`, `.bitcode/v32-canon-posture-drift-report.json`, generated Gate 2 `.bitcode/v32-proof-coverage-matrix.json`, later V32 proof/test coverage artifacts, and `BITCODE_SPEC_V32_PROVEN.md` only after promotion
- Source parity state: V32 proof-family replay, deterministic artifact generation, scenario/failure-state coverage, cross-surface regression, browser/accessibility/visual proof, readiness rehearsal, and promotion-proof hardening are opened but not yet closed
- State: draft target parity matrix opened
- Active canonical pointer during draft opening: `BITCODE_SPEC.txt` -> `V31`
- Scope: V32 parity ledger for provation and testing over promoted V31
- Spec companion: `BITCODE_SPEC_V32.md`
- Notes companion: `BITCODE_SPEC_V32_NOTES.md`
- Delta companion: `BITCODE_SPEC_V32_DELTA.md`
- Generated proof appendix: none until V32 promotion
- Last fully realized canonical target preserved in source: `V31`

## Purpose

The V32 parity matrix prevents proof work from becoming ceremonial.
Every V32 gate must name the promoted behavior being proved, the package/interface owner, the fixture or replay source, the validation command, the generated artifact, the source-safety class, and the failure or repair posture that must be covered before closure.

## Audit basis

Gate 1 audit basis:

- `BITCODE_SPEC.txt`
- `BITCODE_SPEC_V31.md`
- `BITCODE_SPEC_V31_DELTA.md`
- `BITCODE_SPEC_V31_NOTES.md`
- `BITCODE_SPEC_V31_PARITY_MATRIX.md`
- `BITCODE_SPEC_V31_PROVEN.md`
- `BITCODE_SPEC_V32.md`
- `BITCODE_SPEC_V32_DELTA.md`
- `BITCODE_SPEC_V32_NOTES.md`
- `BITCODE_SPEC_V32_PARITY_MATRIX.md`
- `SPECIFICATIONS_ROADMAP.md`
- `README.md`
- `AGENTS.md`
- `.github/pull_request_template.md`
- `.github/workflows/bitcode-gate-quality.yml`
- `.github/workflows/bitcode-canon-quality.yml`
- `package.json`
- `.bitcode/v32-proof-coverage-matrix.json`
- `scripts/v32-proof-coverage-matrix.mjs`
- `scripts/generate-v32-proof-coverage-matrix.mjs`
- `scripts/check-v32-gate2-proof-matrix-inventory.mjs`
- `packages/protocol/README.md`
- `protocol-demonstration/README.md`
- `packages/protocol/src/canon-posture.js`
- `protocol-demonstration/src/canon-posture.js`

No `_legacy/` source is active source truth.

## V32 implementation matrix

| Area | Gate | Source evidence | Judgment | Closure requirement |
| --- | --- | --- | --- | --- |
| Draft family and branch posture | Gate 1 | `BITCODE_SPEC_V32.md`, DELTA, NOTES, PARITY, `BITCODE_SPEC.txt`, branch `v32/gate-1-provation-roadmap-opening` | drafted | V32 family validates in draft mode over active V31 and `check:v32-gate1` passes. |
| Roadmap truth | Gate 1 | `SPECIFICATIONS_ROADMAP.md`, README, PR template, workflow posture | drafted | Roadmap states V31 active, V32 draft, and coherent V33-V37 responsibilities. |
| Proof matrix inventory | Gate 2 | `.bitcode/v32-proof-coverage-matrix.json`, `scripts/v32-proof-coverage-matrix.mjs`, generator, checker, `check:v32-gate2` | drafted | Every promoted proof/test surface has owner package/interface, fixture, replay command, artifact, source-safety class, coverage status, required contexts, failure mode, and repair posture. |
| Deterministic replay and artifacts | Gate 3 | planned replay harness, volatility inventory, artifact checks | draft-required | Generated artifacts are stable, source-safe, and fail closed on drift. |
| Reading pipeline proof coverage | Gate 4 | planned `ReadNeedComprehensionSynthesis` and `ReadFitsFindingSynthesis` tests | draft-required | Pipeline phases, PTRR agents, steps, ThricifiedGenerations, prompts, tools, telemetry, and outputs are covered. |
| Ledger/BTD settlement failure states | Gate 5 | planned BTD/BTC/ledger/reconciliation tests | draft-required | Economic and ownership state has success, blocked, and repair proof. |
| Interface contract regression | Gate 6 | planned API/MCP/ChatGPT App/Terminal/Auxillaries fixtures | draft-required | Interface contracts prove auth, source-safety, policy denial, and deferred hooks. |
| Browser/accessibility/responsive/visual proof | Gate 7 | planned Terminal and Auxillaries browser evidence | draft-required | Operator surfaces have stable semantic and visual coverage across supported viewports. |
| Testnet/mainnet readiness rehearsal | Gate 8 | planned readiness records and lane checks | draft-required | Local, staging-testnet, production-mainnet, and offline lanes are represented without approving value-bearing launch. |
| Promotion proof hardening | Gate 9 | planned generator/workflow diagnostics | draft-required | V32 promotion artifacts are reproducible and debuggable. |
| Promotion readiness | Gate 10 | planned V32 promotion workflow and generated appendix | draft-required | `version/v32` can promote only after all V32 gates pass and generated canon is source-safe. |

## V32 implementation checklist

| Area | Required V32 result | Judgment |
| --- | --- | --- |
| Active canon pointer | `BITCODE_SPEC.txt` remains `V31` during V32 gate work | drafted |
| Gate branch pattern | V32 work happens on `version/v32` or `v32/gate-N-*` branches | drafted |
| Spec-family shape | V32 SPEC, DELTA, NOTES, and PARITY satisfy the full spec-family checker | drafted |
| Gate 1 script | `pnpm run check:v32-gate1` fails closed on stale posture, missing roadmap truth, or missing provation/testing scope | drafted |
| Gate 2 matrix artifact | `.bitcode/v32-proof-coverage-matrix.json` records required proof/test surfaces with source-safe rows | drafted |
| Gate 2 scripts | `pnpm run generate:v32-proof-coverage-matrix` regenerates the artifact and `pnpm run check:v32-gate2` fails closed on drift, missing fields, hidden gaps, or secret-like payloads | drafted |
| Gate-quality workflow | Gate workflow validates V31 active / V32 draft posture plus V32 Gate 1 and Gate 2 checkers | drafted |
| Canon-quality workflow | Canon workflow validates V31 active / V32 draft posture and promoted V31 canon | drafted |

## Gate 1 Parity

| Requirement | Source evidence | Current V32 judgment |
| --- | --- | --- |
| Active canon remains V31 during V32 draft opening | `BITCODE_SPEC.txt` contains `V31` | drafted |
| Runtime draft target is V32 | `packages/protocol/src/canon-posture.js` and `protocol-demonstration/src/canon-posture.js` declare V31 active and V32 draft | drafted |
| V32 SPEC family exists as draft | `BITCODE_SPEC_V32.md`, DELTA, NOTES, and PARITY | drafted |
| Roadmap is current | `SPECIFICATIONS_ROADMAP.md` states V31 active canon, V32 active draft target, and V33-V37 scopes | drafted |
| Gate-quality workflow is V32-aware | `.github/workflows/bitcode-gate-quality.yml` | drafted |
| Canon-quality workflow is V32-aware | `.github/workflows/bitcode-canon-quality.yml` | drafted |
| README reflects V31/V32 posture | `README.md` | drafted |
| PR template reflects V32 gate titles | `.github/pull_request_template.md` | drafted |
| V32 Gate 1 checker exists | `scripts/check-v32-gate1-provation-roadmap-opening.mjs` and package script | drafted |

## Gate 2 Parity

| Requirement | Source evidence | Current V32 judgment |
| --- | --- | --- |
| Promoted surfaces are inventoried | `.bitcode/v32-proof-coverage-matrix.json` rows for `terminal`, `reading`, `protocol-btd`, `auxillaries`, `mcp`, `chatgpt-app`, `api`, `ledger`, `database`, `object-storage`, `promotion`, and `protocol-demonstration` | drafted |
| Coverage gaps are explicit | matrix `coverageStatus` vocabulary includes `planned-gap`, with blockers on planned-gap rows | drafted |
| Source-safety classes are assigned | matrix source-safety class vocabulary includes `source-safe-public`, `source-safe-internal`, `secret-presence-only`, `protected-source-locked`, `source-safe-generated-proof`, and `deferred-blocker` | drafted |
| Matrix is deterministic | `scripts/generate-v32-proof-coverage-matrix.mjs` and `stableStringify` in `scripts/v32-proof-coverage-matrix.mjs` | drafted |
| Gate check is wired | `scripts/check-v32-gate2-proof-matrix-inventory.mjs`, `check:v32-gate2`, and `bitcode-gate-quality.yml` | drafted |

## Gate 3 Parity

| Requirement | Source evidence | Current V32 judgment |
| --- | --- | --- |
| Replay commands are deterministic | planned replay harness | draft-required |
| Artifact volatility is controlled | planned volatility inventory updates | draft-required |
| Stale artifacts fail closed | planned generated artifact checks | draft-required |

## Gate 4 Parity

| Requirement | Source evidence | Current V32 judgment |
| --- | --- | --- |
| Reading phases are covered | planned pipeline tests | draft-required |
| PTRR steps and ThricifiedGenerations are typed | planned pipeline fixtures | draft-required |
| Source-safe preview and paid delivery boundaries are preserved | planned disclosure/delivery tests | draft-required |

## Gate 5 Parity

| Requirement | Source evidence | Current V32 judgment |
| --- | --- | --- |
| BTC fee and BTD receipts have failure-state tests | planned BTD/protocol tests | draft-required |
| Ledger/database/object-storage projection drift is covered | planned reconciliation fixtures | draft-required |
| Paid disclosure remains fail-closed | planned disclosure tests | draft-required |

## Gate 6 Parity

| Requirement | Source evidence | Current V32 judgment |
| --- | --- | --- |
| API and interface contracts share fixtures | planned interface regression suite | draft-required |
| Deferred Exchange and Conversations hooks stay blocked | planned contract tests | draft-required |
| Auth and source-safety classes are tested | planned route/tool tests | draft-required |

## Gate 7 Parity

| Requirement | Source evidence | Current V32 judgment |
| --- | --- | --- |
| Browser proof covers Terminal and Auxillaries | planned Playwright/Jest evidence | draft-required |
| Accessibility and responsive states are asserted | planned a11y/responsive tests | draft-required |
| Visual proof is deterministic enough for CI | planned visual proof strategy | draft-required |

## Gate 8 Parity

| Requirement | Source evidence | Current V32 judgment |
| --- | --- | --- |
| Environment lanes are typed | planned readiness records | draft-required |
| Secrets are classified by presence, not printed | planned readiness scripts | draft-required |
| Production-mainnet remains blocked | planned policy tests | draft-required |

## Gate 9 Parity

| Requirement | Source evidence | Current V32 judgment |
| --- | --- | --- |
| V32 proof generation supports dry-run/check modes | planned generator work | draft-required |
| Promotion failures are explainable | planned workflow diagnostics | draft-required |
| Promotion commits remain PR-based | planned workflow proof | draft-required |

## Gate 10 Parity

| Requirement | Source evidence | Current V32 judgment |
| --- | --- | --- |
| V32 promotion checker exists | planned `scripts/check-v32-gate10-promotion-readiness.mjs` | draft-required |
| V32 promotion workflow exists | planned `.github/workflows/v32-canon-promotion.yml` | draft-required |
| `BITCODE_SPEC_V32_PROVEN.md` is generated during promotion only | planned generated-proof support | draft-required |

## accepted boundaries

- Gate 1 does not implement proof matrices, replay harnesses, or browser proof expansion.
- Gate 1 does not create `BITCODE_SPEC_V32_PROVEN.md`.
- Gate 1 does not promote `BITCODE_SPEC.txt` to V32.
- Gate 1 may retarget workflows to active V31 / draft V32 so later gates are greenable.
- Gate 1 may update V32-V37 roadmap scope to align with promoted V31 and current enterprise-readiness goals.
- V32 does not redefine V31 Reading, Finding Fits, AssetPack preview, settlement, delivery, BTC fee, or BTD tokenomics law.

## Gate 2 Accepted Boundaries

- Gate 2 inventories proof/test coverage and required contexts; it does not implement Gate 3 deterministic replay hardening, Gate 4 Reading pipeline expansion, Gate 5 economic failure-state proof, Gate 6 shared interface regression suites, Gate 7 browser proof expansion, Gate 8 readiness rehearsal, Gate 9 generated-proof hardening, or Gate 10 promotion.
- Gate 2 generated artifacts must be source-safe and may not contain protected AssetPack source, provider tokens, wallet secrets, service keys, database passwords, OpenAI keys, Vercel tokens, Supabase service-role material, or private prompts.
- Gate 2 may represent missing coverage as `planned-gap` only when blockers and repair posture are explicit.
- Gate 2 does not promote `BITCODE_SPEC.txt` to V32 and does not create `BITCODE_SPEC_V32_PROVEN.md`.

## completion condition

Gate 1 is complete when the V32 draft family validates, `check:v32-gate1` passes, workflow posture is V32-aware, README and roadmap reflect V32 initiation, V33-V37 scopes are current enough to guide future gates, diff hygiene passes, and the gate branch is committed, pushed, and pull-requested for review into `version/v32`.

Gate 2 is complete when `.bitcode/v32-proof-coverage-matrix.json` exists, is deterministic from `pnpm run generate:v32-proof-coverage-matrix`, enumerates all required promoted surfaces with owner package/interface, fixture, replay command, expected artifact, source-safety class, coverage status, required contexts, failure mode, and repair posture, preserves explicit `planned-gap` blockers, passes `pnpm run check:v32-gate2`, is wired into gate-quality CI, and the gate branch is committed, pushed, and pull-requested for review into `version/v32`.
