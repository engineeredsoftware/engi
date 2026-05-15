import { PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_failsafe_prepare_context';
import { PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_json_only_header';
import { PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_use_this_structured_schema';
import { PROMPTPART_GENERIC_AGENT_GENERATION_REASON } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_reason';
import { PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_judge';
import { PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_structured_output';
import { PROMPTPART_SPECIFIC_AGENT_WEBSEARCH_PLAN_QUERY_ANALYSIS } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_websearch_plan_query_analysis';
import { PROMPTPART_SPECIFIC_AGENT_WEBSEARCH_PLAN_SEARCH_STRATEGY } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_websearch_plan_search_strategy';
/**
 * @doc-comment-developing-promptdevelopment
 * domain: agent
 * intent: "Bitcode read-synthesis web search plan prompt for source selection and query scope"
 * current_version: "V26"
 * dependencies: {
 *   "PROMPTPART_SPECIFIC_AGENT_WEBSEARCH_PLAN_QUERY_ANALYSIS": "V26",
 *   "PROMPTPART_SPECIFIC_AGENT_WEBSEARCH_PLAN_SEARCH_STRATEGY": "V26"
 * }
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Concrete directives and purpose", "score": 0.46 },
 *   { "name": "implementation_ready", "test": "Usable by registry formatter", "score": 0.46 }
 * ]
 */

import { Prompt } from '@bitcode/prompts/prompt';




export const WEB_SEARCH_PLAN_PROMPT = new Prompt()
  .set('analysis', PROMPTPART_SPECIFIC_AGENT_WEBSEARCH_PLAN_QUERY_ANALYSIS)
  .set('strategy', PROMPTPART_SPECIFIC_AGENT_WEBSEARCH_PLAN_SEARCH_STRATEGY)
  .set('generation:json_only_header', PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER)
  .set('generation:use_this_structure', PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA)
  .set('generation:reason', PROMPTPART_GENERIC_AGENT_GENERATION_REASON)
  .set('generation:judge', PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE)
  .set('generation:structured_output', PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT)
  .set('failsafe:prepare_context', PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT);
