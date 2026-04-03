# ENGI V1 SPEC

Status: frozen full draft snapshot
Scope: ENGI v1
Constraint: GitHub-only trusted integration
Canonical path: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC.txt`
Snapshot: V5

---

# 1. Executive summary

ENGI v1 is a GitHub-native system for:

1. measuring a buyer's engineering need from GitHub repository state and GitHub Actions benchmark / test / CI evidence,
2. recalling and ranking deposited technical content by expected contribution to resolving that need,
3. applying explicit verification determinisms that decide whether candidate content is eligible for contextual use, branch inclusion, and settlement participation,
4. assembling a need-matched asset pack,
5. creating an inspectable GitHub remediation branch that contains the selected source material artifacts or canonical mounted copies, manifests, measurement context, and settlement preview,
6. computing contribution-based asset shares,
7. settling value movement under exact fixed-point accounting with a structured journal diff and formal invariants.

ENGI v1 is not:
- a generic multi-provider CI integration system,
- a vague trust marketplace,
- a social reputation system,
- a one-vector retrieval demo,
- an auto-merge coding agent,
- a generic "upload some docs and ask questions" product.

The core ENGI v1 solve is:

> Measure where a technical AI company's product underperforms on engineering-relevant benchmark slices, match the right engineering intelligence supply to that need, create an inspectable remediation branch containing the selected source material plus the accounting context, and produce exact attribution and settlement around the resulting value movement.

---

# 2. Normative language

The terms MUST, SHOULD, MAY, and MUST NOT are normative.

---

# 3. Product goals and non-goals

## 3.1 Goals

ENGI v1 MUST:
- ingest a buyer engineering need from GitHub repo + GitHub Actions evidence,
- rank deposited technical content by expected contribution to resolving that need,
- apply verification determinisms that decide eligibility for contextual use, branch use, and settlement use,
- create a working buyer-facing GitHub remediation branch,
- compute explainable asset shares for a specific need-resolution event,
- prove settlement via a journaled before/after diff and explicit invariants.

## 3.2 Non-goals

ENGI v1 MUST NOT require:
- non-GitHub repo providers,
- non-GitHub CI providers,
- social reputation as the main gating signal,
- opaque attribution,
- hidden economic logic,
- generalized provider abstraction,
- UI/demo-specific utility-observation logic.

## Review annotation
- Biggest deliberate lock: GitHub only.
- Utility observation is intentionally excluded from the core spec for now.

---

# 4. Design principles

1. **Need match dominates.**  
   The first question is: does this content help solve this engineering need?

2. **Ranking and verification determinisms are different.**  
   Usefulness is not the same thing as cryptographic issuance, provenance binding, or evidence sufficiency.

3. **Benchmark linkage is first-class.**  
   Need measurement SHOULD be benchmark/repo-derived, not prompt-only.

4. **GitHub workflow specificity without provider abstraction.**  
   `buildSystem = 'github-actions'` is fixed for v1. Different benchmark/test/CI outputs are handled by GitHub-Action-specific parsers, not generic provider abstractions.

5. **Branches are the buyer UX.**  
   The concrete buyer action is: create an `ENGI-...` branch and open a PR; ENGI branches from that branch and later PRs back into it.

6. **Private delivery precedes public proof.**  
   Licensed source material, private remediation branches, settlement previews, and derived artifacts MUST remain private/access-controlled unless and until the spec explicitly permits bounded disclosure.

7. **Identity and authorization are first-class.**  
   Every principal that deposits, reads, materializes, settles, or receives delivery MUST be explicitly bound to an identity and an authorization rule.

8. **Settlement is a state-transition proof.**  
   It is not merely arithmetic equality.

9. **Inspectability beats mystique.**  
   Every important score, gate, branch proposal, settlement transition, and identity/authorization decision SHOULD be explainable.

10. **Reliability before polish.**  
   Ranking, benchmark impact, actionability, penalties, issuance, and distribution logic MUST emit high telemetry and SHOULD fail hard during v1 implementation until behavior is reliably correct.

## Review annotation
- This section locks the core implementation posture: need-first ranking, private delivery before bounded public proof, and fail-hard debugging until the system is reliable.

---

# 5. Trusted integration boundary

## 5.1 Overview

**Responsibility:** define the exact external systems ENGI v1 trusts and the exact GitHub UX by which a buyer states a need.

**Inputs:** GitHub repository state, GitHub Actions runs, GitHub PR state, buyer-created `ENGI-...` branch/PR.

**Outputs:** canonical GitHub-bound source context for need measurement, ranking, branching, and settlement.

**Hand-off:** outputs feed directly into need measurement.

## 5.2 Trusted surfaces

ENGI v1 trusts only these external surfaces:
- GitHub repositories
- GitHub commits, trees, branches, and pull requests
- GitHub Actions workflow definitions
- GitHub Actions workflow runs
- GitHub checks/statuses
- GitHub-authenticated ENGI app actions
- benchmark harness config stored in the repo
- benchmark / test / CI outputs emitted by GitHub Actions

## 5.3 Less-trusted / untrusted surfaces

ENGI v1 MUST treat the following as untrusted or only partially trusted unless independently bound:
- free-form human prompts,
- artifact text itself,
- signer display names,
- claimed results not attached to GitHub evidence,
- repo-external artifacts without provenance binding.

## 5.4 Build/input system lock

For v1:

```ts
buildSystem = 'github-actions'
sourceProvider = 'github'
```

Repository source is intentionally implied by `sourceProvider = 'github'`. The earlier duplication is removed.

## 5.5 GitHub Actions input flexibility without over-abstraction

ENGI v1 MUST NOT abstract over CI providers.
ENGI v1 MUST support multiple GitHub Actions output shapes by normalizing them into a canonical run-evidence object.

### Canonical run evidence

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

### Canonical benchmark outputs

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

### Important rule

Different repos MAY emit different GitHub Actions artifacts, but ENGI MUST parse them into `CanonicalBenchmarkOutputs` before continuing.

### Parser failure contract

If GitHub Actions evidence cannot be normalized into `CanonicalBenchmarkOutputs`, ENGI MUST stop before need measurement, ranking, branch generation, or settlement.

Every parser MUST declare:
- `parserKind`
- `parserVersion`
- the GitHub Actions artifact/check inputs it consumed

## 5.6 GitHub UX for stating a need

The precise GitHub UX is:
1. buyer creates an `ENGI-...` branch from the repo state they want help with,
2. buyer opens a PR from that branch,
3. GitHub Actions runs benchmark / test / CI workflows on that PR,
4. ENGI reads the repo state, PR state, and workflow outputs,
5. ENGI creates its own remediation branch from the buyer's `ENGI-...` branch,
6. ENGI later opens a PR back into the buyer's `ENGI-...` branch when the remediation branch is ready/settled.

### Naming guidance

Buyer branch SHOULD match:

```text
ENGI-<short-need-slug>
```

ENGI remediation branch SHOULD match:

```text
engi/remediation-<need-id>-<slug>
```

## 5.7 Private delivery boundary

### Default confidentiality rule

The ENGI remediation branch MUST be private/access-controlled before and through settlement.

The following MUST be private by default:
- the remediation branch itself,
- selected source material artifacts or canonical mounted copies,
- settlement preview artifacts,
- branch-local manifests that reveal licensed content structure beyond bounded metadata,
- GitHub Actions logs/artifacts on the remediation branch that would reveal licensed material.

### Authorized principals

Before settlement finalization, remediation-branch access MUST be restricted to:
- authorized buyer principals,
- ENGI system principals,
- explicitly authorized reviewers if policy permits.

### Public proof boundary

Public proof surfaces MUST expose only bounded metadata such as:
- hashes/roots,
- receipt identifiers,
- invariant results,
- schema/policy references,
- bounded allocation metadata if policy permits.

Bounded allocation metadata MAY include:
- aggregate settled totals,
- per-asset share basis points,
- asset/content hashes.

Bounded allocation metadata MUST NOT include:
- unit-level licensed payloads,
- private source-material bodies,
- unrestricted settlement-preview internals.

Public proof surfaces MUST NOT expose:
- full licensed source material,
- full remediation branch contents,
- full private settlement preview contents,
- branch-local artifacts containing licensed payloads.

## 5.8 Public vs private repository behavior

If the buyer repository or PR surface is public, ENGI MUST NOT materialize licensed source material directly into a public branch or public PR surface.

In that case, ENGI MUST use one of:
- a private buyer-authorized remediation branch surface,
- a private sibling repository or fork controlled by ENGI and the buyer,
- another private GitHub-controlled delivery surface explicitly authorized by policy.

If no private delivery surface exists, ENGI MUST stop before materializing licensed source material.

## Review annotation
- This section removes the earlier provider-duplication issue and makes the GitHub PR/branch UX explicit.
- It also states exactly how ENGI can remain GitHub-specific while flexibly handling different Actions outputs.
- It now explicitly defines the private-delivery boundary.

---

# 6. Terminology

## 6.1 Engineering need
A structured representation of a buyer's technical deficiency or target improvement.

## 6.2 Technical content
The general class of deposited artifacts, including:
- code
- patches
- runbooks
- config
- incident notes
- proofs
- design docs
- benchmark traces
- mixed technical material

See Appendix D for a real-world example of each type.

## 6.3 Content unit
The smallest extraction unit used for ranking and attribution:
- text chunk
- code block
- proof block
- config block
- test block
- mixed block

## 6.4 Attestation
Signer-bound identity/provenance metadata over deposited content or content snapshots.

## 6.5 Source material binding
A precise mechanism for how selected source material is materialized into the private remediation surface.

Source material binding MUST state whether content is:
- copied into the remediation branch,
- mounted as canonical read-only material,
- or otherwise materialized under a policy-approved private delivery mechanism.

## 6.6 Need match
The degree to which candidate content helps solve the buyer's engineering need.

## 6.7 Issuance verification
Whether the content was actually issued/deposited as claimed.

## 6.8 Provenance verification
Whether the content is tied to the GitHub context it claims.

## 6.9 Verification sufficiency
Whether enough evidence exists to rely on the content.

## 6.10 Issuer policy status
ENGI policy's current stance on the issuer class behind the content:
- allowed
- unknown
- restricted
- revoked

This is not social reputation.

## 6.11 Asset shares
Normalized contribution shares across assets for a specific need-resolution event.

## 6.12 Journal diff
A structured ledger transition proving exact value movement and invariant satisfaction.

## Review annotation
- “Validity” is intentionally removed as a higher-level label.
- We now use “verification determinisms” and exact subterms.

---

# 7. System overview

## 7.1 Overview

**Responsibility:** define the major subsystems and hand-off points.

**Inputs:** GitHub repo state, GitHub Actions run evidence, deposited technical content.

**Outputs:** remediation branch + journal diff.

**Hand-off:** each stage produces canonical objects for the next stage.

ENGI v1 SHALL process work in this order:

1. ingest GitHub repo + Actions evidence,
2. build need descriptor,
3. recall candidate technical content,
4. compute ranking signals,
5. apply verification determinisms,
6. assign candidate use tiers,
7. assemble asset pack,
8. create remediation branch,
9. compute asset shares,
10. settle value movement and emit journal diff.

## 7.2 SRP-style responsibility split

- **Need measurement** owns turning GitHub evidence into a `GitHubNeedDescriptor`.
- **Ranking** owns need-resolution measurement only.
- **Verification determinisms** own eligibility/gating only.
- **Asset pack assembly** owns selecting the final content set.
- **Branch generation** owns writing manifests and code/context changes into GitHub.
- **Share computation** owns contribution normalization.
- **Settlement** owns journal entries, exact accounting, and proofs.
- **Sensitive data flow** owns confidentiality classes, retention, cleanup, and visibility transitions.
- **Identity and authorization** own principal binding and permission decisions.
- **Reports and final deliverables** own the assembly of inspectable private artifacts and bounded-disclosure outputs.
- **System proofing** owns cross-cutting proof bundles that tie inference, measurement, selection, identity, data flow, and settlement together.

## Review annotation
- This section now explicitly states responsibilities and hand-off points.

---

# 8. Core data model

## 8.1 Overview

**Responsibility:** define the canonical objects shared across subsystems.

**Inputs:** GitHub source context, benchmark outputs, deposited content.

**Outputs:** stable typed objects for ranking, verification, branching, and settlement.

## 8.2 GitHub need descriptor

```ts
type ArtifactKind =
  | 'code'
  | 'patch'
  | 'runbook'
  | 'config'
  | 'incident-note'
  | 'proof'
  | 'design-doc'
  | 'benchmark-trace'
  | 'mixed'

type GitHubNeedDescriptor = {
  needId: string

  // GitHub scope
  repo: string                  // owner/repo
  installationId: string
  baseRef: string               // branch or commit SHA
  targetRef?: string
  prNumber?: number

  // GitHub Actions benchmark binding
  benchmarkHarnessPath: string
  benchmarkWorkflowPath?: string
  benchmarkRunId?: string
  benchmarkRunUrl?: string

  // Need measurement
  task: string
  failureModes: string[]
  constraints: string[]
  targetArtifactKinds: ArtifactKind[]
  stackHints: string[]

  // Repo-scoped targeting
  touchedPaths: string[]
  extractedSymbols: string[]
  configKeys: string[]

  // Benchmark evidence
  failingCases: string[]
  weakDimensions: string[]
  baselineMetrics: Record<string, number>

  // Optional human context
  humanPrompt?: string
}
```

## 8.3 Source material binding

```ts
type SourceMaterialBinding = {
  mode: 'branch-copy' | 'read-only-mounted-copy' | 'private-delivery-surface'
  confidentiality: 'private-required'
  mutableInBranch: boolean
  materializationRoot: string
}
```

## 8.4 Candidate asset

```ts
type SourceMaterialBinding = {
  mode: 'branch-copy' | 'read-only-mounted-copy' | 'private-delivery-surface'
  confidentiality: 'private-required'
  mutableInBranch: boolean
  materializationRoot: string
}

