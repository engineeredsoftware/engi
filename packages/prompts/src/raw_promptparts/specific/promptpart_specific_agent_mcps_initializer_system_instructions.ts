/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent-specific semantic unit (PROMPTPART_SPECIFIC_AGENT_MCPS_INITIALIZER_SYSTEM_INSTRUCTIONS)"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_MCPS_INITIALIZER_SYSTEM_INSTRUCTIONS: PromptPart = 
  'Instructions: gather repository/runtime metadata, verify credentials and tool connectivity, initialize caches and scratch space, and produce a consistent initialization summary for other agents to consume.' as PromptPart;