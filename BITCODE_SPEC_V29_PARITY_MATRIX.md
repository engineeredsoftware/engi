# Bitcode Spec V29 Parity Matrix

## Status

- Version: `V29`
- V29 state: draft target opened; parity now tracks V29 gates over active V28 canon
- Current canonical/latest target: `V28`
- Prior canonical anchor: `BITCODE_SPEC_V28.md`
- Prior generated proof appendix: `BITCODE_SPEC_V28_PROVEN.md`
- Generated structured artifact inventory: draft `.bitcode/v29-spec-family-report.json`, draft `.bitcode/v29-canonical-input-report.json`, future `.bitcode/v29-canon-posture-drift-report.json`, and no `BITCODE_SPEC_V29_PROVEN.md` until promotion
- Source parity state: Gate 1 parity is documentation/workflow/checker closure; product-source rows start as pending V29 gate work
- State: draft target parity matrix opened
- Active canonical pointer during draft opening: `BITCODE_SPEC.txt` -> `V28`
- Scope: V29 parity ledger for Terminal transaction depth, wallet/BTC operations, Reading pipeline observability, AssetPack disclosure, settlement repair, organization permissions, UX quality, and promotion readiness
- Spec companion: `BITCODE_SPEC_V29.md`
- Notes companion: `BITCODE_SPEC_V29_NOTES.md`
- Delta companion: `BITCODE_SPEC_V29_DELTA.md`
- Generated proof appendix: none until V29 promotion

## Purpose

The V29 parity matrix prevents Terminal-depth work from becoming vague product polish.
Each gate must name source surfaces, tests, proof evidence, documentation, and accepted boundaries before it closes.

## Audit basis

Gate 1 audit basis:

- `BITCODE_SPEC.txt`
- `BITCODE_SPEC_V28.md`
- `BITCODE_SPEC_V28_DELTA.md`
- `BITCODE_SPEC_V28_NOTES.md`
- `BITCODE_SPEC_V28_PARITY_MATRIX.md`
- `BITCODE_SPEC_V28_PROVEN.md`
- `BITCODE_SPEC_V29_NOTES.md`
- `README.md`
- `AGENTS.md`
- `.github/workflows/bitcode-gate-quality.yml`
- `.github/workflows/bitcode-canon-quality.yml`
- `package.json`
- `protocol-demonstration/src/canon-posture.js`
- Terminal, Reading pipeline, BTD, pipeline-host, UAPI, and workflow surfaces named by V28 promotion.

No `_legacy/` source is active source truth.

## V29 implementation matrix

