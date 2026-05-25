# @bitcode/protocol

Formal Bitcode protocol package for commercial source.

V29 Gate 8 made this package the package-native boundary for canonical helpers
that were originally ported from the standalone `protocol-demonstration`
witness. Commercial scripts, API/runtime code, and workflow checks must import
canon posture, spec-family checks, canonical-input checks, canon-drift checks,
and proven-generation helpers from `@bitcode/protocol` or
`packages/protocol/src/index.js`.

They must not import `protocol-demonstration/src/*`. The demonstration remains
a standalone minimal witness and may still be executed or cited by proof
inventories, but it is not a commercial runtime implementation dependency.

Current exported commercial helpers include:

- active/draft canon posture (`V39` active, `V40` draft after V39 promotion);
- spec-family and canonical-input validation helpers;
- canon-posture drift reporting;
- `DocumentationSurfaceCatalog` helpers for V35 documentation surface proof;
- `TelemetryTaxonomyCatalog` helpers for V35 source-safe event family and redaction posture proof;
- `PublicDocsUsageGuideCatalog` helpers for V35 source-safe public docs usage and disclosure-boundary proof;
- `OperatorRunbookCatalog` helpers for V35 dashboard, alert, runbook, incident, and escalation proof;
- `DocsQaAlignmentReport` helpers for V35 code/spec/docs/proof/artifact/workflow alignment proof;
- `TestnetRolloutReadinessGuide` helpers for V35 contributor, operator, enterprise reader, depositor, interface consumer, lane, settlement caveat, blocker, and rehearsal rollout proof;
- `TelemetryDocumentationInterfaceIntegration` helpers for V35 Terminal, Auxillaries, API, MCP API, ChatGPT App, package README, internal docs, and public docs event/proof/docs/runbook/redaction proof;
- `LocalStagingTelemetryDocumentationRehearsal` helpers for V35 local/staging-testnet documentation discovery, telemetry event emission, dashboard/runbook lookup, docs QA, incident drill, source-safe proof-root review, redacted screenshot/log roots, and blocked value-bearing mainnet proof;
- `ExchangeActivityBook` helpers for V36 market-wide activity rows, filters, detail sections, proof roots, event ids, redaction posture, and ledger/database projection references;
- `ExchangeIntent` and `ExchangeOrder` helpers for V36 buy/sell/bid/ask/cancel/accept/settle/history transition contracts, authority, idempotency, policy, fail-closed, replay, and source-safety posture;
- `ExchangeRightsTransferPreview` helpers for V36 BTD range identity, current owner, requested buyer, rights scope, settlement unlock, disclosure limit, owner-read, licensed-read, blocked transfer, and source-safety posture;
- `ExchangePricingQuote` helpers for V36 BTC amount, measurement weight, measurement volume, liquidity band, wrapper analysis, treasury route, depositor route, reader route, quote root, and source-safety posture;
- `ExchangeSettlementReceipt` helpers for V36 payment observation, finality, rights-transfer receipt, ledger/database/object-storage reconciliation, delivery state, repair id, and source-safety posture;
- `ExchangeDisputeRepairCase` and `ExchangeRevenueRoute` helpers for V36 repair, escalation, revenue conservation, route allocation, and source-safety posture;
- `ExchangeUxProof` helpers for V36 Exchange route usability, Terminal handoff, collapsed readable status, expanded source-safe detail, and telemetry dashboard proof roots;
- `ExchangeRehearsal` helpers for V36 local/staging-testnet Exchange rehearsal coverage, source-safe log/screenshot roots, ledger/database synchronization checks, and blocked value-bearing mainnet proof;
- `ConversationSession` route-history helpers for V37 route-local session identity, create/restore/branch/retry/redact/stream operations, proof roots, event ids, and persistence boundaries;
- `ConversationStreamEvent` helpers for V37 model deltas, tool calls, retrieval summaries, proof roots, retry states, completion decisions, error rows, collapsed readable status, expanded metadata, redaction posture, prompt/result disclosure posture, and fail-closed stream telemetry;
- `ConversationWritingWorkspace` helpers for V37 Read Request, Need feedback, AssetPack review note, and Terminal handoff summary drafting modes, save/restore/summarize/handoff actions, route-local draft keys, keyboard/responsive fullscreen behavior, recovery states, proof roots, event ids, and source-safe handoff summaries;
- `ConversationSourceSelector` helpers for V37 repository, branch, commit, deposit, BTD range, AssetPack preview, document, and prior conversation selectors governed by account, organization, wallet, rights, settlement, disclosure, and policy posture with allowed, denied, and retry-required source-safe preview states;
- `ConversationTerminalHandoff` helpers for V37 Depositing, Reading, Finding Fits, Exchange, settlement, and delivery handoff workflows with conversation id, transaction id, repository anchor, source selector refs, source-safe summary, policy result, Terminal route, transaction detail, proof roots, event ids, ledger boundary, wallet boundary, and Terminal cockpit authority posture;
- `ConversationPersistencePrivacyRedaction` helpers for V37 public, user-visible, organization-visible, buyer-visible, reviewer-visible, and operator-only visibility tier separation, persist/restore/export/delete/retention/replay/incident repair postures, proof roots, event ids, and source-safe durable storage privacy;
- `ConversationTelemetryProofHooks` helpers for V37 session, message, stream, tool, source selector, Terminal handoff, retry, error, and completion telemetry families with source-safe dashboard panels, runbook ids, correlation ids, proof roots, redaction posture, and protected-payload exclusion;
- `ConversationRehearsal` helpers for V37 local/staging-testnet conversation rehearsal coverage, source-safe log/screenshot roots, route/UI checks, telemetry roots, and blocked value-bearing mainnet proof;
- `V38InferenceSurfaceInventory` helpers for V38 Reading, Conversation, tool-definition prompt, interface entrypoint, prompt registry, and execution primitive inference-surface inventory;
- `V38PtrrFailsafeThricifiedStack` helpers for V38 practical PTRR agent stack proof, FailsafeGenerationSequence over ThricifiedGeneration binding, step-owned tool boundaries, source predicates, and source-safe generated metadata;
- `V38PromptBenchmarkReport` helpers for V38 source-safe PromptPart and complete Prompt benchmark coverage across Reading, Conversation, and tool-definition inference surfaces;
- `V38InferenceTelemetryDisclosureReport` helpers for V38 source-safe inference telemetry rows, disclosure tiers, raw provider response boundaries, schema verdicts, retry/repair posture, and rich stream UI/storage projection proof;
- `V38ReadFitsFindingSearchEmbeddings` helpers for V38 source-safe Finding Fits query plans, depository search channels, embedding policy, threshold ranking, selected-fit provenance, and search receipts;
- `V38InferencePromotionReadinessReport` helpers for V38 source-safe promotion readiness across inference artifacts, generated proof support, workflow posture, and V38 active / V39 draft runtime preparation;
- `V39DepositorySupplyIndexing` helpers for V39 source-safe Depository supply records, search documents, vector projections, storage readback posture, rights boundaries, repair actions, and Finding Fits handoff;
- `V39EnterpriseReadingUxState` helpers for V39 source-safe Terminal Reading stages, low-detail defaults, expandable detail, Conversation `readingStage` handoff, rich stream-log integration, component tests, and opt-in browser proof workflow posture;
- `V39ReadNeedReviewResynthesis` helpers for V39 source-safe ReadNeed review, feedback/resynthesis lineage, accepted-Need admission, rejected-Need posture, runtime storage projection, and telemetry receipt proof;
- `V39ReadFitsFindingRuntime` helpers for V39 source-safe Finding Fits runtime storage, many-candidate ranking, selected-fit provenance, replay receipts, repair posture, and active embedding policy proof;
- `V39AssetPackPreviewQuoteBoundary` helpers for V39 source-safe AssetPack preview, deterministic share-to-fee BTC quote, disclosure leak scanning, settlement instructions, delivery lock, replay receipt, and repair posture proof;
- `V39InterfaceConversationProductParity` helpers for V39 source-safe Terminal, Conversation, public API, MCP API, ChatGPT App, and package-consumer Reading parity with no parallel authority or delivery bypass;
- `V39CommercialReadingPromotionReadinessReport` helpers for V39 source-safe commercial Reading promotion readiness across all V39 Reading artifacts, generated proof support, workflow posture, promotion dry-run support, and active V39 / draft V40 runtime preparation;
- canonical proven-generation helpers;
- the package app/server context used by commercial interfaces.

