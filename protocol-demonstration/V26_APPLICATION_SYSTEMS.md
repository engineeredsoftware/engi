# V26 Application Systems

## Status

- Scope: non-canonical supplementary system document for the V26 Bitcode application architecture
- Canonical pointer: `/Users/garrettmaring/Developer/ENGI/BITCODE_SPEC.txt -> V26`
- Next draft target: `BITCODE_SPEC_V27.md` (not yet opened)
- Purpose: give a fuller modular architecture view than the canon should carry line-by-line while V26 converges the application, overlay systems, retained package owners, and storage/persistence ownership

## Rule

This file is not canonical system truth.
Canonical V26 truth lives only in the active `BITCODE_SPEC_V26*` family.
This document exists to keep the repository’s modular architecture legible while the V26 productionizing pass lands.
V26 remains the active canon, but earlier through-fourth-gate promotion claims were overstated. Fourth-gate closure is procedurally reopened while fifth-gate minimum-functional Exchange/Terminal closure plus the broad old-world reform baseline stay active, followed by sixth-gate MVP elevation, seventh-gate commercial testnet refinement, and eighth-gate whole-repository provation.

## Retained old-world reform baseline

Fifth-gate does not permit silent old-world survival on the live Bitcode path.
Every retained pre-Bitcode family must already be one of the following:
- `ingress-only`
  External entry or trigger carriers that can feed Bitcode-owned systems but do not own Exchange state.
- `compatibility-only`
  Narrow exports or aliases kept only to avoid breaking admitted callers while the live Bitcode path converges.
- `reference-only`
  Retained automation/tooling families that may still support bring-up or historical orchestration, but are not the primary Bitcode product model.
- `auxiliary-input`
  Admitted external-context providers that can enrich Bitcode work without becoming Bitcode’s state authority.

Current fifth-gate retained-system classification:

| Retained family | Classification | Fifth-gate boundary |
| --- | --- | --- |
| `uapi/app/api/webhook/{route,verify}.ts` | `ingress-only` | GitHub-triggered automation ingress that may schedule work but does not own Bitcode Exchange reads/writes |
| `packages/pipelines/deliverable/src/run.ts` | `compatibility-only` | legacy path export preserved for admitted callers while canonical Bitcode behavior stays elsewhere |
| `packages/pipelines/deliverable/src/*` retained naming | `compatibility-only` | path/package names like `deliverable`, `deliverableType`, and `comprehend-task` survive only as implementation-speed compatibility carriers while V26 teaches `asset pack`, `written asset`, and `comprehend need`; see `protocol-demonstration/V26_DELIVERABLE_REFORM.md` |
| `packages/generic-agents/vcs/src/index.ts` | `reference-only` | VCS automation helper for retained agentic/pipeline callers, not the Bitcode Terminal repository-state owner |
| `packages/generic-tools/use-computer/src/index.ts` | `reference-only` | shell execution primitive for admitted tooling paths, not Bitcode product state |
| `packages/generic-tools/mcps-tools/jira/src/index.ts` | `reference-only` | Jira integration ingress/reference layer, not Exchange-state ownership |
| `packages/web-search/src/index.ts` | `auxiliary-input` | external search context provider that may enrich admitted interfaces without becoming Bitcode’s source of truth |

## Primary application architecture

V26 centers Bitcode on one primary route:
- `/application`

V26 defines three main Bitcode experiences:
1. `master detail`
2. `conversations`
3. `auxillaries`

V26 defines two main Bitcode actions:
1. `give`
2. `need`

Those map as follows:
- `master detail`
  The application-owned operating workspace for repo supply, measured need, a transactions master surface, transaction detail, deliverables, proofs, and history.
- `conversations`
  The fullscreen chat workspace entered from within `/application`.
- `auxillaries`
  The fullscreen auxillary workspace entered from within `/application`, fixed as `Connects`, `Interfaces`, `Profile`, and `$BTD`.
- `give`
  Repo supply, deposits, authenticated material intake, and actions that place material into the Bitcode chain.
- `need`
  Scenario framing, measured demand, fit pressure, and actions that express what Bitcode is trying to satisfy.

The orbital ring model is fixed for V26:
- `Connects`
  Repository and other connection posture, with the closest retained canonical inner-pane UX/UI.
- `Interfaces`
  Visual, behavioral, and default application posture for transactions, conversations, and related reads.
- `Profile`
  Wallet identity, address, balances, organization roles, multi-sig membership, and authentication posture.
- `$BTD`
  Share information, throughput posture, advanced `$BTD` controls, and `$BTD`-specific master-detail defaults.

Direct auxillary routes should prefer:
- `/auxillaries/profile`
- `/auxillaries/connects`
- `/auxillaries/interfaces`
- `/auxillaries/btd`

Compatibility aliases such as `/orbitals/users`, `/orbitals/models`, and `/orbitals/btd` may survive only as redirect-only convergence carriers into `/auxillaries/*` until later cleanup removes them entirely.

Sixth-gate deepening now has an explicit post-cut-over application target:
- `activity`
  The dominant searchable, filterable, transaction-first master/detail surface for Bitcode activity, with transactions as the primary row type and additional activity classes admitted only where they strengthen the same model.
- `transactions`
  The write-space for Bitcode operations: give, need, need measurement, and transaction creation/materialization.
- `conversations`
  The rich ChatGPT-style read/write Bitcode surface, popup-capable and fullscreen-capable, with tool registration expected to stay aligned to the retained ChatGPT app surface.
- `auxillaries`
  The non-duplicative settings, preferences, connections, identity, and deep wallet/`$BTD` system around the network core rather than a second transaction center.

## Public shell carriers

Third-gate now has one explicit mounted public-shell owner set rather than an implicit marketing backlog:
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

