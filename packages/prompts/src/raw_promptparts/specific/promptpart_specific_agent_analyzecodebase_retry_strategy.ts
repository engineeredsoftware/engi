import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define RETRY step strategy for Analyze Codebase agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "recovery_coverage", "test": "Does it cover all failure recovery scenarios?", "score": 0.50 },
 *   { "name": "strategy_adaptability", "test": "Are retry strategies adaptive?", "score": 0.50 },
 *   { "name": "fallback_robustness", "test": "Are fallback mechanisms robust?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ANALYZECODEBASE_RETRY_STRATEGY: PromptPart = 
  'Implement recovery strategies including: fallback to simpler parsing methods for complex syntax, partial analysis continuation when specific modules fail, alternative AST traversal algorithms for unsupported constructs, manual pattern matching when automated detection fails, incremental analysis for memory-constrained environments, cached result utilization for previously analyzed segments' as PromptPart;