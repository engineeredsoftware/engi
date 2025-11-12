/**
 * Real-time Procurement Notification System
 * 
 * Advanced notification system that provides real-time updates for:
 * - New procurement opportunities
 * - Match notifications for contributors
 * - Quality assessment updates
 * - Compensation events
 * - System-wide procurement analytics
 */

import { log } from '@engi/logger';
import { supabaseAdmin } from '@engi/supabase';
import type { 
  Procurement, 
  ProcurementMatch, 
  QualityAssessmentResult,
  RepositoryOptIn 
} from './types';

export interface NotificationEvent {
  id: string;
  type: NotificationEventType;
  recipientId: string;
  recipientType: 'user' | 'organization' | 'system';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  
  title: string;
  message: string;
  data: Record<string, any>;
  
  channels: NotificationChannel[];
  deliveryStatus: Record<NotificationChannel, 'pending' | 'sent' | 'delivered' | 'failed'>;
  
  actionItems?: Array<{
    label: string;
    action: string;
    url?: string;
  }>;
  
  createdAt: string;
  expiresAt?: string;
  readAt?: string;
}

export type NotificationEventType = 
  | 'procurement-created'
  | 'procurement-matched'
  | 'procurement-assigned'
  | 'procurement-completed'
  | 'procurement-approved'
  | 'procurement-rejected'
  | 'quality-assessment-complete'
  | 'compensation-minted'
  | 'contributor-invitation'
  | 'deadline-approaching'
  | 'budget-threshold'
  | 'system-alert';

export type NotificationChannel = 
  | 'in-app'
  | 'email'
  | 'webhook'
  | 'slack'
  | 'discord'
  | 'push';

export interface NotificationPreferences {
  userId: string;
  channels: Record<NotificationEventType, NotificationChannel[]>;
  quietHours: {
    enabled: boolean;
    start: string; // HH:mm format
    end: string;
    timezone: string;
  };
  frequency: {
    immediate: NotificationEventType[];
    batched: NotificationEventType[];
    batchInterval: number; // minutes
  };
  filters: {
    minProcurementValue: number;
    preferredCategories: string[];
    excludedKeywords: string[];
  };
}

export class ProcurementNotificationSystem {
  private subscribers: Map<string, WebSocket[]> = new Map();
  private notificationQueue: NotificationEvent[] = [];
  private processingInterval: NodeJS.Timeout | null = null;

  constructor() {
    this.startNotificationProcessor();
  }

  /**
   * Subscribe to real-time procurement notifications
   */
  subscribe(userId: string, websocket: WebSocket): void {
    if (!this.subscribers.has(userId)) {
      this.subscribers.set(userId, []);
    }
    this.subscribers.get(userId)!.push(websocket);

    websocket.on('close', () => {
      this.unsubscribe(userId, websocket);
    });

    log('User subscribed to procurement notifications', 'info', { userId });
  }

  /**
   * Unsubscribe from notifications
   */
  unsubscribe(userId: string, websocket: WebSocket): void {
    const userSockets = this.subscribers.get(userId);
    if (userSockets) {
      const index = userSockets.indexOf(websocket);
      if (index > -1) {
        userSockets.splice(index, 1);
      }
      if (userSockets.length === 0) {
        this.subscribers.delete(userId);
      }
    }

    log('User unsubscribed from procurement notifications', 'info', { userId });
  }

