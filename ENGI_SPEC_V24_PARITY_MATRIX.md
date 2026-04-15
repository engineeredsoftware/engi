# ENGI Spec V24 Parity Matrix

## Status

- Scope: V24 draft parity ledger for realizing external interfacing after V23 deployed-infrastructure canon
- Current canonical/latest target: `V23`
- Current draft target: `V24`
- Prior canonical anchor: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V23.md`
- Prior generated proof appendix: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V23_PROVEN.md`
- Generated structured artifact inventory: active canonical `.engi/v19-*`, `.engi/v20-*`, and `.engi/v23-*` reports remain the current generated baseline; V24 draft-target generation adds `.engi/v24-spec-family-report.json`, `.engi/v24-canonical-input-report.json`, and `ENGI_SPEC_V24_PROVEN.md`
- Source parity state: draft-target source currently exposes environment profiles, emitted V24 execution/container/GitHub receipt families, enriched external-boundary and projection summaries, strict spec-quality enforcement, and `/api/v24/external-realization`; live third-party Bitcoin/sidechain/container/GitHub execution remains unrealized
- Active canonical anchor: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V23.md`
- Active generated proof appendix: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V23_PROVEN.md`
- Draft specification target: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V24.md`
- Draft delta companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V24_DELTA.md`
- Draft notes companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V24_NOTES.md`
- Pointer state remains: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC.txt` -> `V23`
- V24 state: draft only; this file records intended closure, not current active parity truth

## Purpose

This file records the draft parity ledger between:
- active V23 canon,
- the V24 realization draft,
- the current runtime's V23 boundary posture,
- and the source work still required before V24 could ever become canonical.

The dominant parity target is actual external operation by configuration:
- reliable Bitcoin mainchain and sidechain execution,
- reliable compute and storage container execution,
- reliable GitHub live execution,
- exhaustive telemetry throughout core, demonstration, and all executable surfaces,
- and enforced build discipline on canonical `spec: VN` commits so version promises stay mechanically checked.

## Audit basis

This matrix is grounded in:
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V23.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V23_DELTA.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V23_PARITY_MATRIX.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V23_PROVEN.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V24.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V24_DELTA.md`
- `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V24_NOTES.md`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/src/canon-posture.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/src/engi-demo.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/src/canonical/v23-bitcoin.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/src/canonical/v23-bitcoin-demonstration-service.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/src/canonical/v24-external-realization.js`
- `/Users/garrettmaring/Developer/ENGI/engi-demo/server.js`

---

## V24 draft implementation matrix

