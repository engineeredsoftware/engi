import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: lsp
 * intent: "LSP output: line/character positions"
 * current_version: "GA1.50.0"
 * versions: []
  * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_LSP_OUTPUT_LINE_CHAR_POSITIONS: PromptPart =
  'line and character positions' as PromptPart;
