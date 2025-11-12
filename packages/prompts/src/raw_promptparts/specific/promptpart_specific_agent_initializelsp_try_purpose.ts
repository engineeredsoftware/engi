import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Try step purpose for LSP initialization"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "action_focus", "test": "Focuses on execution?", "score": 0.95 },
 *   { "name": "technical_accuracy", "test": "Accurate LSP operations?", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_INITIALIZELSP_TRY_PURPOSE: PromptPart = 
  'Execute LSP initialization with capability negotiation and workspace configuration' as PromptPart;