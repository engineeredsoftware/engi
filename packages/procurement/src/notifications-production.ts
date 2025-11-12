/**
 * PRODUCTION-GRADE PROCUREMENT NOTIFICATION SYSTEM
 * 
 * Real-time notification system for procurement marketplace events
 */

import { supabaseAdmin } from '@engi/supabase';
import { log } from '@engi/logger';
import { telemetry } from '@engi/observability';
import { ProcurementErrorHandler, withErrorHandling } from './error-handling';
import { ProcurementMonitoring } from './monitoring';

interface NotificationData {
  userId: string;
  type: string;
  title: string;
  message: string;
  actionUrl?: string;
  metadata?: Record<string, any>;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  channels: string[];
}

interface ContributorMatchNotification {
  contributorId: string;
  requestId: string;
  matchScore: number;
  priority: 'high' | 'medium' | 'low';
  estimatedEarnings: number;
  deadline?: string;
  correlationId: string;
}

interface NewProposalNotification {
  proposalId: string;
  procurementRequestId: string;
  contributorId: string;
  proposedRate: number;
  estimatedHours: number;
  organizationId: string;
}

export class NotificationService {
  // TODO: Enable decorators when Next.js webpack configuration supports them
  // @withErrorHandling('notify_contributor_match', { 
  //   retryConfig: { maxAttempts: 3, retryableErrors: ['timeout', 'network', 'database'] },
  //   useCircuitBreaker: true,
  //   circuitBreakerKey: 'notifications'
  // })
  // @ProcurementMonitoring.measurePerformance('notify_contributor_match')
  async notifyContributorOfMatch(data: ContributorMatchNotification): Promise<void> {
    const correlationId = data.correlationId;

    try {
      log('Sending contributor match notification', 'info', {
        contributorId: data.contributorId,
        requestId: data.requestId,
        matchScore: data.matchScore,
        priority: data.priority,
        correlationId
      });

      // Get contributor profile and preferences
      const { data: profile } = await supabaseAdmin
        .from('user_profiles')
        .select('username, display_name')
        .eq('user_id', data.contributorId)
        .single();

      // Get request details
      const { data: request } = await supabaseAdmin
        .from('procurement_requests')
        .select(`
          title,
          description,
          estimated_reward,
          deadline,
          category,
          requirements
        `)
        .eq('id', data.requestId)
        .single();

      if (!profile || !request) {
        throw new Error('Failed to fetch notification data');
      }

      const notificationData: NotificationData = {
        userId: data.contributorId,
        type: 'procurement_match_found',
        title: '🎯 Perfect Project Match Found!',
        message: `We found a ${data.matchScore > 0.9 ? 'perfect' : 'great'} match for your skills: "${request.title}"`,
        actionUrl: `/procurement/requests/${data.requestId}`,
        metadata: {
          requestId: data.requestId,
          matchScore: data.matchScore,
          estimatedEarnings: data.estimatedEarnings,
          category: request.category,
          requirements: request.requirements.slice(0, 3),
          deadline: data.deadline
        },
        priority: data.priority,
        channels: ['in_app', 'email', 'websocket']
      };

      // Send notifications
      await this.sendInAppNotification(notificationData);
      await this.recordNotification(notificationData);

      // Record business metrics
      ProcurementMonitoring.recordBusinessEvent('contributor_notified', {
        matchScore: data.matchScore,
        priority: data.priority,
        estimatedEarnings: data.estimatedEarnings
      });

      telemetry.recordEvent('procurement_match_notification_sent', {
        contributorId: data.contributorId,
        requestId: data.requestId,
        matchScore: data.matchScore,
        priority: data.priority,
        correlationId
      });

    } catch (error) {
      log('Failed to send contributor match notification', 'error', {
        contributorId: data.contributorId,
        requestId: data.requestId,
        error: error instanceof Error ? error.message : String(error),
        correlationId
      });
      throw error;
    }
  }