type CandidateAsset = {
  assetId: string
  depositedAt: string
  title: string
  artifactKind: ArtifactKind

  sourceMaterialBinding?: SourceMaterialBinding
  contentRoot: string
  contentUnits: ContentUnit[]

  attestations: Attestation[]
  provenanceBinding?: ProvenanceBinding
  verificationEvidence?: VerificationEvidence

  metadata: {
    sourceRepo?: string
    sourceCommit?: string
    sourcePaths?: string[]
    tags: string[]
    declaredStacks?: string[]
    declaredConstraints?: string[]
  }
}
```

## 8.5 Content unit

```ts
type ContentUnit = {
  unitId: string
  assetId: string
  unitKind: 'text' | 'code-block' | 'config-block' | 'proof-block' | 'test-block' | 'mixed'
  text: string

  embeddings: {
    taskVector?: number[]
    failureModeVector?: number[]
    technicalContextVector?: number[]
  }

  extracted: {
    symbols: string[]
    paths: string[]
    configKeys: string[]
    stackTags: string[]
    constraints: string[]
  }
}
```

## 8.6 Universal measurement provenance rule

Every measured value in ENGI v1 SHOULD have traceable provenance in debug/trace mode.

```ts
type MeasurementProvenance = {
  mode: 'static' | 'inferred' | 'hybrid'
  toolOrPromptId: string
  version: string
  evidenceRefs: string[]
}
```

Rules:
- static measurements MUST identify the tool/program used,
- inferred measurements MUST identify the prompt/model used,
- hybrid measurements MUST identify both the static inputs and the inference layer,
- all ranking components and verification determinisms SHOULD emit `MeasurementProvenance` in telemetry/debug mode.

### Universal inference contract

Every context-enriched prompted inference MUST declare:
- the static evidence refs it consumed,
- the need/candidate identifiers in scope,
- the prompt or evaluator id,
- the model id/version used,
- the output fields it is responsible for producing.

Prompted inference MUST NOT silently invent missing static evidence; it may only interpret, normalize, prioritize, or synthesize over declared inputs.

## Review annotation
- `touchedPaths`, `extractedSymbols`, and `configKeys` are central to need measurement and ranking.
- Measurement provenance is now elevated to a universal rule rather than repeated ad hoc.

---

# 9. Need measurement

## 9.1 Overview

**Responsibility:** convert GitHub repo state and GitHub Actions evidence into a precise need descriptor.

**Inputs:** repo tree, PR state, workflow outputs, benchmark/test results, optional human prompt.

**Outputs:** `GitHubNeedDescriptor`, `CanonicalBenchmarkOutputs`.

**Hand-off:** outputs feed directly into candidate recall and ranking.

## 9.2 Objective

ENGI v1 MUST convert GitHub benchmark/test/CI evidence and repo context into a structured need descriptor.

## 9.3 Inputs

Need measurement MAY use:
- benchmark harness config in repo,
- benchmark outputs from GitHub Actions,
- failing test/task IDs,
- path-level repo context,
- symbol extraction,
- config extraction,
- human-entered prompt.

If benchmark-linked data exists, ENGI MUST NOT rely solely on human prompt text.

## 9.4 Static vs inferred need measurements

Every need measurement MUST be classified as either:
- **static**: directly extracted from code, repo, or GitHub Actions evidence using deterministic tooling/programs,
- **inferred**: produced by an inference prompt/model over static inputs.

### Static measurements

Examples:
- `touchedPaths` from workflow artifacts or diff analyzers
- `extractedSymbols` from AST/symbol extraction
- `configKeys` from config parsers
- `failingCases` from test/benchmark output parsers
- `weakDimensions` from benchmark artifact parsers

### Inferred measurements

Examples:
- `task`
- `failureModes`
- `constraints`
- `targetArtifactKinds`

These MUST cite the static inputs they were inferred from.

## 9.5 Need measurement process

### Step 1 — ingest benchmark context
Read:
- benchmark harness path
- benchmark run outputs
- failing cases
- weak dimensions
- baseline metrics

### Step 2 — ingest repo context
Read:
- repo tree
- relevant/touched paths
- symbols
- config surfaces
- stack hints

### Step 3 — synthesize need descriptor
Produce:
- task
- failure modes
- constraints
- target artifact kinds
- stack hints
- benchmark target
- repo-scoped targeting context

## 9.6 Need measurement outputs

```ts
type NeedMeasurementOutput = {
  needDescriptor: GitHubNeedDescriptor
  benchmarkTarget: {
    harnessPath: string
    runId?: string
    failingCases: string[]
    weakDimensions: string[]
    baselineMetrics: Record<string, number>
  }
}
```

## 9.7 Benchmark parser interface

```ts
type BenchmarkParser = {
  parserKind: string
  parserVersion: string
  parse(runEvidence: GitHubActionRunEvidence): CanonicalBenchmarkOutputs
  validate(outputs: CanonicalBenchmarkOutputs): { ok: boolean, reasons: string[] }
}
```

Rules:
- every benchmark/test/CI integration MUST bind to a declared `BenchmarkParser`,
- parser validation failure MUST stop the pipeline before ranking,
- failing-case identifiers and weak-dimension names SHOULD be normalized into canonical forms before need synthesis.

## Review annotation
- This section now clearly distinguishes static vs inferred measurements and makes inferred fields cite their static evidence.
- Parser behavior is now explicit rather than implicit.

---

# 10. Candidate recall

## 10.1 Overview

**Responsibility:** produce a broad candidate set before expensive scoring.

**Inputs:** `GitHubNeedDescriptor`, deposited content indices.

**Outputs:** candidate asset/unit set.

**Hand-off:** outputs feed into ranking.

## 10.2 Objective

Recall MUST produce a broad candidate set before expensive reranking.

## 10.3 Recall channels

ENGI SHOULD use hybrid recall across:
- semantic task retrieval
- failure-mode retrieval
- technical-context retrieval
- lexical retrieval
- exact symbol retrieval
- exact path retrieval
- config-key retrieval
- artifact-kind filtering

## 10.4 Candidate union

```ts
candidateSet =
  union(
    semanticTaskSearch,
    failureModeSearch,
    technicalContextSearch,
    lexicalSearch,
    symbolSearch,
    pathSearch,
    configKeySearch,
    artifactKindFilteredSearch
  )
```

## 10.5 Vector retrieval and fusion contract

Every content unit SHOULD expose, when available:
- `taskVector`
- `failureModeVector`
- `technicalContextVector`

### Retrieval contract

1. normalize vectors before similarity computation,
2. use cosine similarity for vector recall,
3. perform per-channel top-k recall,
4. union all recalled candidates,
5. dedupe by `(assetId, unitId)`,
6. attach per-channel recall provenance to each candidate,
7. pass the deduped union into reranking.

### Suggested default per-channel recall budgets

- task-vector recall: top 50
- failure-mode-vector recall: top 50
- technical-context-vector recall: top 50
- lexical recall: top 100
- exact symbol/path/config recall: all exact hits or capped top 100, whichever is smaller

### Fusion rule

ENGI MUST NOT directly average raw vector scores across channels.
Channel recall is for candidate generation; calibrated combination happens later in reranking.

## Review annotation
- This remains intentionally hybrid. One-vector-only retrieval is not enough.
- The retrieval/fusion contract is now explicit enough to implement without hidden assumptions.

---

# 11. Ranking overview

## 11.1 Overview

**Responsibility:** compute the full need-resolution measurement for candidate content.

**Inputs:** `GitHubNeedDescriptor`, candidate assets/content units.

**Outputs:** ranking components and final ranking score.

**Hand-off:** ranking outputs combine with verification determinisms to determine final candidate use tier; downstream systems MUST consume that tier rather than recomputing ad hoc eligibility.

Ranking is the entirety of the holistic need-resolution measurement. It consists of:
- need match,
- benchmark impact likelihood,
- actionability,
- ranking penalties.

Verification determinisms are not part of ranking.

## 11.2 Reliability and telemetry requirement

For v1 implementation:
- all ranking component scores MUST emit telemetry,
- all model prompts and deterministic feature versions MUST be logged,
- ranking SHOULD fail hard in debug mode if required component scores are missing,
- ranking SHOULD fail hard in debug mode if score ranges are invalid,
- ranking SHOULD fail hard in debug mode if penalties are applied without traceable reasons.

## Review annotation
- This section now explicitly locks high telemetry and fail-hard debugging around ranking.

---

# 12. Need match

## 12.1 Overview

**Responsibility:** score how well candidate content fits the engineering need.

**Inputs:** `GitHubNeedDescriptor`, candidate asset/unit, static analyzers, inference prompts.

**Outputs:** `NeedMatchScore` plus a computed final need-match score.

**Hand-off:** output feeds into final ranking score.

## 12.2 Definition

Need match is the only top-level relevance concept.

## 12.3 Type

```ts
type NeedMatchScore = {
  taskSemanticFit: number        // 0..1
  failureModeFit: number         // 0..1
  symbolFit: number              // 0..1
  pathFit: number                // 0..1
  stackFit: number               // 0..1
  constraintFit: number          // 0..1
  artifactKindFit: number        // 0..1
  lexicalSupport: number         // 0..1
}
```

## 12.4 Computation

```ts
function computeFinalNeedMatch(score: NeedMatchScore): number {
  return (
    0.22 * score.taskSemanticFit +
    0.18 * score.failureModeFit +
    0.16 * score.symbolFit +
    0.10 * score.pathFit +
    0.10 * score.stackFit +
    0.12 * score.constraintFit +
    0.07 * score.artifactKindFit +
    0.05 * score.lexicalSupport
  )
}
```

## 12.5 Weighting logic

The weighting emphasizes:
- buyer task and failure mode first,
- repo-specific structural fit next,
- safety/correctness constraints next,
- content-form appropriateness next,
- lexical evidence last as support only.

This means ENGI is optimizing for actual engineering utility, not mere keyword coincidence.

## 12.6 Measurement detail: static vs inferred for each subscore

### `taskSemanticFit`
- **Static inputs:** task embeddings, benchmark case text, repo symbols/paths
- **Inferred step:** model judges whether content solves the task
- **Measurement mode:** hybrid

### `failureModeFit`
- **Static inputs:** failing cases, benchmark dimensions, extracted error classes
- **Inferred step:** model maps content to failure mode resolution
- **Measurement mode:** hybrid

### `symbolFit`
- **Static inputs:** symbol extraction from repo + asset/content
- **Inferred step:** none required unless symbol aliasing is ambiguous
- **Measurement mode:** primarily static

### `pathFit`
- **Static inputs:** touched paths, provenance-bound source paths, mentioned paths
- **Inferred step:** subsystem alignment when exact paths are absent
- **Measurement mode:** hybrid

### `stackFit`
- **Static inputs:** declared stacks, imports, dependencies, config keys
- **Inferred step:** normalize tool/framework aliases
- **Measurement mode:** hybrid

### `constraintFit`
- **Static inputs:** explicit constraints from need descriptor, extracted constraints from asset
- **Inferred step:** judge whether content preserves constraints
- **Measurement mode:** hybrid

### `artifactKindFit`
- **Static inputs:** target artifact kinds, candidate artifact kind
- **Inferred step:** none unless artifact classification is ambiguous
- **Measurement mode:** mostly static

### `lexicalSupport`
- **Static inputs:** BM25/token overlap, exact keyphrase matches
- **Inferred step:** none
- **Measurement mode:** static

## Review annotation
- This section now explicitly breaks down all need-match measurements and highlights static vs inferred behavior.

---

# 13. Path fit

## 13.1 Overview

**Responsibility:** score repo-path/subsystem alignment without unfairly penalizing non-code artifacts.

**Inputs:** need touched paths, provenance-bound source paths, content-mentioned paths.

**Outputs:** `PathFitScore` and a computed path-fit value.

**Hand-off:** feeds into need match.

## 13.2 Definition

`pathFit` measures whether candidate content is materially connected to repo areas implicated by the need.

It is not generic path overlap for its own sake.

## 13.3 Inputs

```ts
type PathFitInputs = {
  needTouchedPaths: string[]
  candidateSourcePaths: string[]     // provenance-bound
  candidateMentionedPaths: string[]  // extracted from content
}
```

## 13.4 Type

```ts
type PathFitScore = {
  sourcePathPrecision: number
  mentionedPathSupport: number
  subsystemAlignment: number
}
```

## 13.5 Computation

```ts
function computeFinalPathFit(score: PathFitScore): number {
  return (
    0.50 * score.sourcePathPrecision +
    0.25 * score.mentionedPathSupport +
    0.25 * score.subsystemAlignment
  )
}
```

## 13.6 Important rule

ENGI MUST NOT heavily penalize non-code artifacts merely because exact source paths are absent, if they strongly match:
- failure modes,
- symbols,
- stack,
- constraints.

## Review annotation
- Path fit is clearly forked for provenance-bound code vs non-code support artifacts.

---

# 14. Benchmark impact likelihood

## 14.1 Overview

**Responsibility:** estimate whether a candidate is likely to improve the buyer's measured weak spots.

**Inputs:** `GitHubNeedDescriptor`, candidate asset/unit, benchmark evidence, inference prompts.

**Outputs:** `BenchmarkImpactScore` plus computed final benchmark-impact value.

**Hand-off:** feeds into final ranking score and later share computation.

## 14.2 Type

```ts
type BenchmarkImpactScore = {
  likelyImprovesFailingCases: number
  likelyImprovesWeakDimensions: number
  likelyGeneralizesToRepoContext: number
}
```

## 14.3 Computation

```ts
function computeFinalBenchmarkImpact(score: BenchmarkImpactScore): number {
  return (
    0.45 * score.likelyImprovesFailingCases +
    0.35 * score.likelyImprovesWeakDimensions +
    0.20 * score.likelyGeneralizesToRepoContext
  )
}
```

## 14.4 Measurement detail: static vs inferred

### `likelyImprovesFailingCases`
- **Static inputs:** failing test/benchmark cases, expected outputs, relevant paths/symbols
- **Inferred step:** prompt asking whether the content would likely fix or improve those exact failing cases
- **Measurement mode:** hybrid

### `likelyImprovesWeakDimensions`
- **Static inputs:** benchmark dimension scores and deficits
- **Inferred step:** prompt judging whether content improves those dimensions
- **Measurement mode:** hybrid

### `likelyGeneralizesToRepoContext`
- **Static inputs:** repo context, stack, touched paths, config keys
- **Inferred step:** prompt judging whether the content generalizes safely to the buyer repo rather than only to an abstract example
- **Measurement mode:** hybrid

## 14.5 Weighting logic

The weighting emphasizes:
- exact failing-case improvement first,
- then broader weak-dimension improvement,
- then safe generalization to the buyer repo.

This keeps benchmark impact grounded in measured buyer weakness rather than generic optimism.

## Review annotation
- The computed value is now a function, not a stored field.
- This section explicitly marks each component as static vs inferred.

---

# 15. Actionability

## 15.1 Overview

**Responsibility:** measure whether a candidate can actually be used in a remediation branch workflow.

**Inputs:** need descriptor, candidate asset/unit, static analyzers, inference prompts.

**Outputs:** `ActionabilityScore` plus computed final actionability value.

**Hand-off:** feeds into final ranking score and branch assembly decisions.

## 15.2 Definition

Actionability measures whether a high-ranking candidate is actually usable for remediation work in the buyer context.

It is distinct from need match:
- need match asks: does this help solve the problem?
- actionability asks: can this be operationalized into a branch-level remediation workflow?

## 15.3 Type

```ts
type ActionabilityScore = {
  remediationSpecificity: number
  implementationSpecificity: number
  operationalUsability: number
}
```

## 15.4 Computation

```ts
function computeFinalActionability(score: ActionabilityScore): number {
  return (
    0.40 * score.remediationSpecificity +
    0.35 * score.implementationSpecificity +
    0.25 * score.operationalUsability
  )
}
```

## 15.5 Weighting logic

The weighting emphasizes:
- remediation specificity first,
- then implementation specificity,
- then operational usability.

This ordering prefers content that directly changes the buyer outcome over content that is merely easy to operationalize.

## 15.6 Component semantics

### `remediationSpecificity`
How specifically the content addresses corrective action for the need.

High score examples:
- explicit rollback steps
- concrete patch strategy
- exact benchmark failure remediation guidance

Low score examples:
- broad architectural commentary
- domain-relevant but non-remediating notes

### `implementationSpecificity`
How concrete the content is at the code/config/change level.

High score examples:
- exact symbols, paths, configuration keys, API changes, invariants, test targets

Low score examples:
- generic prose with little implementation surface

### `operationalUsability`
How easily the content can be used inside a branch-making and validation workflow.

High score examples:
- reproducible steps
- benchmark rerun instructions
- bounded scope
- actionable integration sequence

Low score examples:
- hard-to-apply theory
- unclear sequencing
- no workflow context

## 15.7 Measurement detail: static vs inferred

### `remediationSpecificity`
- **Static inputs:** imperative steps, patch instructions, command sequences, explicit remediation language
- **Inferred step:** model judges whether these steps actually target the measured need
- **Measurement mode:** hybrid

### `implementationSpecificity`
- **Static inputs:** symbol extraction, path extraction, config keys, test targets, patch hunks
- **Inferred step:** minimal; mostly deterministic
- **Measurement mode:** primarily static

### `operationalUsability`
- **Static inputs:** repro steps, validation steps, workflow references, environment specs
- **Inferred step:** model judges whether the overall workflow is usable in practice
- **Measurement mode:** hybrid

## Review annotation
- This section now finishes the actionability distinction and measurement details.

---

# 16. Final candidate ranking

## 16.1 Overview

**Responsibility:** combine ranking components into the final need-resolution score.

**Inputs:** need match, benchmark impact, actionability, penalties.

**Outputs:** final ranking score.

**Hand-off:** ranking combines with verification determinisms to determine use tier.

## 16.2 Type

```ts
type RankingPenalty =
  | 'stale-version-mismatch'
  | 'repo-context-mismatch'
  | 'constraint-conflict'
  | 'generic-content'
  | 'artifact-kind-mismatch'
  | 'weak-benchmark-linkage'

