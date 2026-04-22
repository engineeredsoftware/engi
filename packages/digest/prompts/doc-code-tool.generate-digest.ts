import { Prompt } from '@bitcode/prompts/prompt';
import {
  PROMPTPART_SPECIFIC_TOOL_DIGEST_FILESUMMARIES_BASEPROMPT_CORE,
} from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_digest_filesummaries_baseprompt_core';
import { PROMPTPART_SPECIFIC_TOOL_DIGESTGENERATOR_IDENTITY_CORESTATEMENT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_digestgenerator_identity_corestatement';
import { PROMPTPART_SPECIFIC_TOOL_DIGESTGENERATOR_PURPOSE_CORESTATEMENT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_digestgenerator_purpose_corestatement';
import { PROMPTPART_SPECIFIC_TOOL_DIGESTGENERATOR_CONSTRAINTS_JSON_DETAILCONTENT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_digestgenerator_constraints_json_detailcontent';

/**
 * @doc-code-tool
 * type: tool
 * name: generateDigest
 * intent: "Runtime injection instructions for the DigestGenerator tool"
 * current_version: "GA1.00.0"
 * dependencies: {
 *   "PROMPTPART_SPECIFIC_TOOL_DIGEST_FILESUMMARIES_BASEPROMPT_CORE": "GA1.00.0"
 * }
 */
export const DOC_CODE_TOOL_DIGEST_GENERATOR_PROMPT: Prompt = (() => {
  const p = new Prompt();
  p.set('identity', PROMPTPART_SPECIFIC_TOOL_DIGESTGENERATOR_IDENTITY_CORESTATEMENT);
  p.set('purpose', PROMPTPART_SPECIFIC_TOOL_DIGESTGENERATOR_PURPOSE_CORESTATEMENT);
  p.set('output/base', PROMPTPART_SPECIFIC_TOOL_DIGEST_FILESUMMARIES_BASEPROMPT_CORE);
  p.set('constraints/json', PROMPTPART_SPECIFIC_TOOL_DIGESTGENERATOR_CONSTRAINTS_JSON_DETAILCONTENT);
  return p;
})();
