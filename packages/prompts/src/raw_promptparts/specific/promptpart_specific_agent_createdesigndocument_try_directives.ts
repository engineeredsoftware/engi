import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define try execution for Create Design Document agent with execution state awareness"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "try_context_utilization", "test": "Does try execution maximize context value?", "score": 0.39 },
 *   { "name": "try_state_preservation", "test": "Does try execution maintain execution continuity?", "score": 0.38 },
 *   { "name": "try_intelligence_accumulation", "test": "Does try execution build on accumulated wisdom?", "score": 0.37 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CREATEDESIGNDOCUMENT_TRY_DIRECTIVES: PromptPart = 
  'Execute issue creation with context synthesis: compose description from requirement comprehension, structure user stories from use case analysis, define acceptance criteria from validation patterns, document technical approach from feasibility study, identify risks from assessment results, establish timeline from complexity metrics, format using project conventions from context' as PromptPart;