# Bitcode Spec V26 Delta

## Status

- Scope: V26 canonical delta for Bitcode productionizing hardening, first-gate application migration, second-gate application-experience refit, interface hardening, and package-first repository refurbishment after V25 rename canon
- Current canonical/latest target: `V26`
- Canonical pointer: `/Users/garrettmaring/Developer/ENGI/BITCODE_SPEC.txt` -> `V26`
- Active canonical anchor: `/Users/garrettmaring/Developer/ENGI/BITCODE_SPEC_V26.md`
- Active generated proof appendix: `/Users/garrettmaring/Developer/ENGI/BITCODE_SPEC_V26_PROVEN.md`
- Canonical proof-source commit: `9d0733fed5f63d2f977900384d4103f9fd887f03`
- Prior canonical anchor: `/Users/garrettmaring/Developer/ENGI/_legacy/ENGI_SPEC_V25.md`
- Prior generated proof appendix: `/Users/garrettmaring/Developer/ENGI/_legacy/ENGI_SPEC_V25_PROVEN.md`
- Generated structured artifact inventory: active canonical `.bitcode/v19-*` reproducible reports, `.bitcode/v20-*` operator-quality reports, `.bitcode/v26-spec-family-report.json`, `.bitcode/v26-canonical-input-report.json`, `.bitcode/v26-gate-checkpoint-report.json`, `.bitcode/conversations-continuity-proof.json`, `.bitcode/runs-pipelines-totality-proof.json`, `.bitcode/persistence-schema-totality-proof.json`, `.bitcode/prompt-system-totality-proof.json`, `.bitcode/retained-package-admissibility-proof.json`, and `BITCODE_SPEC_V26_PROVEN.md`
- Spec companion: `/Users/garrettmaring/Developer/ENGI/BITCODE_SPEC_V26.md`
- Parity companion: `/Users/garrettmaring/Developer/ENGI/BITCODE_SPEC_V26_PARITY_MATRIX.md`
- Notes companion: `/Users/garrettmaring/Developer/ENGI/BITCODE_SPEC_V26_NOTES.md`
- Source parity state: through-fourth-gate promotion closure is now materially in place across application routes, auxillary compatibility redirects, retained-system convergence, persistence witnesses, prompt-system ports, and documentation/spec synchronization; fifth through eighth gate remain open
- V26 state: canonical promotion complete; V26 is the active Bitcode canon while fifth-, sixth-, seventh-, and eighth-gate closure remain open

## Why V26 exists

V25 completed the active current-facing rename to Bitcode and BTD.
V26 exists because rename closure was not architectural closure.

The concrete V26 delta is:
- the old standalone demonstration ownership had to be removed,
- the Bitcode application route had to become app-native,
- the repo had to stop treating the former top-level demo directory as the primary system owner,
- the preserved Bitcode protocol UX had to survive the ownership move,
- the retained and repurposed whole repository now has to be proven up to Bitcode-grade production satisfaction rather than leaving strong proof closure isolated to the former demo core,
- and production hardening had to continue beyond V25’s first rename gate.

## Gate Structure

### First-gate

First-gate is the ownership migration gate.
Its rule is:
- keep the Bitcode protocol UX, content, ordering, interactions, and deterministic state contract effectively the same,
- move the runtime and shell contract into package/app ownership,
- remove the former top-level demo directory as a directory owner,
- and make the application page the live carrier.

First-gate does **not** require deep application-experience redesign.
It requires exact preservation while ownership moves.

### Second-gate

Second-gate is the application UX/UI and external-interfacing hardening gate.
Its rule is:
- keep the first-gate Bitcode semantics,
- replace preserved shell implementation surfaces with native application-facing composition,
- keep `/application` as the only primary Bitcode destination,
- keep conversations and orbitals as fullscreen overlays entered from within `/application`,
- port the strongest executions/deliverables master-detail patterns inward to `/application`,
- retain the pre-Bitcode navbar as the application navigation frame,
- converge more of the page onto `uapi/components/base/*`,
- lock the read experience onto a rich transactions master-detail workspace and the write experience onto Give/Need draft flow,
- keep live application copy user-facing rather than demo-facing, canon-facing, or source-path-facing,
- keep preserved-runtime guidance user-facing as a `flow guide` rather than a visible `tutorial`,
- fix the orbital model as `Connects`, `Interfaces`, `Profile`, and `$BTD`,
- stabilize the contained orbital shell so ring visuals, pane layout, and motion remain subordinate to reading,
- treat README and markdown refurbishment for the active route/package/component owners as part of second-gate implementation,
- keep the visual atmosphere aligned to the retained pre-Bitcode design system while the product itself is entirely Bitcode,
- and harden the new application page plus its external interfacings up to stable readiness.

### Third-gate

Third-gate is the marketing refurbishment gate.
Its rule is:
- keep marketing work separate from application-route acceptance,
- refurbish the public website only after second-gate application work is stable,
- avoid letting marketing-page changes blur application acceptance criteria,
- preserve rich tooltip/help posture instead of flattening it during cleanup,
- and keep public product language aligned to Give, Need, transactions, conversations, and Auxillaries rather than demo or gate narration.

