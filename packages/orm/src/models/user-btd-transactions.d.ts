/**
 * User BTD Transactions Model
 *
 * Tracks `$BTD` transaction history through the compatibility table
 * `user_credit_usages` until the persistence schema is renamed forward.
 *
 * @doc-code
 * type: model
 * table: user_credit_usages
 */
import { BaseModel } from './base';
import { Tables, Insertable, Updatable } from '../types/database';
export type UserBtdTransaction = Tables<'user_credit_usages'>;
export type UserBtdTransactionInsert = Insertable<'user_credit_usages'>;
export type UserBtdTransactionUpdate = Updatable<'user_credit_usages'>;
export declare class UserBtdTransactionsModel extends BaseModel<'user_credit_usages'> {
    constructor(supabase: any);
    /**
     * Get recent usage for user
     */
    getRecentByUserId(userId: string, limit?: number): Promise<UserBtdTransaction[]>;
    /**
     * Get usage statistics for date range
     */
    getUsageStats(userId: string, startDate: Date): Promise<{
        total: number;
        daily: Array<{
            date: string;
            amount: number;
        }>;
    }>;
    /**
     * Get total `$BTD` used in period
     */
    getTotalUsed(userId: string, days: number): Promise<number>;
}
