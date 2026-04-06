# ENGI Spec V16

## Status

- Scope: current V16 draft fully tightens `prompt-completeness` and carries all nine V15 proof families through member closure, theorem catalogs, and theorem-by-theorem closure drafting
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

That wedge has now been pushed across all nine V15 proof families through member closure, theorem catalogs, and theorem-by-theorem closure drafting.
`prompt-completeness` remains the tightest family.
The others are still not final V16 canon, but they now each have:
- family cases,
- realized or provisionally normalized artifact direction,
- witness/replay direction,
- expected/realized/family-closure splits,
- member-coverage inventories,
- and theorem-by-theorem closure readings.

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
- the most complete current V16 family formalization for `prompt-completeness`,
- family-closure drafting for the other eight V15 proof families,
- explicit member-coverage plus member-closure criteria across all nine families,
- theorem-binding plus proof-shape-realization direction across all nine families,
- current realization-basis theorem catalogs plus family-verdict-schema direction across all nine families,
- realized proof-object field plus artifact/replay-binding direction across all nine families,
- and theorem-by-theorem closure readings across all nine families.

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

## Member-proof closure rule

V16 treats family members as proof-bearing units rather than as inventory items.

A family member is not closed merely because it is named.
A family member is closed only when:
- membership is explicit and non-ambiguous,
- the member's primary truth surface is explicitly identified,
- the member's proof verdict can fail on the obligations the family theorem claims,
- the member is directly visible through artifacts, witnesses, and replay,
- exclusions or non-membership are explicit rather than omitted,
- and the member has a ratchetable implementation/test expectation.

The family sections below specialize that rule.
Their member-coverage inventories name the units.
Their member-closure criteria state what each named unit must satisfy before V16 can treat that member as proven.

## Family-theorem binding rule

V16 also treats each proof family theorem as a proof-bearing interface rather than as explanatory prose.

A family theorem is not materially closed merely because it sounds complete.
A family theorem is materially closed only when:
- each claimed obligation is bound to an explicit family verdict axis,
- the realized family proof shape can fail on those exact axes,
- member-level truths and family-level truths reconcile without silent substitution,
- witness artifacts and replay steps expose theorem-bearing closure directly,
- and implementation ratchets or tests fail when theorem language and proof-object strength drift apart.

The family sections below specialize that rule as well.
Their theorem-binding/proof-shape sections state what each family theorem must bind to before V16 can treat the family proof object as materially honest.

## Family verdict-schema rule

V16 family proofs should converge toward explicit verdict schemas rather than opaque aggregate booleans.

At minimum, a family verdict schema should eventually carry:
- stable theorem identifiers for the family's named theorem units,
- one verdict axis per theorem-bearing obligation,
- member-level verdicts where family closure depends on member completeness,
- witness artifact paths and replay steps bound to each theorem unit,
- and one aggregate pass/fail summary derived from those explicit axes rather than replacing them.

