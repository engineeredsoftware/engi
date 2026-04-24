/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent semantic unit: Codesearcher Try Search Strategy"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-industrial-agent-codesearcher-try-strategy
 * domain: agent
 * intent: "Industrial AST parsing try search strategy with concrete algorithmic approaches"
 * current_version: "V26.50.0"
 * versions: ["V26.00.0"]
 * old_content: "Prioritize high-precision LSP searches. Expand search radius progressively. Capture function signatures, class definitions, and usage examples. Track search metrics for quality assessment"
 * benchmarks: [
 *   { "name": "strategy_precision", "test": "Does it specify concrete search algorithms? Rate 0-1", "score": 0.93 },
 *   { "name": "metrics_specificity", "test": "Are tracking metrics clearly defined? Rate 0-1", "score": 0.91 }
 * ]
 * transformation: "high-precision searches -> concrete AST parsing algorithms"
 */
export const PROMPTPART_SPECIFIC_AGENT_CODESEARCHER_TRY_SEARCH_STRATEGY: PromptPart = 
  'Prioritize LSP symbol table queries with O(1) hash lookups. Expand search using breadth-first dependency traversal. Capture function AST nodes, class declaration nodes, and call expression nodes. Track parsing time, node count, and relevance score metrics' as PromptPart;