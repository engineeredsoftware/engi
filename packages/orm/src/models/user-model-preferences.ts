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
import { Tables, Insertable, Updatable, Json } from '../types/database';

export type UserModelPreference = Tables<'user_model_preferences'> & {
  preferences?: Record<string, unknown>;
};
export type UserModelPreferenceInsert = Omit<
  Insertable<'user_model_preferences'>,
  'model_provider' | 'model_name'
> & {
  model_provider?: string;
  model_name?: string;
  preferences?: Record<string, unknown>;
};
export type UserModelPreferenceUpdate = Updatable<'user_model_preferences'> & {
  preferences?: Record<string, unknown>;
};

function hydratePreferenceRow(
  row: Tables<'user_model_preferences'> | null
): UserModelPreference | null {
  if (!row) return null;
  const settings = ((row.settings as Record<string, unknown> | null) || {});
  return {
    ...row,
    preferences: {
      ...settings,
      defaultProvider: row.model_provider,
      defaultModel: row.model_name
    }
  };
}

export class UserModelPreferencesModel extends BaseModel<'user_model_preferences'> {
  constructor(supabase: any) {
    super(supabase, 'user_model_preferences');
  }

  /**
   * Get preferences by user ID
   */
  async getByUserId(userId: string): Promise<UserModelPreference | null> {
    const { data, error } = await this.client
      .from(this.table)
      .select('*')
      .eq('user_id', userId)
      .eq('is_default', true)
      .maybeSingle();

    if (error) throw error;
    return hydratePreferenceRow(data);
  }

  /**
   * Upsert preferences
   */
  async upsert(preferences: UserModelPreferenceInsert): Promise<UserModelPreference> {
    const existing = await this.getByUserId(preferences.user_id);
    const storedPreferenceOverrides = preferences.preferences || {};
    const modelProvider = preferences.model_provider
      || String(storedPreferenceOverrides.defaultProvider || existing?.model_provider || 'openai');
    const modelName = preferences.model_name
      || String(storedPreferenceOverrides.defaultModel || existing?.model_name || 'gpt-4');
    const payload = {
      user_id: preferences.user_id,
      model_provider: modelProvider,
      model_name: modelName,
      settings: {
        ...((existing?.settings as Record<string, unknown> | null) || {}),
        ...((preferences.settings as Record<string, unknown> | undefined) || {}),
        ...storedPreferenceOverrides
      } as Json,
      is_default: preferences.is_default ?? existing?.is_default ?? true,
      updated_at: new Date().toISOString()
    } satisfies UserModelPreferenceUpdate & Pick<
      Insertable<'user_model_preferences'>,
      'user_id' | 'model_provider' | 'model_name'
    >;

    const data = existing
      ? await this.update(existing.id, payload)
      : await this.create({
          ...payload,
          created_at: new Date().toISOString()
        });

    return hydratePreferenceRow(data)!;
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
      provider: String(prefs.preferences.defaultProvider || 'openai'),
      model: String(prefs.preferences.defaultModel || 'gpt-4')
    };
  }

  /**
   * Update specific preference
   */
  async updatePreference(
    userId: string, 
    key: string, 
    value: unknown
  ): Promise<UserModelPreference> {
    const current = await this.getByUserId(userId);
    const preferences = current?.preferences || {};

    preferences[key] = value;

    return this.upsert({
      user_id: userId,
      preferences,
      model_provider: current?.model_provider || 'openai',
      model_name: current?.model_name || 'gpt-4'
    });
  }
}
