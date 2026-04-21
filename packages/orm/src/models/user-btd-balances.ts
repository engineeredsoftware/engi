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
import { UserBtdTransactionsModel } from './user-btd-transactions';

export type UserBtdBalance = Tables<'user_credits'>;
export type UserBtdBalanceInsert = Insertable<'user_credits'>;
export type UserBtdBalanceUpdate = Updatable<'user_credits'>;

export class UserBtdBalancesModel extends BaseModel<'user_credits'> {
  private transactions: UserBtdTransactionsModel;

  constructor(supabase: SupabaseClient<Database>) {
    super(supabase, 'user_credits');
    this.transactions = new UserBtdTransactionsModel(supabase);
  }

  /**
   * Get BTD balance by user ID
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

  /**
   * Get or create a BTD balance record for a user
   */
  async getOrCreate(userId: string): Promise<UserBtdBalance> {
    const existing = await this.getByUserId(userId);
    if (existing) return existing;

    const { data, error } = await this.supabase
      .from(this.tableName)
      .insert({
        user_id: userId,
        balance: 0
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Add BTD to user account
   */
  async addBtdBalance(userId: string, amount: number, description: string): Promise<number> {
    // Get current balance
    const current = await this.getOrCreate(userId);
    const newBalance = (current.balance || 0) + amount;

    // Update balance
    const { error } = await this.supabase
      .from(this.tableName)
      .update({
        balance: newBalance,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId);

    if (error) throw error;

    // Record usage
    await this.transactions.create({
      user_id: userId,
      amount,
      operation_type: amount >= 0 ? 'ADD' : 'DEDUCT',
      metadata: { description, balance: newBalance }
    } as any);

    return newBalance;
  }

  /**
   * Deduct BTD from user account
   */
  async deductBtdBalance(userId: string, amount: number, description: string): Promise<number> {
    return this.addBtdBalance(userId, -amount, description);
  }

  /**
   * Check if user has sufficient BTD
   */
  async hasAvailableBtd(userId: string, amount: number): Promise<boolean> {
    const balance = await this.getByUserId(userId);
    return (balance?.balance || 0) >= amount;
  }
}
