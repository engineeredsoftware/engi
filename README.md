# Bitcode Repository

`BITCODE_SPEC.txt` is the canonical pointer for active-system work. It currently
resolves to `V40`; V41 is the active draft target for Prompt and PromptPart
excellence after the promoted exhaustive commercial application testing canon.

## Current Product Posture

Bitcode is the protocol and the commercial source tree implements it in-place.
The primary operator routes are:

- `/terminal` for depositing, reading, transaction work, and protocol follow-through.
- `/auxillaries` for Wallet, Externals, Profile, and Interfaces support surfaces.

V41 Gate 1 opens the prompts-as-programs specification family over active V40
with `check:v41-gate1`. V41 will catalogue every raw PromptPart and composed
Prompt, map registry composition and interpolation contracts, benchmark Reading
prompt baselines, then harden `ReadNeedComprehensionSynthesis`,
`ReadFitsFindingSynthesis`, Conversation, tool-definition, and interface prompts
without exposing protected prompt payloads, raw provider responses, secrets,
protected source, or unpaid AssetPack source.
V41 Gate 2 adds the package-backed `buildV41PromptPartPromptInventory` and
generated source-safe artifact `.bitcode/v41-promptpart-prompt-inventory.json`.
The inventory currently covers 1,459 raw PromptPart rows and 105 composed Prompt
rows across Reading, Conversation, tool-definition, interface, and benchmark
surfaces, with `generate:v41-prompt-inventory`, `check:v41-prompt-inventory`,
and `check:v41-gate2`.
V41 Gate 3 adds the package-backed `buildV41RegistryInterpolationContracts` and
generated source-safe artifact `.bitcode/v41-registry-interpolation-contracts.json`.
The contract currently covers 12 registry/interpolation rows and 65 source
predicates for Prompt registry totality, PromptPart interpolation, PTRR
agent/step composition, Failsafe and Thricified prompt resolution, execution
ancestry overlays, tool doc-code prompt injection, Reading parser targets,
Finding Fits search contracts, AssetPack synthesis/finishing parser targets,
and Gate 2 inventory binding with `check:v41-gate3`.
V41 Gate 4 adds the package-backed `buildV41ReadingPromptBenchmarkBaselines`
and generated source-safe artifact
`.bitcode/v41-reading-prompt-benchmark-baselines.json`. The baseline currently
covers 10 Reading prompt benchmark rows, 120 source predicates, all five Reading
UX steps, both Reading pipelines, Gate 2 inventory, Gate 3 registry contracts,
V38 benchmark fixtures, V40 prompt smoke readiness, parser targets, and
source-safe disclosure tiers with `check:v41-gate4`.
V42 is now roadmapped as the next MVP experience version: shortest-path
Depositing with later BTC compensation, shortest-path Reading through
Need review/resynthesis, Finding Fits, source-safe AssetPack preview,
BTD/BTC settlement, repository delivery, and an AI-reading dominant
demonstration whose AssetPack measurably improves an AI system beyond
public-data-only performance.

Exchange is inherited V36 canon: market-wide activity master-detail, buy/sell/
bid/ask/cancel/accept/settle/history flows, AssetPack range trading,
rights-transfer review, pricing/liquidity/wrapper analysis, settlement
reconciliation, dispute/repair/revenue routes, Exchange UX, local/staging
rehearsal, and Exchange-specific proofs.
Website Conversations are promoted V37 canon: conversation sessions, route-local
history, stream UI/event contracts, fullscreen writing mode, source selectors,
conversation-to-Terminal handoff, persistence/privacy/redaction,
telemetry/proof/docs, local/staging rehearsal, and promotion readiness.
V37 Gate 1 opens the Conversations spec family and `check:v37-gate1` over
active V36.
V37 Gate 2 anchors `ConversationSession` route-local identity and history
through the package-owned source-safe generated artifact
`.bitcode/v37-conversation-session-route-history.json`, including create,
restore, branch, retry, redact, and stream operations. Conversation route
history remains route-local projection state; Terminal and the ledger remain
authoritative for transaction, settlement, wallet, Exchange, and BTD ownership
work.
V37 Gate 3 anchors `ConversationStreamEvent` stream rows through the
package-owned source-safe generated artifact
`.bitcode/v37-conversation-stream-event-contract.json`, including model
deltas, tool calls, retrieval summaries, proof roots, retry states, completion
decisions, and error rows. The rich execution log is the stream UI: collapsed
rows show readable status and expanded rows show event ids, proof roots,
redaction posture, prompt/result disclosure posture, fail-closed states, and
source-safe metadata without protected source or raw model payloads.
V37 Gate 4 anchors `ConversationWritingWorkspace` fullscreen drafting through
the package-owned source-safe generated artifact
`.bitcode/v37-conversation-writing-workspace.json`, including Read Request,
Need feedback, AssetPack review note, and Terminal handoff summary modes plus
save, restore, summarize, and handoff actions. Draft recovery is route-local;
emitted summaries and handoff messages are redacted source-safe metadata and
do not claim Terminal, wallet, settlement, or ledger authority.
V37 Gate 5 anchors `ConversationSourceSelector` context policy through the
package-owned source-safe generated artifact
`.bitcode/v37-conversation-source-selector.json`, including repository,
branch, commit, deposit, BTD range, AssetPack preview, document, and prior
conversation selectors governed by account, organization, wallet, rights,
settlement, disclosure, and policy posture.
V37 Gate 6 anchors `ConversationTerminalHandoff` transaction handoff through
the package-owned source-safe generated artifact
`.bitcode/v37-conversation-terminal-handoff.json`, including Depositing,
Reading, Finding Fits, Exchange, settlement, and delivery handoff workflows.
Conversation handoff preserves transaction id, repository anchor, source
selector refs, source-safe summary, policy result, Terminal route, transaction
detail, proof roots, and event ids while Terminal remains the ledger, wallet,
settlement, and delivery cockpit.
V37 Gate 7 anchors `ConversationPersistencePrivacyRedaction` durable
conversation storage privacy through the package-owned source-safe generated
artifact `.bitcode/v37-conversation-persistence-privacy-redaction.json`.
It separates public, user-visible, organization-visible, buyer-visible,
reviewer-visible, and operator-only visibility tier data while covering
persist message, restore history, export, delete, retention, replay, and
incident repair. The API storage path redacts message content, attachment
metadata, execution input, and execution metadata before persistence, and the
conversation UI exposes source-safe privacy previews without protected source,
secrets, wallet private material, or unpaid AssetPack source.
V37 Gate 8 anchors `ConversationTelemetryProofHooks` through the
package-owned source-safe generated artifact
`.bitcode/v37-conversation-telemetry-proof-hooks.json`. Conversation sessions,
messages, streams, tools, source selectors, Terminal handoffs, retries,
errors, and completions now bind to dashboard panels, runbook ids,
correlation ids, proof roots, redaction posture, and source-safe visibility
tiers. API stream rows and the conversation UI expose telemetry proof posture
without protected prompts, protected source, raw provider responses, provider
tokens, wallet private material, settlement private payloads, or unpaid
AssetPack source.
V37 Gate 9 anchors `ConversationRehearsal` through the package-owned
source-safe generated artifact `.bitcode/v37-conversation-rehearsal.json`.
Local and staging-testnet rehearsals exercise chat, streaming, writing, source
selector, Terminal handoff, restore, retry, redaction, and error flows.
Rehearsal logs/screenshots are source-safe. Route/UI checks, telemetry roots,
and value-bearing mainnet blocking are visible through source-safe proof
metadata and the fullscreen Rehearsal Proof panel.

