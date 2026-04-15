# ENGI Spec V24 Delta

## Status

- Scope: V24 draft delta for realizing external interfacing after V23 deployed-infrastructure canon
- Current canonical/latest target: `V23`
- Current draft target: `V24`
- Active canonical anchor: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V23.md`
- Active generated proof appendix: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V23_PROVEN.md`
- Draft companion spec: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V24.md`
- Draft companion parity ledger: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V24_PARITY_MATRIX.md`
- Draft companion notes file: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V24_NOTES.md`
- Pointer state remains: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC.txt` -> `V23`

## Why V24 exists

V23 closed first-gate deployed infrastructure with:
- bitcoin-facing artifacts,
- commitment-scope policy,
- sidechain-connected bridge posture,
- compute and storage reality manifests,
- and deterministic stubbed-testnet demonstration service code.

That leaves the next delta:
- real network execution instead of demonstration receipts,
- real container execution instead of posture-only reality manifests,
- and real GitHub boundary execution instead of modeled or partially prototyped interfacing.

V24 exists to close that realization gap.

## Findings that drive V24

### 1. V23 already names the right boundaries

The Bitcoin, sidechain, compute, storage, and GitHub boundaries are already present as explicit contracts or obvious adjacent external surfaces.
V24 therefore does not need to rediscover the boundary map.
It needs to realize it.

### 2. ENGI needs one external-realization model

Real mainchain execution, real sidechain execution, real container execution, and real GitHub execution should not become four unrelated integration stories.
V24 treats them as one execution-receipt model with shared audit obligations.

### 3. Real execution must still be proof-bearing

Success in an external system is insufficient if ENGI cannot prove:
- what it intended,
- what actually executed,
- what was observed,
- and how that effect bound back to ENGI artifacts and settlement.

## Accepted V24 drafting decisions

The current accepted V24 drafting decisions are:

1. V24 is realization-facing.
2. V24 keeps V23 active while drafting proceeds.
3. Real BTC-backed execution is in scope, including mainchain and sidechain-connected bridge posture.
4. Auditable compute and storage containers are in scope for all real ENGI usages and specification expectations.
5. End-to-end real GitHub App interfacings are in scope.
6. Every realized external interface must emit proof-bearing intent, execution, and observation receipts.
7. Every realized external interface must support `production`, `staging`, `development`, and `mock` modes.
8. Mode separation must be real: distinct external identities, applications, addresses, accounts, namespaces, and publication targets are required by mode.
9. Exhaustive telemetry and environment-matrix coverage are part of realization, not post-hoc hardening.
10. V24 opens three draft proof families:
   - `external-realization-execution`
   - `containerized-reality`
   - `github-live-interface`
11. V24 keeps ENGI as the system name and NGI as the unit denomination.
12. V24 promotion will require source, tests, generated evidence, and fail-closed validation, not only draft language.

## Explicitly deferred

Still explicitly deferred beyond first-gate V24 drafting:
- any claim that V24 is already promoted,
- any claim that source already executes these real network and container paths,
- any claim that bulk private proof storage belongs on Bitcoin mainchain,
- and any claim that GitHub mutation side effects are acceptable without ENGI-side receipts.

## Draft implementation sequence

The intended V24 sequencing is:

1. draft the V24 file family while V23 remains the active canon,
2. define the four-mode environment matrix and isolation requirements for all external interfaces,
3. define the realized external-execution artifact family,
4. define container execution and storage publication artifacts,
5. define GitHub live-session, fetch, branch, and PR execution artifacts,
6. define telemetry policy and telemetry-summary artifacts,
7. define proof families and replay expectations for those realized external effects,
8. define first-gate acceptance criteria for review,
9. implement source emission for the new artifacts,
10. add fail-closed validation and environment-matrix tests,
11. generate V24 evidence,
12. and promote only after those closure conditions are satisfied.

## Commit-body direction

The eventual V24 canonical commit body should describe:
- real external execution classes added to source,
- real compute and storage container attestation surfaces,
- real GitHub session and mutation receipt surfaces,
- new proof families and validation rules,
- generated V24 evidence,
- and explicit continued honesty about any remaining live-boundary deferrals.
