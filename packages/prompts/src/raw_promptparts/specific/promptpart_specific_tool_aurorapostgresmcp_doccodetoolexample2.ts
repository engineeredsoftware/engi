/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Example showcasing financial services Aurora PostgreSQL with regulatory compliance"
 * current_version: "GA1.02.1"
 * versions: []
 * benchmarks: [
 *   { "name": "financial_compliance_demonstration", "test": "Does '{{content}}' demonstrate financial services compliance capabilities? Rate 0-1" },
 *   { "name": "regulatory_framework_showcase", "test": "Does '{{content}}' showcase regulatory framework integration? Rate 0-1" },
 *   { "name": "enterprise_security_depth", "test": "Does '{{content}}' demonstrate enterprise security depth? Rate 0-1" },
 *   { "name": "mission_critical_reliability", "test": "Does '{{content}}' exemplify mission-critical reliability standards? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@engi/prompts';

export const PROMPTPART_SPECIFIC_TOOL_AURORAPOSTGRESMCP_DOCCODETOOLEXAMPLE2: PromptPart = 
  'Example 2 - Financial Services Regulatory Database: configureComplianceCluster({ cluster_identifier: "finserv-regulatory-db", engine: "aurora-postgresql", engine_version: "15.4", db_instance_class: "db.r6g.24xlarge", master_username: "compliance_officer", allocated_storage: 50000, vpc_security_group_ids: ["sg-finserv-tier1", "sg-audit-access"], db_subnet_group_name: "finserv-isolated-subnets", backup_retention_period: 90, storage_encrypted: true, kms_key_id: "arn:aws:kms:us-east-1:123456789012:key/finserv-master-key", performance_insights_enabled: true, monitoring_interval: 15, deletion_protection: true, copy_tags_to_snapshot: true, enable_cloudwatch_logs_exports: ["postgresql", "audit"], db_cluster_parameter_group_name: "finserv-regulatory-params", enable_iam_database_authentication: true, domain: "finserv.corp", domain_iam_role_name: "AuroraDirectoryServiceRole", backtrack_window: 72, enable_performance_insights: true, performance_insights_retention_period: 731, final_db_snapshot_identifier: "finserv-compliance-final-snapshot", tags: { Compliance: "SOX-GDPR-Basel-III", DataClassification: "Confidential", RetentionPolicy: "7-years", AuditScope: "Full" } }) → Returns regulatory-compliant cluster with encrypted endpoints, audit trail integration, SOX compliance dashboard, GDPR data lineage tracking, Basel III capital adequacy reporting, real-time fraud detection analytics, automated regulatory report generation, cross-border data residency enforcement, immutable audit logs with tamper-proof signatures, and compliance officer access controls with multi-factor authentication and privileged access management integration across 24 global financial centers.' as PromptPart;
