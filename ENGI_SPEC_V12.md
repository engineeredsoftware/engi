# ENGI Spec V12

Status: draft
Scope: ENGI v1 / V12 demonstration-purpose canon
Canonical pointer: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC.txt` remains `V11` until V12 is explicitly promoted
Baseline: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V11.md`

---

# 1. Executive summary

V12 is the **demonstration-purpose** spec.

V11 made ENGI read as operationally inevitable.
V12 keeps that thesis and applies it with maximum confidence to the actual demonstration path:

- depositing,
- needing,
- selecting,
- branching,
- proving,
- settling.

V12 is not primarily a system-repair version.
V12 assumes the core ENGI system shape is already substantially correct.
The main job of V12 is to make the demonstration so strong, legible, and native that the operating model feels like the unavoidable shape of generative enterprise needs.

The central V12 rule is:

> The demo MUST present depositing against need as the natural operating model of ENGI, such that proof, branching, identity/auth, and settlement read as necessary consequences rather than auxiliary explanation layers.

That means V12 focuses on:
1. depositing as a first-class operator action,
2. needing as a first-class measured demand surface,
3. the depositing-to-needing relationship as the center of the system,
4. artifact-kind-native interaction quality,
5. identity/auth as operating spine,
6. proof and settlement as the inevitable closure path,
7. demonstration pacing, summaries, and interaction design.

---

# 2. Why V12 exists

A V11-quality ENGI demo can already explain the system convincingly.
But there is still a final difference between:
- a demo that is strong,
- and a demo that makes the thesis feel complete.

V12 exists to close that difference.

V12 assumes that little if any core system spec should still need large repair.
If V12 surfaces remaining spec issues, those SHOULD be treated as edge-rounding discovered through demonstration refinement, not as evidence that the system architecture is still unsettled.

The V12 burden is therefore different from V8–V11:
- less “fix missing surfaces,”
- more “make the total operator experience feel canonically right.”

---

# 3. Source-of-truth and versioning rule

V12 preserves the ENGI versioning rule:
- each new spec version is written as a new versioned file,
- previous versions remain in place,
- `ENGI_SPEC.txt` is the only canonical pointer,
- V12 work may proceed while the pointer remains on `V11`.

Therefore:
- V12 lives in `ENGI_SPEC_V12.md`,
- V11 remains intact,
- V11 remains the canonical pointer until explicit promotion.

---

# 4. Normative language

The key words **MUST**, **MUST NOT**, **REQUIRED**, **SHOULD**, **SHOULD NOT**, and **MAY** are to be interpreted as normative requirements for V12 conformance.

---

# 5. V12 thesis standard

V12 adopts the highest current ENGI thesis standard:

**operational inevitability for generative enterprise needs**.

A V12-conformant demonstration SHOULD make a serious operator conclude:
- depositing against measured need is the correct operating model,
- artifact-bearing supply should enter the system this way,
- identity/auth should be arranged this way,
- proof should close this way,
- settlement should follow this way.

If the demo still feels like one of many plausible product shapes, V12 is not complete.

---

# 6. Primary V12 surface: depositing-to-needing

V12 introduces a primary surface pair:
- the **depositing surface**,
- the **needing surface**,

and a required relation between them.

## 6.1 Depositing surface

```ts
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

A V12 demo MUST make the depositing surface feel like the beginning of the operator story, not a data-entry sidecar.

## 6.2 Needing surface

```ts
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

A V12 demo MUST make the needing surface feel like live demand measurement rather than background metadata.

## 6.3 Required depositing-to-needing relation

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

V12 requirements:
1. The demo MUST stage depositing before or alongside needing in a way that makes their fit legible.
2. The demo MUST explain why the selected deposit is right for the measured need.
3. The demo MUST make clear whether the current demonstration profile is decisive/targeted or normalization-heavy/composite.
4. The depositing-to-needing relation MUST be visible before deep proof inspection.

---

# 7. V12 demonstration profiles

V12 keeps the V11 profile distinction and sharpens its demonstration role.

