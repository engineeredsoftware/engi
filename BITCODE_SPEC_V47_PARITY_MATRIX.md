# Bitcode Spec V47 Parity Matrix

## Status

- Version: `V47`
- V47 state: draft parity opening; V46 remains active canon while V47 scopes website commercial testnet launch readiness
- Current canonical/latest target: `V46`
- Prior canonical anchor: `BITCODE_SPEC_V46.md`
- Prior generated proof appendix: `BITCODE_SPEC_V46_PROVEN.md`
- Generated structured artifact inventory: planned draft `.bitcode/v47-spec-family-report.json`, `.bitcode/v47-canonical-input-report.json`, `.bitcode/v47-feature-excess-alignment-audit.json`, `.bitcode/v47-seller-buyer-state-machine-law.json`, `.bitcode/v47-depositor-website-completion.json`, `.bitcode/v47-reader-website-completion.json`, `.bitcode/v47-packs-auxillaries-commercial-dashboard.json`, `.bitcode/v47-e2e-ip-selling-buying-tests.json`, V47 launch-readiness artifacts, and `BITCODE_SPEC_V47_PROVEN.md` after promotion readiness
- Source parity state: V47 source parity is in progress; Gate 1 records launch scope, measurement law, testnet semantics, and planned closure gates; Gate 2 records feature-excess and launch-alignment audit evidence; Gate 3 records seller/buyer state-machine law evidence; Gate 4 records depositor website completion evidence; Gate 5 records reader website completion evidence; Gate 6 records packs/Auxillaries commercial dashboard evidence; Gate 7 records E2E IP exchange browser-proof evidence
- Notes companion: `BITCODE_SPEC_V47_NOTES.md`
- Spec companion: `BITCODE_SPEC_V47.md`
- Delta companion: `BITCODE_SPEC_V47_DELTA.md`
- Scope: V47 draft parity ledger for commercial website testnet readiness over promoted V46 protocol comprehension canon
- Last fully realized canonical target preserved in source: `V46`

## Purpose

This matrix records V47 launch-readiness parity work. V47 starts from promoted
V46 and narrows the first generally available MVP to the website application:
`/deposit`, `/read`, `/packs`, and Auxillaries. The matrix names what must be
specified, implemented, tested, documented, and proven before V47 can promote.

## Audit basis

Gate 1 audit inputs are `BITCODE_SPEC.txt`, `BITCODE_SPEC_V46.md`,
`BITCODE_SPEC_V46_DELTA.md`, `BITCODE_SPEC_V46_NOTES.md`,
`BITCODE_SPEC_V46_PARITY_MATRIX.md`, `BITCODE_SPEC_V46_PROVEN.md`,
`BITCODE_SPEC_V47.md`, `BITCODE_SPEC_V47_DELTA.md`,
`BITCODE_SPEC_V47_NOTES.md`, this parity matrix, `SPECIFICATIONS_ROADMAP.md`,
`package.json`, gate/canon workflows, `/deposit`, `/read`, `/packs`,
Auxillaries, pipeline packages, prompt registries, proof roots, ledger/database
storage readback, wallet/provider receipts, and repository delivery receipts.

## V47 implementation matrix

