import { PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_failsafe_prepare_context';
import { PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_json_only_header';
import { PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_use_this_structured_schema';
import { PROMPTPART_GENERIC_AGENT_GENERATION_IF_UNKNOWN_EMPTY } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_if_unknown_empty';
import { PROMPTPART_GENERIC_AGENT_GENERATION_REASON } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_reason';
import { PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_judge';
import { PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_structured_output';
import { PROMPTPART_SPECIFIC_AGENT_MCPSINITIALIZER_TRY_DIRECTIVES_INSTRUCTIONS } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_mcpsinitializer_try_directives_instructions';
import { PROMPTPART_SPECIFIC_AGENT_MCPSINITIALIZER_TRY_PROTOCOL_SETUP } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_mcpsinitializer_try_protocol_setup';
/**
 * @doc-comment-developing-promptdevelopment
 * domain: agent
 * intent: "Try step for MCPS Initializer: execute MCP protocol initialization and server setup"
 * current_version: "GA1.50.0"
 * dependencies: {
 *   "PROMPTPART_SPECIFIC_AGENT_MCPSINITIALIZER_TRY_DIRECTIVES_INSTRUCTIONS": "GA1.00.0",
 *   "PROMPTPART_SPECIFIC_AGENT_MCPSINITIALIZER_TRY_PROTOCOL_SETUP": "GA1.00.0"
 * }
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Concrete directives and purpose", "score": 0.46 },
 *   { "name": "implementation_ready", "test": "Usable by registry formatter", "score": 0.46 }
 * ]
 */

import { Prompt } from '@bitcode/prompts';




export const MCPS_INITIALIZER_TRY_PROMPT = new Prompt()
  .set('instructions', PROMPTPART_SPECIFIC_AGENT_MCPSINITIALIZER_TRY_DIRECTIVES_INSTRUCTIONS)
  .set('setup', PROMPTPART_SPECIFIC_AGENT_MCPSINITIALIZER_TRY_PROTOCOL_SETUP)
  .set('generation:json_only_header', PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER)
  .set('generation:use_this_structure', PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA)
  .set('generation:if_unknown_empty', PROMPTPART_GENERIC_AGENT_GENERATION_IF_UNKNOWN_EMPTY)
  .set('generation:reason', PROMPTPART_GENERIC_AGENT_GENERATION_REASON)
  .set('generation:judge', PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE)
  .set('generation:structured_output', PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT)
  .set('failsafe:prepare_context', PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT);
