import { Tool } from '@bitcode/tools-generics';
import { analyzeNeedSatisfactionImplementationComplexity } from './need-comprehension-primitives';
import {
  ANALYZE_NEED_SATISFACTION_IMPLEMENTATION_COMPLEXITY_DOC_CODE_TOOL_PROMPT
} from './prompts/AnalyzeNeedSatisfactionImplementationComplexityDocCodeToolPrompt';

/**
 * Canonical callable tool for estimating Need satisfaction implementation complexity.
 *
 * @doc-code-tool
 * @prompt ANALYZE_NEED_SATISFACTION_IMPLEMENTATION_COMPLEXITY_DOC_CODE_TOOL_PROMPT
 */
export class AnalyzeNeedSatisfactionImplementationComplexityTool extends Tool<
  typeof analyzeNeedSatisfactionImplementationComplexity
> {
  use = analyzeNeedSatisfactionImplementationComplexity;
}

export class AnalyzeImplementationComplexityTool extends AnalyzeNeedSatisfactionImplementationComplexityTool {}

export const analyzeNeedSatisfactionImplementationComplexityTool =
  new AnalyzeNeedSatisfactionImplementationComplexityTool();
export const analyzeImplementationComplexityTool = new AnalyzeImplementationComplexityTool();
