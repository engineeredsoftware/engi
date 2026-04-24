import { PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_failsafe_prepare_context';
import { PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_json_only_header';
import { PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_use_this_structured_schema';
import { PROMPTPART_GENERIC_AGENT_GENERATION_IF_UNKNOWN_EMPTY } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_if_unknown_empty';
import { PROMPTPART_GENERIC_AGENT_GENERATION_REASON } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_reason';
import { PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_judge';
import { PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_structured_output';
import { PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDNEED_PURPOSE_CORESTATEMENT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_deliverablesetupcomprehendneed_purpose_corestatement';
import { PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDNEED_CAPABILITIES_LIST } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_deliverablesetupcomprehendneed_capabilities_list';
import { PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDNEED_REQUIREMENTS_CONTEXT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_deliverablesetupcomprehendneed_requirements_context';
import { PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDNEED_TOOLS_AVAILABLE } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_deliverablesetupcomprehendneed_tools_available';
import { PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDNEED_PTRRTRY_PURPOSE } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_deliverablesetupcomprehendneed_ptrrtry_purpose';
import { PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDNEED_PTRRREFINE_PURPOSE } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_deliverablesetupcomprehendneed_ptrrrefine_purpose';
import { PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDNEED_PTRRRETRY_PURPOSE } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_deliverablesetupcomprehendneed_ptrrretry_purpose';
import { PROMPTPART_SPECIFIC_AGENT_DELIVERABLEDISCOVERYCOMPREHENDATTACHMENTS_PTRRREFINE_PURPOSE } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_deliverablediscoverycomprehendattachments_ptrrrefine_purpose';
import { PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDNEED_OUTPUT_DODANALYSIS_SPEC } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_deliverablesetupcomprehendneed_output_dodanalysis_spec';
import { PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDNEED_OUTPUT_ATTACHMENTS_SPEC } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_deliverablesetupcomprehendneed_output_attachments_spec';
import { PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDNEED_OUTPUT_TYPES_SPEC } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_deliverablesetupcomprehendneed_output_types_spec';
import { PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDNEED_PLAN_MODALITY_PDF_STRATEGY } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_deliverablesetupcomprehendneed_plan_modality_pdf_strategy';
import { PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDNEED_PLAN_MODALITY_AUDIO_STRATEGY } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_deliverablesetupcomprehendneed_plan_modality_audio_strategy';
import { PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDNEED_PLAN_MODALITY_VIDEO_STRATEGY } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_deliverablesetupcomprehendneed_plan_modality_video_strategy';
import { PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDNEED_TRY_MODALITY_IMAGE_EXECUTION } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_deliverablesetupcomprehendneed_try_modality_image_execution';
import { PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDNEED_TRY_MODALITY_PDF_EXECUTION } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_deliverablesetupcomprehendneed_try_modality_pdf_execution';
import { PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDNEED_TRY_MODALITY_AUDIO_EXECUTION } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_deliverablesetupcomprehendneed_try_modality_audio_execution';
import { PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDNEED_TRY_MODALITY_VIDEO_EXECUTION } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_deliverablesetupcomprehendneed_try_modality_video_execution';
import { PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDNEED_REFINE_UNIFICATION_GUIDANCE } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_deliverablesetupcomprehendneed_refine_unification_guidance';
/**
 * Deliverables Pipeline – Comprehend Need agent prompts (overlay only)
 *
 * These prompts provide retained-corridor Prompt entries intended to be
 * merged via Prompt.clone().merge() semantics. Where no generic base exists,
 * these overlays can be used directly as the effective prompts.
 */
/**
 * @doc-comment-developing-promptdevelopment
 * domain: agent
 * intent: "Bitcode retained deliverable-corridor overlays for mapping legacy request carriers to Need and AssetPack evidence"
 * current_version: "0.50.0"
  * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Concrete directives and purpose", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Usable by registry formatter", "score": 0.50 }
 * ]
 */

import { Prompt } from '@bitcode/prompts/prompt';
import { PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDNEED_IDENTITY_DEFINITION } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_deliverablesetupcomprehendneed_identity_definition';
import { PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDNEED_PTRRPLAN_PURPOSE } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_deliverablesetupcomprehendneed_ptrrplan_purpose';
import { PROMPTPART_SPECIFIC_AGENT_COMPREHENDATTACHMENTS_PLAN_STRATEGY } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_comprehendattachments_plan_strategy';
import { PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDNEED_PLAN_MODALITY_IMAGE_STRATEGY } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_deliverablesetupcomprehendneed_plan_modality_image_strategy';

export const DP_COMPREHEND_NEED_SYSTEM_PROMPT: Prompt = (() => {
  const p = new Prompt();
  p.set('agent:identity:asset-pack-written-asset:addendum', PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDNEED_IDENTITY_DEFINITION as any);
  p.set('agent:purpose:asset-pack-written-asset:addendum', PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDNEED_PURPOSE_CORESTATEMENT as any);
  p.set('agent:capabilities:asset-pack-written-asset:addendum', PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDNEED_CAPABILITIES_LIST as any);
  p.set('agent:requirements:asset-pack-written-asset:addendum', PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDNEED_REQUIREMENTS_CONTEXT as any);
  p.set('agent:tools:asset-pack-written-asset:addendum', PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDNEED_TOOLS_AVAILABLE as any);
  p.set('pipeline', 'asset-pack-written-asset' as any);
  p.set('pipeline:compatibility', 'deliverables' as any);
  p.set('phase', 'setup' as any);
  p.set('generation:json_only_header', PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER as any);
  p.set('generation:use_this_structure', PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA as any);
  p.set('generation:if_unknown_empty', PROMPTPART_GENERIC_AGENT_GENERATION_IF_UNKNOWN_EMPTY as any);
  p.set('generation:reason', PROMPTPART_GENERIC_AGENT_GENERATION_REASON as any);
  p.set('generation:judge', PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE as any);
  p.set('generation:structured_output', PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT as any);
  p.set('failsafe:prepare_context', PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT as any);
  p.set('generation:json_only_header', PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER as any);
  p.set('generation:use_this_structure', PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA as any);
  p.set('generation:if_unknown_empty', PROMPTPART_GENERIC_AGENT_GENERATION_IF_UNKNOWN_EMPTY as any);
  p.set('generation:reason', PROMPTPART_GENERIC_AGENT_GENERATION_REASON as any);
  p.set('generation:judge', PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE as any);
  p.set('generation:structured_output', PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT as any);
  p.set('failsafe:prepare_context', PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT as any);
  return p;
})();

export const DP_COMPREHEND_NEED_PLAN_PROMPT: Prompt = (() => {
  const p = new Prompt();
  p.set('step:label:asset-pack-written-asset:addendum', PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDNEED_PTRRPLAN_PURPOSE as any);
  p.set('step:details:asset-pack-written-asset:addendum', PROMPTPART_SPECIFIC_AGENT_COMPREHENDATTACHMENTS_PLAN_STRATEGY as any);
  p.set('step:details:asset-pack-written-asset:modality_image', PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDNEED_PLAN_MODALITY_IMAGE_STRATEGY as any);
  p.set('step:details:asset-pack-written-asset:modality_pdf', PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDNEED_PLAN_MODALITY_PDF_STRATEGY as any);
  p.set('step:details:asset-pack-written-asset:modality_audio', PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDNEED_PLAN_MODALITY_AUDIO_STRATEGY as any);
  p.set('step:details:asset-pack-written-asset:modality_video', PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDNEED_PLAN_MODALITY_VIDEO_STRATEGY as any);
  p.set('pipeline', 'asset-pack-written-asset' as any);
  p.set('pipeline:compatibility', 'deliverables' as any);
  p.set('phase', 'setup' as any);
  p.set('generation:json_only_header', PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER as any);
  p.set('generation:use_this_structure', PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA as any);
  p.set('generation:reason', PROMPTPART_GENERIC_AGENT_GENERATION_REASON as any);
  p.set('generation:judge', PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE as any);
  p.set('generation:structured_output', PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT as any);
  p.set('failsafe:prepare_context', PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT as any);
  p.set('generation:json_only_header', PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER as any);
  p.set('generation:use_this_structure', PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA as any);
  p.set('generation:if_unknown_empty', PROMPTPART_GENERIC_AGENT_GENERATION_IF_UNKNOWN_EMPTY as any);
  p.set('generation:reason', PROMPTPART_GENERIC_AGENT_GENERATION_REASON as any);
  p.set('generation:judge', PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE as any);
  p.set('generation:structured_output', PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT as any);
  p.set('failsafe:prepare_context', PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT as any);
  return p;
})();

export const DP_COMPREHEND_NEED_TRY_PROMPT: Prompt = (() => {
  const p = new Prompt();
  p.set('step:label:asset-pack-written-asset:addendum', PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDNEED_PTRRTRY_PURPOSE as any);
  p.set('step:details:asset-pack-written-asset:addendum', PROMPTPART_SPECIFIC_AGENT_COMPREHENDATTACHMENTS_PLAN_STRATEGY as any);
  p.set('step:details:asset-pack-written-asset:modality_image', PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDNEED_TRY_MODALITY_IMAGE_EXECUTION as any);
  p.set('step:details:asset-pack-written-asset:modality_pdf', PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDNEED_TRY_MODALITY_PDF_EXECUTION as any);
  p.set('step:details:asset-pack-written-asset:modality_audio', PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDNEED_TRY_MODALITY_AUDIO_EXECUTION as any);
  p.set('step:details:asset-pack-written-asset:modality_video', PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDNEED_TRY_MODALITY_VIDEO_EXECUTION as any);
  p.set('pipeline', 'asset-pack-written-asset' as any);
  p.set('pipeline:compatibility', 'deliverables' as any);
  p.set('phase', 'setup' as any);
  p.set('generation:json_only_header', PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER as any);
  p.set('generation:use_this_structure', PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA as any);
  p.set('generation:if_unknown_empty', PROMPTPART_GENERIC_AGENT_GENERATION_IF_UNKNOWN_EMPTY as any);
  p.set('generation:reason', PROMPTPART_GENERIC_AGENT_GENERATION_REASON as any);
  p.set('generation:judge', PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE as any);
  p.set('generation:structured_output', PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT as any);
  p.set('failsafe:prepare_context', PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT as any);
  p.set('generation:json_only_header', PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER as any);
  p.set('generation:use_this_structure', PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA as any);
  p.set('generation:if_unknown_empty', PROMPTPART_GENERIC_AGENT_GENERATION_IF_UNKNOWN_EMPTY as any);
  p.set('generation:reason', PROMPTPART_GENERIC_AGENT_GENERATION_REASON as any);
  p.set('generation:judge', PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE as any);
  p.set('generation:structured_output', PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT as any);
  p.set('failsafe:prepare_context', PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT as any);
  return p;
})();

export const DP_COMPREHEND_NEED_REFINE_PROMPT: Prompt = (() => {
  const p = new Prompt();
  p.set('step:label:asset-pack-written-asset:addendum', PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDNEED_PTRRREFINE_PURPOSE as any);
  p.set('step:details:asset-pack-written-asset:addendum', PROMPTPART_SPECIFIC_AGENT_DELIVERABLEDISCOVERYCOMPREHENDATTACHMENTS_PTRRREFINE_PURPOSE as any);
  p.set('step:details:asset-pack-written-asset:addendum_output_dod', PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDNEED_OUTPUT_DODANALYSIS_SPEC as any);
  p.set('step:details:asset-pack-written-asset:addendum_output_attachments', PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDNEED_OUTPUT_ATTACHMENTS_SPEC as any);
  p.set('step:details:asset-pack-written-asset:addendum_output_types', PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDNEED_OUTPUT_TYPES_SPEC as any);
  p.set('step:details:asset-pack-written-asset:unification', PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDNEED_REFINE_UNIFICATION_GUIDANCE as any);
  p.set('pipeline', 'asset-pack-written-asset' as any);
  p.set('pipeline:compatibility', 'deliverables' as any);
  p.set('phase', 'setup' as any);
  p.set('generation:json_only_header', PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER as any);
  p.set('generation:use_this_structure', PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA as any);
  p.set('generation:reason', PROMPTPART_GENERIC_AGENT_GENERATION_REASON as any);
  p.set('generation:judge', PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE as any);
  p.set('generation:structured_output', PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT as any);
  p.set('failsafe:prepare_context', PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT as any);
  p.set('generation:json_only_header', PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER as any);
  p.set('generation:use_this_structure', PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA as any);
  p.set('generation:if_unknown_empty', PROMPTPART_GENERIC_AGENT_GENERATION_IF_UNKNOWN_EMPTY as any);
  p.set('generation:reason', PROMPTPART_GENERIC_AGENT_GENERATION_REASON as any);
  p.set('generation:judge', PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE as any);
  p.set('generation:structured_output', PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT as any);
  p.set('failsafe:prepare_context', PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT as any);
  return p;
})();

export const DP_COMPREHEND_NEED_RETRY_PROMPT: Prompt = (() => {
  const p = new Prompt();
  p.set('step:label:asset-pack-written-asset:addendum', PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDNEED_PTRRRETRY_PURPOSE as any);
  p.set('step:details:asset-pack-written-asset:addendum', PROMPTPART_SPECIFIC_AGENT_COMPREHENDATTACHMENTS_PLAN_STRATEGY as any);
  p.set('pipeline', 'asset-pack-written-asset' as any);
  p.set('pipeline:compatibility', 'deliverables' as any);
  p.set('phase', 'setup' as any);
  p.set('generation:json_only_header', PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER as any);
  p.set('generation:use_this_structure', PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA as any);
  p.set('generation:if_unknown_empty', PROMPTPART_GENERIC_AGENT_GENERATION_IF_UNKNOWN_EMPTY as any);
  p.set('generation:reason', PROMPTPART_GENERIC_AGENT_GENERATION_REASON as any);
  p.set('generation:judge', PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE as any);
  p.set('generation:structured_output', PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT as any);
  p.set('failsafe:prepare_context', PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT as any);
  p.set('generation:json_only_header', PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER as any);
  p.set('generation:use_this_structure', PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA as any);
  p.set('generation:if_unknown_empty', PROMPTPART_GENERIC_AGENT_GENERATION_IF_UNKNOWN_EMPTY as any);
  p.set('generation:reason', PROMPTPART_GENERIC_AGENT_GENERATION_REASON as any);
  p.set('generation:judge', PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE as any);
  p.set('generation:structured_output', PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT as any);
  p.set('failsafe:prepare_context', PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT as any);
  return p;
})();


export const DP_COMPREHEND_NEED_PROMPTS = {
  system: DP_COMPREHEND_NEED_SYSTEM_PROMPT,
  plan: DP_COMPREHEND_NEED_PLAN_PROMPT,
  try: DP_COMPREHEND_NEED_TRY_PROMPT,
  refine: DP_COMPREHEND_NEED_REFINE_PROMPT,
  retry: DP_COMPREHEND_NEED_RETRY_PROMPT,
};
