# ENGI Spec V16 System Parity Matrix

## Status

- Scope: root system-canonical implementation/parity and proof-coverage debt for the V16 drafting pass
- Draft target: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V16.md`
- Anticipated notes companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V16_NOTES.md`
- Prior canonical anchor: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V15.md`
- Prior system parity ledger: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V15_SYSTEM_PARITY_MATRIX.md`
- Current canonical/latest target: `V15`
- Last fully realized canon preserved in source: `V15`
- V16 state: drafting and implementation-planning; not yet the canonical pointer target
- Primary implementation surface audited for this pass: `engi-demo`

## Purpose

This file begins the V16 root implementation/parity ledger for the proof-centered canon pass.

Its first job is not to claim V16 closure.
Its first job is to record, precisely, where the current V15 proof families overclaim, underprove, or fail to cover proof-bearing source reality.

The opening V16 focus is:
- `prompt-completeness` closure,
- `inference-synthesis` legitimacy and replay closure,
- `static-code-analysis` family-boundary and receipt-domain closure,
- `verification-decisions` family completeness and use-tier consequence closure,
- `selection-and-materialization` family completeness and selection-consistency closure,
- `authorization-and-sensitive-flow` identity/data-class/flow closure,
- `settlement-source-to-shares` theorem-bearing settlement closure,
- `disclosure-boundary` bounded-public and projection closure,
- `proof-contract` bundle/contract/witness closure,
- prompt-owned inferred-measurement coverage,
- parse-contract admissibility closure,
- downstream artifact-binding closure,
- source-annotation honesty for prompt-owned inferencing,
- family-member coverage within each proof family,
- and the first family-specific closure tests required to support later V16 proof execution.

## Interpretation rule

The correct V16 reading is:
- `V15` remains the active canonical/latest target,
- V16 is being drafted as the first proof-coverage-focused canon,
- this matrix is a requirements and parity ledger for that shift,
- and rows here describe confirmed implementation gaps, required proof expansions, and closure signals rather than accomplished closure.

This is the root system ledger.
It is not the demo-local implementation matrix.
For this drafting pass:
- `prompt-completeness` is the most tightened family,
- `inference-synthesis` is opened and provisionally shaped,
- `static-code-analysis` is now opened through full first-pass family closure design,
- `verification-decisions` is now opened through full first-pass family closure design,
- `selection-and-materialization` is now opened through full first-pass family closure design,
- `authorization-and-sensitive-flow`, `settlement-source-to-shares`, `disclosure-boundary`, and `proof-contract` are now also opened through full first-pass family closure design,
- and all nine V15 proof families are now inside the active V16 family pass.

## Member-tightening interpretation rule

Member inventories in this matrix are not closure claims by themselves.

For V16, a member-tightening row is only complete when it identifies:
- what makes the member belong to the family,
- which surface owns the member's primary truth,
- which failure modes the member proof must be able to express,
- which artifacts, witnesses, and replay steps must expose that truth,
- what exclusions or alias rules must be explicit,
- and which implementation ratchet or test should fail if the member drifts.

The family-specific member coverage ledgers below name the members.
The family-specific tightening signals below state the concrete parity work still required for each member.

## Theorem-binding interpretation rule

Theorem language in this matrix is not satisfied by descriptive strength alone.

For V16, a family theorem is only treated as parity-aligned when:
- each claimed family obligation is represented by an explicit family-proof verdict axis,
- the family proof can fail on those axes directly,
- member closure and family closure reconcile without hidden substitution,
- witness artifacts and replay steps expose theorem-bearing closure,
- and implementation ratchets or tests fail when theorem language gets ahead of proof-object strength.

The family-specific sections below use that rule to identify theorem-binding debt and proof-shape debt separately from member-inventory debt.

## Theorem-catalog ratchet rule

For V16, implementation ratchets should derive from named theorem units rather than from generic family prose.

That means each family's implementation ratchet should eventually fail on:
- missing theorem identifiers,
- missing verdict axes for named theorem units,
- missing witness/replay bindings for named theorem units,
- or tests that still pass after theorem-bearing surfaces drift.

## Proof-object realization ratchet rule

For V16, theorem catalogs are not enough by themselves.

Each family must also converge on:
- explicit proof-object fields for theorem verdicts, artifact bindings, replay steps, member verdicts, and aggregate theorem pass/fail,
- explicit artifact-path bindings for every theorem-bearing surface the family depends on,
- and explicit replay steps that reconstruct theorem closure rather than only naming artifacts.

## Audit basis

