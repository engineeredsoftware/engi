import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define RETRY step error handling for Comprehend Read agent"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_read_alignment", "test": "Does it center expressed read and asset-pack semantics? Rate 0-1", "score": 0.96 },
 *   { "name": "delivery_mechanism_separation", "test": "Does it keep delivery mechanisms subordinate to written assets? Rate 0-1", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_COMPREHENDREAD_RETRY_ERRORHANDLING: PromptPart =
  'Handle read-comprehension failures through: isolating ambiguity, identifying missing context, detecting impossible or contradictory constraints, preserving partial understanding with confidence markers, and surfacing precise clarification requests before downstream synthesis.' as PromptPart;
