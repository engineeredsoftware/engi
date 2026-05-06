/**
 * User BTD Transactions Model
 *
 * Reads non-canonical aggregate `$BTD` usage posture carried by the storage
 * table `user_credit_usages`.
 *
 * V27 tokenomics truth belongs to `BtdRegistryModel` and registry receipts.
 * This model remains a compatibility read corridor only and must not mint,
 * debit, transfer, or settle `$BTD`.
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
     * Get recent compatibility usage for user.
     */
    getRecentByUserId(userId: string, limit?: number): Promise<UserBtdTransaction[]>;
    /**
     * Get compatibility usage statistics for date range.
     */
    getUsageStats(userId: string, startDate: Date): Promise<{
        total: number;
        daily: Array<{
            date: string;
            amount: number;
        }>;
    }>;
    /**
     * Get total compatibility `$BTD` usage in period.
     */
    getTotalUsed(userId: string, days: number): Promise<number>;
}
