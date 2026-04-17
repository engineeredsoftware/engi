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
- `uapi/app/application/ApplicationOperatorCard.tsx`
- `uapi/app/application/application-operator-explainers.ts`
- `uapi/app/application/ApplicationExperienceFrame.tsx`
- `uapi/app/application/ApplicationCommandDeck.tsx`
- `uapi/app/application/ApplicationActionWorkbenchCard.tsx`
- `uapi/app/application/ApplicationExternalInterfacingPanel.tsx`
- `uapi/app/application/ApplicationGiveNeedWorkbench.tsx`
- `uapi/app/application/ApplicationRepositoryContextPanel.tsx`
- `uapi/app/application/ApplicationCoreNativeSections.tsx`
- `uapi/app/application/ApplicationClosureNativeSections.tsx`
- `uapi/app/application/ApplicationLiveSummaryStrip.tsx`
- `uapi/app/application/ApplicationTransactionWorkspace.tsx`
- `uapi/app/application/ApplicationTransactionDetailActionBar.tsx`
- `uapi/app/application/ApplicationWorkspaceRail.tsx`
- `uapi/app/application/application-closure-state.ts`
- `uapi/app/application/application-external-runtime.ts`
- `uapi/app/application/application-live-summary.ts`
- `uapi/app/application/application-give-need-workbench.ts`
- `uapi/app/application/application-repository-context.ts`
- `uapi/app/application/application-transaction-query.ts`
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
- PostgreSQL/Supabase persistence, `/edgetimes`, migrations, schema contracts, ORM/query carriers, and generated database types
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
- migration/schema/type/API closure for retained storage systems
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
  semantic snapshot bridge exercised by application-owned give/need normalization, shell-bridge tests, and live `/application` review
  proof surface:
  second-gate package-to-application bridge for mounted-shell semantic state and command/intake control, including host-wait and fail-closed snapshot reads during bootstrap windows
- `uapi/app/application/application-shell-bridge.tsx`
  test coverage:
  `uapi/tests/applicationShellBridge.test.tsx`
  proof surface:
  centralized mounted-shell polling and control refresh for second-gate application carriers, including fail-closed refresh behavior during pre-mount and hot-reload rebuild windows
- `uapi/app/api/executions/_shared.ts`
  test coverage:
  `uapi/tests/deliverablesHistoryRoute.test.ts`, `uapi/tests/deliverablesHistoryRunRoute.test.ts`, and `uapi/tests/usePipelineExecution.test.tsx`
  proof surface:
  normalized current execution-history payload shape shared by the transaction master, selected-transaction detail, and retained execution readers
- `uapi/app/api/executions/history/route.ts`
  test coverage:
  `uapi/tests/deliverablesHistoryRoute.test.ts`
  proof surface:
  current app-owned execution-history collection route for transaction-master hydration, including anonymous-safe empty GET posture
- `uapi/app/api/executions/history/[runId]/route.ts`
  test coverage:
  `uapi/tests/deliverablesHistoryRunRoute.test.ts` and `uapi/tests/usePipelineExecution.test.tsx`
  proof surface:
  current app-owned selected-execution history route for selected-transaction detail and retained execution activity hydration, including anonymous-safe empty GET posture
- `uapi/app/api/client-error/route.ts`
  test coverage:
  `uapi/tests/api/clientErrorRoute.test.ts`
  proof surface:
  second-gate runtime-health intake so client-side application failures are accepted by an app-owned carrier instead of 404ing
- `uapi/app/orbitals/components/OrbitalsProfilePane.tsx`
  test coverage:
  live `/application` verification with fullscreen orbitals entry exercised from the running app
  proof surface:
  second-gate orbitals renderability from `/application`, including the active data-sharing pane hookup required to avoid missing-overlay crashes
- `uapi/app/orbitals/components/OrbitalsProvider.tsx`
  test coverage:
  `uapi/tests/orbitalsProvider.test.tsx` plus live `/application` verification with orbitals entry exercised from the running app
  proof surface:
  second-gate fullscreen orbitals portal readiness from `/application`, including first-open rendering when the shared event bridge fires before the overlay container would otherwise be visible to React
- `uapi/app/application/application-command-state.ts`
  test coverage:
  `uapi/tests/applicationCommandState.test.ts`
  proof surface:
  deterministic normalization of shell command posture, tutorial state, and option sets into route-local application command state
