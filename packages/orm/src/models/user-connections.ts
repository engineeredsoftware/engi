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

export class UserConnectionsModel extends BaseModel<'user_connections'> {
  constructor(supabase: SupabaseClient<Database>) {
    super(supabase, 'user_connections');
  }

  /**
   * Get connection by user and provider
   */
  async getByUserAndProvider(userId: string, provider: string): Promise<UserConnection | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('user_id', userId)
      .eq('provider', provider)
      .maybeSingle();

    if (error) throw error;
    return data;
  }

  /**
   * Get connection by provider user ID
   * Note: Since provider_user_id is stored in connection_data JSON, we use JSON path query
   * Also checks connectionId field for GitHub installation IDs
   */
  async getByProviderUserId(provider: string, providerUserId: string): Promise<UserConnection | null> {
    // Try provider_user_id first
    let { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('provider', provider)
      .eq('connection_data->>provider_user_id', providerUserId)
      .maybeSingle();

    if (error && error.code !== 'PGRST116') throw error;
    
    // If not found, try connectionId field (GitHub stores installation ID here)
    if (!data) {
      const result = await this.supabase
        .from(this.tableName)
        .select('*')
        .eq('provider', provider)
        .eq('connection_data->>connectionId', String(providerUserId))
        .maybeSingle();
      
      if (result.error && result.error.code !== 'PGRST116') throw result.error;
      data = result.data;
    }
    
    return data;
  }

  /**
   * Get all connections for user
   */
  async listByUserId(userId: string): Promise<UserConnection[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  /**
   * Upsert connection
   */
  async upsert(connection: UserConnectionInsert): Promise<UserConnection> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .upsert({
        ...connection,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id,provider',
        ignoreDuplicates: false
      })
      .select('*')
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Get auth from connection by installation ID (legacy support)
   */
  async getAuthFromConnectionByInstallationId(installationId: number): Promise<{
    provider: string;
    installationId: string;
    accessToken?: string;
  } | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('provider, connection_data')
      .eq('provider', 'github')
      .eq('connection_data->>connectionId', String(installationId))
      .maybeSingle();

    if (error || !data) return null;

    return {
      provider: data.provider,
      installationId: installationId.toString(),
      accessToken: (data.connection_data as any)?.access_token
    };
  }

  /**
   * Unified access for a user's GitHub installation id.
   * Normalizes historical JSON keys used in connection_data:
   * - installation_id (snake_case)
   * - installationId (camelCase)
   * - connectionId (legacy field used for installation id)
   * Returns the id as a string or null if not connected.
   */
  async getInstallationIdForUser(userId: string, provider: string = 'github'): Promise<string | null> {
    const connection = await this.getByUserAndProvider(userId, provider);
    const cd = connection?.connection_data as any | undefined;
    if (!cd) return null;
    // First try common canonical keys
    let id = cd.installation_id ?? cd.installationId ?? cd.connectionId;
    // Defense: search case-insensitively for installation/connection id keys
    if (id === undefined || id === null) {
      const entries = Object.entries(cd) as Array<[string, unknown]>;
      for (const [k, v] of entries) {
        const key = k.toLowerCase();
        if (key === 'installation_id' || key === 'installationid') { id = v; break; }
        if (key === 'connection_id' || key === 'connectionid') { id = v; /* continue search for installation first? keep first */ }
      }
    }
    if (id === undefined || id === null) return null;
    return String(id);
  }
}
