# ENGI Spec V10

Status: draft
Scope: ENGI v1 / V10 upgrade draft
Canonical pointer: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC.txt` remains `V8` until V10 is explicitly promoted
Baseline: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V9.md`

---

# 1. Executive summary

V10 is the **artifact-intake and identity/auth finalization** spec.

V9 closed major finality gaps around prompt completeness, static receipts, projection enforcement, proof witness closure, accounting precision, and scenario realism.

V10 keeps that V9 closure work.
V10 does not invalidate V9.

V10 upgrades the surfaces that remain too weak at the repo boundary:

1. artifact intake must stop being effectively textarea-first,
2. all artifact kinds must be first-class at intake time,
3. intake should move toward authenticated repo-bound artifact selection,
4. identity/auth must become a coherent cluster of:
   - addressing,
   - signing,
   - GitHub App auth payloads,
   - installation-scoped authorization semantics.

The central V10 rule is:

> If ENGI claims that repository-bound engineering artifacts are the subject of selection, proof, and settlement, then the intake and auth surfaces MUST begin from repository-addressable artifact inventory and MUST carry explicit address + signing + GitHub App auth structure.

---

# 2. Why V10 exists

An audit of the current V9 local demo shows that the remaining weakness is not in ranking or proof closure.
It is at the intake and authority boundary.

The strongest V9-to-V10 gaps are:

- deposit UX is still centered on freeform form fields plus pasted content,
- artifact kinds exist, but they are not all equally selection-first at intake time,
- GitHub-bound metadata is present, but repo artifact inventory is not yet a first-class surface,
- signer state is visible, but addressing and signing are not canonically separated,
- installation id exists, but GitHub App auth payload structure is still too shallow,
- identity/auth proofs do not yet bind the full address + signing + installation-scoped auth cluster.

V10 exists to close those gaps without undoing V9.

---

# 3. Source-of-truth and versioning rule

V10 preserves the ENGI versioning rule:

- each new spec version is written as a new versioned file,
- previous versions remain in place,
- `ENGI_SPEC.txt` is the only canonical pointer,
- V10 implementation work may land while the canonical pointer remains on `V8`.

Therefore:

- V10 lives in `ENGI_SPEC_V10.md`,
- V9 remains in place,
- V8 remains the canonical pointer until explicit promotion.

---

# 4. Normative language

The key words **MUST**, **MUST NOT**, **REQUIRED**, **SHOULD**, **SHOULD NOT**, and **MAY** are to be interpreted as normative requirements for V10 conformance.

---

# 5. Conformance profiles

## 5.1 Profile A — local deterministic V10 prototype

Profile A remains the local deterministic repository-contained prototype.

Profile A MAY locally model:

- authenticated GitHub App repo sessions,
- installation-scoped permissions,
- repo artifact inventory,
- artifact addressing surfaces,
- signing payload surfaces,
- GitHub App auth payloads.

Profile A MUST NOT:

- fake live token minting,
- fake live repository fetches,
- fake live GitHub writes,
- represent modeled auth payloads as if they were live network-backed tokens.

## 5.2 Profile B — external production-boundary intent

Profile B remains the live external boundary profile.

Profile B is where:

- real GitHub App installation auth happens,
- real repo artifact inventory is fetched,
- real repository actions are authorized,
- real signer/org verification occurs.

V10 requires Profile B payload shapes to be explicit even when Profile A models them locally.

---

# 6. V10 intake model

V10 introduces a stronger intake rule:

```ts
type ArtifactIntakeMode =
  | 'repo-artifact-selection'
  | 'repo-artifact-selection-plus-note'
  | 'raw-fallback'
```

The preferred V10 intake order is:

1. select from authenticated repo-bound artifact inventory,
2. optionally append operator note or raw supplement,
3. use raw-only intake only as an explicit fallback.

The demo UX MUST NOT effectively stop at a raw textarea deposit flow.

---

# 7. Required V10 artifact-inventory surfaces

```ts
type RepoArtifactInventoryEntry = {
  inventoryEntryId: string
  repo: string
  artifactKind: string
  artifactType: string
  originKind:
    | 'workflow-artifact'
    | 'benchmark-output'
    | 'commit-file'
    | 'pull-request-comment'
    | 'incident-document'
    | 'proof-log'
    | 'config-snapshot'
    | 'attestation-bundle'
  title: string
  summary: string
  sourceCommit?: string
  sourcePath?: string
  workflowRunId?: string
  workflowJobName?: string
  checkSuiteId?: string
  artifactName?: string
  tags: string[]
  declaredStacks: string[]
  declaredConstraints: string[]
  previewSurface: string
  content: string
}
```

V10 requirements:

