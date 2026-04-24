import {
  AnalyzeNeedSemanticsTool,
  analyzeNeedSemanticsTool
} from './AnalyzeNeedSemanticsTool';

/**
 * Compatibility wrapper for task-named tool calls.
 * Bitcode does not have task-first product semantics; active ownership lives in
 * AnalyzeNeedSemanticsTool.
 */
export class AnalyzeTaskSemanticsTool extends AnalyzeNeedSemanticsTool {}

export const analyzeTaskSemanticsTool = new AnalyzeTaskSemanticsTool();
