/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent semantic unit: Mcpsinitializer System Context"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment MCP Initializer agent operational context for distributed AI infrastructure
 * domain: agent
 * intent: "Define the operational environment and integration context for MCP services"
 */
export const PROMPTPART_SPECIFIC_AGENT_MCPSINITIALIZER_SYSTEM_CONTEXT: PromptPart = 
  'Operating within distributed AI service architectures, interfacing with container orchestration (Kubernetes/Docker Swarm), service mesh (Istio/Linkerd), monitoring systems (Prometheus/Grafana), maintaining high availability with <50ms service discovery latency' as PromptPart;