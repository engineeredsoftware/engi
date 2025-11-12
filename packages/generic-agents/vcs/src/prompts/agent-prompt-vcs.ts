import { PROMPTPART_SPECIFIC_AGENT_VCS_PURPOSE_CORESTATEMENT } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_agent_vcs_purpose_corestatement';
import { PROMPTPART_SPECIFIC_AGENT_VCS_CAPABILITIES_LIST } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_agent_vcs_capabilities_list';
import { PROMPTPART_SPECIFIC_AGENT_VCS_EXECUTIONPATTERN_DETAILCONTENT } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_agent_vcs_executionpattern_detailcontent';
import { PROMPTPART_SPECIFIC_AGENT_VCS_PTRRSTEPS_LIST } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_agent_vcs_ptrrsteps_list';
import { PROMPTPART_SPECIFIC_AGENT_VCS_TOOLS_LIST } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_agent_vcs_tools_list';
import { PROMPTPART_SPECIFIC_AGENT_VCS_INTEGRATION_DETAILCONTENT } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_agent_vcs_integration_detailcontent';
import { PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_agent_failsafe_prepare_context';
import { PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_json_only_header';
import { PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_use_this_structured_schema';
import { PROMPTPART_GENERIC_AGENT_GENERATION_IF_UNKNOWN_EMPTY } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_if_unknown_empty';
import { PROMPTPART_GENERIC_AGENT_GENERATION_REASON } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_reason';
import { PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_judge';
import { PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_structured_output';
/**\n * @doc-comment-developing-promptdevelopment\n * domain: agent\n * intent: "(fill intent)"\n * current_version: "GA1.45.0"\n * dependencies: { }\n * benchmarks: [\n *   { "name": "technical_accuracy", "test": "Concrete directives and purpose", "score": 0.46 },\n *   { "name": "implementation_ready", "test": "Usable by registry formatter", "score": 0.46 }\n * ]\n */
/**
 * AGENT PROMPT COMPOSITION - VCS AGENT
 * 
 * Composed AgentPrompt for VCS agent using atomic prompt parts.
 * This agent provides comprehensive VCS operations, repository management,
 * and version control automation through provider APIs.
 * 
 * @doc-code-prompt
 * purpose: Define structured documentation for VCS agent
 * agent: vcs
 * pattern: VCS operations through API-only automation and conflict resolution
 */

import { AgentPrompt } from '@engi/agent-generics';








export const VCS_AGENT_PROMPT = new AgentPrompt({
  // Metadata
  name: 'VCS Agent',
  category: 'Version Control',
  version: 'GA1.45.0',
  specificity: 'Generic',
  
  // Core documentation
  purpose: PROMPTPART_SPECIFIC_AGENT_VCS_PURPOSE_CORESTATEMENT,
  capabilities: PROMPTPART_SPECIFIC_AGENT_VCS_CAPABILITIES_LIST,
  
  // Execution pattern
  executionPattern: PROMPTPART_SPECIFIC_AGENT_VCS_EXECUTIONPATTERN_DETAILCONTENT,
  
  // PTRR Steps
  steps: PROMPTPART_SPECIFIC_AGENT_VCS_PTRRSTEPS_LIST,
  
  // Tools used
  tools: PROMPTPART_SPECIFIC_AGENT_VCS_TOOLS_LIST,
  
  // Integration details
  integration: PROMPTPART_SPECIFIC_AGENT_VCS_INTEGRATION_DETAILCONTENT
});
