# Bitcode Spec V27 Delta

## Status

- Version: `V27`
- State: draft target, not promoted
- Active canonical pointer: `BITCODE_SPEC.txt` -> `V26`
- Scope: tokenomics and practical crypto-application delta from V26 commercial Bitcode baseline to V27 formal `$BTD` tokenomics and cryptotechnological commercialization
- Spec companion: `BITCODE_SPEC_V27.md`
- Notes companion: `BITCODE_SPEC_V27_NOTES.md`
- Parity companion: `BITCODE_SPEC_V27_PARITY_MATRIX.md`
- Generated proof appendix: not generated yet

This DELTA records what V27 changes relative to V26.
It is a draft planning and implementation ledger until generated proof closure promotes V27.

## Why V27 Exists

V26 commercialized Bitcode as a minimum viable commercial system and deliberately deferred deep tokenomics plus the practical crypto-application surfaces needed to operate `$BTD` as a real ledger-aware commercial asset.

V26 established:

- BTC is the fee asset;
- `$BTD` is non-fungible AssetPack share/read-right posture plus measured Bitcode amount;
- generic `$BTD` balance mutation is closed;
- Terminal Need minting is future V27 work;
- Exchange existing-`$BTD` purchase was staged for V28 before V27's practical crypto scope was expanded;
- `packages/btd` contains the 21,000,000 mintable ceiling as a staged invariant.

V27 exists to make that deferred `$BTD` model exact and to close the minimum wallet, BTC fee, ledgerized AssetPack, minimal Exchange, Terminal transaction, reconciliation, testnet, mainnet-readiness, telemetry, and upgrade path.

The WDRR sharpens V27's draft direction:

- normalized Bitcode volume is proof-addressable semantic volume, not byte count or tokenizer count;
- primary issuance law is fixed-supply measureminting decay, with refit-only demoted to tail behavior;
- zero-cell receipts are valid V27 receipts when decayed entitlement falls below one whole cell;
- BTC fee transactions use PSBT-style user signing and do not place user private keys under Bitcode server custody;
- regtest or equivalent local chain is the deterministic local proof lane;
- signet is the canonical public Bitcoin proof lane;
- public Bitcoin testnet is supplementary rather than canonical proof infrastructure;
- Ethereum anchoring is secondary or optional in V27 and must not redefine `$BTD` issuance law;
- ancestry is optional but canonical, evidence-bound, and non-supply;
- local Exchange settlement and licensed reads own recurring economics, not third-party royalty signaling.

## Delta Contract

V27 changes Bitcode by turning `$BTD` from V26's proved commercial posture into complete tokenomics law and a practical cryptotechnological implementation baseline.

The delta is not a marketing token launch.
The delta is a protocol, package, receipt, database, proof, UI, and parity formalization.

V27 must make all of these implementation-derivable:

- finite global mintable supply;
- non-fungible cell identity;
- AssetPack contiguous range ownership;
- Need-Fit-Prove-Settle mint admission;
- proof-addressable semantic volume quantization;
- deterministic allocation;
- owner-read vs licensed-read;
- revenue routing;
- optional proof-backed ancestry;
- anti-game and dispute posture;
- fixed-supply measureminting decay;
- zero-cell/refit tail behavior.
- wallet authorization and signing posture;
- actual BTC fee transaction receipts;
- PSBT-style signing handoff without server custody of user private keys;
- ledgerized AssetPack anchors;
- minimal buy, sell, bid, ask, cancellation, settlement, and rights-transfer flow;
- Terminal transaction journals;
- ledgerized journal diffing;
- ledger/database reconciliation;
- testnet and mainnet-ready deployment lanes;
- regtest and signet as the required Bitcoin proof lanes;
- crypto telemetry, alerting, and upgrade receipts.

## From V26 To V27

