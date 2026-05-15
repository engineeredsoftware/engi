import { PROMPTPART_SPECIFIC_AGENT_TEXTSEARCHER_PURPOSE_CORESTATEMENT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_textsearcher_purpose_corestatement';
import { PROMPTPART_SPECIFIC_AGENT_TEXTSEARCHER_CAPABILITIES_LIST } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_textsearcher_capabilities_list';
import { PROMPTPART_SPECIFIC_AGENT_TEXTSEARCHER_EXECUTIONPATTERN_DETAILCONTENT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_textsearcher_executionpattern_detailcontent';
import { PROMPTPART_SPECIFIC_AGENT_TEXTSEARCHER_PTRRSTEPS_LIST } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_textsearcher_ptrrsteps_list';
import { PROMPTPART_SPECIFIC_AGENT_TEXTSEARCHER_TOOLS_LIST } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_textsearcher_tools_list';
import { PROMPTPART_SPECIFIC_AGENT_TEXTSEARCHER_INTEGRATION_DETAILCONTENT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_textsearcher_integration_detailcontent';
/**
 * BITCODE REPOSITORY EVIDENCE SEARCH AGENT PROMPT
 *
 * @doc-comment-developing-promptdevelopment
 * domain: agent
 * intent: "Bitcode repository-evidence search agent prompt for read measurement, proof inspection, and AssetPack source-grounding"
 * current_version: "V26"
 */

import { AgentPrompt } from '@bitcode/agent-generics';
import { PromptPart } from '@bitcode/prompts/parts/PromptPart';

export const BITCODE_REPOSITORY_EVIDENCE_SEARCH_AGENT_PROMPT = new AgentPrompt({
  name: 'bitcode-repository-evidence-searcher' as PromptPart,
  identity: 'Bitcode repository-evidence search agent' as PromptPart
})
  .set('purpose', PROMPTPART_SPECIFIC_AGENT_TEXTSEARCHER_PURPOSE_CORESTATEMENT)
  .set('capabilities', PROMPTPART_SPECIFIC_AGENT_TEXTSEARCHER_CAPABILITIES_LIST)
  .set('executionPattern', PROMPTPART_SPECIFIC_AGENT_TEXTSEARCHER_EXECUTIONPATTERN_DETAILCONTENT)
  .set('steps', PROMPTPART_SPECIFIC_AGENT_TEXTSEARCHER_PTRRSTEPS_LIST)
  .set('tools', PROMPTPART_SPECIFIC_AGENT_TEXTSEARCHER_TOOLS_LIST)
  .set('integration', PROMPTPART_SPECIFIC_AGENT_TEXTSEARCHER_INTEGRATION_DETAILCONTENT);

export const TEXT_SEARCHER_AGENT_PROMPT = BITCODE_REPOSITORY_EVIDENCE_SEARCH_AGENT_PROMPT;
