# Bitcode Spec V37 Notes

## Status

- Version: `V37`
- V37 state: draft implementation; Gate 4 closes ConversationWritingWorkspace fullscreen writing mode and composer workspace over active V36 Exchange canon
- Current canonical/latest target: `V36`
- Current active draft target: `V37`
- Prior canonical anchor: `BITCODE_SPEC_V36.md`
- Prior generated proof appendix: `BITCODE_SPEC_V36_PROVEN.md`
- Generated structured artifact inventory: draft `.bitcode/v37-spec-family-report.json`, `.bitcode/v37-canonical-input-report.json`, `.bitcode/v37-canon-posture-drift-report.json`, `.bitcode/v37-conversation-session-route-history.json`, `.bitcode/v37-conversation-stream-event-contract.json`, and `.bitcode/v37-conversation-writing-workspace.json`
- Source parity state: V37 source parity begins at Gate 1 with spec family, roadmap, docs, workflow, and checker posture; Gate 2 adds package-owned ConversationSession route-history contracts; Gate 3 adds package-owned ConversationStreamEvent stream contracts; Gate 4 adds package-owned ConversationWritingWorkspace fullscreen composer contracts
- Scope: draft notes for website Conversations work after V36 Exchange depth and after the V28 ChatGPT App MVP proved the interface path.

This NOTES file does not promote V37. It is binding draft guidance while V37 gates are in flight.

## Notes companion rule

This file is the V37 notes companion.
Requirements are binding for V37 gate work while `BITCODE_SPEC.txt` remains `V36`.

## Simplified-spec reading rule

Read `BITCODE_SPEC.txt` first.
If it points to `V36`, V36 is active canon and V37 is the active draft target only when this V37 SPEC family exists on a V37 branch.
Read `BITCODE_SPEC_V37.md`, this NOTES companion, the V37 DELTA, and the V37 PARITY matrix together before implementing Conversations work.

## Concise current-system reading

V36 promotes Exchange depth after the Terminal, Reading, BTD, Auxillaries, Interfaces, Deployment, Telemetry/Docs, and Exchange spine has matured.
Website Conversations returns in V37 so it can be rebuilt around proven Protocol, Terminal, BTD, Exchange, interface, deployment, telemetry, and documentation truth.

## Intended V37 focus

V37 owns website Conversations:

- website conversation route and route-local state;
- stream UI and failure/retry states;
- fullscreen writing mode;
- conversation-to-Terminal handoff;
- source selectors and GitHub/VCS context integration;
- route-local chat history and branching;
- proof-root, policy, and read-right surfacing inside conversational UX;
- conversation-specific tests, proofs, telemetry, and public documentation.

## Boundaries

V37 must not absorb the V28 ChatGPT App MVP, V33 interface-deepening work, or V36 Exchange law.
It must use the same Protocol/Terminal/BTD registry and access-policy truth rather than becoming a parallel source of product law.

## Gate 2 implementation notes

ConversationSession route-history contracts are source-safe route contracts, not a new ledger.
Gate 2 adds `.bitcode/v37-conversation-session-route-history.json`, `buildConversationSessionRouteHistory`, route contract helpers, package tests, route tests, and `check:v37-gate2`.
The required operations are create, restore, branch, retry, redact, and stream.
Restore, branch, retry, and redaction preserve route-local history and proof roots without exposing protected source, raw protected prompts, protected model responses with source, wallet private material, provider tokens, secrets, settlement private payloads, unpaid AssetPack source, or any global ledger authority claim.

## Gate 3 implementation notes

ConversationStreamEvent stream contracts are source-safe SSE metadata
contracts, not a transcript of raw model or tool payloads. Gate 3 adds
`.bitcode/v37-conversation-stream-event-contract.json`,
`buildConversationStreamEventContract`, the route-facing stream event adapter,
package tests, route tests, UI tests, and `check:v37-gate3`.
The required event rows are model deltas, tool calls, retrieval summaries,
proof roots, retry states, completion decisions, and error rows.
The shared execution log is the canonical stream UI: collapsed rows show a
readable status, expanded rows show source-safe metadata, and the header can
surface event id, proof root, redaction posture, prompt/result disclosure
posture, and fail-closed state.
Gate 3 keeps gate-quality CI greenable by bounding the workflow runtime and
running maintained targeted package tests inside the gate job.

## Gate 4 implementation notes

ConversationWritingWorkspace contracts are source-safe fullscreen composer
contracts, not protected source storage or Terminal authority. Gate 4 adds
`.bitcode/v37-conversation-writing-workspace.json`,
`buildConversationWritingWorkspace`, the route-facing writing workspace helper,
the fullscreen workspace component, package tests, UI tests, and
`check:v37-gate4`.
The required modes are Read Request, Need feedback, AssetPack review note, and
Terminal handoff summary. The required actions are save, restore, summarize,
and handoff. Draft recovery stays route-local; emitted summaries and handoff
messages are redacted source-safe metadata only and must not expose protected
source, provider tokens, private wallet material, unpaid AssetPack source,
settlement private payloads, or global ledger authority claims.

## V37 gate plan

- Gate 1: V37 Conversations Roadmap And Spec Opening
- Gate 2: Conversation Session And Route History Contracts
- Gate 3: Conversation Stream UI And Event Contracts
- Gate 4: Fullscreen Writing Mode And Composer Workspace
- Gate 5: Source Selectors And Context Policy
- Gate 6: Conversation To Terminal Transaction Handoff
- Gate 7: Conversation Persistence Privacy And Redaction
- Gate 8: Conversations Telemetry Proof Hooks And Docs
- Gate 9: Local Staging Conversations Rehearsal
- Gate 10: V37 Promotion Readiness
