import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Integration pattern: Language Server Protocol"
 * current_version: "GA1.50.0"
 * versions: []
  * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_LSP_INTEGRATION_PATTERN: PromptPart =
  'Integrates with Language Server Protocol for definitions, references, hovers, and symbol queries' as PromptPart;