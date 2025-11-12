/**
 * ORM CLIENT - Database Connection Management
 * 
 * Manages database connections with different access levels
 */

import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { Database } from './types/database';
import { UserProfilesModel } from './models/user-profiles';
import { UserModelPreferencesModel } from './models/user-model-preferences';
import { UserCreditUsagesModel } from './models/user-credit-usages';
import { PipelineExecutionsModel } from './models/pipeline-executions';
import { PipelineExecution } from './models/pipeline-executions';
import { DeliverablesModel } from './models/deliverables';
import { ExecutionEventsModel } from './models/execution-events';
import { NotificationsModel } from './models/notifications';
import { UserConnectionsModel } from './models/user-connections';
import { UserCreditsModel } from './models/user-credits';

/**
 * Standard client interface
 */
export interface EngiClient {
  userProfiles: UserProfilesModel;
  userModelPreferences: UserModelPreferencesModel;
  userCreditUsages: UserCreditUsagesModel;
  pipelineExecutions: PipelineExecutionsModel;
  deliverables: DeliverablesModel;
  executionEvents: ExecutionEventsModel;
  notifications: NotificationsModel;
  userConnections: UserConnectionsModel;
  userCredits: UserCreditsModel;
}

/**
 * Admin client with additional capabilities
 */
export interface AdminClient extends EngiClient {
  // Admin-only operations (placeholder for future admin features)
}

/**
 * Create standard client
 */
export function createClient(authToken?: string): EngiClient {
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
    userCreditUsages: new UserCreditUsagesModel(supabase),
    pipelineExecutions: new PipelineExecutionsModel(supabase),
    deliverables: new DeliverablesModel(supabase),
    executionEvents: new ExecutionEventsModel(supabase),
    notifications: new NotificationsModel(supabase),
    userConnections: new UserConnectionsModel(supabase),
    userCredits: new UserCreditsModel(supabase)
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
    userCreditUsages: new UserCreditUsagesModel(supabase),
    pipelineExecutions: new PipelineExecutionsModel(supabase),
    deliverables: new DeliverablesModel(supabase),
    executionEvents: new ExecutionEventsModel(supabase),
    notifications: new NotificationsModel(supabase),
    userConnections: new UserConnectionsModel(supabase),
    userCredits: new UserCreditsModel(supabase)
  };

  return {
    ...baseClient
    // Admin operations to be added as needed
  };
}
