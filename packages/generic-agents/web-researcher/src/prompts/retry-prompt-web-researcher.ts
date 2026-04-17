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
 * intent: "Retry step prompt for Web Researcher — analyze failures and apply recovery strategy"
 * current_version: "GA1.50.0"
 * dependencies: {
 *   "PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_RETRY_FAILURE_ANALYSIS": "GA1.45.0",
 *   "PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_RETRY_RECOVERY_STRATEGY": "GA1.45.0",
 *   "PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT": "GA1.91.0",
 *   "PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER": "GA1.50.0",
 *   "PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA": "GA1.50.0",
 *   "PROMPTPART_GENERIC_AGENT_GENERATION_IF_UNKNOWN_EMPTY": "GA1.50.0",
 *   "PROMPTPART_GENERIC_AGENT_GENERATION_REASON": "GA1.93.0",
 *   "PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE": "GA1.92.0",
 *   "PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT": "GA1.94.0"
 * }
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Concrete directives and purpose", "score": 0.46 },
 *   { "name": "implementation_ready", "test": "Usable by registry formatter", "score": 0.46 }
 * ]
 */
/**
 * RETRY PROMPT COMPOSITION - WEB RESEARCHER AGENT
 * 
 * Composed retry step prompt for Web Researcher agent using atomic prompt parts.
 * This defines how the agent handles research failures and recovers from information gathering errors.
 */

import { Prompt } from '@bitcode/prompts';




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
