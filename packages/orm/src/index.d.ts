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
export { createClient, createAdminClient } from './client';
export type { BitcodeOrmClient, AdminClient } from './client';
export { BaseModel } from './models/base';
export { UserProfilesModel } from './models/user-profiles';
export { UserConnectionsModel } from './models/user-connections';
export { UserModelPreferencesModel } from './models/user-model-preferences';
export { UserBtdBalancesModel } from './models/user-btd-balances';
export { UserBtdTransactionsModel } from './models/user-btd-transactions';
export { DeliverablesModel } from './models/deliverables';
export { PipelineExecutionsModel } from './models/pipeline-executions';
export { ExecutionEventsModel } from './models/execution-events';
export { NotificationsModel } from './models/notifications';
export { VCSRepositoryModel, getVCSRepositoryModel } from './models/vcs-repositories';
export type { VCSRepository, VCSRepositoryInsert, VCSRepositoryUpdate, VCSRepositoryMetadata } from './models/vcs-repositories';
export type { Database, Tables, Insertable, Updatable, TableName, QueryOptions, UserProfileWithBtd, DeliverableRunComplete, VCSRepositoryWithConnection } from './types/database';
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
export { hydrateBitcodeProfile, mergeBitcodeProfileSettings, profileHasWalletBinding, profileHasVerifiedWalletBinding, readBitcodeProfileSettings, readBitcodeWalletCapabilityFromProfile, readBitcodeWalletBindingFromProfile, } from './profile-contract';
export type { BitcodeProfileSettings, BitcodeWalletCapability, BitcodeWalletBinding, BitcodeWalletBindingStatus, HydratedBitcodeProfileFields, } from './profile-contract';
export type PhaseExecution = Tables<'phase_executions'>;
export { AssetPackGeneratedAssetsModel, AssetPackPhaseExecutionsModel, AssetPackRunInstructionsModel, AssetPackRunJobsModel, AssetPackStreamLogsModel, AssetPackVectorsModel, BITCODE_EXECUTION_STORAGE_SCHEMA_PARITY, BitcodeActivityEventsModel, BitcodeErrorLogsModel, BitcodeTokenCostsModel, } from './models/bitcode-execution-storage';
export type { AssetPackGeneratedAsset, AssetPackGeneratedAssetInsert, AssetPackGeneratedAssetUpdate, AssetPackPhaseExecution, AssetPackPhaseExecutionInsert, AssetPackPhaseExecutionUpdate, AssetPackRunInstruction, AssetPackRunInstructionInsert, AssetPackRunInstructionUpdate, AssetPackRunJob, AssetPackRunJobInsert, AssetPackRunJobUpdate, AssetPackStreamLog, AssetPackStreamLogInsert, AssetPackStreamLogUpdate, AssetPackVector, AssetPackVectorInsert, AssetPackVectorUpdate, BitcodeActivityEvent, BitcodeActivityEventInsert, BitcodeActivityEventUpdate, BitcodeErrorLog, BitcodeErrorLogInsert, BitcodeErrorLogUpdate, BitcodeTokenCost, BitcodeTokenCostInsert, BitcodeTokenCostUpdate, } from './models/bitcode-execution-storage';
export { ConversationsModel } from './models/conversations';
export { MessagesModel } from './models/messages';
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
 * const run = await adminClient.pipelineExecutions.create({
 *   user_id: userId,
 *   deliverable_id: deliverableId,
 *   status: 'pending'
 * });
 *
 * // Vector search for similar AssetPack evidence
 * const similar = await client.vectors.search({
 *   embedding: queryEmbedding,
 *   table: 'deliverable_vectors',
 *   limit: 5
 * });
 */
import type { Tables } from './types/database';
