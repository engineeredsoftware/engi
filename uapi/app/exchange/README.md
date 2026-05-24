# Bitcode Exchange

`app/exchange/` owns the commercial Exchange route.

The Exchange MVP is a master-detail activity surface:

- master: searchable, filterable activity table across market activity and own activity;
- detail: selected activity facts, payload, AssetPack evidence, proof posture, history, and range/rights context;
- intent entry: BTD acquisition and range-review links land at the top of Exchange without forcing an activity detail selection.

V36 Gate 2 makes `ExchangeActivityBook` the package-owned contract behind this
surface. The generated `.bitcode/v36-exchange-activity-book.json` artifact
defines listing, bid, ask, cancellation, acceptance, settlement, repair, revenue
route, and history rows with source-safe filters, detail sections, proof roots,
event ids, redaction posture, and ledger/database projection references.
The activity detail never exposes protected source or unpaid AssetPack content.

V36 Gate 3 makes `ExchangeIntent` and `ExchangeOrder` the package-owned
contracts behind market action and order transition state. The generated
`.bitcode/v36-exchange-intent-order-contracts.json` artifact defines buy, sell,
bid, ask, cancel, accept, settle, and history transitions with actor principals,
organization roles, wallet posture, authority proofs, idempotency keys, policy
decisions, fail-closed results, proof roots, event ids, ledger journal refs, and
database projection refs. The order history is replayable without private
wallet material or secrets, and the Exchange UI may only render source-safe
intent/order metadata before settlement and rights transfer.

V36 Gate 4 makes `ExchangeRightsTransferPreview` the package-owned contract
behind AssetPack range trading and rights-transfer review. The generated
`.bitcode/v36-exchange-rights-transfer-review.json` artifact names BTD range
identity, current owner, requested buyer, rights scope, settlement unlock
condition, disclosure limit, source visibility, proof roots, event ids,
ledger/database projection refs, and fail-closed conditions. It distinguishes
owner-read, licensed-read, and blocked transfer states. AssetPack source is
hidden until paid settlement and rights transfer are complete.

Terminal stays focused on Deposit, Read, and recent operator activity.
Exchange owns market-wide activity reread, selection, and deeper state inspection.
