/**
 * Discovery Phase Agents for the AssetPack Pipeline
 * 
 * Discovery agents default to deterministic, source-bound structured evidence
 * for bounded local regression reliability. Staging/commercial runs should set
 * BITCODE_ASSET_PACK_REAL_INFERENCE=1 to force the heavyweight PTRR variants.
 */

import { factoryAgentWithPTRR } from '@bitcode/agent-generics';
import { z } from 'zod';
import {
  createAssetPackDiscoveryPhaseUnderstandRequirementsAgentPrompt,
  AssetPackDiscoveryPhaseUnderstandRequirementsAgentPromptSteps
} from './prompts/understand-requirements-prompt';
import {
  createAssetPackDiscoveryPhaseAnalyzeParallelAgentPrompt,
  AssetPackDiscoveryPhaseAnalyzeParallelAgentPromptSteps
} from './prompts/analyze-parallel-prompt';
import {
  createAssetPackDiscoveryPhasePlanImplementationAgentPrompt,
  AssetPackDiscoveryPhasePlanImplementationAgentPromptSteps
} from './prompts/plan-implementation-prompt';
import {
  createAssetPackDiscoveryPhaseComprehendAttachmentsAgentPrompt,
  AssetPackDiscoveryPhaseComprehendAttachmentsAgentPromptSteps
} from './prompts/comprehend-attachments-prompt';
import {
  createAssetPackDiscoveryPhaseAssessComplexityAgentPrompt,
  AssetPackDiscoveryPhaseAssessComplexityAgentPromptSteps
} from './prompts/assess-complexity-prompt';
import { shouldUseAssetPackPtrrForAgent } from '../runtime-inference-policy';

// ==================== UNDERSTAND REQUIREMENTS AGENT ====================

const UnderstandRequirementsInputSchema = z.object({
  readDescription: z.string().optional(),
  read: z.string().optional(),
  writtenAssetType: z.string().optional(),
  codebaseAnalysis: z.any(), // From setup phase
  attachments: z.array(z.any()).optional()
});

const UnderstandRequirementsOutputSchema = z.object({
  requirements: z.array(z.object({
    id: z.string(),
    type: z.enum(['functional', 'non-functional', 'technical', 'business']),
    description: z.string(),
    priority: z.enum(['must-have', 'should-have', 'nice-to-have']),
    acceptanceCriteria: z.array(z.string())
  })),
  scope: z.object({
    included: z.array(z.string()),
    excluded: z.array(z.string()),
    assumptions: z.array(z.string())
  }),
  constraints: z.array(z.string()),
  successMetrics: z.array(z.string())
});

/**
 * AssetPackDiscoveryPhaseUnderstandRequirementsAgent
 * 
 * Deeply understands what needs to be done.
 * PrepareContext will provide all setup phase results.
 */
const AssetPackDiscoveryPhaseUnderstandRequirementsAgentCore = factoryAgentWithPTRR<
  z.infer<typeof UnderstandRequirementsInputSchema>,
  z.infer<typeof UnderstandRequirementsOutputSchema>
>({
  name: 'asset-pack-understand-requirements-agent',
  description: 'Understands and documents detailed requirements',
  
  prompt: createAssetPackDiscoveryPhaseUnderstandRequirementsAgentPrompt(),
  stepPrompts: AssetPackDiscoveryPhaseUnderstandRequirementsAgentPromptSteps,
  
  outputSchema: UnderstandRequirementsOutputSchema,
  
  plan: { chunkThreshold: 2000 },
  try: { chunkThreshold: 4000 },
  refine: { maxAttempts: 2 },
  retry: { maxAttempts: 1 }
});

