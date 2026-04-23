import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Phase header for DivideCodeChange REFINE step"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "phase_alignment", "test": "Does it clearly mark refinement of division? Rate 0-1", "score": 0.95 },
 *   { "name": "optimization_focus", "test": "Does it emphasize optimizing division strategy? Rate 0-1", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DIVIDECODECHANGE_PHASE_REFINE_LABEL: PromptPart =
  'REFINE: Optimize Division Strategy' as PromptPart;
