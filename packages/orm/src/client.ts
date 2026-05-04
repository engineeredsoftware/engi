/**
 * ORM CLIENT - Database Connection Management
 * 
 * Manages database connections with different access levels
 */

import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { Database } from './types/database';
import { UserProfilesModel } from './models/user-profiles';
import { UserModelPreferencesModel } from './models/user-model-preferences';
import { UserBtdTransactionsModel } from './models/user-btd-transactions';
import { PipelineExecutionsModel } from './models/pipeline-executions';
import { AssetPackEvidenceModel } from './models/asset-pack-evidence';
import { ExecutionEventsModel } from './models/execution-events';
import { PipelineRunsModel } from './models/pipeline-runs';
import { NotificationsModel } from './models/notifications';
import { UserConnectionsModel } from './models/user-connections';
import { UserBtdBalancesModel } from './models/user-btd-balances';
import {
  AssetPackGeneratedAssetsModel,
  AssetPackPhaseExecutionsModel,
  AssetPackRunInstructionsModel,
  AssetPackRunJobsModel,
  AssetPackStreamLogsModel,
  AssetPackVectorsModel,
  BitcodeActivityEventsModel,
  BitcodeErrorLogsModel,
  BitcodeTokenCostsModel,
} from './models/bitcode-execution-storage';

/**
 * Standard client interface
 */
export interface BitcodeOrmClient {
  userProfiles: UserProfilesModel;
  userModelPreferences: UserModelPreferencesModel;
  userBtdTransactions: UserBtdTransactionsModel;
  pipelineExecutions: PipelineExecutionsModel;
  pipelineRuns: PipelineRunsModel;
  assetPackEvidence: AssetPackEvidenceModel;
  executionEvents: ExecutionEventsModel;
  assetPackVectors: AssetPackVectorsModel;
  assetPackPhaseExecutions: AssetPackPhaseExecutionsModel;
  assetPackRunJobs: AssetPackRunJobsModel;
  assetPackRunInstructions: AssetPackRunInstructionsModel;
  assetPackStreamLogs: AssetPackStreamLogsModel;
  assetPackGeneratedAssets: AssetPackGeneratedAssetsModel;
  bitcodeActivityEvents: BitcodeActivityEventsModel;
  bitcodeErrorLogs: BitcodeErrorLogsModel;
  bitcodeTokenCosts: BitcodeTokenCostsModel;
  notifications: NotificationsModel;
  userConnections: UserConnectionsModel;
  userBtdBalances: UserBtdBalancesModel;
}

/**
 * Admin client with additional capabilities
 */
export interface AdminClient extends BitcodeOrmClient {
  // Admin-only operations are added here when they become Bitcode-owned APIs.
}

/**
 * Create standard client
 */
export function createClient(authToken?: string): BitcodeOrmClient {
  const supabase = createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      },
      global: {
        headers: authToken ? { Authorization: `Bearer ${authToken}` } : {}
      }
    }
  );

  return {
    userProfiles: new UserProfilesModel(supabase),
    userModelPreferences: new UserModelPreferencesModel(supabase),
    userBtdTransactions: new UserBtdTransactionsModel(supabase),
    pipelineExecutions: new PipelineExecutionsModel(supabase),
    pipelineRuns: new PipelineRunsModel(supabase),
    assetPackEvidence: new AssetPackEvidenceModel(supabase),
    executionEvents: new ExecutionEventsModel(supabase),
    assetPackVectors: new AssetPackVectorsModel(supabase),
    assetPackPhaseExecutions: new AssetPackPhaseExecutionsModel(supabase),
    assetPackRunJobs: new AssetPackRunJobsModel(supabase),
    assetPackRunInstructions: new AssetPackRunInstructionsModel(supabase),
    assetPackStreamLogs: new AssetPackStreamLogsModel(supabase),
    assetPackGeneratedAssets: new AssetPackGeneratedAssetsModel(supabase),
    bitcodeActivityEvents: new BitcodeActivityEventsModel(supabase),
    bitcodeErrorLogs: new BitcodeErrorLogsModel(supabase),
    bitcodeTokenCosts: new BitcodeTokenCostsModel(supabase),
    notifications: new NotificationsModel(supabase),
    userConnections: new UserConnectionsModel(supabase),
    userBtdBalances: new UserBtdBalancesModel(supabase)
  };
}

/**
 * Create admin client for build-time operations
 */
export function createAdminClient(): AdminClient {
  const supabase = createSupabaseClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    }
  );

  const baseClient = {
    userProfiles: new UserProfilesModel(supabase),
    userModelPreferences: new UserModelPreferencesModel(supabase),
    userBtdTransactions: new UserBtdTransactionsModel(supabase),
    pipelineExecutions: new PipelineExecutionsModel(supabase),
    pipelineRuns: new PipelineRunsModel(supabase),
    assetPackEvidence: new AssetPackEvidenceModel(supabase),
    executionEvents: new ExecutionEventsModel(supabase),
    assetPackVectors: new AssetPackVectorsModel(supabase),
    assetPackPhaseExecutions: new AssetPackPhaseExecutionsModel(supabase),
    assetPackRunJobs: new AssetPackRunJobsModel(supabase),
    assetPackRunInstructions: new AssetPackRunInstructionsModel(supabase),
    assetPackStreamLogs: new AssetPackStreamLogsModel(supabase),
    assetPackGeneratedAssets: new AssetPackGeneratedAssetsModel(supabase),
    bitcodeActivityEvents: new BitcodeActivityEventsModel(supabase),
    bitcodeErrorLogs: new BitcodeErrorLogsModel(supabase),
    bitcodeTokenCosts: new BitcodeTokenCostsModel(supabase),
    notifications: new NotificationsModel(supabase),
    userConnections: new UserConnectionsModel(supabase),
    userBtdBalances: new UserBtdBalancesModel(supabase)
  };

  return {
    ...baseClient
    // Admin operations stay explicit rather than hidden behind route-local clients.
  };
}
