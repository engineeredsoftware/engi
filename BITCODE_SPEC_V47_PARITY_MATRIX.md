# Bitcode Spec V47 Parity Matrix

## Status

- Version: `V47`
- V47 state: draft parity opening; V46 remains active canon while V47 scopes website commercial testnet launch readiness
- Current canonical/latest target: `V46`
- Prior canonical anchor: `BITCODE_SPEC_V46.md`
- Prior generated proof appendix: `BITCODE_SPEC_V46_PROVEN.md`
- Generated structured artifact inventory: planned draft `.bitcode/v47-spec-family-report.json`, `.bitcode/v47-canonical-input-report.json`, V47 launch-readiness artifacts, and `BITCODE_SPEC_V47_PROVEN.md` after promotion readiness
- Source parity state: V47 source parity is pending; Gate 1 records launch scope, measurement law, testnet semantics, and planned closure gates
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
| Feature excess audit | Remove, hide, flag off, or defer non-launch behavior | draft-required | V47 needs a first-GA MVP discipline gate. | Gate 2 |
| Seller state machine | IP seller can connect source, synthesize options, review measurements, approve deposit, and track compensation | draft-required | Seller flow exists conceptually and needs exact website parity. | Gate 3 and Gate 4 |
| Buyer state machine | IP buyer can request Read, approve Need, Finding Fits, preview, settle, receive rights, and get PR delivery | draft-required | Buyer flow exists conceptually and needs exact website parity. | Gate 3 and Gate 5 |
| `/packs` dashboard | Master-detail PackActivity tracks deposits, reads, proofs, settlements, rights, delivery, compensation, repair | draft-required | V46 comprehension exists; V47 needs launch-ready dashboard behavior. | Gate 6 |
| Auxillaries launch readiness | Identity, source connections, target repository connections, wallets, teams, histories are usable | draft-required | Auxillaries must support website launch flows. | Gate 6 |
| E2E IP exchange tests | Browser tests prove selling and buying IP the Bitcode way | draft-required | V47 needs experiential proof, not only unit checks. | Gate 7 |
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
| Seller visualization | Depositors see source-safe measurement and compensation basis | draft-required | Deposit route must support decision-quality measurement views. | Gate 4 |
| Buyer visualization | Readers see source-safe fit measurements and quote basis before paying | draft-required | Read route must support decision-quality preview views. | Gate 5 |
| Website-only launch focus | API/MCP, ChatGPT App, and Bitcode Chat are deferred commercial surfaces | accepted boundary | V47 avoids scope sprawl. | Gate 1 and Gate 2 |
| Mainnet block | Value-bearing mainnet remains blocked | accepted boundary | BTC amounts are testnet only in V47. | Gate 1+ |

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
