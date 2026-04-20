'use client';

/**
 * Conversations Overlay - Bitcode production surface
 * 
 * A sophisticated conversation interface with:
 * - Multiple view modes (floating, sidebar, fullscreen, split-screen)
 * - Rich text input with tokens and attachments
 * - Real-time SSE streaming for messages and pipeline events
 * - Embedded process logs with live updates
 * - Keyboard shortcuts for power users
 * - Smooth animations and transitions
 * 
 * This is the refactored version maintaining 100% feature parity
 * with zero visual regressions.
 */

import React, {
  useState,
  useRef,
  useEffect,
  memo,
  useCallback,
  useMemo,
  startTransition,
} from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { 
  ReloadIcon, 
  EnterFullScreenIcon, 
  Cross2Icon, 
  ExitFullScreenIcon, 
  PlusIcon, 
  MixerHorizontalIcon, 
  DownloadIcon, 
  CopyIcon, 
  CodeIcon, 
  FileTextIcon, 
  ChatBubbleIcon, 
  MagnifyingGlassIcon 
} from "@radix-ui/react-icons";

// Styles
import '@/styles/conversations.css';
import '@/styles/conversations-fullscreen.css';
import '@/styles/conversations-button-fix.css';
import '@/styles/conversations/process-log-integration.css';

// Custom hooks
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { useChatState } from './hooks/useChatState';
import { useSSEConnection, createReconnectingEventSource } from './hooks/useSSEConnection';
import { usePipelineState } from './hooks/usePipelineState';

// Components
import SidebarTitleBar from '@/components/base/engi/layout/sidebars/SidebarTitleBar';
import FlipText from '@/components/base/engi/layout/sidebars/FlipText';
import ConversationsChat from './ConversationsChat';
import ConversationsGitHubSourceSelector from './ConversationsGitHubSourceSelector';
import SourceDivider from './ConversationsSourceDivider';
import { FullscreenControls } from './ConversationsFullscreenControls';
import { BranchMenuButton } from './ConversationsBranchMenuButton';
import { SplitGrid } from './ConversationsSplitGrid';
import { ChatHistorySidebar } from './ConversationsChatHistorySidebar';
import { ThinkingLog } from './ConversationsThinkingLog';
import { FloatingOrb } from './ConversationsFloatingOrb';
import FullscreenPortal from './ConversationsFullscreenPortal';
import BitcodeExecutionStreamPanel from '@/components/base/engi/execution/BitcodeExecutionStreamPanel';
import { ExecutionDetailsView } from '@/app/executions/components/ExecutionsDetailsView';
// NOTE: Avoid wrapping the Big‑O container in GPUAcceleration because
// transform on an ancestor breaks position: sticky on header/input.

// Data hooks
import { useConversationPages } from '@/hooks/useConversationPages';
import { useConversationStream, StreamToken } from '@/hooks/useConversationStream';

// Backend types from generics packages
import type { 
  Conversation as DBConversation, 
  ConversationsMessage as DBMessage
} from '@bitcode/conversations-generics';

// UI types from local hooks - these intentionally differ from DB types
// The UI uses 'type' instead of 'role' and 'agent' instead of 'assistant'
// This allows for UI-specific features like dividers
import type { Chat, ChatMessage } from './hooks/useChatState';

// Import sidebar classes separately to avoid conflicts
const sidebarBase = '';
const sidebarBg = '';
const sidebarBorderColor = '';
const sidebarRight = '';
const sidebarW28 = '';
const sidebarShadowRight = '';


// Dynamically import QuantumOrb for better performance
const QuantumOrb = dynamic(() => import('@/components/base/engi/effects/quantum-orb').then(mod => ({ default: mod.QuantumOrb })), {
  ssr: false,
  loading: () => null
});

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

// Feature flags
const ENABLE_SPLIT_VIEW = true;

// Track entrance animation (module scope to persist across hot reloads)
let didPlayEntrance = false;

// Layout constants
const SIDEBAR_WIDTH_REM = 19;
const ORB_GAP_REM = 8;

// Throttle helper
function throttle<T extends (...args: any[]) => void>(fn: T, wait = 60): T {
  let last = 0;
  let timer: ReturnType<typeof setTimeout> | null = null;
  // @ts-ignore
  return function throttled(this: any, ...args: Parameters<T>) {
    const now = Date.now();
    if (now - last >= wait) {
      last = now;
      fn.apply(this, args);
    } else if (!timer) {
      timer = setTimeout(() => {
        last = Date.now();
        timer = null;
        fn.apply(this, args);
      }, wait - (now - last));
    }
  } as T;
}