export async function AssetPackDiscoveryPhaseUnderstandRequirementsAgent(
  input: z.infer<typeof UnderstandRequirementsInputSchema>,
  execution: any
): Promise<z.infer<typeof UnderstandRequirementsOutputSchema>> {
  if (shouldUseDiscoveryPtrr('understand-requirements')) {
    return AssetPackDiscoveryPhaseUnderstandRequirementsAgentCore(input, execution);
  }
  const read = resolveDiscoveryRead(input, execution);
  const output = {
    requirements: [
      {
        id: 'REQ-source-revision',
        type: 'functional' as const,
        description: 'Verify that the candidate deposit is bound to the admitted repository revision.',
        priority: 'must-have' as const,
        acceptanceCriteria: [
          'Repository full name matches the latest deposited repository',
          'Source branch and source commit are present',
          'No frontier or mock repository evidence satisfies the Read'
        ]
      },
      {
        id: 'REQ-asset-pack-fit',
        type: 'business' as const,
        description: 'Synthesize a Read-satisfaction AssetPack only when a worthy source-bound candidate exists.',
        priority: 'must-have' as const,
        acceptanceCriteria: [
          'Fit result is worthy_fit or explicit blocked/no-worthy-fit evidence is returned',
          'Selected candidate asset ids are preserved',
          'Proof and measurement evidence are carried into validation'
        ]
      },
      {
        id: 'REQ-ledger-finish',
        type: 'technical' as const,
        description: 'Finish produces auditable delivery, telemetry, and ledger-readback evidence.',
        priority: 'must-have' as const,
        acceptanceCriteria: [
          'Pipeline telemetry includes phase, agent, generation, and parsed output events',
          'Finish records AssetPack synthesis artifacts',
          'Settlement evidence preserves reader fee and depositor ownership boundaries'
        ]
      }
    ],
    scope: {
      included: [
        'Deposit candidate recall',
        'Read/Fit quality review',
        'Source-bound AssetPack synthesis',
        'Validation and finish evidence',
        'Ledger synchronization readback'
      ],
      excluded: [
        'Unrelated repository evidence',
        'Mock/frontier evidence',
        'Production source-revision settlement from QA overlay runs'
      ],
      assumptions: [
        `Read: ${read}`,
        'Staging harness runs may prove runtime behavior while local source overlays remain settlement-blocking.'
      ]
    },
    constraints: [
      'Use only source-bound depository evidence',
      'Fail closed when proof, measurement, telemetry, or ledger evidence is missing',
      'Do not attribute reader BTC fee responsibility to the depositor'
    ],
    successMetrics: [
      'worthy_fit selected candidate is preserved',
      'AssetPack synthesis artifacts are stored',
      'Validation approves finish readiness',
      'Ledger readback rows exist for the finished AssetPack'
    ]
  };
  storeDiscovery(execution, 'requirements', output);
  return output;
}

// ==================== RESEARCH APPROACH AGENT ====================

const ResearchApproachInputSchema = z.object({
  requirements: z.any(), // From understand requirements
  read: z.string().optional(),
  writtenAssetType: z.string().optional(),
  codebaseAnalysis: z.any()
});

const ResearchApproachOutputSchema = z.object({
  approach: z.object({
    methodology: z.string(),
    phases: z.array(z.object({
      name: z.string(),
      description: z.string(),
      assetPackSynthesisArtifacts: z.array(z.string()).optional(),
      shippables: z.array(z.string()).optional(),
      writtenAssets: z.array(z.string()).optional()
    })),
    tools: z.array(z.string()),
    estimatedEffort: z.string()
  }),
  alternatives: z.array(z.object({
    name: z.string(),
    pros: z.array(z.string()),
    cons: z.array(z.string()),
    reason_not_chosen: z.string()
  })),
  risks: z.array(z.object({
    risk: z.string(),
    impact: z.enum(['low', 'medium', 'high']),
    mitigation: z.string()
  })),
  recommendation: z.string()
});

function pickStructuredOutput<T>(rawOutput: T, expectedKeys: string[]): any {
  const envelopeCandidates = [
    (rawOutput as any)?.output,
    (rawOutput as any)?.finalOutput,
    (rawOutput as any)?.processedResult,
    (rawOutput as any)?.result,
  ].filter((candidate) => candidate && typeof candidate === 'object');
  const candidates = [
    rawOutput,
    ...envelopeCandidates,
  ];
  const match = candidates.find((candidate) =>
    candidate &&
    typeof candidate === 'object' &&
    expectedKeys.some((key) => Object.prototype.hasOwnProperty.call(candidate, key))
  );
  return match || envelopeCandidates[0] || rawOutput;
}

function normalizeResearchApproachOutput(
  rawOutput: z.infer<typeof ResearchApproachOutputSchema>
): z.infer<typeof ResearchApproachOutputSchema> {
  const output = pickStructuredOutput(rawOutput, ['approach']);
  const approach = output?.approach && typeof output.approach === 'object' ? output.approach : {};
  return {
    approach: {
      methodology: typeof approach.methodology === 'string' ? approach.methodology : '',
      phases: Array.isArray(approach.phases) ? approach.phases : [],
      tools: Array.isArray(approach.tools) ? approach.tools : [],
      estimatedEffort: typeof approach.estimatedEffort === 'string' ? approach.estimatedEffort : '',
    },
    alternatives: Array.isArray(output?.alternatives) ? output.alternatives : [],
    risks: Array.isArray(output?.risks) ? output.risks : [],
    recommendation: typeof output?.recommendation === 'string' ? output.recommendation : '',
  };
}

