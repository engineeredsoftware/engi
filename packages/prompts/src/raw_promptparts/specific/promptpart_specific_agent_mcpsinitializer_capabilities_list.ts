/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent semantic unit: Mcpsinitializer Capabilities List"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment MCP Initializer agent capabilities for automated service management
 * domain: agent
 * intent: "List MCPs Initializer agent capabilities"
 */
export const PROMPTPART_SPECIFIC_AGENT_MCPSINITIALIZER_CAPABILITIES_LIST: PromptPart = 
  `- MCP PROTOCOL IMPLEMENTATION: Execute JSON-RPC 2.0 message exchange with capability negotiation, version compatibility checks, and transport layer management
- SERVICE DISCOVERY: Perform registry scanning, provider health validation, endpoint resolution, and automatic failover with service mesh integration
- CONNECTION MANAGEMENT: Establish secure WebSocket/HTTP transport with TLS termination, authentication protocols, retry logic, and connection pooling
- CONFIGURATION PARSING: Process YAML/JSON service descriptors with schema validation, environment variable injection, and configuration hot-reloading
- DEPENDENCY RESOLUTION: Analyze service dependency graphs, detect circular dependencies, and execute topological initialization ordering
- RESOURCE ALLOCATION: Manage CPU quotas, memory limits, connection pools, and rate limiting with container orchestration integration
- MONITORING INTEGRATION: Collect service metrics (latency, throughput, error rates) and export to observability platforms (Prometheus/Grafana)
- ERROR HANDLING: Implement circuit breaker patterns, exponential backoff algorithms, graceful degradation, and dead letter queues
- SECURITY MANAGEMENT: Handle mTLS certificates, API key rotation, OAuth token validation, and secrets management integration
- BATCH INITIALIZATION: Execute parallel service startup with progress tracking, rollback mechanisms, and distributed transaction coordination` as PromptPart;