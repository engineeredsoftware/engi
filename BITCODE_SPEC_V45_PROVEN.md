# Bitcode Spec V45 Proven

## Status

- Version: `V45`
- V45 state: draft generated proof appendix for V45 proof-family artifacts; V44 remains active canon until V45 promotion
- Current canonical/latest target: `V44`
- Prior canonical anchor: `BITCODE_SPEC_V44.md`
- Prior generated proof appendix: `BITCODE_SPEC_V44_PROVEN.md`
- Generated structured artifact inventory: `.bitcode/v45-inference-synthesis-proof.json`, `.bitcode/v45-prompt-completeness-proof.json`, `.bitcode/v45-static-code-analysis-proof.json`, `.bitcode/v45-verification-decisions-proof.json`, `.bitcode/v45-selection-materialization-proof.json`, `.bitcode/v45-authorization-sensitive-flow-proof.json`, `.bitcode/v45-settlement-source-to-shares-proof.json`, `.bitcode/v45-disclosure-boundary-proof.json`, `.bitcode/v45-proof-contract-proof.json`, `.bitcode/v45-spec-family-report.json`, `.bitcode/v45-canonical-input-report.json`, `BITCODE_SPEC_V45_PROVEN.md`, `.bitcode/v45-promotion-readiness-report.json`
- Source parity state: proof-family generated artifacts are pass
- Notes companion: `BITCODE_SPEC_V45_NOTES.md`
- Spec companion: `BITCODE_SPEC_V45.md`
- Delta companion: `BITCODE_SPEC_V45_DELTA.md`
- Parity companion: `BITCODE_SPEC_V45_PARITY_MATRIX.md`
- Scope: source-safe generated V45 proof-family appendix
- Last fully realized canonical target preserved in source: `V44`

## Aggregate Proof Verdict

- verdict: `pass`
- proof-source commit: `draft-v45-gate16-proof-source-snapshot`
- aggregate root: `v45-proof-family-artifacts:405f61f8ad26baf7da5180aa`
- proof-family count: `9`

## Exact Proof-Family Inventory

| proofFamily | proofArtifactPath | artifactRoot | status |
| --- | --- | --- | --- |
| Inference-synthesis | `.bitcode/v45-inference-synthesis-proof.json` | `v45-inference-synthesis-proof:fc0c2253f69f2774167ab87b` | pass |
| Prompt-completeness | `.bitcode/v45-prompt-completeness-proof.json` | `v45-prompt-completeness-proof:ca14b2ad7bec005a1a513c31` | pass |
| Static-code-analysis | `.bitcode/v45-static-code-analysis-proof.json` | `v45-static-code-analysis-proof:7b3c53264091f21e2e41721a` | pass |
| Verification-decisions | `.bitcode/v45-verification-decisions-proof.json` | `v45-verification-decisions-proof:45ae9cfa4cac7fa66cefbc2d` | pass |
| Selection-and-materialization | `.bitcode/v45-selection-materialization-proof.json` | `v45-selection-and-materialization-proof:43171398d216cb0cd108a415` | pass |
| Authorization-and-sensitive-flow | `.bitcode/v45-authorization-sensitive-flow-proof.json` | `v45-authorization-and-sensitive-flow-proof:f6aa8e80186ebae17dd07add` | pass |
| Settlement-source-to-shares | `.bitcode/v45-settlement-source-to-shares-proof.json` | `v45-settlement-source-to-shares-proof:0b8635d549cc73bb4f0aaabb` | pass |
| Disclosure-boundary | `.bitcode/v45-disclosure-boundary-proof.json` | `v45-disclosure-boundary-proof:7e226c02bcdff5ddbf0f035f` | pass |
| Proof-contract | `.bitcode/v45-proof-contract-proof.json` | `v45-proof-contract-proof:3a5dccbe34efe2d9ac375207` | pass |

## Per-Family Member Inventory

### Inference-synthesis

Members: `ReadNeedComprehensionSynthesis`, `ReadFitsFindingSynthesis`, `deposit option synthesis`, `AssetPack synthesis`, `conversation guidance`.

### Prompt-completeness

Members: `prompt parts`, `prompts`, `registries`, `templates`, `interpolation`.

### Static-code-analysis