This is the `V39` active, `V40` draft after V39 promotion posture accepted by
V39 canonical promotion.
V40 Gate 1 treats this package as promotion-critical runtime posture and opens
the exhaustive testing specification family for active V39 / draft V40 work.
`packages/protocol/src/canon-posture.js` and `packages/protocol/data/state.json`
must remain aligned to `V39` active, `V40` draft after promotion.
V40 Gate 1 is wired through `check:v40-gate1` and documents the exact browser
E2E, visual/screenshot, API integration, pipeline integration, Conversation and
Terminal integration, unit coverage, ledger/database/storage synchronization,
local/staging rehearsal, prompt benchmark smoke, and V41 prompt-program
readiness scope that later V40 gates must implement.
V40 Gate 2 adds `V40TestInventoryCoverageMatrix` through
`packages/protocol/src/canonical/v40-test-inventory-coverage-matrix.js`,
`packages/protocol/test/v40-test-inventory-coverage-matrix.test.js`,
`.bitcode/v40-test-inventory-coverage-matrix.json`, and `check:v40-gate2`.
The artifact is source-safe metadata only and inventories owners, commands,
source roots, generated artifact targets, and closure gates for each V40 testing
surface before the later gates implement deeper coverage.
V40 Gate 3 adds `V40UnitCoverageInventory` through
`packages/protocol/src/canonical/v40-unit-coverage-inventory.js`,
`packages/protocol/test/v40-unit-coverage-inventory.test.js`,
`.bitcode/v40-unit-coverage-inventory.json`, and `check:v40-gate3`.
The artifact is source-safe metadata only and closes the unit layer for critical
packages, primitives, isolated implementations, Reading AssetPack units,
interface helpers, and the demonstration boundary.
V40 Gate 4 adds `V40ApiIntegrationContracts` through
`packages/protocol/src/canonical/v40-api-integration-contracts.js`,
`packages/protocol/test/v40-api-integration-contracts.test.js`,
`.bitcode/v40-api-integration-contracts.json`, and `check:v40-gate4`.
The artifact is source-safe metadata only and closes API, UAPI, MCP, ChatGPT
App, persistence, authorization, and response-schema integration contract
coverage.
V40 Gate 5 adds `V40ReadingPipelineIntegrationCoverage` through
`packages/protocol/src/canonical/v40-reading-pipeline-integration-coverage.js`,
`packages/protocol/test/v40-reading-pipeline-integration-coverage.test.js`,
`.bitcode/v40-reading-pipeline-integration-coverage.json`, and
`check:v40-gate5`.
The artifact is source-safe metadata only and closes integration coverage for
the real Reading pipeline topology, Need runtime, Finding Fits search runtime,
PTRR agents, preview/settlement/delivery boundaries, telemetry/readback,
Terminal harness, generic primitives, host harnesses, and local/staging
rehearsal linkage.
V40 Gate 6 adds `V40ConversationTerminalIntegration` through
`packages/protocol/src/canonical/v40-conversation-terminal-integration.js`,
`packages/protocol/test/v40-conversation-terminal-integration.test.js`,
`.bitcode/v40-conversation-terminal-integration.json`, and
`check:v40-gate6`.
The artifact is source-safe metadata only and closes integration coverage for
Conversation handoff route contracts, Conversation stream-to-rich-log
projection, route/API persistence and branch contracts, writing/source selector
handoff, Terminal Reading state readback, Terminal harness log streaming,
transaction-cockpit authority boundaries, and rehearsal/docs/interface parity.
V40 Gate 7 adds `V40BrowserE2eVisualProof` through
`packages/protocol/src/canonical/v40-browser-e2e-visual-proof.js`,
`packages/protocol/test/v40-browser-e2e-visual-proof.test.js`,
`.bitcode/v40-browser-e2e-visual-proof.json`, and `check:v40-gate7`.
The artifact is source-safe metadata only and closes browser E2E, visual,
accessibility, responsive, interaction-state, screenshot/trace, and overflow
coverage for Terminal, Conversations, Auxillaries, Exchange, and Docs.
V40 Gate 8 adds `V40LedgerStorageSync` through
`packages/protocol/src/canonical/v40-ledger-storage-sync.js`,
`packages/protocol/test/v40-ledger-storage-sync.test.js`,
`.bitcode/v40-ledger-storage-sync.json`, and `check:v40-gate8`.
The artifact is source-safe metadata only and closes ledger, database,
object-storage, wallet, settlement, BTD rights, source-to-shares compensation,
repair, Terminal readback, and post-settlement pull-request delivery
synchronization coverage.
V40 Gate 9 adds `V40LocalStagingRehearsalAutomation` through
`packages/protocol/src/canonical/v40-local-staging-rehearsal-automation.js`,
`packages/protocol/test/v40-local-staging-rehearsal-automation.test.js`,
`.bitcode/v40-local-staging-rehearsal-automation.json`, and `check:v40-gate9`.
The artifact is source-safe metadata only and closes local/staging-testnet
operator receipts, lane-bound secret-family checks, explicit live-execution
opt-in, Vercel Sandbox harness evidence and telemetry capture, staging-testnet
database stream/readback binding, Reading rehearsal continuity, synchronization
continuity, and value-bearing mainnet blocking.
V40 Gate 10 adds `V40PromptBenchmarkSmokeV41Readiness` through
`packages/protocol/src/canonical/v40-prompt-benchmark-smoke-v41-readiness.js`,
`packages/protocol/test/v40-prompt-benchmark-smoke-v41-readiness.test.js`,
`.bitcode/v40-prompt-benchmark-smoke-v41-readiness.json`, and
`check:v40-gate10`.
The artifact is source-safe metadata only and closes PromptPart and composed
Prompt benchmark smoke coverage before V41 by binding deterministic local smoke
receipts, the package benchmark report command, V38 benchmark inventory
evidence, workflow wiring, and the V41 prompt-program worklist without
rewriting prompt content or serializing raw prompt/provider payloads.
V39 Gate 1 is wired through `check:v39-gate1` and documents the exact
Depository supply, five-step enterprise Reading UX, ReadNeed review,
ReadFitsFinding runtime, AssetPack preview, deterministic BTC quote, BTD rights
transfer, post-settlement delivery, ledger/database/storage synchronization,
operational telemetry/repair, interface parity, and local/staging rehearsal
scope that later V39 gates must implement.
V39 Gate 2 adds `V39DepositorySupplyIndexing` through
`packages/protocol/src/canonical/v39-depository-supply-indexing.js` and the
source-safe generated artifact `.bitcode/v39-depository-supply-indexing.json`.
The supply indexing report proves `DepositorySupplyIndex` lifecycle receipts,
source-safe search documents, active embedding/vector projection, retained
Supabase storage readback posture, depositor/Reader settlement boundary,
deterministic repair actions, and Finding Fits source-safe handoff. The
maintained commands are `pnpm run generate:v39-depository-supply-indexing` and
`pnpm run check:v39-gate2`.
V39 Gate 3 adds `V39EnterpriseReadingUxState` through
`packages/protocol/src/canonical/v39-enterprise-reading-ux-state.js` and the
source-safe generated artifact `.bitcode/v39-enterprise-reading-ux-state.json`.
The UX state report proves five Terminal Reading stages, source-safe disclosure
defaults, Conversation `readingStage` handoff/readback, rich execution stream
integration, component tests, and opt-in browser proof workflow wiring. The
maintained commands are `pnpm run generate:v39-enterprise-reading-ux-state` and
`pnpm run check:v39-gate3`.
V39 Gate 4 adds `V39ReadNeedReviewResynthesis` through
`packages/protocol/src/canonical/v39-read-need-review-resynthesis.js` and the
source-safe generated artifact `.bitcode/v39-read-need-review-resynthesis.json`.
The report proves Read Request persistence, synthesized Need storage, feedback
and resynthesis lineage, Need measurement storage, accepted-Need admission,
rejected-Need posture, source-safe telemetry receipts, route/runtime storage
projection tests, and workflow wiring. The maintained commands are
`pnpm run generate:v39-read-need-review-resynthesis` and
`pnpm run check:v39-gate4`.
V39 Gate 5 adds `V39ReadFitsFindingRuntime` through
`packages/protocol/src/canonical/v39-read-fits-finding-runtime.js` and the
source-safe generated artifact `.bitcode/v39-read-fits-finding-runtime.json`.
The report proves accepted-Need-only Finding Fits admission, source-safe query
plans, seven search channels, many-candidate ranking, selected-fit provenance,
active OpenAI embedding policy, replay receipts, repair posture, runtime
storage projection, package tests, protocol tests, and workflow wiring. The
maintained commands are `pnpm run generate:v39-read-fits-finding-runtime` and
`pnpm run check:v39-gate5`.
V39 Gate 6 adds `V39AssetPackPreviewQuoteBoundary` through
`packages/protocol/src/canonical/v39-assetpack-preview-quote-boundary.js` and
the source-safe generated artifact
`.bitcode/v39-assetpack-preview-quote-boundary.json`. The report proves
source-safe AssetPack preview measurements, selected-fit provenance,
deterministic share-to-fee BTC quote, disclosure leak scanning, reader payment
settlement instructions, withheld pull-request delivery posture, replay
receipt, repair posture, package tests, protocol tests, and workflow wiring.
The maintained commands are
`pnpm run generate:v39-assetpack-preview-quote-boundary` and
`pnpm run check:v39-gate6`.
V39 Gate 7 adds `V39SettlementRightsDelivery` through
`packages/protocol/src/canonical/v39-settlement-rights-delivery.js` and the
source-safe generated artifact `.bitcode/v39-settlement-rights-delivery.json`.
The report proves BTC payment observation/finality, source-to-shares
compensation, BTD rights transfer/read receipts, settlement unlock,
ledger/database/object-storage reconciliation, post-settlement pull-request
delivery unlock, replay, repair posture, package tests, protocol tests, and
workflow wiring. The maintained commands are
`pnpm run generate:v39-settlement-rights-delivery` and
`pnpm run check:v39-gate7`.
V39 Gate 8 adds `V39OperationalTelemetryRepairReadback` through
`packages/protocol/src/canonical/v39-operational-telemetry-repair-readback.js`
and the source-safe generated artifact
`.bitcode/v39-operational-telemetry-repair-readback.json`. The report proves
Reading operational stream events, operator readback, proof roots, runbook
hooks, source-safe disclosure posture, rich execution-log rendering, package
tests, UI tests, protocol tests, and workflow wiring. The maintained commands
are `pnpm run generate:v39-operational-telemetry-repair-readback` and
`pnpm run check:v39-gate8`.
V39 Gate 9 adds `V39InterfaceConversationProductParity` through
`packages/protocol/src/canonical/v39-interface-conversation-product-parity.js`
and the source-safe generated artifact
`.bitcode/v39-interface-conversation-product-parity.json`. The report proves
Terminal authority, Conversation handoff, public API, MCP API, ChatGPT App,
and package-consumer parity rows, accepted-Need gating, source-safe preview,
settlement unlock, BTD rights, delivery boundaries, package tests, interface
tests, protocol tests, and workflow wiring. The maintained commands are
`pnpm run generate:v39-interface-conversation-product-parity` and
`pnpm run check:v39-gate9`.
V39 Gate 10 adds `V39LocalStagingReadingRehearsal` through
`packages/protocol/src/canonical/v39-local-staging-reading-rehearsal.js` and
the source-safe generated artifact
`.bitcode/v39-local-staging-reading-rehearsal.json`. The report proves local
and staging-testnet lane readback, all five Reading stages, many-fit
Depository search, source-safe preview, settlement rights delivery, rich
telemetry readback, interface no-bypass posture, ledger/database/storage
synchronization, blocked value-bearing mainnet admission, package tests,
protocol tests, and workflow wiring. The maintained commands are
`pnpm run generate:v39-local-staging-reading-rehearsal` and
`pnpm run check:v39-gate10`.
V38 Gate 1 is wired through `check:v38-gate1` and documents the exact
PipelineExecution, PTRR agent, Plan/Try/Refine/Retry, FailsafeGenerationSequence,
ThricifiedGeneration, ToolExecution, DocCodeToolPrompt, Reading pipeline,
depository-search, embedding policy, prompt benchmarking, and source-safe
telemetry scope that later V38 gates must implement.
V38 Gate 2 adds `V38InferenceSurfaceInventory` through
`packages/protocol/src/canonical/inference-surface-inventory.js` and the
source-safe generated artifact `.bitcode/v38-inference-surface-inventory.json`.
The inventory covers `ReadNeedComprehensionSynthesis`,
`ReadFitsFindingSynthesis`, Website Conversations, tool-definition prompts,
interface entrypoints, prompt registry coverage, and execution primitives as
`source-safe-inference-surface-metadata`, with 52 PTRR steps, 156
Failsafe/Thricified chains, and 468 provider-call slots. The maintained commands
are `pnpm run generate:v38-inference-surface-inventory`,
`pnpm run check:v38-inference-surface-inventory`, and
`pnpm run check:v38-gate2`.
V38 Gate 3 adds `V38PtrrFailsafeThricifiedStack` through
`packages/protocol/src/canonical/ptrr-failsafe-thricified-stack.js` and the
source-safe generated artifact `.bitcode/v38-ptrr-failsafe-thricified-stack.json`.
The stack contract covers `factoryAgentWithPTRR`, Plan/Try/Refine/Retry,
`FailsafeGenerationSequence`, `ThricifiedGeneration`, substep prompt/context
telemetry, step-owned tool postprocess boundaries, and Gate 2's 52 PTRR steps /
156 Failsafe sequences / 156 ThricifiedGeneration chains / 468 provider-call
slots as `source-safe-ptrr-failsafe-thricified-stack-metadata`. The maintained
commands are `pnpm run generate:v38-ptrr-failsafe-thricified-stack`,
`pnpm run check:v38-ptrr-failsafe-thricified-stack`, and
`pnpm run check:v38-gate3`.
V38 Gate 4 adds `V38PromptBenchmarkReport` through
`packages/protocol/src/canonical/prompt-benchmark-report.js` and the
source-safe generated artifact `.bitcode/v38-prompt-benchmark-report.json`.
The Prompt benchmarking report covers benchmark infrastructure, generic
PTRR/Failsafe/ThricifiedGeneration PromptParts,
`ReadNeedComprehensionSynthesis` PromptParts, `ReadFitsFindingSynthesis`
PromptParts, complete Reading Prompt registries, Website Conversation Prompts,
and DocCodeToolPrompt surfaces as `source-safe-prompt-benchmark-metadata`.
The maintained commands are `pnpm run generate:v38-prompt-benchmark-report`,
`pnpm run check:v38-prompt-benchmark-report`, and `pnpm run check:v38-gate4`.
V38 Gate 5 adds `V38InferenceTelemetryDisclosureReport` through
`packages/protocol/src/canonical/inference-telemetry-disclosure-report.js` and
the source-safe generated artifact `.bitcode/v38-disclosure-boundary-report.json`.
The telemetry disclosure report covers phase, agent, PTRR step, Failsafe,
ThricifiedGeneration, tool, prompt template, interpolated prompt, raw provider
response root, parsed output shape, schema verdict, retry, repair, and stream UI
projection rows as `source-safe-inference-telemetry-disclosure-metadata`. The
disclosure tier contract exposes source-safe roots, ids, presence flags, typed
shapes, and fail-closed states while keeping raw provider response content, raw
protected prompts, protected source, unpaid AssetPack source, credentials,
private wallet material, and private settlement payloads private or blocked.
The maintained commands are
`pnpm run generate:v38-inference-telemetry-disclosure-report`,
`pnpm run check:v38-inference-telemetry-disclosure-report`, and
`pnpm run check:v38-gate5`.
V38 Gate 6 adds `V38ReadNeedComprehensionInferenceHardening` through
`packages/protocol/src/canonical/read-need-comprehension-inference-hardening.js`
and the source-safe generated artifact
`.bitcode/v38-read-need-comprehension-inference-hardening.json`.
The hardening report proves ReadNeedComprehensionSynthesis request
normalization, Need comprehension, Need measurement, Need review, and
source-safe inference receipt coverage. The receipt binds 4 phases, 4 PTRR
agents, 16 PTRR steps, 48 Failsafe sequences, 48 ThricifiedGeneration chains,
144 provider-call slots, prompt ids, interpolation keys, output schemas,
telemetry ids, and roots while preserving protected source and raw provider
response privacy.
The maintained commands are
`pnpm run generate:v38-read-need-comprehension-inference-hardening`,
`pnpm run check:v38-read-need-comprehension-inference-hardening`, and
`pnpm run check:v38-gate6`.
V38 Gate 7 adds `V38ReadFitsFindingSearchEmbeddings` through
`packages/protocol/src/canonical/read-fits-finding-search-embeddings.js` and
the source-safe generated artifact
`.bitcode/v38-read-fits-finding-search-embeddings.json`.
The search report proves accepted-Need admission, source-safe query planning,
many-fit depository discovery, active OpenAI embedding/vector policy,
threshold verification, selected-fit provenance, and source-safe search
receipt coverage. The receipt binds 7 phases, 8 PTRR agents, 32 PTRR steps, 96
Failsafe sequences, 96 ThricifiedGeneration chains, 288 provider-call slots, 4
tool contracts, 7 search channels, 12 default selected-candidate slots,
embedding policy, query roots, ranking roots, candidate counts, and provenance
roots while preserving protected source and raw provider response privacy.
The maintained commands are
`pnpm run generate:v38-read-fits-finding-search-embeddings`,
`pnpm run check:v38-read-fits-finding-search-embeddings`, and
`pnpm run check:v38-gate7`.
V38 Gate 8 adds `V38AssetPackSynthesisEconomicTraceability` through
`packages/protocol/src/canonical/assetpack-synthesis-economic-traceability.js`
and the source-safe generated artifact
`.bitcode/v38-assetpack-synthesis-economic-traceability.json`.
The economic traceability report proves selected-fit handoff into AssetPack
synthesis, source-safe preview, deterministic BTC quote, BTD mint/read/rights
receipts, source-to-shares contributor allocation, settlement unlock,
post-settlement delivery, ledger/database reconciliation, repair actions, and
harness evidence projection while preserving protected source and private
settlement payload privacy.
The maintained commands are
`pnpm run generate:v38-assetpack-synthesis-economic-traceability`,
`pnpm run check:v38-assetpack-synthesis-economic-traceability`, and
`pnpm run check:v38-gate8`.
V38 Gate 9 adds `V38ConversationToolPromptInferenceParity` through
`packages/protocol/src/canonical/conversation-tool-prompt-inference-parity.js`
and the source-safe generated artifact
`.bitcode/v38-conversation-tool-prompt-inference-parity.json`.
The parity report proves comprehensive and quick-response Conversation PTRR
variations, Conversation agent/step prompt registries, typed output schemas,
source-safe stream telemetry, rich execution-log UI rendering,
DocCodeToolPrompt formatting, ToolPromptRegistry hierarchy, ChatGPT App
doc-code prompt carriers, read-access checks, organization-authority checks,
and interface no-bypass posture while preserving protected source, raw prompt,
raw provider response, credential, private wallet, private settlement, and
unpaid AssetPack privacy.
The maintained commands are
`pnpm run generate:v38-conversation-tool-prompt-inference-parity`,
`pnpm run check:v38-conversation-tool-prompt-inference-parity`, and
`pnpm run check:v38-gate9`.
V38 Gate 10 adds `V38LocalStagingInferenceDepositorySearchRehearsal` through
`packages/protocol/src/canonical/local-staging-inference-depository-search-rehearsal.js`
and the source-safe generated artifact
`.bitcode/v38-local-staging-inference-depository-search-rehearsal.json`.
The rehearsal report proves local and staging-testnet lanes for Vercel Sandbox
harness opt-in, bounded real-inference route preflight, Supabase readback,
ReadNeedComprehensionSynthesis, ReadFitsFindingSynthesis, many-fit depository
search, source-safe AssetPack preview, telemetry streaming/readback,
ledger/database posture, and blocked production-mainnet value-bearing
admission while preserving protected source, raw prompt, raw provider response,
live log payload, credential, wallet, private settlement, and unpaid AssetPack
privacy.
The maintained commands are
`pnpm run generate:v38-local-staging-inference-depository-search-rehearsal`,
`pnpm run check:v38-local-staging-inference-depository-search-rehearsal`, and
`pnpm run check:v38-gate10`.
V38 Gate 11 adds `V38InferencePromotionReadinessReport` through
`packages/protocol/src/canonical/inference-promotion-readiness-report.js`
and the source-safe generated artifact
`.bitcode/v38-promotion-readiness-report.json`.
The promotion readiness report proves every V38 inference artifact is covered,
parseable, and source-safe; binds `BITCODE_SPEC_V38_PROVEN.md` generation
support, `v38-canon-promotion.yml`, promotion command dry-run support,
gate/canon workflow posture, and runtime preparation for `V38` active, `V39` draft;
and blocks value-bearing mainnet admission while preserving protected
source, raw protected prompt, raw provider response, credential, wallet,
private settlement, and unpaid AssetPack privacy.
The maintained commands are
`pnpm run generate:v38-promotion-readiness`,
`pnpm run check:v38-promotion-readiness`, and `pnpm run check:v38-gate11`.
V39 Gate 11 adds `V39CommercialReadingPromotionReadinessReport` through
`packages/protocol/src/canonical/v39-commercial-reading-promotion-readiness-report.js`
and the generated source-safe artifact `.bitcode/v39-promotion-readiness-report.json`.
The report verifies all V39 commercial Reading artifacts are covered, parseable,
and source-safe; binds `BITCODE_SPEC_V39_PROVEN.md` generation support,
`v39-canon-promotion.yml`, promotion command dry-run support, gate/canon
workflow posture, and runtime preparation for `V39` active, `V40` draft; and
blocks value-bearing mainnet admission while preserving protected source, raw
protected prompt, raw provider response, credential, wallet, private settlement,
and unpaid AssetPack privacy. Use `pnpm run generate:v39-promotion-readiness`,
`pnpm run check:v39-promotion-readiness`, and `pnpm run check:v39-gate11`.
V37 Gate 1 opens the Website Conversations spec family and `check:v37-gate1`.
V37 Gate 2 adds source-safe `ConversationSession` route-history contracts
through `buildConversationSessionRouteHistory` and
`.bitcode/v37-conversation-session-route-history.json`.
The route-history artifact covers create, restore, branch, retry, redact, and
stream operations while keeping conversation state route-local rather than
global ledger truth.
V37 Gate 3 adds source-safe `ConversationStreamEvent` stream UI/event contracts
through `buildConversationStreamEventContract` and
`.bitcode/v37-conversation-stream-event-contract.json`.
The stream event artifact covers model delta, tool call, retrieval summary,
proof root, retry state, completion decision, and error row events while
keeping stream telemetry source-safe and compatible with the shared rich
execution log UI.
V37 Gate 4 adds source-safe `ConversationWritingWorkspace` fullscreen composer
contracts through `buildConversationWritingWorkspace` and
`.bitcode/v37-conversation-writing-workspace.json`.
The writing workspace artifact covers Read Request, Need feedback, AssetPack
review note, and Terminal handoff summary modes with save, restore, summarize,
and handoff actions while keeping emitted summaries source-safe and keeping
Terminal as transaction authority.
V37 Gate 5 adds source-safe `ConversationSourceSelector` context-policy
contracts through `buildConversationSourceSelector` and
`.bitcode/v37-conversation-source-selector.json`. The source selector artifact
covers repository, branch, commit, deposit, BTD range, AssetPack preview,
document, and prior conversation selectors with account, organization, wallet,
rights, settlement, disclosure, and policy governance while keeping protected
source and unpaid AssetPack source outside Conversations.
V37 Gate 6 adds source-safe `ConversationTerminalHandoff` transaction handoff
contracts through `buildConversationTerminalHandoff` and
`.bitcode/v37-conversation-terminal-handoff.json`. The handoff artifact covers
Depositing, Reading, Finding Fits, Exchange, settlement, and delivery
workflows while preserving route context and keeping ledger writes, wallet
signing, protected source, and unpaid AssetPack source outside Conversations.
V37 Gate 7 adds source-safe `ConversationPersistencePrivacyRedaction` durable
storage privacy contracts through
`buildConversationPersistencePrivacyRedaction` and
`.bitcode/v37-conversation-persistence-privacy-redaction.json`. The
persistence privacy artifact covers every visibility tier, persist message,
restore history, export history, delete history, retain history, replay
history, and incident repair while redacting protected prompts, protected model
responses, protected source, secrets, wallet private material, and unpaid
AssetPack source before storage or source-safe export.
V37 Gate 8 adds source-safe `ConversationTelemetryProofHooks` dashboard and
runbook contracts through `buildConversationTelemetryProofHooks` and
`.bitcode/v37-conversation-telemetry-proof-hooks.json`. The telemetry proof
artifact covers session, message, stream, tool, source selector, Terminal
handoff, retry, error, and completion families while keeping raw protected
prompts, protected source, protected model responses, provider tokens, wallet
private material, settlement private payloads, ledger authority, wallet
signing authority, and unpaid AssetPack source out of telemetry.
V37 Gate 9 adds source-safe `ConversationRehearsal` local/staging proof
contracts through `buildConversationRehearsal` and
`.bitcode/v37-conversation-rehearsal.json`. Local and staging-testnet
rehearsals exercise chat, streaming, writing, source selector, Terminal
handoff, restore, retry, redaction, and error flows. Rehearsal logs/screenshots
are source-safe. Route/UI checks, telemetry roots, and value-bearing mainnet
blocking are visible through `source-safe-conversation-rehearsal-metadata`.
V37 Gate 10 adds source-safe `ConversationPromotionReadinessReport`
promotion readiness contracts through `buildConversationPromotionReadinessReport`
and `.bitcode/v37-promotion-readiness-report.json`. The readiness report
covers all V37 Conversation artifacts, generated `BITCODE_SPEC_V37_PROVEN.md`
support, `v37-canon-promotion.yml`, promotion dry-run support, and runtime
posture preparation from `V36` active, `V37` draft to `V37` active, `V38`
draft after V37 promotion while keeping credentials, protected source, raw
protected prompts, unpaid AssetPack source, and wallet private material out of
generated metadata.
This Gate 10 posture is `V37` active, `V38` draft after V37 promotion.

