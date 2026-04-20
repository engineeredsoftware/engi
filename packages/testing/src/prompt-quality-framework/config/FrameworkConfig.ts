/**
 * Framework Configuration System
 * 
 * Centralized configuration management for the Prompt Quality Framework,
 * providing production-grade configuration handling, validation, and
 * environment-specific settings for global scale deployment.
 */

import { z } from 'zod';

/**
 * Environment Configuration Schema
 */
export const EnvironmentConfigSchema = z.object({
  environment: z.enum(['development', 'staging', 'production', 'test']).default('development'),
  region: z.string().default('us-east-1'),
  cluster: z.string().optional(),
  datacenter: z.string().optional(),
  
  // Feature flags
  features: z.object({
    enableAdvancedMetrics: z.boolean().default(true),
    enableRealTimeMonitoring: z.boolean().default(false),
    enableDistributedTracing: z.boolean().default(false),
    enableAnomalyDetection: z.boolean().default(true),
    enableExperimentalFeatures: z.boolean().default(false),
  }),
  
  // Logging configuration
  logging: z.object({
    level: z.enum(['trace', 'debug', 'info', 'warn', 'error', 'fatal']).default('info'),
    enableStructuredLogging: z.boolean().default(true),
    enableAuditLogging: z.boolean().default(true),
    logRetentionDays: z.number().default(30),
    enableLogCompression: z.boolean().default(true),
  }),
  
  // Security configuration
  security: z.object({
    enableSecurityValidation: z.boolean().default(true),
    encryptionLevel: z.enum(['none', 'basic', 'advanced']).default('basic'),
    enableAccessControl: z.boolean().default(true),
    sessionTimeoutMs: z.number().default(3600000), // 1 hour
  }),
});

export type EnvironmentConfig = z.infer<typeof EnvironmentConfigSchema>;

/**
 * Performance Configuration Schema
 */
export const PerformanceConfigSchema = z.object({
  // Execution performance
  execution: z.object({
    defaultTimeoutMs: z.number().default(30000),
    maxConcurrency: z.number().default(10),
    batchSize: z.number().default(50),
    retryAttempts: z.number().default(3),
    retryBackoffMs: z.number().default(1000),
  }),
  
  // Memory management
  memory: z.object({
    maxHeapSizeMB: z.number().default(2048),
    gcThresholdMB: z.number().default(1024),
    enableMemoryProfiling: z.boolean().default(false),
    memoryLeakDetection: z.boolean().default(true),
  }),
  
  // Caching configuration
  caching: z.object({
    enableCaching: z.boolean().default(true),
    cacheSize: z.number().default(10000),
    cacheTTLMs: z.number().default(3600000), // 1 hour
    enableDistributedCache: z.boolean().default(false),
    cacheCompressionLevel: z.enum(['none', 'low', 'medium', 'high']).default('medium'),
  }),
  
  // Resource limits
  limits: z.object({
    maxPromptLength: z.number().default(100000),
    maxTokenCount: z.number().default(32000),
    maxFileSize: z.number().default(10485760), // 10 MB
    maxConcurrentTests: z.number().default(100),
    maxTestDuration: z.number().default(600000), // 10 minutes
  }),
});

export type PerformanceConfig = z.infer<typeof PerformanceConfigSchema>;

/**
 * Quality Configuration Schema
 */
export const QualityConfigSchema = z.object({
  // Default quality gates
  defaultGates: z.object({
    relevance: z.number().min(0).max(1).default(0.85),
    completeness: z.number().min(0).max(1).default(0.90),
    clarity: z.number().min(0).max(1).default(0.88),
    toolUtilization: z.number().min(0).max(1).default(0.82),
    consistency: z.number().min(0).max(1).default(0.92),
    performance: z.number().min(0).max(1).default(0.80),
  }),
  
  // Quality assessment configuration
  assessment: z.object({
    enableSemanticAnalysis: z.boolean().default(true),
    confidenceLevel: z.number().default(0.95),
    sampleSize: z.number().default(100),
    enableOutlierDetection: z.boolean().default(true),
    outlierThreshold: z.number().default(1.5), // IQR multiplier
  }),
  
  // Validation configuration
  validation: z.object({
    enableStrictValidation: z.boolean().default(true),
    customRulesEnabled: z.boolean().default(true),
    validationTimeoutMs: z.number().default(10000),
    maxValidationErrors: z.number().default(100),
  }),
  
  // Trend analysis
  trends: z.object({
    enableTrendAnalysis: z.boolean().default(true),
    trendWindowSize: z.number().default(10),
    seasonalityDetection: z.boolean().default(false),
    anomalyDetectionSensitivity: z.enum(['low', 'medium', 'high']).default('medium'),
  }),
});

