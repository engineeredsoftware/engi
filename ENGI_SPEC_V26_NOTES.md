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
- `/api/executions/history`
- `/api/executions/history/[runId]`
- `/api/v24/external-realization`
- `/api/v24/executors/[interfaceId]`
- `/api/client-error`

This is the current V26 source carrier, even while V25 remains the only active canon.
The practical V26 leverage rule is now explicit: the retained active package/app systems outside first-gate Bitcode ownership are to be elevated up to Bitcode-grade auditability, proof-bearing precision, and knowability rather than treated as a looser host Bitcode must compromise down into.

The current active second-gate application additions now explicitly include:

- `uapi/app/application/ApplicationCommandDeck.tsx`
- `uapi/app/application/ApplicationActionWorkbenchCard.tsx`
- `uapi/app/application/ApplicationExperienceFrame.tsx`
- `uapi/app/application/ApplicationExternalInterfacingPanel.tsx`
- `uapi/app/application/ApplicationClosureControlDeck.tsx`
- `uapi/app/application/ApplicationGiveNeedWorkbench.tsx`
- `uapi/app/application/ApplicationLiveSummaryStrip.tsx`
- `uapi/app/application/ApplicationRepositoryContextPanel.tsx`
- `uapi/app/application/ApplicationSectionAtlas.tsx`
- `uapi/app/application/ApplicationCoreNativeSections.tsx`
- `uapi/app/application/ApplicationClosureNativeSections.tsx`
- `uapi/app/application/ApplicationTransactionActivitySurface.tsx`
- `uapi/app/application/ApplicationTransactionDetailSurface.tsx`
- `uapi/app/application/application-core-surface.ts`
- `uapi/app/application/application-closure-controls.ts`
- `uapi/app/application/application-closure-state.ts`
- `uapi/app/application/application-external-runtime.ts`
- `uapi/app/application/application-live-summary.ts`
- `uapi/app/application/application-section-atlas.ts`
- `uapi/app/application/application-experience-architecture.ts`
- `uapi/app/application/application-give-need-workbench.ts`
- `uapi/app/application/application-run-activity.ts`
- `uapi/app/application/application-transaction-detail-snapshot.ts`
- `uapi/app/application/application-repository-context.ts`
- `uapi/app/application/application-shell-sections.ts`
- `uapi/app/application/application-shell-reading.ts`
- `uapi/app/api/executions/_shared.ts`
- `uapi/app/api/executions/history/route.ts`
- `uapi/app/api/executions/history/[runId]/route.ts`
- `uapi/app/api/client-error/route.ts`
- `uapi/app/application/ApplicationWorkspaceRail.tsx`
- `uapi/app/application/ApplicationTransactionWorkspace.tsx`
- `uapi/app/application/ApplicationMockTransactionDetails.tsx`
- `uapi/app/application/application-run-data.ts`
- `uapi/app/conversations/components/ConversationsOverlay.tsx`
- `/api/conversations`

The next closure-side second-gate milestone is now materially implemented in source:

- `/application` carries native application-owned reading for ranked verification, branch artifacts, settlement/proof, and ledger/history through `ApplicationClosureNativeSections.tsx`,
- `application-closure-state.ts` now normalizes a dedicated `closureSurface` emitted by `getBitcodeApplicationShellSnapshot()` instead of reconstructing closure semantics from rendered shell markup,
- `packages/bitcode/public/app.js` now exposes verification, branch, settlement, and ledger semantics directly through the shell snapshot bridge,
- and the closure-side proof surface now includes `uapi/tests/applicationClosureState.test.ts` instead of leaving closure normalization as unproven UI glue.
- `/api/conversations/branch`
- `/api/conversations/stream`
- `/api/conversations/[conversationId]/stream`

