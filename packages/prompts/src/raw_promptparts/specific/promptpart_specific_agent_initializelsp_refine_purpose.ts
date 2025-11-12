import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Refine step purpose for LSP initialization"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "refinement_focus", "test": "Focuses on optimization?", "score": 0.94 },
 *   { "name": "quality_improvement", "test": "Improves LSP setup?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_INITIALIZELSP_REFINE_PURPOSE: PromptPart = 
  'Optimize LSP configuration with advanced features and performance tuning' as PromptPart;