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
| Hard supply cap | cap is exactly 21,000,000 | `packages/btd/src/constants.ts` exports `BTD_MAX_MINTABLE_SUPPLY = 21_000_000`; migration enforces `max_supply = 21000000` | partial | bind generated proof and route/UI invariants |
| Cap test | package test proves cap and overflow rejection | `packages/btd/__tests__/btd.test.ts` checks cap and overflow | implemented baseline | extend to full supply state and range allocator |
| BTC fee asset | BTC is fee asset, not `$BTD` | `BITCODE_FEE_ASSET = 'BTC'`, UI and docs state BTC pays fees | implemented baseline | preserve in all V27 copy and receipts |
| Non-fungible semantics | `$BTD` is non-fungible AssetPack share/read-right | `BTD_ASSET_SEMANTICS`, README, UI, FAQ, auxillaries copy state this | implemented baseline | make cell/range identity exact |
| Fungible mutation rejection | generic spend/balance mutation fails closed | package error, user API, auxillary API, and route tests reject mutation | implemented baseline | ensure every V27 mint path bypasses generic mutation |
| Aggregate holding read | users can read current holding posture | `getBtdBalance`, `readBtdHoldings`, user/auxillary APIs read compatibility storage | partial | replace aggregate read with registry-derived read |
| Compatibility storage | old `user_credits` names are storage carriers only | ORM wraps `user_credits` and `user_credit_usages`; docs call them compatibility carriers | partial blocking | add BTD registry schema and bound or migrate compatibility tables |
| Organization treasury | organization can aggregate holdings | `OrganizationBtdTreasuryModel` aggregates member `user_credits` balances | partial | treasury must read registry holdings and never mint |
| Organization usage | organization BTD usage model exists | `OrganizationBtdUsageModel` is placeholder | gap | define usage/revenue/read-license model or defer explicitly |
| AssetPack evidence | stored AssetPack evidence layer exists | `AssetPackEvidenceModel` wraps physical `deliverables` storage | partial | bind minted ranges to AssetPack evidence roots |
| Source-to-shares settlement | settlement fit-quality exists | `settlement.js` quantizes source-to-shares fit qualities and settlement accounting | partial | connect settlement output to V27 semantic-volume/range primitives |
| Normalized Bitcode volume | mint quantity uses proof-addressable semantic units | `packages/btd/src/semantic-volume.ts` and `protocol-demonstration/src/v27-crypto-primitives.js` implement semantic-volume receipts | partial blocking | integrate with source-to-shares settlement and generated proof artifacts |
| Measureminting decay | primary issuance decays against cumulative admitted measurement | `packages/btd/src/measuremint.ts` and demo witness implement hyperbolic fixed-supply measureminting | partial blocking | persist measuremint state/receipts and prove anti-fragmentation/ordering invariants |
| Receipt schemas | receipts exist for deposit, licensed bundle, allocation, settlement fit quality, V27 crypto primitives | `receipt-schemas.js` now has V27 semantic-volume, mint, allocation, ancestry, revenue-route, BTC fee, ledger anchor, rights-transfer, reconciliation, and upgrade receipt families | partial | add generated schema proof and persisted receipt coverage |
| Mint admission | only Need-Fit-Prove-Settle can mint | `packages/btd/src/range.ts` enforces accepted Need/Fit/root/policy inputs before range allocation | partial blocking | integrate package guard into Terminal/Exchange/protocol routes |
| Supply state | canonical state machine exists | `packages/btd/src/supply.ts` exists and tests cover cap/advance behavior through range allocation | partial | bind to DB singleton and proof replay |
| Range allocator | one AssetPack gets one contiguous range | `packages/btd/src/range.ts` allocates contiguous ranges; package tests cover range minting | partial | add DB insertion and generated no-overlap proof |
| Allocation algorithm | deterministic contributor allocation conserves token count | `packages/btd/src/allocation.ts` implements weighted Hare-Niemeyer allocation; package and demo tests prove conservation | partial blocking | integrate with source-to-shares settlement and generated proof artifacts |
| Mint receipt replay | receipts reconstruct supply and range state | `packages/btd/src/replay.ts` replays mint and measuremint receipts | partial blocking | add generated proof family and persisted receipt tests |
| Access policy | owner-read and licensed-read are distinct | `packages/btd/src/access.ts` evaluates owner-read/licensed-read/denied decisions by policy hash | partial blocking | integrate route/API behavior and UI disclosure |
| Legal rights disclosure | UI avoids overclaiming `$BTD` rights | FAQ says not fungible and V26 routes mature later | partial | add policy hash/range/legal-right disclosure |
| Revenue routing | licensed read routes to holders/ancestors/treasury | `packages/btd/src/revenue.ts` emits conserved BTC licensed-read revenue-route receipts | partial blocking | integrate with Exchange settlement, holdbacks, and persistence |
| Ancestry | late-bound, non-supply ancestry module | `packages/btd/src/ancestry.ts` reviews payable, unpaid, and rejected edges without changing supply | partial blocking | add loop/collusion graph tests and persisted proof |
| Anti-game | dedupe, disputes, loop/collusion checks | source-to-shares has dedupe/fit concepts; ancestry review rejects duplicates/self edges and keeps weak/citation edges unpaid | partial | add attack-specific graph, dispute, and fragmentation tests |
| Tail behavior | zero-cell receipts then refit-only tail | measuremint package/demo tests cover below-integer zero-cell receipt | partial blocking | integrate zero-cell receipts into settlement/revenue/refit flows |
| Exchange DB docs | DB target names BTD registry tables | `internal-docs/BITCODE_EXCHANGE_DATABASE.md` documents V27 registry/projection tables | partial | keep synchronized with migration and ORM |
| SQL migration | DB constraints for supply/range/cells/crypto receipts | `supabase/migrations/002_v27_btd_crypto_registry.sql` adds V27 registry, allocation, ancestry, revenue, upgrade, and crypto projection tables | partial blocking | apply/test migration and refresh generated DB types |
| ORM models | Bitcode-native BTD registry models | `packages/orm/src/models/btd-registry.ts` exposes the V27 registry/allocation/revenue/upgrade boundary | partial blocking | replace raw V27 table boundary with generated types after DB codegen |
| UAPI balance widget | top-right balance distinguishes BTC and `$BTD` | `btd-tracker.tsx` shows BTC and `$BTD`; acquisition intent stores V27/V28 paths | implemented baseline | later read registry/range data |
| UAPI acquisition card | Terminal Need and Exchange minimal acquisition split | `BTDPrices.tsx` labels Terminal Need V27 and Exchange Preview V28 | partial | route Terminal intent and minimal Exchange acquisition to V27 lifecycle; leave market depth V28+ |
| Auxillary BTD pane | wallet and holdings are readable | `AuxillariesBTDPane.tsx` shows BTC fee liquidity, holdings, wallet posture | implemented baseline | add range/policy/supply details |
| Public copy | BTC/$BTD distinction visible | marketing metrics, CTA, and FAQ state BTC pays fees and `$BTD` is non-fungible read-right | implemented baseline | add V27 exact range/access language after implementation |
| Token/range route | route shows range, policy, and rights | no active `uapi/app/[token]/page.tsx` found in current tree | gap | add route or successor under V27/V28 plan |
| MCP holding gate | MCP can require BTD holding | MCP auth middleware checks `minimumBtdHolding` against aggregate balance | partial | switch to registry-derived holding/read-right checks |
| Proof generator | V26 generator knows cap evidence | `proven-generator.js` references `BTD_MAX_MINTABLE_SUPPLY = 21_000_000` | partial | add V27 proof families |
| Wallet signer session | user wallet authorizes crypto operations | `packages/btd/src/wallet.ts` implements signer session/capability guards; no live wallet adapter yet | partial blocking | wire into UI/API wallet adapters and route tests |
| PSBT fee transaction | BTC fees are actual user-signed transactions | `packages/btd/src/bitcoin-fees.ts` implements PSBT-style receipt lifecycle; `bitcoin-provider.ts` adds a network-checked provider boundary | partial blocking | add live wallet adapter, regtest/signet broadcaster, and provider reconciliation |
| Fee asset separation | `$BTD` cannot pay fees | package/API reject fungible mutation; UI states BTC fee asset | implemented baseline | prove BTC receipts cannot mint or spend `$BTD` directly |
| Bitcoin ledger anchor | AssetPack can anchor on selected Bitcoin commitment path | `packages/btd/src/ledger-anchor.ts` implements anchor receipt state machine; commitment method still unselected | partial blocking | select method and add regtest/signet adapter proof |
| Ethereum ledger anchor | Ethereum is secondary or optional registry/event anchor | no V27 Ethereum registry/event module found | gap | implement bounded secondary path or explicitly mark not ready |
| AssetPack ledger anchor receipt | anchor binds range, roots, policy, and finality | package and demonstration now include ledger anchor receipts | partial blocking | add persisted replay and chain adapter proof |
| Minimal Exchange orders | buy/sell/bid/ask/cancel/accept/settle exist | `packages/btd/src/exchange.ts` implements order and settlement receipt primitives | partial blocking | integrate with Exchange route/database writes |
| Rights transfer | `$BTD` range rights can transfer after settlement | `buildAssetPackRightsTransferReceipt` emits BTC-priced rights-transfer receipt | partial blocking | add policy/ownership DB enforcement and UI/API integration |
| Terminal transaction journal | Terminal actions produce replayable transaction journal entries | `packages/btd/src/terminal-journal.ts` implements journal entries and projection diffing | partial blocking | wire Terminal flows and persisted journal writes |
| Ledgerized journal diff | journal, ledger, DB, proof, and telemetry can be compared | package tests cover blocking projection drift | partial blocking | add full proof-harness over persisted rows |
| Ledger/database reconciliation | DB is ledger-derived plus metaphysical canonical store | `packages/btd/src/reconciliation.ts` emits projection repair reports | partial blocking | connect to ledger observers and database repairs |
| Signet proof lane | public Bitcoin proof prefers signet | package constants and demo enforce signet posture; no signet harness found | partial blocking | document and implement signet proof lane; keep public testnet supplementary |
| Mainnet-ready lane | mainnet controls exist without automatic launch | `packages/btd/src/deployment-lanes.ts` models local/regtest/signet/testnet/mainnet-ready/value-bearing lanes and approval roots | partial blocking | document env, key, fee, rollback, approval, and telemetry controls |
| Crypto telemetry | wallet/chain/reconciler failures are observable | `packages/btd/src/telemetry.ts` defines V27 crypto event taxonomy and severity | partial blocking | connect telemetry sinks and alert proof |
| Upgrade receipts | ledgerized migrations/upgrades are versioned | `packages/btd/src/upgrade.ts`, migration table, ORM boundary, and demo schema model planned/applied/verified/rolled-back/failed upgrade receipts | partial blocking | wire deployment lanes, alert sinks, and generated upgrade proof |
| Library selection proof | external crypto dependencies are researched and rebound | V27 notes require rebinding, no primary-source research proof exists | gap blocking | create web research agenda and bind final choices before promotion |
| Marketplace royalty posture | recurring economics are local Exchange settlement, not third-party royalty signaling | `packages/btd/src/revenue.ts` and rights-transfer receipts route BTC locally; no third-party royalty dependency is introduced | partial blocking | wire route/API persistence and negative marketplace-bypass proof |
| Threat model | knowledge-market distortion and crypto-finality failures are specified | WDRR threat table is digested into SPEC/NOTES; no proof harness found | partial blocking | map threats to tests, telemetry, repair receipts, and negative proofs |
| Demonstration state | draft target points to V27 files | `protocol-demonstration/data/state.json` lists draft V27 paths | implemented baseline | ensure files now exist and tests stay green |
| Crypto primitive proof slice | first V27 package/demo/db proof artifact exists | `.bitcode/v27-crypto-primitives-proof.json` records source surfaces and focused validation commands | partial blocking | expand into generated V27 proof family set |
| Generated proof appendix | V27 PROVEN generated | no `BITCODE_SPEC_V27_PROVEN.md` | gap blocking | generate only after source proof closure |

