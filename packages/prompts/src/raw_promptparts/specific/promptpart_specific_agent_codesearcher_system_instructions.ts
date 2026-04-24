import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Industrial AST parsing agent system instructions with concrete algorithmic directives"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "algorithmic_clarity", "test": "Are AST parsing instructions clear and actionable? Rate 0-1", "score": 0.50 },
 *   { "name": "implementation_priority", "test": "Do instructions prioritize concrete parsing operations? Rate 0-1", "score": 0.50 },
 *   { "name": "technical_precision", "test": "Are the instructions technically precise and implementable? Rate 0-1", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CODESEARCHER_SYSTEM_INSTRUCTIONS: PromptPart = 
  'Prioritize LSP-based AST parsing over regex matching. Execute symbol table lookups for context extraction. Calculate relevance scores using TF-IDF and cosine similarity, not keyword frequency. Return code snippets with absolute file paths, line numbers, and AST node metadata' as PromptPart;