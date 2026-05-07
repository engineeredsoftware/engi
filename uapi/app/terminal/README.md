# Terminal Implementation Module

This module owns the commercial Terminal implementation. The canonical product
route is `/terminal`. No retained compatibility route belongs to this surface;
old route boundaries must be reformed in place into Terminal source.

Its job is to keep one operator route coherent:
- recent Terminal activity as the scoped read surface,
- selected activity detail as the selected result surface,
- give and need as the primary write actions,
- fullscreen conversations and auxillaries as adjacent modes entered from the product shell,
- and the mounted demonstration witness available only when dense proof/settlement inspection is required.

## Main experience model

V28 commercial MVP hardening keeps these product experiences route-correct:
- `terminal activity`
- `conversations`
- `auxillaries`

The Terminal keeps two primary write actions:
- `give`
- `need`

`/terminal` owns Terminal activity directly and launches the adjacent modes without
presenting them as part of Terminal itself.

## Main route systems

- `TerminalPageClient.tsx`
  Route owner, activity-query state owner, and shell/auxillary/conversation entry owner.
- `TerminalTransactionWorkspace.tsx`
  Main Terminal activity and selected-result shell.
- `terminal-transaction-query.ts`
  Route-owned filter, paging, and selected-activity state.
- `TerminalCommandDeck.tsx`
  Scenario, projection, branch mode, reset, and flow-guide entry posture.
- `TerminalGiveNeedWorkbench.tsx`
  Give and need write posture inside the route.
- `TerminalPreservedShellSurface.tsx`
  Demonstration witness drawer for proof/settlement follow-through.
- `terminal-shell-bridge.tsx`
  Shared mounted-shell snapshot/control bridge.

## Current V28 checkpoint expectations

Commercial MVP checkpoint confidence requires `/terminal` to be:
- renderable in mock-mode review,
- route-query owned for activity selection and filtering,
- user-facing in copy and help posture,
- free of demo/tutorial/gate narration in the visible product surface,
- free of generic settings/configuration language when the live surface is really expressing auxillary or interface posture,
- able to reopen auxillaries as a full-width contained auxillary shell without collapsing the activity ledger into modal-width account furniture,
- supported by shared execution carriers instead of growing page-local duplication,
- documented alongside the root/package/shared-component README family as required Terminal implementation scope,
- and backed by proof/test/doc carriers that reflect the real route shape.

No compatibility route should be added for this surface. Route continuity must
come from current Terminal URLs and current product navigation.

## Related shared systems

- [../../components/base/bitcode/execution/README.md](../../components/base/bitcode/execution/README.md)
- [../auxillaries/README.md](../auxillaries/README.md)
- [../../../protocol-demonstration/README.md](../../../protocol-demonstration/README.md)
