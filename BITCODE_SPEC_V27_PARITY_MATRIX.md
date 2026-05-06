# Bitcode Spec V27 Parity Matrix

## Status

- Version: `V27`
- State: draft parity matrix, not promoted
- Active canonical pointer: `BITCODE_SPEC.txt` -> `V26`
- Scope: source-to-spec parity for V27 `$BTD` tokenomics and practical crypto-application closure
- Spec companion: `BITCODE_SPEC_V27.md`
- Notes companion: `BITCODE_SPEC_V27_NOTES.md`
- Delta companion: `BITCODE_SPEC_V27_DELTA.md`
- Generated proof appendix: not generated yet

This matrix records the initial V27 source audit.
It intentionally separates V26-implemented baseline from V27 tokenomics and crypto-application gaps.

## Audit Basis

Fresh audit inputs:

- `BITCODE_SPEC.txt`
- `BITCODE_SPECIFYING.md`
- `BITCODE_SPEC_V26.md`
- `BITCODE_SPEC_V26_DELTA.md`
- `BITCODE_SPEC_V26_NOTES.md`
- `BITCODE_SPEC_V26_PARITY_MATRIX.md`
- `BITCODE_SPEC_V27.md`
- `BITCODE_SPEC_V27_DELTA.md`
- `BITCODE_SPEC_V27_NOTES.md`
- `BITCODE_SPEC_V27_PARITY_MATRIX.md`
- `protocol-demonstration/V26_APPLICATION_SYSTEMS.md`
- `protocol-demonstration/V26_PROOF_SURFACES.md`
- `packages/btd/src/index.ts`
- `packages/btd/README.md`
- `packages/btd/__tests__/btd.test.ts`
- `packages/api/src/routes/user.ts`
- `packages/api/src/routes/auxillaries.ts`
- `uapi/tests/api/userBtdRoute.test.ts`
- `packages/orm/src/models/user-btd-balances.ts`
- `packages/orm/src/models/user-btd-transactions.ts`
- `packages/orm/src/models/organization-btd-treasury.ts`
- `packages/orm/src/models/organization-btd-usage.ts`
- `packages/orm/src/models/asset-pack-evidence.ts`
- `packages/supabase/src/asset-pack-evidence.ts`
- `supabase/migrations/001_v26_production.sql`
- `internal-docs/BITCODE_EXCHANGE_DATABASE.md`
- `protocol-demonstration/src/receipt-schemas.js`
- `protocol-demonstration/src/canonical/settlement.js`
- `protocol-demonstration/src/settlement-structs.js`
- `protocol-demonstration/src/canon-posture.js`
- `protocol-demonstration/data/state.json`
- `protocol-demonstration/src/canonical/proven-generator.js`
- `uapi/components/base/bitcode/btd/btd-tracker.tsx`
- `uapi/components/base/bitcode/btd/BTDPrices.tsx`
- `uapi/app/auxillaries/components/AuxillariesBTDPane.tsx`
- `uapi/app/(root)/components/MarketingBtdShareMetricsSection.tsx`
- `uapi/app/(root)/components/MarketingCtaContactSection.tsx`
- `uapi/app/(root)/components/MarketingFaqSection.tsx`
- `packages/executions-mcp/src/mcp-server/ARCHITECTURE.md`
- `packages/executions-mcp/src/mcp-server/src/auth/middleware.ts`

No `_legacy/` source was used as active source truth.

Audit query classes:

- active canonical pointer and current spec family discovery;
- V26 commercial canon, delta, notes, parity, application systems, and proof surfaces;
- V27 draft spec family discovery and synchronization;
- `$BTD`, BTC fee, non-fungible, range, supply, mint, access, revenue, ancestry, and compatibility-storage searches;
- wallet, ledger, Bitcoin, Taproot, Ethereum, testnet, mainnet, telemetry, reconciliation, Exchange, Terminal, order, bid, ask, buy, sell, transfer, and journal searches;
- WDRR findings for semantic volume, PSBT fee signing, signet proof lanes, Ethereum-secondary posture, optional canonical ancestry, and marketplace royalty fragility;
- package source discovery under `packages/btd`, `packages/api`, `packages/orm`, `packages/supabase`, `packages/executions-mcp`;
- commercial interface discovery under `uapi`;
- protocol reference discovery under `protocol-demonstration`;
- database/migration discovery under `supabase` and `internal-docs`.

## Judgment Legend