  /**
   * Notify about new procurement opportunity
   */
  async notifyProcurementCreated(procurement: Procurement): Promise<void> {
    try {
      log('Notifying about new procurement', 'info', {
        procurementId: procurement.id,
        organizationId: procurement.organizationId
      });

      // Find relevant contributors based on procurement criteria
      const relevantContributors = await this.findRelevantContributors(procurement);

      // Create notifications for each relevant contributor
      for (const contributor of relevantContributors) {
        const notification: NotificationEvent = {
          id: crypto.randomUUID(),
          type: 'procurement-created',
          recipientId: contributor.contributorId,
          recipientType: 'user',
          priority: this.determinePriority(procurement),
          title: `New Procurement Opportunity: ${procurement.title}`,
          message: this.buildProcurementMessage(procurement, contributor),
          data: {
            procurementId: procurement.id,
            estimatedReward: procurement.estimatedReward.totalAmount,
            deadline: procurement.deadline,
            complexity: this.calculateComplexity(procurement),
            matchScore: contributor.matchScore
          },
          channels: await this.getPreferredChannels(contributor.contributorId, 'procurement-created'),
          deliveryStatus: {} as any,
          actionItems: [
            {
              label: 'View Details',
              action: 'view-procurement',
              url: `/procurement/${procurement.id}`
            },
            {
              label: 'Express Interest',
              action: 'express-interest'
            }
          ],
          createdAt: new Date().toISOString(),
          expiresAt: procurement.deadline
        };

        await this.queueNotification(notification);
      }

      // Notify organization about procurement creation
      await this.notifyOrganization(procurement.organizationId, {
        type: 'procurement-created',
        title: 'Procurement Created Successfully',
        message: `Your procurement "${procurement.title}" has been created and is now seeking contributors.`,
        data: { procurementId: procurement.id }
      });

    } catch (error) {
      log('Failed to notify about procurement creation', 'error', {
        procurementId: procurement.id,
        error: error instanceof Error ? error.message : String(error)
      });
    }
  }

  /**
   * Notify about procurement matches
   */
  async notifyProcurementMatched(matches: ProcurementMatch[]): Promise<void> {
    try {
      for (const match of matches) {
        const procurement = match.procurement;

        // Notify requestor about matches
        const notification: NotificationEvent = {
          id: crypto.randomUUID(),
          type: 'procurement-matched',
          recipientId: procurement.requestorId,
          recipientType: 'user',
          priority: 'medium',
          title: `Matches Found for "${procurement.title}"`,
          message: `We found ${matches.length} potential matches for your procurement request.`,
          data: {
            procurementId: procurement.id,
            matchCount: matches.length,
            topMatchScore: match.match.score,
            estimatedCompletion: match.match.timeToCompletion
          },
          channels: await this.getPreferredChannels(procurement.requestorId, 'procurement-matched'),
          deliveryStatus: {} as any,
          actionItems: [
            {
              label: 'Review Matches',
              action: 'review-matches',
              url: `/procurement/${procurement.id}/matches`
            }
          ],
          createdAt: new Date().toISOString()
        };

        await this.queueNotification(notification);

        // Notify matched contributors
        if (match.contributor) {
          await this.notifyContributorMatched(match);
        }
      }

    } catch (error) {
      log('Failed to notify about procurement matches', 'error', {
        error: error instanceof Error ? error.message : String(error)
      });
    }
  }

  /**
   * Notify about quality assessment completion
   */
  async notifyQualityAssessmentComplete(
    procurement: Procurement,
    assessment: QualityAssessmentResult
  ): Promise<void> {
    try {
      const isApproved = assessment.recommendation === 'accept';
      const contributorId = procurement.fulfillment?.contributorId;

      if (contributorId) {
        // Notify contributor
        const contributorNotification: NotificationEvent = {
          id: crypto.randomUUID(),
          type: 'quality-assessment-complete',
          recipientId: contributorId,
          recipientType: 'user',
          priority: isApproved ? 'high' : 'medium',
          title: isApproved 
            ? `Quality Assessment Passed: ${procurement.title}`
            : `Quality Assessment Results: ${procurement.title}`,
          message: this.buildQualityAssessmentMessage(assessment, isApproved),
          data: {
            procurementId: procurement.id,
            overallScore: assessment.overallScore,
            recommendation: assessment.recommendation,
            tokenReward: procurement.fulfillment?.reward.totalAmount
          },
          channels: await this.getPreferredChannels(contributorId, 'quality-assessment-complete'),
          deliveryStatus: {} as any,
          actionItems: isApproved ? [
            {
              label: 'View Assessment',
              action: 'view-assessment',
              url: `/procurement/${procurement.id}/assessment`
            }
          ] : [
            {
              label: 'View Feedback',
              action: 'view-feedback',
              url: `/procurement/${procurement.id}/assessment`
            },
            {
              label: 'Submit Revision',
              action: 'submit-revision'
            }
          ],
          createdAt: new Date().toISOString()
        };

        await this.queueNotification(contributorNotification);
      }

      // Notify requestor
      const requestorNotification: NotificationEvent = {
        id: crypto.randomUUID(),
        type: 'quality-assessment-complete',
        recipientId: procurement.requestorId,
        recipientType: 'user',
        priority: 'medium',
        title: `Quality Assessment Complete: ${procurement.title}`,
        message: `Quality assessment has been completed with a score of ${assessment.overallScore.toFixed(1)}/100.`,
        data: {
          procurementId: procurement.id,
          overallScore: assessment.overallScore,
          recommendation: assessment.recommendation
        },
        channels: await this.getPreferredChannels(procurement.requestorId, 'quality-assessment-complete'),
        deliveryStatus: {} as any,
        actionItems: [
          {
            label: 'Review Assessment',
            action: 'review-assessment',
            url: `/procurement/${procurement.id}/assessment`
          }
        ],
        createdAt: new Date().toISOString()
      };

      await this.queueNotification(requestorNotification);

    } catch (error) {
      log('Failed to notify about quality assessment', 'error', {
        procurementId: procurement.id,
        error: error instanceof Error ? error.message : String(error)
      });
    }
  }

