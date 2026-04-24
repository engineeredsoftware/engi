import { Prompt } from '@bitcode/prompts/prompt';
import { PROMPTPART_SPECIFIC_AGENT_DIGESTER_PURPOSE_CORESTATEMENT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_digester_purpose_corestatement';
import { PROMPTPART_SPECIFIC_AGENT_DIGESTER_CAPABILITIES_LIST } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_digester_capabilities_list';
import { PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_failsafe_prepare_context';
import { PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_json_only_header';
import { PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_use_this_structured_schema';
import { PROMPTPART_GENERIC_AGENT_GENERATION_IF_UNKNOWN_EMPTY } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_if_unknown_empty';
import { PROMPTPART_GENERIC_AGENT_GENERATION_REASON } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_reason';
import { PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_judge';
import { PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_structured_output';




/**
 * @doc-comment-developing-promptdevelopment
 * domain: agent
 * intent: "PLAN step prompt for Digester agent"
 * current_version: "V26.50.0"
 * versions: ["2.0.0", "1.0.0"]
 * benchmarks: [
 *   { "name": "planning_clarity", "test": "Does the prompt enable clear content synthesis planning? Rate 0-1", "score": 0.92 },
 *   { "name": "analysis_depth", "test": "Is content analysis approach well-defined? Rate 0-1", "score": 0.93 },
 *   { "name": "synthesis_scope", "test": "Can content synthesis scope be effectively determined? Rate 0-1", "score": 0.91 }
 * ]
 */
export const DIGESTER_PLAN_PROMPT = new Prompt()
  .set('header', 'PLAN: Content Synthesis Strategy')
  .set('purpose', PROMPTPART_SPECIFIC_AGENT_DIGESTER_PURPOSE_CORESTATEMENT)
  .set('capabilities', PROMPTPART_SPECIFIC_AGENT_DIGESTER_CAPABILITIES_LIST)
  .set('instructions', 'Analyze content structure and patterns, determine synthesis methodology, establish processing priorities, and define output formats for comprehensive content digestion.')
  .set('generation:json_only_header', PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER)
  .set('generation:use_this_structure', PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA)
  .set('generation:reason', PROMPTPART_GENERIC_AGENT_GENERATION_REASON)
  .set('generation:judge', PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE)
  .set('generation:structured_output', PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT)
  .set('failsafe:prepare_context', PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT);
