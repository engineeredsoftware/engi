# Bitcode Spec V35 Delta

## Status

- Version: `V35`
- V35 state: active draft target opened; this delta records planned V34-to-V35 telemetry and documentation depth
- Current canonical/latest target: `V34`
- Prior canonical anchor: `BITCODE_SPEC_V34.md`
- Prior generated proof appendix: `BITCODE_SPEC_V34_PROVEN.md`
- Generated structured artifact inventory: draft `.bitcode/v35-spec-family-report.json`, draft `.bitcode/v35-canonical-input-report.json`, source-safe `.bitcode/v35-documentation-surface-catalog.json`, source-safe `.bitcode/v35-telemetry-taxonomy-catalog.json`, source-safe `.bitcode/v35-public-docs-usage-guides.json`, future source-safe V35 telemetry/documentation artifacts, and `BITCODE_SPEC_V35_PROVEN.md` only after V35 promotion
- Source parity state: V35 opens source parity for telemetry taxonomy, documentation surfaces, public docs usage, dashboard/runbook, documentation QA, onboarding, integration, rehearsal, and promotion-readiness gates
- Spec companion: `BITCODE_SPEC_V35.md`
- Notes companion: `BITCODE_SPEC_V35_NOTES.md`
- Parity companion: `BITCODE_SPEC_V35_PARITY_MATRIX.md`
- Generated proof appendix: `BITCODE_SPEC_V35_PROVEN.md` only after V35 promotion
- Scope: V35 draft delta for telemetry and documentation depth over promoted V34 deployment canon

## Why V35 exists

V34 promoted deployment depth: host capability, environment lanes, distributed execution receipts, storage posture, secret rotation, migration approvals, observers, repair jobs, rollback/upgrade playbooks, rehearsal, and promotion readiness.
That made Bitcode operator-deployable.

V35 exists because a deployable commercial Bitcode system must also be understandable, monitorable, supportable, documentable, and testnet-rollout ready.
Telemetry cannot be dashboard folklore, and documentation cannot be stale narrative.
Internal codebase docs, public `/docs`, telemetry taxonomy, dashboards, alert runbooks, incident response, operator escalation, documentation QA, onboarding, and rollout guides must become source-safe, proof-rooted protocol reality.

## Accepted V35 decisions

- V34 remains active canon during V35 drafting.
- V35 gate branches are opened from `version/v35` and merged back only when their gate acceptance criteria are closed.
- V35 owns telemetry and documentation depth: `TelemetryTaxonomyCatalog`, `DocumentationSurfaceCatalog`, `PublicDocsUsageGuideCatalog`, `DocsQaAlignmentReport`, `OperatorRunbookCatalog`, `TestnetRolloutReadinessGuide`, and `DocumentationTelemetryPromotionReadinessReport`.
- V35 telemetry and documentation contracts must be package-owned before they are exposed by route handlers, dashboards, runbooks, MCP tools, ChatGPT App actions, public docs, internal docs, or UI status surfaces.
- Public docs disclose guidance, measurements, proof posture, fee/right boundaries, and source-safe previews; they must not disclose protected source, secrets, wallet private material, or unpaid AssetPack contents.
- Telemetry events require redaction posture, source-safety class, correlation ids, proof roots, dashboard/runbook links, and storage targets.
- Documentation QA must fail closed when code, SPEC, public docs, internal docs, generated proofs, generated artifacts, telemetry events, or deployment receipts drift.

## Explicitly deferred

- V36 owns deeper Exchange market behavior.
- V37 owns deeper website Conversations product behavior.
- Production-mainnet value-bearing launch remains explicitly blocked until a future promoted canon admits it.
- Bridge chain-of-record implementation remains out of V35.
- V35 does not reopen BTD supply law, Reading pipeline product law, or V34 interface contract law.

## Pre-Implementation Sequence

1. Open `version/v35` from promoted `main`.
2. Open `v35/gate-1-telemetry-docs-roadmap-opening` from `version/v35`.
3. Create the V35 SPEC, DELTA, NOTES, and PARITY family while preserving `BITCODE_SPEC.txt -> V34`.
4. Refresh `SPECIFICATIONS_ROADMAP.md` so V34 is active canon, V35 is draft target, and V36-V37 scopes remain coherent.
5. Retarget gate-quality and canon-quality workflow posture checks to V34 active / V35 draft.
6. Add `check:v35-gate1` and a V35 Gate 1 checker.
7. Define V35 gates, acceptance criteria, carryforward parity rows, and post-V35 roadmap responsibilities.
8. Validate spec family, canonical inputs, canon posture, workflows, roadmap truth, README/docs, and diff hygiene.
9. Push the gate branch and open a pull request to `version/v35`.

