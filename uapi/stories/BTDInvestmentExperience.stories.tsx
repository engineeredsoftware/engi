import type { Meta, StoryObj } from '@storybook/react';
import { useState, useEffect } from 'react';
import { MarketingBtdInvestmentExperience } from '../app/(root)/components/MarketingBtdInvestmentExperience';

const meta: Meta<typeof MarketingBtdInvestmentExperience> = {
  title: 'Bitcode/Surprise & Delight/BTD Holding Experience',
  component: MarketingBtdInvestmentExperience,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
### BTD Holding Experience - Fit-Value Signal

Transforms measured-BTD allocation into fit-value visualization:

- **Allocation signal** - Calculates value multipliers based on efficiency, learning, and reusability
- **Value-delta visualization** - Shows measured-BTD efficiency trends with animated value counters and charts
- **Efficiency coaching** - AI-powered insights over measured-BTD allocation patterns
- **Value projection** - Predicts future AssetPack value based on historical performance patterns
- **High-fit runs** - Highlights exceptional efficiency achievements with particle effects
- **Pattern mastery tracking** - Visualizes learning acceleration and skill development over time
- **Higher-order value calculation** - Metrics beyond raw measured-BTD counting
- **Allocation optimization** - Suggests measured-BTD reduction and efficiency improvements

The system keeps $BTD framed as a non-fungible AssetPack share/read-right while visualizing measured-BTD efficiency and fit-quality improvement.
        `,
      },
    },
  },
  argTypes: {
    magicalIntensity: {
      control: { type: 'select' },
      options: ['mundane', 'enchanted', 'mystical', 'transcendent'],
      description: 'Level of magical enhancement effects',
    },
    showValueVisualization: {
      control: 'boolean',
      description: 'Show investment alchemy value panel',
    },
    showEfficiencyCoaching: {
      control: 'boolean',
      description: 'Show AI efficiency coaching insights',
    },
    showMagicalInsights: {
      control: 'boolean',
      description: 'Show magical particle effects and moments',
    },
    showROIProjections: {
      control: 'boolean',
      description: 'Show upcoming AssetPack projections',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Efficient Investor - High ROI
export const EfficientInvestor: Story = {
  args: {
    investments: [
      {
        id: 'inv-001',
        assetPackName: 'User Authentication Component',
        measuredBtdEstimate: 120,
        measuredBtd: 95,
        efficiency: 1.26, // Spent 26% less than estimated
        timeSpent: 1800, // 30 minutes
        complexity: 'moderate',
        category: 'component',
        patterns: ['react-hooks', 'typescript', 'authentication'],
        learningValue: 0.7,
        reuseablilityPotential: 0.9,
        businessImpact: 0.8,
        magicalMultiplier: 1.8,
        timestamp: new Date(Date.now() - 3600000) // 1 hour ago
      },
      {
        id: 'inv-002',
        assetPackName: 'Dashboard Layout System',
        measuredBtdEstimate: 200,
        measuredBtd: 160,
        efficiency: 1.25,
        timeSpent: 2700, // 45 minutes
        complexity: 'complex',
        category: 'component',
        patterns: ['layout-system', 'responsive-design', 'component-composition'],
        learningValue: 0.8,
        reuseablilityPotential: 0.95,
        businessImpact: 0.9,
        magicalMultiplier: 2.1,
        timestamp: new Date(Date.now() - 7200000) // 2 hours ago
      },
      {
        id: 'inv-003',
        assetPackName: 'API Integration Service',
        measuredBtdEstimate: 300,
        measuredBtd: 280,
        efficiency: 1.07,
        timeSpent: 3600, // 1 hour
        complexity: 'complex',
        category: 'service',
        patterns: ['api-integration', 'error-handling', 'typescript'],
        learningValue: 0.6,
        reuseablilityPotential: 0.7,
        businessImpact: 0.85,
        magicalMultiplier: 1.4,
        timestamp: new Date(Date.now() - 10800000) // 3 hours ago
      }
    ],
    currentBalance: 2450,
    upcomingNeed: {
      name: 'Wallet Settlement Coordination',
      measuredBtdEstimate: 250,
      complexity: 'complex',
      patterns: ['wallet-settlement', 'security', 'error-handling']
    },
    investmentPatterns: {
      averageEfficiency: 1.19,
      preferredComplexity: 'moderate',
      riskTolerance: 'balanced',
      learningFocus: ['typescript', 'react-patterns', 'api-design']
    },
    showValueVisualization: true,
    showEfficiencyCoaching: true,
    showMagicalInsights: true,
    showROIProjections: true,
    magicalIntensity: 'mystical',
  },
  parameters: {
    docs: {
      description: {
        story: 'Efficient investor with high ROI and magical value multipliers',
      },
    },
  },
};

// Learning Focused - Transcendent Coaching
export const LearningFocused: Story = {
  args: {
    investments: [
      {
        id: 'learn-001',
        assetPackName: 'GraphQL API Explorer',
        measuredBtdEstimate: 180,
        measuredBtd: 220,
        efficiency: 0.82, // Spent more than estimated (learning curve)
        timeSpent: 4200, // 70 minutes
        complexity: 'complex',
        category: 'service',
        patterns: ['graphql', 'api-design', 'schema-definition'],
        learningValue: 0.95, // High learning value
        reuseablilityPotential: 0.8,
        businessImpact: 0.7,
        magicalMultiplier: 1.6, // Still good due to high learning
        timestamp: new Date(Date.now() - 1800000) // 30 minutes ago
      },
      {
        id: 'learn-002',
        assetPackName: 'WebSocket Real-time Chat',
        measuredBtdEstimate: 150,
        measuredBtd: 190,
        efficiency: 0.79,
        timeSpent: 3900, // 65 minutes
        complexity: 'complex',
        category: 'feature',
        patterns: ['websockets', 'real-time', 'event-handling'],
        learningValue: 0.9,
        reuseablilityPotential: 0.75,
        businessImpact: 0.85,
        magicalMultiplier: 1.5,
        timestamp: new Date(Date.now() - 5400000) // 90 minutes ago
      },
      {
        id: 'learn-003',
        assetPackName: 'Docker Deployment Pipeline',
        measuredBtdEstimate: 100,
        measuredBtd: 140,
        efficiency: 0.71,
        timeSpent: 3000, // 50 minutes
        complexity: 'moderate',
        category: 'refactor',
        patterns: ['docker', 'deployment', 'devops'],
        learningValue: 0.85,
        reuseablilityPotential: 0.9,
        businessImpact: 0.8,
        magicalMultiplier: 1.3,
        timestamp: new Date(Date.now() - 9000000) // 2.5 hours ago
      }
    ],
    currentBalance: 1850,
    upcomingNeed: {
      name: 'Kubernetes Orchestration Setup',
      measuredBtdEstimate: 200,
      complexity: 'epic',
      patterns: ['kubernetes', 'orchestration', 'scaling']
    },
    investmentPatterns: {
      averageEfficiency: 0.77,
      preferredComplexity: 'complex',
      riskTolerance: 'aggressive',
      learningFocus: ['devops', 'infrastructure', 'scaling']
    },
    showValueVisualization: true,
    showEfficiencyCoaching: true,
    showMagicalInsights: true,
    showROIProjections: true,
    magicalIntensity: 'transcendent',
  },
  parameters: {
    docs: {
      description: {
        story: 'Learning-focused investor with transcendent coaching for skill development',
      },
    },
  },
};

// Magical Moments - Exceptional Efficiency
export const MagicalMoments: Story = {
  args: {
    investments: [
      {
        id: 'magic-001',
        assetPackName: 'Component Library Foundation',
        measuredBtdEstimate: 400,
        measuredBtd: 180,
        efficiency: 2.22, // Spent 55% less than estimated!
        timeSpent: 2400, // 40 minutes
        complexity: 'epic',
        category: 'component',
        patterns: ['design-system', 'component-library', 'reusable-components'],
        learningValue: 0.8,
        reuseablilityPotential: 0.98,
        businessImpact: 0.95,
        magicalMultiplier: 2.8, // Magical moment!
        timestamp: new Date(Date.now() - 1200000) // 20 minutes ago
      },
      {
        id: 'magic-002',
        assetPackName: 'Automated Testing Suite',
        measuredBtdEstimate: 250,
        measuredBtd: 120,
        efficiency: 2.08,
        timeSpent: 1800, // 30 minutes
        complexity: 'complex',
        category: 'test',
        patterns: ['automated-testing', 'ci-cd', 'quality-assurance'],
        learningValue: 0.7,
        reuseablilityPotential: 0.9,
        businessImpact: 0.9,
        magicalMultiplier: 2.5,
        timestamp: new Date(Date.now() - 3600000) // 1 hour ago
      },
      {
        id: 'magic-003',
        assetPackName: 'Performance Optimization Bundle',
        measuredBtdEstimate: 300,
        measuredBtd: 150,
        efficiency: 2.0,
        timeSpent: 2100, // 35 minutes
        complexity: 'complex',
        category: 'refactor',
        patterns: ['performance', 'optimization', 'bundle-analysis'],
        learningValue: 0.75,
        reuseablilityPotential: 0.85,
        businessImpact: 0.88,
        magicalMultiplier: 2.3,
        timestamp: new Date(Date.now() - 7200000) // 2 hours ago
      }
    ],
    currentBalance: 3200,
    upcomingNeed: {
      name: 'Micro-Frontend Architecture',
      measuredBtdEstimate: 500,
      complexity: 'epic',
      patterns: ['micro-frontends', 'module-federation', 'scalability']
    },
    investmentPatterns: {
      averageEfficiency: 2.1,
      preferredComplexity: 'epic',
      riskTolerance: 'balanced',
      learningFocus: ['architecture', 'performance', 'scalability']
    },
    showValueVisualization: true,
    showEfficiencyCoaching: true,
    showMagicalInsights: true,
    showROIProjections: true,
    magicalIntensity: 'transcendent',
  },
  parameters: {
    docs: {
      description: {
        story: 'Exceptional efficiency with multiple magical moments and transcendent value',
      },
    },
  },
};

// Conservative Investor - Balanced Approach
export const ConservativeInvestor: Story = {
  args: {
    investments: [
      {
        id: 'cons-001',
        assetPackName: 'Simple Contact Form',
        measuredBtdEstimate: 50,
        measuredBtd: 55,
        efficiency: 0.91,
        timeSpent: 1200, // 20 minutes
        complexity: 'simple',
        category: 'component',
        patterns: ['forms', 'validation'],
        learningValue: 0.4,
        reuseablilityPotential: 0.6,
        businessImpact: 0.5,
        magicalMultiplier: 1.1,
        timestamp: new Date(Date.now() - 1800000) // 30 minutes ago
      },
      {
        id: 'cons-002',
        assetPackName: 'CSS Styling Updates',
        measuredBtdEstimate: 30,
        measuredBtd: 35,
        efficiency: 0.86,
        timeSpent: 900, // 15 minutes
        complexity: 'simple',
        category: 'refactor',
        patterns: ['css', 'styling'],
        learningValue: 0.3,
        reuseablilityPotential: 0.4,
        businessImpact: 0.4,
        magicalMultiplier: 1.0,
        timestamp: new Date(Date.now() - 3600000) // 1 hour ago
      },
      {
        id: 'cons-003',
        assetPackName: 'Documentation Update',
        measuredBtdEstimate: 40,
        measuredBtd: 42,
        efficiency: 0.95,
        timeSpent: 1500, // 25 minutes
        complexity: 'simple',
        category: 'documentation',
        patterns: ['documentation', 'markdown'],
        learningValue: 0.2,
        reuseablilityPotential: 0.3,
        businessImpact: 0.6,
        magicalMultiplier: 1.05,
        timestamp: new Date(Date.now() - 5400000) // 90 minutes ago
      }
    ],
    currentBalance: 980,
    upcomingNeed: {
      name: 'Button Component Variants',
      measuredBtdEstimate: 60,
      complexity: 'simple',
      patterns: ['components', 'variants', 'design-system']
    },
    investmentPatterns: {
      averageEfficiency: 0.91,
      preferredComplexity: 'simple',
      riskTolerance: 'conservative',
      learningFocus: ['basic-components', 'styling', 'documentation']
    },
    showValueVisualization: true,
    showEfficiencyCoaching: true,
    showMagicalInsights: true,
    showROIProjections: true,
    magicalIntensity: 'enchanted',
  },
  parameters: {
    docs: {
      description: {
        story: 'Conservative investor with balanced efficiency and steady growth',
      },
    },
  },
};

// Interactive Investment Journey
export const InvestmentJourney: Story = {
  render: () => {
    const [selectedInvestor, setSelectedInvestor] = useState(0);
    const [magicalIntensity, setMagicalIntensity] = useState<'mundane' | 'enchanted' | 'mystical' | 'transcendent'>('mystical');
    const [showCoaching, setShowCoaching] = useState(true);
    
    const investorProfiles = [
      {
        name: 'Beginner Builder',
        balance: 500,
        investments: [
          {
            id: 'beginner-1',
            assetPackName: 'Hello World Component',
            measuredBtdEstimate: 20,
            measuredBtd: 25,
            efficiency: 0.8,
            timeSpent: 900,
            complexity: 'simple' as const,
            category: 'component' as const,
            patterns: ['react-basics'],
            learningValue: 0.6,
            reuseablilityPotential: 0.3,
            businessImpact: 0.2,
            magicalMultiplier: 1.2,
            timestamp: new Date(Date.now() - 1800000)
          }
        ],
        patterns: {
          averageEfficiency: 0.8,
          preferredComplexity: 'simple',
          riskTolerance: 'conservative' as const,
          learningFocus: ['react-basics', 'components']
        }
      },
      {
        name: 'Skilled Developer',
        balance: 2000,
        investments: [
          {
            id: 'skilled-1',
            assetPackName: 'User Dashboard',
            measuredBtdEstimate: 180,
            measuredBtd: 150,
            efficiency: 1.2,
            timeSpent: 2400,
            complexity: 'moderate' as const,
            category: 'feature' as const,
            patterns: ['dashboard', 'data-visualization', 'user-experience'],
            learningValue: 0.7,
            reuseablilityPotential: 0.8,
            businessImpact: 0.85,
            magicalMultiplier: 1.6,
            timestamp: new Date(Date.now() - 3600000)
          },
          {
            id: 'skilled-2',
            assetPackName: 'API Integration Layer',
            measuredBtdEstimate: 220,
            measuredBtd: 190,
            efficiency: 1.16,
            timeSpent: 3000,
            complexity: 'complex' as const,
            category: 'service' as const,
            patterns: ['api-integration', 'error-handling', 'typescript'],
            learningValue: 0.6,
            reuseablilityPotential: 0.9,
            businessImpact: 0.9,
            magicalMultiplier: 1.5,
            timestamp: new Date(Date.now() - 7200000)
          }
        ],
        patterns: {
          averageEfficiency: 1.18,
          preferredComplexity: 'moderate',
          riskTolerance: 'balanced' as const,
          learningFocus: ['typescript', 'api-design', 'user-experience']
        }
      },
      {
        name: 'Architecture Wizard',
        balance: 5000,
        investments: [
          {
            id: 'wizard-1',
            assetPackName: 'Micro-Frontend System',
            measuredBtdEstimate: 600,
            measuredBtd: 320,
            efficiency: 1.875,
            timeSpent: 4800,
            complexity: 'epic' as const,
            category: 'feature' as const,
            patterns: ['micro-frontends', 'module-federation', 'architecture'],
            learningValue: 0.9,
            reuseablilityPotential: 0.95,
            businessImpact: 0.98,
            magicalMultiplier: 2.7,
            timestamp: new Date(Date.now() - 1800000)
          },
          {
            id: 'wizard-2',
            assetPackName: 'Performance Optimization Suite',
            measuredBtdEstimate: 400,
            measuredBtd: 180,
            efficiency: 2.22,
            timeSpent: 3600,
            complexity: 'complex' as const,
            category: 'refactor' as const,
            patterns: ['performance', 'optimization', 'monitoring'],
            learningValue: 0.8,
            reuseablilityPotential: 0.9,
            businessImpact: 0.95,
            magicalMultiplier: 2.5,
            timestamp: new Date(Date.now() - 5400000)
          }
        ],
        patterns: {
          averageEfficiency: 2.0,
          preferredComplexity: 'epic',
          riskTolerance: 'aggressive' as const,
          learningFocus: ['architecture', 'performance', 'scalability']
        }
      }
    ];
    
    const currentProfile = investorProfiles[selectedInvestor];
    
    return (
      <div className="relative w-full h-screen bg-gradient-to-br from-emerald-950 via-teal-900 to-green-950">
        {/* Control Panel */}
        <div className="absolute top-4 left-4 z-50 bg-emerald-900/90 backdrop-blur-md border border-emerald-400/30 rounded-lg p-4 max-w-sm">
          <h3 className="text-lg font-medium text-emerald-100 mb-4">
            💰 Investment Profiles
          </h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="text-sm text-emerald-300">Investor Type</div>
              {investorProfiles.map((profile, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedInvestor(index)}
                  className={`w-full px-3 py-2 rounded transition-all duration-200 text-left text-sm
                    ${selectedInvestor === index 
                      ? 'bg-emerald-600/50 text-emerald-100 border border-emerald-400/50' 
                      : 'bg-emerald-800/30 text-emerald-300 hover:bg-emerald-800/50 border border-transparent'
                    }`}
                >
                  {profile.name}
                </button>
              ))}
            </div>
            
            <div className="space-y-2">
              <div className="text-sm text-emerald-300">Magical Intensity</div>
              <select
                value={magicalIntensity}
                onChange={(e) => setMagicalIntensity(e.target.value as any)}
                className="w-full px-3 py-2 bg-emerald-800/50 text-emerald-100 border border-emerald-600/50 rounded"
              >
                <option value="mundane">Mundane</option>
                <option value="enchanted">Enchanted</option>
                <option value="mystical">Mystical</option>
                <option value="transcendent">Transcendent</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="coaching"
                checked={showCoaching}
                onChange={(e) => setShowCoaching(e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor="coaching" className="text-sm text-emerald-300">
                Show Efficiency Coaching
              </label>
            </div>
            
            <div className="pt-3 border-t border-emerald-700/30 text-xs text-emerald-300">
              <div className="space-y-1">
                <div>Balance: <span className="text-emerald-100">{currentProfile.balance.toLocaleString()} $BTD</span></div>
                <div>Efficiency: <span className="text-emerald-100">{(currentProfile.patterns.averageEfficiency * 100).toFixed(0)}%</span></div>
                <div>Risk: <span className="text-emerald-100 capitalize">{currentProfile.patterns.riskTolerance}</span></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* BTD holding experience */}
        <MarketingBtdInvestmentExperience
          investments={currentProfile.investments}
          currentBalance={currentProfile.balance}
          upcomingNeed={{
            name: selectedInvestor === 0 ? 'Simple Button Component' :
                  selectedInvestor === 1 ? 'Advanced Form System' :
                  'Distributed Architecture Platform',
            measuredBtdEstimate: selectedInvestor === 0 ? 40 :
                             selectedInvestor === 1 ? 200 : 800,
            complexity: selectedInvestor === 0 ? 'simple' :
                       selectedInvestor === 1 ? 'moderate' : 'epic',
            patterns: selectedInvestor === 0 ? ['components', 'styling'] :
                     selectedInvestor === 1 ? ['forms', 'validation', 'user-experience'] :
                     ['architecture', 'distributed-systems', 'scalability']
          }}
          investmentPatterns={currentProfile.patterns}
          showValueVisualization={true}
          showEfficiencyCoaching={showCoaching}
          showMagicalInsights={true}
          showROIProjections={true}
          magicalIntensity={magicalIntensity}
          onInvestmentOptimized={(coaching) => {
            console.log('Investment optimization:', coaching);
          }}
          onMagicalMoment={(moment) => {
            console.log('Magical moment:', moment);
          }}
          onValueInsight={(insight) => {
            console.log('Value insight:', insight);
          }}
        />
        
        {/* Background decoration */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center space-y-4 opacity-20">
            <div className="text-9xl">💎</div>
            <div className="text-3xl text-emerald-300 font-light">
              {currentProfile.name}
            </div>
            <div className="text-xl text-emerald-400 italic">
              Investment Alchemy
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive journey through different investor profiles and magical enhancement levels',
      },
    },
  },
};

// Magical Enhancement Comparison
export const MagicalEnhancementComparison: Story = {
  render: () => {
    const [selectedEnhancement, setSelectedEnhancement] = useState<'mundane' | 'enchanted' | 'mystical' | 'transcendent'>('mystical');
    
    const sampleInvestments = [
      {
        id: 'enhance-001',
        assetPackName: 'Component Library System',
        measuredBtdEstimate: 300,
        measuredBtd: 200,
        efficiency: 1.5,
        timeSpent: 3600,
        complexity: 'complex' as const,
        category: 'component' as const,
        patterns: ['component-library', 'design-system', 'reusability'],
        learningValue: 0.8,
        reuseablilityPotential: 0.95,
        businessImpact: 0.9,
        magicalMultiplier: 2.2,
        timestamp: new Date(Date.now() - 1800000)
      },
      {
        id: 'enhance-002',
        assetPackName: 'Performance Analytics Dashboard',
        measuredBtdEstimate: 250,
        measuredBtd: 180,
        efficiency: 1.39,
        timeSpent: 2700,
        complexity: 'complex' as const,
        category: 'feature' as const,
        patterns: ['analytics', 'data-visualization', 'performance'],
        learningValue: 0.7,
        reuseablilityPotential: 0.8,
        businessImpact: 0.85,
        magicalMultiplier: 1.8,
        timestamp: new Date(Date.now() - 5400000)
      }
    ];
    
    return (
      <div className="relative w-full h-screen bg-gradient-to-br from-emerald-950 via-teal-900 to-green-950">
        <div className="absolute top-4 right-4 z-50 bg-emerald-900/90 backdrop-blur-md border border-emerald-400/30 rounded-lg p-4">
          <h3 className="text-lg font-medium text-emerald-100 mb-4">
            ✨ Magical Enhancement Levels
          </h3>
          
          <div className="space-y-3">
            {(['mundane', 'enchanted', 'mystical', 'transcendent'] as const).map((enhancement) => (
              <button
                key={enhancement}
                onClick={() => setSelectedEnhancement(enhancement)}
                className={`w-full px-4 py-3 rounded-lg transition-all duration-200 text-left
                  ${selectedEnhancement === enhancement 
                    ? 'bg-emerald-600/50 text-emerald-100 border border-emerald-400/50' 
                    : 'bg-emerald-800/30 text-emerald-300 hover:bg-emerald-800/50 border border-transparent'
                  }`}
              >
                <div className="font-medium capitalize">{enhancement}</div>
                <div className="text-xs opacity-75 mt-1">
                  {enhancement === 'mundane' && 'No magical effects, pure efficiency'}
                  {enhancement === 'enchanted' && 'Subtle magical enhancements'}
                  {enhancement === 'mystical' && 'Rich magical value visualization'}
                  {enhancement === 'transcendent' && 'Maximum magical transformation'}
                </div>
              </button>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-emerald-700/30 text-xs text-emerald-300">
            <div className="space-y-1">
              <div>ROI: <span className="text-emerald-100">+47%</span></div>
              <div>Efficiency: <span className="text-emerald-100">145%</span></div>
              <div>Magical Moments: <span className="text-emerald-100">2</span></div>
            </div>
          </div>
        </div>
        
        <MarketingBtdInvestmentExperience
          investments={sampleInvestments}
          currentBalance={3500}
          upcomingNeed={{
            name: 'AI-Powered Code Assistant',
            measuredBtdEstimate: 400,
            complexity: 'epic',
            patterns: ['ai-integration', 'natural-language', 'code-analysis']
          }}
          investmentPatterns={{
            averageEfficiency: 1.45,
            preferredComplexity: 'complex',
            riskTolerance: 'balanced',
            learningFocus: ['ai-integration', 'performance', 'user-experience']
          }}
          showValueVisualization={true}
          showEfficiencyCoaching={true}
          showMagicalInsights={true}
          showROIProjections={true}
          magicalIntensity={selectedEnhancement}
        />
        
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center space-y-4 opacity-20">
            <div className="text-9xl">🪄</div>
            <div className="text-3xl text-emerald-300 font-light">
              Magical Enhancement
            </div>
            <div className="text-xl text-emerald-400 italic capitalize">
              {selectedEnhancement} level
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Compare different levels of magical enhancement from mundane to transcendent',
      },
    },
  },
};
