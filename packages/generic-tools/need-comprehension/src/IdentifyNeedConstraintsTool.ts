import { Tool } from '@bitcode/tools-generics';
import { identifyNeedConstraints } from './need-comprehension-primitives';
import {
  IDENTIFY_NEED_CONSTRAINTS_DOC_CODE_TOOL_PROMPT
} from './prompts/IdentifyNeedConstraintsDocCodeToolPrompt';

/**
 * Canonical callable tool for identifying Bitcode Need constraints.
 *
 * @doc-code-tool
 * @prompt IDENTIFY_NEED_CONSTRAINTS_DOC_CODE_TOOL_PROMPT
 */
export class IdentifyNeedConstraintsTool extends Tool<typeof identifyNeedConstraints> {
  use = identifyNeedConstraints;
}

export class IdentifyConstraintsTool extends IdentifyNeedConstraintsTool {}

export const identifyNeedConstraintsTool = new IdentifyNeedConstraintsTool();
export const identifyConstraintsTool = new IdentifyConstraintsTool();
