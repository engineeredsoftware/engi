import { z } from 'zod';

/**
 * V26 schemas for the retained web-researcher package.
 *
 * The package is a Bitcode read-synthesis web research support carrier in the
 * discovery phase. Its contracts collect source-attributed
 * outside context for read measurement, proof-gap question formation,
 * third-party interface planning, and AssetPack planning; they never claim
 * canonical read ownership, proof ownership, mutation, or delivery authority.
 */

export const BitcodeExternalEvidenceDepthSchema = z.enum(['shallow', 'moderate', 'deep']);

export const BitcodeExternalEvidenceSourceClassSchema = z.enum([
  'primary',
  'official',
  'standard',
  'repository',
  'paper',
  'vendor',
  'commentary',
  'unknown'
]);

export const BitcodeExternalEvidenceTemporalRiskSchema = z.enum([
  'low',
  'medium',
  'high',
  'unknown'
]);

export const BitcodeExternalEvidenceResearchInputSchema = z.object({
  read: z.string().describe('Bitcode read or proof gap that requires external context'),
  discoveryPhase: z.literal('read-synthesis').default('read-synthesis').describe('Canonical Bitcode discovery phase this web research supports'),
  query: z.string().optional().describe('Query text when the caller has not separated read from search terms'),
  sources: z.array(z.string()).optional().describe('Preferred domains, URLs, or source classes to inspect'),
  evidenceDepth: BitcodeExternalEvidenceDepthSchema.default('moderate').describe('Bounded evidence collection depth'),
  maxResults: z.number().min(1).max(50).default(20).describe('Maximum external evidence items to return'),
  includeSynthesis: z.boolean().default(true).describe('Include bounded read-synthesis support that remains separate from proof closure'),
  timeframe: z.string().optional().describe('Optional publication or retrieval timeframe constraint'),
  language: z.string().default('en').describe('Preferred source language'),
  requirePrimarySources: z.boolean().default(true).describe('Prefer official, primary, or protocol-owner sources before commentary'),
  urlAttachments: z.array(z.string()).optional().describe('Optional URLs used only to improve evidence search scope')
}).describe('BitcodeExternalEvidenceResearchInput');

export const BitcodeExternalEvidenceToolRequestSchema = z.object({
  name: z.string(),
  input: z.any(),
  reason: z.string()
}).describe('BitcodeExternalEvidenceToolRequest');

export const BitcodeExternalEvidenceFindingSchema = z.object({
  title: z.string(),
  url: z.string(),
  snippet: z.string(),
  relevance: z.number().min(0).max(1),
  sourceQuality: z.number().min(0).max(1),
  sourceClass: BitcodeExternalEvidenceSourceClassSchema,
  publishedDate: z.string().optional(),
  author: z.string().optional(),
  provider: z.string().optional(),
  evidenceUse: z.string().describe('How this finding may support the active Bitcode read without becoming proof by itself')
}).describe('BitcodeExternalEvidenceFinding');

export const BitcodeExternalEvidenceSynthesisSchema = z.object({
  summary: z.string(),
  discoveryPhaseUse: z.array(z.string()).describe('How the evidence supports discovery-phase read synthesis'),
  readRelevance: z.array(z.string()),
  sourceBackedClaims: z.array(z.string()),
  contradictions: z.array(z.string()),
  unresolvedGaps: z.array(z.string())
}).describe('BitcodeExternalEvidenceSynthesis');

export const BitcodeExternalEvidenceQualitySchema = z.object({
  totalSources: z.number(),
  primarySourceCount: z.number(),
  averageSourceQuality: z.number(),
  coverageBreadth: z.number(),
  temporalRisk: BitcodeExternalEvidenceTemporalRiskSchema
}).describe('BitcodeExternalEvidenceQuality');

export const BitcodeExternalEvidenceResearchPlanSchema = z.object({
  normalizedNeed: z.string(),
  normalizedQuery: z.string(),
  preferredSourceClasses: z.array(BitcodeExternalEvidenceSourceClassSchema),
  sourceSelectionRationale: z.array(z.string()),
  volatilityQuestions: z.array(z.string()),
  useTools: z.array(BitcodeExternalEvidenceToolRequestSchema).default([]),
  success: z.boolean().default(true),
  error: z.string().optional()
}).describe('BitcodeExternalEvidenceResearchPlan');

