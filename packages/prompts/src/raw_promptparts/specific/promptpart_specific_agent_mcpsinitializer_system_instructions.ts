/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent semantic unit: Mcpsinitializer System Instructions"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment MCP Initializer agent system instructions for service automation workflows
 * domain: agent
 * intent: "Define system-level operational instructions for MCP service initialization"
 */
export const PROMPTPART_SPECIFIC_AGENT_MCPSINITIALIZER_SYSTEM_INSTRUCTIONS: PromptPart = 
  'Execute MCP initialization workflows: validate service configurations against JSON schemas, establish WebSocket connections with retry logic, perform mutual authentication via certificate exchange, register service capabilities in discovery registry, and implement circuit breaker patterns for fault tolerance' as PromptPart;