/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode external-evidence research capabilities for need and proof-gap support"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_boundary", "test": "Keeps web research as auxiliary evidence support", "score": 1.00 },
 *   { "name": "implementation_ready", "test": "Lists concrete source-attribution behavior", "score": 1.00 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_CAPABILITIES_LIST: PromptPart =
  `- Derive bounded external evidence queries from a Bitcode need, proof gap, third-party interface, or AssetPack question
- Prefer primary, official, repository, standard, paper, or vendor-owned sources before commentary
- Preserve title, URL, snippet, source class, publication metadata, provider, and evidence-use rationale
- Mark source quality, volatility, contradictions, and unresolved gaps for downstream Bitcode owners
- Feed auxiliary context into need-comprehension, proof inspection, interface planning, and AssetPack synthesis
- Refuse browser-automation product, mutation, delivery, canonical proof, and live Exchange/Terminal ownership claims` as PromptPart;