The current V26 near-term checkpoint is explicitly earlier than third-gate closure:
- first-gate and second-gate closure are carried by `.bitcode/v26-gate-checkpoint-report.json`,
- that checkpoint must leave third-gate preparation explicit,
- and third-gate promotion work must remain separate from second-gate application acceptance.

Its current draft-only content spine is:
- where + when:
  engineering economy participants
- who:
  producers, consumers + investors, partners, researchers
- how:
  open, auditable, formal
- what:
  modular, observable, hackable
- why:
  throughput, quality, cost, trust

### Fourth-gate

Fourth-gate is the retained-system convergence gate.
Its rule is:
- keep conversations and the chat-based application interface as first-class systems,
- keep those systems mounted from the application context rather than as the finished product topology,
- port those systems into Bitcode V26 semantics,
- converge runs, pipelines, and deliverable meaning onto a V26 total system,
- converge PostgreSQL/Supabase storage, `/edgetimes`, migrations, schemas, ORM/query carriers, and generated types onto an explicit Bitcode owner,
- finish the initial migration, schema, ORM, type, and API closure across `supabase/*`, `packages/supabase/*`, `packages/orm/*`, and storage-facing app/API routes,
- assign explicit comment, documentation, proof, test, and CI expectations to those retained storage and package systems,
- treat current executions/deliverables surfaces as reusable master-detail/workspace carriers to port into `/application`,
- require prompt abstraction to directly own retained prompt text,
- and admit retained packages only where V26 gives them an explicit role.

### Fifth-gate

Fifth-gate is the post-promotion proof precision, schema-refinement, and full-provation gate.
Its rule is:
- close V26 only under explicit proof-family precision,
- prove the retained and repurposed whole repository that survives into V26 production canon rather than only the old demo-equivalent core,
- prove migrations, schema contracts, ORM/query carriers, generated types, storage/API contracts, and retained package boundaries rather than leaving persistence informal,
- add the debug setting and floating debug widget,
- ensure the environment toggle refreshes the application coherently,
- prove production/staging/development mode behavior,
- and finish rename/finalization cleanup required for promotion.

## Current First-Gate File Structure

The current first-gate V26 structure is:

- `protocol-demonstration/package.json`
  Bitcode now preserves the former deterministic runtime under a root sibling protocol owner rather than a top-level standalone app directory.
- `protocol-demonstration/src/*`
  Canon posture, deterministic state machine, proof, settlement, projection, and external-realization code moved under preserved protocol ownership.
- `protocol-demonstration/public/app.js`
  The preserved first-gate shell behavior now lives under preserved protocol ownership and is mounted by the application route instead of by a standalone server-owned HTML page.
- `protocol-demonstration/public/styles.css`
  The preserved first-gate shell stylesheet now serves the app-owned route.
- `protocol-demonstration/server.js`
  The deterministic runtime/context remains available as preserved protocol HTTP/runtime composition under `protocol-demonstration/server.js`; the old `engi-demo/server.js` ownership is retired.
- `protocol-demonstration/test/*`
  First-gate proof/runtime validation moved with the preserved protocol owner.
- `uapi/app/application/page.tsx`
  `/application` remains the Bitcode first-class route carrier.
- `uapi/app/application/ApplicationPageClient.tsx`
  The application route now renders the preserved first-gate Bitcode shell markup directly in the app.
- `uapi/app/application/first-gate-styles/route.ts`
  The application route serves the preserved first-gate stylesheet as an app-owned surface.
- `uapi/lib/bitcode-app-context.ts`
  Shared app-owned bridge from Next route handlers into the preserved protocol-owned Bitcode context.
- `uapi/app/api/state/route.ts`
- `uapi/app/api/deposits/route.ts`
- `uapi/app/api/make-bitcode-branch/route.ts`
- `uapi/app/api/reset/route.ts`
- `uapi/app/api/bitcoin-demonstration-service/route.ts`
- `uapi/app/api/auxillaries/data/route.ts`
- `uapi/app/api/v24/external-realization/route.ts`
- `uapi/app/api/v24/executors/[interfaceId]/route.ts`
  These now carry the preserved first-gate JSON contract from the application instead of from a standalone demo server.

## Accepted V26 decisions

The accepted V26 decisions are now:

