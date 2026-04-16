# ENGI Spec V26 Notes

## Status

- Scope: working-note companion for the opened V26 draft family centered on Bitcode productionizing hardening, demonstration-to-application integration, application-facing UI replacement, interface hardening, and organizational refurbishment
- Canonical pointer: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC.txt` -> `V25`
- Active canonical anchor: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V25.md`
- Active generated proof appendix: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V25_PROVEN.md`
- Draft spec companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V26.md`
- Draft delta companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V26_DELTA.md`
- Draft parity companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V26_PARITY_MATRIX.md`
- V26 state: active draft family opened; V25 remains the only active canonical truth

## Notes companion rule

This file is no longer the sole V26 opening surface.
V26 now has an opened main/delta/parity draft family.

That means:
- V25 remains the only active canonical system specification.
- V26 may collect unresolved questions, target-package refinements, migration sequencing notes, and reopen conditions while the main spec carries the current draft center.
- V26 still must not be treated as active system truth until promotion is deliberate.

## Current V26 center reminders

The current V26 draft center is:
- Bitcode becomes a first-class application page rather than an embedded or standalone-primary demo,
- demonstration UX is preserved while demonstration UI is replaced by application-facing components,
- interface hardening moves toward live-application-ready posture,
- and repository ownership is reorganized back toward package-first Bitcode system implementations.

The wrong V26 move remains:
- micro-app `engi-demo/` into `uapi/`,
- keep demo-local domain ownership intact,
- and call that integration.

## Still driving V26 from V25 deferrals

The following items remain part of the V26 center because they were deferred from first-gate V25 closure:

- Bitcoin execution hardening beyond V25’s first-gate closure, including deeper operator-grade reality for live topology, credential rotation, and long-run observation policy across Bitcoin mainchain, repeated-read payment, and sidechain execution.
- GitHub interface hardening beyond V25’s first-gate closure, including richer real mutation sequencing, installation lifecycle management, and multi-application operational posture.
- Compute and storage hardening beyond V25’s first-gate closure, including deeper auditability of container image lineage, execution provenance, publication retention, and longer-run reconciliation policy.
- Cross-interface reconciliation and drift posture that goes beyond current first-gate V25 continuity and telemetry closure.
- Build/process refinements that improve operator ergonomics, CI/CD signal quality, and promotion automation beyond what V25 needed to close.
- Rename follow-on cleanup where compatibility carriers intentionally remained stable in V25.

## Open questions for the current draft

### 1. Final application-route path

V26 now locks the route class:
- full-page,
- application-native,
- not homepage-embedded,
- not iframe-dependent.

Still open:
- current source-side candidate now uses `/application` under `uapi/app/application/*` as the stronger carrier for the first-class Bitcode application page,
- current source-side coexistence now includes non-legacy `uapi/app/executions/page.tsx` and `uapi/app/executions/[runId]/page.tsx` so the operator workspace and run-detail routes are application-owned rather than only component-owned,
- current source-side coexistence now also includes non-legacy `uapi/app/orbitals/layout.tsx`, `/orbitals/users`, `/orbitals/connects`, `/orbitals/credits`, and `/orbitals/models`, so the orbital deep-link family is no longer only an implicit pathname contract inside client code,
- the current source-side orbital route layer now defaults those direct `/orbitals/*` surfaces to account/login-first posture instead of signup-first posture, which better matches orbital as the settings owner,
- the current source-side orbital repair also includes replacing the broken `OrbitalsConnectsPane` self-reexport with a real app-owned connects pane centered on GitHub connection state and current VCS components,
- the current source-side orbital rehabilitation now preserves the ringed overlay shell while treating signed-in orbitals as Bitcode settings navigation rather than only sequential onboarding gating,
- the current source-side orbital settings rehab now restores explicit in-pane save actions where settings screens still depended on hidden onboarding-era submit hooks,
- the current source-side orbital/settings pass also keeps catching lingering ENGI-facing copy in touched user-facing strings and moving those surfaces toward Bitcode naming,
- the current source-side settings naming cleanup now reaches organization-facing API key and webhook examples so active user-facing security settings no longer present `engi_*` placeholders,
- `/bitcode` was rejected as an overly product-redundant route/file carrier because the repository and product are already Bitcode,
- the exact route path and surrounding navigation treatment,
- whether Bitcode becomes its own top-level app route,
- and how far `/application` should subsume versus simply stage the existing `executions`/`orbitals` surfaces.

### 2. Final package names and ownership splits

The current V26 main spec includes a draft-opening extraction matrix.
Still open:
- the final package names for Bitcode-specific domain owners,
- whether some draft target owners should be merged,
- and the exact boundary between package-owned domain logic and route-owned application composition.

### 3. Fate of `engi-demo/`

Still open:
- whether `engi-demo/` remains as a fixture/scenario/test carrier,
- whether it becomes a thinner compatibility shell around extracted packages,
- or whether it is eventually removed after extraction is complete.

### 4. Legacy component intake inventory

Still open:
- which legacy UI components are worth recovering,
- which should be normalized into `uapi/components/base/*`,
- which should remain discarded,
- and which recovered components belong to the Bitcode operator page versus general application libraries.

### 5. Auth and wallet production target

Still open:
- current source-side now includes a non-legacy `uapi/app/api/auth/unlink/route.ts` owned through package/application surfaces instead of leaving account unlink behavior as a demo-local or client-only assumption,
- current source-side orbital settings now exposes connected-account management for the active GitHub and Google providers and explicitly marks unsupported providers as unavailable rather than pretending those paths are live,
- current source-side auth/login UI now keeps email-code as the primary entry posture, keeps GitHub and Google as the active linked sign-in providers, and treats wallet connection as staged V26 work rather than as already-production account access,
- exact wallet-verification flow requirements,
- how wallet connection interacts with the current auth/provider model,
- whether wallet is primary, linked, or required only for certain Bitcode actions,
- and how much of the current MetaMask/auth code can be reused without redesign.

### 6. Compatibility-carrier treatment

Still open:
- whether `.engi/*` remains the emitted namespace in V26,
- whether `@engi/*` remains the internal package prefix in V26,
- whether repo-local `ENGI_SPEC_*` remains stable through V26 promotion,
- and which compatibility carriers are worth changing during a productionizing version versus a later dedicated migration version.

## Candidate sequencing notes

The current sequencing bias remains:

1. lock target ownership before UI rewrites,
2. extract package-owned domain layers before collapsing the application surface onto them,
3. replace the UI after the runtime/API ownership model is clear,
4. remove marketing embed posture after the full-page application surface exists,
5. and refresh docs/tests/generated evidence after ownership settles enough to make those updates truthful.

## Non-goals for the current V26 draft-opening pass

The following remain non-goals for this notes companion:
- promoting V26 early,
- treating the draft extraction matrix as already-implemented source truth,
- widening V26 into a new economics or denomination redesign,
- or treating legacy code as canonical merely because it once existed.

## Reopen conditions

Reopen the current V26 draft shape only when:

1. the chosen application route or ownership model proves wrong in source,
2. the extraction matrix needs a different package topology to stay coherent,
3. auth/wallet or GitHub hardening requirements force a broader or narrower version center,
4. or compatibility-carrier migration becomes central enough that V26 needs to name it as a major explicit sub-version concern.
