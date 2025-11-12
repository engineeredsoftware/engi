/**
 * USERS MODEL - User management with production features
 * 
 * @doc-code
 * type: orm-model
 * table: users
 * capabilities: ["auth", "profile", "organization"]
 */

import { BaseModel } from './base';
import { Tables, Database } from '../types/database';
import { SupabaseClient } from '@supabase/supabase-js';

export class UsersModel extends BaseModel<'users'> {
  constructor(supabase: SupabaseClient<Database>) {
    super(supabase, 'users');
  }

  /**
   * Find user by email
   */
  async findByEmail(email: string): Promise<Tables<'users'> | null> {
    return this.findOneBy('email', email);
  }

  /**
   * Get users by organization
   */
  async findByOrganization(organizationId: string): Promise<Tables<'users'>[]> {
    return this.findBy('organization_id', organizationId);
  }

  /**
   * Update user profile
   */
  async updateProfile(userId: string, profile: {
    full_name?: string;
    avatar_url?: string;
    metadata?: Record<string, unknown>;
  }): Promise<Tables<'users'>> {
    return this.update(userId, profile);
  }

  /**
   * Assign user to organization
   */
  async assignToOrganization(
    userId: string, 
    organizationId: string
  ): Promise<Tables<'users'>> {
    return this.update(userId, { organization_id: organizationId });
  }

  /**
   * Get active users (logged in within last 30 days)
   */
  async getActiveUsers(limit = 100): Promise<Tables<'users'>[]> {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .gte('updated_at', thirtyDaysAgo.toISOString())
      .limit(limit)
      .order('updated_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }
}