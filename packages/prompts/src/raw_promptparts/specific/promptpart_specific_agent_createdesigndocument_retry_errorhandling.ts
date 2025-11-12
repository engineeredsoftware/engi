import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define retry errorhandling for Create Design Document agent with execution state awareness"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "retry_context_utilization", "test": "Does retry errorhandling maximize context value?", "score": 0.35 },
 *   { "name": "retry_state_preservation", "test": "Does retry errorhandling maintain execution continuity?", "score": 0.34 },
 *   { "name": "retry_intelligence_accumulation", "test": "Does retry errorhandling build on accumulated wisdom?", "score": 0.33 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CREATEDESIGNDOCUMENT_RETRY_ERRORHANDLING: PromptPart = 
  'Handle creation failures maintaining context: recover specifications from comprehension cache, resolve ambiguities using analysis history, reconstruct criteria from validation patterns, preserve requirement links, maintain context continuity, leverage accumulated design intelligence' as PromptPart;