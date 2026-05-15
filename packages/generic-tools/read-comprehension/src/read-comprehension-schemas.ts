/**
 * READ COMPREHENSION SCHEMAS
 *
 * Canonical schema owners for the read-comprehension package.
 * Bitcode Read ownership is direct here; removed pre-reform schema aliases must
 * not re-enter this source boundary.
 */

import { z } from 'zod';

/**
 * Canonical Bitcode classifier for the kind of Read being measured before an
 * AssetPack run. The string values are deliberately stable because execution
 * evidence and prompt proofs depend on them.
 */
export const ReadIntentTypeSchema = z.enum([
  'feature_implementation',
  'bug_fix',
  'enhancement',
  'refactoring',
  'performance_optimization',
  'security_fix',
  'documentation',
  'testing',
  'infrastructure',
  'integration',
  'migration',
  'other'
]);

export const ReadRequirementSchema = z.object({
  id: z.string(),
  description: z.string(),
  type: z.enum(['functional', 'non_functional', 'business', 'technical', 'constraint']),
  priority: z.enum(['critical', 'high', 'medium', 'low']),
  confidence: z.number().min(0).max(1),
  source: z.string(),
  dependencies: z.array(z.string()).optional(),
  acceptance_criteria: z.array(z.string()).optional()
});

export const ReadConstraintSchema = z.object({
  id: z.string(),
  description: z.string(),
  type: z.enum(['technical', 'business', 'resource', 'timeline', 'compliance', 'security']),
  severity: z.enum(['critical', 'high', 'medium', 'low']),
  mitigation_strategy: z.string(),
  validation_method: z.string()
});

export const ReadSatisfactionCriterionSchema = z.object({
  id: z.string(),
  description: z.string(),
  type: z.enum(['functional', 'performance', 'quality', 'business', 'user_experience']),
  measurement_method: z.string(),
  acceptance_threshold: z.string(),
  validation_approach: z.string()
});