| V26 source truth | V27 delta |
| --- | --- |
| `$BTD` is non-fungible AssetPack share/read-right posture | `$BTD` becomes exact cell/range registry law |
| `BTD_MAX_MINTABLE_SUPPLY = 21_000_000` exists in package | cap becomes package, receipt, DB, proof, and UI invariant |
| generic balance mutation fails closed | fungible mutation rejection becomes total V27 law |
| `user_credits` stores aggregate holdings as compatibility carrier | new Exchange BTD registry schema is specified and implemented |
| Terminal minting is future V27 intent | Need-Fit-Prove-Settle mint admission becomes canonical |
| Exchange purchase was V28 intent | V27 now owns minimal existing-`$BTD` acquisition, bid/ask, and rights-transfer closure; V28+ owns broader market depth |
| AssetPack evidence and Shippables are distinct | minted AssetPack ranges bind to stored AssetPack evidence and access policy |
| source-to-shares proof exists | proof artifacts gain minted range and supply/replay roots |
| licensed private reads exist in demonstration receipts | licensed-read policy and revenue routing become V27 tokenomics |
| ancestry is not a V26 requirement | ancestry becomes optional canonical non-supply module for knowledge-economy routing |
| wallet posture is UI/readiness-level | wallet integration becomes signer/session/network/receipt infrastructure |
| BTC fee asset is specified | BTC fees become actual transaction receipts bound to Terminal and Exchange journals |
| AssetPacks are proof/store objects | AssetPacks gain ledger anchors for range, source root, proof root, and policy hash |
| database carries commercial state | database becomes ledger-derived plus metaphysical canonical projection with reconciliation |
| testnet/mainnet are future operational paths | V27 specifies testnet implementation and mainnet-ready controls without automatic value-bearing launch |

## Gate Milestones

### Gate 1: Draft Opening And Source Audit

Status:
Closed as a draft-target source-audit gate.
Closure proof: `.bitcode/v27-gate-1-source-audit-proof.json`.
V26 remains the active canonical pointer.
No generated V27 proof appendix is claimed.

Purpose:
Open the V27 spec family and build an honest source parity baseline without promoting V27.

Closure criteria:

- V27 SPEC, DELTA, NOTES, and PARITY files exist.
- V26 remains the active canonical pointer.
- audited surfaces are listed in the parity matrix.
- parity rows classify source truth as implemented, partial, gap, or deferred.
- no generated proof claim is made before proof artifacts exist.

### Gate 2: Ontology And Cap Closure

Status:
Closed as a draft-target ontology and hard-cap gate.
Closure proof: `.bitcode/v27-gate-2-ontology-cap-proof.json`.
Later gates still own registry persistence, range proof, access policy UI, generated proof-family closure, and promotion.

Purpose:
Make `$BTD` identity, non-fungibility, and hard cap exact.

Closure criteria:

- SPEC defines cell, range, and supply state.
- `packages/btd` exports the supply constant through a stable public package boundary.
- tests prove the 21,000,000 ceiling and overflow rejection.
- every API route that could mutate generic `$BTD` balance rejects the mutation.
- UI copy keeps BTC fee and `$BTD` share/read-right separate.

### Gate 3: Supply And Range Primitive Closure

Status:
Closed as a draft-target package primitive gate.
Closure proof: `.bitcode/v27-gate-3-supply-range-proof.json`.
Later gates still own DB persistence, generated no-overlap proof families, and write-committing Exchange integration.

Purpose:
Implement the canonical range allocator.

Closure criteria:

- supply state machine exists.
- range allocation exists.
- one AssetPack receives one primary contiguous range.
- no overlap is possible through package tests.
- invalid input fails closed.
- replay can derive `nextTokenId`.

### Gate 4: Mint Admission Closure

Status:
Closed as a draft-target package/API admission gate.
Closure proof: `.bitcode/v27-gate-4-mint-admission-proof.json`.
Source-to-shares range binding proof: `.bitcode/v27-source-to-shares-mint-admission-proof.json`.
Later gates still own persisted Exchange mint writes, generated proof-family closure, and ledger finality.

Purpose:
Make Need-Fit-Prove-Settle the only mint path.

Closure criteria:

