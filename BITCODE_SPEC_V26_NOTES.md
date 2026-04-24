# Bitcode Spec V26 Notes

## Status

- Scope: working-note companion for the active V26 canonical family centered on Bitcode productionizing hardening, first-gate application migration, second-gate application UX/UI plus external hardening, third-gate marketing refurbishment, fourth-gate retained-system convergence, and fifth-through-eighth-gate closure
- Canonical pointer: `/Users/garrettmaring/Developer/ENGI/BITCODE_SPEC.txt` -> `V26`
- Active canonical anchor: `/Users/garrettmaring/Developer/ENGI/BITCODE_SPEC_V26.md`
- Active generated proof appendix: `/Users/garrettmaring/Developer/ENGI/BITCODE_SPEC_V26_PROVEN.md`
- Main spec companion: `/Users/garrettmaring/Developer/ENGI/BITCODE_SPEC_V26.md`
- Delta companion: `/Users/garrettmaring/Developer/ENGI/BITCODE_SPEC_V26_DELTA.md`
- Parity companion: `/Users/garrettmaring/Developer/ENGI/BITCODE_SPEC_V26_PARITY_MATRIX.md`
- Current fourth-gate/fifth-gate checkpoint artifact: `/Users/garrettmaring/Developer/ENGI/.bitcode/v26-gate-checkpoint-report.json`
- V26 state: V26 remains active canon; prior through-fourth-gate promotion claims were reopened as overstated and effectively false, retained-system proof families now pass as material evidence, fourth-gate procedural acceptance is promoted closed after generated re-review, and fifth-gate source-to-shares plus closure-deepening evidence has advanced while fifth-, sixth-, seventh-, and eighth-gate closure remain open

## Notes companion rule

This file carries unresolved or still-moving V26 notes only.
It does not reopen the already-landed first-gate source decisions unless source truth actually changes.
It is also the V26 reform ledger: the main SPEC should state the Bitcode system as it is, while this NOTES file may record transition history, former names, old abstractions, and "was this, now is that" mappings when that history is necessary to guide precise fifth-gate implementation work.

The NOTES boundary exists because V26 is both product canon and reformation canon:

- `BITCODE_SPEC_V26.md` must read as a current Bitcode protocol/product/proof specification.
- `BITCODE_SPEC_V26_DELTA.md` must be formally specified as the chronological and architectural delta from the late-Engi repository into commercialized Bitcode; it may include enough color to explain why a retained corridor exists, but it must resolve each retained concept into current Bitcode ownership rather than leaving history as authority.
- `BITCODE_SPEC_V26_PARITY_MATRIX.md` must judge current Bitcode implementation parity without depending on legacy product explanations.
- `BITCODE_SPEC_V26_PROVEN.md` must stay generated evidence rather than historical rationale.
- active comments, prompt metadata, package READMEs, route copy, API payload descriptions, and implementation names must describe current Bitcode behavior directly.
- this NOTES file may be liberal and explicit about what was renamed, removed, isolated, or repurposed so future cleanup does not have to infer historical intent from source residue.

When a reform detail matters to implementation, the required sequence is:

1. record the transition in NOTES with former meaning, Bitcode meaning, source owner, and closure condition;
2. implement or remove the source residue so active source no longer needs the historical explanation;
3. promote only the current Bitcode requirement into the main SPEC/PARITY/proof family;
4. keep any remaining historical wording either in NOTES or under `_legacy/`, not in active product-facing implementation.

## DELTA companion rule

The DELTA file is not a changelog appendage.
For V26 it is a formal specification companion with three required jobs:

- identify the commercialized Bitcode system that now exists where the late-Engi repository supplied reusable product rails, inference infrastructure, prompt/tool/agent abstractions, and application surfaces;
- state the gate-by-gate architectural delta in enough detail that future empty-context work can understand why `protocol-demonstration`, packages, `uapi`, MCP/API surfaces, proof generators, and storage/schema owners are being reformed together rather than renamed independently;
- keep transition color bounded to specification reasoning while the main SPEC, active source comments, package docs, and product copy speak current Bitcode behavior directly.

The DELTA must therefore name both sides of a reform when it materially explains implementation strategy, but it must end every such explanation with current Bitcode owner, source/proof target, and closure condition.
The NOTES file remains the more granular ledger for ongoing "was this, now is that" details; the DELTA is the formal, readable spine of the same repository-scale transformation.

The required DELTA information color is formal too.
When the DELTA describes a late-Engi corridor, it must include enough implementation context for an empty working context to understand:

- former operational job: what the corridor formerly did in the dense commercial software-agent repository;
- which Bitcode object now owns the behavior, such as Need, Need review, fit quality, AssetPack, written asset, delivery mechanism, Exchange state, Terminal route, MCP ingress, prompt primitive, tool, agent, execution, schema, or proof witness;
- why the corridor is retained, repurposed, compatibility-only, archived, deferred, or cut;
- what source files, package names, route/interface owners, database/schema owners, proof generators, or tests are responsible for the current Bitcode behavior;
- what active source must no longer say because transition history belongs in NOTES, DELTA, or `_legacy/`;
- what fifth-gate closure evidence proves the corridor is no longer an unowned legacy remnant.

That color is not permission for current source to narrate history.
The current-source rule remains stricter than the DELTA rule: implementation comments, package docs, prompt labels, API payload descriptions, and route copy must describe the Bitcode object directly unless the file is explicitly a compatibility wrapper or a noncanonical note.

## V26 reform ledger acceptance rule

Every retained corridor must be classified in this NOTES file before full fifth-gate closure can claim it is clean:

- `Repurposed`
  The abstraction remains because it now implements a Bitcode primitive, package, proof, interface, or product behavior.
- `Compatibility wrapper`
  The identifier remains only because callers or storage still require it; the wrapper must point to a Bitcode owner and must not teach product semantics.
- `Removed`
  The corridor is outside Bitcode V26 and is deleted from active registration/source.
- `Archived`
  The idea may remain in `_legacy/` for historical analysis but cannot participate in current proof, implementation, or product behavior.
- `Deferred`
  The corridor is intentionally not V26 capability; any retained stub must fail closed and be named as non-product support.

The fifth-gate closure condition for this ledger is not just naming cleanup. It is current-behavior cleanup:

- active filesystem names must prefer Bitcode nouns when a live owner exists;
- active exported names must prefer Bitcode nouns when a live owner exists;
- prompt classes and PromptParts must identify Bitcode purpose, not historical purpose;
- package docs must explain current Bitcode package roles, not pre-Bitcode product categories;
- tests must prove the canonical owner and any compatibility wrapper boundary;
- generated proof inputs must cite current Bitcode paths wherever the path has been reformed;
- user-facing copy must never require historical knowledge to understand the product.

## Detailed reform ledger: commercial Bitcode infrastructure

This section records transitions that are too historically specific for the main SPEC but necessary for fifth-gate closure discipline.

### Product Frame

| Former/reform source | Current Bitcode owner | Closure meaning |
| --- | --- | --- |
| standalone demonstration shell | `protocol-demonstration/*` plus `/application` | demonstration behavior is preserved only as protocol witness and application substrate; product meaning lives in Bitcode Terminal and Exchange |
| generic application workspace | `uapi/app/application/*` | `/application` is the Terminal master-detail carrier, not a generic workspace |
| separate executions, conversations, and orbital routes as primary surfaces | `/application`, `/conversations`, `/auxillaries` entered from the Terminal | V26 product experience is Terminal master-detail, conversations, and auxillaries as one Bitcode system |
| root marketing/demo public shell | `uapi/app/(root)/*` and `/docs` | public routes teach Bitcode Network, Terminal, Exchange, Protocol, and proofs without demo-era framing |

### Exchange and Terminal Infrastructure

| Former/reform source | Current Bitcode owner | Closure meaning |
| --- | --- | --- |
| route-local run history | `packages/api/src/routes/executions.ts`, `uapi/app/api/executions/*`, Terminal transaction state | execution history is Exchange-readable activity and Terminal transaction detail |
| loose deliverable route output | `/api/deliverables`, execution summaries, `writtenAssets`, `assetPack`, `deliveryMechanism` aliases | compatibility route remains only while output meaning is AssetPack and written assets |
| one-off client error endpoint assumption | `uapi/app/api/client-error/route.ts` | client failure telemetry is app-owned and proof-relevant |
| untyped storage assumptions | `supabase/*`, `packages/supabase/*`, `packages/orm/*`, `packages/orm/src/models/bitcode-execution-storage.ts` | Exchange state persists Bitcode execution, AssetPack, activity, profile, readiness, and proof evidence |
| local wallet/profile ambiguity | `Profile`, `Connects`, signed-settlement readiness, profile storage | manual wallet identity and verified signer/provider access must remain distinct until settlement is actually signed |

### Agentic Pipeline and AssetPack Semantics

| Former/reform source | Current Bitcode owner | Closure meaning |
| --- | --- | --- |
| `deliverable` as product object | AssetPack, written asset, delivery mechanism | stable product output is AssetPack/written assets; delivery mechanisms are wrappers into third-party tools |
| `definitionOfDone` as owning input | `definitionOfNeed`, expressed Need, Need satisfaction criteria | removed from active V26 request/schema semantics; this row remains only as reform history |
| `deliverableType` | `writtenAssetType` | semantic field resolves first; compatibility field is fallback only |
| broad `Shipping` final phase | `Finish` | final phase saves results, records evidence, and invokes narrower delivery mechanisms |
| `Shipping` as providing to external tools | `Delivering` inside Finish | Delivering is specifically third-party AssetPack/AssetPackPartial provision |
| `SDIVS` | `SDIVF` | canonical phased implementation is Setup, Discovery, Implementation, Validation, Finish; Simple remains the other canonical pipeline shape |
| `packages/pipelines/asset-pack/src/agents/shipping/*`, `shipping-agents.ts`, and `deliverable-pipeline-*` Finish carriers | `packages/pipelines/asset-pack/src/agents/finish-compatibility/asset-pack-finish-*`, `agents/prompts/finalize-delivery-evidence-prompt.ts`, and `finish-delivery-compatibility-agents.ts` | filesystem ownership now teaches AssetPack Finish/Delivering first; any `shipping:*` registry keys are compatibility aliases only and must not leak into filenames, exported symbols, or prompt factory names |
| multi-agent pipeline selection | removed from V26 live controls | public orchestration selection is not a Bitcode V26 product feature |
| computer-use as broad agent option | internal Need-measurement evidence behind `BITCODE_ENABLE_COMPUTER_USE_NEED_MEASUREMENT` | feature is not surfaced in Terminal/API implementation, validation, Finish, or public controls |

### Prompt, PromptPart, and Registry Reform

| Former/reform source | Current Bitcode owner | Closure meaning |
| --- | --- | --- |
| root prompt barrel reach-through | `@bitcode/prompts/{prompt,parts/PromptPart,formatters}` and exact raw PromptPart public subpaths | consumers import the minimum public prompt primitive they need |
| package-local prompt text without Registry precision | Registry-backed Prompt and PromptPart owners | generic PromptParts remain in `packages/prompts`; implementation-specific Prompts stay local to the package/interface that uses them |
| task-comprehension package boundary | `packages/generic-tools/need-comprehension`, `@bitcode/generic-tools-need-comprehension`, `packages/generic-agents/need-comprehension`, and `@bitcode/generic-agents-need-comprehension` | generic-tools owns individually defined callable Need-comprehension tools and a collection surface; generic-agents owns the setup/pre-danger-wall PTRR composer; task-named classes remain compatibility wrappers only |
| task-first prompt behavior | Need semantics, Need requirements, Need constraints, Need satisfaction criteria, Need validation, Need satisfaction implementation complexity | canonical prompt classes own the live behavior; task-named prompt files are wrappers only |
| implicit usefulness judgment | source-to-shares service questions and commercial accountability evidence | need-comprehension must ask why/how/when/where/what/who the code serves for an Advanced Engineered Software, Inc. customer and what evidence makes that answer auditable |
| source-co-located build output | TypeScript-only package source plus build output outside `src/` | package proof for commercial Bitcode implementations must not treat generated JavaScript beside TypeScript as active source evidence; the AssetPack package now proves no generated `.js` remains under `packages/pipelines/asset-pack/src` |
| doc-comment prompt injection as experiment | `packages/doc-comment/*`, `packages/doc-code/*`, `packages/generic-doc-comment-plugins/*` | build-time tool prompt descriptions remain valuable support infrastructure when bounded and proven |
| old prompt migration scripts | `_legacy/old-world-prompt-migration-scripts/*` | migration ideas are archived, not active prompt-system owners |

### Inference, Research, and Measurement

| Former/reform source | Current Bitcode owner | Closure meaning |
| --- | --- | --- |
| generic web research | discovery-phase Need synthesis web research | web research is admitted only for source-attributed auxiliary context, third-party planning, proof-gap questions, and AssetPack planning |
| lower-level web search | source-attributed evidence search/content retrieval | search supports discovery and proof; it is not a parallel product |
| text search | repository-evidence search for Need measurement and source-grounding | grep/search supports repository evidence, proof inspection, and AssetPack planning |
| LSP query | measuring/support evidence for Need and fit reasoning | LSP is repurposed into structured source intelligence, not generic code-intelligence product scope |
| danger-wall | Need/AssetPack risk admission | risk gates unsafe mutation, private-data exposure, proof gaps, AssetPack mismatch, delivery-mechanism mismatch, and manual-review triggers |
| field-intelligence | `_legacy/field-intelligence` only | removed from Bitcode active registration; ideas remain historical only |

### Interfaces and Third-Party Boundaries

| Former/reform source | Current Bitcode owner | Closure meaning |
| --- | --- | --- |
| third-party integration as product owner | connected-interface delivery mechanism | GitHub, Jira, ChatGPT App, MCP, Vercel, AWS, and similar surfaces may deliver or ingest but do not own Exchange state |
| ChatGPT App writes without explicit admission | confirmation-gated connected-interface write receipts | write carriers must fail closed unless confirmed and must return admission evidence |
| MCP tool sprawl | narrowed Bitcode MCP tool families | fifth-gate admits only current Exchange-facing families; non-admitted carriers are reference or cut |
| GitHub webhook product trigger | ingress-only AssetPack automation | webhook schedules pipeline automation and records ingress basis; it is not product canon by itself |

### Internal Documentation Reform

