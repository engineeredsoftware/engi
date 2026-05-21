# Bitcode Spec V30 Delta

## Status

- Version: `V30`
- V30 state: draft target delta opened for Protocol/BTD hardening
- Current canonical/latest target: `V29`
- Prior canonical anchor: `BITCODE_SPEC_V29.md`
- Prior generated proof appendix: `BITCODE_SPEC_V29_PROVEN.md`
- Generated structured artifact inventory: none for V30 yet; draft gates must create V30 reports and generated proof only as acceptance evidence
- Source parity state: V30 source parity is draft-opened for Protocol/BTD package APIs, Bitcoin/Taproot/PSBT rigor, BTD receipts, testnet ledger projection, source-to-shares proof cleanup, bridge-readiness boundaries, telemetry hooks, and promotion automation
- State: draft target delta opened
- Active canonical pointer during draft opening: `BITCODE_SPEC.txt` -> `V29`
- Scope: V30 draft delta for Protocol/BTD hardening over promoted V29
- Spec companion: `BITCODE_SPEC_V30.md`
- Notes companion: `BITCODE_SPEC_V30_NOTES.md`
- Parity companion: `BITCODE_SPEC_V30_PARITY_MATRIX.md`
- Generated proof appendix: none until V30 promotion

## Why V30 exists

V29 canonically promoted Terminal transaction depth over the commercial Reading system.
It made the operator cockpit more navigable, recoverable, source-safe, repairable, and promotion-proven.

V30 exists because the protocol rails beneath that cockpit now need commercial hardening before Bitcode can responsibly expand into Auxillaries depth, proof depth, interface depth, deployment depth, documentation depth, Exchange, and Conversations.
The focus is not a new product surface.
The focus is making Protocol/BTD packages, Bitcoin/Taproot/PSBT flow, BTD receipts, ledger/database/object-storage projections, source-to-shares proofs, and bridge-readiness boundaries stable enough for enterprise shippability.

## Accepted V30 decisions

- V29 remains active canon during V30 drafting.
- V30 gate branches are opened from `version/v30` and merged back only when their gate acceptance criteria are closed.
- V30 owns Protocol/BTD hardening, not another Terminal redesign.
- V30 preserves the V29 Reading journey: request Read, review synthesized Need, request Finding Fits, review source-safe AssetPack preview, buy/settle, and receive paid delivery.
- V30 narrows shared package APIs before they become Exchange, Auxillaries, interface, deployment, or documentation dependencies.
- V30 makes Bitcoin fee, Taproot, PSBT, signer, broadcast, replacement, reorg, blocked-readiness, and finality semantics typed and testable.
- V30 binds BTD-AssetPack mint/read/right-transfer receipts to source-safe preview, paid unlock, delivery, and reconciliation.
- V30 cleans source-to-shares contribution accounting, settlement conservation, zero-cell/refit tail posture, and no-overpayment/no-underpayment proof surfaces.
- V30 records bridge-readiness research without treating any bridge as current `$BTD` chain-of-record truth.
- V30 workflows and scripts must validate V29 active / V30 draft posture.

## Explicitly deferred

- V31 Auxillaries depth remains V31.
- V32 proof-family/provation expansion remains V32.
- V33 interface/MCP/ChatGPT/API depth remains V33 except for Protocol/BTD hooks needed by V30.
- V34 deployment/runtime/storage depth remains V34 except for host-capability facts needed by V30.
- V35 telemetry/documentation depth remains V35 except for Protocol/BTD telemetry hooks needed by V30.
- Exchange product/market depth remains beyond V35.
- Website Conversations product depth remains beyond V35.
- New `$BTD` supply law remains out of scope.
- Value-bearing mainnet launch remains separately approval-gated.
- Bridge integrations remain research posture, not chain-of-record implementation.

## Pre-Implementation Sequence

1. Open `version/v30` from promoted `main`.
2. Open `v30/gate-1-roadmap-and-gating` from `version/v30`.
3. Create the V30 SPEC, DELTA, NOTES, and PARITY family while preserving `BITCODE_SPEC.txt -> V29`.
4. Refresh `SPECIFICATIONS_ROADMAP.md` so V29 is active canon, V30 is draft target, and V31-V37 scopes remain coherent after recent V28/V29 work.
5. Retarget gate-quality and canon-quality workflow posture checks to V29 active / V30 draft.
6. Add `check:v30-gate1` and a V30 Gate 1 checker.
7. Define V30 gates, acceptance criteria, carryforward parity rows, and post-V30 roadmap responsibilities.
8. Validate spec family, canonical inputs, canon posture, workflows, roadmap truth, README/docs, and diff hygiene.
9. Push the gate branch and open a pull request to `version/v30`.

## Commit-Body Direction

