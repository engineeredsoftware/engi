# Bitcode Spec V28 Delta

## Status

- Version: `V28`
- V28 state: draft target delta opened
- Current canonical/latest target: `V27`
- Prior canonical anchor: `BITCODE_SPEC_V27.md`
- Prior generated proof appendix: `BITCODE_SPEC_V27_PROVEN.md`
- Generated structured artifact inventory: `.bitcode/v28-gate-1-draft-opening-proof.json`; V28 spec-family and canonical-input reports are planned generated artifacts
- Source parity state: first-gate draft parity opened in `BITCODE_SPEC_V28_PARITY_MATRIX.md`
- State: draft target delta opened
- Active canonical pointer during draft opening: `BITCODE_SPEC.txt` -> `V27`
- Scope: commercial application MVP QA delta from V27 tokenomics and crypto-commercial rails to V28 operator-ready commercial surfaces
- Spec companion: `BITCODE_SPEC_V28.md`
- Notes companion: `BITCODE_SPEC_V28_NOTES.md`
- Parity companion: `BITCODE_SPEC_V28_PARITY_MATRIX.md`
- Generated proof appendix: none until V28 promotion

This DELTA records what V28 intends to change relative to V27.
V28 starts as a draft family only.

## Why V28 Exists

V27 closed the core `$BTD` law and minimum practical crypto rails:

- 21,000,000-cell non-fungible `$BTD` registry;
- AssetPack ranges as commercial units;
- measureminting decay;
- zero-cell/refit tail receipts;
- owner-read and licensed-read separation;
- BTC as the fee asset;
- wallet signer-session and BTC fee receipt primitives;
- ledger anchor, minimal Exchange, Terminal journal, reconciliation, telemetry, and upgrade primitives.

Those primitives are technically coherent but not yet commercial-application coherent.
V28 exists to make the active application surfaces commercially MVP-readable, with Exchange MVP and Auxillaries shell cleanup treated as first-class QA work before deeper Terminal expansion.

## Delta Contract

V28 changes Bitcode by turning V27's package/API/receipt primitives into commercial application MVP workflows.

V28 must make all of these implementation-derivable:

- commercial application route QA across Terminal, Exchange, Auxillaries, BTD range disclosure, conversations, auth, and navigation;
- Auxillaries contained tabs-left experience with old orbital style conflicts removed from active paths;
- Exchange MVP activity/search/detail/range-acquisition readiness;
- Terminal wallet readiness and signer-session review;
- BTC fee transaction preparation, signing, broadcast, finality, and failure display;
- Need review and Fit review as explicit pre-settlement boundaries;
- measureminting entitlement and zero-cell/refit posture in the operator flow;
- AssetPack range details from registry state;
- owner-read/licensed-read/denied access decision surfaces;
- Terminal journal diff and ledger/database reconciliation detail;
- organization/team/read-license readiness from registry-derived facts;
- MCP action gates based on range/read-license/policy truth;
- operational health over deployment lanes, telemetry, upgrades, migrations, and rollback state;
- honest connected-provider readiness while broader provider/interface work remains staged beyond V28.

V28 must not:

- introduce versioned implementation routes;
- redefine `$BTD` supply;
- make `$BTD` a fee or spend token;
- rely on compatibility aggregate balances as canonical range ownership;
- approve value-bearing mainnet launch without operational approval;
- pull broad Exchange depth beyond V28 Exchange MVP QA.

## Accepted V28 decisions

- V28 is commercial-application-MVP-first.
- V27 remains active canon during V28 drafting.
- V28 productizes V27 primitives rather than redefining tokenomics.
- Terminal, Exchange, Auxillaries, and BTD disclosure read models must be registry-derived where they speak about `$BTD`, fees, rights, or readiness.
- UAPI route implementations remain unversioned.
- value-bearing mainnet remains separately approval-gated.

## Explicitly deferred

- V29 owns deeper Terminal workflows beyond MVP QA.
- V30 owns deeper Exchange beyond V28 Exchange MVP QA.
- V31 owns deeper Auxillaries beyond V28 active-shell cleanup.
- V32 owns deeper provation and testing.
- V33 owns deeper Interfaces, including the MCP API, ChatGPT App, and non-Auxillaries non-website application interfaces.
- V34 owns deeper Deployment, including host capabilities, real executions, distributed compute, runtime/storage expectations, and canonical-promotion CI/CD.
- V35 owns deeper telemetry and documenting across internal codebase docs plus public `/docs` usage material.
- broad Exchange market depth, wrappers, liquidity, and advanced market flows remain V30 unless an MVP Exchange QA issue requires a narrow V28 hook.
- final legal templates may be drafted in V28 but broader legal-product expansion is not a promotion blocker unless Terminal copy claims rights that are not policy-bound.

## Pre-Implementation Sequence

