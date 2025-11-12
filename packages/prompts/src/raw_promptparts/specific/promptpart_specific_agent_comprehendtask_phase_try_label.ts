import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Phase header for ComprehendTask TRY step"
 * current_version: "GA1.70.0"
 * versions: []
 * benchmarks: [
 *   { "name": "phase_alignment", "test": "Does it label the TRY execution step? Rate 0-1", "score": 0.95 },
 *   { "name": "execution_focus", "test": "Does it emphasize executing task comprehension? Rate 0-1", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_COMPREHENDTASK_PHASE_TRY_LABEL: PromptPart =
  'TRY: Execute Task Comprehension' as PromptPart;
