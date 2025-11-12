import { Prompt } from '@engi/prompts';
import { PROMPTPART_SPECIFIC_AGENT_DANGERWALL_SYSTEM_CONTEXT } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_agent_dangerwall_system_context';
import { PROMPTPART_SPECIFIC_AGENT_DANGERWALL_EXECUTIONPATTERN_DETAILCONTENT } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_agent_dangerwall_executionpattern_detailcontent';
import { PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_agent_failsafe_prepare_context';
import { PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_json_only_header';
import { PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_use_this_structured_schema';
import { PROMPTPART_GENERIC_AGENT_GENERATION_IF_UNKNOWN_EMPTY } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_if_unknown_empty';
import { PROMPTPART_GENERIC_AGENT_GENERATION_REASON } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_reason';
import { PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_judge';
import { PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_structured_output';




/**
 * Danger Wall Agent - Retry Step Prompt
 * 
 * Recovery phase for security validation failures and enhanced threat detection.
 * 
 * @doc-comment-developing-promptdevelopment
 * domain: agent
 * intent: "RETRY step prompt for Danger Wall agent"
 * current_version: "GA1.50.0"
 * versions: [
 *   { "version": "3.0.0", "score": 0.90, "reason": "Migrated to correct Prompt class pattern" },
 *   { "version": "2.0.0", "score": 0.50, "reason": "Used wrong PromptPart concatenation pattern" },
 *   { "version": "1.0.0", "score": 0.40, "reason": "Initial implementation" }
 * ]
 * benchmarks: [
 *   { "name": "retry_effectiveness", "test": "Does the prompt enable effective security retry strategies?", "score": 0.44 },
 *   { "name": "failure_analysis", "test": "Are security validation failures properly analyzed?", "score": 0.45 },
 *   { "name": "recovery_strategy", "test": "Is security validation recovery strategy clear?", "score": 0.44 }
 * ]
 */

export const DANGER_WALL_RETRY_PROMPT = new Prompt()
  .set('phase', 'RETRY: Recover Security Validation')
  .set('context', PROMPTPART_SPECIFIC_AGENT_DANGERWALL_SYSTEM_CONTEXT)
  .set('execution_pattern', PROMPTPART_SPECIFIC_AGENT_DANGERWALL_EXECUTIONPATTERN_DETAILCONTENT)
  .set('recovery_strategy', 'When security validation fails, analyze failure patterns, adjust security scanning parameters, select alternative validation tools, and implement enhanced threat detection strategies.')
  .set('generation:json_only_header', PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER)
  .set('generation:use_this_structure', PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA)
  .set('generation:if_unknown_empty', PROMPTPART_GENERIC_AGENT_GENERATION_IF_UNKNOWN_EMPTY)
  .set('generation:reason', PROMPTPART_GENERIC_AGENT_GENERATION_REASON)
  .set('generation:judge', PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE)
  .set('generation:structured_output', PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT)
  .set('failsafe:prepare_context', PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT);