- mint request requires accepted Need, accepted Fit, proof root, source root, dedupe root, settlement root, access policy, and Exchange sequence.
- negative tests prove no mint before settlement.
- source-to-shares proof artifacts include minted range roots.
- Terminal intent can point to the path without bypassing it.

### Gate 5: Receipt And Replay Closure

Status:
Closed as a draft-target package and demonstration replay gate.
Closure proof: `.bitcode/v27-gate-5-receipt-replay-proof.json`.
Receipt replay proof slice: `.bitcode/v27-receipt-replay-proof.json`.
Later gates still own persisted Exchange receipt writes, database projection replay, ledger finality, and generated total proof-family closure.

Purpose:
Make mint facts reconstructable without trusting runtime memory.

Closure criteria:

- `BtdMintReceipt` schema exists.
- replay reconstructs prior supply, range, allocation, and next supply.
- mutation tests reject altered cap, altered range, missing root, missing policy, and non-conserved allocation.
- proof generator includes V27 receipt replay.

### Gate 6: Exchange Persistence Closure

Status:
Closed as a draft-target migration and ORM boundary gate.
Closure proof: `.bitcode/v27-gate-6-exchange-persistence-proof.json`.
Later gates still own live migration execution, generated DB type refresh, wallet/ledger finality, and value-bearing rollout controls.

Purpose:
Replace aggregate compatibility storage with Exchange registry state.

Closure criteria:

- migration creates or plans supply, semantic-volume, measuremint, range, cell, mint receipt, ownership, read-license, allocation, ancestry, licensed-read revenue, fee, anchor, order, transfer, journal, reconciliation, upgrade, and telemetry tables.
- SQL constraints cover cap, uniqueness, no overlap, access policy, and service-role mutation.
- ORM exposes Bitcode-native model names.
- `user_credits` is no longer canonical tokenomics truth.

### Gate 7: Access And Policy Closure

Closed as a draft-target access and policy gate.
Closure proof: `.bitcode/v27-gate-7-access-policy-proof.json`.
Later gates still own value-bearing access operations, full legal template review, and generated proof-family promotion.

Purpose:
Make owner-read and licensed-read exact.

Closure criteria:

- access policy evaluator exists.
- owner-read, licensed-read, expired license, unauthorized read, and policy mismatch are tested.
- UI discloses policy id/hash and AssetPack range posture.
- legal overclaim text is absent from public surfaces.

### Gate 8: Allocation And Revenue Closure

Purpose:
Make deterministic allocation and licensed-read economics exact.

Closure criteria:

- allocation conserves token count.
- settlement rows record direct holder, ancestor pool, treasury, holdback, and failed/pending routes.
- revenue routing receipt exists.
- tests prove deterministic largest-remainder or accepted equivalent allocation.

### Gate 9: Ancestry Closure

Purpose:
Add late-bound knowledge ancestry without creating early-token rent seeking.

Closure criteria:

- ancestry edge schema exists.
- `createdAfterChildFit` is enforced.
- ancestry never affects mint count.
- low-confidence edges are unpaid.
- loop/collusion/duplicate-source mitigations are tested.
- ancestry is optional for base `$BTD` validity.

### Gate 10: Wallet And BTC Fee Settlement Closure

Purpose:
Make user-controlled wallet authorization and BTC fee payment real enough for V27 commercial operation.

Closure criteria:

- wallet/session/network model exists.
- transaction construction and signing handoff do not require server custody of user private keys.
- PSBT-style unsigned/signed/broadcast/confirmed flow or accepted wallet-native equivalent is implemented.
- BTC fee transaction receipt exists and binds txid, network, sats paid, Exchange sequence, and Terminal journal root.
- regtest or equivalent local-chain tests cover broadcast, confirmation, replacement/failure, and replay.
- signet proof covers public-network transaction observation.
- `$BTD` remains rejected as a fee asset.

### Gate 11: Ledgerized AssetPack Anchor Closure

Purpose:
Make AssetPack ranges, proof roots, and access policy hashes ledger-observable without leaking private source.

Closure criteria:

