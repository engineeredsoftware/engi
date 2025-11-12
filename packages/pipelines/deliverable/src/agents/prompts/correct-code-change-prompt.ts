import { Prompt } from '@engi/prompts';
import { PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_agent_failsafe_prepare_context';
import { PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_json_only_header';
import { PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_use_this_structured_schema';
import { PROMPTPART_GENERIC_AGENT_GENERATION_IF_UNKNOWN_EMPTY } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_if_unknown_empty';
import { PROMPTPART_GENERIC_AGENT_GENERATION_REASON } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_reason';
import { PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_judge';
import { PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_structured_output';
import { PROMPTPART_SPECIFIC_AGENT_CORRECTCODECHANGE_SYSTEM_IDENTITY } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_agent_correctcodechange_system_identity';
import { PROMPTPART_SPECIFIC_AGENT_CORRECTCODECHANGE_SYSTEM_ROLE } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_agent_correctcodechange_system_role';
import { PROMPTPART_SPECIFIC_AGENT_CORRECTCODECHANGE_SYSTEM_INSTRUCTIONS } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_agent_correctcodechange_system_instructions';
import { PROMPTPART_SPECIFIC_AGENT_CORRECTCODECHANGE_PLAN_STRATEGY } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_agent_correctcodechange_plan_strategy';
import { PROMPTPART_SPECIFIC_AGENT_CORRECTCODECHANGE_PLAN_ANALYSIS } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_agent_correctcodechange_plan_analysis';
import { PROMPTPART_SPECIFIC_AGENT_CORRECTCODECHANGE_TRY_DIRECTIVES } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_agent_correctcodechange_try_directives';
import { PROMPTPART_SPECIFIC_AGENT_CORRECTCODECHANGE_REFINE_OPTIMIZATION } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_agent_correctcodechange_refine_optimization';
import { PROMPTPART_SPECIFIC_AGENT_CORRECTCODECHANGE_REFINE_ASSESSMENT } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_agent_correctcodechange_refine_assessment';
import { PROMPTPART_SPECIFIC_AGENT_CORRECTCODECHANGE_RETRY_STRATEGY } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_agent_correctcodechange_retry_strategy';
import { PROMPTPART_SPECIFIC_AGENT_CORRECTCODECHANGE_RETRY_ERRORHANDLING } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_agent_correctcodechange_retry_errorhandling';
import { PROMPTPART_SPECIFIC_AGENT_CORRECTCODECHANGE_CONTEXT_AWARENESS_DETAILCONTENT } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_agent_correctcodechange_context_awareness_detailcontent';
import { PROMPTPART_SPECIFIC_AGENT_CORRECTCODECHANGE_PHASE_PLAN_LABEL } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_agent_correctcodechange_phase_plan_label';
import { PROMPTPART_SPECIFIC_AGENT_CORRECTCODECHANGE_PHASE_TRY_LABEL } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_agent_correctcodechange_phase_try_label';
import { PROMPTPART_SPECIFIC_AGENT_CORRECTCODECHANGE_PHASE_REFINE_LABEL } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_agent_correctcodechange_phase_refine_label';
import { PROMPTPART_SPECIFIC_AGENT_CORRECTCODECHANGE_PHASE_RETRY_LABEL } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_agent_correctcodechange_phase_retry_label';
import { PROMPTPART_SPECIFIC_AGENT_CORRECTCODECHANGE_PLAN_OUTPUT_REQUIREMENT_DETAILCONTENT } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_agent_correctcodechange_plan_output_requirement_detailcontent';
import { PROMPTPART_SPECIFIC_AGENT_CORRECTCODECHANGE_TRY_OUTPUT_REQUIREMENT_DETAILCONTENT } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_agent_correctcodechange_try_output_requirement_detailcontent';
import { PROMPTPART_SPECIFIC_AGENT_CORRECTCODECHANGE_REFINE_OUTPUT_REQUIREMENT_DETAILCONTENT } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_agent_correctcodechange_refine_output_requirement_detailcontent';
import { PROMPTPART_SPECIFIC_AGENT_CORRECTCODECHANGE_RETRY_OUTPUT_REQUIREMENT_DETAILCONTENT } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_agent_correctcodechange_retry_output_requirement_detailcontent';
import { PROMPTPART_GENERIC_PTRR_PLAN_OBJECTIVE } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_ptrr_plan_objective';
import { PROMPTPART_GENERIC_PTRR_REFINE_OBJECTIVE } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_ptrr_refine_objective';
import { PROMPTPART_GENERIC_PTRR_RETRY_OBJECTIVE } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_ptrr_retry_objective';
import { PROMPTPART_GENERIC_FORMATTING_GIVENTHEFOLLOWING } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_formatting_giventhefollowing';
import { PROMPTPART_GENERIC_FORMATTING_BASEDONTHE } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_formatting_basedonthe';
import { PROMPTPART_GENERIC_FORMATTING_AFTERENCOUNTERING } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_formatting_afterencountering';


// Import our actual CORRECTCODECHANGE PromptParts


// import our actual correctcodechange promptparts











import { PROMPTPART_GENERIC_PTRR_TRY_OBJECTIVE } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_ptrr_try_objective';



import { PROMPTPART_GENERIC_FORMATTING_EXECUTETHE_FOLLOWING } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_formatting_executethe_following';



/**
 * @doc-comment-developing-promptdevelopment
 * domain: pipeline
 * intent: "Deliverables – CorrectCodeChange agent system prompt"
 * current_version: "GA1.50.0"
 * dependencies: {
 *   "PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT": "GA1.50.0",
 *   "PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER": "GA1.50.0",
 *   "PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA": "GA1.50.0",
 *   "PROMPTPART_GENERIC_AGENT_GENERATION_REASON": "GA1.50.0",
 *   "PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE": "GA1.50.0",
 *   "PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT": "GA1.50.0"
 * }
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Concrete directives and purpose", "score": 0.46 },
 *   { "name": "implementation_ready", "test": "Usable by registry formatter", "score": 0.46 }
 * ]
 */
export function createCorrectCodeChangeSystemPrompt(): Prompt {
  const prompt = new Prompt();
  
  // Core identity
  prompt.set('identity', PROMPTPART_SPECIFIC_AGENT_CORRECTCODECHANGE_SYSTEM_IDENTITY);
  prompt.set('role', PROMPTPART_SPECIFIC_AGENT_CORRECTCODECHANGE_SYSTEM_ROLE);
  prompt.set('instructions', PROMPTPART_SPECIFIC_AGENT_CORRECTCODECHANGE_SYSTEM_INSTRUCTIONS);
  
  // Context awareness
  prompt.set('context_awareness', PROMPTPART_SPECIFIC_AGENT_CORRECTCODECHANGE_CONTEXT_AWARENESS_DETAILCONTENT);
  // Generic scaffolding
  prompt.set('generation:json_only_header', PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER as any);
  prompt.set('generation:use_this_structure', PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA as any);
  prompt.set('generation:reason', PROMPTPART_GENERIC_AGENT_GENERATION_REASON as any);
  prompt.set('generation:judge', PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE as any);
  prompt.set('generation:structured_output', PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT as any);
  prompt.set('failsafe:prepare_context', PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT as any);
  
  prompt.require('identity');
  prompt.require('role');
  prompt.require('instructions');
  
  return prompt;
}

/**
 * PLAN step prompt for CorrectCodeChange agent
 */
export function createCorrectCodeChangePlanPrompt(): Prompt {
  const prompt = new Prompt();
  
  prompt.set('phase', PROMPTPART_SPECIFIC_AGENT_CORRECTCODECHANGE_PHASE_PLAN_LABEL);
  prompt.set('context_lead', PROMPTPART_GENERIC_FORMATTING_GIVENTHEFOLLOWING);
  prompt.set('objective', PROMPTPART_GENERIC_PTRR_PLAN_OBJECTIVE);
  prompt.set('strategy', PROMPTPART_SPECIFIC_AGENT_CORRECTCODECHANGE_PLAN_STRATEGY);
  prompt.set('analysis', PROMPTPART_SPECIFIC_AGENT_CORRECTCODECHANGE_PLAN_ANALYSIS);
  prompt.set('output_requirement', PROMPTPART_SPECIFIC_AGENT_CORRECTCODECHANGE_PLAN_OUTPUT_REQUIREMENT_DETAILCONTENT);
  // Generic scaffolding
  prompt.set('generation:json_only_header', PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER as any);
  prompt.set('generation:use_this_structure', PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA as any);
  prompt.set('generation:reason', PROMPTPART_GENERIC_AGENT_GENERATION_REASON as any);
  prompt.set('generation:judge', PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE as any);
  prompt.set('generation:structured_output', PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT as any);
  prompt.set('failsafe:prepare_context', PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT as any);
  
  prompt.require('strategy');
  prompt.require('analysis');
  
  return prompt;
}

/**
 * TRY step prompt for CorrectCodeChange agent
 */
export function createCorrectCodeChangeTryPrompt(): Prompt {
  const prompt = new Prompt();
  
  prompt.set('phase', PROMPTPART_SPECIFIC_AGENT_CORRECTCODECHANGE_PHASE_TRY_LABEL);
  prompt.set('directive', PROMPTPART_GENERIC_FORMATTING_EXECUTETHE_FOLLOWING);
  prompt.set('objective', PROMPTPART_GENERIC_PTRR_TRY_OBJECTIVE);
  prompt.set('execution', PROMPTPART_SPECIFIC_AGENT_CORRECTCODECHANGE_TRY_DIRECTIVES);
  // Tool policy: prefer code reading; only select use-computer when a quick, local command materially
  // improves error detection (e.g., `npm test --silent`, `npm run -s type-check`, `git status --porcelain`).
  // When selecting, set output.useTools = [{ name: 'deliverable-pipeline-use-computer-tool', input: { command: '<cmd>' }, reason }].
  prompt.set('output_requirement', PROMPTPART_SPECIFIC_AGENT_CORRECTCODECHANGE_TRY_OUTPUT_REQUIREMENT_DETAILCONTENT);
  // Generic scaffolding
  prompt.set('generation:json_only_header', PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER as any);
  prompt.set('generation:use_this_structure', PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA as any);
  prompt.set('generation:if_unknown_empty', PROMPTPART_GENERIC_AGENT_GENERATION_IF_UNKNOWN_EMPTY as any);
  prompt.set('generation:reason', PROMPTPART_GENERIC_AGENT_GENERATION_REASON as any);
  prompt.set('generation:judge', PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE as any);
  prompt.set('generation:structured_output', PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT as any);
  prompt.set('failsafe:prepare_context', PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT as any);
  
  prompt.require('execution');
  
  return prompt;
}

/**
 * REFINE step prompt for CorrectCodeChange agent
 */
export function createCorrectCodeChangeRefinePrompt(): Prompt {
  const prompt = new Prompt();
  
  prompt.set('phase', PROMPTPART_SPECIFIC_AGENT_CORRECTCODECHANGE_PHASE_REFINE_LABEL);
  prompt.set('context_lead', PROMPTPART_GENERIC_FORMATTING_BASEDONTHE);
  prompt.set('objective', PROMPTPART_GENERIC_PTRR_REFINE_OBJECTIVE);
  prompt.set('assessment', PROMPTPART_SPECIFIC_AGENT_CORRECTCODECHANGE_REFINE_ASSESSMENT);
  prompt.set('optimization', PROMPTPART_SPECIFIC_AGENT_CORRECTCODECHANGE_REFINE_OPTIMIZATION);
  prompt.set('output_requirement', PROMPTPART_SPECIFIC_AGENT_CORRECTCODECHANGE_REFINE_OUTPUT_REQUIREMENT_DETAILCONTENT);
  // Generic scaffolding
  prompt.set('generation:json_only_header', PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER as any);
  prompt.set('generation:use_this_structure', PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA as any);
  prompt.set('generation:reason', PROMPTPART_GENERIC_AGENT_GENERATION_REASON as any);
  prompt.set('generation:judge', PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE as any);
  prompt.set('generation:structured_output', PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT as any);
  prompt.set('failsafe:prepare_context', PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT as any);
  
  prompt.require('assessment');
  prompt.require('optimization');
  
  return prompt;
}

/**
 * RETRY step prompt for CorrectCodeChange agent
 */
export function createCorrectCodeChangeRetryPrompt(): Prompt {
  const prompt = new Prompt();
  
  prompt.set('phase', PROMPTPART_SPECIFIC_AGENT_CORRECTCODECHANGE_PHASE_RETRY_LABEL);
  prompt.set('context_lead', PROMPTPART_GENERIC_FORMATTING_AFTERENCOUNTERING);
  prompt.set('objective', PROMPTPART_GENERIC_PTRR_RETRY_OBJECTIVE);
  prompt.set('error_handling', PROMPTPART_SPECIFIC_AGENT_CORRECTCODECHANGE_RETRY_ERRORHANDLING);
  prompt.set('retry_strategy', PROMPTPART_SPECIFIC_AGENT_CORRECTCODECHANGE_RETRY_STRATEGY);
  prompt.set('output_requirement', PROMPTPART_SPECIFIC_AGENT_CORRECTCODECHANGE_RETRY_OUTPUT_REQUIREMENT_DETAILCONTENT);
  // Generic scaffolding
  prompt.set('generation:json_only_header', PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER as any);
  prompt.set('generation:use_this_structure', PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA as any);
  prompt.set('generation:if_unknown_empty', PROMPTPART_GENERIC_AGENT_GENERATION_IF_UNKNOWN_EMPTY as any);
  prompt.set('generation:reason', PROMPTPART_GENERIC_AGENT_GENERATION_REASON as any);
  prompt.set('generation:judge', PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE as any);
  prompt.set('generation:structured_output', PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT as any);
  prompt.set('failsafe:prepare_context', PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT as any);
  
  prompt.require('error_handling');
  prompt.require('retry_strategy');
  
  return prompt;
}

/**
 * Main export: Complete prompt set for CorrectCodeChange agent
 */
export const CorrectCodeChangePrompts = {
  system: createCorrectCodeChangeSystemPrompt,
  plan: createCorrectCodeChangePlanPrompt,
  try: createCorrectCodeChangeTryPrompt,
  refine: createCorrectCodeChangeRefinePrompt,
  retry: createCorrectCodeChangeRetryPrompt
};