- `uapi/app/application/ApplicationOperatorCard.tsx`
  test coverage:
  `uapi/tests/applicationOperatorCard.test.tsx`
  proof surface:
  second-gate shared operator shell/help carrier for route-local workspace framing, reusable header posture, and user-facing copy discipline
- `uapi/app/application/ApplicationWorkspaceRailCard.tsx`
  test coverage:
  `uapi/tests/applicationWorkspaceRailCard.test.tsx`
  proof surface:
  second-gate compact shared operator-shell/help carrier for the right-rail posture, including explainer continuity and user-facing copy framing
- `uapi/app/application/application-operator-explainers.ts`
  test coverage:
  consumed through component tests and lint plus live `/application` verification
  proof surface:
  shared operator explainer catalog for give, need, deposit, closure, and workspace-map help posture carried forward into the production application
- `uapi/app/application/ApplicationCommandDeck.tsx`
  test coverage:
  lint plus live `/application` verification through the shell command/control bridge
  proof surface:
  second-gate application-owned command posture for scenario, projection, branch mode, guide continuity, reset, and branch creation
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
- `uapi/app/application/application-section-atlas.ts`
  test coverage:
  `uapi/tests/applicationSectionAtlas.test.ts`
  proof surface:
  deterministic normalization of section-atlas previews from semantic core and closure bridges into route-local application navigation state
- `uapi/app/application/ApplicationSectionAtlas.tsx`
  test coverage:
  lint plus localhost `/application` verification with semantic atlas cards mounted
  proof surface:
  second-gate application-owned section atlas reading from semantic bridges rather than rendered shell panel markup
- `uapi/app/application/ApplicationSupplySelectionPanel.tsx`
  test coverage:
  `uapi/tests/applicationSupplySelection.test.ts` for normalized supply-selection state plus lint and live `/application` verification for the shared operator-shell framing
  proof surface:
  second-gate give-side supply terminal with shared operator-shell/help posture, user-facing copy discipline, and explicit auth/filter/search/inventory continuity inside `/application`
- `uapi/app/application/application-core-surface.ts`
  test coverage:
  `uapi/tests/applicationCoreSurface.test.ts`
  proof surface:
  deterministic normalization of operating, depositing, needing, and fit semantics from the shell snapshot into route-local application core panels
- `uapi/app/application/ApplicationCoreNativeSections.tsx`
  test coverage:
  lint plus localhost `/application` verification with core panels mounted from the semantic bridge
  proof surface:
  second-gate application-owned master-detail core composition reading from the semantic `coreSurface` bridge instead of rendered shell DOM
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
  `uapi/tests/applicationActionWorkbenchCard.test.tsx`
  proof surface:
  retained late-Engi design-system card reuse under Bitcode-owned action composition, now grounded in shared execution-level metric, row, and chip carriers
- `uapi/app/application/application-transactions.ts`
  test coverage:
  `uapi/tests/applicationTransactions.test.ts`
  proof surface:
  deterministic normalization and filtering of Bitcode transactions into a searchable master-detail table carrier, including participant/proof-posture filters and explicit sort posture
- `uapi/app/application/ApplicationTransactionsTable.tsx`
  test coverage:
  lint plus localhost `/application` verification with the transactions master surface mounted
  proof surface:
  second-gate application-owned orchestration of transaction selection, `transactionId` route posture, filter state, active-filter chip posture, and route-owned pagination
- `uapi/app/application/application-transaction-source.ts`
  test coverage:
  `uapi/tests/applicationTransactionSource.test.ts`
  proof surface:
  deterministic resolution of `live`, `mock-review`, and `review-fallback` transaction-source posture from live history plus the selected transaction URL, so explicit mock review URLs fail over to interactive review state instead of emptying `/application`
- `uapi/app/application/application-transaction-query.ts`
  test coverage:
  `uapi/tests/applicationTransactionQuery.test.ts`
  proof surface:
  deterministic parsing, persistence, compatibility fallback, detail-focus persistence, `transaction`-preferred detail routing, shared default filter/pagination carriers, route-owned pagination carriers, and reset behavior for route-owned transaction query state