  /**
   * Notify about token compensation
   */
  async notifyCompensationMinted(
    procurement: Procurement,
    transactionHash: string,
    amount: string
  ): Promise<void> {
    try {
      const contributorId = procurement.fulfillment?.contributorId;
      if (!contributorId) return;

      const notification: NotificationEvent = {
        id: crypto.randomUUID(),
        type: 'compensation-minted',
        recipientId: contributorId,
        recipientType: 'user',
        priority: 'high',
        title: `🎉 Tokens Minted: ${amount} ENGI`,
        message: `Congratulations! You've received ${amount} ENGI tokens for completing "${procurement.title}".`,
        data: {
          procurementId: procurement.id,
          tokenAmount: amount,
          transactionHash,
          qualityScore: procurement.fulfillment?.measurements.overall
        },
        channels: await this.getPreferredChannels(contributorId, 'compensation-minted'),
        deliveryStatus: {} as any,
        actionItems: [
          {
            label: 'View Transaction',
            action: 'view-transaction',
            url: `https://etherscan.io/tx/${transactionHash}`
          },
          {
            label: 'Check Wallet',
            action: 'check-wallet'
          }
        ],
        createdAt: new Date().toISOString()
      };

      await this.queueNotification(notification);

      // Also send celebratory notification to organization
      await this.notifyOrganization(procurement.organizationId, {
        type: 'compensation-minted',
        title: 'Procurement Compensation Completed',
        message: `Token compensation has been successfully minted for procurement "${procurement.title}".`,
        data: {
          procurementId: procurement.id,
          tokenAmount: amount,
          transactionHash
        }
      });

    } catch (error) {
      log('Failed to notify about compensation minting', 'error', {
        procurementId: procurement.id,
        error: error instanceof Error ? error.message : String(error)
      });
    }
  }

  /**
   * Notify about approaching deadlines
   */
  async notifyDeadlineApproaching(procurement: Procurement): Promise<void> {
    try {
      if (!procurement.deadline) return;

      const timeUntilDeadline = new Date(procurement.deadline).getTime() - Date.now();
      const hoursUntilDeadline = timeUntilDeadline / (1000 * 60 * 60);

      let urgencyLevel: 'medium' | 'high' | 'urgent' = 'medium';
      if (hoursUntilDeadline <= 24) urgencyLevel = 'urgent';
      else if (hoursUntilDeadline <= 72) urgencyLevel = 'high';

      // Notify relevant parties based on procurement status
      const recipients = [procurement.requestorId];
      if (procurement.fulfillment?.contributorId) {
        recipients.push(procurement.fulfillment.contributorId);
      }

      for (const recipientId of recipients) {
        const notification: NotificationEvent = {
          id: crypto.randomUUID(),
          type: 'deadline-approaching',
          recipientId,
          recipientType: 'user',
          priority: urgencyLevel,
          title: `⏰ Deadline Approaching: ${procurement.title}`,
          message: `The deadline for "${procurement.title}" is in ${Math.round(hoursUntilDeadline)} hours.`,
          data: {
            procurementId: procurement.id,
            hoursRemaining: Math.round(hoursUntilDeadline),
            deadline: procurement.deadline
          },
          channels: await this.getPreferredChannels(recipientId, 'deadline-approaching'),
          deliveryStatus: {} as any,
          actionItems: [
            {
              label: 'View Procurement',
              action: 'view-procurement',
              url: `/procurement/${procurement.id}`
            }
          ],
          createdAt: new Date().toISOString(),
          expiresAt: procurement.deadline
        };

        await this.queueNotification(notification);
      }

    } catch (error) {
      log('Failed to notify about approaching deadline', 'error', {
        procurementId: procurement.id,
        error: error instanceof Error ? error.message : String(error)
      });
    }
  }

