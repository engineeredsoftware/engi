/**
 * Repository Health Monitoring System
 * 
 * Monitors repository health metrics to trigger proactive AI Document updates when
 * code quality declines or technical debt accumulates.
 */

import { supabaseAdmin } from '@bitcode/supabase';
import { log } from '@bitcode/logger';

export interface RepositoryHealthMetrics {
  repository: string;
  userId: string;
  timestamp: string;
  
  // Code Quality Metrics
  codeQuality: {
    overall: number; // 0-100
    testCoverage: number; // 0-100
    cyclomaticComplexity: number; // Average complexity score
    duplicateCode: number; // Percentage of duplicate code
    maintainabilityIndex: number; // 0-100
    technicalDebt: number; // Estimated hours to fix
  };
  
  // Activity Metrics
  activity: {
    commitsLastWeek: number;
    issuesCreated: number;
    prsMerged: number;
    bugsReported: number;
    velocityTrend: 'increasing' | 'stable' | 'decreasing';
  };
  
  // AI Document Opportunity Signals
  aiDocumentSignals: {
    dependencyUpdatesAvailable: number;
    securityVulnerabilities: number;
    performanceBottlenecks: string[];
    codeSmells: string[];
    lastAIDocumentDate: string | null;
    aiDocumentRecommendations: AIDocumentRecommendation[];
  };
}

export interface AIDocumentRecommendation {
  type: 'assetPackEvidenceFeedback' | 'knowledgeExtension' | 'codeQuality' | 'security';
  priority: 'low' | 'medium' | 'high' | 'critical';
  reason: string;
  estimatedImpact: number; // 0-100
  confidence: number; // 0-1
  suggestedActions: string[];
}

export interface HealthAlert {
  id: string;
  repository: string;
  userId: string;
  alertType: 'quality_decline' | 'security_issue' | 'performance_regression' | 'ai_document_overdue';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  recommendations: AIDocumentRecommendation[];
  createdAt: string;
  status: 'active' | 'acknowledged' | 'resolved';
}

/**
 * Repository Health Monitor class
 */
export class RepositoryHealthMonitor {
  private alertThresholds = {
    codeQuality: 60,      // Alert if quality drops below 60%
    testCoverage: 50,     // Alert if coverage drops below 50%
    technicalDebt: 40,    // Alert if debt exceeds 40 hours
    aiDocumentOverdue: 30    // Alert if no AI Document update for 30 days
  };

  /**
   * Analyze repository health and generate metrics
   */
  async analyzeRepositoryHealth(
    repository: string,
    userId: string,
    assetPackEvidenceHistory: Array<{ content: string; files?: any[]; created_at: string }>
  ): Promise<RepositoryHealthMetrics> {
    try {
      log('Analyzing repository health', 'info', { repository, userId });

      // Analyze recent AssetPack evidence for quality trends
      const codeQuality = await this.analyzeCodeQuality(assetPackEvidenceHistory);
      
      // Get activity metrics from database
      const activity = await this.getActivityMetrics(repository, userId);
      
      // Identify AI Document opportunities
      const aiDocumentSignals = await this.identifyAIDocumentSignals(
        repository, 
        userId, 
        codeQuality, 
        activity
      );

      const metrics: RepositoryHealthMetrics = {
        repository,
        userId,
        timestamp: new Date().toISOString(),
        codeQuality,
        activity,
        aiDocumentSignals
      };

      // Store health metrics
      await this.storeHealthMetrics(metrics);

      // Check for alerts
      await this.checkHealthAlerts(metrics);

      return metrics;
    } catch (error) {
      log('Failed to analyze repository health', 'error', { repository, userId, error });
      throw error;
    }
  }

  /**
   * Analyze code quality from recent AssetPack evidence
   */
  private async analyzeCodeQuality(
    assetPackEvidenceHistory: Array<{ content: string; files?: any[]; created_at: string }>
  ): Promise<RepositoryHealthMetrics['codeQuality']> {
    if (assetPackEvidenceHistory.length === 0) {
      return {
        overall: 50,
        testCoverage: 30,
        cyclomaticComplexity: 5,
        duplicateCode: 10,
        maintainabilityIndex: 60,
        technicalDebt: 20
      };
    }

    // Analyze recent AssetPack evidence records (last 10)
    const recentAssetPackEvidence = assetPackEvidenceHistory
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 10);

