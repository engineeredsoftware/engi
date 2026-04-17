# ENGI Spec V26 Notes

## Status

- Scope: working-note companion for the opened V26 draft family centered on Bitcode productionizing hardening, first-gate application migration, second-gate application UX/UI plus external hardening, third-gate marketing refurbishment, fourth-gate retained-system convergence, and fifth-gate proof/finalization
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
- `/application` is also the only primary Bitcode destination in the intended V26 product posture.
- `engi-demo/` is removed as a directory.
- `packages/bitcode` is the immediate first-gate package owner.
- the preserved first-gate shell now mounts through `uapi/app/application/ApplicationPageClient.tsx`.
- the preserved first-gate JSON contract now runs through app-owned `uapi/app/api/*` route handlers.
- the ringed orbital overlay remains the settings owner for user/account areas.
- conversations remain a fullscreen application workspace entered from within `/application`.
- current executions and deliverables surfaces are reuse reservoirs for inward master-detail porting into `/application`.
- the late-Engi navbar remains the integrated application navigation frame for Bitcode.
- homepage embedded-demo posture remains removed.
- mock-mode `/application` review is part of first-gate closure rather than second-gate work.

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

The current active second-gate application additions now explicitly include:

- `uapi/app/application/ApplicationCommandDeck.tsx`
- `uapi/app/application/ApplicationLiveSummaryStrip.tsx`
- `uapi/app/application/ApplicationSectionAtlas.tsx`
- `uapi/app/application/ApplicationCoreNativeSections.tsx`
- `uapi/app/application/application-shell-sections.ts`
- `uapi/app/application/ApplicationWorkspaceRail.tsx`
- `uapi/app/application/ApplicationRunWorkspace.tsx`
- `uapi/app/application/ApplicationMockRunDetails.tsx`
- `uapi/app/application/application-run-data.ts`
- `uapi/app/conversations/components/ConversationsOverlay.tsx`
- `/api/conversations`
- `/api/conversations/branch`
- `/api/conversations/stream`
- `/api/conversations/[conversationId]/stream`

Those carriers now make fullscreen conversations application-owned from `/application` in mock-mode review instead of leaving the overlay mounted over missing App Router routes.
They also place a central run-and-deliverable master-detail workspace directly inside `/application` instead of leaving inward reuse mostly confined to the right rail or the compatibility `/executions` route.
They also place route-local command and live-summary carriers above the preserved shell, with browser-verified proxying from the application frame into preserved-shell scenario/projection/branch state.
They now also place a route-local body atlas above the preserved shell, with browser-verified card labels and deterministic jump behavior into the live operating, depositing, needing, fit, verification, artifact, settlement, and ledger panels.
They now also place the first native route-local body replacement layer above the preserved shell: application-owned operating, deposit, need, and fit cards that read the live shell surfaces directly and remain browser-verified against the underlying Bitcode panels.

## Still driving V26 from V25 deferrals

The following items still remain part of the V26 center because they were deferred from V25 or from first-gate closure:

- Bitcoin execution hardening beyond rename and first-gate migration.
- GitHub interface hardening beyond modeled or transitional package ownership.
- Compute and storage hardening beyond current preserved first-gate carriers.
- Cross-interface reconciliation and drift posture beyond current first-gate continuity.
- Build and promotion automation improvements beyond the now-updated package path migration.
- Second-gate application-facing refit of the preserved shell.

## Second-gate collaborative design pack now required

The second-gate collaboration pack must now include:
- a full `/application` wireframe set,
- a section decomposition map from first-gate shell sections to second-gate application sections,
- a semantic non-regression ledger,
- a component adoption matrix keyed to `uapi/components/base/*`, route-local app sections, and orbitals/settings carriers,
- an overlay choreography map for fullscreen conversations and orbitals within `/application`,
- a master-detail reuse map for executions and deliverables patterns being ported inward,
- an external interfacing hardening matrix,
- and an acceptance matrix that separates second-gate from third-gate and fourth-gate work.

This pack should be treated as required V26 drafting work before broad second-gate implementation begins.

## Fourth-gate retained-system pack now required

The fourth-gate collaboration pack must now include:
- a conversations and chat-interface retention map,
- a runs/pipelines/deliverables total-system map,
- an inward-port map from current executions/deliverables surfaces into `/application`,
- a retained prompt-space map,
- a retained package admissibility ledger,
- and a proof-family assignment table for retained systems.

