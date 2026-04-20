'use client';

import { useState, useEffect, useRef, useMemo, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QuantumOrb, { QuantumOrbState } from '@/components/base/bitcode/effects/quantum-orb/QuantumOrb';
import { QuantumOrbConfig } from '@/components/base/bitcode/effects/quantum-orb/QuantumOrbConfig';

interface RepositoryContext {
  language?: string;
  architecture?: string;
  testCoverage?: number;
  componentCount?: number;
  codeStyle?: string;
  frameworks?: string[];
  designPatterns?: string[];
  recentActivity?: {
    commits: number;
    pullRequests: number;
    issues: number;
  };
}

interface ConversationContext {
  messageCount: number;
  topics: string[];
  recentPatterns: string[];
  userStyle: 'detailed' | 'concise' | 'technical';
  satisfactionScore: number; // 0-1
}

interface ConsciousOrbState extends QuantumOrbState {
  consciousness: 'dormant' | 'awakening' | 'aware' | 'engaged' | 'enlightened';
  repositoryFamiliarity: number; // 0-1
  userPatternConfidence: number; // 0-1
  currentTask?: 'listening' | 'thinking' | 'responding' | 'learning' | 'creating';
  emotionalState: 'neutral' | 'curious' | 'excited' | 'focused' | 'satisfied';
}

interface ConsciousConversationsOrbProps {
  /** Core orb functionality */
  size?: number;
  onClick?: () => void;
  className?: string;
  
  /** Consciousness layer */
  repositoryContext?: RepositoryContext;
  conversationHistory?: ConversationContext;
  isProcessing?: boolean;
  currentMode?: 'chat' | 'deliverable' | 'measure';
  
  /** Learning and adaptation */
  userInteractionPattern?: {
    preferredResponseLength: 'short' | 'medium' | 'long';
    topicsOfInterest: string[];
    timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
    workflowPattern: 'sprint' | 'exploration' | 'maintenance';
  };
  
  /** Visual enhancement controls */
  showAwakeningSequence?: boolean;
  showRepositoryWhispers?: boolean;
  showConsciousnessIndicators?: boolean;
  intensityLevel?: 'subtle' | 'moderate' | 'enhanced';
  
  /** Callbacks */
  onConsciousnessChange?: (state: ConsciousOrbState) => void;
  onRepositoryWhisper?: (message: string) => void;
  onEmotionalStateChange?: (emotion: string) => void;
}

// Device capability detection for consciousness effects
const CONSCIOUSNESS_QUALITY = (() => {
  if (typeof navigator === 'undefined') return 1;
  
  const mem = (navigator as any).deviceMemory;
  const cores = navigator.hardwareConcurrency;
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  
  if (reducedMotion) return 0;
  
  const lowSpec = (mem && mem <= 4) || (cores && cores <= 4);
  return lowSpec ? 0.6 : 1;
})();

export const ConsciousConversationsOrb = ({
  size = 120,
  onClick,
  className = '',
  repositoryContext,
  conversationHistory,
  isProcessing = false,
  currentMode = 'chat',
  userInteractionPattern,
  showAwakeningSequence = true,
  showRepositoryWhispers = true,
  showConsciousnessIndicators = true,
  intensityLevel = 'enhanced',
  onConsciousnessChange,
  onRepositoryWhisper,
  onEmotionalStateChange,
}: ConsciousConversationOrbProps) => {
  const [consciousState, setConsciousState] = useState<ConsciousOrbState>({
    consciousness: 'dormant',
    repositoryFamiliarity: 0,
    userPatternConfidence: 0,
    emotionalState: 'neutral',
  });
  
  const [showWhisper, setShowWhisper] = useState(false);
  const [whisperMessage, setWhisperMessage] = useState('');
  const [showConsciousnessRings, setShowConsciousnessRings] = useState(false);
  const awakeningTimeoutRef = useRef<NodeJS.Timeout>();
  const whisperTimeoutRef = useRef<NodeJS.Timeout>();
  
  // Calculate consciousness level based on context
  const consciousnessLevel = useMemo(() => {
    let level = 0;
    
    // Repository familiarity contributes to consciousness
    if (repositoryContext) {
      if (repositoryContext.language) level += 0.2;
      if (repositoryContext.architecture) level += 0.2;
      if (repositoryContext.testCoverage && repositoryContext.testCoverage > 80) level += 0.1;
      if (repositoryContext.componentCount && repositoryContext.componentCount > 50) level += 0.1;
    }
    
    // Conversation depth contributes to consciousness
    if (conversationHistory) {
      level += Math.min(conversationHistory.messageCount / 20, 0.3);
      if (conversationHistory.satisfactionScore > 0.8) level += 0.1;
    }
    
    return Math.min(level, 1.0);
  }, [repositoryContext, conversationHistory]);
  
  // Determine consciousness state based on level
  const determinConsciousnessState = useCallback((level: number): ConsciousOrbState['consciousness'] => {
    if (level < 0.2) return 'dormant';
    if (level < 0.4) return 'awakening';
    if (level < 0.6) return 'aware';
    if (level < 0.8) return 'engaged';
    return 'enlightened';
  }, []);
  
  // Awakening sequence
  useEffect(() => {
    if (!showAwakeningSequence || !repositoryContext) return;
    
    const newConsciousness = determinConsciousnessState(consciousnessLevel);
    
    if (consciousState.consciousness === 'dormant' && newConsciousness !== 'dormant') {
      // Start awakening sequence
      setConsciousState(prev => ({
        ...prev,
        consciousness: 'awakening',
        currentTask: 'learning'
      }));
      
      // Repository whisper after awakening
      if (showRepositoryWhispers && repositoryContext.language) {
        awakeningTimeoutRef.current = setTimeout(() => {
          const messages = [
            `I see a ${repositoryContext.language} codebase...`,
            `Analyzing your ${repositoryContext.architecture || 'architecture'} patterns...`,
            `${repositoryContext.componentCount || 'Many'} components, ${repositoryContext.testCoverage || 85}% test coverage...`,
            'Understanding your development style...',
            'Ready to collaborate!'
          ];
          
          let messageIndex = 0;
          const showNextMessage = () => {
            if (messageIndex < messages.length) {
              setWhisperMessage(messages[messageIndex]);
              setShowWhisper(true);
              onRepositoryWhisper?.(messages[messageIndex]);
              
              whisperTimeoutRef.current = setTimeout(() => {
                setShowWhisper(false);
                messageIndex++;
                if (messageIndex < messages.length) {
                  setTimeout(showNextMessage, 800);
                } else {
                  // Complete awakening
                  setConsciousState(prev => ({
                    ...prev,
                    consciousness: newConsciousness,
                    repositoryFamiliarity: consciousnessLevel,
                    userPatternConfidence: conversationHistory?.satisfactionScore || 0.5,
                    currentTask: undefined,
                    emotionalState: 'curious'
                  }));
                }
              }, 2000);
            }
          };
          
          showNextMessage();
        }, 1000);
      } else {
        // Skip whispers, go straight to conscious
        setTimeout(() => {
          setConsciousState(prev => ({
            ...prev,
            consciousness: newConsciousness,
            repositoryFamiliarity: consciousnessLevel,
            userPatternConfidence: conversationHistory?.satisfactionScore || 0.5,
          }));
        }, 2000);
      }
    } else {
      // Update consciousness without awakening sequence
      setConsciousState(prev => ({
        ...prev,
        consciousness: newConsciousness,
        repositoryFamiliarity: consciousnessLevel,
        userPatternConfidence: conversationHistory?.satisfactionScore || 0.5,
      }));
    }
    
    return () => {
      if (awakeningTimeoutRef.current) clearTimeout(awakeningTimeoutRef.current);
      if (whisperTimeoutRef.current) clearTimeout(whisperTimeoutRef.current);
    };
  }, [
    repositoryContext, 
    consciousnessLevel, 
    determinConsciousnessState, 
    conversationHistory,
    showAwakeningSequence,
    showRepositoryWhispers
  ]);
  
  // Processing state effects
  useEffect(() => {
    if (isProcessing) {
      setConsciousState(prev => ({
        ...prev,
        currentTask: 'thinking',
        emotionalState: 'focused'
      }));
      setShowConsciousnessRings(true);
    } else {
      setConsciousState(prev => ({
        ...prev,
        currentTask: undefined,
        emotionalState: prev.emotionalState === 'focused' ? 'satisfied' : prev.emotionalState
      }));
      setShowConsciousnessRings(false);
    }
  }, [isProcessing]);
  
  // Notify parent of consciousness changes
  useEffect(() => {
    onConsciousnessChange?.(consciousState);
  }, [consciousState, onConsciousnessChange]);
  
  useEffect(() => {
    onEmotionalStateChange?.(consciousState.emotionalState);
  }, [consciousState.emotionalState, onEmotionalStateChange]);
  
  // Generate dynamic orb configuration based on consciousness
  const consciousOrbConfig = useMemo((): Partial<QuantumOrbConfig> => {
    const baseConfig: Partial<QuantumOrbConfig> = {
      glowColor: '#67feb7',
      particleColor: '#ffffff',
      backgroundColors: ['#67feb7', '#4ade80', '#0f766e'],
      coreGlowIntensity: 1.0,
      speed: 60,
    };
    
    switch (consciousState.consciousness) {
      case 'dormant':
        return {
          ...baseConfig,
          glowColor: '#4b5563', // gray
          coreGlowIntensity: 0.3,
          speed: 30,
        };
      
      case 'awakening':
        return {
          ...baseConfig,
          glowColor: '#a78bfa', // purple - awakening
          backgroundColors: ['#a78bfa', '#8b5cf6', '#7c3aed'],
          coreGlowIntensity: 0.7,
          speed: 45,
        };
      
      case 'aware':
        return {
          ...baseConfig,
          glowColor: '#34d399', // emerald - aware
          coreGlowIntensity: 0.9,
          speed: 55,
        };
      
      case 'engaged':
        return {
          ...baseConfig,
          glowColor: '#67feb7', // brand emerald - engaged
          coreGlowIntensity: 1.2,
          speed: 70,
        };
      
      case 'enlightened':
        return {
          ...baseConfig,
          glowColor: '#f59e0b', // gold - enlightened
          backgroundColors: ['#f59e0b', '#d97706', '#b45309'],
          particleColor: '#fbbf24',
          coreGlowIntensity: 1.5,
          speed: 80,
        };
    }
  }, [consciousState.consciousness]);
  
  // Determine orb visual state
  const orbVisualState: QuantumOrbState = useMemo(() => {
    if (isProcessing) return 'active';
    if (consciousState.consciousness === 'dormant') return 'rest';
    if (consciousState.consciousness === 'awakening') return 'hover';
    return 'active';
  }, [isProcessing, consciousState.consciousness]);
  
  return (
    <div className={`conscious-conversations-orb relative ${className}`}>
      {/* Main quantum orb with consciousness */}
      <QuantumOrb
        size={size}
        config={consciousOrbConfig}
        initialState={orbVisualState}
        onClick={onClick}
        respectReducedMotion={true}
        interactive={!isProcessing}
        className="conscious-orb-main"
      />
      
      {/* Consciousness indicators */}
      {showConsciousnessIndicators && CONSCIOUSNESS_QUALITY > 0 && (
        <>
          {/* Repository familiarity ring */}
          {consciousState.repositoryFamiliarity > 0.1 && (
            <div className="absolute inset-0 pointer-events-none">
              <svg
                className="w-full h-full opacity-60"
                viewBox="0 0 120 120"
                style={{ transform: 'rotate(-90deg)' }}
              >
                <circle
                  cx="60"
                  cy="60"
                  r="55"
                  fill="none"
                  stroke="rgba(103, 254, 183, 0.3)"
                  strokeWidth="1"
                  strokeDasharray="345.58"
                  strokeDashoffset={345.58 * (1 - consciousState.repositoryFamiliarity)}
                  className="transition-all duration-2000 ease-out"
                />
              </svg>
            </div>
          )}
          
          {/* User pattern confidence ring */}
          {consciousState.userPatternConfidence > 0.1 && (
            <div className="absolute inset-[-5px] pointer-events-none">
              <svg
                className="w-full h-full opacity-40"
                viewBox="0 0 130 130"
                style={{ transform: 'rotate(-90deg)' }}
              >
                <circle
                  cx="65"
                  cy="65"
                  r="60"
                  fill="none"
                  stroke="rgba(168, 139, 250, 0.5)"
                  strokeWidth="1"
                  strokeDasharray="377"
                  strokeDashoffset={377 * (1 - consciousState.userPatternConfidence)}
                  className="transition-all duration-3000 ease-out"
                />
              </svg>
            </div>
          )}
          
          {/* Consciousness rings during processing */}
          <AnimatePresence>
            {showConsciousnessRings && intensityLevel === 'enhanced' && (
              <motion.div
                className="absolute inset-[-10px] pointer-events-none"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }}
                transition={{ duration: 0.5 }}
              >
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute inset-0 rounded-full border border-ai-thinking/20"
                    style={{
                      animation: `consciousness-pulse ${2 + i * 0.5}s ease-in-out infinite`,
                      animationDelay: `${i * 0.3}s`,
                      transform: `scale(${1 + i * 0.1})`,
                    }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
      
      {/* Repository whisper */}
      <AnimatePresence>
        {showWhisper && whisperMessage && (
          <motion.div
            className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-20"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="bg-brand-cosmic-light/95 backdrop-blur-md border border-ai-consciousness-awakening/40 
                           rounded-lg px-4 py-2 shadow-xl max-w-xs text-center">
              <div className="text-sm text-ai-consciousness-awakening font-light italic">
                {whisperMessage}
              </div>
              
              {/* Whisper arrow */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                <div className="w-2 h-2 bg-brand-cosmic-light border-r border-b 
                               border-ai-consciousness-awakening/40 transform rotate-45" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Current task indicator */}
      {consciousState.currentTask && intensityLevel !== 'subtle' && (
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="text-xs text-gray-400 text-center">
            <span className="capitalize">{consciousState.currentTask}</span>
            {consciousState.currentTask === 'thinking' && (
              <span className="ml-1 animate-pulse">●●●</span>
            )}
          </div>
        </div>
      )}
      
      {/* Consciousness level indicator */}
      {intensityLevel === 'enhanced' && consciousState.consciousness !== 'dormant' && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
          <div className="text-xs text-center">
            <div className={`
              px-2 py-1 rounded-full border text-xs font-medium
              ${consciousState.consciousness === 'enlightened' ? 
                'bg-ai-celebration-gold/20 text-ai-celebration-gold border-ai-celebration-gold/40' :
                consciousState.consciousness === 'engaged' ?
                'bg-brand-emerald/20 text-brand-emerald border-brand-emerald/40' :
                'bg-ai-consciousness-awakening/20 text-ai-consciousness-awakening border-ai-consciousness-awakening/40'
              }
            `}>
              {consciousState.consciousness === 'enlightened' && '✨ '}
              <span className="capitalize">{consciousState.consciousness}</span>
              {consciousState.consciousness === 'enlightened' && ' ⭐'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Memoize the component with custom comparison for performance
export default memo(ConsciousConversationOrb, (prevProps, nextProps) => {
  // Only re-render if critical props change
  return (
    prevProps.isProcessing === nextProps.isProcessing &&
    prevProps.executionPhase === nextProps.executionPhase &&
    prevProps.repositoryContext?.language === nextProps.repositoryContext?.language &&
    prevProps.repositoryContext?.componentCount === nextProps.repositoryContext?.componentCount &&
    prevProps.conversationContext?.messageCount === nextProps.conversationContext?.messageCount &&
    prevProps.intensityLevel === nextProps.intensityLevel
  );
});
