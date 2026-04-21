# Bitcode Spec V26

## Status

- Scope: V26 canonical system specification for Bitcode productionizing hardening, demonstration-to-application integration, application-facing UI replacement, interface hardening, and package-first repository refurbishment after V25 rename canon
- Current canonical/latest target: `V26`
- Canonical pointer: `/Users/garrettmaring/Developer/ENGI/BITCODE_SPEC.txt` -> `V26`
- Active canonical anchor: `/Users/garrettmaring/Developer/ENGI/BITCODE_SPEC_V26.md`
- Active generated proof appendix: `/Users/garrettmaring/Developer/ENGI/BITCODE_SPEC_V26_PROVEN.md`
- Canonical proof-source commit: `9d0733fed5f63d2f977900384d4103f9fd887f03`
- Prior canonical anchor: `/Users/garrettmaring/Developer/ENGI/_legacy/ENGI_SPEC_V25.md`
- Prior generated proof appendix: `/Users/garrettmaring/Developer/ENGI/_legacy/ENGI_SPEC_V25_PROVEN.md`
- Generated structured artifact inventory: active canonical `.bitcode/v19-*` reproducible reports, `.bitcode/v20-*` operator-quality reports, `.bitcode/v26-spec-family-report.json`, `.bitcode/v26-canonical-input-report.json`, `.bitcode/v26-gate-checkpoint-report.json`, `.bitcode/conversations-continuity-proof.json`, `.bitcode/runs-pipelines-totality-proof.json`, `.bitcode/persistence-schema-totality-proof.json`, `.bitcode/prompt-system-totality-proof.json`, `.bitcode/retained-package-admissibility-proof.json`, and `BITCODE_SPEC_V26_PROVEN.md`
- Canonical companion delta: `/Users/garrettmaring/Developer/ENGI/BITCODE_SPEC_V26_DELTA.md`
- Canonical companion parity ledger: `/Users/garrettmaring/Developer/ENGI/BITCODE_SPEC_V26_PARITY_MATRIX.md`
- Canonical companion notes file: `/Users/garrettmaring/Developer/ENGI/BITCODE_SPEC_V26_NOTES.md`
- Draft posture source: `/Users/garrettmaring/Developer/ENGI/protocol-demonstration/src/canon-posture.js` keeps `ACTIVE_CANON_VERSION = 'V26'` and `DRAFT_TARGET_VERSION = 'V27'`
- Source parity state: through-fourth-gate V26 promotion closure is now canonicalized in source across application routes, auxillary compatibility redirects, retained-system convergence, persistence witnesses, prompt-system ports, and generated proof artifacts; fifth-through-seventh-gate closure remains open
- V26 state: canonical promotion complete; V26 is the active Bitcode canon through fourth gate and remains the current testnet-ready, near-commercial-readiness canonical target while fifth-, sixth-, and seventh-gate closure remain open

## Acceptance and remaining-open state

V26 is not a rename-first version and it is not a light cleanup pass.
V26 is the productionizing hardening version that reorganizes Bitcode from a transitional demo/site split into a package-owned, application-native, live-operation-ready system.

With V26 promoted through fourth gate:
- V26 is active canonical truth,
- fifth-gate active-source Bitcode rename completion, proof precision, and system completeness remain intentionally open and must not be hand-waved as complete,
- sixth-gate old-world system reform into Bitcode market infrastructure remains intentionally open,
- seventh-gate whole-repository provation and final closure remain intentionally open,
- the current source-bearing implementation basis now includes the landed first-through-fourth-gate package/app migration surfaces cited below,
- and the V26 main spec remains full-system and re-implementation-grade even while later version work may reopen ownership after this promotion.
- the retained active repository systems outside first-gate Bitcode ownership must be elevated to Bitcode-grade auditability, proof-bearing precision, and knowability rather than pulling Bitcode down to older application looseness.

## Version executive summary

V25 completed the current-facing product rename and the NGI-to-BTD denomination shift while preserving the prior behavioral chain.

V26 opens because the renamed system still has an architectural split that is too large for a production-ready Bitcode:
- the old standalone demonstration had to be removed as a top-level owner,
- the preserved operator shell had to move into package/app ownership without losing its deterministic UX contract,
- the application route had to replace the embedded-demo posture,
- and several external and internal interfaces still remain short of the level expected of a live application.

V26 therefore centers seven coordinated gates:
1. first-gate ownership migration,
2. second-gate application UX/UI plus external interfacing hardening,
3. third-gate marketing refurbishment,
4. fourth-gate retained-system convergence and through-fourth-gate promotion,
5. fifth-gate active-source Bitcode rename completion, proof precision, and system completeness after promotion,
6. sixth-gate old-world system reform into Bitcode market infrastructure,
7. seventh-gate whole-repository provation and final V26 closure.

V26 is the most complex canonical promotion in the repository because it simultaneously:
- elevates the demo into a testnet-ready, near-commercial Bitcode product/application,
- absorbs real-world inputs, outputs, and interface obligations into the canonical source map,
- reorganizes active source around tighter package/app abstractions and proof-bearing modular topology,
- and completes the repository-wide Bitcode transformation without relaxing spec-to-source parity density.

V27 then becomes the commercial-readiness successor.
V26 is the testnet-ready, near-commercial-readiness canon; V27 must not be treated as a continuation of rename cleanup, but as the commercialization and market-readiness version built on a fully Bitcode-owned V26 base.

The intended result is not "micro-app the demo into `uapi/`."
The intended result is:
- remove the former top-level demo directory as a primary directory owner,
- land first-gate Bitcode ownership under `protocol-demonstration` plus app-owned route surfaces,
- preserve the useful Bitcode operator UX chain while replacing demonstration ownership first and deeper UI implementation second,
- remove the homepage embedded-demo posture in favor of a full-page application route,
- keep `/application` as the only primary Bitcode destination in the live app,
- keep orbitals and conversations as fullscreen application overlays rather than peer product destinations,
- port reusable executions/deliverables master-detail patterns inward to `/application` instead of preserving them as the lasting product topology,
- keep the established pre-Bitcode navbar and app-shell navigation frame as the application-facing Bitcode frame,
- maximize precise reuse of the retained active package/app code where those owners fit the new Bitcode totality,
- and harden auth, GitHub, bitcoin, sidechain, repeated-read, compute, storage, telemetry, and reconciliation to a live-application-ready level.

## V26 gate structure

V26 is now explicitly split into seven gates.

### First-gate

First-gate is the ownership migration gate.
It preserves the Bitcode shell experience while changing where that experience lives.
It also requires the preserved demonstration UX to read through the application as a production-initial Bitcode surface by using core app/component carriers rather than a standalone demo framing.

The current first-gate source file structure is:
- `protocol-demonstration/src/*`
- `protocol-demonstration/public/*`
- `protocol-demonstration/server.js`
- `protocol-demonstration/test/*`
- `uapi/app/application/page.tsx`
- `uapi/app/application/ApplicationPageClient.tsx`
- `uapi/app/application/first-gate-styles/route.ts`
- `uapi/app/api/state/route.ts`
- `uapi/app/api/deposits/route.ts`
- `uapi/app/api/make-bitcode-branch/route.ts`
- `uapi/app/api/reset/route.ts`
- `uapi/app/api/bitcoin-demonstration-service/route.ts`
- `uapi/app/api/auxillaries/data/route.ts`
- `uapi/app/api/v24/external-realization/route.ts`
- `uapi/app/api/v24/executors/[interfaceId]/route.ts`
- `uapi/lib/bitcode-app-context.ts`

First-gate closure means:
- no `engi-demo/` directory remains,
- `/application` is the app-owned Bitcode carrier,
- the preserved shell DOM, interaction order, and API/state contract run from package/app owners,
- the application-owned Bitcode carrier can be reviewed coherently in mock mode without requiring live external data,
- and the homepage no longer embeds or foregrounds a standalone demo surface.

### Second-gate

Second-gate is the application UX/UI and external-interfacing hardening gate.
It does not reopen the first-gate ownership migration.
It replaces the preserved shell implementation with deeper native application-facing composition while keeping Bitcode semantics intact.
It hardens the live application-facing external interfacings up to stable readiness within the new `/application` expression.
Its aesthetic atmosphere remains the retained pre-Bitcode design system, but the product itself is entirely Bitcode.
It also includes markdown and README refurbishment for the active route, orbital, execution, shared-component, package, and preserved protocol owners so the growing V26 system stays legible and provable.

The current active second-gate source additions are now explicitly:
- `uapi/app/application/ApplicationCommandDeck.tsx`
- `uapi/app/application/ApplicationActionWorkbenchCard.tsx`
- `uapi/app/application/ApplicationClosureControlDeck.tsx`
- `uapi/app/application/ApplicationExperienceFrame.tsx`
- `uapi/app/application/ApplicationExternalInterfacingPanel.tsx`
- `uapi/app/application/ApplicationDepositComposer.tsx`
- `uapi/app/application/ApplicationGiveNeedWorkbench.tsx`
- `uapi/app/application/ApplicationLiveSummaryStrip.tsx`
- `uapi/app/application/ApplicationNeedScenarioPanel.tsx`
- `uapi/app/application/ApplicationRepositoryContextPanel.tsx`
- `uapi/app/application/ApplicationSectionAtlas.tsx`
- `uapi/app/application/ApplicationCoreNativeSections.tsx`
- `uapi/app/application/ApplicationClosureNativeSections.tsx`
- `uapi/app/application/ApplicationTransactionActivitySurface.tsx`
- `uapi/app/application/ApplicationTransactionDetailActionBar.tsx`
- `uapi/app/application/ApplicationTransactionDetailSurface.tsx`
- `uapi/app/application/ApplicationTransactionDetailHero.tsx`
- `uapi/app/application/ApplicationTransactionIdentityCard.tsx`
- `uapi/app/application/ApplicationTransactionClosureCard.tsx`
- `uapi/app/application/ApplicationTransactionsTable.tsx`
- `uapi/app/application/ApplicationSupplySelectionPanel.tsx`
- `uapi/app/application/application-core-surface.ts`
- `uapi/app/application/application-shell-bridge.tsx`
- `uapi/app/application/application-closure-controls.ts`
- `uapi/app/application/application-closure-state.ts`
- `uapi/app/application/application-deposit-composer.ts`
- `uapi/app/application/application-external-runtime.ts`
- `uapi/app/application/application-command-state.ts`
- `uapi/app/application/application-section-atlas.ts`
- `uapi/app/application/application-live-summary.ts`
- `uapi/app/application/application-experience-architecture.ts`
- `uapi/app/application/application-give-need-workbench.ts`
- `uapi/app/application/application-need-scenarios.ts`
- `uapi/app/application/application-run-activity.ts`
- `uapi/app/application/application-transaction-source.ts`
- `uapi/app/application/application-transaction-detail-snapshot.ts`
- `uapi/app/application/application-transaction-detail.ts`
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
- `uapi/components/base/bitcode/execution/bitcode-transaction-data-mode.ts`
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
- `uapi/tests/applicationClosureState.test.ts`
- `uapi/tests/applicationSectionAtlas.test.ts`
- `uapi/tests/applicationLiveSummary.test.ts`
- `uapi/tests/applicationNeedScenarios.test.ts`
- `uapi/tests/applicationTransactionActivity.test.ts`
- `uapi/tests/applicationTransactionDetailSnapshot.test.ts`
- `uapi/tests/applicationTransactionDetail.test.ts`
- `uapi/tests/applicationTransactionQuery.test.ts`
- `uapi/tests/applicationShellBridge.test.tsx`
- `uapi/tests/applicationSupplySelection.test.ts`
- `uapi/tests/applicationTransactions.test.ts`
- `uapi/tests/protocol-demonstrationInlineExplainer.test.tsx`
- `uapi/tests/protocol-demonstrationDetailRowList.test.tsx`
- `uapi/tests/protocol-demonstrationMetricGrid.test.tsx`
- `uapi/tests/protocol-demonstrationTransactionsFilterBar.test.tsx`
- `uapi/tests/protocol-demonstrationTransactionsPagination.test.tsx`
- `uapi/tests/protocol-demonstrationPayloadInspector.test.tsx`
- `uapi/tests/deliverablesHistoryRoute.test.ts`
- `uapi/tests/deliverablesHistoryRunRoute.test.ts`
- `uapi/tests/usePipelineExecution.test.tsx`
- `uapi/tests/api/externalRealizationRoute.test.ts`
- `protocol-demonstration/src/client-entry.js`
- `protocol-demonstration/public/app.js`
- `protocol-demonstration/public/index.html`
- `protocol-demonstration/public/styles.css`
- `uapi/styles/orbital.css`
- `uapi/styles/orbital-rings.css`
- `README.md`
- `uapi/README.md`
- `protocol-demonstration/README.md`
- `uapi/app/application/README.md`
- `uapi/app/orbitals/README.md`
- `uapi/components/base/bitcode/README.md`
- `uapi/components/base/bitcode/execution/README.md`
- `protocol-demonstration/V26_APPLICATION_SYSTEMS.md`
- `protocol-demonstration/V26_PROOF_SURFACES.md`

### Third-gate

Third-gate is the marketing refurbishment gate.
It is separate from second-gate so the application surface and the marketing surface can be specified and accepted independently.
It refurbishes the public marketing page only after the application route and its hardening work are stable.
Its content spine is now a production-facing contract rather than a loose slogan set:
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

Third-gate must now also:
- inherit stabilized application language from second-gate rather than preserving demo narration,
- keep all public product language user-facing rather than gate-facing, canon-facing, or source-path-facing,
- align the landing, navigation, tooltip/help posture, and application shell mood into one thematic Bitcode system,
- preserve the strongest prior guidance UX, including rich tooltip content and resumable guide/draft posture,
- and prepare the public site to read as the outer frame of the production Bitcode application rather than as a detached marketing skin.

The current mounted third-gate start carriers are now explicitly:
- `uapi/app/(root)/components/PublicShellFrame.tsx`
- `uapi/app/(root)/components/MarketingLandingPage.tsx`
- `uapi/app/(root)/components/landing/MarketingLandingHero.tsx`
- `uapi/app/(root)/components/landing/MarketingLandingPillarCard.tsx`
- `uapi/app/(root)/components/landing/MarketingLandingGuideCard.tsx`
- `uapi/app/(root)/components/landing/MarketingLandingTerminalPreview.tsx`
- `uapi/app/(root)/components/landing/marketing-landing-shared.tsx`
- `uapi/app/(root)/components/PublicDocsPageContent.tsx`
- `uapi/app/(root)/components/MarketingOperatorGuideCard.tsx`
- `uapi/app/docs/page.tsx`
- `uapi/app/demo-video/page.tsx`
- `uapi/components/base/bitcode/layout/nav.tsx`
- `uapi/components/base/bitcode/layout/NavBrand.tsx`
- `uapi/components/base/bitcode/layout/footer.tsx`
- `uapi/components/base/bitcode/layout/bitcode-public-copy.ts`
- `uapi/components/base/bitcode/layout/bitcode-public-explainers.ts`

Those owners now carry the public-shell route and teaching vocabulary for:
- `Network`
- `Transactions`
- `Docs`
- `Auxillaries`
- with `give` / `need` still explained as the two main Bitcode actions inside `Transactions` and `Docs`

They also now carry the mounted public-shell chrome contract:
- explicit public-route navigation,
- stable public-route access CTAs,
- a real mounted `/docs` hub,
- a compatibility `/demo-video` alias that resolves back into docs-owned content,
- and live orbital-entry behavior on `/`, `/docs`, and `/demo-video` rather than page-local copy alone.

Mounted third-gate hardening must also retire stale public-shell residue from the live route owners:
- no live `coming-soon` component, class, or stylesheet naming in the mounted public shell,
- no unused access-gate or incantation code preserved inside the live landing owner,
- no oversized monolithic landing owner that keeps hero, guide, preview, and shared marketing-shell data fused into one file once those sections have stabilized enough to be assigned clearer Bitcode carriers,
- no ordered demo-era operator-guide media compatibility preserved in the stable walkthrough/docs route,
- no developer-path fallback copy when guide media is absent,
- and no public-shell information architecture that keeps docs trapped behind a one-off guide URL once the docs route exists.

Mounted third-gate public chrome should also prefer progressive simplification over extra menu state:
- responsive public-route nav should stack and wrap cleanly on smaller screens rather than introducing hamburger-only access for the primary Bitcode entry links,
- dense operator-preview content on the mounted landing should collapse into a compact public/mobile summary before wider-shell detail is shown,
- heavy ambient motion and backdrop effects on the mounted landing should suppress on smaller or reduced-motion shells before wider-screen theatrical treatment is shown,
- public-footer route links should collapse into clear mobile-first cards instead of cramped inline microcopy when the shell narrows,
- public protocol/version metadata should read as deliberate product chips rather than a trailing legal-text fragment on smaller shells,
- and public-route access CTAs should remain immediately visible without requiring additional taps to discover `Transactions`, `Docs`, or `Open Auxillaries`.

