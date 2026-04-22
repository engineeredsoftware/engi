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
export declare class NotificationsModel extends BaseModel<'notifications'> {
    constructor(supabase: SupabaseClient<Database>);
    /**
     * Create notification
     */
    create(notification: NotificationInsert): Promise<Notification>;
    /**
     * List notifications for user
     */
    listByUserId(userId: string, options?: {
        unreadOnly?: boolean;
        limit?: number;
        offset?: number;
    }): Promise<{
        data: Notification[];
        count: number;
    }>;
    /**
     * Mark notification as read
     */
    markAsRead(notificationId: string, userId: string): Promise<void>;
    /**
     * Mark all notifications as read
     */
    markAllAsRead(userId: string): Promise<number>;
    /**
     * Delete old read notifications
     */
    deleteOldRead(userId: string, daysOld?: number): Promise<number>;
    /**
     * Get unread count
     */
    getUnreadCount(userId: string): Promise<number>;
}
