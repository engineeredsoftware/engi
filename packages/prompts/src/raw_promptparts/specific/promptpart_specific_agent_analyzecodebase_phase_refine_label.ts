import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Phase header for AnalyzeCodebase REFINE step"
 * current_version: "GA1.70.0"
 * versions: []
 * benchmarks: [
 *   { "name": "phase_alignment", "test": "Does it label the REFINE phase explicitly? Rate 0-1", "score": 0.95 },
 *   { "name": "improvement_focus", "test": "Does it state the refinement enhances analysis quality? Rate 0-1", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ANALYZECODEBASE_PHASE_REFINE_LABEL: PromptPart =
  'REFINE: Enhance Analysis' as PromptPart;
