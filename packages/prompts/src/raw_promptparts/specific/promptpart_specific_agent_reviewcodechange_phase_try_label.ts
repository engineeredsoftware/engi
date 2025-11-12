import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Phase header for ReviewCodeChange TRY step"
 * current_version: "GA1.70.0"
 * versions: []
 * benchmarks: [
 *   { "name": "phase_alignment", "test": "Does it clearly identify executing the review? Rate 0-1", "score": 0.95 },
 *   { "name": "execution_focus", "test": "Does it mention executing the review explicitly? Rate 0-1", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_REVIEWCODECHANGE_PHASE_TRY_LABEL: PromptPart =
  'TRY: Execute Review' as PromptPart;
