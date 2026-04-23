/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent-try
 * intent: "Bitcode need-synthesis web research try directives"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "try_boundary", "test": "Constricts execution to bounded discovery evidence", "score": 1.00 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_TRY_DIRECTIVES_INSTRUCTIONS: PromptPart =
  'Use admitted search/content tools to collect exact external evidence inside the requested discovery source scope. Return source-attributed findings, record misses, and avoid expanding beyond the need-synthesis, proof-gap, interface question, or AssetPack planning boundary.' as PromptPart;
