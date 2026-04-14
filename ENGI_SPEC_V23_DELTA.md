# ENGI Spec V23 Delta

## Status

- Scope: V23 draft delta for bitcoin-native audit anchoring and settlement-interface hardening after V22 canon-posture closure
- Active canonical anchor: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V22.md`
- Active generated proof appendix: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V22_PROVEN.md`
- Current canonical/latest target remains `V22`
- Draft target version: `V23`
- Spec companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V23.md`
- Parity companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V23_PARITY_MATRIX.md`
- Notes companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V23_NOTES.md`
- V23 state: draft open; no pointer promotion, no generated V23 appendix, no claim of live BTC execution

## Why V23 exists

V22 solved the truth-alignment problem inside ENGI itself.

That leaves the next system question:
- how should ENGI's already-auditable proof, disclosure, and settlement surfaces bind to an external public audit substrate,
- and how should buyer payment and public audit receipts become explicit without pretending the local prototype already executes those flows?

V23 exists because current source is already structurally ready for that next step:
- stable canonical hashing exists,
- proof-contract and witness-manifest closure exist,
- settlement exactness already closes over a satoshi-scale event size,
- deliverables are already classified by confidentiality and public disclosability,
- and an explicit external-boundary manifest already names settlement network effects as a separate interface.

## Findings that drive V23

### 1. The commitment substrate is already present

Current source already materializes stable artifact digests and proof-family witness bindings.
V23 therefore should specify commitment-root derivation rather than a new digest model.

### 2. Public versus private anchor scopes are already derivable

Current deliverables classification already separates bounded-public metadata from private proof, source-material, and settlement surfaces.
V23 should turn that classification into explicit anchor-scope policy.

### 3. Settlement already closes exactly before any external network effect

Current source-to-shares, journal, settlement preview, and settlement proofs already define exact consequence surfaces.
V23 should bind payment intent and confirmation to those surfaces rather than re-specifying settlement itself.

### 4. External deployment work is still modeled rather than live

Current source and demo-local docs remain honest about modeled-only network effects.
V23 must preserve that honesty and treat Bitcoin as next deployment architecture rather than as a retroactive claim about the current demo.

## Accepted V23 decisions

The current accepted V23 drafting decisions are:

1. V23 is deployment-facing rather than another truth-alignment pass.
2. Bitcoin enters ENGI first as a commitment and spend substrate.
3. ENGI proof computation and bulk private artifact storage remain off-chain by default.
4. V23 opens two new proof families: `bitcoin-audit-anchor` and `bitcoin-settlement-interface`.
5. V23 requires bounded-public and private commitment scopes at minimum.
6. V23 requires audited payment intent and audited payment observation carriers before any future live settlement claim can be made.
7. V23 keeps optional sidechain or L2 transferability as later work, not as the entry point.
8. V23 does not authorize canonical promotion or generated-proof claims until source and validation land.
9. V23 first gate fixes replayable manifest-root derivation instead of leaving root construction implicit.
10. V23 first gate fixes the minimum enum vocabulary and mode-specific journal finalization rules for BTC-facing artifacts.
11. V23 first gate adds a treasury-policy surface and a BTC artifact projection matrix so buyer, reviewer, and public visibility are explicit.

## Explicitly deferred

Still explicitly deferred beyond this drafting pass:
- live Bitcoin transaction assembly and signing,
- live anchor publication,
- live repeated-read payment network integration,
- live optional L2 or sidechain transferability,
- and any V23 `_PROVEN_` appendix or generated `.engi/v23-*` artifact family.

## Draft implementation sequence

The accepted V23 sequencing is:

1. draft the V23 file family while keeping V22 as the active canon,
2. define the new Bitcoin-facing artifact family and proof-family members,
3. derive public and private commitment scopes from existing deliverables classification,
4. fix the manifest-root derivation contract, enum vocabulary, treasury policy shape, and mode-specific finalization rules,
5. specialize the external-boundary manifest into anchor and spend interfaces,
6. bind settlement intent and observation to existing exact settlement artifacts,
7. add fail-closed validation for scope leakage, receipt drift, and mode-specific finalization drift,
8. generate V23 proof and draft-readiness artifacts from real source behavior,
9. and only then consider promotion away from V22.

## Commit-body direction

The eventual V23 canonical commit body should describe:
- the Bitcoin-facing artifact family added to source,
- the exact public and private commitment-scope rules,
- the manifest-root derivation contract, enum vocabulary, treasury-policy surface, and finalization policy,
- the spend-intent and payment-observation closure path,
- the new proof families and validation surfaces,
- and the explicit continued honesty about what remains modeled versus live.
