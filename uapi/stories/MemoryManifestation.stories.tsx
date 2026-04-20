import type { Meta, StoryObj } from '@storybook/react';
import { useState, useEffect } from 'react';
import { MemoryManifestation } from '../app/components/memory-manifestation';

const meta: Meta<typeof MemoryManifestation> = {
  title: 'Bitcode/Surprise & Delight/Memory Manifestation',
  component: MemoryManifestation,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
### 🧙‍♂️ Memory Manifestation System - Wizard-Like Pattern Evolution

A mystical system that manifests learned patterns as cosmic constellations, tracking evolution from initiate to wizard:

- **Pattern constellation mapping** - Groups learned patterns into mystical constellations based on type and evolution
- **Arcane rank progression** - Tracks user evolution from Initiate → Apprentice → Practitioner → Adept → Master → Archmage → Wizard
- **Wizard wisdom synthesis** - Generates contextual insights as patterns evolve and mastery develops  
- **Memory pattern visualization** - Shows workflow patterns, preferences, mastery achievements, and breakthroughs
- **Evolution metrics** - Tracks emerald wisdom, consciousness expansion, creative potential, and technical mastery
- **Arcane particle effects** - Floating mystical symbols create ambient wizard-like atmosphere
- **Pattern evolution notifications** - Celebrates when patterns transcend to higher levels of mastery
- **Cosmic significance** - Each constellation tells the story of the user's learning journey

The system embodies **wizard-like intelligence** - making learning visible, celebrating growth, and manifesting the user's evolving mastery as cosmic constellation patterns.
        `,
      },
    },
  },
  argTypes: {
    manifestationStyle: {
      control: { type: 'select' },
      options: ['ethereal', 'mystical', 'cosmic', 'wizard'],
      description: 'Visual manifestation style',
    },
    arcaneIntensity: {
      control: { type: 'select' },
      options: ['subtle', 'moderate', 'potent', 'legendary'],
      description: 'Intensity of arcane visual effects',
    },
    showEvolution: {
      control: 'boolean',
      description: 'Show evolution progress panel',
    },
    showConstellations: {
      control: 'boolean',
      description: 'Show memory constellation map',
    },
    showWisdomSynthesis: {
      control: 'boolean',
      description: 'Show wizard wisdom synthesis',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Initiate - Beginning Journey
export const InitiateJourney: Story = {
  args: {
    memoryPatterns: [
      {
        id: 'react-basics',
        type: 'workflow',
        pattern: 'React Component Creation',
        frequency: 3,
        confidence: 0.4,
        evolution: 'emerging',
        firstSeen: new Date(Date.now() - 86400000), // 1 day ago
        lastReinforced: new Date(Date.now() - 3600000), // 1 hour ago
        contexts: ['component-builder', 'tutorial'],
        impact: 'subtle',
        arcaneSymbol: '⚡',
        mysticalHue: '#8b5cf6'
      },
      {
        id: 'basic-styling',
        type: 'preference',
        pattern: 'CSS-in-JS Preference',
        frequency: 2,
        confidence: 0.3,
        evolution: 'emerging',
        firstSeen: new Date(Date.now() - 172800000), // 2 days ago
        lastReinforced: new Date(Date.now() - 7200000), // 2 hours ago
        contexts: ['styling', 'components'],
        impact: 'subtle',
        arcaneSymbol: '🔮',
        mysticalHue: '#06b6d4'
      }
    ],
    userEvolution: {
      totalPatterns: 2,
      masteredSkills: [],
      emeraldWisdomLevel: 0.15,
      consciousnessExpansion: 0.1,
      creativePotential: 0.2,
      technicalMastery: 0.1,
      arcaneRank: 'Initiate'
    },
    repositoryContext: {
      language: 'JavaScript',
      architecture: 'React',
      complexity: 0.2,
      patterns: ['component-creation']
    },
    isVisible: true,
    manifestationStyle: 'wizard',
    showEvolution: true,
    showConstellations: true,
    showWisdomSynthesis: true,
    arcaneIntensity: 'moderate',
  },
  parameters: {
    docs: {
      description: {
        story: 'Initiate level with emerging patterns and beginning wizard journey',
      },
    },
  },
};

// Apprentice - Developing Skills
export const ApprenticeEvolution: Story = {
  args: {
    memoryPatterns: [
      {
        id: 'react-hooks',
        type: 'workflow',
        pattern: 'React Hooks Mastery',
        frequency: 12,
        confidence: 0.65,
        evolution: 'developing',
        firstSeen: new Date(Date.now() - 604800000), // 1 week ago
        lastReinforced: new Date(Date.now() - 1800000), // 30 minutes ago
        contexts: ['component-builder', 'state-management'],
        impact: 'moderate',
        arcaneSymbol: '⚡',
        mysticalHue: '#8b5cf6'
      },
      {
        id: 'typescript-preference',
        type: 'preference',
        pattern: 'TypeScript Type Safety',
        frequency: 8,
        confidence: 0.7,
        evolution: 'developing',
        firstSeen: new Date(Date.now() - 432000000), // 5 days ago
        lastReinforced: new Date(Date.now() - 900000), // 15 minutes ago
        contexts: ['typing', 'safety'],
        impact: 'moderate',
        arcaneSymbol: '🔮',
        mysticalHue: '#06b6d4'
      },
      {
        id: 'component-testing',
        type: 'workflow',
        pattern: 'Component Testing Practices',
        frequency: 6,
        confidence: 0.55,
        evolution: 'developing',
        firstSeen: new Date(Date.now() - 259200000), // 3 days ago
        lastReinforced: new Date(Date.now() - 3600000), // 1 hour ago
        contexts: ['testing', 'quality'],
        impact: 'moderate',
        arcaneSymbol: '⚡',
        mysticalHue: '#8b5cf6'
      }
    ],
    userEvolution: {
      totalPatterns: 8,
      masteredSkills: ['basic-react'],
      emeraldWisdomLevel: 0.35,
      consciousnessExpansion: 0.3,
      creativePotential: 0.4,
      technicalMastery: 0.32,
      arcaneRank: 'Apprentice'
    },
    repositoryContext: {
      language: 'TypeScript',
      architecture: 'React/Next.js',
      complexity: 0.4,
      patterns: ['hooks', 'components', 'testing']
    },
    isVisible: true,
    manifestationStyle: 'wizard',
    showEvolution: true,
    showConstellations: true,
    showWisdomSynthesis: true,
    arcaneIntensity: 'potent',
  },
  parameters: {
    docs: {
      description: {
        story: 'Apprentice level with developing patterns and growing constellation map',
      },
    },
  },
};

// Adept - Advanced Mastery
export const AdeptMastery: Story = {
  args: {
    memoryPatterns: [
      {
        id: 'architecture-patterns',
        type: 'mastery',
        pattern: 'Hexagonal Architecture',
        frequency: 25,
        confidence: 0.88,
        evolution: 'established',
        firstSeen: new Date(Date.now() - 1209600000), // 2 weeks ago
        lastReinforced: new Date(Date.now() - 300000), // 5 minutes ago
        contexts: ['architecture', 'design-patterns', 'scalability'],
        impact: 'significant',
        arcaneSymbol: '👑',
        mysticalHue: '#f59e0b'
      },
      {
        id: 'performance-optimization',
        type: 'mastery',
        pattern: 'React Performance Optimization',
        frequency: 18,
        confidence: 0.85,
        evolution: 'established',
        firstSeen: new Date(Date.now() - 864000000), // 10 days ago
        lastReinforced: new Date(Date.now() - 600000), // 10 minutes ago
        contexts: ['performance', 'optimization', 'react'],
        impact: 'significant',
        arcaneSymbol: '👑',
        mysticalHue: '#f59e0b'
      },
      {
        id: 'testing-mastery',
        type: 'mastery',
        pattern: 'Comprehensive Testing Strategy',
        frequency: 22,
        confidence: 0.9,
        evolution: 'mastered',
        firstSeen: new Date(Date.now() - 1555200000), // 18 days ago
        lastReinforced: new Date(Date.now() - 1800000), // 30 minutes ago
        contexts: ['testing', 'quality', 'automation'],
        impact: 'significant',
        arcaneSymbol: '👑',
        mysticalHue: '#f59e0b'
      },
      {
        id: 'breakthrough-insight',
        type: 'breakthrough',
        pattern: 'Micro-Frontend Architecture Insight',
        frequency: 3,
        confidence: 0.75,
        evolution: 'developing',
        firstSeen: new Date(Date.now() - 86400000), // 1 day ago
        lastReinforced: new Date(Date.now() - 3600000), // 1 hour ago
        contexts: ['architecture', 'scalability', 'innovation'],
        impact: 'transformative',
        arcaneSymbol: '💫',
        mysticalHue: '#ec4899'
      }
    ],
    userEvolution: {
      totalPatterns: 23,
      masteredSkills: ['react-hooks', 'typescript', 'testing', 'architecture', 'performance'],
      emeraldWisdomLevel: 0.72,
      consciousnessExpansion: 0.65,
      creativePotential: 0.7,
      technicalMastery: 0.68,
      arcaneRank: 'Adept'
    },
    repositoryContext: {
      language: 'TypeScript',
      architecture: 'microservices',
      complexity: 0.8,
      patterns: ['hexagonal', 'micro-frontends', 'performance', 'testing']
    },
    isVisible: true,
    manifestationStyle: 'wizard',
    showEvolution: true,
    showConstellations: true,
    showWisdomSynthesis: true,
    arcaneIntensity: 'potent',
  },
  parameters: {
    docs: {
      description: {
        story: 'Adept level with mastered patterns and breakthrough insights',
      },
    },
  },
};

// Wizard - Ultimate Mastery
export const WizardTranscendence: Story = {
  args: {
    memoryPatterns: [
      {
        id: 'universal-architecture',
        type: 'evolution',
        pattern: 'Universal Architecture Principles',
        frequency: 50,
        confidence: 0.98,
        evolution: 'transcended',
        firstSeen: new Date(Date.now() - 2592000000), // 30 days ago
        lastReinforced: new Date(Date.now() - 60000), // 1 minute ago
        contexts: ['architecture', 'universal-patterns', 'transcendence'],
        impact: 'transformative',
        arcaneSymbol: '🌟',
        mysticalHue: '#a855f7'
      },
      {
        id: 'consciousness-programming',
        type: 'wisdom',
        pattern: 'Conscious Code Creation',
        frequency: 42,
        confidence: 0.95,
        evolution: 'transcended',
        firstSeen: new Date(Date.now() - 2160000000), // 25 days ago
        lastReinforced: new Date(Date.now() - 120000), // 2 minutes ago
        contexts: ['consciousness', 'wisdom', 'creation'],
        impact: 'transformative',
        arcaneSymbol: '📜',
        mysticalHue: '#10b981'
      },
      {
        id: 'emerald-dream-mastery',
        type: 'evolution',
        pattern: 'Emerald Dream Flow Integration',
        frequency: 38,
        confidence: 0.97,
        evolution: 'transcended',
        firstSeen: new Date(Date.now() - 1728000000), // 20 days ago
        lastReinforced: new Date(Date.now() - 180000), // 3 minutes ago
        contexts: ['emerald-dream', 'flow', 'transcendence'],
        impact: 'transformative',
        arcaneSymbol: '🌟',
        mysticalHue: '#a855f7'
      },
      {
        id: 'reality-synthesis',
        type: 'breakthrough',
        pattern: 'Code-Reality Synthesis Mastery',
        frequency: 15,
        confidence: 0.92,
        evolution: 'mastered',
        firstSeen: new Date(Date.now() - 604800000), // 1 week ago
        lastReinforced: new Date(Date.now() - 240000), // 4 minutes ago
        contexts: ['synthesis', 'reality', 'breakthrough'],
        impact: 'transformative',
        arcaneSymbol: '💫',
        mysticalHue: '#ec4899'
      }
    ],
    userEvolution: {
      totalPatterns: 67,
      masteredSkills: [
        'react-mastery', 'typescript-mastery', 'architecture-sage', 'performance-wizard',
        'testing-legend', 'emerald-flow', 'consciousness-programming', 'reality-synthesis',
        'pattern-transcendence', 'wisdom-manifestation'
      ],
      emeraldWisdomLevel: 0.97,
      consciousnessExpansion: 0.95,
      creativePotential: 0.98,
      technicalMastery: 0.94,
      arcaneRank: 'Wizard'
    },
    repositoryContext: {
      language: 'Universal',
      architecture: 'transcendent',
      complexity: 1.0,
      patterns: ['universal', 'consciousness', 'emerald-dream', 'reality-synthesis']
    },
    isVisible: true,
    manifestationStyle: 'wizard',
    showEvolution: true,
    showConstellations: true,
    showWisdomSynthesis: true,
    arcaneIntensity: 'legendary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Wizard level with transcended patterns and ultimate consciousness',
      },
    },
  },
};

// Interactive Evolution Journey
export const EvolutionJourney: Story = {
  render: () => {
    const [currentRank, setCurrentRank] = useState(0);
    const [isEvolving, setIsEvolving] = useState(false);
    const [patternCount, setPatternCount] = useState(2);
    
    const evolutionStages = [
      {
        rank: 'Initiate',
        patterns: 2,
        userEvolution: {
          totalPatterns: 2,
          masteredSkills: [],
          emeraldWisdomLevel: 0.15,
          consciousnessExpansion: 0.1,
          creativePotential: 0.2,
          technicalMastery: 0.1,
          arcaneRank: 'Initiate' as const
        }
      },
      {
        rank: 'Apprentice',
        patterns: 8,
        userEvolution: {
          totalPatterns: 8,
          masteredSkills: ['basic-react'],
          emeraldWisdomLevel: 0.35,
          consciousnessExpansion: 0.3,
          creativePotential: 0.4,
          technicalMastery: 0.32,
          arcaneRank: 'Apprentice' as const
        }
      },
      {
        rank: 'Practitioner',
        patterns: 15,
        userEvolution: {
          totalPatterns: 15,
          masteredSkills: ['react-hooks', 'typescript', 'testing'],
          emeraldWisdomLevel: 0.52,
          consciousnessExpansion: 0.48,
          creativePotential: 0.55,
          technicalMastery: 0.5,
          arcaneRank: 'Practitioner' as const
        }
      },
      {
        rank: 'Adept',
        patterns: 23,
        userEvolution: {
          totalPatterns: 23,
          masteredSkills: ['react-hooks', 'typescript', 'testing', 'architecture', 'performance'],
          emeraldWisdomLevel: 0.72,
          consciousnessExpansion: 0.65,
          creativePotential: 0.7,
          technicalMastery: 0.68,
          arcaneRank: 'Adept' as const
        }
      },
      {
        rank: 'Master',
        patterns: 35,
        userEvolution: {
          totalPatterns: 35,
          masteredSkills: ['react-mastery', 'typescript-mastery', 'architecture-sage', 'performance-wizard', 'testing-legend'],
          emeraldWisdomLevel: 0.82,
          consciousnessExpansion: 0.78,
          creativePotential: 0.85,
          technicalMastery: 0.8,
          arcaneRank: 'Master' as const
        }
      },
      {
        rank: 'Wizard',
        patterns: 67,
        userEvolution: {
          totalPatterns: 67,
          masteredSkills: [
            'react-mastery', 'typescript-mastery', 'architecture-sage', 'performance-wizard',
            'testing-legend', 'emerald-flow', 'consciousness-programming', 'reality-synthesis'
          ],
          emeraldWisdomLevel: 0.97,
          consciousnessExpansion: 0.95,
          creativePotential: 0.98,
          technicalMastery: 0.94,
          arcaneRank: 'Wizard' as const
        }
      }
    ];
    
    const generatePatterns = (stage: typeof evolutionStages[0]) => {
      const patterns = [];
      for (let i = 0; i < Math.min(stage.patterns, 8); i++) {
        const patternTypes = ['workflow', 'preference', 'mastery', 'breakthrough', 'wisdom', 'evolution'];
        const evolutions = ['emerging', 'developing', 'established', 'mastered', 'transcended'];
        
        const type = patternTypes[i % patternTypes.length];
        const evolution = evolutions[Math.min(Math.floor(i / 2), evolutions.length - 1)];
        
        patterns.push({
          id: `pattern-${i}`,
          type: type as any,
          pattern: `${type.charAt(0).toUpperCase() + type.slice(1)} Pattern ${i + 1}`,
          frequency: Math.floor(Math.random() * 30) + 5,
          confidence: Math.min(0.3 + (i * 0.1), 0.98),
          evolution: evolution as any,
          firstSeen: new Date(Date.now() - (i + 1) * 86400000),
          lastReinforced: new Date(Date.now() - Math.random() * 3600000),
          contexts: ['learning', 'practice'],
          impact: evolution === 'transcended' ? 'transformative' as const : 'moderate' as const,
          arcaneSymbol: ['⚡', '🔮', '👑', '💫', '📜', '🌟'][i % 6],
          mysticalHue: ['#8b5cf6', '#06b6d4', '#f59e0b', '#ec4899', '#10b981', '#a855f7'][i % 6]
        });
      }
      return patterns;
    };
    
    const currentStage = evolutionStages[currentRank];
    const currentPatterns = generatePatterns(currentStage);
    
    const evolveToNext = () => {
      if (currentRank < evolutionStages.length - 1) {
        setIsEvolving(true);
        setTimeout(() => {
          setCurrentRank(prev => prev + 1);
          setPatternCount(evolutionStages[currentRank + 1].patterns);
          setIsEvolving(false);
        }, 1000);
      }
    };
    
    const resetEvolution = () => {
      setCurrentRank(0);
      setPatternCount(2);
      setIsEvolving(false);
    };
    
    return (
      <div className="relative w-full h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
        {/* Control Panel */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 bg-purple-900/90 backdrop-blur-md border border-purple-400/30 rounded-lg p-4 max-w-lg">
          <h3 className="text-lg font-medium text-purple-100 mb-4 text-center">
            🧙‍♂️ Wizard Evolution Journey
          </h3>
          
          <div className="space-y-4">
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-purple-100">
                {currentStage.rank}
              </div>
              <div className="text-sm text-purple-300">
                Patterns Learned: {currentStage.patterns}
              </div>
              <div className="text-sm text-purple-300">
                Mastered Skills: {currentStage.userEvolution.masteredSkills.length}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="text-center">
                <div className="text-purple-400">Emerald Wisdom</div>
                <div className="text-purple-100 font-medium">
                  {Math.round(currentStage.userEvolution.emeraldWisdomLevel * 100)}%
                </div>
              </div>
              <div className="text-center">
                <div className="text-purple-400">Consciousness</div>
                <div className="text-purple-100 font-medium">
                  {Math.round(currentStage.userEvolution.consciousnessExpansion * 100)}%
                </div>
              </div>
              <div className="text-center">
                <div className="text-purple-400">Creative Potential</div>
                <div className="text-purple-100 font-medium">
                  {Math.round(currentStage.userEvolution.creativePotential * 100)}%
                </div>
              </div>
              <div className="text-center">
                <div className="text-purple-400">Technical Mastery</div>
                <div className="text-purple-100 font-medium">
                  {Math.round(currentStage.userEvolution.technicalMastery * 100)}%
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2 justify-center">
              <button
                onClick={evolveToNext}
                disabled={isEvolving || currentRank >= evolutionStages.length - 1}
                className="px-4 py-2 bg-purple-600/40 text-purple-100 rounded text-sm
                         hover:bg-purple-600/60 transition-all duration-200
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isEvolving ? 'Evolving...' : 'Evolve'}
              </button>
              
              <button
                onClick={resetEvolution}
                className="px-4 py-2 bg-slate-600/40 text-slate-100 rounded text-sm
                         hover:bg-slate-600/60 transition-all duration-200"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
        
        {/* Memory Manifestation */}
        <MemoryManifestation
          memoryPatterns={currentPatterns}
          userEvolution={currentStage.userEvolution}
          repositoryContext={{
            language: 'TypeScript',
            architecture: 'evolving',
            complexity: currentRank / (evolutionStages.length - 1),
            patterns: currentStage.userEvolution.masteredSkills
          }}
          isVisible={true}
          manifestationStyle="wizard"
          showEvolution={true}
          showConstellations={true}
          showWisdomSynthesis={true}
          arcaneIntensity={
            currentRank >= 5 ? 'legendary' :
            currentRank >= 3 ? 'potent' :
            currentRank >= 1 ? 'moderate' : 'subtle'
          }
          onPatternEvolved={(pattern) => {
            console.log('Pattern evolved:', pattern);
          }}
          onWisdomSynthesized={(wisdom) => {
            console.log('Wisdom synthesized:', wisdom);
          }}
          onArcaneRankAdvanced={(rank) => {
            console.log('Rank advanced:', rank);
          }}
        />
        
        {/* Background decoration */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center space-y-4 opacity-10">
            <div className="text-9xl">🌌</div>
            <div className="text-3xl text-purple-300 font-light">
              Memory Constellation
            </div>
            <div className="text-xl text-purple-400 italic">
              {isEvolving ? 'Evolution in Progress...' : `${currentStage.rank} Level`}
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive evolution journey from Initiate to Wizard with pattern manifestation',
      },
    },
  },
};

// Arcane Intensity Comparison
export const ArcaneIntensityComparison: Story = {
  render: () => {
    const [selectedIntensity, setSelectedIntensity] = useState<'subtle' | 'moderate' | 'potent' | 'legendary'>('potent');
    
    const samplePatterns = [
      {
        id: 'react-mastery',
        type: 'mastery' as const,
        pattern: 'React Component Mastery',
        frequency: 25,
        confidence: 0.88,
        evolution: 'established' as const,
        firstSeen: new Date(Date.now() - 1209600000),
        lastReinforced: new Date(Date.now() - 300000),
        contexts: ['components', 'react'],
        impact: 'significant' as const,
        arcaneSymbol: '👑',
        mysticalHue: '#f59e0b'
      },
      {
        id: 'typescript-wisdom',
        type: 'wisdom' as const,
        pattern: 'TypeScript Type Wisdom',
        frequency: 30,
        confidence: 0.92,
        evolution: 'mastered' as const,
        firstSeen: new Date(Date.now() - 1555200000),
        lastReinforced: new Date(Date.now() - 600000),
        contexts: ['typing', 'safety'],
        impact: 'transformative' as const,
        arcaneSymbol: '📜',
        mysticalHue: '#10b981'
      },
      {
        id: 'architecture-transcendence',
        type: 'evolution' as const,
        pattern: 'Architecture Transcendence',
        frequency: 35,
        confidence: 0.96,
        evolution: 'transcended' as const,
        firstSeen: new Date(Date.now() - 2160000000),
        lastReinforced: new Date(Date.now() - 120000),
        contexts: ['architecture', 'transcendence'],
        impact: 'transformative' as const,
        arcaneSymbol: '🌟',
        mysticalHue: '#a855f7'
      }
    ];
    
    const userEvolution = {
      totalPatterns: 45,
      masteredSkills: ['react-mastery', 'typescript-mastery', 'architecture-sage', 'performance-wizard'],
      emeraldWisdomLevel: 0.85,
      consciousnessExpansion: 0.8,
      creativePotential: 0.88,
      technicalMastery: 0.82,
      arcaneRank: 'Master' as const
    };
    
    return (
      <div className="relative w-full h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
        <div className="absolute top-4 right-4 z-50 bg-purple-900/90 backdrop-blur-md border border-purple-400/30 rounded-lg p-4">
          <h3 className="text-lg font-medium text-purple-100 mb-4">
            ✨ Arcane Intensity Levels
          </h3>
          
          <div className="space-y-3">
            {(['subtle', 'moderate', 'potent', 'legendary'] as const).map((intensity) => (
              <button
                key={intensity}
                onClick={() => setSelectedIntensity(intensity)}
                className={`w-full px-4 py-3 rounded-lg transition-all duration-200 text-left
                  ${selectedIntensity === intensity 
                    ? 'bg-purple-600/50 text-purple-100 border border-purple-400/50' 
                    : 'bg-purple-800/30 text-purple-300 hover:bg-purple-800/50 border border-transparent'
                  }`}
              >
                <div className="font-medium capitalize">{intensity}</div>
                <div className="text-xs opacity-75 mt-1">
                  {intensity === 'subtle' && 'Minimal arcane effects for performance'}
                  {intensity === 'moderate' && 'Balanced mystical presence'}
                  {intensity === 'potent' && 'Full wizard manifestation'}
                  {intensity === 'legendary' && 'Maximum arcane transcendence'}
                </div>
              </button>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-purple-700/30 text-xs text-purple-300">
            <div className="space-y-1">
              <div>Rank: <span className="text-purple-100">Master</span></div>
              <div>Patterns: <span className="text-purple-100">45</span></div>
              <div>Mastery: <span className="text-purple-100">85%</span></div>
            </div>
          </div>
        </div>
        
        <MemoryManifestation
          memoryPatterns={samplePatterns}
          userEvolution={userEvolution}
          repositoryContext={{
            language: 'TypeScript',
            architecture: 'advanced',
            complexity: 0.8,
            patterns: ['mastery', 'transcendence']
          }}
          isVisible={true}
          manifestationStyle="wizard"
          showEvolution={true}
          showConstellations={true}
          showWisdomSynthesis={true}
          arcaneIntensity={selectedIntensity}
        />
        
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center space-y-4 opacity-10">
            <div className="text-9xl">🔮</div>
            <div className="text-3xl text-purple-300 font-light">
              Arcane Manifestation
            </div>
            <div className="text-xl text-purple-400 italic capitalize">
              {selectedIntensity} intensity
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Compare different arcane intensity levels from subtle to legendary',
      },
    },
  },
};

// Constellation Map Focus
export const ConstellationMapFocus: Story = {
  args: {
    memoryPatterns: [
      // Workflow constellation
      {
        id: 'workflow-1',
        type: 'workflow',
        pattern: 'Component Creation Flow',
        frequency: 20,
        confidence: 0.8,
        evolution: 'established',
        firstSeen: new Date(Date.now() - 1209600000),
        lastReinforced: new Date(Date.now() - 300000),
        contexts: ['components'],
        impact: 'moderate',
        arcaneSymbol: '⚡',
        mysticalHue: '#8b5cf6'
      },
      {
        id: 'workflow-2',
        type: 'workflow',
        pattern: 'Testing Workflow',
        frequency: 15,
        confidence: 0.75,
        evolution: 'established',
        firstSeen: new Date(Date.now() - 864000000),
        lastReinforced: new Date(Date.now() - 600000),
        contexts: ['testing'],
        impact: 'moderate',
        arcaneSymbol: '⚡',
        mysticalHue: '#8b5cf6'
      },
      // Mastery constellation
      {
        id: 'mastery-1',
        type: 'mastery',
        pattern: 'Architecture Mastery',
        frequency: 30,
        confidence: 0.92,
        evolution: 'mastered',
        firstSeen: new Date(Date.now() - 1555200000),
        lastReinforced: new Date(Date.now() - 120000),
        contexts: ['architecture'],
        impact: 'transformative',
        arcaneSymbol: '👑',
        mysticalHue: '#f59e0b'
      },
      {
        id: 'mastery-2',
        type: 'mastery',
        pattern: 'Performance Mastery',
        frequency: 25,
        confidence: 0.88,
        evolution: 'mastered',
        firstSeen: new Date(Date.now() - 1209600000),
        lastReinforced: new Date(Date.now() - 300000),
        contexts: ['performance'],
        impact: 'significant',
        arcaneSymbol: '👑',
        mysticalHue: '#f59e0b'
      },
      // Wisdom constellation
      {
        id: 'wisdom-1',
        type: 'wisdom',
        pattern: 'Code Philosophy',
        frequency: 35,
        confidence: 0.95,
        evolution: 'transcended',
        firstSeen: new Date(Date.now() - 2160000000),
        lastReinforced: new Date(Date.now() - 60000),
        contexts: ['philosophy'],
        impact: 'transformative',
        arcaneSymbol: '📜',
        mysticalHue: '#10b981'
      }
    ],
    userEvolution: {
      totalPatterns: 32,
      masteredSkills: ['react-mastery', 'architecture-sage', 'performance-wizard', 'code-philosophy'],
      emeraldWisdomLevel: 0.78,
      consciousnessExpansion: 0.72,
      creativePotential: 0.8,
      technicalMastery: 0.75,
      arcaneRank: 'Master'
    },
    isVisible: true,
    manifestationStyle: 'wizard',
    showEvolution: false,
    showConstellations: true,
    showWisdomSynthesis: false,
    arcaneIntensity: 'potent',
  },
  parameters: {
    docs: {
      description: {
        story: 'Focus on constellation map with grouped patterns showing different mastery levels',
      },
    },
  },
};
