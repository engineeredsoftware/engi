import { PROMPTPART_SPECIFIC_AGENT_MCPSINITIALIZER_PURPOSE_CORESTATEMENT } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_agent_mcpsinitializer_purpose_corestatement';
import { PROMPTPART_SPECIFIC_AGENT_MCPSINITIALIZER_CAPABILITIES_LIST } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_agent_mcpsinitializer_capabilities_list';
import { PROMPTPART_SPECIFIC_AGENT_MCPSINITIALIZER_EXECUTIONPATTERN_DETAILCONTENT } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_agent_mcpsinitializer_executionpattern_detailcontent';
import { PROMPTPART_SPECIFIC_AGENT_MCPSINITIALIZER_PTRRSTEPS_LIST } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_agent_mcpsinitializer_ptrrsteps_list';
import { PROMPTPART_SPECIFIC_AGENT_MCPSINITIALIZER_TOOLS_LIST } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_agent_mcpsinitializer_tools_list';
import { PROMPTPART_SPECIFIC_AGENT_MCPSINITIALIZER_INTEGRATION_DETAILCONTENT } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_agent_mcpsinitializer_integration_detailcontent';
import { PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_agent_failsafe_prepare_context';
import { PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_json_only_header';
import { PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_use_this_structured_schema';
import { PROMPTPART_GENERIC_AGENT_GENERATION_IF_UNKNOWN_EMPTY } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_if_unknown_empty';
import { PROMPTPART_GENERIC_AGENT_GENERATION_REASON } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_reason';
import { PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_judge';
import { PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_structured_output';
/**
 * @doc-comment-developing-promptdevelopment
 * domain: agent
 * intent: "Agent-level prompt for MCPS Initializer: identity and documentation"
 * current_version: "GA1.45.0"
 * dependencies: { }
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Concrete agent identity and scope", "score": 0.46 },
 *   { "name": "implementation_ready", "test": "Usable by registry formatter", "score": 0.46 }
 * ]
 * 
 * @doc-code-prompt
 * purpose: Define structured documentation for MCPs Initializer agent
 * agent: mcps-initializer
 * pattern: MCP service management through JSON-RPC protocol and configuration
 */

import { AgentPrompt } from '@engi/agent-generics';








export const MCPS_INITIALIZER_AGENT_PROMPT = new AgentPrompt({
  // Metadata
  name: 'MCPs Initializer Agent',
  category: 'Service Management',
  version: '1.0.0',
  specificity: 'Generic',
  
  // Core documentation
  purpose: PROMPTPART_SPECIFIC_AGENT_MCPSINITIALIZER_PURPOSE_CORESTATEMENT,
  capabilities: PROMPTPART_SPECIFIC_AGENT_MCPSINITIALIZER_CAPABILITIES_LIST,
  
  // Execution pattern
  executionPattern: PROMPTPART_SPECIFIC_AGENT_MCPSINITIALIZER_EXECUTIONPATTERN_DETAILCONTENT,
  
  // PTRR Steps
  steps: PROMPTPART_SPECIFIC_AGENT_MCPSINITIALIZER_PTRRSTEPS_LIST,
  
  // Tools used
  tools: PROMPTPART_SPECIFIC_AGENT_MCPSINITIALIZER_TOOLS_LIST,
  
  // Integration details
  integration: PROMPTPART_SPECIFIC_AGENT_MCPSINITIALIZER_INTEGRATION_DETAILCONTENT
});
