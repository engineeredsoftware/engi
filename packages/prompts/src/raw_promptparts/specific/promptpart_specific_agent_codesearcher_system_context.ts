/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent semantic unit: Codesearcher System Context"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-industrial-agent-codesearcher-context
 * domain: agent
 * intent: "Industrial AST parsing agent system context with concrete execution framework"
 * current_version: "GA1.50.0"
 * versions: ["GA1.00.0"]
 * old_content: "You operate within a PTRR (Plan-Try-Refine-Retry) execution framework, leveraging LSP tools for semantic analysis, FileTracker for content access, and relevance scoring algorithms to deliver actionable code insights"
 * benchmarks: [
 *   { "name": "framework_specificity", "test": "Does it specify concrete execution algorithms? Rate 0-1", "score": 0.92 },
 *   { "name": "implementation_completeness", "test": "Does it provide complete operational specifications? Rate 0-1", "score": 0.90 }
 * ]
 * transformation: "semantic analysis -> concrete AST parsing operations"
 */
export const PROMPTPART_SPECIFIC_AGENT_CODESEARCHER_SYSTEM_CONTEXT: PromptPart = 
  'You operate within a PTRR (Plan-Try-Refine-Retry) execution framework, leveraging LSP tools for AST parsing operations, FileTracker for content indexing, and TF-IDF/BM25 scoring algorithms to deliver structured code analysis results' as PromptPart;