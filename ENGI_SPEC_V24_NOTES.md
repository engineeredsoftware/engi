# ENGI Spec V24 Notes

## Status

- Scope: non-canonical V24 working notes for realizing external interfacing after V23 deployed-infrastructure canon
- Canonical pointer: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC.txt` -> `V23`
- Active canonical anchor: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V23.md`
- Active generated proof appendix: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V23_PROVEN.md`
- Draft specification target: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V24.md`
- V24 state: drafting only; notes track open shaping questions and implementation follow-ups

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

## Starting inheritance from V23

V23 closed:
- Bitcoin-facing artifact contracts,
- sidechain-connected bridge posture,
- stubbed-testnet demonstration service carriers,
- prototype compute and storage reality manifests,
- and generated proof and parity closure.

The inherited V24 baseline is therefore:
- keep Bitcoin as audit and spend substrate,
- keep ENGI compute and private storage off-chain,
- preserve NGI denomination rules,
- preserve principal-scoped disclosure,
- and convert modeled external boundaries into realized audited ones.

## Current V24 center

The strongest V24 center from the current draft is:
- realize external interfacing rather than extend modeled boundaries,
- add real network-capable Bitcoin and sidechain execution paths,
- add real auditable compute and storage containers,
- add end-to-end real GitHub App interfacings,
- require `production`, `staging`, `development`, and `mock` modes across every external interface,
- require real mode isolation rather than shared test or app posture,
- require proof-bearing execution receipts for all live external effects,
- require exhaustive telemetry and strong environment-matrix coverage,
- and preserve fail-closed auditability across every realized interface.

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

## Open drafting questions

Current questions worth resolving before implementation starts:
- whether V24 should keep separate proof families for network, containers, and GitHub or collapse some of them into a smaller execution family set,
- whether storage publication and retrieval should live in one container family or two linked families,
- what minimum real-network scope is required for V24 first-gate implementation,
- whether GitHub live interfacing should require both read and write paths in the same promotion gate,
- how much telemetry should live in emitted `.engi/` artifacts versus referenced remote logs or traces,
- and whether `mock` mode should be deterministic-only or may include emulator-backed execution classes where the receipt shapes remain identical.

## Initial V24 non-goals

Based on the current draft, V24 should not begin by:
- changing `ENGI_SPEC.txt`,
- weakening V23 disclosure or settlement posture,
- claiming mainchain or GitHub realization before receipts exist,
- or treating containerization as non-audited operational detail.
