import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Phase header for DivideCodeChange PLAN step"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "phase_alignment", "test": "Does it clearly highlight the division planning stage? Rate 0-1", "score": 0.95 },
 *   { "name": "strategy_focus", "test": "Does it mention dividing code change strategy? Rate 0-1", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DIVIDECODECHANGE_PHASE_PLAN_LABEL: PromptPart =
  'PLAN: Divide Code Change Strategy' as PromptPart;
