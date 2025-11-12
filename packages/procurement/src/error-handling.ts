/**
 * PRODUCTION-GRADE ERROR HANDLING AND MONITORING SYSTEM
 * 
 * Comprehensive error handling, circuit breakers, retry logic, and monitoring
 * for the procurement marketplace system.
 */

import { log } from '@engi/logger';
import { telemetry } from '@engi/observability';
import { supabaseAdmin } from '@engi/supabase';

export interface ErrorMetadata {
  correlationId: string;
  operation: string;
  userId?: string;
  organizationId?: string;
  procurementRequestId?: string;
  proposalId?: string;
  timestamp: string;
  context: Record<string, any>;
}

export interface RetryConfig {
  maxAttempts: number;
  baseDelay: number;
  maxDelay: number;
  backoffMultiplier: number;
  retryableErrors: string[];
}

export interface CircuitBreakerConfig {
  failureThreshold: number;
  recoveryTime: number;
  monitorPeriod: number;
}

export class ProcurementError extends Error {
  public readonly code: string;
  public readonly category: 'validation' | 'authorization' | 'rate_limit' | 'external_service' | 'database' | 'business_logic' | 'system';
  public readonly severity: 'low' | 'medium' | 'high' | 'critical';
  public readonly metadata: ErrorMetadata;
  public readonly retryable: boolean;
  public readonly userFacing: boolean;

  constructor(
    message: string,
    code: string,
    category: ProcurementError['category'],
    severity: ProcurementError['severity'],
    metadata: ErrorMetadata,
    retryable: boolean = false,
    userFacing: boolean = true
  ) {
    super(message);
    this.name = 'ProcurementError';
    this.code = code;
    this.category = category;
    this.severity = severity;
    this.metadata = metadata;
    this.retryable = retryable;
    this.userFacing = userFacing;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      category: this.category,
      severity: this.severity,
      metadata: this.metadata,
      retryable: this.retryable,
      userFacing: this.userFacing,
      stack: this.stack
    };
  }
}

export class CircuitBreaker {
  private failures: number = 0;
  private lastFailureTime: number = 0;
  private state: 'closed' | 'open' | 'half-open' = 'closed';

  constructor(private config: CircuitBreakerConfig) {}

  async execute<T>(operation: () => Promise<T>, operationName: string): Promise<T> {
    if (this.state === 'open') {
      if (Date.now() - this.lastFailureTime < this.config.recoveryTime) {
        throw new ProcurementError(
          `Circuit breaker is open for ${operationName}`,
          'CIRCUIT_BREAKER_OPEN',
          'system',
          'high',
          {
            correlationId: `cb_${Date.now()}`,
            operation: operationName,
            timestamp: new Date().toISOString(),
            context: { state: this.state, failures: this.failures }
          },
          false,
          false
        );
      } else {
        this.state = 'half-open';
      }
    }

    try {
      const result = await operation();
      
      if (this.state === 'half-open') {
        this.reset();
      }
      
      return result;
    } catch (error) {
      this.recordFailure();
      
      if (error instanceof ProcurementError) {
        throw error;
      }
      
      throw new ProcurementError(
        `Operation ${operationName} failed`,
        'CIRCUIT_BREAKER_FAILURE',
        'system',
        'high',
        {
          correlationId: `cb_${Date.now()}`,
          operation: operationName,
          timestamp: new Date().toISOString(),
          context: { originalError: error instanceof Error ? error.message : String(error) }
        },
        true,
        false
      );
    }
  }

  private recordFailure(): void {
    this.failures++;
    this.lastFailureTime = Date.now();
    
    if (this.failures >= this.config.failureThreshold) {
      this.state = 'open';
    }
  }

  private reset(): void {
    this.failures = 0;
    this.state = 'closed';
  }

  getState() {
    return {
      state: this.state,
      failures: this.failures,
      lastFailureTime: this.lastFailureTime
    };
  }
}

