# ENGI Spec V23 Notes

## Status

- Scope: non-canonical V23 working notes for bitcoin-native audit anchoring and settlement-interface hardening
- Canonical pointer: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC.txt` -> `V22`
- Active canonical anchor: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V22.md`
- Active generated proof appendix: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V22_PROVEN.md`
- V23 state: draft family opened; notes track implementation sequencing and open questions only

## Non-Canonical Notes Rule

This file is intentionally non-canonical.

It may contain:
- draft V23 scope ideas,
- implementation sequencing notes,
- open audit and boundary questions,
- and candidate artifact-shape refinements.

It must not be treated as active ENGI canon.

Any note that survives as system truth must be promoted into:
- `ENGI_SPEC_V23.md`,
- `ENGI_SPEC_V23_DELTA.md`,
- `ENGI_SPEC_V23_PARITY_MATRIX.md`,
- a future `ENGI_SPEC_V23_PROVEN.md`,
- or required generated `.engi/v23-*` artifacts once those exist.

## Starting inheritance from V22

V22 closed runtime/API/browser/doc truth alignment and remains the active system authority.

The inherited baseline for V23 is:
- exact source-to-shares settlement is already canonical,
- disclosure-boundary and proof-contract closure are already canonical,
- generated appendix discipline remains canonical,
- stable artifact hashing and proof-witness closure already exist in source,
- and external network effects remain explicit modeled boundaries rather than hidden implementation claims.

## Current V23 drafting center

The strongest V23 center from the current audit is:
- define Bitcoin as ENGI's next public audit and spend interface layer,
- keep a sidechain connection point in first-gate scope so the bridge is not mainchain-only,
- keep proof computation and bulk private artifact storage off-chain,
- clarify that NGI is the share and settlement denomination while ENGI names the system,
- require prototype-demonstration compute and storage reality surfaces so deployed posture is explicit,
- derive bounded-public and private commitment scopes from current artifact classifications,
- bind buyer payment intent and network observation to exact ENGI bundle and settlement surfaces,
- and preserve the repo's current honesty about modeled versus live boundaries.

## Candidate implementation workstreams

### 1. Commitment-scope builder

Candidate requirement:
- add a runtime-owned builder that derives bounded-public and private commitment scopes from current artifact digests and deliverables classification.

Likely consequences:
- new `.engi/bitcoin-commitment-manifest.json`,
- deterministic public and private roots,
- and proof-family binding back into proof-contract closure.

First-gate drafting choice:
- use replayable manifest roots under `v23.manifest-root.v1`,
- not Merkle roots,
- unless a later version explicitly needs compact inclusion paths.

### 2. Anchor publication surfaces

Candidate requirement:
- add one full anchor artifact and one bounded-public anchor projection artifact.

Likely consequences:
- explicit network mode and anchor reference typing,
- explicit confirmation state,
- and public-safe publication receipts without leaking private witness surfaces.

First-gate drafting choice:
- add `.engi/bitcoin-treasury-policy.json` as the policy carrier for anchor mode, payment mode, signer policy, and journal finalization policy.
- include sidechain bridge policy in that same treasury-policy surface.

### 2.5. Compute and storage reality surfaces

Candidate requirement:
- add prototype-demonstration manifests for off-chain compute reality and content-addressed storage reality.

Likely consequences:
- new `.engi/compute-reality-manifest.json`,
- new `.engi/storage-reality-manifest.json`,
- and explicit audit-visible closure over how deployed compute and storage bind to ENGI ledgered artifacts.

### 3. Settlement intent and observation surfaces

Candidate requirement:
- add audited payment intent and audited payment observation artifacts that bind directly to `bundleId`, `needId`, `meteredMicroUnits`, `sourceToSharesRef`, and `settlementPreviewRef`.

Likely consequences:
- larger purchases and repeated read-like purchases use different modes,
- sidechain bridge mode remains a first-gate connection point,
- but the same closure rules still apply,
- and journal or settlement effects do not become network-implicit.

First-gate drafting choice:
- repeated-read payments may be observed earlier than they are finalized,
- but final settlement closure still requires a matching published anchor batch.

### 4. Proof-family integration

Candidate requirement:
- extend proof-witness manifest and proof-contract families with `bitcoin-audit-anchor` and `bitcoin-settlement-interface`.

Likely consequences:
- new proof artifacts,
- new theorem closure and replay steps,
- and fail-closed validation for disclosure leakage and receipt drift.

First-gate drafting choice:
- add explicit mode-specific finalization drift checks in addition to scope-leak and receipt-drift checks.

### 5. Generated evidence and promotion hardening

Candidate requirement:
- do not promote V23 until generated V23 evidence exists.

Likely consequences:
- future generated V23 reports,
- future `ENGI_SPEC_V23_PROVEN.md`,
- and new tests that fail closed on commitment-scope and payment-observation defects.

## Open drafting questions

Current questions that still need source-backed answers later:
- whether `bitcoin-bounded-public-anchor` should remain a distinct artifact or become a projection of a more general public receipt surface,
- how much of private-root derivation should be declared directly in the commitment manifest versus derived through proof-contract replay,
- and what minimum generated artifact set is sufficient before V23 promotion is even considered.

## Initial V23 non-goals

Based on the current audit, V23 should not begin by:
- changing `ENGI_SPEC.txt`,
- claiming live BTC execution in demo-local docs,
- replacing ENGI's existing exact settlement model,
- or making transferability the center of the version before audit anchoring and spend binding are closed.
