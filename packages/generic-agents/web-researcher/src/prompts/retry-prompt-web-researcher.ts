import { PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_RETRY_FAILURE_ANALYSIS } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_webresearcher_retry_failure_analysis';
import { PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_RETRY_RECOVERY_STRATEGY } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_webresearcher_retry_recovery_strategy';
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
 * intent: "Bitcode need-synthesis web research Retry prompt for bounded recovery and gap surfacing"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "retry_boundary", "test": "Recovers discovery-source gaps without inventing or overclaiming", "score": 1.00 },
 *   { "name": "registry_ready", "test": "Usable by registry formatter", "score": 1.00 }
 * ]
 */
/**
 * RETRY PROMPT COMPOSITION - BITCODE NEED-SYNTHESIS WEB RESEARCH
 *
 * Composes recovery and gap-surfacing PromptParts for need-synthesis web research.
 */

import { Prompt } from '@bitcode/prompts/prompt';

export const WEB_RESEARCHER_RETRY_PROMPT = new Prompt()
  .set('analysis', PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_RETRY_FAILURE_ANALYSIS)
  .set('recovery', PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_RETRY_RECOVERY_STRATEGY)
  .set('generation:json_only_header', PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER)
  .set('generation:use_this_structure', PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA)
  .set('generation:if_unknown_empty', PROMPTPART_GENERIC_AGENT_GENERATION_IF_UNKNOWN_EMPTY)
  .set('generation:reason', PROMPTPART_GENERIC_AGENT_GENERATION_REASON)
  .set('generation:judge', PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE)
  .set('generation:structured_output', PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT)
  .set('failsafe:prepare_context', PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT);