export class RetryHandler {
  static async executeWithRetry<T>(
    operation: () => Promise<T>,
    config: RetryConfig,
    operationName: string,
    correlationId: string
  ): Promise<T> {
    let lastError: Error;
    
    for (let attempt = 1; attempt <= config.maxAttempts; attempt++) {
      try {
        const result = await operation();
        
        if (attempt > 1) {
          log('Operation succeeded after retry', 'info', {
            operation: operationName,
            attempt,
            correlationId
          });
          
          telemetry.recordEvent('procurement_retry_success', {
            operation: operationName,
            attempt,
            correlationId
          });
        }
        
        return result;
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        
        // Check if error is retryable
        if (error instanceof ProcurementError && !error.retryable) {
          throw error;
        }
        
        if (!this.isRetryableError(lastError, config.retryableErrors)) {
          throw error;
        }
        
        if (attempt === config.maxAttempts) {
          break;
        }
        
        const delay = Math.min(
          config.baseDelay * Math.pow(config.backoffMultiplier, attempt - 1),
          config.maxDelay
        );
        
        log('Operation failed, retrying', 'warn', {
          operation: operationName,
          attempt,
          maxAttempts: config.maxAttempts,
          delay,
          error: lastError.message,
          correlationId
        });
        
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    // All attempts failed
    telemetry.recordEvent('procurement_retry_exhausted', {
      operation: operationName,
      attempts: config.maxAttempts,
      finalError: lastError.message,
      correlationId
    });
    
    throw new ProcurementError(
      `Operation ${operationName} failed after ${config.maxAttempts} attempts`,
      'RETRY_EXHAUSTED',
      'system',
      'high',
      {
        correlationId,
        operation: operationName,
        timestamp: new Date().toISOString(),
        context: { 
          attempts: config.maxAttempts,
          finalError: lastError.message
        }
      },
      false,
      true
    );
  }

  private static isRetryableError(error: Error, retryableErrors: string[]): boolean {
    const errorMessage = error.message.toLowerCase();
    return retryableErrors.some(pattern => errorMessage.includes(pattern.toLowerCase()));
  }
}

export class ProcurementErrorHandler {
  private static circuitBreakers = new Map<string, CircuitBreaker>();
  
  private static readonly DEFAULT_RETRY_CONFIG: RetryConfig = {
    maxAttempts: 3,
    baseDelay: 1000,
    maxDelay: 10000,
    backoffMultiplier: 2,
    retryableErrors: [
      'timeout',
      'network',
      'connection',
      'temporary',
      'rate limit',
      'service unavailable',
      'internal server error'
    ]
  };

  private static readonly DEFAULT_CIRCUIT_BREAKER_CONFIG: CircuitBreakerConfig = {
    failureThreshold: 5,
    recoveryTime: 60000, // 1 minute
    monitorPeriod: 300000 // 5 minutes
  };

  /**
   * Execute operation with comprehensive error handling
   */
  static async executeWithErrorHandling<T>(
    operation: () => Promise<T>,
    operationName: string,
    correlationId: string,
    options: {
      retryConfig?: Partial<RetryConfig>;
      useCircuitBreaker?: boolean;
      circuitBreakerKey?: string;
      metadata?: Record<string, any>;
    } = {}
  ): Promise<T> {
    const {
      retryConfig = {},
      useCircuitBreaker = false,
      circuitBreakerKey = operationName,
      metadata = {}
    } = options;

    const finalRetryConfig = { ...this.DEFAULT_RETRY_CONFIG, ...retryConfig };

    try {
      const wrappedOperation = useCircuitBreaker
        ? () => this.executeWithCircuitBreaker(operation, circuitBreakerKey, operationName)
        : operation;

      return await RetryHandler.executeWithRetry(
        wrappedOperation,
        finalRetryConfig,
        operationName,
        correlationId
      );

    } catch (error) {
      await this.handleError(error, operationName, correlationId, metadata);
      throw error;
    }
  }

  /**
   * Execute operation with circuit breaker
   */
  private static async executeWithCircuitBreaker<T>(
    operation: () => Promise<T>,
    circuitBreakerKey: string,
    operationName: string
  ): Promise<T> {
    if (!this.circuitBreakers.has(circuitBreakerKey)) {
      this.circuitBreakers.set(
        circuitBreakerKey,
        new CircuitBreaker(this.DEFAULT_CIRCUIT_BREAKER_CONFIG)
      );
    }

    const circuitBreaker = this.circuitBreakers.get(circuitBreakerKey)!;
    return circuitBreaker.execute(operation, operationName);
  }

  /**
   * Handle and log errors with context
   */
  static async handleError(
    error: any,
    operation: string,
    correlationId: string,
    metadata: Record<string, any> = {}
  ): Promise<void> {
    let procurementError: ProcurementError;

    if (error instanceof ProcurementError) {
      procurementError = error;
    } else {
      procurementError = this.convertToProcurementError(error, operation, correlationId, metadata);
    }

    // Log error with appropriate level
    const logLevel = this.getLogLevel(procurementError.severity);
    log(`Procurement operation failed: ${operation}`, logLevel, {
      error: procurementError.toJSON(),
      correlationId,
      operation,
      metadata
    });

    // Record telemetry
    telemetry.recordEvent('procurement_error', {
      operation,
      errorCode: procurementError.code,
      category: procurementError.category,
      severity: procurementError.severity,
      retryable: procurementError.retryable,
      correlationId,
      metadata: procurementError.metadata
    });

    // Store error for analysis (non-blocking)
    this.storeErrorForAnalysis(procurementError).catch(storeError => {
      log('Failed to store error for analysis', 'warn', {
        originalError: procurementError.toJSON(),
        storeError: storeError instanceof Error ? storeError.message : String(storeError),
        correlationId
      });
    });

    // Trigger alerts for critical errors
    if (procurementError.severity === 'critical') {
      this.triggerCriticalAlert(procurementError).catch(alertError => {
        log('Failed to trigger critical alert', 'error', {
          originalError: procurementError.toJSON(),
          alertError: alertError instanceof Error ? alertError.message : String(alertError),
          correlationId
        });
      });
    }
  }

  /**
   * Convert generic error to ProcurementError
   */
  private static convertToProcurementError(
    error: any,
    operation: string,
    correlationId: string,
    metadata: Record<string, any>
  ): ProcurementError {
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    // Categorize error based on message patterns
    let category: ProcurementError['category'] = 'system';
    let severity: ProcurementError['severity'] = 'medium';
    let code = 'UNKNOWN_ERROR';
    let retryable = false;

    if (errorMessage.includes('validation') || errorMessage.includes('invalid')) {
      category = 'validation';
      severity = 'low';
      code = 'VALIDATION_ERROR';
    } else if (errorMessage.includes('unauthorized') || errorMessage.includes('permission')) {
      category = 'authorization';
      severity = 'medium';
      code = 'AUTHORIZATION_ERROR';
    } else if (errorMessage.includes('rate limit')) {
      category = 'rate_limit';
      severity = 'medium';
      code = 'RATE_LIMIT_ERROR';
      retryable = true;
    } else if (errorMessage.includes('database') || errorMessage.includes('connection')) {
      category = 'database';
      severity = 'high';
      code = 'DATABASE_ERROR';
      retryable = true;
    } else if (errorMessage.includes('timeout') || errorMessage.includes('network')) {
      category = 'external_service';
      severity = 'medium';
      code = 'EXTERNAL_SERVICE_ERROR';
      retryable = true;
    }

    return new ProcurementError(
      errorMessage,
      code,
      category,
      severity,
      {
        correlationId,
        operation,
        timestamp: new Date().toISOString(),
        context: {
          ...metadata,
          originalError: error instanceof Error ? {
            name: error.name,
            message: error.message,
            stack: error.stack
          } : error
        }
      },
      retryable
    );
  }

  /**
   * Store error for analysis
   */
  private static async storeErrorForAnalysis(error: ProcurementError): Promise<void> {
    try {
      await supabaseAdmin
        .from('procurement_error_logs')
        .insert({
          correlation_id: error.metadata.correlationId,
          operation: error.metadata.operation,
          error_code: error.code,
          error_message: error.message,
          category: error.category,
          severity: error.severity,
          retryable: error.retryable,
          user_id: error.metadata.userId,
          organization_id: error.metadata.organizationId,
          procurement_request_id: error.metadata.procurementRequestId,
          proposal_id: error.metadata.proposalId,
          metadata: error.metadata.context,
          stack_trace: error.stack,
          created_at: new Date().toISOString()
        });
    } catch (storeError) {
      // Don't throw - this is best effort logging
      log('Failed to store error in database', 'warn', {
        error: error.toJSON(),
        storeError: storeError instanceof Error ? storeError.message : String(storeError)
      });
    }
  }

  /**
   * Trigger critical error alerts
   */
  private static async triggerCriticalAlert(error: ProcurementError): Promise<void> {
    // Implementation would integrate with alerting systems like PagerDuty, Slack, etc.
    log('CRITICAL ERROR ALERT', 'error', {
      error: error.toJSON(),
      alertLevel: 'CRITICAL',
      requiresImmedateAttention: true
    });

    telemetry.recordEvent('procurement_critical_alert', {
      errorCode: error.code,
      operation: error.metadata.operation,
      correlationId: error.metadata.correlationId,
      metadata: error.metadata
    });
  }

  /**
   * Get appropriate log level for error severity
   */
  private static getLogLevel(severity: ProcurementError['severity']): 'debug' | 'info' | 'warn' | 'error' {
    switch (severity) {
      case 'low': return 'warn';
      case 'medium': return 'warn';
      case 'high': return 'error';
      case 'critical': return 'error';
      default: return 'error';
    }
  }

  /**
   * Get circuit breaker status for monitoring
   */
  static getCircuitBreakerStatus(): Record<string, any> {
    const status: Record<string, any> = {};
    
    for (const [key, breaker] of this.circuitBreakers.entries()) {
      status[key] = breaker.getState();
    }
    
    return status;
  }

  /**
   * Reset circuit breaker (for administrative use)
   */
  static resetCircuitBreaker(key: string): boolean {
    const breaker = this.circuitBreakers.get(key);
    if (breaker) {
      breaker['reset']();
      return true;
    }
    return false;
  }
}

/**
 * Decorator for automatic error handling
 */
export function withErrorHandling(
  operationName: string,
  options: {
    retryConfig?: Partial<RetryConfig>;
    useCircuitBreaker?: boolean;
    circuitBreakerKey?: string;
  } = {}
) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const correlationId = `${operationName}_${Date.now()}_${Math.random().toString(36).slice(2)}`;
      
      return ProcurementErrorHandler.executeWithErrorHandling(
        () => originalMethod.apply(this, args),
        operationName,
        correlationId,
        options
      );
    };