| Former note shape | Current Bitcode note owner | Closure meaning |
| --- | --- | --- |
| `internal-docs/DELIVERABLES.md` | `internal-docs/ASSETPACK_EXECUTION.md` | notes teach AssetPack execution and delivery-mechanism separation |
| `internal-docs/EXECUTABLE-PIPELINES.md` | `internal-docs/BITCODE_AGENTIC_EXECUTION.md` | notes teach phases, registries, prompts, tools, computer-use boundary, and Finish |
| `internal-docs/DB.md` | `internal-docs/BITCODE_EXCHANGE_DATABASE.md` | notes teach Exchange persistence and schema reform |
| `internal-docs/API.md` | `internal-docs/BITCODE_API.md` | notes teach server-owned admission and connected interfaces |
| `internal-docs/CHAT.md` | `internal-docs/BITCODE_CONVERSATIONS.md` | notes teach rich-input conversation ingress into Exchange state |
| `internal-docs/PROMPT-ENGINEERING.md` | `internal-docs/BITCODE_PROMPT_SYSTEM.md` | notes teach Prompt, PromptPart, Registry, doc-comment, and Need comprehension requirements |
| `internal-docs/TRACE-PROMPTS.md` | `internal-docs/BITCODE_PROMPT_TRACE.md` | notes teach prompt rendering and traceability |
| `internal-docs/THE_CODELESS_CUSTOMER_EXPERIENCE.md` | `internal-docs/BITCODE_TERMINAL_OPERATOR_EXPERIENCE.md` | notes teach Terminal operator Need review, fit review, settlement, and AssetPack UX |
| `internal-docs/OPENAIDOCS_CHATGPTAPPS.md` | `internal-docs/BITCODE_CHATGPT_APP_INTERFACE.md` | notes teach ChatGPT App as connected Bitcode interface |
| `internal-docs/CRAZY-IDEAS.md`, `internal-docs/CHEMTRAILSRAFLEX.md` | `_legacy/internal-docs-experimental/*` | experimental ideas are not Bitcode active notes |

Internal docs remain non-canonical scratch notes. Their only canonical path is promotion into `BITCODE_SPEC_V26.md`, `BITCODE_SPEC_V26_PARITY_MATRIX.md`, proof surfaces, generated proof artifacts, and source/tests after current Bitcode behavior is implemented.

### Current closure pressure created by this ledger

- Main SPEC historical language should be reduced over the remaining fifth-gate passes; the current main SPEC must increasingly state only present Bitcode requirements.
- PARITY may retain transition judgment only when it names the current Bitcode owner and closure condition.
- Source comments should not explain current code by saying what it used to be; they should explain the Bitcode responsibility.
- Compatibility wrappers should shrink as call sites migrate.
- Any unavoidable compatibility export must have a canonical Bitcode export beside it and tests proving the canonical export is primary.
- Generated proof must be refreshed after every source-bearing reform because stale proof text can otherwise preserve historical meaning.

## First-gate decisions now treated as settled

The following items are no longer open draft questions:

- `/application` is the first-gate Bitcode route carrier.
- `/application` is also the only primary Bitcode destination in the intended V26 product posture.
- the former top-level demo directory is removed.
- `protocol-demonstration` is the immediate first-gate preserved protocol owner.
- the preserved first-gate shell now mounts through `uapi/app/application/ApplicationPageClient.tsx`.
- the preserved first-gate JSON contract now runs through interface-owned `uapi/app/api/*` filesystem route bindings over package-owned `packages/api/src/routes/*` handlers, with deeper behavior imported from narrower subsystem packages rather than absorbed by the Next.js route files themselves; route bindings may import specific `@bitcode/api/src/routes/*` modules instead of an eager top-level barrel when isolated handler loading is required for mock-mode or route-local proof stability.
- the ringed auxillary overlay now reads through canonical `uapi/app/auxillaries/components/*` surface and pane owners, while retained `uapi/app/orbitals/*` code is compatibility-only or reused internals to be retired by full fifth-gate closure.
- conversations remain a fullscreen application mode entered from within `/application`.
- current executions and deliverables surfaces are reuse reservoirs for inward master-detail porting into `/application`.
- fourth-gate merged-world naming now keeps retained `/executions` explicit as executions primitives inside the broader `activity` family and converges retained `/orbitals` on `auxillaries`, with transactions, executions, and notifications explicitly admitted as the broader activity family.
- the preserved late-stage navbar remains the integrated application navigation frame for Bitcode.
- homepage embedded-demo posture remains removed.
- mock-mode `/application` review is part of first-gate closure rather than second-gate work.
- the earlier V26 checkpoint was first-gate plus second-gate closure with explicit third-gate preparation; later through-fourth-gate promotion claims proved overstated and were reopened, and the current checkpoint promotes fourth-gate procedural acceptance closed only through `.bitcode/fourth-gate-reclosure-review-proof.json` plus `.bitcode/v26-gate-checkpoint-report.json`; fifth-gate remains open while source-to-shares and closure-deepening evidence accumulates.
- second-gate closure now includes route/package README refurbishment and user-facing preserved-runtime naming rather than treating those as optional cleanup after code lands.
- fifth-gate closure now explicitly requires zero unreplaced `engi` product naming in active code/copy/route teaching unless the occurrence is historical lineage or a still-required structural namespace such as `.bitcode/` or `_legacy/ENGI_SPEC_*`.
- the active root spec/toolchain family is now part of that same fifth-gate closure: `BITCODE_SPEC*.md`, `BITCODE_SPEC.txt`, and `scripts/check|generate|prepare|promote-bitcode-*.mjs` are canonical, while root `ENGI_SPEC_V26*` and root `ENGI_SPECIFYING.md` are no longer admissible outside `_legacy/`.
- V26 remains the active productization canon; V27 is explicitly reserved for post-productization successor work after fifth-gate minimum-functional closure, sixth-gate MVP elevation, seventh-gate commercial testnet refinement, and eighth-gate provation close the V26 Bitcode transformation.
- retained prompt-system package surfaces are now part of that active naming sweep: `packages/prompts/*` must read as Bitcode in package metadata, benchmarking/docs, promptpart examples, and active identity text while historical filename lineage may remain only where still-needed for safe fifth-gate porting.
- active prompt-system JS carry-through and review-tooling carriers are part of that same fifth-gate proof boundary too: `packages/prompts/src/{index.js,parts/PromptPart.js}` and `scripts/code-review/{REVIEW_EXCELLENCE_GUIDE.md,reviews/review_prompt_primitives_evolution*.sh}` plus `scripts/phase2-naming-compliance.py` must use Bitcode-owned comments, examples, repo paths, and current `raw_promptparts/*` file references rather than silently preserving old-brand wording or dead prompt file paths.
- active prompt/tooling repair scripts are part of that same fifth-gate proof boundary too: `scripts/{fix-remaining-imports,fix-barrel-imports,fix-multiline-imports,fix-corrupted-imports}.sh` and `scripts/code-review/base-review.sh` must rewrite toward `@bitcode/*` carriers and Bitcode-owned review output paths rather than preserving `@engi/*` repair targets or `/tmp/engi_review_*` runtime artifacts.
- active maintenance validation and cleanup carriers are part of that same fifth-gate proof boundary too: `scripts/verify-deliverables-quality.sh`, `scripts/{cleanup_remaining_docs.py,cleanup_outdated_docs.py,cleanup-outdated-docs.sh}`, and `protocol-demonstration/CHECKLIST.md` must validate and teach Bitcode-owned paths, branch labels, CTA language, and cleanup targets rather than preserving `@engi/*`, `engi-demo`, or `ENGI_*` document references in active operator guidance.
- retained package and shell follow-through is now explicit too: live footer/fill-gap styling carriers and retained package surfaces like `packages/chatgptapp/*`, `packages/web-search/*`, and `packages/streams/*` are active fifth-gate naming targets, with old-brand wording permitted only in historical documentation or still-unported fixture material that has not yet been promoted as active product truth.
- retained package docs and communication surfaces are active fifth-gate proof carriers too: `packages/chatgptapp/{README,DEMO,TLDR,TODO}.md` and `packages/email/{README.md,package.json,src/services/*}` must read as Bitcode whenever they describe active product/runtime/package behavior rather than historical lineage.
- active tests and Storybook carriers are proof-bearing import-path owners too: where canonical auxillary surfaces already exist, files such as `uapi/tests/{orbitalsPaneTabs,orbitalsWorkspacePanels,orbitalPaneMeta}.test.*` and `uapi/stories/{LoginPane,OnboardingPane,user/Auth,user/Onboarding}.stories.*` must import `uapi/app/auxillaries/*` rather than teaching compatibility `orbitals` owners as current truth.
- canonical auxillary pane files themselves are now active fifth-gate proof carriers too: `uapi/app/auxillaries/components/Auxillaries{Profile,Connects,Interfaces,BTD}Pane.tsx` hold the live pane implementations, while `uapi/app/orbitals/components/Orbitals{Profile,Connects,Interfaces,BTD}Pane.tsx` are compatibility re-exports only.
- canonical auxillary lower-level implementation carriers are now active fifth-gate proof carriers too: `uapi/app/auxillaries/components/{headers/*,shared/*,models/*,AuxillariesDataSharingPanel.tsx,auxillary-pane-explainers.ts,profile-pane.module.css}` must remain the live owners for pane headers, onboarding overlays, model defaults, BTD data-share posture, explainer maps, and pane styling rather than silently drifting back to orbitals-owned internals.
- retained orbitals lower-level carriers are now compatibility-only proof carriers too: `uapi/app/orbitals/components/{headers/*,shared/*,models/*,OrbitalsDataSharingPanel.tsx,orbital-pane-explainers.ts}` must stay as thin compatibility re-exports once their canonical auxillary equivalents exist, not re-accumulate duplicate live implementations behind the canonical route family.
- canonical auxillary onboarding/data contracts and persistence semantics are now active fifth-gate proof carriers too: `uapi/app/auxillaries/auxillary-onboarding-contract.ts`, `uapi/app/api/auxillaries/{onboarding,data}/route.ts`, `uapi/hooks/useUserData.ts`, `uapi/app/auxillaries/components/AuxillariesSurface.tsx`, `supabase/migrations/001_v26_production.sql`, and `supabase/scripts/grant_first_time_credits.sql` must agree on canonical `profile/connects/interfaces/btd` panes, expose canonical payload aliases, and must not preserve `models/credits` as active onboarding truth.
- fifth-gate filesystem-path cleanup now explicitly includes non-_legacy historical carriers too: root prep memos and retained package-local historical docs such as `BITCODE_{V10,V11}_PREP_MEMO.md` and `protocol-demonstration/BITCODE_DEMO_SPEC_V15*.md` must not survive as `ENGI_*` filenames outside `_legacy/`.
- mounted public-shell and retained route-teaching carriers are active fifth-gate proof carriers too: live marketing owners like `uapi/app/(root)/components/{MarketingFeaturesGrid,MarketingComputeSection,MarketingCompetitorTableSection,MarketingMarketplaceSection}.tsx`, route-adjacent teaching carriers like `uapi/app/orbitals/components/OrbitalsConnectsOrbitalEmailConnection.tsx`, and retained package docs like `packages/{web-search,registry}/*` must converge on Bitcode naming in user-facing strings, comments that teach active behavior, and canonical proof witnesses.
- retained package API routes are active fifth-gate proof carriers too: user-facing strings in `packages/api/src/routes/*` such as auth welcomes, ChatGPT success messages, and deliverables permission guidance must converge on Bitcode naming exactly the same way active UI carriers do.
- retained shared contracts are active fifth-gate proof carriers too: `packages/errors/*` and direct consumers like `packages/api/src/routes/deliverables.ts` and `uapi/app/error.tsx` must not keep old branded error-contract naming in active exported symbols, docs, or user-facing error teaching once the rest of the product reads as Bitcode.
- retained runtime/debug/env contracts are active fifth-gate proof carriers too: active packages such as `packages/{logger,agent-generics,pipelines/asset-pack,parsing}/*` must converge on `BITCODE_*` environment/debug contracts, `.bitcode_logs` sidecar posture, and Bitcode-facing helper strings instead of leaving `ENGI_*` runtime flags or `.engi_logs` as surviving product truth.
- retained LLM harness/config carriers are active fifth-gate proof carriers too: `packages/llm-generics/{jest.config.cjs,tsconfig.test.json,__mocks__/*,README.md}` and shared workspace config like `jest.base.cjs` / `pnpm-workspace.yaml` must not keep old-brand mock names, old import aliases, or dead pre-Bitcode package entries in active Bitcode test/runtime ownership.
- shipped JS/runtime carry-through and Storybook/docs carriers are active fifth-gate proof carriers too: generated JS files under `packages/{errors,logger,observability}/*`, active docs/comments in `packages/{security,multimodal-utils,tech-types,supabase}/*`, and active `uapi/stories/*` titles/example copy must not keep old-brand sample values or old import aliases once the live product and packages read as Bitcode.
- canonical auxillary step/test ownership and retained package teaching carriers are active fifth-gate proof carriers too: `uapi/app/auxillaries/components/Auxillaries{Credits,Connects,Models,ProfileStep}.tsx`, active test imports under `uapi/tests/{creditsStep*,connectionsStep*,modelsStep*,profileStep*,orbitals*}.tsx`, retained examples/docs in `packages/{doc-comment,figma,generic-tools,system-grep,testing,executions-mcp}/*`, and active e2e/story fixtures such as `uapi/tests/e2e/conversation-digest-pipeline.test.ts`, `uapi/tests/e2e/fixtures/stories/killBug.json`, and `uapi/stories/{SourceDivider,SourceConfig}.stories.tsx` must all read as Bitcode and must not keep canonical test ownership or sample product language anchored on compatibility `/orbitals` paths or old-brand wording.
- retained product-adjacent package surfaces are active fifth-gate proof carriers too: active helpers such as `packages/vercel/*` and `packages/generic-tools/{repository-setup,simple-system-text-search,files-maintaining,git-interactor}/*` must read as Bitcode in package metadata, fixture copy, and doc-code teaching wherever they describe active product/runtime behavior.
- active webhook and mock-system carriers are fifth-gate proof carriers too: `uapi/app/api/webhook/{route,verify}.ts`, `uapi/tests/webhookRoute.test.ts`, and active `uapi/mocking/*` source owners must use Bitcode trigger labels, Bitcode comment commands, Bitcode mock globals, and Bitcode sample organizations rather than lingering `engi-deliver-*`, `@engi-*`, or `__engiMock*` runtime truth.
- the active mock-system slice now also includes its shipped operator tooling and docs as fifth-gate proof carriers: `uapi/mocking/{README.md,INTEGRATION_GUIDE.md,QUICK_START_*.md,COMPREHENSIVE_SYSTEM_SUMMARY.md,validate-system.js}` plus `uapi/mocking/scripts/*` must use Bitcode naming and the real `mocking/*` ownership paths rather than stale `app/mocking` teaching.
- sixth-gate reform now has to explicitly adjudicate retained old-world systems rather than leaving them in a vague later bucket: web-search tool/agent behavior now has a fifth-gate baseline as source-attributed discovery-phase need-synthesis evidence support, while webhook-trigger carriers and other pure-agentic surfaces must likewise either become explicit Bitcode need-measuring/support infrastructure or be cut from canonical V26 active source.
- seventh-gate closure now owns the whole-repository application-ready Bitcode verdict: GUI, conversations, ChatGPT-style interface, ChatGPT app, API, MCP, schemas, proofs, docs, and retained packages must all close as one proven system with no silent legacy product ownership.

