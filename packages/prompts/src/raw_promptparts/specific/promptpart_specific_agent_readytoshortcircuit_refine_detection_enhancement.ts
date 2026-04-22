/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent-specific semantic unit (PROMPTPART_SPECIFIC_AGENT_READYTOSHORTCIRCUIT_REFINE_DETECTION_ENHANCEMENT)"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_READYTOSHORTCIRCUIT_REFINE_DETECTION_ENHANCEMENT: PromptPart = 
  'Enhance detection: combine heuristics with structured context validation, raise confidence only with corroborating evidence, and log contributing factors.' as PromptPart;