| Area | Current source truth | V24 implementation expectation | Closure signal | Judgment |
| --- | --- | --- | --- | --- |
| Draft file family presence | V23 is active and `canon-posture.js` already names `V24` as the draft target | V24 requires `SPEC`, `DELTA`, `PARITY_MATRIX`, and `NOTES` draft files | V24 draft family exists without changing `ENGI_SPEC.txt` | implemented as draft |
| Environment-mode completeness | current source now exposes a V24 draft-target descriptor with one unified four-mode external realization contract | V24 requires `production`, `staging`, `development`, and `mock` across all realized external interfaces | emitted environment profiles and mode-specific bindings for every interface class | implemented as draft-target descriptor |
| Environment identity and resource isolation | current source now emits mode-specific draft-target apps, addresses, accounts, namespaces, registries, and publication targets through the V24 descriptor | V24 requires real mode-specific apps, addresses, accounts, namespaces, registries, and publication targets | proof surfaces and validation reject shared cross-mode bindings | implemented as draft-target descriptor |
| Full-system rewrite discipline | current V24 draft is still a version-focused draft and not yet a promoted full-system rewrite | V24 requires a promoted `SPEC` that restates current canon without semantic dependence on V23 | promoted V24 contains full-canon carriers required by `ENGI_SPECIFYING.md` | specified not implemented |
| Strict spec-family conformance profile | current source now includes a dedicated V24 strict profile rather than falling through to a narrowed V23-style delta profile | V24 requires a strict full-canon checker profile rather than a narrowed delta-style profile | spec-family checker fails if appendix-grade carriers, source maps, proof-family closure, or gate catalogs are missing | implemented as draft-target enforcement slice |
| Real Bitcoin mainchain execution | current source now emits draft-target `.engi/bitcoin-network-intent.json`, `.engi/bitcoin-network-execution.json`, `.engi/bitcoin-network-observation.json`, and `.engi/external-realization-proof.json`, but those receipts are still deterministic realization slices rather than live third-party execution | V24 requires real network-capable spend, broadcast, and confirmation artifacts | emitted real network intent, execution, and observation receipts | implemented as draft-target source slice |
| Real sidechain execution | current source now emits draft-target `.engi/sidechain-execution-receipt.json` and binds it into external-realization proof closure, but not a live sidechain operator path | V24 requires real sidechain bridge execution and observation artifacts if the bridge is claimed as realized | emitted real sidechain execution and checkpoint receipts | implemented as draft-target source slice |
| Compute container realization | current source now emits `.engi/compute-container-manifest.json`, `.engi/compute-container-execution.json`, and `.engi/container-reality-proof.json`, but those remain realization-model receipts rather than live external container runs | V24 requires auditable compute-container manifests and execution receipts | emitted container manifest, execution receipt, attestation, and replay refs | implemented as draft-target source slice |
| Storage container realization | current source now emits `.engi/storage-container-manifest.json`, `.engi/storage-publication-receipt.json`, `.engi/storage-retrieval-receipt.json`, and `.engi/container-reality-proof.json`, but not a live storage backend path | V24 requires auditable storage publication and retrieval receipts | emitted storage manifest, publication receipt, retrieval receipt, and retention-policy refs | implemented as draft-target source slice |
| GitHub live sessions | current source now emits `.engi/github-live-session.json` and `.engi/github-live-interface-proof.json`, but not a live GitHub App session against third-party GitHub | V24 requires live GitHub App session receipts | emitted live session receipts bound to ENGI identities and authorization roots | implemented as draft-target source slice |
| GitHub inventory and artifact fetch | current source now emits `.engi/github-inventory-fetch-receipt.json` and `.engi/github-artifact-fetch-receipt.json`, but those are still deterministic realization-model receipts | V24 requires real GitHub inventory fetch and workflow-artifact fetch receipts | emitted fetch receipts with addressing and content-root binding | implemented as draft-target source slice |
| GitHub branch and PR mutation | current source now emits `.engi/github-branch-publication-receipt.json` and `.engi/github-pr-update-receipt.json`, but not live branch/PR mutations | V24 requires real branch publication and PR mutation receipts if those paths are claimed as realized | emitted branch publication and PR update receipts with replay handles | implemented as draft-target source slice |
| External execution policy | current source now exposes a unified V24 draft-target external-execution policy descriptor and emits it as a branch artifact and boundary-manifest reference | V24 requires one explicit external-execution policy carrier | emitted `.engi/external-execution-policy.json` and referenced it everywhere | implemented as draft-target source slice |
| Telemetry policy and telemetry completeness | current source now exposes a V24 draft-target telemetry policy and coverage contract, emits branch artifacts, and projects sanitized summaries into operator views | V24 requires one telemetry policy plus emitted telemetry summaries for every realized interface and mode | emitted `.engi/external-telemetry-policy.json`, `.engi/external-telemetry-summary.json`, and validation treats omissions as blocking | implemented as draft-target source slice |
| Local spec-quality enforcement | current source now provides repo-local pre-commit scripts for host-agnostic spec basics when spec-sensitive files are staged | V24 requires host-agnostic local checks when spec, specifying, or spec-checker files change | local gate runs pointer, structure, and lightweight spec-quality basics | implemented as draft-target enforcement slice |
| Containerized CI or CD conformance | current source now includes a dedicated containerized ENGI canon workflow rather than relying on unrelated CI surfaces | V24 requires containerized strict spec conformance and full implementation tests | CI or CD job executes spec-quality basics and full ENGI demo tests in a clean container | implemented as draft-target enforcement slice |
| Commit-title-gated spec checks | current source now binds strict spec conformance to `spec: VN` titles through both commit-msg hook and CI workflow execution | V24 requires strict spec conformance for commits whose title declares a versioned spec change | CI or CD detects `spec: VN` title and runs the strict spec-quality suite | implemented as draft-target enforcement slice |
| API exposure for draft-target realization surfaces | current source now exposes `/api/v24/external-realization` for the V24 draft-target descriptor | V24 requires runtime-visible draft-target source surfaces before branch-artifact emission starts | API returns environment profiles, execution policy, telemetry policy, and GitHub bindings | implemented as draft-target source slice |
| Unified execution receipt model | current source has separate V23 bitcoin carriers but no single generalized live-execution model | V24 requires intent, execution, and observation receipts across all realized external interfaces | proof families and artifacts use one execution-receipt model | specified not implemented |
| Proof-family expansion | current source closes `bitcoin-audit-anchor` and `bitcoin-settlement-interface` only | V24 requires proof-family closure for network execution, containers, and GitHub live interfacing | proof-witness manifest and proof-contract include all three new V24 families | specified not implemented |
| Deliverables classification | current deliverables manifest classifies V23 bitcoin artifacts and proof surfaces | V24 requires classification of every new external-realization artifact by confidentiality and disclosability | deliverables manifest covers all V24 artifacts correctly | specified not implemented |
| Projection and disclosure safety | V23 public/reviewer/buyer/internal visibility is already explicit for V23 artifacts, and current source now exposes sanitized external-realization summaries plus enriched external-boundary manifests through projection-aware views | V24 requires the same principal-bounded visibility for live execution receipts and container artifacts | projection policy and visibility tests cover all V24 artifact classes | implemented as draft-target source slice |
| Generated evidence | V23 has generated evidence and `_PROVEN_` closure | V24 requires its own generated reports and `_PROVEN_` appendix before promotion | `ENGI_SPEC_V24_PROVEN.md` and `.engi/v24-*` exist | specified not implemented |

