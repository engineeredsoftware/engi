# Bitcode Spec V48 Notes

## Status

- Version: `V48`
- Canonical pointer: `BITCODE_SPEC.txt` -> `V47`
- Active canonical anchor: `BITCODE_SPEC_V47.md`
- Active generated proof appendix: `BITCODE_SPEC_V47_PROVEN.md`
- Current canonical/latest target: `V47`
- Prior canonical anchor: `BITCODE_SPEC_V46.md`
- Prior generated proof appendix: `BITCODE_SPEC_V46_PROVEN.md`
- V48 state: notes-only draft opening
- Scope: V48 starts as the interactive local experiential QA target over promoted V47 commercial website testnet launch canon.
- QA findings ledger: `BITCODE_V48_QA.md` (the running record of accepted V48 findings and repairs)
- Gate 1 (in progress): identity and authentication interactive QA on branch `v48/gate-1-identity-auth-interactive-qa`
- Full draft family (`BITCODE_SPEC_V48.md`, `BITCODE_SPEC_V48_DELTA.md`, `BITCODE_SPEC_V48_PARITY_MATRIX.md`) opens in a dedicated specification-authoring gate once the interactive QA tracks have accumulated the specification intent; Gate 1 closed as the identity/authentication QA-and-repairs gate

## Notes-only draft rule

These notes make the V48 draft target visible to strict spec-quality checks
after V47 promotion. They are not first-gate implementation authority, not a
full V48 specification family, and not permission to bypass the V47 canon. V48
work must continue by exercising the live commercial testnet experience
interactively, recording accepted findings, creating an explicit parity
matrix, and then opening scoped gate branches only after the QA-driven
specification intent is clear.

## Deferred from V47

V47 promoted commercial website testnet launch readiness. It launch-froze
`/deposit`, `/read`, `/packs`, and Auxillaries, made measurement law and the
IP seller/buyer state machines exact, completed the depositor and reader
websites, the packs/Auxillaries commercial dashboard, browser-proven E2E IP
selling and buying, landing/public launch messaging, the staging-testnet
deployment rehearsal, and promotion readiness — all over the preserved
Bitcoin/BTC settlement language, BTD scalar-volume and rights language,
GitHub delivery boundaries, compute constraints, storage boundaries, and
build/process validation carried from the promoted V46 comprehension canon.

V48 begins from the remaining question: what does the first live commercial
(testnet) experience still need before real users can walk every core step
without friction. The opening posture is intentionally experiential: run the
deployed staging-testnet system end to end, step by step, and fix what breaks.

## Candidate V48 workstreams

- Environment preparation: staging Supabase database readiness, wallet-fauceted
  testnet BTC, local telemetry expectations, and a step-by-step debugging
  experience that validates each core user step.
- Identity and authentication: sign up/in, and Auxillaries readiness for
  connecting GitHub, wallet(s), and other external surfaces.
- Depositing: connecting knowledge, requesting AssetPack syntheses to review,
  reviewing, and depositing.
- Reading: connecting knowledge, requesting a Read, reviewing the synthesized
  Need, reviewing potential Fits, and buying Fit(s).
- Ledgerized journaling: replayability, auditability, `/packs` page UX/UI, and
  the personal (Auxillaries) history of work.

## V48 Gate 1 in progress: identity and authentication interactive QA

Gate 1 exercises the live commercial testnet experience exactly as the
notes-only rule directs: interactively, recording accepted findings in
`BITCODE_V48_QA.md` (F1-F10 so far), and landing fail-closed repairs on the
gate branch. The full draft family is authored at Gate 1 closure from this
QA-driven specification intent.

Accepted findings converted to repairs so far:

- Supabase `redirect_to` law: GoTrue validates the Auth redirect allow-list by
  exact string match, so `redirect_to` must stay query-free. The post-auth
  destination travels through origin-local storage
  (`uapi/lib/supabase-auth-redirect.ts`) and is consumed once by the callback.
  This repaired wallet sign-in from both localhost and production www, which
  previously stranded the PKCE verifier and never minted a session.
- Identity-derived wallet binding: the canonical wallet sign-up signs on the
  OAuth provider authorize page, so nothing is staged client-side to replay.
  `/api/wallet/authenticate` now derives the binding server-side from the
  session's GoTrue-verified `custom:bitcode-bitcoin` identity
  (`source: 'oauth-identity'`), and `WalletSessionPersistenceBridge` triggers
  it whenever a wallet-backed session has no replayable local proof.