V30 gate commit bodies should describe the closed gate, specification changes, implementation surfaces, tests, proof commands, and accepted boundaries.
The eventual V30 promotion commit body must name all closed V30 gates, generated proof artifacts, Protocol/BTD hardening surfaces, and the `BITCODE_SPEC.txt` pointer change from `V29` to `V30`.
It must explicitly defer V31+ scopes, Exchange, Conversations, bridge chain-of-record implementation, and value-bearing mainnet launch.

## Gate Delta

### Gate 1: V30 Roadmap And Gating

Gate 1 opens V30 correctly:

- V30 SPEC, DELTA, NOTES, and PARITY files exist.
- `BITCODE_SPEC.txt` remains `V29`.
- README, roadmap, PR template, and workflows describe V29 active / V30 draft posture.
- `check:v30-gate1` validates branch naming, spec family, notes, parity, roadmap truth, workflow posture, and promotion boundaries.
- The V30 gate list is explicit before product implementation begins.

### Gate 2: Protocol Package API Boundaries

Gate 2 narrows the commercial Protocol/BTD package API surface.

Closure acceptance:

- shared Protocol/BTD objects used by multiple interfaces have package-owned builders, parsers, validators, tests, and JSON-safe serialization;
- route code delegates policy and receipt derivation to packages rather than duplicating it;
- no commercial runtime code imports `protocol-demonstration/src/*`;
- package READMEs name ownership boundaries and accepted imports.

### Gate 3: Bitcoin Taproot PSBT Fee Rigor

Gate 3 hardens Bitcoin fee and signer semantics.

Closure acceptance:

- BTC fee quote, signer recovery, PSBT handoff, Taproot/script posture, broadcast, replacement, reorg, and finality states are typed;
- server-custody rejection remains explicit;
- testnet/mainnet distinction is policy-enforced and proof-rooted;
- focused BTD/API tests prove fee lifecycle and blocked-readiness behavior.

### Gate 4: BTD AssetPack Mint And Read Receipts

Gate 4 creates typed BTD receipt boundaries.

Closure acceptance:

- `BtdAssetPackMintReceipt`, `BtdReadReceipt`, and `BtdRightsTransferReceipt` are package-owned;
- receipts bind AssetPack ids, BTD ranges, Reader/Depositor identities, source-safe preview roots, paid unlock, delivery admission, and ledger projection roots;
- protected source remains hidden before settlement;
- receipts are stored, streamed, and rendered through existing execution and Terminal surfaces.

### Gate 5: Testnet Ledger Projection Hardening

Gate 5 hardens ledger/database/object-storage projection and repair.

Closure acceptance:

- ledger-observed facts, database projections, object-storage artifacts, and private metaphysical facts remain distinct;
- projection repair classes and proof roots are deterministic;
- Supabase staging-testnet readback can prove synchronized or blocked state without secrets in tracked files;
- reconciliation tests cover drift, quarantine, retry, and unlock blocking.

### Gate 6: Source-To-Shares Proof Cleanup

Gate 6 cleans contribution measurement and settlement conservation.

Closure acceptance:

- source-to-shares proof surfaces bind measurements, fit deposits, range slices, fee quote, contribution weights, settlement conservation, zero-cell/refit tail posture, and ancestry evidence where available;
- no-overpayment and no-underpayment invariants are testable;
- later Exchange work can reuse the proof without reinterpreting V30 accounting.

### Gate 7: Bridge Readiness Research Boundaries

Gate 7 records bridge-readiness without false chain-of-record claims.

Closure acceptance:

- Taproot, BitVM, BSC/opBNB, Binance Web3 Wallet, and future distribution paths have research posture records;
- each record names feasibility, risks, current non-admission, rereview triggers, and required proof before admission;
- no bridge path is treated as current `$BTD` chain-of-record truth.

### Gate 8: Protocol Telemetry And Proof Hooks

Gate 8 adds Protocol/BTD telemetry and proof hooks.

Closure acceptance:

- BTD receipts, BTC fee states, ledger projection, source-to-shares proofs, and bridge-readiness posture emit typed telemetry;
- telemetry avoids protected source and secrets;
- proof hooks are compatible with V32 provation and V35 documentation/observability work.

### Gate 9: Interface Integration And Regression Proof

Gate 9 proves existing interfaces can consume the hardened Protocol/BTD rails.

Closure acceptance:

- Terminal, API, MCP, ChatGPT App, and future Auxillaries/Exchange hooks consume package-owned objects without route-local reinvention;
- low-detail source-safe UX remains intact;
- focused regression tests prove no V29 transaction cockpit behavior regresses.

### Gate 10: V30 Promotion Readiness

Gate 10 owns final local/staging proof, generated artifacts, and V30 promotion workflow support.

Closure acceptance:

- `check:v30-gate10` validates promoted-readiness posture;
- V30 promotion workflow validates source branch, local proof commands, staging-testnet readback evidence, generated `.bitcode/v30-*` reports, and `BITCODE_SPEC_V30_PROVEN.md`;
- promotion scripts support V30 and rewrite post-promotion active V30 / draft V31 posture;
- `version/v30` can be requested into `main` only after all V30 gates close.