1. V26 is productionizing hardening rather than rename follow-on cleanup alone.
2. V25 remains the active behavioral and canonical baseline during V26 drafting.
3. `/application` is the first-gate Bitcode route carrier.
4. The homepage embedded demo posture is removed.
5. the former top-level demo directory no longer exists as a source directory.
6. First-gate preserves the old Bitcode operator UX and deterministic state/API contract under new protocol/app ownership.
7. First-gate uses `protocol-demonstration` as the immediate preserved protocol owner.
8. First-gate review must work through `/application` in mock mode so interface quality can be inspected without live external data.
9. Second-gate is application UX/UI plus external-interfacing hardening, not marketing refurbishment.
10. Third-gate is the marketing refurbishment gate.
11. Fourth-gate ports retained conversations, runs/pipelines, deliverables, prompt abstraction, and retained agent/tool layers into the V26 total system.
12. Fourth-gate also explicitly owns PostgreSQL/Supabase, `/edgetimes`, migrations, schema contracts, ORM/query carriers, generated database types, and their proof/test/doc/comment closure.
13. Fourth-gate retained `/executions` compatibility APIs are explicit promotion-boundary owners rather than incidental glue.
14. Fourth-gate merged-world naming now keeps `executions` explicit as executions primitives inside the broader `activity` family, where transactions, executions, and notifications can coexist precisely.
15. Fourth-gate now also requires one shared Bitcode activity vocabulary so transactions, retained execution events, and user-facing notifications normalize through the same typed activity model before later activity classes are admitted.
16. Fourth-gate merged-world naming now converges `orbitals` on `auxillaries`, keeping non-transactional, extra-network, still-proven preference/interface/identity/connection surfaces around the Bitcode core.
17. Old-world port scope is now explicit: Jira is reader-first need ingestion and Git/GH is the initial admitted settle-write boundary for testnet-ready promotion.
18. `/application` is the only primary Bitcode destination in the finished V26 product posture.
19. Auxillaries and conversations are fullscreen overlays entered from within `/application` rather than peer product destinations.
20. Auxillaries are fixed as four rings: `Connects`, `Interfaces`, `Profile`, and `$BTD`.
21. Existing executions/deliverables systems are master-detail reuse reservoirs to be ported inward rather than preserved as the lasting topology.
22. The pre-Bitcode navbar remains the integrated application navigation frame for Bitcode.
23. Fifth-gate carries mandatory proof closure/finalization work including the debug widget, environment toggle, environment completeness, retained-package proving, and remaining rename cleanup.
24. Existing packages such as `packages/github`, `packages/auth`, `packages/api`, `packages/supabase`, `packages/orm`, `packages/prompts`, `packages/conversations-generics`, and `packages/execution-generics` remain convergence targets where that ownership is the correct long-term fit.
25. Authentication, wallet posture, GitHub, bitcoin, sidechain, repeated-read, compute, storage, telemetry, and reconciliation remain in scope for V26 hardening.
26. Transaction source posture inside `/application` is now explicitly three-state rather than binary: `live`, `mock-review`, and `review-fallback`, with review-fallback kept labeled when mock transaction review URLs land on empty live history.
27. Second-gate checkpoint closure now explicitly includes README/markdown refurbishment for the active Bitcode route, orbital, execution, and package owners, and the generated checkpoint must fail if those documentation carriers disappear.

## Remaining V26 delta after first-gate

The remaining V26 delta is now concentrated in:
- second-gate application UX/UI refit of the preserved Bitcode shell,
- second-gate external-interfacing hardening for stable readiness in the new application page,
- second-gate single-surface application composition around `/application`,
- third-gate marketing refurbishment,
- fourth-gate retained-system convergence for conversations, runs/pipelines, retained execution compatibility APIs, deliverables, prompts, and retained agent/tool layers,
- fifth-gate debug/finalization work including the floating debug widget and environment toggle,
- production, staging, and development mode completeness within the new application expression,
- deeper package splitting beyond the immediate `protocol-demonstration` consolidation owner,
- GitHub convergence onto longer-term package/API owners,
- wallet productionization,
- credits-to-wallet cutover so wallet-connected Bitcoin replaces credits as the end-state auth, share-ownership, and token-transfer carrier,
- deeper auth hardening,
- richer external-interface hardening,
- telemetry and reconciliation hardening,
- and repo/documentation cleanup that removes stale standalone-demo language.

## Precise second-gate specification targets

Second-gate is now specified as:
- route-local native application composition for `/application`,
- `/application` as the only primary Bitcode destination,
- `master detail`, `conversations`, and `orbitals` as the three main Bitcode application experiences,
- `give` and `need` as the two main Bitcode actions,
- fullscreen conversations and orbitals entered from within `/application`,
- fixed orbital-ring ownership as `Connects`, `Interfaces`, `Profile`, and `$BTD`,
- inward porting of executions/deliverables master-detail reuse patterns,
- retention of the pre-Bitcode navbar as the application frame,
- semantic preservation of the carried first-gate Bitcode flow,
- explicit reuse of current `uapi/components/base/*` and orbital carriers where those owners fit,
- live copy that is user-facing rather than demo-facing or gate-facing,
- flow-guide naming and contained-orbital shell behavior as production-facing surfaces rather than incidental implementation details,
- markdown/readme refurbishment for the active route/package/component owners so the growing Bitcode system remains legible while it is being componentized,
- preservation of the retained pre-Bitcode aesthetic atmosphere while the product identity remains entirely Bitcode,
- and stable-readiness hardening for the application-facing external interfacings visible through the new page.

