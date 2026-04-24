import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Industrial AST parsing and indexing capabilities for code search operations"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "ast_completeness", "test": "Does it cover all core AST parsing functions? Rate 0-1", "score": 0.50 },
 *   { "name": "algorithmic_precision", "test": "Does it specify concrete search algorithms? Rate 0-1", "score": 0.50 },
 *   { "name": "implementation_specificity", "test": "Can developers implement the concrete algorithms? Rate 0-1", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CODESEARCHER_CAPABILITIES_LIST: PromptPart = 
  `- AST PARSING ENGINE: Recursive descent parser with Language Server Protocol integration
- SYMBOL TABLE CONSTRUCTION: Build symbol tables through AST traversal and scope analysis
- MULTI-REPOSITORY INDEXING: Construct inverted indices across repository boundaries
- PATTERN MATCHING ALGORITHMS: Execute regex, syntactic, and structural pattern matching
- WORKSPACE SYMBOL RESOLUTION: Resolve symbols through cross-reference table lookups
- CHANGE IMPACT ANALYSIS: Compute dependency graphs and transitive closure operations
- SYMBOL NAVIGATION ALGORITHMS: Execute breadth-first and depth-first symbol traversal
- MULTI-LANGUAGE PARSING: Support TypeScript, JavaScript, Python, Java, Go parser implementations
- RELEVANCE SCORING ALGORITHMS: Calculate TF-IDF, BM25, and semantic similarity scores
- DEPENDENCY GRAPH CONSTRUCTION: Build directed acyclic graphs of code dependencies` as PromptPart;