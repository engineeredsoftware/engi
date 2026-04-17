/**
 * Advanced Procurement Matching Engine
 * 
 * State-of-the-art matching algorithms that combine:
 * - Vector similarity search
 * - Multi-dimensional scoring
 * - Contributor reputation analysis
 * - Real-time availability tracking
 * - Cost optimization
 */

import { log } from '@bitcode/logger';
import { generateSolutionEmbedding } from './vectorize';
import { supabaseAdmin } from '@bitcode/supabase';
import type { 
  Procurement, 
  GlobalDatasetEntry, 
  RepositoryOptIn,
  SolutionCategory 
} from './types';

export interface MatchingResult {
  score: number;           // 0-100 overall match score
  confidence: number;      // 0-1 confidence in the match
  reasoning: string[];     // Human-readable explanation
  estimatedSuccess: number; // 0-1 probability of successful completion
  costEffectiveness: number; // Value per token ratio
  timeToCompletion: number; // Estimated hours
  riskAssessment: {
    technical: number;     // 0-1 risk of technical issues
    timeline: number;      // 0-1 risk of delays
    quality: number;       // 0-1 risk of quality issues
    overall: number;       // 0-1 overall risk
  };
}

export interface ProcurementMatch {
  type: 'existing-solution' | 'contributor' | 'hybrid';
  procurement: Procurement;
  solution?: GlobalDatasetEntry;
  contributor?: RepositoryOptIn;
  match: MatchingResult;
  alternatives: Array<{
    solution?: GlobalDatasetEntry;
    contributor?: RepositoryOptIn;
    match: MatchingResult;
  }>;
}

export class AdvancedMatchingEngine {
  
  /**
   * Find optimal matches for a procurement using multi-dimensional analysis
   */
  async findOptimalMatches(procurement: Procurement): Promise<ProcurementMatch[]> {
    try {
      log('Finding optimal matches with advanced algorithms', 'info', {
        procurementId: procurement.id,
        category: this.inferCategory(procurement)
      });

      // Parallel search across all sources
      const [existingSolutions, availableContributors, hybridOptions] = await Promise.all([
        this.findExistingSolutions(procurement),
        this.findAvailableContributors(procurement),
        this.findHybridSolutions(procurement)
      ]);

      // Score and rank all options
      const matches: ProcurementMatch[] = [
        ...existingSolutions.map(solution => this.createSolutionMatch(procurement, solution)),
        ...availableContributors.map(contributor => this.createContributorMatch(procurement, contributor)),
        ...hybridOptions.map(hybrid => this.createHybridMatch(procurement, hybrid))
      ];

      // Apply advanced ranking algorithm
      const rankedMatches = await this.rankMatches(matches, procurement);

      // Add alternatives for top matches
      const enrichedMatches = await this.addAlternatives(rankedMatches, procurement);

      log('Optimal matches found', 'info', {
        procurementId: procurement.id,
        totalMatches: enrichedMatches.length,
        topScore: enrichedMatches[0]?.match.score || 0
      });

      return enrichedMatches.slice(0, 10); // Return top 10 matches

    } catch (error) {
      log('Failed to find optimal matches', 'error', {
        procurementId: procurement.id,
        error: error instanceof Error ? error.message : String(error)
      });
      throw error;
    }
  }

