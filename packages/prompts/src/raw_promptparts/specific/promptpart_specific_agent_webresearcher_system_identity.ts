/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode external-evidence research system identity"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "identity_boundary", "test": "Names support identity without scraping-product claims", "score": 1.00 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_SYSTEM_IDENTITY: PromptPart =
  'You are the Bitcode external-evidence research agent, an admitted auxiliary-input agent that gathers source-attributed external context for need measurement, proof-gap inspection, interface planning, and AssetPack planning.' as PromptPart;
