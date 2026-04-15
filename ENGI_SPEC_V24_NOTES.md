# ENGI Spec V24 Notes

## Status

- Scope: non-canonical V24 working notes after promotion of the external-realization canon
- Canonical pointer: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC.txt` -> `V24`
- Active canonical anchor: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V24.md`
- Active generated proof appendix: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V24_PROVEN.md`
- V24 state: canonical promotion complete; notes now track residual V25-facing follow-ups only

## Non-Canonical Notes Rule

This file is intentionally non-canonical.

It may contain:
- shaping notes for V24,
- open implementation questions,
- candidate artifact refinements,
- and possible sequencing ideas.

It must not be treated as active ENGI canon.

Any note that survives as system truth must be promoted into:
- `ENGI_SPEC_V24.md`,
- `ENGI_SPEC_V24_DELTA.md`,
- `ENGI_SPEC_V24_PARITY_MATRIX.md`,
- a future `ENGI_SPEC_V24_PROVEN.md`,
- or required generated `.engi/v24-*` artifacts once those exist.

## Starting input from V23

V23 closed:
- Bitcoin-facing artifact contracts,
- sidechain-connected bridge posture,
- stubbed-testnet demonstration service carriers,
- prototype compute and storage reality manifests,
- and generated proof and parity closure.

The V24 baseline from V23 is:
- keep Bitcoin as audit and spend substrate,
- keep ENGI compute and private storage off-chain,
- preserve NGI denomination rules,
- preserve principal-scoped disclosure,
- and convert modeled external boundaries into realized audited ones.

## Current V24 center

The strongest V24 center carried into promotion is:
- realize external interfacing rather than extend modeled boundaries,
- add real network-capable Bitcoin and sidechain execution paths,
- add real auditable compute and storage containers,
- add end-to-end real GitHub App interfacings,
- require `production`, `staging`, `development`, and `mock` modes across every external interface,
- require real mode isolation rather than shared test or app posture,
- require proof-bearing execution receipts for all live external effects,
- require exhaustive telemetry and strong environment-matrix coverage,
- and preserve fail-closed auditability across every realized interface.

V24 also carries one supporting metaspec repair:
- restore full-canon, no-silent-inheritance promotion discipline,
- restore strict spec-family carrier enforcement,
- and push those checks down into pre-commit and containerized CI or CD gates.

That repair is intentionally subordinate to the main V24 center.

## Candidate workstreams

### 1. Unified external execution policy

Candidate requirement:
- define one external-execution policy surface spanning bitcoin, sidechain, container, storage, and GitHub execution classes.

### 1a. External environment-mode matrix

Candidate requirement:
- define one environment-mode contract spanning `production`, `staging`, `development`, and `mock` for every external interface.

Candidate binding examples:
- GitHub: distinct GitHub App and installation identities by mode.
- Bitcoin mainchain and sidechain: distinct address and account scopes by mode, with separate staging and development test bindings.
- Compute and storage: distinct registries, namespaces, buckets, endpoints, and retention targets by mode.

### 2. Bitcoin and sidechain live execution

Candidate requirement:
- replace stubbed-testnet demonstration carriers with real network-capable execution classes while preserving audit receipts and journal finalization posture.

### 3. Compute containers

Candidate requirement:
- define auditable compute-container manifests and execution receipts for all real ENGI proof and evaluation workloads.

### 4. Storage containers

Candidate requirement:
- define auditable storage publication, retrieval, and retention receipts for all real ENGI artifact persistence expectations.

### 5. GitHub live interface

Candidate requirement:
- define live session, fetch, branch, and PR mutation receipts that bind GitHub effects back to ENGI identities and proof surfaces.

### 6. Generated evidence and promotion hardening

Candidate requirement:
- do not promote V24 until generated evidence proves the realized external interfaces rather than merely documenting them.

### 7. Telemetry and environment-matrix coverage

Candidate requirement:
- make exhaustive telemetry and mode-aware validation part of the canonical interface contract.

Candidate implication:
- missing telemetry, ambiguous mode binding, or shared cross-mode credentials should fail V24 realization closure.

### 8. Metaspec repair and build enforcement

Candidate requirement:
- promoted V24 must be a full rewrite of current canon rather than a semantic dependency on V23.

Candidate requirement:
- spec-quality enforcement must run in local host-agnostic pre-commit checks, containerized CI or CD, and commit-title-gated spec conformance for `spec: VN` commits.

Candidate implication:
- future spec shrink or checker-profile weakening should fail before promotion.

## Residual V25-facing questions

Current follow-up questions after V24 promotion:
- how much operator-facing deployment guidance should move into a V25 appendix versus remaining in README and environment contracts,
- whether future realized interfaces should extend the existing proof families or open a new cross-interface continuity family,
- whether emulator-backed execution classes beyond current mock and local-executor posture are worth canonizing,
- and which future external surfaces, if any, should join the active mode-isolated execution matrix.

## V24 non-goals preserved after promotion

Promoted V24 still does not:
- move bulk proof computation to Bitcoin mainchain,
- move private artifact payloads to public-chain storage,
- weaken V23 disclosure or settlement posture,
- or treat containerization as non-audited operational detail.
