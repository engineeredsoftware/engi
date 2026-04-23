import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode InitializeLSP Refine purpose for measurement evidence quality"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "refinement_focus", "test": "Focuses on optimization?", "score": 0.94 },
 *   { "name": "quality_improvement", "test": "Improves LSP setup?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_INITIALIZELSP_REFINE_PURPOSE: PromptPart = 
  'Refine LSP measurement configuration for stronger evidence completeness, stable replay, and bounded performance' as PromptPart;