The current active second-gate source file additions are:
- `uapi/app/application/ApplicationCommandDeck.tsx`
- `uapi/app/application/ApplicationActionWorkbenchCard.tsx`
- `uapi/app/application/ApplicationExperienceFrame.tsx`
- `uapi/app/application/ApplicationExternalInterfacingPanel.tsx`
- `uapi/app/application/ApplicationClosureControlDeck.tsx`
- `uapi/app/application/ApplicationNeedScenarioPanel.tsx`
- `uapi/app/application/ApplicationGiveNeedWorkbench.tsx`
- `uapi/app/application/ApplicationLiveSummaryStrip.tsx`
- `uapi/app/application/ApplicationRepositoryContextPanel.tsx`
- `uapi/app/application/ApplicationSectionAtlas.tsx`
- `uapi/app/application/ApplicationCoreNativeSections.tsx`
- `uapi/app/application/ApplicationClosureNativeSections.tsx`
- `uapi/app/application/ApplicationTransactionActivitySurface.tsx`
- `uapi/app/application/ApplicationTransactionDetailSurface.tsx`
- `uapi/app/application/ApplicationTransactionDetailHero.tsx`
- `uapi/app/application/ApplicationTransactionIdentityCard.tsx`
- `uapi/app/application/ApplicationTransactionClosureCard.tsx`
- `uapi/app/application/ApplicationTransactionsTable.tsx`
- `uapi/app/application/ApplicationDepositComposer.tsx`
- `uapi/app/application/ApplicationSupplySelectionPanel.tsx`
- `uapi/app/application/application-core-surface.ts`
- `uapi/app/application/application-shell-bridge.tsx`
- `uapi/app/application/application-closure-controls.ts`
- `uapi/app/application/application-closure-state.ts`
- `uapi/app/application/application-deposit-composer.ts`
- `uapi/app/application/application-command-state.ts`
- `uapi/app/application/application-section-atlas.ts`
- `uapi/app/application/application-live-summary.ts`
- `uapi/app/application/application-external-runtime.ts`
- `uapi/app/application/application-experience-architecture.ts`
- `uapi/app/application/application-give-need-workbench.ts`
- `uapi/app/application/application-need-scenarios.ts`
- `uapi/app/application/application-run-activity.ts`
- `uapi/app/application/application-transaction-source.ts`
- `uapi/app/application/application-transaction-detail-snapshot.ts`
- `uapi/app/application/application-transaction-detail.ts`
- `uapi/app/application/ApplicationTransactionDetailActionBar.tsx`
- `uapi/app/application/application-repository-context.ts`
- `uapi/app/application/application-shell-sections.ts`
- `uapi/app/application/application-shell-reading.ts`
- `uapi/app/application/application-supply-selection.ts`
- `uapi/app/application/application-transaction-query.ts`
- `uapi/app/application/application-transactions.ts`
- `uapi/app/application/ApplicationWorkspaceRail.tsx`
- `uapi/app/application/ApplicationTransactionWorkspace.tsx`
- `uapi/app/application/ApplicationMockTransactionDetails.tsx`
- `uapi/app/application/application-run-data.ts`
- `uapi/components/base/bitcode/execution/BitcodeTransactionsTable.tsx`
- `uapi/components/base/bitcode/execution/BitcodeTransactionsOverview.tsx`
- `uapi/components/base/bitcode/execution/BitcodeTransactionsFilterBar.tsx`
- `uapi/components/base/bitcode/execution/BitcodeTransactionsActiveFilters.tsx`
- `uapi/components/base/bitcode/execution/BitcodeTransactionsDataTable.tsx`
- `uapi/components/base/bitcode/execution/BitcodeTransactionsPagination.tsx`
- `uapi/components/base/bitcode/execution/BitcodeDetailRowList.tsx`
- `uapi/components/base/bitcode/execution/BitcodeMetricGrid.tsx`
- `uapi/components/base/bitcode/execution/BitcodeDetailCollection.tsx`
- `uapi/components/base/bitcode/execution/BitcodeDetailPanel.tsx`
- `uapi/components/base/bitcode/execution/BitcodeChipCloud.tsx`
- `uapi/components/base/bitcode/execution/BitcodeActionPillRow.tsx`
- `uapi/components/base/bitcode/execution/BitcodeInlineExplainer.tsx`
- `uapi/components/base/bitcode/execution/BitcodeExecutionStreamPanel.tsx`
- `uapi/components/base/bitcode/execution/BitcodePayloadRowsCard.tsx`
- `uapi/components/base/bitcode/execution/BitcodePayloadCollectionCard.tsx`
- `uapi/components/base/bitcode/execution/BitcodePayloadDetailCard.tsx`
- `uapi/components/base/bitcode/execution/BitcodePayloadInspector.tsx`
- `uapi/components/base/bitcode/execution/BitcodePayloadShape.tsx`
- `uapi/components/base/bitcode/execution/BitcodePayloadTree.tsx`
- `uapi/components/base/bitcode/execution/bitcode-transaction-active-filters.ts`
- `uapi/components/base/bitcode/execution/bitcode-transaction-data-mode.ts`
- `uapi/components/base/bitcode/execution/bitcode-transaction-explainers.ts`
- `uapi/components/base/bitcode/execution/bitcode-transaction-types.ts`
- `uapi/app/api/conversations/route.ts`
- `uapi/app/api/conversations/branch/route.ts`
- `uapi/app/api/conversations/stream/route.ts`
- `uapi/app/api/conversations/[conversationId]/stream/route.ts`
- `uapi/app/api/vcs/[provider]/connection/route.ts`
- `uapi/app/api/vcs/[provider]/oauth/route.ts`
- `uapi/app/api/vcs/[provider]/connect-token/route.ts`
- `uapi/app/api/vcs/[provider]/repositories/route.ts`
- `uapi/app/conversations/components/ConversationsOverlay.tsx`
- `uapi/tests/applicationRepositoryContext.test.ts`
- `uapi/tests/applicationCommandState.test.ts`
- `uapi/tests/applicationShellBridge.test.tsx`
- `uapi/tests/applicationClosureControls.test.ts`
- `uapi/tests/applicationCoreSurface.test.ts`
- `uapi/tests/applicationDepositComposer.test.ts`
- `uapi/tests/applicationExternalRuntime.test.ts`
- `uapi/tests/applicationGiveNeedWorkbench.test.ts`
- `uapi/tests/applicationSectionAtlas.test.ts`
- `uapi/tests/applicationClosureState.test.ts`
- `uapi/tests/applicationLiveSummary.test.ts`
- `uapi/tests/applicationNeedScenarios.test.ts`
- `uapi/tests/applicationTransactionActivity.test.ts`
- `uapi/tests/applicationTransactionDetailSnapshot.test.ts`
- `uapi/tests/applicationTransactionDetail.test.ts`
- `uapi/tests/applicationShellBridge.test.tsx`
- `uapi/tests/applicationSupplySelection.test.ts`
- `uapi/tests/applicationTransactions.test.ts`
- `uapi/tests/protocol-demonstrationDetailRowList.test.tsx`
- `uapi/tests/protocol-demonstrationMetricGrid.test.tsx`
- `uapi/tests/deliverablesHistoryRoute.test.ts`
- `uapi/tests/deliverablesHistoryRunRoute.test.ts`
- `uapi/tests/usePipelineExecution.test.tsx`
- `uapi/tests/api/externalRealizationRoute.test.ts`
- `protocol-demonstration/src/client-entry.js`
- `protocol-demonstration/public/app.js`
- `protocol-demonstration/V26_APPLICATION_SYSTEMS.md`
- `protocol-demonstration/V26_PROOF_SURFACES.md`