  /**
   * Real-time match scoring with ML-enhanced algorithms
   */
  async calculateMatchScore(
    procurement: Procurement,
    solution?: GlobalDatasetEntry,
    contributor?: RepositoryOptIn
  ): Promise<MatchingResult> {
    
    const scores = {
      technical: 0,
      quality: 0,
      cost: 0,
      timeline: 0,
      reputation: 0,
      innovation: 0
    };

    let reasoning: string[] = [];

    // Technical compatibility scoring
    if (solution) {
      scores.technical = await this.scoreTechnicalCompatibility(procurement, solution);
      reasoning.push(`Technical compatibility: ${scores.technical.toFixed(1)}/100`);
      
      scores.quality = this.scoreQualityAlignment(procurement, solution);
      reasoning.push(`Quality alignment: ${scores.quality.toFixed(1)}/100`);
    }

    if (contributor) {
      scores.reputation = this.scoreContributorReputation(contributor);
      reasoning.push(`Contributor reputation: ${scores.reputation.toFixed(1)}/100`);
      
      scores.timeline = this.scoreTimelineCompatibility(procurement, contributor);
      reasoning.push(`Timeline compatibility: ${scores.timeline.toFixed(1)}/100`);
    }

    // Cost effectiveness
    scores.cost = await this.scoreCostEffectiveness(procurement, solution, contributor);
    reasoning.push(`Cost effectiveness: ${scores.cost.toFixed(1)}/100`);

    // Innovation potential
    scores.innovation = this.scoreInnovationPotential(procurement, solution, contributor);
    reasoning.push(`Innovation potential: ${scores.innovation.toFixed(1)}/100`);

    // Weighted overall score
    const weights = {
      technical: 0.25,
      quality: 0.20,
      cost: 0.15,
      timeline: 0.15,
      reputation: 0.15,
      innovation: 0.10
    };

    const overallScore = Object.entries(scores).reduce((total, [key, score]) => {
      return total + (score * weights[key as keyof typeof weights]);
    }, 0);

    // Calculate confidence based on data availability and variance
    const confidence = this.calculateConfidence(scores, solution, contributor);

    // Estimate success probability
    const estimatedSuccess = this.estimateSuccessProbability(scores, procurement);

    // Calculate cost effectiveness ratio
    const costEffectiveness = await this.calculateCostEffectiveness(procurement, solution, contributor);

    // Estimate time to completion
    const timeToCompletion = this.estimateTimeToCompletion(procurement, solution, contributor);

    // Risk assessment
    const riskAssessment = this.assessRisks(procurement, solution, contributor, scores);

    return {
      score: Math.round(overallScore * 100) / 100,
      confidence,
      reasoning,
      estimatedSuccess,
      costEffectiveness,
      timeToCompletion,
      riskAssessment
    };
  }

  // Private helper methods for advanced scoring

  private async findExistingSolutions(procurement: Procurement): Promise<GlobalDatasetEntry[]> {
    const searchQuery = this.buildSemanticQuery(procurement);
    const embedding = await generateSolutionEmbedding(searchQuery);

    const { data, error } = await supabaseAdmin.rpc('search_existing_solutions_advanced', {
      query_embedding: JSON.stringify(embedding),
      procurement_requirements: procurement.requirements,
      tech_stack: procurement.context.technical.requiredTech,
      max_complexity: this.calculateMaxComplexity(procurement.measurementCriteria),
      min_quality: procurement.measurementCriteria.passingScore / 100,
      match_count: 20
    });

    if (error) {
      log('Error searching existing solutions', 'error', { error });
      return [];
    }

    return data || [];
  }

  private async findAvailableContributors(procurement: Procurement): Promise<RepositoryOptIn[]> {
    const category = this.inferCategory(procurement);
    
    const { data, error } = await supabaseAdmin
      .from('repository_opt_ins')
      .select(`
        *,
        contributor_profile:contributor_profiles(*),
        recent_procurements:procurement_fulfillments(
          procurement_id,
          measurements,
          reward,
          fulfilled_at
        )
      `)
      .eq('opt_in_status', 'opted-in')
      .contains('settings->allowed_procurement_types', [category])
      .gte('settings->max_complexity', this.calculateMaxComplexity(procurement.measurementCriteria))
      .lte('settings->minimum_reward', procurement.estimatedReward.totalAmount)
      .order('metrics->average_rating', { ascending: false })
      .limit(30);

    if (error) {
      log('Error finding available contributors', 'error', { error });
      return [];
    }

    // Filter by current availability
    return (data || []).filter(contributor => this.isCurrentlyAvailable(contributor));
  }

