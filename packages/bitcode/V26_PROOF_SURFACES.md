# V26 Proof Surfaces

## Status

- Scope: non-canonical supplementary proof and coverage map for V26
- Canonical pointer: `/Users/garrettmaring/Developer/ENGI/BITCODE_SPEC.txt -> V26`
- Next draft target: `BITCODE_SPEC_V27.md` (not yet opened)
- Purpose: map new V26 code systems to proof/test/spec expectations while the largest convergence pass in repo history is underway

## Rule

This file is not canonical proof truth.
Canonical proof obligations live in:
- `BITCODE_SPEC_V26.md`
- `BITCODE_SPEC_V26_DELTA.md`
- `BITCODE_SPEC_V26_PARITY_MATRIX.md`
- and the generated proof appendices/report artifacts when V26 reaches closure

This document exists so V26 implementation can add new code without losing coverage discipline.

## Coverage principle

Any new or newly repurposed V26 system must have all three:
1. specification coverage
2. test coverage
3. proof-surface assignment

V26 does not allow large application glue layers to accumulate without explicit coverage expectations.
The provable space is expected to grow materially in V26 as more package code, application surfaces, and reused component/system carriers are admitted into the converged Bitcode system.

## Gate coverage map

### Gate 2: application UX/UI and external interfacings

Required system families:
- `/application` architecture framing
- native master-detail sections
- conversations overlay entry and app-owned routes
- auxillaries entry, compatibility orbital routing, and app-owned auxillary data
- app-owned VCS surfaces required for connections and repository context

Current active carriers:
- `uapi/app/application/ApplicationOperatorCard.tsx`
- `uapi/app/application/application-operator-explainers.ts`
- `uapi/app/application/ApplicationExperienceFrame.tsx`
- `uapi/app/application/ApplicationCommandDeck.tsx`
- `uapi/app/application/ApplicationActionWorkbenchCard.tsx`
- `uapi/app/application/ApplicationExternalInterfacingPanel.tsx`
- `uapi/app/application/ApplicationGiveNeedWorkbench.tsx`
- `uapi/app/application/ApplicationRepositoryContextPanel.tsx`
- `uapi/app/application/ApplicationCoreNativeSections.tsx`
- `uapi/app/application/ApplicationClosureNativeSections.tsx`
- `uapi/app/application/ApplicationLiveSummaryStrip.tsx`
- `uapi/app/application/ApplicationTransactionWorkspace.tsx`
- `uapi/app/application/ApplicationTransactionDetailActionBar.tsx`
- `uapi/app/application/ApplicationWorkspaceRail.tsx`
- `uapi/app/application/application-closure-state.ts`
- `uapi/app/application/application-external-runtime.ts`
- `uapi/app/application/application-live-summary.ts`
- `uapi/app/application/application-give-need-workbench.ts`
- `uapi/app/application/application-repository-context.ts`
- `uapi/app/application/application-transaction-query.ts`
- `uapi/app/api/conversations/*`
- `uapi/app/api/auxillaries/data/route.ts`
- `uapi/app/api/vcs/[provider]/*`
- `uapi/app/api/v24/external-realization/route.ts`
- `packages/bitcode/src/client-entry.js`
- `packages/bitcode/public/app.js`

Required coverage posture:
- spec:
  architecture, ownership, and acceptance described in `BITCODE_SPEC_V26*`
- tests:
  route tests, UI tests, and browser verification for active entry flows
- proof surface:
  parity ledger rows, explicit closure statements for second-gate acceptance, and generated checkpoint checks that include active README/markdown carriers

### Gate 3: marketing refurbishment

Required system families:
- public website refurbishment carriers
- mounted public-shell vocabulary carriers for landing, footer, `/docs`, and the compatibility `/demo-video` alias
- tooltip/help posture preservation
- separation between application acceptance and marketing iteration
- generated checkpoint artifacts that leave third-gate work explicit instead of implied complete

Required coverage posture:
- spec:
  third-gate scope, timing, and separation remain explicit in `BITCODE_SPEC_V26*`
- tests:
  mounted public-shell copy, CTA posture, and guide-route continuity are covered without making second-gate application acceptance depend on the full marketing backlog
- proof surface:
  first+second-gate closure artifacts must still report mounted third-gate start clearly while leaving broader marketing/public-shell refurbishment explicitly incomplete

### Gate 4: retained-system convergence

Required system families:
- conversations continuity
- runs and pipelines totalization
- Bitcode-native deliverable meaning
- PostgreSQL/Supabase persistence, `/edgetimes`, migrations, schema contracts, ORM/query carriers, and generated database types
- prompt abstraction and prompt-space routing
- retained package admissibility

Required coverage posture:
- spec:
  retained roles and convergence rules are explicit
- tests:
  retained packages and converged routes are covered by behavior tests
