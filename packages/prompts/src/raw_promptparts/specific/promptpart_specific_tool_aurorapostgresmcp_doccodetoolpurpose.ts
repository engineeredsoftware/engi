/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: purpose
 * intent: "Core purpose statement for Aurora PostgreSQL cloud database integration"
 * current_version: "V26.02.1"
 * versions: []
 * benchmarks: [
 *   { "name": "cloud_database_purpose_clarity", "test": "Does '{{content}}' clearly articulate cloud database integration purpose? Rate 0-1" },
 *   { "name": "enterprise_scalability_focus", "test": "Does '{{content}}' emphasize enterprise scalability and reliability? Rate 0-1" },
 *   { "name": "critical_infrastructure_mission", "test": "Does '{{content}}' convey critical infrastructure mission? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_AURORAPOSTGRESMCP_DOCCODETOOLPURPOSE: PromptPart = 
  'Provides enterprise-grade Aurora PostgreSQL cloud database integration with automatic scaling, high availability, and performance optimization for mission-critical applications requiring 99.99% uptime and global data consistency across distributed cloud infrastructure.' as PromptPart;