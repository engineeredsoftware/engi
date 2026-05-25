# Bitcode Spec V40 Delta

## Status

- Version: `V40`
- V40 state: draft opened; this delta records the planned exhaustive commercial application testing closure set
- Current canonical/latest target: `V39`
- Prior canonical anchor: `BITCODE_SPEC_V39.md`
- Prior generated proof appendix: `BITCODE_SPEC_V39_PROVEN.md`
- Generated structured artifact inventory: draft `.bitcode/v40-spec-family-report.json`, `.bitcode/v40-canonical-input-report.json`, and later V40 testing artifacts
- Source parity state: V40 testing surfaces are scoped but not yet closed

## Why V40 exists

V39 made commercial Reading product behavior canonical.
V40 exists because that behavior now needs exhaustive proof through tests: browser E2E, visual/screenshot comparisons, API contracts, pipeline integrations, conversation integrations, ledger/database/storage synchronization, unit coverage, prompt benchmark smoke, and local/staging rehearsal.

## Accepted V40 decisions

- V40 is a testing-focused version, not a prompt-rewriting version.
- V40 must test both primitives and real commercial implementations.
- V40 must make the five-step Reading flow fully browser-proven and contract-proven.
- V40 must add generated artifacts for every major testing surface.
- V40 must keep value-bearing production-mainnet checks opt-in until explicitly promoted.
- V41 is reserved for Prompt and PromptPart excellence after V40 makes benchmark and test lanes reliable.

## V40 gate plan

### Gate 1: Exhaustive Testing Roadmap And Spec Opening

Open the V40 spec family, roadmap, branch posture, workflow posture, checker, and V41 planning boundary.

### Gate 2: Test Inventory And Coverage Matrix

Inventory existing tests, missing critical surfaces, owners, commands, fixtures, and generated artifacts.
Gate 2 closes with package-backed `V40TestInventoryCoverageMatrix`, deterministic `.bitcode/v40-test-inventory-coverage-matrix.json`, protocol exports, source-safe rows for every planned V40 testing surface, and `check:v40-gate2`.

### Gate 3: Unit Coverage For Packages And Primitives

Close unit coverage over protocol, BTD, prompts, agents, tools, executions, pipelines, utilities, and isolated app helpers.
Gate 3 closes with package-backed `V40UnitCoverageInventory`, deterministic `.bitcode/v40-unit-coverage-inventory.json`, protocol exports, source-safe rows for every critical unit surface, and `check:v40-gate3`.

### Gate 4: API And Route Integration Contracts

Close API, UAPI, public route, MCP API, ChatGPT App, persistence, and authorization contract suites.
Gate 4 closes with package-backed `V40ApiIntegrationContracts`, deterministic `.bitcode/v40-api-integration-contracts.json`, protocol exports, source-safe rows for every critical API/interface contract surface, and `check:v40-gate4`.

### Gate 5: Reading Pipeline Integration Coverage

Close primitive and real implementation coverage for `ReadNeedComprehensionSynthesis` and `ReadFitsFindingSynthesis`.
Gate 5 closes with package-backed `V40ReadingPipelineIntegrationCoverage`, deterministic `.bitcode/v40-reading-pipeline-integration-coverage.json`, protocol exports, source-safe rows for real Reading pipeline topology/runtime/search/agent/boundary/telemetry/harness/primitive/rehearsal integration, and `check:v40-gate5`.

### Gate 6: Conversation And Terminal Integration Coverage

Close cross-surface tests for Conversation, Terminal handoff, Reading state, telemetry, and source-safe disclosure.
Gate 6 closes with package-backed `V40ConversationTerminalIntegration`, deterministic `.bitcode/v40-conversation-terminal-integration.json`, protocol exports, a focused Conversation-to-Terminal integration test, source-safe rows for handoff, stream-log projection, route/API contracts, writing/source selector handoff, Terminal Reading state, harness streaming, authority boundaries, docs/rehearsal parity, and `check:v40-gate6`.

### Gate 7: Browser E2E, Accessibility, Responsive, And Visual Proof

Close Playwright/browser paths, visual baselines, accessibility, responsive viewports, and interaction-state matrices.

### Gate 8: Ledger, Database, Storage, Wallet, And Delivery Synchronization

Close synchronization and reconciliation tests for settlement, rights transfer, delivery, repair, and storage projections.

### Gate 9: Local And Staging-Testnet Rehearsal Automation

Close local/staging rehearsal scripts with lane-bound secrets, no tracked credentials, and reproducible operator receipts.

### Gate 10: Prompt Benchmark Smoke And V41 Readiness

Make prompt and PromptPart benchmark commands runnable and reportable without rewriting prompt content, then hand focused prompt evolution to V41.

### Gate 11: V40 Promotion Readiness

Bind all V40 artifacts, proof generation, workflows, and promotion commands into the V40 canonical promotion path.

## Explicitly deferred

- Prompt and PromptPart semantic rewriting, repartitioning, retitling, catalogue refactoring, benchmark-driven improvement, and excellence auditing are deferred to V41.
- New commercial product features are deferred unless needed to make tests truthful.
- Production-mainnet value-bearing tests remain opt-in until a later promotion mandates them.

## Pre-Implementation Sequence

1. Open `version/v40` and `v40/gate-1-testing-roadmap-opening`.
2. Keep `BITCODE_SPEC.txt` at `V39`.
3. Add the V40 spec family and Gate 1 checker.
4. Update roadmap, docs, package scripts, and workflows for active V39 / draft V40.
5. Validate V40 draft family and V39 active posture.

## Commit-Body Direction

V40 commits should name the testing surface, generated artifact, proof command, and whether the gate closes unit, integration, browser, visual, local/staging, or promotion readiness coverage.
