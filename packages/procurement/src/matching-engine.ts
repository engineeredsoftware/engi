/**
 * PRODUCTION-GRADE PROCUREMENT MATCHING ENGINE
 * 
 * Intelligent matching system that connects procurement requests with optimal contributors
 * using advanced algorithms, real-time scoring, and quality assessment.
 */

import { supabaseAdmin } from '@bitcode/supabase';
import { log } from '@bitcode/logger';
import { telemetry } from '@bitcode/observability';
import { ProcurementEngine } from './core';
import { NotificationService } from './notifications-production';
import { ProcurementErrorHandler, withErrorHandling } from './error-handling';
import { ProcurementMonitoring } from './monitoring';
import type { 
  ProcurementRequest, 
  ContributorProfile, 
  MatchScore, 
  MatchingResult,
  QualityMetrics 
} from './types';

interface MatchingCriteria {
  skillMatch: number;
  experienceLevel: number;
  availability: number;
  rateCompatibility: number;
  reputationScore: number;
  repositoryRelevance: number;
  geographicPreference: number;
  workloadCapacity: number;
}

interface MatchingWeights {
  skills: number;
  experience: number;
  availability: number;
  budget: number;
  quality: number;
  speed: number;
  reputation: number;
  cultural: number;
}

export class ProcurementMatchingEngine {
  private readonly notificationService: NotificationService;
  private readonly engine: ProcurementEngine;

  constructor() {
    this.notificationService = new NotificationService();
    this.engine = new ProcurementEngine();
  }

  /**
   * CORE MATCHING ALGORITHM
   * Finds and ranks the best contributors for a procurement request
   */
  // TODO: Enable decorators when Next.js webpack configuration supports them
  // @withErrorHandling('find_matches', { 
  //   retryConfig: { maxAttempts: 2, retryableErrors: ['timeout', 'database', 'network'] },
  //   useCircuitBreaker: true,
  //   circuitBreakerKey: 'matching_engine'
  // })
  // @ProcurementMonitoring.measurePerformance('find_matches')
  async findMatches(
    requestId: string, 
    maxMatches: number = 10,
    options: {
      urgencyBoost?: boolean;
      qualityThreshold?: number;
      budgetFlexibility?: number;
    } = {}
  ): Promise<MatchingResult[]> {
    const startTime = Date.now();
    const correlationId = `match_${Date.now()}_${Math.random().toString(36).slice(2)}`;

    try {
      log('Starting procurement matching process', 'info', {
        requestId,
        maxMatches,
        options,
        correlationId
      });

      // 1. Fetch procurement request details
      const request = await this.fetchProcurementRequest(requestId);
      if (!request) {
        throw new Error(`Procurement request ${requestId} not found`);
      }

      // 2. Get eligible contributors based on availability and basic criteria
      const eligibleContributors = await this.getEligibleContributors(request);
      
      log('Found eligible contributors', 'info', {
        requestId,
        eligibleCount: eligibleContributors.length,
        correlationId
      });

      if (eligibleContributors.length === 0) {
        telemetry.recordEvent('procurement_no_matches', { requestId, correlationId });
        return [];
      }

      // 3. Calculate match scores for each contributor
      const scoredMatches = await Promise.all(
        eligibleContributors.map(contributor => 
          this.calculateMatchScore(request, contributor, options)
        )
      );

      // 4. Rank and filter matches
      const rankedMatches = scoredMatches
        .filter(match => match.overallScore >= (options.qualityThreshold || 0.6))
        .sort((a, b) => b.overallScore - a.overallScore)
        .slice(0, maxMatches);

      // 5. Enrich matches with additional context
      const enrichedMatches = await Promise.all(
        rankedMatches.map(match => this.enrichMatchResult(match, request))
      );

      const processingTime = Date.now() - startTime;

      // Record business metrics
      ProcurementMonitoring.recordBusinessEvent('matches_found', {
        requestId,
        matchesFound: enrichedMatches.length,
        processingTime,
        topScore: enrichedMatches[0]?.overallScore || 0,
        averageScore: enrichedMatches.reduce((sum, m) => sum + m.overallScore, 0) / enrichedMatches.length || 0
      });

      log('Procurement matching completed', 'info', {
        requestId,
        matchesFound: enrichedMatches.length,
        processingTime,
        topScore: enrichedMatches[0]?.overallScore,
        correlationId
      });

      telemetry.recordEvent('procurement_matching_completed', {
        requestId,
        matchesFound: enrichedMatches.length,
        processingTime,
        averageScore: enrichedMatches.reduce((sum, m) => sum + m.overallScore, 0) / enrichedMatches.length,
        correlationId
      });

      return enrichedMatches;

    } catch (error) {
      log('Procurement matching failed', 'error', {
        requestId,
        error: error instanceof Error ? error.message : String(error),
        correlationId
      });

      telemetry.recordEvent('procurement_matching_error', {
        requestId,
        error: error instanceof Error ? error.message : String(error),
        correlationId
      });

      throw error;
    }
  }

