import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Phase header for ApplyFile PLAN step"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "phase_alignment", "test": "Does it mark the file application planning stage? Rate 0-1", "score": 0.95 },
 *   { "name": "strategy_focus", "test": "Does it mention file application strategy? Rate 0-1", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_APPLYFILE_PHASE_PLAN_LABEL: PromptPart =
  'PLAN: File Application Strategy' as PromptPart;
