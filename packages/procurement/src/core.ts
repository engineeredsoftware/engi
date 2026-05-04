/**
 * Core Procurement Engine
 * 
 * Handles the complete procurement lifecycle from request creation to fulfillment
 * and crypto compensation based on Marks of Measurement (MoM).
 */

import { log } from '@bitcode/logger';
import { supabaseAdmin } from '@bitcode/supabase';
import type { 
  Procurement, 
  ProcurementFulfillment, 
  MarksOfMeasurement, 
  TokenReward,
  ProcurementStatus,
  GlobalDatasetEntry,
  RepositoryOptIn 
} from './types';

export class ProcurementEngine {
  
  /**
   * Create a new procurement request
   */
  async createProcurement(params: {
    organizationId: string;
    requestorId: string;
    title: string;
    description: string;
    requirements: string[];
    constraints: string[];
    measurementCriteria: MarksOfMeasurement;
    budgetLimit: number;
    deadline?: string;
  }): Promise<Procurement> {
    try {
      log('Creating new procurement request', 'info', { 
        organizationId: params.organizationId,
        title: params.title 
      });

      // Estimate reward based on measurement criteria and requirements
      const estimatedReward = await this.estimateReward(
        params.measurementCriteria,
        params.requirements,
        params.constraints
      );

      const procurement: Procurement = {
        id: crypto.randomUUID(),
        organizationId: params.organizationId,
        requestorId: params.requestorId,
        status: 'unfilled',
        title: params.title,
        description: params.description,
        requirements: params.requirements,
        constraints: params.constraints,
        priority: this.determinePriority(params.requirements, params.deadline),
        context: await this.buildContext(params),
        measurementCriteria: params.measurementCriteria,
        budget: {
          organizationId: params.organizationId,
          totalBudget: params.budgetLimit,
          allocatedBudget: 0,
          remainingBudget: params.budgetLimit,
          currency: 'BTD',
          period: 'one-time',
          restrictions: {
            maxPerTransaction: params.budgetLimit,
            approvalRequired: params.budgetLimit > 1000,
            allowedCategories: [],
            allowedProviders: []
          }
        },
        estimatedReward,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deadline: params.deadline
      };

      // Store in database
      await this.storeProcurement(procurement);

      // Initiate matching process
      await this.initiateMatching(procurement);

      log('Procurement created successfully', 'info', {
        procurementId: procurement.id,
        estimatedReward: estimatedReward.totalAmount
      });

      return procurement;

    } catch (error) {
      log('Failed to create procurement', 'error', {
        organizationId: params.organizationId,
        error: error instanceof Error ? error.message : String(error)
      });
      throw error;
    }
  }

  /**
   * Search global dataset for procurement matches
   */
  async searchGlobalDataset(procurement: Procurement): Promise<GlobalDatasetEntry[]> {
    try {
      log('Searching global dataset for procurement matches', 'info', {
        procurementId: procurement.id
      });

      // Build search query from procurement details
      const searchQuery = this.buildSearchQuery(procurement);

      // Generate embedding for semantic search
      const { searchUserUpgradesForSpawn } = await import('./vectorize');
      
      // Search using hybrid approach: vector similarity + filters
      const results = await supabaseAdmin.rpc('search_global_dataset_for_procurement', {
        query_text: searchQuery,
        organization_id: procurement.organizationId,
        tech_stack: procurement.context.technical.requiredTech,
        category_filter: this.inferCategory(procurement),
        max_complexity: this.calculateMaxComplexity(procurement.measurementCriteria),
        min_quality_score: procurement.measurementCriteria.passingScore / 100,
        match_count: 20
      });

      if (results.error) {
        throw new Error(`Global dataset search failed: ${results.error.message}`);
      }

      return results.data || [];

    } catch (error) {
      log('Global dataset search failed', 'error', {
        procurementId: procurement.id,
        error: error instanceof Error ? error.message : String(error)
      });
      throw error;
    }
  }

