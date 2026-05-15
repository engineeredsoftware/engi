import { PROMPTPART_SPECIFIC_AGENT_DANGERWALL_PURPOSE_CORESTATEMENT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_dangerwall_purpose_corestatement';
import { PROMPTPART_SPECIFIC_AGENT_DANGERWALL_CAPABILITIES_LIST } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_dangerwall_capabilities_list';
import { PROMPTPART_SPECIFIC_AGENT_DANGERWALL_EXECUTIONPATTERN_DETAILCONTENT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_dangerwall_executionpattern_detailcontent';
import { PROMPTPART_SPECIFIC_AGENT_DANGERWALL_PTRRSTEPS_LIST } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_dangerwall_ptrrsteps_list';
import { PROMPTPART_SPECIFIC_AGENT_DANGERWALL_TOOLS_LIST } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_dangerwall_tools_list';
import { PROMPTPART_SPECIFIC_AGENT_DANGERWALL_INTEGRATION_DETAILCONTENT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_dangerwall_integration_detailcontent';
import { PROMPTPART_GENERIC_AGENT_FAILSAFE_PREPARE_CONTEXT } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_failsafe_prepare_context';
import { PROMPTPART_GENERIC_AGENT_GENERATION_JSON_ONLY_HEADER } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_json_only_header';
import { PROMPTPART_GENERIC_AGENT_GENERATION_USE_THIS_STRUCTURED_SCHEMA } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_use_this_structured_schema';
import { PROMPTPART_GENERIC_AGENT_GENERATION_IF_UNKNOWN_EMPTY } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_if_unknown_empty';
import { PROMPTPART_GENERIC_AGENT_GENERATION_REASON } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_reason';
import { PROMPTPART_GENERIC_AGENT_GENERATION_JUDGE } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_judge';
import { PROMPTPART_GENERIC_AGENT_GENERATION_STRUCTURED_OUTPUT } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_agent_generation_structured_output';
/**
 * Bitcode read risk-admission agent prompt.
 * 
 * The danger-wall filename remains a retained stable support carrier. The
 * prompt's purpose is Bitcode read/AssetPack admission, not generic security
 * scanning or content moderation.
 * 
 * @doc-code-prompt
 * purpose: Define structured documentation for Bitcode read risk-admission agent
 * agent: danger-wall
 * pattern: Registry-backed risk admission for read, written assets, AssetPack, proof, and delivery boundaries
 *
 * @doc-comment-developing-promptdevelopment
 * domain: agent
 * intent: "Bitcode risk-admission support prompt for deciding whether a read, written assets, AssetPack plan, and delivery mechanism may continue"
 * current_version: "V26"
 */

import { AgentPrompt } from '@bitcode/agent-generics';








export const DANGER_WALL_AGENT_PROMPT = new AgentPrompt({
  name: 'Bitcode Read Risk Admission Agent',
  category: 'Bitcode Risk Admission',
  version: 'V26',
  specificity: 'Specific',
  
  purpose: PROMPTPART_SPECIFIC_AGENT_DANGERWALL_PURPOSE_CORESTATEMENT,
  capabilities: PROMPTPART_SPECIFIC_AGENT_DANGERWALL_CAPABILITIES_LIST,
  executionPattern: PROMPTPART_SPECIFIC_AGENT_DANGERWALL_EXECUTIONPATTERN_DETAILCONTENT,
  steps: PROMPTPART_SPECIFIC_AGENT_DANGERWALL_PTRRSTEPS_LIST,
  tools: PROMPTPART_SPECIFIC_AGENT_DANGERWALL_TOOLS_LIST,
  integration: PROMPTPART_SPECIFIC_AGENT_DANGERWALL_INTEGRATION_DETAILCONTENT
});
