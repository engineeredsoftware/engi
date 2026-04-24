import { Prompt } from '@bitcode/prompts/prompt';
import { PROMPTPART_SPECIFIC_AGENT_DANGERWALL_SYSTEM_IDENTITY } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_dangerwall_system_identity';
import { PROMPTPART_SPECIFIC_AGENT_DANGERWALL_SYSTEM_ROLE } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_dangerwall_system_role';
import { PROMPTPART_SPECIFIC_AGENT_DANGERWALL_SYSTEM_INSTRUCTIONS } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_dangerwall_system_instructions';
import { PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_failsafe_prepare_context';
import { PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_json_only_header';
import { PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_use_this_structured_schema';
import { PROMPTPART_GENERIC_AGENT_GENERATION_IF_UNKNOWN_EMPTY } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_if_unknown_empty';
import { PROMPTPART_GENERIC_AGENT_GENERATION_REASON } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_reason';
import { PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_judge';
import { PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_structured_output';





/**
 * Bitcode Need Risk Admission Agent - System Prompt
 * 
 * System-level configuration for retained danger-wall compatibility as Bitcode
 * need, AssetPack, proof-gap, likely-failure, and delivery-mechanism risk admission.
 * 
 * @doc-comment-developing-promptdevelopment
 * domain: agent
 * intent: "Bitcode system prompt for need risk-admission"
 * current_version: "V26"
 * versions: [
 *   { "version": "3.0.0", "score": 0.90, "reason": "Migrated to correct Prompt class pattern" },
 *   { "version": "2.0.0", "score": 0.50, "reason": "Used wrong PromptPart concatenation pattern" },
 *   { "version": "1.0.0", "score": 0.40, "reason": "Initial implementation" }
 * ]
 * benchmarks: [
 *   { "name": "system_coherence", "test": "Does the system prompt provide coherent Bitcode admission instructions?", "score": 0.47 },
 *   { "name": "risk_completeness", "test": "Does it cover need, AssetPack, proof, and delivery risk boundaries?", "score": 0.47 },
 *   { "name": "operational_clarity", "test": "Are non-ownership boundaries clearly defined?", "score": 0.46 }
 * ]
 */

export const DANGER_WALL_SYSTEM_PROMPT = new Prompt()
  .set('identity', PROMPTPART_SPECIFIC_AGENT_DANGERWALL_SYSTEM_IDENTITY)
  .set('role', PROMPTPART_SPECIFIC_AGENT_DANGERWALL_SYSTEM_ROLE)
  .set('instructions', PROMPTPART_SPECIFIC_AGENT_DANGERWALL_SYSTEM_INSTRUCTIONS)
  .set('generation:json_only_header', PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER)
  .set('generation:use_this_structure', PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA)
  .set('generation:if_unknown_empty', PROMPTPART_GENERIC_AGENT_GENERATION_IF_UNKNOWN_EMPTY)
  .set('generation:reason', PROMPTPART_GENERIC_AGENT_GENERATION_REASON)
  .set('generation:judge', PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE)
  .set('generation:structured_output', PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT)
  .set('failsafe:prepare_context', PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT);