Third-gate acceptance is reached only when:
- public product copy no longer describes the system through demo, canon, gate, or implementation self-reference,
- the main public entry points inherit the same Give/Need, Transactions, conversations, and Auxillaries vocabulary used by the application,
- the mounted public shell clearly reads as `Network`, `Transactions`, `Docs`, and `Auxillaries` rather than drifting across overlapping `workspace`, `guide`, or terminal-only naming,
- selected `/application` and canonical `/auxillaries` review surfaces shown during third-gate hardening also keep that same `Transactions` / `Auxillaries` naming discipline instead of leaking `workspace` or `transaction terminal` residue,
- navigation, menus, notifications, and sticky behavior remain non-regressive while the public shell is cleaned up,
- tooltip/help content is preserved or improved rather than flattened during visual cleanup, including replacing thin browser `title` affordances with richer public-shell explainers where those entry points matter,
- the real `/docs` route resolves one Bitcode-owned walkthrough asset or fails closed into its user-facing fallback without carrying demo-era compatibility candidates,
- `/demo-video` remains only a compatibility alias into that docs-owned content,
- mounted public and selected application routes keep explicit `Bitcode Network`, `Bitcode Docs`, and `Bitcode Transactions` title posture instead of inheriting one global shell title,
- the public protocol reference resolves through the stable canonical pointer rather than a version-specific public spec URL,
- and third-gate can be proven without reopening second-gate application ownership work.

### Fourth-gate

Fourth-gate is the retained-system convergence gate.
It ports the retained non-Bitcode-first-gate application systems into the V26 Bitcode total system instead of leaving them as adjacent Bitcode-era reservoirs.
It is also the intended canonical V26 promotion boundary: once first through fourth gates hold, V26 may promote as the active Bitcode canon even while later proving/finalization work remains open.
It includes:
- conversations and the chat-based / ChatGPT-like application interface,
- executions, runs, pipelines, and the new Bitcode meaning of deliverables,
- PostgreSQL persistence and Supabase-hosted storage/API convergence, including the `/edgetimes` application/API posture,
- initial migration closure, active schema ownership, ORM/query-layer ownership, generated types, and their test/documentation/comment carriers,
- with the current retained persistence basis explicitly anchored in `supabase/migrations/001_ga1_production.sql`, `packages/supabase/src/*`, `packages/orm/src/models/*`, `packages/orm/src/queries/*`, `packages/orm/src/types/database.generated.ts`, `packages/orm/src/types/database.ts`, and `packages/orm/scripts/generate-db-types.ts`, while `/edgetimes` and `/api/edgetimes` now act as the live fourth-gate storage/API witness for the promotion boundary,
- prompt abstraction and the proved prompt space,
- retained agent and tool abstraction layers where those remain useful,
- and retained package admissibility for the packages V26 keeps.

### Fifth-gate

Fifth-gate is the post-promotion proof precision, schema refinement, and full provation gate.
V26 may promote through fourth-gate, but it is not fully proven until fifth-gate closure is explicit across the gates and retained packages it keeps.
It includes:
- proof closure for the retained and repurposed whole repository that survives into V26 production canon rather than only the old demo-equivalent core,
- proof closure for migrations, schema contracts, ORM/query carriers, generated types, storage/API contracts, and retained package boundaries,
- the debug setting and floating debug widget,
- at minimum an environment toggle that switches environment posture and refreshes the application coherently,
- full production/staging/development mode completeness in the new application expression,
- explicit proof-family closure for second-gate and fourth-gate retained systems,
- second-gate and fourth-gate rename-completion follow-through where compatibility carriers are no longer justified,
- and final repo/spec/documentation cleanup needed for V26 promotion.

## V26 second-gate application design contract

Second-gate must be specified before it is implemented.
The design contract below is the minimum collaboration surface required before code moves beyond first-gate preservation.

### Required second-gate design artifacts

Before second-gate implementation is accepted, the draft must carry:
1. a section-by-section application wireframe pack for `/application`,
2. a semantic non-regression ledger for the carried first-gate Bitcode flow,
3. a component adoption matrix that maps each carried section onto route-local app composition and current `uapi/components/base/*` carriers,
4. an external interfacing hardening matrix covering the application-facing GitHub/auth/bitcoin/sidechain/repeated-read/compute/storage surfaces,
5. a modular supplementary-doc rewrite map for non-canonical repository documents that must evolve alongside the converged Bitcode architecture,
6. and a second-gate acceptance matrix that separates UI acceptance from third-gate marketing work and fourth-gate cleanup work.

### Second-gate route and ownership frame

Second-gate keeps `/application` as the Bitcode route carrier.
It does not move the product to a different route and it does not reopen first-gate preserved protocol ownership.

Second-gate changes:
- the route-local rendering owner,
- the component composition strategy,
- the application-facing behavior of the route,
- and the stability of the route’s external interfacings.

Second-gate does not change:
- the core Bitcode operating semantics,
- the orbitals ownership rule,
- the first-gate route/API owner locations,
- or the fact that Bitcode remains the product identity while the aesthetic atmosphere stays aligned to the retained pre-Bitcode design system.

### Second-gate primary route, navbar, and overlay rule

Second-gate locks the live Bitcode application posture as:
- `/application` is the only primary Bitcode destination,
- the retained pre-Bitcode navbar and app-shell navigation frame remain the integrated navigation carrier for Bitcode,
- shared workspace-route classification owns navbar surface posture and footer suppression for `/application`, `/auxillaries`, and `/conversations`, with `/orbitals/*` reduced to redirect-only compatibility,
- unauthenticated workspace chrome uses deliberate access/create-account actions rather than disabled marketing-era CTA behavior,
- signed-in orbital reopen actions use one shared orbitals-first entry contract rather than older account-named overlay aliases,
- orbitals remain the fullscreen orbital overlay owner entered from within `/application`,
- conversations remain a fullscreen conversational workspace entered from within `/application`,
- `/auxillaries/*` remains the canonical direct-route family for focused auxillary reads while `/orbitals/*` survives only as redirect-only compatibility,
- and current executions/deliverables surfaces are treated as reusable master-detail reservoirs to port inward rather than as the final product topology.

Parallel routes may remain during convergence for compatibility and migration, but V26 does not treat them as the finished product posture once second-gate and fourth-gate are closed.

### Second-gate three-experience and two-action rule

The V26 application architecture is centered on exactly three main experiences:
1. `master detail`
2. `conversations`
3. `auxillaries`

For V26, those mean:
- `master detail`
  The primary Bitcode application workspace inside `/application`, carrying the give/need operating chain, a rich Bitcode activity ledger (`transactions` master surface), selected activity detail, asset-pack outputs (`deliverables`), proofs, history, and consequence reading.
- `conversations`
  The fullscreen conversational workspace entered from within `/application`, retaining chat-based and ChatGPT-like interaction, tool usage, and run/pipeline attachment as first-class Bitcode behavior.
- `auxillaries`
  The fullscreen auxillary workspace entered from within `/application`, retaining the ringed overlay experience while owning Connects, Interfaces, Profile, and `$BTD`.

V26 does not treat executions, deliverables, proofs, history, auxillaries, or chat as separate peer product destinations once the converged architecture is closed.
Those surfaces must resolve into one of the three experiences above.

V26 also fixes Bitcode as one productized standard across protocol, product, and proofs:
- `what`
  A protocol, product, and proof system for measured shares of technical intelligence.
- `how`
  `Bitcode Mainnet`: a live Bitcode operating posture with exact `$BTD` settlement/accounting, replayable tests, immutable witness artifacts, and auditable specification-bearing closure.
- `where`
  The `Bitcode Terminal` at `/application`, plus APIs, MCPs, and third-party app surfaces such as the ChatGPT App.
- `who`
  Givers or IP holders supplying technical intelligence, and needers or token factories consuming measured technical intelligence for product or enterprise acceleration.
- `why`
  To convert otherwise idle or undervalued technical intelligence into auditable income for givers while steepening performance curves for needers through measured fit, selection, materialization, and settlement.

Stepwise guidance inside the second-gate application is specified as a user-facing Give + Need flow guide and resumable working-flow continuity, not as tutorial/demo residue.
Visible mode-entry controls inside the live operator shell must also use user-facing deeper-mode wording rather than narrating fullscreen mechanics to the operator.

The V26 application is also centered on exactly two main actions:
1. `give`
2. `need`

For V26, those mean:
- `give`
  Repo supply, candidate deposits, artifact inventory, and the actions that place authenticated material into the Bitcode operating chain.
- `need`
  Scenario framing, measured demand, fit pressure, selection pressure, and the actions that make explicit what the system is trying to satisfy before settlement and proof closure.

The command frame, section decomposition, and master-detail workspace must make `give` and `need` legible as the two main Bitcode actions.
The read experience is the Bitcode activity ledger window inside `/application`, with `transactions` retained as the route/query-owned master-detail substructure id.
The write experience moves through `give`, `need`, and auxillaries/interfaces posture via conversations and auxillaries entered from application context.
Conversations are the canonical rich-input write carrier for V26. They must accept source attachments, asset-pack references, need-measurement intent, and output-destination or execution-target references as structured tokens or PromptPart-compatible parts rather than relying on plain-text-only prompting.
Message-level attachments and execution references remain the retained primitive abstractions for these writes; operator-facing copy should read them as Connects-bound inputs, asset-pack synthesis requests, and settlement or output destinations.
The non-mock App Router write carriers `/api/conversations/stream` and `/api/conversations/[conversationId]/stream` must therefore resolve or create a conversation, persist the user message, bind message-level attachments from the structured token set, start canonical agentic-execution rows when need-measurement or asset-pack intent is present, and persist the assistant reply against the same retained message plus `pipeline_run` primitives.
Verification, branch artifacts, settlement, proofs, deliverables, and history remain required, but they are consequence and closure stages of the give/need chain rather than additional top-level actions.
Within that master-detail experience, V26 now treats `transactions`, `deliverables`, `proofs`, and `history` as the four required substructures rather than as optional auxiliary panels; operator-facing copy should read these as the Bitcode activity ledger, asset-pack outputs, proofs, and history.
The transactions master itself must stay query-owned, searchable, filterable, and paginatable rather than falling back to component-local table state.
Selected-transaction proof, history, and identity detail must also support a reusable visual-vs-raw payload reading posture rather than leaving JSON-bearing detail stranded in ad hoc prose cards.
The auxillary ring model is also fixed for V26:
- `Connects` is the outer orbital and the closest retained canonical pane,
- `Interfaces` owns application visual/default-behavioral posture for master-detail, conversations, and related reads,
- `Profile` owns wallet identity, address/balance posture, organization roles, multi-sig membership, and authentication state,
- `$BTD` is the inner orbital for share information, wallet-adjacent throughput posture, advanced `$BTD` controls, and `$BTD`-specific master-detail defaults.

`Connects` also owns source-bearing inputability and interfacability for V26: GitHub attachment, repository scope, and future third-party bindings that Bitcode reuses for need measurement, asset-pack synthesis, settlement follow-through, and external application behavior.
SSO providers remain admissible auth-entry posture, but Bitcode must not transact or settle until at minimum wallet identity is bound in `Profile` and GitHub or equivalent repository scope is attached in `Connects`.

Signed-in orbital preference persistence is also application-owned for V26 through `/api/auxillaries/model-preferences`, and the active `Interfaces` and `$BTD` panes are no longer treated as transitional model or credits wrappers.
Contained orbital reads inside `/application` and direct orbital routes should now read through shared panel/tabs carriers rather than floating sequence cards plus older absolute-position ring-label furniture.
Profile-owned repository knowledge sharing should also fail closed through an app-owned orbital route carrier rather than falling through to missing-route HTML inside the contained workspace.

### Second-gate target file-structure direction

The second-gate target structure is:
- `uapi/app/application/*`
  The only primary Bitcode destination and the master-detail carrier for give/need operations, a rich activity ledger (`transactions` table), selected activity detail, asset-pack outputs (`deliverables`), proofs, and history.
- `uapi/components/base/bitcode/layout/nav.tsx`
  The retained pre-Bitcode navigation frame that continues to anchor the application.
- `uapi/app/auxillaries/components/*`
  The auxillary overlay system mounted from within the application context.
- `uapi/app/conversations/components/*`
  The fullscreen conversation system mounted from within the application context.
- `uapi/app/executions/components/*`
  Master-detail, run-inspection, log, and deliverable-reading patterns to be ported into `/application`.
- `packages/api/src/routes/{deliverables,conversations,executions}.ts`, `packages/api/src/conversations/*`, `packages/api/src/pipelines/*`
  Current route-orchestration carriers that continue to feed the converged application surfaces, with thin `uapi/app/api/*` filesystem route bindings importing formal handlers from `packages/api` while deeper subsystem behavior stays in narrower package owners.
- `packages/prompts/src/*`, `packages/execution-generics/*`, `packages/conversations-generics/*`, `packages/pipelines/*`
  Retained package carriers that must be woven into the converged V26 Bitcode system with explicit roles and proof obligations.

### Second-gate application composition map

