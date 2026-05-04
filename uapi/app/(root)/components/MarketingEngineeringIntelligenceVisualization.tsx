'use client';

import { useEffect, useRef, useState } from 'react';
import MarketingSectionWrapper from './MarketingSectionWrapper';
// Screenshot gallery components and styles
import MarketingFullScreenGallery from './MarketingFullScreenGallery';
import type { Screenshot } from './marketing-types';

type VisualizationMode =
  | 'headless'
  | 'mobile'
  | 'operator'
  | 'api'
  | 'autonomous'
  | 'adaptive'
  | 'integration';

export default function MarketingEngineeringIntelligenceVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Tab state for interface modes
  const [activeTab, setActiveTab] = useState<VisualizationMode>('headless');
  const tabs = [
    { key: 'headless', label: 'Headless' },
    { key: 'mobile', label: 'Mobile' },
    { key: 'operator', label: 'Operator' },
    { key: 'api', label: 'MCP API' },
  ] as const;
  // Screenshot mappings for each interface mode
  const screenshotsByMode: Record<VisualizationMode, Screenshot[]> = {
    headless: [
      { id: 'headless-1', src: '/screenshots/setup-marketplace.png', alt: 'Marketplace setup integration', type: 'full_page', category: 'setup', revealingSoon: true },
      { id: 'headless-2', src: '/screenshots/setup-btd.png', alt: 'Setup BTD panel', type: 'component', category: 'btd', revealingSoon: true },
      { id: 'headless-3', src: '/screenshots/btd-tracker-widget.png', alt: 'BTD tracker widget', type: 'component', category: 'btd', revealingSoon: true },
    ],
    mobile: [
      { id: 'mobile-1', src: '/screenshots/sidebar-shippables.png', alt: 'Mobile Shippables sidebar', type: 'component', category: 'sidebar', revealingSoon: true },
      { id: 'mobile-2', src: '/screenshots/sidebar-chats-chatting.png', alt: 'Mobile chat labeling', type: 'component', category: 'sidebar', revealingSoon: true },
      { id: 'mobile-3', src: '/screenshots/sidebar-feedbacks-history.png', alt: 'Mobile feedback history', type: 'component', category: 'sidebar', revealingSoon: true },
    ],
    operator: [
      { id: 'operator-1', src: '/screenshots/operator-interface.png', alt: 'Operator dashboard overview', type: 'component', category: 'dashboard', revealingSoon: true },
      { id: 'operator-2', src: '/screenshots/operator-interface.png', alt: 'Operator workflow details', type: 'component', category: 'dashboard', revealingSoon: true },
      { id: 'operator-3', src: '/screenshots/operator-interface.png', alt: 'Operator reports view', type: 'component', category: 'dashboard', revealingSoon: true },
    ],
    api: [
      { id: 'api-1', src: '/screenshots/api-interface.png', alt: 'API interface overview', type: 'component', category: 'api', revealingSoon: true },
      { id: 'api-2', src: '/screenshots/api-interface.png', alt: 'API endpoints documentation', type: 'component', category: 'api', revealingSoon: true },
      { id: 'api-3', src: '/screenshots/api-interface.png', alt: 'API integration example', type: 'component', category: 'api', revealingSoon: true },
    ],
    autonomous: [],
    adaptive: [],
    integration: [],
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const canvasElement = canvas;
    const context = ctx;

    // Set canvas dimensions
    const resizeCanvas = () => {
      const { width, height } = canvasElement.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvasElement.width = width * dpr;
      canvasElement.height = height * dpr;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      pulseSize: number;
      pulseSpeed: number;

      constructor(x: number, y: number, size: number) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.color = 'rgba(103, 254, 183, 0.7)';
        this.pulseSize = Math.random() * Math.PI * 2;
        this.pulseSpeed = 0.02 + Math.random() * 0.02;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.pulseSize += this.pulseSpeed;

        if (this.pulseSize > Math.PI * 2) {
          this.pulseSize = 0;
        }

        if (this.x > canvasElement.width) this.x = 0;
        if (this.x < 0) this.x = canvasElement.width;
        if (this.y > canvasElement.height) this.y = 0;
        if (this.y < 0) this.y = canvasElement.height;
      }

      draw() {
        // Pulsing effect
        const pulseFactor = 0.3 * Math.sin(this.pulseSize) + 1;

        context.beginPath();
        context.arc(this.x, this.y, this.size * pulseFactor, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();

        // Only apply shadow effects to larger particles to reduce rendering cost
        if (this.size > 2) {
          context.shadowBlur = 10;
          context.shadowColor = 'rgba(103, 254, 183, 0.5)';
        } else {
          context.shadowBlur = 0;
        }
      }
    }

    // Create particles
    const particles: Particle[] = [];
    const particleCount = 50; // Reduced particle count for better performance

    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * 3 + 1;
      const x = Math.random() * canvasElement.width;
      const y = Math.random() * canvasElement.height;
      particles.push(new Particle(x, y, size));
    }

    // Track if the animation is in viewport
    let isInViewport = false;
    const observer = new IntersectionObserver((entries) => {
      isInViewport = entries[0].isIntersecting;
    }, { threshold: 0.1 });

    observer.observe(canvasElement);

    // Animation loop
    let last = 0;
    const FRAME_BUDGET = 1000 / 30; // 30 fps

    const animate = (now?: number) => {
      // Throttle to 30 fps
      if (now && now - last < FRAME_BUDGET) {
        requestAnimationFrame(animate);
        return;
      }
      last = now || 0;

      if (isInViewport) {
        context.clearRect(0, 0, canvasElement.width, canvasElement.height);

        // Draw grid - simplified to improve performance
        context.strokeStyle = 'rgba(103, 254, 183, 0.08)';
        context.lineWidth = 0.5;

        const gridSize = 80; // Increased grid size for fewer lines
        for (let x = 0; x < canvasElement.width; x += gridSize) {
          context.beginPath();
          context.moveTo(x, 0);
          context.lineTo(x, canvasElement.height);
          context.stroke();
        }

        for (let y = 0; y < canvasElement.height; y += gridSize) {
          context.beginPath();
          context.moveTo(0, y);
          context.lineTo(canvasElement.width, y);
          context.stroke();
        }

        // Update and draw particles
        for (let i = 0; i < particles.length; i++) {
          particles[i].update();
          particles[i].draw();
        }

        // Draw connections between nearby particles - optimized to check fewer connections
        // Only check every 3rd particle to reduce calculations
        for (let i = 0; i < particles.length; i += 3) {
          for (let j = i + 3; j < particles.length; j += 3) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            // Use squared distance to avoid expensive sqrt operations
            const distanceSquared = dx * dx + dy * dy;

            if (distanceSquared < 14400) { // 120^2 = 14400
              context.beginPath();
              context.strokeStyle = `rgba(103, 254, 183, ${0.15 * (1 - Math.sqrt(distanceSquared) / 120)})`;
              context.lineWidth = 0.6;
              context.moveTo(particles[i].x, particles[i].y);
              context.lineTo(particles[j].x, particles[j].y);
              context.stroke();
            }
          }
        }
      }

      // Use a lower frame rate when not in viewport
      if (isInViewport) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(() => requestAnimationFrame(animate), 100); // Reduce animation rate when not visible
      }
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      observer.disconnect();
    };
  }, []);

  return (
    <MarketingSectionWrapper>

      {/* Canvas for visualization */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      <div className="relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-2xl laptop:text-3xl font-bold text-white mb-4 tracking-tight block">
            Advanced AI Software Engineering Agents in Action
          </h2>
          <p className="text-sm text-gray-400 max-w-2xl mx-auto">
            Autonomously tackle complex engineering challenges, adapt through continuous learning, and integrate seamlessly to deliver production-ready software.
          </p>
        </div>
        {/* Feature Tabs */}
        <div className="flex space-x-4 mb-6">
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-4 py-2 rounded-md font-medium ${activeTab === key
                  ? 'bg-[#1f2937]/80 text-white'
                  : 'text-gray-400 hover:text-white'
                } transition-colors`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mb-6">
          <div className="w-full max-w-3xl mx-auto aspect-video min-h-[200px] relative">
            <MarketingFullScreenGallery
              screenshots={screenshotsByMode[activeTab]}
              layout={
                activeTab === 'autonomous'
                  ? 'floating'
                  : activeTab === 'adaptive'
                    ? 'carousel'
                    : 'inline'
              }
              maxItems={3}
              autoPlay={activeTab === 'adaptive'}
              // On mobile, anchor inline screenshots along bottom; full inset on desktop
              className="absolute w-full inset-x-0 bottom-0 laptop:inset-0 laptop:h-full"
            />
          </div>
        </div>
        <div className="hidden">
          {activeTab === 'autonomous' && (
            <>
              {/* Feature 1 - Terminal-like card */}
              <div className="bg-[#030816]/50 backdrop-blur-sm border border-[#1f2937] rounded-md overflow-hidden">
                {/* Terminal header */}
                <div className="bg-[#1f2937]/80 px-3 py-1.5 flex items-center border-b border-[#1f2937]">
                  <div className="flex space-x-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-500/70"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500/70"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500/70"></div>
                  </div>
                  <div className="text-xs text-gray-400 mx-auto font-mono">autonomous.sh</div>
                </div>

                <div className="p-4">
                  <div className="flex items-start">
                    <div className="p-1.5 rounded-md bg-[#1f2937]/50 text-emerald-400 mr-3 border border-[#1f2937]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-emerald-400 mb-1 font-mono">Autonomous Execution</h3>
                      <p className="text-xs text-gray-400">
                        Bitcode works independently on complex engineering tasks, freeing your team to focus on strategic priorities.
                      </p>
                    </div>
                  </div>

                  {/* Terminal-like footer */}
                  <div className="mt-3 pt-2 border-t border-[#1f2937] text-xs font-mono text-gray-500">
                    $ ./run --mode=autonomous
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'adaptive' && (
            <>
              {/* Feature 2 - Terminal-like card */}
              <div className="bg-[#030816]/50 backdrop-blur-sm border border-[#1f2937] rounded-md overflow-hidden">
                {/* Terminal header */}
                <div className="bg-[#1f2937]/80 px-3 py-1.5 flex items-center border-b border-[#1f2937]">
                  <div className="flex space-x-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-500/70"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500/70"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500/70"></div>
                  </div>
                  <div className="text-xs text-gray-400 mx-auto font-mono">adaptive.sh</div>
                </div>

                <div className="p-4">
                  <div className="flex items-start">
                    <div className="p-1.5 rounded-md bg-[#1f2937]/50 text-emerald-400 mr-3 border border-[#1f2937]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-emerald-400 mb-1 font-mono">Adaptive Learning</h3>
                      <p className="text-xs text-gray-400">
                        Continuously improves based on feedback, adapting to your team's coding standards and practices.
                      </p>
                    </div>
                  </div>

                  {/* Terminal-like footer */}
                  <div className="mt-3 pt-2 border-t border-[#1f2937] text-xs font-mono text-gray-500">
                    $ ./run --mode=adaptive
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'integration' && (
            <>
              {/* Feature 3 - Terminal-like card */}
              <div className="bg-[#030816]/50 backdrop-blur-sm border border-[#1f2937] rounded-md overflow-hidden">
                {/* Terminal header */}
                <div className="bg-[#1f2937]/80 px-3 py-1.5 flex items-center border-b border-[#1f2937]">
                  <div className="flex space-x-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-500/70"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500/70"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500/70"></div>
                  </div>
                  <div className="text-xs text-gray-400 mx-auto font-mono">integration.sh</div>
                </div>

                <div className="p-4">
                  <div className="flex items-start">
                    <div className="p-1.5 rounded-md bg-[#1f2937]/50 text-emerald-400 mr-3 border border-[#1f2937]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-emerald-400 mb-1 font-mono">Seamless Integration</h3>
                      <p className="text-xs text-gray-400">
                        Integrates directly with your GitHub workflow, responding to issues, PRs, and comments with minimal setup.
                      </p>
                    </div>
                  </div>

                  {/* Terminal-like footer */}
                  <div className="mt-3 pt-2 border-t border-[#1f2937] text-xs font-mono text-gray-500">
                    $ ./run --mode=integration
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </MarketingSectionWrapper>
  );
}
