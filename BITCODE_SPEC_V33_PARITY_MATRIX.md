# Bitcode Spec V33 Parity Matrix

## Status

- Version: `V33`
- V33 state: draft target parity matrix opened; interface-depth parity begins at Gate 1
- Current canonical/latest target: `V32`
- Prior canonical anchor: `BITCODE_SPEC_V32.md`
- Prior generated proof appendix: `BITCODE_SPEC_V32_PROVEN.md`
- Generated structured artifact inventory: draft V33 specifying artifacts `.bitcode/v33-spec-family-report.json`, `.bitcode/v33-canonical-input-report.json`, Gate 2 `.bitcode/v33-interface-contract-catalog.json`, and Gate 3 `.bitcode/v33-mcp-api-tool-contracts.json`; later V33 gates may add additional source-safe interface proof artifacts
- Source parity state: Gate 3 adds package-owned `McpToolContract` source and generated proof coverage for MCP API tool discovery, schema, auth, denial, and proof-root contracts
- Spec companion: `BITCODE_SPEC_V33.md`
- Notes companion: `BITCODE_SPEC_V33_NOTES.md`
- Delta companion: `BITCODE_SPEC_V33_DELTA.md`
- Generated proof appendix: `BITCODE_SPEC_V33_PROVEN.md` only after V33 promotion

## Purpose

The V33 parity matrix prevents interface work from becoming a set of local adapters.
Every V33 gate must name the package-owned contract, interface surface, schema, auth policy, source-safety class, example fixture, compatibility row, telemetry/proof hook, validation command, and failure or repair posture required for closure.

## Audit basis

Gate 1 audit basis:

- `BITCODE_SPEC.txt`
- `BITCODE_SPEC_V32.md`
- `BITCODE_SPEC_V32_PROVEN.md`
- `BITCODE_SPEC_V33.md`
- `BITCODE_SPEC_V33_DELTA.md`
- `BITCODE_SPEC_V33_NOTES.md`
- `BITCODE_SPEC_V33_PARITY_MATRIX.md`
- `SPECIFICATIONS_ROADMAP.md`
- `README.md`
- `AGENTS.md`
- `.github/pull_request_template.md`
- `.github/workflows/bitcode-gate-quality.yml`
- `.github/workflows/bitcode-canon-quality.yml`
- `package.json`
- `packages/protocol/README.md`
- `protocol-demonstration/README.md`
- `packages/protocol/src/canon-posture.js`
- `protocol-demonstration/src/canon-posture.js`
- `scripts/check-v33-gate1-interface-roadmap-opening.mjs`

No `_legacy/` source is active source truth.

## V33 implementation matrix

