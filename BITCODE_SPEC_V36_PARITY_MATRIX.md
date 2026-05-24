# Bitcode Spec V36 Parity Matrix

## Status

- Version: `V36`
- V36 state: active draft target opened; Gate 1 parity is drafted over V35 active canon
- Current canonical/latest target: `V35`
- Prior canonical anchor: `BITCODE_SPEC_V35.md`
- Prior generated proof appendix: `BITCODE_SPEC_V35_PROVEN.md`
- Generated structured artifact inventory: draft `.bitcode/v36-spec-family-report.json` and `.bitcode/v36-canonical-input-report.json`; later gates add Exchange generated artifacts
- Source parity state: V36 Gate 1 opens the Exchange parity ledger; later gates close package-owned contracts, generated artifacts, tests, docs, UI, telemetry, settlement, repair, rehearsal, and promotion readiness
- Spec companion: `BITCODE_SPEC_V36.md`
- Notes companion: `BITCODE_SPEC_V36_NOTES.md`
- Delta companion: `BITCODE_SPEC_V36_DELTA.md`
- Generated proof appendix: `BITCODE_SPEC_V36_PROVEN.md` only after V36 promotion
- Scope: V36 parity ledger for deeper Exchange over promoted V35 telemetry/documentation canon
- Last fully realized canonical target preserved in source: `V35`

## Purpose

The V36 parity matrix prevents Exchange from becoming UI-only market folklore, database-only state, or tokenomics drift.
Every V36 gate must name package-owned Exchange objects, source-safe payloads, ledger/database synchronization rules, proof roots, generated artifacts, validation commands, disclosure boundaries, telemetry/runbook bindings, and fail-closed repair posture.

## Audit basis

Gate 1 audit basis:

- `BITCODE_SPEC.txt`
- `BITCODE_SPEC_V35.md`
- `BITCODE_SPEC_V35_PROVEN.md`
- `BITCODE_SPEC_V36.md`
- `BITCODE_SPEC_V36_DELTA.md`
- `BITCODE_SPEC_V36_NOTES.md`
- `BITCODE_SPEC_V36_PARITY_MATRIX.md`
- `SPECIFICATIONS_ROADMAP.md`
- `README.md`
- `AGENTS.md`
- `.github/pull_request_template.md`
- `.github/workflows/bitcode-gate-quality.yml`
- `.github/workflows/bitcode-canon-quality.yml`
- `package.json`
- `packages/protocol/README.md`
- `protocol-demonstration/README.md`
- `packages/protocol/src/canon-posture.js`
- `protocol-demonstration/src/canon-posture.js`
- `packages/protocol/data/state.json`
- `scripts/check-v36-gate1-exchange-roadmap-opening.mjs`

No `_legacy/` source is active source truth.

## V36 implementation matrix

