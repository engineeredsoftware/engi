/**
 * NEED COMPREHENSION SCHEMAS
 *
 * Compatibility wrapper around the canonical need-first schema owners.
 * Bitcode does not have task-first product semantics, so task-named schema
 * exports remain compatibility carriers only.
 */

export {
  NeedIntentTypeSchema as NeedTypeSchema,
  NeedComprehensionCompatibilityPrimaryTypeSchema as TaskTypeSchema,
  NeedRequirementSchema as RequirementSchema,
  NeedConstraintSchema as ConstraintSchema,
  NeedSatisfactionCriterionSchema as SuccessCriteriaSchema
} from './need-comprehension-schemas';
