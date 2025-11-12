import { PROMPTPART_SPECIFIC_AGENT_WEBSEARCH_PURPOSE_CORESTATEMENT } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_agent_websearch_purpose_corestatement';
import { PROMPTPART_SPECIFIC_AGENT_WEBSEARCH_CAPABILITIES_LIST } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_agent_websearch_capabilities_list';
import { PROMPTPART_SPECIFIC_AGENT_WEBSEARCH_EXECUTIONPATTERN_DETAILCONTENT } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_agent_websearch_executionpattern_detailcontent';
import { PROMPTPART_SPECIFIC_AGENT_WEBSEARCH_PTRRSTEPS_LIST } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_agent_websearch_ptrrsteps_list';
import { PROMPTPART_SPECIFIC_AGENT_WEBSEARCH_TOOLS_LIST } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_agent_websearch_tools_list';
import { PROMPTPART_SPECIFIC_AGENT_WEBSEARCH_INTEGRATION_DETAILCONTENT } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_agent_websearch_integration_detailcontent';
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
 * intent: "Agent-level prompt for Web Search (identity and documentation)"
 * current_version: "GA1.45.0"
 * dependencies: {
 *   "PROMPTPART_SPECIFIC_AGENT_WEBSEARCH_PURPOSE_CORESTATEMENT": "GA1.00.0",
 *   "PROMPTPART_SPECIFIC_AGENT_WEBSEARCH_CAPABILITIES_LIST": "GA1.00.0"
 * }
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Concrete agent identity and scope", "score": 0.46 },
 *   { "name": "implementation_ready", "test": "Usable by registry formatter", "score": 0.46 }
 * ]
 * 
 * @doc-code-prompt
 * purpose: Define structured documentation for Web Search agent
 * agent: web-search
 * pattern: Web discovery with data-driven optimization
 */

import { AgentPrompt } from '@engi/agent-generics';








export const WEB_SEARCH_AGENT_PROMPT = new AgentPrompt({
  // Metadata
  name: 'Web Search Agent',
  category: 'Web Research',
  version: '1.0.0',
  specificity: 'Generic',
  
  // Core documentation
  purpose: PROMPTPART_SPECIFIC_AGENT_WEBSEARCH_PURPOSE_CORESTATEMENT,
  capabilities: PROMPTPART_SPECIFIC_AGENT_WEBSEARCH_CAPABILITIES_LIST,
  
  // Execution pattern
  executionPattern: PROMPTPART_SPECIFIC_AGENT_WEBSEARCH_EXECUTIONPATTERN_DETAILCONTENT,
  
  // PTRR Steps
  steps: PROMPTPART_SPECIFIC_AGENT_WEBSEARCH_PTRRSTEPS_LIST,
  
  // Tools used
  tools: PROMPTPART_SPECIFIC_AGENT_WEBSEARCH_TOOLS_LIST,
  
  // Integration details
  integration: PROMPTPART_SPECIFIC_AGENT_WEBSEARCH_INTEGRATION_DETAILCONTENT
});
