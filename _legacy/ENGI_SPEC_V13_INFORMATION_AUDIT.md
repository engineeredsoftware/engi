# ENGI Spec V13 Information Audit

Status: draft
Purpose: audit information change, loss, recovery, and enrichment from pre-V12 spec lineage into the V12 canonical demo/system design target.
Baseline references:
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V6.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V7.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V7_NOTES.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V8.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V8_NOTES.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V9.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V10.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V10_NOTES.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V11.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V11_NOTES.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V12.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V12_NOTES.md`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/src/engi-demo.js`

---

# 1. Executive summary

V13 should not be understood as merely “V12 plus more.”

V13 should be the first **fully enriched canonical ENGI spec** after the compression-heavy middle versions.
Its job is to:
- retain the strong newer system-design evolutions from V8–V12,
- restore and expand the dense formal, pedagogical, and appendixed explicitness that V6 carried,
- preserve clarity and cohesion rather than regressing into unstructured sprawl,
- and align to the current canonical V12-target ENGI demo/source rather than rewriting history.

The key audit result is:

> Pre-V12 versions contain a large amount of useful system-detail explicitness that should be restored into V13, but V13 should not revert to pre-V12 system framing where V12 later evolved the design meaningfully.

So V13 should:
- **retain where later versions changed the design on purpose**,
- **restore where earlier versions contained useful detail that later versions compressed away**,
- **fully integrate current source-truth**,
- **make specification density the default again**,
- and **treat parity points like test coverage, tooltips/explainers, measurement receipts, proof witnessing, and demo ordering as canonical spec material.**

---

# 2. Audit methodology

This audit compares three strata:

1. **pre-V12 lineage** (`V6` through `V11`)
2. **V12 target canonical spec framing**
3. **current V12-target demo/source implementation**

The goal is not to ask whether every older statement survived literally.
The goal is to determine, for each information family:
- what was present earlier,
- what changed materially by V12,
- what was compressed away but should return,
- what became source-truth and must now become canonical spec-truth,
- and what should remain changed because the later design is better.

---

# 3. Main audit result

## 3.1 What V13 must preserve from V12+

These are not optional regressions.
They are current ENGI design truth and V13 should preserve them:

1. **Depositing / needing / fit as the main operating relation**
2. **Profile distinction by deposit mode and need mode**, not by a weak local-vs-GitHub archetype
3. **Repo-to-settlement path** as a surfaced operating chain
4. **Identity/auth as system spine**
5. **Boundary reality** as explicit but secondary to the main operator story
6. **Proof and settlement as closure**, not the opening burden
7. **Prompt contracts / prompt completeness / measurement receipts / verification receipts / proof witnesses** as canonical design material
8. **Static heuristics / static code analysis / source-to-shares** as first-class explicit structures
9. **Public/buyer/reviewer projection distinctions** and bounded-public proof / redaction / disclosure surfaces
10. **Demonstration-first ordering** as part of system truth, not cosmetic UI preference
11. **Tooltip/explainer parity** as a legitimate spec surface where the operator experience depends on structured interpretability
12. **Test coverage** as canonical evidence of conformance, now including browser e2e demonstration validation in addition to unit/API tests

## 3.2 What V13 should recover from earlier versions

These are the largest useful detail families that later versions compressed too aggressively:

1. **Dense type/schema explicitness** (V6 Appendix A style)
2. **Full inference/evaluator appendix** (V6 Appendix B2 style)
3. **Formal proof obligations by subsystem**
4. **Richer telemetry and traceability obligations**
5. **Pedagogical organization and explanatory scaffolding**
6. **Scenario-rich appendices** and end-to-end interpretive examples
7. **Clearer exhaustive artifact definitions**
8. **A more complete test appendix**

## 3.3 What V13 should not recover blindly

These are areas where later versions improved the design and V13 should not revert just because older versions were denser:

1. **Profile meaning** should not revert to crude local-vs-production archetyping
2. **Operator story** should not revert to feature-list-first ordering
3. **Current source-truth surfaces** should not be replaced by older abstract placeholders
4. **Current canonical naming improvements** should not be lost just because older versions used broader/generic vocabulary
5. **Demonstration-purpose framing** should not be discarded

---

# 4. Information families: retained, lost, recovered, newly canonical

## 4.1 Product / design intent

### Earlier richness
V6 carried rich product goals, non-goals, design principles, and enterprise scenario framing.

### V12 state
V12 is much more concise and demonstration-focused.
That is good for operational focus, but it under-specifies the full philosophical and product frame relative to what a canonical long-form spec should probably carry.