type CandidateRanking = {
  needMatch: NeedMatchScore
  benchmarkImpact: BenchmarkImpactScore
  actionability: ActionabilityScore
  rankingPenalties: RankingPenalty[]
}
```

## 16.3 Computation

```ts
function computeFinalRankingScore(
  ranking: CandidateRanking,
  penaltyMass: number
): number {
  return (
    0.65 * computeFinalNeedMatch(ranking.needMatch) +
    0.25 * computeFinalBenchmarkImpact(ranking.benchmarkImpact) +
    0.10 * computeFinalActionability(ranking.actionability) -
    penaltyMass
  )
}
```

Where `penaltyMass` is bounded to `[0, 0.30]`.

## 16.4 Penalty formalization

Each ranking penalty MUST declare:
- whether it is static, inferred, or hybrid,
- the evidence refs used to justify it,
- whether it is subtractive only or also gates branch generation in policy/debug mode.

### Penalty guidance

- `stale-version-mismatch`: primarily static; subtractive
- `repo-context-mismatch`: hybrid; subtractive, MAY gate in strict debug mode
- `constraint-conflict`: hybrid; subtractive, MAY gate patch generation in strict policy
- `generic-content`: inferred; subtractive only
- `artifact-kind-mismatch`: static; subtractive only
- `weak-benchmark-linkage`: hybrid; subtractive, MAY gate benchmark-impact-sensitive flows

ENGI MUST NOT apply a penalty without traceable evidence in telemetry/debug mode.

## 16.5 Critical implementation requirements

Because ranking is the critical implementation:
- every subscore MUST be individually logged,
- every inference prompt MUST be versioned,
- every deterministic tool/program used in static measurement MUST be versioned,
- missing component scores SHOULD hard-fail in debug builds,
- impossible ranges SHOULD hard-fail in debug builds,
- component disagreement SHOULD be telemetered,
- branch generation MUST NOT proceed if required ranking signals are absent.

## 16.6 Important rule

Verification determinisms MUST NOT be folded directly into ranking.

Ranking answers:
> how strongly does this content contribute to resolving the need?

Verification determinisms answer:
> is it eligible/safe enough for contextual use, branch use, or settlement use?

## Review annotation
- This section now calls out that ranking is the implementation-critical subsystem that needs high telemetry and fail-hard debugging.

---

# 17. Verification determinisms

## 17.1 Overview

**Responsibility:** apply non-ranking checks that determine eligibility, gating, and branch/settlement readiness.

**Inputs:** candidate asset, attestation data, provenance data, verification evidence, policy state.

**Outputs:** verification objects and candidate use tier.

**Hand-off:** outputs gate reporting visibility, branch inclusion, source-material materialization, and settlement participation.

This section replaces fuzzy “trust” with exact determinisms.

---

## 17A. Issuance verification

### Overview

**Responsibility:** verify that the artifact was issued/deposited as claimed.

**Inputs:** attestations, content root, policy cosign rules.

**Outputs:** issuance verification object.

**Hand-off:** can hard-reject candidates before branch use.

### Type

```ts
type IssuanceVerification = {
  hasSignerAddresses: boolean
  signatureChecksPass: boolean
  signedPayloadHashMatchesContentRoot: boolean
  cosignRequirementSatisfied: boolean
  reasons: string[]
}
```

### Meaning

Issuance verification asks:
> was this content actually issued/deposited as claimed?

### Required checks

1. signer address exists
2. signature verifies
3. signed payload hash equals `contentRoot`
4. required cosign rules are satisfied if policy demands them

### Rejection rule

Issuance rejection is computed, not stored.

```ts
function shouldRejectIssuance(v: IssuanceVerification): boolean {
  return (
    !v.hasSignerAddresses ||
    !v.signatureChecksPass ||
    !v.signedPayloadHashMatchesContentRoot
  )
}
```

## Review annotation
- Rejection is now a pure derived function rather than stored state.

---

## 17B. Provenance verification

### Overview

**Responsibility:** verify that the artifact is bound to the GitHub context it claims.

**Inputs:** provenance binding, GitHub context.

**Outputs:** provenance verification object.

**Hand-off:** can hard-reject contradicted provenance claims and otherwise gate branch use.

### Type

```ts
type ProvenanceVerification = {
  sourceProviderIsGitHub: boolean
  repoBindingPresent: boolean
  commitBindingPresent: boolean
  pathBindingPresent: boolean
  workflowBindingPresent: boolean
  workflowRunVerifiable: boolean
  metadataCoherent: boolean
  reasons: string[]
}
```

### Meaning

Provenance verification asks:
> is this content actually tied to a real GitHub source/build context?

### Required checks

1. source provider is GitHub
2. repo binding exists if claimed
3. commit binding exists if claimed
4. path binding exists if claimed
5. workflow binding exists if verification/build claims are made
6. workflow run exists if referenced
7. all provenance metadata is mutually coherent

### Rejection rule

Provenance rejection is computed, not stored.

```ts
function shouldRejectProvenance(v: ProvenanceVerification): boolean {
  return provenanceClaimsContradicted(v)
}
```

Missing provenance may weaken branch eligibility without causing rejection.

## Review annotation
- Absence is weaker than contradiction; this distinction matters.

---

## 17C. Verification sufficiency

### Overview

**Responsibility:** determine whether enough evidence exists to rely on the artifact.

**Inputs:** test evidence, benchmark evidence, typecheck/static-analysis evidence, repro evidence.

**Outputs:** sufficiency object and recommended use tier.

**Hand-off:** drives rank-only/context-only/patch-eligible decisions.

### Type

```ts
type VerificationSufficiency = {
  hasTestEvidence: boolean
  hasTypecheckEvidence: boolean
  hasStaticAnalysisEvidence: boolean
  hasBenchmarkEvidence: boolean
  benchmarkEvidenceBoundToGitHubRun: boolean
  hasReproSteps: boolean
  hasPinnedEnvironment: boolean
  scoreTrace: {
    score: number
    thresholdApplied: number
  }
  recommendedUseTier: 'insufficient-for-use' | 'context-only' | 'patch-eligible'
  reasons: string[]
}
```

### Meaning

Verification sufficiency asks:
> is there enough evidence to rely on this content?

### Tier policy

```ts
function decideVerificationUseTier(score: number): 'insufficient-for-use' | 'context-only' | 'patch-eligible' {
  if (score < 0.25) return 'insufficient-for-use'
  if (score < 0.60) return 'context-only'
  return 'patch-eligible'
}
```

ENGI SHOULD preserve the numeric sufficiency score in `scoreTrace` for telemetry, threshold tuning, and explainability.

### Important note

High-ranking content may still be only context-grade, not patch-grade.

## Review annotation
- This prevents overclaiming and preserves buyer trust.

---

## 17D. Issuer policy status

### Overview

**Responsibility:** apply bounded ENGI policy to issuer identity classes.

**Inputs:** issuer identity, policy state, revocation/acceptance records, cosign rules.

**Outputs:** policy object.

**Hand-off:** may hard-reject revoked issuers and influences settlement eligibility.

This is the finished replacement for “reputation.”

### Type

```ts
type IssuerPolicyStatus = {
  issuerKey: string
  status: 'allowed' | 'unknown' | 'restricted' | 'revoked'
  allowlisted: boolean
  orgBound: boolean
  requiredCosignSatisfied: boolean
  priorAcceptedIssuanceCount: number
  priorRevokedIssuanceCount: number
  reasons: string[]
}
```

### Meaning

Issuer policy status asks:
> under ENGI policy, what stance do we take toward this issuer class?

It is not social reputation. It is a bounded policy object.

### Inputs

- allowlist membership
- org binding
- cosign rule satisfaction
- prior accepted issuances
- prior revoked issuances

### Rejection rule

Issuer-policy rejection is computed, not stored.

```ts
function shouldRejectIssuerPolicy(s: IssuerPolicyStatus): boolean {
  return s.status === 'revoked'
}
```

### Restricted/unknown semantics

- `allowed`: eligible for normal policy flow
- `unknown`: MAY be usable, but SHOULD NOT become settlement-eligible without stronger verification/provenance conditions
- `restricted`: MAY be limited to `context-only` or require additional cosign/provenance policy before patch or settlement use
- `revoked`: reject

### Important policy rule

- unknown issuers MAY still be usable,
- restricted issuers MUST have explicit policy explaining what extra conditions apply,
- prior accepted issuance count MUST be capped,
- prior revoked issuance count MUST be bounded,
- no social prestige or vague public reputation is allowed into this object.

## Review annotation
- This is now clearly policy, not vibes.

---

# 18. Candidate verification result and use tier

## 18.1 Overview

**Responsibility:** combine verification determinisms into the final eligibility tier.

**Inputs:** issuance verification, provenance verification, verification sufficiency, issuer policy status.

**Outputs:** candidate use tier.

**Hand-off:** gates branch inclusion and settlement eligibility.

## 18.2 Types

```ts
type CandidateVerification = {
  issuanceVerification: IssuanceVerification
  provenanceVerification: ProvenanceVerification
  verificationSufficiency: VerificationSufficiency
  issuerPolicyStatus: IssuerPolicyStatus
}

type CandidateUseTier =
  | 'reject'
  | 'rank-only'
  | 'context-only'
  | 'patch-eligible'
  | 'settlement-eligible'
```

## 18.3 Decision rules

```ts
function decideCandidateUseTier(v: CandidateVerification): CandidateUseTier {
  if (shouldRejectIssuance(v.issuanceVerification)) return 'reject'
  if (shouldRejectProvenance(v.provenanceVerification)) return 'reject'
  if (shouldRejectIssuerPolicy(v.issuerPolicyStatus)) return 'reject'

  const verificationTier = v.verificationSufficiency.recommendedUseTier

  if (verificationTier === 'insufficient-for-use') return 'rank-only'
  if (verificationTier === 'context-only') return 'context-only'

  return 'patch-eligible'
}
```

Optional settlement gate:

```ts
function upgradeToSettlementEligible(
  tier: CandidateUseTier,
  v: CandidateVerification
): CandidateUseTier {
  if (tier !== 'patch-eligible') return tier

  const issuanceStrong = !shouldRejectIssuance(v.issuanceVerification)
  const provenanceStrong = !shouldRejectProvenance(v.provenanceVerification)
  const issuerAllowed = !shouldRejectIssuerPolicy(v.issuerPolicyStatus) && v.issuerPolicyStatus.status === 'allowed'

  if (issuanceStrong && provenanceStrong && issuerAllowed) {
    return 'settlement-eligible'
  }

  return tier
}
```

## 18.4 Semantics

- `rank-only`: retained for analysis and explanation, not branch inclusion
- `context-only`: can appear in context branch
- `patch-eligible`: can inform patch branch
- `settlement-eligible`: can participate in downstream settlement if enabled

## 18.5 Use-tier propagation requirements

Use tiers MUST drive downstream behavior all the way to final delivery and settlement:
- `reject`: excluded from asset packs, branch materialization, and settlement
- `rank-only`: may appear only in analysis/reporting surfaces
- `context-only`: may appear in private context branches and explanatory manifests, but MUST NOT drive generated patch content or settlement
- `patch-eligible`: may drive private patch-branch generation, but MUST NOT settle unless upgraded
- `settlement-eligible`: may participate in share issuance and settlement

Any downstream subsystem that consumes candidates MUST declare which use tiers it accepts.

## Review annotation
- This cleanly separates ranking from verification and gives an explicit hand-off layer.
- Use tiers now propagate all the way to final delivery and settlement.

---

# 19. Expensive LLM evaluation roles

## 19.1 Overview

**Responsibility:** provide inferred measurements where static tools alone are insufficient.

**Inputs:** static measurements, content text, benchmark evidence, repo context.

**Outputs:** inferred score components used by ranking and some verification-sufficiency judgments.

**Hand-off:** outputs combine with deterministic/static measurements.

## 19.2 Ranking-side evaluators

### R1 — need match evaluator
Outputs support for:
- taskSemanticFit
- failureModeFit
- constraintFit
- artifactKindFit
- lexical support summary

### R2 — benchmark impact evaluator
Outputs support for:
- likelyImprovesFailingCases
- likelyImprovesWeakDimensions
- likelyGeneralizesToRepoContext

### R3 — actionability evaluator
Outputs support for:
- remediationSpecificity
- implementationSpecificity
- operationalUsability

## 19.3 Verification-side evaluators

### V1 — technical coherence evaluator
Supports verification sufficiency; detects false specificity and genericity.

### V2 — provenance/verification evaluator
Supports provenance verification and verification sufficiency.

## 19.4 Important rule

LLMs MAY support verification determinations but MUST NOT override hard deterministic issuance failures.

## Review annotation
- This section explicitly highlights inference moments and where they enter the system.

---

# 20. Asset pack assembly

## 20.1 Overview

**Responsibility:** select the final content set that will power branch generation and settlement.

**Inputs:** evaluated candidates, use tiers, token/context budget, need coverage requirements.

**Outputs:** `AssetPack`.

**Hand-off:** asset pack feeds branch generation, share computation, and settlement.

## 20.2 Objective

Assemble a coherent set of candidate assets/units that together best address the need.

## 20.3 Constraints

Bundle assembly SHOULD account for:
- token/context budget
- artifact diversity
- need coverage
- benchmark target coverage
- use tier restrictions

## 20.4 Asset pack type

```ts
type SensitiveDataClass =
  | 'repo-private-source'
  | 'licensed-source-material'
  | 'private-branch-derived-artifact'
  | 'verification-evidence'
  | 'settlement-preview'
  | 'private-proof-artifact'
  | 'bounded-public-proof-metadata'

type SensitiveDataFlowRecord = {
  recordId: string
  dataClass: SensitiveDataClass
  fromSurface: string
  toSurface: string
  transformation: string
  authorizedPrincipals: string[]
  retentionPolicyId: string
  disclosurePolicyId: string
  proofRefs: string[]
}

type PrincipalClass =
  | 'buyer-principal'
  | 'engi-system-principal'
  | 'authorized-reviewer'
  | 'issuer-principal'
  | 'public-reader'

type IdentityBinding = {
  principalId: string
  principalClass: PrincipalClass
  authSource: 'github' | 'attestation' | 'policy'
  boundRefs: string[]
}

type AuthorizationDecision = {
  principalId: string
  action: string
  resourceRef: string
  decision: 'allow' | 'deny'
  policyRef: string
  reasons: string[]
}

type InferenceSynthesisProof = {
  outputField: string
  evidenceRefs: string[]
  promptOrEvaluatorId: string
  modelId: string
  replayableTrace: boolean
  admissible: boolean
}

type AssetMeasurement = {
  assetId: string
  measuredFields: {
    symbols?: string[]
    paths?: string[]
    configKeys?: string[]
    stackTags?: string[]
    constraints?: string[]
  }
  provenance: MeasurementProvenance[]
}

type AssetMeasurementProof = {
  assetId: string
  contentRoot: string
  unitRefs: string[]
  measurementsTraceableToUnits: boolean
  measurementReplayable: boolean
  measurementPolicySatisfied: boolean
}

type SelectionConsistencyProof = {
  assetPackId: string
  branchMode: 'context' | 'patch'
  allSelectedAssetsRespectUseTier: boolean
  allMaterializedAssetsRespectVisibilityRules: boolean
  settlementConsumesOnlySettlementEligibleAssets: boolean
}

type JournalCompletenessProof = {
  eventId: string
  allRequiredReasonsCovered: boolean
  noUnclassifiedTransfers: boolean
  eventRefsConsistent: boolean
  replayableJournal: boolean
}

type IdentityAuthorizationProof = {
  resourceRef: string
  allAccessBoundToKnownPrincipals: boolean
  allStateChangingActionsAuthorized: boolean
  issuerIdentityBound: boolean
  buyerDeliveryPrincipalsBound: boolean
}

type SensitiveDataFlowProof = {
  allPrivateArtifactsClassified: boolean
  allFlowsRecorded: boolean
  noUnauthorizedPublicDisclosure: boolean
  retentionPoliciesAssigned: boolean
  revocationBehaviorDefined: boolean
}

type NeedLifecycle =
  | 'measured'
  | 'ranked'
  | 'verified'
  | 'branch-staged-private'
  | 'settlement-pending'
  | 'settled'
  | 'delivery-open'
  | 'failed'
  | 'revoked'

type AssetPack = {
  assetPackId: string
  needId: string
  selectedAssets: string[]
  selectedUnits: string[]
  lockedContentRoots: string[]
  lockedAttestationHashes: string[]
  estimatedBundleScore: number
}
```

## 20.5 Eligibility rules

Assets with:
- `context-only`, `patch-eligible`, or `settlement-eligible`
  MAY enter bundle assembly.

Assets with:
- `patch-eligible` or `settlement-eligible`
  SHOULD drive patch-grade assembly.

## 20.6 Cohesion rule

The cohesion between:
- measured assets,
- asset-pack selection,
- share issuance,
- and final settlement

MUST remain explicit and inspectable.

No asset may receive shares unless:
- it is in the final `AssetPack`,
- its selected units are locked,
- its content root is locked,
- and it participates in the selected need-resolution event.

## Review annotation
- This section now explicitly locks the cohesion between measured assets and share issuance.

---

# 21. Buyer UX: Make ENGI branch

## 21.1 Overview

**Responsibility:** define the buyer-facing GitHub workflow.

**Inputs:** buyer `ENGI-...` branch and PR, evaluated asset pack.

**Outputs:** private ENGI remediation branch plus manifests and source-material delivery surface.

**Hand-off:** private branch creation precedes settlement; settlement preview and source-material materialization occur within the same private delivery boundary.

## 21.2 Primary action

The primary buyer-facing CTA SHOULD be:

**Make ENGI branch**

Primary CTA SHOULD NOT be a vague “generate fix.”

## 21.3 Buyer flow

1. buyer creates an `ENGI-...` branch,
2. buyer opens a PR,
3. GitHub Actions runs benchmark/test/CI,
4. ENGI measures the need,
5. ENGI ranks and verifies candidate content,
6. ENGI creates its private remediation branch from the buyer branch,
7. ENGI writes selected source material artifacts or canonical mounted copies, manifests, and settlement preview into that private branch,
8. ENGI finalizes settlement while the remediation branch remains private/access-controlled,
9. ENGI later opens a PR back into the buyer branch when policy permits delivery exposure.

## 21.4 Confidentiality and visibility

The remediation branch MUST remain private/access-controlled before and through settlement.

The following MUST inherit the remediation branch confidentiality boundary:
- `.engi/source-material/`
- `.engi/settlement-preview.json`
- remediation-branch Actions logs/artifacts that would reveal licensed material
- any generated patch content derived from licensed source material before authorized delivery

A public or broader-visibility PR MUST NOT be opened from the remediation branch until settlement and delivery policy conditions are satisfied.

## 21.5 Branch modes

ENGI v1 SHOULD support:

### Context branch
Contains manifests, selected source material artifacts or canonical mounted copies, and the reasoning needed for inspection and acceptance decisions.

### Patch branch
Contains manifests, selected source material artifacts or canonical mounted copies, plus generated remediation changes.

## 21.6 Branch contents

```text
.engi/
  need.json
  match-report.json
  verification-report.json
  eval-manifest.json
  asset-pack.lock.json
  settlement-preview.json
  system-proof-bundle.json
  source-material/