| Second-gate surface | Current semantic source | Second-gate target owner | Required semantic invariants | Required UI direction |
| --- | --- | --- | --- | --- |
| master-detail application workspace | `uapi/app/application/*`, `uapi/app/executions/*`, `packages/api/src/routes/deliverables.ts` | `/application` as the single primary Bitcode workspace, with architecture framing in `ApplicationExperienceFrame.tsx`, a rich transaction-master carrier in `ApplicationTransactionsTable.tsx`, inward substructure composition in `ApplicationTransactionWorkspace.tsx`, and route-local composition in `ApplicationPageClient.tsx` | transactions, deliverables, proofs, history, operating detail, route-owned pagination, and payload inspection remain accessible without leaving application context | read as the central Bitcode operator experience rather than a peer-route handoff |
| give action frame | `renderRepoInventory()`, `renderAssets()`, deposit form semantics, repo-auth session surfaces | route-local application sections and controls within the master-detail workspace, centered on `ApplicationCommandDeck.tsx`, `ApplicationSupplySelectionPanel.tsx`, `ApplicationExperienceFrame.tsx`, and `ApplicationCoreNativeSections.tsx` | authenticated repo supply, depositing, inventory browsing, and material submission remain explicit | the operator should clearly understand how to give material to Bitcode |
| give-side repository context | application-owned repository connection posture, provider choice, and selected repo supply before the deposit chain | `ApplicationRepositoryContextPanel.tsx`, `application-repository-context.ts`, `uapi/app/api/vcs/[provider]/*`, and `VCSRepositorySelector.tsx` | repository connection posture, provider choice, and selected repository supply remain explicit without hiding behind the preserved shell | the operator should clearly understand which connected repository currently anchors Bitcode give-side supply |
| native deposit submission | preserved-shell deposit contract and app-owned `/api/deposits` carrier | `ApplicationDepositComposer.tsx`, `application-deposit-composer.ts`, and `uapi/app/api/deposits/route.ts` | title/author inference, selected inventory continuity, raw fallback behavior, and deposit posting remain semantically aligned to Bitcode intake | the operator should be able to submit a Bitcode deposit from the application workspace without dropping back into the preserved shell form |
| shared shell bridge provider | per-component polling and shell-control refresh logic previously lived separately across second-gate carriers | `application-shell-bridge.tsx`, `protocol-demonstration/public/app.js`, and `protocol-demonstration/src/client-entry.js` | mounted-shell semantic state and control refresh remain centralized, exact, reusable across route-local application carriers, and fail closed during pre-mount or hot-reload rebuilds instead of crashing `/application` | the operator should experience one coherent Bitcode application state carrier rather than drifting per-panel refresh loops |
| command-state and control bridge | preserved-shell command posture and mutable operator actions exposed for native application composition without DOM scraping | `application-shell-bridge.tsx`, `protocol-demonstration/public/app.js`, `protocol-demonstration/src/client-entry.js`, `ApplicationCommandDeck.tsx`, and `application-command-state.ts` | scenario, projection, branch mode, flow-guide continuity, make-branch, and reset remain application-visible and semantically aligned to the preserved shell while preserved-shell tutorial fields survive only as compatibility input | the operator should experience a route-owned command surface rather than a DOM-proxy shell control strip |
| application section atlas bridge | route-local atlas previews previously depended on rendered shell panel text and card counting | `protocol-demonstration/public/app.js`, `protocol-demonstration/src/client-entry.js`, `ApplicationSectionAtlas.tsx`, and `application-section-atlas.ts` | atlas previews remain aligned to the real Bitcode body without reintroducing panel-markup scraping | the operator should experience a semantic application atlas rather than a DOM-era section mirror |
| core-state semantic snapshot bridge | preserved-shell operating, depositing, needing, and fit panels previously depended on rendered shell DOM for application-owned composition | `protocol-demonstration/public/app.js`, `protocol-demonstration/src/client-entry.js`, `ApplicationCoreNativeSections.tsx`, and `application-core-surface.ts` | route-local give/need and master-detail core sections read exact Bitcode surface truth without relying on rendered panel markup | the operator should experience native Bitcode core cards that stay semantically exact without DOM-era drift |
| give/need semantic snapshot bridge | preserved-shell semantic state and active operator selections exposed for native application composition without re-deriving Bitcode truth from generic markup | `protocol-demonstration/public/app.js`, `protocol-demonstration/src/client-entry.js`, `ApplicationGiveNeedWorkbench.tsx`, `ApplicationSupplySelectionPanel.tsx`, `application-give-need-workbench.ts`, and `application-supply-selection.ts` | route-local V26 sections read exact Bitcode shell truth without mutating first-gate ownership or inventing alternate semantics | the operator should experience deeper native composition without semantic drift between preserved shell and application-owned sections |
| external interfacing posture | `renderOperatingPicture()`, `state.boundaryRealitySurface`, `latestRun.externalRealizationSummary`, and `uapi/app/api/v24/external-realization/route.ts` | `ApplicationExternalInterfacingPanel.tsx`, `application-external-runtime.ts`, and the app-owned V24 route surface | environment mode, actuality disposition, boundary-only posture, live misconfiguration, and per-interface runtime state remain explicit and fail closed | the operator should clearly understand what is mocked, what is boundary-only, what is live-configured, and what is currently blocking |
| need action frame | `renderScenario()`, `renderFit()`, measured-demand and fit surfaces | route-local application sections and controls within the master-detail workspace, centered on `ApplicationCommandDeck.tsx`, `ApplicationNeedScenarioPanel.tsx`, `ApplicationExperienceFrame.tsx`, and `ApplicationCoreNativeSections.tsx` | scenario framing, measured need, and fit pressure remain explicit before closure stages | the operator should clearly understand how to express and inspect need |
| give/need action detail | current shell-selected repo supply, measured demand, and fit intent carried into route-local application-owned action blocks | `ApplicationGiveNeedWorkbench.tsx`, `ApplicationActionWorkbenchCard.tsx`, and `application-give-need-workbench.ts` | repository supply posture, measured need, and fit/closure intent remain explicit as the two main Bitcode actions | the operator should read give and need as dense application-grade action detail rather than preserved-shell-only panels |
| global navbar and app frame | `uapi/components/base/bitcode/layout/nav.tsx`, current app shell carriers | integrated app-shell frame around `/application` | the established pre-Bitcode navigation frame remains intact while Bitcode stays the product identity | keep the familiar application frame and density, but make its labels and destinations fully Bitcode-first |
| shell frame, command rail, summary, hero posture | `uapi/app/application/ApplicationPageClient.tsx`, `uapi/app/application/ApplicationCommandDeck.tsx`, `uapi/app/application/ApplicationLiveSummaryStrip.tsx`, `uapi/app/application/application-command-state.ts`, `uapi/app/application/application-live-summary.ts`, `protocol-demonstration/public/app.js` | route-local `uapi/app/application/*` composition using current app shell carriers and the shell command/control bridge | scenario/projection/branch controls, run status, summary posture, reset, and canon posture remain explicit and synchronized to the preserved shell | read as a first-class Bitcode application page instead of a carried static shell |
| flow-guide and explainer system | `protocol-demonstration/public/app.js` guide/explainer contract plus `application-flow-guide.ts` and `ApplicationFlowGuideCard.tsx` | route-local flow-guide/explainer composition plus current overlay primitives where appropriate | stepwise operator guidance, resumable working-flow continuity, and targeted explainers remain available while preserved-shell tutorial fields survive only as compatibility input | use current overlay and panel language without losing the guide’s operator-facing role |
| conversations fullscreen workspace | `uapi/app/conversations/components/*`, `packages/api/src/routes/conversations.ts`, `packages/api/src/conversations/*` | application-mounted fullscreen overlay launched from `/application` | chat-based interaction, tool usage, route-orchestration continuity, and conversational continuity remain first-class without leaving application context | read as a fullscreen Bitcode conversation workspace over the application rather than as a separate product destination |
| operating picture | `renderOperatingPicture()` and related first-gate visual surfaces | route-local section atlas plus `ApplicationCoreNativeSections.tsx`, then later deeper app-native section composition | repo-supply to settlement reading remains the opening systems view | denser application-grade cards and system summaries, not a demo-only tableau |
| depositing and repo supply | `renderRepoInventory()`, `renderAssets()`, deposit form semantics | route-local section atlas plus `ApplicationCoreNativeSections.tsx`, `ApplicationSupplySelectionPanel.tsx`, `ApplicationDepositComposer.tsx`, and then route-local section plus current VCS/integration/input carriers | authenticated repo session, inventory filtering, deposit overrides, and raw fallback remain intact | application-grade form layout and inventory browsing using current input, card, and integration patterns |
| needing and measured demand | `renderScenario()`, need/measurement surfaces | route-local section atlas plus `ApplicationCoreNativeSections.tsx`, `ApplicationNeedScenarioPanel.tsx`, and then route-local section with app-native panels | active scenario, benchmark/need framing, and measured-demand reading remain explicit | clearer scenario framing and demand readability while preserving semantic output |
| depositing-to-needing fit | `renderFit()` and fit/asset-pack surfaces | route-local section atlas plus `ApplicationCoreNativeSections.tsx`, then route-local section with app-native comparison and explanation composition | fit must remain legible before proof/settlement | stronger decisive-vs-normalization readability using native comparison panels |
| ranked candidates and verification determinisms | `renderEvaluations()` and verification report surfaces | route-local section atlas plus `ApplicationClosureNativeSections.tsx` and `application-closure-state.ts`, then deeper route-local section composition using current execution/log/panel carriers where useful | ranking, use tiers, verification determinisms, and report reading remain intact | application-grade ranking and verification panels rather than preserved shell blocks |
| branch artifacts and materialization | `renderBranchArtifacts()` and artifact bundle surfaces | route-local section atlas plus `ApplicationClosureNativeSections.tsx` and `application-closure-state.ts`, then route-local section with package-fed artifact data and app-native detail panels | branch mode, projection visibility, artifact bundle reading, and materialization proof remain intact | clearer private-remediation workspace reading with richer panels and evidence grouping |
| settlement, proofs, and journal/accounting closure | `renderSettlement()` and settlement/proof visuals | route-local section atlas plus `ApplicationClosureNativeSections.tsx` and `application-closure-state.ts`, then route-local section with app-native proof/accounting composition | exact accounting, source-to-shares, proof family, and journal diff semantics remain intact | structured settlement/proof reading suitable for a production-initial application page |
| closure operation control | preserved-shell make-branch/reset/refresh posture previously lived only in shared command controls and underlying shell actions | `ApplicationClosureControlDeck.tsx`, `application-closure-controls.ts`, and the shell command/control bridge | branch execution, closure refresh, reset, and follow-through focus remain semantically aligned to Bitcode closure | the operator should experience a native closure operation deck rather than treating closure as an opaque lower-body shell action |
| ledger, run history, and policy surfaces | `renderLedger()` and policy/ledger/history visuals | route-local section atlas plus `ApplicationClosureNativeSections.tsx` and `application-closure-state.ts`, then route-local section plus application-owned execution/history linkages and reused execution carriers | ledger accounts, run history, and bounded proof metadata remain explicit | read as a live application workspace/history surface instead of a shell appendix |
| run detail and deliverable master-detail surfaces | `uapi/app/executions/*`, `packages/api/src/routes/{deliverables,executions}.ts`, execution/log/deliverable panels | inward-ported master-detail sections, drawers, and detail surfaces within `/application` | run inspection, logs, work updates, execution-history route-orchestration, and deliverable/proof reading remain available without semantic loss | reuse the strongest execution/deliverable interaction patterns inside `/application` rather than preserving peer destinations |
| orbitals relationship | `uapi/app/auxillaries/*`, redirect-only `uapi/app/orbitals/*`, `uapi/app/api/auxillaries/data/route.ts`, and `uapi/app/api/auxillaries/model-preferences/route.ts` | canonical auxillaries ownership with redirect-only orbital compatibility, stronger application-page entry points, pane rehabilitation, and signed-in preference coherence | auxillaries remain the Connects/Interfaces/Profile/`$BTD` owner, `Interfaces` and `$BTD` now read through application-owned panes instead of model or credits wrappers, contained auxillary rails now use shared panel/tabs carriers instead of older floating ring-label sequence furniture, and auxillaries are not flattened into `/application` | the ringed overlay stays intact and feels like the application’s auxillary layer |
| orbital preference persistence | signed-in orbital defaults historically depended on missing or demo-local save carriers | `uapi/app/api/auxillaries/model-preferences/route.ts`, `OrbitalsInterfacesPane.tsx`, `OrbitalsBTDPane.tsx`, and shared orbital workspace carriers | authenticated read, lead/admin write, shared preference-card posture, and operator-facing default continuity remain explicit without reviving demo-era pane indirection | the operator should experience real orbital preference ownership rather than compatibility wrapper panes |

### Second-gate semantic non-regression rule

Second-gate implementation must preserve:
- scenario selection,
- projection selection,
- branch-mode selection,
- deposit submission and repo inventory filtering,
- need and fit interpretation,
- ranking and verification reading,
- branch artifact and materialization reading,
- settlement and exact-accounting reading,
- bounded proof and disclosure reading,
- flow-guide continuity fed from preserved-shell tutorial compatibility,
- and fail-closed boundary honesty.

If any of those semantics change, the change must be explicit in V26 rather than hidden inside UI refactoring.

### Second-gate external interfacing hardening scope

Second-gate must harden the application-facing external interfacings that are visible from or directly drive `/application`.
At minimum this includes:
- authenticated repo and GitHub-adjacent interaction carriers,
- account/auth-connected application entry posture,
- current bitcoin-demonstration-service and V24 external-realization route surfaces as they appear through the application page,
- compute/storage/repeated-read/sidechain boundary readability and failure posture,
- and application-visible error/loading/empty-state handling for those surfaces.

Second-gate stable readiness means:
- the route behaves coherently under the supported second-gate posture,
- external-boundary failures are legible and fail closed,
- the user can understand what is modeled, what is observed, and what remains boundary-only,
- and the new application page no longer reads like a preserved prototype shell with production concerns merely stapled onto it.

### Second-gate acceptance matrix

Second-gate is accepted only when all of the following hold:

1. Design acceptance
   - the section wireframe pack is approved,
   - the semantic non-regression ledger is explicit,
   - the component adoption matrix is explicit,
   - and the external interfacing hardening matrix is explicit.

2. UI acceptance
   - `/application` is primarily route-local app composition rather than a carried monolithic shell DOM/CSS contract,
   - `/application` is the only primary Bitcode destination,
   - `/application` clearly reads as the master-detail Bitcode workspace,
   - `/application` treats `transactionId` as the primary master-detail query carrier while continuing to accept inbound `runId` for compatibility convergence,
   - transaction selection plus rich master-table filter posture are route-owned and shareable through application query state instead of being trapped in local component state,
   - transaction-detail focus is route-owned and shareable through application query state rather than being trapped in local detail-surface state, with `transaction` as the preferred detail carrier and legacy `identity` accepted only for compatibility parsing,
   - selected-transaction closure rerun and detail refresh are available directly from the application-owned detail surface through the shell bridge,
   - selected-transaction closure, proofs, and history are explicit detail carriers inside `/application` rather than being buried under one closure pane or delegated back to shell-section follow-through,
   - the give-side application frame includes explicit repository connection posture and selected repository supply before the deposit chain,
   - the route-local command deck reads and drives scenario/projection/branch/flow-guide/reset posture through the shell bridge rather than direct DOM scraping,
   - route-local deposit submission is available through an application-owned Bitcode composer that posts to the app-owned deposit route and refreshes shell state coherently,
   - route-local need selection is available through an application-owned scenario carrier that drives active Bitcode need posture through the shell bridge,
   - route-local support rail and give-side supply terminal both use the same shared application-shell/help grammar as the rest of the application workspace rather than bespoke section shells,
   - the retained pre-Bitcode navbar frames the Bitcode application,
   - the page reads as Bitcode inside the app shell,
   - and the pre-Bitcode aesthetic atmosphere is preserved without reverting product identity away from Bitcode.

3. UX acceptance
   - the three main experiences are legible as master detail, conversations, and orbitals,
   - the two main actions are legible as give and need,
   - repository connection posture and selected repository supply are legible as part of the give-side action frame,
   - route-local supply selection makes authenticated intake session, artifact filtering, search, and inventory selection explicit inside `/application`,
   - route-local deposit composition keeps title/author overrides, raw fallback content, and selected-inventory continuity explicit inside `/application`,
   - route-local need composition keeps active scenario choice, parser posture, closure count, and target-kind posture explicit inside `/application`,
   - route-local polling and shell-control refresh are centralized through `application-shell-bridge.tsx` rather than repeated independently across second-gate carriers,
   - route-local give/need action detail reads through the semantic shell snapshot bridge rather than generic shell markup,
   - transactions, deliverables, proofs, and history are explicit as the four master-detail substructures inside `/application`,
   - the transactions master surface supports free-text search plus direct filtering by status, ownership, repository, participant, proof posture, and sort order,
   - visible operator copy stays user-referencing and does not narrate gates, routes, shell plumbing, mounted-state mechanics, or source-path internals back to the operator,
   - the repo-supply to settlement journey remains understandable,
   - conversations and orbitals are reachable as fullscreen overlays without abandoning application context,
   - selected-transaction detail and deliverable-reading workflows are available from within `/application` through master-detail reuse in both live and mock posture,
   - flow-guide and explainer guidance remain useful,
   - orbital entry and account state remain coherent with the application page,
   - shared orbital-entry copy remains coherent across application buttons, notifications, user-menu chrome, and focused orbital routes,
   - contained orbital access shells and focused orbital routes keep orbitals-first wording, read as contained orbital reads, and remain width-stable when entered from `/application` rather than regressing to generic workspace/settings/account furniture,
   - preserved-runtime help, reference chips, and telemetry labels stay Bitcode-facing instead of leaking canon, source-path, or `engi-demo`-era language into operator-visible surfaces,
   - and first-gate semantic regressions are not introduced.

4. External hardening acceptance
   - the application-facing external interfacings used by the page are stable enough to be considered second-gate-ready,
   - the app-owned `/api/vcs/*` contract coherently feeds repository connection posture and repository selection inside `/application`,
   - the app-owned `/api/v24/external-realization` contract coherently feeds a native external-interfacing posture read inside `/application`,
   - boundary honesty remains explicit,
   - and failure states are deliberate rather than incidental.

5. Documentation and parity acceptance
   - second-gate repository/specification documents stay synchronized to active source state,
   - the active second-gate markdown set includes the root, package, route, and shared-component README carriers and is treated as required implementation scope rather than optional cleanup,
   - supplementary modular docs are identified wherever the canon is not the right long-form carrier,
   - active supplementary carriers such as `protocol-demonstration/V26_APPLICATION_SYSTEMS.md` and `protocol-demonstration/V26_PROOF_SURFACES.md` stay synchronized to the converged source topology,
   - `.bitcode/v26-gate-checkpoint-report.json` exists and records first-gate closure, second-gate closure readiness, and explicit third-gate preparation before final V26 promotion,
   - the active internal module namespace is `@bitcode/*` across package manifests, path aliases, and active source imports,
   - and new second-gate code systems are assigned proof/test/spec coverage rather than being treated as unproven incidental glue.

6. Separation acceptance
   - third-gate marketing work is not required for second-gate acceptance,
   - and fourth-gate debug/environment controls are not treated as substitutes for second-gate interface hardening.

### Second-gate implementation order

The intended second-gate implementation order is:
1. navbar/app-frame and shell-frame convergence,
2. guide/command/rail replacement,
3. depositing and repo-supply replacement,
4. needing and fit replacement,
5. ranking/verification replacement,
6. branch-artifact and settlement/proof replacement,
7. ledger/history/policy plus run-detail master-detail convergence,
8. orbitals and conversations overlay convergence tightening,
9. external interfacing hardening and final second-gate verification.

## V26 fourth-gate retained-system convergence contract

Fourth-gate ports the retained application systems into the Bitcode V26 total system instead of leaving them as neighboring platforms with only loose shared UI or API glue.

### Fourth-gate retained system owners

