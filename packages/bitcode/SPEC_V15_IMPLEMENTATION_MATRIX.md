# ENGI Demo Spec V15 Implementation Matrix

## Status

- Repo: `engi-demo`
- Demo spec target: `/Users/garrettmaring/Developer/ENGI/engi-demo/ENGI_DEMO_SPEC_V15.md`
- Demo matrix target: `/Users/garrettmaring/Developer/ENGI/engi-demo/SPEC_V15_IMPLEMENTATION_MATRIX.md`
- System-spec companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V15.md`
- System parity companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V15_SYSTEM_PARITY_MATRIX.md`
- Canonical pointer: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC.txt` -> `V15`
- Current canonical/latest target: `V15`
- Last fully realized canon preserved in source: `V15`

## Purpose

This file records demo-local realization parity for `engi-demo/`.

It is not the root system parity ledger.
Its job is to judge:
- operator-shell ordering,
- explainers and demo-local UI parity,
- local persistence and failure semantics,
- demo host/runtime adjunct docs,
- and current demo-local validation evidence.

## Interpretation rule

The correct reading is:
- system canon lives in the root V15 system-spec family,
- demo realization truth lives here under `engi-demo/`,
- a demo-local `closed` judgment does not automatically mean whole-system closure.

## Audit basis

This matrix is grounded in:
- `/Users/garrettmaring/Developer/ENGI/engi-demo/ENGI_DEMO_SPEC_V15.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V15.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V15_NOTES.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V15_INFORMATION_AUDIT.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V15_SYSTEM_PARITY_MATRIX.md`
- `src/engi-demo.js`
- `src/canonical/enums.js`
- `src/canonical/types.js`
- `src/canonical/surfaces.js`
- `src/canonical/run-artifacts.js`
- `src/realization-profile.js`
- `src/settlement-structs.js`
- `server.js`
- `public/app.js`
- `public/index.html`
- `README.md`
- `test/core.test.js`
- `test/api.test.js`
- `test/e2e.test.js`
- `HOST_CAPABILITIES.md`
- `HOST_CAPABILITIES.json`

---

## Current parity / debt map

| Area | Current source or doc truth | V15 demo-spec expectation | Judgment |
|---|---|---|---|
| Demo-spec file exists | `ENGI_DEMO_SPEC_V15.md` exists and stays explicitly subordinate to root system canon | demo realization must be documented separately | closed |
| Demo-local matrix exists | this file now holds the canonical V15 demo matrix content | demo parity must be tracked separately from system parity | closed |
| Demo-matrix canonical path | `SPEC_V15_IMPLEMENTATION_MATRIX.md` now exists as the primary V15 demo matrix path; the longer demo-prefixed filename is retained only as a compatibility alias | one primary V15 demo matrix path must exist so the demo ledger does not fork under two names | closed |
| Operator shell ordering | `public/app.js`, `public/index.html`, and `test/e2e.test.js` preserve ordered panel flow | current demo shell ordering must stay explicit and tested | closed |
| Repo-authenticated deposit flow | UI and browser e2e cover deposit to settlement flow | demo must preserve end-to-end operator story | closed |
| Normalization-heavy flow | scenario switch and browser e2e surface source-to-shares behavior | demo must expose Profile B normalization behavior | closed |
| Explainers and visual/raw surfaces | `public/app.js` carries glossary/explainer surfaces tied to operator panels | explainers must summarize system truth without contradiction | substantially aligned |
| Demo-local persistence semantics | `server.js` uses atomic writes and tests cover persistence behavior | local deterministic state must fail safely | closed |
| Demo host/runtime docs | `HOST_CAPABILITIES.md` and `.json` exist and stay honest about local vs remote truth | demo host truth must remain explicit | closed |
| Demo host docs on V15 status | host docs now align on active V15 status | demo host truth must match the active pointer | closed |
| Browser e2e requirement | `test/e2e.test.js` verifies shell order and two end-to-end flows | demo ordering is canonical for this realization and must stay tested | closed |
| Demo-local artifact coverage | `.engi/*` artifact families are built and tested from `src/engi-demo.js` | demo spec must describe the artifact families it emits | closed |
| Demo-vs-system boundary honesty | demo spec points back to root system spec and avoids claiming whole-system ownership | demo docs must not masquerade as system canon | closed |
| Canonical-source refactor posture | root V15 files define the refactor focus as system-owned and additive rather than demo-redefining | demo matrix must track only the current realization consequences of that refactor | closed |
| Extracted canonical module layer | `src/canonical/enums.js`, `types.js`, `surfaces.js`, `run-artifacts.js`, `projections.js`, and `proof-materialization.js` now exist and are imported by `src/engi-demo.js` | demo docs must reflect the landed split exactly rather than describing it only as future refactor intent | closed |
| Operating-surface builder extraction | `src/canonical/surfaces.js` now owns repo-supply, depositing, needing, fit, repo-to-settlement, identity/auth, boundary-reality, and GitHub-boundary builders | demo matrix should treat operating-surface extraction as landed progress, not vague aspiration | substantially advanced |
| Run-artifact/report builder extraction | `src/canonical/run-artifacts.js` now owns pipeline telemetry, prompt implementation surface, system proof bundle, artifact upload manifest, deliverables manifest, scenario fixture manifest, and test coverage report builders | demo matrix should treat report-layer factoring as landed progress | substantially advanced |
| Demo type and struct traceability | `src/realization-profile.js` and `src/settlement-structs.js` now isolate realization-profile plus settlement/source-to-shares discriminants while `.engi/*` artifacts remain explicit | high-information demo structures must stay traceable even before deeper source factoring lands | substantially advanced |
| Current naming vs canonical naming | source now uses `buildRealizationProfile(...)` and `realizationProfile` directly, with the older demo-profile alias removed from active source | demo docs must describe the landed naming truth rather than a transition state that no longer exists | closed |
| Information-value organization | source-to-shares and settlement participation artifacts now carry explicit contribution, credit, and participation dispositions rather than only booleans | demo must not hide proof-bearing or settlement-bearing meaning behind explainer-only wording | substantially advanced |
| File/module organization | helper modules now include `src/canonical/surfaces.js`, `run-artifacts.js`, `projections.js`, and `proof-materialization.js` plus `src/demo-shell-state.js`, while `src/engi-demo.js` remains the dominant orchestration module | module-boundary cleanup must remain explicit demo-local debt rather than hidden closure | substantially advanced |
| Next extraction seams | `src/engi-demo.js` still owns need measurement/inference plus evaluation/materialization orchestration, while projection/disclosure and public-state shaping have already been extracted | demo matrix must name the remaining seams clearly so the migration plan stays falsifiable | explicit debt |
| Docs/tests parity for refactor-sensitive surfaces | `README.md`, `test/core.test.js`, and `test/api.test.js` now assert realization-profile/discriminant surfaces and exact settlement dispositions while browser e2e preserves the operator story | demo docs and tests should stay traceable to the same canonical surfaces during refactor work | closed for current JS refactor pass |

---

## Remaining demo-local observations

1. Host capability adjunct docs now speak in V15 terms and match the active pointer.
2. Shell and explainer wording now speaks in V15 terms, but historical comparison material still references predecessor versions where it materially clarifies the design delta.
3. `engi-demo/src/engi-demo.js` is still the main orchestration reservoir even though `src/canonical/surfaces.js`, `src/canonical/run-artifacts.js`, `src/canonical/projections.js`, `src/canonical/proof-materialization.js`, and `src/demo-shell-state.js` now isolate major builder families.
4. The next extraction seams are now concrete rather than fuzzy: need measurement/inference plus evaluation/materialization orchestration still remain in `src/engi-demo.js`.
5. `server.js` and `public/app.js` still hold the persistence/input and operator-shell boundaries, so docs/tests parity has to keep those boundaries tied back to the extracted canonical modules.
6. The legacy `ENGI_DEMO_SPEC_V15_IMPLEMENTATION_MATRIX.md` path remains only as a compatibility alias and should not accumulate independent content.
7. Docs/tests parity is now stronger and naming parity is materially closed for the V15 JavaScript refactor pass, but deeper subsystem decomposition still remains.

---

## Demo completion condition for this pass

The V15 demo-realization layer is in good shape when:
1. demo-local operator ordering remains explicit,
2. end-to-end browser flow remains covered,
3. host/runtime truth stays honest,
4. persistence and failure semantics stay tested,
5. the demo spec stays subordinate to root system canon,
6. remaining demo debt is explicit,
7. naming, module, and docs/tests refactor deltas stay visible instead of being hand-waved as already solved,
8. realization-profile and settlement discriminants stay ratified in tests rather than only implied in prose.

This condition is satisfied for the current drafting pass.


## Core V15 parity / debt families

| Area | Current source reality | V15 target | Gap judgment |
|---|---|---|---|
| System-vs-demo co-location | `src/engi-demo.js` still co-locates major system orchestration concerns, but canonical `src/canonical/` modules plus `src/demo-shell-state.js` now own enum/type vocabulary, operating surfaces, run-level artifact builders, projection/disclosure helpers, proof/materialization helpers, and demo-shell/public-state shaping | cleaner system/demo separation in source and spec architecture | medium |
| Canonical source shape | current source is rich but historically accreted; V15 canonical enum/type modules plus extracted `surfaces.js`, `run-artifacts.js`, `projections.js`, `proof-materialization.js`, and `demo-shell-state.js` now give the source a clearer canonical spine | cleaner long-lived canonical structure | medium |
| Type-system provability | canonical enum and JSDoc type modules now exist and some builders are grouped around them, but rich typed separation is still far from complete | rich enums/discriminants/composition and stronger typed separation | high |
| Information-value organization | many high-information operating and proof/report surfaces now have clearer owners, but broader layer ownership is still incomplete | clearer role- and layer-based ownership | medium |
| Module/file organization | `src/canonical/surfaces.js`, `run-artifacts.js`, `projections.js`, `proof-materialization.js`, and `src/demo-shell-state.js` now hold meaningful builder families, but most orchestration logic still remains in `src/engi-demo.js` and the server/UI boundary files | cleaner modular boundaries after separation | medium |
| Naming finalization | active profile/public naming now aligns to the V15 system model | final canonical names aligned to V15 system model | closed for current JS refactor pass |
| Active seam inventory | the remaining refactor seams are now identifiable by family instead of being a generic "split the monolith" goal | migration plan should stay concrete and falsifiable | substantially advanced |

## Additional V15 implementation strategy — staged refactor toward maximally typed source

V15 should treat canonical source hardening as a staged process:
1. structural/module/information-value refactor in the current implementation
2. then deeper TypeScript typing/provability hardening

### Additional parity / debt rows

| Area | Current expectation | V15 closure target | Gap judgment |
|---|---|---|---|
| JavaScript structural cleanup before TS hardening | landing pass complete: canonical builder families and demo-shell/public-state shaping now live outside `src/engi-demo.js` | cleaner pre-TypeScript system boundaries | closed for current V15 JS pass |
| TypeScript compiler regime | strict checked-JS hard-gate landed: `typescript` + `@types/node` installed, `tsconfig.json` now runs with `checkJs: true`, `npm run typecheck` passes across the active V15 source graph and native-JS test graph, `src/canonical/type-contracts.ts` provides the TS-native contract layer, and checked-JS now covers the canonical subsystem families, `src/engi-demo.js`, `public/app.js`, `src/demo-shell-state.js`, `server.js`, and `test/core.test.js` / `test/api.test.js` / `test/e2e.test.js` | preserve maximal type strength while staying native JS unless a later repo decision explicitly calls for `.ts` conversion | landed for active source and tests |
| Strong enum/discriminant design | partial | rich closed-case typing where appropriate | medium |
| Domain type composition | partial | stronger composed system structs with explicit role separation | medium |
| Typed identifiers / roots / refs | mixed | role-specific typing to reduce invalid mixing | medium |
| System-layer vs demo-layer type separation | target emerging | explicit typed separation in source organization | medium/high |
| Proof/measurement/settlement type hardening | partial | maximally typed canonical subsystem structures | medium/high |
| Need measurement / inference seam | landed in `src/canonical/need-measurement.js` with `src/engi-demo.js` retaining only composition/orchestration entrypoints | preserve this canonical boundary through the TS conversion rather than re-expanding it | closed for current V15 JS pass |
| Evaluation / materialization seam | landed in `src/canonical/evaluation-materialization.js`; candidate recall, ranking, verification reporting, asset-pack assembly, and branch artifact materialization no longer define their core logic in `src/engi-demo.js` | preserve this canonical boundary through the TS conversion and strengthen its typed contracts | closed for current V15 JS pass |
| Proof / settlement emission seam | landed in `src/canonical/settlement.js`, with exact accounting/proof emission removed from the `src/engi-demo.js` reservoir | preserve the settlement boundary and harden its numeric / discriminated typing in TS | closed for current V15 JS pass |
| Projection / disclosure seam | `buildProjectionPolicy(...)`, `buildBoundedPublicProofArtifact(...)`, `buildRedactionProof(...)`, and `buildDisclosureProof(...)` now live in `src/canonical/projections.js` | isolate projection/disclosure policy builders from the monolith without claiming that split already landed | closed |

## Explicit pre-TypeScript seam reading

The previously identified pre-TypeScript extraction seams are now closed in JavaScript:
1. need measurement / inference
2. evaluation / materialization orchestration
3. proof / settlement emission

The remaining work before and during TypeScript is no longer another structural split of those core families.
It is preserving the landed module boundaries while expressing them with stronger typed contracts, branded ids/roots/refs, discriminated unions, and runtime-decoded boundary inputs.
The residual logic still living in `src/engi-demo.js` is primarily orchestration-local cross-cutting composition such as run assembly, identity/authz wiring, policy-release shaping, and proof-bundle coordination, rather than another monolithic subsystem reservoir that must be extracted before TypeScript.

## Final V15 type-hardening matrix

For this repo branch, V15 closes in native JavaScript under a strict checked-JS regime rather than forcing a cosmetic `.ts` rename across the tree.
The goal of the type-hardening phase is therefore a maximal-strength typed implementation of the canonical ENGI system where the type system itself expresses more of:
- closed-case subsystem truth,
- role-specific ids/roots/refs,
- canonical artifact family boundaries,
- proof/measurement/settlement invariants,
- and system-layer versus demo-layer separation.

Native `.ts` conversion remains optional later work, not a blocker for V15 implementation doneness in the current repo posture.

### TypeScript hardening phases

| Phase | Scope | Type-strength objective | Concrete implementation target | Closure signal |
|---|---|---|---|---|
| TS-0 Compiler regime | repository-wide TypeScript enablement for active implementation and parity tests | strict compiler truth with no weak-default posture | landed: `tsconfig.json` carries strict NodeNext settings with `checkJs: true`, `npm run typecheck` passes across `server.js`, `public/app.js`, `src/engi-demo.js`, all landed canonical subsystem families, `src/demo-shell-state.js`, the smaller retained implementation helpers in `src/`, and `test/core.test.js` / `test/api.test.js` / `test/e2e.test.js`; `src/canonical/type-contracts.ts` is the first TS-native canonical contract layer | TypeScript exists as a hard gate for active source and tests rather than an optional sidecar |
| TS-1 Boundary freeze before conversion | the landed canonical JS module graph | ensure TS migration lands on stable subsystem boundaries instead of retyping a moving monolith | preserve the landed canonical families such as `src/canonical/need-measurement.ts`, `src/canonical/evaluation-materialization.ts`, `src/canonical/settlement.ts`, `src/canonical/projections.ts`, and `src/canonical/proof-materialization.ts`; only split further if typing pressure exposes a concrete design gain | `src/engi-demo.js` remains primarily orchestration/composition rather than regressing into mixed subsystem definition |
| TS-2 Canonical primitive and identity families | ids, refs, roots, hashes, addresses, branch names, parser/evaluator ids, artifact paths | prevent invalid cross-role mixing at compile time | introduce branded/string-distinct types for ids and roots; examples: `NeedId`, `AssetId`, `InventoryEntryId`, `UnitHash`, `ContentRoot`, `BranchName`, `PolicyRef`, `ParserContractId`, `PromptOrEvaluatorId`, `LedgerAccountId`, `SignerAddress` | role-confusion bugs become type errors instead of stringly runtime accidents |
| TS-3 Closed-case subsystem truth | enums, literal registries, discriminants, state cases | express system cases as exhaustive compile-time domains | convert current enum/JSDoc families to exported literal-union or enum-backed types with exhaustive switch handling; use `satisfies`/const-literal preservation for registries and stage catalogs | closed-case drift is prevented by exhaustiveness checking |
| TS-4 Canonical struct families | operating surfaces, receipts, manifests, proof artifacts, settlement artifacts | make canonical data families explicit and composable | define first-class interfaces/type aliases for depositing, needing, fit, projection, prompt, proof, settlement, journal, asset-pack, and boundary structures; replace ad hoc object literals with typed builders and typed return contracts | high-information artifacts are typed as named families rather than inferred shapes |
| TS-5 Runtime-boundary decoding | API input, persisted state, seeded fixtures, parsed completion envelopes, external stand-ins | pair static types with runtime truth at trust boundaries | introduce explicit decoder/validator layer for request bodies, persisted JSON state, and prompt-completion payloads; keep external/JSON boundaries typed as `unknown` until decoded | runtime inputs stop bypassing the type system through unchecked casts |
| TS-6 Need measurement and inference typing | prompt contracts, parser contracts, inference proofs, recall channels, measurement traces | encode inference ownership and parse closure in types | active checked-JS pass landed: `src/canonical/need-measurement.js` now sits behind `// @ts-check` with typed scenario/parser/repo-analysis contracts and strict prompt-surface lookup closure; next step is converting the module and its dependencies from checked JS to native `.ts` without weakening those boundaries | the need-measurement boundary is fully typed and independently testable |
| TS-7 Evaluation and materialization typing | ranking, verification, use tiers, asset-pack selection, branch artifact assembly | encode selection and materialization policy in discriminated result types | active checked-JS pass landed: `src/canonical/evaluation-materialization.js` now sits behind `// @ts-check`, with typed recall/ranking/verification/materialization boundaries and strict branch-artifact contract checking; next step is native `.ts` conversion and further discriminated typing for evaluator families and use-tier outcomes | the evaluation/materialization boundary is fully typed and independently testable |
| TS-8 Proof and settlement maximal typing | source-to-shares, settlement participation, journal diff, accounting precision, proof bundle closure | turn accounting/proof invariants into explicit type-level structure | active checked-JS pass landed: `src/canonical/proof-materialization.js` and `src/canonical/settlement.js` now sit behind `// @ts-check`, with strict proof/materialization witness contracts and settlement/accounting interfaces tightened enough to keep `npm run typecheck` green; next step is native `.ts` conversion and stronger branded/value-family typing for basis points, shares, and ledger structures | settlement/proof structures are compile-time distinct instead of loosely numeric objects |
| TS-9 Demo-shell and server typing | `server.js`, demo-shell/public-state shaping, browser app source | preserve demo UX while moving source-of-truth into typed modules | landed in checked JS for the current repo posture: `server.js`, `src/demo-shell-state.js`, `src/engi-demo.js`, and `public/app.js` are all inside the active compiler gate and `npm run typecheck` stays green | active source is typed end-to-end instead of stopping at backend modules |
| TS-10 Test and fixture typing | node tests, e2e harness, seeded fixtures | make parity proof participate in the type regime | landed in checked JS while staying native `.js`: `test/core.test.js`, `test/api.test.js`, and `test/e2e.test.js` now participate in the same strict compiler gate as the source graph and still pass under `npm test` | tests catch both runtime and static-shape regressions inside the active repo gate |
| TS-11 Strictness ratchet and debt burn-down | final post-conversion hardening | eliminate weak escape hatches | forbid broad `any`; require documented/narrowed `unknown`; track and burn down temporary `@ts-expect-error` or compatibility shims; prefer exact return types for canonical builders | the final TS state is strong by default, not nominally converted |

### Type-strength design requirements for the TS phase

| Area | V15 TypeScript requirement | Intended effect |
|---|---|---|
| `any` posture | no broad `any` in canonical modules; boundary inputs start as `unknown` and are narrowed/decoded | prevents silent type escape hatches |
| Identifier design | ids/roots/refs/hashes are role-specific branded types rather than plain `string` everywhere | prevents accidental cross-subsystem mixing |
| Numeric exactness | accounting, basis points, raw shares, settled shares, and unit counts get explicit value-family typing where practical | keeps accounting semantics legible and harder to misuse |
| Discriminated unions | candidate status, use-tiering, settlement participation, source contribution, artifact families, and projection principals use discriminated unions | enables exhaustive handling of major system cases |
| Registry expression | evaluator registries, parser registries, artifact catalogs, and stage catalogs preserve literal specificity via `as const`/`satisfies`-style patterns | avoids literal widening and keeps catalog truth machine-checkable |
| System-vs-demo separation | system-owned canonical types live in canonical modules; demo-shell projection/view types stay in demo-owned modules | preserves the V15 architecture at the type layer |
| Runtime/schema parity | runtime validators and static types are kept aligned for persisted JSON and API boundaries | prevents static/runtime shape drift |

### Recommended type-hardening order

1. Add compiler/build infrastructure and strict settings.
2. Preserve the landed JS canonical boundaries as the TS migration surface; only split further when the type design clearly benefits.
3. Convert canonical leaf modules first: enums/types, realization-profile, settlement-structs, prompting, projections, proof-materialization, surfaces, run-artifacts. The checked-JS hardening pass is now active across all of those except the enum/type declaration files themselves.
4. Convert the landed canonical subsystem families next: need-measurement, evaluation-materialization, settlement. The checked-JS hardening pass is now active for all three.
5. Convert demo-shell/public-state shaping and server boundary code. The checked-JS hardening pass is now active for `src/demo-shell-state.js` and `server.js`.
6. Keep `src/engi-demo.js`, `public/app.js`, and the parity test graph inside the strict checked-JS gate as the orchestration/browser boundary and proof harness remain stable.
7. Ratchet strictness and burn down temporary compatibility annotations only where they no longer serve the native-JS checked path.

### Type-hardening completion condition for the V15 refactor sub-focus

The V15 type-hardening phase is complete when:
1. the landed canonical subsystem boundaries are preserved through conversion,
2. canonical modules and orchestration are strongly typed in the active repo posture,
3. demo-shell and server source-of-truth are typed,
4. ids/roots/refs/hashes are role-distinct where misuse risk exists,
5. major artifact families and settlement/proof structures are discriminated and explicitly typed,
6. persisted-state and API boundaries are decoded rather than trusted implicitly,
7. tests participate in the strict compiler gate and run against the typed source,
8. and the resulting codebase is strong-by-default rather than merely extension-renamed.