The second-gate mandatory design outputs are:
1. section wireframes,
2. semantic non-regression ledger,
3. component adoption matrix,
4. external interfacing hardening matrix,
5. modular supplementary-doc rewrite map,
6. and second-gate acceptance matrix.

Second-gate acceptance is reached only when:
- `/application` is no longer primarily a carried monolithic shell implementation,
- `/application` is the primary Bitcode destination and carries the converged workspace,
- `/application` clearly reads as a transactions master-detail experience,
- `/application` uses `transactionId` as the primary application query carrier for master-detail selection while preserving inbound `runId` compatibility,
- transaction selection and rich master-table filters are route-owned and shareable through application query state,
- transaction selection, rich master-table filters, and transaction pagination are route-owned and shareable through application query state,
- transaction-detail focus is route-owned and shareable through application query state, with `transaction` as the preferred detail carrier and legacy `identity` accepted only for compatibility parsing,
- selected-transaction closure rerun and detail refresh are available directly from the application-owned detail surface through the shell bridge,
- selected-transaction closure, proofs, and history are explicit detail carriers inside `/application` instead of being buried under one closure pane or delegated back to shell-section follow-through,
- selected-transaction identity, closure, proofs, and history support a reusable visual-vs-raw payload inspection carrier instead of leaving JSON-bearing detail as incidental text,
- selected-transaction rows, metric grids, and branch-artifact chips converge on reusable execution-level base carriers instead of being re-authored per card,
- transaction master controls and payload inspection surfaces expose shared inline explainers plus stable accessible control names rather than relying on incidental browser `title` text or unlabeled form controls,
- application workspace framing converges on shared route-local shell/help carriers instead of per-panel hero and stats markup,
- application workspace framing now also includes the support rail and give-side supply terminal, so those surfaces no longer drift into bespoke section chrome outside the shared application shell/help system,
- live `/application` copy is fully user-referencing and does not narrate gates, route ownership, canon posture, or implementation mechanics to the user,
- live `/application` copy also avoids shell-plumbing, mounted-state, source-path, or compatibility-console narration except where a bounded lower-level runtime view is intentionally entered,
- stepwise workspace guidance reads as resumable give/need flow guidance and working-draft continuity rather than tutorial/demo residue,
- signed-in orbitals now expose real `Interfaces` and `$BTD` panes through shared orbital workspace section, stat, and preference carriers rather than model or credits wrappers,
- application-owned orbital preference persistence now lives at `/api/auxillaries/model-preferences` with authenticated read and lead/admin write posture,
- application command normalization now uses flow-guide continuity while preserved-shell tutorial fields survive only as compatibility input,
- conversations and orbitals clearly read as the other two main experiences rather than peer product destinations,
- the give and need actions are explicit in the master-detail workspace,
- the read experience clearly centers on the transactions master-detail window while the write experience moves through give, need, and orbitals/interfaces posture,
- transactions, deliverables, proofs, and history are explicit as the four master-detail substructures inside `/application`,
- the transactions master surface supports direct transaction-field filtering, participant ownership filtering, and explicit sort posture,
- the transactions master surface also supports route-owned pagination rather than component-local row-window state,
- route-local polling and shell-control refresh are centralized through `application-shell-bridge.tsx` rather than repeated independently across second-gate carriers,
- second-gate application health is explicit: shell-bridge snapshot/control reads fail closed during pre-mount or hot-reload rebuilds instead of crashing `/application`, and client-error telemetry is accepted through an app-owned route rather than 404ing,
- app-owned execution-history JSON routes exist under `uapi/app/api/executions/history*` so the transactions master, selected-transaction detail, and retained execution readers no longer fall through to missing-route HTML responses and can fail closed to anonymous-safe empty carriers during unauthenticated review,
- second-gate application health also includes keeping fullscreen orbitals renderable from `/application` rather than allowing missing overlay carriers to crash the app during orbital entry,
- second-gate workspace chrome now replaces disabled marketing-era unauthenticated nav CTA behavior on `/application` and canonical `/auxillaries` with deliberate access/create-account actions that keep the operator shell clean, while `/orbitals/*` survives only as redirect-only compatibility,
- shared workspace-route classification now governs navbar surface posture and footer suppression for `/application`, `/auxillaries`, and `/conversations`, so operator chrome cannot drift route-by-route,
- stepwise workspace guidance now reads as a Give + Need flow guide and working-flow continuity rather than tutorial/demo residue,
- contained orbital entry shells and focused orbital routes now read as orbitals access and contained orbital reads instead of generic workspace/settings/account furniture,
- shared orbital-entry copy now flows from one orbital metadata layer so application buttons, notifications, the signed-in user menu, and direct orbital routes stay aligned on `Open Orbitals fullscreen`, `Open Connects fullscreen`, and `Open transactions`,
- application-triggered orbital entry now holds a full-width contained operator shell instead of collapsing back to modal-width access furniture,
- preserved-runtime help/reference rendering is now user-facing, using live-surface and reference-topic labels instead of canon/version self-reference in the visible runtime tooltip/footer layer,
- preserved-runtime telemetry and diagnostics now use Bitcode-facing runtime labeling instead of `engi-demo`-era visible prefixes,
- preserved-runtime HTML fallback copy now matches the React-owned closure-runtime and flow-guide wording instead of leaking prototype/tutorial text,
- the mounted public shell has now started third-gate through one shared `bitcode-public-copy.ts` owner feeding the landing page, footer, `/docs`, and the compatibility `/demo-video` alias, so public entry copy inherits `Network`, `Transactions`, `Docs`, `Orbitals`, and give/need teaching posture from the application instead of preserving demo-era CTA language,
- the mounted public shell now also owns live public-route chrome through `PublicShellFrame`, `nav.tsx`, and `NavBrand.tsx`, so `/`, `/docs`, and `/demo-video` expose explicit Bitcode navigation and orbital-entry behavior instead of rendering as copy-only pages,
- the mounted public shell no longer relies on live `ComingSoon*` owners or `coming-soon-*` stylesheet imports, and the dead access-gate shell has been removed from the active landing owner instead of being carried forward as dormant demo logic,
- the mounted landing owner now delegates hero, guide, preview, and shared marketing-shell data into `app/(root)/components/landing/*` carriers instead of retaining a single oversized mixed-surface file,
- the mounted public shell now owns a real `/docs` route through `PublicDocsPageContent.tsx`, with `/demo-video` retained only as a compatibility alias into that docs-owned content,
- the stable docs walkthrough now resolves one Bitcode-owned guide asset instead of carrying ordered `engi-demo` media compatibility,
- the mounted public footer now resolves the guide route through Bitcode-owned route/env ownership instead of falling back to the removed legacy docs-walkthrough env fallback,
- the mounted public footer now links `Protocol spec` through the stable canonical pointer `BITCODE_SPEC.txt` instead of a version-specific public spec path,
- the mounted public nav now resolves small-screen complexity by stacking and wrapping the live Bitcode links and guest actions instead of hiding the primary entry paths behind another menu state,
- the mounted public terminal preview now defaults to a compact mobile/public summary and reserves the denser operator-grade preview for wider shells,
- the mounted landing ambience now suppresses orbital rings, pointer glow, and the large ambient blur on smaller or reduced-motion shells instead of forcing the full animated backdrop everywhere,
- the mounted public footer now presents route links as mobile-first cards and presents protocol/version metadata as explicit product chips instead of compressed inline footer microcopy on narrow shells,
- the mounted public shell now reuses shared inline explainers for `Network`, `Transactions`, `Docs`, and `Protocol spec`, removing the thin footer `title` tooltip and preserving richer help posture in the live public chrome,
- the mounted public routes now own explicit `Bitcode Network`, `Bitcode Docs`, and `Bitcode Transactions` metadata/title posture instead of inheriting the older global `$BTD` shell title,
- reusable application-owned mode-entry buttons now own conversation/orbital entry wording across the experience frame, workspace rail, and repository context support card,
- active `Interfaces` and `$BTD` panes now use live `interfaces`/`btd` naming and orbital-entry classing instead of exposing model/credits/settings residue in the active orbital surface,
- route-local architecture framing names the three experiences and two actions directly in the live application UI,
- route-local repository context makes provider connection posture and selected repository supply explicit inside the give-side application frame,
- route-local command state/control is bridged from the mounted Bitcode shell into `ApplicationCommandDeck.tsx` rather than being read and driven through raw DOM queries,
- route-local deposit submission is available through `ApplicationDepositComposer.tsx`, posting to the app-owned `/api/deposits` route while preserving selected-inventory and auth-session continuity from the mounted shell,
- route-local need selection is available through `ApplicationNeedScenarioPanel.tsx`, driving active Bitcode scenario posture through the mounted shell bridge,
- route-local give/need action detail reads the mounted Bitcode shell through a semantic snapshot bridge rather than generic shell markup and stays application-owned inside `/application`,
- route-local give, need, deposit, closure, and workspace-map surfaces reuse one shared application shell/help system plus shared metric, row, and chip carriers instead of reauthoring local section chrome,
- route-local supply selection makes authenticated intake session, artifact filtering, search, and inventory selection explicit inside `/application`,
- route-local external-runtime posture makes environment mode, actuality disposition, and per-interface blocking state explicit inside `/application`,
- conversations and orbitals are entered as fullscreen overlays without leaving application context,
- route-local command, posture, and summary surfaces drive and mirror preserved-shell state coherently,
- route-local body atlas cards mirror the preserved shell panels and jump into the live Bitcode sections coherently,
- route-local native operating, deposit, need, and fit cards now read the live shell surfaces through application-owned composition,
- route-local application and canonical auxillary review surfaces now also converge on `Transactions` / `Auxillaries` wording instead of `workspace` / `transaction terminal` drift, and the support-rail split delays until `2xl` so laptop-width reading stays centered on the main transactions column,
- selected-run detail normalizes into one application-owned carrier and deliverable-reading behavior is reachable in both live and mock posture within `/application`,
- the page is composed through application-native route-local sections and current component-system carriers,
- the route still preserves Bitcode semantics,
- second-gate repository documents stay synchronized to active source, with supplementary modular docs identified where the canon is not the correct carrier,
- the active second-gate README and markdown refurbishment set is required implementation/proof scope for the root, package, route, and shared-component owners,
- the active module namespace is `@bitcode/*` across package manifests, path aliases, and active source imports,
- new second-gate code systems are assigned proof/test/spec coverage rather than being treated as incidental glue,
- the external interfacings used by the page behave with stable readiness,
- and orbitals still read as the orbital owner rather than as displaced onboarding residue.

