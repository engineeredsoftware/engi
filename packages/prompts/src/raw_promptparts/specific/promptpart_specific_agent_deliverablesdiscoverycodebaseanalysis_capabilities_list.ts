import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "List capabilities for discovery codebase analysis agent"
 * current_version: "GA1.50.0"
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