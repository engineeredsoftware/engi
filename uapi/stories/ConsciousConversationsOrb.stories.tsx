import type { Meta, StoryObj } from '@storybook/react';
import { useState, useEffect } from 'react';
import { ConsciousConversationsOrb } from '../app/components/conscious-conversations-orb';

const meta: Meta<typeof ConsciousConversationOrb> = {
  title: 'Bitcode/Surprise & Delight/Conscious Conversations Orb',
  component: ConsciousConversationsOrb,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
### 🧠 Conscious Conversations Orb

An advanced, repository-aware quantum orb that develops consciousness and emotional intelligence:

- **Consciousness evolution** - Awakens from dormant → aware → engaged → enlightened states
- **Repository whispers** - Speaks insights about your codebase during awakening sequence
- **Emotional intelligence** - Adapts mood based on interaction patterns and task context
- **Pattern confidence** - Visual rings show AI's familiarity with repository and user patterns
- **Awakening sequence** - Beautiful transition from dormant state with contextual messages
- **Processing awareness** - Enters focused consciousness during active thinking
- **Repository familiarity** - Builds understanding of codebase architecture and patterns
- **User pattern learning** - Tracks interaction preferences and adapts personality
- **Consciousness indicators** - Visual feedback for current awareness and emotional state

The orb becomes more intelligent and emotionally responsive as it learns your patterns and repository context.
        `,
      },
    },
  },
  argTypes: {
    showAwakeningSequence: {
      control: 'boolean',
      description: 'Show consciousness awakening sequence',
    },
    showRepositoryWhispers: {
      control: 'boolean',
      description: 'Show repository analysis whispers',
    },
    showConsciousnessIndicators: {
      control: 'boolean',
      description: 'Show consciousness level indicators',
    },
    intensityLevel: {
      control: { type: 'select' },
      options: ['subtle', 'moderate', 'enhanced'],
      description: 'Visual consciousness intensity',
    },
    currentMode: {
      control: { type: 'select' },
      options: ['chat', 'deliverable', 'upgrade'],
      description: 'Current interaction mode',
    },
    isProcessing: {
      control: 'boolean',
      description: 'Show processing consciousness state',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Dormant State
export const DormantState: Story = {
  args: {
    size: 120,
    repositoryContext: undefined,
    conversationHistory: undefined,
    isProcessing: false,
    currentMode: 'chat',
    showAwakeningSequence: false,
    showRepositoryWhispers: false,
    showConsciousnessIndicators: true,
    intensityLevel: 'enhanced',
  },
  parameters: {
    docs: {
      description: {
        story: 'Dormant consciousness state - waiting for repository context to awaken',
      },
    },
  },
};

// Awakening Sequence
export const AwakeningSequence: Story = {
  args: {
    size: 120,
    repositoryContext: {
      language: 'TypeScript',
      architecture: 'React/Next.js',
      testCoverage: 94,
      componentCount: 247,
      codeStyle: 'functional-components',
      frameworks: ['React', 'Next.js', 'Tailwind'],
      designPatterns: ['hooks', 'context', 'composition'],
      recentActivity: {
        commits: 15,
        pullRequests: 3,
        issues: 2
      }
    },
    conversationHistory: {
      messageCount: 1,
      topics: ['component-creation'],
      recentPatterns: ['typescript', 'react'],
      userStyle: 'technical',
      satisfactionScore: 0.8
    },
    isProcessing: false,
    currentMode: 'chat',
    showAwakeningSequence: true,
    showRepositoryWhispers: true,
    showConsciousnessIndicators: true,
    intensityLevel: 'enhanced',
  },
  parameters: {
    docs: {
      description: {
        story: 'Consciousness awakening sequence with repository analysis whispers',
      },
    },
  },
};

// Engaged Consciousness
export const EngagedConsciousness: Story = {
  args: {
    size: 120,
    repositoryContext: {
      language: 'TypeScript',
      architecture: 'microservices',
      testCoverage: 96,
      componentCount: 450,
      codeStyle: 'functional-components',
      frameworks: ['React', 'Node.js', 'PostgreSQL'],
      designPatterns: ['hexagonal', 'dependency-injection', 'event-sourcing'],
      recentActivity: {
        commits: 42,
        pullRequests: 8,
        issues: 1
      }
    },
    conversationHistory: {
      messageCount: 15,
      topics: ['service-architecture', 'testing', 'refactoring'],
      recentPatterns: ['microservices', 'hexagonal-architecture', 'unit-testing'],
      userStyle: 'detailed',
      satisfactionScore: 0.92
    },
    isProcessing: false,
    currentMode: 'deliverable',
    showAwakeningSequence: false,
    showRepositoryWhispers: false,
    showConsciousnessIndicators: true,
    intensityLevel: 'enhanced',
  },
  parameters: {
    docs: {
      description: {
        story: 'Engaged consciousness with high repository familiarity and user pattern confidence',
      },
    },
  },
};

// Enlightened State
export const EnlightenedState: Story = {
  args: {
    size: 120,
    repositoryContext: {
      language: 'Rust',
      architecture: 'hexagonal',
      testCoverage: 98,
      componentCount: 780,
      codeStyle: 'functional',
      frameworks: ['Actix', 'Tokio', 'SQLx'],
      designPatterns: ['hexagonal', 'cqrs', 'event-sourcing', 'microkernel'],
      recentActivity: {
        commits: 156,
        pullRequests: 23,
        issues: 0
      }
    },
    conversationHistory: {
      messageCount: 50,
      topics: ['performance-optimization', 'distributed-systems', 'architecture'],
      recentPatterns: ['rust', 'performance', 'concurrency', 'memory-safety'],
      userStyle: 'technical',
      satisfactionScore: 0.98
    },
    userInteractionPattern: {
      preferredResponseLength: 'long',
      topicsOfInterest: ['performance', 'architecture', 'rust', 'systems-programming'],
      timeOfDay: 'afternoon',
      workflowPattern: 'exploration'
    },
    isProcessing: false,
    currentMode: 'chat',
    showAwakeningSequence: false,
    showRepositoryWhispers: false,
    showConsciousnessIndicators: true,
    intensityLevel: 'enhanced',
  },
  parameters: {
    docs: {
      description: {
        story: 'Enlightened consciousness with mastery of complex systems and deep user understanding',
      },
    },
  },
};

// Processing State
export const ProcessingState: Story = {
  args: {
    size: 120,
    repositoryContext: {
      language: 'TypeScript',
      architecture: 'React/Next.js',
      testCoverage: 91,
      componentCount: 156,
      codeStyle: 'functional-components',
      frameworks: ['React', 'Next.js', 'Prisma'],
      designPatterns: ['hooks', 'context', 'server-components'],
      recentActivity: {
        commits: 28,
        pullRequests: 5,
        issues: 3
      }
    },
    conversationHistory: {
      messageCount: 8,
      topics: ['database-integration', 'authentication'],
      recentPatterns: ['prisma', 'nextauth', 'typescript'],
      userStyle: 'concise',
      satisfactionScore: 0.85
    },
    isProcessing: true,
    currentMode: 'deliverable',
    showAwakeningSequence: false,
    showRepositoryWhispers: false,
    showConsciousnessIndicators: true,
    intensityLevel: 'enhanced',
  },
  parameters: {
    docs: {
      description: {
        story: 'Processing consciousness state with focused thinking indicators',
      },
    },
  },
};

// Interactive Consciousness Evolution
export const ConsciousnessEvolution: Story = {
  render: () => {
    const [repositoryContext, setRepositoryContext] = useState<any>(null);
    const [conversationHistory, setConversationHistory] = useState<any>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    
    const evolutionSteps = [
      {
        name: 'Dormant',
        repository: null,
        conversation: null,
        description: 'No repository context - orb remains dormant'
      },
      {
        name: 'Initial Awakening',
        repository: {
          language: 'TypeScript',
          architecture: 'React/Next.js',
          testCoverage: 75,
          componentCount: 12
        },
        conversation: {
          messageCount: 1,
          topics: ['getting-started'],
          recentPatterns: [],
          userStyle: 'concise' as const,
          satisfactionScore: 0.5
        },
        description: 'First repository context triggers awakening'
      },
      {
        name: 'Growing Awareness',
        repository: {
          language: 'TypeScript',
          architecture: 'React/Next.js',
          testCoverage: 85,
          componentCount: 45,
          frameworks: ['React', 'Next.js']
        },
        conversation: {
          messageCount: 8,
          topics: ['components', 'styling'],
          recentPatterns: ['react-hooks', 'typescript'],
          userStyle: 'technical' as const,
          satisfactionScore: 0.75
        },
        description: 'Building familiarity with codebase and patterns'
      },
      {
        name: 'Deep Engagement',
        repository: {
          language: 'TypeScript',
          architecture: 'React/Next.js',
          testCoverage: 92,
          componentCount: 123,
          frameworks: ['React', 'Next.js', 'Prisma'],
          designPatterns: ['hooks', 'context', 'composition']
        },
        conversation: {
          messageCount: 25,
          topics: ['architecture', 'database', 'testing'],
          recentPatterns: ['react-hooks', 'typescript', 'database-design'],
          userStyle: 'detailed' as const,
          satisfactionScore: 0.88
        },
        description: 'Engaged consciousness with architectural understanding'
      },
      {
        name: 'Enlightenment',
        repository: {
          language: 'TypeScript',
          architecture: 'microservices',
          testCoverage: 96,
          componentCount: 234,
          frameworks: ['React', 'Node.js', 'GraphQL', 'Prisma'],
          designPatterns: ['hexagonal', 'cqrs', 'microservices', 'event-sourcing']
        },
        conversation: {
          messageCount: 50,
          topics: ['distributed-systems', 'performance', 'architecture'],
          recentPatterns: ['microservices', 'event-sourcing', 'performance'],
          userStyle: 'technical' as const,
          satisfactionScore: 0.95
        },
        description: 'Enlightened state with deep systems understanding'
      }
    ];
    
    useEffect(() => {
      const step = evolutionSteps[currentStep];
      setRepositoryContext(step.repository);
      setConversationHistory(step.conversation);
    }, [currentStep]);
    
    const nextStep = () => {
      setCurrentStep((prev) => (prev + 1) % evolutionSteps.length);
    };
    
    const toggleProcessing = () => {
      setIsProcessing(!isProcessing);
    };
    
    return (
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center space-y-4">
          <h3 className="text-lg font-medium text-gray-300">
            Consciousness Evolution Journey
          </h3>
          <p className="text-sm text-gray-400 max-w-2xl mx-auto">
            Watch the orb evolve from dormant to enlightened consciousness as repository context and conversation depth increase
          </p>
          
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={nextStep}
              className="px-4 py-2 bg-brand-emerald/20 text-brand-emerald rounded-lg 
                       hover:bg-brand-emerald/30 transition-all duration-200"
            >
              Next Evolution Stage
            </button>
            
            <button
              onClick={toggleProcessing}
              className="px-4 py-2 bg-ai-thinking/20 text-ai-thinking rounded-lg 
                       hover:bg-ai-thinking/30 transition-all duration-200"
            >
              {isProcessing ? 'Stop Processing' : 'Start Processing'}
            </button>
          </div>
          
          <div className="text-center space-y-2">
            <div className="text-sm font-medium text-brand-emerald">
              Stage {currentStep + 1}: {evolutionSteps[currentStep].name}
            </div>
            <div className="text-xs text-gray-400">
              {evolutionSteps[currentStep].description}
            </div>
          </div>
        </div>
        
        <div className="flex justify-center">
          <ConsciousConversationsOrb
            size={140}
            repositoryContext={repositoryContext}
            conversationHistory={conversationHistory}
            isProcessing={isProcessing}
            currentMode="chat"
            showAwakeningSequence={true}
            showRepositoryWhispers={true}
            showConsciousnessIndicators={true}
            intensityLevel="enhanced"
            onConsciousnessChange={(state) => {
              console.log('Consciousness changed:', state);
            }}
            onRepositoryWhisper={(message) => {
              console.log('Repository whisper:', message);
            }}
            onEmotionalStateChange={(emotion) => {
              console.log('Emotional state changed:', emotion);
            }}
          />
        </div>
        
        {/* Consciousness metrics */}
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="bg-brand-cosmic-dark/30 rounded-lg p-4 text-center">
            <div className="text-gray-400 mb-2">Repository Familiarity</div>
            <div className="text-brand-emerald font-medium">
              {repositoryContext ? Math.round((
                (repositoryContext.testCoverage || 0) / 100 + 
                Math.min((repositoryContext.componentCount || 0) / 200, 1) +
                (repositoryContext.frameworks?.length || 0) / 10
              ) * 100 / 3) : 0}%
            </div>
          </div>
          
          <div className="bg-brand-cosmic-dark/30 rounded-lg p-4 text-center">
            <div className="text-gray-400 mb-2">User Pattern Confidence</div>
            <div className="text-ai-consciousness-awakening font-medium">
              {conversationHistory ? Math.round(conversationHistory.satisfactionScore * 100) : 0}%
            </div>
          </div>
          
          <div className="bg-brand-cosmic-dark/30 rounded-lg p-4 text-center">
            <div className="text-gray-400 mb-2">Processing State</div>
            <div className={`font-medium ${isProcessing ? 'text-ai-thinking' : 'text-gray-500'}`}>
              {isProcessing ? 'Thinking' : 'Idle'}
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo showing consciousness evolution from dormant to enlightened states',
      },
    },
  },
};

// Multi-Orb Consciousness Network
export const ConsciousnessNetwork: Story = {
  render: () => {
    const [selectedOrb, setSelectedOrb] = useState(0);
    
    const orbConfigurations = [
      {
        name: 'Beginner',
        repository: {
          language: 'JavaScript',
          architecture: 'React',
          testCoverage: 60,
          componentCount: 8
        },
        conversation: {
          messageCount: 3,
          topics: ['basics'],
          recentPatterns: ['react'],
          userStyle: 'concise' as const,
          satisfactionScore: 0.6
        },
        mode: 'chat' as const
      },
      {
        name: 'Intermediate',
        repository: {
          language: 'TypeScript',
          architecture: 'React/Next.js',
          testCoverage: 85,
          componentCount: 67,
          frameworks: ['React', 'Next.js']
        },
        conversation: {
          messageCount: 18,
          topics: ['components', 'typescript'],
          recentPatterns: ['typescript', 'hooks'],
          userStyle: 'technical' as const,
          satisfactionScore: 0.82
        },
        mode: 'deliverable' as const
      },
      {
        name: 'Expert',
        repository: {
          language: 'Rust',
          architecture: 'microservices',
          testCoverage: 95,
          componentCount: 156,
          frameworks: ['Actix', 'Tokio'],
          designPatterns: ['hexagonal', 'cqrs']
        },
        conversation: {
          messageCount: 45,
          topics: ['performance', 'distributed-systems'],
          recentPatterns: ['rust', 'performance', 'concurrency'],
          userStyle: 'detailed' as const,
          satisfactionScore: 0.94
        },
        mode: 'upgrade' as const
      }
    ];
    
    return (
      <div className="w-full space-y-8">
        <div className="text-center space-y-4">
          <h3 className="text-lg font-medium text-gray-300">
            Consciousness Network
          </h3>
          <p className="text-sm text-gray-400 max-w-2xl mx-auto">
            Multiple orbs at different consciousness levels based on user expertise and repository complexity
          </p>
        </div>
        
        <div className="grid grid-cols-3 gap-8">
          {orbConfigurations.map((config, index) => (
            <div
              key={index}
              className={`text-center space-y-4 p-6 rounded-lg transition-all duration-300 cursor-pointer
                ${selectedOrb === index 
                  ? 'bg-brand-cosmic-light/10 border border-brand-emerald/30' 
                  : 'bg-brand-cosmic-dark/30 border border-gray-700/30 hover:border-gray-600/50'
                }`}
              onClick={() => setSelectedOrb(index)}
            >
              <div className="space-y-2">
                <h4 className="font-medium text-gray-300">{config.name}</h4>
                <div className="text-xs text-gray-500">
                  {config.repository.language} • {config.repository.componentCount} components
                </div>
              </div>
              
              <ConsciousConversationsOrb
                size={100}
                repositoryContext={config.repository}
                conversationHistory={config.conversation}
                isProcessing={false}
                currentMode={config.mode}
                showAwakeningSequence={false}
                showRepositoryWhispers={false}
                showConsciousnessIndicators={true}
                intensityLevel="moderate"
              />
              
              <div className="space-y-1 text-xs">
                <div className="text-gray-400">
                  Familiarity: <span className="text-brand-emerald">
                    {Math.round(config.repository.testCoverage)}%
                  </span>
                </div>
                <div className="text-gray-400">
                  Confidence: <span className="text-ai-consciousness-awakening">
                    {Math.round(config.conversation.satisfactionScore * 100)}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {selectedOrb !== null && (
          <div className="bg-brand-cosmic-dark/50 rounded-lg p-6">
            <h4 className="text-sm font-medium text-gray-300 mb-4">
              {orbConfigurations[selectedOrb].name} Configuration Details
            </h4>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <div className="text-gray-400 mb-2">Repository Context</div>
                <div className="space-y-1">
                  <div>Language: <span className="text-brand-emerald">{orbConfigurations[selectedOrb].repository.language}</span></div>
                  <div>Architecture: <span className="text-brand-emerald">{orbConfigurations[selectedOrb].repository.architecture}</span></div>
                  <div>Test Coverage: <span className="text-brand-emerald">{orbConfigurations[selectedOrb].repository.testCoverage}%</span></div>
                </div>
              </div>
              <div>
                <div className="text-gray-400 mb-2">Conversation Context</div>
                <div className="space-y-1">
                  <div>Messages: <span className="text-ai-consciousness-awakening">{orbConfigurations[selectedOrb].conversation.messageCount}</span></div>
                  <div>Style: <span className="text-ai-consciousness-awakening">{orbConfigurations[selectedOrb].conversation.userStyle}</span></div>
                  <div>Satisfaction: <span className="text-ai-consciousness-awakening">{Math.round(orbConfigurations[selectedOrb].conversation.satisfactionScore * 100)}%</span></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Network of conscious orbs at different levels based on user expertise and repository complexity',
      },
    },
  },
};

// Performance Optimization
export const PerformanceOptimization: Story = {
  render: () => {
    const [intensityLevel, setIntensityLevel] = useState<'subtle' | 'moderate' | 'enhanced'>('enhanced');
    
    const repositoryContext = {
      language: 'TypeScript',
      architecture: 'React/Next.js',
      testCoverage: 88,
      componentCount: 89,
      frameworks: ['React', 'Next.js', 'Prisma'],
      designPatterns: ['hooks', 'context', 'composition']
    };
    
    const conversationHistory = {
      messageCount: 12,
      topics: ['components', 'database'],
      recentPatterns: ['react-hooks', 'prisma'],
      userStyle: 'technical' as const,
      satisfactionScore: 0.86
    };
    
    return (
      <div className="w-full space-y-8">
        <div className="text-center space-y-4">
          <h3 className="text-lg font-medium text-gray-300">
            Performance Optimization
          </h3>
          <p className="text-sm text-gray-400 max-w-2xl mx-auto">
            Consciousness adapts to device capabilities and user preferences
          </p>
          
          <div className="flex justify-center space-x-4">
            {(['subtle', 'moderate', 'enhanced'] as const).map((level) => (
              <button
                key={level}
                onClick={() => setIntensityLevel(level)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 text-sm
                  ${intensityLevel === level 
                    ? 'bg-brand-emerald/30 text-brand-emerald' 
                    : 'bg-gray-700/50 text-gray-400 hover:bg-gray-700/70'
                  }`}
              >
                <div className="font-medium capitalize">{level}</div>
                <div className="text-xs opacity-75">
                  {level === 'subtle' && 'Low-end devices'}
                  {level === 'moderate' && 'Balanced performance'}
                  {level === 'enhanced' && 'High-end devices'}
                </div>
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex justify-center">
          <ConsciousConversationsOrb
            size={140}
            repositoryContext={repositoryContext}
            conversationHistory={conversationHistory}
            isProcessing={false}
            currentMode="chat"
            showAwakeningSequence={false}
            showRepositoryWhispers={false}
            showConsciousnessIndicators={true}
            intensityLevel={intensityLevel}
          />
        </div>
        
        <div className="bg-brand-cosmic-dark/50 rounded-lg p-6">
          <h4 className="text-sm font-medium text-gray-300 mb-4">
            Performance Configuration: {intensityLevel.charAt(0).toUpperCase() + intensityLevel.slice(1)}
          </h4>
          <div className="grid grid-cols-3 gap-4 text-xs">
            <div>
              <div className="text-gray-400 mb-2">Visual Effects</div>
              <div className="space-y-1">
                <div>Consciousness Rings: <span className="text-brand-emerald">{intensityLevel !== 'subtle' ? 'Enabled' : 'Disabled'}</span></div>
                <div>Repository Whispers: <span className="text-brand-emerald">{intensityLevel === 'enhanced' ? 'Full' : 'Simplified'}</span></div>
                <div>Awakening Sequence: <span className="text-brand-emerald">{intensityLevel === 'enhanced' ? 'Complete' : 'Reduced'}</span></div>
              </div>
            </div>
            <div>
              <div className="text-gray-400 mb-2">Performance</div>
              <div className="space-y-1">
                <div>Frame Rate: <span className="text-brand-emerald">{intensityLevel === 'enhanced' ? '60fps' : '30fps'}</span></div>
                <div>Particles: <span className="text-brand-emerald">{intensityLevel === 'enhanced' ? 'Full' : 'Reduced'}</span></div>
                <div>Animations: <span className="text-brand-emerald">{intensityLevel === 'subtle' ? 'Essential' : 'Full'}</span></div>
              </div>
            </div>
            <div>
              <div className="text-gray-400 mb-2">Features</div>
              <div className="space-y-1">
                <div>Emotional States: <span className="text-brand-emerald">{intensityLevel !== 'subtle' ? 'Active' : 'Simplified'}</span></div>
                <div>Context Awareness: <span className="text-brand-emerald">Always Active</span></div>
                <div>Learning: <span className="text-brand-emerald">Always Active</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Performance optimization demo showing adaptive consciousness based on device capabilities',
      },
    },
  },
};
