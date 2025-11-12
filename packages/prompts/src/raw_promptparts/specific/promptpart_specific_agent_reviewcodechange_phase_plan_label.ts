import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Phase header for ReviewCodeChange PLAN step"
 * current_version: "GA1.70.0"
 * versions: []
 * benchmarks: [
 *   { "name": "phase_alignment", "test": "Does it clearly denote review planning stage? Rate 0-1", "score": 0.95 },
 *   { "name": "strategy_focus", "test": "Does it emphasize review strategy creation? Rate 0-1", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_REVIEWCODECHANGE_PHASE_PLAN_LABEL: PromptPart =
  'PLAN: Review Strategy' as PromptPart;
