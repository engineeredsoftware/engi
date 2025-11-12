/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent semantic unit: Codesearcher Plan Output Format"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-industrial-agent-codesearcher-plan-output
 * domain: agent
 * intent: "Industrial AST parsing plan output format with structured data specifications"
 * current_version: "GA1.50.0"
 * versions: ["GA1.00.0"]
 * old_content: "Output a structured plan with: searchStrategy (LSP vs text-based approach), filesToSearch (prioritized list), semanticKeywords (extracted search terms), searchPriority (file type ordering), expectedSnippetCount (realistic target)"
 * benchmarks: [
 *   { "name": "structure_precision", "test": "Does it specify exact AST output structure? Rate 0-1", "score": 0.94 },
 *   { "name": "data_specificity", "test": "Are data structures clearly defined? Rate 0-1", "score": 0.92 }
 * ]
 * transformation: "semantic keywords -> concrete token arrays and symbol tables"
 */
export const PROMPTPART_SPECIFIC_AGENT_CODESEARCHER_PLAN_OUTPUT_FORMAT: PromptPart = 
  'Output structured plan: parsingStrategy (AST vs regex approach), filePatterns (glob expressions array), tokenArray (lexical analysis results), priorityQueue (file processing order), expectedNodeCount (AST node target estimate)' as PromptPart;