- Post-auth landing is `/packs`, not the legacy `/terminal` overlay route.

Specification intent surfaced for the eventual V48 family (decisions, not yet
law): eradicate legacy email/phone authentication residue (`/login`,
`LoginForm`, PhoneSSO) and the legacy `/terminal` route after verifying its
capabilities ported to `/packs`, `/read`, and `/deposit`; decide the
solo-operator organization-authority posture (personal-organization bootstrap
at wallet sign-up versus a neutral unconfigured state); complete the GitHub
App sessionless install staging path, whose pending-installation cookie
currently has no consumer.

## V48 Gate 2 in progress: depositing interactive QA and the AssetPacksSynthesis refactor

Gate 2 (branch `v48/gate-2-depositing-interactive-qa`) is explicitly the
significant-refactoring gate and a critical gate for the commercial viability
of Bitcode: interactive depositing QA exposed that deposit AssetPack option
"synthesis" was deterministic blueprint scaffolding (`BITCODE_V48_QA.md`
F12), and the accepted repair is architectural, not cosmetic. Gate 2's
charter (Garrett, 2026-06-12): consolidate Bitcode's pipelines into the
single AssetPacksSynthesis pipeline (plural Packs — one run can create
multiple packs), clean all legacy terminal code, and correct the incomplete
pipeline-execution actualities (real data, the Vercel sandbox actually
running pipelines, real accounting) so V48 QA reaches real demonstrability
of information commoditization — the ability to exchange knowledge,
fundamentally unlocked by measurement. The implementation builds maturely on
the existing strong primitives (prompts, registries, executions) and
generics (agents, pipelines) rather than inventing parallel machinery.

Accepted V48 architecture law (decided 2026-06-12):

- Bitcode has a single synthesis/measurement pipeline: **AssetPacksSynthesis**
  (`packages/pipelines/asset-pack/src/asset-packs-synthesis.ts`). Depositing
  and Reading are the same operation at the core — measuring source knowledge
  into commercially legible AssetPack candidates — with variance carried
  entirely by the lens: steering prompts (depositor instructions versus read
  Need), the available measurement catalog (deposit: source-coverage /
  demand-alignment / reuse-likelihood; read adds need-fit), and candidate
  framing. Measurement is the heart of Bitcode's commodification capability,
  so it is centralized in this one pipeline; lens adapters translate
  lens-specific contracts to and from the core. The deposit lens shipped in
  Gate 2; the reading lens migrates onto the core when Track 3 opens.
- Deposit option synthesis is real: `POST /api/deposit/synthesize-options`
  builds an exclusion-filtered source inventory from the depositor's
  connected GitHub source, runs bounded structured inference, persists the
  execution with real token/duration accounting, and emits options that keep
  the promoted V43/V47 option law (schema, roots, review boundaries,
  source-safety posture) so policy and admission consume them unchanged.
- Protected-IP exclusions are first-class synthesis steering: excluded paths
  and concepts never enter measurement, prompts, or option summaries, and
  candidates that touch them are dropped fail-closed (F14).
- Legacy `/terminal` code is refactored out as it is encountered during gate
  work (rule accepted 2026-06-12), with the dedicated F8 sweep retiring the
  remainder.

## V48 Gate 3 in progress: synthesis pipeline algorithmic + telemetric correctness, and the SynthesizeAssetPacks SDIVF unification

Gate 3 (branch `v48/gate-3-synthesis-pipeline-correctness`) is the synthesis
pipeline correctness gate, driven by interactive QA of the deposit synthesis
telemetry. It pursues both algorithmic correctness (the pipeline runs on the
real Bitcode execution/agent/prompt primitives rather than a hand-rolled
inference loop) and telemetric correctness (every LLM call renders decipherably
in the rich SDIVF telemetry), and in doing so unifies and formalizes the
pipeline.

Accepted V48 architecture law (decided 2026-06-25):

