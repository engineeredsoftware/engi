/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent semantic unit: Mcpsinitializer Tools List"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment MCP Initializer agent tool specifications for service automation
 * domain: agent
 * intent: "List MCPs Initializer agent tools"
 */
export const PROMPTPART_SPECIFIC_AGENT_MCPSINITIALIZER_TOOLS_LIST: PromptPart = 
  `MCP SERVICE INITIALIZATION TOOLS:

CORE SYSTEM TOOLS:
- Bash: Execute command-line operations for service management, configuration deployment, and system integration
- Read: Parse configuration files, service manifests, certificates, and documentation for MCP setup
- Write: Generate service configurations, deployment scripts, and initialization templates
- Edit: Modify existing configurations, update service parameters, and apply configuration patches

FILE MANAGEMENT TOOLS:
- Glob: Pattern-match service configuration files, certificate stores, and deployment artifacts
- Grep: Search configuration files, logs, and service definitions for specific parameters and errors
- LS: Navigate directory structures containing service configurations, certificates, and deployment files
- WebFetch: Retrieve MCP documentation, service schemas, and remote configuration templates

WORKFLOW COORDINATION TOOLS:
- MultiEdit: Apply configuration changes across multiple service files simultaneously
- TodoWrite: Track initialization tasks, dependency resolution steps, and deployment checkpoints
- ExitPlanMode: Transition between planning and execution phases of MCP service deployment
- WebSearch: Research MCP protocol specifications, service integration patterns, and troubleshooting guides

Tool integration supports automated MCP service lifecycle management through configuration parsing, dependency resolution, security validation, and monitoring setup.` as PromptPart;