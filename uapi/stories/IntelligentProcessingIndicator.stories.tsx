import type { Meta, StoryObj } from '@storybook/react';
import { useState, useEffect } from 'react';
import { IntelligentProcessingIndicator } from '../app/components/intelligent-processing-indicator';

const meta: Meta<typeof IntelligentProcessingIndicator> = {
  title: 'Bitcode/Surprise & Delight/Intelligent Processing Indicator',
  component: IntelligentProcessingIndicator,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
### 🧠 Intelligent Processing Indicator

A consciousness-aware evolution of the standard processing indicator that demonstrates true AI intelligence through:

- **Phase-aware personality** - Contextual messages based on current pipeline phase
- **Pattern recognition celebration** - ✨ Sparkle animation when AI recognizes familiar patterns  
- **Repository awareness** - Messages adapt to detected codebase architecture
- **Intelligence particles** - Additional visual effects based on confidence and learning
- **Progress visualization** - Subtle ring showing phase completion
- **Performance optimized** - Respects device capabilities and accessibility preferences

Built on top of the existing ProcessingIndicator with full backward compatibility.
        `,
      },
    },
  },
  argTypes: {
    currentPhase: {
      control: { type: 'select' },
      options: ['setup', 'discovery', 'implementation', 'validation', 'finish'],
      description: 'Current pipeline phase affecting the message and visual behavior',
    },
    phaseProgress: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: 'Progress within current phase (0-1)',
    },
    showIntelligence: {
      control: 'boolean',
      description: 'Enable intelligence enhancements (disable for standard behavior)',
    },
    intensityLevel: {
      control: { type: 'select' },
      options: ['subtle', 'moderate', 'enhanced'],
      description: 'Visual intensity level for intelligence effects',
    },
    userPatternLearned: {
      control: 'boolean',
      description: 'Whether AI has learned user patterns (affects messaging)',
    },
    qualityConfidence: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: 'AI confidence in quality (affects glow intensity)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Standard Processing Indicator (baseline)
export const Standard: Story = {
  args: {
    label: 'Engineering',
    showIntelligence: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Standard processing indicator without intelligence enhancements (backward compatibility)',
      },
    },
  },
};

// Basic Intelligence Enhancement
export const BasicIntelligence: Story = {
  args: {
    showIntelligence: true,
    currentPhase: 'implementation',
    phaseProgress: 0.4,
    qualityConfidence: 0.7,
    intensityLevel: 'moderate',
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic intelligence enhancements with contextual messaging and subtle visual effects',
      },
    },
  },
};

// Pattern Recognition Celebration
export const PatternRecognition: Story = {
  args: {
    showIntelligence: true,
    currentPhase: 'discovery',
    phaseProgress: 0.6,
    recognizedPattern: {
      type: 'component',
      confidence: 0.87,
      previousSuccess: true,
      complexity: 'moderate',
    },
    qualityConfidence: 0.9,
    intensityLevel: 'enhanced',
  },
  parameters: {
    docs: {
      description: {
        story: '✨ Shows the pattern recognition celebration when AI detects familiar patterns with high confidence',
      },
    },
  },
};

// Repository-Aware Intelligence
export const RepositoryAware: Story = {
  args: {
    showIntelligence: true,
    repositoryContext: {
      language: 'TypeScript',
      architecture: 'React/Next.js',
      testCoverage: 94,
      componentCount: 247,
      codeStyle: 'functional-components'
    },
    currentPhase: 'validation',
    phaseProgress: 0.8,
    recognizedPattern: {
      type: 'test',
      confidence: 0.75,
      previousSuccess: true,
    },
    userPatternLearned: true,
    qualityConfidence: 0.95,
    intensityLevel: 'enhanced',
  },
  parameters: {
    docs: {
      description: {
        story: 'Repository-aware messaging: "Testing to 94% standards..." with enhanced intelligence effects',
      },
    },
  },
};

// Phase Progression Demo
export const PhaseProgression: Story = {
  render: (args) => {
    const [currentPhase, setCurrentPhase] = useState<'setup' | 'discovery' | 'implementation' | 'validation' | 'finish'>('setup');
    const [phaseProgress, setPhaseProgress] = useState(0);
    const [recognizedPattern, setRecognizedPattern] = useState<any>(null);
    
    useEffect(() => {
      const phases: typeof currentPhase[] = ['setup', 'discovery', 'implementation', 'validation', 'finish'];
      let phaseIndex = 0;
      let progress = 0;
      
      const interval = setInterval(() => {
        progress += 0.05;
        
        if (progress >= 1) {
          progress = 0;
          phaseIndex = (phaseIndex + 1) % phases.length;
          setCurrentPhase(phases[phaseIndex]);
          
          // Trigger pattern recognition during discovery
          if (phases[phaseIndex] === 'discovery' && progress < 0.1) {
            setTimeout(() => {
              setRecognizedPattern({
                type: 'component',
                confidence: 0.89,
                previousSuccess: true,
                complexity: 'moderate'
              });
            }, 1000);
          } else if (phases[phaseIndex] !== 'discovery') {
            setRecognizedPattern(null);
          }
        }
        
        setPhaseProgress(progress);
      }, 200);
      
      return () => clearInterval(interval);
    }, []);
    
    return (
      <div className="space-y-6">
        <div className="text-center text-sm text-gray-400 space-y-1">
          <div>Phase: <span className="text-brand-emerald capitalize">{currentPhase}</span></div>
          <div>Progress: <span className="text-brand-emerald">{Math.round(phaseProgress * 100)}%</span></div>
          {recognizedPattern && (
            <div>Pattern: <span className="text-ai-pattern-recognition">
              {recognizedPattern.type} ({Math.round(recognizedPattern.confidence * 100)}% confidence)
            </span></div>
          )}
        </div>
        
        <IntelligentProcessingIndicator
          {...args}
          currentPhase={currentPhase}
          phaseProgress={phaseProgress}
          recognizedPattern={recognizedPattern}
          showIntelligence={true}
          repositoryContext={{
            language: 'TypeScript',
            architecture: 'hexagonal',
            testCoverage: 91,
          }}
          userPatternLearned={true}
          qualityConfidence={0.85}
          intensityLevel="enhanced"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Automated demo cycling through all pipeline phases with intelligent messaging and pattern recognition',
      },
    },
  },
};

// High Confidence Mastery
export const HighConfidenceMastery: Story = {
  args: {
    showIntelligence: true,
    repositoryContext: {
      language: 'TypeScript',
      architecture: 'microservices',
      testCoverage: 97,
      componentCount: 450,
    },
    recognizedPattern: {
      type: 'service',
      confidence: 0.96,
      previousSuccess: true,
      complexity: 'complex',
    },
    currentPhase: 'implementation',
    phaseProgress: 0.7,
    userPatternLearned: true,
    qualityConfidence: 0.98,
    intensityLevel: 'enhanced',
  },
  parameters: {
    docs: {
      description: {
        story: 'Maximum intelligence display - high confidence, learned patterns, complex architecture recognition',
      },
    },
  },
};

// Learning Mode
export const LearningMode: Story = {
  args: {
    showIntelligence: true,
    currentPhase: 'discovery',
    phaseProgress: 0.3,
    userPatternLearned: false,
    qualityConfidence: 0.6,
    intensityLevel: 'moderate',
  },
  parameters: {
    docs: {
      description: {
        story: 'Learning mode - AI discovering new patterns with lower confidence, building familiarity',
      },
    },
  },
};

// Finish Excellence
export const FinishExcellence: Story = {
  args: {
    showIntelligence: true,
    repositoryContext: {
      language: 'TypeScript',
      architecture: 'React/Next.js',
      testCoverage: 98,
    },
    recognizedPattern: {
      type: 'component',
      confidence: 0.93,
      previousSuccess: true,
    },
    currentPhase: 'finish',
    phaseProgress: 0.95,
    userPatternLearned: true,
    qualityConfidence: 0.97,
    intensityLevel: 'enhanced',
  },
  parameters: {
    docs: {
      description: {
        story: '"Preparing elegant PR..." - final phase with maximum confidence and quality celebration',
      },
    },
  },
};

// Performance Comparison
export const PerformanceComparison: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-300">Subtle</h3>
        <IntelligentProcessingIndicator
          showIntelligence={true}
          currentPhase="implementation"
          phaseProgress={0.5}
          qualityConfidence={0.8}
          intensityLevel="subtle"
          recognizedPattern={{
            type: 'component',
            confidence: 0.8,
            previousSuccess: true
          }}
        />
        <p className="text-xs text-gray-500">Minimal effects, maximum performance</p>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-300">Moderate</h3>
        <IntelligentProcessingIndicator
          showIntelligence={true}
          currentPhase="implementation"
          phaseProgress={0.5}
          qualityConfidence={0.8}
          intensityLevel="moderate"
          recognizedPattern={{
            type: 'component',
            confidence: 0.8,
            previousSuccess: true
          }}
        />
        <p className="text-xs text-gray-500">Balanced experience</p>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-300">Enhanced</h3>
        <IntelligentProcessingIndicator
          showIntelligence={true}
          currentPhase="implementation"
          phaseProgress={0.5}
          qualityConfidence={0.8}
          intensityLevel="enhanced"
          userPatternLearned={true}
          recognizedPattern={{
            type: 'component',
            confidence: 0.8,
            previousSuccess: true
          }}
        />
        <p className="text-xs text-gray-500">Full intelligence display</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of different intensity levels for performance optimization',
      },
    },
  },
};