Persistence note:
- Supabase-hosted PostgreSQL ownership, `/edgetimes`, `/api/edgetimes`, migrations, ORM/query carriers, generated database types, and storage/API proof closure remain explicit fourth-gate work even while second-gate application UX/UI is being tightened.
- `/edgetimes` and `/api/edgetimes` now exist as the live fourth-gate storage/API witness for the through-fourth-gate promotion boundary so later convergence can build from active route/API ownership instead of only draft prose.

## Precise fourth-gate specification targets

Fourth-gate is now specified as:
- porting conversations and the chat-based application interface into Bitcode V26 semantics,
- keeping conversations as a fullscreen application mode rather than a peer product destination,
- converging non-orbital execution/API/data systems onto Bitcode runs and pipelines,
- redefining deliverable as a Bitcode V26 run/pipeline output meaning,
- porting current executions/deliverables master-detail and inspection patterns inward to `/application`,
- routing retained prompt text through prompt abstraction and the proved prompt space,
- reprompting old-world tools and agents for Bitcode canonical use with reader-first fourth-gate scope such as Jira need ingestion,
- keeping initial testnet-ready settle-write focused on Git/GH asset settlement while broader write surfaces stay later,
- and retaining packages only when V26 explicitly admits and proves their role.

Fourth-gate acceptance is reached only when:
- conversations remain first-class,
- conversations operate from application context as a fullscreen Bitcode mode,
- runs/pipelines form a coherent Bitcode V26 system,
- execution/deliverable workspace reuse is ported inward to `/application`,
- prompt abstraction directly owns retained prompt text,
- retained agent/tool abstractions have explicit V26 roles,
- old-world tool ports are scoped clearly enough that read/measure behavior closes now while broader settle-write expansion can wait,
- and retained packages are admitted intentionally with proof obligations.