- `AssetPackLedgerAnchor` schema exists.
- at least one concrete Bitcoin ledger anchor path is implemented in local and signet form.
- Taproot, OP_RETURN, or another standard Bitcoin commitment method is selected by implementation proof.
- Ethereum registry/event anchoring is secondary or optional and either implemented or explicitly bounded as not ready.
- anchors bind AssetPack id, `$BTD` range, source manifest root, proof root, and access policy hash.
- pending, confirmed, reorged, and failed states replay.

### Gate 12: Minimal AssetPack Exchange Closure

Purpose:
Prove that AssetPack rights can be bought, sold, bid, asked, cancelled, settled, and transferred without fungible `$BTD` balances.

Closure criteria:

- `AssetPackExchangeOrder` or equivalent model exists.
- buy, sell, bid, ask, cancel, accept, settle, and transfer are implemented or proof-harnessed.
- ownership and license receipts replay Exchange state.
- rights transfer cannot bypass policy, proof, fee, or ledger requirements.
- V28+ market depth is not needed for V27 closure.

### Gate 13: Terminal Transaction And Journal Diff Closure

Purpose:
Make Terminal actions accountable from user intent through Exchange settlement and ledger observation.

Closure criteria:

- Terminal transaction families cover Need, Fit, proof, mint, fee, anchor, license, order, transfer, dispute, and settlement finalization.
- journal entries carry stable ids, pre-state roots, post-state roots, receipt roots, and ledger anchor references.
- journal diffing detects disagreement among Terminal intent, Exchange journal, ledger observation, database projection, and proof artifacts.
- blocking diffs fail closed before UI or API claims finality.

### Gate 14: Ledger/Database Reconciliation Closure

Purpose:
Make ledgers the source of truth for cryptographic finality while preserving Bitcode's canonical private/metaphysical database facts.

Closure criteria:

- reconciliation can replay ledger and Exchange journal facts into database projections.
- database projections cannot override confirmed ledger facts.
- private source metadata, proof bundles, access policies, disputes, telemetry, and pending state are explicitly non-ledgerized canonical facts.
- reconciler emits repair and alert receipts.
- idempotent replay is tested.

### Gate 15: Testnet, Mainnet-Ready, Telemetry, And Upgrade Closure

Purpose:
Prepare the V27 crypto surfaces for production operation without automatically launching value-bearing mainnet activity.

Closure criteria:

- local, regtest, signet, supplementary testnet, and mainnet-ready environment lanes are documented.
- signet is the canonical public Bitcoin proof lane; public testnet is supplementary coverage.
- telemetry covers wallet failures, fee estimation drift, broadcast rejection, confirmation lag, reorg, RPC disagreement, projection lag, access failure, settlement failure, and upgrade failure.
- network toggles and deployment variables are named.
- value-bearing mainnet launch requires separate operational approval.
- ledgerized upgrades and migrations emit versioned receipts and rollback posture.

### Gate 16: Research Rebinding And Promotion Closure

Purpose:
Promote V27 only after spec, source, tests, proof, parity, and web-rebound crypto/library choices agree.

Closure criteria:

- web research agenda is complete and normative choices are rebound to durable primary sources.
- V27 generated proof appendix exists.
- `.bitcode/v27-*` artifacts exist.
- parity matrix has no blocking open rows.
- V27 tests pass.
- `BITCODE_SPEC.txt` is updated to `V27` only at promotion.

## Current Source Audit Summary

Implemented baseline:

