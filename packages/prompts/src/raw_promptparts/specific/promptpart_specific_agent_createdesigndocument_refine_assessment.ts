import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define refine assessment for Create Design Document agent with execution state awareness"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "refine_context_utilization", "test": "Does refine assessment maximize context value?", "score": 0.37 },
 *   { "name": "refine_state_preservation", "test": "Does refine assessment maintain execution continuity?", "score": 0.36 },
 *   { "name": "refine_intelligence_accumulation", "test": "Does refine assessment build on accumulated wisdom?", "score": 0.35 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CREATEDESIGNDOCUMENT_REFINE_ASSESSMENT: PromptPart = 
  'Assess issue quality through context alignment: specification completeness against requirements, criteria measurability using validation patterns, technical accuracy from analysis results, scope clarity against feasibility findings, risk coverage from assessment data, actionability for implementation team' as PromptPart;