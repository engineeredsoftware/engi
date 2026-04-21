/**
 * ORM Models Index - GA-1 Tables Only
 * 
 * This file exports only models for tables included in GA-1.
 * Non-GA-1 models have been moved to archived-post-ga1/ directory.
 */

// Base model
export { BaseModel } from './base';

// User-related models (GA-1)
export { UserProfilesModel } from './user-profiles';
export { UserConnectionsModel } from './user-connections';
export { UserModelPreferencesModel } from './user-model-preferences';
export { UserCreditsModel } from './user-credits';
export { UserCreditUsagesModel } from './user-credit-usages';

// Deliverable models (GA-1)
export { DeliverablesModel } from './deliverables';
export { PipelineExecutionsModel } from './pipeline-executions';
export { ExecutionEventsModel } from './execution-events';

// Pipeline models (GA-1)
export { PipelineRunsModel } from './pipeline-runs'; // generic metadata (legacy path)

// System models (GA-1)
export { NotificationsModel } from './notifications';

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
  UserCredits,
  UserCreditsInsert,
  UserCreditsUpdate,
} from './user-credits';

export type {
  UserCreditUsage,
  UserCreditUsageInsert,
  UserCreditUsageUpdate,
} from './user-credit-usages';

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
