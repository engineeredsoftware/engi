import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define refine assessment for Create Design Document Review agent"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "refine_effectiveness", "test": "Does refine assessment enable effective execution?", "score": 0.33 },
 *   { "name": "refine_precision", "test": "Is refine assessment precisely defined?", "score": 0.32 },
 *   { "name": "refine_completeness", "test": "Is refine assessment comprehensive?", "score": 0.31 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CREATEDESIGNDOCUMENTREVIEW_REFINE_ASSESSMENT: PromptPart = 
  'Assess comment quality by evaluating: feedback constructiveness, suggestion actionability, question clarity, tone appropriateness, value addition metrics, collaboration facilitation scores' as PromptPart;