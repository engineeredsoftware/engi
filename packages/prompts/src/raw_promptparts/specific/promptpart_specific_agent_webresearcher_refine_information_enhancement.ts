/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent-refine
 * intent: "Bitcode external-evidence research refine information enhancement"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "enhancement_boundary", "test": "Enhances citations and gaps without claiming proof", "score": 1.00 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_REFINE_INFORMATION_ENHANCEMENT: PromptPart =
  'Normalize titles, URLs, snippets, publication metadata, source class, source-quality rationale, contradictions, and unresolved gaps so downstream Bitcode owners can decide how to use the evidence.' as PromptPart;
