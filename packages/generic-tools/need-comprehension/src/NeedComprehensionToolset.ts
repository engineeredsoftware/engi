import { analyzeNeedSemanticsTool } from './AnalyzeNeedSemanticsTool';
import {
  analyzeImplementationComplexityTool,
  analyzeNeedSatisfactionImplementationComplexityTool,
  AnalyzeImplementationComplexityTool,
  AnalyzeNeedSatisfactionImplementationComplexityTool
} from './AnalyzeNeedSatisfactionImplementationComplexityTool';
import {
  extractNeedRequirementsTool,
  extractRequirementsTool,
  ExtractNeedRequirementsTool,
  ExtractRequirementsTool
} from './ExtractNeedRequirementsTool';
import {
  generateNeedSatisfactionCriteriaTool,
  generateSuccessCriteriaTool,
  GenerateNeedSatisfactionCriteriaTool,
  GenerateSuccessCriteriaTool
} from './GenerateNeedSatisfactionCriteriaTool';
import {
  identifyConstraintsTool,
  identifyNeedConstraintsTool,
  IdentifyConstraintsTool,
  IdentifyNeedConstraintsTool
} from './IdentifyNeedConstraintsTool';
import {
  validateNeedComprehensionTool,
  validateTaskComprehensionTool,
  ValidateNeedComprehensionTool,
  ValidateTaskComprehensionTool
} from './ValidateNeedComprehensionTool';

/**
 * Canonical Bitcode need-comprehension tool collection.
 *
 * These individually defined tools are intentionally not agents. This file
 * only aggregates callable, DocCode prompt-bearing capabilities that a PTRR
 * need-comprehension agent can compose during setup before risk admission.
 */
export {
  analyzeImplementationComplexityTool,
  analyzeNeedSatisfactionImplementationComplexityTool,
  AnalyzeImplementationComplexityTool,
  AnalyzeNeedSatisfactionImplementationComplexityTool,
  extractNeedRequirementsTool,
  extractRequirementsTool,
  ExtractNeedRequirementsTool,
  ExtractRequirementsTool,
  generateNeedSatisfactionCriteriaTool,
  generateSuccessCriteriaTool,
  GenerateNeedSatisfactionCriteriaTool,
  GenerateSuccessCriteriaTool,
  identifyConstraintsTool,
  identifyNeedConstraintsTool,
  IdentifyConstraintsTool,
  IdentifyNeedConstraintsTool,
  validateNeedComprehensionTool,
  validateTaskComprehensionTool,
  ValidateNeedComprehensionTool,
  ValidateTaskComprehensionTool
};

export const BITCODE_NEED_COMPREHENSION_TOOLSET = [
  analyzeNeedSemanticsTool,
  extractNeedRequirementsTool,
  identifyNeedConstraintsTool,
  generateNeedSatisfactionCriteriaTool,
  validateNeedComprehensionTool,
  analyzeNeedSatisfactionImplementationComplexityTool
] as const;
