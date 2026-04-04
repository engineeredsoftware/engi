# ENGI Spec V14

Status: current canonical/latest target; not yet the last fully realized canon implementation baseline
Scope: ENGI v1 / first full canonical-spec realization to the V13 structure standard
Canonical pointer: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC.txt` -> `V14`
Last fully realized canon preserved: `V12`
Structural standard preserved: `V13`
Current canon implementation target: `engi-demo` deterministic prototype interpreted through V12-realized semantics and V14 formalization
Baseline references:
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_TEMPLATEGUIDE.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V13.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V13_NOTES.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V13_INFORMATION_AUDIT.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V12.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V12_NOTES.md`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/SPEC_V13_IMPLEMENTATION_MATRIX.md`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/src/engi-demo.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/public/app.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/test/core.test.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/test/api.test.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/test/e2e.test.js`

---

# 1. Executive summaries

## 1.1 V14 version executive summary

V14 is the current canonical/latest ENGI target because it is the first version that actually realizes the V13 comprehensively complete spec standard in concrete form.

Its job is not to redesign ENGI.
Its job is to write the current ENGI canon densely enough that the operating model, implementation target, proof obligations, host/runtime expectations, and parity boundaries are recoverable without reverse-engineering the repository from scratch.

Relative to V12 and V13, V14 now does all of the following explicitly:
1. aligns the V14 file family to `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_TEMPLATEGUIDE.md` while preserving V13 as the originating structure standard,
2. keeps `ENGI_SPEC.txt = V14` explicit as the current canonical/latest target,
3. separates the version-level summary from the canonical in-place ENGI summary,
4. restores host capabilities, host containerization, bootstrap/furnishing configuration, machine-local programs, static-analysis programs, proof programs, remote-program boundaries, telemetry, safety, and measurement/execution truth as system-spec material,
5. restores V5/V6-style evaluator and inference explicitness where useful, including inference moments, prompt contracts, context injectables, prompt templates, output schemas, and parsable completion obligations,
6. tightens proof-family definitions, witness structures, subsystem obligations, theorem checks, and witness-manifest closure requirements,
7. states plainly that V12 remains the last fully realized canon while the current demo source is the implementation target being interpreted by V14.

The central V14 rule is:

> The canonical ENGI spec MUST be rich enough that an implementer, reviewer, operator, or auditor can recover the operating model, formal structures, artifact contracts, host/runtime constraints, proof obligations, validation expectations, and source parity map without reverse-engineering the repository from scratch.

## 1.2 Canonical ENGI executive summary

ENGI is a system for making technical supply legible, selectable, provable, and settleable against measured enterprise need.

Its canonical operating chain is:
1. identify repo-bound supply,
2. deposit artifact-bearing candidate supply,
3. measure a need from benchmark/repo evidence,
4. make the deposit-to-need fit explicit before deeper closure,
5. evaluate, verify, and lock an asset pack,
6. materialize private branch-scoped remediation artifacts,
7. close the run with proof-bearing evidence and bounded disclosure policy,
8. settle exact value through replayable source-to-shares and journal accounting.

ENGI is therefore simultaneously:
- a need-measurement system,
- a deposit-and-selection system,
- a branch materialization system,
- a proof and disclosure system,
- and an exact-accounting settlement system.

Depositing against measured need remains the operating center.
Identity/auth remains the spine.
Proof remains necessary closure.
Settlement remains exact and replayable.
Boundary honesty remains mandatory.
Browser-visible operator ordering remains canonical conformance evidence.

---

# 2. Normative language

The key words **MUST**, **MUST NOT**, **REQUIRED**, **SHOULD**, **SHOULD NOT**, and **MAY** are to be interpreted as normative requirements for V14 conformance.

Where V14 describes current implementation truth, that description is normative for V14 parity unless V14 explicitly marks it as:
- future-facing,
- profile-B-only,
- boundary-external,
- or intentionally modeled rather than executed.

---

# 3. Canonical specification-file role and versioning

## 3.1 Why V14 exists

V13 finalized the structure standard for a fully enriched ENGI spec.
V14 is the first pass that actually fills that structure with dense canonical content.

V14 therefore exists to combine:
- V6-level explicitness where useful,
- V12-level operator truth,
- and current source-faithful detail.

## 3.2 Current versioning rule

ENGI versioning remains:
1. each new spec release is a new versioned file set,
2. prior versions remain preserved,
3. `ENGI_SPEC.txt` is the only canonical pointer,
4. a draft version does not automatically become canonical merely because it is newer.

Accordingly:
- `ENGI_SPEC.txt = V14` means V14 is the pointer target and current canonical/latest target,
- V12 remains the last fully realized canon and the preserved semantic/implementation anchor for the current demo source,
- V13 remains the file-structure/formality standard that V14 now realizes in concrete use,
- the current demo source is the canon implementation target for V14, but not every V14 formalization is yet fully source-realized.

## 3.3 Required V14 file set

The V14 release for this pass MUST include:
- `ENGI_SPEC_V14.md`
- `ENGI_SPEC_V14_NOTES.md`
- `engi-demo/SPEC_V14_IMPLEMENTATION_MATRIX.md`

Additional V14 appendix or reference files MAY be introduced only when they materially improve canon, parity, or auditability.

This correction path also introduces `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_TEMPLATEGUIDE.md` as the standalone cross-version drafting guide.
That guide is adjacent to the V14 file set rather than a replacement for it.

## 3.4 Trace continuity rule

V14 intentionally preserves the V12 section-number anchors for sections `6` through `13`.

This is deliberate.
The current demo implementation already exposes explainer, UI, and reasoning references keyed to the V12 semantic anchors:
- `6.1` depositing,
- `6.2` needing,
- `6.3` deposit-to-need fit,
- `7` profiles,
- `8` ordering,
- `9` artifact-kind-native interaction,
- `10` identity/auth,
- `11` proof and settlement,
- `12` boundary realism,
- `13` demonstration completeness.

V14 keeps those anchors stable so the implementation can trace to the enriched spec by version substitution rather than semantic remapping.

## 3.5 What V14 governs

V14 governs:
- the canonical ENGI operating model,
- canonical ENGI section organization in actual use,
- subsystem requirements,
- canonical artifact families,
- proof and settlement obligations,
- test-coverage expectations,
- spec-to-source parity expectations,
- and demo/documentation alignment obligations for the local deterministic prototype.

## 3.6 Template-guide alignment

V14 is explicitly aligned to `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_TEMPLATEGUIDE.md`.

That means V14 is drafted to satisfy all of the following guide-level rules in concrete use:
1. keep the version executive summary separate from the canonical ENGI executive summary,
2. preserve the latest-target vs last-fully-realized-canon distinction explicitly,
3. treat the spec, notes file, and implementation matrix as one coordinated file family,
4. cover the whole ENGI operating chain rather than only the currently hottest subsystem,
5. apply a disciplined role -> requirements -> structures -> obligations -> operator meaning -> parity-reference pattern across major sections,
6. treat inference, proofs, test coverage, spec-to-source parity, and operator-experience parity as appendix-grade canonical material,
7. preserve later design truth while restoring earlier useful explicitness.

When V14 uses older explicitness, it does so to clarify current canon rather than to reopen superseded design.

---

# 4. Product goals, non-goals, and design principles

## 4.1 Goals

ENGI exists to make technical supply legible, selectable, provable, and settleable against measured enterprise need.

A conformant ENGI system SHOULD:
1. derive need from real benchmark/repo context rather than from free-floating prompt intent,
2. let artifact-bearing supply enter through explicit deposit and inventory selection paths,
3. preserve provenance, addressing, signing, and authority roots,
4. compare deposits against measured need through explicit recall, ranking, and verification stages,
5. materialize a branch-scoped remediation artifact set rather than an ungrounded answer blob,
6. bind branch materialization to proof-bearing evidence,
7. settle exact value through explicit accounting and source-to-shares logic,
8. keep boundary and disclosure truth explicit,
9. remain interpretable to operators through the same structures that make it correct.

## 4.2 Non-goals

ENGI does not primarily exist to:
- be a generic coding copilot,
- replace engineering judgment with opaque scoring,
- hide identity or authorization under simplified UX,
- reduce branch materialization to one-off patch text,
- or pretend that local prototype execution equals live external integration.

## 4.3 Design principles

V14 preserves the following principles as canonical:

1. Depositing against need is the operating core.
2. Need is measured, not merely asked for.
3. Artifact kinds matter materially.
4. Identity and authorization are system spine, not back-office implementation detail.
5. Proof is closure, not explanatory garnish.
6. Settlement is exact accounting, not approximate reward storytelling.
7. Boundary honesty is required.
8. Public disclosure is bounded, derived, and provable.
9. Demonstration ordering is part of system truth.
10. Pedagogical clarity and formal rigor are compatible requirements.

---

# 5. Source-of-truth hierarchy and canonical file-set expectations

## 5.1 Source-of-truth precedence

V14 source-of-truth precedence is:
1. `ENGI_SPEC.txt`
2. the versioned spec file named by the pointer
3. the current canonical implementation source for that version or target baseline
4. the version-local notes file
5. the version-local implementation matrix
6. prior versions as historical context

Because the pointer now resolves to V14 while V12 remains the last fully realized canon and the current demo source remains the implementation target, interpretation for this pass is:
1. treat V14 as the governing canonical/latest spec,
2. preserve V12 as the most fully realized semantic anchor where the current source still reflects older explicitness or naming,
3. write V14 against current source reality rather than against speculative future implementation,
4. record any remaining divergence or under-realized formalization explicitly in the V14 matrix,
5. use prior versions only to recover lost explicitness, not to dilute current canon status.

## 5.2 Canonical file-family expectations

A serious ENGI version SHOULD normally include:
- one canonical spec,
- one notes file,
- one implementation matrix,
- and zero or more appendix/reference files only when justified.

Beginning with this correction path, future full enriched versions SHOULD align themselves explicitly to `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_TEMPLATEGUIDE.md` rather than re-deriving V13 structure rules ad hoc.

The implementation matrix is not optional bookkeeping.
It is the parity ledger between spec expectation and repository truth.

## 5.3 Code/source reference conventions

Canonical source references in V14 SHOULD identify:
- repo-relative file path,
- function or builder name where meaningful,
- the artifact or UI surface emitted from that path,
- and the test entrypoint that validates it when one exists.

Preferred style in the spec body and appendices is:
- `engi-demo/src/engi-demo.js -> buildDepositingSurface(...)`
- `engi-demo/public/app.js -> renderDepositingSurfaceVisual(...)`
- `engi-demo/test/e2e.test.js -> browser flow keeps V12 ordering...`

Line numbers MAY be added in later versions if stable maintenance of line-oriented references becomes useful.
Builder-level references are the current preferred granularity.

## 5.4 Special handling areas

The following areas require dedicated treatment in V14 rather than generic prose:
- host capabilities, execution environments, containerization, bootstrap/furnishing config, telemetry, and safety,
- evaluator and inference contracts,
- proof obligations and witness structures,
- artifact and deliverable completeness,
- projection and disclosure rules,
- exact-accounting invariants,
- browser e2e validation,
- UI explainer traceability where operator correctness depends on interpretation.

---

# 6. Primary V14 surface: depositing against need

V14 preserves the V12 decision that the main operating relation is not "model chooses patch".
The main operating relation is:

1. repo supply exists,
2. an operator deposits candidate supply,
3. ENGI measures a need,
4. ENGI makes the deposit-to-need fit explicit,
5. only then do deeper branch, proof, and settlement layers become necessary.

