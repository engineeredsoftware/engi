/**
 * NEED COMPREHENSION SCHEMAS
 *
 * Compatibility schemas used by the retained task-comprehension package.
 * Existing type names remain stable while runtime prompts interpret the data as
 * Bitcode need, written-asset, asset-pack, proof, and shipping-wrapper state.
 */

import { z } from 'zod';

export const TaskTypeSchema = z.enum([
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

export const RequirementSchema = z.object({
  id: z.string(),
  description: z.string(),
  type: z.enum(['functional', 'non_functional', 'business', 'technical', 'constraint']),
  priority: z.enum(['critical', 'high', 'medium', 'low']),
  confidence: z.number().min(0).max(1),
  source: z.string(),
  dependencies: z.array(z.string()).optional(),
  acceptance_criteria: z.array(z.string()).optional()
});

export const ConstraintSchema = z.object({
  id: z.string(),
  description: z.string(),
  type: z.enum(['technical', 'business', 'resource', 'timeline', 'compliance', 'security']),
  severity: z.enum(['critical', 'high', 'medium', 'low']),
  mitigation_strategy: z.string(),
  validation_method: z.string()
});

export const SuccessCriteriaSchema = z.object({
  id: z.string(),
  description: z.string(),
  type: z.enum(['functional', 'performance', 'quality', 'business', 'user_experience']),
  measurement_method: z.string(),
  acceptance_threshold: z.string(),
  validation_approach: z.string()
});
