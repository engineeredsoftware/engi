import { Prompt } from '@engi/prompts';
import { PROMPTPART_SPECIFIC_AGENT_FILEPICK_SYSTEM_IDENTITY } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_agent_filepick_system_identity';
import { PROMPTPART_SPECIFIC_AGENT_FILEPICK_SYSTEM_ROLE } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_agent_filepick_system_role';
import { PROMPTPART_SPECIFIC_AGENT_FILEPICK_SYSTEM_INSTRUCTIONS } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_agent_filepick_system_instructions';
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
 * intent: "System prompt for File Pick agent"
 * current_version: "GA1.50.0"
 * versions: ["2.0.0", "1.0.0"]
 * benchmarks: [
 *   { "name": "system_coherence", "test": "Does the system prompt provide coherent instructions? Rate 0-1", "score": 0.93 },
 *   { "name": "selection_completeness", "test": "Does it cover all file selection requirements? Rate 0-1", "score": 0.92 },
 *   { "name": "operational_clarity", "test": "Are operational boundaries and capabilities clearly defined? Rate 0-1", "score": 0.91 }
 * ]
 */
export const FILE_PICK_SYSTEM_PROMPT = new Prompt()
  .set('identity', PROMPTPART_SPECIFIC_AGENT_FILEPICK_SYSTEM_IDENTITY)
  .set('role', PROMPTPART_SPECIFIC_AGENT_FILEPICK_SYSTEM_ROLE)
  .set('instructions', PROMPTPART_SPECIFIC_AGENT_FILEPICK_SYSTEM_INSTRUCTIONS)
  .set('generation:json_only_header', PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER)
  .set('generation:use_this_structure', PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA)
  .set('generation:if_unknown_empty', PROMPTPART_GENERIC_AGENT_GENERATION_IF_UNKNOWN_EMPTY)
  .set('generation:reason', PROMPTPART_GENERIC_AGENT_GENERATION_REASON)
  .set('generation:judge', PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE)
  .set('generation:structured_output', PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT)
  .set('failsafe:prepare_context', PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT);
