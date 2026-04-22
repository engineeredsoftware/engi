/**
 * VCS Repositories Model
 *
 * Manages version control system repository metadata for connected repos.
 * Supports GitHub, GitLab, Bitbucket integration.
 *
 * @package @bitcode/orm
 */
import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database.generated';
export type VCSRepository = Database['public']['Tables']['vcs_repositories']['Row'];
export type VCSRepositoryInsert = Database['public']['Tables']['vcs_repositories']['Insert'];
export type VCSRepositoryUpdate = Database['public']['Tables']['vcs_repositories']['Update'];
export interface VCSRepositoryMetadata {
    description?: string;
    language?: string;
    topics?: string[];
    stars?: number;
    forks?: number;
    isPrivate?: boolean;
    lastSyncedAt?: string;
}
/**
 * Repository model for CRUD operations
 */
export declare class VCSRepositoryModel {
    private supabase;
    constructor(supabase: ReturnType<typeof createClient<Database>>);
    /**
     * Find repository by full name (owner/repo)
     */
    findByFullName(userId: string, provider: string, fullName: string): Promise<VCSRepository | null>;
    /**
     * List all repositories for a user
     */
    listByUser(userId: string, provider?: string): Promise<VCSRepository[]>;
    /**
     * Create or update repository
     */
    upsert(repo: VCSRepositoryInsert): Promise<VCSRepository>;
    /**
     * Update repository metadata
     */
    updateMetadata(id: string, metadata: Partial<VCSRepositoryMetadata>): Promise<VCSRepository>;
    /**
     * Delete repository
     */
    delete(id: string): Promise<void>;
    /**
     * Search repositories by name
     */
    search(userId: string, query: string, limit?: number): Promise<VCSRepository[]>;
}
export declare function getVCSRepositoryModel(supabase: ReturnType<typeof createClient<Database>>): VCSRepositoryModel;
