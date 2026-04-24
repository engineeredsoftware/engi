import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define try execution for Create Code Change agent with execution state awareness"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "try_context_utilization", "test": "Does try execution maximize context value?", "score": 0.39 },
 *   { "name": "try_state_preservation", "test": "Does try execution maintain execution continuity?", "score": 0.38 },
 *   { "name": "try_intelligence_accumulation", "test": "Does try execution build on accumulated wisdom?", "score": 0.37 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CREATECODECHANGE_TRY_DIRECTIVES: PromptPart = 
  'Execute PR creation using full context: construct commit from file operation history, generate title from requirement comprehension, write description synthesizing all phases, extract highlights from validation success, document risks from assessment results, create review checklist from quality metrics, establish merge criteria from readiness gates' as PromptPart;