Operational rule:
- the mounted public shell must inherit the same Bitcode-facing operator vocabulary as `/application`
- the mounted public shell must clearly organize itself as `Network`, `Transactions`, `Docs`, and `Auxillaries`
- the mounted public shell must also mount live public-route nav and orbital-entry behavior instead of relying on page-local CTA copy alone
- `/docs` must be the real public teaching surface while `/demo-video` remains a compatibility alias into that docs-owned content
- the mounted public shell must not preserve live `ComingSoon*` owners, `coming-soon-*` stylesheet imports, or dormant access-gate shells once the route is serving as the Bitcode public entry
- the mounted public shell should decompose stabilized landing hero, guide, preview, and shared marketing-shell data into clearer carriers rather than preserving one oversized mixed-surface landing owner
- the mounted public shell should keep core entry links and guest access CTAs directly visible on smaller screens through stacked/wrapped layout rather than introducing another menu-state dependency
- the mounted public terminal preview should present a compact public/mobile summary before exposing the denser operator-grade preview on wider shells
- the mounted landing ambience should suppress orbital rings, pointer glow, and oversized ambient blur on smaller or reduced-motion shells before wider-screen theatrical treatment is shown
- the mounted public footer should present route links as mobile-first cards and protocol/version metadata as explicit chips instead of compressing them into one dense inline strip on smaller shells
- the mounted public shell should use richer shared explainer/help carriers for key entry links and references rather than relying on browser `title` tooltips
- the stable docs walkthrough should resolve one Bitcode-owned guide asset rather than preserving ordered demo-era media compatibility
- the mounted public footer should resolve the walkthrough/docs route through Bitcode-owned route/env ownership rather than legacy `ENGI_DEMO` fallbacks
- the mounted public footer should link protocol spec through the stable canonical pointer rather than a version-specific public spec URL
- the mounted public routes should carry explicit `Bitcode Network`, `Bitcode Docs`, and `Bitcode Transactions` title/brand posture rather than inheriting one global shell title
- stable public entry copy should prefer `Network`, `Transactions`, `Docs`, `Auxillaries`, and give/need teaching posture
- `/docs` should remain the real public teaching surface while `/demo-video` remains a compatibility alias instead of a separate guide product surface
- broader marketing-surface refurbishment can continue later without reopening second-gate operator acceptance

## Master-detail inner structure

Within the master-detail experience, V26 treats these as required substructures:
- `transactions`
- `deliverables`
- `proofs`
- `history`

Current active carriers:
- `uapi/app/application/ApplicationOperatorCard.tsx`
- `uapi/app/application/application-operator-explainers.ts`
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
- `uapi/app/application/ApplicationTransactionDetailActionBar.tsx`
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
- `uapi/app/application/application-transaction-source.ts`
- `uapi/app/application/application-transaction-detail-snapshot.ts`
- `uapi/app/application/application-transaction-detail.ts`
- `uapi/app/application/application-transaction-query.ts`
- `uapi/app/application/application-repository-context.ts`
- `uapi/app/application/application-supply-selection.ts`
- `uapi/app/application/application-transactions.ts`
- `uapi/components/base/bitcode/execution/BitcodeTransactionsTable.tsx`
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
- `uapi/components/base/bitcode/execution/bitcode-transaction-explainers.ts`
- `protocol-demonstration/src/client-entry.js`
- `protocol-demonstration/public/app.js`

## Shared shell bridge provider

Second-gate now centralizes mounted-shell semantic polling and control refresh behind one reusable application bridge.

Current active carriers:
- `uapi/app/application/application-shell-bridge.tsx`
- `protocol-demonstration/src/client-entry.js`
- `protocol-demonstration/public/app.js`

Operational rule:
- route-local second-gate carriers consume one shared shell bridge instead of independently polling the mounted shell
- command, summary, give/need, core, closure, and intake surfaces all refresh against the same semantic Bitcode state carrier
- the shared shell bridge must fail closed during pre-mount and hot-reload rebuild windows instead of crashing `/application`
- V26 should extend this provider rather than multiplying per-component shell refresh loops

## Runtime health carriers

Second-gate now explicitly treats application health as part of the productionizing pass, not as incidental developer ergonomics.

Current active carriers:
- `uapi/app/api/client-error/route.ts`
- `uapi/app/application/application-shell-bridge.tsx`
- `uapi/app/auxillaries/components/AuxillariesProfilePane.tsx`
- `protocol-demonstration/src/client-entry.js`
- `protocol-demonstration/public/app.js`

Operational rule:
- client-side runtime failures should be accepted by an app-owned telemetry intake route instead of 404ing
- semantic snapshot reads should return null during shell pre-mount windows rather than throwing
- mounted-shell bootstrap should wait for the host markup and fail closed while the application is rebuilding
- fullscreen orbitals entered from `/application` should remain renderable during convergence rather than crashing on missing overlay-pane references

## Transactions master carrier

Second-gate now makes master detail concrete as a searchable and filterable Bitcode transactions table rather than leaving the master surface implicit.

Current active carriers:
- `uapi/app/application/ApplicationTransactionsTable.tsx`
- `uapi/app/application/application-transactions.ts`
- `uapi/components/base/bitcode/execution/BitcodeTransactionsTable.tsx`
- `uapi/components/base/bitcode/execution/BitcodeTransactionsOverview.tsx`
- `uapi/components/base/bitcode/execution/BitcodeTransactionsFilterBar.tsx`
- `uapi/components/base/bitcode/execution/BitcodeTransactionsActiveFilters.tsx`
- `uapi/components/base/bitcode/execution/BitcodeTransactionsDataTable.tsx`
- `uapi/components/base/bitcode/execution/BitcodeTransactionsPagination.tsx`
- `uapi/components/base/bitcode/execution/bitcode-transaction-data-mode.ts`
- `uapi/components/base/bitcode/execution/bitcode-transaction-types.ts`
- `uapi/components/base/bitcode/execution/bitcode-transaction-active-filters.ts`
- `uapi/app/application/ApplicationTransactionWorkspace.tsx`

Operational rule:
- master detail means a rich Bitcode transactions table as master and transaction detail as detail
- the read experience centers on that transactions master-detail window, while the write experience moves through give, need, and orbitals/interfaces posture from application context
- `/application` prefers `transactionId` as the master-detail query carrier while continuing to accept inbound `runId` for compatibility convergence
- transaction selection and rich master-table filters are route-owned and shareable through application query state
- transaction filtering must support free-text search, transaction-field filtering, participant ownership filtering, proof-posture filtering, and explicit sort posture
- transaction pagination must remain route-owned and query-shareable rather than living only as a table-local row window
- active transaction filters should remain visibly surfaced as individually clearable chips rather than hiding the shaped table window inside controls alone
- transaction filters, headers, pagination, and payload views should share one explainer/tooltip carrier rather than embedding incidental one-off help text per surface
- route-local application orchestration owns normalization and selection while the base component library owns the reusable typed overview/filter/table UI carriers
- transaction source resolution should derive `live`, `mock-review`, and `review-fallback` from fetched live history plus the selected transaction URL instead of trapping source mode in mutable page-local branches
- the master surface should fail over into a clearly labeled `review-fallback` posture when live history is empty but the route is opened on an explicit mock transaction review URL
- workspace substructure preview cards should reuse one shared detail-panel carrier rather than preserving page-local metric/row card markup
- later V26 convergence should deepen this transaction surface rather than reverting back to sidebar-only or generic run-selection posture

## Route-owned transaction query carrier

Second-gate now treats transaction selection and rich master filters as route-owned application state instead of component-local table state.

