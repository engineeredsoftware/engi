import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define retry errorhandling for Validate Design Document agent"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "retry_effectiveness", "test": "Does retry errorhandling ensure production quality?", "score": 0.33 },
 *   { "name": "retry_reliability", "test": "Is retry errorhandling consistently reliable?", "score": 0.32 },
 *   { "name": "retry_completeness", "test": "Does retry errorhandling cover edge cases?", "score": 0.31 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_VALIDATEDESIGNDOCUMENT_RETRY_ERRORHANDLING: PromptPart = 
  'Handle validation failures through: ambiguity resolution protocols, missing information requests, technical clarification procedures, feasibility negotiation, traceability reconstruction, format correction automation' as PromptPart;