- proof surface:
  retained systems are named in the eventual V26 proof family rather than implied
  current live fourth-gate promotion-boundary owners include `uapi/app/conversations/page.tsx`, `uapi/app/conversations/ConversationsRouteClient.tsx`, `uapi/app/executions/page.tsx`, `uapi/app/executions/[runId]/page.tsx`, `uapi/app/api/executions/route.ts`, `uapi/app/api/vcs/route.ts`, `uapi/app/api/templates/deliverables/route.ts`, `uapi/app/api/auxillaries/template-preferences/route.ts`, `uapi/app/api/auxillaries/profile/route.ts`, `uapi/app/api/auxillaries/connections/github/route.ts`, `uapi/app/api/auxillaries/credits/route.ts`, `uapi/app/api/auxillaries/usage/route.ts`, `uapi/app/api/auxillaries/transactions/route.ts`, `uapi/app/api/auxillaries/api-keys/route.ts`, `uapi/app/edgetimes/edgetimes-topology.ts`, `uapi/app/edgetimes/EdgetimesPageContent.tsx`, `uapi/app/edgetimes/page.tsx`, `uapi/app/api/edgetimes/route.ts`, and the focused route/API tests proving those surfaces
  current generated fourth-gate promotion proofs are `.engi/conversations-continuity-proof.json`, `.engi/runs-pipelines-totality-proof.json`, `.engi/persistence-schema-totality-proof.json`, `.engi/prompt-system-totality-proof.json`, and `.engi/retained-package-admissibility-proof.json`
  retained-package admissibility now also has to state old-world port roles explicitly, including Jira as reader-first need ingestion and Git/GH as the initial settle-write boundary
  retained MCP proof carriers are now explicit too: `packages/executions-mcp/src/mcp-server/src/__tests__/{tools/MCPToolsTestSuite.test.ts,integration/mcp-server.test.ts,unit/auth.test.ts}` must stay green against the current server surface and must not emit lingering Jest open-handle warnings, with imported singleton intervals handled as real runtime teardown obligations rather than ignored test noise
  active email-template carriers are explicit fifth-gate witnesses too: `supabase/config.toml`, `supabase/templates/{magic_link,confirm,password_recovery,email_change,invite,newsletter,deliverable_*}.html`, and the active deliverables email vars in `packages/api/src/routes/deliverables.ts` must converge on Bitcode naming and current placeholder contracts rather than leaving `Engi` product copy in live email/auth flows
  fifth-gate active-product naming witnesses now also cover the retained `@bitcode/prompts` package so prompt-system code, metadata, and promptpart identity text do not silently regress back to `Engi` naming after fourth-gate promotion
  fifth-gate active-product naming witnesses now also cover live public-shell style carriers and retained package surfaces such as `@bitcode/chatgptapp`, `@bitcode/web-search`, `@bitcode/streams`, and `@bitcode/email`, with the expectation that user-facing strings, active identifiers, package docs, and canonical package comments all converge on Bitcode naming rather than lingering `Engi` residue
  fifth-gate active-product naming witnesses now also cover mounted public-shell teaching carriers and retained package docs such as `uapi/app/(root)/components/{MarketingFeaturesGrid,MarketingComputeSection,MarketingCompetitorTableSection,MarketingMarketplaceSection}.tsx`, `uapi/app/orbitals/components/OrbitalsConnectsOrbitalEmailConnection.tsx`, and `packages/{web-search,registry}/*`, so public demo-like terminal strings, active classnames/comments, and retained registry/web-search docs cannot silently drift back to `Engi`
  fifth-gate active-product naming witnesses now also cover user-facing package API route strings in `packages/api/src/routes/*`, so auth welcome flows, ChatGPT success messages, and deliverables permission guidance cannot silently keep `Engi` naming while the mounted product surfaces read as Bitcode
  fifth-gate active-product naming witnesses now also cover retained shared contracts such as `@bitcode/errors` and direct consumers like `packages/api/src/routes/deliverables.ts` and `uapi/app/error.tsx`, so exported symbols, docs, and active error teaching cannot silently keep `EngiError` naming after promotion
  fifth-gate active-product naming witnesses now also cover live webhook and mock-system carriers such as `uapi/app/api/webhook/{route,verify}.ts`, `uapi/tests/webhookRoute.test.ts`, `uapi/mocking/index.ts`, `uapi/mocking/integration/MockProvider.tsx`, `uapi/mocking/generators/ComprehensiveMockDataGenerators.ts`, `uapi/mocking/{README.md,INTEGRATION_GUIDE.md,QUICK_START_*.md,COMPREHENSIVE_SYSTEM_SUMMARY.md,validate-system.js}`, and `uapi/mocking/scripts/*`, so trigger labels, comment commands, browser debug globals, shipped operator docs, and script ownership paths cannot silently drift back to `engi-*`, `__engiMock*`, or stale `app/mocking` product truth
  fifth-gate active-product naming witnesses now also cover canonical auxillary-pane ownership and retained LLM harness config, including `uapi/app/auxillaries/components/AuxillariesSurface.tsx`, `uapi/app/auxillaries/components/Auxillaries{Profile,Connects,Interfaces,BTD}Pane.tsx`, `packages/llm-generics/{jest.config.cjs,tsconfig.test.json,__mocks__/*,README.md}`, `jest.base.cjs`, and `pnpm-workspace.yaml`, so active route ownership and workspace test/runtime config cannot silently preserve `orbitals` imports, `engi-*` mock filenames, `@engi` transform allowlists, or dead Engi-era workspace entries
  fifth-gate active-product naming witnesses now also cover shipped JS/runtime carry-through and Storybook/docs carriers such as `packages/{errors,logger,observability}/*.js`, `packages/{security,multimodal-utils,tech-types,supabase}/*`, and active `uapi/stories/*`, so generated runtime artifacts, package docs/comments, and operator-facing story/example copy cannot silently preserve `@engi/*`, `Engi`, or Engi-branded sample values after Bitcode promotion
  fifth-gate active-product naming witnesses now also cover canonical auxillary step aliases and retained teaching/example carriers such as `uapi/app/auxillaries/components/Auxillaries{Credits,Connects,Models,ProfileStep}.tsx`, active test imports under `uapi/tests/{creditsStep*,connectionsStep*,modelsStep*,profileStep*,orbitals*}.tsx`, retained docs/examples in `packages/{doc-comment,figma,generic-tools,system-grep,testing,executions-mcp}/*`, and active e2e/story fixtures like `uapi/tests/e2e/conversation-digest-pipeline.test.ts`, `uapi/tests/e2e/fixtures/stories/killBug.json`, and `uapi/stories/{SourceDivider,SourceConfig}.stories.tsx`, so fifth-gate proof covers canonical auxillary ownership in tests and the remaining sample-product teaching layer rather than stopping at runtime/package code alone

### Gate 5: Bitcode rename completion, proof precision, and system completeness

Required system families:
- environment/debug coherence
- production/staging/development mode completeness
- migration/schema/type/API closure for retained storage systems
- retained-package admissibility proof
- active-source product naming retirement
- fifth-gate closure witnesses for retained app/package/runtime carriers
- proof-bearing closure for newly admitted application, API, MCP, prompt, ChatGPT-app, and retained package systems at the same standard as the earlier proved Bitcode core

Required coverage posture:
- spec:
  final closure conditions are explicit
- tests:
  mode behavior, naming-retirement witnesses, and closure gates are exercised
- proof surface:
  generated V26 proof appendix and reports become fifth-gate blockers

### Gate 6: old-world system reform into Bitcode market infrastructure

Required system families:
- retained old-world system admissibility and cut decisions
- need-measuring agency reform for retained execution/tool/agent carriers
- webhook and web-search role adjudication
- compatibility-carrier retirement where reform does not justify survival
- explicit post-cut-over Bitcode application map:
  - `activity`
  - `transactions`
  - `conversations`
  - `auxillaries`
- ChatGPT-style parity expectations for the in-app conversations surface and the retained ChatGPT app surface

Required coverage posture:
- spec:
  retained old-world systems have explicit Bitcode roles or cut decisions
- tests:
  reformed systems are still exercised where admitted, cut systems are not silently required by active carriers, and the post-cut-over application map is covered as explicit Bitcode product truth rather than residual route glue
- proof surface:
  later-gate reform artifacts explicitly name what was kept, cut, or isolated

### Gate 7: whole-repository provation and final V26 closure

Required system families:
- whole-repository production satisfaction
- prompt-space completeness
- total V26 closure
- final application/API/MCP/ChatGPT-surface alignment

Required coverage posture:
- spec:
  total repository closure is explicit
- tests:
  whole-repository final witnesses exercise the kept V26 system as one Bitcode application
- proof surface:
  generated V26 proof appendix and reports become seventh-gate final closure blockers

## Immediate V26 code-system assignments

Current active assignments:
- `uapi/app/api/vcs/[provider]/connection/route.ts`
  test coverage:
  route response tests and browser verification through orbitals
  proof surface:
  second-gate external interfacing hardening and parity matrix
- `uapi/app/api/vcs/[provider]/repositories/route.ts`
  test coverage:
  route response tests and repository-selector behaviors
  proof surface:
  second-gate give-side repository context readiness