## Current first-gate source reminders

The current first-gate source shape is:

- `protocol-demonstration/src/*`
- `protocol-demonstration/public/*`
- `protocol-demonstration/server.js`
- `protocol-demonstration/test/*`
- `uapi/app/application/*`
- `uapi/app/api/*`
- `uapi/lib/bitcode-app-context.ts`

In current source, the app-owned first-gate API surface now explicitly includes:

- `/api/state`
- `/api/deposits`
- `/api/make-bitcode-branch`
- `/api/need-review`
- `/api/reset`
- `/api/bitcoin-demonstration-service`
- `/api/auxillaries/data`
- `/api/executions/history`
- `/api/executions/history/[runId]`
- `/api/v24/external-realization`
- `/api/v24/executors/[interfaceId]`
- `/api/client-error`

This is the current V26 source carrier now that V26 is the active canon.
The practical V26 leverage rule is now explicit: the retained active package/app systems outside first-gate Bitcode ownership are to be elevated up to Bitcode-grade auditability, proof-bearing precision, and knowability rather than treated as a looser host Bitcode must compromise down into.

The current active second-gate application additions now explicitly include:

- `uapi/app/application/ApplicationCommandDeck.tsx`
- `uapi/app/application/ApplicationActionWorkbenchCard.tsx`
- `uapi/app/application/ApplicationExperienceFrame.tsx`
- `uapi/app/application/ApplicationExternalInterfacingPanel.tsx`
- `uapi/app/application/ApplicationClosureControlDeck.tsx`
- `uapi/app/application/ApplicationGiveNeedWorkbench.tsx`
- `uapi/app/application/ApplicationLiveSummaryStrip.tsx`
- `uapi/app/application/ApplicationRepositoryContextPanel.tsx`
- `uapi/app/application/ApplicationSectionAtlas.tsx`
- `uapi/app/application/ApplicationCoreNativeSections.tsx`
- `uapi/app/application/ApplicationClosureNativeSections.tsx`
- `uapi/app/application/ApplicationTransactionActivitySurface.tsx`
- `uapi/app/application/ApplicationTransactionDetailSurface.tsx`
- `uapi/app/application/application-core-surface.ts`
- `uapi/app/application/application-closure-controls.ts`
- `uapi/app/application/application-closure-state.ts`
- `uapi/app/application/application-external-runtime.ts`
- `uapi/app/application/application-live-summary.ts`
- `uapi/app/application/application-section-atlas.ts`
- `uapi/app/application/application-experience-architecture.ts`
- `uapi/app/application/application-give-need-workbench.ts`
- `uapi/app/application/application-run-activity.ts`
- `uapi/app/application/application-transaction-detail-snapshot.ts`
- `uapi/components/base/bitcode/layout/user-menu.tsx`
- `uapi/components/base/bitcode/notifications/NotificationsWidget.tsx`
- `uapi/app/application/application-repository-context.ts`
- `uapi/app/application/application-shell-sections.ts`
- `uapi/app/application/application-shell-reading.ts`
- `uapi/app/api/executions/_shared.ts`
- `uapi/app/api/executions/history/route.ts`
- `uapi/app/api/executions/history/[runId]/route.ts`
- `uapi/app/api/client-error/route.ts`
- `uapi/app/api/auxillaries/model-preferences/route.ts`
- `uapi/app/application/ApplicationWorkspaceRail.tsx`
- `uapi/app/application/ApplicationTransactionWorkspace.tsx`
- `uapi/app/application/ApplicationMockTransactionDetails.tsx`
- `uapi/app/application/application-run-data.ts`
- `uapi/app/orbitals/components/OrbitalsInterfacesPane.tsx`
- `uapi/app/orbitals/components/OrbitalsBTDPane.tsx`
- `uapi/app/orbitals/components/shared/OrbitalsWorkspaceSection.tsx`
- `uapi/app/orbitals/components/shared/OrbitalsStatGrid.tsx`
- `uapi/app/orbitals/components/shared/OrbitalsPreferenceCards.tsx`
- `uapi/app/conversations/components/ConversationsOverlay.tsx`
- `/api/conversations`

The next closure-side second-gate milestone is now materially implemented in source:

- `/application` carries native application-owned reading for ranked verification, branch artifacts, settlement/proof, and ledger/history through `ApplicationClosureNativeSections.tsx`,
- `application-closure-state.ts` now normalizes a dedicated `closureSurface` emitted by `getBitcodeApplicationShellSnapshot()` instead of reconstructing closure semantics from rendered shell markup,
- `protocol-demonstration/public/app.js` now exposes verification, branch, settlement, and ledger semantics directly through the shell snapshot bridge,
- and the closure-side proof surface now includes `uapi/tests/applicationClosureState.test.ts` instead of leaving closure normalization as unproven UI glue.
- `/api/conversations/branch`
- `/api/conversations/stream`
- `/api/conversations/[conversationId]/stream`

Those carriers now make fullscreen conversations application-owned from `/application` in mock-mode review instead of leaving the overlay mounted over missing App Router routes.
They also place a central run-and-deliverable master-detail workspace directly inside `/application` instead of leaving inward reuse mostly confined to the right rail or the compatibility `/executions` route.
They also place route-local command and live-summary carriers above the preserved shell, with browser-verified proxying from the application frame into preserved-shell scenario/projection/branch state.
They now also place a route-local body atlas above the preserved shell, with browser-verified card labels and deterministic jump behavior into the live operating, depositing, needing, fit, verification, artifact, settlement, and ledger panels.
That atlas now also reads semantic core and closure bridges instead of scraping rendered shell panel text and card counts.
They now also place the first native route-local body replacement layer above the preserved shell: application-owned operating, deposit, need, and fit cards that now read a dedicated semantic `coreSurface` emitted by the mounted Bitcode shell instead of scraping rendered operating/deposit/need/fit panel markup.
They now also place a deeper route-local give/need action workbench above the preserved shell: application-owned action detail that reads the mounted shell through `getBitcodeApplicationShellSnapshot()` and the client-entry bridge instead of relying on generic DOM markup reads for repository supply, measured demand, and fit intent.
They now also place a route-local closure operation deck above the preserved shell: application-owned branch execution, refresh, reset, and follow-through controls that normalize closure posture from the shell bridge instead of leaving closure interaction implicit in shared command controls alone.

The V26 application architecture is now explicitly locked in the canonical family as:

- `master detail`, `conversations`, and `orbitals` as the three main Bitcode experiences,
- `give` and `need` as the two main Bitcode actions,
- `/application` as the master-detail carrier,
- conversations as the fullscreen chat workspace entered from `/application`,
- orbitals as the fullscreen orbital workspace entered from `/application`,
- `Connects`, `Interfaces`, `Profile`, and `$BTD` as the fixed orbital ring model,
- and runs/deliverables/proofs/history as master-detail substructures rather than separate primary experiences.

The current source now reflects that architecture more directly:

