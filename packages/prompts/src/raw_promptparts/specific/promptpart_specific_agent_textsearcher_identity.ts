/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode repository-evidence search agent minimal identity"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "minimal_scope", "test": "Names the support role without product overclaiming", "score": 1.00 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_TEXTSEARCHER_IDENTITY: PromptPart =
  'Bitcode repository-evidence search agent' as PromptPart;
