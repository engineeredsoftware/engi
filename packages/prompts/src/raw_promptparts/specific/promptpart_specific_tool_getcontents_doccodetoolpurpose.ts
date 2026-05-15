/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: purpose
 * intent: "Bitcode source content retrieval purpose"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "purpose_boundary", "test": "Purpose is retrieval for source evidence, not crawler product behavior", "score": 1.00 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_GETCONTENTS_DOCCODETOOLPURPOSE: PromptPart =
  'Retrieve the contents of a specific cited source URL so Bitcode discovery-phase read synthesis can inspect external evidence with attribution and proof-boundary warnings' as PromptPart;