| Area | Gate | Source evidence | Judgment | Closure requirement |
| --- | --- | --- | --- | --- |
| Draft family and branch posture | Gate 1 | `BITCODE_SPEC_V33.md`, DELTA, NOTES, PARITY, `BITCODE_SPEC.txt`, branch `v33/gate-1-interface-roadmap-opening` | drafted | V33 family validates in draft mode over active V32 and `check:v33-gate1` passes. |
| Roadmap truth | Gate 1 | `SPECIFICATIONS_ROADMAP.md`, README, PR template, workflow posture | drafted | Roadmap states V32 active, V33 draft, and coherent V34-V37 responsibilities. |
| Interface contract catalog | Gate 2 | `packages/btd/src/interface-contract-catalog.ts`, `packages/btd/__tests__/interface-contract-catalog.test.ts`, `.bitcode/v33-interface-contract-catalog.json`, `check:v33-gate2` | drafted | Active and deferred interface surfaces have package-owned rows. |
| MCP API contracts | Gate 3 | `packages/btd/src/mcp-tool-contract.ts`, `packages/btd/__tests__/mcp-tool-contract.test.ts`, `packages/executions-mcp/src/mcp-server/src/tools/pipeline-tools.ts`, `packages/executions-mcp/src/mcp-server/src/__tests__/unit/mcp-tool-contract.test.ts`, `.bitcode/v33-mcp-api-tool-contracts.json`, `check:v33-gate3` | drafted | MCP tool discovery, schemas, auth, denied states, and proof roots are package-derived. |
| ChatGPT App contracts | Gate 4 | `packages/btd/src/chatgpt-app-action-contract.ts`, `packages/btd/__tests__/chatgpt-app-action-contract.test.ts`, `packages/chatgptapp/src/tools.ts`, `packages/chatgptapp/src/__tests__/chatgpt-action-contract.test.ts`, `.bitcode/v33-chatgpt-app-action-contracts.json`, `check:v33-gate4` | drafted | ChatGPT App actions match package-owned Read, Need, Finding Fits, preview, fee, settlement, and delivery contracts. |
| Interface authorization policy | Gate 5 | `packages/btd/src/interface-authorization-policy.ts`, `packages/btd/__tests__/interface-authorization-policy.test.ts`, `packages/api/src/routes/__tests__/btd-crypto.test.ts`, `packages/executions-mcp/src/mcp-server/src/__tests__/unit/pipeline-ingress-contract.test.ts`, `packages/chatgptapp/src/__tests__/tools.test.ts`, `uapi/tests/terminalOrganizationAuthority.test.ts`, `.bitcode/v33-interface-authorization-policy.json`, `check:v33-gate5` | drafted | Interface auth and license denials fail closed with repair posture across API, MCP, ChatGPT App, and Terminal handoff fixtures. |
| Read license and AssetPack rights contracts | Gate 6 | `packages/btd/src/read-license-assetpack-rights-contract.ts`, `packages/btd/__tests__/read-license-assetpack-rights-contract.test.ts`, API/MCP/ChatGPT App/Terminal fixture tests, `.bitcode/v33-read-license-assetpack-rights-contracts.json`, `check:v33-gate6` | drafted | Source-safe preview, paid settlement, BTD rights, and delivery contracts are consistent across interfaces. |
| API schema compatibility | Gate 7 | planned `APISchemaCompatibilityMatrix` artifact and tests | pending | Schemas, examples, compatibility status, and validation commands are source-safe and versionless. |
| Interface telemetry proof hooks | Gate 8 | planned `InterfaceTelemetryProofHook` artifact and tests | pending | Interface actions replay to executions, ledger, database, object storage, and generated proof roots. |
| Interface consumer UX regression proof | Gate 9 | planned MCP, ChatGPT App, public API, and Terminal handoff consumer proof | pending | Consumers see source-safe summaries, proof roots, fee/rights previews, and readable denials. |
| Promotion readiness | Gate 10 | planned V33 promotion checker and generated proof support | pending | `version/v33` can promote only after all V33 gates pass and generated canon is source-safe. |

## V33 implementation checklist

| Area | Required V33 result | Judgment |
| --- | --- | --- |
| Active canon pointer | `BITCODE_SPEC.txt` remains `V32` during V33 gate work | drafted |
| Gate branch pattern | V33 work happens on `version/v33` or `v33/gate-N-*` branches | drafted |
| Spec-family shape | V33 SPEC, DELTA, NOTES, and PARITY satisfy the full spec-family checker | drafted |
| Gate 1 script | `pnpm run check:v33-gate1` fails closed on stale posture, missing roadmap truth, or missing interface-depth scope | drafted |
| Gate-quality workflow | Gate workflow validates V32 active / V33 draft posture and the V33 Gate 1 checker | drafted |
| Canon-quality workflow | Canon workflow validates promoted V32 canon, V33 draft family when present, and V32/V33 posture | drafted |
| Package docs | README, protocol package README, demonstration README, and PR template state V32 active / V33 draft workflow | drafted |
| Interface vocabulary | V33 spec family names MCP API, ChatGPT App, `InterfaceContractCatalog`, `InterfaceAuthorizationPolicy`, `ReadLicenseInterfaceContract`, `AssetPackRightsInterfaceContract`, `APISchemaCompatibilityMatrix`, and `InterfaceTelemetryProofHook` | drafted |