export type QualityConfig = z.infer<typeof QualityConfigSchema>;

/**
 * Testing Configuration Schema
 */
export const TestingConfigSchema = z.object({
  // Test execution
  execution: z.object({
    defaultStrategy: z.enum(['sequential', 'parallel', 'hybrid']).default('hybrid'),
    enableDryRun: z.boolean().default(false),
    enableWarmup: z.boolean().default(true),
    warmupRuns: z.number().default(5),
    measurementRuns: z.number().default(50),
  }),
  
  // Test data management
  data: z.object({
    enableTestDataGeneration: z.boolean().default(true),
    testDataRetentionDays: z.number().default(90),
    enableDataMocking: z.boolean().default(true),
    mockDataQuality: z.enum(['basic', 'realistic', 'production']).default('realistic'),
  }),
  
  // Reporting configuration
  reporting: z.object({
    enableDetailedReports: z.boolean().default(true),
    reportFormats: z.array(z.enum(['json', 'csv', 'html', 'pdf'])).default(['json', 'html']),
    enableVisualization: z.boolean().default(true),
    reportRetentionDays: z.number().default(365),
  }),
  
  // Integration testing
  integration: z.object({
    enableIntegrationTests: z.boolean().default(true),
    enableCrossAgentTests: z.boolean().default(true),
    enableDataFlowValidation: z.boolean().default(true),
    enableEndToEndTests: z.boolean().default(true),
  }),
});

export type TestingConfig = z.infer<typeof TestingConfigSchema>;

/**
 * Monitoring Configuration Schema
 */
export const MonitoringConfigSchema = z.object({
  // Metrics collection
  metrics: z.object({
    enableMetrics: z.boolean().default(true),
    metricsInterval: z.number().default(60000), // 1 minute
    enableCustomMetrics: z.boolean().default(true),
    metricsRetentionDays: z.number().default(30),
  }),
  
  // Health checks
  health: z.object({
    enableHealthChecks: z.boolean().default(true),
    healthCheckInterval: z.number().default(30000), // 30 seconds
    healthCheckTimeout: z.number().default(5000),
    enableDependencyChecks: z.boolean().default(true),
  }),
  
  // Alerting configuration
  alerting: z.object({
    enableAlerting: z.boolean().default(true),
    alertChannels: z.array(z.enum(['email', 'slack', 'webhook', 'pagerduty'])).default(['email']),
    alertThresholds: z.object({
      errorRate: z.number().default(0.05), // 5% error rate
      latencyP95: z.number().default(10000), // 10 seconds
      memoryUsage: z.number().default(0.8), // 80% memory usage
      qualityDegradation: z.number().default(0.1), // 10% quality drop
    }),
    alertCooldownMs: z.number().default(300000), // 5 minutes
  }),
  
  // Tracing configuration
  tracing: z.object({
    enableTracing: z.boolean().default(false),
    tracingSampleRate: z.number().min(0).max(1).default(0.1), // 10% sampling
    traceRetentionDays: z.number().default(7),
    enableSpanMetrics: z.boolean().default(true),
  }),
});

export type MonitoringConfig = z.infer<typeof MonitoringConfigSchema>;

/**
 * Storage Configuration Schema
 */
