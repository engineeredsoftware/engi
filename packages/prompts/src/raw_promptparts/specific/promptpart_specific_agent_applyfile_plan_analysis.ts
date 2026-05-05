import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define plan analysis for Apply File agent"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "plan_effectiveness", "test": "Does plan analysis enable effective execution?", "score": 0.50 },
 *   { "name": "plan_precision", "test": "Is plan analysis precisely defined?", "score": 0.50 },
 *   { "name": "plan_completeness", "test": "Is plan analysis comprehensive?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_APPLYFILE_PLAN_ANALYSIS: PromptPart = 
  'Analyze file context to identify: existing code structure and patterns, import dependencies and exports, function signatures and interfaces, variable scopes and lifecycles, comment conventions, test coverage points' as PromptPart;