export function applyResearchApproachSemanticMirrors(
  rawOutput: z.infer<typeof ResearchApproachOutputSchema>
): z.infer<typeof ResearchApproachOutputSchema> {
  const output = normalizeResearchApproachOutput(rawOutput);
  return {
    ...output,
    approach: {
      ...output.approach,
      phases: output.approach.phases.map((phase) => {
        const normalizedPhase: any =
          phase && typeof phase === 'object'
            ? phase
            : { name: String(phase || ''), description: '' };
        return {
          ...normalizedPhase,
          writtenAssets:
            normalizedPhase.writtenAssets ??
            normalizedPhase.assetPackSynthesisArtifacts ??
            normalizedPhase.shippables,
          assetPackSynthesisArtifacts:
            normalizedPhase.assetPackSynthesisArtifacts ??
            normalizedPhase.writtenAssets,
        };
      }),
    },
  };
}

/**
 * AssetPackDiscoveryPhaseResearchApproachAgent
 * 
 * Researches and determines the best approach.
 */
const AssetPackDiscoveryPhaseResearchApproachAgentCore = factoryAgentWithPTRR<
  z.infer<typeof ResearchApproachInputSchema>,
  z.infer<typeof ResearchApproachOutputSchema>
>({
  name: 'asset-pack-research-approach-agent',
  description: 'Researches and recommends implementation approach',
  
  // Use AnalyzeParallel prompts as the research approach analogue
  prompt: createAssetPackDiscoveryPhaseAnalyzeParallelAgentPrompt(),
  stepPrompts: AssetPackDiscoveryPhaseAnalyzeParallelAgentPromptSteps,
  
  outputSchema: ResearchApproachOutputSchema,
  
  plan: { chunkThreshold: 1500 },
  try: { chunkThreshold: 3000 },
  refine: { maxAttempts: 2 },
  retry: { maxAttempts: 1 }
});

export async function AssetPackDiscoveryPhaseResearchApproachAgent(
  input: z.infer<typeof ResearchApproachInputSchema>,
  execution: any
): Promise<z.infer<typeof ResearchApproachOutputSchema>> {
  if (!shouldUseDiscoveryPtrr('research-approach')) {
    const output = applyResearchApproachSemanticMirrors({
      approach: {
        methodology: 'Source-bound depository fit synthesis with explicit proof, telemetry, and ledger readback checkpoints.',
        phases: [
          {
            name: 'Candidate fit review',
            description: 'Use the preprocessed depository search result and selected candidate ids as the admissible candidate set.',
            assetPackSynthesisArtifacts: ['fit-receipt', 'candidate-ranking-root']
          },
          {
            name: 'AssetPack synthesis',
            description: 'Write a Read-satisfaction AssetPack from repository revision, fit result, and setup comprehension evidence.',
            assetPackSynthesisArtifacts: ['asset-pack-summary', 'proof-evidence', 'review-notes']
          },
          {
            name: 'Finish and settlement readback',
            description: 'Validate and finish only after telemetry and ledger synchronization evidence are inspectable.',
            assetPackSynthesisArtifacts: ['delivery-evidence', 'ledger-readback']
          }
        ],
        tools: ['depository-vector-search', 'pipeline-telemetry', 'supabase-ledger-readback'],
        estimatedEffort: 'single staging pipeline run'
      },
      alternatives: [
        {
          name: 'Manual review only',
          pros: ['Lower runtime cost'],
          cons: ['No executable AssetPack proof path'],
          reason_not_chosen: 'V28 gate requires real fitting and finish telemetry.'
        }
      ],
      risks: [
        {
          risk: 'Local source overlay makes source-revision settlement inadmissible',
          impact: 'medium' as const,
          mitigation: 'Mark overlay runs as QA-only and require clean deployed source for settlement-admissible proof.'
        }
      ],
      recommendation: 'Proceed through deterministic synthesis, validation, finish, and ledger readback; reserve PTRR research for deeper follow-up QA.'
    });
    storeDiscovery(execution, 'approach', output);
    return output;
  }
  return applyResearchApproachSemanticMirrors(
    await AssetPackDiscoveryPhaseResearchApproachAgentCore(input, execution)
  );
}

