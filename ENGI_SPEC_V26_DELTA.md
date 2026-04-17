# ENGI Spec V26 Delta

## Status

- Scope: V26 draft delta for Bitcode productionizing hardening, first-gate application migration, second-gate application-experience refit, interface hardening, and package-first repository refurbishment after V25 rename canon
- Current canonical/latest target: `V25`
- Canonical pointer: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC.txt` -> `V25`
- Active canonical anchor: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V25.md`
- Active generated proof appendix: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V25_PROVEN.md`
- Prior canonical anchor: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V25.md`
- Prior generated proof appendix: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V25_PROVEN.md`
- Generated structured artifact inventory: active canonical `.engi/v19-*` reproducible reports, `.engi/v20-*` operator-quality reports, `.engi/v25-spec-family-report.json`, `.engi/v25-canonical-input-report.json`, and `.engi/v25-canon-posture-drift-report.json`; V26 preview artifacts remain `.engi/v26-spec-family-report.json`, `.engi/v26-canonical-input-report.json`, and `ENGI_SPEC_V26_PROVEN.md`
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

## Gate Structure

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

Second-gate is the application UX/UI and external-interfacing hardening gate.
Its rule is:
- keep the first-gate operator semantics,
- replace preserved shell implementation surfaces with native application-facing composition,
- keep `/application` as the only primary Bitcode destination,
- keep conversations and orbitals as fullscreen overlays entered from within `/application`,
- port the strongest executions/deliverables master-detail patterns inward to `/application`,
- retain the late-Engi navbar as the application navigation frame,
- converge more of the page onto `uapi/components/base/*`,
- keep the visual atmosphere aligned to the late-Engi design system while the product itself is entirely Bitcode,
- and harden the new application page plus its external interfacings up to stable readiness.

### Third-gate

Third-gate is the marketing refurbishment gate.
Its rule is:
- keep marketing work separate from application-route acceptance,
- refurbish the public website only after second-gate application work is stable,
- and avoid letting marketing-page changes blur application acceptance criteria.

Its current draft-only content spine is:
- where + when:
  engineering economy participants
- who:
  producers, consumers, investors, partners, researchers
- how:
  auditable, proved, open
- what:
  observable, modular, hackable
- why:
  throughput, quality, trust

### Fourth-gate

Fourth-gate is the retained-system convergence gate.
Its rule is:
- keep conversations and the chat-based application interface as first-class systems,
- keep those systems mounted from the application context rather than as the finished product topology,
- port those systems into Bitcode V26 semantics,
- converge runs, pipelines, and deliverable meaning onto a V26 total system,
- treat current executions/deliverables surfaces as reusable master-detail/workspace carriers to port into `/application`,
- require prompt abstraction to directly own retained prompt text,
- and admit retained packages only where V26 gives them an explicit role.

### Fifth-gate

Fifth-gate is the proof precision, closure, and promotion-finalization gate.
Its rule is:
- close V26 only under explicit proof-family precision,
- add the debug setting and floating debug widget,
- ensure the environment toggle refreshes the application coherently,
- prove production/staging/development mode behavior,
- and finish rename/finalization cleanup required for promotion.

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
- `uapi/app/api/make-bitcode-branch/route.ts`
- `uapi/app/api/make-engi-branch/route.ts`
- `uapi/app/api/reset/route.ts`
- `uapi/app/api/bitcoin-demonstration-service/route.ts`
- `uapi/app/api/orbitals/data/route.ts`
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
8. First-gate review must work through `/application` in mock mode so interface quality can be inspected without live external data.
9. Second-gate is application UX/UI plus external-interfacing hardening, not marketing refurbishment.
10. Third-gate is the marketing refurbishment gate.
11. Fourth-gate ports retained conversations, runs/pipelines, deliverables, prompt abstraction, and retained agent/tool layers into the V26 total system.
12. `/application` is the only primary Bitcode destination in the finished V26 product posture.
13. Orbitals and conversations are fullscreen overlays entered from within `/application` rather than peer product destinations.
14. Existing executions/deliverables systems are master-detail reuse reservoirs to be ported inward rather than preserved as the lasting topology.
15. The late-Engi navbar remains the integrated application navigation frame for Bitcode.
16. Fifth-gate carries mandatory proof closure/finalization work including the debug widget, environment toggle, environment completeness, retained-package proving, and remaining rename cleanup.
17. Existing packages such as `packages/github`, `packages/auth`, and `packages/api` still remain convergence targets where that ownership is the correct long-term fit.
18. Authentication, wallet posture, GitHub, bitcoin, sidechain, repeated-read, compute, storage, telemetry, and reconciliation remain in scope for V26 hardening.

## Remaining V26 delta after first-gate

The remaining V26 delta is now concentrated in:
- second-gate application UX/UI refit of the preserved Bitcode shell,
- second-gate external-interfacing hardening for stable readiness in the new application page,
- second-gate single-surface application composition around `/application`,
- third-gate marketing refurbishment,
- fourth-gate retained-system convergence for conversations, runs/pipelines, deliverables, prompts, and retained agent/tool layers,
- fifth-gate debug/finalization work including the floating debug widget and environment toggle,
- production, staging, and development mode completeness within the new application expression,
- deeper package splitting beyond the immediate `packages/bitcode` consolidation owner,
- GitHub convergence onto longer-term package/API owners,
- wallet productionization,
- deeper auth hardening,
- richer external-interface hardening,
- telemetry and reconciliation hardening,
- and repo/documentation cleanup that removes stale standalone-demo language.

## Precise second-gate specification targets

Second-gate is now specified as:
- route-local native application composition for `/application`,
- `/application` as the only primary Bitcode destination,
- `master detail`, `conversations`, and `orbitals` as the three main Bitcode application experiences,
- `give` and `need` as the two main Bitcode operator actions,
- fullscreen conversations and orbitals entered from within `/application`,
- inward porting of executions/deliverables master-detail reuse patterns,
- retention of the late-Engi navbar as the application frame,
- semantic preservation of the carried first-gate Bitcode operator flow,
- explicit reuse of current `uapi/components/base/*` and orbitals/settings carriers where those owners fit,
- preservation of the late-Engi aesthetic atmosphere while the product identity remains entirely Bitcode,
- and stable-readiness hardening for the application-facing external interfacings visible through the new page.

The current active second-gate source file additions are:
- `uapi/app/application/ApplicationCommandDeck.tsx`
- `uapi/app/application/ApplicationExperienceFrame.tsx`
- `uapi/app/application/ApplicationExternalInterfacingPanel.tsx`
- `uapi/app/application/ApplicationLiveSummaryStrip.tsx`
- `uapi/app/application/ApplicationRepositoryContextPanel.tsx`
- `uapi/app/application/ApplicationSectionAtlas.tsx`
- `uapi/app/application/ApplicationCoreNativeSections.tsx`
- `uapi/app/application/ApplicationClosureNativeSections.tsx`
- `uapi/app/application/ApplicationRunActivitySurface.tsx`
- `uapi/app/application/ApplicationRunDetailSurface.tsx`
- `uapi/app/application/application-external-runtime.ts`
- `uapi/app/application/application-experience-architecture.ts`
- `uapi/app/application/application-run-activity.ts`
- `uapi/app/application/application-run-detail.ts`
- `uapi/app/application/application-repository-context.ts`
- `uapi/app/application/application-shell-sections.ts`
- `uapi/app/application/application-shell-reading.ts`
- `uapi/app/application/ApplicationWorkspaceRail.tsx`
- `uapi/app/application/ApplicationRunWorkspace.tsx`
- `uapi/app/application/ApplicationMockRunDetails.tsx`
- `uapi/app/application/application-run-data.ts`
- `uapi/app/api/conversations/route.ts`
- `uapi/app/api/conversations/branch/route.ts`
- `uapi/app/api/conversations/stream/route.ts`
- `uapi/app/api/conversations/[conversationId]/stream/route.ts`
- `uapi/app/api/vcs/[provider]/connection/route.ts`
- `uapi/app/api/vcs/[provider]/oauth/route.ts`
- `uapi/app/api/vcs/[provider]/connect-token/route.ts`
- `uapi/app/api/vcs/[provider]/repositories/route.ts`
- `uapi/app/conversations/components/ConversationsOverlay.tsx`
- `uapi/tests/applicationRepositoryContext.test.ts`
- `uapi/tests/applicationExternalRuntime.test.ts`
- `uapi/tests/applicationRunActivity.test.ts`
- `uapi/tests/applicationRunDetail.test.ts`
- `uapi/tests/api/externalRealizationRoute.test.ts`
- `packages/bitcode/V26_APPLICATION_SYSTEMS.md`
- `packages/bitcode/V26_PROOF_SURFACES.md`

The second-gate mandatory design outputs are:
1. section wireframes,
2. semantic non-regression ledger,
3. component adoption matrix,
4. external interfacing hardening matrix,
5. modular supplementary-doc rewrite map,
6. and second-gate acceptance matrix.

Second-gate acceptance is reached only when:
- `/application` is no longer primarily a carried monolithic shell implementation,
- `/application` is the primary Bitcode destination and carries the converged workspace,
- `/application` clearly reads as the master-detail experience,
- conversations and orbitals clearly read as the other two main experiences rather than peer product destinations,
- the give and need actions are explicit in the master-detail workspace,
- runs, deliverables, proofs, and history are explicit as the four master-detail substructures inside `/application`,
- route-local architecture framing names the three experiences and two actions directly in the live application UI,
- route-local repository context makes provider connection posture and selected repository supply explicit inside the give-side application frame,
- route-local external-runtime posture makes environment mode, actuality disposition, and per-interface blocking state explicit inside `/application`,
- conversations and orbitals are entered as fullscreen overlays without leaving application context,
- route-local command, posture, and summary surfaces drive and mirror preserved-shell state coherently,
- route-local body atlas cards mirror the preserved shell panels and jump into the live Bitcode sections coherently,
- route-local native operating, deposit, need, and fit cards now read the live shell surfaces through application-owned composition,
- selected-run detail normalizes into one application-owned carrier and deliverable-reading behavior is reachable in both live and mock posture within `/application`,
- the page is composed through application-native route-local sections and current component-system carriers,
- the route still preserves Bitcode semantics,
- second-gate repository documents stay synchronized to active source, with supplementary modular docs identified where the canon is not the correct carrier,
- the active module namespace is `@bitcode/*` across package manifests, path aliases, and active source imports,
- new second-gate code systems are assigned proof/test/spec coverage rather than being treated as incidental glue,
- the external interfacings used by the page behave with stable readiness,
- and orbitals still read as the settings owner rather than as displaced onboarding residue.

## Precise fourth-gate specification targets

Fourth-gate is now specified as:
- porting conversations and the chat-based application interface into Bitcode V26 semantics,
- keeping conversations as a fullscreen application mode rather than a peer product destination,
- converging non-orbital execution/API/data systems onto Bitcode runs and pipelines,
- redefining deliverable as a Bitcode V26 run/pipeline output meaning,
- porting current executions/deliverables master-detail and inspection patterns inward to `/application`,
- routing retained prompt text through prompt abstraction and the proved prompt space,
- and retaining packages only when V26 explicitly admits and proves their role.

Fourth-gate acceptance is reached only when:
- conversations remain first-class,
- conversations operate from application context as a fullscreen Bitcode mode,
- runs/pipelines form a coherent Bitcode V26 system,
- execution/deliverable workspace reuse is ported inward to `/application`,
- prompt abstraction directly owns retained prompt text,
- retained agent/tool abstractions have explicit V26 roles,
- and retained packages are admitted intentionally with proof obligations.

## Precise fifth-gate specification targets

Fifth-gate is now specified as:
- complete proof precision and closure for the kept V26 system,
- debug/environment controls required for proving mode coherence,
- full production/staging/development mode completeness,
- retained-package admissibility proof,
- and promotion-finalization cleanup.

Fifth-gate acceptance is reached only when:
- the required proof families are generated,
- their closure verdicts are explicit,
- debug/environment behavior is proven coherent,
- and V26 can be promoted without relying on informal interpretation across merged systems.

## Explicitly deferred

The current V26 draft does not require:
- a new denomination or tokenomics redesign,
- a canonical redefinition of the Bitcode operating chain itself,
- or direct `_legacy/` reuse as source truth.

## Pre-Implementation Sequence

The current V26 sequencing is now:

1. keep the now-landed first-gate route/package migration stable,
2. keep spec, parity, and generated tooling synchronized to the new file structure,
3. preserve anonymous and signed-in first-gate app/interface behavior while deeper V26 hardening proceeds,
4. execute second-gate application UX/UI plus external-interfacing hardening,
5. execute third-gate marketing refurbishment,
6. execute fourth-gate retained-system convergence,
7. execute fifth-gate proof/finalization including debug/environment controls,
8. refresh generated evidence and promotion checks,
9. and promote only after V26 closure is proven end-to-end.

## Commit-Body Direction

The eventual V26 canonical commit body should describe:
- removal of `engi-demo/` as a top-level directory,
- adoption of `packages/bitcode` as the first-gate package owner,
- app-owned `/application` and `/api/*` carriage of the preserved Bitcode shell contract,
- removal of embedded-demo-first product posture,
- second-gate application-experience work still remaining,
- and repository organizational refurbishment toward the fuller package-first architecture.