  /**
   * Find opted-in repositories that could fulfill procurement
   */
  async findOptedRepositories(procurement: Procurement): Promise<RepositoryOptIn[]> {
    try {
      log('Finding opted-in repositories for procurement', 'info', {
        procurementId: procurement.id
      });

      const { data, error } = await supabaseAdmin
        .from('repository_opt_ins')
        .select('*')
        .eq('opt_in_status', 'opted-in')
        .contains('settings->allowed_procurement_types', [this.inferCategory(procurement)])
        .gte('settings->max_complexity', this.calculateMaxComplexity(procurement.measurementCriteria))
        .lte('settings->minimum_reward', procurement.estimatedReward.totalAmount);

      if (error) {
        throw new Error(`Repository search failed: ${error.message}`);
      }

      // Filter by tech stack compatibility
      const compatibleRepos = (data || []).filter((repo: any) => {
        const repoTechStack = repo.metadata?.tech_stack || [];
        const requiredTech = procurement.context.technical.requiredTech;
        
        return requiredTech.some(tech => 
          repoTechStack.some((repoTech: string) => 
            repoTech.toLowerCase().includes(tech.toLowerCase())
          )
        );
      });

      return compatibleRepos;

    } catch (error) {
      log('Repository search failed', 'error', {
        procurementId: procurement.id,
        error: error instanceof Error ? error.message : String(error)
      });
      throw error;
    }
  }

  /**
   * Complete procurement fulfillment and process crypto compensation
   */
  async completeProcurement(
    procurementId: string,
    contributorId: string,
    contributorAddress: string,
    fulfillmentArtifacts: Array<{
      type: 'code' | 'documentation' | 'configuration' | 'integration';
      content: string;
      metadata: Record<string, any>;
    }>
  ): Promise<ProcurementFulfillment> {
    try {
      log('Completing procurement fulfillment', 'info', {
        procurementId,
        contributorId,
        contributorAddress
      });

      // Get procurement details
      const procurement = await this.getProcurement(procurementId);
      if (!procurement) {
        throw new Error('Procurement not found');
      }

      // Measure fulfillment artifact quality using the measuring pipeline
      const measurements = await this.measureFulfillmentArtifacts(
        fulfillmentArtifacts,
        procurement.measurementCriteria
      );

      // Calculate crypto reward based on measurements
      const measurementData: MeasurementData = {
        codeQuality: measurements.codeQuality,
        completeness: measurements.completeness,
        innovation: measurements.innovation,
        impact: measurements.impact,
        linesOfCode: this.calculateLinesOfCode(fulfillmentArtifacts),
        complexity: measurements.overall,
        testCoverage: measurements.customScores?.testCoverage,
        securityScore: measurements.customScores?.security
      };

      const reward = calculateProcurementReward(
        procurementId,
        contributorAddress,
        measurementData
      );

      // Mint tokens for the contributor
      const transaction = await mintTokensForProcurement(reward);

      // Create fulfillment record
      const fulfillment: ProcurementFulfillment = {
        contributorId,
        contributorAddress,
        fulfillmentArtifacts,
        measurements,
        reward: {
          baseAmount: reward.formattedReward,
          qualityMultiplier: reward.qualityMultiplier,
          bonusAmount: '0', // TODO: Calculate bonus based on bonus thresholds
          totalAmount: reward.formattedReward,
          estimatedUsdValue: await this.getUsdValue(reward.totalReward)
        },
        transaction: {
          hash: transaction.transactionHash,
          blockNumber: transaction.blockNumber,
          status: transaction.status
        },
        fulfilledAt: new Date().toISOString()
      };

      // Update procurement with fulfillment
      await this.updateProcurement(procurementId, {
        status: 'approved' as ProcurementStatus,
        fulfillment,
        updatedAt: new Date().toISOString()
      });

      log('Procurement completed successfully', 'info', {
        procurementId,
        transactionHash: transaction.transactionHash,
        rewardAmount: reward.formattedReward,
        measurements
      });

      return fulfillment;

    } catch (error) {
      log('Failed to complete procurement', 'error', {
        procurementId,
        contributorId,
        error: error instanceof Error ? error.message : String(error)
      });
      throw error;
    }
  }

  // Private helper methods

  private async estimateReward(
    criteria: MarksOfMeasurement,
    requirements: string[],
    constraints: string[]
  ): Promise<TokenReward> {
    // Estimate based on complexity and measurement criteria
    const complexity = this.calculateMaxComplexity(criteria);
    const baseAmount = this.getBaseRewardForComplexity(complexity);
    
    return {
      baseAmount,
      qualityMultiplier: 1.0,
      bonusAmount: '0',
      totalAmount: baseAmount
    };
  }

