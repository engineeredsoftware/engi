import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Phase header for CorrectCodeChange PLAN step"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "phase_alignment", "test": "Does it clearly identify the correction planning phase? Rate 0-1", "score": 0.95 },
 *   { "name": "strategy_focus", "test": "Does it emphasize correction strategy design? Rate 0-1", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CORRECTCODECHANGE_PHASE_PLAN_LABEL: PromptPart =
  'PLAN: Correction Strategy' as PromptPart;
