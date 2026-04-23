/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Bitcode multi-provider evidence search purpose"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "purpose_boundary", "test": "Purpose is evidence coverage, not search platform ownership", "score": 1.00 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_MULTIPROVIDERSEARCH_DOCCODETOOLPURPOSE: PromptPart =
  'Search across providers to improve source coverage and corroboration for Bitcode discovery-phase need synthesis while keeping all results auxiliary to downstream proof and need owners' as PromptPart;
