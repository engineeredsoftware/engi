/**
 * User Profiles Model
 * 
 * Manages user profile data including username, bio, and settings.
 * 
 * @doc-code
 * type: model
 * table: user_profiles
 */

import { BaseModel } from './base';
import { Tables, Insertable, Updatable } from '../types/database';

export type UserProfile = Tables<'user_profiles'>;
export type UserProfileInsert = Insertable<'user_profiles'>;
export type UserProfileUpdate = Updatable<'user_profiles'>;

export class UserProfilesModel extends BaseModel<'user_profiles'> {
  constructor(supabase: any) {
    super(supabase, 'user_profiles');
  }

  /**
   * Get profile by user ID
   */
  async getByUserId(userId: string): Promise<UserProfile | null> {
    const { data, error } = await this.client
      .from(this.table)
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) throw error;
    return data;
  }

  /**
   * Upsert user profile
   */
  async upsert(profile: UserProfileInsert): Promise<UserProfile> {
    const { data, error } = await this.client
      .from(this.table)
      .upsert({
        ...profile,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id'
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Check if user is admin
   */
  async isAdmin(userId: string): Promise<boolean> {
    const profile = await this.getByUserId(userId);
    return profile?.is_admin === true || profile?.role === 'admin';
  }

  /**
   * Search profiles by username
   */
  async searchByUsername(query: string, limit = 10): Promise<UserProfile[]> {
    const { data, error } = await this.client
      .from(this.table)
      .select('*')
      .ilike('username', `%${query}%`)
      .limit(limit);

    if (error) throw error;
    return data || [];
  }
}