# ENGI Demo — Spec V8 Deterministic Local Prototype

This demo now tracks the Spec V8 core flow closely:

1. parse mocked GitHub Actions evidence through a declared benchmark parser contract and build a `GitHubNeedDescriptor`,
2. model hybrid candidate recall across task, failure-mode, technical-context, lexical, symbol, path, config, and artifact-kind channels,
3. rank deposited candidate assets with explicit Spec V8 score groups, explainability traces, and penalties,
4. apply separate verification determinisms, issuer policy, and downstream use-tier propagation,
5. assemble a locked `AssetPack` plus selected source-material manifest,
6. stage a private remediation branch artifact set with deliverable metadata, authorization decisions, and sensitive-data-flow records,
7. compute raw + settled shares,
8. settle exact micro-unit movement through a journal diff and proof bundle.

## What this prototype is

A deterministic, local, no-dependency Node app that models the V8 Profile A architecture faithfully enough to demo while explicitly labeling Profile B production intent:

- need measurement from GitHub-bound benchmark evidence,
- parser fail-closed behavior and canonical run-evidence normalization,
- canonical need-descriptor derivation closure with explicit field derivations,
- content-unit semantics with explicit embedding/vector hand-off interfaces,
- need-measurement provenance plus inference proof surfaces,
- clean separation between static deterministic analysis and inferred evaluator surfaces,
- hybrid candidate recall and fusion provenance,
- ranking vs verification separation,
- issuer policy / sufficiency / use-tier propagation,
- branch materialization rules by use tier and branch mode,
- authorization, identity binding, confidentiality, retention, revocation, and bounded-public-proof modeling,
- structured pipeline telemetry and unit catalogs for live demo inspection,
- private remediation branch artifacts under `.engi/`,
- exact fixed-point settlement with asset-scoped pending claims and asset-pack-lock binding.

## What it still is not

This is still a local prototype. It does **not**:

- talk to live GitHub,
- parse real workflow artifacts from the network,
- create real branches or PRs,
- generate actual remediation patches,
- enforce real authz boundaries beyond modeled data structures,
- run LLM evaluators.

All of those surfaces are represented deterministically in local state.

## Conformance profiles

- `Profile A — local deterministic prototype`: what this repo implements and demos now.
- `Profile B — production-boundary intent`: live GitHub binding, real branch/privacy/authz enforcement, real embeddings/evaluators/prompts, and external integrations still outside the local prototype boundary.

## Advanced V8 interface notes

- Content units now carry explicit semantic/embedding contracts so real embedding providers can replace deterministic stand-ins without changing downstream schemas.
- Measurement provenance distinguishes static deterministic analysis from inferred evaluator surfaces.
- Structured telemetry artifacts (`.engi/unit-catalog.json`, `.engi/pipeline-telemetry.json`) explain the live pipeline during demos.
- Proof bundles now include prompt/evaluator implementation surfaces alongside the existing settlement / policy / identity proofs.
- Every JSON-heavy demo surface now supports a reusable **Visual | Raw** presentation mode. Visual is the default for readability; Raw preserves the exact pretty-printed artifact JSON for inspection/debugging.

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

## Main branch artifacts modeled in the latest run

- `.engi/need.json`
- `.engi/need-measurement.json`
- `.engi/benchmark-target.json`
- `.engi/match-report.json`
- `.engi/verification-report.json`
- `.engi/eval-manifest.json`
- `.engi/asset-pack.lock.json`
- `.engi/selected-source-material.json`
- `.engi/settlement-preview.json`
- `.engi/settlement-proof.json`
- `.engi/journal-diff.json`
- `.engi/system-proof-bundle.json`
- `.engi/authorization-decisions.json`
- `.engi/sensitive-data-flow.json`
- `.engi/policy-release.json`
- `.engi/unit-catalog.json`
- `.engi/pipeline-telemetry.json`
- `.engi/deliverables.json`
- `.engi/source-material/*`
- `ENGI_NEED.md`

## Repo docs added for this alignment pass

- `ARCHITECTURE_MAP.md` — tight map of the original/current demo architecture baseline
- `SPEC_V6_GAP_ANALYSIS.md` — earlier gap analysis and implementation guide used for the V6 refactor
- `SPEC_V6_COVERAGE_MATRIX.md` — durable section-by-section coverage audit against the V6 spec
- `SPEC_V7_COVERAGE_MATRIX.md` — preserved historical coverage audit for the V7 spec and V6→V7 deltas
- `SPEC_V8_COVERAGE_MATRIX.md` — authoritative audit/design/closure plan for the current V8 demo
