/* eslint-disable react/no-multi-comp */

"use client";

import React, { useState, useEffect } from 'react';
// Decorative icons – already present elsewhere in the bundle
// Replace heavy `react-icons` package with lightweight Radix icons.  Radix
// ships fully tree-shakeable ES modules so importing individual symbols adds
// <1 KB each instead of the entire FontAwesome bundle.
import { GitHubLogoIcon, ExternalLinkIcon } from '@radix-ui/react-icons';
import MarketingFullScreenGallery from './MarketingFullScreenGallery';
import MarketingPlaceholderImage from './MarketingPlaceholderImage';
import MarketingThumbnailStack from './MarketingThumbnailStack';
import type { Screenshot } from './marketing-types';
import MarketingSectionWrapper from './MarketingSectionWrapper';
import BitcodePill from '@/components/base/engi/branding/bitcode-pill';
import { SmsPhonePreview } from './marketing-sms-phone-preview';

// Re-use core Conversations styles so the preview matches the real overlay.
import '@/styles/conversations.css';

// Lightweight static Conversations chat preview used in the “Chat with Conversations”
// Operator” tab.  This purposely renders *no* dynamic behaviour – it shows a
// frozen conversation and disabled rich-text input so the bundle impact stays
// minimal while the visual faithfully represents the full experience.


const ConversationsChatPreview: React.FC = () => {
  // Local class constants for repeated frames (SRP/DRY). These are strictly
  // className deduplications and do not alter the visual appearance.
  const orbOuterGlow = "absolute inset-0 rounded-full bg-emerald-400 opacity-25 blur-xl";
  const orbCore = "absolute inset-2 rounded-full bg-emerald-400/90 shadow-lg animate-pulse";
  const chatContainer = "w-full max-w-[60rem] laptop:ml-[-1.5rem] laptop:min-w-[26rem] laptop:min-h-[26rem] flex flex-col rounded-xl border border-emerald-400/20 bg-[rgba(3,8,22,0.9)] shadow-lg overflow-hidden backdrop-blur-md";
  const topBar = "relative z-10 h-10 flex items-center justify-between px-5 bg-[#030816]/80 backdrop-blur border-b border-emerald-400/10";
  const sideBar = "hidden laptop:flex flex-col bg-[#0a132a]/40 border-emerald-400/10 custom-scrollbar -mt-10";
  const leftSide = `${sideBar} w-20 border-r pt-0 pb-2 px-2 space-y-2`;
  const rightSide = `${sideBar} w-28 border-l pt-0 pb-3 px-2 space-y-3`;

  return (
    <div className="relative inline-block w-full">
      {/* Quantum orb – outside border, vertically centred */}
      {/* Orb: farther left and baseline-aligned with chat */}
      <div className="absolute left-[-5.5rem] laptop:left-[-6.25rem] bottom-0 pointer-events-none select-none">
        <div className="relative w-14 h-14">
          <div className={orbOuterGlow} />
          <div className={orbCore} />
        </div>
      </div>

      {/* Chat container */}
      <div className={chatContainer}>
        {/* Simulated in-app top bar */}
        <header className={topBar}>
          {/* App-specific affordances – “split” and “new” conversation */}
          <div className="flex items-center gap-3">
            {/* New conversation icon – subtle plus inside a rounded square */}
            <span className="relative inline-block w-[14px] h-[14px] rounded-[3px] bg-emerald-400/15">
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="w-[10px] h-[2.5px] bg-emerald-300/40" />
                <span className="w-[2.5px] h-[10px] bg-emerald-300/40 absolute" />
              </span>
            </span>

            {/* Split conversation icon – two panels with a divider */}
            <span className="relative inline-flex items-center h-[14px] w-[24px] rounded-[3px] bg-emerald-400/15">
              <span className="absolute inset-y-0 left-1/2 w-[2.5px] bg-emerald-300/30 -translate-x-1/2" />
            </span>
          </div>

          {/* Minimal title to match full Conversations */}
          <div className="text-xs font-medium tracking-wide text-emerald-200 select-none">
            Conversations Chat
          </div>

          {/* Action icons */}
          <div className="flex items-center gap-3 text-white/60">
            <GitHubLogoIcon className="w-4 h-4" />
            <ExternalLinkIcon className="w-4 h-4" />
          </div>
        </header>

        {/* Split content with sidebars */}
        <div className="flex-1 flex overflow-hidden">
          {/* Conversation history sidebar */}
          <aside className={leftSide}>
            {Array.from({ length: 8 }).map((_, idx) => (
              <div key={idx} className="h-3 w-full bg-gray-600/40 rounded" />
            ))}
          </aside>

          {/* Main message waterfall (newest nearer input) */}
          <div className="flex-1 overflow-hidden px-4 pb-4 flex flex-col-reverse justify-start space-y-reverse space-y-3">
            {/* Newest agent bubble with widget */}
            <div className="flex justify-end">
              <div className="rounded-lg bg-emerald-500/20 px-3 py-2 space-y-2 w-3/4">
                {/* Widget card */}
                <div className="bg-[#0a132a]/70 border border-purple-500/40 rounded-md p-2 space-y-1">
                  <div className="h-2 w-1/4 bg-purple-400/80 rounded-full" />
                  <div className="h-2 w-full bg-purple-400/40 rounded-full" />
                  <div className="h-2 w-5/6 bg-purple-400/40 rounded-full" />
                </div>
                {/* Supporting lines */}
                <div className="h-2 w-2/3 bg-emerald-300/60 rounded-full" />
              </div>
            </div>

            {/* Older agent bubble */}
            <div className="flex justify-end">
              <div className="rounded-lg bg-emerald-500/20 px-3 py-2 space-y-1 w-3/4">
                <div className="h-2 w-2/3 bg-emerald-300/70 rounded-full" />
                <div className="h-2 w-full bg-emerald-300/40 rounded-full" />
                <div className="h-2 w-5/6 bg-emerald-300/40 rounded-full" />
              </div>
            </div>

            {/* Oldest user bubble */}
            <div className="flex justify-start">
              <div className="rounded-lg bg-gray-700/40 px-3 py-2 space-y-1 w-3/4">
                <div className="h-2 w-1/2 bg-gray-500/50 rounded-full" />
                <div className="h-2 w-3/4 bg-gray-500/30 rounded-full" />
              </div>
            </div>
          </div>

          <aside className={rightSide}>
            {Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx} className="space-y-1">
                <div className="h-2 w-3/4 bg-purple-400/70 rounded-full" />
                <div className="h-2 w-full bg-purple-400/40 rounded-full" />
                <div className="h-2 w-5/6 bg-purple-400/30 rounded-full" />
              </div>
            ))}
          </aside>
        </div>

        {/* Input area – taller with tokens & typing bars */}
        <div className="border-t border-white/5 px-4 py-3 bg-[#030816]/60 backdrop-blur">
          <div className="bg-gray-700/30 rounded-md p-3 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              {/* Two token pills */}
              <span className="inline-block w-16 h-5 rounded-full bg-emerald-400/30 border border-emerald-400/40" />
              <span className="inline-block w-12 h-5 rounded-full bg-purple-400/30 border border-purple-400/40" />
              {/* Typing bars */}
              <span className="flex-1 h-2 bg-gray-500/40 rounded-full" />
            </div>
            {/* Second line bars to evoke multiline textarea */}
            <div className="h-2 w-2/3 bg-gray-500/30 rounded-full" />
          </div>
        </div>

      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

