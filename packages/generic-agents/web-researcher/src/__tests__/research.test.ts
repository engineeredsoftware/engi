/**
 * Comprehensive Test Suite for Revolutionary Multi-Wave Research System
 * Production-Grade Testing for State-of-the-Art Web Research Intelligence
 */

import { describe, test, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { 
  ContextAnalysisSchema,
  QueryStrategySchema,
  EnhancedPlanResultSchema,
  EnhancedGenerateResultSchema,
  EnhancedRefineResultSchema,
  EnhancedRetryResultSchema,
  type ContextAnalysis,
  type QueryStrategy,
  type FollowUpQuery,
  type MultiWaveQuality
} from '../schemas';
import { WEB_RESEARCH_AGENT } from '../index';

// Mock external dependencies
jest.mock('@engi/logger');
jest.mock('@engi/generic-tools-web-search');
jest.mock('@engi/context');

// Production-grade mock data for comprehensive testing
const createMockContextAnalysis = (): ContextAnalysis => ({
  technologyStack: {
    languages: ['typescript', 'javascript'],
    frameworks: ['react', 'next.js'],
    libraries: ['zod', 'tailwindcss'],
    tools: ['webpack', 'jest'],
    platforms: ['node.js', 'vercel']
  },
  architecture: {
    patterns: ['component-based', 'hooks-pattern'],
    paradigms: ['functional', 'reactive'],
    serviceType: 'microservices' as const,
    scalingApproach: ['horizontal', 'cdn-caching']
  },
  codebase: {
    projectStructure: ['src/', 'components/', 'pages/'],
    codePatterns: ['custom-hooks', 'compound-components'],
    testingApproach: ['unit-testing', 'integration-testing'],
    buildSystem: ['next.js', 'turbopack']
  },
  dependencies: {
    dependencies: [
      { name: 'react', version: '18.2.0', type: 'production' as const, ecosystem: 'react' },
      { name: 'typescript', version: '5.0.0', type: 'development' as const, ecosystem: 'typescript' }
    ],
    vulnerabilities: [],
    outdatedPackages: ['lodash@4.17.20'],
    conflicts: []
  }
});

const createMockQueryStrategy = (): QueryStrategy => ({
  baseQueries: ['react authentication implementation', 'next.js security patterns'],
  contextualQueries: [
    {
      query: 'react hooks authentication state management',
      category: 'implementation',
      rationale: 'Core implementation pattern for React apps',
      priority: 10
    },
    {
      query: 'next.js middleware authentication best practices',
      category: 'security',
      rationale: 'Framework-specific security implementation',
      priority: 9
    }
  ],
  architectureQueries: ['react application architecture patterns', 'microservices frontend design'],
  technologyQueries: ['react performance optimization', 'next.js deployment strategies'],
  dependencyQueries: ['react ecosystem dependencies security'],
  urlEnhancedQueries: ['reactjs.org authentication guide', 'nextjs.org security documentation']
});

const createMockMultiProviderResults = () => [
  {
    name: 'multiProviderSearch' as const,
    args: {
      query: 'react authentication implementation',
      urlAttachments: [],
      options: { maxResults: 20, category: 'code', urgency: 'medium' }
    },
    result: {
      results: [
        {
          title: 'React Authentication: The Complete Guide',
          url: 'https://auth0.com/blog/complete-guide-to-react-user-authentication',
          summary: 'Comprehensive guide covering JWT tokens, OAuth, and session management in React applications.',
          score: 0.95,
          provider: 'exa',
          metadata: { type: 'blog_post', authority: 'high' }
        },
        {
          title: 'Building Secure React Applications',
          url: 'https://github.com/facebook/react/discussions/security',
          summary: 'Official React team discussions on security best practices and common vulnerabilities.',
          score: 0.92,
          provider: 'github',
          metadata: { type: 'github_discussion', authority: 'high', stars: 2500 }
        }
      ],
      providerUsage: [
        { provider: 'exa', queriesExecuted: 1, resultsReturned: 1, avgResponseTime: 850 },
        { provider: 'github', queriesExecuted: 1, resultsReturned: 1, avgResponseTime: 650 }
      ],
      fusionMetrics: {
        totalResults: 2,
        duplicatesRemoved: 0,
        qualityFiltered: 0,
        diversityScore: 0.9,
        relevanceScore: 0.935
      }
    }
  }
];

describe('Revolutionary Multi-Wave Research System', () => {
  
  describe('Enhanced Schema Validation', () => {
    test('should validate complete context analysis structure', () => {
      const mockContext = createMockContextAnalysis();
      const result = ContextAnalysisSchema.safeParse(mockContext);
      
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.technologyStack.languages).toContain('typescript');
        expect(result.data.architecture.serviceType).toBe('microservices');
        expect(result.data.dependencies.dependencies).toHaveLength(2);
      }
    });

    test('should validate query strategy with contextual queries', () => {
      const mockStrategy = createMockQueryStrategy();
      const result = QueryStrategySchema.safeParse(mockStrategy);
      
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.contextualQueries).toHaveLength(2);
        expect(result.data.contextualQueries[0].priority).toBe(10);
        expect(result.data.contextualQueries[0].category).toBe('implementation');
      }
    });

    test('should validate enhanced plan result schema', () => {
      const mockPlanResult = {
        contextAnalysis: createMockContextAnalysis(),
        queryStrategy: createMockQueryStrategy(),
        researchWaves: [
          {
            waveNumber: 1,
            queries: ['react auth', 'next.js security'],
            providers: ['exa', 'github'],
            rationale: 'Initial broad discovery',
            expectedOutcomes: ['Implementation patterns', 'Security practices']
          }
        ],
        nextStepsToolsPlans: [],
        success: true
      };

      const result = EnhancedPlanResultSchema.safeParse(mockPlanResult);
      expect(result.success).toBe(true);
    });
  });

  describe('PTRR Plan Phase - Revolutionary Context Analysis', () => {
    beforeEach(() => {
      // Mock global context
      const mockGetGlobalContext = require('@engi/context').getGlobalContext;
      mockGetGlobalContext.mockReturnValue({
        taskContext: {
          task: 'Implement React authentication with JWT tokens and refresh functionality',
          taskType: 'feature_request',
          attachments: [
            { type: 'url', content: 'https://reactjs.org/docs/hooks-reference.html' },
            { type: 'url', content: 'https://auth0.com/docs/quickstart/spa/react' }
          ]
        }
      });

      // Mock URL analysis
      const mockAnalyzeUrlAttachments = require('@engi/generic-tools-web-search').analyzeUrlAttachments;
      mockAnalyzeUrlAttachments.mockResolvedValue({
        suggestedDomains: ['reactjs.org', 'auth0.com'],
        contentTopics: ['react', 'authentication', 'jwt', 'hooks'],
        relatedDomains: ['developer.mozilla.org', 'github.com'],
        classifications: [
          { url: 'https://reactjs.org/docs/hooks-reference.html', type: 'documentation', confidence: 0.95 },
          { url: 'https://auth0.com/docs/quickstart/spa/react', type: 'tutorial', confidence: 0.9 }
        ],
        searchStrategy: {
          includeDomains: ['reactjs.org', 'auth0.com', 'developer.mozilla.org'],
          enhancedQueries: ['react hooks authentication patterns', 'JWT token management React']
        }
      });
    });

    test('should perform revolutionary context analysis and query generation', async () => {
      const planFn = WEB_RESEARCH_AGENT.researchWeb.ptrrConfig.plan.promptFn;
      const result = await planFn(undefined, {});

      expect(typeof result).toBe('string');
      expect(result).toContain('REVOLUTIONARY MULTI-WAVE RESEARCH ORCHESTRATION');
      expect(result).toContain('Deep Context Analysis');
      expect(result).toContain('Technology Stack Detected');
      expect(result).toContain('Multi-Wave Research Plan');
    });

    test('should generate technology-aware contextual queries', async () => {
      const planFn = WEB_RESEARCH_AGENT.researchWeb.ptrrConfig.plan.promptFn;
      const result = await planFn(undefined, {});

      expect(result).toContain('react');
      expect(result).toContain('authentication');
      expect(result).toContain('Wave 1 - Broad Discovery');
      expect(result).toContain('Wave 2 - Deep Analysis');
    });

    test('should handle URL intelligence integration', async () => {
      const planFn = WEB_RESEARCH_AGENT.researchWeb.ptrrConfig.plan.promptFn;
      const result = await planFn(undefined, {});

      expect(result).toContain('URL Intelligence');
      expect(result).toContain('reactjs.org');
      expect(result).toContain('technology topics extracted');
    });

    test('should gracefully handle URL analysis failures', async () => {
      const mockAnalyzeUrlAttachments = require('@engi/generic-tools-web-search').analyzeUrlAttachments;
      mockAnalyzeUrlAttachments.mockRejectedValue(new Error('Network timeout'));

      const planFn = WEB_RESEARCH_AGENT.researchWeb.ptrrConfig.plan.promptFn;
      const result = await planFn(undefined, {});

      // Should still generate valid plan despite URL analysis failure
      expect(typeof result).toBe('string');
      expect(result).toContain('REVOLUTIONARY MULTI-WAVE RESEARCH');
    });
  });

  describe('PTRR Generate Phase - Multi-Wave Execution', () => {
    const createMockPlanResult = () => ({
      contextAnalysis: createMockContextAnalysis(),
      queryStrategy: createMockQueryStrategy(),
      researchWaves: [
        {
          waveNumber: 1,
          queries: ['react authentication', 'jwt implementation'],
          providers: ['exa', 'github'],
          rationale: 'Initial discovery',
          expectedOutcomes: ['Implementation guides', 'Code examples']
        }
      ],
      urlAnalysis: {
        urlsFound: 2,
        suggestedDomains: ['reactjs.org', 'auth0.com'],
        contentTopics: ['react', 'authentication'],
        enhancedQueries: ['react hooks auth']
      },
      nextStepsToolsPlans: [],
      success: true,
      previousStepsToolsPlansResults: createMockMultiProviderResults()
    });

    test('should process Wave 1 multi-provider results', async () => {
      const mockPlan = createMockPlanResult();
      const generateFn = WEB_RESEARCH_AGENT.researchWeb.ptrrConfig.try.promptFn;
      const result = await generateFn(mockPlan, {});

      expect(result).toContain('REVOLUTIONARY MULTI-WAVE RESEARCH SYNTHESIS');
      expect(result).toContain('Wave 1 - Broad Discovery Results');
      expect(result).toContain('multi-provider searches');
      expect(result).toContain('findings from');
      expect(result).toContain('providers');
    });

    test('should generate follow-up queries for Wave 2', async () => {
      const mockPlan = createMockPlanResult();
      const generateFn = WEB_RESEARCH_AGENT.researchWeb.ptrrConfig.try.promptFn;
      const result = await generateFn(mockPlan, {});

      expect(result).toContain('Wave 2 - Deep Analysis');
      expect(result).toContain('Planned');
      expect(result).toContain('deep technical searches');
      expect(result).toContain('Academic, GitHub, Stack Overflow');
    });

    test('should handle Wave 2 execution when results available', async () => {
      const mockPlan = createMockPlanResult();
      // Add Wave 2 results to mock data
      mockPlan.previousStepsToolsPlansResults.push({
        name: 'multiProviderSearch' as const,
        args: {
          query: 'react advanced patterns best practices',
          urlAttachments: [],
          options: { maxResults: 15, category: 'academic', urgency: 'medium' }
        },
        result: {
          results: [
            {
              title: 'Advanced React Patterns: Research Paper',
              url: 'https://semantic-scholar.org/paper/react-patterns-123',
              summary: 'Academic analysis of React component patterns and their effectiveness.',
              score: 0.88,
              provider: 'semantic_scholar',
              metadata: { type: 'academic_paper', citations: 150 }
            }
          ],
          providerUsage: [
            { provider: 'semantic_scholar', queriesExecuted: 1, resultsReturned: 1, avgResponseTime: 1200 }
          ]
        }
      });

      const generateFn = WEB_RESEARCH_AGENT.researchWeb.ptrrConfig.try.promptFn;
      const result = await generateFn(mockPlan, {});

      expect(result).toContain('Wave 2 - Deep Analysis Results');
      expect(result).toContain('targeted deep searches');
      expect(result).toContain('Multi-wave completed');
    });

    test('should handle missing multi-provider results gracefully', async () => {
      const mockPlan = createMockPlanResult();
      mockPlan.previousStepsToolsPlansResults = [];

      const generateFn = WEB_RESEARCH_AGENT.researchWeb.ptrrConfig.try.promptFn;
      const result = await generateFn(mockPlan, {});

      expect(result).toContain('Wave 1 Research Failed');
      expect(result).toContain('No multi-provider search results found');
    });
  });

  describe('PTRR Refine Phase - Quality Assessment', () => {
    const createMockGenerateResult = () => ({
      initialWaveResults: {
        queries: ['react auth', 'jwt tokens'],
        totalResults: 2,
        providersUsed: ['exa', 'github'],
        qualityScore: 0.85
      },
      followUpStrategy: {
        queries: [],
        gaps: [],
        contradictions: [],
        deepDiveAreas: []
      },
      comprehensiveFindings: [
        {
          title: 'React Authentication Guide',
          url: 'https://auth0.com/blog/react-auth',
          summary: 'Complete guide to authentication in React applications.',
          relevance: 0.95,
          query: 'react authentication',
          provider: 'exa',
          wave: 1
        },
        {
          title: 'JWT Best Practices',
          url: 'https://github.com/auth0/jwt-handbook',
          summary: 'Security best practices for JWT implementation.',
          relevance: 0.88,
          query: 'jwt implementation',
          provider: 'github',
          wave: 1
        }
      ],
      previousStepsToolsPlansResults: [],
      nextStepsToolsPlans: [],
      success: true
    });

    test('should perform multi-dimensional quality analysis', async () => {
      const mockGenerate = createMockGenerateResult();
      const refineFn = WEB_RESEARCH_AGENT.researchWeb.ptrrConfig.refine.promptFn;
      const result = await refineFn(mockGenerate, {});

      expect(result).toContain('REVOLUTIONARY QUALITY ASSESSMENT & GAP ANALYSIS');
      expect(result).toContain('Multi-Wave Quality Metrics');
      expect(result).toContain('Overall Quality Score');
      expect(result).toContain('Dimensional Analysis');
    });

    test('should detect research gaps', async () => {
      const mockGenerate = createMockGenerateResult();
      const refineFn = WEB_RESEARCH_AGENT.researchWeb.ptrrConfig.refine.promptFn;
      const result = await refineFn(mockGenerate, {});

      expect(result).toContain('Research Gap Analysis');
      expect(result).toContain('Deep Technical Analysis');
      expect(result).toContain('Wave 2 deep analysis was not executed');
    });

    test('should assess synthesis readiness', async () => {
      const mockGenerate = createMockGenerateResult();
      const refineFn = WEB_RESEARCH_AGENT.researchWeb.ptrrConfig.refine.promptFn;
      const result = await refineFn(mockGenerate, {});

      expect(result).toContain('Synthesis Readiness');
      expect(result).toContain('Ready for Synthesis');
      expect(result).toContain('Readiness Score');
    });

    test('should provide provider performance analysis', async () => {
      const mockGenerate = createMockGenerateResult();
      const refineFn = WEB_RESEARCH_AGENT.researchWeb.ptrrConfig.refine.promptFn;
      const result = await refineFn(mockGenerate, {});

      expect(result).toContain('Provider Performance');
      expect(result).toContain('Active Providers');
      expect(result).toContain('Wave 1 Results');
      expect(result).toContain('comprehensive findings');
    });

    test('should handle missing comprehensive findings', async () => {
      const mockGenerate = createMockGenerateResult();
      mockGenerate.comprehensiveFindings = [];

      const refineFn = WEB_RESEARCH_AGENT.researchWeb.ptrrConfig.refine.promptFn;
      const result = await refineFn(mockGenerate, {});

      expect(result).toContain('Multi-Wave Quality Assessment Failed');
      expect(result).toContain('No comprehensive findings available');
    });
  });

  describe('Production Error Handling', () => {
    test('should handle plan fallback gracefully', () => {
      const fallback = WEB_RESEARCH_AGENT.researchWeb.ptrrConfig.plan.fallback;
      const result = fallback();

      expect(result).toHaveProperty('contextAnalysis');
      expect(result).toHaveProperty('queryStrategy');
      expect(result).toHaveProperty('researchWaves');
      expect(result.success).toBe(true);
    });

    test('should validate schema compliance in all phases', () => {
      // Test that all mock data structures comply with enhanced schemas
      const mockContext = createMockContextAnalysis();
      const mockStrategy = createMockQueryStrategy();

      expect(ContextAnalysisSchema.safeParse(mockContext).success).toBe(true);
      expect(QueryStrategySchema.safeParse(mockStrategy).success).toBe(true);
    });
  });

  describe('Performance and Scalability', () => {
    test('should handle large result sets efficiently', async () => {
      const largeResultSet = Array.from({ length: 100 }, (_, i) => ({
        title: `Result ${i}`,
        url: `https://example.com/result-${i}`,
        summary: `Summary for result ${i} with detailed content`,
        relevance: Math.random(),
        query: 'test query',
        provider: 'exa',
        wave: 1
      }));

      const mockGenerate = {
        comprehensiveFindings: largeResultSet,
        initialWaveResults: { queries: [], totalResults: 100, providersUsed: ['exa'], qualityScore: 0.8 },
        followUpStrategy: { queries: [], gaps: [], contradictions: [], deepDiveAreas: [] },
        previousStepsToolsPlansResults: [],
        nextStepsToolsPlans: [],
        success: true
      };

      const refineFn = WEB_RESEARCH_AGENT.researchWeb.ptrrConfig.refine.promptFn;
      const startTime = Date.now();
      const result = await refineFn(mockGenerate, {});
      const executionTime = Date.now() - startTime;

      expect(typeof result).toBe('string');
      expect(executionTime).toBeLessThan(1000); // Should complete within 1 second
      expect(result).toContain('100 comprehensive findings');
    });

    test('should handle concurrent operations safely', async () => {
      const mockPlan = {
        contextAnalysis: createMockContextAnalysis(),
        queryStrategy: createMockQueryStrategy(),
        researchWaves: [],
        nextStepsToolsPlans: [],
        success: true,
        previousStepsToolsPlansResults: createMockMultiProviderResults()
      };

      const generateFn = WEB_RESEARCH_AGENT.researchWeb.ptrrConfig.try.promptFn;
      
      // Execute multiple operations concurrently
      const promises = Array.from({ length: 5 }, () => generateFn(mockPlan, {}));
      const results = await Promise.all(promises);

      expect(results).toHaveLength(5);
      results.forEach(result => {
        expect(typeof result).toBe('string');
        expect(result).toContain('REVOLUTIONARY MULTI-WAVE RESEARCH SYNTHESIS');
      });
    });
  });

  describe('Integration Testing', () => {
    test('should integrate all PTRR phases seamlessly', async () => {
      // Test complete PTRR workflow
      const planFn = WEB_RESEARCH_AGENT.researchWeb.ptrrConfig.plan.promptFn;
      const planResult = await planFn(undefined, {});
      expect(typeof planResult).toBe('string');

      // Mock plan data for generate phase
      const mockPlan = {
        contextAnalysis: createMockContextAnalysis(),
        queryStrategy: createMockQueryStrategy(),
        researchWaves: [],
        nextStepsToolsPlans: [],
        success: true,
        previousStepsToolsPlansResults: createMockMultiProviderResults()
      };

      const generateFn = WEB_RESEARCH_AGENT.researchWeb.ptrrConfig.try.promptFn;
      const generateResult = await generateFn(mockPlan, {});
      expect(typeof generateResult).toBe('string');

      // Test refine phase
      const mockGenerate = {
        comprehensiveFindings: [
          {
            title: 'Test Result',
            url: 'https://example.com',
            summary: 'Test summary',
            relevance: 0.9,
            query: 'test',
            provider: 'exa',
            wave: 1
          }
        ],
        initialWaveResults: { queries: [], totalResults: 1, providersUsed: ['exa'], qualityScore: 0.9 },
        followUpStrategy: { queries: [], gaps: [], contradictions: [], deepDiveAreas: [] },
        previousStepsToolsPlansResults: [],
        nextStepsToolsPlans: [],
        success: true
      };

      const refineFn = WEB_RESEARCH_AGENT.researchWeb.ptrrConfig.refine.promptFn;
      const refineResult = await refineFn(mockGenerate, {});
      expect(typeof refineResult).toBe('string');
    });
  });
});