Those carriers now make fullscreen conversations application-owned from `/application` in mock-mode review instead of leaving the overlay mounted over missing App Router routes.
They also place a central run-and-deliverable master-detail workspace directly inside `/application` instead of leaving inward reuse mostly confined to the right rail or the compatibility `/executions` route.
They also place route-local command and live-summary carriers above the preserved shell, with browser-verified proxying from the application frame into preserved-shell scenario/projection/branch state.
They now also place a route-local body atlas above the preserved shell, with browser-verified card labels and deterministic jump behavior into the live operating, depositing, needing, fit, verification, artifact, settlement, and ledger panels.
That atlas now also reads semantic core and closure bridges instead of scraping rendered shell panel text and card counts.
They now also place the first native route-local body replacement layer above the preserved shell: application-owned operating, deposit, need, and fit cards that now read a dedicated semantic `coreSurface` emitted by the mounted Bitcode shell instead of scraping rendered operating/deposit/need/fit panel markup.
They now also place a deeper route-local give/need action workbench above the preserved shell: application-owned action detail that reads the mounted shell through `getBitcodeApplicationShellSnapshot()` and the client-entry bridge instead of relying on generic DOM markup reads for repository supply, measured demand, and fit intent.
They now also place a route-local closure operation deck above the preserved shell: application-owned branch execution, refresh, reset, and follow-through controls that normalize closure posture from the shell bridge instead of leaving closure interaction implicit in shared command controls alone.

The V26 application architecture is now explicitly locked in the draft family as:

- `master detail`, `conversations`, and `orbitals` as the three main Bitcode experiences,
- `give` and `need` as the two main Bitcode actions,
- `/application` as the master-detail carrier,
- conversations as the fullscreen chat workspace entered from `/application`,
- orbitals as the fullscreen settings workspace entered from `/application`,
- and runs/deliverables/proofs/history as master-detail substructures rather than separate primary experiences.

The current source now reflects that architecture more directly:

- `ApplicationExperienceFrame.tsx` names the three main experiences and the two main actions inside `/application`,
- the live application framing now explicitly distinguishes the read experience (transactions master detail) from the write experience (give, need, and configuring through conversations/orbitals),
- `ApplicationCommandDeck.tsx` plus `application-command-state.ts` now carry direct give/need focus controls and route-local command posture through the Bitcode shell bridge instead of raw DOM scraping,
- `ApplicationLiveSummaryStrip.tsx` plus `application-live-summary.ts` now read route-local operating posture from the shell summary bridge instead of rendered summary-card markup,
- `ApplicationCoreNativeSections.tsx` now reads as the master-detail give/need core instead of only as generic core shell mirroring,
- `ApplicationSupplySelectionPanel.tsx` plus `application-supply-selection.ts` now make authenticated intake session, artifact filtering, search, and inventory selection explicit inside `/application` through the mounted Bitcode shell bridge,
- `ApplicationDepositComposer.tsx` plus `application-deposit-composer.ts` now make native deposit submission available inside `/application`, posting to the app-owned `/api/deposits` contract while preserving selected inventory and auth-session continuity from the mounted shell,
- `ApplicationNeedScenarioPanel.tsx` plus `application-need-scenarios.ts` now make native need-scenario selection available inside `/application`, driving active scenario posture through the mounted Bitcode shell bridge while keeping parser and closure posture visible,
- `application-shell-bridge.tsx` plus `applicationShellBridge.test.tsx` now centralize mounted-shell polling and control refresh so second-gate carriers consume one coherent Bitcode application state bridge rather than drifting per-panel refresh loops,
- `ApplicationTransactionsTable.tsx`, `application-transactions.ts`, `BitcodeTransactionsTable.tsx`, and `applicationTransactions.test.ts` now make master detail concrete as a rich, searchable, filterable Bitcode transactions table with transaction detail carried centrally inside `/application`,
- `application-transaction-source.ts`, `bitcode-transaction-data-mode.ts`, `ApplicationPageClient.tsx`, and `ApplicationWorkspaceRail.tsx` now resolve and label `live`, `mock-review`, and `review-fallback` transaction-source posture from live history plus the selected transaction URL, so empty live history on explicit mock review URLs fails over to an interactive Bitcode workspace instead of an inert empty state,
- `BitcodeTransactionsOverview.tsx`, `BitcodeTransactionsFilterBar.tsx`, `BitcodeTransactionsActiveFilters.tsx`, `BitcodeTransactionsDataTable.tsx`, `bitcode-transaction-types.ts`, and `bitcode-transaction-active-filters.ts` now split the base transaction master carrier into typed SRP-aligned subcomponents, shared defaults, and active-filter chip posture instead of leaving the reusable table UI as one monolith,
- `application-transaction-query.ts` plus `applicationTransactionQuery.test.ts` now make transaction selection and rich master-table filters route-owned and shareable through `/application` query state instead of leaving them trapped in component-local state,
- `ApplicationTransactionDetailHero.tsx`, `ApplicationTransactionIdentityCard.tsx`, `ApplicationTransactionClosureCard.tsx`, `application-transaction-detail.ts`, and `applicationTransactionDetail.test.ts` now split the selected-transaction detail carrier into overview, identity, and closure modules instead of leaving the central detail pane as one mixed-responsibility component,
- `ApplicationTransactionDetailActionBar.tsx` plus `ApplicationTransactionDetailSurface.tsx` now make transaction-detail focus, closure rerun, and detail refresh route-owned inside `/application` through query state and the shell bridge, with `transaction` as the preferred detail carrier and legacy `identity` accepted only for compatibility parsing,
- `ApplicationTransactionClosureCard.tsx`, `ApplicationTransactionProofsCard.tsx`, and `ApplicationTransactionHistoryCard.tsx` now split selected-transaction closure, proofs, and history into explicit detail carriers instead of burying proofs/history under one closure pane,
- `/application` now prefers `transactionId` as the master-detail query carrier while still accepting inbound `runId` for compatibility convergence, and the transactions master surface now filters by status, ownership, repository, participant, proof posture, and sort order in addition to free-text search,
- `ApplicationTransactionWorkspace.tsx` now exposes transactions, deliverables, proofs, and history as explicit master-detail substructures instead of leaving them as adjacent imported detail panels,
- `ApplicationTransactionDetailSurface.tsx` plus `application-transaction-detail-snapshot.ts` now normalize selected-run history payloads into one application-owned detail carrier so deliverable-reading panels render in both mock and live posture inside `/application`,
- `ApplicationTransactionActivitySurface.tsx` plus `application-run-activity.ts` now elevate the retained execution/log/work-update system into the Bitcode application-owned detail space instead of leaving that depth mostly to the compatibility execution page,
- `ApplicationClosureNativeSections.tsx` plus `application-closure-state.ts` now read verification, branch, settlement, and ledger semantics from the mounted Bitcode shell snapshot rather than from rendered closure panel markup,
- and `ApplicationWorkspaceRail.tsx` now frames conversations and orbitals as the other two experiences rather than as loose utility exits.
- `OrbitalsProvider.tsx`, `OrbitalsCreditsPane.tsx`, `app/orbitals/components/api.ts`, `credits-tracker.tsx`, and `ExecutionsPageClient.tsx` now use the current app-owned `/api/orbitals/data` route instead of the stale `/api/orbitals/user/data` path on touched active surfaces.
- live browser verification now confirms the architecture frame is visible, `give` focus lands on the live deposit section, and both conversations and orbitals open from `/application` without console or request failures.
- `uapi/app/api/vcs/[provider]/*` now exists as an app-owned VCS carrier family for connection status, OAuth entry, PAT fallback connection, and repository listing instead of letting active Bitcode UI fall through to missing HTML routes.
- `ApplicationRepositoryContextPanel.tsx` now makes provider connection posture and selected repository supply explicit inside `/application` before the preserved deposit chain, using the app-owned `/api/vcs/*` contract and route state.
- `ApplicationGiveNeedWorkbench.tsx` plus `application-give-need-workbench.ts` now make give/need action detail explicit from a semantic shell snapshot bridge rather than generic shell markup, which is a stronger second-gate step toward application-owned Bitcode composition.
- `uapi/tests/applicationCommandState.test.ts` now proves deterministic normalization of shell command posture, tutorial state, and option sets into route-local application command state.
- `uapi/tests/applicationDepositComposer.test.ts` now proves deterministic normalization of deposit-auth session defaults, selected inventory continuity, and signer/source repo defaults into route-local deposit-composer state.
- `uapi/tests/applicationNeedScenarios.test.ts` now proves deterministic normalization of active scenario cards, parser posture, closure counts, and target-kind counts into route-local need-scenario state.
- `uapi/tests/applicationSupplySelection.test.ts` now proves deterministic normalization of authenticated intake session, artifact filter, search, and selected inventory entry detail into route-local application supply selection.
- `ApplicationExternalInterfacingPanel.tsx` now makes environment mode, actuality disposition, and per-interface runtime blocking state explicit inside `/application` through the app-owned `/api/v24/external-realization` contract.
- `packages/bitcode/public/app.js` plus `packages/bitcode/src/client-entry.js` now expose both the read-only shell snapshot carrier and the mutable shell control bridge so application-owned V26 sections can reuse precise Bitcode semantics without re-implementing the shell’s local selection logic.
- `uapi/tests/api/externalRealizationRoute.test.ts` now proves the app-owned `/api/v24/external-realization` carrier directly instead of relying only on UI normalization coverage.
- `uapi/tests/applicationGiveNeedWorkbench.test.ts` now proves deterministic give/need/fit normalization from the semantic shell snapshot into application-owned action detail.
- `uapi/tests/applicationLiveSummary.test.ts` now proves deterministic normalization of the shell summary bridge into route-local application operating posture.
- `uapi/tests/applicationClosureState.test.ts` now proves deterministic normalization of verification, branch, settlement, and ledger semantics from the shell snapshot into application-owned closure state.
- `uapi/tests/applicationTransactionDetailSnapshot.test.ts` now proves the selected-run normalization layer that merges live history payloads with route-owned fallback detail before the application renders deliverables, proofs, and history.
- `uapi/tests/applicationTransactionActivity.test.ts` now proves the activity/log normalization layer that lifts retained execution events into the application-owned run activity surface.
- `uapi/tests/applicationShellBridge.test.tsx` now also proves that the shared shell bridge fails closed to an empty snapshot/control state when mounted-shell refresh throws during pre-mount or hot-reload rebuild windows.
- `uapi/tests/api/clientErrorRoute.test.ts` now proves that client-side error telemetry is accepted by an app-owned route instead of 404ing during second-gate runtime failures.
- `application-transaction-query.ts`, `ApplicationPageClient.tsx`, `ApplicationTransactionWorkspace.tsx`, `ApplicationTransactionsTable.tsx`, `BitcodeTransactionsTable.tsx`, `BitcodeTransactionsPagination.tsx`, and `bitcodeTransactionsPagination.test.tsx` now treat transaction pagination as a route-owned part of the transactions master carrier instead of leaving row-window state local to the table.
- `BitcodePayloadInspector.tsx` plus `bitcodePayloadInspector.test.tsx` now provide a reusable visual-vs-raw JSON payload carrier with copy support and payload metadata, and the selected-transaction identity, proofs, and history cards now consume that shared base component.
- `BitcodePayloadShape.tsx` plus `bitcodePayloadShape.test.tsx` now provide a reusable structured payload summary layer inside the visual inspector, so transaction detail can read root kind, top-level fields, and composite sections before dropping into raw JSON.
- `BitcodePayloadTree.tsx` plus `bitcodePayloadTree.test.tsx` now provide a reusable bounded nested payload tree inside the visual inspector, so transaction detail can read structural JSON fields and types before dropping into raw JSON.
- `BitcodeActionPillRow.tsx` plus `bitcodeActionPillRow.test.tsx`, `BitcodePayloadDetailCard.tsx` plus `bitcodePayloadDetailCard.test.tsx`, `BitcodePayloadRowsCard.tsx` plus `bitcodePayloadRowsCard.test.tsx`, and `BitcodePayloadCollectionCard.tsx` plus `bitcodePayloadCollectionCard.test.tsx` now centralize the repeated payload-inspector-plus-actions, payload-plus-rows, and payload-plus-collection shells used by transaction identity, closure, proofs, and history, so those cards share hardened execution-level carriers instead of reauthoring the same lower card posture.
- `BitcodeExecutionStreamPanel.tsx` plus `bitcodeExecutionStreamPanel.test.tsx` now centralize the repeated execution-log header, log body, and sorted work-update stack used by `/application`, conversations, and `/executions`, so transaction activity is no longer composed as page-local glue.
- `BitcodeInlineExplainer.tsx`, `bitcode-transaction-explainers.ts`, `BitcodeTransactionsFilterBar.tsx`, `BitcodeTransactionsDataTable.tsx`, `BitcodeTransactionsPagination.tsx`, `BitcodePayloadInspector.tsx`, `bitcodeInlineExplainer.test.tsx`, and `bitcodeTransactionsFilterBar.test.tsx` now provide one shared second-gate explainer/tooltip system for transaction filters, headers, pagination, and payload views, while also restoring stable accessible names to the master-table controls after the explainer triggers were introduced.
- `BitcodeDetailRowList.tsx`, `BitcodeMetricGrid.tsx`, `BitcodeDetailCollection.tsx`, `BitcodeDetailPanel.tsx`, `BitcodeChipCloud.tsx`, `bitcodeDetailRowList.test.tsx`, `bitcodeMetricGrid.test.tsx`, `bitcodeDetailCollection.test.tsx`, and `bitcodeDetailPanel.test.tsx` now move selected-transaction rows, metric grids, proof/history collections, workspace substructure cards, and artifact chips onto reusable base carriers, with `ApplicationTransactionProofsCard.tsx`, `ApplicationTransactionHistoryCard.tsx`, and `ApplicationTransactionWorkspace.tsx` now consuming those shared execution components instead of hand-built page-local markup.
- `OrbitalsProfilePane.tsx` now reconnects the data-sharing overlay carrier so orbitals entered from `/application` remain renderable during second-gate convergence rather than crashing on missing-pane reference drift.
- `OrbitalsProvider.tsx` plus `orbitalsProvider.test.tsx` now keep the overlay portal target in state instead of a silent ref-only mutation, so `openOrbital()` can render a real fullscreen surface on first interaction instead of failing quietly when the container is created after the open event.
- `uapi/app/api/executions/_shared.ts`, `uapi/app/api/executions/history/route.ts`, and `uapi/app/api/executions/history/[runId]/route.ts` now restore the active app-owned execution-history JSON carrier the transactions master, selected-transaction detail, and retained execution readers depend on, so those flows no longer collapse into missing-route HTML responses and can fail closed to anonymous-safe empty carriers during unauthenticated review.
- `packages/bitcode/src/client-entry.js` now applies the host-wait guard to snapshot and control reads as well as shell mount, so the application shell bridge no longer imports the preserved shell module before `bitcodeApplicationRoot` and `heroEyebrow` exist.
- `packages/bitcode/V26_APPLICATION_SYSTEMS.md` and `packages/bitcode/V26_PROOF_SURFACES.md` now exist as explicit supplementary non-canonical carriers for the converged application architecture and its expanded proof/test/spec obligations.
- the active internal module namespace is now `@bitcode/*` across workspace manifests, path aliases, and active source imports.
- V26 proof closure now explicitly requires the retained and repurposed whole repository that survives into V26 production canon to be proven up to Bitcode-grade satisfaction rather than leaving strong proof posture isolated to the former `engi-demo` core.

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
- a modular supplementary-doc rewrite map for non-canonical repository docs that need fuller system detail once V26 becomes more package- and subsystem-shaped,
- and an acceptance matrix that separates second-gate from third-gate and fourth-gate work.