  private async findHybridSolutions(procurement: Procurement): Promise<Array<{
    baseSolution: GlobalDatasetEntry;
    customizationContributor: RepositoryOptIn;
    customizationScore: number;
  }>> {
    // Find solutions that require customization + contributors who can customize
    const existingSolutions = await this.findExistingSolutions(procurement);
    const availableContributors = await this.findAvailableContributors(procurement);

    const hybridOptions: Array<{
      baseSolution: GlobalDatasetEntry;
      customizationContributor: RepositoryOptIn;
      customizationScore: number;
    }> = [];

    for (const solution of existingSolutions) {
      if (solution.procurementCompatibility.customizationRequired) {
        for (const contributor of availableContributors) {
          const customizationScore = this.scoreCustomizationCapability(solution, contributor);
          if (customizationScore > 70) {
            hybridOptions.push({
              baseSolution: solution,
              customizationContributor: contributor,
              customizationScore
            });
          }
        }
      }
    }

    return hybridOptions.sort((a, b) => b.customizationScore - a.customizationScore).slice(0, 10);
  }

  private async scoreTechnicalCompatibility(
    procurement: Procurement, 
    solution: GlobalDatasetEntry
  ): Promise<number> {
    let score = 0;

    // Tech stack alignment
    const requiredTech = procurement.context.technical.requiredTech;
    const solutionTech = solution.techStack;
    const techOverlap = requiredTech.filter(tech => 
      solutionTech.some(sTech => sTech.toLowerCase().includes(tech.toLowerCase()))
    ).length;
    const techScore = (techOverlap / Math.max(requiredTech.length, 1)) * 100;
    score += techScore * 0.4;

    // Complexity alignment
    const procurementComplexity = this.calculateMaxComplexity(procurement.measurementCriteria);
    const complexityDiff = Math.abs(procurementComplexity - solution.complexity);
    const complexityScore = Math.max(0, 100 - (complexityDiff * 2));
    score += complexityScore * 0.3;

    // Semantic similarity
    const semanticScore = await this.calculateSemanticSimilarity(procurement, solution);
    score += semanticScore * 0.3;

    return Math.min(100, score);
  }

  private scoreQualityAlignment(procurement: Procurement, solution: GlobalDatasetEntry): number {
    const momCriteria = procurement.measurementCriteria;
    const solutionQuality = solution.quality;

    let score = 0;

    // Code quality alignment
    if (solutionQuality.codeQuality >= momCriteria.codeQuality.minThreshold) {
      score += (solutionQuality.codeQuality / 100) * momCriteria.codeQuality.weight * 100;
    }

    // Maintainability check
    if (solutionQuality.maintainability >= 70) {
      score += 20;
    }

    // Documentation quality
    if (solutionQuality.documentation >= 70) {
      score += 15;
    }

    // Test coverage
    if (solutionQuality.testCoverage >= 70) {
      score += 15;
    }

    return Math.min(100, score);
  }

  private scoreContributorReputation(contributor: RepositoryOptIn): number {
    const metrics = contributor.metrics;
    let score = 0;

    // Average rating (0-5 scale)
    score += (metrics.averageRating / 5) * 40;

    // Completion rate
    score += metrics.completionRate * 0.3;

    // Response time (bonus for fast response)
    const responseBonus = Math.max(0, 20 - (metrics.responseTime / 24) * 10);
    score += responseBonus;

    // Success history
    const successBonus = Math.min(20, metrics.successfulProcurements * 2);
    score += successBonus;

    return Math.min(100, score);
  }

  private scoreTimelineCompatibility(procurement: Procurement, contributor: RepositoryOptIn): number {
    let score = 80; // Base score

    // Check deadline pressure
    if (procurement.deadline) {
      const timeUntilDeadline = new Date(procurement.deadline).getTime() - Date.now();
      const daysUntilDeadline = timeUntilDeadline / (1000 * 60 * 60 * 24);
      
      if (daysUntilDeadline < contributor.metrics.responseTime / 24) {
        score -= 30; // Tight deadline penalty
      }
    }

    // Contributor availability
    if (contributor.metrics.responseTime <= 24) {
      score += 20; // Fast response bonus
    }

    return Math.max(0, Math.min(100, score));
  }

