import { Tool } from '@bitcode/tools-generics';
import { generateReadSatisfactionCriteria } from './read-comprehension-primitives';
import {
  GENERATE_READ_SATISFACTION_CRITERIA_DOC_CODE_TOOL_PROMPT
} from './prompts/GenerateReadSatisfactionCriteriaDocCodeToolPrompt';

/**
 * Canonical callable tool for generating Bitcode Read satisfaction criteria.
 *
 * @doc-code-tool
 * @prompt GENERATE_READ_SATISFACTION_CRITERIA_DOC_CODE_TOOL_PROMPT
 */
export class GenerateReadSatisfactionCriteriaTool extends Tool<typeof generateReadSatisfactionCriteria> {
  use = generateReadSatisfactionCriteria;
}

export const generateReadSatisfactionCriteriaTool = new GenerateReadSatisfactionCriteriaTool();
