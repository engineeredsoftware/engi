/**
 * ORM CLIENT - Database Connection Management
 *
 * Manages database connections with different access levels
 */
import { UserProfilesModel } from './models/user-profiles';
import { UserModelPreferencesModel } from './models/user-model-preferences';
import { UserBtdTransactionsModel } from './models/user-btd-transactions';
import { PipelineExecutionsModel } from './models/pipeline-executions';
import { DeliverablesModel } from './models/deliverables';
import { ExecutionEventsModel } from './models/execution-events';
import { NotificationsModel } from './models/notifications';
import { UserConnectionsModel } from './models/user-connections';
import { UserBtdBalancesModel } from './models/user-btd-balances';
/**
 * Standard client interface
 */
export interface EngiClient {
    userProfiles: UserProfilesModel;
    userModelPreferences: UserModelPreferencesModel;
    userBtdTransactions: UserBtdTransactionsModel;
    pipelineExecutions: PipelineExecutionsModel;
    deliverables: DeliverablesModel;
    executionEvents: ExecutionEventsModel;
    notifications: NotificationsModel;
    userConnections: UserConnectionsModel;
    userBtdBalances: UserBtdBalancesModel;
}
/**
 * Admin client with additional capabilities
 */
export interface AdminClient extends EngiClient {
}
/**
 * Create standard client
 */
export declare function createClient(authToken?: string): EngiClient;
/**
 * Create admin client for build-time operations
 */
export declare function createAdminClient(): AdminClient;
