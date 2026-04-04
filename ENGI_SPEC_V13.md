# ENGI Spec V13

Status: draft
Scope: ENGI v1 / V13 fully enriched canonical spec-structure and formality standard
Canonical pointer: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC.txt` remains `V11` until V13 is explicitly promoted
Baseline references:
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V6.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V12.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V13_INFORMATION_AUDIT.md`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/src/engi-demo.js`

---

# 1. Executive summary

V13 is the first intended **fully enriched** ENGI canonical spec after the compression-heavy middle versions.

Its purpose is to combine three strengths that no single prior version fully carried at once:

1. **V6-level density and explicitness**
2. **V12-level cohesion, operator ordering, and demonstration truth**
3. **current-source-faithful system design and implementation detail**

V13 therefore treats the ENGI spec as:
- a product/system spec,
- a formal design document,
- an implementation-truth document,
- a pedagogical document,
- a parity-bearing canonical artifact,
- and the canonical **design standard for future ENGI spec files**.

The central V13 rule is:

> The ENGI canonical spec MUST be rich enough that core system understanding, formal obligations, implementation structure, demonstration ordering, validation coverage, and source/spec parity obligations can all be recovered from the spec without reverse-engineering from source alone.

This means V13 is not another compression pass.
V13 is the restoration, integration, and **spec-structure finalization** pass.

---

# 2. Normative language

The key words **MUST**, **MUST NOT**, **REQUIRED**, **SHOULD**, **SHOULD NOT**, and **MAY** are to be interpreted as normative requirements for V13 conformance.

---

# 3. Canonical specification-file role

V13 defines what a fully enriched ENGI spec file should be.

## 3.1 What V13 governs

V13 governs the canonical structure and formality expectations for:
- future full ENGI `_VN_` spec documents,
- associated `_VN_` notes documents,
- associated implementation matrices,
- appendix architecture,
- source/spec parity references,
- and canonical validation/test appendix structure.

## 3.2 What V13 does not attempt to finish

V13 does not attempt to fully write the final thousands-of-lines canonical ENGI content itself.
That is the job of the next versioned writing pass.

V13 instead finalizes:
- what that canonical file set must contain,
- how it must be organized,
- how dense it must be,
- how it must reference source and proofs,
- and how it must encode parity-bearing implementation truths.

## 3.3 V14 implication

V14 should be the first version that fully writes the canonical long-form ENGI spec to the V13 standard.

# 4. Product goals, non-goals, and design principles

## 3.1 Goals

ENGI exists to make high-value generative technical supply legible, selectable, provable, and settleable against measured enterprise need.

A conformant ENGI system SHOULD:
1. make engineering need measurable from real repo/benchmark context,
2. allow artifact-bearing supply to be deposited in a structured, attributable, proof-bearing way,
3. match deposited supply against measured need via explicit recall/ranking/verification structure,
4. materialize a branch-scoped remediation artifact set,
5. prove how and why that branch was assembled,
6. settle value via exact accounting,
7. preserve confidentiality and disclosure boundaries explicitly,
8. remain explainable to operators through the same structures that make it correct.

## 3.2 Non-goals

ENGI does not primarily exist to:
- be a generic chat assistant,
- replace engineering judgment with opaque scoring,
- hide provenance or identity/auth behind simplified UX,
- fake production boundaries in a local prototype,
- or reduce the system to one-off patch generation.

## 3.3 Design principles

V13 preserves and strengthens the following principles:
- depositing against need is the operating core,
- identity/auth is system spine,
- proof is closure, not garnish,
- settlement is exact and explicit,
- projection/disclosure is principled and provable,
- demonstration ordering is part of system truth,
- operator clarity and formal exactness are compatible rather than opposed.

---

# 5. Conformance profiles and precedence

## 4.1 Source-of-truth hierarchy

V13 source-of-truth precedence is:
1. canonical current spec pointer (`ENGI_SPEC.txt`)
2. current canonical versioned spec
3. current canonical implementation source
4. canonical notes and implementation matrix for that version
5. prior versions and prior notes as historical context

## 4.2 Demonstration profiles

V13 retains the V11/V12 profile meaning change.

### Profile A — targeted deposit / bounded need
Profile A demonstrates:
- small decisive deposit,
- sharply bounded need,
- tighter closure,
- shorter proof path,
- more concentrated settlement explanation.

### Profile B — normalization deposit / composite need
Profile B demonstrates:
- overlapping multi-kind deposit,
- broader composite need,
- normalization-heavy fit and branch reasoning,
- broader proof burden,
- source-to-shares-heavy settlement explanation.

### Profile rule
These profiles MUST be explained first through:
- deposit mode,
- need mode,
- closure shape,

not first through infrastructure or environment archetypes.

## 4.3 Boundary profiles

Profile A and Profile B may still differ by environment reality, but this MUST be a secondary explanatory layer, not the main profile identity.

---

# 6. Canonical file-set architecture

A fully enriched ENGI `_VN_` spec release SHOULD normally include:
- `ENGI_SPEC_VN.md` — canonical full spec
- `ENGI_SPEC_VN_NOTES.md` — drafting rationale, interpretation notes, and version-local clarifications
- `ENGI_SPEC_VN_INFORMATION_AUDIT.md` when a major richness/parity recovery is needed
- `engi-demo/SPEC_VN_IMPLEMENTATION_MATRIX.md` — parity/debt matrix for the current implementation relative to the versioned spec

A version MAY omit the information-audit file only when no material audit is needed.
The implementation matrix SHOULD exist for every serious version even when it is small.

# 7. Canonical section-schema requirements

Every fully enriched canonical ENGI spec file SHOULD follow a disciplined section pattern.

For each major subsystem section, the default expectation is:
1. purpose / role
2. normative requirements
3. formal structures / types / schemas
4. invariants / obligations
5. operator meaning
6. implementation/source parity references where relevant
7. appendix references where deeper exhaustive material lives

This pattern SHOULD be applied consistently across subsystems rather than only in some sections.

# 8. Density, pedagogy, and coverage requirements

V13 defines density as a requirement, not an accident.

A future full canonical ENGI spec SHOULD be dense enough to carry:
- complete system coverage,
- pedagogical transitions,
- precise schema detail,
- explicit formal obligations,
- worked examples and scenario coverage,
- and parity references to current source/test reality.

High line count is acceptable when it reflects real coverage and good organization.
Compression is not a default virtue when it causes loss of canonical detail.

## 8.1 Density expectation

For a mature fully enriched canonical ENGI spec, thousands of lines are expected when that is what full coverage requires.
Density SHOULD come from:
- full subsystem coverage,
- appendices,
- examples,
- formal structures,
- and parity references,

not from redundant repetition or undisciplined prose.

## 8.2 Pedagogical pattern expectation

The canonical ENGI spec SHOULD deliberately teach the system while formalizing it.
That means important sections SHOULD include:
- a concise purpose statement,
- a formal structure block,
- a short operator-meaning explanation,
- and explicit cross-references to deeper appendices where needed.

# 9. Code/source-reference requirements

A fully enriched canonical ENGI spec SHOULD include precise source-reference conventions.

At minimum, the spec SHOULD define how to reference:
- canonical implementation files,
- key builder/function entrypoints,
- major artifact-producing paths,
- proof-producing paths,
- validation/test entrypoints,
- and any UI/parity-bearing surfaces that are part of system truth.

These references may live inline or in a dedicated spec-to-source appendix, but the referencing pattern MUST be explicit and stable.

## 9.1 Reference style

The canonical reference style SHOULD support at least:
- absolute repo-relative file path,
- function/builder name,
- optional line span when stable and useful,
- optional artifact or test identifier where that is the most precise handle.

## 9.2 Reference intent

Source references in the canonical ENGI spec are not ornamental citations.
They are parity-bearing references meant to let a reader locate:
- the current implementation of a spec concept,
- the builder/path that emits the corresponding artifact,
- and the validation/test location that exercises it.

# 10. Special handling requirements

Certain ENGI subsystems require dedicated special handling in the canonical spec rather than only ordinary subsystem prose.

These include at minimum:
- inference and evaluator contracts
- proof obligations and witness structures
- projection/disclosure and bounded-public proof
- source-to-shares / exact accounting closure
- demonstration ordering and explainer parity
- test coverage, including browser e2e validation

These areas SHOULD each receive dedicated appendix and cross-reference treatment.

# 11. System overview and operator story

The canonical V13 operator chain is:

1. repo supply
2. depositing
3. needing
4. depositing-to-needing fit
5. selected asset pack
6. branch materialization
7. proof closure
8. settlement
9. deep artifacts, disclosures, and boundaries

The system MUST read as one operating chain.
A user SHOULD understand the fit between supply and demand before they need deep proof or accounting internals.

---

# 12. Core entity model

V13 defines the following top-level entity families as canonical:
- repo supply
- deposit session
- inventory entry
- candidate asset
- need
- depositing surface
- needing surface
- depositing-to-needing surface
- evaluated candidate
- asset pack
- branch artifact set
- identity/auth spine
- proof bundle
- settlement participation
- source-to-shares artifact
- projection/disclosure artifacts
- telemetry and validation artifacts

Detailed type appendices are REQUIRED in V13 and should fully define these structures.

---

# 13. Depositing subsystem

Depositing is the structured act of introducing artifact-bearing supply into ENGI against a real or prospective measured need context.

## 7.1 Requirements

A V13 conformant system MUST make depositing explicit in terms of:
- repo supply reference,
- selected inventory references,
- artifact-kind composition,
- origin-kind composition,
- addressing root,
- signing root,
- auth root,
- deposit intent summary.

## 7.2 Canonical depositing surface

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

## 7.3 Deposit quality requirements

Depositing MUST feel like an operator action rather than incidental form entry.
Different artifact kinds SHOULD feel natively distinct in deposit interaction and summary.

---

# 14. Needing subsystem

Needing is the measured demand object derived from benchmark/parser/repo evidence and interpreted into an operator-visible demand surface.

## 8.1 Requirements

A V13 conformant system MUST make needing explicit in terms of:
- parser kind,
- task summary,
- failure mode summary,
- target artifact kinds,
- boundedness/compositeness summary,
- closure criteria,
- demonstration profile.

## 8.2 Canonical needing surface

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

---

# 15. Depositing-to-needing relation

This is a primary canonical V13 relation.

## 9.1 Role

The depositing-to-needing relation explains why a current deposit is the right supply for a current measured need.
It MUST be visible before deep proof inspection.

## 9.2 Canonical surface

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

## 9.3 Requirements

A conformant ENGI system MUST:
1. explain the fit between deposit and need explicitly,
2. expose decisive and overlapping kinds,
3. explain normalization pressure,
4. tie branch/proof/settlement intent back to the fit relation,
5. preserve this relation as a first-class artifact and UI surface.

---

# 16. Recall, ranking, and verification

V13 retains the current recall/ranking/verification split and requires it to be specified densely.

This section MUST fully define:
- recall channel families,
- ranking subscores,
- penalties,
- verification families,
- verification receipts,
- use-tier derivation,
- prompt/evaluator contracts,
- measurement receipts,
- static heuristics registry,
- and the relationship between measured, inferred, hybrid, and policy-derived results.

A dedicated evaluator/inference appendix is REQUIRED.

---

# 17. Asset pack and branch materialization

V13 treats branch materialization as the act of converting selected, verified, fit-bearing supply into a branch-scoped remediation artifact set.

This section MUST fully define:
- asset pack structure,
- branch artifact requirements,
- materialization proof,
- materialization exclusions,
- deliverables manifest,
- ENGI_NEED output,
- and branch-mode rights.

---

# 18. Identity, auth, signing, and GitHub App authority

V13 treats identity/auth as one coherent canonical chain.

This section MUST fully specify:
- addressing,
- signing,
- GitHub App auth payloads,
- installation/account/repository binding,
- auth session surfaces,
- authority transitions from deposit to branch to proof to settlement,
- identity/auth spine summaries,
- proof obligations tied to those structures.

The operator SHOULD be able to summarize the chain without reading raw JSON, but the raw JSON MUST remain formally specified.

---

# 19. Proof model, obligations, and witnesses

V13 restores and expands proof explicitness.

This section MUST define:
- proof contract,
- proof witness manifest,
- system proof bundle,
- prompt completeness proof,
- static measurement proof,
- verification proof surfaces,
- materialization visibility proof,
- disclosure/redaction proof,
- bounded public proof,
- subsystem proof obligations,
- theorem/invariant obligations,
- and artifact digest bindings.

A proof-obligations appendix is REQUIRED.

---

# 20. Settlement, journal diff, and source-to-shares

V13 treats settlement as both:
- a formal exact-accounting subsystem,
- and the economic closure of proof-bearing selection.

This section MUST define:
- raw contribution derivation,
- normalization rules,
- source-to-shares artifact,
- settlement participation artifact,
- accounting precision report,
- journal diff invariants,
- before/after roots,
- debit/credit conservation,
- and explanation requirements by profile shape.

---

# 21. Boundary realism, projections, and disclosure

V13 preserves explicit boundary realism and projection policy.

This section MUST define:
- modeled-local vs executed-local vs external-required distinctions,
- public/buyer/reviewer/internal projection rules,
- projection policy artifacts,
- disclosure proof,
- redaction proof,
- bounded public proof,
- and UI/operator obligations around not confusing these layers.

---

# 22. Demonstration ordering, pedagogy, and explainers

V13 treats demonstration ordering as canonical system truth.

This section MUST define:
- default operator ordering,
- section/panel ordering expectations,
- profile explanation obligations,
- tooltip/explainer expectations,
- tooltip traceability requirements to current source and current canonical spec sections,
- and deep/fast comprehension requirements.

Tooltip/explainer parity is canonical V13 system design material, not optional UI frosting.

---

# 23. Telemetry, observability, and validation

V13 requires explicit observability for:
- measurement receipts,
- verification receipts,
- proof witness coverage,
- artifact digesting,
- scenario coverage,
- and demonstration validation.

Telemetry MUST support both:
- system debugging,
- and demonstration debugging.

---

# 24. Persistence, correctness, and failure semantics

V13 retains persistence correctness as part of system correctness.

This section MUST define:
- atomic persistence expectations,
- rollback/non-corruption requirements,
- fail-closed parser behavior,
- failure/reporting semantics,
- and resilience requirements for the local demo profile.

---

# 25. Test coverage and validation

V13 introduces a canonical test-coverage section and appendix.

A conformant V13 implementation SHOULD specify and track at least:
- unit coverage,
- API coverage,
- browser e2e demonstration coverage,
- scenario family coverage,
- proof coverage,
- settlement/accounting coverage,
- projection/disclosure coverage,
- tooltip/explainer coverage where the operator experience materially depends on it.

A dedicated appendix on test coverage is REQUIRED.

---

# 26. Appendices required in V13

V13 expects at minimum:
- Appendix A — Precise type and schema appendix
- Appendix B — Evaluator and inference appendix
- Appendix C — Proof obligations appendix
- Appendix D — Artifact and deliverables appendix
- Appendix E — Scenario and example appendix
- Appendix F — Test coverage appendix
- Appendix G — Spec-to-source parity appendix

## 26.1 Appendix structure requirements

Each appendix SHOULD be internally structured rather than dumped as loose notes.
The default appendix pattern is:
1. scope / purpose
2. canonical structures or obligations
3. invariants / rules
4. implementation/source references where relevant
5. examples / traceability / coverage notes where relevant

## 26.2 Special handling appendices

The following appendices require especially dense treatment:
- **Evaluator and inference appendix**
  - prompt contracts
  - context injectables
  - output schemas
  - parsable completion contracts
  - deterministic/static vs inferred vs hybrid distinction
- **Proof obligations appendix**
  - subsystem proof obligations
  - witness structures
  - theorem/invariant obligations
  - public/bounded/disclosure proof relations
- **Test coverage appendix**
  - unit/API/browser-e2e split
  - scenario family coverage
  - proof/settlement/projection coverage
  - operator-experience parity coverage (including explainer/tooltip surfaces where material)
- **Spec-to-source parity appendix**
  - canonical file references
  - canonical builder/function references
  - artifact-producing path references
  - test entrypoint references

---

# 27. Current draft conclusion

V13 is intended to be the ultimate long-form ENGI canonical spec structure:
- dense,
- explicit,
- pedagogical,
- current-source-faithful,
- and aligned to the V12-era operating model rather than reverting to earlier design assumptions.

Further drafting work should expand each section and appendix to full dense coverage rather than compressing or hand-waving details.
