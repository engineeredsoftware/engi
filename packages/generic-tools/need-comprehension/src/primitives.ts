/**
 * NEED COMPREHENSION PRIMITIVES
 *
 * Compatibility wrapper around canonical need-first primitive owners.
 * Bitcode does not have task-first product semantics, so task-named primitive
 * exports remain compatibility carriers only.
 */

import {
  analyzeNeedSemantics,
  extractNeedRequirements,
  identifyNeedConstraints,
  generateNeedSatisfactionCriteria,
  validateNeedComprehension,
  analyzeNeedSatisfactionImplementationComplexity
} from './need-comprehension-primitives';

export async function analyzeTaskSemantics({
  task_description,
  ...input
}: {
  task_description: string;
  context_information?: {
    repository_type?: string;
    technology_stack?: string[];
    existing_attachments?: string[];
  };
}) {
  const result = await analyzeNeedSemantics({
    expressed_need: task_description,
    context_information: input.context_information
  });

  return {
    ...result,
    task_classification: {
      primary_type: result.need_classification.primary_need_type,
      secondary_types: result.need_classification.related_need_types,
      confidence: result.need_classification.confidence
    }
  };
}

export async function extractRequirements({
  task_description,
  ...input
}: {
  task_description: string;
  semantic_analysis: any;
  attachment_context?: {
    user_attachments?: string[];
    figma_designs?: string[];
    code_snippets?: string[];
  };
}) {
  return extractNeedRequirements({
    expressed_need: task_description,
    semantic_analysis: input.semantic_analysis,
    attachment_context: input.attachment_context
  });
}

export async function identifyConstraints({
  task_context,
  ...input
}: {
  task_context: any;
  repository_context?: {
    technology_stack?: string[];
    existing_architecture?: string;
    deployment_environment?: string;
  };
  business_context?: {
    timeline_constraints?: string;
    resource_constraints?: string;
    compliance_requirements?: string[];
  };
}) {
  return identifyNeedConstraints({
    need_context: task_context,
    repository_context: input.repository_context,
    business_context: input.business_context
  });
}

export async function generateSuccessCriteria({
  task_type,
  ...input
}: {
  requirements: any;
  constraints: any;
  task_type: any;
  quality_standards?: {
    performance_standards?: string[];
    quality_gates?: string[];
    acceptance_thresholds?: Record<string, string>;
  };
}) {
  return generateNeedSatisfactionCriteria({
    requirements: input.requirements,
    constraints: input.constraints,
    need_type: task_type,
    quality_standards: input.quality_standards
  });
}

export async function validateTaskComprehension({
  task_comprehension,
  validation_criteria
}: {
  task_comprehension: {
    task_type: any;
    requirements: any;
    constraints: any;
    success_criteria: any;
    semantic_analysis?: any;
  };
  validation_criteria?: {
    completeness_threshold?: number;
    accuracy_threshold?: number;
    consistency_threshold?: number;
  };
}) {
  const result = await validateNeedComprehension({
    need_comprehension: {
      need_type: task_comprehension.task_type,
      requirements: task_comprehension.requirements,
      constraints: task_comprehension.constraints,
      need_satisfaction_criteria: task_comprehension.success_criteria,
      semantic_analysis: task_comprehension.semantic_analysis
    },
    validation_criteria
  });

  return {
    ...result,
    task_comprehension
  };
}

export async function analyzeImplementationComplexity({
  task_comprehension,
  repository_context
}: {
  task_comprehension: any;
  repository_context?: {
    codebase_size?: string;
    architecture_complexity?: string;
    technology_maturity?: string;
  };
}) {
  return analyzeNeedSatisfactionImplementationComplexity({
    need_comprehension: task_comprehension,
    repository_context
  });
}