- `uapi/app/application/ApplicationRepositoryContextPanel.tsx`
  test coverage:
  browser verification plus repository-selection helper coverage
  proof surface:
  second-gate give-side repository context readiness inside `/application`
- `packages/bitcode/public/app.js`
  test coverage:
  semantic snapshot bridge verification through route-local normalization tests and live application checks
  proof surface:
  second-gate admissible shell snapshot and shell control exposure for native application composition
- `packages/bitcode/src/client-entry.js`
  test coverage:
  semantic snapshot bridge exercised by application-owned give/need normalization, shell-bridge tests, and live `/application` review
  proof surface:
  second-gate package-to-application bridge for mounted-shell semantic state and command/intake control, including host-wait and fail-closed snapshot reads during bootstrap windows
- `uapi/app/application/application-shell-bridge.tsx`
  test coverage:
  `uapi/tests/applicationShellBridge.test.tsx`
  proof surface:
  centralized mounted-shell polling and control refresh for second-gate application carriers, including fail-closed refresh behavior during pre-mount and hot-reload rebuild windows
- `uapi/app/api/executions/_shared.ts`
  test coverage:
  `uapi/tests/deliverablesHistoryRoute.test.ts`, `uapi/tests/deliverablesHistoryRunRoute.test.ts`, and `uapi/tests/usePipelineExecution.test.tsx`
  proof surface:
  normalized current execution-history payload shape shared by the transaction master, selected-transaction detail, and retained execution readers
- `uapi/app/api/executions/history/route.ts`
  test coverage:
  `uapi/tests/deliverablesHistoryRoute.test.ts`
  proof surface:
  current app-owned execution-history collection route for transaction-master hydration, including anonymous-safe empty GET posture
- `uapi/app/api/executions/history/[runId]/route.ts`
  test coverage:
  `uapi/tests/deliverablesHistoryRunRoute.test.ts` and `uapi/tests/usePipelineExecution.test.tsx`
  proof surface:
  current app-owned selected-execution history route for selected-transaction detail and retained execution activity hydration, including anonymous-safe empty GET posture
- `uapi/app/api/client-error/route.ts`
  test coverage:
  `uapi/tests/api/clientErrorRoute.test.ts`
  proof surface:
  second-gate runtime-health intake so client-side application failures are accepted by an app-owned carrier instead of 404ing
- `uapi/app/auxillaries/components/AuxillariesProfilePane.tsx`
  test coverage:
  live `/application` verification with fullscreen orbitals entry exercised from the running app
  proof surface:
  second-gate orbitals renderability from `/application`, including the active data-sharing pane hookup required to avoid missing-overlay crashes
- `uapi/app/auxillaries/components/AuxillariesProvider.tsx`
  test coverage:
  `uapi/tests/orbitalsProvider.test.tsx` plus live `/application` verification with orbitals entry exercised from the running app
  proof surface:
  second-gate fullscreen orbitals portal readiness from `/application`, including first-open rendering when the shared event bridge fires before the overlay container would otherwise be visible to React
- `uapi/app/api/auxillaries/model-preferences/route.ts`
  test coverage:
  `uapi/tests/api/userModelPreferencesRoute.test.ts`
  proof surface:
  second-gate application-owned signed-in orbital preference persistence, including authenticated read posture, lead/admin write posture, mock-mode fallback, and app-owned save ownership for orbital defaults
- `uapi/app/api/auxillaries/user/data-share/route.ts`
  test coverage:
  `uapi/tests/api/orbitalsUserDataShareRoute.test.ts`
  proof surface:
  second-gate profile-owned repository knowledge-sharing carrier so contained orbital routes fail closed to JSON instead of missing-route HTML during onboarding and review posture
- `uapi/app/auxillaries/components/AuxillariesInterfacesPane.tsx`
  test coverage:
  `uapi/tests/orbitalsInterfacesPane.test.tsx`
  proof surface:
  second-gate `Interfaces` orbital ownership, including shared orbital workspace section, stat, and preference carriers plus model, prompt, and operator-default posture
- `uapi/app/auxillaries/components/AuxillariesBTDPane.tsx`
  test coverage:
  `uapi/tests/orbitalsBTDPane.test.tsx`
  proof surface:
  second-gate `$BTD` orbital ownership, including wallet and share posture, settlement and history return defaults, and app-owned preference saving through the orbital route carrier
- `uapi/components/base/engi/layout/nav.tsx`
  test coverage:
  `uapi/tests/navWorkspaceChrome.test.tsx` plus live `/application` verification
  proof surface:
  second-gate workspace-chrome discipline for unauthenticated application and orbital routes, replacing disabled marketing CTA behavior with deliberate access/create-account actions
- `uapi/components/base/engi/layout/user-menu.tsx`
  test coverage:
  `uapi/tests/userMenu.test.tsx`
  proof surface:
  second-gate signed-in workspace chrome discipline so Auxillaries stay user-facing as `Open Auxillaries fullscreen` with the fixed Connects/Interfaces/Profile/$BTD ring model and the shared retained `orbitals` entry alias instead of settings/account wording
- `uapi/app/orbitals/components/OrbitalsLoginPane.tsx`, `uapi/app/orbitals/components/OrbitalsContent.tsx`, `uapi/app/orbitals/components/shared/OrbitalsPaneTabs.tsx`, `uapi/app/orbitals/components/shared/OrbitalsWorkspacePanels.tsx`, `uapi/app/orbitals/OrbitalsRouteClient.tsx`
  test coverage:
  `uapi/tests/orbitalsLoginPane.test.tsx`, `uapi/tests/orbitalsContent.test.tsx`, `uapi/tests/orbitalsWorkspacePanels.test.tsx`, `uapi/tests/orbitalsRouteClient.test.tsx`, and `uapi/tests/orbitalPaneMeta.test.ts`
  proof surface:
  second-gate orbitals-first access-shell discipline so contained entry and focused orbital routes preserve Connects/Interfaces/Profile/$BTD language, keep a contained operator shell with contained orbital reads, route contained rails through shared panel/tabs carriers instead of older floating ring-label sequence furniture, and retain shared fullscreen/open/return wording instead of generic workspace/settings/account furniture
- `uapi/components/base/engi/notifications/NotificationsWidget.tsx`
  test coverage:
  `uapi/tests/notificationsWidget.test.tsx`
  proof surface:
  second-gate operator-facing notification posture so proof closure, repository activity, and review prompts remain part of the workspace chrome rather than generic account furniture, and signed-in follow-through reopens Orbitals instead of the sign-up window
- `uapi/styles/orbital.css`
  test coverage:
  live browser verification on `host.docker.internal:3000/application?...` and `host.docker.internal:3000/auxillaries/profile`
  proof surface:
  second-gate contained-operator-shell stability so application-opened orbitals no longer collapse back to modal-width access furniture and both contained/direct orbital surfaces stay renderable with no error-level console output
- `uapi/components/base/engi/layout/workspace-surface.ts`
  test coverage:
  `uapi/tests/workspaceSurface.test.ts`
  proof surface:
  shared second-gate route classification for application/orbital/conversation chrome, including footer suppression on operator routes and stable navbar-surface selection