- `ApplicationExperienceFrame.tsx` names the three main experiences and the two main actions inside `/application`,
- the live application framing now explicitly distinguishes the read experience (transactions master detail) from the write experience (give, need, and configuring through conversations/orbitals),
- `ApplicationCommandDeck.tsx` plus `application-command-state.ts` now carry direct give/need focus controls and route-local command posture through the Bitcode shell bridge instead of raw DOM scraping,
- `ApplicationLiveSummaryStrip.tsx` plus `application-live-summary.ts` now read route-local operating posture from the shell summary bridge instead of rendered summary-card markup,
- `ApplicationCoreNativeSections.tsx` now reads as the master-detail give/need core instead of only as generic core shell mirroring,
- `ApplicationSupplySelectionPanel.tsx` plus `application-supply-selection.ts` now make authenticated intake session, artifact filtering, search, and inventory selection explicit inside `/application` through the mounted Bitcode shell bridge,
- `ApplicationDepositComposer.tsx` plus `application-deposit-composer.ts` now make native deposit submission available inside `/application`, posting to the app-owned `/api/deposits` contract while preserving selected inventory and auth-session continuity from the mounted shell,
- `ApplicationNeedScenarioPanel.tsx` plus `application-need-scenarios.ts` now make native need-scenario selection available inside `/application`, driving active scenario posture through the mounted Bitcode shell bridge while keeping parser and closure posture visible,
- `application-shell-bridge.tsx` plus `applicationShellBridge.test.tsx` now centralize mounted-shell polling and control refresh so second-gate carriers consume one coherent Bitcode application state bridge rather than drifting per-panel refresh loops,
- `ApplicationTransactionsTable.tsx`, `application-transactions.ts`, `BitcodeTransactionsTable.tsx`, and `applicationTransactions.test.ts` now make master detail concrete as a rich, searchable, filterable Bitcode Terminal table, with raw pipeline substrate normalized into canonical agentic-execution labels/lenses before the live application reads transaction detail inside `/application`,
- `application-transaction-source.ts`, `bitcode-transaction-data-mode.ts`, `ApplicationPageClient.tsx`, and `ApplicationWorkspaceRail.tsx` now resolve and label `live`, `mock-review`, and `review-fallback` transaction-source posture from live history plus the selected transaction URL, so empty live history on explicit mock review URLs fails over to an interactive Bitcode workspace instead of an inert empty state,
- `BitcodeTransactionsOverview.tsx`, `BitcodeTransactionsFilterBar.tsx`, `BitcodeTransactionsActiveFilters.tsx`, `BitcodeTransactionsDataTable.tsx`, `bitcode-transaction-types.ts`, and `bitcode-transaction-active-filters.ts` now split the base transaction master carrier into typed SRP-aligned subcomponents, shared defaults, and active-filter chip posture instead of leaving the reusable table UI as one monolith,
- `application-transaction-query.ts` plus `applicationTransactionQuery.test.ts` now make transaction selection and rich master-table filters route-owned and shareable through `/application` query state instead of leaving them trapped in component-local state,
- `ApplicationTransactionDetailHero.tsx`, `ApplicationTransactionIdentityCard.tsx`, `ApplicationTransactionClosureCard.tsx`, `application-transaction-detail.ts`, and `applicationTransactionDetail.test.ts` now split the selected-transaction detail carrier into overview, identity, and closure modules instead of leaving the central detail pane as one mixed-responsibility component,
- `ApplicationTransactionDetailActionBar.tsx` plus `ApplicationTransactionDetailSurface.tsx` now make transaction-detail focus, closure rerun, and detail refresh route-owned inside `/application` through query state and the shell bridge, with `transaction` as the preferred detail carrier and legacy `identity` accepted only for compatibility parsing,
- `ApplicationTransactionClosureCard.tsx`, `ApplicationTransactionProofsCard.tsx`, and `ApplicationTransactionHistoryCard.tsx` now split selected-transaction closure, proofs, and history into explicit detail carriers instead of burying proofs/history under one closure pane,
- `/application` now prefers `transactionId` as the master-detail query carrier while still accepting inbound `runId` for compatibility convergence, and the transactions master surface now filters by status, ownership, repository, participant, proof posture, and sort order in addition to free-text search,
- `ApplicationTransactionWorkspace.tsx` now exposes transactions, deliverables, proofs, and history as explicit master-detail substructures instead of leaving them as adjacent imported detail panels,
- `ApplicationTransactionDetailSurface.tsx` plus `application-transaction-detail-snapshot.ts` now normalize selected-run history payloads into one application-owned detail carrier so deliverable-reading panels render in both mock and live posture inside `/application`,
- `ApplicationTransactionActivitySurface.tsx` plus `application-run-activity.ts` now elevate the retained execution/log/work-update system into the Bitcode application-owned detail space instead of leaving that depth mostly to the compatibility execution page,
- `uapi/components/base/bitcode/activity/bitcode-activity-model.ts`, `application-run-activity.ts`, and `NotificationsWidget.tsx` now share one fourth-gate activity vocabulary so transactions remain dominant while notifications are admitted as the next converged activity class,
- `ApplicationClosureNativeSections.tsx` plus `application-closure-state.ts` now read verification, branch, settlement, and ledger semantics from the mounted Bitcode shell snapshot rather than from rendered closure panel markup,
- and `ApplicationWorkspaceRail.tsx` now frames conversations and orbitals as the other two experiences rather than as loose utility exits.
- `OrbitalsProvider.tsx`, `app/orbitals/components/api.ts`, `btd-tracker.tsx`, `BTDPrices.tsx`, `FlexibleBtdSelector.tsx`, `ExecutionsPageClient.tsx`, `useUserData.ts`, `use-auth-query.ts`, and `UserDataContext.tsx` now use the canonical app-owned BTD and auxillaries route family, with `/api/orbitals/data` retained only as a thin compatibility wrapper and the old `credits/` component directory retired from active source.
- live browser verification now confirms the architecture frame is visible, `give` focus lands on the live deposit section, and both conversations and orbitals open from `/application` without console or request failures.
- `uapi/app/api/vcs/[provider]/*` now exists as an app-owned VCS carrier family for connection status, OAuth entry, PAT fallback connection, and repository listing instead of letting active Bitcode UI fall through to missing HTML routes.
- `ApplicationRepositoryContextPanel.tsx` now makes provider connection posture and selected repository supply explicit inside `/application` before the preserved deposit chain, using the app-owned `/api/vcs/*` contract and route state.
- `ApplicationGiveNeedWorkbench.tsx` plus `application-give-need-workbench.ts` now make give/need action detail explicit from a semantic shell snapshot bridge rather than generic shell markup, which is a stronger second-gate step toward application-owned Bitcode composition.
- `ApplicationOperatorCard.tsx`, `application-operator-explainers.ts`, `ApplicationActionWorkbenchCard.tsx`, `ApplicationNeedScenarioPanel.tsx`, `ApplicationDepositComposer.tsx`, `ApplicationGiveNeedWorkbench.tsx`, `ApplicationClosureNativeSections.tsx`, and `ApplicationClosureControlDeck.tsx` now move the application workspace toward one shared help grammar with reusable metric, row, and chip carriers instead of per-panel hero/stat markup drift.
- `ApplicationWorkspaceRail.tsx`, `ApplicationWorkspaceRailCard.tsx`, and `ApplicationSupplySelectionPanel.tsx` now also sit inside that same shared workspace/help grammar, which keeps the right rail and give-side supply terminal aligned with the rest of the application surface instead of reading like standalone utility shells.
- the active application workspace now treats stepwise guidance as resumable give/need flow and working-draft continuity rather than tutorial/demo residue, and the visible application copy is being tightened to stay user-referencing instead of narrating gates, routes, or canon posture.
- visible application copy now explicitly removes self-referential shell/source-path phrasing from live rail, experience-map, give-side supply, and give-draft surfaces unless the user intentionally enters a lower-level runtime read.
- `uapi/tests/applicationCommandState.test.ts` now proves deterministic normalization of shell command posture, flow-guide continuity, preserved-shell tutorial compatibility input, and option sets into route-local application command state.
- `uapi/tests/applicationDepositComposer.test.ts` now proves deterministic normalization of deposit-auth session defaults, selected inventory continuity, and signer/source repo defaults into route-local deposit-composer state.
- `uapi/tests/applicationNeedScenarios.test.ts` now proves deterministic normalization of active scenario cards, parser posture, closure counts, and target-kind counts into route-local need-scenario state.
- `uapi/tests/applicationSupplySelection.test.ts` now proves deterministic normalization of authenticated intake session, artifact filter, search, and selected inventory entry detail into route-local application supply selection.
- `ApplicationExternalInterfacingPanel.tsx` now makes environment mode, actuality disposition, and per-interface runtime blocking state explicit inside `/application` through the app-owned `/api/v24/external-realization` contract.
- `protocol-demonstration/public/app.js` plus `protocol-demonstration/src/client-entry.js` now expose both the read-only shell snapshot carrier and the mutable shell control bridge so application-owned V26 sections can reuse precise Bitcode semantics without re-implementing the shell’s local selection logic.
- `protocol-demonstration/public/index.html`, `protocol-demonstration/public/styles.css`, `ApplicationPreservedShellSurface.tsx`, `ApplicationCommandDeck.tsx`, and `application-shell-bridge.tsx` now prefer active `flow guide` naming while keeping compatibility fallbacks internal to the bridge rather than visible in the live runtime.
- `uapi/tests/api/externalRealizationRoute.test.ts` now proves the app-owned `/api/v24/external-realization` carrier directly instead of relying only on UI normalization coverage.
- `uapi/tests/applicationGiveNeedWorkbench.test.ts` now proves deterministic give/need/fit normalization from the semantic shell snapshot into application-owned action detail.
- `uapi/tests/applicationLiveSummary.test.ts` now proves deterministic normalization of the shell summary bridge into route-local application operating posture.
- `uapi/tests/applicationClosureState.test.ts` now proves deterministic normalization of verification, branch, settlement, and ledger semantics from the shell snapshot into application-owned closure state.
- `uapi/tests/applicationTransactionDetailSnapshot.test.ts` now proves the selected-run normalization layer that merges live history payloads with route-owned fallback detail before the application renders deliverables, proofs, and history.
- `uapi/tests/applicationTransactionActivity.test.ts` now proves the activity/log normalization layer that lifts retained execution events into the application-owned run activity surface.
- `uapi/tests/applicationShellBridge.test.tsx` now also proves that the shared shell bridge fails closed to an empty snapshot/control state when mounted-shell refresh throws during pre-mount or hot-reload rebuild windows.
- `uapi/tests/api/clientErrorRoute.test.ts` now proves that client-side error telemetry is accepted by an app-owned route instead of 404ing during second-gate runtime failures.
- `application-transaction-query.ts`, `ApplicationPageClient.tsx`, `ApplicationTransactionWorkspace.tsx`, `ApplicationTransactionsTable.tsx`, `BitcodeTransactionsTable.tsx`, `BitcodeTransactionsPagination.tsx`, and `bitcodeTransactionsPagination.test.tsx` now treat transaction pagination as a route-owned part of the transactions master carrier instead of leaving row-window state local to the table.
- `BitcodePayloadInspector.tsx` plus `bitcodePayloadInspector.test.tsx` now provide a reusable visual-vs-raw JSON payload carrier with copy support and payload metadata, and the selected-transaction identity, proofs, and history cards now consume that shared base component.
- `BitcodePayloadShape.tsx` plus `bitcodePayloadShape.test.tsx` now provide a reusable structured payload summary layer inside the visual inspector, so transaction detail can read root kind, top-level fields, and composite sections before dropping into raw JSON.
- `BitcodePayloadTree.tsx` plus `bitcodePayloadTree.test.tsx` now provide a reusable bounded nested payload tree inside the visual inspector, so transaction detail can read structural JSON fields and types before dropping into raw JSON.
- `BitcodeActionPillRow.tsx` plus `bitcodeActionPillRow.test.tsx`, `BitcodePayloadDetailCard.tsx` plus `bitcodePayloadDetailCard.test.tsx`, `BitcodePayloadRowsCard.tsx` plus `bitcodePayloadRowsCard.test.tsx`, and `BitcodePayloadCollectionCard.tsx` plus `bitcodePayloadCollectionCard.test.tsx` now centralize the repeated payload-inspector-plus-actions, payload-plus-rows, and payload-plus-collection shells used by transaction identity, closure, proofs, and history, so those cards share hardened execution-level carriers instead of reauthoring the same lower card posture.
- `BitcodeExecutionStreamPanel.tsx` plus `bitcodeExecutionStreamPanel.test.tsx` now centralize the repeated execution-log header, log body, and sorted work-update stack used by `/application`, conversations, and `/executions`, so transaction activity is no longer composed as page-local glue.
- `BitcodeInlineExplainer.tsx`, `bitcode-transaction-explainers.ts`, `BitcodeTransactionsFilterBar.tsx`, `BitcodeTransactionsDataTable.tsx`, `BitcodeTransactionsPagination.tsx`, `BitcodePayloadInspector.tsx`, `bitcodeInlineExplainer.test.tsx`, and `bitcodeTransactionsFilterBar.test.tsx` now provide one shared second-gate explainer/tooltip system for transaction filters, headers, pagination, and payload views, while also restoring stable accessible names to the master-table controls after the explainer triggers were introduced.
- `BitcodeDetailRowList.tsx`, `BitcodeMetricGrid.tsx`, `BitcodeDetailCollection.tsx`, `BitcodeDetailPanel.tsx`, `BitcodeChipCloud.tsx`, `bitcodeDetailRowList.test.tsx`, `bitcodeMetricGrid.test.tsx`, `bitcodeDetailCollection.test.tsx`, and `bitcodeDetailPanel.test.tsx` now move selected-transaction rows, metric grids, proof/history collections, workspace substructure cards, and artifact chips onto reusable base carriers, with `ApplicationTransactionProofsCard.tsx`, `ApplicationTransactionHistoryCard.tsx`, and `ApplicationTransactionWorkspace.tsx` now consuming those shared execution components instead of hand-built page-local markup.
- `AuxillariesProfilePane.tsx` now reconnects the data-sharing overlay carrier so auxillaries entered from `/application` remain renderable during second-gate convergence rather than crashing on missing-pane reference drift.
- `AuxillariesProvider.tsx` plus `auxillariesProvider.test.tsx` now keep the overlay portal target in state instead of a silent ref-only mutation, so `openAuxillaries()` can render a real fullscreen surface on first interaction instead of failing quietly when the container is created after the open event.
- `AuxillariesInterfacesPane.tsx`, `AuxillariesBTDPane.tsx`, `OrbitalsWorkspaceSection.tsx`, `OrbitalsStatGrid.tsx`, and `OrbitalsPreferenceCards.tsx` now give signed-in auxillaries real `Interfaces` and `$BTD` pane ownership instead of leaving those rings as model or credits wrappers.
- `uapi/components/base/bitcode/layout/workspace-surface.ts`, `ClientLayoutInner.tsx`, `nav.tsx`, and `workspaceSurface.test.ts` now centralize workspace-route classification so `/application`, `/orbitals`, and `/conversations` share one operator-chrome rule for navbar surface posture and footer suppression.
- `ApplicationOpenConversationsButton.tsx` and `ApplicationOpenOrbitalsButton.tsx` now own the shared operator-facing mode-entry buttons used by the experience frame, support rail, and repository-context support card, replacing repeated local button copy that still narrated fullscreen mechanics.
- `ApplicationClosureControlDeck.tsx`, `ApplicationSupplySelectionPanel.tsx`, `application-closure-controls.ts`, `application-workspace-copy.ts`, and `application-workspace-explainers.ts` now use flow-continuity and deeper-mode wording instead of draft-continuity and fullscreen narration inside the live workspace shell.
- `protocol-demonstration/public/index.html` now matches the React-owned preserved runtime surface for closure-runtime, flow-guide, give, need, and deliverables wording, so the lower runtime no longer drops back to prototype/tutorial copy when inspected directly.
- `protocol-demonstration/public/app.js` plus `protocol-demonstration/test/v26-public-copy.test.js` now keep preserved-runtime explainer copy and reference chips user-facing, replacing demo-era tooltip language and raw source-path phrasing with live-surface and reference-topic posture.
- `protocol-demonstration/public/telemetry.js` plus `protocol-demonstration/test/v26-public-copy.test.js` now keep preserved-runtime diagnostics under `[bitcode-runtime]` instead of leaking `[engi-demo]` prefixes through the live runtime.
- `uapi/app/orbitals/components/OrbitalsLoginPane.tsx`, `OrbitalsContent.tsx`, `shared/OrbitalsPaneTabs.tsx`, `OrbitalsRouteClient.tsx`, `uapi/tests/orbitalsLoginPane.test.tsx`, and `uapi/tests/orbitalsContent.test.tsx` now keep contained orbital entry and focused orbital routes orbitals-first, replacing generic workspace/settings access wording with `Connects`, `Interfaces`, `Profile`, and `$BTD` language.
- `uapi/styles/orbital.css`, `uapi/app/orbitals/components/OrbitalsLoginPane.tsx`, `OrbitalsRouteClient.tsx`, `uapi/tests/orbitalsRouteClient.test.tsx`, and live browser verification on `host.docker.internal:3000` now prove that application-opened orbitals hold a full-width contained operator shell, direct orbital routes keep operator-facing route cards/links, and neither surface emits error-level console output during second-gate review.
- `ApplicationPageClient.tsx`, `ApplicationTransactionWorkspace.tsx`, `ApplicationTransactionDetailSurface.tsx`, `ApplicationCommandDeck.tsx`, `ApplicationLiveSummaryStrip.tsx`, `ApplicationSectionAtlas.tsx`, `ApplicationPreservedShellSurface.tsx`, `OrbitalsInterfacesPane.tsx`, `OrbitalsBTDPane.tsx`, `OrbitalsModelsPane.tsx`, and `user-menu.tsx` now keep visible review surfaces on `Transactions` / `Orbitals` wording instead of `workspace` / `transaction terminal` drift, while also delaying the support-rail split to `2xl` so laptop-width review stays centered on the main transactions column.
- `README.md`, `uapi/README.md`, `protocol-demonstration/README.md`, `uapi/app/application/README.md`, `uapi/app/orbitals/README.md`, `uapi/components/base/bitcode/README.md`, and `uapi/components/base/bitcode/execution/README.md` now form the active second-gate documentation set and must stay synchronized with the route/package owners they describe.
- `OrbitalsInterfacesPane.tsx`, `OrbitalsBTDPane.tsx`, `OrbitalsBTDOrbitalHeader.tsx`, `OrbitalsConnectsOrbitalEmailConnection.tsx`, `OrbitalsConnectsOrbitalPhoneConnection.tsx`, and `uapi/styles/orbital.css` now carry active `interfaces`/`btd`/`orbital-entry` naming instead of leaking active model/credits/settings residue through the live orbital surface.
- `uapi/app/api/auxillaries/model-preferences/route.ts` plus `uapi/tests/api/userModelPreferencesRoute.test.ts` now restore application-owned orbital preference persistence with authenticated read and lead/admin write posture.
- `packages/api/src/routes/executions.ts` now owns execution-history route orchestration and normalization, while `uapi/app/api/executions/{route.ts,history/route.ts,history/[runId]/route.ts}` stay thin interface bindings or compatibility re-exports so the transactions master, selected-transaction detail, and retained execution readers no longer depend on app-owned persistence logic or direct package source-path imports.
- `protocol-demonstration/src/client-entry.js` now applies the host-wait guard to snapshot and control reads as well as shell mount, so the application shell bridge no longer imports the preserved shell module before `bitcodeApplicationRoot` and `heroEyebrow` exist.
- `protocol-demonstration/V26_APPLICATION_SYSTEMS.md` and `protocol-demonstration/V26_PROOF_SURFACES.md` now exist as explicit supplementary non-canonical carriers for the converged application architecture and its expanded proof/test/spec obligations.
- fourth-gate persistence convergence is now explicitly grounded in the retained source basis that actually exists today: `supabase/migrations/001_v26_production.sql`, `packages/supabase/src/*`, `packages/orm/src/models/*`, `packages/orm/src/queries/*`, `packages/orm/src/types/database.generated.ts`, `packages/orm/src/types/database.ts`, and `packages/orm/scripts/generate-db-types.ts`, with `/edgetimes` and `/api/edgetimes` acting as live fourth-gate Bitcode storage/API witnesses.
- the active internal module namespace is now `@bitcode/*` across workspace manifests, path aliases, and active source imports.
- V26 proof closure now explicitly requires the retained and repurposed whole repository that survives into V26 production canon to be proven up to Bitcode-grade satisfaction rather than leaving strong proof posture isolated to the former top-level demo core.

## Still driving V26 from V25 deferrals

The following items still remain part of the V26 center because they were deferred from V25 or from first-gate closure:

- Bitcoin execution hardening beyond rename and first-gate migration.
- GitHub interface hardening beyond modeled or transitional package ownership.
- Compute and storage hardening beyond current preserved first-gate carriers.
- Cross-interface reconciliation and drift posture beyond current first-gate continuity.
- Build and promotion automation improvements beyond the now-updated package path migration.
- Second-gate application-facing refit of the preserved shell.

## Second-gate collaborative design pack now required

The second-gate collaboration pack must now include:
- a full `/application` wireframe set,
- a section decomposition map from first-gate shell sections to second-gate application sections,
- a semantic non-regression ledger,
- a component adoption matrix keyed to `uapi/components/base/*`, route-local app sections, and orbital carriers,
- an overlay choreography map for fullscreen conversations and orbitals within `/application`,
- a master-detail reuse map for executions and deliverables patterns being ported inward,
- an external interfacing hardening matrix,
- a modular supplementary-doc rewrite map for non-canonical repository docs that need fuller system detail once V26 becomes more package- and subsystem-shaped,
- and an acceptance matrix that separates second-gate from third-gate and fourth-gate work.

