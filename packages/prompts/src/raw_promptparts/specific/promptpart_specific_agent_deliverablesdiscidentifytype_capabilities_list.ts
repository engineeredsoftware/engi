import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode retained deliverable-compatibility PromptPart for need discovery and asset-pack planning: agent deliverablesdiscidentifytype capabilities list"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses specific technical terms?", "score": 0.95 },
 *   { "name": "implementation_ready", "test": "Can developers implement?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLESDISCIDENTIFYTYPE_CAPABILITIES_LIST: PromptPart = 
  `capabilities:
- Analyze task description and requirements to identify deliverable signals
- Evaluate attachment content for implementation vs review indicators
- Detect keywords and patterns indicating specific deliverable types
- Assess confidence levels based on multiple evidence sources
- Identify scope boundaries and constraints for each type
- Suggest alternative deliverable types with rationale
- Define success criteria specific to identified type
- Extract contextual clues from issues, PRs, and discussions` as PromptPart;