import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode InitializeLSP Plan purpose for measurement setup"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "clarity", "test": "Clear planning purpose?", "score": 0.95 },
 *   { "name": "specificity", "test": "Specific to LSP planning?", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_INITIALIZELSP_PLAN_PURPOSE: PromptPart = 
  'Analyze the workspace to identify language servers, project types, and the initialization sequence required for Bitcode measurement evidence' as PromptPart;