| Retained system | Current source basis | Fourth-gate target requirement |
| --- | --- | --- |
| conversations and chat-based application interface | `uapi/app/conversations/components/*`, `packages/api/src/conversations/*`, `packages/conversations-generics/*` | remain first-class application interfaces and port onto the Bitcode V26 system model rather than sitting beside it |
| executions, runs, pipelines, and retained compatibility APIs | `uapi/app/executions/*`, `uapi/app/api/vcs/route.ts`, `uapi/app/api/templates/deliverables/route.ts`, `uapi/app/api/auxillaries/template-preferences/route.ts`, `packages/api/src/routes/deliverables.ts`, `packages/api/src/pipelines/branch.ts`, `packages/execution-generics/*`, `packages/pipelines/*` | remain explicit merged-world `executions` primitives, with pipeline runs, need measurement, and retained compatibility APIs staying execution-shaped inside the broader `activity` family while retained selectors/template personalization stay healthy until inward convergence removes the dependency |
| retained auxillaries routes, preferences, and companion panes | `uapi/app/auxillaries/*`, redirect-only `uapi/app/orbitals/*`, `uapi/app/api/auxillaries/data/route.ts`, `uapi/app/api/auxillaries/profile/route.ts`, `uapi/app/api/auxillaries/connections/github/route.ts`, `uapi/app/api/auxillaries/model-preferences/route.ts`, `uapi/app/api/auxillaries/btd/route.ts`, `uapi/app/api/auxillaries/usage/route.ts`, `uapi/app/api/auxillaries/transactions/route.ts`, `uapi/app/api/auxillaries/api-keys/route.ts`, `uapi/app/api/auxillaries/user/data-share/route.ts` | converge on merged-world `auxillaries`: extra-network, non-transactional, still-proven user preference, interface, identity, external-connection, and BTD-throughput surfaces that remain around the Bitcode core without being treated as the network/activity center |
| PostgreSQL and Supabase persistence | `supabase/*`, `supabase/migrations/001_ga1_production.sql`, `packages/supabase/src/*`, `packages/orm/src/models/*`, `packages/orm/src/queries/*`, `packages/orm/src/types/database.generated.ts`, `packages/orm/src/types/database.ts`, `packages/orm/scripts/generate-db-types.ts`, active database-facing API carriers, `/edgetimes`, and `/api/edgetimes` | converge on one explicit Bitcode persistence owner with active migrations, schema contracts, typed query ownership, generated database types, and application/API boundaries that are no longer informal |
| prompt abstraction and prompt space | `packages/prompts/src/*`, `uapi/prompts/conversations-system-prompt.ts`, `protocol-demonstration/src/canonical/type-contracts.ts` | become the direct source of prompt text and prompt contracts across retained V26 systems, and weave into a proved prompt space |
| retained agent and tool abstractions | `packages/generic-agents/*`, `packages/git/*`, `packages/vcs/*`, related API/tool carriers | remain as retained abstractions only where V26 gives them a clear role inside conversations and pipeline capabilities |
| deliverable semantics | `packages/api/src/routes/deliverables.ts`, `uapi/app/executions/*`, current execution components | are redefined under Bitcode V26 so “deliverable” means a Bitcode run/pipeline output surface rather than an isolated Bitcode-era pipeline noun |

### Fourth-gate convergence rules

Fourth-gate requires:
1. the conversations interface remains and ports into the Bitcode V26 system model,
2. the chat-based and ChatGPT-like application interaction model remains available as a fullscreen application mode entered from `/application` rather than being displaced by it,
3. non-chat and non-orbital execution surfaces converge onto a V26 runs/pipelines system centered inside `/application`,
4. deliverable semantics become part of Bitcode V26 run/pipeline semantics,
5. all retained prompt text must route through prompt abstraction rather than ad hoc inline prompt strings,
6. the proved prompt space must cover retained conversation and pipeline prompts,
7. PostgreSQL and Supabase persistence, including `/edgetimes`, must have one explicit Bitcode V26 owner rather than floating across informal API glue,
8. `supabase/migrations/001_ga1_production.sql`, `packages/supabase/src/*`, `packages/orm/src/models/*`, `packages/orm/src/queries/*`, `packages/orm/src/types/database.generated.ts`, `packages/orm/src/types/database.ts`, and `packages/orm/scripts/generate-db-types.ts` must be treated as explicit retained-system owners with tests, docs, comments, and proof coverage rather than incidental infrastructure residue,
9. retained agent/tool abstractions must have explicit V26 roles or be excluded from retained-package status,
10. old-world tool and agent ports must be reprompted and repurposed for Bitcode canonical use, with systems such as Jira scoped first to need-ingestion and need-measurement reads rather than expansive settle-write semantics,
11. initial testnet-ready settle-write closure may remain Git/GH-branch/GH-PR centric even when later multi-surface settle writes are planned,
12. retained `/executions` compatibility APIs such as `/api/vcs`, `/api/templates/deliverables`, and `/api/auxillaries/template-preferences` are treated as explicit fourth-gate promotion-boundary owners rather than incidental glue,
13. canonical auxillary APIs such as `/api/auxillaries/profile`, `/api/auxillaries/connections/github`, `/api/auxillaries/btd`, `/api/auxillaries/usage`, `/api/auxillaries/transactions`, and `/api/auxillaries/api-keys` are explicit active owners rather than latent pane-side assumptions,
14. retained `/executions` naming must remain `executions`, where Bitcode execution primitives, measured-need runs, and pipeline follow-through stay explicit inside the broader searchable `activity` family,
15. fourth-gate must also establish one shared activity vocabulary so transactions, executions, and user-facing notifications normalize through the same typed Bitcode activity model before later activity classes are admitted,
16. retained `/orbitals` naming must converge on merged-world `auxillaries`, where extra-network, non-transactional preference/interface/identity/connection surfaces stay proven without displacing the core network/activity topology, and `/orbitals/*` survives only as redirect-only compatibility into `/auxillaries/*`,
17. current executions and deliverables surfaces are treated as inward-ported master-detail/workspace reuse carriers rather than the lasting Bitcode topology,
18. and retained packages must be admitted intentionally rather than kept implicitly because they already exist.

### Fourth-gate acceptance matrix

Fourth-gate is accepted only when:
1. conversations, chat, and execution/runs surfaces still function as first-class application systems,
2. those systems are specified as Bitcode V26 systems rather than as adjacent Bitcode-era subsystems,
3. conversations operate as a fullscreen application mode and not as a separate product reservoir,
4. execution/deliverable master-detail patterns are ported inward to `/application`,
5. prompt abstraction is the direct source for retained prompt text,
6. persistence ownership across `supabase/*`, `packages/supabase/*`, storage-facing API carriers, and `/edgetimes` is explicit,
7. active migrations, schema contracts, ORM/query carriers, and generated types are explicit retained-system owners with test/spec/doc obligations,
8. retained package roles and boundaries are explicit,
9. deliverable, run, and pipeline meaning are explicit under V26,
10. old-world tools and agents are Bitcode-purposed with prompt ownership and reader-first fourth-gate scope,
11. Git/GH-based settle-write carries the required initial testnet-ready asset settlement posture,
12. retained executions compatibility APIs are explicit promotion-boundary owners instead of invisible route glue,
13. canonical auxillary APIs are explicit active owners rather than latent pane-side dependencies,
14. retained `/executions` and `/orbitals` compatibility routes visibly teach `executions` and `auxillaries` as the merged-world target, with `/orbitals/*` reduced to redirect-only compatibility that no longer renders canonical HTML,
15. retained transaction, execution-event, and notification surfaces share one typed Bitcode activity vocabulary rather than drifting into separate activity semantics,
16. and fourth-gate proof obligations are assigned to generated proof families rather than left informal.

## V26 fifth-through-seventh-gate closure contract

Fifth-gate is the formal post-promotion Bitcode-rename, proof-precision, and system-completeness gate for V26.
Sixth-gate is the reform gate that adjudicates, cuts, or repurposes the final old-world pure-agentic system carriers into Bitcode market infrastructure.
Seventh-gate is the final whole-repository provation and closure gate for V26.
V26 may be the active canon through fourth-gate while fifth through seventh remain open, but no part of V26 is considered fully proven until those later-gate closure duties are explicit for the systems V26 keeps.

### Fifth-gate proof families required for Bitcode rename completion and system completeness

| Proof family | Required artifact path | Closure obligation | Current source basis |
| --- | --- | --- | --- |
| second-gate application composition | `.bitcode/application-composition-proof.json` | prove that `/application` is route-local application composition while preserving first-gate Bitcode semantics | `uapi/app/application/*`, `protocol-demonstration/public/app.js` |
| conversations continuity | `.bitcode/conversations-continuity-proof.json` | prove that conversations and the chat-based interface remain first-class and correctly port into V26 Bitcode system semantics | `uapi/app/conversations/components/*`, `packages/api/src/conversations/*`, `packages/conversations-generics/*` |
| runs and pipelines totality | `.bitcode/runs-pipelines-totality-proof.json` | prove that retained run/pipeline systems totalize Bitcode operations coherently, including deliverable meaning and the compatibility APIs still required to keep retained execution selectors healthy | `uapi/app/executions/*`, `uapi/app/api/vcs/route.ts`, `uapi/app/api/templates/deliverables/route.ts`, `uapi/app/api/auxillaries/template-preferences/route.ts`, `packages/api/src/routes/deliverables.ts`, `packages/pipelines/*`, `packages/execution-generics/*` |
| persistence and schema totality | `.bitcode/persistence-schema-totality-proof.json` | prove that PostgreSQL/Supabase persistence, `/edgetimes`, migrations, schema contracts, ORM/query carriers, and generated types form one coherent Bitcode storage system | `supabase/*`, `supabase/migrations/001_ga1_production.sql`, `packages/supabase/src/*`, `packages/orm/src/models/*`, `packages/orm/src/queries/*`, `packages/orm/src/types/database.generated.ts`, `packages/orm/src/types/database.ts`, `packages/orm/scripts/generate-db-types.ts`, retained storage-facing API carriers, and generated database types |
| prompt system totality | `.bitcode/prompt-system-totality-proof.json` | prove that retained PromptPart/Prompt/PromptExecution carriers and old-world prompt ports remain explicit Bitcode-owned prompt infrastructure before later prompt-space completeness closure | `packages/prompts/src/*`, `packages/execution-generics/src/prompts/*`, `packages/agent-generics/src/prompts/*`, `packages/conversations-generics/src/prompts/*`, retained Jira prompt ports, and retained deliverable planning/measurement prompts |
| prompt space completeness | `.bitcode/prompt-space-completeness-proof.json` | prove that retained prompt text routes through prompt abstraction and the proved prompt space | `packages/prompts/src/*`, `uapi/prompts/conversations-system-prompt.ts`, `protocol-demonstration/src/canonical/type-contracts.ts` |
| retained package admissibility | `.bitcode/retained-package-admissibility-proof.json` | prove that each kept non-Bitcode package has an explicit V26 role, boundary, justification, and old-world port scope where applicable | retained `packages/*` admitted by V26 |
| environment mode coherence | `.bitcode/environment-mode-coherence-proof.json` | prove debug/environment controls and production/staging/development mode behavior are coherent and refresh safely | app shell, debug controls, environment toggles, route/API posture |
| sixth-gate system reform admissibility | `.bitcode/system-reform-admissibility-proof.json` | prove that retained old-world agentic systems are either cut, isolated, or repurposed into Bitcode need-measuring, settlement, or support roles rather than surviving as unexamined parallel product logic | retained web-search, webhooks, generic agent/tool ports, executions-adjacent agentic packages, and other old-world infrastructure still admitted after fifth-gate |
| whole-repository production satisfaction | `.bitcode/whole-repository-production-satisfaction-proof.json` | prove that the retained and repurposed repository that remains in V26 production canon is proven up to Bitcode-grade satisfaction rather than leaving strong proof closure isolated to the former demo slice | all retained V26 routes, packages, components, proofs, docs, and generated artifacts |
| v26 total closure | `.bitcode/v26-total-closure-proof.json` | prove that the gated V26 system closes as one coherent Bitcode system suitable for promotion | all promoted V26 systems and generated artifacts |

### Fifth-gate formal acceptance rule

Fifth-gate is closed only when:
1. second-gate acceptance holds,
2. third-gate acceptance holds,
3. fourth-gate acceptance holds,
4. fifth-gate proof families are generated with explicit closure verdicts,
5. environment controls and environment-mode completeness are proven rather than assumed,
6. retained package admissibility is explicit,
7. the kept system is described totalistically enough that Bitcode-era and Bitcode-first-gate reservoirs no longer require informal interpretation to fit together,
8. unreplaced `engi` product naming is retired from active code, copy, and route teaching unless it remains as explicit historical lineage or a still-required structural namespace,
9. newly admitted application, API, MCP, prompt, and retained package surfaces are proven to the same proof-bearing standard expected of the former top-level Bitcode demo core rather than being tolerated as lighter glue,
10. and backward-compatibility carriers are cut or clearly isolated as temporary fifth-gate retirement work rather than silently teaching the merged-world product model.

### Sixth-gate formal acceptance rule

Sixth-gate is closed only when:
1. fifth-gate acceptance holds,
2. retained old-world pure-agentic systems have explicit Bitcode roles or explicit cut decisions,
3. need-measuring agency is the governing interpretation for retained execution, pipeline, tool, and prompt carriers,
4. the post-cut-over Bitcode application map is explicit and implemented as:
   - `activity`: the dominant master-detail transaction activity surface with searchable, filterable, live-updating tables and activity detail
   - `transactions`: the write-space for making transactions and executing give/need/system operations
   - `conversations`: the rich ChatGPT-style read/write Bitcode interface, popup-capable and fullscreen-capable, with tool registration kept aligned to the ChatGPT app surface
   - `auxillaries`: non-duplicative settings, preferences, connections, identity, and deep wallet/`$BTD` surfaces around the network core
5. systems with no stable Bitcode place, such as purely old-world search/automation or webhook behaviors, are cut or isolated instead of silently surviving,
6. retained executions primitives remain only where they support Bitcode need measurement, runs, pipelines, and transaction-linked market behavior rather than surviving as a parallel product center,
7. and the repository-level architecture is cleaner after reform, not broader or more compatibility-heavy.

### Seventh-gate formal acceptance rule

V26 is fully proven only when:
1. fifth-gate acceptance holds,
2. sixth-gate acceptance holds,
3. whole-repository production satisfaction is generated with an explicit closure verdict,
4. prompt space completeness and total repository closure proofs are generated with explicit closure verdicts,
5. the kept repository is application-ready Bitcode canon without legacy product naming or silent compatibility ownership,
6. and V26 total closure is explicit enough that promotion no longer depends on interpretive notes.

## Canonical Bitcode executive summary

The heading name remains a historical carrier required by the specifying contract.
The subject of V26 is Bitcode.

In V26, Bitcode remains:
1. a proof-bearing operating system for repo supply, measured need, fit, verification, selection, materialization, disclosure, settlement, and proof closure,
2. a system that already has rename closure from V25 and must preserve Bitcode and BTD posture during further reorganization,
3. a system that already has external-realization, proof, settlement, disclosure, and fail-closed semantics in source,
4. a system whose current operator story is useful but whose current ownership and presentation are transitional,
5. a system that must move from demonstration-owned and marketing-embedded posture to application-native posture,
6. a system that must keep repo supply and depositing, needing and measured demand, prompt/inference/evaluator ownership, depositing-to-needing fit, recall and ranking, verification decisions, selection and materialization, branch artifacts and deliverables, identity, authority, signing, and policy, sensitive data and confidentiality flows, projection, disclosure, and redaction, proof families, members, theorems, witnesses, and replay, settlement, source-to-shares, journals, and exact accounting, telemetry, persistence, state, and failure semantics, host/runtime capability truth, operator experience and pedagogy, validation and test stack, and generated artifacts and canonical promotion all explicitly in scope,
7. and a system that must now be legible as a real application rather than as an adjacent demonstration.

## source-of-truth hierarchy

Current truth order for the active V26 canon is:
1. `BITCODE_SPEC.txt`
2. `BITCODE_SPEC_V26.md`
3. `BITCODE_SPEC_V26_DELTA.md`
4. `BITCODE_SPEC_V26_PARITY_MATRIX.md`
5. `BITCODE_SPEC_V26_NOTES.md`
6. `BITCODE_SPEC_V26_PROVEN.md`
7. active canonical `.bitcode/v19-*`, `.bitcode/v20-*`, and `.bitcode/v26-*` artifacts
8. current source and tests explicitly referenced by active V26 canon
9. historical prior specs

V26 is therefore the active canonical runtime truth through fourth gate, while fifth-, sixth-, and seventh-gate closure remain deliberate active work inside V26 before later-version reopening.

## full-system, re-implementation, and audit rule

The promoted V26 main specification must be sufficient for:
- full-system re-implementation of current Bitcode behavior and the intended V26 ownership changes,
- audit recovery of the current proof contract, artifact model, and application/operator posture,
- and operator comprehension of the whole Bitcode chain without semantic dependence on prior versions.

