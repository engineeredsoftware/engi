import { Prompt } from '@bitcode/prompts/prompt';
import { PROMPTPART_SPECIFIC_AGENT_DANGERWALL_SYSTEM_CONTEXT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_dangerwall_system_context';
import { PROMPTPART_SPECIFIC_AGENT_DANGERWALL_EXECUTIONPATTERN_DETAILCONTENT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_dangerwall_executionpattern_detailcontent';
import { PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_failsafe_prepare_context';
import { PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_json_only_header';
import { PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_use_this_structured_schema';
import { PROMPTPART_GENERIC_AGENT_GENERATION_IF_UNKNOWN_EMPTY } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_if_unknown_empty';
import { PROMPTPART_GENERIC_AGENT_GENERATION_REASON } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_reason';
import { PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_judge';
import { PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_structured_output';




/**
 * Bitcode Need Risk Admission Agent - Retry Step Prompt
 * 
 * Recover incomplete Bitcode risk-admission runs by rechecking unresolved need,
 * AssetPack, proof, likely-failure, and delivery-mechanism boundaries.
 * 
 * @doc-comment-developing-promptdevelopment
 * domain: agent
 * intent: "Bitcode RETRY step prompt for need risk-admission"
 * current_version: "V26"
 * versions: [
 *   { "version": "3.0.0", "score": 0.90, "reason": "Migrated to correct Prompt class pattern" },
 *   { "version": "2.0.0", "score": 0.50, "reason": "Used wrong PromptPart concatenation pattern" },
 *   { "version": "1.0.0", "score": 0.40, "reason": "Initial implementation" }
 * ]
 * benchmarks: [
 *   { "name": "retry_effectiveness", "test": "Does the prompt enable effective Bitcode admission retry strategies?", "score": 0.44 },
 *   { "name": "failure_analysis", "test": "Are incomplete admission findings properly analyzed?", "score": 0.45 },
 *   { "name": "recovery_strategy", "test": "Is proof-gap and delivery-boundary recovery clear?", "score": 0.44 }
 * ]
 */

export const DANGER_WALL_RETRY_PROMPT = new Prompt()
  .set('phase', 'RETRY: Recover Bitcode Risk Admission')
  .set('context', PROMPTPART_SPECIFIC_AGENT_DANGERWALL_SYSTEM_CONTEXT)
  .set('execution_pattern', PROMPTPART_SPECIFIC_AGENT_DANGERWALL_EXECUTIONPATTERN_DETAILCONTENT)
  .set('recovery_strategy', 'When Bitcode risk admission is incomplete, analyze missing evidence, unresolved need ambiguity, AssetPack scope mismatch, proof-gap uncertainty, likely execution failure, and delivery-mechanism hazards before admitting or blocking the next phase.')
  .set('generation:json_only_header', PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER)
  .set('generation:use_this_structure', PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA)
  .set('generation:if_unknown_empty', PROMPTPART_GENERIC_AGENT_GENERATION_IF_UNKNOWN_EMPTY)
  .set('generation:reason', PROMPTPART_GENERIC_AGENT_GENERATION_REASON)
  .set('generation:judge', PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE)
  .set('generation:structured_output', PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT)
  .set('failsafe:prepare_context', PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT);