Members: `packages`, `routes`, `scripts`, `workflows`, `tests`, `docs`.

### Verification-decisions

Members: `Need review`, `Fit thresholding`, `quote acceptance`, `payment finality`, `rights transfer`, `delivery`.

### Selection-and-materialization

Members: `candidate recall`, `selected Fit set`, `withheld bundle`, `source-safe preview`, `repository delivery`.

### Authorization-and-sensitive-flow

Members: `organization policy`, `wallet authority`, `depositor approval`, `buyer entitlement`, `API/MCP`, `conversations`.

### Settlement-source-to-shares

Members: `BTD scalar-volume`, `BTC quote`, `PSBT`, `finality`, `rights transfer`, `source-to-shares`, `compensation`.

### Disclosure-boundary

Members: `/deposit`, `/read`, `/packs`, `API/MCP`, `ChatGPT App`, `Bitcode Chat`, `public docs`, `landing page`.

### Proof-contract

Members: `generated spec proof`, `workflow receipts`, `ledger journals`, `database projections`, `storage roots`, `telemetry`, `provider receipts`, `repository receipts`.

## Per-Family Theorem Inventory

### Inference-synthesis

- `source-safe inference`: The Inference-synthesis theorem "source-safe inference" binds source-safe evidence, typed state, and replayable proof roots.
- `typed output`: The Inference-synthesis theorem "typed output" binds source-safe evidence, typed state, and replayable proof roots.
- `prompt registry closure`: The Inference-synthesis theorem "prompt registry closure" binds source-safe evidence, typed state, and replayable proof roots.

### Prompt-completeness

- `total prompt catalog`: The Prompt-completeness theorem "total prompt catalog" binds source-safe evidence, typed state, and replayable proof roots.
- `no raw prompt leakage`: The Prompt-completeness theorem "no raw prompt leakage" binds source-safe evidence, typed state, and replayable proof roots.
- `benchmarkable parts`: The Prompt-completeness theorem "benchmarkable parts" binds source-safe evidence, typed state, and replayable proof roots.

### Static-code-analysis

- `source names align with protocol`: The Static-code-analysis theorem "source names align with protocol" binds source-safe evidence, typed state, and replayable proof roots.
- `no forbidden source exposure`: The Static-code-analysis theorem "no forbidden source exposure" binds source-safe evidence, typed state, and replayable proof roots.
- `no versioned source identifiers`: The Static-code-analysis theorem "no versioned source identifiers" binds source-safe evidence, typed state, and replayable proof roots.

### Verification-decisions

- `explicit decision root`: The Verification-decisions theorem "explicit decision root" binds source-safe evidence, typed state, and replayable proof roots.
- `actor authority`: The Verification-decisions theorem "actor authority" binds source-safe evidence, typed state, and replayable proof roots.
- `no collapsed states`: The Verification-decisions theorem "no collapsed states" binds source-safe evidence, typed state, and replayable proof roots.

### Selection-and-materialization

- `selected Fits above threshold`: The Selection-and-materialization theorem "selected Fits above threshold" binds source-safe evidence, typed state, and replayable proof roots.
- `source withheld`: The Selection-and-materialization theorem "source withheld" binds source-safe evidence, typed state, and replayable proof roots.
- `delivery after rights`: The Selection-and-materialization theorem "delivery after rights" binds source-safe evidence, typed state, and replayable proof roots.

### Authorization-and-sensitive-flow

- `no secret leakage`: The Authorization-and-sensitive-flow theorem "no secret leakage" binds source-safe evidence, typed state, and replayable proof roots.
- `no server custody`: The Authorization-and-sensitive-flow theorem "no server custody" binds source-safe evidence, typed state, and replayable proof roots.
- `actor entitlement`: The Authorization-and-sensitive-flow theorem "actor entitlement" binds source-safe evidence, typed state, and replayable proof roots.

### Settlement-source-to-shares

- `deterministic quote`: The Settlement-source-to-shares theorem "deterministic quote" binds source-safe evidence, typed state, and replayable proof roots.
- `finality-before-rights`: The Settlement-source-to-shares theorem "finality-before-rights" binds source-safe evidence, typed state, and replayable proof roots.
- `conservation`: The Settlement-source-to-shares theorem "conservation" binds source-safe evidence, typed state, and replayable proof roots.
- `allocation after settlement`: The Settlement-source-to-shares theorem "allocation after settlement" binds source-safe evidence, typed state, and replayable proof roots.

