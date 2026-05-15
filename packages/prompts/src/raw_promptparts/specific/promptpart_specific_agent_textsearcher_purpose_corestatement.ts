/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode repository-evidence search purpose"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "purpose_precision", "test": "Defines support role without old search-engine claims", "score": 1.00 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_TEXTSEARCHER_PURPOSE_CORESTATEMENT: PromptPart =
  'Collect and structure bounded repository evidence so Bitcode agents can measure reads, inspect proof/source owners, and ground AssetPack or written-asset planning before downstream systems interpret, mutate, prove, or deliver.' as PromptPart;
