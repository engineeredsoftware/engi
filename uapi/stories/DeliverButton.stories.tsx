import type { Meta, StoryObj } from '@storybook/react';
import { useState, useEffect } from 'react';
import { DeliverButton } from '../app/components/deliver-button';

const meta: Meta<typeof DeliverButton> = {
  title: 'Bitcode/Surprise & Delight/Deliver Button',
  component: DeliverButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
### 🎯 Enhanced Deliver Button

The most critical moment in the Bitcode experience - transformed into anticipatory magic:

- **Confidence visualization** - Ring intensity reflects accumulated context quality
- **Predictive preview** - Shows what will be created before clicking
- **Resource transparency** - Clear credit/time estimates  
- **Pattern celebration** - Gold glow for recognized patterns with previous success
- **Intelligence adaptation** - Button behavior evolves based on AI confidence
- **Repository awareness** - Messaging adapts to detected architecture and language

Built on top of the existing QuantumButton with full visual continuity.
        `,
      },
    },
  },
  argTypes: {
    needDefinitionQuality: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: 'Definition of Need quality assessment (0-1)',
    },
    contextConfidence: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: 'Context confidence based on attachments and repository data (0-1)',
    },
    estimatedCredits: {
      control: { type: 'number', min: 10, max: 200, step: 5 },
      description: 'Estimated credit cost for the deliverable',
    },
    estimatedDuration: {
      control: { type: 'number', min: 1, max: 30, step: 1 },
      description: 'Estimated duration in minutes',
    },
    showPreview: {
      control: 'boolean',
      description: 'Enable predictive preview on hover',
    },
    intensityLevel: {
      control: { type: 'select' },
      options: ['subtle', 'moderate', 'enhanced'],
      description: 'Visual enhancement intensity',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Low Confidence - Needs More Context
export const LowConfidence: Story = {
  args: {
    onDeliver: () => console.log('Deliver clicked - Low confidence'),
    needDefinitionQuality: 0.3,
    contextConfidence: 0.2,
    estimatedCredits: 45,
    estimatedDuration: 8,
    recognizedPatterns: [],
    showPreview: true,
    intensityLevel: 'moderate',
  },
  parameters: {
    docs: {
      description: {
        story: 'Low confidence state - button is dimmed and disabled until quality improves',
      },
    },
  },
};

// Medium Confidence - Ready to Deliver  
export const MediumConfidence: Story = {
  args: {
    onDeliver: () => console.log('Deliver clicked - Medium confidence'),
    needDefinitionQuality: 0.7,
    contextConfidence: 0.6,
    estimatedCredits: 52,
    estimatedDuration: 4,
    recognizedPatterns: [
      {
        type: 'component',
        confidence: 0.75,
        previousSuccess: false,
      }
    ],
    repositoryContext: {
      language: 'TypeScript',
      testCoverage: 85,
      architecture: 'React/Next.js',
    },
    showPreview: true,
    intensityLevel: 'moderate',
  },
  parameters: {
    docs: {
      description: {
        story: 'Medium confidence - standard glow with confidence ring and basic preview',
      },
    },
  },
};

// High Confidence - Excellence Mode
export const HighConfidence: Story = {
  args: {
    onDeliver: () => console.log('Deliver clicked - High confidence'),
    needDefinitionQuality: 0.95,
    contextConfidence: 0.9,
    estimatedCredits: 38,
    estimatedDuration: 3,
    recognizedPatterns: [
      {
        type: 'component',
        confidence: 0.92,
        previousSuccess: true,
      },
      {
        type: 'test',
        confidence: 0.88,
        previousSuccess: true,
      }
    ],
    repositoryContext: {
      language: 'TypeScript',
      testCoverage: 97,
      architecture: 'hexagonal',
    },
    showPreview: true,
    intensityLevel: 'enhanced',
  },
  parameters: {
    docs: {
      description: {
        story: 'High confidence with pattern mastery - golden glow, "Create Excellence" text, and rich preview',
      },
    },
  },
};

// Pattern Recognition Mastery
export const PatternMastery: Story = {
  args: {
    onDeliver: () => console.log('Deliver clicked - Pattern mastery'),
    needDefinitionQuality: 0.9,
    contextConfidence: 0.85,
    estimatedCredits: 35,
    estimatedDuration: 2,
    recognizedPatterns: [
      {
        type: 'service',
        confidence: 0.94,
        previousSuccess: true,
      },
      {
        type: 'test',
        confidence: 0.91,
        previousSuccess: true,
      },
      {
        type: 'documentation',
        confidence: 0.87,
        previousSuccess: true,
      }
    ],
    repositoryContext: {
      language: 'TypeScript',
      testCoverage: 94,
      architecture: 'microservices',
    },
    showPreview: true,
    intensityLevel: 'enhanced',
  },
  parameters: {
    docs: {
      description: {
        story: 'Pattern mastery - multiple recognized patterns with high success rates, gold celebration effects',
      },
    },
  },
};

// Building Confidence Demo
export const BuildingConfidence: Story = {
  render: (args) => {
    const [needDefinitionQuality, setDodQuality] = useState(0.2);
    const [contextConfidence, setContextConfidence] = useState(0.1);
    const [recognizedPatterns, setRecognizedPatterns] = useState<any[]>([]);
    
    useEffect(() => {
      const interval = setInterval(() => {
        setDodQuality(prev => {
          const next = Math.min(prev + 0.05, 1.0);
          
          // Add pattern recognition at certain thresholds
          if (next > 0.5 && recognizedPatterns.length === 0) {
            setRecognizedPatterns([{
              type: 'component',
              confidence: 0.7,
              previousSuccess: false,
            }]);
          }
          
          if (next > 0.8 && recognizedPatterns.length === 1) {
            setRecognizedPatterns(prev => [...prev, {
              type: 'test',
              confidence: 0.85,
              previousSuccess: true,
            }]);
          }
          
          return next;
        });
        
        setContextConfidence(prev => Math.min(prev + 0.03, 0.9));
      }, 200);
      
      // Reset after reaching max
      const resetTimer = setTimeout(() => {
        setDodQuality(0.2);
        setContextConfidence(0.1);
        setRecognizedPatterns([]);
      }, 8000);
      
      return () => {
        clearInterval(interval);
        clearTimeout(resetTimer);
      };
    }, [recognizedPatterns.length]);
    
    const overallConfidence = (needDefinitionQuality * 0.6 + contextConfidence * 0.4);
    
    return (
      <div className="space-y-6">
        <div className="text-center text-sm text-gray-400 space-y-1">
          <div>Definition of Need Quality: <span className="text-brand-emerald">{Math.round(needDefinitionQuality * 100)}%</span></div>
          <div>Context: <span className="text-brand-emerald">{Math.round(contextConfidence * 100)}%</span></div>
          <div>Overall: <span className="text-brand-emerald">{Math.round(overallConfidence * 100)}%</span></div>
          {recognizedPatterns.length > 0 && (
            <div>Patterns: <span className="text-ai-pattern-recognition">{recognizedPatterns.length} recognized</span></div>
          )}
        </div>
        
        <DeliverButton
          {...args}
          onDeliver={() => console.log('Deliver clicked - Building confidence')}
          needDefinitionQuality={needDefinitionQuality}
          contextConfidence={contextConfidence}
          recognizedPatterns={recognizedPatterns}
          estimatedCredits={Math.round(50 - (overallConfidence * 15))}
          estimatedDuration={Math.round(6 - (overallConfidence * 3))}
          repositoryContext={{
            language: 'TypeScript',
            testCoverage: 88,
            architecture: 'React/Next.js',
          }}
          showPreview={true}
          intensityLevel="enhanced"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Animated demo showing confidence building from low to high with pattern recognition milestones',
      },
    },
  },
};

// Repository-Aware Intelligence
export const RepositoryAware: Story = {
  args: {
    onDeliver: () => console.log('Deliver clicked - Repository aware'),
    needDefinitionQuality: 0.8,
    contextConfidence: 0.85,
    estimatedCredits: 42,
    estimatedDuration: 3,
    recognizedPatterns: [
      {
        type: 'refactor',
        confidence: 0.89,
        previousSuccess: true,
      }
    ],
    repositoryContext: {
      language: 'Rust',
      testCoverage: 96,
      architecture: 'functional',
    },
    showPreview: true,
    intensityLevel: 'enhanced',
  },
  parameters: {
    docs: {
      description: {
        story: 'Repository-aware intelligence adapting to Rust functional architecture with high test coverage',
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
        <DeliverButton
          onDeliver={() => console.log('Subtle')}
          needDefinitionQuality={0.8}
          contextConfidence={0.7}
          estimatedCredits={45}
          recognizedPatterns={[{
            type: 'component',
            confidence: 0.8,
            previousSuccess: true
          }]}
          showPreview={false}
          intensityLevel="subtle"
        />
        <p className="text-xs text-gray-500">Minimal effects, maximum performance</p>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-300">Moderate</h3>
        <DeliverButton
          onDeliver={() => console.log('Moderate')}
          needDefinitionQuality={0.8}
          contextConfidence={0.7}
          estimatedCredits={45}
          recognizedPatterns={[{
            type: 'component',
            confidence: 0.8,
            previousSuccess: true
          }]}
          showPreview={true}
          intensityLevel="moderate"
        />
        <p className="text-xs text-gray-500">Balanced experience with preview</p>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-300">Enhanced</h3>
        <DeliverButton
          onDeliver={() => console.log('Enhanced')}
          needDefinitionQuality={0.9}
          contextConfidence={0.85}
          estimatedCredits={40}
          recognizedPatterns={[
            {
              type: 'component',
              confidence: 0.9,
              previousSuccess: true
            },
            {
              type: 'test',
              confidence: 0.85,
              previousSuccess: true
            }
          ]}
          showPreview={true}
          intensityLevel="enhanced"
        />
        <p className="text-xs text-gray-500">Full intelligence with celebration effects</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of different intensity levels for performance optimization and user preference',
      },
    },
  },
};

// Interactive Hover Demo
export const InteractiveHover: Story = {
  render: () => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
      <div className="space-y-6">
        <div className="text-center text-sm text-gray-400">
          {isHovered ? (
            <span className="text-brand-emerald">✨ Hover detected - Preview should appear after 800ms</span>
          ) : (
            <span>Hover over the button to see predictive preview</span>
          )}
        </div>
        
        <div 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <DeliverButton
            onDeliver={() => console.log('Interactive hover demo')}
            needDefinitionQuality={0.85}
            contextConfidence={0.8}
            estimatedCredits={48}
            estimatedDuration={4}
            recognizedPatterns={[
              {
                type: 'component',
                confidence: 0.87,
                previousSuccess: true,
              },
              {
                type: 'test',
                confidence: 0.82,
                previousSuccess: true,
              },
              {
                type: 'documentation',
                confidence: 0.75,
                previousSuccess: false,
              }
            ]}
            repositoryContext={{
              language: 'TypeScript',
              testCoverage: 92,
              architecture: 'React/Next.js',
            }}
            showPreview={true}
            intensityLevel="enhanced"
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo showing predictive preview trigger behavior on hover',
      },
    },
  },
};
// Canonical story: renamed from EnhancedDeliverButton