export const BitcodeExternalEvidenceResearchTrySchema = z.object({
  attemptedQueries: z.array(z.string()),
  findings: z.array(BitcodeExternalEvidenceFindingSchema),
  rejectedFindings: z.array(z.object({
    url: z.string(),
    reason: z.string()
  })).default([]),
  useTools: z.array(BitcodeExternalEvidenceToolRequestSchema).default([]),
  success: z.boolean().default(true),
  error: z.string().optional()
}).describe('BitcodeExternalEvidenceResearchTry');

export const BitcodeExternalEvidenceResearchRefineSchema = z.object({
  findings: z.array(BitcodeExternalEvidenceFindingSchema),
  quality: BitcodeExternalEvidenceQualitySchema,
  synthesis: BitcodeExternalEvidenceSynthesisSchema,
  proofBoundaryWarnings: z.array(z.string()),
  success: z.boolean().default(true),
  error: z.string().optional()
}).describe('BitcodeExternalEvidenceResearchRefine');

export const BitcodeExternalEvidenceResearchResultSchema = z.object({
  findings: z.array(BitcodeExternalEvidenceFindingSchema).describe('Traceable external evidence with source-quality boundaries'),
  synthesis: BitcodeExternalEvidenceSynthesisSchema.describe('Bounded discovery-phase read-synthesis support for downstream Bitcode owners'),
  quality: BitcodeExternalEvidenceQualitySchema.describe('External evidence quality and volatility metrics'),
  recommendations: z.array(z.string()).describe('Downstream actions for read, proof, AssetPack, or interface owners'),
  useTools: z.array(BitcodeExternalEvidenceToolRequestSchema).optional().describe('External evidence tools requested by the PTRR steps'),
  processingTime: z.number().describe('Processing time in milliseconds'),
  success: z.boolean().default(true),
  completionMessage: z.string().default('Bitcode read-synthesis web research completed')
}).describe('BitcodeExternalEvidenceResearchResult');

export const ResearchInputSchema = BitcodeExternalEvidenceResearchInputSchema;
export const ResearchResultSchema = BitcodeExternalEvidenceResearchResultSchema;
export const WebResearcherAgentRetryStepOutput = BitcodeExternalEvidenceResearchResultSchema;

export type BitcodeExternalEvidenceDepth = z.infer<typeof BitcodeExternalEvidenceDepthSchema>;
export type BitcodeExternalEvidenceSourceClass = z.infer<typeof BitcodeExternalEvidenceSourceClassSchema>;
export type BitcodeExternalEvidenceTemporalRisk = z.infer<typeof BitcodeExternalEvidenceTemporalRiskSchema>;
export type BitcodeExternalEvidenceResearchInput = z.infer<typeof BitcodeExternalEvidenceResearchInputSchema>;
export type BitcodeExternalEvidenceToolRequest = z.infer<typeof BitcodeExternalEvidenceToolRequestSchema>;
export type BitcodeExternalEvidenceFinding = z.infer<typeof BitcodeExternalEvidenceFindingSchema>;
export type BitcodeExternalEvidenceSynthesis = z.infer<typeof BitcodeExternalEvidenceSynthesisSchema>;
export type BitcodeExternalEvidenceQuality = z.infer<typeof BitcodeExternalEvidenceQualitySchema>;
export type BitcodeExternalEvidenceResearchPlan = z.infer<typeof BitcodeExternalEvidenceResearchPlanSchema>;
export type BitcodeExternalEvidenceResearchTry = z.infer<typeof BitcodeExternalEvidenceResearchTrySchema>;
export type BitcodeExternalEvidenceResearchRefine = z.infer<typeof BitcodeExternalEvidenceResearchRefineSchema>;
export type BitcodeExternalEvidenceResearchResult = z.infer<typeof BitcodeExternalEvidenceResearchResultSchema>;

export type ResearchInput = BitcodeExternalEvidenceResearchInput;
export type ResearchResult = BitcodeExternalEvidenceResearchResult;
