# Bitcode Spec V47 Delta

## Status

- Version: `V47`
- V47 state: draft opening; V46 remains active canon while V47 scopes website commercial testnet launch readiness
- Current canonical/latest target: `V46`
- Prior canonical anchor: `BITCODE_SPEC_V46.md`
- Prior generated proof appendix: `BITCODE_SPEC_V46_PROVEN.md`
- Generated structured artifact inventory: planned draft `.bitcode/v47-spec-family-report.json`, `.bitcode/v47-canonical-input-report.json`, `.bitcode/v47-feature-excess-alignment-audit.json`, `.bitcode/v47-seller-buyer-state-machine-law.json`, V47 launch-readiness artifacts, and `BITCODE_SPEC_V47_PROVEN.md` after promotion readiness
- Source parity state: V47 source parity is in progress; Gate 1 opened specification, roadmap, measurement-law, and workflow hooks; Gate 2 adds source-safe feature-excess and launch-alignment audit coverage; Gate 3 adds source-safe seller/buyer state-machine law
- Notes companion: `BITCODE_SPEC_V47_NOTES.md`
- Spec companion: `BITCODE_SPEC_V47.md`
- Parity companion: `BITCODE_SPEC_V47_PARITY_MATRIX.md`
- Scope: V47 delta for commercial website testnet readiness over promoted V46 protocol comprehension canon
- Last fully realized canonical target preserved in source: `V46`

## Why V47 exists

V45 made Bitcode's knowledge commoditization law precise. V46 made that law
commercially legible. V47 exists to make the website application commercially
ready on staging-testnet: IP sellers can deposit AssetPacks, IP buyers can buy
Need-fitting AssetPacks, and `/packs` plus Auxillaries make the whole exchange
auditable, source-safe, and repairable.

V47 is not a broad feature expansion. It is the first generally available MVP
launch-readiness version and therefore must freeze scope, remove or defer
feature excess, specify measurement law, prove seller and buyer state machines,
and validate the website E2E.

## Accepted V47 decisions

- V47 focuses on the rich website application: `/deposit`, `/read`, `/packs`,
  and Auxillaries.
- In V47, testnet means BTC amounts and payment observations are testnet only;
  all other protocol behavior should be production-intended.
- Measurement is the basis of IP commoditization: individual measurements,
  inference prompts, typed outputs, weights, normalized contributions, BTD
  scalar formula, and source-safe visualization are launch-critical.
- V47 must support two profiles: IP sellers and IP buyers.
- Conversation experiences, ChatGPT App commercialization, MCP/API
  commercialization, deeper BTD mining cryptography, mainnet launch authority,
  and advanced market mechanics are deferred.
- A dedicated feature-excess gate must remove, hide, or flag anything that
  distracts from the launch MVP.
- A dedicated E2E gate must prove selling and buying IP the Bitcode way.
- A dedicated public launch messaging gate must refurbish the landing page for
  V47 commercial testnet readiness.

## Explicitly deferred

- Value-bearing mainnet settlement.
- Commercial launch of API/MCP, ChatGPT App, and Bitcode Chat.
- Deeper BTD mining cryptographic implementation beyond existing website
  launch contracts.
- Advanced exchange/market mechanics beyond the MVP seller/buyer AssetPack
  flows.
- Source-bearing preview before BTC-testnet settlement and BTD rights transfer.

## Pre-Implementation Sequence

1. Open the V47 draft spec family over active V46.
2. Specify testnet semantics, measurement law, launch freeze, user profiles,
   and gate plan.
3. Audit feature excess and gate misalignment.
4. Specify seller/buyer state machines and measurement visualizations.
5. Implement and test depositor website completion.
6. Implement and test reader website completion.
7. Complete `/packs` and Auxillaries commercial dashboard state.
8. Prove E2E IP selling and buying tests.
9. Rehearse canonical staging-testnet deployment.
10. Promote V47 only after commercial website launch-readiness evidence is
    complete.

## Commit-Body Direction

V47 commits should describe the commercial launch behavior, the measurement or
state-machine proof they close, the commands run, and any feature flags or
deferrals introduced. Commit bodies should name source-safety, measurement,
testnet semantics, proof/readback, and user-flow consequences when relevant.

## Gate 1: V47 Scope, Testnet Semantics, Measurement Law, And Launch Freeze

Gate 1 closes when the V47 spec family exists over active V46, V47 is framed as
commercial website testnet launch readiness, testnet means only BTC amounts are
testnet/free, measurement law is explicit, seller and buyer flows are named,
the ten-gate launch plan is recorded, package and workflow checks exist, and no
V47 file claims promoted authority.

## Gate 2: Feature Excess And Gate Alignment Audit

Gate 2 audits all website features and protocol surfaces for launch relevance.
It removes wrong features, feature-flags post-V47 behavior, and records
deferrals so the first generally available MVP is focused.

Gate 2 owns `.bitcode/v47-feature-excess-alignment-audit.json`,
`buildV47FeatureExcessAlignmentAudit`, and `check:v47-gate2`. The audit
classifies `/deposit`, `/read`, and `/packs` as launch routes; `/docs`,
Auxillaries, `/btd/[assetPackId]`, execution readback, and required APIs as
supporting surfaces; and `/terminal` direct product entry, `/conversations`
direct commercial launch, `/exchange` direct product entry, `/orbitals`,
`/edgetimes`, `/demo-video`, API/MCP commercialization, ChatGPT App
commercialization, Bitcode Chat commercialization, value-bearing mainnet, and
advanced market mechanics as deferred or compatibility-only.

