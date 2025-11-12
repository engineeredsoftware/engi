import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent-refine
 * intent: "Enhance information by consolidating, normalizing fields, and adding citations"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Enhancement actions are concrete", "score": 0.46 },
 *   { "name": "implementation_ready", "test": "Matches structured output expectations", "score": 0.46 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_REFINE_INFORMATION_ENHANCEMENT: PromptPart =
  'Consolidate overlapping findings, normalize field names, add full citations with canonical URLs, and provide short rationale for selected results.' as PromptPart;