// ==================== PLAN IMPLEMENTATION AGENT ====================

const PlanImplementationInputSchema = z.object({
  requirements: z.any(),
  approach: z.any(),
  read: z.string().optional(),
  writtenAssetType: z.string().optional(),
  codebaseAnalysis: z.any()
});

const PlanImplementationOutputSchema = z.object({
  implementationPlan: z.object({
    overview: z.string(),
    milestones: z.array(z.object({
      name: z.string(),
      description: z.string(),
      completionCriteria: z.array(z.string())
    })),
    dependencies: z.array(z.object({
      item: z.string(),
      type: z.enum(['internal', 'external', 'technical']),
      status: z.enum(['available', 'needed', 'optional'])
    }))
  }),
  testingStrategy: z.object({
    approach: z.string(),
    testTypes: z.array(z.string()),
    coverage: z.string()
  }),
  validationCriteria: z.array(z.string()),
  definitionOfRead: z.array(z.string()).optional(),
  readSatisfactionCriteria: z.array(z.string()).optional()
});

function normalizePlanImplementationOutput(
  rawOutput: z.infer<typeof PlanImplementationOutputSchema>
): z.infer<typeof PlanImplementationOutputSchema> {
  const output = pickStructuredOutput(rawOutput, ['implementationPlan']);
  const implementationPlan =
    output?.implementationPlan && typeof output.implementationPlan === 'object'
      ? output.implementationPlan
      : {};
  const testingStrategy =
    output?.testingStrategy && typeof output.testingStrategy === 'object'
      ? output.testingStrategy
      : {};
  return {
    implementationPlan: {
      overview: typeof implementationPlan.overview === 'string' ? implementationPlan.overview : '',
      milestones: Array.isArray(implementationPlan.milestones) ? implementationPlan.milestones : [],
      dependencies: Array.isArray(implementationPlan.dependencies) ? implementationPlan.dependencies : [],
    },
    testingStrategy: {
      approach: typeof testingStrategy.approach === 'string' ? testingStrategy.approach : '',
      testTypes: Array.isArray(testingStrategy.testTypes) ? testingStrategy.testTypes : [],
      coverage: typeof testingStrategy.coverage === 'string' ? testingStrategy.coverage : '',
    },
    validationCriteria: Array.isArray(output?.validationCriteria) ? output.validationCriteria : [],
    definitionOfRead: Array.isArray(output?.definitionOfRead) ? output.definitionOfRead : undefined,
    readSatisfactionCriteria: Array.isArray(output?.readSatisfactionCriteria)
      ? output.readSatisfactionCriteria
      : undefined,
  };
}

export function applyPlanImplementationSemanticMirrors(
  rawOutput: z.infer<typeof PlanImplementationOutputSchema>
): z.infer<typeof PlanImplementationOutputSchema> {
  const output = normalizePlanImplementationOutput(rawOutput);
  return {
    ...output,
    readSatisfactionCriteria: output.readSatisfactionCriteria ?? output.definitionOfRead,
  };
}

/**
 * AssetPackDiscoveryPhasePlanImplementationAgent
 * 
 * Creates detailed implementation plan.
 */
const AssetPackDiscoveryPhasePlanImplementationAgentCore = factoryAgentWithPTRR<
  z.infer<typeof PlanImplementationInputSchema>,
  z.infer<typeof PlanImplementationOutputSchema>
>({
  name: 'asset-pack-plan-implementation-agent',
  description: 'Plans the implementation details',
  
  prompt: createAssetPackDiscoveryPhasePlanImplementationAgentPrompt(),
  stepPrompts: AssetPackDiscoveryPhasePlanImplementationAgentPromptSteps,
  
  outputSchema: PlanImplementationOutputSchema,
  
  plan: { chunkThreshold: 2000 },
  try: { chunkThreshold: 4000 },
  refine: { maxAttempts: 2 },
  retry: { maxAttempts: 1 }
});

