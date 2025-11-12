import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Phase header for ComprehendTask RETRY step"
 * current_version: "GA1.70.0"
 * versions: []
 * benchmarks: [
 *   { "name": "phase_alignment", "test": "Does it label the RETRY recovery loop? Rate 0-1", "score": 0.95 },
 *   { "name": "recovery_focus", "test": "Does it highlight recovering understanding? Rate 0-1", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_COMPREHENDTASK_PHASE_RETRY_LABEL: PromptPart =
  'RETRY: Recover Understanding' as PromptPart;
