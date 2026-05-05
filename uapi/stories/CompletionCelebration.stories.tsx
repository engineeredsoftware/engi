import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import MarketingCompletionCelebration from '../app/(root)/components/MarketingCompletionCelebration';

const meta: Meta<typeof MarketingCompletionCelebration> = {
  title: 'Bitcode/Surprise & Delight/Completion Celebration',
  component: MarketingCompletionCelebration,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
### 🎉 Completion Celebration System

An intelligent milestone celebration system that adapts to completion patterns and achievements:

- **Achievement recognition** - Unlocks contextual badges based on performance patterns
- **Repository awareness** - Celebrates milestones within repository context and progress
- **Pattern mastery tracking** - Recognizes and celebrates when AI identifies specific patterns
- **Quality celebration** - Visual feedback adapts to completion quality and efficiency
- **Streak recognition** - Celebrates consecutive successful completions
- **Performance optimization** - Celebrates efficiency and speed achievements
- **Contextual particles** - Visual effects adapt to completion category and complexity
- **Progressive insights** - Shows impact on repository metrics and personal growth

The celebration system learns from user patterns and repository context to provide increasingly meaningful recognition.
        `,
      },
    },
  },
  argTypes: {
    intensityLevel: {
      control: { type: 'select' },
      options: ['subtle', 'moderate', 'enhanced'],
      description: 'Visual celebration intensity',
    },
    showAchievements: {
      control: 'boolean',
      description: 'Show achievement badges',
    },
    showRepositoryInsights: {
      control: 'boolean',
      description: 'Show repository impact metrics',
    },
    showPatternInsights: {
      control: 'boolean',
      description: 'Show pattern recognition insights',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Component Creation Success
export const ComponentSuccess: Story = {
  args: {
    isVisible: true,
    milestone: {
      id: 'comp-001',
      name: 'User Authentication Component',
      category: 'component',
      complexity: 'moderate',
      timeSpent: 420, // 7 minutes
      measuredBtd: 85,
      patterns: ['react-hooks', 'typescript-interfaces', 'form-validation'],
      quality: 0.92,
      timestamp: new Date(),
      achievements: ['quality-champion', 'pattern-master']
    },
    repositoryContext: {
      language: 'TypeScript',
      architecture: 'React/Next.js',
      testCoverage: 89,
      componentCount: 47,
      totalShippables: 12,
      streakCount: 3,
      qualityAverage: 0.88
    },
    intensityLevel: 'enhanced',
    showAchievements: true,
    showRepositoryInsights: true,
    showPatternInsights: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Component creation celebration with quality achievement and pattern recognition',
      },
    },
  },
};

// Service Architecture Mastery
export const ServiceMastery: Story = {
  args: {
    isVisible: true,
    milestone: {
      id: 'svc-001',
      name: 'User Authentication Service with JWT',
      category: 'service',
      complexity: 'complex',
      timeSpent: 1200, // 20 minutes
      measuredBtd: 340,
      patterns: ['microservices', 'hexagonal-architecture', 'jwt-auth', 'rate-limiting'],
      quality: 0.95,
      timestamp: new Date(),
      achievements: ['architecture-sage', 'quality-champion', 'pattern-master']
    },
    repositoryContext: {
      language: 'TypeScript',
      architecture: 'microservices',
      testCoverage: 94,
      componentCount: 156,
      totalShippables: 28,
      streakCount: 7,
      qualityAverage: 0.91
    },
    intensityLevel: 'enhanced',
    showAchievements: true,
    showRepositoryInsights: true,
    showPatternInsights: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Complex service architecture achievement with multiple legendary badges',
      },
    },
  },
};

// First Completion Achievement
export const FirstCompletion: Story = {
  args: {
    isVisible: true,
    milestone: {
      id: 'first-001',
      name: 'Hello World Component',
      category: 'component',
      complexity: 'simple',
      timeSpent: 180, // 3 minutes
      measuredBtd: 25,
      patterns: ['react-functional-component'],
      quality: 0.85,
      timestamp: new Date(),
      achievements: ['first-completion']
    },
    repositoryContext: {
      language: 'TypeScript',
      architecture: 'React/Next.js',
      testCoverage: 75,
      componentCount: 1,
      totalShippables: 1,
      streakCount: 1,
      qualityAverage: 0.85
    },
    intensityLevel: 'enhanced',
    showAchievements: true,
    showRepositoryInsights: true,
    showPatternInsights: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'First completion milestone with welcome achievement',
      },
    },
  },
};

// Speed Demon Achievement
export const SpeedDemon: Story = {
  args: {
    isVisible: true,
    milestone: {
      id: 'speed-001',
      name: 'Quick Bug Fix',
      category: 'bug',
      complexity: 'simple',
      timeSpent: 120, // 2 minutes
      measuredBtd: 15,
      patterns: ['bug-fix', 'typescript'],
      quality: 0.88,
      timestamp: new Date(),
      achievements: ['speed-demon']
    },
    repositoryContext: {
      language: 'TypeScript',
      architecture: 'React/Next.js',
      testCoverage: 89,
      componentCount: 23,
      totalShippables: 8,
      streakCount: 2,
      qualityAverage: 0.87
    },
    intensityLevel: 'enhanced',
    showAchievements: true,
    showRepositoryInsights: true,
    showPatternInsights: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Speed achievement for rapid completion with quality',
      },
    },
  },
};

// Testing Legend Achievement
export const TestingLegend: Story = {
  args: {
    isVisible: true,
    milestone: {
      id: 'test-001',
      name: 'Comprehensive Test Suite for Payment Service',
      category: 'test',
      complexity: 'complex',
      timeSpent: 900, // 15 minutes
      measuredBtd: 150,
      patterns: ['unit-testing', 'integration-testing', 'mocking', 'edge-cases'],
      quality: 0.96,
      timestamp: new Date(),
      achievements: ['testing-legend', 'quality-champion', 'pattern-master']
    },
    repositoryContext: {
      language: 'TypeScript',
      architecture: 'microservices',
      testCoverage: 96,
      componentCount: 89,
      totalShippables: 34,
      streakCount: 5,
      qualityAverage: 0.92
    },
    intensityLevel: 'enhanced',
    showAchievements: true,
    showRepositoryInsights: true,
    showPatternInsights: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Testing excellence with legendary achievement and high quality',
      },
    },
  },
};

// Streak Warrior Achievement
export const StreakWarrior: Story = {
  args: {
    isVisible: true,
    milestone: {
      id: 'streak-001',
      name: 'Notification System Enhancement',
      category: 'feature',
      complexity: 'moderate',
      timeSpent: 600, // 10 minutes
      measuredBtd: 120,
      patterns: ['react-hooks', 'state-management', 'notification-system'],
      quality: 0.89,
      timestamp: new Date(),
      achievements: ['streak-warrior', 'innovation-pioneer']
    },
    repositoryContext: {
      language: 'TypeScript',
      architecture: 'React/Next.js',
      testCoverage: 91,
      componentCount: 67,
      totalShippables: 19,
      streakCount: 8,
      qualityAverage: 0.90
    },
    intensityLevel: 'enhanced',
    showAchievements: true,
    showRepositoryInsights: true,
    showPatternInsights: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Streak warrior achievement for consecutive successful completions',
      },
    },
  },
};

// Interactive Celebration Demo
export const InteractiveCelebration: Story = {
  render: () => {
    const [isVisible, setIsVisible] = useState(false);
    const [currentMilestone, setCurrentMilestone] = useState(0);
    
    const milestones = [
      {
        id: 'demo-001',
        name: 'Simple Button Component',
        category: 'component' as const,
        complexity: 'simple' as const,
        timeSpent: 240,
        measuredBtd: 35,
        patterns: ['react-component'],
        quality: 0.82,
        timestamp: new Date(),
        achievements: ['first-completion']
      },
      {
        id: 'demo-002',
        name: 'Authentication Service',
        category: 'service' as const,
        complexity: 'complex' as const,
        timeSpent: 1080,
        measuredBtd: 280,
        patterns: ['microservices', 'jwt', 'security'],
        quality: 0.94,
        timestamp: new Date(),
        achievements: ['architecture-sage', 'quality-champion']
      },
      {
        id: 'demo-003',
        name: 'Quick CSS Fix',
        category: 'bug' as const,
        complexity: 'simple' as const,
        timeSpent: 90,
        measuredBtd: 12,
        patterns: ['css-fix'],
        quality: 0.87,
        timestamp: new Date(),
        achievements: ['speed-demon']
      },
      {
        id: 'demo-004',
        name: 'Comprehensive Test Suite',
        category: 'test' as const,
        complexity: 'complex' as const,
        timeSpent: 840,
        measuredBtd: 160,
        patterns: ['unit-testing', 'integration-testing', 'mocking'],
        quality: 0.97,
        timestamp: new Date(),
        achievements: ['testing-legend', 'quality-champion', 'pattern-master']
      }
    ];
    
    const repositoryContexts = [
      {
        language: 'TypeScript',
        architecture: 'React/Next.js',
        testCoverage: 75,
        componentCount: 1,
        totalShippables: 1,
        streakCount: 1,
        qualityAverage: 0.82
      },
      {
        language: 'TypeScript',
        architecture: 'microservices',
        testCoverage: 89,
        componentCount: 15,
        totalShippables: 5,
        streakCount: 3,
        qualityAverage: 0.88
      },
      {
        language: 'TypeScript',
        architecture: 'React/Next.js',
        testCoverage: 91,
        componentCount: 23,
        totalShippables: 8,
        streakCount: 4,
        qualityAverage: 0.87
      },
      {
        language: 'TypeScript',
        architecture: 'microservices',
        testCoverage: 95,
        componentCount: 45,
        totalShippables: 15,
        streakCount: 6,
        qualityAverage: 0.91
      }
    ];
    
    const triggerCelebration = () => {
      setIsVisible(true);
    };
    
    const handleCelebrationComplete = () => {
      setIsVisible(false);
      setCurrentMilestone((prev) => (prev + 1) % milestones.length);
    };
    
    const handleDismiss = () => {
      setIsVisible(false);
    };
    
    return (
      <div className="relative w-full h-screen bg-brand-cosmic-dark flex flex-col items-center justify-center">
        <div className="text-center space-y-6 z-10">
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-gray-300">
              Interactive Celebration Demo
            </h3>
            <p className="text-sm text-gray-400 max-w-md">
              Click the button to trigger different milestone celebrations
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="text-xs text-gray-500">
              Current Milestone: <span className="text-brand-emerald">{milestones[currentMilestone].name}</span>
            </div>
            
            <button
              onClick={triggerCelebration}
              disabled={isVisible}
              className="px-6 py-3 bg-brand-emerald/20 text-brand-emerald rounded-lg 
                       hover:bg-brand-emerald/30 transition-all duration-200
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isVisible ? 'Celebrating...' : 'Trigger Celebration 🎉'}
            </button>
            
            <div className="text-xs text-gray-500">
              Achievement: <span className="text-ai-celebration-gold">
                {milestones[currentMilestone].achievements?.[0] || 'None'}
              </span>
            </div>
          </div>
        </div>
        
        <MarketingCompletionCelebration
          milestone={milestones[currentMilestone]}
          repositoryContext={repositoryContexts[currentMilestone]}
          isVisible={isVisible}
          onCelebrationComplete={handleCelebrationComplete}
          onDismiss={handleDismiss}
          intensityLevel="enhanced"
          showAchievements={true}
          showRepositoryInsights={true}
          showPatternInsights={true}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo cycling through different celebration types and achievements',
      },
    },
  },
};

// Performance Comparison
export const PerformanceComparison: Story = {
  render: () => {
    const [activeIntensity, setActiveIntensity] = useState<'subtle' | 'moderate' | 'enhanced'>('moderate');
    const [isVisible, setIsVisible] = useState(false);
    
    const milestone = {
      id: 'perf-001',
      name: 'User Profile Component',
      category: 'component' as const,
      complexity: 'moderate' as const,
      timeSpent: 360,
      measuredBtd: 75,
      patterns: ['react-hooks', 'responsive-design', 'typescript'],
      quality: 0.91,
      timestamp: new Date(),
      achievements: ['quality-champion', 'pattern-master']
    };
    
    const repositoryContext = {
      language: 'TypeScript',
      architecture: 'React/Next.js',
      testCoverage: 88,
      componentCount: 32,
      totalShippables: 11,
      streakCount: 4,
      qualityAverage: 0.89
    };
    
    return (
      <div className="relative w-full h-screen bg-brand-cosmic-dark flex flex-col items-center justify-center">
        <div className="text-center space-y-6 z-10">
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-gray-300">
              Performance Optimization Demo
            </h3>
            <p className="text-sm text-gray-400 max-w-md">
              Compare celebration intensity levels for different device capabilities
            </p>
          </div>
          
          <div className="flex space-x-4">
            {(['subtle', 'moderate', 'enhanced'] as const).map((intensity) => (
              <button
                key={intensity}
                onClick={() => {
                  setActiveIntensity(intensity);
                  setIsVisible(true);
                }}
                className={`px-4 py-2 rounded-lg transition-all duration-200 text-sm
                  ${activeIntensity === intensity 
                    ? 'bg-brand-emerald/30 text-brand-emerald' 
                    : 'bg-gray-700/50 text-gray-400 hover:bg-gray-700/70'
                  }`}
              >
                <div className="font-medium capitalize">{intensity}</div>
                <div className="text-xs opacity-75">
                  {intensity === 'subtle' && 'Minimal effects'}
                  {intensity === 'moderate' && 'Balanced performance'}
                  {intensity === 'enhanced' && 'Full celebrations'}
                </div>
              </button>
            ))}
          </div>
        </div>
        
        <MarketingCompletionCelebration
          milestone={milestone}
          repositoryContext={repositoryContext}
          isVisible={isVisible}
          onCelebrationComplete={() => setIsVisible(false)}
          onDismiss={() => setIsVisible(false)}
          intensityLevel={activeIntensity}
          showAchievements={true}
          showRepositoryInsights={true}
          showPatternInsights={true}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Performance comparison showing different intensity levels for various device capabilities',
      },
    },
  },
};

// Achievement Gallery
export const AchievementGallery: Story = {
  args: {
    isVisible: true,
    milestone: {
      id: 'gallery-001',
      name: 'Payment Processing Refactor',
      category: 'refactor',
      complexity: 'complex',
      timeSpent: 1440, // 24 minutes
      measuredBtd: 320,
      patterns: ['refactoring', 'performance-optimization', 'code-cleanup', 'testing'],
      quality: 0.98,
      timestamp: new Date(),
      achievements: [
        'refactor-wizard',
        'quality-champion', 
        'pattern-master',
        'efficiency-guru',
        'testing-legend'
      ]
    },
    repositoryContext: {
      language: 'TypeScript',
      architecture: 'hexagonal',
      testCoverage: 97,
      componentCount: 123,
      totalShippables: 45,
      streakCount: 12,
      qualityAverage: 0.94
    },
    intensityLevel: 'enhanced',
    showAchievements: true,
    showRepositoryInsights: true,
    showPatternInsights: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Achievement gallery showcasing multiple legendary achievements and perfect execution',
      },
    },
  },
};
