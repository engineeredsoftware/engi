/**
 * BASE MODEL - Foundation for all ORM models
 *
 * Production-grade base class providing common functionality
 * for all database models with type safety and best practices.
 *
 * @doc-code
 * type: orm-base
 * category: database
 * pattern: active-record
 */
import { SupabaseClient } from '@supabase/supabase-js';
import { Database, TableName, Tables, Insertable, Updatable } from '../types/database';
export declare abstract class BaseModel<T extends TableName> {
    protected readonly supabase: SupabaseClient<Database>;
    protected readonly tableName: T;
    protected readonly client: SupabaseClient<Database>;
    protected readonly table: T;
    constructor(supabase: SupabaseClient<Database>, tableName: T);
    /**
     * Find a single record by ID
     */
    findById(id: string): Promise<Tables<T> | null>;
    /**
     * Alias for callers that prefer get-style model reads.
     */
    getById(id: string): Promise<Tables<T> | null>;
    /**
     * Find all records with optional filtering
     */
    findAll(options?: {
        limit?: number;
        offset?: number;
        orderBy?: keyof Tables<T>;
        ascending?: boolean;
    }): Promise<Tables<T>[]>;
    getAll(options?: {
        limit?: number;
        offset?: number;
        orderBy?: keyof Tables<T>;
        ascending?: boolean;
    }): Promise<Tables<T>[]>;
    /**
     * Create a new record
     */
    create(data: Insertable<T>): Promise<Tables<T>>;
    /**
     * Update a record by ID
     */
    update(id: string, data: Updatable<T>): Promise<Tables<T>>;
    /**
     * Delete a record by ID
     */
    delete(id: string): Promise<void>;
    /**
     * Count records with optional filtering
     */
    count(filter?: Partial<Tables<T>>): Promise<number>;
    /**
     * Check if a record exists
     */
    exists(id: string): Promise<boolean>;
    /**
     * Batch create records
     */
    createMany(data: Insertable<T>[]): Promise<Tables<T>[]>;
    /**
     * Find records by a specific field
     */
    findBy<K extends keyof Tables<T>>(field: K, value: Tables<T>[K]): Promise<Tables<T>[]>;
    /**
     * Find a single record by a specific field
     */
    findOneBy<K extends keyof Tables<T>>(field: K, value: Tables<T>[K]): Promise<Tables<T> | null>;
    /**
     * Execute a raw query (use with caution)
     */
    protected rawQuery<R = unknown>(query: string, params?: unknown[]): Promise<R[]>;
}
