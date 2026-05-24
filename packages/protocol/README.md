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

- active/draft canon posture (`V35` active, `V36` draft after V35 promotion);
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
- canonical proven-generation helpers;
- the package app/server context used by commercial interfaces.

This is now the `V35` active, `V36` draft after V35 promotion posture accepted
by V35 Gate 10 and opened by V36 Gate 1.
V36 Gate 1 treats this package as promotion-critical runtime posture.
`packages/protocol/src/canon-posture.js` and `packages/protocol/data/state.json`
must remain aligned to `V35` active, `V36` draft while V36 gates are in flight.
V36 Gate 1 opens the Exchange-depth spec family and `check:v36-gate1` before
later gates add package-owned Exchange activity, intent/order, rights-transfer,
pricing, settlement, dispute/repair/revenue, UX, rehearsal, and promotion
readiness helpers.

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
Later V36 gates add Exchange helpers without importing
`protocol-demonstration/src/*`.

V35 Gate 10 closed the package/runtime promotion boundary and the V35 promotion
workflow rewrote the package posture to `V35` active, `V36` draft after
promotion validations and generated proof output passed. V36 promotion will
eventually rewrite this package to `V36` active, `V37` draft only after all
Exchange gates close.

The package boundary is enforced by `packages/protocol` tests, the UAPI
commercial protocol boundary test, and V36 gate checks.
