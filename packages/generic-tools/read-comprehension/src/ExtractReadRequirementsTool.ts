import { Tool } from '@bitcode/tools-generics';
import { extractReadRequirements } from './read-comprehension-primitives';
import {
  EXTRACT_READ_REQUIREMENTS_DOC_CODE_TOOL_PROMPT
} from './prompts/ExtractReadRequirementsDocCodeToolPrompt';

/**
 * Canonical callable tool for extracting Bitcode Read requirements.
 *
 * @doc-code-tool
 * @prompt EXTRACT_READ_REQUIREMENTS_DOC_CODE_TOOL_PROMPT
 */
export class ExtractReadRequirementsTool extends Tool<typeof extractReadRequirements> {
  use = extractReadRequirements;
}

export const extractReadRequirementsTool = new ExtractReadRequirementsTool();
