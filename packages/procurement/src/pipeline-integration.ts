/**
 * Pipeline Integration for Procurement
 * 
 * Handles procurement requests within AssetPack pipelines when procurement budget is available.
 * Enables agents to automatically request and fulfill procurements.
 */

import { log } from '@bitcode/logger';
import { ProcurementEngine } from './core';
import type { 
  Procurement, 
  MarksOfMeasurement, 
  ProcurementPriority,
  SolutionCategory 
} from './types';

export type ProcurementPipelinePhase =
  | 'discovery'
  | 'implementation'
  | 'validation'
  | 'finish';

export interface ProcurementRequest {
  title: string;
  description: string;
  requirements: string[];
  constraints: string[];
  category: SolutionCategory;
  priority: ProcurementPriority;
  maxBudget: number;
  deadline?: string;
  context: {
    phase: ProcurementPipelinePhase;
    step: string;
    agent: string;
    repository: {
      owner: string;
      name: string;
      branch: string;
      commit: string;
    };
    organizationId?: string;
    requestorId?: string;
    onContextUpdate?: (procurement: Procurement) => Promise<void> | void;
  };
}

/**
 * Create a procurement request from within a pipeline
 */
export async function createProcurementRequest(
  request: ProcurementRequest
): Promise<Procurement> {
  try {
    log('Creating procurement request from pipeline', 'info', {
      title: request.title,
      phase: request.context.phase,
      agent: request.context.agent
    });

    // Get global context for organization and user info
    const organizationId = request.context.organizationId || 'default';
    const requestorId = request.context.requestorId || 'system';

    // Check if organization has procurement budget
    const budget = await checkProcurementBudget(organizationId);
    if (!budget || budget.remainingBudget < request.maxBudget) {
      throw new Error('Insufficient procurement budget');
    }

    // Generate measurement criteria based on request context
    const measurementCriteria = generateMeasurementCriteria(request);

    // Create procurement using the engine
    const engine = new ProcurementEngine();
    const procurement = await engine.createProcurement({
      organizationId,
      requestorId,
      title: request.title,
      description: request.description,
      requirements: request.requirements,
      constraints: request.constraints,
      measurementCriteria,
      budgetLimit: request.maxBudget,
      deadline: request.deadline
    });

    // Update pipeline context with procurement info
    await notifyProcurementUpdate(procurement, request.context.onContextUpdate);

    log('Procurement request created successfully', 'info', {
      procurementId: procurement.id,
      estimatedReward: procurement.estimatedReward.totalAmount
    });

    return procurement;

  } catch (error) {
    log('Failed to create procurement request', 'error', {
      title: request.title,
      error: error instanceof Error ? error.message : String(error)
    });
    throw error;
  }
}

/**
 * Process procurement within pipeline context
 */
export async function processProcurementInPipeline(
  procurementId: string,
  phase: ProcurementPipelinePhase
): Promise<{
  matches: any[];
  recommendations: string[];
  shouldProceed: boolean;
}> {
  try {
    log('Processing procurement in pipeline', 'info', {
      procurementId,
      phase
    });

    const engine = new ProcurementEngine();

    // Get procurement details
    const procurement = await engine.getProcurement(procurementId);
    if (!procurement) {
      throw new Error('Procurement not found');
    }

    // Search for matches based on phase
    let matches: any[] = [];
    let recommendations: string[] = [];

    switch (phase) {
      case 'discovery':
        // Search global dataset for existing solutions
        matches = await engine.searchGlobalDataset(procurement);
        recommendations = generateDiscoveryRecommendations(matches);
        break;

      case 'implementation':
        // Find opted-in repositories and contributors
        const repositories = await engine.findOptedRepositories(procurement);
        matches = repositories;
        recommendations = generateImplementationRecommendations(repositories);
        break;

      case 'validation':
        // Check procurement progress and quality
        recommendations = await generateValidationRecommendations(procurement);
        break;

      case 'finish':
        // Finalize procurement and process compensation
        if (procurement.fulfillment) {
          recommendations = ['Procurement completed successfully', 'Tokens minted for contributor'];
        } else {
          recommendations = ['Procurement not yet fulfilled', 'Consider extending deadline or increasing budget'];
        }
        break;
    }

    const shouldProceed = matches.length > 0 || phase === 'validation' || phase === 'finish';

    return {
      matches,
      recommendations,
      shouldProceed
    };

  } catch (error) {
    log('Failed to process procurement in pipeline', 'error', {
      procurementId,
      phase,
      error: error instanceof Error ? error.message : String(error)
    });
    throw error;
  }
}

/**
 * Generate measurement criteria based on request context
 */