- `packages/btd/src/constants.ts` owns V27 `$BTD` constants, Bitcoin network constants, and validation helpers.
- `packages/btd/src/supply.ts` owns strict supply state and cap advancement.
- `packages/btd/src/range.ts` owns Need/Fit/root/policy-guarded contiguous AssetPack range allocation.
- `packages/btd/src/semantic-volume.ts` owns proof-addressable semantic-volume measurement and quantization.
- `packages/btd/src/measuremint.ts` owns fixed-supply hyperbolic measureminting, residual accounting, and zero-cell tail receipts.
- `packages/btd/src/receipts.ts` owns conserved BTD mint receipts.
- `packages/btd/src/allocation.ts` owns Hare-Niemeyer contributor cell allocation.
- `packages/btd/src/access.ts` owns owner-read/licensed-read/denied policy evaluation.
- `packages/btd/src/ancestry.ts` owns late-bound, non-supply ancestry review.
- `packages/btd/src/revenue.ts` owns local licensed-read BTC revenue routing.
- `packages/btd/src/wallet.ts` owns signer-session capability guards without server custody.
- `packages/btd/src/bitcoin-fees.ts` owns PSBT-style BTC fee receipt lifecycle.
- `packages/btd/src/bitcoin-provider.ts` owns the network-checked Bitcoin fee provider boundary.
- `packages/btd/src/deployment-lanes.ts` owns local/regtest/signet/testnet/mainnet-ready lane guards.
- `packages/btd/src/ledger-anchor.ts` owns AssetPack ledger-anchor receipt lifecycle.
- `packages/btd/src/exchange.ts` owns minimal buy/sell/bid/ask order and rights-transfer receipt primitives.
- `packages/btd/src/terminal-journal.ts` owns Terminal journal entries and projection diffing.
- `packages/btd/src/reconciliation.ts` owns ledger/database projection repair reports.
- `packages/btd/src/telemetry.ts` owns V27 crypto telemetry event taxonomy.
- `packages/btd/src/upgrade.ts` owns versioned protocol upgrade receipts.
- `packages/btd/__tests__/v27-crypto-primitives.test.ts` proves the package primitives.
- `packages/api/src/routes/btd-crypto.ts` exposes authenticated registry snapshots and deterministic mint-draft projections without committing mint state.
- `uapi/app/api/btd/registry/route.ts` and `uapi/app/api/btd/mint-draft/route.ts` mount the commercial Next route boundary in place, without versioned route paths.
- `packages/api/src/routes/__tests__/btd-crypto.test.ts` proves route-level authentication injection, registry snapshot projection, and JSON-safe mint drafts.
- `protocol-demonstration/src/v27-crypto-primitives.js` and `test/v27-crypto-primitives.test.js` demonstrate the minimum protocol witness.
- `protocol-demonstration/src/receipt-schemas.js` exposes V27 semantic-volume, mint, allocation, ancestry, revenue-route, BTC fee, ledger-anchor, rights-transfer, reconciliation, and upgrade receipt families.
- `supabase/migrations/002_v27_btd_crypto_registry.sql` defines the V27 registry/projection table set.
- `packages/orm/src/models/btd-registry.ts` gives commercial source a Bitcode-native ORM boundary for V27 tables until generated types refresh.
- `packages/orm/src/client.ts` now exposes `btdRegistry` on standard and admin ORM clients.
- `.bitcode/v27-crypto-primitives-proof.json` records the first V27 proof slice for package, demonstration, registry, and validation surfaces.
- `packages/btd/src/index.ts` exports `BTD_MAX_MINTABLE_SUPPLY = 21_000_000`.
- `packages/btd/src/index.ts` exports BTC fee-basis helpers.
- `packages/btd/src/index.ts` rejects fungible mutation through `BtdFungibleMutationRejectedError`.
- `packages/btd/__tests__/btd.test.ts` proves cap presence and overflow rejection.
- `packages/api/src/routes/user.ts` rejects generic `$BTD` balance mutation.
- `packages/api/src/routes/auxillaries.ts` rejects generic auxillary `$BTD` mutation.
- `uapi/tests/api/userBtdRoute.test.ts` proves API mutation rejection.
- `uapi/components/base/bitcode/btd/btd-tracker.tsx` separates BTC and `$BTD` in user balance posture and records Terminal V27 / Exchange V28 acquisition intent.
- `uapi/components/base/bitcode/btd/BTDPrices.tsx` distinguishes Terminal Need V27 from Exchange Preview V28.
- `uapi/app/auxillaries/components/AuxillariesBTDPane.tsx` displays BTC fee liquidity and non-fungible `$BTD` holdings separately.
- public marketing surfaces disclose BTC fee and non-fungible `$BTD` read-right posture.
- `protocol-demonstration/src/receipt-schemas.js` already has licensed read and allocation receipt families that V27 can extend.
- `protocol-demonstration/src/canonical/settlement.js` already has source-to-shares fit quality and settlement accounting primitives.
- V26 specification and proof surfaces mention wallet readiness, testnet/mainnet posture, telemetry, reconciliation, and ledger-facing future work that V27 now pulls into minimum closure.

