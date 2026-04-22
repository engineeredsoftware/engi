/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: parameters
 * intent: "Parameter specifications for Aurora PostgreSQL cloud database operations"
 * current_version: "GA1.02.1"
 * versions: []
 * benchmarks: [
 *   { "name": "enterprise_parameter_comprehensiveness", "test": "Does '{{content}}' cover comprehensive enterprise database parameters? Rate 0-1" },
 *   { "name": "cloud_configuration_depth", "test": "Does '{{content}}' demonstrate cloud configuration depth? Rate 0-1" },
 *   { "name": "critical_infrastructure_parameters", "test": "Does '{{content}}' include critical infrastructure parameters? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_AURORAPOSTGRESMCP_DOCCODETOOLPARAMETERS: PromptPart = 
  'cluster_identifier: string, db_instance_class: string, engine_version: string, master_username: string, allocated_storage: number, vpc_security_group_ids: string[], db_subnet_group_name: string, backup_retention_period: number, preferred_backup_window: string, preferred_maintenance_window: string, multi_az: boolean, storage_encrypted: boolean, kms_key_id: string, performance_insights_enabled: boolean, monitoring_interval: number, auto_minor_version_upgrade: boolean, deletion_protection: boolean, copy_tags_to_snapshot: boolean, enable_cloudwatch_logs_exports: string[], db_cluster_parameter_group_name: string, database_name: string, port: number, iops: number, storage_type: string, serverless_v2_scaling_configuration: object, global_cluster_identifier: string, replication_source_identifier: string, restore_type: string, source_db_cluster_identifier: string, restore_to_time: string, use_latest_restorable_time: boolean, s3_import_configuration: object, enable_http_endpoint: boolean, scaling_configuration: object, engine_mode: string, backtrack_window: number, enable_iam_database_authentication: boolean, enable_performance_insights: boolean, performance_insights_kms_key_id: string, performance_insights_retention_period: number, domain: string, domain_iam_role_name: string, tags: object, final_db_snapshot_identifier: string, skip_final_snapshot: boolean, availability_zones: string[], character_set_name: string, db_name: string, option_group_name: string, timezone: string, cloudwatch_logs_export_configuration: object, snapshot_identifier: string, apply_immediately: boolean' as PromptPart;