  /**
   * Send real-time notification via WebSocket
   */
  private async sendRealTimeNotification(notification: NotificationEvent): Promise<void> {
    const userSockets = this.subscribers.get(notification.recipientId);
    if (userSockets && userSockets.length > 0) {
      const message = JSON.stringify({
        type: 'procurement-notification',
        data: notification
      });

      for (const socket of userSockets) {
        try {
          if (socket.readyState === WebSocket.OPEN) {
            socket.send(message);
            log('Real-time notification sent', 'info', {
              notificationId: notification.id,
              recipientId: notification.recipientId
            });
          }
        } catch (error) {
          log('Failed to send real-time notification', 'error', {
            notificationId: notification.id,
            error: error instanceof Error ? error.message : String(error)
          });
        }
      }
    }
  }

  /**
   * Queue notification for delivery
   */
  private async queueNotification(notification: NotificationEvent): Promise<void> {
    // Add to queue for processing
    this.notificationQueue.push(notification);

    // Send real-time notification immediately if user is online
    if (notification.channels.includes('in-app')) {
      await this.sendRealTimeNotification(notification);
    }

    // Store in database for persistence
    await this.storeNotification(notification);

    log('Notification queued', 'info', {
      notificationId: notification.id,
      type: notification.type,
      recipientId: notification.recipientId
    });
  }

  /**
   * Process notification queue
   */
  private startNotificationProcessor(): void {
    this.processingInterval = setInterval(async () => {
      if (this.notificationQueue.length === 0) return;

      const batch = this.notificationQueue.splice(0, 10); // Process 10 at a time
      
      for (const notification of batch) {
        try {
          await this.processNotification(notification);
        } catch (error) {
          log('Failed to process notification', 'error', {
            notificationId: notification.id,
            error: error instanceof Error ? error.message : String(error)
          });
        }
      }
    }, 5000); // Process every 5 seconds
  }

  /**
   * Process individual notification
   */
  private async processNotification(notification: NotificationEvent): Promise<void> {
    for (const channel of notification.channels) {
      try {
        switch (channel) {
          case 'email':
            await this.sendEmailNotification(notification);
            break;
          case 'webhook':
            await this.sendWebhookNotification(notification);
            break;
          case 'slack':
            await this.sendSlackNotification(notification);
            break;
          case 'push':
            await this.sendPushNotification(notification);
            break;
          // 'in-app' is handled in real-time
        }
        
        notification.deliveryStatus[channel] = 'sent';
      } catch (error) {
        notification.deliveryStatus[channel] = 'failed';
        log(`Failed to send ${channel} notification`, 'error', {
          notificationId: notification.id,
          error: error instanceof Error ? error.message : String(error)
        });
      }
    }

    // Update delivery status in database
    await this.updateNotificationStatus(notification);
  }

  // Helper methods

  private async findRelevantContributors(procurement: Procurement): Promise<Array<{
    contributorId: string;
    matchScore: number;
  }>> {
    // Find contributors whose opt-in settings match the procurement
    const { data, error } = await supabaseAdmin
      .from('repository_opt_ins')
      .select('*')
      .eq('opt_in_status', 'opted-in')
      .contains('settings->allowed_procurement_types', [this.inferCategory(procurement)])
      .gte('settings->max_complexity', this.calculateComplexity(procurement))
      .lte('settings->minimum_reward', procurement.estimatedReward.totalAmount);

    if (error || !data) return [];

    return data.map((optIn: any) => ({
      contributorId: optIn.contributor_id,
      matchScore: this.calculateQuickMatchScore(procurement, optIn)
    }));
  }