---

## V24 draft implementation checklist

| Area | Required V24 result | Current judgment |
| --- | --- | --- |
| Draft version center | V24 is explicitly realization-facing | closed in draft |
| Draft family | V24 draft family exists while V23 remains active | implemented |
| Environment-mode matrix | all realized external interfaces require `production`, `staging`, `development`, and `mock` | implemented as draft-target source slice |
| Environment isolation | all realized external interfaces require isolated identities and resources by mode | implemented as draft-target source slice |
| Real Bitcoin execution model | real spend and anchor execution artifacts are defined | specified |
| Real sidechain execution model | real bridge execution artifacts are defined | specified |
| Compute container model | auditable compute-container artifacts are defined | specified |
| Storage container model | auditable storage-container artifacts are defined | specified |
| GitHub live interfacing model | real GitHub session/fetch/mutation artifacts are defined | specified |
| Telemetry model | exhaustive telemetry policy and summary artifacts are defined | implemented as draft-target source slice |
| Execution receipt model | one intent/execution/observation model spans realized external interfaces | specified |
| V24 proof families | proof families are defined for external execution, containers, and GitHub | specified |
| Acceptance criteria | review gate and promotion gate are explicit | implemented |
| Metaspec repair scope | current draft now names metaspec repair as a supporting concern rather than the main version center | V24 requires metaspec repair to support, not replace, external-realization closure | V24 acceptance and boundaries keep external realization primary | implemented in draft |
| Source emission | runtime emits V24 artifacts | implemented as draft-target source slice |
| Test closure | tests fail closed on execution, observation, telemetry, and cross-mode isolation drift | implemented as draft-target source slice |
| Generated evidence | V24 `_PROVEN_` and generated reports exist | not implemented |
| Canon promotion | `ENGI_SPEC.txt` points to `V24` | not implemented |

## Accepted boundaries

| Boundary | Rationale | Reopen condition |
| --- | --- | --- |
| V24 draft does not promote itself | V23 remains active until source, tests, and evidence close | Reopen only during actual V24 promotion |
| V24 does not yet claim source emission | this draft is review-first, not implementation-complete | Reopen once source work starts |
| V24 does not move bulk compute or private storage to Bitcoin mainchain | Bitcoin remains audit/spend substrate | Reopen only if a later version changes architecture intentionally |
| V24 does not accept GitHub side effects without ENGI receipts | live interfacing must remain auditable inside ENGI | Reopen only if a stronger proof model supersedes receipt emission |

## Completion condition

This parity file is first-gate complete for review only when:
1. every requested realization axis is represented,
2. every major V24 area has a concrete expected closure signal,
3. the current judgment distinguishes draft specification from actual implementation,
4. environment-mode completeness and isolation are represented as closure conditions,
5. telemetry and coverage are represented as closure conditions,
6. metaspec repair and build-process enforcement are represented without replacing the external-realization center,
7. and the promotion gate remains explicit rather than implied.
