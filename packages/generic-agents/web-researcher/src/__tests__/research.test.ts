import { describe, expect, test } from '@jest/globals';
import {
  BitcodeExternalEvidenceResearchPlanSchema,
  BitcodeExternalEvidenceResearchRefineSchema,
  BitcodeExternalEvidenceResearchTrySchema,
  WebResearcherAgentRetryStepOutput
} from '../schemas';

const finding = {
  title: 'Protocol owner documentation',
  url: 'https://example.com/protocol',
  snippet: 'Protocol owner documentation summary.',
  relevance: 0.92,
  sourceQuality: 0.94,
  sourceClass: 'primary' as const,
  evidenceUse: 'Informs Bitcode proof-gap review without becoming repository proof.'
};

describe('Bitcode need-synthesis web research PTRR schemas', () => {
  test('plans source selection from a Bitcode need boundary', () => {
    const parsed = BitcodeExternalEvidenceResearchPlanSchema.parse({
      normalizedNeed: 'Find official context for a repeated-read payment interface.',
      normalizedQuery: 'official repeated-read payment API reference',
      preferredSourceClasses: ['primary', 'official'],
      sourceSelectionRationale: ['Primary sources are required before commentary.'],
      volatilityQuestions: ['Has the interface changed since the cited version?']
    });

    expect(parsed.success).toBe(true);
    expect(parsed.useTools).toEqual([]);
  });

  test('records collected findings without granting mutation or delivery authority', () => {
    const parsed = BitcodeExternalEvidenceResearchTrySchema.parse({
      attemptedQueries: ['official repeated-read payment API reference'],
      findings: [finding],
      rejectedFindings: [
        {
          url: 'https://example.com/forum',
          reason: 'Commentary source is not suitable while primary sources are available.'
        }
      ]
    });

    expect(parsed.findings[0].sourceClass).toBe('primary');
    expect(parsed.success).toBe(true);
  });

  test('separates source quality from proof closure', () => {
    const parsed = BitcodeExternalEvidenceResearchRefineSchema.parse({
      findings: [finding],
      quality: {
        totalSources: 1,
        primarySourceCount: 1,
        averageSourceQuality: 0.94,
        coverageBreadth: 0.4,
        temporalRisk: 'medium'
      },
      synthesis: {
        summary: 'Primary outside evidence is present.',
        discoveryPhaseUse: ['Supports need synthesis during discovery before any proof closure claim.'],
        needRelevance: ['Supports interface planning.'],
        sourceBackedClaims: ['The source documents the relevant external behavior.'],
        contradictions: [],
        unresolvedGaps: ['Static Bitcode proof still must validate repository-owned behavior.']
      },
      proofBoundaryWarnings: ['External evidence cannot close Bitcode proof obligations.']
    });

    expect(parsed.proofBoundaryWarnings).toContain('External evidence cannot close Bitcode proof obligations.');
  });

  test('keeps compatibility retry output on the canonical result schema', () => {
    expect(WebResearcherAgentRetryStepOutput).toBeDefined();
    expect(WebResearcherAgentRetryStepOutput.description).toBe('BitcodeExternalEvidenceResearchResult');
  });
});
