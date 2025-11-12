import { Prompt } from '@engi/prompts';
import { PROMPTPART_SPECIFIC_AGENT_FIGMAPROCESSOR_PURPOSE_CORESTATEMENT } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_agent_figmaprocessor_purpose_corestatement';
import { PROMPTPART_SPECIFIC_AGENT_FIGMAPROCESSOR_SYSTEM_CONTEXT } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_agent_figmaprocessor_system_context';
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
 * intent: "REFINE step prompt for Figma Processor agent"
 * current_version: "GA1.50.0"
 * versions: ["2.0.0", "1.0.0"]
 * benchmarks: [
 *   { "name": "refinement_quality", "test": "Does the prompt enable effective design processing refinement? Rate 0-1", "score": 0.87 },
 *   { "name": "accuracy_improvement", "test": "Are design processing results improved through refinement? Rate 0-1", "score": 0.89 },
 *   { "name": "completeness_enhancement", "test": "Is design processing completeness enhanced? Rate 0-1", "score": 0.88 }
 * ]
 */
export const FIGMA_PROCESSOR_REFINE_PROMPT = new Prompt()
  .set('header', 'REFINE: Enhance Design Processing')
  .set('purpose', PROMPTPART_SPECIFIC_AGENT_FIGMAPROCESSOR_PURPOSE_CORESTATEMENT)
  .set('context', PROMPTPART_SPECIFIC_AGENT_FIGMAPROCESSOR_SYSTEM_CONTEXT)
  .set('instructions', 'Refine design processing results by improving accuracy of component extraction, enhancing completeness of asset analysis, and strengthening output structure and design metadata quality.')
  .set('generation:json_only_header', PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER)
  .set('generation:use_this_structure', PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA)
  .set('generation:reason', PROMPTPART_GENERIC_AGENT_GENERATION_REASON)
  .set('generation:judge', PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE)
  .set('generation:structured_output', PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT)
  .set('failsafe:prepare_context', PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT);