## Gate Closure Matrix

| Gate | Current status | Blocking rows |
| --- | --- | --- |
| Gate 1: Draft Opening And Source Audit | open, materially started | SPEC/DELTA/PARITY need review and ongoing synchronization |
| Gate 2: Ontology And Hard Cap | partially implemented | generated proof/UI cap invariants missing |
| Gate 3: Supply And Range Primitives | package implementation started | DB/proof integration missing |
| Gate 4: Need-Fit Mint Admission | package guard started | route/protocol integration and persisted negative tests missing |
| Gate 5: Receipt And Replay | receipt implementation started | generated replay proof missing |
| Gate 6: Exchange Persistence | migration and ORM boundary started | migration execution/codegen and persistence tests missing |
| Gate 7: Access And Policy | package evaluator started | route behavior, policy hash UI, and persisted license checks missing |
| Gate 8: Allocation And Revenue | package implementation started | settlement integration, holdbacks, route/API persistence, and generated proof missing |
| Gate 9: Ancestry And Anti-Game | package implementation started | graph-level loop/collusion/dispute tests and persisted proof missing |
| Gate 10: Wallet And BTC Fee Settlement | package and provider boundary implementation started | live wallet adapter, broadcaster, and signet proof missing |
| Gate 11: Ledgerized AssetPack Anchoring | package implementation started | selected Bitcoin anchor adapter and signet proof missing |
| Gate 12: Minimal AssetPack Exchange | package implementation started | Exchange route/database integration missing |
| Gate 13: Terminal Transactions And Journal Diffing | package implementation started | Terminal flow integration and persisted proof missing |
| Gate 14: Ledger/Database Reconciliation | package implementation started | ledger observer/database repair integration missing |
| Gate 15: Testnet/Mainnet Telemetry And Upgrades | telemetry, deployment-lane, and upgrade receipt primitives started | env docs, alert sinks, mainnet operational runbook, and generated proof missing |
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