Gate 9 exact rehearsal statement: local and staging-testnet rehearsals exercise chat, streaming, writing, source selector, Terminal handoff, restore, retry, redaction, and error flows. Rehearsal logs/screenshots are source-safe. Route/UI checks, telemetry roots, and value-bearing mainnet blocking are visible.
V36 Gate 2 adds the source-safe Exchange activity book through
`buildExchangeActivityBook` and `.bitcode/v36-exchange-activity-book.json`.
The activity detail never exposes protected source or unpaid AssetPack content.
V36 Gate 3 adds source-safe Exchange intent/order contracts through
`buildExchangeIntentOrderContracts` and
`.bitcode/v36-exchange-intent-order-contracts.json`.
Each transition names actor principal, organization role, wallet posture,
authority proof, idempotency key, policy decision, and fail-closed result.
The order history is replayable without private wallet material or secrets.
V36 Gate 4 adds source-safe Exchange rights-transfer review through
`buildExchangeRightsTransferReview` and
`.bitcode/v36-exchange-rights-transfer-review.json`.
`ExchangeRightsTransferPreview` names BTD range identity, current owner,
requested buyer, rights scope, settlement unlock condition, and disclosure
limit while distinguishing owner-read, licensed-read, and blocked transfer.
AssetPack source is hidden until paid settlement and rights transfer are
complete.
V36 Gate 5 adds source-safe Exchange pricing through
`buildExchangePricingQuote` and
`.bitcode/v36-pricing-liquidity-fee-quote.json`.
`ExchangePricingQuote` names BTC amount, measurement weight, measurement volume, liquidity band, wrapper analysis, treasury route, depositor route, reader route, and quote root.
The source-safe verdict is `source-safe-exchange-pricing-quote-metadata`;
wrapper analysis cannot make BTD range cells fungible chain-of-record assets,
and underpayment, overpayment, stale quote, or unsupported network posture fails closed.
V36 Gate 6 adds source-safe Exchange settlement reconciliation through
`buildExchangeSettlementReconciliation` and
`.bitcode/v36-exchange-settlement-reconciliation.json`.
`ExchangeSettlementReceipt` binds payment observation, finality state, rights transfer receipt, ledger root, database projection root, object storage root, delivery state, and repair id.
The source-safe verdict is
`source-safe-exchange-settlement-reconciliation-metadata`; observers and repair jobs reconcile database projections to ledger truth, and settlement finality and delivery are auditable.
V36 Gate 7 adds source-safe Exchange dispute repair and revenue routing through
`buildExchangeDisputeRepairRevenueRoute` and
`.bitcode/v36-exchange-dispute-repair-revenue-route.json`.
`ExchangeDisputeRepairCase` covers stale owner, cancelled order replay, underpayment, overpayment, projection drift, source leakage, and delivery mismatch.
`ExchangeRevenueRoute` covers depositor, reader, treasury, fee, BTC route, BTD right route, and conservation proof.
The source-safe verdict is
`source-safe-exchange-dispute-repair-revenue-route-metadata`; runbooks and repair commands are source-safe and proof-rooted.

