/**
 * PROMPTS PACKAGE - REGISTRY-BASED PROMPT COMPOSITION
 * 
 * This package provides the foundational prompt system for Engi:
 * - PromptPart: Branded string type for type-safe prompts
 * - Prompt: Registry-based prompt composition
 * - Formatters: Transform prompt registries to strings
 * - Primitives: Core prompt building blocks
 * 
 * version: 1.0.0
 * pattern: registry-composition
 * philosophy: "Prompts are the language through which intelligence flows"
 * 
 * ARCHITECTURAL PRINCIPLES:
 * 1. Barrel Exports for PromptParts - Import PromptParts from package root
 * 2. Registry Pattern - Prompts compose through hierarchical registries
 * 3. Type Safety - PromptPart prevents string pollution
 * 4. Pure Functions - All formatters are pure transformations
 */

// ==================== CORE TYPES ====================
export type { PromptPart } from './parts/PromptPart';
export {
  createPromptPart,
  isPromptPart,
  EMPTY_PROMPT_PART
} from './parts/PromptPart';

// ==================== PROMPT REGISTRY ====================
export {
  Prompt,
  createPrompt
} from './prompt';

// ==================== FORMATTERS ====================
export {
  hierarchicalFormatter
} from './formatters';

// ==================== COMPOSITIONS ====================
// Note: Compositions will be added when implemented
// export * from './compositions';

// Type exports
export type { PromptFormatter } from './prompt';

// ==================== DOCUMENTATION ====================
/**
 * USAGE GUIDELINES:
 * 
 * 1. For raw prompts, import directly:
 *    import { PROMPT_NAME } from '@bitcode/prompts';
 * 
 * 2. For prompt composition:
 *    const prompt = new Prompt();
 *    prompt.set('identity', createPromptPart('You are Engi'));
 * 
 * 3. For formatting:
 *    const formatted = prompt.format(hierarchicalFormatter);
 * 
 * RAW PROMPT ORGANIZATION:
 * - /raw_promptparts/generic/: Domain-agnostic, reusable prompts
 * - /raw_promptparts/specific/: Pipeline and agent-specific prompts
 * 
 * Each raw prompt file contains a single PromptPart with doc-promptpart metadata.
 * There are 500+ raw prompts - import only what you need!
 */

// ==================== DOC-COMMENT PLUGINS ====================
// Doc-comment plugins are intentionally not exported in runtime API surface
// to minimize dependencies during rendering and runtime.

// Note: Additional doc-comment types are intentionally not exported to keep API minimal

// ==================== END OF PUBLIC API ====================
// 
// WHAT'S NOT EXPORTED AND WHY:
// 
// 1. Most raw prompt files (500+) are not individually enumerated here to avoid bloat
// 2. Internal utilities - Implementation details
// 3. Doc-comment types - Use primitives/prompt-doc directly
// 4. Experimental features - Not ready for public use
// 
// This focused API surface ensures:
// - Fast builds (no massive re-export chains)
// - Clear dependencies (explicit imports)
// - Type safety (no accidental string usage)
// - Tree shaking (only import what you use)

// ==================== SELECTED PROMPTPART BARREL ====================
// To support environments that disallow deep package imports (e.g., Vercel),
// we provide targeted re-exports for commonly used PromptParts. Extend as needed.

// Generic PTRR objectives
export { PROMPTPART_GENERIC_PTRR_PLAN_OBJECTIVE } from './raw_promptparts/generic/promptpart_generic_ptrr_plan_objective';
export { PROMPTPART_GENERIC_PTRR_TRY_OBJECTIVE } from './raw_promptparts/generic/promptpart_generic_ptrr_try_objective';
export { PROMPTPART_GENERIC_PTRR_REFINE_OBJECTIVE } from './raw_promptparts/generic/promptpart_generic_ptrr_refine_objective';
export { PROMPTPART_GENERIC_PTRR_RETRY_OBJECTIVE } from './raw_promptparts/generic/promptpart_generic_ptrr_retry_objective';

