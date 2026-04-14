# ENGI Spec V23 Parity Matrix

## Status

- Scope: V23 draft parity ledger for bitcoin-native audit anchoring and settlement-interface hardening
- Specification target: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V23.md`
- Delta companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V23_DELTA.md`
- Notes companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V23_NOTES.md`
- Active canonical anchor: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V22.md`
- Active generated proof appendix: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V22_PROVEN.md`
- Current canonical/latest target remains `V22`
- Draft target version: `V23`
- V23 state: draft family opened; source implementation and generated V23 evidence remain unimplemented

## Purpose

This file records the draft parity ledger between:
- active V22 canon,
- the current ENGI runtime and demo shell,
- the Bitcoin-facing architecture V23 specifies,
- and the gaps that still separate draft intent from real implementation.

## Audit basis

This matrix is grounded in:
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V22.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V22_DELTA.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V22_PARITY_MATRIX.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V22_PROVEN.md`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/src/canon-posture.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/src/engi-demo.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/src/canonical/run-artifacts.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/src/canonical/proof-materialization.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/src/canonical/settlement.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/src/canonical/projections.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/src/demo-shell-state.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/public/app.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/README.md`

---

## V23 implementation matrix

| Area | Current source truth | V23 implementation expectation | Closure signal | Judgment |
| --- | --- | --- | --- | --- |
| Draft file family presence | `engi-demo/src/canon-posture.js` already expects `V23` `SPEC`, `DELTA`, and `PARITY_MATRIX` draft files | V23 requires the draft file family to exist without promoting the pointer | `ENGI_SPEC_V23*.md` family exists while `ENGI_SPEC.txt` still points to `V22` | implemented |
| Stable artifact hashing | `run-artifacts.js` and `proof-materialization.js` already implement canonical JSON and stable hashing | V23 commitment manifests must derive roots from the same hashing discipline | commitment roots are declared as stable-hash derivatives of current artifact digests | implemented prerequisite |
| Proof witness closure | `.engi/proof-witness-manifest.json` and `.engi/proof-contract.json` already bind artifact digests to proof families | V23 private commitment scope must bind to that closure rather than to ad hoc summaries | private-root derivation references proof-contract and witness-manifest closure | implemented prerequisite |
| Deliverables confidentiality classification | `run-artifacts.js` already classifies deliverables by `confidentialityClass` and `potentiallyDisclosable` | V23 public commitment scope must derive only from disclosable artifacts | public-root inclusion rule is derived from deliverables classification and projection policy | implemented prerequisite |
| Manifest-root derivation contract | current source has stable hashing but no BTC-specific root contract | V23 requires replayable manifest-root derivation rather than an implicit or ad hoc root algorithm | `publicRoot` and `privateRoot` are derived from sorted scope entries under a fixed `v23.manifest-root.v1` contract | implemented in docs |
| BTC enum vocabulary | current source has no BTC-specific enum set | V23 requires fixed enum values for anchor, payment, publication, confirmation, network, and journal-binding states | enum vocabulary is declared in spec and used consistently across artifact definitions | implemented in docs |
| Compute-reality surface | current source exposes model execution as a boundary but has no compute-reality manifest | V23 requires a prototype-demonstration compute-reality artifact that binds off-chain execution to replayable proof and settlement surfaces | `.engi/compute-reality-manifest.json` is emitted, classified, and test-covered | not yet implemented |
| Storage-reality surface | current source exposes artifact uploads and deliverables but has no storage-reality manifest | V23 requires a prototype-demonstration storage-reality artifact that binds commitment scopes to content-addressed retrieval posture | `.engi/storage-reality-manifest.json` is emitted, classified, and test-covered | not yet implemented |
| Exact settlement event size | `engi-demo/src/engi-demo.js` exports `METERED_MICRO_UNITS = '100000000'`; `settlement.js` allocates exact micro-units against it | V23 payment intent and observation must bind to the same exact event size | settlement-intent and settlement-observation artifacts reference the same metered-unit event | implemented prerequisite |
| NGI denomination rule | current source has exact integer settlement carriers but no BTC-facing denomination rule | V23 requires ENGI to remain the system name and NGI to be the share and settlement denomination | BTC-facing artifacts declare `unitDenomination = NGI` and treasury policy declares settlement denomination explicitly | implemented in docs |
| Settlement proof chain | source-to-shares, settlement participation, accounting precision, journal diff, and settlement proof already close over exact accounting | V23 audited spend surfaces must bind to the existing settlement proof chain | payment observation does not contradict or replace settlement proof closure | implemented prerequisite |
| Bounded-public proof surfaces | projection policy, bounded-public proof, redaction proof, and disclosure proof already exist | V23 public anchor receipts must project only these safe surfaces | bounded-public anchor is derivable without leaking private artifacts | implemented prerequisite |
| Treasury-policy surface | current source has no explicit treasury or finalization policy artifact | V23 requires a treasury-policy carrier referenced by settlement intent, anchor policy, sidechain bridge policy, and finalization rules | `.engi/bitcoin-treasury-policy.json` is emitted and classified in deliverables manifest | not yet implemented |
| BTC artifact projection matrix | current source has no per-principal visibility matrix for `bitcoin-*` artifacts | V23 requires explicit public/reviewer/buyer/internal visibility for each new BTC artifact | projection policy and deliverables classification cover each BTC artifact explicitly | implemented in docs |
| External boundary specialization | `engi-demo/src/engi-demo.js` already emits a generic `settlement-network-effects` interface | V23 requires explicit anchor-publication and spend-observation interface contracts | external-boundary manifest is specialized beyond generic settlement network effects | draft-required |
| Bitcoin-facing artifact family | no current source emits `bitcoin-*` artifacts | V23 requires commitment-manifest, anchor, bounded-public anchor, settlement intent, settlement observation, and two proof artifacts | new artifact family is emitted in `.engi/` and classified in deliverables manifest | not yet implemented |
| Bitcoin proof-family validation | no current source emits `bitcoin-audit-anchor` or `bitcoin-settlement-interface` proof families | V23 requires both proof families with theorem and replay closure | proof-witness manifest and proof-contract include the new families | not yet implemented |
| Sidechain bridge mode and finalization policy | current source has no BTC-facing sidechain bridge semantics | V23 requires an explicit sidechain bridge connection point and finalization rules for base-layer, repeated-read, and checkpointed-sidechain modes | tests and runtime enforce `journalBindingState` transitions by mode and sidechain checkpoints | not yet implemented |
| Live network execution | README and external-boundary surfaces remain explicit that networked settlement effects are modeled only | V23 must preserve that honesty until real implementation lands | docs and runtime continue to state modeled versus live boundaries accurately | accepted boundary |
| Generated V23 evidence | no `ENGI_SPEC_V23_PROVEN.md` or generated `.engi/v23-*` evidence exists | V23 promotion requires generated evidence from real source behavior | generated appendix and generated V23 reports exist before promotion | accepted boundary |
| Sidechain connection point with later transferability | no current source models a sidechain bridge connection point or transferability beyond deterministic settlement accounting | V23 keeps the sidechain bridge connection point in first-gate scope while generalized transferability remains later work | sidechain bridge mode is specified now; any later generalized transfer mode still binds back to the same commitment and settlement carriers | implemented in docs / pending in source |

---

## V23 implementation checklist

| Area | Required V23 result | Current judgment |
| --- | --- | --- |
| Draft version center | V23 is explicitly deployment-facing and Bitcoin-audit-facing | closed in docs |
| Draft family | V23 `SPEC`, `DELTA`, `PARITY_MATRIX`, and `NOTES` exist | implemented |
| Public/private commitment scope rule | bounded-public and private roots are specified distinctly | implemented in docs |
| Manifest-root derivation contract | `publicRoot` and `privateRoot` are defined replayably | implemented in docs |
| Enum vocabulary | BTC-facing artifact state enums are fixed | implemented in docs |
| Compute-reality surface | prototype compute posture is explicit | implemented in docs |
| Storage-reality surface | prototype storage posture is explicit | implemented in docs |
| NGI denomination rule | ENGI versus NGI naming and unit semantics are explicit | implemented in docs |
| Bitcoin artifact family | new `.engi/bitcoin-*` carriers are defined | implemented in docs |
| Bitcoin proof families | new proof families are defined and bounded | implemented in docs |
| Treasury policy surface | spend-policy and finalization carrier is defined | implemented in docs |
| BTC artifact projection matrix | per-principal visibility for BTC artifacts is explicit | implemented in docs |
| Sidechain bridge connection point | sidechain bridge mode is explicit in first-gate scope | implemented in docs |
| Source emission | current runtime emits the new artifacts | pending |
| Prototype compute/storage emission | current runtime emits compute-reality and storage-reality artifacts | pending |
| Deliverables classification | current deliverables manifest classifies new artifacts correctly | pending |
| External boundary specialization | current external-boundary manifest splits anchor and spend interfaces | pending |
| Test closure | tests fail closed on scope leakage, receipt drift, compute/storage reality drift, and mode-specific finalization drift | pending |
| Generated evidence | generated V23 appendix and V23 reports exist | pending |

## Accepted boundaries

| Boundary | Rationale | Reopen condition |
| --- | --- | --- |
| No pointer promotion in this pass | V22 remains the only active canon | Reopen only after real source implementation and generated evidence exist |
| No live BTC execution claims beyond prototype demonstration | current source does not execute those flows end-to-end yet | Reopen only when runtime, tests, and generated evidence prove it |
| No `_PROVEN_` appendix yet | V23 is still a draft target | Reopen only when V23 behavior is generated from source |
| No mandatory generalized transferability layer | Bitcoin-audit anchoring, sidechain bridge connectivity, and spend binding come first; generalized transferability can remain later | Reopen only if later implementation requires sidechain-issued transferability in first gate |
| No Merkle inclusion requirement in first gate | first-gate V23 uses replayable manifest roots instead | Reopen only if a later version needs compact inclusion-path semantics beyond manifest replay |

## Completion condition

This parity file is complete for V23 only when:
1. every draft artifact and proof-family row is either implemented in source or explicitly deferred,
2. public and private commitment scopes are enforced by source and tests,
3. prototype compute-reality and storage-reality surfaces are emitted and enforced by source and tests,
4. manifest-root derivation, enum vocabulary, treasury-policy surface, and mode-specific finalization rules are enforced by source and tests,
5. external-boundary specialization is emitted in current runtime artifacts,
6. generated V23 evidence exists,
7. and promotion away from V22 is justified by real implementation rather than by draft intent alone.