- `implemented baseline`: present from V26 and suitable as a V27 starting point.
- `partial`: present but not complete enough for V27 closure.
- `gap`: absent or insufficient for V27.
- `deferred`: intentionally later-version work.
- `blocking`: must close before V27 promotion.

## V27 Source Parity Matrix

| Area | V27 expectation | Current source truth | Judgment | Required closure |
| --- | --- | --- | --- | --- |
| Active pointer discipline | V26 remains active while V27 drafts | `BITCODE_SPEC.txt` contains `V26` | implemented baseline | do not update pointer until promotion |
| V27 notes | future tokenomics note exists | `BITCODE_SPEC_V27_NOTES.md` exists and marks itself non-canonical | implemented baseline | keep synchronized as SPEC/DELTA/PARITY evolve |
| V27 SPEC | complete draft spec exists | `BITCODE_SPEC_V27.md` now opens draft | partial | broaden as source implementation lands |
| V27 DELTA | version-local delta exists | `BITCODE_SPEC_V27_DELTA.md` now opens draft | partial | keep gate status current |
| V27 PARITY | audited source parity exists | this file records initial audit | partial | convert gaps to proof-backed closure rows |
| Hard supply cap | cap is exactly 21,000,000 | `packages/btd/src/index.ts` exports `BTD_MAX_MINTABLE_SUPPLY = 21_000_000` | implemented baseline | move into constants module and DB/receipt/proof invariants |
| Cap test | package test proves cap and overflow rejection | `packages/btd/__tests__/btd.test.ts` checks cap and overflow | implemented baseline | extend to full supply state and range allocator |
| BTC fee asset | BTC is fee asset, not `$BTD` | `BITCODE_FEE_ASSET = 'BTC'`, UI and docs state BTC pays fees | implemented baseline | preserve in all V27 copy and receipts |
| Non-fungible semantics | `$BTD` is non-fungible AssetPack share/read-right | `BTD_ASSET_SEMANTICS`, README, UI, FAQ, auxillaries copy state this | implemented baseline | make cell/range identity exact |
| Fungible mutation rejection | generic spend/balance mutation fails closed | package error, user API, auxillary API, and route tests reject mutation | implemented baseline | ensure every V27 mint path bypasses generic mutation |
| Aggregate holding read | users can read current holding posture | `getBtdBalance`, `readBtdHoldings`, user/auxillary APIs read compatibility storage | partial | replace aggregate read with registry-derived read |
| Compatibility storage | old `user_credits` names are storage carriers only | ORM wraps `user_credits` and `user_credit_usages`; docs call them compatibility carriers | partial blocking | add BTD registry schema and bound or migrate compatibility tables |
| Organization treasury | organization can aggregate holdings | `OrganizationBtdTreasuryModel` aggregates member `user_credits` balances | partial | treasury must read registry holdings and never mint |
| Organization usage | organization BTD usage model exists | `OrganizationBtdUsageModel` is placeholder | gap | define usage/revenue/read-license model or defer explicitly |
| AssetPack evidence | stored AssetPack evidence layer exists | `AssetPackEvidenceModel` wraps physical `deliverables` storage | partial | bind minted ranges to AssetPack evidence roots |
| Source-to-shares settlement | settlement fit-quality exists | `settlement.js` quantizes source-to-shares fit qualities and settlement accounting | partial | add token count/allocation/range output |
| Normalized Bitcode volume | mint quantity uses proof-addressable semantic units | V27 draft now closes scalar class from WDRR; no implementation algorithm found | gap blocking | add semantic unit measurement receipts, dedupe binding, and replay tests |
| Receipt schemas | receipts exist for deposit, licensed bundle, allocation, settlement fit quality | `receipt-schemas.js` has `bundle_issuance`, `allocation`, and fit-quality receipt families | partial | add `btd.asset_pack_mint`, access, ancestry, revenue-route receipts |
| Mint admission | only Need-Fit-Prove-Settle can mint | currently specified in notes, not implemented | gap blocking | implement package + protocol admission guard and tests |
| Supply state | canonical state machine exists | no dedicated supply module | gap blocking | add `packages/btd/src/supply.ts` |
| Range allocator | one AssetPack gets one contiguous range | no range allocator | gap blocking | add `packages/btd/src/range.ts` and tests |
| Allocation algorithm | deterministic contributor allocation conserves token count | source-to-shares settlement exists, no BTD cell allocation | gap blocking | add `packages/btd/src/allocation.ts` and proof tests |
| Mint receipt replay | receipts reconstruct supply and range state | no BTD mint receipt/replay | gap blocking | add receipts/replay module and proof family |
| Access policy | owner-read and licensed-read are distinct | UI copy mentions read-right; receipt schema has licensed bundle receipt | partial blocking | add access policy types/evaluator and route/API behavior |
| Legal rights disclosure | UI avoids overclaiming `$BTD` rights | FAQ says not fungible and V26 routes mature later | partial | add policy hash/range/legal-right disclosure |
| Revenue routing | licensed read routes to holders/ancestors/treasury | no V27 routing module | gap | implement settlement route/receipt or defer paid ancestry |
| Ancestry | late-bound, non-supply ancestry module | notes specify; no module | gap | add schema/tests; keep unpaid until mitigations pass |
| Anti-game | dedupe, disputes, loop/collusion checks | source-to-shares has dedupe/fit concepts, no BTD anti-game module | partial | add attack-specific tests |
| Post-cap exhaustion | refit-only after cap | notes/spec only | gap | implement state and tests |
| Exchange DB docs | DB target names BTD registry tables | internal DB doc mentions holding reads but not V27 registry tables | partial blocking | update DB doc and migration |
| SQL migration | DB constraints for supply/range/cells | only V26 compatibility `user_credits` storage exists | gap blocking | add V27 migration |
| ORM models | Bitcode-native BTD registry models | only compatibility balance/transaction/treasury models exist | gap blocking | add supply/range/cell/receipt/license/revenue models |
| UAPI balance widget | top-right balance distinguishes BTC and `$BTD` | `btd-tracker.tsx` shows BTC and `$BTD`; acquisition intent stores V27/V28 paths | implemented baseline | later read registry/range data |
| UAPI acquisition card | Terminal Need and Exchange minimal acquisition split | `BTDPrices.tsx` labels Terminal Need V27 and Exchange Preview V28 | partial | route Terminal intent and minimal Exchange acquisition to V27 lifecycle; leave market depth V28+ |
| Auxillary BTD pane | wallet and holdings are readable | `AuxillariesBTDPane.tsx` shows BTC fee liquidity, holdings, wallet posture | implemented baseline | add range/policy/supply details |
| Public copy | BTC/$BTD distinction visible | marketing metrics, CTA, and FAQ state BTC pays fees and `$BTD` is non-fungible read-right | implemented baseline | add V27 exact range/access language after implementation |
| Token/range route | route shows range, policy, and rights | no active `uapi/app/[token]/page.tsx` found in current tree | gap | add route or successor under V27/V28 plan |
| MCP holding gate | MCP can require BTD holding | MCP auth middleware checks `minimumBtdHolding` against aggregate balance | partial | switch to registry-derived holding/read-right checks |
| Proof generator | V26 generator knows cap evidence | `proven-generator.js` references `BTD_MAX_MINTABLE_SUPPLY = 21_000_000` | partial | add V27 proof families |
| Wallet signer session | user wallet authorizes crypto operations | auxillary UI shows wallet posture, but no canonical V27 signer/session lifecycle | gap blocking | add wallet identity, network, signer session, and fail-closed tests |
| PSBT fee transaction | BTC fees are actual user-signed transactions | package has BTC fee basis helpers, no PSBT construction/sign/broadcast/confirm receipt | gap blocking | add PSBT-style receipt lifecycle and regtest plus signet proof |
| Fee asset separation | `$BTD` cannot pay fees | package/API reject fungible mutation; UI states BTC fee asset | implemented baseline | prove BTC receipts cannot mint or spend `$BTD` directly |
| Bitcoin ledger anchor | AssetPack can anchor on selected Bitcoin commitment path | no V27 anchor module found | gap blocking | select Taproot, OP_RETURN, or standard Bitcoin commitment path and implement regtest/signet proof |
| Ethereum ledger anchor | Ethereum is secondary or optional registry/event anchor | no V27 Ethereum registry/event module found | gap | implement bounded secondary path or explicitly mark not ready |
| AssetPack ledger anchor receipt | anchor binds range, roots, policy, and finality | no `AssetPackLedgerAnchor` receipt family found | gap blocking | add schema, replay, and finality-state tests |
| Minimal Exchange orders | buy/sell/bid/ask/cancel/accept/settle exist | current Exchange route work exposes activity UI, no canonical V27 order model found | gap blocking | add order model, receipts, and replay proof |
| Rights transfer | `$BTD` range rights can transfer after settlement | no rights-transfer receipt/path found | gap blocking | add ownership/license transfer receipt and policy guard |
| Terminal transaction journal | Terminal actions produce replayable transaction journal entries | V26 systems mention transaction posture, no V27 journal-diff module found | gap blocking | add Terminal transaction families and journal root model |
| Ledgerized journal diff | journal, ledger, DB, proof, and telemetry can be compared | no diff module found | gap blocking | implement or proof-harness drift detection |
| Ledger/database reconciliation | DB is ledger-derived plus metaphysical canonical store | V26 DB docs exist; no V27 reconciler found | gap blocking | add reconciliation model, projection repair receipts, and tests |
| Signet proof lane | public Bitcoin proof prefers signet | no V27 signet harness found | gap blocking | document and implement signet proof lane; keep public testnet supplementary |
| Mainnet-ready lane | mainnet controls exist without automatic launch | V26 notes mention future mainnet posture; no V27 controls found | gap blocking | document env, key, fee, rollback, approval, and telemetry controls |
| Crypto telemetry | wallet/chain/reconciler failures are observable | V26 telemetry posture exists generally, no V27 crypto taxonomy found | gap blocking | add telemetry event taxonomy and alert proof |
| Upgrade receipts | ledgerized migrations/upgrades are versioned | no V27 upgrade receipt family found | gap | add migration/upgrade receipt and rollback posture |
| Library selection proof | external crypto dependencies are researched and rebound | V27 notes require rebinding, no primary-source research proof exists | gap blocking | create web research agenda and bind final choices before promotion |
| Marketplace royalty posture | recurring economics are local Exchange settlement, not third-party royalty signaling | V27 notes/spec state licensed-read routing; no enforcement module found | partial blocking | prove licensed-read and rights-transfer receipts route locally |
| Threat model | knowledge-market distortion and crypto-finality failures are specified | WDRR threat table is digested into SPEC/NOTES; no proof harness found | partial blocking | map threats to tests, telemetry, repair receipts, and negative proofs |
| Demonstration state | draft target points to V27 files | `protocol-demonstration/data/state.json` lists draft V27 paths | implemented baseline | ensure files now exist and tests stay green |
| Generated proof appendix | V27 PROVEN generated | no `BITCODE_SPEC_V27_PROVEN.md` | gap blocking | generate only after source proof closure |

