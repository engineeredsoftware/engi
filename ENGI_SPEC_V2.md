# ENGI V1 FINAL SPEC

Status: frozen full draft snapshot
Scope: ENGI v1
Constraint: GitHub-only trusted integration
Canonical path: `/Users/garrettmaring/Developer/ENGI/ENGI_FINAL_SPEC.md`
Snapshot: V2

---

# 1. Executive summary

ENGI v1 is a GitHub-native system for:

1. measuring a buyer's engineering need from GitHub repository state and GitHub Actions benchmark / test / CI evidence,
2. recalling and ranking deposited technical content for that need,
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

The v1 wedge is:

> Measure failing benchmark slices in a buyer repo, match the right technical supply, create an inspectable remediation branch containing the selected source material itself plus the accounting context, and produce exact attribution and settlement around the resulting value movement.

## Review annotation
- The branch is not just for cosmetic buyer review. It is the carrier for source material references, match rationale, measurement context, and settlement/accounting artifacts.
- Post-branch inspection and accounting are part of the product, not optional garnish.

---

# 2. Normative language

The terms MUST, SHOULD, MAY, and MUST NOT are normative.

---

# 3. Product goals and non-goals

## 3.1 Goals

ENGI v1 MUST:
- ingest a buyer engineering need from GitHub repo + GitHub Actions evidence,
- rank deposited technical content by likely usefulness to that need,
- apply verification determinisms that decide eligibility for contextual use, branch use, and settlement use,
- create a buyer-facing GitHub remediation branch,
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

6. **Settlement is a state-transition proof.**  
   It is not merely arithmetic equality.

7. **Inspectability beats mystique.**  
   Every important score, gate, branch proposal, and settlement transition SHOULD be explainable.

8. **Reliability before polish.**  
   Ranking, benchmark impact, actionability, penalties, issuance, and distribution logic MUST emit high telemetry and SHOULD fail hard during v1 implementation until behavior is reliably correct.

## Review annotation
- This section explicitly locks the “fail hard until reliable” development posture for the core implementation.

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

## Review annotation
- This section removes the earlier provider-duplication issue and makes the GitHub PR/branch UX explicit.
- It also states exactly how ENGI can remain GitHub-specific while flexibly handling different Actions outputs.

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

## 6.5 Need match
The degree to which candidate content helps solve the buyer's engineering need.

## 6.6 Issuance verification
Whether the content was actually issued/deposited as claimed.

## 6.7 Provenance verification
Whether the content is tied to the GitHub context it claims.

## 6.8 Verification sufficiency
Whether enough evidence exists to rely on the content.

## 6.9 Issuer policy status
ENGI policy's current stance on the issuer class behind the content:
- allowed
- unknown
- restricted
- revoked

This is not social reputation.

## 6.10 Asset shares
Normalized contribution shares across assets for a specific need-resolution event.

## 6.11 Journal diff
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
- **Ranking** owns usefulness measurement only.
- **Verification determinisms** own eligibility/gating only.
- **Asset pack assembly** owns selecting the final content set.
- **Branch generation** owns writing manifests and code/context changes into GitHub.
- **Share computation** owns contribution normalization.
- **Settlement** owns journal entries, exact accounting, and proofs.

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

## 8.3 Candidate asset

```ts
type CandidateAsset = {
  assetId: string
  depositedAt: string
  title: string
  artifactKind: ArtifactKind

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

## 8.4 Content unit

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

## 8.5 Universal measurement provenance rule

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

## Review annotation
- This section now clearly distinguishes static vs inferred measurements and makes inferred fields cite their static evidence.

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

**Responsibility:** compute the full usefulness measurement for candidate content.

**Inputs:** `GitHubNeedDescriptor`, candidate assets/content units.

**Outputs:** ranking components and final ranking score.

**Hand-off:** ranking outputs combine with verification determinisms to determine use tier.

Ranking is the entirety of the holistic usefulness measurement. It consists of:
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

**Responsibility:** combine ranking components into the final usefulness score.

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

## 16.4 Critical implementation requirements

Because ranking is the critical implementation:
- every subscore MUST be individually logged,
- every inference prompt MUST be versioned,
- every deterministic tool/program used in static measurement MUST be versioned,
- missing component scores SHOULD hard-fail in debug builds,
- impossible ranges SHOULD hard-fail in debug builds,
- component disagreement SHOULD be telemetered,
- branch generation MUST NOT proceed if required ranking signals are absent.

## 16.5 Important rule

Verification determinisms MUST NOT be folded directly into ranking.

Ranking answers:
> how useful is this content for the need?

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

**Hand-off:** outputs gate branch inclusion and settlement participation.

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

### Important policy rule

- unknown issuers MAY still be usable,
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

- `rank-only`: useful for analysis, not branch inclusion
- `context-only`: can appear in context branch
- `patch-eligible`: can inform patch branch
- `settlement-eligible`: can participate in downstream settlement if enabled

## Review annotation
- This cleanly separates ranking from verification and gives an explicit hand-off layer.

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

**Outputs:** ENGI remediation branch plus manifests.

**Hand-off:** branch creation precedes settlement; settlement preview is included in the branch.

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
6. ENGI creates its remediation branch from the buyer branch,
7. ENGI writes selected source material artifacts or canonical mounted copies, manifests, and settlement preview into that branch,
8. ENGI later opens a PR back into the buyer branch.

## 21.4 Branch modes

ENGI v1 SHOULD support:

### Context branch
Contains manifests, selected source material artifacts or canonical mounted copies, and reasoning.

### Patch branch
Contains manifests, selected source material artifacts or canonical mounted copies, plus generated remediation changes.

## 21.5 Branch contents

```text
.engi/
  need.json
  match-report.json
  verification-report.json
  eval-manifest.json
  asset-pack.lock.json
  settlement-preview.json
  source-material/