Current active carriers:
- `uapi/app/application/application-transaction-query.ts`
- `uapi/app/application/ApplicationPageClient.tsx`
- `uapi/app/application/ApplicationTransactionWorkspace.tsx`
- `uapi/app/application/ApplicationTransactionsTable.tsx`
- `uapi/components/base/bitcode/execution/BitcodeTransactionsFilterBar.tsx`
- `uapi/components/base/bitcode/execution/BitcodeTransactionsActiveFilters.tsx`
- `uapi/components/base/bitcode/execution/BitcodeTransactionsPagination.tsx`
- `uapi/components/base/bitcode/execution/bitcode-transaction-types.ts`
- `uapi/components/base/bitcode/execution/bitcode-transaction-active-filters.ts`

Operational rule:
- `transactionId` remains the primary master-detail selection carrier
- inbound `runId` remains accepted only for compatibility convergence
- transaction search, status, ownership, lens, repository, participant, proof posture, sort, page, and page size are persisted in route query state
- shared transaction defaults and active-filter chip normalization should live in the execution layer rather than being redefined independently per route or component
- transaction detail prefers `transaction` as the active detail carrier while accepting legacy `identity` only as a compatibility parsing alias
- resetting filters clears only transaction-filter carriers and preserves selected transaction plus unrelated application parameters

## Reusable payload inspection carrier

Second-gate now treats visual-vs-raw payload inspection as a reusable application/base-component problem instead of an incidental per-card debugging convenience.

Current active carriers:
- `uapi/components/base/bitcode/execution/BitcodeInlineExplainer.tsx`
- `uapi/components/base/bitcode/execution/bitcode-transaction-explainers.ts`
- `uapi/components/base/bitcode/execution/BitcodePayloadInspector.tsx`
- `uapi/components/base/bitcode/execution/BitcodeDetailRowList.tsx`
- `uapi/components/base/bitcode/execution/BitcodeMetricGrid.tsx`
- `uapi/components/base/bitcode/execution/BitcodeDetailCollection.tsx`
- `uapi/components/base/bitcode/execution/BitcodeDetailPanel.tsx`
- `uapi/components/base/bitcode/execution/BitcodeChipCloud.tsx`
- `uapi/app/application/ApplicationTransactionIdentityCard.tsx`
- `uapi/app/application/ApplicationTransactionClosureCard.tsx`
- `uapi/app/application/ApplicationTransactionProofsCard.tsx`
- `uapi/app/application/ApplicationTransactionHistoryCard.tsx`
- `uapi/app/application/ApplicationTransactionDetailSurface.tsx`

Operational rule:
- selected-transaction identity, closure, proofs, and history should all expose one shared visual-vs-raw payload reading carrier
- repeated selected-transaction card families should converge on shared payload-plus-rows and payload-plus-collection carriers rather than preserving page-local wrappers for each card type
- raw payload reading should include copy support and payload metadata instead of falling back to an unstructured `<pre>` block
- visual payload reading should also expose a structured payload summary with root kind, top-level counts, and previewed sections before operators drop into raw JSON
- visual payload reading should also expose a bounded nested payload tree so operators can inspect structural JSON fields and types without leaving the shared detail carrier
- shared inline explainers should document visual-vs-raw posture, filter meaning, column meaning, and page-size behavior without reverting to browser-only `title` hints
- transaction-terminal controls should keep stable accessible names even when explainer triggers are introduced beside labels
- selected-transaction rows, metric grids, and chip clouds should converge on reusable execution-level base carriers instead of being re-authored per card
- selected-transaction action rows and payload-card shells should also converge on reusable execution-level carriers instead of each card reauthoring its own inspector-plus-button structure
- proof/history collection cards and workspace substructure preview cards should converge on shared collection/panel carriers instead of repeating page-local list/article markup
- execution-log header, log body, and work-update stacks should converge on one reusable execution-stream carrier across `/application`, conversations, and `/executions` instead of remaining page-local log glue
- future transaction-detail, closure, and conversation payload views should extend this base carrier instead of rebuilding raw-view toggles ad hoc

## Route-owned transaction detail interaction carrier

Second-gate now treats selected-transaction focus and closure follow-through as application route state rather than detail-local widget state.

Current active carriers:
- `uapi/app/application/application-transaction-query.ts`
- `uapi/app/application/ApplicationTransactionDetailActionBar.tsx`
- `uapi/app/application/ApplicationTransactionDetailSurface.tsx`
- `uapi/app/application/ApplicationPageClient.tsx`

Operational rule:
- detail focus is persisted as route query state with `deliverables` as the default focus
- selected transactions can switch focus between deliverables, transaction, closure, proofs, history, activity, and compatibility console without losing the active transaction selection
- closure rerun and detail refresh are available directly from the application-owned transaction detail carrier through the shared shell bridge

## Inline transaction closure follow-through carrier

Second-gate now treats settlement/proof/history reading inside selected-transaction detail as application-owned closure composition rather than primarily a shell-section navigation task.

Current active carriers:
- `uapi/app/application/ApplicationTransactionClosureCard.tsx`
- `uapi/app/application/ApplicationTransactionProofsCard.tsx`
- `uapi/app/application/ApplicationTransactionHistoryCard.tsx`
- `uapi/app/application/ApplicationTransactionDetailSurface.tsx`
- `uapi/app/application/application-transaction-detail.ts`
- `uapi/app/application/application-closure-state.ts`

Operational rule:
- selected-transaction closure view reads settlement metrics and branch artifacts inline
- proof families are visible directly inside an explicit proofs detail carrier
- recent transaction history is visible directly inside an explicit history detail carrier
- shell-section navigation remains available as secondary follow-through rather than the primary lower closure read path

## Give-side repository supply carrier

Second-gate now treats repository supply as an application-owned part of the `give` action rather than only as preserved-shell detail.

Current active carriers:
- `uapi/app/application/ApplicationRepositoryContextPanel.tsx`
- `uapi/app/application/application-repository-context.ts`
- `uapi/app/api/vcs/[provider]/connection/route.ts`
- `uapi/app/api/vcs/[provider]/repositories/route.ts`
- `uapi/components/base/bitcode/vcs/VCSRepositorySelector.tsx`

Operational rule:
- repository connection posture is application-visible before the deposit chain
- selected repository supply is route state inside `/application`
- the app-owned `/api/vcs/*` contract feeds the give-side carrier
- the preserved deposit surfaces remain the semantic source below that application frame

## Give/need semantic snapshot bridge

Second-gate now exposes the mounted Bitcode shell through a read-only semantic snapshot so route-local application carriers can reuse precise Bitcode truth without re-implementing shell-local selection logic or scraping generic markup.

