import { PROMPTPART_SPECIFIC_AGENT_CODESEARCHER_PURPOSE_CORESTATEMENT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_codesearcher_purpose_corestatement';
import { PROMPTPART_SPECIFIC_AGENT_CODESEARCHER_CAPABILITIES_LIST } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_codesearcher_capabilities_list';
import { PROMPTPART_SPECIFIC_AGENT_CODESEARCHER_EXECUTIONPATTERN_DETAILCONTENT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_codesearcher_executionpattern_detailcontent';
import { PROMPTPART_SPECIFIC_AGENT_CODESEARCHER_PTRRSTEPS_LIST } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_codesearcher_ptrrsteps_list';
import { PROMPTPART_SPECIFIC_AGENT_CODESEARCHER_TOOLS_LIST } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_codesearcher_tools_list';
import { PROMPTPART_SPECIFIC_AGENT_CODESEARCHER_INTEGRATION_DETAILCONTENT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_codesearcher_integration_detailcontent';
import { PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_failsafe_prepare_context';
import { PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_json_only_header';
import { PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_use_this_structured_schema';
import { PROMPTPART_GENERIC_AGENT_GENERATION_IF_UNKNOWN_EMPTY } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_if_unknown_empty';
import { PROMPTPART_GENERIC_AGENT_GENERATION_REASON } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_reason';
import { PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_judge';
import { PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_structured_output';
/**
 * @doc-comment-developing-promptdevelopment
 * domain: agent
 * intent: "Agent-level prompt for Code Searcher: identity and documentation"
 * current_version: "GA1.45.0"
 * dependencies: {
 *   "PROMPTPART_SPECIFIC_AGENT_CODESEARCHER_PURPOSE_CORESTATEMENT": "GA1.00.0",
 *   "PROMPTPART_SPECIFIC_AGENT_CODESEARCHER_CAPABILITIES_LIST": "GA1.00.0"
 * }
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Concrete agent identity and scope", "score": 0.46 },
 *   { "name": "implementation_ready", "test": "Usable by registry formatter", "score": 0.46 }
 * ]
 * 
 * @doc-code-prompt
 * purpose: Define structured documentation for Code Searcher agent
 * agent: code-searcher
 * pattern: LSP-powered semantic search with chunked processing
 */

import { AgentPrompt } from '@bitcode/agent-generics';








export const CODE_SEARCHER_AGENT_PROMPT = new AgentPrompt({
  // Metadata
  name: 'Code Searcher Agent',
  category: 'Code Analysis',
  version: '1.0.0',
  specificity: 'Generic',
  
  // Core documentation
  purpose: PROMPTPART_SPECIFIC_AGENT_CODESEARCHER_PURPOSE_CORESTATEMENT,
  capabilities: PROMPTPART_SPECIFIC_AGENT_CODESEARCHER_CAPABILITIES_LIST,
  
  // Execution pattern
  executionPattern: PROMPTPART_SPECIFIC_AGENT_CODESEARCHER_EXECUTIONPATTERN_DETAILCONTENT,
  
  // PTRR Steps
  steps: PROMPTPART_SPECIFIC_AGENT_CODESEARCHER_PTRRSTEPS_LIST,
  
  // Tools used
  tools: PROMPTPART_SPECIFIC_AGENT_CODESEARCHER_TOOLS_LIST,
  
  // Integration details
  integration: PROMPTPART_SPECIFIC_AGENT_CODESEARCHER_INTEGRATION_DETAILCONTENT
});
