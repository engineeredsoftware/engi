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
export declare class UserApiKeysModel {
    constructor(supabase: SupabaseClient<Database>);
    private readonly supabase;
    listByUserId(userId: string): Promise<UserApiKey[]>;
    getByKeyHash(keyHash: string): Promise<UserApiKey | null>;
    validateKey(apiKey: string): Promise<{
        valid: boolean;
        userId?: string;
        keyId?: string;
    }>;
    deleteByIdAndUser(keyId: string, userId: string): Promise<void>;
    deleteExpired(): Promise<number>;
    getActiveCount(userId: string): Promise<number>;
    update(id: string, data: UserApiKeyUpdate): Promise<UserApiKey>;
    updateLastUsed(id: string): Promise<void>;
}
