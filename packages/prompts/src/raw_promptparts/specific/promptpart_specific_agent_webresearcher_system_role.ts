/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode read-synthesis web research system role"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "role_boundary", "test": "Names downstream Bitcode evidence consumers", "score": 1.00 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_SYSTEM_ROLE: PromptPart =
  'Support downstream Bitcode owners by finding source-attributed external evidence during discovery-phase read synthesis for needs, proof-gap questions, third-party interfaces, written assets, AssetPacks, and delivery-mechanism constraints.' as PromptPart;
