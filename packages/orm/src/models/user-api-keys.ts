/**
 * User API Keys Model
 *
 * Manages API keys for programmatic access.
 *
 * @doc-code
 * type: model
 * table: user_api_keys
 */

import type { Database } from '../types/database';
import type { SupabaseClient } from '@supabase/supabase-js';
import * as crypto from 'crypto';

export interface UserApiKey {
  id: string;
  user_id: string;
  name?: string | null;
  scopes?: string[] | null;
  key_hash?: string | null;
  expires_at?: string | null;
  last_used_at?: string | null;
}

export interface UserApiKeyInsert extends Partial<UserApiKey> {
  user_id: string;
}

export type UserApiKeyUpdate = Partial<UserApiKey>;

export class UserApiKeysModel {
  constructor(supabase: SupabaseClient<Database>) {
    this.supabase = supabase;
  }

  private readonly supabase: SupabaseClient<Database>;

  async listByUserId(userId: string): Promise<UserApiKey[]> {
    const { data, error } = await this.supabase
      .from('user_api_keys' as any)
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return ((data || []) as unknown) as UserApiKey[];
  }

  async getByKeyHash(keyHash: string): Promise<UserApiKey | null> {
    const { data, error } = await this.supabase
      .from('user_api_keys' as any)
      .select('*')
      .eq('key_hash', keyHash)
      .maybeSingle();

    if (error) throw error;
    return (data as unknown as UserApiKey | null) || null;
  }

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

    if (key.expires_at && new Date(key.expires_at) < new Date()) {
      return { valid: false };
    }

    await this.update(key.id, {
      last_used_at: new Date().toISOString()
    });

    return {
      valid: true,
      userId: key.user_id,
      keyId: key.id
    };
  }

  async deleteByIdAndUser(keyId: string, userId: string): Promise<void> {
    const { error } = await this.supabase
      .from('user_api_keys' as any)
      .delete()
      .eq('id', keyId)
      .eq('user_id', userId);

    if (error) throw error;
  }

  async deleteExpired(): Promise<number> {
    const { data, error } = await this.supabase
      .from('user_api_keys' as any)
      .select('id')
      .lt('expires_at', new Date().toISOString());

    if (error) throw error;
    const ids = (((data || []) as unknown) as Array<{ id: string }>).map((row) => row.id);
    if (ids.length === 0) return 0;

    const { error: deleteError } = await this.supabase
      .from('user_api_keys' as any)
      .delete()
      .in('id', ids);

    if (deleteError) throw deleteError;
    return ids.length;
  }

  async getActiveCount(userId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('user_api_keys' as any)
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .or(`expires_at.is.null,expires_at.gt.${new Date().toISOString()}`);

    if (error) throw error;
    return count || 0;
  }

  async update(id: string, data: UserApiKeyUpdate): Promise<UserApiKey> {
    const { data: updated, error } = await this.supabase
      .from('user_api_keys' as any)
      .update(data as any)
      .eq('id', id)
      .select('*')
      .single();

    if (error) throw error;
    return updated as unknown as UserApiKey;
  }

  async updateLastUsed(id: string): Promise<void> {
    await this.update(id, { last_used_at: new Date().toISOString() });
  }
}
