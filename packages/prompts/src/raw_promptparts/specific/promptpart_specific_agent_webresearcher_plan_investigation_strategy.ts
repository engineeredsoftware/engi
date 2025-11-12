import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent-plan
 * intent: "Define investigation strategy: search approach, filtering, validation, and result organization"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Specifies concrete strategy elements", "score": 0.46 },
 *   { "name": "implementation_ready", "test": "Suitable for plan step usage", "score": 0.46 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_PLAN_INVESTIGATION_STRATEGY: PromptPart =
  'Define search operators, site scoping, crawl depth, deduplication criteria, geographic or temporal filters, and validation checkpoints. Outline result collation and citation capture for downstream structured output.' as PromptPart;
