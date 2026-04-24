import { Tool } from '@bitcode/tools-generics';
import { analyzeNeedSemanticsTool } from './AnalyzeNeedSemanticsTool';
import {
  ANALYZE_NEED_SATISFACTION_IMPLEMENTATION_COMPLEXITY_DOC_CODE_TOOL_PROMPT
} from './prompts/AnalyzeNeedSatisfactionImplementationComplexityDocCodeToolPrompt';
import {
  EXTRACT_NEED_REQUIREMENTS_DOC_CODE_TOOL_PROMPT
} from './prompts/ExtractNeedRequirementsDocCodeToolPrompt';
import {
  GENERATE_NEED_SATISFACTION_CRITERIA_DOC_CODE_TOOL_PROMPT
} from './prompts/GenerateNeedSatisfactionCriteriaDocCodeToolPrompt';
import {
  IDENTIFY_NEED_CONSTRAINTS_DOC_CODE_TOOL_PROMPT
} from './prompts/IdentifyNeedConstraintsDocCodeToolPrompt';
import {
  VALIDATE_NEED_COMPREHENSION_DOC_CODE_TOOL_PROMPT
} from './prompts/ValidateNeedComprehensionDocCodeToolPrompt';
import {
  analyzeNeedSatisfactionImplementationComplexity,
  extractNeedRequirements,
  generateNeedSatisfactionCriteria,
  identifyNeedConstraints,
  validateNeedComprehension
} from './need-comprehension-primitives';

/**
 * Canonical Bitcode need-comprehension toolset.
 *
 * These tools are intentionally not agents. They provide callable, DocCode
 * prompt-bearing capabilities that a PTRR need-comprehension agent can compose
 * during setup before risk admission.
 */

/**
 * @doc-code-tool
 * @prompt EXTRACT_NEED_REQUIREMENTS_DOC_CODE_TOOL_PROMPT
 */
export class ExtractNeedRequirementsTool extends Tool<typeof extractNeedRequirements> {
  use = extractNeedRequirements;
}

/**
 * @doc-code-tool
 * @prompt IDENTIFY_NEED_CONSTRAINTS_DOC_CODE_TOOL_PROMPT
 */
export class IdentifyNeedConstraintsTool extends Tool<typeof identifyNeedConstraints> {
  use = identifyNeedConstraints;
}

/**
 * @doc-code-tool
 * @prompt GENERATE_NEED_SATISFACTION_CRITERIA_DOC_CODE_TOOL_PROMPT
 */
export class GenerateNeedSatisfactionCriteriaTool extends Tool<typeof generateNeedSatisfactionCriteria> {
  use = generateNeedSatisfactionCriteria;
}

/**
 * @doc-code-tool
 * @prompt VALIDATE_NEED_COMPREHENSION_DOC_CODE_TOOL_PROMPT
 */
export class ValidateNeedComprehensionTool extends Tool<typeof validateNeedComprehension> {
  use = validateNeedComprehension;
}

/**
 * @doc-code-tool
 * @prompt ANALYZE_NEED_SATISFACTION_IMPLEMENTATION_COMPLEXITY_DOC_CODE_TOOL_PROMPT
 */
export class AnalyzeNeedSatisfactionImplementationComplexityTool extends Tool<
  typeof analyzeNeedSatisfactionImplementationComplexity
> {
  use = analyzeNeedSatisfactionImplementationComplexity;
}

export class ExtractRequirementsTool extends ExtractNeedRequirementsTool {}
export class IdentifyConstraintsTool extends IdentifyNeedConstraintsTool {}
export class GenerateSuccessCriteriaTool extends GenerateNeedSatisfactionCriteriaTool {}
export class ValidateTaskComprehensionTool extends ValidateNeedComprehensionTool {}
export class AnalyzeImplementationComplexityTool extends AnalyzeNeedSatisfactionImplementationComplexityTool {}

export const extractNeedRequirementsTool = new ExtractNeedRequirementsTool();
export const identifyNeedConstraintsTool = new IdentifyNeedConstraintsTool();
export const generateNeedSatisfactionCriteriaTool = new GenerateNeedSatisfactionCriteriaTool();
export const validateNeedComprehensionTool = new ValidateNeedComprehensionTool();
export const analyzeNeedSatisfactionImplementationComplexityTool =
  new AnalyzeNeedSatisfactionImplementationComplexityTool();

export const extractRequirementsTool = new ExtractRequirementsTool();
export const identifyConstraintsTool = new IdentifyConstraintsTool();
export const generateSuccessCriteriaTool = new GenerateSuccessCriteriaTool();
export const validateTaskComprehensionTool = new ValidateTaskComprehensionTool();
export const analyzeImplementationComplexityTool = new AnalyzeImplementationComplexityTool();

export const BITCODE_NEED_COMPREHENSION_TOOLSET = [
  analyzeNeedSemanticsTool,
  extractNeedRequirementsTool,
  identifyNeedConstraintsTool,
  generateNeedSatisfactionCriteriaTool,
  validateNeedComprehensionTool,
  analyzeNeedSatisfactionImplementationComplexityTool
] as const;