Gate 9 exact rehearsal statement: local and staging-testnet rehearsals exercise chat, streaming, writing, source selector, Terminal handoff, restore, retry, redaction, and error flows. Rehearsal logs/screenshots are source-safe. Route/UI checks, telemetry roots, and value-bearing mainnet blocking are visible.
V37 Gate 10 anchors `ConversationPromotionReadinessReport` through the
package-owned source-safe generated artifact
`.bitcode/v37-promotion-readiness-report.json`. It covers every V37
Conversation artifact, generated `BITCODE_SPEC_V37_PROVEN.md` support,
`v37-canon-promotion.yml`, promotion dry-run support, and runtime posture
preparation from V36 active / V37 draft to V37 active / draft V38 without
serializing credentials, protected source, raw protected prompts, unpaid
AssetPack source, or wallet private material.
Promotion hardening also keeps Conversation persistence and telemetry redaction
on bounded private-key PEM scanning with closed/unclosed PEM tests so static
security findings block promotion instead of being waived.
V38 Gate 1 opened the inference stack draft family and `check:v38-gate1` over
active V37. V38 promoted commercial inference correctness: PTRR agents,
Plan/Try/Refine/Retry steps, `FailsafeGenerationSequence`,
`ThricifiedGeneration`, prompt registry composition, prompt and PromptPart
benchmarking, tool doc-comment prompts, source-safe inference telemetry,
`ReadNeedComprehensionSynthesis`, and `ReadFitsFindingSynthesis` depository
search. Finding Fits remains plural and depository-wide, preserving the active
`text-embedding-3-small`, 1536 dimension, cosine `match_deliverable_vectors`
embedding policy until a tested migration exists.
V38 Gate 2 adds the package-backed `V38InferenceSurfaceInventory` and generated
source-safe artifact `.bitcode/v38-inference-surface-inventory.json`. The
inference surface inventory records `ReadNeedComprehensionSynthesis`,
`ReadFitsFindingSynthesis`, Website Conversations, tool-definition prompts,
interface entrypoints, prompt registry coverage, and execution primitives as
`source-safe-inference-surface-metadata`; its current count contract is 52 PTRR
steps, 156 Failsafe/Thricified chains, and 468 provider-call slots. Use
`pnpm run generate:v38-inference-surface-inventory`,
`pnpm run check:v38-inference-surface-inventory`, and
`pnpm run check:v38-gate2` before closing the gate.
V38 Gate 3 adds the package-backed `V38PtrrFailsafeThricifiedStack` and
generated source-safe artifact `.bitcode/v38-ptrr-failsafe-thricified-stack.json`.
The stack contract records `factoryAgentWithPTRR`, Plan/Try/Refine/Retry,
`FailsafeGenerationSequence`, `ThricifiedGeneration`, substep prompt/context
telemetry, step-owned tool postprocess boundaries, and Gate 2's 52 PTRR steps /
156 Failsafe sequences / 156 ThricifiedGeneration chains / 468 provider-call
slots as `source-safe-ptrr-failsafe-thricified-stack-metadata`. Use
`pnpm run generate:v38-ptrr-failsafe-thricified-stack`,
`pnpm run check:v38-ptrr-failsafe-thricified-stack`, and
`pnpm run check:v38-gate3` before closing the gate.
V38 Gate 4 adds the package-backed `V38PromptBenchmarkReport` and generated
source-safe artifact `.bitcode/v38-prompt-benchmark-report.json`. The Prompt
benchmarking report covers benchmark infrastructure, generic PTRR/Failsafe/
ThricifiedGeneration PromptParts, `ReadNeedComprehensionSynthesis`
PromptParts, `ReadFitsFindingSynthesis` PromptParts, complete Reading Prompt
registries, Website Conversation Prompts, and DocCodeToolPrompt surfaces as
`source-safe-prompt-benchmark-metadata`. The current source-safe count contract
is 7 rows, 13 fixtures, 24 typed-output quality expectations, 38 source
predicates, 443 PromptPart doc-comments, 39 complete Prompt doc-comments, 465
benchmark definitions, 275 PromptPart exports, and 85 Prompt constructions.
Prompt benchmarking artifacts never serialize raw prompt text or raw provider
responses.
Use `pnpm run generate:v38-prompt-benchmark-report`,
`pnpm run check:v38-prompt-benchmark-report`, and `pnpm run check:v38-gate4`
before closing the gate.
V38 Gate 5 adds the package-backed `V38InferenceTelemetryDisclosureReport` and
generated source-safe artifact `.bitcode/v38-disclosure-boundary-report.json`.
The inference telemetry disclosure report covers pipeline phase, PTRR agent
step, FailsafeGenerationSequence, ThricifiedGeneration, tool execution, prompt
template interpolation, raw provider response root, parsed typed output shape,
schema verdict, retry, repair, and stream UI/storage projection rows as
`source-safe-inference-telemetry-disclosure-metadata`. Its disclosure tier
contract keeps raw provider response content, raw protected prompts, protected
source, unpaid AssetPack source, credentials, private wallet material, and
private settlement payloads out of public or reader-visible streams while still
surfacing roots, presence flags, typed shapes, and proof metadata for audit.
Use `pnpm run generate:v38-inference-telemetry-disclosure-report`,
`pnpm run check:v38-inference-telemetry-disclosure-report`, and
`pnpm run check:v38-gate5` before closing the gate.
V38 Gate 6 adds the package-backed
`V38ReadNeedComprehensionInferenceHardening` report and generated source-safe
artifact `.bitcode/v38-read-need-comprehension-inference-hardening.json`.
The ReadNeedComprehensionSynthesis hardening report binds produced Needs to
`ReadNeedComprehensionSynthesisInferenceReceipt` metadata covering 4 phases, 4
PTRR agents, 16 PTRR steps, 48 Failsafe sequences, 48
ThricifiedGeneration chains, 144 provider-call slots, prompt/template ids,
interpolation keys, output schemas, telemetry ids, and roots. The receipt keeps
protected source, raw provider response content, unpaid AssetPack source,
credentials, private wallet material, and private settlement payloads private
or blocked while preserving resynthesis-with-feedback and accepted-Need-gated
Finding Fits admission.
Use `pnpm run generate:v38-read-need-comprehension-inference-hardening`,
`pnpm run check:v38-read-need-comprehension-inference-hardening`, and
`pnpm run check:v38-gate6` before closing the gate.
V38 Gate 7 adds the package-backed `V38ReadFitsFindingSearchEmbeddings` report
and generated source-safe artifact
`.bitcode/v38-read-fits-finding-search-embeddings.json`. The Finding Fits
report binds `ReadFitsFindingSynthesisSearchReceipt` metadata across accepted
Need admission, query planning, many-fit depository discovery, embedding
policy, threshold ranking, selected-fit provenance, and source-safe receipt
rows. Its count contract is 7 phases, 8 PTRR agents, 32 PTRR steps, 96
Failsafe sequences, 96 ThricifiedGeneration chains, 288 provider-call slots, 4
tool contracts, 7 search channels, and default 12 above-threshold selected-fit
carryforward slots. The active vector policy remains OpenAI
`text-embedding-3-small`, 1536 dimensions, cosine `match_deliverable_vectors`,
and no protected source, raw provider response content, unpaid AssetPack source,
credentials, private wallet material, or private settlement payloads may enter
the source-safe receipt.
Use `pnpm run generate:v38-read-fits-finding-search-embeddings`,
`pnpm run check:v38-read-fits-finding-search-embeddings`, and
`pnpm run check:v38-gate7` before closing the gate.
V38 Gate 8 adds the package-backed
`V38AssetPackSynthesisEconomicTraceability` report and generated source-safe
artifact `.bitcode/v38-assetpack-synthesis-economic-traceability.json`. The
AssetPack handoff report binds selected fit provenance into AssetPack
synthesis, source-safe preview, deterministic share-to-fee BTC quote, BTD
mint/read/rights receipts, source-to-shares contributor compensation,
settlement unlock, post-settlement pull-request delivery, ledger/database
reconciliation, repair posture, and harness evidence projection without
exposing protected source, raw provider response content, unpaid AssetPack
source, credentials, wallet private material, or private settlement payloads.
Use `pnpm run generate:v38-assetpack-synthesis-economic-traceability`,
`pnpm run check:v38-assetpack-synthesis-economic-traceability`, and
`pnpm run check:v38-gate8` before closing the gate.
V38 Gate 9 adds the package-backed
`V38ConversationToolPromptInferenceParity` report and generated source-safe
artifact `.bitcode/v38-conversation-tool-prompt-inference-parity.json`.
The parity report binds Website Conversation comprehensive and quick-response
variations to PTRR/Failsafe/Thricified inference, prompt registries, typed
schemas, source-safe stream telemetry, rich execution-log rendering,
DocCodeToolPrompt formatting, ToolPromptRegistry hierarchy, ChatGPT App
doc-code prompt carriers, read-access and organization-authority admission,
and interface no-bypass posture without exposing protected source, raw prompt
text, raw provider response content, unpaid AssetPack source, credentials,
wallet private material, or private settlement payloads.
Use `pnpm run generate:v38-conversation-tool-prompt-inference-parity`,
`pnpm run check:v38-conversation-tool-prompt-inference-parity`, and
`pnpm run check:v38-gate9` before closing the gate.
V38 Gate 10 adds the package-backed
`V38LocalStagingInferenceDepositorySearchRehearsal` report and generated
source-safe artifact
`.bitcode/v38-local-staging-inference-depository-search-rehearsal.json`.
The rehearsal report binds local and staging-testnet lanes to Vercel Sandbox
harness opt-in, bounded real-inference preflight, Supabase readback validation,
ReadNeedComprehensionSynthesis, ReadFitsFindingSynthesis, many-fit depository
search, source-safe AssetPack preview, telemetry streaming/readback,
ledger/database synchronization posture, and blocked production-mainnet
value-bearing admission without exposing protected source, raw prompt text, raw
provider response content, live rehearsal log payloads, unpaid AssetPack
source, credentials, wallet private material, or private settlement payloads.
Use `pnpm run generate:v38-local-staging-inference-depository-search-rehearsal`,
`pnpm run check:v38-local-staging-inference-depository-search-rehearsal`, and
`pnpm run check:v38-gate10` before closing the gate.
V38 Gate 11 adds the package-backed `V38InferencePromotionReadinessReport`
and generated source-safe artifact `.bitcode/v38-promotion-readiness-report.json`.
The promotion readiness report binds all V38 inference artifacts,
`BITCODE_SPEC_V38_PROVEN.md` support, `v38-canon-promotion.yml`, promotion
command dry-run support, gate/canon workflow posture, active V38 / draft V39
runtime preparation, and blocked value-bearing mainnet posture without exposing
protected source, raw protected prompts, raw provider responses, unpaid
AssetPack source, credentials, wallet private material, or private settlement
payloads. Use `pnpm run generate:v38-promotion-readiness`,
`pnpm run check:v38-promotion-readiness`, and `pnpm run check:v38-gate11`
before closing the gate.
V39 Gate 1 opens the commercial Reading readiness draft family and
`check:v39-gate1` over active V38. V39 focuses on Depository supply indexing,
the five-step enterprise Reading UX, ReadNeed review/resynthesis,
ReadFitsFinding runtime and replay, source-safe AssetPack preview and
deterministic BTC quote, settlement, BTD rights transfer, post-settlement
delivery, ledger/database/storage synchronization, telemetry/repair, interface
parity, local/staging rehearsal, and promotion readiness.
V39 Gate 11 adds the package-backed `V39CommercialReadingPromotionReadinessReport`
and generated source-safe artifact `.bitcode/v39-promotion-readiness-report.json`.
The promotion readiness report binds all V39 commercial Reading artifacts,
`BITCODE_SPEC_V39_PROVEN.md` support, `v39-canon-promotion.yml`, promotion
command dry-run support, gate/canon workflow posture, active V39 / draft V40
runtime preparation, and blocked value-bearing mainnet posture without exposing
protected source, raw protected prompts, raw provider responses, unpaid
AssetPack source, credentials, wallet private material, or private settlement
payloads. Use `pnpm run generate:v39-promotion-readiness`,
`pnpm run check:v39-promotion-readiness`, and `pnpm run check:v39-gate11`
before closing the gate.
V40 Gate 1 opens the exhaustive commercial application testing draft family and
`check:v40-gate1` over active V39. V40 focuses on browser E2E, visual and
screenshot proof, accessibility, responsive behavior, API and route integration,
Reading pipeline integration, Conversation and Terminal integration,
ledger/database/storage/wallet/delivery synchronization, local/staging rehearsal,
unit coverage across packages and primitives, prompt benchmark smoke, and V41
prompt-program readiness.
V39 Gate 2 adds the package-owned `DepositorySupplyIndex` and source-safe
generated artifact `.bitcode/v39-depository-supply-indexing.json`. Deposited
source supply is normalized into rights-aware records with repository, branch,
commit, proof, measurement, reconciliation readback, BTD range, depositor
wallet, source-safe search documents, active embedding/vector projection,
Supabase storage readback posture, deterministic repair actions, and a
source-safe Finding Fits handoff. Use `pnpm run generate:v39-depository-supply-indexing`
and `pnpm run check:v39-gate2` before closing the gate.
V39 Gate 3 adds the package-owned `TerminalEnterpriseReadingUxState` and
source-safe generated artifact `.bitcode/v39-enterprise-reading-ux-state.json`.
Terminal now owns the five-stage enterprise Reading state machine: request
Read, review synthesized Need, request Finding Fits, review source-safe
AssetPack preview, and buy AssetPack/settle. Conversation handoffs may pass
only source-safe `readingStage` intent, Terminal parses it as posture, and the
rich execution stream remains the live Reading pipeline log. Use
`pnpm run generate:v39-enterprise-reading-ux-state` and
`pnpm run check:v39-gate3` before closing the gate.
V39 Gate 4 adds the package-owned `ReadNeedReviewResynthesisRuntime` and
source-safe generated artifact `.bitcode/v39-read-need-review-resynthesis.json`.
ReadNeedComprehensionSynthesis now projects Read Requests, synthesized Needs,
feedback history, resynthesis attempts, Need measurements, accepted-Need
admission, rejected-Need posture, and source-safe telemetry receipts into
PipelineExecution-compatible storage records. Finding Fits remains blocked
until an accepted Need is present. Use
`pnpm run generate:v39-read-need-review-resynthesis` and
`pnpm run check:v39-gate4` before closing the gate.
V39 Gate 5 adds the package-owned `ReadFitsFindingRuntime` and source-safe
generated artifact `.bitcode/v39-read-fits-finding-runtime.json`.
ReadFitsFindingSynthesis now projects accepted-Need admission, source-safe
query plans, seven search channels, many-candidate ranking, selected-fit
provenance, active embedding policy, replay receipts, repair posture, and
telemetry receipts into PipelineExecution-compatible storage records. Use
`pnpm run generate:v39-read-fits-finding-runtime` and
`pnpm run check:v39-gate5` before closing the gate.
V39 Gate 6 adds the package-owned `AssetPackPreviewBoundary` and source-safe
generated artifact `.bitcode/v39-assetpack-preview-quote-boundary.json`.
AssetPack preview now projects source-safe measurements, selected-fit
provenance, deterministic share-to-fee BTC quote, disclosure leak review,
settlement instructions, withheld pull-request delivery posture, replay
receipt, and repair posture without exposing unpaid source-bearing AssetPack
content. Use `pnpm run generate:v39-assetpack-preview-quote-boundary` and
`pnpm run check:v39-gate6` before closing the gate.
V39 Gate 7 adds the package-owned `AssetPackSettlementRightsDeliveryBoundary`
and source-safe generated artifact `.bitcode/v39-settlement-rights-delivery.json`.
The boundary projects BTC payment observation/finality, source-to-shares
compensation, BTD rights transfer and paid read receipts, settlement unlock,
ledger/database/object-storage reconciliation, delivery unlock, replay, and
repair posture without serializing protected source, private wallet material,
private settlement payloads, credentials, raw protected prompts, raw provider
responses, or unpaid AssetPack source. Use
`pnpm run generate:v39-settlement-rights-delivery` and
`pnpm run check:v39-gate7` before closing the gate.
V39 Gate 8 adds the package-owned
`ReadingOperationalTelemetryRepairReadback` and source-safe generated artifact
`.bitcode/v39-operational-telemetry-repair-readback.json`. Reading now
projects phase, PTRR agent, PTRR step, Failsafe, ThricifiedGeneration,
ToolExecution, storage, ledger, wallet, delivery, UI, and repair events into
operator readback with proof roots, runbook hooks, prompt/result disclosure
posture, and rich execution-log rendering. Use
`pnpm run generate:v39-operational-telemetry-repair-readback` and
`pnpm run check:v39-gate8` before closing the gate.
V39 Gate 9 adds the package-owned `ReadingInterfaceProductParity` and
source-safe generated artifact
`.bitcode/v39-interface-conversation-product-parity.json`. Terminal,
Conversation, public API, MCP API, ChatGPT App, and package consumers now share
the same Reading authority: accepted Need, Finding Fits, source-safe preview,
settlement unlock, BTD rights, and delivery boundaries cannot be bypassed, and
source-bearing delivery remains locked until settlement and rights transfer.
Use `pnpm run generate:v39-interface-conversation-product-parity` and
`pnpm run check:v39-gate9` before closing the gate.
V39 Gate 10 adds the package-owned `ReadingLocalStagingRehearsal` and
source-safe generated artifact
`.bitcode/v39-local-staging-reading-rehearsal.json`. Local and
staging-testnet lanes now rehearse the five Reading stages, many-fit
Depository search, source-safe preview, settlement/BTD rights delivery, rich
telemetry readback, ledger/database/storage synchronization, and blocked
value-bearing mainnet admission. Staging-testnet is bound to Supabase project
`tkpyosihuouusyaxtbau`. Use
`pnpm run generate:v39-local-staging-reading-rehearsal` and
`pnpm run check:v39-gate10` before closing the gate.
V36 Gate 2 anchors market-wide activity through the package-owned
`ExchangeActivityBook` and the source-safe generated artifact
`.bitcode/v36-exchange-activity-book.json`, including listing, bid, ask,
cancellation, acceptance, settlement, repair, revenue route, and history rows.
The activity detail never exposes protected source or unpaid AssetPack content.
V36 Gate 3 anchors market action through package-owned `ExchangeIntent` and
`ExchangeOrder` contracts plus the source-safe generated artifact
`.bitcode/v36-exchange-intent-order-contracts.json`, including buy, sell, bid,
ask, cancel, accept, settle, and history transitions. Each transition names
actor principal, organization role, wallet posture, authority proof,
idempotency key, policy decision, and fail-closed result; order history is
replayable without private wallet material or secrets.
V36 Gate 4 anchors rights-transfer review through package-owned
`ExchangeRightsTransferPreview` and the source-safe generated artifact
`.bitcode/v36-exchange-rights-transfer-review.json`, including BTD range
identity, current owner, requested buyer, rights scope, settlement unlock,
disclosure limit, and owner-read, licensed-read, and blocked transfer states.
AssetPack source is hidden until paid settlement and rights transfer are
complete.
V36 Gate 5 anchors pricing through package-owned `ExchangePricingQuote` and the
source-safe generated artifact `.bitcode/v36-pricing-liquidity-fee-quote.json`.
The quote covers BTC amount, measurement weight, measurement volume, liquidity band, wrapper analysis, treasury route, depositor route, reader route, and
quote root. The source-safe verdict is
`source-safe-exchange-pricing-quote-metadata`; wrapper analysis cannot make BTD range cells fungible chain-of-record assets, and underpayment, overpayment, stale quote, or unsupported network posture fails closed.
V36 Gate 6 anchors settlement through package-owned `ExchangeSettlementReceipt`
and the source-safe generated artifact
`.bitcode/v36-exchange-settlement-reconciliation.json`.
The receipt binds payment observation, finality state, rights transfer receipt, ledger root, database projection root, object storage root, delivery state, and repair id.
The source-safe verdict is
`source-safe-exchange-settlement-reconciliation-metadata`; observers and repair jobs reconcile database projections to ledger truth, and settlement finality and delivery are auditable.
V36 Gate 7 anchors dispute repair and revenue routing through package-owned
`ExchangeDisputeRepairCase`, `ExchangeRevenueRoute`, and the source-safe
generated artifact `.bitcode/v36-exchange-dispute-repair-revenue-route.json`.
`ExchangeDisputeRepairCase` covers stale owner, cancelled order replay, underpayment, overpayment, projection drift, source leakage, and delivery mismatch.
`ExchangeRevenueRoute` covers depositor, reader, treasury, fee, BTC route, BTD right route, and conservation proof.
The source-safe verdict is
`source-safe-exchange-dispute-repair-revenue-route-metadata`; runbooks and repair commands are source-safe and proof-rooted.
V36 Gate 8 anchors Exchange route usability through package-owned
`ExchangeUxProof` and the source-safe generated artifact
`.bitcode/v36-exchange-ux-proof.json`.
`ExchangeUxProof` covers market-wide master-detail, filters, order history, rights-transfer review, pricing quote, settlement state, and repair state.
Terminal can hand off to Exchange without losing transaction context.
collapsed UI gives readable status and expanded UI exposes source-safe detail.
Exchange telemetry dashboards remain source-safe and proof-rooted.
The source-safe verdict is `source-safe-exchange-ux-proof-metadata`.
V36 Gate 9 anchors Exchange rehearsal through package-owned
`ExchangeRehearsal` and the source-safe generated artifact
`.bitcode/v36-exchange-rehearsal.json`.
`ExchangeRehearsal` proves that local and staging-testnet rehearsals exercise list, bid, ask, cancel, accept, settle, repair, and history flows.
It proves that rehearsal logs/screenshots are source-safe.
It also proves that ledger/database synchronization and value-bearing mainnet blocking are visible.
The source-safe verdict is `source-safe-exchange-rehearsal-metadata`.
V36 Gate 10 anchors Exchange promotion readiness through package-owned
`ExchangePromotionReadinessReport` and the source-safe generated artifact
`.bitcode/v36-promotion-readiness-report.json`.
`ExchangePromotionReadinessReport` covers every V36 Exchange artifact, V36 proof
appendix generation, `v36-canon-promotion.yml`, promotion dry-run support,
workflow posture, and runtime promotion from active V35 / draft V36 to active
V36 / draft V37.
Run `pnpm run check:v36-gate10` to validate the Gate 10 closure contract.
Promoted V35 closure owns telemetry and documentation depth over promoted V34:
internal codebase docs, public `/docs`, telemetry taxonomy, dashboards, alert
runbooks, incident response, operator escalation, documentation QA, developer
onboarding, operator guides, and testnet-rollout readiness.
V35 Gate 2 now anchors documentation surfaces through the package-owned
`DocumentationSurfaceCatalog` and the source-safe generated artifact
`.bitcode/v35-documentation-surface-catalog.json`.
V35 Gate 3 now anchors telemetry event families through the package-owned
`TelemetryTaxonomyCatalog` and the source-safe generated artifact
`.bitcode/v35-telemetry-taxonomy-catalog.json`.
V35 Gate 4 now anchors public usage guidance through the package-owned
`PublicDocsUsageGuideCatalog` and the source-safe generated artifact
`.bitcode/v35-public-docs-usage-guides.json`, including the public docs
disclosure boundary that blocks protected source, raw protected prompts, wallet
private material, provider tokens, and unpaid AssetPack source.
V35 Gate 5 now anchors operator action through the package-owned
`OperatorRunbookCatalog` and the source-safe generated artifact
`.bitcode/v35-operator-runbook-catalog.json`, binding telemetry-derived
dashboard panels, alerts, runbooks, incident classes, escalation paths,
commands, proof roots, repair references, and post-incident documentation
updates.
V35 Gate 6 now anchors documentation QA through the package-owned
`DocsQaAlignmentReport` and the source-safe generated artifact
`.bitcode/v35-docs-qa-alignment-report.json`, failing closed on stale tokens,
missing source roots, missing generated artifacts, unsupported disclosure
claims, or docs/proof/workflow drift.
V35 Gate 7 now anchors rollout guidance through the package-owned
`TestnetRolloutReadinessGuide` and the source-safe generated artifact
`.bitcode/v35-testnet-rollout-readiness-guide.json`, covering contributors,
local development, operators, enterprise readers, depositors, interface
consumers, environment lanes, wallet/settlement caveats, known blockers, and
rehearsal evidence while keeping value-bearing mainnet visible and blocked.
V35 Gate 8 now anchors interface integration through the package-owned
`TelemetryDocumentationInterfaceIntegration` and the source-safe generated
artifact `.bitcode/v35-telemetry-documentation-interface-integration.json`,
binding Terminal, Auxillaries, API, MCP API, ChatGPT App, package READMEs,
internal docs, and public docs to event ids, proof roots, docs links, runbook
links, and redaction posture without exposing protected source, secrets, wallet
private material, or unpaid AssetPack source.
V35 Gate 9 now anchors rehearsal through the package-owned
`LocalStagingTelemetryDocumentationRehearsal` and the source-safe generated
artifact `.bitcode/v35-local-staging-telemetry-documentation-rehearsal.json`,
proving local/staging-testnet documentation discovery, telemetry event
emission, dashboard/runbook lookup, docs QA, incident drills, redacted
screenshot/log roots, source-safe proof-root review, and visible blocked
value-bearing mainnet posture.