- The Gate-2 AssetPacksSynthesis measurement core is generalized into the
  one-and-only Bitcode synthesis pipeline: **SynthesizeAssetPacks** — a full
  **SDIVF** pipeline (Setup -> Discovery -> Implementation -> Validation ->
  Finish, with the Discovery/Implementation/Validation loop iterating up to a
  bounded maxIterations) executed in one of two **modes**: deposit or read.
  The mode is resolved once and stored on the **shared pipeline execution** (the
  parent of all phase children), NOT on a phase sibling — `sequential` runs
  preprocess and each phase on isolated sibling child executions
  (`execution.child('seq-N')`) and mode resolution only walks ancestors, so a
  mode stored inside preprocess is invisible to the phases (QA F20: they default
  to read and run the read-lens agents during a deposit run). All variance is
  carried by **conditional runtime registries** — each phase registers and
  resolves the mode-appropriate agents, tools, and prompts under the same phase
  keys (the registry is shared up the execution tree, so a phase's registrations
  are visible to its agent resolution). Renamed SynthesizeAssetPacks for parity with the future
  Gate-6 **SettleAssetPacks** pipeline; it subsumes the legacy, poorly-named
  "Develop" gate (which remains a thin alias so its `develop.*` observability
  is unchanged).
- Every LLM call builds upwards the prompt registry of
  Pipeline+Phase+Agent+Step+Generation and runs on the formal primitives, not
  hand-rolled inference: `PipelineExecution` -> phase -> `factoryAgent`/
  `factoryAgentWithPTRR` -> step -> Failsafe(prepare|chunk|stitch) of
  Thricified(reason|judge|structured_output). The pipeline is N agents
  (mostly PTRR, some Simple — both are base `Agent` implementations) across the
  5 phases; each PTRR agent renders 4 steps x 3 failsafe x 3 thricified = 36
  formal LLM calls. Every call renders in the rich SDIVF telemetry with correct
  phase/agent/step/failsafe/generation labels, because the formal executors
  populate the execution state (the lightweight path's `undefined` labels were
  a symptom of bypassing them).
- **Inference is non-configurable** (Garrett, 2026-06-26; removes the PROFILE
  concept entirely). There are NO inference profiles (no bounded/full, no
  `BITCODE_ASSET_PACK_REAL_INFERENCE_PROFILE`, no per-agent `*_USE_PTRR` flags,
  no in-agent deterministic/bounded fallbacks). The formal pipeline ALWAYS runs
  the complete hierarchy and the lowest-level Generation ALWAYS performs real
  inference — the hierarchy is fixed, not env-switched. Determinism for tests is
  provided ONLY by mocking the LLM provider at the boundary (test infrastructure),
  never by branches inside the pipeline. This retires
  `runtime-inference-policy` (the profile/`shouldUsePtrr` functions),
  `bounded-structured-inference`, and the read-lens agents' deterministic
  branches; every agent resolves to its `factoryAgent*` formal executor.
- **SynthesizeAssetPacks executes via the pipeline HARNESS, decoupled from the
  dispatching request** (Garrett, 2026-06-26). Because the pipeline always runs
  the full hierarchy (many LLM calls), it must not be bound to a single HTTP
  request's `maxDuration`. The route VALIDATES + DISPATCHES a run and returns the
  `runId` immediately; the harness runs the full pipeline to completion while
  source-safe telemetry streams to `execution_events`; the client detects the
  completion event (already streamed) and reads the persisted synthesis from the
  execution row `output`. Two execution hosts behind one harness interface:
  **local in-process** (dev — the persistent Node server runs the dispatched
  pipeline as a background task) and the **Vercel Sandbox** (prod — durable
  isolated execution via the existing `pipeline-hosts` host). The `/deposit`
  synthesize-options surface stops awaiting the pipeline inline; the LLM-call
  timeout (QA F25) remains a per-call safety bound within the harness run.
- Per-phase jobs (Garrett, 2026-06-25): **Setup** clones the repository and
  runs a danger-wall (safety/risk admission); **Discovery** explores the
  source; **Implementation** synthesizes the AssetPacks; **Validation**
  determines synthesis quality, corrections/additions, and the iterate-vs-
  complete decision; **Finish** uploads the synthesized artifacts.
- **Finish uploads the synthesized artifacts to Bitcode for user review in
  BOTH modes** (deposit: before Depository admission; read: before purchase).
  Opening a pull request is NO LONGER part of synthesis — PR / settlement
  delivery moves to the future Gate-6 SettleAssetPacks pipeline (confirm BTC
  payment, mint BTD, transfer rights to the reader). Develop-gate consumers
  degrade gracefully to no-PR.