Current active carriers:
- `protocol-demonstration/public/app.js`
- `protocol-demonstration/src/client-entry.js`
- `uapi/app/application/ApplicationGiveNeedWorkbench.tsx`
- `uapi/app/application/ApplicationActionWorkbenchCard.tsx`
- `uapi/app/application/application-give-need-workbench.ts`

Operational rule:
- the preserved shell remains the semantic owner of active scenario, auth session, deposit preview, need surface, and fit surface
- V26 route-local application carriers may consume that truth through `getBitcodeApplicationShellSnapshot()` and `readBitcodeApplicationShellSnapshot()`
- client entry must wait for the application host before importing the preserved shell module for mount, snapshot, or control reads
- route-local give/need action detail should prefer the semantic snapshot bridge over generic DOM scraping where possible
- this bridge is read-only and does not reopen first-gate ownership

## Application workspace shell and explainer carrier

Second-gate now treats the application workspace shell, help posture, and visible copy discipline as shared application composition rather than one-off per-panel chrome.

Current active carriers:
- `uapi/app/application/ApplicationOperatorCard.tsx`
- `uapi/app/application/application-operator-explainers.ts`
- `uapi/app/application/ApplicationCommandDeck.tsx`
- `uapi/app/application/ApplicationWorkspaceRail.tsx`
- `uapi/app/application/ApplicationWorkspaceRailCard.tsx`
- `uapi/app/application/ApplicationNeedScenarioPanel.tsx`
- `uapi/app/application/ApplicationSupplySelectionPanel.tsx`
- `uapi/app/application/ApplicationDepositComposer.tsx`
- `uapi/app/application/ApplicationGiveNeedWorkbench.tsx`
- `uapi/app/application/ApplicationClosureNativeSections.tsx`
- `uapi/app/application/ApplicationClosureControlDeck.tsx`

Operational rule:
- application workspace cards should converge on one shared shell and explainer carrier rather than reauthoring hero, summary, and stat framing per panel
- the support rail and give-side supply terminal are part of that same shared application shell and may not drift into one-off section chrome
- live application copy must stay user-referencing and may not narrate gates, route ownership, canon posture, or implementation mechanics back to the user
- live application copy should also avoid shell-plumbing, mounted-state, or source-path narration unless the user deliberately enters a bounded lower-level runtime view
- stepwise workspace guidance should read as resumable give/need flow guidance and working-draft continuity rather than tutorial or demo residue
- the shared application shell should absorb carried-forward tooltip/help posture from the strongest prior demonstration surfaces instead of leaving that UX behind
- client component modularization should keep expanding through base carriers, route-local state normalizers, and orbital descriptors rather than growing new page-local monoliths

## Command-state and control bridge

Second-gate now also exposes the mounted Bitcode shell as a mutable command carrier so the application deck can drive Bitcode command posture without scraping or mutating raw shell DOM directly.

Current active carriers:
- `protocol-demonstration/public/app.js`
- `protocol-demonstration/src/client-entry.js`
- `uapi/app/application/ApplicationCommandDeck.tsx`
- `uapi/app/application/application-command-state.ts`

Operational rule:
- scenario, projection, branch mode, flow-guide visibility fed from preserved-shell tutorial compatibility, make-branch, and reset remain preserved-shell semantics
- `/application` drives those semantics through the shell control bridge rather than direct DOM reads and synthetic document listeners
- command posture is normalized into route-local application state before rendering
- stepwise guide posture is presented to operators as flow guidance and resumable draft continuity rather than tutorial residue
- second-gate command composition stays application-owned even while first-gate shell ownership remains below it

## Summary-state semantic snapshot bridge

Second-gate now also treats the Bitcode summary strip as application-owned semantic state rather than a rendered-card mirror.

Current active carriers:
- `protocol-demonstration/public/app.js`
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
- `protocol-demonstration/public/app.js`
- `protocol-demonstration/src/client-entry.js`
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
- `protocol-demonstration/public/app.js`
- `protocol-demonstration/src/client-entry.js`
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
- `protocol-demonstration/public/app.js`
- `protocol-demonstration/src/client-entry.js`

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
- `protocol-demonstration/public/app.js`
- `protocol-demonstration/src/client-entry.js`

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
- `protocol-demonstration/public/app.js`
- `protocol-demonstration/src/client-entry.js`

Operational rule:
- `/application` selects the active Bitcode scenario through the shell control bridge
- parser posture, closure count, and target-kind count remain visible inside the native need workspace
- scenario selection stays semantically aligned to the mounted Bitcode shell rather than creating a competing need state
- second-gate should keep shifting need behavior inward to route-local application carriers while preserving Bitcode need/fit semantics

## Closure-state semantic snapshot bridge

Second-gate now also treats verification, branch, settlement, and ledger semantics as an application-owned native carrier rather than a rendered-shell discovery problem.

Current active carriers:
- `protocol-demonstration/public/app.js`
- `protocol-demonstration/src/client-entry.js`
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
- `protocol-demonstration/public/app.js`
- `protocol-demonstration/src/client-entry.js`

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
- `uapi/app/api/executions/_shared.ts`
- `uapi/app/api/executions/history/route.ts`
- `uapi/components/base/bitcode/execution/BitcodeDetailRowList.tsx`
- `uapi/components/base/bitcode/execution/BitcodeMetricGrid.tsx`
- `uapi/components/base/bitcode/execution/BitcodeChipCloud.tsx`
- `/api/executions/history/[runId]`

Operational rule:
- selected-transaction history payloads normalize into one application-owned detail snapshot
- current app-owned execution-history routes return JSON again for both transaction collection and selected-transaction detail instead of falling through to missing-route HTML
- GET history carriers fail closed to anonymous-safe empty payloads during unauthenticated review so `/application` remains interactive without leaking privileged history
- overview, identity, and closure reading are split into SRP-aligned transaction-detail modules rather than one mixed-responsibility pane
- closure now exposes the same visual-versus-raw payload posture as the other JSON-bearing transaction-detail cards
- deliverable summary/cards render in both mock and live posture inside `/application`
- proof/history/accounting remain part of the same selected-transaction read surface
- the detailed execution console remains secondary compatibility context during second-gate convergence

## Application-owned transaction activity carrier

Second-gate now also elevates the retained execution/log/work-update system into the Bitcode application workspace instead of leaving that depth mostly to `/executions`.

Current active carriers:
- `uapi/app/application/ApplicationTransactionActivitySurface.tsx`
- `uapi/app/application/application-run-activity.ts`
- `uapi/components/base/bitcode/activity/bitcode-activity-model.ts`
- `uapi/hooks/usePipelineExecution.ts`
- `uapi/components/base/bitcode/execution/pipeline-execution-log.tsx`
- `uapi/components/base/bitcode/execution/pipeline-execution-log-header.tsx`
- `uapi/components/base/bitcode/execution/WorkUpdatePanel.tsx`
- `uapi/components/base/bitcode/notifications/NotificationsWidget.tsx`