ENGI_NEED.md
```

## 21.7 ENGI_NEED.md MUST include

- failing benchmark slices
- measured need
- selected assets and reasons
- verification/risk summary
- expected touched files/areas
- validation/rerun instructions
- settlement preview summary

## 21.8 Branch generation tier acceptance

Branch generation MUST accept candidates by use tier as follows:
- context branch: `context-only`, `patch-eligible`, `settlement-eligible`
- patch branch: `patch-eligible`, `settlement-eligible`
- settlement inputs: `settlement-eligible` only

`rank-only` candidates MAY appear in reports but MUST NOT be materialized into private source-material delivery or generated patch output.

## 21.9 Need lifecycle state machine

```ts
type NeedLifecycle =
  | 'measured'
  | 'ranked'
  | 'verified'
  | 'branch-staged-private'
  | 'settlement-pending'
  | 'settled'
  | 'delivery-open'
  | 'failed'
  | 'revoked'
```

Rules:
- source material materialization MUST NOT occur before `verified`,
- private source-material materialization before settlement is permitted only inside the private remediation surface,
- public or broader-visibility delivery before settlement is forbidden,
- private remediation branch creation transitions to `branch-staged-private`,
- settlement executes during `settlement-pending`,
- `delivery-open` occurs only after settlement and confidentiality policy checks pass,
- failure at any stage MUST halt later stages and preserve prior invariant evidence for audit.

## Review annotation
- This section now exactly matches the PR/branch UX you described and makes the settlement/visibility lifecycle explicit.

---

# 22. Asset shares

## 22.1 Overview

**Responsibility:** compute normalized contribution for the specific need-resolution event.

**Inputs:** final asset pack, need descriptor, ranking outputs.

**Outputs:** raw shares and settled shares.

**Hand-off:** outputs feed directly into settlement, journal diff construction, and final deliverable assembly.

## 22.2 Definition

Asset shares represent normalized contribution across assets for a specific need-resolution event.

They MUST be:
- event-specific
- need-specific
- benchmark-context-aware
- explainable

They MUST NOT represent:
- generic asset quality
- generic issuer prestige
- opaque hidden weighting

## 22.3 Raw vs settled shares

### Raw shares
Pure contribution to resolving the need.

```ts
type AssetShareRaw = {
  assetId: string
  shareBp: number
  reasons: string[]
}
```

### Settled shares
For v1, settled shares SHOULD equal raw shares unless and until a stricter settlement-policy layer is explicitly turned on.

```ts
type AssetShareSettled = {
  assetId: string
  rawShareBp: number
  settledShareBp: number
  settlementAdjustmentReasons: string[]
}
```

## 22.4 Recommendation for v1

Default v1 SHOULD:
- compute `AssetShareRaw`,
- use raw shares as the main explanatory object,
- set settled shares equal to raw shares,
- keep any adjustment mechanism deferred unless strictly needed.

## Review annotation
- This keeps measured assets and share issuance tightly coherent.

---

# 23. Raw asset share computation

## 23.1 Overview

**Responsibility:** normalize contribution across the selected assets only.

**Inputs:** need descriptor, final asset pack.

**Outputs:** raw shares summing to 10000 bp.

**Hand-off:** raw shares feed settled shares and journal settlement.

## 23.2 Basis

Raw shares SHOULD be based on:
- marginal benchmark impact
- need coverage contribution
- constraint contribution
- actionability contribution

## 23.3 Formula

```ts
rawContribution(asset) =
  0.50 * marginalBenchmarkImpact(asset) +
  0.25 * needCoverageContribution(asset) +
  0.15 * constraintContribution(asset) +
  0.10 * actionabilityContribution(asset)
```

Normalize across selected assets to 10000 bp.

## 23.4 Eligibility

Only assets with:
- `patch-eligible` or `settlement-eligible`
SHOULD contribute to patch-grade raw-share computation.

## 23.5 Pseudocode

```ts
function computeAssetSharesRaw(
  need: GitHubNeedDescriptor,
  bundle: AssetBundle
): AssetShareRaw[] {
  // Score the full selected bundle against the measured need.
  const fullScore = evaluateBundleForNeed(need, bundle)

  // Compute leave-one-asset-out marginal contribution.
  const contributions = bundle.assets.map(asset => {
    const reducedBundle = removeAsset(bundle, asset.assetId)
    const reducedScore = evaluateBundleForNeed(need, reducedBundle)
    const marginalContribution = Math.max(0, fullScore - reducedScore)

    return {
      assetId: asset.assetId,
      mass: marginalContribution
    }
  })

  // Deterministically normalize contribution mass into 10000 bp.
  return normalizeMassTo10000(contributions)
}
```

## Review annotation
- Raw shares remain simple and contribution-first.

---

# 24. Settlement and journal diff

## 24.1 Overview

**Responsibility:** perform exact value movement and prove it through a structured journal diff.

**Inputs:** state before settlement, need event, raw/settled shares, metered micro-units.

**Outputs:** state after settlement, journal diff, invariant results.

**Hand-off:** this is the terminal accounting layer and the source of truth for settlement-proof final deliverables.

## 24.2 Objective

ENGI v1 MUST prove exact value movement via a structured journal diff.

## 24.3 Accounting model

ENGI v1 MUST use exact fixed-point integer accounting.
Example:
- visible units: `100`
- internal micro-units: `100_000_000`

## 24.4 Journal types

```ts
type JournalReason =
  | 'licensed_bundle_debit'
  | 'contribution_credit'
  | 'settlement_reconciliation'

type JournalEntry = {
  entryId: string
  account: string
  delta: bigint
  reason: JournalReason
  eventId: string
  bundleId: string
  needId: string
  assetId?: string
  unitRefs?: string[]
  issuerKey?: string
  receiptRef: string
  explanation: string
}
```

### Journal-reason semantics

- `licensed_bundle_debit`: MUST be used only for debiting the buyer license pool for the settled bundle event
- `contribution_credit`: MUST be used only for crediting asset-scoped pending claims under normalized shares
- `settlement_reconciliation`: MUST be used only for explicit future reconciliation events; it MUST NOT appear in the default v1 settlement flow

Every journal entry MUST have:
- a machine-readable `reason`,
- a human-readable `explanation`,
- enough identifiers to trace it back to the settled need event.

## 24.5 Account namespace semantics

Accounts MUST belong to explicit classes.

Suggested classes:
- `buyer:<buyerId>:license_pool`
- `supplier:<assetId>:pending_claims`
- optional later reconciliation accounts under explicit policy extensions

Rules:
- debit accounts and credit accounts MUST be distinguishable by namespace,
- pending claims are asset-scoped in v1,
- settlement MUST NOT silently collapse asset-scoped balances into issuer-scoped balances without an explicit reconciliation event.

## 24.6 Journal diff type

```ts
type SystemProofBundle = {
  needId: string
  assetPackId: string
  inferenceProofs: InferenceSynthesisProof[]
  assetMeasurementProofs: AssetMeasurementProof[]
  selectionConsistencyProof: SelectionConsistencyProof
  journalCompletenessProof: JournalCompletenessProof
  identityAuthorizationProof: IdentityAuthorizationProof
  sensitiveDataFlowProof: SensitiveDataFlowProof
  settlementProof: SettlementProof
}

type JournalDiff = {
  eventId: string
  needId: string
  bundleId: string

  beforeRoot: string
  afterRoot: string

  debits: JournalEntry[]
  credits: JournalEntry[]

  beforeBalances: Record<string, bigint>
  afterBalances: Record<string, bigint>

  rawShares: AssetShareRaw[]
  settledShares: AssetShareSettled[]

  invariants: {
    debitsEqualCredits: boolean
    noNegativeBalances: boolean
    rawSharesNormalized: boolean
    settledSharesNormalized: boolean
    receiptChainValid: boolean
    refsClosed: boolean
    settledEqualsRaw: boolean
  }

  totals: {
    debited: bigint
    credited: bigint
    difference: bigint
  }
}
```

## 24.7 Required invariants

ENGI v1 MUST check:
1. total debits == total credits
2. no negative balances
3. raw shares sum to 10000 bp
4. settled shares sum to 10000 bp
5. referenced assets/receipts exist
6. receipt chain is valid
7. before/after roots match state transition
8. settled shares equal raw shares in default v1 settlement mode

## 24.8 Default settlement mode

In default v1 settlement mode:
- `settledShareBp === rawShareBp` for every asset
- no settlement adjustment layer is applied
- zero-point accounting is complete and direct

## 24.9 Distribution algorithm precision

### Exact micro-unit allocation rule

`allocateExactMicroUnits(total, settledShares)` MUST:
1. multiply `total` by each `settledShareBp / 10000`,
2. floor each result to a provisional micro-unit allocation,
3. compute the remainder,
4. assign the remainder deterministically using a stable tie-break rule,
5. guarantee final allocated micro-units sum exactly to `total`.

### Stable tie-break rule

Remainder assignment MUST break ties by:
1. largest fractional remainder,
2. then largest `settledShareBp`,
3. then stable lexical order of `assetId`.

This guarantees deterministic replay.

## 24.10 Settlement proof object

```ts
type SettlementProof = {
  theoremChecks: {
    rawSharesNormalized: boolean
    settledSharesNormalized: boolean
    allocationConserved: boolean
    debitsEqualCredits: boolean
    noNegativeBalances: boolean
    refsClosed: boolean
    stateRootIntegrity: boolean
  }
  beforeRoot: string
  afterRoot: string
  journalHash: string
  assetPackLockHash: string
}
```

Settlement proof artifacts SHOULD be persisted in the private remediation surface and MAY expose only bounded metadata/hashes in public proof surfaces.

## 24.11 Formal proof obligations

ENGI v1 MUST implement proofs/checks for the following lowest-level accounting properties.

### Theorem 1 — share normalization totality
Given a non-empty selected asset set and `normalizeMassTo10000`, the resulting `rawShares` sum exactly to `10000`.

**Proof obligation:** implemented by deterministic normalization plus exact remainder assignment in basis points.

### Theorem 2 — settled/raw equality in default v1 mode
In default settlement mode, `settledShareBp === rawShareBp` for every asset.

**Proof obligation:** implemented structurally by direct copy from raw to settled shares.

### Theorem 3 — allocation conservation
Given `settledShares` summing to `10000` and `allocateExactMicroUnits(total, settledShares)`, allocated micro-units sum exactly to `total`.

**Proof obligation:** implemented by floor allocation plus deterministic remainder assignment.

### Theorem 4 — debit/credit conservation
If the debit side is a single entry of `-total` and the credit side sums to `total`, then `sum(debits) + sum(credits) = 0`.

**Proof obligation:** checked directly in journal diff invariants.

### Theorem 5 — non-negative balances
If buyer license pool balance before settlement is at least `total`, and all credits are non-negative, then post-settlement balances are non-negative.

**Proof obligation:** enforced by pre-settlement eligibility check and post-settlement invariant check.

### Theorem 6 — reference closure
Every credited asset in the journal must exist in the locked `AssetPack`, every referenced unit must exist in the locked unit set, and every referenced receipt must exist in the event bundle.

**Proof obligation:** checked before applying journal and again in `refsClosed` invariant.

### Theorem 7 — state-root integrity
If the journal is applied deterministically to `beforeBalances`, then `afterRoot` is the canonical hash of the resulting `afterBalances` and linked receipts.

**Proof obligation:** recompute root from canonical serialization and compare.

## 24.12 Pseudocode

```ts
function settleNeedEvent(stateBefore, event) {
  // Clone state so settlement is pure until commit.
  const before = cloneState(stateBefore)

  // Compute raw shares from the final selected asset bundle.
  const rawShares = computeAssetSharesRaw(event.need, event.bundle)

  // Default v1 mode: settled shares are identical to raw shares.
  const settledShares = rawShares.map(item => ({
    assetId: item.assetId,
    rawShareBp: item.shareBp,
    settledShareBp: item.shareBp,
    settlementAdjustmentReasons: []
  }))

  const total = event.meteredMicroUnits

  // Deterministically distribute exact micro-units.
  const allocations = allocateExactMicroUnits(total, settledShares)

  // Debit buyer license pool.
  const debits = [{
    entryId: makeEntryId(),
    account: `buyer:${event.buyerId}:license_pool`,
    delta: -total,
    reason: 'licensed_bundle_debit',
    eventId: event.eventId,
    bundleId: event.bundleId,
    needId: event.need.needId,
    receiptRef: event.issuanceReceiptId,
    explanation: 'Debit buyer license pool for licensed ENGI bundle issuance.'
  }]

  // Credit supplier pending claims according to normalized shares.
  const credits = allocations.map(a => ({
    entryId: makeEntryId(),
    account: `supplier:${a.assetId}:pending_claims`,
    delta: a.microUnits,
    reason: 'contribution_credit',
    eventId: event.eventId,
    bundleId: event.bundleId,
    needId: event.need.needId,
    assetId: a.assetId,
    unitRefs: unitRefsForAsset(event.bundle, a.assetId),
    receiptRef: event.allocationReceiptId,
    explanation: 'Credit supplier pending claims according to normalized asset share.'
  }))

  // Apply journal entries to produce post-state.
  const after = applyJournal(before, [...debits, ...credits])

  // Build the full proof object over the transition.
  const diff = buildJournalDiff({
    before,
    after,
    debits,
    credits,
    rawShares,
    settledShares,
    event
  })

  // Required proof checks.
  assert(diff.invariants.debitsEqualCredits)
  assert(diff.invariants.noNegativeBalances)
  assert(diff.invariants.rawSharesNormalized)
  assert(diff.invariants.settledSharesNormalized)
  assert(diff.invariants.receiptChainValid)
  assert(diff.invariants.refsClosed)
  assert(diff.invariants.settledEqualsRaw)

  return { after, diff }
}
```

## Review annotation
- This section now includes a more formal proof-oriented treatment of the accounting layer and makes the exact allocation algorithm deterministic.

---

# 25. Reports and manifests

## 25.1 Overview

**Responsibility:** define the inspectable artifacts written into the remediation branch.

**Inputs:** need descriptor, ranking outputs, verification determinisms, asset pack, settlement preview.

**Outputs:** branch-readable manifests.

**Hand-off:** supports buyer inspection, bounded public proof surfaces, and later QA.

## 25.2 Match report

```ts
type MatchReport = {
  needId: string
  selectedAssets: {
    assetId: string
    finalRankingScore: number
    useTier: CandidateUseTier
    reasons: string[]
  }[]
  rejectedAssets?: {
    assetId: string
    rejectionReason: string
  }[]
}
```

## 25.3 Verification report

```ts
type VerificationReport = {
  needId: string
  assetVerification: {
    assetId: string
    issuanceVerification: IssuanceVerification
    provenanceVerification: ProvenanceVerification
    verificationSufficiency: VerificationSufficiency
    issuerPolicyStatus: IssuerPolicyStatus
    useTier: CandidateUseTier
  }[]
}
```

## 25.4 Eval manifest

```ts
type EvalManifest = {
  needId: string
  benchmarkRunId?: string
  promptsVersion: string
  modelsUsed: string[]
  deterministicFeatureVersion: string
  evaluatorsUsed: string[]
}
```

## 25.5 Asset pack lock

```ts
type AssetPackLock = {
  assetPackId: string
  needId: string
  assets: {
    assetId: string
    contentRoot: string
    attestationHash?: string
  }[]
  units: {
    assetId: string
    unitId: string
    unitHash?: string
  }[]
}
```

## 25.6 Confidentiality classes for branch artifacts

Private-only by default:
- `.engi/source-material/`
- `.engi/settlement-preview.json`
- any manifest fields that reveal licensed payload structure beyond bounded metadata

Potentially disclosable in bounded form:
- match-report metadata
- invariant results
- asset/content hashes
- receipt identifiers

## 25.7 Settlement preview

```ts
type SettlementPreview = {
  needId: string
  bundleId: string
  rawShares: AssetShareRaw[]
  settledShares: AssetShareSettled[]
  meteredMicroUnits: bigint
}
```

## 25.8 Final deliverables

ENGI v1 final deliverables for a need-resolution event are:
- a private remediation branch (context or patch mode),
- `.engi/need.json`,
- `.engi/match-report.json`,
- `.engi/verification-report.json`,
- `.engi/eval-manifest.json`,
- `.engi/asset-pack.lock.json`,
- `.engi/settlement-preview.json`,
- `.engi/system-proof-bundle.json`,
- `.engi/source-material/`,
- `ENGI_NEED.md`,
- a settlement proof artifact derived from the journal diff.

Every final deliverable MUST declare:
- which use tiers contributed to it,
- whether it is private-only or potentially disclosable in bounded form,
- which measurements, inference steps, and verification determinisms it depends on.

## Review annotation
- This section now covers the branch inspection surface with both ranking and verification determinisms.
- Final deliverables are now enumerated explicitly.

---

# 26. Telemetry, debugging, and implementation reliability

## 26.1 Overview

**Responsibility:** specify observability and fail-hard behavior for v1 implementation.

**Inputs:** all measurement, scoring, verification, branching, and settlement operations.

**Outputs:** traceable telemetry and deterministic failure modes.

**Hand-off:** after v1 implementation is reliable, demo UI QA can proceed.

## 26.2 Requirements

The following MUST emit telemetry:
- need measurement inputs/outputs
- static measurement tool/program versions
- inference prompt versions
- candidate recall counts
- every ranking component
- every penalty reason
- every verification determination
- branch generation inputs/outputs
- raw shares
- settlement preview
- journal diff invariants

## 26.3 Fail-hard requirements in debug/development mode

Core systems SHOULD hard-fail if:
- required ranking components are missing,
- score ranges are invalid,
- verification determinisms are incomplete,
- candidate use tier cannot be derived,
- share normalization fails,
- micro-unit allocation does not conserve exactly,
- journal invariants fail,
- branch manifests cannot be written coherently.

## 26.4 QA sequencing rule

Once v1 implementations are made, ENGI SHOULD return to the demo UI for QA only after:
- ranking,
- verification determinisms,
- branch creation,
- share computation,
- and journal settlement

are all functionally reliable under telemetry.

## Review annotation
- This section explicitly encodes the “implement reliably first, then QA the demo UI” plan.

---

# 27. Implementation order

1. GitHub app + benchmark ingestion
2. need descriptor generation
3. hybrid candidate recall
4. need-match scoring
5. benchmark-impact and actionability evaluation
6. issuance/provenance/verification/policy checks
7. use-tier assignment
8. context branch
9. patch branch
10. raw asset shares
11. default zero-adjustment settlement mode
12. journal diff
13. UI/demo QA afterward

## Review annotation
- This order gets buyer value and algorithmic correctness before demo polish.

---

# 28. Final locked decisions

1. GitHub-only trusted integration
2. precise GitHub UX is: buyer makes `ENGI-...` branch + PR; ENGI branches from it and PRs back into it
3. need-side benchmark measurement is first-class
4. applicability removed; use need match only
5. trust removed as a fuzzy category
6. replace trust with verification determinisms:
   - issuance verification
   - provenance verification
   - verification sufficiency
   - issuer policy status
7. issuer policy status replaces vague reputation
8. path fit is inside need match
9. ranking is holistic usefulness measurement:
   - need match
   - benchmark impact
   - actionability
   - penalties
10. default v1 settlement uses zero adjustment: settled == raw
11. accounting is a structured journal diff under exact fixed-point math
13. GitHub Actions inputs are canonicalized, not provider-abstracted

---

# 29. Sensitive data, identity, and cross-cutting proof model

## 29.1 Overview

**Responsibility:** specify the cross-cutting controls and proofs that connect sensitive data handling, identity/authorization, inference synthesis, asset measurement, selection, journaling, and settlement.

**Inputs:** all private source material, inferred measurements, verification evidence, principal identities, asset-pack selections, and settlement artifacts.

**Outputs:** explicit data-flow records, authorization decisions, proof obligations, and a system proof bundle.

**Hand-off:** this section defines system-wide rules that every earlier subsystem MUST satisfy.

## 29.2 Sensitive data classes

```ts
type SensitiveDataClass =
  | 'repo-private-source'
  | 'licensed-source-material'
  | 'private-branch-derived-artifact'
  | 'verification-evidence'
  | 'settlement-preview'
  | 'private-proof-artifact'
  | 'bounded-public-proof-metadata'
