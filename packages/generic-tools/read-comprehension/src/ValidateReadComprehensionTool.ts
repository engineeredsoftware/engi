import { Tool } from '@bitcode/tools-generics';
import { validateReadComprehension } from './read-comprehension-primitives';
import {
  VALIDATE_READ_COMPREHENSION_DOC_CODE_TOOL_PROMPT
} from './prompts/ValidateReadComprehensionDocCodeToolPrompt';

/**
 * Canonical callable tool for validating Bitcode Read comprehension.
 *
 * @doc-code-tool
 * @prompt VALIDATE_READ_COMPREHENSION_DOC_CODE_TOOL_PROMPT
 */
export class ValidateReadComprehensionTool extends Tool<typeof validateReadComprehension> {
  use = validateReadComprehension;
}

export const validateReadComprehensionTool = new ValidateReadComprehensionTool();