- The deposit lens now RUNS the full SDIVF pipeline inline from
  `POST /api/deposit/synthesize-options` against the streaming execution, so the
  SDIVF telemetry renders end to end; the bounded-structured-inference path
  remains a resilience fallback when the pipeline yields no admissible options.
- Source-safety is enforced universally by `sourceSafeStreamEvent`, the single
  content-withholding gate every persisted/streamed pipeline event passes through.
  It withholds by **metadata allowlist**, not a content-key denylist: every `llm`
  store is content-withheld (message → `[content withheld — source-safe]`, data →
  a structural summary of {stage, generation, provider, model, contentChars,
  phase, agent, step}) EXCEPT a fixed source-safe metadata set
  (`startTime/endTime/duration/usage/status/provider/model/configKey/stopReason/
  error`). The allowlist is required because the two LLM-call paths name their
  content keys differently — the Thricified substeps use `input/prompt/output/
  parsedOutput`, while `AgentLLMsRegistry`/`PipelineLLMRegistry` (direct `getLLM`)
  use `messages/config/response` — and a denylist silently leaked `llm/response`
  (the raw provider response) as a status-event message (QA F18). A
  synthesis-local defense-in-depth candidate assertion remains; `rawPromptVisible`
  / `rawProviderResponseVisible` stay false by law.
- Telemetry rendering is single-line and bounded: the activity builder collapses
  every event to exactly one bounded line (one streamed event = one accordion
  row, never fragmented by embedded newlines) and the log row title spans carry
  `min-w-0` so a long line truncates within its row rather than x-overflowing the
  page (QA F18). The log auto-follows: it pins to the latest line as rows stream
  in unless the user has scrolled away from the bottom (then it respects their
  position and resumes only when they return to the bottom) (QA F23).