  /**
   * AUTOMATIC MATCHING AND NOTIFICATION
   * Runs matching and automatically notifies top candidates
   */
  // TODO: Enable decorators when Next.js webpack configuration supports them
  // @withErrorHandling('process_new_request', { 
  //   retryConfig: { maxAttempts: 1, retryableErrors: ['timeout', 'network'] },
  //   useCircuitBreaker: true,
  //   circuitBreakerKey: 'auto_matching'
  // })
  // @ProcurementMonitoring.measurePerformance('process_new_request')
  async processNewRequest(requestId: string): Promise<void> {
    const correlationId = `auto_match_${Date.now()}_${Math.random().toString(36).slice(2)}`;

    try {
      log('Processing new procurement request for automatic matching', 'info', {
        requestId,
        correlationId
      });

      // Get matches with high quality threshold for automatic processing
      const matches = await this.findMatches(requestId, 5, {
        qualityThreshold: 0.8,
        urgencyBoost: true
      });

      if (matches.length === 0) {
        log('No high-quality matches found for automatic processing', 'warn', {
          requestId,
          correlationId
        });
        
        // Trigger manual review process
        await this.triggerManualReview(requestId, 'no_automatic_matches');
        return;
      }

      // Notify top matches
      const notificationPromises = matches.map(async (match, index) => {
        const priority = index === 0 ? 'high' : index < 3 ? 'medium' : 'low';
        
        return this.notificationService.notifyContributorOfMatch({
          contributorId: match.contributor.userId,
          requestId,
          matchScore: match.overallScore,
          priority,
          estimatedEarnings: this.calculateEstimatedEarnings(match),
          deadline: match.request.deadline,
          correlationId
        });
      });

      await Promise.all(notificationPromises);

      // Update request status
      await supabaseAdmin
        .from('procurement_requests')
        .update({
          status: 'matching_in_progress',
          updated_at: new Date().toISOString()
        })
        .eq('id', requestId);

      log('Automatic matching and notification completed', 'info', {
        requestId,
        notifiedContributors: matches.length,
        correlationId
      });

      telemetry.recordEvent('procurement_auto_matching_completed', {
        requestId,
        notifiedContributors: matches.length,
        topScore: matches[0].overallScore,
        correlationId
      });

    } catch (error) {
      log('Automatic matching processing failed', 'error', {
        requestId,
        error: error instanceof Error ? error.message : String(error),
        correlationId
      });

      await this.triggerManualReview(requestId, 'automatic_processing_failed');
      throw error;
    }
  }

