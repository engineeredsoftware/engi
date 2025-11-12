import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Phase header for DivideCodeChange TRY step"
 * current_version: "GA1.70.0"
 * versions: []
 * benchmarks: [
 *   { "name": "phase_alignment", "test": "Does it clearly indicate execution of division? Rate 0-1", "score": 0.95 },
 *   { "name": "execution_focus", "test": "Does it describe executing code change division? Rate 0-1", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DIVIDECODECHANGE_PHASE_TRY_LABEL: PromptPart =
  'TRY: Execute Code Change Division' as PromptPart;
