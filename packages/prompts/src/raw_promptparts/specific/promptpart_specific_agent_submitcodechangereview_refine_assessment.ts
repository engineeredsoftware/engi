import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define refine assessment for Submit Code Change Review agent with execution state awareness"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "refine_context_utilization", "test": "Does refine assessment maximize context value?", "score": 0.37 },
 *   { "name": "refine_state_preservation", "test": "Does refine assessment maintain execution continuity?", "score": 0.36 },
 *   { "name": "refine_intelligence_accumulation", "test": "Does refine assessment build on accumulated wisdom?", "score": 0.35 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_SUBMITCODECHANGEREVIEW_REFINE_ASSESSMENT: PromptPart = 
  'Assess review quality against context: feedback alignment with discovered issues, suggestion relevance to validation findings, actionability against implementation feasibility, tone appropriateness for collaboration context, completeness against analysis coverage, value addition beyond automated findings' as PromptPart;