  /**
   * REAL-TIME CONTRIBUTOR SCORING
   * Calculates comprehensive match score for contributor-request pair
   */
  private async calculateMatchScore(
    request: ProcurementRequest,
    contributor: ContributorProfile,
    options: any = {}
  ): Promise<MatchScore> {
    const correlationId = `score_${Date.now()}_${Math.random().toString(36).slice(2)}`;

    try {
      // Define matching criteria with dynamic weights
      const weights = this.getMatchingWeights(request, options);

      // 1. Skill matching analysis
      const skillMatch = this.calculateSkillMatch(request.requirements, contributor.skillTags);
      
      // 2. Experience level compatibility
      const experienceMatch = this.calculateExperienceMatch(request.complexity, contributor.experienceLevel);
      
      // 3. Availability alignment
      const availabilityMatch = this.calculateAvailabilityMatch(request.deadline, contributor.availability);
      
      // 4. Budget compatibility
      const budgetMatch = this.calculateBudgetMatch(request.estimatedReward, contributor.hourlyRate);
      
      // 5. Quality/reputation score
      const qualityScore = await this.calculateQualityScore(contributor.userId);
      
      // 6. Repository relevance
      const repoRelevance = await this.calculateRepositoryRelevance(request, contributor.userId);
      
      // 7. Workload capacity
      const capacityScore = await this.calculateWorkloadCapacity(contributor.userId);
      
      // 8. Geographic/timezone alignment
      const geoAlignment = await this.calculateGeographicAlignment(request, contributor);

      // Calculate weighted overall score
      const overallScore = (
        skillMatch * weights.skills +
        experienceMatch * weights.experience +
        availabilityMatch * weights.availability +
        budgetMatch * weights.budget +
        qualityScore * weights.quality +
        repoRelevance * weights.reputation +
        capacityScore * weights.speed +
        geoAlignment * weights.cultural
      );

      const matchScore: MatchScore = {
        contributor,
        request,
        overallScore: Math.min(overallScore, 1.0),
        breakdown: {
          skillMatch,
          experienceMatch,
          availabilityMatch,
          budgetMatch,
          qualityScore,
          repositoryRelevance: repoRelevance,
          workloadCapacity: capacityScore,
          geographicAlignment: geoAlignment
        },
        confidence: this.calculateConfidence([
          skillMatch, experienceMatch, availabilityMatch, 
          budgetMatch, qualityScore, repoRelevance
        ]),
        reasoning: this.generateMatchReasoning({
          skillMatch, experienceMatch, availabilityMatch,
          budgetMatch, qualityScore, repoRelevance
        }),
        estimatedCompletionTime: this.estimateCompletionTime(request, contributor),
        riskFactors: this.identifyRiskFactors(request, contributor),
        correlationId
      };

      log('Match score calculated', 'debug', {
        requestId: request.id,
        contributorId: contributor.userId,
        overallScore: matchScore.overallScore,
        topFactors: this.getTopScoringFactors(matchScore.breakdown),
        correlationId
      });

      return matchScore;

    } catch (error) {
      log('Match score calculation failed', 'error', {
        requestId: request.id,
        contributorId: contributor.userId,
        error: error instanceof Error ? error.message : String(error),
        correlationId
      });

      // Return minimal score on error
      return {
        contributor,
        request,
        overallScore: 0.1,
        breakdown: {} as any,
        confidence: 0.0,
        reasoning: 'Score calculation failed',
        estimatedCompletionTime: 0,
        riskFactors: ['Scoring error occurred'],
        correlationId
      };
    }
  }

