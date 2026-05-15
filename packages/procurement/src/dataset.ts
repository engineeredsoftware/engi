/**
 * Repository Opt-in and Global Dataset Management
 * 
 * Handles the system for users to opt-in their repositories for procurement
 * and manages the global dataset for efficient searching.
 */

import { log } from '@bitcode/logger';
import { supabaseAdmin } from '@bitcode/supabase';
import { generateSolutionEmbedding } from './vectorize';
import type { 
  RepositoryOptIn, 
  GlobalDatasetEntry, 
  SolutionCategory 
} from './types';

export class RepositoryOptInManager {
  
  /**
   * Opt-in a repository for global procurement
   */
  async optInRepository(params: {
    repositoryId: string;
    organizationId: string;
    owner: string;
    name: string;
    contributorAddress: string;
    availabilityLevel: 'public' | 'premium' | 'private';
    settings: {
      allowedProcurementTypes: SolutionCategory[];
      maxComplexity: number;
      minimumReward: string;
      autoAcceptThreshold?: number;
      reviewRequired: boolean;
    };
    metadata: {
      techStack: string[];
      framework: string;
      language: string;
      size: 'small' | 'medium' | 'large' | 'enterprise';
      specializations: string[];
    };
  }): Promise<RepositoryOptIn> {
    try {
      log('Opting in repository for procurement', 'info', {
        repositoryId: params.repositoryId,
        owner: params.owner,
        name: params.name,
        availabilityLevel: params.availabilityLevel
      });

      // Validate contributor address
      if (!this.isValidEthereumAddress(params.contributorAddress)) {
        throw new Error('Invalid Ethereum address provided');
      }

      // Check if repository is already opted in
      const existing = await this.getRepositoryOptIn(params.repositoryId);
      if (existing && existing.optInStatus === 'opted-in') {
        throw new Error('Repository is already opted in');
      }

      const optIn: RepositoryOptIn = {
        repositoryId: params.repositoryId,
        organizationId: params.organizationId,
        owner: params.owner,
        name: params.name,
        optInStatus: 'opted-in',
        availabilityLevel: params.availabilityLevel,
        contributorAddress: params.contributorAddress,
        settings: params.settings,
        metadata: {
          ...params.metadata,
          activityLevel: await this.calculateActivityLevel(params.repositoryId),
        },
        metrics: {
          successfulProcurements: 0,
          averageRating: 0,
          responseTime: 24, // Default 24 hours
          completionRate: 0
        },
        optedInAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
      };

      // Store in database
      const { error } = await supabaseAdmin
        .from('repository_opt_ins')
        .upsert(optIn, { onConflict: 'repository_id' });

      if (error) {
        throw new Error(`Failed to store opt-in: ${error.message}`);
      }

      // Index repository content for global dataset
      await this.indexRepositoryContent(optIn);

      log('Repository opted in successfully', 'info', {
        repositoryId: params.repositoryId,
        contributorAddress: params.contributorAddress
      });

      return optIn;

    } catch (error) {
      log('Failed to opt in repository', 'error', {
        repositoryId: params.repositoryId,
        error: error instanceof Error ? error.message : String(error)
      });
      throw error;
    }
  }

  /**
   * Opt-out a repository from procurement
   */
  async optOutRepository(repositoryId: string): Promise<void> {
    try {
      log('Opting out repository from procurement', 'info', { repositoryId });

      // Update opt-in status
      const { error } = await supabaseAdmin
        .from('repository_opt_ins')
        .update({ 
          opt_in_status: 'opted-out',
          last_updated: new Date().toISOString()
        })
        .eq('repository_id', repositoryId);

      if (error) {
        throw new Error(`Failed to opt out repository: ${error.message}`);
      }

      // Remove from global dataset
      await this.removeFromGlobalDataset(repositoryId);

      log('Repository opted out successfully', 'info', { repositoryId });

    } catch (error) {
      log('Failed to opt out repository', 'error', {
        repositoryId,
        error: error instanceof Error ? error.message : String(error)
      });
      throw error;
    }
  }