- `packages/bitcode/public/app.js`
  test coverage:
  live `/application` verification through the preserved runtime tooltip/footer layer and
  `packages/bitcode/test/v26-public-copy.test.js`
  proof surface:
  preserved-runtime user-facing copy discipline, including live-surface/reference-topic tooltip labels, friendly reference-chip naming, and removal of demo-era language from visible help surfaces
- `packages/bitcode/public/telemetry.js`
  test coverage:
  `packages/bitcode/test/v26-public-copy.test.js`
  proof surface:
  preserved-runtime telemetry labeling discipline so operator-visible diagnostics report as `[bitcode-runtime]` instead of leaking `[engi-demo]`
- `packages/bitcode/public/index.html`
  test coverage:
  live `/application` verification through the preserved runtime drawer and direct runtime load expectations
  proof surface:
  preserved-runtime HTML parity for closure-runtime, flow-guide, give, need, and deliverables wording so direct runtime inspection does not regress to prototype/tutorial copy
- `uapi/app/application/application-command-state.ts`
  test coverage:
  `uapi/tests/applicationCommandState.test.ts`
  proof surface:
  deterministic normalization of shell command posture, flow-guide continuity, preserved-shell tutorial compatibility input, and option sets into route-local application command state
- `uapi/app/application/ApplicationCommandDeck.tsx`, `uapi/app/application/ApplicationLiveSummaryStrip.tsx`, `uapi/app/application/ApplicationSectionAtlas.tsx`, `uapi/app/application/ApplicationPreservedShellSurface.tsx`, `uapi/app/application/ApplicationTransactionWorkspace.tsx`, `uapi/app/application/application-run-data.ts`, `uapi/app/orbitals/components/OrbitalsInterfacesPane.tsx`, `uapi/app/orbitals/components/OrbitalsBTDPane.tsx`, `uapi/app/orbitals/components/OrbitalsModelsPane.tsx`, `uapi/components/base/engi/notifications/notification-presentation.ts`, `uapi/components/base/engi/layout/user-menu.tsx`
  test coverage:
  `uapi/tests/applicationCommandPresentation.test.ts`,
  `uapi/tests/applicationFlowGuide.test.ts`,
  `uapi/tests/applicationWorkspaceRailCard.test.tsx`,
  `uapi/tests/orbitalsInterfacesPane.test.tsx`,
  `uapi/tests/orbitalsBTDPane.test.tsx`,
  `uapi/tests/orbitalsContent.test.tsx`,
  `uapi/tests/orbitalsRouteClient.test.tsx`,
  `uapi/tests/notificationsWidget.test.tsx`,
  `uapi/tests/userMenu.test.tsx`
  proof surface:
  third-gate review-surface wording discipline on active `/application` and canonical `/auxillaries` carriers so visible product copy reads as `Transactions` and `Auxillaries` rather than lingering `workspace` / `transaction terminal` residue, while laptop-width transactions reading stays centered on the main column until the support rail expands at `2xl`
- `uapi/app/application/ApplicationOperatorCard.tsx`
  test coverage:
  `uapi/tests/applicationOperatorCard.test.tsx`
  proof surface:
  second-gate shared application workspace shell/help carrier for route-local workspace framing, reusable header posture, and user-facing copy discipline
- `.engi/v26-gate-checkpoint-report.json`
  test coverage:
  `packages/bitcode/test/proven-generator.test.js`
  proof surface:
  explicit first+second-gate closure witness for the near-term V26 commit boundary, including third-gate preparation posture before full V26 promotion
- `README.md`, `uapi/README.md`, `packages/bitcode/README.md`, `uapi/app/application/README.md`, `uapi/app/auxillaries/README.md`, `uapi/app/orbitals/README.md`, `uapi/components/base/engi/README.md`, `uapi/components/base/engi/execution/README.md`
  test coverage:
  generated file-presence checks inside `.engi/v26-gate-checkpoint-report.json` plus spec-family validation
  proof surface:
  second-gate documentation/refurbishment closure for the active Bitcode root, route, orbital, execution, shared-component, and package owners
- `uapi/app/(root)/components/MarketingLandingPage.tsx`, `uapi/app/(root)/components/landing/MarketingLandingHero.tsx`, `uapi/app/(root)/components/landing/MarketingLandingPillarCard.tsx`, `uapi/app/(root)/components/landing/MarketingLandingGuideCard.tsx`, `uapi/app/(root)/components/landing/MarketingLandingTerminalPreview.tsx`, `uapi/app/(root)/components/landing/marketing-landing-shared.tsx`, `uapi/components/base/engi/layout/footer.tsx`, `uapi/components/base/engi/layout/bitcode-public-copy.ts`, `uapi/app/(root)/components/PublicDocsPageContent.tsx`, `uapi/app/docs/page.tsx`, `uapi/app/demo-video/page.tsx`, `uapi/app/(root)/components/MarketingOperatorGuideCard.tsx`, `uapi/app/(root)/components/marketing-operator-guide-assets.ts`
  test coverage:
  `uapi/tests/marketingLandingPage.test.tsx`, `uapi/tests/footerPublicShell.test.tsx`, `uapi/tests/marketingOperatorGuideCard.test.tsx`, `uapi/tests/publicDocsPageContent.test.tsx`, and `uapi/tests/e2e/landing.mobile-scroll.spec.ts`
  proof surface:
  mounted third-gate public-shell start, including shared `Network` / `Transactions` / `Docs` / `Auxillaries` vocabulary, a real `/docs` public teaching surface with route cards and inline widgets, guest auxillary-entry CTA posture, a landing shell that no longer carries live `ComingSoon*` owners or `coming-soon-*` stylesheet imports, a mounted landing owner that now delegates hero/guide/preview/shared data into clearer carriers, a progressive terminal preview that collapses into a compact public/mobile summary before wider-shell detail, landing ambience that suppresses orbital rings/pointer glow/oversized blur on smaller or reduced-motion shells, and a docs-owned walkthrough path that no longer narrates Bitcode through demo-era or developer-path copy or preserve ordered demo-era guide-media compatibility
- `uapi/app/(root)/components/PublicShellFrame.tsx`, `uapi/components/base/engi/layout/nav.tsx`, `uapi/components/base/engi/layout/NavBrand.tsx`, `uapi/components/base/engi/layout/workspace-surface.ts`, `uapi/components/base/engi/layout/footer.tsx`, `uapi/components/base/engi/layout/bitcode-public-explainers.ts`
  test coverage:
  `uapi/tests/navPublicShell.test.tsx`, `uapi/tests/navBrand.test.tsx`, and `uapi/tests/navWorkspaceChrome.test.tsx`
  proof surface:
  mounted third-gate public-route chrome, including live Bitcode nav on `/`, `/docs`, and `/demo-video`, stable public-route entry links, shared public-shell explainers for key entry links and the protocol reference, explicit `Bitcode Network` / `Bitcode Docs` / `Bitcode Transactions` route-title posture, a protocol-spec link that resolves through the stable canonical pointer instead of a version-specific public spec URL, a mobile-first footer card/chip posture that keeps route links and protocol/version metadata legible on narrow shells, public-shell orbital access that opens the contained Bitcode overlay instead of stopping at page-local CTA copy, a responsive stacked public-nav posture that avoids hiding the primary entry paths behind extra menu state, and a compatibility `/demo-video` alias that resolves back into docs-owned content
