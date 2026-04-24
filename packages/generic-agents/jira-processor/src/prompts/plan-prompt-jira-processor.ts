import { PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_failsafe_prepare_context';
import { PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_json_only_header';
import { PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_use_this_structured_schema';
import { PROMPTPART_GENERIC_AGENT_GENERATION_IF_UNKNOWN_EMPTY } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_if_unknown_empty';
import { PROMPTPART_GENERIC_AGENT_GENERATION_REASON } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_reason';
import { PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_judge';
import { PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_structured_output';
import { PROMPTPART_SPECIFIC_AGENT_JIRAPROCESSOR_PLAN_PROJECT_ANALYSIS } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_jiraprocessor_plan_project_analysis';
import { PROMPTPART_SPECIFIC_AGENT_JIRAPROCESSOR_PLAN_WORKFLOW_STRATEGY } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_jiraprocessor_plan_workflow_strategy';
/**
 * @doc-comment-developing-promptdevelopment
 * domain: agent
 * intent: "Plan step prompt for JIRA Processor — analyze project and outline workflow"
 * current_version: "V26.50.0"
 * dependencies: {
 *   "PROMPTPART_SPECIFIC_AGENT_JIRAPROCESSOR_PLAN_PROJECT_ANALYSIS": "V26.45.0",
 *   "PROMPTPART_SPECIFIC_AGENT_JIRAPROCESSOR_PLAN_WORKFLOW_STRATEGY": "V26.45.0",
 *   "PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT": "V26.50.0",
 *   "PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER": "V26.50.0",
 *   "PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA": "V26.50.0",
 *   "PROMPTPART_GENERIC_AGENT_GENERATION_REASON": "V26.50.0",
 *   "PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE": "V26.50.0",
 *   "PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT": "V26.50.0"
 * }
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Concrete directives and purpose", "score": 0.46 },
 *   { "name": "implementation_ready", "test": "Usable by registry formatter", "score": 0.46 }
 * ]
 */
/**
 * PLAN PROMPT COMPOSITION - JIRA PROCESSOR AGENT
 * 
 * Composed plan step prompt for Jira Processor agent using atomic prompt parts.
 * This defines how the agent analyzes project management data and plans Jira workflows.
 */

import { Prompt } from '@bitcode/prompts/prompt';




export const JIRA_PROCESSOR_PLAN_PROMPT = new Prompt()
  .set('analysis', PROMPTPART_SPECIFIC_AGENT_JIRAPROCESSOR_PLAN_PROJECT_ANALYSIS)
  .set('workflow', PROMPTPART_SPECIFIC_AGENT_JIRAPROCESSOR_PLAN_WORKFLOW_STRATEGY)
  .set('generation:json_only_header', PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER)
  .set('generation:use_this_structure', PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA)
  .set('generation:reason', PROMPTPART_GENERIC_AGENT_GENERATION_REASON)
  .set('generation:judge', PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE)
  .set('generation:structured_output', PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT)
  .set('failsafe:prepare_context', PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT);
