# V26 Application Systems

## Status

- Scope: non-canonical supplementary system document for the V26 Bitcode application architecture
- Canonical pointer: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC.txt -> V25`
- Active draft target: `ENGI_SPEC_V26.md`
- Purpose: give a fuller modular architecture view than the canon should carry line-by-line while V26 converges the application, overlay systems, and retained package owners

## Rule

This file is not canonical system truth.
Canonical V26 truth lives only in the active `ENGI_SPEC_V26*` family.
This document exists to keep the repository’s modular architecture legible while the V26 productionizing pass lands.

## Primary application architecture

V26 centers Bitcode on one primary route:
- `/application`

V26 defines three main Bitcode experiences:
1. `master detail`
2. `conversations`
3. `orbitals`

V26 defines two main Bitcode actions:
1. `give`
2. `need`

Those map as follows:
- `master detail`
  The application-owned operating workspace for repo supply, measured need, a transactions master surface, transaction detail, deliverables, proofs, and history.
- `conversations`
  The fullscreen chat workspace entered from within `/application`.
- `orbitals`
  The fullscreen settings workspace entered from within `/application`, including the transitional credits-to-wallet cutover.
- `give`
  Repo supply, deposits, authenticated material intake, and operator actions that place material into the Bitcode chain.
- `need`
  Scenario framing, measured demand, fit pressure, and operator actions that express what Bitcode is trying to satisfy.

## Master-detail inner structure

Within the master-detail experience, V26 treats these as required substructures:
- `transactions`
- `deliverables`
- `proofs`
- `history`

Current active carriers:
- `uapi/app/application/ApplicationExperienceFrame.tsx`
- `uapi/app/application/ApplicationCommandDeck.tsx`
- `uapi/app/application/ApplicationActionWorkbenchCard.tsx`
- `uapi/app/application/ApplicationExternalInterfacingPanel.tsx`
- `uapi/app/application/ApplicationGiveNeedWorkbench.tsx`
- `uapi/app/application/ApplicationLiveSummaryStrip.tsx`
- `uapi/app/application/ApplicationRepositoryContextPanel.tsx`
- `uapi/app/application/ApplicationCoreNativeSections.tsx`
- `uapi/app/application/ApplicationClosureNativeSections.tsx`
- `uapi/app/application/ApplicationTransactionActivitySurface.tsx`
- `uapi/app/application/ApplicationTransactionDetailSurface.tsx`
- `uapi/app/application/ApplicationTransactionDetailHero.tsx`
- `uapi/app/application/ApplicationTransactionIdentityCard.tsx`
- `uapi/app/application/ApplicationTransactionClosureCard.tsx`
- `uapi/app/application/ApplicationTransactionsTable.tsx`
- `uapi/app/application/ApplicationDepositComposer.tsx`
- `uapi/app/application/ApplicationNeedScenarioPanel.tsx`
- `uapi/app/application/ApplicationTransactionWorkspace.tsx`
- `uapi/app/application/ApplicationSupplySelectionPanel.tsx`
- `uapi/app/application/ApplicationWorkspaceRail.tsx`
- `uapi/app/application/application-closure-state.ts`
- `uapi/app/application/application-command-state.ts`
- `uapi/app/application/application-shell-bridge.tsx`
- `uapi/app/application/application-live-summary.ts`
- `uapi/app/application/application-deposit-composer.ts`
- `uapi/app/application/application-external-runtime.ts`
- `uapi/app/application/application-experience-architecture.ts`
- `uapi/app/application/application-give-need-workbench.ts`
- `uapi/app/application/application-need-scenarios.ts`
- `uapi/app/application/application-run-activity.ts`
- `uapi/app/application/application-transaction-detail-snapshot.ts`
- `uapi/app/application/application-transaction-detail.ts`
- `uapi/app/application/application-transaction-query.ts`
- `uapi/app/application/application-repository-context.ts`
- `uapi/app/application/application-supply-selection.ts`
- `uapi/app/application/application-transactions.ts`
- `uapi/components/base/engi/execution/BitcodeTransactionsTable.tsx`
- `packages/bitcode/src/client-entry.js`
- `packages/bitcode/public/app.js`

## Shared shell bridge provider

Second-gate now centralizes mounted-shell semantic polling and control refresh behind one reusable application bridge.

Current active carriers:
- `uapi/app/application/application-shell-bridge.tsx`
- `packages/bitcode/src/client-entry.js`
- `packages/bitcode/public/app.js`

Operational rule:
- route-local second-gate carriers consume one shared shell bridge instead of independently polling the mounted shell
- command, summary, give/need, core, closure, and intake surfaces all refresh against the same semantic Bitcode state carrier
- V26 should extend this provider rather than multiplying per-component shell refresh loops

## Transactions master carrier

Second-gate now makes master detail concrete as a searchable and filterable Bitcode transactions table rather than leaving the master surface implicit.

Current active carriers:
- `uapi/app/application/ApplicationTransactionsTable.tsx`
- `uapi/app/application/application-transactions.ts`
- `uapi/components/base/engi/execution/BitcodeTransactionsTable.tsx`
- `uapi/components/base/engi/execution/BitcodeTransactionsOverview.tsx`
- `uapi/components/base/engi/execution/BitcodeTransactionsFilterBar.tsx`
- `uapi/components/base/engi/execution/BitcodeTransactionsDataTable.tsx`
- `uapi/components/base/engi/execution/bitcode-transaction-types.ts`
- `uapi/app/application/ApplicationTransactionWorkspace.tsx`

Operational rule:
- master detail means a rich Bitcode transactions table as master and transaction detail as detail
- the read experience centers on that transactions master-detail window, while the write experience moves through give, need, and configuring from application context
- `/application` prefers `transactionId` as the master-detail query carrier while continuing to accept inbound `runId` for compatibility convergence
- transaction selection and rich master-table filters are route-owned and shareable through application query state
- transaction filtering must support free-text search, transaction-field filtering, participant ownership filtering, proof-posture filtering, and explicit sort posture
- route-local application orchestration owns normalization and selection while the base component library owns the reusable typed overview/filter/table UI carriers
- later V26 convergence should deepen this transaction surface rather than reverting back to sidebar-only or generic run-selection posture

## Route-owned transaction query carrier

Second-gate now treats transaction selection and rich master filters as route-owned application state instead of component-local table state.

Current active carriers:
- `uapi/app/application/application-transaction-query.ts`
- `uapi/app/application/ApplicationPageClient.tsx`
- `uapi/app/application/ApplicationTransactionWorkspace.tsx`
- `uapi/app/application/ApplicationTransactionsTable.tsx`
- `uapi/components/base/engi/execution/BitcodeTransactionsFilterBar.tsx`

Operational rule:
- `transactionId` remains the primary master-detail selection carrier
- inbound `runId` remains accepted only for compatibility convergence
- transaction search, status, ownership, lens, repository, participant, proof posture, and sort are persisted in route query state
- resetting filters clears only transaction-filter carriers and preserves selected transaction plus unrelated application parameters

## Give-side repository supply carrier

Second-gate now treats repository supply as an application-owned part of the `give` action rather than only as preserved-shell detail.

Current active carriers:
- `uapi/app/application/ApplicationRepositoryContextPanel.tsx`
- `uapi/app/application/application-repository-context.ts`
- `uapi/app/api/vcs/[provider]/connection/route.ts`
- `uapi/app/api/vcs/[provider]/repositories/route.ts`
- `uapi/components/base/engi/vcs/VCSRepositorySelector.tsx`

Operational rule:
- repository connection posture is application-visible before the deposit chain
- selected repository supply is route state inside `/application`
- the app-owned `/api/vcs/*` contract feeds the give-side carrier
- the preserved deposit surfaces remain the semantic source below that application frame

## Give/need semantic snapshot bridge

Second-gate now exposes the mounted Bitcode shell through a read-only semantic snapshot so route-local application carriers can reuse precise Bitcode truth without re-implementing shell-local selection logic or scraping generic markup.

Current active carriers:
- `packages/bitcode/public/app.js`
- `packages/bitcode/src/client-entry.js`
- `uapi/app/application/ApplicationGiveNeedWorkbench.tsx`
- `uapi/app/application/ApplicationActionWorkbenchCard.tsx`
- `uapi/app/application/application-give-need-workbench.ts`

Operational rule:
- the preserved shell remains the semantic owner of active scenario, auth session, deposit preview, need surface, and fit surface
- V26 route-local application carriers may consume that truth through `getBitcodeApplicationShellSnapshot()` and `readBitcodeApplicationShellSnapshot()`
- route-local give/need action detail should prefer the semantic snapshot bridge over generic DOM scraping where possible
- this bridge is read-only and does not reopen first-gate ownership

## Command-state and control bridge

Second-gate now also exposes the mounted Bitcode shell as a mutable command carrier so the application deck can drive Bitcode command posture without scraping or mutating raw shell DOM directly.

Current active carriers:
- `packages/bitcode/public/app.js`
- `packages/bitcode/src/client-entry.js`
- `uapi/app/application/ApplicationCommandDeck.tsx`
- `uapi/app/application/application-command-state.ts`

Operational rule:
- scenario, projection, branch mode, tutorial visibility, make-branch, and reset remain preserved-shell semantics
- `/application` drives those semantics through the shell control bridge rather than direct DOM reads and synthetic document listeners
- command posture is normalized into route-local application state before rendering
- second-gate command composition stays application-owned even while first-gate shell ownership remains below it

## Summary-state semantic snapshot bridge

Second-gate now also treats the Bitcode summary strip as application-owned semantic state rather than a rendered-card mirror.

Current active carriers:
- `packages/bitcode/public/app.js`
- `uapi/app/application/ApplicationLiveSummaryStrip.tsx`
- `uapi/app/application/application-live-summary.ts`

Operational rule:
- the mounted Bitcode shell now emits a compact `summarySurface` through the semantic snapshot bridge
- `/application` reads pinned and full operating posture from that summary bridge instead of scraping rendered summary cards
- summary posture stays semantically aligned to the preserved Bitcode shell while becoming application-owned route composition
- later second-gate and fourth-gate convergence work should extend this bridge rather than reintroducing summary DOM reads

## Atlas semantic bridge

Second-gate now also treats the section-atlas layer as semantic application state rather than a rendered-panel preview scrape.

Current active carriers:
- `packages/bitcode/public/app.js`
- `packages/bitcode/src/client-entry.js`
- `uapi/app/application/ApplicationSectionAtlas.tsx`
- `uapi/app/application/application-section-atlas.ts`

Operational rule:
- the route-local atlas now reads semantic core and closure bridges rather than rendered shell text
- atlas labels, previews, subheads, and item counts stay aligned to the real Bitcode body without depending on panel markup
- the atlas remains a route-local application summary layer above the preserved shell
- later second-gate convergence should extend this bridge rather than reintroducing generic DOM panel readers

## Core-state semantic snapshot bridge

Second-gate now also treats the operating-picture, depositing, needing, and fit body as semantic application state rather than a rendered-panel discovery problem.

Current active carriers:
- `packages/bitcode/public/app.js`
- `packages/bitcode/src/client-entry.js`
- `uapi/app/application/ApplicationCoreNativeSections.tsx`
- `uapi/app/application/application-core-surface.ts`

Operational rule:
- the mounted Bitcode shell now emits a compact `coreSurface` through the semantic snapshot bridge
- `/application` normalizes that core surface into operating, give, need, and fit cards without scraping rendered shell panel markup
- the application core body now reads exact Bitcode semantic posture while remaining route-local composition
- later second-gate and fourth-gate convergence work should extend this bridge rather than reintroducing DOM-era panel readers

## Give-side intake selection carrier

Second-gate now also treats authenticated intake session, artifact filtering, search, and inventory selection as route-local application composition rather than preserved-shell-only control surfaces.

Current active carriers:
- `uapi/app/application/ApplicationSupplySelectionPanel.tsx`
- `uapi/app/application/application-supply-selection.ts`
- `packages/bitcode/public/app.js`
- `packages/bitcode/src/client-entry.js`

Operational rule:
- the mounted Bitcode shell remains the semantic owner of intake selection
- `/application` reads and drives intake selection through the shell snapshot/control bridge
- selected inventory, artifact filters, and authenticated session binding are explicit in the give-side workspace before the preserved deposit chain
- second-gate should keep moving intake behavior inward to route-local application carriers without inventing alternate Bitcode semantics

## Native deposit submission carrier

Second-gate now also treats deposit submission itself as application-owned behavior rather than preserved-shell-only form ownership.

Current active carriers:
- `uapi/app/application/ApplicationDepositComposer.tsx`
- `uapi/app/application/application-deposit-composer.ts`
- `uapi/app/api/deposits/route.ts`
- `packages/bitcode/public/app.js`
- `packages/bitcode/src/client-entry.js`

Operational rule:
- `/application` posts deposits through the app-owned Bitcode route contract
- selected inventory and authenticated session continuity are derived from the mounted shell snapshot/control bridge
- title/author inference, raw fallback behavior, and selection-derived payload rules stay aligned to the Bitcode deposit builder
- the native application composer strengthens second-gate without forking deposit semantics away from the preserved Bitcode chain

## Native need-scenario carrier

Second-gate now also treats active need selection as application-owned behavior rather than preserved-shell-only scenario selection.

Current active carriers:
- `uapi/app/application/ApplicationNeedScenarioPanel.tsx`
- `uapi/app/application/application-need-scenarios.ts`
- `packages/bitcode/public/app.js`
- `packages/bitcode/src/client-entry.js`

Operational rule:
- `/application` selects the active Bitcode scenario through the shell control bridge
- parser posture, closure count, and target-kind count remain visible inside the native need workspace
- scenario selection stays semantically aligned to the mounted Bitcode shell rather than creating a competing need state
- second-gate should keep shifting need behavior inward to route-local application carriers while preserving Bitcode need/fit semantics

## Closure-state semantic snapshot bridge

Second-gate now also treats verification, branch, settlement, and ledger semantics as an application-owned native carrier rather than a rendered-shell discovery problem.

Current active carriers:
- `packages/bitcode/public/app.js`
- `packages/bitcode/src/client-entry.js`
- `uapi/app/application/ApplicationClosureNativeSections.tsx`
- `uapi/app/application/application-closure-state.ts`

Operational rule:
- the mounted Bitcode shell now emits a compact `closureSurface` through the semantic snapshot bridge
- `/application` normalizes that closure surface into verification, branch, settlement, and ledger panels without re-deriving meaning from rendered shell DOM
- closure-side second-gate carriers should prefer this semantic bridge over generic DOM reads whenever the underlying Bitcode state is already available
- deeper fourth-gate and fifth-gate proof closure should build from this bridge rather than recreating a parallel closure semantics layer

## Closure-operation application carrier

Second-gate now also treats closure execution posture as application-owned behavior rather than an implicit preserved-shell action.

Current active carriers:
- `uapi/app/application/ApplicationClosureControlDeck.tsx`
- `uapi/app/application/application-closure-controls.ts`
- `packages/bitcode/public/app.js`
- `packages/bitcode/src/client-entry.js`

Operational rule:
- `/application` normalizes closure operation posture from command and closure semantic bridges
- make-branch, refresh, reset, and closure follow-through remain Bitcode shell semantics underneath
- closure interaction now reads as a route-local Bitcode operator deck instead of a hidden lower-body shell action
- later second-gate work should deepen closure behavior from this carrier rather than relocating control back into preserved-shell UI

## External interfacing posture carrier

Second-gate now also treats boundary honesty and external actuality as application-owned read surfaces rather than preserved-shell-only detail.

Current active carriers:
- `uapi/app/application/ApplicationExternalInterfacingPanel.tsx`
- `uapi/app/application/application-external-runtime.ts`
- `uapi/app/api/v24/external-realization/route.ts`

Operational rule:
- environment mode and actuality disposition are application-visible inside `/application`
- per-interface runtime state stays explicit for bitcoin, repeated-read, sidechain, compute, storage, and GitHub
- boundary-only, mock, live-configured, and misconfigured states remain visible and fail closed
- the app-owned V24 route feeds the application carrier while preserved-shell boundary reading remains below as semantic context

## Selected-transaction detail carrier

Second-gate now treats selected-transaction detail as an application-owned carrier instead of a mock-only inward-port preview.

Current active carriers:
- `uapi/app/application/ApplicationTransactionDetailSurface.tsx`
- `uapi/app/application/ApplicationTransactionDetailHero.tsx`
- `uapi/app/application/ApplicationTransactionIdentityCard.tsx`
- `uapi/app/application/ApplicationTransactionClosureCard.tsx`
- `uapi/app/application/ApplicationTransactionWorkspace.tsx`
- `uapi/app/application/application-transaction-detail-snapshot.ts`
- `uapi/app/application/application-transaction-detail.ts`
- `/api/executions/history/[runId]`

Operational rule:
- selected-transaction history payloads normalize into one application-owned detail snapshot
- overview, identity, and closure reading are split into SRP-aligned transaction-detail modules rather than one mixed-responsibility pane
- deliverable summary/cards render in both mock and live posture inside `/application`
- proof/history/accounting remain part of the same selected-transaction read surface
- the detailed execution console remains secondary compatibility context during second-gate convergence

## Application-owned transaction activity carrier

Second-gate now also elevates the retained execution/log/work-update system into the Bitcode application workspace instead of leaving that depth mostly to `/executions`.

Current active carriers:
- `uapi/app/application/ApplicationTransactionActivitySurface.tsx`
- `uapi/app/application/application-run-activity.ts`
- `uapi/hooks/usePipelineExecution.ts`
- `uapi/components/base/engi/execution/pipeline-execution-log.tsx`
- `uapi/components/base/engi/execution/pipeline-execution-log-header.tsx`
- `uapi/components/base/engi/execution/WorkUpdatePanel.tsx`

Operational rule:
- central master detail owns the selected transaction’s activity read
- retained execution/log carriers are reused under Bitcode application ownership
- the rail is selection/orientation focused rather than duplicating the detailed activity surface
- compatibility execution pages remain available during convergence but are no longer the only rich carrier

## Overlay choreography

V26 keeps `/application` as the owned page context and mounts overlays from within it.

Current active carriers:
- conversations overlay:
  `uapi/app/conversations/components/ConversationsOverlay.tsx`
- orbitals overlay:
  `uapi/app/orbitals/components/OrbitalsProvider.tsx`
  `uapi/app/orbitals/components/index.tsx`

Operational rule:
- conversations and orbitals are not peer product destinations
- they are fullscreen application overlays entered from the application frame

## Active application-owned API carriers

Current active V26-facing API surfaces include:
- `uapi/app/api/state/route.ts`
- `uapi/app/api/deposits/route.ts`
- `uapi/app/api/make-bitcode-branch/route.ts`
- `uapi/app/api/make-engi-branch/route.ts`
- `uapi/app/api/reset/route.ts`
- `uapi/app/api/bitcoin-demonstration-service/route.ts`
- `uapi/app/api/orbitals/data/route.ts`
- `uapi/app/api/conversations/route.ts`
- `uapi/app/api/conversations/branch/route.ts`
- `uapi/app/api/conversations/stream/route.ts`
- `uapi/app/api/conversations/[conversationId]/stream/route.ts`
- `uapi/app/api/vcs/[provider]/connection/route.ts`
- `uapi/app/api/vcs/[provider]/oauth/route.ts`
- `uapi/app/api/vcs/[provider]/connect-token/route.ts`
- `uapi/app/api/vcs/[provider]/repositories/route.ts`
- `uapi/app/api/v24/external-realization/route.ts`
- `uapi/app/api/v24/executors/[interfaceId]/route.ts`

## Retained package convergence

V26 still reuses older package reservoirs, but only under explicit Bitcode roles.

Current major retained owners:
- `packages/bitcode/*`
  Preserved deterministic shell/runtime/proof baseline from first-gate.
- `packages/api/src/routes/deliverables.ts`
  Current deliverable and run-oriented backend surface being ported inward.
- `packages/api/src/conversations/*`
  Current conversation/message/streaming backend surface.
- `packages/prompts/src/*`
  Prompt abstraction and future proved prompt-space carrier.
- `packages/vcs/*`
  Version-control provider abstraction and connection ownership.
- `packages/execution-generics/*`, `packages/pipelines-generics/*`, `packages/pipelines/*`
  Run/pipeline execution carriers being converged into Bitcode V26 semantics.

## Module namespace direction

V26 now uses `@bitcode/*` as the active module namespace across workspace package names, path aliases, and imports.

That means:
- package manifests now declare `@bitcode/*` names,
- path aliases now resolve through `@bitcode/*`,
- and active source imports should no longer introduce older ENGI-scoped module references.

Compatibility work that still keeps older ENGI-named files or directories does not justify reintroducing older ENGI-scoped module usage in active source.
