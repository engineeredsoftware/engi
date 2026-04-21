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
import { log } from '@bitcode/logger';

export abstract class BaseModel<T extends TableName> {
  protected readonly tableName: T;
  protected readonly client: SupabaseClient<Database>;
  protected readonly table: T;
  
  constructor(
    protected readonly supabase: SupabaseClient<Database>,
    tableName: T
  ) {
    this.tableName = tableName;
    this.client = supabase;
    this.table = tableName;
  }

  /**
   * Find a single record by ID
   */
  async findById(id: string): Promise<Tables<T> | null> {
    const { data, error } = await (this.supabase as any)
      .from(this.tableName as string)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // Not found
      }
      throw error;
    }

    return data as Tables<T>;
  }

  /**
   * Alias for findById for backward compatibility
   */
  async getById(id: string): Promise<Tables<T> | null> {
    return this.findById(id);
  }

  /**
   * Find all records with optional filtering
   */
  async findAll(options?: {
    limit?: number;
    offset?: number;
    orderBy?: keyof Tables<T>;
    ascending?: boolean;
  }): Promise<Tables<T>[]> {
    let query = (this.supabase as any).from(this.tableName as string).select('*');

    if (options?.orderBy) {
      query = query.order(options.orderBy as string, { 
        ascending: options.ascending ?? true 
      });
    }

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    if (options?.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
    }

    const { data, error } = await query;

    if (error) throw error;

    return (data || []) as Tables<T>[];
  }

  /**
   * Create a new record
   */
  async create(data: Insertable<T>): Promise<Tables<T>> {
    const { data: created, error } = await (this.supabase as any)
      .from(this.tableName as string)
      .insert(data as any)
      .select()
      .single();

    if (error) throw error;

    log(`Created ${this.tableName} record`, 'info', { id: (created as any)?.id });
    
    return created as Tables<T>;
  }

  /**
   * Update a record by ID
   */
  async update(id: string, data: Updatable<T>): Promise<Tables<T>> {
    const { data: updated, error } = await (this.supabase as any)
      .from(this.tableName as string)
      .update(data as any)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    log(`Updated ${this.tableName} record`, 'info', { id });
    
    return updated as Tables<T>;
  }

  /**
   * Delete a record by ID
   */
  async delete(id: string): Promise<void> {
    const { error } = await (this.supabase as any)
      .from(this.tableName as string)
      .delete()
      .eq('id', id);

    if (error) throw error;

    log(`Deleted ${this.tableName} record`, 'info', { id });
  }

  /**
   * Count records with optional filtering
   */
  async count(filter?: Partial<Tables<T>>): Promise<number> {
    let query = (this.supabase as any)
      .from(this.tableName as string)
      .select('id', { count: 'exact', head: true });

    // Apply filters
    if (filter) {
      Object.entries(filter).forEach(([key, value]) => {
        query = query.eq(key, value);
      });
    }

    const { count, error } = await query;

    if (error) throw error;

    return count || 0;
  }

  /**
   * Check if a record exists
   */
  async exists(id: string): Promise<boolean> {
    const { data, error } = await (this.supabase as any)
      .from(this.tableName as string)
      .select('id')
      .eq('id', id)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    return !!data;
  }

  /**
   * Batch create records
   */
  async createMany(data: Insertable<T>[]): Promise<Tables<T>[]> {
    const { data: created, error } = await (this.supabase as any)
      .from(this.tableName as string)
      .insert(data as any)
      .select();

    if (error) throw error;

    log(`Batch created ${created?.length || 0} ${this.tableName} records`, 'info');
    
    return (created || []) as Tables<T>[];
  }

  /**
   * Find records by a specific field
   */
  async findBy<K extends keyof Tables<T>>(
    field: K,
    value: Tables<T>[K]
  ): Promise<Tables<T>[]> {
    const { data, error } = await (this.supabase as any)
      .from(this.tableName as string)
      .select('*')
      .eq(field as string, value);

    if (error) throw error;

    return (data || []) as Tables<T>[];
  }

  /**
   * Find a single record by a specific field
   */
  async findOneBy<K extends keyof Tables<T>>(
    field: K,
    value: Tables<T>[K]
  ): Promise<Tables<T> | null> {
    const records = await this.findBy(field, value);
    return records[0] || null;
  }

  /**
   * Execute a raw query (use with caution)
   */
  protected async rawQuery<R = unknown>(
    query: string,
    params?: unknown[]
  ): Promise<R[]> {
    const { data, error } = await (this.supabase as any).rpc('execute_sql', {
      query,
      params
    });

    if (error) throw error;

    return data as R[];
  }
}
