/**
 * User BTD Balances Model
 *
 * Manages user `$BTD` balances through the storage table `user_credits`
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
    constructor(supabase: SupabaseClient<Database>);
    /**
     * Get BTD balance by user ID
     */
    getByUserId(userId: string): Promise<UserBtdBalance | null>;
    readBtdHoldingAmount(userId: string): Promise<number>;
}