## Gate 2 Parity

| Requirement | Source evidence | Current V33 judgment |
| --- | --- | --- |
| Package-owned catalog builder exists | `packages/btd/src/interface-contract-catalog.ts` exports `buildBtdInterfaceContractCatalog` and `BTD_INTERFACE_CONTRACT_CATALOG_INTERFACE_IDS` | drafted |
| Active interface rows are named | `terminal_handoff`, `public_api`, `mcp_api`, `chatgpt_app`, and `package_consumer` rows are active contracts | drafted |
| Deferred hooks stay visible | `exchange_hook` and `conversations_hook` rows are `deferred_not_admitted` rather than hidden | drafted |
| Row metadata is complete | each row includes owner package, action id, schema id, auth policy id, source-safety class, example fixture path, validation command, compatibility status, failure mode, repair posture, telemetry proof hook id, and proof root | drafted |
| Generated artifact is source-safe and deterministic | `.bitcode/v33-interface-contract-catalog.json` is produced by `generate:v33-interface-contract-catalog` and checked by `check:v33-interface-contract-catalog` | drafted |
| Tests fail closed | `packages/btd/__tests__/interface-contract-catalog.test.ts` covers missing rows, duplicate rows, deferred-hook accidental admission, and secret-shaped or protected-source catalog text | drafted |
| Workflow and spec-family wiring exists | `check:v33-gate2`, `.github/workflows/bitcode-gate-quality.yml`, and `packages/protocol/src/canonical/v21-specifying.js` include the Gate 2 contract | drafted |

## Gate 3 Parity

| Requirement | Source evidence | Current V33 judgment |
| --- | --- | --- |
| Package-owned MCP contract builder exists | `packages/btd/src/mcp-tool-contract.ts` exports `buildBtdMcpToolContractRegistry`, `BTD_MCP_TOOL_CONTRACT_IDS`, and `getBtdMcpToolContract` | drafted |
| AssetPack create tool id is canonical | `bitcode://pipelines/asset-pack/create` is the required MCP API tool id | drafted |
| Tool schemas and auth are bound | `bitcode.mcp.assetPackCreate.input.v1`, `bitcode.mcp.assetPackCreate.output.v1`, `interface.authorization.pipeline-permission`, and `pipelines.create` are part of `McpToolContract` | drafted |
| Denied states are explicit | `SCHEMA_VALIDATION_FAILED`, `PROVIDER_BINDING_REQUIRED`, `INSUFFICIENT_PERMISSIONS`, `MISSING_API_KEY`, `RATE_LIMITED`, and `UNKNOWN_TOOL` are contract states | drafted |
| Proof and source-safety roots are explicit | proof-root fields include `toolId`, `inputSchemaId`, `outputSchemaId`, `authPolicyId`, `requestRoot`, `responseRoot`, and `writeAdmission`; source posture is `source-safe-preview-and-metadata-before-settlement` | drafted |
| MCP server consumes package contract | `packages/executions-mcp/src/mcp-server/src/tools/pipeline-tools.ts` uses `getBtdMcpToolContract`, `assetPackCreateContract.toolId`, and `assetPackCreateContract.description` | drafted |
| Generated artifact is source-safe and deterministic | `.bitcode/v33-mcp-api-tool-contracts.json` is produced by `generate:v33-mcp-api-tool-contracts` and checked by `check:v33-mcp-api-tool-contracts` | drafted |
| Tests fail closed | BTD and MCP tests cover contract discovery, proof roots, denied states, invalid schema arguments, and protected-source invisibility | drafted |
| Workflow and spec-family wiring exists | `check:v33-gate3`, `.github/workflows/bitcode-gate-quality.yml`, and `packages/protocol/src/canonical/v21-specifying.js` include the Gate 3 contract | drafted |

## Gate 4 Parity

