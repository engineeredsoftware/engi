import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define capabilities of LSP initialization agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "lsp_coverage", "test": "Covers all LSP features?", "score": 0.94 },
 *   { "name": "technical_accuracy", "test": "Accurate LSP terminology?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_INITIALIZELSP_CAPABILITIES_LIST: PromptPart = 
  'Language server initialization with workspace configuration, semantic token registration, code intelligence setup, symbol indexing, diagnostic configuration, multi-language support detection' as PromptPart;