- `uapi/components/base/engi/execution/bitcode-transaction-active-filters.ts`
  test coverage:
  `uapi/tests/bitcodeTransactionActiveFilters.test.ts`
  proof surface:
  deterministic normalization of non-default transaction filters into readable active-filter chips plus one-at-a-time default reset behavior
- `uapi/components/base/engi/execution/BitcodeTransactionsActiveFilters.tsx`
  test coverage:
  `uapi/tests/bitcodeTransactionsActiveFilters.test.tsx`
  proof surface:
  reusable active-filter chip carrier for the transaction terminal, keeping the shaped master window explicit and individually clearable
- `uapi/app/application/ApplicationTransactionDetailActionBar.tsx`
  test coverage:
  lint plus localhost `/application` verification with route-owned detail focus and closure actions mounted
  proof surface:
  application-owned detail interaction and closure follow-through inside the selected-transaction carrier
- `uapi/app/application/application-transaction-detail.ts`
  test coverage:
  `uapi/tests/applicationTransactionDetail.test.ts`
  proof surface:
  deterministic closure follow-through normalization for inline settlement metrics, proof families, branch artifacts, recent transaction history, and reusable closure raw-payload inspection
- `uapi/app/application/ApplicationTransactionClosureCard.tsx`
  test coverage:
  `uapi/tests/applicationTransactionDetailCards.test.tsx`
  proof surface:
  explicit closure summary and settlement/branch follow-through carrier inside selected-transaction detail, including the shared visual-vs-raw payload posture
- `uapi/app/application/ApplicationTransactionProofsCard.tsx`
  test coverage:
  `uapi/tests/applicationTransactionDetailCards.test.tsx`
  proof surface:
  explicit proofs detail carrier inside selected-transaction detail
- `uapi/app/application/ApplicationTransactionHistoryCard.tsx`
  test coverage:
  `uapi/tests/applicationTransactionDetailCards.test.tsx`
  proof surface:
  explicit history detail carrier inside selected-transaction detail
- `uapi/components/base/engi/execution/BitcodeDetailCollection.tsx`
  test coverage:
  `uapi/tests/bitcodeDetailCollection.test.tsx`
  proof surface:
  reusable execution-level carrier for proof/history-style transaction detail collections
- `uapi/components/base/engi/execution/BitcodeDetailPanel.tsx`
  test coverage:
  `uapi/tests/bitcodeDetailPanel.test.tsx`
  proof surface:
  reusable execution-level carrier for master-detail substructure preview panels inside the Bitcode transaction workspace
- `uapi/app/application/ApplicationTransactionClosureCard.tsx`
  test coverage:
  lint plus localhost `/application` verification with inline closure follow-through mounted in selected-transaction detail
  proof surface:
  application-owned lower closure reading inside the selected-transaction carrier rather than shell-section-only follow-through
- `uapi/components/base/engi/execution/BitcodeTransactionsTable.tsx`
  test coverage:
  lint plus application-level verification through the route-local transactions carrier
  proof surface:
  reusable base-component table carrier for searchable Bitcode transaction master-detail UI
- `uapi/components/base/engi/execution/BitcodeTransactionsOverview.tsx`
  test coverage:
  lint plus application-level verification through the transactions master carrier
  proof surface:
  reusable overview metrics and mode posture carrier for transaction-master SRP decomposition
- `uapi/components/base/engi/execution/BitcodeTransactionsFilterBar.tsx`
  test coverage:
  lint plus `uapi/tests/applicationTransactions.test.ts` and `uapi/tests/bitcodeTransactionsFilterBar.test.tsx`
  proof surface:
  reusable field-filter and sort-control carrier for transaction-master SRP decomposition, including explicit accessible control naming under shared explainers
- `uapi/components/base/engi/execution/BitcodeTransactionsDataTable.tsx`
  test coverage:
  lint plus application-level verification through the transactions master carrier
  proof surface:
  reusable row-selection and detail-entry carrier for transaction-master SRP decomposition, including shared header explainers
- `uapi/components/base/engi/execution/BitcodeTransactionsPagination.tsx`
  test coverage:
  `uapi/tests/bitcodeTransactionsPagination.test.tsx`
  proof surface:
  reusable pagination carrier for the route-owned Bitcode transactions master surface, including shared page-size explainers
