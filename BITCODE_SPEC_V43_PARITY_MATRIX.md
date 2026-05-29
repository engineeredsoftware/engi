# Bitcode Spec V43 Parity Matrix

## Status

- Version: `V43`
- V43 state: draft parity matrix opened over active V42
- Current canonical/latest target: `V42`
- Prior canonical anchor: `BITCODE_SPEC_V42.md`
- Prior generated proof appendix: `BITCODE_SPEC_V42_PROVEN.md`
- Generated structured artifact inventory: `.bitcode/v43-spec-family-report.json`, `.bitcode/v43-canonical-input-report.json`, and future V43 gate artifacts
- Source parity state: V43 Gate 1 parity is documentation/workflow posture; V43 Gate 2 parity is source-safe inventory and migration planning; V43 Gate 3 parity is PackActivity source-safe master-detail implementation; V43 Gate 4 parity is `/read`; V43 Gate 5 parity is `/deposit` and source-safe DepositAssetPackOption synthesis; V43 Gate 6 parity is source-safe deposit policy and compensation scoring; V43 Gate 7 parity is source-safe deposit option review, admission, indexing, storage projection, telemetry, and `/packs` synchronization; V43 Gate 8 parity is shared product route UX, concise copy, progressive disclosure, and loading/empty/error route states

## Purpose

This matrix tracks V43 parity from product-route specification through source implementation, tests, generated artifacts, and promotion readiness.

## Audit basis

Audit V43 against `BITCODE_SPEC_V43.md`, V42 active canon, route source, package source, generated artifacts, workflow checks, and local/staging rehearsal receipts.

## V43 implementation matrix

| Area | Required V43 result | Source evidence | Judgment |
| --- | --- | --- | --- |
| Gate 1 roadmap | Active V42 / draft V43 posture, route vocabulary, gate plan, docs, checker, workflows | `BITCODE_SPEC_V43.md`, `scripts/check-v43-gate1-packs-read-deposit-roadmap.mjs` | drafted |
| Route vocabulary | `/exchange` to `/packs` and `/terminal` to `/read`/`/deposit` are inventoried with route vocabulary inventory, migration matrix, retained debug cockpit boundary, redirect compatibility, self-referential copy audit, and source-safe file/token counts | `packages/protocol/src/canonical/v43-route-vocabulary-inventory.js`, `.bitcode/v43-route-vocabulary-inventory.json`, `scripts/check-v43-gate2-route-vocabulary-inventory.mjs` | implemented |
| Packs master-detail | Searchable, sortable, filterable pack activity table, source-safe detail route, proof-root display, settlement/compensation/delivery/repair readback, and `/exchange` compatibility redirect | `packages/protocol/src/canonical/v43-packs-activity-master-detail.js`, `.bitcode/v43-packs-activity-master-detail.json`, `uapi/app/packs`, `uapi/app/api/packs/activity/route.ts`, `uapi/components/base/bitcode/activity/pack-activity-model.ts` | implemented |
| Read route | `ReadRouteSession` and five-step Reading UX own Read Request, synthesized Need review, accepted-Need-gated Finding Fits, source-safe AssetPack preview, BTC settlement, and delivery posture | `packages/protocol/src/canonical/v43-read-route-five-step-ux.js`, `.bitcode/v43-read-route-five-step-ux.json`, `uapi/app/read`, `uapi/app/read/read-route-model.ts` | implemented |
| Deposit route | `DepositRouteSession`, `/deposit`, source-safe connected-source option synthesis, source-safe option cards, route tests, package tests, generated proof, and retained deposit composer reuse | `packages/protocol/src/canonical/v43-deposit-route-options.js`, `.bitcode/v43-deposit-route-options.json`, `uapi/app/deposit`, `packages/pipelines/asset-pack/src/deposit-asset-pack-options.ts` | implemented |
| Criticality/ROI policy | Source criticality, demand, ROI, BTD potential, and BTC source-to-shares compensation posture | `packages/protocol/src/canonical/v43-deposit-policy-compensation.js`, `.bitcode/v43-deposit-policy-compensation.json`, `packages/pipelines/asset-pack/src/deposit-asset-pack-option-policy.ts`, `/deposit` policy readback | implemented |
| Deposit option admission | Approved, policy-eligible deposit options enter source-safe Depository projections and `/packs` activity while rejected, resynthesis, pending, and policy-blocked options stay out | `packages/protocol/src/canonical/v43-deposit-option-admission.js`, `.bitcode/v43-deposit-option-admission.json`, `packages/pipelines/asset-pack/src/deposit-asset-pack-option-admission.ts`, `/deposit` admission readback, `/packs` activity model | implemented |
| UX/UI product excellence | Self-explanatory, polished, progressive-detail UI without self-referential product copy | `packages/protocol/src/canonical/v43-route-ux-product-excellence.js`, `.bitcode/v43-route-ux-product-excellence.json`, `uapi/components/base/bitcode/routes/product-route-shell.tsx`, `/packs`, `/read`, `/deposit` route clients | implemented |
| Rehearsal | Local/staging-testnet cross-route path verifies deposit, read, packs, settlement, compensation, delivery | future Gate 9 artifact | draft-required |
| Promotion readiness | V43 generated proof and active V43 / draft V44 posture ready | future Gate 10 artifact | draft-required |

