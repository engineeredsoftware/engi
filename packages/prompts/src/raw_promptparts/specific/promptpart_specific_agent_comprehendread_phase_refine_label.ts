import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Phase header for ComprehendRead REFINE step"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_read_alignment", "test": "Does it center expressed read and asset-pack semantics? Rate 0-1", "score": 0.96 },
 *   { "name": "delivery_mechanism_separation", "test": "Does it keep delivery mechanisms subordinate to written assets? Rate 0-1", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_COMPREHENDREAD_PHASE_REFINE_LABEL: PromptPart =
  'REFINE: Enhance Read Understanding' as PromptPart;
