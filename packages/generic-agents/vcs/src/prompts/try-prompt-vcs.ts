import { PROMPTPART_SPECIFIC_AGENT_VCS_SYSTEM_INSTRUCTIONS } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_vcs_system_instructions';
import { PROMPTPART_SPECIFIC_AGENT_VCS_SYSTEM_CONTEXT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_vcs_system_context';
import { PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_failsafe_prepare_context';
import { PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_json_only_header';
import { PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_use_this_structured_schema';
import { PROMPTPART_GENERIC_AGENT_GENERATION_IF_UNKNOWN_EMPTY } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_if_unknown_empty';
import { PROMPTPART_GENERIC_AGENT_GENERATION_REASON } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_reason';
import { PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_judge';
import { PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_structured_output';
/**\n * @doc-comment-developing-promptdevelopment\n * domain: agent\n * intent: "(fill intent)"\n * current_version: "GA1.50.0"\n * dependencies: { }\n * benchmarks: [\n *   { "name": "technical_accuracy", "test": "Concrete directives and purpose", "score": 0.46 },\n *   { "name": "implementation_ready", "test": "Usable by registry formatter", "score": 0.46 }\n * ]\n */
/**
 * TRY PROMPT COMPOSITION - VCS AGENT
 * 
 * Composed try step prompt for VCS agent using atomic prompt parts.
 * This defines how the agent executes VCS API operations and version control workflows.
 */

import { Prompt } from '@bitcode/prompts/prompt';
// Using general agent capabilities since VCS-specific try parts don't exist yet




export const VCS_TRY_PROMPT = new Prompt()
  .set('instructions', PROMPTPART_SPECIFIC_AGENT_VCS_SYSTEM_INSTRUCTIONS)
  .set('context', PROMPTPART_SPECIFIC_AGENT_VCS_SYSTEM_CONTEXT)
  .set('generation:json_only_header', PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER)
  .set('generation:use_this_structure', PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA)
  .set('generation:if_unknown_empty', PROMPTPART_GENERIC_AGENT_GENERATION_IF_UNKNOWN_EMPTY)
  .set('generation:reason', PROMPTPART_GENERIC_AGENT_GENERATION_REASON)
  .set('generation:judge', PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE)
  .set('generation:structured_output', PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT)
  .set('failsafe:prepare_context', PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT);
