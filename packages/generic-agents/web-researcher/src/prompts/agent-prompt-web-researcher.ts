import { PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_PURPOSE_CORESTATEMENT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_webresearcher_purpose_corestatement';
import { PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_CAPABILITIES_LIST } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_webresearcher_capabilities_list';
import { PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_EXECUTIONPATTERN_DETAILCONTENT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_webresearcher_executionpattern_detailcontent';
import { PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_PTRRSTEPS_LIST } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_webresearcher_ptrrsteps_list';
import { PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_TOOLS_LIST } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_webresearcher_tools_list';
import { PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_INTEGRATION_DETAILCONTENT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_webresearcher_integration_detailcontent';
import { PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_failsafe_prepare_context';
import { PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_json_only_header';
import { PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_use_this_structured_schema';
import { PROMPTPART_GENERIC_AGENT_GENERATION_IF_UNKNOWN_EMPTY } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_if_unknown_empty';
import { PROMPTPART_GENERIC_AGENT_GENERATION_REASON } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_reason';
import { PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_judge';
import { PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_structured_output';
/**
 * Web Researcher Agent - Agent Prompt
 * 
 * Comprehensive web research operations with search and analysis.
 * 
 * @doc-comment-developing-promptdevelopment
 * domain: agent
 * intent: "Agent prompt for Web Researcher"
 * current_version: "GA1.50.0"
 * dependencies: {
 *   "PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_PURPOSE_CORESTATEMENT": "GA1.45.0",
 *   "PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_CAPABILITIES_LIST": "GA1.45.0",
 *   "PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_EXECUTIONPATTERN_DETAILCONTENT": "GA1.45.0",
 *   "PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_PTRRSTEPS_LIST": "GA1.45.0",
 *   "PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_TOOLS_LIST": "GA1.45.0",
 *   "PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_INTEGRATION_DETAILCONTENT": "GA1.45.0"
 * }
 * versions: [
 *   { "version": "1.0.0", "score": 0.45, "reason": "Initial implementation with industrial language" }
 * ]
 * benchmarks: [
 *   { "name": "agent_coherence", "test": "Does the agent prompt provide clear instructions?", "score": 0.45 },
 *   { "name": "web_completeness", "test": "Does it cover web research requirements?", "score": 0.45 },
 *   { "name": "operational_clarity", "test": "Are research boundaries clearly defined?", "score": 0.45 }
 * ]
 */

import { Prompt } from '@bitcode/prompts';








export const WEB_RESEARCHER_AGENT_PROMPT = new Prompt()
  .set('purpose', PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_PURPOSE_CORESTATEMENT)
  .set('capabilities', PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_CAPABILITIES_LIST)
  .set('execution', PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_EXECUTIONPATTERN_DETAILCONTENT)
  .set('steps', PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_PTRRSTEPS_LIST)
  .set('tools', PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_TOOLS_LIST)
  .set('integration', PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_INTEGRATION_DETAILCONTENT);