Operational rule:
- central master detail owns the selected transaction’s activity read
- one shared Bitcode activity vocabulary should normalize retained execution events and personal notification rows before later activity kinds are admitted
- retained execution/log carriers are reused under Bitcode application ownership
- notifications remain user-facing, but their titles, scope, and summaries should be expressible through the same shared activity model as transactions
- the rail is selection/orientation focused rather than duplicating the detailed activity surface
- compatibility execution pages remain available during convergence but are no longer the only rich carrier

## Overlay choreography

V26 keeps `/application` as the owned page context and mounts overlays from within it.

Current active carriers:
- conversations overlay:
  `uapi/app/conversations/components/ConversationsOverlay.tsx`
- auxillaries overlay:
  `uapi/app/auxillaries/components/AuxillariesProvider.tsx`
  `uapi/app/auxillaries/components/AuxillariesSurface.tsx`
- orbitals compatibility overlay:
  `uapi/app/orbitals/components/OrbitalsProvider.tsx`
  `uapi/app/orbitals/components/index.tsx`

Operational rule:
- conversations and auxillaries are not peer product destinations
- they are fullscreen application overlays entered from the application frame
- `uapi/components/base/bitcode/layout/workspace-surface.ts` is the shared route-classification owner for navbar surface posture and footer suppression across `/application`, `/orbitals`, and `/conversations`
- unauthenticated workspace chrome exposes deliberate access/create-account actions from the shared navbar instead of falling back to disabled marketing-era CTA behavior
- marketing footer chrome does not render on operator workspace routes
- `uapi/app/application/ApplicationOpenConversationsButton.tsx` and `uapi/app/application/ApplicationOpenOrbitalsButton.tsx` are the shared application-owned mode-entry controls for conversation/auxillary transitions
- application-triggered auxillary entry opens a contained, login-first auxillary surface while preserving the four-ring auxillary contract for Connects, Interfaces, Profile, and `$BTD`
- contained auxillary access shells and focused auxillary routes must keep auxillaries-first wording and contained auxillary reads rather than reverting to generic workspace/settings/account entry furniture
- `uapi/app/auxillaries/components/auxillary-pane-meta.ts` is the shared auxillary naming/copy owner for fullscreen auxillary entry labels, targeted auxillary-open actions, and the direct-route return action into transactions
- signed-in auxillary reopen actions now flow through the shared `auxillaries` entry alias in `uapi/app/auxillaries/components/AuxillariesProvider.tsx` rather than older active `account`-named callers
- signed-in `Interfaces` and `$BTD` auxillaries now read through application-owned pane carriers and shared auxillary workspace section/stat/preference modules rather than model or credits wrapper panes
- active orbital-pane step carriers now read as `interfaces` and `btd` in the live surface and CSS aliases, with older model/credits names surviving only as compatibility scaffolding where still required
- organization treasury posture now belongs to the same canonical auxillary system too: `uapi/app/auxillaries/components/organization/{BTDTreasuryManagement,OrganizationSettings}.tsx` frame wallet-settled BTC, issued `$BTD`, GitHub-before-transaction readiness, and Connects-owned SSO/auth policy as the active Bitcode organization surface, while the existing `uapi/app/orbitals/components/organization/OrganizationSettings.tsx` carrier survives only as a thin compatibility re-export
- contained auxillary reads now reset stale deep-link pane state on close, suppress free-floating background animation, reuse calmer workspace-grade close/sign-in/sign-out controls instead of old demo-neon button posture, and keep a full-width contained operator shell when entered from `/application`
- contained auxillary rails now converge on shared panel plus tabs carriers instead of mixing floating sequence cards with older absolute-position ring-label furniture
- profile-owned repository knowledge sharing now reads through an app-owned fail-closed auxillary route instead of 404ing inside the contained workspace
- signed-in workspace chrome now exposes Auxillaries through the user menu as `Open Auxillaries fullscreen`, while notifications stay operator-facing and describe proof closure, repository activity, and review prompts rather than generic account/settings chrome
- the homepage/operator-shell CTA now returns onboarded operators to `/application` instead of dispatching stale overlay-only modes
- selected application and retained auxillary review surfaces now keep visible `Transactions` / `Auxillaries` wording instead of `workspace` / `transaction terminal` drift, and the support-rail split stays delayed until `2xl` so laptop-width reading remains centered on the main transactions column
- preserved-runtime explainers now keep rich footer/reference chips while normalizing them to user-facing live-surface and reference-topic labels instead of demo-era or source-path-heavy narration
- preserved-runtime telemetry now reports through Bitcode-facing `[bitcode-runtime]` labeling rather than `engi-demo`-era visible prefixes

## First-and-second-gate checkpoint artifact

Current active carriers:
- `.bitcode/v26-gate-checkpoint-report.json`
- `protocol-demonstration/src/canonical/proven-generator.js`
- `protocol-demonstration/test/proven-generator.test.js`

Operational rule:
- V26 now treats first-gate plus second-gate closure as an explicit generated checkpoint, not an implied reading of scattered reports
- the checkpoint artifact records inherited first-gate proof/canon closure, second-gate structural workspace closure, and third-gate preparation posture
- this checkpoint is required for the near-term V26 commit boundary even while `V25` remains the active promoted canon

## Active auxillary-pane carriers

Current active carriers:
- `uapi/app/auxillaries/components/AuxillariesInterfacesPane.tsx`
- `uapi/app/auxillaries/components/AuxillariesBTDPane.tsx`
- `uapi/app/api/auxillaries/user/data-share/route.ts`
- `uapi/app/auxillaries/components/shared/AuxillariesWorkspacePanels.tsx`
- `uapi/app/auxillaries/components/shared/AuxillariesPaneTabs.tsx`
- compatibility re-export carriers under `uapi/app/orbitals/components/{headers,shared,models}/*` plus `OrbitalsDataSharingPanel.tsx` / `orbital-pane-explainers.ts`

Operational rule:
- `Connects` remains the closest retained canonical orbital pane
- `Interfaces` owns application visual and default-behavioral posture for master detail, conversations, and related reads
- `$BTD` owns wallet-adjacent share posture, settlement-view bias, and `$BTD`-specific default return posture
- `Profile` keeps repository knowledge-sharing posture readable without requiring a missing backend carrier or missing asset bundle
- contained orbital rails should reuse one shared panel list plus one shared tab carrier before any new pane-local navigation furniture is introduced
- shared orbital workspace carriers should absorb new pane layout work before new one-off pane-local section chrome is introduced