## Gate Closure Matrix

| Gate | Current status | Blocking rows |
| --- | --- | --- |
| Gate 1: Draft Opening And Source Audit | open, materially started | SPEC/DELTA/PARITY need review and ongoing synchronization |
| Gate 2: Ontology And Hard Cap | partially satisfied by V26 package and tests | DB/receipt/proof/UI cap invariants missing |
| Gate 3: Supply And Range Primitives | not started | supply/range modules and tests missing |
| Gate 4: Need-Fit Mint Admission | not started | admission guard, route/protocol integration, negative tests missing |
| Gate 5: Receipt And Replay | not started | mint receipt and replay proof missing |
| Gate 6: Exchange Persistence | not started | registry migration, ORM, constraints missing |
| Gate 7: Access And Policy | partially specified only | evaluator, route behavior, policy hash UI missing |
| Gate 8: Allocation And Revenue | not started | allocation module and revenue receipts missing |
| Gate 9: Ancestry And Anti-Game | specified only | ancestry module and attack tests missing |
| Gate 10: Wallet And BTC Fee Settlement | not started | wallet signer/session and PSBT fee transaction proof missing |
| Gate 11: Ledgerized AssetPack Anchoring | not started | selected Bitcoin anchor path and Ethereum-secondary boundary missing |
| Gate 12: Minimal AssetPack Exchange | not started | order model, rights transfer, and settlement replay missing |
| Gate 13: Terminal Transactions And Journal Diffing | not started | transaction journal and drift detection missing |
| Gate 14: Ledger/Database Reconciliation | not started | reconciler, projection repair, and metaphysical fact boundaries missing |
| Gate 15: Testnet/Mainnet Telemetry And Upgrades | not started | deployment lanes, telemetry taxonomy, mainnet controls, upgrade receipts missing |
| Gate 16: Product Surfaces, Research Rebinding, And Promotion Proof | not started | web-rebound choices, V27 generated proofs, and promotion checks missing |