- `uapi/app/application/ApplicationWorkspaceRailCard.tsx`
  test coverage:
  `uapi/tests/applicationWorkspaceRailCard.test.tsx`
  proof surface:
  second-gate compact shared application-shell/help carrier for the right-rail posture, including explainer continuity and user-facing copy framing
- `uapi/app/application/application-operator-explainers.ts`
  test coverage:
  consumed through component tests and lint plus live `/application` verification
  proof surface:
  shared application explainer catalog for give, need, deposit, closure, and workspace-map help posture carried forward into the production application
- `uapi/app/application/ApplicationCommandDeck.tsx`
  test coverage:
  lint plus live `/application` verification through the shell command/control bridge
  proof surface:
  second-gate application-owned command posture for scenario, projection, branch mode, guide continuity, reset, and branch creation
- `uapi/app/application/application-live-summary.ts`
  test coverage:
  `uapi/tests/applicationLiveSummary.test.ts`
  proof surface:
  deterministic normalization of the shell summary bridge into route-local application operating posture
- `uapi/app/application/ApplicationLiveSummaryStrip.tsx`
  test coverage:
  lint plus localhost `/application` verification with route-local summary posture mounted
  proof surface:
  second-gate application-owned operating summary reading from semantic shell state rather than rendered shell cards
- `uapi/app/application/application-section-atlas.ts`
  test coverage:
  `uapi/tests/applicationSectionAtlas.test.ts`
  proof surface:
  deterministic normalization of section-atlas previews from semantic core and closure bridges into route-local application navigation state
- `uapi/app/application/ApplicationSectionAtlas.tsx`
  test coverage:
  lint plus localhost `/application` verification with semantic atlas cards mounted
  proof surface:
  second-gate application-owned section atlas reading from semantic bridges rather than rendered shell panel markup
- `uapi/app/application/ApplicationSupplySelectionPanel.tsx`
  test coverage:
  `uapi/tests/applicationSupplySelection.test.ts` for normalized supply-selection state plus lint and live `/application` verification for the shared operator-shell framing
  proof surface:
  second-gate give-side supply terminal with shared application-shell/help posture, user-facing copy discipline, and explicit auth/filter/search/inventory continuity inside `/application`
- `uapi/app/application/application-core-surface.ts`
  test coverage:
  `uapi/tests/applicationCoreSurface.test.ts`
  proof surface:
  deterministic normalization of operating, depositing, needing, and fit semantics from the shell snapshot into route-local application core panels
- `uapi/app/application/ApplicationCoreNativeSections.tsx`
  test coverage:
  lint plus localhost `/application` verification with core panels mounted from the semantic bridge
  proof surface:
  second-gate application-owned master-detail core composition reading from the semantic `coreSurface` bridge instead of rendered shell DOM
- `uapi/app/application/application-give-need-workbench.ts`
  test coverage:
  `uapi/tests/applicationGiveNeedWorkbench.test.ts`
  proof surface:
  deterministic normalization of give, need, and fit action detail from the shell snapshot into route-local Bitcode application composition
- `uapi/app/application/ApplicationGiveNeedWorkbench.tsx`
  test coverage:
  browser verification and UI review around route-local give/need action detail
  proof surface:
  second-gate application-owned action detail for repository supply, measured demand, and fit intent
- `uapi/app/application/ApplicationActionWorkbenchCard.tsx`
  test coverage:
  `uapi/tests/applicationActionWorkbenchCard.test.tsx`
  proof surface:
  retained late-Engi design-system card reuse under Bitcode-owned action composition, now grounded in shared execution-level metric, row, and chip carriers
- `uapi/app/application/application-transactions.ts`
  test coverage:
  `uapi/tests/applicationTransactions.test.ts`
  proof surface:
  deterministic normalization and filtering of Bitcode transactions into a searchable master-detail table carrier, including participant/proof-posture filters and explicit sort posture
- `uapi/app/application/ApplicationTransactionsTable.tsx`
  test coverage:
  lint plus localhost `/application` verification with the transactions master surface mounted
  proof surface:
  second-gate application-owned orchestration of transaction selection, `transactionId` route posture, filter state, active-filter chip posture, and route-owned pagination
- `uapi/app/application/application-transaction-source.ts`
  test coverage:
  `uapi/tests/applicationTransactionSource.test.ts`
  proof surface:
  deterministic resolution of `live`, `mock-review`, and `review-fallback` transaction-source posture from live history plus the selected transaction URL, so explicit mock review URLs fail over to interactive review state instead of emptying `/application`
- `uapi/app/application/application-transaction-query.ts`
  test coverage:
  `uapi/tests/applicationTransactionQuery.test.ts`
  proof surface:
  deterministic parsing, persistence, compatibility fallback, detail-focus persistence, `transaction`-preferred detail routing, shared default filter/pagination carriers, route-owned pagination carriers, and reset behavior for route-owned transaction query state
- `uapi/components/base/engi/execution/bitcode-transaction-active-filters.ts`
  test coverage:
  `uapi/tests/bitcodeTransactionActiveFilters.test.ts`
  proof surface:
  deterministic normalization of non-default transaction filters into readable active-filter chips plus one-at-a-time default reset behavior
- `uapi/components/base/engi/execution/BitcodeTransactionsActiveFilters.tsx`
  test coverage:
  `uapi/tests/bitcodeTransactionsActiveFilters.test.tsx`
  proof surface:
  reusable active-filter chip carrier for the transactions surface, keeping the shaped master window explicit and individually clearable
- `uapi/app/application/ApplicationTransactionDetailActionBar.tsx`
  test coverage:
  lint plus localhost `/application` verification with route-owned detail focus and closure actions mounted
  proof surface:
  application-owned detail interaction and closure follow-through inside the selected-transaction carrier
- `uapi/app/application/application-transaction-detail.ts`
  test coverage:
  `uapi/tests/applicationTransactionDetail.test.ts`
  proof surface:
  deterministic closure follow-through normalization for inline settlement metrics, proof families, branch artifacts, recent transaction history, and reusable closure raw-payload inspection
- `uapi/app/application/ApplicationTransactionClosureCard.tsx`
  test coverage:
  `uapi/tests/applicationTransactionDetailCards.test.tsx`
  proof surface:
  explicit closure summary and settlement/branch follow-through carrier inside selected-transaction detail, including the shared visual-vs-raw payload posture
- `uapi/app/application/ApplicationTransactionProofsCard.tsx`
  test coverage:
  `uapi/tests/applicationTransactionDetailCards.test.tsx`
  proof surface:
  explicit proofs detail carrier inside selected-transaction detail
