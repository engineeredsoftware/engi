/**
 * CREDITS MODEL - Credit management and tracking
 * 
 * @doc-code
 * type: orm-model
 * table: user_credits
 * capabilities: ["balance", "reservation", "usage"]
 */

import { BaseModel } from './base';
import { Tables, Database } from '../types/database';
import { logger } from '@engi/logger';
import { SupabaseClient } from '@supabase/supabase-js';

export class UserCreditsModel extends BaseModel<'user_credits'> {
  constructor(supabase: SupabaseClient<Database>) {
    super(supabase, 'user_credits');
  }

  /**
   * Get credits for a user
   */
  async getByUser(userId: string): Promise<Tables<'user_credits'> | null> {
    return this.findOneBy('user_id', userId);
  }

  /**
   * Get available balance (balance - reserved)
   */
  async getAvailableBalance(userId: string): Promise<number> {
    const credits = await this.getByUser(userId);
    if (!credits) return 0;
    return credits.balance - credits.reserved;
  }

  /**
   * Add credits to user balance
   */
  async addCredits(userId: string, amount: number): Promise<Tables<'user_credits'>> {
    const credits = await this.getByUser(userId);
    
    if (!credits) {
      // Create new credits record
      return this.create({
        user_id: userId,
        balance: amount,
        reserved: 0
      });
    }

    // Update existing balance
    return this.update(credits.id, {
      balance: credits.balance + amount
    });
  }

  /**
   * Use credits (deduct from balance)
   */
  async useCredits(
    userId: string,
    amount: number,
    purpose: string,
    metadata?: Record<string, unknown>
  ): Promise<boolean> {
    const credits = await this.getByUser(userId);
    if (!credits || credits.balance < amount) {
      return false; // Insufficient balance
    }

    // Deduct from balance
    await this.update(credits.id, {
      balance: credits.balance - amount
    });

    // Record usage
    await this.supabase
      .from('user_credit_usages')
      .insert({
        user_id: userId,
        amount,
        purpose,
        metadata
      });

    logger.info('Credits used', { userId, amount, purpose });
    return true;
  }

  /**
   * Get credits by organization
   */
  async getByOrganization(organizationId: string): Promise<Tables<'user_credits'>[]> {
    return this.findBy('organization_id', organizationId);
  }

  /**
   * Get total credits for organization
   */
  async getOrganizationTotal(organizationId: string): Promise<{
    totalBalance: number;
    totalReserved: number;
    totalAvailable: number;
  }> {
    const credits = await this.getByOrganization(organizationId);
    
    const totalBalance = credits.reduce((sum, c) => sum + c.balance, 0);
    const totalReserved = credits.reduce((sum, c) => sum + c.reserved, 0);
    
    return {
      totalBalance,
      totalReserved,
      totalAvailable: totalBalance - totalReserved
    };
  }
}

export class CreditReservationsModel extends BaseModel<'credit_reservations'> {
  constructor(supabase: SupabaseClient<Database>) {
    super(supabase, 'credit_reservations');
  }

  /**
   * Reserve credits for a purpose
   */
  async reserve(params: {
    userId: string;
    amount: number;
    purpose: string;
    durationMinutes?: number;
    metadata?: Record<string, unknown>;
  }): Promise<Tables<'credit_reservations'> | null> {
    // Check available balance
    const creditsModel = new UserCreditsModel(this.supabase);
    const available = await creditsModel.getAvailableBalance(params.userId);
    
    if (available < params.amount) {
      return null; // Insufficient balance
    }

    // Create reservation
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + (params.durationMinutes || 60));

    const reservation = await this.create({
      user_id: params.userId,
      amount: params.amount,
      purpose: params.purpose,
      expires_at: expiresAt.toISOString(),
      metadata: params.metadata
    });

    // Update reserved amount
    const credits = await creditsModel.getByUser(params.userId);
    if (credits) {
      await creditsModel.update(credits.id, {
        reserved: credits.reserved + params.amount
      });
    }