| Area | Gate | Source evidence | Judgment | Closure requirement |
| --- | --- | --- | --- | --- |
| Draft family and branch posture | Gate 1 | `BITCODE_SPEC_V36.md`, DELTA, NOTES, PARITY, `BITCODE_SPEC.txt`, branch `v36/gate-1-exchange-roadmap-opening` | drafted | V36 family validates in draft mode over active V35 and `check:v36-gate1` passes. |
| Roadmap truth | Gate 1 | `SPECIFICATIONS_ROADMAP.md`, README, PR template, workflow posture | drafted | Roadmap states V35 active, V36 draft, and coherent V37 responsibility. |
| Exchange activity book | Gate 2 | `ExchangeActivityBook`, `.bitcode/v36-exchange-activity-book.json`, package source, tests, and `check:v36-gate2` | closed | Market-wide source-safe activity rows, filters, details, proof roots, event ids, redaction posture, and telemetry bindings exist. |
| Exchange intent and order contracts | Gate 3 | `ExchangeIntent`, `ExchangeOrder`, `.bitcode/v36-exchange-intent-order-contracts.json`, package source, tests, and `check:v36-gate3` | closed | Buy, sell, bid, ask, cancel, accept, settle, and history transitions are typed, authorized, idempotent, policy-gated, source-safe, and replayable. |
| Rights-transfer review | Gate 4 | `ExchangeRightsTransferPreview`, `.bitcode/v36-exchange-rights-transfer-review.json`, package source, tests, and `check:v36-gate4` | closed | BTD range identity, ownership, buyer, rights scope, disclosure boundary, settlement unlock, owner-read, licensed-read, and blocked transfer states are source-safe. |
| Pricing quote | Gate 5 | `ExchangePricingQuote`, `.bitcode/v36-pricing-liquidity-fee-quote.json`, package source, tests, and `check:v36-gate5` | closed | BTC price, measurement weight, measurement volume, liquidity band, wrapper analysis, treasury/depositor/reader routes, quote roots, and fail-closed payment/network posture are deterministic. |
| Settlement reconciliation | Gate 6 | `ExchangeSettlementReceipt`, `.bitcode/v36-exchange-settlement-reconciliation.json`, observers, repair tests, and `check:v36-gate6` | closed | Payment observation, finality state, rights-transfer receipt, ledger root, database projection root, object storage root, delivery state, repair id, observer jobs, and repair jobs reconcile. |
| Dispute repair revenue routes | Gate 7 | `ExchangeDisputeRepairCase`, `ExchangeRevenueRoute`, `.bitcode/v36-exchange-dispute-repair-revenue-route.json`, tests, and `check:v36-gate7` | closed | Disputes, repairs, revenue routes, conservation proofs, runbooks, and escalation paths exist. |
| Exchange UX and Terminal integration | Gate 8 | `ExchangeUxProof`, `/exchange`, Terminal handoff, public docs, telemetry dashboards, `.bitcode/v36-exchange-ux-proof.json`, tests, and `check:v36-gate8` | closed | Master-detail UX, filters, order history, rights-transfer review, pricing quote, settlement state, repair state, Terminal navigation, collapsed status, and source-safe expanded detail are validated. |
| Local staging rehearsal | Gate 9 | `.bitcode/v36-exchange-rehearsal.json`, local/staging logs, proof roots, and `check:v36-gate9` | draft-required | Local and staging-testnet list/bid/ask/cancel/accept/settle/repair/history flows are rehearsed. |
| Promotion readiness | Gate 10 | `.bitcode/v36-promotion-readiness-report.json`, promotion workflow, generated proof support, and `check:v36-gate10` | draft-required | V36 can promote only after all Exchange gates pass and generated canon remains source-safe. |

## V36 implementation checklist

| Area | Required V36 result | Judgment |
| --- | --- | --- |
| Active canon pointer | `BITCODE_SPEC.txt` remains `V35` during V36 gate work | drafted |
| Gate branch pattern | V36 work happens on `version/v36` or `v36/gate-N-*` branches | drafted |
| Spec-family shape | V36 SPEC, DELTA, NOTES, and PARITY satisfy the full spec-family checker | drafted |
| Gate 1 script | `pnpm run check:v36-gate1` fails closed on stale posture, missing roadmap truth, missing Exchange scope, or missing workflow wiring | drafted |
| Gate-quality workflow | Gate workflow validates V35 active / V36 draft posture and the V36 Gate 1 checker | drafted |
| Canon-quality workflow | Canon workflow validates promoted V35 canon, V36 draft family when present, and V35/V36 posture | drafted |
| Package docs | README, protocol package README, demonstration README, and PR template state V35 active / V36 draft workflow | drafted |
| Exchange vocabulary | V36 spec family names `ExchangeActivityBook`, `ExchangeIntent`, `ExchangeOrder`, `ExchangeRightsTransferPreview`, `ExchangePricingQuote`, `ExchangeSettlementReceipt`, `ExchangeDisputeRepairCase`, and `ExchangeRevenueRoute` | drafted |
| Disclosure boundary | Exchange previews expose source-safe market, proof, fee, rights, and settlement metadata, not protected source, secrets, wallet private material, or unpaid AssetPack contents | drafted |
| Ledger projection boundary | Ledger records and journals outrank Supabase/PostgreSQL projections for ownership, settlement, and finality | drafted |
| Pricing determinism | Measurement weight, measurement volume, liquidity band, wrapper analysis, and BTC fee roots are auditable before settlement | closed |
| Repair posture | Dispute and repair paths exist before optimistic Exchange settlement UX is promotion-ready | draft-required |

## Gate 1 Parity

