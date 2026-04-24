/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent-specific semantic unit (PROMPTPART_SPECIFIC_AGENT_JIRAPROCESSOR_RETRY_RECOVERY_STRATEGY)"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_JIRAPROCESSOR_RETRY_RECOVERY_STRATEGY: PromptPart = 
  'Apply recovery strategies: exponential backoff, token refresh, scope reduction, alternate endpoints, or staged writes. Add compensating actions for partial success and verify eventual consistency.' as PromptPart;