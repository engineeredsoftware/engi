# `/app/executions` Bitcode Executions

`/executions` remains the retained runs-and-deliverables route during V26 fourth-gate convergence.

It is not the final Bitcode product topology, but it must remain explicit and healthy while the
strongest run, deliverable, and inspection patterns continue porting inward to `/application`.

Current owners:
- `page.tsx`
  Direct route metadata for the retained executions surface.
- `[runId]/page.tsx`
  Direct retained execution-detail route for one run.
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

This route should stay explicit about:
- retained runs and pipeline continuity,
- deliverable and execution inspection semantics,
- direct route/API ownership during fourth-gate,
- and inward convergence toward `/application` rather than peer-product permanence.
