/**
 * User Credit Usages Model
 * 
 * Tracks credit transaction history.
 * 
 * @doc-code
 * type: model
 * table: user_credit_usages
 */

import { BaseModel } from './base';
import { Tables, Insertable, Updatable } from '../types/database';

export type UserCreditUsage = Tables<'user_credit_usages'>;
export type UserCreditUsageInsert = Insertable<'user_credit_usages'>;
export type UserCreditUsageUpdate = Updatable<'user_credit_usages'>;

export class UserCreditUsagesModel extends BaseModel<'user_credit_usages'> {
  constructor(supabase: any) {
    super(supabase, 'user_credit_usages');
  }

  /**
   * Get recent usage for user
   */
  async getRecentByUserId(userId: string, limit = 20): Promise<UserCreditUsage[]> {
    const { data, error } = await this.client
      .from(this.table)
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }

  /**
   * Get usage statistics for date range
   */
  async getUsageStats(userId: string, startDate: Date): Promise<{
    total: number;
    daily: Array<{ date: string; amount: number }>;
  }> {
    const { data, error } = await this.client
      .from(this.table)
      .select('amount, created_at')
      .eq('user_id', userId)
      .lt('amount', 0) // Only debits
      .gte('created_at', startDate.toISOString())
      .order('created_at');

    if (error) throw error;

    // Calculate total
    const total = data?.reduce((sum, u: any) => sum + Math.abs(u.amount), 0) || 0;

    // Group by day
    const dailyMap = new Map<string, number>();
    data?.forEach(usage => {
      const date = new Date(usage.created_at).toISOString().split('T')[0];
      const current = dailyMap.get(date) || 0;
      dailyMap.set(date, current + Math.abs((usage as any).amount));
    });

    const daily = Array.from(dailyMap.entries())
      .map(([date, amount]) => ({ date, amount }))
      .sort((a, b) => a.date.localeCompare(b.date));

    return { total, daily };
  }

  /**
   * Get total credits used in period
   */
  async getTotalUsed(userId: string, days: number): Promise<number> {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const { data, error } = await this.client
      .from(this.table)
      .select('amount')
      .eq('user_id', userId)
      .lt('amount', 0) // Only debits
      .gte('created_at', startDate.toISOString());

    if (error) throw error;
    
    return data?.reduce((sum, u: any) => sum + Math.abs(u.amount), 0) || 0;
  }
}
