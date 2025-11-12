/**
 * Comprehensive Procurement System Integration Example
 * 
 * This example demonstrates how all the procurement systems work together
 * in a complete end-to-end workflow from request to token compensation.
 */

import { log } from '@engi/logger';
import { 
  ProcurementEngine,
  AdvancedMatchingEngine,
  ProcurementAnalyticsEngine,
  AutomatedQualityAssessment,
  ProcurementNotificationSystem,
  FraudDetectionEngine,
  RepositoryOptInManager,
  GlobalDatasetManager
} from './index';
import type { 
  Procurement, 
  MarksOfMeasurement,
  SolutionCategory 
} from './types';

export class EngiProcurementSystem {
  private procurementEngine: ProcurementEngine;
  private matchingEngine: AdvancedMatchingEngine;
  private analyticsEngine: ProcurementAnalyticsEngine;
  private qualityAssessment: AutomatedQualityAssessment;
  private notificationSystem: ProcurementNotificationSystem;
  private fraudDetection: FraudDetectionEngine;
  private repositoryManager: RepositoryOptInManager;
  private datasetManager: GlobalDatasetManager;
  private tokenContract: EngiTokenContract;

  constructor() {
    this.procurementEngine = new ProcurementEngine();
    this.matchingEngine = new AdvancedMatchingEngine();
    this.analyticsEngine = new ProcurementAnalyticsEngine();
    this.qualityAssessment = new AutomatedQualityAssessment();
    this.notificationSystem = new ProcurementNotificationSystem();
    this.fraudDetection = new FraudDetectionEngine();
    this.repositoryManager = new RepositoryOptInManager();
    this.datasetManager = new GlobalDatasetManager();
    this.tokenContract = new EngiTokenContract();
  }

  /**
   * Complete procurement workflow example
   */
  async runCompleteWorkflow(): Promise<void> {
    try {
      log('🚀 Starting complete procurement workflow demonstration', 'info');

      // Step 1: Create a procurement request
      const procurement = await this.createExampleProcurement();
      log('✅ Step 1: Procurement created', 'info', { procurementId: procurement.id });

      // Step 2: Run fraud detection
      const fraudAnalysis = await this.fraudDetection.analyzeProcurementFraud(procurement);
      log('🔍 Step 2: Fraud analysis completed', 'info', { 
        riskScore: fraudAnalysis.riskScore,
        riskLevel: fraudAnalysis.riskLevel 
      });

      if (fraudAnalysis.autoBlocked) {
        log('🚫 Procurement blocked due to fraud detection', 'warn');
        return;
      }

      // Step 3: Send notifications about new procurement
      await this.notificationSystem.notifyProcurementCreated(procurement);
      log('📢 Step 3: Notifications sent to relevant contributors', 'info');

      // Step 4: Find optimal matches
      const matches = await this.matchingEngine.findOptimalMatches(procurement);
      log('🎯 Step 4: Found optimal matches', 'info', { 
        matchCount: matches.length,
        topScore: matches[0]?.match.score 
      });

      // Step 5: Notify about matches
      await this.notificationSystem.notifyProcurementMatched(matches);
      log('📨 Step 5: Match notifications sent', 'info');

      // Step 6: Simulate contributor assignment and work completion
      const fulfillment = await this.simulateWorkCompletion(procurement);
      log('⚡ Step 6: Work completed by contributor', 'info', {
        contributorId: fulfillment.contributorId,
        qualityScore: fulfillment.measurements.overall
      });

      // Step 7: Run automated quality assessment
      const qualityResult = await this.qualityAssessment.assessDeliverables(
        procurement,
        fulfillment.deliverables
      );
      log('🎯 Step 7: Quality assessment completed', 'info', {
        overallScore: qualityResult.overallScore,
        recommendation: qualityResult.recommendation
      });

      // Step 8: Notify about quality assessment
      await this.notificationSystem.notifyQualityAssessmentComplete(procurement, qualityResult);
      log('📋 Step 8: Quality assessment notifications sent', 'info');

      // Step 9: Process crypto compensation (if approved)
      if (qualityResult.recommendation === 'accept') {
        const tokenAmount = fulfillment.reward.totalAmount;
        const transaction = await this.tokenContract.mintForProcurement(
          fulfillment.contributorAddress,
          this.tokenContract.parseTokenAmount(tokenAmount),
          procurement.id
        );

        // Step 10: Notify about token compensation
        await this.notificationSystem.notifyCompensationMinted(
          procurement,
          transaction.transactionHash,
          tokenAmount
        );
        log('💰 Step 9-10: Crypto compensation processed and notifications sent', 'info', {
          transactionHash: transaction.transactionHash,
          tokenAmount
        });
      }

      // Step 11: Generate analytics and insights
      const analytics = await this.analyticsEngine.generateAnalytics(procurement.organizationId);
      log('📊 Step 11: Analytics generated', 'info', {
        totalProcurements: analytics.overview.totalProcurements,
        successRate: analytics.overview.successRate
      });

      // Step 12: Update contributor performance metrics
      await this.updateContributorMetrics(fulfillment, qualityResult);
      log('📈 Step 12: Contributor metrics updated', 'info');

      log('🎉 Complete procurement workflow finished successfully!', 'info');

    } catch (error) {
      log('❌ Procurement workflow failed', 'error', {
        error: error instanceof Error ? error.message : String(error)
      });
      throw error;
    }
  }