## Documentation and route/package legibility

Second-gate now treats markdown and README refurbishment as part of implementation, not post-hoc prose.

Current active documentation carriers:
- `README.md`
- `uapi/README.md`
- `protocol-demonstration/README.md`
- `uapi/app/application/README.md`
- `uapi/app/orbitals/README.md`
- `uapi/components/base/bitcode/README.md`
- `uapi/components/base/bitcode/execution/README.md`

Operational rule:
- the active route, orbital, execution, and package owners that define second-gate Bitcode reality must have current markdown carriers
- that active markdown set includes the root, package, route, and shared-component README family and is a required second-gate implementation/proof surface
- those docs must use the same product naming the live workspace uses: `/application`, `Connects`, `Interfaces`, `Profile`, `$BTD`, and `flow guide`
- generated checkpoint artifacts should fail if this documentation set disappears
- third-gate marketing work remains separate from this operator-facing documentation set

## Active application-owned API carriers

Current active V26-facing API surfaces include:
- `uapi/app/api/state/route.ts`
- `uapi/app/api/deposits/route.ts`
- `uapi/app/api/make-bitcode-branch/route.ts`
- `uapi/app/api/reset/route.ts`
- `uapi/app/api/bitcoin-demonstration-service/route.ts`
- `uapi/app/api/auxillaries/data/route.ts`
- `uapi/app/api/auxillaries/model-preferences/route.ts`
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

Current active readiness and transaction-admission carriers include:
- `uapi/app/application/bitcode-transaction-readiness.ts`
- `uapi/app/application/bitcode-transaction-route-readiness.ts`
- `uapi/app/application/ApplicationCommandDeck.tsx`
- `uapi/app/application/ApplicationDepositComposer.tsx`
- `uapi/app/application/ApplicationClosureControlDeck.tsx`

Operational rule:
- app-owned write routes are no longer allowed to trust client-only readiness posture when auth, wallet, provider, and repository scope can be re-derived on the server
- app-owned read routes for `activity` and `executions/history` must also prove authenticated persisted reread of execution rows, notifications, `final_work_summary`, repo snapshots, processing stats, and execution events rather than relying on mock-mode or unauthenticated fallback as the only tested behavior
- `deposits` and `make-bitcode-branch` are application-owned Bitcode write boundaries and therefore must fail closed unless signed-settlement readiness and repository anchor posture are satisfied
- application write controls may expose drafting posture before settlement posture, but they may not overclaim that staged drafting readiness is equivalent to verified signing readiness
- the generic `Profile` write route may preserve an already provider-managed wallet signer state when rereading the same bound identity, but it may not assert new `pending` or `verified` signer posture on behalf of the client
- the admitted `Bitcode MCP` deliverable-create boundary must fail closed before queueing or reserving `BTD` when `pipelines.create` permission is absent or the requested repository/provider ingress is not coherently anchored by a matching repository connection or authenticated provider credential
- the active `executions-mcp` runtime at fifth-gate now admits only the narrowed Exchange-facing tool families (`pipeline`, `analysis`, `intelligence`, `enterprise`, `lsp`, `observability`); `field-intelligence` is removed from Bitcode and archived only as `_legacy/field-intelligence`, while retained monitoring, orchestration, and Jira-specific tool carriers remain non-admitted reference-only corridors until they are rebuilt to current package/runtime contracts
- the admitted `executions-mcp` package boundary must typecheck locally through every retained dependency it still traverses; V26 no longer treats missing `zod`/`supabase` links, Next-only `supabase/ssr/server` leakage, or deep-import-only package seams as acceptable “old-world residue” once that corridor is claimed active
- active and admitted-support prompt-bearing inference carriers must import `PromptPart`, `Prompt`, `PromptExecution`, and shared formatters through the public `@bitcode/prompts` boundary or its stable narrow subpaths; retained reference-only prompt consumers must likewise prefer the narrow public `@bitcode/prompts/prompt` and `@bitcode/prompts/parts/PromptPart` subpaths when they only need prompt primitives rather than the full prompt barrel, and their retained test/build configs should map only those explicit public subpaths rather than preserving broad `@bitcode/prompts/* -> packages/prompts/src/*` catchalls; admitted deliverable prompt ports plus prompt-primitive support carriers in `tools-generics`, `llm-generics`, and `time` must likewise keep `Prompt`, `PromptPart`, and `PromptFormatter` on `@bitcode/prompts/{prompt,parts/PromptPart,formatters}` whenever they are not actually using the full root prompt barrel; execution-aware prompt carriers and broader active execution-bearing runtime carriers that only need ancestry, prompt-hierarchy ownership, or the base execution tree must likewise prefer `@bitcode/execution-generics/Execution` and `@bitcode/execution-generics/prompts/ExecutionPrompt` rather than the broad execution barrel; deep imports into `packages/prompts/src/*` are no longer admissible on the live path except inside the prompts package itself, and the package-by-package prompt consumer map is maintained in `protocol-demonstration/V26_PROMPT_SURFACES.md`
- retained `packages/pipelines/deliverable/*` execution stores and route-facing postprocess artifacts should now carry semantic `need`, `writtenAssetType`, asset-pack-shaped snapshots, and shipping delivery-mechanism mirrors alongside compatibility `definitionOfDone` / `deliverableType` keys; the retained phase/shipping/read carriers should resolve those semantic fields first so the commercial infrastructure is actively shaping Bitcode protocol behavior rather than silently recentering old-world naming, and the corridor should be read as a Bitcode agentic pipeline run that satisfies needs, synthesizes stable written assets, and uses shipping-phase `deliverables` only as connected-interface delivery mechanisms; active reread, workspace-run summaries, and mock/operator fallback projections should therefore prefer `writtenAssets` for Bitcode-owned summary/file-change meaning, then fall back through `deliveryMechanism` and only finally compatibility `deliverables`, while PR/review/comment/issue surfaces remain shipping wrappers; retained corridor entry initialization should hydrate prompt/tool/llm/agent registries when callers still arrive through a bare execution so structured runtime proof does not depend on implicit `PipelineExecution` callers
- operator-facing execution headers and the retained `/api/deliverables` route should present this corridor as asset-pack synthesis plus shipping mechanisms rather than teaching `deliverable` as the primary Bitcode object, even while their public compatibility names remain stable for fifth-gate continuity
- the retained `/api/deliverables` streaming completion carrier should likewise emit semantic `writtenAssets`, `deliveryMechanism`, `need`, `writtenAssetType`, and `assetPack` aliases alongside compatibility `actions` / `deliverables`, and client-side stream parsing should preserve those aliases instead of collapsing everything back into one compatibility surface
- the retained `/api/deliverables` route should also dual-store route-preprocess snapshots and completion metadata under semantic `assetPackWrittenAsset` / `need` / `assetPack` / `writtenAssetType` aliases so entry-time routing, persistence, and reread stay aligned on Bitcode-owned meaning even while the route name remains retained compatibility
- the retained `/api/deliverables` telemetry, notification, and email-subject carriers should likewise preserve compatibility identifiers only as wrappers while emitting semantic asset-pack event aliases and asset-pack-run wording so operator/analytics surfaces no longer over-teach `deliverable` as the primary object
- retained email-template filenames and promptpart identifiers in this corridor should also stay compatibility-only while their rendered copy and prompt content teach asset-pack-run, written-asset, and shipping-mechanism semantics
- retained raw promptparts and promptpart-generation scripts in this corridor should likewise stay compatible by identifier while their actual prompt text and generation guidance describe asset-pack-run, need-satisfaction, written-asset, and shipping-wrapper semantics; deeper phase-purpose, setup-comprehension, shipping-finalization, and deliverables-system promptparts should therefore teach Bitcode-first execution meaning instead of PR-first / GA-1 residue
- retained `packages/pipelines/deliverable/*` setup and prompt carriers should prefer canonical `comprehend-need` module paths, and retained discovery outputs should mirror compatibility `deliverables` / `definitionOfDone` fields into semantic `writtenAssets` / `needSatisfactionCriteria` so the commercial infrastructure expresses Bitcode meaning before later-gate renames
- retained `packages/pipelines/deliverable/*` must also typecheck locally through the retained MCP/VCS/prompt/search support graph it still traverses; fifth-gate no longer treats runtime-only proof as sufficient for this corridor once it is claimed as live commercial infrastructure
- the base `doc-comment` primitive and `doc-code` tool-injection path remain admitted support/compatibility corridors for build-time attachment of tool prompt descriptions into Bitcode agentic runs, but `generic-doc-comment-plugins`, `doc-comment` examples, and prompt-package developing experiments remain retained old-world reform corridors that may not teach prompt-package internal paths as public API; see `protocol-demonstration/V26_DOC_COMMENT_REFORM.md`
- the prompt/doc-code runtime bridge and its support primitives must resolve through honest public package subpaths (`@bitcode/prompts`, `@bitcode/execution-generics/{Execution,prompts/ExecutionPrompt}`, `@bitcode/registry`, `@bitcode/doc-comment/{base-plugin,types}`, `@bitcode/doc-code`, `@bitcode/tools-generics`) rather than repo-relative cross-package source reach-through
- supplementary corridor-by-corridor reform tactics, success criteria, and current needs are maintained in `protocol-demonstration/V26_REFORM_STRATEGY.md` so package and interface reform stays classified, mirrored, and proof-bearing rather than devolving into rename-only cleanup
- the admitted direct-product `uapi` corridor must likewise typecheck locally through product, public/docs, auth/UI, and visualization/effects carriers; fifth-gate no longer treats stale wrapper drift or public-shell compatibility seams as acceptable residue once those routes are claimed active