The family sections below do not finalize those schemas yet.
They do bind to the current realization-basis theorem catalogs and define the minimum verdict axes that later proof objects, artifacts, and tests must expose.

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
type FamilyTheoremVerdictV16 = {
  theoremId: string
  passed: boolean
  witnessArtifactPaths: string[]
  replayArtifactPaths: string[]
  replayStepIds: string[]
  failureReasons: string[]
}
```

```ts
type FamilyArtifactBindingV16 = {
  artifactPath: string
  role:
    | 'primary-proof'
    | 'supporting-proof'
    | 'registry'
    | 'report'
    | 'projection'
    | 'receipt-log'
    | 'contract'
    | 'bundle'
    | 'witness-manifest'
  theoremIds: string[]
  requiredForWitness: boolean
  requiredForReplay: boolean
}
```

```ts
type FamilyReplayStepV16 = {
  stepId: string
  theoremIds: string[]
  requiredArtifactPaths: string[]
  instruction: string
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
  theoremVerdicts: FamilyTheoremVerdictV16[]
  artifactBindings: FamilyArtifactBindingV16[]
  replaySteps: FamilyReplayStepV16[]
  witnessArtifactPaths: string[]
  replayArtifacts: string[]
  replayInstructions: string[]
  allCasesPassed: boolean
  allTheoremsPassed: boolean
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

### 6.2 Member closure criteria

For `prompt-completeness`, a member is closed only when its prompt-owned output is fully represented in family registry truth, realized run truth, and family verdict truth.

1. `task`
   Closed only when `task` has one canonical prompt family member, one strict parse contract, one admissible parsed envelope, and a validated semantic consumer graph that includes every real need/report/operator consumer rather than a partial binding subset.

2. `failureModes`
   Closed only when `failureModes` has one canonical prompt family member, one strict parse contract, one admissible parsed envelope, and a validated consumer graph that distinguishes semantic consumers from lineage/proof-support surfaces rather than conflating them.

3. `constraints`
   Closed only when `constraints` has one canonical prompt family member, one strict parse contract, one admissible parsed envelope, and explicit non-rendered-context legality proving that hidden context use is authorized rather than incidental.

4. `targetArtifactKinds`
   Closed only when `targetArtifactKinds` has one canonical prompt family member, one strict parse contract, one admissible parsed envelope, and a validated semantic consumer graph that includes all artifact-planning and operator-facing consumers.

5. `closureCriteria`
   Closed only when V16 chooses one truthful path and makes it fail-closed:
   - either `closureCriteria` becomes a full prompt-completeness member with contract, envelope, witnesses, replay, and tests,
   - or it is explicitly reclassified out of prompt-completeness with a named replacement proof path and an explicit family exclusion rule.

### Prompt-completeness theorem binding and proof-shape realization

For V16, the `prompt-completeness` theorem must bind directly to:
1. coverage totality, ghost-coverage exclusion, and explicit-exclusion truth,
2. template/context/parse contract closure,
3. parsed-envelope admissibility closure,
4. downstream-consumer closure,
5. provenance-truth closure,
6. and witness/replay/test closure.

The realized family proof shape should therefore expose:
1. expected member set, realized member set, and explicit exclusion set,
2. per-member contract, admissibility, consumer, and provenance verdicts,
3. family-level closure verdicts on each theorem axis rather than one aggregate boolean only,
4. direct witness artifact paths and replay steps for omitted-member, parse, and consumer failures,
5. and test ratchets that fail when a new prompt-owned field or downstream consumer appears without family-registry and family-proof updates.

### Prompt-completeness theorem catalog and family verdict schema

The current realization-basis theorem catalog for `prompt-completeness` is:
1. `prompt_completeness.coverage_totality`
2. `prompt_completeness.no_ghost_coverage`
3. `prompt_completeness.explicit_exclusion_closure`
4. `prompt_completeness.contract_closure`
5. `prompt_completeness.parsed_envelope_admissibility`
6. `prompt_completeness.downstream_consumer_closure`
7. `prompt_completeness.provenance_truth`
8. `prompt_completeness.witness_replay_closure`

The current theorem-by-theorem closure reading is:
1. `prompt_completeness.coverage_totality`
   Registered prompt-owned members, classified prompt-owned members, prompt surfaces, and parsed envelopes must reconcile through `prompt-completeness.member-set-reconciliation`.
2. `prompt_completeness.no_ghost_coverage`
   No realized prompt-owned member may appear in contracts, surfaces, or parsed envelopes unless it belongs to the registered family member set and survives the same reconciliation step.
3. `prompt_completeness.explicit_exclusion_closure`
   Any non-member inside the prompt-owned neighborhood must be carried as an explicit exclusion with a named replacement proof path rather than omitted silently during member reconciliation.
4. `prompt_completeness.contract_closure`
   Template, context, and parse-contract obligations must close through `prompt-completeness.parse-admissibility` rather than through prompt-hash agreement alone.
5. `prompt_completeness.parsed_envelope_admissibility`
   Parsed completion envelopes must remain admissible against their declared parse contracts and replay through the same parse-admissibility step.
6. `prompt_completeness.downstream_consumer_closure`
   Declared downstream consumers must match actual semantic consumers through `prompt-completeness.consumer-closure`.
7. `prompt_completeness.provenance_truth`
   Prompt-owned provenance claims must remain truthful under `prompt-completeness.provenance-truth`, including annotated source precedence.
8. `prompt_completeness.witness_replay_closure`
   Witness artifacts and replay must cover member reconciliation, parse admissibility, consumer closure, and provenance truth directly rather than by bundle-only substitution.

The stable family verdict schema should therefore expose at least:
1. `expectedMembersMatchRealizedMembers`
2. `explicitExclusionsClosed`
3. `contractsClosed`
4. `parsedEnvelopesAdmissible`
5. `downstreamConsumersClosed`
6. `provenanceTruthClosed`
7. `witnessReplayClosed`
8. `memberVerdicts`
9. `allTheoremsPassed`

### Prompt-completeness realized proof-object field design and artifact/replay binding

The current runtime object that realizes this family proof is `promptCompletenessProof`, with direct binding to parsed-envelope and prompt-surface artifacts rather than contract-hash closure only.

It already carries `theoremVerdicts`, `artifactBindings`, `replaySteps`, `memberVerdicts`, and `allTheoremsPassed`.

V16 should preserve and ratchet that shape through:
1. `theoremVerdicts`
2. `artifactBindings`
3. `replaySteps`
4. `memberVerdicts`
5. `allTheoremsPassed`

Its minimum artifact/replay binding set should include:
1. `.engi/prompt-contracts.json`
2. `.engi/prompt-surfaces.json`
3. `.engi/parsed-completion-envelopes.json`
4. `.engi/prompt-completeness-proof.json`
5. and, when realized, a first-class prompt family registry artifact.

Its minimum replay steps should include:
1. member-set reconciliation,
2. parse-admissibility replay,
3. downstream-consumer reconciliation,
4. provenance-truth replay,
5. and omission/exclusion replay.

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
  theoremVerdicts: FamilyTheoremVerdictV16[]
  artifactBindings: FamilyArtifactBindingV16[]
  replaySteps: FamilyReplayStepV16[]
  witnessArtifactPaths: string[]
  replayArtifacts: string[]
  replayInstructions: string[]
  allCasesPassed: boolean
  allTheoremsPassed: boolean
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

### 7.14 Member closure criteria

For `inference-synthesis`, a member is closed only when one inferred field has one truthful evaluator/moment owner, one canonical evidence basis, one replayable field proof, and one explicit witness/replay path.

1. `task`
   Closed only when `task` has one canonical field proof whose evidence basis either directly enumerates or explicitly closes over the full prompt-driving evidence basis, and whose evaluator status agrees across field proof, eval manifest, prompt implementation, and boundary surfaces.

2. `failureModes`
   Closed only when `failureModes` has one canonical field proof with truthful evaluator status, one canonical evidence basis, and explicit closure between prompt context, derivation evidence, and field-proof evidence.

3. `constraints`
   Closed only when `constraints` has one canonical field proof with truthful evaluator status, one canonical evidence basis, and explicit closure showing that non-rendered or policy-bearing context is part of the declared inference basis rather than hidden runtime behavior.

4. `targetArtifactKinds`
   Closed only when `targetArtifactKinds` has one canonical field proof with truthful evaluator status, one canonical evidence basis, and explicit closure to downstream artifact-planning consumers.

5. `closureCriteria`
   Closed only when V16 chooses one truthful path and makes it fail-closed:
   - either `closureCriteria` becomes a covered inferred field with a field proof, moment ownership, witnesses, replay, and tests,
   - or it is explicitly reclassified out of the family's classified inferred-field set.

### Inference-synthesis theorem binding and proof-shape realization

For V16, the `inference-synthesis` theorem must bind directly to:
1. inferred-field coverage totality,
2. evaluator-status truth,
3. evidence-basis closure,
4. ownership and traceability closure,
5. witness-materialization closure,
6. and replay/test closure.

The realized family proof shape should therefore expose:
1. expected inferred-field set, realized field-proof set, and explicit exclusions,
2. moment-contract truth distinct from field-proof truth,
3. per-member verdicts for evaluator-status agreement and evidence-basis closure,
4. direct witness artifact paths for moment contracts, field proofs, parsed envelopes, and the family proof,
5. and test ratchets that fail when a classified inferred field, evaluator mode, or evidence basis drifts without family-proof updates.

### Inference-synthesis theorem catalog and family verdict schema

The current realization-basis theorem catalog for `inference-synthesis` is:
1. `inference_synthesis.coverage_totality`
2. `inference_synthesis.evaluator_status_truth`
3. `inference_synthesis.evidence_basis_closure`
4. `inference_synthesis.ownership_traceability_closure`
5. `inference_synthesis.witness_materialization_closure`
6. `inference_synthesis.replay_closure`

The current theorem-by-theorem closure reading is:
1. `inference_synthesis.coverage_totality`
   Classified inferred fields, covered field proofs, and moment contracts must reconcile through `inference-synthesis.coverage-reconciliation`.
2. `inference_synthesis.evaluator_status_truth`
   Stand-in versus non-stand-in evaluator status must stay consistent across field proofs, moment contracts, and eval manifest through `inference-synthesis.evaluator-status-replay`.
3. `inference_synthesis.evidence_basis_closure`
   Each inferred field must carry one canonical realized evidence basis that replays through `inference-synthesis.evidence-basis-replay`.
4. `inference_synthesis.ownership_traceability_closure`
   Field ownership, moment ownership, and evidence traceability must remain consistent with the same evidence-basis replay path rather than diverging into multiple provenance stories.
5. `inference_synthesis.witness_materialization_closure`
   Moment contracts, field proofs, prompt surfaces, parsed envelopes, and the family proof must all be present as witness-bearing surfaces for the family.
6. `inference_synthesis.replay_closure`
   Coverage reconciliation, evaluator-status replay, and evidence-basis replay must together reconstruct the family's theorem-bearing closure.

The stable family verdict schema should therefore expose at least:
1. `expectedInferredFieldsMatchRealizedFieldProofs`
2. `evaluatorStatusTruthClosed`
3. `evidenceBasisClosed`
4. `ownershipTraceabilityClosed`
5. `witnessMaterializationClosed`
6. `replayClosed`
7. `memberVerdicts`
8. `allTheoremsPassed`

### Inference-synthesis realized proof-object field design and artifact/replay binding

The current runtime surfaces that realize this family proof are the field-level inference proofs plus the aggregated `inferenceSynthesisProof`, distinct from prompt-contract closure.

They already carry `theoremVerdicts`, `artifactBindings`, `replaySteps`, `memberVerdicts`, and `allTheoremsPassed`.

V16 should preserve and ratchet that shape through:
1. `theoremVerdicts`
2. `artifactBindings`
3. `replaySteps`
4. `memberVerdicts`
5. `allTheoremsPassed`

Its minimum artifact/replay binding set should include:
1. moment-contract artifacts when realized,
2. field-level inference-proof artifacts when realized,
3. `.engi/eval-manifest.json`
4. `.engi/prompt-surfaces.json`
5. `.engi/parsed-completion-envelopes.json`
6. and the family proof artifact itself.

Its minimum replay steps should include:
1. classified-field reconciliation,
2. evaluator-status replay,
3. evidence-basis reconciliation,
4. ownership/traceability replay,
5. and witness-materialization replay.

### 7.15 Current drafting boundary

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
  theoremVerdicts: FamilyTheoremVerdictV16[]
  artifactBindings: FamilyArtifactBindingV16[]
  replaySteps: FamilyReplayStepV16[]
  allCasesPassed: boolean
  allTheoremsPassed: boolean
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

### 8.19 Member closure criteria

For `static-code-analysis`, a member is closed only when its stage domain is explicit, static-only, replayable, and represented by the right registry/receipt/report/proof surfaces.

1. deterministic parser
   Closed only when parser provenance, parser receipts, and parser registry truth all agree through an explicit abstract-to-concrete stage mapping and the member does not depend on any out-of-family verification-stage receipt.

2. repo-context
   Closed only when repo-context provenance, receipts, and registry truth all agree through an explicit abstract-to-concrete stage mapping and the member remains inside a static-only family domain.

3. content-unit
   Closed only when content-unit extraction receipts, registry truth, and report/proof stage coverage all agree and remain inside the static family boundary rather than borrowing verification-stage closure.

4. measurement stages
   Closed only when asset-measurement receipts, static report, and static family proof agree on a purely static stage domain and exclude `verification.*` receipts from the member's own closure path.

### Static-code-analysis theorem binding and proof-shape realization

For V16, the `static-code-analysis` theorem must bind directly to:
1. a static-only stage domain,
2. explicit mapping from abstract family members to concrete receipt stages,
3. registry-role closure,
4. receipt/report/proof agreement,
5. and witness/replay/test closure.

The realized family proof shape should therefore expose:
1. member verdicts for deterministic parser, repo-context, content-unit, and measurement stages,
2. an explicit stage-mapping surface between provenance ids and receipt-stage ids,
3. family-domain exclusions that fail when `verification.*` receipts enter static closure,
4. primary-versus-alias registry roles,
5. and test ratchets that fail when a new static stage, registry, or receipt domain appears without theorem-bound family proof updates.

### Static-code-analysis theorem catalog and family verdict schema

The current realization-basis theorem catalog for `static-code-analysis` is:
1. `static_code_analysis.stage_domain_purity`
2. `static_code_analysis.abstract_to_concrete_stage_mapping`
3. `static_code_analysis.registry_role_closure`
4. `static_code_analysis.receipt_report_proof_agreement`
5. `static_code_analysis.witness_replay_closure`

The current theorem-by-theorem closure reading is:
1. `static_code_analysis.stage_domain_purity`
   The family may only close over static receipt stages, excluding `verification.*` contamination through `static-code-analysis.stage-domain`.
2. `static_code_analysis.abstract_to_concrete_stage_mapping`
   Deterministic parser, repo-context, content-unit, and measurement members must map explicitly to concrete covered stage ids through `static-code-analysis.stage-mapping`.
3. `static_code_analysis.registry_role_closure`
   Primary versus alias registry roles must remain explicit and replay through the same stage-mapping path.
4. `static_code_analysis.receipt_report_proof_agreement`
   Registry surfaces, static measurement report, and static measurement proof must agree on the same static receipt domain through `static-code-analysis.receipt-report-proof`.
5. `static_code_analysis.witness_replay_closure`
   Stage-domain, stage-mapping, and receipt-report-proof replay must reconstruct family closure directly.

The stable family verdict schema should therefore expose at least:
1. `stageDomainPure`
2. `stageMappingsClosed`
3. `registryRolesClosed`
4. `receiptReportProofAgreementClosed`
5. `witnessReplayClosed`
6. `memberVerdicts`
7. `allTheoremsPassed`

### Static-code-analysis realized proof-object field design and artifact/replay binding

The current runtime object that realizes this family proof is `staticMeasurementProof`, paired explicitly with `staticMeasurementReport` and the registry surfaces rather than receipt resolution alone.

It already carries `theoremVerdicts`, `artifactBindings`, `replaySteps`, `memberVerdicts`, and `allTheoremsPassed`.

V16 should preserve and ratchet that shape through:
1. `theoremVerdicts`
2. `artifactBindings`
3. `replaySteps`
4. `memberVerdicts`
5. `allTheoremsPassed`

Its minimum artifact/replay binding set should include:
1. `.engi/code-analysis-fact-registry.json`
2. `.engi/static-heuristics-registry.json` when retained as a distinct surface
3. `.engi/static-measurement-report.json`
4. `.engi/static-measurement-proof.json`
5. and the receipt-bearing provenance surface for the family.

Its minimum replay steps should include:
1. abstract-to-concrete stage mapping replay,
2. stage-domain purity replay,
3. registry-role replay,
4. receipt/report/proof agreement replay,
5. and out-of-family stage exclusion replay.

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
  theoremVerdicts: FamilyTheoremVerdictV16[]
  artifactBindings: FamilyArtifactBindingV16[]
  replaySteps: FamilyReplayStepV16[]
  allCasesPassed: boolean
  allTheoremsPassed: boolean
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

### 9.15 Member closure criteria

For `verification-decisions`, a member is closed only when one canonical decision member maps to one explicit stage/consequence path, one report/receipt role split, and one witness/replay path.

1. `issuance`
   Closed only when issuance-stage receipts, decision surfaces, and report entries all agree on the same issuance verdict and remain replay-visible beyond receipt-id-only witness closure.

2. `provenance`
   Closed only when provenance-stage receipts, decision surfaces, and report entries all agree on the same provenance verdict and remain replay-visible beyond receipt-id-only witness closure.

3. `sufficiency`
   Closed only when sufficiency-stage receipts, decision surfaces, and report entries all agree on the same sufficiency verdict and remain replay-visible beyond receipt-id-only witness closure.

4. `issuer-policy`
   Closed only when issuer-policy-stage receipts, decision surfaces, and report entries all agree on the same policy verdict and remain replay-visible beyond receipt-id-only witness closure.

5. `use-tier-consequence`
   Closed only when the family canonically names the stage or closure path that produces `useTier` and `finalUseTier`, keeps branch-mode rights visibly downstream of that family member, and makes the full consequence path replay-visible in both report and witness closure.

### Verification-decisions theorem binding and proof-shape realization

For V16, the `verification-decisions` theorem must bind directly to:
1. issuance, provenance, sufficiency, and issuer-policy decision closure,
2. use-tier consequence closure,
3. receipt-versus-report role closure,
4. witness-materialization closure,
5. and replay/test closure.

The realized family proof shape should therefore expose:
1. per-member verdicts for each decision member plus use-tier consequence,
2. an explicit mapping from decision stages to family members and report consequences,
3. direct witness artifact paths for raw receipts, decision report, and family proof,
4. explicit failure surfaces for undernamed consequence truth,
5. and test ratchets that fail when a new verification stage or consequence appears without family-member and theorem-binding updates.

### Verification-decisions theorem catalog and family verdict schema

The current realization-basis theorem catalog for `verification-decisions` is:
1. `verification_decisions.issuance_closure`
2. `verification_decisions.provenance_closure`
3. `verification_decisions.sufficiency_closure`
4. `verification_decisions.issuer_policy_closure`
5. `verification_decisions.use_tier_consequence_closure`
6. `verification_decisions.receipt_report_role_closure`
7. `verification_decisions.witness_replay_closure`

The current theorem-by-theorem closure reading is:
1. `verification_decisions.issuance_closure`
   Issuance decisions must remain explicit as a family member and replay through `verification-decisions.stage-mapping`.
2. `verification_decisions.provenance_closure`
   Provenance verification decisions must remain explicit and reconcile with the same stage-to-member mapping path.
3. `verification_decisions.sufficiency_closure`
   Sufficiency decisions must remain explicit and traceable through the stage-mapping replay path.
4. `verification_decisions.issuer_policy_closure`
   Issuer-policy decisions must remain explicit and traceable through the stage-mapping replay path.
5. `verification_decisions.use_tier_consequence_closure`
   Use-tier and final-use-tier consequence truth must remain first-class and replay through `verification-decisions.use-tier-consequence`.
6. `verification_decisions.receipt_report_role_closure`
   Raw receipts, report-facing consequences, and the family proof must preserve distinct roles while still agreeing on the same decision story.
7. `verification_decisions.witness_replay_closure`
   Stage-mapping and use-tier-consequence replay must together reconstruct theorem-bearing closure for the family.

The stable family verdict schema should therefore expose at least:
1. `issuanceClosed`
2. `provenanceClosed`
3. `sufficiencyClosed`
4. `issuerPolicyClosed`
5. `useTierConsequenceClosed`
6. `receiptReportRolesClosed`
7. `witnessReplayClosed`
8. `memberVerdicts`
9. `allTheoremsPassed`

### Verification-decisions realized proof-object field design and artifact/replay binding

The current runtime surfaces that realize this family proof are the verification receipts artifact, `verificationReport`, and `verificationDecisionsProof`, with use-tier consequence closure named directly.

They already carry `theoremVerdicts`, `artifactBindings`, `replaySteps`, `memberVerdicts`, and `allTheoremsPassed`.

V16 should preserve and ratchet that shape through:
1. `theoremVerdicts`
2. `artifactBindings`
3. `replaySteps`
4. `memberVerdicts`
5. `allTheoremsPassed`

Its minimum artifact/replay binding set should include:
1. `.engi/verification-receipts.json`
2. `.engi/verification-report.json`
3. `.engi/verification-decisions-proof.json`

Its minimum replay steps should include:
1. decision-stage-to-member replay,
2. report-consequence replay,
3. use-tier consequence replay,
4. receipt/report alignment replay,
5. and witness-materialization replay.

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
  theoremVerdicts: FamilyTheoremVerdictV16[]
  artifactBindings: FamilyArtifactBindingV16[]
  replaySteps: FamilyReplayStepV16[]
  allCasesPassed: boolean
  allTheoremsPassed: boolean
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
   Current debt: selected-asset closure now has a first-class selection-consistency artifact, but selected-set truth still has to stay ratcheted across selection consistency, aggregate materialization, and later settlement-facing consequences.

2. locked units
   Realized through `.engi/asset-pack.lock.json` plus visibility and selection-consistency closure.
   Current debt: lock closure is now replay-visible, but the family still has to keep lock truth primary rather than allowing later aggregate materialization summaries to stand in for it.

3. materialized source
   Realized through `.engi/selected-source-material.json` plus selection-consistency and materialization proof closure.
   Current debt: source-manifest closure is now witnessed and replayed directly, but it still has to remain role-distinct from lock and aggregate materialization closure.

4. exclusions
   Realized through `.engi/materialization-exclusions.json`.
   Current debt: exclusions are explicit and replay-visible, but they still have to remain role-distinct from broader aggregate materialization closure.

5. visibility rules
   Realized through `.engi/materialization-visibility-proof.json`.
   Current debt: visibility proof is now replay-visible, but the family still has to keep visibility closure primary and ratcheted against selected-set and exclusion truth.

### 10.15 Member closure criteria

For `selection-and-materialization`, a member is closed only when one canonical family surface owns it directly and the family replay path reconstructs that member without bundle-only substitution.

1. selected assets
   Closed only when the selected asset set is closed consistently across asset pack, selection-consistency proof, aggregate materialization proof, and later settlement-eligibility consequences.

2. locked units
   Closed only when the lock artifact is a first-class replay surface and every materialized or settlement-consumed unit closes exactly over that lock.

3. materialized source
   Closed only when selected-source-material entries agree with the lock, selected set, and rights model, and remain directly witnessable and replayable.

4. exclusions
   Closed only when every non-materialized or non-settlement-consumed asset has an explicit exclusion record with consequence truth that remains distinct from broader aggregate materialization summaries.

5. visibility rules
   Closed only when visibility-proof closure is first-class, replay-visible, and sufficient to prove that public/materialized boundaries do not leak private materialization state.

### Selection-and-materialization theorem binding and proof-shape realization

For V16, the `selection-and-materialization` theorem must bind directly to:
1. selected-asset closure,
2. lock closure,
3. materialized-source closure,
4. exclusion closure,
5. visibility closure,
6. and selection-consistency/materialization-proof closure.

The realized family proof shape should therefore expose:
1. per-member verdicts for selected assets, lock, source, exclusions, and visibility,
2. explicit binding from those member verdicts to selection-consistency proof and aggregate materialization proof,
3. direct witness artifact paths for lock, selected-source-material, exclusions, visibility proof, selection-consistency proof, and aggregate materialization proof,
4. explicit settlement-consumption and branch-mode consequences,
5. and test ratchets that fail when any selection-bearing artifact drifts outside theorem-bound replay.

### Selection-and-materialization theorem catalog and family verdict schema

The current realization-basis theorem catalog for `selection-and-materialization` is:
1. `selection_and_materialization.selected_asset_closure`
2. `selection_and_materialization.lock_closure`
3. `selection_and_materialization.materialized_source_closure`
4. `selection_and_materialization.exclusion_closure`
5. `selection_and_materialization.visibility_closure`
6. `selection_and_materialization.selection_consistency_closure`
7. `selection_and_materialization.materialization_proof_closure`

The current theorem-by-theorem closure reading is:
1. `selection_and_materialization.selected_asset_closure`
   Selected candidates, selected assets, and selected-set replay must agree on the same chosen asset set.
2. `selection_and_materialization.lock_closure`
   Asset-pack lock truth must bind the selected set and replay with the same selected-set closure path.
3. `selection_and_materialization.materialized_source_closure`
   Selected-source-material must agree with selected assets and the selected-set replay path.
4. `selection_and_materialization.exclusion_closure`
   Materialization exclusions must be explicit, explained, and consistent with the visibility replay path.
5. `selection_and_materialization.visibility_closure`
   Visibility proof must agree with the selected-versus-excluded story through `selection-and-materialization.visibility`.
6. `selection_and_materialization.selection_consistency_closure`
   `selectionConsistencyProof` must remain the dedicated consistency closure for selected assets, lock, and materialized source.
7. `selection_and_materialization.materialization_proof_closure`
   `materializationProof` must close the family's aggregate selected-set and visibility story without replacing primary member surfaces.

The stable family verdict schema should therefore expose at least:
1. `selectedAssetsClosed`
2. `lockClosed`
3. `materializedSourceClosed`
4. `exclusionsClosed`
5. `visibilityClosed`
6. `selectionConsistencyClosed`
7. `materializationProofClosed`
8. `memberVerdicts`
9. `allTheoremsPassed`

### Selection-and-materialization realized proof-object field design and artifact/replay binding

The current runtime surfaces that realize this family proof are `selectionConsistencyProof`, `materializationProof`, and `selectionAndMaterializationProof`, with direct family binding to lock, source, exclusion, and visibility artifacts.

They already carry `theoremVerdicts`, `artifactBindings`, `replaySteps`, `memberVerdicts`, and `allTheoremsPassed`.

V16 should preserve and ratchet that shape through:
1. `theoremVerdicts`
2. `artifactBindings`
3. `replaySteps`
4. `memberVerdicts`
5. `allTheoremsPassed`

Its minimum artifact/replay binding set should include:
1. `.engi/asset-pack.lock.json`
2. `.engi/selected-source-material.json`
3. `.engi/materialization-exclusions.json`
4. `.engi/materialization-visibility-proof.json`
5. `.engi/selection-consistency-proof.json`
6. `.engi/materialization-proof.json`

Its minimum replay steps should include:
1. selected-set replay,
2. lock/source closure replay,
3. exclusions replay,
4. visibility replay,
5. and settlement-consumption replay.

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
  theoremVerdicts: FamilyTheoremVerdictV16[]
  artifactBindings: FamilyArtifactBindingV16[]
  replaySteps: FamilyReplayStepV16[]
  allCasesPassed: boolean
  allTheoremsPassed: boolean
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
   - `.engi/authorization-and-sensitive-flow-proof.json`

The important V16 move is not the final filename list.
It is that the family stops treating:
- principal bindings,
- authorization decisions,
- and sensitive-data-flow policy truth

as though they were one undifferentiated private-proof layer.

### 11.8 Provisional witness-materialization and replay direction

The current family work now supports a first replay/witness direction as well.

V16 should provisionally prefer the following posture:

1. witness artifact paths should include the three primary family member artifacts and the realized family proof artifacts,
2. replay artifacts should include the three primary family member artifacts and the realized family proof artifacts,
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

### 11.11 Member closure criteria

For `authorization-and-sensitive-flow`, a member is closed only when one canonical primary artifact owns it directly and the family replay path reconstructs its policy-bearing truth without borrowing later disclosure closure.

1. principals
   Closed only when all relevant principal classes and authority bindings are explicitly materialized, first-class in witness closure, and sufficient to close identity-authorization proof without hidden binding surfaces.

2. authorization decisions
   Closed only when all state-changing and relevant access decisions are explicitly policy-backed, directly witnessable, and replay-visible as family-local authorization truth.

3. confidentiality classes
   Closed only when all private and required sensitive classes are explicitly assigned to artifacts or flows and family closure fails on any missing or misclassified class.

4. retention/disclosure rules
   Closed only when every sensitive-data-flow record carries explicit retention and disclosure-policy assignments and the family boundary to later disclosure-boundary proof remains explicit rather than blurred.

5. sensitive-data flows
   Closed only when all relevant flows are recorded, classification/policy assignments are attached to them, unauthorized public flow is impossible under family closure, and replay reconstructs that result directly.

### Authorization-and-sensitive-flow theorem binding and proof-shape realization

For V16, the `authorization-and-sensitive-flow` theorem must bind directly to:
1. principal and authority closure,
2. authorization-decision closure,
3. confidentiality-class closure,
4. retention/disclosure-rule closure,
5. sensitive-flow closure,
6. and witness/replay/test closure.

The realized family proof shape should therefore expose:
1. per-member verdicts for principals, decisions, classes, rules, and flows,
2. explicit separation between identity-authorization proof and sensitive-data-flow proof,
3. direct witness artifact paths for authorization decisions, sensitive-data-flow, and family proofs,
4. explicit failure surfaces when a new principal class, data class, or policy-bearing sink appears without family updates,
5. and test ratchets that fail on hidden authority or hidden sensitive-flow drift.

### Authorization-and-sensitive-flow theorem catalog and family verdict schema

The current realization-basis theorem catalog for `authorization-and-sensitive-flow` is:
1. `authorization_and_sensitive_flow.principal_authority_totality`
2. `authorization_and_sensitive_flow.authorization_decision_closure`
3. `authorization_and_sensitive_flow.classification_closure`
4. `authorization_and_sensitive_flow.policy_assignment_closure`
5. `authorization_and_sensitive_flow.no_unauthorized_public_flow`
6. `authorization_and_sensitive_flow.witness_replay_closure`

The current theorem-by-theorem closure reading is:
1. `authorization_and_sensitive_flow.principal_authority_totality`
   Identity bindings must enumerate the principals and authorities that can change state and replay through `authorization-sensitive-flow.identity`.
2. `authorization_and_sensitive_flow.authorization_decision_closure`
   Authorization decisions must close over the same identity-bearing actions rather than relying on implicit authority.
3. `authorization_and_sensitive_flow.classification_closure`
   Required sensitive classes must remain explicit across sensitive-flow records and replay through `authorization-sensitive-flow.sensitive-flow-replay`.
4. `authorization_and_sensitive_flow.policy_assignment_closure`
   Retention and disclosure policy assignments must remain explicit on sensitive flows rather than being implied only later by disclosure surfaces.
5. `authorization_and_sensitive_flow.no_unauthorized_public_flow`
   Sensitive-flow replay must prove that no unauthorized public sink exists for any classified flow.
6. `authorization_and_sensitive_flow.witness_replay_closure`
   Identity replay plus sensitive-flow replay must together reconstruct the family's theorem-bearing closure.

The stable family verdict schema should therefore expose at least:
1. `principalAuthorityClosed`
2. `authorizationDecisionsClosed`
3. `classificationsClosed`
4. `policyAssignmentsClosed`
5. `noUnauthorizedPublicFlow`
6. `witnessReplayClosed`
7. `memberVerdicts`
8. `allTheoremsPassed`

### Authorization-and-sensitive-flow realized proof-object field design and artifact/replay binding

The current runtime surfaces that realize this family proof are `identityAuthorizationProof`, `sensitiveDataFlowProof`, and `authorizationAndSensitiveFlowProof`, with direct family binding to identity bindings, authorization decisions, and sensitive-flow records.

They already carry `theoremVerdicts`, `artifactBindings`, `replaySteps`, `memberVerdicts`, and `allTheoremsPassed`.

V16 should preserve and ratchet that shape through:
1. `theoremVerdicts`
2. `artifactBindings`
3. `replaySteps`
4. `memberVerdicts`
5. `allTheoremsPassed`

Its minimum artifact/replay binding set should include:
1. `.engi/identity-bindings.json`
2. `.engi/authorization-decisions.json`
3. `.engi/sensitive-data-flow.json`
4. `.engi/identity-authorization-proof.json`
5. `.engi/sensitive-data-flow-proof.json`
6. `.engi/authorization-and-sensitive-flow-proof.json`

Its minimum replay steps should include:
1. principal-binding replay,
2. authorization-decision replay,
3. classification and policy-assignment replay,
4. sensitive-flow replay,
5. and no-unauthorized-public-flow replay.

### 11.12 Current drafting boundary

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
  theoremVerdicts: FamilyTheoremVerdictV16[]
  artifactBindings: FamilyArtifactBindingV16[]
  replaySteps: FamilyReplayStepV16[]
  allCasesPassed: boolean
  allTheoremsPassed: boolean
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

### 12.11 Member closure criteria

For `settlement-source-to-shares`, a member is closed only when one canonical settlement surface owns it directly, exact replay reconstructs it, and theorem/journal closure do not silently substitute for one another.

1. contribution
   Closed only when source contribution entries cover every settlement candidate and marginal-contribution replay remains stable and auditable for each member.

2. clipping
   Closed only when each settlement candidate has an explicit clipping disposition and receipt, and clipped versus non-clipped outcomes remain replay-stable under the family's canonical tie-break and scoring rules.

3. normalization
   Closed only when basis-point normalization is explicit, totals exactly, and remains directly connected to later settlement theorem closure rather than floating as a side ledger only.

4. participation
   Closed only when settlement-participation records cover selected, participating, positively credited, zero-credit, and excluded states for every relevant asset.

5. allocation
   Closed only when exact micro-unit allocation is conserved, accounting precision agrees with the journal, and replay reproduces the same allocation domain exactly.

6. journal
   Closed only when journal-diff truth and journal-completeness closure are both explicit, witnessable, and replay-visible rather than left as an internal proof object only.

7. settlement proof
   Closed only when theorem-bearing settlement proof is directly witnessed and replay-visible, with no gap between the emitted settlement-proof artifact and the family's own witness closure.

### Settlement-source-to-shares theorem binding and proof-shape realization

For V16, the `settlement-source-to-shares` theorem must bind directly to:
1. contribution closure,
2. clipping closure,
3. normalization closure,
4. participation closure,
5. exact allocation closure,
6. journal closure,
7. and theorem-bearing settlement-proof closure.

The realized family proof shape should therefore expose:
1. per-member verdicts for each settlement member,
2. explicit distinction between journal-completeness closure and theorem-bearing settlement closure,
3. arithmetic and conservation verdicts that remain directly tied to settlement proof rather than prose summary only,
4. direct witness artifact paths for source-to-shares, participation, journal diff, journal completeness, accounting precision, and settlement proof,
5. and test ratchets that fail when allocation, journal, or theorem closure drifts without exact replay failure.

### Settlement-source-to-shares theorem catalog and family verdict schema

The current realization-basis theorem catalog for `settlement-source-to-shares` is:
1. `settlement_source_to_shares.contribution_totality`
2. `settlement_source_to_shares.clipping_determinism`
3. `settlement_source_to_shares.normalization_exactness`
4. `settlement_source_to_shares.participation_totality`
5. `settlement_source_to_shares.allocation_conservation`
6. `settlement_source_to_shares.journal_completeness`
7. `settlement_source_to_shares.settlement_theorem_integrity`

The current theorem-by-theorem closure reading is:
1. `settlement_source_to_shares.contribution_totality`
   Source-to-shares derivation must cover the full contribution basis and replay through `settlement-source-to-shares.contribution-allocation`.
2. `settlement_source_to_shares.clipping_determinism`
   Clipping and tie-break behavior must remain deterministic within the same contribution-allocation replay path.
3. `settlement_source_to_shares.normalization_exactness`
   Raw and settled shares must normalize exactly within the contribution-allocation replay path.
4. `settlement_source_to_shares.participation_totality`
   Settlement participation must remain total over all credited actors within the same contribution-allocation replay path.
5. `settlement_source_to_shares.allocation_conservation`
   Allocation and accounting precision must conserve value rather than merely approximating it.
6. `settlement_source_to_shares.journal_completeness`
   Journal completeness must replay through `settlement-source-to-shares.journal-theorem`, including closed refs and exact debit-credit balance.
7. `settlement_source_to_shares.settlement_theorem_integrity`
   The theorem-bearing settlement proof must keep the family's exactness checks stable and replayable through the same journal-theorem path.

The stable family verdict schema should therefore expose at least:
1. `contributionClosed`
2. `clippingClosed`
3. `normalizationClosed`
4. `participationClosed`
5. `allocationClosed`
6. `journalClosed`
7. `settlementTheorems`
8. `memberVerdicts`
9. `allTheoremsPassed`

### Settlement-source-to-shares realized proof-object field design and artifact/replay binding

The current runtime surfaces that realize this family proof are `sourceToSharesArtifact`, `settlementParticipationArtifact`, `accountingPrecisionReport`, `journalCompletenessProof`, `settlementProof`, and `settlementSourceToSharesProof`, with journal and theorem closure kept explicit and distinct.

They already carry `theoremVerdicts`, `artifactBindings`, `replaySteps`, `memberVerdicts`, and `allTheoremsPassed`.

V16 should preserve and ratchet that shape through:
1. `theoremVerdicts`
2. `artifactBindings`
3. `replaySteps`
4. `memberVerdicts`
5. `allTheoremsPassed`

Its minimum artifact/replay binding set should include:
1. `.engi/source-to-shares.json`
2. `.engi/settlement-participation.json`
3. `.engi/accounting-precision-report.json`
4. `.engi/journal-diff.json`
5. `.engi/journal-completeness-proof.json`
6. `.engi/settlement-proof.json`
7. `.engi/settlement-source-to-shares-proof.json`

Its minimum replay steps should include:
1. contribution/clipping/normalization replay,
2. participation replay,
3. exact-allocation replay,
4. journal-completeness replay,
5. theorem-bearing settlement replay.

### 12.12 Current drafting boundary

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
  theoremVerdicts: FamilyTheoremVerdictV16[]
  artifactBindings: FamilyArtifactBindingV16[]
  replaySteps: FamilyReplayStepV16[]
  allCasesPassed: boolean
  allTheoremsPassed: boolean
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
   - none beyond the currently realized family proof unless V16 later adds a second disclosure-family aggregate surface

### 13.8 Provisional witness-materialization and replay direction

The current family work now supports a first replay/witness direction as well.

V16 should provisionally prefer the following posture:

1. witness artifact paths should include all four primary family member artifacts plus the realized disclosure-boundary family proof,
2. replay artifacts should include all four primary family member artifacts plus the realized disclosure-boundary family proof,
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

### 13.11 Member closure criteria

For `disclosure-boundary`, a member is closed only when one canonical disclosure surface owns it directly, boundedness remains explicit, and replay reconstructs the full policy-to-disclosure path.

1. projection policy
   Closed only when principal visibility rules and artifact rules are explicit, first-class, and sufficient to determine allowed versus denied public artifact paths without borrowing later artifacts as substitutes.

2. bounded-public proof
   Closed only when the bounded-public artifact is first-class in witness and replay closure, remains metadata-bounded, and is not reduced to an indirect hash anchor under redaction/disclosure proof only.

3. redaction proof
   Closed only when redacted artifact paths, source-material paths, and latest-run field redactions agree with projection policy and bounded-public proof and remain directly replay-visible.

4. disclosure proof
   Closed only when allowed and denied public artifact paths, projection policy reference, and boundedness verdict all agree and can be reconstructed directly by family replay.

### Disclosure-boundary theorem binding and proof-shape realization

For V16, the `disclosure-boundary` theorem must bind directly to:
1. projection-policy closure,
2. bounded-public closure,
3. redaction closure,
4. disclosure closure,
5. and witness/replay/test closure.

The realized family proof shape should therefore expose:
1. per-member verdicts for policy, bounded-public, redaction, and disclosure members,
2. explicit agreement surfaces showing that redaction and disclosure remain downstream of policy and bounded-public truth rather than substitutes for them,
3. direct witness artifact paths for projection policy, bounded-public proof, redaction proof, and disclosure proof,
4. explicit failure surfaces when a new public path or redaction rule appears without family updates,
5. and test ratchets that fail on boundedness drift, policy drift, or allow/deny mismatch drift.

### Disclosure-boundary theorem catalog and family verdict schema

The current realization-basis theorem catalog for `disclosure-boundary` is:
1. `disclosure_boundary.projection_policy_closure`
2. `disclosure_boundary.bounded_public_metadata_only`
3. `disclosure_boundary.redaction_alignment`
4. `disclosure_boundary.disclosure_verdict_alignment`
5. `disclosure_boundary.witness_replay_closure`

The current theorem-by-theorem closure reading is:
1. `disclosure_boundary.projection_policy_closure`
   Projection policy must remain the primary disclosure authority and replay through `disclosure-boundary.policy-bounded-public`.
2. `disclosure_boundary.bounded_public_metadata_only`
   Bounded-public proof must prove that public disclosure remains metadata-bounded and policy-constrained through the same policy-bounded-public replay path.
3. `disclosure_boundary.redaction_alignment`
   Redaction proof must agree with the projection-policy and bounded-public story through `disclosure-boundary.redaction-disclosure`.
4. `disclosure_boundary.disclosure_verdict_alignment`
   Disclosure proof must remain aligned with bounded-public and redaction truth rather than acting as a substitute for them.
5. `disclosure_boundary.witness_replay_closure`
   Policy-bounded-public replay plus redaction-disclosure replay must reconstruct the full family's theorem-bearing closure.

The stable family verdict schema should therefore expose at least:
1. `projectionPolicyClosed`
2. `boundedPublicClosed`
3. `redactionClosed`
4. `disclosureClosed`
5. `witnessReplayClosed`
6. `memberVerdicts`
7. `allTheoremsPassed`

### Disclosure-boundary realized proof-object field design and artifact/replay binding

The current runtime surfaces that realize this family proof are `projectionPolicy`, `boundedPublicProof`, `redactionProof`, `disclosureProof`, and `disclosureBoundaryProof`.

They already carry `theoremVerdicts`, `artifactBindings`, `replaySteps`, `memberVerdicts`, and `allTheoremsPassed`.

V16 should preserve and ratchet that shape through:
1. `theoremVerdicts`
2. `artifactBindings`
3. `replaySteps`
4. `memberVerdicts`
5. `allTheoremsPassed`

Its minimum artifact/replay binding set should include:
1. `.engi/projection-policy.json`
2. `.engi/bounded-public-proof.json`
3. `.engi/redaction-proof.json`
4. `.engi/disclosure-proof.json`
5. `.engi/disclosure-boundary-proof.json`

Its minimum replay steps should include:
1. policy replay,
2. bounded-public replay,
3. redaction replay,
4. disclosure replay,
5. and policy-to-disclosure agreement replay.

### 13.12 Current drafting boundary

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
  theoremVerdicts: FamilyTheoremVerdictV16[]
  artifactBindings: FamilyArtifactBindingV16[]
  replaySteps: FamilyReplayStepV16[]
  allCasesPassed: boolean
  allTheoremsPassed: boolean
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

### 14.11 Member closure criteria

For `proof-contract`, a member is closed only when one canonical proof-contract surface owns it directly, witness closure names it explicitly, and replay reconstructs it without bundle-only substitution.

1. proof contract
   Closed only when proof contract is emitted directly or represented by a sanctioned first-class equivalent surface and cannot disappear while the bundle remains green.

2. evidence chain
   Closed only when each evidence-chain stage and its artifact refs are explicit, family-coherent, and replay-visible as proof-contract-local closure rather than bundle prose only.

3. theorem checks
   Closed only when each theorem claim is bound to witness-bearing artifacts and replay-visible closure rather than remaining a string list without explicit proof bindings.

4. system proof bundle
   Closed only when the bundle remains an explicit aggregation artifact whose closure agrees with proof contract, witness manifest, and replay entrypoint truth.

5. witness-manifest closure
   Closed only when the witness manifest is a first-class proof-contract family surface and the family fails if witness-manifest closure drifts out of alignment with contract or bundle truth.

### Proof-contract theorem binding and proof-shape realization

For V16, the `proof-contract` theorem must bind directly to:
1. proof-contract closure,
2. evidence-chain closure,
3. theorem-check closure,
4. system-proof-bundle closure,
5. witness-manifest closure,
6. and replay/test closure.

The realized family proof shape should therefore expose:
1. role-distinguished primary surfaces for contract, evidence chain, theorem checks, bundle, and witness manifest,
2. explicit theorem identities, scopes, and witness-bearing artifact paths,
3. direct replay steps for evidence-chain closure and theorem closure rather than bundle prose only,
4. explicit coherence verdicts between proof contract, bundle, and witness manifest,
5. and test ratchets that fail when a new theorem, artifact binding, or cross-family stage claim appears without proof-contract updates.

### Proof-contract theorem catalog and family verdict schema

The current realization-basis theorem catalog for `proof-contract` is:
1. `proof_contract.contract_materialization`
2. `proof_contract.evidence_chain_closure`
3. `proof_contract.theorem_check_binding`
4. `proof_contract.bundle_coherence`
5. `proof_contract.witness_manifest_coherence`
6. `proof_contract.replay_closure`

The current theorem-by-theorem closure reading is:
1. `proof_contract.contract_materialization`
   `proofContract` must exist as a distinct proof-bearing surface and replay through `proof-contract.contract-materialization`.
2. `proof_contract.evidence_chain_closure`
   The cross-family evidence chain must remain explicit, ordered, and replayable through `proof-contract.evidence-chain`.
3. `proof_contract.theorem_check_binding`
   Theorem checks must remain stably identified and bound to their carried artifacts within the same evidence-chain replay path.
4. `proof_contract.bundle_coherence`
   System proof bundle content must remain coherent with proof-contract truth and replay through `proof-contract.bundle-witness`.
5. `proof_contract.witness_manifest_coherence`
   Proof witness manifest must remain coherent with proof contract, bundle, and family witness surfaces through the same bundle-witness replay path.
6. `proof_contract.replay_closure`
   Contract-materialization, evidence-chain, and bundle-witness replay must together reconstruct the family's theorem-bearing closure.

The stable family verdict schema should therefore expose at least:
1. `contractMaterialized`
2. `evidenceChainClosed`
3. `theoremChecksBound`
4. `bundleCoherent`
5. `witnessManifestCoherent`
6. `replayClosed`
7. `memberVerdicts`
8. `allTheoremsPassed`

### Proof-contract realized proof-object field design and artifact/replay binding

The current runtime surface that realizes this family proof is `proofContract`, with direct family binding to the system proof bundle and proof-witness manifest rather than bundle-only substitution.

It already carries `theoremVerdicts`, `artifactBindings`, `replaySteps`, `memberVerdicts`, and `witnessArtifactPaths`, with theorem-bearing support from `theoremChecks` and `artifactBindingSummary`.

V16 should preserve and ratchet that shape through:
1. `theoremVerdicts`
2. `artifactBindings`
3. `replaySteps`
4. `memberVerdicts`
5. `allTheoremsPassed`

Its minimum artifact/replay binding set should include:
1. `.engi/proof-contract.json`
2. `.engi/system-proof-bundle.json`
3. `.engi/proof-witness-manifest.json`
4. and any theorem-bearing family artifacts referenced by `proofContract.evidenceChain` and theorem bindings.

Its minimum replay steps should include:
1. contract-materialization replay,
2. evidence-chain replay,
3. theorem-binding replay,
4. bundle-coherence replay,
5. and witness-manifest coherence replay.

### 14.12 Current drafting boundary

Proof-contract is still not fully formalized.

What it now does have is:

1. a first normalized case on proof-contract under-materialization,
2. a second normalized case on bundle versus witness/evidence/theorem role closure,
3. a provisional artifact direction,
4. an initial witness-materialization and replay direction,
5. an expected/realized/family-closure split,
6. and a provisional member-coverage inventory.
