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

An initial source slice now exists for the draft target:
- `engi-demo/src/canonical/v24-external-realization.js` emits a unified environment-mode descriptor,
- `engi-demo/server.js` exposes that descriptor at `/api/v24/external-realization`,
- and tests already close over four-mode isolation and telemetry-policy posture.

V24 also carries one bounded metaspec repair because the current drafting path exposed a specification-quality regression:
- `ENGI_SPEC_V22.md` was materially larger and more complete than V23 or the current V24 draft,
- V23 narrowed the effective conformance carrier set instead of preserving full-canon restatement,
- and future external-realization work would be under-specified if V24 repeated that pattern.

That metaspec repair is a supporting V24 track, not the majority focus.
The majority focus remains real Bitcoin, sidechain, storage, compute, and GitHub interfacing.

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

### 4. V24 must repair no-silent-inheritance discipline without replacing the version center

The V22 -> V23 -> V24 shrink exposed two problems:
- current-system meaning moved out of the main `SPEC`,
- and V23 tooling allowed a narrower conformance profile than the complete specifying standard.

V24 therefore needs:
- a promoted full-system rewrite rather than another delta-shaped shell,
- strict conformance enforcement that matches `ENGI_SPECIFYING.md`,
- and build-process gates that make future metaspec regressions hard to land.

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
13. V24 promotion will also require full-canon restatement and strict spec-quality enforcement so a promoted V24 no longer depends semantically on V23.
14. V24 build-process enforcement will include host-agnostic pre-commit basics, containerized CI or CD conformance, and commit-title-gated spec checks for `spec: VN` commits.

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
11. restore full-canon coverage carriers and strict spec-family conformance,
12. add host-agnostic pre-commit and containerized CI or CD enforcement for spec-quality gates,
13. generate V24 evidence,
14. and promote only after those closure conditions are satisfied.

## Commit-body direction

The eventual V24 canonical commit body should describe:
- real external execution classes added to source,
- real compute and storage container attestation surfaces,
- real GitHub session and mutation receipt surfaces,
- full-canon metaspec repair and strict spec-quality enforcement,
- new proof families and validation rules,
- generated V24 evidence,
- and explicit continued honesty about any remaining live-boundary deferrals.
