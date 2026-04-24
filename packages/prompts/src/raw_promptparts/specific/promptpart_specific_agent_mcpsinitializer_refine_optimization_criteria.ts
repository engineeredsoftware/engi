/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent-specific semantic unit (PROMPTPART_SPECIFIC_AGENT_MCPSINITIALIZER_REFINE_OPTIMIZATION_CRITERIA)"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_MCPSINITIALIZER_REFINE_OPTIMIZATION_CRITERIA: PromptPart = 
  'Optimization criteria: minimize startup latency, cache misses, and redundant external calls. Ensure stability (retries/backoff) and observability (logs/metrics).' as PromptPart;