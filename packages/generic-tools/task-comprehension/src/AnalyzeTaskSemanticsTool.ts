import {
  AnalyzeNeedSemanticsTool,
  analyzeNeedSemanticsTool
} from './AnalyzeNeedSemanticsTool';

/**
 * Compatibility wrapper for the former task-named tool owner.
 * Bitcode does not have task-first product semantics; active ownership lives in
 * AnalyzeNeedSemanticsTool.
 */
export class AnalyzeTaskSemanticsTool extends AnalyzeNeedSemanticsTool {}

export const analyzeTaskSemanticsTool = new AnalyzeTaskSemanticsTool();
