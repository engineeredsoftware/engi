import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define refine assessment for Correct Code Change agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "refine_effectiveness", "test": "Does refine assessment enable effective execution?", "score": 0.50 },
 *   { "name": "refine_precision", "test": "Is refine assessment precisely defined?", "score": 0.50 },
 *   { "name": "refine_completeness", "test": "Is refine assessment comprehensive?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CORRECTCODECHANGE_REFINE_ASSESSMENT: PromptPart = 
  'Assess correction quality by evaluating: syntax validity rates, test passage percentages, lint compliance scores, build success metrics, performance benchmarks, security scan results' as PromptPart;