### V13 action
Restore a richer product/design frame, but keep it aligned to the V12 operator truth.

Status:
- **retain** V12 thesis standard
- **recover** V6 density/pedagogy

## 4.2 Conformance profiles

### Earlier richness
V7 introduced sharper profile structure.
V8+ made profiles more operator-explicit.
V11 changed profile meaning substantially.

### V12 state
Profile A / B distinction is now materially better:
- targeted deposit / bounded need
- normalization deposit / composite need

### V13 action
This later change is canonical.
Recover earlier profile explicitness and rules, but do **not** revert the meaning.

Status:
- **retain changed meaning**
- **recover formal conformance detail**

## 4.3 Need measurement

### Earlier richness
V6 was explicit about measurement, evaluator relationships, and derivation machinery.

### V12 state
Needing is now a first-class operator surface, which is an improvement in system story.
Current source also contains richer receipts, parser contracts, and measured field machinery than V12 spec text fully spells out.

### V13 action
Unify both strengths:
- need measurement as formal subsystem
- needing as operator surface

Status:
- **retain V12 operator framing**
- **recover V6/V9 explicit formal measurement detail**
- **promote current source explicitness into spec**

## 4.4 Depositing / repo supply

### Earlier richness
Older versions did not foreground depositing the way V12 now does.

### V12 state
Depositing is now a first-class surface and is one of the best design evolutions.
Current source includes explicit repo supply, selected inventory refs, kind counts, addressing/signing/auth roots, and deposit intent summaries.

### V13 action
This is a major canonical gain.
V13 should not compress it.
V13 should instead fully formalize:
- deposit session
- repo supply
- inventory refs
- artifact-kind composition
- address/auth/sign links
- kind-native summaries

Status:
- **newly canonical**
- **must be expanded, not reduced**

## 4.5 Depositing-to-needing relation

### Earlier richness
Pre-V12 versions implied or partially encoded this relation through need measurement, ranking, asset pack, and settlement, but did not make it the explicit primary relation.

### V12 state
This is the core new V12 design move.
Current source has:
- `buildDepositingSurface(...)`
- `buildNeedingSurface(...)`
- `buildDepositingToNeedingSurface(...)`

### V13 action
Treat this as a top-level canonical subsystem and operator relation.
It should be as formally specified as any proof or settlement object.

Status:
- **newly canonical**
- **must be expanded into full formal spec coverage**

## 4.6 Candidate assets / artifact kinds / source material

### Earlier richness
V6 had a lot of explicit asset structure detail.
Later versions improved artifact-kind and upload/accountability surfaces.
V10/V11 strengthened repo-bound artifact selection and identity/auth coupling.
V12 emphasizes kind-native interaction quality.

### V13 action
Recover dense asset-schema/detail coverage while retaining the newer intake, artifact-kind parity, and repo-bound semantics.

Status:
- **retain later design changes**
- **recover dense schema/appendix detail**

## 4.7 Identity / authorization / signing / GitHub App auth

### Earlier richness
Earlier versions had auth/proof obligations, but later versions made these surfaces materially more concrete.
Current source now contains explicit chains for:
- addressing
- signing
- GitHub App auth payloads
- installation/account/repo binding
- identity/auth spine

### V13 action
This must become one of the strongest fully formalized parts of the spec.
It should combine:
- dense type/spec detail,
- proof obligations,
- operator summary semantics,
- demonstration placement.

Status:
- **major later gain**
- **must be heavily enriched in V13**

## 4.8 Recall / ranking / verification

### Earlier richness
V6 inference appendix and evaluator sections were much denser than later compact specs.

### V12 state
Current source now contains more explicit prompt contracts, measurement receipts, static heuristics, and verification receipts than the compact specs carry in full prose.

### V13 action
Recover a full evaluator appendix and align it to current source categories.

Status:
- **recover lost explicitness**
- **keep current source categorization**

## 4.9 Proof model

### Earlier richness
V6 had detailed proof-obligation sections.
Later versions strengthened concrete proof artifacts and witness structures in source.

### V12 state
Current source includes:
- `buildSystemProofBundle(...)`
- `buildProofWitnessManifest(...)`
- bounded public proof
- redaction/disclosure proof
- source-to-shares proof linkage

### V13 action
This should be one of the most fully formalized sections in V13.
It must combine:
- proof obligations,
- witness structures,
- artifact bindings,
- operator summaries,
- bounded-public projection semantics.

Status:
- **recover formal obligation richness**
- **retain current source proof architecture**

## 4.10 Settlement / journal diff / source-to-shares