- **Formal telemetry log-line contract** (QA F19): the rich telemetry renders
  EXACTLY two formal log-line kinds — the ultimate LLM-call layer and Tool uses,
  nothing else (informational status, phase banners, and completion/error notices
  are NOT rows: run completion shows via the processing indicator and errors via
  the log's error banner). (1) **LLM calls** — the inference leaf, canonically the
  Thricified substep output (`llm/output`, stream type `generation`), carrying the
  full hierarchy Phase→Agent→Step→Failsafe→Thricified + source-safe content +
  provider/model/usage, each level its own pill. (2) **Tool uses** —
  `tool|tools:result|error`, carrying Phase→Agent→Step + tool name/arguments (no
  Failsafe/Thricified). Pills map by fixed role: Phase (grey, phase icon) top-left,
  Agent (blue, agent icon) top-2nd; Step / Failsafe / Thricified bottom 1-2-3, each
  with a guaranteed icon (per-type default refined by a label substring match).
  Every other store event (step/agent/phase name stores,
  prompt-side llm keys, the `llm/response` registry copy, cwd paths, generation
  markers, tool sub-keys) is intermediate CONTEXT: the activity builder folds it
  into a rolling `{phase, agent, step, failsafe, generation}` context (so the next
  LLM/tool row is stamped with its full hierarchy) but never emits it as a row.
  Distinct calls that share withheld text stay distinct rows via a unique
  null-separated row key; the renderer displays the text before the separator,
  keys details by the full key, and bypasses de-dup for uniquely-keyed rows. This
  is what removes the `try`/`setup-plan`/`thricified-generation`/path fragments
  and stabilizes the pipeline↔UI payload contract. The contract depends on the
  client seeing the SAME structured event shape live as on reload: the live SSE
  tail (`usePipelineExecution`) therefore relays raw `event_data` verbatim
  (namespace/key/executionState intact) rather than re-parsing it — re-parsing
  flattened events into namespace-less status frames, which defeated the
  classifier and leaked every store as a fragment row during streaming.
- **OTF (on-the-fly instructions) is eradicated entirely** as legacy residue:
  the dead telemetry types (`otf_instructions`/`otf_adherence`), the unused
  `setOnTheFly` prompt primitive, the live instruction-injection feature (the
  instructions API + the `run_otf_instructions` ORM model + the submit UI + the
  `waitForInstruction` Validation-phase pause), and the physical
  `deliverable_pipeline_otf_instructions` table (drop migration).

AssetPack model (decided 2026-06-25):

- An **AssetPack is ALWAYS a completely synthesized artifact** — never a slice of
  existing source. It comprises: the synthesized **patch** (new content written
  as code edits to the repo — deposit: the depositing repo; read: the reading
  repo), its **measurements**, and its **metadata** (e.g., the contributing
  AssetPacks for a pack synthesized for a Need). Implementation synthesizes the
  patch into the Setup-cloned workspace (via a code-edit/write tool), measures it,
  and attaches the metadata; the patch CONTENT is withheld pre-settlement.
- **Deposit** AssetPacks are "Readless/Needless": patches against the
  **depositing** repo carrying only **absolute** measurements (taken by looking
  at the content directly, independent of any Need). Depositing produces them as
  Depository supply.
- **Read** AssetPacks are patches against the **reading** repo, synthesized from
  the deposited AssetPacks that fit-finding selects from the Depository (the
  deposited packs are the synthesis input). A read AssetPack carries the absolute
  measurements PLUS the **fit** measurements (how well the pack fits the read
  Need). Its **BTD** — what is bought for Bitcoin — is the **normalized scalar
  weighted sum of all fit-only measurements**; the reader's Need unlocks the
  additional fit measurements that finalize the pack's BTD content.
- Measurement + BTD grounding (mapped 2026-06-25): the canonical V48 measurement
  catalogs live in `packages/pipelines/asset-pack/src/asset-packs-synthesis.ts`.
  **Absolute** (deposit): source-coverage (0.36) / demand-alignment (0.40) /
  reuse-likelihood (0.24). The read catalog adds the **fit-only `need-fit`**
  (0.44) alongside source-coverage (0.28) / reuse-likelihood (0.28). The BTD
  scalar is computed in `btd-scalar-volume-quote.ts` under the fixed-point
  weighted-volume policy `need-relative-fixed-point-weighted-volume`
  (weightScaleBps 10000, volumeScale 1e6, floor-row-remainder-rooted):
  `scalarMicroBtd = volume × weightBps × admittedFitQualityBps / 1e8` per
  measurement, summed and normalized — a read AssetPack's BTD is this sum over its
  fit-only measurements. The read Need pricing vector
  (semantic_relevance / source_binding / artifact_kind_fit / closure_specificity)
  is in `read-need.ts`. The patch is carried as `fileChanges` + the source binding
  (covered paths) with the actual patch CONTENT withheld pre-settlement (the
  source-safe preview boundary; content unlocks to owner_read / licensed_read on
  settlement). `protocol-demonstration/` is the V47 realization framework (type
  contracts, receipt schemas), NOT the V48 measurement source of truth.

Lens inputs (decided 2026-06-25): the single-prompt user input is
**Obfuscations** when depositing (what to obfuscate/withhold — supersedes the
"depositor instructions" naming) and a **Need** when reading. Depositing and
reading run ~the same agents; the lens carries the variance by adding the Need
(read) or the Obfuscations (deposit).

The five phases (same agents in both modes, lens-varied — decided 2026-06-25):

- **Setup**: clone the repository, danger-wall (risk admission), and
  **input-comprehension** (comprehend the Need when reading / the Obfuscations
  when depositing). The deposit input-comprehension produces structured
  obfuscation guidance — the source paths and concepts to withhold and how
  synthesis must honor them — stored at `setup:inputComprehension` for the
  downstream phases (authoritative alongside the protected-IP exclusions). The
  read Setup-plan agent (planning Finding Fits from an accepted Read-Need) is
  read-lens work and is punted under the deposit lens (a passthrough, no row);
  that fits-finding planning moves to the read-lens **Discovery** phase in the
  read gate (QA F22).
- **Discovery** — three agents discovering from the codebase, the Depository, and
  the model itself respectively, for the synthesis lens:
  - `discovery:codebase-comprehension` — comprehends the cloned source.
  - `discovery:depository-search` — deposit: guides likely-to-be-read framing for
    the packs being synthesized; read: finds the deposited AssetPacks from the
    Depository that fit (will help synthesize the read AssetPack).
  - `discovery:inherent-regurgitation` — the model returns, from its training
    data, any and all information useful to the deposit/read synthesis.
  - Deposit stores each agent's comprehension for the Implementation phase:
    `discovery:codebaseComprehension` (capabilities / knowledge-areas / modules),
    `discovery:depositorySearch` (likely-read topics / demand-alignment /
    readability), `discovery:inherentRegurgitation` (relevant knowledge / patterns
    / references).
- **Implementation**: synthesize the AssetPack patch(es) with their absolute
  measurements (read additionally computes the fit measurements and the BTD).
  Each candidate is a measured patch — the measured option fields plus a
  SOURCE-SAFE patch descriptor (`fileChanges` [path + change-op] and a
  natural-language `patchSummary`), recorded via the `AssetPackPatchWriteTool`
  (a formal `ExecutionTool`) which the synthesis agent reads from the Discovery
  stores (`discovery:codebaseComprehension` / `:depositorySearch` /
  `:inherentRegurgitation`) and the obfuscation comprehension. Pre-settlement the
  RAW patch content is never produced — only the descriptor + measurements are
  reviewable (stored at `implementation:assetPacks`; the reviewable face at
  `implementation:options`). Physical materialization of the raw content into the
  cloned workspace is the delivery/settlement context.
- **Neediness (deposit preview of read Need-fit; v0)**: a deposit-lens AssetPack
  PREVIEW measurement (0..1) estimating the reading demand the pack would satisfy
  — the depositor's preview of its future read-side `need-fit` (and ultimately
  BTD / earnings), which guides which packs are worth synthesizing. It is SEPARATE
  from the absolute deposit composite (source-coverage / demand-alignment /
  reuse-likelihood) — an estimate of a different (read) lens, shown alongside but
  not folded in. Computed deterministically per pack as
  `neediness = clamp01(demand × (0.5 + 0.5 × (1 − saturation)))` from two
  source-safe signals the depository-search lens supplies: `demand` ∈ [0,1]
  (estimated reading demand for the pack's knowledge — v0: the Discovery
  `depository-search` demand guidance / `demandAlignment`, grounded in the
  depositor `demandContext`) and `saturation` ∈ [0,1] (how much the Depository
  already supplies the topic — v0: the depository-search `underservedTopics`
  signal). Demand gates, scarcity boosts: a demanded, underserved pack scores
  highest (a future Need would have few alternatives, you the supplier); a
  saturated or undemanded pack scores low. The deposit synthesis agent emits the
  per-pack `needinessSignal {demand, saturation, rationale}`; `computeNeediness`
  derives the scalar in the shared lib (`asset-packs-synthesis.ts`); the `/deposit`
  option cards preview it as earning potential. Source-safe: derived scalars +
  topic descriptors only, never raw source. **v1 is deferred to Gate 7**: replace
  `saturation` with a real embedding-vector probe of the pack against the
  Depository supply index, and `demand` with a search against an accrued
  Read-Need / demand corpus; once the pack is read, the realized read `need-fit`
  + BTD calibrate the estimate.
