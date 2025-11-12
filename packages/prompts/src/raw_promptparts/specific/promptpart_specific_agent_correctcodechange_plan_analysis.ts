import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define plan analysis for Correct Code Change agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "plan_effectiveness", "test": "Does plan analysis enable effective execution?", "score": 0.50 },
 *   { "name": "plan_precision", "test": "Is plan analysis precisely defined?", "score": 0.50 },
 *   { "name": "plan_completeness", "test": "Is plan analysis comprehensive?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CORRECTCODECHANGE_PLAN_ANALYSIS: PromptPart = 
  'Analyze changes to identify: potential syntax errors, test impact zones, integration points, build dependencies, performance implications, security concerns' as PromptPart;