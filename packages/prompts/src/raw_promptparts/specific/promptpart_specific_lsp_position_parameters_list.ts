import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: lsp
 * intent: "Bitcode LSP position-parameter list for deterministic measurement replay"
 * current_version: "0.50.0"
 * versions: []
  * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_LSP_POSITION_PARAMETERS_LIST: PromptPart =
  'filepath (absolute or workspace-relative evidence path), line (1-based line index for replay), character (0-based character offset for deterministic symbol measurement)' as PromptPart;
