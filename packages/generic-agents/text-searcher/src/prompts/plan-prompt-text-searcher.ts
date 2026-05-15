import { PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_failsafe_prepare_context';
import { PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_json_only_header';
import { PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_use_this_structured_schema';
import { PROMPTPART_GENERIC_AGENT_GENERATION_REASON } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_reason';
import { PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_judge';
import { PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_structured_output';
import { PROMPTPART_SPECIFIC_AGENT_TEXTSEARCHER_PLAN_CONTENT_ANALYSIS } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_textsearcher_plan_content_analysis';
import { PROMPTPART_SPECIFIC_AGENT_TEXTSEARCHER_PLAN_SEARCH_STRATEGY } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_textsearcher_plan_search_strategy';
/**
 * Bitcode repository-evidence search Plan prompt.
 *
 * @doc-comment-developing-promptdevelopment
 * domain: agent
 * intent: "Plan repository evidence collection for Bitcode read measurement and AssetPack source-grounding"
 * current_version: "V26"
 */

import { Prompt } from '@bitcode/prompts/prompt';

export const TEXT_SEARCHER_PLAN_PROMPT = new Prompt()
  .set('analysis', PROMPTPART_SPECIFIC_AGENT_TEXTSEARCHER_PLAN_CONTENT_ANALYSIS)
  .set('strategy', PROMPTPART_SPECIFIC_AGENT_TEXTSEARCHER_PLAN_SEARCH_STRATEGY)
  .set('generation:json_only_header', PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER)
  .set('generation:use_this_structure', PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA)
  .set('generation:reason', PROMPTPART_GENERIC_AGENT_GENERATION_REASON)
  .set('generation:judge', PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE)
  .set('generation:structured_output', PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT)
  .set('failsafe:prepare_context', PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT);
