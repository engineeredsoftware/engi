import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent-retry
 * intent: "Apply recovery strategy: adjust queries, switch sources, throttle requests, or simplify parsing"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Recovery steps are specific and actionable", "score": 0.46 },
 *   { "name": "implementation_ready", "test": "Matches retry loop behavior", "score": 0.46 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_RETRY_RECOVERY_STRATEGY: PromptPart =
  'Adjust search operators, expand or narrow site scope, add/remove filetype constraints, lower concurrency, add backoff, or replace unstable endpoints. Re-run with limited scope and verify output schema.' as PromptPart;