// Added 'web' for Rich Web Application experience. Each tab can be flagged
// as `hidden` to omit it from rendering entirely.  No additional UI is
// introduced—hidden tabs simply do not appear.

type TabId =
  | 'cli'
  | 'sms'
  | 'web'
  | 'mobile'
  | 'webhooks'
  | 'api';

type TabGroup = 'chat' | 'touch' | 'trigger' | 'script';

// ---------------------------------------------------------------------------
// Static data (module-scope) – evaluated once per bundle load
// ---------------------------------------------------------------------------

export const TABS: ReadonlyArray<{
  id: TabId;
  title: string;
  description: string;
  group: TabGroup;
  hidden?: boolean;
}> = [
  // ----------------------------- Chat -----------------------------
  {
    id: 'cli',
    title: 'Chat with Conversations',
    description: 'A familiar Chat-like experience with multi-paning for natural-language shepherding, evolving, configuring, and more.',
    group: 'chat',
  },
  {
    id: 'sms',
    title: 'SMS Text Commands',
    description: 'Text message pipelines from anywhere. Zero friction, instant results. Your phone becomes a powerful Bitcode command center.',
    group: 'chat',
  },

  // ----------------------------- Touch -----------------------------
  {
    id: 'web',
    title: 'Rich Web Application',
    description: "AI-native experience that's highly operable for both humans and AI.",
    group: 'touch',
  },
  {
    id: 'mobile',
    title: 'Responsive',
    description: 'Label tasks from your phone, tablet, laptop, or desktop—anytime, anywhere.',
    group: 'touch',
  },

  {
    id: 'webhooks',
    title: 'GitHub Webhooks',
    description: 'Trigger workflows automatically from GitHub events.',
    group: 'trigger',
  },

  // ----------------------------- Script -----------------------------
  {
    id: 'api',
    title: 'MCP/API',
    description: 'Automate AI tasks from any tool or script with our secure MCP API.',
    group: 'script',
  },
] as const;