- **Validation**: quality thresholds, coverage/corrections/fixes, and AssetPack
  smoke/sanity checks; the Discovery/Implementation/Validation loop iterates until
  complete or maxIterations. The deposit validator (`validation:deposit-quality`)
  validates the synthesized AssetPacks — measurement honesty (0..1), distinctness,
  source-safety, obfuscation/exclusion compliance, patch-descriptor coherence, and
  coverage — emitting `{issues, qualityScore, coverageGaps, recommendation}`. Its
  issues are stored at `validation/implementation:issues` (the key the canonical
  ReadyToFinish gate reads); any issue forces `iterate`.
- **Finish**: upload the synthesized AssetPack(s) to Bitcode for review.

Implementation status vs this model (Gate-3 build-down list): the deposit
Implementation currently emits measured candidate OPTIONS (metadata), not yet the
measured PATCH carrying the absolute-measurement schemas; Discovery still runs the
legacy five read agents, not the canonical three; the deposit input is still
"instructions", not Obfuscations; Setup lacks input-comprehension. These are now
specified and become the remaining Gate-3 implementation. The measurement-schema
and BTD-computation grounding is to be drawn from `protocol-demonstration/`.

## Non-goals during V48 opening

- Do not implement V48 product behavior from this notes-only opening.
- Do not rewrite V47 promoted canon except through an explicit addendum.
- Do not expose raw source, unpaid AssetPack source, secrets, wallet private
  material, private settlement payloads, raw prompts, or raw provider responses.
- Do not collapse estimate, quote, observed payment, final settlement,
  contributor allocation, delivery, compensation, and repair states.
- Do not launch value-bearing mainnet settlement in V48 opening work.
- Do not treat notes-only V48 material as stronger than active V47 protocol law.