## Commercial infrastructure topology

V26 now needs to be legible not only as a route/application map but also as a production-shaped commercial infrastructure topology.

The active topology is:
- `product surfaces`
  `/application`, `/conversations`, `/auxillaries`, `/(root)`, `/docs`, and `/executions`
- `protocol and ingress routes`
  app-owned `/api/*` carriers for state, write actions, conversations, auxillaries, VCS, storage, telemetry, webhooks, and external realization
- `identity and admission`
  auth, wallet, `$BTD`, repository anchor, provider connection, and signed-settlement readiness
- `persistence and state`
  PostgreSQL/Supabase, ORM/query carriers, generated database types, and execution/activity history
- `execution and prompt substrate`
  prompt, execution, conversations, attachments, templates, pipelines, and MCP substrate packages
- `proof and observability`
  `.bitcode/*` proof artifacts, `_PROVEN_`, telemetry intake, logger/observability packages, and repository-health/testing carriers

Operational rule:
- no layer above may silently redefine Bitcode semantics owned by a lower canonical layer
- product routes are the only operator-facing product centers, while protocol and ingress routes remain server-owned admissions into the same Bitcode state model
- identity/admission, persistence/state, execution/prompt, and proof/observability are all first-class product infrastructure and may not remain hidden as demo-local implementation residue

## Package corridor responsibility map

This document groups the repository packages by the role they currently play in V26 application convergence.

Current corridor map:

| Corridor | Current package families | Current role in V26 |
| --- | --- | --- |
| Product and response ownership | `packages/{api,auth,btd,context,models,registry,responses}` | direct Bitcode product, account, and response composition |
| Repository/provider boundary | `packages/{github,vcs,git,gitlab,bitbucket,browser-storage,security}` | repository anchor, provider connection, and provider-specific support/integration |
| Persistence and data contract | `packages/{supabase,orm,aurora-postgres,postgresql,mysql,files}` | storage, schema, query, and generated type ownership |
| Execution, prompts, conversations, and MCP | `packages/{conversations-generics,execution-generics,executions-mcp,pipelines,pipelines-generics,prompts,agent-generics,attachments-generics,templates-generics,tools-generics,llm-generics,streams}` | admitted execution substrate for Bitcode activity, conversations, `ad hoc`, prompts, tools, and MCP behavior, with `@bitcode/prompts` as the public prompt contract for active inference carriers |
| Artifact, proof, and health support | `packages/{artifacts,digest,errors,logger,observability,parsing,repository-health,testing,tech-types,time,objects-arrays}` | proof-bearing support, telemetry, diagnostics, typing, parsing, and analysis substrate |
| Provider/deployment/support integrations | `packages/{aws,circleci,cloudflare,docker,email,firebase,firecrawl,google-analytics,jira,kubernetes,networking,notion,notifications,sentry,styling,vercel}` | ingress, support, telemetry, deployment, or bounded reference carriers |
| Retained generic/reference corridors | `packages/{generic-agents,generic-doc-comment-plugins,generic-llms,generic-tools,doc-code,doc-comment,editing,figma,lsp,multimodal-utils,obfuscate-generics,procurement,refactoring,web-search}` | retained acceleration, tooling, or auxiliary-input/reference-only corridors that may not silently own the live Bitcode product path, with the explicit exception that base `doc-comment` parsing and `doc-code` tool prompt injection are bounded support carriers for admitted tool prompt attachment |

Operational rule:
- every admitted package corridor must read as either direct-product, commercial-infrastructure, ingress/support, compatibility, or reference-only
- the same corridor role must be visible in spec, parity, retained-package admissibility proof, and README/system documentation
- the package map is repository-wide architecture guidance, not permission to keep all retained corridors equally central to the live Bitcode product path

