/**
 * PRODUCTION-GRADE MONITORING AND OBSERVABILITY SYSTEM
 * 
 * Comprehensive monitoring, metrics collection, and observability
 * for the procurement marketplace system.
 */

import { log } from '@bitcode/logger';
import { telemetry } from '@bitcode/observability';
import { supabaseAdmin } from '@bitcode/supabase';

export interface MetricData {
  name: string;
  value: number;
  unit: 'count' | 'milliseconds' | 'bytes' | 'percentage' | 'rate';
  tags: Record<string, string>;
  timestamp: string;
}

export interface PerformanceMetrics {
  operationName: string;
  duration: number;
  success: boolean;
  errorCode?: string;
  correlationId: string;
  metadata: Record<string, any>;
}

export interface BusinessMetrics {
  totalRequests: number;
  activeRequests: number;
  completedRequests: number;
  totalProposals: number;
  acceptedProposals: number;
  averageCompletionTime: number;
  totalCreditsTransferred: number;
  averageQualityScore: number;
  topContributors: Array<{
    userId: string;
    completedProjects: number;
    averageRating: number;
    totalEarnings: number;
  }>;
}

export interface SystemMetrics {
  databaseConnections: number;
  circuitBreakerStatus: Record<string, any>;
  errorRate: number;
  latencyPercentiles: {
    p50: number;
    p95: number;
    p99: number;
  };
  throughput: number;
}

export class ProcurementMonitoring {
  private static readonly METRIC_BUFFER_SIZE = 1000;
  private static metricBuffer: MetricData[] = [];
  private static performanceBuffer: PerformanceMetrics[] = [];

  /**
   * Record a custom metric
   */
  static recordMetric(
    name: string,
    value: number,
    unit: MetricData['unit'],
    tags: Record<string, string> = {}
  ): void {
    const metric: MetricData = {
      name,
      value,
      unit,
      tags: {
        service: 'procurement',
        ...tags
      },
      timestamp: new Date().toISOString()
    };

    this.metricBuffer.push(metric);
    
    // Flush buffer if it's getting full
    if (this.metricBuffer.length >= this.METRIC_BUFFER_SIZE) {
      this.flushMetrics().catch(error => {
        log('Failed to flush metrics buffer', 'warn', { error: error.message });
      });
    }

    // Also send to telemetry for real-time monitoring
    telemetry.recordEvent('procurement_metric', {
      metricName: name,
      value,
      unit,
      tags
    });
  }

  /**
   * Record performance metrics for an operation
   */
  static recordPerformance(metrics: PerformanceMetrics): void {
    this.performanceBuffer.push(metrics);

    // Record key performance metrics
    this.recordMetric(`operation.${metrics.operationName}.duration`, metrics.duration, 'milliseconds', {
      success: metrics.success.toString(),
      errorCode: metrics.errorCode || 'none'
    });

    this.recordMetric(`operation.${metrics.operationName}.count`, 1, 'count', {
      success: metrics.success.toString(),
      errorCode: metrics.errorCode || 'none'
    });

    // Log performance data
    log('Operation performance recorded', 'debug', {
      operation: metrics.operationName,
      duration: metrics.duration,
      success: metrics.success,
      correlationId: metrics.correlationId
    });
  }

  /**
   * Record business event metrics
   */
  static recordBusinessEvent(
    eventType: 'request_created' | 'proposal_submitted' | 'proposal_accepted' | 'project_completed' | 'credit_payout',
    metadata: Record<string, any> = {}
  ): void {
    this.recordMetric(`business.${eventType}`, 1, 'count', {
      category: metadata.category || 'unknown',
      priority: metadata.priority || 'medium'
    });

    telemetry.recordEvent(`procurement_business_${eventType}`, metadata);

    log('Business event recorded', 'info', {
      eventType,
      metadata
    });
  }

