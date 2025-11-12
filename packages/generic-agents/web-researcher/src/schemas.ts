import { z } from 'zod';
import { StepToolPlanSchema, StepToolResultSchema } from '@/lib/steps/types';

// ---------------------------------------------------------------------------
// Enhanced Research Schemas for Multi-Wave Intelligence
// ---------------------------------------------------------------------------

// Context Analysis Types
export const TechnologyStackSchema = z.object({
  languages: z.array(z.string()),
  frameworks: z.array(z.string()),
  libraries: z.array(z.string()),
  tools: z.array(z.string()),
  platforms: z.array(z.string())
});

export const ArchitectureContextSchema = z.object({
  patterns: z.array(z.string()),
  paradigms: z.array(z.string()),
  serviceType: z.enum(['monolith', 'microservices', 'serverless', 'hybrid', 'unknown']),
  scalingApproach: z.array(z.string())
});

export const CodebaseContextSchema = z.object({
  projectStructure: z.array(z.string()),
  codePatterns: z.array(z.string()),
  testingApproach: z.array(z.string()),
  buildSystem: z.array(z.string())
});

export const DependencyContextSchema = z.object({
  dependencies: z.array(z.object({
    name: z.string(),
    version: z.string(),
    type: z.enum(['production', 'development', 'peer']),
    ecosystem: z.string()
  })),
  vulnerabilities: z.array(z.string()),
  outdatedPackages: z.array(z.string()),
  conflicts: z.array(z.string())
});

export const ContextAnalysisSchema = z.object({
  technologyStack: TechnologyStackSchema,
  architecture: ArchitectureContextSchema,
  codebase: CodebaseContextSchema,
  dependencies: DependencyContextSchema
});

// Query Strategy Types
export const QueryCategorySchema = z.enum([
  'implementation',
  'architecture', 
  'debugging',
  'optimization',
  'security',
  'testing',
  'deployment',
  'integration',
  'best-practices',
  'comparison'
]);

export const QueryStrategySchema = z.object({
  baseQueries: z.array(z.string()),
  contextualQueries: z.array(z.object({
    query: z.string(),
    category: QueryCategorySchema,
    rationale: z.string(),
    priority: z.number()
  })),
  architectureQueries: z.array(z.string()),
  technologyQueries: z.array(z.string()),
  dependencyQueries: z.array(z.string()),
  urlEnhancedQueries: z.array(z.string())
});

// Research Wave Types
export const ResearchWaveSchema = z.object({
  waveNumber: z.number(),
  queries: z.array(z.string()),
  providers: z.array(z.string()),
  rationale: z.string(),
  expectedOutcomes: z.array(z.string())
});

export const FollowUpQuerySchema = z.object({
  text: z.string(),
  category: QueryCategorySchema,
  rationale: z.string(),
  priority: z.number(),
  optimalProviders: z.array(z.string()),
  expectedDepth: z.enum(['surface', 'moderate', 'deep'])
});

export const ResearchGapSchema = z.object({
  area: z.string(),
  description: z.string(),
  priority: z.enum(['low', 'medium', 'high', 'critical']),
  suggestedQueries: z.array(z.string())
});

// Quality Assessment Types
export const MultiWaveQualitySchema = z.object({
  relevance: z.number(),
  diversity: z.number(),
  authority: z.number(),
  depth: z.number(),
  contradictionResolution: z.number(),
  initialWaveQuality: z.number(),
  followUpWaveQuality: z.number(),
  overallScore: z.number()
});

export const SynthesisReadinessSchema = z.object({
  score: z.number(),
  ready: z.boolean(),
  missingAreas: z.array(z.string()),
  strengthAreas: z.array(z.string())
});

// Synthesis Types
export const ContradictionSchema = z.object({
  topic: z.string(),
  conflictingSources: z.array(z.object({
    source: z.string(),
    position: z.string(),
    authority: z.number()
  })),
  resolution: z.string(),
  confidence: z.number()
});

export const ImplementationStepSchema = z.object({
  stepNumber: z.number(),
  action: z.string(),
  rationale: z.string(),
  dependencies: z.array(z.string()),
  risks: z.array(z.string()),
  alternatives: z.array(z.string())
});

export const RiskAssessmentSchema = z.object({
  risk: z.string(),
  probability: z.enum(['low', 'medium', 'high']),
  impact: z.enum(['low', 'medium', 'high', 'critical']),
  mitigation: z.string(),
  monitoring: z.string()
});

export const AdvancedSynthesisSchema = z.object({
  crossSourceInsights: z.array(z.string()),
  contradictionResolution: z.object({
    resolved: z.array(ContradictionSchema),
    unresolved: z.array(ContradictionSchema)
  }),
  implementationPath: z.array(ImplementationStepSchema),
  bestPracticeConsolidation: z.array(z.string()),
  technologyRecommendations: z.array(z.object({
    technology: z.string(),
    recommendation: z.enum(['strongly-recommended', 'recommended', 'neutral', 'not-recommended', 'avoid']),
    rationale: z.string(),
    alternatives: z.array(z.string())
  })),
  riskAssessmentAndMitigation: z.array(RiskAssessmentSchema),
  architecturalGuidance: z.array(z.string())
});

