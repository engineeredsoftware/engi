# Bitcode Spec V32 Parity Matrix

## Status

- Version: `V32`
- V32 state: draft target parity matrix opened; V32 proof/test parity is not promoted
- Current canonical/latest target: `V31`
- Canonical proof-source commit: none until V32 promotion
- Prior canonical anchor: `BITCODE_SPEC_V31.md`
- Prior generated proof appendix: `BITCODE_SPEC_V31_PROVEN.md`
- Generated structured artifact inventory: planned `.bitcode/v32-spec-family-report.json`, `.bitcode/v32-canonical-input-report.json`, `.bitcode/v32-canon-posture-drift-report.json`, generated Gate 2 `.bitcode/v32-proof-coverage-matrix.json`, generated Gate 3 `.bitcode/v32-artifact-volatility-inventory.json` and `.bitcode/v32-deterministic-replay-report.json`, generated Gate 4 `.bitcode/v32-reading-pipeline-proof-coverage.json`, generated Gate 5 `.bitcode/v32-ledger-btd-settlement-failure-state-coverage.json`, later V32 proof/test coverage artifacts, and `BITCODE_SPEC_V32_PROVEN.md` only after promotion
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
- `.bitcode/v32-artifact-volatility-inventory.json`
- `.bitcode/v32-deterministic-replay-report.json`
- `scripts/v32-deterministic-replay-artifacts.mjs`
- `scripts/generate-v32-deterministic-replay-artifacts.mjs`
- `scripts/check-v32-gate3-deterministic-replay-artifact-stability.mjs`
- `.bitcode/v32-reading-pipeline-proof-coverage.json`
- `packages/pipelines/asset-pack/scripts/v32-reading-pipeline-proof-coverage.ts`
- `packages/pipelines/asset-pack/src/__tests__/v32-reading-pipeline-proof-coverage.test.ts`
- `scripts/check-v32-gate4-reading-pipeline-proof-coverage.mjs`
- `.bitcode/v32-ledger-btd-settlement-failure-state-coverage.json`
- `scripts/generate-v32-ledger-btd-settlement-failure-states.mjs`
- `scripts/check-v32-gate5-ledger-btd-settlement-failure-states.mjs`
- `packages/btd/__tests__/v32-ledger-btd-settlement-failure-states.test.ts`
- `.bitcode/v32-interface-contract-regression-suite.json`
- `scripts/generate-v32-interface-contract-regression-suites.mjs`
- `scripts/check-v32-gate6-interface-contract-regression-suites.mjs`
- `packages/btd/src/interface-contract-regression.ts`
- `packages/btd/__tests__/v32-interface-contract-regression.test.ts`
- `.bitcode/v32-browser-accessibility-responsive-visual-proof.json`
- `scripts/generate-v32-browser-accessibility-responsive-visual-proof.mjs`
- `scripts/check-v32-gate7-browser-accessibility-responsive-visual-proof.mjs`
- `uapi/app/bitcode-browser-accessibility-responsive-proof.ts`
- `uapi/tests/bitcodeBrowserAccessibilityResponsiveProof.test.ts`
- `uapi/tests/e2e/bitcode-browser-accessibility-responsive-proof.spec.ts`
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
| Deterministic replay and artifacts | Gate 3 | `.bitcode/v32-artifact-volatility-inventory.json`, `.bitcode/v32-deterministic-replay-report.json`, generator, checker, `check:v32-gate3` | drafted | Generated artifacts are stable, source-safe, and fail closed on missing, stale, malformed, source-unsafe, or unstable-order drift. |
| Reading pipeline proof coverage | Gate 4 | `.bitcode/v32-reading-pipeline-proof-coverage.json`, `v32-reading-pipeline-proof-coverage.ts`, focused pipeline test, `check:v32-gate4` | drafted | Pipeline phases, PTRR agents, steps, ThricifiedGenerations, prompts, tools, telemetry, and outputs are covered. |
| Ledger/BTD settlement failure states | Gate 5 | `.bitcode/v32-ledger-btd-settlement-failure-state-coverage.json`, focused BTD/BTC/ledger/reconciliation test, generator, checker, workflow wiring | drafted | Economic and ownership state has success, blocked, and repair proof without protected-source disclosure. |
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
| Gate 3 replay artifacts | `.bitcode/v32-artifact-volatility-inventory.json` and `.bitcode/v32-deterministic-replay-report.json` record volatility classification, source-safety verdict, byte-equality replay, and artifact failure-mode coverage | drafted |
| Gate 3 scripts | `pnpm run generate:v32-deterministic-replay-artifacts` regenerates the V32 replay package and `pnpm run check:v32-gate3` fails closed on missing, stale, malformed, source-unsafe, or unstable-order artifacts | drafted |
| Gate 4 artifact | `.bitcode/v32-reading-pipeline-proof-coverage.json` records source-safe Reading pipeline proof coverage and accepted boundary assertions | drafted |
| Gate 4 scripts | `pnpm run generate:v32-reading-pipeline-proof-coverage`, `pnpm run check:v32-reading-pipeline-proof-coverage`, and `pnpm run check:v32-gate4` fail closed on stale or incomplete Reading proof coverage | drafted |
| Gate 5 artifact | `.bitcode/v32-ledger-btd-settlement-failure-state-coverage.json` records source-safe BTC fee, BTD receipt, source-to-shares, projection drift, repair action, paid unlock, and delivery failure-state coverage | drafted |
| Gate 5 scripts | `pnpm run generate:v32-ledger-btd-settlement-failure-states`, `pnpm run check:v32-ledger-btd-settlement-failure-states`, and `pnpm run check:v32-gate5` fail closed on stale, incomplete, source-unsafe, or undocumented economic proof coverage | drafted |
| Gate 6 artifact | `.bitcode/v32-interface-contract-regression-suite.json` records source-safe interface contract rows, shared fixtures, auth boundaries, policy denials, source-safety classes, and deferred blockers | drafted |
| Gate 6 scripts | `pnpm run generate:v32-interface-contract-regression-suites`, `pnpm run check:v32-interface-contract-regression-suites`, and `pnpm run check:v32-gate6` fail closed on stale, incomplete, source-unsafe, or undocumented interface proof coverage | drafted |
| Gate 7 artifact | `.bitcode/v32-browser-accessibility-responsive-visual-proof.json` records Terminal and Auxillaries browser, accessibility, responsive, and deterministic visual proof coverage | drafted |
| Gate 7 scripts | `pnpm run generate:v32-browser-accessibility-responsive-visual-proof`, `pnpm run check:v32-browser-accessibility-responsive-visual-proof`, and `pnpm run check:v32-gate7` fail closed on stale, incomplete, source-unsafe, or screenshot-only proof coverage | drafted |
| Gate-quality workflow | Gate workflow validates V31 active / V32 draft posture plus V32 Gate 1, Gate 2, Gate 3, Gate 4, Gate 5, Gate 6, and Gate 7 checkers | drafted |
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
| Replay commands are deterministic | `.bitcode/v32-deterministic-replay-report.json` compares two generated-artifact runs with byte digests | drafted |
| Artifact volatility is controlled | `.bitcode/v32-artifact-volatility-inventory.json` records accepted context-bound `generatedAt` fields and zero blocking findings | drafted |
| Stable JSON ordering is enforced | `validateV32DeterministicReplayArtifactFiles` compares each artifact to `stableStringify(JSON.parse(artifact))` | drafted |
| Stale artifacts fail closed | `check-v32-gate3-deterministic-replay-artifact-stability.mjs` probes `missing-path`, `stale-source-commit`, `malformed-schema`, `source-safety-violation`, and `unstable-json-order` | drafted |