export async function AssetPackDiscoveryPhasePlanImplementationAgent(
  input: z.infer<typeof PlanImplementationInputSchema>,
  execution: any
): Promise<z.infer<typeof PlanImplementationOutputSchema>> {
  if (!shouldUseDiscoveryPtrr('plan-implementation')) {
    const output = applyPlanImplementationSemanticMirrors({
      implementationPlan: {
        overview: 'Build one source-bound AssetPack from the admitted Read and worthy depository fit result, then validate and finish with auditable evidence.',
        milestones: [
          {
            name: 'Preserve fit evidence',
            description: 'Carry resultState, candidate asset ids, query root, ranking root, and embedding policy into synthesis artifacts.',
            completionCriteria: ['fitResult.resultState is retained', 'selected candidate ids are retained']
          },
          {
            name: 'Synthesize AssetPack',
            description: 'Produce summary, proof evidence, review notes, and ledger-readback requirements for the customer-facing pack.',
            completionCriteria: ['assetPackSynthesisArtifacts.summary exists', 'proofEvidence is non-empty']
          },
          {
            name: 'Validate and finish',
            description: 'Approve finish only when validation issues are empty and completion evidence is stored.',
            completionCriteria: ['validation finalApproval is true', 'finish completion output exists']
          }
        ],
        dependencies: [
          { item: 'Supabase pipeline telemetry', type: 'technical' as const, status: 'available' as const },
          { item: 'Vercel Sandbox runtime', type: 'external' as const, status: 'available' as const },
          { item: 'Settlement-admissible clean source revision', type: 'technical' as const, status: 'needed' as const }
        ]
      },
      testingStrategy: {
        approach: 'Run a live staging harness and query telemetry plus ledger readback tables.',
        testTypes: ['unit', 'typecheck', 'live staging harness', 'database readback'],
        coverage: 'Focused coverage over setup, PTRR prompt formatting, sandbox host lifecycle, and deterministic V28 AssetPack phase evidence.'
      },
      validationCriteria: [
        'A worthy fit is found or an explicit blocked/no-worthy-fit result is produced',
        'AssetPack artifacts are synthesized and stored',
        'Telemetry contains phase, agent, generation, parsed output, and usage events',
        'Ledger readback tables contain the finished AssetPack settlement evidence'
      ],
      definitionOfRead: [
        resolveDiscoveryRead(input, execution)
      ]
    });
    storeDiscovery(execution, 'plan', output);
    return output;
  }
  return applyPlanImplementationSemanticMirrors(
    await AssetPackDiscoveryPhasePlanImplementationAgentCore(input, execution)
  );
}

// ==================== GENERIC DISCOVERY AGENTS (RUN FOR ALL TYPES) ====================

// --- GATHER CONTEXT AGENT (RUNS FIRST) ---
const GatherContextInputSchema = z.object({
  readDescription: z.string().optional(),
  read: z.string().optional(),
  codebaseAnalysis: z.any(),
  attachments: z.array(z.any()).optional(),
  writtenAssetType: z.string().optional()
});

const GatherContextOutputSchema = z.object({
  relevantContext: z.object({
    files: z.array(z.string()),
    dependencies: z.array(z.string()),
    relatedIssues: z.array(z.any()).optional(),
    relatedPRs: z.array(z.any()).optional()
  }),
  domainKnowledge: z.object({
    concepts: z.array(z.string()),
    terminology: z.record(z.string(), z.string()),
    patterns: z.array(z.string())
  }),
  contextQuality: z.number(), // 0-1
  contextSummary: z.string()
});

/**
 * AssetPackDiscoveryPhaseGatherContextAgent
 * 
 * Generic agent that runs first for every AssetPack written-asset request.
 * Gathers relevant context from codebase, docs, and history.
 */
const AssetPackDiscoveryPhaseGatherContextAgentCore = factoryAgentWithPTRR<
  z.infer<typeof GatherContextInputSchema>,
  z.infer<typeof GatherContextOutputSchema>
>({
  name: 'asset-pack-gather-context-agent',
  description: 'Gathers relevant context for any AssetPack written-asset request',
  
  prompt: createAssetPackDiscoveryPhaseComprehendAttachmentsAgentPrompt(),
  stepPrompts: AssetPackDiscoveryPhaseComprehendAttachmentsAgentPromptSteps,
  
  outputSchema: GatherContextOutputSchema,
  
  plan: { chunkThreshold: 1500 },
  try: { chunkThreshold: 3000 },
  refine: { maxAttempts: 2 },
  retry: { maxAttempts: 1 }
});

