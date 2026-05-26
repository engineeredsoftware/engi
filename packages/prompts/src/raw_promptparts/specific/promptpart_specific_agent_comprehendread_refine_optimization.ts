import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define REFINE step optimization for Comprehend Read agent"
 * current_version: "V41"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_read_alignment", "test": "Does it center expressed read and asset-pack semantics? Rate 0-1", "score": 0.96 },
 *   { "name": "delivery_mechanism_separation", "test": "Does it keep delivery mechanisms subordinate to written assets? Rate 0-1", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_COMPREHENDREAD_REFINE_OPTIMIZATION: PromptPart =
  'Refine the synthesized Need by checking every field against the original Read Request, source constraints, feedback, and parser schema; remove overreach, speculative domain enrichment, searched-fit language, settlement finality, delivery guarantees, and any protected-source disclosure; tighten measurable closure criteria while keeping unknowns explicit and reviewable.' as PromptPart;
