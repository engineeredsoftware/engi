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
  The application-owned operating workspace for repo supply, measured need, runs, deliverables, proofs, and history.
- `conversations`
  The fullscreen chat workspace entered from within `/application`.
- `orbitals`
  The fullscreen settings workspace entered from within `/application`.
- `give`
  Repo supply, deposits, authenticated material intake, and operator actions that place material into the Bitcode chain.
- `need`
  Scenario framing, measured demand, fit pressure, and operator actions that express what Bitcode is trying to satisfy.

## Master-detail inner structure

Within the master-detail experience, V26 treats these as required substructures:
- `runs`
- `deliverables`
- `proofs`
- `history`

Current active carriers:
- `uapi/app/application/ApplicationExperienceFrame.tsx`
- `uapi/app/application/ApplicationCommandDeck.tsx`
- `uapi/app/application/ApplicationActionWorkbenchCard.tsx`
- `uapi/app/application/ApplicationExternalInterfacingPanel.tsx`
- `uapi/app/application/ApplicationGiveNeedWorkbench.tsx`
- `uapi/app/application/ApplicationRepositoryContextPanel.tsx`
- `uapi/app/application/ApplicationCoreNativeSections.tsx`
- `uapi/app/application/ApplicationClosureNativeSections.tsx`
- `uapi/app/application/ApplicationRunActivitySurface.tsx`
- `uapi/app/application/ApplicationRunDetailSurface.tsx`
- `uapi/app/application/ApplicationDepositComposer.tsx`
- `uapi/app/application/ApplicationRunWorkspace.tsx`
- `uapi/app/application/ApplicationSupplySelectionPanel.tsx`
- `uapi/app/application/ApplicationWorkspaceRail.tsx`
- `uapi/app/application/application-command-state.ts`
- `uapi/app/application/application-deposit-composer.ts`
- `uapi/app/application/application-external-runtime.ts`
- `uapi/app/application/application-experience-architecture.ts`
- `uapi/app/application/application-give-need-workbench.ts`
- `uapi/app/application/application-run-activity.ts`
- `uapi/app/application/application-run-detail.ts`
- `uapi/app/application/application-repository-context.ts`
- `uapi/app/application/application-supply-selection.ts`
- `packages/bitcode/src/client-entry.js`
- `packages/bitcode/public/app.js`

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

## Selected-run detail carrier

Second-gate now treats selected-run detail as an application-owned carrier instead of a mock-only inward-port preview.

Current active carriers:
- `uapi/app/application/ApplicationRunDetailSurface.tsx`
- `uapi/app/application/ApplicationRunWorkspace.tsx`
- `uapi/app/application/application-run-detail.ts`
- `/api/executions/history/[runId]`

Operational rule:
- selected-run history payloads normalize into one application-owned detail snapshot
- deliverable summary/cards render in both mock and live posture inside `/application`
- proof/history/accounting remain part of the same selected-run read surface
- the detailed execution console remains secondary compatibility context during second-gate convergence

## Application-owned run activity carrier

Second-gate now also elevates the retained execution/log/work-update system into the Bitcode application workspace instead of leaving that depth mostly to `/executions`.

Current active carriers:
- `uapi/app/application/ApplicationRunActivitySurface.tsx`
- `uapi/app/application/application-run-activity.ts`
- `uapi/hooks/usePipelineExecution.ts`
- `uapi/components/base/engi/execution/pipeline-execution-log.tsx`
- `uapi/components/base/engi/execution/pipeline-execution-log-header.tsx`
- `uapi/components/base/engi/execution/WorkUpdatePanel.tsx`

Operational rule:
- central master detail owns the selected run’s activity read
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