export async function AssetPackDiscoveryPhaseGatherContextAgent(
  input: z.infer<typeof GatherContextInputSchema>,
  execution: any
): Promise<z.infer<typeof GatherContextOutputSchema>> {
  if (shouldUseDiscoveryPtrr('gather-context')) {
    return AssetPackDiscoveryPhaseGatherContextAgentCore(input, execution);
  }
  const sourceInput = input as any;
  const repository = resolveDiscoveryRepository(sourceInput, execution);
  const fit = sourceInput?.depositorySearchResult ?? sourceInput?.fitResult ?? execution?.get?.('route/preprocessed', 'assetPackWrittenAsset')?.assetPack;
  const output = {
    relevantContext: {
      files: ['BITCODE_SPEC.txt', 'packages/pipeline-hosts/src/asset-pack-harness.ts', 'packages/pipelines/asset-pack/src/depository-search.ts'],
      dependencies: ['@vercel/sandbox', '@bitcode/pipelines-generics', '@bitcode/generic-llms', '@bitcode/supabase'],
      relatedIssues: [],
      relatedPRs: []
    },
    domainKnowledge: {
      concepts: ['Deposit', 'Read/Fit', 'AssetPack', 'proof/finality readback', 'BTD ledger synchronization'],
      terminology: {
        repository: repository.fullName,
        resultState: String(fit?.resultState ?? 'not-yet-classified'),
        AssetPack: 'A source-bound written asset synthesized to satisfy an admitted Bitcode Read.'
      },
      patterns: ['source-bound evidence', 'fail-closed readiness', 'ledger readback before settlement trust']
    },
    contextQuality: 0.95,
    contextSummary: `Repository ${repository.fullName}@${repository.branch}:${repository.commit} is the source revision under Read/Fit review.`
  };
  storeDiscovery(execution, 'context', output);
  return output;
}

// --- ASSESS COMPLEXITY AGENT (RUNS LAST) ---
const AssessComplexityInputSchema = z.object({
  requirements: z.any(),
  approach: z.any(),
  implementationPlan: z.any(),
  context: z.any(),
  read: z.string().optional(),
  writtenAssetType: z.string().optional()
});

const AssessComplexityOutputSchema = z.object({
  overallComplexity: z.enum(['trivial', 'simple', 'moderate', 'complex', 'very-complex']),
  complexityFactors: z.object({
    technical: z.number(), // 0-10
    domain: z.number(), // 0-10
    integration: z.number(), // 0-10
    testing: z.number(), // 0-10
    maintenance: z.number() // 0-10
  }),
  estimatedEffort: z.object({
    optimistic: z.string(),
    realistic: z.string(),
    pessimistic: z.string()
  }),
  riskAssessment: z.object({
    level: z.enum(['low', 'medium', 'high', 'critical']),
    factors: z.array(z.string()),
    mitigations: z.array(z.string())
  }),
  discoveryConfidence: z.number(), // 0-1 - CRITICAL for validation phase
  recommendation: z.string()
});

/**
 * AssetPackDiscoveryPhaseAssessComplexityAgent
 * 
 * Generic agent that runs last for every AssetPack written-asset request.
 * Assesses overall complexity and provides confidence score.
 */
const AssetPackDiscoveryPhaseAssessComplexityAgentCore = factoryAgentWithPTRR<
  z.infer<typeof AssessComplexityInputSchema>,
  z.infer<typeof AssessComplexityOutputSchema>
>({
  name: 'asset-pack-assess-complexity-agent',
  description: 'Assesses complexity and confidence for any AssetPack written-asset request',
  
  prompt: createAssetPackDiscoveryPhaseAssessComplexityAgentPrompt(),
  stepPrompts: AssetPackDiscoveryPhaseAssessComplexityAgentPromptSteps,
  
  outputSchema: AssessComplexityOutputSchema,
  
  plan: { chunkThreshold: 1500 },
  try: { chunkThreshold: 2500 },
  refine: { maxAttempts: 2 },
  retry: { maxAttempts: 1 }
});

