# ENGI Spec V8 Notes

## What changed in this finalization pass
This pass closes the remaining “almost there” gaps in the local V8 work.

### 1. Prompt surfaces are now explicit V8 artifacts
Added as first-class surfaces in:
- spec language
- implementation artifacts
- demo UI
- proof bundle linkage

The important shift is that prompts are no longer implicit synthesis steps.
Operators can now inspect:
- prompt template text
- interpolated values
- context inputs and evidence refs
- output fields
- downstream artifact bindings

### 2. Proof surfaces are more final and more legible
Strengthened:
- proof contract clarity
- evidence-chain staging
- theorem / invariant checks
- artifact bindings
- bounded public proof references

The proof surfaces now read more like a confident closure package and less like a set of isolated payloads.

### 3. Host-capability assumptions are documented durably
Added:
- `engi-demo/HOST_CAPABILITIES.md`
- `engi-demo/HOST_CAPABILITIES.json`

These capture the actual inspected local host capabilities that matter for the ENGI demo, including:
- runtime/toolchain presence
- GitHub CLI/auth presence
- absent local inference/runtime tools such as Ollama
- what the demo uses directly vs what it intentionally only models

### 4. Profile experience is clearer
The profile UX now explains:
- who Profile A is
- who Profile B is
- how the operator should demonstrate with each
- what the audience should infer from each
- why Profile B is concrete-but-not-switchable in the local demo

This is meant to make the experience legible to a live audience rather than merely technically accurate.

### 5. Formerly external-only areas are concretized rather than hand-waved
The new `external-boundary-manifest` turns prior omissions into inspectable V8 interfaces.

Concrete interface families now shown explicitly:
- GitHub App auth
- workflow artifact fetch
- branch / PR / review actions
- model execution
- vector store
- signer verification
- settlement/network effects

The repo still does not fake those integrations, but it now makes the hand-offs and required boundary artifacts concrete.

---

## Implementation choices

### Why prompt lineage exists in Profile A too
Even though Profile A uses deterministic stand-ins, prompt/evaluator lineage still matters because ENGI needs replayable derivation structure in both profiles.

That means the local demo can already show:
- what prompt contract exists
- what context would feed a production evaluator
- how the derived output is consumed downstream

### Why proof contract exists separately from settlement proof
Settlement proof is necessary but not sufficient.

The proof contract gives a single place to understand:
- the stages of closure
- which artifacts support which stage
- what theorem claims the bundle is actually making

### Why external boundary manifests are artifacts, not just prose
If the external boundary stays only in prose, it remains too vague to finalize V8.

Putting it in a branch artifact means the operator can show:
- which surfaces are implemented locally
- which surfaces are modeled locally
- which surfaces require live external systems
- what the exact hand-off contracts look like

---

## Demo/UI notes

### Visual mode emphasis
Visual mode should help the operator tell a story in order:
1. measured need
2. profile meaning
3. prompt surfaces and lineage
4. ranking + verification
5. artifact pack and boundary manifests
6. settlement + proof closure

### Raw mode emphasis
Raw mode still matters because ENGI claims inspectability.
Visual mode should help comprehension; Raw mode should preserve exact artifact truth.

---

## Coverage / test posture
The V8 finalization pass deepens tests around:
- prompt surfaces and downstream lineage
- branch artifact presence for prompt + external boundary manifests
- proof contract presence
- durable host-capability docs presence

The intent is to make the V8 additions feel locked in rather than decorative.

---

## Still truly external after concretization
Even after this pass, these remain external / non-demoable in the local repo:
- real GitHub App installation token flow
- live workflow artifact fetch and verification from GitHub
- live branch / PR / review writes
- remote prompt/model execution
- external vector-store operations
- external signer / org authority verification
- network settlement execution and confirmations

That is acceptable for V8 as long as those boundaries remain explicit, concrete, and inspectable.