That requirement applies to:
- repo supply and depositing,
- needing and measured demand,
- prompt/inference/evaluator ownership,
- depositing-to-needing fit,
- recall and ranking,
- verification decisions,
- selection and materialization,
- branch artifacts and deliverables,
- identity, authority, signing, and policy,
- sensitive data and confidentiality flows,
- projection, disclosure, and redaction,
- proof families, members, theorems, witnesses, and replay,
- settlement, source-to-shares, journals, and exact accounting,
- telemetry, persistence, state, and failure semantics,
- host/runtime capability truth,
- operator experience and pedagogy,
- validation and test stack,
- generated artifacts and canonical promotion,
- bitcoin mainchain execution,
- sidechain execution,
- repeated-read payment execution,
- compute-container execution,
- storage-container execution,
- GitHub live interface,
- auth and wallet connection,
- application-route integration,
- package extraction and repository ownership,
- marketing/product-surface routing,
- and full-canon specification completeness.

Neither `_PROVEN_`, parity, source, demo code, app code, packages, nor earlier specs are allowed to carry missing current-system meaning for promoted V26.

## totality and precision enforcement rule

V26 requires totality and precision rather than suggestive prose.

That means:
- every realized or target-realized external effect maps to named artifacts,
- every proof family maps to named witnessArtifactPaths, theoremIds, and replayStepIds,
- every route and ownership migration states whether it is current source truth, implemented prerequisite, or draft target,
- every generated artifact expectation maps to a regeneration and validation contract,
- every fail-closed condition is named,
- every acceptance boundary is explicit,
- and no part of the V26 reorganization is allowed to hide behind "integration" without naming the actual owner that will carry the behavior.

When V26 says "current source basis," it means current V25-era repo truth.
When V26 says "draft target owner," it means intended V26 ownership that is not yet promoted.
When V26 says "implemented prerequisite," it means existing source already supplies some of the behavior V26 intends to reorganize rather than invent.

## system goals, non-goals, and design principles

### Goals

1. Move the Bitcode operator experience from demonstration-owned posture to a first-class application page.
2. Remove homepage embedded-demo dependence and replace it with navigate-to product routing.
3. Preserve the current Bitcode operator UX chain while replacing the demonstration UI implementation with application-facing components.
4. Reassign Bitcode system ownership from demo-local concentration into package-owned and app-owned surfaces.
5. Converge GitHub, auth, and API production responsibilities onto the existing package/application architecture where those owners already fit.
6. Harden bitcoin, sidechain, repeated-read, compute, storage, telemetry, reconciliation, and auth/wallet interfaces to live-operation-ready posture.
7. Restore stronger repository-level architectural coherence so the repo again matches the fuller package-first pattern it already advertises.
8. Keep Bitcode and BTD rename closure stable while the system is reorganized.
9. Keep proof-bearing, fail-closed, exact-accounting, and disclosure-bounded semantics intact through the reorganization.
10. Produce a full-canon V26 specification family that can stand alone for re-implementation, audit, and promotion.
11. Keep the second-gate application atmosphere visually aligned with the retained pre-Bitcode design system even while the product naming and system identity are entirely Bitcode.
12. Add a debug-owned environment control surface before promotion so environment posture can be toggled and reviewed explicitly inside the application.
13. Make `/application` the only primary Bitcode destination while conversations and orbitals operate as fullscreen application overlays.
14. Port the strongest executions/deliverables master-detail patterns into `/application` rather than preserving peer product destinations.
15. Maximize precise reuse of the active retained package/app code where those owners fit the Bitcode V26 total system.

### Non-goals

1. Re-opening the Bitcode or BTD rename as the center of the version.
2. Redesigning Bitcode economics or denomination behavior.
3. Treating the current demo UI shell as the long-term owner of the Bitcode application surface.
4. Treating a route move alone as sufficient V26 closure without ownership and hardening work.
5. Treating historical `_legacy/` code as active truth.

### Design principles

- Preserve the operator UX chain while replacing the operator UI owner.
- Prefer package-first ownership and explicit app composition over demo-local concentration.
- Keep `/application` as the single primary Bitcode destination and treat overlay/workspace systems as application-mounted modes.
- Pull the strongest existing execution, deliverable, conversation, and orbital patterns inward rather than duplicating them.
- Reuse existing packages when the current owner already fits.
- Keep application routing and product posture explicit rather than iframe-dependent.
- Keep every external effect auditable and fail closed.
- Keep disclosure and proof boundaries intact while the app surface becomes more natural.
- Keep compatibility carriers stable unless V26 changes them explicitly.
- Do not derive current truth from `_legacy/`; forward-porting, when later reopened, must normalize into current owners.

## V26 productionizing workstreams

The four V26 workstreams are:

1. demonstration-to-application integration
2. marketing and application-facing UI refurbishment
3. interface and subsystem hardening
4. organizational refurbishment

Those workstreams are coordinated, not alternative options.
V26 is incomplete if any one of them is omitted from the promoted version center.

## system architecture and layer boundaries

V26 productionizing hardening is organized into ten interacting layers:

1. `core deterministic primitives and canonical vocabulary`
2. `package-owned Bitcode operating surfaces`
3. `package-owned artifacts, proof, projection, settlement, and external-realization layers`
4. `API composition and route-owned application orchestration`
5. `application-facing UI composition and operator route surfaces`
6. `marketing and navigation surfaces that lead into the application`
7. `identity, authorization, wallet, signing, and policy`
8. `bitcoin, sidechain, repeated-read, compute, storage, and GitHub live interfaces`
9. `telemetry, reconciliation, runtime posture, and generated evidence`
10. `promotion, validation, and canonical file-family governance`

The current source-bearing split across these layers is still imperfect:
- the former top-level demo owner still spans many of them at once,
- `uapi/` carries marketing and app composition,
- `packages/*` already owns some production-grade responsibilities,
- and V26 exists to make those boundaries explicit rather than accidental.

The cross-cutting constraints over every layer are:
- Bitcode/BTD rename invariance,
- application-native operator posture,
- package-first ownership,
- proof-bearing auditable execution,
- fail-closed behavior,
- and generated-artifact plus promotion completeness.

## canonical domain model

The V26 canonical domain model includes the following object and surface classes:

- repo supply and depositing: authenticated repositories, deposits, deposit profiles, deposit envelopes, repo bindings, and GitHub installation context.
- needing and measured demand: need scenarios, benchmark/parser-derived demand, licensed query surfaces, and measured demand envelopes.
- prompt/inference/evaluator ownership: prompt families, prompt contracts, prompt surfaces, inference moments, parsed completion envelopes, evaluator manifests, and prompt lineage.
- depositing-to-needing fit: fit explanations, candidate match scores, exclusion reasons, ranked candidates, and eligibility boundaries.
- recall and ranking: retrieval candidates, ranking receipts, use-tier signals, and candidate ordering stability.
- verification decisions: issuance, provenance, sufficiency, and issuer-policy decisions plus supporting receipts.
- selection and materialization: asset-pack locks, selected-source manifests, materialization proofs, branch artifact outputs, and application-visible operator artifacts.
- branch artifacts and deliverables: `.bitcode/` outputs, witness manifests, generated reports, route-facing views, and publication receipts.
- identity, authority, signing, and policy: identity bindings, authorization decisions, wallet connection, signer or treasury policy, GitHub App binding, and external execution policy.
- sensitive data and confidentiality flows: sensitive-data flow maps, disclosure classifications, retention policies, and publication controls.
- projection, disclosure, and redaction: principal-scoped views over public, reviewer, buyer, and internal surfaces.
- proof families, members, theorems, witnesses, and replay: proof object models, replay steps, artifact bindings, witness inventories, and theorem closure.
- settlement, source-to-shares, journals, and exact accounting: BTD-denominated allocation, settlement participation, accounting precision, journal diff, and settlement proof.
- telemetry, persistence, state, and failure semantics: telemetry summaries, execution manifests, route state, external execution state, retries, rollbacks, and reconciliation state.
- host/runtime capability truth: application posture, package posture, runtime posture, external capability truth, and mode-specific credentials.
- operator experience and pedagogy: product routing, full-page operator surfaces, proof/settlement inspection, and application-facing explanations.
- validation and test stack: local checks, strict spec conformance, package tests, API tests, application tests, and promotion regeneration.
- generated artifacts and canonical promotion: generated reports, `_PROVEN_` appendix, canonical input reports, parity ledgers, and promotion rules.

## whole Bitcode operator chain

The whole Bitcode operator chain in V26 is:
1. configure the active V26/V27 posture and route class,
2. bind the correct environment-mode identities and resources,
3. authenticate repo supply and candidate deposits,
4. measure need,
5. establish prompt/inference/evaluator ownership,
6. compute depositing-to-needing fit,
7. execute recall and ranking,
8. issue verification decisions,
9. materialize the selected asset pack,
10. build branch artifacts and deliverables,
11. enforce identity, authority, signing, and policy,
12. enforce sensitive data and confidentiality flows,
13. project the result per principal,
14. settle source-to-shares and journals in BTD,
15. derive proof-family, witness, and replay closure,
16. execute Bitcoin mainchain, repeated-read, or sidechain interfaces when required,
17. execute compute-container and storage-container interfaces when required,
18. execute GitHub live interfaces when required,
19. expose the operator experience through the application-native Bitcode page rather than a demo-local shell,
20. reconcile telemetry, persistence, state, and failure semantics,
21. validate, regenerate, and decide canonical promotion.

The workflow stages remain:
- Openly writable,
- Measurably readable,
- Provable,
- Valuable.

## canonical subsystem surfaces

### Depositing and asset supply

- Current canonical objects and emitted artifacts: repo supply and depositing are represented by authenticated repository bindings, deposit envelopes, `.bitcode/depositing-surface.json`, `.bitcode/github-boundary.json`, `.bitcode/github-live-session.json`, `.bitcode/github-inventory-fetch-receipt.json`, and `.bitcode/asset-pack.lock.json`.
- Current algorithms and derivation rules: Bitcode admits repo-addressable deposits, normalizes deposit identity against repo-authenticated supply, and carries deposit lineage forward into fit, verification, materialization, proof, and GitHub live mutation surfaces. V26 adds the requirement that the primary operator route consume those surfaces through package-owned and app-owned composition rather than directly through demo-local owners.
- Current invariants and fail-closed conditions: invalid deposit, stale repo addressing, missing GitHub inventory receipt, broken deposit lineage, or route-layer presentation that obscures deposit provenance fail closed.
- Current proof obligations: deposit provenance, asset identity stability, repo-authenticated supply closure, and deposit-to-asset-pack continuity must be replayable.
- Current source-bearing implementation basis: `protocol-demonstration/src/bitcode-demo.js`, `protocol-demonstration/src/canonical/run-artifacts.js`, `protocol-demonstration/src/canonical/surfaces.js`, `protocol-demonstration/src/canonical/v24-external-realization.js`, `protocol-demonstration/server.js`, and `packages/github`.
- Current validating commands and parity basis: `node --test protocol-demonstration/test/core.test.js`, `node --test protocol-demonstration/test/api.test.js`, and the V26 parity rows for application-native routing and package extraction.
- Current accepted boundaries: external GitHub execution remains deployment-configured and policy-bound; V26 accepts deposit supply only through emitted session, fetch, branch, and mutation receipts and does not treat `_legacy/` as active deposit truth.

### Needing and prompt/inference ownership

- Current canonical objects and emitted artifacts: needing and prompt/inference/evaluator ownership are represented by `.bitcode/needing-surface.json`, `.bitcode/prompt-family-registry.json`, `.bitcode/prompt-contracts.json`, `.bitcode/prompt-surfaces.json`, `.bitcode/inference-moment-contracts.json`, `.bitcode/parsed-completion-envelopes.json`, and `.bitcode/eval-manifest.json`.
- Current algorithms and derivation rules: Bitcode measures need from benchmark, parser, and repo reality, maps prompts and inference moments to that need, and binds evaluator ownership to replayable contracts. V26 preserves those semantics while moving ownership toward package-backed canon and app/API composition.
- Current invariants and fail-closed conditions: prompt contract incompleteness, parsed-envelope inadmissibility, evaluator ambiguity, need drift, or route/UI layers that detach prompt lineage from need lineage fail closed.
- Current proof obligations: prompt family completeness, inference synthesis closure, and evaluator provenance must stay witness-bound and replayable.
- Current source-bearing implementation basis: `protocol-demonstration/src/canonical/prompting.js`, `protocol-demonstration/src/canonical/evaluation-materialization.js`, `protocol-demonstration/src/canonical/need-measurement.js`, `protocol-demonstration/src/bitcode-demo.js`, and the future draft target packages recorded in the V26 extraction matrix.
- Current validating commands and parity basis: `node --test protocol-demonstration/test/core.test.js`, proof-family coverage inside the active test suite, and `node scripts/check-bitcode-spec-family.mjs --version V26`.
- Current accepted boundaries: third-party model execution counts only when it remains receipted, policy-bound, replayable, and normalized back into Bitcode artifacts regardless of whether the final owner is a package or an app/API surface.

### Fit, recall, ranking, and verification

- Current canonical objects and emitted artifacts: fit, recall, ranking, and verification are represented by `.bitcode/depositing-to-needing-surface.json`, `.bitcode/match-report.json`, `.bitcode/verification-report.json`, `.bitcode/verification-receipts.json`, and `.bitcode/verification-decisions-proof.json`.
- Current algorithms and derivation rules: Bitcode computes depositing-to-needing fit before deeper proof closure, then performs recall and ranking, and only then resolves verification decisions and use-tiering. V26 preserves that ordering and requires the app-native surface to present it without depending on demo-owned UI.
- Current invariants and fail-closed conditions: no-survivor asset pack, ranking inconsistency, verification decision drift, non-replayable verification receipts, or UI-layer loss of verification provenance fail closed.
- Current proof obligations: fit continuity, verification issuance/provenance/sufficiency closure, and ranked-candidate determinism must remain auditable.
- Current source-bearing implementation basis: `protocol-demonstration/src/bitcode-demo.js`, `protocol-demonstration/src/canonical/evaluation-materialization.js`, `protocol-demonstration/src/canonical/proof-materialization.js`, and `protocol-demonstration/src/canonical/surfaces.js`.
- Current validating commands and parity basis: `node --test protocol-demonstration/test/core.test.js`, `node --test protocol-demonstration/test/workflow.integration.test.js`, and proof-family closure under `Verification-decisions`.
- Current accepted boundaries: external ranking or inference services remain acceptable only when receipted and recovered into Bitcode artifacts through the current proof and execution contracts.

### Selection and materialization

- Current canonical objects and emitted artifacts: selection and materialization are represented by `.bitcode/asset-pack.lock.json`, `.bitcode/selected-source-material.json`, `.bitcode/selection-consistency-proof.json`, `.bitcode/materialization-proof.json`, `.bitcode/materialization-exclusions.json`, and `.bitcode/selection-and-materialization-proof.json`.
- Current algorithms and derivation rules: Bitcode materializes only selected assets, preserves exclusion reasons, binds materialized artifacts to bundle, branch, and proof identities, and in V26 must expose those outcomes through application-facing components rather than the demo-local UI shell.
- Current invariants and fail-closed conditions: materialization without selection closure, hidden exclusions, non-replayable selected-source lineage, or route/application drift from materialized truth fail closed.
- Current proof obligations: selected-set closure, materialized-source closure, visibility closure, and exclusion closure must all be witness-bound.
- Current source-bearing implementation basis: `protocol-demonstration/src/canonical/evaluation-materialization.js`, `protocol-demonstration/src/canonical/run-artifacts.js`, `protocol-demonstration/src/canonical/proof-materialization.js`, `protocol-demonstration/public/app.js`, and the V26 draft target application route owners.
- Current validating commands and parity basis: `node --test protocol-demonstration/test/workflow.integration.test.js`, `node --test protocol-demonstration/test/e2e.test.js`, and parity rows for app-native UI replacement and package extraction.
- Current accepted boundaries: real GitHub branch publication is a separate live interface and must not be inferred from local materialization alone even after the app surface becomes native.

### Identity, authorization, and sensitive flow

- Current canonical objects and emitted artifacts: identity, authorization, and sensitive flow are represented by `.bitcode/identity-bindings.json`, `.bitcode/authorization-decisions.json`, `.bitcode/sensitive-data-flow.json`, `.bitcode/identity-authorization-proof.json`, `.bitcode/sensitive-data-flow-proof.json`, `.bitcode/authorization-and-sensitive-flow-proof.json`, `.bitcode/github-app-binding.json`, wallet-auth carriers in `packages/auth` and `packages/api`, and execution policy surfaces.
- Current algorithms and derivation rules: Bitcode derives authorization from issuer, signer, wallet, and policy roots, binds external execution to those roots, and routes sensitive data only through classified surfaces. V26 strengthens wallet connection and production auth posture and requires that the application-native Bitcode page operate inside that auth model.
- Current invariants and fail-closed conditions: authorization denial, stale signing roots, stale wallet verification, mis-bound GitHub App identities, or sensitive-flow leakage fail closed.
- Current proof obligations: identity closure, authorization closure, policy closure, wallet verification closure, and sensitive-flow closure must remain replayable across live interfaces.
- Current source-bearing implementation basis: `protocol-demonstration/src/bitcode-demo.js`, `protocol-demonstration/src/canonical/proof-materialization.js`, `protocol-demonstration/src/canonical/v24-external-realization.js`, `protocol-demonstration/src/canonical/v24-live-execution.js`, `packages/auth`, and `packages/api/src/routes/auth.ts`.
- Current validating commands and parity basis: `node --test protocol-demonstration/test/core.test.js`, `node --test protocol-demonstration/test/api.test.js`, and V26 parity rows for wallet/auth productionization.
- Current accepted boundaries: concrete signer topology, wallet provider details, and deployment auth infrastructure remain implementation choices so long as the receipt, policy, and fail-closed contracts are satisfied.