The protocol demonstration remains the minimal deterministic reference for the
same protocol. Commercial code may mount or compare against demonstration
runtime facts, but commercial source should name the owning product surface
directly: Terminal, Exchange, Auxillaries, Conversations, API, MCP, or ChatGPT
App.

## Repository Rules

- Ground new work in `BITCODE_SPEC.txt` and the active specification family.
- Treat `_legacy/` as non-canonical.
- Do not add explicit versioned source routes or compatibility source names.
- Update source in-place to match the active canon and current draft target.
- Keep specification notes, QA ledgers, tests, and implementation synchronized.

## Contributor Workflow

The default branch is protected by the active `Bitcode Core Contributions`
ruleset. Direct pushes to `main` are not part of the normal workflow; expect
them to be rejected because changes must arrive through pull requests and
verified signatures.

Use a version branch and gate-numbered branches:

1. Create one base branch per draft target, such as `version/v39`.
2. Create scoped gate branches from the version branch. Prefix every gate branch
   with the gate number, for example `v39/gate-1-commercial-reading-roadmap-opening`
   or `v39/gate-5-read-fits-finding-runtime-replay`.
3. Group related work into clear commits with quality commit messages whose
   titles and bodies describe the proof, implementation, or documentation
   change.
4. Continue on the gate branch until that gate's acceptance criteria are
   implemented, specified, tested, documented, committed, pushed, and ready for
   closure review.