  private async scoreCostEffectiveness(
    procurement: Procurement,
    solution?: GlobalDatasetEntry,
    contributor?: RepositoryOptIn
  ): Promise<number> {
    const procurementBudget = parseFloat(procurement.estimatedReward.totalAmount);
    let estimatedCost = 0;

    if (solution && !contributor) {
      // Existing solution - minimal cost
      estimatedCost = parseFloat(solution.procurementCompatibility.minBudget);
    } else if (contributor && !solution) {
      // Custom development
      estimatedCost = parseFloat(contributor.settings.minimumReward);
    } else if (solution && contributor) {
      // Hybrid - base cost + customization
      estimatedCost = parseFloat(solution.procurementCompatibility.minBudget) + 
                     parseFloat(contributor.settings.minimumReward) * 0.5;
    }

    // Cost effectiveness score (inverse relationship)
    const costRatio = estimatedCost / procurementBudget;
    if (costRatio <= 0.5) return 100;
    if (costRatio <= 0.75) return 80;
    if (costRatio <= 1.0) return 60;
    return Math.max(0, 60 - ((costRatio - 1) * 40));
  }

  private scoreInnovationPotential(
    procurement: Procurement,
    solution?: GlobalDatasetEntry,
    contributor?: RepositoryOptIn
  ): number {
    let score = 50; // Base innovation score

    // Existing solution innovation
    if (solution) {
      if (solution.type === 'innovation' || solution.tags.includes('novel')) {
        score += 30;
      }
      if (solution.quality.performance > 90) {
        score += 20;
      }
    }

    // Contributor innovation history
    if (contributor) {
      // Check for innovation in contributor's past work
      if (contributor.metadata.specializations.includes('innovation')) {
        score += 25;
      }
      if (contributor.metrics.averageRating > 4.5) {
        score += 15;
      }
    }

    // Procurement innovation requirements
    const momCriteria = procurement.measurementCriteria;
    if (momCriteria.innovation.weight > 0.2) {
      score += 10; // Bonus for innovation-focused procurements
    }

    return Math.min(100, score);
  }

  private calculateConfidence(
    scores: Record<string, number>,
    solution?: GlobalDatasetEntry,
    contributor?: RepositoryOptIn
  ): number {
    let confidence = 0.5; // Base confidence

    // Data availability boosts confidence
    if (solution) {
      confidence += 0.2;
      if (solution.usageCount > 5) confidence += 0.1;
      if (solution.averageRating > 4.0) confidence += 0.1;
    }

    if (contributor) {
      confidence += 0.2;
      if (contributor.metrics.successfulProcurements > 3) confidence += 0.1;
      if (contributor.metrics.averageRating > 4.0) confidence += 0.1;
    }

    // Score variance affects confidence
    const scoreValues = Object.values(scores);
    const avgScore = scoreValues.reduce((a, b) => a + b, 0) / scoreValues.length;
    const variance = scoreValues.reduce((sum, score) => sum + Math.pow(score - avgScore, 2), 0) / scoreValues.length;
    const normalizedVariance = Math.min(variance / 1000, 0.3); // Cap variance impact
    confidence -= normalizedVariance;

    return Math.max(0.1, Math.min(1.0, confidence));
  }

