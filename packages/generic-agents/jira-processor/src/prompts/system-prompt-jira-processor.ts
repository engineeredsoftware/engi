import { PROMPTPART_SPECIFIC_AGENT_JIRA_PROCESSOR_SYSTEM_IDENTITY } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_agent_jira_processor_system_identity';
import { PROMPTPART_SPECIFIC_AGENT_JIRA_PROCESSOR_SYSTEM_ROLE } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_agent_jira_processor_system_role';
import { PROMPTPART_SPECIFIC_AGENT_JIRA_PROCESSOR_SYSTEM_INSTRUCTIONS } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_agent_jira_processor_system_instructions';
import { PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_agent_failsafe_prepare_context';
import { PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_json_only_header';
import { PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_use_this_structured_schema';
import { PROMPTPART_GENERIC_AGENT_GENERATION_IF_UNKNOWN_EMPTY } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_if_unknown_empty';
import { PROMPTPART_GENERIC_AGENT_GENERATION_REASON } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_reason';
import { PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_judge';
import { PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_structured_output';
/**
 * Jira Processor Agent - System Prompt
 * 
 * System-level configuration for jira-processor operations.
 * 
 * @doc-comment-developing-promptdevelopment
 * domain: agent
 * intent: "System prompt for Jira Processor agent"
 * current_version: "GA1.50.0"
 * versions: [
 *   { "version": "1.0.0", "score": 0.45, "reason": "Initial implementation with industrial language" }
 * ]
 * benchmarks: [
 *   { "name": "system_coherence", "test": "Does the system prompt provide coherent instructions?", "score": 0.45 },
 *   { "name": "completeness", "test": "Does it cover all requirements?", "score": 0.45 },
 *   { "name": "operational_clarity", "test": "Are operational boundaries and capabilities clearly defined?", "score": 0.45 }
 * ]
 */

import { Prompt } from '@engi/prompts';





export const JIRA_PROCESSOR_SYSTEM_PROMPT = new Prompt()
  .set('identity', PROMPTPART_SPECIFIC_AGENT_JIRA_PROCESSOR_SYSTEM_IDENTITY)
  .set('role', PROMPTPART_SPECIFIC_AGENT_JIRA_PROCESSOR_SYSTEM_ROLE)
  .set('instructions', PROMPTPART_SPECIFIC_AGENT_JIRA_PROCESSOR_SYSTEM_INSTRUCTIONS)
  .set('generation:json_only_header', PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER)
  .set('generation:use_this_structure', PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA)
  .set('generation:if_unknown_empty', PROMPTPART_GENERIC_AGENT_GENERATION_IF_UNKNOWN_EMPTY)
  .set('generation:reason', PROMPTPART_GENERIC_AGENT_GENERATION_REASON)
  .set('generation:judge', PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE)
  .set('generation:structured_output', PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT)
  .set('failsafe:prepare_context', PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT);