```

Rules:
- every persisted artifact MUST declare a `SensitiveDataClass`,
- classes other than `bounded-public-proof-metadata` are private by default,
- class transitions MUST be explicit and justified by policy.

## 29.3 Sensitive data flow model

```ts
type SensitiveDataFlowRecord = {
  recordId: string
  dataClass: SensitiveDataClass
  fromSurface: string
  toSurface: string
  transformation: string
  authorizedPrincipals: string[]
  retentionPolicyId: string
  disclosurePolicyId: string
  proofRefs: string[]
}
```

Every sensitive data movement MUST be representable as a `SensitiveDataFlowRecord`.

Examples:
- GitHub private repo source -> ENGI private measurement workspace
- locked asset material -> private remediation branch source-material mount
- settlement journal -> private proof artifact
- private proof artifact -> bounded public proof metadata

## 29.4 Retention, cleanup, and revocation rules

Rules:
- private remediation branches MUST have an explicit retention policy,
- Actions artifacts/logs that reveal licensed material MUST inherit the same or stricter retention policy,
- revocation MUST block new delivery and settlement-open transitions,
- cleanup MUST remove or disable access to private delivery artifacts when policy requires,
- bounded public proof metadata MAY outlive private delivery artifacts only if policy explicitly permits.

## 29.5 Identity and authorization model

```ts
type PrincipalClass =
  | 'buyer-principal'
  | 'engi-system-principal'
  | 'authorized-reviewer'
  | 'issuer-principal'
  | 'public-reader'

type IdentityBinding = {
  principalId: string
  principalClass: PrincipalClass
  authSource: 'github' | 'attestation' | 'policy'
  boundRefs: string[]
}

type AuthorizationDecision = {
  principalId: string
  action: string
  resourceRef: string
  decision: 'allow' | 'deny'
  policyRef: string
  reasons: string[]
}
```

Every action that can reveal, transform, or settle sensitive material MUST be covered by an `AuthorizationDecision`.

## 29.6 Inference synthesis proof obligations

Inference synthesis proofs/checks MUST establish:
1. every inferred field references declared static evidence,
2. no prompted inference is treated as if it were static measurement,
3. prompt/model identity is recorded,
4. repeated execution over the same declared inputs is replayable at the trace level,
5. each inference output field has a declared responsible evaluator.

```ts
type InferenceSynthesisProof = {
  outputField: string
  evidenceRefs: string[]
  promptOrEvaluatorId: string
  modelId: string
  replayableTrace: boolean
  admissible: boolean
}
```

## 29.7 Asset measurement model and proof obligations

```ts
type AssetMeasurement = {
  assetId: string
  measuredFields: {
    symbols?: string[]
    paths?: string[]
    configKeys?: string[]
    stackTags?: string[]
    constraints?: string[]
  }
  provenance: MeasurementProvenance[]
}

type AssetMeasurementProof = {
  assetId: string
  contentRoot: string
  unitRefs: string[]
  measurementsTraceableToUnits: boolean
  measurementReplayable: boolean
  measurementPolicySatisfied: boolean
}
```

Asset-measurement proofs/checks MUST establish:
1. measured fields are traceable to content units or declared inference over those units,
2. selected assets cannot participate in branching or settlement without a measurement trace,
3. measurement replay over the same content root is stable up to declared tool/prompt versions.

## 29.8 Selection, use-tier, and delivery consistency proofs

```ts
type SelectionConsistencyProof = {
  assetPackId: string
  branchMode: 'context' | 'patch'
  allSelectedAssetsRespectUseTier: boolean
  allMaterializedAssetsRespectVisibilityRules: boolean
  settlementConsumesOnlySettlementEligibleAssets: boolean
}
```

Selection consistency proofs/checks MUST establish:
1. branch materialization uses only candidates allowed for that branch mode,
2. settlement consumes only `settlement-eligible` assets,
3. no `rank-only` candidate is materialized into private source delivery,
4. no disallowed asset receives shares.

## 29.9 Accounting and journaling completeness proofs

```ts
type JournalCompletenessProof = {
  eventId: string
  allRequiredReasonsCovered: boolean
  noUnclassifiedTransfers: boolean
  eventRefsConsistent: boolean
  replayableJournal: boolean
}
```

Accounting/journaling proofs/checks MUST establish:
1. every movement of value is represented by a journal entry,
2. every journal entry uses an allowed `JournalReason`,
3. no hidden transfer exists outside the journal,
4. journal replay reconstructs the same settled state and proof hashes.

## 29.10 Identity and authorization proof obligations

```ts
type IdentityAuthorizationProof = {
  resourceRef: string
  allAccessBoundToKnownPrincipals: boolean
  allStateChangingActionsAuthorized: boolean
  issuerIdentityBound: boolean
  buyerDeliveryPrincipalsBound: boolean
}
```

Identity/authorization proofs/checks MUST establish:
1. only known principals can read private delivery surfaces,
2. only authorized principals can trigger settlement,
3. issuer identities remain bound to the assets they issued,
4. delivery-open transitions cannot occur without buyer-authorized delivery principals.

## 29.11 Sensitive data flow proof obligations

```ts
type SensitiveDataFlowProof = {
  allPrivateArtifactsClassified: boolean
  allFlowsRecorded: boolean
  noUnauthorizedPublicDisclosure: boolean
  retentionPoliciesAssigned: boolean
  revocationBehaviorDefined: boolean
}
```

Sensitive-data-flow proofs/checks MUST establish:
1. every private artifact has a declared confidentiality class,
2. every cross-surface movement is recorded,
3. no private artifact becomes public except through a declared bounded-disclosure transition,
4. retention and cleanup policies exist for every private surface,
5. revocation behavior is defined for every private delivery class.

## 29.12 System proof bundle

```ts
type SystemProofBundle = {
  needId: string
  assetPackId: string
  inferenceProofs: InferenceSynthesisProof[]
  assetMeasurementProofs: AssetMeasurementProof[]
  selectionConsistencyProof: SelectionConsistencyProof
  journalCompletenessProof: JournalCompletenessProof
  identityAuthorizationProof: IdentityAuthorizationProof
  sensitiveDataFlowProof: SensitiveDataFlowProof
  settlementProof: SettlementProof
}
```

Rules:
- `system-proof-bundle.json` SHOULD be persisted in the private remediation surface,
- bounded public proof surfaces MAY expose hashes or summary booleans from the bundle,
- private bundle internals MUST remain under the private delivery boundary unless policy explicitly permits disclosure.

## Review annotation
- This section upgrades the spec from settlement-only proofing to a system-wide proof model spanning sensitive data, inference synthesis, asset measurement, identity, selection, journaling, and settlement.

---

# APPENDIX A — Precise type appendix

```ts
type ArtifactKind =
  | 'code'
  | 'patch'
  | 'runbook'
  | 'config'
  | 'incident-note'
  | 'proof'
  | 'design-doc'
  | 'benchmark-trace'
  | 'mixed'

type GitHubNeedDescriptor = {
  needId: string
  repo: string
  installationId: string
  baseRef: string
  targetRef?: string
  prNumber?: number
  benchmarkHarnessPath: string
  benchmarkWorkflowPath?: string
  benchmarkRunId?: string
  benchmarkRunUrl?: string
  task: string
  failureModes: string[]
  constraints: string[]
  targetArtifactKinds: ArtifactKind[]
  stackHints: string[]
  touchedPaths: string[]
  extractedSymbols: string[]
  configKeys: string[]
  failingCases: string[]
  weakDimensions: string[]
  baselineMetrics: Record<string, number>
  humanPrompt?: string
}

type ContentUnit = {
  unitId: string
  assetId: string
  unitKind: 'text' | 'code-block' | 'config-block' | 'proof-block' | 'test-block' | 'mixed'
  text: string
  embeddings: {
    taskVector?: number[]
    failureModeVector?: number[]
    technicalContextVector?: number[]
  }
  extracted: {
    symbols: string[]
    paths: string[]
    configKeys: string[]
    stackTags: string[]
    constraints: string[]
  }
}

type MeasurementProvenance = {
  mode: 'static' | 'inferred' | 'hybrid'
  toolOrPromptId: string
  version: string
  evidenceRefs: string[]
}

type CandidateAsset = {
  assetId: string
  depositedAt: string
  title: string
  artifactKind: ArtifactKind
  sourceMaterialBinding?: SourceMaterialBinding
  contentRoot: string
  contentUnits: ContentUnit[]
  attestations: Attestation[]
  provenanceBinding?: ProvenanceBinding
  verificationEvidence?: VerificationEvidence
  metadata: {
    sourceRepo?: string
    sourceCommit?: string
    sourcePaths?: string[]
    tags: string[]
    declaredStacks?: string[]
    declaredConstraints?: string[]
  }
}

type NeedMatchScore = {
  taskSemanticFit: number
  failureModeFit: number
  symbolFit: number
  pathFit: number
  stackFit: number
  constraintFit: number
  artifactKindFit: number
  lexicalSupport: number
}

type BenchmarkImpactScore = {
  likelyImprovesFailingCases: number
  likelyImprovesWeakDimensions: number
  likelyGeneralizesToRepoContext: number
}

type ActionabilityScore = {
  remediationSpecificity: number
  implementationSpecificity: number
  operationalUsability: number
}

type RankingPenalty =
  | 'stale-version-mismatch'
  | 'repo-context-mismatch'
  | 'constraint-conflict'
  | 'generic-content'
  | 'artifact-kind-mismatch'
  | 'weak-benchmark-linkage'

type CandidateRanking = {
  needMatch: NeedMatchScore
  benchmarkImpact: BenchmarkImpactScore
  actionability: ActionabilityScore
  rankingPenalties: RankingPenalty[]
}

type IssuanceVerification = {
  hasSignerAddresses: boolean
  signatureChecksPass: boolean
  signedPayloadHashMatchesContentRoot: boolean
  cosignRequirementSatisfied: boolean
  reasons: string[]
}

type ProvenanceVerification = {
  sourceProviderIsGitHub: boolean
  repoBindingPresent: boolean
  commitBindingPresent: boolean
  pathBindingPresent: boolean
  workflowBindingPresent: boolean
  workflowRunVerifiable: boolean
  metadataCoherent: boolean
  reasons: string[]
}

type VerificationSufficiency = {
  hasTestEvidence: boolean
  hasTypecheckEvidence: boolean
  hasStaticAnalysisEvidence: boolean
  hasBenchmarkEvidence: boolean
  benchmarkEvidenceBoundToGitHubRun: boolean
  hasReproSteps: boolean
  hasPinnedEnvironment: boolean
  scoreTrace: {
    score: number
    thresholdApplied: number
  }
  recommendedUseTier: 'insufficient-for-use' | 'context-only' | 'patch-eligible'
  reasons: string[]
}

type IssuerPolicyStatus = {
  issuerKey: string
  status: 'allowed' | 'unknown' | 'restricted' | 'revoked'
  allowlisted: boolean
  orgBound: boolean
  requiredCosignSatisfied: boolean
  priorAcceptedIssuanceCount: number
  priorRevokedIssuanceCount: number
  reasons: string[]
}

type CandidateVerification = {
  issuanceVerification: IssuanceVerification
  provenanceVerification: ProvenanceVerification
  verificationSufficiency: VerificationSufficiency
  issuerPolicyStatus: IssuerPolicyStatus
}

type CandidateUseTier =
  | 'reject'
  | 'rank-only'
  | 'context-only'
  | 'patch-eligible'
  | 'settlement-eligible'

