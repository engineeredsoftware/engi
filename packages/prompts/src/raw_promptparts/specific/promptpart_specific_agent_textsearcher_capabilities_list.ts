/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode repository-evidence search capabilities for need measurement and AssetPack source-grounding"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_boundary", "test": "Keeps search as evidence support rather than product ownership", "score": 1.00 },
 *   { "name": "implementation_ready", "test": "Provides concrete prompt guidance for grep-backed evidence", "score": 1.00 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_TEXTSEARCHER_CAPABILITIES_LIST: PromptPart =
  `- Collect grep-backed line evidence from repository or package paths
- Select evidence patterns from Bitcode need, proof, prompt, tool, schema, and AssetPack terms
- Preserve file path, zero-based line, matched text, and caller intent as source-grounding context
- Rank evidence by relevance to the active Bitcode need without claiming proof completion
- Surface gaps, missing owners, and ambiguous terminology for downstream need-comprehension, proof, or asset-pack agents
- Refuse mutation, delivery, indexing-product, semantic-search-engine, or proof-authority claims` as PromptPart;