## 6.1 Depositing surface

### Role

Depositing is the structured act of presenting artifact-bearing supply to ENGI for consideration against a measured need.

Depositing is not:
- generic upload,
- generic asset registration,
- or a sidecar pre-step before "real" work begins.

It is the beginning of the operator story.

### Requirements

A conformant depositing subsystem MUST make explicit:
- which repo supply was referenced,
- which inventory entries were selected,
- which artifact kinds and origin kinds were selected,
- what addressing root was produced,
- what signing root was produced,
- what auth root was produced,
- and what the deposit is trying to do.

Depositing MUST support:
- repo-authenticated inventory selection,
- raw fallback or supplemental source material,
- artifact-kind-aware summaries,
- exact repo and auth binding when inventory-backed.

### Canonical structures

```ts
type DemonstrationProfile = {
  profileId: 'A' | 'B'
  label: string
  shortLabel: string
  identity: {
    whoItIs: string
    operatorRole: string
    audienceMeaning: string
  }
  depositMode: string
  needMode: string
  assetPackShape: string
  settlementShape: string
  scenarioFamilies: string[]
  composition: string[]
  boundaryRealityNote: string
}

type RepoSupplySurface = {
  conformanceProfile: string
  productionIntentProfile: string
  repoCount: number
  inventoryEntryCount: number
  scenarioCount: number
  demonstrationProfileCounts: Record<string, number>
  artifactKindCounts: Record<string, number>
  originKindCounts: Record<string, number>
  repos: Array<{
    repo: string
    authSessionId: string
    installationId: string
    defaultRef: string
    inventoryEntryCount: number
    scenarioCount: number
    scenarioIds: string[]
    scenarioFamilies: string[]
    demonstrationProfileCounts: Record<string, number>
    artifactKindCounts: Record<string, number>
    originKindCounts: Record<string, number>
    dominantStacks: string[]
    dominantConstraints: string[]
    localBoundary: string
    externalBoundary: string
  }>
}

type RepoArtifactInventoryEntry = {
  inventoryEntryId: string
  repo: string
  artifactKind: string
  artifactType?: string
  originKind: string
  title: string
  summary: string
  ref?: string
  sourceCommit?: string
  sourcePath?: string
  sourcePaths?: string[]
  workflowRunId?: string
  workflowPath?: string
  workflowJobName?: string
  checkSuiteId?: string
  artifactName?: string
  tags: string[]
  declaredStacks: string[]
  declaredConstraints: string[]
  signerAddress?: string
  authSessionId?: string
  installationId?: string
  repositoryId?: string
  repositoryNodeId?: string
  contentRoot: string
}

type DepositingSurface = {
  depositSessionId: string
  depositProfile: string
  repoSupplyRef: string
  selectedInventoryRefs: string[]
  selectedArtifactKindCounts: Record<string, number>
  selectedOriginKindCounts: Record<string, number>
  addressingRoot: string | null
  signingRoot: string | null
  authRoot: string | null
  depositIntentSummary: string
}
```

### Invariants

Depositing invariants in V14:
1. `depositSessionId` MUST bind to the selected asset pack and candidate set rather than being arbitrary session UI state.
2. `repoSupplyRef` MUST identify the repo/auth context that made the deposit legible.
3. `selectedInventoryRefs` MUST prefer inventory entry ids when inventory-backed and only fall back to asset ids when inventory selection is not present.
4. `addressingRoot`, `signingRoot`, and `authRoot` MUST be aggregations over the selected candidate set, not one-off fields copied from a single candidate unless only one candidate exists.
5. `depositIntentSummary` MUST explain what the deposit is for in profile terms, not merely restate a title.

### Operator meaning

The operator should understand the depositing surface as the answer to:
- what supply did we actually stage,
- from what repo/auth context,
- with what kind coverage,
- and toward what closure shape.

### Current source references

- `engi-demo/src/engi-demo.js -> buildRepoSupplySurface(...)`
- `engi-demo/src/engi-demo.js -> buildDepositingSurface(...)`
- `engi-demo/server.js -> buildDepositInput(...)`
- `engi-demo/public/app.js -> renderRepoSupplyVisual(...)`
- `engi-demo/public/app.js -> renderDepositingSurfaceVisual(...)`

## 6.2 Needing surface

### Role

Needing is the operator-visible summary of measured engineering demand.

Need is derived from:
- benchmark parser outputs,
- repo context,
- failing cases,
- weak dimensions,
- constraints,
- closure criteria,
- and prompt/measurement lineage.

Need is not a free-floating ticket title.

### Requirements

A conformant needing subsystem MUST make explicit:
- parser kind,
- benchmark run binding,
- task summary,
- failure mode summary,
- target artifact kinds,
- boundedness or compositeness summary,
- closure criteria,
- the active demonstration profile,
- field derivations and measurement provenance in deeper artifacts.

### Canonical structures

```ts
type NeedDescriptor = {
  needId: string
  repo: string
  installationId?: string
  baseRef?: string
  targetRef?: string
  prNumber?: number
  benchmarkHarnessPath: string
  benchmarkWorkflowPath: string
  benchmarkRunId: string
  benchmarkRunUrl?: string
  canonicalRunEvidence: object
  benchmarkParserContract: {
    parserKind: string
    parserVersion: string
    requiredInputs?: string[]
    parserFailureContract?: string[]
  }
  canonicalBenchmarkOutputs: object
  task: string
  failureModes: string[]
  constraints: string[]
  targetArtifactKinds: string[]
  closureCriteria: string[]
  stackHints: string[]
  touchedPaths: string[]
  extractedSymbols: string[]
  configKeys: string[]
  failingCases: string[]
  weakDimensions: string[]
  baselineMetrics?: Record<string, number>
  humanPrompt?: string
  conformanceProfile: string
  productionIntentProfile: string
  demonstrationProfile: DemonstrationProfile
  fieldDerivations: Record<string, object>
  measurementProvenance: object[]
  measurementClassInventory: object
  staticMeasurements: object
  inferredMeasurements: object
  recallChannelContracts: object[]
  promptSurfaces: object[]
  promptContracts: object[]
  promptCompletenessProof: object
  analysisFactLifecycle: object
  profileCompositions: object
}

type NeedingSurface = {
  needId: string
  demonstrationProfile: DemonstrationProfile
  parserKind: string
  taskSummary: string
  failureModeSummary: string[]
  targetArtifactKinds: string[]
  boundednessSummary: string
  closureCriteria: string[]
}
```

### Invariants

Needing invariants in V14:
1. `needId` MUST remain stable across the branch/proof/settlement chain for one run.
2. `parserKind` MUST represent the benchmark parser actually used, not a product marketing label.
3. `taskSummary`, `failureModeSummary`, and `closureCriteria` MUST derive from measured benchmark/repo evidence.
4. `targetArtifactKinds` MUST remain operator-visible because later fit, ranking, and artifact-kind-native interaction depend on them materially.
5. `boundednessSummary` MUST explain profile meaning in demand terms, not only in infrastructure terms.

### Operator meaning

The operator should understand the needing surface as the answer to:
- what exactly is needed,
- why it is needed,
- how narrow or composite the need is,
- and what would count as closure.

### Current source references

- `engi-demo/src/engi-demo.js -> measureNeedFromScenario(...)`
- `engi-demo/src/engi-demo.js -> buildNeedingSurface(...)`
- `engi-demo/public/app.js -> renderNeedingSurfaceVisual(...)`
- `engi-demo/public/app.js -> renderNeedVisual(...)`

## 6.3 Required depositing-to-needing relation

### Role

The depositing-to-needing surface is the primary relation surface in ENGI.

It explains why this deposit is the right supply for this measured need before the operator is asked to inspect deeper:
- verification receipts,
- proof bundles,
- branch artifacts,
- or exact accounting internals.

### Requirements

A conformant deposit-to-need relation MUST:
1. bind one deposit session to one need id,
2. explain fit in human terms,
3. expose decisive kinds and overlapping kinds,
4. expose normalization pressure,
5. connect fit directly to branch, proof, and settlement intent,
6. remain visible prior to deep closure artifacts.

### Canonical structure

```ts
type DepositingToNeedingSurface = {
  relationId: string
  depositSessionId: string
  needId: string
  fitSummary: string
  decisiveKinds: string[]
  overlapKinds: string[]
  normalizationPressure: 'low' | 'medium' | 'high'
  branchIntentSummary: string
  proofIntentSummary: string
  settlementIntentSummary: string
}
```

### Invariants

Depositing-to-needing invariants in V14:
1. `depositSessionId` MUST equal the deposit session emitted by the depositing surface.
2. `needId` MUST equal the need id emitted by the needing surface.
3. `decisiveKinds` and `overlapKinds` MUST be derived from actual selected candidates and target kinds rather than post-hoc prose.
4. `normalizationPressure` MUST be profile-aware and candidate-set-aware.
5. `branchIntentSummary`, `proofIntentSummary`, and `settlementIntentSummary` MUST read as consequences of fit, not parallel product features.

### Operator meaning

The operator should understand the relation surface as the answer to:
- why this supply belongs in this closure path,
- whether the path is decisive or normalization-heavy,
- and why branch, proof, and settlement now follow.

### Current source references

- `engi-demo/src/engi-demo.js -> buildDepositingToNeedingSurface(...)`
- `engi-demo/public/app.js -> renderDepositingToNeedingVisual(...)`

---

# 7. V14 demonstration profiles

V14 preserves the V12 profile meaning exactly.

## 7.1 Profile A - targeted deposit / bounded need

Profile A demonstrates:
- a small decisive deposit,
- a sharply bounded need,
- a tighter asset pack,
- shorter proof closure,
- more concentrated settlement explanation.

Profile A MUST read as the "decisive closure" profile, not the "small demo" profile.

## 7.2 Profile B - normalization deposit / composite need

Profile B demonstrates:
- overlapping multi-asset deposit,
- broader or composite need measurement,
- heavier normalization burden,
- explicit source-to-shares reasoning,
- broader proof burden,
- visible zero-credit or non-credited participation where appropriate.

Profile B MUST read as the "normalization closure" profile, not the "production-only" profile.

## 7.3 Profile rule

Profiles MUST be explained first through:
- deposit mode,
- need mode,
- asset-pack shape,
- settlement shape,
- audience meaning.

Profiles MUST NOT be reduced to:
- local vs GitHub,
- prototype vs production,
- or narrow vs broad infrastructure.

## 7.4 Boundary relation

Boundary differences may correlate with profile use, but boundary reality is secondary explanation.
The main profile distinction is operating shape.

### Current source references

- `engi-demo/src/engi-demo.js -> PROFILE_DEFINITIONS`
- `engi-demo/src/engi-demo.js -> buildDemonstrationProfile(...)`
- `engi-demo/public/app.js -> renderProfileCompositionVisual(...)`

---

# 8. Required V14 demonstration ordering, pedagogy, and explainer parity

## 8.1 Canonical operator chain

The default ENGI operator chain is:
1. repo supply,
2. depositing,
3. needing,
4. deposit-to-need fit,
5. ranked candidates and verification determinisms,
6. asset pack and branch artifacts,
7. settlement and journal diff,
8. ledger, policy, public proof, and deeper support surfaces.

This chain MUST read as one operating path.

## 8.2 Ordering requirements

The operator SHOULD understand:
- what supply exists,
- what was deposited,
- what is needed,
- and why the fit is persuasive,

before being asked to inspect:
- deep proof witnesses,
- exact accounting decomposition,
- or policy edge cases.

