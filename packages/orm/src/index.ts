/**
 * Bitcode ORM - V26 Database Access Layer
 * 
 * Provides type-safe database access for V26 schema with:
 * - Type-safe Supabase client wrapper
 * - Vector search support (pgvector)
 * - Consistent model patterns
 * - Row Level Security compliance
 * 
 * @doc-package
 * version: v26-1.0.0
 * pattern: type-safe-orm
 * philosophy: "Database as a typed service"
 */

// ==================== CLIENT ====================
export { createClient, createAdminClient } from './client';
export type { EngiClient, AdminClient } from './client';

// ==================== V26 MODELS ====================
// Base model for extension
export { BaseModel } from './models/base';

// Core User & Auth models
export { UserProfilesModel } from './models/user-profiles';
export { UserConnectionsModel } from './models/user-connections';
export { UserModelPreferencesModel } from './models/user-model-preferences';
export { UserBtdBalancesModel } from './models/user-btd-balances';
export { UserBtdTransactionsModel } from './models/user-btd-transactions';

// Deliverables System models
export { DeliverablesModel } from './models/deliverables';
// Note: deliverable_vectors model not yet implemented

// Pipeline Execution models
export { PipelineExecutionsModel } from './models/pipeline-executions';
export { ExecutionEventsModel } from './models/execution-events';
// Note: Additional pipeline models not yet implemented:
// - deliverable_run_phases
// - run_jobs
// - run_otf_instructions
// - stream_logs
// - generated_assets

// Essential Infrastructure models
export { NotificationsModel } from './models/notifications';
// Note: Additional infrastructure models not yet implemented:
// - events
// - error_logs
// - token_costs

// VCS Integration models
export { VCSRepositoryModel, getVCSRepositoryModel } from './models/vcs-repositories';
export type { VCSRepository, VCSRepositoryInsert, VCSRepositoryUpdate, VCSRepositoryMetadata } from './models/vcs-repositories';

// ==================== TYPES ====================
export type { 
  Database, 
  Tables, 
  Insertable, 
  Updatable,
  TableName,
  QueryOptions,
  // V26 specific types
  UserProfileWithBtd,
  DeliverableRunComplete,
  VCSRepositoryWithConnection
} from './types/database';

// Re-export V26 table types for convenience
export type UserProfile = Tables<'user_profiles'>;
export type UserConnection = Tables<'user_connections'>;
export type UserModelPreference = Tables<'user_model_preferences'>;
export type UserBtdBalance = Tables<'user_credits'>;
export type UserBtdTransaction = Tables<'user_credit_usages'>;
export type Deliverable = Tables<'deliverables'>;
export type PipelineExecution = Tables<'executions'>;
export type ExecutionEvent = Tables<'execution_events'>;
export type PipelineRun = Tables<'pipeline_runs'>;
export type Notification = Tables<'notifications'>;
export type Conversation = Tables<'conversations'>;
export type Message = Tables<'messages'>;
export type MessageAttachment = Tables<'message_attachments'>;
export {
  hydrateBitcodeProfile,
  mergeBitcodeProfileSettings,
  profileHasWalletBinding,
  profileHasVerifiedWalletBinding,
  readBitcodeProfileSettings,
  readBitcodeWalletCapabilityFromProfile,
  readBitcodeWalletBindingFromProfile,
} from './profile-contract';
export type {
  BitcodeProfileSettings,
  BitcodeWalletCapability,
  BitcodeWalletBinding,
  BitcodeWalletBindingStatus,
  HydratedBitcodeProfileFields,
} from './profile-contract';

// Deliverables Pipeline structured streaming tables (V26)
// Structured persistence (Execution hierarchy)
export type PhaseExecution = Tables<'phase_executions'>;

// Conversation System models (V26)
export { ConversationsModel } from './models/conversations';
export { MessagesModel } from './models/messages';

// ==================== COMPATIBILITY MODEL EXPORTS ====================
// These retained owners still back active MCP/auth/organization surfaces, but
// they now live under canonical model paths rather than an archived owner family.
export { UsersModel } from './models/users';
export { OrganizationsModel } from './models/organizations';
export { OrganizationMembersModel } from './models/organization-members';
export { UserApiKeysModel } from './models/user-api-keys';
export { OrganizationCreditsModel } from './models/organization-credits';
export { OrganizationCreditUsagesModel } from './models/organization-credit-usages';

/**
 * Example usage:
 * 
 * // For API routes (user access)
 * const client = createClient(authToken);
 * const deliverables = await client.deliverables.list({ 
 *   filter: { status: 'active' },
 *   limit: 10 
 * });
 * 
 * // For admin/service operations
 * const adminClient = createAdminClient();
 * const run = await adminClient.deliverableRuns.create({
 *   user_id: userId,
 *   deliverable_id: deliverableId,
 *   status: 'pending'
 * });
 * 
 * // Vector search for similar deliverables
 * const similar = await client.vectors.search({
 *   embedding: queryEmbedding,
 *   table: 'deliverable_vectors',
 *   limit: 5
 * });
 */

import type { Tables } from './types/database';