## 7.1 Profile A — targeted deposit / bounded need

Profile A exists to demonstrate:
- small decisive deposit,
- sharply bounded need,
- tight closure,
- short proof path,
- concentrated settlement story.

## 7.2 Profile B — normalization deposit / composite need

Profile B exists to demonstrate:
- overlapping multi-kind deposit,
- broader composite need,
- normalization-heavy branch reasoning,
- broader proof burden,
- source-to-shares-heavy settlement explanation.

V12 requirement:
The operator should understand these two profiles first through:
- deposit mode,
- need mode,
- closure shape,

not first through infrastructure/boundary differences.

---

# 8. Required V12 demonstration ordering

The default V12 demonstration SHOULD prefer this order:

1. repo supply,
2. depositing,
3. needing,
4. deposit-to-need fit,
5. selected asset pack,
6. branch materialization,
7. proof closure,
8. settlement,
9. deep artifacts and boundary surfaces.

V12 requirement:
This order MUST read as one operating chain, not as separate feature panels.

---

# 9. Artifact-kind-native interaction standard

V12 strengthens artifact-kind-native demonstration quality.

Requirements:
1. Different artifact kinds MUST feel natively different in deposit UX.
2. Proof, patch, config, runbook, incident note, benchmark output, and mixed bundle deposits MUST each carry kind-native summaries.
3. A mixed bundle MUST still preserve its internal kind composition clearly.
4. The operator SHOULD be able to understand why a kind matters for the measured need before opening raw content.

---

# 10. Identity/auth as demonstration spine

V12 keeps the V11 identity/auth spine and raises the operator-quality bar.

Requirements:
1. Addressing, signing, GitHub App auth, selection authority, branch authority, proof authority, and settlement authority MUST read as one chain.
2. The operator SHOULD be able to summarize that chain without opening every low-level manifest.
3. The identity/auth spine SHOULD feel like the system backbone, not a verification appendix.

---

# 11. Proof and settlement as necessary closure

V12 does not primarily add new proof families.
It changes how proof and settlement are demonstrated.

Requirements:
1. Proof MUST read as the natural closure of depositing against need.
2. Settlement MUST read as the natural economic closure of proof-bearing selection.
3. Source-to-shares SHOULD remain visible where normalization matters, but SHOULD not drown out the main demonstration story when the profile is targeted.
4. The operator SHOULD understand why a branch was materialized and why a share was earned before reading exact accounting internals.

---

# 12. Boundary realism in V12

V12 preserves boundary honesty.
However, boundary realism becomes a supporting explanatory layer rather than the primary demo headline.

Requirements:
1. Boundary surfaces MUST remain explicit.
2. They MUST explain modeled-local, executed-local, and external-required truth clearly.
3. They MUST NOT displace depositing and needing as the main operator story.

---

# 13. Demonstration completeness standard

A V12 demonstration is complete when:
1. depositing feels native,
2. needing feels measured and consequential,
3. the fit between them feels direct,
4. artifact-kind diversity feels first-class,
5. identity/auth feels inevitable,
6. proof and settlement feel necessary,
7. the whole system reads as one operating model for enterprise generative work.

---

# 14. Non-goals for V12

V12 does not primarily require:
- major new backend architecture,
- reopening already-stable core system design,
- speculative infrastructure unrelated to demonstration quality,
- replacing honest local stand-ins with fake live production behavior.

If such work becomes necessary, it SHOULD be justified by a concrete demonstration deficit.

---

# 15. Initial V12 implementation target

The first coherent V12 implementation slice is successful if:
1. V12 docs exist and clearly state the demonstration-purpose charter,
2. the demo foregrounds depositing and needing as the primary surfaces,
3. deposit-to-need fit is explicitly surfaced,
4. profile A/B demo distinction is legible through deposit/need/closure shape,
5. tests remain green.

---

# 16. Promotion guidance

V12 is the first spec version that should be considered a candidate for canonical promotion primarily on demonstration strength rather than on unresolved system completion.

Promotion SHOULD wait until the operator story feels complete enough that only marginal edges remain.
