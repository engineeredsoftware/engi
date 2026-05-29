# Bitcode Spec V43 Notes

## Status

- Version: `V43`
- V43 state: draft notes opened for product-route cleanup, pack activity, agentic deposit options, and enterprise UX
- Current canonical/latest target: `V42`
- Prior canonical anchor: `BITCODE_SPEC_V42.md`
- Prior generated proof appendix: `BITCODE_SPEC_V42_PROVEN.md`
- Generated structured artifact inventory: `.bitcode/v43-spec-family-report.json`, `.bitcode/v43-canonical-input-report.json`, and future V43 gate artifacts
- Source parity state: notes define operating memory for V43 gates; implementation parity is pending gate work

## Notes companion rule

These notes clarify V43 only. The active canon remains V42 until V43 promotion.

## Concise current-system reading

V42 made the reliable MVP path real enough to refine product shape. V43 should now remove transitional vocabulary and make the primary enterprise experience:

- `/deposit`: connect source, synthesize deposit AssetPack options, review source-safe measurements and demand/ROI posture, approve or reject Depository admission.
- `/read`: request technical knowledge, review synthesized Need, request Finding Fits, preview source-safe AssetPack measurements, settle in BTC/BTD, receive repository delivery.
- `/packs`: inspect and search all pack activity, including deposit options, Depository admission, previews, settlement, rights transfer, compensation, delivery, proof roots, and repair states.

The strongest simplification is AssetPacks in and AssetPacks out. Depositing creates AssetPacks for the Depository; Reading buys synthesized Need-Fit AssetPacks.

## Simplified-spec reading rule

When V43 work feels broad, reduce it to the route law:

1. Packs is activity and inspection.
2. Read is buying source-bearing technical knowledge after Need review and settlement.
3. Deposit is selling source-derived AssetPack options only after depositor review and approval.
4. Source is never disclosed before settlement and rights transfer.
5. The UI should explain itself through the workflow, not through in-app essays.

## V43 UX/product note

The current UX is not good enough. V43 should keep strong themed components where they work, especially execution-log rows and proof expansion, but replace confusing cockpit flow with direct route paths and dense, legible master-detail surfaces.

The `/packs` master table must support search over measurements, synthesized titles and descriptions, values, activity/transaction type, settlement state, compensation posture, proof roots, and repair state.

## V43 agentic deposit note

The deposit-side pipeline should help an enterprise decide what IP to sell. It should compare connected source, Depository supply, and Reading demand. It should propose multiple deposit AssetPack options, reject or warn on critical IP, estimate positive ROI where possible, expose BTD potential as an estimate only, and preserve final BTD mint/right law for paid Need-Fit settlement.

## V43 copy boundary

Outside public docs, avoid self-referential copy such as text explaining that a component is powerful or that Bitcode is doing a thing. Use clear route names, labels, status rows, measurement summaries, empty states, and expandable proof metadata. Public docs may explain the protocol; product UI should operate it.

## Gate 2 route vocabulary inventory note

Gate 2 closes by proving the current vocabulary surface before renaming it. The
source-safe `.bitcode/v43-route-vocabulary-inventory.json` artifact records
file/token counts for `/exchange`, Exchange, `/terminal`, Terminal, `/packs`,
`/read`, `/deposit`, Reading, Depositing, PackActivity,
DepositAssetPackOption, and self-referential copy references. Its migration
matrix prepares `/packs`, `/read`, `/deposit`, retained debug cockpit,
redirect compatibility, and later copy-removal work. The artifact is metadata
only; it intentionally excludes source snippets, raw prompts, provider
responses, protected source, unpaid AssetPack source, credentials, and wallet
or settlement private material.

## Gate 3 packs activity master-detail note

Gate 3 closes the first product-route implementation slice. `/packs` now owns
the pack activity master-detail surface and `/api/packs/activity` exposes a
source-safe PackActivity projection over current activity. `/exchange` is
retained only as a compatibility redirect into `/packs`.

The route defaults to low-friction search and table scanning: search,
activity-type filtering, state filtering, sort-key selection, ascending/
descending sort, and selected detail readback. The detail projection surfaces
overview, measurements, value signals, proof roots, settlement state,
compensation state, delivery state, repair state, and redacted metadata. It is
explicitly source-safe: no protected source, unpaid AssetPack source, source
snippets, raw prompts, interpolated prompts, raw provider responses,
credentials, wallet private material, or private settlement payloads may cross
this boundary.

## Gate 4 read route extraction note

Gate 4 makes `/read` the direct product path for enterprise Reading. The route
owns `ReadRouteSession` and the five-stage user flow: request Read, review the
synthesized Need, request Finding Fits, review the source-safe AssetPack
preview, and settle for delivery. It reuses the current live Reading workbench
and rich execution stream so runtime behavior stays connected to V42 pipeline
reality while the route vocabulary becomes clearer.

The source-safety law is unchanged: `/read` may show request summaries, Need
measurements, fit ids, proof roots, quality posture, BTC fee quotes,
settlement state, and delivery posture before settlement. It must not show
protected source, unpaid AssetPack source, raw prompts, interpolated prompts,
raw provider responses, wallet private material, private settlement payloads,
or ledger write authority before paid read rights are proven.