// Enhanced PTRR Schemas (Plan-Try-Refine-Retry)
export const EnhancedPlanResultSchema = z.object({
  contextAnalysis: ContextAnalysisSchema,
  queryStrategy: QueryStrategySchema,
  researchWaves: z.array(ResearchWaveSchema),
  urlAnalysis: z.object({
    urlsFound: z.number(),
    suggestedDomains: z.array(z.string()),
    contentTopics: z.array(z.string()),
    enhancedQueries: z.array(z.string())
  }).optional(),
  nextStepsToolsPlans: z.array(StepToolPlanSchema).default([]),
  success: z.boolean(),
  error: z.string().optional(),
  _metadata: z.record(z.any()).optional()
}).describe('EnhancedPlanResult');

export const EnhancedGenerateResultSchema = z.object({
  initialWaveResults: z.object({
    queries: z.array(z.string()),
    totalResults: z.number(),
    providersUsed: z.array(z.string()),
    qualityScore: z.number()
  }),
  followUpStrategy: z.object({
    queries: z.array(FollowUpQuerySchema),
    gaps: z.array(z.string()),
    contradictions: z.array(z.string()),
    deepDiveAreas: z.array(z.string())
  }),
  followUpResults: z.object({
    queries: z.array(z.string()),
    totalResults: z.number(),
    gapsAddressed: z.array(z.string())
  }).optional(),
  comprehensiveFindings: z.array(z.object({
    title: z.string(),
    url: z.string(),
    summary: z.string(),
    relevance: z.number(),
    query: z.string(),
    provider: z.string(),
    wave: z.number()
  })),
  urlIntelligence: z.object({
    domainsScoped: z.array(z.string()),
    technologiesDetected: z.array(z.string()),
    urlTypesFound: z.array(z.string())
  }).optional(),
  previousStepsToolsPlansResults: z.array(StepToolResultSchema),
  nextStepsToolsPlans: z.array(StepToolPlanSchema).default([]),
  success: z.boolean(),
  error: z.string().optional(),
  _metadata: z.record(z.any()).optional()
}).describe('EnhancedGenerateResult');

export const EnhancedRefineResultSchema = z.object({
  comprehensiveQuality: MultiWaveQualitySchema,
  researchGaps: z.array(ResearchGapSchema),
  synthesisReadiness: SynthesisReadinessSchema,
  recommendations: z.array(z.string()),
  nextStepsToolsPlans: z.array(StepToolPlanSchema).default([]),
  success: z.boolean(),
  error: z.string().optional(),
  _metadata: z.record(z.any()).optional()
}).describe('EnhancedRefineResult');

export const EnhancedRetryResultSchema = z.object({
  advancedSynthesis: AdvancedSynthesisSchema,
  comprehensiveFindings: z.object({
    totalSources: z.number(),
    totalInsights: z.number(),
    qualityScore: z.number(),
    coverageScore: z.number()
  }),
  implementationGuidance: z.object({
    primaryPath: z.array(ImplementationStepSchema),
    alternativePaths: z.array(z.array(ImplementationStepSchema)),
    riskMitigation: z.array(RiskAssessmentSchema)
  }),
  taskRelevance: z.number(),
  feedback: z.string(),
  previousStepsToolsPlansResults: z.array(StepToolResultSchema).optional(),
  nextStepsToolsPlans: z.array(StepToolPlanSchema).default([]),
  success: z.boolean(),
  error: z.string().optional(),
  _metadata: z.record(z.any()).optional()
}).describe('EnhancedRetryResult');

// Type exports for TypeScript
export type TechnologyStack = z.infer<typeof TechnologyStackSchema>;
export type ArchitectureContext = z.infer<typeof ArchitectureContextSchema>;
export type CodebaseContext = z.infer<typeof CodebaseContextSchema>;
export type DependencyContext = z.infer<typeof DependencyContextSchema>;
export type ContextAnalysis = z.infer<typeof ContextAnalysisSchema>;
export type QueryStrategy = z.infer<typeof QueryStrategySchema>;
export type ResearchWave = z.infer<typeof ResearchWaveSchema>;
export type FollowUpQuery = z.infer<typeof FollowUpQuerySchema>;
export type ResearchGap = z.infer<typeof ResearchGapSchema>;
export type MultiWaveQuality = z.infer<typeof MultiWaveQualitySchema>;
export type SynthesisReadiness = z.infer<typeof SynthesisReadinessSchema>;
export type Contradiction = z.infer<typeof ContradictionSchema>;
export type ImplementationStep = z.infer<typeof ImplementationStepSchema>;
export type RiskAssessment = z.infer<typeof RiskAssessmentSchema>;
export type AdvancedSynthesis = z.infer<typeof AdvancedSynthesisSchema>;
export type EnhancedPlanResult = z.infer<typeof EnhancedPlanResultSchema>;
export type EnhancedGenerateResult = z.infer<typeof EnhancedGenerateResultSchema>;
export type EnhancedRefineResult = z.infer<typeof EnhancedRefineResultSchema>;
export type EnhancedRetryResult = z.infer<typeof EnhancedRetryResultSchema>;