export const SCREENSHOTS_BY_MODE: Record<string, Screenshot[]> = {
  headless: [
    {
      id: 'headless-1',
      src: '/screenshots/setup-marketplace.png',
      alt: 'Headless marketplace setup',
      type: 'full_page',
      category: 'setup_steps',
      revealingSoon: true,
    },
    {
      id: 'headless-2',
      src: '/screenshots/setup-credits.png',
      alt: 'Headless credits panel',
      type: 'component',
      category: 'credits',
      revealingSoon: true,
    },
    {
      id: 'headless-3',
      src: '/screenshots/credits-tracker-widget.png',
      alt: 'Headless tracker widget',
      type: 'component',
      category: 'credits',
      revealingSoon: true,
    },
  ],
  mobile: [
    {
      id: 'mobile-1',
      src: '/screenshots/sidebar-deliverables.png',
      alt: 'Mobile deliverables sidebar',
      type: 'component',
      category: 'sidebar',
      revealingSoon: true,
    },
    {
      id: 'mobile-2',
      src: '/screenshots/sidebar-chats-chatting.png',
      alt: 'Mobile chat labeling',
      type: 'component',
      category: 'sidebar',
      revealingSoon: true,
    },
    {
      id: 'mobile-3',
      src: '/screenshots/sidebar-feedbacks-history.png',
      alt: 'Mobile feedback history',
      type: 'component',
      category: 'sidebar',
      revealingSoon: true,
    },
  ],
  operator: [
    {
      id: 'operator-1',
      src: '/screenshots/operator-interface.png',
      alt: 'Operator dashboard overview',
      type: 'component',
      category: 'dashboard',
      revealingSoon: true,
    },
    {
      id: 'operator-2',
      src: '/screenshots/operator-interface.png',
      alt: 'Operator workflow details',
      type: 'component',
      category: 'dashboard',
      revealingSoon: true,
    },
    {
      id: 'operator-3',
      src: '/screenshots/operator-interface.png',
      alt: 'Operator reports view',
      type: 'component',
      category: 'dashboard',
      revealingSoon: true,
    },
  ],
  api: [
    {
      id: 'api-1',
      src: '/screenshots/api-interface.png',
      alt: 'API interface overview',
      type: 'component',
      category: 'api',
      revealingSoon: true,
    },
    {
      id: 'api-2',
      src: '/screenshots/api-interface.png',
      alt: 'API endpoints documentation',
      type: 'component',
      category: 'api',
      revealingSoon: true,
    },
    {
      id: 'api-3',
      src: '/screenshots/api-interface.png',
      alt: 'API integration example',
      type: 'component',
      category: 'api',
      revealingSoon: true,
    },
  ],
  editor: [
    {
      id: 'editor-1',
      src: '/screenshots/editor-plugin.png',
      alt: 'Smart Editor plugin',
      type: 'component',
      category: 'editor',
      revealingSoon: true,
    },
    {
      id: 'editor-2',
      src: '/screenshots/editor-plugin.png',
      alt: 'Smart Editor plugin details',
      type: 'component',
      category: 'editor',
      revealingSoon: true,
    },
    {
      id: 'editor-3',
      src: '/screenshots/editor-plugin.png',
      alt: 'Smart Editor code suggestions',
      type: 'component',
      category: 'editor',
      revealingSoon: true,
    },
  ],
  // Rich Web Application screenshots
  web: [
    {
      id: 'web-1',
      src: '/screenshots/integration-figma.png',
      alt: 'Figma integration UI',
      type: 'component',
      category: 'web',
      revealingSoon: true,
    },
    {
      id: 'web-2',
      src: '/screenshots/rich-text-conversations.png',
      alt: 'Conversations rich text sample',
      type: 'component',
      category: 'web',
      revealingSoon: true,
    },
  ],

  // New modes – using empty placeholders for now
  cli: [
    {
      id: 'cli-1',
      src: '/screenshots/conversations-small.png',
      alt: 'CLI Conversations',
      type: 'component',
      category: 'terminal',
      revealingSoon: true,
    },
    {
      id: 'cli-2',
      src: '/screenshots/conversations-fullscreen.png',
      alt: 'CLI fullscreen Conversations',
      type: 'full_page',
      category: 'terminal',
      revealingSoon: true,
    },
  ],
  marketplace: [
    {
      id: 'market-1',
      src: '/screenshots/setup-marketplace.png',
      alt: 'Marketplace setup',
      type: 'setup',
      category: 'marketplace',
      revealingSoon: true,
    },
    {
      id: 'market-2',
      src: '/screenshots/setup-credits.png',
      alt: 'Credits setup',
      type: 'setup',
      category: 'marketplace',
      revealingSoon: true,
    },
  ],
  token: [
    {
      id: 'token-1',
      src: '/screenshots/setup-credits-balance.png',
      alt: 'Credits balance',
      type: 'component',
      category: 'token',
      revealingSoon: true,
    },
    {
      id: 'token-2',
      src: '/screenshots/notifications-widget.png',
      alt: 'Notifications widget',
      type: 'component',
      category: 'widget',
      revealingSoon: true,
    },
  ],
  chat: [
    {
      id: 'chat-1',
      src: '/screenshots/sidebar-chats-history.png',
      alt: 'Chat history sidebar',
      type: 'component',
      category: 'sidebar',
      revealingSoon: true,
    },
    {
      id: 'chat-2',
      src: '/screenshots/sidebar-chats-chatting.png',
      alt: 'Chatting sidebar',
      type: 'component',
      category: 'sidebar',
      revealingSoon: true,
    },
  ],

  webhooks: [
    {
      id: 'wh-1',
      src: '/screenshots/setup-credits-balance.png',
      alt: 'Webhook setup screenshot',
      type: 'setup',
      category: 'webhook',
      revealingSoon: true,
    },
    {
      id: 'wh-2',
      src: '/screenshots/setup-marketplace.png',
      alt: 'Webhook marketplace',
      type: 'setup',
      category: 'webhook',
      revealingSoon: true,
    },
  ],
};

