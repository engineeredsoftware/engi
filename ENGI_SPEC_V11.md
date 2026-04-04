# ENGI Spec V11

Status: draft
Scope: ENGI v1 / V11 upgrade draft
Canonical pointer: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC.txt` remains `V8` until V11 is explicitly promoted
Baseline: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V10.md`

---

# 1. Executive summary

V11 is the **operating-picture and system-spine** spec.

V10 made repo-bound intake, artifact selection, addressing, signing, and GitHub App auth explicit.
V11 keeps all of that.
V11 does not invalidate V10.

V11 upgrades the surfaces that still feel optional or over-explained:

1. repo-authenticated artifact intake must feel native to the system,
2. repo supply must expose artifact-kind parity clearly,
3. identity/auth must read as one coherent spine from intake to settlement,
4. local/remote boundaries must stay honest while becoming easier to understand,
5. the repo-to-settlement path from repo selection to settlement must become the default operating story.

The central V11 rule is:

> If ENGI claims that repository-bound engineering work is selected, authorized, materialized, proved, and settled as one system, then the operator-facing surfaces MUST show that chain directly rather than requiring the user to reconstruct it from many separate artifacts.

---

# 2. Why V11 exists

An audit of the current V10 demo shows that the remaining gap is no longer missing payload structure.
It is missing operational inevitability.

The strongest V10-to-V11 gaps are:

- repo supply exists, but still feels like a long inventory list rather than first-class system input,
- artifact-kind parity exists, but not yet as a repo supply model,
- identity/auth surfaces are explicit, but still dispersed across multiple artifacts,
- boundary honesty exists, but mostly deep in manifests rather than near the operating path,
- the repo-to-settlement path exists, but still has to be inferred.

V11 exists to close those gaps without undoing V10.

---

# 3. Source-of-truth and versioning rule

V11 preserves the ENGI versioning rule:

- each new spec version is written as a new versioned file,
- previous versions remain in place,
- `ENGI_SPEC.txt` is the only canonical pointer,
- V11 implementation work may land while the canonical pointer remains on `V8`.

Therefore:

- V11 lives in `ENGI_SPEC_V11.md`,
- V10 remains in place,
- V8 remains the canonical pointer until explicit promotion.

---

# 4. Normative language

The key words **MUST**, **MUST NOT**, **REQUIRED**, **SHOULD**, **SHOULD NOT**, and **MAY** are to be interpreted as normative requirements for V11 conformance.

---

# 5. Conformance/demo profiles

V11 keeps explicit local/external boundary surfaces, but the primary profile distinction is now operational:
how ENGI deposits supply against how ENGI measures need.

## 5.1 Profile A — targeted deposit / bounded need

Profile A is the profile for tightly bounded remediation needs where a small decisive deposit should close the branch.

Profile A centers on:

- a narrow measured need,
- a small decisive deposit set,
- a tight asset pack with minimal normalization,
- a short proof and settlement explanation.

Profile A MAY still locally:

- model authenticated GitHub App repository sessions,
- model repository-bound artifact supply,
- execute deterministic need measurement, ranking, branch materialization, proof bundling, and exact settlement,
- render identity/auth, proof, and boundary surfaces as coherent operator views.

## 5.2 Profile B — normalization deposit / composite need

Profile B is the profile for composite remediation needs where multiple overlapping deposits must be normalized before settlement is intelligible.

Profile B centers on:

- a broader measured need spanning several failing slices or runtime boundaries,
- a larger multi-kind deposit set,
- a normalized asset pack with overlap accounting,
- a source-to-shares-heavy proof and settlement explanation.

Both profiles MAY be demonstrated honestly inside the local V11 prototype.

The live GitHub/auth/network distinction remains required,
but it MUST be expressed through:

- boundary reality surfaces,
- GitHub boundary surfaces,
- external boundary manifests,

rather than by making "not live GitHub" the main story of Profile A versus Profile B.

---

# 6. Required V11 repo supply surface

V11 introduces an explicit repo supply surface:

```ts
type RepoSupplySurface = {
  repoCount: number
  inventoryEntryCount: number
  scenarioCount: number
  artifactKindCounts: Record<string, number>
  originKindCounts: Record<string, number>
  repos: RepoSupplySummary[]
}

type RepoSupplySummary = {
  repo: string
  authSessionId: string
  installationId: string
  defaultRef: string
  inventoryEntryCount: number
  scenarioCount: number
  demonstrationProfileCounts: Record<string, number>
  artifactKindCounts: Record<string, number>
  originKindCounts: Record<string, number>
  dominantStacks: string[]
  dominantConstraints: string[]
  localBoundary: string
  externalBoundary: string
}
```

V11 requirements:

