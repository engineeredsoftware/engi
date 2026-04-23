import { describe, expect, test } from '@jest/globals';
import {
  BitcodeExternalEvidenceResearchInputSchema,
  BitcodeExternalEvidenceResearchResultSchema,
  WEB_RESEARCH_AGENT,
  bitcodeExternalEvidenceResearcher,
  webResearcherAgent
} from '../index';

describe('Bitcode external-evidence research agent compatibility', () => {
  test('keeps retained web-researcher aliases pointed at the Bitcode agent', () => {
    expect(webResearcherAgent).toBe(bitcodeExternalEvidenceResearcher);
    expect(WEB_RESEARCH_AGENT.researchWeb).toBe(bitcodeExternalEvidenceResearcher);
  });

  test('accepts a need-first input contract with bounded evidence defaults', () => {
    const parsed = BitcodeExternalEvidenceResearchInputSchema.parse({
      need: 'Measure whether a third-party repository interface needs current official API documentation.',
      query: 'official repository API branch creation documentation'
    });

    expect(parsed.evidenceDepth).toBe('moderate');
    expect(parsed.maxResults).toBe(20);
    expect(parsed.language).toBe('en');
    expect(parsed.requirePrimarySources).toBe(true);
  });

  test('requires external findings to stay source-attributed and proof-bounded', () => {
    const parsed = BitcodeExternalEvidenceResearchResultSchema.parse({
      findings: [
        {
          title: 'Official interface documentation',
          url: 'https://example.com/docs',
          snippet: 'Official documentation summary.',
          relevance: 0.9,
          sourceQuality: 0.95,
          sourceClass: 'official',
          evidenceUse: 'Supports downstream interface planning without closing Bitcode proof obligations.'
        }
      ],
      synthesis: {
        summary: 'Official documentation exists and should be checked by the interface owner.',
        needRelevance: ['Confirms the outside interface has source material to inspect.'],
        sourceBackedClaims: ['The outside interface documents branch creation behavior.'],
        contradictions: [],
        unresolvedGaps: ['Repository-local proof acceptance still requires Bitcode-owned verification.']
      },
      quality: {
        totalSources: 1,
        primarySourceCount: 1,
        averageSourceQuality: 0.95,
        coverageBreadth: 0.5,
        temporalRisk: 'medium'
      },
      recommendations: [
        'Route the finding to the Bitcode interface owner; do not treat external evidence as proof closure.'
      ],
      processingTime: 25
    });

    expect(parsed.success).toBe(true);
    expect(parsed.completionMessage).toBe('Bitcode external-evidence research completed');
  });
});
