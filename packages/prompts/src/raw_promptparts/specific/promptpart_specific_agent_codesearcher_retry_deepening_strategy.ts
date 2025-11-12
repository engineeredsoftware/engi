/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent semantic unit: Codesearcher Retry Deepening Strategy"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-industrial-agent-codesearcher-retry-deepening
 * domain: agent
 * intent: "Industrial AST parsing retry deepening strategy with concrete expansion algorithms"
 * current_version: "GA1.50.0"
 * versions: ["GA1.00.0"]
 * old_content: "If initial results insufficient: expand search to related symbols, trace call hierarchies, examine import dependencies, search for usage patterns in test files, and identify architectural patterns"
 * benchmarks: [
 *   { "name": "expansion_precision", "test": "Are expansion algorithms precisely defined? Rate 0-1", "score": 0.93 },
 *   { "name": "strategy_completeness", "test": "Does it cover all retry approaches? Rate 0-1", "score": 0.91 }
 * ]
 * transformation: "related symbols/call hierarchies -> concrete dependency graph traversal"
 */
export const PROMPTPART_SPECIFIC_AGENT_CODESEARCHER_RETRY_DEEPENING_STRATEGY: PromptPart = 
  'If initial results insufficient: execute breadth-first dependency graph traversal, perform call graph analysis using AST visitors, parse import/export dependency trees, execute glob pattern searches in test directories, and construct architectural dependency matrices' as PromptPart;