    let totalQuality = 0;
    let totalTestCoverage = 0;
    let totalComplexity = 0;
    let totalDuplicateCode = 0;
    let totalMaintainability = 0;
    let totalTechDebt = 0;

    for (const assetPackEvidence of recentAssetPackEvidence) {
      const analysis = this.analyzeAssetPackEvidenceQuality(assetPackEvidence);
      totalQuality += analysis.quality;
      totalTestCoverage += analysis.testCoverage;
      totalComplexity += analysis.complexity;
      totalDuplicateCode += analysis.duplicateCode;
      totalMaintainability += analysis.maintainability;
      totalTechDebt += analysis.techDebt;
    }

    const count = recentAssetPackEvidence.length;
    return {
      overall: Math.round(totalQuality / count),
      testCoverage: Math.round(totalTestCoverage / count),
      cyclomaticComplexity: Math.round(totalComplexity / count),
      duplicateCode: Math.round(totalDuplicateCode / count),
      maintainabilityIndex: Math.round(totalMaintainability / count),
      technicalDebt: Math.round(totalTechDebt / count)
    };
  }

  /**
   * Analyze individual AssetPack evidence quality
   */
  private analyzeAssetPackEvidenceQuality(assetPackEvidence: { content: string; files?: any[] }): {
    quality: number;
    testCoverage: number;
    complexity: number;
    duplicateCode: number;
    maintainability: number;
    techDebt: number;
  } {
    const content = assetPackEvidence.content.toLowerCase();
    
    // Quality indicators
    let quality = 60; // Base quality
    if (content.includes('test') || content.includes('spec')) quality += 15;
    if (content.includes('error handling') || content.includes('try/catch')) quality += 10;
    if (content.includes('documentation') || content.includes('comment')) quality += 10;
    if (content.includes('todo') || content.includes('fixme')) quality -= 15;
    if (content.includes('hack') || content.includes('workaround')) quality -= 10;

    // Test coverage estimation
    let testCoverage = 40;
    const testIndicators = (content.match(/test|spec|describe|it\(/g) || []).length;
    testCoverage += Math.min(40, testIndicators * 5);

    // Complexity estimation
    let complexity = 3;
    const complexityIndicators = (content.match(/if|for|while|switch|catch/g) || []).length;
    complexity += complexityIndicators * 0.5;

    // Duplicate code indicators
    let duplicateCode = 5;
    if (content.includes('copy') || content.includes('duplicate')) duplicateCode += 15;
    if (content.includes('repeated') || content.includes('similar')) duplicateCode += 10;

    // Maintainability
    let maintainability = 70;
    if (content.includes('modular') || content.includes('reusable')) maintainability += 15;
    if (content.includes('clean') || content.includes('refactor')) maintainability += 10;
    if (content.includes('historical') || content.includes('retired')) maintainability -= 20;

    // Technical debt estimation (in hours)
    let techDebt = 5;
    if (content.includes('refactor')) techDebt += 10;
    if (content.includes('optimize')) techDebt += 8;
    if (content.includes('improve')) techDebt += 5;

    return {
      quality: Math.max(0, Math.min(100, quality)),
      testCoverage: Math.max(0, Math.min(100, testCoverage)),
      complexity: Math.max(1, complexity),
      duplicateCode: Math.max(0, Math.min(50, duplicateCode)),
      maintainability: Math.max(0, Math.min(100, maintainability)),
      techDebt: Math.max(0, techDebt)
    };
  }

  /**
   * Get repository activity metrics
   */
  private async getActivityMetrics(
    repository: string,
    userId: string
  ): Promise<RepositoryHealthMetrics['activity']> {
    try {
      const lastWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

      // Get recent AssetPack executions as proxy for commits
      const { data: recentRuns } = await supabaseAdmin
        .from('executions')
        .select('created_at')
        .eq('user_id', userId)
        .gte('created_at', lastWeek);

      // Get AI Document activity (proxy for issues/PRs)
      const { data: recentAIDocuments } = await supabaseAdmin
        .from('ai_documents')
        .select('created_at, ai_document_status')
        .eq('user_id', userId)
        .ilike('repository', `%${repository}%`)
        .gte('created_at', lastWeek);

      const commitsLastWeek = recentRuns?.length || 0;
      const issuesCreated = recentAIDocuments?.length || 0;
      const prsMerged = recentAIDocuments?.filter(u => u.ai_document_status === 'completed').length || 0;
      const bugsReported = 0; // Would need GitHub API integration

      // Calculate velocity trend (compare with previous week)
      const twoWeeksAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString();
      const { data: previousWeekRuns } = await supabaseAdmin
        .from('executions')
        .select('created_at')
        .eq('user_id', userId)
        .gte('created_at', twoWeeksAgo)
        .lt('created_at', lastWeek);

      const previousWeekCommits = previousWeekRuns?.length || 0;
      let velocityTrend: 'increasing' | 'stable' | 'decreasing' = 'stable';
      
      if (commitsLastWeek > previousWeekCommits * 1.2) {
        velocityTrend = 'increasing';
      } else if (commitsLastWeek < previousWeekCommits * 0.8) {
        velocityTrend = 'decreasing';
      }

      return {
        commitsLastWeek,
        issuesCreated,
        prsMerged,
        bugsReported,
        velocityTrend
      };
    } catch (error) {
      log('Failed to get activity metrics', 'error', { repository, userId, error });
      return {
        commitsLastWeek: 0,
        issuesCreated: 0,
        prsMerged: 0,
        bugsReported: 0,
        velocityTrend: 'stable'
      };
    }
  }

  /**
   * Identify AI Document opportunities based on health metrics
   */
  private async identifyAIDocumentSignals(
    repository: string,
    userId: string,
    codeQuality: RepositoryHealthMetrics['codeQuality'],
    activity: RepositoryHealthMetrics['activity']
  ): Promise<RepositoryHealthMetrics['aiDocumentSignals']> {
    try {
      // Get last AI Document date
      const { data: lastAIDocument } = await supabaseAdmin
        .from('ai_documents')
        .select('created_at')
        .eq('user_id', userId)
        .ilike('repository', `%${repository}%`)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      const lastAIDocumentDate = lastAIDocument?.created_at || null;
      const daysSinceLastAIDocument = lastAIDocumentDate ? 
        (Date.now() - new Date(lastAIDocumentDate).getTime()) / (1000 * 60 * 60 * 24) : 999;

      // Generate recommendations based on metrics
      const recommendations: AIDocumentRecommendation[] = [];

      // Code quality recommendations
      if (codeQuality.overall < 60) {
        recommendations.push({
          type: 'codeQuality',
          priority: 'high',
          reason: `Code quality score is ${codeQuality.overall}%, below recommended threshold`,
          estimatedImpact: 80,
          confidence: 0.8,
          suggestedActions: [
            'Run code quality AI Document update to improve standards',
            'Add automated linting and formatting',
            'Implement refactoring improvements'
          ]
        });
      }

      // Test coverage recommendations
      if (codeQuality.testCoverage < 50) {
        recommendations.push({
          type: 'codeQuality',
          priority: 'medium',
          reason: `Test coverage is ${codeQuality.testCoverage}%, below recommended 70%`,
          estimatedImpact: 60,
          confidence: 0.7,
          suggestedActions: [
            'Add comprehensive test suite',
            'Implement test-driven development practices',
            'Set up automated testing pipeline'
          ]
        });
      }

      // Technical debt recommendations
      if (codeQuality.technicalDebt > 30) {
        recommendations.push({
          type: 'codeQuality',
          priority: 'medium',
          reason: `Technical debt estimated at ${codeQuality.technicalDebt} hours`,
          estimatedImpact: 70,
          confidence: 0.6,
          suggestedActions: [
            'Schedule refactoring sessions',
            'Address code smells and anti-patterns',
            'Modernize old-world code components'
          ]
        });
      }

      // AI Document overdue recommendations
      if (daysSinceLastAIDocument > 30) {
        recommendations.push({
          type: 'knowledgeExtension',
          priority: daysSinceLastAIDocument > 90 ? 'high' : 'medium',
          reason: `No AI Document updates applied in ${Math.round(daysSinceLastAIDocument)} days`,
          estimatedImpact: 50,
          confidence: 0.5,
          suggestedActions: [
            'Review and apply framework updates',
            'Update dependencies and libraries',
            'Implement new best practices'
          ]
        });
      }

      return {
        dependencyUpdatesAvailable: 0, // Would need package analysis
        securityVulnerabilities: 0,    // Would need security scan
        performanceBottlenecks: codeQuality.cyclomaticComplexity > 10 ? ['High complexity functions'] : [],
        codeSmells: codeQuality.duplicateCode > 15 ? ['Code duplication detected'] : [],
        lastAIDocumentDate,
        aiDocumentRecommendations: recommendations
      };
    } catch (error) {
      log('Failed to identify AI Document signals', 'error', { repository, userId, error });
      return {
        dependencyUpdatesAvailable: 0,
        securityVulnerabilities: 0,
        performanceBottlenecks: [],
        codeSmells: [],
        lastAIDocumentDate: null,
        aiDocumentRecommendations: []
      };
    }
  }

  /**
   * Store health metrics in database
   */
  private async storeHealthMetrics(metrics: RepositoryHealthMetrics): Promise<void> {
    try {
      await supabaseAdmin
        .from('repository_health_metrics')
        .insert({
          repository: metrics.repository,
          user_id: metrics.userId,
          code_quality_metrics: metrics.codeQuality,
          activity_metrics: metrics.activity,
        ai_document_signals: metrics.aiDocumentSignals,
          created_at: metrics.timestamp
        });
    } catch (error) {
      log('Failed to store health metrics', 'error', { 
        repository: metrics.repository, 
        userId: metrics.userId, 
        error 
      });
    }
  }

  /**
   * Check for health alerts and create notifications
   */
  private async checkHealthAlerts(metrics: RepositoryHealthMetrics): Promise<void> {
    const alerts: HealthAlert[] = [];

    // Code quality decline alert
    if (metrics.codeQuality.overall < this.alertThresholds.codeQuality) {
      alerts.push({
        id: `quality_${Date.now()}`,
        repository: metrics.repository,
        userId: metrics.userId,
        alertType: 'quality_decline',
        severity: metrics.codeQuality.overall < 40 ? 'high' : 'medium',
        message: `Code quality has declined to ${metrics.codeQuality.overall}%`,
        recommendations: metrics.aiDocumentSignals.aiDocumentRecommendations.filter(r => r.type === 'codeQuality'),
        createdAt: new Date().toISOString(),
        status: 'active'
      });
    }

    // Test coverage alert
    if (metrics.codeQuality.testCoverage < this.alertThresholds.testCoverage) {
      alerts.push({
        id: `coverage_${Date.now()}`,
        repository: metrics.repository,
        userId: metrics.userId,
        alertType: 'quality_decline',
        severity: 'medium',
        message: `Test coverage has dropped to ${metrics.codeQuality.testCoverage}%`,
        recommendations: metrics.aiDocumentSignals.aiDocumentRecommendations.filter(r => 
          r.suggestedActions.some(action => action.includes('test'))
        ),
        createdAt: new Date().toISOString(),
        status: 'active'
      });
    }

    // Technical debt alert
    if (metrics.codeQuality.technicalDebt > this.alertThresholds.technicalDebt) {
      alerts.push({
        id: `debt_${Date.now()}`,
        repository: metrics.repository,
        userId: metrics.userId,
        alertType: 'quality_decline',
        severity: 'medium',
        message: `Technical debt has reached ${metrics.codeQuality.technicalDebt} hours`,
        recommendations: metrics.aiDocumentSignals.aiDocumentRecommendations.filter(r => 
          r.reason.includes('debt') || r.reason.includes('refactor')
        ),
        createdAt: new Date().toISOString(),
        status: 'active'
      });
    }

    // AI Document overdue alert
    if (metrics.aiDocumentSignals.lastAIDocumentDate) {
      const daysSince = (Date.now() - new Date(metrics.aiDocumentSignals.lastAIDocumentDate).getTime()) / (1000 * 60 * 60 * 24);
      if (daysSince > this.alertThresholds.aiDocumentOverdue) {
        alerts.push({
          id: `overdue_${Date.now()}`,
          repository: metrics.repository,
          userId: metrics.userId,
          alertType: 'ai_document_overdue',
          severity: daysSince > 90 ? 'high' : 'medium',
          message: `Repository hasn't been updated via AI Documents in ${Math.round(daysSince)} days`,
          recommendations: metrics.aiDocumentSignals.aiDocumentRecommendations,
          createdAt: new Date().toISOString(),
          status: 'active'
        });
      }
    }

    // Store alerts
    for (const alert of alerts) {
      try {
        await supabaseAdmin
          .from('repository_health_alerts')
          .insert({
            id: alert.id,
            repository: alert.repository,
            user_id: alert.userId,
            alert_type: alert.alertType,
            severity: alert.severity,
            message: alert.message,
            recommendations: alert.recommendations,
            status: alert.status,
            created_at: alert.createdAt
          });

        log('Health alert created', 'warn', {
          alertId: alert.id,
          repository: alert.repository,
          severity: alert.severity,
          message: alert.message
        });
      } catch (error) {
        log('Failed to store health alert', 'error', { alert, error });
      }
    }
  }
}

