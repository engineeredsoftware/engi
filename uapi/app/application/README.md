# `/application`

`/application` is the primary Bitcode route and the center of V26 second-gate closure.

Its job is to keep one operator route coherent:
- recent Terminal activity as the scoped read surface,
- selected activity detail as the selected result surface,
- give and need as the primary write actions,
- fullscreen conversations and auxillaries as deeper modes entered from within the route,
- and the preserved lower runtime available only when dense proof/settlement inspection is required.

## Main experience model

V26 locks three experiences:
- `terminal activity`
- `conversations`
- `auxillaries`

V26 locks two actions:
- `give`
- `need`

`/application` owns the first experience directly and launches the other two.

## Main route systems

- `ApplicationPageClient.tsx`
  Route owner, activity-query state owner, and shell/auxillary/conversation entry owner.
- `ApplicationTransactionWorkspace.tsx`
  Main Terminal activity and selected-result shell.
- `application-transaction-query.ts`
  Route-owned filter, paging, and selected-activity state.
- `ApplicationCommandDeck.tsx`
  Scenario, projection, branch mode, reset, and flow-guide entry posture.
- `ApplicationGiveNeedWorkbench.tsx`
  Give and need write posture inside the route.
- `ApplicationPreservedShellSurface.tsx`
  Lower runtime drawer for proof/settlement follow-through.
- `application-shell-bridge.tsx`
  Shared mounted-shell snapshot/control bridge.

## Current V26 checkpoint expectations

First-and-second-gate checkpoint confidence requires `/application` to be:
- renderable in mock-mode review,
- route-query owned for activity selection and filtering,
- user-facing in copy and help posture,
- free of demo/tutorial/gate narration in the visible product surface,
- free of generic settings/configuration language when the live surface is really expressing auxillary or interface posture,
- able to reopen auxillaries as a full-width contained auxillary shell without collapsing the activity ledger into modal-width account furniture,
- supported by shared execution carriers instead of growing page-local duplication,
- documented alongside the root/package/shared-component README family as required second-gate implementation scope,
- and backed by proof/test/doc carriers that reflect the real route shape.

## Related shared systems

- [../../components/base/bitcode/execution/README.md](../../components/base/bitcode/execution/README.md)
- [../auxillaries/README.md](../auxillaries/README.md)
- [../../../protocol-demonstration/README.md](../../../protocol-demonstration/README.md)
