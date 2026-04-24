import { Tool } from '@bitcode/tools-generics';
import { analyzeTaskSemantics } from './primitives';
import {
  ANALYZE_TASK_SEMANTICS_DOC_CODE_TOOL_PROMPT
} from './prompts/AnalyzeTaskSemanticsDocCodeToolPrompt';

/**
 * Compatibility wrapper for task-named tool calls.
 * Bitcode does not have task-first product semantics; active ownership lives in
 * AnalyzeNeedSemanticsTool.
 *
 * @doc-code-tool
 * @prompt ANALYZE_TASK_SEMANTICS_DOC_CODE_TOOL_PROMPT
 */
export class AnalyzeTaskSemanticsTool extends Tool<typeof analyzeTaskSemantics> {
  use = analyzeTaskSemantics;
}

export const analyzeTaskSemanticsTool = new AnalyzeTaskSemanticsTool();