### Disclosure and projection

- Current canonical objects and emitted artifacts: disclosure and projection are represented by `.bitcode/projection-policy.json`, `.bitcode/bounded-public-proof.json`, `.bitcode/redaction-proof.json`, `.bitcode/disclosure-proof.json`, `.bitcode/disclosure-boundary-proof.json`, public/reviewer/buyer/internal projection views, and storage publication and retrieval receipts.
- Current algorithms and derivation rules: Bitcode projects public, reviewer, buyer, and internal surfaces from the same underlying artifact set and preserves bounded-public proof as the only public-safe external projection. V26 additionally requires that the application-native operator surface and refurbished marketing surfaces present these boundaries clearly.
- Current invariants and fail-closed conditions: public projection overexposure, mismatched redaction, storage publication beyond principal rights, retrieval without disclosure authorization, or product-surface copy that implies broader disclosure than policy allows fail closed.
- Current proof obligations: projection policy closure, bounded-public closure, redaction alignment, disclosure verdict alignment, and storage-publication alignment must remain auditable.
- Current source-bearing implementation basis: `protocol-demonstration/src/canonical/projections.js`, `protocol-demonstration/src/demo-shell-state.js`, `protocol-demonstration/src/bitcode-demo.js`, `protocol-demonstration/src/canonical/v24-external-execution.js`, `protocol-demonstration/src/canonical/v24-live-execution.js`, and `uapi/app/(root)/components/MarketingLandingPage.tsx`.
- Current validating commands and parity basis: `node --test protocol-demonstration/test/api.test.js`, `node --test protocol-demonstration/test/e2e.test.js`, and disclosure-boundary proof-family closure.
- Current accepted boundaries: public chains and public storage surfaces may only carry bounded-public receipts or bounded-public anchor material, never licensed source or private proof payloads by default, and V26 marketing must not reintroduce disclosure ambiguity.

### Settlement and exact accounting

- Current canonical objects and emitted artifacts: settlement and exact accounting are represented by `.bitcode/source-to-shares.json`, `.bitcode/settlement-participation.json`, `.bitcode/accounting-precision-report.json`, `.bitcode/journal-diff.json`, `.bitcode/journal-completeness-proof.json`, `.bitcode/settlement-proof.json`, `.bitcode/settlement-source-to-shares-proof.json`, repeated-read payment receipts, bitcoin-network execution receipts, and sidechain execution receipts.
- Current algorithms and derivation rules: Bitcode allocates exact BTD base units, normalizes basis points deterministically, binds payment intent and observation to bundle and settlement identities, and finalizes journals only under policy-bound execution observation. V26 preserves that accounting core while moving runtime ownership out of demo-local concentration.
- Current terminology boundary: journal `debits` and `credits` inside settlement are exact accounting-entry semantics, not product denomination; live product balances, user-facing spend, route payloads, MCP metrics, and application language must use BTC and `$BTD`.
- Current invariants and fail-closed conditions: settlement conservation drift, missing execution receipt, journal finalization without observation, stale reconciliation, or cross-mode treasury drift fail closed.
- Current proof obligations: contribution totality, normalization exactness, journal completeness, settlement theorem integrity, and payment-observation coherence must remain replayable.
- Current source-bearing implementation basis: `protocol-demonstration/src/canonical/settlement.js`, `protocol-demonstration/src/settlement-structs.js`, `protocol-demonstration/src/canonical/v23-bitcoin.js`, `protocol-demonstration/src/canonical/v24-external-execution.js`, `protocol-demonstration/src/canonical/v24-live-execution.js`, and `protocol-demonstration/src/bitcode-demo.js`.
- Current validating commands and parity basis: `node --test protocol-demonstration/test/core.test.js`, `node --test protocol-demonstration/test/workflow.integration.test.js`, and parity rows for external hardening and package extraction.
- Current accepted boundaries: V26 may keep base-layer, sidechain, and repeated-read execution behind deployment configuration, but only where execution and observation receipts exist in source and remain tied to exact accounting.

### Proof contract, witnesses, and replay

- Current canonical objects and emitted artifacts: proof contract, witnesses, and replay are represented by `.bitcode/proof-contract.json`, `.bitcode/system-proof-bundle.json`, `.bitcode/proof-witness-manifest.json`, all proof-family artifacts, `.bitcode/external-realization-proof.json`, `.bitcode/container-reality-proof.json`, `.bitcode/github-live-interface-proof.json`, `.bitcode/external-telemetry-summary.json`, and the future V26 `_PROVEN_` appendix.
- Current algorithms and derivation rules: Bitcode binds every proof family to witnessArtifactPaths, theoremIds, replayStepIds, and artifact digests, then carries them into the system proof bundle and witness manifest for replay. V26 adds the requirement that the proof contract remain coherent while ownership moves from demo-local concentration to package and app layers.
- Current invariants and fail-closed conditions: missing witness artifacts, replay-step drift, container attestation drift, GitHub observation drift, stale generated appendix truth, or proof-family omission fail closed.
- Current proof obligations: proof-family closure, theorem closure, replay closure, witness manifest coherence, and proof-contract bundle coherence must remain exact.
- Current source-bearing implementation basis: `protocol-demonstration/src/canonical/proof-materialization.js`, `protocol-demonstration/src/canonical/run-artifacts.js`, `protocol-demonstration/src/canonical/v24-live-execution.js`, `protocol-demonstration/src/bitcode-demo.js`, and `scripts/check-bitcode-spec-family.mjs`.
- Current validating commands and parity basis: `node --test protocol-demonstration/test/proven-generator.test.js`, `node --test protocol-demonstration/test/v21-specifying.test.js`, `node scripts/check-bitcode-canonical-inputs.mjs`, `node scripts/check-bitcode-spec-family.mjs --version V26`, and later strict V26 conformance.
- Current accepted boundaries: V26 may reorganize owners and add or merge families, but promotion may not narrow away family detail carriers, witness expectations, or generated appendix obligations.

## V26 second-gate package extraction matrix

First-gate has already consolidated the prior standalone owner into `protocol-demonstration` plus app-owned route surfaces.
The following matrix now records the second-gate and later ownership map for splitting that first-gate owner into more deliberate subsystem packages.
These target owners remain draft targets, not yet promoted truth.

| Current source owner | Current responsibility | Draft V26 target owner | V26 extraction expectation | Priority |
| --- | --- | --- | --- | --- |
| `protocol-demonstration/src/canon-posture.js` | active-canon and draft-target posture shaping for the current demo runtime | `packages/bitcode-canon` | move Bitcode canon posture builders and shared operator posture labels into package-owned canon utilities consumed by app and tests | P0 |
| `protocol-demonstration/src/canonical/enums.js`, `protocol-demonstration/src/canonical/types.js`, `protocol-demonstration/src/canonical/type-contracts.ts`, `protocol-demonstration/src/canonical/proof-annotations.js` | closed-case vocabulary, contracts, theorem/proof helpers | `packages/bitcode-canon` | become the package-owned canonical vocabulary and proof-contract layer for Bitcode implementations | P0 |
| `protocol-demonstration/src/canonical/surfaces.js` | depositing, needing, fit, boundary, and GitHub operating surfaces | `packages/bitcode-operating-surfaces` | become package-owned system surface builders consumed by app routes and tests | P0 |
| `protocol-demonstration/src/canonical/run-artifacts.js` | pipeline telemetry, prompt implementation, proof bundle, deliverables, scenario fixture, and coverage report builders | `packages/bitcode-artifacts` | become package-owned artifact and report emitters rather than protocol-local helpers | P0 |
| `protocol-demonstration/src/canonical/need-measurement.js` | need measurement runtime and parser/analysis closure | `packages/bitcode-needs` | become the package-owned need-derivation implementation, with `packages/tech-types` remaining the canonical technology-vocabulary and signal-normalization dependency that classifies measured technical need, supplied assets, and dependent application/API/runtime surfaces without semantic drift or ad hoc stack-string drift | P0 |
| `protocol-demonstration/src/canonical/evaluation-materialization.js` | ranking, verification, use tiers, materialization, and asset-pack selection | `packages/bitcode-materialization` | become the package-owned selection and materialization runtime | P0 |
| `protocol-demonstration/src/canonical/settlement.js`, `protocol-demonstration/src/settlement-structs.js` | source-to-shares accounting, settlement participation, journal diff, and settlement artifacts | `packages/bitcode-settlement` | become the package-owned settlement and accounting subsystem | P0 |
| `protocol-demonstration/src/canonical/projections.js`, `protocol-demonstration/src/demo-shell-state.js` | projection policy, bounded public proof, redaction/disclosure proof, and projection-safe public-state shaping | `packages/bitcode-projections` | become package-owned projection and disclosure builders consumed by the application route and API | P0 |
| `protocol-demonstration/src/canonical/proof-materialization.js` | proof witness manifest, materialization proof, visibility proof, and exclusion closure | `packages/bitcode-proof` | become the package-owned proof and materialization subsystem | P0 |
| `protocol-demonstration/src/canonical/v23-bitcoin.js`, `protocol-demonstration/src/canonical/v23-bitcoin-demonstration-service.js`, `protocol-demonstration/src/canonical/v24-external-realization.js`, `protocol-demonstration/src/canonical/v24-external-execution.js`, `protocol-demonstration/src/canonical/v24-live-execution.js`, `protocol-demonstration/src/canonical/v24-local-executors.js`, `protocol-demonstration/src/canonical/v24-remote-adapters.js` | bitcoin, sidechain, repeated-read, compute, storage, and GitHub external-realization and execution contracts | `packages/bitcode-external-realization` plus `packages/github` where GitHub provider behavior belongs | move protocol-local external-interface ownership into package-backed runtime and adapter layers; GitHub provider logic converges on `packages/github` and related app/API owners | P0 |
| `protocol-demonstration/src/realization-profile.js`, `protocol-demonstration/src/policy-release.js`, `protocol-demonstration/src/receipt-schemas.js` | realization profiles, policy release carriers, and receipt-shape helpers | `packages/bitcode-canon` and `packages/bitcode-artifacts` | split between package-owned canon/profile truth and package-owned receipt and artifact schemas | P1 |
| `protocol-demonstration/src/demo-scenario.js`, `protocol-demonstration/src/seed.js`, seeded fixture and test-support surfaces | seeded scenarios and deterministic fixture posture | `packages/bitcode-scenarios` | preserve deterministic scenario and fixture truth in package-owned test and demo-fixture surfaces | P1 |
| `protocol-demonstration/src/bitcode-demo.js` | orchestration reservoir spanning the full Bitcode operating chain | distributed across the package owners above, with composition in `packages/api` and `uapi/app/*` | shrink and eventually dissolve the monolithic reservoir into package-owned domain layers plus application/API composition | P0 |
| `protocol-demonstration/server.js` | standalone demo HTTP server and API composition | `packages/api` plus `uapi` application routes | move Bitcode API composition into package and app owners; the standalone demo server stops being the primary product surface | P0 |
| `protocol-demonstration/public/index.html`, `protocol-demonstration/public/app.js`, `protocol-demonstration/public/styles.css` | demo-owned UI shell and rendering | `uapi/app/*` plus `uapi/components/base/*` | replace the demo UI implementation with application-facing components while preserving operator UX | P0 |
| `protocol-demonstration/test/*` | demo-local runtime, proof, quality, and external-realization validation | package-local tests plus API and app integration tests | follow the extracted ownership model and keep fail-closed validation across package, API, and app layers | P0 |

## proof-family canon

The proof-family canon in V26 retains the core Bitcode families while V26 reorganizes the owners that produce them.
The family names below are the minimum V26 full-canon carriers even before promotion.

### Exact proof-family inventory matrix

| proofFamily | proofArtifactPath | memberIds | theoremIds | replayStepIds | witnessArtifactPaths | Current source basis |
| --- | --- | --- | --- | --- | --- | --- |
| inference-synthesis | `.bitcode/inference-synthesis-proof.json` | moment-contract-closure, inference-payload-closure, implementation-surface-closure, parsed-envelope-consistency | inference_synthesis.contract_closure, inference_synthesis.payload_closure, inference_synthesis.parsed_envelope_consistency | inference-synthesis.moment-contracts, inference-synthesis.payload-replay, inference-synthesis.parsed-envelope-replay | `.bitcode/inference-moment-contracts.json`, `.bitcode/inference-proofs.json`, `.bitcode/prompt-implementation-surface.json`, `.bitcode/parsed-completion-envelopes.json`, `.bitcode/inference-synthesis-proof.json` | `protocol-demonstration/src/canonical/evaluation-materialization.js`, `protocol-demonstration/src/canonical/proof-materialization.js` |
| prompt-completeness | `.bitcode/prompt-completeness-proof.json` | member-set-reconciliation, parse-admissibility, consumer-closure, provenance-truth | prompt_completeness.member_set_reconciliation, prompt_completeness.consumer_closure, prompt_completeness.provenance_truth | prompt-completeness.member-set-reconciliation, prompt-completeness.parse-admissibility, prompt-completeness.consumer-closure, prompt-completeness.provenance-truth | `.bitcode/prompt-family-registry.json`, `.bitcode/prompt-contracts.json`, `.bitcode/prompt-surfaces.json`, `.bitcode/prompt-completeness-proof.json` | `protocol-demonstration/src/canonical/prompting.js`, `protocol-demonstration/src/canonical/proof-materialization.js` |
| static-code-analysis | `.bitcode/static-measurement-proof.json` | stage-domain, stage-mapping, receipt-report-proof | static_code_analysis.stage_domain_purity, static_code_analysis.stage_mapping_closure, static_code_analysis.receipt_report_proof | static-code-analysis.stage-domain, static-code-analysis.stage-mapping, static-code-analysis.receipt-report-proof | `.bitcode/code-analysis-fact-registry.json`, `.bitcode/static-heuristics-registry.json`, `.bitcode/measurement-receipts.json`, `.bitcode/static-measurement-report.json`, `.bitcode/static-measurement-proof.json` | `protocol-demonstration/src/bitcode-demo.js`, `protocol-demonstration/src/canonical/proof-materialization.js` |
| verification-decisions | `.bitcode/verification-decisions-proof.json` | issuance-closure, provenance-closure, sufficiency-closure, issuer-policy-closure | verification_decisions.issuance_closure, verification_decisions.provenance_closure, verification_decisions.sufficiency_closure, verification_decisions.issuer_policy_closure | verification-decisions.stage-mapping, verification-decisions.use-tier-consequence | `.bitcode/verification-report.json`, `.bitcode/verification-receipts.json`, `.bitcode/verification-decisions-proof.json` | `protocol-demonstration/src/bitcode-demo.js`, `protocol-demonstration/src/canonical/proof-materialization.js` |
| selection-and-materialization | `.bitcode/selection-and-materialization-proof.json` | selected-asset-closure, lock-closure, materialized-source-closure, exclusion-closure, visibility-closure | selection_and_materialization.selected_asset_closure, selection_and_materialization.lock_closure, selection_and_materialization.materialized_source_closure, selection_and_materialization.exclusion_closure, selection_and_materialization.visibility_closure | selection-and-materialization.selected-set, selection-and-materialization.visibility | `.bitcode/asset-pack.lock.json`, `.bitcode/selected-source-material.json`, `.bitcode/selection-consistency-proof.json`, `.bitcode/materialization-proof.json`, `.bitcode/materialization-exclusions.json`, `.bitcode/materialization-visibility-proof.json`, `.bitcode/selection-and-materialization-proof.json` | `protocol-demonstration/src/bitcode-demo.js`, `protocol-demonstration/src/canonical/proof-materialization.js` |
| authorization-and-sensitive-flow | `.bitcode/authorization-and-sensitive-flow-proof.json` | identity-closure, authorization-closure, sensitive-flow-closure, policy-release-closure | authorization_and_sensitive_flow.identity_closure, authorization_and_sensitive_flow.authorization_closure, authorization_and_sensitive_flow.sensitive_flow_closure, authorization_and_sensitive_flow.policy_release_closure | authorization-and-sensitive-flow.identity-bindings, authorization-and-sensitive-flow.sensitive-flow | `.bitcode/identity-bindings.json`, `.bitcode/authorization-decisions.json`, `.bitcode/sensitive-data-flow.json`, `.bitcode/identity-authorization-proof.json`, `.bitcode/sensitive-data-flow-proof.json`, `.bitcode/authorization-and-sensitive-flow-proof.json` | `protocol-demonstration/src/bitcode-demo.js`, `protocol-demonstration/src/canonical/proof-materialization.js`, `packages/auth` |
| settlement-source-to-shares | `.bitcode/settlement-source-to-shares-proof.json` | contribution-totality, clipping-determinism, normalization-exactness, participation-totality, allocation-conservation, journal-completeness | settlement_source_to_shares.contribution_totality, settlement_source_to_shares.normalization_exactness, settlement_source_to_shares.allocation_conservation, settlement_source_to_shares.journal_completeness | settlement-source-to-shares.contribution-allocation, settlement-source-to-shares.journal-theorem | `.bitcode/source-to-shares.json`, `.bitcode/settlement-participation.json`, `.bitcode/accounting-precision-report.json`, `.bitcode/journal-diff.json`, `.bitcode/journal-completeness-proof.json`, `.bitcode/settlement-proof.json`, `.bitcode/settlement-source-to-shares-proof.json` | `protocol-demonstration/src/canonical/settlement.js`, `protocol-demonstration/src/canonical/proof-materialization.js` |
| disclosure-boundary | `.bitcode/disclosure-boundary-proof.json` | projection-policy-closure, bounded-public-closure, redaction-alignment, disclosure-verdict-alignment | disclosure_boundary.projection_policy_closure, disclosure_boundary.redaction_alignment, disclosure_boundary.disclosure_verdict_alignment | disclosure-boundary.policy-bounded-public, disclosure-boundary.redaction-disclosure | `.bitcode/projection-policy.json`, `.bitcode/bounded-public-proof.json`, `.bitcode/redaction-proof.json`, `.bitcode/disclosure-proof.json`, `.bitcode/disclosure-boundary-proof.json` | `protocol-demonstration/src/bitcode-demo.js`, `protocol-demonstration/src/canonical/proof-materialization.js`, `protocol-demonstration/src/canonical/projections.js` |
| proof-contract | `.bitcode/proof-contract.json` | contract-materialization, evidence-chain, bundle-witness, family-closure | proof_contract.contract_materialization, proof_contract.evidence_chain_closure, proof_contract.bundle_witness, proof_contract.family_closure | proof-contract.contract-materialization, proof-contract.evidence-chain, proof-contract.bundle-witness | `.bitcode/proof-contract.json`, `.bitcode/system-proof-bundle.json`, `.bitcode/proof-witness-manifest.json` | `protocol-demonstration/src/bitcode-demo.js`, `protocol-demonstration/src/canonical/run-artifacts.js`, `protocol-demonstration/src/canonical/proof-materialization.js` |