V36 Gate 8 adds source-safe Exchange UX proof through `buildExchangeUxProof`
and `.bitcode/v36-exchange-ux-proof.json`.
`ExchangeUxProof` covers market-wide master-detail, filters, order history, rights-transfer review, pricing quote, settlement state, and repair state.
Terminal can hand off to Exchange without losing transaction context.
collapsed UI gives readable status and expanded UI exposes source-safe detail.
Exchange telemetry dashboards remain source-safe and proof-rooted.
The source-safe verdict is `source-safe-exchange-ux-proof-metadata`.

V36 Gate 9 adds source-safe Exchange rehearsal through
`buildExchangeRehearsal` and `.bitcode/v36-exchange-rehearsal.json`.
`ExchangeRehearsal` proves that local and staging-testnet rehearsals exercise list, bid, ask, cancel, accept, settle, repair, and history flows.
It proves that rehearsal logs/screenshots are source-safe.
It also proves that ledger/database synchronization and value-bearing mainnet blocking are visible.
The source-safe verdict is `source-safe-exchange-rehearsal-metadata`.

Historical promotion posture remains reproducible. V34 Gate 10 accepted the
`V34` active, `V35` draft posture for deployment-depth promotion and remains
validated by `check:v34-gate10` and `v34-canon-promotion.yml` as promoted
history.

