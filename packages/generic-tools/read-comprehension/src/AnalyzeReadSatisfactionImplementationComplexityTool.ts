import { Tool } from '@bitcode/tools-generics';
import { analyzeReadSatisfactionImplementationComplexity } from './read-comprehension-primitives';
import {
  ANALYZE_READ_SATISFACTION_IMPLEMENTATION_COMPLEXITY_DOC_CODE_TOOL_PROMPT
} from './prompts/AnalyzeReadSatisfactionImplementationComplexityDocCodeToolPrompt';

/**
 * Canonical callable tool for estimating Read satisfaction implementation complexity.
 *
 * @doc-code-tool
 * @prompt ANALYZE_READ_SATISFACTION_IMPLEMENTATION_COMPLEXITY_DOC_CODE_TOOL_PROMPT
 */
export class AnalyzeReadSatisfactionImplementationComplexityTool extends Tool<
  typeof analyzeReadSatisfactionImplementationComplexity
> {
  use = analyzeReadSatisfactionImplementationComplexity;
}

export const analyzeReadSatisfactionImplementationComplexityTool =
  new AnalyzeReadSatisfactionImplementationComplexityTool();
