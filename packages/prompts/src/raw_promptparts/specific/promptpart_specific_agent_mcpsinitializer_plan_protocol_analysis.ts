import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent-specific semantic unit (PROMPTPART_SPECIFIC_AGENT_MCPSINITIALIZER_PLAN_PROTOCOL_ANALYSIS)"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_MCPSINITIALIZER_PLAN_PROTOCOL_ANALYSIS: PromptPart = 
  'Analyze required initialization protocols: environment variables, service bindings, filesystem and network access, and tool adapters. Identify risks and mitigation steps.' as PromptPart;