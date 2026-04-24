/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: capabilities
 * intent: "Comprehensive capabilities listing for Aurora PostgreSQL cloud database integration"
 * current_version: "V26.02.1"
 * versions: []
 * benchmarks: [
 *   { "name": "enterprise_database_capabilities", "test": "Does '{{content}}' showcase enterprise database capabilities? Rate 0-1" },
 *   { "name": "cloud_native_features", "test": "Does '{{content}}' demonstrate cloud-native database features? Rate 0-1" },
 *   { "name": "critical_infrastructure_depth", "test": "Does '{{content}}' reflect critical infrastructure depth? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_AURORAPOSTGRESMCP_DOCCODETOOLCAPABILITIES: PromptPart = 
  'Advanced PostgreSQL cluster management, automated failover and recovery, read replica orchestration, connection pooling optimization, query performance tuning, backup and restore automation, encryption at rest and in transit, multi-region replication, serverless scaling, performance insights analytics, database parameter optimization, schema migration management, monitoring and alerting integration, cost optimization recommendations, and compliance audit trail generation.' as PromptPart;