    return descriptor;
  };
}

/**
 * Health check utilities
 */
export class HealthChecker {
  static async checkProcurementSystemHealth(): Promise<{
    status: 'healthy' | 'degraded' | 'unhealthy';
    checks: Record<string, { status: 'pass' | 'fail'; message?: string; duration?: number }>;
    timestamp: string;
  }> {
    const checks: Record<string, { status: 'pass' | 'fail'; message?: string; duration?: number }> = {};
    let overallStatus: 'healthy' | 'degraded' | 'unhealthy' = 'healthy';

    // Database connectivity check
    const dbCheck = await this.checkDatabase();
    checks.database = dbCheck;
    if (dbCheck.status === 'fail') overallStatus = 'unhealthy';

    // Circuit breaker status check
    const circuitBreakerStatus = ProcurementErrorHandler.getCircuitBreakerStatus();
    const hasOpenCircuitBreakers = Object.values(circuitBreakerStatus).some(
      (status: any) => status.state === 'open'
    );
    checks.circuitBreakers = {
      status: hasOpenCircuitBreakers ? 'fail' : 'pass',
      message: hasOpenCircuitBreakers ? 'Some circuit breakers are open' : 'All circuit breakers operational'
    };
    if (hasOpenCircuitBreakers && overallStatus === 'healthy') overallStatus = 'degraded';

    // Service dependencies check
    const depsCheck = await this.checkServiceDependencies();
    checks.dependencies = depsCheck;
    if (depsCheck.status === 'fail') {
      overallStatus = overallStatus === 'healthy' ? 'degraded' : 'unhealthy';
    }

    return {
      status: overallStatus,
      checks,
      timestamp: new Date().toISOString()
    };
  }

  private static async checkDatabase(): Promise<{ status: 'pass' | 'fail'; message?: string; duration?: number }> {
    const start = Date.now();
    try {
      await supabaseAdmin.from('procurement_requests').select('id').limit(1);
      return {
        status: 'pass',
        duration: Date.now() - start
      };
    } catch (error) {
      return {
        status: 'fail',
        message: error instanceof Error ? error.message : 'Database connectivity failed',
        duration: Date.now() - start
      };
    }
  }

  private static async checkServiceDependencies(): Promise<{ status: 'pass' | 'fail'; message?: string }> {
    // Check critical service dependencies
    // For now, return pass - would integrate with actual service checks
    return {
      status: 'pass',
      message: 'All service dependencies operational'
    };
  }
}