## Precise fifth-gate specification targets

Fifth-gate is now specified as:
- minimum-functional Bitcode Exchange and Bitcode Terminal closure for the kept V26 system,
- complete active-source Bitcode rename closure, proof precision, and system completeness for that minimum-functional system,
- maximally finished old-world reform baseline for everything that still survives on the live Bitcode path,
- debug/environment controls required for proving mode coherence,
- full production/staging/development mode completeness,
- retained-package admissibility proof,
- and post-promotion proof-bearing cleanup of any still-kept system.

Fifth-gate acceptance is reached only when:
- the repository can make shares and use shares through Bitcode-owned interfaces and state,
- the required proof families are generated,
- their closure verdicts are explicit,
- debug/environment behavior is proven coherent,
- unreplaced active `engi` product naming is retired from active code/copy/route teaching,
- retained old-world systems are already cut, isolated, or Bitcode-repurposed enough that the live path reads as a new-world Bitcode product baseline,
- newly admitted application, API, MCP, prompt, and retained package systems are proven to the same Bitcode-grade standard expected of the former proved core,
- and the kept V26 system can be treated as Bitcode-complete without relying on informal interpretation across merged systems.

## Precise sixth-gate specification targets

Sixth-gate is now specified as:
- elevating the fifth-gate minimum-functional Bitcode baseline into a minimal viable product,
- deepening the Bitcode application into explicit `activity`, `transactions`, `conversations`, and `auxillaries` experiences with stable real operator posture,
- strengthening Exchange, Terminal, Protocol, Proofs, API, MCP, and admitted app surfaces until they behave as one coherent MVP,
- and removing the remaining gaps between truthful minimum functionality and an actually viable product.