ENGI_NEED.md
```

## 21.6 ENGI_NEED.md MUST include

- failing benchmark slices
- measured need
- selected assets and reasons
- verification/risk summary
- expected touched files/areas
- validation/rerun instructions
- settlement preview summary

## Review annotation
- This section now exactly matches the PR/branch UX you described.

---

# 22. Asset shares

## 22.1 Overview

**Responsibility:** compute normalized contribution for the specific need-resolution event.

**Inputs:** final asset pack, need descriptor, ranking outputs.

**Outputs:** raw shares and settled shares.

**Hand-off:** outputs feed directly into settlement/journal diff.

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

**Hand-off:** this is the terminal accounting layer.

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

## 24.5 Journal diff type

```ts
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

## 24.6 Required invariants

ENGI v1 MUST check:
1. total debits == total credits
2. no negative balances
3. raw shares sum to 10000 bp
4. settled shares sum to 10000 bp
5. referenced assets/receipts exist
6. receipt chain is valid
7. before/after roots match state transition
8. settled shares equal raw shares in default v1 settlement mode

## 24.7 Default settlement mode

In default v1 settlement mode:
- `settledShareBp === rawShareBp` for every asset
- no settlement adjustment layer is applied
- zero-point accounting is complete and direct

## 24.8 Distribution algorithm precision

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

## 24.9 Formal proof obligations

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

## 24.10 Pseudocode

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

**Hand-off:** supports buyer inspection and later QA.

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

## 25.6 Settlement preview

```ts
type SettlementPreview = {
  needId: string
  bundleId: string
  rawShares: AssetShareRaw[]
  settledShares: AssetShareSettled[]
  meteredMicroUnits: bigint
}
```

## Review annotation
- This section now covers the branch inspection surface with both ranking and verification determinisms.

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

  // Create ENGI remediation branch from buyer ENGI-* branch context.
  gitCreateBranch(repoCtx, branchName)

  // Materialize selected source material for branch inspection.
  materializeSelectedSourceMaterial(repoCtx, assetPack, '.engi/source-material')

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
  // Clone state so settlement remains pure until all checks pass.
  const before = cloneState(stateBefore)

  // Compute raw contribution shares.
  const rawShares = computeAssetSharesRaw(event.need, event.bundle)

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

8. Settlement
   - Is the default zero-adjustment mode the right v1 lock?

9. Journal diff
   - Is the structured `reason` + `explanation` shape precise enough to follow?

10. One-liner
   - Does this read right?

> ENGI first scores candidate technical content for need match, benchmark impact likelihood, and actionability; then separately applies issuance verification, provenance verification, verification sufficiency, and issuer policy status before branching or settlement.

---

# APPENDIX D — Technical content examples

Each example is chosen to be uniquely informative of system behavior and, together, to cover ENGI holistically.

## D.1 Code

**Example:** `session_validator.rs` implementation that replaces unchecked cache access with guarded lookups, explicit issuer checks, and invariant-preserving error propagation.

**Why uniquely informative:**
- strong symbol/path/config surface,
- concrete implementation specificity,
- useful for symbol fit, path fit, stack fit, and actionability.

## D.2 Patch

**Example:** a focused diff against `auth/validator.rs` and `auth/config.rs` that restores old verifier wiring while preserving session validity and rollback safety.

**Why uniquely informative:**
- directly branch-usable,
- ideal for remediation specificity and benchmark impact.

## D.3 Runbook

**Example:** a production auth-migration rollback procedure with freeze steps, issuer compatibility checks, kill-switch gating, and benchmark rerun instructions.

**Why uniquely informative:**
- high remediation specificity,
- high operational usability,
- often strong even when path binding is weaker.

## D.4 Config

**Example:** canonical issuer/audience/rotation config snippets showing safe fallback verifier state and migration rollback toggles.

**Why uniquely informative:**
- strong config-key fit,
- useful for stack/context alignment,
- can be highly actionable even with little prose.

## D.5 Incident note

**Example:** post-incident note documenting how issuer mismatch manifested in production, which services were affected, and what rollback ordering avoided session corruption.

**Why uniquely informative:**
- high failure-mode relevance,
- useful for benchmark impact and task understanding,
- may be more context-grade than patch-grade.

## D.6 Proof

**Example:** formal/checked statement that cache eviction and session lookup logic preserve validator invariants under bounded preconditions.

**Why uniquely informative:**
- high constraint fit,
- high confidence on safety/correctness claims,
- useful for proving not just what to do, but why it is safe.

## D.7 Design doc

**Example:** design note comparing rollback strategies, verifier topology options, failure containment boundaries, and why one path best preserves session validity.

**Why uniquely informative:**
- broad task/failure coverage,
- useful when choosing remediation direction,
- often context-branch valuable even if not directly patch-grade.

## D.8 Benchmark trace

**Example:** benchmark artifact showing exactly which auth-remediation slices fail, where scores are weakest, and which rollback variants improve them.

**Why uniquely informative:**
- central to need measurement,
- central to benchmark impact,
- directly ties ENGI to buyer value.

## D.9 Mixed technical content

**Example:** a sealed asset containing a patch, explanatory prose, benchmark rerun commands, and proof notes all tied to the same auth rollback scenario.

**Why uniquely informative:**
- shows why ENGI must rank across heterogeneous technical content,
- useful for holistic need resolution,
- often strongest for final asset-pack assembly.

## Review annotation
- This appendix gives a real-worldly example for every technical content type and shows how they together cover ENGI system behavior.
