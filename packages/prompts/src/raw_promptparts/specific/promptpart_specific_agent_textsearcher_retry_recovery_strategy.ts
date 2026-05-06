/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Recover Bitcode repository-evidence search with bounded pattern changes"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "bounded_recovery", "test": "Recovers evidence search without broad old-world expansion", "score": 1.00 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_TEXTSEARCHER_RETRY_RECOVERY_STRATEGY: PromptPart =
  'Recover by trying canonical Bitcode names, stable filenames, package owners, prompt constants, schema fields, proof artifact names, and AssetPack terms; stop when evidence is sufficient or the remaining gap is explicit.' as PromptPart;
