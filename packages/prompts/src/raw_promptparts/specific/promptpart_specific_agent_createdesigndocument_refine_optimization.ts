import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define refine optimization for Create Design Document agent with execution state awareness"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "refine_context_utilization", "test": "Does refine optimization maximize context value?", "score": 0.38 },
 *   { "name": "refine_state_preservation", "test": "Does refine optimization maintain execution continuity?", "score": 0.37 },
 *   { "name": "refine_intelligence_accumulation", "test": "Does refine optimization build on accumulated wisdom?", "score": 0.36 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CREATEDESIGNDOCUMENT_REFINE_OPTIMIZATION: PromptPart = 
  'Refine issue leveraging accumulated insights: enhance clarity using comprehension feedback, strengthen criteria with validation examples, improve structure based on team patterns, optimize readability from collaboration metrics, adjust scope using feasibility data, enrich context with discovery findings' as PromptPart;