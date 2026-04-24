import { Tool } from '@bitcode/tools-generics';
import { validateNeedComprehension } from './need-comprehension-primitives';
import { validateTaskComprehension } from './primitives';
import {
  VALIDATE_NEED_COMPREHENSION_DOC_CODE_TOOL_PROMPT
} from './prompts/ValidateNeedComprehensionDocCodeToolPrompt';

/**
 * Canonical callable tool for validating Bitcode Need comprehension.
 *
 * @doc-code-tool
 * @prompt VALIDATE_NEED_COMPREHENSION_DOC_CODE_TOOL_PROMPT
 */
export class ValidateNeedComprehensionTool extends Tool<typeof validateNeedComprehension> {
  use = validateNeedComprehension;
}

export class ValidateTaskComprehensionTool extends Tool<typeof validateTaskComprehension> {
  use = validateTaskComprehension;
}

export const validateNeedComprehensionTool = new ValidateNeedComprehensionTool();
export const validateTaskComprehensionTool = new ValidateTaskComprehensionTool();