### Earlier richness
V6 already cared about exact accounting.
Later versions made this much more explicit operationally.
Current source contains:
- `buildSourceToSharesArtifact(...)`
- `buildSettlementParticipationArtifact(...)`
- `buildAccountingPrecisionReport(...)`

### V13 action
Treat settlement as both:
- a formal exact-accounting subsystem,
- and a demonstrational closure subsystem.

Status:
- **major later gain**
- **must be specified densely**

## 4.11 Boundary realism / projection / disclosure

### Earlier richness
Earlier versions had less mature explicit projection/disclosure structuring.
V9–V12 improved this considerably.
Current source contains:
- bounded public proof
- redaction proof
- disclosure proof
- projection policy
- boundary reality surface

### V13 action
Retain all of this and formalize it comprehensively.

Status:
- **later gain**
- **must remain canonical**

## 4.12 Demonstration ordering / operator pedagogy / explainers

### Earlier richness
V6 had pedagogical richness, but not this exact operator ordering.
V12 now explicitly makes ordering part of system truth.
Recent implementation work added tooltip/explainer parity and demo interpretation aids.

### V13 action
V13 should canonize:
- demonstration ordering,
- operator summaries,
- explainer/tooltip parity expectations,
- section-level pedagogical clarity.

Status:
- **newly canonical**
- **must be formalized in spec, not left as UI whim**

## 4.13 Test coverage

### Earlier richness
Older versions did not carry a full canonical test-coverage appendix.
Recent work now includes unit/API coverage and browser e2e demonstration validation as a parity-bearing system surface.

### V13 action
Add a dedicated appendix for:
- unit tests
- API tests
- browser e2e tests
- coverage expectations by subsystem and demo path
- spec-to-test traceability

Status:
- **newly canonical V13 appendix requirement**

---

# 5. Information-loss / gain judgment by category

| Category | Pre-V12 richness | V12 richness | Current source richness | V13 action |
|---|---|---|---|---|
| Product/design frame | high | medium | medium | restore + align |
| Type/schema explicitness | very high | low | medium/high | restore strongly |
| Inference/evaluator explicitness | very high | medium | high | restore strongly |
| Depositing formalization | low/medium | high | high | expand |
| Needing operator formalization | medium | high | high | expand |
| Deposit-to-need relation | low | high | high | fully formalize |
| Identity/auth spine | medium | high | very high | fully enrich |
| Proof obligations + witnesses | high | medium/high | very high | fully enrich |
| Settlement/source-to-shares | medium/high | high | very high | fully enrich |
| Boundary/projection/disclosure | medium | high | very high | fully enrich |
| Demo ordering/pedagogy | medium | high | high | canonize |
| Tooltip/explainer parity | absent | implied | emerging/high | canonize |
| Test appendix | low | low | medium/high | add appendix |

---

# 6. V13 implications

This audit directly implies that V13 should be:

1. **fully enriched** in the style of V6 density,
2. **cohesive and clear** in the style of later versions,
3. **current-source-faithful** in the style of V7+ parity work,
4. **demonstration-canon-aware** in the style of V11/V12,
5. and **appendix-rich** enough to be the ultimate long-form ENGI spec rather than another compression phase.

V13 therefore should include at minimum:
- a dense core body,
- formal types/schemas appendix,
- evaluator/inference appendix,
- proof obligations appendix,
- artifact and deliverables appendix,
- test coverage appendix,
- scenario/example appendix,
- and explicit spec-to-source parity points.

---

# 7. Recommended V13 default structure

The new `_VN_` fully enriched spec file pattern should default to:

1. Executive summary
2. Normative language
3. Product goals / non-goals / design principles
4. Conformance profiles and precedence
5. Source-of-truth hierarchy
6. System overview / operator story
7. Core entity model
8. Depositing subsystem
9. Needing subsystem
10. Depositing-to-needing relation
11. Recall / ranking / verification
12. Asset pack / branch materialization
13. Identity / auth / signing / GitHub App auth
14. Proof model / obligations / witnesses
15. Settlement / journal diff / source-to-shares
16. Boundary realism / projection / disclosure
17. Demonstration ordering / operator pedagogy / explainers
18. Telemetry / observability
19. Persistence / correctness / failure semantics
20. Test coverage and validation
21. Appendices

This should be the default canonical spec-document expectation going forward.

---

# 8. Final audit conclusion

V13 should not choose between:
- V6 richness,
- V12 clarity,
- and current-source truth.

It should deliberately combine them.

That means:
- restore lost explicitness,
- preserve newer design gains,
- canonize parity-bearing implementation truths,
- and treat the spec as the full, precise, pedagogically complete description of ENGI again.
