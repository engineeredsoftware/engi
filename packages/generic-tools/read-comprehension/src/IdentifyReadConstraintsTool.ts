import { Tool } from '@bitcode/tools-generics';
import { identifyReadConstraints } from './read-comprehension-primitives';
import {
  IDENTIFY_READ_CONSTRAINTS_DOC_CODE_TOOL_PROMPT
} from './prompts/IdentifyReadConstraintsDocCodeToolPrompt';

/**
 * Canonical callable tool for identifying Bitcode Read constraints.
 *
 * @doc-code-tool
 * @prompt IDENTIFY_READ_CONSTRAINTS_DOC_CODE_TOOL_PROMPT
 */
export class IdentifyReadConstraintsTool extends Tool<typeof identifyReadConstraints> {
  use = identifyReadConstraints;
}

export const identifyReadConstraintsTool = new IdentifyReadConstraintsTool();
