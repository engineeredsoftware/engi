# Bitcode Spec V37 Notes

## Status

- Version: `V37`
- V37 state: draft opening; Gate 1 opens Website Conversations depth over active V36 Exchange canon
- Current canonical/latest target: `V36`
- Current active draft target: `V37`
- Prior canonical anchor: `BITCODE_SPEC_V36.md`
- Prior generated proof appendix: `BITCODE_SPEC_V36_PROVEN.md`
- Generated structured artifact inventory: draft `.bitcode/v37-spec-family-report.json`, `.bitcode/v37-canonical-input-report.json`, and `.bitcode/v37-canon-posture-drift-report.json` readiness; later V37 gates add package-owned Conversations artifacts
- Source parity state: V37 source parity begins at Gate 1 with spec family, roadmap, docs, workflow, and checker posture; route, package, stream, and telemetry parity begin in later gates
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
