import { PROMPTPART_SPECIFIC_AGENT_IMAGEPROCESSOR_PURPOSE_CORESTATEMENT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_imageprocessor_purpose_corestatement';
import { PROMPTPART_SPECIFIC_AGENT_IMAGEPROCESSOR_CAPABILITIES_LIST } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_imageprocessor_capabilities_list';
import { PROMPTPART_SPECIFIC_AGENT_IMAGEPROCESSOR_EXECUTIONPATTERN_DETAILCONTENT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_imageprocessor_executionpattern_detailcontent';
import { PROMPTPART_SPECIFIC_AGENT_IMAGEPROCESSOR_PTRRSTEPS_LIST } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_imageprocessor_ptrrsteps_list';
import { PROMPTPART_SPECIFIC_AGENT_IMAGEPROCESSOR_TOOLS_LIST } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_imageprocessor_tools_list';
import { PROMPTPART_SPECIFIC_AGENT_IMAGEPROCESSOR_INTEGRATION_DETAILCONTENT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_imageprocessor_integration_detailcontent';
import { PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_failsafe_prepare_context';
import { PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_json_only_header';
import { PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_use_this_structured_schema';
import { PROMPTPART_GENERIC_AGENT_GENERATION_IF_UNKNOWN_EMPTY } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_if_unknown_empty';
import { PROMPTPART_GENERIC_AGENT_GENERATION_REASON } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_reason';
import { PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_judge';
import { PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_structured_output';
/**\n * @doc-comment-developing-promptdevelopment\n * domain: agent\n * intent: "(fill intent)"\n * current_version: "V26.45.0"\n * dependencies: { }\n * benchmarks: [\n *   { "name": "technical_accuracy", "test": "Concrete directives and purpose", "score": 0.46 },\n *   { "name": "implementation_ready", "test": "Usable by registry formatter", "score": 0.46 }\n * ]\n */
/**
 * AGENT PROMPT COMPOSITION - IMAGE PROCESSOR AGENT
 * 
 * Composed AgentPrompt for Image Processor agent using atomic prompt parts.
 * This agent implements visual processing with multi-feature pattern recognition
 * and computer vision processing capabilities.
 * 
 * @doc-code-prompt
 * purpose: Define structured documentation for Image Processor agent
 * agent: image-processor
 * pattern: Computer vision with multi-feature pattern recognition
 */

import { Prompt } from '@bitcode/prompts/prompt';








export const IMAGE_PROCESSOR_AGENT_PROMPT = new Prompt()
  .set('purpose', PROMPTPART_SPECIFIC_AGENT_IMAGEPROCESSOR_PURPOSE_CORESTATEMENT)
  .set('capabilities', PROMPTPART_SPECIFIC_AGENT_IMAGEPROCESSOR_CAPABILITIES_LIST)
  .set('execution', PROMPTPART_SPECIFIC_AGENT_IMAGEPROCESSOR_EXECUTIONPATTERN_DETAILCONTENT)
  .set('steps', PROMPTPART_SPECIFIC_AGENT_IMAGEPROCESSOR_PTRRSTEPS_LIST)
  .set('tools', PROMPTPART_SPECIFIC_AGENT_IMAGEPROCESSOR_TOOLS_LIST)
  .set('integration', PROMPTPART_SPECIFIC_AGENT_IMAGEPROCESSOR_INTEGRATION_DETAILCONTENT);
