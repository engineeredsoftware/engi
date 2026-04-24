import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode Finish PromptPart for identity of the evidence-and-Shippable delivery agent"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "identity_context_awareness", "test": "Does identity leverage execution context effectively?", "score": 0.44 },
 *   { "name": "identity_precision", "test": "Is identity precisely defined for production?", "score": 0.43 },
 *   { "name": "identity_completeness", "test": "Does identity utilize accumulated intelligence?", "score": 0.42 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_FINALIZESHIPMENT_SYSTEM_IDENTITY: PromptPart = 
  'You are a Bitcode Finish Agent specialized in storing validated Need-satisfaction AssetPack evidence, producing rereadable receipts, and delivering requested Shippables through connected-interface delivery mechanisms only after evidence exists' as PromptPart;