### Inference-synthesis

- `proofArtifactPath:` `.bitcode/inference-synthesis-proof.json`
- `members:` `moment-contract-closure`, `inference-payload-closure`, `implementation-surface-closure`, `parsed-envelope-consistency`
- `theoremIds:` `inference_synthesis.contract_closure`, `inference_synthesis.payload_closure`, `inference_synthesis.parsed_envelope_consistency`
- `replayStepIds:` `inference-synthesis.moment-contracts`, `inference-synthesis.payload-replay`, `inference-synthesis.parsed-envelope-replay`
- `witnessArtifactPaths:` `.bitcode/inference-moment-contracts.json`, `.bitcode/inference-proofs.json`, `.bitcode/prompt-implementation-surface.json`, `.bitcode/parsed-completion-envelopes.json`, `.bitcode/inference-synthesis-proof.json`
- `current member closure criteria:` all moment contracts, inference payloads, implementation surfaces, and parsed envelopes resolve to the same need and prompt lineage even when the application owner changes.
- `current member verdict shape:` per-member pass/fail verdict with witness artifact refs, replay step refs, and failure reasons.
- `current theorem-by-theorem closure reading:` each theorem closes only when the same witness set supports contract, payload, and parsed-envelope coherence.
- `current theorem-to-replay grouping:` contract lineage groups under `moment-contracts`; payload and parsed-envelope coherence group under `payload-replay` and `parsed-envelope-replay`.
- `minimum artifact/replay binding set:` the listed witnessArtifactPaths plus the three replayStepIds are mandatory.
- `current proof-object fields:` `proofFamily`, `proofHash`, `members`, `theoremVerdicts`, `artifactBindings`, `replayCatalog`, `failureReasons`.
- `generated-artifact and test bindings:` rendered into `BITCODE_SPEC_V26_PROVEN.md` family details and exercised by core, API, and package extraction validation.
- `fail-closed conditions:` missing inference proofs, prompt implementation drift, or parsed-envelope inconsistency fail closed.

### Prompt-completeness

- `proofArtifactPath:` `.bitcode/prompt-completeness-proof.json`
- `members:` `member-set-reconciliation`, `parse-admissibility`, `consumer-closure`, `provenance-truth`
- `theoremIds:` `prompt_completeness.member_set_reconciliation`, `prompt_completeness.consumer_closure`, `prompt_completeness.provenance_truth`
- `replayStepIds:` `prompt-completeness.member-set-reconciliation`, `prompt-completeness.parse-admissibility`, `prompt-completeness.consumer-closure`, `prompt-completeness.provenance-truth`
- `witnessArtifactPaths:` `.bitcode/prompt-family-registry.json`, `.bitcode/prompt-contracts.json`, `.bitcode/prompt-surfaces.json`, `.bitcode/prompt-completeness-proof.json`
- `current member closure criteria:` every prompt family declared for the run is registered, surfaced, consumed, provenance-bound, and exposed through the application-native operator experience without semantic loss.
- `current member verdict shape:` per-member pass/fail verdict with artifact refs, replay refs, and completeness failure reasons.
- `current theorem-by-theorem closure reading:` theorem closure requires family registry, contract, surface, and consumer closure to agree.
- `current theorem-to-replay grouping:` completeness groups across reconciliation, parse admissibility, consumer closure, and provenance truth.
- `minimum artifact/replay binding set:` the listed prompt artifacts and replay steps are mandatory.
- `current proof-object fields:` `proofFamily`, `proofHash`, `members`, `theoremVerdicts`, `artifactBindings`, `replayCatalog`, `failureReasons`.
- `generated-artifact and test bindings:` emitted as proof and rendered into generated proof-family inventory and theorem listings.
- `fail-closed conditions:` prompt contract incompleteness, missing surface coverage, or provenance mismatch fail closed.

### Static-code-analysis

- `proofArtifactPath:` `.bitcode/static-measurement-proof.json`
- `members:` `stage-domain`, `stage-mapping`, `receipt-report-proof`
- `theoremIds:` `static_code_analysis.stage_domain_purity`, `static_code_analysis.stage_mapping_closure`, `static_code_analysis.receipt_report_proof`
- `replayStepIds:` `static-code-analysis.stage-domain`, `static-code-analysis.stage-mapping`, `static-code-analysis.receipt-report-proof`
- `witnessArtifactPaths:` `.bitcode/code-analysis-fact-registry.json`, `.bitcode/static-heuristics-registry.json`, `.bitcode/measurement-receipts.json`, `.bitcode/static-measurement-report.json`, `.bitcode/static-measurement-proof.json`
- `current member closure criteria:` static facts, heuristics, receipts, and reports must reconcile to the same extracted code analysis domain regardless of whether the owner is still demo-local or has moved to packages.
- `current member verdict shape:` per-member pass/fail verdict with receipt refs, report refs, and failure reasons.
- `current theorem-by-theorem closure reading:` theorem closure requires domain purity, stage mapping coherence, and report proof coherence.
- `current theorem-to-replay grouping:` stage purity groups under `stage-domain`; mapping and report closure group under `stage-mapping` and `receipt-report-proof`.
- `minimum artifact/replay binding set:` measurement receipts, analysis registries, report, and proof are mandatory.
- `current proof-object fields:` `proofFamily`, `proofHash`, `members`, `theoremVerdicts`, `artifactBindings`, `replayCatalog`, `failureReasons`.
- `generated-artifact and test bindings:` surfaced in proof-family reports and exercised by core tests and specification quality checks.
- `fail-closed conditions:` measurement receipt absence or report and replay mismatch fail closed.

### Verification-decisions

- `proofArtifactPath:` `.bitcode/verification-decisions-proof.json`
- `members:` `issuance-closure`, `provenance-closure`, `sufficiency-closure`, `issuer-policy-closure`
- `theoremIds:` `verification_decisions.issuance_closure`, `verification_decisions.provenance_closure`, `verification_decisions.sufficiency_closure`, `verification_decisions.issuer_policy_closure`
- `replayStepIds:` `verification-decisions.stage-mapping`, `verification-decisions.use-tier-consequence`
- `witnessArtifactPaths:` `.bitcode/verification-report.json`, `.bitcode/verification-receipts.json`, `.bitcode/verification-decisions-proof.json`
- `current member closure criteria:` verification report, receipts, and issued decision families must reconcile to the same selected candidates and use-tier outcomes across package, API, and application layers.
- `current member verdict shape:` per-member pass/fail verdict with receipt refs and theorem refs.
- `current theorem-by-theorem closure reading:` issuance, provenance, sufficiency, and issuer-policy all require coherent receipt-backed verification results.
- `current theorem-to-replay grouping:` stage mapping and use-tier consequence replay cover all verification theorems.
- `minimum artifact/replay binding set:` verification report, verification receipts, proof artifact, and both replay steps are mandatory.
- `current proof-object fields:` `proofFamily`, `proofHash`, `members`, `theoremVerdicts`, `artifactBindings`, `replayCatalog`, `failureReasons`.
- `generated-artifact and test bindings:` rendered into the generated proof appendix and exercised by workflow tests and app-route integration checks.
- `fail-closed conditions:` missing verification receipts or contradictory decisions fail closed.

### Selection-and-materialization

- `proofArtifactPath:` `.bitcode/selection-and-materialization-proof.json`
- `members:` `selected-asset-closure`, `lock-closure`, `materialized-source-closure`, `exclusion-closure`, `visibility-closure`
- `theoremIds:` `selection_and_materialization.selected_asset_closure`, `selection_and_materialization.lock_closure`, `selection_and_materialization.materialized_source_closure`, `selection_and_materialization.exclusion_closure`, `selection_and_materialization.visibility_closure`
- `replayStepIds:` `selection-and-materialization.selected-set`, `selection-and-materialization.visibility`
- `witnessArtifactPaths:` `.bitcode/asset-pack.lock.json`, `.bitcode/selected-source-material.json`, `.bitcode/selection-consistency-proof.json`, `.bitcode/materialization-proof.json`, `.bitcode/materialization-exclusions.json`, `.bitcode/materialization-visibility-proof.json`, `.bitcode/selection-and-materialization-proof.json`
- `current member closure criteria:` selected assets, locked pack, materialized sources, exclusions, and visibility summaries must all agree and remain faithfully exposed through the application-native operator route.
- `current member verdict shape:` per-member pass/fail verdict with witness refs and selection consistency reasons.
- `current theorem-by-theorem closure reading:` theorem closure requires both selected-set and visibility replay to agree with materialized outputs.
- `current theorem-to-replay grouping:` selection theorems group under `selected-set`; visibility and exclusion theorems group under `visibility`.
- `minimum artifact/replay binding set:` lock, selected-source manifest, materialization proof, exclusions, visibility proof, and replay steps are mandatory.
- `current proof-object fields:` `proofFamily`, `proofHash`, `members`, `theoremVerdicts`, `artifactBindings`, `replayCatalog`, `failureReasons`.
- `generated-artifact and test bindings:` generated proof appendix, branch artifact inventory, and end-to-end Bitcode route expectations.
- `fail-closed conditions:` materialization without selected-set closure or unexplained exclusions fail closed.

### Authorization-and-sensitive-flow

- `proofArtifactPath:` `.bitcode/authorization-and-sensitive-flow-proof.json`
- `members:` `identity-closure`, `authorization-closure`, `sensitive-flow-closure`, `policy-release-closure`
- `theoremIds:` `authorization_and_sensitive_flow.identity_closure`, `authorization_and_sensitive_flow.authorization_closure`, `authorization_and_sensitive_flow.sensitive_flow_closure`, `authorization_and_sensitive_flow.policy_release_closure`
- `replayStepIds:` `authorization-and-sensitive-flow.identity-bindings`, `authorization-and-sensitive-flow.sensitive-flow`
- `witnessArtifactPaths:` `.bitcode/identity-bindings.json`, `.bitcode/authorization-decisions.json`, `.bitcode/sensitive-data-flow.json`, `.bitcode/identity-authorization-proof.json`, `.bitcode/sensitive-data-flow-proof.json`, `.bitcode/authorization-and-sensitive-flow-proof.json`
- `current member closure criteria:` identity, authorization, wallet, and sensitive-flow artifacts must reconcile to the same policy and addressing roots.
- `current member verdict shape:` per-member pass/fail verdict with policy refs and witness refs.
- `current theorem-by-theorem closure reading:` theorem closure requires identity, authorization, wallet verification, and sensitive-data flow to agree without leakage.
- `current theorem-to-replay grouping:` identity closure groups under `identity-bindings`; flow and release closure group under `sensitive-flow`.
- `minimum artifact/replay binding set:` identity bindings, authorization decisions, sensitive-data flow, and both replay steps are mandatory.
- `current proof-object fields:` `proofFamily`, `proofHash`, `members`, `theoremVerdicts`, `artifactBindings`, `replayCatalog`, `failureReasons`.
- `generated-artifact and test bindings:` generated proof appendix and authorization, wallet, and disclosure tests.
- `fail-closed conditions:` authorization denial, stale policy roots, stale wallet verification, or sensitive-flow mismatch fail closed.

### Settlement-source-to-shares

- `proofArtifactPath:` `.bitcode/settlement-source-to-shares-proof.json`
- `members:` `contribution-totality`, `clipping-determinism`, `normalization-exactness`, `participation-totality`, `allocation-conservation`, `journal-completeness`
- `theoremIds:` `settlement_source_to_shares.contribution_totality`, `settlement_source_to_shares.normalization_exactness`, `settlement_source_to_shares.allocation_conservation`, `settlement_source_to_shares.journal_completeness`
- `replayStepIds:` `settlement-source-to-shares.contribution-allocation`, `settlement-source-to-shares.journal-theorem`
- `witnessArtifactPaths:` `.bitcode/source-to-shares.json`, `.bitcode/settlement-participation.json`, `.bitcode/accounting-precision-report.json`, `.bitcode/journal-diff.json`, `.bitcode/journal-completeness-proof.json`, `.bitcode/settlement-proof.json`, `.bitcode/settlement-source-to-shares-proof.json`
- `current member closure criteria:` contributions, participation, exact BTD allocation, journals, and settlement proof must reconcile.
- `current member verdict shape:` per-member pass/fail verdict with artifact refs, theorem refs, and conservation failure reasons.
- `current theorem-by-theorem closure reading:` theorem closure requires contribution totality, normalization exactness, conservation, and journal completeness to agree.
- `current theorem-to-replay grouping:` allocation theorems group under `contribution-allocation`; journal theorems group under `journal-theorem`.
- `minimum artifact/replay binding set:` the full settlement artifact set and both replay steps are mandatory.
- `current proof-object fields:` `proofFamily`, `proofHash`, `members`, `theoremVerdicts`, `artifactBindings`, `replayCatalog`, `failureReasons`.
- `generated-artifact and test bindings:` active settlement appendix renderings and core and workflow settlement tests.
- `fail-closed conditions:` settlement conservation drift or journal incompleteness fail closed.

### Disclosure-boundary

- `proofArtifactPath:` `.bitcode/disclosure-boundary-proof.json`
- `members:` `projection-policy-closure`, `bounded-public-closure`, `redaction-alignment`, `disclosure-verdict-alignment`
- `theoremIds:` `disclosure_boundary.projection_policy_closure`, `disclosure_boundary.redaction_alignment`, `disclosure_boundary.disclosure_verdict_alignment`
- `replayStepIds:` `disclosure-boundary.policy-bounded-public`, `disclosure-boundary.redaction-disclosure`
- `witnessArtifactPaths:` `.bitcode/projection-policy.json`, `.bitcode/bounded-public-proof.json`, `.bitcode/redaction-proof.json`, `.bitcode/disclosure-proof.json`, `.bitcode/disclosure-boundary-proof.json`
- `current member closure criteria:` projection policy, bounded-public proof, redaction, and disclosure verdicts must remain coherent per principal across packages, API, app, and marketing-facing surfaces.
- `current member verdict shape:` per-member pass/fail verdict with witness refs and leakage reasons.
- `current theorem-by-theorem closure reading:` theorem closure requires policy, redaction, and disclosure surfaces to agree without public overexposure.
- `current theorem-to-replay grouping:` policy closure groups under `policy-bounded-public`; redaction and disclosure theorems group under `redaction-disclosure`.
- `minimum artifact/replay binding set:` projection policy, bounded-public proof, redaction proof, disclosure proof, and both replay steps are mandatory.
- `current proof-object fields:` `proofFamily`, `proofHash`, `members`, `theoremVerdicts`, `artifactBindings`, `replayCatalog`, `failureReasons`.
- `generated-artifact and test bindings:` disclosure appendix renderings and API, route, and projection tests.
- `fail-closed conditions:` public projection overexposure or redaction mismatch fail closed.

