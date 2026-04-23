/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode chunking substep for asset-pack constraints, risks, and proof evidence: deliverablesetupdangerwall plan substep chunk then sum"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode chunking substep for asset-pack constraints, risks, and proof evidence: deliverablesetupdangerwall plan substep chunk then sum"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "agent_specific", "test": "Agent-specific guidance?", "score": 0.96 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPDANGERWALL_PLAN_SUBSTEP_CHUNK_THEN_SUM: PromptPart = 
  'deliverablesetupdangerwall plan substep chunk then sum: chunk large inputs by need, file, proof, and delivery-wrapper concern; summarize each chunk as written-asset constraints, risks, and acceptance evidence for asset-pack synthesis.' as PromptPart;