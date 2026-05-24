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

- active/draft canon posture (`V36` active, `V37` draft after V36 promotion);
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
- canonical proven-generation helpers;
- the package app/server context used by commercial interfaces.

This is now the `V36` active, `V37` draft after V36 promotion posture accepted
by V36 Gate 10 and opened by V37 Gate 1.
V37 Gate 1 treats this package as promotion-critical runtime posture.
`packages/protocol/src/canon-posture.js` and `packages/protocol/data/state.json`
must remain aligned to `V36` active, `V37` draft while V37 gates are in flight.
V37 Gate 1 opens the Website Conversations spec family and `check:v37-gate1`.
Gate 2 and later gates add package-owned Conversations session, message,
stream event, writing workspace, source selector, Terminal handoff,
persistence/privacy, telemetry/proof/docs, rehearsal, and promotion readiness
helpers.
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
