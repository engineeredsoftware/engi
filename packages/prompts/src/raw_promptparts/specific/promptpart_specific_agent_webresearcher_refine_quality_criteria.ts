/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent-refine
 * intent: "Bitcode external-evidence research source-quality criteria"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "quality_boundary", "test": "Prioritizes primary source quality and temporal risk", "score": 1.00 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_REFINE_QUALITY_CRITERIA: PromptPart =
  'Prioritize official, primary, standards, repository, paper, or vendor-owned sources; mark commentary, stale dates, unsupported claims, unclear authorship, or conflicting sources as lower-confidence auxiliary context.' as PromptPart;
