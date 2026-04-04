# ENGI Demo - V14-canonical / V12-realized deterministic local prototype with V15 draft companions

This demo is now governed by the V14 canonical spec while still remaining most fully realized against the preserved V12 design/demonstration baseline.

Current spec/doc truth for this repo:
- Canonical pointer is `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC.txt -> V14`
- V14 is the current canonical/latest target and governing spec
- V12 remains the last fully realized canon implementation baseline preserved in the demo source
- V13 established the spec-file structure/formality standard that V14 now realizes in full
- V15 is the drafted next target, with demo-local parity now tracked at `SPEC_V15_IMPLEMENTATION_MATRIX.md`

## What this prototype demonstrates

The local deterministic prototype models the ENGI operating chain as:

1. repo supply and modeled GitHub App-authenticated inventory,
2. depositing candidate supply against a measured need,
3. needing as benchmark/parser/repo-derived demand,
4. explicit deposit-to-need fit before deep proof inspection,
5. ranked candidates plus separate verification and use-tiering,
6. asset-pack assembly and private branch artifact materialization,
7. proof closure, bounded public proof, and disclosure/redaction policy,
8. exact source-to-shares settlement with journal diff conservation.

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
- execute real networked settlement effects.

Those surfaces are represented deterministically in local state and called out explicitly in the boundary surfaces.

## Main implementation surfaces

Primary source files:
- `src/engi-demo.js` - core state, need measurement, evaluation, proof, settlement, projection, and branch artifact builders
- `src/realization-profile.js` - canonical profile aliasing, discriminants, and legacy demo-name compatibility
- `src/settlement-structs.js` - source-to-shares and settlement participation discriminants
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
- scenario fixture manifest and test coverage report
- projection policy, bounded public proof, redaction proof, and disclosure proof
- deliverables manifest
- `ENGI_NEED.md`

## Repo documentation for the current pass

- `../ENGI_SPEC_V14.md` - full enriched canonical spec
- `../ENGI_SPEC_V14_NOTES.md` - version-local drafting notes
- `../ENGI_SPEC_V15.md` - drafted next system-spec target with explicit system-vs-demo separation
- `../ENGI_SPEC_V15_NOTES.md` - V15 drafting rationale and refactor posture
- `../ENGI_SPEC_V15_INFORMATION_AUDIT.md` - latest prior-state to V15 information audit
- `SPEC_V15_IMPLEMENTATION_MATRIX.md` - canonical V15 demo parity/debt ledger for this repo
- `SPEC_V14_IMPLEMENTATION_MATRIX.md` - parity/debt ledger for the current demo
- `HOST_CAPABILITIES.md` / `HOST_CAPABILITIES.json` - host/runtime/container truth
- `ARCHITECTURE_MAP.md` - preserved architecture map