- `uapi/app/application/ApplicationTransactionHistoryCard.tsx`
  test coverage:
  `uapi/tests/applicationTransactionDetailCards.test.tsx`
  proof surface:
  explicit history detail carrier inside selected-transaction detail
- `uapi/components/base/engi/execution/BitcodeDetailCollection.tsx`
  test coverage:
  `uapi/tests/bitcodeDetailCollection.test.tsx`
  proof surface:
  reusable execution-level carrier for proof/history-style transaction detail collections
- `uapi/components/base/engi/execution/BitcodeDetailPanel.tsx`
  test coverage:
  `uapi/tests/bitcodeDetailPanel.test.tsx`
  proof surface:
  reusable execution-level carrier for master-detail substructure preview panels inside the Bitcode transaction workspace
- `uapi/app/application/ApplicationTransactionClosureCard.tsx`
  test coverage:
  lint plus localhost `/application` verification with inline closure follow-through mounted in selected-transaction detail
  proof surface:
  application-owned lower closure reading inside the selected-transaction carrier rather than shell-section-only follow-through
- `uapi/components/base/engi/execution/BitcodeTransactionsTable.tsx`
  test coverage:
  lint plus application-level verification through the route-local transactions carrier
  proof surface:
  reusable base-component table carrier for searchable Bitcode transaction master-detail UI
- `uapi/components/base/engi/execution/BitcodeTransactionsOverview.tsx`
  test coverage:
  lint plus application-level verification through the transactions master carrier
  proof surface:
  reusable overview metrics and mode posture carrier for transaction-master SRP decomposition
- `uapi/components/base/engi/execution/BitcodeTransactionsFilterBar.tsx`
  test coverage:
  lint plus `uapi/tests/applicationTransactions.test.ts` and `uapi/tests/bitcodeTransactionsFilterBar.test.tsx`
  proof surface:
  reusable field-filter and sort-control carrier for transaction-master SRP decomposition, including explicit accessible control naming under shared explainers
- `uapi/components/base/engi/execution/BitcodeTransactionsDataTable.tsx`
  test coverage:
  lint plus application-level verification through the transactions master carrier
  proof surface:
  reusable row-selection and detail-entry carrier for transaction-master SRP decomposition, including shared header explainers
- `uapi/components/base/engi/execution/BitcodeTransactionsPagination.tsx`
  test coverage:
  `uapi/tests/bitcodeTransactionsPagination.test.tsx`
  proof surface:
  reusable pagination carrier for the route-owned Bitcode transactions master surface, including shared page-size explainers
- `uapi/components/base/engi/execution/bitcode-transaction-data-mode.ts`
  test coverage:
  `uapi/tests/bitcodeTransactionDataMode.test.ts`
  proof surface:
  typed source-mode contract for transaction overview, support-rail labeling, and review-fallback posture across the Bitcode transaction workspace
- `uapi/components/base/engi/execution/BitcodeInlineExplainer.tsx`
  test coverage:
  `uapi/tests/bitcodeInlineExplainer.test.tsx`
  proof surface:
  reusable second-gate explainer/tooltip carrier for the transactions surface
- `uapi/components/base/engi/execution/BitcodePayloadInspector.tsx`
  test coverage:
  `uapi/tests/bitcodePayloadInspector.test.tsx`
  proof surface:
  reusable visual-vs-raw payload carrier with copy support, payload metadata, structured payload summaries, and shared explainers for selected-transaction detail
- `uapi/components/base/engi/execution/BitcodePayloadShape.tsx`
  test coverage:
  `uapi/tests/bitcodePayloadShape.test.tsx`
  proof surface:
  reusable structured payload summary carrier for selected-transaction detail, exposing root kind, top-level counts, and previewable field/item posture before raw JSON inspection
- `uapi/components/base/engi/execution/BitcodePayloadTree.tsx`
  test coverage:
  `uapi/tests/bitcodePayloadTree.test.tsx`
  proof surface:
  reusable bounded nested payload-tree carrier for selected-transaction detail, exposing structural JSON fields and types before raw inspection
- `uapi/components/base/engi/execution/BitcodeDetailRowList.tsx`
  test coverage:
  `uapi/tests/bitcodeDetailRowList.test.tsx`
  proof surface:
  reusable key-value row carrier for SRP-aligned selected-transaction identity and closure reading
- `uapi/components/base/engi/execution/BitcodeMetricGrid.tsx`
  test coverage:
  `uapi/tests/bitcodeMetricGrid.test.tsx`
  proof surface:
  reusable metric-grid carrier for selected-transaction overview and closure follow-through
- `uapi/components/base/engi/execution/BitcodeChipCloud.tsx`
  test coverage:
  browser verification and card-level integration through `uapi/tests/applicationTransactionDetailCards.test.tsx`
  proof surface:
  reusable chip-cloud carrier for branch artifacts and later selected-transaction detail token clouds
- `uapi/components/base/engi/execution/BitcodeActionPillRow.tsx`
  test coverage:
  `uapi/tests/bitcodeActionPillRow.test.tsx`
  proof surface:
  reusable action-pill carrier for selected-transaction verification, settlement, branch, and history follow-through inside transaction detail
- `uapi/components/base/engi/execution/BitcodeExecutionStreamPanel.tsx`
  test coverage:
  `uapi/tests/bitcodeExecutionStreamPanel.test.tsx`
  proof surface:
  reusable execution-stream carrier for shared header/log/work-update composition across `/application`, conversations, and `/executions`
- `uapi/components/base/engi/execution/bitcode-transaction-explainers.ts`
  test coverage:
  covered indirectly through `uapi/tests/bitcodeInlineExplainer.test.tsx`, `uapi/tests/bitcodeTransactionsFilterBar.test.tsx`, `uapi/tests/bitcodePayloadInspector.test.tsx`, `uapi/tests/bitcodePayloadShape.test.tsx`, and `uapi/tests/bitcodePayloadTree.test.tsx`
  proof surface:
  centralized explainer-copy contract for transaction filters, headers, pagination, raw payload posture, structured payload posture, and nested payload-tree posture
- `uapi/components/base/engi/execution/BitcodePayloadDetailCard.tsx`
  test coverage:
  `uapi/tests/bitcodePayloadDetailCard.test.tsx`
  proof surface:
  reusable selected-transaction card shell that composes payload inspection and action pills into one execution-level carrier
- `uapi/components/base/engi/execution/BitcodePayloadRowsCard.tsx`
  test coverage:
  `uapi/tests/bitcodePayloadRowsCard.test.tsx`
  proof surface:
  reusable payload-plus-rows carrier for selected-transaction identity and other row-shaped Bitcode detail cards
- `uapi/components/base/engi/execution/BitcodePayloadCollectionCard.tsx`
  test coverage:
  `uapi/tests/bitcodePayloadCollectionCard.test.tsx`
  proof surface:
  reusable payload-plus-collection carrier for proof/history and other list-shaped Bitcode detail cards
