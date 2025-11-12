import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Phase header for ComprehendTask REFINE step"
 * current_version: "GA1.70.0"
 * versions: []
 * benchmarks: [
 *   { "name": "phase_alignment", "test": "Does it label the REFINE iteration? Rate 0-1", "score": 0.95 },
 *   { "name": "understanding_depth", "test": "Does it highlight enhancing understanding? Rate 0-1", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_COMPREHENDTASK_PHASE_REFINE_LABEL: PromptPart =
  'REFINE: Enhance Understanding' as PromptPart;
