/**
 * ORM Models Index - GA-1 Tables Only
 * 
 * This file exports the active GA-1 plus retained compatibility owners that
 * still back live Bitcode surfaces.
 */

// Base model
export { BaseModel } from './base';

// User-related models (GA-1)
export { UserProfilesModel } from './user-profiles';
export { UserConnectionsModel } from './user-connections';
export { UserModelPreferencesModel } from './user-model-preferences';
export { UserBtdBalancesModel } from './user-btd-balances';
export { UserBtdTransactionsModel } from './user-btd-transactions';

// Deliverable models (GA-1)
export { DeliverablesModel } from './deliverables';
export { PipelineExecutionsModel } from './pipeline-executions';
export { ExecutionEventsModel } from './execution-events';

// Pipeline models (GA-1)
export { PipelineRunsModel } from './pipeline-runs'; // generic metadata (legacy path)

// System models (GA-1)
export { NotificationsModel } from './notifications';

// Retained compatibility models
export { UsersModel } from './users';
export { OrganizationsModel } from './organizations';
export { OrganizationMembersModel } from './organization-members';
export { UserApiKeysModel } from './user-api-keys';

// Type exports for convenience
export type {
  UserProfile,
  UserProfileInsert,
  UserProfileUpdate,
} from './user-profiles';

export type {
  UserConnection,
  UserConnectionInsert,
  UserConnectionUpdate,
} from './user-connections';

export type {
  UserModelPreference,
  UserModelPreferenceInsert,
  UserModelPreferenceUpdate,
} from './user-model-preferences';

export type {
  UserBtdBalance,
  UserBtdBalanceInsert,
  UserBtdBalanceUpdate,
} from './user-btd-balances';

export type {
  UserBtdTransaction,
  UserBtdTransactionInsert,
  UserBtdTransactionUpdate,
} from './user-btd-transactions';

export type {
  PipelineRun,
  PipelineRunInsert,
  PipelineRunUpdate,
} from './pipeline-runs';

export type {
  PipelineExecution,
  PipelineExecutionInsert,
  PipelineExecutionUpdate,
} from './pipeline-executions';

export type {
  ExecutionEvent,
  ExecutionEventInsert,
} from './execution-events';

// Note: Missing GA-1 tables that may need model implementations:
// - vcs_repositories
// - user_github_connections  
// - deliverable_vectors
// - deliverable_run_phases
// - run_jobs
// - run_otf_instructions
// - stream_logs
// - generated_assets
// - events
// - error_logs
// - token_costs