This pack should be treated as required V26 drafting work before broad second-gate implementation begins.
It must now also assign proof/test/spec coverage expectations to any new second-gate code systems rather than letting them accumulate as unproven application glue.

## Fourth-gate retained-system pack now required

The fourth-gate collaboration pack must now include:
- a conversations and chat-interface retention map,
- a runs/pipelines/asset-packs total-system map,
- a PostgreSQL/Supabase storage convergence map covering `/edgetimes`, active migrations, schema owners, ORM/query owners, generated types, and API boundaries,
- a schema and package admissibility map covering `packages/supabase`, `packages/orm`, `packages/prompts`, `packages/api`, `packages/conversations-generics`, and `packages/execution-generics`,
- an inward-port map from current executions/deliverables surfaces into `/application`,
- a retained prompt-space map,
- a retained package admissibility ledger,
- and a proof-family assignment table for retained systems.

This pack should be treated as required V26 drafting work before broad fourth-gate implementation begins.

## Open questions that remain real

### 1. Second-gate application surface shape

Still open:
- how far the preserved first-gate shell should be decomposed into native application-facing components,
- which sections should become route-local React composition first,
- how aggressively the old shell CSS and DOM contract should be retired during second-gate,
- the exact master-detail structure for transactions, deliverables, proofs, and history within `/application`,
- the exact fullscreen overlay choreography for conversations relative to the main application workspace,
- how the preserved late-stage design-system atmosphere should be preserved while the product expression stays entirely Bitcode,
- and which external interfacings must be considered second-gate-stable before the new application page is considered ready.

### 2. Third-gate marketing refurbishment shape

Still open:
- what exactly the public marketing page should inherit from the stabilized second-gate application language,
- which parts of current marketing can remain untouched until after second-gate acceptance,
- and what third-gate acceptance should require versus leave to later refinement.

Mounted public-shell owners are no longer ambiguous:
- `uapi/app/(root)/components/PublicShellFrame.tsx`
- `uapi/app/(root)/components/MarketingLandingPage.tsx`
- `uapi/app/(root)/components/MarketingOperatorGuideCard.tsx`
- `uapi/app/(root)/components/PublicDocsPageContent.tsx`
- `uapi/app/docs/page.tsx`
- `uapi/app/demo-video/page.tsx`
- `uapi/components/base/bitcode/layout/nav.tsx`
- `uapi/components/base/bitcode/layout/NavBrand.tsx`
- `uapi/components/base/bitcode/layout/footer.tsx`
- `uapi/components/base/bitcode/layout/bitcode-public-copy.ts`

Those files now carry the active third-gate start for public-facing:
- `Network`
- `Transactions`
- `Docs`
- `Auxillaries`
- plus `give` and `need` as the two main Bitcode actions explained across the public teaching surface

Mounted public-shell chrome is also now explicit:
- `/`, `/docs`, and `/demo-video` mount live Bitcode nav through `PublicShellFrame`
- public routes expose stable `Network` / `Transactions` / `Docs` links plus `Open Auxillaries` / `Create Account`
- public-route orbital access now opens the contained Bitcode orbital shell instead of stopping at page-local CTA copy
- the mounted landing shell now uses Bitcode marketing-shell owners and selectors rather than live `ComingSoon*`/`coming-soon-*` residue
- the mounted landing owner now delegates to `app/(root)/components/landing/*` carriers for hero, preview, guide, and shared landing-shell data instead of keeping those surfaces fused into one file
- the mounted public shell now owns a real `/docs` route through `PublicDocsPageContent.tsx`
- `/demo-video` is now a compatibility alias into the same docs-owned content instead of a separate public product surface
- the stable docs walkthrough now fails closed with user-facing fallback copy and a direct `Open Bitcode Terminal` path instead of exposing asset-path instructions
- the mounted public shell and `/application` route now name the live application as the `Bitcode Terminal`, not generic `Transactions`, across primary CTA, public-nav/footer labels, explainers, page metadata, and the central application hero
- the retained `/executions` route and its live callers now accept canonical `agentic-execution:branch-artifact` query posture while continuing to read through the preserved raw `pipeline:*` execution substrate underneath
- the `/application` explainer layer, retained `/executions` bridge copy, and auxillary defaults now explicitly teach the `Bitcode Terminal` rather than a generic `transactions surface`, and the visible explainer/detail layer now reads as Bitcode activity plus asset-pack/proof/history consequence rather than raw transaction/deliverable product wording
- the mock Bitcode Terminal run substrate now emits canonical `agentic-execution:*` types for branch-artifact, need-measurement, and proof-refresh review runs instead of teaching raw pipeline strings inside active `/application` review helpers and their direct tests
- the V26 spec and active give/need/connects carriers now explicitly teach Bitcode as protocol, product, and proofs across `Bitcode Mainnet`, the `Bitcode Terminal`, need measurement, asset-pack synthesis, settlement follow-through, and wallet-plus-GitHub transacting prerequisites
- the selected-activity detail family, activity-ledger summary rail, and shared execution docs now teach `activity`, `asset packs`, and `Bitcode Terminal` posture across `/application`, shared execution carriers, and their tests instead of selected-transaction / deliverable operator wording
- the conversations write seam now teaches Bitcode Terminal rich-input posture too: route copy, mock stream semantics, rich-input labels, and execution-log carriers now speak in terms of source attachments, asset packs, output destinations, and canonical `agentic-execution:*` posture while preserving retained deliverable/measure primitives underneath
- the non-mock conversations stream routes are now mounted on the retained conversation/message/execution primitives too: `/api/conversations/stream` and `/api/conversations/[conversationId]/stream` now create or resolve conversations, persist the user write, bind message-level attachments from structured tokens, and start canonical agentic-execution rows while assistant `pipeline_run` attachment persistence remains owned by the existing message primitive
- the Bitcode Terminal conversations overlay now closes the first-write persistence seam too: draft conversations bootstrap through `/api/conversations/stream`, `message_complete` promotes the local draft id into the persisted conversation id, `/api/conversations` now feeds the fullscreen history rail with message counts / last-message previews, and `/api/conversations/[conversationId]` hydrates selected conversation detail for stable master-detail reads instead of leaving the overlay local-storage-only
- the Bitcode Terminal conversations write/read seam now also preserves canonical output-destination posture end to end: the rich-input `!` picker serializes destinations as `destination` tokens rather than mislabeled `pipeline_run` UI residue, persisted conversation detail rehydrates source/destination/execution attachments back into chat tokens, and execution follow-through from the overlay now routes back into `/application?transactionId=...&transactionDetail=activity` instead of teaching the retained `/executions` route as the primary surface
- the stable docs walkthrough now resolves one Bitcode-owned guide asset instead of carrying ordered `engi-demo` media compatibility
- the mounted public footer now resolves the guide URL through Bitcode-owned route/env ownership instead of the removed legacy docs-walkthrough env fallback
- the mounted public footer now links `Protocol spec` through the stable canonical pointer `BITCODE_SPEC.txt` instead of a version-specific public spec file path
- the mounted public nav now prefers a stacked/wrapped responsive layout over hamburger-style indirection, keeping primary entry links and guest access actions visible on smaller screens
- the mounted public terminal preview now leads with a compact public/mobile summary and only expands into the denser operator-grade preview on wider shells
- the mounted landing ambience now hides orbital rings, pointer glow, and the large ambient blur on smaller or reduced-motion shells instead of carrying the full animated backdrop everywhere
- the mounted public footer now treats route links as card carriers and protocol/version metadata as product chips on smaller shells instead of compressing them into one dense inline footer strip
- the mounted public shell now carries shared inline explainers for its main entry links and protocol reference instead of falling back to a thin browser `title` tooltip in the footer
- mounted public and selected application routes now keep explicit `Bitcode Network`, `Bitcode Docs`, and `Bitcode Transactions` title posture instead of inheriting one global shell title

This now constitutes mounted third-gate closure for the public shell:
- public route ownership, naming, metadata/title posture, docs-route authority, walkthrough fallback, and public orbital entry all hold under live verification
- remaining V26 work should now shift primarily into fifth-gate proof/finalization and minimum-functional Exchange/Terminal closure rather than reopening mounted public-shell identity or through-fourth-gate retained-system convergence work without cause
- `/edgetimes` and `/api/edgetimes` now exist as the first live fourth-gate storage/API witness so retained persistence convergence can proceed from explicit route/API ownership rather than only planning notes

Current draft-only spine to preserve for that future gate:
- where + when:
  engineering economy participants
- who:
  producers, consumers + investors, partners, researchers
- how:
  open, auditable, formal
- what:
  observable, modular, hackable
- why:
  throughput, quality, cost, trust

### 3. Fifth-gate debug and environment controls

Still open:
- where the debug setting should live,
- how the floating debug widget should appear and persist,
- what the minimum environment toggle contract is,
- how environment switching should refresh application state coherently,
- and which additional debug controls are worth carrying in V26 versus later versions.

### 4. Fourth-gate retained-system convergence

Promoted closed after reopening re-review:
- conversations read as a Bitcode V26 system through the route, fullscreen overlay, API, and retained conversation package proof family,
- ChatGPT-like interaction survives as a fullscreen first-class application mode entered from `/application`,
- deliverables are redefined under Bitcode runs/pipelines, asset-pack, written-asset, and connected-interface wrapper semantics,
- executions/runs keep explicit compatibility APIs while their master-detail and inspection patterns are ported inward to `/application`,
- PostgreSQL/Supabase ownership is grounded across `supabase/*`, `packages/supabase/*`, retained API carriers, and the live `/edgetimes` + `/api/edgetimes` witness posture,
- `supabase/migrations/001_v26_production.sql` is the initial V26 persistence baseline for the current proof family,
- retained packages are admitted through generated retained-package admissibility records plus a whole-`packages/` package census that classifies every active package owner and fails closed on unclassified fallbacks,
- proof obligations are assigned to generated fourth-gate proof families rather than left as prose-only intent,
- `.bitcode/fourth-gate-reclosure-review-proof.json` maps every fourth-gate material criterion to proof evidence and records no blocking fourth-gate deviance,
- and `.bitcode/v26-gate-checkpoint-report.json` records fourth-gate `promotedClosed` while keeping fifth-gate open with source-to-shares and closure-deepening proof evidence.

### 5. Longer-term package splitting after `protocol-demonstration`

Still open:
- whether `protocol-demonstration` remains the long-term owner,
- which second-gate or later package seams should split out,
- and which of those seams belong in existing owners like `packages/github` or `packages/api`.

### 6. Legacy component intake policy

Still open:
- which non-legacy current base/common components should be extended first,
- which styling patterns from the current app shell should be absorbed into second-gate Bitcode sections,
- and which former legacy ideas are worth forward-porting only after they are rebuilt into current owners.

### 7. Auth and wallet production target

Still open:
- exact wallet verification flow requirements,
- how wallet connection interacts with the current auth/provider model,
- whether wallet is primary, linked, or action-scoped,
- where the current credits carrier is cut and replaced by wallet-connected Bitcoin for auth, share ownership, and token transfers,
- and how much of the current MetaMask/auth code can be reused without redesign.

### 8. Compatibility-carrier treatment

Still open:
- whether `.bitcode/*` remains the emitted namespace in V26,
- whether repo-local `ENGI_SPEC_*` remains stable through V26 promotion,
- how far directory names, script names, and other non-module compatibility carriers should follow the now-active `@bitcode/*` module namespace,
- and which compatibility carriers are worth changing during a productionizing version versus later dedicated migration work.

### 9. Fifth-gate proof precision and closure

Still open:
- the exact theorem/member structure for the new V26 proof families,
- how retained-package admissibility verdicts should advance beyond the new generated package census into package-specific compile/runtime acceptance,
- how migration/schema/ORM/type closure should be emitted as a generated proof family rather than a hand-waved infrastructure note,
- how prompt-space proofs and application-composition proofs should join the existing Bitcode proof family catalog,
- and what minimum closure signal is required before V26 can be considered formally complete.

### 10. Later-gate Bitcode rename completion

Still open:
- full Bitcode rename completion remains later-gate work rather than first-gate,
- first-gate may preserve compatibility carriers while package/app migration closes,
- fifth-gate should return to remaining active-source rename debt after second-, third-, and fourth-gate closure are established,
- and any remaining Bitcode-era naming that survives first-gate must be cataloged and intentionally retired rather than left implicit.

## Current sequencing bias

The current sequencing bias is:

1. keep first-gate source stable,
2. keep spec/parity/generated tooling synchronized to first-gate file structure,
3. preserve the now-closed first-gate anonymous and signed-in app behavior while deeper hardening proceeds,
4. execute second-gate application UX/UI plus external hardening,
5. execute third-gate marketing refurbishment,
6. preserve through-fourth-gate retained-system convergence closure,
7. execute fifth-gate minimum-functional Exchange/Terminal closure plus broad old-world reform baseline including debug/environment controls,
8. execute sixth-gate minimal viable product elevation,
9. execute seventh-gate initial commercially-viable testnet live-launch refinement,
10. execute eighth-gate total-repository provation and final closure,
11. then refresh generated evidence and promotion checks.

## Non-goals for these notes

The following remain non-goals for this notes companion:
- promoting V26 early,
- pretending first-gate already completes second-gate application experience work,
- widening V26 into economics redesign,
- or treating `_legacy/` code as current truth.

Current fourth-gate closure reminders:
- retained `/executions` health now explicitly depends on `/api/vcs`, `/api/templates/deliverables`, and `/api/auxillaries/template-preferences` as compatibility API owners rather than invisible glue, and those carriers are part of the promotion boundary
- canonical auxillary health now explicitly depends on `/api/auxillaries/profile`, `/api/auxillaries/connections/github`, `/api/auxillaries/btd`, `/api/auxillaries/usage`, `/api/auxillaries/transactions`, and `/api/auxillaries/api-keys` as active owners rather than pane-side assumptions
- old-world port scope is explicit in draft posture too: Jira remains reader-first Bitcode need ingestion while Git/GH remains the initial admitted settle-write boundary for fourth-gate testnet-ready promotion

