import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Retry step purpose for LSP initialization"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "recovery_focus", "test": "Focuses on error recovery?", "score": 0.95 },
 *   { "name": "completeness", "test": "Ensures successful init?", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_INITIALIZELSP_RETRY_PURPOSE: PromptPart = 
  'Complete LSP initialization with fallback strategies and error recovery' as PromptPart;