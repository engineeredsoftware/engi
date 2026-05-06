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
import { Tables, Insertable, Updatable, type Json } from '../types/database';
export type UserProfile = Tables<'user_profiles'>;
export type UserProfileInsert = Insertable<'user_profiles'>;
export type UserProfileUpdate = Updatable<'user_profiles'>;
export type UserProfileReadModel = UserProfile & {
    email?: string | null;
    full_name?: string | null;
};
export declare class UserProfilesModel extends BaseModel<'user_profiles'> {
    constructor(supabase: any);
    /**
     * Get profile by user ID
     */
    getByUserId(userId: string): Promise<UserProfileReadModel | null>;
    /**
     * Upsert user profile
     */
    upsert(profile: Partial<UserProfileInsert> & {
        user_id?: string;
        displayName?: string;
        avatarUrl?: string;
        company_name?: string;
        companyName?: string;
        team_members?: Json[];
        teamMembers?: Json[];
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
    }): Promise<UserProfile>;
    /**
     * Check if user is admin
     */
    isAdmin(userId: string): Promise<boolean>;
    /**
     * Search profiles by username
     */
    searchByUsername(query: string, limit?: number): Promise<UserProfile[]>;
}