Current fifth-gate reminders:
- fifth-gate is the minimum-functional Bitcode gate, not a generic residue-cleanup gate; the north star is the repository being able to make shares and use shares through Bitcode-owned interfaces and state
- fifth-gate now also owns the broad old-world reform baseline: anything retained from the old world has to be cut, isolated, or Bitcode-repurposed enough that the live Bitcode path already reads as a new-world product rather than a renamed compatibility shell
- `.bitcode/fifth-gate-closure-deepening-proof.json` records post-fourth-gate-promotion closure evidence across Terminal, Exchange, persistence/schema, reform, proof, and environment axes, while deliberately keeping fifth-gate closure open
- `make shares` means authenticated source-bearing give/need writes can produce need measurement, branch artifacts, asset packs, proof, and history without falling back to demo-only or compatibility-only posture
- `make shares` now includes a mandatory post-measurement pre-fit Need review: `.bitcode/need-review.json` must expose a reviewable Need with accept, reject, and remeasure-with-feedback outcomes, `/api/need-review` must present and record those decisions for admitted app/API consumers, and fit search is admitted only after the Need is accepted for source-to-shares settlement review
- the Bitcode Terminal closure map and native need-scenario controls now also have to show that review boundary directly: reviewable Need admission appears before verification and settlement, operators can accept/reject/remeasure with feedback before fitting, and selected-detail persistence must carry that review panel forward instead of collapsing it into a raw branch artifact
- `use shares` means those outputs can be read, inspected, routed, settled, consumed, traded, or produced against through the Bitcode Terminal and admitted protocol interfaces rather than living as inert artifacts
- `use shares` now also requires settlement review to carry quantized source-to-shares fit qualities: the objective contract shown in the present-fit-for-settlement-review surface must be the same objective contract carried by settlement AssetPack receipts and the settlement-source-to-shares proof
- the Bitcode Terminal settlement panel now treats quantized source-to-shares fit qualities as first-class read state: objective contract id, source-to-shares ref, fit-quality hash, receipt refs, and quality rows must be visible in the same closure/reread model as branch artifacts and proof families
- the website application and the protocol deployment have to be treated together for fifth-gate: `/application`, APIs, MCPs, and admitted third-party app surfaces must all read/write the same Bitcode-owned system
- fifth-gate confidence now requires dual SPEC-IMPL parity, not only parallel source existence: when low-level behavior is defined in `protocol-demonstration` and commercial behavior is exposed through `uapi`, focused commercial route/API tests must exercise the same protocol contract so Bitcode requirements demonstrably drive low-level behavior upward into production architecture; this includes accepted branch materialization carrying source-to-shares artifacts, present-fit settlement review, and quantized fit-quality receipt proof through the commercial route response and then rereading accepted Need-review plus source-to-shares settlement posture through `/api/state?principal=buyer`; generated source-to-shares proof must inspect those route-test assertions directly so the fifth-gate evidence cannot pass by file presence after the route-level behavior regresses
- package and interface PARITY proof closure is now explicit fifth-gate procedure: if an active package, API route, MCP surface, Terminal panel, or admitted third-party interface carries make-share or use-share behavior, closure requires specification text, generated proof artifacts, source-content proof checks, and executable tests; file-presence-only proof is acceptable only as an inventory precursor, not as final package/interface acceptance
- `/application` fifth-gate closure depends on command, deposit, closure, and detail controls resolving into protocol-owned routes and rereading through the same Bitcode activity ledger rather than only poking preserved shell controls
- protocol-owned branch/deposit writes and retained execution-history rows are both active fifth-gate truth; fifth-gate closure accepts the path only where the Bitcode Terminal can reread and select the resulting activity
- when retained execution-history persistence lags the live shell/protocol posture, the Bitcode Terminal is allowed to project that live posture into the same activity ledger as a protocol-owned row; fifth-gate rejects only split read models, not temporary projection over the retained substrate
- projected live rows are accepted only when their selected-detail fallback preserves the same repository/give/need/fit/supply structure as the projected ledger card
- closure-bearing writes are accepted only when persisted rows carry enough closure follow-through for the Bitcode Terminal detail surface to reread settlement posture even after runtime shell drift
- the same rule extends to richer closure panels too: persisted Bitcode activity rows must carry enough verification/branch/settlement/ledger structure for selected detail to remain readable even when live shell state is absent
- the same persistence rule extends to non-closure share/use posture too: persisted Bitcode activity rows must carry enough repository-anchor, give, need, fit, and supply-selection structure for selected detail and the activity tab to reread saved posture when live execution streaming is empty
- transactional readiness is now an explicit shared fifth-gate contract too: wallet identity in `Profile`, GitHub or equivalent repository scope in `Connects`, and a selected repository anchor in the Bitcode Terminal must resolve through one review-only-vs-transactable readiness model rather than pane-local copy, and deposit/branch/closure-bearing application actions must fail closed on that shared model while read/review continuity remains open
- the same transactional-readiness contract now has a canonical profile-storage path too: active profile extras that never belonged as `user_profiles` columns now persist under `user_profiles.settings.bitcodeProfile`, auxillary/profile routes query that table by its real `id` key rather than stale `user_id` residue, and hydrated compatibility fields like `wallet_address`, `wallet_provider`, `wallet_binding_status`, `company_name`, `team_members`, `email`, and `is_verified` are reread back into the Bitcode Terminal, `Connects`, and `$BTD` from that one Exchange-owned settings carrier
- the same wallet/readiness carrier is now more precise too: Bitcode no longer collapses manual Profile-owned wallet identity and verified wallet-provider signing into the same fake `bound` posture; active profile settings, auth staging, Terminal readiness, `Connects`, and `$BTD` now distinguish `manual` identity from `verified` signing so transaction drafting can proceed honestly while signed settlement remains staged until a real signature primitive is admitted
- fifth-gate operator usability now explicitly includes protocol-demonstration-style explainer adjacency too: the Bitcode Terminal must keep field- and action-adjacent help on read/write posture, repository anchoring, supply selection, need measurement, transaction readiness, deposit provenance, and closure follow-through, and those explainers must carry `Current source` plus `Current canon` references so SPEC/PARITY reality is visible from the control being used rather than only from notes or proof docs
- active-source health for fifth-gate includes the live execution/conversation/auth/deliverables compile path too: environment-host shims, retained route handlers, VCS service typing, and the Bitcode stream helpers cannot stay blocked on old Next/Supabase/schema drift while minimum-functionality is being claimed
- that same active-source health boundary now includes retained PTRR prompt-carrier explicitness and route failure telemetry too: `packages/pipelines/asset-pack/src/agents/{design/iterate-product-md-agent.ts,digest/capture-learnings-agent.ts,validation/deliverable-pipeline-ready-to-instruct-agent.ts}` must provide concrete Bitcode `Prompt` / `PromptPart` system and step registries, and `packages/api/src/routes/deliverables.ts` must keep semantic final-work context in scope for failure telemetry so asset-pack-run failures still emit `need`, `writtenAssetType`, and `assetPack` metadata
- that same active-source health rule now explicitly includes the live conversation persistence helpers and Bitcode shell carriers too: `packages/api/src/conversations/{attachments,conversations}.ts`, `uapi/components/base/bitcode/execution/{github-selectors,pipeline-execution-log,TagOverflowList}.tsx`, `uapi/components/base/bitcode/{icons/LogoIcon.tsx,typing-animation.tsx,layout/{nav.tsx,sidebars/left-sidebar.tsx}}`, and `uapi/config/features.ts` cannot remain blocked on implicit-any residue, broken selector style bindings, missing feature-flag aliases, or shell typing mismatches while fifth-gate minimum functionality is being claimed
- the same compile-health boundary now explicitly includes repository-scope VCS and artifact persistence carriers too: `packages/api/src/vcs/github-service.ts`, `packages/artifacts/src/artifacts.ts`, `packages/browser-storage/src/{persisted-state,storage-manager}.ts`, and active compat shims like `uapi/types/{supabase-js-compat,react-compat}.d.ts` cannot remain blocked on optional-token narrowing, Supabase storage typing gaps, or browser-storage DOM/react type drift while Bitcode-owned repository anchoring and artifact persistence are active fifth-gate claims
- the same repository-scope boundary now explicitly includes the retained VCS tool package too: `packages/generic-tools/vcs/src/index.ts` cannot remain wired to nonexistent connection-manager methods, stale connection shape assumptions, or method/property tool mismatches while Bitcode-owned repository listing, PR, issue, branch, comment, and file operations are admitted fifth-gate surfaces
- the same execution/prompt compile-health boundary now explicitly includes the raw promptpart reservoir and MCP config primitive too: `packages/prompts/src/{raw_promptparts/**/*,index.ts}` and `packages/executions-mcp/src/index.ts` cannot remain blocked on duplicate promptpart imports, global-script prompt drift, or unnecessary schema dependencies while V26 is claiming Bitcode-owned prompt-system explicitness and execution-package admissibility
- the same prompt/execution admissibility boundary now explicitly includes the live prompt classes too: `packages/{execution-generics/src/prompts/ExecutionPrompt.ts,pipelines-generics/src/prompts/PipelinePrompt.ts}` must bind directly to prompt primitives rather than route the live execution path back through the retained `@bitcode/prompts` raw-promptpart barrel
- the same fifth-gate admissibility boundary now explicitly includes execution-stack package truth too: `packages/{execution-generics,agent-generics,pipelines-generics,pipelines/asset-pack,executions-mcp}` and active promptparts like `packages/prompts/src/raw_promptparts/specific/promptpart_specific_pipeline_deliverable_purpose_corestatement.ts` must clearly distinguish canonical Bitcode primitives from retained SDIVF/PTRR/meta-phase reference orchestration and must not preserve old platform narration in package headers or metadata
- the same admissibility boundary now explicitly includes MCP interface precision too: `packages/executions-mcp/{README.md,src/mcp-server/{README.md,src/{index.ts,server.ts,types/index.ts,pipeline-execution/adapter.ts},docs/{public/mcp-overview.md,openapi/bitcode-mcp-openapi.json},package.json}}` must distinguish primitive `@bitcode/mcp` utilities from the Bitcode Exchange-facing MCP server, teach `Bitcode Protocol` / `Bitcode Exchange` / `Bitcode Terminal` as one canonical hierarchy, treat repository/provider connections and attachments as execution inputs, and treat retained deliverable-style outputs as Bitcode asset packs rather than leaving MCP ingress/egress meaning implicit
- the live Bitcode MCP write contract now carries that interface precision too: `packages/executions-mcp/src/mcp-server/src/{types/index.ts,tools/pipeline-tools.ts,pipeline-execution/adapter.ts}` admits explicit repository/provider connection ingress on the deliverable tool schema, preserves normalized `inputContext` plus `interfaceSurface` on queued/completed responses, returns and queues a `writeAdmission` receipt with permission/ingress-basis/repository-anchor/input-count/asset-pack meaning, proves third-party MCP repository and attachment context as ingress-only, and returns asset-pack-normalized output meaning instead of leaving MCP writes as thin run ids plus generic deliverable residue
- the live ChatGPT App write contract now carries the same interface precision too: `packages/chatgptapp/src/{tools,server}.ts`, `packages/chatgptapp/src/__tests__/{tools,yapperFlow}.test.ts`, and `packages/chatgptapp/{README,DEMO,TLDR}.md` require `confirmed: true` before GitHub/AWS/Vercel connected-interface writes execute, reject unconfirmed writes, and return `writeAdmission` metadata that classifies those writes as source-to-shares delivery mechanisms rather than parallel Exchange state ownership
- active product semantics must teach Bitcode shares of technical intelligence, not a generic developer platform or agentic developer tooling product, even where the retained primitive substrate still uses older transaction/pipeline terms internally
- fifth-gate does not need final financial-product aesthetic tightening or post-testnet `mainnet` additions; those are later-gate concerns and must not be used to keep minimum functionality undefined
- active front-end runtime globals and animation identifiers are part of the rename/proof boundary too: `window.__BITCODE_FLAGS`, `window.__bitcodeRevealScreenshotsFired`, and Bitcode-prefixed conversation animation names are active-source proof carriers rather than cosmetic debt
- active public-shell outbound references must not rely on unreplaced old-brand social handles; where no confirmed Bitcode social replacement exists, live product surfaces should prefer stable Bitcode-owned destinations like the canonical repository or protocol spec
- active orbital styling identifiers that still carry old-brand naming, even when buried in CSS selectors, count as unclosed fifth-gate residue and must be retired under proof like any other active code carrier
- shared runtime and conversational primitives are part of the same closure boundary: active conversation-agent identity strings, repo-root helpers, LLM mock flags, and search-reservation globals must read as Bitcode because they are inherited infrastructure now driving the production application rather than isolated package internals
- retained MCP proof carriers are part of that same closure boundary now: `packages/executions-mcp/src/mcp-server/src/__tests__/{tools,integration,unit/auth}.test.ts` must pass against the current server surface and exit without lingering Jest open-handle warnings, because imported singleton timers and background cleanup loops are active runtime truth, not tolerable harness noise
- active auth and deliverable email carriers are inside the same boundary too: `supabase/config.toml`, `supabase/templates/*`, and the active vars passed from `packages/api/src/routes/deliverables.ts` must read as Bitcode because those templates are live user-facing product surfaces, not deployment-only metadata
- persistence/debug/mock/API-key contracts are inside the same boundary too: active storage keys, local pattern-learning keys, mock API-key fixtures, and API-key generation prefixes must read as Bitcode because they are shipped runtime state carriers rather than harmless internal strings
- Bitcode-core runtime truth is inside the same boundary too: `protocol-demonstration/{src/bitcode-demo.js,src/attestation-model.js,data/state.json,test/core.test.js}` must not keep `engi-*` attestation kinds, policy release ids, principal classes, or `workspace/engi-demo` provenance because those identifiers ship as active protocol/runtime state rather than incidental comments
- retained external-realization and branch-artifact contracts are inside the same boundary too: `protocol-demonstration/src/canonical/v24-external-realization.js` and `protocol-demonstration/test/core.test.js` must use `BITCODE_V24_*` env contracts, Bitcode-owned example refs like `github-app://protocol-demonstration/...`, and `BITCODE_NEED.md` rather than preserving `ENGI_V24_*` or `ENGI_NEED.md` as active runtime truth
- active external-realization witness tests and active Bitcode operating docs are inside that same boundary too: `uapi/tests/{api/externalRealizationRoute,applicationExternalRuntime}.test.ts` plus `protocol-demonstration/{CHECKLIST,SCRIPT,BITCODE_DEMO_SPEC_V15,SPEC_V6_GAP_ANALYSIS}.md` must also use `BITCODE_V24_*` and `BITCODE_NEED.md` so fifth-gate proof does not stop at runtime source while tests/docs still teach Engi-era contracts
- active proof-teaching demo docs are inside that same boundary too: `protocol-demonstration/{SCRIPT,SCRIPT_SHORT,SPEC_V6_GAP_ANALYSIS,SPEC_V6_COVERAGE_MATRIX,ARCHITECTURE_MAP}.md` must teach Bitcode-owned demo identity, Bitcode branch CTAs, current API route names, and Bitcode package lineage rather than preserving `ENGI`, `Make ENGI branch`, `make-engi-branch`, or `engi-demo/` in still-active operator and reviewer materials
- active Bitcode-core need-materialization and external-executor carriers are inside that same boundary too: `protocol-demonstration/src/canonical/{need-measurement,run-artifacts,v24-local-executors,v24-remote-adapters}.js` plus `protocol-demonstration/test/{api,workflow.integration}.test.js` must emit `BITCODE_NEED.md`, use `BITCODE_V24_*` env controls, and converge local/remote sample branch-runtime refs on Bitcode naming instead of preserving pre-Bitcode env ids, legacy local schemes, legacy review refs, or other old-brand active protocol examples
- active helper and architecture docs are inside the same boundary too: `Makefile`, `docs/api/conversations-openapi.yaml`, `packages/email/README.md`, `uapi/.env.example`, `internal-docs/{BITCODE_AUXILLARIES_READINESS,BITCODE_FRONTEND_ARCHITECTURE,BITCODE_EXCHANGE_DATABASE}.md`, and `.ai/PRODUCT.md` must teach Bitcode, auxillaries, and the current onboarding/API/application posture rather than preserving old-brand, compatibility-route, or V26 examples in proof-bearing documentation
- active internal/product teaching docs and operator scripts are inside that same boundary too: `PRODUCT.md`, `internal-docs/{BITCODE_TERMINAL_OPERATOR_EXPERIENCE,INTEGRATIONS,BITCODE_CONVERSATIONS,BITCODE_API}.md`, and `scripts/phase2-complete.sh` must teach Bitcode naming, Bitcode-owned examples, and the current conversations/API/integration posture rather than preserving old-brand product statements, sample orgs, share symbols, or hard-coded historical repo paths
- active internal prompt/MCP/generated-contract docs are inside that same boundary too: `internal-docs/{BITCODE_CONNECTED_SERVICES,DOC-CODING,BITCODE_PROMPT_SYSTEM}.md`, `packages/executions-mcp/src/mcp-server/src/types/index.ts`, and `packages/orm/src/types/database.generated.ts` must use Bitcode-owned mock/path examples, Bitcode prompt identities, and clean generated output rather than preserving old mock-route names, old branded prompt constants, stale repo-root examples, or stray generator banner lines
- active MCP/security/testing/web-search public carriers are inside that same boundary too: `packages/executions-mcp/src/mcp-server/{docs/public/{mcp-overview,mcp-api-reference}.md,src/docs/{mcp-spec-generator,openapi-generator}.ts,deployment/kubernetes/deployment.yaml}`, `packages/security/README.md`, `packages/testing/src/prompt-quality-framework/README.md`, and `packages/web-search/README.md` must use Bitcode-owned extension ids, webhook paths, deployment namespaces, action/image refs, support addresses, documentation links, and repo clone paths rather than preserving `engi.*`, `engi/mcp-*`, `security@engi.com`, `docs.engi.ai`, or `github.com/engi/engi` in active operator/public teaching
- active draft/env/measuring contracts are inside that same boundary too: `protocol-demonstration/data/state.json`, `internal-docs/{BITCODE_LLM_REGISTRY,SECURITY,BITCODE_PROTOCOL_THESIS}.md`, `tsconfig.json`, `uapi/tsconfig.json`, and `packages/procurement/src/quality-assessment.ts` must use `BITCODE_SPEC_V27*`, `BITCODE_LLM_*`, `BITCODE_ENABLE_MCP_*`, Bitcode thesis naming, and Bitcode-owned measuring helpers rather than preserving `ENGI_SPEC_V27*`, `ENGI_LLM_*`, stale `measureEngi` aliases, or undefined Engi-branded quality-analysis calls
- active protocol/workflow residue carriers are inside that same boundary too: `protocol-demonstration/src/receipt-schemas.js`, `protocol-demonstration/test/{v20-quality-fixture,contract-change-ledger,e2e}.js`, `.github/workflows/web-search-production.yml`, and `scripts/user_deletion_function_with_cascading_cleanup.sql` must use Bitcode-owned schema URIs, generator ids, protocol-demonstration fixture paths, Bitcode promotion script names, Bitcode deployment domains, and Bitcode example operator emails rather than preserving `engi.software`, `engi-demo`, `promote-engi-canon`, `generate-engi-proven`, `staging.engi.com`, `engi.com`, or `@engi.software` in active runtime-adjacent carriers
- active canon-posture truth is inside that same boundary too: `protocol-demonstration/src/{canon-posture.js,canonical/v22-canon-posture.js}` and `protocol-demonstration/test/canon-posture.test.js` must read `BITCODE_SPEC.txt` plus `BITCODE_SPEC_{V26,V27,*}` paths for the live V26/V27 posture rather than preserving `ENGI_SPEC.txt` or `ENGI_SPEC_V26/V27*` in the current canonical runtime/report surface
- active historical promotion-proof carriers are inside that same boundary too: `protocol-demonstration/test/v22-canon-drift.test.js` must use the current `scripts/{check,prepare,promote}-bitcode-*.mjs` toolchain and `protocol-demonstration/*` runtime fixtures while keeping historical V23/V24/V25 spec-family fixtures rooted only under `_legacy/ENGI_SPEC_*`, rather than preserving dead `check-engi-*` script refs or `engi-demo/*` runtime fixture ownership outside `_legacy/`
- active historical matrix and companion docs are inside that same boundary too: `protocol-demonstration/{SPEC_V7_COVERAGE_MATRIX,SPEC_V8_COVERAGE_MATRIX,SPEC_V9_IMPLEMENTATION_MATRIX,SPEC_V10_IMPLEMENTATION_MATRIX,SPEC_V11_IMPLEMENTATION_MATRIX,SPEC_V12_IMPLEMENTATION_MATRIX,SPEC_V13_IMPLEMENTATION_MATRIX,SPEC_V14_IMPLEMENTATION_MATRIX,SPEC_V15_IMPLEMENTATION_MATRIX,BITCODE_DEMO_SPEC_V15}.md` must preserve legacy-spec lineage explicitly while no longer teaching live `ENGI_SPEC.txt`, `make-engi-branch`, `engi-demo/`, or canonical ENGI wording outside `_legacy/`
- the preserved protocol owner move is inside that same boundary too: `protocol-demonstration/` is the only admissible live root-sibling owner for the preserved protocol/runtime surface, so `scripts/prepare-bitcode-runtime-canon-promotion.mjs`, `protocol-demonstration/src/canonical/{v21-specifying,proven-generator,v22-canon-posture}.js`, `.github/workflows/bitcode-canon-quality.yml`, `.gitignore`, and `protocol-demonstration/test/{canon-posture,v22-canon-drift,v26-canon-language,v26-active-product-naming}.test.js` must resolve that root-sibling owner directly and must not preserve `packages/bitcode` or `engi-demo` as active filesystem truth
- active env examples, Storybook config, internal docs, and canon workflow carriers are inside that same boundary too: `.env`, `.env.local`, `.v26.env`, `uapi/.env`, `uapi/.storybook/{main,preview}.tsx`, `internal-docs/{README,BITCODE_INTERFACE_STYLE,BITCODE_EXECUTION_WORK_SUMMARIES,DEPLOYMENT}.md`, and `.github/workflows/protocol-demonstration-canon-quality.yml` must use `BITCODE_*` env examples, Bitcode Storybook aliases/comments, Bitcode internal-doc teaching, and Bitcode workflow/job names rather than preserving `ENGI_*` examples, `@engi/*` aliases, Engi-branded internal-doc headings, or the dead `engi-demo` CI path
- active marketing/style/operator carriers count the same way: `uapi/app/(root)/components/{MarketingFeatureBento,MarketingFeatureList,MarketingHeadlessMobileShowcase,MarketingSteps,MarketingTestimonialsCTA}.tsx`, `uapi/{components/base/README.md,styles/{CONSOLIDATED_SYSTEM_GUIDE,orbital}.css,tailwind.config.ts,public/email-logo.svg,stories/email-templates/*}`, `uapi/scripts/long-runner-worker.ts`, `Dockerfile.long-runner`, `packages/styling/README.md`, `packages/generic-tools/lsp-query/src/prompts/lsp-context-awareness-composition.ts`, `.ai/PRODUCT.md`, `INVESTOR_MEMO.md`, `VULNERABILITY_AUDIT_2026-04-02.md`, and `.sales/INTRO_PAMPHLET.md` must use Bitcode-owned asset names, domains, image tags, path teaching, and brand language rather than preserving `Engi`, `engi.dev`, `api.engi.sh`, `engi/long-runner`, or `engi/` base-component ownership in active repository truth
- active integration/example/doc carriers count the same way too: `internal-docs/{BITCODE_API,BITCODE_CONNECTED_SERVICES,BITCODE_INTERFACE_STYLE}.md`, `packages/mysql/README.md`, and `uapi/mocking/generators/ComprehensiveMockDataGenerators.ts` must teach Bitcode-owned API hosts, auxillaries ownership, marketplace preview hosts, and package descriptions rather than preserving `api.engi.software`, orbitals-owned connects-pane references, `marketplace.engi.com`, or `ENGI platform` wording in active repository truth
- active platform-package and auxillary-teaching carriers count the same way too: `packages/{auth,postgresql,jira,supabase}/README.md`, `packages/supabase/src/client.ts`, `packages/templates-generics/{src/types.ts,package.json}`, `internal-docs/BITCODE_INTERFACE_STYLE.md`, and `uapi/mocking/{README.md,COMPREHENSIVE_SYSTEM_SUMMARY.md,generators/ComprehensiveMockDataGenerators.ts}` must teach Bitcode platform ownership and User Auxillaries wording rather than preserving `ENGI platform`, `engi system`, or `User Orbital` in active repository truth
- active protocol/demo telemetry and root-artifact teaching carriers count the same way too: `protocol-demonstration/src/{demo-scenario,canonical/v23-bitcoin-demonstration-service,canonical/v20-quality}.js`, `README.md`, `packages/observability/README.md`, `packages/time/README.md`, and `packages/tools-generics/src/{Tool,doc-code-tool/index}.ts` must keep Bitcode-owned telemetry ids, stubbed bitcoin carrier ids/examples, generated appendix names, `.bitcode/*` root artifact teaching, and shared package comments/docs rather than drifting back to `engi.*`, `tb1qengi*`, `lnbcrt1engi*`, `make ENGI branch`, `.engi/*`, or `ENGI platform`
- active package-readme and V20 quality-proof carry-through carriers count the same way too: `packages/{google-analytics,tech-types,sentry,kubernetes,logger,orm,streams}/README.md`, `packages/orm/src/index.ts`, `scripts/code-review/{README.md,base-review.sh}`, and `protocol-demonstration/test/{v20-quality-summary,v20-operator-transcript}.test.js` must keep Bitcode-owned platform wording, need-measurement grounding for `tech-types`, Bitcode review-framework headings, and the historically correct `_legacy/ENGI_SPEC_V20_PROVEN.md` appendix expectation rather than preserving `ENGI platform`, `ENGI ORM`, `ENGI CODE REVIEW FRAMEWORK`, or stale generated-appendix names in active docs and proof carriers
- active `tech-types` package usability is inside that same boundary too: `packages/tech-types/{src/tech.ts,src/uniqueTech.ts,src/signals.ts,src/signals-runtime.js,README.md,src/__tests__/tech-types.test.ts,jest.config.cjs,tsconfig.json}` must keep a package-usable need-measurement vocabulary surface, fail-closed unique-tech identifier helpers, package-owned signal normalization, and direct package-local proof rather than preserving misleading examples or type-level contracts that collapse under current toolchain reality.
- active `tech-types` runtime normalization is inside that same boundary too: `protocol-demonstration/src/{bitcode-demo.js,canonical/need-measurement.js}` must emit a canonical `technologyProfile` derived through `packages/tech-types` rather than letting measured need and downstream dependents drift back to ad hoc stack-hint-only semantics; `technologyProfile` is the preferred V26 naming for that normalized structure.
- active application write-through carriers are inside that same boundary too: `uapi/app/application/{ApplicationPageClient,ApplicationCommandDeck,ApplicationDepositComposer,ApplicationClosureControlDeck,ApplicationTransactionWorkspace,ApplicationTransactionDetailSurface,application-activity-history}.tsx?` plus the retained `/api/executions/history` route must ensure Bitcode Terminal command/deposit/closure writes create, select, and reread canonical Bitcode activity rows rather than leaving those actions as shell-only side effects.
- active `tech-types` dependent packages are inside that same boundary too: `packages/generic-agents/tech-types-identifier/{src/index.ts,src/technology-profile-contract.ts,src/__tests__/technology-profile-contract.test.ts,README.md}` must consume, prove, and describe the canonical `technologyProfile` envelope directly rather than flattening it back into ad hoc stack-only output contracts.
- active `technologyProfile` compile follow-through is inside that same boundary too: `./node_modules/.bin/tsc -p packages/generic-agents/tech-types-identifier/tsconfig.json --noEmit` must stay green, with the shared closure carried through `packages/{orm,pipelines-generics,streams,supabase}/*`, so V26 does not treat package-local tests as sufficient while the real dependent compile chain is still broken.
- active `$BTD` balance/package renaming is inside that same boundary too: `packages/{btd,api,digest,web-search,orm}/*`, `uapi/{app/api/auxillaries,app/application,app/executions,tests,components/base/bitcode/{btd,execution,inputs},stories/BTDInvestmentExperience.stories.tsx,.env.example,README.md,app/orbitals/README.md}/*`, and `protocol-demonstration/test/v26-active-product-naming.test.js` must carry canonical `$BTD` wording, `@bitcode/btd` imports, `UserBtdBalancesModel` / `UserBtdTransactionsModel` ownership, BTD-first route payloads, `btdUsed` transaction/workspace processing stats, and BTD-named investment/resource-estimation surfaces rather than preserving `credits` as the live application/package canon.
- active in-product BTD acquisition and BTD-notification execution paths are inside that same boundary too: `uapi/components/base/bitcode/btd/{btd-tracker,BTDPrices}.tsx`, `uapi/app/(root)/components/MarketingPricingSection.tsx`, `/auxillaries/btd`, `uapi/networking/api-client.ts`, and `supabase/templates/{low_btd_reminder,out_of_btd,btd_transfer}.html` must be canonical owners rather than routing through `app/_legacy`, and they must keep BTC→`$BTD` acquisition/balance/transfer wording plus BTD-named template and fetch paths rather than preserving checkout/Stripe route owners, `credit-transfer`, `low-credits-reminder`, `out-of-credits`, or `_legacy/tps/stripe/checkout`.
- active organization treasury and interface-readiness carriers are inside that same boundary too: `uapi/app/{auxillaries/components/organization/{BTDTreasuryManagement,OrganizationSettings}.tsx,orbitals/components/organization/OrganizationSettings.tsx,(root)/components/MarketingSetupForm.tsx}` must keep wallet-settled BTC, issued `$BTD`, GitHub-before-transaction readiness, and Connects-owned SSO/auth policy posture rather than preserving Stripe-backed credit purchase scaffolding, and `uapi/app/_legacy` must not exist anywhere in the active application tree.
- active E2E onboarding and auxillary proof carriers are inside that same boundary too: `uapi/tests/e2e/{auxillaries.helpers,auxillaries.profile,auxillaries.connections.flows,auxillaries.interfaces.flows,auxillaries.navigation,auxillaries.btd.flows,auxillaries.btd.interval.active,auxillaries.btd.chart.nodata,account.btd.visual,onboarding.visual,onboarding-full-flow}.spec.ts` must teach auxillaries and `$BTD` naming in filenames, onboarding-state helpers, test titles, and snapshot ids rather than preserving `orbital.*` / `credits.*` proof carriers as active product truth.
- active auxillary runtime-selector closure is inside that same boundary too: `uapi/app/auxillaries/components/{AuxillariesProvider,AuxillariesSurface,AuxillariesContent}.tsx`, `uapi/app/auxillaries/components/shared/AuxillariesPaneTabs.tsx`, `uapi/components/base/bitcode/nav/AuxillariesUseButton.tsx`, `uapi/styles/{orbital-global,orbital}.css`, `uapi/tests/auxillariesProvider.test.tsx`, and the active auxillary Playwright specs must use `auxillaries-*` portal/open/button/label selectors and portal ids rather than preserving `data-orbital-testid`, `orbital-portal`, `orbital-open`, `orbital-label-active`, or `__orbitalPrefetched` as the live runtime/test interface.
- active V26 devex and mock closure are inside that same boundary too: `uapi/package.json`, absent `uapi/{package-lock.json,pnpm-lock.yaml}`, and `uapi/mocking/*` must keep wallet/BTC/`$BTD` canon rather than preserving nested Stripe lockfiles, deleted checkout remnants, or `USER_CREDITS` / `ORGANIZATION_CREDITS` / `CREDIT_TRANSACTIONS` as active developer-facing Bitcode truth.
- active MCP BTD budgeting and settlement semantics are inside that same boundary too: `packages/executions-mcp/src/mcp-server/src/{types,auth/middleware,pipeline-execution/adapter,tools/pipeline-tools,tools/orchestration-tools,resources/*,__tests__/*,docs/openapi-generator.ts,server.ts}` must expose `btdBalance`, `manageBtd`, `minimumBtd`, `estimatedBtd`, and `btdUsed` across auth, execution, metrics, fixtures, and OpenAPI/public resource output rather than keeping `creditBalance`, `manageCredits`, or `creditsUsed` as active machine-interface truth.
- active Bitcode acquisition and asset-pack execution storytelling is inside that same boundary too: `uapi/app/(root)/components/MarketingBtdInvestmentExperience.tsx`, `packages/executions-mcp/src/mcp-server/{ARCHITECTURE.md,docs/public/mcp-overview.md,src/__tests__/fixtures/MCPTestFixtures.ts,src/__tests__/tools/MCPToolsTestSuite.test.ts}`, `uapi/stories/conversations/{RichTextInput,Pickers,PipelineIntegration,CompleteSystem}.stories.tsx`, and `uapi/tests/api/deliverables.test.ts` must teach wallet-gated BTC settlement, GitHub-before-transacting posture, asset-pack execution, and `$BTD` planning rather than preserving Stripe checkout, credit-investment copy, or legacy insufficient-credit route assertions.
- settlement-layer `debits` and `credits` inside `protocol-demonstration/src/canonical/settlement.js` remain admissible only as exact accounting-entry semantics; they are not a product-denomination exemption, and all user-facing, API-facing, MCP-facing, and application-facing balance/spend language must remain BTC/`$BTD`.
- active preserved-protocol runtime posture is inside that same boundary too: `protocol-demonstration/{src/bitcode-demo.js,src/canon-posture.js,test/e2e.test.js}` must emit `bitcode/remediation-*` branch namespaces and a Bitcode-only canon/spec-family identity rather than leaving `engi/remediation-*` or an active `ENGI_SPEC` fallback in live runtime, interface proof, or operator posture
- active need-measurement placeholder and auxillary onboarding carriers are inside that same boundary too: `uapi/app/{application/application-run-data.ts,api/auxillaries/onboarding/route.ts,api/auxillaries/notifications/_shared.ts}`, `uapi/hooks/useConversationStream.ts`, `uapi/mocking/middleware/MockMiddleware.ts`, `uapi/tests/{orbitalsOnboardingRoute,applicationTransactions}.test.ts`, and `internal-docs/{BITCODE_AUXILLARIES_READINESS,BITCODE_CONNECTED_SERVICES,BITCODE_FRONTEND_ARCHITECTURE,BITCODE_EXCHANGE_DATABASE,BITCODE_API,BITCODE_EXECUTIONS,BITCODE_AGENTIC_EXECUTION,BITCODE_INTERFACE_STYLE}.md` must teach the canonical auxillary pane contract and the reserved need-measurement placeholder posture rather than stale completed-step-only or Measure-placeholder wording
- active terminology/architecture teaching docs are inside that same boundary too: `internal-docs/{TERMINOLOGY,BITCODE_ARCHITECTURE_PATTERNS,PERFORMANCE,BITCODE_VERIFICATION,BITCODE_PROTOCOL_THESIS}.md` plus `uapi/ARCHITECTURE.md` must teach Bitcode and auxillary-facing architecture/performance/testing posture rather than preserving Engi-branded headings, repo descriptions, or orbital terminology in active implementation guidance
- active Bitcode-core primitive ownership is inside that same boundary too: `protocol-demonstration/src/{bitcode-core,ranking-explainer,benchmark-model,seed,policy-release,server-ranking,attestation-model}.js` plus `protocol-demonstration/src/canonical/{surfaces,v20-quality,v23-bitcoin}.js` and `protocol-demonstration/ARCHITECTURE_MAP.md` must use Bitcode-owned core filenames, telemetry namespaces, policy ids, seeded org ids, executor-class ids, and `bitcode-system:*` principal refs rather than preserving `engi-core.js`, `engi.*`, `engi-policy-*`, `engi-demo.*`, or `engi-system:*` in active runtime truth
- root workspace/package carriers are inside the same boundary too: `package.json`, `pnpm-lock.yaml`, `.eslintrc.cjs`, `scripts/start-bitcode-mcp.sh`, and `packages/eslint-plugin-bitcode/*` must use Bitcode naming in monorepo ids, workspace links, lint-plugin ids/rule namespaces, and MCP launcher/runtime flags rather than preserving old script paths or old plugin package names outside `_legacy/`
- digest runtime/cache carriers are inside that same boundary too: `packages/digest/{caching/index.ts,caching/__tests__/caching.test.ts,run/digest.ts,run/__tests__/generateDigest.test.ts,jest.config.cjs,tsconfig.test.json,__mocks__/protocol-demonstration/logger.ts,__mocks__/lib/git/git.ts,service/README.md}` must use `/tmp/protocol-demonstration/*` paths and Bitcode mock/file paths rather than preserving `/tmp/engi/*` cache roots or `__mocks__/engi/*` ownership in active runtime and test contracts
- the current fifth-gate API proof delta is now explicit: `protocol-demonstration/test/workflow.integration.test.js` is green end-to-end, while the remaining `protocol-demonstration/test/api.test.js` failures are the localhost-binding remote-adapter cases that need unsandboxed proof rather than more rename drift
- retained package harnesses and generated JS artifacts count the same way: `packages/{doc-code,supabase,generic-doc-comment-plugins}` must not keep `engi` naming in active mock filenames, import examples, or shipped JS/comments just because the TypeScript source has already been updated
- active ChatGPT app type carriers count the same way too: `packages/chatgptapp/src/types/protocol-demonstration__*.d.ts` are the canonical fifth-gate filesystem owners, and the older `engi__*.d.ts` names are no longer admissible outside `_legacy/`
- retained agent-generics runtime-contract drift counts the same way too: `packages/agent-generics/src/{diagnostics/instrumentation.ts,steps/{failsafe-sequence,thricified-generation}.ts,substeps/factories.ts}` must not preserve duplicated diagnostic-context merges, pretend homogenous `sequential(...)` typing across heteromorphic generation/failsafe executors, or write raw `unknown` validation errors into execution storage; those are active carry-over errors in the Bitcode runtime corridor, not harmless generic debt
- retained VCS connection/provider runtime-contract drift counts the same way too: `packages/vcs/src/{connections.ts,provider.ts}` must normalize `user_connections.connection_data` before reading or writing access/refresh/install-token fields, map legacy installation auth into the canonical `VCSAuth` shape instead of returning half-ported payloads, and avoid claiming `AbstractVCSProvider` conformance from the base provider class unless that contract is actually declared; those are active repository-boundary carry-over errors in the Bitcode runtime corridor
- retained generic-tool caller drift counts the same way too: `packages/generic-tools/{files-maintaining/src/index.ts,multimodal-processing/src/{MultimodalProcessingTool.ts,processing.ts},repository-setup/src/index.ts}` must not preserve stale package subpaths, old `Tool` class metadata/name/description assumptions, or half-ported repository-setup provider/auth contracts; those are caller-layer carry-over errors above the reusable Bitcode primitive boundary, not reasons to deform the underlying abstractions
- retained Jira/use-computer caller drift counts the same way too: `packages/generic-tools/{mcps-tools/jira/src/index.ts,multimodal-processing/src/index.ts,use-computer/src/index.ts}` plus `packages/pipelines/asset-pack/src/tools/DeliverablePipelineUseComputerTool.ts` must not preserve nullable Jira-connection assumptions, stale multimodal class exports after a factory-tool refactor, or the older schema-class `Tool` pattern for shell-execution tools; those are caller-layer carry-over errors above the reusable Bitcode tool primitive boundary
- retained deliverable-tool wrapper and Finish/Delivering drift counts the same way too: `packages/pipelines/asset-pack/src/{tools/{DeliverablePipelineCloneVCSRepositoryTool,DeliverablePipeline{MultimodalProcessing,AudioComprehension,ImageComprehension,PDFComprehension,VideoComprehension}Tool,index}.ts,agents/finish/deliver-asset-pack-to-destination-agent.ts}` must not preserve old variadic wrapper forwarding, optional-tool leakage into typed registries, raw string `Prompt.set(...)` payloads, or duplicate-Zod schema identity mismatches; those are caller/orchestration carry-over errors above the reusable Bitcode primitive boundary
- retained deliverable phase/index and setup-schema drift counts the same way too: `packages/pipelines/asset-pack/src/{agents/{implementation/*.ts,setup/deliverable-pipeline-comprehend-need-agent.ts},phases/{setup,design,digest,discovery,implementation,index}.ts,index.ts,preprocess.ts,postprocess.ts}` plus `packages/pipelines-generics/src/{execution/PipelineExecutor.ts,phases/sdivf-factory.ts,streaming/pipeline-stream-integration.ts}` must not preserve dead declarative phase-runner metadata, unsupported PTRR config keys, wrong discovery-registration aliases, `PipelineExecution` over-narrowing at the phase-runner boundary, or stale schema-default variance in the setup comprehension agent; those are active caller/orchestration carry-over errors in the Bitcode deliverable corridor, not primitive justification for preserving wrong ports
- retained repository-boundary VCS caller/provider drift counts the same way too: `packages/{generic-agents/vcs/src/index.ts,github/src/providers/github-provider.ts}` must not preserve schema-value-as-type misuse in the VCS agent layer, provider-local commit fields like `parentShas` that drift from canonical `VCSCommit.parents`, or webhook-verification helpers that leak the wrong sync/async contract into the stable provider abstraction; those are caller/provider carry-over errors above the reusable Bitcode VCS boundary
- retained ORM persistence drift counts the same way too: `packages/orm/src/models/{user-btd-transactions,deliverables,notifications}.ts` must not preserve implicit-`any` reducers or null-key assumptions inside the active `$BTD` transaction and deliverable statistics carriers; those are active share/use storage-path carry-over errors in the Bitcode persistence corridor, not harmless model debt
- fifth-gate proof closure is not allowed to stop at rename cleanup; the newly admitted application, API, MCP, prompt, ChatGPT-app, and retained package surfaces have to prove to the same rigorous standard the earlier Bitcode core already established
- broad old-world reform now follows `protocol-demonstration/V26_REFORM_STRATEGY.md`; corridor-by-corridor work is expected to classify, mirror, boundary-harden, verify, and only then rename or cut
- the remaining closure checklist is now explicit too:
  - `make shares`: repository anchor, give-side supply selection, need measurement, fit/settlement posture, deposit, branch, and closure must all be writable back into the Bitcode activity ledger rather than only mutating preserved shell state
  - `use shares`: the Bitcode activity ledger must remain the dominant searchable/filterable/paginatable read surface, with selected activity exposing asset packs, proofs, history, and settlement follow-through without teaching a separate primary route
  - interface totality: `/application`, APIs, conversations, MCPs, and admitted app surfaces must all read from and write to the same Bitcode-owned system instead of tolerating parallel state models
  - system stability: active-source compile/runtime health and the required proof-generation path must both be good enough to support a truthful minimum-functional closure claim
