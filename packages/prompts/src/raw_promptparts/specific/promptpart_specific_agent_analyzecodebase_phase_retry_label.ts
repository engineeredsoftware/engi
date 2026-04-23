import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Phase header for AnalyzeCodebase RETRY step"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "phase_alignment", "test": "Does it label the RETRY step clearly? Rate 0-1", "score": 0.95 },
 *   { "name": "recovery_focus", "test": "Does it communicate recovery of analysis? Rate 0-1", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ANALYZECODEBASE_PHASE_RETRY_LABEL: PromptPart =
  'RETRY: Recover Analysis' as PromptPart;