/**
 * Get repository health trends
 */
export async function getRepositoryHealthTrends(
  repository: string,
  userId: string,
  days: number = 30
): Promise<{
  qualityTrend: 'improving' | 'stable' | 'declining';
  averageQuality: number;
  alertCount: number;
  recommendations: AIDocumentRecommendation[];
}> {
  try {
    const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

    // Get health metrics history
    const { data: metrics } = await supabaseAdmin
      .from('repository_health_metrics')
      .select('code_quality_metrics, ai_document_signals, created_at')
      .eq('repository', repository)
      .eq('user_id', userId)
      .gte('created_at', cutoffDate)
      .order('created_at');

    if (!metrics?.length) {
      return {
        qualityTrend: 'stable',
        averageQuality: 50,
        alertCount: 0,
        recommendations: []
      };
    }

    // Calculate quality trend
    const qualityScores = metrics.map(m => m.code_quality_metrics.overall);
    const averageQuality = qualityScores.reduce((sum, score) => sum + score, 0) / qualityScores.length;
    
    const recentQuality = qualityScores.slice(-5).reduce((sum, score) => sum + score, 0) / Math.min(5, qualityScores.length);
    const olderQuality = qualityScores.slice(0, -5).reduce((sum, score) => sum + score, 0) / Math.max(1, qualityScores.length - 5);
    
    let qualityTrend: 'improving' | 'stable' | 'declining' = 'stable';
    if (recentQuality > olderQuality + 5) {
      qualityTrend = 'improving';
    } else if (recentQuality < olderQuality - 5) {
      qualityTrend = 'declining';
    }

    // Get active alerts
    const { data: alerts } = await supabaseAdmin
      .from('repository_health_alerts')
      .select('id')
      .eq('repository', repository)
      .eq('user_id', userId)
      .eq('status', 'active');

    // Get latest recommendations
    const latestMetric = metrics[metrics.length - 1];
    const recommendations = latestMetric.ai_document_signals?.aiDocumentRecommendations || [];

    return {
      qualityTrend,
      averageQuality: Math.round(averageQuality),
      alertCount: alerts?.length || 0,
      recommendations
    };
  } catch (error) {
    log('Failed to get repository health trends', 'error', { repository, userId, error });
    return {
      qualityTrend: 'stable',
      averageQuality: 50,
      alertCount: 0,
      recommendations: []
    };
  }
}

// Export the monitor
export const repositoryHealthMonitor = new RepositoryHealthMonitor();
