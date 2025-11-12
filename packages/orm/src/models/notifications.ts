/**
 * Notifications Model
 * 
 * Manages user notifications.
 * 
 * @doc-code
 * type: model
 * table: notifications
 */

import { BaseModel } from './base';
import { Tables, Insertable, Updatable, Database } from '../types/database';
import { SupabaseClient } from '@supabase/supabase-js';

export type Notification = Tables<'notifications'>;
export type NotificationInsert = Insertable<'notifications'>;
export type NotificationUpdate = Updatable<'notifications'>;

export class NotificationsModel extends BaseModel<'notifications'> {
  constructor(supabase: SupabaseClient<Database>) {
    super(supabase, 'notifications');
  }

  /**
   * Create notification
   */
  async create(notification: NotificationInsert): Promise<Notification> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .insert(notification)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * List notifications for user
   */
  async listByUserId(userId: string, options?: {
    unreadOnly?: boolean;
    limit?: number;
    offset?: number;
  }): Promise<{ data: Notification[]; count: number }> {
    let query = this.supabase
      .from(this.tableName)
      .select('*', { count: 'exact' })
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (options?.unreadOnly) {
      query = query.is('read_at', null);
    }

    if (options?.offset !== undefined) {
      query = query.range(
        options.offset,
        options.offset + (options.limit || 20) - 1
      );
    } else if (options?.limit) {
      query = query.limit(options.limit);
    }

    const { data, error, count } = await query;

    if (error) throw error;
    return { 
      data: data || [], 
      count: count || 0 
    };
  }

  /**
   * Mark notification as read
   */
  async markAsRead(notificationId: string, userId: string): Promise<void> {
    const { error } = await this.supabase
      .from(this.tableName)
      .update({ 
        read_at: new Date().toISOString() 
      })
      .eq('id', notificationId)
      .eq('user_id', userId);

    if (error) throw error;
  }

  /**
   * Mark all notifications as read
   */
  async markAllAsRead(userId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from(this.tableName)
      .update({ 
        read_at: new Date().toISOString() 
      })
      .eq('user_id', userId)
      .is('read_at', null)
      .select('*', { count: 'exact', head: true });

    if (error) throw error;
    return count || 0;
  }

  /**
   * Delete old read notifications
   */
  async deleteOldRead(userId: string, daysOld = 30): Promise<number> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);

    const { count, error } = await this.supabase
      .from(this.tableName)
      .delete({ count: 'exact' })
      .eq('user_id', userId)
      .not('read_at', 'is', null)
      .lt('read_at', cutoffDate.toISOString());

    if (error) throw error;
    return count || 0;
  }

  /**
   * Get unread count
   */
  async getUnreadCount(userId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from(this.tableName)
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .is('read_at', null);

    if (error) throw error;
    return count || 0;
  }
}