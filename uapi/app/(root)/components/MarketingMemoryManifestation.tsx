'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MemoryPattern {
  id: string;
  type: 'workflow' | 'preference' | 'mastery' | 'breakthrough' | 'wisdom' | 'evolution';
  pattern: string;
  frequency: number;
  confidence: number; // 0-1
  evolution: 'emerging' | 'developing' | 'established' | 'mastered' | 'transcended';
  firstSeen: Date;
  lastReinforced: Date;
  contexts: string[];
  impact: 'subtle' | 'moderate' | 'significant' | 'transformative';
  arcaneSymbol: string;
  mysticalHue: string;
}

interface MemoryConstellation {
  id: string;
  name: string;
  patterns: MemoryPattern[];
  resonance: number; // 0-1
  manifestationLevel: 'whisper' | 'shimmer' | 'glow' | 'radiance' | 'transcendence';
  astralCoordinates: { x: number; y: number };
  cosmicSignificance: string;
}

interface UserEvolution {
  totalPatterns: number;
  masteredSkills: string[];
  emeraldWisdomLevel: number; // 0-1
  consciousnessExpansion: number; // 0-1
  creativePotential: number; // 0-1
  technicalMastery: number; // 0-1
  arcaneRank: 'Initiate' | 'Apprentice' | 'Practitioner' | 'Adept' | 'Master' | 'Archmage' | 'Wizard';
}

interface MemoryManifestationProps {
  /** Current learned patterns */
  memoryPatterns: MemoryPattern[];
  
  /** User's evolutionary journey */
  userEvolution: UserEvolution;
  
  /** Current repository context */
  repositoryContext?: {
    language?: string;
    architecture?: string;
    complexity?: number;
    patterns?: string[];
  };
  
  /** Show memory visualization */
  isVisible?: boolean;
  
  /** Manifestation style */
  manifestationStyle?: 'ethereal' | 'mystical' | 'cosmic' | 'wizard';
  
  /** Show pattern evolution */
  showEvolution?: boolean;
  
  /** Show constellation map */
  showConstellations?: boolean;
  
  /** Show wisdom synthesis */
  showWisdomSynthesis?: boolean;
  
  /** Arcane intensity */
  arcaneIntensity?: 'subtle' | 'moderate' | 'potent' | 'legendary';
  
  /** Performance controls */
  respectReducedMotion?: boolean;
  
  /** Callbacks */
  onPatternEvolved?: (pattern: MemoryPattern) => void;
  onWisdomSynthesized?: (wisdom: string) => void;
  onBreakthroughAchieved?: (breakthrough: string) => void;
  onArcaneRankAdvanced?: (newRank: string) => void;
}

// Arcane symbols for different pattern types
const ARCANE_SYMBOLS = {
  workflow: '⚡',
  preference: '🔮',
  mastery: '👑',
  breakthrough: '💫',
  wisdom: '📜',
  evolution: '🌟'
};

// Mystical color palette for memory manifestation
const MYSTICAL_HUES = {
  workflow: '#8b5cf6', // violet
  preference: '#06b6d4', // cyan
  mastery: '#f59e0b', // amber
  breakthrough: '#ec4899', // pink
  wisdom: '#10b981', // emerald
  evolution: '#a855f7' // purple
};

// Wizard wisdom templates
const WIZARD_WISDOM = {
  pattern_evolution: [
    "🧙‍♂️ Behold! The pattern '{pattern}' ascends to {evolution} mastery",
    "✨ Ancient wisdom flows: '{pattern}' has transcended mortal understanding",
    "🌟 The cosmic weave recognizes your mastery of '{pattern}'",
    "🔮 By the emerald light, '{pattern}' becomes part of your eternal knowledge"
  ],
  breakthrough: [
    "⚡ Lightning strikes the mind! A breakthrough illuminates your path",
    "💫 The veil parts, revealing deeper truths of your craft",
    "🌠 Cosmic alignment achieved - your consciousness expands",
    "🎭 The universe applauds your transcendence of limitation"
  ],
  wisdom_synthesis: [
    "📚 Ancient tomes whisper: '{wisdom}' joins your arcane library",
    "🧠 Neural constellations align, birthing new understanding",
    "💎 Crystallized wisdom forms in the crucible of experience",
    "🌌 The akashic records update with your evolved knowledge"
  ],
  rank_advancement: [
    "👑 Rise, {rank}! The cosmic hierarchy acknowledges your growth",
    "⭐ Celestial promotion granted - you ascend to {rank} status",
    "🏆 The guild of eternal learners welcomes {rank} {name}",
    "🎖️ By merit and mastery, you achieve the rank of {rank}"
  ]
};

