/**
 * User API Keys Model
 * 
 * Manages API keys for programmatic access.
 * 
 * @doc-code
 * type: model
 * table: user_api_keys
 */

import { BaseModel } from '../base';
import { Tables, Insertable, Updatable, Database } from '../../types/database';
import type { SupabaseClient } from '@supabase/supabase-js';
import * as crypto from 'crypto';

export type UserApiKey = Tables<'user_api_keys'>;
export type UserApiKeyInsert = Insertable<'user_api_keys'>;
export type UserApiKeyUpdate = Updatable<'user_api_keys'>;

export class UserApiKeysModel extends BaseModel<'user_api_keys'> {
  constructor(supabase: SupabaseClient<Database>) {
    super(supabase, 'user_api_keys');
  }

  /**
   * List API keys for user
   */
  async listByUserId(userId: string): Promise<UserApiKey[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  /**
   * Get API key by hash
   */
  async getByKeyHash(keyHash: string): Promise<UserApiKey | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('key_hash', keyHash)
      .maybeSingle();

    if (error) throw error;
    return data;
  }

  /**
   * Validate API key
   */
  async validateKey(apiKey: string): Promise<{
    valid: boolean;
    userId?: string;
    keyId?: string;
  }> {
    const keyHash = crypto
      .createHash('sha256')
      .update(apiKey)
      .digest('hex');

    const key = await this.getByKeyHash(keyHash);
    
    if (!key) {
      return { valid: false };
    }

    // Check expiration
    if (key.expires_at && new Date(key.expires_at) < new Date()) {
      return { valid: false };
    }

    // Update last used
    await this.update(key.id, {
      last_used_at: new Date().toISOString()
    });

    return {
      valid: true,
      userId: key.user_id,
      keyId: key.id
    };
  }

  /**
   * Delete by ID and user
   */
  async deleteByIdAndUser(keyId: string, userId: string): Promise<void> {
    const { error } = await this.supabase
      .from(this.tableName)
      .delete()
      .eq('id', keyId)
      .eq('user_id', userId);

    if (error) throw error;
  }

  /**
   * Delete expired keys
   */
  async deleteExpired(): Promise<number> {
    const { count, error } = await this.supabase
      .from(this.tableName)
      .delete({ count: 'exact' })
      .lt('expires_at', new Date().toISOString());

    if (error) throw error;
    return count || 0;
  }

  /**
   * Get active key count for user
   */
  async getActiveCount(userId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from(this.tableName)
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .or(`expires_at.is.null,expires_at.gt.${new Date().toISOString()}`);

    if (error) throw error;
    return count || 0;
  }
}