1. Confirm V27 active pointer and V28 draft target.
2. Close V28 Gate 1 by synchronizing SPEC, DELTA, NOTES, PARITY, posture carriers, and route scans.
3. Close commercial application MVP QA baseline across primary routes.
4. Clean Auxillaries active shell to the contained tabs-left model.
5. Harden Exchange MVP activity/search/detail/range-acquisition readiness.
6. Build Terminal wallet, BTC fee, Need/Fit, measuremint, range, read-right, journal, and reconciliation surfaces to MVP.
7. Build organization/access-policy and operational-health surfaces at MVP depth.
8. Generate proof artifacts and promote only after tests/builds/QA pass.

## Commit-Body Direction

The eventual V28 promotion commit body must describe commercial application MVP QA over V27 tokenomics, list gate closures, name tests/builds/proofs/visual QA, state route-versioning discipline, and explicitly defer deeper Terminal work to V29, deeper Exchange to V30, deeper Auxillaries to V31, deeper provation/testing to V32, deeper Interfaces to V33, deeper Deployment to V34, and deeper telemetry/documenting to V35.

## From V27 To V28

| V27 source truth | V28 delta |
| --- | --- |
| commercial application routes render but still contain mixed visual generations | V28 makes active routes MVP-coherent through QA, visual cleanup, route checks, and browser proof |
| Auxillaries retained orbital-era shell styles while adopting contained tabs-left panes | V28 removes conflicting orbital layout from active Auxillaries auth/profile/readiness experience |
| signed-in balance widget used currency-like `$BTD`, a raw pipe separator, explanatory hover title, and acquisition wording | V28 renders BTC and BTD as peer wallet balances, uses a styled separator, shows recent BTD AssetPacks in hover context, and routes `Exchange BTD` to the Exchange MVP |
| Exchange route exists as minimum commercial surface | V28 hardens Exchange MVP activity/search/detail/range-acquisition readiness without broad order-book depth |
| `$BTD` supply and measureminting law are implemented in `packages/btd` | Terminal reads measuremint entitlement and zero-cell/refit posture as operator state |
| wallet and BTC fee primitives exist | Terminal exposes wallet connection, signer-session state, PSBT handoff, txid, confirmation, replacement, reorg, and failure state |
| AssetPack ranges exist as package/API/database primitives | Terminal makes range, cells, owner, policy hash, source root, proof root, and ledger anchor state readable |
| access evaluation exists | Terminal separates owner-read, licensed-read, and denied branches with policy context |
| minimal Exchange transfer exists | Terminal rereads Exchange state for transaction detail but does not widen market depth |
| Terminal journal primitive exists | Terminal turns journal rows and diffs into ordinary transaction detail |
| reconciliation primitive exists | Terminal displays ledger facts, database projections, metaphysical facts, blocking drift, and repair receipts |
| telemetry and deployment lanes exist | Terminal exposes crypto health, approval roots, upgrade posture, and rollback readiness |
| GitHub is the implemented VCS provider | active surfaces disclose provider readiness and stage broader provider depth outside V28 unless MVP QA requires a narrow hook |
| V27 registry migration exists | V28 executes controlled migration/type-refresh work as Terminal readiness input |

## Gate Delta

### Gate 1: Draft Opening And Promotion Review

Opened by:

- updating active posture carriers from V26/V27 to V27/V28;
- creating V28 SPEC, DELTA, PARITY, and draft-opening proof;
- preserving `BITCODE_SPEC.txt` as V27.

### Gate 2: Commercial Application MVP QA Baseline

Adds primary-route QA, Auxillaries shell cleanup, Exchange MVP hardening, and browser/visual proof requirements.

### Gate 3: Terminal Wallet, BTC Fee, And Need-Fit-Measuremint Workflow

Adds wallet, BTC fee, operator-visible measurement, Fit, proof, measuremint, and access-policy review.

### Gate 4: Terminal AssetPack Range Detail

Adds registry-derived range detail and read-right detail.

### Gate 5: Terminal Journal Diff And Reconciliation

Adds transaction detail for journal/database/ledger agreement and repair.

### Gate 6: Terminal Organization And Access Policy

Adds registry-derived organization and MCP access decisions plus policy templates.

### Gate 7: Terminal Operations And Testnet Readiness

Adds Terminal-operated deployment lane, telemetry, upgrade, migration, and provider readiness state.

### Gate 8: V28 Promotion Proof

Adds final proof, build/test, unversioned route, and scope-staging closure.

## Later Version Handoff

- V29: deeper Terminal workflows and transaction operation beyond V28 MVP QA.
- V30: deeper Exchange, including market depth, order books, range trading depth, wrappers, liquidity, and advanced settlement flows beyond MVP.
- V31: deeper Auxillaries, including expanded profile/connects/interfaces/BTD readiness, provider readiness, and commercial operator settings.
- V32: deeper provation and testing, including stronger proof-family closure, E2E breadth, promotion proofs, and regression matrices.
- V33: deeper Interfaces, including the MCP API, ChatGPT App, integratable chatbot app surfaces, API packaging, interface auth, and non-Auxillaries non-website application interfaces.
- V34: deeper Deployment, including host capabilities, real executions, distributed compute aligned with provations, runtime expectations, storage expectations, and CI/CD for canonical promotions.
- V35: deeper telemetry and documenting, including internal codebase documentation and public `/docs` usage material as the prelude to full commercial application testnet rollout.