## Commit-Body Direction

V35 gate commit bodies should describe the closed gate, specification changes, implementation surfaces, tests, proof commands, and accepted boundaries.
The eventual V35 promotion commit body must name all closed V35 gates, generated telemetry/documentation proof artifacts, docs QA evidence, telemetry taxonomy evidence, public/internal documentation evidence, dashboard/runbook evidence, rollout guide evidence, rehearsal proof, and the `BITCODE_SPEC.txt` pointer change from `V34` to `V35`.
It must explicitly defer V36 Exchange depth, V37 Conversations depth, bridge chain-of-record implementation, and value-bearing mainnet launch.

## Gate Delta

### Gate 1: V35 Telemetry Documentation Roadmap And Spec Opening

Gate 1 opens V35 correctly:

- V35 SPEC, DELTA, NOTES, and PARITY files exist.
- `BITCODE_SPEC.txt` remains `V34`.
- README, roadmap, PR template, package docs, demonstration docs, and workflows describe V34 active / V35 draft posture.
- `check:v35-gate1` validates branch naming, spec family, notes, parity, roadmap truth, workflow posture, telemetry/documentation vocabulary, and promotion boundaries.
- The V35 gate list is explicit before telemetry/documentation implementation begins.

### Gate 2: Documentation Surface Catalog

Gate 2 inventories internal and public documentation truth.

Closure acceptance:

- internal codebase docs, public `/docs`, package docs, route docs, generated artifact docs, API/interface docs, and owner/freshness posture are enumerated;
- every docs surface names audience, owner, disclosure class, source roots, generated artifacts, spec links, test coverage, and freshness checks;
- source-bearing material, secrets, wallet private material, and unpaid AssetPack contents remain blocked from public docs.

Gate 2 closure implementation:

- `@bitcode/protocol` exports `DocumentationSurfaceCatalog` support through `buildDocumentationSurfaceCatalog`;
- `.bitcode/v35-documentation-surface-catalog.json` records twelve source-safe documentation rows under `source-safe-documentation-surface-metadata`;
- `pnpm run check:v35-documentation-surface-catalog` verifies artifact freshness and source roots;
- `pnpm run check:v35-gate2` verifies package source, generated artifact, package tests, workflows, docs, parity, and roadmap advancement.

### Gate 3: Telemetry Taxonomy Event Schema And Redaction

Gate 3 defines source-safe event law.

Closure acceptance:

- pipeline, execution, PTRR agent, ThricifiedGeneration, tool, ledger, wallet, storage, interface, deployment, observer, repair, docs QA, and promotion events are cataloged;
- every event names redaction posture, source-safety class, correlation ids, proof root, storage target, dashboard panel, alert threshold, and runbook link;
- event payloads fail closed on secrets, protected source, raw unpaid AssetPack source, and wallet private material.

Gate 3 closure implementation:

- `@bitcode/protocol` exports `TelemetryTaxonomyCatalog` support through `buildTelemetryTaxonomyCatalog`;
- `.bitcode/v35-telemetry-taxonomy-catalog.json` records fourteen source-safe telemetry rows under `source-safe-telemetry-taxonomy-metadata`;
- the catalog covers pipeline, execution, PTRR agent, ThricifiedGeneration, tool, ledger, wallet, storage, interface, deployment, observer, repair, docs QA, and promotion event families;
- every row binds redaction posture, source-safety class, correlation ids, proof root fields, storage target, dashboard panel, alert threshold, runbook link, source roots, replay expectation, forbidden payload classes, and deterministic row root;
- `pnpm run check:v35-telemetry-taxonomy-catalog` verifies artifact freshness, source roots, event-family coverage, and source-safe redaction posture;
- `pnpm run check:v35-gate3` verifies package source, generated artifact, package tests, workflows, docs, parity, roadmap advancement, and generated artifact profile binding.

### Gate 4: Public Docs Usage Guides

Gate 4 makes enterprise-facing docs a maintained product surface.

Closure acceptance:

