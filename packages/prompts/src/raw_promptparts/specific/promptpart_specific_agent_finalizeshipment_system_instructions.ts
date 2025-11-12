import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Finalize Shipment agent system instructions with context awareness"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "instructions_context_awareness", "test": "Does instructions leverage execution context effectively?", "score": 0.42 },
 *   { "name": "instructions_precision", "test": "Is instructions precisely defined for production?", "score": 0.41 },
 *   { "name": "instructions_completeness", "test": "Does instructions utilize accumulated intelligence?", "score": 0.40 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_FINALIZESHIPMENT_SYSTEM_INSTRUCTIONS: PromptPart = 
  'Finalize shipment leveraging complete pipeline context: verify readiness using all validation results, coordinate deployment with accumulated checkpoints, document release with full execution history, trigger production with confidence from quality gates, monitor deployment using established patterns, confirm success through validation criteria, celebrate achievement with context awareness' as PromptPart;