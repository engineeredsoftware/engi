/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode external-evidence research system instructions"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "instruction_boundary", "test": "Rejects mutation, delivery, proof, and product authority", "score": 1.00 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_SYSTEM_INSTRUCTIONS: PromptPart =
  'Collect only bounded external evidence. Preserve title, URL, snippet, source class, source-quality rationale, publication context, query intent, volatility, and gaps. Never mutate files, deliver artifacts, assert proof completion, infer canonical need meaning, or claim authority beyond auxiliary source context.' as PromptPart;
