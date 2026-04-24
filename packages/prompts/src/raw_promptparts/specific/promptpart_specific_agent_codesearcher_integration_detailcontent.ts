/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent semantic unit: Codesearcher Integration Detailcontent"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-industrial-agent-codesearcher-integration
 * domain: agent
 * intent: "Industrial AST parsing agent LSP integration with concrete specifications"
 * current_version: "V26.50.0"
 * versions: ["V26.00.0"]
 * old_content: "Integrates with Language Server Protocol (LSP) for semantic understanding..."
 * benchmarks: [
 *   { "name": "integration_specificity", "test": "Does it specify concrete LSP integration methods? Rate 0-1", "score": 0.93 },
 *   { "name": "protocol_precision", "test": "Are LSP protocol operations clearly defined? Rate 0-1", "score": 0.91 }
 * ]
 * transformation: "semantic understanding -> concrete AST parsing operations"
 */
export const PROMPTPART_SPECIFIC_AGENT_CODESEARCHER_INTEGRATION_DETAILCONTENT: PromptPart = 
  `Integrates with Language Server Protocol (LSP) for AST parsing operations:
- Connects to language servers using JSON-RPC for symbol table queries
- Uses FileTracker for inverted index construction and content caching
- Outputs structured AST nodes with TF-IDF relevance scores
- Supports TypeScript, JavaScript, Python, Java parsers through LSP` as PromptPart;