5. Open pull requests from gate branches into the version branch as gates close.
   Title gate PRs with the uppercase version and gate prefix plus a topical
   title, for example `V39 Gate 5: ReadFitsFinding Runtime And Replay`.
6. Open the version branch back into `main` only after all gates close and the
   version is formally promoted as canon.

Gate pull requests into `version/**` run the Bitcode gate-quality workflow:
active/draft canon checks, casing/import checks, relevant package typechecks and
Jest suites, protocol-demonstration QA, and diff hygiene. The repository-wide
canon quality workflow stays green during draft work by checking active/draft
posture and promoted-spec proof posture, while full promoted-suite closure is
reserved for the version promotion workflow. Version pull requests into `main`
run the version promotion workflow. For V38, `v38-canon-promotion.yml` validates the
inference stack, Reading pipeline, depository-search, prompt benchmark,
telemetry, and rehearsal posture, generate `BITCODE_SPEC_V38_PROVEN.md`, and
commit promotion artifacts plus the `BITCODE_SPEC.txt` pointer change from
`V37` to `V38` on the version branch.
For V39, Gate 1 opens `version/v39` and the gate-quality posture through
`pnpm run check:v39-gate1` before later gates add generated commercial Reading
artifacts and the V39 promotion workflow.
V39 Gate 2 is wired through `pnpm run check:v39-gate2`; V39 Gate 3 is wired
through `pnpm run check:v39-gate3` and its generated
`.bitcode/v39-enterprise-reading-ux-state.json` artifact. V39 Gate 4 is wired
through `pnpm run check:v39-gate4`; V39 Gate 5 is wired through
`pnpm run check:v39-gate5` and its generated
`.bitcode/v39-read-fits-finding-runtime.json` artifact. V39 Gate 6 is wired
through `pnpm run check:v39-gate6` and its generated
`.bitcode/v39-assetpack-preview-quote-boundary.json` artifact. V39 Gate 7 is
wired through `pnpm run check:v39-gate7` and its generated
`.bitcode/v39-settlement-rights-delivery.json` artifact. V39 Gate 8 is wired
through `pnpm run check:v39-gate8` and its generated
`.bitcode/v39-operational-telemetry-repair-readback.json` artifact. V39 Gate 9
is wired through `pnpm run check:v39-gate9` and its generated
`.bitcode/v39-interface-conversation-product-parity.json` artifact.
For V40, Gate 1 opens `version/v40` and the gate-quality posture through
`pnpm run check:v40-gate1` before later gates add generated exhaustive testing
artifacts and the V40 promotion workflow.
V40 Gate 2 adds the package-backed `V40TestInventoryCoverageMatrix`, generated
`.bitcode/v40-test-inventory-coverage-matrix.json`, and `check:v40-gate2` to
inventory unit, API/route, Reading pipeline, Conversation/Terminal,
browser/visual/accessibility/responsive, ledger/database/storage/wallet/delivery,
local/staging, prompt benchmark smoke, demonstration, and CI/promotion testing
surfaces before deeper V40 gates close their implementations.
V40 Gate 3 adds the package-backed `V40UnitCoverageInventory`, generated
`.bitcode/v40-unit-coverage-inventory.json`, and `check:v40-gate3` to close
critical unit coverage for packages, primitives, isolated implementations,
Reading AssetPack units, interface helpers, and demonstration boundary tests.
V40 Gate 4 adds the package-backed `V40ApiIntegrationContracts`, generated
`.bitcode/v40-api-integration-contracts.json`, and `check:v40-gate4` to close
source-safe API, UAPI, MCP, ChatGPT App, persistence, authorization, and
response-schema route integration contract coverage before later browser and
pipeline gates.
V40 Gate 5 adds the package-backed `V40ReadingPipelineIntegrationCoverage`,
generated `.bitcode/v40-reading-pipeline-integration-coverage.json`, and
`check:v40-gate5` to close source-safe integration coverage for
`ReadNeedComprehensionSynthesis`, `ReadFitsFindingSynthesis`, many-fit
Depository search, PTRR agent wiring, AssetPack preview/settlement/delivery,
telemetry/readback, Terminal harnesses, pipeline primitives, hosts, and local
staging rehearsal linkage.
V40 Gate 6 adds the package-backed `V40ConversationTerminalIntegration`,
generated `.bitcode/v40-conversation-terminal-integration.json`, and
`check:v40-gate6` to close source-safe integration coverage for Conversation
handoff route contracts, Conversation stream-to-rich-log projection,
Conversation route/API persistence and branch contracts, writing/source
selector handoff, Terminal Reading state readback, Terminal harness log
streaming, transaction-cockpit authority boundaries, and rehearsal/docs parity.
V40 Gate 7 adds the package-backed `V40BrowserE2eVisualProof`, generated
`.bitcode/v40-browser-e2e-visual-proof.json`, and `check:v40-gate7` to close
source-safe browser proof coverage for Terminal, Conversations, Auxillaries,
Exchange, Docs, responsive viewport overflow, screenshot/trace baselines, and
keyboard/landmark/status accessibility. The current app browser proof contract
binds five product surfaces, thirteen route states, eighteen interaction
states, four canonical viewports, and no screenshot-only approval.
V40 Gate 8 adds the package-backed `V40LedgerStorageSync`, generated
`.bitcode/v40-ledger-storage-sync.json`, and `check:v40-gate8` to close
source-safe synchronization proof for BTC fee finality, BTD read-right
projection, source-to-shares compensation, ledger/database/object-storage
reconciliation, storage locks, no-custody wallet authority, Terminal readback,
repair posture, and post-settlement pull-request delivery. The current app
ledger/storage sync contract keeps source-bearing AssetPack delivery invisible
until settlement, BTD rights, compensation, and projection readbacks agree.
V40 Gate 9 adds the package-backed `V40LocalStagingRehearsalAutomation`,
generated `.bitcode/v40-local-staging-rehearsal-automation.json`,
`rehearse:v40-local-staging`, and `check:v40-gate9` to close source-safe local
and staging-testnet rehearsal automation. Operator receipts use lane-bound
secret-family readiness rather than secret values, are dry-run by default, bind
staging-testnet to Supabase project `tkpyosihuouusyaxtbau`, and require explicit
live execution opt-in before delegating to the Vercel Sandbox AssetPack harness.
V40 Gate 10 adds the package-backed `V40PromptBenchmarkSmokeV41Readiness`,
generated `.bitcode/v40-prompt-benchmark-smoke-v41-readiness.json`,
`prompt-benchmark:smoke`, and `check:v40-gate10` to close source-safe PromptPart
and composed Prompt benchmark smoke coverage before V41. The artifact binds the
package benchmark report command, deterministic smoke receipts, V38 prompt
benchmark inventory evidence, workflow wiring, and the V41 prompt-program
worklist without rewriting prompt content or serializing raw prompt/provider
payloads.
V40 Gate 11 adds the package-backed `V40PromotionReadinessReport`, generated
`.bitcode/v40-promotion-readiness-report.json`,
`generate:v40-promotion-readiness`, `check:v40-promotion-readiness`,
`check:v40-gate11`, and `.github/workflows/v40-canon-promotion.yml` to close
canonical promotion readiness. The report binds every V40 testing artifact,
`BITCODE_SPEC_V40_PROVEN.md`, gate/canon workflow posture, promotion scripts,
active V40 / draft V41 runtime preparation, and source-safe value-bearing
mainnet blocking without serializing secrets or protected payloads.
V38 Gates 1 through 11 are wired through `pnpm run check:v38-gate1`,
`pnpm run check:v38-gate2`, `pnpm run check:v38-gate3`,
`pnpm run check:v38-gate4`, `pnpm run check:v38-gate5`,
`pnpm run check:v38-gate6`, `pnpm run check:v38-gate7`,
`pnpm run check:v38-gate8`, `pnpm run check:v38-gate9`, and
`pnpm run check:v38-gate10`, and `pnpm run check:v38-gate11`. The promoted V37
gate closure remains reproducible through
`pnpm run check:v37-gate1`; V37 Gate 2 is wired through
`pnpm run check:v37-gate2` and
`pnpm run check:v37-conversation-session-route-history`; V37 Gate 3 is wired
through `pnpm run check:v37-gate3`; and V37 Gate 4 is wired through
`pnpm run check:v37-gate4` and
`pnpm run check:v37-conversation-writing-workspace`. V37 Gate 5 is wired
through `pnpm run check:v37-gate5` and
`pnpm run check:v37-conversation-source-selector`, covering source-safe
repository, branch, commit, deposit, BTD range, AssetPack preview, document,
and prior conversation selectors with account, organization, wallet, rights,
settlement, disclosure, and policy posture. V37 Gate 9 is wired through
`pnpm run check:v37-gate9` and `pnpm run check:v37-conversation-rehearsal`,
covering `ConversationRehearsal`,
`source-safe-conversation-rehearsal-metadata`, local/staging rehearsal proof,
source-safe screenshots/logs, route/UI checks, telemetry roots, and blocked
value-bearing mainnet posture. V37 Gate 10 adds promotion readiness before
the V37 promotion workflow can promote; it is wired through
`pnpm run check:v37-gate10`, `pnpm run check:v37-promotion-readiness`, and
[v37-canon-promotion.yml](.github/workflows/v37-canon-promotion.yml).
The promoted V35 closure remains reproducible through `pnpm run check:v35-gate10`
and [v35-canon-promotion.yml](.github/workflows/v35-canon-promotion.yml).
The application CI workflow uses the root pnpm workspace install, runs uapi
lint/typecheck/build plus mocked Jest coverage, and keeps heavier legacy scans
explicitly opt-in until their catalogs are refurbished: set
`BITCODE_ENABLE_GATE_BROWSER_PROOF`, `ENABLE_FULL_DB_E2E`, `ENABLE_STORYBOOK_BUILD`, `ENABLE_SUPER_LINTER`, or
`ENABLE_ADVANCED_CODEQL` when those checks are intentionally part of a branch
or promotion validation.

