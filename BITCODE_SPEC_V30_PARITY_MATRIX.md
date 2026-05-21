# Bitcode Spec V30 Parity Matrix

## Status

- Version: `V30`
- V30 state: draft target parity matrix opened for Protocol/BTD hardening
- Current canonical/latest target: `V29`
- Prior canonical anchor: `BITCODE_SPEC_V29.md`
- Prior generated proof appendix: `BITCODE_SPEC_V29_PROVEN.md`
- Generated structured artifact inventory: none for V30 yet; V30 gates must create and validate generated artifacts before promotion
- Source parity state: V30 parity begins with roadmap/gating, then hardens package APIs, Bitcoin/PSBT, BTD receipts, ledger projection, source-to-shares proof, bridge-readiness boundaries, telemetry/proof hooks, interface regression, and promotion readiness
- State: draft target parity matrix opened
- Active canonical pointer during draft opening: `BITCODE_SPEC.txt` -> `V29`
- Scope: V30 parity ledger for Protocol/BTD hardening over promoted V29
- Spec companion: `BITCODE_SPEC_V30.md`
- Notes companion: `BITCODE_SPEC_V30_NOTES.md`
- Delta companion: `BITCODE_SPEC_V30_DELTA.md`
- Generated proof appendix: none until V30 promotion
- Last fully realized canonical target preserved in source: `V29`

## Purpose

The V30 parity matrix prevents Protocol/BTD hardening from becoming vague infrastructure work.
Each gate must name package boundaries, implementation surfaces, tests, generated/proof artifacts, documentation, accepted non-goals, and promotion evidence before it closes.

## Audit basis

Gate 1 audit basis:

- `BITCODE_SPEC.txt`
- `BITCODE_SPEC_V29.md`
- `BITCODE_SPEC_V29_DELTA.md`
- `BITCODE_SPEC_V29_NOTES.md`
- `BITCODE_SPEC_V29_PARITY_MATRIX.md`
- `BITCODE_SPEC_V29_PROVEN.md`
- `BITCODE_SPEC_V30.md`
- `BITCODE_SPEC_V30_DELTA.md`
- `BITCODE_SPEC_V30_NOTES.md`
- `BITCODE_SPEC_V30_PARITY_MATRIX.md`
- `SPECIFICATIONS_ROADMAP.md`
- `README.md`
- `AGENTS.md`
- `.github/pull_request_template.md`
- `.github/workflows/bitcode-gate-quality.yml`
- `.github/workflows/bitcode-canon-quality.yml`
- `package.json`
- `packages/protocol/src/canon-posture.js`
- `protocol-demonstration/src/canon-posture.js`

No `_legacy/` source is active source truth.

## V30 implementation matrix

| Area | Gate | Source evidence | Judgment | Closure requirement |
| --- | --- | --- | --- | --- |
| Draft family and branch posture | Gate 1 | `BITCODE_SPEC_V30.md`, DELTA, NOTES, PARITY, `BITCODE_SPEC.txt`, branch `v30/gate-1-roadmap-and-gating` | drafted | V30 family validates in draft mode over active V29 and `check:v30-gate1` passes. |
| Roadmap truth | Gate 1 | `SPECIFICATIONS_ROADMAP.md`, README, PR template, workflow posture | drafted | Roadmap states V29 active, V30 draft, and coherent V31-V37 responsibilities. |
| Protocol package API boundaries | Gate 2 | `packages/btd/src/api-boundaries.ts`, `packages/api/src/routes/btd-crypto.ts`, package READMEs/tests | drafted | Shared Protocol/BTD objects have package-owned builders, parsers, validators, JSON-safe serializers, and tests. |
| Bitcoin Taproot PSBT fee rigor | Gate 3 | BTD fee/signer/PSBT primitives, API route adapters, tests | pending | BTC fee and signer states are typed, testnet/mainnet-safe, no-custody, and proof-rooted. |
| BTD AssetPack mint/read receipts | Gate 4 | BTD receipt primitives, asset-pack postprocess, harness evidence, Terminal/API readback | pending | Mint, read, and rights-transfer receipts bind BTD range, preview, paid unlock, delivery, and ledger projection. |
| Testnet ledger projection hardening | Gate 5 | BTD reconciliation, Supabase readback, object-storage evidence, repair tests | pending | Ledger/database/object-storage projections are synchronized or blocked with deterministic repair posture. |
| Source-to-shares proof cleanup | Gate 6 | BTD/source-to-shares proof primitives, settlement conservation tests | pending | Measurement contribution, fee allocation, zero-cell/refit tail, and conservation invariants are testable. |
| Bridge-readiness research boundaries | Gate 7 | Protocol/BTD research notes, policy posture tests, docs | pending | Bridge paths are documented as research until admitted by explicit future proof and policy. |
| Protocol telemetry/proof hooks | Gate 8 | telemetry schema, proof hooks, generated-artifact inventory, tests | pending | Receipts, fee states, projections, and source-to-shares facts emit source-safe telemetry and proof hooks. |
| Interface integration regression | Gate 9 | Terminal/API/MCP/ChatGPT App adapters and tests | pending | Existing interfaces consume package-owned objects without regressing V29 behavior. |
| Promotion readiness | Gate 10 | V30 promotion workflow, generated `.bitcode/v30-*`, `BITCODE_SPEC_V30_PROVEN.md` | pending | `version/v30` can promote to `main` only after all V30 checks pass and promotion automation can commit generated canon. |