## Gate 4 Parity

| Requirement | Source evidence | Current V32 judgment |
| --- | --- | --- |
| Reading phases are covered | `.bitcode/v32-reading-pipeline-proof-coverage.json` lists two pipelines, eleven phases, and phase storage records | drafted |
| PTRR steps and ThricifiedGenerations are typed | focused Gate 4 test plus artifact coverage list twelve PTRR agents, forty-eight PTRR steps, and one hundred forty-four ThricifiedGenerations | drafted |
| Prompt and tool telemetry is source-safe | artifact stores prompt template digests, interpolated context keys, four tool rows, and telemetry presence booleans without protected prompts or raw model payloads | drafted |
| Source-safe preview and paid delivery boundaries are preserved | focused Gate 4 test and artifact boundary assertions cover `AssetPackSourceSafePreview`, plural `fit/deposits`, settlement-bound preview input, and PR delivery tool | drafted |

## Gate 5 Parity

| Requirement | Source evidence | Current V32 judgment |
| --- | --- | --- |
| BTC fee and BTD receipts have failure-state tests | `packages/btd/__tests__/v32-ledger-btd-settlement-failure-states.test.ts` covers BTC quote, PSBT, broadcast, finality, replacement, reorg, failure, blocked-readiness, BTD mint/read/rights-transfer receipts, and confirmed-finality rights transfer | drafted |
| Source-to-shares and settlement conservation are covered | focused Gate 5 test plus `.bitcode/v32-ledger-btd-settlement-failure-state-coverage.json` cover no-overpayment, no-underpayment, allocation conservation, underpayment drift, and pause-settlement-unlock repair | drafted |
| Ledger/database/object-storage projection drift is covered | focused Gate 5 reconciliation fixture covers every `ProjectionDriftKind`, repair action classes, staging-testnet readback blocking, and encrypted protected-source storage | drafted |
| Paid disclosure remains fail-closed | focused Gate 5 test covers source-safe preview, protected source blocked before paid unlock, delivery-admitted paid unlock, and pull-request delivery readback | drafted |

