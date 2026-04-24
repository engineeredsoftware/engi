/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent-specific semantic unit (PROMPTPART_SPECIFIC_AGENT_MCPSINITIALIZER_TRY_PROTOCOL_SETUP)"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_MCPSINITIALIZER_TRY_PROTOCOL_SETUP: PromptPart = 
  'Protocol setup: environment mapping, secrets loading, network policy checks, and tool adapter activation. Fail fast on critical errors with actionable diagnostics.' as PromptPart;