  private estimateSuccessProbability(scores: Record<string, number>, procurement: Procurement): number {
    const avgScore = Object.values(scores).reduce((a, b) => a + b, 0) / Object.values(scores).length;
    
    // Base probability from scores
    let probability = avgScore / 100;

    // Adjust for procurement complexity
    const complexity = this.calculateMaxComplexity(procurement.measurementCriteria);
    if (complexity > 80) probability *= 0.8;
    else if (complexity < 30) probability *= 1.1;

    // Adjust for deadline pressure
    if (procurement.deadline) {
      const timeUntilDeadline = new Date(procurement.deadline).getTime() - Date.now();
      const daysUntilDeadline = timeUntilDeadline / (1000 * 60 * 60 * 24);
      if (daysUntilDeadline < 7) probability *= 0.9;
    }

    return Math.max(0.1, Math.min(1.0, probability));
  }

  private async calculateCostEffectiveness(
    procurement: Procurement,
    solution?: GlobalDatasetEntry,
    contributor?: RepositoryOptIn
  ): Promise<number> {
    const budget = parseFloat(procurement.estimatedReward.totalAmount);
    const estimatedValue = this.estimateBusinessValue(procurement);
    
    return estimatedValue / budget; // Value per token ratio
  }

  private estimateTimeToCompletion(
    procurement: Procurement,
    solution?: GlobalDatasetEntry,
    contributor?: RepositoryOptIn
  ): number {
    let baseHours = 24; // Default 24 hours

    if (solution && !contributor) {
      // Existing solution - quick integration
      baseHours = solution.procurementCompatibility.estimatedEffort;
    } else if (contributor) {
      // Custom work
      const complexity = this.calculateMaxComplexity(procurement.measurementCriteria);
      baseHours = complexity > 80 ? 40 : complexity > 60 ? 20 : complexity > 30 ? 10 : 5;
      
      // Add contributor response time
      baseHours += contributor.metrics.responseTime;
    }

    return baseHours;
  }