| Requirement | Source evidence | Current V33 judgment |
| --- | --- | --- |
| Package-owned ChatGPT action contract builder exists | `packages/btd/src/chatgpt-app-action-contract.ts` exports `buildBtdChatGptAppActionContractRegistry`, `BTD_CHATGPT_APP_ACTION_CONTRACT_IDS`, and `renderBtdChatGptAppSourceSafeResponse` | drafted |
| Reading action sequence is canonical | `bitcode_request_read`, `bitcode_review_read_need`, `bitcode_request_finding_fits`, `bitcode_review_asset_pack_preview`, `bitcode_quote_asset_pack_fee`, `bitcode_settle_asset_pack`, and `bitcode_deliver_asset_pack` are required action ids | drafted |
| Schemas and auth are bound | every `ChatGptAppActionContract` carries input/output schema ids, `interface.authorization.chatgpt-reading-action`, `chatgpt.reading.invoke`, and source-safe renderer id | drafted |
| Denied states are explicit and repairable | `SCHEMA_VALIDATION_FAILED`, `READ_NEED_REQUIRED`, `FINDING_FITS_REQUIRED`, `ASSET_PACK_PREVIEW_REQUIRED`, `FEE_QUOTE_REQUIRED`, `SETTLEMENT_REQUIRED`, `READ_LICENSE_REQUIRED`, `ORGANIZATION_AUTHORITY_REQUIRED`, and `CONFIRMATION_REQUIRED` are readable repair states | drafted |
| ChatGPT App consumes package contract | `packages/chatgptapp/src/tools.ts` uses `buildBtdChatGptAppActionContractRegistry`, derives tool schemas, and returns `renderBtdChatGptAppSourceSafeResponse` metadata | drafted |
| Generated artifact is source-safe and deterministic | `.bitcode/v33-chatgpt-app-action-contracts.json` is produced by `generate:v33-chatgpt-app-action-contracts` and checked by `check:v33-chatgpt-app-action-contracts` | drafted |
| Tests fail closed | BTD and ChatGPT tests cover action registration, schemas, proof roots, accepted source-safe render output, denied repair actions, and secret-shaped source text rejection | drafted |
| Workflow and spec-family wiring exists | `check:v33-gate4`, `.github/workflows/bitcode-gate-quality.yml`, and `packages/protocol/src/canonical/v21-specifying.js` include the Gate 4 contract | drafted |

## Gate 5 Parity

| Requirement | Source evidence | Current V33 judgment |
| --- | --- | --- |
| Package-owned policy builder exists | `packages/btd/src/interface-authorization-policy.ts` exports `buildBtdInterfaceAuthorizationPolicy`, `buildBtdInterfaceAuthorizationPolicyFixtures`, and `renderBtdInterfaceAuthorizationDeniedState` | drafted |
| Required surfaces share fixtures | API, MCP, ChatGPT App, and Terminal tests call `getBtdInterfaceAuthorizationPolicyFixture` for shared fixture ids | drafted |
| Auth issuer and organization scope are first-class | policy output records auth issuer freshness plus organization, team, member, and role posture | drafted |
| Wallet, read-license, rights, and locked disclosure are first-class | policy output records wallet capability, read-license posture, AssetPack rights, and locked-source disclosure posture | drafted |
| Missing/stale authority fails closed | stale authority fixture returns `STALE_AUTHORITY`, readable denial, repair action, and denied-state rendering | drafted |
| Protected AssetPack delivery stays locked until paid/righted | unpaid ChatGPT delivery fixture returns `READ_LICENSE_REQUIRED`, `ASSET_PACK_RIGHTS_REQUIRED`, and `PROTECTED_SOURCE_DISCLOSURE_BLOCKED` | drafted |
| Interface writes carry policy roots | MCP pipeline writes and ChatGPT App connected-interface writes include `interfaceAuthorizationPolicy` metadata in write admission | drafted |
| Generated artifact is source-safe and deterministic | `.bitcode/v33-interface-authorization-policy.json` is produced by `generate:v33-interface-authorization-policy` and checked by `check:v33-interface-authorization-policy` | drafted |
| Workflow and spec-family wiring exists | `check:v33-gate5`, `.github/workflows/bitcode-gate-quality.yml`, and `packages/protocol/src/canonical/v21-specifying.js` include the Gate 5 contract | drafted |

