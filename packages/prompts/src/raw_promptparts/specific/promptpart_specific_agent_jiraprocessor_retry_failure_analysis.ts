/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent-specific semantic unit (PROMPTPART_SPECIFIC_AGENT_JIRAPROCESSOR_RETRY_FAILURE_ANALYSIS)"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_JIRAPROCESSOR_RETRY_FAILURE_ANALYSIS: PromptPart = 
  'Analyze failures such as 4xx/5xx responses, permission errors, schema mismatches, or race conditions. Correlate with logs and request IDs; extract minimal reproducible cases.' as PromptPart;