/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: auto
 * intent: "Agent semantic unit: Deliverablevalidationreadytoship Requirements Context"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "requirements context for Ready to Ship agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "requirements_context_clarity", "test": "Clear requirements context?", "score": 0.50.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLEVALIDATIONREADYTOSHIP_REQUIREMENTS_CONTEXT: PromptPart = 
  'Requirements: execution context from prior phases, user task description, codebase metadata, VCS credentials when applicable, validation criteria, quality thresholds' as PromptPart;