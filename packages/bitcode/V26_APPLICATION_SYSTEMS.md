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
- `uapi/app/application/ApplicationRepositoryContextPanel.tsx`
- `uapi/app/application/ApplicationCoreNativeSections.tsx`
- `uapi/app/application/ApplicationClosureNativeSections.tsx`
- `uapi/app/application/ApplicationRunWorkspace.tsx`
- `uapi/app/application/ApplicationWorkspaceRail.tsx`
- `uapi/app/application/application-experience-architecture.ts`
- `uapi/app/application/application-repository-context.ts`

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