### Proof-contract

- `proofArtifactPath:` `.bitcode/proof-contract.json`
- `members:` `contract-materialization`, `evidence-chain`, `bundle-witness`, `family-closure`
- `theoremIds:` `proof_contract.contract_materialization`, `proof_contract.evidence_chain_closure`, `proof_contract.bundle_witness`, `proof_contract.family_closure`
- `replayStepIds:` `proof-contract.contract-materialization`, `proof-contract.evidence-chain`, `proof-contract.bundle-witness`
- `witnessArtifactPaths:` `.bitcode/proof-contract.json`, `.bitcode/system-proof-bundle.json`, `.bitcode/proof-witness-manifest.json`
- `current member closure criteria:` proof contract, bundle, and witness manifest must agree over all included proof families while owners move from demo-local to package and app surfaces.
- `current member verdict shape:` per-member pass/fail verdict with witness refs and missing-family reasons.
- `current theorem-by-theorem closure reading:` theorem closure requires contract materialization, evidence chain integrity, and witness manifest coherence.
- `current theorem-to-replay grouping:` contract and evidence theorems group under `contract-materialization` and `evidence-chain`; witness closure groups under `bundle-witness`.
- `minimum artifact/replay binding set:` proof contract, system proof bundle, witness manifest, and three replay steps are mandatory.
- `current proof-object fields:` `proofFamily`, `proofHash`, `members`, `theoremVerdicts`, `artifactBindings`, `replayCatalog`, `failureReasons`.
- `generated-artifact and test bindings:` generated proof appendix plus proof generator and family report checks.
- `fail-closed conditions:` missing witness artifacts, missing family coverage, bundle incoherence, or stale promoted status truth fail closed.

## generated canon

### Inherited V19 reproducible-canon artifacts

V26 inherits the V19 reproducible-canon baseline as active generated evidence requirements for reproducibility, replay, and mutation visibility.

### Inherited V20 operator-quality artifacts

V26 inherits the V20 operator-quality baseline as active generated evidence requirements for operator quality, accessibility, performance, and projection sanity.

### Exact generated-artifact inventory matrix

Current V26 generated artifact inventories must cover:
- active inherited reproducible and operator-quality reports,
- `.bitcode/v26-spec-family-report.json`,
- `.bitcode/v26-canonical-input-report.json`,
- any future `.bitcode/v26-canon-posture-drift-report.json` if V26 reopens posture-drift generation,
- and `BITCODE_SPEC_V26_PROVEN.md`.

### V26 specifying generated artifacts

V26 specifying artifacts are:
- `.bitcode/v26-spec-family-report.json`
- `.bitcode/v26-canonical-input-report.json`
- `BITCODE_SPEC_V26_PROVEN.md`

### Shared generated-artifact fields

Shared generated-artifact fields must include version, proof-source commit, generation timestamp, target version, active pointer, structural verdict, and fail-closed reasons when not clean.

### Artifact-specific generated payload fields

Artifact-specific generated payload fields must include the structural report payload, canonical input report payload, and promoted appendix payload with exact family and run inventories.

### Artifact confidentiality and disclosability taxonomy

Generated artifacts are bounded-public unless they embed private witness inventories; generated proofs that expose private witnessArtifactPaths remain private-proof artifacts.

### Minimum generated appendix rendered contents

The promoted appendix must include:
- aggregate proof verdict,
- exact proof-family inventory,
- exact per-family member inventory,
- exact per-family theorem inventory,
- exact replay-step inventories and theorem bindings,
- witness artifact inventories,
- generated artifact inventories,
- scenario and run coverage matrices,
- proof-source commit,
- and fail closed when generated evidence is stale, missing, or inconsistent.

### Canonical regeneration and fail-closed posture

Canonical regeneration must fail closed when:
- the generated appendix is stale,
- the family report is stale,
- the canonical input report is stale,
- the pointer and target disagree,
- generated artifacts are used to compensate for missing main-spec meaning,
- or V26 draft claims exceed the generated evidence that actually exists.

## validation canon

The V26 validation canon includes:
- host-agnostic local pre-commit checks for spec-sensitive changes,
- strict versioned spec conformance for `spec: V26` commit titles,
- core, API, workflow, browser, and route integration tests,
- package extraction and ownership regression tests,
- auth and wallet validation,
- environment-mode matrix tests for production, staging, development, and mock,
- containerized CI or CD runs of strict spec conformance and full runtime tests,
- and promotion-time regeneration plus cleanliness checks.

Current validating commands and parity basis include:
- `node scripts/check-bitcode-canonical-inputs.mjs`
- `node scripts/check-bitcode-spec-family.mjs --version V26`
- `node scripts/run-bitcode-spec-quality.mjs --mode basic`
- `node --test protocol-demonstration/test/core.test.js`
- `node --test protocol-demonstration/test/api.test.js`
- `node --test protocol-demonstration/test/workflow.integration.test.js`
- `node --test protocol-demonstration/test/e2e.test.js`
- `node --test protocol-demonstration/test/v21-specifying.test.js protocol-demonstration/test/v22-canon-drift.test.js`

## promotion canon

V26 promotion requires all of the following:
- `BITCODE_SPEC.txt` advancing deliberately and only when V26 is the chosen active canon,
- `BITCODE_SPEC_V26.md`, `BITCODE_SPEC_V26_DELTA.md`, `BITCODE_SPEC_V26_PARITY_MATRIX.md`, and `BITCODE_SPEC_V26_PROVEN.md` agreeing,
- `.bitcode/v26-spec-family-report.json`, `.bitcode/v26-canonical-input-report.json`, and `.bitcode/v26-gate-checkpoint-report.json` existing and matching the promoted V26 structure,
- Bitcode application-native routing existing as source truth rather than as draft-target-only prose,
- package extraction and existing-package convergence being reflected in source sufficiently to satisfy the parity ledger,
- and no fail-closed condition remaining open for any interface V26 claims as hardened.

## appendices and canonical supporting material

The appendices in this main `SPEC` are part of canonical system meaning and are not optional supplements.

## Appendix A. Canonical type and surface catalog

The canonical type and surface catalog includes:
- run identity, need identity, deposit identity, bundle identity, projection principal, and settlement identity,
- BTD-denominated share and micro-unit carriers,
- public and private commitment-scope carriers,
- application-route and operator-surface carriers,
- bitcoin mainchain execution carriers,
- sidechain execution carriers,
- repeated-read payment carriers,
- compute-container execution carriers,
- storage-container publication and retrieval carriers,
- GitHub App, session, fetch, and mutation carriers,
- wallet and auth binding carriers,
- telemetry-policy and telemetry-summary carriers,
- proof-family objects, theorem verdicts, replay catalogs, and witness inventories.

## Appendix B. Proof family closure catalog

The proof family closure catalog in V26 contains:
- Inference-synthesis
- Prompt-completeness
- Static-code-analysis
- Verification-decisions
- Selection-and-materialization
- Authorization-and-sensitive-flow
- Settlement-source-to-shares
- Disclosure-boundary
- Proof-contract

Each family closes only when its witnessArtifactPaths, theoremIds, replayStepIds, and artifact bindings all reconcile.

## Appendix C. Generated artifact contract catalog

The generated artifact contract catalog covers:
- inherited reproducible-canon and operator-quality reports,
- `.bitcode/v26-spec-family-report.json`,
- `.bitcode/v26-canonical-input-report.json`,
- and `BITCODE_SPEC_V26_PROVEN.md`.

These generated artifact inventories must include generated artifact inventories and scenario and run coverage matrices and must fail closed when regeneration is stale.

## Appendix D. Validation and checking gate catalog

The validation and checking gate catalog includes:
- local pre-commit checks for host-agnostic basics,
- strict version and commit-title spec conformance,
- runtime, API, workflow, browser, and application-route tests,
- package extraction and auth or wallet hardening checks,
- containerized CI or CD full suites,
- promotion-time regeneration checks,
- and clean-environment promotion validation.

## Appendix E. Current canonical source map

The current canonical source map includes:
- `protocol-demonstration/src/canon-posture.js`
- `protocol-demonstration/src/bitcode-demo.js`
- `protocol-demonstration/src/canonical/run-artifacts.js`
- `protocol-demonstration/src/canonical/proof-materialization.js`
- `protocol-demonstration/src/canonical/settlement.js`
- `protocol-demonstration/src/canonical/projections.js`
- `protocol-demonstration/src/canonical/prompting.js`
- `protocol-demonstration/src/canonical/evaluation-materialization.js`
- `protocol-demonstration/src/canonical/need-measurement.js`
- `protocol-demonstration/src/canonical/v23-bitcoin.js`
- `protocol-demonstration/src/canonical/v24-external-realization.js`
- `protocol-demonstration/src/demo-shell-state.js`
- `protocol-demonstration/public/app.js`
- `protocol-demonstration/public/styles.css`
- `protocol-demonstration/server.js`
- `protocol-demonstration/test/*`
- `uapi/app/application/page.tsx`
- `uapi/app/application/ApplicationPageClient.tsx`
- `uapi/app/application/first-gate-styles/route.ts`
- `uapi/app/api/state/route.ts`
- `uapi/app/api/deposits/route.ts`
- `uapi/app/api/make-bitcode-branch/route.ts`
- `uapi/app/api/reset/route.ts`
- `uapi/app/api/bitcoin-demonstration-service/route.ts`
- `uapi/app/api/auxillaries/data/route.ts`
- `uapi/app/api/v24/external-realization/route.ts`
- `uapi/app/api/v24/executors/[interfaceId]/route.ts`
- `uapi/lib/bitcode-app-context.ts`
- `uapi/app/(root)/components/MarketingLandingPage.tsx`
- `uapi/app/(root)/components/PublicShellFrame.tsx`
- `uapi/app/(root)/components/MarketingOperatorGuideCard.tsx`
- `uapi/app/demo-video/page.tsx`
- `uapi/components/base/bitcode/layout/nav.tsx`
- `uapi/components/base/bitcode/layout/NavBrand.tsx`
- `uapi/components/base/bitcode/layout/footer.tsx`
- `uapi/components/base/bitcode/layout/bitcode-public-copy.ts`
- `uapi/components/base/README.md`
- `packages/github`
- `packages/auth`
- `packages/api`
- `scripts/check-bitcode-canonical-inputs.mjs`
- `scripts/check-bitcode-spec-family.mjs`

## Appendix F. Subsystem totality and derivability matrix

The subsystem totality and derivability matrix explicitly covers:
- repo supply and depositing
- needing and measured demand
- prompt/inference/evaluator ownership
- depositing-to-needing fit
- recall and ranking
- verification decisions
- selection and materialization
- branch artifacts and deliverables
- identity, authority, signing, and policy
- sensitive data and confidentiality flows
- projection, disclosure, and redaction
- proof families, members, theorems, witnesses, and replay
- settlement, source-to-shares, journals, and exact accounting
- telemetry, persistence, state, and failure semantics
- host/runtime capability truth
- operator experience and pedagogy
- validation and test stack
- generated artifacts and canonical promotion
- bitcoin mainchain execution
- sidechain execution
- repeated-read payment execution
- compute-container execution
- storage-container execution
- github live interface
- auth and wallet connection
- application-route integration
- marketing and navigation routing
- package extraction and repository ownership

Every one of those subsystems must be derivable from the main `SPEC`, its appendices, and the active generated appendix after promotion.

## Appendix G. Canonical file-family and promotion contract catalog

The canonical file-family and promotion contract catalog includes:
- `BITCODE_SPEC.txt`
- `BITCODE_SPEC_V26.md`
- `BITCODE_SPEC_V26_DELTA.md`
- `BITCODE_SPEC_V26_PARITY_MATRIX.md`
- `BITCODE_SPEC_V26_NOTES.md`
- `BITCODE_SPEC_V26_PROVEN.md`
- `.bitcode/v26-spec-family-report.json`
- `.bitcode/v26-canonical-input-report.json`

Promotion requires the pointer, posture, generated reports, `_PROVEN_` appendix, and source parity state to agree.

## Appendix H. Operator surface and quality contract catalog

The operator surface and quality contract catalog includes:
- full-page Bitcode application routing,
- application-facing component ownership under `uapi/components/base/*`,
- operator explanation surfaces for supply, need, fit, verification, proof, and settlement,
- projection summaries and proof inspection views,
- settlement preview and audit views,
- telemetry summaries,
- accessibility, performance, and projection quality expectations,
- and operator-facing error posture for fail-closed conditions.

## Appendix I. Scenario, workflow, and cross-product contract catalog

The scenario, workflow, and cross-product contract catalog includes:
- `auth-issuer-rollback`
- `privacy-boundary-proof-export`
- `polyglot-gateway-benchmark-remediation`
- `auth-many-asset-normalization`
- `Targeted deposit`
- `Normalization deposit`
- `patch`
- `context`
- `public`
- `buyer`
- `reviewer`
- `internal`
- `Openly writable`
- `Measurably readable`
- `Provable`
- `Valuable`

V26 also crosses those scenarios over:
- `production`
- `staging`
- `development`
- `mock`

## Appendix J. Fail-closed contract and error posture matrix

The fail-closed contract and error posture matrix includes:
- `invalid deposit`
- `prompt contract incompleteness`
- `parsed-envelope inadmissibility`
- `no-survivor asset pack`
- `authorization denial`
- `public projection overexposure`
- `settlement conservation drift`
- `stale promoted status truth`
- `application-route ownership drift`
- `wallet verification drift`
- `package extraction parity drift`
- `standalone-demo posture regression`

Every named failure class is blocking for promotion when it applies to a claimed realized interface.

## Appendix K. Source-bearing deliverable and artifact contract catalog

The source-bearing deliverable and artifact contract catalog includes:
- `.bitcode/asset-pack.lock.json`
- `.bitcode/selected-source-material.json`
- `.bitcode/verification-report.json`
- `.bitcode/source-to-shares.json`
- `.bitcode/projection-policy.json`
- `.bitcode/system-proof-bundle.json`
- `.bitcode/proof-contract.json`
- `.bitcode/proof-witness-manifest.json`
- `.bitcode/inference-synthesis-proof.json`
- `.bitcode/prompt-completeness-proof.json`
- `.bitcode/static-measurement-proof.json`
- `.bitcode/verification-decisions-proof.json`
- `.bitcode/selection-and-materialization-proof.json`
- `.bitcode/authorization-and-sensitive-flow-proof.json`
- `.bitcode/settlement-source-to-shares-proof.json`
- `.bitcode/disclosure-boundary-proof.json`
- `.bitcode/v26-spec-family-report.json`
- `.bitcode/v26-canonical-input-report.json`
- `BITCODE_SPEC_V26_PROVEN.md`

## accepted boundaries and reopen conditions

V26 accepts the following boundaries after through-fourth-gate promotion:
- V26 is active canonical truth while fifth-gate proof/finalization remains open.
- The useful Bitcode operator UX chain is preserved while the demonstration UI owner is replaced.
- Package extraction may proceed incrementally so long as parity truth keeps the gap explicit.
- Existing packages should be reused when they already fit the responsibility.
- No current source-bearing claim relies on `_legacy/`.

The following reopen conditions apply:
- if the chosen application route class proves wrong in source,
- if the extraction matrix requires materially different package topology,
- if auth, wallet, GitHub, or external hardening requirements force a broader or narrower version center,
- if a compatibility-carrier migration becomes central enough to require its own explicit restatement,
- or if generated evidence and source truth diverge during promotion work.

## completion condition

V26 is complete only when:
1. V26-active discipline is preserved until deliberate V27 drafting and later promotion.
2. The four V26 workstreams are explicitly present in the promoted canon and reflected in source.
3. The Bitcode operator experience is a first-class application page rather than an embedded or standalone-primary demo.
4. Demonstration UX is preserved while demonstration UI is replaced by application-facing components.
5. Bitcode system ownership is materially re-homed into packages and app/API owners rather than remaining concentrated in the former top-level demo owner.
6. GitHub, auth, wallet, bitcoin, sidechain, repeated-read, compute, storage, telemetry, and reconciliation hardening are explicit, fail-closed, and test-backed.
7. `.bitcode/v26-spec-family-report.json`, `.bitcode/v26-canonical-input-report.json`, `.bitcode/v26-gate-checkpoint-report.json`, and `BITCODE_SPEC_V26_PROVEN.md` exist and agree with the promoted V26 main spec.
8. The promoted V26 main spec stands alone for re-implementation, audit, operator comprehension, and promotion without semantic dependence on prior versions.