  private determinePriority(requirements: string[], deadline?: string): 'low' | 'medium' | 'high' | 'urgent' {
    if (deadline) {
      const daysUntilDeadline = (new Date(deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
      if (daysUntilDeadline < 1) return 'urgent';
      if (daysUntilDeadline < 7) return 'high';
    }
    
    if (requirements.some(req => req.toLowerCase().includes('urgent'))) return 'urgent';
    if (requirements.some(req => req.toLowerCase().includes('critical'))) return 'high';
    
    return 'medium';
  }

  private async buildContext(params: any): Promise<any> {
    // Build context from global context, attachments, etc.
    return {
      technical: {
        requiredTech: this.extractTechStack(params.requirements),
        preferredTech: [],
        compatibility: [],
        integrationPoints: []
      },
      business: {
        useCase: params.description,
        stakeholders: [],
        timeline: params.deadline || 'flexible',
        dependencies: []
      },
      attachments: []
    };
  }

  private buildSearchQuery(procurement: Procurement): string {
    return [
      procurement.title,
      procurement.description,
      ...procurement.requirements,
      ...procurement.context.technical.requiredTech
    ].join(' ');
  }

  private inferCategory(procurement: Procurement): string {
    const content = [procurement.title, procurement.description, ...procurement.requirements].join(' ').toLowerCase();
    
    if (content.includes('ai') || content.includes('ml') || content.includes('model')) return 'ai-tools';
    if (content.includes('security') || content.includes('auth')) return 'security';
    if (content.includes('ui') || content.includes('component')) return 'ui-components';
    if (content.includes('test') || content.includes('testing')) return 'testing';
    if (content.includes('data') || content.includes('database')) return 'data-processing';
    if (content.includes('infrastructure') || content.includes('deploy')) return 'infrastructure';
    
    return 'other';
  }

  private calculateMaxComplexity(criteria: MarksOfMeasurement): number {
    // Calculate based on measurement criteria weights and thresholds
    const weightedSum = criteria.codeQuality.weight + criteria.completeness.weight + 
                       criteria.innovation.weight + criteria.impact.weight;
    return Math.min(weightedSum * 100, 100);
  }

  private getBaseRewardForComplexity(complexity: number): string {
    if (complexity > 80) return '500';
    if (complexity > 60) return '200';
    if (complexity > 30) return '50';
    return '10';
  }

  private extractTechStack(requirements: string[]): string[] {
    const techKeywords = ['react', 'node', 'python', 'rust', 'typescript', 'javascript', 'go', 'java'];
    const text = requirements.join(' ').toLowerCase();
    return techKeywords.filter(tech => text.includes(tech));
  }

  private async measureFulfillmentArtifacts(fulfillmentArtifacts: any[], criteria: MarksOfMeasurement): Promise<any> {
    // TODO: Integrate with measuring pipeline
    // For now, return mock measurements
    return {
      codeQuality: 85,
      completeness: 90,
      innovation: 75,
      impact: 80,
      overall: 82.5,
      customScores: {
        testCoverage: 85,
        security: 90
      }
    };
  }

  private calculateLinesOfCode(fulfillmentArtifacts: any[]): number {
    return fulfillmentArtifacts.reduce((total, fulfillmentArtifact) => {
      if (fulfillmentArtifact.type === 'code') {
        return total + fulfillmentArtifact.content.split('\n').length;
      }
      return total;
    }, 0);
  }

  private async getUsdValue(tokenAmount: bigint): Promise<number> {
    // TODO: Get current BTD share-unit price
    return 0; // Placeholder
  }

  private async storeProcurement(procurement: Procurement): Promise<void> {
    // TODO: Store in procurements table
    log('Storing procurement in database', 'info', { procurementId: procurement.id });
  }

  async getProcurement(procurementId: string): Promise<Procurement | null> {
    // TODO: Fetch from database
    return null;
  }

  private async updateProcurement(procurementId: string, updates: Partial<Procurement>): Promise<void> {
    // TODO: Update in database
    log('Updating procurement', 'info', { procurementId, updates });
  }

  private async initiateMatching(procurement: Procurement): Promise<void> {
    // TODO: Start background matching process
    log('Initiating procurement matching', 'info', { procurementId: procurement.id });
  }
}