1. The local demo MUST expose repo supply before or alongside per-entry artifact selection.
2. The repo supply surface MUST make artifact-kind parity legible.
3. The repo supply surface MUST stay bound to authenticated repo sessions.
4. The repo supply surface MUST NOT pretend to be live-refreshing when it is seeded locally.

---

# 7. Required V11 repo-to-settlement surface

V11 introduces an explicit repo-to-settlement surface:

```ts
type RepoToSettlementSurface = {
  flowId: string
  scenarioId: string
  branchName: string | null
  demonstrationProfile: DemonstrationProfile
  depositMode: string
  needMode: string
  stages: RepoToSettlementStage[]
}

type DemonstrationProfile = {
  profileId: 'A' | 'B'
  label: string
  shortLabel: string
  depositMode: string
  needMode: string
  assetPackShape: string
  settlementShape: string
}

type RepoToSettlementStage = {
  stageId:
    | 'repo-selection'
    | 'need'
    | 'asset-pack'
    | 'branch'
    | 'proof'
    | 'settlement'
  label: string
  status: string
  boundaryClass: 'modeled-local' | 'executed-local' | 'external-required'
  summary: string
  refs: string[]
  metrics: Record<string, string | number | boolean>
}
```

V11 requirements:

1. The demo MUST stage the default flow from repo selection to settlement explicitly.
2. Each stage MUST declare whether it is modeled locally, executed locally, or external-required.
3. The flow MUST preserve exact refs to the repo, need, asset pack, branch, proof, and settlement surfaces it summarizes.
4. Deep artifact inspection MAY remain available, but the flow MUST NOT depend on deep inspection to be understood.

---

# 8. Required V11 identity/auth spine

V11 introduces an explicit identity/auth spine:

```ts
type IdentitySpineSurface = {
  spineId: string
  buyerPrincipalId: string
  installationPrincipalId: string | null
  branchName: string | null
  settlementBundleId: string | null
  hops: IdentitySpineHop[]
}

type IdentitySpineHop = {
  hopId: string
  label: string
  principalRefs: string[]
  authoritySummary: string
  stageRefs: string[]
  rootRefs: string[]
  boundaryClass: 'modeled-local' | 'executed-local' | 'external-required'
}
```

V11 requirements:

1. The local demo MUST expose a single spine that connects:
   - GitHub App session authority,
   - selected repo artifacts,
   - signer attestation,
   - buyer rights,
   - ENGI branch authority,
   - ENGI proof authority,
   - ENGI settlement authority.
2. The identity/auth spine MUST keep addressing, signing, auth payloads, authorization, and proof distinct.
3. The identity/auth spine MUST also make the chain obvious without reading every individual artifact.

---

# 9. Required V11 boundary reality surface

V11 introduces a boundary reality surface:

```ts
type BoundaryRealitySurface = {
  posture: 'honest-local-prototype'
  stages: BoundaryRealityStage[]
}

type BoundaryRealityStage = {
  stageId: string
  label: string
  localStatus: 'modeled-local' | 'executed-local'
  localDescription: string
  externalRequirement: string
}
```

V11 requirements:

1. The demo MUST distinguish modeled-local structure from executed-local effects.
2. The demo MUST identify what still requires a real external production boundary.
3. The boundary reality surface MUST be present near the main operating story, not only inside branch artifacts.

---

# 10. Required V11 artifact-kind-native parity

V11 strengthens the artifact-kind rule:

1. Proof, patch, runbook, config, incident-note, and mixed bundle intake MUST be legible as supply categories, not only as per-asset metadata.
2. A mixed bundle MAY exist, but the system MUST preserve the kinds and origins it was composed from.
3. Repo supply and intake summaries MUST record artifact-kind counts and origin-kind counts.
4. Selected asset packs SHOULD make their artifact-kind mix obvious before branch materialization.

---

# 11. Required V11 demonstration ordering

The operator-facing V11 demo SHOULD prefer this order:

1. repo supply and authenticated repo boundary,
2. measured need,
3. candidate asset creation or selection,
4. selected asset pack and branch materialization,
5. proof closure,
6. settlement outcome,
7. supporting deep artifacts.

The local demo MAY still expose all branch artifacts in detail.
It SHOULD no longer rely on that detail as the first explanation.

---

# 12. Initial V11 implementation target

The first coherent V11 implementation slice is successful if:

1. V11 docs exist and reflect the current implementation direction,
2. repo supply is visible as a first-class surface,
3. the repo-to-settlement path is visible as a first-class surface,
4. identity/auth reads as one coherent spine,
5. modeled-local vs executed-local vs external-required boundaries are immediately legible,
6. tests pass.

---

# 13. Non-goals for the first V11 pass

The first V11 pass does not require:

- live GitHub inventory refresh,
- live installation-token exchange,
- live branch or PR writes,
- live signer verification,
- live network settlement.

Those remain Profile B requirements.
