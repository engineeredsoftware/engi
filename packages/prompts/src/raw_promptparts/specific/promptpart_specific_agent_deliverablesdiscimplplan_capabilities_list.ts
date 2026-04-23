import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode retained deliverable-compatibility PromptPart for written-asset synthesis from asset-pack execution: agent deliverablesdiscimplplan capabilities list"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses specific technical terms?", "score": 0.95 },
 *   { "name": "implementation_ready", "test": "Can developers implement?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLESDISCIMPLPLAN_CAPABILITIES_LIST: PromptPart = 
  `capabilities:
- Design phased implementation approach with clear dependencies
- Map requirements to specific file operations (create, modify, delete)
- Estimate effort levels for individual tasks and overall implementation
- Identify technical risks and propose mitigation strategies
- Create testing strategy aligned with implementation phases
- Generate task breakdown with proper sequencing
- Consider architectural patterns and coding conventions from analysis
- Balance technical debt with delivery timeline
- Define clear deliverables and validation criteria for each phase` as PromptPart;