## Initial Source Map

| Surface | Current V27 relevance |
| --- | --- |
| `packages/btd/src/index.ts` | cap, semantics, BTC fee basis, measured amount, mutation rejection |
| `packages/btd/__tests__/btd.test.ts` | cap and mutation baseline tests |
| `packages/btd/README.md` | package human contract |
| `packages/api/src/routes/user.ts` | generic `$BTD` mutation rejection and acquisition paths |
| `packages/api/src/routes/auxillaries.ts` | auxillary mutation rejection and acquisition paths |
| `packages/orm/src/models/user-btd-balances.ts` | compatibility holding reads |
| `packages/orm/src/models/user-btd-transactions.ts` | compatibility holding history |
| `packages/orm/src/models/organization-btd-treasury.ts` | aggregate treasury read |
| `packages/orm/src/models/organization-btd-usage.ts` | placeholder usage owner |
| `packages/orm/src/models/asset-pack-evidence.ts` | AssetPack evidence storage-edge translation |
| `supabase/migrations/001_v26_production.sql` | V26 compatibility tables and RLS |
| `internal-docs/BITCODE_EXCHANGE_DATABASE.md` | Exchange DB note that needs V27 registry expansion |
| `protocol-demonstration/src/receipt-schemas.js` | current receipt family to extend |
| `protocol-demonstration/src/canonical/settlement.js` | current source-to-shares fit and settlement primitive |
| `protocol-demonstration/src/settlement-structs.js` | settlement participation structures |
| `uapi/components/base/bitcode/btd/btd-tracker.tsx` | balance/acquisition intent widget |
| `uapi/components/base/bitcode/btd/BTDPrices.tsx` | Terminal V27 / Exchange V28 acquisition split |
| `uapi/app/auxillaries/components/AuxillariesBTDPane.tsx` | auxillary wallet and holding posture |
| `uapi/app/(root)/components/MarketingBtdShareMetricsSection.tsx` | public 21M/read-right explanation |
| `uapi/app/(root)/components/MarketingFaqSection.tsx` | public BTC vs `$BTD` distinction |
| `packages/executions-mcp/src/mcp-server/src/auth/middleware.ts` | aggregate holding gate for MCP authorization |
| future wallet integration module | V27 signer/session/network owner |
| future Bitcoin transaction module | V27 BTC fee payment, broadcast, and confirmation owner |
| future ledger anchor module | V27 AssetPack Bitcoin/Ethereum/internal anchor owner |
| future Exchange order module | V27 buy/sell/bid/ask and rights-transfer owner |
| future Terminal journal module | V27 transaction journal and diff owner |
| future reconciliation module | V27 ledger/database projection owner |
| future telemetry module | V27 crypto event taxonomy and alert owner |

