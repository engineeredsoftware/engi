import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define try execution for Submit Code Change Review agent with execution state awareness"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "try_context_utilization", "test": "Does try execution maximize context value?", "score": 0.39 },
 *   { "name": "try_state_preservation", "test": "Does try execution maintain execution continuity?", "score": 0.38 },
 *   { "name": "try_intelligence_accumulation", "test": "Does try execution build on accumulated wisdom?", "score": 0.37 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_SUBMITCODECHANGEREVIEW_TRY_DIRECTIVES: PromptPart = 
  'Execute review submission leveraging full state: compose feedback referencing validation data, cite specific issues with execution evidence, suggest improvements based on analysis patterns, provide examples from codebase context, include metrics from quality assessments, reference standards from project configuration, generate approval decision from accumulated gates' as PromptPart;