Sixth-gate acceptance is reached only when:
- fifth-gate acceptance holds,
- `activity` is the dominant searchable transaction-master/detail application surface,
- `transactions` is the explicit write-space for Bitcode operations,
- `conversations` is aligned to the ChatGPT-style interface/tool surface rather than drifting into a second-class chat widget,
- `auxillaries` holds non-duplicative settings, connections, identity, and deep wallet/`$BTD` controls around the network core,
- the dominant product paths are stable enough for repeated real operator use on testnet,
- and repository architecture is simpler and more legible after MVP elevation.

## Precise seventh-gate specification targets

Seventh-gate is now specified as:
- refining the minimal viable Bitcode product into an initial commercially-viable live-launch posture on testnet,
- tightening operator quality, launch readiness, and product credibility across Exchange, Terminal, Protocol, Proofs, API, MCP, and admitted app surfaces,
- and proving that the live product story no longer depends on compatibility explanations for core journeys.

Seventh-gate acceptance is reached only when:
- fifth-gate acceptance holds,
- sixth-gate acceptance holds,
- the kept repository is ready for an initial commercial testnet launch,
- and Bitcode reads as a commercially-credible product while still remaining inside the V26 testnet boundary.

## Precise eighth-gate specification targets

Eighth-gate is now specified as:
- whole-repository Bitcode provation,
- final V26 closure across application GUI, conversations, ChatGPT-style surfaces, ChatGPT app, API, MCP, packages, schemas, proofs, and docs,
- and promotion-grade confirmation that no silent legacy ownership remains in active source.

Eighth-gate acceptance is reached only when:
- fifth-gate acceptance holds,
- sixth-gate acceptance holds,
- seventh-gate acceptance holds,
- total-repository proof families have explicit closure verdicts,
- and V26 can be treated as fully proven Bitcode canon rather than a promoted-through-fourth-gate checkpoint with later closure work still pending.

## Explicitly deferred

The current V26 draft does not require:
- a new denomination or tokenomics redesign,
- a canonical redefinition of the Bitcode operating chain itself,
- or direct `_legacy/` reuse as source truth.

## Pre-Implementation Sequence

The current V26 sequencing is now:

1. keep the now-landed first-gate route/package migration stable,
2. keep spec, parity, and generated tooling synchronized to the new file structure,
3. preserve anonymous and signed-in first-gate app/interface behavior while deeper V26 hardening proceeds,
4. execute second-gate application UX/UI plus external-interfacing hardening,
5. execute third-gate marketing refurbishment,
6. execute fourth-gate retained-system convergence,
7. execute fifth-gate minimum-functional Exchange/Terminal closure plus broad old-world reform baseline including debug/environment controls,
8. execute sixth-gate minimal viable product elevation,
9. execute seventh-gate initial commercially-viable testnet live-launch refinement,
10. execute eighth-gate total-repository provation and final closure,
11. refresh generated evidence and promotion checks,
12. and declare V26 fully proven only after eighth-gate closure is explicit end-to-end.

## Commit-Body Direction

The eventual V26 canonical commit body should describe:
- removal of the former top-level demo directory,
- adoption of `protocol-demonstration` as the first-gate preserved protocol owner,
- app-owned `/application` and `/api/*` carriage of the preserved Bitcode shell contract,
- removal of embedded-demo-first product posture,
- second-gate application-experience work still remaining,
- and repository organizational refurbishment toward the fuller package-first architecture.
