/**
 * User Model Preferences Model
 * 
 * Manages user preferences for AI models.
 * 
 * @doc-code
 * type: model
 * table: user_model_preferences
 */

import { BaseModel } from './base';
import { Tables, Insertable, Updatable } from '../types/database';

export type UserModelPreferences = Tables<'user_model_preferences'>;
export type UserModelPreferencesInsert = Insertable<'user_model_preferences'>;
export type UserModelPreferencesUpdate = Updatable<'user_model_preferences'>;

export class UserModelPreferencesModel extends BaseModel<'user_model_preferences'> {
  constructor(supabase: any) {
    super(supabase, 'user_model_preferences');
  }

  /**
   * Get preferences by user ID
   */
  async getByUserId(userId: string): Promise<UserModelPreferences | null> {
    const { data, error } = await this.client
      .from(this.table)
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) throw error;
    return data;
  }

  /**
   * Upsert preferences
   */
  async upsert(preferences: UserModelPreferencesInsert): Promise<UserModelPreferences> {
    const { data, error } = await this.client
      .from(this.table)
      .upsert({
        ...preferences,
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
   * Get default model for user
   */
  async getDefaultModel(userId: string): Promise<{
    provider: string;
    model: string;
  } | null> {
    const prefs = await this.getByUserId(userId);
    if (!prefs?.preferences) return null;

    return {
      provider: prefs.preferences.defaultProvider || 'openai',
      model: prefs.preferences.defaultModel || 'gpt-4'
    };
  }

  /**
   * Update specific preference
   */
  async updatePreference(
    userId: string, 
    key: string, 
    value: unknown
  ): Promise<UserModelPreferences> {
    const current = await this.getByUserId(userId);
    const preferences = current?.preferences || {};

    preferences[key] = value;

    return this.upsert({
      user_id: userId,
      preferences
    });
  }
}