### Disclosure-boundary

- `source-safe before entitlement`: The Disclosure-boundary theorem "source-safe before entitlement" binds source-safe evidence, typed state, and replayable proof roots.
- `non-final labels`: The Disclosure-boundary theorem "non-final labels" binds source-safe evidence, typed state, and replayable proof roots.
- `boundary equivalence across interfaces`: The Disclosure-boundary theorem "boundary equivalence across interfaces" binds source-safe evidence, typed state, and replayable proof roots.

### Proof-contract

- `proof-backed readback`: The Proof-contract theorem "proof-backed readback" binds source-safe evidence, typed state, and replayable proof roots.
- `evidence precedence`: The Proof-contract theorem "evidence precedence" binds source-safe evidence, typed state, and replayable proof roots.
- `repair on conflict`: The Proof-contract theorem "repair on conflict" binds source-safe evidence, typed state, and replayable proof roots.

## Replay-Step Inventories And Theorem Bindings

### Inference-synthesis

- `synthesize Need`: `source-safe inference`
- `Finding Fits`: `typed output`
- `synthesize AssetPack`: `prompt registry closure`
- `redacted telemetry readback`: `source-safe inference`

### Prompt-completeness

- `registry resolution`: `total prompt catalog`
- `interpolation`: `no raw prompt leakage`
- `redaction`: `benchmarkable parts`
- `benchmark run`: `total prompt catalog`

### Static-code-analysis

- `lint`: `source names align with protocol`
- `typecheck`: `no forbidden source exposure`
- `casing/imports`: `no versioned source identifiers`
- `spec check`: `source names align with protocol`

### Verification-decisions

- `approve Need`: `explicit decision root`
- `select Fits`: `actor authority`
- `accept quote`: `no collapsed states`
- `confirm finality`: `explicit decision root`

### Selection-and-materialization

- `search`: `selected Fits above threshold`
- `rank`: `source withheld`
- `select`: `delivery after rights`
- `synthesize`: `selected Fits above threshold`
- `unlock`: `source withheld`
- `deliver`: `delivery after rights`

### Authorization-and-sensitive-flow

- `policy check`: `no secret leakage`
- `wallet ready`: `no server custody`
- `authorization denial`: `actor entitlement`
- `redaction`: `no secret leakage`

### Settlement-source-to-shares

- `compute BTD`: `deterministic quote`
- `quote BTC`: `finality-before-rights`
- `observe payment`: `conservation`
- `confirm finality`: `allocation after settlement`
- `allocate shares`: `deterministic quote`

### Disclosure-boundary

- `preview`: `source-safe before entitlement`
- `quote`: `non-final labels`
- `observation`: `boundary equivalence across interfaces`
- `finality`: `source-safe before entitlement`
- `rights`: `non-final labels`
- `delivery`: `boundary equivalence across interfaces`

### Proof-contract

- `readback join`: `proof-backed readback`
- `contradiction`: `evidence precedence`
- `repair`: `repair on conflict`
- `replay`: `proof-backed readback`

## Witness Artifact Inventories

### Inference-synthesis

- `.bitcode/v38-inference-surface-inventory.json`: source-safe present
- `.bitcode/v38-ptrr-failsafe-thricified-stack.json`: source-safe present
- `.bitcode/v39-read-fits-finding-runtime.json`: source-safe present
- `.bitcode/v41-promptpart-prompt-inventory.json`: source-safe present

### Prompt-completeness

- `.bitcode/v41-promptpart-prompt-inventory.json`: source-safe present
- `.bitcode/v41-registry-interpolation-contracts.json`: source-safe present
- `.bitcode/v41-prompt-program-benchmark-report.json`: source-safe present

### Static-code-analysis

- `.bitcode/v44-promotion-readiness-report.json`: source-safe present
- `.bitcode/v44-spec-family-report.json`: source-safe present
- `.bitcode/v44-canonical-input-report.json`: source-safe present

### Verification-decisions

- `.bitcode/v42-readneed-review-resynthesis-product-closure.json`: source-safe present
- `.bitcode/v42-readfitsfinding-preview-quote.json`: source-safe present
- `.bitcode/v44-organization-policy-wallet-authority.json`: source-safe present