export const StorageConfigSchema = z.object({
  // Database configuration
  database: z.object({
    type: z.enum(['sqlite', 'postgresql', 'mysql', 'mongodb']).default('sqlite'),
    connectionString: z.string().optional(),
    poolSize: z.number().default(10),
    connectionTimeout: z.number().default(30000),
    enableMigrations: z.boolean().default(true),
  }),
  
  // File storage configuration
  fileStorage: z.object({
    type: z.enum(['local', 's3', 'gcs', 'azure']).default('local'),
    basePath: z.string().default('./data'),
    enableEncryption: z.boolean().default(false),
    compressionLevel: z.enum(['none', 'low', 'medium', 'high']).default('medium'),
  }),
  
  // Data retention
  retention: z.object({
    testResults: z.number().default(365), // days
    performanceMetrics: z.number().default(90),
    qualityMetrics: z.number().default(180),
    logs: z.number().default(30),
    archives: z.number().default(2555), // 7 years
  }),
  
  // Backup configuration
  backup: z.object({
    enableBackups: z.boolean().default(true),
    backupInterval: z.number().default(86400000), // 24 hours
    backupRetention: z.number().default(30), // days
    enableIncrementalBackups: z.boolean().default(true),
  }),
});

export type StorageConfig = z.infer<typeof StorageConfigSchema>;

/**
 * Complete Framework Configuration Schema
 */
export const FrameworkConfigSchema = z.object({
  // Framework metadata
  version: z.string().default('1.0.0'),
  configVersion: z.string().default('1.0'),
  lastUpdated: z.date().default(() => new Date()),
  
  // Core configuration sections
  environment: EnvironmentConfigSchema.default({}),
  performance: PerformanceConfigSchema.default({}),
  quality: QualityConfigSchema.default({}),
  testing: TestingConfigSchema.default({}),
  monitoring: MonitoringConfigSchema.default({}),
  storage: StorageConfigSchema.default({}),
  
  // Custom configuration
  custom: z.record(z.any()).default({}),
});

export type FrameworkConfig = z.infer<typeof FrameworkConfigSchema>;

/**
 * Configuration Manager
 */
export class ConfigurationManager {
  private config: FrameworkConfig;
  private configPath: string;
  private watchers: Map<string, (config: FrameworkConfig) => void>;

  constructor(configPath?: string) {
    this.configPath = configPath || './config/framework.json';
    this.config = FrameworkConfigSchema.parse({});
    this.watchers = new Map();
  }

  /**
   * Load configuration from file or environment
   */
  async loadConfiguration(): Promise<FrameworkConfig> {
    try {
      // Try to load from file first
      const fileConfig = await this.loadFromFile();
      
      // Override with environment variables
      const envConfig = this.loadFromEnvironment();
      
      // Merge configurations
      const mergedConfig = this.mergeConfigurations(fileConfig, envConfig);
      
      // Validate and parse
      this.config = FrameworkConfigSchema.parse(mergedConfig);
      
      // Notify watchers
      this.notifyWatchers();
      
      return this.config;
    } catch (error) {
      throw new Error(`Failed to load configuration: ${error.message}`);
    }
  }

  /**
   * Save configuration to file
   */
  async saveConfiguration(): Promise<void> {
    try {
      const fs = await import('fs/promises');
      const path = await import('path');
      
      // Ensure directory exists
      const dir = path.dirname(this.configPath);
      await fs.mkdir(dir, { recursive: true });
      
      // Save configuration
      await fs.writeFile(
        this.configPath,
        JSON.stringify(this.config, null, 2),
        'utf-8'
      );
    } catch (error) {
      throw new Error(`Failed to save configuration: ${error.message}`);
    }
  }

  /**
   * Get current configuration
   */
  getConfiguration(): FrameworkConfig {
    return this.config;
  }

  /**
   * Update configuration
   */
  updateConfiguration(updates: Partial<FrameworkConfig>): void {
    const updatedConfig = this.mergeConfigurations(this.config, updates);
    this.config = FrameworkConfigSchema.parse(updatedConfig);
    this.notifyWatchers();
  }

  /**
   * Get environment-specific configuration
   */
  getEnvironmentConfig(): EnvironmentConfig {
    return this.config.environment;
  }

  /**
   * Get performance configuration
   */
  getPerformanceConfig(): PerformanceConfig {
    return this.config.performance;
  }

  /**
   * Get quality configuration
   */
  getQualityConfig(): QualityConfig {
    return this.config.quality;
  }

  /**
   * Get testing configuration
   */
  getTestingConfig(): TestingConfig {
    return this.config.testing;
  }

