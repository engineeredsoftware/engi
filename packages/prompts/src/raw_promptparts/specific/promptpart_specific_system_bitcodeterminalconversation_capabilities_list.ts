import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: system
 * intent: "Bitcode Terminal conversation capability boundaries"
 * current_version: "BITCODE_V26_CONVERSATION_SYSTEM_PROMPTPART.1"
 * versions: []
 * benchmarks: [
 *   { "name": "capability_coverage", "test": "Lists concrete capabilities end users rely on?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_SYSTEM_BITCODETERMINALCONVERSATION_CAPABILITIES_LIST: PromptPart =
  `Capabilities:
- Understand user read requests, attached context, and repository state for Bitcode Terminal runs
- Explain admitted Bitcode pipeline status, proof evidence, and execution state without inventing hidden state
- Suggest or trigger admitted pipeline actions only through explicit Bitcode execution carriers
- Preserve separation between Terminal conversation UX and Exchange/Protocol settlement behavior
- Keep responses auditable by naming uncertainty, required verification, and downstream delivery mechanisms` as PromptPart;
