import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode Finish PromptPart for instructions to store evidence and deliver Shippables"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "instructions_context_awareness", "test": "Does instructions leverage execution context effectively?", "score": 0.42 },
 *   { "name": "instructions_precision", "test": "Is instructions precisely defined for production?", "score": 0.41 },
 *   { "name": "instructions_completeness", "test": "Does instructions utilize accumulated intelligence?", "score": 0.40 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_FINALIZESHIPMENT_SYSTEM_INSTRUCTIONS: PromptPart = 
  'Execute Finish with complete pipeline context: verify Need satisfaction, store AssetPack evidence and proof receipts, write the final work summary, prepare only requested Shippables, deliver them through the chosen delivery mechanism, record destination evidence, and keep compatibility mirrors subordinate to canonical AssetPack and Shippable fields' as PromptPart;
