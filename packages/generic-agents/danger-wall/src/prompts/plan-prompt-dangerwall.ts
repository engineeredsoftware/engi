import { PROMPTPART_SPECIFIC_AGENT_DANGERWALL_PLAN_INSTRUCTIONS } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_agent_dangerwall_plan_instructions';
import { PROMPTPART_SPECIFIC_AGENT_DANGERWALL_PLAN_ANALYSIS_APPROACH } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_agent_dangerwall_plan_analysis_approach';
import { PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_agent_failsafe_prepare_context';
import { PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_json_only_header';
import { PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_use_this_structured_schema';
import { PROMPTPART_GENERIC_AGENT_GENERATION_IF_UNKNOWN_EMPTY } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_if_unknown_empty';
import { PROMPTPART_GENERIC_AGENT_GENERATION_REASON } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_reason';
import { PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_judge';
import { PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_structured_output';
/**
 * Danger Wall Agent - Plan Step Prompt
 * 
 * Strategic planning for comprehensive security validation and threat detection
 * across codebases, dependencies, and infrastructure.
 * 
 * @doc-comment-developing-promptdevelopment
 * domain: agent
 * intent: "PLAN step prompt for Danger Wall agent"
 * current_version: "GA1.50.0"
 * versions: [
 *   { "version": "2.0.0", "score": 0.90, "reason": "Used wrong PromptPart concatenation pattern" },
 *   { "version": "1.0.0", "score": 0.50, "reason": "Initial implementation" }
 * ]
 * benchmarks: [
 *   { "name": "planning_clarity", "test": "Does the prompt enable clear security planning?", "score": 0.45 },
 *   { "name": "threat_assessment", "test": "Is threat model analysis well-defined?", "score": 0.44 },
 *   { "name": "security_scope", "test": "Can security scanning scope be effectively determined?", "score": 0.45 }
 * ]
 */

import { Prompt } from '@engi/prompts';




export const DANGER_WALL_PLAN_PROMPT = new Prompt()
  .set('phase', 'PLAN: Security Validation Strategy')
  .set('instructions', PROMPTPART_SPECIFIC_AGENT_DANGERWALL_PLAN_INSTRUCTIONS)
  .set('analysis_approach', PROMPTPART_SPECIFIC_AGENT_DANGERWALL_PLAN_ANALYSIS_APPROACH)
  .set('generation:json_only_header', PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER)
  .set('generation:use_this_structure', PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA)
  .set('generation:reason', PROMPTPART_GENERIC_AGENT_GENERATION_REASON)
  .set('generation:judge', PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE)
  .set('generation:structured_output', PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT)
  .set('failsafe:prepare_context', PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT);
