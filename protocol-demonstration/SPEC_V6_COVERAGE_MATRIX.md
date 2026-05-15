# Bitcode Spec V6 Coverage Matrix

Audit date: 2026-04-02  
Repo: `/Users/garrettmaring/Developer/ENGI/protocol-demonstration`

This matrix records:

- `Baseline`: reconstructed status from the repo state audited before the second V6 pass, using the implementation and the prior gap write-up in [`SPEC_V6_GAP_ANALYSIS.md`](./SPEC_V6_GAP_ANALYSIS.md).
- `After pass2`: status after the deterministic local-prototype implementation in this pass.

Status legend:

- `implemented`: deterministic local prototype now has explicit code, artifacts, and tests for the section’s core contract.
- `modeled`: the section exists as explicit local data structures/proofs/contracts, but intentionally stops short of the real external behavior.
- `partial`: meaningful coverage exists, but important parts of the section remain absent, shallow, or local-only.
- `missing`: no meaningful section-level coverage found.
- `non-demoable-external`: the section depends on live external systems intentionally not wired into this local prototype.

## Matrix

| Spec section | Baseline | After pass2 | Notes | Exact refs |
| --- | --- | --- | --- | --- |
| `1. Executive summary` | `partial` | `modeled` | The end-to-end V6 story is now reflected in runtime, UI, and README, but remains a deterministic local simulation. | `README.md:1`, `public/index.html:10`, `src/spec-v6-demo.js:2321` |
| `2. Normative language` | `modeled` | `modeled` | Normative behavior is enforced through fail-closed parser validation, invariant checks, and deterministic branch artifact generation. | `src/spec-v6-demo.js:764`, `src/spec-v6-demo.js:2149`, `test/core.test.js:28`, `test/core.test.js:289` |
| `3. Product goals and non-goals` | `partial` | `partial` | Goals around measurement, ranking, verification, branch artifacts, shares, and journal diff are covered; live GitHub and real patch generation remain intentionally absent. | `README.md:14`, `src/spec-v6-demo.js:2321`, `public/index.html:10` |
| `4. Design principles` | `modeled` | `modeled` | Read-first ranking, verification/ranking separation, private delivery default, explicit identity/authz, and inspectability are modeled in code and branch artifacts. | `src/spec-v6-demo.js:899`, `src/spec-v6-demo.js:1501`, `src/spec-v6-demo.js:1875`, `src/spec-v6-demo.js:2289` |
| `5. Trusted integration boundary` | `partial` | `partial` | GitHub-only + GitHub Actions are modeled, including canonical run evidence and parser fail-closed behavior; live GitHub/Actions trust surfaces remain non-demoable-external. | `src/spec-v6-demo.js:398`, `src/spec-v6-demo.js:523`, `src/spec-v6-demo.js:764`, `src/spec-v6-demo.js:2481` |
| `6. Terminology` | `partial` | `modeled` | Core terms now map cleanly to deterministic objects: `CandidateAsset`, `ContentUnit`, verification determinisms, asset shares, and journal diff surfaces. | `src/spec-v6-demo.js:435`, `src/spec-v6-demo.js:1077`, `src/spec-v6-demo.js:2149` |
| `7. System overview` | `partial` | `implemented` | The pipeline order in the spec now exists in one deterministic flow from read measurement through settlement. | `src/spec-v6-demo.js:2321`, `test/core.test.js:161`, `test/api.test.js:182` |
| `8. Core data model` | `partial` | `implemented` | Read descriptor, benchmark outputs, candidate assets, content units, measurement provenance, asset measurement, and proof objects are now explicit. | `src/spec-v6-demo.js:435`, `src/spec-v6-demo.js:764`, `src/spec-v6-demo.js:2028`, `src/spec-v6-demo.js:2047` |
| `9. Read measurement` | `partial` | `implemented` | Read measurement is now explicit: benchmark parser, parser validation, repo-context extraction, benchmark target hand-off, measurement provenance, and inference proofs. | `src/spec-v6-demo.js:398`, `src/spec-v6-demo.js:706`, `src/spec-v6-demo.js:764`, `test/core.test.js:28`, `test/core.test.js:38` |
| `10. Candidate recall` | `partial` | `implemented` | Hybrid recall channels and fusion are modeled deterministically across task, failure, technical context, lexical, symbol, path, config, and artifact kind. | `src/spec-v6-demo.js:899`, `src/spec-v6-demo.js:1501`, `test/core.test.js:68` |
| `11. Ranking overview` | `partial` | `implemented` | Ranking now explicitly combines read match, benchmark impact, actionability, and penalties, separate from verification determinisms. | `src/spec-v6-demo.js:1077`, `src/spec-v6-demo.js:1207`, `src/spec-v6-demo.js:1260`, `src/spec-v6-demo.js:1501` |
| `12. Whole-asset read scoring` | `missing` | `partial` | `wholeAssetReadScore` now exists, but the spec’s richer unit-level/asset-level decomposition is still thinner than a full implementation. | `src/spec-v6-demo.js:1510`, `public/app.js:110` |
| `13. Read match` | `partial` | `implemented` | All named read-match subscores plus explanation detail and measurement provenance are present. | `src/spec-v6-demo.js:1077`, `test/core.test.js:80` |
| `14. Path fit` | `missing` | `implemented` | Path fit now has explicit `sourcePathPrecision`, `mentionedPathSupport`, and `subsystemAlignment` decomposition. | `src/spec-v6-demo.js:1086`, `src/spec-v6-demo.js:1172` |
| `15. Benchmark impact likelihood` | `partial` | `implemented` | All three benchmark-impact subscores are modeled with explainability detail. | `src/spec-v6-demo.js:1207`, `test/core.test.js:80` |
| `16. Actionability` | `partial` | `implemented` | Actionability now exposes remediation specificity, implementation specificity, and operational usability with detail traces. | `src/spec-v6-demo.js:1260`, `test/core.test.js:80` |
| `17. Final candidate ranking` | `partial` | `implemented` | Final ranking score, penalty mass, evidence refs, and explainability/fusion surfaces are explicit and tested. | `src/spec-v6-demo.js:1314`, `src/spec-v6-demo.js:1501`, `test/core.test.js:80` |
| `18. Verification determinisms` | `partial` | `implemented` | Issuance, provenance, sufficiency, and issuer policy are explicit objects with computed rejection semantics and tier caps. | `src/spec-v6-demo.js:1334`, `src/spec-v6-demo.js:1356`, `src/spec-v6-demo.js:1398`, `src/spec-v6-demo.js:1446`, `test/core.test.js:92`, `test/core.test.js:100` |
| `19. Candidate verification result and use tier` | `partial` | `implemented` | Final use-tier derivation and settlement upgrade rules are explicit and flow downstream into branch assembly and settlement. | `src/spec-v6-demo.js:1476`, `src/spec-v6-demo.js:1485`, `src/spec-v6-demo.js:1501`, `src/spec-v6-demo.js:1562` |
| `20. Expensive LLM evaluation roles` | `missing` | `modeled` | No live LLMs are invoked, but evaluator ids, deterministic “model” ids, inference proofs, and provenance surfaces model the appendix contracts. | `src/spec-v6-demo.js:64`, `src/spec-v6-demo.js:159`, `src/spec-v6-demo.js:783`, `src/spec-v6-demo.js:1634`, `src/spec-v6-demo.js:2047` |
| `21. Asset pack assembly` | `partial` | `implemented` | Asset pack selection, accepted tiers, coverage, lock data, and selected source-material manifest now exist and are consumed downstream. | `src/spec-v6-demo.js:1562`, `src/spec-v6-demo.js:1662`, `src/spec-v6-demo.js:1689`, `test/core.test.js:112`, `test/core.test.js:186` |
| `22. Buyer UX: Make Bitcode branch` | `partial` | `partial` | The UI/API primary action is now “Make Bitcode branch,” but real git branch creation/PR operations remain non-demoable-external. | `public/index.html:10`, `public/app.js:240`, `server.js:144`, `test/api.test.js:182` |
| `23. Asset shares` | `partial` | `implemented` | Raw/settled shares, zero-adjustment default mode, and downstream settlement participation are explicit and tested. | `src/spec-v6-demo.js:1745`, `src/spec-v6-demo.js:2149`, `test/core.test.js:171` |
| `24. Raw asset share computation` | `partial` | `implemented` | Leave-one-asset-out marginal contribution plus exact normalization to `10000` bp is implemented and tested. | `src/spec-v6-demo.js:1708`, `src/spec-v6-demo.js:1717`, `src/spec-v6-demo.js:1745`, `test/core.test.js:171` |
| `25. Settlement and journal diff` | `partial` | `implemented` | Exact fixed-point accounting, deterministic allocation, receipts, invariant checks, journal diff, and settlement proof are all present. | `src/spec-v6-demo.js:1773`, `src/spec-v6-demo.js:2149`, `src/spec-v6-demo.js:2028`, `test/core.test.js:161`, `test/core.test.js:177`, `test/core.test.js:271` |
| `26. Reports and manifests` | `partial` | `implemented` | Branch artifacts now include read, benchmark target, reports, lock, selected source material, settlement preview/proof, journal diff, policy/auth/data-flow, deliverables, and source material. | `src/spec-v6-demo.js:1595`, `src/spec-v6-demo.js:1620`, `src/spec-v6-demo.js:1634`, `src/spec-v6-demo.js:1662`, `src/spec-v6-demo.js:2289`, `README.md:66`, `test/core.test.js:161` |
| `27. Telemetry, debugging, and implementation reliability` | `missing` | `partial` | The prototype now has fail-closed parser validation, score-range enforcement, invariant checks, and richer traces, but not a full telemetry/event sink over every stage. | `src/spec-v6-demo.js:131`, `src/spec-v6-demo.js:764`, `src/spec-v6-demo.js:2149`, `test/api.test.js:274` |
| `28. Implementation order` | `modeled` | `modeled` | The runtime and UI now follow the same stage order as the spec, but this section is descriptive rather than a separate executable artifact. | `public/index.html:21`, `src/spec-v6-demo.js:2321` |
| `29. Final locked decisions` | `partial` | `partial` | GitHub-only, benchmark-first, verification determinisms, zero-adjustment settlement, and journal diff are aligned; live GitHub operations remain local-only models. | `src/spec-v6-demo.js:398`, `src/spec-v6-demo.js:764`, `src/spec-v6-demo.js:1334`, `src/spec-v6-demo.js:2149` |
| `30. Sensitive data, identity, and cross-cutting proof model` | `partial` | `modeled` | Identity bindings, authorization decisions, sensitive-data-flow records, retention/disclosure policies, policy release, proof bundle, and bounded public proof are now explicit. | `src/spec-v6-demo.js:309`, `src/spec-v6-demo.js:1834`, `src/spec-v6-demo.js:1875`, `src/spec-v6-demo.js:1887`, `src/spec-v6-demo.js:1939`, `src/spec-v6-demo.js:1997`, `src/spec-v6-demo.js:2007`, `src/spec-v6-demo.js:2047`, `test/core.test.js:216`, `public/app.js:164` |
| `Appendix A — Precise type appendix` | `missing` | `partial` | The runtime uses plain JS objects rather than a literal TS appendix, but the canonical V6 shapes are materially modeled in code and artifacts. | `src/spec-v6-demo.js:435`, `src/spec-v6-demo.js:764`, `src/spec-v6-demo.js:2289` |
| `Appendix B — Function signatures and pseudocode appendix` | `partial` | `implemented` | The appendix functions now have deterministic implementations with corresponding tests. | `src/spec-v6-demo.js:764`, `src/spec-v6-demo.js:1077`, `src/spec-v6-demo.js:1207`, `src/spec-v6-demo.js:1260`, `src/spec-v6-demo.js:2149`, `test/core.test.js:28`, `test/core.test.js:171` |
| `Appendix B2 — Inference appendix` | `missing` | `modeled` | No real prompts are executed, but evaluator ids, model ids, inference proofs, provenance, and replayable traces are explicitly persisted. | `src/spec-v6-demo.js:64`, `src/spec-v6-demo.js:159`, `src/spec-v6-demo.js:783`, `src/spec-v6-demo.js:2047`, `src/spec-v6-demo.js:2321` |
| `Appendix B3 — Abridged measurement appendix` | `partial` | `implemented` | The named measurements and use-tier derivation are now present in deterministic local code. | `src/spec-v6-demo.js:1077`, `src/spec-v6-demo.js:1207`, `src/spec-v6-demo.js:1260`, `src/spec-v6-demo.js:1398`, `src/spec-v6-demo.js:1501`, `src/spec-v6-demo.js:1745` |

## Highest-value remaining gaps

1. Live GitHub repository / PR / Actions integration remains `non-demoable-external` in this repo.
2. Real patch generation and actual remediation branch git operations remain `non-demoable-external`.
3. Full telemetry/event emission for every pipeline stage is still `partial`; most reliability signals exist as trace objects and invariant checks rather than a separate telemetry stream.
4. The whole-asset read scoring layer is stronger than baseline but still thinner than the spec’s richest decomposition.
5. LLM evaluator roles are still `modeled`, not executed.