This pack should be treated as required V26 drafting work before broad second-gate implementation begins.
It must now also assign proof/test/spec coverage expectations to any new second-gate code systems rather than letting them accumulate as unproven application glue.

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
- the exact master-detail structure for transactions, deliverables, proofs, and history within `/application`,
- the exact fullscreen overlay choreography for conversations relative to the main application workspace,
- how the late-Engi design-system atmosphere should be preserved while the product expression stays entirely Bitcode,
- and which external interfacings must be considered second-gate-stable before the new application page is considered ready.

### 2. Third-gate marketing refurbishment shape

Still open:
- what exactly the public marketing page should inherit from the stabilized second-gate application language,
- which parts of current marketing can remain untouched until after second-gate acceptance,
- and what third-gate acceptance should require versus leave to later refinement.

Current draft-only spine to preserve for that future gate:
- where + when:
  engineering economy participants
- who:
  producers, consumers + investors, partners, researchers
- how:
  open, auditable, formal
- what:
  observable, modular, hackable
- why:
  throughput, quality, cost, trust

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
- where the current credits carrier is cut and replaced by wallet-connected Bitcoin for auth, share ownership, and token transfers,
- and how much of the current MetaMask/auth code can be reused without redesign.

### 8. Compatibility-carrier treatment

Still open:
- whether `.engi/*` remains the emitted namespace in V26,
- whether repo-local `ENGI_SPEC_*` remains stable through V26 promotion,
- how far directory names, script names, and other non-module compatibility carriers should follow the now-active `@bitcode/*` module namespace,
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
