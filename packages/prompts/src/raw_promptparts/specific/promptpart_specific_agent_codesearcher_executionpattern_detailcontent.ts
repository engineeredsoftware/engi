/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent semantic unit: Codesearcher Executionpattern Detailcontent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-industrial-agent-codesearcher-execution
 * domain: agent
 * intent: "Industrial AST parsing execution pattern with concrete algorithmic steps"
 * current_version: "GA1.50.0"
 * versions: ["GA1.00.0"]
 * old_content: "CHUNKED_PROCESSING - Processes code files in semantic chunks using LSP analysis..."
 * benchmarks: [
 *   { "name": "algorithm_specificity", "test": "Does it specify concrete parsing algorithms? Rate 0-1", "score": 0.94 },
 *   { "name": "implementation_clarity", "test": "Can developers implement the execution steps? Rate 0-1", "score": 0.92 }
 * ]
 * transformation: "semantic chunks -> concrete AST processing steps"
 */
export const PROMPTPART_SPECIFIC_AGENT_CODESEARCHER_EXECUTIONPATTERN_DETAILCONTENT: PromptPart = 
  `AST_PARSING_PIPELINE - Processes code files through structured AST parsing operations:
1. Tokenize input query using lexical analysis algorithms
2. Execute workspace symbol table lookups with hash table queries
3. Parse document AST using recursive descent parsing
4. Extract code snippets with TF-IDF relevance scoring
5. Rank results using BM25 algorithm and return structured output` as PromptPart;