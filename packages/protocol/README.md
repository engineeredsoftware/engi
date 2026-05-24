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

- active/draft canon posture (`V37` active, `V38` draft after V37 promotion);
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
- canonical proven-generation helpers;
- the package app/server context used by commercial interfaces.

This is now the `V37` active, `V38` draft after V37 promotion posture accepted
by V37 Gate 10.
V38 Gate 1 treats this package as promotion-critical runtime posture and opens
the inference stack specification family for active V37 / draft V38 work.
`packages/protocol/src/canon-posture.js` and `packages/protocol/data/state.json`
must remain aligned to `V37` active, `V38` draft while V38 opens.
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
