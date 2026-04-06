# ENGI Spec V16

## Status

- Scope: current V16 draft fully tightens `prompt-completeness` and opens all nine V15 proof families through first-pass closure design plus member-coverage drafting
- Companion notes file: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V16_NOTES.md`
- Companion parity ledger: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V16_SYSTEM_PARITY_MATRIX.md`
- Prior canonical anchor: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V15.md`
- Current canonical/latest target: `V15`
- Last fully realized canon preserved in source: `V15`
- V16 state: drafting; not yet the canonical pointer target
- Current realization basis for this pass: `engi-demo`

## Version executive summary

V16 begins as the first proof-coverage-focused canon draft.
Its opening move is to fully tighten one proof family and then move outward one adjacent family at a time before broadening into the full proof appendix, theorem pass, and proof-audit program.

The first family is `prompt-completeness`.
That choice is not arbitrary.
V15 already defines prompt-completeness canonically, but current source realization, witness closure, and tests do not yet satisfy the full family claim.

That wedge has now been pushed across all nine V15 proof families at first-pass closure depth.
`prompt-completeness` remains the tightest family.
The others are still first-pass rather than final V16 canon, but they now each have:
- family cases,
- provisional artifact direction,
- witness/replay direction,
- expected/realized/family-closure splits,
- and member-coverage inventories.

This draft therefore still does not attempt a full-system V16 rewrite.
Its purpose is to make the proof-family layer precise enough that:
- the family theorem,
- the family runtime surfaces,
- the family artifacts,
- the family witnesses,
- and the family closure tests

all say the same thing.

## Canonical ENGI executive summary

ENGI remains a proof-bearing operating system for turning deposited work, measured need, candidate evaluation, materialized artifacts, and exact settlement into a replayable chain.

Inference is permitted inside that chain only when it is not treated as magic.
Prompted or synthesized outputs become canonical only when their ownership, evidence basis, context contract, parse contract, downstream use, and proof story are explicit enough to be audited rather than trusted.

## Current V16 drafting scope

This pass now covers:
- full first-pass V16 formalization for `prompt-completeness`,
- first-pass closure design for the other eight V15 proof families,
- and provisional member-coverage inventories across all nine families.

The following are still intentionally deferred:
- theorem-family expansion beyond the current family-first pass,
- proof appendix generation,
- proof execution/audit orchestration,
- and `_PROVEN_` file generation requirements.

The correct reading is:
- V15 remains active canon,
- V16 is being drafted through proof-family-by-proof-family tightening,
- `prompt-completeness` remains the most tightened family,
- and the rest of the proof families are now opened deeply enough to support the next member and theorem passes.

---

## 1. Prompt-completeness purpose

The `prompt-completeness` family proves that prompt-owned inferred fields are canonically owned, contract-bound, parse-bound, auditable, and truthfully consumed.

This family exists so that prompt-derived outputs are not merely available.
They must be dependably attributable and replayable.

Prompt-completeness is therefore not a prompt-string hygiene check.
It is the family that closes prompt-owned output legitimacy.

### 1.1 Prompt-completeness canonical terms

For V16, the following family-local terms are canonical:

- `prompt-owned inferred field`
  A field whose value is produced through a declared prompt or evaluator path and whose output ownership belongs to that path.

- `prompt family member`
  One canonical prompt case that owns exactly one declared output field within the family.

- `prompt template contract`
  The canonical declaration of a prompt family member's template identity, owned output field, rendered context requirements, allowed non-rendered context inputs, required downstream consumers, and parse obligations.

- `context injectable expectation`
  A canonical declaration that a context field is required, optional, forbidden, rendered, or non-rendered for a given prompt family member.

- `parsable completion contract`
  The strict output contract governing payload type, owned fields, required keys, parse mode, exact-key policy, and admissibility conditions.

- `parsed completion envelope`
  The normalized, hashed, contract-bound representation of one prompt family's realized output payload.

- `downstream consumer`
  Any emitted artifact, surface, projection, or report that semantically consumes the prompt-owned output field.

- `family case`
  The single auditable unit of prompt-completeness, tied to one prompt family member and one owned output field.

- `explicit exclusion`
  A named rule stating that a field is not a member of prompt-completeness and identifying the proof path that governs it instead.

### 1.2 Prompt-completeness family obligations

`prompt-completeness` is complete only when all of the following are true:

1. Coverage totality
   Every prompt-owned inferred field has exactly one family case.

2. No ghost coverage
   No field is classified as prompt-owned inferred content unless the family can actually prove it.

3. No silent exclusion
   Any field outside the family is excluded by explicit rule, not by omission.

4. Template-contract closure
   Every family case has an explicit prompt template contract.

5. Context-contract closure
   Every family case has explicit context-injectable expectations for rendered and non-rendered inputs.

6. Parse-contract closure
   Every family case has a strict parsable completion contract.

7. Parsed-envelope admissibility closure
   Every realized case has a parsed completion envelope whose contract resolution and payload admissibility are part of the family verdict.

8. Downstream-consumer closure
   Every real downstream consumer is declared, and every declared consumer is real.

9. Provenance-truth closure
   Source annotations and precedence claims match actual runtime execution.

10. Witness, replay, and test closure
    Family cases are individually auditable through witnesses, replay instructions, and failure-encoding tests.

---

## 2. Prompt-completeness canonical structures

V16 should treat the following family objects as canonical target structures.

```ts
type PromptTemplateContractV16 = {
  promptId: string
  templateId: string
  templateVersion: string
  ownedOutputField: string
  requiredRenderedFields: string[]
  allowedNonRenderedFields: string[]
  requiredDownstreamConsumers: string[]
  proofFamily: 'prompt-completeness'
  parseContractId: string
}
```

```ts
type ContextInjectableExpectationV16 = {
  promptId: string
  field: string
  mode: 'rendered-required' | 'rendered-optional' | 'non-rendered-allowed' | 'forbidden'
  provenanceClass: 'scenario' | 'measurement' | 'repo-context' | 'policy' | 'prior-canon'
}
```

```ts
type PromptFamilyRegistryV16 = {
  proofFamily: 'prompt-completeness'
  templateContracts: PromptTemplateContractV16[]
  contextExpectations: ContextInjectableExpectationV16[]
}
```

```ts
type PromptCompletenessCaseResultV16 = {
  promptId: string
  ownedOutputField: string
  inDeclaredFamilyRegistry: boolean
  templateContractPresent: boolean
  contextExpectationsClosed: boolean
  promptContractComplete: boolean
  parseContractPresent: boolean
  parseContractStrict: boolean
  parsedEnvelopePresent: boolean
  parsedEnvelopeAdmissible: boolean
  downstreamConsumersClosed: boolean
  provenanceAnnotationsTruthful: boolean
  explicitlyExcluded: boolean
  passed: boolean
  failureReasons: string[]
}
```

```ts
type PromptCompletenessProofV16 = {
  proofFamily: 'prompt-completeness'
  classifiedPromptOwnedFields: string[]
  registeredPromptOwnedFields: string[]
  familyRegistry: PromptFamilyRegistryV16
  caseResults: PromptCompletenessCaseResultV16[]
  coverageTotalityClosed: boolean
  parseClosureClosed: boolean
  downstreamConsumerClosureClosed: boolean
  provenanceTruthClosed: boolean
  witnessClosureClosed: boolean
  replayClosureClosed: boolean
  testClosureClosed: boolean
  witnessArtifactPaths: string[]
  replayArtifacts: string[]
  replayInstructions: string[]
  allCasesPassed: boolean
  proofHash: string
}
```

These objects are the target semantics for V16.
Current source may realize them through adjacent builders or artifact families during migration, but the parity matrix must judge any lag explicitly.

### 2.1 Preferred expected/realized/family closure design

V16 should now prefer the following ownership split for `prompt-completeness`:

1. `PromptFamilyRegistryV16`
   Owns expected truth:
   - prompt family membership,
   - template contracts,
   - and context expectations.

2. Runtime prompt surfaces
   Own realized run truth:
   - prompt surfaces,
   - prompt contracts,
   - parsable completion contracts,
   - and parsed completion envelopes.

3. `PromptCompletenessProofV16`
   Owns family closure:
   - coverage totality,
   - parse closure,
   - downstream-consumer closure,
   - provenance-truth closure,
   - witness closure,
   - replay closure,
   - and test closure.

This design is preferable to:

1. runtime-only ownership
   because it leaves expected family truth implicit,
   or
2. registry-only ownership
   because it weakens run-specific auditability and parse/admissibility closure.

The family needs both:
- expected prompt-family truth,
- and realized prompt-run truth,

with an explicit closure path between them.

### 2.2 Artifact materialization determination rule

V16 should determine first-class prompt-completeness artifacts using the following rule.

A surface is a mandatory first-class family artifact when:

1. it is a primary proof-bearing object,
2. replay needs it directly,
3. other family surfaces close back to it,
4. it carries unique run-specific or family-expected truth,
5. or its absence would materially weaken direct auditability.

A surface may remain an explicit witness structure only when:

1. it is derivative or aggregate,
2. it is losslessly reconstructible from first-class family artifacts,
3. replay instructions name that reconstruction path,
4. and no unique family truth is lost by not emitting it separately.

### 2.3 Provisional artifact direction

Under the current provisional determination:

1. mandatory first-class family artifacts should be:
   - `.engi/prompt-family-registry.json` or an equivalent runtime registry surface,
   - `.engi/prompt-contracts.json`,
   - `.engi/prompt-surfaces.json`,
   - `.engi/parsed-completion-envelopes.json`,
   - `.engi/prompt-completeness-proof.json`.

2. prompt implementation surface may remain an explicit witness structure only if V16 keeps it fully reconstructible and replay-addressable.

3. system proof bundle and aggregate hashes are not sufficient substitutes for primary prompt-completeness closure surfaces.

### 2.4 Provisional witness-materialization and replay direction

V16 should now also prefer the following witness/replay posture for this family:

1. family-critical prompt surfaces should be first-class artifacts whenever practical,
2. witness artifact paths should name the actual family artifacts rather than a narrower subset,
3. replay artifacts and replay instructions should reconstruct:
   - expected family registry truth,
   - realized prompt surfaces and contracts,
   - parsed-envelope admissibility,
   - downstream-consumer closure,
   - and family-level closure verdict,
4. replay should expose case inventory and omission-class failures rather than only aggregate proof hashes,
5. and family proof should carry its own witness/replay closure fields directly.

This means prompt-completeness should provisionally expect witness and replay closure over at least:
- prompt family registry or equivalent runtime registry surface,
- prompt contracts,
- prompt surfaces,
- parsed completion envelopes,
- and family-level prompt-completeness proof.

---

## 3. Prompt-completeness closure theorem

V16 sharpens the family theorem as follows:

> `prompt-completeness-closure-v16`
> Prompt-owned inferred fields are canonically closed only when family membership, template contracts, context expectations, parse contracts, parsed-envelope admissibility, downstream consumer declarations, provenance annotations, witnesses, replay instructions, and closure tests all agree exactly.

The family is closed only when:

1. the classified prompt-owned field set equals the registered field set,
2. every registered field has exactly one family case,
3. every case has a prompt template contract and context expectations,
4. every case has a strict parse contract,
5. every realized case has an admissible parsed completion envelope,
6. downstream consumer declarations are complete and truthful,
7. provenance annotations describe actual source precedence,
8. witness structures expose case-level auditability,
9. replay instructions can reconstruct case inventory and verdicts,
10. and tests fail on omission, vacuity, false annotation, false consumer, or parse inadmissibility.

The family is not closed if any of the following occurs:

- a prompt-owned field exists without a family case,
- a family case exists without an owned field,
- a field disappears from prompt surfaces without causing family failure,
- parse admissibility exists only as a side artifact and not as a family verdict,
- downstream consumers are declared but not validated,
- provenance annotations are aspirational rather than truthful,
- or witnesses and tests remain aggregate-only and permit omission-class failures to stay green.

---

## 4. `closureCriteria` normalization rule

`closureCriteria` is the first canonical V16 normalization case for prompt-completeness.

At the start of V16 drafting, current source treats `closureCriteria` as inferred need content and consumes it downstream, while prompt-completeness does not own or prove it.
That posture is not allowed to remain implicit.

V16 permits exactly two truthful outcomes:

1. Prompt-owned outcome
   `closureCriteria` remains prompt-owned inferred content and gains:
   - a prompt family member,
   - a prompt template contract,
   - explicit context expectations,
   - a parsable completion contract,
   - a parsed completion envelope,
   - downstream consumer declarations,
   - a first-class case result,
   - and witness/replay/test closure.

2. Explicitly excluded outcome
   `closureCriteria` is reclassified out of prompt-owned inferred content, removed from prompt-completeness membership claims, and given a named replacement proof path.

There is no third allowed posture in which `closureCriteria` remains prompt-relevant inferred content while living outside the family accidentally.

---

## 5. Implementation-facing obligations for current source

For the current realization basis, prompt-completeness requires the following implementation changes before family closure can be claimed:

1. `buildPromptCompletenessProof(...)` must expand from placeholder/context hygiene into a full family proof object.
2. `PromptTemplateContract` must stop being prose-only and become a real runtime registry or equivalent canonical runtime surface.
3. `ContextInjectableExpectation` must stop being prose-only and become a real runtime registry or equivalent canonical runtime surface.
4. Parse-contract resolution and payload admissibility must become family verdict inputs rather than sidecar artifact facts.
5. Downstream consumer declarations must be validated against real consumers in emitted artifacts and operator-facing surfaces.
6. Source-precedence annotations for prompt-owned inferencing must be made truthful by implementation or by re-annotation.
7. Witness structures must become case-sensitive enough to expose missing fields directly.
8. Replay instructions must be able to reproduce case inventory and case outcomes rather than only aggregate hashes.
9. Tests must ratchet from aggregate-green checks to case-closure checks.

These obligations are implementation-facing because prompt-completeness is only meaningful if the current source can either satisfy them or state its remaining debt plainly.

---

## 6. Prompt-completeness completion condition for this draft scope

This V16 draft scope is in a satisfactory state only when:

1. the parity matrix and this spec describe the same family expectations,
2. `closureCriteria` has been resolved through one explicit path,
3. prompt-completeness cases are registry-backed and case-auditable,
4. parse admissibility and downstream consumer truth are inside the family verdict,
5. provenance-truth failures are encoded as family failures,
6. and the test graph encodes the family's omission and false-claim failure modes directly.

Until then, the correct V16 reading is:
- the family target is now sharper,
- the implementation debts are identifiable,
- and prompt-completeness remains an open proof-closure program rather than a finished surface.

### 6.1 Provisional member coverage

The current provisional member-coverage reading for `prompt-completeness` is:

1. `task`
   Realized through `need-measurement.task.v2` prompt contracts, prompt surfaces, parsed envelopes, and prompt-completeness coverage.
   Current debt: downstream-consumer closure is incomplete because current bindings understate real consumers such as `ENGI_NEED.md`.

2. `failureModes`
   Realized through `need-measurement.failure-modes.v2` prompt contracts, prompt surfaces, parsed envelopes, and prompt-completeness coverage.
   Current debt: downstream-consumer semantics are not clean enough because some declared consumers appear lineage-oriented rather than semantic consumers.

3. `constraints`
   Realized through `need-measurement.constraints.v2` prompt contracts, prompt surfaces, parsed envelopes, and prompt-completeness coverage.
   Current debt: non-rendered-context legality and parse-admissibility closure are still sidecar facts rather than full family verdict inputs.

4. `targetArtifactKinds`
   Realized through `need-measurement.target-artifact-kinds.v2` prompt contracts, prompt surfaces, parsed envelopes, and prompt-completeness coverage.
   Current debt: downstream-consumer closure is incomplete because current bindings understate real consumers such as `ENGI_NEED.md`.

5. `closureCriteria`
   Currently classified as inferred need content but not realized as a prompt-completeness member and not yet explicitly excluded.
   Current debt: this is the family's strongest explicit omission and remains the canonical non-closure case until V16 resolves it one way or the other.

---

## 7. Inference-synthesis initial V16 reading

`inference-synthesis` is the next family opened by V16 because it governs the legitimacy of inferred fields before those fields are judged complete by prompt contracts.

V15 already requires this family to prove that:
- inferred fields are owned by declared evaluators,
- declared evidence remains traceable,
- prompt/model identity is recorded,
- repeated execution is replayable at the trace level,
- prompted inference is not mislabeled as static measurement,
- and stand-in versus live evaluator status is explicit.

### 7.1 Early confirmed V16 parity findings

The current source already reveals four first-order inference-synthesis debts:

1. Coverage debt
   The system classifies five inferred fields, but current inference proofs and inferred traces cover only four.

2. Evaluator-status truth debt
   The current inference proofs use `deterministic-local-evaluator.v15` while their evaluator surfaces still report `standIn: false`.

3. Evidence-closure debt
   Current per-field inference proofs do not clearly close over the full evidence basis used by the corresponding prompt context and derivation path.

4. Witness-materialization debt
   Core inference-synthesis witness surfaces such as inference proofs and prompt implementation surfaces are not yet clean first-class emitted witness artifacts.

### 7.2 Initial V16 obligations for inference-synthesis

Before full family formalization, V16 should already require:

1. inferred-field coverage equality between classified inferred fields, inference proofs, and inferred provenance traces,
2. truthful evaluator status for stand-in versus live execution,
3. explicit evidence closure for each inferred field,
4. auditable separation between field-level proof, evaluator/moment contract, and family-level closure,
5. and stronger witness/test closure than current aggregate presence checks.

### 7.3 Current drafting boundary

This draft does not yet define the full V16 object model for `inference-synthesis`.
That is deliberate.

The correct next move is:
- finish the first inference-synthesis parity ledger in the matrix,
- decide the family's preferred runtime proof shape,
- then promote that shape into a fuller V16 spec section and notes treatment.

### 7.4 First normalization case: evaluator-status truth

The first normalization case for inference-synthesis is evaluator-status truth.

V15 already requires stand-in versus live evaluator status to be explicit.
V16 sharpens that requirement:

> `inference-evaluator-status-truth`
> No inference-synthesis surface may describe the same evaluator as both stand-in and non-stand-in for the same realized run.

For prompt-bearing inferred evaluators, V16 should require:

1. one canonical stand-in/live classification per evaluator,
2. agreement across field-level inference proofs,
3. agreement across eval-manifest evaluator interfaces,
4. agreement across prompt implementation surfaces,
5. agreement across external-boundary descriptions,
6. and family failure if any of those surfaces diverge.

This rule exists because inference-synthesis is not only about output ownership and evidence refs.
It is also about the truth of the evaluator boundary that produced the inferred field.

### 7.5 Early implementation implication

Current source strongly suggests that evaluator-status truth should be normalized by design rather than patched individually at each artifact surface.

V16 should therefore prefer one of the following implementation postures:

1. canonical evaluator-status registry
   Each evaluator or moment has one canonical status surface from which all artifacts derive,
   or
2. canonical evaluator-surface builder truth
   The shared evaluator-surface builder takes an explicit stand-in/live value for prompt-bearing inferred evaluators and all higher surfaces derive from it without contradiction.

V16 does not need to choose between those two postures yet.
It does need to reject the current contradictory posture.

### 7.6 Second normalization case: field evidence-basis closure

The second normalization case for inference-synthesis is field evidence-basis closure, starting with `task`.

V15 already requires that inferred fields remain traceable to declared evidence.
V16 sharpens that requirement:

> `inference-field-evidence-closure`
> No field-level inference proof may be treated as complete if it names only a partial subset of the materially used evidence basis, unless it explicitly binds itself to a richer canonical contract that closes that basis.

For inferred fields such as `task`, V16 should require:

1. one canonical evidence basis per inferred field,
2. agreement or explicit closure linkage between:
   - field-level inference proof evidence,
   - prompt-context evidence,
   - and field-derivation evidence,
3. family failure when field-level evidence refs underdeclare the actual prompt-driving evidence basis,
4. and replay/test surfaces that make underdeclared evidence a visible failure class.

This rule exists because inference-synthesis cannot stop at “some evidence refs were recorded.”
It must prove that the recorded evidence basis is the right one for the field that was inferred.

### 7.7 Early implementation implication

Current source suggests that V16 will need an explicit evidence-closure design decision for inference-synthesis.

The clean options appear to be:

1. direct field-proof closure
   Each field-level inference proof owns the full evidence basis directly,
   or
2. referenced contract closure
   Each field-level inference proof references a canonical evaluator/moment or prompt contract that owns the full evidence basis.

V16 does not need to choose that design immediately.
It does need to reject the current posture where multiple partial evidence stories coexist without a canonical closure rule.

### 7.8 Provisional V16 canonical structures for inference-synthesis

The first two inference-synthesis cases now justify a provisional family proof shape.

V16 should provisionally distinguish three canonical object layers for this family.

```ts
type InferenceMomentContractV16 = {
  momentContractId: string
  evaluatorId: string
  momentKind:
    | 'need-measurement'
    | 'candidate-recall'
    | 'ranking'
    | 'verification'
    | 'other-inference'
  ownedOutputFields: string[]
  expectedContextFields: string[]
  expectedEvidenceBasis: string[]
  downstreamConsumers: string[]
  boundaryTruth: 'deterministic-local-stand-in' | 'deterministic-local' | 'remote-live' | 'hybrid'
  standIn: boolean
}
```

```ts
type InferenceFieldProofV16 = {
  outputField: string
  evaluatorId: string
  momentContractId: string
  modelId: string
  realizedEvidenceBasis: string[]
  evidenceBasisClosedToMoment: boolean
  evidenceBasisClosedToPromptContext: boolean
  evaluatorStatusTruthful: boolean
  evaluatorStatusClosedToMoment: boolean
  replayableTrace: boolean
  admissible: boolean
  ownedByDeclaredEvaluator: boolean
}
```

```ts
type InferenceSynthesisFamilyProofV16 = {
  proofFamily: 'inference-synthesis'
  classifiedInferredFields: string[]
  coveredInferredFields: string[]
  momentContracts: InferenceMomentContractV16[]
  fieldProofs: InferenceFieldProofV16[]
  coverageTotalityClosed: boolean
  evaluatorStatusClosureClosed: boolean
  evidenceBasisClosureClosed: boolean
  witnessMaterializationClosed: boolean
  replayClosureClosed: boolean
  testClosureClosed: boolean
  witnessArtifactPaths: string[]
  replayArtifacts: string[]
  replayInstructions: string[]
  allCasesPassed: boolean
  proofHash: string
}
```

These structures are still provisional.
Their job is to separate concerns that current source currently compresses together:
- evaluator/moment declaration,
- field-level inferred-output legitimacy,
- and family-level closure.

### 7.9 Preferred evidence-ownership design

V16 should now provisionally prefer the following ownership split:

1. `InferenceMomentContractV16`
   Owns expected truth:
   - expected context fields,
   - expected evidence basis,
   - downstream consumers,
   - and boundary truth.

2. `InferenceFieldProofV16`
   Owns realized run truth:
   - the concrete evidence basis used for the run,
   - evaluator-status truth for that run,
   - and closure booleans showing whether the realized run truth agrees with the moment contract and prompt context.

3. `InferenceSynthesisFamilyProofV16`
   Owns family closure:
   - coverage totality,
   - evaluator-status consistency,
   - evidence-basis closure,
   - witness-materialization closure,
   - replay closure,
   - and test closure.

This hybrid design is currently preferable to:

1. field-proof-only evidence ownership
   because it duplicates expected truth across every field proof,
   or
2. contract-only evidence ownership
   because it hides run-specific proof basis inside references and weakens auditability.

The family needs both:
- expected truth,
- and realized truth,

with an explicit closure path between them.

### 7.10 Provisional witness-materialization and replay direction

V16 should now also prefer the following witness/replay posture for this family:

1. family-critical surfaces should be first-class artifacts whenever practical,
2. bundle-only carriage should not be the primary witness form for field proofs or family proof,
3. witness artifact paths should name the actual family artifacts rather than a nearby surrogate when possible,
4. replay artifacts and replay instructions should explicitly reconstruct the family's own proof story,
5. and family proof should carry its own witness/replay closure fields directly.

This means inference-synthesis should provisionally expect replay and witness closure over at least:
- moment contracts,
- field-level inference proofs,
- prompt implementation surface,
- and family-level inference-synthesis proof.

### 7.11 Artifact materialization determination rule

V16 should determine first-class inference-synthesis artifacts using the following rule.

A surface is a mandatory first-class family artifact when:

1. it is a primary proof-bearing object,
2. replay needs it directly,
3. other family surfaces close back to it,
4. it carries unique run-specific truth,
5. or its absence would materially weaken direct auditability.

A surface may remain an explicit witness structure only when:

1. it is derivative or aggregate,
2. it is losslessly reconstructible from first-class family artifacts,
3. replay instructions name that reconstruction path,
4. and no unique run-specific proof truth is lost by not emitting it separately.

### 7.12 Provisional artifact direction

V16 should also begin treating the following as likely first-class artifact targets for this family:

1. `.engi/inference-moment-contracts.json`
2. `.engi/inference-proofs.json`
3. `.engi/prompt-implementation-surface.json`
4. `.engi/inference-synthesis-proof.json`
5. `.engi/eval-manifest.json`
6. `.engi/prompt-surfaces.json`
7. `.engi/parsed-completion-envelopes.json`

These filenames are not yet final canon.
The important V16 move is that the family's main witness surfaces stop existing only inside:
- the system proof bundle,
- the eval manifest,
- or aggregate witness refs.

Under the current provisional determination:

1. mandatory first-class family artifacts should be:
   - moment contracts,
   - field-level inference proofs,
   - family-level inference-synthesis proof,
   - eval manifest,
   - prompt surfaces,
   - and parsed completion envelopes.

2. prompt implementation surface may remain an explicit witness structure only if V16 keeps it fully reconstructible and replay-addressable.

3. prompt contracts remain important supporting material, but they should not continue to stand in for the family's primary witness closure.

### 7.13 Provisional member coverage

The current provisional member-coverage reading for `inference-synthesis` is:

1. `task`
   Realized through a field-level inference proof, prompt-bearing evaluator surface, parsed envelope, and prompt implementation trace.
   Current debt: the field-level evidence basis remains narrower than the full prompt-driving evidence basis.

2. `failureModes`
   Realized through a field-level inference proof, prompt-bearing evaluator surface, parsed envelope, and prompt implementation trace.
   Current debt: evaluator-status truth is contradictory across family surfaces and evidence-basis closure is not yet canonical.

3. `constraints`
   Realized through a field-level inference proof, prompt-bearing evaluator surface, parsed envelope, and prompt implementation trace.
   Current debt: evaluator-status truth is contradictory across family surfaces and realized evidence closure is still partial.

4. `targetArtifactKinds`
   Realized through a field-level inference proof, prompt-bearing evaluator surface, parsed envelope, and prompt implementation trace.
   Current debt: evaluator-status truth is contradictory across family surfaces and realized evidence closure is still partial.

5. `closureCriteria`
   Currently classified as inferred content but not realized through a field-level inference proof or a corresponding inference-synthesis witness path.
   Current debt: this remains the family's clearest coverage-totality failure.

### 7.14 Current drafting boundary

This still does not complete inference-synthesis formalization.

What it does complete is the first transition from:
- isolated family defects,
to
- a provisional family target shape that can actually be implemented and parity-audited.

## 8. Static-code-analysis initial V16 reading

This is the next proof family opened after `prompt-completeness` and `inference-synthesis`.

The first V16 pass remains narrow on purpose.
The immediate problem is not yet:
- adding many new static-analysis proof artifacts,
- or fully formalizing the family's final V16 type system.

The immediate problem is whether the current family truthfully proves a static stage domain at all.

### 8.1 V15 family reading

V15 defines `static-code-analysis` as:
- deterministic parser,
- repo-context,
- content-unit,
- and measurement stages

being receipt-bearing and replayable.

That is already a more specific family claim than:
- some receipts exist,
- some code-analysis registries exist,
- and some replay instruction mentions receipts.

The V16 reading should therefore preserve two things at once:

1. stage-domain narrowness
   The family is about static stages, not an arbitrary receipt pool.

2. replayability
   The family is not complete merely because receipt ids resolve.
   It must be possible to identify and replay the canonical static stage domain honestly.

### 8.2 First normalized case: receipt-domain closure and family-boundary truth

The first case for this family is receipt-domain closure.

Current source already shows that:
- `buildStaticMeasurementReport(...)` carries both `needMeasurementReceiptIds` and `verificationReceiptIds`,
- `buildStaticMeasurementProof(...)` computes `expectedReceiptRefs` from a mixed union of need and candidate provenance,
- and the family's `coveredStageIds` currently include both:
  - static stages such as `github-actions.benchmark-parser.v15`, `github.repo-context.extract.v15`, `content-unit.extract-static-code-analysis.v15`, and `asset.measurement.extract.v15`,
  - and verification stages such as `verification.determinisms.v15`, `verification.issuance-checks.v15`, `verification.provenance-checks.v15`, `verification.sufficiency-checks.v15`, and `verification.issuer-policy-checks.v15`.

That means the current family proof object is not only proving static-stage closure.
It is proving mixed receipt resolution across static and verification domains.

V16 should treat that as a first-class family-boundary problem.

### 8.3 Initial parity reading for this case

For this case, the V16 parity reading is:

1. `static-code-analysis` cannot remain a narrow family in theorem language while its proof/report domain silently absorbs verification-stage receipts.

2. verification receipts should remain available to the verification family as family-specific proof material rather than being silently re-counted as static family closure.

3. replay closure for the family should reconstruct static stage closure specifically, not a broader mixed receipt domain.

4. the family needs an explicit notion of:
   - in-family static stages,
   - out-of-family stages,
   - and any required abstraction mapping between declared provenance-stage ids and concrete receipt-stage ids.

### 8.4 Early implementation implication

Current source suggests that V16 will likely need to distinguish at least:

1. static stage-domain truth
   Which parser, repo-context, content-unit, and asset-measurement stages are canonically inside the family.

2. receipt-closure truth
   Which receipt refs are expected for the family and whether they resolve.

3. family-boundary truth
   Whether any out-of-family stage ids appear inside the family report or proof.

4. witness/replay truth
   Whether the emitted registries, report, proof, and replay instructions all tell the same static-family story.

Without that separation, the family can keep appearing healthy while still proving the wrong domain.

### 8.5 Provisional V16 canonical structures for this first case

The first case already justifies a minimal provisional shape for the family.

```ts
type StaticStageDomainContractV16 = {
  proofFamily: 'static-code-analysis'
  expectedStageIds: string[]
  abstractStageMappings: Array<{
    abstractStageId: string
    concreteStageIds: string[]
  }>
  allowedReceiptKinds: string[]
}
```

```ts
type StaticCodeAnalysisFamilyProofV16 = {
  proofFamily: 'static-code-analysis'
  stageDomainContract: StaticStageDomainContractV16
  expectedReceiptRefs: string[]
  coveredStageIds: string[]
  outOfFamilyStageIds: string[]
  allReceiptRefsResolve: boolean
  stageDomainClosed: boolean
  registryClosureClosed: boolean
  witnessMaterializationClosed: boolean
  replayClosureClosed: boolean
  testClosureClosed: boolean
  allCasesPassed: boolean
  proofHash: string
}
```

These structures are still provisional.
They are justified now because the current family already needs a place to represent:
- the canonical static stage domain,
- abstraction-to-concrete stage mapping,
- out-of-family stage leakage,
- and closure beyond receipt-ref resolution.

### 8.6 Current drafting boundary

This first case does not yet complete static-code-analysis formalization.

What it does complete is the first family-specific V16 question for this area:
- whether the family is actually proving a static stage domain,
- or whether it is currently proving mixed receipt closure under a static family name.

### 8.7 Second normalized case: artifact-role closure and alias truth

The next case for this family is artifact-role closure.

Current source already shows that the family does not emit one artifact only.
It emits at least:
- a code-analysis fact registry,
- a static heuristics registry,
- measurement receipts,
- a static measurement report,
- and a static measurement proof.

The family therefore needs a canonical rule for what each surface is for.

The strongest current signal is that source already marks the relationship between the two registries:
- the code-analysis fact registry declares `.engi/static-heuristics-registry.json` as a spec artifact alias,
- and the static heuristics registry is currently built by copying the fact registry and adding artifact metadata only.

So V16 should not treat the current family artifact set as five equally primary proof objects by default.
It should distinguish:
- primary registry truth,
- alias or projection truth,
- receipt truth,
- report truth,
- and family-proof truth.

### 8.8 Initial parity reading for this second case

For this case, the V16 parity reading is:

1. if two family artifacts carry the same underlying registry truth, the family should say whether one is canonical and the other is an alias or projection,

2. receipts, report, and proof should not be flattened into one generic witness layer because they carry different closure truth,

3. witness refs should reflect those role differences rather than collapsing the entire family to receipt ids only,

4. and deliverable/public availability should not be confused with proof-object primacy.

### 8.9 Early implementation implication

Current source suggests that V16 will likely need at least the following role split:

1. registry surface
   The canonical fact inventory and consumer/audit matrix for static analysis.

2. alias or projection surface
   Any public/operator-friendly or naming-compatible registry surface that is intentionally derived from the canonical registry surface.

3. receipt surface
   The execution receipts that attest concrete stage runs.

4. report surface
   The summary of receipt-set closure and stage coverage.

5. family-proof surface
   The family verdict about whether the static-code-analysis family is actually closed.

Without that split, later V16 work would keep mixing:
- what was executed,
- what facts are canonically registered,
- what summaries are public,
- and what the family itself claims to have proven.

### 8.10 Provisional role grammar for this family

The current family work now justifies a minimal provisional role grammar.

```ts
type StaticFamilyArtifactRoleV16 =
  | 'primary-registry'
  | 'alias-registry'
  | 'receipt-log'
  | 'family-report'
  | 'family-proof'
