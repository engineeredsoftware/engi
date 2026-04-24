import { PROMPTPART_SPECIFIC_AGENT_VIDEOPROCESSOR_PURPOSE_CORESTATEMENT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_videoprocessor_purpose_corestatement';
import { PROMPTPART_SPECIFIC_AGENT_VIDEOPROCESSOR_CAPABILITIES_LIST } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_videoprocessor_capabilities_list';
import { PROMPTPART_SPECIFIC_AGENT_VIDEOPROCESSOR_EXECUTIONPATTERN_DETAILCONTENT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_videoprocessor_executionpattern_detailcontent';
import { PROMPTPART_SPECIFIC_AGENT_VIDEOPROCESSOR_PTRRSTEPS_LIST } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_videoprocessor_ptrrsteps_list';
import { PROMPTPART_SPECIFIC_AGENT_VIDEOPROCESSOR_TOOLS_LIST } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_videoprocessor_tools_list';
import { PROMPTPART_SPECIFIC_AGENT_VIDEOPROCESSOR_INTEGRATION_DETAILCONTENT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_videoprocessor_integration_detailcontent';
import { PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_failsafe_prepare_context';
import { PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_json_only_header';
import { PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_use_this_structured_schema';
import { PROMPTPART_GENERIC_AGENT_GENERATION_IF_UNKNOWN_EMPTY } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_if_unknown_empty';
import { PROMPTPART_GENERIC_AGENT_GENERATION_REASON } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_reason';
import { PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_judge';
import { PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_structured_output';
/**\n * @doc-comment-developing-promptdevelopment\n * domain: agent\n * intent: "(fill intent)"\n * current_version: "V26.45.0"\n * dependencies: { }\n * benchmarks: [\n *   { "name": "technical_accuracy", "test": "Concrete directives and purpose", "score": 0.46 },\n *   { "name": "implementation_ready", "test": "Usable by registry formatter", "score": 0.46 }\n * ]\n */
/**
 * AGENT PROMPT COMPOSITION - VIDEO PROCESSOR AGENT
 * 
 * Composed AgentPrompt for Video Processor agent using atomic prompt parts.
 * This agent provides comprehensive video analysis, processing, and optimization
 * capabilities through FFmpeg integration and computer vision techniques.
 * 
 * @doc-code-prompt
 * purpose: Define structured documentation for Video Processor agent
 * agent: video-processor
 * pattern: Video processing through FFmpeg and computer vision analysis
 */

import { AgentPrompt } from '@bitcode/agent-generics';








export const VIDEO_PROCESSOR_AGENT_PROMPT = new AgentPrompt({
  // Metadata
  name: 'Video Processor Agent',
  category: 'Multimedia Processing',
  version: '1.0.0',
  specificity: 'Generic',
  
  // Core documentation
  purpose: PROMPTPART_SPECIFIC_AGENT_VIDEOPROCESSOR_PURPOSE_CORESTATEMENT,
  capabilities: PROMPTPART_SPECIFIC_AGENT_VIDEOPROCESSOR_CAPABILITIES_LIST,
  
  // Execution pattern
  executionPattern: PROMPTPART_SPECIFIC_AGENT_VIDEOPROCESSOR_EXECUTIONPATTERN_DETAILCONTENT,
  
  // PTRR Steps
  steps: PROMPTPART_SPECIFIC_AGENT_VIDEOPROCESSOR_PTRRSTEPS_LIST,
  
  // Tools used
  tools: PROMPTPART_SPECIFIC_AGENT_VIDEOPROCESSOR_TOOLS_LIST,
  
  // Integration details
  integration: PROMPTPART_SPECIFIC_AGENT_VIDEOPROCESSOR_INTEGRATION_DETAILCONTENT
});
