/**
 * User BTD Balances Model
 *
 * Reads the non-canonical aggregate `$BTD` holding posture carried by the
 * storage table `user_credits`.
 *
 * V27 tokenomics truth belongs to `BtdRegistryModel` and the registry
 * cell/range tables. This model remains a compatibility read corridor only and
 * must not mint, debit, transfer, or settle `$BTD`.
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

export class UserBtdBalancesModel extends BaseModel<'user_credits'> {
  constructor(supabase: SupabaseClient<Database>) {
    super(supabase, 'user_credits');
  }

  /**
   * Get compatibility holding posture by user ID.
   */
  async getByUserId(userId: string): Promise<UserBtdBalance | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) throw error;
    return data;
  }

  async readBtdHoldingAmount(userId: string): Promise<number> {
    const balance = await this.getByUserId(userId);
    return typeof balance?.balance === 'number' ? balance.balance : 0;
  }
}
