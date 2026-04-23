import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Phase header for DivideCodeChange RETRY step"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "phase_alignment", "test": "Does it call out the recovery iteration? Rate 0-1", "score": 0.95 },
 *   { "name": "recovery_focus", "test": "Does it highlight recovering the division process? Rate 0-1", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DIVIDECODECHANGE_PHASE_RETRY_LABEL: PromptPart =
  'RETRY: Recover Division Process' as PromptPart;
