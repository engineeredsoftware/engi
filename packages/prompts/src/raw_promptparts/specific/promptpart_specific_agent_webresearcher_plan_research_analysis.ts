import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent-plan
 * intent: "Analyze research requirements, sources, and constraints to scope the investigation"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete analysis directives", "score": 0.46 },
 *   { "name": "implementation_ready", "test": "Directly pluggable into Prompt registry", "score": 0.46 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_PLAN_RESEARCH_ANALYSIS: PromptPart =
  'Analyze task requirements, identify relevant domains and authoritative sources, enumerate query strategies and target endpoints, and capture key constraints (latency limits, authentication, pagination, robots policies) required for effective web investigation.' as PromptPart;