  /**
   * Get repository opt-in status
   */
  async getRepositoryOptIn(repositoryId: string): Promise<RepositoryOptIn | null> {
    try {
      const { data, error } = await supabaseAdmin
        .from('repository_opt_ins')
        .select('*')
        .eq('repository_id', repositoryId)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        throw new Error(`Failed to fetch opt-in status: ${error.message}`);
      }

      return data || null;

    } catch (error) {
      log('Failed to get repository opt-in status', 'error', {
        repositoryId,
        error: error instanceof Error ? error.message : String(error)
      });
      return null;
    }
  }

  /**
   * Update repository metrics after procurement completion
   */
  async updateRepositoryMetrics(
    repositoryId: string,
    procurementResult: {
      successful: boolean;
      rating: number;
      responseTimeHours: number;
    }
  ): Promise<void> {
    try {
      log('Updating repository metrics', 'info', {
        repositoryId,
        successful: procurementResult.successful,
        rating: procurementResult.rating
      });

      const optIn = await this.getRepositoryOptIn(repositoryId);
      if (!optIn) {
        throw new Error('Repository not found or not opted in');
      }

      // Calculate new metrics
      const totalProcurements = optIn.metrics.successfulProcurements + (procurementResult.successful ? 1 : 0);
      const newAverageRating = totalProcurements > 0 
        ? ((optIn.metrics.averageRating * optIn.metrics.successfulProcurements) + procurementResult.rating) / totalProcurements
        : procurementResult.rating;
      
      const newResponseTime = (optIn.metrics.responseTime + procurementResult.responseTimeHours) / 2;

      // Update metrics
      const { error } = await supabaseAdmin
        .from('repository_opt_ins')
        .update({
          'metrics->successful_procurements': totalProcurements,
          'metrics->average_rating': newAverageRating,
          'metrics->response_time': newResponseTime,
          'metrics->completion_rate': procurementResult.successful ? 
            ((optIn.metrics.completionRate * optIn.metrics.successfulProcurements) + 100) / totalProcurements :
            optIn.metrics.completionRate,
          last_updated: new Date().toISOString()
        })
        .eq('repository_id', repositoryId);

      if (error) {
        throw new Error(`Failed to update metrics: ${error.message}`);
      }

      log('Repository metrics updated successfully', 'info', { repositoryId });

    } catch (error) {
      log('Failed to update repository metrics', 'error', {
        repositoryId,
        error: error instanceof Error ? error.message : String(error)
      });
      throw error;
    }
  }

  private async calculateActivityLevel(repositoryId: string): Promise<'low' | 'medium' | 'high'> {
    // TODO: Analyze repository activity (commits, PRs, etc.)
    // For now, return medium as default
    return 'medium';
  }

  private isValidEthereumAddress(address: string): boolean {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  }

  private async indexRepositoryContent(optIn: RepositoryOptIn): Promise<void> {
    // TODO: Scan repository and add content to global dataset
    log('Indexing repository content for global dataset', 'info', {
      repositoryId: optIn.repositoryId
    });
  }

  private async removeFromGlobalDataset(repositoryId: string): Promise<void> {
    // TODO: Remove repository content from global dataset
    log('Removing repository from global dataset', 'info', { repositoryId });
  }
}

export class GlobalDatasetManager {
  
  /**
   * Add entry to global dataset
   */
  async addToDataset(params: {
    repositoryId: string;
    contributorId: string;
    type: 'code' | 'pattern' | 'solution' | 'integration' | 'framework';
    content: string;
    category: SolutionCategory;
    tags: string[];
    techStack: string[];
    complexity: number;
    context: {
      problemDomain: string;
      useCase: string;
      constraints: string[];
      requirements: string[];
    };
  }): Promise<GlobalDatasetEntry> {
    try {
      log('Adding entry to global dataset', 'info', {
        repositoryId: params.repositoryId,
        type: params.type,
        category: params.category
      });

      // Generate embedding for content
      const embedding = await generateSolutionEmbedding(params.content);

      // Calculate quality metrics
      const quality = await this.calculateQualityMetrics(params.content, params.type);

      const entry: GlobalDatasetEntry = {
        id: crypto.randomUUID(),
        repositoryId: params.repositoryId,
        contributorId: params.contributorId,
        type: params.type,
        content: params.content,
        embedding,
        category: params.category,
        tags: params.tags,
        techStack: params.techStack,
        complexity: params.complexity,
        quality,
        usageCount: 0,
        successRate: 0,
        averageRating: 0,
        context: params.context,
        procurementCompatibility: {
          minBudget: this.calculateMinBudget(params.complexity, quality),
          estimatedEffort: this.estimateEffort(params.complexity, params.content),
          customizationRequired: this.requiresCustomization(params.type, params.complexity),
          supportLevel: this.determineSupportLevel(quality)
        },
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
      };

      // Store in database
      const { error } = await supabaseAdmin
        .from('global_dataset_entries')
        .insert({
          ...entry,
          embedding: JSON.stringify(embedding)
        });

      if (error) {
        throw new Error(`Failed to add to dataset: ${error.message}`);
      }

      log('Entry added to global dataset successfully', 'info', {
        entryId: entry.id,
        repositoryId: params.repositoryId
      });

      return entry;

    } catch (error) {
      log('Failed to add entry to global dataset', 'error', {
        repositoryId: params.repositoryId,
        error: error instanceof Error ? error.message : String(error)
      });
      throw error;
    }
  }

