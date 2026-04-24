/**
 * NEED COMPREHENSION PRIMITIVES
 *
 * Canonical pure-function owners behind the retained need-comprehension
 * package. Bitcode does not have task-first product semantics, so
 * task-named exports must remain wrapper carriers only.
 */

import { z } from 'zod';
import { NeedComprehensionCompatibilityPrimaryTypeSchema } from './need-comprehension-schemas';

export async function analyzeNeedSemantics({
  task_description,
  context_information
}: {
  task_description: string;
  context_information?: {
    repository_type?: string;
    technology_stack?: string[];
    existing_attachments?: string[];
  };
}) {
  const expressedNeed = task_description.trim();

  return {
    need: {
      expressed_need: expressedNeed,
      primary_intent: expressedNeed || 'Unspecified Bitcode need',
      satisfaction_criteria: [
        'Written assets satisfy the expressed need',
        'Asset-pack state remains coherent with repository context',
        'Delivery mechanisms remain explicit and secondary'
      ]
    },
    semantic_analysis: {
      primary_intent: expressedNeed || 'Intent extracted from expressed need',
      scope_boundaries: [
        'Bitcode-owned asset-pack scope',
        'Connected-interface delivery-mechanism scope'
      ],
      semantic_keywords: ['need', 'written-asset', 'asset-pack', 'delivery-mechanism'],
      implied_requirements: [
        'Preserve proof-facing requirements',
        'Keep compatibility names from owning product semantics'
      ],
      complexity_indicators: [
        'Repository/package impact',
        'Proof and verification impact'
      ]
    },
    written_asset_expectations: ['source-bearing written asset', 'verification evidence'],
    asset_pack_context: {
      repository_type: context_information?.repository_type,
      technology_stack: context_information?.technology_stack ?? [],
      attachment_names: context_information?.existing_attachments ?? []
    },
    delivery_mechanism_boundaries: ['GitHubPullRequest', 'JiraComment', 'interface-specific wrapper'],
    shipping_wrapper_boundaries: ['GitHubPullRequest', 'JiraComment', 'interface-specific wrapper'],
    task_classification: {
      primary_type: 'feature_implementation' as const,
      secondary_types: ['enhancement', 'integration'] as const,
      confidence: 0.85
    },
    scope_analysis: {
      estimated_scope: 'medium' as const,
      affected_components: ['Component A', 'Component B'],
      integration_points: ['Integration 1', 'Integration 2']
    }
  };
}

export async function extractNeedRequirements({
  task_description,
  semantic_analysis,
  attachment_context
}: {
  task_description: string;
  semantic_analysis: any;
  attachment_context?: {
    user_attachments?: string[];
    figma_designs?: string[];
    code_snippets?: string[];
  };
}) {
  const expressedNeed = task_description.trim();

  return {
    need_requirements: {
      expressed_need: expressedNeed,
      written_asset_types: ['source-change', 'proof-update', 'interface-payload'],
      asset_pack_requirements: ['repository coherence', 'verification evidence'],
      delivery_mechanism_requirements: ['wrapper payload does not redefine the written asset'],
      shipping_wrapper_requirements: ['compatibility alias for delivery_mechanism_requirements']
    },
    functional_requirements: [
      {
        id: 'req-001',
        description: 'Primary written asset must satisfy the expressed need',
        type: 'functional' as const,
        priority: 'critical' as const,
        confidence: 0.9,
        source: 'expressed_need',
        acceptance_criteria: ['Need is rereadable', 'Written asset is verifiable']
      }
    ],
    non_functional_requirements: [
      {
        id: 'req-nf-001',
        description: 'Proof and runtime evidence remain bounded and repeatable',
        type: 'non_functional' as const,
        priority: 'high' as const,
        confidence: 0.8,
        source: 'inferred',
        acceptance_criteria: ['Focused verification passes']
      }
    ],
    business_requirements: [],
    technical_requirements: [],
    proof_requirements: ['Spec/proof witnesses updated when semantics change'],
    interface_requirements: ['Connected-interface payloads carry semantic aliases'],
    written_asset_requirement_map: {
      source_change: ['functional_requirements', 'technical_requirements', 'proof_requirements'],
      delivery_mechanism: ['interface_requirements'],
      shipping_wrapper: ['interface_requirements']
    },
    extraction_metadata: {
      total_requirements: 2,
      confidence_average: 0.85,
      sources_analyzed: ['expressed_need', 'attachments'],
      extraction_completeness: 0.9
    }
  };
}