  /**
   * INTELLIGENT SKILL MATCHING
   * Advanced semantic matching of required skills to contributor skills
   */
  private calculateSkillMatch(requirements: string[], contributorSkills: string[]): number {
    if (requirements.length === 0) return 0.8; // No specific requirements
    if (contributorSkills.length === 0) return 0.1; // No skills listed

    // Create skill synonym mapping for better matching
    const skillSynonyms: Record<string, string[]> = {
      'react': ['reactjs', 'react.js', 'frontend', 'javascript'],
      'typescript': ['ts', 'javascript', 'js'],
      'node.js': ['nodejs', 'node', 'backend', 'javascript'],
      'python': ['py', 'django', 'flask', 'fastapi'],
      'docker': ['containerization', 'containers', 'devops'],
      'kubernetes': ['k8s', 'container orchestration', 'devops'],
      'aws': ['amazon web services', 'cloud', 'ec2', 's3'],
      'postgresql': ['postgres', 'sql', 'database'],
      'mongodb': ['mongo', 'nosql', 'database']
    };

    let totalMatches = 0;
    let weightedScore = 0;

    for (const requirement of requirements) {
      const reqLower = requirement.toLowerCase();
      let bestMatch = 0;

      // Direct match
      for (const skill of contributorSkills) {
        const skillLower = skill.toLowerCase();
        
        if (skillLower === reqLower) {
          bestMatch = 1.0;
          break;
        }
        
        // Partial match
        if (skillLower.includes(reqLower) || reqLower.includes(skillLower)) {
          bestMatch = Math.max(bestMatch, 0.8);
        }
        
        // Synonym match
        const synonyms = skillSynonyms[reqLower] || [];
        if (synonyms.some(syn => skillLower.includes(syn) || syn.includes(skillLower))) {
          bestMatch = Math.max(bestMatch, 0.7);
        }
      }

      totalMatches += bestMatch;
      weightedScore += bestMatch;
    }

    // Bonus for having more skills than required
    const skillAbundanceBonus = Math.min(contributorSkills.length / requirements.length, 2.0) * 0.1;
    
    return Math.min((weightedScore / requirements.length) + skillAbundanceBonus, 1.0);
  }

  /**
   * EXPERIENCE LEVEL MATCHING
   */
  private calculateExperienceMatch(complexity: string, contributorLevel: string): number {
    const complexityLevels = { low: 1, medium: 2, high: 3, expert: 4 };
    const experienceLevels = { junior: 1, mid: 2, senior: 3, expert: 4 };

    const requiredLevel = complexityLevels[complexity as keyof typeof complexityLevels] || 2;
    const contributorExperience = experienceLevels[contributorLevel as keyof typeof experienceLevels] || 2;

    if (contributorExperience >= requiredLevel) {
      // Perfect match or overqualified (slight penalty for massive overqualification)
      const overqualification = contributorExperience - requiredLevel;
      return Math.max(1.0 - (overqualification * 0.1), 0.8);
    } else {
      // Underqualified - exponential penalty
      const gap = requiredLevel - contributorExperience;
      return Math.max(0.5 - (gap * 0.2), 0.1);
    }
  }

  /**
   * AVAILABILITY MATCHING
   */
  private calculateAvailabilityMatch(deadline: string | null, contributorAvailability: string): number {
    if (!deadline) return 0.8; // No specific deadline

    const now = new Date();
    const deadlineDate = new Date(deadline);
    const daysUntilDeadline = Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    const availabilityScores = {
      'full-time': 1.0,
      'part-time': 0.7,
      'weekends': 0.4,
      'evenings': 0.5
    };

    const baseScore = availabilityScores[contributorAvailability as keyof typeof availabilityScores] || 0.5;

    // Adjust based on deadline urgency
    if (daysUntilDeadline <= 1) {
      // Urgent - only full-time contributors score well
      return contributorAvailability === 'full-time' ? 1.0 : 0.2;
    } else if (daysUntilDeadline <= 7) {
      // One week - prefer full-time and part-time
      return contributorAvailability === 'full-time' ? 1.0 : 
             contributorAvailability === 'part-time' ? 0.8 : 0.4;
    } else {
      // Longer timeline - all availability types work
      return baseScore;
    }
  }

  /**
   * BUDGET COMPATIBILITY SCORING
   */
  private calculateBudgetMatch(requestBudget: number, contributorRate: number): number {
    // Estimate hours based on budget (assuming reasonable project scope)
    const estimatedHours = requestBudget / contributorRate;

    // Optimal project size is 20-40 hours
    if (estimatedHours >= 20 && estimatedHours <= 40) {
      return 1.0;
    } else if (estimatedHours >= 10 && estimatedHours <= 60) {
      return 0.8;
    } else if (estimatedHours >= 5 && estimatedHours <= 80) {
      return 0.6;
    } else {
      return 0.3; // Too small or too large
    }
  }

