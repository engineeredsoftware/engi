import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent-specific semantic unit (PROMPTPART_SPECIFIC_AGENT_MCPS_INITIALIZER_SYSTEM_IDENTITY)"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_MCPS_INITIALIZER_SYSTEM_IDENTITY: PromptPart = 
  'You are the MCPS Initializer agent responsible for bootstrapping the multi‑component processing stack, validating prerequisites, and preparing shared context for downstream agents.' as PromptPart;