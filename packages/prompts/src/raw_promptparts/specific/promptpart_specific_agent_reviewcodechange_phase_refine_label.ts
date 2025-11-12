import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Phase header for ReviewCodeChange REFINE step"
 * current_version: "GA1.70.0"
 * versions: []
 * benchmarks: [
 *   { "name": "phase_alignment", "test": "Does it label the refine cycle for reviews? Rate 0-1", "score": 0.95 },
 *   { "name": "improvement_focus", "test": "Does it emphasize enhancing the review? Rate 0-1", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_REVIEWCODECHANGE_PHASE_REFINE_LABEL: PromptPart =
  'REFINE: Enhance Review' as PromptPart;