    logger.info('Credits reserved', { 
      userId: params.userId, 
      amount: params.amount, 
      purpose: params.purpose 
    });

    return reservation;
  }

  /**
   * Release a reservation
   */
  async release(reservationId: string): Promise<void> {
    const reservation = await this.findById(reservationId);
    if (!reservation || reservation.released_at) {
      return; // Already released or not found
    }

    // Update reservation
    await this.update(reservationId, {
      released_at: new Date().toISOString()
    });

    // Update user credits
    const creditsModel = new UserCreditsModel(this.supabase);
    const credits = await creditsModel.getByUser(reservation.user_id);
    if (credits) {
      await creditsModel.update(credits.id, {
        reserved: Math.max(0, credits.reserved - reservation.amount)
      });
    }

    logger.info('Credits released', { 
      reservationId, 
      userId: reservation.user_id, 
      amount: reservation.amount 
    });
  }

  /**
   * Confirm a reservation (convert to usage)
   */
  async confirm(
    reservationId: string,
    actualAmount?: number
  ): Promise<boolean> {
    const reservation = await this.findById(reservationId);
    if (!reservation || reservation.released_at) {
      return false;
    }

    const amountToUse = actualAmount ?? reservation.amount;

    // Release the reservation first
    await this.release(reservationId);

    // Use the credits
    const creditsModel = new UserCreditsModel(this.supabase);
    return creditsModel.useCredits(
      reservation.user_id,
      amountToUse,
      reservation.purpose,
      {
        ...reservation.metadata,
        reservationId
      }
    );
  }

  /**
   * Clean up expired reservations
   */
  async cleanupExpired(): Promise<number> {
    const { data: expired } = await this.supabase
      .from(this.tableName)
      .select('*')
      .is('released_at', null)
      .lt('expires_at', new Date().toISOString());

    if (!expired || expired.length === 0) return 0;

    // Release each expired reservation
    for (const reservation of expired) {
      await this.release(reservation.id);
    }

    logger.info(`Cleaned up ${expired.length} expired credit reservations`);
    return expired.length;
  }

  /**
   * Get active reservations for a user
   */
  async getActiveByUser(userId: string): Promise<Tables<'credit_reservations'>[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('user_id', userId)
      .is('released_at', null)
      .gt('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }
}

export class UserCreditUsagesModel extends BaseModel<'user_credit_usages'> {
  constructor(supabase: SupabaseClient<Database>) {
    super(supabase, 'user_credit_usages');
  }

  /**
   * Get usage history for a user
   */
  async getByUser(
    userId: string,
    options?: {
      limit?: number;
      startDate?: Date;
      endDate?: Date;
    }
  ): Promise<Tables<'user_credit_usages'>[]> {
    let query = this.supabase
      .from(this.tableName)
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    if (options?.startDate) {
      query = query.gte('created_at', options.startDate.toISOString());
    }

    if (options?.endDate) {
      query = query.lte('created_at', options.endDate.toISOString());
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  /**
   * Get usage statistics
   */
  async getStats(
    userId: string,
    period: 'day' | 'week' | 'month' | 'all' = 'month'
  ): Promise<{
    totalUsed: number;
    byPurpose: Record<string, number>;
    dailyAverage: number;
  }> {
    const startDate = new Date();
    
    switch (period) {
      case 'day':
        startDate.setDate(startDate.getDate() - 1);
        break;
      case 'week':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(startDate.getMonth() - 1);
        break;
    }

    const usages = period === 'all' 
      ? await this.getByUser(userId)
      : await this.getByUser(userId, { startDate });

    const totalUsed = usages.reduce((sum, u) => sum + u.amount, 0);
    
    const byPurpose = usages.reduce((acc, u) => {
      acc[u.purpose] = (acc[u.purpose] || 0) + u.amount;
      return acc;
    }, {} as Record<string, number>);

    const days = period === 'all' ? 30 : 
      period === 'day' ? 1 :
      period === 'week' ? 7 : 30;
    
    const dailyAverage = totalUsed / days;

    return {
      totalUsed,
      byPurpose,
      dailyAverage
    };
  }
}