## V30 implementation checklist

| Area | Required V30 result | Judgment |
| --- | --- | --- |
| Active canon pointer | `BITCODE_SPEC.txt` remains `V29` during V30 gate work | drafted |
| Gate branch pattern | V30 work happens on `version/v30` or `v30/gate-N-*` branches | drafted |
| Spec-family shape | V30 SPEC, DELTA, NOTES, and PARITY satisfy the full spec-family checker | drafted |
| Gate 1 script | `pnpm run check:v30-gate1` fails closed on stale posture, missing roadmap truth, or missing gates | drafted |
| Gate-quality workflow | Gate workflow validates V29 active / V30 draft posture and V30 Gate 1 | drafted |
| Canon-quality workflow | Canon workflow validates V29 active / V30 draft posture and V30 draft family | drafted |

## Gate 1 Parity

| Requirement | Source evidence | Current V30 judgment |
| --- | --- | --- |
| Active canon remains V29 during V30 draft opening | `BITCODE_SPEC.txt` contains `V29` | drafted |
| Runtime draft target is V30 | `packages/protocol/src/canon-posture.js` and `protocol-demonstration/src/canon-posture.js` declare V29 active and V30 draft | drafted |
| V30 SPEC family exists as draft | `BITCODE_SPEC_V30.md`, DELTA, NOTES, and PARITY | drafted |
| Roadmap is current | `SPECIFICATIONS_ROADMAP.md` states V29 active canon, V30 active draft target, and V31-V37 scopes | drafted |
| Gate-quality workflow is V30-aware | `.github/workflows/bitcode-gate-quality.yml` | drafted |
| Canon-quality workflow is V30-aware | `.github/workflows/bitcode-canon-quality.yml` | drafted |
| README reflects V29/V30 posture | `README.md` | drafted |
| V30 Gate 1 checker exists | `scripts/check-v30-gate1-roadmap-and-gating.mjs` and package script | drafted |

## accepted boundaries

- Gate 1 does not implement Protocol/BTD package hardening.
- Gate 1 does not create `BITCODE_SPEC_V30_PROVEN.md`.

## Gate 2 Parity

| Requirement | Source evidence | Current V30 judgment |
| --- | --- | --- |
| Package-owned BTD builders and parsers exist | `packages/btd/src/api-boundaries.ts` exports mint, registry, read-access, fee, ledger-anchor, Exchange, journal, reconciliation, deployment-readiness builders plus `parseBtdRequiredBigInt`, `parseBtdOptionalBigInt`, and `toBtdJsonSafe` | drafted |
| API route delegates BTD policy and receipt derivation | `packages/api/src/routes/btd-crypto.ts` imports package builders from `@bitcode/btd` and keeps route code scoped to auth, request parsing, registry projection reads/writes, and responses | drafted |
| Package tests cover the boundary | `packages/btd/__tests__/api-boundaries.test.ts` proves mint drafts, registry snapshots, read-access decisions, parsers, and JSON-safe serialization | drafted |
| Route tests consume package-owned builders | `packages/api/src/routes/__tests__/btd-crypto.test.ts` imports BTD builders from `@bitcode/btd` and route handlers from the API route module | drafted |
| Commercial runtime avoids standalone demonstration imports | `scripts/check-v30-gate2-protocol-package-api-boundaries.mjs` scans runtime source import statements for `protocol-demonstration/src` and `@bitcode/protocol-demonstration` | drafted |
| Package READMEs state accepted imports | `packages/btd/README.md`, `packages/api/README.md`, and `packages/protocol/README.md` name package ownership and accepted import direction | drafted |
| Gate checker protects the seam | `pnpm run check:v30-gate2` and gate-quality workflow call `scripts/check-v30-gate2-protocol-package-api-boundaries.mjs` | drafted |

## Gate 2 accepted boundaries

- Gate 2 does not change the active canon pointer.
- Gate 2 does not introduce bridge chain-of-record behavior.
- Gate 2 does not admit value-bearing mainnet settlement.
- Gate 2 does not remove existing API route persistence adapters; it narrows their policy and receipt derivation responsibilities to package calls.
- Gate 1 does not promote `BITCODE_SPEC.txt` to V30.
- Gate 1 may retarget workflows to active V29 / draft V30 so later gates are greenable.
- Gate 1 may update roadmap scope for V31-V37 to align with V28/V29 promotion learning without opening those versions.

## completion condition

Gate 1 is complete when the V30 draft family validates, `check:v30-gate1` passes, workflow posture is V30-aware, README and roadmap reflect V30 initiation, V31-V37 scopes are current enough to guide future gates, diff hygiene passes, and the gate branch is committed and pushed for review into `version/v30`.
