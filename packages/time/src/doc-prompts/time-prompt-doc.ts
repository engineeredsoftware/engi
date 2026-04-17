/**
 * TIME PROMPT DOC - PACKAGE-SPECIFIC DOC-PROMPT IMPLEMENTATION
 * 
 * This demonstrates how packages implement their own doc-prompt types
 * by extending the base DocPromptBase class from the doc-comments primitive.
 * 
 * Time package uses doc-prompts for temporal reasoning and time-slip learning.
 */

import { DocPromptBase } from '@bitcode/doc-prompt';
import { PromptPart } from '@bitcode/prompts';

// ==================== TIME-SPECIFIC DOC-PROMPT TYPES ====================

/**
 * Configuration for time-slip learning doc-prompts
 */
export interface TimeSlipLearningConfig {
  /**
   * The temporal pattern being documented
   */
  pattern: string;
  
  /**
   * Learning rate for temporal adaptation
   */
  learningRate: number;
  
  /**
   * Time window for pattern recognition
   */
  windowMs: number;
  
  /**
   * Optional decay factor
   */
  decay?: number;
}

// ==================== TIME PROMPT DOC IMPLEMENTATION ====================

/**
 * @doc-prompt-time-slip-learning
 * pattern: Iterative refinement cycles with temporal awareness
 * learningRate: 0.85
 * windowMs: 5000
 * decay: 0.95
 */
export class TimePromptDoc extends DocPromptBase<TimeSlipLearningConfig> {
  readonly label = '@doc-prompt-time-slip-learning';
  
  /**
   * Time-specific fields that contain temporal prompts
   */
  protected temporalFields: {
    pattern: PromptPart;
    adaptation: PromptPart;
    window: PromptPart;
  };
  
  constructor(config: {
    fields: Record<string, string>;
    location?: { filePath: string; lineNumber: number; columnNumber: number };
    resolvedTypes?: Record<string, any>;
  }) {
    super(config);
    
    // Initialize temporal prompt fields
    this.temporalFields = this.initializeTemporalFields();
  }
  
  /**
   * Initialize time-specific prompt fields
   */
  private initializeTemporalFields() {
    /**
     * @doc-promptpart
     * description: Time-slip learning pattern
     * usage: Temporal reasoning in pipeline execution
     * category: framework_methodology
     * priority: high
     * frequency: as_needed
     */
    const pattern: PromptPart = this.fields.pattern || 'Temporal pattern recognition';
    
    /**
     * @doc-promptpart
     * description: Temporal adaptation parameters
     * usage: Time-aware learning configuration
     * category: operational_guidelines
     * priority: medium
     * frequency: as_needed
     */
    const adaptation: PromptPart = `Learning rate: ${this.fields.learningRate || '0.8'}, Window: ${this.fields.windowMs || '5000'}ms`;
    
    /**
     * @doc-promptpart
     * description: Temporal window configuration
     * usage: Time-based pattern analysis
     * category: framework_methodology
     * priority: medium
     * frequency: as_needed
     */
    const window: PromptPart = `Time window analysis over ${this.fields.windowMs || '5000'}ms with ${this.fields.decay ? `decay factor ${this.fields.decay}` : 'no decay'}`;
    
    return { pattern, adaptation, window };
  }
  
  /**
   * Generate time-aware prompt with temporal context
   */
  generate(context?: Record<string, any>): string {
    const sections: string[] = [];
    
    // Base generation
    sections.push(super.generate(context));
    
    // Add temporal intelligence
    sections.push('\n**TEMPORAL INTELLIGENCE**:');
    sections.push(this.temporalFields.pattern);
    sections.push(this.temporalFields.adaptation);
    sections.push(this.temporalFields.window);
    
    // Add time-slip learning context
    if (context?.currentTimeMs) {
      const elapsed = Date.now() - context.currentTimeMs;
      sections.push(`\n**TIME-SLIP CONTEXT**: ${elapsed}ms elapsed in current execution`);
    }
    
    return sections.join('\n');
  }
  
  /**
   * Required fields for time-slip learning
   */
  protected getRequiredFields(): string[] {
    return ['pattern', 'learningRate', 'windowMs'];
  }
  
  /**
   * Category for time-related doc-prompts
   */
  protected getCategory(): string {
    return 'framework_methodology';
  }
  
  /**
   * Convert to time-aware PromptPart
   */
  asPromptPart(): PromptPart {
    /**
     * @doc-promptpart
     * description: Time-slip learning doc-prompt with temporal awareness
     * usage: Temporal reasoning and pattern recognition
     * category: framework_methodology
     * priority: high
     * frequency: as_needed
     * optimization: Time-aware prompt generation with learning adaptation
     */
    return this.generate();
  }
  
  /**
   * Validate time-specific constraints
   */
  validate(): { valid: boolean; errors: string[] } {
    const baseValidation = super.validate();
    const errors = [...baseValidation.errors];
    
    // Validate learning rate
    const learningRate = parseFloat(this.fields.learningRate);
    if (isNaN(learningRate) || learningRate <= 0 || learningRate > 1) {
      errors.push('Learning rate must be between 0 and 1');
    }
    
    // Validate window
    const windowMs = parseInt(this.fields.windowMs);
    if (isNaN(windowMs) || windowMs <= 0) {
      errors.push('Window must be a positive number in milliseconds');
    }
    
    // Validate optional decay
    if (this.fields.decay) {
      const decay = parseFloat(this.fields.decay);
      if (isNaN(decay) || decay <= 0 || decay > 1) {
        errors.push('Decay must be between 0 and 1');
      }
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  }
}

// ==================== TIME-SPECIFIC CONFIGURATIONS ====================

/**
 * Configuration for time doc-prompt parsing
 */
export const timeDocPromptConfig = {
  label: '@doc-prompt-time-slip-learning',
  
  parse: (content: string, resolvedTypes?: Record<string, any>) => {
    // Use base parser
    const lines = content.split('\n');
    const fields: Record<string, string> = {};
    
    for (const line of lines) {
      const match = line.match(/^(\w+):\s*(.+)$/);
      if (match) {
        fields[match[1]] = match[2].trim();
      }
    }
    
    return fields;
  },
  
  validate: (fields: any) => {
    const errors: string[] = [];
    
    if (!fields.pattern) errors.push('Missing required field: pattern');
    if (!fields.learningRate) errors.push('Missing required field: learningRate');
    if (!fields.windowMs) errors.push('Missing required field: windowMs');
    
    return { valid: errors.length === 0, errors };
  },
  
  matchType: (type: any, typeChecker: any) => {
    // Time doc-prompts can be applied to any temporal type
    return true;
  },
  
  create: (fields: any, target?: any) => {
    return new TimePromptDoc({ fields });
  }
};

// ==================== USAGE EXAMPLE ====================

/**
 * Example of how time-slip learning doc-prompt would be used
 * 
 * @doc-prompt-time-slip-learning
 * pattern: Adaptive execution timing with phase-aware temporal windows
 * learningRate: 0.9
 * windowMs: 10000
 * decay: 0.98
 */
export interface TemporalExecutionContext {
  startTime: number;
  phaseTimings: Map<string, number>;
  adaptiveDelay: number;
  learningHistory: number[];
}