| Area | Required V47 result | Current judgment | Source-grounded finding | Closure gate |
| --- | --- | --- | --- | --- |
| Scope and launch freeze | V47 is website-first commercial staging-testnet readiness, not broad feature expansion | drafted | Gate 1 opens scope and keeps V46 active canon. | Gate 1 |
| Testnet semantics | Testnet means BTC amounts are testnet/free while the rest of the system behaves production-intended | drafted | Gate 1 records this as launch law. | Gate 1 |
| Measurement law | Catalog measurements, prompts, typed outputs, weights, BTD scalar formula, seller/buyer visualization, and proof roots | drafted | Gate 1 makes measurement the basis for price and settlement. | Gate 1 |
| Feature excess audit | Remove, hide, flag off, or defer non-launch behavior | implemented; promotion pending | `buildV47FeatureExcessAlignmentAudit` and `.bitcode/v47-feature-excess-alignment-audit.json` classify launch/supporting/deferred surfaces and check launch CTAs, compatibility redirects, and feature flags. | Gate 2 |
| Seller state machine | IP seller can connect source, synthesize options, review measurements, approve deposit, and track compensation | implemented; promotion pending | `buildV47SellerBuyerStateMachineLaw` and `.bitcode/v47-seller-buyer-state-machine-law.json` define seller states and guards; `buildV47DepositorWebsiteCompletion` and `.bitcode/v47-depositor-website-completion.json` bind the `/deposit` route session, journaled synthesis/review/admission rows, and `/packs` sync. | Gate 3 and Gate 4 |
| Buyer state machine | IP buyer can request Read, approve Need, Finding Fits, preview, settle, receive rights, and get PR delivery | implemented; promotion pending | `buildV47SellerBuyerStateMachineLaw` and `.bitcode/v47-seller-buyer-state-machine-law.json` define buyer states and guards; `buildV47ReaderWebsiteCompletion` and `.bitcode/v47-reader-website-completion.json` bind the `/read` route session, fit measurement review, settlement/rights/delivery ordering, and `/packs` sync. | Gate 3 and Gate 5 |
| `/packs` dashboard | Master-detail PackActivity tracks deposits, reads, proofs, settlements, rights, delivery, compensation, repair | implemented; promotion pending | `buildV47PacksAuxillariesCommercialDashboard` and `.bitcode/v47-packs-auxillaries-commercial-dashboard.json` bind searchable master-detail rows, settlement/rights/compensation/delivery/repair state readback, proof roots, and the fail-closed repair surface validated by `check:v47-gate6`. | Gate 6 |
| Auxillaries launch readiness | Identity, source connections, target repository connections, wallets, teams, histories are usable | implemented; promotion pending | Auxillaries panes cover identity profile, external source connections, interfaces, wallet authority with BTD history readback, and organization team/treasury settings, recorded by the Gate 6 artifact. | Gate 6 |
| E2E IP exchange tests | Browser tests prove selling and buying IP the Bitcode way | implemented; promotion pending | `commercial-mvp.ip-exchange.spec.ts` proves the seller deposit flow, buyer measurement/quote/settlement/rights/delivery flow, and `/packs` repair-surface readback in deterministic mock mode, recorded by `buildV47E2eIpSellingBuyingTests` and `.bitcode/v47-e2e-ip-selling-buying-tests.json` validated by `check:v47-gate7`. | Gate 7 |
| Landing and public messaging | Landing page explains commercial testnet readiness and user flows | draft-required | Public claim readiness must match launch behavior. | Gate 8 |
| Staging-testnet rehearsal | Canonical deployment validates real routes, real data stores, and BTC-testnet settlement | draft-required | V47 promotion needs deployment-grade evidence. | Gate 9 |
| Promotion readiness | V47 generated artifacts, parity, CI, and promotion workflow are green | pending | Promotion remains later. | Gate 10 |

## V47 implementation checklist

| Area | Required V47 result | Current judgment | Source-grounded finding | Closure gate |
| --- | --- | --- | --- | --- |
| Active pointer truth | `BITCODE_SPEC.txt` remains V46 during Gate 1 | accepted boundary | V47 is draft only. | Gate 1 |
| Draft files | V47 SPEC, DELTA, NOTES, and PARITY files exist | drafted | Gate 1 creates full draft family. | Gate 1 |
| CI posture | Gate and canon workflows validate active V46 plus draft V47 | drafted | Gate 1 wires `check:v47-gate1`. | Gate 1 |
| Measurement prompt traceability | Every measurement points to prompt identity, typed output, weight, and proof | draft-required | Later gates must audit concrete prompt registry bindings. | Gate 3+ |
| Seller visualization | Depositors see source-safe measurement and compensation basis | implemented; promotion pending | `/deposit` renders measurements, criticality, demand, ROI, BTD potential, BTC source-to-shares preview, option roots, compensation estimates, and authority readback validated by `check:v47-gate4`. | Gate 4 |
| Buyer visualization | Readers see source-safe fit measurements and quote basis before paying | implemented; promotion pending | `/read` renders Need coverage, Fit confidence, specificity, novelty, reuse, risk, evidence, delivery readiness, selected Fit provenance, final BTD scalar, quote basis, and settlement/rights/delivery readback validated by `check:v47-gate5`. | Gate 5 |
| Website-only launch focus | API/MCP, ChatGPT App, and Bitcode Chat are deferred commercial surfaces | accepted boundary | V47 avoids scope sprawl. | Gate 1 and Gate 2 |
| Mainnet block | Value-bearing mainnet remains blocked | accepted boundary | BTC amounts are testnet only in V47. | Gate 1+ |
| Launch route discipline | Public navigation, landing CTAs, pricing acquisition, and BTD detail paths use `/deposit`, `/read`, or `/packs` rather than `/terminal` or `/exchange` | implemented; promotion pending | Gate 2 rewrites launch-facing entrypoints and keeps `/exchange` redirect-only. | Gate 2 |
| State-machine guards | Measurement-before-price, proof-before-state, accepted Need before Finding Fits, finality before BTD rights, BTD rights before delivery, and repair fail closed | implemented; promotion pending | Gate 3 source object binds the guards to Deposit, Read, Packs, BTD settlement, receipts, source-to-shares, and semantic volume sources. | Gate 3 |

