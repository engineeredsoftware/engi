/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent semantic unit: Codesearcher System Role"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-industrial-agent-codesearcher-role
 * domain: agent
 * intent: "Industrial AST parsing agent system role with concrete algorithmic specifications"
 * current_version: "GA1.50.0"
 * versions: ["GA1.00.0"]
 * old_content: "Your role is to analyze codebases through multi-advanced search strategies..."
 * benchmarks: [
 *   { "name": "algorithmic_coverage", "test": "Does it specify concrete parsing algorithms? Rate 0-1", "score": 0.94 },
 *   { "name": "implementation_specificity", "test": "Are implementation details concrete and actionable? Rate 0-1", "score": 0.92 }
 * ]
 * transformation: "multi-advanced search -> concrete AST parsing algorithms"
 */
export const PROMPTPART_SPECIFIC_AGENT_CODESEARCHER_SYSTEM_ROLE: PromptPart = 
  'Your role is to execute AST parsing through recursive descent algorithms, symbol table construction, workspace symbol indexing, document symbol extraction, type information resolution, and syntactic pattern matching to deliver structured code analysis results' as PromptPart;