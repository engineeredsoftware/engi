import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Phase header for CorrectCodeChange TRY step"
 * current_version: "GA1.70.0"
 * versions: []
 * benchmarks: [
 *   { "name": "phase_alignment", "test": "Does it plainly mark the execution phase? Rate 0-1", "score": 0.95 },
 *   { "name": "execution_focus", "test": "Does it emphasize executing corrections? Rate 0-1", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CORRECTCODECHANGE_PHASE_TRY_LABEL: PromptPart =
  'TRY: Execute Corrections' as PromptPart;
