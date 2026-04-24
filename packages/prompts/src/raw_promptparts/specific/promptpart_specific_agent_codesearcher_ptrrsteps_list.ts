/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent semantic unit: Codesearcher Ptrrsteps List"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-industrial-agent-codesearcher-ptrr
 * domain: agent
 * intent: "Industrial AST parsing PTRR steps with concrete algorithmic operations"
 * current_version: "V26.50.0"
 * versions: ["V26.00.0"]
 * old_content: "Plan: Analyze repository structure and extract semantic keywords; Try: Execute LSP-powered semantic search across workspace; Refine: Score and rank code snippets by relevance; Retry: Deepen search with additional context if needed"
 * benchmarks: [
 *   { "name": "step_specificity", "test": "Do PTRR steps specify concrete algorithms? Rate 0-1", "score": 0.94 },
 *   { "name": "implementation_clarity", "test": "Can developers implement each step? Rate 0-1", "score": 0.92 }
 * ]
 * transformation: "semantic keywords/search -> concrete AST parsing operations"
 */
export const PROMPTPART_SPECIFIC_AGENT_CODESEARCHER_PTRRSTEPS_LIST: PromptPart = 
  `Plan: Execute repository scanning and lexical token extraction
Try: Perform LSP-powered AST parsing across workspace files
Refine: Calculate TF-IDF scores and rank AST nodes by relevance
Retry: Expand symbol table queries with dependency graph traversal` as PromptPart;