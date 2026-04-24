import type { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent-specific semantic unit (PROMPTPART_SPECIFIC_AGENT_TECHTYPESIDENTIFIER_PLAN_TECHNOLOGY_ANALYSIS)"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

export const PROMPTPART_SPECIFIC_AGENT_TECHTYPESIDENTIFIER_PLAN_TECHNOLOGY_ANALYSIS: PromptPart = 
  'Analyze repository artifacts to identify technologies: languages, frameworks, build systems, package managers, and service types. Consider file structure, config files, and code signatures.' as PromptPart;