| Requirement | Source evidence | Current V36 judgment |
| --- | --- | --- |
| Active canon remains V35 during V36 draft opening | `BITCODE_SPEC.txt` contains `V35` | drafted |
| Runtime draft target is V36 | `packages/protocol/src/canon-posture.js` and `protocol-demonstration/src/canon-posture.js` declare V35 active and V36 draft | drafted |
| V36 SPEC family exists as draft | `BITCODE_SPEC_V36.md`, DELTA, NOTES, and PARITY | drafted |
| Roadmap is current | `SPECIFICATIONS_ROADMAP.md` states V35 active canon, V36 active draft target, and V37 scope | drafted |
| Gate-quality workflow is V36-aware | `.github/workflows/bitcode-gate-quality.yml` | drafted |
| Canon-quality workflow is V36-aware | `.github/workflows/bitcode-canon-quality.yml` | drafted |
| README reflects V35/V36 posture | `README.md` | drafted |
| PR template reflects V36 gate titles | `.github/pull_request_template.md` | drafted |
| V36 Gate 1 checker exists | `scripts/check-v36-gate1-exchange-roadmap-opening.mjs` and package script | drafted |

## Gate 2 Parity

| Requirement | Source evidence | Current V36 judgment |
| --- | --- | --- |
| `ExchangeActivityBook` is package-owned | `packages/protocol/src/canonical/exchange-activity-book.js`, `packages/protocol/src/index.js`, `packages/protocol/src/index.d.ts` | closed |
| Generated activity artifact exists | `.bitcode/v36-exchange-activity-book.json`, `scripts/generate-v36-exchange-activity-book.mjs`, `pnpm run check:v36-exchange-activity-book` | closed |
| Activity coverage is complete | listing, bid, ask, cancellation, acceptance, settlement, repair, revenue route, and history entry rows | closed |
| Activity rows are source-safe | `source-safe-exchange-activity-book-metadata`; activity detail never exposes protected source or unpaid AssetPack content | closed |
| Rows bind master-detail filters and detail sections | required filter ids and detail section ids in package source, generated artifact, and tests | closed |
| Rows bind proof roots and event ids | deterministic row roots, detail roots, proof roots, event ids, and source evidence in generated artifact | closed |
| Ledger/database projection posture is explicit | ledger references outrank database projection references in every row | closed |
| Workflow and package tests are wired | `packages/protocol/test/v36-exchange-activity-book.test.js`, `scripts/check-v36-gate2-exchange-activity-book-market-master-detail.mjs`, `.github/workflows/bitcode-gate-quality.yml` | closed |

## Gate 3 Parity

| Requirement | Source evidence | Current V36 judgment |
| --- | --- | --- |
| `ExchangeIntent` and `ExchangeOrder` are package-owned | `packages/protocol/src/canonical/exchange-intent-order-contracts.js`, `packages/protocol/src/index.js`, `packages/protocol/src/index.d.ts` | closed |
| Generated intent/order artifact exists | `.bitcode/v36-exchange-intent-order-contracts.json`, `scripts/generate-v36-exchange-intent-order-contracts.mjs`, `pnpm run check:v36-exchange-intent-order-contracts` | closed |
| Market action coverage is complete | buy, sell, bid, ask, cancel, accept, settle, and history transition rows | closed |
| Each transition names required authority posture | actor principal, organization role, wallet posture, authority proof, idempotency key, policy decision, and fail-closed result | closed |
| Order history is source-safe and replayable | order history is replayable without private wallet material or secrets; replay material uses roots, refs, event ids, and transition identity only | closed |
| Intent/order payloads are source-safe | `source-safe-exchange-intent-order-contract-metadata`; protected source, unpaid AssetPack source, private wallet material, provider tokens, protected prompts, protected model responses, private buyer payloads, and secret values are forbidden | closed |
| Ledger/database projection posture is explicit | ledger journal refs outrank database projection refs in every order transition | closed |
| Workflow and package tests are wired | `packages/protocol/test/v36-exchange-intent-order-contracts.test.js`, `scripts/check-v36-gate3-exchange-intent-order-contracts.mjs`, `.github/workflows/bitcode-gate-quality.yml` | closed |

## Gate 4 Parity