  /**
   * QUALITY SCORE CALCULATION
   */
  private async calculateQualityScore(contributorId: string): Promise<number> {
    try {
      const { data: stats } = await supabaseAdmin
        .rpc('calculate_user_procurement_stats', { target_user_id: contributorId });

      if (!stats || stats.length === 0) {
        return 0.6; // New contributor baseline
      }

      const { completed_count, average_rating } = stats[0];

      // Base score from rating
      let score = (average_rating || 0) / 5.0;

      // Experience bonus
      const experienceBonus = Math.min(completed_count * 0.05, 0.3);
      score += experienceBonus;

      // Reliability bonus for consistent delivery
      if (completed_count >= 5 && average_rating >= 4.0) {
        score += 0.1;
      }

      return Math.min(score, 1.0);

    } catch (error) {
      log('Quality score calculation failed', 'error', {
        contributorId,
        error: error instanceof Error ? error.message : String(error)
      });
      return 0.5; // Fallback score
    }
  }

  /**
   * REPOSITORY RELEVANCE ANALYSIS
   */
  private async calculateRepositoryRelevance(request: ProcurementRequest, contributorId: string): Promise<number> {
    try {
      // Get contributor's opted-in repositories
      const { data: repos } = await supabaseAdmin
        .from('procurement_repository_opt_ins')
        .select('repository_name')
        .eq('user_id', contributorId)
        .eq('is_active', true);

      if (!repos || repos.length === 0) {
        return 0.3; // No repositories opted in
      }

      // Analyze repository relevance based on:
      // 1. Technology stack alignment
      // 2. Project size similarity
      // 3. Domain expertise

      let relevanceScore = 0.5; // Base score for having repositories

      // Technology stack bonus
      const repoNames = repos.map(r => r.repository_name.toLowerCase());
      const hasRelevantTech = repoNames.some(name => 
        request.requirements.some(req => 
          name.includes(req.toLowerCase()) || req.toLowerCase().includes(name)
        )
      );

      if (hasRelevantTech) {
        relevanceScore += 0.3;
      }

      // Repository diversity bonus
      if (repos.length >= 3) {
        relevanceScore += 0.1;
      }

      return Math.min(relevanceScore, 1.0);

    } catch (error) {
      log('Repository relevance calculation failed', 'error', {
        contributorId,
        requestId: request.id,
        error: error instanceof Error ? error.message : String(error)
      });
      return 0.4; // Fallback score
    }
  }

  /**
   * WORKLOAD CAPACITY ASSESSMENT
   */
  private async calculateWorkloadCapacity(contributorId: string): Promise<number> {
    try {
      // Check current active proposals and projects
      const { data: activeWork } = await supabaseAdmin
        .from('procurement_proposals')
        .select('id, procurement_request_id')
        .eq('contributor_id', contributorId)
        .in('status', ['pending', 'accepted']);

      const activeCount = activeWork?.length || 0;

      // Capacity scoring based on current workload
      if (activeCount === 0) return 1.0; // Fully available
      if (activeCount === 1) return 0.8; // One project
      if (activeCount === 2) return 0.5; // Two projects
      if (activeCount >= 3) return 0.2; // Overloaded

      return 0.6; // Default

    } catch (error) {
      log('Workload capacity calculation failed', 'error', {
        contributorId,
        error: error instanceof Error ? error.message : String(error)
      });
      return 0.7; // Assume moderate capacity
    }
  }

  /**
   * GEOGRAPHIC ALIGNMENT (Future Enhancement)
   */
  private async calculateGeographicAlignment(request: ProcurementRequest, contributor: ContributorProfile): Promise<number> {
    // TODO: Implement timezone and geographic preferences
    // For now, return neutral score
    return 0.8;
  }