```

```ts
type StaticFamilyArtifactDescriptorV16 = {
  path: string
  role: StaticFamilyArtifactRoleV16
  derivedFromPaths: string[]
  carriesUniqueTruth: boolean
  publicSafe: boolean
}
```

These structures are still provisional.
Their immediate purpose is only to stop the family from treating:
- alias surfaces,
- receipt logs,
- reports,
- and proofs

as though they were interchangeable proof-bearing objects.

### 8.11 Current drafting boundary

The family is still in early V16 discovery.

At this point it now has two concrete normalization questions:

1. is the family boundary static-only,
2. and what are the canonical roles of the family's emitted artifacts.

### 8.12 Artifact materialization determination rule

The family now has enough evidence for a provisional artifact-materialization rule.

A static-code-analysis surface should be a mandatory first-class family artifact when:

1. it carries primary family truth rather than naming-compatible alias truth,
2. replay needs it directly to reconstruct static stage closure,
3. other family surfaces close back to it,
4. it carries unique run-specific proof truth,
5. or its absence would materially weaken direct auditability of the family.

A surface may remain a derived alias or projection surface only when:

1. its underlying truth is already preserved by a primary family artifact,
2. it adds naming, compatibility, or public/operator ergonomics rather than new proof truth,
3. its derivation path is explicit,
4. replay does not require it independently,
5. and tests can prove that it remains role-consistent with its primary source artifact.

### 8.13 Provisional artifact direction

Under the current first-pass reading, V16 should provisionally treat the family's artifact set as follows:

1. primary registry surface
   `.engi/code-analysis-fact-registry.json`

2. alias or projection registry surface unless later work finds distinct truth
   `.engi/static-heuristics-registry.json`

3. primary receipt-log surface
   `.engi/measurement-receipts.json`

4. report surface
   `.engi/static-measurement-report.json`

5. family-proof surface
   `.engi/static-measurement-proof.json`

6. likely future first-class family artifact when stage-domain truth becomes explicit
   `.engi/static-stage-domain-contract.json`

This remains provisional.
The important V16 move is not the final filename list.
It is that the family now stops treating:
- registry,
- alias surface,
- receipt log,
- report,
- and family proof

as though they were interchangeable closure surfaces.

### 8.14 Current drafting boundary

The family is still not fully formalized.

What it now does have is:

1. a first normalized case on stage-domain purity,
2. a second normalized case on artifact-role closure,
3. and a provisional artifact determination rule strong enough to support the next family-specific replay and witness tightening.

### 8.15 Provisional witness-materialization and replay direction

The current family work now supports a first replay/witness direction as well.

V16 should provisionally prefer the following posture:

1. witness refs should not flatten the family to receipt ids only,
2. replay artifacts should include the family's report and proof surfaces as well as its registry and receipt surfaces,
3. replay instructions should reconstruct:
   - registry-role closure,
   - receipt closure,
   - report closure,
   - and family-proof closure,
4. alias/projection consistency should be replay-visible,
5. and replay for this family should stop depending on a mixed static-plus-verification closure step.

This does not yet require the final V16 replay recipe.
It does require rejecting the current weaker posture where:
- artifact digests imply one family shape,
- witness refs imply another,
- and replay instructions still prove a broader mixed domain than the family claims.

### 8.16 Current drafting boundary

The family is still not fully formalized.

What it now does have is:

1. a first normalized case on stage-domain purity,
2. a second normalized case on artifact-role closure,
3. a provisional artifact determination rule,
4. and an initial witness-materialization and replay direction.

### 8.17 Preferred expected/realized/family closure design

SCA now has enough structure to adopt the same canonical precision grammar as the prior families.

V16 should provisionally distinguish three object layers:

1. expected truth layer
   Owns:
   - the canonical static stage domain,
   - abstract-to-concrete stage mappings,
   - allowed receipt kinds,
   - primary-versus-alias artifact roles.

2. realized truth layer
   Owns:
   - the actual emitted registry surface,
   - any alias/projection registry surfaces,
   - the receipt log,
   - the static report,
   - and the family proof for the run.

3. family closure layer
   Owns:
   - stage-domain closure,
   - receipt-domain closure,
   - registry-role closure,
   - witness-materialization closure,
   - replay closure,
   - and test closure.

This is the right current stopping point for SCA because it turns the family into a complete V16 drafting unit:
- expected truth,
- realized truth,
- and family closure

are now all named, even though implementation remains deferred.

### 8.18 Provisional member coverage

The current provisional member-coverage reading for `static-code-analysis` is:

1. deterministic parser
   Realized through benchmark-parser provenance, receipts, and registry surfaces.
   Current debt: abstract provenance ids and concrete receipt stage ids are not yet closed by an explicit canonical mapping surface.

2. repo-context
   Realized through repo-context extraction provenance, receipts, and registry surfaces.
   Current debt: abstract provenance ids and concrete receipt stage ids are not yet closed by an explicit canonical mapping surface.

3. content-unit
   Realized through content-unit extraction receipts and registry surfaces.
   Current debt: the family still does not isolate content-unit closure inside a clean static-only stage domain.

4. measurement stages
   Realized through asset-measurement receipts, static report, and static proof.
   Current debt: the report/proof domain still absorbs `verification.*` receipts, so measurement-stage closure is not yet family-pure.

## 9. Verification-decisions initial V16 reading

This is the next proof family opened after SCA.

The first VD pass remains narrow on purpose.
The immediate problem is not yet a full family rewrite.
It is whether the family is complete and explicit about use-tier consequence.

### 9.1 V15 family reading

V15 defines `verification-decisions` as:
- issuance,
- provenance,
- sufficiency,
- issuer-policy,
- and use-tier consequence

surfaces being receipt-backed.

V15 also separately requires:
- use tiers remain downstream of verification rather than ad hoc labels,
- and evaluator or inference outputs may support verification explanation but must not directly assign final use tier.

That means the family is not only about four verification checks.
It is also about the deterministic consequence path from those checks into use tier.

### 9.2 First normalized case: use-tier consequence closure and family completeness

The first case for VD is use-tier consequence closure.

Current source already shows that:
- `decideCandidateUseTier(...)` derives a candidate tier from verification outputs,
- `upgradeToSettlementEligible(...)` refines that tier using verification outputs,
- `buildVerificationDecisionReceipts(...)` records `finalUseTier`,
- `buildVerificationReport(...)` records `useTier` and downstream `rights`,
- and `buildVerificationReceiptsArtifact(...)` emits rich decision surfaces carrying `useTier` and `finalUseTier`.

But current report vocabulary still lists only four verification families:
- `issuance`
- `provenance`
- `sufficiency`
- `issuer-policy`

So the family already carries use-tier consequence truth without naming that fifth family member explicitly.

### 9.3 Initial parity reading for this case

For this case, the V16 parity reading is:

1. use-tier consequence must be a first-class member of the family rather than an implied side-effect,

2. verification-derived `useTier` must stay visibly downstream of the verification checks,

3. branch-mode rights should be represented as downstream system consequence rather than silently merged into verification-family truth,

4. and report-level consequence surfaces should be replay-visible, not just receipt-level checks.

### 9.4 Early implementation implication

Current source suggests that V16 will likely need to distinguish at least:

1. verification-check truth
   Issuance, provenance, sufficiency, and issuer-policy checks plus their receipts.

2. verification-decision truth
   The decision surface that combines claimed evidence, measured evidence, policy restrictions, receipt refs, and final use tier.

3. consequence truth
   The verification-derived `useTier` and any downstream branch-mode rights that are computed from it.

4. family closure truth
   Whether all required verification decision surfaces are represented, receipt-backed, replayable, and mutually coherent.

Without that separation, the family can keep recording the right information while still undernaming its own closure surface.

### 9.5 Provisional V16 canonical structures for this first case

The first case already justifies a minimal provisional family shape.

```ts
type VerificationDecisionContractV16 = {
  proofFamily: 'verification-decisions'
  expectedDecisionFamilies: Array<
    | 'issuance'
    | 'provenance'
    | 'sufficiency'
    | 'issuer-policy'
    | 'use-tier-consequence'
  >
}
```

```ts
type VerificationDecisionCaseV16 = {
  assetId: string
  coveredDecisionFamilies: string[]
  receiptStageIds: string[]
  useTier: string
  finalUseTier: string
  useTierDerivedFromVerification: boolean
  branchRightsDerivedDownstream: boolean
  decisionSurfaceClosed: boolean
  receiptClosureClosed: boolean
}
```

```ts
type VerificationDecisionsFamilyProofV16 = {
  proofFamily: 'verification-decisions'
  contract: VerificationDecisionContractV16
  decisionCases: VerificationDecisionCaseV16[]
  coveredDecisionFamilies: string[]
  familyCoverageClosed: boolean
  useTierConsequenceClosed: boolean
  witnessMaterializationClosed: boolean
  replayClosureClosed: boolean
  testClosureClosed: boolean
  allCasesPassed: boolean
  proofHash: string
}
```

These structures are still provisional.
They are justified now because the family already needs a place to represent:
- the fifth use-tier consequence member,
- the distinction between verification-derived tier and downstream rights,
- and family coverage beyond receipt ids only.

### 9.6 Current drafting boundary

This does not yet complete verification-decisions formalization.

What it does complete is the first family-specific V16 question for this area:
- whether VD explicitly owns the use-tier consequence surface it already carries in runtime truth,
- or whether that fifth family member remains undernamed and underproved.

### 9.7 Second normalized case: decision-stage mapping and artifact-role closure

The next case for VD is decision-stage mapping and artifact-role closure.

Current source already shows that the family emits two distinct family artifacts:
- `.engi/verification-receipts.json`
- `.engi/verification-report.json`

and also realizes five concrete verification receipt stages:
- `verification.determinisms.v15`
- `verification.issuance-checks.v15`
- `verification.provenance-checks.v15`
- `verification.sufficiency-checks.v15`
- `verification.issuer-policy-checks.v15`

But the family does not yet make the mapping or role split canonical enough.

In particular:
- report vocabulary still names only four families,
- the fifth use-tier-consequence member is likely embodied by `verification.determinisms.v15`,
- receipts artifact owns raw receipts and decision surfaces,
- report owns report-facing consequence summaries and rights,
- and witness/replay layers still flatten much of that structure away.

### 9.8 Initial parity reading for this second case

For this case, the V16 parity reading is:

1. the family's five decision members should map explicitly to concrete verification stages,

2. the use-tier-consequence stage should be named canonically rather than remaining inferential,

3. `verification-receipts.json` and `verification-report.json` should be role-distinguished rather than treated as redundant verification surfaces,

4. and witness/replay closure should reflect those role differences.

### 9.9 Early implementation implication

Current source suggests that V16 will likely need at least the following role split:

1. receipts artifact
   Owns raw verification receipts and rich per-asset decision surfaces.

2. report artifact
   Owns report-facing per-asset summaries, top-level family summary vocabulary, `useTier`, and branch-mode consequence summaries.

3. family closure object
   Owns decision-family coverage, stage mapping, consequence closure, witness closure, and replay closure.

Without that split, the family can keep emitting the right information while still underdescribing what each artifact proves.

### 9.10 Provisional artifact direction

Under the current first-pass reading, V16 should provisionally treat the family's artifact set as follows:

1. primary receipt and decision-surface artifact
   `.engi/verification-receipts.json`

2. primary report and consequence-summary artifact
   `.engi/verification-report.json`

3. likely future first-class family artifacts when family closure becomes more explicit
   - `.engi/verification-decisions-proof.json`
   - `.engi/verification-decision-contract.json`

This remains provisional.
The important V16 move is not the final filename list.
It is that the family stops treating:
- receipt stages,
- decision surfaces,
- report summaries,
- and consequence truth

as though they were one undifferentiated verification layer.

### 9.11 Provisional witness-materialization and replay direction

The current family work now supports a first replay/witness direction as well.

V16 should provisionally prefer the following posture:

1. witness refs should not flatten the family to receipt ids only,
2. replay artifacts should include both verification family artifacts,
3. replay instructions should reconstruct:
   - verification-stage closure,
   - decision-surface closure,
   - use-tier consequence closure,
   - and report-level coherence,
4. and verification-family replay should remain distinct from ranking logic and later branch-materialization consequences.

### 9.12 Preferred expected/realized/family closure design

VD now has enough structure to adopt the same canonical precision grammar as the prior families.

V16 should provisionally distinguish three object layers:

1. expected truth layer
   Owns:
   - expected decision-family membership,
   - decision-family to receipt-stage mapping,
   - consequence ownership rules,
   - report-versus-receipt artifact roles.

2. realized truth layer
   Owns:
   - emitted receipt artifact,
   - emitted report artifact,
   - per-asset decision surfaces,
   - concrete receipt stages,
   - verification-derived `useTier`,
   - downstream rights surfaces.

3. family closure layer
   Owns:
   - family-membership closure,
   - decision-stage mapping closure,
   - use-tier consequence closure,
   - artifact-role closure,
   - witness-materialization closure,
   - replay closure,
   - test closure.

### 9.13 Current drafting boundary

VD is still not fully formalized.

What it now does have is:

1. a first normalized case on use-tier consequence closure,
2. a second normalized case on decision-stage mapping and artifact-role closure,
3. a provisional artifact direction,
4. an initial witness-materialization and replay direction,
5. and an expected/realized/family-closure split.

### 9.14 Provisional member coverage

The current provisional member-coverage reading for `verification-decisions` is:

1. `issuance`
   Realized through issuance-stage receipts, decision surfaces, and report entries.
   Current debt: family-stage mapping and witness/replay closure are still too receipt-flattened.

2. `provenance`
   Realized through provenance-stage receipts, decision surfaces, and report entries.
   Current debt: family-stage mapping and witness/replay closure are still too receipt-flattened.

3. `sufficiency`
   Realized through sufficiency-stage receipts, decision surfaces, and report entries.
   Current debt: family-stage mapping and witness/replay closure are still too receipt-flattened.

4. `issuer-policy`
   Realized through issuer-policy-stage receipts, decision surfaces, and report entries.
   Current debt: family-stage mapping and witness/replay closure are still too receipt-flattened.

5. `use-tier-consequence`
   Realized in runtime through `verification.determinisms.v15`, `useTier`, `finalUseTier`, and downstream rights.
   Current debt: this family member remains undernamed in report vocabulary and underrepresented in witness/replay closure.

## 10. Selection-and-materialization initial V16 reading

This is the next proof family opened after VD.

The first SAM pass remains narrow on purpose.
The immediate problem is not yet a full family rewrite.
It is whether the family is materializing and replaying its own primary consistency proof directly enough.

### 10.1 V15 family reading

V15 defines `selection-and-materialization` as:
- selected assets,
- locked units,
- materialized source,
- exclusions,
- and visibility rules

being mutually consistent.

V15 also separately gives `SelectionConsistencyProof` a first-class canonical structure.

That means the family is not only about a collection of related artifacts.
It is also about a primary proof object that closes selected assets, lock closure, materialized source closure, and settlement-eligibility consequences together.

### 10.2 First normalized case: selection-consistency proof materialization and family completeness

The first case for SAM is selection-consistency proof materialization.

Current source already shows that:
- `buildSelectionConsistencyProof(...)` computes a distinct proof object with its own `proofHash`,
- witness refs include that proof hash,
- the system proof bundle carries the full object,
- but branch artifacts do not emit a dedicated selection-consistency proof path,
- deliverables do not enumerate one,
- and replay does not include one.

So the family already has a primary proof object that remains under-materialized relative to V15 precision.

### 10.3 Initial parity reading for this case

For this case, the V16 parity reading is:

1. if V15 already gives `SelectionConsistencyProof` a first-class structure, the family should not keep it as a mostly bundle-only surface,

2. witness paths should name the primary family proof surface directly rather than only carrying its hash,

3. replay should include the direct surfaces needed to reconstruct that proof,

4. and deliverables should reflect the same family shape as witness and replay layers.

### 10.4 Early implementation implication

Current source suggests that V16 will likely need to distinguish at least:

1. primary consistency-proof truth
   The family proof that closes selected assets, lock, materialized source, and settlement-consumption consequences.

2. direct input truth
   The lock artifact and the selected-source-material artifact that the primary proof closes over.

3. supporting proof truth
   Exclusions, visibility, and aggregate materialization proofs.

4. family closure truth
   Whether all of those surfaces are emitted, coherent, replayable, and test-ratcheted.

Without that separation, the family can keep looking materially complete while still hiding its primary proof object inside the bundle layer.

### 10.5 Provisional V16 canonical structures for this first case

The first case already justifies a minimal provisional family shape.

```ts
type SelectionMaterializationContractV16 = {
  proofFamily: 'selection-and-materialization'
  requiredPrimaryArtifacts: string[]
  requiredSupportingArtifacts: string[]
}
```

```ts
type SelectionMaterializationCaseV16 = {
  assetPackId: string
  branchMode: 'context' | 'patch'
  selectionConsistencyArtifactPresent: boolean
  lockSourceClosureClosed: boolean
  exclusionsClosureClosed: boolean
  visibilityClosureClosed: boolean
  settlementConsumptionClosed: boolean
  witnessClosureClosed: boolean
  replayClosureClosed: boolean
}
```

```ts
type SelectionMaterializationFamilyProofV16 = {
  proofFamily: 'selection-and-materialization'
  contract: SelectionMaterializationContractV16
  cases: SelectionMaterializationCaseV16[]
  familyCoverageClosed: boolean
  primaryProofMaterializationClosed: boolean
  artifactRoleClosureClosed: boolean
  witnessMaterializationClosed: boolean
  replayClosureClosed: boolean
  testClosureClosed: boolean
  allCasesPassed: boolean
  proofHash: string
}
```

These structures are still provisional.
They are justified now because the family already needs a place to represent:
- the missing dedicated selection-consistency artifact,
- the direct family inputs it closes over,
- and the family-level closure verdict around those surfaces.

### 10.6 Current drafting boundary

This does not yet complete selection-and-materialization formalization.

What it does complete is the first family-specific V16 question for this area:
- whether the family's primary consistency proof is treated as a first-class family surface,
- or whether it remains under-materialized relative to V15 precision.

### 10.7 Second normalized case: lock/source/exclusion/visibility role closure

The next case for SAM is role closure across the family's major surfaces.

Current source already shows that the family emits multiple non-redundant surfaces:
- `.engi/asset-pack.lock.json`
- `.engi/selected-source-material.json`
- `.engi/materialization-exclusions.json`
- `.engi/materialization-visibility-proof.json`
- `.engi/materialization-proof.json`
- and the current bundle-only `selectionConsistencyProof`

The family therefore needs a canonical rule for what each of those surfaces is for.

### 10.8 Initial parity reading for this second case

For this case, the V16 parity reading is:

1. lock truth, realized selected-source-material truth, exclusion truth, visibility truth, aggregate materialization truth, and selection-consistency truth should be treated as distinct family roles,

2. branch-mode and settlement consequences should be explicit rather than implicit,

3. aggregate proofs should not erase the primacy of lock and selected-source-material surfaces,

4. and witness/replay closure should preserve those role distinctions.

### 10.9 Early implementation implication

Current source suggests that V16 will likely need at least the following role split:

1. lock artifact
   Owns locked assets, locked units, accepted use tiers, and source-selection roots.

2. selected-source-material artifact
   Owns realized source-material entries, selected units, and selected-asset rights in branch context.

3. exclusions artifact
   Owns excluded assets, exclusion classes, exclusion reasons, and excluded-asset consequences.

4. visibility-proof artifact
   Owns selected/materialized set closure and no-private-leak-into-public-projection closure.

5. materialization-proof artifact
   Owns aggregate materialization closure and refs to visibility/exclusion surfaces.

6. selection-consistency proof artifact
   Owns selected-vs-lock-vs-settlement closure.

### 10.10 Provisional artifact direction

Under the current first-pass reading, V16 should provisionally treat the family's artifact set as follows:

1. primary family artifacts
   - `.engi/asset-pack.lock.json`
   - `.engi/selected-source-material.json`
   - `.engi/materialization-proof.json`
   - `.engi/materialization-exclusions.json`
   - `.engi/materialization-visibility-proof.json`
   - `.engi/selection-consistency-proof.json`

2. family-adjacent but not family-defining
   - `.engi/match-report.json`

This remains provisional.
The important V16 move is that the family stops treating:
- lock,
- selected-source-material,
- exclusions,
- visibility,
- aggregate materialization,
- and selection-consistency

as though they were one undifferentiated materialization layer.

### 10.11 Provisional witness-materialization and replay direction

The current family work now supports a first replay/witness direction as well.

V16 should provisionally prefer the following posture:

1. witness artifact paths should include all primary family surfaces,
2. replay artifacts should include lock, selected-source-material, exclusions, visibility, aggregate materialization, and selection-consistency surfaces,
3. replay instructions should reconstruct:
   - selection-consistency closure,
   - lock/source closure,
   - exclusion closure,
   - visibility closure,
   - and settlement/materialization consequence closure,
4. and family replay should remain distinct from later settlement proof even where both touch the lock.

### 10.12 Preferred expected/realized/family closure design

SAM now has enough structure to adopt the same canonical precision grammar as the prior families.

V16 should provisionally distinguish three object layers:

1. expected truth layer
   Owns:
   - required primary family surfaces,
   - artifact-role definitions,
   - branch-mode consequence rules,
   - settlement-consumption rules,
   - visibility-boundary rules.

2. realized truth layer
   Owns:
   - emitted lock artifact,
   - emitted selected-source-material artifact,
   - emitted exclusions artifact,
   - emitted visibility proof,
   - emitted aggregate materialization proof,
   - emitted selection-consistency proof,
   - concrete selected/excluded/settlement-participant consequences.

3. family closure layer
   Owns:
   - selection-consistency closure,
   - lock/source closure,
   - exclusion closure,
   - visibility closure,
   - branch-mode consequence closure,
   - settlement-consumption closure,
   - witness-materialization closure,
   - replay closure,
   - test closure.

### 10.13 Current drafting boundary

SAM is still not fully formalized.

What it now does have is:

1. a first normalized case on primary proof materialization,
2. a second normalized case on lock/source/exclusion/visibility role closure,
3. a provisional artifact direction,
4. an initial witness-materialization and replay direction,
5. and an expected/realized/family-closure split.

### 10.14 Provisional member coverage

The current provisional member-coverage reading for `selection-and-materialization` is:

1. selected assets
   Realized through asset-pack selection surfaces, selection-consistency proof, and aggregate materialization proof.
   Current debt: selected-asset closure is still under-materialized because the primary selection-consistency proof lacks its own first-class artifact.

2. locked units
   Realized through `.engi/asset-pack.lock.json` plus visibility and selection-consistency closure.
   Current debt: replay still omits the lock surface even though the family closes back to it directly.

3. materialized source
   Realized through `.engi/selected-source-material.json` plus selection-consistency and materialization proof closure.
   Current debt: source-manifest closure remains underreplayed and underwitnessed relative to its family importance.

4. exclusions
   Realized through `.engi/materialization-exclusions.json`.
   Current debt: exclusions remain explicit, but witness/replay closure still flattens them into broader materialization closure too often.

5. visibility rules
   Realized through `.engi/materialization-visibility-proof.json`.
   Current debt: replay still omits the visibility surface and the family has not yet made that omission fail closure directly.

## 11. Authorization-and-sensitive-flow initial V16 reading

This is the next proof family opened after SAM.

The first AASF pass remains narrow on purpose.
The immediate problem is not yet a full family rewrite.
It is whether the family is materially complete about principal binding, authorization, and sensitive-data-flow closure.

### 11.1 V15 family reading

V15 defines `authorization-and-sensitive-flow` as:
- principals,
- authorization decisions,
- confidentiality classes,
- retention/disclosure rules,
- and sensitive-data flows

being explicit and policy-backed.

V15 also separately requires:
- buyer principal, GitHub installation/session bindings, signer bindings, and branch/proof/settlement authorities are explicit,
- authorization decisions are policy-backed,
- and classification/retention/disclosure-policy truth remains explicit before later disclosure-boundary proves public boundedness.

That means the family is not only about authorization decisions.
It is also about principal/binding truth and sensitive-data-flow policy truth.

### 11.2 First normalized case: identity-bindings materialization and family completeness

The first case for AASF is identity-bindings materialization and family completeness.

Current source already shows that:
- `buildIdentityAuthorizationProof(...)` is computed directly from `bindings` and `authorizationDecisions`,
- `.engi/identity-bindings.json` is a required branch artifact and deliverable,
- `.engi/authorization-decisions.json` and `.engi/sensitive-data-flow.json` are also required branch artifacts,
- and the witness manifest digests all three family surfaces,

but current family witness artifact paths still omit `.engi/identity-bindings.json`.

### 11.3 Initial parity reading for this case

For this case, the V16 parity reading is:

1. principal/binding truth must be a first-class family surface rather than an implied proof input,
2. family completeness must fail if identity bindings disappear while authorization decisions remain,
3. proof hashes must not stand in for missing binding surfaces,
4. and replay must reconstruct principal-binding closure directly.

### 11.4 Early implementation implication

Current source suggests that V16 will likely need to distinguish at least:

1. principal and binding truth
   Buyer, issuer, GitHub installation, signer, and related binding surfaces.

2. authorization-decision truth
   State-changing and access decision surfaces plus policy-backed allow/deny truth.

3. sensitive-data-flow truth
   Data classification, retention policy, disclosure policy, and flow-record closure.

4. family closure truth
   Whether all required family surfaces are represented, role-distinguished, replayable, and mutually coherent.

Without that separation, the family can keep recording the right information while still undernaming its own closure path.

### 11.5 Provisional V16 canonical structures for this family

```ts
type AuthorizationSensitiveFlowContractV16 = {
  proofFamily: 'authorization-and-sensitive-flow'
  expectedMembers: Array<
    | 'principals'
    | 'authorization-decisions'
    | 'confidentiality-classes'
    | 'retention-disclosure-rules'
    | 'sensitive-data-flows'
  >
}
```

```ts
type AuthorizationSensitiveFlowCaseV16 = {
  memberId: string
  primaryArtifactPaths: string[]
  roleKind: 'identity-binding' | 'authorization' | 'sensitive-flow-policy'
  witnessClosed: boolean
  replayClosed: boolean
  notes?: string
}
```

```ts
type AuthorizationSensitiveFlowFamilyProofV16 = {
  proofFamily: 'authorization-and-sensitive-flow'
  contract: AuthorizationSensitiveFlowContractV16
  memberCases: AuthorizationSensitiveFlowCaseV16[]
  familyCoverageClosed: boolean
  roleClosureClosed: boolean
  witnessMaterializationClosed: boolean
  replayClosureClosed: boolean
  testClosureClosed: boolean
  allCasesPassed: boolean
  proofHash: string
}
```

These structures are still provisional.
They are justified now because the family already needs a place to represent:
- principal-binding completeness,
- authorization-decision completeness,
- sensitive-data-flow policy completeness,
- and family coverage beyond two proof hashes only.

### 11.6 Second normalized case: identity/authorization versus sensitive-flow role closure

The next case for AASF is role closure between identity/authorization truth and sensitive-data-flow truth.

Current source already shows that:
- `IdentityAuthorizationProof` owns principal binding, authorization, addressing, signing, and auth-root closure,
- `SensitiveDataFlowProof` owns classification, retention/disclosure-policy assignment, and public-disclosure denial,
- `.engi/identity-bindings.json`, `.engi/authorization-decisions.json`, and `.engi/sensitive-data-flow.json` are separate artifacts,
- and later disclosure-boundary carries public projection boundedness rather than this family's internal policy-assignment truth.

So the family already carries multiple distinct policy surfaces and needs to say so canonically.

### 11.7 Provisional artifact direction

Under the current first-pass reading, V16 should provisionally treat the family's artifact set as follows:

1. primary principal and binding artifact
   `.engi/identity-bindings.json`

2. primary authorization-decision artifact
   `.engi/authorization-decisions.json`

3. primary sensitive-data-flow artifact
   `.engi/sensitive-data-flow.json`

4. likely future first-class family artifacts when family closure becomes more explicit
   - `.engi/identity-authorization-proof.json`
   - `.engi/sensitive-data-flow-proof.json`

The important V16 move is not the final filename list.
It is that the family stops treating:
- principal bindings,
- authorization decisions,
- and sensitive-data-flow policy truth

as though they were one undifferentiated private-proof layer.

### 11.8 Provisional witness-materialization and replay direction

The current family work now supports a first replay/witness direction as well.

V16 should provisionally prefer the following posture:

1. witness artifact paths should include all three primary family artifacts,
2. replay artifacts should include all three primary family artifacts,
3. replay instructions should reconstruct:
   - principal-binding closure,
   - authorization-decision closure,
   - classification/retention/disclosure-policy closure,
   - and sensitive-data-flow closure,
4. and family replay should remain distinct from later disclosure-boundary closure.

### 11.9 Preferred expected/realized/family closure design

AASF now has enough structure to adopt the same canonical precision grammar as the prior families.

V16 should provisionally distinguish three object layers:

1. expected truth layer
   Owns:
   - expected principal and binding surfaces,
   - authorization-decision ownership rules,
   - classification/retention/disclosure-policy ownership rules,
   - family versus disclosure-boundary handoff rules.

2. realized truth layer
   Owns:
   - emitted identity-bindings artifact,
   - emitted authorization-decisions artifact,
   - emitted sensitive-data-flow artifact,
   - computed identity-authorization proof,
   - computed sensitive-data-flow proof.

3. family closure layer
   Owns:
   - principal-binding closure,
   - authorization-decision closure,
   - classification closure,
   - retention/disclosure-policy assignment closure,
   - sensitive-data-flow closure,
   - artifact-role closure,
   - witness-materialization closure,
   - replay closure,
   - test closure.

### 11.10 Provisional member coverage

The current provisional member-coverage reading is:

1. principals
   Realized through identity bindings and identity-authorization proof.

2. authorization decisions
   Realized through `.engi/authorization-decisions.json` and identity-authorization proof.

3. confidentiality classes
   Realized through sensitive-data-flow records and policy release classification surfaces.

4. retention/disclosure rules
   Realized through retention-policy and disclosure-policy ids on sensitive-data-flow records.

5. sensitive-data flows
   Realized through `.engi/sensitive-data-flow.json` and `SensitiveDataFlowProof`.

### 11.11 Current drafting boundary

AASF is still not fully formalized.

What it now does have is:

1. a first normalized case on identity-binding materialization,
2. a second normalized case on identity-versus-sensitive-flow role closure,
3. a provisional artifact direction,
4. an initial witness-materialization and replay direction,
5. an expected/realized/family-closure split,
6. and a provisional member-coverage inventory.

## 12. Settlement-source-to-shares initial V16 reading

This is the next proof family opened after AASF.

The first SSTS pass remains narrow on purpose.
The immediate problem is not yet a full settlement rewrite.
It is whether the family is materially complete about journal closure, theorem closure, and the rest of the settlement artifact role split.

### 12.1 V15 family reading

V15 defines `settlement-source-to-shares` as:
- contribution,
- clipping,
- normalization,
- participation,
- allocation,
- journal,
- and settlement proof

surfaces closing exactly.

V15 also separately requires:
- source-to-shares derivation is replayable,
- clipping and tie-breaks are stable,
- allocation is conserved,
- debits equal credits,
- state roots remain coherent,
- and zero-credit participants are explicit where present.

That means the family is not only about one settlement proof artifact.
It is about the full path from marginal contribution through exact journal and theorem closure.

### 12.2 First normalized case: settlement-proof versus journal-completeness witness closure

The first case for SSTS is settlement-proof versus journal-completeness witness closure.

Current source already shows that:
- `JournalCompletenessProof` proves journal reason coverage, receipt closure, event consistency, and exact after-balance recomputation,
- `SettlementProof` proves theorem checks such as normalization, allocation conservation, debit-credit equality, non-negative balances, reference closure, and state-root integrity,
- `.engi/settlement-proof.json` is a required branch artifact,
- but there is no dedicated branch artifact for journal completeness and family witness refs still omit `settlementProof.proofHash`.

### 12.3 Initial parity reading for this case

For this case, the V16 parity reading is:

1. journal closure and settlement theorem closure must be explicit family subpaths,
2. witness refs should align with named witness artifacts,
3. journal-completeness materialization should become explicit by artifact or sanctioned witness structure,
4. and replay must reconstruct journal closure and theorem closure separately.

### 12.4 Early implementation implication

Current source suggests that V16 will likely need to distinguish at least:

1. source-to-shares truth
   Contribution, clipping, normalization, and raw-share replay surfaces.

2. participation truth
   Selected, settlement-participating, credited, zero-credit, and excluded-from-settlement surfaces.

3. exact-allocation and journal truth
   Accounting precision and ledger-entry/balance surfaces.

4. settlement theorem truth
   The theorem-bearing settlement proof path.

5. family closure truth
   Whether all required settlement surfaces are role-distinguished, replayable, and mutually coherent.

### 12.5 Provisional V16 canonical structures for this family

```ts
type SettlementSourceToSharesContractV16 = {
  proofFamily: 'settlement-source-to-shares'
  expectedMembers: Array<
    | 'contribution'
    | 'clipping'
    | 'normalization'
    | 'participation'
    | 'allocation'
    | 'journal'
    | 'settlement-proof'
  >
}
```

```ts
type SettlementSourceToSharesCaseV16 = {
  memberId: string
  primaryArtifactPaths: string[]
  roleKind: 'source-to-shares' | 'participation' | 'allocation-journal' | 'theorem-proof'
  witnessClosed: boolean
  replayClosed: boolean
  notes?: string
}
```

```ts
type SettlementSourceToSharesFamilyProofV16 = {
  proofFamily: 'settlement-source-to-shares'
  contract: SettlementSourceToSharesContractV16
  memberCases: SettlementSourceToSharesCaseV16[]
  familyCoverageClosed: boolean
  roleClosureClosed: boolean
  witnessMaterializationClosed: boolean
  replayClosureClosed: boolean
  testClosureClosed: boolean
  allCasesPassed: boolean
  proofHash: string
}
```

### 12.6 Second normalized case: source-to-shares/participation/accounting/journal role closure

The next case for SSTS is artifact-role closure across the rest of the family.

Current source already shows that:
- `.engi/source-to-shares.json` owns contribution, clipping receipts, normalization trace, and raw shares,
- `.engi/settlement-participation.json` owns selected-versus-participating-versus-credited records,
- `.engi/accounting-precision-report.json` owns exact-allocation precision summaries,
- `.engi/journal-diff.json` owns ledger entries and balances,
- `.engi/settlement-proof.json` owns theorem closure.

So the family already materializes non-redundant settlement surfaces and needs to say so canonically.

### 12.7 Provisional artifact direction

Under the current first-pass reading, V16 should provisionally treat the family's artifact set as follows:

1. primary contribution/clipping/normalization artifact
   `.engi/source-to-shares.json`

2. primary participation artifact
   `.engi/settlement-participation.json`

3. primary exact-allocation and journal artifacts
   - `.engi/accounting-precision-report.json`
   - `.engi/journal-diff.json`

4. primary theorem-bearing artifact
   `.engi/settlement-proof.json`

5. likely future first-class family artifacts when family closure becomes more explicit
   - `.engi/journal-completeness-proof.json`
   - `.engi/settlement-source-to-shares-proof.json`

### 12.8 Provisional witness-materialization and replay direction

The current family work now supports a first replay/witness direction as well.

V16 should provisionally prefer the following posture:

1. witness refs should represent settlement-theorem closure as well as journal closure,
2. replay artifacts should include all primary family artifacts,
3. replay instructions should reconstruct:
   - contribution/clipping/normalization closure,
   - participation closure,
   - exact-allocation closure,
   - journal closure,
   - and settlement theorem closure,
4. and family replay should remain distinct from later proof-contract bundle closure.

### 12.9 Preferred expected/realized/family closure design

SSTS now has enough structure to adopt the same canonical precision grammar as the prior families.

V16 should provisionally distinguish three object layers:

1. expected truth layer
   Owns:
   - expected contribution/clipping/normalization surfaces,
   - participation rules,
   - exact-allocation and journal rules,
   - theorem-bearing settlement proof rules,
   - artifact-role definitions.

2. realized truth layer
   Owns:
   - emitted source-to-shares artifact,
   - emitted settlement-participation artifact,
   - emitted accounting-precision artifact,
   - emitted journal-diff artifact,
   - emitted settlement-proof artifact,
   - computed journal-completeness proof.

3. family closure layer
   Owns:
   - contribution/clipping/normalization closure,
   - participation closure,
   - exact-allocation closure,
   - journal closure,
   - settlement theorem closure,
   - artifact-role closure,
   - witness-materialization closure,
   - replay closure,
   - test closure.

### 12.10 Provisional member coverage

The current provisional member-coverage reading is:

1. contribution
   Realized through source contribution entries in `.engi/source-to-shares.json`.

2. clipping
   Realized through clipping receipts and marginal-contribution replay structures.

3. normalization
   Realized through basis-point normalization and raw shares in `.engi/source-to-shares.json`.

4. participation
   Realized through `.engi/settlement-participation.json`.

5. allocation
   Realized through exact micro-unit allocation in accounting precision plus journal diff.

6. journal
   Realized through `.engi/journal-diff.json` and `JournalCompletenessProof`.

7. settlement proof
   Realized through `.engi/settlement-proof.json` and `SettlementProof`.

### 12.11 Current drafting boundary

SSTS is still not fully formalized.

What it now does have is:

1. a first normalized case on settlement-proof versus journal-completeness closure,
2. a second normalized case on the rest of the settlement role split,
3. a provisional artifact direction,
4. an initial witness-materialization and replay direction,
5. an expected/realized/family-closure split,
6. and a provisional member-coverage inventory.

## 13. Disclosure-boundary initial V16 reading

This is the next proof family opened after SSTS.

The first disclosure pass remains narrow on purpose.
The immediate problem is not yet a full disclosure rewrite.
It is whether the family is materially complete about bounded-public proof and the rest of the disclosure role split.

### 13.1 V15 family reading

V15 defines `disclosure-boundary` as:
- projection policy,
- bounded-public proof,
- redaction proof,
- and disclosure proof

agreeing and remaining bounded.

V15 also separately requires:
- only allowed artifacts are public,
- private artifacts do not leak into public projection,
- bounded public proof is metadata-bounded,
- and redaction/disclosure proofs agree with policy release.

That means the family is not only about the final disclosure verdict.
It is also about policy, bounded public proof, and proof-of-application closure.

### 13.2 First normalized case: bounded-public-proof materialization and family completeness

The first case for disclosure-boundary is bounded-public-proof materialization and family completeness.

Current source already shows that:
- `.engi/bounded-public-proof.json` is a required branch artifact and deliverable,
- redaction proof and disclosure proof both hash back to the bounded-public proof,
- projection policy is a separate emitted artifact,
- but family witness artifact paths still omit `.engi/bounded-public-proof.json`.

### 13.3 Initial parity reading for this case

For this case, the V16 parity reading is:

1. bounded-public proof must be a first-class family member rather than an indirect hash anchor only,
2. family completeness must fail if bounded-public proof disappears while redaction/disclosure remain,
3. witness artifact paths should reflect explicit family membership,
4. and replay must reconstruct bounded-public closure directly.

### 13.4 Early implementation implication

Current source suggests that V16 will likely need to distinguish at least:

1. projection-policy truth
   Principal visibility rules and public/private artifact rules.

2. bounded-public proof truth
   The metadata-bounded public proof surface.

3. redaction truth
   Redacted artifacts, source-material paths, and bounded-public-proof binding.

4. disclosure-proof truth
   Allowed/denied public paths and boundedness verdict.

5. family closure truth
   Whether all four member surfaces are represented, replayable, and mutually coherent.

### 13.5 Provisional V16 canonical structures for this family

```ts
type DisclosureBoundaryContractV16 = {
  proofFamily: 'disclosure-boundary'
  expectedMembers: Array<
    | 'projection-policy'
    | 'bounded-public-proof'
    | 'redaction-proof'
    | 'disclosure-proof'
  >
}
```

```ts
type DisclosureBoundaryCaseV16 = {
  memberId: string
  primaryArtifactPaths: string[]
  roleKind: 'policy' | 'bounded-public' | 'redaction' | 'disclosure'
  witnessClosed: boolean
  replayClosed: boolean
  notes?: string
}
```

```ts
type DisclosureBoundaryFamilyProofV16 = {
  proofFamily: 'disclosure-boundary'
  contract: DisclosureBoundaryContractV16
  memberCases: DisclosureBoundaryCaseV16[]
  familyCoverageClosed: boolean
  roleClosureClosed: boolean
  witnessMaterializationClosed: boolean
  replayClosureClosed: boolean
  testClosureClosed: boolean
  allCasesPassed: boolean
  proofHash: string
}
```

### 13.6 Second normalized case: projection/bounded-public/redaction/disclosure role closure

The next case for disclosure-boundary is role closure across the four family members.

Current source already shows that:
- `projection-policy.json` owns principals and artifact rules,
- `bounded-public-proof.json` owns metadata-bounded proof summaries,
- `redaction-proof.json` owns redacted artifact/source/latest-run fields,
- `disclosure-proof.json` owns allowed/denied public artifact paths and boundedness confirmation.

So the family already materializes non-redundant disclosure surfaces and needs to say so canonically.

### 13.7 Provisional artifact direction

Under the current first-pass reading, V16 should provisionally treat the family's artifact set as follows:

1. primary policy artifact
   `.engi/projection-policy.json`

2. primary bounded-public artifact
   `.engi/bounded-public-proof.json`

3. primary redaction-application artifact
   `.engi/redaction-proof.json`

4. primary disclosure-verdict artifact
   `.engi/disclosure-proof.json`

5. likely future first-class family artifact when family closure becomes more explicit
   - `.engi/disclosure-boundary-proof.json`

### 13.8 Provisional witness-materialization and replay direction

The current family work now supports a first replay/witness direction as well.

V16 should provisionally prefer the following posture:

1. witness artifact paths should include all four primary family artifacts,
2. replay artifacts should include all four primary family artifacts,
3. replay instructions should reconstruct:
   - projection-policy closure,
   - bounded-public closure,
   - redaction closure,
   - and disclosure closure,
4. and family replay should remain distinct from earlier authorization-family policy-assignment closure.

### 13.9 Preferred expected/realized/family closure design

Disclosure-boundary now has enough structure to adopt the same canonical precision grammar as the prior families.

V16 should provisionally distinguish three object layers:

1. expected truth layer
   Owns:
   - expected policy, bounded-public, redaction, and disclosure surfaces,
   - artifact-role definitions,
   - boundedness rules,
   - family versus authorization-family handoff rules.

2. realized truth layer
   Owns:
   - emitted projection-policy artifact,
   - emitted bounded-public-proof artifact,
   - emitted redaction-proof artifact,
   - emitted disclosure-proof artifact.

3. family closure layer
   Owns:
   - policy closure,
   - bounded-public closure,
   - redaction closure,
   - disclosure closure,
   - artifact-role closure,
   - witness-materialization closure,
   - replay closure,
   - test closure.

### 13.10 Provisional member coverage

The current provisional member-coverage reading is:

1. projection policy
   Realized through `.engi/projection-policy.json`.

2. bounded-public proof
   Realized through `.engi/bounded-public-proof.json`.

3. redaction proof
   Realized through `.engi/redaction-proof.json`.

4. disclosure proof
   Realized through `.engi/disclosure-proof.json`.

### 13.11 Current drafting boundary

Disclosure-boundary is still not fully formalized.

What it now does have is:

1. a first normalized case on bounded-public-proof materialization,
2. a second normalized case on the rest of the disclosure role split,
3. a provisional artifact direction,
4. an initial witness-materialization and replay direction,
5. an expected/realized/family-closure split,
6. and a provisional member-coverage inventory.

## 14. Proof-contract initial V16 reading

This is the next proof family opened after disclosure-boundary.

The first proof-contract pass remains narrow on purpose.
The immediate problem is not yet a complete theorem or appendix rewrite.
It is whether the family materially closes its own contract, bundle, and witness surfaces before V16 goes deeper.

### 14.1 V15 family reading

V15 defines `proof-contract` as:
- the system proof bundle,
- and the proof contract

binding the cross-cutting closure path end to end.

V15 also separately requires:
- theorem-style checks have stable identities and witness bindings,
- the witness manifest answers which proof-relevant artifacts existed and how proof families were represented,
- and indirect reference through `system-proof-bundle.json` not be used to hide missing family-specific witness coverage.

That means the family is not only about a bundle artifact.
It is also about proof contract, evidence-chain, theorem, and witness closure.

### 14.2 First normalized case: proof-contract materialization and bundle-only carriage

The first case for proof-contract is proof-contract materialization and bundle-only carriage.

Current source already shows that:
- `buildProofContract(...)` computes a distinct runtime object with contract id, evidence chain, theorem checks, and artifact bindings,
- `buildSystemProofBundle(...)` embeds `proofContract`,
- `.engi/system-proof-bundle.json` is a required branch artifact,
- but there is no dedicated `.engi/proof-contract.json` artifact and family witness artifact paths name only the bundle.

### 14.3 Initial parity reading for this case

For this case, the V16 parity reading is:

1. proof contract must be a first-class family member rather than a bundle field only,
2. family completeness must fail if the proof contract disappears while the bundle remains,
3. witness artifact paths should represent both contract and bundle truth,
4. and replay must reconstruct proof-contract closure directly.

### 14.4 Early implementation implication

Current source suggests that V16 will likely need to distinguish at least:

1. proof-contract truth
   Contract id, evidence-chain stages, theorem checks, and artifact bindings.

2. system-proof-bundle truth
   Cross-family proof aggregation and replay entrypoint truth.

3. witness-manifest truth
   Artifact digests and family witness closure truth.

4. family closure truth
   Whether contract, bundle, witness manifest, evidence chain, and theorem claims remain mutually coherent.

### 14.5 Provisional V16 canonical structures for this family

```ts
type ProofContractContractV16 = {
  proofFamily: 'proof-contract'
  expectedMembers: Array<
    | 'proof-contract'
    | 'evidence-chain'
    | 'theorem-checks'
    | 'system-proof-bundle'
    | 'witness-manifest-closure'
  >
}
```

```ts
type ProofContractCaseV16 = {
  memberId: string
  primaryArtifactPaths: string[]
  roleKind: 'contract' | 'bundle' | 'witness-manifest' | 'evidence-chain' | 'theorem'
  witnessClosed: boolean
  replayClosed: boolean
  notes?: string
}
```

```ts
type ProofContractFamilyProofV16 = {
  proofFamily: 'proof-contract'
  contract: ProofContractContractV16
  memberCases: ProofContractCaseV16[]
  familyCoverageClosed: boolean
  roleClosureClosed: boolean
  witnessMaterializationClosed: boolean
  replayClosureClosed: boolean
  testClosureClosed: boolean
  allCasesPassed: boolean
  proofHash: string
}
```

### 14.6 Second normalized case: bundle/witness-manifest/evidence-chain role closure

The next case for proof-contract is role closure across the bundle, witness manifest, evidence chain, and theorem checks.

Current source already shows that:
- `proofContract` owns evidence-chain stage claims and theorem checks,
- `systemProofBundle` owns cross-family aggregation plus replay entrypoint,
- `proofWitnessManifest` is a separate required branch artifact,
- but family witness and replay layers still undername those distinctions.

### 14.7 Provisional artifact direction

Under the current first-pass reading, V16 should provisionally treat the family's artifact set as follows:

1. primary aggregation artifact
   `.engi/system-proof-bundle.json`

2. primary witness-closure artifact
   `.engi/proof-witness-manifest.json`

3. mandatory first-class family surface, currently under-materialized
   `.engi/proof-contract.json`

4. likely future first-class family artifact when family closure becomes more explicit
   - `.engi/proof-contract-proof.json`

### 14.8 Provisional witness-materialization and replay direction

The current family work now supports a first replay/witness direction as well.

V16 should provisionally prefer the following posture:

1. witness artifact paths should include the bundle, witness manifest, and proof-contract surface,
2. replay artifacts should include the bundle, witness manifest, and proof-contract surface,
3. replay instructions should reconstruct:
   - proof-contract closure,
   - evidence-chain closure,
   - theorem closure,
   - witness-manifest closure,
   - and bundle coherence closure,
4. and family replay should remain distinct from any one underlying proof family's replay.

### 14.9 Preferred expected/realized/family closure design

Proof-contract now has enough structure to adopt the same canonical precision grammar as the prior families.

V16 should provisionally distinguish three object layers:

1. expected truth layer
   Owns:
   - expected proof-contract surface,
   - expected system-proof-bundle surface,
   - expected witness-manifest surface,
   - evidence-chain rules,
   - theorem-binding rules,
   - artifact-role definitions.

2. realized truth layer
   Owns:
   - realized proof-contract surface,
   - emitted system-proof-bundle artifact,
   - emitted proof-witness-manifest artifact,
   - realized evidence-chain stages,
   - realized theorem checks.

3. family closure layer
   Owns:
   - proof-contract closure,
   - bundle coherence closure,
   - witness-manifest closure,
   - evidence-chain closure,
   - theorem-binding closure,
   - artifact-role closure,
   - witness-materialization closure,
   - replay closure,
   - test closure.

### 14.10 Provisional member coverage

The current provisional member-coverage reading is:

1. proof contract
   Realized in runtime as `proofContract`.

2. evidence chain
   Realized inside `proofContract.evidenceChain`.

3. theorem checks
   Realized inside `proofContract.theoremChecks`.

4. system proof bundle
   Realized through `.engi/system-proof-bundle.json`.

5. witness-manifest closure
   Realized through `.engi/proof-witness-manifest.json`.

### 14.11 Current drafting boundary

Proof-contract is still not fully formalized.

What it now does have is:

1. a first normalized case on proof-contract under-materialization,
2. a second normalized case on bundle versus witness/evidence/theorem role closure,
3. a provisional artifact direction,
4. an initial witness-materialization and replay direction,
5. an expected/realized/family-closure split,
6. and a provisional member-coverage inventory.