| Requirement | Source evidence | Current V36 judgment |
| --- | --- | --- |
| `ExchangeRightsTransferPreview` is package-owned | `packages/protocol/src/canonical/exchange-rights-transfer-review.js`, `packages/protocol/src/index.js`, `packages/protocol/src/index.d.ts` | closed |
| Generated rights-transfer artifact exists | `.bitcode/v36-exchange-rights-transfer-review.json`, `scripts/generate-v36-exchange-rights-transfer-review.mjs`, `pnpm run check:v36-exchange-rights-transfer-review` | closed |
| Required preview identity fields are covered | BTD range identity, current owner, requested buyer, rights scope, settlement unlock condition, disclosure limit, source visibility, authority posture, proof roots, event ids, and projection refs | closed |
| AssetPack source remains hidden | AssetPack source is hidden until paid settlement and rights transfer are complete | closed |
| Preview states are distinct | owner-read, licensed-read, and blocked transfer states are represented and fail closed on missing authority, stale owner, policy denial, missing receipt, or source visibility attempts | closed |
| Rights-transfer payloads are source-safe | `source-safe-exchange-rights-transfer-review-metadata`; protected source, unpaid AssetPack source, private wallet material, provider tokens, protected prompts, protected model responses, private buyer payloads, and secret values are forbidden | closed |
| Ledger/database projection posture is explicit | ledger journal refs outrank database projection refs for rights-transfer preview and owner truth | closed |
| Workflow and package tests are wired | `packages/protocol/test/v36-exchange-rights-transfer-review.test.js`, `scripts/check-v36-gate4-exchange-rights-transfer-review.mjs`, `.github/workflows/bitcode-gate-quality.yml` | closed |

## Gate 5 Parity

| Requirement | Source evidence | Current V36 judgment |
| --- | --- | --- |
| `ExchangePricingQuote` is package-owned | `packages/protocol/src/canonical/exchange-pricing-quote.js`, `packages/protocol/src/index.js`, `packages/protocol/src/index.d.ts` | closed |
| Generated pricing artifact exists | `.bitcode/v36-pricing-liquidity-fee-quote.json`, `scripts/generate-v36-exchange-pricing-quote.mjs`, `pnpm run check:v36-exchange-pricing-quote` | closed |
| Deterministic quote inputs are covered | BTC amount, measurement weight, measurement volume, liquidity band, wrapper analysis, treasury route, depositor route, reader route, and quote root | closed |
| Wrapper non-fungibility boundary is enforced | wrapper analysis cannot make BTD range cells fungible chain-of-record assets | closed |
| Payment and network failures close safely | underpayment, overpayment, stale quote, or unsupported network posture fails closed | closed |
| Pricing payloads are source-safe | `source-safe-exchange-pricing-quote-metadata`; protected source, unpaid AssetPack source, private wallet material, provider tokens, protected prompts, protected model responses, private payment credentials, private buyer payloads, and secret values are forbidden | closed |
| Ledger/database projection posture is explicit | ledger journal refs outrank database projection refs for quote roots, settlement admission, route allocation, and network posture | closed |
| Workflow and package tests are wired | `packages/protocol/test/v36-exchange-pricing-quote.test.js`, `scripts/check-v36-gate5-exchange-pricing-quote.mjs`, `.github/workflows/bitcode-gate-quality.yml` | closed |

## Gate 6 Parity

| Requirement | Source evidence | Current V36 judgment |
| --- | --- | --- |
| `ExchangeSettlementReceipt` is package-owned | `packages/protocol/src/canonical/exchange-settlement-reconciliation.js`, `packages/protocol/src/index.js`, `packages/protocol/src/index.d.ts` | closed |
| Generated settlement artifact exists | `.bitcode/v36-exchange-settlement-reconciliation.json`, `scripts/generate-v36-exchange-settlement-reconciliation.mjs`, `pnpm run check:v36-exchange-settlement-reconciliation` | closed |
| Required settlement fields are covered | payment observation, finality state, rights transfer receipt, ledger root, database projection root, object storage root, delivery state, and repair id | closed |
| Projection reconciliation is explicit | observers and repair jobs reconcile database projections to ledger truth | closed |
| Finality and delivery are auditable | settlement finality and delivery are auditable | closed |
| Settlement payloads are source-safe | `source-safe-exchange-settlement-reconciliation-metadata`; protected source, unpaid AssetPack source, private wallet material, provider tokens, protected prompts, protected model responses, private payment credentials, object-storage private bytes, private buyer payloads, and secret values are forbidden | closed |
| Workflow and package tests are wired | `packages/protocol/test/v36-exchange-settlement-reconciliation.test.js`, `scripts/check-v36-gate6-exchange-settlement-reconciliation.mjs`, `.github/workflows/bitcode-gate-quality.yml` | closed |