type EvaluatedCandidate = {
  assetId: string
  ranking: CandidateRanking
  verification: CandidateVerification
  useTier: CandidateUseTier
}

type AssetPack = {
  assetPackId: string
  needId: string
  selectedAssets: string[]
  selectedUnits: string[]
  lockedContentRoots: string[]
  lockedAttestationHashes: string[]
  estimatedBundleScore: number
}

type AssetShareRaw = {
  assetId: string
  shareBp: number
  reasons: string[]
}

type AssetShareSettled = {
  assetId: string
  rawShareBp: number
  settledShareBp: number
  settlementAdjustmentReasons: string[]
}

type JournalReason =
  | 'licensed_bundle_debit'
  | 'contribution_credit'
  | 'settlement_reconciliation'

type JournalEntry = {
  entryId: string
  account: string
  delta: bigint
  reason: JournalReason
  eventId: string
  bundleId: string
  needId: string
  assetId?: string
  unitRefs?: string[]
  issuerKey?: string
  receiptRef: string
  explanation: string
}

type JournalDiff = {
  eventId: string
  needId: string
  bundleId: string
  beforeRoot: string
  afterRoot: string
  debits: JournalEntry[]
  credits: JournalEntry[]
  beforeBalances: Record<string, bigint>
  afterBalances: Record<string, bigint>
  rawShares: AssetShareRaw[]
  settledShares: AssetShareSettled[]
  invariants: {
    debitsEqualCredits: boolean
    noNegativeBalances: boolean
    rawSharesNormalized: boolean
    settledSharesNormalized: boolean
    receiptChainValid: boolean
    refsClosed: boolean
    settledEqualsRaw: boolean
  }
  totals: {
    debited: bigint
    credited: bigint
    difference: bigint
  }
}
```

---

# APPENDIX B — Function signatures and pseudocode appendix

## B.1 Need measurement

```ts
function measureNeedFromGitHub(
  githubCtx: GitHubContext,
  benchmarkCtx: BenchmarkContext,
  humanPrompt?: string
): NeedMeasurementOutput
```

```ts
function measureNeedFromGitHub(githubCtx, benchmarkCtx, humanPrompt) {
  // Static extraction from repo/workflow artifacts.
  const touchedPaths = inferTouchedPaths(githubCtx, benchmarkCtx)
  const extractedSymbols = inferRelevantSymbols(githubCtx, benchmarkCtx)
  const configKeys = inferRelevantConfigKeys(githubCtx, benchmarkCtx)

  // Inferred synthesis over static inputs.
  return {
    needDescriptor: {
      needId: makeNeedId(githubCtx, benchmarkCtx),
      repo: githubCtx.repo,
      installationId: githubCtx.installationId,
      baseRef: githubCtx.baseRef,
      targetRef: githubCtx.targetRef,
      benchmarkHarnessPath: benchmarkCtx.harnessPath,
      benchmarkWorkflowPath: benchmarkCtx.workflowPath,
      benchmarkRunId: benchmarkCtx.runId,
      benchmarkRunUrl: benchmarkCtx.runUrl,
      task: inferTask(benchmarkCtx, humanPrompt),
      failureModes: inferFailureModes(benchmarkCtx),
      constraints: inferConstraints(benchmarkCtx, githubCtx),
      targetArtifactKinds: inferTargetArtifactKinds(benchmarkCtx),
      stackHints: inferStackHints(githubCtx),
      touchedPaths,
      extractedSymbols,
      configKeys,
      failingCases: benchmarkCtx.failingCases,
      weakDimensions: benchmarkCtx.weakDimensions,
      baselineMetrics: benchmarkCtx.baselineMetrics,
      humanPrompt
    },
    benchmarkTarget: {
      harnessPath: benchmarkCtx.harnessPath,
      runId: benchmarkCtx.runId,
      failingCases: benchmarkCtx.failingCases,
      weakDimensions: benchmarkCtx.weakDimensions,
      baselineMetrics: benchmarkCtx.baselineMetrics
    }
  }
}
```

## B.2 Need match

```ts
function computeNeedMatch(
  need: GitHubNeedDescriptor,
  asset: CandidateAsset
): NeedMatchScore
```

```ts
function computeNeedMatch(need, asset) {
  return {
    taskSemanticFit: scoreTaskSemanticFit(need, asset),
    failureModeFit: scoreFailureModeFit(need, asset),
    symbolFit: scoreSymbolFit(need, asset),
    pathFit: scorePathFit(need, asset),
    stackFit: scoreStackFit(need, asset),
    constraintFit: scoreConstraintFit(need, asset),
    artifactKindFit: scoreArtifactKindFit(need, asset),
    lexicalSupport: scoreLexicalSupport(need, asset)
  }
}
```

## B.3 Benchmark impact

```ts
function estimateBenchmarkImpact(
  need: GitHubNeedDescriptor,
  asset: CandidateAsset
): BenchmarkImpactScore
```

```ts
function estimateBenchmarkImpact(need, asset) {
  return {
    likelyImprovesFailingCases: scoreFailingCaseImpact(need, asset),
    likelyImprovesWeakDimensions: scoreWeakDimensionImpact(need, asset),
    likelyGeneralizesToRepoContext: scoreRepoContextGeneralization(need, asset)
  }
}
```

## B.4 Actionability

```ts
function computeActionability(
  need: GitHubNeedDescriptor,
  asset: CandidateAsset
): ActionabilityScore
```

```ts
function computeActionability(need, asset) {
  return {
    remediationSpecificity: scoreRemediationSpecificity(need, asset),
    implementationSpecificity: scoreImplementationSpecificity(asset),
    operationalUsability: scoreOperationalUsability(need, asset)
  }
}
```

## B.5 Issuance verification

```ts
function checkIssuanceVerification(
  asset: CandidateAsset,
  policyState: PolicyState
): IssuanceVerification
```

```ts
function checkIssuanceVerification(asset, policyState) {
  const hasSignerAddresses = asset.attestations.length > 0
  const signatureChecksPass = verifyAttestationSignatures(asset.attestations)
  const signedPayloadHashMatchesContentRoot = verifyPayloadHash(asset)
  const cosignRequirementSatisfied = checkCosignPolicy(asset, policyState)

  return {
    hasSignerAddresses,
    signatureChecksPass,
    signedPayloadHashMatchesContentRoot,
    cosignRequirementSatisfied,
    reasons: collectIssuanceReasons(...)
  }
}
```

## B.6 Provenance verification

```ts
function checkProvenanceVerification(
  asset: CandidateAsset,
  githubCtx: GitHubContext
): ProvenanceVerification
```

```ts
function checkProvenanceVerification(asset, githubCtx) {
  const sourceProviderIsGitHub = asset.provenanceBinding?.provider === 'github'
  const repoBindingPresent = !!asset.provenanceBinding?.repo
  const commitBindingPresent = !!asset.provenanceBinding?.commit
  const pathBindingPresent = !!asset.provenanceBinding?.paths?.length
  const workflowBindingPresent = !!asset.provenanceBinding?.workflowPath
  const workflowRunVerifiable = verifyWorkflowRun(asset.provenanceBinding)
  const metadataCoherent = checkProvenanceCoherence(asset.provenanceBinding, githubCtx)

  return {
    sourceProviderIsGitHub,
    repoBindingPresent,
    commitBindingPresent,
    pathBindingPresent,
    workflowBindingPresent,
    workflowRunVerifiable,
    metadataCoherent,
    reasons: collectProvenanceReasons(...)
  }
}
```

## B.7 Verification sufficiency

```ts
function checkVerificationSufficiency(
  asset: CandidateAsset,
  need: GitHubNeedDescriptor
): VerificationSufficiency
```

```ts
function checkVerificationSufficiency(asset, need) {
  const hasTestEvidence = !!asset.verificationEvidence?.testsPassed
  const hasTypecheckEvidence = !!asset.verificationEvidence?.typecheckPassed
  const hasStaticAnalysisEvidence = !!asset.verificationEvidence?.staticAnalysisPassed
  const hasBenchmarkEvidence = !!asset.verificationEvidence?.benchmarkRan
  const benchmarkEvidenceBoundToGitHubRun = !!asset.verificationEvidence?.benchmarkRunId
  const hasReproSteps = !!asset.verificationEvidence?.reproSteps
  const hasPinnedEnvironment = !!asset.verificationEvidence?.pinnedEnvironment

  const score = weightedAverage([
    [hasTestEvidence, 0.20],
    [hasTypecheckEvidence, 0.15],
    [hasStaticAnalysisEvidence, 0.10],
    [hasBenchmarkEvidence, 0.20],
    [benchmarkEvidenceBoundToGitHubRun, 0.15],
    [hasReproSteps, 0.10],
    [hasPinnedEnvironment, 0.10]
  ])

  return {
    hasTestEvidence,
    hasTypecheckEvidence,
    hasStaticAnalysisEvidence,
    hasBenchmarkEvidence,
    benchmarkEvidenceBoundToGitHubRun,
    hasReproSteps,
    hasPinnedEnvironment,
    scoreTrace: { score, thresholdApplied: score < 0.25 ? 0.25 : (score < 0.60 ? 0.60 : 1.0) },
    recommendedUseTier: decideVerificationUseTier(score),
    reasons: collectVerificationReasons(...)
  }
}
```

## B.8 Issuer policy status

```ts
function checkIssuerPolicyStatus(
  asset: CandidateAsset,
  policyState: PolicyState
): IssuerPolicyStatus
```

```ts
function checkIssuerPolicyStatus(asset, policyState) {
  const issuerKey = deriveIssuerKey(asset)
  const status = policyState.lookupIssuerStatus(issuerKey)
  const allowlisted = policyState.isAllowlisted(issuerKey)
  const orgBound = policyState.isOrgBound(asset)
  const requiredCosignSatisfied = checkRequiredCosign(asset, policyState)
  const priorAcceptedIssuanceCount = policyState.countAcceptedIssuances(issuerKey)
  const priorRevokedIssuanceCount = policyState.countRevokedIssuances(issuerKey)
  return {
    issuerKey,
    status,
    allowlisted,
    orgBound,
    requiredCosignSatisfied,
    priorAcceptedIssuanceCount,
    priorRevokedIssuanceCount,
    reasons: collectIssuerPolicyReasons(...)
  }
}
```

## B.9 Candidate evaluation

```ts
function evaluateCandidate(
  need: GitHubNeedDescriptor,
  asset: CandidateAsset,
  githubCtx: GitHubContext,
  policyState: PolicyState
): EvaluatedCandidate
```

```ts
function evaluateCandidate(need, asset, githubCtx, policyState) {
  // Usefulness measurement only.
  const ranking = {
    needMatch: computeNeedMatch(need, asset),
    benchmarkImpact: estimateBenchmarkImpact(need, asset),
    actionability: computeActionability(need, asset),
    rankingPenalties: computeRankingPenalties(need, asset)
  }

  // Non-ranking verification determinisms.
  const verification = {
    issuanceVerification: checkIssuanceVerification(asset, policyState),
    provenanceVerification: checkProvenanceVerification(asset, githubCtx),
    verificationSufficiency: checkVerificationSufficiency(asset, need),
    issuerPolicyStatus: checkIssuerPolicyStatus(asset, policyState)
  }

  let useTier = decideCandidateUseTier(verification)
  useTier = upgradeToSettlementEligible(useTier, verification)

  // Downstream systems MUST consume this final use tier, not recompute ad hoc eligibility.

  return {
    assetId: asset.assetId,
    ranking,
    verification,
    useTier
  }
}
```

## B.10 Branch creation

```ts
function makeEngiBranch(
  repoCtx: GitHubContext,
  need: GitHubNeedDescriptor,
  assetPack: AssetPack,
  evaluatedCandidates: EvaluatedCandidate[],
  mode: 'context' | 'patch'
): BranchResult
```

```ts
function makeEngiBranch(repoCtx, need, assetPack, evaluatedCandidates, mode) {
  const branchName = buildBranchName(need)

  // Filter candidates according to branch mode and final use tier.
  const allowedTiers = mode === 'context'
    ? new Set(['context-only', 'patch-eligible', 'settlement-eligible'])
    : new Set(['patch-eligible', 'settlement-eligible'])

  // Create private ENGI remediation branch from buyer ENGI-* branch context.
  gitCreateBranch(repoCtx, branchName)

  // Materialize only source material backed by candidates accepted for this branch mode.
  materializeSelectedSourceMaterial(repoCtx, assetPack, '.engi/source-material', allowedTiers)

  // Write all inspectable manifests.
  writeFile('.engi/need.json', serializeNeed(need))
  writeFile('.engi/match-report.json', buildMatchReport(...))
  writeFile('.engi/verification-report.json', buildVerificationReport(...))
  writeFile('.engi/eval-manifest.json', buildEvalManifest(...))
  writeFile('.engi/asset-pack.lock.json', buildAssetPackLock(assetPack))
  writeFile('.engi/settlement-preview.json', buildSettlementPreview(...))
  writeFile('ENGI_NEED.md', buildNeedMarkdown(...))

  // Optional patch generation.
  if (mode === 'patch') {
    const patch = generatePatchFromAssetPack(need, assetPack)
    applyPatch(repoCtx, patch)
  }

  gitCommit(repoCtx, `ENGI: ${need.task}`)
  return { branchName }
}
```

## B.11 Raw shares

```ts
function computeAssetSharesRaw(
  need: GitHubNeedDescriptor,
  bundle: AssetBundle
): AssetShareRaw[]
```

```ts
function computeAssetSharesRaw(need, bundle) {
  // Score the complete selected bundle.
  const fullScore = evaluateBundleForNeed(need, bundle)

  // Compute leave-one-asset-out contribution.
  const contributions = bundle.assets.map(asset => {
    const reducedBundle = removeAsset(bundle, asset.assetId)
    const reducedScore = evaluateBundleForNeed(need, reducedBundle)
    const marginalContribution = Math.max(0, fullScore - reducedScore)

    return {
      assetId: asset.assetId,
      mass: marginalContribution
    }
  })

  // Normalize to 10000 bp exactly.
  return normalizeMassTo10000(contributions)
}
```

## B.12 Settlement / journal diff

```ts
function settleNeedEvent(
  stateBefore: LedgerState,
  event: NeedSettlementEvent
): { after: LedgerState, diff: JournalDiff }
```

```ts
function settleNeedEvent(stateBefore, event) {
  // Clone state so settlement remains pure until all checks pass and private delivery remains uncommitted.
  const before = cloneState(stateBefore)

  // Settlement may only consume settlement-eligible assets from the final selected bundle.
  const settlementBundle = filterBundleByUseTier(event.bundle, 'settlement-eligible')

  // Compute raw contribution shares.
  const rawShares = computeAssetSharesRaw(event.need, settlementBundle)

  // Default v1 mode: settled shares equal raw shares exactly.
  const settledShares = rawShares.map(item => ({
    assetId: item.assetId,
    rawShareBp: item.shareBp,
    settledShareBp: item.shareBp,
    settlementAdjustmentReasons: []
  }))

  const total = event.meteredMicroUnits

  // Allocate exact micro-units under deterministic tie-breaks.
  const allocations = allocateExactMicroUnits(total, settledShares)

  // Debit buyer license pool.
  const debits = [{
    entryId: makeEntryId(),
    account: `buyer:${event.buyerId}:license_pool`,
    delta: -total,
    reason: 'licensed_bundle_debit',
    eventId: event.eventId,
    bundleId: event.bundleId,
    needId: event.need.needId,
    receiptRef: event.issuanceReceiptId,
    explanation: 'Debit buyer license pool for licensed ENGI bundle issuance.'
  }]

  // Credit supplier pending claims according to exact allocation.
  const credits = allocations.map(a => ({
    entryId: makeEntryId(),
    account: `supplier:${a.assetId}:pending_claims`,
    delta: a.microUnits,
    reason: 'contribution_credit',
    eventId: event.eventId,
    bundleId: event.bundleId,
    needId: event.need.needId,
    assetId: a.assetId,
    unitRefs: unitRefsForAsset(event.bundle, a.assetId),
    receiptRef: event.allocationReceiptId,
    explanation: 'Credit supplier pending claims according to normalized asset share.'
  }))

  // Apply journal to produce after-state.
  const after = applyJournal(before, [...debits, ...credits])

  // Build the full proof object over the transition.
  const diff = buildJournalDiff({
    before,
    after,
    debits,
    credits,
    rawShares,
    settledShares,
    event
  })

  // Enforce required invariants.
  assert(diff.invariants.debitsEqualCredits)
  assert(diff.invariants.noNegativeBalances)
  assert(diff.invariants.rawSharesNormalized)
  assert(diff.invariants.settledSharesNormalized)
  assert(diff.invariants.receiptChainValid)
  assert(diff.invariants.refsClosed)
  assert(diff.invariants.settledEqualsRaw)

  return { after, diff }
}
```

---

## B.13 Sensitive data flow classification

```ts
function recordSensitiveDataFlow(
  record: SensitiveDataFlowRecord
): void
```

```ts
function recordSensitiveDataFlow(record) {
  // Persist a complete trace of every private cross-surface data movement.
  assert(record.dataClass)
  assert(record.fromSurface)
  assert(record.toSurface)
  assert(record.authorizedPrincipals.length > 0)
  persistSensitiveDataFlowRecord(record)
}
```

## B.14 Authorization decision

```ts
function authorizeAction(
  binding: IdentityBinding,
  action: string,
  resourceRef: string,
  policyState: PolicyState
): AuthorizationDecision
```

```ts
function authorizeAction(binding, action, resourceRef, policyState) {
  const decision = policyState.evaluate(binding, action, resourceRef)
  return {
    principalId: binding.principalId,
    action,
    resourceRef,
    decision: decision.allow ? 'allow' : 'deny',
    policyRef: decision.policyRef,
    reasons: decision.reasons
  }
}
```

## B.15 Inference synthesis proof

```ts
function buildInferenceSynthesisProof(
  outputField: string,
  evidenceRefs: string[],
  promptOrEvaluatorId: string,
  modelId: string,
  replayableTrace: boolean
): InferenceSynthesisProof
```

```ts
function buildInferenceSynthesisProof(outputField, evidenceRefs, promptOrEvaluatorId, modelId, replayableTrace) {
  return {
    outputField,
    evidenceRefs,
    promptOrEvaluatorId,
    modelId,
    replayableTrace,
    admissible: evidenceRefs.length > 0 && !!promptOrEvaluatorId && !!modelId
  }
}
```

## B.16 Asset measurement proof

```ts
function buildAssetMeasurementProof(
  asset: CandidateAsset,
  unitRefs: string[],
  provenance: MeasurementProvenance[]
): AssetMeasurementProof
```

```ts
function buildAssetMeasurementProof(asset, unitRefs, provenance) {
  return {
    assetId: asset.assetId,
    contentRoot: asset.contentRoot,
    unitRefs,
    measurementsTraceableToUnits: unitRefs.length > 0,
    measurementReplayable: provenance.length > 0,
    measurementPolicySatisfied: measurementPolicySatisfied(asset, provenance)
  }
}
```

## B.17 Selection consistency proof

```ts
function buildSelectionConsistencyProof(
  assetPack: AssetPack,
  evaluatedCandidates: EvaluatedCandidate[],
  branchMode: 'context' | 'patch',
  settlementBundle: AssetBundle
): SelectionConsistencyProof
```

```ts
function buildSelectionConsistencyProof(assetPack, evaluatedCandidates, branchMode, settlementBundle) {
  return {
    assetPackId: assetPack.assetPackId,
    branchMode,
    allSelectedAssetsRespectUseTier: selectedAssetsRespectUseTier(assetPack, evaluatedCandidates, branchMode),
    allMaterializedAssetsRespectVisibilityRules: materializedAssetsRespectVisibilityRules(assetPack),
    settlementConsumesOnlySettlementEligibleAssets: bundleAssetsAllSettlementEligible(settlementBundle, evaluatedCandidates)
  }
}
```

## B.18 Journal completeness proof

```ts
function buildJournalCompletenessProof(
  eventId: string,
  entries: JournalEntry[]
): JournalCompletenessProof
```

```ts
function buildJournalCompletenessProof(eventId, entries) {
  return {
    eventId,
    allRequiredReasonsCovered: journalReasonsCovered(entries),
    noUnclassifiedTransfers: entries.every(e => !!e.reason),
    eventRefsConsistent: entries.every(e => e.eventId === eventId),
    replayableJournal: journalReplayStable(entries)
  }
}
```

## B.19 Identity and authorization proof

```ts
function buildIdentityAuthorizationProof(
  resourceRef: string,
  accessDecisions: AuthorizationDecision[],
  issuerBindings: IdentityBinding[],
  buyerBindings: IdentityBinding[]
): IdentityAuthorizationProof
```

```ts
function buildIdentityAuthorizationProof(resourceRef, accessDecisions, issuerBindings, buyerBindings) {
  return {
    resourceRef,
    allAccessBoundToKnownPrincipals: accessDecisions.every(d => !!d.principalId),
    allStateChangingActionsAuthorized: accessDecisions.filter(d => stateChangingAction(d.action)).every(d => d.decision === 'allow'),
    issuerIdentityBound: issuerBindings.length > 0,
    buyerDeliveryPrincipalsBound: buyerBindings.length > 0
  }
}
```

## B.20 Sensitive data flow proof

```ts
function buildSensitiveDataFlowProof(
  records: SensitiveDataFlowRecord[]
): SensitiveDataFlowProof
```

```ts
function buildSensitiveDataFlowProof(records) {
  return {
    allPrivateArtifactsClassified: records.every(r => !!r.dataClass),
    allFlowsRecorded: records.length > 0,
    noUnauthorizedPublicDisclosure: records.every(r => !(r.dataClass !== 'bounded-public-proof-metadata' && r.toSurface === 'public')), 
    retentionPoliciesAssigned: records.every(r => !!r.retentionPolicyId),
    revocationBehaviorDefined: records.every(r => !!r.disclosurePolicyId)
  }
}
```

## B.21 System proof bundle

```ts
function buildSystemProofBundle(
  needId: string,
  assetPackId: string,
  inferenceProofs: InferenceSynthesisProof[],
  assetMeasurementProofs: AssetMeasurementProof[],
  selectionConsistencyProof: SelectionConsistencyProof,
  journalCompletenessProof: JournalCompletenessProof,
  identityAuthorizationProof: IdentityAuthorizationProof,
  sensitiveDataFlowProof: SensitiveDataFlowProof,
  settlementProof: SettlementProof
): SystemProofBundle
```

```ts
function buildSystemProofBundle(needId, assetPackId, inferenceProofs, assetMeasurementProofs, selectionConsistencyProof, journalCompletenessProof, identityAuthorizationProof, sensitiveDataFlowProof, settlementProof) {
  return {
    needId,
    assetPackId,
    inferenceProofs,
    assetMeasurementProofs,
    selectionConsistencyProof,
    journalCompletenessProof,
    identityAuthorizationProof,
    sensitiveDataFlowProof,
    settlementProof
  }
}
```

# APPENDIX B2 — Inference appendix: prompts, context injectables, and payload schemas

This appendix defines the complete inference surface for ENGI v1. It complements the main spec sections on inference provenance, ranking, verification determinisms, and proof obligations by specifying:
- the static prompt template shape for each evaluator,
- the dynamic context injectables that may be inserted,
- why each injectable exists,
- the exact parsable completion payload expected from the evaluator.

All inference in ENGI MUST conform to this appendix.

## B2.1 Inference design rules

Rules:
- every prompted inference MUST use a declared evaluator id,
- every evaluator MUST separate static prompt text from injected runtime context,
- every injected context field MUST be traceable to declared static evidence or prior canonical system objects,
- every completion MUST parse into a declared payload type,
- completions that do not parse MUST fail the evaluator call,
- prompted inference MUST NOT be treated as a source of undeclared facts.

## B2.2 Universal evaluator envelope

```ts
type EvaluatorRequestEnvelope = {
  evaluatorId: string
  evaluatorVersion: string
  staticTemplateId: string
  modelId: string
  expectedPayloadType: string
  staticTokens: {
    system: string
    instructions: string
    outputContract: string
  }
  contextInjectables: Record<string, unknown>
}
```

```ts
type EvaluatorResponseEnvelope<TPayload> = {
  evaluatorId: string
  evaluatorVersion: string
  modelId: string
  payloadType: string
  payload: TPayload
  parseOk: boolean
}
```

### Meaning of fields

- `evaluatorId`: the canonical evaluator name used by telemetry, proofs, and replay
- `evaluatorVersion`: the version of that evaluator's prompt contract
- `staticTemplateId`: the immutable template identifier for the evaluator
- `modelId`: the exact model used for the inference
- `expectedPayloadType`: the declared payload schema name
- `staticTokens`: the fixed non-injected prompt text
- `contextInjectables`: the runtime-bound inputs inserted into the template

## B2.3 Static prompt template vs context injectables

### Static prompt template

Static prompt text contains:
- evaluator role definition,
- task framing,
- scoring/output instructions,
- refusal to invent facts,
- output schema contract,
- parse-only formatting constraints.

Static prompt text MUST NOT contain repo-specific or run-specific facts directly hardcoded into the template.

### Context injectables

Context injectables contain runtime inputs such as:
- need descriptor fields,
- benchmark evidence,
- extracted symbols/paths/config keys,
- candidate content or summaries,
- verification evidence,
- prior canonical scores where allowed.

Context injectables exist because the evaluator must operate on the current measured need and current candidate, not on hardcoded examples.

## B2.4 Canonical context injectable catalog

```ts
type CanonicalContextInjectables = {
  needDescriptor?: GitHubNeedDescriptor
  candidateAsset?: CandidateAsset
  candidateUnit?: ContentUnit
  benchmarkTarget?: NeedMeasurementOutput['benchmarkTarget']
  staticMeasurements?: MeasurementProvenance[]
  verificationEvidence?: VerificationEvidence
  provenanceBinding?: ProvenanceBinding
  attestationSummary?: {
    signerAddresses: string[]
    issuerKey?: string
    cosignCount?: number
  }
  branchMode?: 'context' | 'patch'
  priorScores?: Record<string, number>
}
```

### Why these injectables are needed

- `needDescriptor`: gives the evaluator the measured engineering demand
- `candidateAsset` / `candidateUnit`: gives the evaluator the supply candidate under review
- `benchmarkTarget`: ties the evaluator to the exact failing slice
- `staticMeasurements`: lets the evaluator reason over already-extracted facts without re-inventing them
- `verificationEvidence` / `provenanceBinding` / `attestationSummary`: support verification-side inference
- `branchMode`: constrains branch-use reasoning where needed
- `priorScores`: allows narrowly scoped later evaluators to use earlier canonical numeric outputs when the evaluator contract permits it

## B2.5 Need match evaluator

### Evaluator id
`ranking.need_match.v1`

### Purpose
Produce inferred parts of need-match scoring that cannot be derived purely from deterministic extraction.

### Static template

```text
You are evaluating whether a candidate technical content item contributes to resolving a measured engineering need in a GitHub repository.

