import { analyzeNeedSemanticsTool } from './AnalyzeNeedSemanticsTool';
import {
  analyzeNeedSatisfactionImplementationComplexityTool,
  AnalyzeNeedSatisfactionImplementationComplexityTool
} from './AnalyzeNeedSatisfactionImplementationComplexityTool';
import {
  extractNeedRequirementsTool,
  ExtractNeedRequirementsTool
} from './ExtractNeedRequirementsTool';
import {
  generateNeedSatisfactionCriteriaTool,
  GenerateNeedSatisfactionCriteriaTool
} from './GenerateNeedSatisfactionCriteriaTool';
import {
  identifyNeedConstraintsTool,
  IdentifyNeedConstraintsTool
} from './IdentifyNeedConstraintsTool';
import {
  validateNeedComprehensionTool,
  ValidateNeedComprehensionTool
} from './ValidateNeedComprehensionTool';

/**
 * Canonical Bitcode need-comprehension tool collection.
 *
 * These individually defined tools are intentionally not agents. This file
 * only aggregates callable, DocCode prompt-bearing capabilities that a PTRR
 * need-comprehension agent can compose during setup before risk admission.
 */
export {
  analyzeNeedSatisfactionImplementationComplexityTool,
  AnalyzeNeedSatisfactionImplementationComplexityTool,
  extractNeedRequirementsTool,
  ExtractNeedRequirementsTool,
  generateNeedSatisfactionCriteriaTool,
  GenerateNeedSatisfactionCriteriaTool,
  identifyNeedConstraintsTool,
  IdentifyNeedConstraintsTool,
  validateNeedComprehensionTool,
  ValidateNeedComprehensionTool
};

export const BITCODE_NEED_COMPREHENSION_TOOLSET = [
  analyzeNeedSemanticsTool,
  extractNeedRequirementsTool,
  identifyNeedConstraintsTool,
  generateNeedSatisfactionCriteriaTool,
  validateNeedComprehensionTool,
  analyzeNeedSatisfactionImplementationComplexityTool
] as const;
