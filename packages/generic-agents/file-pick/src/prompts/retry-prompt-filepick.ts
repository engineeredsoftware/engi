import { Prompt } from '@bitcode/prompts/prompt';
import { PROMPTPART_SPECIFIC_AGENT_FILEPICK_SYSTEM_CONTEXT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_filepick_system_context';
import { PROMPTPART_SPECIFIC_AGENT_FILEPICK_EXECUTIONPATTERN_DETAILCONTENT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_filepick_executionpattern_detailcontent';
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
 * intent: "RETRY step prompt for File Pick agent"
 * current_version: "V26.50.0"
 * versions: ["2.0.0", "1.0.0"]
 * benchmarks: [
 *   { "name": "retry_effectiveness", "test": "Does the prompt enable effective file selection retry strategies? Rate 0-1", "score": 0.87 },
 *   { "name": "failure_analysis", "test": "Are file selection failures properly analyzed? Rate 0-1", "score": 0.89 },
 *   { "name": "recovery_strategy", "test": "Is file selection recovery strategy clear? Rate 0-1", "score": 0.88 }
 * ]
 */
export const FILE_PICK_RETRY_PROMPT = new Prompt()
  .set('header', 'RETRY: Recover File Selection')
  .set('context', PROMPTPART_SPECIFIC_AGENT_FILEPICK_SYSTEM_CONTEXT)
  .set('execution_pattern', PROMPTPART_SPECIFIC_AGENT_FILEPICK_EXECUTIONPATTERN_DETAILCONTENT)
  .set('recovery_instructions', 'When file selection fails, analyze failure patterns, adjust selection parameters, select alternative filtering methods, and implement enhanced pattern matching strategies.')
  .set('generation:json_only_header', PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER)
  .set('generation:use_this_structure', PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA)
  .set('generation:if_unknown_empty', PROMPTPART_GENERIC_AGENT_GENERATION_IF_UNKNOWN_EMPTY)
  .set('generation:reason', PROMPTPART_GENERIC_AGENT_GENERATION_REASON)
  .set('generation:judge', PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE)
  .set('generation:structured_output', PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT)
  .set('failsafe:prepare_context', PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT);
