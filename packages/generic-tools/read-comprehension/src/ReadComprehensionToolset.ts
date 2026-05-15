import { analyzeReadSemanticsTool } from './AnalyzeReadSemanticsTool';
import {
  analyzeReadSatisfactionImplementationComplexityTool,
  AnalyzeReadSatisfactionImplementationComplexityTool
} from './AnalyzeReadSatisfactionImplementationComplexityTool';
import {
  extractReadRequirementsTool,
  ExtractReadRequirementsTool
} from './ExtractReadRequirementsTool';
import {
  generateReadSatisfactionCriteriaTool,
  GenerateReadSatisfactionCriteriaTool
} from './GenerateReadSatisfactionCriteriaTool';
import {
  identifyReadConstraintsTool,
  IdentifyReadConstraintsTool
} from './IdentifyReadConstraintsTool';
import {
  validateReadComprehensionTool,
  ValidateReadComprehensionTool
} from './ValidateReadComprehensionTool';

/**
 * Canonical Bitcode read-comprehension tool collection.
 *
 * These individually defined tools are intentionally not agents. This file
 * only aggregates callable, DocCode prompt-bearing capabilities that a PTRR
 * read-comprehension agent can compose during setup before risk admission.
 */
export {
  analyzeReadSatisfactionImplementationComplexityTool,
  AnalyzeReadSatisfactionImplementationComplexityTool,
  extractReadRequirementsTool,
  ExtractReadRequirementsTool,
  generateReadSatisfactionCriteriaTool,
  GenerateReadSatisfactionCriteriaTool,
  identifyReadConstraintsTool,
  IdentifyReadConstraintsTool,
  validateReadComprehensionTool,
  ValidateReadComprehensionTool
};

export const BITCODE_READ_COMPREHENSION_TOOLSET = [
  analyzeReadSemanticsTool,
  extractReadRequirementsTool,
  identifyReadConstraintsTool,
  generateReadSatisfactionCriteriaTool,
  validateReadComprehensionTool,
  analyzeReadSatisfactionImplementationComplexityTool
] as const;
