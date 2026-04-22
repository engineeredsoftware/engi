import { PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_REFINE_QUALITY_CRITERIA } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_webresearcher_refine_quality_criteria';
import { PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_REFINE_INFORMATION_ENHANCEMENT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_webresearcher_refine_information_enhancement';
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
 * intent: "Refine step prompt for Web Researcher — improve result quality and enhance information"
 * current_version: "GA1.50.0"
 * dependencies: {
 *   "PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_REFINE_QUALITY_CRITERIA": "GA1.45.0",
 *   "PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_REFINE_INFORMATION_ENHANCEMENT": "GA1.45.0",
 *   "PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT": "GA1.91.0",
 *   "PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER": "GA1.50.0",
 *   "PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA": "GA1.50.0",
 *   "PROMPTPART_GENERIC_AGENT_GENERATION_REASON": "GA1.93.0",
 *   "PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE": "GA1.92.0",
 *   "PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT": "GA1.94.0"
 * }
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Concrete directives and purpose", "score": 0.46 },
 *   { "name": "implementation_ready", "test": "Usable by registry formatter", "score": 0.46 }
 * ]
 */
/**
 * REFINE PROMPT COMPOSITION - WEB RESEARCHER AGENT
 * 
 * Composed refine step prompt for Web Researcher agent using atomic prompt parts.
 * This defines how the agent optimizes research results and enhances information quality.
 */

import { Prompt } from '@bitcode/prompts/prompt';




export const WEB_RESEARCHER_REFINE_PROMPT = new Prompt()
  .set('quality', PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_REFINE_QUALITY_CRITERIA)
  .set('enhancement', PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_REFINE_INFORMATION_ENHANCEMENT)
  .set('generation:json_only_header', PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER)
  .set('generation:use_this_structure', PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA)
  .set('generation:reason', PROMPTPART_GENERIC_AGENT_GENERATION_REASON)
  .set('generation:judge', PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE)
  .set('generation:structured_output', PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT)
  .set('failsafe:prepare_context', PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT);
