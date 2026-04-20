# ENGI Spec V7 Notes

## Files created

- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V7.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V7_NOTES.md`

## What V7 clarified beyond V6

V7 keeps the V6 architecture but tightens several contracts that became clearer only after forcing source/spec parity against `engi-demo/`:

1. **Need-descriptor closure is now explicit.**
   V7 requires canonical derivation rules for `task`, `failureModes`, `constraints`, `targetArtifactKinds`, `stackHints`, `touchedPaths`, `symbols`, `configKeys`, `failingCases`, `weakDimensions`, and `baselineMetrics`.

2. **Prototype seed fields must normalize before downstream use.**
   V7 explicitly calls out the seeded-scenario normalization problem exposed by the current demo shape (`expectedTask`, etc.) and forbids unresolved seed-only names from leaking as if they were final canonical schema.

3. **Branch artifact contracts are tighter.**
   V7 elevates `.engi/authorization-decisions.json`, `.engi/sensitive-data-flow.json`, and `.engi/policy-release.json` into the normative artifact set whenever ENGI claims identity/confidentiality/settlement modeling.

4. **Use-tier rights are cleaner.**
   V7 more sharply separates `rank-only`, `context-only`, `patch-eligible`, and `settlement-eligible` rights, especially around branch materialization vs settlement eligibility.

5. **Confidentiality and bounded-public proof are more operational.**
   V7 binds artifact classes, disclosure defaults, retention, and revocation semantics more tightly to explicit records.

6. **Settlement proof is more closed.**
   V7 requires explicit asset-pack-lock binding in settlement proof and states fail-closed settlement conditions more directly.

7. **Persistence atomicity is now part of correctness.**
   Because the demo tests failed-write rollback semantics, V7 now treats atomic persistence / non-corruption behavior as part of implementation correctness, not incidental engineering detail.

8. **Prototype-vs-production status is first-class.**
   V7 introduces dual conformance profiles so modeled local behavior is not confused with fully enforced production behavior.

## Clarifications discovered specifically by forcing source/spec parity

These came directly from reading the current implementation/tests/gap-analysis rather than from V6 prose alone:

- the need-descriptor field-derivation ambiguity from the seeded scenario shape,
- the stricter real artifact list actually emitted by the prototype,
- the exact sensitive-data classes and policy-release patterns already modeled in source,
- the settlement proof’s concrete dependency on asset-pack lock hashes and before/after ledger roots,
- persistence atomicity as a tested invariant,
- the exact branch-mode/tier interaction implemented locally now,
- the distinction between modeled authorization/data-flow artifacts and real enforcement boundaries.

## Source-faithfulness summary

V7 is intentionally split:
- **source-faithful to the current prototype** for deterministic local asset structure, recall/ranking/verification split, use tiers, branch artifact shape, exact journal diff, and proof modeling;
- **source-faithful to production intent** for live GitHub binding, real branch creation, real privacy/authz enforcement, retention execution, and optional LLM evaluator deployment;
- therefore **faithful to both, but in different sections** via explicit Profile A / Profile B conformance language.

## Repo-state note

`/Users/garrettmaring/Developer/ENGI/ENGI_SPEC.txt` still points at V6. I did **not** change it.

## Coverage-artifact note

I did not find meaningful ENGI pass2 coverage artifacts in repo state at time of work beyond unrelated dependency coverage files, so V7 was derived from:
- `ENGI_SPEC_V6.md`
- `engi-demo/SPEC_V6_GAP_ANALYSIS.md`
- `engi-demo/ARCHITECTURE_MAP.md`
- current `engi-demo` source and tests
