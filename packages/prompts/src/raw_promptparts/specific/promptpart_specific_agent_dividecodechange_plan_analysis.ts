import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define plan analysis for Divide Code Change agent"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "plan_effectiveness", "test": "Does plan analysis enable effective execution?", "score": 0.50 },
 *   { "name": "plan_precision", "test": "Is plan analysis precisely defined?", "score": 0.50 },
 *   { "name": "plan_completeness", "test": "Is plan analysis comprehensive?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DIVIDECODECHANGE_PLAN_ANALYSIS: PromptPart = 
  'Analyze codebase to identify: module boundaries and interfaces, existing file structures and patterns, dependency graphs and coupling points, potential conflict zones, reusable components, architectural impact zones' as PromptPart;