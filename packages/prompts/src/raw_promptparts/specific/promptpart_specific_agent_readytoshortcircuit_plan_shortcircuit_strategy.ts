import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent-specific semantic unit (PROMPTPART_SPECIFIC_AGENT_READYTOSHORTCIRCUIT_PLAN_SHORTCIRCUIT_STRATEGY)"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_READYTOSHORTCIRCUIT_PLAN_SHORTCIRCUIT_STRATEGY: PromptPart = 
  'Define a short‑circuit strategy: tests to run, safe‑exit messaging, and handoff details. Ensure reversibility and capture rationale for auditability.' as PromptPart;