  /**
   * Get comprehensive business metrics
   */
  static async getBusinessMetrics(timeRangeHours: number = 24): Promise<BusinessMetrics> {
    const since = new Date(Date.now() - timeRangeHours * 60 * 60 * 1000).toISOString();

    try {
      // Get request metrics
      const { data: requestStats } = await supabaseAdmin
        .rpc('get_procurement_request_stats', { since_timestamp: since });

      // Get proposal metrics
      const { data: proposalStats } = await supabaseAdmin
        .rpc('get_procurement_proposal_stats', { since_timestamp: since });

      // Get completion metrics
      const { data: completionStats } = await supabaseAdmin
        .rpc('get_procurement_completion_stats', { since_timestamp: since });

      // Get top contributors
      const { data: topContributors } = await supabaseAdmin
        .rpc('get_top_procurement_contributors', { limit_count: 10 });

      const metrics: BusinessMetrics = {
        totalRequests: requestStats?.[0]?.total_requests || 0,
        activeRequests: requestStats?.[0]?.active_requests || 0,
        completedRequests: requestStats?.[0]?.completed_requests || 0,
        totalProposals: proposalStats?.[0]?.total_proposals || 0,
        acceptedProposals: proposalStats?.[0]?.accepted_proposals || 0,
        averageCompletionTime: completionStats?.[0]?.avg_completion_hours || 0,
        totalCreditsTransferred: completionStats?.[0]?.total_credits_paid || 0,
        averageQualityScore: completionStats?.[0]?.avg_quality_score || 0,
        topContributors: topContributors || []
      };

      // Record these as metrics for historical tracking
      Object.entries(metrics).forEach(([key, value]) => {
        if (typeof value === 'number') {
          this.recordMetric(`business.${key}`, value, 'count');
        }
      });

      return metrics;

    } catch (error) {
      log('Failed to get business metrics', 'error', { error: error instanceof Error ? error.message : String(error) });
      
      // Return default metrics on error
      return {
        totalRequests: 0,
        activeRequests: 0,
        completedRequests: 0,
        totalProposals: 0,
        acceptedProposals: 0,
        averageCompletionTime: 0,
        totalCreditsTransferred: 0,
        averageQualityScore: 0,
        topContributors: []
      };
    }
  }

  /**
   * Get system health metrics
   */
  static async getSystemMetrics(): Promise<SystemMetrics> {
    try {
      // Calculate error rate from recent performance data
      const recentPerformance = this.performanceBuffer.slice(-100);
      const errorRate = recentPerformance.length > 0 
        ? recentPerformance.filter(p => !p.success).length / recentPerformance.length 
        : 0;

      // Calculate latency percentiles
      const durations = recentPerformance.map(p => p.duration).sort((a, b) => a - b);
      const latencyPercentiles = {
        p50: this.getPercentile(durations, 50),
        p95: this.getPercentile(durations, 95),
        p99: this.getPercentile(durations, 99)
      };

      // Calculate throughput (operations per minute)
      const oneMinuteAgo = Date.now() - 60000;
      const recentOperations = this.performanceBuffer.filter(
        p => new Date(p.metadata.timestamp || 0).getTime() > oneMinuteAgo
      );
      const throughput = recentOperations.length;

      const metrics: SystemMetrics = {
        databaseConnections: await this.getDatabaseConnectionCount(),
        circuitBreakerStatus: await this.getCircuitBreakerStatus(),
        errorRate: errorRate * 100, // Convert to percentage
        latencyPercentiles,
        throughput
      };

      // Record system metrics
      this.recordMetric('system.error_rate', metrics.errorRate, 'percentage');
      this.recordMetric('system.latency.p50', metrics.latencyPercentiles.p50, 'milliseconds');
      this.recordMetric('system.latency.p95', metrics.latencyPercentiles.p95, 'milliseconds');
      this.recordMetric('system.latency.p99', metrics.latencyPercentiles.p99, 'milliseconds');
      this.recordMetric('system.throughput', metrics.throughput, 'rate');

      return metrics;

    } catch (error) {
      log('Failed to get system metrics', 'error', { error: error instanceof Error ? error.message : String(error) });
      
      return {
        databaseConnections: 0,
        circuitBreakerStatus: {},
        errorRate: 0,
        latencyPercentiles: { p50: 0, p95: 0, p99: 0 },
        throughput: 0
      };
    }
  }

