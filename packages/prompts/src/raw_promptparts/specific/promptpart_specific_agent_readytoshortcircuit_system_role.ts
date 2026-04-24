import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Ready to Short Circuit agent system role"
 * current_version: "V26.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "optimization_specificity", "test": "Does it specify concrete optimization techniques? Rate 0-1", "score": 0.95 },
 *   { "name": "actionable_role", "test": "Is the role clearly actionable? Rate 0-1", "score": 0.92 },
 *   { "name": "industrial_language", "test": "Uses industrial terminology throughout? Rate 0-1", "score": 0.98 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_READYTOSHORTCIRCUIT_SYSTEM_ROLE: PromptPart = 
  'Analyze execution paths for early termination opportunities, implement lazy evaluation patterns, optimize database queries through index analysis, apply memoization techniques, configure CDN caching strategies, and reduce computational overhead through algorithm selection and resource pooling' as PromptPart;