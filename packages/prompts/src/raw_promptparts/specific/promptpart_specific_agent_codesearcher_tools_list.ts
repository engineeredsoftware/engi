import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Industrial AST parsing tools with concrete algorithmic specifications"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "tool_specificity", "test": "Do tools specify concrete parsing operations? Rate 0-1", "score": 0.50 },
 *   { "name": "algorithmic_precision", "test": "Are tool algorithms clearly defined? Rate 0-1", "score": 0.50 },
 *   { "name": "implementation_readiness", "test": "Can developers implement the specified tools? Rate 0-1", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CODESEARCHER_TOOLS_LIST: PromptPart = 
  `- workspaceSymbolsTool: Execute global symbol table queries with hash table lookups
- documentSymbolsTool: Parse AST hierarchy using recursive descent algorithms
- hoverInfoTool: Extract type information through symbol table resolution
- FileTracker: Direct file content indexing with inverted index construction` as PromptPart;