  /**
   * Get monitoring configuration
   */
  getMonitoringConfig(): MonitoringConfig {
    return this.config.monitoring;
  }

  /**
   * Get storage configuration
   */
  getStorageConfig(): StorageConfig {
    return this.config.storage;
  }

  /**
   * Watch for configuration changes
   */
  watchConfiguration(key: string, callback: (config: FrameworkConfig) => void): void {
    this.watchers.set(key, callback);
  }

  /**
   * Stop watching configuration changes
   */
  unwatchConfiguration(key: string): void {
    this.watchers.delete(key);
  }

  /**
   * Validate configuration
   */
  validateConfiguration(config?: Partial<FrameworkConfig>): {
    valid: boolean;
    errors: string[];
    warnings: string[];
  } {
    try {
      const configToValidate = config || this.config;
      FrameworkConfigSchema.parse(configToValidate);
      
      const warnings = this.generateConfigurationWarnings(configToValidate);
      
      return {
        valid: true,
        errors: [],
        warnings,
      };
    } catch (error) {
      return {
        valid: false,
        errors: [error.message],
        warnings: [],
      };
    }
  }

  /**
   * Load configuration from file
   */
  private async loadFromFile(): Promise<Partial<FrameworkConfig>> {
    try {
      const fs = await import('fs/promises');
      const configData = await fs.readFile(this.configPath, 'utf-8');
      return JSON.parse(configData);
    } catch (error) {
      // Return empty config if file doesn't exist
      return {};
    }
  }

  /**
   * Load configuration from environment variables
   */
  private loadFromEnvironment(): Partial<FrameworkConfig> {
    const envConfig: any = {};

    // Environment
    if (process.env.BITCODE_ENVIRONMENT) {
      envConfig.environment = { environment: process.env.BITCODE_ENVIRONMENT };
    }

    // Performance
    if (process.env.BITCODE_MAX_CONCURRENCY) {
      envConfig.performance = {
        execution: { maxConcurrency: parseInt(process.env.BITCODE_MAX_CONCURRENCY) }
      };
    }

    // Quality gates
    if (process.env.BITCODE_QUALITY_GATES) {
      const gates = JSON.parse(process.env.BITCODE_QUALITY_GATES);
      envConfig.quality = { defaultGates: gates };
    }

    // Monitoring
    if (process.env.BITCODE_ENABLE_MONITORING) {
      envConfig.monitoring = {
        metrics: { enableMetrics: process.env.BITCODE_ENABLE_MONITORING === 'true' }
      };
    }

    return envConfig;
  }

  /**
   * Merge configurations with deep merge
   */
  private mergeConfigurations(base: any, override: any): any {
    const result = { ...base };

    for (const key in override) {
      if (override[key] && typeof override[key] === 'object' && !Array.isArray(override[key])) {
        result[key] = this.mergeConfigurations(result[key] || {}, override[key]);
      } else {
        result[key] = override[key];
      }
    }

    return result;
  }

  /**
   * Notify configuration watchers
   */
  private notifyWatchers(): void {
    for (const callback of this.watchers.values()) {
      try {
        callback(this.config);
      } catch (error) {
        console.error('Error in configuration watcher:', error);
      }
    }
  }

  /**
   * Generate configuration warnings
   */
  private generateConfigurationWarnings(config: any): string[] {
    const warnings: string[] = [];

    // Performance warnings
    if (config.performance?.execution?.maxConcurrency > 50) {
      warnings.push('High concurrency setting may impact system performance');
    }

    // Memory warnings
    if (config.performance?.memory?.maxHeapSizeMB > 4096) {
      warnings.push('High memory limit may cause system instability');
    }

    // Quality warnings
    if (config.quality?.defaultGates?.relevance < 0.7) {
      warnings.push('Low relevance threshold may reduce quality standards');
    }

    // Monitoring warnings
    if (!config.monitoring?.metrics?.enableMetrics) {
      warnings.push('Metrics collection is disabled - monitoring capabilities will be limited');
    }

    return warnings;
  }
}

/**
 * Configuration Utilities
 */
