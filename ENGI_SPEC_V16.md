# ENGI Spec V16

## Status

- Scope: current V16 draft fully formalizes `prompt-completeness` and begins first-pass discovery for `inference-synthesis`
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

The second family now opened in this draft is `inference-synthesis`.
That family is still in focused discovery rather than full closure formalization.

This draft therefore does not yet attempt a full-system V16 rewrite.
Its purpose is to make one family precise enough that:
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
- and initial V16 discovery for `inference-synthesis`.

The following are intentionally deferred until `prompt-completeness` and `inference-synthesis` are specified and parity-audited more completely:
- the remaining proof families,
- theorem-family expansion outside prompt-completeness,
- proof appendix generation,
- proof execution/audit orchestration,
- and `_PROVEN_` file generation requirements.

The correct reading is:
- V15 remains active canon,
- V16 is being drafted through proof-family-by-proof-family tightening,
- and this file currently formalizes the target shape for prompt-completeness only.

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
  caseResults: PromptCompletenessCaseResultV16[]
  coverageTotalityClosed: boolean
  parseClosureClosed: boolean
  downstreamConsumerClosureClosed: boolean
  provenanceTruthClosed: boolean
  witnessClosureClosed: boolean
  replayClosureClosed: boolean
  testClosureClosed: boolean
  allCasesPassed: boolean
  proofHash: string
}
```

These objects are the target semantics for V16.
Current source may realize them through adjacent builders or artifact families during migration, but the parity matrix must judge any lag explicitly.

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

### 7.13 Current drafting boundary

This still does not complete inference-synthesis formalization.

What it does complete is the first transition from:
- isolated family defects,
to
- a provisional family target shape that can actually be implemented and parity-audited.
