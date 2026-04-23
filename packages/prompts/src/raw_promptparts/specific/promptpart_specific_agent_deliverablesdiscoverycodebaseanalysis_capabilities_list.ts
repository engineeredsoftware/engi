import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode retained deliverable-compatibility PromptPart for need discovery and asset-pack planning: agent deliverablesdiscoverycodebaseanalysis capabilities list"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses specific technical terms?", "score": 0.95 },
 *   { "name": "implementation_ready", "test": "Can developers implement?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLESDISCOVERYCODEBASEANALYSIS_CAPABILITIES_LIST: PromptPart = 
  `capabilities:
- Identify relevant files based on task requirements and technical context
- Analyze architectural patterns and coding conventions
- Build dependency graphs showing internal and external dependencies
- Detect circular dependencies and orphaned files
- Calculate complexity metrics and identify hotspots
- Categorize files by type (core, test, config, documentation)
- Map entry points and module boundaries
- Recognize framework-specific patterns and usage` as PromptPart;