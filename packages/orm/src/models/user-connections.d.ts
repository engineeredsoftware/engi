/**
 * User Connections Model
 *
 * Manages third-party service connections (GitHub, GitLab, etc).
 *
 * @doc-code
 * type: model
 * table: user_connections
 */
import { BaseModel } from './base';
import { Tables, Insertable, Updatable, Database } from '../types/database';
import { SupabaseClient } from '@supabase/supabase-js';
export type UserConnection = Tables<'user_connections'>;
export type UserConnectionInsert = Insertable<'user_connections'>;
export type UserConnectionUpdate = Updatable<'user_connections'>;
export declare class UserConnectionsModel extends BaseModel<'user_connections'> {
    constructor(supabase: SupabaseClient<Database>);
    /**
     * Get connection by user and provider
     */
    getByUserAndProvider(userId: string, provider: string): Promise<UserConnection | null>;
    /**
     * Get connection by provider user ID
     * Note: Since provider_user_id is stored in connection_data JSON, we use JSON path query
     * Also checks connectionId field for GitHub installation IDs
     */
    getByProviderUserId(provider: string, providerUserId: string): Promise<UserConnection | null>;
    /**
     * Get all connections for user
     */
    listByUserId(userId: string): Promise<UserConnection[]>;
    getByOrganization(organizationId: string): Promise<UserConnection[]>;
    /**
     * Upsert connection
     */
    upsert(connection: UserConnectionInsert): Promise<UserConnection>;
    /**
     * Get auth from connection by installation ID.
     */
    getAuthFromConnectionByInstallationId(installationId: number): Promise<{
        provider: string;
        installationId: string;
        accessToken?: string;
    } | null>;
    /**
     * Unified access for a user's GitHub installation id.
     * Normalizes historical JSON keys used in connection_data:
     * - installation_id (snake_case)
     * - installationId (camelCase)
     * - connectionId (older provider field used for installation id)
     * Returns the id as a string or null if not connected.
     */
    getInstallationIdForUser(userId: string, provider?: string): Promise<string | null>;
}