- `uapi/components/base/engi/execution/bitcode-transaction-types.ts`
  test coverage:
  imported through `uapi/tests/applicationTransactions.test.ts`, `uapi/tests/applicationTransactionQuery.test.ts`, and `uapi/tests/bitcodeTransactionsPagination.test.tsx`
  proof surface:
  typed base-component contract for transaction-master filtering, overview, pagination, and row-selection carriers
- `uapi/app/application/application-supply-selection.ts`
  test coverage:
  `uapi/tests/applicationSupplySelection.test.ts`
  proof surface:
  deterministic normalization of authenticated intake session, artifact filter, search, and selected inventory entries into route-local application intake state
- `uapi/app/application/ApplicationSupplySelectionPanel.tsx`
  test coverage:
  lint plus live `/application` verification through the shell command/control bridge
  proof surface:
  second-gate application-owned give-side intake control for session binding, inventory filtering, search, and artifact selection
- `uapi/app/application/application-deposit-composer.ts`
  test coverage:
  `uapi/tests/applicationDepositComposer.test.ts`
  proof surface:
  deterministic normalization of deposit-auth session defaults, selected inventory continuity, and signer/source-repo defaults into route-local deposit-composer state
- `uapi/app/application/ApplicationDepositComposer.tsx`
  test coverage:
  lint plus localhost route verification with the app-owned deposit carrier present in `/application`
  proof surface:
  second-gate application-owned native deposit submission against the app-owned Bitcode intake route
- `uapi/app/application/application-need-scenarios.ts`
  test coverage:
  `uapi/tests/applicationNeedScenarios.test.ts`
  proof surface:
  deterministic normalization of active scenario cards, parser posture, closure counts, and target-kind counts into route-local need-scenario state
- `uapi/app/application/ApplicationNeedScenarioPanel.tsx`
  test coverage:
  lint plus localhost `/application` verification with route-local scenario selection mounted
  proof surface:
  second-gate application-owned native need selection through the Bitcode shell control bridge
- `uapi/app/application/application-closure-state.ts`
  test coverage:
  `uapi/tests/applicationClosureState.test.ts`
  proof surface:
  deterministic normalization of verification, branch, settlement, and ledger semantics from the shell snapshot into application-owned closure state
- `uapi/app/application/ApplicationClosureNativeSections.tsx`
  test coverage:
  lint plus localhost `/application` verification with native closure cards mounted
  proof surface:
  second-gate application-owned closure composition reading from the semantic `closureSurface` bridge instead of rendered shell DOM
- `uapi/app/application/application-closure-controls.ts`
  test coverage:
  `uapi/tests/applicationClosureControls.test.ts`
  proof surface:
  deterministic normalization of closure execution, reset, refresh, and follow-through posture from the command and closure semantic bridges
- `uapi/app/application/ApplicationClosureControlDeck.tsx`
  test coverage:
  lint plus localhost `/application` verification with route-local closure operation controls mounted
  proof surface:
  second-gate application-owned closure operation deck rather than implicit preserved-shell action ownership
- `uapi/app/application/ApplicationExternalInterfacingPanel.tsx`
  test coverage:
  browser/API verification plus runtime-normalization helper coverage
  proof surface:
  second-gate boundary honesty and external-interfacing stable readiness inside `/application`
- `uapi/app/application/application-repository-context.ts`
  test coverage:
  `uapi/tests/applicationRepositoryContext.test.ts`
  proof surface:
  deterministic repository-provider normalization and selected-repository derivation for the give-side application frame
- `uapi/app/application/application-external-runtime.ts`
  test coverage:
  `uapi/tests/applicationExternalRuntime.test.ts`
  proof surface:
  deterministic runtime-state normalization and blocking-interface classification for the application-owned external posture carrier
- `uapi/app/api/vcs/[provider]/oauth/route.ts`
  test coverage:
  route behavior tests and redirect contract checks
  proof surface:
  second-gate auth/VCS interface admissibility
- `uapi/app/api/vcs/[provider]/connect-token/route.ts`
  test coverage:
  route response tests for mock mode and error/success handling
  proof surface:
  second-gate external interfacing hardening and fallback-connect behavior
- `uapi/app/api/v24/external-realization/route.ts`
  test coverage:
  route response tests for app-owned runtime posture and live localhost verification
  proof surface:
  second-gate external interfacing hardening and native boundary-actuality application read
- `uapi/app/application/ApplicationTransactionWorkspace.tsx`
  test coverage:
  browser verification and UI coverage around transactions/deliverables/proofs/history
  proof surface:
  second-gate master-detail substructure closure
- `uapi/app/application/application-transaction-detail-snapshot.ts`
  test coverage:
  `uapi/tests/applicationTransactionDetailSnapshot.test.ts`
  proof surface:
  deterministic normalization of selected-transaction history payloads into application-owned deliverable/proof/history detail
- `uapi/app/application/application-transaction-detail.ts`
  test coverage:
  `uapi/tests/applicationTransactionDetail.test.ts`
  proof surface:
  deterministic normalization of selected-transaction overview, identity, and closure-read rows into SRP-aligned detail modules
- `uapi/app/application/application-run-activity.ts`
  test coverage:
  `uapi/tests/applicationTransactionActivity.test.ts`
  proof surface:
  deterministic normalization of retained execution events into application-owned Bitcode run-activity detail
- `uapi/components/base/engi/activity/bitcode-activity-model.ts`
  test coverage:
  `uapi/tests/bitcodeActivityModel.test.ts`
  proof surface:
  shared fourth-gate activity vocabulary bridging transactions, retained execution primitives, and personal notification activity before later public/personal system usage joins the same family
- `uapi/app/executions/page.tsx`, `uapi/app/executions/[runId]/page.tsx`, `uapi/app/auxillaries/[pane]/page.tsx`, `uapi/app/orbitals/*/page.tsx`
  test coverage:
  route metadata verification plus live browser checks on retained compatibility routes
  proof surface:
  fourth-gate merged-world naming discipline so retained `/executions` teaches explicit executions primitives inside `activity`, canonical `/auxillaries/*` teaches `auxillaries`, and retained `/orbitals/*` is reduced to redirect-only compatibility that no longer renders canonical HTML
- `uapi/app/application/ApplicationTransactionDetailSurface.tsx`
  test coverage:
  browser verification and UI coverage around live and mock selected-transaction detail rendering
  proof surface:
  second-gate selected-transaction application ownership rather than mock-only inward reuse
- `uapi/app/application/ApplicationTransactionDetailHero.tsx`
  test coverage:
  lint plus `uapi/tests/applicationTransactionDetail.test.ts`
  proof surface:
  reusable overview carrier for selected-transaction detail SRP decomposition
- `uapi/app/application/ApplicationTransactionIdentityCard.tsx`
  test coverage:
  lint plus `uapi/tests/applicationTransactionDetail.test.ts`
  proof surface:
  reusable identity/read carrier for selected-transaction detail SRP decomposition
- `uapi/app/application/ApplicationTransactionClosureCard.tsx`
  test coverage:
  lint plus `uapi/tests/applicationTransactionDetail.test.ts`
  proof surface:
  reusable closure/read-follow-through carrier for selected-transaction detail SRP decomposition
