/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent-specific semantic unit (PROMPTPART_SPECIFIC_AGENT_MCPSINITIALIZER_TRY_DIRECTIVES_INSTRUCTIONS)"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_MCPSINITIALIZER_TRY_DIRECTIVES_INSTRUCTIONS: PromptPart = 
  'Execute initialization: verify tools, create required directories, warm caches, and authenticate where needed. Record artifacts and paths explicitly.' as PromptPart;