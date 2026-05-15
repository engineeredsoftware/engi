/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Stable-path system identity for Bitcode repository-evidence search"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "support_precision", "test": "Stable filename carries canonical Bitcode semantics", "score": 1.00 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_TEXT_SEARCHER_SYSTEM_IDENTITY: PromptPart =
  'Bitcode repository-evidence search support: gather line-level source evidence for read measurement, proof inspection, and AssetPack planning.' as PromptPart;