## Grouped closure gates

1. Scope, Testnet Semantics, Measurement Law, And Launch Freeze.
2. Feature Excess And Gate Alignment Audit.
3. Seller And Buyer State Machine Law.
4. Depositor Website Completion.
5. Reader Website Completion.
6. Packs And Auxillaries Commercial Dashboard.
7. E2E IP Selling And Buying Tests.
8. Landing Page And Public Launch Messaging.
9. Staging-Testnet Deployment Rehearsal.
10. Promotion Readiness.

## V47 accepted boundaries

- V46 remains active canon during V47 draft work.
- Gate 1 is specification, roadmap, and checking only.
- Testnet BTC does not weaken rights, proof, source-safety, authority, or
  delivery boundaries.
- Measurement is source-safe and visible; source remains protected until
  entitlement.
- Commercial launch scope is website-only.

## V47 completion condition

V47 Gate 1 is complete when the V47 draft spec family, roadmap, package script,
Gate 1 checker, and CI workflow hooks validate active V46 plus draft V47, and
the gate branch is committed, pushed, and pull-requested into `version/v47`.

V47 Gate 2 is complete when the V47 feature-excess audit artifact is generated,
its package object and tests pass, public launch entrypoints resolve to
current routes, deferred surfaces are classified, `/exchange` remains
compatibility-only, `/terminal` and `/conversations` direct entry are flaggable
or retained, and gate/canon workflows run `check:v47-gate2`.

V47 Gate 3 is complete when the V47 seller/buyer state-machine law artifact is
generated, its package object and tests pass, seller and buyer states are
bound to `/deposit`, `/read`, `/packs`, BTD receipts, settlement,
source-to-shares, and semantic volume sources, transition guards preserve
measurement-before-price and proof-before-state, source-safe fields and
forbidden payload classes are explicit, and gate/canon workflows run
`check:v47-gate3`.

V47 Gate 4 is complete when the V47 depositor website completion artifact is
generated, its package object and tests pass, the `/deposit` route binds
source connection before synthesis, journals option synthesis, review, and
admission as source-safe execution rows, renders decision-quality measurement,
BTD potential, BTC source-to-shares preview, compensation, and authority
views, synchronizes admitted options to `/packs`, and gate/canon workflows run
`check:v47-gate4`.

V47 Gate 5 is complete when the V47 reader website completion artifact is
generated, its package object and tests pass, the `/read` route binds Read
request initiation, Need review acceptance before Finding Fits, source-safe
fit measurement review with final BTD scalar and deterministic BTC-testnet
quote basis before payment, ordered payment observation, finality, BTD rights,
and repository PR delivery readback, and `/packs` history synchronization, and
gate/canon workflows run `check:v47-gate5`.

V47 Gate 6 is complete when the V47 packs/Auxillaries dashboard artifact is
generated, its package object and tests pass, `/packs` renders searchable
master-detail PackActivity with settlement, BTD rights, compensation,
delivery, and repair state readback, proof roots, and a fail-closed repair
surface, Auxillaries panes cover identity, source connections, interfaces,
wallet authority with histories, and organization team/treasury settings, and
gate/canon workflows run `check:v47-gate6`.

V47 Gate 7 is complete when the V47 E2E IP exchange artifact is generated,
its package object and tests pass, the browser proof sells IP on `/deposit`,
buys IP on `/read` with measurement-before-price and ordered
settlement/rights/delivery readback, audits `/packs` including the
fail-closed repair surface, runs in deterministic source-safe mock mode with
a clean browser error trap, `uapi` exposes `test:e2e:ip-exchange`, and
gate/canon workflows run `check:v47-gate7`.