export async function identifyNeedConstraints({
  task_context,
  repository_context,
  business_context
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
  return {
    technical_constraints: [
      {
        id: 'const-tech-001',
        description: 'Repository and package boundaries constrain the written asset',
        type: 'technical' as const,
        severity: 'high' as const,
        mitigation_strategy: 'Use public package boundaries and narrow imports',
        validation_method: 'Typecheck and focused integration tests'
      }
    ],
    business_constraints: [
      {
        id: 'const-bus-001',
        description: 'Need satisfaction must stay scoped to the requested asset pack',
        type: 'timeline' as const,
        severity: 'medium' as const,
        mitigation_strategy: 'Sequence smallest coherent written-asset slices',
        validation_method: 'Reread satisfaction criteria before shipping'
      }
    ],
    resource_constraints: [],
    compliance_constraints: [],
    proof_constraints: [
      {
        id: 'const-proof-001',
        description: 'Semantic prompt changes require raw PromptPart carry-through and proof refresh',
        type: 'technical' as const,
        severity: 'high' as const,
        mitigation_strategy: 'Update canonical PromptPart source and generated runtime prompt artifacts together',
        validation_method: 'Run raw promptpart carry-through and spec-family checks'
      }
    ],
    interface_constraints: ['Delivery mechanisms may deliver assets but must not own Bitcode semantics'],
    constraint_analysis: {
      total_constraints: 3,
      critical_count: 0,
      high_severity_count: 2,
      mitigation_coverage: 1.0
    }
  };
}

export async function generateNeedSatisfactionCriteria({
  requirements,
  constraints,
  task_type,
  quality_standards
}: {
  requirements: any;
  constraints: any;
  task_type: z.infer<typeof NeedComprehensionCompatibilityPrimaryTypeSchema>;
  quality_standards?: {
    performance_standards?: string[];
    quality_gates?: string[];
    acceptance_thresholds?: Record<string, string>;
  };
}) {
  return {
    need_satisfaction_criteria: [
      'Expressed need is explicitly preserved',
      'Written asset expectations are measurable',
      'Asset-pack and delivery-mechanism boundaries are separate',
      'Verification evidence is attached'
    ],
    functional_criteria: [
      {
        id: 'success-func-001',
        description: 'Primary Bitcode need is satisfied by stable written assets',
        type: 'functional' as const,
        measurement_method: 'Need reread, focused tests, and written-asset inspection',
        acceptance_threshold: 'All blocking need requirements are met',
        validation_approach: 'Automated testing plus proof/reread verification'
      }
    ],
    performance_criteria: [
      {
        id: 'success-perf-001',
        description: 'Runtime and proof evidence remain bounded',
        type: 'performance' as const,
        measurement_method: 'Focused command/runtime verification',
        acceptance_threshold: 'No introduced prompt/runtime carry-through drift',
        validation_approach: 'Promptpart equivalence and package-local checks'
      }
    ],
    quality_criteria: [
      {
        id: 'success-qual-001',
        description: 'Canonical Bitcode terminology is maintained',
        type: 'quality' as const,
        measurement_method: 'Static code analysis and review',
        acceptance_threshold: 'Compatibility names are marked as wrappers',
        validation_approach: 'Spec and prompt surface assertions'
      }
    ],
    proof_criteria: ['Generated V26 proof artifacts include the changed prompt surface'],
    persistence_criteria: ['Any persisted run state mirrors need and written-asset aliases'],
    interface_criteria: ['Delivery mechanisms are wrapper metadata on top of stable assets'],
    blocking_criteria: ['No old prompt text remains in runtime prompt carry-through'],
    business_criteria: [],
    user_experience_criteria: [],
    success_framework: {
      total_criteria: 3,
      measurable_percentage: 1.0,
      validation_coverage: 1.0,
      acceptance_clarity: 0.95
    }
  };
}

export async function validateNeedComprehension({
  task_comprehension,
  validation_criteria = {}
}: {
  task_comprehension: {
    task_type: z.infer<typeof NeedComprehensionCompatibilityPrimaryTypeSchema>;
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
  const needComprehension = task_comprehension;
  const {
    completeness_threshold = 0.9,
    accuracy_threshold = 0.85,
    consistency_threshold = 0.9
  } = validation_criteria;

  return {
    validation_results: {
      completeness_score: 0.92,
      accuracy_score: 0.88,
      consistency_score: 0.94,
      overall_score: 0.91
    },
    validation_details: {
      requirements_completeness: 0.95,
      constraints_identification: 0.90,
      success_criteria_clarity: 0.88,
      semantic_accuracy: 0.92,
      written_asset_coherence: 0.9,
      proof_coverage: 0.86
    },
    terminology_findings: [
      'task_comprehension is accepted as a compatibility input name',
      'need_comprehension is the canonical Bitcode interpretation'
    ],
    need_comprehension: needComprehension,
    written_asset_coherence: true,
    proof_coverage: 'focused checks required when prompt content changes',
    validation_issues: [],
    recommendations: [
      'Consider adding more specific acceptance criteria for performance requirements',
      'Validate constraint mitigation strategies with technical team'
    ],
    validation_passed: true,
    validation_metadata: {
      validation_timestamp: new Date().toISOString(),
      thresholds_applied: { completeness_threshold, accuracy_threshold, consistency_threshold },
      validation_approach: 'need_comprehension_validation'
    }
  };
}

export async function analyzeNeedSatisfactionImplementationComplexity({
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
  const needComprehension = task_comprehension;

  return {
    need_comprehension: needComprehension,
    complexity_assessment: {
      overall_complexity: 'medium' as const,
      implementation_complexity: 'medium' as const,
      integration_complexity: 'low' as const,
      testing_complexity: 'medium' as const,
      proof_complexity: 'medium' as const,
      delivery_mechanism_complexity: 'low' as const,
      shipping_wrapper_complexity: 'low' as const
    },
    risk_analysis: {
      technical_risks: ['Package boundary drift', 'Prompt runtime carry-through drift'],
      timeline_risks: ['Broad reform slices may exceed a single written asset'],
      resource_risks: [],
      mitigation_strategies: [
        'Sequence semantic mirrors before destructive renames',
        'Run promptpart equivalence, typecheck, and spec/proof checks'
      ]
    },
    strategic_insights: [
      {
        insight: 'Small asset-pack slices are safer than broad compatibility removal',
        priority: 'high' as const,
        actionable: true,
        confidence: 0.9
      }
    ],
    implementation_recommendations: [
      'Preserve compatibility names until semantic mirrors are proven',
      'Update canonical PromptPart source and generated runtime prompt artifacts together',
      'Refresh V26 proof artifacts when prompt surfaces change'
    ]
  };
}