## Gate 7 Parity

| Requirement | Source evidence | Current V36 judgment |
| --- | --- | --- |
| `ExchangeDisputeRepairCase` and `ExchangeRevenueRoute` are package-owned | `packages/protocol/src/canonical/exchange-dispute-repair-revenue-route.js`, `packages/protocol/src/index.js`, `packages/protocol/src/index.d.ts` | closed |
| Generated dispute and revenue artifact exists | `.bitcode/v36-exchange-dispute-repair-revenue-route.json`, `scripts/generate-v36-exchange-dispute-repair-revenue-route.mjs`, `pnpm run check:v36-exchange-dispute-repair-revenue-route` | closed |
| Required dispute classes are covered | stale owner, cancelled order replay, underpayment, overpayment, projection drift, source leakage, and delivery mismatch | closed |
| Required revenue route fields are covered | depositor, reader, treasury, fee, BTC route, BTD right route, and conservation proof | closed |
| Repair operations are source-safe | runbooks and repair commands are source-safe and proof-rooted | closed |
| Escalation and verification are explicit | repair commands, verification commands, escalation paths, proof roots, and event ids are present for every dispute case | closed |
| Revenue conservation is explicit | every revenue route proves BTC debits equal credits while BTD rights and source-to-shares roots remain conserved | closed |
| Dispute and revenue payloads are source-safe | `source-safe-exchange-dispute-repair-revenue-route-metadata`; protected source, unpaid AssetPack source, private wallet material, private payment credentials, raw disputed source bytes, provider tokens, protected prompts, protected model responses, private buyer payloads, object-storage private bytes, and secret values are forbidden | closed |
| Workflow and package tests are wired | `packages/protocol/test/v36-exchange-dispute-repair-revenue-route.test.js`, `scripts/check-v36-gate7-exchange-dispute-repair-revenue-route.mjs`, `.github/workflows/bitcode-gate-quality.yml` | closed |

## Gate 8 Parity

| Requirement | Source evidence | Current V36 judgment |
| --- | --- | --- |
| `ExchangeUxProof` is package-owned | `packages/protocol/src/canonical/exchange-ux-proof.js`, `packages/protocol/src/index.js`, `packages/protocol/src/index.d.ts` | closed |
| Generated Exchange UX artifact exists | `.bitcode/v36-exchange-ux-proof.json`, `scripts/generate-v36-exchange-ux-proof.mjs`, `pnpm run check:v36-exchange-ux-proof` | closed |
| Exchange route exposes market review | `/exchange` exposes market-wide master-detail, filters, order history, rights-transfer review, pricing quote, settlement state, and repair state | closed |
| Terminal handoff preserves context | `buildExchangeHref`, `TerminalTransactionDetailHero`, and `uapi/tests/exchangeTerminalHandoff.test.ts`; Terminal can hand off to Exchange without losing transaction context | closed |
| Collapsed and expanded disclosure is source-safe | collapsed UI gives readable status and expanded UI exposes source-safe detail | closed |
| Telemetry binding is source-safe | `source-safe-exchange-ux-proof-metadata`; Exchange telemetry dashboards remain source-safe and proof-rooted | closed |
| Workflow, package, and UI tests are wired | `packages/protocol/test/v36-exchange-ux-proof.test.js`, `uapi/tests/exchangePageClient.test.tsx`, `uapi/tests/exchangeTerminalHandoff.test.ts`, `scripts/check-v36-gate8-exchange-ux-proof.mjs`, `.github/workflows/bitcode-gate-quality.yml` | closed |

## V36 accepted boundaries

- V36 owns deeper Exchange.
- V37 owns website Conversations.
- V36 does not authorize value-bearing production-mainnet launch.
- V36 does not expose protected AssetPack source before settlement through any runtime carrier, generated proof, log, or interface.
- V36 does not redefine BTD supply, BTC fee separation, AssetPack range identity, owner-read/licensed-read law, measureminting, ancestry, or Reading pipeline product law.

## V36 completion condition

V36 parity is complete when each Exchange gate row has source evidence, tests, generated artifacts where required, workflow/checker support, documentation, and closed parity judgment, and when V36 promotion can rewrite `BITCODE_SPEC.txt` from `V35` to `V36` only after promotion-grade validations pass.
