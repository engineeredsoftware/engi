/**
 * DELIVERABLES MODEL - Deliverable pipeline management
 *
 * @doc-code
 * type: orm-model
 * table: deliverables
 * capabilities: ["execution", "effectiveness", "scheduling"]
 */
import { BaseModel } from './base';
import { Tables, Database, Insertable, Updatable } from '../types/database';
import { SupabaseClient } from '@supabase/supabase-js';
export type DeliverableCompatibility = Tables<'deliverables'> & {
    name: string;
    metadata?: Record<string, any> | null;
    organization_id?: string | null;
};
export declare class DeliverablesModel extends BaseModel<'deliverables'> {
    constructor(supabase: SupabaseClient<Database>);
    getById(id: string): Promise<DeliverableCompatibility | null>;
    findAll(options?: {
        limit?: number;
        offset?: number;
        orderBy?: keyof Tables<'deliverables'>;
        ascending?: boolean;
    }): Promise<DeliverableCompatibility[]>;
    getAll(options?: {
        limit?: number;
        offset?: number;
        orderBy?: keyof Tables<'deliverables'>;
        ascending?: boolean;
    }): Promise<DeliverableCompatibility[]>;
    create(data: (Insertable<'deliverables'> & {
        name?: string;
        metadata?: Record<string, any>;
        organization_id?: string | null;
    }) | any): Promise<DeliverableCompatibility>;
    update(id: string, data: (Updatable<'deliverables'> & {
        name?: string;
        metadata?: Record<string, any>;
        organization_id?: string | null;
    }) | any): Promise<DeliverableCompatibility>;
    /**
     * Find deliverables by organization
     */
    findByOrganization(organizationId: string, options?: {
        status?: Tables<'deliverables'>['status'];
        limit?: number;
    }): Promise<DeliverableCompatibility[]>;
    /**
     * Find deliverables by repository
     */
    findByRepository(repositoryId: string): Promise<DeliverableCompatibility[]>;
    /**
     * Update deliverable status
     */
    updateStatus(deliverableId: string, status: Tables<'deliverables'>['status']): Promise<DeliverableCompatibility>;
    /**
     * Update effectiveness score
     */
    updateEffectiveness(deliverableId: string, score: number): Promise<DeliverableCompatibility>;
    /**
     * Mark as recently run
     */
    markAsRun(deliverableId: string): Promise<DeliverableCompatibility>;
    /**
     * Get high-performing deliverables
     */
    getHighPerformers(limit?: number): Promise<DeliverableCompatibility[]>;
    /**
     * Get deliverables needing attention
     */
    getNeedingAttention(): Promise<DeliverableCompatibility[]>;
    /**
     * Get deliverable statistics by organization
     */
    getStatsByOrganization(organizationId: string): Promise<{
        total: number;
        byStatus: Record<string, number>;
        avgEffectiveness: number;
    }>;
    /**
     * Clone a deliverable
     */
    clone(deliverableId: string, overrides?: Partial<Tables<'deliverables'>>): Promise<DeliverableCompatibility>;
}
