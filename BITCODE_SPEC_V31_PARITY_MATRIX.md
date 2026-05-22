# Bitcode Spec V31 Parity Matrix

## Status

- Version: `V31`
- V31 state: draft-target parity matrix opened for Auxillaries deepening over promoted V30
- Current canonical/latest target: `V30`
- Prior canonical anchor: `BITCODE_SPEC_V30.md`
- Prior generated proof appendix: `BITCODE_SPEC_V30_PROVEN.md`
- Generated structured artifact inventory: none until V31 gates admit V31 generated artifacts; reserved draft paths include `.bitcode/v31-spec-family-report.json`, `.bitcode/v31-canonical-input-report.json`, `.bitcode/v31-canon-posture-drift-report.json`, and `.bitcode/v31-auxillaries-telemetry-proof-hooks.json`
- Source parity state: V31 source parity begins with Auxillaries specification, roadmap, workflow, docs, and gate-checker opening
- State: draft target parity matrix opened
- Active canonical pointer during draft opening: `BITCODE_SPEC.txt` -> `V30`
- Scope: V31 canonical parity ledger for Auxillaries support/control surfaces over promoted V30
- Spec companion: `BITCODE_SPEC_V31.md`
- Notes companion: `BITCODE_SPEC_V31_NOTES.md`
- Delta companion: `BITCODE_SPEC_V31_DELTA.md`
- Generated proof appendix: none until V31 promotion
- Last fully realized canonical target preserved in source: `V30`

## Purpose

The V31 parity matrix prevents Auxillaries deepening from becoming settings-page prose.
Every V31 gate must name the package/API/UI surfaces, data objects, tests, generated/proof evidence, accepted boundaries, and promotion posture required before the gate closes.

## Audit basis

Gate 1 audit basis:

- `BITCODE_SPEC.txt`
- `BITCODE_SPEC_V30.md`
- `BITCODE_SPEC_V30_DELTA.md`
- `BITCODE_SPEC_V30_NOTES.md`
- `BITCODE_SPEC_V30_PARITY_MATRIX.md`
- `BITCODE_SPEC_V30_PROVEN.md`
- `BITCODE_SPEC_V31.md`
- `BITCODE_SPEC_V31_DELTA.md`
- `BITCODE_SPEC_V31_NOTES.md`
- `BITCODE_SPEC_V31_PARITY_MATRIX.md`
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

No `_legacy/` source is active source truth.

## V31 implementation matrix

| Area | Gate | Source evidence | Judgment | Closure requirement |
| --- | --- | --- | --- | --- |
| Draft family and branch posture | Gate 1 | `BITCODE_SPEC_V31.md`, DELTA, NOTES, PARITY, `BITCODE_SPEC.txt`, branch `v31/gate-1-spec-roadmap-opening` | drafted | V31 family validates in draft mode over active V30 and `check:v31-gate1` passes. |
| Roadmap truth | Gate 1 | `SPECIFICATIONS_ROADMAP.md`, README, PR template, workflow posture | drafted | Roadmap states V30 active, V31 draft, and coherent V32-V37 responsibilities. |
| Auxillaries package and route contracts | Gate 2 | `packages/api`, `packages/orm`, `packages/btd`, `uapi/app/auxillaries`, route tests | pending | Shared Profile, Connects, Interfaces, Wallet, BTD, organization, readiness, and recovery objects are package-owned and JSON-safe. |
| Profile and account state | Gate 3 | Profile/account packages, routes, Auxillaries pane tests | pending | Profile, account identity, wallet binding, preferences, notification posture, and completeness blockers are typed and recoverable. |
| Connects provider readiness and recovery | Gate 4 | Provider packages, connection routes, readiness/recovery tests | pending | Provider readiness names credential posture without secrets, scopes class, readback status, blocker, repair action, and before/after roots. |
| Wallet and BTD pane readiness | Gate 5 | `packages/btd`, Wallet/BTD panes, settlement/read-right tests | pending | Wallet and BTD panes consume V30 no-custody, signer, read-right, treasury, and settlement-readiness primitives. |
| Organization team role policy authority | Gate 6 | Organization packages/routes, policy authority tests, Terminal/Auxillaries projections | pending | Organization, team, role, grants, multi-sig readiness, policy decisions, denials, and recovery routes are typed and fail closed. |
| Interfaces pane admission and cross-surface contracts | Gate 7 | Interfaces pane, API/MCP/ChatGPT App interface records, tests | pending | Interface admission records name auth mode, supported actions, policy constraints, source-safety class, blockers, and readiness. |
| Auxillaries UX accessibility and responsive proof | Gate 8 | Auxillaries components, focused Jest/Playwright/a11y evidence | pending | Guided low-detail and expandable audit UX works across Profile, Connects, Interfaces, Wallet/BTD, and organization panes. |
| Auxillaries telemetry proof and recovery runs | Gate 9 | Telemetry/proof packages, recovery routes, readback tests | pending | Profile, connection, interface, wallet, BTD, organization, policy, readiness, and recovery events emit source-safe proof hooks. |
| Promotion readiness | Gate 10 | V31 promotion workflow, generated `.bitcode/v31-*`, `BITCODE_SPEC_V31_PROVEN.md` | pending | `version/v31` can promote to `main` only after all V31 gates pass and promotion automation commits generated canon. |

