import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Phase header for ConquerFile TRY step"
 * current_version: "GA1.70.0"
 * versions: []
 * benchmarks: [
 *   { "name": "phase_alignment", "test": "Does it clearly indicate executing file changes? Rate 0-1", "score": 0.95 },
 *   { "name": "execution_focus", "test": "Does it mention file changes explicitly? Rate 0-1", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CONQUERFILE_PHASE_TRY_LABEL: PromptPart =
  'TRY: Execute File Changes' as PromptPart;