Use only the supplied need descriptor, benchmark evidence, static measurements, and candidate content.
Do not invent missing repository facts.
Do not rewrite the task.
Score only what is requested.
Return only a valid JSON payload matching the declared schema.
```

### Context injectables

```ts
type NeedMatchEvaluatorContext = {
  needDescriptor: GitHubNeedDescriptor
  benchmarkTarget: NeedMeasurementOutput['benchmarkTarget']
  candidateAsset: CandidateAsset
  candidateUnit?: ContentUnit
  staticMeasurements: MeasurementProvenance[]
}
```

### Why these injectables are needed
- the need descriptor states the measured buyer demand
- the benchmark target grounds the evaluator in the exact failing slice
- the candidate asset/unit provides the supply candidate being judged
- the static measurements constrain the model to declared evidence

### Expected payload

```ts
type NeedMatchEvaluatorPayload = {
  taskSemanticFit: number
  failureModeFit: number
  constraintFit: number
  artifactKindFit: number
  notes: string[]
}
```

## B2.6 Benchmark impact evaluator

### Evaluator id
`ranking.benchmark_impact.v1`

### Purpose
Estimate whether the candidate is likely to improve the measured failing cases and weak dimensions.

### Static template

```text
You are evaluating whether a candidate technical content item is likely to improve measured benchmark weaknesses for a technical AI product.

Reason only from the supplied benchmark evidence, need descriptor, and candidate content.
Do not assume improvements not justified by the evidence.
Return only valid JSON matching the declared schema.
```

### Context injectables

```ts
type BenchmarkImpactEvaluatorContext = {
  needDescriptor: GitHubNeedDescriptor
  benchmarkTarget: NeedMeasurementOutput['benchmarkTarget']
  candidateAsset: CandidateAsset
  candidateUnit?: ContentUnit
  staticMeasurements: MeasurementProvenance[]
}
```

### Expected payload

```ts
type BenchmarkImpactEvaluatorPayload = {
  likelyImprovesFailingCases: number
  likelyImprovesWeakDimensions: number
  likelyGeneralizesToRepoContext: number
  notes: string[]
}
```

## B2.7 Actionability evaluator

### Evaluator id
`ranking.actionability.v1`

### Purpose
Determine whether the candidate is operationalizable into a private remediation branch workflow.

### Static template

```text
You are evaluating whether a candidate technical content item can be operationalized into an ENGI remediation workflow.

Consider remediation specificity, implementation specificity, and operational usability.
Use only the provided measured need, candidate content, and static measurements.
Return only valid JSON matching the declared schema.
```

### Context injectables

```ts
type ActionabilityEvaluatorContext = {
  needDescriptor: GitHubNeedDescriptor
  candidateAsset: CandidateAsset
  candidateUnit?: ContentUnit
  staticMeasurements: MeasurementProvenance[]
  branchMode?: 'context' | 'patch'
}
```

### Expected payload

```ts
type ActionabilityEvaluatorPayload = {
  remediationSpecificity: number
  implementationSpecificity: number
  operationalUsability: number
  notes: string[]
}
```

## B2.8 Technical coherence evaluator

### Evaluator id
`verification.technical_coherence.v1`

### Purpose
Support verification sufficiency by detecting false specificity, genericity, and incoherent technical content.

### Static template

```text
You are evaluating whether a candidate technical content item is technically coherent enough to support private ENGI delivery.

Use only the supplied candidate content and static measurements.
Do not assume missing implementation details.
Return only valid JSON matching the declared schema.
```

### Context injectables

```ts
type TechnicalCoherenceEvaluatorContext = {
  candidateAsset: CandidateAsset
  candidateUnit?: ContentUnit
  staticMeasurements: MeasurementProvenance[]
}
```

### Expected payload

```ts
type TechnicalCoherenceEvaluatorPayload = {
  falseSpecificityRisk: number
  genericityRisk: number
  coherenceOk: boolean
  notes: string[]
}
```

## B2.9 Provenance/verification evaluator

### Evaluator id
`verification.provenance_sufficiency.v1`

### Purpose
Support provenance verification and verification sufficiency where deterministic evidence exists but needs bounded interpretation.

### Static template

```text
You are evaluating whether the supplied provenance and verification evidence is sufficient to support ENGI private delivery and, where permitted, settlement eligibility.

Use only the supplied provenance binding, verification evidence, attestation summary, and static measurements.
Do not invent evidence.
Return only valid JSON matching the declared schema.
```

### Context injectables

```ts
type ProvenanceVerificationEvaluatorContext = {
  provenanceBinding?: ProvenanceBinding
  verificationEvidence?: VerificationEvidence
  attestationSummary?: {
    signerAddresses: string[]
    issuerKey?: string
    cosignCount?: number
  }
  staticMeasurements?: MeasurementProvenance[]
}
```

### Expected payload

```ts
type ProvenanceVerificationEvaluatorPayload = {
  provenanceSupportsUse: boolean
  verificationSupportsUse: boolean
  notes: string[]
}
```

## B2.10 Selection-consistency evaluator (optional)

### Evaluator id
`proof.selection_consistency.v1`

### Purpose
Provide bounded interpretive support when deterministic selection-consistency checks need explanatory narrative, not canonical truth.

### Static template

```text
You are explaining a selection-consistency decision already computed by ENGI.