  /**
   * Search global dataset efficiently
   */
  async searchDataset(params: {
    query: string;
    techStack?: string[];
    category?: SolutionCategory;
    maxComplexity?: number;
    minQuality?: number;
    limit?: number;
  }): Promise<GlobalDatasetEntry[]> {
    try {
      log('Searching global dataset', 'info', {
        query: params.query,
        techStack: params.techStack,
        category: params.category
      });

      // Generate embedding for query
      const queryEmbedding = await generateSolutionEmbedding(params.query);

      // Use RPC function for efficient vector search
      const { data, error } = await supabaseAdmin.rpc('search_global_dataset', {
        query_embedding: JSON.stringify(queryEmbedding),
        tech_stack_filter: params.techStack || [],
        category_filter: params.category,
        max_complexity: params.maxComplexity || 100,
        min_quality_score: params.minQuality || 0,
        match_count: params.limit || 20
      });

      if (error) {
        throw new Error(`Dataset search failed: ${error.message}`);
      }

      return data || [];

    } catch (error) {
      log('Failed to search global dataset', 'error', {
        query: params.query,
        error: error instanceof Error ? error.message : String(error)
      });
      throw error;
    }
  }

  /**
   * Update usage statistics for dataset entry
   */
  async updateUsageStats(
    entryId: string,
    procurementResult: {
      successful: boolean;
      rating: number;
    }
  ): Promise<void> {
    try {
      log('Updating dataset entry usage stats', 'info', {
        entryId,
        successful: procurementResult.successful
      });

      // Get current entry
      const { data: entry, error: fetchError } = await supabaseAdmin
        .from('global_dataset_entries')
        .select('usage_count, success_rate, average_rating')
        .eq('id', entryId)
        .single();

      if (fetchError || !entry) {
        throw new Error('Dataset entry not found');
      }

      // Calculate new stats
      const newUsageCount = entry.usage_count + 1;
      const newSuccessRate = procurementResult.successful
        ? ((entry.success_rate * entry.usage_count) + 100) / newUsageCount
        : (entry.success_rate * entry.usage_count) / newUsageCount;
      const newAverageRating = ((entry.average_rating * entry.usage_count) + procurementResult.rating) / newUsageCount;

      // Update database
      const { error } = await supabaseAdmin
        .from('global_dataset_entries')
        .update({
          usage_count: newUsageCount,
          success_rate: newSuccessRate,
          average_rating: newAverageRating,
          last_updated: new Date().toISOString()
        })
        .eq('id', entryId);

      if (error) {
        throw new Error(`Failed to update usage stats: ${error.message}`);
      }

      log('Dataset entry usage stats updated', 'info', { entryId });

    } catch (error) {
      log('Failed to update dataset entry usage stats', 'error', {
        entryId,
        error: error instanceof Error ? error.message : String(error)
      });
      throw error;
    }
  }

  private async calculateQualityMetrics(content: string, type: string): Promise<any> {
    // TODO: Implement quality analysis using measuring pipeline
    // For now, return mock metrics based on content analysis
    const hasTests = content.includes('test') || content.includes('spec');
    const hasDocumentation = content.includes('/**') || content.includes('README');
    const codeLength = content.length;

    return {
      codeQuality: Math.min(70 + (hasTests ? 15 : 0) + (hasDocumentation ? 10 : 0), 100),
      documentation: hasDocumentation ? 85 : 50,
      testCoverage: hasTests ? 80 : 30,
      maintainability: codeLength < 1000 ? 90 : codeLength < 5000 ? 75 : 60,
      performance: 75 // Default - would read actual performance testing
    };
  }

  private calculateMinBudget(complexity: number, quality: any): string {
    const baseAmount = complexity > 80 ? 500 : complexity > 60 ? 200 : complexity > 30 ? 50 : 10;
    const qualityMultiplier = (quality.codeQuality + quality.maintainability) / 200;
    return Math.round(baseAmount * qualityMultiplier).toString();
  }

  private estimateEffort(complexity: number, content: string): number {
    const baseHours = complexity > 80 ? 40 : complexity > 60 ? 20 : complexity > 30 ? 10 : 5;
    const contentMultiplier = Math.min(content.length / 1000, 3); // Max 3x multiplier
    return Math.round(baseHours * contentMultiplier);
  }

  private requiresCustomization(type: string, complexity: number): boolean {
    return type === 'pattern' || type === 'framework' || complexity > 70;
  }

  private determineSupportLevel(quality: any): 'basic' | 'enhanced' | 'full' {
    const avgQuality = (quality.codeQuality + quality.maintainability + quality.documentation) / 3;
    if (avgQuality > 85) return 'full';
    if (avgQuality > 70) return 'enhanced';
    return 'basic';
  }
}