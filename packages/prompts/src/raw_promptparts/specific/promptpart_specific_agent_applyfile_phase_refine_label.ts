import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Phase header for ApplyFile REFINE step"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "phase_alignment", "test": "Does it note refining the file implementation? Rate 0-1", "score": 0.95 },
 *   { "name": "optimization_focus", "test": "Does it emphasize optimizing the file implementation? Rate 0-1", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_APPLYFILE_PHASE_REFINE_LABEL: PromptPart =
  'REFINE: Optimize File Implementation' as PromptPart;
