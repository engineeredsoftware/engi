import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define refine assessment for Validate Code Change Review agent"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "refine_effectiveness", "test": "Does refine assessment ensure production quality?", "score": 0.35 },
 *   { "name": "refine_reliability", "test": "Is refine assessment consistently reliable?", "score": 0.34 },
 *   { "name": "refine_completeness", "test": "Does refine assessment cover edge cases?", "score": 0.33 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_VALIDATECODECHANGEREVIEW_REFINE_ASSESSMENT: PromptPart = 
  'Assess validation quality by evaluating: coverage accuracy rates, quality metric reliability, compliance detection precision, depth measurement validity, tone classification accuracy, overall validation effectiveness' as PromptPart;