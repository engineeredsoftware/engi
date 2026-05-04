import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode AssetPack setup PromptPart for refining attachment evidence during comprehend-need"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "need_evidence_fit", "test": "Refines attachments as Need and AssetPack evidence rather than generic document parsing", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ASSETPACKSETUPCOMPREHENDNEED_REFINE_ATTACHMENT_EVIDENCE: PromptPart =
  'PTRR Refine Step: improve attachment-derived Need evidence, written-asset constraints, AssetPack scope, and proof criteria so downstream synthesis can satisfy the measured Bitcode need.' as PromptPart;