  /**
   * Demonstrate repository opt-in workflow
   */
  async demonstrateRepositoryOptIn(): Promise<void> {
    try {
      log('🏗️ Demonstrating repository opt-in workflow', 'info');

      // Step 1: Opt-in a repository
      const repositoryOptIn = await this.repositoryManager.optInRepository({
        repositoryId: 'repo-123',
        organizationId: 'org-456',
        owner: 'example-user',
        name: 'awesome-project',
        contributorAddress: '0x1234567890123456789012345678901234567890',
        availabilityLevel: 'public',
        settings: {
          allowedProcurementTypes: ['ai-tools', 'security', 'integration'],
          maxComplexity: 80,
          minimumReward: '50',
          reviewRequired: true
        },
        metadata: {
          techStack: ['typescript', 'react', 'node.js'],
          framework: 'next.js',
          language: 'typescript',
          size: 'medium',
          specializations: ['frontend', 'full-stack', 'api-development']
        }
      });

      log('✅ Repository opted in successfully', 'info', {
        repositoryId: repositoryOptIn.repositoryId,
        contributorAddress: repositoryOptIn.contributorAddress
      });

      // Step 2: Add content to global dataset
      await this.datasetManager.addToDataset({
        repositoryId: 'repo-123',
        contributorId: 'contributor-789',
        type: 'solution',
        content: `
          // High-performance React component with TypeScript
          import React, { memo, useCallback, useMemo } from 'react';
          
          interface DataTableProps {
            data: any[];
            columns: Column[];
            onSort: (column: string) => void;
          }
          
          export const DataTable = memo<DataTableProps>(({ data, columns, onSort }) => {
            const sortedData = useMemo(() => {
              return data.sort((a, b) => a.id - b.id);
            }, [data]);
            
            const handleSort = useCallback((column: string) => {
              onSort(column);
            }, [onSort]);
            
            return (
              <table className="data-table">
                <thead>
                  {columns.map(col => (
                    <th key={col.id} onClick={() => handleSort(col.id)}>
                      {col.title}
                    </th>
                  ))}
                </thead>
                <tbody>
                  {sortedData.map(row => (
                    <tr key={row.id}>
                      {columns.map(col => (
                        <td key={col.id}>{row[col.id]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            );
          });
        `,
        category: 'ui-components',
        tags: ['react', 'typescript', 'performance', 'table', 'component'],
        techStack: ['react', 'typescript'],
        complexity: 65,
        context: {
          problemDomain: 'Data visualization',
          useCase: 'Sortable data table with performance optimization',
          constraints: ['Must be responsive', 'Support large datasets'],
          requirements: ['TypeScript support', 'Memoization', 'Sort functionality']
        }
      });

      log('📊 Content added to global dataset', 'info');

    } catch (error) {
      log('❌ Repository opt-in workflow failed', 'error', {
        error: error instanceof Error ? error.message : String(error)
      });
      throw error;
    }
  }

