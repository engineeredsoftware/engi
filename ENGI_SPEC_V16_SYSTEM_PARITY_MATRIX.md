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
- prompt-owned inferred-measurement coverage,
- parse-contract admissibility closure,
- downstream artifact-binding closure,
- source-annotation honesty for prompt-owned inferencing,
- and prompt-completeness-specific closure tests.

## Interpretation rule

The correct V16 reading is:
- `V15` remains the active canonical/latest target,
- V16 is being drafted as the first proof-coverage-focused canon,
- this matrix is a requirements and parity ledger for that shift,
- and rows here describe confirmed implementation gaps, required proof expansions, and closure signals rather than accomplished closure.

This is the root system ledger.
It is not the demo-local implementation matrix.
For this drafting pass, other proof families are intentionally out of scope in this matrix.

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
