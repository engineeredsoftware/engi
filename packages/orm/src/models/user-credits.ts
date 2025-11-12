/**
 * User Credits Model
 * 
 * Manages user credit balances.
 * 
 * @doc-code
 * type: model
 * table: user_credits
 */

import { BaseModel } from './base';
import { Tables, Insertable, Updatable, Database } from '../types/database';
import { SupabaseClient } from '@supabase/supabase-js';
import { UserCreditUsagesModel } from './user-credit-usages';

export type UserCredits = Tables<'user_credits'>;
export type UserCreditsInsert = Insertable<'user_credits'>;
export type UserCreditsUpdate = Updatable<'user_credits'>;

export class UserCreditsModel extends BaseModel<'user_credits'> {
  private usages: UserCreditUsagesModel;

  constructor(supabase: SupabaseClient<Database>) {
    super(supabase, 'user_credits');
    this.usages = new UserCreditUsagesModel(supabase);
  }

  /**
   * Get credits by user ID
   */
  async getByUserId(userId: string): Promise<UserCredits | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) throw error;
    return data;
  }

  /**
   * Get or create credits for user
   */
  async getOrCreate(userId: string): Promise<UserCredits> {
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
   * Add credits to user account
   */
  async addCredits(userId: string, amount: number, description: string): Promise<number> {
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
    await this.usages.create({
      user_id: userId,
      amount,
      operation_type: amount >= 0 ? 'ADD' : 'DEDUCT',
      metadata: { description, balance: newBalance }
    } as any);

    return newBalance;
  }

  /**
   * Deduct credits from user account
   */
  async deductCredits(userId: string, amount: number, description: string): Promise<number> {
    return this.addCredits(userId, -amount, description);
  }

  /**
   * Check if user has sufficient credits
   */
  async hasCredits(userId: string, amount: number): Promise<boolean> {
    const credits = await this.getByUserId(userId);
    return (credits?.balance || 0) >= amount;
  }
}
