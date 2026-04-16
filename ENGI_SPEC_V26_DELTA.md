# ENGI Spec V26 Delta

## Status

- Scope: V26 draft delta for Bitcode productionizing hardening, first-gate application migration, second-gate application-experience refit, interface hardening, and package-first repository refurbishment after V25 rename canon
- Current canonical/latest target: `V25`
- Canonical pointer: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC.txt` -> `V25`
- Active canonical anchor: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V25.md`
- Active generated proof appendix: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V25_PROVEN.md`
- Spec companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V26.md`
- Parity companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V26_PARITY_MATRIX.md`
- Notes companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V26_NOTES.md`
- Source parity state: V26 first-gate source closure is now materially in place while second-gate application-facing refit remains open
- V26 state: active draft family opened; V25 remains the only active canonical truth

## Why V26 exists

V25 completed the active current-facing rename to Bitcode and BTD.
V26 exists because rename closure was not architectural closure.

The concrete V26 delta is:
- the old standalone demonstration ownership had to be removed,
- the Bitcode operator route had to become app-native,
- the repo had to stop treating `engi-demo/` as the primary system owner,
- the preserved operator UX had to survive the ownership move,
- and production hardening had to continue beyond V25’s first rename gate.

## First-Gate and Second-Gate Structure

### First-gate

First-gate is the ownership migration gate.
Its rule is:
- keep the Bitcode operator UX, content, ordering, interactions, and deterministic state contract effectively the same,
- move the runtime and shell contract into package/app ownership,
- remove `engi-demo/` as a directory,
- and make the application page the live carrier.

First-gate does **not** require deep application-experience redesign.
It requires exact preservation while ownership moves.

### Second-gate

Second-gate is the application-experience gate.
Its rule is:
- keep the first-gate operator semantics,
- replace preserved shell implementation surfaces with native application-facing composition,
- converge more of the page onto `uapi/components/base/*`,
- and complete the more thorough Bitcode application refit.

## Current First-Gate File Structure

The current first-gate V26 structure is:

- `packages/bitcode/package.json`
  Bitcode is now a workspace package owner rather than a top-level standalone app directory.
- `packages/bitcode/src/*`
  Canon posture, deterministic state machine, proof, settlement, projection, and external-realization code moved under package ownership.
- `packages/bitcode/public/app.js`
  The preserved first-gate shell behavior now lives under package ownership and is mounted by the application route instead of by a standalone server-owned HTML page.
- `packages/bitcode/public/styles.css`
  The preserved first-gate shell stylesheet now serves the app-owned route.
- `packages/bitcode/server.js`
  The deterministic runtime/context remains available as package-owned HTTP/runtime composition instead of as `engi-demo/server.js`.
- `packages/bitcode/test/*`
  First-gate proof/runtime validation moved with the package owner.
- `uapi/app/application/page.tsx`
  `/application` remains the Bitcode first-class route carrier.
- `uapi/app/application/ApplicationPageClient.tsx`
  The application route now renders the preserved first-gate Bitcode shell markup directly in the app.
- `uapi/app/application/first-gate-styles/route.ts`
  The application route serves the preserved first-gate stylesheet as an app-owned surface.
- `uapi/lib/bitcode-app-context.ts`
  Shared app-owned bridge from Next route handlers into the package-owned Bitcode context.
- `uapi/app/api/state/route.ts`
- `uapi/app/api/deposits/route.ts`
- `uapi/app/api/make-engi-branch/route.ts`
- `uapi/app/api/reset/route.ts`
- `uapi/app/api/bitcoin-demonstration-service/route.ts`
- `uapi/app/api/v24/external-realization/route.ts`
- `uapi/app/api/v24/executors/[interfaceId]/route.ts`
  These now carry the preserved first-gate JSON contract from the application instead of from a standalone demo server.

## Accepted V26 decisions

The accepted V26 decisions are now:

1. V26 is productionizing hardening rather than rename follow-on cleanup alone.
2. V25 remains the active behavioral and canonical baseline during V26 drafting.
3. `/application` is the first-gate Bitcode route carrier.
4. The homepage embedded demo posture is removed.
5. `engi-demo/` no longer exists as a source directory.
6. First-gate preserves the old Bitcode operator UX and deterministic state/API contract under new package/app ownership.
7. First-gate uses `packages/bitcode` as the immediate package owner.
8. Second-gate remains the deeper application-facing component and styling refit.
9. Existing packages such as `packages/github`, `packages/auth`, and `packages/api` still remain convergence targets where that ownership is the correct long-term fit.
10. Authentication, wallet posture, GitHub, bitcoin, sidechain, repeated-read, compute, storage, telemetry, and reconciliation remain in scope for V26 hardening.

## Remaining V26 delta after first-gate

The remaining V26 delta is now concentrated in:
- second-gate application-experience refit of the preserved Bitcode shell,
- deeper package splitting beyond the immediate `packages/bitcode` consolidation owner,
- GitHub convergence onto longer-term package/API owners,
- wallet productionization,
- deeper auth hardening,
- richer external-interface hardening,
- telemetry and reconciliation hardening,
- and repo/documentation cleanup that removes stale standalone-demo language.

## Explicitly deferred

The current V26 draft does not require:
- a new denomination or tokenomics redesign,
- a canonical redefinition of the Bitcode operating chain itself,
- or direct `_legacy/` reuse as source truth.

## Current sequencing

The current V26 sequencing is now:

1. complete first-gate route/package migration,
2. keep spec, parity, and generated tooling synchronized to the new file structure,
3. close remaining first-gate hardening gaps around auth and interface surfaces,
4. execute second-gate application-facing refit,
5. refresh generated evidence and promotion checks,
6. and promote only after V26 closure is proven end-to-end.

## Commit-Body Direction

The eventual V26 canonical commit body should describe:
- removal of `engi-demo/` as a top-level directory,
- adoption of `packages/bitcode` as the first-gate package owner,
- app-owned `/application` and `/api/*` carriage of the preserved Bitcode shell contract,
- removal of embedded-demo-first product posture,
- second-gate application-experience work still remaining,
- and repository organizational refurbishment toward the fuller package-first architecture.