### Selection-and-materialization

- `.bitcode/v39-read-fits-finding-runtime.json`: source-safe present
- `.bitcode/v42-readfitsfinding-preview-quote.json`: source-safe present
- `.bitcode/v42-settlement-rights-delivery.json`: source-safe present

### Authorization-and-sensitive-flow

- `.bitcode/v44-organization-policy-wallet-authority.json`: source-safe present
- `.bitcode/v33-interface-authorization-policy.json`: source-safe present
- `.bitcode/v37-conversation-telemetry-proof-hooks.json`: source-safe present

### Settlement-source-to-shares

- `.bitcode/v44-btd-btc-compensation-statements.json`: source-safe present
- `.bitcode/v44-reading-budget-quote-policy.json`: source-safe present
- `.bitcode/v42-settlement-rights-delivery.json`: source-safe present

### Disclosure-boundary

- `.bitcode/v43-read-route-five-step-ux.json`: source-safe present
- `.bitcode/v43-deposit-route-options.json`: source-safe present
- `.bitcode/v43-packs-activity-master-detail.json`: source-safe present

### Proof-contract

- `.bitcode/v44-promotion-readiness-report.json`: source-safe present
- `.bitcode/v44-canonical-input-report.json`: source-safe present
- `.bitcode/v44-spec-family-report.json`: source-safe present

## Generated Artifact Inventories

- `.bitcode/v45-inference-synthesis-proof.json`
- `.bitcode/v45-prompt-completeness-proof.json`
- `.bitcode/v45-static-code-analysis-proof.json`
- `.bitcode/v45-verification-decisions-proof.json`
- `.bitcode/v45-selection-materialization-proof.json`
- `.bitcode/v45-authorization-sensitive-flow-proof.json`
- `.bitcode/v45-settlement-source-to-shares-proof.json`
- `.bitcode/v45-disclosure-boundary-proof.json`
- `.bitcode/v45-proof-contract-proof.json`
- `.bitcode/v45-spec-family-report.json`
- `.bitcode/v45-canonical-input-report.json`
- `BITCODE_SPEC_V45_PROVEN.md`
- `.bitcode/v45-promotion-readiness-report.json`

## V45 Promotion Readiness

- promotionReadinessArtifact: `.bitcode/v45-promotion-readiness-report.json`
- promotionReadinessGate: `check:v45-gate18`
- promotionWorkflow: `.github/workflows/v45-canon-promotion.yml`
- pointerAdvanceRule: workflow validation must pass before `BITCODE_SPEC.txt` can become `V45`

## Scenario And Run Coverage Matrices

| scenarioId | proofFamily | memberCount | theoremCount | replayStepCount | expectedVerdict |
| --- | --- | --- | --- | --- | --- |
| v45-inference-synthesis-source-safe-replay | Inference-synthesis | 5 | 3 | 4 | pass |
| v45-prompt-completeness-source-safe-replay | Prompt-completeness | 5 | 3 | 4 | pass |
| v45-static-code-analysis-source-safe-replay | Static-code-analysis | 6 | 3 | 4 | pass |
| v45-verification-decisions-source-safe-replay | Verification-decisions | 6 | 3 | 4 | pass |
| v45-selection-and-materialization-source-safe-replay | Selection-and-materialization | 5 | 3 | 6 | pass |
| v45-authorization-and-sensitive-flow-source-safe-replay | Authorization-and-sensitive-flow | 6 | 3 | 4 | pass |
| v45-settlement-source-to-shares-source-safe-replay | Settlement-source-to-shares | 7 | 4 | 5 | pass |
| v45-disclosure-boundary-source-safe-replay | Disclosure-boundary | 8 | 3 | 6 | pass |
| v45-proof-contract-source-safe-replay | Proof-contract | 8 | 3 | 4 | pass |

## Fail-Closed Contract

V45 proof-family artifacts fail closed when source evidence, witness artifacts, proof roots, tests, workflow bindings, or source-safety posture are missing, stale, contradictory, or unsafe.

## Spec-Family Report Binding

- report id: `v45-spec-family-report`
- passed: `true`

## Canonical Input Report Binding

- report id: `v45-canonical-input-report`
- passed: `true`