Deep artifacts remain required.
They simply arrive after the primary operating relation is legible.

## 8.3 Explainer parity requirements

Because the local demo depends on structured explainers, terminology hints, and visual/raw dual rendering, explainers are canonical system design material.

Explainer parity requirements:
1. primary ENGI terms SHOULD have human-readable explanations,
2. those explanations SHOULD point back to canonical spec sections,
3. those explanations SHOULD point to current source builders or UI renderers when useful,
4. explainers MUST NOT contradict formal artifact meaning,
5. explainers MUST help the operator distinguish between:
   - current run surfaces,
   - preview surfaces,
   - private branch artifacts,
   - bounded public proof,
   - and explicit external boundaries.

## 8.4 Fast-path and deep-path requirement

The shell MUST support both:
- a fast read of the operating picture,
- and a deep read of the actual artifacts.

Neither path may invalidate the other.

### Current source references

- `engi-demo/public/index.html`
- `engi-demo/public/app.js -> renderOperatingPicture(...)`
- `engi-demo/public/app.js -> renderDepositingSurfaceVisual(...)`
- `engi-demo/public/app.js -> renderNeedingSurfaceVisual(...)`
- `engi-demo/public/app.js -> renderDepositingToNeedingVisual(...)`
- `engi-demo/test/e2e.test.js`

---

# 9. Artifact-kind-native interaction, repo supply, recall, and materialization

## 9.1 Artifact-kind-native rule

Artifact kinds are not cosmetic metadata.
They matter to:
- need targeting,
- recall filtering,
- fit explanation,
- branch materialization,
- settlement explanation,
- and operator confidence.

The current demo treats kinds such as `runbook`, `patch`, `config`, and `proof` as materially distinct.
That distinction is canonical.

## 9.2 Candidate asset intake and selection

A canonical candidate asset may be composed from:
- repo inventory entries,
- raw fallback material,
- or both.

But a high-quality ENGI deposit SHOULD prefer repo-authenticated inventory selection when available.

Canonical intake-linked surfaces include:
- artifact selection surface,
- addressing surface,
- signing surface,
- GitHub App auth surface,
- upload surface,
- identity surface,
- verification evidence.

## 9.3 Recall, ranking, verification, and use tiers

ENGI does not collapse all evaluation into one score.

The current canonical split is:
1. recall gathers candidates through multiple channel families,
2. ranking scores usefulness,
3. verification determines whether the candidate may actually participate downstream,
4. use tier determines whether a candidate is:
   - rank-only,
   - context-only,
   - patch-eligible,
   - settlement-eligible,
   - or rejected.

This separation is not implementation trivia.
It is a design requirement.

## 9.4 Canonical structures

```ts
type CandidateAsset = {
  assetId: string
  depositedAt: string
  title: string
  artifactKind: string
  artifactType?: string
  metadata: {
    author: string
    organization: string
    tags: string[]
    sourceRepo: string
    sourcePaths: string[]
    declaredStacks: string[]
    declaredConstraints: string[]
    issuerPolicyStatus?: string
  }
  contentRoot: string
  contentUnits: object[]
  uploadSurface: object
  artifactSelectionSurface: object
  addressingSurface: object
  signingSurface: object
  githubAppAuthSurface: object
  githubBoundary: object
  identitySurface: object
  verificationEvidence: object
}

type EvaluatedCandidate = {
  assetId: string
  title: string
  artifactKind: string
  useTier: 'rank-only' | 'context-only' | 'patch-eligible' | 'settlement-eligible' | 'rejected'
  recall: object
  ranking: {
    wholeAssetNeedScore: number
    finalRankingScore: number
    needMatch: object
    benchmarkImpact: object
    actionability: object
    penalties?: object
  }
  verification: object
  rights: {
    branchMaterializationAllowed: boolean
    settlementAllowed: boolean
  }
  measurementProvenance: object[]
}

type AssetPack = {
  assetPackId: string
  needId: string
  conformanceProfile: string
  productionIntentProfile: string
  selectedAssets: string[]
  selectedUnits: string[]
  lockedContentRoots: string[]
  lockedAttestationHashes: string[]
  estimatedBundleScore: number
  branchMode: 'context' | 'patch'
  acceptedUseTiers: string[]
  coverage: object
}
```

## 9.5 Asset pack and branch materialization

Asset pack assembly is the stage where fit-bearing, verified candidates become a locked bundle for branch materialization.

Branch materialization MUST:
- preserve the asset pack lock,
- mount selected source material in a controlled way,
- emit private branch artifacts under `.engi/`,
- emit public-safe bounded proof artifacts only through projection policy,
- and preserve a deliverables manifest over what was materialized.

## 9.6 Branch artifact contract

The branch artifact contract for the current deterministic prototype includes, at minimum:
- need and need-measurement artifacts,
- deposit/needing/fit surfaces,
- match and verification artifacts,
- eval manifest,
- asset-pack lock,
- selected source material manifest,
- authorization and sensitive-data-flow artifacts,
- policy release and identity bindings,
- GitHub boundary and upload manifest,
- profile composition and prompt artifacts,
- prompt completeness, measurement, and verification receipts,
- materialization proof and exclusions,
- proof witness manifest,
- settlement preview, source-to-shares, settlement participation, accounting precision, settlement proof, and journal diff,
- scenario fixture manifest,
- test coverage report,
- pipeline telemetry,
- projection policy plus bounded public proof and its disclosure/redaction proofs,
- deliverables manifest,
- and `ENGI_NEED.md`.

Completeness of this artifact set is a canonical V14 requirement.

### Current source references

- `engi-demo/src/engi-demo.js -> evaluateCandidates(...)`
- `engi-demo/src/engi-demo.js -> assembleAssetPack(...)`
- `engi-demo/src/engi-demo.js -> buildBranchArtifacts(...)`
- `engi-demo/src/engi-demo.js -> assertRequiredBranchArtifacts(...)`
- `engi-demo/public/app.js -> renderVerificationReportVisual(...)`
- `engi-demo/public/app.js -> renderSettlementParticipationVisual(...)`

---

# 10. Identity/auth as demonstration spine

## 10.1 Role

Identity, authorization, signing, and GitHub App authority are one chain in ENGI.

They bind:
- who is allowed to deposit,
- what repo supply the deposit came from,
- which signer or issuer is attesting to the payload,
- who may read or materialize private artifacts,
- who may publish bounded public proof,
- and who may settle exact accounting results.

## 10.2 Canonical surfaces

Canonical identity/auth-related surfaces include:
- GitHub App session,
- artifact selection surface,
- addressing surface,
- signing surface,
- GitHub App auth surface,
- identity bindings,
- authorization decisions,
- policy release,
- identity/auth spine surface,
- GitHub boundary surface.

## 10.3 Identity/auth spine structure

```ts
type IdentityAuthSpineSurface = {
  spineId: string
  buyerPrincipalId: string
  installationPrincipalId: string | null
  branchName: string | null
  settlementBundleId: string | null
  hops: Array<{
    hopId: string
    label: string
    principalRefs: string[]
    authoritySummary: string
    stageRefs: string[]
    rootRefs: string[]
    boundaryClass: 'modeled-local' | 'executed-local' | 'external-required'
  }>
}
```

The current canonical hop sequence is:
1. GitHub installation authority,
2. repo supply selection,
3. signer attestation,
4. buyer authority,
5. branch authority,
6. proof authority,
7. settlement authority.

## 10.4 Requirements

Identity/auth requirements in V14:
1. repo-authenticated intake MUST stay distinguishable from raw fallback-only deposit,
2. selected inventory roots MUST remain bindable back to session/auth payloads,
3. signer payloads MUST bind selection, addressing, and auth roots,
4. authorization decisions MUST remain explicit artifacts rather than implicit control flow,
5. policy release MUST remain first-class because projection, disclosure, and settlement depend on it,
6. the spine MUST be human-summarizable without losing formal structure.

### Current source references

- `engi-demo/src/engi-demo.js -> buildGitHubAppSession(...)`
- `engi-demo/src/engi-demo.js -> buildGitHubAppAuthSurface(...)`
- `engi-demo/src/engi-demo.js -> buildIdentityBindings(...)`
- `engi-demo/src/engi-demo.js -> buildAuthorizationDecisions(...)`
- `engi-demo/src/engi-demo.js -> buildIdentityAuthSpineSurface(...)`
- `engi-demo/public/app.js -> renderIdentityAuthSpineVisual(...)`
- `engi-demo/public/app.js -> renderGitHubBoundaryVisual(...)`

---

# 11. Proof and settlement as necessary closure

## 11.1 Proof model

ENGI proof is the closure mechanism that binds:
- measured need,
- selected supply,
- authorization chain,
- materialized branch artifacts,
- projection/disclosure policy,
- and settlement accounting.

The current proof architecture includes:
- prompt completeness proof,
- static measurement proof,
- verification receipts artifact,
- selection consistency proof,
- journal completeness proof,
- identity/authorization proof,
- sensitive-data-flow proof,
- materialization proof,
- materialization visibility proof,
- proof witness manifest,
- system proof bundle,
- bounded public proof,
- redaction proof,
- disclosure proof.

## 11.2 Settlement model

Settlement is both:
- economic closure,
- and a formal exact-accounting subsystem.

It therefore MUST make explicit:
- source-to-shares derivation,
- settlement participation,
- zero-credit participation,
- clipping and normalization,
- micro-unit allocation,
- debit/credit conservation,
- settlement preview,
- settlement proof,
- journal diff,
- accounting precision report.

## 11.3 Canonical settlement structures

```ts
type SourceToSharesArtifact = {
  needId: string
  conformanceProfile: string
  productionIntentProfile: string
  scoreScale: number
  bundleShareScoreWeightsBp: Record<string, number>
  settlementCandidateAssetIds: string[]
  bundleShareScore: Record<string, number>
  sourceContributionEntries: object[]
  clippingReceipts: object[]
  basisPointNormalization: object
  normalizationLedger: object[]
  rawShares: Record<string, string>
  proofHash: string
}

type SettlementParticipationArtifact = {
  conformanceProfile: string
  productionIntentProfile: string
  branchMode: 'context' | 'patch'
  selectedAssetCount: number
  settlementParticipatingCount: number
  positivelyCreditedCount: number
  zeroCreditParticipatingCount: number
  excludedFromSettlementCount: number
  records: object[]
  proofHash: string
}

type SettlementPreview = {
  needId: string
  bundleId: string
  branchMode: 'context' | 'patch'
  conformanceProfile: string
  productionIntentProfile: string
  selectedAssetIds: string[]
  rawShares: Record<string, string>
  settledShares: Record<string, string>
  meteredMicroUnits: string
  settlementParticipatingAssetIds: string[]
  creditedAssetIds: string[]
  zeroCreditAssetIds: string[]
  allocations: object[]
  semanticsNote: string
  assetPackLockHash: string
  sourceToSharesRef: string
  settlementParticipationRef: string
  receipts: object[]
}

type AccountingPrecisionReport = {
  needId: string
  assetPackId: string
  bundleId: string
  branchMode: 'context' | 'patch'
  conformanceProfile: string
  productionIntentProfile: string
  scoreScale: number
  sourceToSharesRef: string
  settlementParticipationRef: string
  contributionInputs: object
  clippingDecisions: object[]
  basisPointNormalization: object
  microUnitAllocation: object
  sourceMaterialToSharesClosure: object
  exactAccountingInvariants: {
    debitsEqualCredits: boolean
    basisPointsSumTo10000: boolean
    nonNegativeBalances: boolean
    allocationConserved: boolean
  }
  tieBreakExplanations: string[]
  reportHash: string
}
```

