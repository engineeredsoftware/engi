# Bitcode Repository

`BITCODE_SPEC.txt` is the canonical pointer for active-system work. It currently
resolves to `V35`; V36 is the active draft target for Exchange depth after the
promoted telemetry and documentation canon.

## Current Product Posture

Bitcode is the protocol and the commercial source tree implements it in-place.
The primary operator routes are:

- `/terminal` for depositing, reading, transaction work, and protocol follow-through.
- `/auxillaries` for Wallet, Externals, Profile, and Interfaces support surfaces.

Website Conversations remain in source as deferred commercial work. Exchange is
the active V36 draft focus: market-wide activity master-detail, buy/sell/bid/
ask/cancel/accept/settle/history flows, AssetPack range trading,
rights-transfer review, pricing/liquidity/wrapper analysis, settlement
reconciliation, dispute/repair/revenue routes, Exchange UX, local/staging
rehearsal, and Exchange-specific proofs.
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

1. Create one base branch per draft target, such as `version/v36`.
2. Create scoped gate branches from the version branch. Prefix every gate branch
   with the gate number, for example `v36/gate-1-exchange-roadmap-opening` or
   `v36/gate-6-exchange-settlement-reconciliation`.
3. Group related work into clear commits with quality commit messages whose
   titles and bodies describe the proof, implementation, or documentation
   change.
4. Continue on the gate branch until that gate's acceptance criteria are
   implemented, specified, tested, documented, committed, pushed, and ready for
   closure review.
5. Open pull requests from gate branches into the version branch as gates close.
   Title gate PRs with the uppercase version and gate prefix plus a topical
   title, for example `V36 Gate 5: Pricing Liquidity Fee Quote And Wrapper Analysis`.
6. Open the version branch back into `main` only after all gates close and the
   version is formally promoted as canon.

Gate pull requests into `version/**` run the Bitcode gate-quality workflow:
active/draft canon checks, casing/import checks, relevant package typechecks and
Jest suites, protocol-demonstration QA, and diff hygiene. The repository-wide
canon quality workflow stays green during draft work by checking active/draft
posture and promoted-spec proof posture, while full promoted-suite closure is
reserved for the version promotion workflow. Version pull requests into `main`
run the version promotion workflow. For V36, promotion work must validate the
Exchange posture, generate `BITCODE_SPEC_V36_PROVEN.md`, and commit promotion
artifacts plus the `BITCODE_SPEC.txt` pointer change from `V35` to `V36` on the
version branch.
Gate 10 is the promotion-readiness gate. V36 Gate 1 is wired through
`pnpm run check:v36-gate1`, and later V36 gates add Exchange generated
artifacts before `check:v36-gate10` and the V36 promotion workflow exist.
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
- [BITCODE_SPEC_V35.md](BITCODE_SPEC_V35.md) is the active promoted spec family.
- [BITCODE_SPEC_V36.md](BITCODE_SPEC_V36.md) is the active draft target.
- [BITCODE_SPEC_V36_PARITY_MATRIX.md](BITCODE_SPEC_V36_PARITY_MATRIX.md) tracks V36 gate parity.
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
