/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent semantic unit: Codesearcher Plan Analysis Approach"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-industrial-agent-codesearcher-plan-analysis
 * domain: agent
 * intent: "Industrial AST parsing plan analysis with concrete decomposition algorithms"
 * current_version: "GA1.50.0"
 * versions: ["GA1.00.0"]
 * old_content: "Break down the task into searchable components: function names, class names, variable patterns, import statements, and architectural patterns. Map natural language requirements to code constructs"
 * benchmarks: [
 *   { "name": "decomposition_precision", "test": "Does it specify concrete decomposition algorithms? Rate 0-1", "score": 0.92 },
 *   { "name": "mapping_specificity", "test": "Are mapping algorithms clearly defined? Rate 0-1", "score": 0.90 }
 * ]
 * transformation: "natural language mapping -> concrete AST node identification"
 */
export const PROMPTPART_SPECIFIC_AGENT_CODESEARCHER_PLAN_ANALYSIS_APPROACH: PromptPart = 
  'Decompose query into AST node types: function declarations, class definitions, variable identifiers, import/export statements, and dependency patterns. Execute tokenization and symbol table queries to map linguistic tokens to code symbols' as PromptPart;