## Gate 6 Parity

| Requirement | Source evidence | Current V32 judgment |
| --- | --- | --- |
| API and interface contracts share fixtures | `.bitcode/v32-interface-contract-regression-suite.json`, `packages/btd/src/interface-contract-regression.ts`, `packages/btd/__tests__/v32-interface-contract-regression.test.ts` | drafted |
| Deferred Exchange and Conversations hooks stay blocked | focused Gate 6 test proves `exchange_hook` and `conversations_hook` are `deferred_blocked` rows with `deferred_not_admitted` auth boundaries | drafted |
| Auth and source-safety classes are tested | Gate 6 artifact rows require auth-boundary, policy-denial, source-safety-class, and protected-source nondisclosure assertions | drafted |

## Gate 7 Parity

| Requirement | Source evidence | Current V32 judgment |
| --- | --- | --- |
| Browser proof covers Terminal and Auxillaries | `.bitcode/v32-browser-accessibility-responsive-visual-proof.json`, `uapi/tests/e2e/bitcode-browser-accessibility-responsive-proof.spec.ts`, `uapi/tests/bitcodeBrowserAccessibilityResponsiveProof.test.ts` prove Terminal plus the active Terminal-hosted Auxillaries support-plane entry points | drafted |
| Accessibility and responsive states are asserted | Gate 7 artifact covers keyboard path, landmark labels, focus state, status announcements, contrast-sensitive tokens, reduced-motion, overflow/wrapping, and four canonical viewports | drafted |
| Visual proof is deterministic enough for CI | Gate 7 artifact and browser proof prefer semantic layout metrics, stateful roles, route-state contracts, and `no-screenshot-only-approval` | drafted |

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

## Gate 3 Accepted Boundaries

- Gate 3 proves deterministic replay and generated artifact stability for the V32 proof matrix package; it does not implement Gate 4 Reading pipeline proof expansion, Gate 5 economic failure-state proof, Gate 6 interface regression, Gate 7 browser proof expansion, Gate 8 readiness rehearsal, Gate 9 promotion-proof hardening, or Gate 10 promotion.
- Gate 3 generated artifacts are source-safe proof metadata only and may not contain protected AssetPack source, private prompts, provider credentials, wallet secrets, database passwords, OpenAI keys, Vercel tokens, or Supabase service-role material.
- Gate 3 accepts only fixed replay-context volatility. Unaccepted random, nonce, UUID, timestamp, `createdAt`, or `updatedAt` fields are blocking failures.
- Gate 3 does not promote `BITCODE_SPEC.txt` to V32 and does not create `BITCODE_SPEC_V32_PROVEN.md`.

## Gate 4 Accepted Boundaries

- Gate 4 proves the Reading pipeline contract, observability, and disclosure/delivery boundaries; it does not redefine V31 Reading product law, run paid settlement, or expose protected AssetPack source.
- Gate 4 generated artifacts are source-safe contract metadata only and may not contain protected AssetPack source, private prompts, raw model payloads, provider credentials, wallet secrets, database passwords, OpenAI keys, Vercel tokens, or Supabase service-role material.
- Gate 4 may hash prompt templates and record interpolated context keys, but it must not persist private prompt text or live inference output in the generated proof artifact.
- Gate 4 does not promote `BITCODE_SPEC.txt` to V32 and does not create `BITCODE_SPEC_V32_PROVEN.md`.

## Gate 5 Accepted Boundaries

- Gate 5 proves ledger, BTD, BTC fee, source-to-shares, reconciliation, disclosure, paid unlock, and delivery failure-state coverage; it does not approve production-mainnet value-bearing settlement or run live BTC payments.
- Gate 5 generated artifacts are source-safe economic proof metadata only and may not contain protected AssetPack source, private prompts, raw inference payloads, provider credentials, wallet secrets, database passwords, OpenAI keys, Vercel tokens, or Supabase secret material.
- Gate 5 may record public staging-testnet project references, root ids, phase names, receipt kinds, drift kinds, repair action kinds, and source/test digests, but it must not serialize secret values or pre-settlement AssetPack source.
- Gate 5 does not promote `BITCODE_SPEC.txt` to V32 and does not create `BITCODE_SPEC_V32_PROVEN.md`.