V35 Gate 2 adds the source-safe documentation surface catalog through
`buildDocumentationSurfaceCatalog` and
`.bitcode/v35-documentation-surface-catalog.json`.
V35 Gate 3 adds the source-safe telemetry taxonomy catalog through
`buildTelemetryTaxonomyCatalog` and
`.bitcode/v35-telemetry-taxonomy-catalog.json`.
V35 Gate 4 adds the source-safe public docs usage guide catalog through
`buildPublicDocsUsageGuideCatalog` and
`.bitcode/v35-public-docs-usage-guides.json`.
V35 Gate 5 adds the source-safe operator runbook catalog through
`buildOperatorRunbookCatalog` and
`.bitcode/v35-operator-runbook-catalog.json`.
V35 Gate 6 adds the source-safe docs QA alignment report through
`buildDocsQaAlignmentReport` and
`.bitcode/v35-docs-qa-alignment-report.json`.
V35 Gate 7 adds the source-safe testnet rollout readiness guide through
`buildTestnetRolloutReadinessGuide` and
`.bitcode/v35-testnet-rollout-readiness-guide.json`.
V35 Gate 8 adds the source-safe telemetry documentation interface integration
report through `buildTelemetryDocumentationInterfaceIntegration` and
`.bitcode/v35-telemetry-documentation-interface-integration.json`.
V35 Gate 9 adds the source-safe local/staging telemetry documentation rehearsal
through `buildLocalStagingTelemetryDocumentationRehearsal` and
`.bitcode/v35-local-staging-telemetry-documentation-rehearsal.json`.
V37 gates add Conversations helpers without importing
`protocol-demonstration/src/*`.

V35 Gate 10 closed the package/runtime promotion boundary and the V35 promotion
workflow rewrote the package posture to `V35` active, `V36` draft after
promotion validations and generated proof output passed. V36 promotion rewrote
this package to `V36` active, `V37` draft only after all Exchange gates closed.
V36 Gate 10 closes that Exchange promotion boundary through package-owned
`ExchangePromotionReadinessReport`, `.bitcode/v36-promotion-readiness-report.json`,
`check:v36-gate10`, and `v36-canon-promotion.yml`. The post-promotion posture is
`V36` active, `V37` draft, and the generated evidence remains source-safe.
V37 promotion will eventually rewrite this package to `V37` active, `V38` draft
only after all Conversations gates close.

The package boundary is enforced by `packages/protocol` tests, the UAPI
commercial protocol boundary test, and V37 gate checks.
