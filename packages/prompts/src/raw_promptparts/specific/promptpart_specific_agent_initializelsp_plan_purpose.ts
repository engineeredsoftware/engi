import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Plan step purpose for LSP initialization"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "clarity", "test": "Clear planning purpose?", "score": 0.95 },
 *   { "name": "specificity", "test": "Specific to LSP planning?", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_INITIALIZELSP_PLAN_PURPOSE: PromptPart = 
  'Analyze workspace to identify language servers, detect project types, and plan initialization sequence' as PromptPart;