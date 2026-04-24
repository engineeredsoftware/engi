/**
 * NEED COMPREHENSION PRIMITIVES
 *
 * Compatibility wrapper around canonical need-first primitive owners.
 * Bitcode does not have task-first product semantics, so task-named primitive
 * exports remain compatibility carriers only.
 */

export {
  analyzeNeedSemantics as analyzeTaskSemantics,
  extractNeedRequirements as extractRequirements,
  identifyNeedConstraints as identifyConstraints,
  generateNeedSatisfactionCriteria as generateSuccessCriteria,
  validateNeedComprehension as validateTaskComprehension,
  analyzeNeedSatisfactionImplementationComplexity as analyzeImplementationComplexity
} from './need-comprehension-primitives';
