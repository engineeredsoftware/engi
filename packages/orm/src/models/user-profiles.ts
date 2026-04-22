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
import { mergeBitcodeProfileSettings } from '../profile-contract';

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
      .eq('id', userId)
      .maybeSingle();

    if (error) throw error;
    return data;
  }

  /**
   * Upsert user profile
   */
  async upsert(
    profile: Partial<UserProfileInsert> & {
      user_id?: string;
      displayName?: string;
      avatarUrl?: string;
      company_name?: string;
      companyName?: string;
      team_members?: unknown[];
      teamMembers?: unknown[];
      email?: string | null;
      wallet_address?: string | null;
      walletAddress?: string | null;
      wallet_provider?: string | null;
      walletProvider?: string | null;
      wallet_binding_status?: 'pending' | 'manual' | 'verified' | null;
      walletBindingStatus?: 'pending' | 'manual' | 'verified' | null;
      wallet_bound_at?: string | null;
      walletBoundAt?: string | null;
      isVerified?: boolean;
      is_admin?: boolean;
      [key: string]: unknown;
    }
  ): Promise<UserProfile> {
    const id = String(profile.id ?? profile.user_id);
    const existing = await this.getByUserId(id);
    const walletAddress =
      (profile.wallet_address as string | null | undefined) ??
      (profile.walletAddress as string | null | undefined);
    const walletProvider =
      (profile.wallet_provider as string | null | undefined) ??
      (profile.walletProvider as string | null | undefined);
    const walletBindingStatus =
      (profile.wallet_binding_status as 'pending' | 'manual' | 'verified' | null | undefined) ??
      (profile.walletBindingStatus as 'pending' | 'manual' | 'verified' | null | undefined);
    const walletBoundAt =
      (profile.wallet_bound_at as string | null | undefined) ??
      (profile.walletBoundAt as string | null | undefined);
    const nextSettings = mergeBitcodeProfileSettings(
      {
        ...((existing?.settings as Record<string, unknown> | null) || {}),
        ...(profile.settings as Record<string, unknown> | undefined),
        is_admin: profile.is_admin ?? (existing?.settings as Record<string, unknown> | undefined)?.is_admin,
      },
      {
        companyName: profile.company_name ?? profile.companyName,
        teamMembers: profile.team_members ?? profile.teamMembers,
        email: (profile.email as string | null | undefined) ?? undefined,
        isVerified: profile.isVerified,
        walletBinding:
          walletAddress === undefined &&
          walletProvider === undefined &&
          walletBindingStatus === undefined &&
          walletBoundAt === undefined
            ? undefined
            : walletAddress
              ? {
                  address: walletAddress,
                  provider: walletProvider ?? null,
                  status: walletBindingStatus ?? 'manual',
                  boundAt: walletBoundAt ?? new Date().toISOString(),
                }
              : null,
      },
    );

    const payload: UserProfileUpdate & UserProfileInsert = {
      id,
      username: profile.username ?? existing?.username ?? null,
      display_name: (profile.display_name as string | undefined) ?? profile.displayName ?? existing?.display_name ?? null,
      bio: (profile.bio as string | undefined) ?? existing?.bio ?? null,
      avatar_url: (profile.avatar_url as string | undefined) ?? profile.avatarUrl ?? existing?.avatar_url ?? null,
      role: (profile.role as string | undefined) ?? existing?.role ?? null,
      settings: nextSettings,
      onboarded_steps: (profile.onboarded_steps as string | undefined) ?? existing?.onboarded_steps ?? null,
      updated_at: new Date().toISOString()
    };

    if (existing) {
      return this.update(id, payload);
    }

    return this.create({
      ...payload,
      created_at: new Date().toISOString()
    });
  }

  /**
   * Check if user is admin
   */
  async isAdmin(userId: string): Promise<boolean> {
    const profile = await this.getByUserId(userId);
    return profile?.role === 'admin' || (profile?.settings as any)?.is_admin === true;
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