function generateMeasurementCriteria(request: ProcurementRequest): MarksOfMeasurement {
  // Base criteria that adapts based on category and priority
  const baseCriteria: MarksOfMeasurement = {
    codeQuality: {
      weight: 0.3,
      minThreshold: 70,
      description: 'Code follows best practices, is readable, and maintainable'
    },
    completeness: {
      weight: 0.3,
      minThreshold: 80,
      description: 'All requirements are fully implemented'
    },
    innovation: {
      weight: 0.2,
      minThreshold: 60,
      description: 'Solution demonstrates creativity and novel approaches'
    },
    impact: {
      weight: 0.2,
      minThreshold: 70,
      description: 'Solution provides significant value and addresses core needs'
    },
    passingScore: 70,
    bonusThresholds: [85, 95]
  };

  // Adjust criteria based on category
  switch (request.category) {
    case 'security':
      baseCriteria.security = {
        weight: 0.4,
        minThreshold: 90,
        requirements: ['vulnerability scanning', 'secure coding practices', 'penetration testing']
      };
      baseCriteria.codeQuality.weight = 0.2;
      baseCriteria.innovation.weight = 0.1;
      break;

    case 'performance':
      baseCriteria.performance = {
        weight: 0.3,
        minThreshold: 80,
        benchmarks: ['load testing', 'response time < 100ms', 'memory efficiency']
      };
      baseCriteria.impact.weight = 0.3;
      break;

    case 'testing':
      baseCriteria.codeQuality.weight = 0.4;
      baseCriteria.codeQuality.minThreshold = 85;
      baseCriteria.completeness.weight = 0.4;
      break;

    case 'documentation':
      baseCriteria.completeness.weight = 0.5;
      baseCriteria.codeQuality.weight = 0.1;
      baseCriteria.innovation.weight = 0.1;
      break;
  }

  // Adjust thresholds based on priority
  if (request.priority === 'urgent' || request.priority === 'high') {
    baseCriteria.passingScore = 60; // Lower threshold for urgent needs
    baseCriteria.completeness.minThreshold = 70;
  }

  return baseCriteria;
}

/**
 * Check organization procurement budget
 */
async function checkProcurementBudget(organizationId: string): Promise<any> {
  // TODO: Implement budget checking from database
  // For now, return mock budget
  return {
    totalBudget: 10000,
    remainingBudget: 5000,
    currency: 'BTD'
  };
}

/**
 * Update pipeline context with procurement information
 */
async function notifyProcurementUpdate(
  procurement: Procurement,
  onContextUpdate?: (procurement: Procurement) => Promise<void> | void
): Promise<void> {
  if (!onContextUpdate) {
    return;
  }

  try {
    await onContextUpdate(procurement);
    log('Notified pipeline context about procurement', 'info', {
      procurementId: procurement.id
    });
  } catch (error) {
    log('Failed to notify pipeline context about procurement', 'error', {
      procurementId: procurement.id,
      error: error instanceof Error ? error.message : String(error)
    });
  }
}

/**
 * Generate recommendations for discovery phase
 */
function generateDiscoveryRecommendations(matches: any[]): string[] {
  const recommendations: string[] = [];

  if (matches.length === 0) {
    recommendations.push('No existing solutions found in global dataset');
    recommendations.push('Consider creating new procurement for custom development');
  } else {
    recommendations.push(`Found ${matches.length} potential solutions in global dataset`);
    
    if (matches.some(m => m.quality.overall > 90)) {
      recommendations.push('High-quality solutions available - consider direct integration');
    }
    
    if (matches.some(m => m.procurementCompatibility.customizationRequired)) {
      recommendations.push('Some solutions may require customization');
    }
  }

  return recommendations;
}

/**
 * Generate recommendations for implementation phase
 */
function generateImplementationRecommendations(repositories: any[]): string[] {
  const recommendations: string[] = [];

  if (repositories.length === 0) {
    recommendations.push('No opted-in repositories found for this procurement type');
    recommendations.push('Consider expanding search criteria or increasing budget');
  } else {
    recommendations.push(`Found ${repositories.length} available contributors`);
    
    const highRated = repositories.filter(r => r.metrics.averageRating > 4.5);
    if (highRated.length > 0) {
      recommendations.push(`${highRated.length} contributors have excellent ratings (>4.5)`);
    }
    
    const fastResponders = repositories.filter(r => r.metrics.responseTime < 24);
    if (fastResponders.length > 0) {
      recommendations.push(`${fastResponders.length} contributors typically respond within 24 hours`);
    }
  }

  return recommendations;
}

/**
 * Generate recommendations for validation phase
 */
async function generateValidationRecommendations(procurement: Procurement): Promise<string[]> {
  const recommendations: string[] = [];

  if (procurement.status === 'unfilled') {
    recommendations.push('Procurement still seeking contributors');
    recommendations.push('Consider adjusting requirements or increasing budget');
  } else if (procurement.status === 'in-progress') {
    recommendations.push('Procurement work is in progress');
    recommendations.push('Monitor quality checkpoints and provide feedback');
  } else if (procurement.status === 'completed') {
    recommendations.push('Procurement work completed - ready for quality assessment');
    recommendations.push('Review fulfillment artifacts against Marks of Measurement criteria');
  }

  return recommendations;
}

/**
 * Helper to determine if procurement budget is enabled for organization
 */
export function isProcurementEnabled(organizationId: string): boolean {
  // TODO: Check organization settings/flags
  // For now, enable for all organizations
  return true;
}

/**
 * Helper to get procurement budget limits
 */
export async function getProcurementBudgetLimits(organizationId: string): Promise<{
  maxPerProcurement: number;
  dailyLimit: number;
  monthlyLimit: number;
}> {
  // TODO: Fetch from organization settings
  return {
    maxPerProcurement: 1000,
    dailyLimit: 5000,
    monthlyLimit: 50000
  };
}
