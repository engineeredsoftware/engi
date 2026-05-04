import { Tool } from '@bitcode/tools-generics';
import { generateNeedSatisfactionCriteria } from './need-comprehension-primitives';
import {
  GENERATE_NEED_SATISFACTION_CRITERIA_DOC_CODE_TOOL_PROMPT
} from './prompts/GenerateNeedSatisfactionCriteriaDocCodeToolPrompt';

/**
 * Canonical callable tool for generating Bitcode Need satisfaction criteria.
 *
 * @doc-code-tool
 * @prompt GENERATE_NEED_SATISFACTION_CRITERIA_DOC_CODE_TOOL_PROMPT
 */
export class GenerateNeedSatisfactionCriteriaTool extends Tool<typeof generateNeedSatisfactionCriteria> {
  use = generateNeedSatisfactionCriteria;
}

export const generateNeedSatisfactionCriteriaTool = new GenerateNeedSatisfactionCriteriaTool();