// Generic formatting parts
export { PROMPTPART_GENERIC_FORMATTING_GIVENTHEFOLLOWING } from './raw_promptparts/generic/promptpart_generic_formatting_giventhefollowing';
export { PROMPTPART_GENERIC_FORMATTING_EXECUTETHE_FOLLOWING } from './raw_promptparts/generic/promptpart_generic_formatting_executethe_following';
export { PROMPTPART_GENERIC_FORMATTING_BASEDONTHE } from './raw_promptparts/generic/promptpart_generic_formatting_basedonthe';
export { PROMPTPART_GENERIC_FORMATTING_AFTERENCOUNTERING } from './raw_promptparts/generic/promptpart_generic_formatting_afterencountering';
export { PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER } from './raw_promptparts/generic/promptpart_generic_agent_generation_json_only_header';
export { PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA } from './raw_promptparts/generic/promptpart_generic_agent_generation_use_this_structured_schema';
export { PROMPTPART_GENERIC_AGENT_GENERATION_IF_UNKNOWN_EMPTY } from './raw_promptparts/generic/promptpart_generic_agent_generation_if_unknown_empty';
export { PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT } from './raw_promptparts/generic/promptpart_generic_agent_failsafe_prepare_context';
export { PROMPTPART_GENERIC_AGENT_GENERATION_REASON } from './raw_promptparts/generic/promptpart_generic_agent_generation_reason';
export { PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE } from './raw_promptparts/generic/promptpart_generic_agent_generation_judge';
export { PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT } from './raw_promptparts/generic/promptpart_generic_agent_generation_structured_output';

// Specific: ConquerFile agent
export { PROMPTPART_SPECIFIC_AGENT_CONQUERFILE_SYSTEM_IDENTITY } from './raw_promptparts/specific/promptpart_specific_agent_conquerfile_system_identity';
export { PROMPTPART_SPECIFIC_AGENT_CONQUERFILE_SYSTEM_ROLE } from './raw_promptparts/specific/promptpart_specific_agent_conquerfile_system_role';
export { PROMPTPART_SPECIFIC_AGENT_CONQUERFILE_SYSTEM_INSTRUCTIONS } from './raw_promptparts/specific/promptpart_specific_agent_conquerfile_system_instructions';
export { PROMPTPART_SPECIFIC_AGENT_CONQUERFILE_PLAN_STRATEGY } from './raw_promptparts/specific/promptpart_specific_agent_conquerfile_plan_strategy';
export { PROMPTPART_SPECIFIC_AGENT_CONQUERFILE_PLAN_ANALYSIS } from './raw_promptparts/specific/promptpart_specific_agent_conquerfile_plan_analysis';
export { PROMPTPART_SPECIFIC_AGENT_CONQUERFILE_TRY_DIRECTIVES } from './raw_promptparts/specific/promptpart_specific_agent_conquerfile_try_directives';
export { PROMPTPART_SPECIFIC_AGENT_CONQUERFILE_REFINE_OPTIMIZATION } from './raw_promptparts/specific/promptpart_specific_agent_conquerfile_refine_optimization';
export { PROMPTPART_SPECIFIC_AGENT_CONQUERFILE_REFINE_ASSESSMENT } from './raw_promptparts/specific/promptpart_specific_agent_conquerfile_refine_assessment';
export { PROMPTPART_SPECIFIC_AGENT_CONQUERFILE_RETRY_STRATEGY } from './raw_promptparts/specific/promptpart_specific_agent_conquerfile_retry_strategy';
export { PROMPTPART_SPECIFIC_AGENT_CONQUERFILE_RETRY_ERRORHANDLING } from './raw_promptparts/specific/promptpart_specific_agent_conquerfile_retry_errorhandling';

// Deliverables-specific Tool PromptParts (Repository Setup additions)
export { PROMPTPART_SPECIFIC_TOOL_REPOSITORYSETUP_DELIVERABLES_METADATA_PIPELINE } from './raw_promptparts/specific/promptpart_specific_tool_repositorysetup_deliverables_metadata_pipeline';
export { PROMPTPART_SPECIFIC_TOOL_REPOSITORYSETUP_DELIVERABLES_METADATA_PHASE_SETUP } from './raw_promptparts/specific/promptpart_specific_tool_repositorysetup_deliverables_metadata_phase_setup';
export { PROMPTPART_SPECIFIC_TOOL_REPOSITORYSETUP_DELIVERABLES_PURPOSE_ADDENDUM } from './raw_promptparts/specific/promptpart_specific_tool_repositorysetup_deliverables_purpose_addendum';
export { PROMPTPART_SPECIFIC_TOOL_REPOSITORYSETUP_DELIVERABLES_CAPABILITIES_ADDENDUM } from './raw_promptparts/specific/promptpart_specific_tool_repositorysetup_deliverables_capabilities_addendum';

