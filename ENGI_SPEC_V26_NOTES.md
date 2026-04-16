# ENGI Spec V26 Notes

## Status

- Scope: working-note companion for the opened V26 draft family centered on Bitcode productionizing hardening, first-gate application migration, second-gate application-facing refit, interface hardening, and organizational refurbishment
- Canonical pointer: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC.txt` -> `V25`
- Active canonical anchor: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V25.md`
- Active generated proof appendix: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V25_PROVEN.md`
- Draft spec companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V26.md`
- Draft delta companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V26_DELTA.md`
- Draft parity companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V26_PARITY_MATRIX.md`
- V26 state: active draft family opened; V25 remains the only active canonical truth

## Notes companion rule

This file carries unresolved or still-moving V26 notes only.
It does not reopen the already-landed first-gate source decisions unless source truth actually changes.

## First-gate decisions now treated as settled

The following items are no longer open draft questions:

- `/application` is the first-gate Bitcode route carrier.
- `engi-demo/` is removed as a directory.
- `packages/bitcode` is the immediate first-gate package owner.
- the preserved first-gate shell now mounts through `uapi/app/application/ApplicationPageClient.tsx`.
- the preserved first-gate JSON contract now runs through app-owned `uapi/app/api/*` route handlers.
- the ringed orbital overlay remains the settings owner for user/account areas.
- homepage embedded-demo posture remains removed.

## Current first-gate source reminders

The current first-gate source shape is:

- `packages/bitcode/src/*`
- `packages/bitcode/public/*`
- `packages/bitcode/server.js`
- `packages/bitcode/test/*`
- `uapi/app/application/*`
- `uapi/app/api/*`
- `uapi/lib/bitcode-app-context.ts`

In current source, the app-owned first-gate API surface now explicitly includes:

- `/api/state`
- `/api/deposits`
- `/api/make-bitcode-branch`
- `/api/make-engi-branch`
- `/api/reset`
- `/api/bitcoin-demonstration-service`
- `/api/orbitals/data`
- `/api/v24/external-realization`
- `/api/v24/executors/[interfaceId]`

This is the current V26 source carrier, even while V25 remains the only active canon.

## Still driving V26 from V25 deferrals

The following items still remain part of the V26 center because they were deferred from V25 or from first-gate closure:

- Bitcoin execution hardening beyond rename and first-gate migration.
- GitHub interface hardening beyond modeled or transitional package ownership.
- Compute and storage hardening beyond current preserved first-gate carriers.
- Cross-interface reconciliation and drift posture beyond current first-gate continuity.
- Build and promotion automation improvements beyond the now-updated package path migration.
- Second-gate application-facing refit of the preserved shell.

## Open questions that remain real

### 1. Second-gate application surface shape

Still open:
- how second-gate application wireframing should be produced and used before deeper UI/component replacement,
- how far the preserved first-gate shell should be decomposed into native application-facing components,
- which sections should become route-local React composition first,
- and how aggressively the old shell CSS and DOM contract should be retired during second-gate.

### 2. Longer-term package splitting after `packages/bitcode`

Still open:
- whether `packages/bitcode` remains the long-term owner,
- which second-gate or later package seams should split out,
- and which of those seams belong in existing owners like `packages/github` or `packages/api`.

### 3. Legacy component intake policy

Still open:
- which non-legacy current base/common components should be extended first,
- which styling patterns from the current app shell should be absorbed into second-gate Bitcode sections,
- and which former legacy ideas are worth forward-porting only after they are rebuilt into current owners.

### 4. Auth and wallet production target

Still open:
- exact wallet verification flow requirements,
- how wallet connection interacts with the current auth/provider model,
- whether wallet is primary, linked, or action-scoped,
- and how much of the current MetaMask/auth code can be reused without redesign.

### 5. Compatibility-carrier treatment

Still open:
- whether `.engi/*` remains the emitted namespace in V26,
- whether `@engi/*` remains the internal package prefix in V26,
- whether repo-local `ENGI_SPEC_*` remains stable through V26 promotion,
- and which compatibility carriers are worth changing during a productionizing version versus later dedicated migration work.

### 6. Second-gate Bitcode rename completion

Still open:
- full Bitcode rename completion remains part of second-gate rather than first-gate,
- first-gate may preserve compatibility carriers while package/app migration closes,
- second-gate should return to remaining active-source rename debt after first-gate closure is stable,
- and any remaining ENGI-era naming that survives first-gate must be cataloged and intentionally retired rather than left implicit.

## Current sequencing bias

The current sequencing bias is:

1. keep first-gate source stable,
2. keep spec/parity/generated tooling synchronized to first-gate file structure,
3. finish first-gate hardening gaps,
4. execute second-gate application-facing refit,
5. then refresh generated evidence and promotion checks.

## Non-goals for these notes

The following remain non-goals for this notes companion:
- promoting V26 early,
- pretending first-gate already completes second-gate application experience work,
- widening V26 into economics redesign,
- or treating `_legacy/` code as current truth.
