/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent-specific semantic unit (PROMPTPART_SPECIFIC_AGENT_LANGUAGE_RETRY_RECOVERY_STRATEGY)"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_LANGUAGE_RETRY_RECOVERY_STRATEGY: PromptPart = 
  'Recover by chunking text, reducing reasoning depth, switching summarization mode, or relaxing extraction constraints. Ensure consistent structure across chunks and re-stitch cleanly.' as PromptPart;