## 11.4 Invariants

Proof and settlement invariants in V14:
1. all proof-relevant artifacts MUST be digestible into the witness manifest,
2. bounded public proof MUST be derivable from the private proof closure without leaking private artifacts,
3. source-to-shares normalization MUST remain replayable,
4. zero-credit participation MUST remain explicit rather than silently erased,
5. the asset-pack lock hash MUST bind settlement closure,
6. debit/credit conservation MUST hold exactly,
7. journal roots MUST remain integrity-bearing,
8. settlement MUST remain explainable by profile shape.

## 11.5 Theorem-level expectations

The current prototype and V14 canon both require theorem-style checks for at least:
- share normalization totality,
- allocation conservation,
- debit/credit conservation,
- non-negative balances,
- reference closure,
- state-root integrity.

These are expanded in Appendix C.

### Current source references

- `engi-demo/src/engi-demo.js -> buildProofWitnessManifest(...)`
- `engi-demo/src/engi-demo.js -> buildSystemProofBundle(...)`
- `engi-demo/src/engi-demo.js -> buildSourceToSharesArtifact(...)`
- `engi-demo/src/engi-demo.js -> buildSettlementParticipationArtifact(...)`
- `engi-demo/src/engi-demo.js -> buildAccountingPrecisionReport(...)`
- `engi-demo/src/engi-demo.js -> buildSettlementProof(...)`
- `engi-demo/public/app.js -> renderSystemProofBundleVisual(...)`
- `engi-demo/public/app.js -> renderSettlementPreviewVisual(...)`

---

# 12. Boundary realism, projections, disclosure, and repo-to-settlement truth

## 12.1 Boundary realism

ENGI MUST be honest about what is:
- modeled locally,
- executed locally,
- or still externally required.

The local deterministic prototype currently:
- models GitHub App sessions and repo supply locally,
- executes need measurement, ranking, verification, proof, and settlement locally,
- does not mint live installation tokens,
- does not perform live branch writes,
- does not perform live proof publication to an external system,
- does not perform networked settlement effects.

## 12.2 Repo-to-settlement surface

The repo-to-settlement surface is the compact summary of the whole run.

```ts
type RepoToSettlementSurface = {
  flowId: string
  scenarioId: string
  branchName: string | null
  demonstrationProfile: DemonstrationProfile
  depositMode: string
  needMode: string
  stages: Array<{
    stageId:
      | 'depositing'
      | 'needing'
      | 'deposit-to-need-fit'
      | 'asset-pack'
      | 'branch'
      | 'proof'
      | 'settlement'
    label: string
    status: string
    boundaryClass: string
    summary: string
    refs: string[]
    metrics: Record<string, string | number | boolean>
  }>
}
```

The stage order is canonical.

## 12.3 Projection principals

The current projection principals are:
- `public`
- `buyer`
- `reviewer`
- `internal`

Projection rules MUST explicitly govern:
- which files are public,
- which files are private,
- whether only metadata or full artifacts are visible,
- whether a principal sees raw branch files or only inventory,
- and whether projection remains bounded relative to policy release.

## 12.4 Disclosure and redaction

Disclosure is not "show less stuff".
Disclosure in ENGI is a proof-bearing transformation that produces:
- projection policy,
- bounded public proof,
- redaction proof,
- disclosure proof.

These surfaces MUST jointly demonstrate:
1. which branch artifacts were materialized,
2. which are public,
3. which remain private,
4. why the public set is safe,
5. and how that safety is justified.

### Current source references

- `engi-demo/src/engi-demo.js -> buildBoundaryRealitySurface(...)`
- `engi-demo/src/engi-demo.js -> buildRepoToSettlementSurface(...)`
- `engi-demo/src/engi-demo.js -> buildProjectionPolicy(...)`
- `engi-demo/src/engi-demo.js -> buildBoundedPublicProofArtifact(...)`
- `engi-demo/src/engi-demo.js -> buildRedactionProof(...)`
- `engi-demo/src/engi-demo.js -> buildDisclosureProof(...)`
- `engi-demo/public/app.js -> renderBoundaryRealityVisual(...)`
- `engi-demo/public/app.js -> renderRepoToSettlementVisual(...)`
- `engi-demo/public/app.js -> renderBoundedProofVisual(...)`

---

# 13. Demonstration completeness, persistence, and validation

## 13.1 Demonstration completeness standard

A V14-conformant ENGI demonstration is complete when a serious reviewer can recover:
- repo supply,
- deposit choice,
- measured need,
- fit,
- selected asset pack,
- private branch artifact set,
- identity/auth chain,
- proof closure,
- exact settlement logic,
- boundary honesty,
- and validation evidence,

without the system collapsing into unexplained hidden state.

## 13.2 Telemetry and observability

Telemetry in ENGI serves both:
- system debugging,
- and demonstration debugging.

Canonical telemetry-bearing surfaces include:
- prompt surfaces,
- prompt contracts,
- measurement receipts,
- static measurement report,
- static measurement proof,
- verification receipts,
- proof witness manifest,
- pipeline telemetry,
- scenario fixture manifest,
- test coverage report.

## 13.3 Persistence and failure semantics

The local demo profile MUST preserve correctness under local failure.

Current requirements include:
1. state writes SHOULD be atomic,
2. malformed parser output MUST fail closed,
3. malformed API input MUST fail with explicit client error rather than corrupt state,
4. failed writes MUST NOT partially mutate persisted demo truth,
5. reset MUST restore seeded deterministic state,
6. path traversal MUST remain blocked,
7. unknown routes SHOULD fail predictably.

## 13.4 Test coverage requirement

Tests are part of canonical system truth in V14.

A conformant V14 implementation MUST explicitly account for:
- unit coverage,
- API coverage,
- browser e2e coverage,
- adversarial fixtures,
- scenario-family coverage,
- proof and projection coverage,
- settlement/accounting coverage,
- operator ordering coverage.

The dedicated V14 appendix on test coverage is normative, not optional.

## 13.5 Current completion condition for this repo

For the current deterministic prototype, V14 is in a good state when:
1. the V14 spec, notes, and implementation matrix exist,
2. the demo stays aligned to the preserved V12 design truth,
3. the artifact contract is internally consistent,
4. the test coverage artifact explicitly includes browser e2e validation expectations,
5. documentation reflects current repo truth rather than stale historical version labels,
6. tests run green.

### Current source references

- `engi-demo/server.js -> writeJsonAtomically(...)`
- `engi-demo/test/core.test.js`
- `engi-demo/test/api.test.js`
- `engi-demo/test/e2e.test.js`

---

# 14. Host capabilities, execution environments, and boundary-program truth

## 14.1 Role

Host capabilities are not peripheral infrastructure in ENGI.
They are part of system truth because ENGI correctness depends on knowing:
- which programs actually execute locally,
- which "programs" are in-process deterministic stages rather than external binaries,
- which proof or static-analysis claims come from upstream evidence rather than local execution,
- which remote programs remain modeled boundaries,
- how the repo is expected to be furnished or containerized,
- and what telemetry/safety guarantees hold on the host that runs the demo.

If these truths are omitted, the operator cannot tell where ENGI is truly executing, where it is only modeling, and which claims are actually replayable on the current machine.

## 14.2 Canonical host capability classes

V14 distinguishes the following classes and treats them as canonical system material:
1. runtime programs
   Programs actually required to start the repo, serve the demo, persist local state, and execute the core deterministic path.
2. machine-local programs
   Programs that may be installed on the host and may support authoring, inspection, or optional live-boundary work, but are not core-path requirements.
3. static-analysis programs
   Deterministic stages, whether in-process or subprocess-based, that produce measurement facts, parser facts, repo facts, code-analysis receipts, or verification determinisms.
4. proof programs
   Local proof-assembly stages plus optional upstream proof-log producers or remote proof services whose evidence may feed closure.
5. remote programs and remote-program boundaries
   Credential-gated or network-external systems such as GitHub APIs, remote model execution, workflow fetchers, vector stores, signer authorities, proof services, or settlement networks.

These classes MUST NOT be collapsed into one generic "tooling" bucket because ENGI correctness depends on knowing:
- what actually runs on the current machine,
- what is merely available on the machine,
- what emits measurement receipts locally,
- what proof evidence is assembled locally versus imported,
- and what remains modeled or externally required.

## 14.3 Bootstrap, furnishing, and configuration expectations

Host capability truth MUST say how the repo is expected to be furnished and configured without overstating production burden.

V14 bootstrap/furnishing rules are:
1. the minimal native runtime requirement MUST be stated separately from broader workstation inventory,
2. optional machine-local programs SHOULD be named as optional rather than quietly assumed,
3. bootstrap entrypoints, install expectations, and relevant config files SHOULD be named when they exist,
4. required environment variables, bind host/port expectations, and profile-specific live add-ons SHOULD be stated explicitly,
5. furnishing guidance MUST preserve the difference between:
   - native-minimal execution,
   - native-optional execution,
   - container execution,
   - and any future live-boundary or Profile B execution.

## 14.4 Containerization expectations

Containerization is a canonical execution configuration when the repo exposes container files, but it is not automatic proof of production readiness.

Containerization rules:
1. the spec MUST say which container configurations exist,
2. the spec MUST say whether the container path targets runtime, tests, or both,
3. the container path MUST preserve the same boundary truths as native execution unless explicitly stated otherwise,
4. the container path MUST NOT be described as making remote boundaries local,
5. if the container scope is intentionally narrow, that narrowness MUST be stated explicitly.

## 14.5 Telemetry and safety expectations

Host/runtime truth in ENGI includes safety and telemetry guarantees because these affect whether execution claims are trustworthy.

The host section MUST therefore state:
- atomic write expectations,
- request-size or input-size bounds,
- path traversal or path safety guarantees,
- disclosure and projection defaults,
- network assumptions for the core path,
- fail-closed behavior for parser or evaluator boundaries where relevant,
- and what telemetry artifacts or runtime receipts capture the host-execution truth.

## 14.6 Static-analysis measurement and execution truth relation

V14 requires host capability material to connect measurement claims to actual execution truth.

That means the host section MUST explain:
1. which measurement facts come from in-process deterministic logic,
2. which measurement facts come from subprocess execution if any,
3. which proof-related facts come only from upstream evidence or remote systems,
4. which receipts make those distinctions inspectable,
5. and how local execution truth constrains what the operator may honestly claim is replayable on the current machine.

Static-analysis measurement truth and execution truth MUST remain coupled.
The system MUST NOT describe a measurement as "local static analysis" unless it also states which local program or in-process stage produced it.

## 14.7 Canonical structures

