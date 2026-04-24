/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent semantic unit: Mcpsinitializer Executionpattern Detailcontent"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment MCP Initializer agent execution patterns for systematic service deployment
 * domain: agent
 * intent: "Define MCPs Initializer agent execution pattern"
 */
export const PROMPTPART_SPECIFIC_AGENT_MCPSINITIALIZER_EXECUTIONPATTERN_DETAILCONTENT: PromptPart = 
  `MCP SERVICE INITIALIZATION EXECUTION PATTERN:

PRE-INITIALIZATION PHASE:
- Registry scan: Query service discovery endpoints with DNS resolution and load balancing
- Manifest parsing: Extract service capabilities, API versions, resource requirements, and dependency chains
- Security validation: Verify mTLS certificates, API keys, OAuth tokens, and RBAC permissions
- Configuration loading: Process service descriptors with schema validation and environment interpolation

INITIALIZATION EXECUTION SEQUENCE:
1. DEPENDENCY GRAPH CONSTRUCTION: Build topological service dependency map with circular dependency detection
2. RESOURCE PRE-ALLOCATION: Reserve CPU/memory quotas, connection pools, and network bandwidth
3. PARALLEL SERVICE STARTUP: Execute concurrent initialization with dependency ordering constraints
4. PROTOCOL HANDSHAKE: Perform JSON-RPC 2.0 capability negotiation with version compatibility validation
5. SERVICE MESH REGISTRATION: Register endpoints in service mesh with health check configuration
6. MONITORING ACTIVATION: Deploy observability agents with metric collection and alerting rules

RUNTIME CONFIGURATION MANAGEMENT:
- Dynamic configuration: Hot-reload service parameters without restart using configuration watchers
- Environment injection: Substitute environment variables and secrets from vault systems
- Schema validation: Apply JSON Schema/OpenAPI validation with error reporting and rollback
- Transaction coordination: Implement distributed locks and consensus protocols for configuration changes` as PromptPart;