This pack should be treated as required V26 drafting work before broad fourth-gate implementation begins.

## Open questions that remain real

### 1. Second-gate application surface shape

Still open:
- how far the preserved first-gate shell should be decomposed into native application-facing components,
- which sections should become route-local React composition first,
- how aggressively the old shell CSS and DOM contract should be retired during second-gate,
- the exact master-detail structure for runs, deliverables, proofs, and history within `/application`,
- the exact fullscreen overlay choreography for conversations relative to the main application workspace,
- how the late-Engi design-system atmosphere should be preserved while the product expression stays entirely Bitcode,
- and which external interfacings must be considered second-gate-stable before the new application page is considered ready.

### 2. Third-gate marketing refurbishment shape

Still open:
- what exactly the public marketing page should inherit from the stabilized second-gate application language,
- which parts of current marketing can remain untouched until after second-gate acceptance,
- and what third-gate acceptance should require versus leave to later refinement.

### 3. Fifth-gate debug and environment controls

Still open:
- where the debug setting should live,
- how the floating debug widget should appear and persist,
- what the minimum environment toggle contract is,
- how environment switching should refresh application state coherently,
- and which additional debug controls are worth carrying in V26 versus later versions.

### 4. Fourth-gate retained-system convergence

Still open:
- how conversations should read as a Bitcode V26 system rather than an adjacent app subsystem,
- how ChatGPT-like interaction should survive as a fullscreen first-class application mode,
- how deliverables should be redefined under Bitcode runs/pipelines,
- how far executions/runs should absorb current pipeline-specific APIs and data while porting their strongest master-detail patterns into `/application`,
- which retained packages are admissible,
- and what proof obligations each retained package must satisfy to stay in V26.

### 5. Longer-term package splitting after `packages/bitcode`

Still open:
- whether `packages/bitcode` remains the long-term owner,
- which second-gate or later package seams should split out,
- and which of those seams belong in existing owners like `packages/github` or `packages/api`.

### 6. Legacy component intake policy

Still open:
- which non-legacy current base/common components should be extended first,
- which styling patterns from the current app shell should be absorbed into second-gate Bitcode sections,
- and which former legacy ideas are worth forward-porting only after they are rebuilt into current owners.

### 7. Auth and wallet production target

Still open:
- exact wallet verification flow requirements,
- how wallet connection interacts with the current auth/provider model,
- whether wallet is primary, linked, or action-scoped,
- and how much of the current MetaMask/auth code can be reused without redesign.

### 8. Compatibility-carrier treatment

Still open:
- whether `.engi/*` remains the emitted namespace in V26,
- whether `@engi/*` remains the internal package prefix in V26,
- whether repo-local `ENGI_SPEC_*` remains stable through V26 promotion,
- and which compatibility carriers are worth changing during a productionizing version versus later dedicated migration work.

### 9. Fifth-gate proof precision and closure

Still open:
- the exact theorem/member structure for the new V26 proof families,
- how retained-package admissibility verdicts should be generated,
- how prompt-space proofs and application-composition proofs should join the existing Bitcode proof family catalog,
- and what minimum closure signal is required before V26 can be considered formally complete.

### 10. Later-gate Bitcode rename completion

Still open:
- full Bitcode rename completion remains later-gate work rather than first-gate,
- first-gate may preserve compatibility carriers while package/app migration closes,
- fourth-gate should return to remaining active-source rename debt after second-gate and third-gate stability are established,
- and any remaining ENGI-era naming that survives first-gate must be cataloged and intentionally retired rather than left implicit.

## Current sequencing bias

The current sequencing bias is:

1. keep first-gate source stable,
2. keep spec/parity/generated tooling synchronized to first-gate file structure,
3. preserve the now-closed first-gate anonymous and signed-in app behavior while deeper hardening proceeds,
4. execute second-gate application UX/UI plus external hardening,
5. execute third-gate marketing refurbishment,
6. execute fourth-gate retained-system convergence,
7. execute fifth-gate proof/finalization including debug/environment controls,
8. then refresh generated evidence and promotion checks.

## Non-goals for these notes

The following remain non-goals for this notes companion:
- promoting V26 early,
- pretending first-gate already completes second-gate application experience work,
- widening V26 into economics redesign,
- or treating `_legacy/` code as current truth.