```ts
type HostProgramCapability = {
  programId: string
  label: string
  capabilityClass: 'runtime' | 'machine-local' | 'static-analysis' | 'proof-program' | 'remote-program'
  executionMode: 'in-process' | 'subprocess' | 'upstream-evidence-only' | 'remote'
  role: string
  requiredFor: 'core-demo' | 'optional-local' | 'profile-b-live'
  requiredBySubsystems: string[]
  presentOnHost?: boolean
  version?: string | null
  producesArtifacts?: string[]
  receiptFamilies?: string[]
  boundaryNote?: string
}

type RemoteProgramBoundary = {
  boundaryId: string
  label: string
  localStatus: 'modeled-local' | 'executed-local' | 'external-required'
  remoteProgramKind:
    | 'github-api'
    | 'workflow-fetch'
    | 'model-execution'
    | 'vector-store'
    | 'signer-authority'
    | 'proof-service'
    | 'settlement-network'
    | 'other'
  localStandInContract: string
  requiredLiveInputs: string[]
  boundaryArtifacts: string[]
  failurePolicy: string
}

type StaticMeasurementExecutionTruth = {
  measurementClass: string
  producingProgramIds: string[]
  executionTruth: 'deterministic-local' | 'subprocess-local' | 'upstream-evidence-only' | 'remote'
  receiptArtifacts: string[]
  downstreamArtifacts: string[]
  operatorMeaning: string
}

type BootstrapFurnishingConfig = {
  furnishingMode: 'native-minimal' | 'native-optional' | 'container'
  requiredPrograms: string[]
  optionalPrograms: string[]
  bootstrapEntrypoints: string[]
  configFiles: string[]
  requiredEnvironmentKeys: string[]
  expectations: string[]
  nonGoals: string[]
  profileBLiveAdditions: string[]
}

type ContainerizationContract = {
  configurationIds: string[]
  imageInputs: string[]
  runtimeParityTarget: string
  supportsRuntime: boolean
  supportsTests: boolean
  impliesProductionReadiness: false
  excludedCapabilities: string[]
}

type HostTelemetryAndSafetyContract = {
  atomicWritesRequired: boolean
  pathTraversalBlocked: boolean
  bodySizeLimitBytes: number
  networkRequiredForCoreFlow: boolean
  defaultProjectionPrincipal: string
  publicDisclosureBounded: boolean
  telemetryArtifacts: string[]
  failClosedPrograms: string[]
  safetyBoundaries: string[]
  disclosureArtifacts: string[]
  containerScope: string[]
}

type HostConfiguration = {
  configurationId: string
  environmentKind: 'native' | 'container'
  startCommand?: string
  buildCommand?: string
  runCommand?: string
  purpose: string
  bindHost?: string
  bindPort?: number
}

type HostCapabilityManifest = {
  manifestVersion: string
  canonicalPointerVersion: string
  lastFullyRealizedCanonVersion: string
  currentImplementationTarget: string
  inspectedAt: string
  host: {
    os?: string
    arch?: string
  }
  runtimePrograms: HostProgramCapability[]
  machineLocalPrograms: HostProgramCapability[]
  staticAnalysisPrograms: HostProgramCapability[]
  proofPrograms: HostProgramCapability[]
  remoteProgramBoundaries: RemoteProgramBoundary[]
  staticMeasurementExecutionTruth: StaticMeasurementExecutionTruth[]
  bootstrapFurnishing: BootstrapFurnishingConfig
  containerization: ContainerizationContract
  telemetryAndSafety: HostTelemetryAndSafetyContract
  availableConfigurations: HostConfiguration[]
}
```

## 14.8 Requirements

Host capability requirements in V14:
1. the spec MUST state which programs are actually required to execute the core demo path,
2. all host capability categories MUST be named explicitly as runtime, machine-local, static-analysis, proof-program, or remote-program truth,
3. in-process deterministic stages that behave like static-analysis or proof programs MUST still be named as programs/contracts rather than hidden under generic implementation prose,
4. static-analysis measurement claims MUST say which program or in-process stage produced them and which receipt families or artifacts preserve that fact,
5. proof-program usage MUST distinguish local proof assembly from upstream proof-log production and from remote proof services,
6. remote-program boundaries MUST say what is modeled locally, what would be required live, and which artifacts carry that boundary truth,
7. bootstrap/furnishing guidance MUST describe the minimal repo requirement without overclaiming a production bootstrap burden,
8. host configuration guidance MUST describe start/test/container configurations and any relevant env or bind expectations,
9. telemetry and safety obligations MUST state atomic write, bounded disclosure, request-size, path-safety, network, and fail-closed assumptions,
10. containerization MUST be described as an execution configuration, not as implicit production readiness,
11. when the repo exposes host capability documents, both human-readable and structured forms SHOULD stay aligned with the canonical spec status and version nuance.

## 14.9 Invariants

Host capability invariants in V14:
1. a machine-local program MUST NOT be described as core-required if the core path does not actually call it,
2. a remote boundary MUST NOT be described as host-ready merely because a CLI is installed,
3. proof-program presence MUST NOT be conflated with live proof-program execution,
4. static-analysis receipts MUST identify the deterministic tool/program or in-process stage that produced them,
5. measurement truth MUST NOT be upgraded from upstream evidence to deterministic-local execution without explicit evidence,
6. bootstrap/furnishing config MUST remain narrower than workstation inventory whenever the repo itself is narrow,
7. container configurations MUST NOT erase modeled boundary truth,
8. telemetry and safety claims MUST remain traceable to actual server/runtime behavior,
9. host/container docs MAY be adjunct documents, but their expectations are canonical system requirements once referenced by the spec.

## 14.10 Current implementation reading

For the current repo:
- `node` and filesystem access are the hard runtime requirements,
- many analysis and proof-relevant stages are real local in-process Node programs even when no external CLI is invoked,
- `python3`, `rustc`, `cargo`, `git`, `docker`, `jq`, `rg`, `curl`, `openclaw`, and `codex` are optional machine-local programs rather than core-path requirements,
- static measurement truth is mostly deterministic-local and in-process rather than subprocess-driven,
- proof-program execution is mostly upstream-evidence-only while proof assembly is local and real,
- GitHub auth, workflow fetch, remote model execution, signer authority checks, proof publication, and settlement network effects remain remote-program boundaries,
- native runtime/test and container runtime/test are the canonical execution configurations,
- the current host capability adjunct docs still preserve useful execution truth even though they predate the V14/latest-target wording, and the implementation matrix tracks that label lag explicitly rather than hiding it.

## 14.11 Current source references

- `engi-demo/HOST_CAPABILITIES.md`
- `engi-demo/HOST_CAPABILITIES.json`
- `engi-demo/Dockerfile`
- `engi-demo/.dockerignore`
- `engi-demo/server.js -> writeJsonAtomically(...)`
- `engi-demo/server.js -> createAppContext(...)`
- `engi-demo/test/api.test.js -> HOST capability docs are present in repo`

---

# Appendix A - Precise type and schema appendix

## A.1 Demonstration profile and repo supply

Canonical profile and repo supply schemas are the ones defined in sections `6.1`, `7`, and `12.2`.

Additional current-source fields that matter for repo-bound interpretation:

```ts
type PublicGitHubAppSession = {
  authSessionId: string
  authMechanism: 'github-app-installation'
  appId: string
  appSlug: string
  installationId: string
  installationAccountLogin: string
  installationAccountId: string
  installationAccountNodeId: string
  installationAccountType: string
  operatorLogin: string
  repo: string
  owner: string
  repoName: string
  repositoryId: string
  repositoryNodeId: string
  repositoryVisibility: string
  repositorySelection: string
  permissions: Record<string, string>
  permissionsRoot: string
  defaultRef: string
  defaultSignerAddress: string
  signingAlgorithm: string
  keySource: string
  sessionIssuedAt: string
  sessionExpiresAt: string
  tokenBoundary: object
  authPayloadHash: string
  localBoundary: string
  externalBoundary: string
}
```

V14 rule:
Session surfaces MUST remain explicit enough that a reviewer can tell:
- what repository the session claims authority over,
- what permissions were modeled,
- what payload hash binds that authority,
- and what remains modeled rather than live.

## A.2 Need descriptor and measurement package

```ts
type NeedMeasurementPackage = {
  needDescriptor: NeedDescriptor
  benchmarkTarget: object
  canonicalBenchmarkOutputs: object
  benchmarkParserContract: object
  parserValidation: {
    ok: boolean
    reasons?: string[]
  }
  inferenceProofs: object[]
  promptSurfaces: object[]
  promptContracts: object[]
  promptCompletenessProof: object
  measurementProvenance: object[]
  staticExecutionReceipts: object[]
}
```

V14 rule:
The need measurement package MUST make parser closure, prompt closure, and static receipt closure recoverable from one artifact family.

## A.3 Candidate asset and evaluation schema

```ts
type VerificationRights = {
  branchMaterializationAllowed: boolean
  settlementAllowed: boolean
}

type MatchReport = {
  needId: string
  conformanceProfile: string
  productionIntentProfile: string
  branchMode: 'context' | 'patch'
  selectedAssets: object[]
  rejectedAssets: object[]
}

type VerificationReport = {
  needId: string
  conformanceProfile: string
  productionIntentProfile: string
  branchMode: 'context' | 'patch'
  assetVerification: object[]
  verificationReceiptCount: number
  verificationFamilies: string[]
}
```

V14 rule:
Verification MUST remain distinct from ranking.
Any system that collapses them back into one monolithic score is not V14-conformant.

## A.4 Projection, settlement, and validation schemas

```ts
type ProjectionPolicy = {
  conformanceProfile: string
  productionIntentProfile: string
  defaultPrincipal: 'public' | 'buyer' | 'reviewer' | 'internal'
  principals: string[]
  artifactRules: object[]
  privateArtifactPaths: string[]
  publicArtifactPaths: string[]
  materializedBranchFileCount: number
}

type TestCoverageReport = {
  conformanceProfile: string
  productionIntentProfile: string
  activeScenarioId: string
  declaredCoverageTargets: string[]
  suiteCoverage: {
    unit: object
    api: object
    browserE2E: object
  }
  adversarialCoverage: object
  latestRunCoverage: object
  reportHash: string
}
```

V14 rule:
Browser e2e coverage is part of canonical test reporting, not an external note.

## A.5 Host capability and execution environment schema

```ts
type HostCapabilityAdjunctRefs = {
  humanReadableDoc: string
  structuredDoc: string
  containerFiles: string[]
  validationRefs: string[]
  categoryCoverage: Array<'runtime' | 'machine-local' | 'static-analysis' | 'proof-program' | 'remote-program'>
  measurementTruthRefs: string[]
}
```

V14 rule:
Host capability documents are adjunct artifacts rather than branch artifacts, but once they are part of the repo canon they MUST still preserve:
- canonical pointer version,
- last fully realized canon version,
- host capability role,
- required-vs-optional program truth,
- static-analysis vs proof-program truth,
- static-analysis measurement vs execution-truth relations,
- remote-boundary truth,
- bootstrap/furnishing expectations,
- telemetry and safety expectations,
- container-scope limitations,
- and explicit disclosure in the implementation matrix when adjunct labels lag the current pointer wording.

---

# Appendix B - Evaluator and inference appendix

## B.1 Scope and purpose

V14 restores the V5/V6 rule that all inference moments and evaluator contracts must be explicit.

This appendix therefore covers:
- all prompt-bearing inference moments,
- all hybrid evaluator moments,
- all deterministic static-analysis moments that feed inference or verification,
- prompt templates and prompt contracts,
- context expectations and injectables,
- output schemas and parsable completion obligations,
- recall-channel contracts,
- evaluator telemetry, failure, and hand-off rules.

The current deterministic prototype still models prompt-bearing and evaluator-bearing interfaces even when the actual output is produced by deterministic stand-ins rather than a live remote model.
That modeled status does not exempt the contracts from being explicit.

## B.2 Canonical evaluator envelopes and traces