  // TODO: Enable decorators when Next.js webpack configuration supports them
  // @withErrorHandling('notify_new_proposal', { 
  //   retryConfig: { maxAttempts: 2, retryableErrors: ['timeout', 'network'] },
  //   useCircuitBreaker: true,
  //   circuitBreakerKey: 'notifications'
  // })
  // @ProcurementMonitoring.measurePerformance('notify_new_proposal')
  async notifyOfNewProposal(data: NewProposalNotification): Promise<void> {
    const correlationId = `proposal_notif_${Date.now()}`;

    try {
      log('Sending new proposal notification', 'info', {
        proposalId: data.proposalId,
        procurementRequestId: data.procurementRequestId,
        contributorId: data.contributorId,
        correlationId
      });

      // Get organization admins
      const { data: orgAdmins } = await supabaseAdmin
        .from('organization_members')
        .select(`
          user_id,
          user_profiles!inner(
            username,
            display_name
          )
        `)
        .eq('organization_id', data.organizationId)
        .in('role', ['owner', 'admin']);

      // Get contributor profile
      const { data: contributor } = await supabaseAdmin
        .from('user_profiles')
        .select('username, display_name, avatar_url')
        .eq('user_id', data.contributorId)
        .single();

      // Get request details
      const { data: request } = await supabaseAdmin
        .from('procurement_requests')
        .select('title, description, estimated_reward')
        .eq('id', data.procurementRequestId)
        .single();

      if (!orgAdmins || !contributor || !request) {
        throw new Error('Failed to fetch notification data');
      }

      const totalCost = data.proposedRate * data.estimatedHours;

      // Notify each admin
      const notificationPromises = orgAdmins.map(async (admin) => {
        const notificationData: NotificationData = {
          userId: admin.user_id,
          type: 'proposal_submitted',
          title: '📋 New Proposal Received',
          message: `${contributor.display_name} submitted a proposal for "${request.title}"`,
          actionUrl: `/procurement/requests/${data.procurementRequestId}/proposals/${data.proposalId}`,
          metadata: {
            proposalId: data.proposalId,
            requestId: data.procurementRequestId,
            contributorName: contributor.display_name,
            contributorUsername: contributor.username,
            proposedRate: data.proposedRate,
            estimatedHours: data.estimatedHours,
            totalCost,
            requestTitle: request.title
          },
          priority: 'medium',
          channels: ['in_app', 'email']
        };

        await this.sendInAppNotification(notificationData);
        await this.recordNotification(notificationData);
      });

      await Promise.all(notificationPromises);

      // Record business metrics
      ProcurementMonitoring.recordBusinessEvent('proposal_notification_sent', {
        proposalId: data.proposalId,
        notifiedAdmins: orgAdmins.length,
        totalCost
      });

      log('New proposal notifications sent successfully', 'info', {
        proposalId: data.proposalId,
        notifiedAdmins: orgAdmins.length,
        correlationId
      });

    } catch (error) {
      log('Failed to send new proposal notification', 'error', {
        proposalId: data.proposalId,
        error: error instanceof Error ? error.message : String(error),
        correlationId
      });
      throw error;
    }
  }

  // TODO: Enable decorators when Next.js webpack configuration supports them
  // @withErrorHandling('notify_manual_review', { 
  //   retryConfig: { maxAttempts: 3, retryableErrors: ['timeout', 'network', 'database'] },
  //   useCircuitBreaker: true,
  //   circuitBreakerKey: 'notifications'
  // })
  // @ProcurementMonitoring.measurePerformance('notify_manual_review')
  async notifyAdminsOfManualReview(requestId: string, reason: string): Promise<void> {
    const correlationId = `manual_review_${Date.now()}`;

    try {
      log('Sending manual review notification', 'info', {
        requestId,
        reason,
        correlationId
      });

      const { data: request } = await supabaseAdmin
        .from('procurement_requests')
        .select('title, organization_id, estimated_reward')
        .eq('id', requestId)
        .single();

      if (!request) {
        throw new Error('Failed to fetch request data');
      }

      // Notify organization admins instead of system admins
      const { data: orgAdmins } = await supabaseAdmin
        .from('organization_members')
        .select('user_id, user_profiles!inner(username, display_name)')
        .eq('organization_id', request.organization_id)
        .in('role', ['owner', 'admin']);

      if (!orgAdmins) {
        throw new Error('Failed to fetch admin notification data');
      }

      const notificationPromises = orgAdmins.map(async (admin) => {
        const notificationData: NotificationData = {
          userId: admin.user_id,
          type: 'manual_review_required',
          title: '⚠️ Manual Review Required',
          message: `Procurement request "${request.title}" requires manual review: ${reason}`,
          actionUrl: `/procurement/requests/${requestId}`,
          metadata: {
            requestId,
            reason,
            requestTitle: request.title,
            organizationId: request.organization_id,
            estimatedReward: request.estimated_reward
          },
          priority: 'high',
          channels: ['in_app', 'email']
        };

        await this.sendInAppNotification(notificationData);
        await this.recordNotification(notificationData);
      });

      await Promise.all(notificationPromises);

      log('Manual review notifications sent successfully', 'info', {
        requestId,
        notifiedAdmins: orgAdmins.length,
        correlationId
      });

    } catch (error) {
      log('Failed to send manual review notification', 'error', {
        requestId,
        error: error instanceof Error ? error.message : String(error),
        correlationId
      });
      throw error;
    }
  }

  private async sendInAppNotification(data: NotificationData): Promise<void> {
    await supabaseAdmin
      .from('user_notifications')
      .insert({
        user_id: data.userId,
        type: data.type,
        title: data.title,
        message: data.message,
        action_url: data.actionUrl,
        metadata: data.metadata,
        priority: data.priority,
        is_read: false,
        created_at: new Date().toISOString()
      });
  }

  private async recordNotification(data: NotificationData): Promise<void> {
    await supabaseAdmin
      .from('notification_logs')
      .insert({
        user_id: data.userId,
        type: data.type,
        title: data.title,
        message: data.message,
        channels: data.channels,
        priority: data.priority,
        metadata: data.metadata,
        sent_at: new Date().toISOString()
      });
  }
}