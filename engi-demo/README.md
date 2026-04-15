# Bitcode Demo - V25 canonical deterministic local prototype

This demo is governed by the active V25 canonical spec and serves as the current deterministic local realization of the full Bitcode operating chain while V26 drafts the next rename-complete implementation pass.

Current spec/doc truth for this repo:
- Canonical pointer is `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC.txt -> V25`
- V25 is the current canonical/latest target and governing full-system spec
- `ENGI_SPEC_V25_PROVEN.md` is the active generated proof appendix
- the next-version draft family opens in the matching `ENGI_SPEC_VN.md`, `ENGI_SPEC_VN_DELTA.md`, and `ENGI_SPEC_VN_PARITY_MATRIX.md` files when that work begins
- optional `ENGI_SPEC_VN_NOTES.md` files are non-canonical working notes only

## What this prototype demonstrates

The local deterministic prototype models the Bitcode operating chain as:

1. repo supply and modeled GitHub App-authenticated inventory,
2. depositing candidate supply against a measured need,
3. needing as benchmark/parser/repo-derived demand,
4. explicit deposit-to-need fit before deep proof inspection,
5. ranked candidates plus separate verification and use-tiering,
6. asset-pack assembly and private branch artifact materialization,
7. proof closure, bounded public proof, and disclosure/redaction policy,
8. exact source-to-shares settlement with journal diff conservation,
9. BTD-denominated bitcoin-facing settlement intent and observation carriers,
10. prototype compute/storage reality manifests and public/private commitment receipts.

The demo is intentionally centered on:
- depositing,
- needing,
- fit,
- identity/auth as spine,
- repo-to-settlement closure,
- proof and settlement as necessary consequences,
- and explicit boundary honesty.

## What remains modeled rather than live

This repo does not:
- mint live GitHub installation tokens,
- fetch live workflow artifacts from the network,
- push real remediation branches or PR updates,
- run live LLM evaluators,
- publish proof artifacts to an external system,
- execute live mainnet or third-party network settlement effects.

At the same time, V23 now does execute deterministic stubbed-testnet demonstration service code for:
- PSBT-shaped audited base-layer purchase carriers,
- BOLT11-shaped repeated-read payment carriers,
- sidechain checkpoint stand-ins,
- and anchor publication receipts bound back to Bitcode bundle and settlement surfaces.

Those surfaces are represented deterministically in local state, called out explicitly in the boundary surfaces, and separated from any claim that live mainnet or third-party execution is active in this repo.

## Main implementation surfaces

Primary source files:
- `src/engi-demo.js` - core state, need measurement, evaluation, proof, settlement, projection, and branch artifact builders
- `src/demo-shell-state.js` - demo-shell/public-state projection shaping, profile composition surfaces, and bounded projection summaries
- `src/realization-profile.js` - canonical realization-profile discriminants and profile builders
- `src/settlement-structs.js` - source-to-shares and settlement participation discriminants
- `src/canonical/projections.js` - bounded public proof, redaction, disclosure, and projection-policy builders
- `src/canonical/proof-materialization.js` - materialization, witness-manifest, and accounting-precision builders
- `src/canonical/v23-bitcoin-demonstration-service.js` - deterministic stubbed-testnet spend, observation, sidechain, and anchor publication service carriers
- `server.js` - deterministic API and atomic local persistence
- `public/app.js` - operator shell, visual/raw surfaces, explainers, and panel ordering
- `public/index.html` - canonical shell structure for the demo

Primary tests:
- `test/core.test.js` - subsystem invariants and artifact consistency
- `test/api.test.js` - route semantics, projection behavior, persistence safety
- `test/e2e.test.js` - browser ordering and end-to-end operator flows

## Run

```bash
cd /Users/garrettmaring/Developer/ENGI/engi-demo
npm start
```

Open <http://localhost:4318>.

## Test

```bash
cd /Users/garrettmaring/Developer/ENGI/engi-demo
npm test
```

## Main API

- `GET /api/state`
- `GET /api/bitcoin-demonstration-service`
- `POST /api/deposits`
- `POST /api/make-engi-branch`
- `POST /api/reset`

## Canonical branch artifact families

The latest run emits branch-scoped artifacts under `.engi/`, including:
- need and need-measurement artifacts
- depositing, needing, and deposit-to-need fit surfaces
- match, verification, and eval manifests
- asset-pack lock and selected source material manifest
- identity, policy, authz, and GitHub boundary artifacts
- prompt, measurement, verification, and proof artifacts
- materialization proof and exclusions
- source-to-shares, settlement participation, accounting precision, settlement proof, and journal diff
- compute-reality, storage-reality, bitcoin commitment, treasury-policy, anchor, bounded-public anchor, settlement intent, and settlement observation manifests
- scenario fixture manifest and test coverage report
- projection policy, bounded public proof, redaction proof, and disclosure proof
- deliverables manifest
- `ENGI_NEED.md`

## Repo documentation for the current pass

- `../ENGI_SPEC.txt` - pointer to the active canonical version
- `../ENGI_SPEC_V24.md` - active full-system canonical spec
- `../ENGI_SPEC_V24_DELTA.md` - active version-local delta
- `../ENGI_SPEC_V24_PARITY_MATRIX.md` - active parity ledger
- `../ENGI_SPEC_V24_PROVEN.md` - active generated proof appendix
- `../ENGI_SPEC_V20_PROPER.md` - historical full-canon reconstruction validation surface
- `../ENGI_SPECIFYING.md` - current specifying standard
- next-version draft work, when opened, lives in the matching `../ENGI_SPEC_VN*.md` family plus optional `../ENGI_SPEC_VN_NOTES.md`
- `HOST_CAPABILITIES.md` / `HOST_CAPABILITIES.json` - host/runtime/container truth
- `ARCHITECTURE_MAP.md` - preserved architecture map
