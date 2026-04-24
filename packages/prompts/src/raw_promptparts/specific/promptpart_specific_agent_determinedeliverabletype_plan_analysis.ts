import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define PLAN step analysis for Determine Deliverable Type agent"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "analysis_depth", "test": "Does it enable deep analysis?", "score": 0.37 },
 *   { "name": "context_extraction", "test": "Does it extract relevant context?", "score": 0.36 },
 *   { "name": "requirement_identification", "test": "Are requirements identified?", "score": 0.35 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DETERMINEDELIVERABLETYPE_PLAN_ANALYSIS: PromptPart = 
  'Analyze request context to determine: source and origin information, format and structure patterns, embedded type hints and markers, historical request patterns, user intent signals, resource requirements' as PromptPart;