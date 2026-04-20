import type { Meta, StoryObj } from '@storybook/react';
import { useState, useEffect } from 'react';
import { PipelinePhasePoetry } from '../app/components/pipeline-phase-poetry';

const meta: Meta<typeof PipelinePhasePoetry> = {
  title: 'Bitcode/Surprise & Delight/Pipeline Phase Poetry',
  component: PipelinePhasePoetry,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
### 📝 Pipeline Phase Poetry System

Transforms the technical pipeline into an emotional creative journey with contextual storytelling:

- **Phase-aware poetry** - Generates contextual verses based on current pipeline phase
- **Emotional intelligence** - Adapts narrative tone to deliverable complexity and user energy
- **Creative journey visualization** - Shows progression through planning → creating → refining → testing → delivering → celebrating
- **Contextual storytelling** - Poetry adapts to deliverable type, complexity, and user patterns
- **Emotional state tracking** - Visualizes current emotional state with colors and intensity
- **Progressive narrative reveal** - Individual poetry lines appear with thoughtful timing
- **Epic poetry mode** - Full narrative panels for complex deliverables
- **Phase progression** - Visual journey tracking with emotional states

The poetry system celebrates the creative process itself, not just the outcomes, making every phase of development feel meaningful.
        `,
      },
    },
  },
  argTypes: {
    currentPhase: {
      control: { type: 'select' },
      options: ['planning', 'creating', 'refining', 'testing', 'delivering', 'celebrating'],
      description: 'Current phase of the pipeline',
    },
    poetryStyle: {
      control: { type: 'select' },
      options: ['minimal', 'flowing', 'epic'],
      description: 'Poetry presentation style',
    },
    showEmotionalJourney: {
      control: 'boolean',
      description: 'Show emotional state visualization',
    },
    showPhaseProgression: {
      control: 'boolean',
      description: 'Show phase progression indicators',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Planning Phase - Anticipation
export const PlanningPhase: Story = {
  args: {
    currentPhase: 'planning',
    deliverableContext: {
      name: 'User Authentication Component',
      category: 'component',
      complexity: 'moderate',
      patterns: ['react-hooks', 'typescript', 'form-validation'],
      userIntent: 'Create a secure login interface with social auth options',
      creativeEnergy: 0.8,
      technicalDepth: 0.6
    },
    timeInPhase: 120,
    completedPhases: [],
    isVisible: true,
    poetryStyle: 'flowing',
    showEmotionalJourney: true,
    showPhaseProgression: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Planning phase poetry with high creative energy and anticipation',
      },
    },
  },
};

// Creating Phase - Flow State
export const CreatingPhase: Story = {
  args: {
    currentPhase: 'creating',
    deliverableContext: {
      name: 'Payment Processing Service',
      category: 'service',
      complexity: 'complex',
      patterns: ['microservices', 'event-sourcing', 'payment-gateway'],
      userIntent: 'Build secure payment processing with multiple providers',
      creativeEnergy: 0.9,
      technicalDepth: 0.95
    },
    timeInPhase: 840, // 14 minutes - flow state
    completedPhases: ['planning'],
    isVisible: true,
    poetryStyle: 'flowing',
    showEmotionalJourney: true,
    showPhaseProgression: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Creating phase with flow state poetry for complex service development',
      },
    },
  },
};

// Refining Phase - Craftsmanship
export const RefiningPhase: Story = {
  args: {
    currentPhase: 'refining',
    deliverableContext: {
      name: 'Design System Components',
      category: 'component',
      complexity: 'epic',
      patterns: ['design-system', 'accessibility', 'theming', 'documentation'],
      userIntent: 'Refactor components for consistency and accessibility',
      creativeEnergy: 0.7,
      technicalDepth: 0.9
    },
    timeInPhase: 600, // 10 minutes
    completedPhases: ['planning', 'creating'],
    isVisible: true,
    poetryStyle: 'flowing',
    showEmotionalJourney: true,
    showPhaseProgression: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Refining phase with craftsmanship poetry for epic design system work',
      },
    },
  },
};

// Testing Phase - Confidence Building
export const TestingPhase: Story = {
  args: {
    currentPhase: 'testing',
    deliverableContext: {
      name: 'API Integration Tests',
      category: 'test',
      complexity: 'complex',
      patterns: ['integration-testing', 'mock-services', 'edge-cases', 'performance'],
      userIntent: 'Ensure robust API integration with comprehensive test coverage',
      creativeEnergy: 0.6,
      technicalDepth: 0.85
    },
    timeInPhase: 480, // 8 minutes
    completedPhases: ['planning', 'creating', 'refining'],
    isVisible: true,
    poetryStyle: 'flowing',
    showEmotionalJourney: true,
    showPhaseProgression: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Testing phase with confidence-building poetry and precision focus',
      },
    },
  },
};

// Delivering Phase - Triumph
export const DeliveringPhase: Story = {
  args: {
    currentPhase: 'delivering',
    deliverableContext: {
      name: 'E-commerce Platform Feature',
      category: 'feature',
      complexity: 'epic',
      patterns: ['full-stack', 'database-design', 'user-experience', 'performance'],
      userIntent: 'Launch comprehensive shopping cart and checkout experience',
      creativeEnergy: 0.85,
      technicalDepth: 0.9
    },
    timeInPhase: 180, // 3 minutes
    completedPhases: ['planning', 'creating', 'refining', 'testing'],
    isVisible: true,
    poetryStyle: 'flowing',
    showEmotionalJourney: true,
    showPhaseProgression: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Delivering phase with triumph poetry for major feature impact',
      },
    },
  },
};

// Celebrating Phase - Fulfillment
export const CelebratingPhase: Story = {
  args: {
    currentPhase: 'celebrating',
    deliverableContext: {
      name: 'Architecture Refactor Complete',
      category: 'refactor',
      complexity: 'epic',
      patterns: ['architecture', 'performance', 'scalability', 'maintainability'],
      userIntent: 'Transform monolith to microservices architecture',
      creativeEnergy: 0.9,
      technicalDepth: 0.95
    },
    timeInPhase: 300, // 5 minutes
    completedPhases: ['planning', 'creating', 'refining', 'testing', 'delivering'],
    isVisible: true,
    poetryStyle: 'epic',
    showEmotionalJourney: true,
    showPhaseProgression: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Celebrating phase with transcendent poetry for epic architectural achievement',
      },
    },
  },
};

// Interactive Poetry Journey
export const PoetryJourney: Story = {
  render: () => {
    const [currentPhase, setCurrentPhase] = useState<'planning' | 'creating' | 'refining' | 'testing' | 'delivering' | 'celebrating'>('planning');
    const [timeInPhase, setTimeInPhase] = useState(0);
    const [completedPhases, setCompletedPhases] = useState<string[]>([]);
    const [isPlaying, setIsPlaying] = useState(false);
    
    const phases: Array<{ phase: typeof currentPhase; duration: number; name: string }> = [
      { phase: 'planning', duration: 120, name: 'Planning & Vision' },
      { phase: 'creating', duration: 600, name: 'Creative Flow' },
      { phase: 'refining', duration: 300, name: 'Refinement & Polish' },
      { phase: 'testing', duration: 240, name: 'Quality Assurance' },
      { phase: 'delivering', duration: 120, name: 'Deployment & Launch' },
      { phase: 'celebrating', duration: 180, name: 'Achievement & Reflection' }
    ];
    
    const deliverableContext = {
      name: 'Next-Gen User Dashboard',
      category: 'feature' as const,
      complexity: 'complex' as const,
      patterns: ['react-hooks', 'data-visualization', 'real-time-updates', 'responsive-design'],
      userIntent: 'Create an intuitive dashboard with real-time analytics and beautiful data visualization',
      creativeEnergy: 0.85,
      technicalDepth: 0.8
    };
    
    useEffect(() => {
      if (!isPlaying) return;
      
      const interval = setInterval(() => {
        setTimeInPhase(prev => prev + 1);
      }, 100); // Fast forward for demo
      
      return () => clearInterval(interval);
    }, [isPlaying]);
    
    useEffect(() => {
      const currentPhaseData = phases.find(p => p.phase === currentPhase);
      if (currentPhaseData && timeInPhase >= currentPhaseData.duration) {
        const currentIndex = phases.findIndex(p => p.phase === currentPhase);
        
        if (currentIndex < phases.length - 1) {
          // Move to next phase
          setCompletedPhases(prev => [...prev, currentPhase]);
          setCurrentPhase(phases[currentIndex + 1].phase);
          setTimeInPhase(0);
        } else {
          // Journey complete
          setIsPlaying(false);
        }
      }
    }, [timeInPhase, currentPhase]);
    
    const startJourney = () => {
      setCurrentPhase('planning');
      setTimeInPhase(0);
      setCompletedPhases([]);
      setIsPlaying(true);
    };
    
    const pauseJourney = () => {
      setIsPlaying(false);
    };
    
    const resetJourney = () => {
      setCurrentPhase('planning');
      setTimeInPhase(0);
      setCompletedPhases([]);
      setIsPlaying(false);
    };
    
    const currentPhaseData = phases.find(p => p.phase === currentPhase);
    const progress = currentPhaseData ? (timeInPhase / currentPhaseData.duration) * 100 : 0;
    
    return (
      <div className="relative w-full h-screen bg-brand-cosmic-dark">
        {/* Control Panel */}
        <div className="absolute top-4 left-4 z-50 bg-brand-cosmic-light/90 backdrop-blur-md border border-brand-emerald/30 rounded-lg p-4 max-w-sm">
          <h3 className="text-lg font-medium text-gray-300 mb-4">
            Creative Journey Control
          </h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Current Phase:</span>
                <span className="text-brand-emerald capitalize font-medium">
                  {currentPhase}
                </span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Progress:</span>
                <span className="text-brand-emerald">
                  {Math.round(progress)}%
                </span>
              </div>
              
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-brand-emerald h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-xs text-gray-400">Phase Timeline:</div>
              <div className="space-y-1">
                {phases.map((phase, index) => (
                  <div key={phase.phase} className="flex items-center text-xs">
                    <div className={`w-2 h-2 rounded-full mr-2 ${
                      completedPhases.includes(phase.phase) ? 'bg-green-400' :
                      phase.phase === currentPhase ? 'bg-brand-emerald' :
                      'bg-gray-600'
                    }`} />
                    <span className={`${
                      phase.phase === currentPhase ? 'text-brand-emerald' :
                      completedPhases.includes(phase.phase) ? 'text-green-400' :
                      'text-gray-400'
                    }`}>
                      {phase.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={startJourney}
                disabled={isPlaying}
                className="px-3 py-2 bg-brand-emerald/20 text-brand-emerald rounded text-sm
                         hover:bg-brand-emerald/30 transition-all duration-200
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Start Journey
              </button>
              
              <button
                onClick={isPlaying ? pauseJourney : () => setIsPlaying(true)}
                className="px-3 py-2 bg-ai-thinking/20 text-ai-thinking rounded text-sm
                         hover:bg-ai-thinking/30 transition-all duration-200"
              >
                {isPlaying ? 'Pause' : 'Resume'}
              </button>
              
              <button
                onClick={resetJourney}
                className="px-3 py-2 bg-gray-700/50 text-gray-400 rounded text-sm
                         hover:bg-gray-700/70 transition-all duration-200"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
        
        {/* Main Poetry Display */}
        <PipelinePhasePoetry
          currentPhase={currentPhase}
          deliverableContext={deliverableContext}
          timeInPhase={timeInPhase}
          completedPhases={completedPhases as any}
          isVisible={true}
          poetryStyle="flowing"
          showEmotionalJourney={true}
          showPhaseProgression={true}
          onPhaseTransition={(from, to) => {
            console.log(`Phase transition: ${from} → ${to}`);
          }}
          onEmotionalStateChange={(emotion, intensity) => {
            console.log(`Emotional state: ${emotion} (${Math.round(intensity * 100)}%)`);
          }}
          onNarrativeComplete={(phase, narrative) => {
            console.log(`Narrative complete for ${phase}:`, narrative);
          }}
        />
        
        {/* Background decoration */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center space-y-4 opacity-20">
            <div className="text-6xl">📝</div>
            <div className="text-xl text-gray-500">
              Poetry in Motion
            </div>
            <div className="text-sm text-gray-600 max-w-md">
              Watch the emotional journey unfold as your deliverable moves through each phase of creation
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo showing the complete poetry journey through all pipeline phases',
      },
    },
  },
};

// Poetry Style Comparison
export const StyleComparison: Story = {
  render: () => {
    const [selectedStyle, setSelectedStyle] = useState<'minimal' | 'flowing' | 'epic'>('flowing');
    
    const deliverableContext = {
      name: 'Real-time Chat System',
      category: 'feature' as const,
      complexity: 'complex' as const,
      patterns: ['websockets', 'real-time', 'scalability', 'user-experience'],
      userIntent: 'Build a scalable real-time messaging system with rich features',
      creativeEnergy: 0.9,
      technicalDepth: 0.85
    };
    
    return (
      <div className="relative w-full h-screen bg-brand-cosmic-dark">
        <div className="absolute top-4 left-4 z-50 bg-brand-cosmic-light/90 backdrop-blur-md border border-brand-emerald/30 rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-300 mb-4">
            Poetry Style Selection
          </h3>
          
          <div className="space-y-3">
            {(['minimal', 'flowing', 'epic'] as const).map((style) => (
              <button
                key={style}
                onClick={() => setSelectedStyle(style)}
                className={`w-full px-4 py-3 rounded-lg transition-all duration-200 text-left
                  ${selectedStyle === style 
                    ? 'bg-brand-emerald/30 text-brand-emerald border border-brand-emerald/50' 
                    : 'bg-gray-700/50 text-gray-400 hover:bg-gray-700/70 border border-transparent'
                  }`}
              >
                <div className="font-medium capitalize">{style}</div>
                <div className="text-xs opacity-75 mt-1">
                  {style === 'minimal' && 'Simple, focused poetry lines'}
                  {style === 'flowing' && 'Rich narrative with emotional depth'}
                  {style === 'epic' && 'Complete story with full context panels'}
                </div>
              </button>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-700/30 text-xs text-gray-400">
            <div className="space-y-1">
              <div>Phase: <span className="text-brand-emerald">Creating</span></div>
              <div>Emotion: <span className="text-ai-thinking">Flow State</span></div>
              <div>Energy: <span className="text-ai-celebration-gold">High</span></div>
            </div>
          </div>
        </div>
        
        <PipelinePhasePoetry
          currentPhase="creating"
          deliverableContext={deliverableContext}
          timeInPhase={720} // 12 minutes - deep flow
          completedPhases={['planning']}
          isVisible={true}
          poetryStyle={selectedStyle}
          showEmotionalJourney={true}
          showPhaseProgression={true}
        />
        
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center space-y-4 opacity-20">
            <div className="text-6xl">🎭</div>
            <div className="text-xl text-gray-500">
              Poetry Styles
            </div>
            <div className="text-sm text-gray-600 max-w-md">
              Experience different levels of narrative depth and emotional storytelling
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Compare different poetry styles from minimal to epic storytelling',
      },
    },
  },
};

// Emotional Journey Visualization
export const EmotionalJourney: Story = {
  render: () => {
    const [currentEmotion, setCurrentEmotion] = useState('anticipation');
    const [intensity, setIntensity] = useState(0.7);
    
    const emotions = [
      { name: 'anticipation', color: '#a78bfa', phase: 'planning' },
      { name: 'flow', color: '#34d399', phase: 'creating' },
      { name: 'focus', color: '#06b6d4', phase: 'creating' },
      { name: 'craftsmanship', color: '#8b5cf6', phase: 'refining' },
      { name: 'confidence', color: '#67feb7', phase: 'testing' },
      { name: 'triumph', color: '#f59e0b', phase: 'delivering' },
      { name: 'fulfillment', color: '#ec4899', phase: 'celebrating' }
    ];
    
    const deliverableContext = {
      name: 'AI-Powered Code Assistant',
      category: 'feature' as const,
      complexity: 'epic' as const,
      patterns: ['machine-learning', 'natural-language', 'code-analysis', 'user-interface'],
      userIntent: 'Build an intelligent coding assistant with natural language understanding',
      creativeEnergy: intensity,
      technicalDepth: 0.95
    };
    
    const currentEmotionData = emotions.find(e => e.name === currentEmotion) || emotions[0];
    
    return (
      <div className="relative w-full h-screen bg-brand-cosmic-dark">
        <div className="absolute top-4 left-4 z-50 bg-brand-cosmic-light/90 backdrop-blur-md border border-brand-emerald/30 rounded-lg p-4 max-w-sm">
          <h3 className="text-lg font-medium text-gray-300 mb-4">
            Emotional State Explorer
          </h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Current Emotion:</label>
              <select
                value={currentEmotion}
                onChange={(e) => setCurrentEmotion(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 text-gray-300 rounded border border-gray-600 focus:border-brand-emerald"
              >
                {emotions.map((emotion) => (
                  <option key={emotion.name} value={emotion.name}>
                    {emotion.name.charAt(0).toUpperCase() + emotion.name.slice(1)} ({emotion.phase})
                  </option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Intensity: {Math.round(intensity * 100)}%</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={intensity}
                onChange={(e) => setIntensity(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <div className="text-sm text-gray-400">Emotional Color:</div>
              <div 
                className="w-full h-8 rounded border"
                style={{ backgroundColor: currentEmotionData.color }}
              />
            </div>
            
            <div className="text-xs text-gray-400 space-y-1">
              <div>Phase: <span className="text-brand-emerald capitalize">{currentEmotionData.phase}</span></div>
              <div>Deliverable: <span className="text-brand-emerald">Epic Complexity</span></div>
              <div>Technical Depth: <span className="text-brand-emerald">95%</span></div>
            </div>
          </div>
        </div>
        
        <PipelinePhasePoetry
          currentPhase={currentEmotionData.phase as any}
          deliverableContext={deliverableContext}
          timeInPhase={300}
          completedPhases={[]}
          isVisible={true}
          poetryStyle="flowing"
          showEmotionalJourney={true}
          showPhaseProgression={true}
          onEmotionalStateChange={(emotion, newIntensity) => {
            console.log(`Emotional state: ${emotion} (${Math.round(newIntensity * 100)}%)`);
          }}
        />
        
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center space-y-4 opacity-20">
            <div className="text-6xl">💫</div>
            <div className="text-xl text-gray-500">
              Emotional Intelligence
            </div>
            <div className="text-sm text-gray-600 max-w-md">
              Explore how poetry adapts to different emotional states and creative intensities
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive emotional journey explorer showing how poetry adapts to different states',
      },
    },
  },
};