This matrix is grounded in:
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_TEMPLATEGUIDE.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V15.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V15_SYSTEM_PARITY_MATRIX.md`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/SPEC_V15_IMPLEMENTATION_MATRIX.md`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/src/engi-demo.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/src/canonical/prompting.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/src/canonical/need-measurement.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/src/canonical/evaluation-materialization.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/src/canonical/proof-materialization.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/src/canonical/run-artifacts.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/src/canonical/surfaces.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/test/core.test.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/test/api.test.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/test/e2e.test.js`

---

## V16 prompt-completeness implementation themes

This drafting pass is centered on five implementation rules:

1. Claimed proof coverage and actual proof-bearing source surfaces must be equal, not merely similar.
2. A proof family definition must be satisfied by its proof object, not by parallel artifacts that happen to exist elsewhere.
3. Source annotations about inferencing and provenance must describe the real execution path, not an aspirational one.
4. Downstream proof claims must be backed by explicit consumer validation and closure tests.
5. Prompt-family closure must fail on omission, vacuity, or false annotation rather than remaining satisfied by partial coverage.

---

## Prompt-Completeness parity debt collection approaches

This matrix should collect prompt-completeness parity debt through repeatable audits rather than through one-off observations.

The collection approaches for this family are:

1. Coverage-set equality audit
   Compare the full prompt-owned field set across:
   - `needDescriptor.inferredMeasurements`,
   - prompt-owned output declarations,
   - prompt surfaces,
   - parsed completion envelopes,
   - inferred evaluator interfaces,
   - and prompt-completeness case results.

   A mismatch is implementation debt, not harmless drift.

2. Theorem-to-proof-object audit
   Compare the family theorem language against the actual proof object shape.
   If theorem language names parse admissibility, downstream consumer closure, or field ownership closure and the proof object cannot fail on those axes, parity debt is confirmed.

3. Downstream consumer graph audit
   Enumerate the real consumers of each prompt-owned field across branch artifacts, run-artifact surfaces, operator surfaces, and projections.
   Diff that consumer graph against `downstreamArtifactBindings`.
   Both undeclared consumers and falsely declared consumers are family debt.

4. Provenance-truth audit
   Exercise each claimed source-precedence path with fixtures that toggle the claimed source input.
   If the annotation says a source won but the output does not actually come from that source, the family has provenance debt.

5. Artifact, witness, and replay audit
   Confirm that each prompt-family case is visible in emitted artifacts, witness structures, and replay instructions.
   Omission-class failures must be diagnosable without manual source archaeology.

6. Test-ratchet audit
   Convert each confirmed omission or false-claim class into a failing test.
   Prompt-completeness should not be treated as closed while its failure modes remain unencoded in the test graph.

---

## Prompt-Completeness specific implementation debts

The current prompt-completeness implementation debts are:

1. `closureCriteria` is classified as inferred need content but has no prompt family member, prompt contract, parse contract, parsed completion envelope, or family case.
2. `buildPromptCompletenessProof(...)` proves interpolation/completeness hygiene only and does not satisfy the full theorem language already attached to the family.
3. Parse-contract resolution and payload admissibility are computed in parsed-envelope artifacts but are not integrated into the family verdict.
4. `PromptTemplateContract` remains canonical prose without a first-class runtime registry or equivalent runtime object.
5. `ContextInjectableExpectation` remains canonical prose without a first-class runtime registry or equivalent runtime object.
6. `downstreamArtifactBindings` are declared but not validated against the real field-consumer graph.
7. Existing downstream bindings are already inaccurate or incomplete for current prompt-owned fields.
8. `fieldDerivations.*.source` can claim `scenario.*` precedence for prompt-owned inferencing paths that the runtime does not actually honor.
9. Prompt-completeness witnesses are aggregate-hash oriented and do not expose omitted cases directly enough for case-by-case audit.
10. Replay instructions can recompute the currently materialized family result but do not make omission-class failures explicit.
11. Tests currently permit prompt-family undercoverage, false provenance claims, and downstream-binding inaccuracies to remain green.

---

## Prompt-Completeness: current V16 implementation matrix

| Area | Current source truth | V16 implementation expectation | Closure signal | Judgment |
|---|---|---|---|---|
| Prompt-owned inferred-measurement coverage | `needDescriptor.inferredMeasurements` contains 5 fields: `task`, `failureModes`, `constraints`, `targetArtifactKinds`, `closureCriteria`; current prompts/contracts/envelopes/inference proofs/evaluator interfaces cover only 4 | prompt-bearing coverage must equal the inferred-measurement set, or `closureCriteria` must be reclassified out of prompt-owned inferred measurement | `inferredMeasurements == inferenceProofFields == promptOwnedFields == parsedOwnedFields == inferredEvaluatorInterfaces` | confirmed gap |
| `closureCriteria` proof-family membership | `closureCriteria` is computed by `inferClosureCriteria(...)`, typed as inferred, carried on `need.closureCriteria`, and consumed by needing/demo surfaces, but has no prompt contract or parsed envelope | V16 must choose one truthful posture: prompt-owned inferred field with full closure, or non-prompt field with explicit reclassification | explicit classification plus matching proof surface | confirmed gap |
| Prompt completeness theorem scope | current `buildPromptCompletenessProof(...)` checks placeholder/context closure only | V16 `prompt-completeness` must prove prompt-family closure, not just interpolation hygiene | proof object includes prompt-family coverage, parse-contract closure, downstream-binding closure, and zero-vacuity checks | confirmed gap |
| Parse-contract admissibility | parsed completion envelope artifact records `allContractsResolved` and `allPayloadsAdmissible`, but prompt-completeness proof does not incorporate those results | V16 must make parse-contract admissibility part of the family proof, not a sidecar fact | prompt-completeness closure fails if parse contracts are unresolved or payloads inadmissible | confirmed gap |
| Downstream artifact-binding truth | `downstreamArtifactBindings` are recorded on contracts, but current proof predicate does not validate them against real consumers or required branch artifacts | V16 must prove that downstream artifact bindings are complete and not falsely declared | undeclared consumers and false consumers are both detectable proof failures | confirmed gap |
| Downstream artifact-binding accuracy | current bindings already appear incomplete or inaccurate: `task` and `targetArtifactKinds` are rendered into `ENGI_NEED.md` but do not declare that consumer; `failureModes` declares `.engi/prompt-surfaces.json`, which is likely lineage/self-reference rather than a semantic consumer | V16 must distinguish semantic consumers, lineage artifacts, and proof-only surfaces | per-output consumer registry or validated consumer graph | confirmed gap |
| Source-annotation honesty for inferencing | `fieldDerivations.*.source` can claim `scenario.task`, `scenario.failureModes`, `scenario.constraints`, and `scenario.targetArtifactKinds`, but the actual infer functions ignore those `scenario.*` values and use `expected*` or synthesis | V16 provenance annotations must match actual precedence and execution | scenario override fixtures change produced outputs exactly when the derivation source claims they do | confirmed bug |
| Prompt family registry strength | V15 spec names current prompt families, required rendered fields, and allowed non-rendered fields, but implementation derives completeness from individual prompt surfaces rather than from a canonical per-family registry | V16 should add an explicit prompt-family registry and validate prompt instances against it | required/allowed fields are checked against a canonical registry rather than inferred from template text | open requirement |
| Non-rendered context enforcement | `repoPrivacy` is correctly declared as non-rendered for `need-measurement.constraints.v2`, but runtime enforcement remains local to the contract rather than family-driven | V16 should make hidden-context policy explicit per family and provably enforced | all non-rendered fields are family-authorized and zero undeclared hidden inputs remain | open requirement |
| Proof witness family adequacy | `prompt-completeness` witnesses currently compress to the prompt-completeness proof hash plus parsed-envelope artifact hash | V16 should decide whether family witnesses need per-prompt or per-contract references for auditability | witness structure supports per-case audit and replay, not just aggregate hashes | adjacent requirement |
| Test harness strength | current tests assert prompt count `>= 4`, `allContractsComplete === true`, parse-policy flags exist, and `closureCriteria` exists downstream, but do not assert coverage equality or admissibility closure | V16 tests must fail on omitted prompt-owned inferred fields, false provenance claims, false downstream bindings, and missing parse closure | dedicated proof-closure tests break on each omission class | confirmed gap |

---

## Prompt-Completeness case drill-down: `closureCriteria`

This is the first case V16 should use to define the full prompt-completeness closure standard.

`closureCriteria` is the strongest single case because:
- V15 already treats it as canonical need content,
- current source already computes and carries it,
- operators already see it in derived surfaces,
- and the prompt-completeness family currently does nothing to prove it.

### Case statement

The present implementation says, simultaneously:
- `closureCriteria` is inferred need content,
- `closureCriteria` must derive from measured benchmark/repo evidence,
- and `closureCriteria` is operator-visible downstream,

while also saying:
- no prompt owns it,
- no prompt contract binds it,
- no parse contract owns it,
- no parsed completion envelope carries it,
- and no prompt-completeness proof case checks it.

That makes `closureCriteria` the cleanest prompt-completeness parity failure in the current source/spec set.

### V15 specification precision and parity

| Layer | Current V15 truth | V16 precision reading |
|---|---|---|
| Needing surface semantics | `closureCriteria` is part of the needing surface in [ENGI_SPEC_V15.md:684](/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V15.md:684) | `closureCriteria` is not optional commentary; it is canonical needing-surface data |
| Needing invariants | V15 requires `taskSummary`, `failureModeSummary`, and `closureCriteria` to derive from measured benchmark/repo evidence in [ENGI_SPEC_V15.md:695](/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V15.md:695) | evidence-derived closure is already a V15 semantic requirement |
| Prompt-bearing ownership list | V15 prompt-bearing output ownership in [ENGI_SPEC_V15.md:2383](/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V15.md:2383) names `task`, `failureModes`, `constraints`, and `targetArtifactKinds`, but not `closureCriteria` | V15 is precise about the current prompt set, but that precision now exposes a parity gap rather than resolving it |
| Prompt-completeness theorem | V15 says prompt-owned fields must be backed by complete prompt contracts and admissible parse contracts in [ENGI_SPEC_V15.md:2780](/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V15.md:2780) | if `closureCriteria` remains prompt-owned inferred content in V16, it must join that closure set; if not, it must be explicitly reclassified |

The parity reading is:
- V15 semantic need truth already elevates `closureCriteria`,
- V15 prompt-family precision currently omits it,
- and V16 must resolve that mismatch explicitly rather than leaving it as an implementation accident.

### Current source implementation precision

| Source area | Current truth | Parity reading |
|---|---|---|
| Inference computation | `closureCriteria` is computed by `inferClosureCriteria(...)` in [need-measurement.js:351](/Users/garrettmaring/Developer/ENGI/engi-demo/src/canonical/need-measurement.js:351) | the field is actively inferred, not passive seed data |
| Derivation annotation | `fieldDerivations.closureCriteria.source` is recorded in [need-measurement.js:378](/Users/garrettmaring/Developer/ENGI/engi-demo/src/canonical/need-measurement.js:378) | provenance is already claimed for the field |
| Need descriptor inclusion | `closureCriteria` is stored on `needDescriptor`, included in `measurementClassInventory.inferredDerived`, and included in `inferredMeasurements` in [need-measurement.js:541](/Users/garrettmaring/Developer/ENGI/engi-demo/src/canonical/need-measurement.js:541) | source classifies it as inferred need content at the same level as the four prompt-owned fields |
| Prompt-bearing surfaces | no prompt surface, prompt contract, parsed completion envelope, or inferred evaluator interface is created for `closureCriteria` | prompt-completeness does not cover the field at all |
| Downstream use | `needingSurface.closureCriteria` is emitted in [surfaces.js:382](/Users/garrettmaring/Developer/ENGI/engi-demo/src/canonical/surfaces.js:382), and demo shell state also carries it in [demo-shell-state.js:284](/Users/garrettmaring/Developer/ENGI/engi-demo/src/demo-shell-state.js:284) | this is live operator/system data, not unused latent structure |

### Current prompt-completeness family reality for this case

For `closureCriteria`, the current family behavior is:

1. no prompt family member exists,
2. no `expectedOutputSchema` entry exists,
3. no `parseContractId` exists,
4. no parsed payload is normalized and hashed,
5. no prompt-completeness case reports on it,
6. no witness ref identifies its omission,
7. and no test fails because it is missing.

So the present family result is not “`closureCriteria` passed prompt-completeness.”
The present family result is “`closureCriteria` was outside the proof surface while still being treated as inferred need content.”

### V16 per-case proof expectations for `closureCriteria`

V16 should make this case satisfiable in one of two explicit ways.

#### Path A: keep `closureCriteria` prompt-owned

If V16 keeps `closureCriteria` as prompt-owned inferred content, the case must satisfy all of the following:

1. Prompt family declaration
   Add a canonical family member such as `need-measurement.closure-criteria.vN`.

2. Output ownership
   Declare `closureCriteria` as the owned output field in the prompt-family registry and prompt contract.

3. Context contract
   Declare the exact rendered and non-rendered context fields that justify closure criteria synthesis.
   At minimum this likely includes:
   - `failingCases`
   - `weakDimensions`
   - `targetArtifactKinds`
   - and any policy/boundedness context actually required by the implementation

4. Parse contract
   Require a strict object parse contract with exact top-level keys and an explicit payload schema for `closureCriteria: string[]`.

5. Parsed completion envelope
   Emit a normalized parsed completion envelope and include it in the parsed-envelope artifact closure path.

6. Downstream consumer contract
   Declare every real downstream consumer of `closureCriteria`, including at least the needing surface and any other emitted artifacts or projections that render it.

7. Prompt-completeness proof case
   Add a first-class case result for `closureCriteria` covering:
   - family-member presence,
   - placeholder/context completeness,
   - non-rendered-field legality,
   - parse-contract presence,
   - parsed-envelope admissibility,
   - downstream consumer closure.

8. Witness closure
   The family witness structure must expose this case explicitly enough that a missing `closureCriteria` prompt is detectable without manual source reading.

#### Path B: reclassify `closureCriteria` out of prompt-owned content

If V16 decides `closureCriteria` should not be prompt-owned, the case must still satisfy all of the following:

1. Reclassification truth
   Remove it from `inferredMeasurements` and `measurementClassInventory.inferredDerived`, or otherwise reclassify it so prompt-completeness no longer implicitly claims it.

2. Derivation truth
   Define the replacement proof story explicitly, for example deterministic synthesis, hybrid composition, or needing-surface-local derivation.

3. Downstream truth
   Keep its downstream semantic importance explicit and provable under the replacement classification.

4. Negative closure
   Prompt-completeness must explicitly exclude it by rule, not by accidental absence.

### V16 per-family expectations forced by this one case

The `closureCriteria` case forces the prompt-completeness family to adopt these family-wide expectations:

1. Coverage-totality expectation
   Every prompt-owned inferred measurement must have a case, and every case must correspond to a real owned field.

2. No-ghost-case expectation
   A field may not be classified as prompt-owned inferred content unless the family can actually prove it.

3. No-silent-exclusion expectation
   Any excluded field must be explicitly classified out of the family.

4. Parse-closure expectation
   Prompt-completeness is incomplete if parse-contract closure exists only as a side artifact rather than a family verdict.

5. Consumer-closure expectation
   Prompt completeness is incomplete if downstream artifact bindings are recorded but not validated.

6. Case-level witness expectation
   Aggregate hashes are not enough when a whole field can disappear without generating a failed family case.

### Concrete closure signals for this case

`closureCriteria` is closed for V16 only when one of the following is true:

1. Prompt-owned closure path
   - it appears in the prompt-family registry,
   - it has a prompt contract,
   - it has a parsed completion contract,
   - it has an admissible parsed completion envelope,
   - it has validated downstream consumers,
   - and prompt-completeness reports a passing case for it.

2. Explicit reclassification path
   - it is no longer classified as prompt-owned inferred content,
   - its replacement proof path is named and implemented,
   - and prompt-completeness explicitly excludes it by rule rather than omission.

Until one of those is true, `closureCriteria` remains the canonical example of prompt-completeness non-closure.

---

## Prompt-Completeness remaining surface parity

The family is not complete until each of its canonical surfaces has an explicit parity judgment.

### Canonical family surfaces

| Surface | V15 canonical expectation | Current source realization | V16 parity reading | Judgment |
|---|---|---|---|---|
| `PromptContract` | V15 defines `PromptContract` in [ENGI_SPEC_V15.md:2291](/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V15.md:2291) with placeholders, rendered/non-rendered fields, downstream bindings, expected output schema, and completeness object | implemented in `buildPromptContract(...)` in [prompting.js:233](/Users/garrettmaring/Developer/ENGI/engi-demo/src/canonical/prompting.js:233) | structure is present, but current completeness only proves placeholder/context closure; downstream bindings and parse-policy closure are not adjudicated | partial |
| `PromptTemplateContract` | V15 defines a per-family prompt template contract in [ENGI_SPEC_V15.md:2320](/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V15.md:2320) | no first-class runtime object exists; pieces are spread across prompt surfaces and contracts | V16 should make this an explicit runtime registry/object rather than a prose-only canonical shape | source gap |
| `ContextInjectableExpectation` | V15 defines canonical context-injectable expectations in [ENGI_SPEC_V15.md:2332](/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V15.md:2332) | no explicit runtime registry; expectations are implicit in each prompt definition | V16 should materialize this into a family registry and validate prompt cases against it | source gap |
| `PromptSurface` | V15 defines `PromptSurface` in [ENGI_SPEC_V15.md:2340](/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V15.md:2340) | implemented in `buildPromptSurface(...)` in [prompting.js:367](/Users/garrettmaring/Developer/ENGI/engi-demo/src/canonical/prompting.js:367) and emitted to `.engi/prompt-surfaces.json` in [evaluation-materialization.js:1935](/Users/garrettmaring/Developer/ENGI/engi-demo/src/canonical/evaluation-materialization.js:1935) | structure is strong and carries lineage well, but family closure still tolerates omitted prompt-owned fields | partial |
| `ParsableCompletionContract` | V15 defines `ParsableCompletionContract` in [ENGI_SPEC_V15.md:2415](/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V15.md:2415) | embedded inside each prompt surface as `parsableCompletionContract` in [prompting.js:425](/Users/garrettmaring/Developer/ENGI/engi-demo/src/canonical/prompting.js:425) | contract presence is recorded, but family closure does not fail on missing/admissibility problems today | partial |
| Parsed completion envelope | V15 requires parse-bearing prompt lineage and admissible payload closure | implemented in `buildParsedCompletionEnvelope(...)` in [prompting.js:464](/Users/garrettmaring/Developer/ENGI/engi-demo/src/canonical/prompting.js:464) | envelope structure is present, but omitted cases can disappear silently if no prompt exists for them | partial |
| Parsed completion envelope artifact | V15 current source reading already elevates parsed-completion-envelope artifacts in [ENGI_SPEC_V15.md:2408](/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V15.md:2408) | implemented in [prompting.js:517](/Users/garrettmaring/Developer/ENGI/engi-demo/src/canonical/prompting.js:517) with `allContractsResolved` and `allPayloadsAdmissible`, emitted at `.engi/parsed-completion-envelopes.json` in [evaluation-materialization.js:1938](/Users/garrettmaring/Developer/ENGI/engi-demo/src/canonical/evaluation-materialization.js:1938) | strong sidecar surface, but its verdicts are not integrated into the family proof result | partial |
| Prompt-completeness proof object | V15 theorem requires prompt-owned fields to be backed by complete prompt contracts and admissible parse contracts in [ENGI_SPEC_V15.md:2780](/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V15.md:2780) | implemented in `buildPromptCompletenessProof(...)` in [prompting.js:325](/Users/garrettmaring/Developer/ENGI/engi-demo/src/canonical/prompting.js:325) and emitted to `.engi/prompt-completeness-proof.json` in [evaluation-materialization.js:1937](/Users/garrettmaring/Developer/ENGI/engi-demo/src/canonical/evaluation-materialization.js:1937) | underpowered relative to theorem scope | confirmed gap |
| Prompt implementation surface | current source includes `buildPromptImplementationSurface(...)` in [run-artifacts.js:217](/Users/garrettmaring/Developer/ENGI/engi-demo/src/canonical/run-artifacts.js:217) | realized inside the system proof bundle in [run-artifacts.js:302](/Users/garrettmaring/Developer/ENGI/engi-demo/src/canonical/run-artifacts.js:302) | useful audit surface, but not yet used to enforce prompt-family coverage equality | partial |
| Required branch artifacts | prompt-completeness surfaces should survive as first-class branch artifacts | `.engi/prompt-surfaces.json`, `.engi/prompt-contracts.json`, `.engi/prompt-completeness-proof.json`, and `.engi/parsed-completion-envelopes.json` are required in [evaluation-materialization.js:1850](/Users/garrettmaring/Developer/ENGI/engi-demo/src/canonical/evaluation-materialization.js:1850) | artifact presence is strong, but artifact presence alone is not family closure | partial |
| Deliverable classification | prompt-completeness artifacts should have explicit confidentiality/disclosure posture | deliverables classify prompt artifacts in [run-artifacts.js:595](/Users/garrettmaring/Developer/ENGI/engi-demo/src/canonical/run-artifacts.js:595) | this is good family-adjacent parity, but not yet used to validate downstream consumer truth | partial |
| Witness-family closure | witness family should make prompt-completeness auditable | witness family is registered in [proof-materialization.js:353](/Users/garrettmaring/Developer/ENGI/engi-demo/src/canonical/proof-materialization.js:353) | current witness closure is aggregate-hash based and does not identify missing prompt-owned cases | partial |
| Replay closure | system proof bundle should let reviewers replay prompt-completeness | replay instructions in [run-artifacts.js:358](/Users/garrettmaring/Developer/ENGI/engi-demo/src/canonical/run-artifacts.js:358) include recomputing prompt completeness from prompt contracts and parsed envelopes | replay exists, but only for the currently materialized set; omission-class failures are not made explicit | partial |
| Test closure | tests should fail when family closure breaks | tests assert prompt counts, parse ids, parse strictness, and aggregate completeness in [core.test.js:237](/Users/garrettmaring/Developer/ENGI/engi-demo/test/core.test.js:237), [core.test.js:595](/Users/garrettmaring/Developer/ENGI/engi-demo/test/core.test.js:595), and API visibility in [api.test.js:404](/Users/garrettmaring/Developer/ENGI/engi-demo/test/api.test.js:404) | tests do not encode coverage-totality, parse-admissibility closure, or downstream-binding closure | confirmed gap |

### Family surface completion requirements

Prompt-completeness is complete for V16 only when all of the following are true:

1. Spec object parity
   Every V15 prompt-completeness object shape that remains canonical in V16 has a corresponding runtime object or explicit justified non-runtime status.

2. Runtime surface parity
   Prompt family membership, context expectations, parse contracts, parsed envelopes, and family verdicts are all present as first-class runtime surfaces.

3. Artifact parity
   The branch artifact set contains every prompt-completeness surface required for replay, and the family proof can explain why each artifact exists.

4. Witness parity
   Witness refs can expose missing prompt cases directly rather than only indirectly through aggregate hashes.

5. Replay parity
   Replay instructions are sufficient to recompute not just the current proof hash, but the full case inventory and its pass/fail outcomes.

6. Test parity
   The test graph fails on:
   - missing prompt-owned fields,
   - missing prompt-template contracts,
   - missing parse contracts,
   - inadmissible parsed envelopes,
   - false downstream consumers,
   - and false provenance annotations.

### Remaining prompt-completeness parity debt after `closureCriteria`

Even after the `closureCriteria` case is resolved, the family is still not complete unless V16 also closes the following surface debts:

1. `PromptTemplateContract` must stop being prose-only.
2. `ContextInjectableExpectation` must stop being prose-only.
3. `buildPromptCompletenessProof(...)` must incorporate parse-contract/admissibility closure explicitly.
4. downstream consumer validation must be mechanized against real branch artifacts and field consumers.
5. witness refs must become case-sensitive enough to reveal omitted fields directly.
6. tests must ratchet from aggregate-green checks to closure-complete checks.

---

## Prompt-Completeness: immediate V16 implementation program

The prompt-completeness family should be implemented in V16 in this order:

1. Fix inferencing provenance truth.
   `fieldDerivations.*.source` must describe actual source precedence, or the infer functions must be changed to honor the claimed `scenario.*` precedence.

2. Resolve `closureCriteria`.
   Either:
   - add `need-measurement.closure-criteria.vN` with prompt surface, prompt contract, parsed completion envelope, inference proof, evaluator interface, witness refs, and downstream bindings,
   or:
   - reclassify `closureCriteria` out of `inferredMeasurements` / `inferred-derived` and document the new truth explicitly.

3. Expand the prompt-completeness proof object.
   It should no longer only report:
   - missing placeholder bindings,
   - unused context fields,
   - undeclared non-rendered fields.

   It should additionally prove:
   - prompt-family membership closure,
   - parse-contract presence and strictness closure,
   - parsed-envelope admissibility closure,
   - downstream artifact-binding closure,
   - output-ownership closure,
   - zero-vacuity coverage for all required prompt-owned fields.

4. Add a canonical prompt-family registry.
   The registry should name:
   - prompt family id,
   - owned output field,
   - required rendered context fields,
   - allowed non-rendered context fields,
   - required downstream artifact consumers,
   - parse mode and exact-key policy,
   - proof family membership.

5. Validate downstream consumers against emitted artifacts.
   V16 should stop treating downstream bindings as inert strings and instead prove them against the branch artifact graph and real field consumers such as:
   - `.engi/need.json`,
   - `.engi/match-report.json`,
   - `.engi/eval-manifest.json`,
   - `.engi/artifact-upload-manifest.json`,
   - `ENGI_NEED.md`,
   - and any proof-bundle or projection surfaces that genuinely consume the output.

6. Strengthen tests to encode closure.
   Tests should assert exact equality between:
   - inferred measurement fields,
   - inference proof fields,
   - prompt-owned fields,
   - parsed-envelope owned fields,
   - inferred evaluator interfaces.

   They should also include negative cases for:
   - missing prompt family members,
   - false downstream bindings,
   - false source annotations,
   - unresolved parse contracts,
   - inadmissible parsed payloads.

---

## Prompt-Completeness artifact-materialization determination guide

The family should now use the same canonical precision pattern being applied to inference-synthesis:
- expected truth objects,
- realized truth objects,
- family closure object,
- and explicit artifact/witness/replay determination.

### First-class artifact rule

A surface should be a mandatory first-class prompt-completeness artifact when any of the following is true:

1. it is a primary proof-bearing object rather than a summary,
2. replay depends on it directly,
3. multiple family surfaces need to close back to it,
4. it carries unique expected-family or realized-run truth,
5. its absence would force an auditor to reconstruct prompt-family closure from unrelated artifacts,
6. or tests need to fail specifically on its disappearance or drift.

### Explicit witness-structure rule

A surface may remain an explicit witness structure rather than a mandatory standalone artifact only when all of the following are true:

1. it is derivative or aggregate rather than primary,
2. it is losslessly reconstructible from first-class prompt-completeness artifacts,
3. its reconstruction path is named in replay instructions,
4. its absence does not erase unique prompt-family truth,
5. and witness refs remain concrete enough to audit the reconstructed object without ambiguity.

### Provisional prompt-completeness determinations

Under that rule, the current provisional V16 determination is:

1. Mandatory first-class family artifacts
   - `.engi/prompt-family-registry.json` or equivalent runtime registry surface
   - `.engi/prompt-contracts.json`
   - `.engi/prompt-surfaces.json`
   - `.engi/parsed-completion-envelopes.json`
   - `.engi/prompt-completeness-proof.json`

2. Conditionally first-class; explicit witness structure acceptable only if reconstruction is exact and named
   - prompt implementation surface

3. Not acceptable as surrogate primary closure
   - bundle-only carriage
   - aggregate-hash-only witness substitution
   - nearby family-adjacent artifacts standing in for missing prompt-family closure surfaces

### Current preferred determination

The current preferred V16 posture is:

1. treat prompt family registry, prompt contracts, prompt surfaces, parsed envelopes, and family proof as first-class family artifacts,
2. allow prompt implementation surface to remain an explicit witness structure only if it stays exactly reconstructible and replay-addressable,
3. and stop relying on aggregate hashes or bundle-only carriage as substitutes for primary prompt-completeness closure surfaces.

### Prompt-Completeness case drill-down: witness-materialization and replay closure

This is the next prompt-completeness tightening move after artifact determination.

It is the right next case because:
- the family now has a provisional first-class artifact split,
- current source already emits most of the relevant surfaces,
- but witness paths and replay instructions still understate the full family closure story.

#### Case statement

The current source says:
- prompt-completeness is a first-class proof family,
- the family emits prompt surfaces, prompt contracts, parsed envelopes, and a family proof artifact,
- and the system proof bundle is replayable,

but the family's witness structure and replay instructions still describe a narrower closure path than the family actually needs.

#### V15 specification precision and parity

For this case, V15 already requires:
- prompt-owned fields are backed by complete prompt contracts and admissible parse contracts,
- proof-relevant artifacts are either digested into the witness manifest or explicitly represented by a family witness structure,
- and the branch artifact family is dense enough for reviewers to understand what was emitted and why.

The V16 parity reading is:
- prompt-completeness replay and witness closure must cover expected family truth, realized run truth, and family verdict truth,
- not only the prompt contracts plus parsed-envelope artifact subset.

#### Current source implementation precision

Current source exposes the following witness/replay posture:

1. Prompt-completeness witness artifact paths are currently:
   - `.engi/prompt-contracts.json`
   - `.engi/prompt-completeness-proof.json`
   - `.engi/parsed-completion-envelopes.json`

2. `.engi/prompt-surfaces.json` is emitted and is clearly family-relevant, but it is not named as a prompt-completeness witness artifact.

3. Replay artifacts currently include:
   - `.engi/prompt-contracts.json`
   - `.engi/parsed-completion-envelopes.json`
   but not prompt surfaces or a prompt-family registry/equivalent expected-truth surface.

4. Replay instructions currently say:
   - recompute prompt completeness from prompt contracts and compare the proof hash,
   - recompute parsed completion envelopes from prompt contracts and deterministic outputs, then compare the artifact hash.

5. There is no explicit prompt-completeness replay instruction that says how to reconstruct:
   - family membership coverage,
   - prompt-family registry closure,
   - downstream-consumer closure,
   - witness closure,
   - or omission-class failure detection.

#### Current prompt-completeness family reality for this case

For witness-materialization and replay closure, the family currently behaves as follows:

1. primary family surfaces are mostly emitted,
2. witness structure names only a subset of those emitted surfaces,
3. replay can partially reconstruct parse-bearing closure,
4. but replay does not yet reconstruct the full family case inventory or the expected-versus-realized prompt-family closure path.

So the family result is not “prompt-completeness is fully replayable first-class witness closure.”
The family result is “prompt-completeness is substantially materialized, but replay and witness closure remain narrower than the family's full target.”

#### V16 per-case expectations

V16 should require all of the following for this case:

1. First-class witness closure
   Prompt family registry/equivalent expected-truth surface, prompt contracts, prompt surfaces, parsed envelopes, and family proof must all be covered directly as first-class family witness artifacts or as explicit, exact witness structures.

2. Replay completeness
   Replay artifacts and replay instructions must explicitly cover:
   - expected family membership and registry truth,
   - realized prompt surfaces and contracts,
   - parsed-envelope admissibility,
   - downstream-consumer closure,
   - and family-level prompt-completeness closure.

3. No subset replay substitution
   Replay over prompt contracts plus parsed envelopes alone is not enough if it cannot expose omitted prompt-family members or downstream-consumer failures.

4. Deliverables visibility
   The deliverables story must make the family-critical prompt artifacts visible as intentional proof surfaces.

5. Family failure on replay/witness under-materialization
   Prompt-completeness must fail if a family-critical surface disappears from witness or replay coverage without an explicit reconstructible replacement path.

#### Family-wide expectations forced by this case

This one case forces prompt-completeness to adopt at least these family-wide rules:

1. Witness structure must match the family's actual closure model
   If prompt surfaces and registry truth are required for closure, witness structure must say so.

2. Replay must reconstruct case inventory, not just aggregate proof hashes
   Aggregate recomputation is not enough if omission-class failures can remain hidden.

3. Expected truth and realized truth both belong in replay
   Prompt-family registry truth and realized prompt surfaces must both be replay-addressable.

4. Bundle-only or nearby-surface substitution is not enough
   Family-critical prompt-completeness surfaces need direct witness/replay treatment rather than indirect implication.

#### Concrete closure signals for this case

Witness-materialization and replay closure are closed for prompt-completeness only when:

1. the family's critical surfaces are explicitly materialized or explicitly reconstructible,
2. witness paths name those surfaces honestly,
3. replay can reconstruct expected family truth, realized prompt truth, and family verdict truth,
4. deliverables make those surfaces visible and intentional,
5. and tests break if any of those witness or replay surfaces disappear or drift.

### Prompt-Completeness member coverage ledger

The current provisional family-member coverage reading is:

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
   Current debt: this remains the family's strongest explicit omission and canonical non-closure case.

### Prompt-Completeness member tightening signals

1. `task`
   Closed only when prompt contract, parsed envelope, semantic consumer graph, witness paths, replay, and tests all agree on the same `task` ownership and consumption story.

2. `failureModes`
   Closed only when prompt contract, parsed envelope, semantic consumer graph, witness paths, replay, and tests all agree on the same `failureModes` ownership and consumption story without lineage-only consumer leakage.

3. `constraints`
   Closed only when prompt contract, parsed envelope, non-rendered-context legality, consumer graph, witness paths, replay, and tests all agree on the same `constraints` closure story.

4. `targetArtifactKinds`
   Closed only when prompt contract, parsed envelope, artifact-planning consumer graph, witness paths, replay, and tests all agree on the same `targetArtifactKinds` closure story.

5. `closureCriteria`
   Closed only when V16 either promotes it into a full prompt member with contract/envelope/witness/replay/test closure or explicitly reclassifies it out of the family with a named replacement proof path.

---

## Prompt-Completeness theorem-binding and proof-shape ratchets

1. theorem-binding debt
   The family theorem already names coverage totality, parse admissibility, downstream-consumer closure, and provenance truth, but the current proof object cannot fail on all of those axes directly.

2. required proof-shape direction
   V16 should require expected-member, realized-member, and explicit-exclusion sets plus per-member contract/admissibility/consumer/provenance verdicts and family-level closure verdicts on each theorem axis.

3. implementation ratchet
   A new prompt-owned field, parse obligation, or semantic downstream consumer must fail family closure unless registry truth, family proof, witnesses, replay, and tests are updated together.

4. minimum theorem-catalog target
   `prompt_completeness.coverage_totality`, `prompt_completeness.no_ghost_coverage`, `prompt_completeness.explicit_exclusion_closure`, `prompt_completeness.contract_closure`, `prompt_completeness.parsed_envelope_admissibility`, `prompt_completeness.downstream_consumer_closure`, `prompt_completeness.provenance_truth`, and `prompt_completeness.witness_replay_closure` should each map to explicit verdict axes.

5. minimum proof-object field target
   The family proof should carry `theoremVerdicts`, `artifactBindings`, `replaySteps`, `memberVerdicts`, and `allTheoremsPassed` rather than aggregate booleans only.

6. minimum artifact/replay binding target
   The family should bind `.engi/prompt-contracts.json`, `.engi/prompt-surfaces.json`, `.engi/parsed-completion-envelopes.json`, `.engi/prompt-completeness-proof.json`, and registry truth when realized, with replay steps for member-set, parse, consumer, provenance, and exclusion closure.

## Current V16 closure reading

For the present drafting pass:
- V15 prompt completeness is useful but not closure-complete,
- the `closureCriteria` omission is a first-order proof-coverage defect,
- the current proof object overstates what it proves relative to the theorem language,
- and downstream artifact binding plus inferencing provenance truth are both real implementation requirements, not cosmetic notes.

That is the starting point for the V16 proof-centered canon.

---

## Inference-Synthesis: initial V16 discovery ledger

This second-family pass is intentionally narrower than the prompt-completeness pass.
The job here is to establish the first confirmed parity failures and the first V16 precision requirements before drafting the full family closure shape.

V15 currently defines `inference-synthesis` as:
- inferred fields are owned by declared evaluators,
- remain traceable to declared evidence,
- record prompt/model identity,
- stay replayable at the trace level,
- distinguish prompted inference from static measurement,
- and make stand-in versus live evaluator status explicit.

### Inference-Synthesis parity debt collection approaches

This family should collect parity debt through the following repeatable audits:

1. Inferred-field coverage-set equality audit
   Compare:
   - `need.inferredMeasurements`,
   - field-level inference proofs,
   - inferred `measurementProvenance` trace ids,
   - eval-manifest inferred evaluator interfaces,
   - and prompt implementation `inferredOutputs`.

2. Evaluator-status consistency audit
   Compare stand-in/live status across:
   - field-level inference proofs,
   - eval-manifest evaluator interfaces,
   - prompt implementation surfaces,
   - and external-boundary descriptions.

3. Evidence-basis audit
   Compare each field-level inference proof's `evidenceRefs` against:
   - the prompt context inputs used to produce that field,
   - the field-derivation evidence basis,
   - and any declared evaluator/moment contract for that field.

4. Witness-materialization audit
   Compare V15's required witness families for inference synthesis against the actual emitted artifact set and witness-manifest paths.

5. Family-proof-shape audit
   Determine whether current per-field proofs plus aggregate witness hashing are enough, or whether V16 needs an explicit family-level inference-synthesis proof object.

6. Test-ratchet audit
   Convert omission, contradiction, and underdeclared-evidence findings into failing tests before treating the family as closed.

### Inference-Synthesis specific implementation debts

The current inference-synthesis implementation debts are:

1. `closureCriteria` is classified as inferred content but has no field-level inference proof or inferred provenance trace.
2. Prompt-bearing inference proofs currently misreport stand-in/live status.
3. The evaluator-surface default for inferred mode silently creates false non-stand-in classifications unless callers override it.
4. Inference proof `evidenceRefs` do not yet obviously close over the full declared evidence basis for each inferred field.
5. V15 names evaluator surfaces, inference proofs, and prompt implementation surfaces as required witnesses, but current emitted witness artifacts do not expose all of those surfaces directly.
6. The current inference-synthesis witness family uses `prompt-contracts` as a witness artifact even though V15 family language emphasizes evaluator and inference-proof surfaces instead.
7. Inference proofs and prompt implementation surfaces are not yet first-class branch artifacts.
8. The family currently lacks an explicit family-level closure verdict beyond witness-manifest aggregation.
9. Tests currently verify family presence rather than family truth.

### First-pass discovery matrix

| Area | Current source truth | V16 initial reading | Judgment |
|---|---|---|---|
| Inferred-field coverage equality | current `need.inferredMeasurements` contains 5 inferred fields, but `inferenceProofs`, inferred `measurementProvenance` entries, and prompt implementation `inferredOutputs` cover only 4 | inference-synthesis cannot claim full inferred-field coverage while `closureCriteria` remains outside the family surfaces | confirmed gap |
| Stand-in versus live evaluator truth | current inference proofs use model id `deterministic-local-evaluator.v15`, but `evaluatorSurface.standIn` is `false` for all four fields | V16 must make evaluator status truthful at the family surface, not only in surrounding prose | confirmed bug |
| Evidence-ref closure | current inference proofs carry evidence refs, but those refs are narrower than the actual prompt context and derivation basis used by several fields | V16 must decide whether inference proofs own the full evidence basis directly or reference a richer declared evaluator/input contract | confirmed gap |
| Witness artifact completeness | V15 names prompt surfaces, evaluator surfaces, inference proofs, prompt implementation surfaces, and parsed envelopes as required witnesses, but current emitted artifacts only make some of these first-class; inference proofs and prompt implementation survive mainly inside the bundle or aggregate witness refs | V16 should stop hiding core inference-synthesis witnesses behind bundle-only or hash-only closure | confirmed gap |
| Family test strength | current tests assert the family exists and has witness refs, but do not fail on omitted inferred fields, false stand-in status, or underdeclared evidence refs | V16 needs family-specific failure tests rather than aggregate witness presence checks | confirmed gap |

### Early confirmed reasoning

The first-pass reading for `inference-synthesis` is:

1. The family shares the `closureCriteria` undercoverage problem with prompt-completeness, but its claim is broader.
   `inference-synthesis` governs inferred fields as such, not only prompt-contract completeness.

2. The family has an execution-truth problem that prompt-completeness did not surface directly.
   The current runtime says the evaluator model is deterministic-local while the evaluator surface says `standIn: false`.

3. The family has a witness-materialization problem.
   V15 names inference proofs and prompt implementation surfaces as required witness material, but current branch artifacts do not expose them as first-class emitted files.

4. The family likely needs a stronger distinction between:
   - field-level inference proof,
   - evaluator/moment contract,
   - measurement provenance trace,
   - and family-level closure verdict.

### Immediate next V16 tightening questions

The next discovery pass for this family should answer:

1. Should inference-synthesis in V16 gain an explicit family proof object rather than relying on per-field `InferenceSynthesisProof` entries plus witness-manifest aggregation?
2. Should evidence closure be judged against prompt context inputs, field derivations, or a new consolidated evaluator/moment registry?
3. Should inference proofs and prompt implementation surfaces become standalone branch artifacts for first-class witness closure?
4. Should `closureCriteria` join inference-synthesis before or in lockstep with its prompt-completeness resolution?

### Inference-Synthesis case drill-down: evaluator-status truth

This is the first inference-synthesis case to tighten beyond discovery.

It is the right first case because:
- it is unique to inference-synthesis rather than merely shared with prompt-completeness,
- it is already contradicted by current source surfaces,
- and V15 already names stand-in versus live evaluator status as an explicit family obligation.

#### Case statement

The current source says, simultaneously:
- the model-execution boundary is `implemented-as-stand-in`,
- eval-manifest evaluator interfaces for prompt-bearing need measurement use `standIn: true`,
- the prompt implementation surface says deterministic/local stand-ins emulate prompt/evaluator contracts,
- and the field-level inference proofs for those same prompt-bearing evaluators use `standIn: false`.

That is not merely missing detail.
It is direct family contradiction.

#### V15 specification precision and parity

For this case, V15 already requires:
- `EvaluatorSurface.standIn: boolean`,
- `InferenceMomentContract.boundaryTruth`,
- explicit stand-in versus live boundary truth,
- and inference synthesis to prove that stand-in versus live evaluator status is explicit.

The V16 parity reading is:
- if a prompt-bearing evaluator is implemented as a deterministic/local stand-in,
- every inference-synthesis surface that names that evaluator must say so truthfully,
- and no family surface may quietly present the same evaluator as both stand-in and non-stand-in.

#### Current source implementation precision

The current implementation splits the same truth across conflicting surfaces:

1. `buildEvaluatorSurface(...)` defaults `standIn = mode !== 'inferred'`.
   That means prompt-bearing inferred evaluators become `standIn: false` unless callers override it.

2. `buildInferenceProof(...)` calls `buildEvaluatorSurface(...)` without overriding `standIn`.
   So current field-level inference proofs for:
   - `need-measurement.task.v2`,
   - `need-measurement.failure-modes.v2`,
   - `need-measurement.constraints.v2`,
   - `need-measurement.target-artifact-kinds.v2`

   all report `standIn: false`.

3. `buildEvalManifest(...)` explicitly emits evaluator interfaces for those same prompt-bearing evaluators with `standIn: true`.

4. The external boundary manifest marks model execution as `implemented-as-stand-in`.

5. The prompt implementation surface says deterministic/local stand-ins emulate the evaluator contracts.

The family therefore already contains two incompatible evaluator-status stories.

#### Current inference-synthesis family reality for this case

For evaluator-status truth, the family currently behaves as follows:

1. field-level inference proofs imply prompt-bearing evaluators are not stand-ins,
2. eval-manifest interfaces imply prompt-bearing evaluators are stand-ins,
3. external boundary surfaces imply prompt-bearing evaluators are stand-ins,
4. prompt implementation narrative implies prompt-bearing evaluators are stand-ins,
5. no family-level closure rule adjudicates the contradiction,
6. no witness structure makes the contradiction itself a failure case,
7. and no current test fails because the surfaces disagree.

So the family result is not “stand-in status is explicit.”
The family result is “multiple incompatible stand-in stories coexist.”

#### V16 per-case expectations

V16 should require all of the following for this case:

1. Single-source evaluator-status truth
   One canonical runtime source must determine stand-in versus live status for each evaluator or moment.

2. Surface agreement
   Inference proofs, evaluator interfaces, prompt implementation surfaces, external boundary surfaces, and any later family proof object must agree on evaluator status.

3. Boundary agreement
   If the external boundary says model execution is implemented as a stand-in, prompt-bearing inferred evaluators cannot appear as live/non-stand-in in inference proofs.

4. Family failure on contradiction
   A disagreement across evaluator-status surfaces must make inference-synthesis fail.

5. Witness and replay exposure
   The disagreement must be auditable from emitted artifacts and replay instructions rather than discoverable only by source reading.

#### Family-wide expectations forced by this case

This one case forces inference-synthesis to adopt at least these family-wide rules:

1. No contradictory evaluator-status surfaces
   Stand-in versus live truth is not allowed to vary by artifact without an explicit modeled reason.

2. No default-driven falsehood
   Convenience defaults in surface builders must not silently misclassify inferred evaluators.

3. Boundary truth belongs inside family closure
   External-boundary truth and evaluator-surface truth must be part of the same closure story.

4. Case-level contradiction tests
   Family tests must fail when evaluator status differs across field proofs, evaluator interfaces, and boundary artifacts.

#### Concrete closure signals for this case

Evaluator-status truth is closed for V16 only when:

1. each prompt-bearing inferred evaluator has one canonical stand-in/live status,
2. `InferenceSynthesisProof.evaluatorSurface.standIn` agrees with eval-manifest interfaces,
3. prompt implementation and boundary surfaces agree with the same status,
4. witness/replay surfaces expose the status explicitly enough to audit,
5. and a test breaks if any of those surfaces disagree.

### Inference-Synthesis case drill-down: `task` evidence-basis closure

This is the second inference-synthesis case to tighten.

It is the right next case because:
- V15 defines inference synthesis in terms of declared evidence traceability,
- `task` is the simplest high-visibility inferred field,
- and current source already exposes a concrete mismatch between the field-level proof evidence and the actual prompt context/evidence basis used to produce the field.

#### Case statement

For `task`, the current system says:
- the field-level inference proof is evidence-traceable,
- the prompt surface records the context that actually drives task synthesis,
- and the field derivation records a source/evidence basis for the same output,

but those three evidence stories are not equal.

The current task inference proof carries only:
- benchmark run id,
- workflow path,
- repo,
- benchmark harness path.

The actual prompt context for `need-measurement.task.v2` additionally uses:
- `baseRef`,
- `failingCases`,
- `weakDimensions`,
- `touchedPaths`,
- and derived `constraints`.

So the field-level inference proof currently proves less evidence than the prompt actually consumes.

#### V15 specification precision and parity

For this case, V15 already requires:
- inferred fields remain traceable to declared evidence,
- every inferred field references declared static evidence,
- every inference/evaluator moment has declared input/evidence expectations,
- and every owned field can be traced back to the declared evaluator family.

The V16 parity reading is:
- if a field-level inference proof claims evidence traceability,
- that proof must either enumerate the full evidence basis that materially drove the output,
- or explicitly reference a richer evaluator/moment contract that does so.

Partial evidence subsets are not enough when the proof object itself is the field-level legitimacy surface.

#### Current source implementation precision

For `task`, current source exposes three related but non-equal evidence surfaces:

1. Field-level inference proof
   `inferenceProof('task', evidenceRefs, 'need-measurement.task.v2')` carries:
   - run id,
   - workflow path,
   - repo,
   - benchmark harness path.

2. Prompt context evidence basis
   The prompt surface for `need-measurement.task.v2` also uses evidence-bearing inputs for:
   - `baseRef`,
   - `failingCases`,
   - `weakDimensions`,
   - `touchedPaths`,
   - and `constraints`.

3. Field derivation evidence basis
   `fieldDerivations.task` records a source and a narrower evidence set again.

The result is not a single closed evidence story.
It is three overlapping evidence stories with no rule saying which one is the canonical inference-synthesis proof basis.

#### Current inference-synthesis family reality for this case

For `task` evidence-basis closure, the family currently behaves as follows:

1. the prompt surface can explain more of the output basis than the field-level inference proof can,
2. the field derivation explains a different subset again,
3. no family rule requires those evidence surfaces to close over one another,
4. no witness structure exposes the underdeclared-evidence mismatch as a failed case,
5. and no current test fails because the field proof names only a subset of the actual evidence basis.

So the family result is not “`task` is traceable to declared evidence.”
The family result is “multiple partial evidence stories coexist for `task`.”

#### V16 per-case expectations

V16 should require all of the following for this case:

1. Canonical evidence-basis closure
   `task` must have one canonical evidence basis for inference-synthesis purposes.

2. Field-proof adequacy
   The field-level inference proof must either:
   - enumerate the full materially relevant evidence refs,
   or
   - point to a canonical evaluator/moment contract or prompt contract that enumerates them completely.

3. Prompt-to-proof agreement
   The proof-bearing evidence basis for `task` must agree with the evidence-bearing prompt context that actually drove the output.

4. Derivation-to-proof agreement
   Field-derivation evidence and field-proof evidence must either agree directly or be related through an explicit closure rule.

5. Family failure on underdeclared evidence
   If the field-level proof names only a subset of the output-driving evidence basis without an explicit contract reference, inference-synthesis must fail.

#### Family-wide expectations forced by this case

This one case forces inference-synthesis to adopt at least these family-wide rules:

1. No partial field-proof evidence stories
   A field-level inference proof cannot be treated as complete while omitting materially used evidence inputs.

2. Canonical evidence-closure path
   V16 must define whether evidence closure is owned directly by the field proof, by a moment contract, by the prompt contract, or by an explicit combination of those surfaces.

3. Evidence-surface alignment
   Prompt context, field derivation, and field proof cannot drift independently for the same inferred field.

4. Underdeclared-evidence tests
   Family tests must fail when the declared field-proof evidence basis is only a partial subset of the actual prompt/derivation evidence basis.

#### Concrete closure signals for this case

`task` evidence-basis closure is closed for V16 only when:

1. the canonical evidence basis for `task` is explicit,
2. the field-level inference proof is adequate relative to that basis,
3. prompt context evidence and derivation evidence reconcile with the same basis,
4. witness/replay surfaces expose the evidence basis clearly enough to audit,
5. and a test breaks if the field proof drops materially used evidence refs without an explicit replacement closure path.

### Inference-Synthesis provisional V16 proof-shape direction

The first two case drill-downs now justify naming a provisional V16 proof shape for this family.

The family currently needs three distinct runtime layers:

1. evaluator or moment contract layer
   Owns:
   - evaluator identity,
   - moment kind,
   - owned output fields,
   - expected context fields,
   - expected evidence basis,
   - downstream consumers,
   - and boundary truth.

2. field-level inference proof layer
   Owns:
   - one inferred output field,
   - responsible evaluator id,
   - concrete evidence basis or evidence-basis reference,
   - evaluator status truth,
   - replayability flags,
   - and field-level admissibility.

3. family-level closure layer
   Owns:
   - inferred-field coverage equality,
   - evaluator-status consistency,
   - evidence-basis closure,
   - witness-materialization closure,
   - replay closure,
   - and test closure.

The family currently has fragments of all three layers, but not a clean canonical shape for any of them.

#### Preferred V16 evidence-ownership posture

The current cases now support a provisional design choice:

1. moment contracts should own expected evidence/context truth,
2. field proofs should own realized run-specific evidence truth,
3. and family proof should own reconciliation between the two.

This is preferable to the two simpler alternatives:

1. field-proof-only ownership
   This would duplicate expected evidence/context declarations across every field proof and invite drift between fields that share one evaluator or prompt family.

2. contract-only ownership
   This would hide the realized run-specific evidence basis inside references only and make it harder to audit what concrete evidence actually supported the output in one run.

The preferred V16 posture is therefore a hybrid closure model:
- `InferenceMomentContractV16` owns expected inputs, evidence, boundary truth, and downstream consumers,
- `InferenceFieldProofV16` owns the realized evidence basis, evaluator-status truth for the run, and closure back to the moment contract,
- `InferenceSynthesisFamilyProofV16` owns the cross-case closure verdicts.

This design directly addresses both current normalized cases:
- evaluator-status truth,
- and `task` evidence-basis closure.

#### Provisional target artifacts

V16 should now consider making the following first-class branch artifacts for this family:

1. `.engi/inference-moment-contracts.json`
   Canonical evaluator/moment contracts for inferred fields.

2. `.engi/inference-proofs.json`
   Field-level inference proofs, one per inferred field.

3. `.engi/prompt-implementation-surface.json`
   The currently bundle-only prompt implementation surface as a standalone witness artifact.

4. `.engi/inference-synthesis-proof.json`
   The family-level closure verdict that explains whether the family is actually closed for the run.

These names are still provisional for V16.
What matters first is the separation of layers, not the final filename choice.

#### Provisional parity reading

The V16 parity reading for inference-synthesis is now:

1. V15 already has enough semantic precision to justify a dedicated family proof shape.
2. Current source still compresses too much of the family into witness-manifest aggregation and system-bundle carriage.
3. The next meaningful closure step is no longer another generic description of the family.
4. The next meaningful closure step is choosing and then realizing the family's canonical proof shape.
5. The preferred shape is now specific enough to say where expected truth, realized truth, and family closure each belong.

### Inference-Synthesis case drill-down: witness-materialization and replay closure

This is the next family-tightening case after proof-shape direction because it tests whether the family's proof surfaces are actually dependably auditable.

It is the right next case because:
- V15 already names required witness material for the family,
- current source still hides major family surfaces inside bundle carriage and aggregate hashes,
- and current replay instructions are still mostly prompt-completeness-oriented rather than inference-synthesis-oriented.

#### Case statement

The current source says:
- inference-synthesis is a first-class proof family,
- the family has required witness material,
- and the system proof bundle is replayable,

but current witness materialization and replay closure are not yet specific enough to satisfy that family story directly.

#### V15 specification precision and parity

For this case, V15 already requires:
- `inference-synthesis` required witnesses include prompt surfaces, evaluator surfaces, inference proofs, prompt implementation surfaces, and any parsed completion envelopes where live execution occurs,
- proof-relevant artifacts are either digested into the witness manifest or explicitly represented by a family witness structure,
- and repeated execution over the same declared inputs is replayable at the trace level.

The V16 parity reading is:
- if a surface is required witness material for inference-synthesis,
- it must be either:
  - a first-class emitted artifact,
  - or an explicit family witness structure that is concrete enough to audit and replay,
- and replay instructions must name how the family's field proofs and closure verdict are recomputed.

#### Current source implementation precision

Current source exposes the following witness/replay posture:

1. Witness-family artifact paths for `inference-synthesis` are currently:
   - `.engi/prompt-surfaces.json`
   - `.engi/prompt-contracts.json`
   - `.engi/parsed-completion-envelopes.json`

2. Field-level inference proofs are represented only as witness refs such as:
   - `task:need-measurement.task.v2`
   rather than as first-class emitted artifacts.

3. Prompt implementation surface is represented only by an aggregate hash inside witness refs rather than as a first-class emitted artifact.

4. Evaluator interfaces/surfaces live in `.engi/eval-manifest.json`, but that file is not part of the inference-synthesis witness artifact path set.

5. System replay artifacts currently include:
   - `.engi/prompt-contracts.json`
   - `.engi/parsed-completion-envelopes.json`
   plus static/materialization/settlement artifacts,
   but they do not include prompt surfaces, eval manifest, field-level inference proofs, or prompt implementation surface as dedicated replay artifacts.

6. Replay instructions currently say:
   - recompute prompt completeness,
   - recompute parsed completion envelopes,
   and then move on to other families.

   There is no explicit inference-synthesis replay instruction that says how to recompute:
   - field proofs,
   - evaluator-status closure,
   - evidence-basis closure,
   - or family-level inference-synthesis closure.

#### Current inference-synthesis family reality for this case

For witness-materialization and replay closure, the family currently behaves as follows:

1. some real family surfaces are emitted,
2. some real family surfaces are only bundle-carried,
3. some real family surfaces are only represented by hashes or shorthand witness refs,
4. evaluator surfaces are available but not treated as direct family witness artifacts,
5. replay can partially reconstruct related prompt surfaces,
6. but the family still lacks a direct emitted closure path for its own proof story.

So the family result is not “inference-synthesis is first-class replayable witness closure.”
The family result is “inference-synthesis is partially materialized and partially implied.”

#### V16 per-case expectations

V16 should require all of the following for this case:

1. First-class witness closure
   Every family-critical surface must be either:
   - emitted as a first-class artifact,
   or
   - represented by an explicit family witness structure rich enough to reconstruct it without ambiguity.

2. No hash-only witness substitution for primary family surfaces
   Aggregate hashes alone are not sufficient substitutes for field proofs, evaluator interfaces, or prompt implementation surface when those are themselves family-critical objects.

3. Replay completeness
   Replay artifacts and replay instructions must explicitly cover:
   - moment contracts,
   - field-level inference proofs,
   - prompt implementation surface,
   - evaluator-status closure,
   - evidence-basis closure,
   - and family-level closure verdict.

4. Deliverables visibility
   The deliverables/appended artifact story must make the family's first-class witness artifacts visible as intentional outputs rather than incidental bundle internals.

5. Family failure on witness/replay under-materialization
   Inference-synthesis must fail if a required family surface cannot be audited or replayed directly enough.

#### Family-wide expectations forced by this case

This one case forces inference-synthesis to adopt at least these family-wide rules:

1. Witness materialization belongs inside the family definition
   Family closure is not separate from how its witness surfaces are emitted.

2. Replay closure is not derivative bookkeeping
   If the family claims trace replayability, its replay path must be a first-class family surface.

3. Deliverables and witness structure must align
   A family-critical artifact should not exist only by convention while the deliverables and witness ledgers tell a narrower story.

4. Bundle carriage is not enough by itself
   Carrying a surface inside `.engi/system-proof-bundle.json` does not automatically satisfy first-class witness closure.

#### Concrete closure signals for this case

Witness-materialization and replay closure are closed for V16 only when:

1. the family's critical witness surfaces are explicitly materialized,
2. witness paths and witness refs name those surfaces honestly,
3. replay artifacts and instructions can reconstruct the family's field proofs and family proof,
4. deliverables surfaces make those artifacts visible and intentional,
5. and tests break if any of those materialization or replay surfaces disappear or drift.

### Inference-Synthesis artifact-materialization determination guide

The family now needs a rule for deciding which surfaces must become first-class artifacts and which may remain explicit witness structures.

#### First-class artifact rule

A surface should be a mandatory first-class family artifact when any of the following is true:

1. it is a primary proof-bearing object rather than a summary of other proof-bearing objects,
2. replay depends on it directly as an input or canonical reference target,
3. multiple other family surfaces need to close back to it,
4. it carries non-redundant run-specific truth that would be weakened by hash-only or bundle-only carriage,
5. its absence would force an auditor to reverse-engineer family closure from unrelated artifacts,
6. or tests need to fail specifically on its disappearance or drift.

#### Explicit witness-structure rule

A surface may remain an explicit witness structure rather than a mandatory standalone artifact only when all of the following are true:

1. it is derivative or aggregate rather than primary,
2. it is losslessly reconstructible from first-class family artifacts,
3. its reconstruction path is named in replay instructions,
4. its absence does not erase unique run-specific proof truth,
5. and witness refs remain concrete enough to audit the reconstructed object without ambiguity.

#### Provisional inference-synthesis determinations

Under that rule, the current provisional V16 determination is:

1. Mandatory first-class family artifacts
   - `.engi/inference-moment-contracts.json`
   - `.engi/inference-proofs.json`
   - `.engi/inference-synthesis-proof.json`
   - `.engi/eval-manifest.json`
   - `.engi/prompt-surfaces.json`
   - `.engi/parsed-completion-envelopes.json`

2. Conditionally first-class; explicit witness structure acceptable only if reconstruction is exact and named
   - `.engi/prompt-implementation-surface.json`

3. Family-adjacent but not family-defining
   - `.engi/prompt-contracts.json`
   This remains important supporting material, but by itself it does not satisfy inference-synthesis witness closure because it is a prompt-contract surface rather than the family's own primary proof surface.

#### Current preferred determination

The current preferred V16 posture is:

1. treat moment contracts, field proofs, family proof, eval manifest, prompt surfaces, and parsed envelopes as first-class family artifacts,
2. allow prompt implementation surface to remain an explicit witness structure only if V16 decides it is purely reconstructible aggregate audit surface,
3. and stop using prompt contracts as a surrogate witness artifact for inference-synthesis primary closure.

### Inference-Synthesis member coverage ledger

The current provisional family-member coverage reading is:

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

### Inference-Synthesis member tightening signals

1. `task`
   Closed only when one field proof, one evaluator-status story, one canonical evidence basis, one witness path, and one replay path all agree for `task`.

2. `failureModes`
   Closed only when one field proof, one evaluator-status story, one canonical evidence basis, one witness path, and one replay path all agree for `failureModes`.

3. `constraints`
   Closed only when one field proof, one evaluator-status story, one canonical evidence basis, one witness path, and one replay path all agree for `constraints`, including any hidden/policy-bearing context.

4. `targetArtifactKinds`
   Closed only when one field proof, one evaluator-status story, one canonical evidence basis, one witness path, and one replay path all agree for `targetArtifactKinds`.

5. `closureCriteria`
   Closed only when V16 either promotes it into the inferred-field set with a real field proof and witness/replay closure or explicitly removes it from the classified inferred-field set.

---

### Inference-Synthesis theorem-binding and proof-shape ratchets

1. theorem-binding debt
   The family theorem names inferred-field ownership, evaluator-status truth, evidence traceability, and replay closure, but the current family proof shape still underbinds coverage-totality, evaluator-status agreement, and evidence-basis closure.

2. required proof-shape direction
   V16 should require expected inferred-field set, realized field-proof set, explicit exclusions, distinct moment-contract versus field-proof truth, and per-member verdicts for evaluator-status agreement and evidence-basis closure.

3. implementation ratchet
   A newly classified inferred field, evaluator-mode change, or evidence-basis change must fail family closure unless field proofs, moment contracts, witnesses, replay, and tests are updated together.

4. minimum theorem-catalog target
   `inference_synthesis.coverage_totality`, `inference_synthesis.evaluator_status_truth`, `inference_synthesis.evidence_basis_closure`, `inference_synthesis.ownership_traceability_closure`, `inference_synthesis.witness_materialization_closure`, and `inference_synthesis.replay_closure` should each map to explicit verdict axes.

5. minimum proof-object field target
   The family proof should carry `theoremVerdicts`, `artifactBindings`, `replaySteps`, `memberVerdicts`, and `allTheoremsPassed`, with moment-contract truth distinct from field-proof truth.

6. minimum artifact/replay binding target
   The family should bind moment contracts, field proofs, `.engi/eval-manifest.json`, `.engi/prompt-surfaces.json`, `.engi/parsed-completion-envelopes.json`, and the family proof artifact, with replay steps for coverage, evaluator status, evidence basis, ownership traceability, and witness closure.

## Static-Code-Analysis: initial V16 discovery ledger

This is the third proof family opened in the V16 draft.

The first pass stays narrow on purpose.
It is focused on family-boundary truth before proof-shape expansion.

The first question for this family is not yet:
- which new artifacts should exist,
- or what the final V16 proof type names should be.

The first question is:
- whether the current family truthfully proves a static stage domain at all,
- or whether it currently proves a mixed static-plus-verification receipt domain under a static family label.

### Static-code-analysis parity debt collection approaches

This family should be tightened through the following first-pass audits:

1. Family-domain audit
   Compare the V15 family-defined stage set to the stage ids actually covered by the family report, family proof, witness refs, and replay instructions.

2. Stage-registry audit
   Compare parser, repo-context, content-unit, and asset-measurement stage emitters to the abstract stage ids named by provenance and the concrete stage ids named by receipts.

3. Artifact-role audit
   Distinguish the role of:
   - code-analysis fact registry,
   - static heuristics registry,
   - measurement receipts,
   - static measurement report,
   - and static measurement proof.

   V16 should not assume these are all equivalent witness surfaces just because they are emitted together.

4. Witness-and-replay audit
   Compare emitted family artifacts to witness refs and replay instructions.
   Family-specific replay should not collapse static and verification closure into one undifferentiated receipt pass.

5. Test-ratchet audit
   Convert any confirmed family-boundary impurity, stage-domain drift, or missing abstraction mapping into a failing test before calling the family closed.

### Static-code-analysis specific implementation debts

The current first-pass debts are:

1. `buildStaticMeasurementProof(...)` proves receipt-ref resolution across both need and evaluated-candidate provenance, so its `coveredStageIds` currently include `verification.*` stages.

2. `buildStaticMeasurementReport(...)` likewise carries `verificationReceiptIds`, so the family report boundary is not static-only either.

3. The V15 family theorem names deterministic parser, repo-context, content-unit, and measurement stages, but the current family proof object does not prove stage-domain totality or family purity.
   It proves only that the collected receipt refs resolve.

4. The family emits five primary artifacts:
   - `.engi/code-analysis-fact-registry.json`
   - `.engi/static-heuristics-registry.json`
   - `.engi/measurement-receipts.json`
   - `.engi/static-measurement-report.json`
   - `.engi/static-measurement-proof.json`

   but the family witness refs still collapse those surfaces down to receipt ids only.

5. Current replay instructions explicitly say to resolve all static and verification receipt refs together, so the family replay story is not family-specific yet.

6. Need measurement static provenance uses abstract ids:
   - `github-actions.benchmark-parser.v2`
   - `github.repo-context.extract.v2`

   while receipts prove concrete stage ids:
   - `github-actions.benchmark-parser.v15`
   - `github.repo-context.extract.v15`

   and there is no explicit canonical mapping artifact that closes that abstraction boundary.

7. Current tests assert receipt resolution and registry audit counts, but do not assert that `static-code-analysis` excludes verification-stage coverage or that the static stage domain closes exactly.

### Static-Code-Analysis case drill-down: receipt-domain closure and family-boundary truth

This is the first case because it tests whether the family is honest about what it proves before V16 expands the family further.

#### Case statement

The current source says:
- `static-code-analysis` is a first-class proof family,
- deterministic parser, repo-context, content-unit, and measurement stages are receipt-bearing and replayable,
- and the family has its own report and proof surfaces,

but the current family proof/report/witness/replay path still covers verification-stage receipts as part of the same domain.

That means the first V16 question for this family is not only whether receipt refs resolve.
It is whether the family boundary is even cleanly drawn.

#### V15 specification precision and parity

For this case, V15 already requires:

1. `static-code-analysis`
   Deterministic parser, repo-context, content-unit, and measurement stages are receipt-bearing and replayable.

2. `verification-decisions`
   Verification receipts remain family-specific.

3. host/runtime and validation parity
   Measurement receipts and proof receipts do not overclaim local execution.

The V16 parity reading is:
- a static-code-analysis family proof cannot silently borrow verification-stage coverage and remain family-specific,
- verification receipt closure must remain available to the verification family rather than being absorbed into the static family,
- and replayable stage closure for static analysis must identify a canonical static stage domain rather than a mixed receipt pool.

#### Current source implementation precision

Current source exposes the following first-pass issues:

1. `buildStaticMeasurementReport(...)`
   builds `needMeasurementReceiptIds`, `verificationReceiptIds`, and `allReceiptRefsResolve` from one mixed union of need and candidate provenance receipt refs.

2. `buildStaticMeasurementProof(...)`
   builds `expectedReceiptRefs` from the same mixed union and sets `coveredStageIds` from all collected receipts.
   In current replay, those covered stage ids include:
   - `github-actions.benchmark-parser.v15`
   - `github.repo-context.extract.v15`
   - `content-unit.extract-static-code-analysis.v15`
   - `asset.measurement.extract.v15`
   - `verification.determinisms.v15`
   - `verification.issuance-checks.v15`
   - `verification.provenance-checks.v15`
   - `verification.sufficiency-checks.v15`
   - `verification.issuer-policy-checks.v15`

3. `buildProofWitnessManifest(...)`
   gives the family the right artifact-path set, but its witness refs are only receipt ids.
   The registries, report, and proof are therefore digested as artifacts but not directly represented as family-specific witness cases.

4. `buildSystemProofBundle(...).verifierEntrypoint`
   instructs replay to recompute code-analysis facts and static heuristics, then resolve all static and verification receipt refs against the receipt artifacts.
   That again collapses two proof families into one replay step.

5. `needMeasurement.measurementProvenance`
   uses abstract static ids:
   - `github-actions.benchmark-parser.v2`
   - `github.repo-context.extract.v2`

   while the receipts proving those stages use concrete `...v15` ids, and asset/unit static provenance uses concrete `...v15` ids directly.
   The family therefore already has a stage-domain abstraction mismatch before V16 even starts expanding it.

#### Family-wide expectations forced by this case

This one case already forces `static-code-analysis` toward the following V16 rules:

1. Family stage domain must be explicit
   The family must be able to say which stage ids are in-family and which are out-of-family.

2. Static proof must fail on out-of-family stage inclusion
   Verification-stage receipts cannot silently appear under the static family and still count as closure.

3. Abstract-to-concrete stage mapping must be explicit
   If provenance uses abstract stage ids and receipts use concrete implementation stage ids, the mapping must be a canonical family surface.

4. Witness closure cannot collapse to receipt ids only
   Registries, report, and family proof each carry different truth and should not be treated as interchangeable just because receipts exist.

5. Replay closure must be family-specific
   Replay instructions should reconstruct static stage closure without collapsing into verification receipt closure.

#### Concrete closure signals for this case

Receipt-domain and family-boundary closure are closed for V16 only when:

1. the family's canonical static stage domain is explicit,
2. `coveredStageIds` for the family are a subset of that static domain,
3. verification-stage receipt ids are no longer part of the static family proof/report domain,
4. abstract provenance ids and concrete receipt stage ids are closed by an explicit canonical mapping rule or artifact,
5. witness refs and replay instructions tell the same family-specific story as the emitted artifacts,
6. and tests fail immediately if verification-stage coverage leaks back into the family.

### Static-Code-Analysis case drill-down: artifact-role closure and alias truth

The second case for this family is artifact-role closure.

This is the right next case because the family already emits multiple distinct artifacts, but current witness/deliverable/public treatment still tends to flatten them.

#### Case statement

The current source says:
- the family emits a code-analysis fact registry,
- the family emits a static heuristics registry,
- the family emits measurement receipts,
- the family emits a static measurement report,
- and the family emits a static measurement proof,

but it does not yet make their roles canonical enough.

In particular:
- one registry is already declared to be an alias surface of the other,
- report and proof carry different truth than receipts,
- and witness refs still collapse the family mostly to receipt ids.

So the family currently exposes more artifact structure than its proof grammar acknowledges.

#### V15 specification precision and parity

For this case, V15 already implies:

1. proof-relevant artifact paths emitted by the system must be digested or explicitly incorporated into family witness structure,

2. witness families and artifact digests must remain mutually coherent,

3. indirect or surrogate representation should not hide missing family-specific witness coverage,

4. and the deliverables manifest must enumerate emitted artifacts densely enough that a reviewer can tell what exists and what subsystem families it depends on.

The V16 parity reading is:
- if two artifacts are genuinely distinct proof objects, the family should say what different truth each one carries,
- if one artifact is merely an alias or projection of another, the family should say so explicitly,
- and witness, deliverable, projection, and replay layers should not imply five equally primary family artifacts when source semantics already distinguish them.

#### Current source implementation precision

Current source exposes the following role mismatch:

1. `buildCodeAnalysisFactRegistry(...)`
   emits the core registry and explicitly marks:
   - `registrySemantics: 'code-analysis-fact-registry'`
   - `specArtifactAliases: ['.engi/static-heuristics-registry.json']`

2. `buildStaticHeuristicsRegistryArtifact(...)`
   constructs the static heuristics registry by copying the fact registry and adding only:
   - `artifactId: 'static-heuristics-registry.v15'`
   - `artifactSemantics: 'specific code-analysis fact registry emitted as the local static heuristics registry surface'`

   In current replay, the two registries have the same `registeredFacts`, the same `consumerMatrix`, and the same underlying `audit.registryHash`.

3. `buildProofWitnessManifest(...)`
   digests both registry paths separately and names both in `witnessArtifactPaths`, but the family's `witnessRefs` still contain receipt ids only.
   That means the family knows the artifacts exist but does not yet represent their role distinctions in family witness structure.

4. `buildDeliverablesManifest(...)`
   lists both registries, the receipts, the report, and the proof as separate deliverables, but their `dependsOn` sets still blur static and verification truth.

5. public projection also exposes:
   - `.engi/code-analysis-fact-registry.json`
   - `.engi/static-heuristics-registry.json`
   - `.engi/static-measurement-report.json`
   - `.engi/static-measurement-proof.json`

   yet bounded-public proof summarizes only the report-level truth:
   - `receiptCount`
   - `allReceiptRefsResolve`

   It does not summarize distinct registry-role or family-proof-role closure.

#### Family-wide expectations forced by this case

This one case already forces `static-code-analysis` toward the following V16 rules:

1. Artifact roles must be canonical
   The family should distinguish:
   - registry truth,
   - alias/projection truth,
   - receipt truth,
   - report truth,
   - and family-proof truth.

2. Alias surfaces must be explicit
   If `.engi/static-heuristics-registry.json` is an alias or projection of `.engi/code-analysis-fact-registry.json`, the family should say so directly rather than leaving later layers to imply equal primacy.

3. Witness structure should follow role distinctions
   Receipt ids alone are not enough to witness registry-role or family-proof-role closure.

4. Public and deliverable treatment should not overstate primacy
   A family alias surface may still be materialized and public, but V16 should distinguish public availability from proof-object primacy.

5. Replay should reconstruct role distinctions
   Replay instructions should say whether the heuristics registry is recomputed as an alias of the fact registry or as an independent proof surface.

#### Concrete closure signals for this case

Artifact-role and alias closure are closed for V16 only when:

1. the family explicitly identifies which artifact is the primary registry surface,
2. any alias or projection surfaces are named as such,
3. receipts, report, and family proof are each distinguished by what truth they uniquely carry,
4. witness refs no longer flatten all family closure to receipt ids only,
5. deliverables and public projection remain compatible with those role distinctions,
6. and tests fail if alias-vs-primary or report-vs-proof role boundaries drift silently.

### Static-Code-Analysis artifact-materialization determination guide

The family now has enough first-pass evidence to make a provisional artifact determination.

#### First-class artifact rule

A static-code-analysis surface should be a mandatory first-class family artifact when any of the following is true:

1. it carries primary family truth rather than naming-compatible alias truth,
2. replay depends on it directly to reconstruct static stage closure,
3. other family surfaces close back to it,
4. it carries unique run-specific proof truth that is not preserved by another family surface,
5. or its disappearance would materially weaken direct auditability of static stage closure.

#### Alias/projection rule

A static-code-analysis surface may remain a derived alias or projection surface only when all of the following are true:

1. its underlying truth is already carried by a primary family artifact,
2. it adds naming, compatibility, or public/operator ergonomics rather than new proof truth,
3. its derivation path is explicit,
4. replay does not require it as an independent closure surface,
5. and tests can prove that it remains role-consistent with its primary source artifact.

#### Provisional static-code-analysis determinations

Under the current first-pass reading, the provisional V16 determination is:

1. Mandatory first-class family artifacts
   - `.engi/code-analysis-fact-registry.json`
   - `.engi/measurement-receipts.json`
   - `.engi/static-measurement-report.json`
   - `.engi/static-measurement-proof.json`

2. Conditionally first-class; alias/projection status acceptable only if derivation remains explicit and exact
   - `.engi/static-heuristics-registry.json`

3. Future likely first-class family artifact once V16 makes stage-domain truth explicit
   - `.engi/static-stage-domain-contract.json`

#### Current preferred determination

The current preferred V16 posture is:

1. treat `.engi/code-analysis-fact-registry.json` as the primary registry surface,
2. treat `.engi/static-heuristics-registry.json` as an explicit alias/projection surface unless later family work finds genuinely independent truth there,
3. keep `.engi/measurement-receipts.json` as the primary receipt-log surface,
4. keep `.engi/static-measurement-report.json` and `.engi/static-measurement-proof.json` distinct because they carry different closure truth,
5. and stop letting witness refs imply that receipt ids alone substantiate the full family artifact set.

### Static-Code-Analysis case drill-down: witness-materialization and replay closure

The next case for this family is witness-materialization and replay closure.

This follows directly from the first two cases:
- the family boundary is not clean enough yet,
- and the family artifact roles are not yet canonical enough,
- so the current witness and replay path should be tested against those same distinctions.

#### Case statement

The current source says:
- the family emits five proof-relevant artifacts,
- the witness manifest names all five artifact paths,
- and the system proof bundle exposes replay artifacts and replay instructions,

but the current family witness and replay story still flattens too much:
- witness refs are receipt ids only,
- replay artifacts omit the static report and static proof,
- and replay instructions still collapse static and verification receipt resolution into one step.

So the family currently has artifact digests without a correspondingly precise family replay and witness closure story.

#### V15 specification precision and parity

For this case, V15 already requires:

1. proof-relevant artifacts be digested or explicitly incorporated into family witness structure,
2. witness families and artifact digests remain mutually coherent,
3. indirect or surrogate representation not hide missing family-specific witness coverage,
4. and replayable family truth remain honest about what the current machine is actually proving.

The V16 parity reading is:
- if the family emits a report and a family proof, replay should be able to reconstruct them as family surfaces,
- if witness paths name multiple family artifacts, witness refs should not imply that receipts alone close the whole family,
- and static-family replay should not require an auditor to infer family closure from a mixed static-plus-verification replay step.

#### Current source implementation precision

Current source exposes the following witness/replay mismatch:

1. `buildProofWitnessManifest(...)`
   names:
   - `.engi/code-analysis-fact-registry.json`
   - `.engi/static-heuristics-registry.json`
   - `.engi/measurement-receipts.json`
   - `.engi/static-measurement-report.json`
   - `.engi/static-measurement-proof.json`

   but still uses `measurementReceipts[].receiptId` only for `witnessRefs`.

2. `buildSystemProofBundle(...).verifierEntrypoint.replayArtifacts`
   includes:
   - `.engi/code-analysis-fact-registry.json`
   - `.engi/static-heuristics-registry.json`
   - `.engi/measurement-receipts.json`

   but omits:
   - `.engi/static-measurement-report.json`
   - `.engi/static-measurement-proof.json`

3. replay instructions say:
   - recompute code-analysis facts and static heuristics from the registries,
   - then resolve all static and verification receipt refs against the receipt artifacts.

   They do not explicitly say how to:
   - reconstruct report truth,
   - reconstruct family-proof truth,
   - or fail on alias/primary drift.

#### Family-wide expectations forced by this case

This one case already forces `static-code-analysis` toward the following V16 rules:

1. Witness refs should represent more than receipt ids
   Family witness structure should name registry/report/proof closure explicitly enough to audit those surfaces directly.

2. Replay artifacts should include the family's own closure surfaces
   Report and family proof should not disappear from replay just because receipts exist.

3. Replay instructions should be family-specific
   They should reconstruct static-family closure, not just shared receipt resolution.

4. Alias-vs-primary closure should be replay-visible
   Replay should be able to confirm that the heuristics registry remains a role-consistent derivative of the primary registry.

#### Concrete closure signals for this case

Witness-materialization and replay closure are closed for V16 only when:

1. witness refs represent registry/report/proof closure as well as receipt closure,
2. replay artifacts include the family surfaces required to reconstruct the static report and static family proof,
3. replay instructions are explicit about report recomputation, proof recomputation, and alias-role consistency,
4. family replay no longer collapses static and verification receipt closure into one undifferentiated step,
5. and tests fail if any of those family witness or replay surfaces disappear or drift.

### Static-Code-Analysis preferred expected/realized/family closure split

The family now has enough structure to use the same canonical precision grammar as the prior two families.

#### Expected truth layer

Should own:
- static stage-domain contract,
- abstract-to-concrete stage mappings,
- allowed receipt kinds,
- primary-versus-alias artifact roles.

#### Realized truth layer

Should own:
- emitted primary registry surface,
- emitted alias/projection registry surfaces,
- receipt log,
- static report,
- static family proof.

#### Family closure layer

Should own:
- stage-domain closure,
- receipt-domain closure,
- registry-role closure,
- witness-materialization closure,
- replay closure,
- test closure.

### Static-Code-Analysis member coverage ledger

The current provisional family-member coverage reading is:

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

### Static-Code-Analysis member tightening signals

1. deterministic parser
   Closed only when parser provenance, parser receipts, registry truth, witness paths, replay, and tests all agree on one static-only parser stage domain.

2. repo-context
   Closed only when repo-context provenance, repo-context receipts, registry truth, witness paths, replay, and tests all agree on one static-only repo-context stage domain.

3. content-unit
   Closed only when content-unit extraction receipts, registry truth, report/proof stage coverage, witness paths, replay, and tests all agree on one static-only content-unit stage domain.

4. measurement stages
   Closed only when asset-measurement receipts, static report, static proof, witness paths, replay, and tests all agree on one static-only measurement-stage domain with no `verification.*` leakage.

#### Current preferred stopping point

SCA is now complete enough in V16 drafting terms to move on because:

1. the family boundary issue is explicit,
2. artifact roles are explicit,
3. provisional artifact determination exists,
4. replay/witness direction exists,
5. and expected versus realized versus family closure ownership is now named.

---

### Static-Code-Analysis theorem-binding and proof-shape ratchets

1. theorem-binding debt
   The family theorem still risks overclaiming a static-only proof surface while the current report/proof domain can silently absorb `verification.*` receipts.

2. required proof-shape direction
   V16 should require explicit stage mapping from abstract family members to concrete receipt stages, member verdicts for parser/repo-context/content-unit/measurement, registry-role closure, and family-domain exclusions.

3. implementation ratchet
   A new static stage, provenance id, registry role, or receipt domain must fail family closure unless stage mapping, proof shape, replay, and tests are updated together.

4. minimum theorem-catalog target
   `static_code_analysis.stage_domain_purity`, `static_code_analysis.abstract_to_concrete_stage_mapping`, `static_code_analysis.registry_role_closure`, `static_code_analysis.receipt_report_proof_agreement`, and `static_code_analysis.witness_replay_closure` should each map to explicit verdict axes.

5. minimum proof-object field target
   The family proof should carry `theoremVerdicts`, `artifactBindings`, `replaySteps`, `memberVerdicts`, and `allTheoremsPassed` rather than only `allReceiptRefsResolve` plus family booleans.

6. minimum artifact/replay binding target
   The family should bind `.engi/code-analysis-fact-registry.json`, `.engi/static-measurement-report.json`, `.engi/static-measurement-proof.json`, retained alias registries when real, and receipt-bearing provenance surfaces, with replay steps for stage mapping, domain purity, registry roles, and receipt/report/proof agreement.

## Verification-Decisions: initial V16 discovery ledger

This is the fourth proof family opened in the V16 draft.

The first VD pass starts with family completeness around use-tier consequence.

That is the right entry point because current source already materializes:
- verification receipts,
- verification decision surfaces,
- verification report entries,
- use tiers,
- and branch-mode rights,

but current family vocabulary still mostly names only four verification subfamilies.

### Verification-decisions parity debt collection approaches

This family should be tightened through the following first-pass audits:

1. Family-membership audit
   Compare the V15 family-defined decision surfaces to what current report, receipt, and witness layers actually represent.

2. Use-tier derivation audit
   Confirm where `useTier` is derived, where it is recorded, and where branch-mode rights begin.

3. Decision-surface audit
   Compare verification receipts, decision surfaces, verification report entries, and use-tier/rights surfaces for closure and drift.

4. Witness-and-replay audit
   Compare emitted report and receipts artifacts to family witness refs and replay artifacts.

5. Test-ratchet audit
   Convert any confirmed omission or family-boundary drift into a failing test before calling VD closed.

### Verification-decisions specific implementation debts

The current first-pass debts are:

1. V15 defines the family as issuance, provenance, sufficiency, issuer-policy, and use-tier consequence surfaces being receipt-backed, but current `verificationReport.verificationFamilies` lists only:
   - `issuance`
   - `provenance`
   - `sufficiency`
   - `issuer-policy`

2. Current verification receipts include stage ids:
   - `verification.determinisms.v15`
   - `verification.issuance-checks.v15`
   - `verification.provenance-checks.v15`
   - `verification.sufficiency-checks.v15`
   - `verification.issuer-policy-checks.v15`

   but the family does not yet state clearly whether `verification.determinisms.v15` is the canonical use-tier-consequence stage or merely an implementation helper.

3. `useTier` is in fact derived downstream of verification, but the family does not yet distinguish:
   - verification-derived `useTier`,
   - receipt-backed `finalUseTier`,
   - and branch-mode rights that are consequences of `useTier` plus branch mode rather than verification alone.

4. `verificationReceiptsArtifact` carries rich `verificationDecisionSurfaces`, but family witness refs still flatten to receipt ids only.

5. `verification-report.json` is a family artifact, but current replay artifacts include `.engi/verification-receipts.json` only and omit `.engi/verification-report.json`.

6. Current replay instructions do not explicitly reconstruct verification-family closure at all.

### Verification-Decisions case drill-down: use-tier consequence closure and family completeness

This is the first case because it tests whether the family is complete about its own stated decision surfaces before V16 expands the rest of the family.

#### Case statement

The current source says:
- verification in V15 must include issuance, provenance, sufficiency, issuer-policy, and use-tier consequence surfaces,
- use tiers must remain downstream of verification rather than ad hoc labels,
- and current runtime records `useTier`, `finalUseTier`, and branch-mode rights,

but current family vocabulary still mostly names only four verification families and compresses the richer decision surfaces into receipt-backed implementation detail.

That makes use-tier consequence closure the cleanest first VD parity case.

#### V15 specification precision and parity

For this case, V15 already requires:

1. `verification-decisions`
   Issuance, provenance, sufficiency, issuer-policy, and use-tier consequence surfaces are receipt-backed.

2. `B.7 Verification receipts, use tiers, and hand-off rules`
   Use tiers must remain downstream of verification rather than ad hoc labels.

3. inference/evaluator outputs may support verification explanation but must not directly assign final use tier or later system consequences.

The V16 parity reading is:
- VD must explicitly own use-tier consequence as part of the family rather than as an implied side-effect,
- `useTier` must stay visibly downstream of the verification checks,
- and branch-mode rights should be represented as downstream system consequences rather than silently merged into the verification decision itself.

#### Current source implementation precision

Current source exposes the following first-pass issues:

1. `decideCandidateUseTier(...)` and `upgradeToSettlementEligible(...)`
   derive `useTier` using only verification outputs:
   - issuance verification,
   - provenance verification,
   - verification sufficiency,
   - issuer policy status.

2. `buildVerificationDecisionReceipts(...)`
   records `decisionSurface.finalUseTier` and also writes `finalUseTier` into the policy receipt normalized output.

3. `buildVerificationReport(...)`
   records:
   - `useTier`
   - `rights`
   - `verificationDecisionSurface`
   - `claimedEvidence`
   - `measuredEvidence`
   - `policyRestrictions`
   - `receiptRefs`

   but its top-level `verificationFamilies` list still omits a fifth use-tier consequence family member.

4. `buildVerificationReceiptsArtifact(...)`
   emits:
   - all `verification.*` receipts,
   - and rich `verificationDecisionSurfaces`

   including `useTier` and `finalUseTier`,
   but family witness refs still flatten to receipt ids only.

5. current replay artifacts include `.engi/verification-receipts.json` but omit `.engi/verification-report.json`,
   so the family replay story is not yet report- and consequence-complete.

#### Family-wide expectations forced by this case

This one case already forces `verification-decisions` toward the following V16 rules:

1. Use-tier consequence must be explicit
   The family should name it as a first-class decision surface rather than leaving it implicit.

2. Verification-derived tier must be separated from downstream rights
   `useTier` is verification-family truth; branch-mode rights are downstream system consequence truth.

3. Decision surfaces should not flatten to receipt ids only
   Rich verification decision surfaces are part of the family's proof story.

4. Replay must reconstruct consequence closure
   Replay should be able to show how verification checks produced the final tier and how report-level consequences remain coherent.

#### Concrete closure signals for this case

Use-tier consequence closure is closed for V16 only when:

1. the family explicitly includes use-tier consequence in its canonical family-membership set,
2. verification-derived `useTier` is visibly closed to its receipt-backed verification checks,
3. branch-mode rights are represented as downstream consequence rather than silently merged into verification-family truth,
4. witness and replay surfaces include the report-level consequence path as well as the receipt-level path,
5. and tests fail if the fifth family member disappears or drifts back into implication only.

### Verification-Decisions case drill-down: decision-stage mapping and artifact-role closure

The second case for VD is decision-stage mapping and artifact-role closure.

This is the right next case because the family already emits:
- verification receipts,
- verification decision surfaces,
- verification report entries,
- and report-level consequence surfaces,

but it does not yet make the role split or stage mapping canonical enough.

#### Case statement

The current source says:
- there are four named verification families in report vocabulary,
- there are five concrete `verification.*` receipt stages in runtime,
- `verificationReceiptsArtifact` carries receipts plus decision surfaces,
- and `verificationReport` carries decision summaries plus rights and receipt refs,

but the family does not yet say:
- whether `verification.determinisms.v15` is the canonical use-tier-consequence stage,
- how the five decision members map to the five receipt-stage families,
- or what distinct truth `verification-report.json` carries relative to `verification-receipts.json`.

So the family currently has richer runtime structure than its proof grammar names.

#### V15 specification precision and parity

For this case, V15 already implies:

1. verification receipts remain family-specific,
2. use tiers remain derived from verification rather than ad hoc labels,
3. rejected or downgraded assets remain explainable from witness-bearing evidence,
4. and proof-relevant family artifacts must be represented coherently in witness structure.

The V16 parity reading is:
- if use-tier consequence is a family member, its receipt-stage mapping should be explicit,
- if report and receipts artifacts both exist, the family should say what different truth each one owns,
- and witness/replay layers should not flatten those differences away.

#### Current source implementation precision

Current source exposes the following second-pass issues:

1. `verificationReceiptsArtifact.verificationReceipts`
   currently includes five concrete stage ids:
   - `verification.determinisms.v15`
   - `verification.issuance-checks.v15`
   - `verification.provenance-checks.v15`
   - `verification.sufficiency-checks.v15`
   - `verification.issuer-policy-checks.v15`

2. `verificationReport.verificationFamilies`
   still lists only:
   - `issuance`
   - `provenance`
   - `sufficiency`
   - `issuer-policy`

   so the likely fifth family member is runtime-real but report-understated.

3. `verificationDecisionSurface.receiptRefs`
   currently names the four sub-check receipts only,
   while `verificationReport.assetVerification[].receiptRefs`
   adds the `verification.determinisms.v15` receipt as a fifth report-level receipt.

4. `verificationReceiptsArtifact`
   owns the raw receipts and detailed decision surfaces.

5. `verificationReport`
   owns:
   - branch-mode-sensitive rights,
   - report-visible `useTier`,
   - per-asset report summaries,
   - and the top-level family summary vocabulary.

   So the two artifacts are not redundant even though both are verification-family artifacts.

6. `buildProofWitnessManifest(...)`
   currently names both artifact paths, but witness refs still flatten the family to receipt ids only.

7. replay artifacts include `.engi/verification-receipts.json` only and omit `.engi/verification-report.json`.

#### Family-wide expectations forced by this case

This one case already forces `verification-decisions` toward the following V16 rules:

1. Decision-family to receipt-stage mapping must be explicit
   The family should say how its canonical decision members map to concrete stage ids.

2. Use-tier consequence stage must be named
   If `verification.determinisms.v15` is the runtime consequence stage, the family should say so explicitly.

3. Report and receipt artifacts must be role-distinguished
   Receipts artifact owns raw receipt and decision-surface truth; report owns consequence summary and report-facing coherence truth.

4. Witness structure should follow role distinctions
   Receipt ids alone are not enough to witness report-level family closure.

5. Replay should include report-level family closure
   Verification-family replay should reconstruct both receipt-backed decision truth and report-level consequence truth.

#### Concrete closure signals for this case

Decision-stage mapping and artifact-role closure are closed for V16 only when:

1. the family's five decision members map explicitly to concrete verification stages,
2. the use-tier consequence stage is named canonically,
3. `verification-report.json` and `verification-receipts.json` are distinguished by what truth they uniquely carry,
4. witness refs no longer imply that receipt ids alone close the family,
5. replay includes report-level family closure as well as receipt-level closure,
6. and tests fail if report/receipt role boundaries or the fifth stage mapping drift silently.

### Verification-Decisions artifact-materialization determination guide

The family now has enough evidence to make a provisional artifact determination.

#### First-class artifact rule

A verification-decisions surface should be a mandatory first-class family artifact when any of the following is true:

1. it carries primary family decision or consequence truth,
2. replay depends on it directly to reconstruct family closure,
3. other family surfaces close back to it,
4. it carries unique per-asset or per-family truth not preserved by another artifact,
5. or its absence would materially weaken direct auditability of the family.

#### Derived-surface rule

A verification-decisions surface may remain derived or secondary only when all of the following are true:

1. its underlying decision truth is already preserved by a primary family artifact,
2. it adds presentation, compatibility, or summary structure rather than new proof truth,
3. its derivation path is explicit,
4. replay does not require it independently,
5. and tests can prove that it remains role-consistent with its primary source artifacts.

#### Provisional verification-decisions determinations

Under the current first-pass reading, the provisional V16 determination is:

1. Mandatory first-class family artifacts
   - `.engi/verification-receipts.json`
   - `.engi/verification-report.json`

2. Future likely first-class family artifacts once V16 formalizes family closure further
   - `.engi/verification-decisions-proof.json`
   - `.engi/verification-decision-contract.json`

#### Current preferred determination

The current preferred V16 posture is:

1. treat `.engi/verification-receipts.json` as the primary receipt and decision-surface artifact,
2. treat `.engi/verification-report.json` as the primary report and consequence-summary artifact,
3. make the five-member family-to-stage mapping explicit rather than implicit in runtime receipt stage ids,
4. and stop letting witness refs imply that receipts alone substantiate the full family closure.

### Verification-Decisions case drill-down: witness-materialization and replay closure

The next case for VD is witness-materialization and replay closure.

This follows directly from the first two cases because:
- the family scope is richer than four receipt checks,
- report and receipt artifacts are not role-equivalent,
- and current replay is still thinner than the emitted family artifact set.

#### Case statement

The current source says:
- the family emits both `.engi/verification-report.json` and `.engi/verification-receipts.json`,
- the witness manifest names both paths,
- and the system proof bundle offers replay artifacts,

but current family witness and replay closure still flatten too much:
- witness refs are receipt ids only,
- replay includes `.engi/verification-receipts.json` but omits `.engi/verification-report.json`,
- and replay instructions do not explicitly reconstruct verification-family closure at all.

#### V15 specification precision and parity

For this case, V15 already requires:

1. verification receipts remain family-specific,
2. rejected or downgraded assets remain explainable from witness-bearing evidence,
3. proof-relevant artifacts and family witnesses remain coherent,
4. and replayable family truth remains honest about what is being proven.

The V16 parity reading is:
- the report artifact cannot be family-relevant only in deliverables while absent from replay,
- receipt ids alone cannot witness family consequence closure,
- and VD replay should explicitly reconstruct both decision and consequence surfaces.

#### Current source implementation precision

Current source exposes the following witness/replay mismatch:

1. `buildProofWitnessManifest(...)`
   names:
   - `.engi/verification-report.json`
   - `.engi/verification-receipts.json`

   but still uses receipt ids only for `witnessRefs`.

2. `buildSystemProofBundle(...).verifierEntrypoint.replayArtifacts`
   includes:
   - `.engi/verification-receipts.json`

   but omits:
   - `.engi/verification-report.json`

3. current replay instructions do not contain a verification-family-specific step.

#### Family-wide expectations forced by this case

This one case already forces `verification-decisions` toward the following V16 rules:

1. Witness refs should represent report-level closure as well as receipt-level closure.

2. Replay artifacts should include the report artifact as well as the receipts artifact.

3. Replay instructions should reconstruct:
   - verification-stage closure,
   - decision-surface closure,
   - use-tier consequence closure,
   - and report-level consequence coherence.

4. Family replay should remain distinct from ranking and branch-materialization consequence logic outside the family.

#### Concrete closure signals for this case

Witness-materialization and replay closure are closed for V16 only when:

1. witness refs represent report and consequence closure as well as receipt closure,
2. replay artifacts include both verification family artifacts,
3. replay instructions explicitly reconstruct the family's own decision and consequence surfaces,
4. report omission from replay is no longer possible without failing the family,
5. and tests fail if verification-family replay or witness closure drifts back to receipt-only substantiation.

### Verification-Decisions preferred expected/realized/family closure split

VD now has enough structure to use the same canonical precision grammar as the prior families.

#### Expected truth layer

Should own:
- expected decision-family membership,
- decision-family to receipt-stage mapping,
- consequence ownership rules,
- report-versus-receipt artifact roles.

#### Realized truth layer

Should own:
- emitted receipt artifact,
- emitted report artifact,
- per-asset decision surfaces,
- per-asset report entries,
- concrete receipt stages,
- verification-derived `useTier`,
- downstream rights surfaces.

#### Family closure layer

Should own:
- family-membership closure,
- decision-stage mapping closure,
- use-tier consequence closure,
- artifact-role closure,
- witness-materialization closure,
- replay closure,
- test closure.

### Verification-Decisions member coverage ledger

The current provisional family-member coverage reading is:

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

### Verification-Decisions member tightening signals

1. `issuance`
   Closed only when issuance receipts, decision surfaces, report entries, witness paths, replay, and tests all agree on one issuance member story.

2. `provenance`
   Closed only when provenance receipts, decision surfaces, report entries, witness paths, replay, and tests all agree on one provenance member story.

3. `sufficiency`
   Closed only when sufficiency receipts, decision surfaces, report entries, witness paths, replay, and tests all agree on one sufficiency member story.

4. `issuer-policy`
   Closed only when issuer-policy receipts, decision surfaces, report entries, witness paths, replay, and tests all agree on one issuer-policy member story.

5. `use-tier-consequence`
   Closed only when the family canonically names the use-tier stage or consequence path, keeps rights downstream, and makes `useTier`/`finalUseTier` closure replay-visible in both report and witness surfaces.

#### Current preferred stopping point

VD is now complete enough in V16 drafting terms to continue later family work because:

1. the fifth family member is explicit,
2. the runtime stage mapping problem is explicit,
3. report-versus-receipt roles are explicit,
4. provisional artifact determination exists,
5. replay/witness direction exists,
6. and expected versus realized versus family closure ownership is now named.

---

### Verification-Decisions theorem-binding and proof-shape ratchets

1. theorem-binding debt
   The family theorem already includes use-tier consequence, but the current proof/report vocabulary still undernames that consequence relative to the other decision members.

2. required proof-shape direction
   V16 should require per-member verdicts for issuance, provenance, sufficiency, issuer-policy, and use-tier consequence, plus explicit mapping from decision stages to report consequences and witness artifacts.

3. implementation ratchet
   A new verification stage, rights consequence, or report-facing consequence must fail family closure unless the family theorem binding, proof shape, replay, and tests are extended with it.

4. minimum theorem-catalog target
   `verification_decisions.issuance_closure`, `verification_decisions.provenance_closure`, `verification_decisions.sufficiency_closure`, `verification_decisions.issuer_policy_closure`, `verification_decisions.use_tier_consequence_closure`, `verification_decisions.receipt_report_role_closure`, and `verification_decisions.witness_replay_closure` should each map to explicit verdict axes.

5. minimum proof-object field target
   The family proof should carry `theoremVerdicts`, `artifactBindings`, `replaySteps`, `memberVerdicts`, and `allTheoremsPassed`, with explicit stage-to-member and report-consequence closure.

6. minimum artifact/replay binding target
   The family should bind `.engi/verification-receipts.json`, `.engi/verification-report.json`, and a realized family proof artifact, with replay steps for decision-stage mapping, report consequence closure, use-tier consequence closure, and receipt/report agreement.

## Selection-And-Materialization: initial V16 discovery ledger

This is the fifth proof family opened in the V16 draft.

The first SAM pass starts with family completeness around `SelectionConsistencyProof`.

That is the right entry point because V15 already gives that proof a first-class canonical structure, while current source still leaves it mostly bundle-carried rather than branch-artifact-carried.

### Selection-and-materialization parity debt collection approaches

This family should be tightened through the following first-pass audits:

1. Primary-proof audit
   Compare V15 canonical family proof objects to the actual emitted branch artifacts, witness paths, and replay artifacts.

2. Lock/source/materialization role audit
   Distinguish the roles of:
   - `.engi/asset-pack.lock.json`
   - `.engi/selected-source-material.json`
   - `.engi/materialization-proof.json`
   - `.engi/materialization-exclusions.json`
   - `.engi/materialization-visibility-proof.json`
   - and the current bundle-only `selectionConsistencyProof`

3. Branch-mode and settlement-consequence audit
   Compare selected assets, excluded assets, rights, settlement candidates, and selected-source-material surfaces to ensure family consequence truth is explicit and coherent.

4. Witness-and-replay audit
   Compare family artifacts and proof objects to witness refs and replay artifacts.

5. Test-ratchet audit
   Convert any confirmed omission or role-drift class into a failing test before calling the family closed.

### Selection-and-materialization specific implementation debts

The current first-pass debts are:

1. V15 gives `SelectionConsistencyProof` a first-class canonical shape, but current branch artifacts do not emit a dedicated selection-consistency proof artifact.

2. `buildProofWitnessManifest(...)` includes the `selectionConsistencyProof.proofHash` in witness refs, but no `witnessArtifactPaths` entry exists for a dedicated selection-consistency artifact.

3. `deliverablesManifest` has no dedicated selection-consistency path.

4. replay artifacts include:
   - `.engi/materialization-proof.json`
   - `.engi/materialization-exclusions.json`

   but omit:
   - `.engi/asset-pack.lock.json`
   - `.engi/selected-source-material.json`
   - `.engi/materialization-visibility-proof.json`
   - and any dedicated selection-consistency proof artifact

5. The family currently emits several distinct surfaces that carry different truth:
   - lock truth,
   - realized selected-source-material truth,
   - exclusion truth,
   - visibility truth,
   - aggregate materialization closure,
   - and selection-consistency closure,

   but the family does not yet make those roles canonical enough.

6. The family already relies on branch-mode and settlement consequences:
   - `allSelectedAssetsRespectUseTier`
   - `settlementParticipantsSubsetOfSelectedAssets`
   - `settlementConsumesOnlySettlementEligibleAssets`
   - `materializationAllowed`
   - `settlementAllowed`

   but the family has not yet named the expected consequence split explicitly.

### Selection-And-Materialization case drill-down: selection-consistency proof materialization and family completeness

This is the first case because it tests whether the family is carrying its own primary proof object as a first-class family surface.

#### Case statement

The current source says:
- V15 defines `SelectionConsistencyProof` explicitly,
- current runtime computes `selectionConsistencyProof`,
- witness refs include its proof hash,
- and the system proof bundle carries the proof object,

but current branch artifacts, deliverables, and replay inputs still omit a dedicated selection-consistency artifact.

That makes the family's most explicit canonical proof object under-materialized relative to its own spec precision.

#### V15 specification precision and parity

For this case, V15 already requires:

1. `selection-and-materialization`
   Selected assets, locked units, materialized source, exclusions, and visibility rules are mutually consistent.

2. `SelectionConsistencyProof`
   V15 gives a concrete proof object type with:
   - asset-pack selection closure,
   - use-tier respect,
   - materialized-source closure,
   - lock closure,
   - settlement-participant subset closure,
   - settlement-eligibility consumption closure.

3. subsystem obligations
   Selection/materialization must prove:
   - selected assets are consistent with the asset pack,
   - selected source material matches the lock,
   - rejected assets remain explainable,
   - branch-mode rights are respected,
   - settlement consumes only settlement-eligible assets,
   - public visibility rules do not leak private materialization state.

The V16 parity reading is:
- if V15 already gives `SelectionConsistencyProof` a first-class structure,
- V16 should not treat it as a hidden or merely implicit bundle-only helper,
- and the family should materialize and replay its primary consistency proof directly.

#### Current source implementation precision

Current source exposes the following first-pass issues:

1. `buildSelectionConsistencyProof(...)`
   computes a distinct proof object with its own `proofHash`.

2. `buildProofWitnessManifest(...)`
   includes that proof hash in family `witnessRefs`,
   but `witnessArtifactPaths` still name only:
   - `.engi/asset-pack.lock.json`
   - `.engi/selected-source-material.json`
   - `.engi/materialization-proof.json`
   - `.engi/materialization-exclusions.json`
   - `.engi/materialization-visibility-proof.json`

3. `buildBranchArtifacts(...)`
   does not emit a dedicated `.engi/selection-consistency-proof.json` or equivalent path.

4. `deliverablesManifest`
   does not enumerate a dedicated selection-consistency artifact path.

5. `verifierEntrypoint.replayArtifacts`
   omits the lock, selected-source-material, visibility-proof, and any dedicated selection-consistency artifact, even though those surfaces are the direct inputs for reconstructing the family's primary consistency proof.

6. public projection exposes:
   - `.engi/materialization-proof.json`
   - `.engi/materialization-visibility-proof.json`

   but not a dedicated selection-consistency proof surface.

#### Family-wide expectations forced by this case

This one case already forces `selection-and-materialization` toward the following V16 rules:

1. Primary family proof objects should be first-class artifacts
   If the family has an explicit canonical proof object, it should not remain bundle-only by default.

2. Witness paths should name primary family proof surfaces honestly
   A proof hash alone is not enough if the proof object itself is supposed to be auditable.

3. Replay should include direct family inputs
   Lock, selected-source-material, visibility, exclusions, and the primary consistency proof should all be replay-visible.

4. Deliverables should reflect the same family shape as witness and replay layers
   A primary family proof object should not exist only in the bundle and witness hash layer.

#### Concrete closure signals for this case

Selection-consistency proof materialization is closed for V16 only when:

1. the family emits a dedicated selection-consistency proof artifact,
2. witness artifact paths include that artifact,
3. deliverables include that artifact,
4. replay artifacts include the family surfaces needed to reconstruct it,
5. and tests fail if the primary consistency proof surface disappears or drifts back to bundle-only status.

### Selection-And-Materialization case drill-down: lock/source/exclusion/visibility role closure

The second case for this family is role closure across the family's main surfaces.

This is the right next case because current source already emits multiple non-redundant family surfaces, but the family has not yet made their role split canonical enough.

#### Case statement

The current source says:
- `.engi/asset-pack.lock.json` carries lock truth,
- `.engi/selected-source-material.json` carries realized materialization truth,
- `.engi/materialization-exclusions.json` carries excluded-asset truth,
- `.engi/materialization-visibility-proof.json` carries visibility and projection-boundary truth,
- `.engi/materialization-proof.json` carries aggregate materialization closure truth,
- and `selectionConsistencyProof` carries selected-vs-lock-vs-settlement closure truth,

but the family does not yet name those role differences explicitly enough.

#### V15 specification precision and parity

For this case, V15 already implies:

1. selected assets, locked units, materialized source, exclusions, and visibility rules are mutually consistent,
2. rejected assets remain explainable,
3. branch-mode rights are respected,
4. settlement consumes only settlement-eligible assets,
5. and public visibility rules do not leak private materialization state.

The V16 parity reading is:
- these are not one undifferentiated family artifact bucket,
- each surface owns a different slice of family truth,
- and family closure should explicitly distinguish those slices.

#### Current source implementation precision

Current source exposes the following role distinctions:

1. `.engi/asset-pack.lock.json`
   owns:
   - locked assets,
   - locked units,
   - accepted use tiers,
   - and source-selection roots.

2. `.engi/selected-source-material.json`
   owns:
   - selected source material entries,
   - branch-mode rights per selected asset,
   - selected inventory entries,
   - and selected unit bindings.

3. `.engi/materialization-exclusions.json`
   owns:
   - excluded assets,
   - exclusion classes,
   - exclusion reasons,
   - `materializationAllowed`,
   - and `settlementAllowed`.

4. `.engi/materialization-visibility-proof.json`
   owns:
   - selected/materialized asset-set closure,
   - unit closure over the lock,
   - and no-private-leak-into-public-projection closure.

5. `.engi/materialization-proof.json`
   owns:
   - all-selected-assets-materialized closure,
   - all-exclusions-explained closure,
   - and refs to visibility and exclusions proofs.

6. `selectionConsistencyProof`
   owns:
   - asset-pack selection closure,
   - selected-assets-respect-use-tier closure,
   - materialized-source-manifest closure,
   - settlement participant subset closure,
   - and settlement-eligibility consumption closure.

#### Family-wide expectations forced by this case

This one case already forces `selection-and-materialization` toward the following V16 rules:

1. Artifact roles must be canonical
   The family should distinguish lock truth, realized source-material truth, exclusion truth, visibility truth, aggregate materialization truth, and selection-consistency truth.

2. Branch-mode and settlement consequences should be explicit
   The family should distinguish:
   - selected-asset rights,
   - excluded-asset rights,
   - settlement-participant subset truth,
   - and settlement-eligibility consumption truth.

3. Aggregate proofs should not erase primary inputs
   Materialization-proof and visibility-proof do not replace lock and selected-source-material surfaces.

4. Witness structure should follow those role distinctions
   Family witness closure should not flatten all six surfaces into opaque hashes only.

#### Concrete closure signals for this case

Role closure for this family is closed for V16 only when:

1. the family explicitly identifies the canonical role of each major artifact/proof surface,
2. branch-mode and settlement consequences are represented explicitly,
3. lock/source/exclusion/visibility/materialization/selection-consistency truth are not flattened into one generic family layer,
4. witness and replay paths preserve those distinctions,
5. and tests fail if those role boundaries drift silently.

### Selection-And-Materialization artifact-materialization determination guide

The family now has enough evidence to make a provisional artifact determination.

#### First-class artifact rule

A selection-and-materialization surface should be a mandatory first-class family artifact when any of the following is true:

1. it carries primary family truth rather than derivative summary truth,
2. replay depends on it directly,
3. other family surfaces close back to it,
4. it carries unique branch-mode, settlement, or visibility truth,
5. or its absence would materially weaken direct auditability of family closure.

#### Derived-surface rule

A selection-and-materialization surface may remain derived or secondary only when all of the following are true:

1. its underlying family truth is already preserved by a primary family artifact,
2. it adds summary or convenience structure rather than new proof truth,
3. its derivation path is explicit,
4. replay does not require it independently,
5. and tests can prove that it remains role-consistent with its source artifacts.

#### Provisional selection-and-materialization determinations

Under the current first-pass reading, the provisional V16 determination is:

1. Mandatory first-class family artifacts
   - `.engi/asset-pack.lock.json`
   - `.engi/selected-source-material.json`
   - `.engi/materialization-proof.json`
   - `.engi/materialization-exclusions.json`
   - `.engi/materialization-visibility-proof.json`
   - `.engi/selection-consistency-proof.json`

2. Family-adjacent but not family-defining
   - `.engi/match-report.json`
   It informs exclusions and selection narratives, but it should not stand in for the family's primary proof surfaces.

#### Current preferred determination

The current preferred V16 posture is:

1. treat lock, selected-source-material, exclusions, visibility, aggregate materialization, and selection-consistency as six first-class family surfaces,
2. add a dedicated selection-consistency artifact rather than leaving it bundle-only,
3. and stop letting witness hashes imply that those family surfaces are fully auditable without direct artifact carriage.

### Selection-And-Materialization case drill-down: witness-materialization and replay closure

The next case for this family is witness-materialization and replay closure.

This follows directly from the first two cases because:
- the family has a currently under-materialized primary proof object,
- its main surfaces are non-redundant,
- and replay currently omits several of them.

#### Case statement

The current source says:
- witness artifact paths name five family artifacts,
- witness refs include four family proof hashes,
- and replay includes two materialization artifacts,

but current witness and replay closure still flatten or omit too much:
- there is no dedicated selection-consistency artifact path,
- replay omits lock, selected-source-material, and visibility-proof,
- and replay instructions do not have a family-specific selection/materialization step.

#### V15 specification precision and parity

For this case, V15 already requires:

1. family proof-relevant artifacts and witness structures remain coherent,
2. rejected or downgraded assets remain explainable from witness-bearing evidence,
3. public visibility rules do not leak private materialization state,
4. and family closure remain auditable rather than bundle-implied only.

The V16 parity reading is:
- witness refs alone are not enough for the family's full closure story,
- replay should include the direct family inputs and proof surfaces,
- and selection/materialization replay should become a first-class family replay step.

#### Current source implementation precision

Current source exposes the following witness/replay mismatch:

1. `buildProofWitnessManifest(...)`
   names five family artifact paths and four proof hashes, but not a dedicated selection-consistency artifact path.

2. `buildSystemProofBundle(...).verifierEntrypoint.replayArtifacts`
   includes:
   - `.engi/materialization-proof.json`
   - `.engi/materialization-exclusions.json`

   but omits:
   - `.engi/asset-pack.lock.json`
   - `.engi/selected-source-material.json`
   - `.engi/materialization-visibility-proof.json`
   - `.engi/selection-consistency-proof.json`

3. current replay instructions do not have a family-specific selection/materialization step.

4. deliverables do not enumerate a dedicated selection-consistency artifact.

#### Family-wide expectations forced by this case

This one case already forces `selection-and-materialization` toward the following V16 rules:

1. Witness refs should represent direct family proof surfaces rather than bundle-only proof hashes alone.

2. Replay artifacts should include the family's direct inputs and primary proof surfaces.

3. Replay instructions should reconstruct:
   - selection-consistency closure,
   - materialized-source closure,
   - exclusion closure,
   - visibility closure,
   - and settlement-eligibility/materialization consequence closure.

4. Family replay should remain distinct from later settlement proof even where the two touch the lock.

#### Concrete closure signals for this case

Witness-materialization and replay closure are closed for V16 only when:

1. witness artifact paths include all primary family surfaces,
2. replay artifacts include all primary family surfaces,
3. replay instructions explicitly reconstruct the family's own closure path,
4. the dedicated selection-consistency artifact cannot disappear without failing the family,
5. and tests fail if replay or witness closure drifts back to partial materialization only.

### Selection-And-Materialization preferred expected/realized/family closure split

SAM now has enough structure to use the same canonical precision grammar as the prior families.

#### Expected truth layer

Should own:
- expected primary family surfaces,
- artifact-role definitions,
- branch-mode consequence rules,
- settlement-consumption rules,
- visibility-boundary rules.

#### Realized truth layer

Should own:
- emitted lock artifact,
- emitted selected-source-material artifact,
- emitted exclusions artifact,
- emitted visibility-proof artifact,
- emitted aggregate materialization proof,
- emitted selection-consistency proof,
- concrete selected/excluded/settlement-participant consequences.

#### Family closure layer

Should own:
- selection-consistency closure,
- lock/source closure,
- exclusion closure,
- visibility closure,
- branch-mode consequence closure,
- settlement-consumption closure,
- witness-materialization closure,
- replay closure,
- test closure.

### Selection-And-Materialization member coverage ledger

The current provisional family-member coverage reading is:

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

### Selection-And-Materialization member tightening signals

1. selected assets
   Closed only when asset-pack selection truth, selection-consistency proof, aggregate materialization proof, witness paths, replay, and tests all agree on one selected-asset set.

2. locked units
   Closed only when lock truth is first-class in witness/replay closure and every materialized or settlement-consumed unit closes exactly over that lock.

3. materialized source
   Closed only when selected-source-material entries, selection-consistency proof, materialization proof, witness paths, replay, and tests all agree on one materialized-source set.

4. exclusions
   Closed only when every excluded asset has an explicit exclusion/consequence record and exclusions remain replay-visible as a member rather than only as an aggregate proof side effect.

5. visibility rules
   Closed only when visibility-proof closure is first-class, replay-visible, and sufficient to prove no private materialization leakage into public or wrong-scope surfaces.

#### Current preferred stopping point

SAM is now complete enough in V16 drafting terms to continue later family work because:

1. the family's primary proof-object omission is explicit,
2. major artifact roles are explicit,
3. provisional artifact determination exists,
4. replay/witness direction exists,
5. and expected versus realized versus family closure ownership is now named.

---

### Selection-And-Materialization theorem-binding and proof-shape ratchets

1. theorem-binding debt
   The family theorem already depends on selected assets, lock, materialized source, exclusions, visibility, and selection consistency, but current replay and witness closure still omit several primary member surfaces.

2. required proof-shape direction
   V16 should require per-member verdicts for selected assets, lock, source, exclusions, and visibility, plus explicit binding from those verdicts into selection-consistency and aggregate materialization proof closure.

3. implementation ratchet
   A new selection-bearing artifact, exclusion consequence, or visibility rule must fail family closure unless the family proof, witnesses, replay, and tests are updated with that member truth.

4. minimum theorem-catalog target
   `selection_and_materialization.selected_asset_closure`, `selection_and_materialization.lock_closure`, `selection_and_materialization.materialized_source_closure`, `selection_and_materialization.exclusion_closure`, `selection_and_materialization.visibility_closure`, `selection_and_materialization.selection_consistency_closure`, and `selection_and_materialization.materialization_proof_closure` should each map to explicit verdict axes.

5. minimum proof-object field target
   The family proof should carry `theoremVerdicts`, `artifactBindings`, `replaySteps`, `memberVerdicts`, and `allTheoremsPassed`, with explicit binding from member verdicts into selection-consistency and aggregate materialization closure.

6. minimum artifact/replay binding target
   The family should bind `.engi/asset-pack.lock.json`, `.engi/selected-source-material.json`, `.engi/materialization-exclusions.json`, `.engi/materialization-visibility-proof.json`, a realized selection-consistency artifact, and `.engi/materialization-proof.json`, with replay steps for selected-set, lock/source, exclusions, visibility, and settlement-consumption closure.

## Authorization-And-Sensitive-Flow: initial V16 discovery ledger

This is the sixth proof family opened in the V16 draft.

The first AASF pass starts with family completeness around identity-binding witness truth.

That is the right entry point because current source already materializes:
- identity bindings,
- authorization decisions,
- sensitive-data-flow records,
- identity authorization proof,
- and sensitive-data-flow proof,

but the family witness layer still names only two of the three core emitted family artifacts.

### Authorization-and-sensitive-flow parity debt collection approaches

This family should be tightened through the following first-pass audits:

1. Family-membership audit
   Compare the V15-defined family members to emitted artifacts, proof objects, and witness paths.

2. Identity-binding audit
   Confirm where principals and bindings are materialized, where authorization proof depends on them, and whether witness closure names them directly enough.

3. Role-boundary audit
   Separate identity/principal truth, authorization-decision truth, and sensitive-data-flow truth.

4. Policy-boundary audit
   Compare confidentiality class, retention policy, disclosure policy, and public-surface controls across authorization and later disclosure families.

5. Witness-and-replay audit
   Compare emitted family artifacts to witness paths and replay artifacts.

6. Test-ratchet audit
   Turn any confirmed omission or boundary drift into a failing family test before calling AASF closed.

### Authorization-and-sensitive-flow specific implementation debts

The current first-pass debts are:

1. The family emits three primary branch artifacts:
   - `.engi/identity-bindings.json`
   - `.engi/authorization-decisions.json`
   - `.engi/sensitive-data-flow.json`

   but family witness artifact paths currently name only:
   - `.engi/authorization-decisions.json`
   - `.engi/sensitive-data-flow.json`

2. `IdentityAuthorizationProof` already depends directly on `bindings`, and its `witnessRefs.principalIds` are derived from those bindings, so omitting `.engi/identity-bindings.json` from witness artifact paths leaves the family's identity surface undernamed.

3. Current source already separates:
   - `IdentityAuthorizationProof`
   - `SensitiveDataFlowProof`

   but the family witness shape still compresses identity/authorization truth and sensitive-flow truth into a minimal two-hash summary.

4. Retention and disclosure-policy truth are currently carried in sensitive-data-flow records and policy release surfaces, but the family does not yet state clearly how:
   - confidentiality classes,
   - retention policies,
   - disclosure policies,
   - and public-surface denial

   belong inside this family versus later disclosure-boundary closure.

5. Current replay artifacts omit all three family artifacts and replay instructions do not reconstruct identity/authorization/sensitive-flow closure at all.

### Authorization-And-Sensitive-Flow case drill-down: identity-bindings materialization and family completeness

This is the first case because it tests whether the family materially names its own principal-binding surface before V16 sharpens the rest of the family.

#### Case statement

The current source says:
- the family covers principals and authorization decisions as well as confidentiality/disclosure-sensitive flow,
- `buildIdentityAuthorizationProof(...)` is computed directly from `bindings` and `authorizationDecisions`,
- `.engi/identity-bindings.json` is a required branch artifact and a deliverable,
- and the witness manifest digests that artifact,

but family witness artifact paths still omit `.engi/identity-bindings.json`.

That makes identity-binding materialization and family completeness the cleanest first AASF parity case.

#### V15 specification precision and parity

For this case, V15 already requires:

1. `authorization-and-sensitive-flow`
   Principals, authorization decisions, confidentiality classes, retention/disclosure rules, and sensitive-data flows are explicit and policy-backed.

2. identity and authorization obligations
   The buyer principal, GitHub installation or session bindings, signer bindings, branch/proof/settlement authorities, and authorization decisions are explicit.

The V16 parity reading is:
- principal/binding truth cannot be family-relevant only in branch artifacts while absent from family witness artifact paths,
- identity-binding materialization should be first-class rather than implied by proof hashes alone,
- and the family should fail if principal binding disappears while authorization decisions remain present.

#### Current source implementation precision

Current source exposes the following first-pass issues:

1. `buildIdentityAuthorizationProof(...)`
   computes:
   - `allAccessBoundToKnownPrincipals`
   - `issuerIdentityBound`
   - `buyerDeliveryPrincipalsBound`
   - `githubAppInstallationBound`
   - addressing/signing/auth-root closure

   all from `bindings`, `authorizationDecisions`, and selected candidates.

2. `assertRequiredBranchArtifacts(...)`
   requires:
   - `.engi/identity-bindings.json`
   - `.engi/authorization-decisions.json`
   - `.engi/sensitive-data-flow.json`

3. deliverables manifest includes `.engi/identity-bindings.json` as a concrete artifact.

4. `buildProofWitnessManifest(...)`
   digests `.engi/identity-bindings.json`,
   but family witness artifact paths still omit it.

#### Family-wide expectations forced by this case

This one case already forces `authorization-and-sensitive-flow` toward the following V16 rules:

1. Principal/binding truth must be first-class
   Identity bindings should be a named family artifact, not merely a proof input.

2. Family completeness should fail on missing binding surfaces
   Authorization decisions alone are not enough to close the family.

3. Proof hashes should not substitute for missing identity surfaces
   Witness refs may summarize proof objects, but witness artifact paths must still name the primary family artifacts they depend on.

4. Replay must reconstruct identity binding closure
   Replay should be able to show which principals, bindings, and authorization decisions yielded the family verdict.

#### Concrete closure signals for this case

Identity-binding materialization and family completeness are closed for V16 only when:

1. `.engi/identity-bindings.json` is a named primary family artifact,
2. family witness artifact paths include `.engi/identity-bindings.json`,
3. family closure fails if identity bindings disappear while authorization decisions remain,
4. replay can reconstruct principal-binding closure directly,
5. and tests fail if the family regresses back to authorization-only witness materialization.

### Authorization-And-Sensitive-Flow case drill-down: identity/authorization versus sensitive-flow role closure

The second case for AASF is role closure between identity/authorization truth and sensitive-data-flow truth.

This is the right next case because current source already emits two distinct proof objects:
- `IdentityAuthorizationProof`
- `SensitiveDataFlowProof`

and those proof objects own different truth.

#### Case statement

The current source says:
- identity authorization proof owns principals, permissions, signer/address/auth-root closure, and state-changing authorization truth,
- sensitive-data-flow proof owns classification, flow recording, retention/disclosure policy assignment, and public-disclosure denial,
- `.engi/authorization-decisions.json` and `.engi/sensitive-data-flow.json` are separate artifacts,
- and `.engi/identity-bindings.json` is also separate,

but the family does not yet state clearly what unique truth each surface owns or how retention/disclosure policy truth stays family-local here while later disclosure-boundary proves public projection boundedness.

#### V15 specification precision and parity

For this case, V15 already requires:

1. principals and authorization decisions be explicit,
2. confidentiality classes and retention/disclosure rules be explicit,
3. sensitive-data flows be policy-backed,
4. and public/private boundary truth remain coherent across proof families.

The V16 parity reading is:
- identity/principal truth is not the same as sensitive-data-flow truth,
- authorization-decision truth is not the same as disclosure-boundary truth,
- and the family should say which policy-bearing surfaces it owns directly versus which surfaces it hands off to disclosure-boundary later.

#### Current source implementation precision

Current source exposes the following second-pass issues:

1. `IdentityAuthorizationProof`
   currently owns:
   - principal binding truth,
   - state-changing authorization truth,
   - repo inventory read authorization,
   - selected asset addressing/signing/auth-root closure,
   - installation-scoped binding checks.

2. `SensitiveDataFlowProof`
   currently owns:
   - `allPrivateArtifactsClassified`,
   - `allFlowsRecorded`,
   - `requiredSensitiveClassesCovered`,
   - `noUnauthorizedPublicDisclosure`,
   - `retentionPoliciesAssigned`,
   - `revocationBehaviorDefined`.

3. `policyRelease` and disclosure-family surfaces also carry disclosure-related truth,
   so the family boundary is not yet named precisely enough between:
   - internal sensitive-data-flow policy assignment,
   - and later public disclosure boundedness.

4. Current witness refs summarize the family as two proof hashes only,
   which obscures the role split the runtime already models.

#### Family-wide expectations forced by this case

This one case already forces `authorization-and-sensitive-flow` toward the following V16 rules:

1. Identity, authorization, and sensitive-flow roles must be explicit
   The family should distinguish principal/binding surfaces, authorization-decision surfaces, and data-flow/policy surfaces.

2. Disclosure-policy assignment must be separated from public-disclosure proof
   This family owns policy assignment and flow recording; disclosure-boundary owns projection/public boundedness closure.

3. Witness structure should follow role distinctions
   Family witness closure should not flatten the family to two proof hashes only.

4. Replay should reconstruct both subpaths
   Replay should show how identity/authorization closure and sensitive-data-flow closure each pass.

#### Concrete closure signals for this case

Identity/authorization versus sensitive-flow role closure are closed for V16 only when:

1. the family names distinct primary surfaces for bindings, authorization decisions, and sensitive-data-flow records,
2. identity-authorization truth is visibly distinct from data-class/retention/disclosure-policy truth,
3. family replay reconstructs both subpaths explicitly,
4. later disclosure-boundary closure does not erase this family's own policy-assignment truth,
5. and tests fail if the role boundaries drift back into an undifferentiated private-proof bucket.

### Authorization-And-Sensitive-Flow artifact-materialization determination guide

The family now has enough evidence to make a provisional artifact determination.

#### First-class artifact rule

An authorization-and-sensitive-flow surface should be a mandatory first-class family artifact when any of the following is true:

1. it carries primary principal, binding, authorization, classification, or flow truth,
2. replay depends on it directly to reconstruct family closure,
3. other family surfaces close back to it,
4. it carries unique policy-bearing truth not preserved by another artifact,
5. or its absence would materially weaken direct auditability of the family.

#### Derived-surface rule

An authorization-and-sensitive-flow surface may remain derived or secondary only when all of the following are true:

1. its underlying truth is already preserved by a primary family artifact,
2. it adds summary or presentation structure rather than new policy-bearing truth,
3. its derivation path is explicit,
4. replay does not require it independently,
5. and tests can prove that it remains role-consistent with its primary source artifacts.

#### Provisional authorization-and-sensitive-flow determinations

Under the current first-pass reading, the provisional V16 determination is:

1. Mandatory first-class family artifacts
   - `.engi/identity-bindings.json`
   - `.engi/authorization-decisions.json`
   - `.engi/sensitive-data-flow.json`

2. Future likely first-class family artifacts once V16 formalizes family closure further
   - `.engi/identity-authorization-proof.json`
   - `.engi/sensitive-data-flow-proof.json`

#### Current preferred determination

The current preferred V16 posture is:

1. treat `.engi/identity-bindings.json` as the primary principal/binding artifact,
2. treat `.engi/authorization-decisions.json` as the primary authorization-decision artifact,
3. treat `.engi/sensitive-data-flow.json` as the primary classification/retention/disclosure-policy/flow artifact,
4. and stop letting witness artifact paths imply that two of the three primary family artifacts are enough.

### Authorization-And-Sensitive-Flow case drill-down: witness-materialization and replay closure

The next case for AASF is witness-materialization and replay closure.

This follows directly from the first two cases because:
- the family already emits three primary artifacts,
- runtime already computes two distinct proof objects,
- and current replay still omits all three family artifacts.

#### Case statement

The current source says:
- the witness manifest digests `.engi/identity-bindings.json`, `.engi/authorization-decisions.json`, and `.engi/sensitive-data-flow.json`,
- family witness artifact paths only name the latter two,
- and the system proof bundle replay entrypoint currently omits the family entirely,

so witness and replay closure are both thinner than emitted family truth.

#### V15 specification precision and parity

For this case, V15 already requires:

1. principals, authorization decisions, and sensitive-data-flow policy surfaces remain explicit,
2. proof-relevant family artifacts and family witnesses remain coherent,
3. and replayable family truth remains honest about what is being proven.

The V16 parity reading is:
- identity bindings cannot be witness-relevant only in artifact digests,
- replay should include the family's primary artifacts directly,
- and family replay should explicitly reconstruct identity/authorization closure and sensitive-data-flow closure.

#### Current source implementation precision

Current source exposes the following witness/replay mismatch:

1. `buildProofWitnessManifest(...)`
   names:
   - `.engi/authorization-decisions.json`
   - `.engi/sensitive-data-flow.json`

   but omits:
   - `.engi/identity-bindings.json`

   from family witness artifact paths.

2. `buildSystemProofBundle(...).verifierEntrypoint.replayArtifacts`
   omits all three family artifacts.

3. current replay instructions do not contain an authorization-and-sensitive-flow-specific step.

#### Family-wide expectations forced by this case

This one case already forces `authorization-and-sensitive-flow` toward the following V16 rules:

1. Witness artifact paths should include all primary family artifacts.

2. Replay artifacts should include all primary family artifacts.

3. Replay instructions should reconstruct:
   - principal-binding closure,
   - authorization-decision closure,
   - classification/retention/disclosure-policy closure,
   - and sensitive-data-flow closure.

4. Family replay should remain distinct from later disclosure-boundary public-projection closure.

#### Concrete closure signals for this case

Witness-materialization and replay closure are closed for V16 only when:

1. witness artifact paths include all three primary family artifacts,
2. replay artifacts include all three primary family artifacts,
3. replay instructions explicitly reconstruct the family's own closure path,
4. identity bindings cannot disappear from witness/replay without failing the family,
5. and tests fail if replay or witness closure drifts back to partial family substantiation.

### Authorization-And-Sensitive-Flow preferred expected/realized/family closure split

AASF now has enough structure to use the same canonical precision grammar as the prior families.

#### Expected truth layer

Should own:
- expected principal and binding surfaces,
- authorization-decision ownership rules,
- classification/retention/disclosure-policy ownership rules,
- family versus disclosure-boundary handoff rules.

#### Realized truth layer

Should own:
- emitted identity-bindings artifact,
- emitted authorization-decisions artifact,
- emitted sensitive-data-flow artifact,
- computed identity-authorization proof,
- computed sensitive-data-flow proof.

#### Family closure layer

Should own:
- principal-binding closure,
- authorization-decision closure,
- classification closure,
- retention/disclosure-policy assignment closure,
- sensitive-data-flow closure,
- artifact-role closure,
- witness-materialization closure,
- replay closure,
- test closure.

### Authorization-And-Sensitive-Flow member coverage ledger

The current provisional family-member coverage reading is:

1. principals
   Realized through identity bindings and identity-authorization proof.
   Current debt: witness artifact paths undername the principal-binding surface.

2. authorization decisions
   Realized through `.engi/authorization-decisions.json` and identity-authorization proof.
   Current debt: decision truth is present but not yet replayed as a family-specific path.

3. confidentiality classes
   Realized through sensitive-data-flow records and policy-release classes.
   Current debt: family ownership versus disclosure-boundary ownership is not yet sharp enough.

4. retention/disclosure rules
   Realized through retention-policy and disclosure-policy ids on sensitive-data-flow records.
   Current debt: the family has policy-assignment truth but not yet an explicit closure object naming that submember.

5. sensitive-data flows
   Realized through `.engi/sensitive-data-flow.json` and `SensitiveDataFlowProof`.
   Current debt: witness and replay closure are still too thin.

### Authorization-And-Sensitive-Flow member tightening signals

1. principals
   Closed only when all principal classes and authority bindings are first-class in artifact, witness, replay, and test closure.

2. authorization decisions
   Closed only when all state-changing and relevant access decisions are explicitly policy-backed and replay-visible as family-local authorization truth.

3. confidentiality classes
   Closed only when all required sensitive classes are assigned explicitly and family closure fails on any missing or misclassified class.

4. retention/disclosure rules
   Closed only when every sensitive flow carries explicit retention and disclosure-policy assignments and the handoff to disclosure-boundary remains explicit.

5. sensitive-data flows
   Closed only when all relevant flows are recorded, classified, policy-bound, and replay-visible without unauthorized public flow.

#### Current preferred stopping point

AASF is now complete enough in V16 drafting terms to continue later family work because:

1. the identity-binding omission is explicit,
2. role boundaries between identity/authorization and sensitive-flow are explicit,
3. provisional artifact determination exists,
4. replay/witness direction exists,
5. expected versus realized versus family closure ownership is now named,
6. and family-member coverage is now enumerated.

---

### Authorization-And-Sensitive-Flow theorem-binding and proof-shape ratchets

1. theorem-binding debt
   The family theorem already spans principal binding, authorization truth, classification truth, policy assignment, and sensitive-flow closure, but the current proof shape still risks flattening identity and flow truth into one private-proof layer.

2. required proof-shape direction
   V16 should require per-member verdicts for principals, decisions, classes, rules, and flows, plus explicit separation between identity-authorization proof and sensitive-data-flow proof and direct family witness artifacts for both.

3. implementation ratchet
   A new principal class, authority-binding path, sensitive class, or policy-bearing sink must fail family closure unless the family theorem binding, proof shape, replay, and tests are updated with it.

4. minimum theorem-catalog target
   `authorization_and_sensitive_flow.principal_authority_totality`, `authorization_and_sensitive_flow.authorization_decision_closure`, `authorization_and_sensitive_flow.classification_closure`, `authorization_and_sensitive_flow.policy_assignment_closure`, `authorization_and_sensitive_flow.no_unauthorized_public_flow`, and `authorization_and_sensitive_flow.witness_replay_closure` should each map to explicit verdict axes.

5. minimum proof-object field target
   The family proof should carry `theoremVerdicts`, `artifactBindings`, `replaySteps`, `memberVerdicts`, and `allTheoremsPassed`, with identity-authorization and sensitive-data-flow truth kept explicitly distinct.

6. minimum artifact/replay binding target
   The family should bind `.engi/identity-bindings.json`, `.engi/authorization-decisions.json`, `.engi/sensitive-data-flow.json`, a realized identity-authorization proof artifact, and a realized sensitive-data-flow proof artifact, with replay steps for principal, authorization, classification/policy assignment, flow, and unauthorized-public-flow closure.

## Settlement-Source-To-Shares: initial V16 discovery ledger

This is the seventh proof family opened in the V16 draft.

The first SSTS pass starts with settlement-proof versus journal-completeness witness truth.

That is the right entry point because current source already materializes:
- source-to-shares artifact,
- settlement-participation artifact,
- accounting-precision report,
- journal completeness proof,
- and settlement proof,

but family witness refs and witness artifact paths do not yet name those surfaces in a closure-consistent way.

### Settlement-source-to-shares parity debt collection approaches

This family should be tightened through the following first-pass audits:

1. Family-membership audit
   Compare the V15-defined family members to emitted artifacts, proof objects, and witness paths.

2. Allocation-closure audit
   Compare contribution, clipping, normalization, participation, allocation, journal, and settlement-proof surfaces for closure and drift.

3. Journal-versus-settlement-proof audit
   Distinguish theorem-bearing settlement proof from journal-completeness proof.

4. Artifact-role audit
   Separate source-to-shares, settlement-participation, accounting-precision, journal-diff, and settlement-proof roles.

5. Witness-and-replay audit
   Compare emitted family artifacts and proof objects to witness refs and replay artifacts.

6. Test-ratchet audit
   Turn any confirmed omission or role drift into a failing family test before calling SSTS closed.

### Settlement-source-to-shares specific implementation debts

The current first-pass debts are:

1. The family emits five primary branch artifacts:
   - `.engi/source-to-shares.json`
   - `.engi/settlement-participation.json`
   - `.engi/accounting-precision-report.json`
   - `.engi/settlement-proof.json`
   - `.engi/journal-diff.json`

2. `JournalCompletenessProof` is a canonical V15 proof object and runtime proof object,
   but there is no dedicated branch artifact for it.

3. Family witness artifact paths include `.engi/settlement-proof.json`,
   but family witness refs currently include:
   - `sourceToSharesArtifact.proofHash`
   - `settlementParticipationArtifact.proofHash`
   - `accountingPrecisionReport.reportHash`
   - `journalCompletenessProof.proofHash`

   and omit `settlementProof.proofHash`.

4. Replay artifacts include source-to-shares, settlement participation, accounting precision, and journal diff,
   but they omit `.engi/settlement-proof.json`.

5. Replay instructions currently mention source-to-shares clipping/normalization/allocation replay,
   but do not explicitly reconstruct journal-completeness closure or settlement theorem closure.

### Settlement-Source-To-Shares case drill-down: settlement-proof versus journal-completeness witness closure

This is the first case because it tests whether the family materially distinguishes its two strongest proof-bearing closure objects.

#### Case statement

The current source says:
- `JournalCompletenessProof` proves journal reason coverage, receipt closure, event consistency, and exact after-balance recomputation,
- `SettlementProof` proves theorem checks such as normalization, allocation conservation, debit-credit equality, non-negative balances, reference closure, and state-root integrity,
- `.engi/settlement-proof.json` is a required branch artifact,
- but there is no dedicated artifact for journal completeness and family witness refs omit `settlementProof.proofHash`.

That makes settlement-proof versus journal-completeness witness closure the cleanest first SSTS parity case.

#### V15 specification precision and parity

For this case, V15 already requires:

1. `settlement-source-to-shares`
   Contribution, clipping, normalization, participation, allocation, journal, and settlement proof surfaces close exactly.

2. settlement obligations
   Source-to-shares derivation is replayable, clipping and tie-breaks are stable, allocation is conserved, debits equal credits, state roots remain coherent, and zero-credit participants are explicit where present.

The V16 parity reading is:
- journal closure and settlement theorem closure are different submembers of the family,
- witness refs should not omit settlement-proof closure while naming the settlement-proof artifact path,
- and journal-completeness proof should not exist only as an internal proof object if the family expects direct auditability of that submember.

#### Current source implementation precision

Current source exposes the following first-pass issues:

1. `buildJournalCompletenessProof(...)`
   computes:
   - `allRequiredReasonsCovered`
   - `noUnclassifiedTransfers`
   - `eventRefsConsistent`
   - `replayableJournal`
   - `receiptRefsClosed`
   - `hasSingleIssuanceDebit`
   - `creditedEntryCountMatchesAllocations`
   - `afterBalancesRecomputeExactly`
   - `creditedAssetsMatchSettledShares`

2. `buildSettlementProof(...)`
   computes theorem checks:
   - `rawSharesNormalized`
   - `settledSharesNormalized`
   - `allocationConserved`
   - `debitsEqualCredits`
   - `noNegativeBalances`
   - `refsClosed`
   - `stateRootIntegrity`

3. `assertRequiredBranchArtifacts(...)`
   requires `.engi/settlement-proof.json`
   but there is no dedicated `.engi/journal-completeness-proof.json`.

4. `buildProofWitnessManifest(...)`
   names `.engi/settlement-proof.json`,
   but witness refs omit `settlementProof.proofHash`.

#### Family-wide expectations forced by this case

This one case already forces `settlement-source-to-shares` toward the following V16 rules:

1. Journal closure and settlement theorem closure must be explicit
   They should not collapse into one unnamed settlement proof layer.

2. Witness refs should align with named witness artifacts
   If `.engi/settlement-proof.json` is a primary family artifact, settlement-proof closure should appear directly in witness refs or an equivalent explicit witness structure.

3. Journal-completeness materialization should be explicit
   The family should either emit a dedicated journal-completeness artifact or state the exact reconstructible witness structure that stands in for it.

4. Replay must reconstruct both subpaths
   Replay should show journal closure and theorem closure distinctly.

#### Concrete closure signals for this case

Settlement-proof versus journal-completeness witness closure are closed for V16 only when:

1. settlement-proof closure is directly represented in family witness closure,
2. journal-completeness closure is directly represented by artifact or explicit witness structure,
3. witness artifact paths and witness refs no longer diverge silently,
4. replay reconstructs journal closure and theorem closure separately,
5. and tests fail if either subpath disappears or becomes bundle-only.

### Settlement-Source-To-Shares case drill-down: source-to-shares/participation/accounting/journal role closure

The second case for SSTS is artifact-role closure across the rest of the family.

This is the right next case because current source already emits multiple non-redundant settlement artifacts with different truth.

#### Case statement

The current source says:
- `.engi/source-to-shares.json` owns contribution, clipping receipts, normalization trace, and raw shares,
- `.engi/settlement-participation.json` owns selected-versus-participating-versus-credited records, including zero-credit participation,
- `.engi/accounting-precision-report.json` owns exact-allocation and journal-facing precision summaries,
- `.engi/journal-diff.json` owns ledger entries and balance transitions,
- `.engi/settlement-proof.json` owns theorem closure,

but the family does not yet state that role split canonically enough.

#### V15 specification precision and parity

For this case, V15 already requires:

1. contribution, clipping, normalization, participation, allocation, journal, and settlement proof surfaces remain explicit,
2. zero-credit participants remain explicit where present,
3. proof-bearing and settlement-bearing artifact references remain closed.

The V16 parity reading is:
- these artifacts are not redundant,
- each one owns a different family member or cross-member closure path,
- and witness/replay layers should preserve those role distinctions rather than flatten them into source-to-shares replay only.

#### Current source implementation precision

Current source exposes the following second-pass issues:

1. `buildSourceToSharesArtifact(...)`
   owns contribution entries, clipping receipts, normalization ledger, raw shares, and proof hash.

2. `buildSettlementParticipationArtifact(...)`
   owns selected, settlement participating, positively credited, zero-credit participating, and excluded-from-settlement records.

3. `accountingPrecisionReport`
   is emitted as a first-class artifact and witnesses exact precision/report truth.

4. `journalDiff`
   is emitted as a first-class artifact and owns actual ledger entry/balance state.

5. `SettlementProof`
   is theorem-bearing and non-redundant with the previous artifacts.

6. current replay instructions still compress the family mostly to source-to-shares marginal contribution replay and exact micro-unit allocation.

#### Family-wide expectations forced by this case

This one case already forces `settlement-source-to-shares` toward the following V16 rules:

1. Contribution/clipping/normalization, participation, accounting precision, journal, and settlement proof must remain role-distinguished.

2. Zero-credit participation must remain a first-class participation submember rather than an incidental report fact.

3. Exact-allocation and theorem closure should stay distinct
   Accounting precision report is not the same thing as settlement proof.

4. Replay should cover the full settlement family
   Not only marginal contribution and normalization, but participation, journal, exact allocation, and theorem closure.

#### Concrete closure signals for this case

Role closure across the settlement family is closed for V16 only when:

1. the family names distinct primary surfaces for source-to-shares, participation, accounting precision, journal, and settlement proof,
2. zero-credit participation remains explicit and replay-visible,
3. accounting-precision truth is not conflated with theorem-bearing settlement proof,
4. replay reconstructs the full settlement family path,
5. and tests fail if one artifact starts silently substituting for another family's submember.

### Settlement-Source-To-Shares artifact-materialization determination guide

The family now has enough evidence to make a provisional artifact determination.

#### First-class artifact rule

A settlement-source-to-shares surface should be a mandatory first-class family artifact when any of the following is true:

1. it carries primary contribution, allocation, journal, or theorem truth,
2. replay depends on it directly to reconstruct family closure,
3. other family surfaces close back to it,
4. it carries unique exactness or participation truth not preserved by another artifact,
5. or its absence would materially weaken direct auditability of the family.

#### Derived-surface rule

A settlement-source-to-shares surface may remain derived or secondary only when all of the following are true:

1. its underlying truth is already preserved by a primary family artifact,
2. it adds summary or presentation structure rather than new exactness truth,
3. its derivation path is explicit,
4. replay does not require it independently,
5. and tests can prove that it remains role-consistent with its primary source artifacts.

#### Provisional settlement-source-to-shares determinations

Under the current first-pass reading, the provisional V16 determination is:

1. Mandatory first-class family artifacts
   - `.engi/source-to-shares.json`
   - `.engi/settlement-participation.json`
   - `.engi/accounting-precision-report.json`
   - `.engi/journal-diff.json`
   - `.engi/settlement-proof.json`

2. Future likely first-class family artifacts once V16 formalizes family closure further
   - `.engi/journal-completeness-proof.json`
   - `.engi/settlement-source-to-shares-proof.json`

#### Current preferred determination

The current preferred V16 posture is:

1. treat `.engi/source-to-shares.json` as the primary contribution/clipping/normalization artifact,
2. treat `.engi/settlement-participation.json` as the primary participation artifact,
3. treat `.engi/accounting-precision-report.json` and `.engi/journal-diff.json` as distinct exact-allocation and ledger-state artifacts,
4. treat `.engi/settlement-proof.json` as the primary theorem-bearing artifact,
5. and stop letting witness/replay closure undername journal completeness and settlement proof.

### Settlement-Source-To-Shares case drill-down: witness-materialization and replay closure

The next case for SSTS is witness-materialization and replay closure.

This follows directly from the first two cases because:
- the family already emits five primary artifacts,
- runtime already computes two distinct proof objects,
- and replay still omits one primary artifact and both subpath instructions.

#### Case statement

The current source says:
- family witness artifact paths include `.engi/settlement-proof.json`,
- family witness refs include `journalCompletenessProof.proofHash` but not `settlementProof.proofHash`,
- replay artifacts include source-to-shares, participation, accounting precision, and journal diff,
- but replay omits settlement proof and does not explicitly reconstruct journal completeness or theorem closure.

#### V15 specification precision and parity

For this case, V15 already requires:

1. exact settlement closure remain replayable,
2. proof-bearing and settlement-bearing artifact references remain closed,
3. and theorem-bearing and journal-bearing truth remain honest about what is being proven.

The V16 parity reading is:
- replay should include settlement theorem closure explicitly,
- witness closure should not imply settlement proof while omitting its direct proof hash,
- and journal-completeness closure should be explicit rather than hidden in internal computation only.

#### Current source implementation precision

Current source exposes the following witness/replay mismatch:

1. witness artifact paths name `.engi/settlement-proof.json` but witness refs omit `settlementProof.proofHash`.

2. there is no dedicated branch artifact for journal-completeness proof.

3. replay artifacts omit `.engi/settlement-proof.json`.

4. replay instructions do not contain a settlement-family-specific step for journal completeness or theorem closure.

#### Family-wide expectations forced by this case

This one case already forces `settlement-source-to-shares` toward the following V16 rules:

1. Witness refs should represent settlement-theorem closure as well as journal closure.

2. Replay artifacts should include all primary family artifacts.

3. Replay instructions should reconstruct:
   - contribution/clipping/normalization closure,
   - participation closure,
   - exact-allocation closure,
   - journal closure,
   - and settlement theorem closure.

4. Family replay should remain distinct from later proof-contract bundle closure.

#### Concrete closure signals for this case

Witness-materialization and replay closure are closed for V16 only when:

1. witness refs and witness artifact paths align across journal and settlement proof subpaths,
2. replay artifacts include all primary family artifacts,
3. replay instructions explicitly reconstruct the full settlement family path,
4. theorem closure cannot disappear from replay without failing the family,
5. and tests fail if replay or witness closure drifts back to partial settlement substantiation.

### Settlement-Source-To-Shares preferred expected/realized/family closure split

SSTS now has enough structure to use the same canonical precision grammar as the prior families.

#### Expected truth layer

Should own:
- expected contribution/clipping/normalization surfaces,
- participation rules,
- exact-allocation and journal rules,
- theorem-bearing settlement proof rules,
- artifact-role definitions.

#### Realized truth layer

Should own:
- emitted source-to-shares artifact,
- emitted settlement-participation artifact,
- emitted accounting-precision artifact,
- emitted journal-diff artifact,
- emitted settlement-proof artifact,
- computed journal-completeness proof.

#### Family closure layer

Should own:
- contribution/clipping/normalization closure,
- participation closure,
- exact-allocation closure,
- journal closure,
- settlement theorem closure,
- artifact-role closure,
- witness-materialization closure,
- replay closure,
- test closure.

### Settlement-Source-To-Shares member coverage ledger

The current provisional family-member coverage reading is:

1. contribution
   Realized through source contribution entries in `.engi/source-to-shares.json`.
   Current debt: contribution closure is not yet explicitly named in family replay instructions.

2. clipping
   Realized through clipping receipts and marginal-contribution replay structures.
   Current debt: clipping closure is present but still folded into a broader replay step.

3. normalization
   Realized through basis-point normalization and raw shares in `.engi/source-to-shares.json`.
   Current debt: theorem-bearing closure is not yet visibly linked back to settlement proof in witness refs.

4. participation
   Realized through `.engi/settlement-participation.json`.
   Current debt: participation remains explicit, but replay undernames it.

5. allocation
   Realized through exact micro-unit allocation in accounting precision plus journal diff.
   Current debt: allocation exactness is not yet separated cleanly from broader settlement replay.

6. journal
   Realized through `.engi/journal-diff.json` and `JournalCompletenessProof`.
   Current debt: journal-completeness proof has no first-class artifact.

7. settlement proof
   Realized through `.engi/settlement-proof.json` and `SettlementProof`.
   Current debt: witness refs omit direct settlement-proof closure and replay omits the artifact.

### Settlement-Source-To-Shares member tightening signals

1. contribution
   Closed only when every settlement candidate has explicit contribution truth and marginal-contribution replay remains stable.

2. clipping
   Closed only when every settlement candidate has explicit clipping disposition and clipping receipts remain replay-stable.

3. normalization
   Closed only when basis-point normalization totals exactly and remains directly tied to later theorem closure.

4. participation
   Closed only when participation records cover selected, participating, positively credited, zero-credit, and excluded states for every relevant asset.

5. allocation
   Closed only when exact allocation is conserved, accounting precision agrees with journal truth, and replay reproduces the same allocation domain exactly.

6. journal
   Closed only when journal-diff truth and journal-completeness closure are both explicit, witnessable, and replay-visible.

7. settlement proof
   Closed only when theorem-bearing settlement proof is directly witnessed and replay-visible with no gap between artifact, witness refs, and family replay.

#### Current preferred stopping point

SSTS is now complete enough in V16 drafting terms to continue later family work because:

1. journal-versus-settlement-proof closure is explicit,
2. the rest of the family role split is explicit,
3. provisional artifact determination exists,
4. replay/witness direction exists,
5. expected versus realized versus family closure ownership is now named,
6. and family-member coverage is now enumerated.

---

### Settlement-Source-To-Shares theorem-binding and proof-shape ratchets

1. theorem-binding debt
   The family theorem already depends on exact settlement closure, but journal closure and theorem-bearing settlement closure can still collapse into one underdistinguished path in witness and replay space.

2. required proof-shape direction
   V16 should require per-member verdicts for contribution, clipping, normalization, participation, allocation, journal, and settlement proof, with explicit distinction between journal-completeness closure and theorem-bearing settlement closure.

3. implementation ratchet
   A new allocation rule, participation state, journal artifact, or theorem check must fail family closure unless exact replay, witness bindings, and family proof shape are extended with it.

4. minimum theorem-catalog target
   `settlement_source_to_shares.contribution_totality`, `settlement_source_to_shares.clipping_determinism`, `settlement_source_to_shares.normalization_exactness`, `settlement_source_to_shares.participation_totality`, `settlement_source_to_shares.allocation_conservation`, `settlement_source_to_shares.journal_completeness`, and `settlement_source_to_shares.settlement_theorem_integrity` should each map to explicit verdict axes.

5. minimum proof-object field target
   The family proof should carry `theoremVerdicts`, `artifactBindings`, `replaySteps`, `memberVerdicts`, and `allTheoremsPassed`, with journal closure and theorem-bearing settlement closure kept explicit and distinct.

6. minimum artifact/replay binding target
   The family should bind `.engi/source-to-shares.json`, `.engi/settlement-participation.json`, `.engi/accounting-precision-report.json`, `.engi/journal-diff.json`, a realized journal-completeness artifact, and `.engi/settlement-proof.json`, with replay steps for contribution/clipping/normalization, participation, exact allocation, journal, and theorem closure.

## Disclosure-Boundary: initial V16 discovery ledger

This is the eighth proof family opened in the V16 draft.

The first disclosure pass starts with bounded-public-proof witness omission and family completeness.

That is the right entry point because current source already materializes:
- projection policy,
- bounded-public proof,
- redaction proof,
- and disclosure proof,

but family witness artifact paths still omit the bounded-public proof even though the family definition names it explicitly.

### Disclosure-boundary parity debt collection approaches

This family should be tightened through the following first-pass audits:

1. Family-membership audit
   Compare the V15-defined family members to emitted artifacts, proof objects, and witness paths.

2. Bounded-public audit
   Confirm what bounded-public proof actually carries, how it is referenced by later surfaces, and whether it is witnessed directly enough.

3. Projection-role audit
   Separate projection-policy truth, bounded-public proof truth, redaction truth, and disclosure proof truth.

4. Witness-and-replay audit
   Compare emitted disclosure-family artifacts to witness paths and replay artifacts.

5. Family-boundary audit
   Keep disclosure-boundary distinct from authorization-sensitive-flow policy assignment and proof-contract bundle closure.

6. Test-ratchet audit
   Turn any confirmed omission or role drift into a failing family test before calling disclosure-boundary closed.

### Disclosure-boundary specific implementation debts

The current first-pass debts are:

1. The family emits four primary branch artifacts:
   - `.engi/projection-policy.json`
   - `.engi/bounded-public-proof.json`
   - `.engi/redaction-proof.json`
   - `.engi/disclosure-proof.json`

2. `buildProofWitnessManifest(...)`
   digests all four family artifacts,
   but family witness artifact paths currently name only:
   - `.engi/projection-policy.json`
   - `.engi/redaction-proof.json`
   - `.engi/disclosure-proof.json`

   and omit `.engi/bounded-public-proof.json`.

3. Family witness refs currently include only:
   - `redactionProof.boundedPublicProofHash`
   - `disclosureProof.boundedPublicProofHash`

   so the family witnesses bounded-public proof indirectly rather than as a first-class member.

4. System proof bundle replay currently omits all disclosure-family artifacts and replay instructions do not reconstruct disclosure-boundary closure at all.

### Disclosure-Boundary case drill-down: bounded-public-proof materialization and family completeness

This is the first case because it tests whether the family names its own most distinctive bounded-public submember directly enough.

#### Case statement

The current source says:
- V15 defines disclosure-boundary as projection policy, bounded-public proof, redaction proof, and disclosure proof agreeing and remaining bounded,
- `.engi/bounded-public-proof.json` is a required branch artifact and deliverable,
- redaction proof and disclosure proof both hash back to the bounded-public proof,
- but family witness artifact paths still omit `.engi/bounded-public-proof.json`.

That makes bounded-public-proof materialization and family completeness the cleanest first disclosure parity case.

#### V15 specification precision and parity

For this case, V15 already requires:

1. `disclosure-boundary`
   Projection policy, bounded-public proof, redaction proof, and disclosure proof agree and remain bounded.

2. projection/disclosure obligations
   Only allowed artifacts are public, private artifacts do not leak into public projection, bounded public proof is metadata-bounded, and redaction/disclosure proofs agree with policy release.

The V16 parity reading is:
- bounded-public proof is a first-class family member, not a secondary hash source only,
- witness artifact paths should name it directly,
- and the family should fail if bounded-public proof disappears while redaction/disclosure still point at its hash.

#### Current source implementation precision

Current source exposes the following first-pass issues:

1. `buildBoundedPublicProofArtifact(...)`
   owns:
   - selected asset ids and counts,
   - invariant summary,
   - proof contract ref and evidence chain summary,
   - prompt-completeness summary,
   - static-measurement summary,
   - source-to-shares summary,
   - redaction status.

2. `assertRequiredBranchArtifacts(...)`
   requires `.engi/bounded-public-proof.json`.

3. deliverables manifest includes `.engi/bounded-public-proof.json`.

4. `buildProofWitnessManifest(...)`
   digests `.engi/bounded-public-proof.json`,
   but family witness artifact paths omit it.

#### Family-wide expectations forced by this case

This one case already forces `disclosure-boundary` toward the following V16 rules:

1. Bounded-public proof must be first-class
   It should be a named family artifact, not an implicit hash anchor only.

2. Family completeness should fail on missing bounded-public proof
   Redaction/disclosure hashes alone are not enough.

3. Witness artifact paths should reflect explicit family membership
   If the family definition names a bounded-public proof, the witness layer should too.

4. Replay must reconstruct bounded-public closure
   Replay should be able to show the metadata-bounded public proof path directly.

#### Concrete closure signals for this case

Bounded-public-proof materialization and family completeness are closed for V16 only when:

1. `.engi/bounded-public-proof.json` is a named primary family artifact,
2. family witness artifact paths include `.engi/bounded-public-proof.json`,
3. family closure fails if bounded-public proof disappears while redaction/disclosure remain,
4. replay can reconstruct bounded-public closure directly,
5. and tests fail if the family regresses back to indirect bounded-public substantiation only.

### Disclosure-Boundary case drill-down: projection/bounded-public/redaction/disclosure role closure

The second case for disclosure-boundary is role closure across the four family members.

This is the right next case because current source already emits four non-redundant disclosure-family artifacts with different truth.

#### Case statement

The current source says:
- `projection-policy.json` owns principals, artifact rules, and public/private artifact sets,
- `bounded-public-proof.json` owns the metadata-bounded public proof surface,
- `redaction-proof.json` owns redacted artifact/source/latest-run fields and public artifact paths,
- `disclosure-proof.json` owns allowed and denied public artifact paths plus boundedness confirmation,

but the family does not yet state those roles canonically enough.

#### V15 specification precision and parity

For this case, V15 already requires:

1. only allowed artifacts are public,
2. private artifacts do not leak into public projection,
3. bounded-public proof remains metadata-bounded,
4. redaction and disclosure proofs agree with policy release.

The V16 parity reading is:
- projection policy is not the same as bounded-public proof,
- bounded-public proof is not the same as redaction proof,
- redaction proof is not the same as disclosure proof,
- and witness/replay layers should preserve those role distinctions rather than collapsing them into disclosure proof alone.

#### Current source implementation precision

Current source exposes the following second-pass issues:

1. `buildProjectionPolicy(...)`
   owns principal visibility policies, artifact rules, public/private artifact sets, and materialized branch file count.

2. `buildBoundedPublicProofArtifact(...)`
   owns metadata-bounded proof summaries derived from system proof surfaces.

3. `buildRedactionProof(...)`
   owns redacted artifact paths, redacted source-material paths, and bounded-public-proof hash.

4. `buildDisclosureProof(...)`
   owns allowed/denied public artifact paths, projection policy ref, bounded-public-proof hash, and `publicDisclosureOnlyUsesBoundedMetadata`.

5. current witness refs summarize the family via bounded-public hashes only,
   which obscures the distinct truth each family artifact already carries.

#### Family-wide expectations forced by this case

This one case already forces `disclosure-boundary` toward the following V16 rules:

1. Projection policy, bounded-public proof, redaction proof, and disclosure proof must remain role-distinguished.

2. Bounded-public proof should stay separate from policy and proof-of-application layers.

3. Witness structure should follow role distinctions
   Bounded-public hashes alone are not enough to witness full family closure.

4. Replay should reconstruct all four member surfaces
   Not only the final disclosure verdict, but the policy, bounded-public proof, redaction, and disclosure path.

#### Concrete closure signals for this case

Role closure across disclosure-boundary is closed for V16 only when:

1. the family names distinct primary surfaces for policy, bounded-public proof, redaction, and disclosure,
2. bounded-public proof remains explicit rather than implicit under redaction/disclosure hashes,
3. replay reconstructs all four member paths explicitly,
4. witness closure does not flatten the family to bounded-public hashes only,
5. and tests fail if one disclosure-family artifact starts silently substituting for another member's truth.

### Disclosure-Boundary artifact-materialization determination guide

The family now has enough evidence to make a provisional artifact determination.

#### First-class artifact rule

A disclosure-boundary surface should be a mandatory first-class family artifact when any of the following is true:

1. it carries primary policy, bounded-public, redaction, or disclosure truth,
2. replay depends on it directly to reconstruct family closure,
3. other family surfaces close back to it,
4. it carries unique boundedness truth not preserved by another artifact,
5. or its absence would materially weaken direct auditability of the family.

#### Derived-surface rule

A disclosure-boundary surface may remain derived or secondary only when all of the following are true:

1. its underlying truth is already preserved by a primary family artifact,
2. it adds summary or presentation structure rather than new boundedness truth,
3. its derivation path is explicit,
4. replay does not require it independently,
5. and tests can prove that it remains role-consistent with its primary source artifacts.

#### Provisional disclosure-boundary determinations

Under the current first-pass reading, the provisional V16 determination is:

1. Mandatory first-class family artifacts
   - `.engi/projection-policy.json`
   - `.engi/bounded-public-proof.json`
   - `.engi/redaction-proof.json`
   - `.engi/disclosure-proof.json`

2. Future likely first-class family artifacts once V16 formalizes family closure further
   - `.engi/disclosure-boundary-proof.json`

#### Current preferred determination

The current preferred V16 posture is:

1. treat `.engi/projection-policy.json` as the primary policy artifact,
2. treat `.engi/bounded-public-proof.json` as the primary bounded-public artifact,
3. treat `.engi/redaction-proof.json` as the primary redaction-application artifact,
4. treat `.engi/disclosure-proof.json` as the primary disclosure-verdict artifact,
5. and stop letting witness paths imply that bounded-public proof can remain indirect only.

### Disclosure-Boundary case drill-down: witness-materialization and replay closure

The next case for disclosure-boundary is witness-materialization and replay closure.

This follows directly from the first two cases because:
- the family already emits four primary artifacts,
- the witness layer currently undernames one core member,
- and replay still omits the entire family.

#### Case statement

The current source says:
- the witness manifest digests all four disclosure-family artifacts,
- family witness artifact paths omit `.engi/bounded-public-proof.json`,
- family witness refs flatten the family to bounded-public hashes only,
- and system-proof-bundle replay omits all disclosure-family artifacts.

#### V15 specification precision and parity

For this case, V15 already requires:

1. only allowed artifacts become public,
2. public disclosure stays metadata-bounded,
3. proof-relevant disclosure artifacts and family witnesses remain coherent,
4. and replayable disclosure truth remains honest about what is being proven.

The V16 parity reading is:
- replay should include the disclosure family's primary artifacts directly,
- witness closure should not flatten the family to bounded-public hashes only,
- and disclosure-family replay should reconstruct policy, bounded-public, redaction, and disclosure closure explicitly.

#### Current source implementation precision

Current source exposes the following witness/replay mismatch:

1. family witness artifact paths omit `.engi/bounded-public-proof.json`.

2. family witness refs represent the family via bounded-public-proof hashes only.

3. replay artifacts omit `.engi/projection-policy.json`, `.engi/bounded-public-proof.json`, `.engi/redaction-proof.json`, and `.engi/disclosure-proof.json`.

4. current replay instructions do not contain a disclosure-family-specific step.

#### Family-wide expectations forced by this case

This one case already forces `disclosure-boundary` toward the following V16 rules:

1. Witness artifact paths should include all four primary family artifacts.

2. Replay artifacts should include all four primary family artifacts.

3. Replay instructions should reconstruct:
   - projection-policy closure,
   - bounded-public closure,
   - redaction closure,
   - and disclosure closure.

4. Family replay should remain distinct from earlier policy-assignment truth in authorization-and-sensitive-flow.

#### Concrete closure signals for this case

Witness-materialization and replay closure are closed for V16 only when:

1. witness artifact paths include all four primary family artifacts,
2. replay artifacts include all four primary family artifacts,
3. replay instructions explicitly reconstruct the family's own closure path,
4. bounded-public proof cannot disappear from witness/replay without failing the family,
5. and tests fail if replay or witness closure drifts back to indirect bounded-public substantiation only.

### Disclosure-Boundary preferred expected/realized/family closure split

Disclosure-boundary now has enough structure to use the same canonical precision grammar as the prior families.

#### Expected truth layer

Should own:
- expected policy, bounded-public, redaction, and disclosure surfaces,
- artifact-role definitions,
- boundedness rules,
- family versus authorization-family handoff rules.

#### Realized truth layer

Should own:
- emitted projection-policy artifact,
- emitted bounded-public-proof artifact,
- emitted redaction-proof artifact,
- emitted disclosure-proof artifact.

#### Family closure layer

Should own:
- policy closure,
- bounded-public closure,
- redaction closure,
- disclosure closure,
- artifact-role closure,
- witness-materialization closure,
- replay closure,
- test closure.

### Disclosure-Boundary member coverage ledger

The current provisional family-member coverage reading is:

1. projection policy
   Realized through `.engi/projection-policy.json`.
   Current debt: replay omits it entirely.

2. bounded-public proof
   Realized through `.engi/bounded-public-proof.json`.
   Current debt: witness artifact paths omit it even though the family definition names it explicitly.

3. redaction proof
   Realized through `.engi/redaction-proof.json`.
   Current debt: redaction is present, but family witness closure overrelies on bounded-public hashes only.

4. disclosure proof
   Realized through `.engi/disclosure-proof.json`.
   Current debt: disclosure verdict is present, but replay does not reconstruct the family path that yields it.

### Disclosure-Boundary member tightening signals

1. projection policy
   Closed only when principal visibility rules and artifact rules are explicit, first-class, and sufficient to determine public versus denied paths directly.

2. bounded-public proof
   Closed only when bounded-public proof is first-class in artifact, witness, replay, and test closure and does not survive only as an indirect hash anchor.

3. redaction proof
   Closed only when redaction paths agree with policy and bounded-public proof and remain directly replay-visible.

4. disclosure proof
   Closed only when allowed/denied public paths, policy reference, boundedness verdict, witness paths, replay, and tests all agree on one disclosure outcome.

#### Current preferred stopping point

Disclosure-boundary is now complete enough in V16 drafting terms to continue later family work because:

1. the bounded-public omission is explicit,
2. role boundaries across the four members are explicit,
3. provisional artifact determination exists,
4. replay/witness direction exists,
5. expected versus realized versus family closure ownership is now named,
6. and family-member coverage is now enumerated.

---

### Disclosure-Boundary theorem-binding and proof-shape ratchets

1. theorem-binding debt
   The family theorem already depends on projection policy and bounded-public truth, but redaction and disclosure surfaces still risk standing in for those primary members rather than remaining downstream of them.

2. required proof-shape direction
   V16 should require per-member verdicts for policy, bounded-public, redaction, and disclosure plus explicit agreement surfaces showing that policy and bounded-public truth stay primary.

3. implementation ratchet
   A new public artifact path, projection rule, or redaction rule must fail family closure unless policy truth, bounded-public truth, replay, and tests are updated with it.

4. minimum theorem-catalog target
   `disclosure_boundary.projection_policy_closure`, `disclosure_boundary.bounded_public_metadata_only`, `disclosure_boundary.redaction_alignment`, `disclosure_boundary.disclosure_verdict_alignment`, and `disclosure_boundary.witness_replay_closure` should each map to explicit verdict axes.

5. minimum proof-object field target
   The family proof should carry `theoremVerdicts`, `artifactBindings`, `replaySteps`, `memberVerdicts`, and `allTheoremsPassed`, with policy and bounded-public truth remaining primary rather than implied by later artifacts.

6. minimum artifact/replay binding target
   The family should bind `.engi/projection-policy.json`, `.engi/bounded-public-proof.json`, `.engi/redaction-proof.json`, `.engi/disclosure-proof.json`, and a realized family proof artifact, with replay steps for policy, bounded-public, redaction, disclosure, and policy-to-disclosure agreement.

## Proof-Contract: initial V16 discovery ledger

This is the ninth proof family opened in the V16 draft.

The first proof-contract pass starts with proof-contract under-materialization and bundle-only carriage.

That is the right entry point because current source already materializes:
- a runtime `proofContract`,
- a system proof bundle,
- a proof witness manifest,
- evidence-chain stages,
- and theorem checks,

but the family witness layer still names only the system-proof-bundle artifact and the proof contract itself is not emitted as a dedicated artifact.

### Proof-contract parity debt collection approaches

This family should be tightened through the following first-pass audits:

1. Family-membership audit
   Compare the V15-defined family members to emitted artifacts, proof objects, and witness paths.

2. Bundle-versus-contract audit
   Separate system-proof-bundle truth from proof-contract truth.

3. Witness-manifest audit
   Determine how proof-witness-manifest belongs inside proof-contract family closure rather than remaining only adjacent support.

4. Evidence-chain audit
   Confirm where cross-family stage claims and theorem checks are carried and how replay should reconstruct them.

5. Witness-and-replay audit
   Compare emitted proof-contract-adjacent artifacts to witness paths and replay artifacts.

6. Test-ratchet audit
   Turn any confirmed omission or bundle-only substitution into a failing family test before calling proof-contract closed.

### Proof-contract specific implementation debts

The current first-pass debts are:

1. The family currently has only one named witness artifact path:
   - `.engi/system-proof-bundle.json`

2. `proofContract` itself is carried only inside `.engi/system-proof-bundle.json`.
   There is no dedicated `.engi/proof-contract.json` artifact.

3. `.engi/proof-witness-manifest.json` is a required branch artifact and a deliverable,
   but the proof-contract family witness artifact paths currently omit it.

4. Family witness refs currently include:
   - `proofContract.contractId`
   - `settlementProof.assetPackLockHash`

   which is too thin for a family defined as the system proof bundle and proof contract binding the cross-cutting closure path end to end.

5. replay artifacts currently omit:
   - `.engi/system-proof-bundle.json`
   - `.engi/proof-witness-manifest.json`
   - any dedicated proof-contract artifact

6. replay instructions do not explicitly reconstruct proof-contract family closure, evidence-chain closure, or theorem-check closure.

### Proof-Contract case drill-down: proof-contract materialization and bundle-only carriage

This is the first case because it tests whether the family materially names its own contract surface directly enough.

#### Case statement

The current source says:
- V15 defines proof-contract as the system proof bundle and proof contract binding the cross-cutting closure path end to end,
- runtime computes `proofContract` as a distinct object with `contractId`, `evidenceChain`, `theoremChecks`, and `artifactBindings`,
- `.engi/system-proof-bundle.json` is a required branch artifact,
- but `proofContract` itself is not emitted as a dedicated artifact and witness artifact paths name only the bundle.

That makes proof-contract materialization and bundle-only carriage the cleanest first proof-contract parity case.

#### V15 specification precision and parity

For this case, V15 already requires:

1. `proof-contract`
   The system proof bundle and proof contract bind the cross-cutting closure path end to end.

2. theorem catalog and witness-manifest closure rules
   Theorem-style checks have stable identities and witness bindings, and proof-relevant artifacts and family witnesses remain coherent.

The V16 parity reading is:
- proof contract is a first-class family member, not a bundle field only,
- the family should fail if the proof contract disappears while the system proof bundle still exists,
- and witness/replay layers should not treat the bundle as a sufficient stand-in for the contract itself.

#### Current source implementation precision

Current source exposes the following first-pass issues:

1. `buildProofContract(...)`
   computes:
   - `contractId`
   - `needId`
   - `assetPackId`
   - `branchName`
   - evidence-chain stages
   - theorem checks
   - artifact bindings

2. `buildSystemProofBundle(...)`
   embeds `proofContract` inside the bundle.

3. `assertRequiredBranchArtifacts(...)`
   requires `.engi/system-proof-bundle.json`
   but there is no dedicated `.engi/proof-contract.json`.

4. `buildProofWitnessManifest(...)`
   names only `.engi/system-proof-bundle.json` for the family.

#### Family-wide expectations forced by this case

This one case already forces `proof-contract` toward the following V16 rules:

1. Proof contract must be first-class
   It should not remain bundle-only carriage.

2. Family completeness should fail on missing contract surfaces
   Bundle presence alone is not enough.

3. Witness artifact paths should represent both contract and bundle truth
   The family definition names both.

4. Replay must reconstruct proof-contract closure
   Replay should be able to show the evidence chain and theorem bindings directly.

#### Concrete closure signals for this case

Proof-contract materialization and bundle-only carriage are closed for V16 only when:

1. proof contract is emitted directly or represented by an explicitly sanctioned equivalent first-class witness structure,
2. family witness artifact paths name both contract and bundle truth,
3. family closure fails if the contract disappears while the bundle remains,
4. replay can reconstruct proof-contract closure directly,
5. and tests fail if the family regresses back to bundle-only carriage.

### Proof-Contract case drill-down: bundle/witness-manifest/evidence-chain role closure

The second case for proof-contract is role closure across the bundle, witness manifest, evidence chain, and theorem checks.

This is the right next case because current source already carries these surfaces distinctly even though the family grammar undernames them.

#### Case statement

The current source says:
- `systemProofBundle` owns the cross-family proof-bearing aggregation surface,
- `proofWitnessManifest` owns artifact-digest and family-witness closure,
- `proofContract` owns evidence-chain and theorem-check claims,
- replay entrypoint is attached to the system proof bundle,

but the family does not yet say what unique truth each one owns or how they close together.

#### V15 specification precision and parity

For this case, V15 already requires:

1. theorem-style checks have stable identities, subsystem scope, and witness-bearing artifact paths,
2. proof-witness-manifest closure rules remain coherent,
3. indirect reference through `system-proof-bundle.json` not be used to hide missing family-specific witness coverage.

The V16 parity reading is:
- bundle truth is not the same as witness-manifest truth,
- witness-manifest closure is not the same as proof-contract evidence-chain truth,
- theorem-check closure should be explicit rather than a string list inside a bundle-only surface,
- and replay should reconstruct how bundle, contract, witness manifest, evidence chain, and theorem claims agree.

#### Current source implementation precision

Current source exposes the following second-pass issues:

1. `proofContract`
   owns evidence-chain stage claims and theorem-check statements.

2. `systemProofBundle`
   owns cross-family aggregation plus replay entrypoint.

3. `proofWitnessManifest`
   is a separate branch artifact and deliverable but omitted from family witness artifact paths.

4. current proof-contract family witness refs are only:
   - `proofContract.contractId`
   - `settlementProof.assetPackLockHash`

   which is thinner than the cross-family closure the family claims to bind.

5. replay entrypoint currently omits the bundle itself and any proof-contract-specific artifact or witness-manifest artifact.

#### Family-wide expectations forced by this case

This one case already forces `proof-contract` toward the following V16 rules:

1. Bundle, contract, witness manifest, evidence chain, and theorem checks must remain role-distinguished.

2. Witness-manifest closure belongs visibly inside proof-contract family closure
   It should not remain only adjacent infrastructure.

3. Theorem-check closure should be explicit
   Not only string presence, but replay-visible binding to witness-bearing artifacts.

4. Replay should reconstruct the full proof-contract family path
   Contract, bundle, witness manifest, evidence-chain closure, and theorem closure.

#### Concrete closure signals for this case

Role closure across proof-contract is closed for V16 only when:

1. the family names distinct primary surfaces for proof contract, system proof bundle, witness manifest, evidence-chain closure, and theorem closure,
2. witness-manifest truth is explicitly part of family closure,
3. theorem-check closure is replay-visible,
4. replay reconstructs the full proof-contract family path,
5. and tests fail if bundle-only carriage starts silently substituting for contract or witness closure.

### Proof-Contract artifact-materialization determination guide

The family now has enough evidence to make a provisional artifact determination.

#### First-class artifact rule

A proof-contract surface should be a mandatory first-class family artifact when any of the following is true:

1. it carries primary cross-family closure truth,
2. replay depends on it directly to reconstruct family closure,
3. other family surfaces close back to it,
4. it carries unique theorem-binding or witness-manifest truth not preserved by another artifact,
5. or its absence would materially weaken direct auditability of the family.

#### Derived-surface rule

A proof-contract surface may remain derived or secondary only when all of the following are true:

1. its underlying truth is already preserved by a primary family artifact,
2. it adds summary or presentation structure rather than new closure truth,
3. its derivation path is explicit,
4. replay does not require it independently,
5. and tests can prove that it remains role-consistent with its primary source artifacts.

#### Provisional proof-contract determinations

Under the current first-pass reading, the provisional V16 determination is:

1. Mandatory first-class family artifacts
   - `.engi/system-proof-bundle.json`
   - `.engi/proof-witness-manifest.json`

2. Mandatory first-class family surface, currently under-materialized
   - `.engi/proof-contract.json`

3. Future likely first-class family artifacts once V16 formalizes family closure further
   - `.engi/proof-contract-proof.json`

#### Current preferred determination

The current preferred V16 posture is:

1. treat `.engi/system-proof-bundle.json` as the primary aggregation artifact,
2. treat `.engi/proof-witness-manifest.json` as the primary witness-closure artifact,
3. treat `proofContract` as a primary family surface that should no longer remain bundle-only,
4. and stop letting witness structure imply that the bundle alone substantiates the family.

### Proof-Contract case drill-down: witness-materialization and replay closure

The next case for proof-contract is witness-materialization and replay closure.

This follows directly from the first two cases because:
- the family currently under-materializes its contract surface,
- witness-manifest truth is omitted from family witness artifact paths,
- and replay still omits the family's own primary closure artifacts.

#### Case statement

The current source says:
- family witness artifact paths include `.engi/system-proof-bundle.json` only,
- family witness refs are only `proofContract.contractId` and `settlementProof.assetPackLockHash`,
- replay artifacts omit the bundle, witness manifest, and any dedicated proof-contract artifact,
- and replay instructions do not reconstruct proof-contract family closure explicitly.

#### V15 specification precision and parity

For this case, V15 already requires:

1. indirect reference through `system-proof-bundle.json` not be used to hide missing family-specific witness coverage,
2. theorem-style checks remain explicitly witness-bound,
3. proof-relevant artifacts and family witnesses remain coherent,
4. and replayable proof-contract truth remains honest about what is being proven.

The V16 parity reading is:
- witness closure should include the bundle, contract, and witness manifest,
- replay should include the family's primary closure artifacts directly,
- and proof-contract replay should reconstruct evidence-chain and theorem closure explicitly.

#### Current source implementation precision

Current source exposes the following witness/replay mismatch:

1. family witness artifact paths omit `.engi/proof-witness-manifest.json`.

2. family witness artifact paths cannot name a proof-contract artifact because none exists yet.

3. replay artifacts omit `.engi/system-proof-bundle.json` and `.engi/proof-witness-manifest.json`.

4. replay instructions do not contain a proof-contract-family-specific step.

#### Family-wide expectations forced by this case

This one case already forces `proof-contract` toward the following V16 rules:

1. Witness artifact paths should include all primary family artifacts.

2. Replay artifacts should include all primary family artifacts.

3. Replay instructions should reconstruct:
   - proof-contract closure,
   - evidence-chain closure,
   - theorem closure,
   - witness-manifest closure,
   - and bundle coherence closure.

4. Family replay should remain distinct from any one underlying proof family's replay.

#### Concrete closure signals for this case

Witness-materialization and replay closure are closed for V16 only when:

1. witness artifact paths include the bundle, witness manifest, and proof-contract surface,
2. replay artifacts include the bundle, witness manifest, and proof-contract surface,
3. replay instructions explicitly reconstruct the family's own closure path,
4. bundle-only carriage cannot hide missing contract or witness closure,
5. and tests fail if replay or witness closure drifts back to bundle-only substantiation.

### Proof-Contract preferred expected/realized/family closure split

Proof-contract now has enough structure to use the same canonical precision grammar as the prior families.

#### Expected truth layer

Should own:
- expected proof-contract surface,
- expected system-proof-bundle surface,
- expected witness-manifest surface,
- evidence-chain rules,
- theorem-binding rules,
- artifact-role definitions.

#### Realized truth layer

Should own:
- realized proof-contract surface,
- emitted system-proof-bundle artifact,
- emitted proof-witness-manifest artifact,
- realized evidence-chain stages,
- realized theorem checks.

#### Family closure layer

Should own:
- proof-contract closure,
- bundle coherence closure,
- witness-manifest closure,
- evidence-chain closure,
- theorem-binding closure,
- artifact-role closure,
- witness-materialization closure,
- replay closure,
- test closure.

### Proof-Contract member coverage ledger

The current provisional family-member coverage reading is:

1. proof contract
   Realized in runtime as `proofContract`.
   Current debt: it is not emitted as a first-class artifact.

2. evidence chain
   Realized inside `proofContract.evidenceChain`.
   Current debt: replay does not reconstruct it explicitly.

3. theorem checks
   Realized inside `proofContract.theoremChecks`.
   Current debt: theorem closure is not yet a first-class replay-visible surface.

4. system proof bundle
   Realized through `.engi/system-proof-bundle.json`.
   Current debt: witness structure overrelies on the bundle while omitting adjacent family surfaces.

5. witness-manifest closure
   Realized through `.engi/proof-witness-manifest.json`.
   Current debt: the family witness layer omits it even though V15 witness-manifest closure rules make it central.

### Proof-Contract member tightening signals

1. proof contract
   Closed only when proof contract is first-class in artifact, witness, replay, and test closure and cannot disappear while bundle closure remains green.

2. evidence chain
   Closed only when every evidence-chain stage and artifact ref remains explicit, family-coherent, and replay-visible.

3. theorem checks
   Closed only when theorem claims are witness-bound and replay-visible rather than string presence only.

4. system proof bundle
   Closed only when bundle aggregation truth remains explicit and coherent with proof contract, witness manifest, and replay entrypoint truth.

5. witness-manifest closure
   Closed only when witness manifest is a first-class proof-contract family surface and any drift between manifest, contract, and bundle fails family closure.

### Proof-Contract theorem-binding and proof-shape ratchets

1. theorem-binding debt
   The family theorem already spans contract, evidence chain, theorem checks, bundle, and witness-manifest closure, but the current replay/witness model still underbinds those roles and especially theorem closure.

2. required proof-shape direction
   V16 should require role-distinguished primary surfaces for contract, evidence chain, theorem checks, bundle, and witness manifest, plus explicit theorem identities, scopes, and witness-bearing artifact paths.

3. implementation ratchet
   A new theorem, artifact binding, or cross-family stage claim must fail family closure unless proof contract, bundle, witness manifest, replay, and tests all absorb that new theorem-bearing truth explicitly.

4. minimum theorem-catalog target
   `proof_contract.contract_materialization`, `proof_contract.evidence_chain_closure`, `proof_contract.theorem_check_binding`, `proof_contract.bundle_coherence`, `proof_contract.witness_manifest_coherence`, and `proof_contract.replay_closure` should each map to explicit verdict axes.

5. minimum proof-object field target
   The family proof should carry `theoremVerdicts`, `artifactBindings`, `replaySteps`, `memberVerdicts`, and `allTheoremsPassed`, with role-distinguished truth for contract, evidence chain, theorem checks, bundle, and witness manifest.

6. minimum artifact/replay binding target
   The family should bind `.engi/proof-contract.json`, `.engi/system-proof-bundle.json`, `.engi/proof-witness-manifest.json`, and any theorem-bearing artifacts referenced by evidence-chain and theorem bindings, with replay steps for contract materialization, evidence chain, theorem binding, bundle coherence, and witness-manifest coherence.

#### Current preferred stopping point

Proof-contract is now complete enough in V16 drafting terms to continue later family work because:

1. the proof-contract under-materialization issue is explicit,
2. role boundaries across contract, bundle, witness manifest, evidence chain, and theorem checks are explicit,
3. provisional artifact determination exists,
4. replay/witness direction exists,
5. expected versus realized versus family closure ownership is now named,
6. and family-member coverage is now enumerated.
