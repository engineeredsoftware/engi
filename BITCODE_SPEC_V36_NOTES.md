# Bitcode Spec V36 Notes

## Status

- Version: `V36`
- V36 state: active draft target opened; Gate 1 turns prior future notes into the Exchange-depth working specification family
- Current canonical/latest target: `V35`
- Prior canonical anchor: `BITCODE_SPEC_V35.md`
- Prior generated proof appendix: `BITCODE_SPEC_V35_PROVEN.md`
- Generated structured artifact inventory: draft `.bitcode/v36-spec-family-report.json` and `.bitcode/v36-canonical-input-report.json`; Exchange artifacts begin after Gate 1
- Source parity state: V36 source parity begins with Gate 1 and remains draft until each Exchange gate closes
- Spec companion: `BITCODE_SPEC_V36.md`
- Delta companion: `BITCODE_SPEC_V36_DELTA.md`
- Parity companion: `BITCODE_SPEC_V36_PARITY_MATRIX.md`
- Generated proof appendix: `BITCODE_SPEC_V36_PROVEN.md` only after V36 promotion
- Scope: V36 notes for deeper Exchange work after promoted V35 telemetry/documenting depth

## Notes companion rule

This file records working notes for the V36 draft target.
Requirements become binding when copied into `BITCODE_SPEC_V36.md`, `BITCODE_SPEC_V36_DELTA.md`, `BITCODE_SPEC_V36_PARITY_MATRIX.md`, checker scripts, package contracts, tests, or generated artifacts.

## Concise current-system reading

V35 is active canon.
V36 opens Exchange depth without changing Reading, BTD tokenomics, BTC fee separation, deployment law, telemetry/documentation law, or source disclosure law.

Exchange must operate as a market surface over rights and source-safe previews.
It must not become a hidden tokenomics rewrite, a source leakage path, or a database-first settlement system.

## Simplified-spec reading rule

Read V36 as:

1. The active system is V35.
2. V36 adds auditable Exchange product behavior.
3. Exchange actions manipulate market intents, orders, rights-transfer previews, settlement receipts, dispute/repair cases, and revenue routes.
4. BTD range identity remains non-fungible source-share law.
5. Protected source remains hidden before paid settlement.
6. Ledger truth remains stronger than database projection.

## Exchange depth notes

- Market activity needs master-detail clarity: a collapsed row should be enough for status, while expanded detail must include proof roots, safe metadata, and repair posture.
- Buy/sell/bid/ask/cancel/accept/settle/history actions must be typed intents, not route-local ad hoc payloads.
- Pricing must be deterministic and auditable. Initial design uses measurement weight times measurement volume as a source factor, then folds liquidity, fee, and policy factors into a BTC quote root.
- Wrapper analysis is allowed only as analysis. A wrapper cannot become the chain-of-record for BTD ownership.
- Rights-transfer preview must clearly separate current owner, prospective buyer, BTD range identity, source-safe measurements, quote roots, settlement posture, and post-settlement delivery.
- Dispute and repair posture must exist before optimistic market UX is considered complete.

## V36 gate plan

1. Gate 1: V36 Exchange Roadmap And Spec Opening.
2. Gate 2: Exchange Activity Book And Market Master Detail.
3. Gate 3: Buy Sell Bid Ask Cancel Accept Intent Contracts.
4. Gate 4: AssetPack Range Trading And Rights Transfer Review.
5. Gate 5: Pricing Liquidity Fee Quote And Wrapper Analysis.
6. Gate 6: Exchange Settlement Ledger Database Reconciliation.
7. Gate 7: Dispute Repair Revenue Route Operations.
8. Gate 8: Exchange UX And Terminal Navigation Integration.
9. Gate 9: Local Staging Exchange Rehearsal And Proof Coverage.
10. Gate 10: V36 Promotion Readiness.

## Gate 1 working notes

Gate 1 closes when:

- V36 SPEC, DELTA, NOTES, and PARITY files exist;
- `BITCODE_SPEC.txt` remains `V35`;
- roadmap status marks V35 active and V36 draft;
- README, protocol package README, demonstration README, and PR template name V36 workflow;
- gate-quality and canon-quality workflows understand V36 draft posture;
- `check:v36-gate1` passes locally and in CI.

## Gate 2 closure notes

Gate 2 closes when `ExchangeActivityBook` is package-owned and generated
through `.bitcode/v36-exchange-activity-book.json`.
The generated artifact carries `source-safe-exchange-activity-book-metadata`,
listing/bid/ask/cancellation/acceptance/settlement/repair/revenue route/history
coverage, filter ids, detail sections, proof roots, event ids, source-safe
principal references, ledger/database projection references, and redaction
posture.
The activity detail never exposes protected source or unpaid AssetPack content;
it is a source-safe market row and detail contract for later Exchange UI and API
consumers.

## Accepted boundaries

- V36 owns deeper Exchange.
- V37 owns website Conversations.
- V36 does not authorize value-bearing production-mainnet launch.
- V36 does not redefine BTD supply, BTC fee separation, AssetPack range identity, owner-read/licensed-read law, measureminting, ancestry, or Reading pipeline product law.
- Exchange must not expose protected AssetPack source before settlement.