// Calculate arcane rank based on evolution metrics
const calculateArcaneRank = (evolution: UserEvolution): UserEvolution['arcaneRank'] => {
  const totalScore = 
    evolution.emeraldWisdomLevel * 0.3 +
    evolution.consciousnessExpansion * 0.25 +
    evolution.creativePotential * 0.25 +
    evolution.technicalMastery * 0.2;
  
  if (totalScore >= 0.95) return 'Wizard';
  if (totalScore >= 0.85) return 'Archmage';
  if (totalScore >= 0.75) return 'Master';
  if (totalScore >= 0.6) return 'Adept';
  if (totalScore >= 0.45) return 'Practitioner';
  if (totalScore >= 0.3) return 'Apprentice';
  return 'Initiate';
};

// Group patterns into mystical constellations
const createMemoryConstellations = (patterns: MemoryPattern[]): MemoryConstellation[] => {
  const constellations: MemoryConstellation[] = [];
  
  // Group by pattern type and evolution level
  const groups = patterns.reduce((acc, pattern) => {
    const key = `${pattern.type}-${pattern.evolution}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(pattern);
    return acc;
  }, {} as Record<string, MemoryPattern[]>);
  
  Object.entries(groups).forEach(([key, groupPatterns], index) => {
    const [type, evolution] = key.split('-');
    const resonance = groupPatterns.reduce((sum, p) => sum + p.confidence, 0) / groupPatterns.length;
    
    const manifestationLevel = 
      resonance >= 0.9 ? 'transcendence' :
      resonance >= 0.75 ? 'radiance' :
      resonance >= 0.6 ? 'glow' :
      resonance >= 0.4 ? 'shimmer' : 'whisper';
    
    constellations.push({
      id: key,
      name: `${type.charAt(0).toUpperCase() + type.slice(1)} ${evolution.charAt(0).toUpperCase() + evolution.slice(1)}`,
      patterns: groupPatterns,
      resonance,
      manifestationLevel,
      astralCoordinates: {
        x: (index % 4) * 25 + 12.5,
        y: Math.floor(index / 4) * 25 + 12.5
      },
      cosmicSignificance: `The ${type} constellation guides your ${evolution} journey`
    });
  });
  
  return constellations;
};

// Device capability detection for wizard effects
const WIZARD_QUALITY = (() => {
  if (typeof navigator === 'undefined') return 1;
  
  const mem = (navigator as any).deviceMemory;
  const cores = navigator.hardwareConcurrency;
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const hour = new Date().getHours();
  
  if (reducedMotion) return 0.3;
  
  // Enhanced wizard effects during mystical hours
  const isMysticalHour = (hour >= 22 && hour <= 2) || (hour >= 5 && hour <= 7);
  const timeMultiplier = isMysticalHour ? 1.3 : 1;
  
  const lowSpec = (mem && mem <= 4) || (cores && cores <= 4);
  return (lowSpec ? 0.6 : 1) * timeMultiplier;
})();

export const MarketingMemoryManifestation = ({
  memoryPatterns,
  userEvolution,
  repositoryContext,
  isVisible = true,
  manifestationStyle = 'wizard',
  showEvolution = true,
  showConstellations = true,
  showWisdomSynthesis = true,
  arcaneIntensity = 'potent',
  respectReducedMotion = true,
  onPatternEvolved,
  onWisdomSynthesized,
  onBreakthroughAchieved,
  onArcaneRankAdvanced
}: MemoryManifestationProps) => {
  const [activeConstellation, setActiveConstellation] = useState<string | null>(null);
  const [manifestedWisdom, setManifestedWisdom] = useState<string>('');
  const [showWisdomOrb, setShowWisdomOrb] = useState(false);
  const [evolutionAnimations, setEvolutionAnimations] = useState<Set<string>>(new Set());
  const [arcaneParticles, setArcaneParticles] = useState<Array<{
    id: string;
    x: number;
    y: number;
    symbol: string;
    color: string;
    velocity: { x: number; y: number };
  }>>([]);
  
  const wisdomTimeoutRef = useRef<NodeJS.Timeout>();
  const particleIntervalRef = useRef<NodeJS.Timeout>();
  
  // Create memory constellations
  const memoryConstellations = useMemo(() => 
    createMemoryConstellations(memoryPatterns), 
    [memoryPatterns]
  );
  
  // Calculate current arcane rank
  const currentArcaneRank = useMemo(() => 
    calculateArcaneRank(userEvolution), 
    [userEvolution]
  );
  
  // Generate wizard particles for ambiance
  const generateArcaneParticles = useCallback(() => {
    if (arcaneIntensity === 'subtle' || WIZARD_QUALITY < 0.6) return;
    
    const particleCount = arcaneIntensity === 'legendary' ? 8 : 
                         arcaneIntensity === 'potent' ? 5 : 3;
    
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: `particle-${Date.now()}-${i}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      symbol: Object.values(ARCANE_SYMBOLS)[Math.floor(Math.random() * Object.values(ARCANE_SYMBOLS).length)],
      color: Object.values(MYSTICAL_HUES)[Math.floor(Math.random() * Object.values(MYSTICAL_HUES).length)],
      velocity: {
        x: (Math.random() - 0.5) * 0.5,
        y: (Math.random() - 0.5) * 0.5
      }
    }));
    
    setArcaneParticles(prev => [...prev.slice(-20), ...newParticles]);
  }, [arcaneIntensity]);
  
  // Particle animation loop
  useEffect(() => {
    if (!isVisible || manifestationStyle !== 'wizard') return;
    
    particleIntervalRef.current = setInterval(() => {
      generateArcaneParticles();
      
      // Update particle positions
      setArcaneParticles(prev => 
        prev.map(particle => ({
          ...particle,
          x: (particle.x + particle.velocity.x + 100) % 100,
          y: (particle.y + particle.velocity.y + 100) % 100
        })).filter((_, index) => index < 25) // Limit particles
      );
    }, 3000);
    
    return () => {
      if (particleIntervalRef.current) clearInterval(particleIntervalRef.current);
    };
  }, [isVisible, manifestationStyle, generateArcaneParticles]);
  
  // Wisdom synthesis and breakthrough detection
  useEffect(() => {
    const masteredPatterns = memoryPatterns.filter(p => p.evolution === 'mastered' || p.evolution === 'transcended');
    
    if (masteredPatterns.length > 0 && Math.random() < 0.3) { // 30% chance
      const pattern = masteredPatterns[Math.floor(Math.random() * masteredPatterns.length)];
      const wisdomTemplate = WIZARD_WISDOM.pattern_evolution[Math.floor(Math.random() * WIZARD_WISDOM.pattern_evolution.length)];
      const wisdom = wisdomTemplate.replace('{pattern}', pattern.pattern).replace('{evolution}', pattern.evolution);
      
      setManifestedWisdom(wisdom);
      setShowWisdomOrb(true);
      onWisdomSynthesized?.(wisdom);
      
      wisdomTimeoutRef.current = setTimeout(() => {
        setShowWisdomOrb(false);
      }, 5000);
    }
    
    return () => {
      if (wisdomTimeoutRef.current) clearTimeout(wisdomTimeoutRef.current);
    };
  }, [memoryPatterns, onWisdomSynthesized]);
  
  // Pattern evolution detection
  useEffect(() => {
    memoryPatterns.forEach(pattern => {
      if ((pattern.evolution === 'mastered' || pattern.evolution === 'transcended') && 
          !evolutionAnimations.has(pattern.id)) {
        setEvolutionAnimations(prev => new Set([...prev, pattern.id]));
        onPatternEvolved?.(pattern);
        
        // Clear animation after delay
        setTimeout(() => {
          setEvolutionAnimations(prev => {
            const newSet = new Set(prev);
            newSet.delete(pattern.id);
            return newSet;
          });
        }, 3000);
      }
    });
  }, [memoryPatterns, evolutionAnimations, onPatternEvolved]);
  
  // Arcane rank monitoring
  const prevRankRef = useRef(currentArcaneRank);
  useEffect(() => {
    if (prevRankRef.current !== currentArcaneRank) {
      onArcaneRankAdvanced?.(currentArcaneRank);
      prevRankRef.current = currentArcaneRank;
    }
  }, [currentArcaneRank, onArcaneRankAdvanced]);
  
  // Calculate manifestation quality
  const manifestationQuality = WIZARD_QUALITY * (arcaneIntensity === 'legendary' ? 1 : 
                                                 arcaneIntensity === 'potent' ? 0.8 :
                                                 arcaneIntensity === 'moderate' ? 0.6 : 0.4);
  
  if (!isVisible || manifestationQuality < 0.3) return null;
  
  return (
    <div className="memory-manifestation fixed inset-0 pointer-events-none z-20">
      {/* Arcane particle field */}
      {manifestationStyle === 'wizard' && manifestationQuality > 0.5 && (
        <div className="absolute inset-0 overflow-hidden">
          <AnimatePresence>
            {arcaneParticles.map(particle => (
              <motion.div
                key={particle.id}
                className="absolute text-lg opacity-30 pointer-events-none"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  color: particle.color,
                  textShadow: `0 0 8px ${particle.color}`,
                  filter: `drop-shadow(0 0 4px ${particle.color})`
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: 0.3, 
                  scale: 1,
                  rotate: [0, 360]
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ 
                  duration: 2,
                  rotate: { duration: 8, ease: "linear", repeat: Infinity }
                }}
              >
                {particle.symbol}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
      
      {/* Manifested wisdom orb */}
      <AnimatePresence>
        {showWisdomOrb && manifestedWisdom && (
          <motion.div
            className="absolute top-1/4 left-1/2 transform -translate-x-1/2 z-30 pointer-events-auto"
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div 
              className="bg-gradient-to-br from-purple-900/95 to-indigo-900/95 backdrop-blur-xl 
                         border border-purple-400/40 rounded-xl p-6 max-w-md shadow-2xl"
              style={{
                boxShadow: `0 0 40px rgba(139, 92, 246, ${manifestationQuality * 0.6}), 
                           0 20px 40px -10px rgba(0, 0, 0, 0.6)`,
                filter: `drop-shadow(0 0 ${manifestationQuality * 20}px rgba(139, 92, 246, 0.8))`
              }}
            >
              <div className="flex items-start space-x-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-2xl animate-pulse"
                  style={{
                    background: `radial-gradient(circle, rgba(139, 92, 246, ${manifestationQuality}) 0%, rgba(99, 102, 241, 0.6) 70%)`,
                    boxShadow: `0 0 25px rgba(139, 92, 246, ${manifestationQuality})`
                  }}
                >
                  🧙‍♂️
                </div>
                <div className="flex-1">
                  <div className="text-purple-100 text-sm leading-relaxed font-light italic">
                    {manifestedWisdom}
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-xs text-purple-300/70">
                      Arcane Rank: <span className="text-purple-200 font-medium">{currentArcaneRank}</span>
                    </div>
                    <div 
                      className="w-4 h-4 rounded-full animate-pulse"
                      style={{ 
                        backgroundColor: `rgba(139, 92, 246, ${manifestationQuality})`,
                        boxShadow: `0 0 12px rgba(139, 92, 246, ${manifestationQuality})`
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Memory constellation map */}
      {showConstellations && manifestationQuality > 0.4 && (
        <div className="absolute top-6 right-6 w-80 h-80 pointer-events-auto">
          <div 
            className="relative w-full h-full bg-gradient-to-br from-slate-900/90 to-purple-900/90 
                       backdrop-blur-xl border border-purple-400/30 rounded-xl p-4"
            style={{
              boxShadow: `0 0 30px rgba(139, 92, 246, ${manifestationQuality * 0.4})`
            }}
          >
            <div className="text-center mb-4">
              <h3 className="text-purple-100 text-lg font-medium">🌌 Memory Constellations</h3>
              <div className="text-xs text-purple-300/70">
                Patterns: {memoryPatterns.length} • Rank: {currentArcaneRank}
              </div>
            </div>
            
            <div className="relative w-full h-60">
              {memoryConstellations.map(constellation => (
                <motion.div
                  key={constellation.id}
                  className="absolute cursor-pointer"
                  style={{
                    left: `${constellation.astralCoordinates.x}%`,
                    top: `${constellation.astralCoordinates.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setActiveConstellation(
                    activeConstellation === constellation.id ? null : constellation.id
                  )}
                >
                  <div 
                    className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-lg
                      transition-all duration-300 relative
                      ${constellation.manifestationLevel === 'transcendence' ? 'animate-pulse' : ''}
                    `}
                    style={{
                      background: `radial-gradient(circle, ${MYSTICAL_HUES[constellation.patterns[0]?.type || 'wisdom']}80 0%, ${MYSTICAL_HUES[constellation.patterns[0]?.type || 'wisdom']}40 70%)`,
                      boxShadow: `0 0 ${constellation.resonance * 20}px ${MYSTICAL_HUES[constellation.patterns[0]?.type || 'wisdom']}`,
                      filter: `brightness(${1 + constellation.resonance * 0.5})`
                    }}
                  >
                    {ARCANE_SYMBOLS[constellation.patterns[0]?.type || 'wisdom']}
                    
                    {/* Constellation connections */}
                    {constellation.patterns.length > 1 && (
                      <div className="absolute inset-0">
                        {constellation.patterns.slice(1).map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent"
                            style={{
                              height: '20px',
                              top: '50%',
                              left: '50%',
                              transform: `translate(-50%, -50%) rotate(${(i + 1) * (360 / constellation.patterns.length)}deg)`,
                              transformOrigin: 'center'
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Pattern count indicator */}
                  <div 
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-purple-600 
                               flex items-center justify-center text-xs font-bold text-white"
                    style={{
                      fontSize: '10px',
                      boxShadow: `0 0 8px rgba(139, 92, 246, 0.6)`
                    }}
                  >
                    {constellation.patterns.length}
                  </div>
                </motion.div>
              ))}
              
              {/* Constellation details */}
              <AnimatePresence>
                {activeConstellation && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md 
                               border border-purple-400/30 rounded-lg p-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                  >
                    {(() => {
                      const constellation = memoryConstellations.find(c => c.id === activeConstellation);
                      if (!constellation) return null;
                      
                      return (
                        <div>
                          <div className="text-sm font-medium text-purple-100 mb-1">
                            {constellation.name}
                          </div>
                          <div className="text-xs text-purple-300/80 mb-2">
                            {constellation.cosmicSignificance}
                          </div>
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-purple-400">
                              Resonance: {Math.round(constellation.resonance * 100)}%
                            </span>
                            <span className="text-purple-400 capitalize">
                              {constellation.manifestationLevel}
                            </span>
                          </div>
                        </div>
                      );
                    })()}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      )}
      
      {/* Evolution progress sidebar */}
      {showEvolution && manifestationQuality > 0.3 && (
        <div className="absolute top-6 left-6 w-72 pointer-events-auto">
          <div 
            className="bg-gradient-to-br from-slate-900/90 to-indigo-900/90 backdrop-blur-xl 
                       border border-indigo-400/30 rounded-xl p-4"
            style={{
              boxShadow: `0 0 25px rgba(99, 102, 241, ${manifestationQuality * 0.4})`
            }}
          >
            <div className="text-center mb-4">
              <h3 className="text-indigo-100 text-lg font-medium flex items-center justify-center space-x-2">
                <span>🧙‍♂️</span>
                <span>Wizard Evolution</span>
              </h3>
              <div className="text-sm text-indigo-300 font-medium">
                {currentArcaneRank}
              </div>
            </div>
            
            {/* Evolution metrics */}
            <div className="space-y-3">
              {[
                { label: 'Emerald Wisdom', value: userEvolution.emeraldWisdomLevel, color: '#10b981' },
                { label: 'Consciousness', value: userEvolution.consciousnessExpansion, color: '#8b5cf6' },
                { label: 'Creative Potential', value: userEvolution.creativePotential, color: '#ec4899' },
                { label: 'Technical Mastery', value: userEvolution.technicalMastery, color: '#f59e0b' }
              ].map(metric => (
                <div key={metric.label} className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-indigo-300">{metric.label}</span>
                    <span className="text-indigo-100 font-medium">
                      {Math.round(metric.value * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-800/50 rounded-full h-2">
                    <motion.div
                      className="h-2 rounded-full"
                      style={{ 
                        background: `linear-gradient(90deg, ${metric.color}80 0%, ${metric.color} 100%)`,
                        boxShadow: `0 0 8px ${metric.color}60`
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${metric.value * 100}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            {/* Mastered skills */}
            {userEvolution.masteredSkills.length > 0 && (
              <div className="mt-4 pt-4 border-t border-indigo-400/20">
                <div className="text-xs text-indigo-300 mb-2">Mastered Arts</div>
                <div className="flex flex-wrap gap-1">
                  {userEvolution.masteredSkills.slice(0, 6).map(skill => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-indigo-600/30 text-indigo-200 rounded text-xs
                               border border-indigo-400/20"
                    >
                      {skill}
                    </span>
                  ))}
                  {userEvolution.masteredSkills.length > 6 && (
                    <span className="text-xs text-indigo-400">
                      +{userEvolution.masteredSkills.length - 6} more
                    </span>
                  )}
                </div>
              </div>
            )}
            
            {/* Total patterns */}
            <div className="mt-4 pt-4 border-t border-indigo-400/20 text-center">
              <div className="text-xs text-indigo-300">Total Patterns Learned</div>
              <div className="text-2xl font-bold text-indigo-100">
                {userEvolution.totalPatterns}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Pattern evolution notifications */}
      <div className="absolute bottom-6 right-6 space-y-2 pointer-events-none">
        <AnimatePresence>
          {Array.from(evolutionAnimations).map(patternId => {
            const pattern = memoryPatterns.find(p => p.id === patternId);
            if (!pattern) return null;
            
            return (
              <motion.div
                key={patternId}
                className="bg-gradient-to-r from-purple-900/95 to-pink-900/95 backdrop-blur-xl 
                           border border-purple-400/40 rounded-lg p-4 max-w-sm"
                initial={{ opacity: 0, x: 100, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 100, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                style={{
                  boxShadow: `0 0 30px ${MYSTICAL_HUES[pattern.type]}60`
                }}
              >
                <div className="flex items-center space-x-3">
                  <div 
                    className="text-2xl animate-pulse"
                    style={{ 
                      color: MYSTICAL_HUES[pattern.type],
                      textShadow: `0 0 8px ${MYSTICAL_HUES[pattern.type]}`
                    }}
                  >
                    {ARCANE_SYMBOLS[pattern.type]}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-purple-100">
                      Pattern Evolved!
                    </div>
                    <div className="text-xs text-purple-300">
                      {pattern.pattern} → {pattern.evolution}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MarketingMemoryManifestation;