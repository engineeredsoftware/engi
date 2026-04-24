# Bitcode API Notes

Status: non-canonical internal note. API requirements are canonical only when promoted into the active V26 SPEC/proof family.

## API Role

The Bitcode API is the server-owned admission layer for Bitcode Exchange state. It must not be a collection of route-local product interpretations.

API surfaces must:
- bind identity, wallet/readiness, and repository scope,
- accept source and attachment evidence,
- expose measured Need review,
- fail closed before fit search when Need review rejects or requests remeasurement,
- write AssetPack, proof, and settlement outputs,
- stream execution state to Terminal and admitted interfaces,
- support MCP and ChatGPT-style connected interfaces without letting those interfaces own Exchange state.

## Active Interface Families

Current V26 families:
- `/api/state`
- `/api/activity`
- `/api/deposits`
- `/api/need-review`
- `/api/make-bitcode-branch`
- `/api/conversations/*`
- `/api/executions/*`
- `/api/vcs/*`
- `/api/auxillaries/*`
- `/api/v24/*` retained protocol realization corridors
- package API route owners under `packages/api/src/routes/*`

## Execution and AssetPack Routes

The current execution route corridor still uses compatibility parameters such as `type=pipeline:deliverables`. Product meaning is AssetPack execution.

Route behavior must preserve:
- typed input normalization,
- source/repository binding,
- execution id and correlation id storage,
- SSE events for Terminal reread,
- Need-measurement evidence admission,
- AssetPack written-asset snapshots,
- Finish result summaries and delivery evidence.

## Need Review Boundary

`/api/need-review` is the pre-fit admission boundary:
- `GET` presents the measured Need and source-to-shares context.
- `POST` records accept, reject, or remeasure-with-feedback.
- downstream fit or branch materialization must fail closed unless the Need is accepted.

## Connected Interfaces

MCP, ChatGPT App, VCS, Jira, and other connected interfaces are ingress or delivery mechanisms. They do not replace Exchange state.

Rules:
- writes must emit admission receipts,
- unconfirmed writes fail closed,
- output payloads normalize toward AssetPacks, AssetPack partials, or connected-interface written assets,
- proof/state must remain rereadable from Terminal and Exchange routes.

## Environment Keys

Current V26 Bitcode keys include:
- `BITCODE_LLM_PROVIDER`
- `BITCODE_LLM_MODEL`
- `BITCODE_LOG_TO_FILE`
- `BITCODE_ENABLE_NOTIFICATIONS`
- `BITCODE_ENABLE_COMPUTER_USE_NEED_MEASUREMENT`

Removed compute and orchestration toggle keys are not admitted V26 API contract.