- `uapi/components/base/engi/execution/bitcode-transaction-data-mode.ts`
  test coverage:
  `uapi/tests/bitcodeTransactionDataMode.test.ts`
  proof surface:
  typed source-mode contract for transaction overview, support-rail labeling, and review-fallback posture across the Bitcode transaction workspace
- `uapi/components/base/engi/execution/BitcodeInlineExplainer.tsx`
  test coverage:
  `uapi/tests/bitcodeInlineExplainer.test.tsx`
  proof surface:
  reusable second-gate explainer/tooltip carrier for the transaction terminal workspace
- `uapi/components/base/engi/execution/BitcodePayloadInspector.tsx`
  test coverage:
  `uapi/tests/bitcodePayloadInspector.test.tsx`
  proof surface:
  reusable visual-vs-raw payload carrier with copy support, payload metadata, structured payload summaries, and shared explainers for selected-transaction detail
- `uapi/components/base/engi/execution/BitcodePayloadShape.tsx`
  test coverage:
  `uapi/tests/bitcodePayloadShape.test.tsx`
  proof surface:
  reusable structured payload summary carrier for selected-transaction detail, exposing root kind, top-level counts, and previewable field/item posture before raw JSON inspection
- `uapi/components/base/engi/execution/BitcodePayloadTree.tsx`
  test coverage:
  `uapi/tests/bitcodePayloadTree.test.tsx`
  proof surface:
  reusable bounded nested payload-tree carrier for selected-transaction detail, exposing structural JSON fields and types before raw inspection
- `uapi/components/base/engi/execution/BitcodeDetailRowList.tsx`
  test coverage:
  `uapi/tests/bitcodeDetailRowList.test.tsx`
  proof surface:
  reusable key-value row carrier for SRP-aligned selected-transaction identity and closure reading
- `uapi/components/base/engi/execution/BitcodeMetricGrid.tsx`
  test coverage:
  `uapi/tests/bitcodeMetricGrid.test.tsx`
  proof surface:
  reusable metric-grid carrier for selected-transaction overview and closure follow-through
- `uapi/components/base/engi/execution/BitcodeChipCloud.tsx`
  test coverage:
  browser verification and card-level integration through `uapi/tests/applicationTransactionDetailCards.test.tsx`
  proof surface:
  reusable chip-cloud carrier for branch artifacts and later selected-transaction detail token clouds
- `uapi/components/base/engi/execution/BitcodeActionPillRow.tsx`
  test coverage:
  `uapi/tests/bitcodeActionPillRow.test.tsx`
  proof surface:
  reusable action-pill carrier for selected-transaction verification, settlement, branch, and history follow-through inside transaction detail
- `uapi/components/base/engi/execution/BitcodeExecutionStreamPanel.tsx`
  test coverage:
  `uapi/tests/bitcodeExecutionStreamPanel.test.tsx`
  proof surface:
  reusable execution-stream carrier for shared header/log/work-update composition across `/application`, conversations, and `/executions`
- `uapi/components/base/engi/execution/bitcode-transaction-explainers.ts`
  test coverage:
  covered indirectly through `uapi/tests/bitcodeInlineExplainer.test.tsx`, `uapi/tests/bitcodeTransactionsFilterBar.test.tsx`, `uapi/tests/bitcodePayloadInspector.test.tsx`, `uapi/tests/bitcodePayloadShape.test.tsx`, and `uapi/tests/bitcodePayloadTree.test.tsx`
  proof surface:
  centralized explainer-copy contract for transaction filters, headers, pagination, raw payload posture, structured payload posture, and nested payload-tree posture
- `uapi/components/base/engi/execution/BitcodePayloadDetailCard.tsx`
  test coverage:
  `uapi/tests/bitcodePayloadDetailCard.test.tsx`
  proof surface:
  reusable selected-transaction card shell that composes payload inspection and action pills into one execution-level carrier
- `uapi/components/base/engi/execution/BitcodePayloadRowsCard.tsx`
  test coverage:
  `uapi/tests/bitcodePayloadRowsCard.test.tsx`
  proof surface:
  reusable payload-plus-rows carrier for selected-transaction identity and other row-shaped Bitcode detail cards
- `uapi/components/base/engi/execution/BitcodePayloadCollectionCard.tsx`
  test coverage:
  `uapi/tests/bitcodePayloadCollectionCard.test.tsx`
  proof surface:
  reusable payload-plus-collection carrier for proof/history and other list-shaped Bitcode detail cards
