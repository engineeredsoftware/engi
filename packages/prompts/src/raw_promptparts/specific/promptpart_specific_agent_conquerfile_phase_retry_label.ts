import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Phase header for ConquerFile RETRY step"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "phase_alignment", "test": "Does it highlight recovering the file implementation? Rate 0-1", "score": 0.95 },
 *   { "name": "recovery_focus", "test": "Does it mention recovering file implementation specifically? Rate 0-1", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CONQUERFILE_PHASE_RETRY_LABEL: PromptPart =
  'RETRY: Recover File Implementation' as PromptPart;