## Immediate Implementation Queue

1. Extract `BTD_MAX_MINTABLE_SUPPLY` and semantics into `packages/btd/src/constants.ts`.
2. Add `packages/btd/src/supply.ts` with strict supply-state checks.
3. Add `packages/btd/src/range.ts` with contiguous AssetPack range allocation.
4. Add proof-addressable semantic volume measurement and receipts.
5. Add `packages/btd/src/receipts.ts` and `replay.ts`.
6. Extend `protocol-demonstration/src/receipt-schemas.js` with `btd.asset_pack_mint`.
7. Add V27 demonstration tests for range mint, cap, admission, and replay.
8. Draft V27 Exchange registry migration.
9. Add ORM models for registry tables.
10. Add access policy evaluator.
11. Add range/policy UI disclosure.
12. Add wallet signer/session/network model.
13. Add PSBT-style BTC fee transaction receipt and regtest/signet proof.
14. Add AssetPack ledger anchor schema and selected Bitcoin commitment path.
15. Add minimal Exchange order and rights-transfer model.
16. Add Terminal transaction journal and ledgerized diff proof.
17. Add ledger/database reconciler and projection repair receipts.
18. Add crypto telemetry taxonomy, deployment lanes, and upgrade receipts.
19. Complete web research rebinding for selected crypto standards and libraries.

## Promotion Risk

The highest-risk V27 gap is not the cap.
The cap already exists.

The highest-risk gaps are:

- defining normalized Bitcode volume precisely enough to drive mint count;
- proving semantic-volume measurement resists byte/tokenizer/fragmentation inflation;
- moving from aggregate compatibility balances to registry cell/range state;
- proving actual BTC fee transactions and ledgerized AssetPack anchors;
- choosing Bitcoin anchoring method and crypto libraries from current primary-source research;
- reconciling external ledger finality with Bitcode database and private canonical facts;
- proving minimal Exchange transfers without reintroducing fungible `$BTD` balance semantics;
- avoiding legal overclaim in read-right UI;
- proving allocation conservation;
- keeping ancestry useful without creating rent-seeking by age or broad claims.