// ---------------------------------------------------------------------------
// Helper Functions
// ---------------------------------------------------------------------------

function getEntranceInitial(
  position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left',
) {
  const OFFSET = 64;
  const initial: Record<string, number> = {
    opacity: 0,
    scale: 0.6,
    rotate: -45,
  };

  if (position.includes('right')) initial.x = OFFSET;
  if (position.includes('left')) initial.x = -OFFSET;
  if (position.includes('bottom')) initial.y = OFFSET;
  if (position.includes('top')) initial.y = -OFFSET;

  return initial;
}

// Token rendering helper
function renderTokenInMessageHelper(content: string, tokens?: any[]): string {
  if (!tokens || tokens.length === 0) return content;
  
  let result = content;
  
  // Process pipeline tokens
  tokens.forEach(token => {
    const pipelineMatch = token.text?.match(/\[\[(deliverable|ai_document):([^\]]+)\]\]/);
    if (!pipelineMatch) return;
    
    const [fullMatch, kind, title] = pipelineMatch;
    const regex = new RegExp(`(^|\\s)${fullMatch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'g');
    
    const kindLabel = kind === 'deliverable' ? 'Deliverable' : 'AI Document';
    const status = token.metadata?.status || '';
    const sourceLine = token.metadata?.source ? 
      `<svg class="inline w-3 h-3 mr-1" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>${token.metadata.source}` 
      : '';
    
    const sourceChanged = token.metadata?.sourceChanged;
    
    const replacement = 
      ` <div class="inline-block align-middle mx-1 border border-gray-600 rounded-md bg-gray-800/50 overflow-hidden">` +
      `   <div class="px-2 pt-1 flex items-center gap-1.5 border-b border-gray-700">` +
      `     <span class="inline-block w-2 h-2 rounded-full ${kind === 'deliverable' ? 'bg-emerald-400' : 'bg-blue-400'}"></span>` +
      `     <span class="font-semibold text-gray-200">${title}</span>` +
      `   </div>` +
      `   <div class="px-2 text-gray-400 pb-1">${kindLabel}${status ? ' · ' + status : ''}</div>` +
      (sourceLine ? ` <div class="px-2 pb-2 text-[10px] text-gray-500 flex items-center gap-1">${sourceLine}${sourceChanged ? ' <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="10" height="10"><path fill="#fbbf24" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 15h-2v-2h2zm0-4h-2V7h2z"/></svg>' : ''}</div>` : '') +
      ` </div> `;
    
    result = result.replace(regex, (_match, before) => `${before}${replacement}`);
  });
  
  return result;
}

// ---------------------------------------------------------------------------
// Main Component Props
// ---------------------------------------------------------------------------

interface ConversationProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  size?: number;
  inSidebar?: boolean;
  isOpen?: boolean;
  forceOpen?: boolean;
  forceFullscreen?: boolean;
  onToggle?: () => void;
  onCloseRequest?: () => void;
  showFloatingOrb?: boolean;
}

// ---------------------------------------------------------------------------
// Conversations Overlay - The Excellence Continues
// ---------------------------------------------------------------------------

const Conversation = memo(function Conversation({
  position = 'bottom-right',
  size = 60,
  inSidebar = false,
  isOpen: isOpenProp,
  forceOpen,
  forceFullscreen = false,
  onToggle,
  onCloseRequest,
  showFloatingOrb = true,
}: ConversationProps) {
  // Core state
  const [isOpenInternal, setIsOpenInternal] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [splitScreenMode, setSplitScreenMode] = useState(false);
  
  // Determine actual open state
  const isControlledOpen = !inSidebar && typeof forceOpen === 'boolean';
  const isOpen = inSidebar ? (isOpenProp ?? false) : (isControlledOpen ? forceOpen : isOpenInternal);
  
  // Chat state management (using UI-specific types)
  const {
    chats,
    currentChat,
    showHistory,
    setChats,
    setCurrentChat,
    setShowHistory,
    createNewChat,
    deleteChat,
    addMessage,
    updateMessage,
    clearAllChats,
    markAsViewed
  } = useChatState();

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [processError, setProcessError] = useState<Error | null>(null);
  const [processLogOutputDetails, setProcessLogOutputDetails] = useState<any>({});
  
  // UI state
  const [userHasScrolled, setUserHasScrolled] = useState(false);
  const [processLogHasScrolled, setProcessLogHasScrolled] = useState(false);
  const [currentSource, setCurrentSource] = useState<any>({ repoSlug: '' });
  const [lastSource, setLastSource] = useState<any>(null);
  const [splitBoxes, setSplitBoxes] = useState<any[]>([]);
  const [activeSplitId, setActiveSplitId] = useState<string>('');
  const [embedProcessLogs, setEmbedProcessLogs] = useState(false);
  const [showThinkingLogs, setShowThinkingLogs] = useState(true);
  const [selectedRunDetailsId, setSelectedRunDetailsId] = useState<string | null>(null);
  const [lastInputForRetry, setLastInputForRetry] = useState<{message: string; tokens: StreamToken[]} | null>(null);
  
  // Refs
  const fullscreenRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const processLogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  // Track if entrance animation has played
  useEffect(() => {
    if (!didPlayEntrance && !inSidebar) {
      didPlayEntrance = false; // Reset for floating mode
    }
  }, [inSidebar]);

  useEffect(() => {
    if (inSidebar || !isControlledOpen) return;

    if (forceOpen) {
      setIsFullscreen(forceFullscreen);
      return;
    }

    setIsFullscreen(false);
    setSplitScreenMode(false);
    setSelectedRunDetailsId(null);
  }, [forceFullscreen, forceOpen, inSidebar, isControlledOpen]);

  // Handle embed process logs in sidebar mode
  useEffect(() => {
    if (inSidebar) {
      // Hide standalone processing-log panels in sidebar mode
      setShowThinkingLogs(false);
      setEmbedProcessLogs(false);
    }
  }, [inSidebar]);

  // Sync embed logs with split screen mode
  useEffect(() => {
    if (!splitScreenMode && embedProcessLogs) {
      setEmbedProcessLogs(false);
      setShowThinkingLogs(true);
    }
  }, [splitScreenMode, embedProcessLogs]);

  // Keyboard shortcuts
  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(prev => !prev);
  }, []);

  const toggleSplitScreen = useCallback(() => {
    if (!ENABLE_SPLIT_VIEW) return;
    setSplitScreenMode(prev => !prev);
  }, []);

  useKeyboardShortcuts({
    isOpen,
    isFullscreen,
    inSidebar,
    onToggle: inSidebar ? onToggle : () => setIsOpenInternal(false),
    onToggleFullscreen: toggleFullscreen,
    onToggleSplitScreen: toggleSplitScreen
  });

  // SSE Connection for streaming
  const conversationStream = useConversationStream({
    conversationId: currentChat?.id || '',
    onToken: (token) => {
      // Add token to current streaming message
      if (currentChat) {
        setCurrentChat(prev => {
          if (!prev) return prev;
          const messages = [...prev.messages];
          const lastMsg = messages[messages.length - 1];
          
          // UI uses 'agent' not 'assistant'
          if (lastMsg && lastMsg.type === 'agent' && lastMsg.status !== 'sent') {
            lastMsg.content = (lastMsg.content || '') + token;
            return { ...prev, messages };
          }
          return prev;
        });
      }
    },
    onPipelineTriggered: (runId, pipelineType) => {
      startPipelineRun(runId, pipelineType as 'deliverable' | 'measure');
      appendThinkingLog({
        type: 'success',
        content: `${pipelineType} pipeline started (${runId})`
      });
    },
    onPipelineEvent: (runId, event) => {
      handlePipelineEvent(runId, event);
    },
    onPipelineComplete: (runId, success, summary) => {
      completePipelineRun(runId, success, summary);
    },
    onError: (message, code) => {
      setProcessError(new Error(message));
      appendThinkingLog({
        type: 'error',
        content: message
      });
    },
    throttleMs: 50
  });

  // Pipeline state from hook
  const {
    runs,
    activeRunId,
    runLog,
    thinkingLog,
    executionState,
    generationCount,
    latestWorkUpdate,
    iterationUpdates,
    startPipelineRun,
    completePipelineRun,
    appendRunLog,
    appendThinkingLog,
    clearThinkingLog,
    handlePipelineEvent,
    clearRuns,
    resetExecutionState,
    setActiveRunId
  } = usePipelineState({
    onPipelineStart: (runId, type) => {
      setIsProcessing(true);
    },
    onPipelineComplete: (runId, success) => {
      setIsProcessing(false);
    }
  });

  // Handle sending messages
  const handleSendMessageCallback = useCallback(async (message: string, tokens: StreamToken[]) => {
    if (!message.trim() || !currentChat) return;
    
    setProcessError(null);
    setIsProcessing(true);
    setLastInputForRetry({ message, tokens }); // Store for retry

    // Add user message to chat (using UI types)
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',  // UI uses 'type' not 'role'
      content: message,
      status: 'sending',
      timestamp: new Date(),
      tokens
    };

    addMessage(newMsg);

    // Create agent message placeholder (UI uses 'agent' not 'assistant')
    const assistantMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      type: 'agent',  // UI uses 'agent' not 'assistant'
      content: '',
      status: 'sending',
      timestamp: new Date()
    };

    addMessage(assistantMsg);

    try {
      // Send via streaming API
      await conversationStream.sendMessage(message, tokens || []);
      
      // Mark user message as sent
      updateMessage(newMsg.id, { status: 'sent' });
    } catch (error) {
      setProcessError(error as Error);
      updateMessage(assistantMsg.id, { 
        status: 'error',
        content: 'Failed to send message. Please try again.'
      });
    } finally {
      setIsProcessing(false);
    }
  }, [currentChat, addMessage, updateMessage, conversationStream]);

  // Handle source changes
  const handleSourceChange = useCallback((source: any) => {
    setCurrentSource(source);
    setLastSource(source);
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (!userHasScrolled && chatContainerRef.current) {
      const scrollToBottom = throttle(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      });
      scrollToBottom();
    }
  }, [currentChat?.messages, userHasScrolled]);

  // Handle scroll events
  const handleScroll = useCallback(() => {
    if (!chatContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 100;
    setUserHasScrolled(!isAtBottom);
  }, []);

  // Handle closing
  const handleClose = useCallback(() => {
    if (inSidebar && onToggle) {
      onToggle();
    } else if (isControlledOpen && onCloseRequest) {
      onCloseRequest();
    } else {
      setIsOpenInternal(false);
    }
  }, [inSidebar, isControlledOpen, onCloseRequest, onToggle]);

  // Render token in message helper
  const renderTokenInMessage = useCallback((content: string, tokens?: any[]): string => {
    return renderTokenInMessageHelper(content, tokens);
  }, []);

  // Create split box helper
  const createSplitBox = useCallback((type: 'chat' | 'command' | 'source') => {
    const newBox = {
      id: `box-${Date.now()}`,
      type,
      width: 50,
      height: 100,
      x: splitBoxes.length * 10,
      y: splitBoxes.length * 10
    };
    setSplitBoxes(prev => [...prev, newBox]);
    setActiveSplitId(newBox.id);
  }, [splitBoxes]);

  // Handle retry after error
  const handleRetry = useCallback(() => {
    if (!lastInputForRetry) return;
    const { message, tokens } = lastInputForRetry;
    setProcessError(null);
    handleSendMessageCallback(message, tokens);
  }, [lastInputForRetry, handleSendMessageCallback]);

  // Handle dismiss error
  const handleDismissError = useCallback(() => {
    setProcessError(null);
  }, []);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      conversationStream.cleanup?.();
    };
  }, [conversationStream]);

  // Render main component
  if (!isOpen && !inSidebar) {
    if (!showFloatingOrb) {
      return null;
    }
    // Floating orb mode
    return (
      <FloatingOrb
        position={position}
        size={size}
        onClick={() => setIsOpenInternal(true)}
        didPlayEntrance={didPlayEntrance}
        onEntranceComplete={() => { didPlayEntrance = true; }}
      />
    );
  }

  // Full component render
  const activeRun = activeRunId ? runs.find(r => r.id === activeRunId) : null;
  const isRunComplete = activeRun ? activeRun.status !== 'running' : !isProcessing;
  const logError = processError?.message || null;

  const mainContent = (
    <>
      {/* Chat history sidebar */}
      {showHistory && (
        <ChatHistorySidebar
          chats={chats}
          currentChat={currentChat}
          onSelectChat={(chat) => {
            setCurrentChat(chat);
            setShowHistory(false);
          }}
          onCreateChat={createNewChat}
          onDeleteChat={deleteChat}
          onClose={() => setShowHistory(false)}
        />
      )}

      {/* Main chat interface */}
      <div className="conversations-container">
        {/* Header */}
        <div className="conversations-header">
          <SidebarTitleBar>
            <div className="flex items-center gap-2 w-full">
              <div className="flex-1 truncate font-medium">
                {currentChat?.title || 'New Conversation'}
              </div>
              <button className="fullscreen-button" title="Chat History" onClick={() => setShowHistory(!showHistory)}>
                <ChatBubbleIcon />
              </button>
              <button className="fullscreen-button" title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'} onClick={toggleFullscreen}>
                {isFullscreen ? <ExitFullScreenIcon /> : <EnterFullScreenIcon />}
              </button>
              <button className="fullscreen-button" title="Toggle Split View" onClick={toggleSplitScreen} disabled={!ENABLE_SPLIT_VIEW}>
                <MixerHorizontalIcon />
              </button>
              <BranchMenuButton
                onBranched={(c: any) => {
                  const newChat = { id: c.id, title: c.title || 'Branched Conversation', messages: [], runs: [] };
                  setChats(prev => [newChat, ...prev]);
                  setCurrentChat(newChat);
                  setShowHistory(false);
                }}
              />
              <button className="fullscreen-button" title="Close" onClick={handleClose}>
                <Cross2Icon />
              </button>
            </div>
          </SidebarTitleBar>
        </div>

        {/* Messages */}
        <ConversationsChat
          containerRef={chatContainerRef}
          messages={currentChat?.messages || []}
          onSend={handleSendMessageCallback}
          currentConversationId={currentChat?.id}
          disabled={isProcessing}
          placeholder={isProcessing ? 'Processing...' : 'Type a message or /command'}
          renderTokenInMessage={renderTokenInMessage}
          processLogOutputDetails={processLogOutputDetails}
          onScroll={handleScroll}
        />

        {/* Process log (if active) */}
        {activeRunId && (
          <div className="conversations-process-log">
            <BitcodeExecutionStreamPanel
              ref={processLogRef}
              isProcessing={isProcessing || (activeRun?.status === 'running')}
              executionState={executionState || {}}
              isStreamingComplete={isRunComplete}
              generationCount={generationCount}
              error={logError}
              runId={activeRunId || undefined}
              output={runLog}
              outputDetails={processLogOutputDetails}
              onRetry={handleRetry}
              onDismissError={handleDismissError}
              userHasScrolled={processLogHasScrolled}
              setUserHasScrolled={setProcessLogHasScrolled}
              compact={false}
              latestWorkUpdate={latestWorkUpdate as any}
              iterationUpdates={(iterationUpdates as any[]) || []}
              onOpenDetails={(id) => setSelectedRunDetailsId(id)}
              onNavigateToExecution={(id) => {
                if (typeof window !== 'undefined') {
                  window.open(`/executions?runId=${id}`, '_blank', 'noopener');
                }
              }}
              onClose={() => {
                setActiveRunId(null);
                setSelectedRunDetailsId(null);
              }}
              workUpdatesClassName="mt-4 space-y-4"
            />
          </div>
        )}

        {selectedRunDetailsId && (
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between bg-gray-900/50 border border-gray-700/60 rounded-md px-3 py-2">
              <div className="text-sm text-gray-200">
                Execution Details · <span className="font-mono">{selectedRunDetailsId.slice(0, 8)}</span>
              </div>
              <button
                type="button"
                className="text-xs text-gray-300 hover:text-emerald-300 transition"
                onClick={() => setSelectedRunDetailsId(null)}
              >
                Close
              </button>
            </div>
            <div className="bg-gray-900/40 border border-gray-700/60 rounded-md p-4">
              <ExecutionDetailsView runId={selectedRunDetailsId} />
            </div>
          </div>
        )}

        {/* Thinking log */}
        {thinkingLog.length > 0 && (
          <ThinkingLog entries={thinkingLog} />
        )}

        {/* Command menu removed - ':' trigger no longer used */}
      </div>

      {/* Error display */}
      {processError && (
        <div className="conversations-error">
          <div className="error-message">
            {processError.message}
          </div>
          <button onClick={() => setProcessError(null)}>Dismiss</button>
        </div>
      )}
    </>
  );

  // Handle fullscreen mode
  if (isFullscreen) {
    return (
      <FullscreenPortal isOpen={isFullscreen} onClose={handleClose}>
        <>
          {splitScreenMode ? (
            <SplitGrid
              boxes={splitBoxes}
              activeId={activeSplitId}
              onBoxUpdate={(id, updates) => {
                setSplitBoxes(prev => prev.map(box => 
                  box.id === id ? { ...box, ...updates } : box
                ));
              }}
              onRemoveBox={(id) => {
                setSplitBoxes(prev => prev.filter(box => box.id !== id));
              }}
              onSend={handleSendMessageCallback}
              renderTokenInMessage={renderTokenInMessage}
              currentSource={currentSource}
              onSourceChange={setCurrentSource}
            />
          ) : (
            mainContent
          )}
          
          <FullscreenControls
            isFullscreen={isFullscreen}
            splitScreenMode={splitScreenMode}
            onToggleFullscreen={toggleFullscreen}
            onToggleSplitScreen={toggleSplitScreen}
          />
        </>
      </FullscreenPortal>
    );
  }

  return mainContent;
});

export default Conversation;
