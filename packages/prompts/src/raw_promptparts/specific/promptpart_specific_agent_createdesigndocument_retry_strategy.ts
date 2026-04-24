import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode AssetPack implementation PromptPart for design-document written-asset synthesis: retry strategy"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "retry_context_utilization", "test": "Does retry strategy maximize context value?", "score": 0.36 },
 *   { "name": "retry_state_preservation", "test": "Does retry strategy maintain execution continuity?", "score": 0.35 },
 *   { "name": "retry_intelligence_accumulation", "test": "Does retry strategy build on accumulated wisdom?", "score": 0.34 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CREATEDESIGNDOCUMENT_RETRY_STRATEGY: PromptPart = 
  'Recover by rebuilding the design-document written asset from Need comprehension, partial sections, discovery evidence, validation gaps, and proof obligations' as PromptPart;