## V43 implementation checklist

| Area | Closure requirement | Current judgment |
| --- | --- | --- |
| Specification family | V43 SPEC, DELTA, NOTES, PARITY files exist and pass spec-family check | drafted |
| Package script | `check:v43-gate1` exists | drafted |
| Workflows | Gate/canon quality know active V42 / draft V43 | drafted |
| Documentation | README and roadmap name V43 route/product scope | drafted |
| Gate 2 package proof | `V43RouteVocabularyInventory` exports, generated artifact, package test, workflow checks, and `check:v43-gate2` exist | implemented |
| Gate 3 PackActivity proof | `V43PacksActivityMasterDetail` exports, generated artifact, source-safe model/API/UI tests, workflow checks, and `check:v43-gate3` exist | implemented |
| Gate 4 Read route proof | `V43ReadRouteFiveStepUx` exports, generated artifact, source-safe route model/UI tests, workflow checks, and `check:v43-gate4` exist | implemented |
| Gate 5 Deposit route proof | `V43DepositRouteOptions` exports, generated artifact, source-safe route model/UI tests, asset-pack option synthesis tests, workflow checks, and `check:v43-gate5` exist | implemented |
| Gate 6 Deposit policy proof | `DepositAssetPackOptionPolicyReport`, generated artifact, source-safe route model/UI tests, asset-pack policy tests, workflow checks, and `check:v43-gate6` exist | implemented |
| Gate 7 Deposit option admission proof | `DepositAssetPackOptionAdmissionReport`, generated artifact, source-safe route model/UI tests, asset-pack admission tests, PackActivity sync tests, workflow checks, and `check:v43-gate7` exist | implemented |
| Gate 8 route UX proof | `ProductRouteShell`, `ProductRouteStepGrid`, `ProductRouteStatePanel`, `ProductRouteDisclosure`, generated artifact, source-safe route shell tests, workflow checks, and `check:v43-gate8` exist | implemented |
| Implementation | Route and pipeline source changes are not part of Gates 1 or 2; Gate 3 implements only `/packs` and PackActivity; Gate 4 implements `/read`; Gate 5 implements `/deposit` option synthesis; Gate 6 implements policy scoring; Gate 7 implements depositor decisions, admission receipts, index/storage projections, telemetry, and `/packs` synchronization; Gate 8 implements shared route UX only | accepted boundary |

## V43 accepted boundaries

Gate 1 is allowed to specify and wire validation posture only. Gate 2 is allowed
to inventory and plan migration only. Gate 3 may implement `/packs`,
PackActivity, and `/exchange` compatibility redirect only. It must not extract
`/read`, extract `/deposit`, or add deposit option synthesis behavior before
their owning implementation gates. Gate 5 may implement `/deposit` and
source-safe option synthesis. Gate 6 may decide source-safe criticality, demand,
ROI, BTD potential, and compensation posture, but it must not approve, admit,
index, store, or synchronize deposit AssetPacks into `/packs`; those remain Gate
7 responsibilities. Gate 7 may approve, reject, request resynthesis, admit
policy-eligible options, project source-safe index/storage metadata, and
synchronize admitted options into `/packs`; it must not mint BTD, transfer
rights, broadcast settlement, or disclose unpaid AssetPack source.
Gate 8 may refine route layout, concise copy, shared components, accessible
step controls, progressive detail, and loading/empty/error states, but it must
not move state-machine authority, change settlement law, or disclose protected
source.

## V43 completion condition

The matrix is complete when every V43 gate row is closed with source, tests, documentation, generated artifacts, and promotion proof.