  /**
   * Demonstrate real-time monitoring
   */
  async demonstrateRealTimeMonitoring(): Promise<void> {
    try {
      log('👁️ Demonstrating real-time monitoring', 'info');

      // Monitor fraud patterns
      const fraudMonitoring = await this.fraudDetection.monitorRealTimeActivity();
      log('🔍 Fraud monitoring results', 'info', {
        activeThreats: fraudMonitoring.activeThreats,
        newSuspiciousActivities: fraudMonitoring.newSuspiciousActivities.length,
        networkAnomalies: fraudMonitoring.networkAnomalies
      });

      // Generate market intelligence
      const marketIntelligence = await this.analyticsEngine.getMarketIntelligence();
      log('🧠 Market intelligence', 'info', {
        marketHealth: marketIntelligence.marketHealth,
        supplyDemandBalance: marketIntelligence.supplyDemandBalance,
        opportunityScore: marketIntelligence.opportunityScore
      });

      // Analytics overview
      const analytics = await this.analyticsEngine.generateAnalytics();
      log('📈 Current analytics overview', 'info', {
        activeProcurements: analytics.realTime.activeContributors,
        marketSentiment: analytics.realTime.marketSentiment,
        recentCompletions: analytics.realTime.recentCompletions
      });

    } catch (error) {
      log('❌ Real-time monitoring failed', 'error', {
        error: error instanceof Error ? error.message : String(error)
      });
      throw error;
    }
  }

  // Private helper methods

  private async createExampleProcurement(): Promise<Procurement> {
    const measurementCriteria: MarksOfMeasurement = {
      codeQuality: {
        weight: 0.3,
        minThreshold: 80,
        description: 'Clean, maintainable, and well-documented code'
      },
      completeness: {
        weight: 0.3,
        minThreshold: 90,
        description: 'All requirements implemented and working correctly'
      },
      innovation: {
        weight: 0.2,
        minThreshold: 70,
        description: 'Creative problem-solving and modern best practices'
      },
      impact: {
        weight: 0.2,
        minThreshold: 75,
        description: 'Significant improvement to user experience and system performance'
      },
      security: {
        weight: 0.15,
        minThreshold: 85,
        requirements: ['Input validation', 'XSS prevention', 'CSRF protection']
      },
      performance: {
        weight: 0.1,
        minThreshold: 80,
        benchmarks: ['Load time < 2s', 'First paint < 1s', 'Memory efficient']
      },
      passingScore: 80,
      bonusThresholds: [90, 95]
    };

    return await this.procurementEngine.createProcurement({
      organizationId: 'org-example',
      requestorId: 'user-example',
      title: 'Build AI-Powered Code Review Dashboard',
      description: 'Create a modern dashboard that uses AI to analyze code quality, suggest improvements, and track metrics over time. Should integrate with GitHub/GitLab and provide real-time insights.',
      requirements: [
        'React/TypeScript frontend with modern UI/UX',
        'Integration with GitHub and GitLab APIs',
        'AI-powered code analysis using OpenAI or similar',
        'Real-time metrics dashboard with charts',
        'User authentication and role management',
        'Responsive design for mobile and desktop',
        'Comprehensive test coverage (>80%)',
        'Security best practices implementation',
        'Performance optimization for large codebases',
        'Documentation and deployment guides'
      ],
      constraints: [
        'Must be completed within 2 weeks',
        'Budget limit: 800 ENGI tokens',
        'Must use TypeScript for type safety',
        'Should be deployable on Vercel/Netlify',
        'Must comply with enterprise security standards'
      ],
      measurementCriteria,
      budgetLimit: 800,
      deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString() // 2 weeks
    });
  }

