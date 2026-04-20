/**
 * Bitcode Prompt Quality Assurance Framework
 * 
 * A comprehensive testing framework for validating prompt quality, consistency,
 * and performance across the entire Bitcode agent ecosystem. Designed for global
 * scale with thousands of agent permutations across pipelines, phases, and steps.
 * 
 * Core Principles:
 * - Production-grade reliability for global deployment
 * - Comprehensive validation across all prompt dimensions
 * - Automated regression prevention and quality gates
 * - Scalable architecture supporting thousands of permutations
 */

export * from './core/PromptQualityEngine';
export * from './core/QualityMetrics';
export * from './core/ValidationSchemas';

export * from './testing/AgentPromptTestSuite';
export * from './testing/PipelineTestOrchestrator';
export * from './testing/RegressionTestFramework';

export * from './validation/PromptOutputValidator';
export * from './validation/ConsistencyValidator';
export * from './validation/ToolPlanningValidator';

export * from './benchmarking/PerformanceBenchmark';
export * from './benchmarking/TokenOptimizationAnalyzer';
export * from './benchmarking/QualityTrendAnalyzer';

export * from './integration/MultiAgentTestRunner';
export * from './integration/PipelineIntegrationTester';
export * from './integration/CrossModalValidator';

export * from './utils/TestDataGenerator';
export * from './utils/MockingUtilities';
export * from './utils/ReportingEngine';

// Framework configuration and initialization
export * from './config/FrameworkConfig';
export * from './config/QualityGates';
export * from './config/TestEnvironment';
