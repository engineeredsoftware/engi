# Conversations

Website Conversations are a source-safe drafting and coordination surface for
Bitcode users. They help a user shape intent, attach context, review
source-safe summaries, and hand work to the Terminal. They do not replace the
Terminal, ledger, BTD ownership, wallet authority, Exchange, or Reading
pipeline law.

## Route-Local History

Conversation history is route-local product state. It may preserve
conversation ids, message ids, branch roots, retry roots, selected source refs,
and proof roots so a user can restore or branch work. It is not global ledger
truth and it cannot settle value-bearing work.

## Streaming And Proof Roots

Streaming rows expose collapsed status, event ids, event families, sequence
numbers, redaction posture, and proof roots. `ConversationTelemetryProofHooks`
bind those rows to source-safe dashboard panels, runbook ids, correlation ids,
and telemetry roots. Expanded metadata is source-safe: raw protected prompts,
raw provider responses, protected source payloads, provider tokens, wallet
private material, settlement private payloads, and unpaid AssetPack source are
never valid conversation telemetry payloads.

## Telemetry Proof Hooks

`ConversationTelemetryProofHooks` cover session, message, stream, tool, source
selector, Terminal handoff, retry, error, and completion event families. Each
hook may expose only source-safe ids, counts, state enums, proof roots,
dashboard panel ids, runbook ids, and redacted error classes. Operators use
the dashboard and runbook ids to debug health without seeing protected source,
unpaid AssetPack source, wallet private material, provider tokens, or private
settlement payloads.

## Tools And Source Context

Conversation tool events may show tool names, policy state, source-safe
argument summaries, exit state, and proof roots. Tool arguments and outputs
that contain protected source or credentials must be redacted before telemetry,
storage, export, or incident repair.

## Source Selection

Source selectors may preview repositories, branches, commits, deposits, BTD
ranges, AssetPack previews, documents, and prior conversations. Selectors carry
policy state, rights posture, and source-safe reference summaries only. They do
not grant source visibility or BTD rights.

## Terminal Handoff

Terminal handoff turns conversation intent into source-safe Terminal context:
workflow id, selected conversation id, repository anchor, source selector
summary, policy state, and handoff proof root. The Terminal remains the
transaction cockpit for Depositing, Reading, Finding Fits, Exchange,
settlement, delivery, wallet, and BTD ownership work.

## Privacy And Exports

Conversation persistence separates public, user-visible,
organization-visible, buyer-visible, reviewer-visible, and operator-only
metadata. Exports include only source-safe fields visible to the requester.
Deletes preserve tombstone proof. Retention never escalates visibility.

## Retry And Recovery

Retries and recovery use route-local history roots, retry roots, redacted
error classes, and source-safe status. Retry loops must fail closed before
repeating unsafe context. Incident repair operates on proof roots, redaction
verdicts, dashboard ids, and runbook ids.
