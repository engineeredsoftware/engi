# ENGI Demo — Spec V6 Deterministic Local Prototype

This demo now tracks the Spec V6 core flow much more closely:

1. parse mocked GitHub Actions evidence through a declared benchmark parser contract and build a `GitHubNeedDescriptor`,
2. model hybrid candidate recall across task, failure-mode, technical-context, lexical, symbol, path, config, and artifact-kind channels,
3. rank deposited candidate assets with explicit Spec V6 subscores, explainability traces, and penalties,
4. apply separate verification determinisms, issuer policy, and downstream use-tier propagation,
5. assemble a locked `AssetPack` plus selected source-material manifest,
6. stage a private remediation branch artifact set with deliverable metadata, authorization decisions, and sensitive-data-flow records,
7. compute raw + settled shares,
8. settle exact micro-unit movement through a journal diff and proof bundle.

## What this prototype is

A deterministic, local, no-dependency Node app that models the V6 architecture and naming faithfully enough to demo:

- need measurement from GitHub-bound benchmark evidence,
- parser fail-closed behavior and canonical run-evidence normalization,
- need-measurement provenance plus inference proof surfaces,
- hybrid candidate recall and fusion provenance,
- ranking vs verification separation,
- issuer policy / sufficiency / use-tier propagation,
- branch materialization rules by use tier,
- authorization, identity binding, confidentiality, retention, and revocation modeling,
- private remediation branch artifacts under `.engi/`,
- exact fixed-point settlement with asset-scoped pending claims.

## What it still is not

This is still a local prototype. It does **not**:

- talk to live GitHub,
- parse real workflow artifacts from the network,
- create real branches or PRs,
- generate actual remediation patches,
- enforce real authz boundaries beyond modeled data structures,
- run LLM evaluators.

All of those surfaces are represented deterministically in local state.

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
- `.engi/deliverables.json`
- `.engi/source-material/*`
- `ENGI_NEED.md`

## Repo docs added for this alignment pass

- `ARCHITECTURE_MAP.md` — tight map of the original/current demo architecture baseline
- `SPEC_V6_GAP_ANALYSIS.md` — gap analysis and implementation guide used for the refactor
- `SPEC_V6_COVERAGE_MATRIX.md` — durable section-by-section coverage audit against the V6 spec
