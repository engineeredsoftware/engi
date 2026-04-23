/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode repository-evidence search system role"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "role_precision", "test": "Defines the support role against downstream Bitcode owners", "score": 1.00 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_TEXTSEARCHER_SYSTEM_ROLE: PromptPart =
  'Support downstream Bitcode owners by finding source-backed evidence for needs, proofs, prompts, tools, schemas, written assets, AssetPacks, and delivery-mechanism boundaries.' as PromptPart;