  /**
   * DYNAMIC WEIGHT CALCULATION
   */
  private getMatchingWeights(request: ProcurementRequest, options: any): MatchingWeights {
    const baseWeights: MatchingWeights = {
      skills: 0.25,
      experience: 0.20,
      availability: 0.15,
      budget: 0.15,
      quality: 0.15,
      speed: 0.05,
      reputation: 0.03,
      cultural: 0.02
    };

    // Adjust weights based on request urgency
    if (options.urgencyBoost && request.priority === 'urgent') {
      baseWeights.availability += 0.1;
      baseWeights.speed += 0.1;
      baseWeights.skills -= 0.05;
      baseWeights.budget -= 0.05;
    }

    // Adjust for high-value projects
    if (request.estimatedReward > 1000) {
      baseWeights.quality += 0.1;
      baseWeights.experience += 0.05;
      baseWeights.reputation += 0.05;
      baseWeights.skills -= 0.1;
      baseWeights.budget -= 0.1;
    }

    return baseWeights;
  }

  /**
   * HELPER METHODS
   */
  private async fetchProcurementRequest(requestId: string): Promise<ProcurementRequest | null> {
    const { data, error } = await supabaseAdmin
      .from('procurement_requests')
      .select('*')
      .eq('id', requestId)
      .single();

    if (error) {
      log('Failed to fetch procurement request', 'error', { requestId, error });
      return null;
    }

    return data as ProcurementRequest;
  }

  private async getEligibleContributors(request: ProcurementRequest): Promise<ContributorProfile[]> {
    const { data, error } = await supabaseAdmin
      .from('procurement_profiles')
      .select(`
        *,
        user_id,
        procurement_repository_opt_ins!inner(repository_name)
      `)
      .eq('is_available', true)
      .gte('hourly_rate', request.estimatedReward * 0.5) // Rough budget filter
      .lte('hourly_rate', request.estimatedReward * 2.0);

    if (error) {
      log('Failed to fetch eligible contributors', 'error', { requestId: request.id, error });
      return [];
    }

    return (data || []).map(profile => ({
      userId: profile.user_id,
      skillTags: profile.skill_tags || [],
      experienceLevel: profile.experience_level,
      hourlyRate: profile.hourly_rate,
      availability: profile.availability,
      preferredProjectTypes: profile.preferred_project_types || [],
      bio: profile.bio,
      totalEarnedCredits: profile.total_earned_credits || 0,
      completedProjects: profile.completed_projects || 0,
      averageRating: profile.average_rating || 0
    }));
  }

  private async enrichMatchResult(match: MatchScore, request: ProcurementRequest): Promise<MatchingResult> {
    return {
      ...match,
      recommendedAction: this.getRecommendedAction(match),
      notifications: await this.prepareNotificationData(match, request),
      timeline: this.generateProjectTimeline(match, request)
    };
  }

  private calculateEstimatedEarnings(match: MatchScore): number {
    const baseEarnings = match.request.estimatedReward;
    const qualityBonus = match.breakdown.qualityScore * 0.2;
    return Math.round(baseEarnings * (1 + qualityBonus));
  }

  private calculateConfidence(scores: number[]): number {
    const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    const variance = scores.reduce((sum, score) => sum + Math.pow(score - average, 2), 0) / scores.length;
    const stdDev = Math.sqrt(variance);
    
    // Lower standard deviation = higher confidence
    return Math.max(0, 1 - stdDev);
  }

  private generateMatchReasoning(breakdown: any): string {
    const topFactors = Object.entries(breakdown)
      .sort(([,a], [,b]) => (b as number) - (a as number))
      .slice(0, 3)
      .map(([key, score]) => `${key}: ${((score as number) * 100).toFixed(0)}%`);

    return `Strong match based on ${topFactors.join(', ')}`;
  }

