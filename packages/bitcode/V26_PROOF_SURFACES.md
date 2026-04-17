# V26 Proof Surfaces

## Status

- Scope: non-canonical supplementary proof and coverage map for V26
- Canonical pointer: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC.txt -> V25`
- Active draft target: `ENGI_SPEC_V26.md`
- Purpose: map new V26 code systems to proof/test/spec expectations while the largest convergence pass in repo history is underway

## Rule

This file is not canonical proof truth.
Canonical proof obligations live in:
- `ENGI_SPEC_V26.md`
- `ENGI_SPEC_V26_DELTA.md`
- `ENGI_SPEC_V26_PARITY_MATRIX.md`
- and the generated proof appendices/report artifacts when V26 reaches closure

This document exists so V26 implementation can add new code without losing coverage discipline.

## Coverage principle

Any new or newly repurposed V26 system must have all three:
1. specification coverage
2. test coverage
3. proof-surface assignment

V26 does not allow large application glue layers to accumulate without explicit coverage expectations.
The provable space is expected to grow materially in V26 as more package code, application surfaces, and reused component/system carriers are admitted into the converged Bitcode system.

## Gate coverage map

### Gate 2: application UX/UI and external interfacings

Required system families:
- `/application` architecture framing
- native master-detail sections
- conversations overlay entry and app-owned routes
- orbitals/settings overlay entry and app-owned settings data
- app-owned VCS surfaces required for connections and repository context

Current active carriers:
- `uapi/app/application/ApplicationExperienceFrame.tsx`
- `uapi/app/application/ApplicationCommandDeck.tsx`
- `uapi/app/application/ApplicationActionWorkbenchCard.tsx`
- `uapi/app/application/ApplicationExternalInterfacingPanel.tsx`
- `uapi/app/application/ApplicationGiveNeedWorkbench.tsx`
- `uapi/app/application/ApplicationRepositoryContextPanel.tsx`
- `uapi/app/application/ApplicationCoreNativeSections.tsx`
- `uapi/app/application/ApplicationClosureNativeSections.tsx`
- `uapi/app/application/ApplicationLiveSummaryStrip.tsx`
- `uapi/app/application/ApplicationRunWorkspace.tsx`
- `uapi/app/application/ApplicationWorkspaceRail.tsx`
- `uapi/app/application/application-closure-state.ts`
- `uapi/app/application/application-external-runtime.ts`
- `uapi/app/application/application-live-summary.ts`
- `uapi/app/application/application-give-need-workbench.ts`
- `uapi/app/application/application-repository-context.ts`
- `uapi/app/api/conversations/*`
- `uapi/app/api/orbitals/data/route.ts`
- `uapi/app/api/vcs/[provider]/*`
- `uapi/app/api/v24/external-realization/route.ts`
- `packages/bitcode/src/client-entry.js`
- `packages/bitcode/public/app.js`

Required coverage posture:
- spec:
  architecture, ownership, and acceptance described in `ENGI_SPEC_V26*`
- tests:
  route tests, UI tests, and browser verification for active entry flows
- proof surface:
  parity ledger rows and explicit closure statements for second-gate acceptance

### Gate 4: retained-system convergence

Required system families:
- conversations continuity
- runs and pipelines totalization
- Bitcode-native deliverable meaning
- prompt abstraction and prompt-space routing
- retained package admissibility

Required coverage posture:
- spec:
  retained roles and convergence rules are explicit
- tests:
  retained packages and converged routes are covered by behavior tests
- proof surface:
  retained systems are named in the eventual V26 proof family rather than implied

### Gate 5: proof precision and final closure

Required system families:
- environment/debug coherence
- production/staging/development mode completeness
- retained-package admissibility proof
- total V26 closure proof

Required coverage posture:
- spec:
  final closure conditions are explicit
- tests:
  mode behavior and closure gates are exercised
- proof surface:
  generated V26 proof appendix and reports become promotion blockers

## Immediate V26 code-system assignments

Current active assignments:
- `uapi/app/api/vcs/[provider]/connection/route.ts`
  test coverage:
  route response tests and browser verification through orbitals
  proof surface:
  second-gate external interfacing hardening and parity matrix
- `uapi/app/api/vcs/[provider]/repositories/route.ts`
  test coverage:
  route response tests and repository-selector behaviors
  proof surface:
  second-gate give-side repository context readiness
- `uapi/app/application/ApplicationRepositoryContextPanel.tsx`
  test coverage:
  browser verification plus repository-selection helper coverage
  proof surface:
  second-gate give-side repository context readiness inside `/application`
- `packages/bitcode/public/app.js`
  test coverage:
  semantic snapshot bridge verification through route-local normalization tests and live application checks
  proof surface:
  second-gate admissible shell snapshot and shell control exposure for native application composition
- `packages/bitcode/src/client-entry.js`
  test coverage:
  semantic snapshot bridge exercised by application-owned give/need normalization and live `/application` review
  proof surface:
  second-gate package-to-application bridge for mounted-shell semantic state and command/intake control
- `uapi/app/application/application-command-state.ts`
  test coverage:
  `uapi/tests/applicationCommandState.test.ts`
  proof surface:
  deterministic normalization of shell command posture, tutorial state, and option sets into route-local application command state
- `uapi/app/application/ApplicationCommandDeck.tsx`
  test coverage:
  lint plus live `/application` verification through the shell command/control bridge
  proof surface:
  second-gate application-owned command posture for scenario, projection, branch mode, tutorial, reset, and branch creation
- `uapi/app/application/application-live-summary.ts`
  test coverage:
  `uapi/tests/applicationLiveSummary.test.ts`
  proof surface:
  deterministic normalization of the shell summary bridge into route-local application operating posture
- `uapi/app/application/ApplicationLiveSummaryStrip.tsx`
  test coverage:
  lint plus localhost `/application` verification with route-local summary posture mounted
  proof surface:
  second-gate application-owned operating summary reading from semantic shell state rather than rendered shell cards
- `uapi/app/application/application-give-need-workbench.ts`
  test coverage:
  `uapi/tests/applicationGiveNeedWorkbench.test.ts`
  proof surface:
  deterministic normalization of give, need, and fit action detail from the shell snapshot into route-local Bitcode application composition
- `uapi/app/application/ApplicationGiveNeedWorkbench.tsx`
  test coverage:
  browser verification and UI review around route-local give/need action detail
  proof surface:
  second-gate application-owned action detail for repository supply, measured demand, and fit intent
- `uapi/app/application/ApplicationActionWorkbenchCard.tsx`
  test coverage:
  component-level lint/visual verification through the workbench surface
  proof surface:
  retained late-Engi design-system card reuse under Bitcode-owned action composition
- `uapi/app/application/application-supply-selection.ts`
  test coverage:
  `uapi/tests/applicationSupplySelection.test.ts`
  proof surface:
  deterministic normalization of authenticated intake session, artifact filter, search, and selected inventory entries into route-local application intake state
- `uapi/app/application/ApplicationSupplySelectionPanel.tsx`
  test coverage:
  lint plus live `/application` verification through the shell command/control bridge
  proof surface:
  second-gate application-owned give-side intake control for session binding, inventory filtering, search, and artifact selection
- `uapi/app/application/application-deposit-composer.ts`
  test coverage:
  `uapi/tests/applicationDepositComposer.test.ts`
  proof surface:
  deterministic normalization of deposit-auth session defaults, selected inventory continuity, and signer/source-repo defaults into route-local deposit-composer state
- `uapi/app/application/ApplicationDepositComposer.tsx`
  test coverage:
  lint plus localhost route verification with the app-owned deposit carrier present in `/application`
  proof surface:
  second-gate application-owned native deposit submission against the app-owned Bitcode intake route
- `uapi/app/application/application-need-scenarios.ts`
  test coverage:
  `uapi/tests/applicationNeedScenarios.test.ts`
  proof surface:
  deterministic normalization of active scenario cards, parser posture, closure counts, and target-kind counts into route-local need-scenario state
- `uapi/app/application/ApplicationNeedScenarioPanel.tsx`
  test coverage:
  lint plus localhost `/application` verification with route-local scenario selection mounted
  proof surface:
  second-gate application-owned native need selection through the Bitcode shell control bridge
- `uapi/app/application/application-closure-state.ts`
  test coverage:
  `uapi/tests/applicationClosureState.test.ts`
  proof surface:
  deterministic normalization of verification, branch, settlement, and ledger semantics from the shell snapshot into application-owned closure state
- `uapi/app/application/ApplicationClosureNativeSections.tsx`
  test coverage:
  lint plus localhost `/application` verification with native closure cards mounted
  proof surface:
  second-gate application-owned closure composition reading from the semantic `closureSurface` bridge instead of rendered shell DOM
- `uapi/app/application/ApplicationExternalInterfacingPanel.tsx`
  test coverage:
  browser/API verification plus runtime-normalization helper coverage
  proof surface:
  second-gate boundary honesty and external-interfacing stable readiness inside `/application`
- `uapi/app/application/application-repository-context.ts`
  test coverage:
  `uapi/tests/applicationRepositoryContext.test.ts`
  proof surface:
  deterministic repository-provider normalization and selected-repository derivation for the give-side application frame
- `uapi/app/application/application-external-runtime.ts`
  test coverage:
  `uapi/tests/applicationExternalRuntime.test.ts`
  proof surface:
  deterministic runtime-state normalization and blocking-interface classification for the application-owned external posture carrier
- `uapi/app/api/vcs/[provider]/oauth/route.ts`
  test coverage:
  route behavior tests and redirect contract checks
  proof surface:
  second-gate auth/VCS interface admissibility
- `uapi/app/api/vcs/[provider]/connect-token/route.ts`
  test coverage:
  route response tests for mock mode and error/success handling
  proof surface:
  second-gate external interfacing hardening and fallback-connect behavior
- `uapi/app/api/v24/external-realization/route.ts`
  test coverage:
  route response tests for app-owned runtime posture and live localhost verification
  proof surface:
  second-gate external interfacing hardening and native boundary-actuality application read
- `uapi/app/application/ApplicationRunWorkspace.tsx`
  test coverage:
  browser verification and UI coverage around runs/deliverables/proofs/history
  proof surface:
  second-gate master-detail substructure closure
- `uapi/app/application/application-run-detail.ts`
  test coverage:
  `uapi/tests/applicationRunDetail.test.ts`
  proof surface:
  deterministic normalization of selected-run history payloads into application-owned deliverable/proof/history detail
- `uapi/app/application/application-run-activity.ts`
  test coverage:
  `uapi/tests/applicationRunActivity.test.ts`
  proof surface:
  deterministic normalization of retained execution events into application-owned Bitcode run-activity detail
- `uapi/app/application/ApplicationRunDetailSurface.tsx`
  test coverage:
  browser verification and UI coverage around live and mock selected-run detail rendering
  proof surface:
  second-gate selected-run application ownership rather than mock-only inward reuse
- `uapi/app/application/ApplicationRunActivitySurface.tsx`
  test coverage:
  browser verification and UI coverage around central activity/log/work-update rendering
  proof surface:
  second-gate elevation of retained execution/log carriers into Bitcode application ownership
- `uapi/app/conversations/components/ConversationsOverlay.tsx`
  test coverage:
  browser verification and conversations route tests
  proof surface:
  second-gate overlay continuity and fourth-gate conversations retention

## Module namespace proof note

V26 also now treats the `@bitcode/*` module namespace as part of the active proof surface.
That means:
- new active imports must use `@bitcode/*`,
- new workspace package names must use `@bitcode/*`,
- and lingering older ENGI-scoped module references in active source are parity drift, not harmless style debt.
