# Bitcode Spec V38 Notes

## Status

- Canonical pointer: `BITCODE_SPEC.txt` -> `V37`
- Active canonical anchor: `BITCODE_SPEC_V37.md`
- Active generated proof appendix: `BITCODE_SPEC_V37_PROVEN.md`
- V38 state: notes-only draft opening

## Notes-only draft rule

V38 begins as a notes-only draft opening, not first-gate implementation. The
active implementation remains V37 until a V38 version branch and Gate 1 draft
family explicitly open the V38 specification set.

These notes preserve candidate work without creating source identifiers,
routes, tests, or package APIs that claim V38 implementation before Gate 1.

## Deferred from V37

V37 promoted Website Conversations. V38 should inspect the inference execution
stack beneath PTRR agents and ensure practical FailsafeGeneration layers are
specified above ThricifiedGeneration calls where agents need context
preparation, large input handling, large output handling, and repairable
typed-output generation.

Thricification remains the lowest-level inference call chain. It resolves final
prompt registry composition, interpolation, and typed output. Failsafe chains
may orchestrate setup and repair around those calls, but must delegate final
reason, judge-reasoning, and typed response production to ThricifiedGeneration
when used inside Reading pipeline agents.

## Candidate V38 workstreams

- Audit PTRR agent step execution so phase, agent, step, tool, Failsafe, and
  ThricifiedGeneration responsibilities are named without overlap.
- Specify prompt registry composition from phase prompts through agent prompts,
  step prompts, substep prompts, and final generation prompts.
- Clarify how Bitcoin, GitHub, compute, storage, and build/process boundaries
  are represented in long-running inference and pipeline telemetry.
- Confirm that source-safe telemetry exposes prompt templates, interpolated
  prompts, raw provider responses, parsed typed results, repair attempts, and
  failed-output evidence only at their permitted disclosure tier.

## Non-goals during V38 opening

- No new production route, API version, source package name, or UI label should
  carry V38 in source code during the notes-only opening.
- No Bitcoin, GitHub, compute, storage, or build/process runtime boundary may
  be weakened while the inference execution stack is being clarified.
- No V38 gate may begin until Gate 1 creates the full draft family and updates
  the roadmap from this notes-only posture.
