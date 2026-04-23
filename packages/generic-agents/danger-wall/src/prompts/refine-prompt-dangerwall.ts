import { Prompt } from '@bitcode/prompts/prompt';
import { PROMPTPART_SPECIFIC_AGENT_DANGERWALL_PURPOSE_CORESTATEMENT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_dangerwall_purpose_corestatement';
import { PROMPTPART_SPECIFIC_AGENT_DANGERWALL_CAPABILITIES_LIST } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_dangerwall_capabilities_list';
import { PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_failsafe_prepare_context';
import { PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_json_only_header';
import { PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_use_this_structured_schema';
import { PROMPTPART_GENERIC_AGENT_GENERATION_IF_UNKNOWN_EMPTY } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_if_unknown_empty';
import { PROMPTPART_GENERIC_AGENT_GENERATION_REASON } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_reason';
import { PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_judge';
import { PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_structured_output';




/**
 * Bitcode Need Risk Admission Agent - Refine Step Prompt
 * 
 * Refine Bitcode risk-admission findings, false positives, proof gaps, and
 * delivery-boundary ambiguity before the next phase is admitted.
 * 
 * @doc-comment-developing-promptdevelopment
 * domain: agent
 * intent: "Bitcode REFINE step prompt for need risk-admission"
 * current_version: "V26"
 * versions: [
 *   { "version": "3.0.0", "score": 0.90, "reason": "Migrated to correct Prompt class pattern" },
 *   { "version": "2.0.0", "score": 0.50, "reason": "Used wrong PromptPart concatenation pattern" },
 *   { "version": "1.0.0", "score": 0.40, "reason": "Initial implementation" }
 * ]
 * benchmarks: [
 *   { "name": "refinement_quality", "test": "Does the prompt enable effective Bitcode admission refinement?", "score": 0.44 },
 *   { "name": "accuracy_improvement", "test": "Are need and AssetPack risk findings improved through refinement?", "score": 0.45 },
 *   { "name": "completeness_enhancement", "test": "Are proof-gap and delivery-boundary checks improved?", "score": 0.45 }
 * ]
 */

export const DANGER_WALL_REFINE_PROMPT = new Prompt()
  .set('phase', 'REFINE: Enhance Bitcode Risk Admission')
  .set('purpose', PROMPTPART_SPECIFIC_AGENT_DANGERWALL_PURPOSE_CORESTATEMENT)
  .set('capabilities', PROMPTPART_SPECIFIC_AGENT_DANGERWALL_CAPABILITIES_LIST)
  .set('refinement_goals', 'Refine Bitcode risk-admission results by improving evidence traceability, removing false positives, surfacing proof gaps, and preserving need, AssetPack, and delivery-wrapper boundaries.')
  .set('generation:json_only_header', PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER)
  .set('generation:use_this_structure', PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA)
  .set('generation:reason', PROMPTPART_GENERIC_AGENT_GENERATION_REASON)
  .set('generation:judge', PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE)
  .set('generation:structured_output', PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT)
  .set('failsafe:prepare_context', PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT);
