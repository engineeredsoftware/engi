/**
 * USERS MODEL - User management with production features
 *
 * @doc-code
 * type: orm-model
 * table: users
 * capabilities: ["auth", "profile", "organization"]
 */

import type { Database } from '../types/database';
import type { SupabaseClient } from '@supabase/supabase-js';

export interface UserRecord {
  id: string;
  email?: string | null;
  full_name?: string | null;
  avatar_url?: string | null;
  organization_id?: string | null;
  updated_at?: string | null;
  metadata?: Record<string, unknown> | null;
}

export class UsersModel {
  constructor(supabase: SupabaseClient<Database>) {
    this.supabase = supabase;
  }

  private readonly supabase: SupabaseClient<Database>;

  async getById(id: string): Promise<UserRecord | null> {
    const { data, error } = await this.supabase
      .from('users' as any)
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return (data as unknown as UserRecord | null) || null;
  }

  async findByEmail(email: string): Promise<UserRecord | null> {
    const { data, error } = await this.supabase
      .from('users' as any)
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (error) throw error;
    return (data as unknown as UserRecord | null) || null;
  }

  async findByOrganization(organizationId: string): Promise<UserRecord[]> {
    const { data, error } = await this.supabase
      .from('users' as any)
      .select('*')
      .eq('organization_id', organizationId);

    if (error) throw error;
    return ((data || []) as unknown) as UserRecord[];
  }

  async updateProfile(userId: string, profile: {
    full_name?: string;
    avatar_url?: string;
    metadata?: Record<string, unknown>;
  }): Promise<UserRecord> {
    const { data, error } = await this.supabase
      .from('users' as any)
      .update(profile as any)
      .eq('id', userId)
      .select('*')
      .single();

    if (error) throw error;
    return data as unknown as UserRecord;
  }

  async assignToOrganization(
    userId: string,
    organizationId: string
  ): Promise<UserRecord> {
    return this.updateProfile(userId, { metadata: { organization_id: organizationId } });
  }

  async getActiveUsers(limit = 100): Promise<UserRecord[]> {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data, error } = await this.supabase
      .from('users' as any)
      .select('*')
      .gte('updated_at', thirtyDaysAgo.toISOString())
      .limit(limit)
      .order('updated_at', { ascending: false });

    if (error) throw error;
    return ((data || []) as unknown) as UserRecord[];
  }
}