  /**
   * Generate comprehensive monitoring dashboard data
   */
  static async getDashboardData(timeRangeHours: number = 24): Promise<{
    businessMetrics: BusinessMetrics;
    systemMetrics: SystemMetrics;
    alerts: Array<{
      level: 'info' | 'warning' | 'critical';
      message: string;
      timestamp: string;
    }>;
    trends: Record<string, Array<{ timestamp: string; value: number }>>;
  }> {
    const [businessMetrics, systemMetrics] = await Promise.all([
      this.getBusinessMetrics(timeRangeHours),
      this.getSystemMetrics()
    ]);

    const alerts = this.generateAlerts(businessMetrics, systemMetrics);
    const trends = await this.getTrends(timeRangeHours);

    return {
      businessMetrics,
      systemMetrics,
      alerts,
      trends
    };
  }

  /**
   * Performance measurement decorator
   */
  static measurePerformance(operationName: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      const originalMethod = descriptor.value;

      descriptor.value = async function (...args: any[]) {
        const correlationId = `${operationName}_${Date.now()}_${Math.random().toString(36).slice(2)}`;
        const startTime = Date.now();
        let success = true;
        let errorCode: string | undefined;

        try {
          const result = await originalMethod.apply(this, args);
          return result;
        } catch (error) {
          success = false;
          errorCode = error instanceof Error ? error.constructor.name : 'UnknownError';
          throw error;
        } finally {
          const duration = Date.now() - startTime;
          
          ProcurementMonitoring.recordPerformance({
            operationName,
            duration,
            success,
            errorCode,
            correlationId,
            metadata: {
              timestamp: new Date().toISOString(),
              args: args.length
            }
          });
        }
      };

      return descriptor;
    };
  }

  /**
   * Flush metrics buffer to storage
   */
  private static async flushMetrics(): Promise<void> {
    if (this.metricBuffer.length === 0) return;

    const metricsToFlush = [...this.metricBuffer];
    this.metricBuffer = [];

    try {
      // Store metrics in database for historical analysis
      const insertData = metricsToFlush.map(metric => ({
        metric_name: metric.name,
        metric_value: metric.value,
        metric_unit: metric.unit,
        tags: metric.tags,
        recorded_at: metric.timestamp
      }));

      await supabaseAdmin
        .from('procurement_metrics')
        .insert(insertData);

      log('Metrics buffer flushed successfully', 'debug', {
        metricCount: metricsToFlush.length
      });

    } catch (error) {
      log('Failed to flush metrics to database', 'error', {
        error: error instanceof Error ? error.message : String(error),
        metricCount: metricsToFlush.length
      });

      // Put metrics back in buffer to retry later
      this.metricBuffer.unshift(...metricsToFlush);
    }
  }

  /**
   * Get percentile value from sorted array
   */
  private static getPercentile(sortedArray: number[], percentile: number): number {
    if (sortedArray.length === 0) return 0;
    
    const index = Math.ceil((percentile / 100) * sortedArray.length) - 1;
    return sortedArray[Math.max(0, Math.min(index, sortedArray.length - 1))];
  }

  /**
   * Get database connection count (placeholder)
   */
  private static async getDatabaseConnectionCount(): Promise<number> {
    // This would typically query the database for active connections
    // For now, return a placeholder value
    return 10;
  }

  /**
   * Get circuit breaker status
   */
  private static async getCircuitBreakerStatus(): Promise<Record<string, any>> {
    // This would integrate with the error handling system
    // For now, return placeholder status
    return {
      'procurement-matching': { state: 'closed', failures: 0 },
      'btd-share-settlement': { state: 'closed', failures: 0 },
      'notifications': { state: 'closed', failures: 0 }
    };
  }

  /**
   * Generate alerts based on metrics
   */
  private static generateAlerts(
    businessMetrics: BusinessMetrics,
    systemMetrics: SystemMetrics
  ): Array<{ level: 'info' | 'warning' | 'critical'; message: string; timestamp: string }> {
    const alerts: Array<{ level: 'info' | 'warning' | 'critical'; message: string; timestamp: string }> = [];
    const timestamp = new Date().toISOString();

    // System health alerts
    if (systemMetrics.errorRate > 10) {
      alerts.push({
        level: 'critical',
        message: `High error rate detected: ${systemMetrics.errorRate.toFixed(1)}%`,
        timestamp
      });
    } else if (systemMetrics.errorRate > 5) {
      alerts.push({
        level: 'warning',
        message: `Elevated error rate: ${systemMetrics.errorRate.toFixed(1)}%`,
        timestamp
      });
    }

    if (systemMetrics.latencyPercentiles.p95 > 5000) {
      alerts.push({
        level: 'warning',
        message: `High P95 latency: ${systemMetrics.latencyPercentiles.p95}ms`,
        timestamp
      });
    }

    // Business alerts
    if (businessMetrics.averageQualityScore < 3.0 && businessMetrics.completedRequests > 0) {
      alerts.push({
        level: 'warning',
        message: `Low average quality score: ${businessMetrics.averageQualityScore.toFixed(1)}/5.0`,
        timestamp
      });
    }

    const acceptanceRate = businessMetrics.totalProposals > 0 
      ? (businessMetrics.acceptedProposals / businessMetrics.totalProposals) * 100 
      : 0;

    if (acceptanceRate < 10 && businessMetrics.totalProposals > 10) {
      alerts.push({
        level: 'warning',
        message: `Low proposal acceptance rate: ${acceptanceRate.toFixed(1)}%`,
        timestamp
      });
    }

    // No alerts is good news
    if (alerts.length === 0) {
      alerts.push({
        level: 'info',
        message: 'All systems operating normally',
        timestamp
      });
    }

    return alerts;
  }

  /**
   * Get trending data for charts
   */
  private static async getTrends(timeRangeHours: number): Promise<Record<string, Array<{ timestamp: string; value: number }>>> {
    try {
      const since = new Date(Date.now() - timeRangeHours * 60 * 60 * 1000).toISOString();

      const { data: trends } = await supabaseAdmin
        .rpc('get_procurement_metrics_trends', { 
          since_timestamp: since,
          bucket_minutes: Math.max(60, timeRangeHours * 2) // Adjust bucket size based on time range
        });

      return trends || {};

    } catch (error) {
      log('Failed to get trends data', 'error', { error: error instanceof Error ? error.message : String(error) });
      return {};
    }
  }

  /**
   * Start monitoring background tasks
   */
  static startMonitoring(): void {
    // Flush metrics buffer every 5 minutes
    setInterval(() => {
      this.flushMetrics().catch(error => {
        log('Background metrics flush failed', 'warn', { error: error.message });
      });
    }, 5 * 60 * 1000);

    // Clean old performance buffer every 10 minutes
    setInterval(() => {
      // Keep only last 1000 entries
      if (this.performanceBuffer.length > 1000) {
        this.performanceBuffer = this.performanceBuffer.slice(-1000);
      }
    }, 10 * 60 * 1000);

    log('Procurement monitoring started', 'info');
  }

  /**
   * Stop monitoring and flush remaining data
   */
  static async stopMonitoring(): Promise<void> {
    await this.flushMetrics();
    log('Procurement monitoring stopped', 'info');
  }
}

/**
 * Initialize monitoring on module load
 */
if (typeof window === 'undefined') {
  // Only start monitoring in server environment
  ProcurementMonitoring.startMonitoring();
}