// ---------------------------------------------------------------------------
// Pure presentational sub-component (static devices illustration)
// ---------------------------------------------------------------------------

const MobileDeviceShowcase: React.FC = () => {
  const devices = [
    { name: 'Phone', w: 80, h: 150, layout: 'chat' },
    { name: 'Mini-Tablet', w: 110, h: 170, layout: 'chat' },
    { name: 'Tablet', w: 150, h: 120, layout: 'sidebar' },
    { name: 'Laptop', w: 220, h: 110, layout: 'sidebar' },
  ] as const;

  const DeviceFrame: React.FC<{ w: number; h: number; layout: 'chat' | 'sidebar' }> = ({
    w,
    h,
    layout,
  }) => (
    <div
      style={{ width: w, height: h }}
      className="relative rounded-lg border-2 border-purple-400/40 bg-[#0a132a]/50 shadow-inner backdrop-blur-sm"
    >
      <div className="absolute inset-1 rounded-md border border-purple-400/20 pointer-events-none" />

      {layout === 'sidebar' ? (
        <div className="absolute inset-2 flex space-x-1 p-1">
          <div className="w-8 bg-amber-500/30 rounded-sm" />
          <div className="flex-1 bg-green-500/30 rounded-sm" />
          <div className="w-8 bg-amber-500/30 rounded-sm" />
        </div>
      ) : (
        <div className="absolute inset-2 flex flex-col justify-end space-y-1 p-1">
          <div className="self-start w-14 h-2 bg-gray-700 rounded-full" />
          <div className="self-end w-10 h-2 bg-green-500 rounded-full" />
          <div className="self-start w-16 h-2 bg-gray-700 rounded-full" />
          <div className="w-full h-4 bg-amber-500 rounded mt-1" />
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-wrap items-end justify-center gap-4">
      {devices.map((d) => (
        <DeviceFrame key={d.name} w={d.w} h={d.h} layout={d.layout} />
      ))}
    </div>
  );
};

/**
 * NOTE
 * ----
 * This version intentionally contains **zero** Framer-Motion usage.  It is a
 * static, instantly-switching tab showcase that can serve as a foundation for
 * new, performance-minded motion work later.  All previous variants, motion
 * elements, and entrance/exit props have been removed.
 */

function MarketingMultiAgentShowcase() {
  // Determine the initial active tab respecting the optional `hidden` flag.
  const firstVisibleTab = TABS.find((t) => !t.hidden)?.id ?? 'cli';
  const [activeTab, setActiveTab] = useState<TabId>(firstVisibleTab);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [imgError, setImgError] = useState<Record<number, boolean>>({});

  // Track which group labels have been rendered so only the first tab in each
  // group shows its label.  This is recalculated each render but tiny cost.
  const renderedGroups = new Set<TabGroup>();

  useEffect(() => {
    setImgError({});
  }, [activeTab]);

  // ----------------------------------------------------------------------

  // MobileDeviceShowcase moved out of the component to keep a stable
  // reference across renders (no reason to recreate the function every time
  // state toggles).

  return (
    <MarketingSectionWrapper
      className="overflow-visible pb-14 tablet:pb-16 laptop:pb-20 desktop:pb-24"
      style={{ contain: 'layout style', contentVisibility: 'auto' }}
    >
      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl tablet:text-3xl laptop:text-5xl desktop:text-6xl font-bold tracking-tight leading-tight bg-gradient-to-r from-purple-300 via-indigo-400 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_3px_15px_rgba(0,0,0,0.25)] pb-2 block">
            Bitcode Software Agents – Quick, Quality Coding Agents at Your Fingertips
          </h2>
          <p className="mt-4 tablet:mt-6 text-sm tablet:text-base laptop:text-lg desktop:text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
            Command self-learning workflows via a chat-first, shepherding-scale interface—steer and optimize them in seconds with flexible integrations.
          </p>
        </div>

        <div className="flex flex-col desktop:flex-row gap-6 items-start desktop:items-stretch">
          {/* Tabs */}
          <div className="w-full desktop:w-1/3">
            <div className="bg-[#030816]/50 backdrop-blur-sm border border-[#1f2937] rounded-md overflow-visible">
              {/*
                * Make tab list horizontally scrollable on small screens so long
                * titles don’t bleed off the viewport.  Negative margins were
                * removed.
                */}
              <div className="grid grid-cols-2 tablet:flex tablet:flex-col gap-2 tablet:gap-0">
                {TABS.filter((t) => !t.hidden).map((tab, index, arr) => {

                  // Determine if this is the first tab of its group
                  const showGroupLabel = !renderedGroups.has(tab.group);
                  if (showGroupLabel) renderedGroups.add(tab.group);

                  const groupColorClass =
                    tab.group === 'chat'
                      ? 'bg-emerald-400'
                      : tab.group === 'touch'
                        ? 'bg-cyan-400'
                        : tab.group === 'trigger'
                          ? 'bg-amber-400'
                          : 'bg-purple-400';
                  // Pill badge styling matching marketplace components
                  const groupPillClasses =
                    tab.group === 'chat'
                      ? 'bg-emerald-400/20 text-emerald-300 border-emerald-400/30'
                      : tab.group === 'touch'
                        ? 'bg-cyan-400/20 text-cyan-300 border-cyan-400/30'
                        : tab.group === 'trigger'
                          ? 'bg-amber-400/20 text-amber-300 border-amber-400/30'
                          : 'bg-purple-400/20 text-purple-300 border-purple-400/30';

                  return (
                    <button
                      key={tab.id}
                      className={`flex items-start wide:items-center p-3 transition-all ${index !== arr.length - 1 ? 'border-b border-[#1f2937] tablet:border-none' : ''} ${activeTab === tab.id
                        ? 'bg-[#1f2937]/30 text-white'
                        : 'text-gray-400 hover:bg-[#1f2937]/20'
                        } ${index === arr.length - 1 ? 'col-span-2 tablet:col-span-1' : ''}`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      <div className="mr-3 relative flex-shrink-0 w-2 h-2">
                        {/* Group label pill – pinned on desktop, inline on mobile */}
                        {showGroupLabel ? (
                          <>
                            {/* Desktop / tablet */}
                            <BitcodePill
                              className={`hidden wide:inline-flex absolute right-0 top-1/2 -translate-y-1/2 whitespace-nowrap ${groupPillClasses}`}
                            >
                              {tab.group.toUpperCase()}
                              <span className={`ml-1 w-2 h-2 rounded-full ${groupColorClass}`} />
                            </BitcodePill>

                            {/* Mobile */}
                            <BitcodePill
                              className={`wide:hidden absolute left-1/2 -translate-x-1/2 -top-6 whitespace-nowrap ${groupPillClasses}`}
                            >
                              {tab.group.toUpperCase()}
                            </BitcodePill>
                          </>
                        ) : (
                          <div className={`w-2 h-2 rounded-full ${groupColorClass}`} />
                        )}
                      </div>
                      <div className="text-left flex-1">
                        <h3 className="text-xs tablet:text-base font-medium leading-snug">
                          {tab.title}
                        </h3>
                        {/* Hide subtitles on mobile to keep grid compact */}
                        <p
                          className={`hidden tablet:block text-sm mt-1 line-clamp-2 ${activeTab === tab.id ? 'text-gray-300' : 'text-gray-500'}`}
                        >
                          {tab.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
            {/* Mobile subtitle */}
            <p className="tablet:hidden mt-4 text-gray-400 text-sm" key={`subtitle-${activeTab}`}>
              {TABS.find((t) => t.id === activeTab)?.description}
            </p>
          </div>

          {/* Right-side pane */}
          <div className="w-full desktop:w-2/3">
            <div className="relative bg-[#030816]/50 backdrop-blur-sm border border-[#1f2937] rounded-md p-4 overflow-hidden h-full">
              {/* Rich Web Application showcase */}
              {activeTab === 'web' && (
                <div className="relative flex items-center justify-center h-full">
                  <div className="relative w-full h-full">
                    <MarketingPlaceholderImage
                      type="component"
                      category="web"
                      text="Rich Web Application"
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <div className="absolute top-6 left-6 z-20 max-w-xs">
                    <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400 via-emerald-600 to-emerald-400 opacity-40 blur-lg" />
                    <div className="relative bg-[#0a132a]/60 border border-emerald-400/40 backdrop-blur-md text-white p-5 rounded-2xl shadow-lg">
                      <h4 className="text-base font-semibold">Rich Web Application</h4>
                      <p className="text-sm mt-2">AI-native experience that's highly operable for both humans and AI.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'chat' && (
                <div className="relative flex items-center justify-center h-full pl-0 pr-6">
                  <div className="relative w-full max-w-md bg-[#030816]/60 border border-[#1f2937] rounded-lg p-4 shadow-inner backdrop-blur-md">
                    <div className="h-56 w-full bg-gradient-to-br from-emerald-500/20 via-emerald-400/10 to-transparent rounded-md flex items-center justify-center">
                      <span className="text-emerald-300/80 text-base font-mono">Chat Window Preview</span>
                    </div>
                    <p className="mt-4 text-gray-300 text-sm">
                      Ask Bitcode anything—from "generate tests" to "architect a microservice." Cloud chat keeps the context synced with your transactions, activity, and docs surfaces.
                    </p>
                  </div>

                  <div className="absolute top-[8px] right-6 z-20 max-w-xs">
                    <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400 via-emerald-600 to-emerald-400 opacity-40 blur-lg" />
                    <div className="relative bg-[#0a132a]/60 border border-emerald-400/40 backdrop-blur-md text-white p-5 rounded-2xl shadow-lg">
                      <h4 className="text-base font-semibold">Cloud Chat</h4>
                      <p className="text-sm mt-2">Collaborate with AI in real-time without leaving your browser.</p>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'headless' && (
                <div className="relative flex flex-col items-start justify-center h-full px-6">
                  <GitHubLogoIcon className="pointer-events-none absolute -right-4 -bottom-4 h-48 w-48 text-emerald-400 opacity-10" />

                  <a
                    href="https://github.com/marketplace/bitcode-github-app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-4 right-4 z-20 inline-flex items-center gap-1 text-sm font-semibold text-indigo-400 hover:underline"
                  >
                    View on Marketplace
                    <ExternalLinkIcon className="h-3 w-3" />
                  </a>

                  <h3 className="text-2xl font-semibold text-white mb-4">Headless Mode: GitHub & CI/CD Integrations</h3>

                  <div className="flex flex-wrap gap-2">
                    {[
                      ['bitcode-deliver-comment', 'bg-blue-500 text-white'],
                      ['bitcode-deliver-review', 'bg-purple-500 text-white'],
                      ['bitcode-deliver-pr', 'bg-green-500 text-white'],
                      ['bitcode-deliver-issue', 'bg-emerald-400 text-black'],
                    ].map(([label, cls]) => (
                      <span key={label} className={`px-3 py-1 rounded-full text-xs ${cls}`}>{label}</span>
                    ))}
                  </div>

                  <p className="mt-4 text-gray-300 text-base max-w-sm">
                    Use labels on GitHub issues and pull requests to request AI-powered tasks without leaving your workflow. Zero UI overhead.
                  </p>

                  <div className="absolute bottom-4 left-6 bg-indigo-500/20 text-indigo-200 text-[10px] font-medium px-2 py-0.5 rounded-full backdrop-blur-sm">
                    12k+ installs
                  </div>
                </div>
              )}

              {activeTab === 'mobile' && (
                <div className="relative flex items-center justify-center h-full">
                  <MobileDeviceShowcase />

                  <div className="absolute top-[10px] right-6 z-20 max-w-xs">
                    <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400 via-emerald-600 to-emerald-400 opacity-40 blur-lg" />
                    <div className="relative bg-[#0a132a]/60 border border-emerald-400/40 backdrop-blur-md text-white p-5 rounded-2xl shadow-lg">
                      <h4 className="text-base font-semibold">Anywhere, Any Device</h4>
                      <p className="text-sm mt-2">Label tasks from your phone, tablet, laptop, or desktop—anytime, anywhere.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'webhooks' && (
                <div className="relative flex items-center justify-center h-full px-6">
                  <MarketingPlaceholderImage
                    type="component"
                    category="webhooks"
                    text="GitHub Webhooks"
                    className="w-full h-full object-cover rounded-md"
                  />
                  <div className="absolute top-[10px] right-6 z-20 max-w-xs">
                    <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-600 to-amber-400 opacity-40 blur-lg" />
                    <div className="relative bg-[#0a132a]/60 border border-amber-400/40 backdrop-blur-md text-white p-5 rounded-2xl shadow-lg">
                      <h4 className="text-base font-semibold">GitHub Webhooks</h4>
                      <p className="text-sm mt-2">Trigger workflows automatically from GitHub events.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'operator' && (
                <div className="relative flex items-center justify-center h-full">
                  <div className="flex items-center space-x-8">
                    <div className="relative w-64 h-40 bg-[#0a132a]/50 border-2 border-purple-400/40 rounded-lg shadow-inner backdrop-blur-sm">
                      <div className="absolute inset-1 rounded-lg border border-purple-400/20 pointer-events-none" />
                      <div className="absolute inset-2 p-1 flex space-x-1">
                        <div className="w-12 bg-amber-500/30 rounded-sm" />
                        <div className="flex-1 bg-green-500/30 rounded-sm" />
                        <div className="w-12 bg-amber-500/30 rounded-sm" />
                      </div>
                    </div>
                    <div className="relative w-40 h-28 bg-[#0a132a]/50 border-2 border-purple-400/40 rounded-lg shadow-inner backdrop-blur-sm">
                      <div className="absolute inset-1 rounded-lg border border-purple-400/20 pointer-events-none" />
                      <div className="absolute inset-2 flex flex-col justify-end space-y-1 p-1">
                        <div className="self-start w-16 h-2 bg-gray-700 rounded-full" />
                        <div className="self-end w-12 h-2 bg-green-500 rounded-full" />
                        <div className="self-start w-20 h-2 bg-gray-700 rounded-full" />
                        <div className="w-full h-4 bg-amber-500 rounded mt-1" />
                      </div>
                    </div>
                    <div className="relative w-20 h-20 animate-pulse">
                      <div className="absolute inset-0 bg-purple-600/50 rounded-full shadow-lg shadow-purple-600/50 ring-4 ring-purple-400/40" />
                      <div className="absolute inset-4 bg-purple-300/80 rounded-full" />
                    </div>
                  </div>

                  <div className="absolute top-[10px] right-6 z-20 max-w-xs">
                    <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400 via-purple-600 to-purple-400 opacity-40 blur-lg" />
                    <div className="relative bg-[#0a132a]/60 border border-purple-400/40 backdrop-blur-md text-white p-5 rounded-2xl shadow-lg">
                      <h4 className="text-base font-semibold">Operator Interface: Conversations</h4>
                      <p className="text-sm mt-2">Chat with Bitcode or assign tasks through the Conversations dashboard for streamlined team collaboration and oversight.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'cli' && (
                <div className="relative flex items-center justify-center h-full w-full px-6 pl-28">
                  {/* Conversations chat preview */}
                  <ConversationsChatPreview />

                  {/* Informational call-out */}
                  <div className="absolute top-[10px] right-6 z-20 max-w-xs">
                    <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400 via-emerald-600 to-emerald-400 opacity-40 blur-lg" />
                    <div className="relative bg-[#0a132a]/60 border border-emerald-400/40 backdrop-blur-md text-white p-5 rounded-2xl shadow-lg">
                      <h4 className="text-base font-semibold">Conversations Chat</h4>
                      <p className="text-sm mt-2">Self-learning conversational interface for shepherding agents, reviewing work, and launching ai_documents.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'sms' && (
                <div className="relative flex items-center justify-center h-full w-full px-6">
                  {/* SMS Phone Preview */}
                  <SmsPhonePreview />

                  {/* Info Callout */}
                  <div className="absolute top-[10px] right-6 z-20 max-w-xs">
                    <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400 via-emerald-600 to-emerald-400 opacity-30 blur-xl animate-pulse-slow-1"></div>
                    <div className="relative bg-[#0a132a]/60 border border-emerald-400/40 backdrop-blur-md text-white p-5 rounded-2xl shadow-lg">
                      <h4 className="text-base font-semibold">SMS Text Commands</h4>
                      <p className="text-sm mt-2">Text "deliver auth system" to +1 (555) 123-4567. Your phone becomes a powerful Bitcode command center. Zero friction, instant results.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'marketplace' && (
                <div className="relative flex items-center justify-center h-full px-6">
                  <MarketingPlaceholderImage
                    type="component"
                    category="marketplace"
                    text="Marketplace"
                    className="w-full h-full object-cover rounded-md"
                  />

                  <div className="absolute top-6 left-6 z-20 max-w-xs">
                    <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-400 via-indigo-600 to-indigo-400 opacity-40 blur-lg" />
                    <div className="relative bg-[#0a132a]/60 border border-indigo-400/40 backdrop-blur-md text-white p-5 rounded-2xl shadow-lg">
                      <h4 className="text-base font-semibold">Recycle, Trade, Work</h4>
                      <p className="text-sm mt-2">Your trash is another tech team’s treasure. Discover reusable assets and flexible work opportunities.</p>
                    </div>
                  </div>

                  <div className="absolute bottom-4 right-6 bg-indigo-500/20 text-indigo-200 text-[10px] font-medium px-2 py-0.5 rounded-full backdrop-blur-sm">
                    Coming Soon
                  </div>
                </div>
              )}

              {activeTab === 'token' && (
                <div className="relative flex items-center justify-center h-full px-6">
                  <MarketingPlaceholderImage
                    type="component"
                    category="token"
                    text="$BTD Token"
                    className="w-full h-full object-cover rounded-md"
                  />

                  <div className="absolute top-6 right-6 z-20 max-w-xs">
                    <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-600 to-amber-400 opacity-40 blur-lg" />
                    <div className="relative bg-[#0a132a]/60 border border-amber-400/40 backdrop-blur-md text-white p-5 rounded-2xl shadow-lg">
                      <h4 className="text-base font-semibold">Invest in Your Data</h4>
                      <p className="text-sm mt-2">Holding $BTD is deflationary—tokens burn as your data fuels the network.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'editor' && (
                <div className="relative flex items-center justify-center h-full">
                  <div className="flex items-center space-x-8">
                    <div className="relative w-64 h-40 bg-[#0a132a]/50 border-2 border-cyan-400/40 rounded-lg shadow-inner backdrop-blur-sm">
                      <div className="absolute inset-1 rounded-lg border border-cyan-400/20 pointer-events-none" />
                      <div className="absolute inset-2 p-1 flex space-x-1">
                        <div className="w-14 bg-green-500/30 rounded-sm relative overflow-hidden" />
                        <div className="flex-1 bg-[#0a132a]/30 rounded-sm relative overflow-hidden" />
                        <div className="w-12 bg-amber-500/30 rounded-sm relative overflow-hidden" />
                      </div>
                    </div>
                    <div className="relative w-20 h-20 animate-pulse">
                      <div className="absolute inset-0 bg-cyan-600/50 rounded-full shadow-lg shadow-cyan-600/50 ring-4 ring-cyan-400/40" />
                      <div className="absolute inset-4 bg-cyan-300/80 rounded-full" />
                    </div>
                  </div>

                  <div className="absolute top-6 right-6 z-20 max-w-xs">
                    <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400 via-cyan-600 to-cyan-400 opacity-40 blur-lg" />
                    <div className="relative bg-[#0a132a]/60 border border-cyan-400/40 backdrop-blur-md text-white p-5 rounded-2xl shadow-lg">
                      <h4 className="text-base font-semibold">Smart Editor Plugin</h4>
                      <p className="text-sm mt-2">Leverage local code context for inline AI suggestions—refactor, document, and debug without leaving your IDE.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'api' && (
                <div className="h-full w-full relative">
                  <div className="absolute top-0 left-0 right-0 h-8 bg-[#1f2937]/50 border-b border-[#1f2937] flex items-center px-3">
                    <div className="flex space-x-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/70"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/70"></div>
                    </div>
                    <div className="text-sm text-gray-400 mx-auto font-mono">bitcode@terminal:~/api</div>
                  </div>
                  <div className="absolute top-10 right-6 z-20 max-w-xs">
                    <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-400 via-indigo-600 to-indigo-400 opacity-40 blur-lg" />
                    <div className="relative bg-[#0a132a]/60 border border-indigo-400/40 backdrop-blur-md text-white p-5 rounded-2xl shadow-lg">
                      <h4 className="text-base font-semibold">Programmatic API Access</h4>
                      <p className="text-sm mt-2">Automate AI tasks from any tool or script with our secure MCP API.</p>
                    </div>
                  </div>

                  <div className="pt-10 px-4 font-mono text-sm whitespace-pre-wrap">
                    <div className="text-gray-400">
                      {`$ curl -X POST https://mcp.bitcode.ai/v1/agents \\\n+  -H "Authorization: Bearer $BITCODE_API_KEY" \\\n+  -H "Content-Type: application/json" \\\n+  -d '{\n    "repo": "https://github.com/acme/space-dragon",\n    "task": "implement_auth",\n    "definition_of_done": "all tests green"\n  }'`}
                    </div>
                    <div className="text-gray-300 mt-4">HTTP/1.1 202 Accepted</div>
                    <div className="text-emerald-400 mt-1">
                      {`{ "agent_id": "agt_87a6e", "status": "queued", "dashboard_url": "https://dash.bitcode.ai/runs/agt_87a6e" }`}
                    </div>
                  </div>

                  <div className="absolute bottom-3 right-3 text-[#1f2937] text-xs font-mono opacity-30">
                    {`{status: "active", agent: "api"}`}
                  </div>
                </div>
              )}

              {/* Thumbnails */}
              {activeTab !== 'api' && (
                // Position screenshots tighter to the outer corners so they don’t cover the main illustration
                ['top-2 left-2 z-30', 'bottom-2 right-2 z-20'].map((pos, visibleIdx) => {
                  const idx = visibleIdx;
                  const shot = SCREENSHOTS_BY_MODE[activeTab]?.[idx];
                  const hasError = imgError[idx];

                  return (
                    <div
                      key={pos}
                      className={`absolute ${pos} w-28 h-16 overflow-hidden rounded-lg border border-white/10 ring-1 ring-black/40 shadow-xl shadow-black/40 transform transition-transform duration-300 hover:scale-105 cursor-pointer`}
                      onClick={() => shot && (setGalleryIndex(idx), setGalleryOpen(true))}
                    >
                      <MarketingThumbnailStack
                        images={shot && !hasError ? [shot.src] : ['']}
                        onThumbClick={() => {
                          if (shot) {
                            setGalleryIndex(idx);
                            setGalleryOpen(true);
                          }
                        }}
                        pad={false}
                        className="!w-full !h-full grid grid-cols-1 !grid-rows-1"
                      />
                    </div>
                  );
                })
              )}

              {/* Gallery modal */}
              {galleryOpen && (
                <MarketingFullScreenGallery
                  screenshots={SCREENSHOTS_BY_MODE[activeTab] || []}
                  initialIndex={galleryIndex}
                  isOpen={galleryOpen}
                  onClose={() => setGalleryOpen(false)}
                  layout="inline"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </MarketingSectionWrapper>
  );
}

export default MarketingMultiAgentShowcase;
// Route-scoped marketing component (presentational only).
// Do not reuse cross-route; shared helpers live under components/base/engi.
