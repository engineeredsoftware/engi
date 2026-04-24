/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent semantic unit: Codesearcher Try Execution Instructions"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-industrial-agent-codesearcher-try-execution
 * domain: agent
 * intent: "Industrial AST parsing try step execution with concrete algorithmic instructions"
 * current_version: "V26.50.0"
 * versions: ["V26.00.0"]
 * old_content: "Execute LSP workspace symbol search for each keyword. For each symbol found, retrieve document symbols and hover information. Extract code snippets with surrounding context. Fall back to text-based search if LSP tools fail"
 * benchmarks: [
 *   { "name": "algorithm_precision", "test": "Are AST parsing steps clearly specified? Rate 0-1", "score": 0.94 },
 *   { "name": "fallback_clarity", "test": "Are fallback algorithms well-defined? Rate 0-1", "score": 0.92 }
 * ]
 * transformation: "keyword search -> concrete symbol table queries and AST parsing"
 */
export const PROMPTPART_SPECIFIC_AGENT_CODESEARCHER_TRY_DIRECTIVES_INSTRUCTIONS: PromptPart = 
  'Execute LSP workspace symbol table queries for each token. For each symbol resolved, retrieve AST document nodes and type information. Extract code snippets using AST traversal with context window. Fall back to regex parsing if LSP JSON-RPC fails' as PromptPart;