Partial baseline:

- `packages/orm/src/models/user-btd-balances.ts` and `user-btd-transactions.ts` wrap compatibility tables `user_credits` and `user_credit_usages`.
- `packages/orm/src/models/organization-btd-treasury.ts` aggregates user holdings but does not own registry supply.
- `internal-docs/BITCODE_EXCHANGE_DATABASE.md` now names the V27 registry/projection table set, but deployment must still apply and prove it.
- `supabase/migrations/001_v26_production.sql` contains compatibility storage and RLS; `002_v27_btd_crypto_registry.sql` starts the V27 range/cell registry and crypto projection constraints.
- UI surfaces can now show holdings, intent, policy id/hash, and AssetPack range posture in the $BTD auxillary.
- auxillary wallet UI can display wallet posture; the V27 signer/session/transaction lifecycle exists in package primitives but is not wired to live adapters.
- BTC fee receipt and PSBT-style lifecycle primitives exist, but no broadcaster or confirmation reconciler is wired yet.
- demonstration settlement primitives can account for source-to-shares value and now witness V27 crypto receipts, but not external chain observations.
- V27 drafts previously left normalized Bitcode volume as an open scalar class; WDRR closes it as proof-addressable semantic volume while leaving exact measurement algorithm as implementation work.
- V27 drafts previously treated public testnet/signet generically; WDRR makes signet canonical for public Bitcoin proof and public testnet supplementary.
- V27 drafts previously treated Bitcoin and Ethereum anchor paths as peer candidates; WDRR makes Bitcoin primary and Ethereum secondary or optional.

Remaining gaps:

- no persisted/generated total V27 minted range proof family;
- no persisted/generated total V27 receipt replay proof family;
- no V27 token/range route;
- no write-committing route/API persistence path;
- no V27 generated proof appendix;
- no live wallet adapter over the V27 signer-session boundary;
- no Bitcoin transaction broadcaster/reconciler for fee payment;
- no Taproot or other Bitcoin AssetPack anchor path;
- no Ethereum AssetPack registry/event path;
- no testnet/mainnet deployment lane documentation for V27 crypto paths;
- no V27 external library and chain-standard research proof;
- no signet proof lane harness;
- no explicit Ethereum-secondary boundary in implementation code;

## Accepted Deferrals

The following are not V27 blockers unless a V27 invariant requires a minimal hook:

- full Exchange trading product beyond minimal rights transfer and buy/sell/bid/ask;
- high-volume order books or external markets;
- wrapper liquidity;
- value-bearing mainnet launch before operational approval;
- broad external interface propagation;
- complete Terminal product redesign beyond V27 transaction families;
- final legal templates for every future access policy class.

The following are V27 blockers:

- no actual BTC fee broadcaster/observer proof path;
- no live PSBT user signing adapter proof path;
- no ledgerized AssetPack anchor proof path;
- no proof-addressable semantic volume measurement proof;
- no minimal existing-`$BTD` acquisition or rights-transfer proof path;
- no Terminal journal diff proof;
- no ledger/database reconciliation proof;
- no testnet and mainnet-ready operational controls;
- no web-rebound crypto/library selection proof before normative dependency choices are finalized.

## Promotion Discipline

V27 may not be promoted by draft prose alone.

Promotion requires:

- complete spec family;
- implementation parity;
- tests;
- generated proof artifacts;
- generated proof appendix;
- no blocking parity rows;
- and deliberate `BITCODE_SPEC.txt` pointer update.
