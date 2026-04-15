# ENGI Spec V24 Parity Matrix

## Status

- Scope: V24 draft parity ledger for realizing external interfacing after V23 deployed-infrastructure canon
- Current canonical/latest target: `V23`
- Current draft target: `V24`
- Active canonical anchor: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V23.md`
- Active generated proof appendix: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V23_PROVEN.md`
- Draft specification target: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V24.md`
- Draft delta companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V24_DELTA.md`
- Draft notes companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V24_NOTES.md`
- Pointer state remains: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC.txt` -> `V23`
- V24 state: draft only; this file records intended closure, not current active parity truth

## Purpose

This file records the draft parity ledger between:
- active V23 canon,
- the V24 realization draft,
- the current runtime's V23 boundary posture,
- and the source work still required before V24 could ever become canonical.

## Audit basis

This matrix is grounded in:
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V23.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V23_DELTA.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V23_PARITY_MATRIX.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V23_PROVEN.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V24.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V24_DELTA.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V24_NOTES.md`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/src/canon-posture.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/src/engi-demo.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/src/canonical/v23-bitcoin.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/src/canonical/v23-bitcoin-demonstration-service.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/server.js`

---

## V24 draft implementation matrix

| Area | Current source truth | V24 implementation expectation | Closure signal | Judgment |
| --- | --- | --- | --- | --- |
| Draft file family presence | V23 is active and `canon-posture.js` already names `V24` as the draft target | V24 requires `SPEC`, `DELTA`, `PARITY_MATRIX`, and `NOTES` draft files | V24 draft family exists without changing `ENGI_SPEC.txt` | implemented as draft |
| Real Bitcoin mainchain execution | current source emits stubbed-testnet demonstration carriers and receipts only | V24 requires real network-capable spend, broadcast, and confirmation artifacts | emitted real network intent, execution, and observation receipts | specified not implemented |
| Real sidechain execution | current source emits a checkpointed sidechain bridge demonstration mode only | V24 requires real sidechain bridge execution and observation artifacts if the bridge is claimed as realized | emitted real sidechain execution and checkpoint receipts | specified not implemented |
| Compute container realization | current source emits compute-reality posture manifests only | V24 requires auditable compute-container manifests and execution receipts | emitted container manifest, execution receipt, attestation, and replay refs | specified not implemented |
| Storage container realization | current source emits storage-reality posture manifests only | V24 requires auditable storage publication and retrieval receipts | emitted storage manifest, publication receipt, retrieval receipt, and retention-policy refs | specified not implemented |
| GitHub live sessions | current source carries GitHub boundary posture and repo-authenticated supply, but not end-to-end live execution receipts | V24 requires live GitHub App session receipts | emitted live session receipts bound to ENGI identities and authorization roots | specified not implemented |
| GitHub inventory and artifact fetch | current source models repo supply and artifact inventory | V24 requires real GitHub inventory fetch and workflow-artifact fetch receipts | emitted fetch receipts with addressing and content-root binding | specified not implemented |
| GitHub branch and PR mutation | current source does not claim live branch push or PR update execution as canonicalized behavior | V24 requires real branch publication and PR mutation receipts if those paths are claimed as realized | emitted branch publication and PR update receipts with replay handles | specified not implemented |
| External execution policy | current source has treasury-policy and boundary posture, but not a unified external-execution policy surface | V24 requires one explicit external-execution policy carrier | emitted `.engi/external-execution-policy.json` and referenced it everywhere | specified not implemented |
| Unified execution receipt model | current source has separate V23 bitcoin carriers but no single generalized live-execution model | V24 requires intent, execution, and observation receipts across all realized external interfaces | proof families and artifacts use one execution-receipt model | specified not implemented |
| Proof-family expansion | current source closes `bitcoin-audit-anchor` and `bitcoin-settlement-interface` only | V24 requires proof-family closure for network execution, containers, and GitHub live interfacing | proof-witness manifest and proof-contract include all three new V24 families | specified not implemented |
| Deliverables classification | current deliverables manifest classifies V23 bitcoin artifacts and proof surfaces | V24 requires classification of every new external-realization artifact by confidentiality and disclosability | deliverables manifest covers all V24 artifacts correctly | specified not implemented |
| Projection and disclosure safety | V23 public/reviewer/buyer/internal visibility is already explicit for V23 artifacts | V24 requires the same principal-bounded visibility for live execution receipts and container artifacts | projection policy and visibility tests cover all V24 artifact classes | specified not implemented |
| Generated evidence | V23 has generated evidence and `_PROVEN_` closure | V24 requires its own generated reports and `_PROVEN_` appendix before promotion | `ENGI_SPEC_V24_PROVEN.md` and `.engi/v24-*` exist | specified not implemented |

---

## V24 draft implementation checklist

| Area | Required V24 result | Current judgment |
| --- | --- | --- |
| Draft version center | V24 is explicitly realization-facing | closed in draft |
| Draft family | V24 draft family exists while V23 remains active | implemented |
| Real Bitcoin execution model | real spend and anchor execution artifacts are defined | specified |
| Real sidechain execution model | real bridge execution artifacts are defined | specified |
| Compute container model | auditable compute-container artifacts are defined | specified |
| Storage container model | auditable storage-container artifacts are defined | specified |
| GitHub live interfacing model | real GitHub session/fetch/mutation artifacts are defined | specified |
| Execution receipt model | one intent/execution/observation model spans realized external interfaces | specified |
| V24 proof families | proof families are defined for external execution, containers, and GitHub | specified |
| Acceptance criteria | review gate and promotion gate are explicit | implemented |
| Source emission | runtime emits V24 artifacts | not implemented |
| Test closure | tests fail closed on execution and observation drift | not implemented |
| Generated evidence | V24 `_PROVEN_` and generated reports exist | not implemented |
| Canon promotion | `ENGI_SPEC.txt` points to `V24` | not implemented |

## Accepted boundaries

| Boundary | Rationale | Reopen condition |
| --- | --- | --- |
| V24 draft does not promote itself | V23 remains active until source, tests, and evidence close | Reopen only during actual V24 promotion |
| V24 does not yet claim source emission | this draft is review-first, not implementation-complete | Reopen once source work starts |
| V24 does not move bulk compute or private storage to Bitcoin mainchain | Bitcoin remains audit/spend substrate | Reopen only if a later version changes architecture intentionally |
| V24 does not accept GitHub side effects without ENGI receipts | live interfacing must remain auditable inside ENGI | Reopen only if a stronger proof model supersedes receipt emission |

## Completion condition

This parity file is first-gate complete for review only when:
1. every requested realization axis is represented,
2. every major V24 area has a concrete expected closure signal,
3. the current judgment distinguishes draft specification from actual implementation,
4. and the promotion gate remains explicit rather than implied.