Completed implementation seeds:

- `packages/btd/src/constants.ts`
- `packages/btd/src/supply.ts`
- `packages/btd/src/range.ts`
- `packages/btd/src/semantic-volume.ts`
- `packages/btd/src/receipts.ts`
- `packages/btd/src/measuremint.ts`
- `packages/btd/src/access.ts`
- `packages/btd/src/allocation.ts`
- `packages/btd/src/ancestry.ts`
- `packages/btd/src/revenue.ts`
- `packages/btd/src/wallet.ts`
- `packages/btd/src/bitcoin-fees.ts`
- `packages/btd/src/bitcoin-provider.ts`
- `packages/btd/src/deployment-lanes.ts`
- `packages/btd/src/ledger-anchor.ts`
- `packages/btd/src/exchange.ts`
- `packages/btd/src/terminal-journal.ts`
- `packages/btd/src/reconciliation.ts`
- `packages/btd/src/replay.ts`
- `packages/btd/src/telemetry.ts`
- `packages/btd/src/upgrade.ts`
- `packages/btd/__tests__/v27-crypto-primitives.test.ts`
- `protocol-demonstration/src/v27-crypto-primitives.js`
- `protocol-demonstration/test/v27-crypto-primitives.test.js`
- `supabase/migrations/002_v27_btd_crypto_registry.sql`
- `packages/orm/src/models/btd-registry.ts`
- `.bitcode/v27-crypto-primitives-proof.json`

Remaining queue:

1. Add full replay module and generated V27 proof families.
2. Integrate semantic-volume/range/mint admission into source-to-shares settlement.
3. Apply/test V27 migration and refresh generated Supabase types.
4. Add DB persistence tests for V27 registry rows and constraints.
5. Add range/policy UI disclosure and route/API license checks.
6. Add live wallet adapter and PSBT provider boundary.
7. Add regtest and signet broadcaster/observer harnesses.
8. Select Bitcoin commitment method for AssetPack anchors.
9. Wire minimal Exchange routes/database writes to order, rights-transfer, allocation, and revenue primitives.
10. Wire Terminal transaction flows to journal entries and diff checks.
11. Connect ledger observer to reconciliation repair writes.
12. Connect crypto telemetry taxonomy to production alert sinks.
13. Add deployment lanes, mainnet operational controls, and upgrade receipt wiring.
14. Complete graph-level ancestry attack tests and dispute holdback persistence.
15. Complete web research rebinding for selected crypto standards and libraries.

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