  private estimateCompletionTime(request: ProcurementRequest, contributor: ContributorProfile): number {
    const baseHours = request.estimatedReward / contributor.hourlyRate;
    const experienceMultiplier = contributor.experienceLevel === 'expert' ? 0.8 : 
                                 contributor.experienceLevel === 'senior' ? 0.9 : 
                                 contributor.experienceLevel === 'mid' ? 1.0 : 1.2;
    
    return Math.round(baseHours * experienceMultiplier);
  }

  private identifyRiskFactors(request: ProcurementRequest, contributor: ContributorProfile): string[] {
    const risks: string[] = [];

    if (contributor.completedProjects === 0) {
      risks.push('New contributor with no completed projects');
    }

    if (contributor.averageRating < 4.0 && contributor.completedProjects > 0) {
      risks.push('Below-average quality rating');
    }

    const hoursEstimate = request.estimatedReward / contributor.hourlyRate;
    if (hoursEstimate < 5) {
      risks.push('Very small project scope');
    }

    if (request.deadline) {
      const daysUntilDeadline = Math.ceil(
        (new Date(request.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
      );
      if (daysUntilDeadline < 3) {
        risks.push('Extremely tight deadline');
      }
    }

    return risks;
  }

  private getTopScoringFactors(breakdown: any): string[] {
    return Object.entries(breakdown)
      .sort(([,a], [,b]) => (b as number) - (a as number))
      .slice(0, 2)
      .map(([key]) => key);
  }

  private getRecommendedAction(match: MatchScore): string {
    if (match.overallScore >= 0.9) return 'auto_assign';
    if (match.overallScore >= 0.8) return 'priority_notify';
    if (match.overallScore >= 0.6) return 'standard_notify';
    return 'manual_review';
  }

  private async prepareNotificationData(match: MatchScore, request: ProcurementRequest): Promise<any> {
    return {
      priority: match.overallScore >= 0.8 ? 'high' : 'medium',
      estimatedEarnings: this.calculateEstimatedEarnings(match),
      keySellingPoints: this.generateSellingPoints(match),
      nextSteps: ['Review project details', 'Submit proposal', 'Schedule discussion']
    };
  }

  private generateProjectTimeline(match: MatchScore, request: ProcurementRequest): any {
    const startDate = new Date();
    const completionHours = this.estimateCompletionTime(request, match.contributor);
    const completionDate = new Date(startDate.getTime() + completionHours * 60 * 60 * 1000);

    return {
      estimatedStart: startDate.toISOString(),
      estimatedCompletion: completionDate.toISOString(),
      milestones: this.generateMilestones(completionHours)
    };
  }

  private generateSellingPoints(match: MatchScore): string[] {
    const points: string[] = [];
    
    if (match.breakdown.skillMatch > 0.8) {
      points.push('Perfect skill alignment with your expertise');
    }
    
    if (match.breakdown.budgetMatch > 0.8) {
      points.push('Budget matches your preferred project size');
    }
    
    if (match.breakdown.experienceMatch > 0.8) {
      points.push('Project complexity suits your experience level');
    }

    return points;
  }

  private generateMilestones(totalHours: number): any[] {
    const milestones = [];
    
    if (totalHours > 40) {
      milestones.push({ name: 'Project kickoff', percentage: 0 });
      milestones.push({ name: 'Initial deliverable', percentage: 25 });
      milestones.push({ name: 'Mid-project review', percentage: 50 });
      milestones.push({ name: 'Final deliverable', percentage: 100 });
    } else {
      milestones.push({ name: 'Project start', percentage: 0 });
      milestones.push({ name: 'Progress check', percentage: 50 });
      milestones.push({ name: 'Completion', percentage: 100 });
    }

    return milestones;
  }

  private async triggerManualReview(requestId: string, reason: string): Promise<void> {
    await supabaseAdmin
      .from('procurement_requests')
      .update({
        status: 'manual_review_required',
        updated_at: new Date().toISOString()
      })
      .eq('id', requestId);

    // Notify admins
    await this.notificationService.notifyAdminsOfManualReview(requestId, reason);
  }
}