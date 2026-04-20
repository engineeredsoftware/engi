# ENGI Demo Architecture Map

This document maps the **pre-alignment demo architecture** that existed in `engi-demo/` before the Spec V6 refactor, because that baseline is what the gap analysis compares against.

## 1. Runtime shape

- **Server shell:** `server.js`
- **UI shell:** `public/index.html`, `public/app.js`, `public/styles.css`
- **State store:** `data/state.json`
- **Core logic:** small deterministic helpers under `src/`
- **Tests:** `test/api.test.js`, `test/core.test.js`

The app was a single-process Node HTTP server with static-file serving and JSON API endpoints.

## 2. Original API flow

### `GET /api/state`
Returned a public projection of local state, including:
- deposited assets
- licenses
- balances
- receipts
- demo scenario text
- proof log / policy / attestation snapshots

### `POST /api/deposits`
Accepted free-form asset deposits and stored:
- public asset metadata
- chunked private blob
- simple verification booleans
- a deposit receipt

### `POST /api/license-query`
Primary read path. It:
1. found a buyer license,
2. ranked chunks lexically against a free-text query,
3. built a private bundle,
4. emitted public bundle + allocation receipts,
5. debited license units and credited contributor balances.

### `POST /api/utility`
Recorded an operator-entered benchmark uplift receipt after the fact.

### `POST /api/reset`
Reset the local seeded scenario.

## 3. Original domain model

### Asset model
Defined in `src/bitcode-core.js` via `makeAssetCommitment()`.

Each asset had:
- `assetId`
- metadata (`title`, `author`, `tags`, `sourceType`)
- simple `verification` booleans (`compileOk`, `testsOk`, `proofOk`)
- a coarse `measurement` tuple (`quantityBp`, `qualityBp`, `valenceBp`, `totalBp`)
- chunked private content

### Ranking model
Implemented by:
- `rankChunksForQuery()` in `src/bitcode-core.js`
- `explainRankedChunks()` in `src/ranking-explainer.js`

Behavior:
- lexical term overlap on chunk text
- blended with asset measurement carry
- selected top chunks, not spec-level candidate assets / use tiers

### Bundle / settlement model
Implemented by:
- `buildBundleIssuance()` in `src/bitcode-core.js`
- `allocateUnits()` in `src/bitcode-core.js`
- `buildConservationCheck()` in `src/conservation-check.js`

Behavior:
- fixed bundle price in visible units
- proportional allocation from chunk scores
- conservation check only
- no journal diff, no fixed-point micro-unit accounting, no asset-scoped settlement proof

### Value demo model
Implemented by:
- `buildBenchmarkComparison()` in `src/benchmark-model.js`
- `utilityReceipt()` in `src/bitcode-core.js`

Behavior:
- operator-entered baseline / treatment scores
- uplift shown as a separate illustrative payoff panel
- explicitly outside core protocol measurement

## 4. Original proof / inspection surfaces

The original demo exposed several proof-adjacent surfaces:
- receipt schemas (`src/receipt-schemas.js`)
- proof log (`src/proof-log.js`)
- policy release (`src/policy-release.js`)
- deployment / attestation snapshot (`src/attestation-model.js`)
- demo walkthrough (`src/demo-scenario.js`)

These were useful framing surfaces, but they were not yet the Spec V6 branch artifact set.

## 5. Tight architectural summary

The old demo was best described as:

> public asset deposits + lexical licensed retrieval + simple bundle issuance + contributor allocation + optional benchmark-uplift storytelling

### What it already had going for it
- deterministic local execution
- inspectable state and receipts
- private/public split in the UI story
- strong simplicity and runnable demo UX

### What it structurally lacked relative to V6
- GitHub need descriptor / benchmark parser boundary
- explicit candidate asset types and content units
- ranking subscores from the spec
- separate verification determinisms and propagated use tiers
- asset pack assembly
- Make ENGI branch buyer UX
- `.engi/*` remediation branch artifacts
- exact journal diff and system proof bundle