## V31 implementation checklist

| Area | Required V31 result | Judgment |
| --- | --- | --- |
| Active canon pointer | `BITCODE_SPEC.txt` remains `V30` during V31 gate work | drafted |
| Gate branch pattern | V31 work happens on `version/v31` or `v31/gate-N-*` branches | drafted |
| Spec-family shape | V31 SPEC, DELTA, NOTES, and PARITY satisfy the full spec-family checker | drafted |
| Gate 1 script | `pnpm run check:v31-gate1` fails closed on stale posture, missing roadmap truth, or missing Auxillaries scope | drafted |
| Gate-quality workflow | Gate workflow validates V30 active / V31 draft posture and V31 Gate 1 | drafted |
| Canon-quality workflow | Canon workflow validates V30 active / V31 draft posture and V31 draft family | drafted |

## Gate 1 Parity

| Requirement | Source evidence | Current V31 judgment |
| --- | --- | --- |
| Active canon remains V30 during V31 draft opening | `BITCODE_SPEC.txt` contains `V30` | drafted |
| Runtime draft target is V31 | `packages/protocol/src/canon-posture.js` and `protocol-demonstration/src/canon-posture.js` declare V30 active and V31 draft | drafted |
| V31 SPEC family exists as draft | `BITCODE_SPEC_V31.md`, DELTA, NOTES, and PARITY | drafted |
| Roadmap is current | `SPECIFICATIONS_ROADMAP.md` states V30 active canon, V31 active draft target, and V32-V37 scopes | drafted |
| Gate-quality workflow is V31-aware | `.github/workflows/bitcode-gate-quality.yml` | drafted |
| Canon-quality workflow is V31-aware | `.github/workflows/bitcode-canon-quality.yml` | drafted |
| README reflects V30/V31 posture | `README.md` | drafted |
| PR template reflects V31 gate titles | `.github/pull_request_template.md` | drafted |
| V31 Gate 1 checker exists | `scripts/check-v31-gate1-spec-roadmap-opening.mjs` and package script | drafted |

## Gate 2 Parity

| Requirement | Source evidence | Current V31 judgment |
| --- | --- | --- |
| Package-owned Auxillaries contracts exist | `packages/api`, `packages/orm`, `packages/btd`, provider packages | pending |
| Routes delegate readiness and policy derivation | Auxillaries API routes and focused route tests | pending |
| JSON-safe serializers redact secrets and protected source | package tests and route tests | pending |
| Commercial runtime avoids standalone demonstration imports | V31 Gate 2 checker | pending |

## Gate 3 Parity

