import React from 'react';

import { cn } from '@bitcode/styling';
import GridPattern from "@/components/base/engi/magicui/grid-pattern";
import RevealingSoonOverlay from "@/components/base/engi/overlays/RevealingSoonOverlay";

import { ChevronRight } from "lucide-react";

const baseShadow = '[text-shadow:_0_0_8px_rgba(255,255,255,0.66)]';

// Client helper that synchronises the banner height to a CSS variable so the
// rest of the layout can offset accordingly.  Extracted so the main banner
// component can remain a Server Component and therefore render together with
// the overlay during the initial HTML stream.
// ---------------------------------------------------------------------------
// Using a tiny client sub-component avoids delaying the visual overlay until
// after hydration – the root cause of the earlier flash.

import MarketingBannerHeightSync from "./(root)/components/MarketingBannerHeightSync";

interface ReadLightpaperProps {
  reavealingSoon?: boolean;
}

export default function ReadLightpaper({ reavealingSoon = false }: ReadLightpaperProps) {
  const squares: [number, number][] = [
    [0, 2],
    [2, 3],
    [6, 2],
    [9, 3],
    [5, 7],
    [11, 1],
    [18, 3],
    [27, 1],
    [31, 2],
    [35, 0],
    [36, 1],
  ];

  return (
    <div
      id="lightpaper-banner"
      className="absolute top-0 left-0 flex w-full items-center justify-center overflow-hidden py-4 px-4 tablet:px-8 laptop:pl-48 laptop:pr-24"
      style={{ zIndex: 999, backgroundColor: 'hsl(var(--background))' }}
    >
      {/* Keep rest of layout informed about banner height */}
      <MarketingBannerHeightSync targetId="lightpaper-banner" />

      {/* Render overlay first so it is included in the streamed HTML */}
      {reavealingSoon && (
        <RevealingSoonOverlay
          stretch
          subtle
          rightAlign
          fadeLeft
          alwaysShowText
          deferParticles
          blockInteraction
        />
      )}

      {/* Subtle bottom fade */}
      <div className="absolute w-full inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white/5 to-transparent pointer-events-none" style={{ boxShadow: 'inset 0 -2px 8px -2px rgba(255, 255, 255, 0.04)' }} />

      {/* Content */}
      <div className="w-full max-w-7xl flex flex-col tablet:flex-row items-center justify-between relative z-10 gap-4 px-2 tablet:px-4">
        {/* CTA */}
        <a href="/lightpaper" className="group relative inline-flex items-center cursor-pointer">
          <span className="relative inline-block">
            <span className="relative z-10 engi-text text-sm desktop:text-base tracking-wide leading-6">Read&nbsp;Blog&nbsp;Post</span>
            <span className="absolute left-0 top-0 z-0 engi-text-glow text-sm desktop:text-base tracking-wide leading-6">Read&nbsp;Blog&nbsp;Post</span>
          </span>
          <ChevronRight className="ml-1 size-3 desktop:size-4 transition-all duration-300 ease-out group-hover:translate-x-1 [filter:drop-shadow(0_0_5px_rgba(101,254,183,0.5))]" />
        </a>

        {/* Headline */}
        <div className="flex-grow text-center laptop:text-left">
          <span className={`font-light tracking-wide text-green-primary ${baseShadow}`}>
            <span className="font-medium text-xl desktop:text-2xl whitespace-normal laptop:whitespace-nowrap flex items-baseline justify-center laptop:justify-start">
              <span className="text-gray-300/60 font-serif text-3xl desktop:text-4xl mr-1 leading-none">"</span>
              Incentivizing&nbsp;Prescience&nbsp;in&nbsp;Self-Evolving&nbsp;Engineering&nbsp;AIs
              <span className="text-gray-300/60 font-serif text-3xl desktop:text-4xl ml-1 leading-none">"</span>
            </span>
          </span>
        </div>

        {/* X link */}
        <a
          href="https://x.com/engisoftware"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center text-gray-500 hover:text-green-primary transition-colors"
        >
          <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            className="size-5 laptop:size-6 group-hover:scale-110 transition-transform [filter:drop-shadow(0_0_4px_rgba(101,254,183,0.55))]"
          >
            <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
          </svg>
          <span className="sr-only">Bitcode on X</span>
        </a>
      </div>

      {/* Decorative grid */}
      <GridPattern
        squares={squares}
        className={cn(
          '[mask-image:radial-gradient(2000px_circle_at_center,white,transparent)]',
          'skew-y-3 w-[222%] h-[222%]',
          'opacity-[70%]',
          'fill-transparent stroke-gray-400/25'
        )}
      />
    </div>
  );
}