describe('Production Readiness Validation', () => {
  test('should have all required configuration properties', () => {
    const agent = WEB_RESEARCH_AGENT.researchWeb;
    
    expect(agent).toHaveProperty('name');
    expect(agent).toHaveProperty('description');
    expect(agent).toHaveProperty('systemPrompt');
    expect(agent).toHaveProperty('ptrrConfig');
    expect(agent.ptrrConfig).toHaveProperty('plan');
    expect(agent.ptrrConfig).toHaveProperty('try');
    expect(agent.ptrrConfig).toHaveProperty('refine');
  });

  test('should have proper schema validation', () => {
    const { plan, try: tryStep, refine } = WEB_RESEARCH_AGENT.researchWeb.ptrrConfig;
    
    expect(plan).toHaveProperty('finalResultSchema');
    expect(tryStep).toHaveProperty('finalResultSchema');
    expect(refine).toHaveProperty('finalResultSchema');
  });

  test('should have production-ready error handling', async () => {
    // Test fallback mechanisms
    const fallback = WEB_RESEARCH_AGENT.researchWeb.ptrrConfig.plan.fallback;
    const fallbackResult = fallback();
    
    expect(fallbackResult).toHaveProperty('success', true);
    expect(fallbackResult).toHaveProperty('contextAnalysis');
    expect(fallbackResult).toHaveProperty('queryStrategy');
  });
});