## Retained package convergence

V26 still reuses older package reservoirs, but only under explicit Bitcode roles.

Current major retained owners:
- `protocol-demonstration/*`
  Preserved deterministic shell/runtime/proof baseline from first-gate.
- `packages/api/src/routes/deliverables.ts`
  Current deliverable and run-oriented backend surface being ported inward.
- `packages/api/src/routes/executions.ts`
  Current execution-history route-orchestration and normalization surface, with `uapi/app/api/executions/*` kept as thin interface bindings.
- `packages/api/src/routes/conversations.ts`, `packages/api/src/conversations/*`
  Current conversation route-orchestration plus message/streaming backend surface, with `uapi/app/api/conversations/*` kept as thin interface bindings.
- `packages/prompts/src/*`
  Prompt abstraction and future proved prompt-space carrier; `PromptPart`, `Prompt`, `PromptExecution`, shared formatters, and explicit raw promptpart subpaths form the live public boundary for active inference packages.
  The active/support/reference consumer map for those prompt carriers is maintained in `protocol-demonstration/V26_PROMPT_SURFACES.md`.
- `packages/vcs/*`
  Version-control provider abstraction and connection ownership.
- `packages/execution-generics/*`, `packages/pipelines-generics/*`, `packages/pipelines/*`
  Run/pipeline execution carriers being converged into Bitcode V26 semantics.

## Persistence and storage convergence

Fourth-gate must also converge the retained storage layer into explicit Bitcode ownership.

Current major retained owners:
- `supabase/*`
  Migration history, hosted-storage posture, auth/storage config, and database-side operational baseline, currently anchored by `supabase/migrations/001_ga1_production.sql`.
- `packages/supabase/*`
  Typed client, SSR helpers, retained Supabase package ownership, and active helpers under `packages/supabase/src/*`.
- `packages/orm/*`
  Active ORM model/query ownership and generated database typing under `packages/orm/src/models/*`, `packages/orm/src/queries/*`, `packages/orm/src/types/database.generated.ts`, `packages/orm/src/types/database.ts`, and `packages/orm/scripts/generate-db-types.ts`.
- storage-facing app/API carriers including `/edgetimes` and `/api/edgetimes`
  Application and API surfaces that expose the retained storage system upward into Bitcode; `/edgetimes` and `/api/edgetimes` now act as the live fourth-gate Bitcode storage/API witness for through-fourth-gate promotion rather than remaining draft-only posture.
- retained execution compatibility carriers including `/api/vcs`, `/api/templates/deliverables`, and `/api/auxillaries/template-preferences`
  Application API surfaces that keep retained runs/pipelines selectors and template personalization healthy while fourth-gate convergence ports those behaviors inward to `/application`.
- canonical auxillary API carriers including `/api/auxillaries/profile`, `/api/auxillaries/connections/github`, `/api/auxillaries/btd`, `/api/auxillaries/usage`, `/api/auxillaries/transactions`, and `/api/auxillaries/api-keys`
  Application API surfaces that keep profile identity, Connects-approved repository knowledge, $BTD balance history, $BTD transaction history, and API-key control under canonical Bitcode auxillary ownership instead of compatibility `orbitals` ownership.
- retained `/executions` and `/orbitals` route posture
  Compatibility route families that remain explicit during fourth-gate promotion while merged-world naming keeps `executions` explicit inside `activity` and converges `orbitals` on `auxillaries`; `/orbitals/*` must remain redirect-only compatibility into canonical `/auxillaries/*`, transactions/executions/notifications are activity classes, and auxillaries remain the non-transactional extra-network companion surfaces around the Bitcode core.

Required convergence rule:
- V26 may not leave PostgreSQL/Supabase ownership implicit across migrations, package helpers, and route glue.
- One explicit Bitcode storage contract must name the migration baseline, active schema owners, ORM or query-layer owners, generated database types, and the API boundaries that expose them.
- Tests, comments, docs, and proof-surface ownership must follow those storage carriers rather than accumulating as infrastructure residue.

## Proof, generated-evidence, and observability carriers

Current active proof and evidence carriers include:
- `.bitcode/application-composition-proof.json`
- `.bitcode/conversations-continuity-proof.json`
- `.bitcode/runs-pipelines-totality-proof.json`
- `.bitcode/persistence-schema-totality-proof.json`
- `.bitcode/prompt-system-totality-proof.json`
- `.bitcode/prompt-space-completeness-proof.json`
- `.bitcode/retained-package-admissibility-proof.json`
- `.bitcode/environment-mode-coherence-proof.json`
- `.bitcode/system-reform-admissibility-proof.json`
- `.bitcode/whole-repository-production-satisfaction-proof.json`
- `.bitcode/v26-total-closure-proof.json`
- `BITCODE_SPEC_V26_PROVEN.md`
- `uapi/app/api/client-error/route.ts`
- retained telemetry carriers under `protocol-demonstration/public/*`
- `packages/{logger,observability,repository-health,testing}/*`

Operational rule:
- generated proof families are part of the live production architecture because Bitcode requires a provable static codebase and deployed financial system
- later-gate witness families may already be generated in source, but they must not be mistaken for later-gate completion while the underlying subsystem matrix remains open
- observability and runtime-health carriers must remain Bitcode-facing and fail closed, not generic product-agnostic telemetry residue

## Module namespace direction

V26 now uses `@bitcode/*` as the active module namespace across workspace package names, path aliases, and imports.

That means:
- package manifests now declare `@bitcode/*` names,
- path aliases now resolve through `@bitcode/*`,
- and active source imports should no longer introduce older ENGI-scoped or other non-Bitcode module references.

Compatibility work that still keeps older ENGI-named files or directories does not justify reintroducing older ENGI-scoped or other non-Bitcode module usage in active source.

## Retained old-world tool and agent ports

Fourth-gate keeps only the old-world ports that have explicit Bitcode roles:

- Jira read-first ingestion
  `packages/generic-tools/mcps-tools/jira/*`, `packages/generic-agents/jira-processor/*`, and their prompt parts remain admitted only for authenticated Jira reads that normalize issues, worklogs, comments, and project state into Bitcode need context.
- Git/GH initial settle-write
  `packages/generic-tools/mcps-tools/github/*` remains admitted as the first explicit settle-write boundary for Git/GH-centric branch and pull-request settlement during testnet-ready fourth-gate promotion.

These are not equivalent roles.
Jira is a need-ingestion and measurement port in fourth-gate.
Git/GH is the initial admitted settle-write surface in fourth-gate.
Broader multi-surface settle writes stay later-gate or later-version work.