  private determinePriority(procurement: Procurement): 'low' | 'medium' | 'high' | 'urgent' {
    if (procurement.priority === 'urgent') return 'urgent';
    if (procurement.priority === 'high') return 'high';
    
    const rewardAmount = parseFloat(procurement.estimatedReward.totalAmount);
    if (rewardAmount > 500) return 'high';
    if (rewardAmount > 100) return 'medium';
    
    return 'low';
  }

  private buildProcurementMessage(procurement: Procurement, contributor: any): string {
    const complexity = this.calculateComplexity(procurement);
    const matchPercentage = Math.round(contributor.matchScore);
    
    return `A new procurement opportunity matches your skills (${matchPercentage}% match). ` +
           `Reward: ${procurement.estimatedReward.totalAmount} ENGI tokens. ` +
           `Complexity: ${complexity}/100. ` +
           `${procurement.deadline ? `Deadline: ${new Date(procurement.deadline).toLocaleDateString()}` : 'Flexible timeline'}.`;
  }

  private buildQualityAssessmentMessage(assessment: QualityAssessmentResult, isApproved: boolean): string {
    if (isApproved) {
      return `Excellent work! Your submission scored ${assessment.overallScore.toFixed(1)}/100 and has been approved. ` +
             `Token compensation will be processed shortly.`;
    } else {
      return `Your submission scored ${assessment.overallScore.toFixed(1)}/100. ` +
             `Recommendation: ${assessment.recommendation}. ` +
             `Please review the feedback and consider submitting a revision.`;
    }
  }

  private async getPreferredChannels(userId: string, eventType: NotificationEventType): Promise<NotificationChannel[]> {
    // Get user's notification preferences
    const { data } = await supabaseAdmin
      .from('notification_preferences')
      .select('channels')
      .eq('user_id', userId)
      .single();

    if (data?.channels?.[eventType]) {
      return data.channels[eventType];
    }

    // Default channels for different event types
    const defaults: Record<NotificationEventType, NotificationChannel[]> = {
      'procurement-created': ['in-app', 'email'],
      'procurement-matched': ['in-app'],
      'procurement-assigned': ['in-app', 'email'],
      'procurement-completed': ['in-app'],
      'procurement-approved': ['in-app', 'email'],
      'procurement-rejected': ['in-app', 'email'],
      'quality-assessment-complete': ['in-app', 'email'],
      'compensation-minted': ['in-app', 'email', 'push'],
      'contributor-invitation': ['in-app', 'email'],
      'deadline-approaching': ['in-app', 'email', 'push'],
      'budget-threshold': ['in-app', 'email'],
      'system-alert': ['in-app', 'email']
    };

    return defaults[eventType] || ['in-app'];
  }

  private async notifyOrganization(organizationId: string, data: any): Promise<void> {
    // Notify organization admin/members about procurement events
    const { data: orgMembers } = await supabaseAdmin
      .from('organization_members')
      .select('user_id, role')
      .eq('organization_id', organizationId)
      .in('role', ['admin', 'owner']);

    if (orgMembers) {
      for (const member of orgMembers) {
        await this.queueNotification({
          id: crypto.randomUUID(),
          type: data.type,
          recipientId: member.user_id,
          recipientType: 'user',
          priority: 'medium',
          title: data.title,
          message: data.message,
          data: data.data || {},
          channels: ['in-app'],
          deliveryStatus: {} as any,
          createdAt: new Date().toISOString()
        });
      }
    }
  }

