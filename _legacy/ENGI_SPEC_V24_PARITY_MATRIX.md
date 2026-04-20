# ENGI Spec V24 Parity Matrix

## Status

- Scope: V24 canonical parity ledger for realizing external interfacing, exhaustive telemetry, and full-canon conformance
- Current canonical/latest target: `V24`
- Canonical proof-source commit: `00fabcb625e8c50ac9222596fba3f05ee7ab77f4`
- Prior canonical anchor: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V23.md`
- Prior generated proof appendix: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V23_PROVEN.md`
- Generated structured artifact inventory: active canonical `.engi/v19-*` reproducible reports, `.engi/v20-*` operator-quality reports, `.engi/v24-spec-family-report.json`, `.engi/v24-canonical-input-report.json`, and `.engi/v24-canon-posture-drift-report.json`; `ENGI_SPEC_V24_PROVEN.md` is the active generated proof appendix for V24
- Source parity state: V24 source-side mode-isolated external realization, live adapter contracts, continuity and reconciliation ledgers, exhaustive telemetry, build-process enforcement, and generated evidence are canonicalized; parity truth is aligned with the promoted V24 file family
- Active canonical anchor: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V24.md`
- Active generated proof appendix: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V24_PROVEN.md`
- Specification target: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V24.md`
- Delta companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V24_DELTA.md`
- Notes companion: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC_V24_NOTES.md`
- Current canonical pointer: `/Users/garrettmaring/Developer/ENGI/ENGI_SPEC.txt` -> `V24`
- V24 state: canonical promotion complete; parity truth, runtime posture truth, external-realization closure, and generated canon are aligned for V24
- Last fully realized canonical target preserved in source: `V24`

## Purpose

This file records the canonical parity ledger between:
- active V24 canon,
- the current runtime and demo shell,
- the external-realization architecture V24 specifies,
- and the remaining explicit boundaries that are still intentionally outside promoted V24 scope.

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

## V24 implementation matrix (formerly V24 draft implementation matrix)

| Area | Current source truth | V24 implementation expectation | Closure signal | Judgment |
| --- | --- | --- | --- | --- |
| Canonical file family presence | `ENGI_SPEC.txt`, `ENGI_SPEC_V24.md`, `ENGI_SPEC_V24_DELTA.md`, `ENGI_SPEC_V24_PARITY_MATRIX.md`, and `ENGI_SPEC_V24_NOTES.md` are present and aligned to active V24 canon | V24 requires the full promoted file family plus a matching V25 draft opening | V24 active file family exists and canon posture points to `V25` as the next draft | implemented |
| Environment-mode completeness | current source exposes a unified four-mode external realization contract plus env-resolved active runtime posture | V24 requires `production`, `staging`, `development`, and `mock` across all realized external interfaces | emitted environment profiles and mode-specific bindings exist for every interface class | implemented |
| Environment identity and resource isolation | current source emits mode-specific apps, addresses, accounts, namespaces, registries, and publication targets through the V24 descriptor and resolves active-mode overrides explicitly | V24 requires real mode-specific apps, addresses, accounts, namespaces, registries, and publication targets | proof surfaces and validation reject shared cross-mode bindings | implemented |
| Full-system rewrite discipline | current V24 main spec restates the current whole ENGI chain, subsystem catalog, proof-family canon, generated canon, and validation canon directly | V24 requires a promoted `SPEC` that restates current canon without semantic dependence on V23 | promoted V24 contains full-canon carriers required by `ENGI_SPECIFYING.md` | implemented |
| Strict spec-family conformance profile | current source includes a dedicated V24 strict profile rather than falling through to a narrowed V23-style delta profile | V24 requires a strict full-canon checker profile rather than a narrowed delta-style profile | spec-family checker fails if appendix-grade carriers, source maps, proof-family closure, or gate catalogs are missing | implemented |
| Real Bitcoin mainchain execution | current source emits `.engi/bitcoin-network-intent.json`, `.engi/bitcoin-network-execution.json`, `.engi/bitcoin-network-observation.json`, `.engi/repeated-read-payment-*.json`, and `.engi/external-realization-proof.json`, with local and remote executor paths | V24 requires network-capable spend, broadcast, and confirmation artifacts under one receipt contract | emitted real network-capable intent, execution, and observation receipts exist | implemented |
| Real sidechain execution | current source emits `.engi/sidechain-execution-receipt.json` and binds it into external-realization proof closure and reconciliation | V24 requires sidechain bridge execution and observation artifacts if the bridge is claimed as realized | emitted sidechain execution and checkpoint receipts exist | implemented |
| Compute container realization | current source emits `.engi/compute-container-manifest.json`, `.engi/compute-container-execution.json`, and `.engi/container-reality-proof.json` and supports local and remote execution adapters | V24 requires auditable compute-container manifests and execution receipts | emitted container manifest, execution receipt, attestation, and replay refs exist | implemented |
| Storage container realization | current source emits `.engi/storage-container-manifest.json`, `.engi/storage-publication-receipt.json`, `.engi/storage-retrieval-receipt.json`, and `.engi/container-reality-proof.json` with local and remote execution adapters | V24 requires auditable storage publication and retrieval receipts | emitted storage manifest, publication receipt, retrieval receipt, and retention-policy refs exist | implemented |
| GitHub live sessions | current source emits `.engi/github-live-session.json` and `.engi/github-live-interface-proof.json` and supports credential-backed `github-app-rest-v3` execution | V24 requires live GitHub App session receipts | emitted live session receipts bound to ENGI identities and authorization roots exist | implemented |
| GitHub inventory and artifact fetch | current source emits `.engi/github-inventory-fetch-receipt.json` and `.engi/github-artifact-fetch-receipt.json` and reconciles them through the live-interface proof path | V24 requires real GitHub inventory fetch and workflow-artifact fetch receipts | emitted fetch receipts with addressing and content-root binding exist | implemented |
| GitHub branch and PR mutation | current source emits `.engi/github-branch-publication-receipt.json` and `.engi/github-pr-update-receipt.json` and binds them through the live-interface proof path | V24 requires real branch publication and PR mutation receipts wherever those paths are claimed | emitted branch publication and PR update receipts with replay handles exist | implemented |
| External execution policy | current source exposes a unified V24 external-execution policy descriptor and emits it as a branch artifact and boundary-manifest reference | V24 requires one explicit external-execution policy carrier | `.engi/external-execution-policy.json` is emitted and referenced throughout runtime surfaces | implemented |
| Telemetry policy and telemetry completeness | current source exposes a V24 telemetry policy and coverage contract, emits branch artifacts, and projects sanitized summaries into operator views | V24 requires one telemetry policy plus emitted telemetry summaries for every realized interface and mode | `.engi/external-telemetry-policy.json` and `.engi/external-telemetry-summary.json` are emitted and validation treats omissions as blocking | implemented |
| Local spec-quality enforcement | current source provides repo-local pre-commit scripts for host-agnostic spec basics when spec-sensitive files are staged | V24 requires host-agnostic local checks when spec, specifying, or spec-checker files change | local gate runs pointer, structure, and lightweight spec-quality basics | implemented |
| Containerized CI or CD conformance | current source includes a dedicated containerized ENGI canon workflow rather than relying on unrelated CI surfaces | V24 requires containerized strict spec conformance and full implementation tests | CI or CD runs spec-quality basics and the ENGI demo test suite in a clean container | implemented |
| Commit-title-gated spec checks | current source binds strict spec conformance to `spec: VN` titles through both commit-msg hook and CI workflow execution | V24 requires strict spec conformance for commits whose title declares a versioned spec change | CI or CD detects `spec: VN` title and runs the strict spec-quality suite | implemented |
| API exposure for realization surfaces | current source exposes `/api/v24/external-realization` for both the generic V24 descriptor and the env-resolved active runtime posture | V24 requires runtime-visible realization surfaces before branch-artifact emission starts | API returns environment profiles, execution policy, telemetry policy, GitHub bindings, and active runtime states | implemented |
| Unified execution receipt model | current source emits intent, execution, observation, continuity, and reconciliation artifacts across Bitcoin, sidechain, repeated-read, compute, storage, and GitHub | V24 requires intent, execution, and observation receipts across all realized external interfaces | proof families and artifacts use one execution-receipt and reconciliation model | implemented |
| Proof-family expansion | current source closes `external-realization-execution`, `containerized-reality`, and `github-live-interface` in addition to inherited families | V24 requires proof-family closure for network execution, containers, and GitHub live interfacing | proof-witness manifest and proof-contract include all three new V24 families | implemented |
| Deliverables classification | current deliverables manifest classifies V24 external-realization artifacts and proof surfaces | V24 requires classification of every new external-realization artifact by confidentiality and disclosability | deliverables manifest covers all V24 artifacts correctly | implemented |
| Projection and disclosure safety | current source exposes sanitized external-realization summaries plus enriched external-boundary manifests through projection-aware views | V24 requires the same principal-bounded visibility for live execution receipts and container artifacts | projection policy and visibility tests cover all V24 artifact classes | implemented |
| Generated evidence | V24 now has its own generated reports and `_PROVEN_` closure | V24 requires its own generated reports and `_PROVEN_` appendix before promotion | `ENGI_SPEC_V24_PROVEN.md` and `.engi/v24-*` exist | implemented |

---

## V24 implementation checklist (formerly V24 draft implementation checklist)

| Area | Required V24 result | Current judgment |
| --- | --- | --- |
| Version center | V24 is explicitly realization-facing | closed |
| Canonical file family | V24 canonical family exists while V25 opens as the next draft | implemented |
| Environment-mode matrix | all realized external interfaces require `production`, `staging`, `development`, and `mock` | implemented |
| Environment isolation | all realized external interfaces require isolated identities and resources by mode | implemented |
| Real Bitcoin execution model | real spend and anchor execution artifacts are defined | implemented |
| Real sidechain execution model | real bridge execution artifacts are defined | implemented |
| Compute container model | auditable compute-container artifacts are defined | implemented |
| Storage container model | auditable storage-container artifacts are defined | implemented |
| GitHub live interfacing model | real GitHub session/fetch/mutation artifacts are defined | implemented |
| Telemetry model | exhaustive telemetry policy and summary artifacts are defined | implemented |
| Execution receipt model | one intent/execution/observation model spans realized external interfaces | implemented |
| V24 proof families | proof families are defined for external execution, containers, and GitHub | implemented |
| Acceptance criteria | review gate and promotion gate are explicit | implemented |
| Metaspec repair scope | V24 names metaspec repair as a supporting concern rather than the main version center | implemented |
| Source emission | runtime emits V24 artifacts | implemented |
| Test closure | tests fail closed on execution, observation, telemetry, and cross-mode isolation drift | implemented |
| Generated evidence | V24 `_PROVEN_` and generated reports exist | implemented |
| Canon promotion | `ENGI_SPEC.txt` points to `V24` | implemented |

## Accepted boundaries

| Boundary | Rationale | Reopen condition |
| --- | --- | --- |
| V24 keeps Bitcoin as audit/spend substrate rather than bulk compute or storage | mainchain remains the audit and spend layer, not the bulk execution or private artifact plane | Reopen only if a later version intentionally changes the architecture |
| Operator credentialing and third-party provisioning stay deployment-configured | source emits the receipt contract and executor contract, but live operator topology is not hard-coded repo truth | Reopen only if later canon chooses a fixed topology |
| GitHub, compute, storage, and network effects remain acceptable only through ENGI receipts | live interfacing must remain auditable inside ENGI | Reopen only if a stronger proof model supersedes receipt emission |

## Completion condition

This parity file is complete for V24 only when:
1. every requested realization axis is represented,
2. every major V24 area has a concrete closure signal,
3. the current judgment distinguishes implemented closure from accepted deferred boundaries,
4. environment-mode completeness and isolation are represented as closure conditions,
5. telemetry and coverage are represented as closure conditions,
6. metaspec repair and build-process enforcement are represented without replacing the external-realization center,
7. generated V24 evidence exists,
8. and the promotion gate is satisfied rather than implied.
