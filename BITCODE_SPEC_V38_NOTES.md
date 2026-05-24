# Bitcode Spec V38 Notes

## Status

- Canonical pointer: `BITCODE_SPEC.txt` -> `V37`
- Active canonical anchor: `BITCODE_SPEC_V37.md`
- Active generated proof appendix: `BITCODE_SPEC_V37_PROVEN.md`
- V38 state: notes-only draft opening

## Notes-only draft rule

V38 begins as a notes-only draft opening, not first-gate implementation. The
active implementation remains V37 until a V38 version branch and Gate 1 draft
family explicitly open the V38 specification set.

These notes preserve candidate work without creating source identifiers,
routes, tests, or package APIs that claim V38 implementation before Gate 1.

## Deferred from V37

V37 promoted Website Conversations. V38 is inference-focused: it should correct
remaining gaps in the pipeline inference stack, fully use Bitcode's existing
agent, prompt, execution, tool, telemetry, and registry primitives, and bring
all Reading inference surfaces to commercial-readiness without weakening any
runtime boundary.

Source anchors already exist and must be audited before V38 implementation:

- `packages/agent-generics/src/steps/failsafe-sequence.ts` defines
  `FailsafeGenerationSequence` as prepare-concise-context, chunk-then-sum, and
  stitch-until-complete wrappers over `ThricifiedGeneration`.
- `packages/agent-generics/src/steps/thricified-generation.ts` defines
  `ThricifiedGeneration` as the strict Reason, Judge, StructuredOutput chain.
- `packages/agent-generics/src/agents/factories.ts` requires
  `factoryAgentWithPTRR` callers to provide an agent prompt plus complete
  Plan, Try, Refine, and Retry step prompt registries.
- `packages/tools-generics/src/Tool.ts`,
  `packages/tools-generics/src/doc-code-tool/DocCodeToolPrompt.ts`, and
  `packages/tools-generics/src/doc-code-tool/formatUsableTools.ts` define the
  doc-comment-backed tool prompt path that inference prompts must consume.
- `packages/pipelines/asset-pack/src/reading-pipeline-contract.ts`,
  `packages/pipelines/asset-pack/src/read-need.ts`,
  `packages/pipelines/asset-pack/src/depository-search.ts`, and
  `packages/pipelines/asset-pack/src/tools/*DepositorySearchTool*` define the
  current `ReadNeedComprehensionSynthesis` and
  `ReadFitsFindingSynthesis` contracts, tools, search result shape, and
  source-safe preview boundary.

Thricification remains the lowest-level inference call chain. It is the final
place where phase, agent, step, substep, tool-documentation, and generation
prompt registries are resolved, composed, interpolated, and constrained to the
typed output. Failsafe chains may prepare context, chunk large inputs, summarize
or stitch large outputs, retry repairable typed-output failures, and organize
execution ancestry state around those calls, but inside PTRR agents they must
delegate final reason, judge-reasoning, and structured typed response
production to `ThricifiedGeneration`.

Tools remain step-owned capability executions, not hidden children of
`ThricifiedGeneration`. Tool definitions must still be represented in final
prompts through the doc-comment `DocCodeToolPrompt` path, composed and
interpolated at the lowest inference point with the same source-safe telemetry
discipline as all other prompt material.

## Candidate V38 workstreams

- Audit every inference point in Reading pipelines, Website Conversations,
  tool-definition prompts, and interface-specific inference entrypoints. The
  audit must count base primitives and specific implementations separately:
  phase prompts, PTRR agent prompts, step prompts, Failsafe substep prompts,
  ThricifiedGeneration prompts, tool prompt definitions, prompt templates,
  interpolation bindings, expected context fields, raw outputs, parsed typed
  outputs, and repair/failure surfaces.
- Specify the exact execution stack for pipeline agents without overlapping
  names: PipelineExecution owns phases; PTRR agents own Plan, Try, Refine, and
  Retry steps; FailsafeGenerationSequence owns context preparation, large input
  handling, large output handling, and repair orchestration; ThricifiedGeneration
  owns Reason, Judge, and StructuredOutput inference calls; ToolExecution owns
  callable tools and tool input/output receipts.
- Require all PTRR agent steps to use practical FailsafeGenerationSequence
  layers above ThricifiedGeneration unless a source-backed exception is
  specified, tested, and justified. The default Reading stack should be
  PipelineExecution -> PTRR agent -> PTRR step -> FailsafeGenerationSequence ->
  ThricifiedGeneration -> provider call.
- Finish prompt and PromptPart benchmarking so semantically divided
  PromptParts and complete Prompts are both benchmarkable. V38 Gate 1 should
  inventory existing `benchmarks:` doc-comment metadata, the
  `packages/prompts/src/benchmarking/*` runner, and all Reading and
  conversation prompt surfaces, then define initial benchmark suites for every
  prompt part and prompt used by active inference.
- Complete prompt registry composition and interpolation rules from phase
  prompts through agent prompts, step prompts, substep prompts, final generation
  prompts, and tool documentation. The final inference call must expose the
  unrendered template identity, interpolated prompt, context bindings, selected
  tools, raw response, parsed output, and schema verdict to telemetry at the
  proper disclosure tier.
- Integrate this inference work with prior telemetry. Execution ancestry
  state-stack data must be written, read, prepared by Failsafe layers,
  interpolated into prompts, maintained through retries, and streamed as
  source-safe phase, agent, step, Failsafe, ThricifiedGeneration, tool, input,
  output, and typed-result events.
- Complete `ReadFitsFindingSynthesis` depository-search internals as the
  coupled second focus of V38. Fit-finding queries are inference-derived and
  must search throughout the Bitcode Depository using lexical, symbolic, path,
  metadata, measurement, embedding/vector, and provider-specific channels where
  appropriate.
- Harden the depository-search tool and primitive utility stack around source
  embeddings, measurement embeddings, metadata embeddings, query synthesis,
  ranking, verification, and AssetPack synthesis handoff. Existing OpenAI
  embedding policy (`text-embedding-3-small`, 1536 dimensions, cosine
  `match_deliverable_vectors`) is an active source anchor, and V38 may specify
  additional LlamaIndex, Pinecone, or provider-backed channels only when their
  boundaries, storage, credentials, telemetry, and tests are explicit.
- Preserve the economic carry-through from found fits to AssetPack settlement:
  selected fit deposits must remain traceable into source-safe preview,
  post-settlement delivery, contributor compensation, exact ledger/database
  synchronization, and proof receipts.
- Clarify how Bitcoin, GitHub, compute, storage, and build/process boundaries
  are represented in long-running inference and pipeline telemetry.
- Confirm that source-safe telemetry exposes prompt templates, interpolated
  prompts, raw provider responses, parsed typed results, repair attempts, and
  failed-output evidence only at their permitted disclosure tier.

The V38 acceptance posture is commercial inference correctness: Bitcode's
ability to maximize inference intelligence must produce reliable technical
intelligence measurement, labeling, fit-finding, AssetPack synthesis, and
mutually beneficial depositing and Reading exchange.

## Non-goals during V38 opening

- No new production route, API version, source package name, or UI label should
  carry V38 in source code during the notes-only opening.
- No Bitcoin, GitHub, compute, storage, or build/process runtime boundary may
  be weakened while the inference execution stack is being clarified.
- No V38 gate may begin until Gate 1 creates the full draft family and updates
  the roadmap from this notes-only posture.