## Gate 6 Parity

| Requirement | Source evidence | Current V33 judgment |
| --- | --- | --- |
| Package-owned read-license contract exists | `packages/btd/src/read-license-assetpack-rights-contract.ts` exports `buildBtdReadLicenseInterfaceContract` and shared fixture builders | drafted |
| Package-owned AssetPack rights contract exists | `packages/btd/src/read-license-assetpack-rights-contract.ts` exports `buildBtdAssetPackRightsInterfaceContract` and the shared registry | drafted |
| Required surfaces share fixtures | API, MCP, ChatGPT App, and Terminal tests call `getBtdReadLicenseAssetPackRightsInterfaceFixture` for shared fixture ids | drafted |
| Preview stays source-safe before settlement | API and MCP fixtures admit `source_safe_preview_admitted` / `preview_admitted` with `protectedSourceVisible: false` | drafted |
| Unpaid delivery fails closed | ChatGPT App unpaid delivery fixture returns settlement, read-license, rights-transfer, and locked-source blockers | drafted |
| Paid delivery requires finality and rights transfer | Terminal fixture admits delivery only after confirmed BTC finality, paid unlock, delivery admission, and rights-transfer receipt | drafted |
| Generated artifact is source-safe and deterministic | `.bitcode/v33-read-license-assetpack-rights-contracts.json` is produced by `generate:v33-read-license-assetpack-rights-contracts` and checked by `check:v33-read-license-assetpack-rights-contracts` | drafted |
| Workflow and spec-family wiring exists | `check:v33-gate6`, `.github/workflows/bitcode-gate-quality.yml`, and `packages/protocol/src/canonical/v21-specifying.js` include the Gate 6 contract | drafted |

## Gate 1 Parity

| Requirement | Source evidence | Current V33 judgment |
| --- | --- | --- |
| Active canon remains V32 during V33 draft opening | `BITCODE_SPEC.txt` contains `V32` | drafted |
| Runtime draft target is V33 | `packages/protocol/src/canon-posture.js` and `protocol-demonstration/src/canon-posture.js` declare V32 active and V33 draft | drafted |
| V33 SPEC family exists as draft | `BITCODE_SPEC_V33.md`, DELTA, NOTES, and PARITY | drafted |
| Roadmap is current | `SPECIFICATIONS_ROADMAP.md` states V32 active canon, V33 active draft target, and V34-V37 scopes | drafted |
| Gate-quality workflow is V33-aware | `.github/workflows/bitcode-gate-quality.yml` | drafted |
| Canon-quality workflow is V33-aware | `.github/workflows/bitcode-canon-quality.yml` | drafted |
| README reflects V32/V33 posture | `README.md` | drafted |
| PR template reflects V33 gate titles | `.github/pull_request_template.md` | drafted |
| V33 Gate 1 checker exists | `scripts/check-v33-gate1-interface-roadmap-opening.mjs` and package script | drafted |

## V33 accepted boundaries

- V33 owns interface-depth and interface-owned proof hooks.
- V34 owns deployment, host capability, distributed execution, environment lanes, rollback, upgrades, and secret rotation.
- V35 owns broad telemetry/documentation programs, dashboards, docs, incidents, operator guides, and rollout material.
- V36 owns deeper Exchange.
- V37 owns website Conversations.
- V33 does not authorize value-bearing production-mainnet launch.
- V33 does not expose protected AssetPack source before settlement through any interface.

## V33 completion condition

V33 is complete when all ten V33 gates are closed, source-safe interface contracts are package-owned and tested, MCP API and ChatGPT App behavior matches public API and Terminal handoff contracts, interface authorization and rights denials fail closed, schema compatibility evidence is generated, interface telemetry proof hooks replay to ledger/database/object-storage truth, and V33 promotion can generate `BITCODE_SPEC_V33_PROVEN.md` plus source-safe `.bitcode/v33-*` artifacts.