// Deliverables-specific Agent PromptParts (Clone VCS Repository)
export { PROMPTPART_SPECIFIC_AGENT_DELIVERABLESPIPELINE_CLONEVCSREPOSITORY_SYSTEM_IDENTITY } from './raw_promptparts/specific/promptpart_specific_agent_deliverablespipeline_clonevcsrepository_system_identity';
export { PROMPTPART_SPECIFIC_AGENT_DELIVERABLESPIPELINE_CLONEVCSREPOSITORY_SYSTEM_PURPOSE } from './raw_promptparts/specific/promptpart_specific_agent_deliverablespipeline_clonevcsrepository_system_purpose';
export { PROMPTPART_SPECIFIC_AGENT_DELIVERABLESPIPELINE_CLONEVCSREPOSITORY_SYSTEM_CONSTRAINTS } from './raw_promptparts/specific/promptpart_specific_agent_deliverablespipeline_clonevcsrepository_system_constraints';
export { PROMPTPART_SPECIFIC_AGENT_DELIVERABLESPIPELINE_CLONEVCSREPOSITORY_PLAN_LABEL } from './raw_promptparts/specific/promptpart_specific_agent_deliverablespipeline_clonevcsrepository_plan_label';
export { PROMPTPART_SPECIFIC_AGENT_DELIVERABLESPIPELINE_CLONEVCSREPOSITORY_PLAN_DETAILS } from './raw_promptparts/specific/promptpart_specific_agent_deliverablespipeline_clonevcsrepository_plan_details';
export { PROMPTPART_SPECIFIC_AGENT_DELIVERABLESPIPELINE_CLONEVCSREPOSITORY_TRY_LABEL } from './raw_promptparts/specific/promptpart_specific_agent_deliverablespipeline_clonevcsrepository_try_label';
export { PROMPTPART_SPECIFIC_AGENT_DELIVERABLESPIPELINE_CLONEVCSREPOSITORY_TRY_DETAILS } from './raw_promptparts/specific/promptpart_specific_agent_deliverablespipeline_clonevcsrepository_try_details';
export { PROMPTPART_SPECIFIC_AGENT_DELIVERABLESPIPELINE_CLONEVCSREPOSITORY_REFINE_LABEL } from './raw_promptparts/specific/promptpart_specific_agent_deliverablespipeline_clonevcsrepository_refine_label';
export { PROMPTPART_SPECIFIC_AGENT_DELIVERABLESPIPELINE_CLONEVCSREPOSITORY_REFINE_DETAILS } from './raw_promptparts/specific/promptpart_specific_agent_deliverablespipeline_clonevcsrepository_refine_details';
export { PROMPTPART_SPECIFIC_AGENT_DELIVERABLESPIPELINE_CLONEVCSREPOSITORY_RETRY_LABEL } from './raw_promptparts/specific/promptpart_specific_agent_deliverablespipeline_clonevcsrepository_retry_label';
export { PROMPTPART_SPECIFIC_AGENT_DELIVERABLESPIPELINE_CLONEVCSREPOSITORY_RETRY_DETAILS } from './raw_promptparts/specific/promptpart_specific_agent_deliverablespipeline_clonevcsrepository_retry_details';

// Deliverables-specific Agent PromptParts (Comprehend Attachments)
export { PROMPTPART_SPECIFIC_AGENT_COMPREHENDATTACHMENTS_PLAN_STRATEGY } from './raw_promptparts/specific/promptpart_specific_agent_comprehendattachments_plan_strategy';
export { PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDTASK_IDENTITY_DEFINITION } from './raw_promptparts/specific/promptpart_specific_agent_deliverablesetupcomprehendtask_identity_definition';
export { PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDTASK_PTRRPLAN_PURPOSE } from './raw_promptparts/specific/promptpart_specific_agent_deliverablesetupcomprehendtask_ptrrplan_purpose';
export { PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDTASK_PLAN_MODALITY_IMAGE_STRATEGY } from './raw_promptparts/specific/promptpart_specific_agent_deliverablesetupcomprehendtask_plan_modality_image_strategy';

// Hoist all PromptParts to root for monorepo consumers
// Raw promptparts re-exports removed. Import PromptParts via deep paths:
//   @bitcode/prompts/raw_promptparts/generic/<file>
//   @bitcode/prompts/raw_promptparts/specific/<file>