Do not change the decision.
Do not invent new facts.
Summarize why the selected assets, use tiers, and branch mode are mutually consistent.
Return only valid JSON matching the declared schema.
```

### Context injectables

```ts
type SelectionConsistencyEvaluatorContext = {
  assetPack: AssetPack
  evaluatedCandidates: EvaluatedCandidate[]
  branchMode: 'context' | 'patch'
}
```

### Expected payload

```ts
type SelectionConsistencyEvaluatorPayload = {
  summary: string
  notes: string[]
}
```

## B2.11 Parsable completion contract

All evaluator completions MUST satisfy:
- valid JSON,
- exact top-level payload shape for the declared evaluator,
- numeric fields in the expected range where applicable,
- no extraneous explanation outside the JSON payload.

If parsing fails, ENGI MUST:
1. mark the evaluator call as failed,
2. reject the completion,
3. emit telemetry containing the parse failure,
4. avoid silently falling back to free-form prose.

## B2.12 Inference hand-off rules

Inference outputs MAY feed only the fields their evaluator contract owns.

Examples:
- `ranking.need_match.v1` may populate inferred need-match fields only
- `ranking.benchmark_impact.v1` may populate benchmark-impact fields only
- `ranking.actionability.v1` may populate actionability fields only
- verification-side evaluators may support verification determinations but MUST NOT override deterministic cryptographic/provenance failures

No evaluator may directly assign:
- final candidate use tier,
- final asset shares,
- final journal entries,
- final settlement state.

Those remain deterministic system responsibilities.

## B2.13 Inference telemetry requirements

For every evaluator call, ENGI SHOULD record:
- evaluator id/version,
- model id/version,
- prompt template id,
- injected context keys,
- evidence refs,
- parse result,
- payload hash,
- any threshold or downstream field written from the payload.

## Review annotation
- This appendix makes the inference surface complete and explicit: static template text, runtime context injectables, why each injectable exists, and the exact parsable payload each evaluator must return.

# APPENDIX C — Readthrough guide

These are the exact points I would want the next pass on:

1. GitHub-specificity
   - Is the `sourceProvider`/`buildSystem` split now precise enough without duplication?
   - Is the parser-failure contract explicit enough?

2. Need match
   - Are the eight subcomponents complete and non-duplicative?

3. Actionability
   - Are the distinctions between remediation specificity, implementation specificity, and operational usability now clear enough?

4. Verification determinisms
   - Are issuance verification, provenance verification, verification sufficiency, and issuer policy status the right exact replacement for “trust”?

5. Issuer policy status
   - Does this fully replace “reputation” in a bounded, policy-like way?

6. Ranking vs verification determinisms
   - Does the separation now feel clean and enforceable?

7. Branch UX
   - Does the `ENGI-...` branch → ENGI remediation branch → PR back flow read correctly?
   - Is it clear enough that the remediation branch contains source material artifacts or canonical mounted copies?

8. Confidentiality / delivery boundary
   - Is private remediation branch behavior now precise enough?
   - Is public-vs-private repo behavior sufficiently explicit?

9. Settlement
   - Is the default zero-adjustment mode the right v1 lock?
   - Is the lifecycle/atomicity model precise enough?

10. Journal diff
   - Is the structured `reason` + `explanation` shape precise enough to follow?
   - Are journal-reason coverage and account namespace semantics complete enough?

11. Deliverables
   - Are the final private/public deliverables and their tier/confidentiality dependencies explicit enough?

12. Sensitive data flow
   - Are all sensitive-data classes, transitions, retention rules, and disclosure boundaries explicit enough?

13. Identity and authorization
   - Are principal bindings and authorization decisions complete enough for deposit, materialization, settlement, and delivery?

14. Proof model
   - Do the proof obligations now cover inference synthesis, asset measurement, selection consistency, journaling completeness, identity, and data flow?

15. One-liner / core contract
   - Does this read right?

> ENGI first scores candidate technical content for need match, benchmark impact likelihood, and actionability; then separately applies issuance verification, provenance verification, verification sufficiency, and issuer policy status before branching or settlement.

---

# APPENDIX D — End-to-end buyer scenarios for generative technical AI enterprises

These scenarios are written as end-to-end buyer flows. Each one focuses on a different technical-AI product weakness, the measured need that ENGI would infer from GitHub repository state and GitHub Actions evidence, the kinds of engineering intelligence supply ENGI would select, the private branch and settlement flow, and the customer outcome the buyer is trying to improve.

## D.1 Code-generation agent: safe auth-migration rollback

**Buyer:** a company shipping a code-generation agent for enterprise application teams.

**Buyer product weakness:** the agent underperforms on benchmark slices involving safe rollback of auth migrations in large monorepos. It can suggest code changes, but it often misses issuer checks, session-validity invariants, and rollback ordering constraints.

**Measured need:**
- failing benchmark cases for auth rollback,
- weak dimensions around correctness under repository constraints,
- touched paths in auth validators and config loaders,
- relevant symbols around issuer validation, session cache handling, and fallback verifier state.

**Selected engineering intelligence supply:**
- implementation code for validator fixes,
- narrowly scoped rollback patches,
- config artifacts covering fallback verifier state,
- proof-bearing material on preserved invariants.

**ENGI walkthrough:**
1. the buyer creates an `ENGI-auth-rollback` branch and opens a PR,
2. GitHub Actions runs benchmark/test workflows,
3. ENGI measures the auth-rollback need from failing cases, touched paths, symbols, and benchmark deficits,
4. ENGI ranks and verifies candidate supply,
5. ENGI creates a private remediation branch,
6. ENGI materializes the selected source material and writes manifests,
7. ENGI stages a patch branch candidate,
8. ENGI computes raw shares across settlement-eligible assets,
9. ENGI settles the event and records the journal diff,
10. ENGI opens delivery back to the buyer branch when confidentiality and settlement conditions are satisfied.

**Customer outcome:** the buyer's coding agent improves on measured rollback tasks used by enterprise engineering teams, reducing unsafe suggestions and increasing success on production-remediation workflows.

## D.2 Debugging agent: root-cause identification under production traces

**Buyer:** a company shipping a debugging and incident-analysis agent for backend teams.

**Buyer product weakness:** the agent sees logs and traces but fails to identify the actual failure mode, over-indexing on superficial stack-trace language rather than repository-specific causes.

**Measured need:**
- failing benchmark cases for root-cause diagnosis,
- weak dimensions around failure-mode localization,
- touched paths across trace ingestion, error classifiers, and auth/session services,
- benchmark artifacts showing confusion between symptom and cause.

**Selected engineering intelligence supply:**
- incident notes with exact failure signatures,
- code tied to the implicated services,
- design notes explaining causal boundaries,
- benchmark traces aligned to the same failure mode.

**ENGI walkthrough:**
1. benchmark/test artifacts are normalized into canonical failing cases,
2. ENGI measures the root-cause-diagnosis need,
3. ENGI recalls failure-mode-aligned assets across vector, lexical, symbol, and benchmark-trace channels,
4. ENGI filters out inadequately verified assets from branch use,
5. ENGI creates a private context branch rather than a patch-first branch,
6. ENGI includes the selected source material, match rationale, and settlement preview,
7. ENGI settles privately if the delivery is accepted.

**Customer outcome:** the buyer's debugging agent improves its ability to distinguish root cause from downstream symptom, making diagnoses more useful to engineering customers under time pressure.

## D.3 Code-review agent: unsafe patch detection and correction

**Buyer:** a company shipping an AI PR-review agent for enterprise software teams.

**Buyer product weakness:** the agent flags style issues but misses logically unsafe remediation steps in security- or auth-sensitive code changes.

**Measured need:**
- benchmark failures on review tasks involving invariant preservation,
- weak dimensions around identifying unsafe edits,
- repository context tied to validator and config diff surfaces,
- expected review comments missing constraint-preserving alternatives.

**Selected engineering intelligence supply:**
- proof and invariant materials,
- precise patches showing safe alternatives,
- design docs describing why one remediation strategy is safe and another is not,
- review-oriented benchmark traces.

**ENGI walkthrough:**
1. ENGI measures the review-specific need from PR-focused benchmark evidence,
2. ENGI ranks materials that improve both constraint fit and benchmark impact,
3. ENGI uses verification determinisms to keep weakly evidenced assets out of patch-grade delivery,
4. ENGI creates a private remediation branch containing review-ready material and, where appropriate, patch proposals that demonstrate a safer path,
5. ENGI settles only over the locked selected assets that survive settlement eligibility.

**Customer outcome:** the buyer's PR-review agent gives stronger engineering feedback to its customers, especially where correctness and safety matter more than stylistic coverage.

## D.4 Repository copilot: configuration correctness under deployment state

**Buyer:** a company shipping a repo-integrated coding copilot for internal platform teams.

**Buyer product weakness:** the copilot generates code but repeatedly misses configuration state, rollout toggles, issuer/audience settings, and deployment-coupled constraints.

**Measured need:**
- benchmark failures tied to config-correct remediation,
- weak dimensions around stateful config reasoning,
- config keys and deployment paths implicated by the benchmark parser,
- touched paths across config modules and environment wiring.

**Selected engineering intelligence supply:**
- config snippets,
- deployment notes,
- rollback toggles,
- code/config mixed artifacts showing how application logic and configuration interact.

**ENGI walkthrough:**
1. ENGI measures config blindness from benchmark evidence and static config extraction,
2. ENGI ranks config and mixed assets more heavily where config-key fit dominates,
3. ENGI produces a private patch branch only if the selected artifacts are patch-eligible,
4. otherwise ENGI produces a private context branch containing the exact material needed for a human or downstream agent to repair the buyer product weakness,
5. ENGI settles only over the final selected and eligible assets.

**Customer outcome:** the buyer's repo copilot becomes better at repository-state-aware suggestions, improving outputs delivered to engineering teams operating complex deployment environments.

## D.5 Autonomous remediation agent: bounded-scope patching under strict constraints

**Buyer:** a company shipping an autonomous remediation agent that is supposed to generate and validate patches with minimal human intervention.

**Buyer product weakness:** the agent sometimes generates plausible local fixes that violate broader repository constraints or fail benchmark reruns.

**Measured need:**
- benchmark failures where local patch correctness diverges from system correctness,
- weak dimensions around safe bounded remediation,
- explicit constraints requiring no regression to session validity, no broken fallback path, and rerunnable validation steps.

**Selected engineering intelligence supply:**
- narrowly scoped patches,
- benchmark rerun instructions,
- proof-bearing assets,
- operational notes defining safe patch boundaries.

**ENGI walkthrough:**
1. ENGI measures the constrained patching need,
2. ENGI ranks assets for need match, benchmark impact, and actionability,
3. ENGI filters candidates by final use tier,
4. ENGI allows only patch-eligible and settlement-eligible assets into patch generation,
5. ENGI stages a private patch branch,
6. ENGI computes shares only over settlement-eligible assets,
7. ENGI settles through exact fixed-point accounting and a journal diff.

**Customer outcome:** the buyer's autonomous remediation product improves on benchmark slices where reliable constrained patching matters more than broad code generation capability.

## D.6 On-call / SRE assistant: production rollback and mitigation guidance

**Buyer:** a company shipping an AI SRE or on-call assistant for engineering organizations.

**Buyer product weakness:** the assistant gives good summaries but weak action plans during active incidents.

**Measured need:**
- benchmark failures on incident mitigation tasks,
- weak dimensions around operational sequencing and rollback safety,
- benchmark traces showing that the product explains the incident but does not reliably guide mitigation.

**Selected engineering intelligence supply:**
- runbooks,
- incident notes,
- config toggles,
- benchmark traces tied to incident mitigation,
- proof/invariant notes where operational safety matters.

**ENGI walkthrough:**
1. ENGI measures the operational-guidance deficit,
2. ENGI selects a context-heavy asset pack,
3. ENGI creates a private context branch,
4. ENGI includes selected source material, manifests, and settlement preview,
5. ENGI uses settlement only after the selected operational materials are accepted and locked.

**Customer outcome:** the buyer's SRE assistant becomes more useful to engineering customers in incident-response settings, not just in post-hoc analysis.

## D.7 Internal engineering assistant: planning and remediation-direction quality

**Buyer:** a company shipping an internal engineering assistant used by product and platform engineers.

**Buyer product weakness:** the assistant can propose local edits but often chooses the wrong remediation strategy among several technically plausible paths.

**Measured need:**
- benchmark failures where the correct solution requires choosing among competing engineering approaches,
- weak dimensions around system-level judgment,
- repository symbols and design surfaces indicating multiple feasible but unequal options.

**Selected engineering intelligence supply:**
- design docs,
- proof-bearing arguments,
- incident retrospectives,
- benchmark traces comparing strategy outcomes,
- supporting code and config artifacts.

**ENGI walkthrough:**
1. ENGI measures a strategy-selection need rather than only a patch-generation need,
2. ENGI ranks materials that improve directional quality,
3. ENGI creates a private context branch focused on why one strategy is preferred and how it preserves constraints,
4. ENGI still computes and settles over the selected asset pack if the delivery is accepted.

**Customer outcome:** the buyer's assistant improves at strategy selection, leading to better downstream engineering decisions for its enterprise users.

## D.8 Benchmark-and-eval platform company: measured weakness to selected supply

**Buyer:** a company shipping a benchmark/evals platform for technical AI products.

**Buyer product weakness:** the platform measures failures precisely but lacks a strong path from measured need to matched engineering intelligence that would improve those failures.

**Measured need:**
- canonical benchmark traces,
- weak dimensions and failing cases already normalized,
- repository context tied directly to eval slices,
- desire for a supply-demand loop rather than measurement only.

**Selected engineering intelligence supply:**
- benchmark traces,
- code and patch artifacts,
- supporting runbooks and design docs,
- materials that directly explain how the measured failure can be improved.

**ENGI walkthrough:**
1. ENGI consumes the eval platform's canonicalized GitHub Actions outputs,
2. ENGI converts them into a need descriptor,
3. ENGI matches verified engineering-intelligence supply,
4. ENGI creates a private remediation branch and settlement preview,
5. ENGI settles only over the locked selected assets.

**Customer outcome:** the buyer platform can offer customers not just measurement of failure, but a path to actually improving technical-AI system performance.

## D.9 Trustworthy technical AI company: proof-constrained improvement

**Buyer:** a company selling technical AI tools into environments where correctness, auditability, and policy compliance matter as much as raw benchmark improvement.

**Buyer product weakness:** the product improves on some tasks but cannot show enough evidence that the improvement preserves required invariants or satisfies internal policy.

**Measured need:**
- benchmark slices that require both task success and constraint preservation,
- explicit repository and policy constraints,
- gaps in proof-bearing or verification-rich content.

**Selected engineering intelligence supply:**
- proof assets,
- code with strong verification evidence,
- policy-compliant signed materials,
- design docs that justify why the selected remediation path remains safe.

**ENGI walkthrough:**
1. ENGI measures both task weakness and constraint-criticality,
2. ENGI gives extra weight to constraint fit and verification sufficiency in the branchability path,
3. ENGI stages the private branch,
4. ENGI computes shares only over settlement-eligible assets,
5. ENGI produces settlement proof artifacts that become central to delivery rather than ancillary.

**Customer outcome:** the buyer can improve its technical AI product while maintaining the trust and audit properties required by customers in higher-assurance environments.

## D.10 Full multi-asset enterprise flow: measured weakness to delivered improvement

**Buyer:** a company shipping a technical AI platform that includes coding, debugging, review, and operational assistance capabilities.

**Buyer product weakness:** the platform underperforms on a cluster of benchmark slices involving auth rollback, incident mitigation, config correctness, and constraint-preserving remediation.

**Measured need:** GitHub Actions evidence shows failing cases and weak dimensions; deterministic tooling identifies touched paths, relevant symbols, and config keys; inference layers synthesize the task, failure modes, constraints, and target artifact kinds.

**Selected ENGI supply:**
- code assets for exact implementation behavior,
- patches for direct remediation,
- runbooks for operational sequencing,
- config artifacts for deployment correctness,
- incident notes for failure-mode grounding,
- proofs for correctness constraints,
- design docs for strategy selection,
- benchmark traces for measured performance linkage,
- mixed assets for end-to-end branch usefulness.

**ENGI walkthrough:**
1. buyer creates an `ENGI-...` branch and opens a PR,
2. GitHub Actions runs benchmark/test/CI and emits canonicalized evidence,
3. ENGI measures the need from static and inferred inputs,
4. ENGI recalls candidate supply across vector, lexical, symbol, path, and config channels,
5. ENGI computes need match, benchmark impact, actionability, and penalties,
6. ENGI applies issuance verification, provenance verification, verification sufficiency, and issuer policy status,
7. ENGI assigns final use tiers and filters candidates accordingly,
8. ENGI assembles the final asset pack,
9. ENGI creates a private remediation branch and materializes only the permitted source material,
10. ENGI writes manifests, settlement preview, and branch guidance,
11. ENGI computes raw shares across settlement-eligible assets,
12. ENGI settles through exact fixed-point accounting and a journal diff,
13. ENGI produces settlement proof artifacts,
14. ENGI opens delivery back to the buyer branch when settlement and confidentiality policy conditions are satisfied.

**Customer outcome:** the buyer improves the performance of the technical AI tools they ship to engineering customers, with a measurable supply-demand loop: benchmarked weakness on one side, engineering intelligence supply on the other, and exact attribution/settlement connecting the two.

## Review annotation
- This appendix is written as end-to-end buyer scenarios for generative technical AI enterprises. Each scenario focuses on a distinct product weakness and shows how measured need, selected supply, private delivery, settlement, and customer value connect.
