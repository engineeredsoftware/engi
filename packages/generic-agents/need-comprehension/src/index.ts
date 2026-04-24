/**
 * Bitcode Setup Need Comprehension Agent.
 *
 * The generic-tools package owns callable tools. This package owns the PTRR
 * orchestration that uses those tools during setup before risk admission.
 */

import {
  AgentPrompt,
  AgentStepPrompt,
  factoryAgentWithPTRR
} from '@bitcode/agent-generics';
import {
  analyzeNeedSemanticsTool,
  extractNeedRequirementsTool,
  identifyNeedConstraintsTool,
  generateNeedSatisfactionCriteriaTool,
  validateNeedComprehensionTool,
  analyzeNeedSatisfactionImplementationComplexityTool
} from '@bitcode/generic-tools-need-comprehension';
import type { PromptPart } from '@bitcode/prompts/parts/PromptPart';
import { PROMPTPART_SPECIFIC_AGENT_COMPREHENDNEED_SYSTEM_IDENTITY } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_comprehendneed_system_identity';
import { PROMPTPART_SPECIFIC_AGENT_COMPREHENDNEED_SYSTEM_ROLE } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_comprehendneed_system_role';
import { PROMPTPART_SPECIFIC_AGENT_COMPREHENDNEED_PLAN_ANALYSIS } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_comprehendneed_plan_analysis';
import { PROMPTPART_SPECIFIC_AGENT_COMPREHENDNEED_TRY_DIRECTIVES } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_comprehendneed_try_directives';
import { PROMPTPART_SPECIFIC_AGENT_COMPREHENDNEED_REFINE_ASSESSMENT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_comprehendneed_refine_assessment';
import { PROMPTPART_SPECIFIC_AGENT_COMPREHENDNEED_RETRY_ERRORHANDLING } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_agent_comprehendneed_retry_errorhandling';
import { z } from 'zod';

const BitcodeSetupNeedComprehensionToolRequestSchema = z.object({
  name: z.string(),
  input: z.any(),
  reason: z.string()
});

export const BitcodeSetupNeedComprehensionInputSchema = z.object({
  need: z.string().optional().describe('Canonical expressed Bitcode Need'),
  expressedNeed: z.string().optional().describe('Alias for the expressed Bitcode Need'),
  definitionOfNeed: z.string().optional().describe('Canonical Definition of Need used to measure and review the requested outcome'),
  attachments: z.array(z.any()).optional().default([]),
  repository: z.any().optional(),
  context_information: z.any().optional(),
  assetPackIntent: z.string().optional(),
  deliveryMechanism: z.string().optional(),
  phase: z.literal('setup').default('setup'),
  beforeAgent: z.literal('danger-wall').default('danger-wall')
});

export const BitcodeSetupNeedComprehensionPlanSchema = z.object({
  expressedNeed: z.string(),
  toolPlan: z.array(BitcodeSetupNeedComprehensionToolRequestSchema),
  ambiguityQuestions: z.array(z.string()),
  expectedWrittenAssetTypes: z.array(z.string()),
  proofFocus: z.array(z.string()),
  confidence: z.number().min(0).max(1)
});

export const BitcodeSetupNeedComprehensionTrySchema = z.object({
  semanticAnalysis: z.any(),
  requirements: z.any(),
  constraints: z.any(),
  needSatisfactionCriteria: z.any(),
  toolsUsed: z.array(z.string()),
  useTools: z.array(BitcodeSetupNeedComprehensionToolRequestSchema).optional()
});

export const BitcodeSetupNeedComprehensionRefineSchema = z.object({
  refinedNeedModel: z.any(),
  ambiguityClosed: z.boolean(),
  remainingQuestions: z.array(z.string()),
  writtenAssetTypes: z.array(z.string()),
  deliveryMechanismBoundaries: z.array(z.string()),
  proofObligations: z.array(z.string()),
  confidence: z.number().min(0).max(1)
});

export const BitcodeSetupNeedComprehensionResultSchema = z.object({
  need: z.object({
    expressed_need: z.string(),
    primary_intent: z.string().optional(),
    satisfaction_criteria: z.array(z.string()).optional()
  }),
  need_satisfaction_criteria: z.string().optional(),
  written_asset_types: z.array(z.string()).default([]),
  asset_pack_context: z.any().optional(),
  delivery_mechanism_boundaries: z.array(z.string()).default([]),
  source_to_shares_service_questions: z.record(z.string()).optional(),
  commercial_accountability: z.object({
    provider: z.string().optional(),
    customer_outcome: z.string().optional(),
    market_infrastructure_standard: z.string().optional()
  }).optional(),
  comprehension: z.object({
    intent: z.string().optional(),
    goals: z.array(z.string()).default([]),
    requirements: z.array(z.string()).default([]),
    constraints: z.array(z.string()).default([]),
    successCriteria: z.array(z.string()).default([])
  }).optional(),
  entities: z.object({
    files: z.array(z.string()).default([]),
    concepts: z.array(z.string()).default([]),
    technologies: z.array(z.string()).default([])
  }).optional(),
  toolEvidence: z.object({
    semanticAnalysis: z.any().optional(),
    requirements: z.any().optional(),
    constraints: z.any().optional(),
    validation: z.any().optional(),
    complexity: z.any().optional()
  }).optional(),
  riskAdmissionInput: z.any().optional(),
  deliverable_types: z.array(z.string()).default([]),
  need_definition_analysis: z.string().optional(),
  success: z.boolean().default(true),
  validationMessage: z.string().optional()
});

export type BitcodeSetupNeedComprehensionInput = z.infer<typeof BitcodeSetupNeedComprehensionInputSchema>;
export type BitcodeSetupNeedComprehensionResult = z.infer<typeof BitcodeSetupNeedComprehensionResultSchema>;

export const bitcodeSetupNeedComprehensionPrompt = new AgentPrompt({
  name: 'bitcode-setup-need-comprehension' as PromptPart,
  identity: PROMPTPART_SPECIFIC_AGENT_COMPREHENDNEED_SYSTEM_IDENTITY
});

bitcodeSetupNeedComprehensionPrompt.set(
  'role',
  PROMPTPART_SPECIFIC_AGENT_COMPREHENDNEED_SYSTEM_ROLE
);

export const bitcodeSetupNeedComprehensionStepPrompts = {
  plan: new AgentStepPrompt({ purpose: PROMPTPART_SPECIFIC_AGENT_COMPREHENDNEED_PLAN_ANALYSIS }),
  try: new AgentStepPrompt({ purpose: PROMPTPART_SPECIFIC_AGENT_COMPREHENDNEED_TRY_DIRECTIVES }),
  refine: new AgentStepPrompt({ purpose: PROMPTPART_SPECIFIC_AGENT_COMPREHENDNEED_REFINE_ASSESSMENT }),
  retry: new AgentStepPrompt({ purpose: PROMPTPART_SPECIFIC_AGENT_COMPREHENDNEED_RETRY_ERRORHANDLING })
};

export const bitcodeSetupNeedComprehensionAgent = factoryAgentWithPTRR<
  BitcodeSetupNeedComprehensionInput,
  BitcodeSetupNeedComprehensionResult
>({
  name: 'bitcode-setup-need-comprehension',
  description: 'Setup-phase PTRR Need comprehension before Bitcode risk admission',
  prompt: bitcodeSetupNeedComprehensionPrompt,
  stepPrompts: {
    plan: () => bitcodeSetupNeedComprehensionStepPrompts.plan,
    try: () => bitcodeSetupNeedComprehensionStepPrompts.try,
    refine: () => bitcodeSetupNeedComprehensionStepPrompts.refine,
    retry: () => bitcodeSetupNeedComprehensionStepPrompts.retry
  },
  tools: [
    analyzeNeedSemanticsTool,
    extractNeedRequirementsTool,
    identifyNeedConstraintsTool,
    generateNeedSatisfactionCriteriaTool,
    validateNeedComprehensionTool,
    analyzeNeedSatisfactionImplementationComplexityTool
  ],
  outputSchema: BitcodeSetupNeedComprehensionResultSchema as any,
  plan: { chunkThreshold: 1500 },
  try: { chunkThreshold: 3000, enableParallelChunks: true },
  refine: { maxAttempts: 1 },
  retry: { maxAttempts: 1 }
});

export const needComprehensionPrompt = bitcodeSetupNeedComprehensionPrompt;
export const needComprehensionStepPrompts = bitcodeSetupNeedComprehensionStepPrompts;
export const needComprehensionAgent = bitcodeSetupNeedComprehensionAgent;
export const comprehendNeedAgent = bitcodeSetupNeedComprehensionAgent;

export const BITCODE_NEED_COMPREHENSION_AGENT = {
  comprehendNeed: bitcodeSetupNeedComprehensionAgent
};
