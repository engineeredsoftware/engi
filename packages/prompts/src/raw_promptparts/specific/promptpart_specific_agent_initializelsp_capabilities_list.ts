import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode InitializeLSP capability list for measurement evidence setup"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "lsp_coverage", "test": "Covers all LSP features?", "score": 0.94 },
 *   { "name": "technical_accuracy", "test": "Accurate LSP terminology?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_INITIALIZELSP_CAPABILITIES_LIST: PromptPart = 
  'Language server initialization with workspace configuration, semantic token registration, measurement capability setup, symbol indexing, diagnostic evidence configuration, and multi-language support detection' as PromptPart;
