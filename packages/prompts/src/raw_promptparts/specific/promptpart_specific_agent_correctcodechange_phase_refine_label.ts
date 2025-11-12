import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Phase header for CorrectCodeChange REFINE step"
 * current_version: "GA1.70.0"
 * versions: []
 * benchmarks: [
 *   { "name": "phase_alignment", "test": "Does it highlight the refinement iteration? Rate 0-1", "score": 0.95 },
 *   { "name": "optimization_focus", "test": "Does it underscore optimizing corrections? Rate 0-1", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CORRECTCODECHANGE_PHASE_REFINE_LABEL: PromptPart =
  'REFINE: Optimize Corrections' as PromptPart;
