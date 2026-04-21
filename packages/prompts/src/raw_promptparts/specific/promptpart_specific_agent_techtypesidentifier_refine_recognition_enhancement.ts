import type { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent-specific semantic unit (PROMPTPART_SPECIFIC_AGENT_TECHTYPESIDENTIFIER_REFINE_RECOGNITION_ENHANCEMENT)"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

export const PROMPTPART_SPECIFIC_AGENT_TECHTYPESIDENTIFIER_REFINE_RECOGNITION_ENHANCEMENT: PromptPart = 
  'Enhance recognition: add new signatures, normalize variant configs, and reconcile conflicting hints from multiple sources.' as PromptPart;
