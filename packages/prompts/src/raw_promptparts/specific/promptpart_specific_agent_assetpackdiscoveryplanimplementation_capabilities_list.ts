import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode AssetPack discovery PromptPart for need-satisfaction implementation planning and proof evidence: agent assetpackdiscoveryplanimplementation capabilities list"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses specific technical terms?", "score": 0.95 },
 *   { "name": "implementation_ready", "test": "Can developers implement?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ASSETPACKDISCOVERYPLANIMPLEMENTATION_CAPABILITIES_LIST: PromptPart =
  `capabilities:
- Design phased AssetPack implementation approach with clear dependencies
- Map Need requirements to specific file operations (create, modify, delete)
- Estimate effort levels for each written-asset synthesis step and the overall AssetPack run
- Identify technical risks and propose proof-bearing mitigation strategies
- Create testing strategy aligned with implementation and validation phases
- Generate task breakdown with proper sequencing
- Consider architectural patterns and coding conventions from source analysis
- Balance technical debt with Need-satisfaction evidence
- Define clear written assets, proof evidence, and validation criteria for each phase` as PromptPart;