```ts
type EvaluatorSurface = {
  evaluatorId: string
  evaluatorKind: string
  measurementClass: string
  mode: 'static' | 'inferred' | 'hybrid' | 'policy'
  modelId: string
  promptId?: string | null
  toolId?: string | null
  replayableTrace: boolean
  standIn: boolean
  evidenceRefs: string[]
}

type MeasurementTrace = {
  mode: 'static' | 'inferred' | 'hybrid' | 'policy'
  measurementClass: string
  evaluatorKind: string
  toolOrPromptId: string
  version: string
  evidenceRefs: string[]
  receiptRefs: string[]
  evaluatorSurface: EvaluatorSurface
}

type EvaluatorRequestEnvelope = {
  evaluatorId: string
  evaluatorVersion: string
  staticTemplateId?: string
  promptId?: string
  toolId?: string
  modelId: string
  expectedPayloadType: string
  contextInjectables: Record<string, unknown>
}

type EvaluatorResponseEnvelope<TPayload> = {
  evaluatorId: string
  evaluatorVersion: string
  modelId: string
  payloadType: string
  payload: TPayload
  parseOk: boolean
  payloadHash: string
}

type InferenceMomentContract = {
  evaluatorId: string
  mode: 'static' | 'inferred' | 'hybrid' | 'policy'
  momentKind:
    | 'parser'
    | 'repo-context'
    | 'code-analysis'
    | 'embedding-standin'
    | 'need-measurement'
    | 'candidate-recall'
    | 'ranking'
    | 'verification'
  ownedOutputFields: string[]
  receiptFamilies: string[]
  expectedEvidenceRefs: string[]
  expectedContextFields: string[]
  downstreamArtifacts: string[]
  parseContractId?: string | null
  boundaryTruth: 'deterministic-local' | 'stand-in-local' | 'upstream-evidence-only' | 'remote'
}
```

V14 recognizes both:
- provenance classes such as `static-executed`, `inferred-derived`, `hybrid-composed`, `policy-derived`, and `copied`,
- and operational evaluator classes such as `static-analysis`, `inferred-measurement`, `hybrid-evaluation`, and `embedding-derivation`.

These are not interchangeable.
The system MUST keep visible which claims came from:
- parser normalization,
- repo-static analysis,
- deterministic tokenization or heuristic extraction,
- stand-in embedding generation,
- synthesized prompt-driven reasoning,
- hybrid fusion/scoring stages,
- or direct policy input.

Every evaluator-bearing or inference-bearing surface in V14 SHOULD be representable as an `InferenceMomentContract` even when the current implementation emits those relations across multiple artifacts rather than one consolidated catalog artifact.

## B.3 Canonical inference moments and evaluator moments

The current source exposes the following canonical moments:

- `github-actions.benchmark-parser.v2`
  Owns canonical benchmark normalization and parser fail-closed behavior for need materialization.
- `github.repo-context.extract.v2`
  Owns repo-static context such as touched paths, symbols, config keys, and stack hints.
- `content-unit.extract-static-code-analysis.v9`
  Owns content-unit-local static facts and receipts.
- `content-unit.embedding-standin.v8`
  Owns stand-in semantic vectors for task, failure-mode, and technical-context spaces.
- `need-measurement.task.v2`
  Owns the inferred `task` field of the need descriptor.
- `need-measurement.failure-modes.v2`
  Owns inferred `failureModes`.
- `need-measurement.constraints.v2`
  Owns inferred `constraints` and demonstrates declared non-rendered context via `repoPrivacy`.
- `need-measurement.target-artifact-kinds.v2`
  Owns inferred `targetArtifactKinds`.
- `candidate-recall.hybrid.v2`
  Owns hybrid recall assembly over semantic, lexical, symbol, path, config, and artifact-kind channels.
- `ranking.recall-fusion.v2`
  Owns fusion explanation over recall evidence.
- `ranking.need-match.v2`
  Owns hybrid need-match scoring over current need and candidate evidence.
- `ranking.benchmark-impact.v2`
  Owns hybrid benchmark-impact scoring.
- `ranking.actionability.v2`
  Owns hybrid actionability scoring.
- `verification.determinisms.v2`
  Owns issuance, provenance, sufficiency, and issuer-policy determinisms plus use-tier decision support.

V14 rule:
Every inference-bearing or evaluator-bearing moment MUST have:
1. a stable evaluator/program id,
2. declared owned output fields or receipts,
3. declared input/evidence expectations,
4. declared downstream artifacts or consumers,
5. explicit stand-in vs live boundary truth.

The current canonical moment families are:
- parser and repo-context moments
  `github-actions.benchmark-parser.v2`, `github.repo-context.extract.v2`
- deterministic content analysis moments
  `content-unit.extract-static-code-analysis.v9`, `content-unit.embedding-standin.v8`
- prompt-bearing need-measurement moments
  `need-measurement.task.v2`, `need-measurement.failure-modes.v2`, `need-measurement.constraints.v2`, `need-measurement.target-artifact-kinds.v2`
- hybrid recall and ranking moments
  `candidate-recall.hybrid.v2`, `ranking.recall-fusion.v2`, `ranking.need-match.v2`, `ranking.benchmark-impact.v2`, `ranking.actionability.v2`
- deterministic verification moments
  `verification.determinisms.v2`

No V14 inference appendix is complete unless every field or receipt owned by these families can be traced back to one of the declared moments.

## B.4 Prompt surfaces, prompt contracts, and context injectables

```ts
type PromptContextInput = {
  order: number
  field: string
  value: unknown
  source: string
  evidenceRefs: string[]
  artifactBindings: string[]
  notes: string | null
}

type PromptContract = {
  promptId: string
  templateVersion: string
  templateHash: string
  contextSchemaHash: string
  outputSchemaHash: string
  placeholderSet: string[]
  declaredContextFields: string[]
  renderedContextFields: string[]
  nonRenderedContextFields: string[]
  unusedContextFields: string[]
  missingPlaceholderBindings: string[]
  undeclaredNonRenderedContextFields: string[]
  evidenceRefDigest: string
  downstreamArtifactBindings: string[]
  expectedOutputSchema: Array<{
    field: string
    type: string
    required: boolean
  }>
  completeness: {
    ok: boolean
    missingPlaceholderBindings: string[]
    unusedContextFields: string[]
    undeclaredNonRenderedContextFields: string[]
  }
  contractHash: string
}

type PromptTemplateContract = {
  promptId: string
  templateVersion: string
  templateHash: string
  purpose: string
  ownedOutputFields: string[]
  requiredRenderedContextFields: string[]
  allowedNonRenderedContextFields: string[]
  downstreamArtifacts: string[]
  parseContractId: string
}

type ContextInjectableExpectation = {
  field: string
  requiredForPromptIds: string[]
  sourceKinds: string[]
  mayBeNonRendered: boolean
  failurePolicy: 'fail-closed' | 'emit-boundary-warning'
}

type PromptSurface = {
  promptId: string
  purpose: string
  templateVersion: string
  template: string
  interpolatedPrompt: string
  interpolatedValues: Record<string, unknown>
  contextInputs: PromptContextInput[]
  lineage: {
    derivedFrom: string[]
    evidenceRefs: string[]
    outputFields: string[]
    downstreamArtifacts: string[]
  }
  promptContract: PromptContract
  evaluatorSurface: EvaluatorSurface
}
```

The current prompt-bearing surfaces use the following context fields:
- `repo`,
- `baseRef`,
- `benchmarkRunId`,
- `failingCases`,
- `weakDimensions`,
- `touchedPaths`,
- `constraints`,
- `symbols`,
- `stackHints`,
- `repoPrivacy`.

The canonical context-injectable expectations are:
- `repo`, `baseRef`, `benchmarkRunId`
  Required rendered repo-identity and benchmark-context inputs for all current need-measurement prompts.
- `failingCases`, `weakDimensions`
  Required rendered benchmark-evidence inputs for need-measurement prompts.
- `touchedPaths`, `symbols`, `stackHints`
  Repo-context injectables sourced from deterministic static analysis and used to localize the measurement story.
- `constraints`
  Policy- and scenario-derived context that may be rendered or carried forward as declared prior-canon input depending on the prompt family.
- `repoPrivacy`
  Canonical non-rendered but declared context input demonstrating that hidden context is still part of the prompt contract.

The current prompt-bearing output ownership is:
- `need-measurement.task.v2` -> `task`,
- `need-measurement.failure-modes.v2` -> `failureModes`,
- `need-measurement.constraints.v2` -> `constraints`,
- `need-measurement.target-artifact-kinds.v2` -> `targetArtifactKinds`.

The current prompt template families are:
- `need-measurement.task.template.v2`
  Owns `task` and must bind benchmark evidence plus repo context.
- `need-measurement.failure-modes.template.v2`
  Owns `failureModes` and must bind failing-case and weakness evidence.
- `need-measurement.constraints.template.v2`
  Owns `constraints` and must preserve the rendered vs non-rendered context distinction.
- `need-measurement.target-artifact-kinds.template.v2`
  Owns `targetArtifactKinds` and must bind need shape back to artifact-kind expectations.

V14 requires:
1. every prompt template separate static template text from injected runtime context,
2. every injected field be traceable to scenario evidence, static measurements, policy inputs, or prior canonical artifacts,
3. every non-rendered context field be declared explicitly,
4. every output field have a declared owning evaluator,
5. every downstream artifact consuming prompt output be identified,
6. deterministic stand-ins still emit the same prompt lineage and completeness surfaces as a live prompt path would require,
7. the set of required rendered fields and allowed non-rendered fields be explicit per prompt family rather than inferred from prose.

## B.5 Output schemas and parsable completion contracts

```ts
type ParsableCompletionContract = {
  contractId: string
  evaluatorId: string
  payloadType: string
  schemaHash: string
  ownedOutputFields: string[]
  requiredTopLevelKeys: string[]
  parseMode: 'strict-json-object'
  requiresExactTopLevelKeys: boolean
  allowsExtraneousText: false
  numericRangeConstraints?: Record<string, { min: number, max: number }>
  downstreamArtifacts: string[]
  onParseFailure: 'reject-and-emit-telemetry'
  onMissingRequiredField: 'fail-closed'
}
```

For the current prompt-bearing need-measurement surfaces the canonical payload types are:
- `need-measurement.task.v2` -> `{ task: string }`,
- `need-measurement.failure-modes.v2` -> `{ failureModes: string[] }`,
- `need-measurement.constraints.v2` -> `{ constraints: string[] }`,
- `need-measurement.target-artifact-kinds.v2` -> `{ targetArtifactKinds: string[] }`.

V14 rule:
When prompt-bearing inference is executed or modeled, the system MUST define the exact payload type, not merely a vague "string-or-array" allowance.

Each prompt-bearing evaluator MUST therefore have a parsable completion contract that states:
- exact payload type,
- exact top-level keys,
- owned output fields,
- downstream artifact bindings,
- and fail-closed behavior on parse or shape mismatch.

If parsing fails, ENGI MUST:
1. reject the completion,
2. emit telemetry containing the parse failure,
3. avoid silently falling back to free-form prose,
4. avoid treating malformed completion output as static evidence.

The current deterministic prototype models these completion obligations but does not yet emit a first-class parsed completion envelope artifact for stand-in prompt execution.
That distinction belongs in the implementation matrix, not in hidden assumptions.

## B.6 Recall channel contracts and fact lifecycle

The current recall channel families are canonical for V14:
- semantic task search,
- failure mode search,
- technical context search,
- lexical search,
- symbol search,
- path search,
- config key search,
- artifact-kind filtered search.

V14 requires:
1. channel families remain distinct,
2. recall provenance remain inspectable,
3. fusion not erase channel-specific evidence,
4. artifact-kind filtering remain a first-class recall concern,
5. code-analysis and static fact registries preserve where a fact came from, which consumers rely on it, and where it is stored in the run structure.

## B.7 Verification receipts, use tiers, and hand-off rules

