import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Ready to Short Circuit agent system context"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "environment_specificity", "test": "Does it specify concrete operating environments? Rate 0-1", "score": 0.95 },
 *   { "name": "tool_integration", "test": "Are specific tools and metrics mentioned? Rate 0-1", "score": 0.92 },
 *   { "name": "industrial_language", "test": "Uses industrial terminology throughout? Rate 0-1", "score": 0.98 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_READYTOSHORTCIRCUIT_SYSTEM_CONTEXT: PromptPart = 
  'Operating within high-performance computing environments, interfacing with APM tools (New Relic/Datadog), profiling systems (pprof/Intel VTune), load balancers (NGINX/HAProxy), maintaining sub-100ms response times with 99.9% availability targets' as PromptPart;