- public `/docs` pages exist or are explicitly cataloged for Terminal, Protocol, Auxillaries, MCP API, ChatGPT App, BTD, AssetPack ranges, Reads, fees, proof posture, and deferred Exchange/Conversations boundaries;
- every public page derives from package/SPEC truth and names disclosure limits;
- protected source, raw protected prompts, secrets, wallet private material, and unpaid AssetPack contents remain blocked.
- `PublicDocsUsageGuideCatalog` is exported by `@bitcode/protocol`, generated into `.bitcode/v35-public-docs-usage-guides.json` with `source-safe-public-docs-metadata`, and checked by `pnpm run check:v35-gate4`;
- public docs append a disclosure-limit section that allows usage guidance, source-safe measurements, proof roots, fee/right boundaries, readiness states, and route links while blocking protected source payloads, raw protected prompts, secret values, provider tokens, wallet private material, and unpaid AssetPack source.

### Gate 5: Dashboards Alerts Runbooks Incident Escalation

Gate 5 turns telemetry into operator action.

Closure acceptance:

- `OperatorRunbookCatalog` rows bind telemetry events to dashboard panels, alert thresholds, incident classes, escalation paths, safe commands, forbidden data, and post-incident docs updates;
- dashboard and alert definitions derive from `TelemetryTaxonomyCatalog`;
- incident evidence is source-safe and proof-rooted.
- `OperatorRunbookCatalog` is exported by `@bitcode/protocol`, generated into `.bitcode/v35-operator-runbook-catalog.json` with `source-safe-runbook-metadata`, and checked by `pnpm run check:v35-gate5`;
- every runbook row binds one telemetry event family to dashboard panel id, alert id, threshold, incident class, escalation path, command sequence, verification command, proof root basis, repair reference, post-incident docs update, source roots, and deterministic runbook root;
- operator payloads allow source-safe event ids, correlation ids, proof roots, state enums, policy ids, dashboard panel ids, runbook ids, and redacted error classes while blocking secrets, provider tokens, wallet private material, raw protected prompts, protected source payloads, and unpaid AssetPack source.

### Gate 6: Documentation QA Alignment Proofs

Gate 6 prevents stale documentation.

Closure acceptance:

- `DocsQaAlignmentReport` checks code, SPEC, DELTA, NOTES, PARITY, generated proof, generated artifacts, public docs, internal docs, route docs, and interface docs;
- stale tokens, missing source roots, missing generated artifacts, and unsupported disclosure claims fail closed;
- package scripts and workflows run the docs QA checks.

### Gate 7: Developer Operator Testnet Rollout Guides

Gate 7 prepares actual users and operators.

Closure acceptance:

- `TestnetRolloutReadinessGuide` covers contributor onboarding, local development, operator use, enterprise reader flows, depositor flows, interface consumers, environment lanes, wallet/settlement caveats, known blockers, and rehearsal evidence;
- guides distinguish local, staging-testnet, public testnet, mainnet-ready dry run, and blocked value-bearing mainnet posture;
- guide examples are source-safe and reproducible.

### Gate 8: Telemetry Documentation Interface Integration

Gate 8 wires the contracts into active surfaces.

Closure acceptance:

- Terminal, Auxillaries, API, MCP API, ChatGPT App, package READMEs, internal docs, and public docs consume package-owned documentation and telemetry contracts;
- interface payloads expose event ids, proof roots, docs links, runbook links, and redaction posture where useful;
- interface integration never exposes protected source, secrets, wallet private material, or unpaid AssetPack contents.

### Gate 9: Local Staging Telemetry Documentation Rehearsal

Gate 9 proves the docs and telemetry can be followed.

Closure acceptance:

- local and staging-testnet rehearsals exercise documentation discovery, telemetry event emission, dashboard/runbook lookup, docs QA, incident drill, and source-safe proof-root review;
- rehearsal logs/screenshots are source-safe;
- value-bearing mainnet remains blocked.

### Gate 10: V35 Promotion Readiness

Gate 10 owns final generated proof, promotion workflow support, source-safe `.bitcode/v35-documentation-telemetry-promotion-readiness-report.json`, and V35 closure.

Closure acceptance:

- V35 promotion checks validate all documentation/telemetry artifacts, catalogs, docs QA reports, dashboard/runbook bindings, rollout guides, interface integration evidence, rehearsal proof, and generated proof appendix support;
- promotion scripts support V35 command planning, dry-run, generated proof output, and derived promotion commit body generation;
- promotion rewrites runtime posture to active V35 / draft V36 only after validations pass.

## Delta completion condition

This delta is complete for Gate 10 when `version/v35` contains the Gate 10 `DocumentationTelemetryPromotionReadinessReport`, source-safe generated artifacts, focused tests, package exports, workflow wiring, promotion script support, generated proof support, and local/staging telemetry-documentation rehearsal evidence.
