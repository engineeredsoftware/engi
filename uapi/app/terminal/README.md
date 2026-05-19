# Terminal Implementation Module

This module owns the Terminal implementation. The canonical product
route is `/terminal`. No retained compatibility route belongs to this surface;
old route boundaries must be reformed in place into Terminal source.

Its job is to keep one operator route coherent:
- recent Terminal activity as the scoped read surface,
- selected activity detail as the selected result surface,
- deposit and read as the primary write actions,
- fullscreen conversations and auxillaries as adjacent modes entered from the product shell,
- and the mounted demonstration witness available only when dense proof/settlement inspection is required.

## Main experience model

V28 MVP hardening keeps these product experiences route-correct:
- `terminal activity`
- `conversations`
- `auxillaries`

The Terminal keeps two primary write actions:
- `deposit`
- `read`

`/terminal` owns Terminal activity directly and launches the adjacent modes without
presenting them as part of Terminal itself.

## Main route systems

- `TerminalPageClient.tsx`
  Route owner, activity-query state owner, and shell/auxillary/conversation entry owner.
- `TerminalTransactionWorkspace.tsx`
  Main Terminal activity and selected-result shell.
- `terminal-transaction-query.ts`
  Route-owned filter, paging, and selected-activity state.
- `terminal-journal-reconciliation.ts` and `TerminalTransactionJournalReconciliationCard.tsx`
  Selected-activity Journal section owner for ledger observations, database
  projections, canonical root facts, repair receipts, and drift state.
- `TerminalCommandDeck.tsx`
  Scenario, projection, branch mode, reset, and flow-guide entry posture.
- `TerminalDepositReadWorkbench.tsx`
  Deposit and read write posture inside the route.
- `TerminalPreservedShellSurface.tsx`
  Demonstration witness drawer for proof/settlement follow-through.
- `terminal-shell-bridge.tsx`
  Shared mounted-shell snapshot/control bridge.

## Current V28 checkpoint expectations

MVP checkpoint confidence requires `/terminal` to be:
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

## Live staging-testnet QA

Terminal Deposit/Read QA starts only after Wallet and Externals prerequisites are
green in the live staging deployment. The minimum accepted starting state is a
wallet-authenticated Supabase user, Bitcode wallet binding projection,
GitHub App installation, and at least one `vcs_repositories` row for the source
scope. The current walkthrough fixture uses `engineeredsoftware/ENGI`, but
Terminal implementation remains generic across repository, branch, commit, and
source type.

The first MVP write/read checks are:

- `Record deposit posture` writes `agentic-execution:asset-pack` with deposit state.
- `Record read posture` writes `agentic-execution:read-measurement` after
  Deposit/source posture exists.
- `Record fit posture` writes `agentic-execution:proof-refresh`.
- `Make Bitcode branch` either writes branch/AssetPack follow-through or fails
  closed with an exact transaction-readiness blocker.

Reusable Supabase query files for this pass live in `supabase/queries/`:

- `v28_qa_terminal_01_prerequisites_wallet_github_repo.sql`
- `v28_qa_terminal_02_activity_after_write.sql`
- `v28_qa_terminal_03_btd_ledger_after_terminal.sql`
- `v28_qa_terminal_04_deposit_repository_alignment.sql`

Those queries are the operator evidence path for proving Terminal UI, API
history, GitHub source inventory, and BTD ledger projections stay synchronized
while the MVP is being QAed.

When `transactionDetail=journal` is selected, the detail route must read
Terminal journal rows and reconciliation repair receipts through
`/api/executions/history/[runId]`; the UI may expose the raw payload accordion
for audit, but the operator-facing visual state must make retryable,
repairable, approval-required, blocked, and aligned states distinguishable
without browser-network inspection.

## Related shared systems

- [../../components/base/bitcode/execution/README.md](../../components/base/bitcode/execution/README.md)
- [../auxillaries/README.md](../auxillaries/README.md)
- [../../../protocol-demonstration/README.md](../../../protocol-demonstration/README.md)