| Requirement | Source evidence | Current V31 judgment |
| --- | --- | --- |
| Profile/account state is typed | Profile/account package objects and tests | pending |
| Wallet binding and preferences are recoverable support state | profile/account routes and Auxillaries pane readback | pending |
| Incomplete state names blockers and repair routes | component tests and route tests | pending |

## Gate 4 Parity

| Requirement | Source evidence | Current V31 judgment |
| --- | --- | --- |
| Provider readiness is source-safe | provider connection contracts and tests | pending |
| Recovery runs record before/after readiness roots | recovery route and execution tests | pending |
| Tokens and credentials never enter telemetry/UI metadata | source-safety tests and scans | pending |

## Gate 5 Parity

| Requirement | Source evidence | Current V31 judgment |
| --- | --- | --- |
| Wallet panes consume no-custody signer posture | BTD wallet primitives and pane tests | pending |
| BTD panes consume range/read-right/treasury summaries | BTD access and treasury tests | pending |
| Settlement-readiness state remains distinct from Exchange market state | package and UI tests | pending |

## Gate 6 Parity

| Requirement | Source evidence | Current V31 judgment |
| --- | --- | --- |
| Organization authority is package-owned | organization/policy packages and route tests | pending |
| Role, grants, policy, wallet binding, and denial reasons are typed | package tests and Auxillaries organization pane tests | pending |
| Protected actions fail closed unless all authority inputs admit them | policy/authorization tests | pending |

## Gate 7 Parity

| Requirement | Source evidence | Current V31 judgment |
| --- | --- | --- |
| Interfaces pane exposes admitted surfaces | Interfaces pane records and tests | pending |
| Each surface names auth, actions, policy, source-safety, blockers, and readiness | package/API/MCP/ChatGPT App contract tests | pending |
| Deferred Exchange and Conversations remain explicitly out of scope | specs, checker, and UI labels | pending |

## Gate 8 Parity

| Requirement | Source evidence | Current V31 judgment |
| --- | --- | --- |
| Guided low-detail UX is default | Auxillaries component tests | pending |
| Audit detail is expandable without layout breakage | responsive/browser proof | pending |
| Keyboard, focus, labels, state announcements, contrast, and reduced motion are tested | accessibility proof | pending |

## Gate 9 Parity

| Requirement | Source evidence | Current V31 judgment |
| --- | --- | --- |
| Auxillaries telemetry subjects are typed | telemetry/proof hook package and tests | pending |
| Recovery runs are executions with source-safe before/after evidence | recovery route/UI readback tests | pending |
| Proof hooks bind theorem, replay, evidence, telemetry, blocker, and repair outcome roots | proof-hook tests and generated artifact | pending |

## Gate 10 Parity

| Requirement | Source evidence | Current V31 judgment |
| --- | --- | --- |
| V31 promotion checker exists | `scripts/check-v31-gate10-promotion-readiness.mjs` | pending |
| V31 promotion workflow exists | `.github/workflows/v31-canon-promotion.yml` | pending |
| Promotion command supports V31 generated artifacts and runtime posture rewriting | promotion scripts and tests | pending |
| `BITCODE_SPEC_V31_PROVEN.md` is generated during promotion only | generated proof workflow evidence | pending |

## accepted boundaries

- Gate 1 does not implement Auxillaries package contracts or UI behavior.
- Gate 1 does not create `BITCODE_SPEC_V31_PROVEN.md`.
- Gate 1 does not promote `BITCODE_SPEC.txt` to V31.
- Gate 1 may retarget workflows to active V30 / draft V31 so later gates are greenable.
- Gate 1 may update V31-V37 roadmap scope to align with promoted V30 and current enterprise-readiness goals.
- V31 does not redefine V30 Reading, Finding Fits, AssetPack preview, settlement, delivery, BTC fee, or BTD tokenomics law.

## completion condition

Gate 1 is complete when the V31 draft family validates, `check:v31-gate1` passes, workflow posture is V31-aware, README and roadmap reflect V31 initiation, V31-V37 scopes are current enough to guide future gates, diff hygiene passes, and the gate branch is committed, pushed, and pull-requested for review into `version/v31`.
