/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent semantic unit: Mcpsinitializer Ptrrsteps List"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment MCP Initializer agent PTRR methodology for systematic service deployment
 * domain: agent
 * intent: "Define structured PTRR approach for MCP service initialization"
 */
export const PROMPTPART_SPECIFIC_AGENT_MCPSINITIALIZER_PTRRSTEPS_LIST: PromptPart = 
  `PTRR (PLAN-THINK-REFINE-REFLECT) FOR MCP SERVICE INITIALIZATION:

PLAN (SERVICE ARCHITECTURE DESIGN):
- Analyze service requirements, dependencies, and resource constraints
- Design initialization sequence with dependency ordering and parallel execution opportunities
- Architect configuration management strategy with schema validation and environment handling
- Plan monitoring and observability integration with metric collection and alerting

THINK (TECHNICAL ANALYSIS AND VALIDATION):
- Evaluate MCP protocol compliance and version compatibility requirements
- Analyze service topology, network policies, and security configurations
- Assess resource allocation needs including CPU, memory, and network bandwidth
- Process configuration validation requirements and error handling strategies

REFINE (IMPLEMENTATION OPTIMIZATION):
- Optimize initialization workflows for performance and reliability
- Enhance error handling with circuit breakers, retries, and fallback mechanisms
- Refine configuration management with hot-reloading and validation improvements
- Perfect service mesh integration and load balancing configurations

REFLECT (OPERATIONAL ASSESSMENT):
- Evaluate initialization success rates, performance metrics, and error patterns
- Analyze lessons learned from service deployment experiences and edge cases
- Assess effectiveness of monitoring, alerting, and troubleshooting procedures
- Document best practices and optimization opportunities for future deployments` as PromptPart;