- repository anchoring and boundary-runtime honesty now count as explicit fifth-gate write surfaces too: the repository-supply anchor and external-readiness posture visible in `/application` are not complete if they only orient the operator; they must also be recordable into the same Bitcode activity ledger that deposit/branch/closure already use

Current sixth-gate reminders:
- sixth-gate is no longer where broad reform first happens; it is where the already-reformed fifth-gate baseline is elevated into an actual minimal viable product
- the post-fifth-gate application map must become explicit and stable as an MVP: `activity` as the dominant searchable transaction master/detail surface, `transactions` as the write-space for Bitcode operations, `conversations` as the ChatGPT-style Bitcode read/write surface, and `auxillaries` as the non-duplicative settings/connections/identity/`$BTD` system around the network core
- conversations should aim for interface and tool-registration parity with the ChatGPT app surface rather than drifting into a lesser in-app chat adjunct

Current seventh-gate reminders:
- seventh-gate is where the MVP is refined into an initial commercially-viable live-launch posture on testnet rather than where whole-repository provation first happens
- launch readiness has to be visible across Exchange, Terminal, Protocol, Proofs, API, MCP, and admitted app surfaces together

Current eighth-gate reminders:
- V26 is not fully done when fifth-gate naming residue reaches zero or when seventh-gate launch quality is good enough; the whole repository still has to prove as one Bitcode system
- sixth- and seventh-gate elevation/refinement work must be reflected in proof space, docs, and generated artifacts before eighth-gate can close
