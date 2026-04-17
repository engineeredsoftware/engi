import { PROMPTPART_SPECIFIC_AGENT_FILEPICK_PURPOSE_CORESTATEMENT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_filepick_purpose_corestatement';
import { PROMPTPART_SPECIFIC_AGENT_FILEPICK_CAPABILITIES_LIST } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_filepick_capabilities_list';
import { PROMPTPART_SPECIFIC_AGENT_FILEPICK_EXECUTIONPATTERN_DETAILCONTENT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_filepick_executionpattern_detailcontent';
import { PROMPTPART_SPECIFIC_AGENT_FILEPICK_PTRRSTEPS_LIST } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_filepick_ptrrsteps_list';
import { PROMPTPART_SPECIFIC_AGENT_FILEPICK_TOOLS_LIST } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_filepick_tools_list';
import { PROMPTPART_SPECIFIC_AGENT_FILEPICK_INTEGRATION_DETAILCONTENT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_filepick_integration_detailcontent';
import { PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_failsafe_prepare_context';
import { PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_json_only_header';
import { PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_use_this_structured_schema';
import { PROMPTPART_GENERIC_AGENT_GENERATION_IF_UNKNOWN_EMPTY } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_if_unknown_empty';
import { PROMPTPART_GENERIC_AGENT_GENERATION_REASON } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_reason';
import { PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_judge';
import { PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_structured_output';
/**\n * @doc-comment-developing-promptdevelopment\n * domain: agent\n * intent: "(fill intent)"\n * current_version: "GA1.45.0"\n * dependencies: { }\n * benchmarks: [\n *   { "name": "technical_accuracy", "test": "Concrete directives and purpose", "score": 0.46 },\n *   { "name": "implementation_ready", "test": "Usable by registry formatter", "score": 0.46 }\n * ]\n */
/**
 * AGENT PROMPT COMPOSITION - FILE PICK AGENT
 * 
 * Composed AgentPrompt for File Pick agent using atomic prompt parts.
 * This agent specializes in intelligent file selection and filtering
 * based on context and task requirements.
 * 
 * @doc-code-prompt
 * purpose: Define structured documentation for File Pick agent
 * agent: file-pick
 * pattern: File selection with relevance scoring and pattern matching
 */

import { AgentPrompt } from '@bitcode/agent-generics';








export const FILE_PICKER_AGENT_PROMPT = new AgentPrompt({
  // Metadata
  name: 'File Pick Agent',
  category: 'File Management',
  version: '2.0.0',
  specificity: 'Generic',
  
  // Core documentation
  purpose: PROMPTPART_SPECIFIC_AGENT_FILEPICK_PURPOSE_CORESTATEMENT,
  capabilities: PROMPTPART_SPECIFIC_AGENT_FILEPICK_CAPABILITIES_LIST,
  
  // Execution pattern
  executionPattern: PROMPTPART_SPECIFIC_AGENT_FILEPICK_EXECUTIONPATTERN_DETAILCONTENT,
  
  // PTRR Steps
  steps: PROMPTPART_SPECIFIC_AGENT_FILEPICK_PTRRSTEPS_LIST,
  
  // Tools used
  tools: PROMPTPART_SPECIFIC_AGENT_FILEPICK_TOOLS_LIST,
  
  // Integration details
  integration: PROMPTPART_SPECIFIC_AGENT_FILEPICK_INTEGRATION_DETAILCONTENT
});
