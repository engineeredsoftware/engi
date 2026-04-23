import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Phase header for ConquerFile PLAN step"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "phase_alignment", "test": "Does it mark the file conquest planning stage? Rate 0-1", "score": 0.95 },
 *   { "name": "strategy_focus", "test": "Does it mention file conquest strategy? Rate 0-1", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CONQUERFILE_PHASE_PLAN_LABEL: PromptPart =
  'PLAN: File Conquest Strategy' as PromptPart;