export class ConfigurationUtils {
  /**
   * Create default configuration for environment
   */
  static createDefaultConfig(environment: 'development' | 'staging' | 'production' | 'test'): FrameworkConfig {
    const baseConfig = FrameworkConfigSchema.parse({});

    // Environment-specific overrides
    switch (environment) {
      case 'development':
        return {
          ...baseConfig,
          environment: {
            ...baseConfig.environment,
            environment: 'development',
            features: {
              ...baseConfig.environment.features,
              enableExperimentalFeatures: true,
            },
            logging: {
              ...baseConfig.environment.logging,
              level: 'debug',
            },
          },
          performance: {
            ...baseConfig.performance,
            execution: {
              ...baseConfig.performance.execution,
              maxConcurrency: 5,
            },
          },
        };

      case 'staging':
        return {
          ...baseConfig,
          environment: {
            ...baseConfig.environment,
            environment: 'staging',
            features: {
              ...baseConfig.environment.features,
              enableRealTimeMonitoring: true,
            },
          },
          performance: {
            ...baseConfig.performance,
            execution: {
              ...baseConfig.performance.execution,
              maxConcurrency: 20,
            },
          },
        };

      case 'production':
        return {
          ...baseConfig,
          environment: {
            ...baseConfig.environment,
            environment: 'production',
            features: {
              ...baseConfig.environment.features,
              enableRealTimeMonitoring: true,
              enableDistributedTracing: true,
            },
            logging: {
              ...baseConfig.environment.logging,
              level: 'warn',
            },
          },
          performance: {
            ...baseConfig.performance,
            execution: {
              ...baseConfig.performance.execution,
              maxConcurrency: 50,
            },
            caching: {
              ...baseConfig.performance.caching,
              enableDistributedCache: true,
            },
          },
          monitoring: {
            ...baseConfig.monitoring,
            alerting: {
              ...baseConfig.monitoring.alerting,
              alertChannels: ['email', 'slack', 'pagerduty'],
            },
            tracing: {
              ...baseConfig.monitoring.tracing,
              enableTracing: true,
            },
          },
        };

      case 'test':
        return {
          ...baseConfig,
          environment: {
            ...baseConfig.environment,
            environment: 'test',
            logging: {
              ...baseConfig.environment.logging,
              level: 'error',
            },
          },
          performance: {
            ...baseConfig.performance,
            execution: {
              ...baseConfig.performance.execution,
              maxConcurrency: 2,
              defaultTimeoutMs: 10000,
            },
          },
          testing: {
            ...baseConfig.testing,
            execution: {
              ...baseConfig.testing.execution,
              measurementRuns: 10,
              warmupRuns: 1,
            },
          },
        };

      default:
        return baseConfig;
    }
  }

  /**
   * Validate configuration compatibility
   */
  static validateCompatibility(config: FrameworkConfig): {
    compatible: boolean;
    issues: string[];
    suggestions: string[];
  } {
    const issues: string[] = [];
    const suggestions: string[] = [];

    // Check resource compatibility
    const maxConcurrency = config.performance.execution.maxConcurrency;
    const maxMemory = config.performance.memory.maxHeapSizeMB;

    if (maxConcurrency > 20 && maxMemory < 2048) {
      issues.push('High concurrency with low memory limit may cause performance issues');
      suggestions.push('Increase memory limit to at least 2048MB for high concurrency');
    }

    // Check feature compatibility
    if (config.environment.features.enableDistributedTracing && !config.monitoring.tracing.enableTracing) {
      issues.push('Distributed tracing feature enabled but tracing is disabled');
      suggestions.push('Enable tracing in monitoring configuration');
    }

    // Check production readiness
    if (config.environment.environment === 'production') {
      if (!config.monitoring.alerting.enableAlerting) {
        issues.push('Alerting disabled in production environment');
        suggestions.push('Enable alerting for production monitoring');
      }

      if (config.environment.logging.level === 'debug') {
        issues.push('Debug logging enabled in production');
        suggestions.push('Use warn or error level logging in production');
      }
    }

    return {
      compatible: issues.length === 0,
      issues,
      suggestions,
    };
  }
}

/**
 * Global configuration instance
 */
export const globalConfig = new ConfigurationManager();
