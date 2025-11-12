import { PROMPTPART_SPECIFIC_AGENT_CODESEARCHER_SYSTEM_IDENTITY } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_agent_codesearcher_system_identity';
import { PROMPTPART_SPECIFIC_AGENT_CODESEARCHER_SYSTEM_ROLE } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_agent_codesearcher_system_role';
import { PROMPTPART_SPECIFIC_AGENT_CODESEARCHER_SYSTEM_CONTEXT } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_agent_codesearcher_system_context';
import { PROMPTPART_SPECIFIC_AGENT_CODESEARCHER_SYSTEM_INSTRUCTIONS } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_agent_codesearcher_system_instructions';
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
 * intent: "System prompt for Code Searcher agent: identity, role, context, instructions"
 * current_version: "GA1.50.0"
 * dependencies: {
 *   "PROMPTPART_SPECIFIC_AGENT_CODESEARCHER_SYSTEM_IDENTITY": "GA1.00.0",
 *   "PROMPTPART_SPECIFIC_AGENT_CODESEARCHER_SYSTEM_ROLE": "GA1.00.0",
 *   "PROMPTPART_SPECIFIC_AGENT_CODESEARCHER_SYSTEM_CONTEXT": "GA1.00.0",
 *   "PROMPTPART_SPECIFIC_AGENT_CODESEARCHER_SYSTEM_INSTRUCTIONS": "GA1.00.0"
 * }
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Concrete directives and purpose", "score": 0.46 },
 *   { "name": "implementation_ready", "test": "Usable by registry formatter", "score": 0.46 }
 * ]
 */

import { Prompt } from '@engi/prompts';






export const CODE_SEARCHER_SYSTEM_PROMPT = new Prompt()
  .set('identity', PROMPTPART_SPECIFIC_AGENT_CODESEARCHER_SYSTEM_IDENTITY)
  .set('role', PROMPTPART_SPECIFIC_AGENT_CODESEARCHER_SYSTEM_ROLE)
  .set('context', PROMPTPART_SPECIFIC_AGENT_CODESEARCHER_SYSTEM_CONTEXT)
  .set('instructions', PROMPTPART_SPECIFIC_AGENT_CODESEARCHER_SYSTEM_INSTRUCTIONS)
  .set('generation:json_only_header', PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER)
  .set('generation:use_this_structure', PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA)
  .set('generation:if_unknown_empty', PROMPTPART_GENERIC_AGENT_GENERATION_IF_UNKNOWN_EMPTY)
  .set('generation:reason', PROMPTPART_GENERIC_AGENT_GENERATION_REASON)
  .set('generation:judge', PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE)
  .set('generation:structured_output', PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT)
  .set('failsafe:prepare_context', PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT);
