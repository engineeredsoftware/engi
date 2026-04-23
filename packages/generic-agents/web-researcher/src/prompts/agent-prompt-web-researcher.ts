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
 * @doc-comment-developing-promptdevelopment
 * domain: agent
 * intent: "Bitcode need-synthesis web research agent prompt for discovery-phase source context"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_boundary", "test": "Keeps web research inside need synthesis rather than product or proof ownership", "score": 1.00 },
 *   { "name": "registry_ready", "test": "Composes specific implementation PromptParts through a Prompt registry", "score": 1.00 }
 * ]
 */

import { Prompt } from '@bitcode/prompts/prompt';

export const WEB_RESEARCHER_AGENT_PROMPT = new Prompt()
  .set('purpose', PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_PURPOSE_CORESTATEMENT)
  .set('capabilities', PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_CAPABILITIES_LIST)
  .set('execution', PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_EXECUTIONPATTERN_DETAILCONTENT)
  .set('steps', PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_PTRRSTEPS_LIST)
  .set('tools', PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_TOOLS_LIST)
  .set('integration', PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_INTEGRATION_DETAILCONTENT);