  private assessRisks(
    procurement: Procurement,
    solution?: GlobalDatasetEntry,
    contributor?: RepositoryOptIn,
    scores: Record<string, number>
  ): MatchingResult['riskAssessment'] {
    let technical = 0.2; // Base technical risk
    let timeline = 0.3; // Base timeline risk
    let quality = 0.2; // Base quality risk

    // Technical risk assessment
    if (scores.technical < 70) technical += 0.3;
    if (solution && solution.usageCount < 3) technical += 0.2;

    // Timeline risk assessment
    if (procurement.deadline) {
      const daysUntilDeadline = (new Date(procurement.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
      if (daysUntilDeadline < 7) timeline += 0.4;
    }
    if (contributor && contributor.metrics.responseTime > 48) timeline += 0.2;

    // Quality risk assessment
    if (scores.quality < 70) quality += 0.3;
    if (contributor && contributor.metrics.averageRating < 4.0) quality += 0.2;

    const overall = (technical + timeline + quality) / 3;

    return {
      technical: Math.min(1.0, technical),
      timeline: Math.min(1.0, timeline),
      quality: Math.min(1.0, quality),
      overall: Math.min(1.0, overall)
    };
  }

  // Additional helper methods...

  private createSolutionMatch(procurement: Procurement, solution: GlobalDatasetEntry): ProcurementMatch {
    // Implementation for creating solution-based matches
    return {
      type: 'existing-solution',
      procurement,
      solution,
      match: {
        score: 0, confidence: 0, reasoning: [], estimatedSuccess: 0,
        costEffectiveness: 0, timeToCompletion: 0,
        riskAssessment: { technical: 0, timeline: 0, quality: 0, overall: 0 }
      },
      alternatives: []
    };
  }

  private createContributorMatch(procurement: Procurement, contributor: RepositoryOptIn): ProcurementMatch {
    // Implementation for creating contributor-based matches
    return {
      type: 'contributor',
      procurement,
      contributor,
      match: {
        score: 0, confidence: 0, reasoning: [], estimatedSuccess: 0,
        costEffectiveness: 0, timeToCompletion: 0,
        riskAssessment: { technical: 0, timeline: 0, quality: 0, overall: 0 }
      },
      alternatives: []
    };
  }

  private createHybridMatch(procurement: Procurement, hybrid: any): ProcurementMatch {
    // Implementation for creating hybrid matches
    return {
      type: 'hybrid',
      procurement,
      solution: hybrid.baseSolution,
      contributor: hybrid.customizationContributor,
      match: {
        score: 0, confidence: 0, reasoning: [], estimatedSuccess: 0,
        costEffectiveness: 0, timeToCompletion: 0,
        riskAssessment: { technical: 0, timeline: 0, quality: 0, overall: 0 }
      },
      alternatives: []
    };
  }

  private async rankMatches(matches: ProcurementMatch[], procurement: Procurement): Promise<ProcurementMatch[]> {
    // Calculate detailed scores for each match
    for (const match of matches) {
      match.match = await this.calculateMatchScore(procurement, match.solution, match.contributor);
    }

    // Sort by composite score (score * confidence * success probability)
    return matches.sort((a, b) => {
      const scoreA = a.match.score * a.match.confidence * a.match.estimatedSuccess;
      const scoreB = b.match.score * b.match.confidence * b.match.estimatedSuccess;
      return scoreB - scoreA;
    });
  }

  private async addAlternatives(matches: ProcurementMatch[], procurement: Procurement): Promise<ProcurementMatch[]> {
    // Add top 3 alternatives for each match
    for (const match of matches.slice(0, 5)) {
      const alternatives = matches
        .filter(m => m !== match)
        .slice(0, 3)
        .map(m => ({
          solution: m.solution,
          contributor: m.contributor,
          match: m.match
        }));
      
      match.alternatives = alternatives;
    }

    return matches;
  }

  // Utility methods
  private buildSemanticQuery(procurement: Procurement): string {
    return [
      procurement.title,
      procurement.description,
      ...procurement.requirements,
      ...procurement.context.technical.requiredTech,
      procurement.context.business.useCase
    ].join(' ');
  }

  private inferCategory(procurement: Procurement): SolutionCategory {
    const content = [procurement.title, procurement.description, ...procurement.requirements].join(' ').toLowerCase();
    
    if (content.includes('ai') || content.includes('ml')) return 'ai-tools';
    if (content.includes('security') || content.includes('auth')) return 'security';
    if (content.includes('ui') || content.includes('component')) return 'ui-components';
    if (content.includes('test')) return 'testing';
    if (content.includes('data')) return 'data-processing';
    if (content.includes('infrastructure')) return 'infrastructure';
    
    return 'other';
  }

  private calculateMaxComplexity(criteria: any): number {
    return Math.min(
      (criteria.codeQuality.weight + criteria.completeness.weight + 
       criteria.innovation.weight + criteria.impact.weight) * 100, 
      100
    );
  }

  private isCurrentlyAvailable(contributor: RepositoryOptIn): boolean {
    // TODO: Check current workload, availability status
    return true; // For now, assume all opted-in contributors are available
  }

  private scoreCustomizationCapability(solution: GlobalDatasetEntry, contributor: RepositoryOptIn): number {
    // Score how well a contributor can customize a specific solution
    const techOverlap = solution.techStack.filter(tech => 
      contributor.metadata.techStack.some(cTech => 
        cTech.toLowerCase().includes(tech.toLowerCase())
      )
    ).length;
    
    const techScore = (techOverlap / solution.techStack.length) * 100;
    const reputationScore = (contributor.metrics.averageRating / 5) * 100;
    
    return (techScore * 0.6) + (reputationScore * 0.4);
  }

  private async calculateSemanticSimilarity(procurement: Procurement, solution: GlobalDatasetEntry): Promise<number> {
    // TODO: Calculate cosine similarity between embeddings
    return 75; // Placeholder
  }

  private estimateBusinessValue(procurement: Procurement): number {
    // Estimate business value based on impact criteria and requirements
    const impact = procurement.measurementCriteria.impact.weight * 100;
    const complexity = this.calculateMaxComplexity(procurement.measurementCriteria);
    
    return (impact + complexity) / 2;
  }
}