1. The local demo MUST expose a repo-bound artifact inventory surface.
2. The inventory MUST cover all artifact kinds present in the V10 demo surface, not only pasted freeform text.
3. Intake manifests MUST record which inventory entries were selected.
4. The intake surface MUST preserve enough repo/workflow/file addressing data to replay selection provenance.

---

# 8. Required V10 identity/auth cluster

V10 replaces vague identity/auth language with four explicit surfaces:

## 8.1 Addressing surface

```ts
type AddressingSurface = {
  addressingScope:
    | 'repo'
    | 'repo-commit'
    | 'repo-file'
    | 'workflow-run'
    | 'workflow-artifact'
    | 'multi-artifact-selection'
  repo: string
  ref?: string
  commit?: string
  workflowRunId?: string
  workflowPath?: string
  workflowJobName?: string
  sourcePaths: string[]
  selectedInventoryEntryIds: string[]
}
```

## 8.2 Signing surface

```ts
type SigningSurface = {
  signerAddress: string
  signerClass: string
  signingAlgorithm: string
  keySource: string
  attestationHash: string
  payloadHash: string
  signatureChecksPass: boolean
  signedPayloadHashMatchesContentRoot: boolean
}
```

## 8.3 GitHub App auth surface

```ts
type GitHubAppAuthSurface = {
  authMechanism: 'github-app-installation'
  appId: string
  appSlug: string
  installationId: string
  installationAccountLogin: string
  installationAccountType: 'Organization' | 'User'
  repositoryId: string
  repositoryNodeId: string
  repositorySelection: 'selected' | 'all'
  permissions: Record<string, string>
  profileABoundary: string
  profileBBoundary: string
}
```

## 8.4 Artifact selection surface

```ts
type ArtifactSelectionSurface = {
  intakeMode: ArtifactIntakeMode
  authSessionId?: string
  selectedInventoryEntryIds: string[]
  selectedArtifactKinds: string[]
  selectedOriginKinds: string[]
  rawFallbackUsed: boolean
  appendedOperatorNote: boolean
}
```

V10 requirements:

1. Every selected candidate asset MUST carry all four surfaces.
2. Installation id MUST be part of the GitHub App auth surface, not just a stray field.
3. Addressing and signing MUST be distinct surfaces, even when linked.
4. Intake manifests MUST preserve selection/auth/address/signing closure together.

---

# 9. Required V10 manifest and branch-artifact behavior

When V10 surfaces are claimed, the implementation MUST materialize them in branch artifacts or equivalent manifest payloads.

At minimum V10 branch materialization MUST expose:

- artifact upload/intake manifest with selected inventory refs,
- identity bindings with installation-scoped GitHub App principals when present,
- GitHub boundary/auth surface with installation-scoped payload fields,
- candidate-level address + signing surfaces inside the selected upload/intake manifest.

V10 MAY emit additional dedicated artifacts for:

- repo artifact selection manifest,
- addressing manifest,
- signing manifest,
- GitHub App auth manifest.

---

# 10. Required V10 proofs

V10 extends the existing identity/auth proof requirements.

An identity/auth proof is V10-conformant only if it can show:

1. selected artifacts are bound to explicit addressing surfaces,
2. selected artifacts are bound to explicit signing surfaces,
3. GitHub App auth payloads are installation-scoped and repository-scoped,
4. installation/auth principals referenced in authorization decisions are represented in the identity bindings or equivalent auth surface,
5. Profile A modeled auth payloads are marked as modeled rather than live.

---

# 11. Demo UX requirements

The V10 demo UI MUST:

1. present authenticated repo selection/inventory before raw fallback content,
2. make all artifact kinds visible in the repo inventory surface,
3. allow raw/operator note fallback without pretending it is equivalent to repo-bound selection,
4. display address + signing + GitHub App auth surfaces clearly,
5. keep the implementation understandable rather than over-designed.

---

# 12. Required V10 artifacts and files

This V10 draft requires versioned repo artifacts:

- `/Users/garrettmaring/Developer/ENGI/ENGI_V10_PREP_MEMO.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V10.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V10_NOTES.md`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/SPEC_V10_IMPLEMENTATION_MATRIX.md`

---

# 13. First-pass implementation guidance

The recommended first V10 implementation slice is:

1. add modeled authenticated repo sessions and seeded repo artifact inventory,
2. upgrade the deposit UX to inventory-first selection,
3. extend asset/manifests with:
   - artifact selection surface,
   - addressing surface,
   - signing surface,
   - GitHub App auth surface,
4. update identity bindings/proofs/tests accordingly.

This is sufficient for a meaningful first V10 pass even if live GitHub auth remains out of scope locally.