## Key Surfaces

- [BITCODE_SPEC.txt](BITCODE_SPEC.txt) is the canonical version pointer.
- [BITCODE_SPEC_V39.md](BITCODE_SPEC_V39.md) is the active promoted spec family.
- [BITCODE_SPEC_V40.md](BITCODE_SPEC_V40.md) is the active draft target.
- [BITCODE_SPEC_V40_PARITY_MATRIX.md](BITCODE_SPEC_V40_PARITY_MATRIX.md) tracks V40 gate parity.
- [uapi/README.md](uapi/README.md) documents the commercial website/API surface.
- [uapi/app/terminal/README.md](uapi/app/terminal/README.md) documents Terminal.
- [uapi/app/exchange/README.md](uapi/app/exchange/README.md) documents Exchange.
- [uapi/app/auxillaries/README.md](uapi/app/auxillaries/README.md) documents Auxillaries.
- [protocol-demonstration/README.md](protocol-demonstration/README.md) documents
  the deterministic demonstration.

## Repository Map

- `uapi/`: commercial website, API routes, Terminal, Exchange, Auxillaries,
  Conversations, public docs, and shared UI systems.
- `protocol-demonstration/`: deterministic Bitcode demonstration, proof
  generator inputs, and standalone validation runtime.
- `packages/*`: protocol, storage, inference, conversation, BTD, API, MCP,
  ChatGPT App, and integration package owners.
- `.bitcode/`: generated proof, checkpoint, and spec-family artifacts.

## Common Commands

Mock-mode commercial review:

```bash
cd uapi
NEXT_PUBLIC_MASTER_MOCK_MODE=true \
NEXT_PUBLIC_ENABLE_MOCKS=true \
NEXT_PUBLIC_MOCK_USER_ORBITAL=true \
NEXT_PUBLIC_MOCK_USER_ORBITAL_SCENARIO=demo \
NEXT_PUBLIC_MOCK_SCENARIO=demo \
NEXT_PUBLIC_MOCK_GITHUB_ACCOUNTS=true \
NEXT_PUBLIC_MOCK_GITHUB_REPOS=true \
HOST=127.0.0.1 PORT=3000 pnpm dev:remote
```

Commercial verification:

```bash
cd uapi
pnpm exec tsc --noEmit --pretty false
pnpm run test:e2e:commercial-mvp
```

Demonstration verification:

```bash
cd protocol-demonstration
pnpm test:integration
pnpm test:v28-mvp-qa
```
