# `/app/executions` retained Bitcode Activity route

`/executions` remains the retained compatibility route during V26 fourth-gate convergence.

It is not the final Bitcode product topology.
Merged-world V26 converges this retained route on `activity`, with transactions as the dominant initial activity class and later non-transactional activity such as notifications or public/personal system usage joining the same master-detail family.
The compatibility route must remain explicit and healthy while the strongest run, deliverable, and inspection patterns continue porting inward to `/application`.

Current owners:
- `page.tsx`
  Direct route metadata for the retained activity compatibility surface.
- `[runId]/page.tsx`
  Direct retained activity-detail route for one run.
- `components/ExecutionsPage.tsx`
  Route-level shell for the main retained executions read.
- `components/ExecutionsPageClient.tsx`
  The active retained runs, deliverables, and execution-log composition owner.
- `components/ExecutionsDetailsView.tsx`
  Shared retained execution-detail carrier used by direct route and converged application reads.
- `../api/executions/route.ts`
  Active app-owned `/api/executions` route mounted from the canonical deliverables business-logic owner.
- `../api/executions/history/*`
  App-owned retained history JSON carriers for selected-run hydration.
- `../api/vcs/route.ts`
  Retained compatibility carrier for provider/account/repository/branch/commit/issue reads required by the execution selectors.
- `../api/templates/deliverables/route.ts`
  Retained compatibility carrier for deliverable template reads used by the execution composer.
- `../api/orbitals/template-preferences/route.ts`
  Retained compatibility carrier for saved deliverable-template preferences used by the execution composer.

This route should stay explicit about:
- retained runs, pipeline continuity, and transactions-first activity naming,
- later admission of notifications and public/personal system usage as additional activity classes,
- deliverable and execution inspection semantics,
- retained compatibility API ownership required to keep the route healthy during inward convergence,
- direct route/API ownership during fourth-gate,
- and inward convergence toward `/application` and final `activity` ownership rather than peer-product permanence.
