# ENGI V1 SPEC

Status: source-up V7 draft
Scope: ENGI v1
Constraint: GitHub-only trusted integration
Baseline: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V6.md`
This document: V7
Canonical path remains unchanged unless explicitly repointed elsewhere.

---

# 1. Executive summary

ENGI v1 is a GitHub-native system for:

1. measuring a buyer engineering need from GitHub repository state and GitHub Actions benchmark / test / CI evidence,
2. recalling and ranking deposited technical content by expected contribution to resolving that need,
3. applying explicit verification determinisms that decide whether candidate content is eligible for contextual use, branch inclusion, and settlement participation,
4. assembling a need-matched asset pack,
5. materializing an inspectable private remediation branch artifact set,
6. computing contribution-based asset shares,
7. settling value movement under exact fixed-point accounting with a structured journal diff and formal proof objects.

V7 preserves the V6 architecture but tightens the parts that were still underspecified once the spec was forced against the current `engi-demo` source, tests, and gap-analysis artifacts.

V7 specifically clarifies:
- the distinction between normative production intent and the currently implemented local deterministic prototype,
- exact field-derivation rules for need descriptors and parser outputs,
- candidate-asset, content-unit, and branch-artifact contracts,
- use-tier semantics and branch-mode eligibility,
- confidentiality, authorization, retention, and bounded-public proof rules,
- settlement preview, journal diff, and proof-bundle closure requirements,
- failure contracts for parsing, measurement, ranking, verification, state persistence, and settlement,
- prototype-only behaviors that are acceptable for demo conformance but MUST NOT be mistaken for final production behavior.

The core ENGI v1 solve remains:

> Measure where a technical AI company’s product underperforms on engineering-relevant benchmark slices, match the right engineering intelligence supply to that need, create an inspectable private remediation branch containing selected source material plus measurement and settlement context, and produce exact attribution and settlement around that value movement.

---

# 2. Normative language and conformance profiles

The terms MUST, MUST NOT, SHOULD, SHOULD NOT, and MAY are normative.

V7 defines two explicit conformance profiles.

## 2.1 Profile A — local deterministic prototype

This profile describes what the current `engi-demo` implementation does locally now.

A system conforming only to Profile A:
- MAY simulate GitHub evidence from local seeded state,
- MAY simulate branch artifacts as in-memory or persisted JSON/text payloads,
- MAY use deterministic non-LLM scoring and evaluator stand-ins,
- MAY model authorization, retention, disclosure, and proof surfaces as structured artifacts rather than enforced infrastructure,
- MUST clearly mark those modeled surfaces as modeled,
- MUST fail closed at the same decision points the production system would fail closed.

## 2.2 Profile B — production-boundary intent

This profile describes the intended external system behavior for ENGI v1.

A production-boundary implementation:
- MUST bind need measurement to real GitHub repository and GitHub Actions evidence,
- MUST enforce actual branch visibility, authorization, retention, and access control,
- MUST produce branch and proof artifacts matching the normative shapes in this spec,
- MUST preserve all settlement invariants and proof obligations,
- MAY replace prototype scoring internals so long as outputs remain schema-compatible, explainable, and policy-compliant.

## 2.3 Precedence rule

When Profile A and Profile B differ:
1. production-boundary safety and integrity requirements take precedence,
2. Profile A implementation shortcuts MUST be explicitly marked as prototype-only,
3. prototype shortcuts MUST NOT silently redefine the production contract.

---

# 3. Source-of-truth hierarchy

V6 treated the prose spec as primary. V7 defines a stricter source-up hierarchy.

For any disputed behavior, resolve in this order:
1. explicit safety, confidentiality, accounting, and fail-closed requirements in this V7 spec,
2. exact schema and invariant definitions in this V7 spec,
3. source-faithful evidence from the current prototype where V7 marks behavior as `implemented-now`,
4. production intent rules where V7 marks behavior as `production-boundary`,
5. V6 wording only where not superseded by the above.

V7 therefore treats V6 as a baseline, not final truth.

---

# 4. Product goals and non-goals

## 4.1 Goals

ENGI v1 MUST:
- ingest a buyer engineering need from GitHub repo + GitHub Actions evidence,
- normalize benchmark outputs through a declared parser contract before ranking,
- rank candidate assets with explicit subscore families,
- evaluate verification determinisms separately from ranking,
- derive an auditable final use tier per candidate,
- assemble an asset pack with locked roots and unit bindings,
- materialize a private remediation branch artifact set,
- compute deterministic asset shares and exact micro-unit allocation,
- emit a settlement preview, journal diff, authorization record, sensitive-data flow record, policy release, and proof bundle.

## 4.2 Non-goals

ENGI v1 MUST NOT be interpreted as:
- a generic multi-provider CI abstraction,
- a pure prompt-based retrieval demo,
- a social reputation market,
- a public content-delivery system,
- an auto-merge coding agent,
- a vague “trust me” ranking engine,
- a branch generator that hides measurement or accounting logic.

---

# 5. Design principles

1. **Need match dominates.** Ranking starts from the measured engineering need, not from generic relevance.
2. **Ranking and verification are distinct systems.** A useful asset MAY still be ineligible for patching or settlement.
3. **Parser closure precedes need measurement.** If GitHub Actions evidence cannot be normalized, ENGI MUST stop before ranking, branch materialization, or settlement.
4. **Private delivery precedes any public proof.** Selected source material, private branch artifacts, and settlement previews default to private.
5. **Use tiers drive downstream rights.** Context, branch materialization, and settlement are separate rights classes.
6. **Settlement is a state transition proof, not just arithmetic.** Before/after roots, journal completeness, and reference closure matter.
7. **Identity and authorization are first-class artifacts.** Delivery rights MUST be attributable to explicit principals and policies.
8. **Prototype simplifications must be labeled.** Modeled behavior MUST NOT masquerade as enforced infrastructure.
9. **Inspectability beats mystique.** Every major score, gate, artifact inclusion, settlement movement, and disclosure decision SHOULD be explainable.
10. **Source/spec parity is mandatory.** If the implementation or analysis artifacts expose an unbound field, implicit invariant, or hidden failure mode, V7 MUST either codify it or explicitly classify it as prototype debt.

---

# 6. Trusted integration boundary

## 6.1 Trusted external surfaces

ENGI v1 trusts only the following external surfaces:
- GitHub repositories,
- GitHub branches, commits, trees, pull requests, checks, and statuses,
- GitHub Actions workflow definitions and workflow runs,
- benchmark harness configuration stored in the buyer repo,
- parser-declared artifacts extracted from GitHub Actions runs,
- ENGI-controlled policy, settlement, and authorization state.

## 6.2 Less-trusted or untrusted surfaces

The following MUST be treated as untrusted or only partially trusted unless independently bound:
- free-form human prompts,
- asset body text by itself,
- signer display names,
- repo-external claims without provenance binding,
- claimed benchmark outcomes without a bound workflow run,
- UI-only state not persisted into branch/proof artifacts.

## 6.3 Provider lock

For v1:

```ts
sourceProvider = 'github'
buildSystem = 'github-actions'
```

ENGI v1 MUST NOT generalize its trusted boundary to other source or CI providers in the v1 core spec.

## 6.4 Buyer UX for stating a need

The canonical GitHub UX is:
1. buyer creates an `ENGI-...` branch from the repo state they want help with,
2. buyer opens a PR from that branch,
3. GitHub Actions executes benchmark / test / CI workflows on that PR,
4. ENGI reads the repo state, PR state, workflow outputs, and parser-normalized benchmark outputs,
5. ENGI creates its own remediation branch from the buyer’s branch,
6. ENGI later opens a PR back into the buyer’s `ENGI-...` branch or otherwise hands back the remediation branch for inspection, depending on implementation stage.

## 6.5 Naming rules

Buyer branch SHOULD match:

```text
ENGI-<short-need-slug>
```

ENGI remediation branch SHOULD match:

```text
engi/remediation-<need-id>-<scenario-or-need-slug>
```

The remediation branch name MUST embed the `needId` or another unique need-stable identifier.

---

# 7. Terminology

## 7.1 Engineering need

An engineering need is a GitHub-bound, benchmark-anchored problem description derived from repository context plus normalized workflow evidence.

## 7.2 Candidate asset

A candidate asset is a deposited technical artifact with:
- a stable `assetId`,
- an `artifactKind`,
- a `contentRoot`,
- one or more `contentUnits`,
- attestation data,
- provenance binding,
- verification evidence,
- metadata,
- measurement provenance.

## 7.3 Content unit

A content unit is the smallest selection-addressable and measurement-addressable subdivision of a candidate asset.

In the current prototype this is paragraph/block-based. Production implementations MAY choose another segmentation rule, but MUST preserve:
- stable unit IDs within the asset version,
- unit hashes,
- unit-level evidence references,
- reproducible materialization into branch artifacts.

## 7.4 Use tier

A use tier is the highest right ENGI may exercise over a candidate for the current need event.

Normative tier set:
- `reject`
- `rank-only`
- `context-only`
- `patch-eligible`
- `settlement-eligible`

## 7.5 Asset pack

An asset pack is the selected, locked set of assets and units for one need-resolution event.

## 7.6 Journal diff

A journal diff is the state-transition artifact describing before/after ledger roots, debits, credits, shares, invariants, and reference closure for a settlement event.

---

# 8. Source-faithfulness model

V7 introduces explicit source-faithfulness tags.

Each normative rule SHOULD be classifiable as one of:
- `implemented-now`: present in `engi-demo` source/tests today,
- `modeled-prototype-only`: represented structurally in the demo but not externally enforced,
- `production-boundary`: required for real deployment but not fully demoable locally.

The following high-level classification applies:

| Surface | Status |
|---|---|
| deterministic candidate asset structure | implemented-now |
| seeded need scenarios and mocked GitHub evidence | implemented-now |
| parser contract object and fail-closed parser semantics | implemented-now / modeled-prototype-only |
| deterministic ranking subscores | implemented-now |
| verification determinisms and use tiers | implemented-now |
| branch artifact generation under `.engi/` | implemented-now |
| exact journal diff and micro-unit accounting | implemented-now |
| authorization decisions, data-flow records, policy release, proof bundle | implemented-now / modeled-prototype-only |
| actual GitHub API integration and branch creation | production-boundary |
| real authz enforcement and artifact privacy | production-boundary |
| real LLM evaluators | production-boundary |

---

# 9. Core data model

## 9.1 Canonical GitHub action run evidence

```ts
type GitHubActionRunEvidence = {
  workflowPath: string
  runId: string
  runUrl: string
  commitSha: string
  branch: string
  conclusion: 'success' | 'failure' | 'cancelled' | 'timed_out' | 'neutral' | 'action_required'
  artifacts: {
    name: string
    path?: string
    url?: string
    mediaType?: string
  }[]
  checks: {
    name: string
    conclusion: string
  }[]
  extractedOutputs: CanonicalBenchmarkOutputs
}
```

## 9.2 Canonical benchmark outputs

```ts
type CanonicalBenchmarkOutputs = {
  failingCases: string[]
  weakDimensions: string[]
  baselineMetrics: Record<string, number>
  touchedPaths?: string[]
  symbols?: string[]
  configKeys?: string[]
  parserKind: string
  parserVersion: string
}
```

## 9.3 GitHub need descriptor

V7 tightens the need descriptor and its derivation rules.

```ts
type GitHubNeedDescriptor = {
  needId: string
  repo: string
  installationId: string
  baseRef: string
  targetRef: string
  prNumber: number
  benchmarkHarnessPath: string
  benchmarkWorkflowPath: string
  benchmarkRunId: string
  benchmarkRunUrl: string
  canonicalRunEvidence: GitHubActionRunEvidence
  benchmarkParserContract: {
    parserKind: string
    parserVersion: string
    acceptedArtifactMediaTypes: string[]
    parserFailureContract: {
      failClosed: true
      onMissingCanonicalOutputs: 'reject-need-materialization'
      onMalformedOutputs: 'emit-parser-error-artifact'
    }
  }
  canonicalBenchmarkOutputs: CanonicalBenchmarkOutputs
  task: string
  failureModes: string[]
  constraints: string[]
  targetArtifactKinds: string[]
  stackHints: string[]
  touchedPaths: string[]
  extractedSymbols: string[]
  configKeys: string[]
  failingCases: string[]
  weakDimensions: string[]
  baselineMetrics: Record<string, number>
  humanPrompt?: string
  measurementProvenance: MeasurementTrace[]
}
```

### 9.3.1 Critical derivation rule

V7 resolves a source/spec ambiguity exposed by the current prototype.

The fields `task`, `failureModes`, `constraints`, `targetArtifactKinds`, `stackHints`, `touchedPaths`, `extractedSymbols`, `configKeys`, `failingCases`, `weakDimensions`, and `baselineMetrics` MUST NOT be left as floating free-form scenario fields with no derivation rule.

They MUST be populated by one of the following explicit sources, in order:
1. parser-normalized `canonicalRunEvidence.extractedOutputs`,
2. repo-context extraction from the buyer repo,
3. scenario scaffolding fields explicitly marked as seed expectations,
4. deterministic synthesis logic documented in measurement provenance.

If a required field cannot be populated, ENGI MUST either:
- fail closed before ranking, or
- record the field as intentionally synthesized with explicit provenance and confidence, depending on the field’s failure policy.

### 9.3.2 Seeded-scenario normalization

A local prototype MAY store seeded fields as `expectedTask`, `expectedFailureModes`, `expectedConstraints`, or similar pre-normalization names.

If so, the need-measurement layer MUST normalize them into canonical descriptor fields before any downstream ranking or artifact generation.

The canonical descriptor MUST never expose unresolved seed-only names as if they were final schema.

## 9.4 Source material binding

```ts
type SourceMaterialBinding = {
  mode: 'read-only-mounted-copy' | 'inline-excerpt' | 'reference-only'
  confidentiality: 'private-required'
  mutableInBranch: boolean
  materializationRoot: string
}
```

Rules:
- `confidentiality` MUST default to `private-required` for selected source material.
- `mutableInBranch = false` means the branch materializes source material as mounted or copied evidence, not as editable buyer repo code.
- `mode` governs how materialization occurs but MUST NOT expand disclosure rights.

## 9.5 Candidate asset

```ts
type CandidateAsset = {
  assetId: string
  depositedAt: string
  title: string
  artifactKind: string
  sourceMaterialBinding: SourceMaterialBinding
  contentRoot: string
  contentUnits: ContentUnit[]
  attestations: Attestation[]
  provenanceBinding: ProvenanceBinding
  verificationEvidence: VerificationEvidence
  metadata: AssetMetadata
  assetMeasurement: AssetMeasurement
  measurementProvenance: MeasurementTrace[]
}
```

### 9.5.1 Candidate asset invariants

A candidate asset MUST satisfy:
- `assetId` stable for identical canonicalized deposited content + issuer inputs,
- `contentRoot` derived from content-unit hashes or equivalent canonical content closure,
- each `contentUnit.assetId === assetId`,
- at least one attestation record or an explicit prototype-only placeholder attestation,
- provenance binding consistent with metadata where both exist,
- measurement provenance non-empty.

### 9.5.2 Metadata classification rule

Asset metadata MAY contain private content in local prototype state, but production implementations MUST treat any raw private payload as private data and MUST NOT expose it in public projections.

## 9.6 Content unit

```ts
type ContentUnit = {
  unitId: string
  assetId: string
  unitKind: 'code-block' | 'config-block' | 'proof-block' | 'test-block' | 'text'
  text: string
  extracted: {
    symbols: string[]
    paths: string[]
    configKeys: string[]
    stackTags: string[]
    constraints: string[]
  }
  embeddings?: {
    taskVector?: number[]
    failureModeVector?: number[]
    technicalContextVector?: number[]
  }
  unitHash: string
}
```

### 9.6.1 Unit extraction rule

The parser that derives content units MUST be deterministic for a given asset version.

The current prototype uses paragraph/block splitting plus heuristic unit typing. That is acceptable under Profile A, but production implementations MUST document their segmentation rule and preserve stable unit IDs or unit-addressable remapping artifacts.

## 9.7 Attestation

```ts
type Attestation = {
  attestationId: string
  signerAddress: string
  signatureChecksPass: boolean
  payloadHash: string
  signedPayloadHashMatchesContentRoot: boolean
  cosignSatisfied: boolean
  attestationHash: string
}
```

## 9.8 Provenance binding

```ts
type ProvenanceBinding = {
  sourceProvider: 'github'
  repo: string
  commit: string
  paths: string[]
  workflowPath: string
  workflowRunId: string
}
```

## 9.9 Verification evidence

```ts
type VerificationEvidence = {
  testsPassed: boolean
  typecheckPassed: boolean
  staticAnalysisPassed: boolean
  benchmarkRan: boolean
  benchmarkRunId?: string
  reproSteps: string[]
  pinnedEnvironment?: string
  proofLogs: string[]
}
```

## 9.10 Measurement provenance

```ts
type MeasurementTrace = {
  mode: 'static' | 'inferred' | 'hybrid'
  toolOrPromptId: string
  version: string
  evidenceRefs: string[]
}
```

Every materially important measured output MUST carry non-empty measurement provenance.

---

# 10. Need measurement

## 10.1 Objective

Need measurement MUST convert GitHub-bound benchmark evidence and repo context into a closed `GitHubNeedDescriptor` suitable for recall, ranking, verification, branch materialization, and settlement.

## 10.2 Inputs

Required inputs:
- buyer repo identifier,
- buyer installation/principal binding,
- buyer branch/base ref,
- target ref,
- PR number or equivalent need-event handle,
- benchmark harness path,
- benchmark workflow path,
- canonical GitHub run evidence,
- parser-normalized benchmark outputs.

Optional inputs:
- human prompt,
- scenario seed expectations,
- repo extraction hints,
- operator notes.

Optional inputs MUST NOT override parser-bound evidence silently.

## 10.3 Process

### Step 1 — validate parser contract

ENGI MUST verify that parser output contains:
- `parserKind`,
- `parserVersion`,
- `failingCases`,
- `weakDimensions`,
- `baselineMetrics`.

If any required parser field is missing or malformed, ENGI MUST fail closed before descriptor materialization.

### Step 2 — ingest repo context

ENGI MUST ingest repo-derived context including, where available:
- touched paths,
- stack hints,
- symbols,
- config keys,
- benchmark harness target.

### Step 3 — synthesize canonical descriptor

ENGI MUST derive the canonical descriptor fields using the hierarchy in §9.3.1.

### Step 4 — record provenance

The descriptor MUST carry measurement provenance for:
- benchmark ingestion,
- parser normalization,
- any synthesized fields not copied directly from parser outputs.

## 10.4 Failure contract

Need measurement MUST fail closed if:
- no canonical run evidence exists,
- parser kind/version is missing,
- canonical outputs are absent,
- repo binding and benchmark binding disagree materially,
- the descriptor cannot satisfy minimum required fields.

The prototype MAY emit a parser error artifact instead of a live branch, but MUST NOT proceed into ranking/settlement on malformed inputs.

---

# 11. Candidate recall

## 11.1 Objective

Candidate recall MUST produce a deterministic candidate set for evaluation, not a hidden ad hoc shortlist.

## 11.2 Recall channels

A conforming implementation SHOULD support multiple recall channels. The current prototype models:
- semantic task search,
- failure-mode search,
- technical-context search,
- lexical search,
- symbol search,
- path search,
- config-key search,
- artifact-kind filtered search.

## 11.3 Recall budgets

The current prototype uses fixed budgets per channel and a recall-fusion object.

Those exact numeric budgets are prototype-specific, but V7 requires:
- per-channel budget declaration,
- deterministic recall union,
- explicit fusion/explanation state,
- stable ordering or tie-break behavior.

## 11.4 Recall union invariant

Every asset that reaches ranking MUST have a recorded recall reason or recall-fusion trace.

Assets not recalled MUST NOT be silently ranked.

---

# 12. Ranking model

## 12.1 Overview

Final candidate ranking MUST be computed from:
- need match,
- benchmark impact likelihood,
- actionability,
- explicit penalties.

Verification determinisms MUST remain separate.

## 12.2 Need match

Need match MUST capture at least:
- task semantic fit,
- failure-mode fit,
- symbol fit,
- path fit,
- stack fit,
- constraint fit,
- artifact-kind fit,
- lexical support.

The current prototype combines deterministic overlap and vectorized stand-ins. Production implementations MAY use stronger evaluators, including LLM-based evaluators, if they preserve replayable evaluator envelopes and evidence references.

## 12.3 Benchmark impact likelihood

Benchmark impact likelihood MUST capture at least:
- likely improvement to failing cases,
- likely improvement to weak dimensions,
- likely generalization to repo context.

## 12.4 Actionability

Actionability MUST capture at least:
- remediation specificity,
- implementation specificity,
- operational usability.

## 12.5 Penalties

Penalty objects MUST be explicit, not implicit score reductions.

Penalty families SHOULD include, where applicable:
- insufficient verification support,
- low path specificity,
- low implementation specificity,
- weak benchmark linkage,
- mismatch between artifact kind and need target.

## 12.6 Final ranking score

A final ranking score MUST:
- be independently explainable,
- preserve component subscore visibility,
- record applied penalties,
- be stable under deterministic rerun for identical inputs.

The exact weights MAY vary by implementation profile, but the implementation MUST publish them or encode them in the evaluator/provenance version.

## 12.7 Whole-asset need score

If an implementation emits a separate whole-asset need score, that score MUST be distinguished from final ranking score and MUST NOT be used as a silent substitute for final rank ordering.

---

# 13. Verification determinisms and use tiers

## 13.1 Overview

V7 keeps the V6 split but tightens the semantics.

Required verification families:
- issuance verification,
- provenance verification,
- verification sufficiency,
- issuer policy status.

## 13.2 Issuance verification

Issuance verification MUST evaluate at least:
- presence of signer binding,
- signature check pass/fail,
- signed payload hash match against content root,
- required cosign satisfaction.

If any hard issuance check fails, candidate use tier MUST be `reject`.

## 13.3 Provenance verification

Provenance verification MUST evaluate at least:
- `sourceProvider === 'github'`,
- buyer repo binding matches,
- commit binding present,
- path binding present,
- workflow path present,
- workflow run verifiable against the need event,
- metadata/provenance coherence.

Hard provenance failure MUST yield `reject`.

## 13.4 Verification sufficiency

Verification sufficiency MUST be a distinct decision family from issuance/provenance.

It MUST evaluate at least:
- test evidence,
- typecheck evidence,
- static analysis evidence,
- benchmark evidence,
- benchmark run binding,
- repro steps,
- pinned environment.

It MUST produce:
- a numeric score or equivalent structured sufficiency output,
- a recommended use tier,
- reasons.

Normative threshold semantics:
- insufficient evidence MAY still allow `rank-only`,
- moderate evidence MAY allow `context-only`,
- sufficiently strong evidence MAY allow `patch-eligible`.

## 13.5 Issuer policy status

Issuer policy status MUST be evaluated independently from raw attestation validity.

Status domain MUST include at least:
- `allowed`,
- `restricted`,
- `revoked`,
- `unknown`.

Semantics:
- `revoked` => `reject`,
- `restricted` MUST block settlement-grade upgrade,
- `unknown` SHOULD default to no settlement-grade upgrade,
- `allowed` MAY permit settlement-grade upgrade if other checks pass.

## 13.6 Use-tier derivation

The minimum derivation logic is:
1. hard issuance/provenance/policy rejection => `reject`,
2. insufficient verification sufficiency => `rank-only` or `context-only`,
3. sufficient verification sufficiency => `patch-eligible`,
4. patch-eligible + allowed issuer + no hard failures => MAY upgrade to `settlement-eligible`.

## 13.7 Use-tier propagation rules

V7 tightens downstream semantics:
- `reject`: candidate MUST NOT appear in selected asset pack.
- `rank-only`: candidate MAY appear in reports, MUST NOT materialize into branch source material, MUST NOT settle.
- `context-only`: candidate MAY materialize only in `context` branch mode and MUST NOT settle.
- `patch-eligible`: candidate MAY materialize in `patch` branch mode but MUST NOT settle unless upgraded.
- `settlement-eligible`: candidate MAY materialize and MAY participate in settlement.

---

# 14. Asset pack assembly

## 14.1 Objective

Asset pack assembly MUST lock the exact selected assets and units for one need event.

## 14.2 Asset pack type

```ts
type AssetPack = {
  assetPackId: string
  needId: string
  selectedAssets: string[]
  selectedUnits: string[]
  lockedContentRoots: string[]
  lockedAttestationHashes: string[]
  estimatedBundleScore: number
  branchMode: 'context' | 'patch'
}
```

## 14.3 Selection rules

- Only candidates whose use tiers are allowed by `branchMode` MAY enter the asset pack.
- `context` mode MAY include `context-only`, `patch-eligible`, and `settlement-eligible`.
- `patch` mode MAY include only `patch-eligible` and `settlement-eligible`.
- Selected asset IDs, unit IDs, content roots, and attestation hashes MUST be locked before branch artifacts and settlement are finalized.

## 14.4 Prototype-specific note

The current prototype selects the top three allowed candidates and up to two units per candidate. That is an `implemented-now` behavior, not a universal production limit.

Production implementations MAY vary the selection count, but MUST make those limits explicit.

## 14.5 Cohesion requirement

Asset packs SHOULD maximize bundle coherence relative to the measured need.

A production implementation SHOULD consider:
- coverage of failure modes,
- coverage of constraints,
- coverage of touched paths,
- overlap with target artifact kinds,
- redundancy penalties.

---

# 15. Branch modes and branch artifact contracts

## 15.1 Branch modes

V7 keeps two branch modes.

### Context branch
A context branch is for inspectable contextual materialization only.

It MAY include `context-only` assets but MUST NOT settle them.

### Patch branch
A patch branch is the default buyer-facing remediation branch mode.

It MUST exclude `context-only` assets from source-material materialization.

## 15.2 Required branch artifacts

A remediation branch MUST contain at least:
- `.engi/need.json`
- `.engi/match-report.json`
- `.engi/verification-report.json`
- `.engi/eval-manifest.json`
- `.engi/asset-pack.lock.json`
- `.engi/settlement-preview.json`
- `.engi/system-proof-bundle.json`
- `ENGI_NEED.md`

V7 elevates several prototype artifacts from implicit to normative when identity/confidentiality/settlement modeling is in scope:
- `.engi/authorization-decisions.json`
- `.engi/sensitive-data-flow.json`
- `.engi/policy-release.json`

Selected source material MUST materialize under:
- `.engi/source-material/`

## 15.3 Branch artifact semantics

### `.engi/need.json`
Must contain the canonical `GitHubNeedDescriptor` actually used for ranking and settlement.

### `.engi/match-report.json`
Must summarize selected vs rejected assets, with reasons.

This artifact MAY be classed as bounded-public-proof metadata, but its content MUST still respect disclosure policy.

### `.engi/verification-report.json`
Must include the verification-family outputs and final use tier for every evaluated candidate.

### `.engi/eval-manifest.json`
Must declare evaluator families, deterministic feature versions, model IDs if any, and measurement provenance references.

### `.engi/asset-pack.lock.json`
Must lock selected asset IDs, content roots, attestation hashes, and selected unit hashes/IDs.

### `.engi/settlement-preview.json`
Must contain only preview-safe settlement data. It MUST NOT be mistaken for the final journal diff.

### `.engi/system-proof-bundle.json`
Must contain the cross-cutting proof objects described in §19.

### `.engi/authorization-decisions.json`
Must record which principals were allowed or denied which actions on which resources under which policy refs.

### `.engi/sensitive-data-flow.json`
Must classify movement of repo-private source, licensed source material, branch-derived artifacts, settlement preview artifacts, and bounded-public proof metadata.

### `.engi/policy-release.json`
Must define disclosure defaults, retention assignments, and revocation behavior for this branch event.

### `ENGI_NEED.md`
Must provide a human-readable branch briefing synchronized to the canonical artifacts.

## 15.4 Source-material materialization contract

For every materialized selected asset:
- the materialized file path MUST be derivable from its source-material binding,
- the file MUST identify `assetId`, `artifactKind`, `useTier`, and `contentRoot`,
- materialized units MUST be bound to locked unit IDs/hashes,
- source-material materialization MUST respect branch mode and use tier.

## 15.5 Confidentiality default

Remediation branch confidentiality MUST default to `private-required`.

A branch artifact MAY be publicly projectable only if:
- it is explicitly classed as bounded-public metadata,
- disclosure policy allows it,
- no licensed/private source material can be reconstructed from it.

---

# 16. Identity, authorization, confidentiality, retention

## 16.1 Sensitive data classes

V7 fixes the sensitive-data classes discovered in the prototype as normative classes:
- `repo-private-source`
- `licensed-source-material`
- `private-branch-derived-artifact`
- `verification-evidence`
- `settlement-preview`
- `private-proof-artifact`
- `bounded-public-proof-metadata`

Every branch artifact and every cross-surface flow MUST be classifiable under one of these or another explicitly declared class.

## 16.2 Authorization model

Every state-changing or disclosure-relevant action MUST be attributable to a principal and a policy reference.

Minimum principals:
- buyer principal,
- ENGI branch materializer,
- ENGI settlement engine,
- ENGI proof publisher,
- issuer principal or issuer-bound attestation identity.

## 16.3 Minimum authorization records

For a settled need event, ENGI MUST be able to show decisions for at least:
- read private remediation branch,
- materialize selected source material,
- settle journal event,
- derive bounded-public proof metadata if used.

## 16.4 Retention and revocation

V7 turns previously loose prose into minimum contracts.

Private artifacts SHOULD carry a short-lived retention policy, and bounded-public proof metadata MAY carry a longer retention window.

At minimum, the policy release MUST specify:
- retention policy IDs,
- applicable artifact sets,
- time-to-live or equivalent retention semantics,
- cleanup action,
- revocation rules.

Revocation semantics MUST state whether issuer revocation:
- blocks new settlement,
- blocks new delivery,
- affects already issued artifacts,
- preserves only hash-addressable historical references.

## 16.5 Prototype boundary

The current demo models authorization, disclosure, retention, and revocation as structured artifacts only. Production implementations MUST enforce them in actual storage, branch, log, and API surfaces.

---

# 17. Asset shares and settlement

## 17.1 Share classes

ENGI MUST distinguish:
- raw shares,
- settled shares,
- micro-unit allocations.

## 17.2 Eligibility rule

Only `settlement-eligible` assets MAY participate in settlement.

The set of selected assets MAY be larger than the set of settlement-participating assets.

## 17.3 Raw shares

Raw shares MUST be normalized to 10,000 basis points across settlement-participating assets.

A system MAY use marginal contribution, Shapley approximation, or another explicit contribution method, but the method MUST be deterministic per event and encoded in settlement proof or measurement provenance.

The current prototype uses a leave-one-out marginal bundle contribution heuristic and normalizes to exactly 10,000 bp.

## 17.4 Settled shares

In default v1 mode, settled shares SHOULD equal raw shares unless a declared settlement-adjustment policy applies.

If adjustments occur, the system MUST emit:
- `rawShareBp`,
- `settledShareBp`,
- explicit adjustment reasons.

## 17.5 Exact micro-unit allocation

Given a total metered value event in micro-units:
- allocation MUST be exact,
- floor division + remainder distribution or equivalent exact fixed-point logic MUST be used,
- the stable tie-break order MUST be declared,
- total allocated micro-units MUST equal the debited total.

The current prototype uses:
- a fixed metered event size of `100000000` micro-units,
- remainder ordering by larger remainder, then larger share bp, then lexicographic `assetId`.

Those exact numbers are prototype-specific, but the invariants are normative.

## 17.6 Accounting model

Default account namespace semantics:
- buyer license pool: `buyer:<buyerId>:license_pool`
- supplier pending claims: `supplier:<assetId>:pending_claims`

A settlement event MUST at minimum:
- debit the buyer license pool,
- credit settlement-participating supplier pending-claims accounts,
- preserve debit/credit conservation.

## 17.7 Journal diff type

```ts
type JournalDiff = {
  eventId: string
  needId: string
  bundleId: string
  beforeRoot: string
  afterRoot: string
  debits: JournalEntry[]
  credits: JournalEntry[]
  beforeBalances: Record<string, string>
  afterBalances: Record<string, string>
  rawShares: { assetId: string, shareBp: number, reasons: string[] }[]
  settledShares: { assetId: string, rawShareBp: number, settledShareBp: number, settlementAdjustmentReasons: string[] }[]
  invariants: {
    debitsEqualCredits: boolean
    noNegativeBalances: boolean
    rawSharesNormalized: boolean
    settledSharesNormalized: boolean
    receiptChainValid: boolean
    refsClosed: boolean
    settledEqualsRaw?: boolean
  }
  totals: {
    debited: string
    credited: string
    difference: string
  }
}
```

## 17.8 Required invariants

A conforming settlement MUST prove at least:
- debits equal credits,
- no negative balances after transition,
- raw shares normalize to 10,000 bp,
- settled shares normalize to 10,000 bp,
- references close over selected assets / receipts / event IDs,
- before and after roots are well-formed and correspond to the committed states.

## 17.9 Failure contract

Settlement MUST fail closed if:
- there are no settlement-eligible assets,
- buyer license pool is insufficient,
- micro-unit allocation does not conserve total,
- reference closure fails,
- any invariant fails.

The system MUST NOT emit a successful settled lifecycle state when settlement invariants fail.

---

# 18. Proof model

## 18.1 System proof bundle

The system proof bundle MUST bind together the cross-cutting proofs needed for inspectability and audit.

Minimum proof surfaces:
- asset measurement proofs,
- selection consistency proof,
- journal completeness proof,
- identity and authorization proof,
- sensitive data flow proof,
- settlement proof.

## 18.2 Asset measurement proofs

Each selected asset SHOULD have a proof object showing:
- asset ID,
- content root,
- referenced unit IDs,
- measurement traceability to units,
- measurement replayability,
- measurement policy satisfaction.

## 18.3 Selection consistency proof

Selection consistency proof MUST show at least:
- all selected assets respect branch-mode tier rules,
- all materialized assets respect visibility rules,
- settlement consumes only settlement-eligible assets.

## 18.4 Journal completeness proof

Journal completeness proof MUST establish at least:
- every journal entry has a reason and explanation,
- all entries reference the same event ID,
- no unclassified transfer reason is present,
- the journal is replayable.

## 18.5 Identity and authorization proof

Identity and authorization proof MUST establish at least:
- all access is bound to known principals,
- all state-changing actions are authorized,
- issuer identity is bound,
- buyer delivery principals are bound.

## 18.6 Sensitive data flow proof

Sensitive data flow proof MUST establish at least:
- all private artifacts are classified,
- all flows are recorded,
- no unauthorized public disclosure occurs,
- retention and revocation policies are assigned.

## 18.7 Settlement proof

Settlement proof MUST establish at least:
- share normalization,
- debit/credit conservation,
- no negative balances,
- reference closure,
- state-root integrity,
- binding to the locked asset pack.

The settlement proof MUST include:
- `beforeRoot`,
- `afterRoot`,
- journal hash,
- asset-pack lock hash.

---

# 19. Reports and manifests

## 19.1 Match report

The match report MUST contain:
- `needId`,
- selected assets with scores and reasons,
- rejected assets with rejection reasons.

## 19.2 Verification report

The verification report MUST contain:
- all verification-family outputs per evaluated asset,
- final use tier per asset.

## 19.3 Eval manifest

The eval manifest MUST contain:
- `needId`,
- `benchmarkRunId`,
- deterministic feature version,
- model IDs used, if any,
- evaluator family list,
- measurement provenance references.

## 19.4 Asset pack lock

The asset pack lock MUST contain:
- asset pack ID,
- need ID,
- selected assets with content roots and attestation hashes,
- selected units with unit IDs and unit hashes.

## 19.5 Settlement preview

The settlement preview MUST be preview-safe and MUST at minimum contain:
- `needId`,
- `bundleId`,
- raw shares,
- settled shares,
- total metered micro-units.

It MUST NOT be treated as the final ledger proof.

---

# 20. Failure contracts and persistence rules

## 20.1 Parser failure

Malformed or missing canonical benchmark outputs MUST prevent need materialization.

## 20.2 Ranking failure

If ranking subscores or measurement traces are missing for an evaluated candidate, the system MUST fail closed in debug/development mode and SHOULD fail closed in production unless the missing component is explicitly optional and non-safety-critical.

## 20.3 Verification failure

Hard issuance, provenance, or revoked-policy failures MUST map to `reject`.

## 20.4 Branch generation failure

If required artifacts cannot be generated consistently with the locked asset pack, the system MUST NOT emit a settled branch event.

## 20.5 Persistence atomicity

Source/spec parity work exposed that persistence semantics matter.

When ENGI persists state or branch-generation results:
- writes SHOULD be atomic,
- interrupted writes MUST NOT leave corrupted persistent state,
- a failed write MUST NOT partially commit a settlement state.

The current prototype already tests this for local JSON state persistence. Production implementations MUST preserve the same all-or-nothing semantics across their storage layers.

## 20.6 Public projection safety

Public state or bounded-public proof projections MUST NOT leak:
- raw private content,
- licensed source material,
- private proof artifacts,
- settlement-preview internals beyond the allowed disclosure class.

---

# 21. Telemetry and debugging

## 21.1 Telemetry requirement

Ranking, verification, asset-pack assembly, branch generation, and settlement SHOULD emit enough telemetry to support replay and failure diagnosis.

## 21.2 Debug fail-hard rule

In development/debug mode, the implementation SHOULD fail hard on:
- out-of-range score values,
- missing telemetry traces for required measured outputs,
- malformed canonicalized JSON / hash derivation dependencies,
- missing required branch artifacts,
- invariant violations.

## 21.3 Explainability requirement

For each evaluated candidate the system SHOULD expose:
- strongest ranking signals,
- penalties applied,
- recall-fusion explanation,
- verification-family reasons,
- final use tier.

---

# 22. V7 ambiguity resolutions relative to V6

This section is normative where it tightens previously ambiguous V6 behavior.

## 22.1 Need-descriptor closure is now mandatory

V6 left some need fields effectively implied. V7 requires explicit derivation for all descriptor fields and forbids unresolved seed-only naming from leaking downstream.

## 22.2 Branch artifact set is now stricter

V6 centered the core `.engi/*` set. V7 explicitly includes authorization decisions, sensitive-data-flow records, and policy release artifacts when confidentiality/identity/settlement modeling is claimed.

## 22.3 Use-tier rights are now fully separated

V6 described use tiers, but V7 makes branch-materialization rights and settlement rights more explicit, especially for `rank-only` and `context-only` candidates.

## 22.4 Confidentiality classes are now operationally bound

V6 described confidentiality classes. V7 requires every artifact and flow to be classifiable and policy-linked.

## 22.5 Settlement proof requires asset-pack lock binding

V6 described settlement proof generally. V7 requires explicit binding from settlement proof to the asset-pack lock hash.

## 22.6 Persistence atomicity is part of correctness

V6 emphasized accounting and proof. V7 explicitly treats failed-write rollback / non-corruption semantics as part of implementation correctness.

## 22.7 Prototype-vs-production distinction is now first-class

V6 often blended local demo behavior with production intent. V7 splits them into explicit conformance profiles.

---

# 23. Implementation order recommendation

1. parser normalization and need-descriptor closure
2. candidate-asset and content-unit normalization
3. ranking + explanation
4. verification + use-tier propagation
5. asset-pack lock
6. branch-artifact generation
7. authorization / data-flow / policy-release artifacts
8. settlement preview + journal diff
9. proof bundle
10. real GitHub, authz, and storage enforcement

---

# 24. Final locked decisions for V7

1. GitHub + GitHub Actions remain the only trusted external integration boundary for v1.
2. Need measurement MUST fail closed on parser failure.
3. Ranking and verification remain separate.
4. Use tier is the only normative bridge from verification to branch/settlement rights.
5. Branch materialization defaults to private-required confidentiality.
6. Settlement consumes settlement-eligible assets only.
7. Journal diff invariants are mandatory.
8. Authorization, sensitive-data-flow, and policy-release artifacts are part of the normative branch/proof surface when those concerns are claimed.
9. Prototype-only behavior MUST be labeled and MUST NOT silently redefine production intent.
10. Source/spec parity gaps discovered in implementation are normative input for future spec tightening.

---

# APPENDIX A — Prototype-faithful notes

This appendix captures exact behaviors present in the current `engi-demo` that V7 treats as source-faithful Profile A behavior.

## A.1 Implemented-now behaviors

- deterministic `assetId`, `contentRoot`, `unitHash`, and canonical JSON hashing,
- paragraph/block splitting into content units,
- heuristic unit typing (`code-block`, `config-block`, `proof-block`, `test-block`, `text`),
- deterministic tokenization and small-vector stand-ins for retrieval/ranking,
- separate ranking and verification outputs,
- tier upgrade from `patch-eligible` to `settlement-eligible` only when issuer policy is `allowed` and hard checks pass,
- branch artifacts emitted under `.engi/*`,
- journal diff with exact micro-unit allocation,
- modeled authorization decisions, sensitive-data-flow records, policy release, and proof bundle,
- atomic persisted-state writes with failure tests.

## A.2 Prototype-only modeled boundaries

- mocked GitHub evidence rather than live API fetches,
- no real git branch creation,
- no real authz enforcement,
- no real retention execution,
- no live bounded-public proof publishing,
- no live LLM evaluator calls.

## A.3 Prototype debt exposed by source/spec parity

The current demo source shows that seeded scenario fields such as `expectedTask` and parser-normalized fields must be explicitly normalized into canonical `need` fields. V7 resolves this spec gap; the implementation should follow.

---

# APPENDIX B — Minimal pseudocode

## B.1 Need descriptor normalization

```ts
function buildNeedDescriptor(input): GitHubNeedDescriptor {
  assert(input.canonicalRunEvidence)
  assert(input.canonicalRunEvidence.extractedOutputs)
  assert(input.canonicalRunEvidence.extractedOutputs.parserKind)
  assert(input.canonicalRunEvidence.extractedOutputs.parserVersion)

  const outputs = input.canonicalRunEvidence.extractedOutputs
  const repoContext = input.repoContext || {}

  const task = input.task
    ?? input.expectedTask
    ?? synthesizeTask(outputs, repoContext)

  const failureModes = input.failureModes
    ?? input.expectedFailureModes
    ?? synthesizeFailureModes(outputs, repoContext)

  const constraints = input.constraints
    ?? input.expectedConstraints
    ?? synthesizeConstraints(outputs, repoContext)

  return canonicalDescriptor(...)
}
```

## B.2 Use-tier derivation

```ts
function deriveUseTier(verification): UseTier {
  if (hardIssuanceReject(verification.issuanceVerification)) return 'reject'
  if (hardProvenanceReject(verification.provenanceVerification)) return 'reject'
  if (verification.issuerPolicyStatus.status === 'revoked') return 'reject'

  const base = verification.verificationSufficiency.recommendedUseTier
  if (base === 'insufficient-for-use') return 'rank-only'
  if (base === 'context-only') return 'context-only'

  if (verification.issuerPolicyStatus.status === 'allowed') return 'settlement-eligible'
  return 'patch-eligible'
}
```

## B.3 Settlement

```ts
function settleNeedEvent(state, selectedCandidates): JournalDiff {
  const settlementCandidates = selectedCandidates.filter(c => c.useTier === 'settlement-eligible')
  assert(settlementCandidates.length > 0)

  const rawShares = normalizeTo10000(computeContributionMasses(settlementCandidates))
  const settledShares = rawShares.map(share => ({ ...share, settledShareBp: share.shareBp }))
  const allocations = allocateExactMicroUnits(totalMicroUnits, settledShares)
  const journal = buildJournalDiff(beforeBalances, allocations)

  assert(journal.invariants.debitsEqualCredits)
  assert(journal.invariants.rawSharesNormalized)
  assert(journal.invariants.settledSharesNormalized)
  assert(journal.invariants.noNegativeBalances)
  assert(journal.invariants.refsClosed)

  return journal
}
```

---

# APPENDIX C — Canonical artifact confidentiality defaults

| Artifact | Default class | Publicly disclosable by default? |
|---|---|---|
| `.engi/source-material/*` | `licensed-source-material` | no |
| `.engi/settlement-preview.json` | `settlement-preview` | no |
| `.engi/system-proof-bundle.json` | `private-proof-artifact` | no |
| `.engi/authorization-decisions.json` | `private-proof-artifact` unless redacted projection exists | no |
| `.engi/sensitive-data-flow.json` | mixed; default private | no |
| `.engi/policy-release.json` | policy metadata; disclose only if allowed | not by default |
| `.engi/match-report.json` | bounded-public-proof-metadata only if redacted accordingly | not automatically |
| `ENGI_NEED.md` | `private-branch-derived-artifact` | no |

---

# APPENDIX D — What V7 is faithful to

- Faithful to the current prototype for deterministic asset structure, ranking/verification separation, use tiers, branch artifact shape, journal diff, and proof-bundle modeling.
- Faithful to production intent for live GitHub binding, actual branch creation, real authz/privacy enforcement, retention execution, and optional LLM-based evaluator substitution.
- Explicitly dual-profile where the prototype models the control plane correctly but not yet the external system boundary.
