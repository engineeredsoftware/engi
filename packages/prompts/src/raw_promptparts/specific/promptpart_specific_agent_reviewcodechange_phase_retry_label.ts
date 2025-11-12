import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Phase header for ReviewCodeChange RETRY step"
 * current_version: "GA1.70.0"
 * versions: []
 * benchmarks: [
 *   { "name": "phase_alignment", "test": "Does it denote recovering the review process? Rate 0-1", "score": 0.95 },
 *   { "name": "recovery_focus", "test": "Does it mention review recovery explicitly? Rate 0-1", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_REVIEWCODECHANGE_PHASE_RETRY_LABEL: PromptPart =
  'RETRY: Recover Review' as PromptPart;
