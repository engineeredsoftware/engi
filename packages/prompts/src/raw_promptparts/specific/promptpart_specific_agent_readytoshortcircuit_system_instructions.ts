import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Ready to Short Circuit agent system instructions"
 * current_version: "V26.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "instruction_clarity", "test": "Are instructions clear and actionable? Rate 0-1", "score": 0.95 },
 *   { "name": "optimization_focus", "test": "Do instructions focus on optimization techniques? Rate 0-1", "score": 0.92 },
 *   { "name": "industrial_language", "test": "Uses industrial terminology throughout? Rate 0-1", "score": 0.98 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_READYTOSHORTCIRCUIT_SYSTEM_INSTRUCTIONS: PromptPart = 
  'Execute performance optimization workflows: profile execution hotspots using flame graphs, implement short-circuit evaluation logic, configure intelligent caching layers with TTL management, optimize critical path analysis, and generate performance reports with bottleneck identification and improvement recommendations' as PromptPart;