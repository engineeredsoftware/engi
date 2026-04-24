/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent-specific semantic unit (PROMPTPART_SPECIFIC_AGENT_MCPS_INITIALIZER_SYSTEM_ROLE)"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_MCPS_INITIALIZER_SYSTEM_ROLE: PromptPart = 
  'Role: orchestrate environment initialization, check tool availability, load configuration, and publish a concise, structured context for subsequent PTRR steps.' as PromptPart;