## Gate 3: Seller And Buyer State Machine Law

Gate 3 specifies exact IP seller and IP buyer state machines, including
measurement, proof, repair, settlement, delivery, and `/packs` history.

Gate 3 owns `.bitcode/v47-seller-buyer-state-machine-law.json`,
`buildV47SellerBuyerStateMachineLaw`, and `check:v47-gate3`. The state-machine
law names seller states from source connection through compensation/repair
tracking; buyer states from Read request through delivery; guards for
measurement-before-price, proof-before-state, accepted Need before Finding
Fits, quote-before-settlement, BTC finality before BTD rights, BTD rights
before source delivery, `/packs` projection, and fail-closed repair; and the
source-safe fields that may be projected without source leakage.

## Gate 4: Depositor Website Completion

Gate 4 completes source connection, deposit AssetPack option synthesis,
source-safe review, Depository admission, and compensation visibility.

Gate 4 owns `.bitcode/v47-depositor-website-completion.json`,
`buildV47DepositorWebsiteCompletion`, and `check:v47-gate4`. The completion
binds the five-step `/deposit` route session (`connect-source`,
`synthesize-options`, `review-options`, `submit-deposit`,
`read-depository-state`) to journaled source-safe execution rows for
`pipeline:deposit-option-synthesis`, `pipeline:deposit-option-review`, and
`pipeline:deposit-option-admission`; renders seller visualization of the
measurement catalog, criticality, demand, ROI, BTD potential, BTC
source-to-shares preview, and option roots before approval; records approve,
reject, and resynthesis decisions with admission readback synchronized to
`/packs`; and exposes compensation estimates, supply recommendations, and
organization/wallet authority state as source-safe metadata only, with no
protected source, unpaid AssetPack source, raw prompts, raw provider
responses, wallet private material, or value-bearing mainnet authority.

## Gate 5: Reader Website Completion

Gate 5 completes Read Request, Need synthesis/review, Finding Fits, preview,
quote, BTC-testnet settlement, BTD rights transfer, and PR delivery.

Gate 5 owns `.bitcode/v47-reader-website-completion.json`,
`buildV47ReaderWebsiteCompletion`, and `check:v47-gate5`. The completion
binds the five-step `/read` route session (`request-read`,
`review-synthesized-need`, `request-fit`, `review-synthesized-asset-pack`,
`buy-asset-pack-settle`) to a source-safe fit measurement review rendering
Need coverage, Fit confidence, specificity, novelty, reuse, risk, evidence,
delivery readiness, selected Fit provenance, final BTD scalar, and the
deterministic BTC-testnet quote basis before any payment; orders payment
observation, BTC-testnet finality, BTD rights transfer receipt, and
repository PR delivery as fail-closed readback with source-bearing delivery
locked until rights transfer; keeps Reading activity and settled AssetPacks
reachable through `/packs`; and exposes everything as source-safe metadata
only, with no protected source, unpaid AssetPack source, raw prompts, raw
provider responses, wallet private material, or value-bearing mainnet
authority.

## Gate 6: Packs And Auxillaries Commercial Dashboard

Gate 6 completes identity, teams, wallets, histories, PackActivity
master-detail, filters/search, proof readback, and repair surfaces.

Gate 6 owns `.bitcode/v47-packs-auxillaries-commercial-dashboard.json`,
`buildV47PacksAuxillariesCommercialDashboard`, and `check:v47-gate6`. The
dashboard law binds `/packs` to a searchable master-detail PackActivity
surface with type/state facets and saved market-intelligence filters; the
detail surface reads back overview, measurements, settlement, BTD rights,
compensation, delivery, and repair states, accounting, governance, and proof
roots, with rights states derived only from finality-consistent
commodity-state evidence and a fail-closed repair surface listing
commodity-state blockers; and binds Auxillaries to identity profile, external
source connections, interfaces, wallet authority with BTD history readback,
and organization team and treasury settings — all as source-safe metadata
only, with no protected source, unpaid AssetPack source, raw prompts, raw
provider responses, wallet private material, or value-bearing mainnet
authority.

## Gate 7: E2E IP Selling And Buying Tests

Gate 7 adds browser-level tests proving both sides of Bitcode: deposit IP into
Bitcode, buy synthesized IP from Bitcode, and verify ledger/database/storage,
proof, settlement, rights, compensation, and delivery.

## Gate 8: Landing Page And Public Launch Messaging

Gate 8 refurbishes landing and public docs for V47 commercial testnet
readiness, core flows, proof-backed trust, source-safe IP exchange, and the
meaning of testnet.

## Gate 9: Staging-Testnet Deployment Rehearsal

Gate 9 validates the canonical staging-testnet deployment with realistic data,
real routes, real storage/database/ledger projections, and BTC-testnet
settlement.

## Gate 10: V47 Promotion Readiness

Gate 10 closes parity matrix, generated proof artifacts, CI/promotion workflow,
commercial website readiness, and canonical promotion.