  private async notifyContributorMatched(match: ProcurementMatch): Promise<void> {
    if (!match.contributor) return;

    const notification: NotificationEvent = {
      id: crypto.randomUUID(),
      type: 'procurement-matched',
      recipientId: match.contributor.contributorAddress, // Assuming this maps to user ID
      recipientType: 'user',
      priority: 'medium',
      title: `You're Matched for "${match.procurement.title}"`,
      message: `Great news! You've been matched with a procurement opportunity (${Math.round(match.match.score)}% match).`,
      data: {
        procurementId: match.procurement.id,
        matchScore: match.match.score,
        confidence: match.match.confidence,
        estimatedReward: match.procurement.estimatedReward.totalAmount
      },
      channels: ['in-app', 'email'],
      deliveryStatus: {} as any,
      actionItems: [
        {
          label: 'View Details',
          action: 'view-procurement',
          url: `/procurement/${match.procurement.id}`
        },
        {
          label: 'Accept Match',
          action: 'accept-match'
        }
      ],
      createdAt: new Date().toISOString()
    };

    await this.queueNotification(notification);
  }

  private async storeNotification(notification: NotificationEvent): Promise<void> {
    const { error } = await supabaseAdmin
      .from('procurement_notifications')
      .insert({
        id: notification.id,
        type: notification.type,
        recipient_id: notification.recipientId,
        recipient_type: notification.recipientType,
        priority: notification.priority,
        title: notification.title,
        message: notification.message,
        data: notification.data,
        channels: notification.channels,
        delivery_status: notification.deliveryStatus,
        action_items: notification.actionItems,
        created_at: notification.createdAt,
        expires_at: notification.expiresAt
      });

    if (error) {
      log('Failed to store notification', 'error', {
        notificationId: notification.id,
        error: error.message
      });
    }
  }

  private async updateNotificationStatus(notification: NotificationEvent): Promise<void> {
    await supabaseAdmin
      .from('procurement_notifications')
      .update({ 
        delivery_status: notification.deliveryStatus,
        updated_at: new Date().toISOString()
      })
      .eq('id', notification.id);
  }

  // Delivery methods (simplified implementations)

  private async sendEmailNotification(notification: NotificationEvent): Promise<void> {
    // TODO: Integrate with email service
    log('Email notification sent', 'info', { notificationId: notification.id });
  }

  private async sendWebhookNotification(notification: NotificationEvent): Promise<void> {
    // TODO: Send webhook
    log('Webhook notification sent', 'info', { notificationId: notification.id });
  }

  private async sendSlackNotification(notification: NotificationEvent): Promise<void> {
    // TODO: Send Slack message
    log('Slack notification sent', 'info', { notificationId: notification.id });
  }

  private async sendPushNotification(notification: NotificationEvent): Promise<void> {
    // TODO: Send push notification
    log('Push notification sent', 'info', { notificationId: notification.id });
  }

  // Utility methods

  private inferCategory(procurement: Procurement): string {
    const content = [procurement.title, procurement.description, ...procurement.requirements].join(' ').toLowerCase();
    
    if (content.includes('ai') || content.includes('ml')) return 'ai-tools';
    if (content.includes('security')) return 'security';
    if (content.includes('ui')) return 'ui-components';
    if (content.includes('test')) return 'testing';
    return 'other';
  }

  private calculateComplexity(procurement: Procurement): number {
    const criteria = procurement.measurementCriteria;
    return Math.min(
      (criteria.codeQuality.weight + criteria.completeness.weight + 
       criteria.innovation.weight + criteria.impact.weight) * 100, 
      100
    );
  }

  private calculateQuickMatchScore(procurement: Procurement, optIn: any): number {
    // Quick matching algorithm for notifications
    let score = 50; // Base score

    // Tech stack compatibility
    const requiredTech = procurement.context.technical.requiredTech;
    const contributorTech = optIn.metadata?.tech_stack || [];
    const techOverlap = requiredTech.filter(tech => 
      contributorTech.some((cTech: string) => cTech.toLowerCase().includes(tech.toLowerCase()))
    ).length;
    score += (techOverlap / Math.max(requiredTech.length, 1)) * 30;

    // Reputation bonus
    score += (optIn.metrics?.average_rating || 0) * 4;

    return Math.min(100, score);
  }

  /**
   * Cleanup - stop notification processor
   */
  destroy(): void {
    if (this.processingInterval) {
      clearInterval(this.processingInterval);
      this.processingInterval = null;
    }
    this.subscribers.clear();
    this.notificationQueue = [];
  }
}