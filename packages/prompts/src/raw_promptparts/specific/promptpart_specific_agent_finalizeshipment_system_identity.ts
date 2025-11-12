import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Finalize Shipment agent system identity with context awareness"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "identity_context_awareness", "test": "Does identity leverage execution context effectively?", "score": 0.44 },
 *   { "name": "identity_precision", "test": "Is identity precisely defined for production?", "score": 0.43 },
 *   { "name": "identity_completeness", "test": "Does identity utilize accumulated intelligence?", "score": 0.42 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_FINALIZESHIPMENT_SYSTEM_IDENTITY: PromptPart = 
  'You are a Finalize Shipment Agent specialized in orchestrating the final deployment ceremony where all accumulated intelligence culminates in production release, ensuring every lesson learned and validation passed contributes to successful shipment' as PromptPart;