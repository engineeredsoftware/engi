import { PROMPTPART_SPECIFIC_AGENT_DANGERWALL_PLAN_INSTRUCTIONS } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_dangerwall_plan_instructions';
import { PROMPTPART_SPECIFIC_AGENT_DANGERWALL_PLAN_ANALYSIS_APPROACH } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_dangerwall_plan_analysis_approach';
import { PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_failsafe_prepare_context';
import { PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_json_only_header';
import { PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_use_this_structured_schema';
import { PROMPTPART_GENERIC_AGENT_GENERATION_IF_UNKNOWN_EMPTY } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_if_unknown_empty';
import { PROMPTPART_GENERIC_AGENT_GENERATION_REASON } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_reason';
import { PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_judge';
import { PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_structured_output';
/**
 * Bitcode Need Risk Admission Agent - Plan Step Prompt
 * 
 * Plan risk-admission evidence for a Bitcode need, candidate written assets,
 * AssetPack scope, proof gaps, and delivery-wrapper boundary.
 * 
 * @doc-comment-developing-promptdevelopment
 * domain: agent
 * intent: "Bitcode PLAN step prompt for need risk-admission"
 * current_version: "V26"
 * versions: [
 *   { "version": "2.0.0", "score": 0.90, "reason": "Used wrong PromptPart concatenation pattern" },
 *   { "version": "1.0.0", "score": 0.50, "reason": "Initial implementation" }
 * ]
 * benchmarks: [
 *   { "name": "planning_clarity", "test": "Does the prompt enable clear Bitcode risk-admission planning?", "score": 0.45 },
 *   { "name": "need_boundary", "test": "Is need and AssetPack scope admission well-defined?", "score": 0.44 },
 *   { "name": "proof_boundary", "test": "Can proof-gap and delivery-wrapper boundaries be identified?", "score": 0.45 }
 * ]
 */

import { Prompt } from '@bitcode/prompts/prompt';




export const DANGER_WALL_PLAN_PROMPT = new Prompt()
  .set('phase', 'PLAN: Bitcode Risk Admission Strategy')
  .set('instructions', PROMPTPART_SPECIFIC_AGENT_DANGERWALL_PLAN_INSTRUCTIONS)
  .set('analysis_approach', PROMPTPART_SPECIFIC_AGENT_DANGERWALL_PLAN_ANALYSIS_APPROACH)
  .set('generation:json_only_header', PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER)
  .set('generation:use_this_structure', PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA)
  .set('generation:reason', PROMPTPART_GENERIC_AGENT_GENERATION_REASON)
  .set('generation:judge', PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE)
  .set('generation:structured_output', PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT)
  .set('failsafe:prepare_context', PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT);