- `uapi/app/application/ApplicationTransactionActivitySurface.tsx`
  test coverage:
  browser verification and UI coverage around central activity/log/work-update rendering
  proof surface:
  second-gate elevation of retained execution/log carriers into Bitcode application ownership
- `uapi/app/conversations/components/ConversationsOverlay.tsx`
  test coverage:
  browser verification and conversations route tests
  proof surface:
  second-gate overlay continuity and fourth-gate conversations retention

## Whole-repository proof closure

V26 proof closure must extend beyond the former demo core.

Required closure posture:
- the retained and repurposed whole repository that remains in V26 production canon must be proven up to Bitcode-grade satisfaction
- any package, component family, route carrier, or application subsystem kept for V26 must have explicit spec, test, and proof-surface ownership
- proof closure may no longer terminate at the old `engi-demo` equivalent core alone; it must close over the production application and surviving packages as one Bitcode system

## Fifth-gate runtime/env naming closure

- `packages/logger/{src/logger.ts,src/logger.js,package.json}`
  test coverage:
  `packages/bitcode/test/v26-active-product-naming.test.js`
  proof surface:
  fifth-gate runtime contract closure so active logging, sidecar emission, and sync helpers converge on `BITCODE_*` env keys, `.bitcode_logs`, and Bitcode-facing package metadata
- `packages/agent-generics/{README.md,TLDR.md,src/diagnostics/config.ts,src/diagnostics/instrumentation.ts,src/execution/AgentExecution.ts,src/agents/factories.ts,src/steps/thricified-generation.ts,src/steps/failsafe-sequence.ts,src/substeps/factories.ts,src/phaseHelpers/normalizeStepName.ts}`
  test coverage:
  `packages/bitcode/test/v26-active-product-naming.test.js`
  proof surface:
  fifth-gate debug and diagnostics contract closure so active PTRR debugging and docs converge on `BITCODE_*` flags and Bitcode-facing runtime teaching
- `packages/pipelines/deliverable/{src/preprocess.ts,src/__dev__/bringup-demo.ts,src/__tests__/metrics-output.test.ts,src/agents/setup/deliverable-pipeline-setup-plan-agent.ts,src/agents/shipping/deliverable-pipeline-create-pull-request-agent.ts}`
  test coverage:
  `packages/bitcode/test/v26-active-product-naming.test.js`
  proof surface:
  fifth-gate deliverable pipeline closure so active bring-up, default branch naming, and LLM env contracts read as Bitcode instead of Engi
- `packages/parsing/src/parsing.ts`
  test coverage:
  `packages/bitcode/test/v26-active-product-naming.test.js`
  proof surface:
  fifth-gate parsing/runtime closure so prompt logging obeys the Bitcode env/debug contract
- `packages/vercel/{src/index.ts,README.md}`
  test coverage:
  `packages/bitcode/test/v26-active-product-naming.test.js`
  proof surface:
  fifth-gate retained package fixture/doc closure so Bitcode-facing ChatGPT App and Vercel fixture surfaces no longer present Engi-era team/org/product strings
- `packages/generic-tools/{repository-setup/package.json,repository-setup/src/index.ts,simple-system-text-search/src/index.ts,files-maintaining/src/index.ts,git-interactor/src/index.ts}`
  test coverage:
  `packages/bitcode/test/v26-active-product-naming.test.js`
  proof surface:
  fifth-gate retained tool-package closure so active package metadata and doc-code teaching no longer present Engi-era product identity
- `uapi/{config/features.ts,app/hero-client.tsx,app/(root)/components/MarketingScreenshotSection.tsx,styles/conversations.css,styles/orbital.css,components/base/engi/layout/footer.tsx,app/fill-gaps.tsx,tests/footerPublicShell.test.tsx}`
  test coverage:
  `uapi/tests/footerPublicShell.test.tsx`, targeted `next lint`, and `packages/bitcode/test/v26-active-product-naming.test.js`
  proof surface:
  fifth-gate active front-end runtime closure so live globals, animation identifiers, CSS selectors, and public outbound references no longer carry unreplaced Engi-era product naming or social-handle residue
- `packages/{conversations-generics/src/agent/ConversationAgent.ts,lsp/src/index.ts,files/src/securityUtils.ts,generic-llms/src/providers/{google.ts,openai.ts,anthropic.ts},generic-llms/tests/unit/registry.test.ts,web-search/src/orchestrator.ts} + uapi/hooks/useConversationStream.ts`
  test coverage:
  `packages/generic-llms/tests/unit/registry.test.ts` and `packages/bitcode/test/v26-active-product-naming.test.js`
  proof surface:
  fifth-gate shared-runtime identity closure so inherited conversational agents, repo-root helpers, LLM mock gating, and search reservation globals converge on Bitcode-facing naming and env contracts
- `packages/{api/src/routes/user.ts,doc-code/jest.config.cjs,doc-code/__mocks__/bitcode-tools-generics.ts,generic-doc-comment-plugins/doc-developing/package.json,supabase/src/{index.js,streams.js}} + uapi/{app/executions/hooks/usePersistedState.ts,hooks/usePatternRecognition.ts,mocking/generators/ComprehensiveMockDataGenerators.ts}`
  test coverage:
  `uapi/tests/{apiKeysRoutes,mcpSmoke}.test.ts`, targeted `next lint`, and `packages/bitcode/test/v26-active-product-naming.test.js`
  proof surface:
  fifth-gate runtime-contract closure so active API-key prefixes, persisted browser-storage keys, pattern-learning keys, mock API-key fixtures, doc-code harness mocks, and shipped Supabase JS artifacts all converge on Bitcode naming instead of carrying silent Engi residue
- `packages/bitcode/{src/bitcode-demo.js,src/attestation-model.js,data/state.json,test/core.test.js}`
  test coverage:
  `packages/bitcode/test/{core.test.js,v26-active-product-naming.test.js}`
  proof surface:
  fifth-gate Bitcode-core identity closure so shipped attestation kinds, policy release ids, system-principal classes, provenance seeds, and retained state-store payloads no longer carry `engi-*` runtime truth inside the promoted Bitcode core
- `packages/bitcode/{src/canonical/v24-external-realization.js,test/core.test.js}`
  test coverage:
  `packages/bitcode/test/{core.test.js,v26-active-product-naming.test.js}`
  proof surface:
  fifth-gate external-realization contract closure so active env controls, GitHub sample bindings, and the branch need artifact name converge on `BITCODE_V24_*`, Bitcode-owned refs, and `BITCODE_NEED.md` instead of preserving `ENGI_V24_*` or `ENGI_NEED.md` inside promoted runtime and proof carriers

## Module namespace proof note

V26 also now treats the `@bitcode/*` module namespace as part of the active proof surface.
That means:
- new active imports must use `@bitcode/*`,
- new workspace package names must use `@bitcode/*`,
- and lingering older Bitcode-scoped module references in active source are parity drift, not harmless style debt.