| Area | Gate | Source evidence | Judgment | Closure requirement |
| --- | --- | --- | --- | --- |
| Draft family and branch posture | Gate 1 | `BITCODE_SPEC_V29.md`, DELTA, NOTES, PARITY, `BITCODE_SPEC.txt`, branch `v29/gate-1-objectives-and-gating` | drafted | V29 family validates in draft mode over active V28 and `check:v29-gate1` passes. |
| Workflow retargeting | Gate 1 | `.github/workflows/bitcode-gate-quality.yml`, `.github/workflows/bitcode-canon-quality.yml` | drafted | CI checks V28 active / V29 draft posture instead of stale V27/V28 posture. |
| Terminal transaction read models | Gate 2 | `uapi/app/terminal/terminal-transaction-read-model.ts`, `uapi/app/terminal/terminal-transaction-query.ts`, `TerminalTransactionWorkspace.tsx`, `TerminalTransactionDetailSurface.tsx`, UAPI tests, Gate 2 checker | drafted | Terminal transaction state is URL-addressable, recoverable, typed, low-detail by default, and expandable without raw JSON as the ordinary operator contract. |
| Wallet signer/BTC operations | Gate 3 | `packages/btd/src/btc-fee-operation.ts`, BTC fee route, Terminal Wallet/BTC detail section, BTD and UAPI tests, Gate 3 checker | drafted | Signer session, PSBT, broadcast/finality/reorg/replacement/failure states are ordinary Terminal states. |
| Reading pipeline observability | Gate 4 | `packages/pipelines/asset-pack`, `packages/pipeline-hosts`, Terminal stream components | pending | Pipeline/phase/PTRR/ThricifiedGeneration/tool/prompt telemetry is complete and readable. |
| AssetPack disclosure rights | Gate 5 | BTD access primitives, AssetPack preview UI, disclosure policy tests | pending | Source-safe preview and paid unlock are proven without source leakage. |
| Settlement reconciliation repair | Gate 6 | BTD journal/reconciliation, Supabase readback, Terminal repair UI | pending | Ledger, database, and metaphysical state drift is visible and repairable. |
| Organization permission authority | Gate 7 | access policy, org holdings, MCP/ChatGPT gates, Terminal permission UI | pending | Registry-derived roles, holdings, and read-license authority govern actions. |
| Commercial formalization | Gate 8 | packages/protocol, package tests, import scans, docs | pending | Demonstration-origin commercial internals are package-native and no runtime demo imports remain. |
| Terminal UX quality | Gate 9 | Playwright/Jest/a11y/responsive/browser QA | pending | Complete transaction cockpit is usable by default and inspectable in detail. |
| Promotion readiness | Gate 10 | promotion workflow, `.bitcode/v29-*`, `BITCODE_SPEC_V29_PROVEN.md` | pending | `version/v29` can promote to `main` only after all V29 checks pass. |

## V29 implementation checklist

| Area | Required V29 result | Judgment |
| --- | --- | --- |
| Active canon pointer | `BITCODE_SPEC.txt` remains `V28` during V29 gate work | drafted |
| Gate branch pattern | V29 work happens on `version/v29` or `v29/gate-N-*` branches | drafted |
| Spec-family shape | V29 SPEC, DELTA, NOTES, and PARITY satisfy the full spec-family checker | drafted |
| Gate 1 script | `pnpm run check:v29-gate1` fails closed on stale posture or missing gates | drafted |
| Gate 2 read model | `pnpm run check:v29-gate2` proves typed route-owned Terminal transaction reading | drafted |
| Gate 3 wallet/BTC operation | `pnpm run check:v29-gate3` proves quote lifecycle, signer recovery, blocked readiness, API posture, and Terminal Wallet/BTC detail | drafted |
| Product implementation gates | Gates 3-9 close remaining Terminal transaction depth with tests and docs | pending |
| Promotion gate | Gate 10 closes generated proof and promotion automation | pending |

## Gate 1 Parity

| Requirement | Source evidence | Current V29 judgment |
| --- | --- | --- |
| Active canon remains V28 during V29 draft opening | `BITCODE_SPEC.txt` contains `V28` | drafted |
| Runtime draft target is V29 | `protocol-demonstration/src/canon-posture.js` declares V28 active and V29 draft | drafted |
| V29 SPEC family exists as draft | `BITCODE_SPEC_V29.md`, DELTA, NOTES, and PARITY | drafted |
| Gate-quality workflow is V29-aware | `.github/workflows/bitcode-gate-quality.yml` | drafted |
| Canon-quality workflow is V29-aware | `.github/workflows/bitcode-canon-quality.yml` | drafted |
| README reflects V28/V29 posture | `README.md` | drafted |
| V29 Gate 1 checker exists | `scripts/check-v29-gate1-objectives-and-gating.mjs` and package script | drafted |

## accepted boundaries

- Gate 1 does not implement Terminal product depth.
- Gate 1 does not create `BITCODE_SPEC_V29_PROVEN.md`.
- Gate 1 does not promote `BITCODE_SPEC.txt` to V29.
- Gate 1 may retarget workflows to active V28 / draft V29 so later gates are greenable.

## completion condition

