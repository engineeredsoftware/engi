import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: lsp
 * intent: "Features list for LSP context awareness"
 * current_version: "V26.50.0"
 * versions: []
  * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_CONTEXT_AWARENESS_FEATURES: PromptPart =
  'project architecture, type hierarchies, dependency graphs, and code patterns' as PromptPart;
