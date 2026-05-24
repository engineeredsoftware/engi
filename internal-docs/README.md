# Bitcode Internal Notes

Status: non-canonical internal documentation. The active canonical system specification pointer is `BITCODE_SPEC.txt` -> `V34`; V35 is the active draft-target family for telemetry and documentation depth. These notes are useful only insofar as they help draft, implement, or verify the active SPEC family or the explicitly opened draft-target family.

## Rules

- Do not treat this directory as canonical truth.
- Promote requirements into the active SPEC/PARITY/proof family, or into the explicitly opened draft-target SPEC family, before relying on them as requirements.
- Keep internal docs registered through `DocumentationSurfaceCatalog` when they become gate, operator, route, package, or proof dependencies.
- Keep note filenames and content Bitcode-only.
- Prefer Read, fit, AssetPack, shares, Finish, delivery mechanism, Terminal, Exchange, Protocol, proof, and settlement vocabulary.
- Treat compatibility source names as implementation corridors, not product vocabulary.
- Remove or reform non-Bitcode product vocabulary and removed operator-control language.

## Core Notes

- [BITCODE_AGENTIC_EXECUTION.md](./BITCODE_AGENTIC_EXECUTION.md): phase, registry, prompt, tool, computer-use, and Finish execution notes.
- [ASSETPACK_EXECUTION.md](./ASSETPACK_EXECUTION.md): AssetPack and connected-interface written-asset execution notes.
- [BITCODE_TERMINAL_OPERATOR_EXPERIENCE.md](./BITCODE_TERMINAL_OPERATOR_EXPERIENCE.md): operator journey, Read review, fit review, AssetPack, and settlement UX notes.
- [BITCODE_EXCHANGE_DATABASE.md](./BITCODE_EXCHANGE_DATABASE.md): Exchange persistence and schema reform notes.
- [BITCODE_API.md](./BITCODE_API.md): server-owned API admission and connected-interface notes.
- [BITCODE_EXECUTIONS.md](./BITCODE_EXECUTIONS.md): execution read/write and Terminal history notes.
- [BITCODE_CONVERSATIONS.md](./BITCODE_CONVERSATIONS.md): conversation ingress and execution-continuation notes.
- [BITCODE_PROMPT_SYSTEM.md](./BITCODE_PROMPT_SYSTEM.md): Prompt, PromptPart, registry, doc-comment, and Read-comprehension notes.
- [BITCODE_PROMPT_TRACE.md](./BITCODE_PROMPT_TRACE.md): prompt rendering and traceability notes.

## Supporting Notes

- [BITCODE_SOURCE_EVIDENCE_DOCUMENTS.md](./BITCODE_SOURCE_EVIDENCE_DOCUMENTS.md): source evidence and AI-document notes.
- [BITCODE_CONNECTED_SERVICES.md](./BITCODE_CONNECTED_SERVICES.md): provider, MCP, and delivery-mechanism notes.
- [BITCODE_FRONTEND_ARCHITECTURE.md](./BITCODE_FRONTEND_ARCHITECTURE.md): Terminal, Exchange, conversations, auxillaries, and compatibility interface notes.
- [BITCODE_INTERFACE_STYLE.md](./BITCODE_INTERFACE_STYLE.md): interface style and component semantics notes.
- [BITCODE_VERIFICATION.md](./BITCODE_VERIFICATION.md): tests, proofs, and verification notes.
- [BITCODE_LLM_REGISTRY.md](./BITCODE_LLM_REGISTRY.md): LLM provider/model registry notes.
- [BITCODE_EXECUTION_WORK_SUMMARIES.md](./BITCODE_EXECUTION_WORK_SUMMARIES.md): execution and Finish summary notes.
- [BITCODE_PROTOCOL_THESIS.md](./BITCODE_PROTOCOL_THESIS.md): protocol/product thesis notes.
- [BITCODE_ARCHITECTURE_PATTERNS.md](./BITCODE_ARCHITECTURE_PATTERNS.md): primitives, packages, interfaces, specs, and proofs notes.
- [BITCODE_AUXILLARIES_READINESS.md](./BITCODE_AUXILLARIES_READINESS.md): identity, wallet, provider, and settlement readiness notes.
- [BITCODE_CHATGPT_APP_INTERFACE.md](./BITCODE_CHATGPT_APP_INTERFACE.md): ChatGPT App connected-interface notes.
- [BITCODE_V26_GATE_NOTES.md](./BITCODE_V26_GATE_NOTES.md): V26 gate posture notes.
- [DOC-CODING.md](./DOC-CODING.md): doc-code prompt support notes.
- [DOC-COMMENTS-NEXT.md](./DOC-COMMENTS-NEXT.md): doc-comment prompt injection notes.
- [INTEGRATIONS.md](./INTEGRATIONS.md): provider and connected-interface notes.
- [PERFORMANCE.md](./PERFORMANCE.md): runtime and frontend performance notes.
- [SECURITY.md](./SECURITY.md): security and hardening notes.
- [TERMINOLOGY.md](./TERMINOLOGY.md): terminology notes.

## Promotion Workflow

1. Use internal notes to identify a subsystem requirement or implementation gap.
2. Verify the current source owner.
3. Edit source or tests when the requirement is already accepted by active canon.
4. Promote the requirement into the active or draft-target SPEC/proof family when it must become canonical.
5. Regenerate the matching proof artifacts.
6. Re-scan this directory for non-Bitcode residue before claiming gate closure progress.

## V35 telemetry documentation integration

Internal docs are registered through `TelemetryDocumentationInterfaceIntegration`
when they explain how active surfaces display telemetry and repair posture.
The source-safe generated artifact
`.bitcode/v35-telemetry-documentation-interface-integration.json` binds internal
docs to event ids, proof roots, docs links, runbook links, and redaction
posture so operator notes, route docs, and package READMEs can be audited
together.

Internal docs may name source-safe roots, state labels, summary counts,
correlation ids, generated artifact paths, and repair commands. They must not
record secret values, provider tokens, wallet private material, raw protected
prompts, protected source payloads, raw protected model responses with source,
or unpaid AssetPack source.

`LocalStagingTelemetryDocumentationRehearsal` extends this integration into
the operator drill layer. The source-safe generated artifact
`.bitcode/v35-local-staging-telemetry-documentation-rehearsal.json` records
local/staging-testnet documentation discovery, telemetry event emission,
dashboard/runbook lookup, docs QA, incident drill, source-safe proof-root
review, redacted screenshot/log roots, and visible blocked value-bearing
mainnet posture without storing secrets or source-bearing payloads.