- `uapi/components/base/engi/execution/bitcode-transaction-types.ts`
  test coverage:
  imported through `uapi/tests/applicationTransactions.test.ts`, `uapi/tests/applicationTransactionQuery.test.ts`, and `uapi/tests/bitcodeTransactionsPagination.test.tsx`
  proof surface:
  typed base-component contract for transaction-master filtering, overview, pagination, and row-selection carriers
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
- `uapi/app/application/application-closure-controls.ts`
  test coverage:
  `uapi/tests/applicationClosureControls.test.ts`
  proof surface:
  deterministic normalization of closure execution, reset, refresh, and follow-through posture from the command and closure semantic bridges
- `uapi/app/application/ApplicationClosureControlDeck.tsx`
  test coverage:
  lint plus localhost `/application` verification with route-local closure operation controls mounted
  proof surface:
  second-gate application-owned closure operation deck rather than implicit preserved-shell action ownership
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
- `uapi/app/application/ApplicationTransactionWorkspace.tsx`
  test coverage:
  browser verification and UI coverage around transactions/deliverables/proofs/history
  proof surface:
  second-gate master-detail substructure closure
- `uapi/app/application/application-transaction-detail-snapshot.ts`
  test coverage:
  `uapi/tests/applicationTransactionDetailSnapshot.test.ts`
  proof surface:
  deterministic normalization of selected-transaction history payloads into application-owned deliverable/proof/history detail
- `uapi/app/application/application-transaction-detail.ts`
  test coverage:
  `uapi/tests/applicationTransactionDetail.test.ts`
  proof surface:
  deterministic normalization of selected-transaction overview, identity, and closure-read rows into SRP-aligned detail modules
- `uapi/app/application/application-run-activity.ts`
  test coverage:
  `uapi/tests/applicationTransactionActivity.test.ts`
  proof surface:
  deterministic normalization of retained execution events into application-owned Bitcode run-activity detail
- `uapi/app/application/ApplicationTransactionDetailSurface.tsx`
  test coverage:
  browser verification and UI coverage around live and mock selected-transaction detail rendering
  proof surface:
  second-gate selected-transaction application ownership rather than mock-only inward reuse
- `uapi/app/application/ApplicationTransactionDetailHero.tsx`
  test coverage:
  lint plus `uapi/tests/applicationTransactionDetail.test.ts`
  proof surface:
  reusable overview carrier for selected-transaction detail SRP decomposition
- `uapi/app/application/ApplicationTransactionIdentityCard.tsx`
  test coverage:
  lint plus `uapi/tests/applicationTransactionDetail.test.ts`
  proof surface:
  reusable identity/read carrier for selected-transaction detail SRP decomposition
- `uapi/app/application/ApplicationTransactionClosureCard.tsx`
  test coverage:
  lint plus `uapi/tests/applicationTransactionDetail.test.ts`
  proof surface:
  reusable closure/read-follow-through carrier for selected-transaction detail SRP decomposition
- `uapi/app/application/ApplicationTransactionActivitySurface.tsx`
  test coverage:
  browser verification and UI coverage around central activity/log/work-update rendering
  proof surface:
  second-gate elevation of retained execution/log carriers into Bitcode application ownership
- `uapi/app/conversations/components/ConversationsOverlay.tsx`
  test coverage:
  browser verification and conversations route tests
  proof surface:
  second-gate overlay continuity and fourth-gate conversations retention

## Whole-repository proof closure

V26 proof closure must extend beyond the former demo core.

Required closure posture:
- the retained and repurposed whole repository that remains in V26 production canon must be proven up to Bitcode-grade satisfaction
- any package, component family, route carrier, or application subsystem kept for V26 must have explicit spec, test, and proof-surface ownership
- proof closure may no longer terminate at the old `engi-demo` equivalent core alone; it must close over the production application and surviving packages as one Bitcode system

## Module namespace proof note

V26 also now treats the `@bitcode/*` module namespace as part of the active proof surface.
That means:
- new active imports must use `@bitcode/*`,
- new workspace package names must use `@bitcode/*`,
- and lingering older ENGI-scoped module references in active source are parity drift, not harmless style debt.
