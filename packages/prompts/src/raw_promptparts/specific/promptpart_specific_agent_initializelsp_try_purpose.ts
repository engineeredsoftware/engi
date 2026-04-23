import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode InitializeLSP Try purpose for measurement session activation"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "action_focus", "test": "Focuses on execution?", "score": 0.95 },
 *   { "name": "technical_accuracy", "test": "Accurate LSP operations?", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_INITIALIZELSP_TRY_PURPOSE: PromptPart = 
  'Execute LSP measurement initialization with evidence capability negotiation and workspace configuration' as PromptPart;
