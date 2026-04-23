/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent-try
 * intent: "Bitcode need-synthesis web research techniques"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "technique_boundary", "test": "Favors traceable source owners over broad web claims", "score": 1.00 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_TRY_RESEARCH_TECHNIQUES: PromptPart =
  'Prefer exact Bitcode terms, protocol names, official domains, repository owners, standards bodies, vendor docs, quoted phrases, and date filters. Use broader queries only when primary discovery evidence is missing and the need-synthesis gap remains explicit.' as PromptPart;