Gate 1 is complete when the V29 draft family validates, `check:v29-gate1` passes, workflow posture is V29-aware, README/docs reflect V29 initiation, and the gate branch is committed and pushed for review into `version/v29`.

## Gate 2 Parity

| Requirement | Source evidence | Current V29 judgment |
| --- | --- | --- |
| Selected transactions are URL-addressable | `terminal-transaction-query.ts`, `TerminalPageClient.tsx` | drafted |
| Detail focus is typed and recoverable | `terminal-transaction-read-model.ts`, `TerminalTransactionDetailActionBar.tsx` | drafted |
| Low-detail read model exists before raw payloads | `terminal-transaction-read-model.ts`, `TerminalTransactionDetailHero.tsx` | drafted |
| Section navigation exposes availability and blockers | `terminal-transaction-read-model.ts`, `TerminalTransactionDetailSurface.tsx` | drafted |
| Console is blocked outside live execution-history mode | `terminal-transaction-read-model.ts`, UAPI read-model tests | drafted |
| Gate 2 checker is wired to package scripts and CI | `scripts/check-v29-gate2-terminal-transaction-read-models.mjs`, `package.json`, gate workflow | drafted |

## Gate 2 accepted boundaries

- Gate 2 does not implement wallet signing, PSBT, broadcast, reorg, or replacement depth.
- Gate 2 does not implement deeper Reading pipeline telemetry; Gate 4 owns that work.
- Gate 2 does not expose protected AssetPack source before settlement.
- Gate 2 does not add versioned API routes or source identifiers.

## Gate 2 completion condition

Gate 2 is complete when Terminal selected transaction state rewrites recoverable URLs, a typed read model drives detail navigation and low-detail summaries, focused tests pass, `check:v29-gate2` passes, CI invokes the checker, docs name the implemented source surfaces, and the gate branch is committed and pushed for review into `version/v29`.

## Gate 3 Parity

| Requirement | Source evidence | Current V29 judgment |
| --- | --- | --- |
| BTC fee quote lifecycle is package-owned | `packages/btd/src/btc-fee-operation.ts`, `packages/btd/__tests__/btc-fee-operation.test.ts` | drafted |
| Signer-session recovery is explicit and no-custody | `buildWalletSignerSessionRecovery`, BTD operation tests | drafted |
| Blocked-readiness receipts name blocker and repair path | `buildBtcFeeBlockedReadinessReceipt`, BTD operation tests | drafted |
| Operation posture covers PSBT, broadcast, finality, replacement, reorg, failure | `buildBtcFeeOperationPosture`, BTD operation tests | drafted |
| BTC fee route serializes JSON-safe operation posture | `packages/api/src/routes/btd-crypto.ts`, route typecheck, route tests | drafted |
| Terminal exposes Wallet/BTC detail section | `terminal-transaction-query.ts`, `terminal-transaction-read-model.ts`, `TerminalTransactionWalletBtcCard.tsx`, `terminal-wallet-btc-operation.ts`, UAPI tests | drafted |
| Gate 3 checker is wired to package scripts and CI | `scripts/check-v29-gate3-wallet-signer-btc-operations.mjs`, `package.json`, gate workflow | drafted |

## Gate 3 accepted boundaries

- Gate 3 does not implement full settlement reconciliation repair; Gate 6 owns drift repair and readback repair actions.
- Gate 3 does not expose protected AssetPack source before settlement.
- Gate 3 does not broadcast value-bearing mainnet transactions.
- Gate 3 does not add versioned API routes or source identifiers.

## Gate 3 completion condition

Gate 3 is complete when package primitives model BTC quotes, signer recovery, operation posture, and blocked readiness; API responses serialize operation posture; Terminal has a Wallet/BTC route-owned detail section; focused package and UAPI tests pass; `check:v29-gate3` passes; CI invokes the checker and tests; docs name the implemented source surfaces; and the gate branch is committed and pushed for review into `version/v29`.