## completion condition

Gate 1 is complete when the V32 draft family validates, `check:v32-gate1` passes, workflow posture is V32-aware, README and roadmap reflect V32 initiation, V33-V37 scopes are current enough to guide future gates, diff hygiene passes, and the gate branch is committed, pushed, and pull-requested for review into `version/v32`.

Gate 2 is complete when `.bitcode/v32-proof-coverage-matrix.json` exists, is deterministic from `pnpm run generate:v32-proof-coverage-matrix`, enumerates all required promoted surfaces with owner package/interface, fixture, replay command, expected artifact, source-safety class, coverage status, required contexts, failure mode, and repair posture, preserves explicit `planned-gap` blockers, passes `pnpm run check:v32-gate2`, is wired into gate-quality CI, and the gate branch is committed, pushed, and pull-requested for review into `version/v32`.

Gate 3 is complete when `.bitcode/v32-artifact-volatility-inventory.json` and `.bitcode/v32-deterministic-replay-report.json` exist, are deterministic from `pnpm run generate:v32-deterministic-replay-artifacts`, prove stable sorted JSON and byte-equal replay for generated V32 proof artifacts, explicitly inventory accepted context-bound volatility, pass `pnpm run check:v32-gate3` including missing/stale/malformed/source-safety/unstable-order failure probes, are wired into gate-quality CI, and the gate branch is committed, pushed, and pull-requested for review into `version/v32`.

Gate 4 is complete when `.bitcode/v32-reading-pipeline-proof-coverage.json` exists, is deterministic from `pnpm run generate:v32-reading-pipeline-proof-coverage`, covers `ReadNeedComprehensionSynthesis` and `ReadFitsFindingSynthesis` with exact phase/PTRR agent/PTRR step/ThricifiedGeneration/prompt/tool/telemetry counts, proves plural Finding Fits discovery, source-safe preview, and paid PR delivery boundaries, passes focused pipeline tests plus `pnpm run check:v32-reading-pipeline-proof-coverage` and `pnpm run check:v32-gate4`, is wired into gate-quality CI, and the gate branch is committed, pushed, and pull-requested for review into `version/v32`.

Gate 5 is complete when `.bitcode/v32-ledger-btd-settlement-failure-state-coverage.json` exists, is deterministic from `pnpm run generate:v32-ledger-btd-settlement-failure-states`, covers BTC fee phases and blocked-readiness receipts, BTD mint/read/rights-transfer receipts, source-to-shares conservation, projection drift and repair actions, encrypted protected-source storage, paid unlock, and PR delivery readback, passes focused BTD settlement failure-state tests plus `pnpm run check:v32-ledger-btd-settlement-failure-states` and `pnpm run check:v32-gate5`, is wired into gate-quality CI, and the gate branch is committed, pushed, and pull-requested for review into `version/v32`.

Gate 6 is complete when `.bitcode/v32-interface-contract-regression-suite.json` exists, is deterministic from `pnpm run generate:v32-interface-contract-regression-suites`, covers active `terminal`, `api`, `mcp`, `chatgpt_app`, and `auxillaries_hook` contracts plus blocked/deferred `exchange_hook` and `conversations_hook` rows, proves auth-boundary, policy-denial, source-safety-class, and protected-source nondisclosure assertions, passes focused interface contract tests plus `pnpm run check:v32-interface-contract-regression-suites` and `pnpm run check:v32-gate6`, is wired into gate-quality CI, and the gate branch is committed, pushed, and pull-requested for review into `version/v32`.

Gate 7 is complete when `.bitcode/v32-browser-accessibility-responsive-visual-proof.json` exists, is deterministic from `pnpm run generate:v32-browser-accessibility-responsive-visual-proof`, covers Terminal and Auxillaries default/guided/detail states across canonical viewports through the active Terminal-hosted Auxillaries entry points, proves keyboard path, landmark labels, focus state, status announcements, contrast-sensitive tokens, reduced-motion, overflow/wrapping, and `no-screenshot-only-approval` visual strategy, passes focused Jest and Playwright browser proofs plus `pnpm run check:v32-browser-accessibility-responsive-visual-proof` and `pnpm run check:v32-gate7`, is wired into gate-quality CI, and the gate branch is committed, pushed, and pull-requested for review into `version/v32`.
