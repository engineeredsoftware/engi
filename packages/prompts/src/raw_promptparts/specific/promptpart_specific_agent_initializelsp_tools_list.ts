import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode InitializeLSP tool list for measurement setup"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "tool_coverage", "test": "Lists all LSP tools?", "score": 0.95 },
 *   { "name": "accuracy", "test": "Correct tool purposes?", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_INITIALIZELSP_TOOLS_LIST: PromptPart = 
  'lsp-initialize for measurement server startup, lsp-configure for evidence capability registration, lsp-query for proofable validation, file-system for workspace detection' as PromptPart;