  private async simulateWorkCompletion(procurement: Procurement): Promise<any> {
    // Simulate a contributor completing the work
    return {
      contributorId: 'contributor-expert-dev',
      contributorAddress: '0x1234567890123456789012345678901234567890',
      deliverables: [
        {
          type: 'code',
          content: `
            // AI Code Review Dashboard - Main Component
            import React, { useState, useEffect } from 'react';
            import { GitHubAPI } from './services/github';
            import { CodeAnalyzer } from './services/ai-analyzer';
            import { MetricsDashboard } from './components/MetricsDashboard';
            import { RepoSelector } from './components/RepoSelector';
            
            export const CodeReviewDashboard: React.FC = () => {
              const [selectedRepo, setSelectedRepo] = useState<string>('');
              const [analysisData, setAnalysisData] = useState<any>(null);
              const [loading, setLoading] = useState(false);
              
              useEffect(() => {
                if (selectedRepo) {
                  analyzeRepository(selectedRepo);
                }
              }, [selectedRepo]);
              
              const analyzeRepository = async (repoName: string) => {
                setLoading(true);
                try {
                  const repoData = await GitHubAPI.getRepository(repoName);
                  const analysis = await CodeAnalyzer.analyzeCode(repoData);
                  setAnalysisData(analysis);
                } catch (error) {
                  console.error('Analysis failed:', error);
                } finally {
                  setLoading(false);
                }
              };
              
              return (
                <div className="dashboard">
                  <header className="dashboard-header">
                    <h1>AI Code Review Dashboard</h1>
                    <RepoSelector onSelect={setSelectedRepo} />
                  </header>
                  
                  {loading && <div className="loading">Analyzing repository...</div>}
                  
                  {analysisData && (
                    <MetricsDashboard 
                      data={analysisData}
                      onRefresh={() => analyzeRepository(selectedRepo)}
                    />
                  )}
                </div>
              );
            };
          `,
          metadata: {
            filename: 'CodeReviewDashboard.tsx',
            type: 'react-component',
            linesOfCode: 45,
            complexity: 'medium'
          }
        },
        {
          type: 'documentation',
          content: `
            # AI Code Review Dashboard
            
            ## Overview
            A modern dashboard that leverages AI to provide intelligent code review insights and metrics tracking.
            
            ## Features
            - GitHub/GitLab integration
            - AI-powered code analysis
            - Real-time metrics dashboard
            - User authentication
            - Mobile-responsive design
            
            ## Installation
            \`\`\`bash
            npm install
            npm run dev
            \`\`\`
            
            ## Usage
            1. Connect your GitHub account
            2. Select a repository
            3. View AI analysis results
            4. Track metrics over time
            
            ## Architecture
            - Frontend: React + TypeScript
            - AI: OpenAI GPT-4 for code analysis
            - Charts: Recharts for visualizations
            - State: Zustand for state management
            
            ## Security
            - OAuth 2.0 authentication
            - Input validation and sanitization
            - XSS and CSRF protection
            - Secure API token handling
          `,
          metadata: {
            filename: 'README.md',
            type: 'documentation'
          }
        }
      ],
      measurements: {
        codeQuality: 88,
        completeness: 92,
        innovation: 85,
        impact: 90,
        overall: 88.75,
        customScores: {
          security: 87,
          performance: 85,
          testCoverage: 82
        }
      },
      reward: {
        baseAmount: '600',
        qualityMultiplier: 1.15,
        bonusAmount: '90',
        totalAmount: '690'
      },
      fulfilledAt: new Date().toISOString()
    };
  }

  private async updateContributorMetrics(fulfillment: any, qualityResult: any): Promise<void> {
    // Update contributor performance metrics
    const repositoryId = 'repo-123'; // Would be derived from fulfillment
    
    await this.repositoryManager.updateRepositoryMetrics(repositoryId, {
      successful: qualityResult.recommendation === 'accept',
      rating: fulfillment.measurements.overall / 20, // Convert to 5-star scale
      responseTimeHours: 2 // Fast response
    });

    log('📊 Contributor metrics updated', 'info', {
      repositoryId,
      newRating: fulfillment.measurements.overall / 20,
      successful: qualityResult.recommendation === 'accept'
    });
  }
}

// Example usage
export async function runProcurementDemo(): Promise<void> {
  const system = new EngiProcurementSystem();
  
  try {
    // Run the complete workflow
    await system.runCompleteWorkflow();
    
    // Demonstrate repository opt-in
    await system.demonstrateRepositoryOptIn();
    
    // Show real-time monitoring
    await system.demonstrateRealTimeMonitoring();
    
    log('🎯 All procurement system demonstrations completed successfully!', 'info');
    
  } catch (error) {
    log('💥 Procurement demo failed', 'error', {
      error: error instanceof Error ? error.message : String(error)
    });
    throw error;
  }
}