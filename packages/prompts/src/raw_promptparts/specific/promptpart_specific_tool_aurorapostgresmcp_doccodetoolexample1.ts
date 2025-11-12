/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Example demonstrating enterprise-scale Aurora PostgreSQL deployment with global replication"
 * current_version: "GA1.02.1"
 * versions: []
 * benchmarks: [
 *   { "name": "enterprise_deployment_demonstration", "test": "Does '{{content}}' demonstrate enterprise-scale database deployment? Rate 0-1" },
 *   { "name": "global_infrastructure_showcase", "test": "Does '{{content}}' showcase global infrastructure capabilities? Rate 0-1" },
 *   { "name": "critical_infrastructure_example", "test": "Is '{{content}}' relevant for critical infrastructure scenarios? Rate 0-1" },
 *   { "name": "transcendent_database_quality", "test": "Does '{{content}}' exemplify transcendent database management quality? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@engi/prompts';

export const PROMPTPART_SPECIFIC_TOOL_AURORAPOSTGRESMCP_DOCCODETOOLEXAMPLE1: PromptPart = 
  'Example 1 - Global E-commerce Platform Database: createAuroraCluster({ cluster_identifier: "global-ecommerce-primary", engine: "aurora-postgresql", engine_version: "15.4", db_instance_class: "db.r6g.16xlarge", master_username: "ecommerce_admin", allocated_storage: 10000, vpc_security_group_ids: ["sg-enterprise-db-001"], db_subnet_group_name: "enterprise-private-subnets", backup_retention_period: 35, multi_az: true, storage_encrypted: true, kms_key_id: "arn:aws:kms:us-east-1:123456789012:key/enterprise-db-key", performance_insights_enabled: true, monitoring_interval: 60, deletion_protection: true, enable_cloudwatch_logs_exports: ["postgresql"], serverless_v2_scaling_configuration: { min_capacity: 16, max_capacity: 256 }, global_cluster_identifier: "global-ecommerce-cluster", enable_iam_database_authentication: true, engine_mode: "provisioned", tags: { Environment: "production", Application: "ecommerce", Compliance: "SOX-PCI-DSS" } }) → Returns cluster configuration with primary endpoint ecommerce-primary.cluster-xyz.us-east-1.rds.amazonaws.com:5432, read replica endpoints across 6 global regions, automatic failover configuration, performance insights dashboard, CloudWatch monitoring with 200+ metrics, backup automation with point-in-time recovery, encryption compliance certificates, and cost optimization recommendations totaling $2.3M annual savings through intelligent scaling and resource optimization.' as PromptPart;