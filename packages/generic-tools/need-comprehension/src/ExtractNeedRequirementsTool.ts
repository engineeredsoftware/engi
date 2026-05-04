import { Tool } from '@bitcode/tools-generics';
import { extractNeedRequirements } from './need-comprehension-primitives';
import {
  EXTRACT_NEED_REQUIREMENTS_DOC_CODE_TOOL_PROMPT
} from './prompts/ExtractNeedRequirementsDocCodeToolPrompt';

/**
 * Canonical callable tool for extracting Bitcode Need requirements.
 *
 * @doc-code-tool
 * @prompt EXTRACT_NEED_REQUIREMENTS_DOC_CODE_TOOL_PROMPT
 */
export class ExtractNeedRequirementsTool extends Tool<typeof extractNeedRequirements> {
  use = extractNeedRequirements;
}

export const extractNeedRequirementsTool = new ExtractNeedRequirementsTool();
