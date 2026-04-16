# ENGI Spec V26 Delta

## Status

- Scope: V26 draft delta for Bitcode productionizing hardening, demonstration-to-application integration, application-facing UI replacement, interface hardening, and package-first repository refurbishment after V25 rename canon
- Current canonical/latest target: `V25`
- Canonical pointer: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC.txt` -> `V25`
- Active canonical anchor: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V25.md`
- Active generated proof appendix: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V25_PROVEN.md`
- Prior canonical anchor: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V25.md`
- Prior generated proof appendix: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V25_PROVEN.md`
- Generated structured artifact inventory: active canonical `.engi/v19-*` reproducible reports, `.engi/v20-*` operator-quality reports, `.engi/v25-spec-family-report.json`, `.engi/v25-canonical-input-report.json`, and `.engi/v25-canon-posture-drift-report.json`; V26 generated artifact families are not opened yet
- Spec companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V26.md`
- Parity companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V26_PARITY_MATRIX.md`
- Notes companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V26_NOTES.md`
- Current canonical pointer: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC.txt` -> `V25`
- Source parity state: V26 source closure is not yet implemented; this delta records the planned transition from V25 rename canon to V26 productionizing hardening
- V26 state: active draft family opened; V25 remains the only active canonical truth

## Why V26 exists

V25 completed the active current-facing rename to Bitcode and BTD.
That leaves the next concrete delta:
- the Bitcode demonstration is still a standalone runtime rather than a first-class application page,
- demonstration UI implementation still owns the current Bitcode operator surface,
- the homepage still treats the demonstration as an embedded or standalone companion experience,
- hardening deferred from V25 remains concentrated in demo-local or transitional owners,
- and the repo remains misaligned with the fuller package-first architecture it already advertises.

V26 exists to close that gap.

## Findings that drive V26

### 1. The homepage embed posture is transitional, not architectural closure

Current source still depends on:
- embedded demo sections,
- standalone demo URLs,
- and localhost-oriented demo runtime assumptions.

V26 therefore must move from marketing embed to application-native routing.

### 2. The current demo UX should survive, but the current demo UI should not remain the owner

The Bitcode operator experience already has a useful chain:
- supply,
- need,
- fit,
- ranked candidates,
- branch artifacts,
- settlement,
- policy and proof surfaces.

V26 should preserve that chain.
It should not preserve the demo HTML/client shell as the long-term owner.

### 3. The repo already has the package surfaces needed for a more production-grade posture

Current repo architecture already includes:
- `packages/github`,
- `packages/auth`,
- `packages/api`,
- and a broad workspace pattern.

V26 should converge onto those owners where appropriate rather than leave production responsibilities trapped in demo-local source.

### 4. Organizational refurbishment is part of the version center

V26 is not only:
- application routing work,
- or UI work,
- or auth work,
- or GitHub work.

It is also repository re-ownership work.

## Accepted V26 decisions

The accepted V26 draft-opening decisions are:

1. V26 is productionizing hardening rather than rename follow-on cleanup alone.
2. V25 remains the active behavioral and canonical baseline during V26 drafting.
3. The Bitcode demonstration becomes a first-class application page.
4. The embedded marketing demo posture is removed in the target state.
5. Demonstration UX is preserved; demonstration UI implementation is replaced.
6. Legacy components may be recovered only through normalization into the main component libraries or route-local application surfaces.
7. Bitcode system implementations currently concentrated in `engi-demo/` move to package-owned surfaces.
8. Existing packages such as `packages/github`, `packages/auth`, and `packages/api` are reused where their current ownership already fits the V26 target.
9. Authentication and wallet connection are part of the hardening center.
10. GitHub, bitcoin, sidechain, repeated-read, compute, storage, telemetry, and reconciliation hardening are part of the hardening center.

## Planned delta surface

The V25-to-V26 delta is expected to include:
- application-native Bitcode operator routing,
- removal of marketing-page embedded-demo dependency,
- application-facing UI replacement for the Bitcode operator surface,
- package extraction of Bitcode system implementations from `engi-demo/`,
- GitHub production integration convergence,
- auth and wallet productionization,
- external-interface operational hardening,
- organizational refurbishment of repo ownership,
- and documentation/parity realignment around the new package/app ownership model.

## Explicitly deferred

The current V26 opening does not require:
- a new denomination or tokenomics redesign,
- a full mandatory internal rename of every ENGI-prefixed carrier unless later chosen explicitly,
- or a rewrite of Bitcode operating semantics independent of the productionizing goals.

## Pre-Implementation Sequence

The current V26 sequencing is:

1. open the V26 file family,
2. lock the application-route class for Bitcode,
3. lock the package ownership map,
4. extract Bitcode domain layers out of `engi-demo/`,
5. re-home API/runtime composition into package and application owners,
6. replace demonstration UI with application-facing component composition,
7. remove embedded-demo and standalone-primary posture,
8. harden auth/wallet and live interfaces,
9. refresh docs, tests, parity, and generated evidence,
10. and promote only after V26 closure is proven end-to-end.

## Commit-Body Direction

The eventual V26 canonical commit body should describe:
- application-native Bitcode route adoption,
- removal of embedded-demo-first product posture,
- application-facing UI replacement for the Bitcode operator surface,
- package extraction of Bitcode domain logic out of `engi-demo/`,
- GitHub/auth/API ownership convergence,
- live-interface hardening and reconciliation expansion,
- and repository organizational refurbishment toward the fuller package-first architecture.
