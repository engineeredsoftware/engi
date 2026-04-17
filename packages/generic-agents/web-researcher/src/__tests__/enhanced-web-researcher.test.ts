import { WEB_RESEARCH_AGENT } from '../index';
import { getGlobalContext } from '@bitcode/context';

// Mock dependencies
jest.mock('@bitcode/context');
jest.mock('@bitcode/logger');
jest.mock('@bitcode/generic-tools-web-search', () => ({
  search: jest.fn(),
  searchWithUrlIntelligence: jest.fn(),
  analyzeUrlAttachments: jest.fn(),
}));

const mockGlobalContext = getGlobalContext as jest.MockedFunction<typeof getGlobalContext>;
const mockSearch = require('@bitcode/generic-tools-web-search').search;
const mockSearchWithUrlIntelligence = require('@bitcode/generic-tools-web-search').searchWithUrlIntelligence;
const mockAnalyzeUrlAttachments = require('@bitcode/generic-tools-web-search').analyzeUrlAttachments;

describe('Enhanced Web Research Agent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Setup default mock implementations
    mockGlobalContext.mockReturnValue({
      taskContext: {
        task: 'Implement user authentication with React hooks',
        taskType: 'feature_request',
        attachments: []
      },
      updateDiscoveryPhase: jest.fn(),
      getLatestDiscovery: jest.fn()
    } as any);

    mockSearch.mockResolvedValue({
      results: [
        {
          title: 'React Authentication Guide',
          url: 'https://reactjs.org/docs/authentication.html',
          score: 0.9,
          id: 'test-1',
          summary: 'Complete guide to implementing authentication in React applications.',
          text: 'Detailed authentication implementation...'
        }
      ],
      autopromptString: 'Enhanced query about React authentication'
    });

    mockSearchWithUrlIntelligence.mockResolvedValue({
      results: [
        {
          title: 'React Hooks Authentication Tutorial',
          url: 'https://reactjs.org/docs/hooks-auth.html',
          score: 0.95,
          id: 'test-2',
          summary: 'Tutorial on using React hooks for authentication.',
          text: 'React hooks authentication tutorial...'
        }
      ],
      autopromptString: 'URL-enhanced query about React hooks authentication',
      urlAnalysis: {
        classifications: [
          {
            url: 'https://reactjs.org/docs/hooks.html',
            type: 'documentation',
            domain: 'reactjs.org',
            confidence: 0.9,
            metadata: { isOfficial: true, authority: 'high' }
          }
        ],
        suggestedDomains: ['reactjs.org'],
        relatedDomains: ['react.dev', 'legacy.reactjs.org'],
        contentTopics: ['react'],
        searchStrategy: {
          includeDomains: ['reactjs.org', 'react.dev'],
          categories: [],
          enhancedQueries: ['react authentication best practices', 'react hooks implementation guide']
        }
      }
    });

    mockAnalyzeUrlAttachments.mockResolvedValue({
      classifications: [
        {
          url: 'https://reactjs.org/docs/hooks.html',
          type: 'documentation',
          domain: 'reactjs.org',
          confidence: 0.9,
          metadata: { isOfficial: true, authority: 'high' }
        }
      ],
      suggestedDomains: ['reactjs.org'],
      relatedDomains: ['react.dev'],
      contentTopics: ['react'],
      searchStrategy: {
        includeDomains: ['reactjs.org', 'react.dev'],
        categories: [],
        enhancedQueries: ['react authentication patterns', 'react hooks guide']
      }
    });
  });

  describe('Plan Phase with URL Intelligence', () => {
    test('should analyze URL attachments and enhance search strategy', async () => {
      mockGlobalContext.mockReturnValue({
        taskContext: {
          task: 'Implement React authentication',
          taskType: 'feature_request',
          attachments: [
            { type: 'url', content: 'https://reactjs.org/docs/hooks.html' }
          ]
        },
        updateDiscoveryPhase: jest.fn(),
        getLatestDiscovery: jest.fn()
      } as any);

      const planFn = WEB_RESEARCH_AGENT.researchWeb.ptrrConfig.plan.contextfulToolingPromptFn;
      const result = await planFn(undefined, {});

      expect(result.success).toBe(true);
      expect(result.searchQueries).toBeDefined();
      expect(result.urlAnalysis).toBeDefined();
      expect(result.urlAnalysis?.urlsFound).toBe(1);
      expect(result.urlAnalysis?.suggestedDomains).toContain('reactjs.org');
      expect(result.urlAnalysis?.contentTopics).toContain('react');
      
      // Verify enhanced queries include technology context
      expect(result.searchQueries.some(q => q.includes('react'))).toBe(true);
      
      // Verify URL intelligence is applied to search plans
      expect(result.nextStepsToolsPlans).toBeDefined();
      expect(result.nextStepsToolsPlans.some(plan => 
        plan.name === 'searchWebWithUrlIntelligence'
      )).toBe(true);
    });

    test('should generate task-type specific queries with URL context', async () => {
      mockGlobalContext.mockReturnValue({
        taskContext: {
          task: 'Fix authentication bug in React app',
          taskType: 'bug_fix',
          attachments: [
            { type: 'url', content: 'https://github.com/facebook/react/issues/123' }
          ]
        },
        updateDiscoveryPhase: jest.fn(),
        getLatestDiscovery: jest.fn()
      } as any);

      const planFn = WEB_RESEARCH_AGENT.researchWeb.ptrrConfig.plan.contextfulToolingPromptFn;
      const result = await planFn(undefined, {});

      expect(result.searchQueries.some(q => q.includes('fix'))).toBe(true);
      expect(result.searchQueries.some(q => q.includes('troubleshooting'))).toBe(true);
      expect(result.searchQueries.some(q => q.includes('react'))).toBe(true);
    });

    test('should handle empty URL attachments gracefully', async () => {
      mockGlobalContext.mockReturnValue({
        taskContext: {
          task: 'General programming task',
          taskType: 'other',
          attachments: []
        },
        updateDiscoveryPhase: jest.fn(),
        getLatestDiscovery: jest.fn()
      } as any);

      const planFn = WEB_RESEARCH_AGENT.researchWeb.ptrrConfig.plan.contextfulToolingPromptFn;
      const result = await planFn(undefined, {});

      expect(result.success).toBe(true);
      expect(result.urlAnalysis).toBeUndefined();
      expect(result.searchQueries).toBeDefined();
      expect(result.searchQueries.length).toBeGreaterThan(0);
    });

    test('should handle URL analysis errors gracefully', async () => {
      mockAnalyzeUrlAttachments.mockRejectedValue(new Error('URL analysis failed'));
      
      mockGlobalContext.mockReturnValue({
        taskContext: {
          task: 'Test task',
          taskType: 'feature_request',
          attachments: [
            { type: 'url', content: 'https://invalid-url' }
          ]
        },
        updateDiscoveryPhase: jest.fn(),
        getLatestDiscovery: jest.fn()
      } as any);

      const planFn = WEB_RESEARCH_AGENT.researchWeb.ptrrConfig.plan.contextfulToolingPromptFn;
      const result = await planFn(undefined, {});

      // Should still succeed even if URL analysis fails
      expect(result.success).toBe(true);
      expect(result.searchQueries).toBeDefined();
    });
  });

  describe('Generate Phase with URL Intelligence', () => {
    test('should process both regular and URL-enhanced search results', async () => {
      const mockPlan = {
        searchQueries: ['react authentication', 'react hooks guide'],
        urlAnalysis: {
          urlsFound: 1,
          suggestedDomains: ['reactjs.org'],
          contentTopics: ['react'],
          enhancedQueries: ['react auth patterns']
        },
        nextStepsToolsPlans: [
          {
            name: 'searchWebWithUrlIntelligence',
            args: {
              query: 'react authentication',
              urlAttachments: ['https://reactjs.org/docs/hooks.html'],
              options: { numResults: 5 }
            }
          }
        ],
        success: true,
        previousStepsToolsPlansResults: [
          {
            name: 'searchWebWithUrlIntelligence',
            args: {
              query: 'react authentication',
              urlAttachments: ['https://reactjs.org/docs/hooks.html']
            },
            result: {
              results: [
                {
                  title: 'React Auth Tutorial',
                  url: 'https://reactjs.org/auth',
                  score: 0.9,
                  summary: 'React authentication tutorial'
                }
              ],
              query: 'react authentication',
              urlAnalysis: {
                suggestedDomains: ['reactjs.org'],
                contentTopics: ['react'],
                classifications: [{ type: 'documentation' }]
              }
            }
          }
        ]
      };

      const generateFn = WEB_RESEARCH_AGENT.researchWeb.ptrrConfig.try.promptFn!;
      const result = await generateFn(mockPlan, {});

      expect(result).toContain('Enhanced Web Research Results Analysis');
      expect(result).toContain('URL Intelligence Applied');
      expect(result).toContain('Domains Scoped');
      expect(result).toContain('Technologies');
      expect(result).toContain('urlIntelligence');
    });

    test('should handle mixed search result types', async () => {
      const mockPlan = {
        searchQueries: ['test query'],
        nextStepsToolsPlans: [],
        success: true,
        previousStepsToolsPlansResults: [
          {
            name: 'searchWeb',
            result: {
              results: [{ title: 'Regular Search Result', url: 'https://example.com', score: 0.8 }],
              query: 'regular search'
            }
          },
          {
            name: 'searchWebWithUrlIntelligence',
            result: {
              results: [{ title: 'Enhanced Search Result', url: 'https://reactjs.org', score: 0.9 }],
              query: 'enhanced search',
              urlAnalysis: {
                suggestedDomains: ['reactjs.org'],
                contentTopics: ['react']
              }
            }
          }
        ]
      };

      const generateFn = WEB_RESEARCH_AGENT.researchWeb.ptrrConfig.try.promptFn!;
      const result = await generateFn(mockPlan, {});

      expect(result).toContain('2 search queries');
      expect(result).toContain('URL Intelligence Applied');
      expect(result).toContain('reactjs.org');
    });
  });

  describe('Intensify Phase with URL Intelligence', () => {
    test('should include URL intelligence in global context update', async () => {
      const mockRefine = {
        researchQuality: {
          relevance: 0.9,
          coverage: 0.8,
          reliability: 0.85,
          overallScore: 0.85
        },
        improvements: [],
        success: true
      };

      const mockGenerateResult = {
        queries: ['react authentication'],
        researchResults: [
          {
            title: 'React Auth Guide',
            url: 'https://reactjs.org/auth',
            summary: 'Authentication guide',
            relevance: 0.9,
            query: 'react authentication'
          }
        ],
        urlIntelligence: {
          domainsScoped: ['reactjs.org'],
          technologiesDetected: ['react'],
          urlTypesFound: ['documentation']
        },
        success: true
      };

      const mockContext = {
        taskContext: { task: 'test task' },
        updateDiscoveryPhase: jest.fn(),
        getLatestDiscovery: jest.fn().mockReturnValue({
          agents: [[{
            name: 'Web Research Agent',
            steps: {
              try: { result: mockGenerateResult }
            }
          }]]
        })
      };

      mockGlobalContext.mockReturnValue(mockContext as any);

      const intensifyFn = WEB_RESEARCH_AGENT.researchWeb.ptrrConfig.intensify.contextfulToolingPromptFn;
      const result = await intensifyFn(mockRefine, {});

      expect(result.success).toBe(true);
      expect(result.urlIntelligence).toEqual(mockGenerateResult.urlIntelligence);
      
      // Verify global context was updated with URL intelligence
      expect(mockContext.updateDiscoveryPhase).toHaveBeenCalledWith({
        webResearch: expect.objectContaining({
          urlIntelligence: mockGenerateResult.urlIntelligence
        })
      });
    });

    test('should handle missing URL intelligence gracefully', async () => {
      const mockRefine = {
        researchQuality: {
          relevance: 0.8,
          coverage: 0.7,
          reliability: 0.8,
          overallScore: 0.75
        },
        improvements: [],
        success: true
      };

      const mockGenerateResult = {
        queries: ['general query'],
        researchResults: [
          {
            title: 'General Result',
            url: 'https://example.com',
            summary: 'General summary',
            relevance: 0.8,
            query: 'general query'
          }
        ],
        // No urlIntelligence field
        success: true
      };

      const mockContext = {
        taskContext: { task: 'test task' },
        updateDiscoveryPhase: jest.fn(),
        getLatestDiscovery: jest.fn().mockReturnValue({
          agents: [[{
            name: 'Web Research Agent',
            steps: {
              try: { result: mockGenerateResult }
            }
          }]]
        })
      };

      mockGlobalContext.mockReturnValue(mockContext as any);

      const intensifyFn = WEB_RESEARCH_AGENT.researchWeb.ptrrConfig.intensify.contextfulToolingPromptFn;
      const result = await intensifyFn(mockRefine, {});

      expect(result.success).toBe(true);
      expect(result.urlIntelligence).toEqual({
        domainsScoped: [],
        technologiesDetected: [],
        urlTypesFound: []
      });
    });
  });

  describe('Schema Validation', () => {
    test('should validate plan result schema with URL analysis', () => {
      const planResult = {
        searchQueries: ['test query'],
        urlAnalysis: {
          urlsFound: 1,
          suggestedDomains: ['example.com'],
          contentTopics: ['react'],
          enhancedQueries: ['enhanced query']
        },
        nextStepsToolsPlans: [],
        success: true
      };

      const PlanSchema = WEB_RESEARCH_AGENT.researchWeb.ptrrConfig.plan.finalResultSchema;
      const validationResult = PlanSchema.safeParse(planResult);
      
      expect(validationResult.success).toBe(true);
      if (validationResult.success) {
        expect(validationResult.data.urlAnalysis).toBeDefined();
        expect(validationResult.data.urlAnalysis?.urlsFound).toBe(1);
      }
    });

    test('should validate generate result schema with URL intelligence', () => {
      const generateResult = {
        queries: ['test query'],
        researchResults: [
          {
            title: 'Test Result',
            url: 'https://example.com',
            summary: 'Test summary',
            relevance: 0.8,
            query: 'test query'
          }
        ],
        urlIntelligence: {
          domainsScoped: ['example.com'],
          technologiesDetected: ['react'],
          urlTypesFound: ['documentation']
        },
        previousStepsToolsPlansResults: [],
        success: true
      };

      const GenerateSchema = WEB_RESEARCH_AGENT.researchWeb.ptrrConfig.try.finalResultSchema;
      const validationResult = GenerateSchema.safeParse(generateResult);
      
      expect(validationResult.success).toBe(true);
      if (validationResult.success) {
        expect(validationResult.data.urlIntelligence).toBeDefined();
        expect(validationResult.data.urlIntelligence?.domainsScoped).toContain('example.com');
      }
    });

    test('should validate intensify result schema with URL intelligence', () => {
      const intensifyResult = {
        queries: ['test query'],
        researchResults: [],
        urlIntelligence: {
          domainsScoped: ['example.com'],
          technologiesDetected: ['react'],
          urlTypesFound: ['documentation']
        },
        keyInsights: ['key insight'],
        taskRelevance: 0.8,
        feedback: 'Good research',
        success: true
      };

      const IntensifySchema = WEB_RESEARCH_AGENT.researchWeb.ptrrConfig.intensify.finalResultSchema;
      const validationResult = IntensifySchema.safeParse(intensifyResult);
      
      expect(validationResult.success).toBe(true);
      if (validationResult.success) {
        expect(validationResult.data.urlIntelligence).toBeDefined();
      }
    });
  });
});
