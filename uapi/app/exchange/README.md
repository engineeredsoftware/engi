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

Terminal stays focused on Deposit, Read, and recent operator activity.
Exchange owns market-wide activity reread, selection, and deeper state inspection.