Verification in V14 must include distinct evidence for:
- issuance verification,
- provenance verification,
- verification sufficiency,
- issuer policy status.

Use tiers MUST remain downstream of verification rather than ad hoc labels.

Inference/evaluator outputs MAY support:
- need measurement,
- recall fusion,
- ranking subcomponents,
- verification explanation,
- proof narration.

They MUST NOT directly assign:
- final use tier,
- final asset-pack membership,
- final settlement shares,
- final journal entries,
- final bounded-public disclosure.

Those remain deterministic system responsibilities.

## B.8 Telemetry, failure, and boundary rules

For every evaluator call or evaluator-like deterministic stage, ENGI SHOULD record:
- evaluator/program id and version,
- model id where relevant,
- template/version ids where relevant,
- injected context keys,
- evidence refs,
- parse result or receipt result,
- payload or receipt hash,
- downstream fields or artifacts written,
- stand-in vs live boundary status.

Current source references:
- `engi-demo/src/engi-demo.js -> buildPromptContract(...)`
- `engi-demo/src/engi-demo.js -> assertPromptContractComplete(...)`
- `engi-demo/src/engi-demo.js -> buildPromptSurface(...)`
- `engi-demo/src/engi-demo.js -> measureNeedFromScenario(...)`
- `engi-demo/src/engi-demo.js -> buildRecallChannelContracts(...)`
- `engi-demo/src/engi-demo.js -> buildEvalManifest(...)`
- `engi-demo/src/engi-demo.js -> buildPromptImplementationSurface(...)`
- `engi-demo/src/engi-demo.js -> measurementTrace(...)`
- `engi-demo/src/engi-demo.js -> inferenceProof(...)`

---

# Appendix C - Proof obligations and witness appendix

## C.1 Scope and purpose

This appendix restores the V5/V6 proof posture where proof is not one bundle-shaped afterthought.
Proof in ENGI is the family of obligations and witnesses that closes:
- need measurement,
- evaluator and inference ownership,
- selection and materialization,
- identity and authorization,
- confidentiality and disclosure,
- settlement and journal state transition.

## C.2 Canonical proof family catalog

```ts
type ProofFamilyWitness = {
  proofFamily: string
  definition: string
  witnessArtifactPaths: string[]
  witnessRefs: string[]
  requiredObligations: string[]
}

type ProofObligationDescriptor = {
  subsystemId: string
  obligationId: string
  requiredProofFamilies: string[]
  requiredWitnessArtifacts: string[]
  theoremIds: string[]
  failureConsequence: string
}
```

The canonical V14 proof families are:

- `inference-synthesis`
  Definition: inferred fields are owned by declared evaluators and remain traceable to declared evidence.
  Required witnesses: prompt surfaces, evaluator surfaces, inference proofs, prompt implementation surfaces, and any parsed completion envelopes where live execution occurs.
- `prompt-completeness`
  Definition: prompt templates, placeholder bindings, non-rendered context declarations, and downstream artifact bindings are complete.
- `static-code-analysis`
  Definition: deterministic parser, repo-context, content-unit, and measurement stages are receipt-bearing and replayable.
- `verification-decisions`
  Definition: issuance, provenance, sufficiency, issuer-policy, and use-tier consequence surfaces are receipt-backed.
- `selection-and-materialization`
  Definition: selected assets, locked units, materialized source, exclusions, and visibility rules are mutually consistent.
- `authorization-and-sensitive-flow`
  Definition: principals, authorization decisions, confidentiality classes, retention/disclosure rules, and sensitive-data flows are explicit and policy-backed.
- `settlement-source-to-shares`
  Definition: contribution, clipping, normalization, participation, allocation, journal, and settlement proof surfaces close exactly.
- `disclosure-boundary`
  Definition: projection policy, bounded-public proof, redaction proof, and disclosure proof agree and remain bounded.
- `proof-contract`
  Definition: the system proof bundle and proof contract bind the cross-cutting closure path end to end.

No V14 proof appendix is complete unless the major subsystems can be mapped to explicit `ProofObligationDescriptor` entries and those entries can be substantiated by witness material.

## C.3 Canonical proof object structures

```ts
type InferenceSynthesisProof = {
  outputField: string
  evidenceRefs: string[]
  promptOrEvaluatorId: string
  modelId: string
  replayableTrace: boolean
  admissible: boolean
  evaluatorSurface: EvaluatorSurface
}

type AssetMeasurementProof = {
  assetId: string
  contentRoot: string
  unitRefs: string[]
  measurementsTraceableToUnits: boolean
  measurementReplayable: boolean
  measurementPolicySatisfied: boolean
  witnessRefs: {
    receiptRefs: string[]
    unitHashes: string[]
  }
}

type SelectionConsistencyProof = {
  assetPackId: string
  branchMode: 'context' | 'patch'
  assetPackSelectionsMatchSelectedCandidates: boolean
  allSelectedAssetsRespectUseTier: boolean
  materializedSourceManifestMatchesAssetPack: boolean
  materializedSourceUnitsClosedOverLock: boolean
  settlementParticipantsSubsetOfSelectedAssets: boolean
  settlementConsumesOnlySettlementEligibleAssets: boolean
  witnessRefs: object
  proofHash: string
}

type JournalCompletenessProof = {
  eventId: string
  allRequiredReasonsCovered: boolean
  noUnclassifiedTransfers: boolean
  eventRefsConsistent: boolean
  replayableJournal: boolean
  receiptRefsClosed: boolean
  afterBalancesRecomputeExactly: boolean
  witnessRefs: object
  proofHash: string
}

type IdentityAuthorizationProof = {
  resourceRef: string
  allAccessBoundToKnownPrincipals: boolean
  allStateChangingActionsAuthorized: boolean
  issuerIdentityBound: boolean
  buyerDeliveryPrincipalsBound: boolean
  githubAppInstallationBound: boolean
  witnessRefs: object
  proofHash: string
}

type SensitiveDataFlowProof = {
  allPrivateArtifactsClassified: boolean
  allFlowsRecorded: boolean
  requiredSensitiveClassesCovered: boolean
  noUnauthorizedPublicDisclosure: boolean
  retentionPoliciesAssigned: boolean
  revocationBehaviorDefined: boolean
  witnessRefs: object
  proofHash: string
}

type ProofWitnessManifest = {
  artifactDigests: Array<{
    path: string
    digest: string
    proofFamilies: string[]
  }>
  allProofRelevantArtifactsDigested: boolean
  proofFamilies: ProofFamilyWitness[]
  proofHash: string
}
```

## C.4 Subsystem obligations

```ts
type TheoremCatalogEntry = {
  theoremId: string
  statement: string
  appliesToSubsystems: string[]
  proofFamilies: string[]
  witnessArtifacts: string[]
}
```

### C.4.1 Inference synthesis obligations

Inference synthesis MUST prove:
- every inferred field references declared static evidence,
- no prompted inference is treated as if it were static measurement,
- prompt/model identity is recorded,
- repeated execution over the same declared inputs is replayable at the trace level,
- each inferred output field has a declared responsible evaluator,
- stand-in vs live evaluator status is explicit.

### C.4.2 Need measurement obligations

Need measurement MUST prove:
- parser validation succeeded,
- required benchmark inputs were present,
- field derivations are evidence-backed,
- static receipt refs resolve,
- prompt-owned inferred fields are distinguishable from static measurements.

### C.4.3 Recall, ranking, and verification obligations

Recall, ranking, and verification MUST prove:
- recall-channel provenance remains inspectable,
- ranking subscores remain distinct from verification outcomes,
- verification receipts remain family-specific,
- use tiers remain derived from verification rather than ad hoc labels,
- rejected or downgraded assets remain explainable from witness-bearing evidence.

### C.4.4 Selection and materialization obligations

Selection/materialization MUST prove:
- selected assets are consistent with the asset pack,
- selected source material matches the lock,
- rejected assets remain explainable,
- branch-mode rights are respected,
- settlement consumes only settlement-eligible assets,
- public visibility rules do not leak private materialization state.

### C.4.5 Identity and authorization obligations

Identity and authorization MUST prove:
- the buyer principal is explicit,
- GitHub installation or session bindings are explicit,
- signer bindings are explicit,
- branch/proof/settlement authorities are explicit,
- authorization decisions are policy-backed.

### C.4.6 Projection and disclosure obligations

Projection/disclosure MUST prove:
- only allowed artifacts are public,
- private artifacts do not leak into public projection,
- bounded public proof is metadata-bounded,
- redaction and disclosure proofs agree with policy release.

### C.4.7 Settlement obligations

Settlement MUST prove:
- source-to-shares derivation is replayable,
- clipping and tie-breaks are stable,
- allocation is conserved,
- debits equal credits,
- state roots remain coherent,
- zero-credit participants are explicit where present.

### C.4.8 Host/runtime and validation parity obligations

Host/runtime and validation parity MUST prove:
- host capability claims agree with the canonical execution truth,
- measurement receipts and proof receipts do not overclaim local execution,
- canonical operator-experience parity surfaces do not contradict proof-bearing or settlement-bearing artifacts,
- test coverage, proof witness coverage, and spec-to-source parity remain mutually coherent.

## C.5 Theorem catalog

V14 formally expects theorem-style checks with stable identities, explicit witness bindings, and explicit subsystem scope.

The current canonical theorem catalog includes at least:
1. `share-normalization-totality`
   Share normalization yields a total, replayable allocation domain for all eligible participants.
2. `allocation-conservation`
   Final share allocation conserves total distributable value.
3. `debit-credit-conservation`
   Journal debits equal journal credits.
4. `non-negative-balances`
   Derived balances do not violate the non-negative invariants defined by settlement policy.
5. `reference-closure`
   Proof-bearing and settlement-bearing artifacts reference only resolvable prior artifacts, receipts, or digests.
6. `state-root-integrity`
   Before/after roots and event refs remain coherent under replay.
7. `materialization-lock-closure`
   Materialized source artifacts close exactly over the selected asset-pack lock.
8. `prompt-completeness-closure`
   Prompt-owned fields are backed by complete prompt contracts and admissible parse contracts.
9. `public-disclosure-boundedness`
   Public disclosure remains metadata-bounded and excludes protected private artifacts.
10. `proof-witness-digest-closure`
    Proof-relevant artifacts are either digested into the witness manifest or explicitly represented by a family witness structure.

The theorem catalog is incomplete if theorem names exist without:
- a statement,
- affected subsystems,
- expected proof families,
- or witness-bearing artifact paths.

## C.6 Witness-manifest closure rules

The proof witness manifest is the compact answer to:
- which proof-relevant artifacts existed,
- whether they were individually digested,
- which proof families were represented,
- what witness refs substantiate each family,
- and what proof hash now summarizes the closure set.

V14 requires:
1. every proof family named by the spec be representable in the witness manifest,
2. every proof-relevant artifact path emitted by the system be digestible or explicitly incorporated into a family witness structure,
3. indirect reference through `system-proof-bundle.json` not be used to hide missing family-specific witness coverage,
4. witness families and artifact digests stay mutually coherent.

If a proof-relevant artifact exists but is not digestible into the witness manifest, V14 parity is incomplete.

Current source references:
- `engi-demo/src/engi-demo.js -> inferenceProof(...)`
- `engi-demo/src/engi-demo.js -> buildSelectionConsistencyProof(...)`
- `engi-demo/src/engi-demo.js -> buildJournalCompletenessProof(...)`
- `engi-demo/src/engi-demo.js -> buildIdentityAuthorizationProof(...)`
- `engi-demo/src/engi-demo.js -> buildSensitiveDataFlowProof(...)`
- `engi-demo/src/engi-demo.js -> buildSettlementProof(...)`
- `engi-demo/src/engi-demo.js -> buildProofWitnessManifest(...)`
- `engi-demo/src/engi-demo.js -> buildProofContract(...)`
- `engi-demo/src/engi-demo.js -> buildSystemProofBundle(...)`

