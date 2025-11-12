import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Execution pattern details for Web Researcher agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Describes concrete execution stages", "score": 0.46 },
 *   { "name": "implementation_ready", "test": "Aligns with PTRR semantics", "score": 0.46 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_EXECUTIONPATTERN_DETAILCONTENT: PromptPart =
  'Plan: scope queries and sources; Try: execute searches and collect candidates; Refine: filter and enhance results; Retry: diagnose failures and recover with adjusted strategy.' as PromptPart;