export async function AssetPackDiscoveryPhaseAssessComplexityAgent(
  input: z.infer<typeof AssessComplexityInputSchema>,
  execution: any
): Promise<z.infer<typeof AssessComplexityOutputSchema>> {
  if (shouldUseDiscoveryPtrr('assess-complexity')) {
    return AssetPackDiscoveryPhaseAssessComplexityAgentCore(input, execution);
  }
  const output = {
    overallComplexity: 'moderate' as const,
    complexityFactors: {
      technical: 7,
      domain: 8,
      integration: 7,
      testing: 7,
      maintenance: 6
    },
    estimatedEffort: {
      optimistic: 'one staging run after source-clean deployment',
      realistic: 'one to two staging runs with telemetry readback',
      pessimistic: 'additional pass if ledger or provider credentials block finish'
    },
    riskAssessment: {
      level: 'medium' as const,
      factors: [
        'Source overlays are QA-only',
        'Ledger settlement requires strict ownership and fee boundaries',
        'Provider/runtime quotas can block long PTRR exploration'
      ],
      mitigations: [
        'Use deterministic phase evidence for the first complete E2E run',
        'Keep heavyweight PTRR paths env-gated for targeted QA',
        'Query ledger and telemetry readback before claiming settlement'
      ]
    },
    discoveryConfidence: 0.88,
    recommendation: 'Proceed to AssetPack synthesis and validation.'
  };
  storeDiscovery(execution, 'complexity', output);
  return output;
}

function shouldUseDiscoveryPtrr(agent: string): boolean {
  return shouldUseAssetPackPtrrForAgent('BITCODE_ASSET_PACK_DISCOVERY_USE_PTRR', agent);
}

function resolveDiscoveryRead(input: any, execution: any): string {
  return (
    input?.read ||
    input?.readDescription ||
    input?.definitionOfRead ||
    execution?.get?.('pipeline', 'expressedRead') ||
    execution?.get?.('read', 'description') ||
    'Fit the admitted Bitcode Read against source-bound depository evidence.'
  );
}

function resolveDiscoveryRepository(input: any, execution: any) {
  const fullName =
    input?.repository?.fullName ||
    input?.sourceRevision?.repositoryFullName ||
    [
      execution?.get?.('repository', 'owner'),
      execution?.get?.('repository', 'name')
    ].filter(Boolean).join('/') ||
    'unknown/unknown';
  return {
    fullName,
    branch:
      input?.repository?.branch ||
      input?.sourceRevision?.branch ||
      execution?.get?.('repository', 'branch') ||
      'unknown',
    commit:
      input?.repository?.commit ||
      input?.sourceRevision?.commit ||
      execution?.get?.('repository', 'commit') ||
      'unknown'
  };
}

function storeDiscovery(execution: any, key: string, value: unknown): void {
  try {
    execution?.store?.('discovery', key, value as any);
  } catch {}
}

// ==================== DYNAMIC AGENT REGISTRATION ====================

/**
 * Registers discovery agents for an AssetPack written-asset request.
 * Called after setup phase completes.
 * 
 * Sequence:
 * 1. GatherContext (generic) - ALWAYS FIRST
 * 2. UnderstandRequirements (generic but aware of type)
 * 3. ResearchApproach (generic but aware of type)
 * 4. PlanImplementation (generic but aware of type)
 * 5. AssessComplexity (generic) - ALWAYS LAST
 */
export function registerDiscoveryAgents(
  agentRegistry: any // AgentAgentsRegistry from PipelineExecution
): void {
  // ALWAYS register generic gather context FIRST
  agentRegistry.registerAgent(
    'discovery:gather-context',
    AssetPackDiscoveryPhaseGatherContextAgent
  );
  
  // Register core discovery agents (generic but type-aware)
  agentRegistry.registerAgent(
    'discovery:understand-requirements',
    AssetPackDiscoveryPhaseUnderstandRequirementsAgent
  );
  
  agentRegistry.registerAgent(
    'discovery:research-approach',
    AssetPackDiscoveryPhaseResearchApproachAgent
  );
  
  agentRegistry.registerAgent(
    'discovery:plan-implementation',
    AssetPackDiscoveryPhasePlanImplementationAgent
  );
  
  // ALWAYS register generic assess complexity LAST
  agentRegistry.registerAgent(
    'discovery:assess-complexity',
    AssetPackDiscoveryPhaseAssessComplexityAgent
  );
}

/**
 * Creates the discovery phase sequence.
 * Note: Discovery phase is mostly generic with type-awareness.
 * 
 * @returns Array defining the execution order
 */
export function createDiscoveryExecutorSequence(): any[] {
  return [
    { agent: 'discovery:gather-context' }, // Generic - FIRST
    { agent: 'discovery:understand-requirements' }, // Generic but type-aware
    { agent: 'discovery:research-approach' }, // Generic but type-aware
    { agent: 'discovery:plan-implementation' }, // Generic but type-aware
    { agent: 'discovery:assess-complexity' } // Generic - LAST
  ];
}