---

# Appendix D - Artifact and deliverables appendix

## D.1 Required branch artifact families

The current deterministic prototype materializes the following branch artifact families:

| Family | Representative paths | Expected confidentiality |
|---|---|---|
| Need and measurement | `.engi/need.json`, `.engi/need-measurement.json`, `.engi/benchmark-target.json` | private or proof-bound |
| Primary operating surfaces | `.engi/depositing-surface.json`, `.engi/needing-surface.json`, `.engi/depositing-to-needing-surface.json` | mixed; some bounded metadata |
| Evaluation | `.engi/match-report.json`, `.engi/verification-report.json`, `.engi/eval-manifest.json` | mixed |
| Asset pack and source material | `.engi/asset-pack.lock.json`, `.engi/selected-source-material.json` | private |
| Identity and policy | `.engi/authorization-decisions.json`, `.engi/sensitive-data-flow.json`, `.engi/policy-release.json`, `.engi/identity-bindings.json`, `.engi/github-boundary.json` | private |
| Prompt and measurement proof | `.engi/prompt-surfaces.json`, `.engi/prompt-contracts.json`, `.engi/prompt-completeness-proof.json`, `.engi/measurement-receipts.json`, `.engi/static-measurement-report.json`, `.engi/static-measurement-proof.json` | mixed |
| Verification proof | `.engi/verification-receipts.json`, `.engi/code-analysis-fact-registry.json`, `.engi/static-heuristics-registry.json` | mixed |
| Materialization proof | `.engi/materialization-proof.json`, `.engi/materialization-exclusions.json`, `.engi/materialization-visibility-proof.json` | mixed |
| Settlement | `.engi/source-to-shares.json`, `.engi/settlement-participation.json`, `.engi/settlement-preview.json`, `.engi/journal-diff.json`, `.engi/accounting-precision-report.json`, `.engi/settlement-proof.json` | mostly private |
| Projection and disclosure | `.engi/projection-policy.json`, `.engi/bounded-public-proof.json`, `.engi/redaction-proof.json`, `.engi/disclosure-proof.json` | bounded metadata |
| Validation | `.engi/scenario-fixture-manifest.json`, `.engi/test-coverage-report.json`, `.engi/pipeline-telemetry.json`, `.engi/unit-catalog.json` | mixed |
| Inventory and summaries | `.engi/deliverables.json`, `ENGI_NEED.md` | mixed |

## D.2 Deliverables manifest completeness rule

The deliverables manifest MUST enumerate the branch artifact set densely enough that a reviewer can tell:
- what path exists,
- which use tiers contributed to it,
- whether it is potentially disclosable,
- and what subsystem families it depends on.

If a branch artifact is emitted but omitted from the deliverables manifest, spec parity is incomplete.

## D.3 Public projection inventory

The current bounded-public projection includes the following public-safe artifacts:
- bounded public proof,
- needing surface,
- depositing-to-needing surface,
- prompt completeness proof,
- code analysis fact registry,
- static heuristics registry,
- static measurement report,
- static measurement proof,
- materialization proof,
- materialization visibility proof,
- scenario fixture manifest,
- test coverage report,
- projection policy,
- redaction proof,
- disclosure proof.

This set is canonical for the current prototype unless later versions explicitly expand or contract it.

## D.4 Artifact contract checks

The repository MUST maintain a required-artifact contract check over the branch artifact set.
That contract is part of spec conformance, not merely a helper assertion.

---

# Appendix E - Scenario and example appendix

## E.1 Scenario family expectations

The current seeded scenario corpus is expected to cover at least:
- monorepo auth rollback,
- proof-heavy rust validator,
- config/policy incident,
- unsafe patch review,
- infra deployment mismatch,
- privacy boundary stress,
- polyglot repo benchmark remediation,
- many-asset settlement normalization.

These are not arbitrary examples.
Together they exercise:
- repo-bound need measurement,
- artifact-kind diversity,
- policy edge cases,
- proof-heavy closure,
- projection and privacy stress,
- cross-language repo reasoning,
- normalization-heavy settlement.

## E.2 Profile A example

Canonical Profile A read:
1. choose a targeted repo-authenticated deposit,
2. measure a bounded need,
3. inspect explicit fit,
4. build a tight asset pack,
5. materialize a private branch,
6. inspect proof closure,
7. settle decisive credits.

Expected interpretation:
"This deposit closes a bounded need and the closure path is short enough to read as decisive."

## E.3 Profile B example

Canonical Profile B read:
1. choose a broader overlapping deposit set,
2. measure a composite need,
3. inspect fit and normalization pressure,
4. admit multiple strong assets into the pack,
5. keep zero-credit or non-credited participation explicit,
6. inspect source-to-shares replay,
7. settle with visible normalization logic.

Expected interpretation:
"This closure is not about one winning asset; it is about provenance-preserving normalization across overlapping contribution."

## E.4 Example operator questions the spec must answer

V14 should let a reviewer answer:
1. Why does this need exist?
2. Why is this deposit the right supply?
3. Which artifact kinds are decisive?
4. Why is this candidate selectable but not settlement-eligible?
5. Which roots bind the signer to the selected material?
6. Why is this proof public-safe?
7. Why did this asset get zero credit?
8. What tests cover this path, including browser flow?

---

# Appendix F - Test coverage appendix

## F.1 Canonical test suites

The current repository exposes three primary test entrypoints:

| Suite | Path | Main role |
|---|---|---|
| Unit/core | `engi-demo/test/core.test.js` | subsystem truth, invariants, artifact consistency |
| API | `engi-demo/test/api.test.js` | route semantics, persistence, projection behavior, malformed input handling |
| Browser e2e | `engi-demo/test/e2e.test.js` | operator ordering, deposit flow, scenario switching, settlement path visibility |

## F.2 Coverage expectations by family

V14 expects explicit coverage for:
- parser failure and fail-closed behavior,
- prompt completeness mismatches,
- measurement receipt closure,
- verification and use-tier separation,
- policy restriction and revoked issuer behavior,
- asset pack lock integrity,
- proof witness coverage,
- source-to-shares replay and normalization,
- debit/credit conservation,
- bounded public proof and projection policy,
- scenario family coverage,
- explainer, tooltip, and visual-vs-raw parity where operator interpretation depends on them,
- browser-visible operator ordering.

## F.3 Browser e2e requirements

Browser e2e validation is REQUIRED to confirm the operator story, not merely the API.

At minimum the browser suite SHOULD verify:
1. panel ordering matches the canonical operating chain,
2. repo-authenticated deposit flow works end to end,
3. a targeted flow reaches settlement,
4. a normalization-heavy flow exposes source-to-shares behavior,
5. user-visible status copy remains coherent with the operating story,
6. canonical explainer, tooltip, and visual/raw interpretation surfaces do not contradict the underlying artifacts they summarize.

## F.4 Fixture and adversarial coverage

The scenario fixture and coverage artifacts SHOULD explicitly track:
- malformed canonical benchmark output,
- restricted or revoked issuer assets,
- zero-credit participation,
- polyglot cross-language parity stress,
- many-asset normalization determinism,
- privacy boundary scenarios.

---

# Appendix G - Spec-to-source parity appendix

## G.1 Primary implementation files

Primary source files for current parity:
- `engi-demo/src/engi-demo.js`
- `engi-demo/server.js`
- `engi-demo/public/app.js`
- `engi-demo/public/index.html`
- `engi-demo/test/core.test.js`
- `engi-demo/test/api.test.js`
- `engi-demo/test/e2e.test.js`
- `engi-demo/README.md`

## G.2 Builder-to-section map

| V14 area | Canonical builders or paths |
|---|---|
| 6.1 Depositing | `buildRepoSupplySurface`, `buildDepositingSurface`, `buildDepositInput`, `renderDepositingSurfaceVisual` |
| 6.2 Needing | `measureNeedFromScenario`, `buildNeedingSurface`, `renderNeedVisual`, `renderNeedingSurfaceVisual` |
| 6.3 Fit | `buildDepositingToNeedingSurface`, `renderDepositingToNeedingVisual` |
| 7 Profiles | `PROFILE_DEFINITIONS`, `buildDemonstrationProfile`, `renderProfileCompositionVisual` |
| 8 Ordering | `public/index.html`, `renderOperatingPicture`, `test/e2e.test.js` |
| 9 Evaluation and materialization | `evaluateCandidates`, `assembleAssetPack`, `buildBranchArtifacts`, `assertRequiredBranchArtifacts` |
| 10 Identity/auth | `buildIdentityBindings`, `buildAuthorizationDecisions`, `buildIdentityAuthSpineSurface`, `buildGithubBoundarySurface` |
| 11 Proof and settlement | `buildProofWitnessManifest`, `buildSystemProofBundle`, `buildSourceToSharesArtifact`, `buildSettlementParticipationArtifact`, `buildAccountingPrecisionReport` |
| 12 Boundary and projection | `buildBoundaryRealitySurface`, `buildProjectionPolicy`, `buildBoundedPublicProofArtifact`, `buildRedactionProof`, `buildDisclosureProof` |
| 13 Validation | `writeJsonAtomically`, `buildTestCoverageReport`, `test/core.test.js`, `test/api.test.js`, `test/e2e.test.js` |

## G.3 UI parity map

The current public shell organizes operator understanding through:
- operating picture,
- depositing and candidate assets,
- needing and measured demand,
- depositing-to-needing fit,
- ranked candidates and verification determinisms,
- asset pack and branch artifacts,
- settlement and journal diff,
- ledger and policy surfaces,
- explainers, tooltips, and visual/raw interpretation surfaces tied to canonical artifacts.

This layout is itself part of V14 parity because it encodes the canonical operator story.

## G.4 Operator-experience parity surfaces

The following operator-experience surfaces are canonical when they are present in the repo:
- spec references attached to explainer content,
- tooltip or explainer summaries that interpret depositing, needing, fit, verification, proof, or settlement surfaces,
- visual/raw dual renderings for canonical artifacts,
- panel ordering and section labels that encode the operator chain.

V14 parity requires these surfaces to remain:
1. semantically aligned with the underlying artifact meaning,
2. traceable to current spec sections,
3. bounded in what they summarize so they do not overclaim hidden or modeled behavior.

## G.5 Remaining accepted boundaries

The following remain intentionally outside the local deterministic prototype:
- live GitHub installation token minting,
- live repo inventory refresh,
- live branch writes or PR updates,
- live signer identity verification,
- live networked settlement effects.

These are boundary truths, not V14 parity failures, so long as:
- they remain explicitly disclosed,
- local stand-ins remain clearly marked,
- and the spec does not pretend they are executed when they are only modeled.

---

# Final conclusion

V14 is now the canonical/latest ENGI target and the first spec that actually performs the V13 brief in full:
- align the current file family to the standalone ENGI template guide,
- preserve the V12 design center and the last fully realized canon,
- restore dense explicitness where it helps,
- make host/runtime truth part of system canon,
- make evaluator, proof, settlement, and disclosure structures formally recoverable,
- make test coverage canonical,
- and keep source, docs, UI, and validation traceable to one design truth.

The remaining work after this pass should be ordinary realization and parity-closing against this canon, not another search for the right structure.
