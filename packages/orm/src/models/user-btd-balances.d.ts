/**
 * User BTD Balances Model
 *
 * Manages user `$BTD` balances through the compatibility table `user_credits`
 * until the persistence schema is renamed forward.
 *
 * @doc-code
 * type: model
 * table: user_credits
 */
import { BaseModel } from './base';
import { Tables, Insertable, Updatable, Database } from '../types/database';
import { SupabaseClient } from '@supabase/supabase-js';
export type UserBtdBalance = Tables<'user_credits'>;
export type UserBtdBalanceInsert = Insertable<'user_credits'>;
export type UserBtdBalanceUpdate = Updatable<'user_credits'>;
export declare class UserBtdBalancesModel extends BaseModel<'user_credits'> {
    private transactions;
    constructor(supabase: SupabaseClient<Database>);
    /**
     * Get BTD balance by user ID
     */
    getByUserId(userId: string): Promise<UserBtdBalance | null>;
    /**
     * Get or create a BTD balance record for a user
     */
    getOrCreate(userId: string): Promise<UserBtdBalance>;
    /**
     * Add BTD to user account
     */
    addBtdBalance(userId: string, amount: number, description: string): Promise<number>;
    /**
     * Deduct BTD from user account
     */
    deductBtdBalance(userId: string, amount: number, description: string): Promise<number>;
    /**
     * Check if user has sufficient BTD
     */
    hasAvailableBtd(userId: string, amount: number): Promise<boolean>;
}
