import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define refine assessment for Comprehend Attachments agent"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "refine_effectiveness", "test": "Is refine assessment effective?", "score": 0.31 },
 *   { "name": "refine_clarity", "test": "Is refine assessment clear?", "score": 0.30 },
 *   { "name": "refine_completeness", "test": "Is refine assessment complete?", "score": 0.29 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_COMPREHENDATTACHMENTS_REFINE_ASSESSMENT: PromptPart = 
  'Assess comprehension quality by evaluating: extraction completeness, accuracy metrics, relevance scores, integration effectiveness, coverage ratios, context preservation' as PromptPart;