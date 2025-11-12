import { PROMPTPART_SPECIFIC_AGENT_DOCUMENTPROCESSOR_PURPOSE_CORESTATEMENT } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_agent_documentprocessor_purpose_corestatement';
import { PROMPTPART_SPECIFIC_AGENT_DOCUMENTPROCESSOR_CAPABILITIES_LIST } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_agent_documentprocessor_capabilities_list';
import { PROMPTPART_SPECIFIC_AGENT_DOCUMENTPROCESSOR_EXECUTIONPATTERN_DETAILCONTENT } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_agent_documentprocessor_executionpattern_detailcontent';
import { PROMPTPART_SPECIFIC_AGENT_DOCUMENTPROCESSOR_PTRRSTEPS_LIST } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_agent_documentprocessor_ptrrsteps_list';
import { PROMPTPART_SPECIFIC_AGENT_DOCUMENTPROCESSOR_TOOLS_LIST } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_agent_documentprocessor_tools_list';
import { PROMPTPART_SPECIFIC_AGENT_DOCUMENTPROCESSOR_INTEGRATION_DETAILCONTENT } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_agent_documentprocessor_integration_detailcontent';
import { PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_agent_failsafe_prepare_context';
import { PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_json_only_header';
import { PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_use_this_structured_schema';
import { PROMPTPART_GENERIC_AGENT_GENERATION_IF_UNKNOWN_EMPTY } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_if_unknown_empty';
import { PROMPTPART_GENERIC_AGENT_GENERATION_REASON } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_reason';
import { PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_judge';
import { PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_structured_output';
/**\n * @doc-comment-developing-promptdevelopment\n * domain: agent\n * intent: "(fill intent)"\n * current_version: "GA1.45.0"\n * dependencies: { }\n * benchmarks: [\n *   { "name": "technical_accuracy", "test": "Concrete directives and purpose", "score": 0.46 },\n *   { "name": "implementation_ready", "test": "Usable by registry formatter", "score": 0.46 }\n * ]\n */
/**
 * AGENT PROMPT COMPOSITION - DOCUMENT PROCESSOR AGENT
 * 
 * Composed AgentPrompt for Document Processor agent using atomic prompt parts.
 * This agent specializes in processing and extracting structured information
 * from various document formats with pattern recognition and parsing.
 * 
 * @doc-code-prompt
 * purpose: Define structured documentation for Document Processor agent
 * agent: document-processor
 * pattern: Document parsing with format detection and extraction
 */

import { AgentPrompt } from '@engi/agent-generics';








export const DOCUMENT_PROCESSOR_AGENT_PROMPT = new AgentPrompt({
  // Metadata
  name: 'Document Processor Agent',
  category: 'Document Processing',
  version: '1.0.0',
  specificity: 'Generic',
  
  // Core documentation
  purpose: PROMPTPART_SPECIFIC_AGENT_DOCUMENTPROCESSOR_PURPOSE_CORESTATEMENT,
  capabilities: PROMPTPART_SPECIFIC_AGENT_DOCUMENTPROCESSOR_CAPABILITIES_LIST,
  
  // Execution pattern
  executionPattern: PROMPTPART_SPECIFIC_AGENT_DOCUMENTPROCESSOR_EXECUTIONPATTERN_DETAILCONTENT,
  
  // PTRR Steps
  steps: PROMPTPART_SPECIFIC_AGENT_DOCUMENTPROCESSOR_PTRRSTEPS_LIST,
  
  // Tools used
  tools: PROMPTPART_SPECIFIC_AGENT_DOCUMENTPROCESSOR_TOOLS_LIST,
  
  // Integration details
  integration: PROMPTPART_SPECIFIC_AGENT_DOCUMENTPROCESSOR_INTEGRATION_DETAILCONTENT
});
