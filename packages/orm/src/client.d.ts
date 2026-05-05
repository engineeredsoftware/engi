import type { UserProfilesModel } from './models/user-profiles';
import type { UserModelPreferencesModel } from './models/user-model-preferences';
import type { UserBtdTransactionsModel } from './models/user-btd-transactions';
import type { PipelineExecutionsModel } from './models/pipeline-executions';
import type { AssetPackEvidenceModel } from './models/asset-pack-evidence';
import type { ExecutionEventsModel } from './models/execution-events';
import type { PipelineRunsModel } from './models/pipeline-runs';
import type { NotificationsModel } from './models/notifications';
import type { UserConnectionsModel } from './models/user-connections';
import type { UserBtdBalancesModel } from './models/user-btd-balances';
import type {
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

export interface AdminClient extends BitcodeOrmClient {}

export declare function createClient(authToken?: string): BitcodeOrmClient;
export declare function createAdminClient(): AdminClient;
